const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
function setup(sample=2){
 const images=[];
 class Image{constructor(){images.push(this);}set src(s){this.url=s;}get src(){return this.url;}}
 const G={SPRITE_META:{guard01:{s:1,base:'assets/actors-demo-v1/guard01',fallbackBase:'assets/actors/guard01',ext:'svg',sample,a:{Idle:{w:24,h:28,n:1,r:8,ax:12,ay:26,d:[12]},Walk:{w:24,h:28,n:2,r:8,ax:12,ay:26,d:[10,10]}}}},U:{clamp:(v,a,b)=>Math.max(a,Math.min(b,v))}};
 const context=vm.createContext({G,Image,URLSearchParams,performance:{now:()=>0},setTimeout,document:{createElement:()=>({getContext:()=>({drawImage(){},fillRect(){}})})}});
 vm.runInContext(fs.readFileSync(require.resolve('../js/core/sprites.js'),'utf8'),context);
 const calls=[],alphas=[],ctx={globalAlpha:1,drawImage(...args){calls.push(args);alphas.push(this.globalAlpha);}};
 return{G,images,calls,alphas,ctx,context};
}
test('double-resolution atlas changes source sampling, never feet, destination or collision measurements',()=>{
 const {G,images,calls,ctx}=setup(),anim=new G.Sprites.Animator('guard01');anim.cur='Walk';anim.frame=1;anim.dir=7;
 G.Sprites.sheet('guard01','Walk');images[0].onload();
 anim.draw(ctx,100,200);
 assert.deepEqual(calls[0].slice(1),[48,392,48,56,76,148,48,56]);
 assert.equal(G.Sprites.bodyHeight('guard01'),52);assert.equal(G.Sprites.bodyRadius('guard01'),10.56);
});
test('classic atlas keeps legacy source and destination rectangles',()=>{
 const {G,images,calls,ctx}=setup(1),anim=new G.Sprites.Animator('guard01');anim.dir=2;
 G.Sprites.sheet('guard01','Idle');images[0].onload();anim.draw(ctx,100,200);
 assert.deepEqual(calls[0].slice(1),[0,56,24,28,76,148,48,56]);
});
test('failed new atlas falls back to original sheet with its original frame layout',()=>{
 const {G,images,calls,ctx}=setup(),anim=new G.Sprites.Animator('guard01');anim.cur='Walk';anim.frame=1;anim.dir=3;
 G.Sprites.sheet('guard01','Walk');images[0].onerror();
 assert.equal(images[0].src,'assets/actors/guard01/Walk.svg');images[0].onload();anim.draw(ctx,100,200);
 assert.deepEqual(calls[0].slice(1),[24,84,24,28,76,148,48,56]);
});
test('visual install is isolated and preserves logical frame geometry for every actor',()=>{
 for(const [expanded,search,expected]of [[true,'?graficos=v1',true],[true,'?graficos=clasicos',false],[false,'',false]]){
  const {G,context}=setup();G.MapTrial={expanded};context.window={location:{search}};
  G.SPRITE_META.guard01.base='assets/actors/guard01';G.SPRITE_META.guard01.sample=1;
  for(const id of ['medic01','pursuer01','biological01','warden01']){
   const big=['biological01','warden01'].includes(id),a=big?{w:64,h:64,ax:32,ay:60,n:1,r:1,d:[12]}:{w:24,h:28,ax:12,ay:26,n:1,r:8,d:[12]};
   G.SPRITE_META[id]={base:'assets/actors/'+id,ext:'svg',a:{Idle:{...a},Walk:{...a,n:big?1:2,d:big?[12]:[10,10]}}};
  }
  const physical=Object.fromEntries(Object.entries(G.SPRITE_META).map(([id])=>[id,[G.Sprites.bodyHeight(id),G.Sprites.bodyRadius(id)]]));
  const before=JSON.stringify(G.SPRITE_META.guard01.a.Idle);
  vm.runInContext(fs.readFileSync(require.resolve('../js/data/trial-visuals.js'),'utf8'),context);
  G.TrialVisuals.install();assert.equal(G.TrialVisuals.enabled,expected);
  assert.equal(JSON.stringify(G.SPRITE_META.guard01.a.Idle),before);
  assert.equal(G.SPRITE_META.guard01.base,expected?'assets/actors-demo-v1/guard01':'assets/actors/guard01');
  assert.equal(G.TrialVisuals.enabled&&G.SPRITE_META.guard01.sample===2,expected);
  for(const [id,measure]of Object.entries(physical)){
   assert.deepEqual([G.Sprites.bodyHeight(id),G.Sprites.bodyRadius(id)],measure);
   assert.equal(G.SPRITE_META[id].base,`assets/${expected?'actors-demo-v1':'actors'}/${id}`);
  }
 }
});
test('original one-row sheet is safe fallback for an eight-direction four-frame monster',()=>{
 const {G,images,calls,ctx}=setup();G.SPRITE_META.guard01.a.Walk.n=4;
 G.SPRITE_META.guard01.fallbackAnimations={Walk:{w:24,h:28,n:1,r:1,ax:12,ay:26,d:[12]}};
 const a=new G.Sprites.Animator('guard01');a.cur='Walk';a.frame=3;a.dir=7;
 G.Sprites.sheet('guard01','Walk');images[0].onerror();images[0].onload();a.draw(ctx,100,200);
 assert.deepEqual(calls[0].slice(1),[0,0,24,28,76,148,48,56]);
});
test('double-sampled soft flash preserves source crop and restores incoming alpha',()=>{
 const {G,images,calls,alphas,ctx}=setup();const a=new G.Sprites.Animator('guard01');a.dir=2;
 G.Sprites.sheet('guard01','Idle');images[0].width=48;images[0].height=448;images[0].onload();ctx.globalAlpha=.7;
 a.draw(ctx,100,200,{flash:true,softFlash:true,alpha:.25});
 assert.equal(calls.length,2);assert.equal(calls[0][0],images[0]);assert.notEqual(calls[1][0],images[0]);
 assert.deepEqual(calls[0].slice(1),calls[1].slice(1));assert.deepEqual(calls[0].slice(1,5),[0,112,48,56]);
 assert.equal(alphas[0],.7*.25);assert.equal(alphas[1],.7*.25*.55);assert.equal(ctx.globalAlpha,.7);
});
test('native PNG source dimensions do not change logical frame destination',()=>{
 const {G,images,calls,ctx}=setup(1);G.SPRITE_META.guard01.ext='png';G.SPRITE_META.guard01.a.Walk.sourceW=16;G.SPRITE_META.guard01.a.Walk.sourceH=16;
 const a=new G.Sprites.Animator('guard01');a.cur='Walk';a.frame=1;a.dir=7;G.Sprites.sheet('guard01','Walk');images[0].onload();a.draw(ctx,100,200);
 assert.deepEqual(calls[0].slice(1),[16,112,16,16,76,148,48,56]);
});
test('Neutralized PNG aliases Faint and fails back to original Idle SVG',()=>{
 const {G,images,calls,ctx}=setup(1),m=G.SPRITE_META.guard01;m.ext='png';m.fallbackExt='svg';m.fallbackAnimations={Idle:{...m.a.Idle}};m.a.Faint={...m.a.Idle,n:2,d:[10,48],sourceW:32,sourceH:32,file:'Neutralized'};
 const a=new G.Sprites.Animator('guard01');a.cur='Faint';a.frame=1;a.dir=4;G.Sprites.sheet('guard01','Faint');assert.ok(images[0].src.endsWith('/Neutralized.png'));
 images[0].onerror();assert.ok(images[0].src.endsWith('/Idle.svg'));images[0].onload();a.draw(ctx,100,200);assert.deepEqual(calls[0].slice(1,5),[0,112,24,28]);
});

