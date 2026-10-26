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
