'use strict';
const esbuild = require('esbuild');
const path = require('node:path');
const fs = require('node:fs');
const root = path.resolve(__dirname, '..');
const out = path.join(root, 'js/vendor/firebase-client.js');
const result = esbuild.buildSync({absWorkingDir:root,entryPoints:['tools/firebase-client-entry.js'],
  tsconfigRaw:{compilerOptions:{}},
  bundle:true,format:'iife',globalName:'SCPFirebase',platform:'browser',target:['es2020'],
  minify:true,legalComments:'inline',write:false});
const content = result.outputFiles[0].contents;
if (!process.argv.includes('--check')) {
  fs.mkdirSync(path.dirname(out),{recursive:true}); fs.writeFileSync(out,content);
} else if(!fs.existsSync(out) || !fs.readFileSync(out).equals(content)) {
  throw new Error('SDK local desactualizado. Ejecuta npm.cmd run build.');
}
console.log(`Firebase SDK local: ${content.length} bytes${process.argv.includes('--check')?' (check)':''}`);
