"""P06 local aislado: UI, copias/timers y expiración de borrador. No perfil del usuario."""
from pathlib import Path
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from functools import partial
from threading import Thread
from playwright.sync_api import sync_playwright
import os,json
ROOT=Path(__file__).resolve().parents[1]
OUT=Path(os.environ.get('SCP_TEST_ARTIFACTS',ROOT/'tests/artifacts/p06'))
ThreadingHTTPServer.request_queue_size=128
class Quiet(SimpleHTTPRequestHandler):
    def log_message(self,*args):pass
def main():
    OUT.mkdir(parents=True,exist_ok=True)
    server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
    Thread(target=server.serve_forever,daemon=True).start();origin=f'http://127.0.0.1:{server.server_port}';records=[]
    try:
        with sync_playwright() as pw:
            browser=pw.chromium.launch(headless=True)
            for entry in ['dev.html','index.html']:
                for mobile in [False,True]:
                    context=browser.new_context(viewport={'width':390 if mobile else 1280,'height':844 if mobile else 900},has_touch=mobile,is_mobile=mobile)
                    page=context.new_page();errors=[];remote=[];bad=[]
                    page.on('pageerror',lambda e:errors.append(str(e)))
                    page.on('console',lambda m:errors.append(m.text) if m.type=='error' else None)
                    page.on('response',lambda r:bad.append([r.status,r.url]) if r.status>=400 else None)
                    def route(r):
                        if r.request.url.startswith(origin+'/'):r.continue_()
                        else:remote.append(r.request.url);r.abort()
                    page.route('**/*',route)
                    page.goto(origin+'/'+entry+'?prueba=inventario');page.wait_for_selector('#inventory-open:visible')
                    row=lambda id:page.locator('.inventory-row').filter(has=page.locator('[data-copy-id="'+id+'"]'))
                    initial=page.evaluate('G.InventoryTrial.state')
                    page.click('#inventory-open');row('trial:pack:large').get_by_role('button',name='Equipar mochila',exact=True).click()
                    assert page.evaluate('G.InventoryTrial.state')==initial
                    page.click('#inventory-cancel');assert page.evaluate('G.InventoryTrial.state')==initial
                    page.click('#inventory-open');row('trial:pack:large').get_by_role('button',name='Equipar mochila',exact=True).click()
                    page.click('#inventory-confirm');assert page.evaluate('G.InventoryModel.capacity(G.InventoryTrial.state)')==16
                    page.click('#inventory-open');row('trial:mod:extended').get_by_role('button',name='Instalar en arma 1',exact=True).click();page.click('#inventory-confirm')
                    page.click('#btn-technical-start');page.wait_for_selector('#btn-inventory:visible')
                    assert page.evaluate('G.Expedition.state.phase')=='preparation'
                    assert page.evaluate('G.Expedition.state.wave')==1
                    assert page.evaluate('G.RunCheckpoint.capture()') is None
                    assert not page.evaluate('G.LocalAccounts.enabled')
                    page.evaluate('() => {const s=G.FieldCombat.exportData();s.weapons[0].ammo=16;G.FieldCombat.restoreData(s,G.Game.player);}')
                    page.click('#btn-inventory');page.get_by_role('button',name='Retirar Ampliado',exact=True).click();page.click('#inventory-confirm')
                    clamp=page.evaluate('() => {const s=G.InventoryTrial.state;return {actor:G.FieldCombat.state.weapons[0].ammo,owned:s.items[s.equipped.weapons[0]].ammo};}')
                    assert clamp=={'actor':12,'owned':12},clamp
                    # Un único callback sin RAF permite verificar conservación exacta, sin confundir avance legítimo del reloj.
                    preserved=page.evaluate('''() => {const s=G.FieldCombat.exportData();s.weapons[0].ammo=3;s.weapons[0].reload=1.2;s.weapons[0].reloadTime=1.5;s.shotWait=.4;s.switchRemaining=.15;
                        G.FieldCombat.restoreData(s,G.Game.player);const before=G.FieldCombat.exportData();G.InventoryTrial.open();document.getElementById('inventory-confirm').click();
                        const after=G.FieldCombat.exportData();return {same:JSON.stringify(before)===JSON.stringify(after),before,after};}''')
                    assert preserved['same'],preserved
                    beforeSwap=page.evaluate('G.FieldCombat.state.weapons[0].id')
                    page.click('#btn-inventory');row('trial:weapon:shotgun').get_by_role('button',name='Equipar en arma 1',exact=True).click();page.click('#inventory-confirm')
                    assert page.evaluate('G.FieldCombat.state.weapons[0].id')=='trial:weapon:shotgun'
                    assert page.evaluate('(id) => G.InventoryTrial.state.bag.includes(id)',beforeSwap)
                    page.click('#btn-inventory');page.screenshot(path=str(OUT/f'{entry[:-5]}-{"touch" if mobile else "desktop"}-preparation.png'))
                    row('trial:pack:basic').get_by_role('button',name='Equipar mochila',exact=True).click()
                    # El borrador no se confirma: forzar tiempo prueba descarte y primera oleada, no aceptación de balance.
                    page.evaluate('G.Expedition.update(21)');page.wait_for_function('() => !G.InventoryTrial.isOpen')
                    assert page.locator('#inventory-overlay').is_hidden()
                    assert page.evaluate('G.Expedition.state.phase')=='combat'
                    assert page.evaluate('G.Expedition.state.wave')==1
                    assert page.evaluate('G.InventoryTrial.state.equipped.backpack')=='trial:pack:large'
                    assert page.locator('#btn-inventory').is_hidden()
                    assert not errors,errors;assert not remote,remote;assert not bad,bad
                    records.append({'entry':entry,'touchEmulated':mobile,'status':'PASS','clamp':clamp,'timersPreserved':preserved['same'],'errors':errors,'remoteAttempts':remote,'httpFailures':bad})
                    context.close()
            browser.close()
        (OUT/'results.json').write_text(json.dumps({'records':records,'method':'Navegador aislado/perfil vacío. UI real y estados controlados para ammo/reload, callback síncrono de confirmación y salto de21s para expiración. No aceptación humana, cuenta real, economía, FPS ni dispositivo físico.'},indent=2)+'\n',encoding='utf-8')
        print(json.dumps({'result':'PASS','scenarios':len(records),'output':str(OUT)}))
    finally:server.shutdown();server.server_close()
if __name__=='__main__':main()
