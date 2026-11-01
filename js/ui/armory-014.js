/* MEN-007 r1. Approved artwork with live combat data where a profile exists. */
G.Armory014 = (() => {
  const definitions = [
    ['AF01', 'Pistola de servicio', 'pistol'],
    ['smg', 'Subfusil', 'smg'],
    ['shotgun', 'Escopeta', 'shotgun'],
    ['baton', 'Porra', 'baton'],
    ['AR01', 'Granada de fragmentación'],
    ['CC04', 'Katana de contención'],
    ['IN03', 'Lanzallamas de contención'],
    ['FR07', 'Rifle Tres Eslabones'],
    ['PE04', 'Lanzamisiles de contención'],
    ['RU04', 'Ballesta de recuperación'],
    ['TE01', 'Emisor láser'],
    ['AN09', 'Reloj prestado'],
    ['F24', 'Hoja fotónica de contención']
  ];
  const own = (object, key) => Object.prototype.hasOwnProperty.call(object || {}, key);
  const optionFor = (select, model) => Array.from(select?.options || []).find(option => option.value === model && !option.disabled);
  const revision = () => G.WeaponRevisionTrial?.active?.() === true;

  function getCards({ weaponSelect = document.getElementById('loadout-weapon-0') } = {}) {
    return definitions.map(([id, name, model]) => {
      const implemented = !!model && own(G.FieldCatalog?.models, model);
      const selectable = implemented && !!optionFor(weaponSelect, model) && (!revision() || model === 'pistol');
      let stats = null;
      if (selectable && G.FieldStats?.weapon) {
        try {
          stats = G.FieldStats.weapon(
            { training: {}, tempStats: {} },
            { model, mods: [], level: 1, ...(revision() ? { preview: true } : {}) }
          );
        } catch (_) {
          stats = null;
        }
      }
      let status = 'pendiente';
      if (id === 'F24') status = 'fusion-unavailable';
      else if (selectable) status = 'disponible';
      else if (implemented) status = 'implemented-unavailable';
      else if (id === 'baton' && G.MapTrial?.expanded !== true) status = 'mode-unavailable';
      return { id, name, model: model || null, implemented, selectable, stats, status };
    });
  }

  function selectInitial(id, { weaponSelect = document.getElementById('loadout-weapon-0') } = {}) {
    const card = definitions
      .map(([entryId, name, model]) => ({ id: entryId, name, model: model || null }))
      .find(entry => entry.id === id || entry.model === id);
    if (!card?.model || !weaponSelect?.dispatchEvent) return { ok: false };
    const liveCard = getCards({ weaponSelect }).find(entry => entry.id === card.id);
    if (!liveCard?.selectable) return { ok: false };
    weaponSelect.value = liveCard.model;
    weaponSelect.dispatchEvent(new Event('change', { bubbles: true }));
    return { ok: true, model: liveCard.model };
  }

  function imageFor(card) {
    if (['smg', 'shotgun', 'baton'].includes(card.id)) return `assets/ui/armory-014/${card.id}-32.png`;
    return `assets/menus/approved-weapons-arm-vis-r1/${card.id}-32.png`;
  }

  function pageSize() {
    return typeof window !== 'undefined' && window.innerWidth >= 1100 ? 6 : 4;
  }

  function displayStatus(card) {
    if (card.status === 'fusion-unavailable') return 'Fusión · no disponible';
    if (card.status === 'disponible') return 'Arma inicial disponible para esta prueba';
    if (card.status === 'implemented-unavailable') return 'Implementada · no disponible como inicial en esta prueba';
    if (card.status === 'mode-unavailable') return 'Disponible solo en el ensayo ampliado';
    return 'Diseño aprobado · pendiente de implementación';
  }

  function metricRows(stats) {
    const number = value => Number.isInteger(value) ? String(value) : String(value).replace('.', ',');
    const rows = [
      { icon: '✹', label: 'Daño', value: number(stats.damage), note: stats.pellets > 1 ? `por perdigón · ${stats.pellets} perdigones` : '' },
      { icon: '◴', label: 'Intervalo', value: `${number(stats.interval)} s` },
      { icon: '⌖', label: 'Alcance', value: `${number(stats.range)} u` },
      { icon: '▱', label: 'Cargador', value: stats.family === 'melee' ? '—' : number(stats.capacity) },
      { icon: '↻', label: 'Recarga', value: stats.family === 'melee' ? '—' : `${number(stats.reloadTime)} s` }
    ];
    return rows;
  }

  function mount(host, { onBack = () => {} } = {}) {
    if (!host) return null;
    const root = host.id === 'armory-014' ? host : document.createElement('section');
    root.id = 'armory-014';
    root.className = 'armory-014';
    root.setAttribute('role', 'region');
    root.setAttribute('aria-label', 'Armería de Contención');
    root.tabIndex = -1;
    root.innerHTML = `
      <header class="armory014-head">
        <div class="armory014-brand">
          <img class="armory014-logo" src="assets/brand/scp-survivor.png" alt="" aria-hidden="true">
          <div class="armory014-brand-copy"><h2>ARMERÍA</h2><span>DE CONTENCIÓN</span></div>
        </div>
        <span class="armory014-location">ARSENAL · ALA DE CONTENCIÓN</span>
      </header>
      <main class="armory014-body">
        <div class="armory014-stage" aria-label="Arma seleccionada">
          <div class="armory014-light" aria-hidden="true"></div>
          <div class="armory014-platform" aria-hidden="true"></div>
          <img class="armory014-image" alt="">
        </div>
        <section class="armory014-detail" aria-labelledby="armory014-title">
          <div class="armory014-detail-head">
            <p class="armory014-eyebrow">DATOS DE ENSAYO</p>
            <h3 id="armory014-title"></h3>
          </div>
          <p class="armory014-status" role="status" aria-live="polite"></p>
          <dl class="armory014-metrics"></dl>
        </section>
      </main>
      <footer class="armory014-controls" aria-label="Navegación de armas">
        <button type="button" class="armory014-back" data-armory-back aria-label="Volver al menú"><span aria-hidden="true">‹</span><span>Volver</span></button>
        <button type="button" class="armory014-page" data-armory-prev aria-label="Página anterior">‹</button>
        <nav class="armory014-cards" aria-label="Catálogo de armas"></nav>
        <button type="button" class="armory014-page" data-armory-next aria-label="Página siguiente">›</button>
        <button type="button" class="armory014-equip" data-armory-equip>Equipar</button>
      </footer>`;
    if (root !== host) host.append(root);

    const weaponSelect = document.getElementById('loadout-weapon-0');
    let chosen = 'AF01';
    let page = 0;
    const query = selector => root.querySelector(selector);
    const cardsHost = query('.armory014-cards');

    function render() {
      const cards = getCards({ weaponSelect });
      const selected = cards.find(card => card.id === chosen) || cards[0];
      const count = pageSize();
      const lastPage = Math.max(0, Math.ceil(cards.length / count) - 1);
      page = Math.max(0, Math.min(page, lastPage));
      const from = page * count;
      query('.armory014-detail h3').textContent = `${selected.id.toUpperCase()} · ${selected.name}`;
      const image = query('.armory014-image');
      image.src = imageFor(selected);
      image.alt = selected.name;
      const status = query('.armory014-status');
      status.textContent = displayStatus(selected);
      status.dataset.state = selected.status;

      const metrics = query('.armory014-metrics');
      metrics.replaceChildren();
      if (selected.stats) {
        for (const row of metricRows(selected.stats)) {
          const item = document.createElement('div');
          item.className = 'armory014-metric';
          const icon = document.createElement('span');
          icon.className = 'armory014-metric-icon';
          icon.setAttribute('aria-hidden', 'true');
          icon.textContent = row.icon;
          const label = document.createElement('dt');
          label.textContent = row.label;
          const value = document.createElement('dd');
          value.textContent = row.value;
          item.append(icon, label, value);
          if (row.note) {
            const note = document.createElement('small');
            note.className = 'armory014-metric-note';
            note.textContent = row.note;
            item.append(note);
          }
          metrics.append(item);
        }
      } else {
        const pending = document.createElement('div');
        pending.className = 'armory014-no-profile';
        pending.textContent = selected.status === 'fusion-unavailable'
          ? 'Esta arma solo se obtiene mediante fusión.'
          : 'Aún no hay un perfil de combate disponible para esta ficha.';
        metrics.append(pending);
      }

      cardsHost.replaceChildren();
      for (const card of cards.slice(from, from + count)) {
        const button = document.createElement('button');
        const modelKey = card.model || card.id;
        button.type = 'button';
        button.className = 'armory014-card';
        button.dataset.armoryWeapon = modelKey;
        button.setAttribute('aria-pressed', String(card.id === selected.id));
        button.setAttribute('aria-label', `${card.name}. ${displayStatus(card)}.`);
        const art = document.createElement('img');
        art.src = imageFor(card);
        art.alt = '';
        art.setAttribute('aria-hidden', 'true');
        const code = document.createElement('span');
        code.className = 'armory014-card-code';
        code.textContent = card.id.toUpperCase();
        const tag = document.createElement('small');
        tag.className = 'armory014-card-tag';
        tag.textContent = card.status === 'fusion-unavailable' ? 'FUSIÓN' : card.selectable ? '' : 'PENDIENTE';
        button.append(art, code, tag);
        button.addEventListener('click', () => { chosen = card.id; render(); });
        cardsHost.append(button);
      }

      const previous = query('[data-armory-prev]');
      const next = query('[data-armory-next]');
      previous.disabled = page === 0;
      next.disabled = from + count >= cards.length;
      const equip = query('[data-armory-equip]');
      equip.disabled = !selected.selectable;
      equip.textContent = selected.selectable ? 'Equipar' : 'No disponible';
    }

    query('[data-armory-prev]').addEventListener('click', () => { page = Math.max(0, page - 1); render(); });
    query('[data-armory-next]').addEventListener('click', () => { page = Math.min(Math.ceil(definitions.length / pageSize()) - 1, page + 1); render(); });
    query('[data-armory-equip]').addEventListener('click', () => {
      const result = selectInitial(chosen, { weaponSelect });
      if (result.ok) {
        const status = query('.armory014-status');
        status.textContent = 'Arma inicial seleccionada para la próxima expedición.';
        status.dataset.state = 'disponible';
      }
    });
    query('[data-armory-back]').addEventListener('click', onBack);
    const onResize = () => {
      const selectedIndex = definitions.findIndex(definition => definition[0] === chosen);
      page = Math.floor(Math.max(0, selectedIndex) / pageSize());
      render();
    };
    window.addEventListener('resize', onResize);
    render();

    return {
      select(id) {
        const index = definitions.findIndex(definition => definition[0] === id || definition[2] === id);
        if (index < 0) return false;
        chosen = definitions[index][0];
        page = Math.floor(index / pageSize());
        render();
        return true;
      },
      confirm() { return selectInitial(chosen, { weaponSelect }); },
      getSelection() { return chosen; },
      destroy() {
        window.removeEventListener('resize', onResize);
        if (root !== host) root.remove();
        else root.replaceChildren();
      }
    };
  }

  return { getCards, selectInitial, mount };
})();
