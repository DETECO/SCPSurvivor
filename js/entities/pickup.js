/* ============ pickup.js — orbes de experiencia y objetos ============
 * Los orbes se quedan quietos hasta que entras en el radio del imán; entonces
 * aceleran hacia ti. Para que no se acumulen miles, al pasar de MAX se fusionan
 * los más antiguos.
 *
 * Cooperativo: los objetos los crea el anfitrión (cada uno con su id) y los
 * demás reciben una copia. Todos vuelan hacia el jugador más cercano; quien
 * decide quién lo ha cogido es el anfitrión.
 */
G.Pickups = (() => {
  let list = [];
  const MAX = 420;
  let nextId = 1;

  const KIND = {
    xp:    { color: '#7fe0ff', glow: '#2a8fd0', r: 4.5 },
    xpBig: { color: '#ffd95e', glow: '#c08a10', r: 7 },
    heal:  { color: '#5fe08a', glow: '#1f8f4d', r: 6.5 },
    magnet:{ color: '#ff9ed8', glow: '#b03d84', r: 6.5 },
    bomb:  { color: '#ff7b3d', glow: '#b03d10', r: 6.5 },
    coin:  { color: '#ffd23f', glow: '#b8860b', r: 5.5 },
    ticket:   { color: '#ffd23f', glow: '#c08a10', r: 7 },
    ticket10: { color: '#c47bff', glow: '#8a3fd0', r: 8 },
    item:     { color: '#ffd23f', glow: '#c08a10', r: 9 }       // value = id del objeto
  };
  /** Probabilidad de que un Pokémon normal suelte un ticket del gacha. */
  const BOSS_T10 = 1 / 3;               // ticket ×10 de un jefe normal (el legendario, siempre)
  const TICKET_RATE = 1 / 400;          // (antes 1/260; más raros desde 2026-10-10)

  function suspend() { const token={list,nextId}; list=[]; return token; }
  function resume(token) { list=token.list; nextId=token.nextId; }
  function clear() { list = []; }
  function all() { return list; }

  const isXp = kind => kind === 'xp' || kind === 'xpBig';
  function xpAppearance(value) {
    const tier=value<13?0:value<30?1:value<100?2:3;
    return [
      {tier:0,color:'#8cdb80',glow:'#478348',r:4,shape:'fragment'},
      {tier:1,color:'#7fe0ff',glow:'#2a8fd0',r:5.5,shape:'crystal'},
      {tier:2,color:'#c18aff',glow:'#713cb3',r:7.5,shape:'cluster'},
      {tier:3,color:'#ffd373',glow:'#c08a10',r:10,shape:'core'}
    ][tier];
  }
  function push(o) {
    if(isXp(o.kind)&&(!Number.isFinite(o.value)||o.value<=0))return;
    // En cooperativo sólo el anfitrión crea objetos (las copias llegan por la red).
    if (G.Coop.active && !G.Coop.isHost) return;
    o.id = nextId++;
    list.push(o);
    if (G.Coop.isHost) G.Coop.pickupAdded(o);
    if (list.length > MAX) {
      // Fusiona los dos más antiguos de XP para no crecer sin límite.
      const i = list.findIndex(p => p.kind === 'xp' || p.kind === 'xpBig');
      const j=list.findIndex((p,index)=>index!==i&&isXp(p.kind));
      if(i>=0&&j>=0){
        const a=list[i],target=list[j];target.value+=a.value;target.kind=target.value>=30?'xpBig':'xp';list.splice(i,1);
        if(G.Coop.isHost){G.Coop.pickupGone(a.id);G.Coop.pickupAdded(target);}
      }else{
        // Keep a lone XP crystal even among 420 non-XP pickups.
        const index=list.findIndex(p=>!isXp(p.kind)),a=list.splice(index,1)[0];
        if(G.Coop.isHost)G.Coop.pickupGone(a.id);
      }
    }
  }

  /** Copia de un objeto del anfitrión. */
  function addRemote(id, kind, x, y, value) {
    if(isXp(kind)&&(!Number.isFinite(value)||value<=0))return;
    const existing=list.find(p=>p.id===id);
    if(existing){existing.kind=kind;existing.value=value;return;}
    const o = orb(kind, x, y, value);
    o.id = id;
    list.push(o);
  }

  function removeId(id) {
    const i = list.findIndex(p => p.id === id);
    if (i < 0) return null;
    return list.splice(i, 1)[0];
  }

  /** Imán: todo vuela hacia el jugador más cercano. */
  function pullAll() { for (const o of list) o.pulled = true; }

  function dropXp(x, y, value, boss = false, legend = false) {
    if(!Number.isFinite(value)||value<=0)return;
    if (boss) {
      // Los jefes revientan en un montón de orbes grandes + recompensas.
      const count=Math.min(14,Math.ceil(value)),base=Math.floor(value/count),remainder=value-base*count;
      for (let i = 0; i < count; i++) {
        const a = Math.random() * 6.2832, d = G.U.rand(10, 70);
        push(orb('xpBig', x + Math.cos(a) * d, y + Math.sin(a) * d, base+Math.max(0,Math.min(1,remainder-i))));
      }
      push(orb('heal', x + 24, y, 0));
      push(orb('magnet', x - 24, y, 0));
      // Ticket ×10: siempre el legendario de la grieta; un jefe normal, 1 de cada 3 veces.
      if (legend || Math.random() < BOSS_T10) push(orb('ticket10', x, y - 20, 1));
      return;
    }
    push(orb(value >= 20 ? 'xpBig' : 'xp', x, y, value));
    if (Math.random() < TICKET_RATE) push(orb('ticket', x + G.U.rand(-6, 6), y, 1));

    // Drops ocasionales.
    const r = Math.random();
    if (r < 0.012) push(orb('heal', x + G.U.rand(-8, 8), y, 0));
    else if (r < 0.020) push(orb('magnet', x, y, 0));
    else if (r < 0.026) push(orb('bomb', x, y, 0));
  }

  /** Suelta un objeto suelto: 'heal' | 'magnet' | 'bomb' | 'coin'. */
  function drop(kind, x, y, value = 0) {
    push(orb(kind, x, y, value));
  }

  function orb(kind, x, y, value) {
    if(isXp(kind))kind=value>=30?'xpBig':'xp';
    const a = Math.random() * 6.2832;
    return {
      kind, x, y, value,
      vx: Math.cos(a) * G.U.rand(10, 46), vy: Math.sin(a) * G.U.rand(10, 46),
      t: Math.random() * 6.28, pulled: false
    };
  }

  /**
   * @param players  un jugador o la lista de jugadores (los caídos no recogen)
   * @param onCollect(pickup, jugador)
   */
  function update(dt, players, onCollect) {
    if (!Array.isArray(players)) players = [players];
    for (let i = list.length - 1; i >= 0; i--) {
      const p = list[i];
      p.t += dt * 4;

      // El jugador vivo más cercano (en solitario, siempre tú).
      let pl = null, d2 = Infinity;
      for (const o of players) {
        if (o.dead && players.length > 1) continue;
        const dd = G.U.dist2(o.x, o.y, p.x, p.y);
        if (dd < d2) { d2 = dd; pl = o; }
      }
      if (!pl) continue;
      const dx = pl.x - p.x, dy = pl.y - p.y;
      const mag2 = pl.magnet * pl.magnet;

      if (p.pulled || d2 < mag2) {
        p.pulled = true;
        const d = Math.sqrt(d2) || 1;
        const pull = 240 + 1400 / d;
        p.vx = G.U.damp(p.vx, (dx / d) * pull, 7, dt);
        p.vy = G.U.damp(p.vy, (dy / d) * pull, 7, dt);
      } else {
        p.vx *= Math.pow(0.02, dt);
        p.vy *= Math.pow(0.02, dt);
      }

      p.x += p.vx * dt;
      p.y += p.vy * dt;

      if (d2 < 15 * 15) {
        list.splice(i, 1);
        onCollect(p, pl);
      }
    }
  }

  function draw(ctx) {
    for (const p of list) {
      if (!G.Camera.sees(p.x, p.y, 30)) continue;
      const k = isXp(p.kind)?xpAppearance(p.value):KIND[p.kind];
      const bounce = Math.abs(Math.sin(p.t * 0.8)) * 3;
      const r = k.r;
      const y = p.y - 6 - bounce;

      ctx.globalAlpha = 0.28;
      ctx.fillStyle = '#000';
      ctx.beginPath(); ctx.ellipse(p.x, p.y, r * 0.9, r * 0.35, 0, 0, 6.2832); ctx.fill();

      ctx.globalAlpha = 0.3;
      ctx.fillStyle = k.glow;
      ctx.beginPath(); ctx.arc(p.x, y, r * 2, 0, 6.2832); ctx.fill();

      ctx.globalAlpha = 1;
      ctx.fillStyle = k.color;
      if (p.kind === 'xp' || p.kind === 'xpBig') {
        if(k.shape==='cluster'){for(const dx of [-4,4]){ctx.beginPath();ctx.moveTo(p.x+dx,y-r*.75);ctx.lineTo(p.x+dx+3,y);ctx.lineTo(p.x+dx,y+r*.75);ctx.lineTo(p.x+dx-3,y);ctx.closePath();ctx.fill();}}
        ctx.beginPath();
        if(k.shape==='core'){ctx.moveTo(p.x,y-r);ctx.lineTo(p.x+r*.8,y-r*.5);ctx.lineTo(p.x+r*.8,y+r*.5);ctx.lineTo(p.x,y+r);ctx.lineTo(p.x-r*.8,y+r*.5);ctx.lineTo(p.x-r*.8,y-r*.5);ctx.closePath();ctx.fill();}
        if(k.shape==='fragment'){ctx.moveTo(p.x-r*.6,y+r);ctx.lineTo(p.x+r*.6,y+r*.3);ctx.lineTo(p.x,y-r);ctx.closePath();ctx.fill();}
        else if(k.shape!=='core'){ctx.moveTo(p.x,y-r);ctx.lineTo(p.x+r*.78,y);ctx.lineTo(p.x,y+r);ctx.lineTo(p.x-r*.78,y);ctx.closePath();ctx.fill();}
      } else if (p.kind === 'coin') {
        // Moneda que gira: elipse que se estrecha.
        const sx = Math.max(0.25, Math.abs(Math.cos(p.t * 0.9)));
        ctx.beginPath(); ctx.ellipse(p.x, y, r * sx, r, 0, 0, 6.2832); ctx.fill();
        ctx.fillStyle = '#b8860b';
        ctx.beginPath(); ctx.ellipse(p.x, y, r * sx * 0.5, r * 0.5, 0, 0, 6.2832); ctx.fill();
      } else {
        // Baya, imán y bomba: su icono pixel art.
        const ICON = { heal: 'berry', magnet: 'magnet', bomb: 'bomb', ticket: 'ticket', ticket10: 'ticket10' };
        const sz = p.kind === 'ticket10' || p.kind === 'item' ? 24 : 18;
        if (p.kind === 'item') {
          // Objeto: brillo dorado latiendo, para que se vea desde lejos.
          ctx.globalAlpha = 0.35 + Math.sin(p.t * 1.5) * 0.15;
          ctx.fillStyle = '#ffe14d';
          ctx.beginPath(); ctx.arc(p.x, y, 18, 0, 6.2832); ctx.fill();
          ctx.globalAlpha = 1;
        }
        G.Icons.draw(ctx, p.kind === 'item' ? p.value : ICON[p.kind], p.x - sz / 2, y - sz / 2 - 1, sz);
        continue;
      }
      ctx.fillStyle = 'rgba(255,255,255,.8)';
      ctx.beginPath(); ctx.arc(p.x - r * 0.25, y - r * 0.3, r * 0.28, 0, 6.2832); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function exportData(){return JSON.parse(JSON.stringify(list));}
  function restoreData(items){list=JSON.parse(JSON.stringify(items));nextId=Math.max(1,...list.map(p=>p.id+1));}
  return { suspend, resume, clear, all, dropXp, drop, update, draw, addRemote, removeId, pullAll, exportData,restoreData,KIND,xpAppearance, get count() { return list.length; } };
})();
