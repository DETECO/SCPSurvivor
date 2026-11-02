"""Reproduce D4/visible anomaly identity; forced contact/position is not a natural-balance test."""
from pathlib import Path
from functools import partial
from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
from threading import Thread
from playwright.sync_api import sync_playwright
import json,os
ROOT=Path(__file__).resolve().parents[1];ENTRY=os.environ.get('SCP_COMBAT_ENTRY','index.html');assert ENTRY in ('dev.html','index.html')
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*_):pass
 def copyfile(self,*a):
  try:super().copyfile(*a)
  except (ConnectionResetError,ConnectionAbortedError,BrokenPipeError):pass
class Server(ThreadingHTTPServer):request_queue_size=128
server=Server(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)));Thread(target=server.serve_forever,daemon=True).start();rows=[]
try:
 with sync_playwright() as p:
  browser=p.chromium.launch(channel='chrome',headless=True)
  for mode,w,h in [('16',390,844),('32',844,390)]:
   ctx=browser.new_context(viewport={'width':w,'height':h},is_mobile=True,has_touch=True);page=ctx.new_page();errs=[]
   page.on('pageerror',lambda e:errs.append(str(e)));page.on('console',lambda e:errs.append(e.text) if e.type=='error' else None)
   page.goto(f'http://127.0.0.1:{server.server_port}/{ENTRY}?prueba=combate-v2&ensayo=grietas&grado=D4&gacha=prueba&graficos={mode}');page.wait_for_selector('#btn-technical-start:visible');page.click('#btn-technical-start');page.wait_for_function("()=>G.Game.state==='playing'")
   before=page.evaluate('''()=>{const p=G.Game.player,r=G.RiftExpedition.state.portal;p.invuln=1e6;return {tier:r.tier,active:G.RiftExpedition.state.active,notice:G.RiftExpedition.state.notice,identityVisible:document.body.innerText.includes('Portador de Espinas')}}''')
   assert before['tier']=='D4' and not before['active'] and not before['identityVisible'],before
   page.evaluate('''()=>{const p=G.Game.player,r=G.RiftExpedition.state.portal;p.x=r.x;p.y=r.y;G.Expedition.update(1/60)}''');page.wait_for_function("()=>G.RiftExpedition.state.status==='combat'",timeout=30000)
   data=page.evaluate('''()=>{const p=G.Game.player,b=G.EnemyMgr.all().find(e=>e.dimensional&&!e.dead);if(!b)throw Error('No existe anomalia');
     const s=G.RiftExpedition.state;G.Camera.x=b.x;G.Camera.y=b.y;const canvas=document.createElement('canvas');canvas.width=512;canvas.height=512;const c=canvas.getContext('2d');c.translate(256-b.x,256-b.y);b.draw(c);const px=c.getImageData(0,0,512,512).data;let visible=0;for(let i=3;i<px.length;i+=4)if(px[i])visible++;
     return {tier:s.tier,name:s.name,hp:s.bossHp,max:s.bossMaxHp,bossInCamera:G.Camera.sees(b.x,b.y,0),renderedPixels:visible};}''')
   page.wait_for_timeout(250);ui=page.locator('body').inner_text();assert data['tier']=='D4' and 'Portador' in data['name'] and data['max']>0 and data['hp']>0 and data['bossInCamera'] and data['renderedPixels']>20,data
   assert 'Portador' in ui,ui[:500];assert not errs,errs
   rows.append({'mode':mode,'data':data,'preEntry':before,'errors':errs});ctx.close()
  browser.close()
finally:server.shutdown();server.server_close()
out=ROOT/'tests/artifacts/inc-movil-002-combate.json';out.parent.mkdir(parents=True,exist_ok=True);out.write_text(json.dumps({'status':'PASS','method':'portal and camera forced; no natural balance or device claim','cases':rows},ensure_ascii=False,indent=2),encoding='utf8');print(json.dumps({'status':'PASS','cases':rows},ensure_ascii=False))
