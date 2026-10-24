/* Approved AF01 PNGs only; visual mounts do not change aim, physics or copy state. */
G.AF01ApprovedArt=(()=>{
 'use strict';
 const base='docs/referencias/armas/armas-prueba-direccionales-v1/';
 const directions=['E','SE','S','SW','W','NW','N','NE'],cache=new Map();
 let loading=null,error=null;
 // Rendering follows native graphics, independently of the opt-in progression bridge.
 const active=()=>G.WeaponRevisionTrial?.active()===true||
  (G.TrialVisuals?.enabled===true&&['16','32'].includes(G.TrialVisuals.mode));
 function image(url,n){
  return new Promise(resolve=>{
   const img=new Image();let done=false;
   const finish=ok=>{if(done)return;done=true;clearTimeout(timer);resolve(ok?img:null);};
   const timer=setTimeout(()=>finish(false),6000);
   img.onload=()=>finish(img.naturalWidth===n&&img.naturalHeight===n);img.onerror=()=>finish(false);img.src=url;
  });
 }
 function validPoint(point,n){return point&&Number.isFinite(point.x)&&Number.isFinite(point.y)&&point.x>=0&&point.y>=0&&point.x<n&&point.y<n;}
 function preload(){
  if(!active())return Promise.resolve(false);
  if(loading)return loading;
  loading=(async()=>{
   try{
    const response=await fetch(base+'catalogo.json');if(!response.ok)throw Error('AF01 catalog unavailable');
    const catalog=await response.json(),jobs=[];
    for(const mode of ['16','32']){
     const entry=catalog.modes?.[mode]?.AF01,n=Number(mode);
     if(entry?.frames?.length!==8||entry?.individuals?.length!==8)throw Error('AF01 catalog incomplete');
     entry.frames.forEach((frame,i)=>{
      const expected=`${mode}/AF01/${directions[i]}.png`;
      if(frame.direction!==directions[i]||entry.individuals[i]!==expected||
        !validPoint(frame.grip,n)||!validPoint(frame.support,n)||!validPoint(frame.muzzle,n))throw Error('AF01 anchors incomplete');
      jobs.push(image(base+expected,n).then(img=>{
       if(img)cache.set(mode+'/'+i,{img,n,direction:frame.direction,grip:{...frame.grip},support:{...frame.support},muzzle:{...frame.muzzle}});
      }));
     });
    }
    await Promise.all(jobs);if(cache.size!==16)error='AF01 images unavailable';return cache.size===16;
   }catch(e){error=e.message;return false;}
  })();
  return loading;
 }
 function mount(mode,angle,grip){
  if(!active()||!['16','32'].includes(String(mode))||!validFinite(grip))return null;
  const aim=Number.isFinite(angle)?angle:0,index=((Math.round(aim/(Math.PI/4))%8)+8)%8;
  const asset=cache.get(String(mode)+'/'+index);if(!asset)return null;
  const x=grip.x-asset.grip.x,y=grip.y-asset.grip.y;
  const point=p=>({x:x+p.x,y:y+p.y});
  return{image:asset.img,x,y,width:asset.n,height:asset.n,grip:{...grip},support:point(asset.support),muzzle:point(asset.muzzle),direction:asset.direction,aim};
 }
 function validFinite(point){return point&&Number.isFinite(point.x)&&Number.isFinite(point.y);}
 function draw(ctx,mount,flash=0){
  if(!mount)return false;
  ctx.save();ctx.imageSmoothingEnabled=false;
  ctx.drawImage(mount.image,mount.x,mount.y,mount.width,mount.height);
  if(flash>0){ctx.fillStyle='#fff0b1';ctx.fillRect(mount.muzzle.x,mount.muzzle.y,Math.max(1,mount.width*.1),Math.max(1,mount.height*.07));}
  ctx.restore();return true;
 }
 return Object.freeze({preload,mount,draw,inspect:()=>({loaded:cache.size,expected:16,error})});
})();
