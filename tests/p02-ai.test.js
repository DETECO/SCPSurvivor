const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function setup() {
  const hits = [];
  const G = {
    U: { dist: (x, y, a, b) => Math.hypot(a - x, b - y), norm: (x, y) => { const d = Math.hypot(x, y) || 1; return [x / d, y / d]; } },
    Sprites: { dirFromAngle: () => 0 },
    Path: { dirFor: () => null }, World: { collide: () => false, projectileBlock: () => null },
    FX: { ring: () => {} }
  };
  vm.runInNewContext(fs.readFileSync(require.resolve('../js/systems/containment-ai.js'), 'utf8'), { G, Math });
  const e = { x: 0, y: 0, r: 10, spd: 0, dmg: 7.5, flying: true, dead: false, fade: 0, flash: 0, bob: 0,
    anim: { update() {}, loop() {}, play() {} } };
  const pl = { x: 15, y: 0, r: 10, hurt: (...args) => hits.push(args) };
  return { G, e, pl, hits };
}

test('el aviso de alcance detiene y fija dirección sin daño durante 0.6 s', () => {
  const { G, e, pl, hits } = setup();
  G.ContainmentAI.tick(e, 0.1, pl);
  assert.equal(e.pursuerWarn, 0.6);
  assert.deepEqual(hits, []);
  pl.x = -100;
  G.ContainmentAI.tick(e, 0.59, pl);
  assert.deepEqual(hits, []);
  assert.ok(Math.abs(e.pursuerWarn - 0.01) < 1e-9);
  G.ContainmentAI.tick(e, 0.01, pl);
  assert.deepEqual(hits, []);
});

test('golpea solo al cierre del aviso dentro del alcance y respeta cooldown', () => {
  const { G, e, pl, hits } = setup();
  G.ContainmentAI.tick(e, 0.11, pl);
  G.ContainmentAI.tick(e, 0.61, pl);
  assert.equal(hits.length, 1);
  assert.equal(hits[0][0], 7.5);
  assert.equal(e.pursuerCd, 1.5);
  G.ContainmentAI.tick(e, 1, pl);
  assert.equal(hits.length, 1);
  G.ContainmentAI.tick(e, 0.5, pl);
  G.ContainmentAI.tick(e, 0.6, pl);
  assert.equal(hits.length, 2);
});

test('un golpe esquivado conserva cooldown y comprueba el cono frontal', () => {
  const { G, e, pl, hits } = setup();
  G.ContainmentAI.tick(e, 0.1, pl);
  pl.x = 0; pl.y = 15; // gira más de 60 grados desde el rumbo fijado
  G.ContainmentAI.tick(e, 0.6, pl);
  assert.equal(hits.length, 0);
  assert.equal(e.pursuerCd, 1.5);
  pl.x = 15; pl.y = 0;
  G.ContainmentAI.tick(e, 1.4, pl);
  assert.equal(e.pursuerWarn, 0);
  G.ContainmentAI.tick(e, 0.11, pl);
  G.ContainmentAI.tick(e, 0.61, pl);
  assert.equal(hits.length, 1);
  assert.equal(e.pursuerCd, 1.5);
});

test('bloqueo de mundo cancela golpe', () => {
  const { G, e, pl, hits } = setup();
  G.World.projectileBlock = () => 'wall';
  G.ContainmentAI.tick(e, 0.1, pl);
  G.ContainmentAI.tick(e, 0.6, pl);
  assert.equal(hits.length, 0);
  assert.equal(e.pursuerCd, 1.5);
});

test('Enemy conserva HP y daño fraccionarios de containment y escala spd/dmg', () => {
  const G = {
    DEX_BY: { pursuer01: { name: 'Perseguidor', types: ['normal'] } },
    Sprites: { Animator: function () { this.busy = () => false; this.play = () => {}; }, bodyRadius: () => 8, bodyHeight: () => 20, hovers: () => false },
    U: { rand: () => 1, norm: (x, y) => [x, y] },
    FX: { dmgText() {}, spark() {}, burst() {}, ring() {} }, Audio: { sfx() {} },
    Coop: { isHost: false },
  };
  vm.runInNewContext(fs.readFileSync(require.resolve('../js/entities/enemy.js'), 'utf8'), { G, Math });
  const e = new G.Enemy({ dex: 'pursuer01', name: 'Perseguidor', hp: 30.5, spd: 60, dmg: 10, xp: 14, behavior: 'pursuer', containment: true }, 0, 0,
    { hp: 1.1, spd: 1.2, dmg: 1.25 });
  assert.equal(e.maxHp, 33.550000000000004);
  assert.equal(e.spd, 72);
  assert.equal(e.dmg, 12.5);
  e.hurt(1.25);
  assert.equal(e.hp, 32.300000000000004);
});
