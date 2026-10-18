const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
function setup(seed=1337,quick=false,enabled=true){
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
