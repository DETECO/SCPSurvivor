/* LOT-EST-005 r1 integration. Origin simulation is suspended, never regenerated. */
G.RiftExpedition=(()=>{
 const q=new URLSearchParams(window.location.search),enabled=()=>G.MapTrial?.infinite===true;
 const practice=enabled()&&q.get('ensayo')==='grietas';
 const practiceTier=practice&&/^D[1-5]$/.test(q.get('grado')||'')?q.get('grado'):'D1';
 let director=null,rng=Math.random,portal=null,room=null,origin=null,map=null,mapNumber=1,serial=0,notice='',noticeTime=0;
 const services=['World','Path','EnemyMgr','Projectiles','Pickups','Combat','FX','Spawner','RiftPowers'];
 function seeded(seed){let n=seed>>>0;return()=>((n=(Math.imul(n,1664525)+1013904223)>>>0)/4294967296);}
 function startRun(seed){clear();rng=practice?seeded(seed^0x5fac194b):Math.random;director=G.RiftDirector.create({rng});G.RiftPowers.startRun();G.RiftCompanion.startRun();serial=0;}
 function announce(text){notice=text;noticeTime=6;G.Audio?.sfx('riftOpen');}
 function locate(player){
  const terminal=G.WeaponTerminal?.state?.point,chests=G.ExplorationChests?.state?.chests||[];
  const points=(map.spawnPoints||[]).filter(p=>Math.hypot(p.x-player.x,p.y-player.y)>=140&&Math.hypot(p.x-player.x,p.y-player.y)<=900&&Math.hypot(p.x-map.exit.x,p.y-map.exit.y)>110&&(!terminal||Math.hypot(p.x-terminal.x,p.y-terminal.y)>100)&&chests.every(c=>Math.hypot(p.x-c.x,p.y-c.y)>100)&&G.World.isFree(p.x,p.y,36)&&G.Path.reachable(p.x,p.y,player));
  return points.length?points[Math.min(points.length-1,Math.floor(rng()*points.length))]:null;
 }
 function open(request,player,mapTime){
  const point=locate(player);if(!point){director.failAppearance(request.id,{reason:'no_reachable_location'});return false;}
  if(!director.confirmAppearance(request.id).ok)return false;
  const tier=practice?practiceTier:request.tier;
  const rolledStyle=1+Math.floor(rng()*6),style=practice&&/^[1-6]$/.test(q.get('estilo')||'')?Number(q.get('estilo')):rolledStyle;
  portal={id:request.id,status:'open',tier,x:point.x,y:point.y,remaining:Math.max(0,45-(mapTime-request.atSeconds)),style,sector:mapNumber,label:`${tier} · GRIETA · 45 s`};
  announce(`${practice?'PRÁCTICA · ':''}${tier} · Grieta dimensional abierta. Entra caminando · 45s.`);return true;
 }
 function startMap(geometry,number,seed,player){
  if(!enabled())return;map=geometry;mapNumber=number;portal=null;notice='';noticeTime=0;
  director.startMap(`${seed}:${number}`,number);
  if(practice&&number===2){
   // Explicit practice only: a separate deterministic director to guarantee the exercise.
   director=G.RiftDirector.create({rng:()=>0});director.startMap(`${seed}:${number}:QA`,number);
   const request=director.advanceTo(60).find(o=>o.outcome==='request')?.request;if(request)open(request,player,60);
  }
 }
 function enter(player){
  if(!portal||portal.status!=='open'||room||player.dead)return false;
  origin={position:{x:player.x,y:player.y,_px:player._px,_py:player._py,_vx:player._vx,_vy:player._vy},camera:{x:G.Camera.x,y:G.Camera.y,shake:G.Camera.shake,_sx:G.Camera._sx,_sy:G.Camera._sy,sceneView:G.Camera.sceneView},tokens:{}};
  for(const name of services)origin.tokens[name]=G[name].suspend();
  portal.status='consumed';notice='';noticeTime=0;const geometry=G.RiftRooms.generate(G.RiftAnomalies.catalog.find(c=>c.tier===portal.tier).id);
  G.World.reset((serial+1)^0x71f1);G.World.setFixture(geometry.fixture);G.World.setBiome(1,true);G.Camera.setSceneView(geometry.fixture.sceneRevision);
  player.x=geometry.entry.x;player.y=geometry.entry.y;player._px=player.x;player._py=player.y;player._vx=player._vy=0;
  G.Camera.x=player.x;G.Camera.y=player.y;G.Camera.shake=0;G.Camera._sx=G.Camera._sy=0;
  G.Path.update(1,[player]);
  const id=`${portal.id}:encounter:${++serial}`,session=G.RiftSession.create(id),boss=G.EnemyMgr.add(G.RiftAnomalies.create({tier:portal.tier,geometry}));
  room={id,geometry,session,boss,style:portal.style,reward:null,warningShown:false,escapeShown:false,outcome:null};
  const npcRng=practice&&['si','no'].includes(q.get('apoyo'))?(()=>{let first=true;return()=>{if(first){first=false;return q.get('apoyo')==='si'?0:.99;}return rng();};})():rng;
  G.RiftCompanion.create({tier:portal.tier,rng:npcRng,geometry,player});G.Audio?.sfx('rift');return true;
 }
 function updateOrigin(dt,mapTime,player){
  if(!enabled()||room||!director)return false;noticeTime=Math.max(0,noticeTime-dt);
  if(portal?.status==='open'){portal.remaining=Math.max(0,portal.remaining-dt);portal.label=`${portal.tier} · GRIETA · ${Math.ceil(portal.remaining)} s`;if(portal.remaining<=0)portal.status='expired';}
  if(mapTime>=director.getState().activeSeconds)for(const o of director.advanceTo(mapTime))if(o.outcome==='request')open(o.request,player,mapTime);
  if(portal?.status==='open'&&Math.hypot(player.x-portal.x,player.y-portal.y)<=22+player.r)return enter(player);
  return false;
 }
 function checkContact(dt,mapTime,player){
  if(!enabled()||room||portal?.status!=='open'||portal.remaining<=dt||Math.hypot(player.x-portal.x,player.y-portal.y)>22+player.r)return false;
  return updateOrigin(dt,mapTime,player);
 }
 function chooseReward(id,replaceId){if(!room||room.session.state.status!=='victory')return{accepted:false};const result=G.RiftPowers.choose(id,G.Game.player,{replaceId});if(result.accepted){room.session.claim();room.reward=null;}return result;}
 function rejectReward(){if(!room||!G.RiftPowers.reject())return false;room.session.claim();room.reward=null;return true;}
 function leave(player,outcome){
  if(!room||!origin||!['victory','escaped'].includes(outcome))return false;
  if(outcome==='victory'&&(!room.session.state.claimed||G.RiftPowers.state.pending))return false;
  if(outcome==='escaped'&&!room.session.escape())return false;
  G.RiftCompanion.clear();for(const name of services)G[name].resume(origin.tokens[name]);
  // A replaced power cannot leave active projectiles in the suspended origin.
  const equipped=new Set(G.RiftPowers.state.owned.map(p=>p.id)),shots=G.Projectiles.all();
  for(let i=shots.length-1;i>=0;i--)if(shots[i].riftPower&&!equipped.has(shots[i].riftPower))shots.splice(i,1);
  Object.assign(player,origin.position);Object.assign(G.Camera,origin.camera);G.Camera.setSceneView(origin.camera.sceneView);
  room=null;origin=null;notice=outcome==='victory'?'Regreso · victoria dimensional':'Regreso · retirada sin premio';noticeTime=4;return true;
 }
 function updateRoom(dt,player){
  if(!room)return false;if(player.dead||player.hp<=0){room.session.die();G.Expedition.finish('death');return true;}
  if(!Number.isFinite(dt)||dt<=0)return true;
  if(room.session.state.status==='victory'&&G.RiftPowers.state.pending)return true;
  const before=room.session.state.status;if(before==='entering'&&!G.RiftAnomalies.ready(room.boss.bioId))return true;room.session.tick(dt);
  if(before==='entering')return true;
  const rs=room.session.state;
  if(rs.escape==='warning'&&!room.warningShown){room.warningShown=true;announce('Retirada en15s · portal central · durará5s.');}
  if(rs.escape==='open'&&!room.escapeShown){room.escapeShown=true;announce('¡Retirada abierta! Centro del recinto · 5s.');}
  noticeTime=Math.max(0,noticeTime-dt);
  G.InfiniteProgression.tick(dt,player);G.FieldAbilities.tick(dt,player);G.FieldCombat.tick(dt,player,rs.status==='combat');G.RiftPowers.tick(dt,player);
  player.update(dt);G.Camera.follow(player.x,player.y,dt);G.World.update(dt,G.Camera);G.Path.update(dt,[player]);
  G.EnemyMgr.update(dt,[player]);G.Projectiles.update(dt,player,G.EnemyMgr.all());G.Combat.resolve(dt,player,rs.time);
  G.RiftCompanion.update(dt,player,{boss:room.boss,roomTime:rs.time,escapeSoon:['warning','open'].includes(rs.escape),roomContext:room.geometry.tags});
  const ally=G.RiftCompanion.state;if(ally&&!ally.incapacitated){
   const bio=room.boss,body={...ally,r:12};
   if(bio.pattern==='jump'){if(bio.landedThisFrame&&bio.lastLanding.some(z=>G.RiftAnomalies.contains(z,body)))G.RiftCompanion.hurt(bio.dmg);}
   else if(bio.pattern==='dash'){if(bio.phase==='attack'&&Math.hypot(bio.x-ally.x,bio.y-ally.y)<=bio.r+12)G.RiftCompanion.hurt(bio.dmg);}
   else for(const z of bio.zones)if(bio.phase==='attack'&&bio.attackElapsed>=z.delay&&bio.attackElapsed<=z.delay+z.life&&G.RiftAnomalies.contains(z,body))G.RiftCompanion.hurt(bio.dmg);
   const projectiles=G.Projectiles.all();for(let i=projectiles.length-1;i>=0;i--){const p=projectiles[i];if(!p.friendly&&Math.hypot(p.x-ally.x,p.y-ally.y)<p.r+12){G.RiftCompanion.hurt(p.dmg);projectiles.splice(i,1);}}
  }
  G.FX.update(dt);
  if(player.dead||player.hp<=0){room.session.die();G.Expedition.finish('death');return true;}
  if(room.boss.dead&&room.session.win()){
   G.Projectiles.clear();room.boss.zones=[];room.reward=G.RiftPowers.victory(room.id,player,{rng,anomalyId:room.boss.bioId});
   if(!G.RiftPowers.state.pending){room.session.claim();room.reward=null;}announce('Anomalía neutralizada · elige tu poder y vuelve por el portal central.');
  }
  if(Math.hypot(player.x-room.geometry.escape.x,player.y-room.geometry.escape.y)<=22+player.r){
   if(room.session.state.status==='victory')leave(player,'victory');else if(room.session.state.escape==='open')leave(player,'escaped');
  }
  return true;
 }
 function drawGround(ctx){
  if(!room){if(portal?.status==='open')drawPortal(ctx,portal,undefined,portal.style,'ground');return;}
  const g=room.geometry;ctx.save();ctx.fillStyle=g.color+'48';ctx.fillRect(g.bounds.left,g.bounds.top,g.bounds.right-g.bounds.left,g.bounds.bottom-g.bounds.top);
  ctx.strokeStyle=g.color;ctx.lineWidth=2;for(let i=-3;i<=3;i++){ctx.beginPath();ctx.ellipse(16,16,80+i*12+40,50+i*8+30,0,0,Math.PI*2);ctx.stroke();}ctx.restore();
  room.boss.drawGround(ctx);const s=room.session.state;if(s.status==='victory'||['warning','open'].includes(s.escape))drawPortal(ctx,exitPortal(),s.time,room.style,'ground');
 }
 function drawPortal(ctx,state,time,style,layer){
  if(G.RiftVisuals.draw(ctx,state,time,style,layer))return;
  // The historical classic comparison still needs a visible entry/exit marker.
  if(layer==='ground')return;ctx.save();ctx.strokeStyle='#ed637b';ctx.fillStyle='#08090ddc';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(state.x,state.y-12,24,40,0,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.fillStyle='#fff0de';ctx.font='bold 12px monospace';ctx.textAlign='center';ctx.fillText(state.label||'GRIETA',state.x,state.y-60);ctx.restore();
 }
 function exitPortal(){const s=room.session.state;return{...room.geometry.escape,status:s.status==='victory'||s.escape==='open'?'open':'active',remaining:s.escapeRemaining,label:s.status==='victory'?'REGRESO · VICTORIA':s.escape==='open'?`RETIRADA · ${Math.ceil(s.escapeRemaining)} s`:'RETIRADA · PRONTO',style:room.style};}
 function drawables(){
  if(!room)return portal?.status==='open'?[{x:portal.x,y:portal.y+35,draw:ctx=>drawPortal(ctx,portal,undefined,portal.style,'body')}]:[];
  const s=room.session.state,items=G.RiftCompanion.drawables();if(s.status==='victory'||['warning','open'].includes(s.escape))items.push({y:room.geometry.escape.y+35,draw:ctx=>drawPortal(ctx,exitPortal(),s.time,room.style,'body')});return items;
 }
 function drawOverlay(ctx){if(!room)return;const s=room.session.state;G.RiftCompanion.drawBubble(ctx,{priority:['warning','open'].includes(s.escape)||['windup','attack'].includes(room.boss.phase)});}
 function drawScreen(ctx,w,h){
  if(!room||room.session.state.status!=='entering')return;
  const s=room.session.state;ctx.save();ctx.fillStyle='rgba(5,5,11,.87)';ctx.fillRect(0,0,w,h);ctx.translate(w/2,h/2);ctx.scale(2.2,2.2);
  drawPortal(ctx,{x:0,y:0,status:'active',label:'CRUCE DIMENSIONAL'},.5-s.transition,room.style,'all');ctx.restore();
 }
 function clear(){if(room){G.EnemyMgr.clear();G.Projectiles.clear();G.Pickups.clear();G.Combat.clearFields();G.FX.clear();G.Path.clear();}room=null;origin=null;portal=null;map=null;notice='';noticeTime=0;G.RiftCompanion?.clear();G.RiftPowers?.clear();}
 function state(){return{enabled:enabled(),practice,portal:portal?{...portal}:null,director:director?.getState(),notice:noticeTime>0?notice:'',active:!!room,...(room?{...room.session.state,tier:room.boss.profile.tier,anomalyId:room.boss.bioId,name:room.boss.name,roomName:room.geometry.name,bossHp:Math.max(0,room.boss.hp),bossMaxHp:room.boss.maxHp,exit:{...room.geometry.escape},reward:G.RiftPowers.state.pending,originFrozen:true}: {})};}
 return{startRun,startMap,updateOrigin,checkContact,updateRoom,drawGround,drawables,drawOverlay,drawScreen,chooseReward,rejectReward,leave,clear,practice,get state(){return state();}};
})();
