const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function setup() {
  const shots = [];
  let blocked = false;
  const G = {
    U: {
      dist: (x, y, a, b) => Math.hypot(a - x, b - y),
      norm: (x, y) => { const d = Math.hypot(x, y) || 1; return [x / d, y / d]; }
    },
    Sprites: { dirFromAngle: () => 0 },
    Camera: { sees: () => true },
    Path: { dirFor: () => null },
    World: { collide: () => false, projectileBlock: () => blocked ? 'wall' : null },
    Projectiles: { spawn: shot => { shots.push(shot); return shot; } },
    FX: { ring() {} }
  };
  vm.runInNewContext(fs.readFileSync(require.resolve('../js/systems/biological-ai.js'), 'utf8'), { G, Math });
  const e = { x: 0, y: 0, r: 14, spd: 50, dmg: 12, dead: false, flash: 0, bob: 0,
    anim: { update() {}, loop() {}, play() {} } };
  const pl = { x: 220, y: 0, r: 10 };
  return { G, e, pl, shots, block: value => { blocked = value; } };
}

test('biological shot has a visible fixed-aim warning before firing', () => {
  const { G, e, pl, shots } = setup();
  G.BiologicalAI.tick(e, 0.1, pl);
  assert.equal(e.bioWarn, 0.6);
  assert.equal(shots.length, 0);
  const x = e.x, y = e.y;
  pl.x = 220; pl.y = 100; // dodges after the aim has been telegraphed
  G.BiologicalAI.tick(e, 0.6, pl);
  assert.equal(shots.length, 1);
  assert.equal(shots[0].friendly, false);
  assert.equal(shots[0].homing, 0);
  assert.equal(shots[0].x, x); assert.equal(shots[0].y, y);
  assert.ok(shots[0].vx > 0);
  assert.ok(Math.abs(shots[0].vy) < 1e-9, 'shot retains the original direction');
  assert.equal(shots[0].dmg, 12);
  assert.equal(shots[0].r, 5);
  assert.ok(Math.abs(shots[0].life - 260 / 190) < 1e-9);
});

test('cooldown starts on firing even when the aimed shot misses', () => {
  const { G, e, pl, shots } = setup();
  G.BiologicalAI.tick(e, 0.1, pl);
  pl.y = 80;
  G.BiologicalAI.tick(e, 0.6, pl);
  assert.equal(shots.length, 1);
  assert.equal(e.bioCd, 2.2);
  G.BiologicalAI.tick(e, 2.19, pl);
  assert.equal(shots.length, 1);
  G.BiologicalAI.tick(e, 0.01, pl);
  assert.equal(e.bioWarn, 0.6);
});

test('offscreen enemies do not acquire or fire', () => {
  const { G, e, pl, shots } = setup();
  G.Camera.sees = () => false;
  G.BiologicalAI.tick(e, 1, pl);
  assert.equal(e.bioWarn || 0, 0);
  assert.equal(shots.length, 0);
});

test('wall blocks both warning acquisition and a shot during the warning', () => {
  const { G, e, pl, shots, block } = setup();
  block(true);
  G.BiologicalAI.tick(e, 0.1, pl);
  assert.equal(e.bioWarn || 0, 0);
  block(false);
  G.BiologicalAI.tick(e, 0.1, pl);
  block(true);
  G.BiologicalAI.tick(e, 0.6, pl);
  assert.equal(shots.length, 0);
  assert.equal(e.bioCd || 0, 0);
});
