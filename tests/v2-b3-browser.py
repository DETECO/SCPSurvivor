"""B3: transiciones controladas; no aceptación humana, balance ni móvil físico.
Ejecutar tras build. --live usa solo index público y artefactos separados.
"""
from pathlib import Path
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from functools import partial
from threading import Thread
from urllib.parse import urlsplit
from playwright.sync_api import sync_playwright
import argparse, json, os

ROOT = Path(os.environ.get('SCP_TEST_ROOT', Path(__file__).resolve().parents[1])).resolve()
ThreadingHTTPServer.request_queue_size = 128


class Quiet(SimpleHTTPRequestHandler):
    def log_message(self, *args): pass


HELPERS = '''() => {
    const p=G.Game.player;p.invuln=1e6;
    window.b3QA={
        at(x,y){p.x=x;p.y=y;G.Camera.x=x;G.Camera.y=y;G.Path.update(1,[p]);},
        step(n){
            if(G.Game.state==='paused')G.Game.togglePause();
            if(G.Game.state!=='playing')throw Error('QA no pudo reanudar');
            try{
                for(let i=0;i<n;i++){
                    if(G.Expedition.state.phase==='levelup')G.Expedition.choose(0);
                    G.Expedition.update(1/30);
                }
                G.TechnicalUI.tick(p,G.Expedition.state.elapsed);
            }finally{
                if(G.Game.state==='playing')G.Game.togglePause();
            }
        },
        snap(){return JSON.parse(JSON.stringify({
            expedition:G.Expedition.state,chests:G.ExplorationChests.state,
            rewards:G.EventRewards.state,rift:G.DimensionalRifts.state,
            weapons:p.fieldWeapons.map(w=>({id:w.id,model:w.model,level:w.level})),
            accounts:G.LocalAccounts.enabled,checkpoint:G.RunCheckpoint.capture(),
            sdk:{firebase:typeof window.firebase,supabase:typeof window.supabase},
            enemies:G.EnemyMgr.all().map(e=>({id:e.id,boss:e.boss,dimensional:!!e.dimensional,dead:e.dead}))
        }));},
        defeat(dimensional){
            const e=G.EnemyMgr.all().find(e=>e.boss&&!e.dead&&!!e.dimensional===dimensional);
            if(!e)throw Error('No existe el jefe esperado');
            e.hurt(e.hp+e.shield+1e6);
            const safe=[[144,0],[-144,0],[0,144],[0,-144],[144,144],[-144,-144]]
                .map(([dx,dy])=>({x:e.x+dx,y:e.y+dy}))
                .find(q=>G.World.isFree(q.x,q.y,p.r)&&G.Path.reachable(q.x,q.y,p));
            if(!safe)throw Error('QA no encontró punto fuera del radio del cofre');
            this.at(safe.x,safe.y);this.step(90);
        },
        chest(type){return G.ExplorationChests.state.chests.find(c=>c.type===type);},
        show(){
            if(G.Game.state==='paused')G.Game.togglePause();
            G.TechnicalUI.tick(p,G.Expedition.state.elapsed);
            const ids=['map-locator','map-alert','chest-status','rift-alert','rift-locator'];
            const visibility=ids.map(id=>[id,document.getElementById(id).hidden]);
            if(G.Game.state==='playing')G.Game.togglePause();
            G.TechnicalUI.state('playing');
            for(const [id,hidden]of visibility)document.getElementById(id).hidden=hidden;
        }
    };
    return b3QA.snap();
}'''


def level_sum(snapshot):
    return sum(w['level'] for w in snapshot['weapons'])


def assert_isolated(snapshot):
    assert snapshot['accounts'] is False and snapshot['checkpoint'] is None, snapshot
    assert all(v == 'undefined' for v in snapshot['sdk'].values()), snapshot['sdk']


