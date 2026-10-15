'use strict';
const assert = require('node:assert/strict');
const test = require('node:test');
let service = {};
try { service = require('../functions/account-service.js'); } catch (error) {
  if (error.code !== 'MODULE_NOT_FOUND') throw error;
}
test('P05 exports a local-only account command service', () => {
  assert.equal(typeof service.executeCommand, 'function');
  assert.equal(typeof service.assertLocalEmulators, 'function');
});
test('P05 fails closed outside demo emulators', () => {
  assert.equal(typeof service.assertLocalEmulators, 'function');
  assert.throws(() => service.assertLocalEmulators({}), /emuladores/i);
  assert.throws(() => service.assertLocalEmulators({FUNCTIONS_EMULATOR:'true',GCLOUD_PROJECT:'real-project',FIRESTORE_EMULATOR_HOST:'127.0.0.1:8080',FIREBASE_AUTH_EMULATOR_HOST:'127.0.0.1:9099'}), /emuladores/i);
});
test('P05 stable command hashes ignore object key order but preserve content', () => {
  assert.equal(typeof service.commandHash, 'function');
  assert.equal(service.commandHash({a:1,b:{c:2}}),service.commandHash({b:{c:2},a:1}));
  assert.notEqual(service.commandHash({a:1}),service.commandHash({a:2}));
});

function checkpoint(){return{schemaVersion:1,buildVersion:'0.5-local-01',boundary:'preparation',
 expedition:{phase:'preparation',sector:1,wave:1,sectorWaves:3,kind:'normal',objective:'neutralize',runSeed:1337,mapSeed:1,
  elapsed:30,prep:20,pending:0,cards:[],pendingXp:0,resumePhase:'combat',spawned:12,quota:12,spawnClock:.3,waveKills:0,waveTime:30,
  interaction:0,startX:0,startY:0,startHp:0,startDamage:0,nextBossSector:4,drought:0,extractionAvailable:false,upgradesApplied:0,
  totals:{wavesCompleted:1,sectorsCompleted:0,bossesDefeated:0,bossesEvaded:0},rngState:1,spawnRngState:1},
 player:{soldierId:'guard',x:16,y:16,hp:100,maxHp:100,baseMaxHp:100,level:1,xp:0,xpNext:62,kills:12,training:{},tempStats:{}},
 combat:{weapons:[{id:'a',model:'pistol',mods:[],level:1,ammo:12,reload:0,reloadTime:1.5},{id:'b',model:'smg',mods:[],level:1,ammo:24,reload:0,reloadTime:1.8}],activeIndex:0,shotWait:0,switchRemaining:0,shots:0},
 ability:{kind:'sprint',remaining:0,cooldown:0,duration:2},world:{broken:[],damaged:[]},pickups:[]};}
const localEnv={FUNCTIONS_EMULATOR:'true',GCLOUD_PROJECT:'demo-scp-survivor',FIRESTORE_EMULATOR_HOST:'127.0.0.1:8080',FIREBASE_AUTH_EMULATOR_HOST:'127.0.0.1:9099'};
function database(stored){
 const writes=[];
 const ref=path=>({path,collection:name=>({doc:id=>ref(path+'/'+name+'/'+id)})});
 return{writes,collection:name=>({doc:id=>ref(name+'/'+id)}),
  async runTransaction(fn){return fn({get:async r=>r.path.includes('/receipts/')?{exists:false}:{exists:true,data:()=>structuredClone(stored)},
   set:(r,data)=>writes.push({path:r.path,data})});}};
}
async function rejectsWithoutWrites(saved){
 for(const type of ['startRun','saveCheckpoint']){
  const db=database({revision:1,profile:{alias:'Prueba'},activeRun:type==='saveCheckpoint'?{id:'run-1234',sessionId:'session-1234'}:null});
  const request={type,requestId:'command-1234',expectedRevision:1,sessionId:'session-1234',payload:{checkpoint:saved}};
  if(type==='saveCheckpoint')request.runId='run-1234';
  await assert.rejects(service.executeCommand(db,{uid:'test-uid',token:{email_verified:true}},request,localEnv),error=>error.code==='invalid-argument');
  assert.equal(db.writes.length,0,'invalid checkpoint must not write state or receipt');
 }
}

test('P05 rejects every missing expedition field before transaction writes',async()=>{
 for(const field of Object.keys(checkpoint().expedition)){
  const saved=checkpoint();delete saved.expedition[field];await rejectsWithoutWrites(saved);
 }
});

test('P05 rejects inconsistent checkpoint phase, totals and calendar before writes',async()=>{
 const changes=[e=>{e.totals.wavesCompleted=NaN},e=>{delete e.totals.bossesEvaded},e=>{e.nextBossSector=1},
  e=>{e.objective='boss'},e=>{e.quota=0},e=>{e.phase='combat';e.waveTime=1;e.spawned=0},
  e=>{e.phase='levelup';e.resumePhase='preparation';e.pending=0;e.cards=['health']},e=>{e.extractionAvailable='yes'}];
 for(const change of changes){const saved=checkpoint();change(saved.expedition);await rejectsWithoutWrites(saved);}
});

test('P05 complete checkpoint writes state and receipt once',async()=>{
 const db=database({revision:1,profile:{alias:'Prueba'},activeRun:null});
 const saved=checkpoint();
 const result=await service.executeCommand(db,{uid:'test-uid',token:{email_verified:true}},
  {type:'startRun',requestId:'command-1234',expectedRevision:1,sessionId:'session-1234',payload:{checkpoint:saved}},localEnv);
 assert.equal(result.revision,2);assert.deepEqual(result.activeRun.checkpoint,saved);assert.equal(db.writes.length,2);
});

test('P05 rejects incomplete restore blocks and incompatible equipment before writes',async()=>{
 const changes=[saved=>{delete saved.player.maxHp},saved=>{delete saved.player.xpNext},saved=>{saved.player.extra='invalid'},
  saved=>{delete saved.combat.shotWait},saved=>{delete saved.combat.weapons[0].level},saved=>{delete saved.combat.weapons[0].reloadTime},
  saved=>{saved.combat.weapons[0].mods=['unknown']},saved=>{delete saved.ability},saved=>{saved.ability.kind='heal'},
  saved=>{delete saved.world},saved=>{delete saved.world.broken},saved=>{delete saved.pickups}];
 for(const change of changes){const saved=checkpoint();change(saved);await rejectsWithoutWrites(saved);}
});
