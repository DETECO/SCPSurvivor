const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const source = relative => fs.readFileSync(path.join(root, relative), 'utf8');

function load(context, relative) {
  vm.runInContext(source(relative), context, { filename: relative });
}

function setup(search = '?prueba=combate-v2&armas=r1', { random = () => 0 } = {}) {
  const shots = [], enemies = [], phase = { value: 'combat', mapTime: 0, spawnClosed: false };
  const player = { x: 0, y: 0, hp: 100, maxHp: 100, baseMaxHp: 100, dead: false, training: {}, tempStats: {} };
  const contextMath = Object.create(Math);
  contextMath.random = random;
  const G = {
    World: { projectileBlock: () => false, propsInCircle: () => [], isFree: () => true },
    Path: { reachable: () => true },
    EnemyMgr: { all: () => enemies },
    Projectiles: { spawn: shot => shots.push(shot), clear() {} },
    Game: { state: 'playing', player, togglePause() {} },
    FX: { slash() {} },
    Expedition: {
      get state() { return { phase: phase.value, pending: 0, v2: { mapTime: phase.mapTime, spawnClosed: phase.spawnClosed } }; },
      awaitArmament() { phase.value = 'armament'; return true; },
      resolveArmament() { phase.value = 'combat'; return true; },
      awaitTerminal() { phase.value = 'terminal'; return true; },
      resolveTerminal() { phase.value = 'combat'; return true; }
    }
  };
  const window = { location: { search, hostname: '127.0.0.1', protocol: 'http:', pathname: '/' } };
  const context = vm.createContext({ G, window, URLSearchParams, document: null, console, Math: contextMath });
  load(context, 'js/systems/map-trial.js');
  load(context, 'js/data/field-catalog.js');
  load(context, 'js/systems/weapon-revision-r1.js');
  if (fs.existsSync(path.join(root, 'js/systems/weapon-revision-trial.js'))) {
    load(context, 'js/systems/weapon-revision-trial.js');
  }
  load(context, 'js/systems/field-stats.js');
  load(context, 'js/systems/infinite-progression.js');
  load(context, 'js/systems/field-combat.js');
  load(context, 'js/systems/field-upgrades.js');
  load(context, 'js/systems/armament-rewards.js');
  load(context, 'js/systems/weapon-terminal.js');
  load(context, 'js/ui/expanded-ui.js');
  load(context, 'js/ui/field-loadout.js');
  G.Game.player = player;
  const enemy = { id: 'enemy-a', x: 120, y: 0, hp: 1000, dead: false };
  enemies.push(enemy);
  return { G, player, shots, enemy, phase, context, window };
}

function readyR1(run) {
  assert.ok(run.G.WeaponRevisionTrial, 'the r1 combat adapter must be loaded');
  assert.equal(run.G.WeaponRevisionTrial.active(), true);
}

test('AF01 revision requires the explicit URL and ignores legacy ensayo only in this mode', () => {
  const explicit = setup('?prueba=combate-v2&armas=r1&ensayo=terminal');
  assert.equal(explicit.G.WeaponRevisionTrial?.active(), true);
  assert.equal(explicit.G.MapTrial.practice, null);
  assert.equal(explicit.G.WeaponRevisionTrial?.legacyPracticeIgnored, true);

  const legacy = setup('?prueba=combate-v2&ensayo=terminal');
  assert.equal(legacy.G.WeaponRevisionTrial?.active(), false);
  assert.equal(legacy.G.MapTrial.practice, 'terminal');

  const wrongTrial = setup('?prueba=infinito-v2&armas=r1');
  assert.equal(wrongTrial.G.WeaponRevisionTrial?.active(), false);
});

