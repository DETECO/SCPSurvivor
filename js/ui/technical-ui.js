/* Interfaz local P02; cuentas y recompensas persistentes siguen en fases posteriores. */
G.TechnicalUI = (() => {
  const el = id => document.getElementById(id);
  let cardSignature = '';
  function start() { G.Audio.unlock(); G.Game.startTechnical(); }
  function sprint() {
    const s = G.Expedition.state;
    if (G.Game.state === 'playing' && s.phase !== 'finished' && !(s.phase === 'preparation' && s.pending)) G.FieldCombat.sprint(G.Game.player);
  }
  function init() {
    el('btn-technical-start').onclick = start;
    el('btn-technical-pause').onclick = () => G.Game.togglePause();
    el('btn-technical-resume').onclick = () => G.Game.togglePause();
    el('btn-technical-menu').onclick = () => G.Game.toUI();
    el('btn-sprint').onclick = sprint;
    el('btn-field-ready').onclick = () => G.Expedition.ready();
    el('btn-field-exit').onclick = () => {
      const s = G.Expedition.state;
      if (s.sector === 2 && !confirm('¿Extraer y terminar esta expedición local?')) return;
      G.Expedition.useExit();
    };
    el('btn-result-restart').onclick = start;
    el('btn-result-menu').onclick = () => G.Game.toUI();
    el('boot').hidden = true; state('ui');
  }
  function state(value) {
    el('technical-ready').hidden = value !== 'ui';
    el('technical-pause').hidden = value !== 'paused';
    for (const id of ['scene-hud','scene-footer','field-controls','field-status']) el(id).hidden = value !== 'playing';
    if (value !== 'playing') { el('field-upgrades').hidden = true; el('field-result').hidden = true; }
  }
  function tick(player, time) {
    if (G.Game.state !== 'playing' || !player) return;
    const s = G.Expedition.state, w = G.FieldCombat.state;
    el('scene-time').textContent = G.U.mmss(s.elapsed);
    el('scene-position').textContent = `${Math.round(player.x)}, ${Math.round(player.y)}`;
    const captions = { combat: `Neutraliza ${Math.min(s.kills,s.quota)}/${s.quota}`, preparation: `Preparación ${Math.ceil(s.prep)} s`, exploration: s.sector === 1 ? 'Busca la salida al este →' : '← Busca la extracción al oeste', extracting: `Extracción ${Math.ceil(s.extract)} s`, finished: 'Expedición terminada' };
    el('field-status').textContent = `S${s.sector} · Oleada ${s.wave}/3 · ${captions[s.phase]} | Vida ${Math.ceil(player.hp)}/${player.maxHp} · Nivel ${player.level} · XP ${Math.floor(player.xp)}/${player.xpNext} | Pistola ${w.ammo}/${w.capacity}${w.reload > 0 ? ' · Recargando' : ''}`;
    el('btn-sprint').textContent = w.sprintCooldown > 0 ? `Sprint ${Math.ceil(w.sprintCooldown)} s` : 'Sprint';
    el('btn-sprint').disabled = w.sprintCooldown > 0 || (s.phase === 'preparation' && s.pending > 0);
    el('btn-field-ready').hidden = s.phase !== 'preparation';
    el('btn-field-ready').disabled = s.pending > 0;
    el('btn-field-exit').hidden = s.phase !== 'exploration';
    el('btn-field-exit').disabled = !s.nearExit;
    el('btn-field-exit').textContent = s.sector === 1 ? 'Siguiente sector' : 'Extraer';
    const showCards = s.phase === 'preparation' && s.pending > 0;
    el('field-upgrades').hidden = !showCards;
    if (showCards) {
      const sig = s.pending + ':' + s.cards.map(c => c.key).join(',');
      if (sig !== cardSignature) {
        cardSignature = sig; el('upgrade-cards').replaceChildren();
        s.cards.forEach((card, index) => {
          const button = document.createElement('button'); button.className = 'upgrade-card';
          const title = document.createElement('strong'); title.textContent = `${index+1}. ${card.title}`;
          const desc = document.createElement('small'); desc.textContent = card.desc;
          button.append(title,desc); button.onclick = () => { if (G.Expedition.state.cards[index] !== card) return; G.Expedition.choose(index); cardSignature = ''; };
          el('upgrade-cards').append(button);
        });
      }
      el('upgrade-count').textContent = `${s.pending} elección(es) pendientes · temporizador detenido`;
    } else cardSignature = '';
    el('field-result').hidden = s.phase !== 'finished';
    if (s.phase === 'finished') {
      const r = s.result;
      el('result-title').textContent = r.reason === 'extracted' ? 'Extracción completada' : 'Has caído';
      el('result-info').textContent = `Sector ${r.sector} · ${r.kills} bajas · Nivel ${r.level} · ${G.U.mmss(r.elapsed)}. Esta prueba no concede recompensas persistentes.`;
      for (const id of ['field-controls','field-status','scene-hud']) el(id).hidden = true;
    }
  }
  function fail(error) {
    state('error'); el('boot').hidden = false;
    el('boot').textContent = 'No se pudo iniciar la partida. Recarga la página; si persiste, informa del error.';
    console.error('[SCP Survivor] arranque/partida:', error);
  }
  return { init, state, tick, fail, sprint };
})();
