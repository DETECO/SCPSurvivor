const{test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const cat=JSON.parse(fs.readFileSync(require.resolve('../assets/personajes-20261022/catalogo.json'),'utf8'));
function setup(search='',expanded=true){
 const G={MapTrial:{expanded},CharacterCatalog:cat,SPRITE_META:{},FieldCatalog:{soldiers:{guard:{name:'Guardia',maxHp:100,speed:165},medic:{name:'Médico',maxHp:100,speed:165}}},Tiles:{BIOMES:{1:{}}}};
 const context=vm.createContext({G,window:{location:{search}},URLSearchParams});vm.runInContext(fs.readFileSync(require.resolve('../js/data/content.js'),'utf8'),context);G.Content.install();
 const original=JSON.parse(JSON.stringify(G.SPRITE_META));vm.runInContext(fs.readFileSync(require.resolve('../js/data/trial-visuals.js'),'utf8'),context);G.TrialVisuals.install();return{G,original};
}
test('default32 and optional16 use exact catalog sources while preserving physical metadata',()=>{
 const ids={guard01:'guardia',medic01:'medico',pursuer01:'perseguidor',biological01:'biologico',warden01:'custodio',support01:'apoyo'};
 for(const mode of['16','32']){
  const {G,original}=setup(mode==='32'?'':'?graficos=16');assert.equal(G.TrialVisuals.mode,mode);
  for(const[dex,id]of Object.entries(ids)){
   const m=G.SPRITE_META[dex],old=original[dex]||original.guard01;
   assert.equal(m.characterId,id);assert.equal(m.base,`assets/personajes-20261022/${mode}/${id}`);
   for(const k of['w','h','ax','ay'])assert.equal(m.a.Idle[k],old.a.Idle[k]);
   assert.equal(m.a.Walk.n,4);assert.equal(m.a.Walk.r,8);assert.equal(m.a.Walk.sourceW,Number(mode));assert.equal(m.a.Walk.sourceH,Number(mode));
   assert.equal(m.a.Faint.file,'Neutralized');assert.equal(m.a.Attack.n,4);assert.equal(m.a.Hurt.n,2);
  }
  assert.equal(G.FieldCatalog.soldiers.support,undefined,'support art is not a selectable class');
 }
});
test('v1/classic/old modes retain their previous visual contracts',()=>{
 assert.equal(setup('?graficos=v1').G.SPRITE_META.guard01.base,'assets/actors-demo-v1/guard01');
 for(const args of[['?graficos=clasicos',true],['?graficos=32',false]]){
  const{G}=setup(...args);assert.equal(G.TrialVisuals.enabled,false);assert.equal(G.SPRITE_META.guard01.base,'assets/actors/guard01');
 }
});
