/* Interfaz provisional de la escena local. No inicia cuentas ni expediciones. */
G.TechnicalUI = (() => {
  const el = id => document.getElementById(id);
  function init() {
    el('btn-technical-start').onclick = () => G.Game.startTechnical();
    el('btn-technical-pause').onclick = () => G.Game.togglePause();
    el('btn-technical-resume').onclick = () => G.Game.togglePause();
    el('btn-technical-menu').onclick = () => G.Game.toUI();
    el('boot').hidden = true;
    el('technical-ready').hidden = false;
    state('ui');
  }
  function state(value) {
    el('technical-ready').hidden = value !== 'ui';
    el('technical-pause').hidden = value !== 'paused';
    el('scene-hud').hidden = value === 'ui' || value === 'error';
    el('scene-footer').hidden = value === 'ui' || value === 'error';
  }
  function tick(player, time) {
    el('scene-time').textContent = G.U.mmss(time);
    el('scene-position').textContent = player ? `${Math.round(player.x)}, ${Math.round(player.y)}` : '0, 0';
  }
  function fail(error) {
    state('error');
    el('boot').hidden = false;
    el('boot').textContent = 'No se pudo iniciar la escena. Recarga la página; si persiste, informa del error.';
    console.error('[SCP Survivor] arranque/escena:', error);
  }
  return { init, state, tick, fail };
})();