test('AF01 saturated categories reuse the approved tactical fallback without offering MAX or absent copies', () => {
  const run = setup();
  const { G, player } = run;
  G.FieldCombat.reset(player);
  for (let i = 0; i < 5; i++) assert.equal(G.FieldCombat.upgrade(player.fieldWeapons[0].id), true);
  for (const key of G.FieldStats.temporaryKeys) player.tempStats[key] = 6;
  G.FieldStats.apply(player);
  const before = JSON.stringify(player.fieldWeapons);
  const cards = G.FieldUpgrades.offer(player);
  assert.equal(cards.length, 3, 'a fully capped build still needs the existing tactical choices');
  assert.equal(new Set(cards.map(card => card.key)).size, 3);
  assert.ok(cards.every(card => card.category === 'tactical'));
  assert.equal(cards[0].apply(player), true);
  assert.equal(player.infiniteTactical.remaining, 15);
  assert.equal(JSON.stringify(player.fieldWeapons), before);
  assert.ok(G.FieldStats.temporaryKeys.every(key => player.tempStats[key] === 6));
});

test('AF01 reward at full MAX reuses the existing tactical outcome exactly once', () => {
  const { G, player } = setup();
  G.FieldCombat.reset(player);
  G.ArmamentRewards.offer({ id: 'second', kind: 'boss', seed: 1, player });
  assert.equal(G.ArmamentRewards.claim('second', player).outcome, 'choice');
  assert.equal(G.ArmamentRewards.choose('pistol'), true);
  for (const copy of player.fieldWeapons) for (let i = 0; i < 5; i++) assert.equal(G.FieldCombat.upgrade(copy.id), true);
  const before = JSON.stringify(player.fieldWeapons);
  G.ArmamentRewards.offer({ id: 'max-reward', kind: 'boss', seed: 2, player });
  assert.equal(G.ArmamentRewards.claim('max-reward', player).outcome, 'tactical');
  assert.equal(player.infiniteTactical.type, 'power');
  assert.equal(player.infiniteTactical.remaining, 15);
  player.infiniteTactical.remaining = 3;
  assert.equal(G.ArmamentRewards.claim('max-reward', player).outcome, 'already-claimed');
  assert.equal(player.infiniteTactical.remaining, 3);
  assert.equal(JSON.stringify(player.fieldWeapons), before);
});

test('AF01 mode starts with one level-1 pistol and rejects legacy/non-AF01 starting equipment', () => {
  const run = setup('?prueba=combate-v2&armas=r1&ensayo=melee');
  readyR1(run);
  run.G.FieldCombat.reset(run.player, [
    run.G.FieldCatalog.makeWeapon('smg', 'legacy-smg', []),
    run.G.FieldCatalog.makeWeapon('baton', 'legacy-baton', [])
  ]);
  assert.equal(run.G.MapTrial.practice, null);
  assert.equal(run.player.fieldWeapons.length, 1);
  assert.equal(run.player.fieldWeapons[0].model, 'pistol');
  assert.equal(run.player.fieldWeapons[0].level, 1);
  assert.equal(run.G.WeaponRevisionTrial.levelLabel(run.player.fieldWeapons[0]), 'Nivel 1/5');
  assert.equal(run.G.FieldCombat.acquire('smg', 'foreign-smg'), false);
});

