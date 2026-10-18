'use strict';
// Copia únicamente frontend público. No expone Functions, documentos o datos locales.
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),out=path.join(root,'dist-own');
const runtime=JSON.parse(fs.readFileSync(path.join(root,'config/accounts-runtime.json'),'utf8'));
if(runtime.ownAccountsEnabled!==true||runtime.projectId!=='scp-survivor')throw Error('Las cuentas propias siguen desactivadas. Completa el preflight y despliega el backend antes de habilitar el frontend.');
// No limpiar una carpeta calculada: rechazar destino previo y conservarlo para revisión.
if(fs.existsSync(out))throw Error('dist-own ya existe. Conserva o mueve esa copia antes de preparar otra.');
function inspect(source){
 const stat=fs.lstatSync(source);
 if(stat.isSymbolicLink())throw Error('No se admiten enlaces en el frontend público.');
 if(stat.isDirectory())for(const name of fs.readdirSync(source))inspect(path.join(source,name));
}
for(const name of ['index.html','404.html','robots.txt','manifest.webmanifest','js','css','assets']){
 const source=path.join(root,name);
 if(!fs.existsSync(source))throw Error('Falta el archivo público '+name);
 inspect(source);
}
fs.mkdirSync(out);
for(const name of ['index.html','404.html','robots.txt','manifest.webmanifest','js','css','assets'])fs.cpSync(path.join(root,name),path.join(out,name),{recursive:true,dereference:false});
console.log('Frontend público preparado en dist-own; no se ha desplegado.');
