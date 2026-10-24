'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
test('HTTP authenticates before RPC and never accepts a UID supplied by the client',async()=>{
 const {createHandler}=await import('../worker/http.mjs');let calls=0;
 const handler=createHandler(async token=>{assert.equal(token,'test-id-token');return{uid:'verified-user',token:{email_verified:true}};});
 const env={FIREBASE_PROJECT_ID:'scp-survivor',ACCOUNTS:{getByName:uid=>{assert.equal(uid,'verified-user');return{command:async(auth,cmd)=>{calls++;assert.equal(auth.uid,uid);return{data:{revision:0,type:cmd.type}};}};}}};
 const request=(body,headers={},method='POST')=>new Request('https://test.workers.dev/accountCommand',{method,headers:{origin:'http://localhost:8000','content-type':'application/json',...headers},body:method==='POST'?body:undefined});
 let r=await handler(request('{}'),env);assert.equal(r.status,401);assert.equal(calls,0);
 r=await handler(request('{"type":"getState"}',{authorization:'Bearer test-id-token'}),env);assert.equal(r.status,200);assert.equal((await r.json()).data.revision,0);assert.equal(calls,1);
 r=await handler(request('{}',{origin:'https://evil.example',authorization:'Bearer test-id-token'}),env);assert.equal(r.status,403);assert.equal(calls,1);
 r=await handler(request('x'.repeat(300000),{authorization:'Bearer test-id-token'}),env);assert.equal(r.status,413);assert.equal(calls,1);
 r=await handler(request('{',{authorization:'Bearer test-id-token'}),env);assert.equal(r.status,400);
 r=await handler(request('',{},'OPTIONS'),env);assert.equal(r.status,204);assert.equal(r.headers.get('access-control-allow-origin'),'http://localhost:8000');
 r=await handler(request('{}',{authorization:'Bearer test-id-token'}),{...env,FIREBASE_PROJECT_ID:'other'});assert.equal(r.status,503);
});
