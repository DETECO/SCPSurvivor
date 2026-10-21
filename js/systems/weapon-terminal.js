/* Optional local replacement terminal. No account/collection/currency mutation. */
G.WeaponTerminal=(()=>{
 let point=null,owner=null,near=false,opened=false,slots=[],notice='',serial=0,key='';
 const enabled=()=>G.MapTrial?.expanded===true;
 const models=()=>Object.keys(G.FieldCatalog.models).filter(k=>['pistol','smg','shotgun','baton'].includes(k));
 const alive=p=>!!p&&!p.dead&&p.hp>0;
 function clearLine(p,q){
  const d=Math.hypot(q.x-p.x,q.y-p.y),n=Math.max(1,Math.ceil(d/8));
  for(let i=0;i<=n;i++)if(G.World.projectileBlock?.(p.x+(q.x-p.x)*i/n,p.y+(q.y-p.y)*i/n,2))return false;
  return true;
 }
 const inRange=()=>!!point&&alive(owner)&&Math.hypot(point.x-owner.x,point.y-owner.y)<=70&&clearLine(owner,point);
 function reset(geometry,{player,sector=1,seed=0}={}){
  point=null;owner=player||null;near=false;opened=false;slots=[];notice='';serial=0;key=`${seed>>>0}:${sector}`;
  if(!enabled()||!geometry?.entry||!owner)return;
  const entry=geometry.entry,exit=geometry.exit;
  const valid=p=>p&&Number.isFinite(p.x)&&Number.isFinite(p.y)&&G.World.isFree(p.x,p.y,18)&&G.Path.reachable(p.x,p.y,owner)&&(!exit||Math.hypot(p.x-exit.x,p.y-exit.y)>100);
  const candidates=(geometry.spawnPoints||[]).filter(p=>valid(p)&&Math.hypot(p.x-entry.x,p.y-entry.y)>=100&&Math.hypot(p.x-entry.x,p.y-entry.y)<=900)
   .sort((a,b)=>Math.hypot(a.x-entry.x,a.y-entry.y)-Math.hypot(b.x-entry.x,b.y-entry.y));
  const fallback=[{x:entry.x+96,y:entry.y},{x:entry.x,y:entry.y+96},{x:entry.x-96,y:entry.y},{x:entry.x,y:entry.y-96}].find(valid);
  const p=candidates[0]||fallback;if(p)point={x:p.x,y:p.y};
 }
 function tick(dt,p){if(p===owner)near=enabled()&&inRange();}
 function open(){
  if(!enabled()||opened||G.Game?.state!=='playing'||!inRange()||!['combat','boss'].includes(G.Expedition.state.phase)||
   G.Expedition.state.pending||G.ArmamentRewards?.state.pending||!owner.fieldWeapons?.length)return false;
  slots=owner.fieldWeapons.map(w=>({id:w.id,model:w.model}));
  if(G.Expedition.awaitTerminal()!==true){slots=[];return false;}
  opened=true;near=true;notice='Elige la ranura y el modelo. La nueva arma empieza sin sus ramas propias.';return true;
 }
 function close(){
  if(!opened)return false;opened=false;slots=[];G.Expedition.resolveTerminal();return true;
 }
 function choose(slot,model){
  if(!enabled()||!opened||G.Game?.state!=='playing'||G.Expedition.state.phase!=='terminal'||!inRange()||
   !Number.isInteger(slot)||slot<0||slot>=slots.length||!models().includes(model))return false;
  const expected=slots[slot],current=owner.fieldWeapons[slot];
  if(!current||current.id!==expected.id||current.model!==expected.model){notice='El equipo cambió; cierra y vuelve a abrir el terminal.';return false;}
  const id=`terminal:${key}:${serial+1}`;
  if(G.FieldCombat.replace(current.id,model,id)!==true){notice='No se pudo reemplazar el arma.';return false;}
  serial++;notice='Arma reemplazada: conserva la otra copia y las mejoras generales.';close();return true;
 }
 function draw(ctx){
  if(!enabled()||!point)return;ctx.save();ctx.translate(point.x,point.y);
  ctx.fillStyle='#161317';ctx.strokeStyle=near?'#fff5f2':'#d93c49';ctx.lineWidth=2;
  ctx.fillRect(-13,-23,26,30);ctx.strokeRect(-13,-23,26,30);ctx.fillStyle='#d93c49';ctx.fillRect(-8,-18,16,10);
  ctx.fillStyle='#fff5f2';ctx.font='bold 9px monospace';ctx.textAlign='center';ctx.fillText('T',0,2);ctx.restore();
 }
 return{reset,tick,open,choose,close,draw,get state(){return{available:enabled()&&!!point,point:point?{...point}:null,near:enabled()&&near,open:opened,slots:slots.map(s=>({...s})),models:enabled()?models():[],notice};}};
})();
