"""Actual UI and field runtime; upgrades/time/targets explicitly injected for QA, not balance or natural victories."""
from pathlib import Path
from http.server import SimpleHTTPRequestHandler,ThreadingHTTPServer
from functools import partial
from threading import Thread
from playwright.sync_api import sync_playwright
import json,importlib.util,argparse
ROOT=Path(__file__).resolve().parents[1]
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*a):pass
 def copyfile(self,*a):
  try:super().copyfile(*a)
  except(ConnectionResetError,BrokenPipeError):pass
def main():
 parser=argparse.ArgumentParser();parser.add_argument('--live',action='store_true');args=parser.parse_args();server=None;records=[]
 if args.live:base='https://deteco.github.io/SCPSurvivor/'
 else:
  server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)));Thread(target=server.serve_forever,daemon=True).start();base=f'http://127.0.0.1:{server.server_port}/'
 out=ROOT/'tests/artifacts/rev-est-0006/af01';out=out/'live'if args.live else out;out.mkdir(parents=True,exist_ok=True)
 try:
  with sync_playwright()as pw:
   b=pw.chromium.launch(headless=True)
   try:
    cases=[('index.html',w,h,m)for w,h in[(390,844),(844,390),(1280,900)]for m in['16','32']]+([]if args.live else[('dev.html',1280,900,m)for m in['16','32']])
    for entry,w,h,mode in cases:
     c=b.new_context(viewport={'width':w,'height':h},has_touch=w<900);p=c.new_page();errors=[];p.on('pageerror',lambda e:errors.append(str(e)));p.on('console',lambda m:errors.append(m.text)if m.type=='error'else None)
     p.goto(f'{base}{entry}?prueba=combate-v2&armas=r1&ensayo=saturacion&graficos={mode}');p.wait_for_selector('#btn-technical-start:visible',timeout=30000);p.click('#btn-technical-start');p.wait_for_function("()=>G.Game.state==='playing'")
     p.evaluate('''()=>{window.qaAf01Frames=new Set();const original=CanvasRenderingContext2D.prototype.drawImage;CanvasRenderingContext2D.prototype.drawImage=function(image,...args){if(image?.src?.includes('/AF01/'))window.qaAf01Frames.add(image.src);return original.call(this,image,...args);};}''')
     p.wait_for_function("()=>window.qaAf01Frames.size>0",timeout=5000)
     art=p.evaluate("()=>({frames:[...window.qaAf01Frames],mode:G.TrialVisuals.mode})")
     assert art['mode']==mode and all(f'/{mode}/AF01/'in url for url in art['frames']),art
     first=p.evaluate("()=>{const p=G.Game.player;p.invuln=1e6;return{count:p.fieldWeapons.length,level:p.fieldWeapons[0].level,model:p.fieldWeapons[0].model,practice:G.MapTrial.practice,revision:G.WeaponRevisionTrial.active()};}")
     assert first=={'count':1,'level':1,'model':'pistol','practice':None,'revision':True},first
     p.evaluate("()=>{const p=G.Game.player;G.Pickups.drop('xp',p.x,p.y,(p.xpNext-p.xp)/p.xpMul);G.Expedition.update(1/60);}")
     p.wait_for_selector('#field-upgrades button:visible');p.locator('#field-upgrades button').first.click();p.wait_for_function("()=>G.Expedition.state.phase!=='levelup'")
     assert p.evaluate('()=>G.Game.player.fieldWeapons[0].level')==2
     reward=p.evaluate("()=>{const p=G.Game.player;G.ArmamentRewards.offer({id:'qa-first-boss',kind:'boss',seed:1,player:p});return G.ArmamentRewards.claim('qa-first-boss',p);}");assert reward['ok']and reward['outcome']=='choice',reward
     p.wait_for_selector('#armament-choice button:visible');p.locator('#armament-choice button').first.click();p.wait_for_function('()=>G.Game.player.fieldWeapons.length===2')
     result=p.evaluate('''()=>{
      const p=G.Game.player,ws=p.fieldWeapons,first=ws[0],second=ws[1];if(G.Game.state==='playing')G.Game.togglePause();
      for(let i=0;i<4;i++)if(!G.FieldCombat.upgrade(first.id))throw Error('upgrade failed');
      const before=G.FieldStats.weapon(p,first);p.tempStats.power=2;G.FieldStats.apply(p);const boosted=G.FieldStats.weapon(p,first);
      G.EnemyMgr.clear();const target=G.EnemyMgr.add(new G.Enemy({...G.Content.pursuer,hp:100000},p.x+100,p.y,{hp:1,dmg:1,spd:1}));
      const fired=[],spawn=G.Projectiles.spawn;G.Projectiles.spawn=x=>{fired.push({dmg:x.dmg,vx:x.vx,vy:x.vy});return spawn.call(G.Projectiles,x);};
      first.ammo=0;first.reload=.01;first.reloadTime=1.5;first.shotWait=0;second.shotWait=100;
      G.Game.togglePause();G.FieldCombat.tick(.02,p,true);const ammo=first.ammo;G.FieldCombat.tick(.11,p,true);const at11=fired.length;G.FieldCombat.tick(.01,p,true);const at12=fired.length;
      G.Game.togglePause();G.Projectiles.spawn=spawn;G.TechnicalUI.tick(p,0);
      return{before,boosted,ammo,afterAmmo:first.ammo,at11,at12,fired,secondLevel:second.level,firstLabel:G.WeaponRevisionTrial.levelLabel(first),domain:G.WeaponRevisionTrial.state,phase:G.Expedition.state.phase};
     }''')
     assert result['firstLabel']=='MAX'and result['secondLevel']==1 and result['before']['damage']==13 and abs(result['boosted']['damage']-15.6)<1e-8,result
     assert result['at11']==1 and result['at12']==2 and result['ammo']==result['afterAmmo']==11 and abs(result['fired'][1]['dmg']-6.24)<1e-8,result
     assert not result['domain']['fusionUsed']
     p.screenshot(path=str(out/f'{entry[:-5]}-{w}-{h}-{mode}.png'))
     transition=None
     if entry=='index.html'and w==1280 and mode=='32':
      sp=importlib.util.spec_from_file_location('helpers',ROOT/'tests/v2-infinite-browser.py');helper=importlib.util.module_from_spec(sp);sp.loader.exec_module(helper);p.evaluate(helper.HELPERS)
      p.evaluate('qa.step(7500)');assert p.evaluate('()=>G.Expedition.state.v2.bossSpawned')
      p.evaluate('qa.kill(false)');p.evaluate('qa.open("boss")');p.evaluate('qa.step(1600)')
      transition=p.evaluate('''()=>{if(!G.Expedition.state.v2.bossDefeated||!G.Expedition.state.v2.doorOpen)throw Error('door prerequisites');G.EnemyMgr.clear();const player=G.Game.player;for(const key of G.FieldStats.temporaryKeys)player.tempStats[key]=6;G.FieldStats.apply(player);G.Pickups.drop('xp',player.x,player.y,player.xpNext*2/player.xpMul);const pick=()=>G.WeaponRevisionTrial.state.weapons.map(w=>({id:w.id,level:w.level,state:w.state}));const before=pick(),exit=G.Expedition.state.exit;qa.at(exit.x,exit.y);for(let i=0;i<240&&G.Expedition.state.sector===1;i++)qa.step(1);return{before,after:pick(),map:G.Expedition.state.sector,phase:G.Expedition.state.phase,pending:G.Expedition.state.pending,pendingXp:G.Expedition.state.pendingXp,upgradeCandidates:G.FieldUpgrades.candidates(player).length,tactical:player.infiniteTactical,nearExit:G.Expedition.state.nearExit,rewards:G.ArmamentRewards.state,fixture:[G.World.fixture.maxX+1,G.World.fixture.maxY+1]};}''')
      assert transition['before']==transition['after']and transition['map']==2 and transition['fixture']==[160,100],transition
      assert transition['pending']==0 and transition['pendingXp']==0 and transition['upgradeCandidates']==0 and transition['tactical'],transition
     assert not errors,errors
     records.append({'status':'PASS','entry':entry,'viewport':[w,h],'mode':mode,'first':first,'art':art,'result':result,'transition':transition});c.close()
   finally:b.close()
 finally:
  if server:server.shutdown();server.server_close()
 (out/'browser.json').write_text(json.dumps({'status':'PASS','live':args.live,'records':records,'physicalPhone':False,'method':'Actual UI card/reward buttons and actual FieldCombat/projectiles; disclosed injected XP, ascents, target HP and reload timer for deterministic QA.'},indent=2)+'\n',encoding='utf-8');print(json.dumps({'status':'PASS','live':args.live,'scenarios':len(records)}))
if __name__=='__main__':main()
