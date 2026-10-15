from pathlib import Path
from functools import partial
from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
from threading import Thread
from playwright.sync_api import sync_playwright
import json,os
r=Path(__file__).resolve().parents[1]
ThreadingHTTPServer.request_queue_size = 128
class Q(SimpleHTTPRequestHandler):
 def log_message(self,*a):pass
s=ThreadingHTTPServer(('127.0.0.1',0),partial(Q,directory=str(r)));Thread(target=s.serve_forever,daemon=True).start();records=[]
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,args=['--no-sandbox'])
 for entry in ['dev.html','index.html']:
  page=b.new_page(viewport={'width':390,'height':844},is_mobile=True,has_touch=True);page.goto(f'http://127.0.0.1:{s.server_port}/{entry}',wait_until='networkidle');page.click('#btn-technical-start');page.evaluate('G.Game.player.hurt(1000)');page.wait_for_timeout(100)
  result=page.evaluate('G.Expedition.state.result');assert result['reason']=='death' and result['hp']==0;assert page.locator('#field-result').is_visible()
  page.evaluate('G.Expedition.finish("extracted")');assert page.evaluate('G.Expedition.state.result')==result
  page.click('#btn-result-restart');page.wait_for_timeout(50);restart=page.evaluate('({hp:G.Game.player.hp,level:G.Game.player.level,kills:G.Game.player.kills})');assert restart=={'hp':100,'level':1,'kills':0};page.close();records.append({'entry':entry,'result':result,'restart':restart,'uniqueResult':True,'status':'PASS'})
 b.close()
s.shutdown();out=Path(os.environ.get('SCP_DEATH_ARTIFACT',str(r/'tests/artifacts/p03-death-validation.json')));out.parent.mkdir(parents=True,exist_ok=True);out.write_text(json.dumps({'method':'Controlled damage1000, real source/compiled browser run; not gameplay balance','records':records},indent=2));print(json.dumps(records))
