/* P03 biological containment enemy: readable fixed-aim projectile warnings. */
(() => {
  const RANGE = 260, WARN = 0.6, COOLDOWN = 2.2, SHOT_SPEED = 190;
  const COMFORT = 188, RETREAT = 132;

  function hasLine(e, target) {
    if (!G.World.projectileBlock) return true;
    const dx = target.x - e.x, dy = target.y - e.y, len = Math.hypot(dx, dy);
    if (len < 1) return true;
    const steps = Math.ceil(len / 8);
    for (let i = 1; i < steps; i++) {
      const t = i / steps;
      if (G.World.projectileBlock(e.x + dx * t, e.y + dy * t, 2)) return false;
    }
    return true;
  }

  function onScreen(e) {
    return !G.Camera || !G.Camera.sees || G.Camera.sees(e.x, e.y, 0);
  }

  function tick(e, dt, pl) {
    if (e.flash > 0) e.flash = Math.max(0, e.flash - dt);
    if (e.anim && e.anim.update) e.anim.update(dt);
    if (e.dead) { e.fade -= dt; return; }
    e.bob = (e.bob || 0) + dt * 5;
    e.bioCd = Math.max(0, (e.bioCd || 0) - dt);
    if (e.bioCd < 1e-6) e.bioCd = 0;

    const dxTo = pl.x - e.x, dyTo = pl.y - e.y;
    const d = Math.hypot(dxTo, dyTo);
    const los = onScreen(e) && hasLine(e, pl);

    if (e.bioWarn > 0) {
      e.bioWarn = Math.max(0, e.bioWarn - dt);
      if (e.bioWarn < 1e-8) e.bioWarn = 0;
      if (e.anim) {
        e.anim.dir = G.Sprites.dirFromAngle(Math.atan2(e.bioDy, e.bioDx));
        e.anim.loop('Idle');
      }
      if (e.bioWarn === 0) {
        // A blocked or offscreen target cancels this release. A real release
        // consumes the cooldown even when the player dodges the fixed aim.
        if (onScreen(e) && hasLine(e, pl)) {
          G.Projectiles.spawn({
            x: e.x, y: e.y,
            vx: e.bioDx * SHOT_SPEED, vy: e.bioDy * SHOT_SPEED,
            dmg: e.dmg, r: 5, life: RANGE / SHOT_SPEED,
            friendly: false, homing: 0, color: '#f36b76'
          });
          e.bioCd = COOLDOWN;
          if (e.anim && e.anim.play) e.anim.play('Shoot');
        }
      }
      return;
    }

    if (onScreen(e) && d <= RANGE && e.bioCd <= 0 && los) {
      [e.bioDx, e.bioDy] = G.U.norm(dxTo, dyTo);
      e.bioWarn = WARN;
      if (e.anim) {
        e.anim.dir = G.Sprites.dirFromAngle(Math.atan2(e.bioDy, e.bioDx));
        e.anim.loop('Idle');
      }
      return;
    }

    let mx = 0, my = 0;
    if (!los || d > COMFORT) {
      [mx, my] = G.U.norm(dxTo, dyTo);
      const path = !e.flying && G.Path && G.Path.dirFor && G.Path.dirFor(e, pl);
      if (path) [mx, my] = path;
    } else if (d < RETREAT) {
      [mx, my] = G.U.norm(-dxTo, -dyTo);
    }
    const oldX = e.x, oldY = e.y;
    e.x += mx * e.spd * dt;
    e.y += my * e.spd * dt;
    if (!e.flying && G.World.collide) G.World.collide(e);
    const moving = Math.hypot(e.x - oldX, e.y - oldY) > 0.5;
    if (e.anim) {
      if (moving) e.anim.dir = G.Sprites.dirFromAngle(Math.atan2(my, mx));
      else if (d > 0) e.anim.dir = G.Sprites.dirFromAngle(Math.atan2(dyTo, dxTo));
      e.anim.loop(moving ? 'Walk' : 'Idle', moving ? Math.max(0.6, e.spd / 70) : 1);
    }
  }

  function draw(ctx, e) {
    if (!e.bioWarn || e.dead) return;
    const a = Math.atan2(e.bioDy, e.bioDx), len = RANGE;
    const ex = e.x + Math.cos(a) * len, ey = e.y + Math.sin(a) * len;
    ctx.save();
    ctx.globalAlpha = 0.25 + (WARN - e.bioWarn) / WARN * 0.3;
    ctx.strokeStyle = '#ff6475';
    ctx.lineWidth = 10;
    ctx.setLineDash([12, 8]);
    ctx.beginPath(); ctx.moveTo(e.x, e.y); ctx.lineTo(ex, ey); ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 0.95;
    ctx.strokeStyle = '#ffd2a0'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(e.x, e.y); ctx.lineTo(ex, ey); ctx.stroke();
    ctx.fillStyle = '#ff6475';
    ctx.beginPath(); ctx.arc(ex, ey, 8, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }

  G.BiologicalAI = { tick, draw };
})();
