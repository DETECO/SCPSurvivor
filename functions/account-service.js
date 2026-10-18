'use strict';
const crypto=require('node:crypto');
const {ServiceError,assertLocalEmulators,assertAccountRuntime}=require('./project-runtime');
const VERSION={schemaVersion:1,buildVersion:'0.5-local-01'};
const fail=(code,message)=>{throw new ServiceError(code,message);};
function canonical(value){
 if(value===null||typeof value==='string'||typeof value==='boolean')return JSON.stringify(value);
 if(typeof value==='number'&&Number.isFinite(value))return JSON.stringify(value);
 if(Array.isArray(value))return '['+value.map(canonical).join(',')+']';
 if(value&&typeof value==='object')return '{'+Object.keys(value).sort().map(key=>{
  if(['__proto__','prototype','constructor'].includes(key))fail('invalid-argument','Campo JSON no permitido.');
  return JSON.stringify(key)+':'+canonical(value[key]);
 }).join(',')+'}';
 fail('invalid-argument','El comando debe contener datos JSON finitos.');
}
const commandHash=value=>crypto.createHash('sha256').update(canonical(value)).digest('hex');
function object(value,label){if(!value||typeof value!=='object'||Array.isArray(value))fail('invalid-argument',label+' debe ser un objeto.');return value;}
function keys(value,allowed,label){object(value,label);if(Object.keys(value).some(key=>!allowed.includes(key)))fail('invalid-argument','Campo no permitido en '+label+'.');}
function id(value,label){if(typeof value!=='string'||!/^[A-Za-z0-9_-]{8,128}$/.test(value))fail('invalid-argument',label+' inválido.');return value;}
function number(value,label,min=0,max=1e9,integer=false){if(!Number.isFinite(value)||value<min||value>max||(integer&&!Number.isInteger(value)))fail('invalid-argument',label+' inválido.');return value;}
function checkpoint(value){
 object(value,'Checkpoint');canonical(value);
 if(Buffer.byteLength(JSON.stringify(value),'utf8')>256*1024)fail('invalid-argument','El checkpoint supera256KiB.');
 if(value.schemaVersion!==VERSION.schemaVersion||value.buildVersion!==VERSION.buildVersion)fail('failed-precondition','Versión de guardado incompatible. Conserva los datos.');
 keys(value,['schemaVersion','buildVersion','boundary','expedition','player','combat','ability','world','pickups'],'Checkpoint');
 const e=object(value.expedition,'Expedición'),p=object(value.player,'Jugador'),c=object(value.combat,'Equipo');
 const check=(condition,message)=>{if(!condition)fail('invalid-argument',message);};
 const num=(value,min=0,max=1e12,integer=false)=>Number.isFinite(value)&&value>=min&&value<=max&&(!integer||Number.isInteger(value));
 if(!['combat','boss','preparation','exploration','levelup'].includes(e.phase)||
  (e.phase==='levelup'&&e.resumePhase!=='preparation'))fail('invalid-argument','No es una frontera segura.');
 check(!['combat','boss'].includes(e.phase)||(e.waveTime===0&&e.spawned===0),'El combate solo se guarda desde su inicio.');
 number(e.sector,'Sector',1,1e7,true);number(e.wave,'Oleada',1,5,true);
 for(const key of ['runSeed','mapSeed','rngState','spawnRngState'])number(e[key],'Semilla',0,0xffffffff,true);
 if(!['normal','boss'].includes(e.kind))fail('invalid-argument','Tipo de sector inválido.');
 number(e.sectorWaves,'Tamaño de sector',e.kind==='boss'?0:3,e.kind==='boss'?0:5,true);
 check(e.wave<=(e.kind==='boss'?1:e.sectorWaves),'Oleada fuera de sector.');
 check(e.objective===(e.kind==='boss'?'boss':e.wave%2===0?'survive':'neutralize')&&
  (e.phase!=='combat'||e.kind==='normal')&&(e.phase!=='boss'||e.kind==='boss'),'Fase y objetivo incompatibles.');
 check(num(e.elapsed)&&num(e.prep,0,20)&&num(e.pending,0,1,true)&&num(e.pendingXp)&&Array.isArray(e.cards)&&e.cards.length<=3,'Estado de expedición inválido.');
 check(num(e.spawned,0,1e9,true)&&num(e.quota,1,60,true)&&num(e.spawnClock)&&num(e.waveKills,0,1e9,true)&&
  num(e.waveTime)&&e.waveTime<=e.elapsed&&num(e.interaction,0,3)&&num(e.startX,-1e7,1e7)&&num(e.startY,-1e7,1e7)&&
  num(e.startHp,0,1e6)&&num(e.startDamage,0,1e12,true),'Progreso de oleada inválido.');
 check(num(e.nextBossSector,1,1e7+6,true)&&
  (e.phase==='boss'?e.nextBossSector===e.sector:e.nextBossSector>e.sector)&&num(e.drought,0,3,true)&&
  typeof e.extractionAvailable==='boolean'&&(e.kind!=='boss'||!e.extractionAvailable),'Calendario de expedición inválido.');
 check(['combat','boss','preparation','exploration','escaping','extracting'].includes(e.resumePhase)&&
  num(e.upgradesApplied,0,1e6,true)&&new Set(e.cards).size===e.cards.length&&
  (e.phase==='levelup'?e.pending===1&&e.cards.length>0:e.cards.length===0),'Estado de mejoras inválido.');
 const totals=object(e.totals,'Totales'),totalKeys=['wavesCompleted','sectorsCompleted','bossesDefeated','bossesEvaded'];
 keys(totals,totalKeys,'Totales');
 check(totalKeys.every(key=>num(totals[key],0,1e9,true))&&totals.sectorsCompleted<=e.sector&&
  totals.bossesDefeated+totals.bossesEvaded<=totals.sectorsCompleted,'Totales de expedición inválidos.');
 keys(p,['soldierId','x','y','hp','maxHp','baseMaxHp','level','xp','xpNext','kills','bosses','training','tempStats',
  'invuln','slowT','weaponAim','aim','moveAngle','fieldDamageRevision','lavaTick','attackFace','flash','walking','inLiquid',
  'coins','t1','t10','dmgDealt','statsTaken','buffs','sashT','bellHeal'],'Jugador');
 if(!['guard','medic'].includes(p.soldierId))fail('invalid-argument','Soldado desconocido.');
 number(p.hp,'Vida',0,1e6);number(p.x,'PosiciónX',-1e7,1e7);number(p.y,'PosiciónY',-1e7,1e7);
 number(p.maxHp,'Vida máxima',1,1e6);number(p.xpNext,'Siguiente nivel',1,1e12);
 number(p.level,'Nivel',1,1e6,true);number(p.xp,'XP',0,1e12);number(p.kills,'Bajas',0,1e9,true);
 check(p.hp<=p.maxHp&&e.waveKills<=p.kills&&e.upgradesApplied<=p.level-1,'Progreso de jugador incompatible.');
 if(!Array.isArray(c.weapons)||c.weapons.length!==2)fail('invalid-argument','Se requieren dos copias de armas.');
 const copies=new Set();
 for(const w of c.weapons){
  if(typeof w.id!=='string'||!w.id||w.id.length>128||copies.has(w.id))fail('invalid-argument','Copias de armas inválidas.');copies.add(w.id);
  if(!['pistol','smg','shotgun'].includes(w.model))fail('invalid-argument','Arma desconocida.');
  const compatible=w.model==='shotgun'?['grip','assisted','reinforced','extended']:['grip','assisted','reinforced','extended','rapid','piercing'];
  if(!Array.isArray(w.mods)||w.mods.length>2||new Set(w.mods).size!==w.mods.length||w.mods.some(mod=>!compatible.includes(mod)))fail('invalid-argument','Mods inválidos.');
  number(w.ammo,'Munición',0,1e6);number(w.reload,'Recarga',0,1e6);
  number(w.level,'Nivel de arma',1,5,true);number(w.reloadTime,'Tiempo de recarga',0,1e6);
 }
 number(c.activeIndex,'Arma activa',0,1,true);
 check(num(c.shotWait)&&num(c.switchRemaining)&&num(c.shots,0,1e12,true),'Relojes de armas inválidos.');
 const ability=object(value.ability,'Habilidad'),world=object(value.world,'Props');
 check(ability.kind===(p.soldierId==='guard'?'sprint':'heal')&&num(ability.remaining,0,2)&&num(ability.cooldown,0,30)&&num(ability.duration,0,2),'Habilidad inválida.');
 check(Array.isArray(world.broken)&&Array.isArray(world.damaged)&&world.broken.every(key=>typeof key==='string'&&/^-?\d+,-?\d+$/.test(key))&&
  world.damaged.every(item=>item&&num(item.tx,-1e5,1e5,true)&&num(item.ty,-1e5,1e5,true)&&num(item.hp,0,1e6)),'Props inválidos.');
 const pickupKinds=['xp','xpBig','heal','magnet','bomb','coin','ticket','ticket10','item'];
 check(Array.isArray(value.pickups)&&value.pickups.length<=420&&value.pickups.every(item=>item&&num(item.id,1,1e12,true)&&pickupKinds.includes(item.kind)&&
  num(item.x,-1e7,1e7)&&num(item.y,-1e7,1e7)&&num(item.vx,-1e7,1e7)&&num(item.vy,-1e7,1e7)&&num(item.t))&&
  new Set(value.pickups.map(item=>item.id)).size===value.pickups.length,'Recogibles inválidos.');
 const cardKeys=['health','protection','power','cadence','mobility','collection','learning','recovery','heal',...c.weapons.map(w=>'weapon:'+w.id)];
 check(e.cards.every(key=>typeof key==='string'&&cardKeys.includes(key)),'Oferta de mejoras incompatible.');
 return JSON.parse(JSON.stringify(value));
}
const inCombat=cp=>['combat','boss','wave-start','boss-start'].includes(cp.expedition.phase);
function result(value){
 keys(value,['reason','sector','wave','kills','level','elapsed','hp','runSeed','wavesCompleted','sectorsCompleted','bossesDefeated','bossesEvaded'],'Resultado');
 if(!['death','extracted'].includes(value.reason))fail('invalid-argument','Causa de cierre desconocida.');
 const totals={};
 for(const name of ['sector','wave','kills','level','runSeed','wavesCompleted','sectorsCompleted','bossesDefeated','bossesEvaded'])
  totals[name]=number(value[name],name,['sector','wave','level'].includes(name)?1:0,name==='runSeed'?0xffffffff:1e9,true);
 totals.elapsed=number(value.elapsed,'Tiempo',0,1e10);totals.hp=number(value.hp,'Vida',0,1e6);
 return{cause:value.reason,totals};
}
const state=stored=>({...VERSION,revision:stored?.revision||0,profile:stored?.profile||null,activeRun:stored?.activeRun||null,lastResult:stored?.lastResult||null});
async function executeCommand(db,auth,request,env=process.env){
 assertAccountRuntime(env);
 if(!auth?.uid||typeof auth.uid!=='string'||auth.uid.includes('/')||auth.uid.length>128)fail('unauthenticated','Inicia sesión.');
 keys(request,['type','requestId','expectedRevision','sessionId','runId','payload'],'Comando');
 const ref=db.collection('users').doc(auth.uid);
 if(request.type==='getState'){
  keys(request,['type'],'Consulta');const stored=await ref.get();return state(stored.exists?stored.data():null);
 }
 if(!['initializeProfile','startRun','claimRun','saveCheckpoint','beginCombat','markRollback','finishRun'].includes(request.type))fail('invalid-argument','Operación desconocida.');
 id(request.requestId,'IDdecomando');id(request.sessionId,'Sesión');number(request.expectedRevision,'Revisión',0,Number.MAX_SAFE_INTEGER,true);
 const payload=request.payload||{};object(payload,'Contenido');
 const hash=commandHash(request),receipt=ref.collection('receipts').doc(request.requestId);
 return db.runTransaction(async tx=>{
  const previous=await tx.get(receipt);
  if(previous.exists){const saved=previous.data();if(saved.commandHash!==hash)fail('already-exists','El ID ya pertenece a otro contenido.');return saved.result;}
  const stored=await tx.get(ref),next=state(stored.exists?stored.data():null);
  if(next.revision!==request.expectedRevision)fail('failed-precondition','La revisión cambió. Actualiza el estado antes de continuar.');
  const now=Date.now();
  function active(requireOwner=true){
   if(!next.activeRun||next.activeRun.id!==request.runId)fail('failed-precondition','La expedición activa no coincide.');
   if(requireOwner&&next.activeRun.sessionId!==request.sessionId)fail('permission-denied','Esta expedición pertenece a otra sesión.');
   return next.activeRun;
  }
  if(request.type==='initializeProfile'){
   keys(payload,['alias'],'Perfil');
   if(next.profile)fail('already-exists','El perfil ya está creado.');
   const alias=typeof payload.alias==='string'?payload.alias.trim():'';
   if(alias.length<3||alias.length>24||!/^[-\p{L}\p{N}_ ]+$/u.test(alias))fail('invalid-argument','Usa un alias de3–24letras, números, espacios, guion o guionbajo.');
   next.profile={alias};
  }else if(request.type==='startRun'){
   keys(payload,['checkpoint'],'Inicio');
   if(auth.token?.email_verified!==true)fail('permission-denied','Verifica tu correo antes de iniciar una expedición.');
   if(!next.profile)fail('failed-precondition','Completa tu alias.');
   if(next.activeRun)fail('already-exists','Ya hay una expedición activa.');
   const cp=checkpoint(payload.checkpoint);
   next.activeRun={id:'run_'+commandHash({uid:auth.uid,requestId:request.requestId}).slice(0,32),sessionId:request.sessionId,sessionVersion:1,
    checkpoint:cp,rankEligible:true,combatPending:inCombat(cp),createdAt:now,updatedAt:now};
  }else if(request.type==='claimRun'){
   keys(payload,[],'Transferencia');const run=active(false);
   if(run.sessionId===request.sessionId)fail('failed-precondition','La recuperación requiere una nueva sesión.');
   if(run.combatPending)run.rankEligible=false;
   run.sessionId=request.sessionId;run.sessionVersion++;run.updatedAt=now;
  }else if(request.type==='saveCheckpoint'){
   keys(payload,['checkpoint'],'Guardado');const run=active();run.checkpoint=checkpoint(payload.checkpoint);
   run.combatPending=inCombat(run.checkpoint);run.updatedAt=now;
  }else if(request.type==='beginCombat'){
   keys(payload,[],'Combate');const run=active();run.combatPending=true;run.updatedAt=now;
  }else if(request.type==='markRollback'){
   keys(payload,[],'Retroceso');const run=active();run.rankEligible=false;run.updatedAt=now;
  }else if(request.type==='finishRun'){
   keys(payload,['result'],'Cierre');const run=active(),closed=result(payload.result);
   next.lastResult={runId:run.id,...closed,rankEligible:run.rankEligible,confirmedAt:now};next.activeRun=null;
  }
  next.revision++;
  tx.set(ref,next);tx.set(receipt,{commandHash:hash,result:next,createdAt:now});return next;
 });
}
module.exports={executeCommand,assertLocalEmulators,assertAccountRuntime,commandHash,ServiceError};
