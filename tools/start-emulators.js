'use strict';
// A fixed demo project prevents accidental access to live Firebase resources.
const fs=require('node:fs'),path=require('node:path'),{spawn}=require('node:child_process');
const root=path.resolve(__dirname,'..'),data=path.join(root,'local-data','firebase');
const cli=require.resolve('firebase-tools/lib/bin/firebase.js');
const args=[cli,'emulators:start','--only','auth,firestore,functions','--project','demo-scp-survivor',
  '--config',path.join(root,'firebase.json'),'--export-on-exit',data];
if(fs.existsSync(path.join(data,'firebase-export-metadata.json')))args.push('--import',data);
const child=spawn(process.execPath,args,{cwd:root,stdio:'inherit',env:{...process.env,FIREBASE_CLI_DISABLE_UPDATE_CHECK:'true',METADATA_SERVER_DETECTION:'none',FUNCTIONS_DISCOVERY_TIMEOUT:'60'}});
let ended=false;
child.on('error',error=>{console.error(error.message);process.exitCode=1;});
child.on('exit',code=>{ended=true;process.exitCode=code||0;});
process.on('SIGINT',()=>child.kill('SIGINT'));
// D-243: matching emails do not silently merge identities. Linking is explicit.
(async()=>{
 for(let attempt=0;attempt<120&&!ended;attempt++){
  try{
   const response=await fetch('http://127.0.0.1:9099/emulator/v1/projects/demo-scp-survivor/config',{
    method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({signIn:{allowDuplicateEmails:true}})});
   if(response.ok){console.log('Auth local: las identidades se vinculan solo mediante acción explícita.');return;}
  }catch(_){/* Auth has not finished starting. */}
  await new Promise(resolve=>setTimeout(resolve,500));
 }
 if(!ended){console.error('No se pudo preparar el aislamiento de identidades del emulador.');child.kill('SIGINT');process.exitCode=1;}
})();
