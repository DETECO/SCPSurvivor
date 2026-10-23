const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const sourcePath = path.join(__dirname, '..', 'js', 'ui', 'operations-menu.js');

function loadMenu({ mapTrial = { enabled: true,expanded:true }, accounts = { enabled: false }, search = '' } = {}) {
  const events = [];
  const elements = new Map();
  for (const id of ['field-role', 'loadout-weapon-0']) {
    elements.set(id, {
      id,
      value: id === 'field-role' ? 'guard' : 'pistol',
      dispatchEvent(event) { events.push({ id, type: event.type, value: this.value }); },
    });
  }
  const G = {
    MapTrial: mapTrial,
    LocalAccounts: accounts,
    FieldCatalog: { models: { pistol: {}, smg: {}, shotgun: {}, baton: {}, rifle: {} } },
  };
  const context = {
    G,
    URLSearchParams,
    Event: class { constructor(type) { this.type = type; } },
    window: { location: { search } },
    document: { getElementById: id => elements.get(id) || null },
  };
  vm.runInNewContext(fs.readFileSync(sourcePath, 'utf8'), context, { filename: sourcePath });
  return { menu: G.OperationsMenu, events, elements };
}

test('el menú moderno solo se habilita en pruebas locales sin cuentas y sin interfaz clásica', () => {
  assert.equal(loadMenu().menu.isEnabled(), true);
  assert.equal(loadMenu({ mapTrial: { enabled: false } }).menu.isEnabled(), false);
  assert.equal(loadMenu({ mapTrial: { enabled: true,expanded:false } }).menu.isEnabled(), false);
  assert.equal(loadMenu({ accounts: { enabled: true } }).menu.isEnabled(), false);
  assert.equal(loadMenu({ search: '?interfaz=clasica' }).menu.isEnabled(), false);
});

test('la selección del soldado actualiza el selector que consume FieldLoadout', () => {
  const { menu, events, elements } = loadMenu();
  assert.equal(menu.selectSoldier('medic'), true);
  assert.equal(elements.get('field-role').value, 'medic');
  assert.deepEqual(events, [{ id: 'field-role', type: 'change', value: 'medic' }]);
});

test('el menú limita las armas al catálogo vigente y equipa por el selector existente', () => {
  const { menu, events, elements } = loadMenu();
  assert.deepEqual(Array.from(menu.availableWeapons()), ['pistol', 'smg', 'shotgun', 'baton']);
  assert.equal(menu.selectWeapon('shotgun'), true);
  assert.equal(elements.get('loadout-weapon-0').value, 'shotgun');
  assert.deepEqual(events, [{ id: 'loadout-weapon-0', type: 'change', value: 'shotgun' }]);
});
