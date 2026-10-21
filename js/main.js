/* Arranque local P01. La aplicación completa sigue pendiente de sus fases. */
(() => {
  const NEED = ['U', 'Settings', 'Input', 'Touch', 'Sprites', 'Camera', 'Tiles', 'World',
                'Player', 'Weather', 'EnemyMgr', 'Projectiles', 'FX', 'Content', 'FieldCatalog', 'FieldStats', 'FieldAbilities', 'FieldLoadout', 'DimensionalRifts', 'InventoryModel', 'InventoryTrial', 'TechnicalUI', 'FieldCombat', 'ContainmentAI', 'BiologicalAI', 'ContainmentBoss', 'SectorMaps', 'FieldUpgrades', 'WeaponTerminal', 'ExpandedPractice', 'ExpandedUI', 'FieldRadar', 'Expedition', 'Game', 'LocalAccounts', 'RunCheckpoint', 'RunContinuity', 'AccountUI'];
  function boot() {
    const miss = NEED.filter(k => !window.G || !G[k]);
    if (miss.length) {
      const el = document.getElementById('boot');
      el.hidden = false; el.textContent = 'No se cargaron todos los módulos. Recarga la página.';
      console.error('[SCP Survivor] faltan módulos:', miss.join(', ')); return;
    }
    if (G.LOCAL_TECHNICAL_MODE !== true || G.ENABLE_CLOUD !== false || G.ENABLE_MULTIPLAYER !== false
        || G.ENABLE_SOCIAL !== false || G.ENABLE_SIGNUPS !== false || G.FIREBASE_CONFIG !== null) {
      G.TechnicalUI.fail(new Error('La escena requiere configuración local sin servicios')); return;
    }
    try {
      G.Content.install(); G.TrialVisuals.install(); G.Game.init({ technical: true }); G.TechnicalUI.init(); G.InventoryTrial.init(); G.AccountUI.init();
    } catch (e) { G.TechnicalUI.fail(e); }
  }
  if (document.readyState === 'loading') addEventListener('DOMContentLoaded', boot);
  else boot();
})();
