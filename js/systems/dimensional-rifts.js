/* Prototipo SCP optativo; independiente de G.Rift (sistema heredado). */
G.DimensionalRifts = (() => {
  const location = window.location;
  const query = new URLSearchParams(location.search);
  const local = ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname);
  const accounts = ['local','propias'].includes(query.get('cuentas'));
  const directTest = local && query.get('prueba') === 'grieta' && !accounts;
  const enabled = local && !accounts && !G.MapTrial?.enabled && (directTest || query.get('grietas') === 'local');
  const TTL = 45, ENTRY_RADIUS = 22;
  let seen = new Set(), state;
  function clear() { state = {status:'idle',remaining:0,x:0,y:0,sector:0,alert:'',alertTime:0,result:null}; }
  function reset() { seen = new Set(); clear(); }
  function notify(text) { state.alert = text; state.alertTime = 5; }
  function hash(seed, sector) {
    let n = (seed ^ Math.imul(sector, 0x9e3779b9) ^ 0x72941b3d) >>> 0;
    n = Math.imul(n ^ (n >>> 16), 0x85ebca6b);
    n = Math.imul(n ^ (n >>> 13), 0xc2b2ae35);
    return (n ^ (n >>> 16)) >>> 0;
  }
  function offer({sector, kind, seed, geometry, player, force=false}) {
    if (!enabled || kind !== 'normal' || (!force && sector < 2) || seen.has(sector)) return false;
    seen.add(sector);
    const n = hash(seed, sector);
    if (!force && n / 0x100000000 >= 0.25) return false;
    const points = geometry.spawnPoints.filter(p => {
      const distance = Math.hypot(p.x-player.x,p.y-player.y);
      return distance >= 140 && distance <= 900 && Math.hypot(p.x-geometry.exit.x,p.y-geometry.exit.y) >= 100 &&
        G.World.isFree(p.x,p.y,36) && G.Path.reachable(p.x,p.y,player);
    });
    if (!points.length) return false;
    if (force) points.sort((a,b) => Math.hypot(a.x-player.x,a.y-player.y)-Math.hypot(b.x-player.x,b.y-player.y));
    const point = points[force ? 0 : n % points.length];
    state = {status:'open',remaining:TTL,x:point.x,y:point.y,sector,alert:'',alertTime:0,result:null};
    notify('ALERTA · GRIETA DIMENSIONAL ABIERTA · entrada opcional');
    G.Audio.sfx('riftOpen');
    return true;
  }
  function tick(dt) {
    state.alertTime = Math.max(0,state.alertTime-dt);
    if (!state.alertTime) state.alert = '';
    if (state.status !== 'open') return;
    state.remaining = Math.max(0,state.remaining-dt);
    if (state.remaining < 1e-8) {
      state.remaining = 0; state.status = 'closed';
      notify('La grieta se ha cerrado. Puedes continuar por la salida.');
    }
  }
  function near(player) {
    if (state.status !== 'open' || !player) return false;
    const dx=state.x-player.x, dy=state.y-player.y, distance=Math.hypot(dx,dy);
    if (distance > ENTRY_RADIUS+(player.r||0)) return false;
    for (let t=0;t<distance;t+=8) {
      if (G.World.projectileBlock(player.x+dx*t/(distance||1),player.y+dy*t/(distance||1),2)) return false;
    }
    return true;
  }
  function enter(player) {
    if (!near(player)) return false;
    state.status = 'active'; state.remaining = 0;
    notify('CUSTODIO DIMENSIONAL · apártate de la grieta · puedes huir por la salida');
    return true;
  }
  function complete(result) {
    if (state.status !== 'active' || !['defeated','evaded'].includes(result)) return false;
    state.status = 'resolved'; state.result = result;
    notify(result === 'defeated' ? 'Custodio dimensional vencido · sector despejado' : 'Retirada dimensional · sector despejado');
    return true;
  }
  function draw(ctx) {
    if (!['open','active'].includes(state.status)) return;
    ctx.save(); ctx.fillStyle='#1c080de6'; ctx.strokeStyle='#ff5e66'; ctx.lineWidth=3;
    ctx.beginPath(); ctx.ellipse(state.x,state.y,22,38,0,0,Math.PI*2);ctx.fill();ctx.stroke();
    ctx.strokeStyle='#ffe5e6';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(state.x+5,state.y-27);
    ctx.lineTo(state.x-6,state.y-6);ctx.lineTo(state.x+4,state.y+4);ctx.lineTo(state.x-5,state.y+28);ctx.stroke();
    ctx.fillStyle='#ffe5e6';ctx.font='bold 13px system-ui';ctx.textAlign='center';
    ctx.fillText(state.status==='open' ? `GRIETA · ${Math.ceil(state.remaining)} s` : 'GRIETA ACTIVADA',state.x,state.y-48);ctx.restore();
  }
  reset();
  return {enabled,directTest,reset,clear,offer,tick,near,enter,complete,draw,get state(){return {...state};}};
})();
