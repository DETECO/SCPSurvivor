const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

function setup() {
  const G = {};
  const context = vm.createContext({ G, Math, Number, Set, Map, Object, Array, Error });
  const file = path.join(__dirname, '../js/systems/weapon-revision-r1.js');
  vm.runInContext(fs.readFileSync(file, 'utf8'), context, { filename: file });
  return G.WeaponRevisionR1;
}

function plain(value) {
  return JSON.parse(JSON.stringify(value));
}

function makePoseValidation() {
  return {
    status: 'validated', pair: ['CC04', 'TE01'], evidenceId: 'fixture-only',
    resolutions: [16, 32], directions: ['E', 'SE', 'S', 'SW', 'W', 'NW', 'N', 'NE'],
    actors: ['guardia', 'medico'], layout: 'one-arm-per-weapon'
  };
}

function makeFusionRun(R, poseValidation = makePoseValidation()) {
  const run = R.createRun({ id: 'run-test', startingModel: 'CC04', fusionPractice: true, fusionPoseValidation: poseValidation });
  const reward = R.claimReward(run, { rewardId: 'boss-secondary', model: 'TE01' });
  assert.equal(reward.outcome, 'acquired');
  for (const copy of run.weapons) {
    for (let i = 0; i < 5; i++) assert.equal(R.advanceCopy(run, copy.id).ok, true);
  }
  R.enterMap(run, 2);
  return run;
}

test('AF01, CC04 and TE01 expose only the approved trial profiles; F24 is fusion-only', () => {
  const R = setup();
  assert.deepEqual(plain(Object.keys(R.models).sort()), ['AF01', 'CC04', 'F24', 'TE01']);
  assert.equal(R.REVISION, 'LOT-EST-002-r1');
  assert.deepEqual(plain(R.models.AF01.base), {
    damage: 10, interval: 0.5, magazine: 12, reloadTime: 1.5, range: 320
  });
  assert.deepEqual(plain(R.models.CC04.base), {
    damage: 14, interval: 0.8, range: 72, arcDegrees: 140, maxTargets: 4,
    magazine: null, reloadTime: null
  });
  assert.deepEqual(plain(R.models.TE01.base), {
    damage: 14, interval: 0.8, emissionDuration: 0.12, range: 288,
    targetLimit: 1, magazine: null, reloadTime: null, pause: 'energy'
  });
  assert.equal(R.createRun({ id: 'default' }).weapons[0].model, 'AF01');
  assert.equal(R.createRun({ id: 'practice', startingModel: 'CC04', fusionPractice: true }).weapons[0].level, 1);
  assert.throws(() => R.createCopy('F24', 'not-a-recipe'), /fusion-only/i);
  assert.throws(() => R.createRun({ id: 'no-f24-start', startingModel: 'F24' }), /fusion-only/i);
  assert.throws(() => R.createRun({ id: 'no-laser-start', startingModel: 'TE01' }), /reward-only/i);
});

test('one copy reaches MAX in exactly five ascents with the approved replacement multipliers', () => {
  const R = setup();
  const run = R.createRun({ id: 'scale', startingModel: 'CC04', fusionPractice: true });
  const id = run.weapons[0].id;
  const expected = [
    { level: 2, state: 'LEVEL', damage: 16.1, interval: 0.8, range: 72 },
    { level: 3, state: 'LEVEL', damage: 16.1, interval: 0.72, range: 72 },
    { level: 4, state: 'LEVEL', damage: 16.1, interval: 0.72, range: 82.8 },
    { level: 5, state: 'LEVEL', damage: 18.2, interval: 0.72, range: 82.8 },
    { level: 5, state: 'MAX', damage: 18.2, interval: 0.72, range: 82.8 }
  ];
  for (const step of expected) {
    assert.equal(R.advanceCopy(run, id).ok, true);
    const copy = run.weapons[0];
    const effective = R.effective(copy);
    assert.equal(copy.level, step.level);
    assert.equal(copy.state, step.state);
    assert.ok(Math.abs(effective.damage - step.damage) < 1e-9);
    assert.ok(Math.abs(effective.interval - step.interval) < 1e-9);
    assert.ok(Math.abs(effective.range - step.range) < 1e-9);
  }
  assert.equal(R.advanceCopy(run, id).ok, false);
});

