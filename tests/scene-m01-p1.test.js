'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.resolve(__dirname,'..'),catalog=JSON.parse(fs.readFileSync(path.join(root,'assets/scenarios/m01-p1/CATALOGO_PILOTO_001.json'),'utf8'));
function context(search='?prueba=combate-v2&escenario=m01p1-piloto',fail=false,amend=c=>c){
 const c={G:{MapTrial:{expanded:true},SceneR7:{preload:async()=>{}},World:{invalidateGround(){}}},window:{location:{search}},URLSearchParams,AbortController,setTimeout,clearTimeout,fetch:async()=>({ok:true,json:async()=>amend(structuredClone(catalog))}),Image:class{set src(v){this.width=1536;this.height=1024;queueMicrotask(()=>fail?this.onerror():this.onload());}}};
 vm.createContext(c);vm.runInContext(fs.readFileSync(path.join(root,'js/world/scene-m01-p1.js'),'utf8'),c);return c.G.SceneM01P1;
}
test('pilot needs explicit query and loads production catalog once',async()=>{
 assert.equal(context('').active(),false);const m=context();assert.equal(m.active(),true);assert.equal(m.preload(),m.preload());await m.preload();assert.equal(new Set(m.generate(1).fixture.m01p1.props.map(p=>p.piece)).size,8);
});
test('both office accesses and all anchors connect for player, regular and boss radii',async()=>{
 const m=context();await m.preload();const g=m.generate(7),f=g.fixture.m01p1;
 for(const r of [12,14,18,22,30]){
  const step=16,start=g.entry,q=[[Math.round(start.x/step),Math.round(start.y/step)]],seen=new Set([q[0].join(',')]);
  for(let at=0;at<q.length;at++){const [x,y]=q[at];for(const [dx,dy]of [[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,ny=y+dy,k=nx+','+ny;if(seen.has(k)||m.blocked(f,nx*step,ny*step,r))continue;seen.add(k);q.push([nx,ny]);}}
  for(const p of [g.exit,g.bossSpawn,g.terminalAnchor,g.routeAnchor,...g.chestCandidates,...g.rooms[0].doors])assert.ok(seen.has([Math.round(p.x/step),Math.round(p.y/step)].join(',')),`r${r} unreachable ${JSON.stringify(p)}`);
 }
});
test('L partition preserves concavity and collision matches actual footprint',async()=>{
 const m=context();await m.preload();const f=m.generate(1).fixture.m01p1,p=f.props.find(p=>p.piece==='tabique_bajo_l');
 assert.equal(m.blocked(f,p.x+4,p.y-25,5),false);assert.equal(m.blocked(f,p.x-30,p.y-20,5),true);
 const e={x:p.x-30,y:p.y-20,r:12};assert.equal(m.collide(f,e),true);assert.equal(m.blocked(f,e.x,e.y,e.r-.001),false);
});
test('missing atlas rejects startup without inventing fallback art',async()=>{
 const m=context(undefined,true);await assert.rejects(m.preload(),/atlas/i);assert.throws(()=>m.generate(1),/cargad/i);
});

test('malformed anchors and footprints fail during preload',async()=>{
 await assert.rejects(context(undefined,false,c=>{c.piezas[0].anclajePx=[1];return c;}).preload(),/inválido/);
 await assert.rejects(context(undefined,false,c=>{c.piezas[0].huellaSugerida.cajasXYWH[0]=[0,0,-3,10];return c;}).preload(),/Huella/);
});
