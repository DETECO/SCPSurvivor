const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function setup(){const G={Tiles:{T:16,NORMAL:1,ARENA:1,BIOMES:[{liquid:'water'}]},Sprites:{PX:2}};const ctx=vm.createContext({G,window:{G},Math,Map,Set,Uint8Array,Int16Array,Int32Array,performance:{now:()=>1000}});
 for(const n of ['core/util','world/world','world/sector-maps','systems/pathing'])vm.runInContext(fs.readFileSync(require.resolve('../js/'+n+'.js'),'utf8'),ctx);return G;}
test('BFS de un sector finito conserva caminos cuyo rodeo sale del antiguo radio28',()=>{
 const G=setup(),map=G.SectorMaps.generate(3585071513);G.World.setFixture(map.fixture);
 const p={...map.entry,fieldMode:true},e={x:716,y:268,r:12};p.x=-30;p.y=-124;
 G.Path.update(1,[p]);assert.equal(G.Path.reachable(e.x,e.y,p),true);const dir=G.Path.dirFor(e,p);assert.ok(dir,'Debe rodear hacia la puerta, no empujar hacia el muro');assert.ok(dir[0]>0||dir[1]>0);
});
test('todos los puntos de aparición reales son alcanzables en semillas0..127',()=>{
 const G=setup();for(let seed=0;seed<128;seed++){const m=G.SectorMaps.generate(seed);G.World.setFixture(m.fixture);G.Path.clear();const p={...m.entry,fieldMode:true};G.Path.update(1,[p]);for(const s of m.spawnPoints)assert.equal(G.Path.reachable(s.x,s.y,p),true,`${seed}: ${s.x},${s.y}`);}
});
