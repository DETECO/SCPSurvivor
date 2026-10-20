const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const file=path.join(__dirname,'../js/systems/exploration-chests.js');
const geometry={entry:{x:0,y:0},chestCandidates:Array.from({length:6},(_,id)=>({id:'c'+id,x:100+id*200,y:0}))};
function setup(options={}){
 const G={MapTrial:{enabled:true},Game:{state:'playing'},Camera:{sees:()=>false},World:{projectileBlock:()=>false}};
 for(const name of ['DB','Account','Inventory'])Object.defineProperty(G,name,{get(){throw Error('account accessed');}});
 if(fs.existsSync(file))vm.runInNewContext(fs.readFileSync(file,'utf8'),{G,Math:Object.assign(Object.create(Math),{random(){throw Error('global RNG accessed');}}),localStorage:new Proxy({},{get(){throw Error('storage accessed');}}),fetch(){throw Error('network accessed');}});
 assert.ok(G.ExplorationChests,'exposes the exploration chest API');
 const C=G.ExplorationChests;C.startRun();C.reset(geometry,{sector:1,seed:123,...options});
 const p={x:-500,y:0,hp:100,t1:55};return{G,C,p};
}
test('all four time boundaries process once, including jumps and rewinds',()=>{
 const {C,p}=setup({sector:8,rng:()=>0});
 C.tick(.1,59.9,p);assert.equal(C.state.attempts,0);
 C.tick(.1,60,p);assert.equal(C.state.attempts,1);
 C.tick(.1,60,p);C.tick(.1,30,p);assert.equal(C.state.attempts,1);
 C.tick(.1,999,p);assert.equal(C.state.attempts,4);assert.equal(C.state.spawned,3);
 C.tick(.1,1000,p);assert.equal(C.state.attempts,4);
});
test('sector chance, caps and fixed ticket limits match the contract',()=>{
 for(const [sector,chance,cap,max] of [[1,.10,1,2],[3,.10,1,2],[4,.15,2,2],[7,.15,2,2],[8,.20,3,3],[50,.20,3,3]]){
  const {C,p}=setup({sector,rng:()=>0});C.tick(.1,240,p);
  assert.equal(C.state.chance,chance);assert.equal(C.state.cap,cap);assert.equal(C.state.spawned,cap);
  assert.equal(new Set(C.state.chests.map(c=>c.id)).size,cap);
  for(const chest of C.state.chests)assert.ok(chest.tickets>=1&&chest.tickets<=max);
  const failed=setup({sector,rng:()=>chance});failed.C.tick(.1,240,failed.p);assert.equal(failed.C.state.spawned,0);
 }
});
test('quickstart skips historical attempts without RNG or retroactive chests',()=>{
 const {C,p}=setup({startTime:270,rng:()=>{throw Error('retroactive roll');}});
 assert.equal(C.state.attempts,4);C.tick(.1,300,p);assert.equal(C.state.spawned,0);
});
test('practice uses nearest entry candidate, consumes cap and says it is practice',()=>{
 const {C,p}=setup({forcePreview:true,rng:()=>0});
 assert.equal(C.state.spawned,1);assert.equal(C.state.practice,true);assert.equal(C.state.chests[0].id,'1:123:c0');
 assert.equal(C.state.chests[0].practice,true);assert.match(C.state.notice,/práctica/i);
 C.tick(.1,240,p);assert.equal(C.state.spawned,1);assert.equal(C.state.attempts,4);
});
test('only Camera.sees discovers; discovery persists after leaving the view',()=>{
 const {C,G,p}=setup({forcePreview:true});C.tick(.1,1,p);assert.equal(C.state.chests[0].discovered,false);
 G.Camera.sees=(x,y,pad)=>{assert.equal(pad,0);return true;};C.tick(.1,2,p);assert.equal(C.state.chests[0].discovered,true);
 G.Camera.sees=()=>false;C.tick(.1,3,p);assert.equal(C.state.chests[0].discovered,true);
});
test('opening needs 3.5 seconds within inclusive 50 radius and awards once',()=>{
 const {C,G,p}=setup({forcePreview:true,rng:()=>0});G.Camera.sees=()=>true;p.x=150;
 C.tick(3.4,3.4,p);assert.equal(C.state.ticketTotal,0);assert.equal(C.state.chests[0].progress,3.4);
 C.tick(.1,3.5,p);assert.equal(C.state.chests[0].opened,true);const total=C.state.ticketTotal;
 assert.equal(total,C.state.chests[0].tickets);for(let n=0;n<10;n++)C.tick(1,5+n,p);
 assert.equal(C.state.ticketTotal,total);assert.equal(p.t1,55);C.tick(1,240,p);assert.equal(C.state.spawned,1);
});
test('out of range or occlusion decays progress by 1.5 seconds per second',()=>{
 const {C,G,p}=setup({forcePreview:true});p.x=100;G.Camera.sees=()=>true;
 C.tick(2,2,p);p.x=151;C.tick(.5,2.5,p);assert.equal(C.state.chests[0].progress,1.25);
 p.x=60;let samples=0;G.World.projectileBlock=(x,y,r)=>{samples++;assert.equal(r,2);return x>=75&&x<=85;};
 C.tick(.5,3,p);assert.ok(samples>0);assert.equal(C.state.chests[0].progress,.5);
 C.tick(2,5,p);assert.equal(C.state.chests[0].progress,0);
});
test('LOS samples endpoints even with zero distance and missing terrain fails closed',()=>{
 const {C,G,p}=setup({forcePreview:true});p.x=100;G.Camera.sees=()=>true;G.World.projectileBlock=()=>true;
 C.tick(4,4,p);assert.equal(C.state.chests[0].progress,0);
 delete G.World.projectileBlock;C.tick(4,8,p);assert.equal(C.state.chests[0].progress,0);
});
test('damage does not cancel progress and module never changes firing or account fields',()=>{
 const {C,G,p}=setup({forcePreview:true});p.x=100;p.firing=true;G.Camera.sees=()=>true;
 C.tick(2,2,p);p.hp=1;C.tick(1.5,3.5,p);assert.equal(C.state.chests[0].opened,true);assert.equal(p.firing,true);assert.equal(p.t1,55);
});
test('pause, no player, death and disabled trial freeze attempts and opening',()=>{
 const {C,G,p}=setup({forcePreview:true,sector:8,rng:()=>0});p.x=100;G.Camera.sees=()=>true;C.tick(1,1,p);
 G.Game.state='paused';C.tick(100,240,p);G.Game.state='playing';C.tick(100,240,null);
 p.dead=true;C.tick(100,240,p);p.dead=false;p.hp=0;C.tick(100,240,p);p.hp=100;
 G.MapTrial.enabled=false;C.tick(100,240,p);assert.equal(C.state.chests[0].progress,1);assert.equal(C.state.attempts,0);
 G.MapTrial.enabled=true;C.tick(1,2,p);assert.equal(C.state.chests[0].progress,2);
});
test('reset preserves fictional run total, startRun clears it and snapshots are safe',()=>{
 const {C,G,p}=setup({forcePreview:true});p.x=100;G.Camera.sees=()=>true;C.tick(3.5,3.5,p);const total=C.state.ticketTotal;
 const snapshot=C.state;snapshot.chests[0].tickets=999;snapshot.chests.length=0;assert.equal(C.state.chests.length,1);
 C.reset(geometry,{sector:4,seed:5});assert.equal(C.state.ticketTotal,total);assert.equal(C.state.spawned,0);assert.equal(C.state.attempts,0);
 C.startRun();assert.equal(C.state.ticketTotal,0);assert.equal(C.state.chests.length,0);
});
test('equal seeds generate equal spawn and ticket results independently of global RNG',()=>{
 const a=setup({sector:8,seed:173}),b=setup({sector:8,seed:173});a.C.tick(.1,240,a.p);b.C.tick(.1,240,b.p);
 assert.equal(JSON.stringify(a.C.state),JSON.stringify(b.C.state));
});
test('chest ids distinguish sector and map seed',()=>{
 const {C}=setup({forcePreview:true});const first=C.state.chests[0].id;
 C.reset(geometry,{sector:2,seed:123,forcePreview:true});const second=C.state.chests[0].id;
 C.reset(geometry,{sector:1,seed:124,forcePreview:true});assert.notEqual(first,second);assert.notEqual(first,C.state.chests[0].id);
});
test('disabled mode and empty geometry do not create even practice rewards',()=>{
 const {C,G,p}=setup();G.MapTrial.enabled=false;C.reset(geometry,{sector:8,seed:1,forcePreview:true,rng:()=>0});C.tick(5,240,p);assert.equal(C.state.spawned,0);
 G.MapTrial.enabled=true;C.reset({entry:{x:0,y:0},chestCandidates:[]},{sector:8,seed:1,forcePreview:true,rng:()=>0});C.tick(5,240,p);assert.equal(C.state.spawned,0);
});
test('invalid dt and times cannot corrupt progress or repeat lottery attempts',()=>{
 const {C,p}=setup({forcePreview:true});for(const dt of [0,-1,NaN,Infinity])C.tick(dt,240,p);
 assert.equal(C.state.attempts,0);assert.equal(C.state.chests[0].progress,0);
 C.tick(1,NaN,p);C.tick(1,Infinity,p);assert.equal(C.state.attempts,0);
});
test('draw uses temporary canvas artwork and respects visibility and disabled mode',()=>{
 const {C,G,p}=setup({forcePreview:true});let calls=0;
 const ctx=new Proxy({},{get:(_,key)=>()=>{calls++;},set:()=>true});
 C.draw(ctx);assert.equal(calls,0);G.Camera.sees=()=>true;C.tick(1,1,p);C.draw(ctx);assert.ok(calls>0);
 G.MapTrial.enabled=false;const previous=calls;C.draw(ctx);assert.equal(calls,previous);
});

