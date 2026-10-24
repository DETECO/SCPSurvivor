/* One temporary companion. Service AF01 tier profiles/names/cadence: ENSAYO-GRI-001 r1. */
G.RiftCompanion=(()=>{
 const equipment={Normal:{ammo:20,damage:5,interval:.8},Rara:{ammo:24,damage:6,interval:.75},'Épica':{ammo:28,damage:7,interval:.7},Legendaria:{ammo:32,damage:8,interval:.65}};
 const names=['Gabriel','Tomás','Mateo','Nicolás','Diego','Martín','Andrés','Sebastián','Daniel','Lucas','Samuel','Joaquín','Rafael','Benjamín','Felipe','Manuel','Vicente','Rodrigo','Esteban'];let npc=null,usedNames=new Set();
 function line(code,player){
  if(!npc)return'';const bank=G.RiftDialogueData.bank[npc.personality];let text=code==='presentation'?G.RiftDialogueData.presentations?.[npc.presentationId]:bank?.[code];if(!text)return'';
  if(text.includes('{nombre_jugador}')&&!player?.alias)text=G.RiftDialogueData.withoutAlias[npc.personality]||'';
  const weapon=player?.fieldWeapons?.[0],name=weapon?G.FieldCatalog?.models?.[weapon.model]?.name:null;
  if(text.includes('{arma_jugador}')&&!name)return'';
  text=text.replaceAll('{nombre_npc}',npc.name).replaceAll('{arma_npc}',npc.weapon.name).replaceAll('{arma_jugador}',name||'').replaceAll('{nombre_jugador}',player?.alias||'');return text.includes('{')?'':text;
 }
 function speak(code,player){if(!npc||npc.used.has(code))return false;const text=line(code,player);if(!text)return false;npc.used.add(code);npc.bubble=text;npc.bubbleTime=5;npc.lastCode=code;return true;}
 function create({tier,rng=Math.random,geometry,player}){
  npc=null;if(rng()>=(tier==='D5'?.1:.33))return null;
  const rarity=tier==='D5'?'Legendaria':tier==='D4'?(rng()<.5?'Rara':'Épica'):'Normal',gear=equipment[rarity];
  const personalities=Object.keys(G.RiftDialogueData.bank),personality=personalities[Math.min(personalities.length-1,Math.floor(rng()*personalities.length))];
  const available=names.filter(n=>!usedNames.has(n)&&n!==player?.alias),pool=available.length?available:names;const name=pool[Math.min(pool.length-1,Math.floor(rng()*pool.length))],entry=geometry.entry;usedNames.add(name);
  const presIndex=['SARC','ENOJ','ENTU','CARI','SIMP','SERE','NERV','ANAL'].indexOf(personality);
  npc={name,personality,tier,rarity,r:12,biography:'generic-home',homeUsed:false,presentationId:tier==='D5'?'PRES-09':presIndex>=0?'PRES-0'+(presIndex+1):'PRES-12',weapon:{model:'pistol',name:'Pistola AF01 de apoyo '+rarity,resource:'AF01',...gear},ammo:gear.ammo,hp:45,maxHp:45,incapacitated:false,x:entry.x+40,y:entry.y,tx:entry.x+40,ty:entry.y,aim:0,wait:1,flash:0,invuln:0,age:0,bubble:'',bubbleTime:0,used:new Set(),observedShots:G.FieldCombat?.state?.shots||0,anim:new G.Sprites.Animator('support01',1,false)};
  if(!speak('presentation',player))speak(tier==='D5'?'13':'01',player);return npc;
 }
 function clearLine(ax,ay,bx,by){const distance=Math.hypot(bx-ax,by-ay);for(let d=8;d<distance;d+=8)if(G.World.projectileBlock(ax+(bx-ax)*d/distance,ay+(by-ay)*d/distance,2))return false;return true;}
 function hurt(amount){if(!npc||npc.incapacitated||npc.invuln>0)return;npc.hp=Math.max(0,npc.hp-amount);npc.invuln=.5;if(npc.hp===0){npc.incapacitated=true;npc.bubble='';}}
 function update(dt,player,{boss,escapeSoon=false,roomContext={}}={}){
  if(!npc||!Number.isFinite(dt)||dt<=0)return;
  npc.age+=dt;npc.bubbleTime=Math.max(0,npc.bubbleTime-dt);npc.wait=Math.max(0,npc.wait-dt);npc.invuln=Math.max(0,npc.invuln-dt);npc.flash=Math.max(0,npc.flash-dt);
  if(npc.incapacitated)return;
  const dx=player.x-48-npc.x,dy=player.y-npc.y,d=Math.hypot(dx,dy);npc.tx=player.x-48;npc.ty=player.y;
  if(d>60){npc.x+=dx/d*95*dt;npc.y+=dy/d*95*dt;G.World.collide(npc);}
  npc.anim?.update?.(dt);npc.anim?.loop?.(d>60?'Walk':'Idle');
  if(boss&&!boss.dead&&npc.ammo>0&&npc.wait<=0&&Math.hypot(boss.x-npc.x,boss.y-npc.y)<=320&&clearLine(npc.x,npc.y,boss.x,boss.y)){
   npc.aim=Math.atan2(boss.y-npc.y,boss.x-npc.x);npc.shot={x:boss.x,y:boss.y};npc.wait=npc.weapon.interval;npc.flash=.09;npc.ammo--;
   const damage=Math.min(npc.weapon.damage,Math.max(0,boss.hp-1));if(damage>0)boss.hurt(damage,'#f0df8e');
  }
  const priority=escapeSoon||['windup','attack'].includes(boss?.phase);
  if(priority)return;
  if(boss?.dead)speak('15',player);
  else if(player.hp/player.maxHp<.3)speak('10',player);
  else if(npc.ammo===0&&!npc.used.has('11'))speak('11',player);
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
 function draw(ctx){
  if(!npc)return;ctx.save();if(npc.incapacitated)ctx.globalAlpha=.5;
  if(!G.PersonajesArt?.drawAlly(ctx,npc))npc.anim?.draw?.(ctx,npc.x,npc.y);
  ctx.font='bold 10px monospace';ctx.textAlign='center';ctx.fillStyle='#f6e8b8';ctx.fillText(npc.name+(npc.incapacitated?' · INCAPACITADO':` · ${npc.ammo}`),npc.x,npc.y-70);ctx.restore();
 }
 function drawBubble(ctx,{priority=false}={}){
  if(!npc||npc.incapacitated||npc.bubbleTime<=0||!npc.bubble||priority)return;
  ctx.save();ctx.font='12px monospace';const words=npc.bubble.split(' '),lines=[];let line='';for(const word of words){if((line+' '+word).length>30){lines.push(line);line=word;}else line+=(line?' ':'')+word;}if(line)lines.push(line);
  const width=230,height=lines.length*15+14,cam=G.Camera;let x=npc.x-width/2,y=npc.y-88-height;
  if(cam?.left&&cam?.top){const hud=typeof document!=='undefined'?document.getElementById('hud-summary')?.getBoundingClientRect().bottom||0:0;x=Math.max(cam.left()+8/cam.scale,Math.min(x,cam.left()+cam.w-width-8/cam.scale));y=Math.max(cam.top()+(hud+8)/cam.scale,Math.min(y,cam.top()+cam.h-height-84/cam.scale));}
  ctx.fillStyle='#101419ed';ctx.strokeStyle='#eee5ce';ctx.lineWidth=1;ctx.fillRect(x,y,width,height);ctx.strokeRect(x,y,width,height);ctx.fillStyle='#fff1db';ctx.textAlign='left';lines.forEach((s,i)=>ctx.fillText(s,x+8,y+18+i*15));ctx.restore();
 }
 return{startRun(){npc=null;usedNames=new Set();},create,update,hurt,drawBubble,equipment,drawables:()=>npc?[{x:npc.x,y:npc.y,draw}]:[],clear(){npc=null;},get state(){return npc?{...npc,used:[...npc.used],anim:undefined}:null;}};
})();
