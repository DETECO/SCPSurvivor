'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=()=>fs.readFileSync(require.resolve('../js/net/local-accounts.js'),'utf8');

function setup({host='localhost',protocol='http:',query='?cuentas=propias',enabled=false,projectId='scp-survivor',region='us-central1',currentUser=null,failCommand=false}={}){
 const calls=[],memory=new Map();let id=0,revision=0;
 const publicConfig={apiKey:'public-web-key',authDomain:'scp-survivor.firebaseapp.com',projectId:'scp-survivor'};
 const runtime={ownAccountsEnabled:enabled,projectId,region};
 const user={uid:'own-user',email:'survivor@example.test',emailVerified:true,providerData:[{providerId:'google.com'}],reload:async()=>calls.push({type:'user.reload'}),getIdToken:async force=>calls.push({type:'user.getIdToken',force})};
 const auth={currentUser};
 const SDK={accountsRuntime:runtime,publicConfig,browserLocalPersistence:{kind:'local'},browserPopupRedirectResolver:{kind:'official-popup-resolver'},
  initializeApp:(config,name)=>{calls.push({type:'initializeApp',config,name});return{name};},
  initializeAuth:(app,dependencies)=>{calls.push({type:'initializeAuth',app,dependencies});return auth;},
  setPersistence:async(a,p)=>calls.push({type:'setPersistence',a,p}),
  onAuthStateChanged:(a,fn)=>{calls.push({type:'onAuthStateChanged'});fn(a.currentUser);return()=>{};},
  GoogleAuthProvider:class{constructor(){this.providerId='google.com';}},
  EmailAuthProvider:{credential:(email,password)=>{calls.push({type:'passwordCredential',email,password});return{providerId:'password',email,password};}},
  signInWithPopup:async(a,p)=>{calls.push({type:'signInWithPopup',auth:a,provider:p});a.currentUser=user;return{user};},
  linkWithPopup:async(u,p)=>{calls.push({type:'linkWithPopup',user:u,provider:p});return{user:u};},
  linkWithCredential:async(u,c)=>{calls.push({type:'linkWithCredential',user:u,credential:c});return{user:u};},
  reload:async u=>calls.push({type:'reload',user:u}),
  signOut:async a=>{a.currentUser=null;},
  getFunctions:(app,regionValue)=>{calls.push({type:'getFunctions',app,region:regionValue});return{};},
  httpsCallable:()=>async request=>{calls.push({type:'accountCommand',request});if(request.type==='getState')return{data:{revision,profile:{alias:'Cuenta propia'},activeRun:null}};if(failCommand)throw Object.assign(new Error('offline'),{code:'functions/unavailable'});return{data:{revision:++revision,profile:{alias:'Cuenta propia'},activeRun:null}};},
  connectAuthEmulator:(...args)=>calls.push({type:'connectAuthEmulator',args}),
  connectFunctionsEmulator:(...args)=>calls.push({type:'connectFunctionsEmulator',args}),
  updatePassword:(...args)=>calls.push({type:'updatePassword',args})
 };
 const storage={getItem:k=>memory.get(k)||null,setItem:(k,v)=>memory.set(k,v),removeItem:k=>memory.delete(k),get length(){return memory.size;},key:i=>[...memory.keys()][i]};
 const G={},window={G,SCPFirebase:SDK,location:{hostname:host,protocol,search:query},crypto:{randomUUID:()=>`id-${++id}`},localStorage:storage,
  sessionStorage:{getItem:k=>memory.get(`session:${k}`)||null,setItem:(k,v)=>memory.set(`session:${k}`,v)}};
 vm.runInNewContext(source(),{G,window,URLSearchParams,console,CustomEvent:class{},setTimeout,clearTimeout});
 return{G,calls,memory,auth,user,runtime,SDK};
}

test('own mode shows its panel while disabled and rejects before any Firebase side effect',async()=>{
 const a=setup();const A=a.G.LocalAccounts;
 assert.equal(A.mode,'own');assert.equal(A.enabled,true);assert.equal(A.isLocal,false);
 assert.equal(A.cacheNamespace,'scp:p05:scp-survivor');assert.equal(A.status.ready,false);
 await assert.rejects(A.init(),/desactivado/i);
 assert.equal(A.status.ready,false);assert.match(A.status.error,/scp-survivor/i);assert.deepEqual(a.calls,[]);
});

