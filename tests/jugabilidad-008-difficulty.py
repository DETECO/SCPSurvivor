"""Deterministic bot measurement with real HP, weapon damage, reloads and enemy attacks. No invulnerability or lethal damage injection."""
from pathlib import Path
from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
from functools import partial
from threading import Thread
from playwright.sync_api import sync_playwright
import json,os,argparse
ROOT=Path(os.environ.get('SCP_TEST_ROOT',Path(__file__).resolve().parents[1]));OUT=Path(os.environ.get('SCP_TEST_OUTPUT',ROOT/'tests/artifacts/lot-est-008/difficulty'))
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*a):pass
 def copyfile(self,*a):
  try:super().copyfile(*a)
  except(ConnectionResetError,BrokenPipeError,ConnectionAbortedError):pass
FIGHT='''async({loadout,limit})=>{
 const p=G.Game.player,boss=G.EnemyMgr.all().find(e=>e.dimensional);p.invuln=0;G.Game.debugSpeed(1e-7);G.FieldCombat.reset(p,loadout.map((m,i)=>G.FieldCatalog.makeWeapon(m,'measure:'+i,[])));let vector=[0,0],last=[0,0],hp=p.hp,damageTaken=0,steps=0,stalls=0;const axis=G.Input.axis;G.Input.axis=()=>vector;
 try{
  for(let t=0;t<limit&&p.hp>0&&!boss.dead;t+=.05){
   if(steps%3===0){let best=-Infinity,next=[0,0];const speed=G.FieldStats.player(p).speed||165;
    for(let i=0;i<16;i++){const angle=i*Math.PI/8,v=[Math.cos(angle),Math.sin(angle)],q={x:p.x+v[0]*speed*.35,y:p.y+v[1]*speed*.35,r:p.r};if(!G.World.isFree(q.x,q.y,p.r))continue;
     const d=Math.hypot(q.x-boss.x,q.y-boss.y),wanted=205;let score=-Math.abs(d-wanted)*.03+(v[0]*last[0]+v[1]*last[1])*.4;
     if(d<100)score-=10;
     for(const z of boss.zones||[])if(G.RiftAnomalies.contains(z,q))score-=30;
     for(const shot of G.Projectiles.all())if(!shot.friendly&&Math.hypot(q.x-shot.x,q.y-shot.y)<40)score-=8;
     for(let n=8;n<d;n+=16)if(G.World.projectileBlock(q.x+(boss.x-q.x)*n/d,q.y+(boss.y-q.y)*n/d,2)){score-=5;break;}
     if(score>best){best=score;next=v;}
    }vector=next;last=next;
    if(boss.phase==='windup'&&(boss.zones||[]).some(z=>G.RiftAnomalies.contains(z,p)))G.TechnicalUI.ability();
   }
   const before=[p.x,p.y];G.Expedition.update(.05);if(Math.hypot(p.x-before[0],p.y-before[1])<.1)stalls++;damageTaken+=Math.max(0,hp-p.hp);hp=p.hp;steps++;
   if(!G.RiftExpedition.state.active&&!boss.dead)break;
   if(steps%200===0)await new Promise(r=>setTimeout(r,0));
  }
 }finally{G.Input.axis=axis;}
 return{seconds:steps*.05,outcome:boss.dead?'victory':p.hp<=0?'death':!G.RiftExpedition.state.active?'escaped':'limit',hp:p.hp,bossHp:boss.hp,bossMaxHp:boss.maxHp,damageDealt:boss.maxHp-boss.hp,damageTaken,shots:G.FieldCombat.state.shots,stalledFrames:stalls,companion:G.RiftCompanion.state?{hp:G.RiftCompanion.state.hp,dead:G.RiftCompanion.state.dead,shots:G.RiftCompanion.state.shots}:null,invulnerabilityInjected:false};
}'''
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--smoke',action='store_true');args=ap.parse_args();OUT.mkdir(parents=True,exist_ok=True);server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)));Thread(target=server.serve_forever,daemon=True).start();base=f'http://127.0.0.1:{server.server_port}/';rows=[]
 try:
  with sync_playwright()as pw:
   browser=pw.chromium.launch(headless=True)
   for tier in([1]if args.smoke else range(1,6)):
    for equipment,npc in[(['pistol'],'no'),(['pistol','smg'],'no'),(['pistol','smg'],'si')]:
     p=browser.new_page(viewport={'width':844,'height':390});errors=[];p.on('pageerror',lambda e:errors.append(str(e)));p.goto(f'{base}index.html?prueba=combate-v2&ensayo=grietas&grado=D{tier}&apoyo={npc}&graficos=32');p.wait_for_selector('#btn-technical-start:visible')
     p.evaluate('()=>{const options=G.TechnicalUI.options();options.seed=8241026;G.Game.startTechnical(G.ExpandedPractice.prepare(options));const p=G.Game.player,r=G.RiftExpedition.state.portal;p.x=r.x;p.y=r.y;G.Expedition.update(.01);}')
     p.wait_for_function("()=>G.RiftExpedition.state.status==='combat'");result=p.evaluate(FIGHT,{'loadout':equipment,'limit':240});assert not errors,errors
     rows.append({'tier':tier,'loadout':equipment,'forcedNpc':npc,'measurement':result});print(json.dumps(rows[-1]),flush=True);p.screenshot(path=str(OUT/f'D{tier}-{len(equipment)}-{npc}.png'));p.close()
   browser.close()
 finally:server.shutdown();server.server_close()
 (OUT/'measurements.json').write_text(json.dumps({'status':'measured','records':rows,'method':'Deterministic rudimentary kiting bot; seeded setup/room contact/loadout controlled. Real damage/defense/reload, no invulnerability/healing/lethal injection. Bot is not human acceptance or final balance.'},ensure_ascii=False,indent=2),encoding='utf-8')
if __name__=='__main__':main()
