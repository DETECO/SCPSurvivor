const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
function setup(){
 const G={MapTrial:{enabled:true}};
 for(const name of ['DB','Account','Inventory'])Object.defineProperty(G,name,{get(){throw Error('account accessed');}});
 const context={G,Math:Object.assign(Object.create(Math),{random(){throw Error('global RNG accessed');}}),localStorage:new Proxy({},{get(){throw Error('storage accessed');}}),fetch(){throw Error('network accessed');}};
 for(const file of ['data/field-catalog.js','systems/field-stats.js','systems/field-combat.js','systems/field-upgrades.js','systems/event-rewards.js']){
  const filename=path.join(__dirname,'../js',file);if(fs.existsSync(filename))vm.runInNewContext(fs.readFileSync(filename,'utf8'),context);
 }
 assert.ok(G.EventRewards,'exposes event reward API');
 const p={hp:40,maxHp:100,t1:77};G.FieldCombat.reset(p);const R=G.EventRewards;R.startRun();return{G,R,p};
}
const offer=(R,p,options={})=>R.offer({id:'event:1',kind:'boss',seed:77,player:p,...options});
test('fixed offer selects an equipped copy, upgrades once and never changes permanent data',()=>{
 const {G,R,p}=setup();const plan=offer(R,p);assert.ok(p.fieldWeapons.some(w=>w.id===plan.weaponId));assert.equal(plan.tickets,0);
 plan.weaponId='tamper';plan.tickets=100;const fixed=offer(R,p,{seed:999,kind:'rift'});assert.notEqual(fixed.weaponId,'tamper');assert.equal(fixed.kind,'boss');assert.equal(fixed.tickets,0);
 const result=R.claim(fixed.id,p);assert.equal(result.ok,true);assert.equal(result.outcome,'upgraded');assert.equal(p.fieldWeapons.find(w=>w.id===fixed.weaponId).level,2);
 assert.equal(p.fieldWeapons.filter(w=>w.level===1).length,1);assert.equal(R.claim(fixed.id,p).ok,false);assert.equal(R.state.receipts.length,1);assert.equal(p.t1,77);assert.equal(p.hp,40);assert.equal(R.state.ticketTotal,0);
});
test('same model copies are distinct and inactive eligible weapon receives the upgrade',()=>{
 const {G,R,p}=setup();G.FieldCombat.reset(p,[{id:'first',model:'pistol',mods:[],level:5},{id:'second',model:'pistol',mods:[],level:4}]);
 const plan=offer(R,p);assert.equal(plan.weaponId,'second');assert.equal(R.claim(plan.id,p).ok,true);assert.equal(p.fieldWeapons[0].level,5);assert.equal(p.fieldWeapons[1].level,5);
});
test('saturation grants no healing or substitution, including saturation after offer',()=>{
 const {R,p}=setup();p.fieldWeapons.forEach(w=>w.level=5);const plan=offer(R,p);assert.equal(plan.weaponId,null);assert.equal(R.claim(plan.id,p).outcome,'no-upgrade');assert.equal(p.hp,40);
 R.startRun();p.fieldWeapons[0].level=4;const next=offer(R,p);p.fieldWeapons[0].level=5;assert.equal(R.claim(next.id,p).outcome,'no-upgrade');assert.equal(p.fieldWeapons[1].level,5);assert.equal(p.hp,40);
});
test('rift seeded table is fixed and independent from candidate count, credits fictional tickets once',()=>{
 const counts={2:0,3:0};
 for(let seed=0;seed<128;seed++){
  const a=setup(),b=setup();b.p.fieldWeapons.forEach(w=>w.level=5);
  const plan=offer(a.R,a.p,{kind:'rift',seed}),empty=offer(b.R,b.p,{kind:'rift',seed});assert.ok(plan.tickets===2||plan.tickets===3);counts[plan.tickets]++;
  assert.equal(plan.tickets,empty.tickets);assert.match(plan.description,/ficticios/i);assert.equal(a.R.claim(plan.id,a.p).tickets,plan.tickets);assert.equal(a.R.state.ticketTotal,plan.tickets);
  assert.equal(a.R.claim(plan.id,a.p).ok,false);assert.equal(a.R.state.ticketTotal,plan.tickets);assert.equal(b.R.claim(empty.id,b.p).outcome,'no-upgrade');assert.equal(b.R.state.ticketTotal,empty.tickets);assert.equal(a.p.t1,77);
 }
 assert.ok(counts[2]>40&&counts[3]>40);
});
test('invalid and desynchronized loadouts reject before upgrade or fictional tickets',()=>{
 for(const mutate of [p=>p.fieldWeapons[0].id='',p=>p.fieldWeapons[1].id=p.fieldWeapons[0].id,p=>p.fieldWeapons[0].model='unknown',p=>p.fieldWeapons[0].mods=['missing'],p=>p.fieldWeapons=p.fieldWeapons.map(w=>({...w})),p=>p.fieldWeapons[0].level=NaN]){
  const {R,p}=setup();const plan=offer(R,p,{kind:'rift'});mutate(p);const before=JSON.stringify(p);const result=R.claim(plan.id,p);
  assert.equal(result.ok,false);assert.equal(result.outcome,'blocked');assert.equal(R.state.ticketTotal,0);assert.equal(JSON.stringify(p),before);assert.equal(R.state.receipts.length,0);
 }
});
test('model changes under the same copy ID are incompatible and never rerolled',()=>{
 const {R,p}=setup();const plan=offer(R,p,{kind:'rift'});p.fieldWeapons.find(w=>w.id===plan.weaponId).model='shotgun';assert.equal(R.claim(plan.id,p).outcome,'blocked');assert.equal(R.state.ticketTotal,0);
});
test('upgrade rejection cannot credit tickets or create a receipt',()=>{
 const {G,R,p}=setup();const plan=offer(R,p,{kind:'rift'});G.FieldCombat.upgrade=()=>false;assert.equal(R.claim(plan.id,p).outcome,'blocked');assert.equal(R.state.ticketTotal,0);assert.equal(R.state.receipts.length,0);
});
test('safe state copies and startRun reset event identities and fictional totals',()=>{
 const {R,p}=setup();const plan=offer(R,p,{kind:'rift'});R.claim(plan.id,p);const s=R.state;s.receipts[0].tickets=999;s.receipts.length=0;s.ticketTotal=999;assert.equal(R.state.receipts.length,1);assert.notEqual(R.state.ticketTotal,999);
 R.startRun();assert.equal(R.state.ticketTotal,0);assert.equal(R.state.receipts.length,0);assert.equal(R.state.lastNotice,'');assert.equal(R.claim(plan.id,p).outcome,'blocked');assert.ok(offer(R,p));
});
test('disabled trial cannot plan, claim or alter a pending event',()=>{
 const {G,R,p}=setup();const plan=offer(R,p,{kind:'rift'});G.MapTrial.enabled=false;assert.equal(offer(R,p,{id:'other'}),null);assert.equal(R.claim(plan.id,p).ok,false);assert.equal(R.state.ticketTotal,0);assert.ok(p.fieldWeapons.every(w=>w.level===1));G.MapTrial.enabled=true;assert.equal(R.claim(plan.id,p).ok,true);
});
test('invalid event input and offer-time incompatibility cannot become a valid award',()=>{
 const {R,p}=setup();for(const options of [{id:''},{kind:'other'},{seed:Infinity},{player:null}])assert.equal(offer(R,p,options),null);
 p.fieldWeapons[0].mods=['unknown'];assert.equal(offer(R,p),null);p.fieldWeapons[0].mods=[];assert.ok(offer(R,p));
});
test('prototype property names cannot impersonate valid weapon catalog models',()=>{
 const {R,p}=setup();p.fieldWeapons[0].model='__proto__';assert.equal(offer(R,p),null);
});
