/* Catálogo provisional P01. No es el catálogo final ni una expedición. */
G.Content = (() => {
  const guard = Object.freeze({ dex: 'guard01', name: 'Guardia novato', hp: 100, spd: 110, atk: 1, types: ['normal'] });
  const fixture = Object.freeze({ minX: -12, maxX: 12, minY: -10, maxY: 10,
    walls: Object.freeze([[3, -5], [3, -4], [3, -3], [3, -2], [3, 2], [3, 3], [3, 4], [3, 5], [-5, -4], [-4, -4], [-5, 4], [-4, 4]].map(Object.freeze)) });
  function install() {
    G.SPRITE_META.guard01 = { s: 1, base: 'assets/actors/guard01', ext: 'svg', a: {
      Idle: { w: 24, h: 28, n: 1, r: 8, ax: 12, ay: 26, d: [12] },
      Walk: { w: 24, h: 28, n: 2, r: 8, ax: 12, ay: 26, d: [10, 10] }
    } };
    // Paleta provisional; se mantienen autotiling, cachés y dibujo originales.
    Object.assign(G.Tiles.BIOMES[1], { name: 'Sector de entrenamiento',
      floor: ['#5d5b48', '#65624d', '#575543'], dirt: ['#494735', '#514f3a', '#444231'],
      speck: '#434331', light: '#898069', flowers: ['#787459', '#8d8165', '#595e48'],
      wallTop: ['#8b8269', '#978d71', '#817960'], wallLight: '#b3a37f', wallEdge: '#262d29',
      wallFace: ['#62634e', '#575843'], wallFaceDark: '#333c34' });
  }
  return { guard, fixture, install };
})();
