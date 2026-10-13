/* Build reproducible del bundle local desde dev.html. */
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const terser = require('terser');

const ROOT = path.resolve(__dirname, '..');
const DEV = path.join(ROOT, 'dev.html');
const OUT = path.join(ROOT, 'index.html');
const BUNDLE = path.join(ROOT, 'js', 'app.min.js');
const BEGIN = '<!-- scripts:begin -->';
const END = '<!-- scripts:end -->';
const args = new Set(process.argv.slice(2));
const localMode = args.has('--local');
const checkOnly = args.has('--check');
const minifyOptions = {
  compress: { passes: 1 },
  mangle: true,
  format: { comments: false },
  ecma: 2020
};

function fail(message) {
  throw new Error(message);
}

async function main() {
  if (args.has('--help')) {
    console.log('Uso: node tools/build.js --local [--check]');
    console.log('--local permite construir la preparación técnica mientras exista PREPARATION_ONLY.');
    console.log('--check valida y minifica en memoria sin escribir archivos.');
    return;
  }
  if (!localMode) fail('Falta --local. Este build solo admite la preparación técnica local.');
  if (!fs.existsSync(DEV)) fail(`No existe la entrada ${path.relative(ROOT, DEV)}.`);
  const dev = fs.readFileSync(DEV, 'utf8');
  const beginAt = dev.indexOf(BEGIN);
  const endAt = dev.indexOf(END);
  if (beginAt < 0 || endAt < 0 || endAt < beginAt || dev.indexOf(BEGIN, beginAt + BEGIN.length) >= 0 || dev.indexOf(END, endAt + END.length) >= 0) {
    fail(`Marcas de scripts ausentes, duplicadas o desordenadas: ${BEGIN} / ${END}.`);
  }

  const blockEnd = endAt + END.length;
  const block = dev.slice(beginAt, blockEnd);
  const scripts = [...block.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)];
  if (!scripts.length) fail('El bloque de scripts no contiene etiquetas <script>.');
  const files = [];
  for (const match of scripts) {
    const attrs = match[1];
    const src = attrs.match(/\bsrc\s*=\s*(["'])(.*?)\1/i);
    if (!src) fail('Hay un script inline en el bloque. Mueve su contenido a un archivo .js antes del build.');
    if (!/^js\/[A-Za-z0-9_./-]+\.js$/.test(src[2]) || src[2].split('/').includes('..')) {
      fail(`Ruta de script no admitida: ${src[2]}`);
    }
    const file = path.join(ROOT, src[2]);
    if (!fs.existsSync(file) || !fs.statSync(file).isFile()) fail(`Falta el script ${src[2]}.`);
    files.push({ url: src[2], file });
  }
  if (/<script\b(?![^>]*\bsrc\s*=)[^>]*>\s*[\s\S]*?<\/script\s*>/i.test(dev.slice(0, beginAt) + dev.slice(blockEnd))) {
    fail('Hay un script inline fuera de las marcas; el HTML generado no puede depender de scripts inline.');
  }

  const joined = files.map(({ url, file }) => `/* ${url} */\n${fs.readFileSync(file, 'utf8')}`).join('\n;\n');
  const result = await terser.minify(joined, minifyOptions);
  if (result.error) fail(`Terser no pudo minificar el bundle: ${result.error.message}`);
  const min = result.code;
  if (!min) fail('Terser produjo un bundle vacío.');
  if (checkOnly) {
    console.log(`check ok: ${files.length} scripts en orden; sintaxis válida (${(joined.length / 1024).toFixed(0)} KB).`);
    return;
  }

  const hash = crypto.createHash('sha1').update(min).digest('hex').slice(0, 10);
  let html = dev.slice(0, beginAt) + `<script defer src="js/app.min.js?v=${hash}"></script>` + dev.slice(blockEnd);
  html = html.replace(/<meta name="robots" content="noindex">\s*/, '');
  html = html.replace(/<!-- seo:begin -->[\s\S]*?<!-- seo:end -->\n?/g, '');
  html = html.replace(/<!-- seo:(begin|end) -->\n?/g, '');
  html = html.replace(/<!-- dev.html: página fuente[^>]*-->/, '<!-- GENERADO desde dev.html por tools/build.js: no editar a mano (se edita dev.html). -->');
  if (/<script\b(?![^>]*\bsrc\s*=)[^>]*>\s*[\s\S]*?<\/script\s*>/i.test(html)) {
    fail('El HTML de salida contiene un script inline. No se escribió ningún archivo.');
  }

  fs.mkdirSync(path.dirname(BUNDLE), { recursive: true });
  const tempBundle = `${BUNDLE}.tmp-${process.pid}`;
  const tempHtml = `${OUT}.tmp-${process.pid}`;
  try {
    fs.writeFileSync(tempBundle, min);
    fs.writeFileSync(tempHtml, html);
    fs.renameSync(tempBundle, BUNDLE);
    fs.renameSync(tempHtml, OUT);
  } finally {
    for (const temp of [tempBundle, tempHtml]) if (fs.existsSync(temp)) fs.unlinkSync(temp);
  }
  console.log(`ok: ${files.length} scripts · ${(joined.length / 1024).toFixed(0)} KB -> ${(min.length / 1024).toFixed(0)} KB (app.min.js?v=${hash})`);
}

main().catch(error => {
  console.error(`build: ${error.message}`);
  process.exitCode = 1;
});
