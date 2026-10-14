/* IA del Perseguidor de contención. Conserva el movimiento y el gestor comunes. */
(() => {
  const WARN = 0.6, COOLDOWN = 1.5;
  function clearStrikeLine(e, pl, reach) {
    if (!G.World.projectileBlock) return true;
    const dx = pl.x - e.x, dy = pl.y - e.y, len = Math.hypot(dx, dy);
    for (let t = 8; t < len; t += 8) {
      if (G.World.projectileBlock(e.x + dx * t / len, e.y + dy * t / len, 2)) return false;
    }
    return len <= reach;
  }
  function tick(e, dt, pl) {
    if (e.behavior === 'biological') return G.BiologicalAI.tick(e, dt, pl);
    if (e.behavior === 'containmentBoss') return G.ContainmentBoss.tick(e, dt, pl);
    if (e.flash > 0) e.flash = Math.max(0, e.flash - dt);
    e.anim.update(dt);
    if (e.dead) { e.fade -= dt; return; }
    e.bob += dt * 6;
    e.pursuerCd = Math.max(0, (e.pursuerCd || 0) - dt);
    const d = G.U.dist(e.x, e.y, pl.x, pl.y), reach = e.r + pl.r + 18;
    if (e.pursuerWarn > 0) {
      e.pursuerWarn = Math.max(0, e.pursuerWarn - dt);
      e.anim.dir = G.Sprites.dirFromAngle(Math.atan2(e.pursuerDy, e.pursuerDx));
      e.anim.loop('Idle');
      if (e.pursuerWarn === 0) {
        e.pursuerCd = COOLDOWN;
        const [tx, ty] = G.U.norm(pl.x - e.x, pl.y - e.y);
        const facing = tx * e.pursuerDx + ty * e.pursuerDy;
        if (d <= e.pursuerReach && facing >= 0.5 && clearStrikeLine(e, pl, e.pursuerReach)) {
          pl.hurt(e.dmg);
          e.anim.play('Attack', { speed: 1.5 });
          G.FX.ring(e.x, e.y, e.r, reach, '#ff4148', 0.22, 3);
        }
      }
      return;
    }
    if (d <= reach && e.pursuerCd <= 0) {
      const [dx, dy] = G.U.norm(pl.x - e.x, pl.y - e.y);
      e.pursuerDx = dx; e.pursuerDy = dy; e.pursuerWarn = WARN; e.pursuerReach = reach;
      e.anim.dir = G.Sprites.dirFromAngle(Math.atan2(dy, dx));
      e.anim.loop('Idle');
      return;
    }
    let [dx, dy] = G.U.norm(pl.x - e.x, pl.y - e.y);
    const path = !e.flying && G.Path.dirFor(e, pl);
    if (path) [dx, dy] = path;
    const oldX = e.x, oldY = e.y;
    e.x += dx * e.spd * dt; e.y += dy * e.spd * dt;
    if (!e.flying) G.World.collide(e);
    const moving = Math.hypot(e.x - oldX, e.y - oldY) > 0.5;
    e.anim.dir = G.Sprites.dirFromAngle(moving ? Math.atan2(dy, dx) : Math.atan2(pl.y - e.y, pl.x - e.x));
    e.anim.loop(moving ? 'Walk' : 'Idle', moving ? Math.max(0.6, e.spd / 70) : 1);
  }
  function draw(ctx, e) {
    if (e.behavior === 'biological') return G.BiologicalAI.draw(ctx, e);
    if (e.behavior === 'containmentBoss') return G.ContainmentBoss.draw(ctx, e);
    if (!e.pursuerWarn || e.dead) return;
    ctx.save();
    ctx.globalAlpha = 0.23 + Math.sin((0.6 - e.pursuerWarn) * 35) * 0.08;
    ctx.fillStyle = '#ff4148';
    const a = Math.atan2(e.pursuerDy, e.pursuerDx), r = e.pursuerReach;
    ctx.beginPath(); ctx.moveTo(e.x, e.y); ctx.arc(e.x, e.y, r, a - Math.PI / 3, a + Math.PI / 3); ctx.closePath(); ctx.fill();
    ctx.globalAlpha = 0.8; ctx.strokeStyle = '#ff4148'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(e.x, e.y, r, a - Math.PI / 3, a + Math.PI / 3); ctx.stroke();
    ctx.restore();
  }
  G.ContainmentAI = { tick, draw };
})();
