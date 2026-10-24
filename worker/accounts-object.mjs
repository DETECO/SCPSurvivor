import {DurableObject} from 'cloudflare:workers';
import service from '../functions/account-service.js';
import {SqliteAdapter} from './sqlite-adapter.mjs';
const {executeCommand,ServiceError}=service;
const accountEnv=Object.freeze({GCLOUD_PROJECT:'scp-survivor',SCP_ACCOUNT_PROJECT:'scp-survivor'});

export class AccountsObject extends DurableObject {
 constructor(ctx,env){
  super(ctx,env);
  this.accountEnv=env;
  this.db=new SqliteAdapter(ctx.storage);
 }

 async command(auth,request){
  try{
   if(this.accountEnv.FIREBASE_PROJECT_ID!=='scp-survivor')
    throw new ServiceError('unavailable','Servidor no configurado.');
   if(!auth?.uid||typeof auth.uid!=='string'||auth.uid.includes('/')||auth.uid.length>128)
    throw new ServiceError('unauthenticated','Inicia sesión.');
   await this.db.bindOwner(auth.uid);
   const data=await executeCommand(this.db,auth,request,accountEnv);
   return{data};
  }catch(error){
   // RPC cloning does not preserve arbitrary Error properties such as code.
   return{error:{code:error instanceof ServiceError?error.code:'internal',
    message:error instanceof ServiceError?error.message:'No se pudo confirmar el comando. Reintenta.'}};
  }
 }
}