test('copies progress independently through cards and reward never wastes an ascension on MAX', () => {
  const run = setup();
  readyR1(run);
  const { G, player } = run;
  G.FieldCombat.reset(player, [{ id: 'legacy-start', model: 'pistol', mods: [] }]);
  const first = player.fieldWeapons[0];

  G.ArmamentRewards.offer({ id: 'boss-second-pistol', kind: 'boss', seed: 5, player });
  assert.equal(G.ArmamentRewards.claim('boss-second-pistol', player).outcome, 'choice');
  assert.equal(G.ArmamentRewards.choose('pistol'), true);
  assert.equal(player.fieldWeapons.length, 2);
  const second = player.fieldWeapons[1];
  assert.equal(second.model, 'pistol');
  assert.equal(second.level, 1);

  const takeWeaponCard = () => {
    const card = G.FieldUpgrades.offer(player).find(item => item.category === 'weapon');
    assert.ok(card, 'an eligible copy should produce an AF01 upgrade card');
    assert.match(card.title, /AF01|Pistola/i);
    assert.doesNotMatch(card.title + card.desc, /rama|potencia|ritmo|manejo|especializaci[oó]n/i);
    assert.equal(card.apply(player), true);
  };
  for (let i = 0; i < 5; i++) {
    takeWeaponCard();
    const effective = G.FieldStats.weapon(player, first);
    if (i === 0) assert.equal(effective.damage, 11.5);
    if (i === 1) assert.equal(effective.interval, 0.45);
    if (i === 2) assert.equal(effective.range, 368);
    if (i === 3) assert.equal(effective.damage, 13);
  }
  assert.equal(G.WeaponRevisionTrial.levelLabel(first), 'MAX');
  assert.equal(G.WeaponRevisionTrial.levelLabel(second), 'Nivel 1/5');
  assert.equal(G.FieldStats.weapon(player, second).damage, 10);

  G.ArmamentRewards.offer({ id: 'chest-upgrade-second', kind: 'boss', seed: 17, player });
  const reward = G.ArmamentRewards.claim('chest-upgrade-second', player);
  assert.equal(reward.outcome, 'upgraded');
  assert.equal(second.level, 2);
  assert.equal(first.state, 'MAX');

  for (let i = 0; i < 4; i++) takeWeaponCard();
  assert.equal(G.WeaponRevisionTrial.levelLabel(second), 'MAX');
  assert.equal(G.FieldUpgrades.candidates(player).some(item => item.category === 'weapon'), false);
  G.ArmamentRewards.offer({ id: 'all-max-reward', kind: 'boss', seed: 23, player });
  assert.equal(G.ArmamentRewards.claim('all-max-reward', player).outcome, 'tactical');
  assert.equal(first.level, 5);
  assert.equal(second.level, 5);
  assert.equal(G.FieldStats.weapon(player, first).damage, 16.25);
  G.InfiniteProgression.tick(15, player);
  assert.equal(player.infiniteTactical, null);

  player.tempStats.power = 2;
  G.FieldStats.apply(player);
  assert.equal(G.FieldStats.weapon(player, first).damage, 15.6);
  assert.equal(G.FieldStats.weapon(player, second).damage, 15.6);
});

test('MAX AF01 fires one real delayed extra projectile after reload with no extra ammo or recursion', () => {
  const run = setup();
  readyR1(run);
  const { G, player, shots } = run;
  G.FieldCombat.reset(player, [{ id: 'legacy-start', model: 'pistol', mods: [] }]);
  const copy = player.fieldWeapons[0];
  for (let i = 0; i < 5; i++) assert.equal(G.WeaponRevisionTrial.advanceCopy(copy.id).ok, true);
  assert.equal(G.WeaponRevisionTrial.levelLabel(copy), 'MAX');
  player.tempStats.power = 2;
  G.FieldStats.apply(player);

  copy.ammo = 0;
  G.FieldCombat.tick(0.01, player, true);
  assert.equal(copy.reload, 1.5);
  G.FieldCombat.tick(1.5, player, true);
  assert.equal(shots.length, 1);
  assert.equal(shots[0].dmg, 15.6);
  assert.equal(copy.ammo, 11);
  assert.equal(copy._r1ExtraShot?.remaining, 0.12);

  G.FieldCombat.tick(0.119, player, true);
  assert.equal(shots.length, 1);
  G.FieldCombat.tick(0.001, player, true);
  assert.equal(shots.length, 2);
  assert.equal(shots[1].dmg, 6.24);
  assert.equal(copy.ammo, 11);
  assert.equal(copy._r1ExtraShot, null);
  G.FieldCombat.tick(0.5, player, true);
  assert.equal(shots.filter(shot => shot.dmg === 6.24).length, 1);
});

