const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const sourcePath = path.join(root, 'js', 'core', 'audio.js');
const approvedTrack = 'assets/audio/menu/presencia-en-la-oscuridad-loop-60s-v1.wav';

function loadAudio({ rejectFirstPlay = false } = {}) {
  const connections = [];
  const elements = [];
  const contexts = [];
  const timers = [];
  let playAttempts = 0;

  function makeNode(kind) {
    const node = {
      kind,
      connections: [],
      gain: {
        value: 1,
        calls: [],
        setValueAtTime(value, time) { this.value = value; this.calls.push(['set', value, time]); },
        setTargetAtTime(value, time, constant) { this.value = value; this.calls.push(['target', value, time, constant]); },
        linearRampToValueAtTime(value, time) { this.value = value; this.calls.push(['ramp', value, time]); },
        exponentialRampToValueAtTime(value, time) { this.value = value; this.calls.push(['exponential', value, time]); },
        cancelScheduledValues(time) { this.calls.push(['cancel', time]); },
      },
      connect(target) { this.connections.push(target); connections.push([this, target]); return target; },
      disconnect(target) { this.disconnected = true; this.disconnectTarget = target || null; },
    };
    return node;
  }

  class MockAudioContext {
    constructor() {
      this.state = 'suspended';
      this.currentTime = 1;
      this.sampleRate = 44100;
      this.destination = makeNode('destination');
      this.gainCount = 0;
      contexts.push(this);
    }
    createDynamicsCompressor() { const n = makeNode('compressor'); n.threshold = { value: 0 }; n.ratio = { value: 0 }; return n; }
    createGain() {
      const node = makeNode('gain-' + this.gainCount++);
      if (this.gainCount === 2) this.musicBus = node;
      return node;
    }
    createConvolver() { const n = makeNode('convolver'); n.buffer = null; return n; }
    createBuffer(_channels, length) { return { getChannelData: () => new Float32Array(length) }; }
    createMediaElementSource(audio) { const n = makeNode('media-source'); n.audio = audio; return n; }
    resume() { this.state = 'running'; return Promise.resolve(); }
  }
  class MockAudio {
    constructor(src = '') {
      this.src = src;
      this.loop = false;
      this.preload = '';
      this.paused = true;
      this.currentTime = 0;
      this.playCalls = 0;
      this.pauseCalls = 0;
      elements.push(this);
    }
    play() {
      this.playCalls++;
      playAttempts++;
      if (rejectFirstPlay && playAttempts === 1) return Promise.reject(new Error('autoplay bloqueado'));
      this.paused = false;
      return Promise.resolve();
    }
    pause() { this.pauseCalls++; this.paused = true; }
  }

  const localStorage = {
    getItem() { return null; },
    setItem() {},
  };
  const G = {
    U: { clamp(value, min, max) { return Math.max(min, Math.min(max, value)); } },
    MUSIC: {
      forest: { bars: 1, chords: ['C'], bpm: 120, melody: [], parts: [], drums: {} },
    },
  };
  const context = {
    G,
    window: { AudioContext: MockAudioContext, Audio: MockAudio },
    localStorage,
    addEventListener() {},
    setTimeout(fn, delay) { timers.push({ fn, delay }); return timers.length; },
    setInterval() { return 1; },
    performance: { now: () => 1000 },
    Math,
    Float32Array,
  };
  vm.runInNewContext(fs.readFileSync(sourcePath, 'utf8'), context, { filename: sourcePath });
  return { audio: G.Audio, connections, elements, contexts, timers, G };
}

test('la pista aprobada espera el desbloqueo del usuario y entra por el bus musical', () => {
  const { audio, connections, elements, contexts } = loadAudio();
  audio.music('village');

  assert.equal(elements.length, 0, 'no crea ni inicia audio antes del gesto');
  audio.unlock();

  assert.equal(elements.length, 1);
  assert.equal(elements[0].src, approvedTrack);
  assert.equal(elements[0].loop, true);
  assert.equal(elements[0].preload, 'auto');
  assert.equal(elements[0].paused, false);
  assert.equal(audio.track, 'village');
  const mediaSource = connections.find(([from]) => from.kind === 'media-source');
  assert.ok(mediaSource, 'el WAV se conecta mediante Web Audio');
  assert.equal(mediaSource[0].audio, elements[0]);
  assert.equal(mediaSource[1].kind, 'gain-4', 'el WAV pasa por una ganancia propia');
  assert.ok(connections.some(([from, to]) => from === mediaSource[1] && to.kind === 'gain-1'), 'la ganancia del WAV llega al musicBus existente');
  assert.equal(contexts.length, 1);
});

test('mute y volumen siguen actuando sobre el WAV y el bus compartido', () => {
  const { audio, contexts, elements } = loadAudio();
  audio.music('village');
  audio.unlock();
  assert.ok(elements[0], 'la pista de menú existe para aplicar el bus de volumen');

  audio.setVolume('music', 0.3);
  const musicBus = contexts[0].musicBus;
  assert.equal(audio.settings.music, 0.3);
  assert.equal(musicBus.gain.value, 0.21);

  assert.equal(audio.toggleMute(), true);
  assert.equal(musicBus.gain.value, 0);
  assert.equal(audio.toggleMute(), false);
  assert.equal(musicBus.gain.value, 0.21);
});

test('partida, pausa/reanudación y regreso al menú mantienen una sola instancia de cada música', async () => {
  const { audio, elements, connections } = loadAudio();
  audio.music('village');
  audio.unlock();
  const menuAudio = elements[0];
  assert.ok(menuAudio, 'la pista del menú se prepara tras el desbloqueo');
  await Promise.resolve();

  audio.music('forest');
  assert.equal(menuAudio.paused, true, 'la música de menú se detiene al iniciar la partida');
  assert.equal(audio.track, 'forest');

  // La pausa del juego conserva su tema actual; no vuelve a activar el menú.
  audio.unlock();
  assert.equal(audio.track, 'forest');
  assert.equal(menuAudio.playCalls, 1);

  audio.music('village');
  await Promise.resolve();
  assert.equal(audio.track, 'village');
  assert.equal(menuAudio.paused, false);
  assert.equal(menuAudio.playCalls, 2);
  assert.equal(elements.length, 1, 'reutiliza el mismo elemento al volver al menú');
  assert.equal(connections.filter(([from]) => from.kind === 'media-source').length, 1, 'crea una sola fuente de audio');

  audio.music(null);
  assert.equal(menuAudio.paused, true, 'al salir del menú no queda audio reproduciéndose');
  assert.equal(audio.track, null);
});

test('si el navegador rechaza la primera reproducción, el gesto siguiente puede reintentarla', async () => {
  const { audio, elements } = loadAudio({ rejectFirstPlay: true });
  audio.music('village');
  audio.unlock();
  assert.ok(elements[0], 'se creó el elemento de audio para el intento');
  await Promise.resolve();
  await Promise.resolve();

  assert.equal(elements[0].paused, true);
  audio.unlock();
  await Promise.resolve();
  assert.equal(elements[0].paused, false);
  assert.equal(elements[0].playCalls, 2);
});
