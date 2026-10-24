const test = require('node:test');
const assert = require('node:assert/strict');
const RiftDirector = require('../js/systems/rift-director.js');

function sequenceRng(values) {
  let index = 0;
  return {
    rng() {
      if (index >= values.length) throw new Error('RNG sequence exhausted');
      return values[index++];
    },
    get calls() { return index; }
  };
}

function openMap(number = 2, rng = () => 0.75) {
  const director = RiftDirector.create({ rng });
  director.startMap(`map-${number}`, number);
  return director;
}

test('excluye el mapa 1 y resuelve una sola vez los cuatro cruces de 60 a 240 s', () => {
  const draws = sequenceRng(Array(4).fill(0.75));
  const director = RiftDirector.create({ rng: draws.rng });
  director.startMap('map-1', 1);
  assert.deepEqual(director.advanceTo(300), []);
  assert.equal(draws.calls, 0);

  director.startMap('map-2', 2);
  assert.deepEqual(director.advanceTo(0), []);
  assert.deepEqual(director.advanceTo(59.9), []);
  const results = director.advanceTo(300);
  assert.deepEqual(results.map(result => result.atSeconds), [60, 120, 180, 240]);
  assert.ok(results.every(result => result.outcome === 'no'));
  assert.deepEqual(director.advanceTo(300), []);
  assert.deepEqual(director.advanceTo(301), []);
  assert.equal(draws.calls, 4);
});

test('el cruce de 50% produce sí debajo de 0.5 y no desde 0.5', () => {
  const draws = sequenceRng([0.499999, 0.495, 0.5]);
  const director = openMap(2, draws.rng);
  const [yes] = director.advanceTo(60);
  const [no] = director.advanceTo(120);
  assert.equal(yes.outcome, 'request');
  assert.equal(yes.request.tier, 'D1');
  assert.equal(no.outcome, 'no');
  assert.equal(draws.calls, 3);
});

test('los límites enteros de peligrosidad son D1 1–50, D2 51–82, D3 83–90, D4 91–97 y D5 98–100', () => {
  const cases = [
    [1, 'D1'], [50, 'D1'], [51, 'D2'], [82, 'D2'],
    [83, 'D3'], [90, 'D3'], [91, 'D4'], [97, 'D4'], [98, 'D5'], [100, 'D5']
  ];
  assert.equal(RiftDirector.config.tiers.reduce((sum, tier) => sum + tier.weight, 0), 100);

  for (const [bucket, expected] of cases) {
    const director = openMap(2, sequenceRng([0, (bucket - 0.5) / 100]).rng);
    const [result] = director.advanceTo(60);
    assert.equal(result.outcome, 'request', `bucket ${bucket}`);
    assert.equal(result.request.tier, expected, `bucket ${bucket}`);
  }
});

test('solo las confirmaciones consumen el cupo y la confirmación repetida es idempotente', () => {
  const draws = sequenceRng([0, 0, 0, 0.5, 0, 0.99, 0]);
  const director = openMap(2, draws.rng);
  const [first] = director.advanceTo(60);
  assert.equal(director.getState().appearanceCount, 0);
  assert.equal(director.confirmAppearance(first.request.id).ok, true);
  assert.equal(director.confirmAppearance(first.request.id).idempotent, true);
  assert.equal(director.getState().appearanceCount, 1);

  const [second] = director.advanceTo(120);
  assert.equal(second.outcome, 'request');
  assert.equal(director.confirmAppearance(second.request.id).ok, true);
  assert.equal(director.getState().appearanceCount, 2);
  const later = director.advanceTo(240);
  assert.deepEqual(later.map(result => result.outcome), ['skipped', 'skipped']);
  assert.ok(later.every(result => result.reason === 'map_cap'));
  assert.equal(draws.calls, 4);
});

test('una solicitud fallida se identifica sin contar aparición ni sustituir su tier', () => {
  const draws = sequenceRng([0, 0.515, 0, 0.905]);
  const director = openMap(2, draws.rng);
  const [failedRequest] = director.advanceTo(60);
  assert.equal(failedRequest.request.tier, 'D2');
  const failure = { code: 'adapter_error', detail: 'sin ubicación disponible' };
  assert.equal(director.failAppearance(failedRequest.request.id, failure).ok, true);
  assert.equal(director.getState().appearanceCount, 0);
  assert.deepEqual(director.getState().requests[0].failure, failure);

  const [nextOpportunity] = director.advanceTo(120);
  assert.equal(nextOpportunity.outcome, 'request');
  assert.equal(nextOpportunity.request.tier, 'D4');
  assert.equal(director.getState().appearanceCount, 0);
});

test('la restauración de ensayo conserva el cruce, pausa el reloj de origen y solo otro mapa reinicia el estado', () => {
  const draws = sequenceRng([0, 0.005, 0]);
  const director = openMap(2, draws.rng);
  const [request] = director.advanceTo(60);
  const snapshot = director.getState();

  const restored = RiftDirector.create({ rng: draws.rng });
  restored.restoreForTest(snapshot);
  assert.deepEqual(restored.advanceTo(60), []);
  assert.deepEqual(restored.advanceTo(60), []); // reloj de origen congelado durante pausa/recinto
  assert.equal(restored.confirmAppearance(request.request.id).ok, true);
  assert.equal(restored.getState().appearanceCount, 1);
  restored.startMap('map-2', 2);
  assert.equal(restored.getState().appearanceCount, 1);

  restored.startMap('map-3', 3);
  assert.equal(restored.getState().appearanceCount, 0);
  assert.deepEqual(restored.getState().opportunities, []);
});

test('rechaza un reloj regresivo y no consume la oportunidad cuando el RNG falla', () => {
  const draws = sequenceRng([0, Number.NaN, 0, 0.005]);
  const director = openMap(2, draws.rng);
  assert.throws(() => director.advanceTo(60), /RNG/);
  assert.deepEqual(director.getState().opportunities, []);
  assert.equal(director.advanceTo(60)[0].outcome, 'request');
  assert.throws(() => director.advanceTo(59), /reloj activo/i);
});

test('una confirmación tardía del mapa anterior no confirma una solicitud del nuevo ordinal', () => {
  const draws = sequenceRng([0, 0, 0, 0.005]);
  const director = RiftDirector.create({ rng: draws.rng });
  director.startMap('map-reused', 2);
  const oldRequest = director.advanceTo(60)[0].request;

  director.startMap('map-reused', 3);
  const currentRequest = director.advanceTo(60)[0].request;
  assert.notEqual(currentRequest.id, oldRequest.id);
  assert.deepEqual(director.confirmAppearance(oldRequest.id), {
    ok: false,
    reason: 'unknown_request',
    requestId: oldRequest.id
  });
  assert.equal(director.getState().appearanceCount, 0);
  assert.equal(director.confirmAppearance(currentRequest.id).ok, true);
  assert.equal(director.getState().appearanceCount, 1);
});