test('a scheduled MAX extra waits through blocked, paused, terminal and dead ticks without being consumed', () => {
  const run = setup();
  readyR1(run);
  const { G, player, shots, phase } = run;
  G.FieldCombat.reset(player, [{ id: 'legacy-start', model: 'pistol', mods: [] }]);
  const copy = player.fieldWeapons[0];
  for (let i = 0; i < 5; i++) G.WeaponRevisionTrial.advanceCopy(copy.id);
  copy.ammo = 0;
  G.FieldCombat.tick(0.01, player, true);
  G.FieldCombat.tick(1.5, player, true);
  assert.equal(shots.length, 1);
  assert.equal(copy._r1ExtraShot?.remaining, 0.12);
  copy.shotWait = 10;

  G.FieldCombat.tick(0.12, player, false);
  assert.equal(shots.length, 1);
  assert.equal(copy._r1ExtraShot?.remaining, 0.12);
  phase.value = 'levelup';
  G.FieldCombat.tick(0.12, player, true);
  assert.equal(shots.length, 1);
  assert.equal(copy._r1ExtraShot?.remaining, 0.12);
  phase.value = 'combat';
  phase.value = 'terminal';
  G.FieldCombat.tick(0.12, player, true);
  assert.equal(shots.length, 1);
  assert.equal(copy._r1ExtraShot?.remaining, 0.12);
  phase.value = 'combat';
  G.Game.state = 'paused';
  G.FieldCombat.tick(0.12, player, true);
  assert.equal(shots.length, 1);
  assert.equal(copy._r1ExtraShot?.remaining, 0.12);
  G.Game.state = 'playing';
  player.dead = true;
  G.FieldCombat.tick(0.12, player, true);
  assert.equal(shots.length, 1);
  assert.equal(copy._r1ExtraShot?.remaining, 0.12);
  player.hp = 0;
  G.FieldCombat.tick(0.12, player, true);
  assert.equal(shots.length, 1);
  assert.equal(copy._r1ExtraShot?.remaining, 0.12);
  player.hp = 100;
  player.dead = false;
  G.FieldCombat.tick(0.12, player, true);
  assert.equal(shots.length, 2);
  assert.equal(shots[1].dmg, 5.2);
  assert.equal(copy._r1ExtraShot, null);
});

test('AF01 revision freezes its combat clocks during cards, armament, terminal and pause', () => {
  const run = setup();
  readyR1(run);
  const { G, player, phase } = run;
  G.FieldCombat.reset(player, [{ id: 'legacy-start', model: 'pistol', mods: [] }]);
  const copy = player.fieldWeapons[0];
  copy.shotWait = 0.4;
  copy.reload = 1.2;
  G.FieldCombat.tick(0.2, player, true);
  assert.equal(copy.shotWait, 0.2);
  assert.equal(copy.reload, 1);
  copy.shotWait = 0.4;
  copy.reload = 1.2;
  phase.value = 'levelup';
  G.FieldCombat.tick(0.2, player, true);
  assert.equal(copy.shotWait, 0.4);
  assert.equal(copy.reload, 1.2);
  phase.value = 'combat';
  copy.shotWait = 0.4;
  copy.reload = 1.2;
  phase.value = 'armament';
  G.FieldCombat.tick(0.2, player, true);
  assert.equal(copy.shotWait, 0.4);
  assert.equal(copy.reload, 1.2);
  phase.value = 'terminal';
  G.FieldCombat.tick(0.2, player, true);
  assert.equal(copy.shotWait, 0.4);
  assert.equal(copy.reload, 1.2);
  phase.value = 'combat';
  G.Game.state = 'paused';
  G.FieldCombat.tick(0.2, player, true);
  assert.equal(copy.shotWait, 0.4);
  assert.equal(copy.reload, 1.2);
});

test('AF01 continues firing and reloading after 5:00 without changing ability or regeneration state', () => {
  const run = setup();
  readyR1(run);
  const { G, player, shots, phase } = run;
  G.FieldCombat.reset(player, [{ id: 'legacy-start', model: 'pistol', mods: [] }]);
  const copy = player.fieldWeapons[0];
  phase.mapTime = 301;
  phase.spawnClosed = true;
  copy.reload = 0;
  copy.ammo = 0;
  copy.shotWait = 0.4;
  player.regenFlat = 0.75;
  player.abilityCooldown = 2.5;
  assert.equal(G.WeaponRevisionTrial.timerStep(0.2), 0.2);
  G.FieldCombat.tick(0.2, player, true);
  assert.equal(copy.reload, 0);
  assert.equal(copy.shotWait, 0.2);
  assert.equal(player.regenFlat, 0.75);
  assert.equal(player.abilityCooldown, 2.5);
  G.FieldCombat.tick(0.2, player, true);
  assert.equal(copy.reload, 1.5);
  G.FieldCombat.tick(1.5, player, true);
  assert.equal(copy.reload, 0);
  assert.equal(copy.ammo, 11);
  assert.equal(shots.length, 1);
  assert.equal(player.regenFlat, 0.75);
  assert.equal(player.abilityCooldown, 2.5);
});

