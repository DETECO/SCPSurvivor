const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
function setup(){
 const copies=[{id:'first',model:'pistol',mods:[],branches:{power:0,rhythm:0,handling:0,specialization:0}}];
 const p={fieldWeapons:copies,hp:100};let held=0,resumed=0;
 const G={MapTrial:{infinite:true},FieldCatalog:{models:{pistol:{name:'Pistola'},smg:{name:'Subfusil'},shotgun:{name:'Escopeta'}}},
  InfiniteProgression:{ensure:c=>!!c.branches,upgrade(c,b){if(c.branches[b]>=6)return false;c.branches[b]++;return true},grantTactical(p){p.infiniteTactical={type:'power',remaining:15};return true}},
  FieldCombat:{getweapons:()=>copies,acquire(model,id){if(copies.length>=2)return false;copies.push({id,model,mods:[],branches:{power:0,rhythm:0,handling:0,specialization:0}});return true},upgrade(id,b){const c=copies.find(c=>c.id===id);return !!c&&G.InfiniteProgression.upgrade(c,b)}},
  Expedition:{awaitArmament(){held++},resolveArmament(){resumed++}}};
 const file=require.resolve('../js/systems/armament-rewards.js');if(fs.existsSync(file))vm.runInNewContext(fs.readFileSync(file,'utf8'),{G,Math,Map,Set});
 return{G,p,copies,get held(){return held},get resumed(){return resumed}};
}
test('armament first opens a frozen choice; exactly one second weapon, never a permanent grant',()=>{
 const s=setup(),{G,p,copies}=s,R=G.ArmamentRewards;R.startRun();const plan=R.offer({id:'boss1',kind:'boss',seed:42,player:p});
 assert.equal(R.claim(plan.id,p).outcome,'choice');assert.equal(copies.length,1);assert.equal(s.held,1);
 assert.equal(R.state.pending.models.length,3);assert.equal(R.choose('unknown'),false);assert.equal(R.choose('pistol'),true);
 assert.equal(copies.length,2);assert.notEqual(copies[0].id,copies[1].id);assert.equal(s.resumed,1);
 assert.equal(R.choose('smg'),false);assert.equal(R.claim(plan.id,p).ok,false);assert.equal(R.state.receipts.length,1);assert.equal(p.t1,undefined);
});
test('two weapons yield one branch upgrade; saturation is tactical, not currency',()=>{
 const {G,p,copies}=setup(),R=G.ArmamentRewards;G.FieldCombat.acquire('smg','second');
 const plan=R.offer({id:'elite',kind:'elite',seed:1,player:p});assert.equal(R.claim(plan.id,p).outcome,'upgraded');
 assert.equal(copies.flatMap(c=>Object.values(c.branches)).reduce((a,b)=>a+b),1);assert.equal(copies.length,2);
 for(const c of copies)for(const b in c.branches)c.branches[b]=6;
 R.offer({id:'max',kind:'boss',seed:3,player:p});assert.equal(R.claim('max',p).outcome,'tactical');assert.equal(p.infiniteTactical.remaining,15);
});
test('claim revalidates filled slot and incompatible copy; no lost or duplicated choice',()=>{
 const {G,p,copies}=setup(),R=G.ArmamentRewards;R.offer({id:'a',kind:'boss',seed:1,player:p});R.claim('a',p);
 G.FieldCombat.acquire('smg','another');assert.equal(R.choose('shotgun'),true);assert.equal(copies.length,2);assert.equal(R.state.receipts[0].outcome,'upgraded');
 R.offer({id:'b',kind:'boss',seed:2,player:p});copies[1].id=copies[0].id;assert.equal(R.claim('b',p).ok,false);
 assert.equal(R.state.receipts.length,1);
});
test('disabled and dead players cannot obtain rewards; snapshots do not mutate pending options',()=>{
 const {G,p}=setup(),R=G.ArmamentRewards;R.offer({id:'x',kind:'boss',seed:1,player:p});R.claim('x',p);
 R.state.pending.models.length=0;assert.equal(R.state.pending.models.length,3);p.hp=0;assert.equal(R.choose('pistol'),false);
 G.MapTrial.infinite=false;assert.equal(R.offer({id:'z',kind:'boss',seed:1,player:p}),null);assert.equal(R.claim('x',p).ok,false);
});
test('expanded armament offers three stable choices including melee, legacy keeps ballistics',()=>{
 const{G,p}=setup();G.MapTrial.expanded=true;G.FieldCatalog.models.baton={name:'Porra de ensayo'};
 const R=G.ArmamentRewards;R.offer({id:'bc',kind:'boss',seed:42,player:p});R.claim('bc',p);
 assert.equal(R.state.pending.models.length,3);assert.ok(R.state.pending.models.includes('baton'));assert.ok(R.state.pending.models.includes('pistol'));
 assert.equal(R.choose('baton'),true);assert.equal(p.fieldWeapons[1].model,'baton');
});
