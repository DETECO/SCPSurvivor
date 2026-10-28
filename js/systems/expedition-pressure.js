/* ENSAYO-JUG-002 / LOT012: preserve rates/scales; eighty total alive only in [240,300). */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;if(root.G)root.G.ExpeditionPressure=api;})(globalThis,()=>{
 const lastMinute=seconds=>seconds>=240&&seconds<300;
 const limit=(seconds,globalCap=64)=>lastMinute(seconds)?80:globalCap;
 function at(map,seconds,globalCap=64,reserved=0){
  const stage=Math.max(0,Math.min(4,Math.floor(seconds/60))),level=Math.max(0,map-1);
  return{minute:stage,rate:Math.min(3.4,[.70,.95,1.25,1.60,1.90][stage]+.10*level),cap:Math.min(limit(seconds,globalCap)-reserved,lastMinute(seconds)?80:[18,22,28,34,40][stage]+Math.min(12,2*level)),scale:{hp:(1+.25*level)*(1+.15*stage),dmg:(1+.12*level)*(1+.07*stage),spd:1+Math.min(.2,.02*level+.01*stage)}};
 }
 return{at,limit};
});