test('AF01 reward materialization failure keeps the second slot and reward available for retry', () => {
  const run = setup();
  readyR1(run);
  const { G, player } = run;
  G.FieldCombat.reset(player, [{ id: 'legacy-start', model: 'pistol', mods: [] }]);
  G.ArmamentRewards.offer({ id: 'atomic-second-pistol', kind: 'boss', seed: 5, player });
  assert.equal(G.ArmamentRewards.claim('atomic-second-pistol', player).outcome, 'choice');

  const acquire = G.FieldCombat.acquire;
  G.FieldCombat.acquire = () => false;
  assert.equal(G.ArmamentRewards.choose('pistol'), false);
  assert.equal(player.fieldWeapons.length, 1);
  assert.equal(G.WeaponRevisionTrial.state.weapons.length, 1);
  assert.equal(G.ArmamentRewards.state.receipts.length, 0);
  G.FieldCombat.acquire = acquire;

  assert.equal(G.ArmamentRewards.choose('pistol'), true);
  assert.equal(player.fieldWeapons.length, 2);
  assert.equal(G.WeaponRevisionTrial.state.weapons.length, 2);
  assert.equal(G.ArmamentRewards.state.receipts.length, 1);
  assert.equal(player.fieldWeapons[1].level, 1);
});

test('AF01 rewards reject dead players and inactive expedition phases without consuming a receipt', () => {
  const run = setup();
  readyR1(run);
  const { G, player, phase } = run;
  G.FieldCombat.reset(player, [{ id: 'legacy-start', model: 'pistol', mods: [] }]);
  player.hp = 0;
  assert.equal(G.WeaponRevisionTrial.claimReward('inactive-dead', player, { model: 'AF01' }).reason, 'invalid_expedition');
  player.hp = 100;
  phase.value = 'finished';
  assert.equal(G.WeaponRevisionTrial.claimReward('inactive-finished', player, { model: 'AF01' }).reason, 'invalid_expedition');
  phase.value = 'idle';
  assert.equal(G.WeaponRevisionTrial.claimReward('inactive-idle', player, { model: 'AF01' }).reason, 'invalid_expedition');
  phase.value = 'combat';
  assert.equal(G.WeaponRevisionTrial.claimReward('inactive-retry', player, { model: 'AF01' }).outcome, 'acquired');
});

test('prestart AF01 loadout preview works before reset and does not create a run or unlock other models', () => {
  class Element {
    constructor(id = '') { this.id = id; this.children = []; this.hidden = false; this.value = id === 'field-role' ? 'guard' : ''; }
    addEventListener() {}
    append(...nodes) { this.children.push(...nodes); }
    replaceChildren(...nodes) { this.children = nodes; this.textContent = ''; }
    closest() { return { hidden: false }; }
    set textContent(value) { this._text = String(value); }
    get textContent() { return this._text || this.children.map(child => child.textContent || '').join(' '); }
  }
  const run = setup();
  readyR1(run);
  run.phase.value = 'idle';
  const elements = new Map();
  run.context.document = {
    getElementById(id) { if (!elements.has(id)) elements.set(id, new Element(id)); return elements.get(id); },
    createElement() { return new Element(); }
  };
  assert.equal(run.G.FieldCombat.getweapons().length, 0);
  assert.equal(run.G.WeaponRevisionTrial.state, null);
  assert.doesNotThrow(() => run.G.FieldLoadout.init());
  assert.equal(run.G.WeaponRevisionTrial.state, null);
  assert.equal(run.G.FieldCombat.getweapons().length, 0);
  assert.deepEqual(Array.from(elements.get('loadout-weapon-0').children, option => option.value), ['pistol']);
  assert.match(elements.get('loadout-preview').textContent, /10\.0 daño/);

  run.phase.value = 'finished';
  const options = run.G.FieldLoadout.options();
  assert.deepEqual(Array.from(options.loadout, weapon => weapon.model), ['pistol']);
  assert.equal(run.G.WeaponRevisionTrial.state, null);
  assert.equal(run.G.FieldCombat.getweapons().length, 0);
});

