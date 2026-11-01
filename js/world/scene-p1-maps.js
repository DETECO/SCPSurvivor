/* Four seeded P1 scene trials. Geometry, props and collision share a fixture. */
(function(root,factory){const api=factory(root);if(typeof module==='object'&&module.exports)module.exports=api;if(root.G)root.G.SceneP1Full=api;})(globalThis,root=>{
 const TS=32,W=240,H=160,BUCKET=256,ids=['m01','m02','m03','m04'],store=new Map();let pending=null;
 const configs={
  m01:{name:'Complejo Liminal',file:'assets/scenarios/m01-p1/CATALOGO_PILOTO_001.json',floor:'#a79564',fleck:'#776a4d',wall:'#a9976c',trim:'#514d40',light:'#f4c66d',roles:['recepcion','administracion','oficinas','laberinto','servicios','talleres','nucleo','plaza'],pieces:['mostrador_recepcion','escritorio_monitor','archivadores_dobles','tabique_bajo_l','pilar','consola_tecnica','banco_taller','sillas_par']},
  m02:{name:'Dársena de Transferencia',file:'assets/scenarios/m02-p1/atlas-p1-001.json',floor:'#64777b',fleck:'#43575c',wall:'#829397',trim:'#364951',light:'#93d7df',roles:['inspeccion','clasificacion','nave_norte','muelle','maquinaria','reparaciones','carga_sur','servicios'],pieces:['contenedor','paleta_cajas','estanteria_carga','tanque_tuberias','consola','valla_corta','pilar','banco_taller']},
  m03:{name:'Invernadero de Contención',file:'assets/scenarios/m03-p1/atlas-p1-001.json',floor:'#9a9d77',fleck:'#737958',wall:'#a7a484',trim:'#586553',light:'#d7df91',roles:['aclimatacion','muestras','cultivo_norte','semillas','patio','fluidos','cultivo_sur','taller'],pieces:['jardinera_larga','jardinera_corta','cilindro_cultivo','banco_laboratorio','estante_cultivo','maquinaria_valvula','pilar','gabinete']},
  m04:{name:'Archivo de Cuarentena',file:'assets/scenarios/m04-p1/atlas-p1-001.json',floor:'#b3aa91',fleck:'#807b6d',wall:'#c1b8a5',trim:'#73535b',light:'#f0ca85',roles:['recepcion','triaje','archivo_norte','catalogacion','investigacion','revision','archivo_sur','servicios'],pieces:['archivadores','estanteria_archivo','mostrador','escritorio','tabique_esquina','carro_clinico','pilar','armario_clinico']}
 };
 // Each approved environment has its own arrangement of open zones.
 const zones={
  m01:[[12,14,36,28],[68,14,36,28],[124,14,36,28],[180,14,36,28],[12,101,36,28],[68,101,36,28],[124,101,36,28],[180,101,36,28]],
  m02:[[8,15,42,22],[70,12,30,34],[120,18,44,20],[184,10,32,32],[10,105,40,22],[68,96,34,32],[122,106,42,22],[184,99,32,30]],
  m03:[[12,17,36,24],[66,10,38,26],[127,18,32,24],[177,13,39,26],[14,100,32,26],[69,108,35,22],[122,98,39,27],[182,105,32,24]],
  m04:[[12,13,34,30],[70,18,32,23],[122,12,38,28],[181,18,34,23],[12,104,34,27],[68,98,36,29],[126,107,32,22],[181,99,34,29]]
 };
 function rng(seed){let n=seed>>>0;return()=>((n=(Math.imul(n,1664525)+1013904223)>>>0)/4294967296);}
 function shuffled(a,r){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
 function mapFor(seed,number){const i=Math.max(1,Math.floor(number))-1,round=Math.floor(i/4),offset=i%4,r=rng((seed^Math.imul(round+1,0x9e3779b9)^0x139be31)>>>0);return round===0?['m01',...shuffled(ids.slice(1),r)][offset]:shuffled(ids,r)[offset];}
 const point=(x,y)=>({x:(x+.5)*TS,y:(y+.5)*TS});
 function circleBox(x,y,r,b){const dx=x-Math.max(b.x,Math.min(x,b.x+b.w)),dy=y-Math.max(b.y,Math.min(y,b.y+b.h));return r===0?x>b.x&&x<b.x+b.w&&y>b.y&&y<b.y+b.h:dx*dx+dy*dy<r*r;}
 function addBox(f,b){f.boxes.push(b);for(let y=Math.floor(b.y/BUCKET);y<=Math.floor((b.y+b.h)/BUCKET);y++)for(let x=Math.floor(b.x/BUCKET);x<=Math.floor((b.x+b.w)/BUCKET);x++){const k=x+','+y;(f.buckets[k]||(f.buckets[k]=[])).push(b);}}
 function nearby(f,x,y,r){const out=[];for(let yy=Math.floor((y-r)/BUCKET);yy<=Math.floor((y+r)/BUCKET);yy++)for(let xx=Math.floor((x-r)/BUCKET);xx<=Math.floor((x+r)/BUCKET);xx++)out.push(...(f.buckets[xx+','+yy]||[]));return out;}
 function blocked(f,x,y,r=12){return x-r<TS||y-r<TS||x+r>(W-1)*TS||y+r>(H-1)*TS||nearby(f,x,y,r).some(b=>circleBox(x,y,r,b));}
 function collide(f,e){let hit=false;for(let pass=0;pass<4;pass++){
  const ox=e.x,oy=e.y;e.x=Math.max(TS+e.r,Math.min((W-1)*TS-e.r,e.x));e.y=Math.max(TS+e.r,Math.min((H-1)*TS-e.r,e.y));if(e.x!==ox||e.y!==oy)hit=true;
  for(const b of nearby(f,e.x,e.y,e.r)){if(!circleBox(e.x,e.y,e.r,b))continue;hit=true;const qx=Math.max(b.x,Math.min(e.x,b.x+b.w)),qy=Math.max(b.y,Math.min(e.y,b.y+b.h)),dx=e.x-qx,dy=e.y-qy,d=Math.hypot(dx,dy);
   if(d>1e-8){e.x+=dx/d*(e.r-d);e.y+=dy/d*(e.r-d);}else{const ds=[e.x-b.x,b.x+b.w-e.x,e.y-b.y,b.y+b.h-e.y],side=ds.indexOf(Math.min(...ds));if(side===0)e.x=b.x-e.r;else if(side===1)e.x=b.x+b.w+e.r;else if(side===2)e.y=b.y-e.r;else e.y=b.y+b.h+e.r;}}
 }return hit;}
 function generate(id,seed=1,catalog){
  const cfg=configs[id];if(!cfg)throw Error('Mapa P1 desconocido');catalog=catalog||store.get(id)?.catalog;if(!catalog)throw Error('Mapa P1 sin recursos cargados');
  const random=rng((seed^((ids.indexOf(id)+1)*0x51ed270b))>>>0),f={id,props:[],boxes:[],buckets:{},blocks:[],lights:[]},rooms=[],walls=[],wallSet=new Set(),modules=[];
  const addWall=(name,x,y,w,h)=>{if(w<=0||h<=0)return;const b={id:name,x,y,w,h,kind:'wall'};f.blocks.push(b);modules.push(b);addBox(f,{x:x*TS,y:y*TS,w:w*TS,h:h*TS});if(h===1&&w>=8)for(let dx=64;dx<w*TS-32;dx+=192)f.lights.push({x:x*TS+dx+16,y:(y+h)*TS-44});for(let yy=y;yy<y+h;yy++)for(let xx=x;xx<x+w;xx++){const k=xx+','+yy;if(!wallSet.has(k)){wallSet.add(k);walls.push([xx,yy]);}}};
  const place=(piece,x,y)=>{const spec=catalog.piezas.find(p=>p.id===piece);if(!spec)throw Error('Pieza P1 ausente: '+piece);const p={type:'p1-object',piece,spec,...point(x,y),r:0,solid:false};f.props.push(p);for(const b of(spec.huellaSugerida||spec.huellaPropuesta)?.cajasXYWH||[])addBox(f,{x:p.x+b[0],y:p.y+b[1],w:b[2],h:b[3]});};
  // Visible perimeter in short chunks, aligned with the movement boundary.
  for(let x=0;x<W;x+=16){addWall(id+'-borde-n-'+x,x,0,Math.min(16,W-x),1);addWall(id+'-borde-s-'+x,x,H-1,Math.min(16,W-x),1);}
  for(let y=1;y<H-1;y+=16){addWall(id+'-borde-o-'+y,0,y,1,Math.min(16,H-1-y));addWall(id+'-borde-e-'+y,W-1,y,1,Math.min(16,H-1-y));}
  for(let n=0;n<8;n++){
   const [x,y,w,h]=zones[id][n],mid=x+Math.floor(w/2)+(Math.floor(random()*3)-1)*2,gap=8;
   const variation=Math.floor(random()*3),name=id+'-'+cfg.roles[n];
   // Two broad openings remain in every zone; optional short side adds variety.
   addWall(name+'-n1',x,y,mid-gap/2-x,1);addWall(name+'-n2',mid+gap/2,y,x+w-mid-gap/2,1);
   if(!(id==='m03'&&n%2===0)&&!(id==='m02'&&n%3===1)){addWall(name+'-s1',x,y+h-1,mid-gap/2-x,1);addWall(name+'-s2',mid+gap/2,y+h-1,x+w-mid-gap/2,1);}
   if(variation!==0&&!(id==='m03'&&n%2===0))addWall(name+'-side',variation===1?x:x+w-1,y+3,1,h-6);
   const doors=[point(mid,y-1),point(mid,y+h)];rooms.push({id:name,role:cfg.roles[n],x,y,w,h,doors});
   const cx=x+Math.floor(w/2),cy=y+Math.floor(h/2),patterns={
    m01:[[-7,-7],[6,-6],[-8,-1],[7,1],[-6,6],[5,7],[-3,-5],[4,-3],[-4,3],[3,4]],
    m02:[[-8,-7],[7,-6],[-7,-1],[6,1],[-8,6],[5,6],[-3,-4],[4,-3],[-4,3],[3,4]],
    m03:[[-7,-7],[1,-7],[8,-4],[-8,1],[7,3],[-5,7],[-3,-4],[4,-3],[-4,3],[3,4]],
    m04:[[-8,-6],[5,-8],[-6,-1],[8,0],[-8,6],[6,7],[-3,-4],[4,-3],[-4,3],[3,4]]
   };
   const locs=[[x+4,y+5],[x+w-5,y+5],[x+4,y+h-5],[x+w-5,y+h-5],...patterns[id].map(([dx,dy])=>[cx+dx,cy+dy])],rotation=Math.floor(random()*cfg.pieces.length);
   for(let j=0;j<locs.length;j++){const offset=(n*3+j+rotation)%cfg.pieces.length,dx=Math.floor(random()*3)-1,dy=Math.floor(random()*3)-1,px=locs[j][0]+dx,py=locs[j][1]+dy;
    if(n===0&&Math.hypot(px-cx,py-(cy+5))<6)continue;
    place(cfg.pieces[offset],px,py);
   }
  }
  // Short, separated barriers and furniture define the middle of the level while
  // preserving routes around both ends for the player and pursuing enemies.
  for(let n=0;n<4;n++){
   const cx=[28,82,140,198][n],shift=Math.floor(random()*5)-2;
   addWall(id+'-centro-'+n+'-n',cx-9+shift,59+(n%2)*3,10+(n%3)*2,1);
   addWall(id+'-centro-'+n+'-s',cx-3-shift,91-(n%2)*3,10+(n%2)*3,1);
   const points=[[cx-10,70],[cx+8,70],[cx-7,81],[cx+9,82]],turn=Math.floor(random()*cfg.pieces.length);
   for(let j=0;j<points.length;j++)place(cfg.pieces[(turn+j+n)%cfg.pieces.length],points[j][0],points[j][1]);
  }
  const first=rooms[0],entry=point(first.x+Math.floor(first.w/2),first.y+Math.floor(first.h/2)),exit=point(231,80),bossSpawn=point(211,80),routeAnchor=point(120,80),terminalAnchor=point(first.x+Math.floor(first.w/2),first.y+Math.floor(first.h/2)+5);
  const chestCandidates=[[57,72],[115,72],[171,72],[57,88],[115,88],[171,88]].map(([x,y],i)=>({id:id+'-cofre-'+i,...point(x,y)}));
  const floorTiles=[],spawnPoints=[];for(let y=1;y<H-1;y++)for(let x=1;x<W-1;x++){if(!wallSet.has(x+','+y))floorTiles.push([x,y]);if(x%3===1&&y%3===1){const p=point(x,y);if(Math.hypot(p.x-entry.x,p.y-entry.y)>220&&!blocked(f,p.x,p.y,30))spawnPoints.push(p);}}
  f.decor=f.blocks.map(b=>({type:'p1-wall',p1:b,x:(b.x+b.w/2)*TS,y:(b.y+b.h)*TS,r:0,solid:false}));
  const fixture={minX:0,maxX:W-1,minY:0,maxY:H-1,walls,props:[],layout:'NIV-'+id.toUpperCase()+'-P1',sceneRevision:'NIV-ESC-008-A-r1',staticNavigation:true,p1full:f};
  return{seed,layout:fixture.layout,layoutVersion:'P1-local-r1',name:cfg.name,fixture,entry,exit,bossSpawn,routeAnchor,terminalAnchor,chestCandidates,rooms,modules,floorTiles,spawnPoints};
 }
 function preload(){if(pending)return pending;pending=Promise.all(ids.map(async id=>{const cfg=configs[id],response=await fetch(cfg.file);if(!response.ok)throw Error('No se pudo cargar '+cfg.name);const c=await response.json(),meta=c.atlas||c.imagen;if(!meta||!Array.isArray(c.piezas)||c.piezas.length!==8||!cfg.pieces.every(p=>c.piezas.some(q=>q.id===p)))throw Error('Catálogo P1 inválido: '+id);
  const url=cfg.file.slice(0,cfg.file.lastIndexOf('/')+1)+meta.archivo,im=await new Promise((resolve,reject)=>{const image=new Image(),timer=setTimeout(()=>reject(Error('Tiempo de carga de '+id)),10000);image.onload=()=>{clearTimeout(timer);if(image.width!==meta.anchoPx||image.height!==meta.altoPx)reject(Error('Atlas incompatible '+id));else resolve(image)};image.onerror=()=>{clearTimeout(timer);reject(Error('No se pudo cargar atlas '+id))};image.src=url;});store.set(id,{catalog:c,image:im});}).concat([loadWalls()]));return pending;}
 async function loadWalls(){const base='assets/scenarios/m01-p1/',r=await fetch(base+'muros-p1-001.json');if(!r.ok)throw Error('No se pudo cargar paredes M01');const c=await r.json(),meta=c.imagen;if(!meta||!c.piezas?.some(p=>p.id==='pared_frente'))throw Error('Catálogo de paredes M01 inválido');const image=await new Promise((resolve,reject)=>{const im=new Image(),timer=setTimeout(()=>reject(Error('Tiempo de carga de paredes M01')),10000);im.onload=()=>{clearTimeout(timer);if(im.width!==meta.anchoPx||im.height!==meta.altoPx)reject(Error('Atlas de paredes M01 incompatible'));else resolve(im);};im.onerror=()=>{clearTimeout(timer);reject(Error('No se pudo cargar atlas de paredes M01'));};im.src=base+meta.archivo;});store.set('walls',{catalog:c,image});}
 function active(){return root.G?.MapTrial?.enabled===true&&!!root.window&&new URLSearchParams(root.window.location.search).get('escenario')==='p1-cuatro';}
 // Direct map inspection is restricted to an active trial and its first sector.
 function forGame(seed,number){const wanted=active()?new URLSearchParams(root.window.location.search).get('vistamapa'):null;return number===1&&ids.includes(wanted)?wanted:mapFor(seed,number);}
 function paintChunk(cx,cy,N,fixture,seed){const T=root.G.TrialVisuals?.mode==='16'?16:32,c=root.G.SceneR7.paintChunk(cx,cy,N,{...fixture,r7Blocks:[],sceneRevision:'NIV-ESC-008-A-r1'},seed);const x=c.getContext('2d'),id=fixture.p1full.id,cfg=configs[id];x.imageSmoothingEnabled=false;
  if(id!=='m01'){x.save();x.globalAlpha=id==='m02'?.72:id==='m03'?.48:.38;x.fillStyle=cfg.floor;x.fillRect(0,0,c.width,c.height);x.restore();}
  for(let j=0;j<N;j++)for(let i=0;i<N;i++){const tx=cx*N+i,ty=cy*N+j,ox=i*T,oy=j*T;if(tx<=0||ty<=0||tx>=W-1||ty>=H-1)continue;const h=root.G.U.hash(tx,ty,seed);x.fillStyle=cfg.fleck;x.globalAlpha=.16;if(id!=='m01'){x.fillRect(ox,oy,T,1);x.fillRect(ox,oy,1,T);}if(h<.014)x.fillRect(ox+T*.25,oy+T*.25,T*.5,2);x.globalAlpha=1;}
  return c;
 }
 function visibleProps(fixture,cam){const f=fixture.p1full;return [...f.decor.filter(p=>cam.sees(p.x,p.y,Math.max(p.p1.w,p.p1.h)*TS/2+80)),...f.props.filter(p=>cam.sees(p.x,p.y,180))];}
 function drawProp(ctx,p,fixture,player){const id=fixture.p1full.id,cfg=configs[id];ctx.save();ctx.imageSmoothingEnabled=false;
  if(p.type==='p1-object'){const [sx,sy,sw,sh]=p.spec.rectPx,[w,h]=p.spec.dibujoUnidades,[ax,ay]=p.spec.anclajePx,im=store.get(id)?.image;if(im)ctx.drawImage(im,sx,sy,sw,sh,p.x-ax/sw*w,p.y-ay/sh*h,w,h);}
  else{const b=p.p1,X=b.x*TS,Y=b.y*TS,W=b.w*TS,D=b.h*TS,H=52;const behind=player&&player.x>X-16&&player.x<X+W+16&&player.y>Y-H-25&&player.y<Y+D+8;if(behind)ctx.globalAlpha=.55;
   ctx.fillStyle='#0005';ctx.fillRect(X+8,Y+D,W,18);ctx.fillStyle=cfg.trim;ctx.fillRect(X,Y+D-H,W,H);ctx.fillStyle=cfg.wall;ctx.fillRect(X+2,Y+D-H+2,Math.max(1,W-4),H-8);ctx.fillStyle=cfg.trim;ctx.fillRect(X,Y+D-10,W,10);ctx.fillStyle=cfg.wall;ctx.fillRect(X,Y-H,W,D);ctx.fillStyle='#ffffff66';ctx.fillRect(X,Y-H,W,3);
   ctx.fillStyle=cfg.trim;ctx.globalAlpha*=.42;for(let xx=X+32;xx<X+W;xx+=32)ctx.fillRect(xx,Y+D-H+6,2,H-16);ctx.globalAlpha=behind?.55:1;
   if(b.w>=8){ctx.fillStyle=cfg.light;for(let xx=X+64;xx<X+W-32;xx+=192){ctx.save();ctx.shadowColor=cfg.light;ctx.shadowBlur=15;ctx.fillRect(xx,Y+D-H+8,32,5);ctx.restore();}}
   if(id==='m01'&&b.w>=3){const wall=catalogPiece('walls','pared_frente'),wallIm=store.get('walls')?.image;if(wall&&wallIm){const [sx,sy,sw,sh]=wall.rectPx;for(let xx=X;xx<X+W;xx+=100){const ww=Math.min(100,X+W-xx),hh=ww*sh/sw;ctx.drawImage(wallIm,sx,sy,sw,sh,xx,Y+D-hh,ww,hh);}}}
   const pillar=catalogPiece(id,'pilar'),im=store.get(id)?.image;if(pillar&&im&&b.w>=8){const [sx,sy,sw,sh]=pillar.rectPx;for(let xx=X+12;xx<X+W;xx+=192){const pw=25,ph=pw*sh/sw;ctx.drawImage(im,sx,sy,sw,sh,xx-pw/2,Y+D-ph,pw,ph);}}}
  ctx.restore();
 }
 function catalogPiece(id,piece){return store.get(id)?.catalog?.piezas.find(p=>p.id===piece);}
 return{ids,configs,mapFor,forGame,generate,blocked,collide,preload,active,paintChunk,visibleProps,drawProp};
});
