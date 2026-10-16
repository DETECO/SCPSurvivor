const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
function setup(seed=1337,riftMode='',inventory=false){
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
 if(riftMode){G.Audio={sfx(){}};G.World.projectileBlock=()=>null;
  vm.runInNewContext(fs.readFileSync(require.resolve('../js/systems/dimensional-rifts.js'),'utf8'),{G,Math,URLSearchParams,window:{location:{hostname:'127.0.0.1',search:riftMode}}});}
 if(inventory)G.InventoryTrial={enabled:true,directTest:true};
 for(const file of ['../js/data/field-catalog.js','../js/systems/field-stats.js','../js/systems/field-abilities.js','../js/systems/expedition.js'])vm.runInNewContext(fs.readFileSync(require.resolve(file),'utf8'),{G,Math});G.Expedition.start(player,{seed});
 function clearWave(){for(let step=0;step<500;step++){for(const e of G.EnemyMgr.all()){if(!e.dead){e.dead=true;player.kills++;}}G.Expedition.update(1);if(G.Expedition.state.phase==='preparation')return;}throw Error('wave stuck')}
 function clearSector(){for(let n=0;n<G.Expedition.state.sectorWaves;n++){clearWave();G.Expedition.ready()}player.x=G.Expedition.state.exit.x;player.y=G.Expedition.state.exit.y;}
 return {G,player,clearWave,clearSector};
}

test('grieta: contacto activa al instante una sola vez; cercanía no activa',()=>{
 const a=setup(1337,'?prueba=grieta'),rift=a.G.DimensionalRifts.state;
 let resets=0;a.G.Input.reset=()=>resets++;a.G.Touch.reset=()=>resets++;
 a.player.x=rift.x-40;a.player.y=rift.y;a.G.Expedition.update(.01);assert.equal(a.G.Expedition.state.phase,'exploration');
 a.player.x=rift.x;a.G.Expedition.update(.01);assert.equal(a.G.Expedition.state.phase,'boss');
 assert.equal(a.G.Expedition.state.dimensional,true);assert.equal(a.G.EnemyMgr.count,1);
 a.G.Expedition.update(.01);a.G.Expedition.update(.01);assert.equal(a.G.EnemyMgr.count,1);
 assert.equal(a.G.DimensionalRifts.state.status,'active');
 assert.equal(resets,0,'Ingresar no corta el movimiento mantenido');
});

test('grieta cerrada no activa por contacto',()=>{
 const a=setup(1337,'?prueba=grieta'),rift=a.G.DimensionalRifts.state;
 a.G.Expedition.update(45.01);a.player.x=rift.x;a.player.y=rift.y;a.G.Expedition.update(.01);
 assert.equal(a.G.Expedition.state.phase,'exploration');assert.equal(a.G.EnemyMgr.count,0);
});

