(function(root){
 'use strict';
 const TAU=Math.PI*2;
 const weapons={pistola:{len:13,support:1,kind:'bullet'},porra:{len:20,support:0,kind:'melee'},katana:{len:29,support:-3,kind:'melee'},laser:{len:17,support:3,kind:'laser'},escopeta:{len:27,support:13,kind:'pellet'},misil:{len:30,support:12,kind:'missile'}};
 const angles=[Math.PI/2,Math.PI/4,0,-Math.PI/4,-Math.PI/2,-3*Math.PI/4,Math.PI,3*Math.PI/4];
 const direction=a=>(Math.round((Math.PI/2-a)/(Math.PI/4))+8)%8;
 function source(ctx,img,b,x,y,w=b.w,h=b.h,angle=0){ctx.save();ctx.translate(x,y);ctx.rotate(angle);ctx.imageSmoothingEnabled=false;ctx.drawImage(img,b.x,b.y,b.w,b.h,-w/2,-h/2,w,h);ctx.restore()}
 function bone(ctx,img,b,a,c,width){source(ctx,img,b,(a.x+c.x)/2,(a.y+c.y)/2,Math.hypot(c.x-a.x,c.y-a.y),width,Math.atan2(c.y-a.y,c.x-a.x))}
 function transform(x,y,a,o){return{x:o.x+Math.cos(a)*x-Math.sin(a)*y,y:o.y+Math.sin(a)*x+Math.cos(a)*y}}
 function elbow(a,b,side,n){const dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy)||1,k=Math.min(n*.1,d*.3);return{x:(a.x+b.x)/2-dy/d*k*side,y:(a.y+b.y)/2+dx/d*k*side}}
 function outline(ctx,x,y,w,h,c){ctx.fillStyle='#11191e';ctx.fillRect(Math.round(x-1),Math.round(y-1),Math.round(w+2),Math.round(h+2));ctx.fillStyle=c;ctx.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h))}
 function weapon(ctx,id,n){ctx.save();ctx.scale(n/32,n/32);if(id==='pistola'){outline(ctx,-2,-2,14,4,'#687777');outline(ctx,0,2,4,6,'#34413e');ctx.fillStyle='#afbab0';ctx.fillRect(2,-2,7,1)}if(id==='laser'){outline(ctx,-3,-3,15,6,'#5c7978');outline(ctx,0,2,4,6,'#344f50');outline(ctx,11,-2,5,4,'#9dcfc1')}if(id==='escopeta'){outline(ctx,-9,-2,21,5,'#4f5751');outline(ctx,10,-2,16,3,'#899184');outline(ctx,7,2,8,4,'#96774c');outline(ctx,-1,3,4,5,'#5f4b38')}if(id==='misil'){outline(ctx,-13,-5,42,10,'#75815a');outline(ctx,-15,-6,5,12,'#394a40');outline(ctx,25,-6,6,12,'#46574a');outline(ctx,0,4,4,7,'#354535');ctx.fillStyle='#c1ac62';ctx.fillRect(19,-4,2,8)}if(id==='porra'){outline(ctx,-4,-2,23,4,'#78867b');outline(ctx,-5,-2,8,4,'#303f3a')}if(id==='katana'){outline(ctx,-7,-1,10,3,'#4c4e43');outline(ctx,3,-4,2,9,'#b2a96e');outline(ctx,6,-1,21,3,'#d6dfd2');ctx.fillStyle='#f2f2d4';ctx.fillRect(8,-1,20,1)}ctx.restore()}
 function human(ctx,asset,opt){
  const n=opt.size,meta=asset.parts,img=asset.partsImg,dir=opt.dir??direction(opt.aim||0),moveDir=opt.moveDir??dir,phase=opt.walkFrame??0;
  const torso=meta[dir],leg=meta[(opt.walking?2+phase%4:1)*8+moveDir],neutral=opt.neutralized;
  if(neutral){const p=meta[56+dir];source(ctx,img,p,n/2,n-1-p.h/2);return null}
  let bob=opt.walking&&(phase===1||phase===3)?-Math.max(1,n/32):0;
  const torsoTop=n-1-leg.h-torso.h+1+bob,torsoCenterY=torsoTop+torso.h/2;
  source(ctx,img,leg,n/2,n-1-leg.h/2);
  const a=opt.aim??angles[dir],w=weapons[opt.weapon],age=opt.attackPhase??-1;
  const origin={x:n/2,y:torsoTop+torso.h*.7},shY=torsoTop+torso.h*.62;
  let wa=a,recoil=0;if(w&&w.kind==='melee'&&age>=0&&age<1)wa+=(-.75+age*1.5)*(opt.weapon==='katana'?1.5:1.1);else if(w&&age>=0&&age<.4)recoil=Math.sin(age/.4*Math.PI)*n*.04;
  const pivot=transform(n*.18-recoil,0,wa,origin),nx=-Math.sin(a),ny=Math.cos(a),shoulders=[{x:n/2+nx*n*.18,y:shY+ny*n*.08},{x:n/2-nx*n*.18,y:shY-ny*n*.08}];
  let hands;if(w){hands=[transform(0,n*.07,wa,pivot),transform(w.support*n/32,n*.08,wa,pivot)]}else{hands=shoulders.map((p,i)=>({x:p.x+Math.cos(a)*n*.04,y:p.y+n*.2+(opt.walking?Math.sin((phase/4+i/2)*TAU)*n*.04:0)-(age>=0?n*.09:0)}))}
  function arms(){for(let i=1;i>=0;i--){const e=elbow(shoulders[i],hands[i],i?-1:1,n);bone(ctx,img,meta[48],shoulders[i],e,Math.max(2,Math.round(n*.1)));bone(ctx,img,meta[49],e,hands[i],Math.max(2,Math.round(n*.08)));source(ctx,img,meta[53],hands[i].x,hands[i].y,Math.max(2,Math.round(n*.1)),Math.max(2,Math.round(n*.1)),wa)}if(w){ctx.save();ctx.translate(pivot.x,pivot.y);ctx.rotate(wa);weapon(ctx,opt.weapon,n);ctx.restore();source(ctx,img,meta[53],hands[0].x,hands[0].y,Math.max(2,Math.round(n*.1)),Math.max(2,Math.round(n*.1)),wa)}}
  const behind=Math.sin(a)<-.2;if(behind)arms();source(ctx,img,torso,n/2,torsoCenterY);if(!behind)arms();
  return{origin,pivot,angle:wa,muzzle:w?transform(w.len*n/32,0,wa,pivot):hands[0]};
 }
 function actor(ctx,asset,opt){if(asset.human)return human(ctx,asset,opt);const n=opt.size,action=asset.actions[opt.anim||'Idle'],f=(opt.frame||0)%action.frames,dir=opt.dir??0;ctx.imageSmoothingEnabled=false;ctx.drawImage(asset.images[opt.anim||'Idle'],f*n,dir*n,n,n,0,0,n,n);return null}
 function crisp(ctx,w,h,palette){const data=ctx.getImageData(0,0,w,h),d=data.data,cache=new Map();for(let i=0;i<d.length;i+=4){if(d[i+3]<128){d[i]=d[i+1]=d[i+2]=d[i+3]=0;continue}d[i+3]=255;if(!palette)continue;const k=(d[i]<<16)|(d[i+1]<<8)|d[i+2];let c=cache.get(k);if(!c){let best=Infinity;for(const p of palette){const v=(d[i]-p[0])**2+(d[i+1]-p[1])**2+(d[i+2]-p[2])**2;if(v<best){best=v;c=p}}cache.set(k,c)}d[i]=c[0];d[i+1]=c[1];d[i+2]=c[2]}ctx.putImageData(data,0,0)}
 const api={weapons,angles,direction,human,actor,crisp,weapon};if(typeof module!=='undefined')module.exports=api;root.PixelArt=api;
})(typeof window!=='undefined'?window:globalThis);
