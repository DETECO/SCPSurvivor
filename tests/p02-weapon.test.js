const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const G = { LIFT: 18, U: { dist: (x,y,a,b) => Math.hypot(a-x,b-y), TYPE_COLOR: {} } };
const sandbox = { G, Set, Math, performance: { now: () => 0 } };
vm.createContext(sandbox);
for (const file of ['js/entities/projectile.js', 'js/systems/combat.js', 'js/systems/field-combat.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), sandbox, { filename: file });
}
const pl = { x: 0, y: 0, r: 10, aim: 0, dead: false, fieldMode: true, weaponLevel: 1,
  tempStats: { power: 0, mobility: 0, cadence: 0 }, hp: 100, hurt(n) { this.hp -= n; } };
let enemies = [];
G.EnemyMgr = { all: () => enemies, queryCircle: () => enemies };
G.World = { projectileBlock: () => null, propsInCircle: () => [] };
G.FX = { burst() {}, sp() {} };
G.Types = { mult: () => 1, label: () => '' };

G.FieldCombat.reset();
assert.equal(G.FieldCombat.getstate().ammo, 12, 'magazine starts full');
enemies = [{ id: 7, x: 100, y: 0, r: 5, dead: false, hurt() {} }];
G.FieldCombat.tick(0, pl, true);
const shot = G.Projectiles.all()[0];
assert.ok(shot, 'fires when a visible target is available');
assert.equal(shot.dmg, 10);
assert.equal(Math.round(Math.hypot(shot.vx, shot.vy)), 400);
assert.equal(shot.pierce, 0);
assert.ok(shot.hits instanceof Set);
assert.equal(G.FieldCombat.getstate().ammo, 11);

// Resolve through the real combat system and verify damage reaches an enemy.
let damage = 0;
enemies = [{ id: 7, x: 9, y: 0, r: 5, dead: false, bodyH: 10,
  hurt(n) { damage += n; }, applyBurn(){}, applyPoison(){}, applySlow(){} }];
G.EnemyMgr.queryCircle = () => enemies;
G.Combat.resolve(0.01, Object.assign(pl, { dmgDealt: 0, onDealt() {} }), 1);
assert.equal(damage, 10, 'real Combat.resolve applies pistol damage');
assert.equal(pl.hp, 100, 'field mode skips legacy enemy contact damage');

// Empty magazine reloads automatically and restores twelve rounds.
for (let i = 0; i < 11; i++) G.FieldCombat.tick(0.5, pl, true);
assert.equal(G.FieldCombat.getstate().ammo, 0);
assert.equal(G.FieldCombat.getstate().reload, 1.5);
G.FieldCombat.tick(1.5, pl, false);
assert.equal(G.FieldCombat.getstate().ammo, 12);

// Threat selection, wall occlusion and no-ammo-cost idle behavior.
G.Projectiles.clear(); G.FieldCombat.reset();
enemies = [{ id: 1, x: 200, y: 0, r: 5, dead: false, hurt() {} }];
G.World.projectileBlock = (x) => x > 80 ? 'wall' : null;
G.FieldCombat.tick(0, pl, true);
assert.equal(G.Projectiles.all().length, 0, 'wall blocks line of sight');
assert.equal(G.FieldCombat.getstate().ammo, 12);
G.World.projectileBlock = () => null; enemies = [];
G.FieldCombat.tick(0, pl, true);
assert.equal(G.Projectiles.all().length, 0, 'no target means no shot');
assert.equal(G.FieldCombat.getstate().ammo, 12);

G.FieldCombat.reset();
pl.tempStats = { power: 0, mobility: 0, cadence: 100 };
pl.weaponLevel = 1;
assert.equal(G.FieldCombat.sprint(pl), true);
assert.equal(G.FieldCombat.getstate().sprintRemaining, 2);
assert.equal(G.FieldCombat.sprint(pl), false, 'cannot reactivate during sprint');
enemies = [{ id: 8, x: 100, y: 0, r: 5, dead: false, hurt() {} }];
G.FieldCombat.tick(0, pl, true);
assert.equal(pl.spdMul, 1.6, 'sprint changes player movement multiplier');
assert.ok(Math.abs(Math.hypot(G.Projectiles.all()[0].vx, G.Projectiles.all()[0].vy) - 400) < 1e-9,
  'sprint does not change projectile speed');
assert.ok(G.FieldCombat.state, 'state getter is available');
assert.equal(G.FieldCombat.getstate().shotWait, 0.2, 'cadence bonus is capped at 60%');
G.FieldCombat.tick(2, pl, false);
pl.tempStats.mobility = 0;
G.FieldCombat.tick(0, pl, false);
assert.equal(pl.spdMul, 1, 'movement multiplier returns to baseline when sprint ends');
assert.equal(G.FieldCombat.getstate().sprintCooldown, 18);
pl.tempStats.mobility = 100;
G.FieldCombat.tick(0, pl, false);
assert.equal(pl.spdMul, 1.5, 'mobility movement bonus caps at 50%');
G.Projectiles.clear(); pl.dead = true; G.FieldCombat.tick(1, pl, true);
assert.equal(G.Projectiles.all().length, 0, 'dead player cannot fire');

console.log('p02 weapon: ok');
