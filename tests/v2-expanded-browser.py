"""T1B/C QA: disclosed fixtures, controlled positions/time. Not balance or physical phone acceptance."""
from pathlib import Path
from http.server import SimpleHTTPRequestHandler,ThreadingHTTPServer
from functools import partial
from threading import Thread
from urllib.parse import urlsplit
from playwright.sync_api import sync_playwright
import argparse,os,json
ROOT=Path(os.environ.get('SCP_TEST_ROOT',Path(__file__).resolve().parents[1])).resolve()
ThreadingHTTPServer.request_queue_size=128
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*args):pass
HELPER='''() => {
 const p=G.Game.player;p.invuln=1e6;
 window.bc={
  at(x,y){p.x=x;p.y=y;G.Camera.x=x;G.Camera.y=y;G.Path.update(1,[p]);},
  snap(){return JSON.parse(JSON.stringify({s:G.Expedition.state,w:p.fieldWeapons,g:p.tempStats,t:G.WeaponTerminal.state,radar:G.FieldRadar.markers(p,G.Expedition.state),account:G.LocalAccounts.enabled,checkpoint:G.RunCheckpoint.capture()}));},
  step(n){if(G.Game.state==='paused')G.Game.togglePause();try{for(let i=0;i<n;i++)G.Expedition.update(1/60);G.TechnicalUI.tick(p,0);}finally{if(G.Game.state==='playing')G.Game.togglePause();}},
  show(){if(G.Game.state==='paused')G.Game.togglePause();G.TechnicalUI.tick(p,0);}
 };return bc.snap();
}'''
def run(browser,base,entry,touch,mode,out):
 ctx=browser.new_context(viewport={'width':390 if touch else 1280,'height':844 if touch else 900},is_mobile=touch,has_touch=touch)
 page=ctx.new_page();errors=[];remote=[];http=[]
 page.on('pageerror',lambda e:errors.append(str(e)))
 page.on('console',lambda m:errors.append(m.text) if m.type=='error' else None)
 page.on('response',lambda r:http.append([r.status,r.url]) if r.status>=400 else None)
 origin=urlsplit(base).netloc
 def route(r):
  if urlsplit(r.request.url).netloc==origin:r.continue_()
  else:remote.append(r.request.url);r.abort()
 page.route('**/*',route)
 try:
  query='' if base.startswith('https:') and mode=='normal' else '?prueba=combate-v2'+('' if mode=='normal' else '&ensayo='+mode)
  page.goto(base+entry+query+("&"if "?"in query else"?")+"interfaz=clasica")
  page.wait_for_selector('#btn-technical-start:visible')
  assert page.locator('#expanded-test-note').is_visible()
  assert page.locator('.developer-credit').inner_text()=='Desarrollado por Ivan Vivanco'
  assert page.locator('#loadout-weapon-0 option').count()==4
  page.click('#btn-technical-start');page.wait_for_function('G.Game.state==="playing" && G.MapTrial.expanded')
  page.evaluate('G.Game.togglePause()');initial=page.evaluate(HELPER)
  assert not initial['account'] and initial['checkpoint'] is None
  result={'initial':initial}
  if mode=='normal':
   assert len(initial['w'])==1 and all(n==0 for n in initial['w'][0]['branches'].values()) and all(n==0 for n in initial['g'].values())
  elif mode=='maximos':
   assert len(initial['w'])==2 and all(n==6 for n in initial['w'][0]['branches'].values()) and all(n==0 for n in initial['w'][1]['branches'].values())
  elif mode=='saturacion':
   assert len(initial['w'])==2 and all(n==6 for w in initial['w'] for n in w['branches'].values()) and all(n==6 for n in initial['g'].values())
   page.evaluate('bc.step(1);bc.show()');page.wait_for_selector('#field-upgrades:visible')
   assert page.evaluate('G.Expedition.state.cards.every(c=>c.category==="tactical")')
   timer=page.evaluate('G.Expedition.state.v2.mapTime');page.wait_for_timeout(180);assert page.evaluate('G.Expedition.state.v2.mapTime')==timer
   page.locator('#upgrade-cards button').first.click();page.evaluate('G.Game.togglePause()')
   assert page.evaluate('G.Game.player.infiniteTactical.remaining')>0
  elif mode=='terminal':
   assert len(initial['w'])==2 and initial['w'][0]['branches']['power']==2
   page.evaluate('() => {const t=G.WeaponTerminal.state.point;bc.at(t.x,t.y);bc.step(1);bc.show();}')
   page.wait_for_selector('#btn-terminal:visible');page.click('#btn-terminal');page.wait_for_selector('#weapon-terminal:visible')
   opened=page.evaluate('bc.snap()');assert opened['s']['phase']=='terminal'
   frozen=opened['s']['v2']['mapTime'];page.wait_for_timeout(180);assert page.evaluate('G.Expedition.state.v2.mapTime')==frozen
   page.click('#btn-terminal-close');cancelled=page.evaluate('bc.snap()')
   assert [(w['id'],w['model'],w['branches']) for w in cancelled['w']]==[(w['id'],w['model'],w['branches']) for w in opened['w']] and cancelled['g']==opened['g']
   page.click('#btn-terminal');page.select_option('#terminal-slot','0');page.select_option('#terminal-model','baton')
   page.screenshot(path=str(out/f'{entry[:-5]}-{"touch" if touch else "desktop"}-terminal-choice.png'))
   page.click('#btn-terminal-confirm');page.evaluate('G.Game.togglePause()');changed=page.evaluate('bc.snap()')
   assert len(changed['w'])==2 and changed['w'][0]['model']=='baton' and changed['w'][0]['id']!=opened['w'][0]['id']
   assert all(n==0 for n in changed['w'][0]['branches'].values())
   assert changed['w'][1]['id']==opened['w'][1]['id'] and changed['w'][1]['branches']==opened['w'][1]['branches'] and changed['g']==opened['g']
   assert page.evaluate('G.WeaponTerminal.choose(0,"pistol")') is False
   result.update(opened=opened,changed=changed)
  elif mode=='melee':
   assert len(initial['w'])==1 and initial['w'][0]['model']=='baton'
   damage=page.evaluate('''() => {
    const p=G.Game.player,e=G.EnemyMgr.all().find(e=>e.practiceTarget&&!e.dead);if(!e)throw Error('Live melee target missing');
    const spots=[[-48,0],[48,0],[0,-48],[0,48]].map(([dx,dy])=>({x:e.x+dx,y:e.y+dy})).filter(q=>G.World.isFree(q.x,q.y,p.r));
    const spot=spots.find(q=>Array.from({length:17},(_,i)=>i/16).every(t=>!G.World.projectileBlock(q.x+(e.x-q.x)*t,q.y+(e.y-q.y)*t,2)));
    if(!spot)throw Error('No melee QA line');bc.at(spot.x,spot.y);e.hp=e.maxHp=1000;
    for(const other of G.EnemyMgr.all())if(other!==e){other.x+=50000;other.y+=50000;}
    G.Projectiles.clear();let spawned=0;const spawn=G.Projectiles.spawn;G.Projectiles.spawn=(...a)=>{spawned++;return spawn(...a);};
    const before=e.hp;try{for(let i=0;i<60;i++)G.FieldCombat.tick(1/60,p,true);}finally{G.Projectiles.spawn=spawn;}
    return{before,after:e.hp,spawned,copy:JSON.parse(JSON.stringify(p.fieldWeapons[0])),effective:G.FieldStats.weapon(p,p.fieldWeapons[0])};
   }''')
   assert damage['after']<damage['before'] and damage['spawned']==0,damage
   assert damage['effective']['capacity']==0 and damage['effective']['reloadTime']==0,damage
   result['damage']=damage
  # Real radar disclosure: fabricated QA chests must still respect discovered state.
  radar=page.evaluate('''() => {
   const old=G.ExplorationChests;G.ExplorationChests={state:{chests:[{x:0,y:0,discovered:false,opened:false},{x:100,y:100,discovered:true,opened:false}]}};
   try{return G.FieldRadar.markers(G.Game.player,G.Expedition.state);}finally{G.ExplorationChests=old;}
  }''')
  assert len([m for m in radar if m['type']=='chest'])==1,radar
  page.evaluate('bc.show()');page.screenshot(path=str(out/f'{entry[:-5]}-{"touch" if touch else "desktop"}-{mode}.png'))
  assert not errors and not remote and not http,{'errors':errors,'remote':remote,'http':http}
  return {'mode':mode,'status':'PASS',**result,'errors':errors,'remote':remote,'http':http}
 finally:ctx.close()
