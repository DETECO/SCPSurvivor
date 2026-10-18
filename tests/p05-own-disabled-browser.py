"""Guardia propia desactivada: navegador aislado, sin cuentas/servicios reales."""
from pathlib import Path
from http.server import SimpleHTTPRequestHandler,ThreadingHTTPServer
from functools import partial
from threading import Thread
from playwright.sync_api import sync_playwright
import os,json
ROOT=Path(__file__).resolve().parents[1]
OUT=Path(os.environ.get('SCP_TEST_ARTIFACTS',ROOT/'tests/artifacts/p05-own-disabled'))
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*args):pass
def main():
 OUT.mkdir(parents=True,exist_ok=True);ThreadingHTTPServer.request_queue_size=128
 server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
 Thread(target=server.serve_forever,daemon=True).start();origin=f'http://127.0.0.1:{server.server_port}';records=[]
 try:
  with sync_playwright() as pw:
   browser=pw.chromium.launch(headless=True)
   for entry in ['dev.html','index.html']:
    for mobile in [False,True]:
     for mixed in [False,True]:
      context=browser.new_context(viewport={'width':390 if mobile else 1280,'height':844 if mobile else 900},has_touch=mobile,is_mobile=mobile)
      page=context.new_page();errors=[];remote=[]
      page.on('pageerror',lambda e:errors.append(str(e)))
      def route(r):
       if r.request.url.startswith(origin+'/'):r.continue_()
       else:remote.append(r.request.url);r.abort()
      page.route('**/*',route)
      page.goto(origin+'/'+entry+'?cuentas=propias'+('&prueba=grieta&inventario=local' if mixed else ''))
      page.wait_for_selector('#account-panel')
      assert page.locator('.developer-credit').inner_text()=='Desarrollado por Ivan Vivanco'
      state=page.evaluate('({mode:G.LocalAccounts.mode,ready:G.LocalAccounts.status.ready,session:G.LocalAccounts.sessionId,rift:G.DimensionalRifts.enabled,inventory:G.InventoryTrial.enabled})')
      assert state=={'mode':'own','ready':False,'session':None,'rift':False,'inventory':False},state
      assert page.locator('#btn-technical-start').is_disabled()
      assert page.locator('#account-google').is_disabled()
      assert 'desactivado' in page.locator('#account-notice').inner_text()
      assert not remote and not errors,(remote,errors)
      if not mixed:
       page.locator('#account-notice').scroll_into_view_if_needed()
       page.screenshot(path=str(OUT/f'{entry[:-5]}-{"mobile" if mobile else "desktop"}.png'))
      records.append({'entry':entry,'mobileEmulated':mobile,'mixedTrialFlags':mixed,'state':state,'remoteAttempts':remote,'pageErrors':errors,'status':'PASS'})
      context.close()
   browser.close()
 finally:server.shutdown();server.server_close()
 (OUT/'results.json').write_text(json.dumps({'records':records,'scope':'Modo propio desactivado. No OAuth/correo real, despliegue, dispositivos físicos ni aceptación P05.'},ensure_ascii=False,indent=2),encoding='utf-8')
 print('PASS: '+str(len(records))+' escenarios de activación propia deshabilitada.')
if __name__=='__main__':main()
