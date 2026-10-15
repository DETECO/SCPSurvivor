'use strict';
// Use the same export endpoint as the pinned CLI, avoiding its Windows exit crash.
// The project locator and origin are checked before overwriting generated demo data.
const path=require('node:path'),fs=require('node:fs');
const {EmulatorHubClient}=require('firebase-tools/lib/emulator/hubClient');
const root=path.resolve(__dirname,'..'),data=path.join(root,'local-data','firebase');
(async()=>{
 const hub=new EmulatorHubClient('demo-scp-survivor');
 if(!hub.foundHub())throw Error('Inicia primero los emuladores locales.');
 const origin=await hub.getStatus();
 if(!/^http:\/\/(127\.0\.0\.1|localhost):4400$/.test(origin))throw Error('El hub no coincide con el entorno local previsto.');
 fs.mkdirSync(data,{recursive:true});
 await hub.postExport({path:data,initiatedBy:'emulators:export',targets:['auth','firestore']});
 if(!fs.existsSync(path.join(data,'firebase-export-metadata.json')))throw Error('Falta el manifiesto de la exportación.');
 console.log('Datos locales exportados en local-data/firebase. Ya puedes cerrar los emuladores.');
})().catch(error=>{console.error(error.message);process.exitCode=1;});
