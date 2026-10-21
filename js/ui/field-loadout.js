/* Local test loadout editor. Selections are prototypes for this run only. */
G.FieldLoadout = (() => {
  const el = id => document.getElementById(id);
  const weapons = ['pistol', 'smg', 'shotgun'];
  let soldierId = 'guard';
  let models = ['pistol', 'smg'];
  let mods = [[], []];
  let ready = false;

  function init() {
    if (ready) return;
    ready = true;
    const role = el('field-role');
    role.addEventListener('change', () => { soldierId = role.value; preview(); });
    for (let i = 0; i < 2; i++) {
      const select = el(`loadout-weapon-${i}`);
      for (const model of weapons) {
        const option = document.createElement('option');
        option.value = model; option.textContent = G.FieldCatalog.models[model].name;
        select.append(option);
      }
      select.value = models[i];
      select.addEventListener('change', () => { models[i] = select.value; mods[i] = mods[i].filter(id => G.FieldCatalog.models[models[i]].compatibleMods.includes(id)); renderMods(); preview(); });
    }
    if (G.MapTrial?.infinite) el("loadout-weapon-1").closest("section").hidden = true;
    renderMods(); preview();
  }
  function renderMods() {
    for (let i = 0; i < 2; i++) {
      const host = el(`loadout-mods-${i}`); host.replaceChildren();
      if(G.MapTrial?.enabled){host.hidden=true;continue;}
      const def = G.FieldCatalog.models[models[i]];
      for (const [id, mod] of Object.entries(G.FieldCatalog.mods)) {
        const label = document.createElement('label'); label.className = 'loadout-mod';
        const input = document.createElement('input'); input.type = 'checkbox'; input.value = id;
        input.checked = mods[i].includes(id); input.disabled = !def.compatibleMods.includes(id) || (!input.checked && mods[i].length >= 2);
        input.addEventListener('change', () => {
          if (input.checked) { if (mods[i].length >= 2) input.checked = false; else mods[i].push(id); }
          else mods[i] = mods[i].filter(x => x !== id);
          renderMods(); preview();
        });
        const text = document.createElement('span'); text.textContent = `${mod.name} · ${modSummary(id)}`;
        label.append(input, text); host.append(label);
      }
    }
  }
  function modSummary(id) {
    return ({grip:'menos dispersión',assisted:'recarga más rápida',reinforced:'más daño',extended:'más capacidad',rapid:'más cadencia',piercing:'atraviesa un objetivo'})[id] || '';
  }
  function preview() {
    const soldier = G.FieldCatalog.soldiers[soldierId];
    const stats = G.FieldStats.player({baseMaxHp:100,maxHp:100,training:{},tempStats:{}});
    el('loadout-role-summary').textContent = `${soldier.name} · ${soldier.ability === 'sprint' ? 'Sprint: velocidad extra durante 2 s' : 'Primeros auxilios: recupera vida'}`;
    el('loadout-preview').replaceChildren();
    for (let i = 0; i < (G.MapTrial?.infinite ? 1 : 2); i++) {
      const w = G.FieldStats.weapon({training:{},tempStats:{}}, {model:models[i],mods:G.MapTrial?.enabled?[]:mods[i],level:1});
      const item = document.createElement('li');
      const details = document.createElement('details');
      const summary = document.createElement('summary');
      summary.textContent = `${i + 1}. ${w.name}: ${w.damage.toFixed(1)} daño · ${w.interval.toFixed(2)} s entre disparos · ${w.capacity} disparos`;
      const advanced = document.createElement('small'); advanced.className = 'loadout-weapon-details';
      advanced.textContent = `Recarga ${w.reloadTime.toFixed(2)} s · alcance ${w.range} · velocidad ${w.speed} · dispersión ${w.spread.toFixed(1)}° · perdigones ${w.pellets} · perforación ${w.pierce}`;
      details.append(summary, advanced); item.append(details); el('loadout-preview').append(item);
    }
    el('loadout-preview-summary').textContent = G.MapTrial?.infinite ? `Vida ${stats.maxHp} · empiezas con una sola arma. La segunda se obtiene en un cofre de armamento; ambas disparan automáticamente.` : `Vida ${stats.maxHp} · velocidad 165 · mejoras permanentes 0/10.`;
  }
  function options() {
    init();
    const error = el('loadout-error');
    if (!G.FieldCatalog.soldiers[soldierId] || models.length !== 2 || mods.some((ids, i) => !G.FieldCatalog.validateMods(models[i], ids))) {
      error.textContent = 'Revisa el soldado y los mods de cada arma.';
      return null;
    }
    error.textContent = '';
    return { soldierId, loadout: (G.MapTrial?.infinite ? models.slice(0,1) : models).map((model, i) => G.FieldCatalog.makeWeapon(model, `local:${i + 1}`, G.MapTrial?.enabled?[]:mods[i])) };
  }
  return { init, options };
})();
