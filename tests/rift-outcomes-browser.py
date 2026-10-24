"""Deterministic adversarial QA: retreat/expiration/death, powers and NPC; actual modules, disclosed injections."""
from pathlib import Path
from http.server import ThreadingHTTPServer
from functools import partial
from threading import Thread
from playwright.sync_api import sync_playwright
import importlib.util,json,argparse,os
ROOT=Path(os.environ.get('SCP_TEST_ROOT',Path(__file__).resolve().parents[1]))
spec=importlib.util.spec_from_file_location('integral',Path(__file__).with_name('rift-integral-browser.py'));helper=importlib.util.module_from_spec(spec);spec.loader.exec_module(helper)
def main():
 parser=argparse.ArgumentParser();parser.add_argument('--live',action='store_true');args=parser.parse_args();server=None
 if args.live:base='https://deteco.github.io/SCPSurvivor/'
 else:
  server=ThreadingHTTPServer(('127.0.0.1',0),partial(helper.Quiet,directory=str(ROOT)));Thread(target=server.serve_forever,daemon=True).start();base=f'http://127.0.0.1:{server.server_port}/'
 records=[];out=ROOT/'tests/artifacts/grietas-integrales'/('live'if args.live else'local');out.mkdir(parents=True,exist_ok=True)
 try:
  with sync_playwright()as pw:
   b=pw.chromium.launch(headless=True);p=b.new_page(viewport={'width':1280,'height':900});errors=[];p.on('pageerror',lambda e:errors.append(str(e)));p.on('console',lambda m:errors.append(m.text)if m.type=='error'else None)
   def start(tier=2,npc='no'):
    p.goto(f'{base}index.html?prueba=combate-v2&ensayo=grietas&grado=D{tier}&apoyo={npc}&graficos=32');p.wait_for_selector('#btn-technical-start:visible',timeout=30000);p.click('#btn-technical-start');p.wait_for_function("()=>G.Game.state==='playing'");p.evaluate(helper.SETUP);p.wait_for_function("()=>G.RiftExpedition.state.status==='combat'")
   start()
   retreat=p.evaluate('''()=>{const p=G.Game.player;qaStep(89);const warning=G.RiftExpedition.state.escape;qaStep(1.1);const open=G.RiftExpedition.state.escape,r=G.RiftExpedition.state;const hp=p.hp,ammo=G.FieldCombat.state.ammo;p.x=r.exit.x;p.y=r.exit.y;G.Expedition.update(1/30);return{warning,open,active:G.RiftExpedition.state.active,origin:qaCheckOrigin(),powers:G.RiftPowers.state.owned.length,hp:p.hp===hp,ammo:G.FieldCombat.state.ammo===ammo,npc:G.RiftCompanion.state};}''')
   assert retreat['warning']=='warning'and retreat['open']=='open'and not retreat['active']and all(retreat['origin'].values())and retreat['powers']==0 and retreat['hp']and retreat['ammo']and retreat['npc']is None,retreat;records.append({'retreat':retreat})
   second=p.evaluate('''()=>{const p=G.Game.player;qaStep(60);const r=G.RiftExpedition.state;const count=r.director.appearanceCount;if(!r.portal||r.portal.status!=='open')throw Error('second portal missing');p.x=r.portal.x;p.y=r.portal.y;G.Expedition.update(1/30);return{count,id:G.RiftExpedition.state.id,active:G.RiftExpedition.state.active,time:G.RiftExpedition.state.time};}''');assert second['count']==2 and second['active']and second['time']==0,second;records.append({'second':second})
   start()
   expired=p.evaluate('''()=>{qaStep(96);const p=G.Game.player,r=G.RiftExpedition.state;p.x=r.exit.x;p.y=r.exit.y;G.Expedition.update(1/30);const before={escape:r.escape,active:G.RiftExpedition.state.active};G.EnemyMgr.all().find(e=>e.dimensional).hurt(1e6);G.Expedition.update(1/30);return{...before,reward:!!G.RiftExpedition.state.reward};}''');assert expired=={'escape':'expired','active':True,'reward':True},expired;p.wait_for_selector('#rift-power-choice button:visible');p.locator('#rift-power-choice button').first.click();p.wait_for_function('()=>!G.RiftExpedition.state.active');records.append({'expiredThenVictory':expired})
   start(5,'si')
   death=p.evaluate('''()=>{const p=G.Game.player;p.hp=0;G.Expedition.update(1/30);return{phase:G.Expedition.state.phase,reason:G.Expedition.state.result.reason,active:G.RiftExpedition.state.active,powers:G.RiftPowers.state.owned.length,npc:G.RiftCompanion.state};}''');assert death=={'phase':'finished','reason':'death','active':False,'powers':0,'npc':None},death;records.append({'death':death})
   p.evaluate("()=>{G.Game.toUI();G.Game.startTechnical({seed:1337,soldierId:'guard'});}");assert p.evaluate('()=>!G.RiftExpedition.state.active&&G.RiftPowers.state.owned.length===0&&G.RiftCompanion.state===null')
   powers=p.evaluate('''()=>{const p=G.Game.player;G.World.reset(1);G.World.setFixture({minX:-20,maxX:20,minY:-20,maxY:20,walls:[],props:[]});p.x=p.y=16;const rows=[];
    for(const profile of G.RiftPowers.catalog){G.RiftPowers.startRun();G.EnemyMgr.clear();G.Projectiles.clear();const e=G.EnemyMgr.add(new G.Enemy({...G.Content.pursuer,hp:10000},116,16,{hp:1,dmg:1,spd:1}));G.EnemyMgr.rebuildGrid();const offer=G.RiftPowers.victory('qa:'+profile.id,p,{rng:()=>0,anomalyId:profile.id});G.RiftPowers.choose(profile.id,p);const before=e.hp;G.RiftPowers.tick(10,p);for(let i=0;i<50;i++){G.Projectiles.update(1/60,p,G.EnemyMgr.all());G.Combat.resolve(1/60,p,i/60);}rows.push({id:profile.id,damage:before-e.hp});}
    return rows;}''');assert all(r['damage']>0 for r in powers),powers;records.append({'actualPowerDamage':powers})
   companion=p.evaluate('''()=>{const p=G.Game.player;G.EnemyMgr.clear();G.Projectiles.clear();const boss=G.EnemyMgr.add(new G.Enemy({...G.Content.boss,hp:2},100,16,{hp:1,dmg:1,spd:1},true));boss.phase='rest';const before=p.xp;const npc=G.RiftCompanion.create({tier:'D5',rng:()=>0,geometry:{entry:{x:16,y:16}},player:p});const arrival=G.RiftCompanion.state.bubble;for(let i=0;i<80;i++)G.RiftCompanion.update(1,p,{boss});const after=G.RiftCompanion.state;G.RiftCompanion.hurt(1000);const incapacitated=G.RiftCompanion.state.incapacitated;return{arrival,personality:npc.personality,ammo:after.ammo,rarity:after.rarity,hp:boss.hp,xpUnchanged:p.xp===before,incapacitated};}''');assert companion['ammo']==0 and companion['rarity']=='Legendaria'and companion['hp']==1 and companion['xpUnchanged']and companion['incapacitated']and 'miedo'in companion['arrival'].lower()and '{'not in companion['arrival'],companion;records.append({'npcFiniteNoFinish':companion})
   dialogs=p.evaluate('''()=>{const p=G.Game.player;G.RiftCompanion.create({tier:'D1',rng:()=>0,geometry:{entry:{x:16,y:16}},player:p});const arrival=G.RiftCompanion.state.bubble;G.RiftCompanion.update(13,p,{});const own=G.RiftCompanion.state.bubble;G.RiftCompanion.update(16,p,{});const player=G.RiftCompanion.state.bubble;return{arrival,own,player,personalities:Object.keys(G.RiftDialogueData.bank).length};}''');assert dialogs['personalities']==14 and 'Pistola AF01'in dialogs['own']and 'Pistola'in dialogs['player']and all('{'not in dialogs[x]for x in['arrival','own','player']),dialogs;records.append({'contextDialogs':dialogs})
   # A fourth actual power removes projectiles of the replaced power, not just its label.
   replace=p.evaluate('''()=>{const p=G.Game.player;G.RiftPowers.clear();G.Projectiles.clear();for(const id of ['esporario','larva','malla']){G.RiftPowers.victory('qa-acquire:'+id,p,{rng:()=>0,anomalyId:id});G.RiftPowers.choose(id,p);}G.Projectiles.spawn({riftPower:'larva'});G.RiftPowers.victory('qa-fourth',p,{rng:()=>0,anomalyId:'portador'});const request=G.RiftPowers.choose('portador',p);const before=G.RiftPowers.state.owned.map(p=>p.id);const result=G.RiftPowers.choose('portador',p,{replaceId:'larva'});return{request,before,result,owned:G.RiftPowers.state.owned,oldProjectiles:G.Projectiles.all().filter(p=>p.riftPower==='larva').length,freeCards:G.FieldUpgrades.candidates(p).filter(c=>c.category==='power').length};}''');assert replace['request']['requiresReplacement']and replace['result']['accepted']and len(replace['owned'])==3 and replace['oldProjectiles']==0 and replace['freeCards']==3,replace;records.append({'actualReplacementAndFreeCards':replace})
   # A failed physical location consumes only its opportunity, never its tier/cap again.
   start()
   p.evaluate('''()=>{qaStep(90);const p=G.Game.player,r=G.RiftExpedition.state;p.x=r.exit.x;p.y=r.exit.y;G.Expedition.update(1/30);}''')
   location=p.evaluate('''()=>{const free=G.World.isFree;G.World.isFree=()=>false;G.RiftExpedition.updateOrigin(1,120,G.Game.player);G.World.isFree=free;const first=G.RiftExpedition.state.director;G.RiftExpedition.updateOrigin(1,120,G.Game.player);const second=G.RiftExpedition.state.director;return{count:first.appearanceCount,requests:first.requests.map(r=>r.status),same:JSON.stringify(first)===JSON.stringify(second)};}''');assert location['count']==1 and location['requests']==['confirmed','failed']and location['same'],location;records.append({'failedLocationNoReroll':location})
   extras=p.evaluate('''()=>{const player=G.Game.player;G.World.reset(1);G.World.setFixture({minX:-20,maxX:20,minY:-20,maxY:20,walls:[],props:[]});player.x=player.y=16;const rows=[];
    for(const profile of G.RiftPowers.catalog){
     G.RiftPowers.clear();G.EnemyMgr.clear();G.Projectiles.clear();const enemies=[];
     for(let i=0;i<4;i++)enemies.push(G.EnemyMgr.add(new G.Enemy({...G.Content.pursuer,hp:10000},profile.id==='esporario'?206:116+i*24,16,{hp:1,dmg:1,spd:1})));
     G.EnemyMgr.rebuildGrid();G.RiftPowers.victory('extra:'+profile.id,player,{rng:()=>0,anomalyId:profile.id});G.RiftPowers.choose(profile.id,player);for(let n=0;n<4;n++)G.RiftPowers.applyCard({id:profile.id},player);
     const spawn=G.Projectiles.spawn,shots=[];G.Projectiles.spawn=o=>{shots.push({dmg:o.dmg,pierce:o.pierce});return spawn(o);};G.RiftPowers.tick(10,player);const base={shots:shots.slice(),damaged:enemies.filter(e=>e.hp<10000).length};G.Projectiles.clear();shots.length=0;for(const e of enemies)e.hp=10000;
     G.RiftPowers.applyCard({id:profile.id},player);G.RiftPowers.tick(10,player);const max={shots:shots.slice(),damaged:enemies.filter(e=>e.hp<10000).length};
     if(profile.id==='huesped'){const first=10000-enemies[0].hp,token=G.RiftPowers.suspend();G.RiftPowers.tick(1,player);const suspended=10000-enemies[0].hp;G.RiftPowers.resume(token);G.RiftPowers.tick(.5,player);const twice=10000-enemies[0].hp;G.RiftPowers.tick(.5,player);max.echo={first,suspended,twice,after:10000-enemies[0].hp};}
     G.Projectiles.spawn=spawn;rows.push({id:profile.id,base,max});
    }return rows;}''')
   by={r['id']:r for r in extras};assert by['esporario']['base']['damaged']==0 and by['esporario']['max']['damaged']==4,extras
   assert by['larva']['base']['shots'][0]['pierce']==0 and by['larva']['max']['shots'][0]['pierce']==1 and by['larva']['base']['shots'][0]['dmg']==by['larva']['max']['shots'][0]['dmg'],extras
   assert by['malla']['base']['damaged']==3 and by['malla']['max']['damaged']==4,extras
   assert len(by['portador']['base']['shots'])==5 and len(by['portador']['max']['shots'])==7,extras
   echo=by['huesped']['max']['echo'];assert echo['first']==echo['suspended']and abs(echo['twice']-2*echo['first'])<1e-8 and echo['twice']==echo['after'],extras;records.append({'fiveOwnMaxExtras':extras})
   home=p.evaluate('''()=>{const p=G.Game.player;G.RiftCompanion.create({tier:'D1',rng:()=>0,geometry:{entry:{x:16,y:16}},player:p});G.RiftCompanion.update(13,p,{});G.RiftCompanion.update(16,p,{});G.RiftCompanion.update(40,p,{roomContext:{yellowPaper:false,repeatedCorridors:false}});const state=G.RiftCompanion.state;return{bubble:state.bubble,homeUsed:state.homeUsed,biography:state.biography,used:state.used};}''');assert home['homeUsed']and home['biography']=='generic-home'and '08'in home['used']and '06'not in home['used']and '07'not in home['used'],home;records.append({'compatibleHomeAndAbsentScenarioTags':home})
   assert not errors,errors;b.close()
 finally:
  if server:server.shutdown();server.server_close()
 (out/'outcomes.json').write_text(json.dumps({'status':'PASS','records':records,'live':args.live,'physicalPhone':False,'method':'Injected time, positions, invulnerability, HP and deterministic NPC draws; actual AI/combat/projectile/reward/return modules.'},indent=2),encoding='utf-8');print(json.dumps({'status':'PASS','groups':len(records)}))
if __name__=='__main__':main()
