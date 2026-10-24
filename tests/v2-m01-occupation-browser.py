"""NIV-ESC-008-A: controlled population/navigation and spawn QA, not natural balance or phone FPS."""
from pathlib import Path
from http.server import SimpleHTTPRequestHandler,ThreadingHTTPServer
from functools import partial
from threading import Thread
from playwright.sync_api import sync_playwright
import os,json
ROOT=Path(os.environ.get('SCP_TEST_ROOT',Path(__file__).resolve().parents[1])).resolve()
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*a):pass
 def copyfile(self,*a):
  try:super().copyfile(*a)
  except(ConnectionResetError,BrokenPipeError):pass
def main():
 out=ROOT/'tests/artifacts/rev-est-0006/m01';out.mkdir(parents=True,exist_ok=True)
 server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)));Thread(target=server.serve_forever,daemon=True).start();records=[]
 try:
  with sync_playwright()as pw:
   b=pw.chromium.launch(headless=True)
   try:
    for width,height in[(390,844),(844,390),(1280,900)]:
     for mode in['16','32']:
      c=b.new_context(viewport={'width':width,'height':height},has_touch=width<900);p=c.new_page();errors=[];p.on('pageerror',lambda e:errors.append(str(e)))
      p.goto(f'http://127.0.0.1:{server.server_port}/index.html?prueba=combate-v2&graficos={mode}');p.click('#btn-technical-start');p.wait_for_function("G.Game.state==='playing'")
      result=p.evaluate('''()=>{
       const p=G.Game.player;p.invuln=1e6;G.Game.togglePause();const f=G.World.fixture;
       const spawns=[],add=G.EnemyMgr.add;
       G.EnemyMgr.add=function(e){spawns.push({visible:G.Camera.sees(e.x,e.y,20),free:G.World.isFree(e.x,e.y,e.r),distance:Math.hypot(e.x-p.x,e.y-p.y),r:e.r});return add.call(this,e);};
       const fire=G.FieldCombat.tick;G.FieldCombat.tick=(dt,p)=>fire(dt,p,false);const counts=[];for(let i=0;i<90*60;i++){G.Expedition.update(1/60);if(i%600===0)counts.push(G.EnemyMgr.count);}
       G.EnemyMgr.add=add;G.FieldCombat.tick=fire;
       const occupied=G.EnemyMgr.all().filter(e=>!e.dead).map(e=>({r:e.r,free:G.World.isFree(e.x,e.y,e.r),reachable:G.Path.reachable(e.x,e.y,p)}));
       return{revision:f.sceneRevision,cameraWidth:G.Camera.w,speed:G.FieldCatalog.soldiers[p.soldierId].speed,playerRadius:p.r,spawns,counts,occupied,time:G.Expedition.state.v2.mapTime};
      }''')
      assert result['revision']=='NIV-ESC-008-A-r1'and result['playerRadius']==12 and result['speed']==165
      if height>width:assert result['cameraWidth']==512
      assert len(result['spawns'])>10 and all(not s['visible']and s['free']and s['distance']>100 for s in result['spawns'])
      assert all(e['free']and e['reachable']for e in result['occupied']) and max(result['counts'])<=23 and abs(result['time']-90)<1
      p.screenshot(path=str(out/f'{width}-{height}-{mode}-population.png'));assert not errors,errors
      records.append({'status':'PASS','viewport':[width,height],'mode':mode,**result});c.close()
   finally:b.close()
 finally:server.shutdown();server.server_close()
 (out/'occupation.json').write_text(json.dumps({'status':'PASS','records':records,'method':'Stationary invulnerable QA player, firing disabled, actual Expedition and enemy AI for90 active seconds: offscreen admission, real-radius collision, reachability and23 regular-enemy pre-boss cap. Not natural escape, balance or phone performance.'},indent=2)+'\n',encoding='utf-8');print(json.dumps({'status':'PASS','scenarios':len(records)}))
if __name__=='__main__':main()
