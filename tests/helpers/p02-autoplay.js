(() => {
 const G=window.G, pl=G.Game.player, log=[], way=[[-100,-100],[100,-100],[100,100],[-100,100]];
 let waypoint=0, previous='', moved=false;
 const keyAxis=(dx,dy)=>{
  for(const code of ['KeyW','KeyS','KeyA','KeyD']) window.dispatchEvent(new KeyboardEvent('keyup',{code}));
  if(dx> .15)window.dispatchEvent(new KeyboardEvent('keydown',{code:'KeyD'}));
  if(dx<-.15)window.dispatchEvent(new KeyboardEvent('keydown',{code:'KeyA'}));
  if(dy>.15)window.dispatchEvent(new KeyboardEvent('keydown',{code:'KeyS'}));
  if(dy<-.15)window.dispatchEvent(new KeyboardEvent('keydown',{code:'KeyW'}));
 };
 for(let step=0;step<60000;step++) {
  const s=G.Expedition.state, id=s.sector+':'+s.wave+':'+s.phase+':'+s.pending;
  if(id!==previous){log.push({id,hp:pl.hp,kills:pl.kills,xp:pl.xp,level:pl.level});previous=id;}
  if(window.__P02_STOP_PREP && s.phase==='preparation' && s.pending) return {status:'preparation',log};
  if(window.__P02_STOP_EXTRACTION && s.phase==='extracting') return {status:'extracting',log};
  if(s.phase==='finished')return {status:s.result.reason,steps:step,log,result:s.result,hp:pl.hp};
  if(s.phase==='preparation') {
   keyAxis(0,0);
   if(s.pending){let i=s.cards.findIndex(c=>['health','heal','recovery'].includes(c.key));G.Expedition.choose(i>=0?i:0);}
   else G.Expedition.ready();
  } else if(s.phase==='exploration') {
   const dx=s.exit.x-pl.x, dy=s.exit.y-pl.y;
   if(Math.hypot(dx,dy)<=60){keyAxis(0,0);G.Expedition.useExit();}
   else keyAxis(dx/Math.max(1,Math.abs(dx)),dy/Math.max(1,Math.abs(dy)));
  } else if(s.phase==='extracting')keyAxis(0,0);
  else {
   const point=way[waypoint];let dx=point[0]-pl.x,dy=point[1]-pl.y;
   if(Math.hypot(dx,dy)<15)waypoint=(waypoint+1)%4;
   const [ax,ay]=G.U.norm(dx,dy);keyAxis(ax,ay);
  }
  G.Expedition.update(1/60);G.Input.endFrame();
 }
 return {status:'timeout',state:G.Expedition.state,log,hp:pl.hp};
})()
