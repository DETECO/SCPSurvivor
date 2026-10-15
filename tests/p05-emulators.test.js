'use strict';
// Explicit opt-in: every endpoint and Admin SDK below uses the local demo only.
const test=require('node:test'),assert=require('node:assert/strict'),{randomUUID}=require('node:crypto');
const enabled=process.env.RUN_P05_EMULATORS==='1';
const authUrl='http://127.0.0.1:9099/identitytoolkit.googleapis.com/v1/';
const functionUrl='http://127.0.0.1:5001/demo-scp-survivor/us-central1/accountCommand';
async function authApi(method,data){
 const response=await fetch(authUrl+method+'?key=demo-scp-survivor-local',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
 const body=await response.json();if(!response.ok)throw Error('Auth emulator: '+body.error?.message);return body;
}
async function call(token,data){
 const headers={'Content-Type':'application/json'};if(token)headers.Authorization='Bearer '+token;
 const response=await fetch(functionUrl,{method:'POST',headers,body:JSON.stringify({data})});
 const body=await response.json();return{status:response.status,...body};
}
const command=(type,revision,sessionId,payload={},runId)=>({type,requestId:randomUUID(),expectedRevision:revision,sessionId,payload,...(runId?{runId}:{})});
const checkpoint=phase=>({schemaVersion:1,buildVersion:'0.5-local-01',boundary:phase==='combat'?'wave-start':phase,
 expedition:{phase,sector:1,wave:1,sectorWaves:3,kind:'normal',objective:'neutralize',runSeed:1337,mapSeed:1,
  elapsed:phase==='combat'?0:30,prep:20,pending:0,cards:[],pendingXp:0,resumePhase:'combat',spawned:phase==='combat'?0:12,
  quota:12,spawnClock:0,waveKills:0,waveTime:phase==='combat'?0:30,interaction:0,startX:0,startY:0,startHp:0,startDamage:0,
  nextBossSector:4,drought:0,extractionAvailable:false,upgradesApplied:0,
  totals:{wavesCompleted:phase==='combat'?0:1,sectorsCompleted:0,bossesDefeated:0,bossesEvaded:0},rngState:1,spawnRngState:1},
 player:{soldierId:'guard',x:16,y:16,hp:100,maxHp:100,baseMaxHp:100,level:1,xp:0,xpNext:62,kills:phase==='combat'?0:12,training:{},tempStats:{}},
 combat:{weapons:[{id:'a',model:'pistol',mods:[],level:1,ammo:12,reload:0,reloadTime:1.5},{id:'b',model:'smg',mods:[],level:1,ammo:24,reload:0,reloadTime:1.8}],activeIndex:0,shotWait:0,switchRemaining:0,shots:0},
 ability:{kind:'sprint',remaining:0,cooldown:0,duration:2},world:{broken:[],damaged:[]},pickups:[]});

test('real local emulators enforce UID, revisions, receipts, concurrency and session ownership',{skip:!enabled,timeout:90000},async()=>{
 process.env.FIRESTORE_EMULATOR_HOST='127.0.0.1:8080';process.env.FIREBASE_AUTH_EMULATOR_HOST='127.0.0.1:9099';
 process.env.METADATA_SERVER_DETECTION='none';
 const serverRequire=require('node:module').createRequire(require.resolve('../functions/package.json'));
 const {initializeApp,deleteApp}=serverRequire('firebase-admin/app');
 const {getAuth}=serverRequire('firebase-admin/auth');
 const {getFirestore}=serverRequire('firebase-admin/firestore');
 const app=initializeApp({projectId:'demo-scp-survivor'},'p05-tests-'+randomUUID()),db=getFirestore(app),adminAuth=getAuth(app);
 const suffix=randomUUID(),email='p05-server-'+suffix+'@example.test',pass='Local-fixture-1234';
 const a=await authApi('accounts:signUp',{email,password:pass,returnSecureToken:true});
 const b=await authApi('accounts:signUp',{email:'other-'+email,password:pass,returnSecureToken:true});
 let token=a.idToken;const session=randomUUID();
 try{
  assert.equal((await call(null,{type:'getState'})).error.status,'UNAUTHENTICATED');
  const profile=command('initializeProfile',0,session,{alias:'Emulador P05'});
  const initialized=await call(token,profile);assert.equal(initialized.result.revision,1);
  assert.equal((await call(b.idToken,{type:'getState'})).result.profile,null);
  assert.equal((await call(b.idToken,{...profile,uid:a.localId})).error.status,'INVALID_ARGUMENT');
  const unverified=await call(token,command('startRun',1,session,{checkpoint:checkpoint('preparation')}));
  assert.equal(unverified.error.status,'PERMISSION_DENIED');
  await adminAuth.updateUser(a.localId,{emailVerified:true});token=(await authApi('accounts:signInWithPassword',{email,password:pass,returnSecureToken:true})).idToken;
  // Invalid snapshots cannot create either an active run or an idempotency receipt.
  for(const field of ['totals','nextBossSector','quota','objective']){
   const malformed=checkpoint('preparation');delete malformed.expedition[field];
   const rejected=command('startRun',1,session,{checkpoint:malformed});
   assert.equal((await call(token,rejected)).error.status,'INVALID_ARGUMENT',field);
   const state=(await call(token,{type:'getState'})).result;assert.equal(state.revision,1);assert.equal(state.activeRun,null);
   assert.equal((await db.collection('users').doc(a.localId).collection('receipts').doc(rejected.requestId).get()).exists,false);
  }
  const start=command('startRun',1,session,{checkpoint:checkpoint('preparation')});
  const run=(await call(token,start)).result;assert.ok(run.activeRun.id);assert.equal(run.revision,2);
  // Identical concurrent retries: only one revision/receipt/run.
  const replay=await Promise.all([call(token,start),call(token,start)]);
  assert.deepEqual(replay[0].result,run);assert.deepEqual(replay[1].result,run);
  assert.equal((await call(token,{...start,payload:{checkpoint:checkpoint('combat')}})).error.status,'ALREADY_EXISTS');
  assert.equal((await call(token,command('startRun',2,session,{checkpoint:checkpoint('preparation')}))).error.status,'ALREADY_EXISTS');
  const id=run.activeRun.id;
  const requests=[command('saveCheckpoint',2,session,{checkpoint:checkpoint('preparation')},id),command('saveCheckpoint',2,session,{checkpoint:checkpoint('combat')},id)];
  const concurrent=await Promise.all(requests.map(request=>call(token,request)));
  assert.equal(concurrent.filter(x=>x.result).length,1);assert.equal(concurrent.filter(x=>x.error?.status==='FAILED_PRECONDITION').length,1);
  let current=(await call(token,{type:'getState'})).result;assert.equal(current.revision,3);
  const begun=(await call(token,command('beginCombat',current.revision,session,{},id))).result;
  const secondSession=randomUUID();
  const claimed=(await call(token,command('claimRun',begun.revision,secondSession,{},id))).result;
  assert.equal(claimed.activeRun.rankEligible,false);assert.equal(claimed.activeRun.sessionId,secondSession);
  assert.equal((await call(token,command('saveCheckpoint',claimed.revision,session,{checkpoint:checkpoint('preparation')},id))).error.status,'PERMISSION_DENIED');
  const prep=(await call(token,command('saveCheckpoint',claimed.revision,secondSession,{checkpoint:checkpoint('preparation')},id))).result;
  assert.equal(prep.activeRun.rankEligible,false);
  const close=command('finishRun',prep.revision,secondSession,{result:{reason:'death',sector:1,wave:1,kills:12,level:2,elapsed:40,hp:0,runSeed:1337,wavesCompleted:1,sectorsCompleted:0,bossesDefeated:0,bossesEvaded:0}},id);
  const finished=(await call(token,close)).result;assert.equal(finished.activeRun,null);assert.equal(finished.lastResult.cause,'death');
  assert.deepEqual((await call(token,close)).result,finished);
  assert.equal((await call(token,{...close,requestId:randomUUID(),expectedRevision:finished.revision})).error.status,'FAILED_PRECONDITION');
  // Every direct client write remains denied, including writing its own economy.
  const direct=await fetch(`http://127.0.0.1:8080/v1/projects/demo-scp-survivor/databases/(default)/documents/users/${a.localId}`,{
   method:'PATCH',headers:{Authorization:'Bearer '+token,'Content-Type':'application/json'},body:JSON.stringify({fields:{currency:{integerValue:'999999'}}})});
  assert.equal(direct.status,403);
  const stored=(await db.collection('users').doc(a.localId).get()).data();assert.equal(stored.currency,undefined);assert.equal(stored.revision,finished.revision);
  const receipts=await db.collection('users').doc(a.localId).collection('receipts').get();assert.ok(receipts.size>=7);
 }finally{
  // Only identities created by this test are removed; never flush the emulator.
  await db.recursiveDelete(db.collection('users').doc(a.localId));await db.recursiveDelete(db.collection('users').doc(b.localId));
  await adminAuth.deleteUser(a.localId);await adminAuth.deleteUser(b.localId);await db.terminate();await deleteApp(app);
 }
});
