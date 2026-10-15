/* Local P02/P04 interface; the local test roster has no persistent unlocks. */
G.TechnicalUI = (() => {
  const el = id => document.getElementById(id);
  let cardSignature = '', editorOpen = false, editorDraft = [[], []];
  const phasesForInput = new Set(['combat', 'preparation', 'exploration', 'boss', 'escaping']);
  const readyToPlay = () => G.Game.state === 'playing' && phasesForInput.has(G.Expedition.state.phase);
  function options() { return G.FieldLoadout.options(); }
  function start() {
    G.Audio.unlock();
    const selected = options();
    if (!selected) return;
    G.Game.startTechnical(selected);
  }
  function ability() {
    const s = G.Expedition.state;
    if (readyToPlay() && !editorOpen) G.FieldAbilities.use(G.Game.player, s.phase);
  }
  function switchWeapon(index) {
    if (readyToPlay() && !editorOpen) G.FieldCombat.switchTo(index);
  }
  function closeEditor() { editorOpen = false; el('field-mod-editor').hidden = true; }
  function updateSoldierHud(player = G.Game.player) {
    const soldier = G.FieldCatalog.soldiers[player?.soldierId] || G.FieldCatalog.soldiers.guard;
    el('scene-soldier').textContent = `${soldier.name.toUpperCase()} · ${soldier.ability === 'heal' ? 'PRIMEROS AUXILIOS' : 'SPRINT'}`;
  }
  function formatWeaponStats(stats) {
    return `Daño ${stats.damage.toFixed(1)} · intervalo ${stats.interval.toFixed(2)} s · cargador ${stats.capacity} · recarga ${stats.reloadTime.toFixed(2)} s · alcance ${stats.range} · velocidad ${stats.speed} · dispersión ${stats.spread.toFixed(1)}° · perdigones ${stats.pellets} · perforación ${stats.pierce}`;
  }
  function renderEditor() {
    const host = el('field-mod-content'); host.replaceChildren();
    const state = G.FieldCombat.state;
    state.weapons.forEach((weapon, slot) => {
      const group = document.createElement('fieldset'); group.className = 'field-mod-group';
      const legend = document.createElement('legend'); legend.textContent = `Arma ${slot + 1}: ${weapon.name}`; group.append(legend);
      for (const [id, mod] of Object.entries(G.FieldCatalog.mods)) {
        const label = document.createElement('label'); label.className = 'loadout-mod';
        const input = document.createElement('input'); input.type = 'checkbox'; input.value = id;
        input.checked = editorDraft[slot].includes(id);
        input.disabled = !G.FieldCatalog.models[weapon.model].compatibleMods.includes(id) || (!input.checked && editorDraft[slot].length >= 2);
        input.addEventListener('change', () => {
          if (input.checked) {
            if (editorDraft[slot].length >= 2) input.checked = false;
            else editorDraft[slot].push(id);
          } else editorDraft[slot] = editorDraft[slot].filter(x => x !== id);
          renderEditor();
        });
        const text = document.createElement('span'); text.textContent = `${mod.name} · ${modDescription(id)}`;
        label.append(input, text); group.append(label);
      }
      const current = G.FieldStats.weapon(G.Game.player, weapon);
      const draft = G.FieldStats.weapon(G.Game.player, { ...weapon, mods: editorDraft[slot] });
      const currentInfo = document.createElement('p'); currentInfo.className = 'field-mod-stats';
      currentInfo.textContent = `Ahora: ${formatWeaponStats(current)}`;
      const draftInfo = document.createElement('p'); draftInfo.className = 'field-mod-stats field-mod-draft';
      draftInfo.textContent = `Con esta selección: ${formatWeaponStats(draft)}`;
      group.append(currentInfo, draftInfo); host.append(group);
    });
    el('field-mod-error').textContent = '';
  }
  function modDescription(id) {
    return ({grip:'menos dispersión',assisted:'recarga más rápida',reinforced:'más daño',extended:'más capacidad',rapid:'más cadencia',piercing:'atraviesa un objetivo'})[id] || '';
  }
  function openEditor() {
    if (!readyToPlay() || G.Expedition.state.phase !== 'preparation') return;
    const state = G.FieldCombat.state;
    editorDraft = state.weapons.map(w => w.mods.slice()); editorOpen = true;
    renderEditor(); el('field-mod-editor').hidden = false;
  }
  function confirmEditor() {
    if (!editorOpen || !readyToPlay() || G.Expedition.state.phase !== 'preparation') { closeEditor(); return; }
    for (let i = 0; i < editorDraft.length; i++) {
      const w = G.FieldCombat.state.weapons[i];
      if (!G.FieldCatalog.validateMods(w.model, editorDraft[i])) {
        el('field-mod-error').textContent = `Revisa los mods del arma ${i + 1}. Puedes elegir hasta dos compatibles.`;
        return;
      }
    }
    for (let i = 0; i < editorDraft.length; i++) {
      if (!G.FieldCombat.configureMods(i, editorDraft[i])) {
        el('field-mod-error').textContent = 'No se pudieron aplicar los cambios. Vuelve a intentarlo durante la preparación.';
        return;
      }
    }
    closeEditor();
  }
  function init() {
    G.FieldLoadout.init();
    el('btn-technical-start').onclick = start;
    el('btn-technical-pause').onclick = () => G.Game.togglePause();
    el('btn-technical-resume').onclick = () => G.Game.togglePause();
    el('btn-technical-menu').onclick = () => G.Game.toUI();
    el('btn-ability').onclick = ability;
    el('btn-field-weapon-0').onclick = () => switchWeapon(0);
    el('btn-field-weapon-1').onclick = () => switchWeapon(1);
    el('btn-mods').onclick = openEditor;
    el('btn-field-mod-confirm').onclick = confirmEditor;
    el('btn-field-mod-cancel').onclick = closeEditor;
    el('btn-field-ready').onclick = () => G.Expedition.ready();
    el('btn-field-exit').onclick = () => {
      const s = G.Expedition.state;
      G.Expedition.useExit(s.kind === 'boss' && s.phase === 'boss' ? 'escape' : 'continue');
    };
    el('btn-field-extract').onclick = () => {
      if (readyToPlay() && confirm('¿Extraer y terminar esta expedición local?')) G.Expedition.useExit('extract');
    };
    el('btn-result-restart').onclick = start;
    el('btn-result-menu').onclick = () => G.Game.toUI();
    document.addEventListener('keydown', event => {
      if (!readyToPlay() || editorOpen || event.repeat) return;
      const key = event.key.toLowerCase();
      if (key === 'q') { event.preventDefault(); switchWeapon(0); }
      else if (key === 'e') { event.preventDefault(); switchWeapon(1); }
    });
    el('boot').hidden = true; state('ui');
  }
  function state(value) {
    document.body.dataset.technicalState = value;
    el('technical-ready').hidden = value !== 'ui';
    el('technical-pause').hidden = value !== 'paused';
    for (const id of ['scene-hud', 'scene-footer', 'field-controls', 'field-status']) el(id).hidden = value !== 'playing';
    if (value === 'playing') updateSoldierHud();
    if (value !== 'playing') {
      el('field-upgrades').hidden = true; el('field-result').hidden = true;
      el('btn-field-weapon-0').disabled = true; el('btn-field-weapon-1').disabled = true; el('btn-ability').disabled = true; el('btn-mods').disabled = true;
      closeEditor();
    }
  }
  function tick(player, time) {
    if (G.Game.state !== 'playing' || !player) return;
    const s = G.Expedition.state, w = G.FieldCombat.state;
    if (editorOpen && s.phase !== 'preparation') closeEditor();
    el('scene-time').textContent = G.U.mmss(s.elapsed);
    el('scene-position').textContent = `${Math.round(player.x)}, ${Math.round(player.y)}`;
    const dx = s.exit.x - player.x, dy = s.exit.y - player.y;
    const direction = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? '→' : '←') : (dy > 0 ? '↓' : '↑');
    const captions = { combat: s.objective === 'survive' ? `Resiste ${Math.ceil(s.remaining)} s y elimina los restantes` : `Neutraliza ${Math.min(s.kills,s.quota)}/${s.quota}`, levelup: `Elige la mejora del nivel ${player.level}`, preparation: `Preparación ${Math.ceil(s.prep)} s`, exploration: `Salida ${direction}${s.extractionAvailable ? ' · puedes extraer' : ''}`, boss: `Custodio ${Math.ceil(s.bossHp)}/${Math.ceil(s.bossMaxHp)} · Huida ${direction}`, escaping: `Huida ${Math.ceil(s.extract)} s · no te muevas`, extracting: `Extracción ${Math.ceil(s.extract)} s`, finished: 'Expedición terminada' };
    const soldier = G.FieldCatalog.soldiers[player.soldierId] || G.FieldCatalog.soldiers.guard;
    updateSoldierHud(player);
    const weaponSummary = w.weapons.map((weapon, i) => `${i + 1} ${weapon.name} ${Math.floor(weapon.ammo)}/${weapon.capacity}${weapon.reload > 0 ? ' recargando' : ''}`).join(' · ');
    el('field-status').textContent = `S${s.sector}${s.kind === 'normal' ? ` · Oleada ${s.wave}/3` : ''} · ${captions[s.phase]} | Vida ${Math.ceil(player.hp)}/${Math.ceil(player.maxHp)} · Nivel ${player.level}${s.pending ? ` (${s.pending} por mejorar)` : ''} · XP ${Math.floor(player.xp)}/${player.xpNext} | ${weaponSummary}`;
    const abilityState = w.currentability || {};
    el('btn-ability').textContent = abilityState.cooldown > 0 ? `${soldier.ability === 'heal' ? 'Primeros auxilios' : 'Sprint'} ${Math.ceil(abilityState.cooldown)} s` : (soldier.ability === 'heal' ? 'Primeros auxilios' : 'Sprint');
    const canUseAbilityInPhase = soldier.ability === 'heal'
      ? ['combat', 'boss', 'escaping', 'preparation'].includes(s.phase)
      : ['combat', 'boss', 'escaping', 'preparation', 'exploration'].includes(s.phase);
    el('btn-ability').disabled = !readyToPlay() || editorOpen || !canUseAbilityInPhase || abilityState.cooldown > 0 || (soldier.ability === 'heal' && player.hp >= player.maxHp);
    const canSwitch = readyToPlay() && !editorOpen;
    for (let i = 0; i < 2; i++) {
      const weapon = w.weapons[i], button = el(`btn-field-weapon-${i}`);
      button.innerHTML = `<strong>${i + 1}</strong><small>${weapon?.name || 'Arma'}</small><small>${weapon ? `${Math.floor(weapon.ammo)}/${weapon.capacity}` : ''}</small>${weapon?.reload > 0 ? '<small>Recargando</small>' : ''}`;
      button.classList.toggle('active', i === w.activeIndex);
      button.disabled = !canSwitch || i === w.activeIndex || w.switchRemaining > 0;
      button.setAttribute('aria-label', `Arma ${i + 1}: ${weapon?.name || 'sin arma'}, ${weapon ? `${Math.floor(weapon.ammo)} de ${weapon.capacity}` : ''}${weapon?.reload > 0 ? ', recargando' : ''}`);
    }
    el('btn-mods').hidden = s.phase !== 'preparation';
    el('btn-mods').disabled = s.phase !== 'preparation' || editorOpen;
    // During a normal rest, allow continuing early when there are no upgrades.
    el('btn-field-ready').hidden = s.phase !== 'preparation';
    el('btn-field-ready').disabled = false;
    el('btn-field-exit').hidden = s.phase !== 'exploration' && s.phase !== 'boss';
    el('btn-field-exit').disabled = !s.nearExit;
    el('btn-field-exit').textContent = s.phase === 'boss' ? 'Huir · 2 s' : 'Siguiente sector';
    el('btn-field-extract').hidden = s.phase !== 'exploration' || !s.extractionAvailable;
    el('btn-field-extract').disabled = !s.nearExit;
    const showCards = s.phase === 'levelup' && s.pending === 1;
    el('field-upgrades').hidden = !showCards;
    if (showCards) {
      const sig = s.nextUpgradeLevel + ':' + s.cards.map(c => c.key).join(',');
      if (sig !== cardSignature) {
        cardSignature = sig; el('upgrade-cards').replaceChildren();
        s.cards.forEach((card, index) => {
          const button = document.createElement('button'); button.className = 'upgrade-card';
          const title = document.createElement('strong');
          const targetCopy = card.weaponId ? w.weapons.findIndex(weapon => weapon.id === card.weaponId) : -1;
          title.textContent = `${index + 1}. ${targetCopy >= 0 ? `Arma ${targetCopy + 1} · ` : ''}${card.title}`;
          const desc = document.createElement('small'); desc.textContent = card.desc;
          button.append(title, desc); button.onclick = () => { if (G.Expedition.state.cards[index] !== card) return; G.Expedition.choose(index); cardSignature = ''; };
          el('upgrade-cards').append(button);
        });
      }
      const earned = s.nextUpgradeLevel;
      el('upgrade-title').textContent = `Nivel ${earned} alcanzado`;
      el('upgrade-count').textContent = `Elige UNA mejora para el nivel ${earned}.`;
      for (const id of ['btn-field-weapon-0', 'btn-field-weapon-1', 'btn-ability', 'btn-mods']) el(id).disabled = true;
    } else cardSignature = '';
    el('field-result').hidden = s.phase !== 'finished';
    if (s.phase === 'finished') {
      const r = s.result;
      el('result-title').textContent = r.reason === 'extracted' ? 'Extracción completada' : 'Has caído';
      el('result-info').textContent = `Sector ${r.sector} · ${r.kills} bajas · Nivel ${r.level} · ${r.wavesCompleted} oleadas · Jefes: ${r.bossesDefeated} vencidos / ${r.bossesEvaded} evadidos · ${G.U.mmss(r.elapsed)}. Esta prueba no concede recompensas persistentes.`;
      for (const id of ['field-controls', 'field-status', 'scene-hud']) el(id).hidden = true;
    }
  }
  function fail(error) {
    state('error'); el('boot').hidden = false;
    el('boot').textContent = 'No se pudo iniciar la partida. Recarga la página; si persiste, informa del error.';
    console.error('[SCP Survivor] arranque/partida:', error);
  }
  return { init, state, tick, fail, options, ability, sprint: ability };
})();
