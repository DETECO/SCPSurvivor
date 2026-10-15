/* P03: expedición local infinita, sobre World/Path/Enemy/Combat de la base. */
G.Expedition = (() => {
  let pl=null, phase='idle', sector=1, wave=1, sectorWaves=3, kind='normal', objective='neutralize';
  let spawned=0, quota=12, spawnClock=0, prep=20, pending=0, cards=[], waveKills=0, waveTime=0;
  let objectives=[], elapsed=0, interaction=0, startX=0, startY=0, startHp=0, startDamage=0, result=null;
  let runSeed=1, mapSeed=1, geometry=null, boss=null, nextBossSector=4, extractionAvailable=false, drought=0;
  let rng=()=>0, spawnRng=()=>0, totals={wavesCompleted:0,sectorsCompleted:0,bossesDefeated:0,bossesEvaded:0};
  let upgradesApplied=0;
  let pendingXp=0, resumePhase='combat';
  const exit={x:0,y:0,r:72};
  function random(seed){let n=seed>>>0;const next=()=>{n=(Math.imul(n,1664525)+1013904223)>>>0;return n/4294967296;};next.state=()=>n;return next;}
  function boundary(name){G.RunCheckpoint?.atBoundary(name);}
  function waveCount(){
    // Independent stream: never consume the boss/extraction or spawn generators.
    let n=(runSeed^Math.imul(sector,0x9e3779b9)^0xa5b35705)>>>0;
    n=Math.imul(n^(n>>>16),0x85ebca6b);n=Math.imul(n^(n>>>13),0xc2b2ae35);
    return 3+Math.floor(random((n^(n>>>16))>>>0)()*3);
  }
  function snapshot(){return{phase,sector,wave,sectorWaves,kind,objective,spawned,quota,kills:pl?pl.kills-waveKills:0,
    prep,pending,cards,pendingXp,resumePhase,upgradesApplied,nextUpgradeLevel:pending&&pl?pl.level:null,elapsed,remaining:Math.max(0,60-waveTime),extract:interaction,result,exit,
    nearExit:!!pl&&G.U.dist(pl.x,pl.y,exit.x,exit.y)<=exit.r,runSeed,mapSeed,nextBossSector,extractionAvailable,
    totals:{...totals},bossHp:boss?Math.max(0,boss.hp):0,bossMaxHp:boss?boss.maxHp:0};}
  function scale(o=wave){return{hp:1+.15*(sector-1)+.05*(o-1),dmg:1+.08*(sector-1),spd:1+Math.min(.2,.02*(sector-1))};}
  function map(){
    kind=sector===nextBossSector?'boss':'normal';
    sectorWaves=kind==='normal'?waveCount():0;
    extractionAvailable=false;
    if(kind==='normal'&&sector>=3){extractionAvailable=rng()<.25||drought>=3;drought=extractionAvailable?0:drought+1;}
    mapSeed=Math.imul(runSeed^sector,0x45d9f3b)>>>0;spawnRng=random(mapSeed);
    geometry=G.SectorMaps.generate(mapSeed,{boss:kind==='boss'});
    G.World.reset(mapSeed);G.World.setFixture(geometry.fixture);G.World.setBiome(1,true);G.Path.clear();G.Pickups.clear();G.EnemyMgr.clear();G.Projectiles.clear();
    pl.x=geometry.entry.x;pl.y=geometry.entry.y;exit.x=geometry.exit.x;exit.y=geometry.exit.y;
    G.Camera.x=pl.x;G.Camera.y=pl.y;G.Path.update(1,[pl]);G.Touch.reset();G.Input.reset();objectives=[];boss=null;
    if(extractionAvailable)G.Spawner.say('Este sector tiene extracción · disponible al despejarlo',5,true);
  }
  function start(player,options={}){
    pl=player;pl.fieldMode=true;pl.r=12;pl.soldierId=options.soldierId||pl.soldierId||'guard';pl.tempStats={};
    sector=1;wave=1;elapsed=0;result=null;pending=0;cards=[];interaction=0;drought=0;upgradesApplied=0;pendingXp=0;resumePhase='combat';
    totals={wavesCompleted:0,sectorsCompleted:0,bossesDefeated:0,bossesEvaded:0};
    runSeed=Number.isFinite(options.seed)?options.seed>>>0:(Math.random()*0xffffffff)>>>0;
    rng=random(runSeed);nextBossSector=4+Math.floor(rng()*3);
    G.FieldStats.apply(pl);G.FieldAbilities.reset(pl);G.FieldCombat.reset(pl,options.loadout);map();beginWave();
  }
  function freeSpawn(enemy){
    const points=geometry.spawnPoints;
    if(!points.length)return null;
    const offset=Math.floor(spawnRng()*points.length);
    for(let n=0;n<points.length;n++){
      const p=points[(offset+n)%points.length];
      if(G.Camera.sees(p.x,p.y,20)||!G.World.isFree(p.x,p.y,enemy?enemy.r:14)||!G.Path.reachable(p.x,p.y,pl))continue;
      if(enemy){enemy.x=p.x;enemy.y=p.y;enemy.pursuerWarn=0;enemy.bioWarn=0;enemy.stalled=0;enemy.losAt=0;}
      return[p.x,p.y];
    }
    return null;
  }
  function spawnOne(){
    if((objective==='neutralize'&&spawned>=quota)||(objective==='survive'&&waveTime>=60)||G.EnemyMgr.count>=G.Spawner.CAP)return false;
    const pos=freeSpawn();if(!pos)return false;
    const def=(sector===1&&wave===1)||spawned%4!==3?G.Content.pursuer:G.Content.biological;
    const e=G.EnemyMgr.add(new G.Enemy(def,pos[0],pos[1],scale()));objectives.push(e);spawned++;return true;
  }
  function beginWave(){
    phase='combat';objective=wave%2===0?'survive':'neutralize';spawned=0;objectives=[];spawnClock=0;cards=[];waveTime=0;waveKills=pl.kills;
    quota=sector===1&&wave===1?12:Math.min(60,16+4*(sector-1)+2*(wave-1));
    boundary('wave-start');
    for(let i=0;i<4;i++)spawnOne();
    G.Spawner.say(`Sector ${sector} · Oleada ${wave} · ${objective==='survive'?'Resiste 60 s':`Neutraliza ${quota}`}${extractionAvailable?' · extracción al despejar':''}`,4,true);
  }
  function beginBoss(){
    phase='boss';objective='boss';wave=1;cards=[];objectives=[];spawned=0;waveTime=0;
    boundary('boss-start');
    boss=G.EnemyMgr.add(new G.Enemy(G.Content.boss,geometry.bossSpawn.x,geometry.bossSpawn.y,scale(1),true));
    G.Spawner.say('Custodio · Puedes combatir o huir por la salida señalada',5,true);
  }
  function promptUpgrade(){
    if(!pending||phase==='levelup')return;
    cards=G.FieldUpgrades.offer(pl);
    if(!cards.length)return; // D214: a saturated build must not block preparation.
    resumePhase=phase;phase='levelup';G.Touch.reset();G.Input.reset();
  }
  function processXp(){
    if(pending||pendingXp<=0)return;
    const amount=Math.min(pendingXp,Math.max(0,pl.xpNext-pl.xp));
    pendingXp=Math.max(0,pendingXp-amount);
    if(pl.gainXp(amount,{alreadyScaled:true,maxLevels:1})){
      pending=1;promptUpgrade();
    }
  }
  function collect(item){
    if(item.kind==='xp'||item.kind==='xpBig'){
      // Credit the learning bonus once, at collection; choices cannot rescale leftover XP.
      pendingXp+=item.value*pl.xpMul;processXp();
    }
  }
  function gather(){for(const item of [...G.Pickups.all()])if(item.kind==='xp'||item.kind==='xpBig'){collect(item);G.Pickups.removeId(item.id);}}
  function preparation(){G.Projectiles.clear();phase='preparation';prep=20;cards=[];G.Touch.reset();G.Input.reset();gather();boundary('preparation');}
  function closeWave(){totals.wavesCompleted++;if(wave===sectorWaves)totals.sectorsCompleted++;preparation();}
  function choose(index){
    if(G.RunContinuity?.canAdvance()===false)return false;
    if(phase!=='levelup'||pending!==1||!cards[index])return false;
    cards[index].apply(pl);pending=0;upgradesApplied++;cards=[];phase=resumePhase;
    G.Input.reset();G.Touch.reset();processXp();
    if(phase==='preparation')ready();
    return true;
  }
  function ready(){
    if(G.RunContinuity?.canAdvance()===false)return false;
    if(phase!=='preparation')return false;
    if(kind==='normal'&&wave<sectorWaves){wave++;beginWave();}
    else{phase='exploration';G.Spawner.say(extractionAvailable?'Sector despejado · puedes continuar o extraer':'Sector despejado · busca la salida señalada',4,true);boundary('exploration');}
    return true;
  }
  function advance(){sector++;wave=1;interaction=0;map();if(kind==='boss')beginBoss();else beginWave();}
  function setInteraction(seconds){interaction=seconds;startX=pl.x;startY=pl.y;startHp=pl.hp;startDamage=pl.fieldDamageRevision||0;G.Touch.reset();G.Input.reset();}
  function useExit(action='continue'){
    if(G.RunContinuity?.canAdvance()===false)return false;
    if(!pl||G.U.dist(pl.x,pl.y,exit.x,exit.y)>exit.r)return false;
    if(action==='escape'&&kind==='boss'&&phase==='boss'){phase='escaping';setInteraction(2);return true;}
    if(phase!=='exploration')return false;
    if(action==='extract'){if(!extractionAvailable)return false;phase='extracting';setInteraction(3);return true;}
    if(action==='continue'){advance();return true;}return false;
  }
  function summon(owner,count){
    if(!owner||owner!==boss||owner.dead||!['boss','escaping'].includes(phase))return 0;
    owner.minions=owner.minions.filter(e=>!e.dead);let made=0;
    const max=Math.min(count,4-owner.minions.length,G.Spawner.CAP-G.EnemyMgr.count);
    for(let i=0;i<max;i++){
      let pos=null;
      for(let n=0;n<16;n++){const a=(n+i*8)*Math.PI/8,x=owner.x+Math.cos(a)*100,y=owner.y+Math.sin(a)*100;
        if(G.World.isFree(x,y,12)&&G.Path.reachable(x,y,pl)){pos=[x,y];break;}}
      if(!pos)break;
      const e=G.EnemyMgr.add(new G.Enemy(G.Content.pursuer,pos[0],pos[1],scale(1)));owner.minions.push(e);made++;
    }
    return made;
  }
  function victory(){
    if(!boss)return;
    // Enemy.die emitted exactly220 rawXP; collect once and withdraw living reinforcements without death/loot.
    G.EnemyMgr.clear();totals.bossesDefeated++;totals.sectorsCompleted++;
    nextBossSector=sector+4+Math.floor(rng()*3);boss=null;preparation();
  }
  function finish(reason){
    if(phase==='finished'||phase==='idle')return;
    phase='finished';cards=[];pending=0;pendingXp=0;G.Input.reset();G.Touch.reset();G.Projectiles.clear();
    result={reason,sector,wave,kills:pl.kills,level:pl.level,elapsed,hp:pl.hp,runSeed,...totals};
    G.FieldCombat.clearTemporary(pl);G.FieldAbilities.reset(pl);
    G.RunContinuity?.finish(result);
  }
  function recover(){
    for(const e of objectives){
      if(!e.dead&&!G.EnemyMgr.get(e.id))G.EnemyMgr.add(e);if(e.dead)continue;
      const moved=e.lastX==null?1:Math.hypot(e.x-e.lastX,e.y-e.lastY);
      e.stalled=moved<.05?(e.stalled||0)+lastDt:0;e.lastX=e.x;e.lastY=e.y;
      e.unreachable=G.Path.reachable(e.x,e.y,pl)?0:(e.unreachable||0)+lastDt;
      if((e.stalled>10||e.unreachable>10)&&!G.Camera.sees(e.x,e.y,0))if(freeSpawn(e)){e.unreachable=0;e.stalled=0;}
    }
  }
  let lastDt=0;
  function update(dt){
    if(G.RunContinuity?.canAdvance()===false)return;
    if(!pl||phase==='idle'||phase==='finished')return;
    if(pl.dead||pl.hp<=0){finish('death');return;}
    if(phase==='levelup')return;
    promptUpgrade();if(phase==='levelup')return;
    elapsed+=dt;lastDt=dt;const combat=['combat','boss','escaping'].includes(phase);
    G.FieldAbilities.tick(dt,pl);
    G.FieldCombat.tick(dt,pl,combat);const regen=pl.regenFlat;if(!combat&&phase!=='preparation')pl.regenFlat=0;
    pl.update(dt);pl.regenFlat=regen;G.Camera.follow(pl.x,pl.y,dt);G.World.update(dt,G.Camera);G.FX.update(dt);G.Spawner.tickBanner(dt);
    if(combat){
      if(kind==='normal'){
        waveTime+=dt;
        spawnClock+=dt*Math.min(2,.55+.06*(sector-1)+.03*(wave-1));
        while(spawnClock>=1){if(!spawnOne()){spawnClock=Math.min(1,spawnClock);break;}spawnClock--;}
      }
      G.Path.update(dt,[pl]);G.EnemyMgr.update(dt,[pl]);G.Projectiles.update(dt,pl,G.EnemyMgr.all());G.Combat.resolve(dt,pl,elapsed);G.Pickups.update(dt,pl,collect);
      if(pl.dead||pl.hp<=0){finish('death');return;}
      promptUpgrade();
      if(phase==='levelup')return;
      if(kind==='normal'){
        recover();const done=objective==='survive'?waveTime>=60:spawned===quota&&pl.kills-waveKills>=quota;
        if(done&&G.EnemyMgr.count===0){closeWave();return;}
      }else if(boss&&boss.dead&&!G.EnemyMgr.get(boss.id)){victory();return;}
    }
    if(phase==='preparation'){prep=Math.max(0,prep-dt);if(!prep)ready();}
    else if(phase==='escaping'||phase==='extracting'){
      const moved=Math.hypot(pl.x-startX,pl.y-startY)>1||G.Input.axis().some(n=>n!==0);
      const hurt=phase==='escaping'&&((pl.fieldDamageRevision||0)!==startDamage||pl.hp<startHp);
      if(moved||hurt){phase=kind==='boss'?'boss':'exploration';interaction=0;}
      else if((interaction-=dt)<=0){if(phase==='extracting')finish('extracted');else{totals.bossesEvaded++;totals.sectorsCompleted++;nextBossSector=sector+4+Math.floor(rng()*3);advance();}}
    }
  }
  function draw(ctx){
    if(!['exploration','extracting','boss','escaping'].includes(phase))return;
    ctx.save();ctx.fillStyle='#5ac6a233';ctx.strokeStyle='#99ffd6';ctx.lineWidth=3;ctx.beginPath();ctx.arc(exit.x,exit.y,42,0,Math.PI*2);ctx.fill();ctx.stroke();
    ctx.fillStyle='#bdffe0';ctx.font='bold 14px system-ui';ctx.textAlign='center';ctx.fillText(kind==='boss'?'HUIR':'SALIDA',exit.x,exit.y-52);ctx.restore();
  }
  function captureState(){return{phase,sector,wave,sectorWaves,kind,objective,spawned,quota,spawnClock,prep,pending,
    cards:cards.map(c=>c.key),waveKills,waveTime,elapsed,interaction,startX,startY,startHp,startDamage,runSeed,mapSeed,nextBossSector,
    extractionAvailable,drought,totals:{...totals},upgradesApplied,pendingXp,resumePhase,rngState:rng.state(),spawnRngState:spawnRng.state()};}
  function restoreState(saved,player=G.Game.player,world={broken:[],damaged:[]}){
    pl=player;
    ({phase,sector,wave,sectorWaves,kind,objective,spawned,quota,spawnClock,prep,pending,waveKills,waveTime,elapsed,interaction,
      startX,startY,startHp,startDamage,runSeed,mapSeed,nextBossSector,extractionAvailable,drought,upgradesApplied,pendingXp,resumePhase}=saved);
    totals={...saved.totals};rng=random(saved.rngState);spawnRng=random(saved.spawnRngState);result=null;boss=null;objectives=[];
    geometry=G.SectorMaps.generate(mapSeed,{boss:kind==='boss'});
    G.World.reset(mapSeed);G.World.setFixture(geometry.fixture);G.World.setBiome(1,true);G.World.restoreData(world);
    G.Path.clear();G.Pickups.clear();G.EnemyMgr.clear();G.Projectiles.clear();G.Path.update(1,[pl]);
    exit.x=geometry.exit.x;exit.y=geometry.exit.y;G.Camera.x=pl.x;G.Camera.y=pl.y;
    const pool=G.FieldUpgrades.candidates(pl);cards=saved.cards.map(key=>pool.find(card=>card.key===key));
    if(phase==='combat')for(let i=0;i<4;i++)spawnOne();
    else if(phase==='boss')boss=G.EnemyMgr.add(new G.Enemy(G.Content.boss,geometry.bossSpawn.x,geometry.bossSpawn.y,scale(1),true));
    G.Touch.reset();G.Input.reset();
  }
  return{start,update,choose,ready,useExit,summon,finish,draw,captureState,restoreState,get state(){return snapshot();}};
})();