test('own mode is limited to loopback or the project HTTPS hosting domains',async()=>{
 for(const [host,protocol] of [['scp-survivor.web.app','http:'],['scp-survivor.firebaseapp.com','http:'],['evil.example','https:']]){
  const a=setup({host,protocol,enabled:true});assert.equal(a.G.LocalAccounts.enabled,false);assert.equal(a.G.LocalAccounts.mode,'disabled');
  await a.G.LocalAccounts.init();assert.deepEqual(a.calls,[]);
 }
 for(const [host,protocol] of [['localhost','http:'],['127.0.0.1','http:'],['scp-survivor.web.app','https:'],['scp-survivor.firebaseapp.com','https:']]){
  const a=setup({host,protocol,enabled:false});assert.equal(a.G.LocalAccounts.enabled,true);assert.equal(a.G.LocalAccounts.mode,'own');
 }
});

test('own initialization uses the bundled project config and never connects emulators',async()=>{
 const a=setup({enabled:true});await a.G.LocalAccounts.init();
 assert.equal(a.G.LocalAccounts.status.ready,true);
 const app=a.calls.find(c=>c.type==='initializeApp');assert.equal(app.config.projectId,'scp-survivor');assert.equal(app.name,'scp-own-p05');
 const auth=a.calls.find(c=>c.type==='initializeAuth');assert.equal(auth.dependencies.popupRedirectResolver,a.SDK.browserPopupRedirectResolver);
 assert.ok(a.calls.some(c=>c.type==='getFunctions'&&c.region==='us-central1'));
 assert.equal(a.calls.some(c=>c.type==='connectAuthEmulator'||c.type==='connectFunctionsEmulator'),false);
});

test('own Google sign-in uses the official popup and ignores the typed email as identity',async()=>{
 const a=setup({enabled:true});await a.G.LocalAccounts.init();const result=await a.G.LocalAccounts.google('Alias',false,'typed@example.test');
 assert.equal(a.calls.filter(c=>c.type==='signInWithPopup').length,1);
 assert.equal(a.calls.some(c=>c.type==='linkWithPopup'),false);
 assert.equal(result.uid,'own-user');assert.equal(a.G.LocalAccounts.user.uid,'own-user');
 assert.equal(a.calls.some(c=>c.type==='connectAuthEmulator'),false);
});

test('own Google linking keeps the current UID and refreshes the user token',async()=>{
 const a=setup({enabled:true,currentUser:null});await a.G.LocalAccounts.init();
 const signedIn=await a.G.LocalAccounts.google('Alias',false,'');const result=await a.G.LocalAccounts.google('',true);
 assert.equal(result.uid,signedIn.uid);assert.equal(a.G.LocalAccounts.user.uid,signedIn.uid);
 assert.equal(a.calls.some(c=>c.type==='linkWithPopup'&&c.user.uid===signedIn.uid),true);
 assert.equal(a.calls.some(c=>c.type==='user.getIdToken'&&c.force===true),true);
});

test('own password linking uses EmailAuthProvider credentials on the authenticated UID',async()=>{
 const a=setup({enabled:true});await a.G.LocalAccounts.init();await a.G.LocalAccounts.google('Alias',false,'');
 const result=await a.G.LocalAccounts.linkPassword('StrongPassword2026');
 assert.equal(result.uid,'own-user');
 const credential=a.calls.find(c=>c.type==='passwordCredential');assert.equal(credential.email,'survivor@example.test');assert.equal(credential.password,'StrongPassword2026');
 assert.equal(a.calls.some(c=>c.type==='linkWithCredential'&&c.user.uid==='own-user'&&c.credential.providerId==='password'),true);
 assert.equal(a.calls.some(c=>c.type==='updatePassword'),false);
 assert.equal(a.calls.some(c=>c.type==='user.getIdToken'&&c.force===true),true);
});

test('own session and cached data use a project namespace distinct from local demo keys',async()=>{
 const a=setup({enabled:true});await a.G.LocalAccounts.init();await a.G.LocalAccounts.google('Alias',false,'');
 await a.G.LocalAccounts.refresh();
 assert.equal(a.memory.has('session:scp:p05:scp-survivor:session'),true);
 assert.equal(a.memory.has('scp:p05:scp-survivor:confirmed:own-user'),true,[...a.memory.keys()].join(','));
 assert.equal(a.memory.has('session:scp:p05:session'),false);
 assert.equal(a.memory.has('scp:p05:confirmed:own-user'),false);
});

test('own pending confirmations stay within the project namespace',async()=>{
 const a=setup({enabled:true,failCommand:true});await a.G.LocalAccounts.init();await a.G.LocalAccounts.google('Alias',false,'');
 await assert.rejects(a.G.LocalAccounts.command('initializeProfile',{alias:'Own'}));
 assert.equal(a.memory.has(`scp:p05:scp-survivor:pending:own-user:${a.G.LocalAccounts.sessionId}`),true);
 assert.equal(a.memory.has(`scp:p05:pending:own-user:${a.G.LocalAccounts.sessionId}`),false);
});
