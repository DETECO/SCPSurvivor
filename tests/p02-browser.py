"""Recorridos P02 en navegador: controles reales y flujo completo con paso fijo."""
from pathlib import Path
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from threading import Thread
from functools import partial
from playwright.sync_api import sync_playwright
import json
import os
import shutil
ROOT=Path(__file__).resolve().parents[1]
OUT=Path(os.environ.get('SCP_TEST_ARTIFACTS',str(ROOT/'tests/artifacts/p02')))
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*args):pass

def main():
 OUT.mkdir(parents=True,exist_ok=True)
 server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
 Thread(target=server.serve_forever,daemon=True).start()
 origin=f'http://127.0.0.1:{server.server_port}'
 records=[]
 try:
  with sync_playwright() as pw:
   browser=pw.chromium.launch(executable_path=shutil.which('chromium'),args=['--no-sandbox','--disable-dev-shm-usage'],headless=True)
   for entry in ['dev.html','index.html']:
    for mobile in [False,True]:
     context=browser.new_context(viewport={'width':390 if mobile else 1280,'height':844 if mobile else 900},has_touch=mobile,is_mobile=mobile)
     context.add_init_script('let seed=1337;Math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};');page=context.new_page();errors=[];remote=[];bad=[];resources=[]
     page.on('pageerror',lambda e:errors.append(str(e)))
     page.on('console',lambda m:errors.append(m.text) if m.type=='error' else None)
     page.on('request',lambda r:resources.append(r.url))
     page.on('response',lambda r:bad.append([r.status,r.url]) if r.status>=400 else None)
     def route(r):
      if r.request.url.startswith(origin+'/'):r.continue_()
      else:remote.append(r.request.url);r.abort()
     page.route('**/*',route)
     page.goto(origin+'/'+entry,wait_until='networkidle')
     assert page.evaluate('!!(window.G && G.Expedition)'), 'Falta el controlador de partida'
     page.click('#btn-technical-start');page.wait_for_timeout(3500)
     assert page.evaluate('G.Game.player.baseSpd')==165
     assert page.evaluate('G.FieldCombat.state.shots>0'),'Falta disparo automático'
     if mobile:
      rect=page.locator('#game').bounding_box();x=rect['x']+rect['width']*.5;y=rect['y']+rect['height']*.65
      page.dispatch_event('#game','pointerdown',{'pointerType':'touch','pointerId':8,'clientX':x,'clientY':y})
      page.dispatch_event('#game','pointermove',{'pointerType':'touch','pointerId':8,'clientX':x+12,'clientY':y})
      old=page.evaluate('G.Game.player.x');page.wait_for_timeout(180)
      assert page.evaluate('G.Game.player.x')>old+10
      page.dispatch_event('#game','pointerup',{'pointerType':'touch','pointerId':8,'clientX':x+12,'clientY':y})
     page.click('#btn-sprint');page.wait_for_timeout(50)
     assert page.evaluate('G.FieldCombat.state.sprintRemaining')>1
     assert page.evaluate('G.Game.player.spd')>=264
     page.click('#btn-technical-pause')
     before=page.evaluate('({e:G.Expedition.state.elapsed,w:G.FieldCombat.state,x:G.Game.player.x})')
     page.wait_for_timeout(200)
     assert page.evaluate('G.Expedition.state.elapsed')==before['e']
     assert page.evaluate('G.FieldCombat.state')==before['w']
     assert page.evaluate('G.Game.player.x')==before['x']
     page.click('#btn-technical-resume')
     page.evaluate("Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'))")
     assert page.evaluate('G.Game.state')=='paused'
     page.evaluate("Object.defineProperty(document,'hidden',{configurable:true,value:false});document.dispatchEvent(new Event('visibilitychange'))")
     assert page.evaluate('G.Game.state')=='paused'
     page.click('#btn-technical-resume')
     if mobile:
      page.set_viewport_size({'width':844,'height':390});page.wait_for_timeout(100)
      assert page.evaluate('Math.abs(G.Camera.w-768)<.01 && Math.abs(G.Camera.h-768)<.01')
      page.set_viewport_size({'width':390,'height':844});page.wait_for_timeout(100)
     page.screenshot(path=str(OUT/f'{entry[:-5]}-{"mobile" if mobile else "desktop"}-combat.png'))
     full=None
     if mobile:
      page.click('#btn-technical-pause');page.click('#btn-technical-menu');page.click('#btn-technical-start')
      # Pérdida/atasco: misma identidad/vida, sin generar una baja falsa.
      recovery=page.evaluate('''() => {
       const e=G.EnemyMgr.all()[0],id=e.id,hp=e.hp;e.x=5000;e.y=0;
       for(let n=0;n<660;n++)G.Expedition.update(1/60);
       return {same:G.EnemyMgr.get(id)===e,hp,after:e.hp,dead:e.dead,reachable:G.Path.reachable(e.x,e.y,G.Game.player)};
      }''')
      assert recovery['same'] and recovery['reachable'] and not recovery['dead'],recovery
      assert recovery['after']==recovery['hp'],recovery
      page.evaluate('G.Game.startTechnical()')
      # El flujo es el de producción; aceleramos solo la ejecución del test, no las reglas.
      page.evaluate('window.__P02_STOP_PREP=true')
      first=page.evaluate((ROOT/'tests/helpers/p02-autoplay.js').read_text())
      assert first['status']=='preparation',first
      page.wait_for_timeout(100)
      assert page.locator('#field-upgrades').is_visible()
      assert page.locator('#upgrade-cards button').count()==3
      before=page.evaluate('({e:G.Expedition.state.elapsed,p:G.Expedition.state.prep,w:G.FieldCombat.state})')
      page.wait_for_timeout(250)
      assert page.evaluate('G.Expedition.state.elapsed')==before['e']
      assert page.evaluate('G.Expedition.state.prep')==before['p']
      assert page.evaluate('G.FieldCombat.state')==before['w']
      pending=page.evaluate('G.Expedition.state.pending')
      page.locator('#upgrade-cards button').first.evaluate('(b)=>{b.click();b.click()}')
      assert page.evaluate('G.Expedition.state.pending')==pending-1,'Doble click no debe consumir la siguiente selección'
      while page.evaluate('G.Expedition.state.pending')>0:
       page.wait_for_timeout(50);page.locator('#upgrade-cards button').first.click()
      page.click('#btn-field-ready')
      page.evaluate('window.__P02_STOP_PREP=false;window.__P02_STOP_EXTRACTION=true')
      part=page.evaluate((ROOT/'tests/helpers/p02-autoplay.js').read_text())
      assert part['status']=='extracting',part
      page.keyboard.down('KeyD');page.wait_for_timeout(80);page.keyboard.up('KeyD')
      assert page.evaluate('G.Expedition.state.phase')=='exploration','Moverse debe cancelar extracción'
      page.keyboard.down('KeyA');page.wait_for_timeout(160);page.keyboard.up('KeyA')
      page.wait_for_timeout(100)
      page.on('dialog',lambda d:d.accept())
      page.click('#btn-field-exit');page.wait_for_timeout(3300)
      full={'status':page.evaluate('G.Expedition.state.result.reason'),'result':page.evaluate('G.Expedition.state.result'),'log':first['log']+part['log']}

      assert full['status']=='extracted',full
      assert full['result']['kills']==116 and full['result']['sector']==2
      page.wait_for_timeout(100)
      assert page.locator('#field-result').is_visible()
      page.screenshot(path=str(OUT/f'{entry[:-5]}-extracted.png'))
      page.click('#btn-result-restart');page.wait_for_timeout(50)
      assert page.evaluate('G.Game.player.hp==100 && G.Game.player.level==1 && G.Game.player.kills==0')
      page.evaluate('G.Game.player.hurt(1000)');page.wait_for_timeout(100)
      assert page.evaluate('G.Expedition.state.result.reason')=='death'
      assert page.locator('#field-result').is_visible()
      page.click('#btn-result-menu');assert page.evaluate('G.Game.state')=='ui'
     assert not errors,errors
     assert not remote,remote
     assert not bad,bad
     assert page.evaluate('G.FIREBASE_CONFIG===null && !G.ENABLE_CLOUD && !G.ENABLE_MULTIPLAYER && !G.ENABLE_SOCIAL')
     assert not page.evaluate('navigator.serviceWorker.controller!==null')
     records.append({'entry':entry,'touchEmulated':mobile,'status':'PASS','requests':len(resources),'remoteAttempts':0,'errors':0,'httpFailures':0,'completeFlow':full})
     context.close()
   browser.close()
  (OUT/'results.json').write_text(json.dumps({'version':'P02-local-01','records':records,'completeFlowMethod':'Controles de teclado y paso fijo 1/60 sobre controlador/módulos reales; no medición FPS ni prueba física'},indent=2)+'\n')
  print(json.dumps({'scenarios':[{k:v for k,v in r.items() if k!='completeFlow'} for r in records],'completeFlows':sum(bool(r['completeFlow']) for r in records),'result':'PASS'}))
 finally:server.shutdown();server.server_close()
if __name__=='__main__':main()
