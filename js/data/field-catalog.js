/* Local field-run loadout prototypes. IDs identify physical copies; models are immutable. */
G.FieldCatalog = (() => {
  const rawModels = {
    pistol: { id: 'pistol', name: 'Pistola', damage: 10, interval: 0.5, capacity: 12, reloadTime: 1.5, range: 320, speed: 400, spread: 4, pellets: 1, pierce: 0, compatibleMods: ['grip', 'assisted', 'reinforced', 'extended', 'rapid', 'piercing'] },
    smg: { id: 'smg', name: 'Subfusil', damage: 6, interval: 0.15, capacity: 24, reloadTime: 1.8, range: 280, speed: 450, spread: 12, pellets: 1, pierce: 0, compatibleMods: ['grip', 'assisted', 'reinforced', 'extended', 'rapid', 'piercing'] },
    shotgun: { id: 'shotgun', name: 'Escopeta', damage: 6, interval: 0.9, capacity: 6, reloadTime: 2.2, range: 180, speed: 350, spread: 30, pellets: 6, pierce: 0, compatibleMods: ['grip', 'assisted', 'reinforced', 'extended'] }
  };
  const rawMods = {
    grip: { id: 'grip', name: 'Empuñadura', spread: -0.30 },
    assisted: { id: 'assisted', name: 'Asistida', reloadTime: -0.15 },
    reinforced: { id: 'reinforced', name: 'Reforzado', damage: 0.15 },
    extended: { id: 'extended', name: 'Ampliado', capacity: 0.50, reloadTime: 0.15 },
    rapid: { id: 'rapid', name: 'Rápido', interval: -0.15, spread: 0.30 },
    piercing: { id: 'piercing', name: 'Perforante', pierce: 1, damage: -0.10 }
  };
  const rawSoldiers = {
    guard: { id: 'guard', name: 'Guardia', ability: 'sprint', maxHp: 100, speed: 165, magnet: 78 },
    medic: { id: 'medic', name: 'Médico', ability: 'heal', maxHp: 100, speed: 165, magnet: 78 }
  };
  const freeze = obj => { Object.values(obj).forEach(v => { if (v.compatibleMods) Object.freeze(v.compatibleMods); Object.freeze(v); }); return Object.freeze(obj); };
  const models = freeze(rawModels), mods = freeze(rawMods), soldiers = freeze(rawSoldiers);

  function validateMods(model, ids) {
    const def = models[model];
    return !!def && Array.isArray(ids) && ids.length <= 2 && new Set(ids).size === ids.length &&
      ids.every(id => !!mods[id] && def.compatibleMods.includes(id));
  }
  function makeWeapon(model, id, modIds = []) {
    if (!models[model] || typeof id !== 'string' || !id || !validateMods(model, modIds)) throw new Error('Invalid field weapon');
    return { id, model, mods: modIds.slice(), level: 1 };
  }
  function defaultLoadout() { return [makeWeapon('pistol', 'weapon:pistol-1'), makeWeapon('smg', 'weapon:smg-1')]; }
  return { models, mods, soldiers, makeWeapon, defaultLoadout, validateMods };
})();
