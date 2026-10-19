const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function setup() {
  const context = { Math, Map, Set, Uint8Array, Int16Array, Int32Array, performance: { now: () => 1000 } };
  context.window = context;
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(require.resolve('../js/core/util.js'), 'utf8'), context);
  const G = context.G;
  G.Tiles = { T: 8, NORMAL: 1, ARENA: 1, BIOMES: [{ liquid: 'water' }] };
  G.Sprites = { PX: 4 };
  for (const name of ['world/world', 'world/sector-maps', 'systems/pathing']) {
    vm.runInContext(fs.readFileSync(require.resolve(`../js/${name}.js`), 'utf8'), context);
  }
  return G;
}

// Dijkstra on the collision-safe 8-neighbor graph. Diagonals cost sqrt(2)
// tiles and cannot cut corners; reported times exclude combat and pauses.
function distances(map, start, radius = 22, G) {
  G.World.setFixture(map.fixture);
  const width = 160, height = 100, open = new Uint8Array(width * height);
  for (const [x, y] of map.floorTiles) open[y * width + x] = G.World.isFree((x + .5) * 32, (y + .5) * 32, radius) ? 1 : 0;
  const source = Math.floor(start.y / 32) * width + Math.floor(start.x / 32);
  const dist = new Float64Array(width * height).fill(Infinity), heap = [];
  function push(item) {
    let i = heap.length; heap.push(item);
    while (i && heap[(i - 1) >> 1][0] > item[0]) { heap[i] = heap[(i - 1) >> 1]; i = (i - 1) >> 1; }
    heap[i] = item;
  }
  function pop() {
    const first = heap[0], last = heap.pop();
    if (heap.length) {
      let i = 0;
      while (i * 2 + 1 < heap.length) {
        let j = i * 2 + 1;
        if (j + 1 < heap.length && heap[j + 1][0] < heap[j][0]) j++;
        if (heap[j][0] >= last[0]) break;
        heap[i] = heap[j]; i = j;
      }
      heap[i] = last;
    }
    return first;
  }
  dist[source] = 0; push([0, source]);
  while (heap.length) {
    const [cost, index] = pop();
    if (cost !== dist[index]) continue;
    const x = index % width, y = Math.floor(index / width);
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      if (!dx && !dy) continue;
      const nx = x + dx, ny = y + dy, next = ny * width + nx;
      if (nx < 0 || nx >= width || ny < 0 || ny >= height || !open[next]) continue;
      if (dx && dy && (!open[y * width + nx] || !open[ny * width + x])) continue;
      const candidate = cost + (dx && dy ? Math.SQRT2 : 1);
      if (candidate < dist[next]) { dist[next] = candidate; push([candidate, next]); }
    }
  }
  return { dist, seconds: p => dist[Math.floor(p.y / 32) * width + Math.floor(p.x / 32)] * 32 / 165 };
}

test('V2 geometry is stable, varied, bounded and preserves the legacy API', () => {
  const G = setup(), legacy = JSON.stringify(G.SectorMaps.generate(42));
  assert.equal(typeof G.SectorMaps.generateV2, 'function');
  const a = G.SectorMaps.generateV2(42), b = G.SectorMaps.generateV2(42), c = G.SectorMaps.generateV2(43);
  assert.equal(JSON.stringify(a), JSON.stringify(b));
  assert.notEqual(JSON.stringify(a.floorTiles), JSON.stringify(c.floorTiles));
  assert.equal(JSON.stringify(G.SectorMaps.generate(42)), legacy);
  assert.equal(G.SectorMaps.generate(42, { boss: true }).layout, undefined);
  assert.equal(a.layout, 'v2-open-160x100');
  assert.equal(a.fixture.maxX - a.fixture.minX + 1, 160);
  assert.equal(a.fixture.maxY - a.fixture.minY + 1, 100);
});

test('V2 seeds keep full connectivity, clearance, broad alternative routes and measured travel targets', t => {
  const G = setup(), mainTimes = [], optionalTimes = [];
  for (const seed of [0, 1, 19, 42, 73, 127, -1, 3585071513]) {
    const map = G.SectorMaps.generateV2(seed), floors = new Set(map.floorTiles.map(p => p.join(',')));
    G.World.setFixture(map.fixture);
    assert.equal(map.chestCandidates.length, 6);
    assert.equal(new Set(map.chestCandidates.map(p => p.id)).size, 6);
    assert.ok(map.floorTiles.length > 13000, 'large open floor rather than a maze');
    for (const p of [map.entry, map.exit, map.bossSpawn, map.routeAnchor, ...map.chestCandidates, ...map.spawnPoints]) {
      const x = Math.floor(p.x / 32), y = Math.floor(p.y / 32);
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) assert.ok(floors.has(`${x + dx},${y + dy}`), `${seed}: 3x3 clearance`);
      assert.equal(G.World.isFree(p.x, p.y, 22), true);
    }
    const fromEntry = distances(map, map.entry, 0, G);
    for (const [x, y] of map.floorTiles) assert.ok(Number.isFinite(fromEntry.dist[y * 160 + x]), `${seed}: isolated floor`);
    const route = distances(map, map.entry, 22, G), optional = distances(map, map.routeAnchor, 22, G);
    const main = route.seconds(map.exit); mainTimes.push(main);
    assert.ok(main >= 30 && main <= 45, `${seed}: main ${main}s`);
    for (const p of map.chestCandidates) {
      const seconds = optional.seconds(p); optionalTimes.push(seconds);
      assert.ok(seconds >= 10 && seconds <= 15, `${seed}: optional ${seconds}s`);
    }
    // Ten-tile perimeter circuits stay free: every island can be bypassed.
    for (let x = 3; x <= 156; x++) for (const y of [10, 50, 89]) assert.ok(floors.has(`${x},${y}`));
    for (let y = 3; y <= 96; y++) for (const x of [10, 80, 149]) assert.ok(floors.has(`${x},${y}`));
    assert.ok(map.spawnPoints.some(p => p.x < 32 * 40));
    assert.ok(map.spawnPoints.some(p => p.x > 32 * 120));
    G.World.setFixture(map.fixture); G.Path.clear();
    const player = { ...map.entry, fieldMode: true }; G.Path.update(1, [player]);
    for (const p of map.spawnPoints) assert.equal(G.Path.reachable(p.x, p.y, player), true);
  }
  t.diagnostic(`165u/s, radius22, 8-neighbor collision paths: main ${Math.min(...mainTimes).toFixed(2)}–${Math.max(...mainTimes).toFixed(2)}s; anchor to optional ${Math.min(...optionalTimes).toFixed(2)}–${Math.max(...optionalTimes).toFixed(2)}s`);
});
