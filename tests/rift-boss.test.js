const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function setup(){
 const calls=[],G={U:{norm:(x,y)=>{const d=Math.hypot(x,y)||1;return[x/d,y/d]}},
  World:{projectileBlock:()=>null,collide(){}},Path:{dirFor:()=>null},Sprites:{dirFromAngle:()=>0},
  EnemyMgr:{count:1},Expedition:{summon:(e,n)=>calls.push(n)},FX:{ring(){}}};
 vm.runInNewContext(fs.readFileSync(require.resolve('../js/systems/containment-boss.js'),'utf8'),{G,Math});
 const e={x:0,y:0,r:22,hp:810,maxHp:810,spd:45,dmg:34.5,minions:[],dimensional:true,dimensionalArrival:0,
  anim:{update(){},loop(){},play(){}}};
 const player={x:400,y:0,r:12,hits:[],hurt(n){this.hits.push(n)}};
 return{G,e,player,calls,tick:dt=>G.ContainmentBoss.tick(e,dt,player)};
}
test('llegada1.5s sin daño, movimiento ni invocaciones; luego actúa',()=>{
 const a=setup();a.e.dimensionalArrival=1.5;a.player.x=30;
 a.tick(1.49);assert.equal(a.e.x,0);assert.equal(a.e.bossWarn||0,0);assert.deepEqual(a.player.hits,[]);assert.deepEqual(a.calls,[]);
 a.tick(.01);assert.equal(a.e.dimensionalArrival,0);assert.deepEqual(a.player.hits,[]);
 a.tick(.01);assert.equal(a.e.bossWarn,.85);
});
test('pulso6s fija centro, pausa movimiento y avisa1.2s antes de dañar',()=>{
 const a=setup();a.tick(6);assert.equal(a.e.bossDimensionalWarn,1.2);assert.equal(a.e.bossDimensionalX,400);assert.equal(a.e.x,0);
 a.tick(1.19);assert.deepEqual(a.player.hits,[]);assert.equal(a.e.x,0);
 a.tick(.01);assert.deepEqual(a.player.hits,[34.5]);assert.equal(a.e.bossDimensionalWarn,0);
 a.tick(.01);assert.equal(a.player.hits.length,1);
});
test('se esquiva al salir de la zona fijada y no atraviesa paredes',()=>{
 const a=setup();a.tick(6);a.player.x=500;a.tick(1.2);assert.deepEqual(a.player.hits,[]);assert.equal(a.e.bossDimensionalX,400);
 const b=setup();b.tick(6);b.G.World.projectileBlock=()=>true;b.tick(1.2);assert.deepEqual(b.player.hits,[]);
});
test('pulso pendiente no detiene un aviso previo ni golpea después de morir',()=>{
 const a=setup();a.e.bossWarn=.5;a.e.bossStrikeX=0;a.e.bossStrikeY=0;
 a.tick(6);assert.equal(a.e.bossDimensionalWarn||0,0);assert.equal(a.e.bossWarn,0);
 a.tick(.01);assert.equal(a.e.bossDimensionalWarn,1.2);a.e.dead=true;a.e.fade=.9;a.tick(2);
 assert.deepEqual(a.player.hits,[]);assert.equal(a.e.bossDimensionalWarn,1.2);
});

test('pared entre centro del pulso y jugador protege aunque la línea desde jefe esté libre',()=>{
 const a=setup();a.e.x=460;a.tick(6);assert.equal(a.e.bossDimensionalX,400);
 a.player.x=450;a.G.World.projectileBlock=x=>Math.abs(x-425)<4;
 a.tick(1.2);assert.deepEqual(a.player.hits,[]);
});
