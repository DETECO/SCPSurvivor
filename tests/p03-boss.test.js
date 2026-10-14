const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function setup() {
  const calls = [];
  const G = {
    U: { norm(x, y) { const d = Math.hypot(x, y) || 1; return [x / d, y / d]; } },
    World: { projectileBlock: () => null, collide: () => false },
    Path: { dirFor: () => null },
    Sprites: { dirFromAngle: () => 0 },
    EnemyMgr: { count: 1 },
    Expedition: { summon(e, n) { calls.push(n); e.minions.push(...Array.from({ length: n }, () => ({ hp: 1, dead: false }))); } },
    FX: { ring() {} }
  };
  vm.runInNewContext(fs.readFileSync(require.resolve('../js/systems/containment-boss.js'), 'utf8'), { G, Math });
  const e = { x: 0, y: 0, r: 22, hp: 600, maxHp: 600, spd: 45, dmg: 30, flying: false, minions: [], anim: { update() {}, loop() {}, play() {} } };
  const pl = { x: 50, y: 0, r: 12, dead: false, hits: [], hurt(n) { this.hits.push(n); } };
  return { G, e, pl, calls };
}

test('boss telegraph snapshots its center, stops to strike, and damages only at warning end', () => {
  const { G, e, pl } = setup();
  G.ContainmentBoss.tick(e, 0.01, pl);
  assert.equal(e.bossWarn, 0.85);
  const x = e.x;
  G.ContainmentBoss.tick(e, 0.84, pl);
  assert.equal(pl.hits.length, 0);
  assert.equal(e.x, x);
  G.ContainmentBoss.tick(e, 0.01, pl);
  assert.deepEqual(pl.hits, [30]);
  assert.equal(e.bossCd, 2.5);
});

test('the strike does not damage through a wall and respects cooldown', () => {
  const { G, e, pl } = setup();
  G.ContainmentBoss.tick(e, 0.01, pl);
  G.World.projectileBlock = () => 'wall';
  G.ContainmentBoss.tick(e, 0.85, pl);
  assert.equal(pl.hits.length, 0);
  G.ContainmentBoss.tick(e, 2.49, pl);
  assert.equal(e.bossWarn, 0);
  G.ContainmentBoss.tick(e, 0.01, pl);
  assert.ok(e.bossWarn > 0);
});

test('low health movement enrage is 15 percent and does not compound', () => {
  const { G, e, pl } = setup();
  pl.x = 1000; e.hp = 299;
  G.ContainmentBoss.tick(e, 1, pl);
  assert.ok(Math.abs(e.x - 51.75) < 1e-9);
  G.ContainmentBoss.tick(e, 1, pl);
  assert.ok(Math.abs(e.x - 103.5) < 1e-9);
});

test('boss keeps approaching outside its AoE reach and enrage starts strictly below half health', () => {
  const { G, e, pl } = setup();
  pl.x = 500; e.hp = 300;
  G.ContainmentBoss.tick(e, 1, pl);
  assert.equal(e.x, 45);
  assert.equal(e.bossWarn || 0, 0);
  e.hp = 299;
  G.ContainmentBoss.tick(e, 1, pl);
  assert.ok(Math.abs(e.x - 96.75) < 1e-9);
});

test('summons use an eight second timer and one second cue, bounded by living minions and global cap', () => {
  const { G, e, pl, calls } = setup();
  pl.x = 1000;
  G.ContainmentBoss.tick(e, 8, pl);
  assert.equal(calls.length, 0);
  assert.equal(e.bossSummonWarn, 1);
  G.ContainmentBoss.tick(e, 0.99, pl);
  assert.equal(calls.length, 0);
  G.ContainmentBoss.tick(e, 0.01, pl);
  assert.deepEqual(calls, [2]);
  e.minions.push({ hp: 1, dead: false });
  G.ContainmentBoss.tick(e, 8, pl);
  G.ContainmentBoss.tick(e, 0.99, pl);
  G.ContainmentBoss.tick(e, 0.01, pl);
  assert.deepEqual(calls, [2, 1]);
  G.EnemyMgr.count = 64;
  G.ContainmentBoss.tick(e, 8, pl);
  assert.equal(e.bossSummonWarn || 0, 0);
});

test('dead boss frames do not advance or issue pending summons', () => {
  const { G, e, pl, calls } = setup();
  e.dead = true; e.fade = 1; e.bossSummonT = 7.5; e.bossSummonWarn = 0.5;
  G.ContainmentBoss.tick(e, 10, pl);
  assert.equal(e.fade, -9);
  assert.equal(e.bossSummonT, 7.5);
  assert.equal(e.bossSummonWarn, 0.5);
  assert.deepEqual(calls, []);
});
