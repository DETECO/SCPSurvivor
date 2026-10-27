/* Temporary support. EST-NPC-001: random ballistic model, unlimited reserve; finite magazines. */
G.RiftCompanion=(()=>{
 const equipment={Normal:{damageScale:.5,intervalScale:1},Rara:{damageScale:.575,intervalScale:.95},'Épica':{damageScale:.65,intervalScale:.9},Legendaria:{damageScale:.75,intervalScale:.85}};
 const models=['pistol','smg','shotgun'];
 const alive=()=>!!npc&&npc.hp>0&&!npc.incapacitated&&!npc.dead;
 function captureTransfer(){return{entity:npc,pose:npc?{x:npc.x,y:npc.y,tx:npc.tx,ty:npc.ty,aim:npc.aim}:null};}
 function restoreTransfer(token){npc=token?.entity||null;if(npc&&token.pose)Object.assign(npc,token.pose);}
 function placeNear(player){
  if(!alive())return;
  const offsets=[[-48,0],[48,0],[0,-48],[0,48],[-32,-32],[32,32],[0,0]];
  const point=offsets.map(([dx,dy])=>({x:player.x+dx,y:player.y+dy})).find(p=>(!G.World.isFree||G.World.isFree(p.x,p.y,npc.r))&&(!G.Path?.reachable||G.Path.reachable(p.x,p.y,player)))||{x:player.x,y:player.y};
  npc.x=npc.tx=point.x;npc.y=npc.ty=point.y;
 }
 function enterRoom(options){if(alive()){placeNear(options.player);return npc;}return create(options);}
 const names=['Gabriel','Tomás','Mateo','Nicolás','Diego','Martín','Andrés','Sebastián','Daniel','Lucas','Samuel','Joaquín','Rafael','Benjamín','Felipe','Manuel','Vicente','Rodrigo','Esteban'];let npc=null,usedNames=new Set();
 function line(code,player){
  if(!npc)return'';const bank=G.RiftDialogueData.bank[npc.personality];let text=code==='presentation'?G.RiftDialogueData.presentations?.[npc.presentationId]:bank?.[code];if(!text)return'';
  if(text.includes('{nombre_jugador}')&&!player?.alias)text=G.RiftDialogueData.withoutAlias[npc.personality]||'';
  const weapon=player?.fieldWeapons?.[0],name=weapon?G.FieldCatalog?.models?.[weapon.model]?.name:null;
  if(text.includes('{arma_jugador}')&&!name)return'';
  text=text.replaceAll('{nombre_npc}',npc.name).replaceAll('{arma_npc}',npc.weapon.name).replaceAll('{arma_jugador}',name||'').replaceAll('{nombre_jugador}',player?.alias||'');return text.includes('{')?'':text;
 }
 function speak(code,player){if(!npc||npc.used.has(code))return false;const text=line(code,player);if(!text)return false;npc.used.add(code);npc.bubble=text;npc.bubbleTime=5;npc.lastCode=code;return true;}
 const femaleNames=['Valeria','Camila','Elena','Paula','Antonia','Daniela','Sofía','Lucía','Martina','Renata','Natalia','Emilia','Julia','Inés','Laura','Andrea','Beatriz','Clara','Isabel','Teresa'];
 function create({tier,rng=Math.random,geometry,player,appearance}){
  npc=null;if(rng()>=(tier==='D5'?.1:.33))return null;
  const rarity=tier==='D5'?'Legendaria':tier==='D4'?(rng()<.5?'Rara':'Épica'):'Normal',gear=equipment[rarity];
  const model=models[Math.min(models.length-1,Math.floor(rng()*models.length))],base=G.FieldCatalog.models[model];
  const weapon={model,name:base.name+' de apoyo '+rarity,resource:model==='pistol'?'AF01':null,damage:base.damage*gear.damageScale,interval:base.interval*gear.intervalScale,
   capacity:base.capacity,reloadTime:base.reloadTime,range:base.range,speed:base.speed,spread:base.spread,pellets:base.pellets};
  const personalities=Object.keys(G.RiftDialogueData.bank),personality=personalities[Math.min(personalities.length-1,Math.floor(rng()*personalities.length))];
  const appearances=G.CompanionCharacters?.appearances||[{id:'masculino',characterId:'apoyo',gender:'M'}],look=appearances.find(a=>a.id===appearance)||appearances[Math.min(appearances.length-1,Math.floor(rng()*appearances.length))],nameList=look.gender==='F'?femaleNames:names;
  const available=nameList.filter(n=>!usedNames.has(n)&&n!==player?.alias),pool=available.length?available:nameList.filter(n=>n!==player?.alias);const name=pool[Math.min(pool.length-1,Math.floor(rng()*pool.length))],entry=geometry.entry;usedNames.add(name);
  const presIndex=['SARC','ENOJ','ENTU','CARI','SIMP','SERE','NERV','ANAL'].indexOf(personality);
  npc={name,personality,tier,rarity,appearance:look.id,characterId:look.characterId,gender:look.gender,r:12,biography:'generic-home',homeUsed:false,presentationId:tier==='D5'?'PRES-09':presIndex>=0?'PRES-0'+(presIndex+1):'PRES-12',weapon,ammo:weapon.capacity,capacity:weapon.capacity,reserveInfinite:true,reload:0,reloads:0,shots:0,hp:45,maxHp:45,incapacitated:false,dead:false,x:entry.x+40,y:entry.y,tx:entry.x+40,ty:entry.y,aim:0,wait:1,flash:0,invuln:0,age:0,bubble:'',bubbleTime:0,used:new Set(),observedShots:G.FieldCombat?.state?.shots||0,anim:new G.Sprites.Animator('support01',1,false)};
  if(!speak('presentation',player))speak(tier==='D5'?'13':'01',player);return npc;
 }
 function clearLine(ax,ay,bx,by){const distance=Math.hypot(bx-ax,by-ay);for(let d=8;d<distance;d+=8)if(G.World.projectileBlock(ax+(bx-ax)*d/distance,ay+(by-ay)*d/distance,2))return false;return true;}
 function hurt(amount){if(!npc||npc.incapacitated||npc.invuln>0)return;npc.hp=Math.max(0,npc.hp-amount);npc.invuln=.5;if(npc.hp===0){npc.incapacitated=true;npc.dead=true;npc.bubble='';}}
 function update(dt,player,{boss,escapeSoon=false,roomContext={}}={}){
  if(!alive()||!Number.isFinite(dt)||dt<=0||(G.Game?.state&&G.Game.state!=='playing'))return;
  if(!boss)boss=(G.EnemyMgr?.all?.()||[]).filter(e=>!e.dead&&e.hp>0&&Math.hypot(e.x-npc.x,e.y-npc.y)<=npc.weapon.range&&clearLine(npc.x,npc.y,e.x,e.y)).sort((a,b)=>Math.hypot(a.x-npc.x,a.y-npc.y)-Math.hypot(b.x-npc.x,b.y-npc.y))[0];
  npc.age+=dt;npc.bubbleTime=Math.max(0,npc.bubbleTime-dt);npc.wait=Math.max(0,npc.wait-dt);npc.invuln=Math.max(0,npc.invuln-dt);npc.flash=Math.max(0,npc.flash-dt);
  if(npc.incapacitated)return;
  if(npc.reload>0){npc.reload=Math.max(0,npc.reload-dt);if(npc.reload===0){npc.ammo=npc.capacity;npc.reloads++;}}
  const dx=player.x-48-npc.x,dy=player.y-npc.y,d=Math.hypot(dx,dy);npc.tx=player.x-48;npc.ty=player.y;
  if(d>60){const route=G.Path?.dirFor?.(npc,player)||[dx/d,dy/d];npc.x+=route[0]*95*dt;npc.y+=route[1]*95*dt;G.World.collide(npc);}
  npc.anim?.update?.(dt);npc.anim?.loop?.(d>60?'Walk':'Idle');
  if(boss&&!boss.dead&&npc.reload===0&&npc.ammo>0&&npc.wait<=0&&Math.hypot(boss.x-npc.x,boss.y-npc.y)<=npc.weapon.range&&clearLine(npc.x,npc.y,boss.x,boss.y)){
   npc.aim=Math.atan2(boss.y-npc.y,boss.x-npc.x);npc.shot={x:boss.x,y:boss.y};npc.wait=npc.weapon.interval;npc.flash=.09;npc.ammo--;npc.shots++;
   const w=npc.weapon,fan=w.spread*Math.PI/180;
   for(let i=0;i<w.pellets;i++){
    const angle=npc.aim+(w.pellets>1?(i/(w.pellets-1)-.5)*fan:(Math.random()-.5)*fan);
    G.Projectiles.spawn({x:npc.x,y:npc.y,vx:Math.cos(angle)*w.speed,vy:Math.sin(angle)*w.speed,dmg:w.damage,r:w.pellets>1?2:3,life:w.range/w.speed,
     hits:new Set(),friendly:true,fieldWeapon:true,allySupport:true,color:'#f0df8e'});
   }
   if(npc.ammo===0)npc.reload=w.reloadTime;
  }
  const priority=escapeSoon||['windup','attack'].includes(boss?.phase);
  if(priority)return;
  if(boss?.dead)speak('15',player);
  else if(player.hp/player.maxHp<.3)speak('10',player);
  else if(npc.bubbleTime<=0){
   if(npc.tier==='D5'){if(npc.age>15)speak('14',player);}
   else if(npc.age>12&&!npc.used.has('03'))speak('03',player);
   else if(npc.age>28&&!npc.used.has('04'))speak('04',player);
   else if(npc.age>44&&(G.FieldCombat?.state?.shots||0)>npc.observedShots&&!npc.used.has('05'))speak('05',player);
   else if(npc.age>52&&roomContext.yellowPaper&&!npc.used.has('06'))speak('06',player);
   else if(npc.age>52&&roomContext.repeatedCorridors&&!npc.used.has('07'))speak('07',player);
   else if(npc.age>60&&!npc.homeUsed&&player.hp/player.maxHp>=.5){if(speak('08',player))npc.homeUsed=true;}
   else if(npc.age>80)speak('12',player);
  }
 }
 function hurtArea(origin,radius,damage,source=origin){if(alive()&&Math.hypot(npc.x-origin.x,npc.y-origin.y)<=radius+npc.r&&clearLine(source.x,source.y,npc.x,npc.y)&&clearLine(origin.x,origin.y,npc.x,npc.y))hurt(damage);}
 function receiveDamage(){
  if(!alive())return;
  for(const e of G.EnemyMgr?.all?.()||[]){
   if(e.dead||e.hp<=0)continue;
   if(e.dimensional){
    if(e.pattern==='jump'){if(e.landedThisFrame&&e.lastLanding.some(z=>G.RiftAnomalies.contains(z,npc)))hurt(e.dmg);}
    else if(e.pattern==='dash'){if(e.phase==='attack'&&Math.hypot(e.x-npc.x,e.y-npc.y)<=e.r+npc.r)hurt(e.dmg);}
    else for(const z of e.zones||[])if(e.phase==='attack'&&e.attackElapsed>=z.delay&&e.attackElapsed<=z.delay+z.life&&G.RiftAnomalies.contains(z,npc))hurt(e.dmg);
   }else if(!e.boss&&Math.hypot(e.x-npc.x,e.y-npc.y)<e.r+npc.r)hurt(e.dmg||e.def?.dmg||0);
  }
  const shots=G.Projectiles?.all?.()||[];
  for(let i=shots.length-1;i>=0;i--){const p=shots[i];if(p.friendly||!Number.isFinite(p.dmg)||p.dmg<=0)continue;const x=Number.isFinite(p.px)?p.px:p.x,y=Number.isFinite(p.py)?p.py:p.y,dx=p.x-x,dy=p.y-y,k=Math.max(0,Math.min(1,((npc.x-x)*dx+(npc.y-y)*dy)/(dx*dx+dy*dy||1))),hit={x:x+dx*k,y:y+dy*k};if(Math.hypot(npc.x-hit.x,npc.y-hit.y)<p.r+npc.r&&clearLine(x,y,hit.x,hit.y)&&!G.World.projectileBlock(hit.x,hit.y,p.r)){hurt(p.dmg);shots.splice(i,1);}}
 }
 function draw(ctx){
  if(!npc)return;ctx.save();if(npc.incapacitated)ctx.globalAlpha=.5;
  if(!G.PersonajesArt?.drawAlly(ctx,npc))npc.anim?.draw?.(ctx,npc.x,npc.y);
  ctx.font='bold 10px monospace';ctx.textAlign='center';ctx.fillStyle='#f6e8b8';ctx.fillText(npc.name+(npc.incapacitated?(npc.gender==='F'?' · MUERTA':' · MUERTO'):` · ${Math.ceil(npc.hp)}/${npc.maxHp} HP · ${npc.reload>0?'Recarga':npc.ammo+'/'+npc.capacity} · ∞`),npc.x,npc.y-70);ctx.restore();
 }
 function drawBubble(ctx,{priority=false}={}){
  if(!npc||npc.incapacitated||npc.bubbleTime<=0||!npc.bubble||priority)return;
  ctx.save();ctx.font='12px monospace';const words=npc.bubble.split(' '),lines=[];let line='';for(const word of words){if((line+' '+word).length>30){lines.push(line);line=word;}else line+=(line?' ':'')+word;}if(line)lines.push(line);
  const width=230,height=lines.length*15+14,cam=G.Camera;let x=npc.x-width/2,y=npc.y-88-height;
  if(cam?.left&&cam?.top){const hud=typeof document!=='undefined'?document.getElementById('hud-summary')?.getBoundingClientRect().bottom||0:0;x=Math.max(cam.left()+8/cam.scale,Math.min(x,cam.left()+cam.w-width-8/cam.scale));y=Math.max(cam.top()+(hud+8)/cam.scale,Math.min(y,cam.top()+cam.h-height-84/cam.scale));}
  if(G.CornerHUD?.placeBubble&&cam?.left&&cam?.top){const position=G.CornerHUD.placeBubble(x,y,width,height,cam);if(!position){ctx.restore();return;}x=position.x;y=position.y;}
  ctx.fillStyle='#101419ed';ctx.strokeStyle='#eee5ce';ctx.lineWidth=1;ctx.fillRect(x,y,width,height);ctx.strokeRect(x,y,width,height);ctx.fillStyle='#fff1db';ctx.textAlign='left';lines.forEach((s,i)=>ctx.fillText(s,x+8,y+18+i*15));ctx.restore();
 }
 return{startRun(){npc=null;usedNames=new Set();},create,enterRoom,captureTransfer,restoreTransfer,placeNear,hurtArea,receiveDamage,update,hurt,drawBubble,equipment,get entity(){return npc;},get alive(){return alive();},drawables:()=>npc?[{x:npc.x,y:npc.y,draw}]:[],clear(){npc=null;},get state(){return npc?{...npc,used:[...npc.used],anim:undefined}:null;}};
})();
