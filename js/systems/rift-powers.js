/* ARM-POD-SEL-001r1 / ENSAYO-POD-002r1. Simulation owns every impact; drawing is read-only. */
G.RiftPowers=(()=>{
 const catalog=G.RiftPowerTuning.profiles.map(p=>({...p,id:p.bioId,interval:p.intervalByRank[0],damage:p.damageByRank[0],radius:p.radiusByRank?.[0]||p.rangeByRank[0],extra:{kind:p.kind,value:1,desc:'Extra propio con presupuesto repartido'}}));
 let owned=[],seen=new Set(),wins=0,empty=0,pending=null,notices='',noticeRemaining=0,cycles=[],serial=0;
 const profile=id=>catalog.find(c=>c.id===id),rankIndex=o=>Math.min(5,Math.max(0,o.rank-1));
 const live=e=>e&&!e.dead&&e.hp>0;
 function startRun(){owned=[];seen=new Set();wins=0;empty=0;pending=null;notices='';noticeRemaining=0;cycles=[];serial=0;}
 function card(id){const p=profile(id),o=owned.find(x=>x.id===id),i=o?rankIndex(o):0;return{id,key:'rift-power:'+id,category:'power',w:7,title:p.name+' · '+(o?o.rank===5?'extra':(o.rank+1)+'/5':'nuevo'),desc:`Automático · ${p.intervalByRank[i]}s entre activaciones con blanco válido. ${o?.rank===5?p.extra.desc:o?'Mejora propia de este poder.':'Hasta tres; al cuarto eliges reemplazar o rechazar.'}`,apply:player=>applyCard({id},player)};}
 function victory(id,player,{rng=Math.random,anomalyId}={}){
  if(seen.has(id)||pending)return null;const p=profile(anomalyId);if(!p)throw Error('Unknown anomaly compatibility');seen.add(id);wins++;
  if(!(wins===1||empty>=3||rng()<.25)){empty++;notices='Victoria · sin poder esta vez. Garantía tras tres victorias sin poder.';noticeRemaining=6;return{id,cards:[]};}
  empty=0;const choices=owned.some(o=>o.id===p.id&&o.rank>=6)?[]:[card(p.id)];
  if(!choices.length)choices.push({id:'saturation',title:'Apoyo táctico · Potencia',desc:'Apoyo táctico existente durante15s activos; sustituye el anterior.'});
  pending={id,cards:choices};return pending;
 }
 function removeEffects(id){cycles=cycles.filter(c=>c.id!==id);const list=G.Projectiles?.all?.()||[];for(let i=list.length-1;i>=0;i--)if(list[i].riftPower===id)list.splice(i,1);}
 function choose(id,player,{replaceId}={}){
  if(!pending?.cards.some(c=>c.id===id))return{accepted:false};
  if(id==='saturation'){G.InfiniteProgression.grantTactical(player,'power');pending=null;return{accepted:true};}
  const old=owned.find(o=>o.id===id);
  if(old){if(old.rank>=6)return{accepted:false};old.rank++;}
  else{if(owned.length>=3){const index=owned.findIndex(o=>o.id===replaceId);if(index<0)return{accepted:false,requiresReplacement:true};removeEffects(owned[index].id);owned.splice(index,1);}owned.push({id,rank:1,remaining:0,activations:0});}
  pending=null;notices=profile(id).name+' · automático · preparado';noticeRemaining=6;return{accepted:true};
 }
 function reject(){if(!pending)return false;pending=null;notices='Poder rechazado · equipo conservado.';noticeRemaining=6;return true;}
 function applyCard(c){const o=owned.find(o=>o.id===c.id);if(!o||o.rank>=6)return false;o.rank++;return true;}
 function levelCards(){return owned.filter(o=>o.rank<6).map(o=>card(o.id));}
 function clearLine(a,b){const d=Math.hypot(b.x-a.x,b.y-a.y);for(let n=4;n<d;n+=4)if(G.World?.projectileBlock?.(a.x+(b.x-a.x)*n/d,a.y+(b.y-a.y)*n/d,2))return false;return true;}
 function candidates(source,radius){return(G.EnemyMgr?.all?.()||[]).filter(e=>live(e)&&Math.hypot(e.x-source.x,e.y-source.y)<=radius&&clearLine(source,e)).sort((a,b)=>Math.hypot(a.x-source.x,a.y-source.y)-Math.hypot(b.x-source.x,b.y-source.y));}
 function begin(o,player){
  const p=profile(o.id),i=rankIndex(o),range=p.rangeByRank?.[i]||p.radiusByRank[i],target=candidates(player,range)[0];if(!target)return;
  const c={id:o.id,selectedId:p.selectedId,kind:p.kind,serial:++serial,rank:o.rank,index:i,age:0,duration:p.durationByRank[i],radius:p.radiusByRank?.[i]||p.rangeByRank[i],range,angle:Math.atan2(target.y-player.y,target.x-player.x),source:{x:player.x,y:player.y},target:{x:target.x,y:target.y},damage:p.damageByRank[i]*(player.atk||1),events:[],spent:new Map(),eligible:new Set(),maxTargets:p.maxTargetsByRank?.[i]||Infinity};
  const event=(at,fraction,type,extra={})=>c.events.push({at,fraction,type,...extra,done:false});
  if(p.kind==='sporePulse')for(const impact of p.impactsByRank[i])event(impact.at,impact.fraction,'pulse');
  if(p.kind==='capsulePool'){
   const zones=o.rank===6?[{weight:p.maxSplit.primary,offset:0},{weight:p.maxSplit.secondary,offset:p.maxSplit.secondaryOffset}]:[{weight:1,offset:0}];
   for(const zone of zones){const center={x:c.target.x-Math.sin(c.angle)*zone.offset,y:c.target.y+Math.cos(c.angle)*zone.offset};event(p.flightSeconds,zone.weight*p.impactFraction,'pool',{center});for(let n=1;n<=p.poolTicks;n++)event(p.flightSeconds+(c.duration-p.flightSeconds)*n/p.poolTicks,zone.weight*p.poolFraction/p.poolTicks,'pool',{center});}
  }
  if(p.kind==='tendonSweep'){event(p.impactAt,o.rank===6?p.maxReturn.outgoingFraction:1,'sweep');if(o.rank===6)event(p.maxReturn.at,p.maxReturn.returnFraction,'sweep');}
  if(p.kind==='radialCrown'){event(p.releaseAt,o.rank===6?p.maxSecondary.primaryDamageFraction:1,'crown',{count:p.projectilesByRank[i],range});if(o.rank===6)event(p.maxSecondary.at,p.maxSecondary.secondaryDamageFraction,'crown',{count:p.maxSecondary.count,range:range*p.maxSecondary.rangeFraction});}
  if(p.kind==='repulsionMembrane'){event(p.impactAt,o.rank===6?p.maxContraction.openingFraction:1,'membrane',{push:true});if(o.rank===6)event(p.maxContraction.at,p.maxContraction.contractionFraction,'membrane',{push:false});}
  cycles.push(c);o.remaining=p.intervalByRank[i];o.activations++;
 }
 function push(e,distance,source){
  if(e.boss||distance<=0)return;const angle=Math.atan2(e.y-source.y,e.x-source.x);
  for(let moved=0;moved<distance;){const step=Math.min(4,distance-moved),x=e.x+Math.cos(angle)*step,y=e.y+Math.sin(angle)*step;if(G.World?.isFree&&!G.World.isFree(x,y,e.r))break;e.x=x;e.y=y;moved+=step;}
 }
 function impact(c,event,player){
  const p=profile(c.id),color=G.RiftPowerAssets?.find(a=>a.bioId===c.id)?.colors?.[0]||'#e6c7be';
  if(event.type==='crown'){
   for(let n=0;n<event.count;n++){const a=c.angle+n*Math.PI*2/event.count;G.Projectiles.spawn({x:player.x,y:player.y,vx:Math.cos(a)*p.projectileSpeed,vy:Math.sin(a)*p.projectileSpeed,dmg:c.damage*event.fraction/event.count,r:3,life:event.range/p.projectileSpeed,pierce:p.pierce,hits:new Set(),color,friendly:true,riftPower:c.id,fieldWeapon:true,owner:player});}return;
  }
  const source=event.type==='pool'?event.center:player;
  if(event.type==='pool'&&!clearLine(c.source,event.center))return;
  let targets=candidates(source,c.radius);
  if(event.type==='sweep')targets=targets.filter(e=>Math.abs(Math.atan2(Math.sin(Math.atan2(e.y-source.y,e.x-source.x)-c.angle),Math.cos(Math.atan2(e.y-source.y,e.x-source.x)-c.angle)))<=p.arcDegrees*Math.PI/360);
  for(const e of targets){
   if(!c.eligible.has(e)&&c.eligible.size>=c.maxTargets)continue;c.eligible.add(e);
   const spent=c.spent.get(e)||0,damage=Math.max(0,Math.min(c.damage-spent,c.damage*event.fraction));if(damage>0){e.hurt(damage,color);c.spent.set(e,spent+damage);}
   if(event.type==='membrane'&&event.push)push(e,e.boss?p.bossPushDistance:p.pushDistanceByRank[c.index],source);
  }
 }
 function tick(dt,player){
  if(!Number.isFinite(dt)||dt<=0||!player||player.dead||player.hp<=0)return;
  noticeRemaining=Math.max(0,noticeRemaining-dt);
  for(const o of owned){o.remaining=Math.max(0,o.remaining-dt);if(o.remaining===0)begin(o,player);}
  for(let i=cycles.length-1;i>=0;i--){const c=cycles[i];c.age+=dt;for(const event of c.events)if(!event.done&&c.age+1e-9>=event.at){event.done=true;impact(c,event,player);}if(c.age+1e-9>=c.duration)cycles.splice(i,1);}
 }
 function clear(){for(const o of owned)removeEffects(o.id);startRun();}
 function view(c){return{id:c.id,selectedId:c.selectedId,kind:c.kind,serial:c.serial,rank:c.rank,age:c.age,duration:c.duration,radius:c.radius,range:c.range,angle:c.angle,source:{...c.source},target:{...c.target},damage:c.damage};}
 return{catalog,startRun,victory,choose,reject,levelCards,applyCard,tick,clear,suspend(){const token=cycles;cycles=[];return token;},resume(token){cycles=token.filter(c=>owned.some(o=>o.id===c.id));},get state(){return{owned:owned.map(o=>({...o,name:profile(o.id).name,interval:profile(o.id).intervalByRank[rankIndex(o)]})),wins,empty,pending,cycles:cycles.map(view),pulses:cycles.map(view),notice:noticeRemaining>0?notices:''};}};
})();
