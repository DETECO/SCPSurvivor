/* Five approved BIO identities/attacks. All numeric tuning: ENSAYO-GRI-001 r1. */
G.RiftAnomalies=(()=>{
 const catalog=[
  {id:'esporario',name:'Esporario Blanco',tier:'D1',hp:500,r:24,windup:1.25,recovery:1.4,damage:9,color:'#ede0ae',attacks:['Abanico de esporas','Brinco de raíz','Latigazo rasante'],patterns:['spores','jump','sweep']},
  {id:'larva',name:'Larva de Vidrio',tier:'D2',hp:700,r:24,windup:1.3,recovery:1.3,damage:11,color:'#a6d4cf',attacks:['Cápsula de fluido','Salto de resorte','Carrera de cuchillas'],patterns:['pool','jump','dash']},
  {id:'malla',name:'Malla Tendinosa',tier:'D3',hp:950,r:26,windup:1.4,recovery:1.2,damage:13,color:'#d77f91',attacks:['Líneas de tensión','Salto de anclaje','Tijera orgánica'],patterns:['lines','jump','scissors']},
  {id:'portador',name:'Portador de Espinas',tier:'D4',hp:1200,r:28,windup:1.4,recovery:1.2,damage:15,color:'#caad79',attacks:['Salva en abanico','Embestida de hombro','Salto de estaca'],patterns:['fan','dash','jump']},
  {id:'huesped',name:'Huésped de Cuarentena',tier:'D5',hp:1600,r:32,windup:1.6,recovery:1.4,damage:18,color:'#cda99d',attacks:['Brote de cuarentena','Salto de masa','Barrido de membrana'],patterns:['zones','jump','sweep']}
 ];
 const cache=new Map(),failed=new Set();
 function image(path){if(!cache.has(path)){const im=new Image();im.onerror=()=>failed.add(path);im.onload=()=>failed.delete(path);im.src='assets/anomalias-biologicas/'+path;cache.set(path,im);}return cache.get(path);}
 function preload(){const cat=window.BIO_CATALOGO;for(const modes of Object.values(cat?.modes||{}))for(const m of Object.values(modes))for(const a of Object.values(m.actions)){image(a.path);if(a.fx)image(a.fx);}}
 function loading(id){
  const mode=G.TrialVisuals?.mode==='16'?16:32,model=window.BIO_CATALOGO?.modes[mode]?.[id];if(!model)return{ready:false,failed:['catalogue:'+id],pending:[]};
  const paths=[...new Set(Object.values(model.actions).flatMap(a=>[a.path,a.fx].filter(Boolean)))],pending=[];
  for(const p of paths){const im=image(p);if(!im.complete||!im.naturalWidth)pending.push(p);}
  return{ready:pending.length===0,failed:paths.filter(p=>failed.has(p)),pending};
 }
 function ready(id){return loading(id).ready;}
 function retryFailed(id){const state=loading(id);for(const p of state.failed){failed.delete(p);cache.delete(p);image(p);}}
 function segmentDistance(x,y,a,b){const dx=b.x-a.x,dy=b.y-a.y,k=Math.max(0,Math.min(1,((x-a.x)*dx+(y-a.y)*dy)/(dx*dx+dy*dy||1)));return Math.hypot(x-a.x-dx*k,y-a.y-dy*k);}
 function contains(z,p){
  if(z.type==='line')return segmentDistance(p.x,p.y,z.a,z.b)<=z.r+p.r;
  const dx=p.x-z.x,dy=p.y-z.y,d=Math.hypot(dx,dy);if(d>z.r+p.r)return false;
  return z.type!=='cone'||Math.abs(Math.atan2(Math.sin(Math.atan2(dy,dx)-z.angle),Math.cos(Math.atan2(dy,dx)-z.angle)))<=z.half;
 }
 class Biological extends G.Enemy{
  constructor(profile,geometry){
   super({...G.Content?.boss,name:profile.name,containment:true,radius:profile.r,hp:profile.hp,spd:48,dmg:profile.damage,xp:0},geometry.bossSpawn.x,geometry.bossSpawn.y,{hp:1,spd:1,dmg:1},true);
   this.profile=profile;this.bioId=profile.id;this.name=profile.name;this.dimensional=true;this.bodyH=80;this.clock=0;this.attackIndex=-1;this.phase='rest';this.pt=1;this.zones=[];this.target=null;this.angle=0;this.action='Idle';this.actionTime=0;this.height=0;this.touchCd=Infinity;
  }
  get visualBodyH(){return 88;}
  prepare(player){
   this.attackIndex=(this.attackIndex+1)%3;this.pattern=this.profile.patterns[this.attackIndex];this.action='Attack'+(this.attackIndex+1);this.actionTime=0;this.phase='windup';this.pt=this.profile.windup;
   this.angle=Math.atan2(player.y-this.y,player.x-this.x);const distance=Math.min(240,Math.hypot(player.x-this.x,player.y-this.y));
   this.target={x:this.x+Math.cos(this.angle)*distance,y:this.y+Math.sin(this.angle)*distance};
   if(!G.World.isFree(this.target.x,this.target.y,this.r))this.target={x:this.x,y:this.y};
   this.start={x:this.x,y:this.y};this.zones=[];
   const circle=(x,y,r,delay=0,life=.25)=>({type:'circle',x,y,r,delay,life,t:0});
   const line=(a,b,r=20,delay=0)=>({type:'line',a,b,r,delay,life:.25,t:0});
   if(this.pattern==='jump'){
    this.zones=[circle(this.target.x,this.target.y,this.bioId==='huesped'?88:64)];
    if(this.bioId==='portador')this.zones.push({type:'cone',x:this.target.x,y:this.target.y,r:90,angle:this.angle,half:.7,delay:0,life:.25,t:0});
   }
   else if(this.pattern==='pool')this.zones=[circle(this.target.x,this.target.y,58,.65,3)];
   else if(this.pattern==='dash')this.zones=[line(this.start,this.target,24,0)];
   else if(this.pattern==='lines'||this.pattern==='scissors'){
    const n=this.pattern==='lines'?3:2;for(let i=0;i<n;i++){const angle=this.angle+(i-(n-1)/2)*.55;this.zones.push(line(this.start,{x:this.x+Math.cos(angle)*230,y:this.y+Math.sin(angle)*230},14,this.pattern==='lines'?i*.5:0));}
   }else if(this.pattern==='zones'){
    for(let i=0;i<3;i++){const angle=this.angle+(i-1)*.8;const x=this.x+Math.cos(angle)*200,y=this.y+Math.sin(angle)*200;if(G.World.isFree(x,y,70))this.zones.push(circle(x,y,65,i*.65,.3));}
   }else{
    const cone={type:'cone',x:this.x,y:this.y,r:this.pattern==='sweep'?185:210,angle:this.angle,half:this.pattern==='sweep'?1.05:.6,delay:0,life:.2,t:0};
    this.zones=this.pattern==='spores'?[0,.4,.8].map(delay=>({...cone,delay,life:.12})):[cone];
   }
  }
  execute(){
   this.phase='attack';this.pt=this.pattern==='jump'?.65:this.pattern==='dash'?.65:Math.max(.7,...this.zones.map(z=>z.delay+z.life));this.attackDuration=this.pt;this.attackElapsed=0;
   if(this.pattern==='fan'){
    this.zones=[];
    for(let i=-3;i<=3;i++){const angle=this.angle+i*.22;G.Projectiles.spawn({x:this.x,y:this.y,vx:Math.cos(angle)*190,vy:Math.sin(angle)*190,r:5,dmg:this.dmg,friendly:false,life:2.5,color:this.profile.color});}
   }
  }
  update(dt,player){
   if(!Number.isFinite(dt)||dt<=0)return;this.landedThisFrame=false;this.actionTime+=dt;this.clock+=dt;this.flash=Math.max(0,this.flash-dt);
   if(this.dead){this.fade-=dt;return;}
   if(this.slowT>0){this.slowT-=dt;if(this.slowT<=0)this.slow=0;}
   if(this.burn>0){this.burnT-=dt;this.burnTick-=dt;if(this.burnTick<=0){this.burnTick=.5;this.hurt(1.6*this.burn*(1+(player.level||1)*.06),'#ff9a4d');}if(this.burnT<=0)this.burn=0;}
   if(this.poison>0){this.poisonT-=dt;this.poisonTick-=dt;if(this.poisonTick<=0){this.poisonTick=.6;this.hurt(this.maxHp*.012*this.poison+1,'#d47cf0');}if(this.poisonT<=0)this.poison=0;}
   if(this.dead)return;
   this.pt-=dt;
   if(this.phase==='rest'){
    const dx=player.x-this.x,dy=player.y-this.y,d=Math.hypot(dx,dy);if(d>160){this.x+=dx/d*48*(1-this.slow)*dt;this.y+=dy/d*48*(1-this.slow)*dt;G.World.collide(this);this.action='Walk';}else this.action='Idle';
    if(this.pt<=0)this.prepare(player);return;
   }
   if(this.phase==='windup'){if(this.pt<=0)this.execute();return;}
   if(this.phase==='attack'){
    this.attackElapsed+=dt;const k=Math.min(1,this.attackElapsed/this.attackDuration);
    if(this.pattern==='jump'||this.pattern==='dash'){
     const nx=this.start.x+(this.target.x-this.start.x)*k,ny=this.start.y+(this.target.y-this.start.y)*k;
     if(this.pattern==='dash'&&!G.World.isFree(nx,ny,this.r)){this.pt=0;this.target={x:this.x,y:this.y};}
     else{this.x=nx;this.y=ny;G.World.collide(this);}this.height=this.pattern==='jump'?Math.sin(Math.PI*k)*52:0;
     if(this.pattern==='dash'&&contains(this.zones[0],player)&&Math.hypot(player.x-this.x,player.y-this.y)<=this.r+player.r)player.hurt(this.dmg);
     if(this.pattern==='jump'&&this.pt<=0){this.landedThisFrame=true;this.lastLanding=this.zones.slice();if(this.zones.some(z=>contains(z,player)))player.hurt(this.dmg);}
    }else for(const z of this.zones){z.t=this.attackElapsed;if(z.t>=z.delay&&z.t<=z.delay+z.life&&contains(z,player))player.hurt(this.dmg);}
    if(this.pt<=0){this.height=0;this.zones=[];this.phase='recovery';this.pt=this.profile.recovery;}
   }else if(this.phase==='recovery'&&this.pt<=0){this.phase='rest';this.pt=.7;this.action='Idle';this.actionTime=0;}
  }
  die(){if(this.dead)return;this.dead=true;this.hp=0;this.fade=1.8;this.zones=[];this.height=0;this.action='Death';this.actionTime=0;G.Audio?.sfx('bossDown');}
  showHurt(d,color){this.flash=.09;G.FX.dmgText(this.x,this.y-this.visualBodyH-4,d,color,true);}
  drawGround(ctx){
   if(this.dead)return;ctx.save();ctx.lineWidth=3;ctx.setLineDash(this.phase==='windup'?[8,6]:[]);
   for(const [index,z] of this.zones.entries()){const active=this.phase==='attack'&&this.attackElapsed>=z.delay&&this.attackElapsed<=z.delay+z.life;
    ctx.strokeStyle=active?'#fff2cd':'#f28f9b';ctx.fillStyle=active?'#db334952':'#b5213d22';ctx.beginPath();
    if(z.type==='line'){ctx.lineWidth=z.r*2;ctx.moveTo(z.a.x,z.a.y);ctx.lineTo(z.b.x,z.b.y);ctx.stroke();ctx.lineWidth=3;}
    else if(z.type==='cone'){ctx.moveTo(z.x,z.y);ctx.arc(z.x,z.y,z.r,z.angle-z.half,z.angle+z.half);ctx.closePath();ctx.fill();ctx.stroke();}
    else{ctx.arc(z.x,z.y,z.r,0,Math.PI*2);ctx.fill();ctx.stroke();if(this.pattern==='zones'){ctx.font='bold 18px monospace';ctx.textAlign='center';ctx.fillStyle='#fff4d9';ctx.fillText(String(index+1),z.x,z.y+6);}}
   }ctx.restore();
  }
  draw(ctx){
   const mode=G.TrialVisuals?.mode==='16'?16:32,model=window.BIO_CATALOGO?.modes[mode]?.[this.bioId];if(!model)return;
   const a=model.actions[this.action]||model.actions.Idle;let ms=this.actionTime*1000;
   // Map the complete raster sequence onto the actual telegraph/execution/recovery.
   if(this.action.startsWith('Attack')){
    const k=this.phase==='windup'?.3*(1-Math.max(0,this.pt)/this.profile.windup):this.phase==='attack'?.3+.45*Math.min(1,this.attackElapsed/this.attackDuration):.75+.25*(1-Math.max(0,this.pt)/this.profile.recovery);ms=k*(a.totalMs-1);
   }else if(a.loop)ms%=a.totalMs;else ms=Math.min(ms,a.totalMs-1);
   let frame=0;while(frame<a.frames-1&&ms>=a.durations[frame]){ms-=a.durations[frame++];}
   const angles=window.BIO_CATALOGO.angles;let dir=0,best=99;angles.forEach((angle,i)=>{const d=Math.abs(Math.atan2(Math.sin(angle-this.angle),Math.cos(angle-this.angle)));if(d<best){best=d;dir=i;}});
   const scale=96/mode,im=image(a.path);ctx.save();ctx.globalAlpha=this.dead?Math.max(0,this.fade/1.8):1;
   ctx.fillStyle='#0007';ctx.beginPath();ctx.ellipse(this.x,this.y,this.r,10,0,0,Math.PI*2);ctx.fill();
   if(this.pattern==='pool'&&this.phase==='attack'&&this.attackElapsed<.65){const k=this.attackElapsed/.65,x=this.start.x+(this.target.x-this.start.x)*k,y=this.start.y+(this.target.y-this.start.y)*k-Math.sin(Math.PI*k)*60;ctx.fillStyle=this.profile.color;ctx.beginPath();ctx.ellipse(x,y,9,6,-this.angle,0,Math.PI*2);ctx.fill();}
   if(im.complete&&im.naturalWidth)ctx.drawImage(im,frame*mode,dir*mode,mode,mode,this.x-a.bodyAnchor.x*scale,this.y-a.bodyAnchor.y*scale,96,96);
   if(a.fx){const fx=image(a.fx),n=a.fxFrameWidth;if(fx.complete&&fx.naturalWidth)ctx.drawImage(fx,frame*n,dir*n,n,n,this.x-a.fxAnchor.x*scale,this.y-a.fxAnchor.y*scale,n*scale,n*scale);}
   ctx.restore();
  }
 }
 function create({tier,geometry,anomalyId}){const profile=catalog.find(p=>p.id===anomalyId)||catalog.find(p=>p.tier===tier);if(!profile)throw Error('Unknown biological anomaly');return new Biological(profile,geometry);}
 return{catalog,create,preload,ready,loading,retryFailed,contains};
})();
