/* Disclosed fixtures for rapid local/demo tests, never account progress. */
G.ExpandedPractice=(()=>{
 const active=()=>G.MapTrial?.expanded===true&&G.MapTrial.practice;
 const keys=['power','rhythm','handling','specialization'];
 const branches=rank=>Object.fromEntries(keys.map(k=>[k,rank]));
 function prepare(options){
  const mode=active();if(!mode)return options;
  const model=mode==='melee'?'baton':options.loadout[0].model;
  const first=G.FieldCatalog.makeWeapon(model,'local:1',[]);first.branches=branches(0);
  const next={...options,loadout:[first]};
  if(mode==='melee')return next;
  const second=G.FieldCatalog.makeWeapon('smg','practice:second',[]);second.branches=branches(0);next.loadout.push(second);
  if(mode==='terminal')first.branches.power=2;
  if(mode==='maximos'||mode==='saturacion')first.branches=branches(6);
  if(mode==='saturacion')second.branches=branches(6);
  return next;
 }
 function apply(p){
  if(active()!=='saturacion')return;
  for(const key of G.FieldStats.temporaryKeys)p.tempStats[key]=6;
  G.FieldStats.apply(p);G.Pickups.drop('xp',p.x,p.y,Math.max(0,p.xpNext-p.xp)/p.xpMul);
 }
 return{prepare,apply};
})();
