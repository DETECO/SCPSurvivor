/* Arranque local P01. La aplicación completa sigue pendiente de sus fases. */
(() => {
  const NEED = ['U', 'Settings', 'Input', 'Touch', 'Sprites', 'Camera', 'Tiles', 'World',
                'Player', 'Weather', 'EnemyMgr', 'Projectiles', 'FX', 'Content', 'FieldCatalog', 'PlayableArsenal', 'FieldStats', 'FieldAbilities', 'FieldLoadout', 'DimensionalRifts', 'InventoryModel', 'InventoryTrial', 'TechnicalUI', 'FieldCombat', 'ContainmentAI', 'BiologicalAI', 'ContainmentBoss', 'SectorMaps', 'FieldUpgrades', 'WeaponTerminal', 'ExpandedPractice', 'ExpandedUI', 'FieldRadar', 'CharacterCatalog', 'PersonajesArt', 'AF01ApprovedArt', 'ApprovedFieldWeaponArt', 'ArsenalWeaponArt', 'Expedition', 'Game', 'LocalAccounts', 'RunCheckpoint', 'RunContinuity', 'AccountUI','SceneR7','SceneM01A','SceneM01P1','RiftDirector','WeaponRevisionR1','WeaponRevisionTrial','OperationsMenu','RiftVisuals','CornerHUD'];
  async function boot() {
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
      G.Content.install(); G.TrialVisuals.install();
      if(G.MapTrial?.expanded||G.MapTrial?.rewardRiftPractice)await G.SceneR7.preload();
      if(G.SceneM01P1.active())await G.SceneM01P1.preload();
      if(G.SceneP1Full.active())await G.SceneP1Full.preload();
      await G.AF01ApprovedArt.preload();
      G.ApprovedFieldWeaponArt.preload();G.RiftPowerArt.preload();
      G.ArsenalWeaponArt.preload();
      G.Game.init({ technical: true }); G.TechnicalUI.init(); G.InventoryTrial.init(); G.AccountUI.init(); G.TrialVisuals.initUI(); G.OperationsMenu.init(); G.GachaTrialUI?.init(); G.Lobby014?.init(); G.OperationsMenu.render();
      if(G.SceneM01P1.active()){document.title='SCP Survivor · Extracto piloto M01';document.getElementById('btn-technical-start').textContent='Probar extracto M01 P1';}
      if(G.SceneP1Full.active()){document.title='SCP Survivor · Prueba cuatro mapas P1';document.getElementById('btn-technical-start').textContent='Probar cuatro mapas P1';}
    } catch (e) { G.TechnicalUI.fail(e); }
  }
  if (document.readyState === 'loading') addEventListener('DOMContentLoaded', boot);
  else boot();
})();
