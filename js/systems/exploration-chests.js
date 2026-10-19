/* B2: ensayo aislado de cofres de exploración V2 y tickets FICTICIOS en memoria.
 * No incluye cofre de jefe, grietas, bono de 10 minutos ni hitos: contratos abiertos.
 * No escribe cuentas ni inventarios. reset conserva el total local; startRun lo borra.
 */
G.ExplorationChests = (() => {
  const TIMES=[60,120,180,240],OPEN_TIME=3.5,RADIUS=50;
  let chests=[],candidates=[],ticketTotal=0,attempts=0,cap=1,chance=.10,maxTickets=2;
  let cursor=0,rng=()=>0,practice=false,notice='';
  const enabled=()=>!!G.MapTrial?.enabled;
  function random(seed){
    // Independent domain and stream; never consume gameplay's global RNG.
    let n=((seed>>>0)^0x6c8e9cf5)>>>0;
    return()=>{n=(Math.imul(n,1664525)+1013904223)>>>0;return n/4294967296;};
  }
  function roll(){const n=rng();return Number.isFinite(n)?Math.max(0,Math.min(1-Number.EPSILON,n)):1-Number.EPSILON;}
  function startRun(){
    ticketTotal=0;chests=[];candidates=[];attempts=0;cursor=0;practice=false;notice='';
  }
  function spawn(point,isPractice=false){
    if(!point||chests.length>=cap)return;
    chests.push({id:point.id,x:point.x,y:point.y,opened:false,discovered:false,progress:0,
      tickets:1+Math.floor(roll()*maxTickets),practice:isPractice});
    notice=isPractice?'Cofre de práctica · tickets ficticios · acércate para descubrirlo.':
      'Ha aparecido un cofre de exploración · busca en el sector.';
  }
  function reset(geometry,{sector=1,seed=0,startTime=0,forcePreview=false,rng:override}={}){
    chests=[];candidates=[];practice=false;notice='';
    cap=sector>=8?3:sector>=4?2:1;chance=sector>=8?.20:sector>=4?.15:.10;maxTickets=sector>=8?3:2;
    cursor=Number.isFinite(startTime)?Math.max(0,startTime):0;
    attempts=TIMES.filter(t=>t<=cursor).length;
    // Optional override is only a deterministic test seam, never reward authority.
    rng=typeof override==='function'?override:random(seed);
    if(!enabled())return;
    const ids=new Set();
    candidates=(geometry?.chestCandidates||[]).filter(p=>{
      if(!p||ids.has(p.id)||!Number.isFinite(p.x)||!Number.isFinite(p.y))return false;
      ids.add(p.id);return true;
    }).map(p=>({id:`${sector}:${seed>>>0}:${p.id}`,x:p.x,y:p.y}));
    if(forcePreview&&candidates.length){
      const entry=geometry.entry||{x:0,y:0};
      const nearest=candidates.reduce((a,b)=>Math.hypot(a.x-entry.x,a.y-entry.y)<=Math.hypot(b.x-entry.x,b.y-entry.y)?a:b);
      practice=true;spawn(nearest,true);
    }
  }
  function visible(chest){return !!G.Camera?.sees?.(chest.x,chest.y,0);}
  function clearLine(player,chest){
    if(!G.World?.projectileBlock)return false;
    const dx=chest.x-player.x,dy=chest.y-player.y,length=Math.hypot(dx,dy),steps=Math.max(1,Math.ceil(length/4));
    // Include both endpoints and use the authoritative solid query at radius 2.
    for(let i=0;i<=steps;i++)if(G.World.projectileBlock(player.x+dx*i/steps,player.y+dy*i/steps,2))return false;
    return true;
  }
  function tick(dt,mapTime,player){
    if(!enabled()||!Number.isFinite(dt)||dt<=0||!Number.isFinite(mapTime)||!player||player.dead||
      (Number.isFinite(player.hp)&&player.hp<=0)||(G.Game?.state&&G.Game.state!=='playing'))return;
    cursor=Math.max(cursor,mapTime);
    while(attempts<TIMES.length&&TIMES[attempts]<=cursor){
      attempts++;
      // Attempts remain consumed after reaching the cap; opening never frees it.
      if(chests.length>=cap)continue;
      if(roll()>=chance)continue;
      const unused=candidates.filter(p=>!chests.some(c=>c.id===p.id));
      if(unused.length)spawn(unused[Math.floor(roll()*unused.length)]);
    }
    for(const chest of chests){
      if(!chest.discovered&&visible(chest)){
        chest.discovered=true;
        notice=chest.practice?'Cofre de práctica descubierto · mantente cerca 3,5 s.':
          'Cofre descubierto · mantente cerca 3,5 s.';
      }
      if(chest.opened)continue;
      const near=chest.discovered&&Math.hypot(player.x-chest.x,player.y-chest.y)<=RADIUS&&clearLine(player,chest);
      chest.progress=Math.max(0,Math.min(OPEN_TIME,chest.progress+(near?dt:-1.5*dt)));
      if(chest.progress>=OPEN_TIME-1e-9){
        chest.progress=OPEN_TIME;chest.opened=true;ticketTotal+=chest.tickets;
        notice=`${chest.practice?'Práctica · ':''}Cofre abierto · +${chest.tickets} tickets ficticios.`;
      }
    }
  }
  function draw(ctx){
    if(!enabled())return;
    for(const chest of chests){
      if(!chest.discovered||!visible(chest))continue;
      ctx.save();ctx.translate(chest.x,chest.y);
      ctx.fillStyle=chest.opened?'#3b3333':'#e9e6e0';ctx.strokeStyle='#d63642';ctx.lineWidth=2;
      ctx.fillRect(-13,-8,26,18);ctx.strokeRect(-13,-8,26,18);
      ctx.fillStyle='#b62032';ctx.fillRect(-13,-3,26,4);ctx.fillRect(-3,-8,6,18);
      if(chest.opened){ctx.fillStyle='#30282b';ctx.fillRect(-10,-6,20,7);}
      else if(chest.progress>0){
        ctx.fillStyle='#16151c';ctx.fillRect(-20,17,40,5);
        ctx.fillStyle='#f8eeee';ctx.fillRect(-20,17,40*chest.progress/OPEN_TIME,5);
      }
      ctx.restore();
    }
  }
  return{startRun,reset,tick,draw,get state(){return{chests:chests.map(c=>({...c})),ticketTotal,
    spawned:chests.length,attempts,cap,chance,practice,notice};}};
})();
