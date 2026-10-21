const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
function setup(seed=1337,quick=false,enabled=true,options={}){
 let list=[],items=[],id=0;
 const G={U:{dist:(a,b,x,y)=>Math.hypot(x-a,y-b),rand:()=>0},Camera:{w:768,h:768,x:0,y:0,sees:()=>false,follow(){}},
 World:{reset(){},setFixture(){},setBiome(){},isFree:()=>true,update(){}},Path:{clear(){},update(){},reachable:()=>true},
 SectorMaps:{generate:s=>({seed:s,fixture:{},entry:{x:0,y:0},exit:{x:32,y:0},bossSpawn:{x:256,y:0},spawnPoints:Array.from({length:100},(_,i)=>({x:450+i,y:0}))})},
 Content:{sectors:[{},{}],pursuer:{hp:30,dex:'pursuer01'},biological:{hp:24,dex:'biological01'},boss:{hp:600,dex:'warden01',xp:220}},
 Enemy:class{constructor(def,x,y,sc,boss=false){Object.assign(this,{id:++id,def,x,y,sc,boss,hp:def.hp*sc.hp,dead:false,minions:[]});}die(){if(this.dead)return;this.dead=true;items.push({kind:'xp',value:this.def.xp||14,id:this.id});}},
 EnemyMgr:{clear(){list=[]},add(e){list.push(e);return e},get(id){return list.find(e=>e.id===id)},all:()=>list,get count(){return list.length},update(){list=list.filter(e=>!e.dead)}},
 Projectiles:{clear(){},update(){}},Pickups:{clear(){items=[]},all:()=>items,removeId(id){items=items.filter(i=>i.id!==id)},update(){}},
 Input:{reset(){},axis:()=>[0,0]},Touch:{reset(){}},FieldCombat:{reset(){},tick(){},clearTemporary(p){p.tempStats={}}},FX:{update(){}},Spawner:{CAP:64,say(){},tickBanner(){}},Combat:{resolve(){}},FieldUpgrades:{offer:()=>[{key:'health',apply:p=>p.perks++}]} };
 const player={hp:100,maxHp:100,kills:0,bosses:0,r:12,regenFlat:0,perks:0,x:0,y:0,xp:0,xpNext:1e9,xpMul:1,level:1,update(){},gainXp(n){this.xp+=n;return 0}};
 const riftMode='';const inventory=false;
 if(riftMode){G.Audio={sfx(){}};G.World.projectileBlock=()=>null;
  vm.runInNewContext(fs.readFileSync(require.resolve('../js/systems/dimensional-rifts.js'),'utf8'),{G,Math,URLSearchParams,window:{location:{hostname:'127.0.0.1',search:riftMode}}});}
 if(inventory)G.InventoryTrial={enabled:true,directTest:true};
 G.MapTrial={enabled,quick,duration:300,bossAt:240,startTime:quick?270:0,allies:[],resets:0,arrivals:0,reset(g){this.resets++;this.geometry=g},arrive(){this.arrivals++},updateAllies(){},draw(){}};
 if(options.chests){
  G.SectorMaps.generateV2=s=>({...G.SectorMaps.generate(s),layout:'v2-open-160x100',chestCandidates:Array.from({length:6},(_,id)=>({id,x:100+id*100,y:100}))});
  G.ExplorationChests={runs:0,resets:[],ticks:[],startRun(){this.runs++},reset(g,o){this.resets.push({g,o})},tick(...args){this.ticks.push(args)},draw(){},state:{chests:[]}};
 }
 if(options.prepare)options.prepare(G,player);
 for(const file of ['../js/data/field-catalog.js','../js/systems/field-stats.js','../js/systems/field-abilities.js','../js/systems/expedition.js'])vm.runInNewContext(fs.readFileSync(require.resolve(file),'utf8'),{G,Math});G.Expedition.start(player,{seed});
 function clearWave(){for(let step=0;step<500;step++){for(const e of G.EnemyMgr.all()){if(!e.dead){e.dead=true;player.kills++;}}G.Expedition.update(1);if(G.Expedition.state.phase==='preparation')return;}throw Error('wave stuck')}
 function clearSector(){for(let n=0;n<G.Expedition.state.sectorWaves;n++){clearWave();G.Expedition.ready()}player.x=G.Expedition.state.exit.x;player.y=G.Expedition.state.exit.y;}
 return {G,player,clearWave,clearSector};
}

