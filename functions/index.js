'use strict';
const {onCall,HttpsError}=require('firebase-functions/v2/https');
const {initializeApp,getApps}=require('firebase-admin/app');
const {getFirestore}=require('firebase-admin/firestore');
const {executeCommand,assertAccountRuntime,ServiceError}=require('./account-service');
exports.accountCommand=onCall({region:'us-central1',cors:[/^http:\/\/(127\.0\.0\.1|localhost|\[::1\])(:\d+)?$/,
 'https://scp-survivor.web.app','https://scp-survivor.firebaseapp.com'],minInstances:0,maxInstances:1,
 memory:'256MiB',timeoutSeconds:30,concurrency:20},async request=>{
 try{
  const runtime=assertAccountRuntime();
  if(runtime.mode==='local')process.env.METADATA_SERVER_DETECTION='none';
  if(!getApps().length)initializeApp({projectId:runtime.projectId});
  return await executeCommand(getFirestore(),request.auth,request.data);
 }catch(error){
  if(error instanceof ServiceError)throw new HttpsError(error.code,error.message);
  console.error('No se pudo confirmar la operación de cuenta:',error.code||error.name);
  throw new HttpsError('internal','No se pudo confirmar. Conserva el comando pendiente y reintenta.');
 }
});
