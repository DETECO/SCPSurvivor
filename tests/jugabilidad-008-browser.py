"""LOT008 real game/browser QA. Forced position, HP, elapsed time, equipment and lethal branch damage are disclosed; not natural balance."""
from pathlib import Path
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from functools import partial
from threading import Thread
from playwright.sync_api import sync_playwright
import json,os,argparse
ROOT=Path(os.environ.get('SCP_TEST_ROOT',Path(__file__).resolve().parents[1]))
OUT=Path(os.environ.get('SCP_TEST_OUTPUT',ROOT/'tests/artifacts/lot-est-008/browser'))
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*args):pass
 def copyfile(self,*args):
  try:super().copyfile(*args)
  except(ConnectionResetError,BrokenPipeError,ConnectionAbortedError):pass
CONTACT='''()=>{const p=G.Game.player;p.invuln=1e6;for(const w of p.fieldWeapons)w.shotWait=1e6;const r=G.RiftExpedition.state.portal;window.qaOrigin={enemies:G.EnemyMgr.all(),shots:G.Projectiles.all(),pickups:G.Pickups.all(),fixture:G.World.fixture,time:G.Expedition.state.v2.mapTime};window.qaScale=G.Camera.scale;p.x=r.x;p.y=r.y;G.Expedition.update(.01);qaOrigin.time=G.Expedition.state.v2.mapTime;return{active:G.RiftExpedition.state.active,tier:r.tier,style:r.style};}'''
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--smoke',action='store_true');ap.add_argument('--live',action='store_true');args=ap.parse_args();OUT.mkdir(parents=True,exist_ok=True);server=None;records=[]
 if args.live:base='https://deteco.github.io/SCPSurvivor/'
 else:
  server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)));Thread(target=server.serve_forever,daemon=True).start();base=f'http://127.0.0.1:{server.server_port}/'
 try:
  with sync_playwright()as pw:
   browser=pw.chromium.launch(headless=True)
   cases=[(t,m)for t in range(1,6)for m in[16,32]]
   if args.smoke:cases=[(1,32),(5,16)]
   for i,(tier,mode)in enumerate(cases):
    w,h=[(390,844),(844,390),(1280,900),(932,430)][i%4];context=browser.new_context(viewport={'width':w,'height':h},has_touch=w<1000,is_mobile=w<1000);p=context.new_page();errors=[];p.on('pageerror',lambda e:errors.append(str(e)))
    p.goto(f'{base}index.html?prueba=combate-v2&ensayo=grietas&grado=D{tier}&estilo={i%6+1}&apoyo=si&graficos={mode}');p.wait_for_selector('#btn-technical-start:visible');p.click('#btn-technical-start');p.wait_for_function("()=>G.Game.state==='playing'")
    entered=p.evaluate(CONTACT);assert entered['active'] and entered['tier']==f'D{tier}',entered
    try:p.wait_for_function("()=>G.RiftExpedition.state.status==='combat'")
    except Exception:
     print(json.dumps({'loadingFailure':f'D{tier}/{mode}','state':p.evaluate('()=>G.RiftExpedition.state'),'errors':errors}),flush=True);raise
    p.wait_for_function('()=>G.RiftPowerArt.status.loaded===10')
    room=p.evaluate('''()=>{const r=G.RiftExpedition.state,b=G.EnemyMgr.all().find(e=>e.dimensional),g=G.RiftRooms.generate(b.bioId),n=G.RiftCompanion.entity;window.qaNpc=n;n.invuln=1e6;const before=JSON.stringify([g.entry,g.escape,g.structures]),c=document.createElement('canvas').getContext('2d');G.RiftRooms.drawGround(c,g,1);G.RiftRooms.drawAtmosphere(c,g,1);return{tier:r.tier,body:b.visualBodyH,hp:b.maxHp,room:g.revision,free:G.World.isFree(b.x,b.y,b.r)&&G.World.isFree(G.Game.player.x,G.Game.player.y,12),scale:G.Camera.scale,sameScale:G.Camera.scale===qaScale,readOnly:before===JSON.stringify([g.entry,g.escape,g.structures]),originFrozen:G.Expedition.state.v2.mapTime===qaOrigin.time,camera:{x:G.Camera.x,y:G.Camera.y,w:G.Camera.w,h:G.Camera.h,bounds:G.Camera.roomBounds}};}''')
    assert room['free'] and room['sameScale'] and room['readOnly'] and room['originFrozen'],room
    cam=room['camera'];bounds=cam['bounds'];assert bounds and (cam['h']<bounds['bottom']-bounds['top'] or abs(cam['y']-(bounds['top']+bounds['bottom'])/2)<1e-6),cam
    assert room['body']==[128,136,144,152,160][tier-1] and room['hp']==[800,1300,2000,3000,4400][tier-1],room
    p.wait_for_timeout(80);p.screenshot(path=str(OUT/f'D{tier}-{mode}-{w}x{h}.png'))
    if i==0:
     p.set_viewport_size({'width':844,'height':390});p.wait_for_timeout(80)
     rotated=p.evaluate('''()=>{const c=G.Camera,b=c.roomBounds;return{x:c.x,y:c.y,w:c.w,h:c.h,scale:c.scale,bounds:b}}''')
     assert rotated['bounds'] and bounds['left']+rotated['w']/2-1e-6<=rotated['x']<=bounds['right']-rotated['w']/2+1e-6,rotated
     p.set_viewport_size({'width':w,'height':h});p.wait_for_timeout(80)
     assert p.evaluate('()=>G.Camera.scale===qaScale&&G.Camera.roomBounds!==null')
    p.click('#btn-technical-pause');frozen=p.evaluate('()=>JSON.stringify({r:G.RiftExpedition.state,ammo:G.FieldCombat.state.weapons,n:G.RiftCompanion.state,powers:G.RiftPowers.state})');p.wait_for_timeout(100);assert p.evaluate('()=>JSON.stringify({r:G.RiftExpedition.state,ammo:G.FieldCombat.state.weapons,n:G.RiftCompanion.state,powers:G.RiftPowers.state})')==frozen;p.click('#btn-technical-resume')
    path=p.evaluate('''()=>{const seen=new Set(),b=G.EnemyMgr.all().find(e=>e.dimensional),pl=G.Game.player,initial=Math.hypot(b.x-pl.x,b.y-pl.y);let closest=initial;b.hp=b.maxHp;for(let i=0;i<900;i++){G.Expedition.update(.05);seen.add(b.attackIndex);closest=Math.min(closest,Math.hypot(b.x-pl.x,b.y-pl.y));}return{patterns:[...seen].filter(x=>x>=0),initial,closest};}''');patterns=path['patterns'];assert sorted(patterns)==[0,1,2] and path['closest']<min(220,path['initial']-40),path
    p.evaluate('()=>{G.EnemyMgr.all().find(e=>e.dimensional).hurt(1e9);G.Expedition.update(.01);}')
    p.wait_for_selector('#rift-power-choice button:visible');p.locator('#rift-power-choice button').first.click()
    returned=p.evaluate('''()=>{const p=G.Game.player,n=G.RiftCompanion.entity,r=G.RiftExpedition.state;n.hp=31;n.ammo=3;n.reload=.5;n.wait=1;p.x=r.exit.x;p.y=r.exit.y;G.Expedition.update(.01);return{active:G.RiftExpedition.state.active,sameNpc:G.RiftCompanion.entity===qaNpc,hp:n.hp,ammo:n.ammo,reload:n.reload,origin:G.EnemyMgr.all()===qaOrigin.enemies&&G.Projectiles.all()===qaOrigin.shots&&G.Pickups.all()===qaOrigin.pickups&&G.World.fixture===qaOrigin.fixture,clock:G.Expedition.state.v2.mapTime===qaOrigin.time,scale:G.Camera.scale===qaScale,roomBounds:G.Camera.roomBounds,power:G.RiftPowers.state.owned[0].id};}''')
    assert not returned['active'] and returned['sameNpc'] and returned['origin'] and returned['clock'] and returned['scale'] and returned['roomBounds'] is None and returned['hp']==31 and returned['ammo']==3 and abs(returned['reload']-.49)<1e-8,returned
    if i==0:
     carry=p.evaluate('''()=>{const p=G.Game.player,n=G.RiftCompanion.entity;n.invuln=1e6;p.invuln=1e6;for(const w of p.fieldWeapons)w.shotWait=1e6;G.Expedition.update(180);const b=G.EnemyMgr.all().find(e=>e.boss&&!e.dimensional);if(!b)throw Error('mandatory boss missing');b.dead=true;b.hp=0;G.Expedition.update(.01);G.EnemyMgr.clear();G.Expedition.update(59.99);const before=G.Expedition.state,exit=before.exit;p.x=exit.x;p.y=exit.y;p._vx=p._vy=0;G.Expedition.update(.01);if(G.Expedition.state.phase==='armament'){const models=G.ArmamentRewards.state.pending?.models;if(!models?.length||!G.ArmamentRewards.choose(models[0]))throw Error('armament choice failed');G.Expedition.update(.01);}return{sector:G.Expedition.state.sector,same:G.RiftCompanion.entity===n,hp:n.hp,ammo:n.ammo,dead:n.dead,before:{phase:before.phase,v2:before.v2,exit},after:{phase:G.Expedition.state.phase,v2:G.Expedition.state.v2,distance:Math.hypot(p.x-exit.x,p.y-exit.y)}};}''')
     assert carry['sector']==3 and carry['same'] and carry['hp']==31 and not carry['dead'],carry
     outside=p.evaluate('''()=>{const C=G.RiftCompanion,p=G.Game.player,n=C.entity;const same=C.enterRoom({tier:'D5',rng:()=>{throw Error('reroll of live companion')},geometry:{entry:{x:p.x,y:p.y}},player:p})===n;G.EnemyMgr.clear();const dirs=[[60,0],[-60,0],[0,60],[0,-60]],pos=dirs.map(([x,y])=>({x:n.x+x,y:n.y+y})).find(q=>G.World.isFree(q.x,q.y,18)&&!G.World.projectileBlock((n.x+q.x)/2,(n.y+q.y)/2,2));if(!pos)throw Error('no regular enemy firing lane');const e=G.EnemyMgr.add(new G.Enemy({...G.Content.pursuer,hp:10000,spd:0,dmg:5},pos.x,pos.y,{hp:1,dmg:1,spd:1}));e.spd=0;n.wait=0;n.reload=0;n.ammo=3;const shots=n.shots;G.Expedition.update(.05);const fired=n.shots>shots;e.x=n.x;e.y=n.y;n.invuln=0;const before=n.hp;G.Expedition.update(.01);const hurt=n.hp<before;n.invuln=0;C.hurt(999);const deadShots=n.shots;G.Expedition.update(.1);return{same,fired,hurt,dead:n.dead,sameDead:C.entity===n,noAfter:n.shots===deadShots};}''')
     assert all(outside.values()),outside
    assert not errors,errors;records.append({'tier':tier,'mode':mode,'viewport':[w,h],'entry':entered,'room':room,'path':path,'return':returned,'mapCarry':carry if i==0 else None,'outside':outside if i==0 else None});print(json.dumps({'case':f'D{tier}/{mode}','status':'PASS'}),flush=True);context.close()
   # Generic practice exposes controls and rotates encounters/styles without editing the URL.
   p=browser.new_page(viewport={'width':844,'height':390});p.goto(base+'index.html?prueba=combate-v2&ensayo=grietas');p.wait_for_selector('#rift-practice-tier:visible');generic=[]
   for i in range(6):
    p.click('#btn-technical-start');p.wait_for_function("()=>G.Game.state==='playing'");generic.append(p.evaluate('()=>({tier:G.RiftExpedition.state.portal.tier,style:G.RiftExpedition.state.portal.style,scale:G.Camera.scale})'))
    if i==0:
     xp=p.evaluate('''()=>{const pl=G.Game.player;G.Pickups.clear();for(const w of pl.fieldWeapons)w.shotWait=1e6;pl.training={...(pl.training||{}),learning:10};G.FieldStats.apply(pl);const before=pl.xp;G.Pickups.drop('xp',pl.x,pl.y,12);G.Expedition.update(.01);const once=pl.xp-before;G.Expedition.update(.01);return{once,afterSecond:pl.xp-before,remaining:G.Pickups.all().filter(o=>o.kind==='xp'||o.kind==='xpBig').length};}''')
     assert xp=={'once':18,'afterSecond':18,'remaining':0},xp
    p.evaluate('()=>G.Game.toUI()');p.wait_for_selector('#btn-technical-start:visible')
   assert len({r['tier']for r in generic[:5]})==5 and len({r['style']for r in generic})==6,generic
   p.select_option('#rift-practice-tier','D5');p.select_option('#rift-practice-style','6');p.click('#btn-technical-start');p.wait_for_function("()=>G.Game.state==='playing'");assert p.evaluate("()=>G.RiftExpedition.state.portal.tier==='D5'&&G.RiftExpedition.state.portal.style===6")
   p.screenshot(path=str(OUT/'practica-seleccion.png'));records.append({'genericRound':generic,'explicitSelection':True,'xpMultiplierOnce':xp});p.close()
   # Failure paths return the exact suspended origin without awarding a room NPC.
   for failure in ['asset_failed','asset_timeout']:
    p=browser.new_page(viewport={'width':844,'height':390})
    if failure=='asset_failed':p.route('**/assets/levels/bio-c1/*-clean-r2.png',lambda route:route.abort())
    p.goto(base+'index.html?prueba=combate-v2&ensayo=grietas&grado=D1&apoyo=si');p.wait_for_selector('#btn-technical-start:visible');p.click('#btn-technical-start');p.wait_for_function("()=>G.Game.state==='playing'")
    assert p.evaluate(CONTACT)['active']
    if failure=='asset_failed':p.wait_for_timeout(200)
    else:p.evaluate("()=>{G.RiftRooms.loading=()=>({ready:false,failed:[],pending:['qa-held-room']});}")
    result=p.evaluate('''kind=>{if(kind==='asset_timeout')G.Expedition.update(10.01);else for(let i=0;i<20&&G.RiftExpedition.state.active;i++)G.Expedition.update(.05);const s=G.RiftExpedition.state;return{active:s.active,reason:s.technicalFailures.at(-1)?.reason,npc:G.RiftCompanion.entity,origin:G.EnemyMgr.all()===qaOrigin.enemies&&G.Projectiles.all()===qaOrigin.shots&&G.Pickups.all()===qaOrigin.pickups&&G.World.fixture===qaOrigin.fixture,scale:G.Camera.scale===qaScale,roomBounds:G.Camera.roomBounds,reward:G.RiftPowers.state.pending};}''',failure)
    assert result['active'] is False and result['reason']==failure and result['npc'] is None and result['origin'] and result['scale'] and result['roomBounds'] is None and result['reward'] is None,result
    records.append({'failure':failure,'result':result});p.close()
   browser.close()
 finally:
  if server:server.shutdown();server.server_close()
 (OUT/'browser.json').write_text(json.dumps({'status':'PASS','live':args.live,'records':records,'physicalPhone':False,'method':'Injected invulnerability and branch damage only for identity/flow/pose QA. Difficulty is measured separately without invulnerability.'},ensure_ascii=False,indent=2),encoding='utf-8');print(json.dumps({'status':'PASS','groups':len(records)}))
if __name__=='__main__':main()