test('event chests have their own quota, fixed reward and one claim after proximity opening',()=>{
 const {C,G,p}=setup({forcePreview:true,rng:()=>0});let calls=0,total=0;
 G.EventRewards={claim(id,player){assert.equal(id,'boss:1');assert.equal(player,p);calls++;total+=2;return{ok:true,description:'Mejora de prueba aplicada'};},get state(){return{ticketTotal:total}}};
 assert.equal(C.addReward({id:'boss:1',kind:'boss',tickets:0,description:'Mejora para arma'},{x:300,y:0}),true);
 assert.equal(C.addReward({id:'boss:1',kind:'boss'},{x:300,y:0}),false);
 assert.equal(C.state.spawned,1);assert.equal(C.state.chests.length,2);
 G.Camera.sees=()=>true;p.x=300;C.tick(3.4,3.4,p);assert.equal(calls,0);
 C.tick(.1,3.5,p);assert.equal(calls,1);assert.equal(C.state.ticketTotal,2);
 C.tick(5,10,p);assert.equal(calls,1);assert.equal(C.state.chests.find(c=>c.rewardId==='boss:1').opened,true);
 C.reset(geometry,{sector:2});assert.equal(C.state.chests.length,0);assert.equal(C.state.ticketTotal,2);
});

test('invalid or blocked event reward cannot fabricate tickets or repeatedly call a failed grant',()=>{
 const {C,G,p}=setup();let calls=0;
 G.EventRewards={claim(){calls++;return{ok:false,description:'Premio bloqueado por equipo incompatible'};},state:{ticketTotal:0}};
 assert.equal(C.addReward({id:'bad',kind:'other'},{x:100,y:0}),false);
 assert.equal(C.addReward({id:'bad',kind:'rift'},{x:NaN,y:0}),false);
 assert.equal(C.addReward({id:'bad',kind:'rift',tickets:3},{x:100,y:0}),true);
 G.Camera.sees=()=>true;p.x=100;C.tick(4,4,p);C.tick(4,8,p);
 assert.equal(calls,1);assert.equal(C.state.ticketTotal,0);assert.match(C.state.notice,/bloqueado/);
});
