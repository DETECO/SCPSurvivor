"""Approved presentation integration. Controlled geometry/render fixtures, not natural balance or phone performance."""
from pathlib import Path
from http.server import SimpleHTTPRequestHandler,ThreadingHTTPServer
from functools import partial
from threading import Thread
from playwright.sync_api import sync_playwright
import os,json,argparse
ROOT=Path(os.environ.get('SCP_TEST_ROOT',Path(__file__).resolve().parents[1])).resolve();ThreadingHTTPServer.request_queue_size=128
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*a):pass
 def copyfile(self,*a):
  try:super().copyfile(*a)
  except(ConnectionResetError,BrokenPipeError):pass
def scenario(browser,base,entry,view,mode,out):
 ctx=browser.new_context(viewport={'width':view[0],'height':view[1]},has_touch=view[2],is_mobile=view[2]);page=ctx.new_page();errors=[];http=[]
 page.on('pageerror',lambda e:errors.append(str(e)));page.on('console',lambda m:errors.append(m.text)if m.type=='error'else None);page.on('response',lambda r:http.append([r.status,r.url])if r.status>=400 else None)
 tag=f'{entry[:-5]}-{view[0]}x{view[1]}-{mode}'
 try:
  page.goto(base+entry+'?prueba=combate-v2&graficos='+mode);page.wait_for_selector('#operations-menu:visible');page.wait_for_selector('#btn-technical-start:visible')
  assert page.locator('#operations-menu .developer-credit').inner_text()=='Desarrollado por Ivan Vivanco'
  assert page.locator('#operations-menu [data-practice]').count()==2
  assert page.locator('#character-resolution option').count()==2
  assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
  page.screenshot(path=str(out/(tag+'-home.png')))
  page.locator('[data-screen="home"] [data-open-screen="settings"]').click();page.wait_for_selector('#character-resolution:visible');assert page.locator('#character-resolution').input_value()==mode
  other='16'if mode=='32'else'32';page.select_option('#character-resolution',other);page.wait_for_url('**graficos='+other);page.wait_for_selector('#operations-menu:visible')
  assert page.evaluate('localStorage.getItem("scp.graphics")')==other
  page.locator('[data-screen="home"] [data-open-screen="settings"]').click();page.select_option('#character-resolution',mode);page.wait_for_url('**graficos='+mode);page.wait_for_selector('#operations-menu:visible')
  page.locator('[data-screen="home"] [data-open-screen="soldiers"]').click();page.locator('[data-screen="soldiers"] button[data-role="medic"]').click();assert page.locator('#field-role').input_value()=='medic'
  page.screenshot(path=str(out/(tag+'-soldier.png')));page.locator('[data-confirm-soldier]').click()
  page.locator('.operations-weapon-summary').click();page.wait_for_selector('[data-approved-weapon="AF01"]')
  expected=json.loads((ROOT/'assets/menus/approved-weapons-arm-vis-r1/catalog.json').read_text(encoding='utf-8'))
  shown=page.locator('[data-approved-weapon]').evaluate_all('(nodes)=>nodes.map(node=>node.dataset.approvedWeapon)')
  assert shown==[item['id']for item in expected['entries']]and len(shown)==10,shown
  assert page.locator('[data-equip-weapon], [data-weapon]').count()==0
  page.wait_for_function("Array.from(document.querySelectorAll('.operations-approved-weapon-card img')).every(image=>image.complete&&image.naturalWidth>0)")
  page.screenshot(path=str(out/(tag+'-weapons.png')))
  page.locator('[data-screen="weapons"] [data-open-screen="home"]').first.click()
  page.locator('#btn-technical-start').click();page.wait_for_function("G.Game.state==='playing'",timeout=45000)
  data=page.evaluate('''()=>{
   const p=G.Game.player,f=G.World.fixture;p.invuln=1e6;
   const ticks=[];for(let i=0;i<3;i++){const t=performance.now();G.Path.update(1,[p]);ticks.push(performance.now()-t);}
   return{layout:f.layout,width:f.maxX+1,height:f.maxY+1,role:p.soldierId,weapon:p.fieldWeapons[0].model,body:p.r,mode:G.TrialVisuals.mode,props:G.World.visibleProps(G.Camera).length,pathBuildMs:ticks,accounts:G.LocalAccounts.enabled};
  }''')
  assert data['layout']=='M01-R7-BACKROOMS-MODULAR-25D'and data['width']==240 and data['height']==160 and data['role']=='medic'and data['weapon']=='pistol'and data['mode']==mode and not data['accounts'],data
  # Real input must move the avatar. No teleport is used for this assertion.
  before=page.evaluate('G.Game.player.x');page.keyboard.down('ArrowRight');page.wait_for_timeout(350);page.keyboard.up('ArrowRight');assert page.evaluate('G.Game.player.x')>before+10
  # Render controlled close views from approved regions; not a natural-play acceptance.
  page.evaluate('''()=>{const p=G.Game.player;p.x=97*32;p.y=66*32;G.Camera.x=p.x;G.Camera.y=p.y;G.Path.update(1,[p]);}''');page.wait_for_timeout(100);page.screenshot(path=str(out/(tag+'-scene.png')))
  # Six style previews execute the actual renderer, without granting encounters or rewards.
  styles=page.evaluate('''()=>{const c=document.createElement('canvas');c.width=720;c.height=180;const x=c.getContext('2d');for(let i=1;i<=6;i++)if(!G.RiftVisuals.draw(x,{status:'open',remaining:45,x:i*100-30,y:110,sector:2},1,i))throw Error('rift style unavailable');return c.toDataURL();}''')
  import base64
  (out/(tag+'-rifts.png')).write_bytes(base64.b64decode(styles.split(',')[1]))
  assert not errors and not http,{'errors':errors,'http':http}
  return{'status':'PASS','entry':entry,'viewport':view,'mode':mode,**data}
 except Exception:
  print(json.dumps({'tag':tag,'errors':errors,'http':http}));page.screenshot(path=str(out/'failure.png'));raise
 finally:ctx.close()
def main():
 a=argparse.ArgumentParser();a.add_argument('--live',action='store_true');a.add_argument('--smoke',action='store_true');args=a.parse_args();server=None;out=ROOT/'tests/artifacts/presentation'/('live'if args.live else'local');out.mkdir(parents=True,exist_ok=True)
 try:
  if args.live:base='https://deteco.github.io/SCPSurvivor/'
  else:server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)));Thread(target=server.serve_forever,daemon=True).start();base=f'http://127.0.0.1:{server.server_port}/'
  with sync_playwright()as p:
   browser=p.chromium.launch(headless=True)
   try:records=[scenario(browser,base,e,v,m,out)for e in(['index.html']if args.live else['dev.html']if args.smoke else['dev.html','index.html'])for v in([(1280,900,False)]if args.smoke else[(1280,900,False),(390,844,True),(844,390,True)])for m in(['32']if args.smoke else['16','32'])]
   finally:browser.close()
  (out/'results.json').write_text(json.dumps({'status':'PASS','live':args.live,'records':records,'physicalPhoneTested':False},indent=2)+'\n',encoding='utf-8');print(json.dumps({'status':'PASS','scenarios':len(records),'pathMs':[r['pathBuildMs']for r in records]}))
 finally:
  if server:server.shutdown();server.server_close()
if __name__=='__main__':main()
