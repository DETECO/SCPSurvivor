/* Selected 01A/02A/03A/04A/05B original atlases. Read-only normalized active-clock renderer. */
G.RiftPowerArt=(()=>{
 const images=new Map(),failed=new Set();
 function image(a){if(!images.has(a.path)){const im=new Image();im.onload=()=>failed.delete(a.path);im.onerror=()=>failed.add(a.path);im.src=a.path;images.set(a.path,im);}return images.get(a.path);}
 function preload(){for(const a of G.RiftPowerAssets)image(a);}
 function draw(ctx,player){
  if(!player)return;const mode=G.TrialVisuals?.mode==='16'?16:32;
  for(const cycle of G.RiftPowers.state.cycles){
   const a=G.RiftPowerAssets.find(a=>a.bioId===cycle.id&&a.resolution===mode);if(!a)continue;const im=image(a);if(!im.complete||!im.naturalWidth)continue;
   const frame=Math.min(a.frames-1,Math.floor(Math.min(.999,cycle.age/cycle.duration)*a.frames)),direction=(Math.round(cycle.angle/(Math.PI/4))+8)%8;
   let x=player.x,y=player.y;
   if(cycle.kind==='capsulePool'){const t=Math.min(1,cycle.age/.35);x=cycle.source.x+(cycle.target.x-cycle.source.x)*t;y=cycle.source.y+(cycle.target.y-cycle.source.y)*t-Math.sin(Math.PI*t)*40;}
   const size=cycle.radius*2,scale=size/a.cellWidth;
   ctx.save();ctx.imageSmoothingEnabled=false;ctx.drawImage(im,frame*a.cellWidth,direction*a.cellHeight,a.cellWidth,a.cellHeight,x-a.anchor.x*scale,y-a.anchor.y*scale,size,a.cellHeight*scale);ctx.restore();
  }
 }
 return{preload,draw,get status(){return{loaded:[...images.values()].filter(im=>im.complete&&im.naturalWidth).length,failed:[...failed]};}};
})();
