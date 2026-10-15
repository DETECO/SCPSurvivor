'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function setup(){
 const expedition={phase:'preparation',sector:1,wave:1,sectorWaves:3,kind:'normal',objective:'neutralize',runSeed:8,mapSeed:9,nextBossSector:4,
  drought:0,extractionAvailable:false,elapsed:30,totals:{wavesCompleted:1,sectorsCompleted:0,bossesDefeated:0,bossesEvaded:0},
  prep:18,pending:0,cards:[],pendingXp:5,resumePhase:'combat',upgradesApplied:0,rngState:4,spawnRngState:7,spawned:12,waveTime:30,
  quota:12,spawnClock:.3,waveKills:0,interaction:0,startX:0,startY:0,startHp:0,startDamage:0};
 const G={Game:{player:{soldierId:'guard',hp:75,maxHp:100,x:20,y:30,level:2,xp:4,xpNext:100,kills:12,bosses:0,training:{},tempStats:{},baseMaxHp:100},
  restoreTechnical(data){this.player=data.player;G.Expedition.state=data.expedition;G.FieldCombat.data=data.combat;G.World.data=data.world;G.Pickups.data=data.pickups;}},
  Expedition:{state:expedition,captureState(){return this.state}},
  FieldCatalog:{soldiers:{guard:{}},validateMods:()=>true},FieldUpgrades:{candidates:()=>[{key:'health'}]},
  FieldCombat:{data:{weapons:[{id:'copy-a',model:'pistol',mods:[],level:1,ammo:3,reload:.4,reloadTime:1.5},{id:'copy-b',model:'smg',mods:[],level:2,ammo:5,reload:0,reloadTime:1.8}],activeIndex:1,shotWait:.2,switchRemaining:.1,shots:8},exportData(){return this.data}},
  FieldAbilities:{state:()=>({kind:'sprint',remaining:1,cooldown:19,duration:2})},World:{data:{broken:['1,2'],damaged:[{tx:3,ty:4,hp:20}]},exportData(){return this.data}},
  Pickups:{data:[{id:5,kind:'heal',x:1,y:2,value:0,vx:3,vy:4,t:.5,pulled:false}],KIND:{heal:{}},exportData(){return this.data}}};
 vm.runInNewContext(fs.readFileSync(require.resolve('../js/systems/run-checkpoint.js'),'utf8'),{G,JSON,Number,Set,Math});return G;
}
test('checkpoint roundtrip preserves copy identity, timers, props and pending XP',()=>{
 const G=setup(),saved=G.RunCheckpoint.capture();assert.equal(saved.expedition.pendingXp,5);assert.equal(saved.combat.weapons[0].reload,.4);
 G.Game.player.hp=10;G.FieldCombat.data.weapons[0].ammo=0;assert.equal(saved.player.hp,75);
 assert.equal(G.RunCheckpoint.restore(saved).ok,true);assert.equal(G.Game.player.hp,75);assert.equal(G.FieldCombat.data.weapons[0].ammo,3);
 assert.equal(G.World.data.broken[0],'1,2');assert.equal(G.Pickups.data[0].id,5);
});
test('incompatible version and duplicate copies reject before game mutation',()=>{
 const G=setup(),saved=G.RunCheckpoint.capture(),before=G.Game.player;saved.buildVersion='other';
 assert.equal(G.RunCheckpoint.restore(saved).ok,false);assert.equal(G.Game.player,before);
 saved.buildVersion='0.5-local-01';saved.combat.weapons[1].id=saved.combat.weapons[0].id;
 assert.equal(G.RunCheckpoint.restore(saved).ok,false);assert.equal(G.Game.player,before);
});
test('advanced combat cannot produce a new checkpoint',()=>{
 const G=setup();G.Expedition.state.phase='combat';G.Expedition.state.waveTime=0;G.Expedition.state.spawned=0;G.RunCheckpoint.atBoundary('wave-start');
 const start=G.RunCheckpoint.capture();assert.ok(start);G.Expedition.state.waveTime=.1;assert.equal(G.RunCheckpoint.capture(),null);
 G.Expedition.state.phase='levelup';G.Expedition.state.resumePhase='combat';assert.equal(G.RunCheckpoint.capture(),null);
});
test('preparation levelup preserves exact offered card keys without reroll',()=>{
 const G=setup();Object.assign(G.Expedition.state,{phase:'levelup',resumePhase:'preparation',pending:1,cards:['health']});
 const saved=G.RunCheckpoint.capture();assert.equal(G.RunCheckpoint.restore(saved).ok,true);
 saved.expedition.cards=['unknown'];assert.equal(G.RunCheckpoint.restore(saved).ok,false);
});

