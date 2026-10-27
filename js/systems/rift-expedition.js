/* LOT-EST-005 r1 integration. Origin simulation is suspended, never regenerated. */
G.RiftExpedition=(()=>{
 const q=new URLSearchParams(window.location.search),enabled=()=>G.MapTrial?.infinite===true;
 const practice=enabled()&&q.get('ensayo')==='grietas';
 const forcedTier=practice&&/^D[1-5]$/.test(q.get('grado')||'')?q.get('grado'):null;
 let practiceChoice=null;
 let director=null,rng=Math.random,portal=null,room=null,origin=null,map=null,mapNumber=1,serial=0,notice='',noticeTime=0,failures=[];
 const services=['World','Path','EnemyMgr','Projectiles','Pickups','Combat','FX','Spawner','RiftPowers'];
 function seeded(seed){let n=seed>>>0;return()=>((n=(Math.imul(n,1664525)+1013904223)>>>0)/4294967296);}
 function startRun(seed){if(practice)practiceChoice=G.RiftPractice.next();clear();failures=[];rng=practice?seeded(seed^0x5fac194b):Math.random;director=G.RiftDirector.create({rng});G.RiftPowers.startRun();G.RiftCompanion.startRun();serial=0;}
 function announce(text){notice=text;noticeTime=6;G.Audio?.sfx('riftOpen');}
 function locate(player){
  const terminal=G.WeaponTerminal?.state?.point,chests=G.ExplorationChests?.state?.chests||[];
  const points=(map.spawnPoints||[]).filter(p=>Math.hypot(p.x-player.x,p.y-player.y)>=140&&Math.hypot(p.x-player.x,p.y-player.y)<=900&&Math.hypot(p.x-map.exit.x,p.y-map.exit.y)>110&&(!terminal||Math.hypot(p.x-terminal.x,p.y-terminal.y)>100)&&chests.every(c=>Math.hypot(p.x-c.x,p.y-c.y)>100)&&G.World.isFree(p.x,p.y,36)&&G.Path.reachable(p.x,p.y,player));
  return points.length?points[Math.min(points.length-1,Math.floor(rng()*points.length))]:null;
 }
 function open(request,player,mapTime){
  const point=locate(player);if(!point){director.failAppearance(request.id,{reason:'no_reachable_location'});return false;}
  if(!director.confirmAppearance(request.id).ok)return false;
  const tier=practice?(forcedTier||practiceChoice.tier):request.tier;
  const rolledStyle=practice?practiceChoice.style:1+Math.floor(rng()*6),style=practice&&/^[1-6]$/.test(q.get('estilo')||'')?Number(q.get('estilo')):rolledStyle;
  portal={id:request.id,status:'open',tier,x:point.x,y:point.y,remaining:Math.max(0,45-(mapTime-request.atSeconds)),style,sector:mapNumber,label:`${tier} · GRIETA · 45 s`};
  const bioId=G.RiftAnomalies.catalog.find(c=>c.tier===tier)?.id;if(bioId)G.RiftRooms.preloadById(bioId);
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
  origin={position:{x:player.x,y:player.y,_px:player._px,_py:player._py,_vx:player._vx,_vy:player._vy},camera:{x:G.Camera.x,y:G.Camera.y,shake:G.Camera.shake,_sx:G.Camera._sx,_sy:G.Camera._sy,sceneView:G.Camera.sceneView},tokens:{},companion:G.RiftCompanion.captureTransfer?.()};
  for(const name of services)origin.tokens[name]=G[name].suspend();
  portal.status='consumed';notice='';noticeTime=0;const bioId=G.RiftAnomalies.catalog.find(c=>c.tier===portal.tier).id;
  G.RiftRooms.preloadById(bioId);const geometry=G.RiftRooms.generate(bioId);
  G.RiftRooms.preload(geometry);G.World.reset((serial+1)^0x71f1);G.World.setFixture(geometry.fixture);G.World.setBiome(1,true);G.Camera.setSceneView(geometry.fixture.sceneRevision);
  player.x=geometry.entry.x;player.y=geometry.entry.y;player._px=player.x;player._py=player.y;player._vx=player._vy=0;
  G.Camera.x=player.x;G.Camera.y=player.y;G.Camera.shake=0;G.Camera._sx=G.Camera._sy=0;
  G.Camera.setRoomBounds(geometry.bounds);
  G.Path.update(1,[player]);
  const id=`${portal.id}:encounter:${++serial}`,session=G.RiftSession.create(id),boss=G.EnemyMgr.add(G.RiftAnomalies.create({tier:portal.tier,geometry,mapNumber}));
  room={id,geometry,session,boss,style:portal.style,reward:null,warningShown:false,escapeShown:false,outcome:null,loadingWait:0,loadNoticeShown:false};G.RiftAnomalies.retryFailed(boss.bioId);
  const npcRng=practice&&['si','no'].includes(q.get('apoyo'))?(()=>{let first=true;return()=>{if(first){first=false;return q.get('apoyo')==='si'?0:.99;}return rng();};})():rng;
  G.RiftCompanion.enterRoom({tier:portal.tier,rng:npcRng,geometry,player,appearance:practice?q.get('companera'):undefined});G.Audio?.sfx('rift');return true;
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
  if(!room||!origin||!['victory','escaped','technical_failure'].includes(outcome))return false;
  if(outcome==='victory'&&(!room.session.state.claimed||G.RiftPowers.state.pending))return false;
  if(outcome==='escaped'&&!room.session.escape())return false;
  if(outcome==='technical_failure')G.RiftCompanion.restoreTransfer?.(origin.companion);for(const name of services)G[name].resume(origin.tokens[name]);
  // A replaced power cannot leave active projectiles in the suspended origin.
  const equipped=new Set(G.RiftPowers.state.owned.map(p=>p.id)),shots=G.Projectiles.all();
  for(let i=shots.length-1;i>=0;i--)if(shots[i].riftPower&&!equipped.has(shots[i].riftPower))shots.splice(i,1);
  Object.assign(player,origin.position);G.Camera.setRoomBounds(null);Object.assign(G.Camera,origin.camera);G.Camera.setSceneView(origin.camera.sceneView);
  if(outcome!=='technical_failure')G.RiftCompanion.placeNear?.(player);
  room=null;origin=null;notice=outcome==='technical_failure'?'No se pudo cargar la anomalía. Regreso al mapa · sin premio.':outcome==='victory'?'Regreso · victoria dimensional':'Regreso · retirada sin premio';noticeTime=6;return true;
 }
 function updateRoom(dt,player){
  if(!room)return false;if(player.dead||player.hp<=0){room.session.die();G.Expedition.finish('death');return true;}
  if(!Number.isFinite(dt)||dt<=0)return true;
  if(room.session.state.status==='victory'&&G.RiftPowers.state.pending)return true;
  const before=room.session.state.status;
  if(before==='entering'){
   const bio=G.RiftAnomalies.loading(room.boss.bioId),environment=G.RiftRooms.loading(room.geometry),load={ready:bio.ready&&environment.ready,failed:[...bio.failed,...environment.failed],pending:[...bio.pending,...environment.pending]};
   if(!load.ready){room.loadingWait+=dt;
    if(!room.loadNoticeShown&&room.loadingWait>=10){room.loadNoticeShown=true;notice='La sala dimensional sigue cargando…';noticeTime=6;}
    if(load.failed.length||room.loadingWait>=30){failures.push({encounterId:room.id,anomalyId:room.boss.bioId,reason:load.failed.length?'asset_failed':'asset_timeout',assets:(load.failed.length?load.failed:load.pending).slice()});leave(player,'technical_failure');}
    return true;
   }
   if(room.loadNoticeShown){notice='';noticeTime=0;}
  }
  room.session.tick(dt);
  if(before==='entering')return true;
  const rs=room.session.state;
  if(rs.escape==='warning'&&!room.warningShown){room.warningShown=true;announce('Retirada en15s · portal central · durará5s.');}
  if(rs.escape==='open'&&!room.escapeShown){room.escapeShown=true;announce('¡Retirada abierta! Centro del recinto · 5s.');}
  noticeTime=Math.max(0,noticeTime-dt);
  G.InfiniteProgression.tick(dt,player);G.FieldAbilities.tick(dt,player);G.FieldCombat.tick(dt,player,rs.status==='combat');G.RiftPowers.tick(dt,player);
  player.update(dt);G.Camera.follow(player.x,player.y,dt);G.World.update(dt,G.Camera);G.Path.update(dt,[player]);
  G.EnemyMgr.update(dt,[player]);G.Projectiles.update(dt,player,G.EnemyMgr.all());G.Combat.resolve(dt,player,rs.time);
  G.RiftCompanion.update(dt,player,{boss:room.boss,roomTime:rs.time,escapeSoon:['warning','open'].includes(rs.escape),roomContext:room.geometry.tags});
  G.RiftCompanion.receiveDamage?.();
  G.FX.update(dt);
  if(player.dead||player.hp<=0){room.session.die();G.Expedition.finish('death');return true;}
  if(room.boss.dead&&room.session.win()){
   G.Projectiles.clear();room.boss.zones=[];room.reward=G.RiftPowers.victory(room.id,player,{rng,anomalyId:room.boss.bioId});
   if(!G.RiftPowers.state.pending){room.session.claim();room.reward=null;}announce(G.RiftPowers.state.pending?'Anomalía neutralizada · elige tu poder y vuelve por el portal central.':'Victoria · sin poder esta vez · vuelve por el portal central.');
  }
  if(Math.hypot(player.x-room.geometry.escape.x,player.y-room.geometry.escape.y)<=22+player.r){
   if(room.session.state.status==='victory')leave(player,'victory');else if(room.session.state.escape==='open')leave(player,'escaped');
  }
  return true;
 }
 function drawGround(ctx){
  if(!room){if(portal?.status==='open')drawPortal(ctx,portal,undefined,portal.style,'ground');return;}
  G.RiftRooms.drawGround(ctx,room.geometry,room.session.state.time,G.Settings.get('calm'));
  room.boss.drawGround(ctx);const s=room.session.state;if(s.status==='victory'||['warning','open'].includes(s.escape))drawPortal(ctx,exitPortal(),s.time,room.style,'ground');
 }
 function drawPortal(ctx,state,time,style,layer){
  if(G.RiftVisuals.draw(ctx,state,time,style,layer))return;
  // The historical classic comparison still needs a visible entry/exit marker.
  if(layer==='ground')return;ctx.save();ctx.strokeStyle='#ed637b';ctx.fillStyle='#08090ddc';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(state.x,state.y-12,24,40,0,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.fillStyle='#fff0de';ctx.font='bold 12px monospace';ctx.textAlign='center';ctx.fillText(state.label||'GRIETA',state.x,state.y-60);ctx.restore();
 }
 function exitPortal(){const s=room.session.state;return{...room.geometry.escape,status:s.status==='victory'||s.escape==='open'?'open':'active',remaining:s.escapeRemaining,label:s.status==='victory'?'REGRESO · VICTORIA':s.escape==='open'?`RETIRADA · ${Math.ceil(s.escapeRemaining)} s`:'RETIRADA · PRONTO',style:room.style};}
 function drawables(){
  if(!room){const items=G.RiftCompanion.drawables();if(portal?.status==='open')items.push({x:portal.x,y:portal.y+35,draw:ctx=>drawPortal(ctx,portal,undefined,portal.style,'body')});return items;}
  const s=room.session.state,items=[...G.RiftRooms.drawables(room.geometry,G.Game.player),...G.RiftCompanion.drawables()];if(s.status==='victory'||['warning','open'].includes(s.escape))items.push({y:room.geometry.escape.y+35,draw:ctx=>drawPortal(ctx,exitPortal(),s.time,room.style,'body')});return items;
 }
 function drawOverlay(ctx){if(!room){G.RiftCompanion.drawBubble(ctx,{priority:(G.MapTrial?.alertTime||0)>0});return;}const s=room.session.state;G.RiftRooms.drawAtmosphere(ctx,room.geometry,s.time,G.Settings.get('calm'));G.RiftCompanion.drawBubble(ctx,{priority:['warning','open'].includes(s.escape)||['windup','attack'].includes(room.boss.phase)});}
 function drawScreen(ctx,w,h){
  if(!room||room.session.state.status!=='entering')return;
  const s=room.session.state;ctx.save();ctx.fillStyle='rgba(5,5,11,.87)';ctx.fillRect(0,0,w,h);ctx.translate(w/2,h/2);ctx.scale(2.2,2.2);
  drawPortal(ctx,{x:0,y:0,status:'active',label:'CRUCE DIMENSIONAL'},.5-s.transition,room.style,'all');ctx.restore();
 }
 function clear(){if(room){G.EnemyMgr.clear();G.Projectiles.clear();G.Pickups.clear();G.Combat.clearFields();G.FX.clear();G.Path.clear();}G.Camera.setRoomBounds(null);room=null;origin=null;portal=null;map=null;notice='';noticeTime=0;G.RiftCompanion?.clear();G.RiftPowers?.clear();}
 function state(){return{enabled:enabled(),practice,portal:portal?{...portal}:null,director:director?.getState(),notice:noticeTime>0?notice:'',technicalFailures:failures.map(f=>({...f})),active:!!room,...(room?{...room.session.state,loadingWait:room.loadingWait,tier:room.boss.profile.tier,anomalyId:room.boss.bioId,name:room.boss.name,roomName:room.geometry.name,bossHp:Math.max(0,room.boss.hp),bossMaxHp:room.boss.maxHp,exit:{...room.geometry.escape},reward:G.RiftPowers.state.pending,originFrozen:true}: {})};}
 return{startRun,startMap,updateOrigin,checkContact,updateRoom,drawGround,drawables,drawOverlay,drawScreen,chooseReward,rejectReward,leave,clear,practice,get state(){return state();}};
})();
