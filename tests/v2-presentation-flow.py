"""Actual contact/expiry and R7 boss/reward/door flow, using disclosed QA time and damage."""
from pathlib import Path
from http.server import SimpleHTTPRequestHandler,ThreadingHTTPServer
from functools import partial
from threading import Thread
from playwright.sync_api import sync_playwright
import os,json,argparse,importlib.util
ROOT=Path(os.environ.get('SCP_TEST_ROOT',Path(__file__).resolve().parents[1])).resolve();ThreadingHTTPServer.request_queue_size=128
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*a):pass
def run(browser,base,entry,kind,out):
 ctx=browser.new_context(viewport={'width':1280,'height':900});p=ctx.new_page();errors=[];http=[];p.on('pageerror',lambda e:errors.append(str(e)));p.on('console',lambda m:errors.append(m.text)if m.type=='error'else None);p.on('response',lambda r:http.append([r.status,r.url])if r.status>=400 else None)
 try:
  query='?prueba=mapa-v2&premios=grieta&graficos=32'if kind=='rift'else'?prueba=combate-v2&rapida=1&graficos=32'
  p.goto(base+entry+query,wait_until='domcontentloaded',timeout=60000);p.wait_for_selector('#operations-menu:visible');p.click('#btn-technical-start');p.wait_for_function("G.Game.state==='playing'")
  if kind=='rift':
   p.wait_for_function("G.DimensionalRifts.state.status==='open'");p.evaluate('G.Game.player.invuln=1e6;G.Game.togglePause()');before=p.evaluate('G.DimensionalRifts.state.remaining');p.wait_for_timeout(200);assert p.evaluate('G.DimensionalRifts.state.remaining')==before
   expired=p.evaluate('''()=>{G.Game.togglePause();G.Expedition.update(46);G.Game.togglePause();return G.DimensionalRifts.state;}''');assert expired['status']=='closed'and expired['remaining']==0
   p.reload();p.wait_for_selector('#btn-technical-start:visible');p.click('#btn-technical-start');p.wait_for_function("G.DimensionalRifts.state.status==='open'")
   contact=p.evaluate('''()=>{const pl=G.Game.player,r=G.DimensionalRifts.state;pl.invuln=1e6;const before=pl.fieldWeapons.map(w=>w.id);const e=new G.Enemy(G.Content.pursuer,r.x+120,r.y,{hp:1,spd:1,dmg:1});G.EnemyMgr.add(e);pl.x=r.x;pl.y=r.y;G.Path.update(1,[pl]);G.Expedition.update(1/60);return{status:G.DimensionalRifts.state.status,before,after:pl.fieldWeapons.map(w=>w.id),survivor:!!G.EnemyMgr.get(e.id),boss:G.EnemyMgr.all().some(e=>e.dimensional),layout:G.World.fixture.layout};}''')
   assert contact['status']=='active'and contact['before']==contact['after']and contact['survivor']and contact['boss'],contact
   p.screenshot(path=str(out/(entry[:-5]+'-rift-contact.png')));data={'expiry':expired['status'],'contact':contact}
  else:
   p.wait_for_function('G.Expedition.state.v2.bossSpawned');p.evaluate('G.Game.togglePause()')
   sp=importlib.util.spec_from_file_location('helpers',ROOT/'tests/v2-infinite-browser.py');m=importlib.util.module_from_spec(sp);sp.loader.exec_module(m);p.evaluate(m.HELPERS)
   locked=p.evaluate('''()=>{const e=G.Expedition.state.exit;qa.at(e.x,e.y);qa.step(1);return qa.snap();}''');assert locked['s']['sector']==1 and not locked['s']['v2']['bossDefeated']
   p.evaluate('qa.kill(false)');p.evaluate('qa.open("boss")');p.wait_for_selector('#armament-choice:visible');p.locator('#armament-choice button').filter(has_text='Pistola').first.click();p.evaluate('''()=>{if(G.Game.state==='playing')G.Game.togglePause();qa.step(1200);}''')
   before=p.evaluate('qa.snap()');assert before['s']['v2']['doorOpen']and before['s']['v2']['bossDefeated']and len(before['s']['v2']['allies'])==2,before['s']['v2']
   after=p.evaluate('''()=>{const e=G.Expedition.state.exit;qa.at(e.x,e.y);qa.step(1);return qa.snap();}''');assert after['s']['sector']==2 and after['s']['v2']['mapTime']<1
   for a,b in zip(before['w'],after['w']):assert (a['id'],a['model'],a['branches'])==(b['id'],b['model'],b['branches'])
   assert p.evaluate('[G.World.fixture.maxX+1,G.World.fixture.maxY+1]')==[160,100]
   data={'lockedBeforeBoss':True,'bossAndRewardResolved':True,'allies':before['s']['v2']['allies'],'nextSector':2,'equipmentPreserved':True}
  assert not errors and not http,{'errors':errors,'http':http};return{'status':'PASS','entry':entry,'kind':kind,**data}
 except Exception:
  print(json.dumps({'entry':entry,'kind':kind,'errors':errors,'http':http}));p.screenshot(path=str(out/'flow-failure.png'));raise
 finally:ctx.close()
def main():
 a=argparse.ArgumentParser();a.add_argument('--live',action='store_true');args=a.parse_args();server=None;out=ROOT/'tests/artifacts/presentation'/('live'if args.live else'local');out.mkdir(parents=True,exist_ok=True)
 try:
  if args.live:base='https://deteco.github.io/SCPSurvivor/'
  else:server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)));Thread(target=server.serve_forever,daemon=True).start();base=f'http://127.0.0.1:{server.server_port}/'
  with sync_playwright()as p:
   b=p.chromium.launch(headless=True)
   try:records=[run(b,base,e,k,out)for e in(['index.html']if args.live else['dev.html','index.html'])for k in['rift','transition']]
   finally:b.close()
  (out/'flows.json').write_text(json.dumps({'status':'PASS','live':args.live,'records':records,'method':'QA positions, damage and accelerated active time; not natural balance or phone acceptance.'},indent=2)+'\n',encoding='utf-8');print(json.dumps({'status':'PASS','flows':len(records)}))
 finally:
  if server:server.shutdown();server.server_close()
if __name__=='__main__':main()
