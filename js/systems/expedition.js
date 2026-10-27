/* P03: expedición local infinita, sobre World/Path/Enemy/Combat de la base. */
G.Expedition = (() => {
  let pl=null, phase='idle', sector=1, wave=1, sectorWaves=3, kind='normal', objective='neutralize';
  let spawned=0, quota=12, spawnClock=0, prep=20, pending=0, cards=[], waveKills=0, waveTime=0;
  let objectives=[], elapsed=0, interaction=0, startX=0, startY=0, startHp=0, startDamage=0, result=null;
  let runSeed=1, mapSeed=1, geometry=null, boss=null, nextBossSector=4, extractionAvailable=false, drought=0;
  let rng=()=>0, spawnRng=()=>0, totals={wavesCompleted:0,sectorsCompleted:0,bossesDefeated:0,bossesEvaded:0};
  let upgradesApplied=0;
  let pendingXp=0, resumePhase='combat';
  let dimensional=false,trialPreparation=false;
  let mapTime=0,doorOpen=false,bossSpawned=false,bossDefeated=false,spawnClosed=false;
  let riftBoss=null,riftBossDefeated=false;
  let elite=null,eliteDefeated=false,armamentResume='combat',terminalResume='combat';
  const v2=()=>!!G.MapTrial?.enabled;
  const exit={x:0,y:0,r:72};
  function random(seed){let n=seed>>>0;const next=()=>{n=(Math.imul(n,1664525)+1013904223)>>>0;return n/4294967296;};next.state=()=>n;return next;}
  function boundary(name){if(v2())return;if(!G.DimensionalRifts?.enabled&&!G.InventoryTrial?.enabled)G.RunCheckpoint?.atBoundary(name);}
  function waveCount(){
    // Independent stream: never consume the boss/extraction or spawn generators.
    let n=(runSeed^Math.imul(sector,0x9e3779b9)^0xa5b35705)>>>0;
    n=Math.imul(n^(n>>>16),0x85ebca6b);n=Math.imul(n^(n>>>13),0xc2b2ae35);
    return 3+Math.floor(random((n^(n>>>16))>>>0)()*3);
  }
  function snapshot(){const dimension=G.RiftExpedition?.state;return{phase:dimension?.active?(dimension.reward?'riftReward':dimension.status==='entering'?'riftTransition':phase==='levelup'?phase:'boss'):phase,...(dimension?.active?{dimension}:{}),sector,wave,sectorWaves,kind,objective,spawned,quota,kills:pl?pl.kills-waveKills:0,
    prep,pending,cards,pendingXp,resumePhase,upgradesApplied,nextUpgradeLevel:pending&&pl?pl.level:null,elapsed,remaining:Math.max(0,60-waveTime),extract:interaction,result,exit,
    nearExit:!!pl&&G.U.dist(pl.x,pl.y,exit.x,exit.y)<=exit.r,runSeed,mapSeed,nextBossSector,extractionAvailable,
    totals:{...totals},dimensional,bossHp:boss?Math.max(0,boss.hp):0,bossMaxHp:boss?boss.maxHp:0,
    ...(v2()?{v2:{mapTime,doorOpen,bossSpawned,bossDefeated,spawnClosed,quick:!!G.MapTrial.quick,allies:G.MapTrial.allies||[],...(G.MapTrial.infinite?{infinite:true,elite:elite?{x:elite.x,y:elite.y,hp:elite.hp,dead:elite.dead}:null}:{})}}:{})};}
  function scale(o=wave){return{hp:1+.15*(sector-1)+.05*(o-1),dmg:1+.08*(sector-1),spd:1+Math.min(.2,.02*(sector-1))};}
  function map(){
    dimensional=false;trialPreparation=false;riftBoss=null;riftBossDefeated=false;elite=null;eliteDefeated=false;G.DimensionalRifts?.clear();
    kind=!v2()&&sector===nextBossSector?'boss':'normal';
    sectorWaves=kind==='normal'?waveCount():0;
    extractionAvailable=false;
    if(!v2()&&kind==='normal'&&sector>=3){extractionAvailable=rng()<.25||drought>=3;drought=extractionAvailable?0:drought+1;}
    mapSeed=Math.imul(runSeed^sector,0x45d9f3b)>>>0;spawnRng=random(mapSeed);
    geometry=v2()&&sector===1&&G.SceneM01P1?.active()?G.SceneM01P1.generate(mapSeed):v2()&&sector===1&&(G.MapTrial.expanded||G.MapTrial.rewardRiftPractice)&&G.SceneR7 ? (G.SceneM01A?G.SceneM01A.generate(mapSeed):G.SceneR7.generate(mapSeed)) : v2()&&G.SectorMaps.generateV2?G.SectorMaps.generateV2(mapSeed):G.SectorMaps.generate(mapSeed,{boss:kind==='boss'});
    G.World.reset(mapSeed);G.World.setFixture(geometry.fixture);G.Camera.setSceneView?.(geometry.fixture.sceneRevision||null);G.World.setBiome(1,true);G.Path.clear();G.Pickups.clear();G.EnemyMgr.clear();G.Projectiles.clear();
    pl.x=geometry.entry.x;pl.y=geometry.entry.y;exit.x=geometry.exit.x;exit.y=geometry.exit.y;
    G.Camera.x=pl.x;G.Camera.y=pl.y;G.Path.update(1,[pl]);G.Touch.reset();G.Input.reset();G.RiftCompanion?.placeNear?.(pl);objectives=[];boss=null;
    if(v2()){
      mapTime=G.RiftExpedition?.practice&&sector===2?60:sector===1&&G.MapTrial.quick?(G.MapTrial.startTime??270):0;
      doorOpen=false;bossSpawned=false;bossDefeated=false;spawnClosed=false;spawnClock=0;sectorWaves=0;
      G.MapTrial.reset?.(geometry);
      if(G.MapTrial.expanded)G.WeaponTerminal?.reset(geometry,{sector,seed:mapSeed,player:pl});
      G.ExplorationChests?.reset(geometry,{sector,seed:mapSeed,startTime:mapTime,forcePreview:sector===1&&!!G.MapTrial.chestPractice});
      if(sector===1&&G.MapTrial.rewardBossPractice){
        for(const [dx,dy] of [[-200,0],[200,0],[0,-200],[0,200],[-144,-144],[144,144]]){
          const x=geometry.bossSpawn.x+dx,y=geometry.bossSpawn.y+dy;
          if(!G.World.isFree(x,y,pl.r)||!G.Path.reachable(x,y,pl))continue;
          pl.x=x;pl.y=y;G.Camera.x=x;G.Camera.y=y;G.Path.update(1,[pl]);break;
        }
      }
      if(sector===1&&G.MapTrial.rewardRiftPractice)G.DimensionalRifts?.offer({sector,kind,seed:runSeed,geometry,player:pl,force:true});
      if(sector===1&&G.MapTrial.chestPractice){
        const chest=G.ExplorationChests?.state.chests.find(c=>c.practice);
        if(chest)for(const [dx,dy] of [[-72,0],[72,0],[0,-72],[0,72],[-51,-51],[51,51]]){
          const x=chest.x+dx,y=chest.y+dy;
          if(!G.World.isFree(x,y,pl.r)||!G.Path.reachable(x,y,pl))continue;
          pl.x=x;pl.y=y;G.Camera.x=x;G.Camera.y=y;G.Path.update(1,[pl]);break;
        }
      }
    }
    if(v2())G.RiftExpedition?.startMap(geometry,sector,mapSeed,pl);
    if(extractionAvailable)G.Spawner.say('Este sector tiene extracción · disponible al despejarlo',5,true);
  }
  function start(player,options={}){
    pl=player;pl.fieldMode=true;pl.r=12;pl.soldierId=options.soldierId||pl.soldierId||'guard';pl.tempStats={};
    sector=G.RiftExpedition?.practice?2:1;wave=1;elapsed=0;result=null;pending=0;cards=[];interaction=0;drought=0;upgradesApplied=0;pendingXp=0;resumePhase='combat';
    totals={wavesCompleted:0,sectorsCompleted:0,bossesDefeated:0,bossesEvaded:0};
    runSeed=Number.isFinite(options.seed)?options.seed>>>0:(Math.random()*0xffffffff)>>>0;
    G.RiftExpedition?.startRun(runSeed);
    rng=random(runSeed);nextBossSector=4+Math.floor(rng()*3);
    G.DimensionalRifts?.reset();
    if(v2()){G.ExplorationChests?.startRun();G.EventRewards?.startRun();}
    if(G.MapTrial?.infinite){G.ArmamentRewards?.startRun();pl.infiniteTactical=null;}
    G.FieldStats.apply(pl);G.FieldAbilities.reset(pl);G.FieldCombat.reset(pl,options.loadout);map();
    if(v2()){beginMapTrial();if(sector===1&&G.MapTrial.elitePractice)spawnElite();G.ExpandedPractice?.apply(pl);if(G.MapTrial.expanded&&G.MapTrial.practice==='melee')spawnPracticeTarget();}
    else if(G.InventoryTrial?.directTest){
      trialPreparation=true;phase='preparation';prep=20;objective='neutralize';spawned=0;waveTime=0;quota=12;waveKills=pl.kills;
    }else if(G.DimensionalRifts?.directTest){
      wave=sectorWaves;phase='exploration';objective=wave%2===0?'survive':'neutralize';spawned=0;waveTime=0;quota=12;
      G.DimensionalRifts.offer({sector,kind,seed:runSeed,geometry,player:pl,force:true});
    }else beginWave();
  }
  function freeSpawn(enemy){
    // Select from the nearby pool before drawing the seeded offset; scanning the
    // entire large map from a remote offset would repeatedly pick its first edge.
    const points=v2()?geometry.spawnPoints.filter(p=>Math.abs(p.x-pl.x)<=G.Camera.w/2+240&&Math.abs(p.y-pl.y)<=G.Camera.h/2+240):geometry.spawnPoints;
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
    if(v2()){
      const cap=trialEnemyCap();
      if(spawnClosed||mapTime>=(G.MapTrial.duration??300)||G.EnemyMgr.count>=cap)return false;
      const pos=freeSpawn();if(!pos)return false;
      const def=spawned%4===3?G.Content.biological:G.Content.pursuer;
      const e=G.EnemyMgr.add(new G.Enemy(def,pos[0],pos[1],G.ExpeditionPressure.at(sector,mapTime).scale));objectives.push(e);spawned++;return true;
    }
    if((objective==='neutralize'&&spawned>=quota)||(objective==='survive'&&waveTime>=60)||G.EnemyMgr.count>=G.Spawner.CAP)return false;
    const pos=freeSpawn();if(!pos)return false;
    const def=(sector===1&&wave===1)||spawned%4!==3?G.Content.pursuer:G.Content.biological;
    const e=G.EnemyMgr.add(new G.Enemy(def,pos[0],pos[1],scale()));objectives.push(e);spawned++;return true;
  }
  function trialEnemyCap(){if(G.MapTrial.rewardRiftPractice)return Math.min(24,G.Spawner.CAP)-(bossSpawned?0:1)-(G.DimensionalRifts?.state.status==='open'?1:0);return G.ExpeditionPressure.at(sector,mapTime,G.Spawner.CAP,(bossSpawned?0:1)+(G.MapTrial.rewardRiftPractice&&G.DimensionalRifts?.state.status==='open'?1:0)).cap;}
  function trialBoss(){
    if(bossSpawned||spawnClosed)return;
    // The mandatory boss is independent of the regular enemy cap and camera visibility.
    const points=[geometry.bossSpawn,...geometry.spawnPoints,geometry.entry].filter(Boolean);
    const usable=p=>G.World.isFree(p.x,p.y,22)&&G.Path.reachable(p.x,p.y,pl);
    const point=points.find(p=>G.U.dist(pl.x,pl.y,p.x,p.y)>100&&usable(p))||points.find(usable);
    if(!point)return;
    boss=G.EnemyMgr.add(new G.Enemy(G.Content.boss,point.x,point.y,scale(1+Math.floor(mapTime/60)),true));
    bossSpawned=true;phase='boss';G.Spawner.say('Custodio · derrótalo para cruzar la puerta a los 5:00',5,true);
  }
  function beginMapTrial(){
    phase='combat';objective='survive';spawned=0;waveTime=0;waveKills=pl.kills;cards=[];spawnClock=0;
    for(let i=0;i<4;i++)spawnOne();
    if(mapTime>=(G.MapTrial.bossAt??240))trialBoss();
    G.Spawner.say(`Mapa ${sector} · resiste hasta la puerta de la Fundación`,4,true);
  }
  function trialVictory(){
    if(!boss||!boss.dead||bossDefeated)return;
    bossDefeated=true;totals.bossesDefeated++;
    offerTrialReward('boss',boss);
    if(phase==='levelup')resumePhase='combat';else phase='combat';
  }
  function offerTrialReward(kind,enemy){
    const service=G.MapTrial?.infinite?G.ArmamentRewards:G.EventRewards;
    const plan=service?.offer({id:`${runSeed}:${sector}:${kind}`,kind,seed:mapSeed,player:pl});
    if(plan)G.ExplorationChests?.addReward?.(plan,{x:enemy.x,y:enemy.y});
  }
  function spawnElite(){
    const points=(geometry.spawnPoints||[]).filter(p=>Math.hypot(p.x-pl.x,p.y-pl.y)>=140&&Math.hypot(p.x-pl.x,p.y-pl.y)<=900&&G.World.isFree(p.x,p.y,18)&&G.Path.reachable(p.x,p.y,pl));
    points.sort((a,b)=>Math.hypot(a.x-pl.x,a.y-pl.y)-Math.hypot(b.x-pl.x,b.y-pl.y));
    const p=points[0];if(!p)return;
    const sc=scale(1);elite=G.EnemyMgr.add(new G.Enemy(G.Content.pursuer,p.x,p.y,{...sc,hp:sc.hp*6,dmg:sc.dmg*1.3}));elite.xp=84;elite.elite=true;elite.name='Élite de armamento';
    G.Spawner.say('PRÁCTICA · vence a la élite para adelantar tu segunda arma',5,true);
  }
  function eliteVictory(){if(elite?.dead&&!eliteDefeated){eliteDefeated=true;offerTrialReward('elite',elite);}}
  function spawnPracticeTarget(){
    const p=[[56,0],[-56,0],[0,56],[0,-56]].map(([dx,dy])=>({x:pl.x+dx,y:pl.y+dy})).find(p=>G.World.isFree(p.x,p.y,18)&&G.Path.reachable(p.x,p.y,pl));
    if(!p)return;const sc=scale(1);const e=G.EnemyMgr.add(new G.Enemy(G.Content.pursuer,p.x,p.y,{...sc,hp:sc.hp*8}));e.practiceTarget=true;
  }
  function awaitTerminal(){
    if(G.RiftExpedition?.state.active)return false;
    if(!G.MapTrial?.expanded||!pl||pl.dead||!(pl.hp>0)||!['combat','boss'].includes(phase)||pending||G.ArmamentRewards?.state.pending)return false;
    terminalResume=phase;phase='terminal';G.Touch.reset();G.Input.reset();return true;
  }
  function resolveTerminal(){
    if(phase!=='terminal')return false;phase=terminalResume;G.Touch.reset();G.Input.reset();processXp();return true;
  }
  function awaitArmament(){
    if(G.RiftExpedition?.state.active)return false;
    if(!G.MapTrial?.infinite||!['combat','boss'].includes(phase))return false;
    armamentResume=phase;phase='armament';G.Touch.reset();G.Input.reset();return true;
  }
  function resolveArmament(){
    if(phase!=='armament')return false;phase=armamentResume;G.Touch.reset();G.Input.reset();processXp();return true;
  }
  function trialRiftVictory(){
    if(!riftBoss||!riftBoss.dead||riftBossDefeated)return;
    riftBossDefeated=true;G.DimensionalRifts?.complete('defeated');offerTrialReward('rift',riftBoss);
  }
  function trialCross(){
    if(G.RiftExpedition?.state.active)return false;
    if(!doorOpen||!bossDefeated||!['combat','boss'].includes(phase)||G.U.dist(pl.x,pl.y,exit.x,exit.y)>24+pl.r)return false;
    if(G.MapTrial.infinite){
      gather();processXp();if(pending||pendingXp>0||phase==='levelup')return false;
      if(G.ArmamentRewards?.claimAll(pl)===false||phase==='armament')return false;
    }
    totals.sectorsCompleted++;sector++;wave=1;interaction=0;map();beginMapTrial();return true;
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
    const applied=cards[index].apply(pl);
    if(G.MapTrial?.infinite&&applied===false){cards=G.FieldUpgrades.offer(pl);return false;}
    pending=0;upgradesApplied++;cards=[];phase=resumePhase;
    G.Input.reset();G.Touch.reset();processXp();
    if(phase==='preparation')ready();
    return true;
  }
  function ready(){
    if(v2())return false;
    if(G.RunContinuity?.canAdvance()===false)return false;
    if(phase!=='preparation')return false;
    if(trialPreparation){trialPreparation=false;beginWave();return true;}
    if(kind==='normal'&&wave<sectorWaves){wave++;beginWave();}
    else{phase='exploration';G.Spawner.say(extractionAvailable?'Sector despejado · puedes continuar o extraer':'Sector despejado · busca la salida señalada',4,true);boundary('exploration');
      G.DimensionalRifts?.offer({sector,kind,seed:runSeed,geometry,player:pl});}
    return true;
  }
  function advance(){sector++;wave=1;interaction=0;map();if(kind==='boss')beginBoss();else beginWave();}
  function setInteraction(seconds){interaction=seconds;startX=pl.x;startY=pl.y;startHp=pl.hp;startDamage=pl.fieldDamageRevision||0;G.Touch.reset();G.Input.reset();}
  function useExit(action='continue'){
    if(G.RunContinuity?.canAdvance()===false)return false;
    if(v2())return action==='continue'&&!!pl&&trialCross();
    if(!pl||G.U.dist(pl.x,pl.y,exit.x,exit.y)>exit.r)return false;
    if(action==='escape'&&(kind==='boss'||dimensional)&&phase==='boss'){phase='escaping';setInteraction(2);return true;}
    if(phase!=='exploration')return false;
    if(action==='extract'){if(!extractionAvailable)return false;phase='extracting';setInteraction(3);return true;}
    if(action==='continue'){advance();return true;}return false;
  }
  function useRift(){
    if(v2()){
      if(!G.MapTrial.rewardRiftPractice||sector!==1||spawnClosed||mapTime>=(G.MapTrial.duration??300)||
        !['combat','boss'].includes(phase)||!pl||pl.dead||pl.hp<=0||riftBoss||!G.DimensionalRifts?.enter(pl))return false;
      const rift=G.DimensionalRifts.state,sc=scale(1);
      riftBoss=G.EnemyMgr.add(new G.Enemy(G.Content.boss,rift.x,rift.y,{...sc,hp:sc.hp*1.35,dmg:sc.dmg*1.15},true));
      riftBoss.name='Custodio dimensional';riftBoss.dimensional=true;riftBoss.dimensionalArrival=1.5;
      return true;
    }
    if(G.RunContinuity?.canAdvance()===false||phase!=='exploration'||!G.DimensionalRifts?.enter(pl))return false;
    const rift=G.DimensionalRifts.state,sc=scale(1);
    boss=G.EnemyMgr.add(new G.Enemy(G.Content.boss,rift.x,rift.y,{...sc,hp:sc.hp*1.35,dmg:sc.dmg*1.15},true));
    boss.name='Custodio dimensional';boss.dimensional=true;boss.dimensionalArrival=1.5;
    dimensional=true;phase='boss';interaction=0;return true;
  }
  function closeDimensional(result){
    G.EnemyMgr.clear();G.Projectiles.clear();boss=null;dimensional=false;interaction=0;phase='exploration';
    G.DimensionalRifts.complete(result);G.Touch.reset();G.Input.reset();gather();
  }
  function summon(owner,count){
    if(v2()&&(spawnClosed||mapTime>=(G.MapTrial.duration??300)))return 0;
    if(!owner||owner.dead||(v2()?(![boss,riftBoss].includes(owner)||!['combat','boss'].includes(phase)):owner!==boss||!['boss','escaping'].includes(phase)))return 0;
    owner.minions=owner.minions.filter(e=>!e.dead);let made=0;
    const max=Math.min(count,4-owner.minions.length,(v2()?trialEnemyCap():G.Spawner.CAP)-G.EnemyMgr.count);
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
    if(dimensional){closeDimensional('defeated');return;}
    // Enemy.die emitted exactly220 rawXP; collect once and withdraw living reinforcements without death/loot.
    G.EnemyMgr.clear();totals.bossesDefeated++;totals.sectorsCompleted++;
    nextBossSector=sector+4+Math.floor(rng()*3);boss=null;preparation();
  }
  function finish(reason){
    if(phase==='finished'||phase==='idle')return;
    phase='finished';cards=[];pending=0;pendingXp=0;G.Input.reset();G.Touch.reset();G.Projectiles.clear();
    result={reason,sector,wave,kills:pl.kills,level:pl.level,elapsed,hp:pl.hp,runSeed,...totals};
    G.DimensionalRifts?.clear();G.RiftExpedition?.clear();
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
  function updateMapTrial(dt){
    if(phase==='armament'||phase==='terminal')return;
    if(G.MapTrial.expanded)G.WeaponTerminal?.tick(dt,pl);
    trialVictory();trialRiftVictory();eliteVictory();
    if(phase==='levelup')return;
    promptUpgrade();if(phase==='levelup')return;
    if(G.MapTrial.rewardRiftPractice)G.DimensionalRifts?.tick(dt);
    elapsed+=dt;lastDt=dt;
    const recoveryStep=G.MapTrial.infinite?Math.min(dt,Math.max(0,(G.MapTrial.duration??300)-mapTime)):dt;
    const nextTime=Math.min(G.MapTrial.duration??300,mapTime+dt),bossAt=G.MapTrial.bossAt??240;
    // Process the boss event before the later cutoff, including a single long frame.
    if(!bossSpawned&&!spawnClosed&&nextTime>=bossAt){mapTime=Math.max(mapTime,bossAt);trialBoss();}
    mapTime=nextTime;
    // Close before enemy AI runs: a pending boss summon cannot cross this boundary.
    if(!spawnClosed&&mapTime>=(G.MapTrial.duration??300)){
      spawnClosed=true;spawnClock=0;doorOpen=true;G.MapTrial.arrive?.();
    }
    G.InfiniteProgression?.tick(dt,pl);G.RiftPowers?.tick(dt,pl);
    G.FieldAbilities.tick(dt,pl,G.MapTrial.infinite?{cooldownStep:recoveryStep}:{});G.FieldCombat.tick(dt,pl,true);
    const regen=pl.regenFlat,regenBuff=pl.buffs?.regen?.n;
    if(G.MapTrial.infinite&&spawnClosed){const fraction=dt>0?recoveryStep/dt:0;pl.regenFlat=regen*fraction;if(pl.buffs?.regen)pl.buffs.regen.n=regenBuff*fraction;}
    pl.update(dt);pl.regenFlat=regen;if(regenBuff!==undefined)pl.buffs.regen.n=regenBuff;
    if(G.RiftExpedition?.checkContact(dt,mapTime,pl))return; // Freeze before origin AI/projectiles/pickups advance.
    if(G.MapTrial.rewardRiftPractice)useRift(); // Contacto instantáneo, sin botón y sin limpiar el escenario.
    G.Camera.follow(pl.x,pl.y,dt);G.World.update(dt,G.Camera);G.FX.update(dt);G.Spawner.tickBanner(dt);
    if(!spawnClosed){
      spawnClock+=dt*G.ExpeditionPressure.at(sector,mapTime).rate;
      while(spawnClock>=1){if(!spawnOne()){spawnClock=0;break;}spawnClock--;}
    }
    G.Path.update(dt,[pl]);G.EnemyMgr.update(dt,[pl]);G.Projectiles.update(dt,pl,G.EnemyMgr.all());
    G.Combat.resolve(dt,pl,elapsed);G.RiftCompanion?.update(dt,pl);G.RiftCompanion?.receiveDamage?.();G.MapTrial.updateAllies?.(dt,pl);G.Pickups.update(dt,pl,collect);
    if(pl.dead||pl.hp<=0){finish('death');return;}
    trialVictory();trialRiftVictory();eliteVictory();promptUpgrade();if(phase==='levelup')return;
    G.ExplorationChests?.tick(dt,mapTime,pl);
    if(!spawnClosed)recover();
    if(!trialCross())G.RiftExpedition?.updateOrigin(dt,mapTime,pl);
  }
  function update(dt){
    if(G.RunContinuity?.canAdvance()===false)return;
    if(!pl||phase==='idle'||phase==='finished')return;
    if(pl.dead||pl.hp<=0){finish('death');return;}
    if(v2()){if(G.RiftExpedition?.state.active){if(phase!=='levelup')G.RiftExpedition.updateRoom(dt,pl);return;}updateMapTrial(dt);return;}
    if(phase==='levelup')return;
    promptUpgrade();if(phase==='levelup')return;
    G.DimensionalRifts?.tick(dt);
    elapsed+=dt;lastDt=dt;const combat=['combat','boss','escaping'].includes(phase);
    G.FieldAbilities.tick(dt,pl);
    G.FieldCombat.tick(dt,pl,combat);const regen=pl.regenFlat;if(!combat&&phase!=='preparation')pl.regenFlat=0;
    pl.update(dt);pl.regenFlat=regen;G.Camera.follow(pl.x,pl.y,dt);G.World.update(dt,G.Camera);G.FX.update(dt);G.Spawner.tickBanner(dt);
    if(phase==='exploration')useRift(); // Contacto con grieta abierta: ingreso instantáneo, sin control adicional.
    if(combat){
      if(kind==='normal'&&!dimensional){
        waveTime+=dt;
        spawnClock+=dt*Math.min(2,.55+.06*(sector-1)+.03*(wave-1));
        while(spawnClock>=1){if(!spawnOne()){spawnClock=Math.min(1,spawnClock);break;}spawnClock--;}
      }
      G.Path.update(dt,[pl]);G.EnemyMgr.update(dt,[pl]);G.Projectiles.update(dt,pl,G.EnemyMgr.all());G.Combat.resolve(dt,pl,elapsed);G.Pickups.update(dt,pl,collect);
      if(pl.dead||pl.hp<=0){finish('death');return;}
      promptUpgrade();
      if(phase==='levelup')return;
      if(kind==='normal'&&!dimensional){
        recover();const done=objective==='survive'?waveTime>=60:spawned===quota&&pl.kills-waveKills>=quota;
        if(done&&G.EnemyMgr.count===0){closeWave();return;}
      }else if(boss&&boss.dead&&!G.EnemyMgr.get(boss.id)){victory();return;}
    }
    if(phase==='preparation'){prep=Math.max(0,prep-dt);if(!prep)ready();}
    else if(phase==='escaping'||phase==='extracting'){
      const moved=Math.hypot(pl.x-startX,pl.y-startY)>1||G.Input.axis().some(n=>n!==0);
      const hurt=phase==='escaping'&&((pl.fieldDamageRevision||0)!==startDamage||pl.hp<startHp);
      if(moved||hurt){phase=kind==='boss'||dimensional?'boss':'exploration';interaction=0;}
      else if((interaction-=dt)<=0){if(phase==='extracting')finish('extracted');else if(dimensional)closeDimensional('evaded');else{totals.bossesEvaded++;totals.sectorsCompleted++;nextBossSector=sector+4+Math.floor(rng()*3);advance();}}
    }
  }
  function draw(ctx, {riftLayer = 'all'} = {}){
    if(G.RiftExpedition?.state.active){G.RiftExpedition.drawGround(ctx);return;}
    G.RiftExpedition?.drawGround(ctx);
    if(v2()){G.ExplorationChests?.draw(ctx);if(G.MapTrial.expanded)G.WeaponTerminal?.draw(ctx);if(G.MapTrial.rewardRiftPractice)G.DimensionalRifts?.draw(ctx,riftLayer);G.MapTrial.draw?.(ctx,snapshot());return;}
    G.DimensionalRifts?.draw(ctx,riftLayer);
    if(!['exploration','extracting','boss','escaping'].includes(phase))return;
    ctx.save();ctx.fillStyle='#5ac6a233';ctx.strokeStyle='#99ffd6';ctx.lineWidth=3;ctx.beginPath();ctx.arc(exit.x,exit.y,42,0,Math.PI*2);ctx.fill();ctx.stroke();
    ctx.fillStyle='#bdffe0';ctx.font='bold 14px system-ui';ctx.textAlign='center';ctx.fillText(kind==='boss'||dimensional?'HUIR':'SALIDA',exit.x,exit.y-52);ctx.restore();
  }
  function captureState(){if(v2())return null;return{phase,sector,wave,sectorWaves,kind,objective,spawned,quota,spawnClock,prep,pending,
    cards:cards.map(c=>c.key),waveKills,waveTime,elapsed,interaction,startX,startY,startHp,startDamage,runSeed,mapSeed,nextBossSector,
    extractionAvailable,drought,totals:{...totals},upgradesApplied,pendingXp,resumePhase,rngState:rng.state(),spawnRngState:spawnRng.state()};}
  function restoreState(saved,player=G.Game?.player,world={broken:[],damaged:[]}){
    if(v2())throw new Error('V2: el prototipo de mapas no admite checkpoints heredados');
    dimensional=false;trialPreparation=false;G.DimensionalRifts?.reset();
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
  return{start,update,choose,ready,useExit,useRift,summon,finish,draw,captureState,restoreState,awaitArmament,resolveArmament,awaitTerminal,resolveTerminal,get state(){return snapshot();}};
})();
