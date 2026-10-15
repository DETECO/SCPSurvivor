"""Pruebas de integración P01 con Chromium local; no conectan servicios remotos."""
from pathlib import Path
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from threading import Thread
from functools import partial
import argparse
import json
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
ThreadingHTTPServer.request_queue_size = 128

class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *_):
        pass

def run(boot_only=False):
    server = ThreadingHTTPServer(('127.0.0.1', 0), partial(QuietHandler, directory=str(ROOT)))
    Thread(target=server.serve_forever, daemon=True).start()
    origin = f'http://127.0.0.1:{server.server_port}'
    records = []
    try:
        with sync_playwright() as pw:
            browser = pw.chromium.launch(headless=True,
                                         args=['--no-sandbox', '--disable-dev-shm-usage'])
            for entry in (['dev.html'] if boot_only else ['dev.html', 'index.html']):
                for mobile in ([False] if boot_only else [False, True]):
                    context = browser.new_context(viewport={'width': 390 if mobile else 1280,
                                                            'height': 844 if mobile else 900},
                                                  is_mobile=mobile, has_touch=mobile,
                                                  device_scale_factor=3 if mobile else 1)
                    page = context.new_page()
                    errors, remote, requests, failed = [], [], [], []
                    page.on('pageerror', lambda e: errors.append(str(e)))
                    page.on('console', lambda m: errors.append(m.text) if m.type == 'error' else None)
                    page.on('request', lambda r: requests.append(r.url))
                    page.on('response', lambda r: failed.append([r.status, r.url]) if r.status >= 400 else None)
                    def route(req):
                        if req.request.url.startswith(origin + '/'):
                            req.continue_()
                        else:
                            remote.append(req.request.url)
                            req.abort()
                    page.route('**/*', route)
                    page.goto(origin + '/' + entry, wait_until='networkidle')
                    assert page.locator('#technical-ready').is_visible(), 'Falta el menú técnico propio y su arranque local'
                    assert not errors, errors
                    if boot_only:
                        print(json.dumps({'boot': 'PASS', 'entry': entry}))
                        context.close()
                        continue
                    assert not page.get_by_text('PokéSurvivor', exact=False).count()
                    if mobile:
                        page.locator('#btn-technical-start').click()
                    else:
                        page.keyboard.press('Tab')
                        assert page.evaluate('document.activeElement.id') == 'btn-technical-start', 'El menú debe permitir Tab'
                        page.keyboard.press('Enter')
                    page.wait_for_function("G.Game.state === 'playing' && G.Game.player")
                    page.wait_for_function("G.Sprites.sheet('guard01', 'Idle').ready")
                    for keys, expected in [(['KeyW'], [0,-1]),(['KeyS'],[0,1]),
                                           (['KeyA'],[-1,0]),(['KeyD'],[1,0]),
                                           (['KeyW','KeyD'],[.707107,-.707107]),
                                           (['KeyS','KeyD'],[.707107,.707107]),
                                           (['KeyS','KeyA'],[-.707107,.707107]),
                                           (['KeyW','KeyA'],[-.707107,-.707107])]:
                        for key in keys: page.keyboard.down(key)
                        axis=page.evaluate('G.Input.axis()')
                        assert all(abs(a-b)<.00001 for a,b in zip(axis,expected)),(keys,axis)
                        for key in keys: page.keyboard.up(key)
                    p0 = page.evaluate('({x:G.Game.player.x,y:G.Game.player.y})')
                    page.keyboard.down('KeyD')
                    page.wait_for_timeout(300)
                    page.keyboard.up('KeyD')
                    p1 = page.evaluate('({x:G.Game.player.x,y:G.Game.player.y})')
                    assert p1['x'] > p0['x'] + 10 and abs(p1['y'] - p0['y']) < 1, (p0, p1)
                    page.locator('#btn-technical-pause').click()
                    if not mobile:
                        page.focus('#btn-technical-resume')
                        page.keyboard.press('Tab')
                        assert page.evaluate('document.activeElement.id') == 'btn-technical-menu'
                    paused = page.evaluate('({x:G.Game.player.x,y:G.Game.player.y,time:G.Game.st.time})')
                    page.keyboard.down('KeyD')
                    page.wait_for_timeout(250)
                    assert page.evaluate('G.Game.state') == 'paused'
                    assert page.evaluate('G.Game.st.time') == paused['time']
                    assert page.evaluate('G.Game.player.x') == paused['x']
                    page.keyboard.up('KeyD')
                    page.locator('#btn-technical-resume').click()
                    assert page.evaluate('G.Game.state') == 'playing'
                    # El foco y segundo plano deben parar y borrar entrada pendiente.
                    page.keyboard.down('KeyD')
                    page.evaluate("window.dispatchEvent(new Event('blur'))")
                    assert page.evaluate('G.Game.state') == 'paused'
                    assert page.evaluate('G.Input.axis()') == [0, 0]
                    page.keyboard.up('KeyD')
                    page.locator('#btn-technical-resume').click()
                    page.evaluate("Object.defineProperty(document,'hidden',{configurable:true,value:true}); document.dispatchEvent(new Event('visibilitychange'))")
                    assert page.evaluate('G.Game.state') == 'paused'
                    page.evaluate("Object.defineProperty(document,'hidden',{configurable:true,value:false}); document.dispatchEvent(new Event('visibilitychange'))")
                    assert page.evaluate('G.Game.state') == 'paused', 'Volver al foco no debe reanudar solo'
                    page.locator('#btn-technical-resume').click()
                    # Colisión real contra la pared exterior, sin atravesarla por mantener dirección.
                    wall=page.evaluate('''() => {const m=G.SectorMaps.generate(G.Expedition.state.mapSeed),T=G.World.TS; const [x,y]=m.floorTiles.find(([x,y])=>G.World.isFree((x+.5)*T,(y+.5)*T,G.Game.player.r)&&G.World.isWall((x+1.5)*T,(y+.5)*T));G.Game.player.x=(x+.5)*T;G.Game.player.y=(y+.5)*T;return (x+1)*T;}''')
                    page.keyboard.down('KeyD')
                    page.wait_for_timeout(350)
                    page.keyboard.up('KeyD')
                    assert page.evaluate('G.Game.player.x + G.Game.player.r') <= wall + .01
                    page.locator('#btn-technical-pause').click()
                    page.locator('#btn-technical-menu').click()
                    assert page.evaluate('G.Game.state') == 'ui'
                    page.locator('#btn-technical-start').click()
                    assert page.evaluate('(()=>{const p=G.SectorMaps.generate(G.Expedition.state.mapSeed).entry;return Math.hypot(G.Game.player.x-p.x,G.Game.player.y-p.y)<1})()')
                    if mobile:
                        # Puntero táctil emulado; coordenadas de viewport con canvas desplazado.
                        box = page.locator('#game').bounding_box()
                        x,y = box['x'] + box['width'] * .4, box['y'] + box['height'] * .55
                        for kind,dx in [('pointerdown',0),('pointermove',45)]:
                            page.dispatch_event('#game', kind, {'pointerId': 7, 'pointerType':'touch',
                                                               'clientX':x+dx, 'clientY':y, 'bubbles':True})
                        start_x = page.evaluate('G.Game.player.x')
                        page.wait_for_timeout(350)
                        assert page.evaluate('G.Game.player.x') > start_x + 10
                        page.dispatch_event('#game', 'pointerup', {'pointerId':7,'pointerType':'touch','clientX':x+45,'clientY':y})
                        assert page.evaluate('G.Touch.vector()') is None
                        page.set_viewport_size({'width':844,'height':390})
                        page.wait_for_timeout(100)
                        assert page.evaluate('G.Game.state') == 'playing'
                    assert page.evaluate('G.Camera.w>=768 && G.Camera.h>=420')
                    assert page.evaluate('G.ENABLE_CLOUD === false && G.ENABLE_MULTIPLAYER === false && G.ENABLE_SOCIAL === false && G.ENABLE_SIGNUPS === false && G.FIREBASE_CONFIG === null')
                    assert page.evaluate('G.Game.player instanceof G.Player')
                    assert page.evaluate('G.World.fixture !== null')
                    assert page.evaluate('performance.getEntriesByType("resource").every(r=>r.name.startsWith(location.origin+"/"))')
                    assert page.evaluate('localStorage.getItem("ps.save") === null')
                    assert not page.evaluate('navigator.serviceWorker.controller !== null')
                    assert not remote, remote
                    assert not failed, failed
                    assert not errors, errors
                    out = ROOT.parent / 'p01-work' / f'{entry.replace(".html", "")}-{"mobile" if mobile else "desktop"}.png'
                    page.screenshot(path=str(out), full_page=True)
                    records.append({'entry':entry,'touchEmulated':mobile,'requests':len(requests),
                                    'remoteAttempts':len(remote),'errors':len(errors),'httpFailures':len(failed),'status':'PASS'})
                    context.close()
            # Fallos de carga y configuración insegura deben ser visibles, sin arrancar servicios.
            failures=[]
            if not boot_only:
                for fault in ['missing_module','unsafe_config']:
                    context=browser.new_context(viewport={'width':1280,'height':900})
                    page=context.new_page()
                    remote=[]
                    def intercept(req):
                        url=req.request.url
                        if not url.startswith(origin+'/'):
                            remote.append(url);req.abort();return
                        if fault=='missing_module' and url.endswith('/js/data/content.js'):
                            req.fulfill(status=200,content_type='text/javascript',body='/* recurso incompleto simulado */');return
                        if fault=='unsafe_config' and url.endswith('/js/core/firebase-config.js'):
                            body=(ROOT/'js/core/firebase-config.js').read_text().replace('G.ENABLE_CLOUD = false;','G.ENABLE_CLOUD = true;')
                            req.fulfill(status=200,content_type='text/javascript',body=body);return
                        req.continue_()
                    page.route('**/*',intercept)
                    page.goto(origin+'/dev.html',wait_until='networkidle')
                    assert page.locator('#boot').is_visible()
                    assert not page.locator('#technical-ready').is_visible()
                    assert not page.evaluate('!!G.Game.player')
                    assert not remote,remote
                    failures.append({'fault':fault,'visibleFailure':True,'remoteAttempts':0,'status':'PASS'})
                    context.close()
            browser.close()
        if not boot_only:
            result={'browser':'Chromium (Playwright)','scenarios':records,'failureChecks':failures}
            (ROOT.parent/'p01-work'/'browser-results.json').write_text(json.dumps(result,indent=2)+'\n')
            print(json.dumps(result,ensure_ascii=False))
    finally:
        server.shutdown()
        server.server_close()

if __name__ == '__main__':
    parser=argparse.ArgumentParser()
    parser.add_argument('--boot-only',action='store_true')
    run(parser.parse_args().boot_only)