test('every captured expedition field is required before game mutation',()=>{
 for(const field of Object.keys(setup().Expedition.state)){
  const G=setup(),saved=G.RunCheckpoint.capture(),before=G.Game.player;
  delete saved.expedition[field];
  assert.equal(G.RunCheckpoint.restore(saved).ok,false,`missing ${field}`);
  assert.equal(G.Game.player,before,`mutated player for ${field}`);
 }
});

test('invalid expedition numbers, calendar and totals reject before game mutation',()=>{
 const changes=[
  e=>{e.quota=NaN},e=>{e.spawnClock=-1},e=>{e.waveKills=13},e=>{e.nextBossSector=e.sector},
  e=>{e.drought=4},e=>{e.extractionAvailable='yes'},e=>{e.upgradesApplied=3},
  e=>{e.totals.wavesCompleted='1'},e=>{delete e.totals.bossesEvaded},
  e=>{e.totals.bossesDefeated=1},e=>{e.totals.sectorsCompleted=2},e=>{e.rngState=-1}
 ];
 for(const change of changes){
  const G=setup(),saved=G.RunCheckpoint.capture(),before=G.Game.player;change(saved.expedition);
  assert.equal(G.RunCheckpoint.restore(saved).ok,false,change.toString());assert.equal(G.Game.player,before);
 }
});

test('inconsistent combat, boss and levelup phases reject before game mutation',()=>{
 const changes=[
  e=>{e.phase='combat';e.kind='boss';e.sectorWaves=0;e.waveTime=0;e.spawned=0;e.objective='boss';e.nextBossSector=1},
  e=>{e.phase='boss';e.waveTime=0;e.spawned=0;e.objective='boss'},
  e=>{e.objective='survive'},
  e=>{e.phase='levelup';e.resumePhase='preparation';e.pending=0;e.cards=['health']},
  e=>{e.phase='levelup';e.resumePhase='preparation';e.pending=1;e.cards=[]},
  e=>{e.phase='levelup';e.resumePhase='preparation';e.pending=1;e.cards=['health','health']},
  e=>{e.cards=['health']},e=>{e.resumePhase='finished'}
 ];
 for(const change of changes){
  const G=setup(),saved=G.RunCheckpoint.capture(),before=G.Game.player;change(saved.expedition);
  assert.equal(G.RunCheckpoint.restore(saved).ok,false,change.toString());assert.equal(G.Game.player,before);
 }
});

test('valid boss start, boss victory preparation and exploration remain recoverable',()=>{
 for(const phase of ['boss','preparation','exploration']){
  const G=setup(),e=G.Expedition.state;
  Object.assign(e,{phase,sector:4,wave:1,sectorWaves:0,kind:'boss',objective:'boss',spawned:0,waveTime:0,
   nextBossSector:phase==='boss'?4:8,totals:{wavesCompleted:11,sectorsCompleted:phase==='boss'?3:4,bossesDefeated:phase==='boss'?0:1,bossesEvaded:0}});
  if(phase==='boss')G.RunCheckpoint.atBoundary('boss-start');
  const saved=G.RunCheckpoint.capture();assert.ok(saved,phase);
  assert.equal(G.RunCheckpoint.restore(saved).ok,true,phase);
 }
});
