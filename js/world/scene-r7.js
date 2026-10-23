/* R7 reference template: world/collision stays planar; faces and shadows supply depth. */
G.SceneR7=(()=>{
 const TS=32,ID='M01-R7-BACKROOMS-MODULAR-25D';
 let materials=null,materialsReady=false,materialsPromise=null;
 function preload(){
  if(materialsPromise)return materialsPromise;
  materialsPromise=new Promise(resolve=>{materials=new Image();materials.onload=()=>{materialsReady=true;G.World?.invalidateGround?.();resolve();};materials.onerror=()=>resolve();materials.src='assets/scenarios/m01-r7/materiales-r7-v1.png';setTimeout(resolve,6000);});return materialsPromise;
 }
 const point=(x,y)=>({x:(x+.5)*TS,y:(y+.5)*TS});
 function generate(seed=1){
  const ref=G.SceneR7Data,blocks=[],rooms=[],blocked=new Set(),decor=[];
  const add=(id,x,y,w,h,kind='wall')=>{const b={id,x,y,w,h,kind};blocks.push(b);for(let yy=y;yy<y+h;yy++)for(let xx=x;xx<x+w;xx++)blocked.add(xx+','+yy);};
  function room(id,x,y,w,h,doors=3){
   const gap=14,mid=x+Math.floor((w-gap)/2),ymid=y+Math.floor((h-gap)/2);
   add(id+'-n1',x,y,mid-x,2);add(id+'-n2',mid+gap,y,x+w-mid-gap,2);add(id+'-s1',x,y+h-2,mid-x,2);add(id+'-s2',mid+gap,y+h-2,x+w-mid-gap,2);add(id+'-w',x,y+2,2,h-4);
   if(doors===3){add(id+'-e1',x+w-2,y+2,2,ymid-y-2);add(id+'-e2',x+w-2,ymid+gap,2,y+h-2-ymid-gap);}else add(id+'-e',x+w-2,y+2,2,h-4);
   const exits=[{...point(mid+gap/2,y-2),axis:'x'},{...point(mid+gap/2,y+h+1),axis:'x'}];if(doors===3)exits.push({...point(x+w+1,ymid+gap/2),axis:'y'});
   rooms.push({id,role:'coverroom',x,y,w,h,cx:x+w/2,cy:y+h/2,probe:point(x+8,y+8),doors:exits});
   add(id+'-equipment',x+Math.floor(w/2)-3,y+Math.floor(h/2)-2,6,3,y>210?'equipment':'furniture');
   // Smaller separated tables preserve several ways around the furnishing group.
   if(w>=44)add(id+'-archive',x+5,y+h-10,3,3,'archive');
  }
  [[48,22,62,44],[140,24,44,48],[210,23,44,46],[278,24,44,48]].forEach((v,i)=>room('suite-'+i,...v));
  [[177,105,40,38],[245,108,50,38],[177,174,40,42],[245,176,50,38]].forEach((v,i)=>room('module-'+i,...v));
  [[24,230,40,46],[88,220,44,54],[156,240,40,40],[220,228,46,52]].forEach((v,i)=>room('service-'+i,...v,2));
  for(const x of[52,105,148])for(const y of[105,145,190])add('plaza-pillar-'+x+'-'+y,x,y,2,2,'pillar');
  add('plaza-screen',29,199,23,2);add('plaza-screen2',120,85,28,2);
  for(const[x,y,h]of[[338,30,48],[382,43,43],[426,30,52],[338,110,64],[382,112,48],[426,117,60]])add('maze-'+x+'-'+y,x,y,2,h);
  add('maze-branch1',340,76,15,2);add('maze-branch2',405,80,21,2);add('maze-branch3',340,172,17,2);add('maze-branch4',405,175,21,2);
  [[330,213],[330,282],[447,213],[447,271]].forEach(([x,y],i)=>add('arena-pillar-'+i,x,y,2,2,'pillar'));
  const floorTiles=[],walls=[];for(let y=1;y<319;y++)for(let x=1;x<479;x++)(blocked.has(x+','+y)?walls:floorTiles).push([x,y]);
  const a=ref.anchors,entry=point(a.entry.tx,a.entry.ty),exit=point(a.door.tx,a.door.ty),bossSpawn=point(a.boss.tx,a.boss.ty),routeAnchor=point(a.hub.tx,a.hub.ty),terminalAnchor=point(a.terminal.tx,a.terminal.ty);
  const clear=(x,y)=>{for(let yy=y-1;yy<=y+1;yy++)for(let xx=x-1;xx<=x+1;xx++)if(xx<2||xx>477||yy<2||yy>317||blocked.has(xx+','+yy))return false;return true;};
  const spawnPoints=[];for(let y=4;y<317;y+=4)for(let x=4;x<477;x+=4)if(clear(x,y)&&Math.hypot(x-a.entry.tx,y-a.entry.ty)>=7)spawnPoints.push(point(x,y));
  for(const b of blocks)decor.push({type:'r7',r7:b,tx:b.x,ty:b.y,x:(b.x+b.w/2)*TS,y:(b.y+b.h)*TS,r:0,solid:false});
  const fixture={minX:0,maxX:479,minY:0,maxY:319,walls,props:[],layout:ID,staticNavigation:true,r7Blocks:blocks,r7Decor:decor};
  return{seed,layout:ID,layoutVersion:'R7-REF-RUNTIME-01',fixture,entry,exit,bossSpawn,routeAnchor,terminalAnchor,chestCandidates:ref.chestCandidates.map(c=>({id:c.id,...point(c.tx,c.ty)})),rooms,modules:blocks,floorTiles,spawnPoints};
 }
 function paintChunk(cx,cy,N,fixture,seed){
  const T=G.TrialVisuals?.mode==='16'?16:32,c=document.createElement('canvas');c.width=c.height=N*T;const x=c.getContext('2d');x.imageSmoothingEnabled=false;
  const rect=(col,a,b,w,h)=>{x.fillStyle=col;x.fillRect(Math.round(a),Math.round(b),Math.ceil(w),Math.ceil(h));};
  for(let y=0;y<N;y++)for(let xx=0;xx<N;xx++){
   const tx=cx*N+xx,ty=cy*N+y,ox=xx*T,oy=y*T,h=G.U.hash(tx,ty,seed),outside=tx<=0||tx>=479||ty<=0||ty>=319;
   const ivory=tx<40&&ty<60||tx>440&&ty>276,service=ty>218&&tx<315;
   rect(outside?'#131717':ivory?'#d6cba4':service?'#747762':'#a58b45',ox,oy,T,T);
   if(outside){rect('#3b4145',ox+1,oy+1,T-2,T-2);rect('#8b9892',ox+1,oy+1,T-2,1);continue;}
   if(materialsReady){const q=Math.floor(materials.width/2),patch=q/4,sx=(ivory?q:0)+(tx%4)*patch,sy=(ivory||service?q:0)+(ty%4)*patch;x.save();x.globalAlpha=.56;x.drawImage(materials,sx,sy,patch,patch,ox,oy,T,T);x.restore();}
   // Native pixel textile, restrained repetition and damp patches; no blurred actors.
   for(let k=0;k<5;k++){const v=G.U.hash(tx*9+k,ty,seed+23);rect(service?'#666e5c':ivory?'#c4bb96':h<.18?'#887640':'#9b8240',ox+Math.floor(v*(T-1)),oy+Math.floor(G.U.hash(tx,ty*7+k,seed+44)*(T-1)),1,1);}
   if((ivory||service)&&tx%4===0)rect(ivory?'#b9b18c':service?'#5d6862':'#937b3d',ox,oy,1,T);
   if((ivory||service)&&ty%4===0)rect(ivory?'#b9b18c':service?'#5d6862':'#937b3d',ox,oy,T,1);
   if(service&&h<.025||!ivory&&!service&&h<.002){rect('#474b40',ox+T*.2,oy+T*.3,T*.5,T*.4);for(let k=0;k<4;k++)rect('#7a7c66',ox+T*.24,oy+T*(.34+k*.08),T*.4,1);}
  }
  // Low wall shadows stay in the same chunk cache as the floor, clipped at its border.
  x.fillStyle='#11171030';for(const b of fixture.r7Blocks){if(b.kind!=='wall'&&b.kind!=='pillar')continue;if(b.x+b.w<cx*N||b.x>(cx+1)*N||b.y+b.h<cy*N||b.y>(cy+1)*N)continue;x.fillRect((b.x-cx*N)*T+T*.3,(b.y+b.h-cy*N)*T,T*b.w,T*.7);}
  for(const b of fixture.r7Blocks){if(b.kind!=='wall'||b.h>2||b.w<14)continue;for(let wx=b.x+3;wx<b.x+b.w-1;wx+=8){const px=(wx-cx*N)*T,py=(b.y+b.h-cy*N)*T;if(px< -T*4||px>N*T+T*4||py< -T*4||py>N*T+T*4)continue;const g=x.createRadialGradient(px,py,0,px,py,T*4);g.addColorStop(0,'#f5d27d32');g.addColorStop(1,'#f5d27d00');x.fillStyle=g;x.fillRect(px-T*4,py-T*4,T*8,T*8);}}
  return c;
 }
 function visibleProps(fixture,cam){return fixture.r7Decor.filter(p=>cam.sees(p.x,p.y,Math.max(p.r7.w,p.r7.h)*TS/2+80));}
 function drawProp(ctx,p,player){
  const b=p.r7,X=b.x*TS,Y=b.y*TS,W=b.w*TS,D=b.h*TS,wall=b.kind==='wall'||b.kind==='pillar',H=wall?52:24;
  const behind=player&&player.x>X-16&&player.x<X+W+16&&player.y>Y-H-25&&player.y<Y+D+8;
  ctx.save();ctx.imageSmoothingEnabled=false;if(behind)ctx.globalAlpha*=.32;
  const fill=(c,x,y,w,h)=>{ctx.fillStyle=c;ctx.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h));};
  if(wall){
   fill('#3b3928',X,Y+D-H,W,H);fill('#a38d48',X+2,Y+D-H+2,W-4,H-4);fill('#87743b',X,Y+D-12,W,12);
   if(materialsReady){const q=Math.floor(materials.width/2);ctx.save();ctx.globalAlpha*=.58;for(let xx=X;xx<X+W;xx+=96){const width=Math.min(96,X+W-xx);ctx.drawImage(materials,q,0,q/4,q,xx,Y+D-H,width,H-2);}ctx.restore();}
   for(let x=X+8;x<X+W;x+=32){fill('#8f7a3d',x,Y+D-H+7,1,H-20);fill('#bca75f',x+2,Y+D-H+9,2,18);}
   fill('#c8ae54',X,Y-H,W,D);fill('#e9d177',X,Y-H,W,3);fill('#6e6032',X+W-3,Y-H,3,D);
   if(b.h>b.w){fill('#736435',X+W-11,Y-H+3,11,D+H-3);fill('#e0c36d',X,Y-H,3,D);for(let yy=Y-H+24;yy<Y+D;yy+=32)fill('#5f552f',X+W-11,yy,11,2);}
   if(b.h<=2&&b.w>=14){for(let x=X+96;x<X+W-32;x+=256){ctx.save();ctx.shadowColor='#f3cf6a';ctx.shadowBlur=12;fill('#fff2c2',x,Y+D-H+6,36,4);ctx.restore();}}
  }else{
   for(let y=0;y<b.h;y++)for(let x=0;x<b.w;x+=2){const xx=X+x*TS+3,yy=Y+(y+1)*TS;fill('#171c1a',xx,yy-H,TS*1.75,H+TS*.45);fill(b.kind==='furniture'?'#827248':'#5d6868',xx+2,yy-H+2,TS*1.75-4,TS*.5);fill('#343d39',xx+2,yy-H+TS*.5,TS*1.75-4,H-2);if((x+y)%2===0){fill('#83c4bc',xx+7,yy-H+5,14,7);fill('#202a28',xx+5,yy-H+14,19,3);}else{fill('#b8af8b',xx+6,yy-H+5,18,4);fill('#7a7762',xx+6,yy-H+12,18,2);}}
  }ctx.restore();
 }
 return{generate,paintChunk,visibleProps,drawProp,preload,id:ID};
})();