function nativeSetup(mode){
 const s=setup(1),G=s.G;
 G.MapTrial={expanded:true};s.context.window={location:{search:'?graficos='+mode}};
 G.CharacterCatalog=JSON.parse(fs.readFileSync(require.resolve('../assets/personajes-20261022/catalogo.json'),'utf8'));
 G.FieldCatalog={soldiers:{guard:{name:'Guardia',maxHp:100,speed:165},medic:{name:'Medico',maxHp:100,speed:165}}};G.Tiles={BIOMES:{1:{}}};
 vm.runInContext(fs.readFileSync(require.resolve('../js/data/content.js'),'utf8'),s.context);G.Content.install();
 const physical=Object.fromEntries(Object.keys(G.SPRITE_META).map(id=>[id,[G.Sprites.bodyHeight(id),G.Sprites.bodyRadius(id)]]));
 vm.runInContext(fs.readFileSync(require.resolve('../js/data/trial-visuals.js'),'utf8'),s.context);G.TrialVisuals.install();
 return{...s,physical};
}
test('INC-VIS-001 native regulars use the human cell and retain distinct boss size without changing physical geometry',()=>{
 for(const mode of ['16','32']){
  const s=nativeSetup(mode),G=s.G;
  for(const[id,expected]of [['pursuer01',56],['biological01',56],['warden01',128]]){
   const a=new G.Sprites.Animator(id);const sheet=G.Sprites.sheet(id,'Idle');sheet.img.onload();s.calls.length=0;a.draw(s.ctx,100,200);
   assert.deepEqual(s.calls[0].slice(-2),[expected,expected]);
   assert.deepEqual([G.Sprites.bodyHeight(id),G.Sprites.bodyRadius(id)],s.physical[id]);
   assert.equal(G.Sprites.visualBodyHeight(id),expected*(Number(mode)-1)/Number(mode));
  }
 }
});
test('INC-VIS-001 failed native atlas retains original fallback dimensions and visual labels',()=>{
 const s=nativeSetup('32'),G=s.G,a=new G.Sprites.Animator('biological01'),sheet=G.Sprites.sheet('biological01','Idle');
 sheet.img.onerror();sheet.img.onload();a.draw(s.ctx,100,200);
 assert.deepEqual(s.calls[0].slice(-2),[128,128]);assert.equal(G.Sprites.visualBodyHeight('biological01'),120);
});
