/* Provisional visual layer. Logical geometry and gameplay stay unchanged. */
G.TrialVisuals=(()=>{
 const enabled=G.MapTrial?.expanded===true&&new URLSearchParams(window.location.search).get('graficos')!=='clasicos';
 const actors=['guard01','medic01','pursuer01','biological01','warden01'];
 let installed=false;
 function install(){
  if(!enabled||installed)return;installed=true;
  for(const id of actors){
   const meta=G.SPRITE_META[id];if(!meta)continue;
   meta.fallbackBase=meta.base;meta.fallbackAnimations=meta.a;
   meta.base='assets/actors-demo-v1/'+id;meta.sample=2;
   meta.a={Idle:{...meta.a.Idle,r:8},Walk:{...meta.a.Walk,n:4,r:8,d:[8,8,8,8]}};
  }
 }
 return{enabled,install};
})();
