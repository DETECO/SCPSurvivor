/* Local P02/P04 interface; the local test roster has no persistent unlocks. */
G.TechnicalUI = (() => {
  const el = id => document.getElementById(id);
  let cardSignature = '', editorOpen = false, editorDraft = [[], []];
  const phasesForInput = new Set(['combat', 'preparation', 'exploration', 'boss', 'escaping']);
  const readyToPlay = () => G.Game.state === 'playing' && !G.InventoryTrial?.isOpen && phasesForInput.has(G.Expedition.state.phase);
  function options() { return G.FieldLoadout.options(); }
  function start() {
    G.Audio.unlock();
    const selected = options();
    if (!selected) return;
    if(G.MapTrial?.enabled)selected.seed=1337;
    G.Game.startTechnical(G.ExpandedPractice.prepare(selected));
  }
  function ability() {
    const s = G.Expedition.state;
    if (readyToPlay() && !editorOpen) G.FieldAbilities.use(G.Game.player, s.phase);
  }
  function switchWeapon(index) {
    if (!G.MapTrial?.infinite && readyToPlay() && !editorOpen) G.FieldCombat.switchTo(index);
  }
  function closeEditor() { editorOpen = false; el('field-mod-editor').hidden = true; }
  function updateSoldierHud(player = G.Game.player) {
    const soldier = G.FieldCatalog.soldiers[player?.soldierId] || G.FieldCatalog.soldiers.guard;
    el('scene-soldier').textContent = G.MapTrial?.enabled?soldier.name.toUpperCase():`${soldier.name.toUpperCase()} · ${soldier.ability === 'heal' ? 'PRIMEROS AUXILIOS' : 'SPRINT'}`;
  }
  function compactHud(){
    if(!G.MapTrial?.enabled||el('hud-summary'))return;
    document.body.dataset.v2Hud='true';
    const host=document.createElement('div');host.id='hud-summary';
    el('viewport').append(host);
    for(const id of ['scene-hud','field-status','map-locator','rift-locator','map-alert','rift-alert'])host.append(el(id));
    const note=document.createElement('p');note.id='art-resource-status';note.hidden=true;note.setAttribute('role','status');
    host.insertBefore(note,el('map-locator'));
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
    if(G.MapTrial?.enabled||G.InventoryTrial?.enabled)return;
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
    if(G.MapTrial?.enabled){
      document.body.dataset.mapTrial='v2';
      el('technical-intro').textContent='PRUEBA V2 · Mapa abierto de 160 × 100 casillas con seis ubicaciones alternativas de exploración. Resiste, derrota al jefe y avanza por la puerta de la Fundación.';
      el('technical-account-hint').textContent=(G.MapTrial.publicDemo?'Demo web':'Prueba local')+' sin cuentas, guardado ni recompensas persistentes. Sin mochilas ni accesorios de armas.';
      if(G.MapTrial.publicDemo){
        document.querySelector('header .version').textContent='ALFA · DEMO V2';
        document.querySelector('.footer > p').textContent='Demo web · sin guardado ni recompensas persistentes';
      }
      el('map-test-note').hidden=false;
      el('map-test-note').textContent=G.MapTrial.quick
        ? 'PRUEBA RÁPIDA · Empiezas en 4:30 con el jefe vivo. A 5:00 llega la puerta y dejan de aparecer enemigos. Derrota al jefe y camina sobre la puerta para pasar al siguiente mapa. Los mapas siguientes comienzan en 0:00.'
        : 'MAPAS DE 5 MINUTOS · Jefe provisional en 4:00. A 5:00 llega la puerta con soldados de cobertura. Debes derrotar al jefe para cruzar; los enemigos restantes siguen vivos. Arte y balance provisionales. Las mejoras por nivel todavía usan las cartas anteriores.';
      el('btn-technical-start').textContent=G.MapTrial.quick?'Iniciar prueba rápida V2':'Iniciar mapa V2 · 5 minutos';
      el('map-trial-quick').hidden=false;
      if(G.MapTrial.quick){el('map-trial-quick').href='?prueba=mapa-v2';el('map-trial-quick').textContent='Probar mapa completo: empezar en 0:00';}
      el('chest-trial-link').hidden=false;
      el('chest-test-note').hidden=false;
      el('chest-test-note').textContent=G.MapTrial.chestPractice
        ? 'PRÁCTICA DE COFRES · Empiezas junto a un cofre garantizado. Acércate y permanece 3,5 s; alejarte reduce la apertura. Otorga solo tickets ficticios, sin cuenta ni guardado. Este cofre es una ayuda de prueba: no representa la probabilidad normal.'
        : 'COFRES DE EXPLORACIÓN · Intentos a 1:00, 2:00, 3:00 y 4:00; pueden no aparecer. Solo se indica su ubicación después de descubrirlos. Acércate 3,5 s para abrir. Premios ficticios, sin cuenta ni guardado. La prueba rápida no concede intentos anteriores.';
      if(G.MapTrial.chestPractice)el('btn-technical-start').textContent='Iniciar prueba de cofres';
      el('boss-reward-trial-link').hidden=false;
      el('rift-reward-trial-link').hidden=false;
      if(G.MapTrial.rewardBossPractice||G.MapTrial.rewardRiftPractice){
        el('b3-test-note').hidden=false;
        el('b3-test-note').textContent=G.MapTrial.rewardBossPractice
          ? 'PREMIO DEL JEFE · Empiezas en 4:30 junto al jefe vivo. Derrótalo y permanece 3,5 s junto a su cofre: mejora en +1 nivel temporal una copia de arma equipada elegible (máximo 5). Si no hay mejora compatible, el cofre lo indicará. Sin cuenta ni guardado.'
          : 'PREMIO DIMENSIONAL · Empiezas en 0:00 con una grieta abierta durante 45 s. Entra caminando: el Custodio dimensional aparece en este mismo mapa. Véncelo y abre su cofre permaneciendo cerca 3,5 s: +1 nivel temporal de una copia equipada elegible y 2–3 tickets ficticios. Tabla provisional de prueba; sin mejora compatible, solo esos tickets. Entrar o dejar cerrar la grieta no da premios. El jefe obligatorio y la puerta conservan sus reglas. Sin cuenta ni guardado.';
        el('btn-technical-start').textContent=G.MapTrial.rewardBossPractice?'Probar premio del jefe':'Probar premio dimensional';
      }
    }
    if (G.MapTrial?.infinite) {
      el('technical-intro').textContent='T1A · Una arma inicial, segunda por cofre y disparo simultáneo. Ramas por copia y tres cartas al subir de nivel.';
      el('infinite-test-note').hidden=false;
      el('infinite-test-note').textContent='Prueba parcial: pistola, subfusil y escopeta; valores provisionales. Cuatro ramas por arma: potencia, ritmo, manejo y especialización, cinco rangos y un extra. A 5:00 se detienen regeneración y recuperación de habilidades. Poderes, ultimate, fusión y otras familias quedan para próximas pruebas. La habilidad del soldado es provisional. Sin cuentas ni guardado.';
      for (const id of ['map-test-note','chest-test-note','b3-test-note','map-trial-quick','chest-trial-link','boss-reward-trial-link','rift-reward-trial-link']) el(id).hidden=true;
      el('btn-technical-start').textContent=G.MapTrial.elitePractice?'Probar élite y segunda arma':G.MapTrial.quick?'Probar jefe y segunda arma':'Iniciar T1A · mapa completo';
      document.querySelector('.footer > p').textContent='T1A · Ambas armas disparan automáticamente · Sin guardado';
    }
    const rifts=G.DimensionalRifts;
    if(rifts.enabled&&!G.MapTrial?.enabled){
      el('rift-test-note').hidden=false;
      el('rift-test-note').textContent=rifts.directTest
        ? 'PRUEBA DE GRIETA · Al iniciar tendrás un sector despejado y una grieta durante 45 s. Sigue la flecha y camina sobre la grieta: entrarás al instante. Puedes dejarla cerrar o combatir y huir por la salida. Sin cuenta ni guardado.'
        : 'PRUEBA DE GRIETAS · Pueden aparecer al despejar sectores desde S2. Entrada opcional durante 45 s; sin cuenta ni guardado.';
      if(rifts.directTest)el('btn-technical-start').textContent='Iniciar prueba de grieta';
    }
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
      G.Expedition.useExit(s.phase === 'boss' ? 'escape' : 'continue');
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
    compactHud();G.ExpandedUI.init();
    el('boot').hidden = true; state('ui');
  }
  function state(value) {
    if(G.OperationsMenu?.isEnabled?.()){
      if(value==='ui')G.Audio?.music('village');
      else if(value==='playing'&&G.Audio?.track==='village')G.Audio.music(null);
    }
    document.body.dataset.technicalState = value;G.RiftUI?.hide();
    if(el('art-resource-status'))el('art-resource-status').hidden=true;
    G.ExpandedUI.state(value);
    el('technical-ready').hidden = value !== 'ui';
    el('technical-pause').hidden = value !== 'paused';
    for (const id of ['scene-hud', 'scene-footer', 'field-controls', 'field-status']) el(id).hidden = value !== 'playing';
    if (value === 'playing') updateSoldierHud();
    if (value !== 'playing') {
      el('map-locator').hidden=true;el('map-alert').hidden=true;
      el('chest-status').hidden=true;
      el('rift-alert').hidden=true;el('rift-locator').hidden=true;
      el('field-upgrades').hidden = true; el('field-result').hidden = true; el('armament-choice').hidden = true;
      el('btn-field-weapon-0').disabled = true; el('btn-field-weapon-1').disabled = true; el('btn-ability').disabled = true; el('btn-mods').disabled = true;
      closeEditor();
    }
  }
  function tick(player, time) {
    G.InventoryTrial?.tick();
    if (G.Game.state !== 'playing' || !player) return;
    const s = G.Expedition.state, w = G.FieldCombat.state;
    if (editorOpen && s.phase !== 'preparation') closeEditor();
    el('scene-time').textContent = s.v2?`${G.U.mmss(s.v2.mapTime)} / 5:00`:G.U.mmss(s.elapsed);
    el('scene-position').textContent = `${Math.round(player.x)}, ${Math.round(player.y)}`;
    const dx = s.exit.x - player.x, dy = s.exit.y - player.y;
    const direction = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? '→' : '←') : (dy > 0 ? '↓' : '↑');
    const captions = { combat: s.objective === 'survive' ? `Resiste ${Math.ceil(s.remaining)} s y elimina los restantes` : `Neutraliza ${Math.min(s.kills,s.quota)}/${s.quota}`, armament: 'Elige la segunda arma · partida detenida', levelup: `Elige la mejora del nivel ${player.level}`, preparation: `Preparación ${Math.ceil(s.prep)} s`, exploration: `Salida ${direction}${s.extractionAvailable ? ' · puedes extraer' : ''}`, boss: `${s.dimensional?'Custodio dimensional':'Custodio'} ${Math.ceil(s.bossHp)}/${Math.ceil(s.bossMaxHp)} · Huida ${direction}`, escaping: `Huida ${Math.ceil(s.extract)} s · no te muevas`, extracting: `Extracción ${Math.ceil(s.extract)} s`, finished: 'Expedición terminada' };
    const soldier = G.FieldCatalog.soldiers[player.soldierId] || G.FieldCatalog.soldiers.guard;
    updateSoldierHud(player);
    const weaponSummary = w.weapons.map((weapon, i) => `${i + 1} ${weapon.name} ${Math.floor(weapon.ammo)}/${weapon.capacity}${weapon.reload > 0 ? ' recargando' : ''}`).join(' · ');
    el('field-status').textContent = `${G.DimensionalRifts.directTest?'PRUEBA · ':''}S${s.sector}${s.kind === 'normal' && !s.dimensional && !G.DimensionalRifts.directTest ? ` · Oleada ${s.wave}/${s.sectorWaves}` : ''} · ${captions[s.phase]} | Vida ${Math.ceil(player.hp)}/${Math.ceil(player.maxHp)} · Nivel ${player.level}${s.pending ? ` (${s.pending} por mejorar)` : ''} · XP ${Math.floor(player.xp)}/${player.xpNext} | ${weaponSummary}`;
    if(s.v2){
      const v=s.v2,active=s.phase!=='finished',canShow=active&&s.phase!=='levelup'&&s.phase!=='armament';
      const eliteTarget=G.MapTrial.infinite&&v.elite&&!v.elite.dead&&v.elite.hp>0?v.elite:null;
      const target=eliteTarget||(v.doorOpen?s.exit:G.EnemyMgr.all().find(e=>e.boss&&!e.dimensional&&!e.dead));
      const tx=target?target.x-player.x:0,ty=target?target.y-player.y:0;
      const arrow=['→','↘','↓','↙','←','↖','↑','↗'][(Math.round(Math.atan2(ty,tx)/(Math.PI/4))+8)%8];
      let goal=v.doorOpen?(v.bossDefeated?'PUERTA ABIERTA · cruza caminando':'PUERTA BLOQUEADA · derrota al jefe'):
        v.bossDefeated?'Jefe derrotado · resiste hasta 5:00':v.bossSpawned?'JEFE DEL MAPA · debes derrotarlo':`Puerta en ${G.U.mmss(Math.max(0,300-v.mapTime))}`;
      if(eliteTarget) goal='ÉLITE DE PRÁCTICA · derrótalo para obtener un cofre de armamento';
      el('map-locator').hidden=!canShow;
      el('map-locator').textContent=goal+(target?` · ${arrow} ${Math.ceil(Math.hypot(tx,ty))} u`:'');
      el('map-alert').hidden=!canShow||!(G.MapTrial.alertTime>0);
      el('map-alert').textContent='¡Equipo de la Fundación! «¡Por aquí, te cubrimos!» · '+(v.bossDefeated?'Cruza la puerta.':'Termina con el jefe para avanzar.');
      el('field-status').textContent=`Mapa ${s.sector} · Vida ${Math.ceil(player.hp)}/${Math.ceil(player.maxHp)} · Nivel ${player.level} · XP ${Math.floor(player.xp)}/${player.xpNext}${s.pending?` · ${s.pending} por mejorar`:''}${s.phase==='levelup'?' · '+captions.levelup:s.phase==='armament'?' · '+captions.armament:''}`;
      const chests=G.ExplorationChests?.state;
      el('chest-status').hidden=!canShow||!chests;
      if(chests){
        const known=chests.chests.filter(c=>c.discovered&&!c.opened).sort((a,b)=>Math.hypot(a.x-player.x,a.y-player.y)-Math.hypot(b.x-player.x,b.y-player.y));
        const chest=known[0],cx=chest?chest.x-player.x:0,cy=chest?chest.y-player.y:0;
        const chestArrow=['→','↘','↓','↙','←','↖','↑','↗'][(Math.round(Math.atan2(cy,cx)/(Math.PI/4))+8)%8];
        const chestName=c=>G.MapTrial.infinite&&['boss','elite'].includes(c.type)?'Cofre de armamento':c.type==='boss'?'Cofre del jefe':c.type==='rift'?'Cofre dimensional':'Cofre de exploración';
        const hint=chest?`${chestName(chest)} ${chestArrow} ${Math.ceil(Math.hypot(cx,cy))} u · ${chest.progress>0?`abriendo ${Math.floor(chest.progress/3.5*100)} %`:'acércate y permanece 3,5 s'}`:
          chests.chests.some(c=>!c.opened)?'Cofre sin descubrir · explora el mapa':chests.chests.length?'Cofres abiertos':'Explora · puede aparecer un cofre';
        const outcome=G.MapTrial.infinite?G.ArmamentRewards.state.notice:chests.chests.some(c=>c.opened)?chests.notice:'';
        el('chest-status').hidden=!canShow||!(chest||outcome||chests.ticketTotal>0);
        el('chest-status').textContent=`${chest?hint:outcome}${chest&&outcome?' · '+outcome:''}${chests.ticketTotal>0?' · '+chests.ticketTotal+' tickets ficticios':''}`;
      }
    }
    const resourceNote=el('art-resource-status');
    if(resourceNote){
      const message=G.TrialVisuals?.mode==='clasicos'?'Gráficos clásicos · prueba anterior.':G.PersonajesArt?.status().message||'';
      document.body.toggleAttribute('data-art-fallback',!!message);
      resourceNote.hidden=!message;if(resourceNote.textContent!==message)resourceNote.textContent=message;
    }
    const rift=G.DimensionalRifts.state,open=rift.status==='open';
    el('rift-locator').hidden=!open||s.phase==='finished'||s.phase==='levelup'||s.phase==='armament';
    if(open){
      const rx=rift.x-player.x,ry=rift.y-player.y;
      const arrow=['→','↘','↓','↙','←','↖','↑','↗'][(Math.round(Math.atan2(ry,rx)/(Math.PI/4))+8)%8];
      el('rift-locator').textContent=`GRIETA ${arrow} ${Math.ceil(Math.hypot(rx,ry))} u · cierra en ${Math.ceil(rift.remaining)} s · entra caminando`;
    }
    el('rift-alert').hidden=!rift.alert||s.phase==='finished'||s.phase==='levelup';
    if(el('rift-alert').textContent!==rift.alert)el('rift-alert').textContent=rift.alert;
    const abilityState = w.currentability || {};
    el('btn-ability').textContent = abilityState.cooldown > 0 ? `${soldier.ability === 'heal' ? 'Primeros auxilios' : 'Sprint'} ${Math.ceil(abilityState.cooldown)} s` : (soldier.ability === 'heal' ? 'Primeros auxilios' : 'Sprint');
    const canUseAbilityInPhase = soldier.ability === 'heal'
      ? ['combat', 'boss', 'escaping', 'preparation'].includes(s.phase)
      : ['combat', 'boss', 'escaping', 'preparation', 'exploration'].includes(s.phase);
    el('btn-ability').disabled = !readyToPlay() || editorOpen || !canUseAbilityInPhase || abilityState.cooldown > 0 || (soldier.ability === 'heal' && player.hp >= player.maxHp);
    const canSwitch = !G.MapTrial?.infinite && readyToPlay() && !editorOpen;
    for (let i = 0; i < 2; i++) {
      const weapon = w.weapons[i], button = el(`btn-field-weapon-${i}`);
      button.innerHTML = `<strong>${i + 1}</strong><small>${weapon?.name || (G.MapTrial?.infinite?'Vacía · premio de jefe/élite':'Arma')}</small><small>${weapon ? `${Math.floor(weapon.ammo)}/${weapon.capacity}` : ''}</small>${weapon?.reload > 0 ? '<small>Recargando</small>' : ''}`;
      button.classList.toggle('active', G.MapTrial?.infinite ? !!weapon : i === w.activeIndex);
      if (G.MapTrial?.infinite && weapon) button.title=G.InfiniteProgression.describe(weapon);
      button.disabled = !canSwitch || i === w.activeIndex || w.switchRemaining > 0;
      button.setAttribute('aria-label', `Arma ${i + 1}: ${weapon?.name || 'sin arma'}, ${weapon ? `${Math.floor(weapon.ammo)} de ${weapon.capacity}` : ''}${weapon?.reload > 0 ? ', recargando' : ''}`);
    }
    el('btn-mods').hidden = !!s.v2 || s.phase !== 'preparation' || !!G.InventoryTrial?.enabled;
    el('btn-mods').disabled = s.phase !== 'preparation' || editorOpen;
    // During a normal rest, allow continuing early when there are no upgrades.
    el('btn-field-ready').hidden = s.phase !== 'preparation';
    el('btn-field-ready').disabled = false;
    el('btn-field-exit').hidden = !!s.v2 || (s.phase !== 'exploration' && s.phase !== 'boss');
    el('btn-field-exit').disabled = !s.nearExit;
    el('btn-field-exit').textContent = s.phase === 'boss' ? 'Huir · 2 s' : 'Siguiente sector';
    el('btn-field-extract').hidden = !!s.v2 || s.phase !== 'exploration' || !s.extractionAvailable;
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
    const armament=G.MapTrial?.infinite?G.ArmamentRewards.state.pending:null;
    const showArmament=!!armament&&s.phase==='armament';
    el('armament-choice').hidden=!showArmament;
    const armamentHost=el('armament-options');
    if(showArmament&&armamentHost.dataset.reward!==armament.id){
      armamentHost.replaceChildren(); armamentHost.dataset.reward=armament.id;
      for(const model of armament.models){
        const button=document.createElement('button'); button.className='upgrade-card';
        button.textContent=G.FieldCatalog.models[model].name+' · segunda copia independiente';
        button.onclick=()=>{if(G.ArmamentRewards.choose(model)){armamentHost.dataset.reward='';el('armament-choice').hidden=true;}};
        armamentHost.append(button);
      }
    } else if(!showArmament) armamentHost.dataset.reward='';
    G.ExpandedUI.tick(player,s,w);G.RiftUI?.tick(player,s);
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
