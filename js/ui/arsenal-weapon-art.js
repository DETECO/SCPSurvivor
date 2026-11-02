/* Original ARM-VIS-001 sprites, nearest of 8 views; continuous world aim is independent. */
G.ArsenalWeaponArt = (() => {
 'use strict';
 const base='docs/referencias/armas/armas-prueba-direccionales-v1/',dirs=['E','SE','S','SW','W','NW','N','NE'],cache=new Map();
 let loading=null,error=null;
 const enabled=()=>G.PlayableArsenal?.active()&&['16','32'].includes(G.TrialVisuals?.mode);
 const valid=(p,n)=>p&&Number.isFinite(p.x)&&Number.isFinite(p.y)&&p.x>=0&&p.y>=0&&p.x<n&&p.y<n;
 function preload(){
  if(!enabled())return Promise.resolve(false);if(loading)return loading;
  loading=(async()=>{
   try{
    const response=await fetch(base+'catalogo.json');if(!response.ok)throw Error('Catálogo ARMAS no disponible');const data=await response.json(),jobs=[];
    for(const mode of ['16','32'])for(const id of data.selected.filter(id=>id!=='AF01')){
     const model=data.modes[mode][id],n=+mode;
     if(model.frames.length!==8||model.individuals.length!==8)throw Error('Faltan direcciones');
     for(let i=0;i<8;i++){
      const frame=model.frames[i];if(frame.direction!==dirs[i]||!valid(frame.grip,n)||!valid(frame.muzzle,n)||(frame.support&&!valid(frame.support,n)))throw Error('Ancla fuera del PNG');
      const entry={...frame,n,id,ready:false};cache.set(mode+'/'+id+'/'+i,entry);
      jobs.push(new Promise(resolve=>{const img=new Image();let done=false;const finish=ok=>{if(done)return;done=true;clearTimeout(timer);entry.ready=ok;resolve(ok);};const timer=setTimeout(()=>finish(false),6000);
       img.onload=()=>{entry.image=img;finish(img.naturalWidth===n&&img.naturalHeight===n);};img.onerror=()=>finish(false);img.src=base+model.individuals[i];}));
     }
    }
    await Promise.all(jobs);if([...cache.values()].some(e=>!e.ready))error='Faltan PNG del arsenal';return !error;
   }catch(e){error=e.message;return false;}
  })();return loading;
 }
 function mount(model,mode,aim,grip){
  if(!enabled()||!G.PlayableArsenal.get(model)||!Number.isFinite(aim)||!grip)return null;
  if(!loading)preload();const id=G.PlayableArsenal.get(model).artId,i=((Math.round(aim/(Math.PI/4))%8)+8)%8,e=cache.get(String(mode)+'/'+id+'/'+i);
  if(!e?.ready)return null;
  const scale=.75,isBlade=['CC04','F24'].includes(id),rotation=isBlade?Math.atan2(Math.sin(aim-i*Math.PI/4),Math.cos(aim-i*Math.PI/4)):0,ca=Math.cos(rotation),sa=Math.sin(rotation);
  const point=p=>p?{x:grip.x+((p.x-e.grip.x)*ca-(p.y-e.grip.y)*sa)*scale,y:grip.y+((p.x-e.grip.x)*sa+(p.y-e.grip.y)*ca)*scale}:null;
  return {image:e.image,x:grip.x-e.grip.x*scale,y:grip.y-e.grip.y*scale,width:e.n*scale,height:e.n*scale,grip:{...grip},support:point(e.support),muzzle:point(e.muzzle),rotation,direction:e.direction,model};
 }
 function draw(ctx,mount,flash=0){
  if(!mount)return false;ctx.save();ctx.imageSmoothingEnabled=false;
  ctx.translate(mount.grip.x,mount.grip.y);ctx.rotate(mount.rotation);ctx.translate(-mount.grip.x,-mount.grip.y);
  ctx.drawImage(mount.image,mount.x,mount.y,mount.width,mount.height);ctx.restore();
  if(flash>0&&!['CC04','F24','AR01','AN09'].includes(mount.model)){
   ctx.save();ctx.fillStyle=G.PlayableArsenal.get(mount.model).color;ctx.fillRect(mount.muzzle.x,mount.muzzle.y,Math.max(1,mount.width*.09),Math.max(1,mount.height*.06));ctx.restore();
  }return true;
 }
 const inspect=()=>({loaded:[...cache.values()].filter(e=>e.ready).length,expected:144,error});
 return Object.freeze({preload,mount,draw,inspect});
})();
