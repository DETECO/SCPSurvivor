const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
function setup(seed=1337){
 let list=[],items=[],id=0;
 const G={U:{dist:(a,b,x,y)=>Math.hypot(x-a,y-b),rand:()=>0},Camera:{w:768,h:768,x:0,y:0,sees:()=>false,follow(){}},
 World:{reset(){},setFixture(){},setBiome(){},isFree:()=>true,update(){}},Path:{clear(){},update(){},reachable:()=>true},
 SectorMaps:{generate:s=>({seed:s,fixture:{},entry:{x:0,y:0},exit:{x:32,y:0},bossSpawn:{x:256,y:0},spawnPoints:Array.from({length:100},(_,i)=>({x:450+i,y:0}))})},
 Content:{sectors:[{},{}],pursuer:{hp:30,dex:'pursuer01'},biological:{hp:24,dex:'biological01'},boss:{hp:600,dex:'warden01',xp:220}},
 Enemy:class{constructor(def,x,y,sc,boss=false){Object.assign(this,{id:++id,def,x,y,sc,boss,hp:def.hp*sc.hp,dead:false,minions:[]});}die(){if(this.dead)return;this.dead=true;items.push({kind:'xp',value:this.def.xp||14,id:this.id});}},
 EnemyMgr:{clear(){list=[]},add(e){list.push(e);return e},get(id){return list.find(e=>e.id===id)},all:()=>list,get count(){return list.length},update(){list=list.filter(e=>!e.dead)}},
 Projectiles:{clear(){},update(){}},Pickups:{clear(){items=[]},all:()=>items,removeId(id){items=items.filter(i=>i.id!==id)},update(){}},
 Input:{reset(){},axis:()=>[0,0]},Touch:{reset(){}},FieldCombat:{reset(){},tick(){}},FX:{update(){}},Spawner:{CAP:64,say(){},tickBanner(){}},Combat:{resolve(){}},FieldUpgrades:{offer:()=>[{key:'health',apply:p=>p.perks++}]} };
 const player={hp:100,maxHp:100,kills:0,bosses:0,r:12,regenFlat:0,perks:0,x:0,y:0,xp:0,level:1,update(){},gainXp(n){this.xp+=n;return 0}};
 vm.runInNewContext(fs.readFileSync(require.resolve('../js/systems/expedition.js'),'utf8'),{G,Math});G.Expedition.start(player,{seed});
 function clearWave(){for(let step=0;step<500;step++){for(const e of G.EnemyMgr.all()){if(!e.dead){e.dead=true;player.kills++;}}G.Expedition.update(1);if(G.Expedition.state.phase==='preparation')return;}throw Error('wave stuck')}
 function clearSector(){for(let n=0;n<3;n++){clearWave();G.Expedition.ready()}player.x=G.Expedition.state.exit.x;player.y=G.Expedition.state.exit.y;}
 return {G,player,clearWave,clearSector};
}
test('neutralización, resistencia60s y segunda neutralización; salida continúa infinitamente',()=>{
 const {G,clearWave,clearSector,player}=setup();assert.equal(G.Expedition.state.kind,'normal');assert.equal(G.Expedition.state.objective,'neutralize');clearWave();G.Expedition.ready();assert.equal(G.Expedition.state.objective,'survive');
 for(let n=0;n<59;n++){for(const e of G.EnemyMgr.all()){e.dead=true;player.kills++}G.Expedition.update(1)}
 assert.equal(G.Expedition.state.phase,'combat');
 for(const e of G.EnemyMgr.all()){e.dead=true;player.kills++}G.Expedition.update(1);assert.equal(G.Expedition.state.phase,'preparation');G.Expedition.ready();assert.equal(G.Expedition.state.objective,'neutralize');clearWave();G.Expedition.ready();
 player.x=G.Expedition.state.exit.x;G.Expedition.useExit('continue');assert.equal(G.Expedition.state.sector,2);clearSector();G.Expedition.useExit('continue');assert.equal(G.Expedition.state.sector,3);assert.equal(G.Expedition.state.result,null);
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
 const boss=a.G.EnemyMgr.all().find(e=>e.boss);a.G.Expedition.summon(boss,2);const kills=a.player.kills,xp=a.player.xp;boss.die();a.player.kills++;a.G.Expedition.update(.1);
 assert.equal(a.G.Expedition.state.totals.bossesDefeated,1);assert.equal(a.player.kills,kills+1);assert.equal(a.G.EnemyMgr.count,0);assert.equal(a.player.xp-xp,220);a.G.Expedition.update(1);assert.equal(a.player.xp-xp,220);
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
