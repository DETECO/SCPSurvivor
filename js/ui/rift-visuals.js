(function () {
  const OPEN = 'open';
  const ACTIVE = 'active';
  const TAU = Math.PI * 2;

  const shapes = {
    scarOuter: [-5, -42, 7, -33, 3, -22, 15, -12, 7, -4, 13, 8, 5, 17, 9, 34, -3, 41, -13, 30, -8, 18, -18, 8, -10, -3, -17, -14, -7, -24],
    scarCore: [-2, -34, 6, -24, 1, -15, 9, -7, 3, 1, 8, 11, 2, 19, 5, 31, -2, 35, -7, 26, -4, 16, -11, 8, -5, 0, -12, -10, -4, -19],
    paperLeft: [-23, -37, -2, -41, -3, -21, -10, -10, -8, 16, -18, 33, -25, 24, -21, 4, -27, -3],
    paperRight: [4, -39, 22, -29, 17, -13, 27, -5, 17, 9, 23, 34, 10, 37, 9, 13, 3, 3, 10, -11],
    paperTopFold: [-22, -37, -2, -41, 8, -31, -4, -24],
    paperLeftFace: [-23, -37, -12, -31, -13, 14, -18, 33, -25, 24, -21, 4, -27, -3],
    paperRightFace: [17, -13, 22, -29, 27, -5, 17, 9, 23, 34, 10, 37, 12, 17],
    mirrorCore: [-3, -37, 8, -24, 2, -12, 10, -1, 4, 11, 8, 24, 0, 37, -10, 25, -4, 12, -11, 2, -5, -12],
    shardL1: [-14, -32, -25, -23, -13, -10],
    shardL2: [-18, -9, -28, 1, -15, 8],
    shardL3: [-12, 14, -23, 24, -7, 32],
    shardR1: [13, -31, 26, -19, 14, -11],
    shardR2: [14, -3, 27, 2, 17, 12],
    shardR3: [7, 19, 23, 30, 3, 34],
    glitchCore: [-12, -35, 11, -35, 11, -25, 14, -25, 14, 29, 8, 29, 8, 36, -12, 36, -12, 26, -15, 26, -15, -20, -12, -20]
  };

  function path(ctx, points) {
    ctx.beginPath();
    ctx.moveTo(points[0], points[1]);
    for (let i = 2; i < points.length; i += 2) ctx.lineTo(points[i], points[i + 1]);
    ctx.closePath();
  }

  function fillPoly(ctx, points, color) {
    path(ctx, points);
    ctx.fillStyle = color;
    ctx.fill();
  }

  function strokePoly(ctx, points, color, width) {
    path(ctx, points);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
  }

  function line(ctx, points, color, width) {
    ctx.beginPath();
    ctx.moveTo(points[0], points[1]);
    for (let i = 2; i < points.length; i += 2) ctx.lineTo(points[i], points[i + 1]);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  }

  function ground(ctx, glow) {
    ctx.beginPath();
    ctx.ellipse(0, 35, 28, 7, 0, 0, TAU);
    ctx.fillStyle = 'rgba(0,0,0,0.42)';
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(0, 34, 20, 4, 0, 0, TAU);
    ctx.fillStyle = glow;
    ctx.fill();
  }

  function scarlet(ctx) {
    ground(ctx, 'rgba(255,45,60,0.25)');
    ctx.beginPath();
    ctx.ellipse(0, -1, 19, 39, 0, 0, TAU);
    ctx.fillStyle = 'rgba(255,28,46,0.15)';
    ctx.fill();
    fillPoly(ctx, shapes.scarOuter, '#a62535');
    fillPoly(ctx, shapes.scarCore, '#08090d');
    strokePoly(ctx, shapes.scarCore, '#ff5261', 2.2);
    line(ctx, [-5, -35, 2, -23, -4, -12, 4, -2, -2, 9, 3, 20, -1, 33], '#ffd0cb', 1.2);
    line(ctx, [-13, -8, -23, -2, -18, 2], '#f63c50', 2.2);
    line(ctx, [9, -15, 21, -22, 17, -13], '#f63c50', 2.2);
    line(ctx, [-10, 17, -20, 24, -15, 26], '#a62535', 3);
    line(ctx, [7, 19, 17, 28, 13, 31], '#a62535', 3);
    ctx.fillStyle = '#ff9a83';
    ctx.fillRect(-17, 34, 2, 2);
    ctx.fillRect(15, 31, 2, 2);
  }

  function foldedPaper(ctx) {
    ground(ctx, 'rgba(255,184,49,0.22)');
    fillPoly(ctx, shapes.paperLeft, '#9a6825');
    fillPoly(ctx, shapes.paperRight, '#a76c20');
    fillPoly(ctx, shapes.paperLeftFace, '#e7b54f');
    fillPoly(ctx, shapes.paperRightFace, '#d49a36');
    fillPoly(ctx, shapes.paperTopFold, '#f5d778');
    fillPoly(ctx, [-7, -31, 8, -27, 7, 29, -7, 34], '#090a0c');
    line(ctx, [-21, -34, -13, -27, -14, 12, -19, 28], '#fff0a3', 2);
    line(ctx, [20, -24, 15, -12, 21, -4, 15, 7, 19, 29], '#ffe08a', 2);
    line(ctx, [-6, -30, 3, -25, 10, -29], '#79501e', 2);
    ctx.fillStyle = '#ffd974';
    ctx.fillRect(-25, 32, 5, 2);
    ctx.fillRect(20, 34, 4, 2);
  }

  function prism(ctx) {
    ground(ctx, 'rgba(123,146,255,0.22)');
    fillPoly(ctx, shapes.mirrorCore, '#11101b');
    fillPoly(ctx, shapes.shardL1, '#17264b');
    fillPoly(ctx, [-14, -32, -25, -23, -13, -10], '#8bdfff');
    fillPoly(ctx, shapes.shardL2, '#273f7a');
    fillPoly(ctx, [-18, -9, -28, 1, -15, 8], '#e4b4ff');
    fillPoly(ctx, shapes.shardL3, '#1a2b50');
    fillPoly(ctx, [-12, 14, -23, 24, -7, 32], '#71caff');
    fillPoly(ctx, shapes.shardR1, '#22204e');
    fillPoly(ctx, [13, -31, 26, -19, 14, -11], '#efb2ff');
    fillPoly(ctx, shapes.shardR2, '#26366c');
    fillPoly(ctx, [14, -3, 27, 2, 17, 12], '#86e3ff');
    fillPoly(ctx, shapes.shardR3, '#1b2751');
    fillPoly(ctx, [7, 19, 23, 30, 3, 34], '#e4b4ff');
    strokePoly(ctx, shapes.shardL1, '#aeeaff', 1);
    strokePoly(ctx, shapes.shardR1, '#ffd6ff', 1);
    line(ctx, [-4, -31, 4, -17, -5, -4, 4, 7, -2, 21, 2, 31], '#ff405b', 1.7);
    ctx.fillStyle = '#d9fbff';
    ctx.fillRect(-29, -2, 2, 3);
    ctx.fillRect(25, 17, 2, 2);
  }

  function organic(ctx) {
    ground(ctx, 'rgba(151,42,67,0.25)');
    fillPoly(ctx, [-4, -39, 9, -28, 5, -15, 12, -1, 7, 14, 9, 31, -3, 36, -13, 24, -8, 9, -14, -2, -7, -15, -11, -27], '#241323');
    line(ctx, [-17, 32, -24, 23, -18, 14, -26, 7, -17, -1, -23, -12, -13, -17, -17, -30, -8, -40], '#30271a', 5);
    line(ctx, [-13, 28, -18, 21, -11, 14, -19, 7, -10, 0, -15, -10, -7, -18, -9, -31], '#61502b', 2.4);
    line(ctx, [17, 31, 24, 23, 17, 14, 26, 6, 16, -1, 23, -12, 13, -18, 17, -31, 7, -40], '#30271a', 5);
    line(ctx, [13, 28, 18, 21, 11, 14, 19, 7, 10, 0, 15, -10, 7, -18, 9, -31], '#61502b', 2.4);
    line(ctx, [-5, -34, 0, -21, -6, -10, 2, 2, -4, 14, 0, 31], '#a73348', 1.8);
    ctx.beginPath(); ctx.ellipse(-18, 12, 3, 4, 0, 0, TAU); ctx.fillStyle = '#f6a84c'; ctx.fill();
    ctx.beginPath(); ctx.ellipse(18, -16, 3, 4, 0, 0, TAU); ctx.fillStyle = '#f6a84c'; ctx.fill();
    ctx.beginPath(); ctx.ellipse(19, 23, 2.5, 3, 0, 0, TAU); ctx.fillStyle = '#ffcc67'; ctx.fill();
  }

  function blackHorizon(ctx) {
    ground(ctx, 'rgba(255,174,57,0.24)');
    ctx.beginPath();
    ctx.ellipse(0, 0, 20, 39, 0, 0, TAU);
    ctx.strokeStyle = 'rgba(255,153,43,0.27)'; ctx.lineWidth = 8; ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(0, 0, 16, 36, 0, 0, TAU);
    ctx.fillStyle = '#030508'; ctx.fill();
    ctx.strokeStyle = '#ffb94e'; ctx.lineWidth = 1.6; ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(-1, -1, 19, 38, 0, 0, TAU);
    ctx.strokeStyle = '#ffe29a'; ctx.lineWidth = 1; ctx.stroke();
    line(ctx, [-12, -28, -8, -35, -2, -37], '#fff2c3', 1.5);
    line(ctx, [15, -12, 18, -4, 16, 4], '#f1a533', 1);
    ctx.fillStyle = '#f5c677';
    ctx.fillRect(-24, -6, 2, 2);
    ctx.fillRect(22, 12, 2, 2);
    ctx.fillRect(-18, 29, 2, 2);
    ctx.fillRect(16, -32, 2, 2);
  }

  function spectral(ctx) {
    ground(ctx, 'rgba(80,229,255,0.22)');
    fillPoly(ctx, [-17, -36, 16, -36, 16, -29, 20, -29, 20, -15, 16, -15, 16, 22, 12, 22, 12, 35, -14, 35, -14, 27, -18, 27, -18, 8, -14, 8, -14, -20, -17, -20], '#4ee7ff');
    fillPoly(ctx, [-14, -34, 13, -34, 13, -26, 17, -26, 17, -17, 12, -17, 12, 25, 9, 25, 9, 32, -11, 32, -11, 22, -15, 22, -15, 5, -11, 5, -11, -22, -14, -22], '#d755ef');
    fillPoly(ctx, shapes.glitchCore, '#05070d');
    ctx.fillStyle = '#fff3dc';
    ctx.fillRect(-16, -29, 4, 2); ctx.fillRect(13, -32, 5, 2);
    ctx.fillRect(-20, -13, 5, 2); ctx.fillRect(15, -5, 7, 2);
    ctx.fillStyle = '#ff4767';
    ctx.fillRect(-16, 3, 3, 6); ctx.fillRect(10, -16, 3, 5);
    ctx.fillRect(-11, -39, 2, 4); ctx.fillRect(17, 19, 3, 2);
    ctx.fillStyle = '#59f3ff';
    ctx.fillRect(-22, -23, 7, 1); ctx.fillRect(13, 12, 10, 1);
    ctx.fillRect(-17, 31, 8, 2); ctx.fillRect(9, -37, 7, 2);
    ctx.fillStyle = 'rgba(220,245,255,0.55)';
    ctx.fillRect(-21, -1, 4, 3); ctx.fillRect(17, -24, 4, 3); ctx.fillRect(13, 27, 5, 2);
  }

  function chooseStyle(state) {
    let hash = 0x811c9dc5;
    hash = Math.imul(hash ^ (Math.floor(state.sector || 0) | 0), 0x01000193);
    hash = Math.imul(hash ^ (Math.floor(state.x) | 0), 0x01000193);
    hash = Math.imul(hash ^ (Math.floor(state.y) | 0), 0x01000193);
    hash ^= hash >>> 16;
    return ((hash >>> 0) % 6) + 1;
  }

  function nowSeconds() {
    return typeof performance !== 'undefined' ? performance.now() / 1000 : 0;
  }

  function drawLabel(ctx, state) {
    const text = state.status === OPEN ? `GRIETA · ${Math.ceil(Math.max(0, Number(state.remaining) || 0))} s` : 'GRIETA ACTIVADA';
    ctx.font = 'bold 12px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgba(4,8,10,0.92)';
    ctx.strokeText(text, 0, -46);
    ctx.fillStyle = '#f4e7bf';
    ctx.fillText(text, 0, -46);
  }

  function draw(ctx, state, time = nowSeconds(), styleOverride = null) {
    const mode = G.TrialVisuals?.mode;
    if (!ctx || !state || (state.status !== OPEN && state.status !== ACTIVE) ||
        G.TrialVisuals?.enabled !== true || (mode !== '16' && mode !== '32') ||
        !Number.isFinite(state.x) || !Number.isFinite(state.y)) return false;

    const requestedStyle = Number(styleOverride);
    const style = Number.isInteger(requestedStyle) && requestedStyle >= 1 && requestedStyle <= 6
      ? requestedStyle
      : chooseStyle(state);
    const calm = G.Settings?.get?.('calm') === true;
    const safeTime = Number.isFinite(time) ? time : nowSeconds();
    const glow = calm ? 1 : 0.97 + Math.sin(safeTime * 2.2) * 0.03;

    ctx.save();
    try {
      ctx.translate(state.x, state.y);
      ctx.globalAlpha *= glow;
      if (style === 1) scarlet(ctx);
      else if (style === 2) foldedPaper(ctx);
      else if (style === 3) prism(ctx);
      else if (style === 4) organic(ctx);
      else if (style === 5) blackHorizon(ctx);
      else spectral(ctx);
      drawLabel(ctx, state);
    } finally {
      ctx.restore();
    }
    return true;
  }

  G.RiftVisuals = { draw };
})();
