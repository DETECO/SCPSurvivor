/* ENSAYO-JUG-002 r1 / LOT008: regular enemies only, frozen on creation. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;if(root.G)root.G.ExpeditionPressure=api;})(globalThis,()=>{
 function at(map,seconds,globalCap=64,reserved=0){
  const stage=Math.max(0,Math.min(4,Math.floor(seconds/60))),level=Math.max(0,map-1);
  return{minute:stage,rate:Math.min(3.4,[.70,.95,1.25,1.60,1.90][stage]+.10*level),cap:Math.min(globalCap-reserved,[18,22,28,34,40][stage]+Math.min(12,2*level)),scale:{hp:(1+.25*level)*(1+.15*stage),dmg:(1+.12*level)*(1+.07*stage),spd:1+Math.min(.2,.02*level+.01*stage)}};
 }
 return{at};
});