test('copies of the same model progress independently and offers contain only equipped non-MAX copies once', () => {
  const R = setup();
  const run = R.createRun({ id: 'copies', startingModel: 'AF01' });
  assert.equal(R.claimReward(run, { rewardId: 'second', model: 'AF01' }).outcome, 'acquired');
  const [first, second] = run.weapons;
  assert.notEqual(first.id, second.id);
  assert.equal(first.model, second.model);
  for (let i = 0; i < 5; i++) assert.equal(R.advanceCopy(run, first.id).ok, true);
  const offers = R.weaponOffers(run);
  assert.deepEqual(plain(offers.map(item => item.copyId)), [second.id]);
  assert.equal(R.advanceCopy(run, second.id).ok, true);
  assert.equal(first.state, 'MAX');
  assert.equal(second.level, 2);
  assert.equal(R.weaponOffers(run).length, 1);
  assert.deepEqual(plain(R.drawWeaponOffer(run, () => 0.75).copyId), second.id);
});

test('secondary and refill rewards start at level 1, replay once, and cannot create a third copy', () => {
  const R = setup();
  const run = R.createRun({ id: 'rewards', startingModel: 'CC04', fusionPractice: true });
  const first = R.claimReward(run, { rewardId: 'first-boss', model: 'TE01' });
  assert.equal(first.outcome, 'acquired');
  assert.equal(first.copy.level, 1);
  const replay = R.claimReward(run, { rewardId: 'first-boss', model: 'TE01' });
  assert.equal(replay.copy.id, first.copy.id);
  assert.equal(replay.idempotent, true);
  assert.equal(R.claimReward(run, { rewardId: 'first-boss', model: 'AF01' }).reason, 'idempotency_conflict');
  assert.equal(run.weapons.length, 2);
  const full = R.claimReward(run, { rewardId: 'no-third', draw: () => 0 });
  assert.equal(full.outcome, 'upgraded');
  assert.equal(run.weapons.length, 2);
  assert.equal(run.weapons[0].level, 2);
});

test('runtime materialization failure rolls back a reward copy and leaves the ID retryable', () => {
  const R = setup();
  const run = R.createRun({ id: 'materialize', startingModel: 'AF01' });
  const original = plain(run.weapons);
  const failed = R.claimReward(run, {
    rewardId: 'runtime-copy', model: 'AF01',
    materialize(copy) {
      assert.equal(run.weapons.length, 2);
      assert.equal(copy.id, `reward:${run.id}:runtime-copy`);
      return false;
    }
  });
  assert.equal(failed.ok, false);
  assert.equal(failed.reason, 'materialization_failed');
  assert.deepEqual(plain(run.weapons), original);

  const threw = R.claimReward(run, {
    rewardId: 'runtime-copy', model: 'AF01',
    materialize() { throw new Error('runtime unavailable'); }
  });
  assert.equal(threw.ok, false);
  assert.equal(threw.reason, 'materialization_failed');
  assert.deepEqual(plain(run.weapons), original);

  const retried = R.claimReward(run, {
    rewardId: 'runtime-copy', model: 'AF01', materialize: () => true
  });
  assert.equal(retried.ok, true);
  assert.equal(retried.outcome, 'acquired');
  assert.equal(run.weapons.length, 2);
  assert.equal(R.claimReward(run, { rewardId: 'runtime-copy', model: 'AF01' }).idempotent, true);
});

