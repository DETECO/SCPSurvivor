/* Inspector técnico de anclajes ARM-VIS-001/R1; no equipa ni modifica armas. */
(() => {
  'use strict';

  const characters = G.CharacterCatalog;
  const weapons = window.ARMAS_CATALOGO;
  const directions = weapons?.directions || ['E', 'SE', 'S', 'SW', 'W', 'NW', 'N', 'NE'];
  const actorDirection = [2, 1, 0, 7, 6, 5, 4, 3];
  const actorNames = { guardia: 'Guardia', medico: 'Médico' };
  const mountGrid = document.getElementById('mountGrid');
  const footer = document.getElementById('loadStatus');
  const statusTitle = document.getElementById('statusTitle');
  const statusDetail = document.getElementById('statusDetail');
  const modelPicker = document.getElementById('modelPicker');
  const catalogActorPicker = document.getElementById('catalogActorPicker');
  const pairActorPicker = document.getElementById('pairActorPicker');
  const modelSelect = document.getElementById('weaponModel');
  const catalogActor = document.getElementById('catalogActor');
  const pairActor = document.getElementById('pairActor');
  const imageCache = new Map();
  const createdCards = [];

  weapons.selected.forEach(weaponId => {
    const option = document.createElement('option');
    option.value = weaponId;
    option.textContent = `${weaponId} · ${weaponData(16, weaponId).name}`;
    modelSelect.append(option);
  });

  function image(src) {
    if (!imageCache.has(src)) {
      const img = new Image();
      img.src = src;
      imageCache.set(src, img);
      img.onload = renderAll;
      img.onerror = () => {
        footer.textContent = `No se pudo cargar un PNG: ${src}`;
        statusTitle.textContent = 'Recurso no disponible';
      };
    }
    return imageCache.get(src);
  }

  function actorData(size, actorId) {
    return characters.modes[String(size)][actorId];
  }

  function weaponData(size, weaponId) {
    return weapons.modes[String(size)][weaponId];
  }

  function frameData(size, weaponId, dirIndex) {
    return weaponData(size, weaponId).frames[dirIndex];
  }

  function imgForWeapon(size, weaponId, dirIndex) {
    return image(`docs/referencias/armas/armas-prueba-direccionales-v1/${weaponData(size, weaponId).individuals[dirIndex]}`);
  }

  function imgForActor(size, actorId) {
    return image(`assets/personajes-20261022/${actorData(size, actorId).partsPath}`);
  }

  function makeCard(size, actorId, weaponId, dirIndex) {
    const article = document.createElement('article');
    article.className = 'actor-card';
    const canvas = document.createElement('canvas');
    canvas.width = 180;
    canvas.height = 132;
    canvas.setAttribute('aria-label', `${actorNames[actorId]} con ${weaponId}, dirección ${directions[dirIndex]}, ${size} píxeles`);
    const title = document.createElement('h3');
    title.textContent = `${actorNames[actorId]} · ${weaponId} ${weaponData(size, weaponId).name}`;
    const info = document.createElement('p');
    article.append(title, canvas, info);
    createdCards.push({ canvas, info, size, actorId, weaponId, dirIndex });
    return article;
  }

  function makePairCard(size, actorId, dirIndex) {
    const article = document.createElement('article');
    article.className = 'actor-card';
    const canvas = document.createElement('canvas');
    canvas.width = 180;
    canvas.height = 132;
    canvas.setAttribute('aria-label', `${actorNames[actorId]} con CC04 y TE01, dirección ${directions[dirIndex]}, ${size} píxeles`);
    const title = document.createElement('h3');
    title.textContent = `${actorNames[actorId]} · CC04 + TE01`;
    const info = document.createElement('p');
    article.append(title, canvas, info);
    createdCards.push({ canvas, info, size, actorId, dirIndex, layout: 'pair', weaponIds: ['CC04', 'TE01'] });
    return article;
  }

  function buildGrid() {
    createdCards.length = 0;
    mountGrid.replaceChildren();
    const size = Number(document.querySelector('input[name="size"]:checked').value);
    const layout = document.querySelector('input[name="layout"]:checked').value;
    modelPicker.hidden = layout !== 'catalog';
    catalogActorPicker.hidden = layout !== 'catalog';
    pairActorPicker.hidden = layout !== 'pair';
    directions.forEach((direction, dirIndex) => {
      const card = document.createElement('section');
      card.className = 'direction-card';
      const heading = document.createElement('div');
      heading.className = 'direction-head';
      const label = document.createElement('strong');
      label.textContent = direction;
      const degrees = document.createElement('span');
      degrees.textContent = `${weapons.anglesDegrees[dirIndex]}° · ${size} × ${size}`;
      heading.append(label, degrees);
      card.append(heading);

      if (layout === 'catalog') {
        card.append(makeCard(size, catalogActor.value, modelSelect.value, dirIndex));
      } else if (layout === 'individual') {
        const pair = document.createElement('div');
        pair.className = 'actor-pair';
        pair.append(makeCard(size, 'guardia', 'CC04', dirIndex));
        pair.append(makeCard(size, 'medico', 'TE01', dirIndex));
        card.append(pair);
      } else {
        const pair = document.createElement('div');
        pair.className = 'actor-pair actor-single';
        pair.append(makePairCard(size, pairActor.value, dirIndex));
        card.append(pair);
      }
      mountGrid.append(card);
    });
    renderAll();
  }

  function source(ctx, img, box, x, y, w = box.w, h = box.h, rotation = 0) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.drawImage(img, box.x, box.y, box.w, box.h, -w / 2, -h / 2, w, h);
    ctx.restore();
  }

  function body(ctx, img, pose) {
    const n = pose.n;
    source(ctx, img, pose.leg, n / 2, n - 1 - pose.leg.h / 2);
    source(ctx, img, pose.torso, n / 2, pose.top + pose.torso.h / 2);
  }

  function bone(ctx, img, box, start, end, width) {
    source(ctx, img, box, (start.x + end.x) / 2, (start.y + end.y) / 2,
      Math.hypot(end.x - start.x, end.y - start.y), width,
      Math.atan2(end.y - start.y, end.x - start.x));
  }

  function limb(ctx, img, actor, shoulder, hand, side, angle) {
    const dx = hand.x - shoulder.x;
    const dy = hand.y - shoulder.y;
    const distance = Math.hypot(dx, dy) || 1;
    const bend = Math.min(actor.n * 0.1, distance * 0.3);
    const elbow = {
      x: (shoulder.x + hand.x) / 2 - dy / distance * bend * side,
      y: (shoulder.y + hand.y) / 2 + dx / distance * bend * side
    };
    bone(ctx, img, actor.cat.parts[48], shoulder, elbow, Math.max(2, Math.round(actor.n * 0.1)));
    bone(ctx, img, actor.cat.parts[49], elbow, hand, Math.max(2, Math.round(actor.n * 0.08)));
    source(ctx, img, actor.cat.parts[53], hand.x, hand.y,
      Math.max(2, Math.round(actor.n * 0.1)), Math.max(2, Math.round(actor.n * 0.1)), angle);
    return elbow;
  }

  function pose(size, actorId, dirIndex, actorImg) {
    const n = Number(size);
    const cat = actorData(size, actorId);
    const angle = dirIndex * Math.PI / 4;
    const dir = actorDirection[dirIndex];
    const torso = cat.parts[dir];
    const leg = cat.parts[8 + dir];
    const top = n - 1 - leg.h - torso.h + 1;
    const origin = { x: n / 2, y: top + torso.h * 0.7 };
    const shoulderY = top + torso.h * 0.62;
    const normalX = -Math.sin(angle);
    const normalY = Math.cos(angle);
    const shoulders = [
      { x: n / 2 + normalX * n * 0.18, y: shoulderY + normalY * n * 0.08 },
      { x: n / 2 - normalX * n * 0.18, y: shoulderY - normalY * n * 0.08 }
    ];
    const c = Math.cos(angle), s = Math.sin(angle);
    const pivotFor = index => {
      const side = index === 0 ? 1 : -1;
      return {
        x: origin.x + c * n * 0.18 - s * side * n * 0.09,
        y: origin.y + s * n * 0.18 + c * side * n * 0.09
      };
    };
    const handFromPivot = pivot => ({ x: pivot.x - s * n * 0.07, y: pivot.y + c * n * 0.07 });
    return { n, cat, img: actorImg, angle, torso, leg, top, origin, shoulders, pivotFor, handFromPivot };
  }

  function marker(ctx, point, color, label, radius) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = '#10191e';
    ctx.lineWidth = Math.max(0.45, radius * 0.18);
    ctx.beginPath();
    ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(point.x - radius * 1.5, point.y);
    ctx.lineTo(point.x + radius * 1.5, point.y);
    ctx.moveTo(point.x, point.y - radius * 1.5);
    ctx.lineTo(point.x, point.y + radius * 1.5);
    ctx.stroke();
    if (label) {
      ctx.font = `bold ${Math.max(2.6, radius * 1.7)}px system-ui`;
      ctx.fillStyle = color;
      ctx.fillText(label, point.x + radius * 1.2, point.y - radius * 1.1);
    }
    ctx.restore();
  }

  function localSetup(ctx, size) {
    const scale = size === 16 ? 4 : 2;
    ctx.imageSmoothingEnabled = false;
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    const logicalWidth = ctx.canvas.width / scale;
    const logicalHeight = ctx.canvas.height / scale;
    ctx.fillStyle = '#101a1e';
    ctx.fillRect(0, 0, logicalWidth, logicalHeight);
    ctx.strokeStyle = '#203235';
    ctx.lineWidth = 0.18;
    for (let x = 0; x <= logicalWidth; x += 4) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, logicalHeight); ctx.stroke();
    }
    for (let y = 0; y <= logicalHeight; y += 4) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(logicalWidth, y); ctx.stroke();
    }
    return { scale, centerX: logicalWidth / 2, footY: logicalHeight * 0.78 };
  }

  function drawIndividual(ctx, card, frame) {
    const actor = pose(card.size, card.actorId, card.dirIndex, imgForActor(card.size, card.actorId));
    const weaponFrame = frameData(card.size, card.weaponId, card.dirIndex);
    const pivot = actor.pivotFor(0);
    const gripHand = actor.handFromPivot(pivot);
    ctx.save();
    ctx.translate(frame.centerX, frame.footY);
    ctx.translate(-actor.n / 2, -(actor.n - 1));
    body(ctx, actor.img, actor);
    limb(ctx, actor.img, actor, actor.shoulders[0], gripHand, 1, actor.angle);
    const support = weaponFrame.support && {
      x: gripHand.x + weaponFrame.support.x - weaponFrame.grip.x,
      y: gripHand.y + weaponFrame.support.y - weaponFrame.grip.y
    };
    if (support) limb(ctx, actor.img, actor, actor.shoulders[1], support, -1, actor.angle);
    const topLeft = { x: gripHand.x - weaponFrame.grip.x, y: gripHand.y - weaponFrame.grip.y };
    ctx.drawImage(imgForWeapon(card.size, card.weaponId, card.dirIndex), topLeft.x, topLeft.y, actor.n, actor.n);
    marker(ctx, gripHand, '#78e3a0', 'G', Math.max(0.7, actor.n * 0.055));
    if (support) marker(ctx, support, '#f0c86c', 'A', Math.max(0.7, actor.n * 0.055));
    marker(ctx, { x: topLeft.x + weaponFrame.muzzle.x, y: topLeft.y + weaponFrame.muzzle.y }, '#78cfe8', 'S', Math.max(0.7, actor.n * 0.055));
    ctx.restore();
    const reachGrip = Math.hypot(gripHand.x - actor.shoulders[0].x, gripHand.y - actor.shoulders[0].y);
    const reachSupport = support && Math.hypot(support.x - actor.shoulders[1].x, support.y - actor.shoulders[1].y);
    card.info.textContent = support
      ? `G ${reachGrip.toFixed(1)} px desde hombro · A ${reachSupport.toFixed(1)} px desde hombro`
      : `G ${reachGrip.toFixed(1)} px desde hombro · catálogo sin anclaje A`;
  }

  function drawPair(ctx, card, frame) {
    const actor = pose(card.size, card.actorId, card.dirIndex, imgForActor(card.size, card.actorId));
    ctx.save();
    ctx.translate(frame.centerX, frame.footY);
    ctx.translate(-actor.n / 2, -(actor.n - 1));
    body(ctx, actor.img, actor);
    const reaches = [];
    card.weaponIds.forEach((weaponId, index) => {
      const weaponFrame = frameData(card.size, weaponId, card.dirIndex);
      const weaponImg = imgForWeapon(card.size, weaponId, card.dirIndex);
      const hand = actor.handFromPivot(actor.pivotFor(index));
      limb(ctx, actor.img, actor, actor.shoulders[index], hand, index ? -1 : 1, actor.angle);
      const topLeft = { x: hand.x - weaponFrame.grip.x, y: hand.y - weaponFrame.grip.y };
      ctx.drawImage(weaponImg, topLeft.x, topLeft.y, actor.n, actor.n);
      const support = weaponFrame.support && {
        x: hand.x + weaponFrame.support.x - weaponFrame.grip.x,
        y: hand.y + weaponFrame.support.y - weaponFrame.grip.y
      };
      marker(ctx, hand, '#78e3a0', '', Math.max(0.7, actor.n * 0.055));
      if (support) marker(ctx, support, '#f0c86c', '', Math.max(0.7, actor.n * 0.055));
      marker(ctx, { x: topLeft.x + weaponFrame.muzzle.x, y: topLeft.y + weaponFrame.muzzle.y }, '#78cfe8', '', Math.max(0.7, actor.n * 0.055));
      reaches.push(`${weaponId} G ${Math.hypot(hand.x - actor.shoulders[index].x, hand.y - actor.shoulders[index].y).toFixed(1)} px${support ? ' · A sin mano' : ''}`);
    });
    ctx.restore();
    card.info.textContent = `${reaches.join(' · ')} · dos brazos, un G asignado por arma`;
  }

  function renderCard(card) {
    const ctx = card.canvas.getContext('2d');
    const frame = localSetup(ctx, card.size);
    const actorImg = imgForActor(card.size, card.actorId);
    const weaponImg = imgForWeapon(card.size, card.weaponId, card.dirIndex);
    if (!actorImg.complete || !actorImg.naturalWidth || !weaponImg.complete || !weaponImg.naturalWidth) return;
    drawIndividual(ctx, card, frame);
  }

  function renderAll() {
    const currentLayout = document.querySelector('input[name="layout"]:checked').value;
    if (currentLayout === 'pair') {
      createdCards.forEach(card => {
        const ctx = card.canvas.getContext('2d');
        const frame = localSetup(ctx, card.size);
        const actorImg = imgForActor(card.size, card.actorId);
        const ready = card.weaponIds.every(weaponId => {
          const img = imgForWeapon(card.size, weaponId, card.dirIndex);
          return img.complete && img.naturalWidth;
        }) && actorImg.complete && actorImg.naturalWidth;
        if (ready) drawPair(ctx, card, frame);
      });
    } else {
      createdCards.forEach(renderCard);
    }
  }

  document.querySelectorAll('input[name="size"], input[name="layout"]').forEach(input => input.addEventListener('change', buildGrid));
  modelSelect.addEventListener('change', buildGrid);
  catalogActor.addEventListener('change', buildGrid);
  pairActor.addEventListener('change', buildGrid);
  buildGrid();

  const expectedImages = [16, 32].flatMap(size => [
    ...['guardia', 'medico'].map(actorId => `assets/personajes-20261022/${actorData(size, actorId).partsPath}`),
    ...weapons.selected.flatMap(weaponId => weaponData(size, weaponId).individuals.map(path => `docs/referencias/armas/armas-prueba-direccionales-v1/${path}`))
  ]);
  window.WeaponRevisionR1Viewer = Object.freeze({ modelIds: [...weapons.selected], directions: [...directions], expectedImageCount: expectedImages.length });
  Promise.all(expectedImages.map(src => new Promise(resolve => {
    const img = image(src);
    if (img.complete) return resolve(Boolean(img.naturalWidth));
    img.addEventListener('load', () => resolve(true), { once: true });
    img.addEventListener('error', () => resolve(false), { once: true });
  }))).then(results => {
    const loaded = results.filter(Boolean).length;
    footer.textContent = `${loaded}/${expectedImages.length} PNG locales cargados · 10 modelos · 2 actores · 2 resoluciones · 8 direcciones.`;
    statusTitle.textContent = 'Inspección visual técnica';
    statusDetail.textContent = 'Selector exclusivo del visor. G, A y S reflejan los anclajes estimados del catálogo; ninguna vista constituye selección jugable ni valida animaciones.';
    renderAll();
  });
})();
