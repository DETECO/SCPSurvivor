/* Armas de campo por copia física. Las fórmulas pertenecen a FieldStats. */
G.FieldCombat = (() => {
  const SWITCH_TIME = 0.2;
  let weapons = [], activeIndex = 0, shotWait = 0, switchRemaining = 0, shots = 0, currentPlayer = null;
  let aimTarget = null;

  function makeCopy(model, id, mods = []) {
    const C = G.FieldCatalog;
    if (!C?.makeWeapon) throw new Error('FieldCatalog is required before FieldCombat');
    return C.makeWeapon(model, id, mods);
  }
  function cloneLoadout(loadout) {
    const C = G.FieldCatalog;
    const source = loadout || C?.defaultLoadout?.();
    if (!Array.isArray(source) || source.length !== 2) throw new Error('Field loadout must contain exactly two weapon copies');
    const ids = source.map(w => w && w.id);
    if (ids.some(id => typeof id !== 'string' || !id.trim()) || new Set(ids).size !== 2) throw new Error('Field weapon copy IDs must be unique nonempty strings');
    return source.map(w => {
      if (!w || typeof w.model !== 'string' || !Array.isArray(w.mods || [] ) || !C?.validateMods?.(w.model,w.mods || [])) throw new Error('Invalid field weapon copy');
      const copy = makeCopy(w.model, w.id, w.mods || []);
      copy.level = Math.max(1, Math.min(5, w.level || 1));
      copy.ammo = Number.isFinite(w.ammo) ? w.ammo : null;
      copy.reload = Number.isFinite(w.reload) ? Math.max(0,w.reload) : 0;
      copy.reloadTime = Number.isFinite(w.reloadTime) ? w.reloadTime : 0;
      return copy;
    });
  }
  function active() { return weapons[activeIndex] || null; }
  function effective(pl, copy) {
    if (!G.FieldStats?.weapon) throw new Error('FieldStats is required before FieldCombat');
    return G.FieldStats.weapon(pl,copy);
  }
  function sync(pl,copy) {
    const e=effective(pl,copy), cap=Math.max(1,e.capacity|0);
    if (copy._initialized !== true) { if (!Number.isFinite(copy.ammo)) copy.ammo=cap; copy._initialized=true; }
    copy.ammo=Math.min(cap,Math.max(0,copy.ammo));
    if (copy.reload>0 && copy.reloadTime>0 && e.reloadTime!==copy.reloadTime) copy.reload=copy.reload/copy.reloadTime*e.reloadTime;
    copy.reloadTime=e.reloadTime;
    return e;
  }
  function reset(pl,loadout) {
    weapons=cloneLoadout(loadout); currentPlayer=pl||null; activeIndex=0; shotWait=0; switchRemaining=0; shots=0; aimTarget=null;
    if (pl) { pl.fieldWeapons=weapons; for (const w of weapons) sync(pl,w); }
  }
  function distance(pl,e) { return Math.hypot(e.x-pl.x,e.y-pl.y); }
  function blocksLOS(pl,x,y) {
    const block=G.World?.projectileBlock?.(x,y,2);
    return block==='wall'||!!(block&&!block.destructible);
  }
  function visible(pl,target) {
    const dx=target.x-pl.x,dy=target.y-pl.y,len=Math.hypot(dx,dy);
    if (!G.World?.projectileBlock) return true;
    for (let d=8;d<len;d+=8) if (blocksLOS(pl,pl.x+dx*d/len,pl.y+dy*d/len)) return false;
    return blocksLOS(pl,target.x,target.y)===false;
  }
  function priority(pl,e) { return distance(pl,e)<=80?0:e.boss?1:2; }
  function targetFor(pl) {
    const copy=active(); if (!copy) return null;
    const range=effective(pl,copy).range;
    const candidates=(G.EnemyMgr?.all?.()||[]).filter(e=>e&&!e.dead&&distance(pl,e)<=range&&visible(pl,e));
    candidates.sort((a,b)=>priority(pl,a)-priority(pl,b)||distance(pl,a)-distance(pl,b));
    if (candidates.length) {
      const best=candidates[0];
      if (aimTarget&&!aimTarget.dead&&candidates.includes(aimTarget)) {
        const oldp=priority(pl,aimTarget),newp=priority(pl,best);
        if (oldp<newp||(oldp===newp&&distance(pl,best)>distance(pl,aimTarget)*.8)) return aimTarget;
      }
      aimTarget=best; return best;
    }
    aimTarget=null;
    const props=G.World?.propsInCircle?.(pl.x,pl.y,range)||[];
    const breakables=props.filter(p=>p&&p.destructible&&p.solid&&p.hp>0&&distance(pl,p)<=range&&visible(pl,p));
    if (!G.World?.propsInCircle&&G.World?.nearestBreakable) {
      const p=G.World.nearestBreakable(pl.x,pl.y,range);
      if (p&&p.destructible&&p.solid&&p.hp>0&&distance(pl,p)<=range&&visible(pl,p)) breakables.push(p);
    }
    breakables.sort((a,b)=>distance(pl,a)-distance(pl,b));
    return breakables[0]||null;
  }
  function angles(aim,e,copy) {
    const spread=e.spread;
    if (e.pellets>1) { const n=Math.max(1,e.pellets|0),fan=spread*Math.PI/180; return Array.from({length:n},(_,i)=>aim+(n===1?0:(i/(n-1)-.5)*fan)); }
    return [aim+(Math.random()-.5)*spread*Math.PI/180];
  }
  function beginReload(pl,copy,e) { if (copy.reload<=0&&copy.ammo<e.capacity) { copy.reload=e.reloadTime; copy.reloadTime=e.reloadTime; } }
  function fire(pl,copy,e,target) {
    const aim=Math.atan2(target.y-pl.y,target.x-pl.x); pl.weaponAim=aim; pl.attackFace=.25;
    for (const a of angles(aim,e,copy)) {
      let x=pl.x+Math.cos(a)*3,y=pl.y+Math.sin(a)*3;
      if (G.World?.projectileBlock?.(x,y,2)) { x=pl.x; y=pl.y; }
      G.Projectiles.spawn({x,y,vx:Math.cos(a)*e.speed,vy:Math.sin(a)*e.speed,
        dmg:e.damage,r:e.pellets>1?2:3,life:e.range/e.speed,pierce:e.pierce||0,hits:new Set(),friendly:true,
        mtype:null,fieldWeapon:true,color:'#e8cf9b',owner:pl});
    }
    copy.ammo--; shots++; shotWait=e.interval; copy.flash=.09;
    if (G.Audio) G.Audio.sfx('shot',{kind:'projectile',type:'normal'});
    if (copy.ammo<=0) beginReload(pl,copy,e);
  }
  function tick(dt,pl,fireAllowed) {
    dt=Math.max(0,dt||0); shotWait=Math.max(0,shotWait-dt); switchRemaining=Math.max(0,switchRemaining-dt);
    if (!pl) return; currentPlayer=pl; pl.fieldWeapons=weapons;
    for (const w of weapons) {
      const e=sync(pl,w); w.flash=Math.max(0,(w.flash||0)-dt);
      if (w.reload>0) { w.reload=Math.max(0,w.reload-dt); if (w.reload===0) w.ammo=e.capacity; }
    }
    const copy=active(); if (!copy||pl.dead||!fireAllowed||switchRemaining>0||shotWait>0) return;
    const e=effective(pl,copy); if (copy.reload>0) return;
    if (copy.ammo<=0) { beginReload(pl,copy,e); return; }
    const target=targetFor(pl); if (target) fire(pl,copy,e,target);
  }
  function switchTo(slot) {
    const i=typeof slot==='number'?slot:weapons.findIndex(w=>w.id===slot);
    if(i<0||i>=weapons.length||i===activeIndex||switchRemaining>0)return false;
    activeIndex=i; switchRemaining=SWITCH_TIME; return true;
  }
  function configureMods(slot,ids) {
    const i=typeof slot==='number'?slot:weapons.findIndex(w=>w.id===slot),w=weapons[i];
    if(!w||!Array.isArray(ids)||ids.length>2||new Set(ids).size!==ids.length)return false;
    const C=G.FieldCatalog;
    if(C?.validateMods&&!C.validateMods(w.model,ids))return false;
    if(C?.mods) for(const id of ids) if(!(C.mods[id]||C.mods.find?.(m=>m.id===id)))return false;
    const pl=currentPlayer,old=w.reloadTime;
    const phase=G.Expedition?.state?.phase;
    if (G.Expedition && !['idle','preparation','finished'].includes(phase)) return false; w.mods=ids.slice();
    if(pl){const e=effective(pl,w);if(w.reload>0&&old>0)w.reload=w.reload/old*e.reloadTime;w.reloadTime=e.reloadTime;w.ammo=Math.min(w.ammo,e.capacity);}
    return true;
  }
  function upgrade(id) { const w=weapons.find(x=>x.id===id); if(!w||w.level>=5)return false; w.level++; return true; }
  function clearTemporary(pl) { currentPlayer=pl||currentPlayer; for(const w of weapons) w.level=1; if(pl){pl.tempStats={}; if(G.FieldStats?.apply) G.FieldStats.apply(pl);} }
  function drawWeapon(ctx,pl,options={}) {
    if(!pl||pl.dead)return;
    const has=Object.prototype.hasOwnProperty.call(options||{},'behind'),behind=has?!!options.behind:null;
    const a=Number.isFinite(pl.weaponAim)?pl.weaponAim:Number.isFinite(pl.aim)?pl.aim:0,ca=Math.cos(a),sa=Math.sin(a),side=Math.PI/2;
    const x=pl.x+ca*7-Math.cos(a+side)*5,y=pl.y-9+sa*7-Math.sin(a+side)*5;
    const isBehind=sa<0;
    if(behind!==null&&isBehind!==behind)return;
    const w=active();ctx.save();ctx.translate(x,y);ctx.rotate(a);ctx.fillStyle='#20252b';ctx.fillRect(-2,-2,12,5);ctx.fillStyle='#b8c2cb';ctx.fillRect(1,-3,9,3);ctx.fillStyle='#687681';ctx.fillRect(-1,1,4,5);ctx.restore();
    if(w?.flash>0){ctx.save();ctx.globalAlpha=Math.min(1,w.flash/.09);ctx.fillStyle='#ffd889';ctx.beginPath();ctx.arc(x+ca*10,y+sa*10,4,0,Math.PI*2);ctx.fill();ctx.restore();}
  }
  function getstate() {
    const pl=currentPlayer||G.Game?.player,list=weapons.map(w=>{const e=effective(pl,w);return {...w,name:e.name||w.model,capacity:e.capacity,reloadTime:e.reloadTime,effective:e};}),w=list[activeIndex]||null;
    const ability=G.FieldAbilities?.state ? G.FieldAbilities.state(pl) : null;
    return {ammo:w?.ammo??0,capacity:w?.capacity??0,reload:w?.reload??0,shotWait,shots,activeIndex,switchRemaining,weapons:list,list2:list,
      sprintRemaining:ability?.remaining||0,sprintCooldown:ability?.cooldown||0,ability,currentability:ability};
  }
  function sprint(pl) { return G.FieldAbilities?.sprint?G.FieldAbilities.sprint(pl):false; }
  return {reset,tick,switchTo,configureMods,upgrade,clearTemporary,targetFor,drawWeapon,sprint,getstate,getweapons:()=>weapons,get state(){return getstate();}};
})();
