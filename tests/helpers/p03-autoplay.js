(options => {
 const G=window.G,pl=G.Game.player,log=[];let previous='',waypoint=0,currentSector=0,route=[],routeAt=0,routeKey='',cachedGeo=null;
 const keyAxis=(dx,dy)=>{for(const code of ['KeyW','KeyS','KeyA','KeyD'])window.dispatchEvent(new KeyboardEvent('keyup',{code}));
  if(dx>.15)window.dispatchEvent(new KeyboardEvent('keydown',{code:'KeyD'}));if(dx<-.15)window.dispatchEvent(new KeyboardEvent('keydown',{code:'KeyA'}));
  if(dy>.15)window.dispatchEvent(new KeyboardEvent('keydown',{code:'KeyS'}));if(dy<-.15)window.dispatchEvent(new KeyboardEvent('keydown',{code:'KeyW'}));};
 function navigation(target,seed){
  const TS=G.World.TS,geo=G.SectorMaps.generate(seed,{boss:G.Expedition.state.kind==='boss'}),f=geo.fixture;
  const sx=Math.floor(pl.x/TS),sy=Math.floor(pl.y/TS),tx=Math.floor(target.x/TS),ty=Math.floor(target.y/TS),end=tx+','+ty;
  const prev=new Map([[sx+','+sy,null]]),queue=[[sx,sy]];
  for(let h=0;h<queue.length&&!prev.has(end);h++){const[x,y]=queue[h];for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){
   const nx=x+dx,ny=y+dy,k=nx+','+ny;if(nx<=f.minX||nx>=f.maxX||ny<=f.minY||ny>=f.maxY||prev.has(k)||!G.World.isFree((nx+.5)*TS,(ny+.5)*TS,pl.r))continue;
   prev.set(k,[x,y]);queue.push([nx,ny]);}}
  if(!prev.has(end))return[];const out=[];let p=[tx,ty];while(p&&p[0]+','+p[1]!==sx+','+sy){out.push({x:(p[0]+.5)*TS,y:(p[1]+.5)*TS});p=prev.get(p[0]+','+p[1]);}return out.reverse();
 }
 const savedNow=performance.now;let clock=performance.now();performance.now=()=>clock;
 try {for(let step=0;step<(options.maxSteps||90000);step++){
  clock+=1000/30;
  const s=G.Expedition.state,id=s.sector+':'+s.wave+':'+s.phase+':'+s.pending;
  if(id!==previous){log.push({id,hp:pl.hp,kills:pl.kills,level:pl.level,objective:s.objective});previous=id;}
  if(options.stopPrep&&s.phase==='preparation')return{status:'preparation',log,state:s};
  if(options.stopBossDamaged&&s.phase==='boss'&&s.bossHp<s.bossMaxHp*.98)return{status:'boss-damaged',log,state:s};
  if(options.stopBoss&&s.phase==='boss')return{status:'boss',log,state:s};
  if(options.stopExtraction&&s.phase==='extracting')return{status:'extracting',log,state:s};
  if(s.phase==='finished'){keyAxis(0,0);return{status:s.result.reason,steps:step,log,result:s.result,hp:pl.hp};}
  if(currentSector!==s.sector){currentSector=s.sector;waypoint=0;routeKey='';route=[];cachedGeo=G.SectorMaps.generate(s.mapSeed,{boss:s.kind==='boss'});}
  if(s.phase==='preparation'){
   keyAxis(0,0);if(s.pending){const preferred=pl.hp<pl.maxHp*.6?['heal','health','recovery','power','cadence']:['power','cadence','weapon','recovery','health','mobility'];let index=-1;
    for(const key of preferred){index=s.cards.findIndex(c=>c.key===key);if(index>=0)break;}G.Expedition.choose(index<0?0:index);
   }else G.Expedition.ready();
  }else if(s.phase==='exploration'||(s.phase==='boss'&&options.bossMode==='escape')){
   const dist=Math.hypot(s.exit.x-pl.x,s.exit.y-pl.y);
   if(dist<=60){keyAxis(0,0);const achieved=s.totals.bossesDefeated+s.totals.bossesEvaded;
    G.Expedition.useExit(s.phase==='boss'?'escape':s.extractionAvailable&&achieved>=(options.minimumBosses??1)?'extract':'continue');
   }else{
    const key=s.sector+':exit';if(routeKey!==key||routeAt>=route.length){route=navigation(s.exit,s.mapSeed);routeAt=0;routeKey=key;}
    if(!route.length)return{status:'no-route',state:s,log,position:{x:pl.x,y:pl.y}};
    let p=route[routeAt];if(Math.hypot(p.x-pl.x,p.y-pl.y)<5&&routeAt<route.length-1)p=route[++routeAt];
    const[dx,dy]=G.U.norm(p.x-pl.x,p.y-pl.y);keyAxis(dx,dy);
   }
  }else if(s.phase==='escaping'||s.phase==='extracting')keyAxis(0,0);
  else{
   // Kite in the accessible entry room or the boss arena. No HP or damage cheats.
   const geo=cachedGeo;
   const center=s.kind==='boss'?{x:16,y:16}:geo.entry,r=150;
   const points=[[-r,-r],[r,-r],[r,r],[-r,r]],point=points[waypoint];
   const dx=center.x+point[0]-pl.x,dy=center.y+point[1]-pl.y;if(Math.hypot(dx,dy)<18)waypoint=(waypoint+1)%4;
   const[ax,ay]=G.U.norm(dx,dy);keyAxis(ax,ay);
  }
  G.Expedition.update(1/30);G.Input.endFrame();
 }
 keyAxis(0,0);return{status:'timeout',state:G.Expedition.state,log,hp:pl.hp};
 } finally {performance.now=savedNow;for(const e of G.EnemyMgr.all())e.losAt=0;}
})
