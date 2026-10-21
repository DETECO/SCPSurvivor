/* Temporary level-up cards. FieldStats owns all attribute calculations. */
G.FieldUpgrades = (() => {
  const ATTRS = {
    health: ['Vitalidad', 7],
    protection: ['Protección', 7],
    power: ['Potencia', 7],
    cadence: ['Cadencia', 7],
    mobility: ['Movilidad', 7],
    collection: ['Recolección', 7],
    learning: ['Aprendizaje', 7],
    recovery: ['Recuperación', 7]
  };
  const fmt = n => String(Number(n.toFixed(2)));
  function description(key, grant) {
    if (key === 'health') return `+${fmt(20 * grant)} de vida máxima y actual (tope +200).`;
    if (key === 'protection') return `+${fmt(6 * grant)} puntos de reducción de daño (tope 70%).`;
    if (key === 'power') return `+${fmt(10 * grant)}% de daño base (tope +100%).`;
    if (key === 'cadence') return `−${fmt(8 * grant)}% de intervalo de disparo (tope combinado 60%).`;
    if (key === 'mobility') return `+${fmt(7 * grant)}% de velocidad (tope combinado +50%).`;
    if (key === 'collection') return `+${fmt(30 * grant)}% de radio de recogida (tope +150%).`;
    if (key === 'learning') return `+${fmt(12 * grant)}% de experiencia (tope +120%).`;
    return `+${fmt(0.9 * grant)} de vida regenerada por segundo (tope temporal 4,5).`;
  }
  function statsFor(pl) { return G.FieldStats.tempStats(pl); }
  function candidates(pl) {
    if(G.MapTrial?.infinite)return infiniteCandidates(pl);
    const s = statsFor(pl), out = [];
    for (const key of G.FieldStats.temporaryKeys) {
      const amount = G.FieldStats.eligibleAmount(pl, key);
      if (amount <= 1e-9) continue;
      const [title, w] = ATTRS[key];
      const grant = Math.min(1, amount);
      out.push({ key, w, title, desc: description(key, grant), apply(p) {
        const grant = Math.min(1, G.FieldStats.eligibleAmount(p, key));
        if (grant <= 0) return false;
        const values = statsFor(p);
        values[key] += grant;
        const next = G.FieldStats.player(p);
        G.FieldStats.apply(p);
        return next;
      } });
    }
    if (Number.isFinite(pl.hp) && pl.hp < pl.maxHp) out.push({ key: 'heal', w: 7, title: 'Primeros auxilios', desc: 'Recupera el 45% de tu vida máxima.', apply(p) {
      p.hp = Math.min(p.maxHp, p.hp + p.maxHp * 0.45);
    } });
    for (let slot = 0; slot < (pl.fieldWeapons || []).length; slot++) {
      const copy = pl.fieldWeapons[slot];
      if (!copy || !copy.id || (Number(copy.level) || 1) >= 5) continue;
      const id = copy.id;
      out.push({ key: `weapon:${id}`, weaponId: id, w: 8, title: `Arma ${slot + 1}: ${G.FieldCatalog.models[copy.model]?.name || copy.model}`,
        desc: '+10% de daño base para esta copia de arma, hasta nivel 5.', apply(p) {
          if (G.FieldCombat && typeof G.FieldCombat.upgrade === 'function') G.FieldCombat.upgrade(id);
          else {
            const target = (p.fieldWeapons || []).find(w => w.id === id);
            if (target && target.level < 5) target.level++;
          }
          G.FieldStats.apply(p);
        } });
    }
    return out;
  }
  function offer(pl, n = 3) {
    if(G.MapTrial?.infinite)return infiniteOffer(pl,n);
    const pool = candidates(pl), picked = [];
    while (picked.length < n && pool.length) {
      const total = pool.reduce((sum, c) => sum + c.w, 0);
      let r = Math.random() * total, idx = pool.length - 1;
      for (let i = 0; i < pool.length; i++) { r -= pool[i].w; if (r < 0) { idx = i; break; } }
      picked.push(pool.splice(idx, 1)[0]);
    }
    return picked;
  }
  const branchNames={power:'Potencia',rhythm:'Ritmo',handling:'Manejo',specialization:'Especialización'};
  const branchEffects={power:'+8% daño; extra +20%',rhythm:'−4% intervalo; extra −8%',handling:'−5% recarga/−3% dispersión; extra −10%/−5%',specialization:'+3% alcance; extra +10% alcance y +1 perforación'};
  const generalEffects={health:'+20 vida; extra +40',protection:'+6 puntos protección; extra +12',power:'+10% daño; extra +20%',cadence:'−8% intervalo; extra −12%',mobility:'+7% velocidad; extra +10%',collection:'+20% radio; extra +50%',learning:'+12% XP; extra +30%',recovery:'+0,6 vida/s; extra +1,5'};
  function infiniteCandidates(pl){
    const out=[],seen=new Set(),s=statsFor(pl),P=G.InfiniteProgression;
    for(const copy of pl.fieldWeapons||[]){
      if(!copy||typeof copy.id!=='string'||seen.has(copy.id)||!Object.prototype.hasOwnProperty.call(G.FieldCatalog.models,copy.model)||!P.ensure(copy))continue;
      seen.add(copy.id);
      for(const branch of P.branches){
        const rank=copy.branches[branch];if(rank>=6)continue;
        const id=copy.id,model=copy.model;
        out.push({key:`weapon:${id}:${branch}`,category:'weapon',weaponId:id,branch,w:8,
          title:`${G.FieldCatalog.models[model].name} · ${branchNames[branch]} ${rank===5?'extra':rank+1+'/5'}`,
          desc:branchEffects[branch]+' · Valores de ensayo; intervalo/recarga mínimos25% de base.',
          apply(p){const target=(p.fieldWeapons||[]).find(c=>c.id===id);
            if(!target||target.model!==model||!P.ensure(target)||target.branches[branch]!==rank)return false;
            const ok=P.upgrade(target,branch);if(ok)G.FieldStats.apply(p);return ok;}});
      }
    }
    for(const key of G.FieldStats.temporaryKeys){
      const rank=s[key];if(!Number.isInteger(rank)||rank<0||rank>=6)continue;
      out.push({key:`general:${key}`,category:'general',w:7,title:`${ATTRS[key][0]} ${rank===5?'extra':rank+1+'/5'}`,
        desc:generalEffects[key]+' · Valores de ensayo; topes globales conservados.',
        apply(p){const current=statsFor(p);if(current[key]!==rank)return false;current[key]++;G.FieldStats.apply(p);return true;}});
    }
    return out;
  }
  function tacticalCards(){
    return [['power','Potencia','+25% daño'],['mobility','Movilidad','+15% velocidad, tope +50%'],['protection','Protección','+15 puntos protección, tope70%']].map(([type,name,effect])=>({
      key:`tactical:${type}`,category:'tactical',w:1,title:`Apoyo táctico · ${name}`,desc:`${effect} durante15s activos. Sustituye el apoyo anterior; no se acumula ni concede monedas.`,apply:p=>G.InfiniteProgression.grantTactical(p,type)}));
  }
  function infiniteOffer(pl,n){
    const pool=infiniteCandidates(pl),picked=[];
    const take=category=>{const valid=pool.filter(c=>!category||c.category===category);if(!valid.length)return;
      const item=valid[Math.floor(Math.random()*valid.length)];picked.push(item);pool.splice(pool.indexOf(item),1);};
    const count=Math.max(0,Math.min(3,Number.isFinite(n)?Math.floor(n):3));
    if(picked.length<count)take('weapon');if(picked.length<count)take('general');
    while(picked.length<count&&pool.length)take();
    for(const card of tacticalCards())if(picked.length<count)picked.push(card);
    return picked;
  }
  return { offer, candidates };
})();
