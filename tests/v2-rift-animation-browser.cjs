// Real Canvas rendering and QA contact/expiry; not physical-phone or balance evidence.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { chromium } = require(process.env.SCP_PLAYWRIGHT_MODULE || 'playwright');
const root = path.resolve(__dirname, '..');
const out = path.join(__dirname, 'artifacts/rift-animation-009');
fs.mkdirSync(out, { recursive: true });
const server = http.createServer((req, res) => {
  const file = path.resolve(root, '.' + new URL(req.url, 'http://localhost').pathname);
  if (!file.startsWith(root + path.sep)) return res.writeHead(404).end();
  const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png' };
  fs.readFile(file, (error, bytes) => {
    if (error) return res.writeHead(404).end();
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
    res.end(bytes);
  });
});

(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const browser = await chromium.launch({ headless: true, ...(process.env.SCP_BROWSER_CHANNEL ? { channel: process.env.SCP_BROWSER_CHANNEL } : {}) });
  const results = [];
  try {
    for (const entry of ['dev.html', 'index.html']) for (const mode of ['16', '32']) {
      const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      await page.goto(`http://127.0.0.1:${server.address().port}/${entry}?prueba=mapa-v2&premios=grieta&graficos=${mode}`, { waitUntil: 'domcontentloaded' });
      await page.locator('#btn-technical-start:visible').click();
      await page.waitForFunction(() => G.DimensionalRifts.state.status === 'open');
      await page.evaluate(() => { G.Game.player.invuln = 1e6; G.Game.togglePause(); });
      const data = await page.evaluate(async () => {
        const canvas = document.createElement('canvas'); canvas.width = 700; canvas.height = 220;
        const x = canvas.getContext('2d');
        const state = G.DimensionalRifts.state;
        const snap = JSON.stringify(state);
        function render(time) {
          x.clearRect(0, 0, 700, 220);
          for (let style = 1; style <= 6; style++) G.RiftVisuals.draw(x, { ...state, x: style * 100, y: 115 }, time, style);
          return canvas.toDataURL();
        }
        const at0 = render(1), at1 = render(1.6);
        const paused0 = render();
        await new Promise(r => setTimeout(r, 200));
        const paused1 = render();
        const rift = G.DimensionalRifts.drawable();
        return { moving: at0 !== at1, paused: paused0 === paused1, unchanged: JSON.stringify(G.DimensionalRifts.state) === snap, depthY: rift.y === state.y + 35 };
      });
      assert.deepEqual(data, { moving: true, paused: true, unchanged: true, depthY: true });
      // Teleport in QA only: verify the animation has not altered contact entry.
      const contact = await page.evaluate(() => {
        const p = G.Game.player, r = G.DimensionalRifts.state;
        p.x = r.x; p.y = r.y; G.Path.update(1, [p]);
        G.Expedition.update(1 / 60);
        return G.DimensionalRifts.state.status;
      });
      assert.equal(contact, 'active');
      await page.evaluate(() => {
        const r = G.DimensionalRifts.state;
        G.Camera.x = r.x; G.Camera.y = r.y;
        G.Game.player.x = r.x + 55; G.Game.player.y = r.y + 50;
        G.Game.togglePause();
      });
      await page.waitForTimeout(120);
      await page.screenshot({ path: path.join(out, `${entry.slice(0, -5)}-${mode}-contact.png`) });
      if (entry === 'dev.html' && mode === '32') {
        // Same production renderer, enlarged only for an inspectable six-style preview.
        const frames = await page.evaluate(() => {
          const c = document.createElement('canvas'); c.width = 960; c.height = 600;
          const x = c.getContext('2d');
          const names = ['Cicatriz carmesí', 'Pliegue amarillo', 'Fractura prismática', 'Fisura orgánica', 'Horizonte negro', 'Interferencia espectral'];
          const frames = [];
          for (let frame = 0; frame < 30; frame++) {
            x.fillStyle = '#121c1b'; x.fillRect(0, 0, c.width, c.height);
            for (let i = 0; i < 6; i++) {
              const left = (i % 3) * 320, top = Math.floor(i / 3) * 300;
              x.fillStyle = '#a39567'; x.fillRect(left + 10, top + 45, 300, 240);
              x.strokeStyle = '#8a805e'; x.lineWidth = 1;
              for (let j = 0; j < 10; j++) { x.beginPath(); x.moveTo(left + 10 + j * 32, top + 45); x.lineTo(left + 10 + j * 32, top + 285); x.stroke(); }
              for (let j = 0; j < 8; j++) { x.beginPath(); x.moveTo(left + 10, top + 45 + j * 32); x.lineTo(left + 310, top + 45 + j * 32); x.stroke(); }
              x.fillStyle = '#f4e7bf'; x.font = '16px monospace'; x.textAlign = 'left'; x.fillText(`${i + 1}. ${names[i]}`, left + 14, top + 28);
              x.save(); x.translate(left + 160, top + 165); x.scale(2, 2);
              G.RiftVisuals.draw(x, { status: 'open', remaining: 45, x: 0, y: 0, sector: 2 }, frame * 0.1, i + 1);
              x.restore();
            }
            frames.push(c.toDataURL().split(',')[1]);
          }
          return frames;
        });
        frames.forEach((frame, i) => fs.writeFileSync(path.join(out, `frame-${String(i).padStart(2, '0')}.png`), Buffer.from(frame, 'base64')));
      }
      assert.deepEqual(errors, []);
      results.push({ entry, mode, mobileViewport: [390, 844], ...data, contact, pageErrors: errors });
      await context.close();
    }
    fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify({ status: 'PASS', date: '2026-10-23', physicalPhoneTested: false, method: 'Controlled QA times/positions; actual local renderer, headless browser.', results }, null, 2));
    console.log(JSON.stringify({ status: 'PASS', scenarios: results.length, out }));
  } finally {
    await browser.close();
    server.close();
  }
})().catch(error => { console.error(error); server.close(); process.exitCode = 1; });
