const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function loadProductionUtil() {
  const context = { Math };
  context.window = context;
  vm.runInNewContext(fs.readFileSync(require.resolve('../js/core/util.js'), 'utf8'), context);
  return context.G;
}

function setup() {
  const G = loadProductionUtil();
  G.Tiles = { T: 8, BIOMES: [{ liquid: 'water' }], NORMAL: 1 };
  G.Sprites = { PX: 4 };
  vm.runInNewContext(fs.readFileSync(require.resolve('../js/world/sector-maps.js'), 'utf8'), { G, Math, Set });
  return G;
}

function setupWorld() {
  const G = loadProductionUtil();
  G.Tiles = { T: 8, NORMAL: 1, ARENA: 1, BIOMES: [{ liquid: 'water' }] };
  G.Sprites = { PX: 4 };
  vm.runInNewContext(fs.readFileSync(require.resolve('../js/world/world.js'), 'utf8'), { G, Math, Map, Set, Uint8Array });
  vm.runInNewContext(fs.readFileSync(require.resolve('../js/world/sector-maps.js'), 'utf8'), { G, Math, Set });
  return G;
}

test('sector generation is stable for a seed and varies between seeds', () => {
  const G = setup();
  const a = G.SectorMaps.generate(42), b = G.SectorMaps.generate(42), c = G.SectorMaps.generate(43);
  assert.deepEqual(JSON.parse(JSON.stringify(a)), JSON.parse(JSON.stringify(b)));
  assert.notDeepEqual(a.floorTiles, c.floorTiles);
});

test('seeds 0..127 produce six roles, connected floors and reachable exit clearance', () => {
  const G = setup();
  for (let seed = 0; seed < 128; seed++) {
    const m = G.SectorMaps.generate(seed);
    assert.equal(m.seed, seed);
    assert.ok(m.rooms.length >= 6);
    for (const role of ['entry', 'openroom', 'coverroom', 'corridor', 'intersection', 'exit']) assert.ok(m.modules.some(x => x.role === role), `${seed}: ${role}`);
    for (const room of m.rooms) assert.ok(room.w >= 12 && room.h >= 12);
    const floors = new Set(m.floorTiles.map(([x, y]) => `${x},${y}`));
    const start = `${Math.floor(m.entry.x / 32)},${Math.floor(m.entry.y / 32)}`;
    const q = [start], seen = new Set(q);
    for (let i = 0; i < q.length; i++) { const [x, y] = q[i].split(',').map(Number); for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]]) { const k = `${x+dx},${y+dy}`; if (floors.has(k) && !seen.has(k)) { seen.add(k); q.push(k); } } }
    assert.ok(seen.has(`${Math.floor(m.exit.x / 32)},${Math.floor(m.exit.y / 32)}`), `${seed}: exit unreachable`);
    assert.ok(m.spawnPoints.length > 0);
    assert.ok(m.modules.some(x => x.role === 'corridor' && (x.w === 4 || x.h === 4)), `${seed}: corridor should be four tiles wide`);
  }
});

test('every seed offers offscreen first-wave spawn candidates within Path R28', () => {
  const G = setup();
  for (let seed = 0; seed < 128; seed++) {
    const m = G.SectorMaps.generate(seed);
    const entryTx = Math.floor(m.entry.x / 32), entryTy = Math.floor(m.entry.y / 32);
    const floors = new Set(m.floorTiles.map(([x, y]) => `${x},${y}`));
    const queue = [[entryTx, entryTy]], reachable = new Set([`${entryTx},${entryTy}`]);
    for (let i = 0; i < queue.length; i++) {
      const [x, y] = queue[i];
      for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]]) {
        const nx = x + dx, ny = y + dy, k = `${nx},${ny}`;
        if (Math.abs(nx - entryTx) > 28 || Math.abs(ny - entryTy) > 28 || reachable.has(k) || !floors.has(k)) continue;
        if (dx && dy && (!floors.has(`${x + dx},${y}`) || !floors.has(`${x},${y + dy}`))) continue;
        reachable.add(k); queue.push([nx, ny]);
      }
    }
    const candidates = m.spawnPoints.filter(p => {
      const tx = Math.floor(p.x / 32), ty = Math.floor(p.y / 32);
      if (!reachable.has(`${tx},${ty}`)) return false;
      // A 768px viewport spans 24 tiles at the map's 32px tile size.
      if (Math.abs(tx + .5 - m.entry.x / 32) <= 12) return false;
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) if (!floors.has(`${tx + dx},${ty + dy}`)) return false;
      return true;
    });
    assert.ok(candidates.length, `${seed}: no offscreen, clear candidate in the entry pathing radius`);
  }
});

test('fixture replacement invalidates cached tile data and preserves array walls API', () => {
  const G = setupWorld();
  const open = { minX: -2, maxX: 2, minY: -2, maxY: 2, walls: [] };
  const blocked = { minX: -2, maxX: 2, minY: -2, maxY: 2, walls: [[0, 0]] };
  G.World.setFixture(open);
  assert.equal(G.World.kindAt(16, 16), 'floor');
  G.World.setFixture(blocked);
  assert.equal(G.World.kindAt(16, 16), 'wall');
  assert.equal(Array.isArray(G.World.fixture.walls), true);
  assert.deepEqual(Array.from(G.World.fixture.walls[0]), [0, 0]);
});

test('generated entry and exit have real World collision clearance for a 22px body', () => {
  const G = setupWorld();
  const m = G.SectorMaps.generate(73);
  G.World.setFixture(m.fixture);
  assert.equal(Array.isArray(G.World.fixture.walls), true);
  assert.equal(G.World.isFree(m.entry.x, m.entry.y, 22), true);
  assert.equal(G.World.isFree(m.exit.x, m.exit.y, 22), true);
  const start = [Math.floor(m.entry.x / G.World.TS), Math.floor(m.entry.y / G.World.TS)];
  const goal = [Math.floor(m.exit.x / G.World.TS), Math.floor(m.exit.y / G.World.TS)];
  const queue = [start], seen = new Set([start.join(',')]);
  for (let i = 0; i < queue.length; i++) {
    const [x, y] = queue[i];
    for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
      const nx = x + dx, ny = y + dy, k = `${nx},${ny}`;
      if (seen.has(k) || !G.World.isFree((nx + .5) * G.World.TS, (ny + .5) * G.World.TS, 22)) continue;
      seen.add(k); queue.push([nx, ny]);
    }
  }
  assert.ok(seen.has(goal.join(',')), 'radius-22 player should reach the exit');
});

test('boss layout keeps arena spawn and escape reachable with real collision', () => {
  const G = setupWorld();
  const m = G.SectorMaps.generate(19, { boss: true });
  G.World.setFixture(m.fixture);
  for (const point of [m.entry, m.exit, m.bossSpawn]) assert.equal(G.World.isFree(point.x, point.y, 22), true);
  const cell = p => [Math.floor(p.x / G.World.TS), Math.floor(p.y / G.World.TS)];
  const start = cell(m.entry), goal = cell(m.exit), queue = [start], seen = new Set([start.join(',')]);
  for (let i = 0; i < queue.length; i++) {
    const [x, y] = queue[i];
    for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
      const nx = x + dx, ny = y + dy, k = `${nx},${ny}`;
      if (seen.has(k) || !G.World.isFree((nx + .5) * G.World.TS, (ny + .5) * G.World.TS, 22)) continue;
      seen.add(k); queue.push([nx, ny]);
    }
  }
  assert.ok(seen.has(goal.join(',')));
});
