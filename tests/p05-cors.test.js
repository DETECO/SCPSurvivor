'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),http=require('node:http');
let handler;
try{handler=require('../functions/index.js').accountCommand;}catch(e){if(e.code!=='MODULE_NOT_FOUND')throw e;}
test('callable real handler CORS allows owned origins and both loopback formats',{skip:!handler&&'Instalar dependencias de functions para comprobar su manejador'},async()=>{
 const server=http.createServer((req,res)=>handler(req,res));
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const url=`http://127.0.0.1:${server.address().port}/accountCommand`;
 try{
  for(const origin of ['http://127.0.0.1:8000','http://localhost:8000','http://[::1]:8000','https://scp-survivor.web.app','https://scp-survivor.firebaseapp.com']){
   const response=await fetch(url,{method:'OPTIONS',headers:{Origin:origin,'Access-Control-Request-Method':'POST'}});
   assert.equal(response.headers.get('access-control-allow-origin'),origin,origin);
  }
  for(const origin of ['https://evil.example','http://localhost.evil.example','http://scp-survivor.web.app']){
   const response=await fetch(url,{method:'OPTIONS',headers:{Origin:origin,'Access-Control-Request-Method':'POST'}});
   assert.equal(response.headers.get('access-control-allow-origin'),null,origin);
  }
 }finally{await new Promise(resolve=>server.close(resolve));}
});
