const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function load(){const G={CharacterCatalog:JSON.parse(fs.readFileSync(require.resolve('../assets/personajes-20261022/catalogo.json'),'utf8'))},context={G};vm.runInNewContext(fs.readFileSync(require.resolve('../js/data/companion-characters.js'),'utf8'),context);const corrected=require('node:path').join(__dirname,'../js/data/character-proportions.js');if(fs.existsSync(corrected))vm.runInNewContext(fs.readFileSync(corrected,'utf8'),context);return G;}
test('guard, medic and all four supports have legs proportional to their torso in16/32 and every walk phase',()=>{
 const G=load();for(const n of [16,32])for(const id of ['guardia','medico','apoyo','apoyo_delgada','apoyo_fitness','apoyo_curvy']){
  const a=G.CharacterCatalog.modes[n][id];for(let d=0;d<8;d++)for(let phase=1;phase<=5;phase++){const t=a.parts[d],l=a.parts[phase*8+d];assert(l.h/t.h>=.75,`${n}/${id}/${d}/${phase}: legs${l.h} torso${t.h}`);assert(t.h+l.h<=n,`${id}: body does not fit native cell`)}
 }
});
test('menu atlas and runtime parts use the same corrected revision, without changing native cell or foot anchor',()=>{
 const G=load();for(const n of [16,32])for(const id of ['guardia','medico','apoyo',...G.CompanionCharacters.ids]){
  const a=G.CharacterCatalog.modes[n][id];assert.match(a.runtimeBase,/proporciones-personajes/);assert.equal(a.partsPathRuntime,a.runtimeBase+'/Partes.png');assert.equal(a.fallbackPathRuntime,a.runtimeBase+'/Idle.png');assert.equal(a.actions.Idle.frameWidth,n);assert.equal(a.actions.Idle.anchor.y,n-1);assert(a.anatomy.commonScale>0);
 }
});
test('installed menu atlas follows corrected human assets and preserves combat geometry and enemy art',()=>{
 for(const n of [16,32]){const G=load();G.MapTrial={expanded:true};G.SPRITE_META={};G.FieldCatalog={soldiers:{}};G.Tiles={BIOMES:{1:{}}};const c={G,window:{location:{search:'?graficos='+n}},URLSearchParams};
  vm.runInNewContext(fs.readFileSync(require.resolve('../js/data/field-catalog.js'),'utf8'),c);vm.runInNewContext(fs.readFileSync(require.resolve('../js/data/content.js'),'utf8'),c);G.Content.install();const before=JSON.parse(JSON.stringify(G.SPRITE_META));vm.runInNewContext(fs.readFileSync(require.resolve('../js/data/trial-visuals.js'),'utf8'),c);G.TrialVisuals.install();
  for(const dex of ['guard01','medic01','support01']){const a=G.SPRITE_META[dex];assert.match(a.base,/proporciones-personajes/);for(const k of ['w','h','ax','ay'])assert.equal(a.a.Idle[k],(before[dex]||before.guard01).a.Idle[k])}
  assert.equal(G.SPRITE_META.pursuer01.base,`assets/personajes-20261022/${n}/perseguidor`);
 }
});
