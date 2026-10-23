const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function setup({ mode = '32', enabled = true, calm = true } = {}) {
  const ops = [];
  const ctx = {
    globalAlpha: 0.72,
    save() { this.stack.push(this.globalAlpha); ops.push(['save']); },
    restore() { this.globalAlpha = this.stack.pop(); ops.push(['restore']); },
    stack: [],
    translate(...args) { ops.push(['translate', ...args]); },
    beginPath() { ops.push(['begin']); },
    moveTo(...args) { ops.push(['move', ...args]); },
    lineTo(...args) { ops.push(['line', ...args]); },
    closePath() { ops.push(['close']); },
    ellipse(...args) { ops.push(['ellipse', ...args]); },
    fill() { ops.push(['fill', this.fillStyle]); },
    stroke() { ops.push(['stroke', this.strokeStyle, this.lineWidth]); },
    fillRect(...args) { ops.push(['rect', this.fillStyle, ...args]); },
    strokeText(...args) { ops.push(['strokeText', this.strokeStyle, ...args]); },
    fillText(...args) { ops.push(['text', this.fillStyle, ...args]); }
  };
  const G = {
    TrialVisuals: { enabled, mode },
    Settings: { get(key) { return key === 'calm' && calm; } }
  };
  const context = vm.createContext({ G, Math, Number, performance: { now: () => 1000 } });
  vm.runInContext(fs.readFileSync(require.resolve('../js/ui/rift-visuals.js'), 'utf8'), context);
  return { G, ctx, ops };
}

function openState(overrides = {}) {
  return { status: 'open', remaining: 45, x: 1480, y: 920, sector: 3, alert: 'unchanged', result: null, ...overrides };
}

function visualSignature(ops) {
  return ops.filter(op => op[0] === 'fill' || op[0] === 'stroke' || op[0] === 'rect')
    .map(op => op.slice(0, 2).join(':')).join('|');
}

test('all six approved styles render distinct Canvas primitives without mutating rift state', () => {
  const { G, ctx, ops } = setup();
  const state = openState();
  const before = JSON.stringify(state);
  const signatures = new Set();

  for (let style = 1; style <= 6; style++) {
    ops.length = 0;
    assert.equal(G.RiftVisuals.draw(ctx, state, 1, style), true);
    assert.equal(ctx.globalAlpha, 0.72);
    assert.equal(JSON.stringify(state), before);
    signatures.add(visualSignature(ops));
  }

  assert.equal(signatures.size, 6);
  assert(ops.some(op => op[0] === 'text' && op[2] === 'GRIETA · 45 s'));
});

test('style selection is repeatable and ignores danger or hazard metadata', () => {
  const { G, ctx, ops } = setup({ mode: '16' });
  const a = openState({ dangerTier: 5, hazard: 'warden', enemy: 'boss' });
  const b = openState({ dangerTier: 1, hazard: 'minor', enemy: 'none' });

  assert.equal(G.RiftVisuals.draw(ctx, a, 2), true);
  const first = visualSignature(ops);
  ops.length = 0;
  assert.equal(G.RiftVisuals.draw(ctx, b, 2), true);
  assert.equal(visualSignature(ops), first);
});

test('native 16/32 modes draw open and active states; legacy modes and disabled visuals fall back', () => {
  for (const mode of ['16', '32']) {
    const { G, ctx } = setup({ mode });
    assert.equal(G.RiftVisuals.draw(ctx, openState()), true);
    assert.equal(G.RiftVisuals.draw(ctx, openState({ status: 'active', remaining: 0 })), true);
  }
  for (const options of [
    { mode: 'v1', enabled: true },
    { mode: 'clasicos', enabled: true },
    { mode: '32', enabled: false }
  ]) {
    const { G, ctx, ops } = setup(options);
    assert.equal(G.RiftVisuals.draw(ctx, openState()), false);
    assert.deepEqual(ops, []);
  }
});

test('closed, resolved, and idle rifts remain on the legacy renderer and stay unchanged', () => {
  const { G, ctx, ops } = setup();
  for (const status of ['idle', 'closed', 'resolved']) {
    const state = openState({ status, remaining: 0 });
    const before = JSON.stringify(state);
    ops.length = 0;
    assert.equal(G.RiftVisuals.draw(ctx, state), false);
    assert.deepEqual(ops, []);
    assert.equal(JSON.stringify(state), before);
  }
});

test('QA style override changes only the rendered appearance and calm settings suppress the pulse', () => {
  const { G, ctx, ops } = setup({ calm: true });
  const state = openState();
  const before = JSON.stringify(state);
  assert.equal(G.RiftVisuals.draw(ctx, state, 30, 4), true);
  assert.equal(ctx.globalAlpha, 0.72);
  assert.equal(JSON.stringify(state), before);
  assert(ops.some(op => op[0] === 'text' && op[2] === 'GRIETA · 45 s'));
});
