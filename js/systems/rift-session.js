/* LOT-EST-005 r1. ENSAYO-GRI-001 r1: transition .5s, escape at90s, warning15s. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;if(root.G)root.G.RiftSession=api;})(globalThis,()=>{
 function create(id,{escapeAt=90}={}){
  if(!id||!Number.isFinite(escapeAt)||escapeAt<60||escapeAt>180)throw Error('Invalid rift session');
  let time=0,transition=.5,status='entering',claimed=false;
  const escapeState=()=>time<escapeAt-15?'waiting':time<escapeAt?'warning':time<escapeAt+5?'open':'expired';
  return{
   tick(dt,{paused=false}={}){
    if(paused||!Number.isFinite(dt)||dt<=0||!['entering','combat'].includes(status))return;
    if(status==='entering'){transition=Math.max(0,transition-dt);if(transition<=0)status='combat';return;}
    time+=dt;
   },
   win(){if(status!=='combat')return false;status='victory';return true;},
   escape(){if(status!=='combat'||escapeState()!=='open')return false;status='escaped';return true;},
   die(){if(['victory','escaped','dead'].includes(status))return false;status='dead';return true;},
   claim(){if(status!=='victory'||claimed)return false;claimed=true;return true;},
   get state(){return{id,time,transition,status,claimed,escape:escapeState(),escapeAt,escapeRemaining:Math.max(0,escapeAt+5-time)};}
  };
 }
 return{create};
});
