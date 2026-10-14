/* P02: controlador local de la primera partida, sobre los módulos de la base. */
G.Expedition = (() => {
  let pl = null, phase = 'idle', sector = 1, wave = 1, spawned = 0, quota = 12;
  let spawnClock = 0, prep = 20, pending = 0, cards = [], waveKills = 0;
  let objectives = [];
  let elapsed = 0, extract = 0, startX = 0, startY = 0, result = null;
  const exit = { x: 512, y: 0, r: 72 };
  function snapshot() {
    return { phase, sector, wave, spawned, quota, kills: pl ? pl.kills - waveKills : 0,
      prep, pending, cards, elapsed, extract, result, exit, nearExit: !!pl && G.U.dist(pl.x, pl.y, exit.x, exit.y) <= exit.r };
  }
  function map() {
    G.World.reset(2400 + sector); G.World.setFixture(G.Content.sectors[sector - 1]);
    G.World.setBiome(1, true); G.Path.clear(); G.Pickups.clear();
    G.EnemyMgr.clear(); G.Projectiles.clear();
    pl.x = 0; pl.y = 0; exit.x = sector === 1 ? 512 : -512; G.Path.update(1, [pl]); G.Camera.x = 0; G.Camera.y = 0; G.Touch.reset(); G.Input.reset();
  }
  function start(player) {
    pl = player; pl.fieldMode = true; pl.weaponLevel = 1; pl.tempStats = {};
    phase = 'combat'; sector = 1; wave = 1; elapsed = 0; result = null;
    pending = 0; cards = []; extract = 0; G.FieldCombat.reset(); map(); beginWave();
  }
  function freeSpawn(enemy) {
    const margin = G.Camera.w / 2 + 48;
    for (let attempt = 0; attempt < 60; attempt++) {
      const side = (attempt + Math.floor(Math.random() * 4)) % 4;
      const along = G.U.rand(-140, 140);
      let x = pl.x + (side === 0 ? margin : side === 1 ? -margin : along);
      let y = pl.y + (side === 2 ? margin : side === 3 ? -margin : along);
      if (G.Camera.sees(x, y, 20) || !G.World.isFree(x, y, 13) || !G.Path.reachable(x, y, pl)) continue;
      if (enemy) { enemy.x = x; enemy.y = y; enemy.pursuerWarn = 0; enemy.stalled = 0; }
      return [x, y];
    }
    return null;
  }
  function spawnOne() {
    if (spawned >= quota || G.EnemyMgr.count >= G.Spawner.CAP) return false;
    const pos = freeSpawn(); if (!pos) return false;
    const sc = { hp: 1 + .15 * (sector - 1) + .05 * (wave - 1), dmg: 1 + .08 * (sector - 1), spd: 1 + .02 * (sector - 1) };
    const enemy = G.EnemyMgr.add(new G.Enemy(G.Content.pursuer, pos[0], pos[1], sc)); objectives.push(enemy); spawned++;
    return true;
  }
  function beginWave() {
    phase = 'combat'; spawned = 0; objectives = []; spawnClock = 0; cards = [];
    quota = sector === 1 && wave === 1 ? 12 : Math.min(60, 16 + 4 * (sector - 1) + 2 * (wave - 1));
    waveKills = pl.kills;
    for (let i = 0; i < 4; i++) spawnOne();
    G.Spawner.say(`Sector ${sector} · Oleada ${wave} · Neutraliza ${quota}`, 3, true);
  }
  function collect(item) {
    if (item.kind === 'xp' || item.kind === 'xpBig') pending += pl.gainXp(item.value);
  }
  function closeWave() {
    for (const item of [...G.Pickups.all()]) {
      if (item.kind === 'xp' || item.kind === 'xpBig') { collect(item); G.Pickups.removeId(item.id); }
    }
    G.Projectiles.clear(); phase = 'preparation'; prep = 20;
    cards = pending > 0 ? G.FieldUpgrades.offer(pl) : [];
    G.Touch.reset(); G.Input.reset();
  }
  function choose(index) {
    if (phase !== 'preparation' || pending <= 0 || !cards[index]) return false;
    cards[index].apply(pl); pending--;
    cards = pending ? G.FieldUpgrades.offer(pl) : []; G.Input.reset(); G.Touch.reset();
    return true;
  }
  function ready() {
    if (phase !== 'preparation' || pending) return false;
    if (wave < 3) { wave++; beginWave(); }
    else { phase = 'exploration'; G.Spawner.say(sector === 1 ? 'Sector despejado · busca la salida al este' : 'Extracción disponible · salida al oeste', 4, true); }
    return true;
  }
  function useExit() {
    if (phase !== 'exploration' || G.U.dist(pl.x, pl.y, exit.x, exit.y) > exit.r) return false;
    if (sector === 1) { sector = 2; wave = 1; map(); beginWave(); }
    else { phase = 'extracting'; extract = 3; startX = pl.x; startY = pl.y; G.Input.reset(); G.Touch.reset(); }
    return true;
  }
  function finish(reason) {
    if (phase === 'finished') return;
    phase = 'finished'; cards = []; G.Input.reset(); G.Touch.reset(); G.Projectiles.clear();
    result = { reason, sector, wave, kills: pl.kills, level: pl.level, elapsed, hp: pl.hp };
  }
  function update(dt) {
    if (!pl || phase === 'idle' || phase === 'finished') return;
    if (pl.dead || pl.hp <= 0) { finish('death'); return; }
    if (phase === 'preparation' && pending > 0) return;
    elapsed += dt;
    G.FieldCombat.tick(dt, pl, phase === 'combat');
    const regen = pl.regenFlat;
    if (phase === 'exploration' || phase === 'extracting') pl.regenFlat = 0;
    pl.update(dt); pl.regenFlat = regen;
    G.Camera.follow(pl.x, pl.y, dt); G.World.update(dt, G.Camera);
    G.FX.update(dt); G.Spawner.tickBanner(dt);
    if (phase === 'combat') {
      spawnClock += dt * (.55 + .06 * (sector - 1) + .03 * (wave - 1));
      while (spawnClock >= 1 && spawned < quota) { if (!spawnOne()) break; spawnClock--; }
      G.Path.update(dt, [pl]); G.EnemyMgr.update(dt, [pl]);
      G.Projectiles.update(dt, pl, G.EnemyMgr.all()); G.Combat.resolve(dt, pl, elapsed);
      G.Pickups.update(dt, pl, collect);
      for (const enemy of objectives) {
        if (!enemy.dead && !G.EnemyMgr.get(enemy.id)) G.EnemyMgr.add(enemy);
        if (enemy.dead) continue;
        const moved = enemy.lastX == null ? 1 : Math.hypot(enemy.x - enemy.lastX, enemy.y - enemy.lastY);
        enemy.stalled = moved < .05 ? (enemy.stalled || 0) + dt : 0;
        enemy.lastX = enemy.x; enemy.lastY = enemy.y;
        const reachable = G.Path.reachable(enemy.x, enemy.y, pl);
        enemy.unreachable = reachable ? 0 : (enemy.unreachable || 0) + dt;
        if ((enemy.stalled > 10 || enemy.unreachable > 10) && !G.Camera.sees(enemy.x, enemy.y, 0)) {
          if (freeSpawn(enemy)) { enemy.unreachable = 0; enemy.stalled = 0; }
        }
      }
      if (pl.dead) { finish('death'); return; }
      if (spawned === quota && pl.kills - waveKills >= quota && G.EnemyMgr.count === 0) closeWave();
    } else if (phase === 'preparation') { prep = Math.max(0, prep - dt); if (prep === 0) ready(); }
    else if (phase === 'extracting') {
      if (Math.hypot(pl.x - startX, pl.y - startY) > 1 || G.Input.axis().some(n => n !== 0)) { phase = 'exploration'; extract = 0; }
      else if ((extract -= dt) <= 0) finish('extracted');
    }
  }
  function draw(ctx) {
    if (phase !== 'exploration' && phase !== 'extracting') return;
    ctx.save(); ctx.fillStyle = '#5ac6a233'; ctx.strokeStyle = '#99ffd6'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(exit.x, exit.y, 42, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#bdffe0'; ctx.font = 'bold 14px system-ui'; ctx.textAlign = 'center';
    ctx.fillText(sector === 1 ? 'SIGUIENTE SECTOR' : 'EXTRACCIÓN', exit.x, exit.y - 52);
    ctx.restore();
  }
  return { start, update, choose, ready, useExit, finish, draw, get state() { return snapshot(); } };
})();
