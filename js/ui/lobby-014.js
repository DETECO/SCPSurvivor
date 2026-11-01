/* MEN-006-A r1 / animación v2: solo lobby móvil horizontal. */
G.Lobby014 = (() => {
  const ROOT_SELECTOR = '#operations-menu';
  const HOME_SELECTOR = '.operations-screen[data-screen="home"]';
  const HOME_LAYOUT_SELECTOR = '.operations-home-layout';
  const PARTICLE_COUNT = 12;
  let instance = null;

  function shouldUseLandscape({ width = 0, height = 0, pointerCoarse = false, forceMobile } = {}) {
    if (!(width > height) || width > 1440 || height > 1024) return false;
    if (typeof forceMobile === 'boolean') return forceMobile;
    return pointerCoarse === true;
  }

  function readParticles() {
    return Array.from({ length: PARTICLE_COUNT }, (_, index) =>
      `<i class="lobby-014-particle lobby-014-particle-${index + 1}" aria-hidden="true"></i>`
    ).join('');
  }

  function template() {
    return `<div class="lobby-014" hidden aria-label="Lobby Ala de Contención">
      <div class="lobby-014-world" aria-hidden="true">
        <div class="lobby-014-world-mid"></div>
        <div class="lobby-014-world-floor"></div>
        <div class="lobby-014-world-capsule"></div>
        <div class="lobby-014-particles">${readParticles()}</div>
      </div>
      <section class="lobby-014-stage" aria-label="Soldado seleccionado">
        <p class="lobby-014-location"><strong>A1</strong><span>Ala de contención</span></p>
        <div class="lobby-014-platform" aria-hidden="true">
          <span class="lobby-014-platform-bottom"></span>
          <span class="lobby-014-platform-side"></span>
          <span class="lobby-014-platform-belt"></span>
          <span class="lobby-014-platform-top"></span>
        </div>
        <canvas class="operations-preview-canvas operations-main-preview lobby-014-actor" data-role="selected" width="180" height="190" aria-label="Vista animada del soldado seleccionado"></canvas>
        <div class="lobby-014-soldier-copy">
          <p class="operations-selected-name lobby-014-soldier-name"></p>
          <p class="operations-selected-ability lobby-014-soldier-ability"></p>
        </div>
        <div class="lobby-014-role-picker" aria-label="Elegir soldado">
          <button class="operations-role-card lobby-014-role" type="button" data-role="guard" aria-pressed="false">Guardia</button>
          <button class="operations-role-card lobby-014-role" type="button" data-role="medic" aria-pressed="false">Médico</button>
        </div>
      </section>
      <section class="lobby-014-actions" aria-label="Acciones de expedición">
        <div id="lobby-014-start-slot" class="lobby-014-start-slot"></div>
        <button class="lobby-014-gacha" type="button" data-lobby-gacha aria-label="Abrir GACHA de prueba">
          <span class="lobby-014-gacha-icon" aria-hidden="true">◇</span>
          <span class="lobby-014-gacha-copy"><strong>GACHA</strong><small>Tickets y resultados de prueba</small></span>
          <span class="lobby-014-gacha-pulse" aria-hidden="true"></span>
        </button>
        <p class="lobby-014-gacha-status" data-lobby-gacha-status role="status" hidden></p>
        <nav class="lobby-014-nav" aria-label="Operaciones">
          <button type="button" data-open-screen="soldiers"><span aria-hidden="true">♟</span>Soldados</button>
          <button type="button" data-open-screen="weapons"><span aria-hidden="true">▰</span>Equipo</button>
          <button type="button" data-open-screen="practices"><span aria-hidden="true">◎</span>Prácticas</button>
          <button type="button" data-open-screen="settings"><span aria-hidden="true">⚙</span>Ajustes</button>
        </nav>
      </section>
    </div>`;
  }

  function init(options = {}) {
    if (instance) {
      instance.destroy();
      instance = null;
    }

    const win = options.window || window;
    const doc = options.document || document;
    const root = options.root || doc.querySelector(ROOT_SELECTOR);
    const home = root?.querySelector(HOME_SELECTOR);
    const homeLayout = home?.querySelector(HOME_LAYOUT_SELECTOR);
    const legacyStartSlot = home?.querySelector('.operations-start-slot');
    const startButton = options.startButton || doc.getElementById('btn-technical-start');
    if (!root || !home || !homeLayout || !legacyStartSlot || !startButton) return null;

    const host = doc.createElement('div');
    host.innerHTML = template();
    const lobby = host.firstElementChild;
    if (!lobby) return null;
    home.append(lobby);

    const lobbyStartSlot = lobby.querySelector('#lobby-014-start-slot');
    const gachaButton = lobby.querySelector('[data-lobby-gacha]');
    const gachaStatus = lobby.querySelector('[data-lobby-gacha-status]');
    const queryCoarsePointer = () => !!win.matchMedia?.('(pointer: coarse)').matches;
    let active = false;
    let destroyed = false;
    let gyroEnabled = false;

    function gachaOpenFunction() {
      if (typeof options.openGacha === 'function') return options.openGacha;
      if (typeof G.GachaTrialUI?.open === 'function') return () => G.GachaTrialUI.open();
      const legacyButton = doc.getElementById('gacha-trial-open');
      return legacyButton ? () => legacyButton.click() : null;
    }

    function refreshGacha() {
      const canOpen = !!gachaOpenFunction() && G.GachaTrial?.enabled !== false;
      gachaButton.disabled = !canOpen;
      gachaButton.setAttribute('aria-disabled', String(!canOpen));
      gachaStatus.hidden = canOpen;
      gachaStatus.textContent = canOpen
        ? ''
        : 'El GACHA de prueba no está habilitado en esta sesión.';
    }

    function apply() {
      if (destroyed) return false;
      const forced = typeof options.isMobile === 'boolean' ? options.isMobile : undefined;
      const nextActive = shouldUseLandscape({
        width: Number(win.innerWidth) || 0,
        height: Number(win.innerHeight) || 0,
        pointerCoarse: options.pointerCoarse === undefined ? queryCoarsePointer() : options.pointerCoarse,
        forceMobile: forced,
      });
      if (active === nextActive) return active;
      active = nextActive;
      root.classList.toggle('lobby-014-horizontal', active);
      homeLayout.hidden = active;
      lobby.hidden = !active;
      (active ? lobbyStartSlot : legacyStartSlot).append(startButton);
      if (!active) disableGyroscope();
      if (active) refreshGacha();
      return active;
    }

    function onDeviceOrientation(event) {
      if (!active || !gyroEnabled || !Number.isFinite(event.gamma) || !Number.isFinite(event.beta)) return;
      const tiltX = Math.max(-1, Math.min(1, event.gamma / 32)) * 9;
      const tiltY = Math.max(-1, Math.min(1, (event.beta - 35) / 45)) * 7;
      lobby.style.setProperty('--lobby-014-tilt-x', `${tiltX.toFixed(1)}px`);
      lobby.style.setProperty('--lobby-014-tilt-y', `${tiltY.toFixed(1)}px`);
    }

    async function enableGyroscope() {
      if (!active || win.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false;
      const Orientation = win.DeviceOrientationEvent;
      if (typeof Orientation !== 'function') return false;
      if (typeof Orientation.requestPermission === 'function') {
        try {
          if (await Orientation.requestPermission() !== 'granted') return false;
        } catch (_) { return false; }
      }
      win.addEventListener?.('deviceorientation', onDeviceOrientation, { passive: true });
      gyroEnabled = true;
      return true;
    }

    function disableGyroscope() {
      if (gyroEnabled) win.removeEventListener?.('deviceorientation', onDeviceOrientation);
      gyroEnabled = false;
      lobby.style.removeProperty('--lobby-014-tilt-x');
      lobby.style.removeProperty('--lobby-014-tilt-y');
    }

    function onGachaClick() {
      refreshGacha();
      const open = gachaOpenFunction();
      if (open && G.GachaTrial?.enabled !== false) open();
    }

    gachaButton.addEventListener('click', onGachaClick);
    const media = win.matchMedia?.('(orientation: landscape) and (pointer: coarse)');
    const onChange = () => apply();
    win.addEventListener?.('resize', onChange, { passive: true });
    win.addEventListener?.('orientationchange', onChange, { passive: true });
    media?.addEventListener?.('change', onChange);
    if (!media?.addEventListener) media?.addListener?.(onChange);

    const api = {
      get active() { return active; },
      refresh() { refreshGacha(); return apply(); },
      enableGyroscope,
      disableGyroscope,
      destroy() {
        if (destroyed) return;
        destroyed = true;
        disableGyroscope();
        win.removeEventListener?.('resize', onChange);
        win.removeEventListener?.('orientationchange', onChange);
        media?.removeEventListener?.('change', onChange);
        if (!media?.removeEventListener) media?.removeListener?.(onChange);
        gachaButton.removeEventListener('click', onGachaClick);
        legacyStartSlot.append(startButton);
        homeLayout.hidden = false;
        root.classList.remove('lobby-014-horizontal');
        lobby.remove();
      },
    };

    instance = api;
    apply();
    refreshGacha();
    return api;
  }

  return { init, shouldUseLandscape };
})();
