/* V2 local trial: isolated from accounts and version1 checkpoints. Provisional art/tuning. */
G.MapTrial=(()=>{
 const q=new URLSearchParams(window.location.search);
 const enabled=['localhost','127.0.0.1','[::1]'].includes(window.location.hostname)&&q.get('prueba')==='mapa-v2'&&!q.has('cuentas');
 const quick=enabled&&q.get('rapida')==='1';
 const RANGE=440,INTERVAL=.65,DAMAGE=9;
 let geometry=null,team=[],arrived=false,alertTime=0;
 function clearLine(ax,ay,bx,by){
  const distance=Math.hypot(bx-ax,by-ay);
  for(let n=8;n<distance;n+=8)if(G.World.projectileBlock?.(ax+(bx-ax)*n/distance,ay+(by-ay)*n/distance,2))return false;
  return true;
 }
 function reset(map){geometry=map;team=[];arrived=false;alertTime=0;}
 function arrive(){
  if(!enabled||arrived||!geometry)return;
  arrived=true;alertTime=7;const exit=geometry.exit;
  const positions=[[-36,24],[36,24],[-36,-24],[36,-24],[0,36],[0,-36]]
   .map(([dx,dy])=>({x:exit.x+dx,y:exit.y+dy}))
   .filter(p=>G.World.isFree(p.x,p.y,12)&&clearLine(exit.x,exit.y,p.x,p.y)&&
    (!G.Game?.player||!G.Path?.reachable||G.Path.reachable(p.x,p.y,G.Game.player)));
  for(let i=0;i<2;i++){
   const target=positions[i]||exit;
   const anim=G.Sprites?.Animator?new G.Sprites.Animator(G.Content.guard.dex,1,false):null;
   team.push({x:exit.x,y:exit.y,tx:target.x,ty:target.y,anim,wait:i*.15,flash:0,aim:-Math.PI/2,shot:null});
  }
  G.Audio?.sfx('rift');
 }
 function updateAllies(dt,player){
  if(!enabled||!arrived||!Number.isFinite(dt)||dt<=0)return;
  alertTime=Math.max(0,alertTime-dt);
  for(const ally of team){
   ally.flash=Math.max(0,ally.flash-dt);ally.wait=Math.max(0,ally.wait-dt);
   const dx=ally.tx-ally.x,dy=ally.ty-ally.y,distance=Math.hypot(dx,dy);
   if(distance>1){const step=Math.min(distance,72*dt);ally.x+=dx/distance*step;ally.y+=dy/distance*step;}
   ally.anim?.update(dt);ally.anim?.loop(distance>1?'Walk':'Idle');
   if(ally.wait>0)continue;
   const target=G.EnemyMgr.all().filter(e=>!e.dead&&e.hp>0&&Math.hypot(e.x-ally.x,e.y-ally.y)<=RANGE&&clearLine(ally.x,ally.y,e.x,e.y))
    .sort((a,b)=>Math.hypot(a.x-ally.x,a.y-ally.y)-Math.hypot(b.x-ally.x,b.y-ally.y))[0];
   if(!target||typeof target.hurt!=='function')continue;
   ally.aim=Math.atan2(target.y-ally.y,target.x-ally.x);
   if(ally.anim)ally.anim.dir=G.Sprites.dirFromAngle(ally.aim);
   ally.shot={x:target.x,y:target.y};ally.wait=INTERVAL;ally.flash=.09;
   G.Audio?.sfx('shot');
   target.hurt(DAMAGE,'#e2f1e8',target.x-ally.x,target.y-ally.y,0);
   // EnemyMgr accounts for every death once when removing it, including allied shots.
  }
 }
 function draw(ctx,state){
  if(!enabled||!geometry||!state?.v2?.doorOpen)return;
  const {x,y}=geometry.exit,unlocked=state.v2.bossDefeated;
  ctx.save();ctx.strokeStyle=unlocked?'#dbece4':'#ec5361';ctx.fillStyle='#080d13aa';ctx.lineWidth=3;
  ctx.beginPath();ctx.ellipse(x,y,42,48,0,0,Math.PI*2);ctx.fill();ctx.stroke();
  ctx.fillStyle='#172125';ctx.fillRect(x-24,y-36,48,66);ctx.strokeRect(x-24,y-36,48,66);
  ctx.fillStyle='#35434a';ctx.fillRect(x-18,y-30,15,54);ctx.fillRect(x+3,y-30,15,54);
  ctx.fillStyle=unlocked?'#b9eed0':'#e54b5b';ctx.fillRect(x-3,y-25,6,42);
  ctx.fillStyle='#f0eee4';ctx.font='bold 12px system-ui';ctx.textAlign='center';
  ctx.fillText('FUNDACIÓN',x,y-64);ctx.fillText(unlocked?'CRUZA PARA AVANZAR':'DERROTA AL JEFE',x,y-49);
  ctx.restore();
 }
 function drawAlly(ctx,ally){
   ctx.save();ctx.textAlign='center';
   G.Sprites?.drawShadow(ctx,G.Content.guard.dex,ally.x,ally.y);
   ally.anim?.draw(ctx,ally.x,ally.y);
   ctx.strokeStyle='#d6eee0';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(ally.x,ally.y-11);
   ctx.lineTo(ally.x+Math.cos(ally.aim)*20,ally.y-11+Math.sin(ally.aim)*20);ctx.stroke();
   if(ally.flash>0&&ally.shot){ctx.strokeStyle='#fff2af';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(ally.x,ally.y-11);ctx.lineTo(ally.shot.x,ally.shot.y-10);ctx.stroke();}
   ctx.fillStyle='#d9efe3';ctx.font='9px system-ui';ctx.fillText('ALIADO',ally.x,ally.y-35);
   ctx.restore();
 }
 return{enabled,quick,duration:300,bossAt:240,startTime:quick?270:0,reset,arrive,updateAllies,draw,
  drawables:()=>enabled&&arrived?team.map(a=>({x:a.x,y:a.y,draw:ctx=>drawAlly(ctx,a)})):[],
  get allies(){return team.map(a=>({x:a.x,y:a.y}));},get alertTime(){return alertTime;}};
})();
