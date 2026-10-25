const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const read=p=>fs.readFileSync(require.resolve(p),'utf8');
function load(mode='32',failParts=false){
 const G={CharacterCatalog:JSON.parse(read('../assets/personajes-20261022/catalogo.json')),TrialVisuals:{enabled:true,mode},Sprites:{Animator:class{constructor(){this.cur='Idle';this.frame=0}update(){}loop(c){this.cur=c}},dirFromAngle:a=>(Math.round((Math.PI/2-a)/(Math.PI/4))%8+8)%8},World:{projectileBlock:()=>false,collide(){}},RiftDialogueData:{bank:{SARC:{'01':'Hola','13':'Tengo miedo'},TOXI:{'01':'Sigamos'},AMOR:{'01':'Sigo contigo'},COQ:{'01':'Hola'},FRIA:{'01':'Atención'},AGRE:{'01':'Vamos'},GRUN:{'01':'Otra vez'}}}};
 const images=[];class Image{set src(s){this.url=s;images.push(this);if(failParts&&s.includes('companeras-contencion')&&s.endsWith('Partes.png'))this.onerror?.();else this.onload?.()}}
 const sandbox={G,Image,Math,Set,Map,Number,Promise};for(const p of ['../js/data/field-catalog.js','../js/data/companion-characters.js','../js/systems/rift-companion.js','../js/ui/personajes-art.js'])vm.runInNewContext(read(p),sandbox);
 return{G,images};
}
test('three female appearances, all personalities independent, same presence boundary/gear/health',()=>{
 for(const model of ['delgada','fitness','curvy'])for(const tier of ['D1','D4','D5']){
  const {G}=load(),C=G.RiftCompanion,base={tier,geometry:{entry:{x:0,y:0}},player:{alias:'Valeria'},appearance:model},limit=tier==='D5'?.1:.33;
  assert.equal(C.create({...base,rng:()=>limit}),null);
  for(let k=0;k<7;k++){let i=0;const values=[0,...(tier==='D4'?[0]:[]),0,(k+.1)/7,.2];const n=C.create({...base,rng:()=>values[i++]??.2});assert.equal(n.gender,'F');assert.equal(n.characterId,'apoyo_'+model);assert.notEqual(n.name,'Valeria');assert.equal(n.hp,45);assert.equal(n.weapon.model,'pistol');assert.equal(n.ammo,12);assert.equal(n.reserveInfinite,true);assert.equal(n.personality,Object.keys(G.RiftDialogueData.bank)[k]);}
 }
});
test('automatic selection retains male plus each female; invalid appearance falls back to valid selection',()=>{
 const {G}=load(),appearances=G.CompanionCharacters.appearances;
 for(let k=0;k<4;k++){let i=0;const v=[0,0,0,(k+.1)/4,0],n=G.RiftCompanion.create({tier:'D1',rng:()=>v[i++]??0,geometry:{entry:{x:0,y:0}},player:{},appearance:'invalid'});assert.equal(n.appearance,appearances[k].id)}
});
test('after exhausting female names, repeats still exclude the player alias',()=>{
 const {G}=load();for(let i=0;i<45;i++){const n=G.RiftCompanion.create({tier:'D1',rng:()=>0,geometry:{entry:{x:0,y:0}},player:{alias:'Valeria'},appearance:'fitness'});assert.notEqual(n.name,'Valeria')}
});
test('native female render has two articulated arms, eight aims, no weapon when down; same-model fallback',async()=>{
 for(const mode of ['16','32'])for(const fail of [false,true]){
  const {G}=load(mode,fail);await G.PersonajesArt.preload();
  for(const model of ['delgada','fitness','curvy'])for(let d=0;d<8;d++){
   const ops=[],ctx={globalAlpha:1,save(){},restore(){},translate(){},rotate(){},scale(){},fillRect(){ops.push('weapon')},drawImage(im,...a){ops.push({src:im.url,args:a})}},n={characterId:'apoyo_'+model,aim:Math.PI/2-d*Math.PI/4,x:0,y:0,tx:0,ty:0,anim:{cur:'Walk',frame:d%4}};
   assert(G.PersonajesArt.drawAlly(ctx,n));if(fail)assert(ops[0].src.endsWith('/'+n.characterId+'/Idle.png'));
   else{const b=G.CharacterCatalog.modes[mode][n.characterId].parts[48];assert.equal(ops.filter(o=>o.args?.[0]===b.x&&o.args?.[1]===b.y).length,2)}
   ops.length=0;n.incapacitated=true;assert(G.PersonajesArt.drawAlly(ctx,n));assert.equal(ops.length,1);if(fail)assert(ops[0].src.endsWith('/Neutralized.png'));
  }
 }
});
test('incapacitation and clear stop the companion despite unlimited reserve',()=>{
 const {G}=load(),C=G.RiftCompanion,p={x:48,y:0,hp:100,maxHp:100},n=C.create({tier:'D1',rng:()=>0,geometry:{entry:{x:0,y:0}},player:p,appearance:'curvy'}),boss={x:100,y:0,hp:6,hurt(d){this.hp-=d}};
 C.hurt(999);assert(n.incapacitated);const x=n.x,ammo=n.ammo;C.update(1,{...p,x:900},{boss});assert.equal(n.x,x);assert.equal(n.ammo,ammo);assert.equal(n.shots,0);C.clear();assert.equal(C.state,null);assert.equal(C.drawables().length,0);
});
