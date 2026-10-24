'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const {mkdtemp,rm}=require('node:fs/promises');
const {tmpdir}=require('node:os');
const path=require('node:path');
const {build}=require('esbuild');
const {Miniflare}=require('miniflare');

// Only this test harness supplies identity directly. Production fetch verifies Firebase JWTs.
let bundle;
async function runtime(persist){
 bundle??=build({stdin:{contents:`
  export {AccountsObject} from './worker/accounts-object.mjs';
  export default {async fetch(request,env){
   const {uid,command}=await request.json();
   const result=await env.ACCOUNTS.getByName(uid).command({uid,token:{email_verified:true}},command);
   return Response.json(result);
  }};`,resolveDir:path.resolve(__dirname,'..'),sourcefile:'p05-test-harness.mjs'},
  bundle:true,write:false,platform:'browser',format:'esm',target:'es2022',external:['node:*','cloudflare:workers']});
 const result=await bundle;
 const mf=new Miniflare({modules:true,script:result.outputFiles[0].text,
  compatibilityDate:'2026-10-17',compatibilityFlags:['nodejs_compat'],
  bindings:{FIREBASE_PROJECT_ID:'scp-survivor'},
  durableObjects:{ACCOUNTS:{className:'AccountsObject',useSQLite:true}},durableObjectsPersist:persist});
 await mf.ready;
 return mf;
}
async function send(mf,uid,command){
 const response=await mf.dispatchFetch('https://runtime.test/',{method:'POST',
  headers:{'content-type':'application/json'},body:JSON.stringify({uid,command})});
 assert.equal(response.status,200);
 return response.json();
}
async function state(mf,uid){const response=await send(mf,uid,{type:'getState'});assert.ok(response.data);return response.data;}
const initialize=(requestId='init-request-0001',alias='Prueba')=>({type:'initializeProfile',requestId,
 expectedRevision:0,sessionId:'session-original',payload:{alias}});
function checkpoint(){return{schemaVersion:1,buildVersion:'0.5-local-01',boundary:'preparation',
 expedition:{phase:'preparation',sector:1,wave:1,sectorWaves:3,kind:'normal',objective:'neutralize',runSeed:1337,mapSeed:1,
  elapsed:30,prep:20,pending:0,cards:[],pendingXp:0,resumePhase:'combat',spawned:12,quota:12,spawnClock:.3,waveKills:0,waveTime:30,
  interaction:0,startX:0,startY:0,startHp:0,startDamage:0,nextBossSector:4,drought:0,extractionAvailable:false,upgradesApplied:0,
  totals:{wavesCompleted:1,sectorsCompleted:0,bossesDefeated:0,bossesEvaded:0},rngState:1,spawnRngState:1},
 player:{soldierId:'guard',x:16,y:16,hp:100,maxHp:100,baseMaxHp:100,level:1,xp:0,xpNext:62,kills:12,training:{},tempStats:{}},
 combat:{weapons:[{id:'a',model:'pistol',mods:[],level:1,ammo:12,reload:0,reloadTime:1.5},{id:'b',model:'smg',mods:[],level:1,ammo:24,reload:0,reloadTime:1.8}],activeIndex:0,shotWait:0,switchRemaining:0,shots:0},
 ability:{kind:'sprint',remaining:0,cooldown:0,duration:2},world:{broken:[],damaged:[]},pickups:[]};}
async function withRuntime(t,fn){
 const persist=await mkdtemp(path.join(tmpdir(),'scp-worker-runtime-'));
 let mf;
 try{mf=await runtime(persist);await fn(mf,persist);}
 finally{if(mf)await mf.dispose();await rm(persist,{recursive:true,force:true});}
}

test('P05 real SQLite RPC: 20 concurrent identical commands have one effect and replay their receipt',async t=>{
 await withRuntime(t,async mf=>{
  const command=initialize();
  const replies=await Promise.all(Array.from({length:20},()=>send(mf,'concurrent-user',command)));
  for(const reply of replies){assert.ok(reply.data);assert.equal(reply.data.revision,1);assert.deepEqual(reply,replies[0]);}
  assert.equal((await state(mf,'concurrent-user')).revision,1);
  const collision=await send(mf,'concurrent-user',{...command,payload:{alias:'Otro alias'}});
  assert.equal(collision.error?.code,'already-exists');
  assert.deepEqual(await send(mf,'concurrent-user',command),replies[0]);
 });
});