test('AF01 MAX extra shot, CC04 fourth cut, and TE01 fourth emission follow their own copy counters', () => {
  const R = setup();
  const run = R.createRun({ id: 'extras', startingModel: 'AF01' });
  const af = run.weapons[0];
  for (let i = 0; i < 5; i++) R.advanceCopy(run, af.id);
  assert.equal(R.completeReload(run, af.id), true);
  const afShot = R.resolveAttack(run, af.id, { targetId: 'enemy-a' });
  assert.equal(afShot.extraShot.damage, 5.2);
  assert.equal(afShot.extraShot.delay, 0.12);
  assert.equal(afShot.extraShot.ammoCost, 0);
  assert.equal(R.resolveAttack(run, af.id, { targetId: 'enemy-a' }).extraShot, null);

  const katanaRun = R.createRun({ id: 'katana-max', startingModel: 'CC04', fusionPractice: true });
  const katana = katanaRun.weapons[0];
  for (let i = 0; i < 5; i++) R.advanceCopy(katanaRun, katana.id);
  for (let i = 0; i < 4; i++) var cut = R.resolveAttack(katanaRun, katana.id, { targetIds: ['a', 'b', 'c', 'd', 'e'] });
  assert.equal(cut.arcDegrees, 180);
  assert.deepEqual(plain(cut.targetIds), ['a', 'b', 'c', 'd', 'e']);

  const emitterRun = R.createRun({ id: 'laser-max' });
  assert.equal(R.claimReward(emitterRun, { rewardId: 'laser-acquired', model: 'TE01' }).outcome, 'acquired');
  const emitter = emitterRun.weapons[1];
  for (let i = 0; i < 5; i++) R.advanceCopy(emitterRun, emitter.id);
  for (let i = 0; i < 4; i++) var emission = R.resolveAttack(emitterRun, emitter.id, { targetIds: ['a', 'b', 'c'] });
  assert.deepEqual(plain(emission.targetIds), ['a', 'b']);
  assert.equal(emission.endsAtTargetId, 'b');
});

test('the map-two station is stable per map; pending pose evidence blocks only fusion, not progression', () => {
  const R = setup();
  const run = makeFusionRun(R, null);
  const before = plain(run.weapons);
  const station2 = R.enterMap(run, 2);
  const repeated = R.enterMap(run, 2);
  assert.equal(station2.stationId, repeated.stationId);
  assert.equal(station2.visible, true);
  assert.equal(station2.operational, false);
  assert.equal(station2.reason, 'pose_validation_pending');
  const preview = R.previewFusion(run, run.weapons.map(copy => copy.id));
  assert.equal(preview.ok, false);
  assert.equal(preview.reason, 'pose_validation_pending');
  assert.equal(R.advanceCopy(run, run.weapons[0].id).ok, false);
  assert.deepEqual(plain(run.weapons), before);
  const map3 = R.enterMap(run, 3);
  assert.notEqual(map3.stationId, station2.stationId);
  assert.equal(map3.visible, true);
});

test('fusion preview and cancellation are read-only and report the substituted MAX effects', () => {
  const R = setup();
  const run = makeFusionRun(R);
  const before = plain(run);
  const preview = R.previewFusion(run, run.weapons.map(copy => copy.id));
  assert.equal(preview.ok, true);
  assert.equal(preview.result.model, 'F24');
  assert.equal(preview.result.state, 'FINAL');
  assert.equal(preview.result.damage, 36);
  assert.equal(preview.result.cycle, 0.72);
  assert.deepEqual(plain(preview.substitutedExtras), ['CC04:maxSweep', 'TE01:secondAlignedTarget']);
  assert.equal(R.cancelFusion(run).ok, true);
  assert.deepEqual(plain(run), before);
});

test('fusion confirmation consumes two distinct MAX copies once and remains idempotent across retries/maps', () => {
  const R = setup();
  const run = makeFusionRun(R);
  const componentIds = run.weapons.map(copy => copy.id);
  const first = R.confirmFusion(run, { transactionId: 'fusion:one', componentIds });
  assert.equal(first.ok, true);
  assert.equal(first.copy.model, 'F24');
  assert.equal(first.copy.state, 'FINAL');
  assert.equal(run.weapons.length, 1);
  assert.equal(run.fusionUsed, true);
  const replay = R.confirmFusion(run, { transactionId: 'fusion:one', componentIds });
  assert.equal(replay.ok, true);
  assert.equal(replay.idempotent, true);
  assert.equal(replay.copy.id, first.copy.id);
  assert.equal(run.weapons.length, 1);
  assert.equal(R.confirmFusion(run, { transactionId: 'fusion:one', componentIds: ['changed', 'pair'] }).reason, 'idempotency_conflict');
  R.enterMap(run, 3);
  assert.equal(R.station(run).visible, false);
  assert.equal(R.previewFusion(run, [first.copy.id, first.copy.id]).reason, 'fusion_already_used');
  assert.equal(R.advanceCopy(run, first.copy.id).reason, 'final_cannot_upgrade');
});

