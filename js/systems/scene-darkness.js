/* Trial darkness: independent rift roll, clock-based map fade, geometry-aware light. */
(function(root,factory){const api=factory(root);if(typeof module==='object'&&module.exports)module.exports=api;if(root.G)root.G.SceneDarkness=api;})(globalThis,root=>{
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));let canvas=null;
 function mapDarkness(seconds){return clamp(((Number(seconds)||0)-120)/180,0,1)*.82;}
 function rollRift(rng){return rng()<.25;}
 function rectEdges(b){const p=[[b.x,b.y],[b.x+b.w,b.y],[b.x+b.w,b.y+b.h],[b.x,b.y+b.h]];return p.map((a,i)=>[a,p[(i+1)%p.length]]);}
 function rayDistance(o,angle,range,edges){const dx=Math.cos(angle),dy=Math.sin(angle);let best=range;
  for(const [a,b] of edges){const sx=b[0]-a[0],sy=b[1]-a[1],den=dx*sy-dy*sx;if(Math.abs(den)<1e-9)continue;const ax=a[0]-o.x,ay=a[1]-o.y,t=(ax*sy-ay*sx)/den,u=(ax*dy-ay*dx)/den;if(t>=0&&t<best&&u>=0&&u<=1)best=t;}return best;}
 function visibility(origin,angle,half,range,edges){const angles=[];for(let i=0;i<=72;i++)angles.push(-half+2*half*i/72);
  for(const segment of edges)for(const p of segment){const a=Math.atan2(Math.sin(Math.atan2(p[1]-origin.y,p[0]-origin.x)-angle),Math.cos(Math.atan2(p[1]-origin.y,p[0]-origin.x)-angle));if(a>-half&&a<half)angles.push(a-.0002,a,a+.0002);}
  return angles.filter(a=>a>=-half&&a<=half).sort((a,b)=>a-b).map(a=>{const d=rayDistance(origin,angle+a,range,edges);return{x:origin.x+Math.cos(angle+a)*d,y:origin.y+Math.sin(angle+a)*d,distance:d};});
 }
 function segmentsFor(fixture,origin,range){if(!fixture)return[];const out=[],near=b=>b.x<=origin.x+range&&b.x+b.w>=origin.x-range&&b.y<=origin.y+range&&b.y+b.h>=origin.y-range;
  if(fixture.p1full||fixture.m01p1){for(const b of(fixture.p1full||fixture.m01p1).boxes)if(near(b))out.push(...rectEdges(b));}
  else if(fixture.riftArt){for(const b of fixture.riftArt.structures){const p=b.foot.map(a=>root.G.RiftRooms.point(a)),lo={x:Math.min(...p.map(q=>q.x)),y:Math.min(...p.map(q=>q.y))},hi={x:Math.max(...p.map(q=>q.x)),y:Math.max(...p.map(q=>q.y))};if(!near({x:lo.x,y:lo.y,w:hi.x-lo.x,h:hi.y-lo.y}))continue;for(let i=0;i<p.length;i++)out.push([[p[i].x,p[i].y],[p[(i+1)%p.length].x,p[(i+1)%p.length].y]]);}}
  else if(fixture.r7Blocks){for(const b of fixture.r7Blocks){const v={x:b.x*32,y:b.y*32,w:b.w*32,h:b.h*32};if(near(v))out.push(...rectEdges(v));}}
  else for(const [tx,ty] of fixture.walls||[]){const b={x:tx*32,y:ty*32,w:32,h:32};if(near(b))out.push(...rectEdges(b));}
  return out;
 }
 function ambientLights(fixture,camera){let lights=fixture?.p1full?.lights||[];
  if(fixture?.riftArt&&root.G?.RiftRooms)lights=[180,440,760,1110,1360].map(x=>root.G.RiftRooms.point([x,190])).concat([260,760,1260].map(x=>root.G.RiftRooms.point([x,824])));
  const expedition=root.G?.Expedition?.state;if(!root.G?.RiftExpedition?.state?.active&&expedition?.v2?.doorOpen&&expedition.exit)lights=lights.concat([{x:expedition.exit.x,y:expedition.exit.y}]);
  const left=camera.left(),top=camera.top(),cx=left+camera.w/2,cy=top+camera.h/2;
  return lights.filter(p=>p.x>=left-110&&p.x<=left+camera.w+110&&p.y>=top-110&&p.y<=top+camera.h+110).sort((a,b)=>Math.hypot(a.x-cx,a.y-cy)-Math.hypot(b.x-cx,b.y-cy)).slice(0,6);
 }
 function enabled(){const q=root.window?new URLSearchParams(root.window.location.search):null;return root.G?.MapTrial?.infinite===true&&(root.G.SceneP1Full?.active?.()===true||q?.get('luz')==='prueba');}
 function current(){if(!enabled())return 0;const e=root.G.Expedition?.state,r=root.G.RiftExpedition?.state;if(r?.active)return r.darkness?.82:0;return mapDarkness(e?.v2?.mapTime||0);}
 function on(){return current()>.12;}
 function equipProgress(seconds,rift){const start=rift?0:120+180*.12/.82;return clamp(((Number(seconds)||0)-start)/.65,0,1);}
 function progress(){if(!on())return 0;const r=root.G.RiftExpedition?.state,e=root.G.Expedition?.state;return equipProgress(r?.active?r.time:e?.v2?.mapTime,!!r?.active);}
 function draw(ctx,player,camera){const alpha=current();if(alpha<=0||!player||!camera)return;
  const scale=.5,w=Math.max(1,Math.ceil(camera.w*scale)),h=Math.max(1,Math.ceil(camera.h*scale));if(!canvas)canvas=document.createElement('canvas');if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;}const c=canvas.getContext('2d');c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,w,h);c.fillStyle=`rgba(3,8,15,${alpha})`;c.fillRect(0,0,w,h);c.setTransform(scale,0,0,scale,-camera.left()*scale,-camera.top()*scale);c.globalCompositeOperation='destination-out';
  for(const lamp of ambientLights(root.G.World.fixture,camera)){const radius=110,polygon=visibility(lamp,0,Math.PI,radius,segmentsFor(root.G.World.fixture,lamp,radius));c.save();c.globalAlpha=.48;c.beginPath();c.moveTo(lamp.x,lamp.y);for(const p of polygon)c.lineTo(p.x,p.y);c.closePath();c.clip();const glow=c.createRadialGradient(lamp.x,lamp.y,0,lamp.x,lamp.y,radius);glow.addColorStop(0,'rgba(0,0,0,.95)');glow.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=glow;c.fillRect(lamp.x-radius,lamp.y-radius,radius*2,radius*2);c.restore();}
  const mount=player._sceneFlashlight,aim=Number.isFinite(mount?.aim)?mount.aim:Number.isFinite(player.weaponAim)?player.weaponAim:Number.isFinite(player.aim)?player.aim:0,origin=mount&&Number.isFinite(mount.x)&&Number.isFinite(mount.y)?mount:{x:player.x+Math.cos(aim)*13,y:player.y+Math.sin(aim)*13},near=c.createRadialGradient(player.x,player.y,0,player.x,player.y,64);near.addColorStop(0,'rgba(0,0,0,.92)');near.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=near;c.fillRect(player.x-64,player.y-64,128,128);
  if(on()){const range=340,polygon=visibility(origin,aim,.58,range,segmentsFor(root.G.World.fixture,origin,range));c.save();c.globalAlpha=progress();c.beginPath();c.moveTo(origin.x,origin.y);for(const p of polygon)c.lineTo(p.x,p.y);c.closePath();c.clip();const grad=c.createRadialGradient(origin.x,origin.y,0,origin.x,origin.y,range);grad.addColorStop(0,'rgba(0,0,0,.97)');grad.addColorStop(.65,'rgba(0,0,0,.82)');grad.addColorStop(1,'rgba(0,0,0,.1)');c.fillStyle=grad;c.fillRect(origin.x-range,origin.y-range,range*2,range*2);c.restore();}
  c.globalCompositeOperation='source-over';ctx.save();ctx.imageSmoothingEnabled=true;ctx.drawImage(canvas,camera.left(),camera.top(),camera.w,camera.h);ctx.restore();
 }
 return{enabled,mapDarkness,rollRift,rectEdges,rayDistance,visibility,segmentsFor,ambientLights,current,on,equipProgress,progress,draw};
});