test('P05 real SQLite RPC: distinct commands at the same revision have exactly one winner',async t=>{
 await withRuntime(t,async mf=>{
  await send(mf,'revision-user',initialize());
  const commands=Array.from({length:20},(_,i)=>({type:'startRun',requestId:'race-request-'+String(i).padStart(4,'0'),
   expectedRevision:1,sessionId:'session-original',payload:{checkpoint:checkpoint()}}));
  const replies=await Promise.all(commands.map(command=>send(mf,'revision-user',command)));
  const winners=replies.filter(reply=>reply.data);
  assert.equal(winners.length,1);assert.equal(winners[0].data.revision,2);
  for(const reply of replies.filter(reply=>reply.error))assert.equal(reply.error.code,'failed-precondition');
  assert.deepEqual(await state(mf,'revision-user'),winners[0].data);
 });
});

test('P05 real SQLite RPC isolates account state and receipt IDs by UID',async t=>{
 await withRuntime(t,async mf=>{
  const [a,b]=await Promise.all([send(mf,'isolation-user-a',initialize(undefined,'Cuenta A')),
   send(mf,'isolation-user-b',initialize(undefined,'Cuenta B'))]);
  assert.equal(a.data.profile.alias,'Cuenta A');assert.equal(b.data.profile.alias,'Cuenta B');
  assert.deepEqual(await state(mf,'isolation-user-a'),a.data);
  assert.deepEqual(await state(mf,'isolation-user-b'),b.data);
  const empty=await state(mf,'isolation-user-c');assert.equal(empty.revision,0);assert.equal(empty.profile,null);
 });
});

test('P05 real SQLite RPC transfers a run and rejects writes from its former session',async t=>{
 await withRuntime(t,async mf=>{
  const uid='session-user';await send(mf,uid,initialize());
  const started=await send(mf,uid,{type:'startRun',requestId:'start-request-0001',expectedRevision:1,
   sessionId:'session-original',payload:{checkpoint:checkpoint()}});
  assert.ok(started.data);assert.deepEqual(started.data.activeRun.checkpoint,checkpoint());
  const runId=started.data.activeRun.id;
  const claimed=await send(mf,uid,{type:'claimRun',requestId:'claim-request-0001',expectedRevision:2,
   sessionId:'session-replacement',runId,payload:{}});
  assert.equal(claimed.data.activeRun.sessionVersion,2);
  assert.equal(claimed.data.activeRun.sessionId,'session-replacement');
  const rejected=await send(mf,uid,{type:'saveCheckpoint',requestId:'save-old-session',expectedRevision:3,
   sessionId:'session-original',runId,payload:{checkpoint:checkpoint()}});
  assert.equal(rejected.error?.code,'permission-denied');
  assert.deepEqual(await state(mf,uid),claimed.data);
  const saved=checkpoint();saved.player.hp=90;
  const accepted=await send(mf,uid,{type:'saveCheckpoint',requestId:'save-new-session',expectedRevision:3,
   sessionId:'session-replacement',runId,payload:{checkpoint:saved}});
  assert.equal(accepted.data.revision,4);assert.deepEqual(accepted.data.activeRun.checkpoint,saved);
 });
});

test('P05 real SQLite state and original command receipts survive Miniflare restart',async()=>{
 const persist=await mkdtemp(path.join(tmpdir(),'scp-worker-restart-'));
 let mf;
 try{
  mf=await runtime(persist);const uid='restart-user',command=initialize();
  const original=await send(mf,uid,command);
  const start={type:'startRun',requestId:'restart-start-001',expectedRevision:1,
   sessionId:'session-original',payload:{checkpoint:checkpoint()}};
  const latest=await send(mf,uid,start);assert.equal(latest.data.revision,2);
  await mf.dispose();mf=null;
  mf=await runtime(persist);
  assert.deepEqual(await state(mf,uid),latest.data);
  assert.deepEqual(await send(mf,uid,command),original,'receipt returns original revision after restart');
  assert.deepEqual(await send(mf,uid,start),latest);
  assert.deepEqual(await state(mf,uid),latest.data,'replaying old receipt must not restore old state');
 }finally{if(mf)await mf.dispose();await rm(persist,{recursive:true,force:true});}
});
