'use strict';
// Action links are local test credentials. Show only the explicitly requested email.
const email=process.argv[2];
if(!email){console.error('Uso: npm.cmd run correo:local -- tu-correo-de-prueba@example.test');process.exit(1);}
(async()=>{
 const response=await fetch('http://127.0.0.1:9099/emulator/v1/projects/demo-scp-survivor/oobCodes');
 if(!response.ok)throw new Error('No se pudo consultar el emulador de correo.');
 const body=await response.json();
 const codes=(body.oobCodes||[]).filter(item=>item.email===email);
 if(!codes.length){console.log('No hay correos de prueba para esta dirección. Solicita verificación o recuperación desde el juego.');return;}
 for(const item of codes.slice(-3))console.log(`${item.requestType}: ${item.oobLink}`);
})().catch(error=>{console.error('Comprueba que los emuladores estén abiertos. '+error.message);process.exitCode=1;});
