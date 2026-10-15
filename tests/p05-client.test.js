'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=()=>fs.readFileSync(require.resolve('../js/net/local-accounts.js'),'utf8');
function setup(host='127.0.0.1',memory=new Map()){
 const calls=[];let failures=0,revision=0;
 const user={uid:'user-a',email:'a@example.test',emailVerified:true,getIdToken:async()=>{},reload:async()=>{}};
 const auth={currentUser:user,emulatorConfig:{host:'127.0.0.1',port:9099}};
 const SDK={initializeApp:()=>({}),getAuth:()=>auth,initializeAuth:()=>auth,connectAuthEmulator(){},setPersistence:async()=>{},browserLocalPersistence:{},
  GoogleAuthProvider:class{static credential(token){return{providerId:'google.com',token}}},
  signInWithCredential:async(a,credential)=>{calls.push({credential:JSON.parse(credential.token)});return{user:a.currentUser}},
  linkWithCredential:async(u,credential)=>{calls.push({credential:JSON.parse(credential.token)});return{user:u}},
  updatePassword:async(u,pass)=>{calls.push({passwordUpdatedFor:u.uid,length:pass.length});},reload:async()=>{},
  onAuthStateChanged:(a,fn)=>{fn(a.currentUser);return()=>{}},getFunctions:()=>({}),connectFunctionsEmulator(){},
  httpsCallable:()=>async data=>{calls.push(JSON.parse(JSON.stringify(data)));if(data.type==='getState')return{data:{revision,profile:{alias:'Prueba'},activeRun:null}};
   if(failures-->0)throw Object.assign(new Error('offline'),{code:'functions/unavailable'});
   return{data:{revision:++revision,profile:{alias:'Prueba'},activeRun:null}};}};
 const G={},window={G,SCPFirebase:SDK,location:{hostname:host,search:'?cuentas=local'},crypto:require('node:crypto'),
  localStorage:{getItem:k=>memory.get(k)||null,setItem:(k,v)=>memory.set(k,v),removeItem:k=>memory.delete(k),get length(){return memory.size},key:i=>[...memory.keys()][i]},
  sessionStorage:{getItem:k=>memory.get('tab:'+k)||null,setItem:(k,v)=>memory.set('tab:'+k,v)},dispatchEvent(){}};
 vm.runInNewContext(source(),{G,window,URLSearchParams,console,CustomEvent:class{},setTimeout,clearTimeout});
 return{G,calls,memory,fail:()=>failures++,auth};
}
test('accounts stay disabled on public hosts despite query',async()=>{
 const a=setup('example.com');assert.equal(a.G.LocalAccounts.enabled,false);await a.G.LocalAccounts.init();assert.equal(a.calls.length,0);
});
test('retry reuses persisted request ID and revision after lost response',async()=>{
 const a=setup();await a.G.LocalAccounts.init();await a.G.LocalAccounts.refresh();a.fail();
 await assert.rejects(a.G.LocalAccounts.command('initializeProfile',{alias:'Prueba'}));
 const first=a.calls.at(-1);assert.ok(a.G.LocalAccounts.pending);
 await a.G.LocalAccounts.retry();const second=a.calls.at(-1);
 assert.equal(second.requestId,first.requestId);assert.equal(second.expectedRevision,first.expectedRevision);
 assert.equal(a.G.LocalAccounts.pending,null);assert.equal(a.G.LocalAccounts.data.revision,1);
});
test('an unresolved command cannot be replaced by another action',async()=>{
 const a=setup();await a.G.LocalAccounts.init();await a.G.LocalAccounts.refresh();a.fail();
 await assert.rejects(a.G.LocalAccounts.command('initializeProfile',{alias:'Prueba'}));
 const request=a.G.LocalAccounts.pending.requestId;
 await assert.rejects(a.G.LocalAccounts.command('startRun',{checkpoint:{}}),/pendiente/i);
 assert.equal(a.G.LocalAccounts.pending.requestId,request);
});

test('confirmed cache is scoped to UID and contains no credentials',async()=>{
 const a=setup();await a.G.LocalAccounts.init();await a.G.LocalAccounts.refresh();
 const raw=a.memory.get('scp:p05:confirmed:user-a');assert.ok(raw);
 const cache=JSON.parse(raw);assert.equal(cache.uid,'user-a');assert.equal(cache.data.revision,0);
 assert.equal(/password|idToken|refreshToken/.test(raw),false);
});

test('Google test uses an emulator-only mock credential without external popups',async()=>{
 const a=setup();await a.G.LocalAccounts.init();await a.G.LocalAccounts.google('Prueba',false,'google@example.test');
 const credential=a.calls.find(c=>c.credential)?.credential;assert.ok(credential);
 assert.equal(credential.email,'google@example.test');assert.equal(credential.email_verified,true);
});

test('adding a password in the emulator preserves the authenticated Google UID',async()=>{
 const a=setup();await a.G.LocalAccounts.init();await a.G.LocalAccounts.linkPassword('LocalPass2026');
 assert.equal(a.G.LocalAccounts.user.uid,'user-a');
 assert.deepEqual(a.calls.find(c=>c.passwordUpdatedFor),{passwordUpdatedFor:'user-a',length:13});
});

test('pending confirmation survives closing a tab and opening a new session',async()=>{
 const a=setup();await a.G.LocalAccounts.init();await a.G.LocalAccounts.refresh();a.fail();
 await assert.rejects(a.G.LocalAccounts.command('finishRun',{result:{reason:'death'}}));
 const request=a.G.LocalAccounts.pending;a.memory.delete('tab:scp:p05:session');
 const b=setup('127.0.0.1',a.memory);await b.G.LocalAccounts.init();
 assert.notEqual(b.G.LocalAccounts.sessionId,request.sessionId);assert.equal(b.G.LocalAccounts.pending.requestId,request.requestId);
 await b.G.LocalAccounts.retry();assert.equal(b.calls.at(-1).requestId,request.requestId);assert.equal(b.G.LocalAccounts.pending,null);
});

test('a server refresh replaces a stale cache even when its revision was higher',async()=>{
 const a=setup();a.memory.set('scp:p05:confirmed:user-a',JSON.stringify({uid:'user-a',data:{schemaVersion:1,buildVersion:'0.5-local-01',revision:999}}));
 await a.G.LocalAccounts.init();await a.G.LocalAccounts.refresh();assert.equal(a.G.LocalAccounts.data.revision,0);
});

test('malformed pending cache cannot throw during rendering',async()=>{
 const a=setup();await a.G.LocalAccounts.init();a.memory.set(`scp:p05:pending:user-a:${a.G.LocalAccounts.sessionId}`,'{broken');
 assert.doesNotThrow(()=>a.G.LocalAccounts.pending);
});