test('P06 prueba directa prepara20s y comienza primera oleada sin saltarla',()=>{
 const a=setup(1337,'',true);assert.equal(a.G.Expedition.state.phase,'preparation');assert.equal(a.G.EnemyMgr.count,0);
 assert.equal(a.G.Expedition.state.prep,20);assert.equal(a.G.Expedition.state.totals.wavesCompleted,0);
 a.G.Expedition.ready();assert.equal(a.G.Expedition.state.wave,1);assert.equal(a.G.Expedition.state.phase,'combat');assert.equal(a.G.EnemyMgr.count,4);
});
test('neutralización, resistencia60s y segunda neutralización; salida continúa infinitamente',()=>{
 const {G,clearWave,clearSector,player}=setup();assert.equal(G.Expedition.state.kind,'normal');assert.equal(G.Expedition.state.objective,'neutralize');clearWave();G.Expedition.ready();assert.equal(G.Expedition.state.objective,'survive');
 for(let n=0;n<59;n++){for(const e of G.EnemyMgr.all()){e.dead=true;player.kills++}G.Expedition.update(1)}
 assert.equal(G.Expedition.state.phase,'combat');
 for(const e of G.EnemyMgr.all()){e.dead=true;player.kills++}G.Expedition.update(1);assert.equal(G.Expedition.state.phase,'preparation');G.Expedition.ready();assert.equal(G.Expedition.state.objective,'neutralize');clearWave();G.Expedition.ready();
 while(G.Expedition.state.phase==='combat'){clearWave();G.Expedition.ready();}
 player.x=G.Expedition.state.exit.x;G.Expedition.useExit('continue');assert.equal(G.Expedition.state.sector,2);clearSector();G.Expedition.useExit('continue');assert.equal(G.Expedition.state.sector,3);assert.equal(G.Expedition.state.result,null);
});
test('GAP-001: tamaños3/4/5 reproducibles y estables; distribución sobre900 semillas',()=>{
 const counts={3:0,4:0,5:0};
 for(let n=0;n<900;n++){
  const seed=Math.imul(n,0x9e3779b1)>>>0,a=setup(seed),b=setup(seed),size=a.G.Expedition.state.sectorWaves;
  assert.ok([3,4,5].includes(size),'Normal debe registrar3/4/5');assert.equal(size,b.G.Expedition.state.sectorWaves);
  a.G.Expedition.update(.1);assert.equal(a.G.Expedition.state.sectorWaves,size);counts[size]++;
 }
 for(const count of Object.values(counts))assert.ok(count>=240&&count<=360,JSON.stringify(counts));
});
test('GAP-001: alternancia y cierre exacto para3/4/5, preparación y salida',()=>{
 const found=new Set();
 for(let n=0;n<100&&found.size<3;n++){
  const a=setup(Math.imul(n,0x9e3779b1)>>>0),size=a.G.Expedition.state.sectorWaves;if(found.has(size))continue;
  assert.ok([3,4,5].includes(size));found.add(size);
  for(let wave=1;wave<=size;wave++){
   const before=a.G.Expedition.state;assert.equal(before.wave,wave);assert.equal(before.sectorWaves,size);
   assert.equal(before.objective,wave%2===0?'survive':'neutralize');a.clearWave();
   const closed=a.G.Expedition.state;assert.equal(closed.phase,'preparation');assert.equal(closed.prep,20);
   assert.equal(closed.totals.wavesCompleted,wave);assert.equal(closed.totals.sectorsCompleted,wave===size?1:0);
   a.player.x=closed.exit.x;a.player.y=closed.exit.y;assert.equal(a.G.Expedition.useExit('continue'),false);
   a.G.Expedition.ready();assert.equal(a.G.Expedition.state.phase,wave===size?'exploration':'combat');
  }
  a.G.Expedition.update(1);assert.equal(a.G.Expedition.state.totals.sectorsCompleted,1);
  a.G.Expedition.useExit('continue');assert.equal(a.G.Expedition.state.sector,2);
 }
 assert.equal(found.size,3);
});
test('GAP-001: calendario previo de jefe/extracción intacto; jefe sin oleadas normales',()=>{
 const a=setup(77),expectedBoss=[4,4,4,4,9,9,9,9,9,13,13,13,13,18,18,18,18,18],expectedExit=[false,false,false,false,false,false,true,false,false,false,true,false,false,false,true,false,false,false];
 for(let n=0;n<18;n++){
  const s=a.G.Expedition.state;assert.equal(s.nextBossSector,expectedBoss[n]);assert.equal(s.extractionAvailable,expectedExit[n]);
  if(s.kind==='boss'){assert.equal(s.sectorWaves,0);a.player.x=s.exit.x;a.player.y=s.exit.y;a.G.Expedition.useExit('escape');a.G.Expedition.update(2.01);}
  else{assert.ok([3,4,5].includes(s.sectorWaves));a.clearSector();a.G.Expedition.useExit('continue');}
 }
});
test('GAP-001: morir en oleada4/5 conserva tamaño y no completa sector',()=>{
 const found=new Set();
 for(let n=0;n<100&&found.size<2;n++){
  const a=setup(Math.imul(n,0x9e3779b1)>>>0),size=a.G.Expedition.state.sectorWaves;if(size<4||found.has(size))continue;
  assert.ok(size===4||size===5);found.add(size);for(let wave=1;wave<size;wave++){a.clearWave();a.G.Expedition.ready();}
  a.player.hp=0;a.G.Expedition.update(.1);assert.equal(a.G.Expedition.state.phase,'finished');assert.equal(a.G.Expedition.state.sectorWaves,size);
  assert.equal(a.G.Expedition.state.result.wave,size);assert.equal(a.G.Expedition.state.result.sectorsCompleted,0);assert.equal(a.G.Expedition.state.result.wavesCompleted,size-1);
 }
 assert.equal(found.size,2);
});
test('D214: at all caps one pending choice never blocks preparation, then injury offers healing',()=>{
 const a=setup();a.player.xpNext=1;
 a.player.gainXp=function(n){this.xp+=n;if(this.xp>=this.xpNext){this.level++;this.xp-=this.xpNext;this.xpNext=100;return 1}return 0};
 a.G.FieldUpgrades.offer=p=>p.hp<p.maxHp?[{key:'heal',apply:q=>q.hp=q.maxHp}]:[];
 a.G.Pickups.all().push({id:901,kind:'xp',value:2});a.clearWave();
 assert.equal(a.G.Expedition.state.phase,'preparation');assert.equal(a.G.Expedition.state.pending,1);
 assert.equal(a.player.level,2);assert.equal(a.G.Expedition.state.pendingXp,1);
 assert.equal(a.G.Expedition.ready(),true);assert.equal(a.G.Expedition.state.phase,'combat');
 a.G.Expedition.update(1);assert.equal(a.player.level,2);assert.equal(a.G.Expedition.state.pending,1);
 a.player.hp=70;a.G.Expedition.update(.1);assert.equal(a.G.Expedition.state.phase,'levelup');
 assert.equal(a.G.Expedition.state.cards[0].key,'heal');a.G.Expedition.choose(0);
 assert.equal(a.player.hp,100);assert.equal(a.G.Expedition.state.pending,0);assert.equal(a.G.Expedition.state.phase,'combat');
});
test('calendario reproducible, primer jefe4..6 y huida sin victoria con avance',()=>{
 const a=setup(8),b=setup(8);assert.equal(a.G.Expedition.state.nextBossSector,b.G.Expedition.state.nextBossSector);const first=a.G.Expedition.state.nextBossSector;assert.ok(first>=4&&first<=6);
 while(a.G.Expedition.state.sector<first){a.clearSector();a.G.Expedition.useExit('continue')}
 assert.equal(a.G.Expedition.state.kind,'boss');assert.equal(a.G.Expedition.state.phase,'boss');assert.equal(a.G.Expedition.state.extractionAvailable,false);
 a.player.x=a.G.Expedition.state.exit.x;a.player.y=a.G.Expedition.state.exit.y;assert.equal(a.G.Expedition.useExit('escape'),true);a.G.Expedition.update(2.01);
 assert.equal(a.G.Expedition.state.sector,first+1);assert.equal(a.G.Expedition.state.totals.bossesEvaded,1);assert.equal(a.G.Expedition.state.totals.bossesDefeated,0);assert.ok(a.G.Expedition.state.nextBossSector>=first+4&&a.G.Expedition.state.nextBossSector<=first+6);
});
test('huida cancelada por daño o movimiento no concede avance',()=>{
 const a=setup();while(a.G.Expedition.state.kind!=='boss'){a.clearSector();a.G.Expedition.useExit('continue')}
 const s=a.G.Expedition.state.sector;a.player.x=a.G.Expedition.state.exit.x;a.player.y=a.G.Expedition.state.exit.y;a.G.Expedition.useExit('escape');a.player.hp-=1;a.G.Expedition.update(.1);assert.equal(a.G.Expedition.state.phase,'boss');assert.equal(a.G.Expedition.state.sector,s);
 a.G.Expedition.useExit('escape');a.player.x+=3;a.G.Expedition.update(.1);assert.equal(a.G.Expedition.state.phase,'boss');assert.equal(a.G.Expedition.state.totals.bossesEvaded,0);
});
test('derrota del jefe:220XP, retirada sin bajas extra y premio único',()=>{
 const a=setup();while(a.G.Expedition.state.kind!=='boss'){a.clearSector();a.G.Expedition.useExit('continue')}
 const boss=a.G.EnemyMgr.all().find(e=>e.boss);a.G.Expedition.summon(boss,2);const kills=a.player.kills,xp={current:a.player.xp,next:a.player.xpNext,mul:a.player.xpMul,level:a.player.level};boss.die();a.player.kills++;a.G.Expedition.update(.1);
 assert.equal(a.G.Expedition.state.totals.bossesDefeated,1);assert.equal(a.player.kills,kills+1);assert.equal(a.G.EnemyMgr.count,0);assert.equal(a.player.xp-xp.current,220);assert.equal(a.player.xpNext,xp.next);assert.equal(a.player.xpMul,xp.mul);assert.equal(a.player.level,xp.level);a.G.Expedition.update(1);assert.equal(a.player.xp-xp.current,220);
});
test('extraer requiere punto elegible y limpio; cancela con movimiento; resultado único',()=>{
 const a=setup(77);for(let n=0;n<20&&!a.G.Expedition.state.extractionAvailable;n++){if(a.G.Expedition.state.kind==='boss'){a.player.x=a.G.Expedition.state.exit.x;a.player.y=a.G.Expedition.state.exit.y;a.G.Expedition.useExit('escape');a.G.Expedition.update(2.01)}else{a.clearSector();a.G.Expedition.useExit('continue')}}
 assert.equal(a.G.Expedition.state.extractionAvailable,true);assert.ok(a.G.Expedition.state.sector>=3);assert.equal(a.G.Expedition.useExit('extract'),false);a.clearSector();assert.equal(a.G.Expedition.useExit('extract'),true);a.player.x+=2;a.G.Expedition.update(.1);assert.equal(a.G.Expedition.state.phase,'exploration');a.player.x=a.G.Expedition.state.exit.x;a.G.Expedition.useExit('extract');a.G.Expedition.update(3.01);const r=a.G.Expedition.state.result;assert.equal(r.reason,'extracted');a.G.Expedition.finish('death');assert.equal(a.G.Expedition.state.result,r);
});
test('extracción garantizada antes de cuatro normales elegibles sin salida y velocidad acotada',()=>{
 for(const seed of [0,1,42,77,1337,65537,2147483647]){
  const a=setup(seed);let noExit=0;
  for(let n=0;n<18;n++){
   const s=a.G.Expedition.state;
   if(s.kind==='boss'){assert.equal(s.extractionAvailable,false);a.player.x=s.exit.x;a.player.y=s.exit.y;a.G.Expedition.useExit('escape');a.G.Expedition.update(2.01);continue;}
   if(s.sector<3)assert.equal(s.extractionAvailable,false);
   else{noExit=s.extractionAvailable?0:noExit+1;assert.ok(noExit<4,'Cuarto elegible debe garantizar salida');}
   for(const e of a.G.EnemyMgr.all())assert.ok(e.sc.spd<=1.2);
   a.clearSector();a.G.Expedition.useExit('continue');
  }
 }
});
