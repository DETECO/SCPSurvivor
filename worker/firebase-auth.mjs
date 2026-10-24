import {jwtVerify, importX509} from 'jose';
import runtime from '../functions/project-runtime.js';
const {ServiceError}=runtime;
const PROJECT='scp-survivor';
const CERTS='https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com';
// Only public signing certificates are cached. Never cache a user's token or identity.
let certificates=null,expiresAt=0,lastFetch=0;
async function googleKey(header){
 if(header.alg!=='RS256'||typeof header.kid!=='string'||header.kid.length>128)throw new Error('Invalid JWT header');
 const now=Date.now();
 if(!certificates||now>=expiresAt||(!Object.hasOwn(certificates,header.kid)&&now-lastFetch>60000)){
  let response;
  try{response=await fetch(CERTS,{signal:AbortSignal.timeout(5000),redirect:'error'});}
  catch{throw new ServiceError('unavailable','No se pudo comprobar la sesión. Reintenta.');}
  if(!response.ok)throw new ServiceError('unavailable','No se pudo comprobar la sesión. Reintenta.');
  const reader=response.body.getReader(),parts=[];let size=0;
  try{for(;;){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>65536){await reader.cancel();throw new Error('Too large');}parts.push(value);}}
  catch{throw new ServiceError('unavailable','Respuesta de identidad inválida.');}
  finally{reader.releaseLock();}
  const bytes=new Uint8Array(size);let offset=0;for(const part of parts){bytes.set(part,offset);offset+=part.length;}
  const text=new TextDecoder().decode(bytes);
  const parsed=JSON.parse(text);
  if(!parsed||Array.isArray(parsed)||typeof parsed!=='object')throw new Error('Invalid certificate response');
  const maxAge=Number(/max-age=(\d+)/i.exec(response.headers.get('cache-control')||'')?.[1]||300);
  certificates=parsed;lastFetch=now;expiresAt=now+Math.min(maxAge,21600)*1000;
 }
 if(!Object.hasOwn(certificates,header.kid))throw new Error('Unknown signing key');
 return importX509(certificates[header.kid],'RS256');
}
export async function verifyFirebaseToken(token,resolveKey=googleKey,now=Date.now){
 try{
  if(typeof token!=='string'||token.length>16384)throw new Error('Invalid token');
  const seconds=Math.floor(now()/1000);
  const {payload:p,protectedHeader}=await jwtVerify(token,resolveKey,{algorithms:['RS256'],issuer:`https://securetoken.google.com/${PROJECT}`,audience:PROJECT,currentDate:new Date(seconds*1000),requiredClaims:['exp','iat','auth_time','sub']});
  if(typeof protectedHeader.kid!=='string'||!protectedHeader.kid||p.aud!==PROJECT||typeof p.sub!=='string'||!p.sub||p.sub.length>128||p.sub.includes('/')||
   !Number.isInteger(p.iat)||p.iat<=0||p.iat>seconds||!Number.isInteger(p.auth_time)||p.auth_time<=0||p.auth_time>seconds||!Number.isInteger(p.exp))throw new Error('Invalid claims');
  return {uid:p.sub,token:{email_verified:p.email_verified===true}};
 }catch(error){
  if(error.code==='unavailable')throw error;
  throw new ServiceError('unauthenticated','La sesión venció o no pertenece a SCP Survivor. Vuelve a iniciar sesión.');
 }
}
