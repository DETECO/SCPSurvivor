/* Sole calculation source for permanent training and temporary field bonuses. */
G.FieldStats = (() => {
  const TRAINING = ['health', 'protection', 'power', 'cadence', 'reload', 'mobility', 'collection', 'learning', 'recovery', 'specialization'];
  const TEMP = ['health', 'protection', 'power', 'cadence', 'mobility', 'collection', 'learning', 'recovery'];
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, Number.isFinite(v) ? v : 0));
  const count = (obj, key, max = 1e9) => clamp(Number(obj && obj[key]) || 0, 0, max);
  function tempStats(pl) {
    if (!pl.tempStats) pl.tempStats = {};
    for (const k of TEMP) if (!Number.isFinite(pl.tempStats[k])) pl.tempStats[k] = 0;
    return pl.tempStats;
  }
  function player(pl = {}, options = {}) {
    const t = pl.training || pl.permanentTraining || {};
    const x = pl.tempStats || {};
    const n = Object.fromEntries(TRAINING.map(k => [k, count(t, k, 10)]));
    const q = Object.fromEntries(TEMP.map(k => [k, count(x, k)]));
    const baseHp = Number.isFinite(pl.baseMaxHp) ? pl.baseMaxHp :
      (Number.isFinite(pl.baseHp) ? pl.baseHp : (pl.mon && Number.isFinite(pl.mon.hp) ? pl.mon.hp : (Number.isFinite(pl.maxHp) ? pl.maxHp : 100)));
    const sprintBonus = Number(options.sprintBonus) || 0;
    const permanentHp = baseHp * (1 + 0.05 * n.health);
    const hpBonus = Math.min(200, 20 * q.health);
    const permMob = 0.02 * n.mobility;
    const permCadence = 0.02 * n.cadence;
    const permReload = 0.03 * n.reload;
    const permSkill = 0.03 * n.specialization;
    const permProt = 0.02 * n.protection;
    return {
      maxHp: permanentHp + hpBonus,
      spdMul: 1 + Math.min(0.5, permMob + q.mobility * 0.07) + sprintBonus,
      dmgReduce: Math.min(0.7, permProt + q.protection * 0.06),
      regenFlat: 0.1 * n.recovery + Math.min(4.5, 0.9 * q.recovery),
      magnet: 78 * (1 + 0.1 * n.collection + Math.min(1.5, 0.3 * q.collection)),
      xpMul: 1 + 0.05 * n.learning + Math.min(1.2, 0.12 * q.learning),
      cadenceReduction: Math.min(0.6, permCadence + q.cadence * 0.08),
      reloadReduction: permReload,
      skillReduction: Math.min(0.6, permSkill),
      powerBonus: 0.03 * n.power + Math.min(1, 0.1 * q.power),
      training: n,
      tempStats: q
    };
  }
  function apply(pl, options = {}) {
    if (!Number.isFinite(pl.baseMaxHp)) pl.baseMaxHp = Number.isFinite(pl.baseHp) ? pl.baseHp :
      (pl.mon && Number.isFinite(pl.mon.hp) ? pl.mon.hp : (Number.isFinite(pl.maxHp) ? pl.maxHp : 100));
    const beforeMax = Number.isFinite(pl.maxHp) ? pl.maxHp : pl.baseMaxHp;
    const next = player(pl, options);
    pl.maxHp = next.maxHp;
    if (!Number.isFinite(pl.hp)) pl.hp = next.maxHp;
    else pl.hp = Math.min(next.maxHp, pl.hp + Math.max(0, next.maxHp - beforeMax));
    pl.spdMul = next.spdMul;
    pl.dmgReduce = next.dmgReduce;
    pl.regenFlat = next.regenFlat;
    pl.magnet = next.magnet;
    pl.xpMul = next.xpMul;
    pl.atkMul = 1 + next.powerBonus;
    pl.cdMul = 1 - next.cadenceReduction;
    pl.reloadMul = 1 - next.reloadReduction;
    pl.skillCooldownMul = 1 - next.skillReduction;
    return next;
  }
  function weapon(pl, copy) {
    const catalog = G.FieldCatalog, model = typeof copy === 'string' ? copy : (copy && copy.model);
    const d = catalog && catalog.models[model];
    if (!d) throw new Error(`Unknown field weapon model: ${model}`);
    const ids = typeof copy === 'object' && Array.isArray(copy.mods) ? copy.mods : [];
    if (!catalog.validateMods(model, ids)) throw new Error(`Invalid mods for ${model}`);
    const out = { model, name: d.name, damage: d.damage, interval: d.interval, capacity: d.capacity,
      reloadTime: d.reloadTime, range: d.range, speed: d.speed, spread: d.spread,
      pellets: d.pellets, pierce: d.pierce || 0 };
    let modDamage = 0, modInterval = 0, modReload = 0, modSpread = 0;
    for (const id of ids) {
      const m = catalog.mods[id];
      if (m.damage) modDamage += m.damage;
      if (m.interval) modInterval += m.interval;
      if (m.capacity) out.capacity = Math.floor(out.capacity * (1 + m.capacity));
      if (m.reloadTime) modReload += m.reloadTime;
      if (m.spread) modSpread += m.spread;
      if (m.pierce) out.pierce += m.pierce;
    }
    const stats = player(pl || {});
    out.damage *= 1 + modDamage + stats.powerBonus + 0.1 * (Math.max(1, Math.min(5, Number(copy && copy.level) || 1)) - 1);
    out.interval *= 1 - Math.min(0.6, stats.cadenceReduction - modInterval);
    out.reloadTime *= 1 - Math.min(0.6, stats.reloadReduction - modReload);
    out.spread *= 1 + modSpread;
    return out;
  }
  function capFor(key, pl) {
    const p = player(pl), t = p.training;
    if (key === 'health') return 10;
    if (key === 'power') return 10;
    if (key === 'mobility') return Math.max(0, (0.5 - 0.02 * t.mobility) / 0.07);
    if (key === 'protection') return Math.max(0, (0.7 - 0.02 * t.protection) / 0.06);
    if (key === 'cadence') return Math.max(0, (0.6 - 0.02 * t.cadence) / 0.08);
    if (key === 'recovery') return 5;
    if (key === 'collection') return 5;
    if (key === 'learning') return 10;
    return 0;
  }
  function eligibleAmount(pl, key) { return Math.max(0, capFor(key, pl) - count(pl.tempStats || {}, key)); }
  return { player, apply, weapon, tempStats, trainingKeys: TRAINING.slice(), temporaryKeys: TEMP.slice(), eligibleAmount };
})();
