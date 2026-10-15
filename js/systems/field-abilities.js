/* Soldier abilities. Cooldowns live on the player so sector transitions preserve them. */
G.FieldAbilities = (() => {
  const SPRINT_DURATION = 2;
  const SPRINT_COOLDOWN = 20;
  const HEAL_COOLDOWN = 30;
  const HEAL_FRACTION = 0.30;
  const ACTIVE_SPRINT_BONUS = 0.6;

  function kindFor(pl) {
    return pl && pl.soldierId === 'guard' ? 'sprint' : pl && pl.soldierId === 'medic' ? 'heal' : null;
  }
  function alive(pl) {
    return !!pl && pl.hp > 0 && !pl.dead;
  }
  function data(pl) {
    if (!pl.fieldAbility || pl.fieldAbility.kind !== kindFor(pl)) {
      pl.fieldAbility = { kind: kindFor(pl), remaining: 0, cooldown: 0, duration: kindFor(pl) === 'sprint' ? SPRINT_DURATION : 0 };
    }
    return pl.fieldAbility;
  }
  function stats(pl) {
    return G.FieldStats ? G.FieldStats.player(pl) : { maxHp: Number(pl.maxHp) || 100, skillReduction: 0 };
  }
  function maxCooldown(pl, kind = kindFor(pl)) {
    const base = kind === 'sprint' ? SPRINT_COOLDOWN : kind === 'heal' ? HEAL_COOLDOWN : 0;
    const reduction = stats(pl).skillReduction || 0;
    return base * (1 - Math.min(0.6, Math.max(0, reduction)));
  }
  function reset(pl) {
    if (!pl) return state(null);
    pl.fieldAbility = { kind: kindFor(pl), remaining: 0, cooldown: 0, duration: kindFor(pl) === 'sprint' ? SPRINT_DURATION : 0 };
    if (G.FieldStats && G.FieldStats.apply) G.FieldStats.apply(pl, { sprintBonus: 0 });
    return state(pl);
  }
  function tick(dt, pl) {
    if (!pl) return state(null);
    const a = data(pl), step = Number.isFinite(dt) ? Math.max(0, dt) : 0;
    a.remaining = Math.max(0, a.remaining - step);
    a.cooldown = Math.max(0, a.cooldown - step);
    if (G.FieldStats && G.FieldStats.apply) G.FieldStats.apply(pl, { sprintBonus: a.kind === 'sprint' && a.remaining > 0 && alive(pl) ? ACTIVE_SPRINT_BONUS : 0 });
    return state(pl);
  }
  function sprint(pl) {
    if (!pl || kindFor(pl) !== 'sprint' || !alive(pl)) return false;
    const a = data(pl);
    if (a.cooldown > 0) return false;
    a.remaining = SPRINT_DURATION;
    a.duration = SPRINT_DURATION;
    a.cooldown = maxCooldown(pl, 'sprint');
    if (G.FieldStats && G.FieldStats.apply) G.FieldStats.apply(pl, { sprintBonus: ACTIVE_SPRINT_BONUS });
    return true;
  }
  function canHealIn(phase) {
    return ['combat', 'boss', 'escaping', 'preparation'].includes(phase);
  }
  function canSprintIn(phase) {
    return ['combat', 'boss', 'escaping', 'preparation', 'explore', 'exploration'].includes(phase);
  }
  function use(pl, phase) {
    const kind = kindFor(pl);
    if (!pl || !alive(pl)) return false;
    if (kind === 'sprint') return canSprintIn(phase) ? sprint(pl) : false;
    if (kind !== 'heal' || !canHealIn(phase)) return false;
    const a = data(pl), maxHp = stats(pl).maxHp;
    if (a.cooldown > 0 || !Number.isFinite(pl.hp) || pl.hp >= maxHp) return false;
    pl.hp = Math.min(maxHp, pl.hp + maxHp * HEAL_FRACTION);
    a.cooldown = maxCooldown(pl, 'heal');
    return true;
  }
  function state(pl) {
    if (!pl) return { kind: null, remaining: 0, cooldown: 0, duration: 0, maxCooldown: 0 };
    const a = data(pl);
    return { kind: a.kind, remaining: a.remaining, cooldown: a.cooldown, duration: a.duration, maxCooldown: maxCooldown(pl, a.kind) };
  }
  return { reset, tick, use, sprint, state };
})();
