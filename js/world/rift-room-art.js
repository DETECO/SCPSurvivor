/* C1-r2: approved environment plates, traced ground footprints and depth masks.
 * Coordinates below refer to the 1536x1024 approved illustrations, not a tile approximation.
 */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;if(root.G)root.G.RiftRoomArt=api;})(globalThis,()=>{
 const S=.625,OX=-480,OY=-320,assets=new WeakMap();
 const box=(x,y,w,h,z=64)=>({foot:[[x,y],[x+w,y],[x+w,y+h],[x,y+h]],height:z});
 const shape=(foot,height=70)=>({foot,height});
 const themes={
  esporario:{name:'Cultivo invadido',slug:'01-cultivo-invadido',light:'#f9d272',kind:'spores',entry:[745,805],boss:[770,340],exit:[766,470],structures:[
   shape([[365,273],[372,239],[535,190],[570,201],[566,224],[414,272],[406,316],[365,316]]),
   shape([[873,209],[912,224],[1110,255],[1146,241],[1158,254],[1152,280],[1006,280],[874,245]]),
   shape([[331,395],[400,415],[548,450],[599,434],[615,389],[601,350],[575,391],[544,412],[336,369]]),
   shape([[929,411],[955,445],[1008,469],[1160,423],[1167,388],[1145,380],[1005,424],[971,405],[944,381]]),
   shape([[148,419],[177,430],[178,467],[284,519],[333,510],[335,568],[283,587],[151,507]]),
   shape([[612,540],[643,574],[744,607],[872,636],[914,626],[916,650],[869,663],[726,627],[610,584]],82),
   shape([[472,730],[505,745],[614,798],[676,808],[690,797],[694,826],[647,837],[473,766]],86),
   shape([[960,674],[1026,658],[1108,629],[1183,596],[1185,625],[1125,674],[1025,718],[962,733]],86),
   box(173,265,30,22),box(522,321,38,22),box(1320,274,33,22),box(846,502,38,27),box(456,579,45,31),box(280,764,35,28),box(833,777,40,28),box(1225,774,34,26),
   box(94,690,42,39),box(1355,673,45,43),box(276,123,39,28),box(1228,134,48,25)]},
  larva:{name:'Galería del fluido',slug:'02-galeria-del-fluido',light:'#a2e5ee',kind:'bubbles',entry:[770,780],boss:[920,445],exit:[770,410],structures:[
   shape([[400,440],[429,446],[432,471],[543,542],[622,503],[621,530],[543,566],[405,479]],90),
   shape([[667,651],[807,656],[844,704],[887,719],[887,750],[840,748],[809,687],[669,683]],78),
   shape([[557,327],[581,341],[645,390],[682,385],[695,407],[673,422],[611,389],[557,349]],70),
   shape([[808,286],[1007,293],[1007,328],[812,334]],58),
   shape([[1101,268],[1132,288],[1172,309],[1171,329],[1131,312],[1101,289]],62),
   shape([[1100,491],[1147,499],[1314,547],[1323,579],[1291,598],[1130,557],[1101,530]],72),
   shape([[179,559],[211,570],[273,622],[332,629],[335,658],[280,646],[179,585]],62),
   box(350,288,39,31),box(407,284,35,32),box(193,393,34,37),box(1252,407,38,46),box(704,555,38,28),box(546,709,47,29),box(337,796,36,29),box(1123,768,60,42),
   box(630,188,378,44,130),box(92,220,161,47,110),box(1270,245,177,67,140),box(74,710,176,74,135),box(1326,800,123,60,140),box(930,690,42,60,90)]},
  malla:{name:'Cámara de anclajes',slug:'03-camara-de-anclajes',light:'#f5c567',kind:'dust',entry:[767,790],boss:[535,320],exit:[738,497],structures:[
   box(522,209,45,27),box(390,324,38,24,47),box(625,295,42,26,45),box(429,431,44,28,48),box(626,419,40,28,48),box(1214,155,48,30,50),
   shape([[299,465],[332,482],[333,518],[396,552],[504,554],[546,519],[569,530],[544,572],[503,611],[396,610],[299,551]],84),
   shape([[1047,369],[1085,386],[1205,433],[1295,467],[1291,497],[1202,469],[1050,406]],69),
   shape([[671,232],[699,242],[758,276],[758,296],[731,291],[672,253]],55),
   box(464,755,115,40,88),box(933,294,95,26,90),box(984,237,94,26,64),box(1253,286,80,45,90),
   box(326,231,35,28),box(817,254,39,28),box(1124,209,34,29),box(1239,255,39,32),box(186,376,34,33),box(298,440,35,25),box(771,449,45,31),box(944,477,41,31),box(685,598,39,32),box(982,764,36,33),
   box(934,628,45,30),box(1003,665,80,37,63),box(1074,591,75,40,58),box(1183,666,50,34,85),box(1088,744,54,31,54),box(101,250,37,32),box(1411,247,33,38)]},
  portador:{name:'Patio de contención',slug:'04-patio-de-contencion',light:'#ffd072',kind:'sparks',entry:[770,780],boss:[1190,295],exit:[766,390],structures:[
   shape([[583,225],[612,240],[727,284],[783,307],[786,325],[749,324],[584,259]],66),
   shape([[910,316],[941,330],[1094,394],[1103,427],[1071,432],[913,356]],67),
   shape([[336,386],[362,399],[500,457],[557,481],[560,502],[522,502],[337,421]],66),
   shape([[705,503],[735,517],[874,576],[905,610],[872,628],[705,542]],67),
   shape([[271,546],[302,561],[439,620],[461,661],[427,676],[272,584]],72),
   shape([[1035,653],[1064,664],[1226,739],[1246,770],[1214,791],[1036,691]],69),
   box(385,284,121,40,67),box(849,446,127,40,64),box(1175,551,76,34,64),box(575,728,94,33,65),box(1327,457,80,39,69),box(123,400,93,37,70),box(924,139,59,25,65),box(135,260,119,35,62),box(91,694,100,38,76),box(1300,737,117,39,90)]},
  huesped:{name:'Núcleo de cuarentena',slug:'05-nucleo-de-cuarentena',light:'#f4ca69',kind:'quarantine',entry:[767,790],boss:[1020,260],exit:[790,521],structures:[
   shape([[256,265],[287,249],[354,216],[429,243],[430,272],[392,271],[350,249],[284,283],[286,302],[358,332],[359,372],[316,367],[255,328]],65),
   shape([[594,368],[626,382],[677,419],[849,424],[849,462],[815,478],[676,459],[595,406]],72),
   shape([[1124,373],[1162,388],[1277,422],[1339,389],[1348,411],[1306,446],[1270,471],[1155,437],[1125,410]],74),
   shape([[1242,264],[1270,278],[1325,309],[1359,303],[1367,334],[1334,355],[1277,323],[1244,300]],66),
   shape([[308,482],[333,479],[445,419],[502,456],[503,486],[472,488],[447,454],[333,515],[333,535],[373,551],[373,604],[334,598],[308,578]],70),
   shape([[525,629],[553,635],[650,572],[673,582],[673,608],[554,665],[554,679],[641,714],[639,737],[596,725],[526,690]],72),
   shape([[865,574],[893,566],[948,533],[1106,595],[1106,626],[1076,631],[948,568],[892,600],[893,617],[864,626]],66),
   shape([[944,732],[977,740],[1064,773],[1162,773],[1221,728],[1228,752],[1197,795],[1153,813],[1056,811],[946,768]],70),
   box(572,245,31,28),box(681,329,42,34),box(951,360,35,30),box(1048,495,30,30),box(1304,585,31,28),box(429,749,32,33),box(159,397,31,32),box(643,605,34,29),box(1193,678,38,33),box(193,778,68,37,70),box(1315,761,54,38,72)]}
 };
 const point=([x,y])=>({x:OX+x*S,y:OY+y*S});
 function inside(poly,x,y){let yes=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])yes=!yes;}return yes;}
 function nearest(poly,x,y){let best={d:Infinity};for(let i=0;i<poly.length;i++){const a=poly[i],b=poly[(i+1)%poly.length],vx=b[0]-a[0],vy=b[1]-a[1],k=Math.max(0,Math.min(1,((x-a[0])*vx+(y-a[1])*vy)/(vx*vx+vy*vy||1))),qx=a[0]+vx*k,qy=a[1]+vy*k,d=Math.hypot(x-qx,y-qy);if(d<best.d)best={d,x:qx,y:qy};}return best;}
 function blocked(g,x,y,r=0){
  const px=(x-OX)/S,py=(y-OY)/S,rr=r/S;
  if(px<g.limit.left+rr||px>g.limit.right-rr||py<g.limit.top+rr||py>g.limit.bottom-rr)return true;
  return g.structures.some(b=>px>=b.box.left-rr&&px<=b.box.right+rr&&py>=b.box.top-rr&&py<=b.box.bottom+rr&&(inside(b.foot,px,py)||nearest(b.foot,px,py).d<rr));
 }
 function collide(g,e){
  let hit=false;const rr=e.r/S;let x=(e.x-OX)/S,y=(e.y-OY)/S;
  for(let pass=0;pass<4;pass++){
   const nx=Math.max(g.limit.left+rr,Math.min(g.limit.right-rr,x)),ny=Math.max(g.limit.top+rr,Math.min(g.limit.bottom-rr,y));if(nx!==x||ny!==y)hit=true;x=nx;y=ny;
   for(const b of g.structures){if(x<b.box.left-rr||x>b.box.right+rr||y<b.box.top-rr||y>b.box.bottom+rr)continue;const q=nearest(b.foot,x,y),within=inside(b.foot,x,y);if(!within&&q.d>=rr)continue;hit=true;
    let dx=within?q.x-x:x-q.x,dy=within?q.y-y:y-q.y,d=Math.hypot(dx,dy);if(d<1e-6){dx=x-(b.box.left+b.box.right)/2;dy=y-(b.box.top+b.box.bottom)/2;d=Math.hypot(dx,dy)||1;}
    x=q.x+dx/d*(rr+.05);y=q.y+dy/d*(rr+.05);
   }
  }e.x=OX+x*S;e.y=OY+y*S;return hit;
 }
 function hull(points){const a=points.slice().sort((p,q)=>p[0]-q[0]||p[1]-q[1]),cross=(o,p,q)=>(p[0]-o[0])*(q[1]-o[1])-(p[1]-o[1])*(q[0]-o[0]),lo=[],hi=[];for(const p of a){while(lo.length>1&&cross(lo.at(-2),lo.at(-1),p)<=0)lo.pop();lo.push(p);}for(const p of a.slice().reverse()){while(hi.length>1&&cross(hi.at(-2),hi.at(-1),p)<=0)hi.pop();hi.push(p);}return lo.slice(0,-1).concat(hi.slice(0,-1));}
 function generate(id){
  const theme=themes[id];if(!theme)throw Error('Unknown rift room');
  const structures=theme.structures.map((b,index)=>({...b,index,box:{left:Math.min(...b.foot.map(p=>p[0])),right:Math.max(...b.foot.map(p=>p[0])),top:Math.min(...b.foot.map(p=>p[1])),bottom:Math.max(...b.foot.map(p=>p[1]))},mask:hull([...b.foot,...b.foot.map(([x,y])=>[x,y-b.height])])}));
  const g={id:'NIV-BIO-C1-r2:'+id,bio:id,revision:'NIV-BIO-C1-r2',name:theme.name,theme,structures,color:'#222726',limit:{left:88,right:1450,top:166,bottom:844},tags:{yellowPaper:false,repeatedCorridors:false,biologicalRoom:true},entry:point(theme.entry),bossSpawn:point(theme.boss),escape:point(theme.exit),bounds:{left:OX,right:480,top:OY,bottom:320}};
  const walls=[];for(let ty=-12;ty<=12;ty++)for(let tx=-16;tx<=16;tx++)if(blocked(g,tx*32+16,ty*32+16,12))walls.push([tx,ty]);
  g.fixture={minX:-16,maxX:16,minY:-12,maxY:12,walls,props:[],staticNavigation:true,sceneRevision:'NIV-ESC-008-A-r1',riftArt:{structures:g.structures,limit:g.limit}};return g;
 }
 function preload(g){
  if(assets.has(g))return;const src='assets/levels/bio-c1/'+g.theme.slug+'-clean-r2.png',state={src,ready:false,failed:false,image:new Image()};assets.set(g,state);state.image.onload=()=>{state.ready=true;};state.image.onerror=()=>{state.failed=true;};state.image.src=src;
 }
 function loading(g){preload(g);const a=assets.get(g);return{ready:a.ready,failed:a.failed?[a.src]:[],pending:a.ready||a.failed?[]:[a.src]};}
 function path(ctx,poly){ctx.beginPath();poly.forEach(([x,y],i)=>i?ctx.lineTo(OX+x*S,OY+y*S):ctx.moveTo(OX+x*S,OY+y*S));ctx.closePath();}
 function plate(ctx,g){const a=assets.get(g);if(a?.ready)ctx.drawImage(a.image,0,48,1536,976,OX,OY+48*S,960,976*S);}
 function drawGround(ctx,g,time,calm=false){
  preload(g);ctx.save();ctx.imageSmoothingEnabled=false;plate(ctx,g);
  // Restrained live bloom over the original baked lighting; no replacement palette.
  for(const [i,x]of[180,440,760,1110,1360].entries()){
   const p=point([x,190]),r=50,grad=ctx.createRadialGradient(p.x,p.y,1,p.x,p.y,r);grad.addColorStop(0,g.theme.light+'24');grad.addColorStop(1,g.theme.light+'00');ctx.globalAlpha=calm?.18:.22+.06*Math.sin(time*.8+i);ctx.fillStyle=grad;ctx.fillRect(p.x-r,p.y-r,r*2,r*2);
  }ctx.restore();
 }
 function drawables(g,player){
  const out=[];
  for(const b of g.structures){
   // Narrow vertical strips follow each oblique base instead of sorting a long wall as a box.
   for(let x=b.box.left;x<b.box.right;x+=32){
    const mid=Math.min(x+16,b.box.right),crossings=[];for(let i=0;i<b.foot.length;i++){const a=b.foot[i],c=b.foot[(i+1)%b.foot.length];if(mid>=Math.min(a[0],c[0])&&mid<=Math.max(a[0],c[0])&&a[0]!==c[0])crossings.push(a[1]+(c[1]-a[1])*(mid-a[0])/(c[0]-a[0]));}
    const base=crossings.length?Math.max(...crossings):b.box.bottom;
    out.push({y:OY+base*S,draw:ctx=>{ctx.save();ctx.beginPath();ctx.rect(OX+x*S,OY,Math.min(32,b.box.right-x)*S,640);ctx.clip();path(ctx,b.mask);ctx.clip();if(player&&inside(b.mask,(player.x-OX)/S,(player.y-OY)/S)&&!blocked(g,player.x,player.y,player.r))ctx.globalAlpha=.5;plate(ctx,g);ctx.restore();}});
   }
  }
  // The perimeter's raised faces also occlude correctly at the near edge.
  out.push({y:230,draw:ctx=>{ctx.save();ctx.beginPath();ctx.rect(OX,OY+844*S,960,180*S);ctx.clip();plate(ctx,g);ctx.restore();}});return out;
 }
 function drawAtmosphere(ctx,g,time,calm=false){
  const t=calm?0:time;ctx.save();ctx.fillStyle=g.theme.light;ctx.strokeStyle=g.theme.light;
  for(let i=0;i<(calm?8:32);i++){const x=OX+130*S+((i*109+Math.sin(t*.3+i)*9+760)%760),y=OY+180*S+((i*71-t*7+1e6)%380);if(blocked(g,x,y))continue;ctx.globalAlpha=.16+.1*Math.sin(t+i);
   if(g.theme.kind==='bubbles'){ctx.strokeRect(Math.round(x),Math.round(y),2,3);}else{ctx.fillRect(Math.round(x),Math.round(y),i%5===0?2:1,g.theme.kind==='sparks'?3:1);}
  }ctx.restore();
 }
 return{themes,generate,blocked,collide,preload,loading,drawGround,drawables,drawAtmosphere,point};
});
