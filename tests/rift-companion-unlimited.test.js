const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
function setup(model='pistol',tier='D1'){
 const enemies=[],G={MapTrial:{expanded:true},U:{dist2:(ax,ay,bx,by)=>(ax-bx)**2+(ay-by)**2},Sprites:{Animator:class{update(){}loop(){}}},Game:{player:{}},
  RiftDialogueData:{bank:{SARC:{'03':'Llevo {arma_npc}','11':'Sin munición','08':'Echo de menos mi casa.'}},presentations:{'PRES-01':'Soy {nombre_npc}.'}},
  World:{projectileBlock:()=>null,collide(){},propsInCircle:()=>[]},FX:{burst(){},sp(){},beam(){},ring(){}},Audio:{sfx(){}},Camera:{sees:()=>true},
  EnemyMgr:{all:()=>enemies,queryCircle:()=>enemies},FieldCombat:{state:{shots:0}},LIFT:18};
 const sandbox={G,Math,Set,Map,globalThis:null};sandbox.globalThis=sandbox;vm.createContext(sandbox);
 for(const file of ['js/data/field-catalog.js','js/entities/projectile.js','js/systems/combat.js','js/systems/rift-companion.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,'..',file),'utf8'),sandbox);
 const player={x:48,y:0,r:12,hp:100,maxHp:100,fieldWeapons:[{model:'pistol'}]},values=tier==='D4'?[0,.5,{pistol:.1,smg:.5,shotgun:.9}[model]]:[0,{pistol:.1,smg:.5,shotgun:.9}[model]];let draw=0;
 const npc=G.RiftCompanion.create({tier,rng:()=>values[draw++]??0,geometry:{entry:{x:0,y:0}},player});
 const target={id:1,x:120,y:0,r:24,hp:1e9,maxHp:1e9,xp:25,boss:true,dead:false,hurt(d){this.hp-=d;if(this.hp<=0){this.dead=true;this.xpAtDeath=this.xp;}}};enemies.push(target);
 return{G,npc,player,target,enemies,tick(dt=.05){G.RiftCompanion.update(dt,player,{boss:target});G.Projectiles.update(dt,player,enemies);G.Combat.resolve(dt,player,0);}};
}
test('each random ballistic model fires through multiple magazines with unlimited reserve',()=>{
 for(const model of ['pistol','smg','shotgun']){
  const s=setup(model);assert.equal(s.npc.weapon.model,model);assert.equal(s.npc.reserveInfinite,true);
  let reloading=false;for(let i=0;i<2400;i++){s.tick();reloading ||= s.npc.reload>0;}
  assert.ok(s.npc.shots>40,model);assert.ok(s.npc.reloads>0&&reloading,model);
  assert.equal(s.npc.capacity,{pistol:12,smg:24,shotgun:6}[model]);assert.ok(s.target.hp<1e9,model);
  assert.equal(s.G.FieldCombat.state.shots,0);assert.ok(!s.npc.used.has('11'));
 }
});
test('support pellets have real spread and cannot finish a boss or award an allied regular kill as player XP',()=>{
 const s=setup('shotgun');s.npc.wait=0;s.G.RiftCompanion.update(.01,s.player,{boss:s.target});
 const shots=s.G.Projectiles.all();assert.equal(shots.length,6);assert.ok(shots.every(p=>p.allySupport&&p.fieldWeapon));assert.equal(new Set(shots.map(p=>p.vy)).size,6);
 s.target.hp=2;for(let i=0;i<40;i++)s.tick();assert.equal(s.target.hp,1);assert.equal(s.target.dead,false);
 s.target.boss=false;s.target.hp=2;for(let i=0;i<120&&!s.target.dead;i++)s.tick();assert.equal(s.target.dead,true);assert.equal(s.target._alliedKill,true);assert.equal(s.target.xpAtDeath,0);assert.equal(s.target.xp,25);
});
test('allied fire respects cover and zero time does not advance reload or shots',()=>{
 const s=setup('smg');s.G.World.projectileBlock=()=> 'wall';for(let i=0;i<100;i++)s.tick();assert.equal(s.npc.shots,0);assert.equal(s.target.hp,1e9);
 const before=JSON.stringify(s.G.RiftCompanion.state);s.G.RiftCompanion.update(0,s.player,{boss:s.target});assert.equal(JSON.stringify(s.G.RiftCompanion.state),before);
});
