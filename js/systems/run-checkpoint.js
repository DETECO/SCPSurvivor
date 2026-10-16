/* P05 snapshots only safe boundaries; active combat is recovered from its start. */
G.RunCheckpoint=(()=>{
 const VERSION={schemaVersion:1,buildVersion:'0.5-local-01'};
 const PLAYER=['soldierId','x','y','hp','maxHp','baseMaxHp','level','xp','xpNext','kills','bosses','training','tempStats',
  'invuln','slowT','weaponAim','aim','moveAngle','fieldDamageRevision','lavaTick','attackFace','flash','walking','inLiquid',
  'coins','t1','t10','dmgDealt','statsTaken','buffs','sashT','bellHeal'];
 let lastBoundary=null;
 const clone=value=>JSON.parse(JSON.stringify(value));
 const safe=e=>e.phase==='preparation'||e.phase==='exploration'||(e.phase==='levelup'&&e.resumePhase==='preparation');
 function live(boundary){
  const p=G.Game.player;if(!p)return null;
  const player={};for(const key of PLAYER)if(p[key]!==undefined)player[key]=p[key];
  const a=G.FieldAbilities.state(p);
  return clone({...VERSION,boundary,expedition:G.Expedition.captureState(),player,combat:G.FieldCombat.exportData(),
   ability:{kind:a.kind,remaining:a.remaining,cooldown:a.cooldown,duration:a.duration},world:G.World.exportData(),pickups:G.Pickups.exportData()});
 }
 function capture(){
  if(G.DimensionalRifts?.enabled||G.InventoryTrial?.enabled)return null; // Prototipos sin persistencia; no emitir schema1 incompleto.
  const e=G.Expedition.state;if(!G.Game.player)return null;
  if(safe(e))return live(e.phase==='exploration'?'exploration':'preparation');
  if(['combat','boss'].includes(e.phase)&&G.Expedition.captureState().waveTime===0&&lastBoundary&&
   lastBoundary.expedition.runSeed===e.runSeed&&lastBoundary.expedition.sector===e.sector&&lastBoundary.expedition.wave===e.wave)return clone(lastBoundary);
  return null;
 }
 function atBoundary(name){lastBoundary=live(name);G.RunContinuity?.boundary(name);}
 function validate(input){
  const check=(condition,message)=>{if(!condition)throw new Error(message);};
  check(input&&input.schemaVersion===1&&input.buildVersion==='0.5-local-01','Versión de guardado incompatible. Conserva los datos.');
  function finite(value){
   if(typeof value==='number')check(Number.isFinite(value),'El guardado contiene números inválidos.');
   else if(value&&typeof value==='object')for(const key of Object.keys(value)){
    check(!['__proto__','prototype','constructor'].includes(key),'Campo inválido.');finite(value[key]);
   }
  }
  finite(input);const data=clone(input);check(JSON.stringify(data).length<=256*1024,'Guardado demasiado grande.');
  const e=data.expedition,p=data.player,c=data.combat,w=data.world,a=data.ability;
  check(e&&p&&c&&w&&a,'Guardado incompleto.');
  const num=(value,min=0,max=1e12,integer=false)=>Number.isFinite(value)&&value>=min&&value<=max&&(!integer||Number.isInteger(value));
  check(safe(e)||(['combat','boss'].includes(e.phase)&&e.waveTime===0&&e.spawned===0),'Solo se puede recuperar una frontera segura.');
  check(num(e.sector,1,1e7,true)&&num(e.wave,1,5,true)&&['normal','boss'].includes(e.kind),'Sector inválido.');
  check(num(e.sectorWaves,e.kind==='boss'?0:3,e.kind==='boss'?0:5,true)&&e.wave<=(e.kind==='boss'?1:e.sectorWaves),'Tamaño de sector inválido.');
  for(const key of ['runSeed','mapSeed','rngState','spawnRngState'])check(num(e[key],0,0xffffffff,true),'Semilla inválida.');
  check(num(e.elapsed)&&num(e.prep,0,20)&&num(e.pending,0,1,true)&&num(e.pendingXp)&&Array.isArray(e.cards)&&e.cards.length<=3,'Estado de expedición inválido.');
  // restoreState consumes every field below; absent values must not enter its closures.
  check(e.objective===(e.kind==='boss'?'boss':e.wave%2===0?'survive':'neutralize')&&
   (e.phase!=='combat'||e.kind==='normal')&&(e.phase!=='boss'||e.kind==='boss'),'Fase y objetivo incompatibles.');
  check(num(e.spawned,0,1e9,true)&&num(e.quota,1,60,true)&&num(e.spawnClock)&&num(e.waveKills,0,1e9,true)&&
   num(e.waveTime)&&e.waveTime<=e.elapsed&&num(e.interaction,0,3)&&num(e.startX,-1e7,1e7)&&num(e.startY,-1e7,1e7)&&
   num(e.startHp,0,1e6)&&num(e.startDamage,0,1e12,true),'Progreso de oleada inválido.');
  check(num(e.nextBossSector,1,1e7+6,true)&&
   (e.phase==='boss'?e.nextBossSector===e.sector:e.nextBossSector>e.sector)&&num(e.drought,0,3,true)&&
   typeof e.extractionAvailable==='boolean'&&(e.kind!=='boss'||!e.extractionAvailable),'Calendario de expedición inválido.');
  check(['combat','boss','preparation','exploration','escaping','extracting'].includes(e.resumePhase)&&
   num(e.upgradesApplied,0,1e6,true)&&new Set(e.cards).size===e.cards.length&&
   (e.phase==='levelup'?e.pending===1&&e.cards.length>0:e.cards.length===0),'Estado de mejoras inválido.');
  const totals=e.totals,totalKeys=['wavesCompleted','sectorsCompleted','bossesDefeated','bossesEvaded'];
  check(totals&&typeof totals==='object'&&!Array.isArray(totals)&&Object.keys(totals).every(key=>totalKeys.includes(key))&&
   totalKeys.every(key=>num(totals[key],0,1e9,true))&&totals.sectorsCompleted<=e.sector&&
   totals.bossesDefeated+totals.bossesEvaded<=totals.sectorsCompleted,'Totales de expedición inválidos.');
  check(!!G.FieldCatalog.soldiers[p.soldierId]&&Object.keys(p).every(key=>PLAYER.includes(key)),'Jugador inválido.');
  check(num(p.hp,0,1e6)&&num(p.maxHp,1,1e6)&&p.hp<=p.maxHp&&num(p.x,-1e7,1e7)&&num(p.y,-1e7,1e7)&&num(p.level,1,1e6,true)&&num(p.xp)&&num(p.xpNext,1)&&num(p.kills,0,1e9,true),'Datos de jugador inválidos.');
  check(e.waveKills<=p.kills&&e.upgradesApplied<=p.level-1,'Progreso de jugador incompatible.');
  check(Array.isArray(c.weapons)&&c.weapons.length===2&&new Set(c.weapons.map(x=>x.id)).size===2,'Copias de armas inválidas.');
  for(const copy of c.weapons)check(typeof copy.id==='string'&&copy.id.length>0&&G.FieldCatalog.validateMods(copy.model,copy.mods)&&
   num(copy.level,1,5,true)&&num(copy.ammo,0,1e6)&&num(copy.reload,0,1e6)&&num(copy.reloadTime,0,1e6),'Estado de arma inválido.');
  check(num(c.activeIndex,0,1,true)&&num(c.shotWait)&&num(c.switchRemaining)&&num(c.shots,0,1e12,true),'Relojes de armas inválidos.');
  check(a.kind===(p.soldierId==='guard'?'sprint':'heal')&&num(a.remaining,0,2)&&num(a.cooldown,0,30)&&num(a.duration,0,2),'Habilidad inválida.');
  check(Array.isArray(w.broken)&&Array.isArray(w.damaged)&&w.broken.every(k=>typeof k==='string'&&/^-?\d+,-?\d+$/.test(k))&&
   w.damaged.every(x=>num(x.tx,-1e5,1e5,true)&&num(x.ty,-1e5,1e5,true)&&num(x.hp,0,1e6)),'Props inválidos.');
  check(Array.isArray(data.pickups)&&data.pickups.length<=420&&new Set(data.pickups.map(x=>x.id)).size===data.pickups.length&&
   data.pickups.every(x=>num(x.id,1,1e12,true)&&!!G.Pickups.KIND[x.kind]&&num(x.x,-1e7,1e7)&&num(x.y,-1e7,1e7)&&num(x.vx,-1e7,1e7)&&num(x.vy,-1e7,1e7)&&num(x.t)),'Recogibles inválidos.');
  const pool=G.FieldUpgrades.candidates({...p,fieldWeapons:c.weapons});
  check(e.cards.every(key=>typeof key==='string'&&pool.some(card=>card.key===key)),'La oferta de mejoras es incompatible.');
  return data;
 }
 function restore(input){
  try{const data=validate(input);G.Game.restoreTechnical(data);lastBoundary=clone(data);return{ok:true};}
  catch(error){return{ok:false,error:error.message||'Guardado incompatible.'};}
 }
 return{capture,restore,atBoundary,validate};
})();
