/* Seeded local-sector layouts. Geometry is expressed in world tile coordinates. */
G.SectorMaps = (() => {
  const TS = G.Tiles.T * G.Sprites.PX;
  const hash = (seed, n) => G.U.hash(n, seed, 7301 + n * 97);
  const jitter = (seed, n, amount) => Math.floor(hash(seed, n) * (amount * 2 + 1)) - amount;

  function generate(seed = 1, options = {}) {
    seed = Number.isFinite(Number(seed)) ? Number(seed) | 0 : 1;
    const boss = !!options.boss;
    const floors = new Set(), rooms = [], modules = [];
    const addFloor = (x, y) => floors.add(`${x},${y}`);
    const carveRoom = (role, cx, cy, w, h) => {
      const x = cx - Math.floor(w / 2), y = cy - Math.floor(h / 2);
      for (let ty = y; ty < y + h; ty++) for (let tx = x; tx < x + w; tx++) addFloor(tx, ty);
      const room = { id: `room-${rooms.length + 1}`, role, x, y, w, h, cx, cy };
      rooms.push(room); modules.push({ id: room.id, role, x, y, w, h });
      return room;
    };
    const corridor = (ax, ay, bx, by, horizontalFirst = true) => {
      const steps = [];
      let x = ax, y = ay;
      const run = (end, axis) => {
        while ((axis === 'x' ? x : y) !== end) {
          for (let w = -1; w <= 2; w++) addFloor(axis === 'x' ? x : x + w, axis === 'x' ? y + w : y);
          if (axis === 'x') x += Math.sign(end - x); else y += Math.sign(end - y);
        }
      };
      if (horizontalFirst) { run(bx, 'x'); run(by, 'y'); }
      else { run(by, 'y'); run(bx, 'x'); }
      return steps;
    };

    let entry, exit, bossSpawn;
    if (!boss) {
      const openX = 14 + jitter(seed, 1, 2), coverX = 29 + jitter(seed, 2, 2);
      const crossY = 14 + jitter(seed, 3, 2), exitY = 22 + jitter(seed, 4, 1);
      const a = carveRoom('entry', 0, 0, 16, 16);
      const b = carveRoom('openroom', openX, 0, 16 + Math.floor(hash(seed, 5) * 5), 16);
      const c = carveRoom('coverroom', coverX, -1, 16, 16);
      const d = carveRoom('intersection', openX, crossY, 16, 16);
      const e = carveRoom('exit', 0, exitY, 16, 16);
      const annex = carveRoom('coverroom', 29 + jitter(seed, 6, 1), 15, 14, 14);
      corridor(a.x + a.w - 1, 0, b.x, 0);
      corridor(b.x + b.w - 1, 0, c.x, -1);
      corridor(openX, b.y + b.h - 1, openX, d.y, false);
      corridor(0, a.y + a.h - 1, 0, e.y, false);
      corridor(c.cx, c.y + c.h - 1, annex.cx, annex.y, false);
      // The sixth module describes the principal, four-tile passage segment.
      modules.push({ id: 'corridor-main', role: 'corridor', x: 7, y: -2, w: Math.max(4, openX - 7), h: 4 });
      entry = { x: (a.cx + 0.5) * TS, y: (a.cy + 0.5) * TS };
      exit = { x: (e.cx + 0.5) * TS, y: (e.cy + 0.5) * TS };
      bossSpawn = { x: (c.cx + 0.5) * TS, y: (c.cy + 0.5) * TS };
    } else {
      const arena = carveRoom('openroom', 0, 0, 36, 36);
      const entryRoom = carveRoom('entry', 0, 25, 16, 16);
      const cover = carveRoom('coverroom', -28, 0, 16, 16);
      const cross = carveRoom('intersection', 27, 0, 16, 16);
      const out = carveRoom('exit', 23, 24, 16, 16);
      const annex = carveRoom('corridor', 0, -28, 14, 14);
      corridor(0, arena.y + arena.h - 1, 0, entryRoom.y, false);
      corridor(arena.x, 0, cover.x + cover.w - 1, 0);
      corridor(arena.x + arena.w - 1, 0, cross.x, 0);
      corridor(cross.cx, cross.y + cross.h - 1, out.cx, out.y, false);
      corridor(0, arena.y, annex.cx, annex.y + annex.h - 1, false);
      modules.push({ id: 'corridor-arena', role: 'corridor', x: -2, y: 17, w: 4, h: 8 });
      entry = { x: 0.5 * TS, y: 25.5 * TS };
      exit = { x: 23.5 * TS, y: 24.5 * TS };
      bossSpawn = { x: 0.5 * TS, y: -8.5 * TS };
    }

    // Small paired wall pillars give cover rooms shape while leaving the
    // central axes clear for the four-tile approaches and roomy movement.
    for (let ri = 0; ri < rooms.length; ri++) {
      const room = rooms[ri];
      if (room.role !== 'coverroom') continue;
      for (const sx of [-1, 1]) for (const sy of [-1, 1]) {
        if (hash(seed, 30 + ri * 4 + (sx + 1) + (sy + 1) * 2) > 0.72) continue;
        const px = room.cx + sx * 3, py = room.cy + sy * 3;
        for (let dy = 0; dy < 2; dy++) for (let dx = 0; dx < 2; dx++) floors.delete(`${px + dx},${py + dy}`);
      }
    }

    const all = [...floors].map(k => k.split(',').map(Number));
    const floorTiles = all.sort((a, b) => a[1] - b[1] || a[0] - b[0]);
    const minX = -42, maxX = 43, minY = -38, maxY = 39;
    const floorSet = floors;
    const walls = [];
    // Fixture bounds are finite; all omitted tiles inside are walls, matching the legacy API.
    for (let ty = minY + 1; ty < maxY; ty++) for (let tx = minX + 1; tx < maxX; tx++) if (!floorSet.has(`${tx},${ty}`)) walls.push([tx, ty]);
    // Keep a dense deterministic pool around the entry so the director can
    // filter it by camera visibility and its 28-tile pathing field. Every
    // candidate has a full neighboring-tile margin for a 13px body.
    const spawnPoints = [];
    const stride = 3 + (seed & 1);
    for (let i = Math.abs(seed) % stride; i < floorTiles.length; i += stride) {
      const [x, y] = floorTiles[i];
      if (Math.hypot(x + 0.5 - entry.x / TS, y + 0.5 - entry.y / TS) < 7) continue;
      let clear = true;
      for (let dy = -1; dy <= 1 && clear; dy++) for (let dx = -1; dx <= 1; dx++) {
        if (!floorSet.has(`${x + dx},${y + dy}`)) { clear = false; break; }
      }
      if (clear) spawnPoints.push({ x: (x + 0.5) * TS, y: (y + 0.5) * TS });
    }
    return { seed, fixture: { minX, maxX, minY, maxY, walls }, entry, exit, bossSpawn, rooms, modules, floorTiles, spawnPoints };
  }

  return { generate };
})();
