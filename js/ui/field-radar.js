/* Fixed north sensor for the expanded demo. Hidden chests never enter markers. */
G.FieldRadar=(()=>{
 const RANGE=900,CENTER=56,RADIUS=44;
 const enabled=()=>G.MapTrial?.expanded===true;
 const valid=p=>p&&Number.isFinite(p.x)&&Number.isFinite(p.y);
 function markers(player,state){
  if(!enabled()||!valid(player))return[];
  const list=[];
  const add=(type,p,priority)=>{
   if(!valid(p))return;const dx=p.x-player.x,dy=p.y-player.y,distance=Math.hypot(dx,dy),scale=Math.max(RANGE,distance);
   list.push({type,x:dx/scale,y:dy/scale,distance,edge:distance>RANGE,priority});
  };
  const enemies=(G.EnemyMgr?.all?.()||[]).filter(e=>valid(e)&&!e.dead&&e.hp>0);
  for(const e of enemies.filter(e=>!e.boss&&!e.elite&&Math.hypot(e.x-player.x,e.y-player.y)<=RANGE)
   .sort((a,b)=>Math.hypot(a.x-player.x,a.y-player.y)-Math.hypot(b.x-player.x,b.y-player.y)).slice(0,8))add('enemy',e,Math.hypot(e.x-player.x,e.y-player.y)<=100?0:5);
  const boss=enemies.find(e=>e.boss&&!e.dimensional);if(boss)add('boss',boss,2);
  const dimension=G.RiftExpedition?.state;
  if(dimension?.active){
   const anomaly=enemies.find(e=>e.dimensional);if(anomaly)add('boss',anomaly,2);
   if(dimension.status==='victory'||['warning','open'].includes(dimension.escape))add('rift',dimension.exit,1);
   return list.sort((a,b)=>a.priority-b.priority||a.distance-b.distance).slice(0,16);
  }
  const current=dimension?.portal;if(current?.status==='open')add('rift',current,current.remaining<=10?1:3);
  const elite=state?.v2?.elite;if(elite&&!elite.dead&&elite.hp>0)add('elite',elite,2);
  if(state?.v2?.doorOpen)add('door',state.exit,3);
  const terminal=G.WeaponTerminal?.state;if(terminal?.available)add('terminal',terminal.point,3);
  const rift=G.DimensionalRifts?.state;if(rift?.status==='open'&&rift.remaining>0)add('rift',rift,rift.remaining<=10?1:3);
  for(const chest of G.ExplorationChests?.state?.chests||[])if(chest.discovered&&!chest.opened)add('chest',chest,5);
  return list.sort((a,b)=>a.priority-b.priority||a.distance-b.distance).slice(0,16);
 }
 function draw(ctx,player,state){
  ctx.clearRect(0,0,112,112);if(!enabled())return;
  ctx.save();ctx.fillStyle='#151115e8';ctx.strokeStyle='#b89da5';ctx.lineWidth=1;
  ctx.beginPath();ctx.arc(CENTER,CENTER,RADIUS,0,Math.PI*2);ctx.fill();ctx.stroke();
  ctx.strokeStyle='#58414b';ctx.beginPath();ctx.moveTo(CENTER-RADIUS,CENTER);ctx.lineTo(CENTER+RADIUS,CENTER);ctx.moveTo(CENTER,CENTER-RADIUS);ctx.lineTo(CENTER,CENTER+RADIUS);ctx.stroke();
  ctx.fillStyle='#fff0f3';ctx.font='bold 9px monospace';ctx.textAlign='center';ctx.fillText('N',CENTER,9);
  // Lower urgency first: danger is drawn last and stays visible above other marks.
  for(const mark of markers(player,state).reverse()){
   const x=CENTER+mark.x*RADIUS,y=CENTER+mark.y*RADIUS;ctx.fillStyle=mark.type==='enemy'||mark.type==='boss'||mark.type==='elite'?'#f25564':'#fff0f3';ctx.strokeStyle=ctx.fillStyle;ctx.lineWidth=1.5;
   if(mark.type==='enemy'){ctx.beginPath();ctx.arc(x,y,mark.priority===0?3:2,0,Math.PI*2);ctx.fill();}
   else if(mark.type==='boss'||mark.type==='elite'){ctx.beginPath();ctx.moveTo(x,y-5);ctx.lineTo(x+4,y+4);ctx.lineTo(x-4,y+4);ctx.closePath();ctx.fill();}
   else if(mark.type==='door')ctx.strokeRect(x-3,y-3,6,6);
   else if(mark.type==='terminal'){ctx.fillStyle='#ed6472';ctx.fillRect(x-5,y-5,10,10);ctx.fillStyle='#151115';ctx.font='bold 9px monospace';ctx.fillText('T',x,y+3);}
   else if(mark.type==='chest'){ctx.beginPath();ctx.moveTo(x,y-4);ctx.lineTo(x+4,y);ctx.lineTo(x,y+4);ctx.lineTo(x-4,y);ctx.closePath();ctx.stroke();}
   else{ctx.strokeStyle='#ed6472';ctx.beginPath();ctx.arc(x,y,4,0,Math.PI*2);ctx.stroke();ctx.fillStyle='#ed6472';ctx.fillRect(x-1,y-2,2,4);}
  }
  ctx.fillStyle='#fff0f3';ctx.fillRect(CENTER-2,CENTER-2,4,4);ctx.restore();
 }
 return{markers,draw};
})();