def main():
 parser=argparse.ArgumentParser();parser.add_argument('--live',action='store_true');parser.add_argument('--red',action='store_true');args=parser.parse_args()
 out=Path(os.environ.get('SCP_TEST_ARTIFACTS',ROOT/'tests/artifacts/v2-expanded'))/('live' if args.live else 'local');out.mkdir(parents=True,exist_ok=True)
 server=None
 try:
  if args.live:base='https://deteco.github.io/SCPSurvivor/'
  else:
   server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)));Thread(target=server.serve_forever,daemon=True).start();base=f'http://127.0.0.1:{server.server_port}/'
  records=[]
  with sync_playwright() as pw:
   browser=pw.chromium.launch(headless=True)
   try:
    for entry in (['dev.html'] if args.red else ['index.html'] if args.live else ['dev.html','index.html']):
     for touch in ([False] if args.red else [False,True]):records.append({'entry':entry,'touchEmulated':touch,'status':'PASS','modes':[run(browser,base,entry,touch,m,out) for m in (['normal'] if args.red else ['normal','terminal','maximos','saturacion','melee'])]})
   finally:browser.close()
  (out/'results.json').write_text(json.dumps({'live':args.live,'records':records,'method':'Disclosed fixtures, controlled position/invulnerability/time and durable QA targets; real UI choices and melee hurt. Not natural balance, performance or physical phone evidence.'},indent=2)+'\n',encoding='utf-8')
  print(json.dumps({'status':'PASS','scenarios':len(records),'modesPerScenario':5,'output':str(out)}))
 finally:
  if server:server.shutdown();server.server_close()
if __name__=='__main__':main()
