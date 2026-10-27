const{test}=require('node:test'),assert=require('node:assert/strict');
const rooms=require('../js/world/rift-rooms.js');
test('five distinct room compositions have reachable entry/boss/escape',()=>{
 const shapes=new Set();for(const id of ['esporario','larva','malla','portador','huesped']){const g=rooms.generate(id);shapes.add(JSON.stringify(g.fixture.walls));const blocked=new Set(g.fixture.walls.map(x=>x.join(','))),seen=new Set(),dist=new Map(),queue=[[...Object.values(g.escape).map(x=>Math.floor(x/32)),0]];
  while(queue.length){const[x,y,d]=queue.shift(),k=x+','+y;if(seen.has(k)||blocked.has(k)||x<=g.fixture.minX||x>=g.fixture.maxX||y<=g.fixture.minY||y>=g.fixture.maxY)continue;seen.add(k);dist.set(k,d);for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]])queue.push([x+dx,y+dy,d+1]);}
  for(const p of[g.entry,g.bossSpawn])assert.ok(seen.has(Math.floor(p.x/32)+','+Math.floor(p.y/32)));
  // C1 permits diagonal walking. Clearance and the five-second bound are
  // measured by the half-tile Dijkstra graph in rift-rooms-c1.test.js.
 }assert.equal(shapes.size,5);
});
