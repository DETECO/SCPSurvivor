/* Existing compact HUD and choice-panel vocabulary; no MEN-005 proposal selected. */
G.RiftUI=(()=>{
 const el=id=>document.getElementById(id);let panel=null,signature='',replacement=null,health=null;
 function init(){
  if(panel)return;panel=document.createElement('section');panel.id='rift-power-choice';panel.className='overlay';panel.hidden=true;panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','true');panel.setAttribute('aria-labelledby','rift-power-title');
  const body=document.createElement('div');body.className='panel';const title=document.createElement('h2');title.id='rift-power-title';title.textContent='Poder anómalo';const hint=document.createElement('p');hint.id='rift-power-hint';const host=document.createElement('div');host.id='rift-power-options';body.append(title,hint,host);panel.append(body);document.body.append(panel);
  health=document.createElement('progress');health.id='rift-boss-health';health.setAttribute('aria-label','Vida de la anomalía');health.hidden=true;el('hud-summary').append(health);
  G.RiftAnomalies.preload();
 }
 function arrow(player,target){const dx=target.x-player.x,dy=target.y-player.y;return['→','↘','↓','↙','←','↖','↑','↗'][(Math.round(Math.atan2(dy,dx)/(Math.PI/4))+8)%8]+' '+Math.ceil(Math.hypot(dx,dy))+' u';}
 function choose(id,replaceId){const r=G.RiftExpedition.chooseReward(id,replaceId);if(r.requiresReplacement)replacement=id;else if(r.accepted)replacement=null;signature='';}
 function button(title,desc,action){const b=document.createElement('button');b.className='upgrade-card';const strong=document.createElement('strong');strong.textContent=title;const small=document.createElement('small');small.textContent=desc;b.append(strong,small);b.onclick=action;return b;}
 function hide(){if(panel)panel.hidden=true;if(health)health.hidden=true;}
 function tick(player,s){
  if(!G.RiftExpedition?.state.enabled)return;init();const r=G.RiftExpedition.state;
  if(s.phase==='finished'){hide();return;}
  if(r.active){
   el('scene-time').textContent='RECINTO · '+G.U.mmss(r.time);el('field-status').textContent=`${r.practice?'PRÁCTICA · ':''}${r.tier} · ${r.name} · Vida ${Math.ceil(player.hp)}/${Math.ceil(player.maxHp)}`;
   health.hidden=false;health.max=r.bossMaxHp;health.value=r.bossHp;
   el('map-locator').hidden=false;el('map-locator').textContent=r.status==='entering'?'Cruzando la grieta…':r.status==='victory'?(r.reward?'Victoria · elige un poder · partida detenida':'Victoria · vuelve por el portal central'):`${r.roomName} · ${Math.ceil(r.bossHp)}/${r.bossMaxHp}`;
   for(const id of ['map-alert','chest-status','btn-terminal','terminal-prompt'])el(id).hidden=true;
   const escape=['warning','open'].includes(r.escape)||r.status==='victory';el('rift-locator').hidden=!escape;
   if(escape)el('rift-locator').textContent=`${r.status==='victory'?'REGRESO':r.escape==='open'?`RETIRADA · ${Math.ceil(r.escapeRemaining)}s`:`RETIRADA EN ${Math.ceil(r.escapeAt-r.time)}s`} · ${arrow(player,r.exit)} · entra caminando`;
   if(r.status==='entering'||r.reward)for(const id of ['btn-field-weapon-0','btn-field-weapon-1','btn-ability','btn-mods'])el(id).disabled=true;
  }else{
   health.hidden=true;const p=r.portal,open=p?.status==='open';el('rift-locator').hidden=!open;
   if(open)el('rift-locator').textContent=`${p.tier} · GRIETA ${arrow(player,p)} · ${Math.ceil(p.remaining)}s · entra caminando`;
  }
  el('rift-alert').hidden=!r.notice;if(r.notice)el('rift-alert').textContent=r.notice;
  const offer=r.reward;panel.hidden=!offer;
  if(offer){
   const key=offer.id+':'+(replacement||'');if(key!==signature){signature=key;const host=el('rift-power-options');host.replaceChildren();
    el('rift-power-hint').textContent=replacement?'Ya llevas tres. Elige cuál reemplazar; el nuevo empieza en rango1.':'Elige una opción compatible. La partida está detenida.';
    if(replacement){for(const p of G.RiftPowers.state.owned)host.append(button('Reemplazar '+p.name,`Rango ${p.rank===6?'MAX':p.rank+'/5'} · se retiran todos sus efectos.`,()=>choose(replacement,p.id)));}
    else for(const c of offer.cards)host.append(button(c.title,c.desc,()=>choose(c.id)));
    if(G.RiftPowers.state.owned.length===3)host.append(button('Conservar mis poderes','Rechaza la oferta y habilita el regreso.',()=>{G.RiftExpedition.rejectReward();replacement=null;signature='';}));
   }
  }else{signature='';replacement=null;}
 }
 return{tick,hide};
})();