test('fusion stays unavailable for same-model, under-MAX, absent, or duplicate copy inputs', () => {
  const R = setup();
  const run = R.createRun({ id: 'invalid-fusion', startingModel: 'CC04', fusionPractice: true, fusionPoseValidation: makePoseValidation() });
  R.enterMap(run, 2);
  assert.equal(R.previewFusion(run, [run.weapons[0].id, 'absent']).reason, 'component_missing');
  assert.equal(R.claimReward(run, { rewardId: 'second', model: 'TE01' }).outcome, 'acquired');
  R.enterMap(run, 2);
  assert.equal(R.previewFusion(run, [run.weapons[0].id, run.weapons[0].id]).reason, 'same_copy');
  assert.equal(R.previewFusion(run, run.weapons.map(copy => copy.id)).reason, 'components_not_max');
  for (const copy of run.weapons) for (let i = 0; i < 5; i++) R.advanceCopy(run, copy.id);
  run.weapons[1].model = 'CC04';
  assert.equal(R.previewFusion(run, run.weapons.map(copy => copy.id)).reason, 'same_model_not_fusible');
});

test('refill and replacement never restore fusion components, MAX levels, or the expedition use', () => {
  const R = setup();
  const run = makeFusionRun(R);
  const components = run.weapons.map(copy => copy.id);
  const fused = R.confirmFusion(run, { transactionId: 'fusion:used', componentIds: components });
  const replacement = R.replaceCopy(run, { transactionId: 'terminal:replace-final', copyId: fused.copy.id, newModel: 'AF01', terminalAuthorized: true });
  assert.equal(replacement.ok, true);
  assert.equal(replacement.copy.level, 1);
  assert.equal(replacement.copy.state, 'LEVEL');
  assert.equal(run.weapons.length, 1);
  assert.equal(run.fusionUsed, true);
  assert.ok(components.every(id => !run.weapons.some(copy => copy.id === id)));
  const refill = R.claimReward(run, { rewardId: 'next-eligible-weapon', model: 'TE01' });
  assert.equal(refill.outcome, 'acquired');
  assert.equal(refill.copy.level, 1);
  assert.equal(run.weapons.length, 2);
  const replay = R.claimReward(run, { rewardId: 'next-eligible-weapon', model: 'TE01' });
  assert.equal(replay.copy.id, refill.copy.id);
  assert.equal(replay.idempotent, true);
  assert.equal(R.fusionUsed, undefined);
  assert.equal(run.fusionUsed, true);
  assert.equal(R.previewFusion(run, [replacement.copy.id, refill.copy.id]).reason, 'fusion_already_used');
});

test('F24 caps already-filtered targets and applies the global damage modifier once', () => {
  const R = setup();
  const copy = { id: 'final-test', model: 'F24', state: 'FINAL' };
  const cycle = R.resolveF24Cycle(copy, {
    cutTargets: ['a', 'b', 'c', 'd'],
    projectionTargets: ['a', 'd', 'e'],
    damageMultiplier: 1.5
  });
  assert.equal(cycle.cycle, 0.72);
  assert.equal(cycle.cut.damage, 32.4);
  assert.equal(cycle.projection.damage, 21.6);
  assert.deepEqual(plain(cycle.cut.targetIds), ['a', 'b', 'c']);
  assert.deepEqual(plain(cycle.projection.targetIds), ['a', 'd']);
  assert.equal(cycle.uniqueEnemyCount, 4);
  assert.equal(cycle.cutArcDegrees, 140);
  assert.equal(cycle.cutRange, 83);
  assert.equal(cycle.projectionRange, 124);
  assert.equal(cycle.maxTargetsPerEnemyPerPhase, 1);
});

