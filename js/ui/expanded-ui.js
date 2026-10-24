/* T1B/C functional HUD. Final art and later abilities remain separate work. */
G.ExpandedUI=(()=>{
 const el=id=>document.getElementById(id);
 let terminalSignature='';
 const enabled=()=>G.MapTrial?.expanded===true;
 const revision=()=>G.WeaponRevisionTrial?.active()===true;
 const isMelee=w=>(w.effective?.family||G.FieldCatalog.models[w.model]?.family)==='melee';
 const branchLine=w=>G.InfiniteProgression.branches.map((k,i)=>`${['P','R','M','E'][i]}${w.branches?.[k]===6?'5+':w.branches?.[k]||0}`).join(' · ');
 const progressionLine=w=>revision()?G.WeaponRevisionTrial.levelLabel(w):branchLine(w);
 function init(){
  if(!enabled())return;document.body.dataset.expandedTrial='true';
  const r1=revision();
  el('expanded-test-note').hidden=false;el('visual-style-note').hidden=!G.TrialVisuals?.enabled;el('expanded-practices').hidden=r1;
  const mode=r1?null:G.MapTrial.practice;
  if(mode==='melee'){const select=el('loadout-weapon-0');select.value='baton';select.dispatchEvent(new Event('change'));select.disabled=true;}
  const descriptions={terminal:'PRÁCTICA TERMINAL · Empiezas con dos armas; la primera tiene Potencia2. Busca T en el radar, acércate y abre el terminal. La partida se detiene al elegir.',maximos:'PRÁCTICA MÁXIMOS · Dos armas: la primera tiene sus cuatro ramas y extras completos; la segunda empieza sin ramas. Comprueba las cartas y el reemplazo.',saturacion:'PRÁCTICA SATURACIÓN · Dos armas y mejoras generales máximas; una esfera de XP preparada abre la elección de apoyo táctico. El apoyo dura15s activos y se sustituye.',melee:'PRÁCTICA MELEE · Empiezas con porra y un objetivo vivo cercano. Golpea automáticamente a corta distancia; sin cargador ni recarga.'};
  el('expanded-test-note').textContent=r1?G.WeaponRevisionTrial.message:(descriptions[mode]||'T1B + T1C · Una arma inicial, dos simultáneas, terminal voluntario, radar y ramas visibles. Prueba cuatro modelos, incluida una porra de ensayo. Sin cuentas ni guardado; valores y arte provisionales.');
  G.TrialVisuals.initUI();
  el('infinite-test-note').textContent=r1?'AF01: nivel 1–5 y MAX por copia. Toca una tarjeta para consultar el nivel. CC04, TE01 y fusión siguen pendientes.':'Cuatro ramas por copia, cinco rangos y un extra. Toca una tarjeta de arma para pausar y consultar tu equipo. Poderes de grieta en ensayo; ultimate pendiente.';
  el('technical-intro').textContent=r1?'Prueba AF01 r1 parcial · progresión y combate de pistola.':'T1B + T1C · Combate, reemplazo de armas y orientación.';
  el('btn-technical-start').textContent=r1?'Iniciar prueba AF01 r1':mode?'Iniciar práctica · '+({terminal:'terminal',maximos:'ramas máximas',saturacion:'saturación',melee:'cuerpo a cuerpo'})[mode]:'Iniciar T1B + T1C';
  el('btn-terminal').onclick=()=>{if(G.WeaponTerminal.open())tick(G.Game.player,G.Expedition.state,G.FieldCombat.state);};
  el('btn-terminal-close').onclick=()=>G.WeaponTerminal.close();
  el('btn-terminal-confirm').onclick=()=>{
   G.WeaponTerminal.choose(Number(el('terminal-slot').value),el('terminal-model').value);
   tick(G.Game.player,G.Expedition.state,G.FieldCombat.state);
  };
  for(let i=0;i<2;i++)el(`btn-field-weapon-${i}`).onclick=openBuild;
  el('expanded-build').hidden=false;
  document.querySelector('.hint-keyboard').textContent='WASD / flechas · disparo automático · toca arma para ver mejoras · Espacio habilidad provisional · Esc pausa';
  document.querySelector('.hint-touch').textContent='Arrastra para moverte · toca un arma para consultar mejoras';
 }
 function renderBuild(player,w){
  const host=el('expanded-build-content');host.replaceChildren();
  for(const [i,copy]of w.weapons.entries()){
   const title=document.createElement('strong');title.textContent=`Arma ${i+1} · ${copy.name}`;
   const branches=document.createElement('p');branches.textContent=progressionLine(copy);
   const stats=document.createElement('p');stats.textContent=`Daño ${Number(copy.effective.damage.toFixed(1))} · intervalo ${copy.effective.interval.toFixed(2)}s · alcance ${Math.round(copy.effective.range)}${isMelee(copy)?' · cuerpo a cuerpo, sin munición':` · cargador ${copy.capacity} · recarga ${copy.reloadTime.toFixed(2)}s`}`;
   host.append(title,branches,stats);
  }
  const general=document.createElement('p');general.textContent='Generales: '+G.FieldStats.temporaryKeys.map(k=>`${k} ${player.tempStats[k]===6?'5+extra':player.tempStats[k]||0}`).join(' · ');host.append(general);
  const powers=document.createElement('p');powers.textContent='Poderes '+(G.RiftPowers?.state.owned.length||0)+'/3: '+((G.RiftPowers?.state.owned||[]).map(p=>p.name+' '+(p.rank===6?'MAX':p.rank+'/5')).join(' · ')||'ninguno');host.append(powers);
  const future=document.createElement('p');future.textContent=revision()?'Prueba parcial AF01 · fusión pendiente; no habilita CC04 ni TE01.':'Poderes temporales automáticos de ensayo. Ultimate manual pendiente.';host.append(future);
 }
 function openBuild(){
  if(!enabled()||G.Game.state!=='playing'||!['combat','boss'].includes(G.Expedition.state.phase))return;
  G.Game.togglePause();el('expanded-build').open=true;
 }
 function state(value){
  if(!enabled())return;
  if(value!=='playing'){for(const id of ['radar-wrap','weapon-terminal','btn-terminal','terminal-prompt','tactical-status'])el(id).hidden=true;}
  if(value==='paused'&&G.Game.player)renderBuild(G.Game.player,G.FieldCombat.state);
 }
 function tick(player,s,w){
  if(!enabled()||!player||G.Game.state!=='playing')return;
  const active=['combat','boss'].includes(s.phase),terminal=G.WeaponTerminal.state;
  el('radar-wrap').hidden=!active;
  if(active)G.FieldRadar.draw(el('field-radar').getContext('2d'),player,s);
  el('btn-terminal').hidden=!active||!terminal.near;el('btn-terminal').disabled=!active||!terminal.near;
  el('terminal-prompt').hidden=!active||!terminal.near;
  el('terminal-prompt').textContent='Terminal de armas · abre el panel para reemplazar una copia. Elección pausada.';
  const show=terminal.open&&s.phase==='terminal';el('weapon-terminal').hidden=!show;
  if(show){
   const sig=terminal.slots.map(w=>w.id+':'+w.model).join('|');
   if(sig!==terminalSignature){
    terminalSignature=sig;el('terminal-slot').replaceChildren();el('terminal-model').replaceChildren();
    terminal.slots.forEach((copy,i)=>{const o=document.createElement('option');o.value=String(i);o.textContent=`Arma ${i+1} · ${G.FieldCatalog.models[copy.model].name}`;el('terminal-slot').append(o);});
    for(const model of terminal.models){const o=document.createElement('option');o.value=model;o.textContent=G.FieldCatalog.models[model].name;el('terminal-model').append(o);}
   }
   el('terminal-notice').textContent=terminal.notice;
  }else terminalSignature='';
  for(let i=0;i<2;i++){
   const copy=w.weapons[i],button=el(`btn-field-weapon-${i}`);button.replaceChildren();
    for(const text of [copy?`${i+1} · ${copy.name}`:`${i+1} · Ranura vacía`,copy?(isMelee(copy)?'Cuerpo a cuerpo':copy.reload>0?`Recarga ${copy.reload.toFixed(1)}s`:`${Math.floor(copy.ammo)} / ${copy.capacity}`):'Premio de jefe/élite',copy?progressionLine(copy):'']){
    const line=document.createElement('small');line.textContent=text;button.append(line);
   }
   button.disabled=!active;button.setAttribute('aria-label',copy?`Ver mejoras de arma ${i+1}: ${copy.name}`:'Ver equipo, segunda ranura vacía');
  }
  el('tactical-status').hidden=!active||!player.infiniteTactical;
  if(player.infiniteTactical)el('tactical-status').textContent=`Apoyo ${player.infiniteTactical.type} · ${Math.ceil(player.infiniteTactical.remaining)}s`;
 }
 return{init,state,tick,openBuild};
})();
