/* MEN-005-A r1 / LOT007: presentation only; all clocks and actions remain owned by the game. */
G.CornerHUD = (() => {
  const el = id => document.getElementById(id);
  let initialized = false;
  function node(tag, id, text) {
    const value = document.createElement(tag); value.id = id;
    if (text) value.textContent = text;
    return value;
  }
  function meter(id, label) {
    const group = node('span', id + '-group'), text = node('span', id + '-text');
    const bar = node('progress', id); bar.setAttribute('aria-label', label);
    group.className = 'corner-meter'; group.append(text, bar); return group;
  }
  function init() {
    if (initialized || !G.MapTrial?.enabled || !el('hud-summary')) return;
    initialized = true; document.body.dataset.cornerHud = 'men-005-a-r1';
    el('scene-hud').append(meter('corner-hp', 'Vida del soldado'), meter('corner-xp', 'Experiencia del nivel'));
    const objective = node('div', 'corner-objectives'); objective.append(node('strong', 'corner-context'));
    for (const id of ['map-locator', 'rift-locator', 'map-alert', 'rift-alert', 'art-resource-status']) objective.append(el(id));
    el('hud-summary').append(objective);
    const hints = node('div', 'corner-hints');
    for (const id of ['tactical-status', 'terminal-prompt', 'chest-status']) hints.append(el(id));
    el('viewport').append(hints);
    const powers=node('div','corner-powers');powers.setAttribute('aria-label','Poderes automáticos');
    const powerNotice=node('div','corner-power-notice');powerNotice.setAttribute('role','status');hints.append(powers,powerNotice);
    const hint = node('div', 'corner-stick'); hint.setAttribute('aria-hidden', 'true');
    hint.append(node('span', 'corner-stick-knob'), node('small', 'corner-stick-label', 'MOVER'));
    el('viewport').append(hint);
    const ability = el('btn-ability');
    const ring = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    ring.setAttribute('viewBox', '0 0 100 100'); ring.setAttribute('aria-hidden', 'true');
    for (const id of ['corner-ability-track', 'corner-ability-ring']) {
      const circle = document.createElementNS(ring.namespaceURI, 'circle');
      circle.id = id; circle.setAttribute('cx', '50'); circle.setAttribute('cy', '50'); circle.setAttribute('r', '46'); ring.append(circle);
    }
    ability.replaceChildren(ring, node('span', 'corner-ability-label', 'Sprint'));
    ability.setAttribute('aria-label', 'Habilidad del soldado');
    el('field-status').classList.add('corner-accessible-status');
  }
  function tick(player, state, weapons) {
    if (!initialized) return;
    const hp = el('corner-hp'), xp = el('corner-xp');
    hp.max = Math.max(1, player.maxHp); hp.value = Math.max(0, player.hp);
    el('corner-hp-text').textContent = `VIDA ${Math.ceil(player.hp)}/${Math.ceil(player.maxHp)}`;
    xp.max = Math.max(1, player.xpNext); xp.value = Math.max(0, player.xp);
    el('corner-xp-text').textContent = `NV ${player.level} · XP ${Math.floor(player.xp)}/${player.xpNext}${state.pending ? ' · +' + state.pending : ''}`;
    const a = weapons.currentability || G.FieldAbilities.state(player);
    const name = a.kind === 'heal' ? 'Primeros auxilios' : 'Sprint';
    el('corner-ability-label').textContent = a.cooldown > 0 ? `${name} ${Math.ceil(a.cooldown)} s` : name;
    el('btn-ability').setAttribute('aria-label', el('corner-ability-label').textContent);
    const fraction = a.maxCooldown > 0 ? Math.max(0, Math.min(1, 1 - a.cooldown / a.maxCooldown)) : 1;
    el('corner-ability-ring').setAttribute('stroke-dasharray', String(2 * Math.PI * 46));
    el('corner-ability-ring').setAttribute('stroke-dashoffset', String(2 * Math.PI * 46 * (1 - fraction)));
    el('corner-stick').hidden = !G.Touch.active || !!G.Touch.stick || state.phase === 'finished';
    // The body may contain a modal outside #viewport. Its existing game state owns input/pausing.
    document.body.toggleAttribute('data-corner-choice', ['levelup', 'armament', 'terminal'].includes(state.phase) || !!G.RiftExpedition?.state.reward);
    el('corner-objectives').setAttribute('aria-label', G.RiftExpedition?.state.active ? 'Recinto dimensional y avisos' : `Mapa ${state.sector} y avisos`);
    const powerState=G.RiftPowers?.state;
    el('corner-powers').replaceChildren();
    for(const power of powerState?.owned||[]){const box=node('span','corner-power-'+power.id),name=node('strong','corner-power-name-'+power.id,power.name),status=node('small','corner-power-state-'+power.id,`NV ${power.rank===6?'MAX':power.rank} · ${powerState.cycles.some(c=>c.id===power.id)?'ACTIVO':power.remaining>0?Math.ceil(power.remaining)+' s':'PREPARADO'}`);box.append(name,status);el('corner-powers').append(box);}
    el('corner-powers').hidden=!powerState?.owned.length;
    el('corner-power-notice').textContent=powerState?.notice||'';el('corner-power-notice').hidden=!powerState?.notice||!el('rift-alert').hidden||!el('map-alert').hidden;
    const room = G.RiftExpedition?.state;
    el('corner-context').textContent = room?.active ? `${room.tier} · ${room.name}` : `MAPA ${state.sector}`;
  }
  function state(value) {
    if (!initialized) return;
    el('corner-objectives').hidden = value !== 'playing';
    el('corner-hints').hidden = value !== 'playing';
    el('corner-stick').hidden = value !== 'playing' || !G.Touch.active;
    if (value !== 'playing') document.body.removeAttribute('data-corner-choice');
  }
  const overlaps = (a, b) => a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
  // Screen-space fit, shared by native NPC text; never move the actor or resize the camera.
  function fitBubble(preferred, occupied, viewport) {
    const gap = 8, w = preferred.width, h = preferred.height;
    if (w + gap * 2 > viewport.width || h + gap * 2 > viewport.height) return null;
    const clamp = p => ({x: Math.max(viewport.x + gap, Math.min(p.x, viewport.x + viewport.width - w - gap)), y: Math.max(viewport.y + gap, Math.min(p.y, viewport.y + viewport.height - h - gap)), width: w, height: h});
    const candidates = [preferred];
    for (const b of occupied) candidates.push({x: preferred.x, y: b.y + b.height + gap}, {x: preferred.x, y: b.y - h - gap}, {x: b.x - w - gap, y: preferred.y}, {x: b.x + b.width + gap, y: preferred.y});
    for (const candidate of candidates) {
      const p = clamp(candidate);
      if (!occupied.some(b => overlaps(p, {x: b.x - gap, y: b.y - gap, width: b.width + 2 * gap, height: b.height + 2 * gap}))) return p;
    }
    return null;
  }
  function placeBubble(x, y, width, height, camera) {
    if (!initialized) return {x, y};
    const visible = id => {
      const n = el(id); if (!n || n.hidden || !n.getClientRects().length) return null;
      const b = n.getBoundingClientRect(); return b.width && b.height ? {x: b.left, y: b.top, width: b.width, height: b.height} : null;
    };
    if (visible('rift-alert') || visible('map-alert')) return null;
    const bounds = el('game').getBoundingClientRect(), scale = camera.scale;
    const occupied = ['scene-hud', 'corner-objectives', 'corner-hints', 'rift-boss-health', 'radar-wrap', 'field-weapons', 'btn-ability', 'btn-terminal', 'chest-status', 'terminal-prompt', 'tactical-status', 'corner-stick'].map(visible).filter(Boolean);
    const p = fitBubble({x: bounds.left + (x - camera.left()) * scale, y: bounds.top + (y - camera.top()) * scale, width: width * scale, height: height * scale}, occupied, {x: bounds.left, y: bounds.top, width: bounds.width, height: bounds.height});
    return p ? {x: camera.left() + (p.x - bounds.left) / scale, y: camera.top() + (p.y - bounds.top) / scale} : null;
  }
  return {init, tick, state, fitBubble, placeBubble};
})();
