const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const G = { TrialVisuals: { enabled: true } };
const sandbox = { G, Math, Number, Object, Array };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(root, 'js/ui/trial-weapon-art.js'), 'utf8'), sandbox);

function contextSpy() {
  const calls = { rects: [], arcs: [], anchors: [], saves: 0, restores: 0, depth: 0, maxDepth: 0 };
  const ctx = {
    fillStyle: '#000', globalAlpha: 1,
    save() { calls.saves++; calls.depth++; calls.maxDepth = Math.max(calls.maxDepth, calls.depth); },
    restore() { calls.restores++; calls.depth--; },
    translate(x,y) { calls.anchors.push({x,y}); }, rotate() {}, scale() {},
    fillRect(x, y, w, h) { calls.rects.push({ x, y, w, h, color: this.fillStyle }); },
    beginPath() {}, arc(x, y, radius) { calls.arcs.push({ x, y, radius }); }, fill() {}
  };
  return { ctx, calls };
}

const player = { x: 40, y: 70, aim: 0, weaponAim: 0, dead: false };
const render = model => {
  const { ctx, calls } = contextSpy();
  const result = G.TrialWeaponArt.draw(ctx, player, {}, [{ model, flash: 0, shotWait: 0 }]);
  assert.equal(result, true);
  assert.equal(calls.depth, 0, 'canvas save/restore stack is balanced');
  assert.equal(calls.saves, calls.restores);
  return calls;
};

// The four silhouettes use distinct pixel footprints.
const models = ['pistol', 'smg', 'shotgun', 'baton'].map(model => render(model));
for(const calls of models)assert.ok(calls.anchors[0].y>=player.y-24&&calls.anchors[0].y<=player.y-12,'weapon held at the new sprite hands, above boots');
const footprints = models.map(c => c.rects.map(r => `${r.x},${r.y},${r.w},${r.h}`).join('|'));
assert.equal(new Set(footprints).size, 4, 'each model has a recognizable silhouette');

// Up to two weapons are drawn and each retains its own shape.
{
  const { ctx, calls } = contextSpy();
  assert.equal(G.TrialWeaponArt.draw(ctx, player, {}, [
    { model: 'pistol', flash: 0 }, { model: 'shotgun', flash: 0 }, { model: 'smg', flash: 0 }
  ]), true);
  assert.equal(calls.rects.length, render('pistol').rects.length + render('shotgun').rects.length);
  assert.equal(calls.depth, 0);
}

// Behind/front passes draw exactly the weapons whose aim points to that side.
{
  const { ctx, calls } = contextSpy();
  player.weaponAim = -Math.PI / 2;
  assert.equal(G.TrialWeaponArt.draw(ctx, player, { behind: true }, [{ model: 'pistol' }]), true);
  const behindCount = calls.rects.length;
  assert.ok(behindCount > 0);
  assert.equal(G.TrialWeaponArt.draw(ctx, player, { behind: false }, [{ model: 'pistol' }]), true);
  assert.equal(calls.rects.length, behindCount);
  player.weaponAim = Math.PI / 2;
  assert.equal(G.TrialWeaponArt.draw(ctx, player, { behind: true }, [{ model: 'smg' }]), true);
  assert.equal(calls.rects.length, behindCount);
  assert.equal(G.TrialWeaponArt.draw(ctx, player, { behind: false }, [{ model: 'smg' }]), true);
  assert.ok(calls.rects.length > behindCount);
  assert.equal(calls.depth, 0);
}

// Ballistic copies show muzzle flash; the baton never does.
{
  const pistol = contextSpy();
  G.TrialWeaponArt.draw(pistol.ctx, player, {}, [{ model: 'pistol', flash: 0.08 }]);
  assert.ok(pistol.calls.rects.length > render('pistol').rects.length);
  const baton = contextSpy();
  G.TrialWeaponArt.draw(baton.ctx, player, {}, [{ model: 'baton', flash: 0.08 }]);
  assert.equal(baton.calls.rects.length, render('baton').rects.length);
}

// Disabled visuals and absent/dead players are safe no-ops.
{
  const { ctx, calls } = contextSpy();
  G.TrialVisuals.enabled = false;
  assert.equal(G.TrialWeaponArt.draw(ctx, player, {}, [{ model: 'pistol' }]), false);
  G.TrialVisuals.enabled = true;
  assert.equal(G.TrialWeaponArt.draw(ctx, null, {}, [{ model: 'pistol' }]), false);
  assert.equal(G.TrialWeaponArt.draw(ctx, { ...player, dead: true }, {}, [{ model: 'pistol' }]), false);
  assert.equal(calls.rects.length, 0);
}

console.log('v2 visual weapons: ok');