test('V2 reloj exacto y corte previo al update: no normales ni refuerzos desde300',()=>{
 const {G}=setup();G.Expedition.update(239);G.Expedition.update(.99);assert.equal(G.Expedition.state.v2.bossSpawned,false);
 G.Expedition.update(.01);const boss=G.EnemyMgr.all().find(e=>e.boss);assert.ok(boss);
 G.Expedition.update(59.99);assert.equal(G.Expedition.state.v2.doorOpen,false);
 let calls=0;G.EnemyMgr.update=()=>{calls++;assert.equal(G.Expedition.summon(boss,2),0)};
 const count=G.EnemyMgr.count;G.Expedition.update(.01);assert.equal(G.EnemyMgr.count,count);assert.equal(calls,1);
 assert.equal(G.Expedition.state.v2.mapTime,300);assert.equal(G.Expedition.state.v2.spawnClosed,true);assert.equal(G.MapTrial.arrivals,1);
 G.Expedition.update(5);assert.equal(G.Expedition.state.v2.mapTime,300);assert.equal(G.EnemyMgr.count,count);assert.equal(G.MapTrial.arrivals,1);
});
function rewardSetup(practice=false){
 const offers=[],rewards=[];let rift={status:'idle',x:450,y:0,remaining:45};
 const fixture=setup(42,false,true,{prepare(G){
  G.MapTrial.rewardRiftPractice=practice;
  G.EventRewards={runs:0,startRun(){this.runs++},offer(o){offers.push(o);return{id:o.id,kind:o.kind,tickets:o.kind==='rift'?2:0}}};
  G.ExplorationChests={startRun(){},reset(){},tick(){},addReward(plan,point){rewards.push({plan,point})}};
  G.DimensionalRifts={enabled:practice,reset(){},clear(){rift.status='idle'},offer(){rift.status='open';return true},
   enter(p){if(rift.status!=='open'||Math.hypot(p.x-rift.x,p.y-rift.y)>34)return false;rift.status='active';return true},
   tick(dt){if(rift.status==='open'){rift.remaining=Math.max(0,rift.remaining-dt);if(!rift.remaining)rift.status='closed'}},
   complete(result){rift.status='resolved';rift.result=result},get state(){return{...rift}}};
 }});
 return{...fixture,offers,rewards};
}
test('infinite armament choice freezes time and crossing resolves reward and XP before preserving build',()=>{
 const rewards=[],claims=[];let waiting=false;
 const {G,player}=setup(42,true,true,{prepare(G){
  G.MapTrial.infinite=true;
  G.ArmamentRewards={startRun(){},offer(p){rewards.push(p);return{id:p.id,kind:p.kind}},claimAll(){claims.push(1);if(waiting)G.Expedition.awaitArmament();return !waiting},state:{pending:null}};
  G.ExplorationChests={startRun(){},reset(){},tick(){},addReward(){return true}};
 }});
 G.Expedition.awaitArmament();const time=G.Expedition.state.v2.mapTime;G.Expedition.update(10);assert.equal(G.Expedition.state.v2.mapTime,time);
 G.Expedition.resolveArmament();player.x=-200;G.EnemyMgr.all().find(e=>e.boss).dead=true;G.Expedition.update(30);assert.equal(rewards.length,1);
 waiting=true;player.x=G.Expedition.state.exit.x;player.y=G.Expedition.state.exit.y;assert.equal(G.Expedition.useExit(),false);assert.equal(G.Expedition.state.sector,1);
 waiting=false;G.Expedition.resolveArmament();assert.equal(G.Expedition.useExit(),true);assert.equal(G.Expedition.state.sector,2);assert.ok(claims.length>=2);
});
test('expanded terminal phase freezes director and restores combat without changing build',()=>{
 let resets=0;const{G,player}=setup(42,false,true,{prepare(G){G.MapTrial.infinite=true;G.MapTrial.expanded=true;G.WeaponTerminal={reset(){resets++},tick(){},draw(){}};}});
 const build=player.tempStats;assert.equal(resets,1);assert.equal(G.Expedition.awaitTerminal(),true);const time=G.Expedition.state.v2.mapTime;
 G.Expedition.update(30);assert.equal(G.Expedition.state.v2.mapTime,time);assert.equal(G.Expedition.state.phase,'terminal');assert.equal(player.tempStats,build);
 assert.equal(G.Expedition.resolveTerminal(),true);G.Expedition.update(1);assert.equal(G.Expedition.state.v2.mapTime,time+1);assert.equal(G.Expedition.resolveTerminal(),false);
});
test('infinite recovery counts only the part before300s, while active durations expire',()=>{
 const {G,player}=setup(42,true,true,{prepare(G){G.MapTrial.infinite=true}});
 player.hp=10;player.training={recovery:5};player.update=dt=>{player.hp+=player.regenFlat*dt};G.FieldAbilities.sprint(player);
 G.Expedition.update(30);assert.equal(player.hp,25);assert.equal(G.FieldAbilities.state(player).cooldown,0);
 player.fieldAbility.cooldown=10;player.fieldAbility.remaining=2;G.Expedition.update(5);
 assert.equal(player.hp,25);assert.equal(G.FieldAbilities.state(player).cooldown,10);assert.equal(G.FieldAbilities.state(player).remaining,0);
});
test('B3 jefe obligatorio ofrece cofre una vez; premio no se aplica por matar',()=>{
 const {G,player,offers,rewards}=rewardSetup();assert.equal(G.EventRewards.runs,1);
 G.Expedition.update(240);const boss=G.EnemyMgr.all().find(e=>e.boss);boss.dead=true;
 G.Expedition.update(.01);G.Expedition.update(.01);
 assert.equal(offers.length,1);assert.equal(offers[0].kind,'boss');assert.equal(offers[0].player,player);
 assert.equal(rewards.length,1);assert.equal(rewards[0].point.x,boss.x);assert.equal(G.Expedition.state.v2.bossDefeated,true);
});
test('B3 contacto dimensional no limpia remanentes ni sustituye jefe obligatorio; victoria entrega otro cofre',()=>{
 const {G,player,offers,rewards}=rewardSetup(true),remnant=G.EnemyMgr.all()[0];
 assert.equal(G.DimensionalRifts.state.status,'open');assert.equal(G.Expedition.useRift(),false);
 const p=G.DimensionalRifts.state;player.x=p.x;player.y=p.y;G.Expedition.update(.01);
 const dimensional=G.EnemyMgr.all().find(e=>e.dimensional);assert.ok(dimensional);assert.equal(offers.length,0);
 assert.ok(G.EnemyMgr.get(remnant.id));assert.equal(G.Expedition.state.v2.bossDefeated,false);
 G.Expedition.update(240);const mandatory=G.EnemyMgr.all().find(e=>e.boss&&!e.dimensional);assert.ok(mandatory);
 dimensional.dead=true;G.Expedition.update(.01);G.Expedition.update(.01);
 assert.equal(G.DimensionalRifts.state.result,'defeated');assert.equal(offers.length,1);assert.equal(offers[0].kind,'rift');
 assert.equal(rewards.length,1);assert.equal(G.Expedition.state.v2.bossDefeated,false);assert.ok(G.EnemyMgr.get(mandatory.id));assert.ok(G.EnemyMgr.get(remnant.id));
 mandatory.dead=true;G.Expedition.update(.01);assert.equal(offers.length,2);assert.equal(offers[1].kind,'boss');
 assert.equal(G.Expedition.captureState(),null);
});
test('B3 grieta expirada o muerte no concede premio',()=>{
 const {G,player,offers}=rewardSetup(true);G.Expedition.update(46);
 const r=G.DimensionalRifts.state;assert.equal(r.status,'closed');player.x=r.x;player.y=r.y;
 assert.equal(G.Expedition.useRift(),false);player.hp=0;G.Expedition.update(.01);assert.equal(offers.length,0);
});
test('B3 refuerzos dimensionales reservan al jefe obligatorio y respetan24 enemigos',()=>{
 const {G,player}=rewardSetup(true),r=G.DimensionalRifts.state;
 player.x=r.x;player.y=r.y;G.Expedition.update(.01);
 const boss=G.EnemyMgr.all().find(e=>e.dimensional);
 while(G.EnemyMgr.count<22)G.EnemyMgr.add(new G.Enemy(G.Content.pursuer,600,0,{hp:1}));
 assert.equal(G.Expedition.summon(boss,4),1);assert.equal(G.EnemyMgr.count,23);
 assert.equal(G.Expedition.summon(boss,4),0);
 G.Expedition.update(240);assert.equal(G.EnemyMgr.count,24);assert.equal(G.Expedition.summon(boss,4),0);
});
test('V2 jefe temprano espera puerta; remanentes permanecen y transición conserva build/vida',()=>{
 const {G,player}=setup();G.Expedition.update(240);const boss=G.EnemyMgr.all().find(e=>e.boss),remnant=G.EnemyMgr.all().find(e=>!e.boss);
 player.hp=73;player.tempStats.power=7;player.weapons=[{id:'kept'}];const weapons=player.weapons,stats=player.tempStats;
 boss.dead=true;G.Expedition.update(.01);assert.equal(G.Expedition.state.v2.bossDefeated,true);assert.ok(G.EnemyMgr.get(remnant.id));assert.equal(G.Expedition.state.phase,'combat');
 player.x=G.Expedition.state.exit.x;player.y=G.Expedition.state.exit.y;assert.equal(G.Expedition.useExit(),false);
 const seed=G.Expedition.state.mapSeed;G.Expedition.update(59.99);assert.equal(G.Expedition.state.sector,2);assert.equal(G.Expedition.state.v2.mapTime,0);
 assert.equal(player.hp,73);assert.equal(player.tempStats,stats);assert.equal(player.weapons,weapons);assert.notEqual(G.Expedition.state.mapSeed,seed);
 assert.equal(G.Expedition.state.totals.sectorsCompleted,1);assert.equal(G.Expedition.state.totals.bossesDefeated,1);assert.equal(G.MapTrial.resets,2);
});
test('V2 puerta con jefe vivo bloqueada y rechaza escape/extract; contacto exige radio de puerta',()=>{
 const {G,player}=setup(),add=G.EnemyMgr.add;G.EnemyMgr.add=e=>{assert.ok(G.Expedition.state.v2.mapTime<300);assert.equal(G.Expedition.state.v2.spawnClosed,false);return add(e)};
 G.Expedition.update(300);G.EnemyMgr.add=add;player.x=G.Expedition.state.exit.x;player.y=G.Expedition.state.exit.y;
 assert.equal(G.Expedition.useExit(),false);assert.equal(G.Expedition.useExit('escape'),false);assert.equal(G.Expedition.useExit('extract'),false);
 G.EnemyMgr.all().find(e=>e.boss).dead=true;player.x+=50;G.Expedition.update(.01);assert.equal(G.Expedition.state.sector,1);
 player.x-=50;G.Expedition.update(.01);assert.equal(G.Expedition.state.sector,2);G.Expedition.update(.01);assert.equal(G.Expedition.state.sector,2);
});
test('V2 quick solo primer mapa, jefe garantizado con cap y respeta nivel/pausa',()=>{
 const {G,player}=setup(42,true);assert.equal(G.Expedition.state.v2.mapTime,270);assert.equal(G.Expedition.state.v2.bossSpawned,true);
 G.Expedition.update(30);G.EnemyMgr.all().find(e=>e.boss).dead=true;player.x=G.Expedition.state.exit.x;player.y=G.Expedition.state.exit.y;G.Expedition.update(.01);
 assert.equal(G.Expedition.state.v2.mapTime,0);G.Spawner.CAP=4;G.Expedition.update(240);assert.ok(G.EnemyMgr.all().find(e=>e.boss));
 G.Pickups.update=(dt,p,collect)=>collect({kind:'xp',value:1});player.gainXp=()=>1;player.xpNext=1;G.Expedition.update(.01);
 assert.equal(G.Expedition.state.phase,'levelup');const t=G.Expedition.state.v2.mapTime;G.EnemyMgr.all().find(e=>e.boss).dead=true;G.Expedition.update(10);
 assert.equal(G.Expedition.state.v2.mapTime,t);assert.equal(G.Expedition.state.v2.bossDefeated,true);assert.equal(G.Expedition.choose(0),true);
});
test('V2 mezcla enemigos y escala con tiempo sin cerrar oleadas ni exceder cap normal',()=>{
 const {G}=setup();assert.ok(G.EnemyMgr.all().some(e=>e.def===G.Content.biological));
 G.Expedition.update(60);assert.equal(G.Expedition.state.phase,'combat');assert.equal(G.Expedition.state.totals.wavesCompleted,0);
 assert.ok(G.EnemyMgr.all().some(e=>e.sc.hp>1));G.Expedition.update(180);assert.equal(G.EnemyMgr.count,24);
 const boss=G.EnemyMgr.all().find(e=>e.boss);assert.ok(boss);boss.dead=true;G.Expedition.update(.01);G.Expedition.update(.01);
 assert.equal(G.Expedition.state.totals.bossesDefeated,1);assert.equal(G.Expedition.state.sector,1);
 const copy=setup();assert.equal(copy.G.Expedition.state.mapSeed,G.Expedition.state.mapSeed);
});
test('V2 no checkpoint/restauración heredada; muerte normal y legacy sin campo V2',()=>{
 const a=setup();let boundaries=0;a.G.RunCheckpoint={atBoundary(){boundaries++}};assert.equal(a.G.Expedition.captureState(),null);assert.throws(()=>a.G.Expedition.restoreState({}),/V2/);
 a.G.Expedition.update(300);assert.equal(boundaries,0);a.player.hp=0;a.G.Expedition.update(.1);assert.equal(a.G.Expedition.state.result.reason,'death');
 const legacy=setup(1337,false,false);assert.equal('v2' in legacy.G.Expedition.state,false);assert.ok(legacy.G.Expedition.captureState());legacy.clearWave();assert.equal(legacy.G.Expedition.state.phase,'preparation');
});

