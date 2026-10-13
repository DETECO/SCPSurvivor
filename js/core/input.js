/* ============ input.js — teclado y ratón (el táctil está en touch.js) ============ */
G.Input = (() => {
  const down = new Set();
  const pressed = new Set();   // se limpia cada frame
  let mx = 0, my = 0, mdown = false;

  const MOVE_KEYS = {
    up: ['keyw', 'arrowup'], down: ['keys', 'arrowdown'],
    left: ['keya', 'arrowleft'], right: ['keyd', 'arrowright']
  };

  function code(e) { return (e.code || e.key).toLowerCase(); }

  addEventListener('keydown', e => {
    const c = code(e);
    if (!down.has(c)) pressed.add(c);
    down.add(c);
    // En el menú técnico se conservan Tab y la activación nativa de controles.
    const nativeControl = G.LOCAL_TECHNICAL_MODE === true &&
      (c === 'tab' || !G.Game || G.Game.state !== 'playing' ||
       ['BUTTON', 'INPUT', 'TEXTAREA', 'SELECT', 'A'].includes(e.target && e.target.tagName));
    // Evita que el navegador haga scroll con flechas/espacio durante el juego.
    if (!nativeControl && ['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'space', 'tab'].includes(c)) e.preventDefault();
  });
  addEventListener('keyup', e => down.delete(code(e)));
  addEventListener('blur', () => { down.clear(); });
  addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  addEventListener('mousedown', () => mdown = true);
  addEventListener('mouseup', () => mdown = false);

  function reset() { down.clear(); pressed.clear(); mdown = false; }

  return {
    reset,
    /** Vector de movimiento del jugador (teclado o joystick táctil). */
    axis() {
      const t = G.Touch && G.Touch.vector();
      if (t && (t[0] || t[1])) return t;
      let x = 0, y = 0;
      if (MOVE_KEYS.left.some(k => down.has(k))) x -= 1;
      if (MOVE_KEYS.right.some(k => down.has(k))) x += 1;
      if (MOVE_KEYS.up.some(k => down.has(k))) y -= 1;
      if (MOVE_KEYS.down.some(k => down.has(k))) y += 1;
      return G.U.norm(x, y);
    },
    held(c) { return down.has(c); },
    /** true sólo en el frame en que se pulsó. */
    tap(c) { return pressed.has(c); },
    mouse() { return { x: mx, y: my, down: mdown }; },
    endFrame() { pressed.clear(); }
  };
})();
