const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const G = {
  LIFT: 18,
  U: { dist2: (x, y, a, b) => (x - a) ** 2 + (y - b) ** 2, norm(x, y) { const n = Math.hypot(x, y) || 1; return [x / n, y / n]; } },
  FX: { burst() {}, sp() {}, spark() {}, dmgText() {} },
  Camera: { sees: () => true },
  Types: { mult: () => 1, label: () => '' },
  Weather: { mult: () => 1 }
};
const sandbox = { G, Set, Map, Math, Object, Array, Number, performance: { now: () => 0 } };
vm.createContext(sandbox);
for (const file of ['js/entities/projectile.js', 'js/systems/combat.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), sandbox, { filename: file });
}

let enemies = [];
let props = [];
let wallX = Infinity;
G.EnemyMgr = { queryCircle(x, y, r) { return enemies.filter(e => Math.hypot(e.x - x, e.y - y) <= r + e.r); }, all: () => enemies };
G.World = {
  projectileBlock(x, y, r) {
    if (x >= wallX) return 'wall';
    return props.find(p => p.solid && Math.hypot(p.x - x, p.y - y) < r + p.r) || null;
  },
  propsInCircle(x, y, r) { return props.filter(p => p.destructible && Math.hypot(p.x - x, p.y - y) <= r + p.r); },
  damageProp(p, amount) { p.hp -= amount; }
};
const player = { fieldMode: true, dead: false, dmgDealt: 0, dealt: 0, onDealt(n) { this.dealt += n; }, hurt() {} };
function enemy(id, x, hp = 100) {
  return { id, x, y: 0, r: 5, hp, dead: false, hurt(n) { this.hp -= n; if (this.hp <= 0) this.dead = true; } };
}
function shot(x0, x1, options = {}) {
  return G.Projectiles.spawn({ x: x1, y: 0, px: x0, py: 0, dmg: 10, r: 2, pierce: 0, fieldWeapon: true,
    friendly: true, owner: player, hits: new Set(), phits: new Set(), color: '#fff', ...options });
}
function resolve() { G.Combat.resolve(0, player, 1); }

// First-entry distance, rather than array order or enemy center distance,
// chooses impacts when query results arrive shuffled.
G.Projectiles.clear(); enemies = [enemy('far', 72), enemy('near', 32)];
shot(0, 100); resolve();
assert.equal(enemies.find(e => e.id === 'near').hp, 90);
assert.equal(enemies.find(e => e.id === 'far').hp, 100, 'a zero-pierce shot stops at its first enemy');
assert.equal(player.dmgDealt, 10);
assert.equal(player.dealt, 10);

// Swept terrain collision catches endpoint-crossing shots and protects targets
// behind the first wall even when the endpoint is well past both.
G.Projectiles.clear(); wallX = 50; enemies = [enemy('behind', 54)];
shot(0, 100); resolve();
assert.equal(enemies[0].hp, 100, 'a target behind a wall takes no damage');
assert.equal(G.Projectiles.all().length, 0, 'the wall consumes the projectile');
wallX = Infinity;

// A destructible solid is an ordered impact and spends pierce budget before an
// enemy. With no extra impact budget, the enemy behind it stays untouched.
G.Projectiles.clear();
props = [{ id: 'rock', x: 30, y: 0, r: 6, hp: 100, solid: true, destructible: true }];
enemies = [enemy('after-rock', 70)]; shot(0, 100); resolve();
assert.equal(props[0].hp, 90);
assert.equal(enemies[0].hp, 100);
assert.equal(G.Projectiles.all().length, 0);

// Separate pellets have independent hit sets, so each may hit the same target.
G.Projectiles.clear(); props = []; enemies = [enemy('pellet-target', 35)];
shot(0, 60); shot(0, 60); resolve();
assert.equal(enemies[0].hp, 80);

// One extra impact pierces two enemies once each, in travel order. Revisiting
// the same enemy during the next step cannot consume another hit or deal damage.
G.Projectiles.clear();props=[];wallX=Infinity;
enemies=[enemy('first',30),enemy('second',70),enemy('third',110)];
const piercing=shot(0,50,{pierce:1});resolve();
assert.equal(enemies[0].hp,90);assert.equal(G.Projectiles.all().length,1);
piercing.px=25;piercing.x=90;resolve();
assert.equal(enemies[0].hp,90,'repeated overlap never hits the first enemy again');
assert.equal(enemies[1].hp,90);assert.equal(enemies[2].hp,100);
assert.equal(G.Projectiles.all().length,0);

// Even a projectile with ample extra impacts stops at the first wall, after
// spending one impact on a solid destructible, in distance order.
G.Projectiles.clear();wallX=90;
props=[{id:'box',x:45,y:0,r:6,hp:34,solid:true,destructible:true}];
enemies=[enemy('behind-wall',110),enemy('before-box',20),enemy('after-box',72)];
const ample=shot(0,140,{pierce:10});resolve();
assert.equal(props[0].hp,24);
assert.equal(enemies[0].hp,100);assert.equal(enemies[1].hp,90);assert.equal(enemies[2].hp,90);
assert.equal(ample.pierce,7);assert.equal(G.Projectiles.all().length,0);
assert.ok(Math.abs(ample.x-90)<.1,'impact visual remains at the blocking wall');

// With only one extra impact the first enemy and box exhaust the budget.
G.Projectiles.clear();wallX=Infinity;props[0].hp=34;
enemies=[enemy('after-box',72),enemy('before-box',20)];shot(0,140,{pierce:1});resolve();
assert.equal(enemies[0].hp,100);assert.equal(enemies[1].hp,90);assert.equal(props[0].hp,24);
assert.equal(G.Projectiles.all().length,0);

console.log('p04 collisions: ok');
