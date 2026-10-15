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
    const pool = candidates(pl), picked = [];
    while (picked.length < n && pool.length) {
      const total = pool.reduce((sum, c) => sum + c.w, 0);
      let r = Math.random() * total, idx = pool.length - 1;
      for (let i = 0; i < pool.length; i++) { r -= pool[i].w; if (r < 0) { idx = i; break; } }
      picked.push(pool.splice(idx, 1)[0]);
    }
    return picked;
  }
  return { offer, candidates };
})();
