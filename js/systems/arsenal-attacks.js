/* Attacks own only their copy state. No timers, damage or effects in the gallery. */
G.ArsenalAttacks = (() => {
  'use strict';
  const active = () => G.PlayableArsenal?.active() === true;
  const alive = e => e && !e.dead && e.hp > 0;
  function clear(a,b,ignore=null) {
    const dx=b.x-a.x,dy=b.y-a.y,n=Math.max(1,Math.ceil(Math.hypot(dx,dy)/4));
    for(let i=0;i<=n;i++){const block=G.World?.projectileBlock?.(a.x+dx*i/n,a.y+dy*i/n,1);if(block&&block!==ignore)return false;}
    return true;
  }
  function damage(pl,e,n,color,slow=0) {
    e.hurt(n,color,e.x-pl.x,e.y-pl.y,0);
    if(slow)e.applySlow?.(.35,slow);
    pl.onDealt?.(n);pl.dmgDealt=(pl.dmgDealt||0)+n;
  }
  function targets(origin,range) {
    return (G.EnemyMgr?.all?.()||[]).filter(e=>alive(e)&&Math.hypot(e.x-origin.x,e.y-origin.y)<=range&&clear(origin,e))
      .sort((a,b)=>Math.hypot(a.x-origin.x,a.y-origin.y)-Math.hypot(b.x-origin.x,b.y-origin.y));
  }
  const delta=(a,b)=>Math.atan2(Math.sin(a-b),Math.cos(a-b));
  function damageProps(origin,range,amount,color,accept=()=>true,cap=6){
    const props=(G.World?.propsInCircle?.(origin.x,origin.y,range)||[]).filter(p=>p.destructible&&p.hp>0&&Math.hypot(p.x-origin.x,p.y-origin.y)<=range&&accept(p)&&clear(origin,p,p))
      .sort((a,b)=>Math.hypot(a.x-origin.x,a.y-origin.y)-Math.hypot(b.x-origin.x,b.y-origin.y)).slice(0,cap);
    for(const prop of props)G.World.damageProp?.(prop,amount,color);
  }
  function cone(pl,aim,range,arc,cap) { return targets(pl,range).filter(e=>Math.abs(delta(Math.atan2(e.y-pl.y,e.x-pl.x),aim))<=arc/2).slice(0,cap); }
  function beamTargets(pl,aim,range,cap) {
    const ca=Math.cos(aim),sa=Math.sin(aim);
    return targets(pl,range).filter(e=>{const dx=e.x-pl.x,dy=e.y-pl.y,t=dx*ca+dy*sa;return t>=0&&Math.abs(dx*sa-dy*ca)<=Math.max(5,e.r||8);})
      .sort((a,b)=>(a.x-b.x)*ca+(a.y-b.y)*sa).slice(0,cap);
  }
  function beamLength(pl,aim,range,last) {
    const end=last?Math.min(range,Math.hypot(last.x-pl.x,last.y-pl.y)):range;
    for(let d=0;d<=end;d+=4)if(G.World?.projectileBlock?.(pl.x+Math.cos(aim)*d,pl.y+Math.sin(aim)*d,1))return Math.max(0,d-4);
    return end;
  }
  function explode(p) {
    if(p._exploded)return;p._exploded=true;
    const origin={x:p.x,y:p.y},list=targets(origin,p.blastRadius).slice(0,p.maxTargets);
    for(const enemy of list)damage(p.owner,enemy,p.dmg,p.color);
    damageProps(origin,p.blastRadius,p.dmg,p.color);
    G.FX?.ring?.(p.x,p.y,4,p.blastRadius,p.color,.26,2);G.FX?.burst?.(p.x,p.y-(G.LIFT||0),p.color,12,95);
  }
  function finish(copy,e) {copy.shotWait=e.interval;copy.flash=e.attack==='beam'?.12:.16;}
  function fire(pl,copy,e,target) {
    if(!active())return false;
    const aim=Math.atan2(target.y-pl.y,target.x-pl.x),count=(copy.attackCount||0)+1,max=e.level===6;
    copy.attackCount=count;pl.weaponAim=aim;pl.attackFace=.25;
    const color=e.color,worldY=pl.y-(G.LIFT||0);
    if(e.attack==='melee'){
      const arc=max&&count%4===0&&copy.model==='CC04'?Math.PI:e.arc;
      const cap=e.maxTargets+(max&&count%4===0?1:0);
      for(const enemy of cone(pl,aim,e.range,arc,cap))damage(pl,enemy,e.damage,color);
      G.FX?.slash?.(pl.x,pl.y,aim,e.range,arc,color,{melee:'impact',pal:'steel'});
    } else if(e.attack==='beam'){
      const list=beamTargets(pl,aim,e.range,max&&count%4===0?2:1);
      for(const enemy of list)damage(pl,enemy,e.damage,color);
      if(!list.length)damageProps(pl,e.range,e.damage,color,p=>{const dx=p.x-pl.x,dy=p.y-pl.y;return dx*Math.cos(aim)+dy*Math.sin(aim)>=0&&Math.abs(dx*Math.sin(aim)-dy*Math.cos(aim))<=(p.r||4)+2;},1);
      G.FX?.beam?.(pl.x,worldY,aim,beamLength(pl,aim,e.range,list.at(-1)),3,color,{pal:'ice',life:.12});
    } else if(e.attack==='flame'){
      for(const enemy of cone(pl,aim,e.range,e.arc,e.maxTargets+(max&&count%6===0?1:0)))damage(pl,enemy,e.damage,color);
      damageProps(pl,e.range,e.damage,color,p=>Math.abs(delta(Math.atan2(p.y-pl.y,p.x-pl.x),aim))<=e.arc/2,2);
      for(let i=-1;i<=1;i++)G.FX?.beam?.(pl.x,worldY,aim+i*e.arc/3,beamLength(pl,aim+i*e.arc/3,e.range),5,color,{pal:'fire',life:.16});
    } else if(e.attack==='pulse'){
      for(const enemy of targets(pl,e.range).slice(0,e.maxTargets+(max&&count%3===0?2:0)))damage(pl,enemy,e.damage,color,1);
      G.FX?.ring?.(pl.x,worldY,8,e.range,color,.34,2);
    } else if(e.attack==='fusion'){
      const rangeMul=1; // FINAL receives global modifiers once through FieldStats.
      const cut=cone(pl,aim,83*rangeMul,140*Math.PI/180,3),seen=new Set(cut.map(t=>t.id??t));
      for(const enemy of cut)damage(pl,enemy,e.damage*.6,color);
      copy.pendingProjection={remaining:.12,aim,damage:e.damage*.4,range:124*rangeMul,seen:[...seen]};
      G.FX?.slash?.(pl.x,pl.y,aim,83,140*Math.PI/180,color,{pal:'ice'});
    } else {
      let pellets=e.pellets+(max&&e.model==='shotgun'&&count%3===0?1:0),spread=e.spread;
      if(max&&e.model==='smg'&&count%6===0)spread*=.5;
      for(let i=0;i<pellets;i++){
        const a=aim+(pellets>1?(i/(pellets-1)-.5)*spread:(Math.random()-.5)*spread)*Math.PI/180;
        const explosive=['grenade','rocket'].includes(e.attack),distance=explosive?Math.min(e.range,Math.hypot(target.x-pl.x,target.y-pl.y)):e.range;
        const p=G.Projectiles.spawn({x:pl.x,y:pl.y,vx:Math.cos(a)*e.speed,vy:Math.sin(a)*e.speed,dmg:explosive?0:e.damage,
          blastDamage:e.damage,blastRadius:e.radius+(max&&count%(e.attack==='grenade'?3:2)===0?16:0),maxTargets:e.maxTargets,
          r:e.attack==='rocket'?4:2,life:distance/e.speed,pierce:e.pierce+(max&&e.model==='FR07'&&count%3===0?1:0),
          hits:new Set(),friendly:true,fieldWeapon:true,color,owner:pl,arsenalKind:e.attack,arsenalTier:e.tier,arsenalLevel:e.level,
          onImpact:explosive?projectile=>{projectile.dmg=projectile.blastDamage;explode(projectile);}:null,
          onExpire:explosive?projectile=>{projectile.dmg=projectile.blastDamage;explode(projectile);}:null,
          onEnemy:!explosive&&max&&e.model==='RU04'&&count%3===0?()=>{copy.ammo=Math.min(e.capacity,copy.ammo+1);copy.reload=0;}:null});
        // A secondary is a real copy-local projectile, never recursively calls fire().
        if(e.model==='pistol'&&max&&copy.reloadExtraReady){copy.reloadExtraReady=false;copy.pendingExtra={remaining:.12,aim:a,damage:e.damage*.4};}
        if(!p)throw Error('Projectile spawn failed');
      }
    }
    if(!e.ammoFree){copy.ammo--;if(copy.ammo<=0){copy.reload=e.reloadTime;copy.reloadTime=e.reloadTime;}}
    G.FX?.px?.(pl.x+Math.cos(aim)*12,worldY+Math.sin(aim)*12,G.PlayableArsenal.tiers[e.tier],{life:.1,size:1});
    finish(copy,e);G.Audio?.sfx?.('shot',{kind:e.attack==='melee'?'melee':'projectile',type:'normal'});return true;
  }
  function tick(copy,dt,pl,e) {
    for(const key of ['pendingProjection','pendingExtra']){
      const event=copy[key];if(!event)continue;event.remaining=Math.max(0,event.remaining-dt);if(event.remaining>1e-9)continue;copy[key]=null;
      if(key==='pendingProjection'){
        const seen=new Set(event.seen),list=[];
        for(const enemy of beamTargets(pl,event.aim,event.range,32)){
          const id=enemy.id??enemy;if(!seen.has(id)&&seen.size>=4)continue;seen.add(id);list.push(enemy);if(list.length===2)break;
        }
        for(const enemy of list)damage(pl,enemy,event.damage,e.color);
        G.FX?.beam?.(pl.x,pl.y-(G.LIFT||0),event.aim,beamLength(pl,event.aim,event.range,list.at(-1)),3,e.color,{pal:'ice',life:.12});
      }else G.Projectiles.spawn({x:pl.x,y:pl.y,vx:Math.cos(event.aim)*e.speed,vy:Math.sin(event.aim)*e.speed,dmg:event.damage,r:2,life:e.range/e.speed,pierce:0,hits:new Set(),friendly:true,fieldWeapon:true,color:e.color,owner:pl,arsenalKind:'bullet',arsenalTier:e.tier,arsenalLevel:e.level});
    }
  }
  function drawProjectile(ctx,p) {
    if(!p.arsenalKind)return false;
    ctx.save();ctx.translate(p.x,p.y-(G.LIFT||0));ctx.rotate(Math.atan2(p.vy,p.vx));ctx.imageSmoothingEnabled=false;
    ctx.fillStyle=p.color;ctx.strokeStyle=p.color;ctx.lineWidth=2;
    if(p.arsenalKind==='grenade'){ctx.fillRect(-3,-3,6,6);ctx.fillStyle='#eef1d5';ctx.fillRect(2,-1,2,2);}
    else if(p.arsenalKind==='rocket'){ctx.fillRect(-6,-2,10,4);ctx.fillStyle='#fff4c7';ctx.fillRect(-10,-1,4,2);}
    else if(p.arsenalKind==='bolt'){ctx.fillRect(-10,-1,17,2);ctx.beginPath();ctx.moveTo(9,0);ctx.lineTo(4,-3);ctx.lineTo(4,3);ctx.closePath();ctx.fill();}
    else ctx.fillRect(-6,-1,10,2);
    const tier=G.PlayableArsenal.tiers[p.arsenalTier]||'#B8C0CC';ctx.fillStyle=tier;ctx.fillRect(-8,-1,2,2);
    if(p.arsenalLevel>=4){ctx.globalAlpha=.35;ctx.fillStyle=p.color;ctx.fillRect(-15,-1,6,2);}
    ctx.restore();return true;
  }
  return Object.freeze({fire,tick,clear,drawProjectile,explode});
})();
