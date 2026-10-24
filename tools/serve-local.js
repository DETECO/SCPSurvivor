'use strict';
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const port=Number(process.env.SCP_PORT||8000);
if(!Number.isInteger(port)||port<1024||port>65535)throw new Error('SCP_PORT debe ser un puerto entre 1024 y 65535.');
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8',
 '.json':'application/json','.webmanifest':'application/manifest+json','.svg':'image/svg+xml','.png':'image/png',
 '.jpg':'image/jpeg','.webp':'image/webp','.woff2':'font/woff2','.mp3':'audio/mpeg','.ogg':'audio/ogg','.wav':'audio/wav'};
const server=http.createServer((req,res)=>{
 let name;try{name=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname).slice(1)||'index.html';}catch(_){res.writeHead(400).end();return;}
 if(!['GET','HEAD'].includes(req.method)||name.includes('\\')||name.split('/').includes('..')||
  !/^(index\.html|dev\.html|visor-armas-revision-r1\.html|404\.html|manifest\.webmanifest|robots\.txt|docs\/referencias\/armas\/armas-prueba-direccionales-v1\/.+\.(?:js|json|png)|(?:js|css|assets)\/.+)$/.test(name)){
  res.writeHead(404).end();return;
 }
 const file=path.join(root,name);
 fs.stat(file,(error,stat)=>{
  if(error||!stat.isFile()){res.writeHead(404).end();return;}
  res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});
  if(req.method==='HEAD')res.end();else fs.createReadStream(file).pipe(res);
 });
});
server.on('error',error=>{console.error(error.code==='EADDRINUSE'?`El puerto ${port} está ocupado. Usa otro SCP_PORT.`:error.message);process.exitCode=1;});
server.listen(port,'127.0.0.1',()=>console.log(`SCP Survivor: http://127.0.0.1:${port}/ · solo este computador`));
