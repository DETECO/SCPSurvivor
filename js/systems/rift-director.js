(function (root) {
  'use strict';

  const CONFIG = Object.freeze({
    opportunities: Object.freeze([60, 120, 180, 240]),
    maxAppearances: 2,
    appearanceChance: 0.5,
    tiers: Object.freeze([
      Object.freeze({ tier: 'D1', weight: 50 }),
      Object.freeze({ tier: 'D2', weight: 32 }),
      Object.freeze({ tier: 'D3', weight: 8 }),
      Object.freeze({ tier: 'D4', weight: 7 }),
      Object.freeze({ tier: 'D5', weight: 3 })
    ])
  });

  function copy(value) {
    if (Array.isArray(value)) return value.map(copy);
    if (value && typeof value === 'object') {
      const result = {};
      for (const key of Object.keys(value)) result[key] = copy(value[key]);
      return result;
    }
    return value;
  }

  function freshState(mapId = null, mapNumber = null) {
    return {
      mapId,
      mapNumber,
      activeSeconds: 0,
      opportunities: [],
      requests: [],
      appearances: []
    };
  }

  function create({ rng = Math.random } = {}) {
    if (typeof rng !== 'function') throw new TypeError('RNG debe ser una función.');
    let state = freshState();

    function rollUnit() {
      const value = rng();
      if (!Number.isFinite(value) || value < 0 || value >= 1) {
        throw new RangeError('RNG debe devolver un número finito en [0, 1).');
      }
      return value;
    }

    function rollTier() {
      const bucket = Math.floor(rollUnit() * 100) + 1;
      let upper = 0;
      for (const entry of CONFIG.tiers) {
        upper += entry.weight;
        if (bucket <= upper) return entry.tier;
      }
      throw new Error('Los pesos de tiers no cubren el rango 1–100.');
    }

    function getState() {
      return {
        mapId: state.mapId,
        mapNumber: state.mapNumber,
        activeSeconds: state.activeSeconds,
        opportunities: copy(state.opportunities),
        requests: copy(state.requests),
        appearances: copy(state.appearances),
        appearanceCount: state.appearances.length
      };
    }

    function startMap(mapId, mapNumber) {
      const validId = (typeof mapId === 'string' && mapId.trim().length > 0) ||
        (typeof mapId === 'number' && Number.isFinite(mapId));
      if (!validId) throw new TypeError('mapId debe identificar el mapa.');
      if (!Number.isInteger(mapNumber) || mapNumber < 1) {
        throw new RangeError('mapNumber debe ser un entero positivo.');
      }
      if (state.mapId !== mapId || state.mapNumber !== mapNumber) state = freshState(mapId, mapNumber);
      return getState();
    }

    function resolveOpportunity(atSeconds) {
      const base = {
        id: `map:${state.mapNumber}:${typeof state.mapId}:${String(state.mapId)}:rift:${atSeconds}`,
        mapId: state.mapId,
        mapNumber: state.mapNumber,
        atSeconds
      };
      if (state.appearances.length >= CONFIG.maxAppearances) {
        return { ...base, outcome: 'skipped', reason: 'map_cap' };
      }

      const pendingCount = state.requests.filter(request => request.status === 'pending').length;
      if (state.appearances.length + pendingCount >= CONFIG.maxAppearances) {
        return { ...base, outcome: 'skipped', reason: 'capacity_reserved' };
      }

      if (rollUnit() >= CONFIG.appearanceChance) return { ...base, outcome: 'no' };

      const request = {
        id: base.id,
        mapId: state.mapId,
        mapNumber: state.mapNumber,
        atSeconds,
        tier: rollTier(),
        status: 'pending'
      };
      state.requests.push(request);
      return { ...base, outcome: 'request', request: copy(request) };
    }

    function advanceTo(activeSeconds) {
      if (!Number.isFinite(activeSeconds) || activeSeconds < 0) {
        throw new RangeError('activeSeconds debe ser finito y no negativo.');
      }
      if (state.mapNumber === null) throw new Error('Debes iniciar un mapa antes de avanzar el reloj.');
      if (activeSeconds < state.activeSeconds) {
        throw new RangeError('El reloj activo debe ser monótono dentro del mapa.');
      }

      state.activeSeconds = activeSeconds;
      if (state.mapNumber === 1) return [];

      const resolved = [];
      for (const atSeconds of CONFIG.opportunities) {
        const consumed = state.opportunities.some(opportunity => opportunity.atSeconds === atSeconds);
        if (consumed || activeSeconds < atSeconds) continue;
        const result = resolveOpportunity(atSeconds);
        state.opportunities.push(copy(result));
        resolved.push(copy(result));
      }
      return resolved;
    }

    function confirmAppearance(requestId) {
      const request = state.requests.find(item => item.id === requestId);
      if (!request) return { ok: false, reason: 'unknown_request', requestId };
      if (request.status === 'confirmed') return { ok: true, idempotent: true, requestId };
      if (request.status === 'failed') return { ok: false, reason: 'request_failed', requestId };
      if (state.appearances.length >= CONFIG.maxAppearances) {
        return { ok: false, reason: 'map_cap', requestId };
      }

      request.status = 'confirmed';
      state.appearances.push({
        requestId: request.id,
        mapId: request.mapId,
        mapNumber: request.mapNumber,
        atSeconds: request.atSeconds,
        tier: request.tier
      });
      return { ok: true, idempotent: false, requestId };
    }

    function failAppearance(requestId, failure) {
      const request = state.requests.find(item => item.id === requestId);
      if (!request) return { ok: false, reason: 'unknown_request', requestId };
      if (request.status === 'confirmed') return { ok: false, reason: 'already_confirmed', requestId };
      if (request.status === 'failed') return { ok: true, idempotent: true, requestId };

      request.status = 'failed';
      request.failure = copy(failure);
      return { ok: true, idempotent: false, requestId, failure: copy(failure) };
    }

    function restoreForTest(snapshot) {
      if (!snapshot || typeof snapshot !== 'object' || !Array.isArray(snapshot.opportunities) ||
          !Array.isArray(snapshot.requests) || !Array.isArray(snapshot.appearances)) {
        throw new TypeError('Estado de ensayo inválido.');
      }
      const hasMap = snapshot.mapId !== null && snapshot.mapNumber !== null;
      if (hasMap && (!Number.isInteger(snapshot.mapNumber) || snapshot.mapNumber < 1)) {
        throw new TypeError('El mapa del estado de ensayo es inválido.');
      }
      if (!Number.isFinite(snapshot.activeSeconds) || snapshot.activeSeconds < 0 ||
          snapshot.appearances.length > CONFIG.maxAppearances) {
        throw new TypeError('Los contadores del estado de ensayo son inválidos.');
      }
      const opportunities = copy(snapshot.opportunities);
      const seen = new Set();
      for (const opportunity of opportunities) {
        if (!CONFIG.opportunities.includes(opportunity.atSeconds) || seen.has(opportunity.atSeconds)) {
          throw new TypeError('Las oportunidades del estado de ensayo son inválidas.');
        }
        seen.add(opportunity.atSeconds);
      }
      state = {
        mapId: hasMap ? snapshot.mapId : null,
        mapNumber: hasMap ? snapshot.mapNumber : null,
        activeSeconds: snapshot.activeSeconds,
        opportunities,
        requests: copy(snapshot.requests),
        appearances: copy(snapshot.appearances)
      };
      return getState();
    }

    return { startMap, advanceTo, confirmAppearance, failAppearance, getState, restoreForTest };
  }

  const api = { config: CONFIG, create };
  if (root && root.G) root.G.RiftDirector = api;
  if (typeof module === 'object' && module.exports) module.exports = api;
})(typeof globalThis === 'object' ? globalThis : this);
