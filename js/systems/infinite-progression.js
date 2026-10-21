/* T1A tuning only. Branch ranks 0..5 plus a single extra (6), per run/copy. */
G.InfiniteProgression=(()=>{
 const branches=['power','rhythm','handling','specialization'];
 const labels={power:'Potencia',rhythm:'Ritmo',handling:'Manejo',specialization:'Especialización'};
 const enabled=()=>G.MapTrial?.infinite===true;
 function ensure(copy){
  if(!copy||typeof copy!=='object')return false;
  if(copy.branches===undefined)copy.branches=Object.fromEntries(branches.map(k=>[k,0]));
  return !!copy.branches&&typeof copy.branches==='object'&&!Array.isArray(copy.branches)&&
   Object.keys(copy.branches).length===4&&branches.every(k=>Number.isInteger(copy.branches[k])&&copy.branches[k]>=0&&copy.branches[k]<=6);
 }
 function upgrade(copy,branch){
  if(!enabled()||!ensure(copy))return false;
  const key=branch??branches.find(k=>copy.branches[k]<6);
  if(!branches.includes(key)||copy.branches[key]>=6)return false;
  copy.branches[key]++;return true;
 }
 const amount=(rank,each,extra)=>Math.min(5,rank)*each+(rank===6?extra:0);
 function applyWeapon(out,copy){
  if(!enabled()||!ensure(copy))return out;
  const b=copy.branches;
  out.damage*=1+amount(b.power,.08,.20);
  out.interval*=1-amount(b.rhythm,.04,.08);
  out.reloadTime*=1-amount(b.handling,.05,.10);
  out.spread*=1-amount(b.handling,.03,.05);
  out.range*=1+amount(b.specialization,.03,.10);
  if(b.specialization===6)out.pierce++;
  return out;
 }
 function grantTactical(pl,type='power'){
  if(!enabled()||!pl||pl.dead||!(pl.hp>0)||!['power','mobility','protection'].includes(type))return false;
  pl.infiniteTactical={type,remaining:15};G.FieldStats?.apply(pl);return true;
 }
 function tick(dt,pl){
  if(!enabled()||!pl?.infiniteTactical||!Number.isFinite(dt)||dt<=0)return;
  pl.infiniteTactical.remaining=Math.max(0,pl.infiniteTactical.remaining-dt);
  if(pl.infiniteTactical.remaining===0){pl.infiniteTactical=null;G.FieldStats?.apply(pl);}
 }
 function describe(copy){return ensure(copy)?branches.map(k=>`${labels[k]} ${copy.branches[k]===6?'5 + extra':copy.branches[k]+'/5'}`).join(' · '):'Ramas incompatibles';}
 return{ensure,upgrade,applyWeapon,grantTactical,tick,describe,amount,branches:branches.slice()};
})();
