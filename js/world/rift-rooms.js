/* Traversable compositions, ENSAYO-GRI-001 r1. Not final scenario art. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;if(root.G)root.G.RiftRooms=api;})(globalThis,()=>{
 const themes={esporario:{name:'Vivero de esporas',color:'#5d5943',blocks:[[-10,-6],[9,-6]]},larva:{name:'Cámara vítrea',color:'#3c6263',blocks:[[-10,-5],[-10,4],[9,-5],[9,4]]},malla:{name:'Recinto de anclajes',color:'#63434f',blocks:[[-10,-7],[-7,6],[9,-6],[8,6]]},portador:{name:'Patio de espinas',color:'#60513c',blocks:[[-11,-4],[10,-4],[-11,5],[10,5]]},huesped:{name:'Cámara de cuarentena',color:'#58414c',blocks:[[-10,-7],[9,-7],[-10,6],[9,6],[-12,0],[11,0]]}};
 function generate(id){
  const theme=themes[id];if(!theme)throw Error('Unknown rift room');const walls=[];
  for(const[x,y]of theme.blocks)for(let dx=0;dx<2;dx++)for(let dy=0;dy<2;dy++)walls.push([x+dx,y+dy]);
  return{id:'ENSAYO-GRI-001-r1:'+id,name:theme.name,color:theme.color,tags:{yellowPaper:false,repeatedCorridors:false,biologicalRoom:true},fixture:{minX:-14,maxX:14,minY:-10,maxY:10,walls,props:[],staticNavigation:true,sceneRevision:'NIV-ESC-008-A-r1'},entry:{x:16,y:208},bossSpawn:{x:16,y:-144},escape:{x:16,y:16},bounds:{left:-416,right:416,top:-288,bottom:288}};
 }
 return{generate,themes};
});
