/* ARM-FALTANTES-VIS-001/r1 accepted25/10. Render-only mount calibration LOT-EST-006r1. */
G.ApprovedFieldWeaponArt=(()=>{
 'use strict';
 const base='docs/referencias/armas/armas-faltantes-v1/',directions=['E','SE','S','SW','W','NW','N','NE'];
 const models=['smg','shotgun','baton'],cache=new Map(),scale=.75;let loading=null,catalogFailed=false,retryAt=0,error=null;
 const active=()=>G.TrialVisuals?.enabled===true&&['16','32'].includes(G.TrialVisuals.mode);
 const finite=p=>p&&Number.isFinite(p.x)&&Number.isFinite(p.y),point=(p,n)=>finite(p)&&p.x>=0&&p.y>=0&&p.x<n&&p.y<n;
 function requestImage(entry){
  const attempt=++entry.attempt;entry.failed=false;const img=new Image();
  return new Promise(resolve=>{
   let settled=false;const finish=ok=>{if(!settled){settled=true;clearTimeout(timer);resolve(ok);}};
   const fail=()=>{if(entry.attempt===attempt){entry.failed=true;entry.retryAt=Date.now()+10000;}finish(false);};
   const timer=setTimeout(fail,6000);
   img.onload=()=>{if(img.naturalWidth!==entry.n||img.naturalHeight!==entry.n){fail();return;}if(entry.attempt===attempt){entry.image=img;entry.ready=true;entry.failed=false;}finish(true);};
   img.onerror=fail;img.src=entry.url;
  });
 }
 function preload(){
  if(!active())return Promise.resolve(false);
  if(loading&&(!catalogFailed||Date.now()<retryAt))return loading;
  catalogFailed=false;
  loading=new Promise(resolve=>{
   // This promise is never awaited by boot. Late successful requests can still recover the cache.
   const timer=setTimeout(()=>resolve(false),6000);
   (async()=>{
    try{
     const response=await fetch(base+'catalogo.json');if(!response.ok)throw Error('Weapon catalog unavailable');const catalog=await response.json(),entries=[];
     for(const mode of ['16','32'])for(const model of models){
      const cat=catalog.modes?.[mode]?.[model],n=Number(mode);if(cat?.approved!==true||cat.frames?.length!==8||cat.individuals?.length!==8)throw Error('Weapon catalog incomplete');
      cat.frames.forEach((frame,i)=>{const path=`${mode}/${model}/${directions[i]}.png`;
       if(frame.direction!==directions[i]||cat.individuals[i]!==path||!point(frame.grip,n)||(model==='baton'?!point(frame.strikeTip,n):!point(frame.support,n)||!point(frame.muzzle,n)))throw Error('Weapon anchors incomplete');
       entries.push({model,mode,n,direction:frame.direction,grip:{...frame.grip},support:frame.support?{...frame.support}:null,muzzle:frame.muzzle?{...frame.muzzle}:null,tip:frame.strikeTip?{...frame.strikeTip}:null,url:base+path,ready:false,failed:false,attempt:0,retryAt:0});
      });
     }
     const jobs=entries.map(entry=>{cache.set(entry.mode+'/'+entry.model+'/'+entry.direction,entry);return requestImage(entry);});await Promise.all(jobs);error=[...cache.values()].every(e=>e.ready)?null:'Weapon images unavailable';resolve(!error);
    }catch(e){catalogFailed=true;retryAt=Date.now()+10000;error=e.message;resolve(false);}finally{clearTimeout(timer);}
   })();
  });return loading;
 }
 function mount(model,mode,angle,grip){
  if(!active()||!models.includes(model)||!['16','32'].includes(String(mode))||!finite(grip))return null;
  if(!loading||(catalogFailed&&Date.now()>=retryAt))preload();
  const aim=Number.isFinite(angle)?angle:0,index=((Math.round(aim/(Math.PI/4))%8)+8)%8,entry=cache.get(String(mode)+'/'+model+'/'+directions[index]);
  if(!entry)return null;if(!entry.ready){if(entry.failed&&Date.now()>=entry.retryAt)requestImage(entry);return null;}
  const x=grip.x-entry.grip.x*scale,y=grip.y-entry.grip.y*scale;
  // Preserve the existing smooth melee swing with only the residual angle of its nearest PNG view.
  const rotation=model==='baton'?Math.atan2(Math.sin(aim-index*Math.PI/4),Math.cos(aim-index*Math.PI/4)):0,ca=Math.cos(rotation),sa=Math.sin(rotation);
  const transform=p=>p?{x:grip.x+((p.x-entry.grip.x)*ca-(p.y-entry.grip.y)*sa)*scale,y:grip.y+((p.x-entry.grip.x)*sa+(p.y-entry.grip.y)*ca)*scale}:null;
  return{image:entry.image,x,y,width:entry.n*scale,height:entry.n*scale,scale,rotation,grip:{...grip},support:transform(entry.support),muzzle:transform(entry.muzzle),tip:transform(entry.tip),direction:entry.direction,model,aim};
 }
 function draw(ctx,mount,flash=0){
  if(!mount)return false;ctx.save();ctx.imageSmoothingEnabled=false;
  if(mount.rotation){ctx.translate(mount.grip.x,mount.grip.y);ctx.rotate(mount.rotation);ctx.translate(-mount.grip.x,-mount.grip.y);}
  ctx.drawImage(mount.image,mount.x,mount.y,mount.width,mount.height);
  if(flash>0&&mount.muzzle){ctx.fillStyle='#fff0b1';ctx.fillRect(mount.muzzle.x,mount.muzzle.y,Math.max(1,mount.width*.1),Math.max(1,mount.height*.07));}ctx.restore();return true;
 }
 function inspect(model,mode){const entries=[...cache.values()].filter(e=>(!model||e.model===model)&&(!mode||e.mode===String(mode)));return{loaded:entries.filter(e=>e.ready).length,expected:model?(mode?8:16):48,failed:entries.filter(e=>e.failed&&!e.ready).map(e=>e.url),error:cache.size===48&&[...cache.values()].every(e=>e.ready)?null:error,profile:'LOT-EST-006r1',scale};}
 return Object.freeze({preload,mount,draw,inspect});
})();
