/* Combate de campo: pistola, cargador y sprint. Usa el motor de proyectiles existente. */
G.FieldCombat = (() => {
  const CAPACITY = 12, RANGE = 320, RELOAD_TIME = 1.5, SHOT_INTERVAL = 0.5;
  const SPRINT_TIME = 2, SPRINT_COOLDOWN = 20;
  let ammo = CAPACITY, reload = 0, shotWait = 0, sprintRemaining = 0, sprintCooldown = 0, shots = 0;
  let aimTarget = null, aimClass = -1;

  function reset() {
    ammo = CAPACITY; reload = 0; shotWait = 0; sprintRemaining = 0;
    sprintCooldown = 0; shots = 0; aimTarget = null; aimClass = -1;
  }

  function distance(pl, e) { return Math.hypot(e.x - pl.x, e.y - pl.y); }
  function visible(pl, e) {
    const dx = e.x - pl.x, dy = e.y - pl.y, length = Math.hypot(dx, dy);
    for (let d = 8; d <= length; d += 8) {
      if (G.World.projectileBlock(pl.x + dx * d / length, pl.y + dy * d / length, 2)) return false;
    }
    return true;
  }
  function category(pl, e) {
    if (distance(pl, e) <= 80) return 0;
    if (e.boss) return 1;
    return 2;
  }
  function targetFor(pl) {
    const candidates = G.EnemyMgr.all().filter(e => e && !e.dead && distance(pl, e) <= RANGE && visible(pl, e));
    if (!candidates.length) { aimTarget = null; aimClass = -1; return null; }
    candidates.sort((a, b) => category(pl, a) - category(pl, b) || distance(pl, a) - distance(pl, b));
    const best = candidates[0], bestClass = category(pl, best);
    if (aimTarget && !aimTarget.dead && candidates.includes(aimTarget) && category(pl, aimTarget) === bestClass &&
        distance(pl, best) > distance(pl, aimTarget) * 0.8) return aimTarget;
    aimTarget = best; aimClass = bestClass;
    return best;
  }

  function tick(dt, pl, fireAllowed) {
    dt = Math.max(0, dt || 0);
    sprintRemaining = Math.max(0, sprintRemaining - dt);
    sprintCooldown = Math.max(0, sprintCooldown - dt);
    shotWait = Math.max(0, shotWait - dt);
    if (reload > 0) {
      reload = Math.max(0, reload - dt);
      if (reload === 0) ammo = CAPACITY;
    }
    if (pl) {
      const mobility = (pl.tempStats || {}).mobility || 0;
      pl.spdMul = 1 + Math.min(0.5, 0.07 * mobility) + (sprintRemaining > 0 ? 0.6 : 0);
    }
    if (!pl || pl.dead || !fireAllowed || reload > 0 || shotWait > 0) return;
    if (ammo <= 0) { reload = RELOAD_TIME; return; }
    const target = targetFor(pl);
    if (!target) return;
    pl.aim = Math.atan2(target.y - pl.y, target.x - pl.x);
    const level = Math.max(1, Math.min(5, pl.weaponLevel || 1));
    const stats = pl.tempStats || {};
    const power = stats.power || 0, cadence = stats.cadence || 0;
    const damage = 10 * (1 + 0.1 * power + 0.1 * (level - 1));
    const interval = SHOT_INTERVAL * (1 - Math.min(0.6, 0.08 * cadence));
    const speed = 400;
    const angle = pl.aim + (Math.random() - 0.5) * (4 * Math.PI / 180);
    G.Projectiles.spawn({ x: pl.x + Math.cos(angle) * 3, y: pl.y + Math.sin(angle) * 3,
      vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
      dmg: damage, r: 3, life: RANGE / speed, pierce: 0, hits: new Set(),
      friendly: true, color: '#e8cf9b', owner: pl });
    ammo--; shots++; shotWait = interval; pl.attackFace = .25;
    if (G.Audio) G.Audio.sfx('shot', { kind: 'projectile', type: 'normal' });
    if (ammo === 0) reload = RELOAD_TIME;
  }

  function sprint(pl) {
    if (!pl || pl.dead || sprintCooldown > 0 || sprintRemaining > 0) return false;
    sprintRemaining = SPRINT_TIME; sprintCooldown = SPRINT_COOLDOWN;
    return true;
  }

  function drawWeapon(ctx, pl) {
    if (!pl || pl.dead) return;
    const a = pl.aim || 0, ca = Math.cos(a), sa = Math.sin(a), side = Math.PI / 2;
    const x = pl.x + ca * 7 - Math.cos(a + side) * 5;
    const y = pl.y - 9 + sa * 7 - Math.sin(a + side) * 5;
    ctx.save(); ctx.translate(x, y); ctx.rotate(a);
    ctx.fillStyle = '#20252b'; ctx.fillRect(-2, -2, 12, 5);
    ctx.fillStyle = '#b8c2cb'; ctx.fillRect(1, -3, 9, 3);
    ctx.fillStyle = '#687681'; ctx.fillRect(-1, 1, 4, 5);
    ctx.restore();
  }

  function getstate() { return { ammo, capacity: CAPACITY, reload, shotWait, sprintRemaining, sprintCooldown, shots }; }
  return { reset, tick, sprint, drawWeapon, getstate, get state() { return getstate(); } };
})();
