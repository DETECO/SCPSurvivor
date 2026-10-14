const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const G = { U: { pickN(arr, n) {
  const copy = arr.slice(), out = [];
  while (out.length < n && copy.length) out.push(copy.splice(Math.floor(Math.random() * copy.length), 1)[0]);
  return out;
} } };
const sandbox = { G, Math };
vm.createContext(sandbox);
const file = 'js/systems/field-upgrades.js';
vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), sandbox, { filename: file });

function player(overrides = {}) {
  return Object.assign({ hp: 80, maxHp: 100, atkMul: 1, spdMul: 1, cdMul: 1,
    dmgReduce: 0, regenFlat: 0, magnet: 78, xpMul: 1, weaponLevel: 1,
    tempStats: { health: 0, power: 0, mobility: 0, cadence: 0, protection: 0,
      recovery: 0, collection: 0, learning: 0 },
    addMaxHp(n) { this.maxHp += n; this.hp += n; },
    heal(n) { this.hp = Math.min(this.maxHp, this.hp + n); }
  }, overrides);
}

const p = player({ hp: 100 });
const cards = G.FieldUpgrades.offer(p);
assert.equal(cards.length, 3, 'offers three cards');
assert.equal(new Set(cards.map(c => c.key)).size, 3, 'cards are distinct');
for (const card of cards) {
  assert.equal(typeof card.title, 'string');
  assert.equal(typeof card.desc, 'string');
  assert.equal(typeof card.apply, 'function');
}

const catalog = G.FieldUpgrades.candidates(p);
assert.ok(catalog.some(c => c.key === 'health'));
assert.ok(catalog.some(c => c.key === 'weapon'));
assert.ok(!catalog.some(c => c.key === 'heal'), 'healing card excluded at full health');

function apply(key, pl) {
  const card = G.FieldUpgrades.candidates(pl).find(c => c.key === key);
  assert.ok(card, `${key} is eligible`);
  card.apply(pl);
}
apply('power', p); apply('power', p);
assert.equal(p.tempStats.power, 2);
assert.equal(p.atkMul, 1.2, 'power stacks additively from base');
apply('mobility', p);
assert.equal(p.spdMul, 1.07);
apply('cadence', p);
assert.equal(p.cdMul, 0.92);
apply('protection', p);
assert.equal(p.dmgReduce, 0.06);
apply('recovery', p);
assert.equal(p.regenFlat, 0.9);
apply('collection', p);
assert.equal(p.magnet, 78 * 1.3);
apply('learning', p);
assert.equal(p.xpMul, 1.12);
apply('weapon', p);
assert.equal(p.weaponLevel, 2);

const capped = player({ tempStats: { health: 0, power: 0, mobility: 8, cadence: 8,
  protection: 12, recovery: 0, collection: 0, learning: 0 }, spdMul: 1.5, cdMul: 0.4,
  dmgReduce: 0.7, weaponLevel: 5 });
const cappedKeys = G.FieldUpgrades.candidates(capped).map(c => c.key);
assert.ok(!cappedKeys.includes('mobility'));
assert.ok(!cappedKeys.includes('cadence'));
assert.ok(!cappedKeys.includes('protection'));
assert.ok(!cappedKeys.includes('weapon'));

const hurt = player({ hp: 10 });
apply('heal', hurt);
assert.equal(hurt.hp, 55, 'heals 45% of max HP without exceeding max');
const injured = player({ hp: 80 });
apply('health', injured);
assert.equal(injured.maxHp, 120);
assert.equal(injured.hp, 100, 'max HP increase also restores same amount');

console.log('p02 upgrades: ok');
