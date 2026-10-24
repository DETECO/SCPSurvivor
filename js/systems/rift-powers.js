/* Automatic temporary powers. Profiles: ENSAYO-POD-001 r2; reviewed own MAX extras/compatibility. */
G.RiftPowers=(()=>{
 const catalog=[
  {id:'esporario',name:'Pulso de esporas',interval:4,damage:12,radius:160,kind:'pulse',color:'#e7dba1',extra:{kind:'radius',value:40,desc:'+40u de radio'}},
  {id:'larva',name:'Cápsula vítrea',interval:3.5,damage:18,radius:420,kind:'projectile',color:'#b2e5dd',extra:{kind:'pierce',value:1,desc:'perfora un blanco adicional'}},
  {id:'malla',name:'Tensión orgánica',interval:5,damage:14,radius:240,kind:'chain',color:'#f08da3',extra:{kind:'targets',value:1,desc:'un cuarto blanco'}},
  {id:'portador',name:'Salva espinosa',interval:5,damage:9,radius:400,kind:'fan',color:'#d2b27b',extra:{kind:'projectiles',value:2,desc:'dos espinas adicionales'}},
  {id:'huesped',name:'Brote de cuarentena',interval:6,damage:20,radius:210,kind:'pulse',color:'#dca5a3',extra:{kind:'echo',value:.45,desc:'un segundo pulso a0,45s; una sola repetición'}}
 ];
 let owned=[],seen=new Set(),wins=0,empty=0,pending=null,notices='',pulses=[];
 function startRun(){owned=[];seen=new Set();wins=0;empty=0;pending=null;notices='';pulses=[];}
 function profile(id){return catalog.find(c=>c.id===id);}
 function card(id){const p=profile(id),o=owned.find(x=>x.id===id);return{id,key:'rift-power:'+id,category:'power',w:7,title:`${p.name} · ${o?o.rank===5?'extra':o.rank+1+'/5':'nuevo'}`,desc:`Automático cada ${p.interval}s activos · perfil de ensayo. ${o?.rank===5?'Extra propio: '+p.extra.desc:o?'Mejora este poder.':'Hasta tres poderes; al cuarto eliges reemplazar o rechazar.'}`,apply:player=>applyCard({id},player)};}
 function victory(id,player,{rng=Math.random,anomalyId}={}){
  if(seen.has(id)||pending)return null;const compatible=profile(anomalyId);if(!compatible)throw Error('Unknown anomaly compatibility');seen.add(id);wins++;
  const success=wins===1||empty>=3||rng()<.25;
  if(!success){empty++;notices='Victoria · sin poder esta vez. Garantía tras tres victorias sin poder.';return{id,cards:[]};}
  empty=0;
  // Explicit minimal compatibility table: each BIO grants only its own profile.
  const choices=owned.some(o=>o.id===compatible.id&&o.rank>=6)?[]:[card(compatible.id)];
  if(!choices.length)choices.push({id:'saturation',title:'Apoyo táctico · Potencia',desc:'Apoyo táctico existente durante15s activos; sustituye el anterior.'});
  pending={id,cards:choices};return pending;
 }
 function removeEffects(id){pulses=pulses.filter(p=>p.id!==id);const list=G.Projectiles?.all?.()||[];for(let i=list.length-1;i>=0;i--)if(list[i].riftPower===id)list.splice(i,1);}
 function choose(id,player,{replaceId}={}){
  if(!pending?.cards.some(c=>c.id===id))return{accepted:false};
  if(id==='saturation'){G.InfiniteProgression.grantTactical(player,'power');pending=null;return{accepted:true};}
  const old=owned.find(x=>x.id===id);
  if(old){if(old.rank>=6)return{accepted:false};old.rank++;}
  else{
   if(owned.length>=3){const index=owned.findIndex(p=>p.id===replaceId);if(index<0)return{accepted:false,requiresReplacement:true};removeEffects(owned[index].id);owned.splice(index,1);}
   owned.push({id,rank:1,remaining:profile(id).interval});
  }
  pending=null;notices='Poder temporal incorporado · sin cambios de arma.';return{accepted:true};
 }
 function reject(){if(!pending)return false;pending=null;notices='Poder rechazado · equipo conservado.';return true;}
 function applyCard(c,player){const o=owned.find(x=>x.id===c.id);if(!o||o.rank>=6)return false;o.rank++;return true;}
 function levelCards(){return owned.filter(o=>o.rank<6).map(o=>card(o.id));}
 function clearLine(a,b){const d=Math.hypot(b.x-a.x,b.y-a.y);for(let n=8;n<d;n+=8)if(G.World?.projectileBlock?.(a.x+(b.x-a.x)*n/d,a.y+(b.y-a.y)*n/d,2))return false;return true;}
 function pulse(source,radius,damage,color,limit){
  const targets=(G.EnemyMgr?.all?.()||[]).filter(e=>!e.dead&&Math.hypot(e.x-source.x,e.y-source.y)<=radius&&clearLine(source,e)).sort((a,b)=>Math.hypot(a.x-source.x,a.y-source.y)-Math.hypot(b.x-source.x,b.y-source.y));
  for(const e of targets.slice(0,limit)){e.hurt(damage,color);G.FX?.beam?.(source.x,source.y,Math.atan2(e.y-source.y,e.x-source.x),Math.hypot(e.x-source.x,e.y-source.y),3,color);}
  G.FX?.ring?.(source.x,source.y,10,radius,color,.35,3);
 }
 function tick(dt,player){
  if(!Number.isFinite(dt)||dt<=0||!player||player.dead)return;
  for(let i=pulses.length-1;i>=0;i--){const p=pulses[i];p.remaining-=dt;if(p.remaining<=0){pulses.splice(i,1);pulse(p,p.radius,p.damage,p.color,8);}}
  for(const o of owned){const p=profile(o.id);o.remaining-=dt;if(o.remaining>0)continue;
   const max=o.rank===6,radius=p.radius+(max&&p.extra.kind==='radius'?p.extra.value:0);
   const targets=(G.EnemyMgr?.all?.()||[]).filter(e=>!e.dead&&Math.hypot(e.x-player.x,e.y-player.y)<=radius&&clearLine(player,e)).sort((a,b)=>Math.hypot(a.x-player.x,a.y-player.y)-Math.hypot(b.x-player.x,b.y-player.y));
   if(!targets.length){o.remaining=0;continue;}
   o.remaining=p.interval;const damage=p.damage*(1+.18*(Math.min(o.rank,5)-1))*(player.atk||1),target=targets[0];
   if(p.kind==='projectile'||p.kind==='fan'){
    const angle=Math.atan2(target.y-player.y,target.x-player.x),n=p.kind==='fan'?(max?7:5):1;
    for(let i=0;i<n;i++){const a=angle+(i-(n-1)/2)*.2;G.Projectiles.spawn({x:player.x,y:player.y,vx:Math.cos(a)*320,vy:Math.sin(a)*320,dmg:damage,r:5,life:p.radius/320,pierce:max&&p.kind==='projectile'?1:0,hits:new Set(),color:p.color,friendly:true,riftPower:o.id,fieldWeapon:true,owner:player});}
   }else{
    pulse(player,radius,damage,p.color,p.kind==='chain'?(max?4:3):8);
    if(max&&p.extra.kind==='echo')pulses.push({id:o.id,x:player.x,y:player.y,remaining:.45,radius,damage,color:p.color});
   }
  }
 }
 function clear(){for(const p of owned)removeEffects(p.id);startRun();}
 return{catalog,startRun,victory,choose,reject,levelCards,applyCard,tick,clear,suspend(){const token=pulses;pulses=[];return token;},resume(token){pulses=token.filter(p=>owned.some(o=>o.id===p.id));},get state(){return{owned:owned.map(o=>({...o,name:profile(o.id).name})),wins,empty,pending,pulses:pulses.map(p=>({...p})),notice:notices};}};
})();
