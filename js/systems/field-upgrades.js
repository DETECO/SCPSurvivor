/* Cartas temporales de la partida de campo. */
G.FieldUpgrades = (() => {
  const ZERO = () => ({ health: 0, power: 0, mobility: 0, cadence: 0,
    protection: 0, recovery: 0, collection: 0, learning: 0 });

  function statsFor(pl) {
    if (!pl.tempStats) pl.tempStats = ZERO();
    for (const key of Object.keys(ZERO())) {
      if (!Number.isFinite(pl.tempStats[key])) pl.tempStats[key] = 0;
    }
    return pl.tempStats;
  }

  function candidates(pl) {
    const s = statsFor(pl), out = [];
    const add = (key, weight, title, desc, apply) => out.push({ key, w: weight, title, desc, apply });
    add('health', 7, 'Vitalidad', '+20 de vida máxima y actual.', p => {
      statsFor(p).health++;
      p.addMaxHp(20);
    });
    add('power', 7, 'Potencia', '+10% de daño base.', p => {
      const t = statsFor(p); t.power++;
      p.atkMul = 1 + 0.1 * t.power;
    });
    if (s.mobility * 0.07 < 0.5) add('mobility', 7, 'Movilidad', '+7% de velocidad base (máximo +50%).', p => {
      const t = statsFor(p); t.mobility++;
      p.spdMul = 1 + Math.min(0.5, 0.07 * t.mobility);
    });
    if (s.cadence * 0.08 < 0.6) add('cadence', 7, 'Cadencia', 'Reduce un 8% la espera entre disparos (máximo 60%).', p => {
      const t = statsFor(p); t.cadence++;
      p.cdMul = 1 - Math.min(0.6, 0.08 * t.cadence);
    });
    if (s.protection * 0.06 < 0.7) add('protection', 7, 'Protección', '+6 puntos porcentuales de reducción de daño (máximo 70%).', p => {
      const t = statsFor(p); t.protection++;
      p.dmgReduce = Math.min(0.7, 0.06 * t.protection);
    });
    add('recovery', 7, 'Recuperación', '+0.9 de vida regenerada por segundo.', p => {
      const t = statsFor(p); t.recovery++; p.regenFlat = 0.9 * t.recovery;
    });
    add('collection', 7, 'Recolección', '+30% al radio base de recogida (78).', p => {
      const t = statsFor(p); t.collection++; p.magnet = 78 * (1 + 0.3 * t.collection);
    });
    add('learning', 7, 'Aprendizaje', '+12% de experiencia ganada.', p => {
      const t = statsFor(p); t.learning++; p.xpMul = 1 + 0.12 * t.learning;
    });
    if (pl.hp < pl.maxHp) add('heal', 7, 'Primeros auxilios', 'Recupera el 45% de tu vida máxima.', p => p.heal(p.maxHp * 0.45));
    if ((pl.weaponLevel || 1) < 5) add('weapon', 8, 'Mejora de arma', '+10% de daño base de la pistola por nivel, hasta nivel 5.', p => {
      p.weaponLevel = Math.min(5, (p.weaponLevel || 1) + 1);
    });
    return out;
  }

  function offer(pl, n = 3) {
    const pool = candidates(pl), picked = [];
    while (picked.length < n && pool.length) {
      const total = pool.reduce((sum, c) => sum + c.w, 0);
      let r = Math.random() * total, idx = pool.length - 1;
      for (let i = 0; i < pool.length; i++) {
        r -= pool[i].w;
        if (r < 0) { idx = i; break; }
      }
      picked.push(pool.splice(idx, 1)[0]);
    }
    return picked;
  }

  return { offer, candidates };
})();
