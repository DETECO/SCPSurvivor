const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const sourcePath = path.join(__dirname, '..', 'js', 'ui', 'operations-menu.js');
const approvedArmasSourceCatalog = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'docs', 'referencias', 'armas', 'armas-prueba-direccionales-v1', 'catalogo.json'), 'utf8'));
const approvedMenuCatalogPath = path.join(__dirname, '..', 'assets', 'menus', 'approved-weapons-arm-vis-r1', 'catalog.json');
const approvedMenuCatalog = JSON.parse(fs.readFileSync(approvedMenuCatalogPath, 'utf8'));

function loadMenu({ mapTrial = { enabled: true,expanded:true }, accounts = { enabled: false }, search = '', armasCatalog = approvedMenuCatalog } = {}) {
  const events = [];
  const elements = new Map();
  for (const id of ['field-role']) {
    elements.set(id, {
      id,
      value: 'guard',
      dispatchEvent(event) { events.push({ id, type: event.type, value: this.value }); },
    });
  }
  const G = {
    MapTrial: mapTrial,
    LocalAccounts: accounts,
    FieldCatalog: {},
  };
  const context = {
    G,
    URLSearchParams,
    Event: class { constructor(type) { this.type = type; } },
    window: { location: { search }, MENU_APPROVED_WEAPONS: armasCatalog },
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

test('el menú de armas muestra solo los nueve diseños aprobados y F24, sin armas de ensayo', () => {
  const { menu } = loadMenu();
  assert.equal(menu.availableWeapons, undefined);
  assert.equal(menu.selectWeapon, undefined);
  const entries = menu.approvedWeaponModels();
  assert.deepEqual(Array.from(entries, entry => entry.id), approvedArmasSourceCatalog.selected);
  assert.equal(approvedMenuCatalog.source, 'ARM-VIS-001/R1');
  assert.equal(entries.length, 10);
  assert.ok(entries.every(entry => entry.approved === true));
  assert.equal(entries.find(entry => entry.id === 'F24').name, 'Hoja fotónica de contención');
  const markup = menu.approvedWeaponCardsMarkup();
  for (const entry of entries) {
    const menuAsset = approvedMenuCatalog.entries.find(asset => asset.id === entry.id);
    assert.match(markup, new RegExp(`data-approved-weapon="${entry.id}"`));
    assert.match(markup, new RegExp(entry.name));
    const source32 = approvedArmasSourceCatalog.modes['32'][entry.id];
    assert.equal(entry.name, source32.name);
    assert.equal(entry.tier, source32.tier);
    assert.equal(entry.category, source32.category);
    for (const mode of ['16', '32']) {
      const menuImage = menuAsset[`image${mode}`];
      assert.ok(fs.existsSync(path.join(__dirname, '..', menuImage)), `falta recurso visual ${menuImage}`);
      const original = approvedArmasSourceCatalog.modes[mode][entry.id].individuals.find(file => file.endsWith('/E.png'));
      assert.deepEqual(fs.readFileSync(path.join(__dirname, '..', menuImage)), fs.readFileSync(path.join(__dirname, '..', 'docs', 'referencias', 'armas', 'armas-prueba-direccionales-v1', original)));
    }
  }
  assert.doesNotMatch(markup, /data-weapon="(?:pistol|smg|shotgun|baton)"|data-equip-weapon|>Equipar</);
});

test('el menú oculta la galería si la fuente no conserva el estado visual aprobado', () => {
  const { menu } = loadMenu({ armasCatalog: { ...approvedMenuCatalog, status: 'proposal' } });
  assert.deepEqual(Array.from(menu.approvedWeaponModels()), []);
  assert.match(menu.approvedWeaponCardsMarkup(), /No se pudo cargar el catálogo visual aprobado/);
});
