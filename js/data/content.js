/* Catálogo provisional P01. No es el catálogo final ni una expedición. */
G.Content = (() => {
  const guard = Object.freeze({ dex: 'guard01', name: 'Guardia novato', hp: 100, spd: 165, atk: 1, types: ['normal'] });
  const fixture = Object.freeze({ minX: -12, maxX: 12, minY: -10, maxY: 10,
    walls: Object.freeze([[3, -5], [3, -4], [3, -3], [3, -2], [3, 2], [3, 3], [3, 4], [3, 5], [-5, -4], [-4, -4], [-5, 4], [-4, 4]].map(Object.freeze)) });
  const pursuer = Object.freeze({ dex: 'pursuer01', name: 'Perseguidor', hp: 30, spd: 60, dmg: 10, xp: 14, radius: 12, behavior: 'pursuer', containment: true });
  const biological = Object.freeze({ dex: 'biological01', name: 'Biológico', hp: 24, spd: 50, dmg: 12, xp: 14, radius: 14, behavior: 'biological', containment: true });
  const boss = Object.freeze({ dex: 'warden01', name: 'Custodio', hp: 600, spd: 45, dmg: 30, xp: 220, radius: 22, behavior: 'containmentBoss', containment: true });
  const sectors = [1, -1].map(sign => ({ minX: -24, maxX: 24, minY: -24, maxY: 24,
    walls: Array.from({length: 47}, (_,i) => i-23).filter(y => y < -2 || y > 1).map(y => [6*sign,y])
      .concat([[-13,-10],[-12,-10],[-13,-9],[-12,-9],[-13,10],[-12,10],[-13,11],[-12,11]]) }));
  function install() {
    G.SPRITE_META.guard01 = { s: 1, base: 'assets/actors/guard01', ext: 'svg', a: {
      Idle: { w: 24, h: 28, n: 1, r: 8, ax: 12, ay: 26, d: [12] },
      Walk: { w: 24, h: 28, n: 2, r: 8, ax: 12, ay: 26, d: [10, 10] }
    } };
    G.SPRITE_META.pursuer01 = { s: 1, base: 'assets/actors/pursuer01', ext: 'svg', a: {
      Idle: { w: 24, h: 28, n: 1, r: 8, ax: 12, ay: 26, d: [12] },
      Walk: { w: 24, h: 28, n: 2, r: 8, ax: 12, ay: 26, d: [12, 12] }
    } };
    for (const dex of ['biological01','warden01']) G.SPRITE_META[dex] = { s: 1, base: 'assets/actors/' + dex, ext: 'svg', a: {
      Idle: { w: 64, h: 64, n: 1, r: 1, ax: 32, ay: 60, d: [12] },
      Walk: { w: 64, h: 64, n: 1, r: 1, ax: 32, ay: 60, d: [12] }
    } };
    // Paleta provisional; se mantienen autotiling, cachés y dibujo originales.
    Object.assign(G.Tiles.BIOMES[1], { name: 'Sector de entrenamiento',
      floor: ['#5d5b48', '#65624d', '#575543'], dirt: ['#494735', '#514f3a', '#444231'],
      speck: '#434331', light: '#898069', flowers: ['#787459', '#8d8165', '#595e48'],
      wallTop: ['#8b8269', '#978d71', '#817960'], wallLight: '#b3a37f', wallEdge: '#262d29',
      wallFace: ['#62634e', '#575843'], wallFaceDark: '#333c34' });
  }
  return { guard, pursuer, biological, boss, fixture, sectors, install };
})();