test('F24 applies supplied global damage, cadence and range modifiers once while preserving base limits', () => {
  const R = setup();
  const copy = { id: 'final-global-modifiers', model: 'F24', state: 'FINAL' };
  const modified = R.resolveF24Cycle(copy, {
    damageMultiplier: 1.2,
    intervalMultiplier: 0.9,
    cutTargets: ['a'],
    projectionTargets: ['b']
  });
  assert.ok(Math.abs(modified.cycle - 0.648) < 1e-9);
  assert.ok(Math.abs(modified.cut.damage - 25.92) < 1e-9);
  assert.ok(Math.abs(modified.projection.damage - 17.28) < 1e-9);
  assert.equal(modified.cutRange, 83);
  assert.equal(modified.projectionRange, 124);

  const rangeModified = R.resolveF24Cycle(copy, { rangeMultiplier: 1.1 });
  assert.equal(rangeModified.cycle, 0.72);
  assert.ok(Math.abs(rangeModified.cutRange - 91.3) < 1e-9);
  assert.ok(Math.abs(rangeModified.projectionRange - 136.4) < 1e-9);
});

test('ARM-VIS-001/R1 visor inputs cover 10 models, 8 views, 16/32 px and the real anchor PNGs', () => {
  const root = path.join(__dirname, '..');
  const catalogPath = path.join(root, 'docs/referencias/armas/armas-prueba-direccionales-v1/catalogo.js');
  const context = vm.createContext({ window: {} });
  vm.runInContext(fs.readFileSync(catalogPath, 'utf8'), context, { filename: catalogPath });
  const catalog = context.window.ARMAS_CATALOGO;
  const modelIds = Array.from(catalog.selected);
  assert.deepEqual(modelIds, ['AF01', 'AR01', 'CC04', 'IN03', 'FR07', 'PE04', 'RU04', 'TE01', 'AN09', 'F24']);
  assert.deepEqual(Array.from(catalog.directions), ['E', 'SE', 'S', 'SW', 'W', 'NW', 'N', 'NE']);

  let pngCount = 0;
  for (const size of [16, 32]) {
    for (const modelId of modelIds) {
      const model = catalog.modes[String(size)][modelId];
      assert.equal(model.individuals.length, 8, `${size}/${modelId} PNG count`);
      assert.equal(model.frames.length, 8, `${size}/${modelId} frame count`);
      model.frames.forEach((frame, index) => {
        assert.equal(frame.direction, catalog.directions[index]);
        assert.ok(frame.grip && Number.isFinite(frame.grip.x) && Number.isFinite(frame.grip.y), `${size}/${modelId}/${frame.direction} G`);
        assert.ok(frame.muzzle && Number.isFinite(frame.muzzle.x) && Number.isFinite(frame.muzzle.y), `${size}/${modelId}/${frame.direction} S`);
        assert.ok(frame.support === null || (Number.isFinite(frame.support.x) && Number.isFinite(frame.support.y)), `${size}/${modelId}/${frame.direction} A`);
        const assetPath = path.join(root, 'docs/referencias/armas/armas-prueba-direccionales-v1', model.individuals[index]);
        const png = fs.readFileSync(assetPath);
        assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', assetPath);
        assert.equal(png.readUInt32BE(16), size, `${assetPath} width`);
        assert.equal(png.readUInt32BE(20), size, `${assetPath} height`);
        pngCount++;
      });
    }
  }
  assert.equal(pngCount, 160);
  const unsupportedSupport = [16, 32].flatMap(size => modelIds
    .filter(modelId => catalog.modes[String(size)][modelId].frames.every(frame => frame.support === null))
    .map(modelId => `${size}/${modelId}`));
  assert.deepEqual(unsupportedSupport, ['16/AR01', '16/AN09', '32/AR01', '32/AN09']);

  const characterContext = vm.createContext({ G: {} });
  const characterPath = path.join(root, 'js/data/character-catalog.js');
  vm.runInContext(fs.readFileSync(characterPath, 'utf8'), characterContext, { filename: characterPath });
  for (const size of [16, 32]) {
    for (const actorId of ['guardia', 'medico']) {
      const actor = characterContext.G.CharacterCatalog.modes[String(size)][actorId];
      assert.ok(fs.existsSync(path.join(root, 'assets/personajes-20261022', actor.partsPath)), `${size}/${actorId} Partes.png`);
    }
  }
});
