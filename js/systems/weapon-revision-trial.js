/* Explicit AF01-only bridge from the approved r1 domain to the existing field runtime. */
G.WeaponRevisionTrial = (() => {
  'use strict';

  const R = G.WeaponRevisionR1;
  const query = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const requested = G.MapTrial?.expanded === true && query.get('prueba') === 'combate-v2' && query.get('armas') === 'r1';
  const legacyPracticeIgnored = requested && query.has('ensayo');
  const runtimeModel = 'pistol';
  const domainModel = 'AF01';
  let run = null, player = null, runSerial = 0, authorizedAcquireId = null;

  if (requested && G.MapTrial) G.MapTrial.practice = null;

  const active = () => requested && G.MapTrial?.expanded === true;
  const failure = reason => ({ ok: false, reason });
  const validPlayer = candidate => active() && candidate && candidate === player && !candidate.dead && candidate.hp > 0 &&
    !['finished', 'idle'].includes(G.Expedition?.state?.phase) &&
    Array.isArray(candidate.fieldWeapons) && candidate.fieldWeapons === G.FieldCombat?.getweapons?.();
  function domainCopy(copyOrId) {
    if (!active() || !run) return null;
    const id = typeof copyOrId === 'string' ? copyOrId : copyOrId?.id;
    return run.weapons.find(copy => copy.id === id && copy.model === domainModel) || null;
  }
  function syncCopy(copyOrId) {
    const domain = domainCopy(copyOrId);
    if (!domain || !player) return null;
    const runtime = player.fieldWeapons?.find(copy => copy.id === domain.id);
    if (!runtime) return null;
    runtime.model = runtimeModel;
    runtime.level = domain.level;
    runtime.weaponRevisionState = domain.state;
    runtime.state = domain.state;
    runtime.branches = { power: 0, rhythm: 0, handling: 0, specialization: 0 };
    if (domain.state !== 'MAX') runtime._r1ExtraShot = null;
    return runtime;
  }
  function prepareLoadout(loadout) {
    if (!active()) return loadout;
    run = R.createRun({ id: `AF01-${++runSerial}`, startingModel: domainModel });
    player = null;
    authorizedAcquireId = null;
    return [{ id: run.weapons[0].id, model: runtimeModel, mods: [], level: 1 }];
  }
  function bindPlayer(candidate, copies) {
    if (!active() || !run || !candidate || !Array.isArray(copies)) return false;
    player = candidate;
    candidate.fieldWeapons = copies;
    if (legacyPracticeIgnored) {
      candidate.tempStats = {};
      candidate.infiniteTactical = null;
    }
    for (const copy of copies) if (!syncCopy(copy)) return false;
    return true;
  }
  function runtimeEffective(candidate, local) {
    const catalog = G.FieldCatalog?.models?.[runtimeModel];
    if (!catalog) throw new Error('AF01 pistol runtime is unavailable');
    const global = G.FieldStats?.player(candidate) || {};
    const result = R.effective(local, {
      damageMultiplier: 1 + (global.powerBonus || 0),
      intervalMultiplier: 1 - (global.cadenceReduction || 0)
    });
    return {
      model: runtimeModel, revision: domainModel, name: result.name,
      damage: result.damage, interval: result.interval,
      capacity: result.magazine, reloadTime: result.reloadTime * (1 - (global.reloadReduction || 0)),
      range: result.range, speed: catalog.speed, spread: catalog.spread,
      pellets: catalog.pellets, pierce: 0, family: 'projectile',
      level: result.level, state: result.state
    };
  }
  function effective(candidate, copy) {
    const local = domainCopy(copy);
    if (!local || copy.model !== runtimeModel) throw new Error('AF01 r1 requires a mounted pistol copy');
    return runtimeEffective(candidate, local);
  }
  function previewEffective(candidate, copy) {
    if (!active() || copy?.preview !== true || copy.id !== undefined || copy.model !== runtimeModel) {
      throw new Error('AF01 r1 preview requires an unmounted pistol prototype');
    }
    return runtimeEffective(candidate, { model: domainModel, level: 1, state: 'LEVEL' });
  }
  function advanceCopy(copyId) {
    if (!active() || !run) return failure('invalid_expedition');
    const result = R.advanceCopy(run, copyId);
    if (result.ok) syncCopy(copyId);
    return result;
  }
  function advanceRandomCopy(candidate, draw = Math.random) {
    if (!validPlayer(candidate)) return false;
    const offer = R.drawWeaponOffer(run, draw);
    return !!offer && advanceCopy(offer.copyId).ok;
  }
  function levelLabel(copy) {
    const local = domainCopy(copy);
    if (!local) return '—';
    return local.state === 'MAX' ? 'MAX' : `Nivel ${local.level}/5`;
  }
  function canUpgrade() { return active() && !!run && R.weaponOffers(run).length > 0; }
  function completeReload(copyId) { return !!run && R.completeReload(run, copyId); }
  function onMainShot(copy, target, aim) {
    if (!active() || !domainCopy(copy)) return null;
    const targetId = typeof target?.id === 'string' && target.id.trim() ? target.id : `target:${copy.id}`;
    const global = G.FieldStats?.player(player) || {};
    const result = R.resolveAttack(run, copy.id, {
      targetId, damageMultiplier: 1 + (global.powerBonus || 0)
    });
    if (!result.ok || !result.extraShot) return null;
    copy._r1ExtraShot = { remaining: result.extraShot.delay, damage: result.extraShot.damage, aim };
    return { ...result.extraShot };
  }
  function advanceExtra(copy, dt) {
    const timer = copy?._r1ExtraShot;
    if (!timer) return null;
    timer.remaining = Math.max(0, timer.remaining - Math.max(0, dt || 0));
    if (timer.remaining > 1e-9) return null;
    copy._r1ExtraShot = null;
    return { damage: timer.damage, aim: timer.aim };
  }
  function timerStep(dt) {
    const step = Math.max(0, Number(dt) || 0);
    if (!active()) return step;
    const state = G.Expedition?.state;
    const phase = state?.phase;
    const frozenPhase = ['levelup', 'armament', 'terminal', 'paused', 'finished', 'idle'].includes(phase);
    if ((G.Game?.state && G.Game.state !== 'playing') || frozenPhase) return 0;
    return step;
  }
  function allowRuntimeAcquire(model, id) {
    if (!active()) return true;
    return model === runtimeModel && id === authorizedAcquireId &&
      run?.weapons.some(copy => copy.id === id) && player?.fieldWeapons?.length === 1;
  }
  function claimReward(rewardId, candidate, { model, draw = Math.random } = {}) {
    if (!validPlayer(candidate)) return failure('invalid_expedition');
    if (model !== undefined && model !== domainModel && model !== runtimeModel) return failure('unsupported_model');
    if (run.weapons.length === 1) {
      if (model === undefined) return failure('model_required');
      const result = R.claimReward(run, {
        rewardId, model: domainModel, draw,
        materialize: copy => {
          authorizedAcquireId = copy.id;
          try { return G.FieldCombat.acquire(runtimeModel, copy.id) === true; }
          finally { authorizedAcquireId = null; }
        }
      });
      if (!result.ok) return result;
      syncCopy(result.copy.id);
      return result;
    }
    const result = R.claimReward(run, { rewardId, draw });
    if (result.ok && result.outcome === 'upgraded') syncCopy(result.copy.id);
    return result;
  }
  function replaceCopy(copyId, model, transactionId) {
    if (!active() || model !== runtimeModel) return failure('unsupported_model');
    const result = R.replaceCopy(run, {
      transactionId, copyId, newModel: domainModel, terminalAuthorized: true
    });
    return result.ok ? { ok: true, copy: result.copy } : result;
  }
  function resetProgress() {
    if (!active() || !run) return false;
    for (const copy of run.weapons) {
      copy.level = 1; copy.state = 'LEVEL'; copy.attackCount = 0; copy.reloadExtraReady = false;
      syncCopy(copy.id);
    }
    return true;
  }

  return Object.freeze({
    requested, legacyPracticeIgnored, runtimeModel, domainModel,
    message: 'Ensayo AF01 r1 parcial · escala nivel/MAX; fusión pendiente de validar CC04/TE01.',
    active, prepareLoadout, bindPlayer, effective, previewEffective, domainCopy, syncCopy,
    advanceCopy, advanceRandomCopy, levelLabel, canUpgrade, completeReload,
    onMainShot, advanceExtra, timerStep, allowRuntimeAcquire, claimReward,
    replaceCopy, resetProgress,
    get state() { return active() && run ? R.snapshot(run) : null; }
  });
})();
