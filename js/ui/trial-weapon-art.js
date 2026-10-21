(function () {
  const palette = {
    ink: '#20252b',
    steel: '#687681',
    highlight: '#b8c2cb',
    burgundy: '#783b45',
    wood: '#74503d',
    woodLight: '#a8754f',
    flash: '#ffd889',
    flashCore: '#fff1bd'
  };

  function rect(ctx, color, x, y, width, height) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  }

  function drawPistol(ctx) {
    rect(ctx, palette.ink, -1, -3, 10, 4);
    rect(ctx, palette.highlight, 1, -4, 6, 1);
    rect(ctx, palette.steel, 8, -2, 4, 2);
    rect(ctx, palette.ink, 2, 1, 4, 5);
    rect(ctx, palette.burgundy, 3, 2, 2, 3);
    rect(ctx, palette.steel, 6, 1, 1, 2);
    return 11;
  }

  function drawSmg(ctx) {
    rect(ctx, palette.ink, -6, -2, 5, 3);
    rect(ctx, palette.steel, -5, -1, 3, 1);
    rect(ctx, palette.ink, -1, -3, 10, 5);
    rect(ctx, palette.highlight, 1, -4, 5, 1);
    rect(ctx, palette.steel, 8, -2, 8, 2);
    rect(ctx, palette.ink, 15, -3, 2, 4);
    rect(ctx, palette.ink, 3, 2, 3, 6);
    rect(ctx, palette.burgundy, 4, 3, 1, 3);
    rect(ctx, palette.ink, -1, 1, 3, 4);
    return 17;
  }

  function drawShotgun(ctx) {
    rect(ctx, palette.wood, -7, -2, 6, 4);
    rect(ctx, palette.woodLight, -6, -1, 4, 1);
    rect(ctx, palette.ink, -1, -3, 7, 5);
    rect(ctx, palette.steel, 1, -2, 5, 1);
    rect(ctx, palette.steel, 5, -2, 13, 1);
    rect(ctx, palette.ink, 17, -3, 3, 3);
    rect(ctx, palette.wood, 1, 1, 10, 2);
    rect(ctx, palette.woodLight, 3, 1, 6, 1);
    rect(ctx, palette.burgundy, -1, 2, 3, 3);
    return 20;
  }

  function drawBaton(ctx) {
    rect(ctx, palette.burgundy, -4, -2, 4, 4);
    rect(ctx, palette.highlight, -3, -1, 2, 1);
    rect(ctx, palette.ink, 0, -1, 8, 2);
    rect(ctx, palette.steel, 7, -3, 6, 6);
    rect(ctx, palette.highlight, 8, -2, 4, 1);
    rect(ctx, palette.ink, 12, -2, 2, 4);
  }

  function drawFlash(ctx, muzzleX, flash) {
    if (!(flash > 0)) return;
    ctx.save();
    ctx.globalAlpha = Math.min(1, flash / 0.09);
    rect(ctx, palette.flash, muzzleX, -3, 2, 6);
    rect(ctx, palette.flashCore, muzzleX + 2, -1, 3, 2);
    rect(ctx, palette.flash, muzzleX + 4, -2, 2, 4);
    ctx.restore();
  }

  function draw(ctx, pl, options, weapons) {
    if (G.TrialVisuals?.enabled !== true || !pl || pl.dead) return false;

    const aim = Number.isFinite(pl.weaponAim) ? pl.weaponAim : Number.isFinite(pl.aim) ? pl.aim : 0;
    const ca = Math.cos(aim), sa = Math.sin(aim);
    const hasBehind = Object.prototype.hasOwnProperty.call(options || {}, 'behind');
    const behind = hasBehind ? !!options.behind : null;
    const isBehind = sa < 0;
    if (behind !== null && isBehind !== behind) return true;

    const copies = Array.isArray(weapons) ? weapons.slice(0, 2) : [];
    for (let i = 0; i < copies.length; i++) {
      const weapon = copies[i] || {};
      const model = weapon.model;
      if (model !== 'pistol' && model !== 'smg' && model !== 'shotgun' && model !== 'baton') continue;

      const side = i === 0 ? 5 : -3.5;
      const x = pl.x + ca * 7 - sa * side;
      const y = pl.y - 9 + sa * 7 + ca * side;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(aim);
      if (i === 1) ctx.scale(0.86, 0.86);

      let muzzleX = 0;
      if (model === 'pistol') muzzleX = drawPistol(ctx);
      else if (model === 'smg') muzzleX = drawSmg(ctx);
      else if (model === 'shotgun') muzzleX = drawShotgun(ctx);
      else drawBaton(ctx);

      if (model !== 'baton' && Number.isFinite(weapon.flash)) drawFlash(ctx, muzzleX, weapon.flash);
      ctx.restore();
    }
    return true;
  }

  G.TrialWeaponArt = { draw };
})();
