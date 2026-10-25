"""Actual integration. QA injects position, invulnerability, simulation time and lethal damage; no natural balance claim."""
from pathlib import Path
from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
from functools import partial
from threading import Thread
from playwright.sync_api import sync_playwright
import json,argparse,os
ROOT=Path(os.environ.get('SCP_TEST_ROOT',Path(__file__).resolve().parents[1]))
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*a):pass
 def copyfile(self,*a):
  try:super().copyfile(*a)
  except(ConnectionResetError,BrokenPipeError):pass
SETUP='''()=>{
 const p=G.Game.player;p.invuln=1e6;for(const w of p.fieldWeapons)w.shotWait=1e6;
 window.qaBioImages=new Set();const draw=CanvasRenderingContext2D.prototype.drawImage;CanvasRenderingContext2D.prototype.drawImage=function(im,...args){if(im?.src?.includes('/anomalias-biologicas/'))qaBioImages.add(im.src);return draw.call(this,im,...args);};
 const portal=G.RiftExpedition.state.portal;if(!portal)throw Error('practice portal missing');p.x=portal.x;p.y=portal.y;
 // Keep real live origin entities/projectiles/pickups to compare after returning.
 const enemy=G.EnemyMgr.all()[0];if(!enemy)throw Error('origin enemies missing');
 G.Projectiles.spawn({x:p.x+250,y:p.y+100,vx:0,vy:0,t:2,life:30});G.Pickups.drop('xp',p.x+260,p.y+100,10);
 const originalEnemyUpdate=enemy.update;window.qaOriginEnemyTicks=0;enemy.update=function(...args){qaOriginEnemyTicks++;return originalEnemyUpdate.apply(this,args);};
 window.qaOrigin={enemies:G.EnemyMgr.all(),shots:G.Projectiles.all(),pickups:G.Pickups.all(),fixture:G.World.fixture};
 G.Expedition.update(1/60);enemy.update=originalEnemyUpdate;if(qaOriginEnemyTicks!==0)throw Error('origin AI advanced after portal contact');
 qaOrigin.expected={time:G.Expedition.state.v2.mapTime,elapsed:G.Expedition.state.elapsed,enemy:JSON.stringify(qaOrigin.enemies.map(e=>({id:e.id,x:e.x,y:e.y,hp:e.hp,pt:e.pt}))),shots:JSON.stringify(qaOrigin.shots),pickups:JSON.stringify(qaOrigin.pickups),director:JSON.stringify(G.RiftExpedition.state.director),terminal:JSON.stringify(G.WeaponTerminal.state),chests:JSON.stringify(G.ExplorationChests.state)};
 if(!G.RiftExpedition.state.active)throw Error('instant contact failed');
 window.qaStep=(seconds)=>{for(let i=0;i<Math.ceil(seconds*30);i++)G.Expedition.update(1/30);};
 window.qaCheckOrigin=()=>{const s=qaOrigin.expected;return{clock:s.time===G.Expedition.state.v2.mapTime&&s.elapsed===G.Expedition.state.elapsed,enemy:G.EnemyMgr.all()===qaOrigin.enemies&&s.enemy===JSON.stringify(qaOrigin.enemies.map(e=>({id:e.id,x:e.x,y:e.y,hp:e.hp,pt:e.pt}))),shots:G.Projectiles.all()===qaOrigin.shots&&s.shots===JSON.stringify(qaOrigin.shots),pickups:G.Pickups.all()===qaOrigin.pickups&&s.pickups===JSON.stringify(qaOrigin.pickups),fixture:G.World.fixture===qaOrigin.fixture,director:s.director===JSON.stringify(G.RiftExpedition.state.director),terminal:s.terminal===JSON.stringify(G.WeaponTerminal.state),chests:s.chests===JSON.stringify(G.ExplorationChests.state)};};
 return{tier:G.RiftExpedition.state.tier,style:G.RiftExpedition.state.portal.style,origin:G.Expedition.state.v2.mapTime,npc:G.RiftCompanion.state};
}'''
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--live',action='store_true');ap.add_argument('--smoke',action='store_true');a=ap.parse_args();server=None
 if a.live:base='https://deteco.github.io/SCPSurvivor/'
 else:
  server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)));Thread(target=server.serve_forever,daemon=True).start();base=f'http://127.0.0.1:{server.server_port}/'
 out=Path(os.environ.get('SCP_TEST_OUTPUT',str(ROOT/'tests/artifacts/grietas-integrales'/('live'if a.live else'local'))));out.mkdir(parents=True,exist_ok=True);records=[]
 try:
  with sync_playwright()as pw:
   b=pw.chromium.launch(headless=True)
   try:
    cases=[(t,m)for t in range(1,6)for m in['16','32']]
    if a.smoke:cases=[(1,'32'),(5,'16')]
    for i,(tier,mode)in enumerate(cases):
     w,h=[(1280,900),(390,844),(844,390)][i%3];c=b.new_context(viewport={'width':w,'height':h});p=c.new_page();errors=[];p.on('pageerror',lambda e:errors.append(str(e)));p.on('console',lambda m:errors.append(m.text)if m.type=='error'else None)
     entry='index.html'if a.live or i%2 else'dev.html';npc='si'if i%2==0 else'no'
     p.goto(f'{base}{entry}?prueba=combate-v2&ensayo=grietas&grado=D{tier}&apoyo={npc}&estilo={i%6+1}&graficos={mode}');p.wait_for_selector('#btn-technical-start:visible',timeout=30000);p.click('#btn-technical-start');p.wait_for_function("()=>G.Game.state==='playing'");start=p.evaluate(SETUP);assert start['tier']==f'D{tier}'and start['style']==i%6+1,start;assert bool(start['npc'])==(npc=='si'),start
     p.wait_for_function("()=>G.RiftExpedition.state.status==='combat'");p.wait_for_timeout(600)
     # Three actual pattern cycles, fixed target during commitment and pause control.
     patterns=p.evaluate('''()=>{const seen=new Set();const p=G.Game.player;for(let n=0;n<1200;n++){const e=G.EnemyMgr.all().find(e=>e.dimensional);if(e)seen.add(e.attackIndex);G.Expedition.update(1/30);}return[...seen].filter(x=>x>=0);}''');assert sorted(patterns)==[0,1,2],patterns
     p.evaluate('()=>{G.Camera.x=16;G.Camera.y=16;}');p.screenshot(path=str(out/f'D{tier}-{mode}-{w}x{h}.png'))
     images=p.evaluate('()=>[...qaBioImages]');assert any(f'/{mode}/'in x for x in images),images
     p.click('#btn-technical-pause');p.wait_for_function("()=>G.Game.state==='paused'");paused_at=p.evaluate('()=>({map:G.Expedition.state.v2.mapTime,room:G.RiftExpedition.state.time})');p.wait_for_timeout(180);paused=p.evaluate('()=>({map:G.Expedition.state.v2.mapTime,room:G.RiftExpedition.state.time})');assert paused==paused_at;(p.evaluate('()=>G.Game.togglePause()'))
     # Damage injection only to exercise real victory, UI choice and contact return.
     p.evaluate('()=>{G.EnemyMgr.all().find(e=>e.dimensional).hurt(1e6);G.Expedition.update(1/30);}')
     p.wait_for_selector('#rift-power-choice button:visible');before=p.evaluate('()=>({time:G.RiftExpedition.state.time,hp:G.Game.player.hp,ammo:G.FieldCombat.state.ammo})');p.wait_for_timeout(180);assert p.evaluate('()=>G.RiftExpedition.state.time')==before['time']
     p.locator('#rift-power-choice button').first.click()
     restored=p.evaluate('''()=>{const p=G.Game.player,r=G.RiftExpedition.state;const hp=p.hp,ammo=G.FieldCombat.state.ammo;p.x=r.exit.x;p.y=r.exit.y;G.Expedition.update(1/30);return{active:G.RiftExpedition.state.active,origin:qaCheckOrigin(),hp:p.hp===hp,ammo:G.FieldCombat.state.ammo===ammo,powers:G.RiftPowers.state.owned.length,npc:G.RiftCompanion.state};}''');assert not restored['active']and all(restored['origin'].values())and restored['powers']==1 and restored['hp']and restored['ammo']and restored['npc']is None,restored
     assert not errors,errors;records.append({'tier':tier,'mode':mode,'viewport':[w,h],'npcForced':npc,'styleForced':i%6+1,'patterns':patterns,'images':images,'restored':restored});print(json.dumps({'case':i+1,'tier':tier,'mode':mode,'status':'PASS'}),flush=True);c.close()
   finally:b.close()
 finally:
  if server:server.shutdown();server.server_close()
 (out/'browser.json').write_text(json.dumps({'status':'PASS','live':a.live,'records':records,'method':'Forced tier/NPC and position/HP/time for QA; actual room AI, UI and managers; not natural balance or physical phone acceptance.'},indent=2),encoding='utf-8');print(json.dumps({'status':'PASS','scenarios':len(records)}))
if __name__=='__main__':main()
