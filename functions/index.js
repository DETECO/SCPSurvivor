'use strict';
const {onCall,HttpsError}=require('firebase-functions/v2/https');
const {initializeApp,getApps}=require('firebase-admin/app');
const {getFirestore}=require('firebase-admin/firestore');
const {executeCommand,assertLocalEmulators,ServiceError}=require('./account-service');
exports.accountCommand=onCall({region:'us-central1',cors:[/^http:\/\/(127\.0\.0\.1|localhost)(:\d+)?$/]},async request=>{
 try{
  assertLocalEmulators();
  process.env.METADATA_SERVER_DETECTION='none';
  if(!getApps().length)initializeApp({projectId:'demo-scp-survivor'});
  return await executeCommand(getFirestore(),request.auth,request.data);
 }catch(error){
  if(error instanceof ServiceError)throw new HttpsError(error.code,error.message);
  console.error('No se pudo confirmar la operación local:',error.code||error.name);
  throw new HttpsError('internal','No se pudo confirmar. Conserva el comando pendiente y reintenta.');
 }
});