def run_mode(browser, base, origin, entry, touch, mode, out):
    context = browser.new_context(viewport={'width':390 if touch else 1280, 'height':844 if touch else 900}, has_touch=touch, is_mobile=touch)
    errors, remote, bad, failed = [], [], [], []
    page = context.new_page()
    page.on('pageerror', lambda e: errors.append(str(e)))
    page.on('console', lambda m: errors.append(m.text) if m.type == 'error' else None)
    page.on('response', lambda r: bad.append([r.status, r.url]) if r.status >= 400 else None)
    page.on('requestfailed', lambda r: failed.append({'url':r.url, 'error':r.failure}))

    def route(r):
        if urlsplit(r.request.url).netloc == origin: r.continue_()
        else: remote.append(r.request.url); r.abort()

    page.route('**/*', route)
    try:
        page.goto(base+entry+'?prueba=mapa-v2&premios='+('grieta' if mode == 'expiry' else mode)+'&interfaz=clasica')
        page.wait_for_selector('#btn-technical-start:visible')
        assert page.locator('#b3-test-note').is_visible()
        assert page.locator('#btn-field-rift').count() == 0
        page.click('#btn-technical-start')
        page.wait_for_function('() => G.Game.state === "playing" && !!G.Expedition.state.v2')
        page.click('#btn-technical-pause')
        initial = page.evaluate(HELPERS)
        assert_isolated(initial)
        assert initial['rewards']['ticketTotal'] == 0 and not initial['rewards']['receipts'], initial
        assert not any(c['type'] in ['boss','rift'] for c in initial['chests']['chests']), initial
        stem = f'{entry[:-5]}-{"touch" if touch else "desktop"}-{mode}'
        if mode == 'jefe':
            assert 270 <= initial['expedition']['v2']['mapTime'] < 272, initial
            assert initial['expedition']['v2']['bossSpawned'] and not initial['expedition']['v2']['bossDefeated'], initial
            assert any(e['boss'] and not e['dimensional'] and not e['dead'] for e in initial['enemies']), initial
        else:
            assert initial['expedition']['v2']['mapTime'] < 2, initial
            assert not initial['expedition']['v2']['bossSpawned'], initial
            assert initial['rift']['status'] == 'open' and 43 < initial['rift']['remaining'] <= 45, initial
            frozen = initial['rift']['remaining']
            page.wait_for_timeout(220)
            assert page.evaluate('G.DimensionalRifts.state.remaining') == frozen
            if mode == 'expiry':
                page.evaluate('b3QA.step(1380)')
                closed = page.evaluate('b3QA.snap()')
                assert closed['rift']['status'] == 'closed', closed
                assert closed['rewards']['ticketTotal'] == 0 and not closed['rewards']['receipts'], closed
                assert not any(c['type'] == 'rift' for c in closed['chests']['chests']), closed
                assert not closed['expedition']['v2']['bossDefeated'], closed
                result = {'initial':initial, 'closed':closed}
            else:
                page.evaluate('''() => {
                    const e=G.EnemyMgr.all().find(e=>!e.boss&&!e.dead);
                    if(!e)throw Error('Falta remanente para comprobar conservación');
                    window.b3Remnant=e.id;e.hp=e.maxHp=1e9;
                    const r=G.DimensionalRifts.state;b3QA.at(r.x,r.y);b3QA.step(1);
                }''')
                contact = page.evaluate('b3QA.snap()')
                assert contact['rift']['status'] == 'active', contact
                assert any(e['dimensional'] and not e['dead'] for e in contact['enemies']), contact
                assert contact['rewards']['ticketTotal'] == 0 and not contact['rewards']['receipts'], contact
                assert not any(c['type'] == 'rift' for c in contact['chests']['chests']), contact
                assert not contact['expedition']['v2']['bossDefeated'], contact
        if mode != 'expiry':
            chest_type = 'boss' if mode == 'jefe' else 'rift'
            page.evaluate('(dimensional) => b3QA.defeat(dimensional)', mode == 'grieta')
            victory = page.evaluate('b3QA.snap()')
            assert victory['rewards']['ticketTotal'] == 0 and not victory['rewards']['receipts'], victory
            chest = next(c for c in victory['chests']['chests'] if c['type'] == chest_type)
            assert chest['rewardId'] and not chest['opened'], chest
            if mode == 'grieta':
                assert not victory['expedition']['v2']['bossDefeated'], victory
                assert victory['expedition']['totals']['bossesDefeated'] == initial['expedition']['totals']['bossesDefeated'], victory
                assert page.evaluate('G.EnemyMgr.all().some(e=>e.id===b3Remnant&&!e.dead)')
            else:
                assert victory['expedition']['v2']['bossDefeated'], victory
            # Move to the physical chest; only proximity and controlled active time open it.
            page.evaluate('(type) => {const c=b3QA.chest(type);b3QA.at(c.x,c.y);b3QA.step(60);b3QA.show();}', chest_type)
            progress = page.evaluate('b3QA.snap()')
            active = next(c for c in progress['chests']['chests'] if c['rewardId'] == chest['rewardId'])
            assert 1.9 <= active['progress'] <= 2.1 and not active['opened'], active
            assert page.locator('#chest-status').is_visible()
            assert 'fictici' in page.locator('#chest-status').inner_text().lower()
            page.screenshot(path=str(out/f'{stem}-progress.png'))
            page.wait_for_timeout(220)
            assert page.evaluate('(type) => b3QA.chest(type).progress', chest_type) == active['progress']
            page.evaluate('''(type) => {
                for(let i=0;i<60&&b3QA.chest(type).progress<3.45;i++)b3QA.step(1);
            }''', chest_type)
            assert not page.evaluate('(type) => b3QA.chest(type).opened', chest_type)
            before_open = page.evaluate('b3QA.snap()')
            page.evaluate('''(type) => {
                for(let i=0;i<6&&!b3QA.chest(type).opened;i++)b3QA.step(1);
            }''', chest_type)
            opened = page.evaluate('b3QA.snap()')
            assert next(c for c in opened['chests']['chests'] if c['rewardId'] == chest['rewardId'])['opened'], opened
            assert level_sum(opened) == level_sum(before_open)+1, {'before':before_open, 'after':opened}
            assert len(opened['rewards']['receipts']) == 1, opened
            assert opened['rewards']['ticketTotal'] in ([0] if mode == 'jefe' else [2,3]), opened
            page.evaluate('b3QA.step(120);b3QA.show()')
            repeated = page.evaluate('b3QA.snap()')
            assert repeated['rewards'] == opened['rewards'], repeated
            assert repeated['weapons'] == opened['weapons'], repeated
            assert_isolated(repeated)
            page.screenshot(path=str(out/f'{stem}-opened.png'))
            result = {'initial':initial, 'victory':victory, 'progress':progress, 'opened':opened, 'repeated':repeated}
        assert not errors and not remote and not bad and not failed, {'errors':errors,'remote':remote,'httpFailures':bad,'failed':failed}
        return {'mode':mode,'status':'PASS',**result,'errors':errors,'remoteAttempts':remote,'httpFailures':bad,'requestFailures':failed}
    finally:
        context.close()