test('V2 integra geometría y cofres, reloj rápido sin regalos retroactivos y reinicio por mapa',()=>{
 const {G,player}=setup(42,true,true,{chests:true});
 assert.equal(G.MapTrial.geometry.layout,'v2-open-160x100');
 assert.equal(G.ExplorationChests.runs,1);assert.equal(G.ExplorationChests.resets.length,1);
 assert.equal(G.ExplorationChests.resets[0].o.startTime,270);
 assert.equal(G.ExplorationChests.resets[0].o.sector,1);
 G.Expedition.update(1);assert.equal(G.ExplorationChests.ticks.length,1);
 assert.equal(G.ExplorationChests.ticks[0][1],271);assert.equal(G.ExplorationChests.ticks[0][2],player);
 G.Expedition.update(29);G.EnemyMgr.all().find(e=>e.boss).dead=true;
 player.x=G.Expedition.state.exit.x;player.y=G.Expedition.state.exit.y;G.Expedition.update(.01);
 assert.equal(G.ExplorationChests.runs,1);assert.equal(G.ExplorationChests.resets.length,2);
 assert.equal(G.ExplorationChests.resets[1].o.startTime,0);assert.equal(G.ExplorationChests.resets[1].o.sector,2);
 G.Pickups.update=(dt,p,collect)=>collect({kind:'xp',value:1});player.gainXp=()=>1;player.xpNext=1;
 G.Expedition.update(.01);assert.equal(G.Expedition.state.phase,'levelup');
 const ticks=G.ExplorationChests.ticks.length;G.Expedition.update(10);assert.equal(G.ExplorationChests.ticks.length,ticks);
 player.hp=0;G.Expedition.update(.1);assert.equal(G.ExplorationChests.ticks.length,ticks);
 const legacy=setup(42,false,false,{chests:true});assert.equal(legacy.G.ExplorationChests.runs,0);assert.equal(legacy.G.ExplorationChests.resets.length,0);
});

test('V2 mapa grande genera la horda cerca del jugador, sin llenar el cupo con enemigos remotos',()=>{
 const {G,player}=setup(42,false,true,{chests:true,prepare(g,p){
  g.SectorMaps.generateV2=s=>({...g.SectorMaps.generate(s),layout:'v2-open-160x100',spawnPoints:[{x:2400,y:0},{x:500,y:0},{x:2800,y:0},{x:-500,y:0}]});
 }});
 assert.equal(G.EnemyMgr.count,4);
 for(const e of G.EnemyMgr.all())assert.ok(Math.hypot(e.x-player.x,e.y-player.y)<=800,'spawn remoto');
});
