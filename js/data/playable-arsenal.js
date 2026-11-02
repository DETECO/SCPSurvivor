/* ARM-JUG-001 r1: ensayo de 12 modelos; las cifras nuevas siguen marcadas como prueba. */
G.PlayableArsenal = (() => {
  'use strict';

  const query = new URLSearchParams(typeof window === 'undefined' ? '' : window.location.search);
  const active = () => G.MapTrial?.expanded === true && query.get('armas') !== 'r1' &&
    !['v1', 'clasicos'].includes(query.get('graficos')) && !query.has('cuentas');
  const tiers = Object.freeze({ Normal: '#B8C0CC', Raro: '#60A5FA', 'Épico': '#C084FC', Legendario: '#F4C76B' });

  const rows = [
    ['pistol', 'AF01', 'Pistola de servicio', 'Armas de fuego', 'Normal', 10, .5, 320, 12, 1.5, 'bullet', 400, 4, 1, 0, '#e8cf9b', 'Primer tiro tras recargar: secundario al 40% a los 0,12 s.', 'Valores históricos conservados'],
    ['smg', 'smg', 'Subfusil', 'Armas de fuego', 'Normal', 6, .15, 280, 24, 1.8, 'bullet', 450, 12, 1, 0, '#f1d8a5', 'Cada sexto disparo usa dispersión reducida a la mitad.', 'Valores históricos conservados'],
    ['shotgun', 'shotgun', 'Escopeta', 'Armas de fuego', 'Normal', 6, .9, 180, 6, 2.2, 'pellets', 350, 30, 6, 0, '#e8b582', 'Cada tercer disparo añade un perdigón, conserva el abanico.', 'Valores históricos conservados'],
    ['baton', 'baton', 'Porra de ensayo', 'Armas cuerpo a cuerpo', 'Normal', 18, .7, 64, 0, 0, 'melee', 0, 0, 0, 0, '#d9e4dc', 'Cada cuarto golpe alcanza un blanco adicional.', 'Valores históricos conservados'],
    ['AR01', 'AR01', 'Granada de fragmentación', 'Armas arrojadizas', 'Normal', 28, 1.8, 240, 3, 2.4, 'grenade', 200, 0, 1, 0, '#e9b768', 'Cada tercera granada amplía su radio de 64 a 80.', 'ARM-JUG-001 r1 · valores de prueba'],
    ['CC04', 'CC04', 'Katana de contención', 'Armas cuerpo a cuerpo', 'Raro', 14, .8, 72, 0, 0, 'melee', 0, 0, 0, 0, '#d6e5ef', 'Cada cuarto corte: arco de 180° y hasta cinco blancos.', 'EST-ARM-001 r1'],
    ['IN03', 'IN03', 'Lanzallamas de contención', 'Armas incendiarias', 'Normal', 4, .18, 112, 30, 2.1, 'flame', 0, 0, 0, 0, '#ff9d47', 'Cada sexta emisión alcanza un quinto blanco.', 'ARM-JUG-001 r1 · valores de prueba'],
    ['FR07', 'FR07', 'Rifle Tres Eslabones', 'Francotiradores', 'Épico', 38, 1.35, 520, 5, 2.6, 'bullet', 760, 1, 1, 2, '#d9b7ef', 'Cada tercer tiro atraviesa un blanco adicional.', 'ARM-JUG-001 r1 · valores de prueba'],
    ['PE04', 'PE04', 'Lanzamisiles de contención', 'Armas pesadas', 'Raro', 44, 2.2, 360, 2, 2.8, 'rocket', 280, 0, 1, 0, '#ffc278', 'Cada segundo misil amplía su radio de 80 a 96.', 'ARM-JUG-001 r1 · valores de prueba'],
    ['RU04', 'RU04', 'Ballesta de recuperación', 'Armas rústicas', 'Raro', 24, 1.15, 300, 1, 1.1, 'bolt', 440, 1, 1, 1, '#b6d09c', 'Cada tercer virote recupera la carga al impactar un enemigo.', 'ARM-JUG-001 r1 · valores de prueba'],
    ['TE01', 'TE01', 'Emisor láser', 'Armas tecnológicas', 'Normal', 14, .8, 288, 0, 0, 'beam', 0, 0, 0, 0, '#7ce5ef', 'Cada cuarta emisión alcanza un segundo enemigo alineado.', 'EST-ARM-001 r1'],
    ['AN09', 'AN09', 'Reloj prestado', 'Armas anómalas', 'Legendario', 18, 1.8, 168, 0, 0, 'pulse', 0, 0, 0, 0, '#b79be8', 'Cada tercer pulso alcanza dos blancos adicionales.', 'ARM-JUG-001 r1 · valores de prueba'],
    ['F24', 'F24', 'Hoja fotónica de contención', 'Fusión', 'Raro', 36, .72, 124, 0, 0, 'fusion', 0, 0, 0, 0, '#9fe8f2', 'FINAL: corte 21,6 + proyección 14,4; no vuelve a subir.', 'EST-ARM-001 r1']
  ];

  const targetLimits = Object.freeze({ baton: 3, CC04: 4, IN03: 4, TE01: 1, AN09: 6, AR01: 6, PE04: 6, F24: 4 });
  const profiles = Object.freeze(Object.fromEntries(rows.map(row => {
    const [id, artId, name, category, tier, damage, interval, range, capacity, reloadTime, attack, speed, spread, pellets, pierce, color, extra, tuning] = row;
    const model = Object.freeze({
      id, artId, name, category, tier, damage, interval, range, capacity, reloadTime, attack,
      speed, spread, pellets, pierce, color, extra, tuning,
      family: attack === 'melee' ? 'melee' : 'projectile',
      compatibleMods: Object.freeze([]), trialOnly: true, fusionOnly: id === 'F24',
      singleLevel: true, ammoFree: capacity === 0,
      arc: (id === 'CC04' ? 140 : id === 'IN03' ? 50 : 90) * Math.PI / 180,
      maxTargets: targetLimits[id] || 1,
      radius: id === 'AR01' ? 64 : id === 'PE04' ? 80 : 0
    });
    return [id, model];
  })));

  const ids = () => Object.keys(profiles).filter(id => !profiles[id].fusionOnly);
  const get = id => profiles[id] || Object.values(profiles).find(profile => profile.artId === id) || null;
  const rank = copy => Math.max(1, Math.min(6, Number(copy?.level) || 1));
  const canUpgrade = copy => !!get(copy?.model) && !get(copy.model).fusionOnly && rank(copy) < 6;

  function upgrade(copy) {
    if (!active() || !canUpgrade(copy)) return false;
    copy.level = rank(copy) + 1;
    return true;
  }

  function stats(id, level = 1, global = {}) {
    const definition = get(id);
    if (!definition) return null;
    const rankValue = Math.max(1, Math.min(6, Number(level) || 1));
    const final = definition.fusionOnly;
    const powerBonus = Number(global.powerBonus) || 0;
    const cadenceReduction = Number(global.cadenceReduction) || 0;
    const reloadReduction = Number(global.reloadReduction) || 0;
    const damage = definition.damage * (final ? 1 : rankValue >= 5 ? 1.3 : rankValue >= 2 ? 1.15 : 1) * (1 + powerBonus);
    return {
      ...definition,
      model: definition.id,
      damage,
      interval: definition.interval * (final || rankValue < 3 ? 1 : .9) * (1 - cadenceReduction),
      reloadTime: definition.reloadTime * (1 - reloadReduction),
      range: definition.range * (final || rankValue < 4 ? 1 : 1.15),
      level: rankValue,
      state: final ? 'FINAL' : rankValue === 6 ? 'MAX' : 'LEVEL'
    };
  }

  function summary(id, level = 1) {
    const definition = stats(id, level);
    if (!definition) return '';
    const format = value => Number(value.toFixed(2)).toLocaleString('es-CL');
    const ammo = definition.ammoFree
      ? (definition.attack === 'beam' ? 'emisión 0,12 s; pausa energética' : 'sin munición')
      : `cargador ${definition.capacity} · recarga ${format(definition.reloadTime)} s`;
    const shape = definition.radius
      ? ` · radio ${definition.radius} · hasta ${definition.maxTargets} blancos`
      : definition.attack === 'melee' ? ` · arco ${Math.round(definition.arc * 180 / Math.PI)}° · hasta ${definition.maxTargets} blancos`
        : definition.attack === 'pulse' ? ` · hasta ${definition.maxTargets} blancos · ralentiza 1 s`
          : definition.attack === 'flame' ? ` · cono 50° · hasta ${definition.maxTargets} blancos`
            : definition.pierce ? ` · atraviesa ${definition.pierce + 1} blancos` : '';
    const fusion = definition.fusionOnly ? ' · F24 requiere estación y pose de pareja verificadas' : '';
    return `Daño ${format(definition.damage)}${definition.pellets > 1 ? ' × ' + definition.pellets + ' perdigones' : ''} · intervalo ${format(definition.interval)} s · alcance ${format(definition.range)} · ${ammo}${shape}${fusion}`;
  }

  const label = copy => get(copy?.model)?.fusionOnly ? 'FINAL' : rank(copy) === 6 ? 'MAX' : `Nivel ${rank(copy)}/5`;
  const fusionPractice = () => false;
  const fusionBlocker = () => ({
    ready: false,
    operational: false,
    reason: 'fusion_room_and_pair_pose_unverified',
    blockers: ['sala/estación de fusión no verificada', 'pose de pareja CC04 + TE01 no verificada'],
    description: 'F24 no está obtenible: faltan verificar la sala de fusión y la pose de pareja CC04 + TE01.'
  });

  return Object.freeze({ active, profiles, ids, get, stats, summary, label, rank, canUpgrade, upgrade, tiers, fusionPractice, fusionBlocker, revision: 'ARM-JUG-001 r1' });
})();
