'use strict';
const assert=require('node:assert/strict');
const test=require('node:test');
const service=require('../functions/account-service.js');

const localEnv={FUNCTIONS_EMULATOR:'true',GCLOUD_PROJECT:'demo-scp-survivor',
 FIRESTORE_EMULATOR_HOST:'127.0.0.1:8080',FIREBASE_AUTH_EMULATOR_HOST:'127.0.0.1:9099'};
const ownEnv={GCLOUD_PROJECT:'scp-survivor',SCP_ACCOUNT_PROJECT:'scp-survivor'};

function memoryDb(initial={}){
 const docs=new Map(Object.entries(initial).map(([path,data])=>[path,structuredClone(data)]));
 const writes=[];
 const ref=path=>({path,collection:name=>({doc:id=>ref(path+'/'+name+'/'+id)}),
  async get(){const value=docs.get(path);return{exists:value!==undefined,data:()=>structuredClone(value)};}});
 return{writes,docs,collection:name=>({doc:id=>ref(name+'/'+id)}),
  async runTransaction(callback){
   const staged=new Map();
   const result=await callback({
    async get(document){const value=staged.has(document.path)?staged.get(document.path):docs.get(document.path);
     return{exists:value!==undefined,data:()=>structuredClone(value)};},
    set(document,value){staged.set(document.path,structuredClone(value));}
   });
   for(const [path,value] of staged){docs.set(path,value);writes.push({path,data:structuredClone(value)});}
   return result;
  }};
}

function command(type,overrides={}){
 return{type,requestId:'request-1234',expectedRevision:0,sessionId:'session-1234',payload:{alias:'Propio P05'},...overrides};
}

test('P05 acepta emulador local válido y un runtime propio solo con habilitación exacta',()=>{
 assert.equal(typeof service.assertAccountRuntime,'function');
 assert.deepEqual(service.assertAccountRuntime(localEnv),{mode:'local',projectId:'demo-scp-survivor'});
 assert.deepEqual(service.assertAccountRuntime(ownEnv),{mode:'own',projectId:'scp-survivor'});
 assert.equal(service.assertLocalEmulators(localEnv),undefined);
});

test('P05 runtime propio falla cerrado ante proyecto ausente, distinto o habilitación incompleta',()=>{
 for(const env of [
  {},
  {GCLOUD_PROJECT:'scp-survivor'},
  {...ownEnv,GCP_PROJECT:''},
  {...ownEnv,GCLOUD_PROJECT:'otro-proyecto'},
  {...ownEnv,GCP_PROJECT:'otro-proyecto'},
  {...ownEnv,SCP_ACCOUNT_PROJECT:'demo-scp-survivor'},
  {...ownEnv,FUNCTIONS_EMULATOR:'true'},
  {...ownEnv,FIREBASE_AUTH_EMULATOR_HOST:'127.0.0.1:9099'},
  {...ownEnv,FIRESTORE_EMULATOR_HOST:'127.0.0.1:8080'},
  {...ownEnv,FIREBASE_STORAGE_EMULATOR_HOST:'127.0.0.1:9199'},
  {...ownEnv,FIREBASE_DATABASE_EMULATOR_HOST:'127.0.0.1:9000'},
  {...ownEnv,PUBSUB_EMULATOR_HOST:'127.0.0.1:8085'},
  {...ownEnv,DATASTORE_EMULATOR_HOST:'127.0.0.1:8081'},
  {...ownEnv,FIREBASE_EMULATOR_HUB:'127.0.0.1:4400'}
 ])assert.throws(()=>service.assertAccountRuntime(env),/runtime|proyecto|emulador|habilit/i);
});

test('P05 servicio propio exige Auth y nunca acepta UID indicado por el cliente',async()=>{
 const db=memoryDb();
 await assert.rejects(service.executeCommand(db,null,command('initializeProfile'),ownEnv),error=>error.code==='unauthenticated');
 await assert.rejects(service.executeCommand(db,{uid:'user-owner'},command('initializeProfile',{uid:'user-victim'}),ownEnv),error=>error.code==='invalid-argument');
 assert.equal(db.writes.length,0);
});

test('P05 servicio propio escribe bajo UID autenticado y conserva reintento idempotente',async()=>{
 const db=memoryDb(),auth={uid:'user-owner'};
 const request=command('initializeProfile');
 const first=await service.executeCommand(db,auth,request,ownEnv);
 const retried=await service.executeCommand(db,auth,request,ownEnv);
 assert.deepEqual(retried,first);
 assert.equal(db.writes.length,2);
 assert.ok(db.docs.has('users/user-owner'));
 assert.ok(db.docs.has('users/user-owner/receipts/request-1234'));
 assert.equal((await service.executeCommand(db,{uid:'other-user'},{type:'getState'},ownEnv)).profile,null);
});

test('P05 servicio propio rechaza reusar requestId con otro contenido',async()=>{
 const db=memoryDb(),auth={uid:'user-owner'},request=command('initializeProfile');
 await service.executeCommand(db,auth,request,ownEnv);
 await assert.rejects(service.executeCommand(db,auth,{...request,payload:{alias:'Otro alias'}},ownEnv),error=>error.code==='already-exists');
 assert.equal(db.docs.get('users/user-owner').revision,1);
});

test('P05 servicio propio rechaza sesión ajena antes de mutar estado o recibos',async()=>{
 const db=memoryDb({'users/user-owner':{schemaVersion:1,buildVersion:'0.5-local-01',revision:7,
  profile:{alias:'Propio'},activeRun:{id:'run-12345678',sessionId:'session-owner'},lastResult:null}});
 await assert.rejects(service.executeCommand(db,{uid:'user-owner'},
  command('saveCheckpoint',{requestId:'save-12345678',expectedRevision:7,sessionId:'session-attacker',runId:'run-12345678',payload:{}}),ownEnv),
  error=>error.code==='permission-denied');
 assert.equal(db.docs.get('users/user-owner').revision,7);
 assert.equal(db.writes.length,0);
});
