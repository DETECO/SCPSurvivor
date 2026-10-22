/* Provisional visual layer. Logical geometry and gameplay stay unchanged. */
G.TrialVisuals=(()=>{
 const query=new URLSearchParams(window.location.search),requested=query.get('graficos');
 const mode=G.MapTrial?.expanded!==true?'clasicos':['16','32','v1','clasicos'].includes(requested)?requested:'32';
 const enabled=mode!=='clasicos';
 const actors=['guard01','medic01','pursuer01','biological01','warden01'];
 let installed=false;
 function install(){
  if(!enabled||installed)return;installed=true;
  if(mode==='16'||mode==='32'){
   const mapping={guard01:'guardia',medic01:'medico',pursuer01:'perseguidor',biological01:'biologico',warden01:'custodio',support01:'apoyo'};
   const guard=G.SPRITE_META.guard01;
   G.SPRITE_META.support01={...guard,a:{...guard.a}};
   for(const[dex,id]of Object.entries(mapping)){
    const meta=G.SPRITE_META[dex],catalog=G.CharacterCatalog.modes[mode][id],logical=meta.a.Idle;
    meta.fallbackBase=meta.base;meta.fallbackExt=meta.ext;meta.fallbackAnimations=meta.a;
    meta.base=`assets/personajes-20261022/${mode}/${id}`;meta.ext='png';meta.sample=1;meta.characterId=id;meta.characterSize=Number(mode);
    meta.a=Object.fromEntries(Object.entries(catalog.actions).filter(([key])=>key!=='Neutralized').map(([name,a])=>[name,{...logical,n:a.frames,r:a.rows,d:a.durations.map(ms=>ms*.06),sourceW:Number(mode),sourceH:Number(mode)}]));
    const dead=catalog.actions.Neutralized;meta.a.Faint={...logical,n:dead.frames,r:dead.rows,d:dead.durations.map(ms=>ms*.06),sourceW:Number(mode),sourceH:Number(mode),file:'Neutralized'};
   }
   G.PersonajesArt?.preload();return;
  }
  for(const id of actors){
   const meta=G.SPRITE_META[id];if(!meta)continue;
   meta.fallbackBase=meta.base;meta.fallbackAnimations=meta.a;
   meta.base='assets/actors-demo-v1/'+id;meta.sample=2;
   meta.a={Idle:{...meta.a.Idle,r:8},Walk:{...meta.a.Walk,n:4,r:8,d:[8,8,8,8]}};
  }
 }
 function initUI(){
  const selector=document.getElementById('character-resolution'),host=document.getElementById('character-graphics');if(!selector||!host)return;
  host.hidden=!G.MapTrial?.expanded;selector.value=mode;
  selector.onchange=()=>{const url=new URL(window.location.href);url.searchParams.set('graficos',selector.value);window.location.assign(url.href);};
  const note=document.getElementById('visual-style-note');
  if(note){note.hidden=!enabled;if(mode==='16'||mode==='32'){
   note.replaceChildren(document.createTextNode(`PERSONAJES · ${mode}×${mode} · `));
   const link=document.createElement('a');link.href='assets/personajes-20261022/index.html';link.textContent='Ver personajes y animaciones';note.append(link);
  }}
  for(const a of document.querySelectorAll('#expanded-practices a')){const u=new URL(a.href,window.location.href);u.searchParams.set('graficos',mode);a.href=u.pathname+u.search;}
 }
 return{enabled,mode,install,initUI};
})();
