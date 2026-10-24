/* Automatic temporary powers. Numeric/catalogue profiles are ENSAYO-GRI-001 r1. */
G.RiftPowers=(()=>{
 const catalog=[
  {id:'esporario',name:'Pulso de esporas',interval:4,damage:12,radius:160,kind:'pulse',color:'#e7dba1'},
  {id:'larva',name:'Cápsula vítrea',interval:3.5,damage:18,radius:420,kind:'projectile',color:'#b2e5dd'},
  {id:'malla',name:'Tensión orgánica',interval:5,damage:14,radius:240,kind:'chain',color:'#f08da3'},
  {id:'portador',name:'Salva espinosa',interval:5,damage:9,radius:400,kind:'fan',color:'#d2b27b'},
  {id:'huesped',name:'Brote de cuarentena',interval:6,damage:20,radius:210,kind:'pulse',color:'#dca5a3'}
 ];
 let owned=[],seen=new Set(),wins=0,empty=0,pending=null,notices='';
 function startRun(){owned=[];seen=new Set();wins=0;empty=0;pending=null;notices='';}
 function profile(id){return catalog.find(c=>c.id===id);}
 function card(id){const p=profile(id),o=owned.find(x=>x.id===id);return{id,key:'rift-power:'+id,category:'power',w:7,title:`${p.name} · ${o?o.rank===5?'extra':o.rank+1+'/5':'nuevo'}`,desc:`Automático cada ${p.interval}s activos · perfil de ensayo. ${o?'Mejora este poder.':'Hasta tres poderes; al cuarto eliges reemplazar o rechazar.'}`,apply:player=>applyCard({id},player)};}
 function victory(id,player,{rng=Math.random,anomalyId}={}){
  if(seen.has(id)||pending)return null;seen.add(id);wins++;
  const success=wins===1||empty>=3||rng()<.25;
  if(!success){empty++;notices='Victoria · sin poder esta vez. Garantía tras tres victorias sin poder.';return{id,cards:[]};}
  empty=0;
  const options=catalog.filter(c=>!owned.some(o=>o.id===c.id&&o.rank>=6));
  const preferred=options.find(c=>c.id===anomalyId);if(preferred){options.splice(options.indexOf(preferred),1);options.unshift(preferred);}
  // Independent shuffle of alternatives, never consumes the director RNG.
  const pool=preferred?options.slice(1):options.slice();for(let i=pool.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}
  const choices=(preferred?[preferred,...pool]:pool).slice(0,3).map(p=>card(p.id));
  if(!choices.length)choices.push({id:'saturation',title:'Apoyo táctico · Potencia',desc:'Apoyo táctico existente durante15s activos; sustituye el anterior.'});
  pending={id,cards:choices};return pending;
 }
 function removeEffects(id){const list=G.Projectiles?.all?.()||[];for(let i=list.length-1;i>=0;i--)if(list[i].riftPower===id)list.splice(i,1);}
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
 function tick(dt,player){
  if(!Number.isFinite(dt)||dt<=0||!player||player.dead)return;
  for(const o of owned){const p=profile(o.id);o.remaining-=dt;if(o.remaining>0)continue;
   const targets=(G.EnemyMgr?.all?.()||[]).filter(e=>!e.dead&&Math.hypot(e.x-player.x,e.y-player.y)<=p.radius&&clearLine(player,e)).sort((a,b)=>Math.hypot(a.x-player.x,a.y-player.y)-Math.hypot(b.x-player.x,b.y-player.y));
   if(!targets.length){o.remaining=0;continue;}
   o.remaining=p.interval;const damage=p.damage*(1+.18*(Math.min(o.rank,5)-1))*(o.rank===6?1.3:1)*(player.atk||1),target=targets[0];
   if(p.kind==='projectile'||p.kind==='fan'){
    const angle=Math.atan2(target.y-player.y,target.x-player.x),n=p.kind==='fan'?5:1;
    for(let i=0;i<n;i++){const a=angle+(i-(n-1)/2)*.2;G.Projectiles.spawn({x:player.x,y:player.y,vx:Math.cos(a)*320,vy:Math.sin(a)*320,dmg:damage,r:5,life:1.5,hits:new Set(),color:p.color,friendly:true,riftPower:o.id,fieldWeapon:true,owner:player});}
   }else{
    const limit=p.kind==='chain'?3:8;for(const e of targets.slice(0,limit)){e.hurt(damage,p.color);G.FX?.beam?.(player.x,player.y,Math.atan2(e.y-player.y,e.x-player.x),Math.hypot(e.x-player.x,e.y-player.y),3,p.color);}
    G.FX?.ring?.(player.x,player.y,10,p.radius,p.color,.35,3);
   }
  }
 }
 function clear(){for(const p of owned)removeEffects(p.id);startRun();}
 return{catalog,startRun,victory,choose,reject,levelCards,applyCard,tick,clear,get state(){return{owned:owned.map(o=>({...o,name:profile(o.id).name})),wins,empty,pending,notice:notices};}};
})();
