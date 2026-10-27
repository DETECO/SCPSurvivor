const {test}=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),path=require('node:path');
const art=require('../js/world/rift-room-art.js');

// The earlier C1 geometry check used the player radius (12). BIO bodies need
// their own 24–32u clearance from spawn to the player's entry sector.
function route(g,r,from,to){
 const step=8,xs=121,ys=81,x=i=>-480+i*step,y=j=>-320+j*step;
 const grid=new Uint8Array(xs*ys),index=(i,j)=>j*xs+i;
 for(let j=0;j<ys;j++)for(let i=0;i<xs;i++)grid[index(i,j)]=art.blocked(g,x(i),y(j),r)?1:0;
 const nearest=p=>{let best=-1,d=Infinity;for(let j=0;j<ys;j++)for(let i=0;i<xs;i++){const k=index(i,j),q=(x(i)-p.x)**2+(y(j)-p.y)**2;if(!grid[k]&&q<d){best=k;d=q;}}return best;};
 const start=nearest(from),end=nearest(to);if(start<0||end<0)return false;
 const visited=new Uint8Array(grid.length),queue=[start];visited[start]=1;
 for(let h=0;h<queue.length;h++){
  const k=queue[h];if(k===end)return true;
  const i=k%xs,j=Math.floor(k/xs);
  for(const [di,dj] of [[1,0],[-1,0],[0,1],[0,-1]]){
   const ni=i+di,nj=j+dj;if(ni<0||nj<0||ni>=xs||nj>=ys)continue;
   const next=index(ni,nj);if(visited[next]||grid[next]||art.blocked(g,(x(i)+x(ni))/2,(y(j)+y(nj))/2,r))continue;
   visited[next]=1;queue.push(next);
  }
 }
 return false;
}

test('008 each approved C1 room has a traversable route for its actual BIO radius',()=>{
 const G={Enemy:class{}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../js/systems/rift-anomalies.js'),'utf8'),{G,Math});
 const radii={esporario:24,larva:24,malla:26,portador:28,huesped:30};
 for(const [id,r]of Object.entries(radii)){
  assert.equal(G.RiftAnomalies.catalog.find(b=>b.id===id).r,r,id+' expected physical radius');
  const g=art.generate(id);
  assert.equal(art.blocked(g,g.bossSpawn.x,g.bossSpawn.y,r),false,id+' boss spawn');
  assert.equal(art.blocked(g,g.entry.x,g.entry.y,r),false,id+' entry approach');
  assert.ok(route(g,r,g.bossSpawn,g.entry),id+' actual boss radius route');
 }
});
