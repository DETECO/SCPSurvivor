"""Ensayo aislado del prototipo; no usa pestañas/perfil/cuentas del usuario.
Inyección controlada de posición/tiempo/muerte para verificar transiciones,
sin atribuir estos casos a aceptación manual, balance o habilidad de juego.
"""
from pathlib import Path
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from threading import Thread
from functools import partial
from playwright.sync_api import sync_playwright
import json, os, shutil

ROOT = Path(__file__).resolve().parents[1]
ThreadingHTTPServer.request_queue_size = 128  # dev.html carga83 scripts concurrentes en Windows.
OUT = Path(os.environ.get('SCP_TEST_ARTIFACTS', ROOT/'tests/artifacts/rifts'))
class Quiet(SimpleHTTPRequestHandler):
    def log_message(self, *args): pass

def main():
    OUT.mkdir(parents=True, exist_ok=True)
    server = ThreadingHTTPServer(('127.0.0.1', 0), partial(Quiet, directory=str(ROOT)))
    Thread(target=server.serve_forever, daemon=True).start()
    origin = f'http://127.0.0.1:{server.server_port}'
    records = []
    try:
        with sync_playwright() as pw:
            browser = pw.chromium.launch(executable_path=shutil.which('chromium'), headless=True)
            for entry in ['dev.html', 'index.html']:
                for mobile in [False, True]:
                    context = browser.new_context(viewport={'width':390 if mobile else 1280,'height':844 if mobile else 900},has_touch=mobile,is_mobile=mobile)
                    page=context.new_page(); errors=[]; remote=[]; failed=[]
                    page.on('requestfailed',lambda r: failed.append({'url':r.url,'error':r.failure}))
                    page.on('pageerror',lambda error: errors.append(str(error)))
                    page.on('console',lambda m: errors.append(m.text) if m.type=='error' else None)
                    def route(r):
                        if r.request.url.startswith(origin+'/'): r.continue_()
                        else: remote.append(r.request.url);r.abort()
                    page.route('**/*',route)
                    page.goto(origin+'/'+entry+'?prueba=grieta');page.wait_for_selector('#btn-technical-start:visible')
                    assert page.locator('#rift-test-note').is_visible()
                    page.evaluate("""() => {window.riftSounds=[];const sfx=G.Audio.sfx;G.Audio.sfx=(name,opts)=>{if(name==='riftOpen')riftSounds.push(name);sfx(name,opts);};}""")
                    page.click('#btn-technical-start')
                    page.wait_for_selector('#rift-locator:visible')
                    assert page.locator('#rift-alert').is_visible()
                    assert page.locator('#btn-field-rift').count()==0
                    assert page.evaluate('!G.LocalAccounts.enabled && G.RunCheckpoint.capture()===null')
                    assert page.evaluate('G.Expedition.state.phase')=='exploration'
                    assert page.evaluate('riftSounds.length')==1
                    audio=page.evaluate('G.Audio.debugMeter(350)')
                    assert audio and audio['peak']>0, audio
                    initial=page.evaluate('G.DimensionalRifts.state')
                    page.click('#btn-technical-pause'); frozen=page.evaluate('G.DimensionalRifts.state.remaining')
                    page.wait_for_timeout(450)
                    assert page.evaluate('G.DimensionalRifts.state.remaining')==frozen
                    assert page.locator('#rift-locator').is_hidden()
                    page.click('#btn-technical-resume')
                    page.screenshot(path=str(OUT/f'{entry[:-5]}-{"touch" if mobile else "desktop"}-open.png'))
                    # Closure is controlled time, not waiting45 wall seconds.
                    page.evaluate('G.Expedition.update(46)');page.wait_for_timeout(60)
                    assert page.evaluate('G.DimensionalRifts.state.status')=='closed'
                    assert page.locator('#btn-field-rift').count()==0
                    assert page.locator('#rift-locator').is_hidden()
                    assert 'cerrado' in page.locator('#rift-alert').inner_text()
                    # A fresh trial enables a manual approach or controlled transition QA.
                    page.evaluate('G.Game.startTechnical({...G.TechnicalUI.options(),seed:1337})')
                    before=page.evaluate('G.Expedition.captureState()')
                    page.evaluate('G.Game.player.x=G.DimensionalRifts.state.x-50;G.Game.player.y=G.DimensionalRifts.state.y;G.Camera.x=G.Game.player.x;G.Camera.y=G.Game.player.y')
                    page.wait_for_timeout(60);assert page.evaluate('G.Expedition.state.phase')=='exploration'
                    page.keyboard.down('KeyD')
                    page.wait_for_function('() => G.Expedition.state.dimensional===true')
                    assert page.evaluate('G.Input.axis()[0]')>0
                    page.keyboard.up('KeyD')
                    assert page.evaluate('G.Expedition.state.dimensional')
                    assert page.evaluate('G.Expedition.state.bossMaxHp')==810
                    assert page.locator('#btn-field-rift').count()==0
                    assert 'Custodio dimensional' in page.locator('#field-status').inner_text()
                    assert page.evaluate('G.EnemyMgr.all().find(e=>e.dimensional).dimensionalArrival')>0
                    page.screenshot(path=str(OUT/f'{entry[:-5]}-{"touch" if mobile else "desktop"}-boss.png'))
                    # Escape via real UI; position is injected so this is not a human route test.
                    page.evaluate('G.Game.player.x=G.Expedition.state.exit.x;G.Game.player.y=G.Expedition.state.exit.y')
                    page.wait_for_timeout(60);page.click('#btn-field-exit')
                    page.evaluate('G.Expedition.update(.3);G.Game.player.fieldDamageRevision=(G.Game.player.fieldDamageRevision||0)+1;G.Expedition.update(.01)')
                    assert page.evaluate('G.Expedition.state.phase')=='boss'
                    page.wait_for_timeout(60);page.click('#btn-field-exit');page.evaluate('G.Expedition.update(2.01)')
                    assert page.evaluate('G.Expedition.state.phase')=='exploration'
                    assert page.evaluate('G.DimensionalRifts.state.result')=='evaded'
                    after=page.evaluate('G.Expedition.captureState()')
                    assert before['sector']==after['sector'] and before['totals']==after['totals']
                    assert before['nextBossSector']==after['nextBossSector'] and before['rngState']==after['rngState']
                    # Controlled boss death proves unique resolution/XP and return only.
                    page.evaluate('G.Game.startTechnical({...G.TechnicalUI.options(),seed:1337});G.Game.player.x=G.DimensionalRifts.state.x;G.Game.player.y=G.DimensionalRifts.state.y;G.Expedition.update(.001)')
                    page.evaluate('G.EnemyMgr.all().find(e=>e.dimensional).die();for(let i=0;i<80;i++){if(G.Expedition.state.phase==="levelup")G.Expedition.choose(0);G.Expedition.update(1/30)}')
                    assert page.evaluate('G.DimensionalRifts.state.result')=='defeated'
                    assert page.evaluate('G.Expedition.state.nextBossSector')==6
                    assert page.evaluate('G.Expedition.state.totals.bossesDefeated')==0
                    if not mobile:
                        missing=page.evaluate('''() => {const missing=[];for(let seed=0;seed<64;seed++){
                            G.Game.startTechnical({...G.TechnicalUI.options(),seed});
                            const r=G.DimensionalRifts.state;
                            if(r.status!=='open'||!G.Path.reachable(r.x,r.y,G.Game.player)||!G.World.isFree(r.x,r.y,36))missing.push(seed);
                        }return missing;}''')
                        assert not missing,{'missingDirectTestSeeds':missing}
                    assert not errors,{'errors':errors,'remote':remote,'failed':failed}
                    assert not remote,remote
                    records.append({'entry':entry,'touchEmulated':mobile,'status':'PASS','initial':initial,'audioMeter':audio,'errors':errors,'remoteAttempts':remote})
                    context.close()
            browser.close()
        (OUT/'results.json').write_text(json.dumps({'records':records,'method':'Aislado. Gesto de inicio real, medidor WebAudio, pausa/UI reales. Posición, tiempo de cierre, daño cancelador y muerte se inyectan para transiciones. No aceptación humana, balance, audición física ni FPS.'},indent=2)+'\n',encoding='utf-8')
        print(json.dumps({'result':'PASS','scenarios':len(records),'output':str(OUT)}))
    finally: server.shutdown();server.server_close()
if __name__=='__main__': main()
