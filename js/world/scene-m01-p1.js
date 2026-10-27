/* LOT009 r2: explicit playable extract, not the complete 240x160 M01. */
G.SceneM01P1=(()=>{
 const TS=32,id='NIV-M01-P1-PILOTO-001',base='assets/scenarios/m01-p1/';
 let catalog=null,atlas=null,promise=null;
 const active=()=>new URLSearchParams(window.location.search).get('escenario')==='m01p1-piloto'&&G.MapTrial?.expanded===true;
 function preload(){
  if(promise)return promise;
  promise=(async()=>{
   const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),10000);
   try{
    const response=await fetch(base+'CATALOGO_PILOTO_001.json',{signal:controller.signal});
    if(!response.ok)throw Error('No se pudo cargar el catálogo del piloto M01.');
    const c=await response.json();
    const ids=['mostrador_recepcion','escritorio_monitor','archivadores_dobles','tabique_bajo_l','pilar','consola_tecnica','banco_taller','sillas_par'];
    if(c.id!==id||!Array.isArray(c.piezas)||c.piezas.length!==8||new Set(c.piezas.map(p=>p.id)).size!==8||c.piezas.some(p=>!ids.includes(p.id)))throw Error('Catálogo M01 incompatible.');
    for(const p of c.piezas){
     if(!Array.isArray(p.rectPx)||p.rectPx.length!==4||!Array.isArray(p.anclajePx)||p.anclajePx.length!==2||!Array.isArray(p.dibujoUnidades)||p.dibujoUnidades.length!==2)throw Error('Recorte M01 inválido.');
     const [x,y,w,h]=p.rectPx,[ax,ay]=p.anclajePx;
     if(![x,y,w,h,...p.anclajePx,...p.dibujoUnidades].every(Number.isFinite)||x<0||y<0||w<=0||h<=0||x+w>c.atlas.anchoPx||y+h>c.atlas.altoPx||ax<0||ay<0||ax>=w||ay>=h||p.dibujoUnidades.some(n=>n<=0))throw Error('Recorte M01 inválido.');
     const boxes=p.huellaSugerida?.cajasXYWH;if(!Array.isArray(boxes)||!boxes.length||boxes.some(b=>!Array.isArray(b)||b.length!==4||!b.every(Number.isFinite)||b[2]<=0||b[3]<=0))throw Error('Huella M01 inválida.');
    }
    atlas=await new Promise((resolve,reject)=>{const im=new Image(),timer=setTimeout(()=>reject(Error('Tiempo agotado al cargar el atlas M01.')),10000);im.onload=()=>{clearTimeout(timer);if(im.width!==c.atlas.anchoPx||im.height!==c.atlas.altoPx)reject(Error('Dimensiones de atlas M01 incompatibles.'));else resolve(im);};im.onerror=()=>{clearTimeout(timer);reject(Error('No se pudo cargar el atlas M01.'));};im.src=base+c.atlas.archivo;});
    catalog=c;G.World?.invalidateGround?.();
   }finally{clearTimeout(timeout);}
  })();return promise;
 }
 const point=(x,y)=>({x:x*TS,y:y*TS});
 function circleBox(x,y,r,b){const dx=x-Math.max(b.x,Math.min(x,b.x+b.w)),dy=y-Math.max(b.y,Math.min(y,b.y+b.h));return r===0?x>b.x&&x<b.x+b.w&&y>b.y&&y<b.y+b.h:dx*dx+dy*dy<r*r;}
 function blocked(f,x,y,r=12){return x-r<32||y-r<32||x+r>55*TS||y+r>41*TS||f.boxes.some(b=>circleBox(x,y,r,b));}
 function collide(f,e){
  let hit=false;const r=e.r;
  for(let pass=0;pass<4;pass++){
   const x=e.x,y=e.y;e.x=Math.max(32+r,Math.min(55*TS-r,e.x));e.y=Math.max(32+r,Math.min(41*TS-r,e.y));hit=hit||x!==e.x||y!==e.y;
   for(const b of f.boxes){if(!circleBox(e.x,e.y,r,b))continue;hit=true;const qx=Math.max(b.x,Math.min(e.x,b.x+b.w)),qy=Math.max(b.y,Math.min(e.y,b.y+b.h)),dx=e.x-qx,dy=e.y-qy,d=Math.hypot(dx,dy);
    if(d>1e-8){e.x+=dx/d*(r-d);e.y+=dy/d*(r-d);}else{const distances=[e.x-b.x,b.x+b.w-e.x,e.y-b.y,b.y+b.h-e.y],side=distances.indexOf(Math.min(...distances));if(side===0)e.x=b.x-r;else if(side===1)e.x=b.x+b.w+r;else if(side===2)e.y=b.y-r;else e.y=b.y+b.h+r;}
   }
  }return hit;
 }
 function generate(seed=1){
  if(!catalog||!atlas)throw Error('El piloto M01 debe estar cargado antes de empezar.');
  const blocks=[],props=[],boxes=[],walls=[],wallSet=new Set();
  const wall=(name,x,y,w,h)=>{blocks.push({id:name,x,y,w,h,kind:'wall'});boxes.push({x:x*TS,y:y*TS,w:w*TS,h:h*TS});for(let yy=y;yy<y+h;yy++)for(let xx=x;xx<x+w;xx++){walls.push([xx,yy]);wallSet.add(xx+','+yy);}};
  // Office: independent west and south accesses, each six tiles wide.
  wall('office-n',24,5,23,1);wall('office-e',46,6,1,17);wall('office-w-n',24,6,1,5);wall('office-w-s',24,17,1,6);wall('office-s-w',24,23,8,1);wall('office-s-e',38,23,9,1);
  wall('reception-n',4,4,14,1);wall('reception-w',4,5,1,4);wall('plaza-screen',7,25,7,1);
  const place=(piece,x,y)=>{const spec=catalog.piezas.find(p=>p.id===piece),p={type:'m01p1',piece,spec,...point(x,y),r:0,solid:false};props.push(p);for(const [dx,dy,w,h]of spec.huellaSugerida.cajasXYWH)boxes.push({x:p.x+dx,y:p.y+dy,w,h});};
  place('mostrador_recepcion',12,11);place('escritorio_monitor',34,13);place('archivadores_dobles',41,9);place('tabique_bajo_l',24,29);place('pilar',17,28);place('pilar',43,32);place('consola_tecnica',42,19);place('banco_taller',37,31);place('sillas_par',34,16);place('sillas_par',10,18);
  for(const x of [28,32,36]){place('escritorio_monitor',x,9);place('sillas_par',x,11);}
  place('archivadores_dobles',43,7);place('archivadores_dobles',8,7);place('consola_tecnica',17,8);
  for(const x of [9,15]){place('escritorio_monitor',x,21);place('sillas_par',x,23);}
  place('pilar',19,8);place('pilar',29,36);place('tabique_bajo_l',30,34);place('banco_taller',8,34);place('consola_tecnica',19,37);
  const f={props,boxes},entry=point(10.5,13.5),exit=point(48.5,36.5),bossSpawn=point(41.5,35.5),routeAnchor=point(30.5,29.5),terminalAnchor=point(16.5,18.5);
  const floorTiles=[],spawnPoints=[];for(let y=1;y<41;y++)for(let x=1;x<55;x++){if(!wallSet.has(x+','+y))floorTiles.push([x,y]);const p=point(x+.5,y+.5);if(x%3===1&&y%3===1&&!blocked(f,p.x,p.y,30)&&Math.hypot(p.x-entry.x,p.y-entry.y)>220)spawnPoints.push(p);}
  const r7Decor=blocks.map(b=>({type:'r7',r7:b,x:(b.x+b.w/2)*TS,y:(b.y+b.h)*TS,r:0,solid:false}));
  const fixture={minX:0,maxX:55,minY:0,maxY:41,walls,props:[],layout:id,sceneRevision:id,staticNavigation:true,m01p1:f,r7Blocks:blocks,r7Decor};
  const rooms=[{id:'office',role:'coverroom',x:24,y:5,w:23,h:19,probe:point(34,16),doors:[point(24.5,14),point(35,23.5)]}];
  const chestCandidates=[[20.5,20.5],[37.5,19.5],[10.5,32.5],[45.5,28.5]].map(([x,y],i)=>({id:'m01p1-chest-'+i,...point(x,y)}));
  return{seed,layout:id,layoutVersion:'pilot-r1',fixture,entry,exit,bossSpawn,routeAnchor,terminalAnchor,chestCandidates,rooms,modules:blocks,floorTiles,spawnPoints,families:['recepcion','oficina-dos-accesos','plaza']};
 }
 function paintChunk(cx,cy,N,fixture,seed){return G.SceneR7.paintChunk(cx,cy,N,{...fixture,sceneRevision:'NIV-ESC-008-A-r1'},seed);}
 function visibleProps(fixture,cam){return [...G.SceneR7.visibleProps(fixture,cam),...fixture.m01p1.props.filter(p=>cam.sees(p.x,p.y,130))];}
 function drawProp(ctx,p){const [sx,sy,sw,sh]=p.spec.rectPx,[w,h]=p.spec.dibujoUnidades,[ax,ay]=p.spec.anclajePx;ctx.save();ctx.imageSmoothingEnabled=false;ctx.drawImage(atlas,sx,sy,sw,sh,p.x-ax/sw*w,p.y-ay/sh*h,w,h);ctx.restore();}
 return{active,preload,generate,blocked,collide,paintChunk,visibleProps,drawProp,id};
})();
