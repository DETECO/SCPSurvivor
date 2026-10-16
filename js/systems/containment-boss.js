/* IA del Warden de contención de la expedición local. */
(() => {
  const STRIKE_WARN = 0.85;
  const STRIKE_RANGE = 64;
  const SUMMON_INTERVAL = 8;
  const SUMMON_WARN = 1;
  const MAX_MINIONS = 4;
  const CAP = 64;
  const DIMENSIONAL_INTERVAL = 6, DIMENSIONAL_WARN = 1.2, DIMENSIONAL_RANGE = 60;

  function hasLine(e, x, y) {
    if (!G.World.projectileBlock) return true;
    const dx = x - e.x, dy = y - e.y, len = Math.hypot(dx, dy);
    if (!len) return true;
    for (let t = 8; t < len; t += 8) {
      if (G.World.projectileBlock(e.x + dx * t / len, e.y + dy * t / len, 2)) return false;
    }
    return true;
  }

  function livingMinions(e) {
    if (!Array.isArray(e.minions)) e.minions = [];
    e.minions = e.minions.filter(m => m && !m.dead && m.hp > 0);
    return e.minions.length;
  }

  function dimensionalTick(e, dt, pl) {
    if (e.dimensionalArrival > 0) {
      e.dimensionalArrival = Math.max(0,e.dimensionalArrival-dt);
      if(e.dimensionalArrival < 1e-8)e.dimensionalArrival=0;
      if(e.anim?.loop)e.anim.loop('Idle');
      return true;
    }
    e.bossDimensionalT = (e.bossDimensionalT || 0) + dt;
    if (e.bossDimensionalWarn > 0) {
      e.bossDimensionalWarn = Math.max(0,e.bossDimensionalWarn-dt);
      if(e.anim?.loop)e.anim.loop('Idle');
      if (e.bossDimensionalWarn < 1e-8) {
        e.bossDimensionalWarn = 0;
        const origin={x:e.bossDimensionalX,y:e.bossDimensionalY};
        if (Math.hypot(pl.x-origin.x,pl.y-origin.y) <= DIMENSIONAL_RANGE+(pl.r||0) &&
            hasLine(e,pl.x,pl.y) && hasLine(origin,pl.x,pl.y)) pl.hurt(e.dmg);
        G.FX?.ring?.(e.bossDimensionalX,e.bossDimensionalY,DIMENSIONAL_RANGE,DIMENSIONAL_RANGE*1.3,'#ff5964',.28,3);
      }
      return true;
    }
    // Nunca congelar otro aviso en curso; el pulso espera hasta que termine.
    if (e.bossDimensionalT >= DIMENSIONAL_INTERVAL && !(e.bossWarn>0) && !(e.bossSummonWarn>0)) {
      e.bossDimensionalT = 0;e.bossDimensionalWarn = DIMENSIONAL_WARN;
      e.bossDimensionalX = pl.x;e.bossDimensionalY = pl.y;
      if(e.anim?.loop)e.anim.loop('Idle');
      return true;
    }
    return false;
  }

  function tick(e, dt, pl) {
    if (e.dead) { if (Number.isFinite(e.fade)) e.fade -= dt; return; }
    if (!pl || pl.dead) return;
    if (e.flash > 0) e.flash = Math.max(0, e.flash - dt);
    if (e.anim && e.anim.update) e.anim.update(dt);
    if (e.dimensional === true && dimensionalTick(e,dt,pl)) return;
    const half = e.hp < e.maxHp * 0.5;
    const speed = (e.spd || 45) * (half ? 1.15 : 1);
    const d = Math.hypot(pl.x - e.x, pl.y - e.y);

    const alive = livingMinions(e);
    const enemyCount = G.EnemyMgr && Number.isFinite(G.EnemyMgr.count) ? G.EnemyMgr.count : 0;
    const capacity = Math.max(0, Math.min(MAX_MINIONS - alive, CAP - enemyCount));
    if (e.bossSummonWarn > 0) {
      e.bossSummonWarn = Math.max(0, e.bossSummonWarn - dt);
      if (e.bossSummonWarn < 1e-8) {
        e.bossSummonWarn = 0;
        if (capacity > 0 && G.Expedition && G.Expedition.summon) G.Expedition.summon(e, Math.min(2, capacity));
        e.bossSummonT = 0;
      }
    } else if (capacity > 0) {
      e.bossSummonT = (e.bossSummonT || 0) + dt;
      if (e.bossSummonT >= SUMMON_INTERVAL) {
        e.bossSummonT -= SUMMON_INTERVAL;
        e.bossSummonWarn = SUMMON_WARN;
      }
    }

    // A strike snapshots its center and holds the Warden still through the cue.
    if (e.bossWarn > 0) {
      e.bossWarn = Math.max(0, e.bossWarn - dt);
      if (e.bossWarn < 1e-8) e.bossWarn = 0;
      if (e.anim && e.anim.loop) e.anim.loop('Idle');
      if (!e.bossWarn) {
        e.bossCd = half ? 2 : 2.5;
        const dx = pl.x - e.bossStrikeX, dy = pl.y - e.bossStrikeY;
        const reach = STRIKE_RANGE + (pl.r || 0);
        if (dx * dx + dy * dy <= reach * reach && hasLine(e, pl.x, pl.y)) {
          pl.hurt(e.dmg);
          if (e.anim && e.anim.play) e.anim.play('Attack', { speed: 1.4 });
          if (G.FX && G.FX.ring) G.FX.ring(e.bossStrikeX, e.bossStrikeY, STRIKE_RANGE, STRIKE_RANGE * 1.35, '#ff4148', 0.28, 3);
        }
      }
      return;
    }

    e.bossCd = Math.max(0, (e.bossCd || 0) - dt);
    if (e.bossCd <= 0 && d <= STRIKE_RANGE + (pl.r || 0)) {
      e.bossStrikeX = e.x; e.bossStrikeY = e.y; e.bossWarn = STRIKE_WARN;
      if (e.anim && e.anim.loop) e.anim.loop('Idle');
      return;
    }

    let [dx, dy] = G.U.norm(pl.x - e.x, pl.y - e.y);
    const path = !e.flying && G.Path && G.Path.dirFor && G.Path.dirFor(e, pl);
    if (path) [dx, dy] = path;
    const stop = (e.r || 22) + (pl.r || 0) + 10;
    if (d <= stop) dx = dy = 0;
    const ox = e.x, oy = e.y;
    e.x += dx * speed * dt; e.y += dy * speed * dt;
    if (!e.flying && G.World.collide) G.World.collide(e);
    const moving = Math.hypot(e.x - ox, e.y - oy) > 0.5;
    if (e.anim) {
      e.anim.dir = G.Sprites.dirFromAngle(Math.atan2(moving ? dy : pl.y - e.y, moving ? dx : pl.x - e.x));
      e.anim.loop(moving ? 'Walk' : 'Idle', moving ? Math.max(0.6, speed / 70) : 1);
    }
  }

  function draw(ctx, e) {
    if (e.dead) return;
    if (e.dimensional === true && (e.dimensionalArrival > 0 || e.bossDimensionalWarn > 0)) {
      const pulse=e.bossDimensionalWarn>0,x=pulse?e.bossDimensionalX:e.x,y=pulse?e.bossDimensionalY:e.y;
      ctx.save();ctx.globalAlpha=.3;ctx.fillStyle='#ff5964';ctx.strokeStyle='#fff0f0';ctx.lineWidth=3;
      ctx.beginPath();ctx.arc(x,y,pulse?DIMENSIONAL_RANGE:48,0,Math.PI*2);ctx.fill();ctx.globalAlpha=.9;ctx.stroke();
      ctx.fillStyle='#fff0f0';ctx.font='bold 12px system-ui';ctx.textAlign='center';ctx.fillText(pulse?'PULSO · APÁRTATE':'EMERGIENDO',x,y-(pulse?DIMENSIONAL_RANGE:48)-12);ctx.restore();
    }
    if (e.bossWarn > 0) {
      const p = 1 - e.bossWarn / STRIKE_WARN;
      ctx.save(); ctx.globalAlpha = 0.25 + 0.55 * p;
      ctx.fillStyle = '#ff4148'; ctx.strokeStyle = '#ff7777'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(e.bossStrikeX, e.bossStrikeY, STRIKE_RANGE, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.restore();
    }
    if (e.bossSummonWarn > 0) {
      ctx.save(); ctx.globalAlpha = 0.55 + 0.25 * Math.sin((SUMMON_WARN - e.bossSummonWarn) * 18);
      ctx.strokeStyle = '#9fffe0'; ctx.lineWidth = 3; ctx.setLineDash([5, 4]);
      ctx.beginPath(); ctx.arc(e.x, e.y, (e.r || 22) + 18, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]); ctx.restore();
    }
  }

  G.ContainmentBoss = { tick, draw };
})();
