/* NIV-ESC-008-A r1 / EST-ESC-001 r1. Explicit redistribution, not a scale of R7 coordinates. */
G.SceneM01A=(()=>{
 const TS=32,revision='NIV-ESC-008-A-r1',point=(x,y)=>({x:(x+.5)*TS,y:(y+.5)*TS});
 function generate(seed=1){
  const blocks=[],rooms=[],blocked=new Set();
  function add(id,x,y,w,h,kind='wall'){blocks.push({id,x,y,w,h,kind});for(let yy=y;yy<y+h;yy++)for(let xx=x;xx<x+w;xx++)blocked.add(xx+','+yy);}
  function room(id,x,y,w,h,doors=3){
   const gap=8,mid=x+Math.floor((w-gap)/2),ymid=y+Math.floor((h-gap)/2);
   add(id+'-n1',x,y,mid-x,1);add(id+'-n2',mid+gap,y,x+w-mid-gap,1);add(id+'-s1',x,y+h-1,mid-x,1);add(id+'-s2',mid+gap,y+h-1,x+w-mid-gap,1);add(id+'-w',x,y+1,1,h-2);
   if(doors===3){add(id+'-e1',x+w-1,y+1,1,ymid-y-1);add(id+'-e2',x+w-1,ymid+gap,1,y+h-1-ymid-gap);}else add(id+'-e',x+w-1,y+1,1,h-2);
   const exits=[{...point(mid+gap/2,y-2),axis:'x'},{...point(mid+gap/2,y+h+1),axis:'x'}];if(doors===3)exits.push({...point(x+w+1,ymid+gap/2),axis:'y'});
   rooms.push({id,role:'coverroom',x,y,w,h,cx:x+w/2,cy:y+h/2,probe:point(x+5,y+5),doors:exits});
   add(id+'-equipment',x+Math.floor(w/2)-1,y+Math.floor(h/2)-1,3,2,y>120?'equipment':'furniture');
  }
  [[22,12,26,22],[62,14,24,20],[100,12,24,22]].forEach((v,i)=>room('suite-'+i,...v));
  [[90,60,22,20],[126,60,26,22],[90,98,22,20],[126,100,24,20]].forEach((v,i)=>room('module-'+i,...v));
  [[20,124,22,22],[55,128,24,20],[92,130,22,20]].forEach((v,i)=>room('service-'+i,...v,2));
  // Edge references frame the initial approach and leave a broad clear plaza centre.
  add('entry-pillar',14,17,2,2,'pillar');add('entry-counter',9,30,3,2,'furniture');
  [[24,54],[65,54],[24,97],[65,97]].forEach(([x,y],i)=>add('plaza-pillar-'+i,x,y,2,2,'pillar'));
  add('plaza-screen',29,104,16,1);
  [[174,15,28],[198,24,27],[221,14,29],[174,66,29],[198,72,25],[221,65,31]].forEach(([x,y,h],i)=>add('maze-'+i,x,y,1,h));
  add('maze-branch-a',175,42,7,1);add('maze-branch-b',214,42,7,1);add('maze-branch-c',175,94,7,1);add('maze-branch-d',214,95,7,1);
  [[178,114],[178,145],[225,114],[225,143]].forEach(([x,y],i)=>add('arena-pillar-'+i,x,y,2,2,'pillar'));
  const floorTiles=[],walls=[];for(let y=1;y<159;y++)for(let x=1;x<239;x++)(blocked.has(x+','+y)?walls:floorTiles).push([x,y]);
  const entry=point(16,26),exit=point(220,145),bossSpawn=point(202,130),routeAnchor=point(116,90),terminalAnchor=point(16,35);
  const chestCandidates=[[36,18],[69,20],[96,66],[132,106],[188,86],[72,142]].map(([x,y],i)=>({id:'r7-a-chest-'+(i+1),...point(x,y)}));
  const clear=(x,y)=>{for(let yy=y-1;yy<=y+1;yy++)for(let xx=x-1;xx<=x+1;xx++)if(xx<2||xx>237||yy<2||yy>157||blocked.has(xx+','+yy))return false;return true;};
  const spawnPoints=[];for(let y=4;y<157;y+=3)for(let x=4;x<237;x+=3)if(clear(x,y)&&Math.hypot(x-16,y-26)>=7)spawnPoints.push(point(x,y));
  const decor=blocks.map(b=>({type:'r7',r7:b,tx:b.x,ty:b.y,x:(b.x+b.w/2)*TS,y:(b.y+b.h)*TS,r:0,solid:false}));
  const fixture={minX:0,maxX:239,minY:0,maxY:159,walls,props:[],layout:G.SceneR7.id,sceneRevision:revision,staticNavigation:true,r7Blocks:blocks,r7Decor:decor};
  return{seed,layout:G.SceneR7.id,layoutVersion:revision,fixture,entry,exit,bossSpawn,routeAnchor,terminalAnchor,chestCandidates,rooms,modules:blocks,floorTiles,spawnPoints,families:['plazas','recintos','nucleo-modular','laberinto-abierto','servicios','arena']};
 }
 return{generate,revision};
})();
