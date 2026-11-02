"""Radar legend must remain visible below radar in mobile combat and rift."""
from pathlib import Path
from http.server import SimpleHTTPRequestHandler,ThreadingHTTPServer
from functools import partial
from threading import Thread
from playwright.sync_api import sync_playwright
import json,os
ROOT=Path(__file__).resolve().parents[1];ENTRY=os.environ.get('SCP_RADAR_ENTRY','dev.html'); assert ENTRY in ('dev.html','index.html')
class Q(SimpleHTTPRequestHandler):
 def log_message(self,*_):pass
 def copyfile(self,*a):
  try:super().copyfile(*a)
  except (BrokenPipeError,ConnectionAbortedError,ConnectionResetError):pass
class S(ThreadingHTTPServer):request_queue_size=128
server=S(('127.0.0.1',0),partial(Q,directory=str(ROOT)));Thread(target=server.serve_forever,daemon=True).start();rows=[]
try:
 with sync_playwright() as pw:
  b=pw.chromium.launch(channel='chrome',headless=True)
  for w,h in [(320,568),(375,667),(390,844),(844,390)]:
   for route in ('normal','grieta'):
    c=b.new_context(viewport={'width':w,'height':h},is_mobile=True,has_touch=True);p=c.new_page();errors=[];p.on('pageerror',lambda e:errors.append(str(e)));p.on('console',lambda e:errors.append(e.text) if e.type=='error' else None)
    q='&ensayo=grietas&grado=D4' if route=='grieta' else '&escenario=p1-cuatro'
    p.goto(f'http://127.0.0.1:{server.server_port}/{ENTRY}?prueba=combate-v2&gacha=prueba&graficos=32{q}');p.wait_for_selector('#btn-technical-start:visible');p.click('#btn-technical-start');p.wait_for_function("()=>G.Game.state==='playing'")
    if route=='grieta':p.evaluate('''()=>{const p=G.Game.player;p.invuln=1e6;const r=G.RiftExpedition.state.portal;p.x=r.x;p.y=r.y;G.Expedition.update(1/60)}''');p.wait_for_function("()=>G.RiftExpedition.state.status==='combat'",timeout=30000)
    p.wait_for_selector('#radar-wrap:visible',timeout=5000)
    x=p.evaluate('''()=>{const c=document.querySelector('#field-radar').getBoundingClientRect(),e=document.querySelector('#radar-wrap small'),r=e.getBoundingClientRect(),parent=getComputedStyle(e.parentElement);return {legend:e.textContent.trim(),canvasBottom:c.bottom,legendTop:r.top,legendBottom:r.bottom,left:r.left,right:r.right,width:innerWidth,height:innerHeight,overflow:parent.overflow,scroll:e.scrollWidth,client:e.clientWidth,gachaOverlap:(()=>{const x=document.getElementById('gacha-trial-open');if(!x||x.hidden||!x.getClientRects().length)return false;const b=x.getBoundingClientRect();return b.left<r.right&&b.right>r.left&&b.top<r.bottom&&b.bottom>r.top})()}}''')
    assert x['client']>0 and x['legendBottom']>x['legendTop'],(w,h,route,x)
    assert not x['gachaOverlap'],(w,h,route,x)
    assert x['legend']=='NORTE \u00b7 900 u',repr(x['legend'])
    assert x['legend'] and x['legendTop']>=x['canvasBottom']-1 and x['legendBottom']<=h and x['left']>=0 and x['right']<=w and x['overflow']=='visible' and x['scroll']<=x['client'],(w,h,route,x)
    assert not errors,errors;rows.append({'viewport':[w,h],'route':route,'radar':x});c.close()
  b.close()
finally:server.shutdown();server.server_close()
print(json.dumps({'status':'PASS','cases':len(rows),'rows':rows},ensure_ascii=False))