def main():
    parser = argparse.ArgumentParser(); parser.add_argument('--live', action='store_true')
    args = parser.parse_args()
    # A live run always has its own child directory, even with an override.
    out = Path(os.environ.get('SCP_TEST_ARTIFACTS', ROOT/'tests/artifacts/v2-b3')) / ('live' if args.live else 'local')
    out.mkdir(parents=True, exist_ok=True)
    server = None; records = []
    try:
        if args.live:
            base = 'https://deteco.github.io/SCPSurvivor/'
        else:
            server = ThreadingHTTPServer(('127.0.0.1',0), partial(Quiet,directory=str(ROOT)))
            Thread(target=server.serve_forever,daemon=True).start()
            base = f'http://127.0.0.1:{server.server_port}/'
        with sync_playwright() as pw:
            browser = pw.chromium.launch(headless=True)
            try:
                for entry in (['index.html'] if args.live else ['dev.html','index.html']):
                    for touch in [False,True]:
                        modes = [run_mode(browser,base,urlsplit(base).netloc,entry,touch,mode,out) for mode in ['jefe','grieta','expiry']]
                        records.append({'entry':entry,'touchEmulated':touch,'status':'PASS','modes':modes})
            finally:
                browser.close()
        method = 'Posición, invulnerabilidad, daño letal y pasos temporales controlados. Pausa pública real, apertura física y aislamiento de contexto. No aceptación humana, balance, rendimiento ni dispositivo físico.'
        (out/'results.json').write_text(json.dumps({'live':args.live,'records':records,'method':method},indent=2)+'\n',encoding='utf-8')
        print(json.dumps({'result':'PASS','scenarios':len(records),'modesPerScenario':3,'output':str(out)}))
    finally:
        if server: server.shutdown(); server.server_close()


if __name__ == '__main__': main()
