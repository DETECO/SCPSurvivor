const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const G = {};
const sandbox = { G, Math, Object, Array, Number };
vm.createContext(sandbox);
for (const file of ['js/systems/field-stats.js', 'js/systems/field-abilities.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), sandbox, { filename: file });
}

const guard = { soldierId: 'guard', hp: 100, maxHp: 100, training: {}, fieldCombat: { shotWait: .4, weapons: [{ reload: .5 }] } };
G.FieldAbilities.reset(guard);
assert.deepEqual({ ...G.FieldAbilities.state(guard) }, { kind: 'sprint', remaining: 0, cooldown: 0, duration: 2, maxCooldown: 20 });
assert.equal(G.FieldAbilities.use(guard, 'levelup'), false);
assert.equal(G.FieldAbilities.use(guard, 'exploration'), true);
assert.equal(guard.spdMul, 1.6);
assert.deepEqual([G.FieldAbilities.state(guard).remaining, G.FieldAbilities.state(guard).cooldown], [2, 20]);
G.FieldAbilities.tick(0.5, guard);
assert.equal(guard.spdMul, 1.6);
assert.equal(G.FieldAbilities.state(guard).remaining, 1.5);
assert.equal(G.FieldAbilities.state(guard).cooldown, 19.5);
assert.equal(guard.fieldCombat.shotWait, .4);
assert.equal(guard.fieldCombat.weapons[0].reload, .5);
// Infinite exit clock freezes recovery, while an active effect must still expire.
G.MapTrial={infinite:true};G.Expedition={state:{v2:{spawnClosed:true}}};
const frozenCooldown=G.FieldAbilities.state(guard).cooldown;
G.FieldAbilities.tick(.5,guard);
assert.equal(G.FieldAbilities.state(guard).cooldown,frozenCooldown);
assert.equal(G.FieldAbilities.state(guard).remaining,1);
delete G.MapTrial;delete G.Expedition;
G.FieldAbilities.tick(1.5, guard);
assert.equal(guard.spdMul, 1);
assert.equal(G.FieldAbilities.sprint(guard), false);

const specialist = { soldierId: 'guard', hp: 100, maxHp: 100, training: { specialization: 10 } };
G.FieldAbilities.reset(specialist);
G.FieldAbilities.sprint(specialist);
assert.equal(G.FieldAbilities.state(specialist).maxCooldown, 14);
assert.equal(G.FieldAbilities.state(specialist).cooldown, 14);
specialist.training.specialization = 0;
assert.equal(G.FieldAbilities.state(specialist).cooldown, 14, 'activation snapshots its reduced cooldown');
// Hypothetical cap contract only: temporary specialization is not currently an approved upgrade.
const realStats = G.FieldStats;
G.FieldStats = { player: () => ({ maxHp: 100, skillReduction: .6 }), apply(pl, options = {}) { pl.spdMul = 1 + (options.sprintBonus || 0); } };
const capped = { soldierId: 'guard', hp: 100, maxHp: 100 };
G.FieldAbilities.reset(capped);
G.FieldAbilities.sprint(capped);
assert.equal(G.FieldAbilities.state(capped).maxCooldown, 8, 'mocked sixty-percent combined cap');
G.FieldStats = realStats;

const medic = { soldierId: 'medic', hp: 70, maxHp: 100, training: {} };
G.FieldAbilities.reset(medic);
assert.equal(G.FieldAbilities.use(medic, 'exploration'), false);
assert.equal(medic.hp, 70);
assert.equal(G.FieldAbilities.use(medic, 'combat'), true);
assert.equal(medic.hp, 100);
assert.equal(G.FieldAbilities.state(medic).cooldown, 30);
assert.equal(G.FieldAbilities.use(medic, 'combat'), false);
G.FieldAbilities.tick(30, medic);
medic.hp = 100;
assert.equal(G.FieldAbilities.use(medic, 'preparation'), false);
assert.equal(G.FieldAbilities.state(medic).cooldown, 0);
medic.hp = 50;
assert.equal(G.FieldAbilities.use(medic, 'boss'), true);
assert.equal(medic.hp, 80);
assert.equal(G.FieldAbilities.use(medic, 'extracting'), false);
assert.equal(G.FieldAbilities.use({ soldierId: 'medic', hp: 0, maxHp: 100 }, 'combat'), false);

const trainedMedic = { soldierId: 'medic', hp: 50, maxHp: 100, training: { specialization: 10 } };
G.FieldAbilities.reset(trainedMedic);
G.FieldAbilities.use(trainedMedic, 'preparation');
assert.equal(G.FieldAbilities.state(trainedMedic).maxCooldown, 21);
assert.equal(G.FieldAbilities.state(trainedMedic).cooldown, 21);
G.FieldAbilities.tick(3, trainedMedic);
assert.equal(G.FieldAbilities.state(trainedMedic).cooldown, 18);
assert.equal(G.FieldAbilities.state(trainedMedic).kind, 'heal', 'tick preserves ability state across sector changes');

const deadGuard = { soldierId: 'guard', hp: 0, maxHp: 100 };
G.FieldAbilities.reset(deadGuard);
assert.equal(G.FieldAbilities.sprint(deadGuard), false);

console.log('P04 abilities: ok');
