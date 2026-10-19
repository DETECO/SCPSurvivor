"""QA B1/B2 con posición, invulnerabilidad y tiempo controlados.
Ejecutar después del build; --live verifica solamente index público.
No es aceptación humana, balance, rendimiento ni dispositivo físico.
"""
from pathlib import Path
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from functools import partial
from threading import Thread
from urllib.parse import urlsplit
from playwright.sync_api import sync_playwright
import argparse, json, os

ROOT = Path(os.environ.get('SCP_TEST_ROOT', Path(__file__).resolve().parents[1])).resolve()
OUT = Path(os.environ.get('SCP_TEST_ARTIFACTS', ROOT/'tests/artifacts/v2-b1b2'))
ThreadingHTTPServer.request_queue_size = 128

class Quiet(SimpleHTTPRequestHandler):
    def log_message(self, *args): pass

def main():
    parser = argparse.ArgumentParser(); parser.add_argument('--live', action='store_true')
    args = parser.parse_args(); OUT.mkdir(parents=True, exist_ok=True)
    server = None
    if args.live:
        base = 'https://deteco.github.io/SCPSurvivor/'
    else:
        server = ThreadingHTTPServer(('127.0.0.1', 0), partial(Quiet, directory=str(ROOT)))
        Thread(target=server.serve_forever, daemon=True).start()
        base = f'http://127.0.0.1:{server.server_port}/'
    origin = urlsplit(base).netloc; records = []
    try:
        with sync_playwright() as pw:
            browser = pw.chromium.launch(headless=True)
            for entry in (['index.html'] if args.live else ['dev.html', 'index.html']):
                for touch in [False, True]:
                    context = browser.new_context(viewport={'width':390 if touch else 1280, 'height':844 if touch else 900}, has_touch=touch, is_mobile=touch)
                    page = context.new_page(); errors=[]; remote=[]; bad=[]
                    page.on('pageerror', lambda e: errors.append(str(e)))
                    page.on('console', lambda m: errors.append(m.text) if m.type=='error' else None)
                    page.on('response', lambda r: bad.append([r.status,r.url]) if r.status>=400 else None)
                    def route(r):
                        if urlsplit(r.request.url).netloc == origin: r.continue_()
                        else: remote.append(r.request.url); r.abort()
                    page.route('**/*', route)
                    page.goto(base+entry+'?prueba=mapa-v2&cofres=prueba')
                    page.wait_for_selector('#btn-technical-start:visible')
                    assert page.locator('#chest-test-note').is_visible()
                    page.click('#btn-technical-start')
                    page.wait_for_function('() => G.Game.state === "playing" && !!G.Expedition.state.v2')
                    page.click('#btn-technical-pause')
                    initial=page.evaluate('''() => {
                        const p=G.Game.player,s=G.Expedition.state,f=G.World.fixture;
                        p.invuln=1e6;
                        const map=G.SectorMaps.generateV2(s.mapSeed);
                        G.Path.update(1,[p]);
                        const candidates=map.chestCandidates.map(c=>({...c,free:G.World.isFree(c.x,c.y),reachable:G.Path.reachable(c.x,c.y,p)}));
                        window.chestQA={
                            step(n){
                                if(G.Game.state==='paused')G.Game.togglePause();
                                if(G.Game.state!=='playing')throw Error('QA no pudo reanudar');
                                let visible=[];
                                try{
                                    for(let i=0;i<n;i++){
                                        if(G.Expedition.state.phase==='levelup')G.Expedition.choose(0);
                                        G.Expedition.update(1/30);
                                    }
                                    G.TechnicalUI.tick(p,G.Expedition.state.elapsed);
                                    visible=['chest-status','map-locator','map-alert'].map(id=>[id,document.getElementById(id).hidden]);
                                }finally{
                                    if(G.Game.state==='playing')G.Game.togglePause();
                                    // Retain the actual HUD snapshot for a frozen screenshot.
                                    G.TechnicalUI.state('playing');
                                    for(const [id,hidden]of visible)document.getElementById(id).hidden=hidden;
                                }
                            },
                            at(x,y){p.x=x;p.y=y;G.Path.update(1,[p]);}
                        };
                        const chest=G.ExplorationChests.state.chests[0];
                        return {width:f.maxX-f.minX+1,height:f.maxY-f.minY+1,mapTime:s.v2.mapTime,initialDistance:chest?Math.hypot(p.x-chest.x,p.y-chest.y):null,layout:map.layout,candidates,chests:G.ExplorationChests.state,accounts:G.LocalAccounts.enabled,checkpoint:G.RunCheckpoint.capture()};
                    }''')
                    assert (initial['width'],initial['height']) == (160,100), initial
                    assert 0 <= initial['mapTime'] < 2, initial
                    assert initial['initialDistance']>50, initial
                    assert initial['layout']=='v2-open-160x100', initial
                    assert len(initial['candidates'])==6 and all(c['free'] and c['reachable'] for c in initial['candidates']), initial
                    assert initial['accounts'] is False and initial['checkpoint'] is None, initial
                    state=initial['chests']
                    assert set(['chests','ticketTotal','spawned','attempts','cap','chance','practice','notice']) <= state.keys(), state
                    assert state['practice'] and len(state['chests'])==1 and state['ticketTotal']==0, state
                    assert set(['id','x','y','opened','discovered','progress','tickets','practice']) <= state['chests'][0].keys(), state
                    assert not state['chests'][0]['opened'] and state['chests'][0]['practice'], state
                    before=page.evaluate('''() => {
                        const c=G.ExplorationChests.state.chests[0];chestQA.at(c.x,c.y);chestQA.step(60);
                        return JSON.parse(JSON.stringify(G.ExplorationChests.state));
                    }''')
                    assert 1.9<=before['chests'][0]['progress']<=2.1 and not before['chests'][0]['opened'], before
                    assert 'fictici' in page.locator('#chest-status').inner_text().lower()
                    assert page.locator('#chest-status').is_visible()
                    stem=f'{entry[:-5]}-{"touch" if touch else "desktop"}'
                    page.screenshot(path=str(OUT/f'{stem}-progress.png'))
                    page.wait_for_timeout(220)
                    assert page.evaluate('G.ExplorationChests.state.chests[0].progress')==before['chests'][0]['progress']
                    decay=page.evaluate('''() => {
                        const c=G.ExplorationChests.state.chests[0];chestQA.at(c.x+72,c.y);chestQA.step(30);
                        return JSON.parse(JSON.stringify(G.ExplorationChests.state));
                    }''')
                    assert abs(before['chests'][0]['progress']-decay['chests'][0]['progress']-1.5)<0.08, decay
                    assert not decay['chests'][0]['opened'] and decay['ticketTotal']==0, decay
                    threshold=page.evaluate('''() => {
                        const c=G.ExplorationChests.state.chests[0];chestQA.at(c.x,c.y);chestQA.step(88);
                        return JSON.parse(JSON.stringify(G.ExplorationChests.state));
                    }''')
                    assert not threshold['chests'][0]['opened'] and threshold['ticketTotal']==0, threshold
                    opened=page.evaluate('''() => {
                        chestQA.step(3);
                        return JSON.parse(JSON.stringify(G.ExplorationChests.state));
                    }''')
                    assert opened['chests'][0]['opened'] and opened['ticketTotal']>0, opened
                    repeated=page.evaluate('''() => {chestQA.step(150);return JSON.parse(JSON.stringify(G.ExplorationChests.state));}''')
                    assert repeated['ticketTotal']==opened['ticketTotal'], repeated
                    assert len(repeated['chests'])==1, repeated
                    assert page.evaluate('!G.LocalAccounts.enabled && G.RunCheckpoint.capture()===null')
                    assert 'fictici' in page.locator('#chest-status').inner_text().lower()
                    page.screenshot(path=str(OUT/f'{stem}-opened.png'))
                    assert not errors, errors
                    assert not remote, remote
                    assert not bad, bad
                    records.append({'entry':entry,'touchEmulated':touch,'status':'PASS','initial':initial,'progress':before,'decay':decay,'opened':opened,'repeated':repeated,'errors':errors,'remoteAttempts':remote,'httpFailures':bad})
                    context.close()
            browser.close()
        (OUT/'results.json').write_text(json.dumps({'live':args.live,'records':records,'method':'Navegador aislado con posición, invulnerabilidad y pasos de tiempo controlados. Pausa global verificada con tiempo real. Cofres y tickets de práctica. Sin cuentas ni solicitudes externas; no acredita aceptación humana, balance, rendimiento ni dispositivo físico.'},indent=2)+'\n',encoding='utf-8')
        print(json.dumps({'result':'PASS','scenarios':len(records),'output':str(OUT)}))
    finally:
        if server: server.shutdown(); server.server_close()

if __name__=='__main__': main()
