'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
test('Worker verifies signature, issuer, audience, time and UID instead of trusting JSON',async()=>{
 const {verifyFirebaseToken}=await import('../worker/firebase-auth.mjs');
 const {generateKeyPair,SignJWT}=await import('jose');
 const {privateKey,publicKey}=await generateKeyPair('RS256');
 const now=Math.floor(Date.now()/1000),payload={aud:'scp-survivor',iss:'https://securetoken.google.com/scp-survivor',sub:'real-uid',iat:now-1,auth_time:now-10,exp:now+3600,email_verified:true};
 const sign=p=>new SignJWT(p).setProtectedHeader({alg:'RS256',kid:'test-key'}).sign(privateKey);
 const resolve=async header=>{assert.equal(header.kid,'test-key');return publicKey;};
 const ok=await verifyFirebaseToken(await sign(payload),resolve,()=>now*1000);
 assert.equal(ok.uid,'real-uid');assert.equal(ok.token.email_verified,true);
 for(const patch of [{aud:'other'},{aud:['scp-survivor','other']},{iss:'evil'},{sub:''},{sub:'a/b'},{iat:now+50},{auth_time:now+50},{auth_time:null},{exp:now-1}])
  await assert.rejects(verifyFirebaseToken(await sign({...payload,...patch}),resolve,()=>now*1000),e=>e.code==='unauthenticated');
 const other=await generateKeyPair('RS256');
 await assert.rejects(verifyFirebaseToken(await sign(payload),()=>other.publicKey,()=>now*1000),e=>e.code==='unauthenticated');
 await assert.rejects(verifyFirebaseToken('bad-token',resolve),e=>e.code==='unauthenticated');
});
