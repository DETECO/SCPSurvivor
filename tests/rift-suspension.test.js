const {test}=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),path=require('node:path');
test('live projectiles and pickups retain objects, Sets, IDs and timers across a separate room',()=>{
 const G={Coop:{active:false,isHost:false},U:{rand:(a,b)=>(a+b)/2}};const ctx=vm.createContext({G,Set,Map,Math});
 for(const f of ['entities/projectile.js','entities/pickup.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,'../js',f),'utf8'),ctx);
 const p=G.Projectiles.spawn({t:3,life:8}),item=G.Pickups.drop('xp',10,20,3),before=G.Pickups.all()[0];
 const shots=G.Projectiles.all(),drops=G.Pickups.all();const a=G.Projectiles.suspend(),b=G.Pickups.suspend();
 G.Projectiles.spawn({t:12});G.Pickups.drop('xp',30,40,4);G.Projectiles.clear();G.Pickups.clear();
 G.Projectiles.resume(a);G.Pickups.resume(b);
 assert.equal(G.Projectiles.all(),shots);assert.equal(shots[0],p);assert.equal(p.t,3);assert.ok(p.phits instanceof Set);
 assert.equal(G.Pickups.all(),drops);assert.equal(drops[0],before);
});
