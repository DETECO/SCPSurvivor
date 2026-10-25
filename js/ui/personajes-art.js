/* Existing PERSONAJES parts, render only. World size is independent of PNG resolution. */
G.PersonajesArt=(()=>{
 const cache=new Map(),models=new Set(['pistol','smg','shotgun','baton']);
 const enabled=()=>G.TrialVisuals?.enabled===true&&['16','32'].includes(G.TrialVisuals.mode);
 function asset(id){
  if(!enabled())return null;
  const mode=G.TrialVisuals.mode,cat=G.CharacterCatalog?.modes[mode]?.[id];if(!cat?.human)return null;
  const key=mode+'/'+id;if(cache.has(key))return cache.get(key);
  const entry={cat,n:Number(mode),img:new Image(),ready:false};cache.set(key,entry);
  entry.loaded=new Promise(resolve=>{entry.img.onload=()=>{entry.ready=true;resolve()};entry.img.onerror=()=>resolve();});
  entry.img.src=cat.partsPathRuntime||`assets/personajes-20261022/${mode}/${id}/Partes.png`;
  if(cat.fallbackPathRuntime){entry.fallback=new Image();entry.fallback.onload=()=>entry.fallbackReady=true;entry.fallback.src=cat.fallbackPathRuntime;entry.down=new Image();entry.down.onload=()=>entry.downReady=true;entry.down.src=cat.neutralizedPathRuntime;}
  return entry;
 }
 function preload(){return enabled()?Promise.all(['guardia','medico','apoyo',...(G.CompanionCharacters?.ids||[])].map(id=>asset(id)?.loaded)):Promise.resolve();}
 function source(ctx,img,b,x,y,w=b.w,h=b.h,a=0){ctx.save();ctx.translate(x,y);ctx.rotate(a);ctx.drawImage(img,b.x,b.y,b.w,b.h,-w/2,-h/2,w,h);ctx.restore();}
 function pose(a,actor,anim){
  const n=a.n,aim=Number.isFinite(actor.weaponAim)?actor.weaponAim:Number.isFinite(actor.aim)?actor.aim:0,dir=G.Sprites.dirFromAngle(aim),walking=actor.walking??anim.cur==='Walk',phase=(anim.frame||0)%4,move=Number.isFinite(actor.moveAngle)?G.Sprites.dirFromAngle(actor.moveAngle):anim.dir||dir;
  const torso=a.cat.parts[dir],leg=a.cat.parts[(walking?2+phase:1)*8+move],bob=walking&&(phase===1||phase===3)?-Math.max(1,n/32):0,top=n-1-leg.h-torso.h+1+bob;
  return{n,aim,torso,leg,top,origin:{x:n/2,y:top+torso.h*.7},shoulderY:top+torso.h*(a.cat.rig?.shoulderRatio??.62)};
 }
 function at(ctx,a,anim,x,y,opts,paint){
  const alpha=opts.alpha??1;if(alpha<=0)return;
  ctx.save();ctx.imageSmoothingEnabled=false;ctx.globalAlpha*=alpha;ctx.translate(x,y);const scale=56/a.n*(anim.scale??1);ctx.scale(scale,scale);ctx.translate(-a.n/2,-(a.n-1));
  if(!opts.flash||opts.softFlash)paint(a.img);
  if(opts.flash){if(opts.softFlash)ctx.globalAlpha*=.55;paint(G.Sprites.white(a.img));}
  ctx.restore();
 }
 function body(ctx,a,p,img){source(ctx,img,p.leg,p.n/2,p.n-1-p.leg.h/2);source(ctx,img,p.torso,p.n/2,p.top+p.torso.h/2);}
 function draw(ctx,anim,x,y,opts={}){
  const pl=G.Game?.player;if(!enabled()||!pl||pl.anim!==anim||pl.dead||anim.cur==='Faint')return false;
  const a=asset(G.SPRITE_META[anim.dex]?.characterId);if(!a?.ready)return false;
  const p=pose(a,pl,anim);at(ctx,a,anim,x,y,opts,img=>body(ctx,a,p,img));return true;
 }
 function rect(ctx,x,y,w,h,color){ctx.fillStyle='#11191e';ctx.fillRect(x-1,y-1,w+2,h+2);ctx.fillStyle=color;ctx.fillRect(x,y,w,h);}
 function weapon(ctx,id,n){
  ctx.save();ctx.scale(n/32,n/32);
  if(id==='pistol'){rect(ctx,-2,-2,14,4,'#687777');rect(ctx,0,2,4,6,'#34413e');}
  if(id==='smg'){rect(ctx,-6,-2,23,4,'#687777');rect(ctx,0,2,4,6,'#34413e');rect(ctx,7,2,3,6,'#34413e');}
  if(id==='shotgun'){rect(ctx,-9,-2,21,5,'#4f5751');rect(ctx,10,-2,16,3,'#899184');rect(ctx,7,2,8,4,'#96774c');rect(ctx,-1,3,4,5,'#5f4b38');}
  if(id==='baton'){rect(ctx,-4,-2,23,4,'#78867b');rect(ctx,-5,-2,8,4,'#303f3a');}
  ctx.restore();
 }
 function bone(ctx,img,b,a,c,width){source(ctx,img,b,(a.x+c.x)/2,(a.y+c.y)/2,Math.hypot(c.x-a.x,c.y-a.y),width,Math.atan2(c.y-a.y,c.x-a.x));}
 function limb(ctx,a,img,shoulder,hand,side,angle){
  const dx=hand.x-shoulder.x,dy=hand.y-shoulder.y,d=Math.hypot(dx,dy)||1,k=Math.min(a.n*.1,d*.3),e={x:(shoulder.x+hand.x)/2-dy/d*k*side,y:(shoulder.y+hand.y)/2+dx/d*k*side};
  bone(ctx,img,a.cat.parts[48],shoulder,e,Math.max(2,Math.round(a.n*(a.cat.rig?.armWidth??.1))));bone(ctx,img,a.cat.parts[49],e,hand,Math.max(2,Math.round(a.n*(a.cat.rig?.armWidth??.08))));source(ctx,img,a.cat.parts[53],hand.x,hand.y,Math.max(2,Math.round(a.n*.1)),Math.max(2,Math.round(a.n*.1)),angle);
 }
 function aimFor(pl,w){const t=w._aimTarget;return t&&!t.dead&&t.hp>0&&Number.isFinite(t.x)&&Number.isFinite(t.y)?Math.atan2(t.y-pl.y,t.x-pl.x):Number.isFinite(pl.weaponAim)?pl.weaponAim:Number.isFinite(pl.aim)?pl.aim:0;}
 function armed(ctx,a,p,img,w,angle,index,count){
  const n=a.n,wa=angle+(w.model==='baton'&&w.flash>0?-.7+(1-Math.min(1,w.flash/.12))*1.4:0),ca=Math.cos(wa),sa=Math.sin(wa),side=count===2?(index===0?1:-1):0;
  const pivot={x:p.origin.x+ca*n*.18-sa*side*n*.09,y:p.origin.y+sa*n*.18+ca*side*n*.09};
  const hand=(x,y)=>({x:pivot.x+ca*x-sa*y,y:pivot.y+sa*x+ca*y}),hands=[hand(0,n*.07),hand((w.model==='shotgun'?13:w.model==='smg'?7:1)*n/32,n*.08)];
  const approved=w.model==='pistol'?G.AF01ApprovedArt?.mount(String(n),angle,hands[0]):null;
  if(approved)hands[1]=approved.support;
  const nx=-Math.sin(p.aim),ny=Math.cos(p.aim),half=a.cat.rig?.shoulderHalf??.18,shoulders=[{x:n/2+nx*n*half,y:p.shoulderY+ny*n*.08},{x:n/2-nx*n*half,y:p.shoulderY-ny*n*.08}];
  const limbs=count===2?[index]:[1,0];for(const i of limbs)limb(ctx,a,img,shoulders[i],hands[count===2?0:i],i?-1:1,wa);
  if(approved)G.AF01ApprovedArt.draw(ctx,approved,w.flash);
  else{
   ctx.save();ctx.translate(pivot.x,pivot.y);ctx.rotate(wa);weapon(ctx,w.model,n);
   if(w.model!=='baton'&&w.flash>0){ctx.fillStyle='#fff0b1';const muzzle=({pistol:13,smg:18,shotgun:27}[w.model])*n/32;ctx.fillRect(muzzle,-n*.04,n*.13,n*.08);}
   ctx.restore();
  }
  source(ctx,img,a.cat.parts[53],hands[0].x,hands[0].y,Math.max(2,Math.round(n*.1)),Math.max(2,Math.round(n*.1)),wa);
 }
 function drawWeapons(ctx,pl,options={},weapons=[]){
  if(!enabled()||!pl||pl.dead)return false;const a=asset(G.SPRITE_META[pl.anim?.dex]?.characterId);if(!a?.ready)return false;
  const copies=weapons.slice(0,2).filter(w=>models.has(w?.model)),p=pose(a,pl,pl.anim),alpha=pl.invuln>0&&Math.floor(pl.invuln*18)%2?.45:1;
  for(let i=0;i<copies.length;i++){const angle=aimFor(pl,copies[i]);if(Object.prototype.hasOwnProperty.call(options,'behind')&&(Math.sin(angle)<0)!==!!options.behind)continue;
   at(ctx,a,pl.anim,pl.x,pl.y,{alpha,flash:pl.flash>0,softFlash:true},img=>armed(ctx,a,p,img,copies[i],angle,i,copies.length));
  }return true;
 }
 function drawAlly(ctx,ally){
  if(!enabled()||!ally?.anim)return false;const a=asset(ally.characterId||'apoyo');if(!a)return false;
  if(!a.ready){const img=ally.incapacitated?a.down:a.fallback,ready=ally.incapacitated?a.downReady:a.fallbackReady;if(!ready)return false;const dir=G.Sprites.dirFromAngle(ally.aim||0),n=a.n;at(ctx,a,ally.anim,ally.x,ally.y,{},()=>ctx.drawImage(img,ally.incapacitated?n:0,dir*n,n,n,0,0,n,n));return true;}
  if(ally.incapacitated&&a.cat.rig){const b=a.cat.parts[56+G.Sprites.dirFromAngle(ally.aim||0)];at(ctx,a,ally.anim,ally.x,ally.y,{},img=>source(ctx,img,b,a.n/2,a.n-1-b.h/2));return true;}
  const actor={aim:ally.aim,walking:ally.anim.cur==='Walk',moveAngle:Math.atan2(ally.ty-ally.y,ally.tx-ally.x)},p=pose(a,actor,ally.anim),w={model:ally.weapon?.model||'pistol',flash:ally.flash};
  at(ctx,a,ally.anim,ally.x,ally.y,{},img=>{if(Math.sin(p.aim)<0)armed(ctx,a,p,img,w,p.aim,0,1);body(ctx,a,p,img);if(Math.sin(p.aim)>=0)armed(ctx,a,p,img,w,p.aim,0,1);});return true;
 }
 function status(){
  const player=G.Game?.player,copies=player?.fieldWeapons||[],names={smg:'Subfusil',shotgun:'Escopeta',baton:'Porra'};
  const npc=G.RiftCompanion?.state;
  const missingModels=enabled()?[...new Set([...copies.map(w=>w.model),...(npc&&!npc.incapacitated?[npc.weapon.model]:[])].filter(id=>names[id]))]:[];
  const approvedPistolReady=G.AF01ApprovedArt?.inspect().loaded===16;
  const messages=[];
  if(missingModels.length)messages.push('Arte provisional: '+missingModels.map(id=>names[id]).join(', ')+'.');
  if(enabled()&&copies.some(w=>w.model==='pistol')&&!approvedPistolReady)messages.push('Recurso AF01 no disponible; dibujo provisional.');
  if(enabled()&&player&&!asset(G.SPRITE_META[player.anim?.dex]?.characterId)?.ready)messages.push('Piezas del personaje no disponibles; dibujo de respaldo.');
  return{message:messages.join(' '),missingModels,approvedPistolReady};
 }
 return{preload,draw,drawWeapons,drawAlly,status};
})();
