const {test}=require('node:test'),assert=require('node:assert/strict');
const rooms=require('../js/world/rift-rooms.js');
for(const id of Object.keys(rooms.themes))test(`${id}: traced C1-r2 footprints, clearance and retreat paths`,t=>{
 const g=rooms.generate(id);assert.equal(g.revision,'NIV-BIO-C1-r2');assert.ok(g.structures.length>=16);
 const free=(x,y,r)=>!rooms.blocked(g,x,y,r);
 assert.ok(free(g.entry.x,g.entry.y,16),'entry');assert.ok(free(g.entry.x+40,g.entry.y,12),'companion');assert.ok(free(g.bossSpawn.x,g.bossSpawn.y,32),'boss');assert.ok(free(g.escape.x,g.escape.y,16),'escape');
 const cells=new Map();for(let y=-312;y<320;y+=8)for(let x=-472;x<480;x+=8)if(free(x,y,12))cells.set(x+','+y,{x,y,d:Infinity});
 const start=[...cells.values()].sort((a,b)=>Math.hypot(a.x-g.escape.x,a.y-g.escape.y)-Math.hypot(b.x-g.escape.x,b.y-g.escape.y))[0];start.d=0;const queue=[start];
 while(queue.length){queue.sort((a,b)=>a.d-b.d);const a=queue.shift();for(const dx of[-8,0,8])for(const dy of[-8,0,8]){if(!dx&&!dy)continue;const b=cells.get((a.x+dx)+','+(a.y+dy));if(!b||!free(a.x+dx,a.y,12)||!free(a.x,a.y+dy,12))continue;const d=a.d+Math.hypot(dx,dy);if(d<b.d){b.d=d;queue.push(b);}}}
 const isolated=[...cells.values()].filter(c=>!Number.isFinite(c.d));assert.equal(isolated.length,0,`all walkable floor connected: ${JSON.stringify(isolated.slice(0,3))}`);
 const seconds=Math.max(...[...cells.values()].map(c=>c.d))/165;t.diagnostic(`maximum geometric retreat ${seconds.toFixed(2)}s`);assert.ok(seconds<5,'base-speed retreat under five seconds');
 for(const b of g.structures){const p=rooms.point(b.foot[0]);assert.ok(rooms.blocked(g,p.x,p.y,3),'each visible structure blocks');}
 const circle={...rooms.point(g.structures[0].foot[0]),r:12};assert.ok(rooms.collide(g,circle));assert.ok(!rooms.blocked(g,circle.x,circle.y,11.9),'circle can slide out of raised obstacle');
});
