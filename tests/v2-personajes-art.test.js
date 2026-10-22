const{test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const catalog=JSON.parse(fs.readFileSync(require.resolve('../assets/personajes-20261022/catalogo.json'),'utf8'));
function setup(mode='32'){
 const images=[],ops=[],ctx={globalAlpha:1,imageSmoothingEnabled:true,save(){ops.push(['save',this.globalAlpha]);this.stack.push(this.globalAlpha)},restore(){this.globalAlpha=this.stack.pop();ops.push(['restore'])},stack:[],translate(...a){ops.push(['translate',...a])},rotate(a){ops.push(['rotate',a])},scale(...a){ops.push(['scale',...a])},drawImage(...a){ops.push(['image',...a])},fillRect(...a){ops.push(['rect',...a])}};
 class Image{constructor(){images.push(this)}set src(v){this.url=v;this.onload()}get src(){return this.url}}
 const anim={dex:'guard01',cur:'Walk',frame:1,dir:0,scale:1},pl={x:100,y:120,anim,walking:true,moveAngle:Math.PI/2,weaponAim:0,aim:0,invuln:0,flash:0,dead:false};
 const G={TrialVisuals:{mode,enabled:mode!=='clasicos'},CharacterCatalog:catalog,SPRITE_META:{guard01:{characterId:'guardia',characterSize:Number(mode)},support01:{characterId:'apoyo',characterSize:Number(mode)}},Sprites:{dirFromAngle:a=>((Math.round((Math.PI/2-a)/(Math.PI/4))%8)+8)%8,white:i=>({white:i})},Game:{player:pl}};
 vm.runInNewContext(fs.readFileSync(require.resolve('../js/ui/personajes-art.js'),'utf8'),{G,Image,Map,Promise,Math,Number});return{G,pl,anim,ctx,ops,images};
}
test('native body uses original parts with equal world scale, alpha/flash and no gameplay changes',async()=>{
 for(const mode of['16','32']){
  const{G,pl,anim,ctx,ops,images}=setup(mode);await G.PersonajesArt.preload();const before=JSON.stringify(pl);
  assert.equal(G.PersonajesArt.draw(ctx,anim,100,120,{alpha:.45,flash:true,softFlash:true}),true);
  assert.equal(images.length,3);assert(ops.some(o=>o[0]==='scale'&&o[1]*Number(mode)===56));
  assert(ops.some(o=>o[0]==='image'&&o[1].white));assert.equal(ctx.globalAlpha,1);assert.equal(JSON.stringify(pl),before);
  assert.equal(G.PersonajesArt.draw(ctx,{...anim},100,120,{}),false,'other actors keep native atlas renderer');
 }
});
test('two weapons follow independent living targets and render once across front/back passes',async()=>{
 const{G,pl,ctx,ops}=setup();await G.PersonajesArt.preload();const weapons=[{model:'pistol',flash:.05,_aimTarget:{x:200,y:100,hp:100}},{model:'shotgun',flash:0,_aimTarget:{x:20,y:160,hp:100}}],before=JSON.stringify({pl,weapons});
 assert.equal(G.PersonajesArt.drawWeapons(ctx,pl,{behind:true},weapons),true);assert.equal(G.PersonajesArt.drawWeapons(ctx,pl,{behind:false},weapons),true);
 const rotations=ops.filter(o=>o[0]==='rotate').map(o=>o[1]);for(const w of weapons)assert(rotations.some(a=>Math.abs(a-Math.atan2(w._aimTarget.y-pl.y,w._aimTarget.x-pl.x))<1e-8));
 assert.equal(ops.filter(o=>o[0]==='scale'&&o[1]===56/32).length,2);assert.equal(JSON.stringify({pl,weapons}),before);assert.equal(ctx.globalAlpha,1);
});
test('supports use their own parts and legacy/dead/nonhuman paths remain available',async()=>{
 const{G,ctx,ops}=setup();await G.PersonajesArt.preload();const ally={x:90,y:100,tx:100,ty:100,aim:0,flash:.05,anim:{dex:'support01',cur:'Walk',frame:2,dir:0,scale:1}};
 const before=JSON.stringify(ally);assert.equal(G.PersonajesArt.drawAlly(ctx,ally),true);assert(ops.some(o=>o[0]==='image'&&o[1].url?.includes('/apoyo/Partes.png')));assert.equal(JSON.stringify(ally),before);
 for(const mode of['v1','clasicos']){const s=setup(mode);assert.equal(s.G.PersonajesArt.draw(s.ctx,s.anim,0,0,{}),false);assert.equal(s.G.PersonajesArt.drawWeapons(s.ctx,s.pl,{},[]),false);assert.equal(s.images.length,0)}
 const s=setup();s.pl.dead=true;assert.equal(s.G.PersonajesArt.draw(s.ctx,s.anim,0,0,{}),false);
});
