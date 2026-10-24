const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.join(__dirname,'..');
const catalog=JSON.parse(fs.readFileSync(path.join(root,'docs/referencias/armas/armas-prueba-direccionales-v1/catalogo.json'),'utf8'));
function setup({active=true,native=false,failFetch=false,failImage=false}={}){
 const requests=[],images=[];
 class Image{
  set src(value){this._src=value;const n=Number(value.match(/\/(16|32)\/AF01\//)[1]);this.naturalWidth=this.naturalHeight=n;images.push(value);queueMicrotask(()=>failImage?this.onerror():this.onload());}
  get src(){return this._src;}
 }
 const G={WeaponRevisionTrial:{active:()=>active},TrialVisuals:{enabled:native,mode:'32'}};
 vm.runInNewContext(fs.readFileSync(path.join(root,'js/ui/af01-approved-art.js'),'utf8'),{G,Image,fetch:async url=>{requests.push(url);if(failFetch)throw Error('network');return{ok:true,json:async()=>structuredClone(catalog)};},setTimeout,clearTimeout});
 return{G,requests,images};
}
test('AF01 art stays disabled outside native graphics and the revision trial',async()=>{
 const s=setup({active:false});assert.equal(await s.G.AF01ApprovedArt.preload(),false);assert.equal(s.requests.length,0);assert.equal(s.G.AF01ApprovedArt.mount('32',0,{x:2,y:3}),null);
});

test('INC-VIS-001: the approved pistol also mounts in ordinary native graphics without enabling r1 mechanics',async()=>{
 const s=setup({active:false,native:true});
 assert.equal(await s.G.AF01ApprovedArt.preload(),true);
 assert.equal(s.G.WeaponRevisionTrial.active(),false);
 for(const mode of ['16','32'])for(let i=0;i<8;i++)assert.ok(s.G.AF01ApprovedArt.mount(mode,i*Math.PI/4,{x:8,y:9}));
});
test('AF01 preloads exactly the original sixteen directional PNGs once, including both graphics modes',async()=>{
 const s=setup(),art=s.G.AF01ApprovedArt;const first=art.preload();assert.equal(first,art.preload());assert.equal(await first,true);
 assert.equal(s.requests.length,1);assert.equal(s.images.length,16);
 for(const mode of ['16','32'])for(const file of catalog.modes[mode].AF01.individuals)assert.ok(s.images.some(url=>url.endsWith('/'+file)));
 assert.equal(art.inspect().loaded,16);
});
test('AF01 selects the closest of eight views without snapping the physical aim',async()=>{
 const s=setup();await s.G.AF01ApprovedArt.preload();const art=s.G.AF01ApprovedArt;
 for(const mode of ['16','32'])for(let i=0;i<8;i++){
  const angle=i*Math.PI/4+.1,mount=art.mount(mode,angle,{x:8,y:9});
  assert.equal(mount.direction,catalog.directions[i]);assert.equal(mount.aim,angle);
 }
 assert.equal(art.mount('16',-Math.PI/4,{x:0,y:0}).direction,'NE');
 assert.equal(art.mount('32',Math.PI*2,{x:0,y:0}).direction,'E');
});
test('AF01 mounts G exactly at the existing hand and derives A/S from original anchors without mutating them',async()=>{
 const s=setup();await s.G.AF01ApprovedArt.preload();const before=JSON.stringify(catalog);
 for(const mode of ['16','32'])for(let i=0;i<8;i++){
  const grip=Object.freeze({x:15.5,y:12.25}),m=s.G.AF01ApprovedArt.mount(mode,i*Math.PI/4,grip),f=catalog.modes[mode].AF01.frames[i];
  assert.equal(m.x+f.grip.x,grip.x);assert.equal(m.y+f.grip.y,grip.y);
  assert.equal(m.support.x,m.x+f.support.x);assert.equal(m.muzzle.y,m.y+f.muzzle.y);
  assert.equal(m.width*56/Number(mode),56);assert.equal(m.height*56/Number(mode),56);
 }
 assert.equal(JSON.stringify(catalog),before);
});
test('AF01 draws the approved directional image without a second rotation and restores canvas state',async()=>{
 const s=setup();await s.G.AF01ApprovedArt.preload();const art=s.G.AF01ApprovedArt,calls=[];
 const ctx={imageSmoothingEnabled:true,save(){calls.push(['save',this.imageSmoothingEnabled]);},restore(){this.imageSmoothingEnabled=calls[0][1];calls.push(['restore']);},rotate(){throw Error('directional PNG must not rotate twice');},drawImage(...args){calls.push(['image',...args]);},fillRect(...args){calls.push(['flash',...args]);}};
 const mount=art.mount('32',Math.PI/4,{x:8,y:8});assert.equal(art.draw(ctx,mount,.05),true);
 assert.ok(calls.find(c=>c[0]==='image'&&c[1].src.endsWith('/32/AF01/SE.png')));
 assert.ok(calls.some(c=>c[0]==='flash'&&c[1]===mount.muzzle.x));assert.equal(ctx.imageSmoothingEnabled,true);assert.equal(calls.at(-1)[0],'restore');
});
test('AF01 unavailable metadata or images permit the existing renderer fallback',async()=>{
 for(const options of [{failFetch:true},{failImage:true}]){
  const s=setup(options);assert.equal(await s.G.AF01ApprovedArt.preload(),false);assert.equal(s.G.AF01ApprovedArt.mount('32',0,{x:0,y:0}),null);
 }
});