test('terminal offers only AF01 and replaces one copy at level 1 while preserving its partner', () => {
  const run = setup();
  readyR1(run);
  const { G, player } = run;
  G.FieldCombat.reset(player, [{ id: 'legacy-start', model: 'pistol', mods: [] }]);
  G.ArmamentRewards.offer({ id: 'boss-second-pistol', kind: 'boss', seed: 5, player });
  G.ArmamentRewards.claim('boss-second-pistol', player);
  G.ArmamentRewards.choose('pistol');
  const replaced = player.fieldWeapons[0];
  const partner = player.fieldWeapons[1];
  for (let i = 0; i < 5; i++) G.WeaponRevisionTrial.advanceCopy(replaced.id);
  G.WeaponTerminal.reset({ entry: { x: 0, y: 0 }, exit: { x: 1000, y: 0 }, spawnPoints: [{ x: 200, y: 0 }] }, { player, seed: 7 });
  player.x = 200;
  G.WeaponTerminal.tick(0, player);
  assert.deepEqual(Array.from(G.WeaponTerminal.state.models), ['pistol']);
  assert.equal(G.WeaponTerminal.open(), true);
  assert.equal(G.WeaponTerminal.choose(0, 'pistol'), true);
  assert.equal(player.fieldWeapons.length, 2);
  assert.equal(player.fieldWeapons[0].model, 'pistol');
  assert.equal(player.fieldWeapons[0].level, 1);
  assert.equal(G.WeaponRevisionTrial.levelLabel(player.fieldWeapons[0]), 'Nivel 1/5');
  assert.equal(player.fieldWeapons[1].id, partner.id);
  assert.equal(player.fieldWeapons[1].level, 1);
  assert.equal(G.WeaponRevisionTrial.state.weapons.some(copy => copy.id === replaced.id), false);
});

test('AF01 inspection and HUD show level/MAX and omit legacy branches', () => {
  class Element {
    constructor() { this.children = []; this.hidden = true; this.dataset = {}; this.attributes = {}; this.value = ''; }
    replaceChildren(...nodes) { this.children = nodes; this.textContent = ''; }
    append(...nodes) { this.children.push(...nodes); }
    setAttribute(key, value) { this.attributes[key] = value; }
    get textContent() { return this._text || this.children.map(child => child.textContent || '').join(' '); }
    set textContent(value) { this._text = String(value); }
  }
  const run = setup();
  readyR1(run);
  const elements = new Map();
  const document = {
    body: new Element(),
    getElementById(id) { if (!elements.has(id)) elements.set(id, new Element()); return elements.get(id); },
    createElement() { return new Element(); },
    querySelector() { return new Element(); }
  };
  run.context.document = document;
  run.context.Event = class Event {};
  run.G.TrialVisuals = { enabled: true, initUI() {} };
  run.G.FieldRadar = { draw() {} };
  run.G.FieldCombat.reset(run.player, [{ id: 'legacy-start', model: 'pistol', mods: [] }]);
  run.G.ExpandedUI.init();
  run.G.ExpandedUI.state('paused');
  const inspection = document.getElementById('expanded-build-content').textContent;
  const note = document.getElementById('expanded-test-note').textContent;
  assert.match(inspection, /Nivel 1\/5/);
  assert.doesNotMatch(inspection, /Ramas|(?:^| · )[PRME]\d(?: ·|$)|Potencia|Ritmo|Manejo|Especialización/i);
  assert.match(note, /AF01.*parcial/i);
  assert.match(note, /fusi[oó]n.*pendiente/i);
});
