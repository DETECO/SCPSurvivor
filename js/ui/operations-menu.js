/* Approved local operations menu for the account-free V2 field trial. */
G.OperationsMenu = (() => {
  const byId = id => document.getElementById(id);
  const roles = ['guard', 'medic'];
  const weapons = ['pistol', 'smg', 'shotgun', 'baton'];
  let root = null, ready = null, screen = 'home', initialized = false;
  let observer = null, frame = 0, previousFrame = 0, previewReady = false;
  const animators = {};

  function isEnabled() {
    const query = new URLSearchParams(window.location.search || '');
    return G.MapTrial?.enabled === true && (G.MapTrial.expanded===true||G.MapTrial.rewardRiftPractice===true) && G.LocalAccounts?.enabled !== true && !G.LocalAccounts?.user &&
      !query.has('cuentas') && query.get('interfaz') !== 'clasica';
  }

  function availableWeapons() {
    return weapons.filter(id => !!G.FieldCatalog?.models?.[id]);
  }

  function setSelect(id, value, allowed) {
    if (!allowed.includes(value)) return false;
    const select = byId(id);
    if (!select) return false;
    select.value = value;
    select.dispatchEvent(new Event('change', { bubbles: true }));
    return true;
  }

  function selectSoldier(id) {
    return setSelect('field-role', id, roles);
  }

  function selectWeapon(id) {
    return setSelect('loadout-weapon-0', id, availableWeapons());
  }

  function currentRole() { return roles.includes(byId('field-role')?.value) ? byId('field-role').value : 'guard'; }
  function currentWeapon() { return availableWeapons().includes(byId('loadout-weapon-0')?.value) ? byId('loadout-weapon-0').value : 'pistol'; }
  function roleData(id = currentRole()) { return G.FieldCatalog.soldiers[id] || G.FieldCatalog.soldiers.guard; }
  function roleName(id = currentRole()) { return roleData(id).name; }
  function abilityName(id = currentRole()) { return roleData(id).ability === 'heal' ? 'Primeros auxilios' : 'Sprint'; }
  function weaponData(id = currentWeapon()) { return G.FieldCatalog.models[id]; }
  function statText(id) {
    const soldier = roleData(id);
    const stats = G.FieldStats.player({ baseMaxHp: soldier.maxHp, maxHp: soldier.maxHp, training: {}, tempStats: {} });
    return `Vida base ${Math.round(stats.maxHp)} · Velocidad ${Math.round(soldier.speed * stats.spdMul)}`;
  }

  function graphicsMode() {
    const selected = byId('character-resolution')?.value;
    if (selected === '16' || selected === '32') return selected;
    return G.TrialVisuals?.mode === '16' ? '16' : '32';
  }

  function makeWeaponStats(id) {
    const stats = G.FieldStats.weapon({ training: {}, tempStats: {} }, { model: id, mods: [], level: 1 });
    if (stats.family === 'melee') return `Daño ${stats.damage.toFixed(1)} · intervalo ${stats.interval.toFixed(2)} s · alcance ${stats.range} · cuerpo a cuerpo`;
    return `Daño ${stats.damage.toFixed(1)} · intervalo ${stats.interval.toFixed(2)} s · cargador ${stats.capacity} · recarga ${stats.reloadTime.toFixed(2)} s`;
  }

  function template() {
    return `<div class="operations-heading">
      <div class="operations-brand"></div>
      <span class="operations-stamp">VERSIÓN DE PRUEBA</span>
    </div>
    <div class="operations-screen" data-screen="home">
      <div class="operations-home-layout">
        <section class="operations-stage" aria-labelledby="operations-selected-title">
          <h2 id="operations-selected-title">Soldado seleccionado</h2>
          <div class="operations-main-actor">
            <canvas class="operations-preview-canvas operations-main-preview" data-role="selected" width="180" height="190" aria-label="Vista del soldado seleccionado"></canvas>
            <p class="operations-selected-name"></p><p class="operations-selected-ability"></p>
          </div>
          <div class="operations-role-cards" aria-label="Elegir soldado">
            <button class="operations-role-card" type="button" data-role="guard" aria-pressed="false"><canvas class="operations-preview-canvas operations-mini-preview" data-role="guard" width="96" height="88" aria-hidden="true"></canvas><span>Guardia</span></button>
            <button class="operations-role-card" type="button" data-role="medic" aria-pressed="false"><canvas class="operations-preview-canvas operations-mini-preview" data-role="medic" width="96" height="88" aria-hidden="true"></canvas><span>Médico</span></button>
          </div>
        </section>
        <section class="operations-actions" aria-label="Acciones de expedición">
          <div class="operations-start-slot"></div>
          <nav class="operations-nav" aria-label="Menú de operaciones">
            <button type="button" data-open-screen="soldiers"><span class="operations-icon" aria-hidden="true"><svg viewBox="0 0 48 48" aria-hidden="true"><path fill="currentColor" d="M8 27V20a16 16 0 0 1 32 0v7h4v8h-9v-8H13v8H4v-8zM17 31h14v10H17z"/></svg></span><span>Soldados</span></button>
            <button type="button" data-open-screen="weapons"><span class="operations-icon" aria-hidden="true"><svg viewBox="0 0 48 48" aria-hidden="true"><path fill="currentColor" d="M5 12h37v12H26l-4 17H12l4-17H5zM33 8h6v5h-6z"/></svg></span><span>Equipo</span></button>
            <button type="button" data-open-screen="practices"><span class="operations-icon" aria-hidden="true"><svg viewBox="0 0 48 48" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="4"><circle cx="24" cy="24" r="15"/><path d="M24 1v14M24 33v14M1 24h14M33 24h14"/></g></svg></span><span>Prácticas</span></button>
            <button type="button" data-open-screen="settings"><span class="operations-icon" aria-hidden="true"><svg viewBox="0 0 48 48" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="7"><circle cx="24" cy="24" r="13"/><path d="M24 2v8M24 38v8M2 24h8M38 24h8M8 8l6 6M34 34l6 6M8 40l6-6M34 14l6-6"/></g><circle cx="24" cy="24" r="5" fill="currentColor"/></svg></span><span>Ajustes</span></button>
          </nav>
          <button class="operations-weapon-summary" type="button" data-open-screen="weapons"><span class="operations-weapon-icon" aria-hidden="true"><svg viewBox="0 0 48 48" aria-hidden="true"><path fill="currentColor" d="M5 12h37v12H26l-4 17H12l4-17H5zM33 8h6v5h-6z"/></svg></span><span>Arma inicial · <b class="operations-weapon-name"></b></span></button>
        </section>
      </div>
    </div>
    <section class="operations-screen" data-screen="soldiers" hidden aria-labelledby="operations-soldiers-title">
      <div class="operations-subhead"><button type="button" class="operations-back" data-open-screen="home" aria-label="Volver al menú">‹</button><div><h2 id="operations-soldiers-title">Soldados</h2><p>Elige a quién llevarás a la expedición.</p></div></div>
      <div class="operations-soldier-layout">
        <div class="operations-role-cards operations-role-cards-large" aria-label="Elegir soldado">
          <button class="operations-role-card" type="button" data-role="guard" aria-pressed="false"><canvas class="operations-preview-canvas operations-mini-preview" data-role="guard" width="112" height="104" aria-hidden="true"></canvas><span>Guardia</span><small>Sprint</small></button>
          <button class="operations-role-card" type="button" data-role="medic" aria-pressed="false"><canvas class="operations-preview-canvas operations-mini-preview" data-role="medic" width="112" height="104" aria-hidden="true"></canvas><span>Médico</span><small>Primeros auxilios</small></button>
        </div>
        <div class="operations-soldier-detail">
          <div class="operations-detail-stage"><canvas class="operations-preview-canvas operations-soldier-preview" data-role="selected" width="180" height="190" aria-label="Vista del soldado elegido"></canvas><p class="operations-selected-name"></p><p class="operations-selected-ability"></p></div>
          <div class="operations-detail-card"><h3>Habilidad</h3><p class="operations-detail-ability"></p></div>
          <div class="operations-detail-card"><span>Vida base</span><strong class="operations-health"></strong></div>
          <div class="operations-detail-card"><button class="operations-detail-weapon" type="button" data-open-screen="weapons"><span>Arma inicial</span><strong class="operations-weapon-name"></strong><small>Ver selección y estadísticas</small></button></div>
        </div>
      </div>
      <div class="operations-footer-actions"><button type="button" data-open-screen="home">Volver</button><button type="button" class="operations-confirm" data-confirm-soldier>Confirmar Guardia</button></div>
    </section>
    <section class="operations-screen" data-screen="weapons" hidden aria-labelledby="operations-weapons-title">
      <div class="operations-subhead"><button type="button" class="operations-back" data-open-screen="home" aria-label="Volver al menú">‹</button><div><h2 id="operations-weapons-title">Arma inicial</h2><p>El equipo elegido se aplica a la primera ranura de la expedición.</p></div></div>
      <div class="operations-weapon-grid"></div>
      <div class="operations-footer-actions"><button type="button" data-open-screen="home">Volver</button></div>
    </section>
    <section class="operations-screen" data-screen="practices" hidden aria-labelledby="operations-practices-title">
      <div class="operations-subhead"><button type="button" class="operations-back" data-open-screen="home" aria-label="Volver al menú">‹</button><div><h2 id="operations-practices-title">Prácticas</h2><p>Abre una prueba local sin cuentas ni progreso guardado.</p></div></div>
      <div class="operations-practice-grid">
        <a class="operations-practice-card" data-practice="boss"><span class="operations-icon" aria-hidden="true"><svg viewBox="0 0 48 48" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="4"><circle cx="24" cy="24" r="15"/><path d="M24 1v14M24 33v14M1 24h14M33 24h14"/></g></svg></span><strong>Jefe rápido</strong><small>Entrena el combate final del mapa.</small><span class="operations-practice-go">Iniciar práctica →</span></a>
        <a class="operations-practice-card" data-practice="rift"><span class="operations-icon" aria-hidden="true">◇</span><strong>Grieta dimensional</strong><small>Explora una grieta de práctica.</small><span class="operations-practice-go">Iniciar práctica →</span></a>
      </div>
      <div class="operations-footer-actions"><button type="button" data-open-screen="home">Volver</button></div>
    </section>
    <section class="operations-screen" data-screen="settings" hidden aria-labelledby="operations-settings-title">
      <div class="operations-subhead"><button type="button" class="operations-back" data-open-screen="home" aria-label="Volver al menú">‹</button><div><h2 id="operations-settings-title">Ajustes</h2><p>Elige la resolución de los personajes.</p></div></div>
      <div class="operations-settings-display"></div>
      <div class="operations-footer-actions"><button type="button" data-open-screen="home">Volver</button></div>
    </section>`;
  }

  function hideLegacy(panel) {
    for (const node of panel.querySelectorAll('#technical-intro, #technical-account-hint, #account-panel, .loadout-editor, #rift-test-note, #map-test-note, #chest-test-note, #b3-test-note, #infinite-test-note, #expanded-test-note, #visual-style-note, #expanded-practices, .map-trial-link')) node.hidden = true;
  }

  function buildWeaponCards() {
    const host = root.querySelector('.operations-weapon-grid');
    host.replaceChildren();
    for (const id of availableWeapons()) {
      const model = weaponData(id);
      const card = document.createElement('article');
      card.className = 'operations-weapon-card';
      card.dataset.weapon = id;
      const icon = document.createElement('canvas'); icon.width=180;icon.height=70;icon.setAttribute('aria-label',model.name);const ctx=icon.getContext('2d');ctx.imageSmoothingEnabled=false;ctx.scale(3,3);G.TrialWeaponArt?.draw(ctx,{x:22,y:33,weaponAim:0,dead:false},{behind:false},[{model:id,flash:0}]);
      const title = document.createElement('h3'); title.textContent = model.name;
      const stats = document.createElement('p'); stats.className = 'operations-weapon-stats'; stats.textContent = makeWeaponStats(id);
      const action = document.createElement('button'); action.type = 'button'; action.dataset.equipWeapon = id; action.textContent = 'Equipar';
      card.append(icon, title, stats, action); host.append(card);
    }
  }

  function setScreen(next) {
    if (!['home', 'soldiers', 'weapons', 'practices', 'settings'].includes(next)) return false;
    screen = next;
    for (const node of root.querySelectorAll('.operations-screen')) node.hidden = node.dataset.screen !== screen;
    update(); syncPreview();
    const heading = root.querySelector(`[data-screen="${screen}"] h2`);
    heading?.focus?.({ preventScroll: true });
    return true;
  }

  function update() {
    if (!root) return;
    const role = currentRole(), weapon = currentWeapon(), soldier = roleData(role);
    const name = soldier.name, ability = abilityName(role);
    for (const node of root.querySelectorAll('.operations-selected-name')) node.textContent = name.toUpperCase();
    for (const node of root.querySelectorAll('.operations-selected-ability')) node.textContent = ability;
    root.querySelector('.operations-detail-ability').textContent = ability === 'Sprint'
      ? 'Aumenta tu velocidad durante 2 s.' : 'Recupera vida durante la expedición.';
    root.querySelector('.operations-health').textContent = statText(role).replace(/^Vida base /, '').split(' · ')[0];
    root.querySelector('.operations-confirm').textContent = `Confirmar ${name}`;
    for (const node of root.querySelectorAll('.operations-weapon-name')) node.textContent = weaponData(weapon)?.name || 'Pistola';
    for (const button of root.querySelectorAll('.operations-role-card')) button.setAttribute('aria-pressed', String(button.dataset.role === role));
    for (const card of root.querySelectorAll('.operations-weapon-card')) {
      const selected = card.dataset.weapon === weapon;
      card.dataset.selected = String(selected);
      const button = card.querySelector('[data-equip-weapon]');
      button.textContent = selected ? 'Equipado' : 'Equipar'; button.disabled = selected;
    }
  }

  function canvasVisible(canvas) {
    const page = canvas.closest('.operations-screen');
    return !!page && !page.hidden;
  }

  function drawPreview(canvas) {
    if (!canvasVisible(canvas)) return;
    const role = canvas.dataset.role === 'selected' ? currentRole() : canvas.dataset.role;
    const dex = role === 'medic' ? 'medic01' : 'guard01';
    const animator = animators[role], ctx = canvas.getContext('2d');
    if (!animator || !ctx) return;
    const scale = Math.max(1, Math.min(2.4, canvas.height / 68));
    animator.scale = scale;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = false;
    const x = Math.round(canvas.width / 2), y = canvas.height - Math.max(10, Math.round(12 * scale));
    G.Sprites.drawShadow(ctx, dex, x, y, scale);
    animator.draw(ctx, x, y, { color: '#aab5a7' });
  }

  function hostVisible() {
    return !!root && !!ready && !ready.hidden && !root.closest('[hidden]');
  }

  function shouldAnimate() { return hostVisible() && (screen === 'home' || screen === 'soldiers'); }

  function stopPreview() {
    if (frame) window.cancelAnimationFrame(frame);
    frame = 0; previousFrame = 0;
  }

  function renderPreview(now) {
    frame = 0;
    if (!shouldAnimate()) return;
    const dt = previousFrame ? Math.min(.08, Math.max(0, (now - previousFrame) / 1000)) : 0;
    previousFrame = now;
    for (const animator of Object.values(animators)) animator.update(dt);
    for (const canvas of root.querySelectorAll('.operations-preview-canvas')) drawPreview(canvas);
    frame = window.requestAnimationFrame(renderPreview);
  }

  function syncPreview() {
    if (!previewReady || !shouldAnimate() || frame) return;
    previousFrame = 0;
    frame = window.requestAnimationFrame(renderPreview);
    if (!shouldAnimate()) stopPreview();
  }

  async function preloadPreviews() {
    for (const role of roles) {
      const dex = role === 'medic' ? 'medic01' : 'guard01';
      animators[role] = new G.Sprites.Animator(dex, 1, false);
      animators[role].loop('Walk');
    }
    await Promise.all([
      G.Sprites.preload(['guard01', 'medic01'], 8000),
      G.PersonajesArt?.preload?.() || Promise.resolve(),
    ]);
    previewReady = true;
    syncPreview();
  }

  function configurePracticeLinks() {
    const mode = graphicsMode();
    const boss = root.querySelector('[data-practice="boss"]');
    const rift = root.querySelector('[data-practice="rift"]');
    boss.href = `?prueba=combate-v2&rapida=1&graficos=${mode}`;
    rift.href = `?prueba=mapa-v2&premios=grieta&graficos=${mode}`;
  }

  function init() {
    if (!isEnabled()) return false;
    if (initialized) return true;
    ready = byId('technical-ready');
    const panel = ready?.querySelector('.panel');
    const host = byId('technical-home') || panel;
    const startButton = byId('btn-technical-start');
    if (!ready || !host || !panel || !startButton) return false;

    initialized = true;
    root = document.createElement('section');
    root.id = 'operations-menu'; root.className = 'operations-menu';
    root.innerHTML = template();
    host.classList.add('operations-host');
    document.body.dataset.operationsMenu='true';
    host.append(root);
    hideLegacy(panel);

    const brand = root.querySelector('.operations-brand');
    for (const selector of ['.eyebrow', 'h1', '.developer-credit']) {
      const node = panel.querySelector(selector);
      if (node && !root.contains(node)) brand.append(node);
    }
    const startSlot = root.querySelector('.operations-start-slot');
    startButton.textContent = G.MapTrial.quick ? 'Iniciar práctica rápida' : G.MapTrial.rewardRiftPractice ? 'Iniciar prueba de grieta' : G.MapTrial.chestPractice ? 'Iniciar prueba de cofres' : 'Iniciar expedición';
    startButton.classList.add('operations-expedition-start');
    startSlot.append(startButton);

    const graphics = byId('character-graphics');
    if (graphics) { graphics.hidden = false; root.querySelector('.operations-settings-display').append(graphics); }
    configurePracticeLinks();
    buildWeaponCards();

    root.addEventListener('click', event => {
      const role = event.target.closest('[data-role]');
      if (role && root.contains(role)) { selectSoldier(role.dataset.role); return; }
      const equip = event.target.closest('[data-equip-weapon]');
      if (equip && root.contains(equip)) { if (selectWeapon(equip.dataset.equipWeapon)) setScreen('home'); return; }
      const confirm = event.target.closest('[data-confirm-soldier]');
      if (confirm) { setScreen('home'); return; }
      const open = event.target.closest('[data-open-screen]');
      if (open && root.contains(open)) setScreen(open.dataset.openScreen);
    });
    byId('field-role')?.addEventListener('change', update);
    byId('loadout-weapon-0')?.addEventListener('change', update);
    update();
    setScreen('home');
    if (typeof window.MutationObserver === 'function') {
      let wasVisible = hostVisible();
      observer = new window.MutationObserver(() => {
        const visible = hostVisible();
        if (visible && !wasVisible) setScreen('home');
        wasVisible = visible;
        if (!visible) stopPreview(); else syncPreview();
      });
      observer.observe(ready, { attributes: true, attributeFilter: ['hidden'] });
    }
    preloadPreviews().catch(() => { previewReady = false; stopPreview(); });
    return true;
  }

  return { init, isEnabled, availableWeapons, selectSoldier, selectWeapon, showScreen: setScreen, render: update };
})();
