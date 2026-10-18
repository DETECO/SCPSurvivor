'use strict';

class ServiceError extends Error {
 constructor(code,message){super(message);this.code=code;}
}
const fail=(code,message)=>{throw new ServiceError(code,message);};

function assertLocalEmulators(env=process.env){
 const local=value=>/^(127\.0\.0\.1|localhost|\[::1\]):\d+$/.test(value||'');
 if(env.FUNCTIONS_EMULATOR!=='true'||(env.GCLOUD_PROJECT||env.GCP_PROJECT)!=='demo-scp-survivor'||
  !local(env.FIRESTORE_EMULATOR_HOST)||!local(env.FIREBASE_AUTH_EMULATOR_HOST))
  fail('failed-precondition','Esta versión funciona exclusivamente con los emuladores locales demo-scp-survivor.');
}

function assertAccountRuntime(env=process.env){
 const projectIds=[env.GCLOUD_PROJECT,env.GCP_PROJECT].filter(value=>value!==undefined);
 const hasEmulatorHost=Object.entries(env).some(([name,value])=>
  /(?:EMULATOR_HOST|EMULATOR_HUB)$/i.test(name)&&value!==undefined&&value!==null&&String(value)!=='');
 const functionsEmulator=String(env.FUNCTIONS_EMULATOR||'').trim().toLowerCase()==='true';
 const localCandidate=functionsEmulator||projectIds.includes('demo-scp-survivor')||hasEmulatorHost;

 if(localCandidate){
  if(projectIds.some(projectId=>projectId!=='demo-scp-survivor')||
   (env.SCP_ACCOUNT_PROJECT!==undefined&&env.SCP_ACCOUNT_PROJECT!==''))
   fail('failed-precondition','Runtime local mezclado con otro proyecto o habilitación de cuentas propias.');
  assertLocalEmulators(env);
  return{mode:'local',projectId:'demo-scp-survivor'};
 }

 if(env.SCP_ACCOUNT_PROJECT!=='scp-survivor'||projectIds.length===0||
  projectIds.some(projectId=>projectId!=='scp-survivor')||functionsEmulator||hasEmulatorHost)
  fail('failed-precondition','Runtime de cuentas no autorizado: usa demo-scp-survivor local o habilita exactamente scp-survivor.');
 return{mode:'own',projectId:'scp-survivor'};
}

module.exports={ServiceError,assertLocalEmulators,assertAccountRuntime};
