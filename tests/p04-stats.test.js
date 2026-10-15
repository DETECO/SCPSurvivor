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

const catalog = G.FieldCatalog;
assert.deepEqual(Object.keys(catalog.models).sort(), ['pistol', 'shotgun', 'smg']);
assert.deepEqual(Object.keys(catalog.mods).sort(), ['assisted', 'extended', 'grip', 'piercing', 'rapid', 'reinforced']);
assert.deepEqual(Object.keys(catalog.soldiers).sort(), ['guard', 'medic']);
const defs = { pistol: [10, .5, 12, 1.5, 320, 400, 4], smg: [6, .15, 24, 1.8, 280, 450, 12], shotgun: [6, .9, 6, 2.2, 180, 350, 30] };
for (const [model, expected] of Object.entries(defs)) {
  const w = catalog.makeWeapon(model, `${model}-a`);
  const s = G.FieldStats.weapon({}, w);
  assert.deepEqual([s.damage, s.interval, s.capacity, s.reloadTime, s.range, s.speed, s.spread], expected, `${model} base stats`);
}
assert.deepEqual(JSON.parse(JSON.stringify(catalog.defaultLoadout().map(w => [w.model, w.level]))), [['pistol', 1], ['smg', 1]]);
assert.equal(catalog.validateMods('shotgun', ['rapid']), false);
assert.equal(catalog.validateMods('pistol', ['grip', 'rapid', 'reinforced']), false);
assert.equal(catalog.validateMods('pistol', ['grip', 'grip']), false);
assert.equal(catalog.validateMods('pistol', ['grip', 'reinforced']), true);

const trained = { tempStats: {}, training: { health: 10, protection: 10, power: 10, cadence: 10,
  reload: 10, mobility: 10, collection: 10, learning: 10, recovery: 10, specialization: 10 } };
const ps = G.FieldStats.player(trained);
assert.equal(ps.maxHp, 150);
assert.equal(ps.spdMul, 1.2);
assert.equal(ps.dmgReduce, .2);
assert.equal(ps.cadenceReduction, .2);
assert.equal(ps.reloadReduction, .3);
assert.equal(ps.skillReduction, .3);
assert.equal(ps.powerBonus, .3);
assert.equal(ps.regenFlat, 1);
assert.equal(ps.magnet, 156);
assert.equal(ps.xpMul, 1.5);
assert.equal(G.FieldStats.player({ training: { mobility: 10 }, tempStats: { mobility: 99 } }).spdMul, 1.5);
assert.equal(G.FieldStats.player({ training: { protection: 10 }, tempStats: { protection: 99 } }).dmgReduce, .7);
assert.equal(G.FieldStats.player({ training: { cadence: 10 }, tempStats: { cadence: 99 } }).cadenceReduction, .6);
assert.equal(G.FieldStats.player({ training: { reload: 10 }, tempStats: { reload: 99 } }).reloadReduction, .3, 'reload has permanent training only');
assert.equal(G.FieldStats.player({ training: { specialization: 10 }, tempStats: { specialization: 99 } }).skillReduction, .3, 'specialization has permanent training only');
assert.equal(G.FieldStats.player({ training: { health: 10 }, tempStats: { health: 99 } }).maxHp, 350);
assert.equal(G.FieldStats.player({ training: { power: 10 }, tempStats: { power: 99 } }).powerBonus, 1.3);
assert.equal(G.FieldStats.player({ training: { recovery: 10 }, tempStats: { recovery: 99 } }).regenFlat, 5.5);
assert.equal(G.FieldStats.player({ training: { collection: 10 }, tempStats: { collection: 99 } }).magnet, 273);
assert.equal(G.FieldStats.player({ training: { learning: 10 }, tempStats: { learning: 99 } }).xpMul, 2.7);

const player = { hp: 80, maxHp: 100, tempStats: {}, training: { health: 0 }, fieldWeapons: [catalog.makeWeapon('pistol', 'weapon:p1')] };
G.FieldStats.apply(player);
assert.equal(player.maxHp, 100);
G.FieldUpgrades.candidates(player).find(c => c.key === 'health').apply(player);
assert.equal(player.maxHp, 120);
assert.equal(player.hp, 100, 'temporary health card grants +20 current and maximum HP');
const trainingHp = { hp: 80, maxHp: 100, training: { health: 1 }, tempStats: {} };
G.FieldStats.apply(trainingHp);
assert.equal(trainingHp.maxHp, 105);
assert.equal(trainingHp.hp, 85, 'permanent max-HP training grants its delta only');
const modded = catalog.makeWeapon('pistol', 'pistol-mod', ['extended', 'assisted']);
const modStats = G.FieldStats.weapon(player, modded);
assert.equal(modded.level, 1);
assert.equal(modStats.capacity, 18);
assert.equal(modStats.reloadTime, 1.5);
assert.ok(Math.abs(G.FieldStats.weapon({ tempStats: { power: 99 } }, catalog.makeWeapon('smg', 's', ['reinforced', 'piercing'])).damage - 12.3) < 1e-12);
const cappedTempo = G.FieldStats.player({ training: { cadence: 10, mobility: 10, protection: 10 }, tempStats: { cadence: 99, mobility: 99, protection: 99 } });
assert.equal(cappedTempo.cadenceReduction, .6);
assert.equal(cappedTempo.spdMul, 1.5);
assert.equal(cappedTempo.dmgReduce, .7);
assert.equal(G.FieldStats.weapon({ training: { cadence: 10 }, tempStats: { cadence: 99 } }, catalog.makeWeapon('pistol', 'fast', ['rapid'])).interval, .2, 'rapid mod plus max cadence training hits the combined 60% interval cap');
assert.deepEqual(JSON.parse(JSON.stringify(G.FieldStats.temporaryKeys.slice().sort())), ['cadence', 'collection', 'health', 'learning', 'mobility', 'power', 'protection', 'recovery']);

const pl = { hp: 100, maxHp: 100, tempStats: {}, training: {}, fieldWeapons: [catalog.makeWeapon('pistol', 'weapon:a'), catalog.makeWeapon('pistol', 'weapon:b')] };
const weaponCard = G.FieldUpgrades.candidates(pl).find(c => c.key === 'weapon:weapon:a');
assert.equal(weaponCard.w, 8);
weaponCard.apply(pl);
assert.equal(pl.fieldWeapons[0].level, 2);
assert.equal(pl.fieldWeapons[1].level, 1);
assert.equal(G.FieldUpgrades.candidates(pl).some(c => c.key === 'weapon:weapon:a'), true);
pl.fieldWeapons[0].level = 5;
assert.equal(G.FieldUpgrades.candidates(pl).some(c => c.key === 'weapon:weapon:a'), false);
const fullyCapped = { hp: 100, maxHp: 100, tempStats: { health: 10, power: 10, mobility: 10, cadence: 10,
  protection: 12, recovery: 5, collection: 5, learning: 10 },
  training: {}, fieldWeapons: [{ id: 'weapon:max', level: 5, model: 'pistol' }] };
assert.deepEqual(JSON.parse(JSON.stringify(G.FieldUpgrades.candidates(fullyCapped))), []);
console.log('p04 stats: ok');
