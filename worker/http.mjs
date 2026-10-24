import {verifyFirebaseToken} from './firebase-auth.mjs';
import runtime from '../functions/project-runtime.js';
const {ServiceError}=runtime;
const MAX_BODY=272*1024;
const statuses={'invalid-argument':400,unauthenticated:401,'permission-denied':403,'not-found':404,'already-exists':409,'failed-precondition':409,'resource-exhausted':429,unavailable:503,internal:500};
function allowed(origin){
 if(!origin)return true; // Non-browser clients still need a verified Firebase ID token.
 try{const u=new URL(origin);return origin===u.origin&&(
  (u.protocol==='http:'&&['localhost','127.0.0.1','[::1]'].includes(u.hostname))||
  ['https://scp-survivor.web.app','https://scp-survivor.firebaseapp.com'].includes(origin));}catch{return false;}
}
async function jsonBody(request){
 if(!/^application\/json(?:;|$)/i.test(request.headers.get('content-type')||''))throw new ServiceError('invalid-argument','Usa JSON.');
 if(Number(request.headers.get('content-length'))>MAX_BODY)throw Object.assign(new Error('El comando supera el límite.'),{status:413});
 const reader=request.body?.getReader();if(!reader)throw new ServiceError('invalid-argument','Falta el comando.');
 let size=0;const chunks=[];
 try{for(;;){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>MAX_BODY){await reader.cancel();throw Object.assign(new Error('El comando supera el límite.'),{status:413});}chunks.push(value);}}
 finally{reader.releaseLock();}
 const body=new Uint8Array(size);let offset=0;for(const part of chunks){body.set(part,offset);offset+=part.length;}
 try{return JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(body));}catch{throw new ServiceError('invalid-argument','JSON inválido.');}
}
export function createHandler(verify=verifyFirebaseToken){
 return async(request,env)=>{
  const origin=request.headers.get('origin'),headers={'cache-control':'no-store','x-content-type-options':'nosniff',vary:'Origin'};
  const respond=(value,status=200)=>Response.json(value,{status,headers});
  if(!allowed(origin))return respond({error:{code:'permission-denied',message:'Origen no autorizado.'}},403);
  if(origin)headers['access-control-allow-origin']=origin;
  if(env.FIREBASE_PROJECT_ID!=='scp-survivor')return respond({error:{code:'unavailable',message:'Servidor no configurado.'}},503);
  const url=new URL(request.url);
  if(url.pathname==='/health'&&request.method==='GET')return respond({service:'scp-survivor-accounts',storage:'durable-object-sqlite',projectId:'scp-survivor',version:1});
  if(url.pathname!=='/accountCommand')return respond({error:{code:'not-found',message:'Ruta no disponible.'}},404);
  if(request.method==='OPTIONS')return new Response(null,{status:204,headers:{...headers,'access-control-allow-methods':'POST, OPTIONS','access-control-allow-headers':'Authorization, Content-Type','access-control-max-age':'600'}});
  if(request.method!=='POST')return respond({error:{code:'invalid-argument',message:'Usa POST.'}},405);
  try{
   const match=/^Bearer ([^\s]+)$/.exec(request.headers.get('authorization')||'');
   if(!match)throw new ServiceError('unauthenticated','Inicia sesión.');
   const command=await jsonBody(request);
   const auth=await verify(match[1]);
   const result=await env.ACCOUNTS.getByName(auth.uid).command(auth,command);
   return respond(result,result.error?(statuses[result.error.code]||500):200);
  }catch(error){
   const code=Object.hasOwn(statuses,error.code)?error.code:error.status===413?'invalid-argument':'internal';
   const message=error instanceof ServiceError||error.status===413?error.message:'No se pudo confirmar el comando. Reintenta.';
   return respond({error:{code,message}},error.status||statuses[code]);
  }
 };
}
