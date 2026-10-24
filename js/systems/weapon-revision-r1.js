/* Isolated EST-ARM-001 r1 weapon progression and first-fusion domain. */
G.WeaponRevisionR1 = (() => {
  'use strict';

  const REVISION = 'LOT-EST-002-r1';
  const MAX_WEAPONS = 2;
  const DIRECTIONS = Object.freeze(['E', 'SE', 'S', 'SW', 'W', 'NW', 'N', 'NE']);
  const models = Object.freeze({
    AF01: Object.freeze({
      id: 'AF01', name: 'Pistola de servicio', tier: 'Normal',
      base: Object.freeze({ damage: 10, interval: 0.5, magazine: 12, reloadTime: 1.5, range: 320 }),
      maxExtra: 'extraShotAfterReload'
    }),
    CC04: Object.freeze({
      id: 'CC04', name: 'Katana de contención', tier: 'Raro',
      base: Object.freeze({ damage: 14, interval: 0.8, range: 72, arcDegrees: 140, maxTargets: 4, magazine: null, reloadTime: null }),
      maxExtra: 'maxSweep'
    }),
    TE01: Object.freeze({
      id: 'TE01', name: 'Emisor láser', tier: 'Normal',
      base: Object.freeze({ damage: 14, interval: 0.8, emissionDuration: 0.12, range: 288, targetLimit: 1, magazine: null, reloadTime: null, pause: 'energy' }),
      maxExtra: 'secondAlignedTarget'
    }),
    F24: Object.freeze({
      id: 'F24', name: 'Hoja fotónica de contención', tier: 'Raro', fusionOnly: true,
      final: Object.freeze({
        damage: 36, cycle: 0.72, cutShare: 0.6, projectionShare: 0.4,
        cutRange: 83, cutArcDegrees: 140, cutMaxTargets: 3,
        projectionRange: 124, projectionMaxTargets: 2, maxDistinctTargets: 4
      })
    })
  });
  const recipe = Object.freeze({ components: Object.freeze(['CC04', 'TE01']), result: 'F24' });
  const privateRuns = new WeakMap();

  const own = (object, key) => Object.prototype.hasOwnProperty.call(object, key);
  const isId = value => typeof value === 'string' && value.trim().length > 0;
  const clone = value => value == null ? value : JSON.parse(JSON.stringify(value));
  const failure = reason => ({ ok: false, reason });

  function isPlayableModel(model) {
    return isId(model) && own(models, model) && models[model].fusionOnly !== true;
  }

  function copyPoseValidation(value) {
    if (!value || value.status !== 'validated' || !isId(value.evidenceId) || !Array.isArray(value.pair) ||
        value.pair.length !== 2 || new Set(value.pair).size !== 2 ||
        !recipe.components.every(id => value.pair.includes(id)) ||
        !Array.isArray(value.resolutions) || ![16, 32].every(size => value.resolutions.includes(size)) ||
        !Array.isArray(value.directions) || !DIRECTIONS.every(direction => value.directions.includes(direction)) ||
        !Array.isArray(value.actors) || !['guardia', 'medico'].every(actor => value.actors.includes(actor)) ||
        value.layout !== 'one-arm-per-weapon') return null;
    return {
      status: 'validated', pair: recipe.components.slice(), evidenceId: value.evidenceId,
      resolutions: [16, 32], directions: DIRECTIONS.slice(), actors: ['guardia', 'medico'],
      layout: 'one-arm-per-weapon'
    };
  }

  function createCopy(model, id) {
    if (model === 'F24') throw new Error('F24 is fusion-only');
    if (!isPlayableModel(model)) throw new Error(`Unsupported trial weapon model: ${model}`);
    if (!isId(id)) throw new Error('Weapon copy ID is required');
    return { id, model, level: 1, state: 'LEVEL', attackCount: 0, reloadExtraReady: false };
  }

  function createRun({ id, startingModel = 'AF01', fusionPractice = false, fusionPoseValidation = null } = {}) {
    if (!isId(id)) throw new Error('Expedition ID is required');
    if (startingModel === 'F24') throw new Error('F24 is fusion-only and cannot be an initial weapon');
    if (startingModel === 'TE01') throw new Error('TE01 is reward-only and cannot be an initial weapon');
    if (startingModel === 'CC04' && fusionPractice !== true) throw new Error('CC04 initial start is reserved for fusion practice');
    if (startingModel !== 'AF01' && startingModel !== 'CC04') throw new Error(`Unsupported initial weapon model: ${startingModel}`);
    const copy = createCopy(startingModel, `weapon:${id}:1`);
    const run = {
      id, revision: REVISION, currentMap: 1, weapons: [copy],
      fusionUsed: false, fusionReceipt: null,
      fusionPoseValidation: copyPoseValidation(fusionPoseValidation)
    };
    privateRuns.set(run, {
      nextCopySerial: 2,
      stationByMap: new Map(),
      fusionReceipts: new Map(),
      rewardReceipts: new Map(),
      replacementReceipts: new Map()
    });
    return run;
  }

  function privateFor(run) {
    return run && privateRuns.get(run);
  }

  function snapshot(run) {
    if (!privateFor(run)) throw new Error('Unknown weapon-revision expedition');
    return clone(run);
  }

  function findCopy(run, copyId) {
    return run.weapons.find(copy => copy.id === copyId) || null;
  }

  function weaponOffers(run) {
    if (!privateFor(run) || !Array.isArray(run.weapons)) return [];
    const seen = new Set();
    return run.weapons.filter(copy => copy && isId(copy.id) && !seen.has(copy.id) && (seen.add(copy.id), true) &&
      isPlayableModel(copy.model) && copy.state === 'LEVEL' && Number.isInteger(copy.level) && copy.level >= 1 && copy.level <= 5)
      .map(copy => ({ key: `weapon:${copy.id}:${copy.level}`, copyId: copy.id, model: copy.model, level: copy.level }));
  }

  function drawWeaponOffer(run, rng = Math.random) {
    const candidates = weaponOffers(run);
    if (!candidates.length || typeof rng !== 'function') return null;
    const sample = rng();
    if (!Number.isFinite(sample) || sample < 0 || sample >= 1) return null;
    return clone(candidates[Math.floor(sample * candidates.length)]);
  }

  function advanceCopy(run, copyId) {
    if (!privateFor(run)) return failure('invalid_expedition');
    const copy = findCopy(run, copyId);
    if (!copy) return failure('copy_missing');
    if (copy.state === 'MAX') return failure('copy_at_max');
    if (copy.state === 'FINAL' || copy.model === 'F24') return failure('final_cannot_upgrade');
    if (copy.state !== 'LEVEL' || !Number.isInteger(copy.level) || copy.level < 1 || copy.level > 5) return failure('copy_invalid');
    if (copy.level < 5) copy.level++;
    else copy.state = 'MAX';
    copy.reloadExtraReady = false;
    return { ok: true, copy: clone(copy) };
  }

  function factor(value, name) {
    const resolved = value === undefined ? 1 : value;
    if (!Number.isFinite(resolved) || resolved < 0) throw new Error(`${name} must be a finite nonnegative multiplier`);
    return resolved;
  }

  function effective(copy, modifiers = {}) {
    if (!copy || !isId(copy.model) || !own(models, copy.model)) throw new Error('Unknown weapon model');
    const globalDamageMultiplier = factor(modifiers.damageMultiplier, 'damageMultiplier');
    const globalIntervalMultiplier = factor(modifiers.intervalMultiplier, 'intervalMultiplier');
    const globalRangeMultiplier = factor(modifiers.rangeMultiplier, 'rangeMultiplier');
    if (copy.model === 'F24') {
      const final = models.F24.final;
      const damage = final.damage * globalDamageMultiplier;
      return {
        model: 'F24', name: models.F24.name, tier: models.F24.tier, state: 'FINAL',
        damage, cycle: final.cycle * globalIntervalMultiplier, cutDamage: damage * final.cutShare,
        projectionDamage: damage * final.projectionShare,
        cutShare: final.cutShare, projectionShare: final.projectionShare,
        cutRange: final.cutRange * globalRangeMultiplier, cutArcDegrees: final.cutArcDegrees,
        cutMaxTargets: final.cutMaxTargets, projectionRange: final.projectionRange * globalRangeMultiplier,
        projectionMaxTargets: final.projectionMaxTargets, maxDistinctTargets: final.maxDistinctTargets
      };
    }
    if (copy.state !== 'LEVEL' && copy.state !== 'MAX') throw new Error('Invalid weapon progression state');
    if (!Number.isInteger(copy.level) || copy.level < 1 || copy.level > 5) throw new Error('Invalid weapon level');
    const definition = models[copy.model];
    const base = definition.base;
    const localDamageMultiplier = copy.level >= 5 ? 1.3 : copy.level >= 2 ? 1.15 : 1;
    const localIntervalMultiplier = copy.level >= 3 ? 0.9 : 1;
    const localRangeMultiplier = copy.level >= 4 ? 1.15 : 1;
    const output = {
      model: copy.model, name: definition.name, tier: definition.tier,
      state: copy.state, level: copy.level,
      damage: base.damage * localDamageMultiplier * globalDamageMultiplier,
      interval: base.interval * localIntervalMultiplier * globalIntervalMultiplier,
      range: base.range * localRangeMultiplier * globalRangeMultiplier,
      magazine: base.magazine, reloadTime: base.reloadTime,
      maxExtra: copy.state === 'MAX' ? definition.maxExtra : null
    };
    for (const key of ['arcDegrees', 'maxTargets', 'emissionDuration', 'targetLimit', 'pause']) {
      if (base[key] !== undefined) output[key] = base[key];
    }
    return output;
  }

  function completeReload(run, copyId) {
    if (!privateFor(run)) return false;
    const copy = findCopy(run, copyId);
    if (!copy || copy.model !== 'AF01') return false;
    copy.reloadExtraReady = copy.state === 'MAX';
    return true;
  }

  function uniqueTargetIds(values) {
    if (!Array.isArray(values)) return [];
    const seen = new Set();
    return values.filter(value => isId(value) && !seen.has(value) && (seen.add(value), true));
  }

  function resolveAttack(run, copyId, { targetId, targetIds = [], damageMultiplier, intervalMultiplier, rangeMultiplier } = {}) {
    if (!privateFor(run)) return failure('invalid_expedition');
    const copy = findCopy(run, copyId);
    if (!copy) return failure('copy_missing');
    if (copy.model === 'F24' || copy.state === 'FINAL') return failure('final_uses_cycle_resolver');
    const stats = effective(copy, { damageMultiplier, intervalMultiplier, rangeMultiplier });
    const ids = uniqueTargetIds(targetIds.length ? targetIds : (isId(targetId) ? [targetId] : []));
    if (!ids.length) return failure('target_required');
    copy.attackCount = (Number.isInteger(copy.attackCount) && copy.attackCount >= 0 ? copy.attackCount : 0) + 1;
    if (copy.model === 'AF01') {
      const extraShot = copy.state === 'MAX' && copy.reloadExtraReady ? {
        targetId: ids[0], damage: stats.damage * 0.4, delay: 0.12, ammoCost: 0
      } : null;
      if (extraShot) copy.reloadExtraReady = false;
      return { ok: true, model: 'AF01', targetId: ids[0], damage: stats.damage, ammoCost: 1, extraShot };
    }
    if (copy.model === 'CC04') {
      const maxSweep = copy.state === 'MAX' && copy.attackCount % 4 === 0;
      const limit = maxSweep ? 5 : models.CC04.base.maxTargets;
      return {
        ok: true, model: 'CC04', attackCount: copy.attackCount,
        arcDegrees: maxSweep ? 180 : models.CC04.base.arcDegrees,
        range: stats.range, damage: stats.damage,
        targetIds: ids.slice(0, limit), maxSweep
      };
    }
    if (copy.model === 'TE01') {
      const secondTarget = copy.state === 'MAX' && copy.attackCount % 4 === 0;
      const selected = ids.slice(0, secondTarget ? 2 : models.TE01.base.targetLimit);
      return {
        ok: true, model: 'TE01', attackCount: copy.attackCount,
        interval: stats.interval, emissionDuration: models.TE01.base.emissionDuration,
        range: stats.range, damage: stats.damage,
        targetIds: selected, secondTarget,
        endsAtTargetId: selected[selected.length - 1] || null
      };
    }
    return failure('unsupported_weapon');
  }

  function claimReward(run, { rewardId, model, copyId, draw = Math.random, materialize } = {}) {
    const internal = privateFor(run);
    if (!internal) return failure('invalid_expedition');
    if (!isId(rewardId)) return failure('reward_id_required');
    const fingerprint = JSON.stringify({ model: model || null, copyId: copyId || null });
    const existing = internal.rewardReceipts.get(rewardId);
    if (existing) return existing.fingerprint === fingerprint ? { ...clone(existing.result), idempotent: true } : failure('idempotency_conflict');

    let result;
    if (run.weapons.length < MAX_WEAPONS) {
      if (!isId(model)) return failure('model_required');
      if (model === 'F24') return failure('fusion_only_model');
      if (!isPlayableModel(model)) return failure('unsupported_model');
      const newCopy = createCopy(model, `reward:${run.id}:${rewardId}`);
      if (run.weapons.some(copy => copy.id === newCopy.id)) return failure('copy_id_conflict');
      run.weapons.push(newCopy);
      result = { ok: true, outcome: 'acquired', copy: clone(newCopy) };
      if (materialize !== undefined) {
        let accepted = false;
        try { accepted = typeof materialize === 'function' && materialize(clone(newCopy)) === true; }
        catch { accepted = false; }
        if (!accepted) {
          const index = run.weapons.findIndex(copy => copy.id === newCopy.id);
          if (index >= 0) run.weapons.splice(index, 1);
          return failure('materialization_failed');
        }
      }
    } else {
      if (model) return failure('weapon_slots_full');
      const candidates = weaponOffers(run);
      let target = copyId ? candidates.find(item => item.copyId === copyId) : null;
      if (copyId && !target) return failure('copy_not_upgradeable');
      if (!copyId && candidates.length) {
        if (typeof draw !== 'function') return failure('invalid_draw');
        const sample = draw();
        if (!Number.isFinite(sample) || sample < 0 || sample >= 1) return failure('invalid_draw');
        target = candidates[Math.floor(sample * candidates.length)];
      }
      if (!target) result = { ok: true, outcome: 'no_eligible_upgrade', copy: null };
      else {
        const upgraded = advanceCopy(run, target.copyId);
        if (!upgraded.ok) return upgraded;
        result = { ok: true, outcome: 'upgraded', copy: upgraded.copy };
      }
    }
    internal.rewardReceipts.set(rewardId, { fingerprint, result: clone(result) });
    return clone(result);
  }

  function station(run) {
    if (!privateFor(run)) return { visible: false, operational: false, reason: 'invalid_expedition', stationId: null };
    if (run.fusionUsed) return { visible: false, operational: false, reason: 'fusion_already_used', stationId: null, map: run.currentMap };
    if (!Number.isInteger(run.currentMap) || run.currentMap < 2) return { visible: false, operational: false, reason: 'map_locked', stationId: null, map: run.currentMap };
    const internal = privateFor(run);
    let stationId = internal.stationByMap.get(run.currentMap);
    if (!stationId) {
      stationId = `fusion-station:${run.id}:${run.currentMap}`;
      internal.stationByMap.set(run.currentMap, stationId);
    }
    const operational = !!run.fusionPoseValidation;
    return {
      visible: true, operational,
      reason: operational ? 'available' : 'pose_validation_pending',
      stationId, map: run.currentMap
    };
  }

  function enterMap(run, mapNumber) {
    if (!privateFor(run) || !Number.isInteger(mapNumber) || mapNumber < 1) return failure('invalid_map');
    if (mapNumber < run.currentMap) return failure('map_cannot_go_backwards');
    run.currentMap = mapNumber;
    return station(run);
  }

  function componentPair(run, componentIds) {
    if (!Array.isArray(componentIds) || componentIds.length !== 2 || componentIds.some(id => !isId(id))) return failure('two_components_required');
    if (componentIds[0] === componentIds[1]) return failure('same_copy');
    const first = findCopy(run, componentIds[0]), second = findCopy(run, componentIds[1]);
    if (!first || !second) return failure('component_missing');
    if (first.model === second.model) return failure('same_model_not_fusible');
    const selected = [first, second];
    if (!recipe.components.every(model => selected.some(copy => copy.model === model)) || selected.some(copy => !recipe.components.includes(copy.model))) return failure('recipe_not_enabled');
    if (selected.some(copy => copy.state !== 'MAX' || copy.level !== 5)) return failure('components_not_max');
    return { ok: true, copies: selected.slice().sort((a, b) => recipe.components.indexOf(a.model) - recipe.components.indexOf(b.model)) };
  }

  function previewFusion(run, componentIds) {
    if (!privateFor(run)) return failure('invalid_expedition');
    if (run.fusionUsed) return failure('fusion_already_used');
    if (!station(run).visible) return failure('station_unavailable');
    if (!run.fusionPoseValidation) return failure('pose_validation_pending');
    const pair = componentPair(run, componentIds);
    if (!pair.ok) return pair;
    const final = effective({ model: 'F24', state: 'FINAL' });
    return {
      ok: true,
      components: pair.copies.map(copy => clone(copy)),
      result: { model: 'F24', name: models.F24.name, tier: models.F24.tier, state: 'FINAL', damage: final.damage, cycle: final.cycle },
      substitutedExtras: ['CC04:maxSweep', 'TE01:secondAlignedTarget'],
      freedSlots: 1
    };
  }

  function cancelFusion(run) {
    if (!privateFor(run)) return failure('invalid_expedition');
    return { ok: true, canceled: true, consumed: false };
  }

  function confirmFusion(run, { transactionId, componentIds } = {}) {
    const internal = privateFor(run);
    if (!internal) return failure('invalid_expedition');
    if (!isId(transactionId)) return failure('transaction_id_required');
    const fingerprint = JSON.stringify(Array.isArray(componentIds) ? componentIds.slice().sort() : null);
    const existing = internal.fusionReceipts.get(transactionId);
    if (existing) return existing.fingerprint === fingerprint ? { ...clone(existing.result), idempotent: true } : failure('idempotency_conflict');
    const preview = previewFusion(run, componentIds);
    if (!preview.ok) return preview;
    const pair = componentPair(run, componentIds);
    if (!pair.ok) return pair;

    const copy = {
      id: `fusion:${run.id}:1`, model: 'F24', level: null, state: 'FINAL',
      attackCount: 0, reloadExtraReady: false
    };
    const consumed = new Set(pair.copies.map(component => component.id));
    const firstIndex = Math.min(...pair.copies.map(component => run.weapons.indexOf(component)));
    run.weapons = run.weapons.filter(component => !consumed.has(component.id));
    run.weapons.splice(firstIndex < 0 ? 0 : firstIndex, 0, copy);
    run.fusionUsed = true;
    const receipt = {
      ok: true, outcome: 'fused', transactionId,
      componentIds: pair.copies.map(component => component.id), copy: clone(copy),
      substitutedExtras: preview.substitutedExtras.slice(), freedSlots: 1
    };
    run.fusionReceipt = clone(receipt);
    internal.fusionReceipts.set(transactionId, { fingerprint, result: clone(receipt) });
    return clone(receipt);
  }

  function replaceCopy(run, { transactionId, copyId, newModel, terminalAuthorized = false } = {}) {
    const internal = privateFor(run);
    if (!internal) return failure('invalid_expedition');
    if (!isId(transactionId)) return failure('transaction_id_required');
    const fingerprint = JSON.stringify({ copyId: copyId || null, newModel: newModel || null, terminalAuthorized: !!terminalAuthorized });
    const existing = internal.replacementReceipts.get(transactionId);
    if (existing) return existing.fingerprint === fingerprint ? { ...clone(existing.result), idempotent: true } : failure('idempotency_conflict');
    if (!terminalAuthorized) return failure('terminal_confirmation_required');
    if (newModel === 'F24') return failure('fusion_only_model');
    if (!isPlayableModel(newModel)) return failure('unsupported_model');
    const index = run.weapons.findIndex(copy => copy.id === copyId);
    if (index < 0) return failure('copy_missing');
    const privateId = `replacement:${run.id}:${internal.nextCopySerial++}`;
    const copy = createCopy(newModel, privateId);
    run.weapons[index] = copy;
    const result = { ok: true, outcome: 'replaced', previousCopyId: copyId, copy: clone(copy) };
    internal.replacementReceipts.set(transactionId, { fingerprint, result: clone(result) });
    return clone(result);
  }

  function resolveF24Cycle(copy, { cutTargets = [], projectionTargets = [], damageMultiplier, intervalMultiplier, rangeMultiplier } = {}) {
    if (!copy || copy.model !== 'F24' || copy.state !== 'FINAL') throw new Error('F24 FINAL copy is required');
    const stats = effective(copy, { damageMultiplier, intervalMultiplier, rangeMultiplier });
    const cutIds = uniqueTargetIds(cutTargets).slice(0, stats.cutMaxTargets);
    const seen = new Set(cutIds);
    const projectionIds = [];
    for (const id of uniqueTargetIds(projectionTargets)) {
      if (projectionIds.length >= stats.projectionMaxTargets) break;
      if (seen.has(id) || seen.size < stats.maxDistinctTargets) {
        projectionIds.push(id);
        seen.add(id);
      }
    }
    return {
      cycle: stats.cycle,
      cutArcDegrees: stats.cutArcDegrees,
      cutRange: stats.cutRange,
      projectionRange: stats.projectionRange,
      uniqueEnemyCount: seen.size,
      maxTargetsPerEnemyPerPhase: 1,
      cut: { targetIds: cutIds, damage: stats.cutDamage },
      projection: { targetIds: projectionIds, damage: stats.projectionDamage }
    };
  }

  return Object.freeze({
    REVISION, DIRECTIONS, MAX_WEAPONS, models, recipe,
    createRun, createCopy, snapshot, weaponOffers, drawWeaponOffer,
    advanceCopy, effective, completeReload, resolveAttack, claimReward,
    station, enterMap, previewFusion, cancelFusion, confirmFusion,
    replaceCopy, resolveF24Cycle
  });
})();
