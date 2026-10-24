const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'dev.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'css', 'operations-menu.css'), 'utf8');
const mobileShell = css.slice(css.lastIndexOf('/* Mobile app-like menu shell. */'));

test('el menú móvil ocupa una vista fija y bloquea el desplazamiento y el zoom de página', () => {
  assert.match(html, /name="viewport" content="[^"]*maximum-scale=1[^"]*user-scalable=no/);
  assert.match(mobileShell, /#technical-ready:has\(\.operations-menu\)\{[^}]*overflow:hidden[^}]*touch-action:none/);
  assert.match(mobileShell, /#technical-ready \.operations-host\{[^}]*height:100%[^}]*overflow:hidden/);
  assert.match(mobileShell, /\.operations-menu\{[^}]*height:100%[^}]*overflow:hidden/);
  assert.match(mobileShell, /\.operations-screen\{[^}]*overflow:hidden/);
});

test('las pantallas de selección tienen un modo compacto que cabe en móvil vertical', () => {
  assert.match(mobileShell, /@media\(max-width:720px\)[\s\S]*?\.operations-home-layout\{[^}]*grid-template-columns:minmax\(0,1fr\)/);
  assert.match(mobileShell, /@media\(max-width:720px\)[\s\S]*?\.operations-weapon-grid\{[^}]*grid-template-columns:repeat\(2,minmax\(0,1fr\)/);
  assert.match(mobileShell, /@media\(max-height:680px\)[\s\S]*?\.operations-main-preview\{/);
});
