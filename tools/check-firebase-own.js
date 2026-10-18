'use strict';
// Inspección: nunca activa APIs, billing, base de datos ni despliega.
const fs=require('node:fs'),path=require('node:path'),{spawnSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');
const config=JSON.parse(fs.readFileSync(path.join(root,'config/firebase-public.json'),'utf8'));
if(config.projectId!=='scp-survivor')throw Error('Proyecto propio inesperado.');
const cli=require.resolve('firebase-tools/lib/bin/firebase.js');
const result=spawnSync(process.execPath,[cli,'projects:list','--json','--non-interactive'],{
 cwd:root,encoding:'utf8',timeout:60000,env:{...process.env,FIREBASE_CLI_DISABLE_UPDATE_CHECK:'true'}});
if(result.error||result.status!==0){
 console.error('No se pudo comprobar acceso a scp-survivor. Inicia sesión con npx.cmd firebase login y repite. No compartas tokens por el chat.');
 process.exitCode=2;
}else{
 let parsed;try{parsed=JSON.parse(result.stdout);}catch(_){console.error('Respuesta CLI no reconocida; no se modifica el proyecto.');process.exit(2);}
 const projects=Array.isArray(parsed.result)?parsed.result:parsed.result?.projects||[];
 const project=projects.find(p=>p.projectId==='scp-survivor');
 if(!project){console.error('La cuenta autenticada no muestra acceso a scp-survivor.');process.exitCode=2;}
 else console.log(JSON.stringify({projectId:project.projectId,accessVerified:true,billingVerified:false,firestoreVerified:false,deployed:false,
  next:'Revisar Blaze, ubicación/base Firestore, presupuesto y aceptación antes del despliegue.'}));
}
