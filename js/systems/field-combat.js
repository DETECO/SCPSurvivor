/* Armas de campo por copia física. Las fórmulas pertenecen a FieldStats. */
G.FieldCombat = (() => {
  const SWITCH_TIME = 0.2;
  const infinite=()=>G.MapTrial?.infinite===true;
  let weapons = [], activeIndex = 0, shotWait = 0, switchRemaining = 0, shots = 0, currentPlayer = null;
  let aimTarget = null;

  function makeCopy(model, id, mods = []) {
    const C = G.FieldCatalog;
    if (!C?.makeWeapon) throw new Error('FieldCatalog is required before FieldCombat');
    return C.makeWeapon(model, id, mods);
  }
  function cloneLoadout(loadout) {
    const C = G.FieldCatalog;
    const source = loadout || (infinite()?C?.defaultLoadout?.().slice(0,1):C?.defaultLoadout?.());
    if (!Array.isArray(source) || (infinite()?![1,2].includes(source.length):source.length !== 2)) throw new Error('Field loadout must contain exactly two weapon copies');
    const ids = source.map(w => w && w.id);
    if (ids.some(id => typeof id !== 'string' || !id.trim()) || new Set(ids).size !== source.length) throw new Error('Field weapon copy IDs must be unique nonempty strings');
    return source.map(w => {
      if (!w || typeof w.model !== 'string' || !Array.isArray(w.mods || [] ) || !C?.validateMods?.(w.model,w.mods || [])) throw new Error('Invalid field weapon copy');
      if(infinite()&&(!Object.prototype.hasOwnProperty.call(C.models,w.model)||(w.mods||[]).length))throw new Error('Invalid infinite weapon copy');
      const copy = makeCopy(w.model, w.id, w.mods || []);
      if(infinite()){
        if(w.branches!==undefined)copy.branches={...w.branches};
        if(!G.InfiniteProgression.ensure(copy))throw new Error('Invalid infinite weapon branches');
        if(w.shotWait!==undefined&&(!Number.isFinite(w.shotWait)||w.shotWait<0))throw new Error('Invalid per-copy timer');
        copy.shotWait=w.shotWait||0;Object.defineProperty(copy,'_aimTarget',{value:null,writable:true});
      }
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
    if(e.family==='melee'){copy.ammo=0;copy.reload=0;copy.reloadTime=0;copy._initialized=true;return e;}
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
  function visible(pl,target,strict=false) {
    const dx=target.x-pl.x,dy=target.y-pl.y,len=Math.hypot(dx,dy);
    if (!G.World?.projectileBlock) return true;
    const blocked=(x,y)=>strict?!!G.World.projectileBlock(x,y,2):blocksLOS(pl,x,y);
    for (let d=8;d<len;d+=8) if (blocked(pl.x+dx*d/len,pl.y+dy*d/len)) return false;
    return blocked(target.x,target.y)===false;
  }
  function priority(pl,e) { return distance(pl,e)<=80?0:e.boss?1:2; }
  function targetFor(pl, copy=active()) {
    if (!copy) return null;
    const oldTarget=infinite()?copy._aimTarget:aimTarget;
    const remember=target=>{if(infinite())copy._aimTarget=target;else aimTarget=target;return target;};
    const range=effective(pl,copy).range;
    const strict=G.FieldCatalog.models[copy.model]?.family==='melee';
    const candidates=(G.EnemyMgr?.all?.()||[]).filter(e=>e&&!e.dead&&distance(pl,e)<=range&&visible(pl,e,strict));
    candidates.sort((a,b)=>priority(pl,a)-priority(pl,b)||distance(pl,a)-distance(pl,b));
    if (candidates.length) {
      const best=candidates[0];
      if (oldTarget&&!oldTarget.dead&&candidates.includes(oldTarget)) {
        const oldp=priority(pl,oldTarget),newp=priority(pl,best);
        if (oldp<newp||(oldp===newp&&distance(pl,best)>distance(pl,oldTarget)*.8)) return oldTarget;
      }
      return remember(best);
    }
    remember(null);
    if(effective(pl,copy).family==='melee')return null;
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
    copy.ammo--; shots++; if(infinite())copy.shotWait=e.interval;else shotWait=e.interval; copy.flash=.09;
    if (G.Audio) G.Audio.sfx('shot',{kind:'projectile',type:'normal'});
    if (copy.ammo<=0) beginReload(pl,copy,e);
  }
  function strike(pl,copy,e,target){
    const aim=Math.atan2(target.y-pl.y,target.x-pl.x);pl.weaponAim=aim;pl.attackFace=.25;
    const list=(G.EnemyMgr?.all?.()||[]).filter(enemy=>enemy&&!enemy.dead&&enemy.hp>0&&distance(pl,enemy)<=e.range&&visible(pl,enemy,true)&&
      Math.abs(Math.atan2(Math.sin(Math.atan2(enemy.y-pl.y,enemy.x-pl.x)-aim),Math.cos(Math.atan2(enemy.y-pl.y,enemy.x-pl.x)-aim)))<=e.arc/2)
      .sort((a,b)=>distance(pl,a)-distance(pl,b)).slice(0,e.maxTargets);
    if(!list.length)return;
    for(const enemy of list)enemy.hurt(e.damage,'#eee4e7',enemy.x-pl.x,enemy.y-pl.y,0);
    copy.shotWait=e.interval;copy.flash=.09;shots++;
    G.FX?.slash?.(pl.x,pl.y,aim,e.range,e.arc,'#eee4e7',{melee:'impact',pal:'normal'});
    G.Audio?.sfx('shot',{kind:'melee',type:'normal'});
  }
  function tick(dt,pl,fireAllowed) {
    dt=Math.max(0,dt||0); shotWait=Math.max(0,shotWait-dt); switchRemaining=Math.max(0,switchRemaining-dt);
    if (!pl) return; currentPlayer=pl; pl.fieldWeapons=weapons;
    for (const w of weapons) {
      const e=sync(pl,w); w.flash=Math.max(0,(w.flash||0)-dt);
      if(infinite())w.shotWait=Math.max(0,(w.shotWait||0)-dt);
      if (w.reload>0) { w.reload=Math.max(0,w.reload-dt); if (w.reload===0) w.ammo=e.capacity; }
    }
    if(infinite()){
      if(pl.dead||!(pl.hp>0)||!fireAllowed)return;
      for(const copy of weapons){
        const e=effective(pl,copy);if(copy.reload>0||copy.shotWait>0)continue;
        if(e.family==='melee'){const target=targetFor(pl,copy);if(target)strike(pl,copy,e,target);continue;}
        if(copy.ammo<=0){beginReload(pl,copy,e);continue;}
        const target=targetFor(pl,copy);if(target)fire(pl,copy,e,target);
      }
      return;
    }
    const copy=active(); if (!copy||pl.dead||!fireAllowed||switchRemaining>0||shotWait>0) return;
    const e=effective(pl,copy); if (copy.reload>0) return;
    if (copy.ammo<=0) { beginReload(pl,copy,e); return; }
    const target=targetFor(pl); if (target) fire(pl,copy,e,target);
  }
  function switchTo(slot) {
    if(infinite())return false;
    const i=typeof slot==='number'?slot:weapons.findIndex(w=>w.id===slot);
    if(i<0||i>=weapons.length||i===activeIndex||switchRemaining>0)return false;
    activeIndex=i; switchRemaining=SWITCH_TIME; return true;
  }
  function configureMods(slot,ids) {
    if(infinite())return false;
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
  function acquire(model,id){
    if(!infinite()||!currentPlayer||currentPlayer.dead||!(currentPlayer.hp>0)||weapons.length!==1||
      typeof id!=='string'||!id.trim()||weapons.some(w=>w.id===id)||!Object.prototype.hasOwnProperty.call(G.FieldCatalog.models,model)||!G.FieldCatalog.validateMods(model,[]))return false;
    const next=cloneLoadout([{model,id,mods:[]}])[0];sync(currentPlayer,next);weapons.push(next);currentPlayer.fieldWeapons=weapons;return true;
  }
  function replace(id,model,newId){
    const index=weapons.findIndex(w=>w.id===id);
    if(G.MapTrial?.expanded!==true||G.Expedition?.state?.phase!=='terminal'||!currentPlayer||currentPlayer.dead||!(currentPlayer.hp>0)||
      currentPlayer.fieldWeapons!==weapons||index<0||typeof newId!=='string'||!newId.trim()||weapons.some(w=>w.id===newId)||
      !G.FieldCatalog.validateMods(model,[]))return false;
    const fresh=cloneLoadout([{id:newId,model,mods:[]}])[0];sync(currentPlayer,fresh);weapons[index]=fresh;return true;
  }
  function upgrade(id,branch) { const w=weapons.find(x=>x.id===id);if(infinite())return !!w&&G.InfiniteProgression.upgrade(w,branch); if(!w||w.level>=5)return false; w.level++; return true; }
  function clearTemporary(pl) { currentPlayer=pl||currentPlayer; for(const w of weapons){w.level=1;if(infinite())w.branches=Object.fromEntries(G.InfiniteProgression.branches.map(k=>[k,0]));}if(infinite()&&pl)pl.infiniteTactical=null; if(pl){pl.tempStats={}; if(G.FieldStats?.apply) G.FieldStats.apply(pl);} }
  function drawWeapon(ctx,pl,options={}) {
    if(!pl||pl.dead)return;
    if(G.TrialWeaponArt?.draw(ctx,pl,options,weapons))return;
    const has=Object.prototype.hasOwnProperty.call(options||{},'behind'),behind=has?!!options.behind:null;
    const a=Number.isFinite(pl.weaponAim)?pl.weaponAim:Number.isFinite(pl.aim)?pl.aim:0,ca=Math.cos(a),sa=Math.sin(a),side=Math.PI/2;
    const x=pl.x+ca*7-Math.cos(a+side)*5,y=pl.y-9+sa*7-Math.sin(a+side)*5;
    const isBehind=sa<0;
    if(behind!==null&&isBehind!==behind)return;
    const w=active();ctx.save();ctx.translate(x,y);ctx.rotate(a);ctx.fillStyle='#20252b';ctx.fillRect(-2,-2,12,5);ctx.fillStyle='#b8c2cb';ctx.fillRect(1,-3,9,3);ctx.fillStyle='#687681';ctx.fillRect(-1,1,4,5);ctx.restore();
    if(w?.flash>0){ctx.save();ctx.globalAlpha=Math.min(1,w.flash/.09);ctx.fillStyle='#ffd889';ctx.beginPath();ctx.arc(x+ca*10,y+sa*10,4,0,Math.PI*2);ctx.fill();ctx.restore();}
  }
  function getstate() {
    const pl=currentPlayer||G.Game?.player,list=weapons.map(w=>{const e=effective(pl,w);return {...w,mods:w.mods.slice(),...(infinite()?{branches:{...w.branches}}:{}),name:e.name||w.model,capacity:e.capacity,reloadTime:e.reloadTime,effective:e};}),w=list[activeIndex]||null;
    const ability=G.FieldAbilities?.state ? G.FieldAbilities.state(pl) : null;
    return {ammo:w?.ammo??0,capacity:w?.capacity??0,reload:w?.reload??0,shotWait,shots,activeIndex,switchRemaining,weapons:list,list2:list,
      sprintRemaining:ability?.remaining||0,sprintCooldown:ability?.cooldown||0,ability,currentability:ability};
  }
  function sprint(pl) { return G.FieldAbilities?.sprint?G.FieldAbilities.sprint(pl):false; }
  function exportData(){
    return {weapons:weapons.map(w=>({id:w.id,model:w.model,mods:w.mods.slice(),level:w.level,ammo:w.ammo,reload:w.reload,reloadTime:w.reloadTime,...(infinite()?{branches:{...w.branches},shotWait:w.shotWait}:{})})),
      activeIndex,shotWait,switchRemaining,shots};
  }
  function restoreData(data,pl){
    const next=cloneLoadout(data.weapons);
    if(infinite()&&(!Number.isInteger(data.activeIndex)||data.activeIndex<0||data.activeIndex>=next.length||![data.shotWait,data.switchRemaining,data.shots].every(n=>Number.isFinite(n)&&n>=0)))throw new Error("Invalid infinite combat state");
    weapons=next;currentPlayer=pl;activeIndex=data.activeIndex;shotWait=data.shotWait;switchRemaining=data.switchRemaining;shots=data.shots;aimTarget=null;
    pl.fieldWeapons=weapons;for(const w of weapons)sync(pl,w);
  }
  return {reset,tick,switchTo,configureMods,acquire,replace,upgrade,clearTemporary,targetFor,drawWeapon,sprint,getstate,exportData,restoreData,getweapons:()=>weapons,get state(){return getstate();}};
})();
