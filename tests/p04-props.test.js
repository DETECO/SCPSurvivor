const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function setup() {
  const context = { Math }; context.window = context;
  vm.runInNewContext(fs.readFileSync(require.resolve('../js/core/util.js'), 'utf8'), context);
  const G = context.G;
  G.Tiles = { T:8, NORMAL:1, ARENA:1, BIOMES:[{liquid:'water',name:'field',rock:['','#888','#555'],grass:['','#4a6']}] };
  G.Sprites = { PX:4 };
  vm.runInNewContext(fs.readFileSync(require.resolve('../js/world/sector-maps.js'), 'utf8'), { G, Math, Set });
  vm.runInNewContext(fs.readFileSync(require.resolve('../js/world/world.js'), 'utf8'), { G, Math, Map, Set, Uint8Array });
  const drops=[];
  G.Coop={active:false}; G.Audio={sfx(){}};
  G.FX={spark(){},burst(){},ring(){}};
  G.Pickups={drop(...a){drops.push(a);},dropXp(...a){drops.push(['xp',...a]);}};
  return {G,drops};
}
function reachable(G, map) {
  const cell=p=>[Math.floor(p.x/G.World.TS),Math.floor(p.y/G.World.TS)];
  const [sx,sy]=cell(map.entry),[gx,gy]=cell(map.exit),queue=[[sx,sy]],seen=new Set([`${sx},${sy}`]);
  for(let i=0;i<queue.length;i++){
    const [x,y]=queue[i];
    for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){
      const nx=x+dx,ny=y+dy,key=`${nx},${ny}`;
      if(seen.has(key)||!G.World.isFree((nx+.5)*G.World.TS,(ny+.5)*G.World.TS,22))continue;
      seen.add(key);queue.push([nx,ny]);
    }
  }
  return seen.has(`${gx},${gy}`);
}

test('sector fixtures place deterministic field crates on safe room corners',()=>{
  const {G}=setup();
  for(let seed=0;seed<128;seed++){
    for (const boss of [false,true]) {
    const a=G.SectorMaps.generate(seed,{boss}),b=G.SectorMaps.generate(seed,{boss});
    assert.deepEqual(JSON.parse(JSON.stringify(a.fixture.props)),JSON.parse(JSON.stringify(b.fixture.props)));
    assert.ok(a.fixture.props.length>=2&&a.fixture.props.length<=3,`${seed}/${boss}: expected 2-3 crates`);
    const floor=new Set(a.floorTiles.map(([x,y])=>`${x},${y}`));
    const protectedPoints=[a.entry,a.exit,a.bossSpawn].map(p=>({x:p.x/G.World.TS,y:p.y/G.World.TS}));
    for(const p of a.fixture.props){
      assert.equal(p.type,'fieldCrate'); assert.ok(floor.has(`${p.tx},${p.ty}`));
      for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++)assert.ok(floor.has(`${p.tx+dx},${p.ty+dy}`),`${seed}: crate lacks 8-neighbor floor`);
      assert.ok(protectedPoints.every(q=>Math.hypot(p.tx+.5-q.x,p.ty+.5-q.y)>=5));
      assert.ok(a.spawnPoints.every(q=>Math.hypot(p.tx+.5-q.x/G.World.TS,p.ty+.5-q.y/G.World.TS)>=2.5));
    }
    }
  }
});

test('World crates use normal prop collision and damage, then persist broken for that map without loot',()=>{
  const {G,drops}=setup(),map=G.SectorMaps.generate(73);
  G.World.reset(map.seed); G.World.setFixture(map.fixture);
  assert.equal(reachable(G,map),true,'crate corners leave entry-to-exit clearance');
  const spec=map.fixture.props[0],x=(spec.tx+.5)*G.World.TS,y=(spec.ty+1)*G.World.TS-4;
  let found=G.World.propsInCircle(x,y,0);
  assert.equal(found.length,1);
  const crate=found[0];
  assert.equal(crate.type,'fieldCrate'); assert.equal(crate.hp,34); assert.equal(crate.maxHp,34); assert.equal(crate.r,12);
  assert.equal(crate.solid,true); assert.equal(crate.destructible,true);
  assert.equal(G.World.walkable(spec.tx,spec.ty),false);
  assert.equal(G.World.projectileBlock(x,y,2),crate);
  assert.equal(G.World.damageProp(crate,17),false); assert.equal(crate.hp,17);
  assert.equal(G.World.damageProp(crate,17),true);
  assert.equal(G.World.propsInCircle(x,y,0).length,0);
  assert.equal(G.World.walkable(spec.tx,spec.ty),true);
  assert.equal(drops.length,0,'field crate destruction grants no loot or XP');
  G.World.setFixture(map.fixture);
  assert.equal(G.World.propsInCircle(x,y,0).length,0,'broken coordinate survives chunk rebuilds in the map');
  G.World.reset(map.seed+1); G.World.setFixture(map.fixture);
  assert.equal(G.World.propsInCircle(x,y,0).length,1,'a fresh map reset restores its fixture crate');
});

test('field crate uses its own plain box drawing',()=>{
  const {G}=setup(),map=G.SectorMaps.generate(11);
  G.World.reset(map.seed); G.World.setFixture(map.fixture);
  const spec=map.fixture.props[0],x=(spec.tx+.5)*G.World.TS,y=(spec.ty+1)*G.World.TS-4;
  const p=G.World.propsInCircle(x,y,0)[0],calls={rect:0,stroke:0};
  const ctx={save(){},restore(){},fillRect(){calls.rect++;},strokeRect(){calls.stroke++;},beginPath(){},moveTo(){},lineTo(){},stroke(){}};
  G.World.drawProp(ctx,p,0);
  assert.equal(calls.rect,1); assert.equal(calls.stroke,1);
});
