/* T1A: armament only for this run. No account, currency or persistent collection writes. */
G.ArmamentRewards=(()=>{
 const plans=new Map(),receipts=new Map(),branches=['power','rhythm','handling','specialization'];
 let pending=null,notice='';
 const enabled=()=>G.MapTrial?.infinite===true;
 const own=(o,k)=>Object.prototype.hasOwnProperty.call(o,k);
 function valid(p){
  if(!enabled()||!p||p.dead||!(p.hp>0)||['finished','idle'].includes(G.Expedition?.state?.phase)||!Array.isArray(p.fieldWeapons)||p.fieldWeapons.length<1||p.fieldWeapons.length>2||G.FieldCombat?.getweapons()!==p.fieldWeapons)return false;
  const ids=new Set();
  return p.fieldWeapons.every(c=>c&&typeof c.id==='string'&&!!c.id.trim()&&!ids.has(c.id)&&(ids.add(c.id),true)&&
   own(G.FieldCatalog.models,c.model)&&Array.isArray(c.mods)&&!c.mods.length&&G.InfiniteProgression.ensure(c));
 }
 function startRun(){plans.clear();receipts.clear();pending=null;notice='';}
 function offer({id,kind,seed,player}={}){
  if(!enabled()||typeof id!=='string'||!id.trim()||!['boss','elite'].includes(kind)||!Number.isFinite(seed)||!valid(player))return null;
  if(!plans.has(id))plans.set(id,{id,kind,seed,player});
  const p=plans.get(id);return{id:p.id,kind:p.kind,tickets:0,description:'Armamento · segunda arma o mejora de una equipada.'};
 }
 function draw(plan){let n=plan.seed>>>0;for(const c of plan.id)n=Math.imul(n^c.charCodeAt(0),16777619)>>>0;return n/4294967296;}
 function finish(plan,result){receipts.set(plan.id,{id:plan.id,kind:plan.kind,...result});notice=result.description;return{...result};}
 function improve(plan){
  if(G.WeaponRevisionTrial?.active()){
   const result=G.WeaponRevisionTrial.claimReward(plan.id,plan.player,{draw:()=>draw(plan)});
   if(!result.ok)return{ok:false,outcome:'blocked',description:'La mejora AF01 ya no es compatible.'};
   if(result.outcome==='no_eligible_upgrade'){
    if(!G.InfiniteProgression.grantTactical(plan.player,'power'))return{ok:false,outcome:'blocked',description:'No se pudo aplicar el apoyo táctico.'};
    return finish(plan,{ok:true,outcome:'tactical',description:'Armamento al máximo · apoyo táctico de potencia durante 15 s activos (ensayo).'});
   }
   const description=result.outcome==='upgraded'
    ?`Premio de armamento · Pistola AF01: ${G.WeaponRevisionTrial.levelLabel(plan.player.fieldWeapons.find(c=>c.id===result.copy.id))}.`
    :'Armamento AF01 al MAX · no se desperdició el ascenso.';
   return finish(plan,{ok:true,outcome:result.outcome,weaponId:result.copy?.id||null,description});
  }
  const options=plan.player.fieldWeapons.flatMap(c=>branches.filter(b=>c.branches[b]<6).map(branch=>({id:c.id,branch,model:c.model})));
  if(!options.length){
   if(!G.InfiniteProgression.grantTactical(plan.player,'power'))return{ok:false,outcome:'blocked',description:'No se pudo aplicar el apoyo táctico.'};
   return finish(plan,{ok:true,outcome:'tactical',description:'Armamento al máximo · apoyo táctico de potencia durante 15 s activos (ensayo).'});
  }
  const target=options[Math.floor(draw(plan)*options.length)];
  if(!G.FieldCombat.upgrade(target.id,target.branch))return{ok:false,outcome:'blocked',description:'La mejora ya no es compatible.'};
  return finish(plan,{ok:true,outcome:'upgraded',weaponId:target.id,branch:target.branch,description:`Mejora temporal · ${G.FieldCatalog.models[target.model].name}: ${target.branch}.`});
 }
 function claim(id,player){
  const plan=plans.get(id);
  if(!valid(player)||!plan||plan.player!==player)return{ok:false,outcome:'blocked',description:'Armamento bloqueado: equipo incompatible.'};
  if(receipts.has(id))return{ok:false,outcome:'already-claimed',description:'Este premio ya fue entregado.'};
  if(pending)return pending.id===id?{ok:true,outcome:'choice',description:notice}:{ok:false,outcome:'busy',description:'Resuelve primero la elección de armamento.'};
  if(player.fieldWeapons.length===2)return improve(plan);
  const wanted=G.WeaponRevisionTrial?.active()?['pistol']:(G.MapTrial?.expanded?['pistol',draw(plan)<.5?'smg':'shotgun','baton']:['pistol','smg','shotgun']);
  const models=wanted.filter(m=>own(G.FieldCatalog.models,m));
  if(!models.length)return{ok:false,outcome:'blocked',description:'No hay modelos compatibles.'};
  pending={id,models,description:'Elige la segunda arma · la acción está detenida.',plan};notice=pending.description;
  G.Expedition?.awaitArmament?.();
  return{ok:true,outcome:'choice',description:notice};
 }
 function choose(model){
  if(!pending||!valid(pending.plan.player)||!pending.models.includes(model))return false;
  const plan=pending.plan,p=plan.player;
  if(p.fieldWeapons.length===2){const result=improve(plan);if(!result.ok)return false;}
  else if(G.WeaponRevisionTrial?.active()){
   const result=G.WeaponRevisionTrial.claimReward(plan.id,p,{model:'AF01'});
   if(!result.ok)return false;
   finish(plan,{ok:true,outcome:'acquired',model:'AF01',weaponId:result.copy.id,
    description:'Segunda Pistola AF01 equipada en nivel 1 · ambas copias atacan por separado.'});
  }
  else{
   if(!G.FieldCombat.acquire(model,`armament:${plan.id}`))return false;
   finish(plan,{ok:true,outcome:'acquired',model,description:`Segunda arma equipada: ${G.FieldCatalog.models[model].name} · ambas atacan automáticamente.`});
  }
  pending=null;G.Expedition?.resolveArmament?.();return true;
 }
 function claimAll(player){
  for(const plan of plans.values())if(!receipts.has(plan.id)){
   const r=claim(plan.id,player);if(!r.ok||r.outcome==='choice')return false;
  }
  return !pending;
 }
 return{startRun,offer,claim,choose,claimAll,get state(){return{pending:pending?{id:pending.id,models:pending.models.slice(),description:pending.description}:null,notice,receipts:Array.from(receipts.values(),r=>({...r}))};}};
})();
