/* B3 trial rewards: fixed content, temporary copies and fictional run tickets only. */
G.EventRewards = (() => {
  const plans = new Map(), receipts = new Map();
  let ticketTotal = 0, lastNotice = '';
  const enabled = () => G.MapTrial?.enabled === true;
  function startRun() {
    plans.clear(); receipts.clear(); ticketTotal = 0; lastNotice = '';
  }
  function validLoadout(player) {
    if (!player || !G.FieldCombat?.getweapons || !G.FieldCombat?.upgrade || !G.FieldCatalog?.models || !G.FieldCatalog?.validateMods) return false;
    const copies = player.fieldWeapons, combat = G.FieldCombat.getweapons();
    if (!Array.isArray(copies) || copies.length !== 2 || combat !== copies) return false;
    const ids = new Set();
    for (const copy of copies) {
      if (!copy || typeof copy.id !== 'string' || !copy.id.trim() || ids.has(copy.id) ||
          !Number.isInteger(copy.level) || copy.level < 1 || copy.level > 5 ||
          typeof copy.model !== 'string' || !Object.prototype.hasOwnProperty.call(G.FieldCatalog.models, copy.model) || !Array.isArray(copy.mods) ||
          !G.FieldCatalog.validateMods(copy.model, copy.mods)) return false;
      ids.add(copy.id);
    }
    return true;
  }
  // Independent salted draws keep ticket contents stable when eligible weapons change.
  function draw(seed, id, kind, salt) {
    const input = `${seed}:${id}:${kind}:${salt}`;
    let h = 2166136261;
    for (let i = 0; i < input.length; i++) h = Math.imul(h ^ input.charCodeAt(i), 16777619);
    h ^= h >>> 16; h = Math.imul(h, 0x7feb352d);
    h ^= h >>> 15; h = Math.imul(h, 0x846ca68b); h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  }
  function describe(model, tickets) {
    const improvement = model ? `+1 nivel temporal: ${G.FieldCatalog.models[model].name} (máximo 5).` : 'Sin mejora compatible.';
    return improvement + (tickets ? ` +${tickets} tickets ficticios de prueba.` : '');
  }
  function offer({ id, kind, seed, player } = {}) {
    if (!enabled() || typeof id !== 'string' || !id.trim()) return null;
    if (plans.has(id)) return { ...plans.get(id).plan };
    if ((kind !== 'boss' && kind !== 'rift') || !Number.isFinite(seed) || !validLoadout(player)) return null;
    const candidates = player.fieldWeapons.filter(copy => copy.level < 5);
    const target = candidates[Math.floor(draw(seed, id, kind, 'weapon') * candidates.length)] || null;
    const tickets = kind === 'rift' ? 2 + Math.floor(draw(seed, id, kind, 'tickets') * 2) : 0;
    const plan = { id, kind, weaponId: target?.id || null, model: target?.model || null, tickets, description: describe(target?.model, tickets) };
    plans.set(id, { plan, player });
    return { ...plan };
  }
  function rejected(outcome, description) {
    lastNotice = description;
    return { ok: false, outcome, description, tickets: 0 };
  }
  function claim(id, player) {
    if (!enabled()) return rejected('blocked', 'Premio disponible solo en la prueba V2.');
    if (receipts.has(id)) return rejected('already-claimed', 'Este premio ya fue entregado.');
    const entry = plans.get(id);
    if (!entry || entry.player !== player || !validLoadout(player)) return rejected('blocked', 'Premio bloqueado: datos de armas incompatibles.');
    const plan = entry.plan;
    let outcome = 'no-upgrade', model = null;
    if (plan.weaponId) {
      const target = player.fieldWeapons.find(copy => copy.id === plan.weaponId);
      if (!target || target.model !== plan.model) return rejected('blocked', 'Premio bloqueado: la copia de arma cambió.');
      if (target.level < 5) {
        if (G.FieldCombat.upgrade(plan.weaponId) !== true) return rejected('blocked', 'Premio bloqueado: no se pudo aplicar la mejora temporal.');
        outcome = 'upgraded'; model = plan.model;
      }
    }
    const description = describe(model, plan.tickets);
    const result = { ok: true, outcome, description, tickets: plan.tickets };
    receipts.set(id, { id, kind: plan.kind, weaponId: plan.weaponId, model: plan.model, ...result });
    ticketTotal += plan.tickets;
    lastNotice = description;
    return { ...result };
  }
  return { startRun, offer, claim, get state() {
    return { ticketTotal, receipts: Array.from(receipts.values(), receipt => ({ ...receipt })), lastNotice };
  } };
})();
