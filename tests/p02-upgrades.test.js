const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const G = {};
const sandbox = { G, Math, Object, Array, Number, Map };
vm.createContext(sandbox);
for (const file of ['js/data/field-catalog.js', 'js/systems/field-stats.js', 'js/systems/field-upgrades.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), sandbox, { filename: file });
}
function player(overrides = {}) {
  return Object.assign({ hp: 80, maxHp: 100, baseMaxHp: 100, tempStats: {}, training: {},
    fieldWeapons: G.FieldCatalog.defaultLoadout() }, overrides);
}
const p = player({ hp: 100 });
const cards = G.FieldUpgrades.offer(p);
assert.equal(cards.length, 3, 'offers up to three available cards');
assert.equal(new Set(cards.map(c => c.key)).size, 3, 'cards are distinct');
for (const card of cards) assert.equal(typeof card.apply, 'function');
assert.ok(G.FieldUpgrades.candidates(p).some(c => c.key === 'health'));
assert.ok(!G.FieldUpgrades.candidates(p).some(c => c.key === 'heal'), 'healing card excluded at full health');

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
assert.equal(p.magnet, 101.4);
apply('learning', p);
assert.equal(p.xpMul, 1.12);

const capped = player({ tempStats: { health: 0, power: 0, mobility: 99, cadence: 99,
  protection: 99, recovery: 0, collection: 0, learning: 0, reload: 99, specialization: 99 } });
const cappedKeys = G.FieldUpgrades.candidates(capped).map(c => c.key);
for (const key of ['mobility', 'cadence', 'protection', 'reload', 'specialization']) assert.ok(!cappedKeys.includes(key));
const partial = player({ training: { cadence: 10 }, tempStats: { cadence: 4.5 } });
const partialCard = G.FieldUpgrades.candidates(partial).find(c => c.key === 'cadence');
partialCard.apply(partial);
assert.ok(Math.abs(partial.tempStats.cadence - 5) < 1e-12, 'card grants only the half-stack remaining under combined cap');
assert.ok(Math.abs(partial.cdMul - .4) < 1e-12);
const partialMobility = player({ training: { mobility: 10 }, tempStats: { mobility: 4 } });
const partialMobilityCard = G.FieldUpgrades.candidates(partialMobility).find(c => c.key === 'mobility');
assert.equal(partialMobilityCard.desc, '+2% de velocidad (tope combinado +50%).', 'description reports the actual partial grant');
partialMobilityCard.apply(partialMobility);
assert.ok(Math.abs(partialMobility.spdMul - 1.5) < 1e-12);

const hurt = player({ hp: 10 });
apply('heal', hurt);
assert.equal(hurt.hp, 55, 'heals 45% of max HP without exceeding max');
const injured = player({ hp: 80 });
apply('health', injured);
assert.equal(injured.maxHp, 120);
assert.equal(injured.hp, 100, 'temporary Vitality grants +20 current and maximum HP');

const twins = player({ hp: 100, fieldWeapons: [G.FieldCatalog.makeWeapon('pistol', 'weapon:a'), G.FieldCatalog.makeWeapon('pistol', 'weapon:b')] });
const card = G.FieldUpgrades.candidates(twins).find(c => c.key === 'weapon:weapon:a');
assert.equal(card.w, 8);
const weaponCards = G.FieldUpgrades.candidates(twins).filter(c => c.key.startsWith('weapon:'));
assert.deepEqual(JSON.parse(JSON.stringify(weaponCards.map(c => c.title))), ['Arma 1: Pistola', 'Arma 2: Pistola'], 'duplicate models are distinguished by physical slot');
card.apply(twins);
assert.equal(twins.fieldWeapons[0].level, 2);
assert.equal(twins.fieldWeapons[1].level, 1, 'weapon level is tied to one physical copy');
twins.fieldWeapons[0].level = 5;
assert.equal(G.FieldUpgrades.candidates(twins).some(c => c.key === 'weapon:weapon:a'), false);
const empty = player({ hp: 100, tempStats: { health: 10, power: 10, mobility: 10, cadence: 10,
  protection: 12, recovery: 5, collection: 5, learning: 10 },
  fieldWeapons: [{ id: 'weapon:max', level: 5, model: 'pistol' }] });
assert.deepEqual(JSON.parse(JSON.stringify(G.FieldUpgrades.candidates(empty))), []);
console.log('p02 upgrades: migrated to field API ok');
