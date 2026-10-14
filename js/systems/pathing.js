/* ============ pathing.js — los enemigos rodean rocas y lagos ============
 * Un "campo de distancias" por jugador: cada pocas décimas se hace un
 * recorrido en anchura (BFS) por las casillas de alrededor del jugador,
 * apuntando cuántos pasos faltan desde cada casilla hasta él. Un enemigo
 * sólo tiene que ir hacia la casilla vecina con menos pasos, y así encuentra
 * el camino alrededor de paredes, rocas, árboles y charcos peligrosos.
 *
 *   - 8 vecinos, sin cortar esquinas (no se cuela entre dos rocas en diagonal).
 *   - Bloquean: paredes, objetos sólidos y lava/veneno/descarga.
 *     El agua se puede cruzar (sólo frena).
 *   - Los que flotan (G.Sprites.hovers) no lo necesitan: van en línea recta.
 *
 * Coste: R=28 casillas de radio → 57×57 = 3.249 casillas por jugador, cada
 * 0,35 s. Los enemigos fuera del campo (muy lejos) van en línea recta.
 */
G.Path = (() => {
  const R = 28, N = R * 2 + 1, EVERY = 0.35;
  const UNSEEN = 0x7fff;
  const fields = new Map();          // jugador -> { ox, oy, dist: Int16Array, t }
  // La expedición usa los límites finitos del sector; el mundo original conserva R28.
  const D8 = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];
  let timer = 0;

  function build(pl) {
    const TS = G.World.TS;
    const px = Math.floor(pl.x / TS), py = Math.floor(pl.y / TS);
    const bounds = pl.fieldMode && G.World.fixture;
    const ox = bounds ? bounds.minX : px - R, oy = bounds ? bounds.minY : py - R;
    const w = bounds ? bounds.maxX - bounds.minX + 1 : N, h = bounds ? bounds.maxY - bounds.minY + 1 : N;
    let f = fields.get(pl);
    if (!f || f.w !== w || f.h !== h) { f = { w, h, dist: new Int16Array(w * h), open: new Uint8Array(w * h), queue: new Int32Array(w * h) }; fields.set(pl, f); }
    f.ox = ox; f.oy = oy;
    const dist = f.dist;
    dist.fill(UNSEEN);
    // Casillas transitables del área (se consultan una vez).
    const open = f.open, queue = f.queue;
    for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) open[j * w + i] = G.World.walkable(ox + i, oy + j) ? 1 : 0;

    const start = (py - oy) * w + px - ox;
    if (px < ox || py < oy || px >= ox + w || py >= oy + h) return;
    open[start] = 1;                 // donde está el jugador siempre cuenta
    dist[start] = 0;
    let head = 0, tail = 0;
    queue[tail++] = start;
    while (head < tail) {
      const c = queue[head++];
      const cx = c % w, cy = (c / w) | 0, d = dist[c] + 1;
      for (let k = 0; k < 8; k++) {
        const nx = cx + D8[k][0], ny = cy + D8[k][1];
        if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
        const n = ny * w + nx;
        if (!open[n] || dist[n] !== UNSEEN) continue;
        // Diagonal: las dos casillas de al lado tienen que estar libres.
        if (k >= 4 && (!open[cy * w + nx] || !open[ny * w + cx])) continue;
        dist[n] = d;
        queue[tail++] = n;
      }
    }
  }

  /** Recalcula los campos de los jugadores vivos (lo llama el anfitrión / solitario). */
  function update(dt, players) {
    timer -= dt;
    if (timer > 0) return;
    timer = EVERY;
    for (const p of [...fields.keys()]) if (!players.includes(p)) fields.delete(p);
    for (const p of players) if (!p.dead) build(p);
  }

  /**
   * Dirección (normalizada) para que `e` llegue hasta `pl` rodeando
   * obstáculos, o null si no hace falta (cerca, fuera del campo o sin camino).
   */
  function dirFor(e, pl) {
    const f = fields.get(pl);
    if (!f) return null;
    const TS = G.World.TS, w = f.w, h = f.h;
    const tx = Math.floor(e.x / TS) - f.ox, ty = Math.floor(e.y / TS) - f.oy;
    if (tx < 0 || ty < 0 || tx >= w || ty >= h) return null;
    const here = f.dist[ty * w + tx];
    if (here <= 1 || here === UNSEEN) return null;   // pegado a ti, o sin camino: directo
    // Con vista despejada hasta el jugador, en línea recta (más natural).
    // Se comprueba cada 0,2 s por enemigo (es lo más caro).
    const now = performance.now();
    if (!e.losAt || now - e.losAt > 200) { e.losAt = now; e.los = clearLine(f, e.x, e.y, pl.x, pl.y, e.r); }
    if (e.los) return null;
    // Siguiente casilla del camino (la vecina con menos pasos, sin cortar esquinas).
    let bx = tx, by = ty, best = here;
    for (let k = 0; k < 8; k++) {
      const x = tx + D8[k][0], y = ty + D8[k][1];
      if (x < 0 || y < 0 || x >= w || y >= h) continue;
      const v = f.dist[y * w + x];
      if (v >= best) continue;
      if (k >= 4 && (!f.open[ty * w + x] || !f.open[y * w + tx])) continue;
      best = v; bx = x; by = y;
    }
    if (bx === tx && by === ty) return null;
    let gx = (f.ox + bx + 0.5) * TS, gy = (f.oy + by + 0.5) * TS;
    // Si va descentrado y el atajo hasta esa casilla roza un obstáculo,
    // primero al centro de la suya (así no se engancha en las esquinas).
    if (!clearLine(f, e.x, e.y, gx, gy, e.r)) { gx = (f.ox + tx + 0.5) * TS; gy = (f.oy + ty + 0.5) * TS; }
    return G.U.norm(gx - e.x, gy - e.y);
  }

  /** ¿Cabe un cuerpo de radio r en línea recta de (ax,ay) a (bx,by)? */
  function clearLine(f, ax, ay, bx, by, r) {
    const TS = G.World.TS, wCols = f.w, hRows = f.h;
    const len = Math.hypot(bx - ax, by - ay);
    if (len < 1) return true;
    const ux = (bx - ax) / len, uy = (by - ay) / len;
    const w = Math.min(r * 0.9, TS * 0.45);
    for (let d = 0; d <= len; d += TS * 0.4) {
      const cx = ax + ux * d, cy = ay + uy * d;
      for (const s of [-w, 0, w]) {
        const x = Math.floor((cx - uy * s) / TS) - f.ox, y = Math.floor((cy + ux * s) / TS) - f.oy;
        if (x < 0 || y < 0 || x >= wCols || y >= hRows) return false;
        if (!f.open[y * wCols + x]) return false;
      }
    }
    return true;
  }

  function clear() { fields.clear(); timer = 0; }

  function reachable(x, y, pl) {
    const f = fields.get(pl); if (!f) return false;
    const w = f.w, h = f.h;
    const tx = Math.floor(x / G.World.TS) - f.ox, ty = Math.floor(y / G.World.TS) - f.oy;
    return tx >= 0 && ty >= 0 && tx < w && ty < h && f.dist[ty * w + tx] !== UNSEEN;
  }
  return { update, dirFor, reachable, clear };
})();
