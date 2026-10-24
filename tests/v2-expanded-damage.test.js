const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const code = fs.readFileSync(require.resolve('../js/entities/fx.js'), 'utf8');

function setup({ expanded = true, mapEnabled = false, dmgNumbers = true, quality = 2 } = {}) {
  const drawn = [];
  const G = {
    Sprites: { PX: 2 },
    Settings: { fx: quality, get: key => key === 'dmgNumbers' ? dmgNumbers : undefined },
    MapTrial: { expanded, enabled: mapEnabled },
    U: { rand: () => 0, randInt: () => 0, hash: () => 0, lerp: (a, b, t) => a + (b - a) * t },
    VFX: { PAL: { normal: [] }, draw() {} },
    Icons: { twinkle() {} }
  };
  vm.runInNewContext(code, { G, Math, performance: { now: () => 0 } });
  const ctx = {
    globalAlpha: 1,
    save() {}, restore() {},
    strokeText(text) { drawn.push({ type: 'stroke', text, font: this.font, lineWidth: this.lineWidth, strokeStyle: this.strokeStyle }); },
    fillText(text) { drawn.push({ type: 'fill', text, font: this.font, color: this.fillStyle }); }
  };
  const draw = () => { drawn.length = 0; G.FX.draw(ctx); return drawn.slice(); };
  return { G, drawn, draw };
}

test('expanded damage values and numeric strings are rounded, normalized and compacted', () => {
  const { G, draw } = setup();
  for (const value of [12.349999999999, 0.1 + 0.2, -0.02, 1234.56, '+12345.678', '-1250']) {
    G.FX.dmgText(10, 20, value);
  }
  const fills = draw().filter(c => c.type === 'fill').map(c => c.text);
  assert.deepEqual(fills, ['12.3', '0.3', '0', '1.2k', '+12.3k', '-1.3k']);
});

test('expanded rendering uses a compact, readable outlined damage font and short finite lifetime', () => {
  const { G, draw } = setup();
  G.FX.dmgText(0, 0, 20.25);
  G.FX.dmgText(0, 0, '¡Muy eficaz!');
  const rendered = draw();
  const number = rendered.find(c => c.type === 'fill' && c.text === '20.3');
  const numberStroke = rendered.find(c => c.type === 'stroke' && c.text === '20.3');
  const alert = rendered.find(c => c.type === 'fill' && c.text === '¡Muy eficaz!');
  assert.match(number.font, /12px/);
  assert.ok(numberStroke.lineWidth >= 3);
  assert.match(numberStroke.strokeStyle, /rgba\(0,0,0/);
  assert.match(alert.font, /13px/);
  G.FX.update(0.5);
  assert.equal(G.FX.count, 1, 'el número expira en menos de 0,5 s y el aviso conserva su duración');
  G.FX.update(0.46);
  assert.equal(G.FX.count, 0);
});

test('dmgNumbers suprime todo daño numérico expanded pero conserva avisos de texto', () => {
  const { G, draw } = setup({ dmgNumbers: false });
  G.FX.dmgText(0, 0, 5);
  G.FX.dmgText(0, 0, '-5');
  G.FX.dmgText(0, 0, '+5');
  G.FX.dmgText(0, 0, '+1 ticket');
  G.FX.dmgText(0, 0, '¡Muy eficaz!');
  assert.deepEqual(draw().filter(c => c.type === 'fill').map(c => c.text), ['+1 ticket', '¡Muy eficaz!']);
});

test('legacy damage formatting, settings and lifetime remain unchanged', () => {
  const { G, draw } = setup({ expanded: false });
  G.FX.dmgText(0, 0, 12.349999999999);
  G.FX.dmgText(0, 0, '+12.349999999999');
  const rendered = draw();
  assert.ok(rendered.some(c => c.type === 'fill' && c.text === 12.349999999999));
  assert.ok(rendered.some(c => c.type === 'fill' && c.text === '+12.349999999999'));
  assert.ok(rendered.filter(c => c.type === 'fill').every(c => /13px/.test(c.font)));
  G.FX.update(0.62);
  assert.equal(G.FX.count, 0);

  const hidden = setup({ expanded: false, dmgNumbers: false });
  hidden.G.FX.dmgText(0, 0, 5);
  hidden.G.FX.dmgText(0, 0, '-5');
  hidden.G.FX.dmgText(0, 0, '+5');
  hidden.G.FX.dmgText(0, 0, '¡Muy eficaz!');
  assert.deepEqual(hidden.draw().filter(c => c.type === 'fill').map(c => c.text), ['+5', '¡Muy eficaz!']);
});

test('expanded numeric text respects the existing quality cap', () => {
  const { G } = setup({ quality: 0 });
  for (let i = 0; i < 40; i++) G.FX.dmgText(i, 0, i + 1);
  assert.equal(G.FX.count, 25);
});
test('expanded ignores non-finite numeric damage instead of painting invalid values',()=>{
 const{G,draw}=setup();for(const v of [Infinity,-Infinity,NaN,'1e999'])G.FX.dmgText(0,0,v);
 assert.equal(draw().filter(c=>c.type==='fill').length,0);
});

test('INC-VIS-001 older V2 entry compacts actual numbers and respects the damage setting too',()=>{
 const s=setup({expanded:false,mapEnabled:true});s.G.FX.dmgText(0,0,6.6000000000000005);
 assert.deepEqual(s.draw().filter(c=>c.type==='fill').map(c=>c.text),['6.6']);
 const hidden=setup({expanded:false,mapEnabled:true,dmgNumbers:false});hidden.G.FX.dmgText(0,0,'+6.6');hidden.G.FX.dmgText(0,0,'Cofre');
 assert.deepEqual(hidden.draw().filter(c=>c.type==='fill').map(c=>c.text),['Cofre']);
});
