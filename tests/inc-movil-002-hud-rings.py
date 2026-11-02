"""HUD rings reflect real health/XP and preserve the existing progress values."""
from pathlib import Path
from functools import partial
from threading import Thread
from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
from playwright.sync_api import sync_playwright
import json,os
ROOT=Path(__file__).resolve().parents[1];ENTRY=os.environ.get('SCP_HUD_ENTRY','dev.html')
class Q(SimpleHTTPRequestHandler):
 def log_message(self,*_):pass
 def copyfile(self,*a):
  try:super().copyfile(*a)
  except (BrokenPipeError,ConnectionResetError,ConnectionAbortedError):pass
class S(ThreadingHTTPServer):request_queue_size=128
server=S(('127.0.0.1',0),partial(Q,directory=str(ROOT)));Thread(target=server.serve_forever,daemon=True).start();rows=[]
try:
 with sync_playwright() as p:
  b=p.chromium.launch(channel='chrome',headless=True)
  for w,h in [(320,568),(390,844),(844,390)]:
   c=b.new_context(viewport={'width':w,'height':h},is_mobile=True,has_touch=True);page=c.new_page();errs=[];page.on('pageerror',lambda e:errs.append(str(e)));page.on('console',lambda e:errs.append(e.text) if e.type=='error' else None)
   page.goto(f'http://127.0.0.1:{server.server_port}/{ENTRY}?prueba=combate-v2&graficos=32');page.wait_for_selector('#btn-technical-start:visible');page.click('#btn-technical-start');page.wait_for_function("()=>G.Game.state==='playing'")
   d=page.evaluate('''()=>{G.Game.togglePause();const p=G.Game.player;p.hp=p.maxHp/2;p.xp=p.xpNext/2;G.CornerHUD.tick(p,G.Expedition.state,G.FieldCombat.state);const hp=document.getElementById('corner-hp-ring'),xp=document.getElementById('corner-xp-ring');return {hp:hp?.getAttribute('stroke-dashoffset'),xp:xp?.getAttribute('stroke-dashoffset'),hpValue:document.getElementById('corner-hp').value,hpMax:p.maxHp,xpValue:document.getElementById('corner-xp').value,xpMax:p.xpNext};}''')
   assert d['hp'] is not None and d['xp'] is not None,d
   assert abs(float(d['hp'])-18*3.141592653589793)<.1 and abs(float(d['xp'])-18*3.141592653589793)<.1,d
   assert d['hpValue']==d['hpMax']/2 and d['xpValue']==d['xpMax']/2,d
   assert not errs,errs;rows.append({'viewport':[w,h],'state':d});c.close()
  b.close()
finally:server.shutdown();server.server_close()
print(json.dumps({'status':'PASS','cases':rows}))
