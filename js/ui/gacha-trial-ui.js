/* Local-only trial overlay. All balances and results disappear on reload. */
G.GachaTrialUI=(()=>{
 let root,openButton,section='characters',fixture=0,pausedByOpen=false,returnFocus=null;
 const byId=id=>document.getElementById(id),labels={characters:'Personajes',weapons:'Armas',ultimates:'Ultimates'},rarities={normal:'Normal',rare:'Rara',exceptional:'Excepcional'};
 function render(message=''){
  const s=G.GachaTrial.state;
  byId('gacha-trial-wallet').textContent=`Grises: ${s.wallet.gray} · Dorados: ${s.wallet.gold}`;
  byId('gacha-trial-pity').textContent=`${labels[section]} · sin rara/excepcional: ${s.counters[section].rare}/9 · sin excepcional: ${s.counters[section].exceptional}/39`;
  root.querySelectorAll('[data-section]').forEach(b=>{b.setAttribute('aria-pressed',String(b.dataset.section===section));b.disabled=s.busy;});
  root.querySelectorAll('[data-payment]').forEach(b=>{const p=b.dataset.payment;b.disabled=s.busy||(p==='gray'&&s.wallet.gray<1)||(p==='gray5'&&s.wallet.gray<5)||(p==='gold'&&s.wallet.gold<1);});
  byId('gacha-trial-release').hidden=!s.busy;
  byId('gacha-trial-empty').hidden=s.results.length>0||s.busy;
  const list=byId('gacha-trial-results');list.replaceChildren();
  for(const r of s.results){const li=document.createElement('li');li.textContent=`${rarities[r.rarity]} · ${r.item} · ${r.isNew?'nuevo':'duplicado de prueba'}`;list.append(li);}
  byId('gacha-trial-message').textContent=message;
 }
 function open(){
  if(!root||!root.hidden||!G.GachaTrial.enabled)return false;returnFocus=document.activeElement&&!root.contains(document.activeElement)?document.activeElement:openButton;pausedByOpen=G.Game.state==='playing';if(pausedByOpen)G.Game.togglePause();
  root.hidden=false;openButton.hidden=true;render();byId('gacha-trial-close').focus();
 }
 function close(){if(!root||root.hidden)return;G.GachaTrial.release();root.hidden=true;openButton.hidden=false;if(pausedByOpen&&G.Game.state==='paused')G.Game.togglePause();pausedByOpen=false;const target=returnFocus?.isConnected?returnFocus:openButton;returnFocus=null;target.focus();}
 function init(){
  if(!G.GachaTrial?.enabled)return;
  const host=byId('viewport');openButton=document.createElement('button');openButton.id='gacha-trial-open';openButton.type='button';openButton.textContent='GACHA · prueba';openButton.onclick=open;host.append(openButton);
  root=document.createElement('section');root.id='gacha-trial-overlay';root.hidden=true;root.setAttribute('role','dialog');root.setAttribute('aria-modal','true');root.setAttribute('aria-labelledby','gacha-trial-title');
  root.innerHTML='<div class="gacha-trial-panel"><header class="gacha-trial-head"><button id="gacha-trial-close" type="button" aria-label="Volver al juego"><span aria-hidden="true">‹</span><span class="gacha-trial-back-label">Volver</span></button><div class="gacha-trial-brand"><small>ACCESO LOCAL · PRUEBA</small><h2 id="gacha-trial-title">GACHA</h2></div><div class="gacha-trial-wallet-card"><small>Saldo ficticio</small><strong id="gacha-trial-wallet"></strong></div></header><section class="gacha-trial-terms" aria-label="Probabilidades y garantías"><p><strong>Normal 70 %</strong><span>·</span><strong>Rara 25 %</strong><span>·</span><strong>Excepcional 5 %</strong></p><p>Garantía: rara en la 10.ª · excepcional en la 40.ª tirada</p><p id="gacha-trial-pity"></p></section><div class="gacha-trial-cameras" role="group" aria-label="Selecciona una cámara"><button class="gacha-trial-camera gacha-trial-camera-side" data-section="weapons" type="button"><span class="gacha-trial-camera-cap" aria-hidden="true"></span><span class="gacha-trial-camera-glass" aria-hidden="true"></span><span class="gacha-trial-camera-base" aria-hidden="true"></span><span class="gacha-trial-camera-label">Armas</span></button><button class="gacha-trial-camera gacha-trial-camera-main" data-section="characters" type="button"><span class="gacha-trial-camera-cap" aria-hidden="true"></span><span class="gacha-trial-camera-glass" aria-hidden="true"></span><span class="gacha-trial-camera-base" aria-hidden="true"></span><span class="gacha-trial-camera-label">Personajes</span></button><button class="gacha-trial-camera gacha-trial-camera-side" data-section="ultimates" type="button"><span class="gacha-trial-camera-cap" aria-hidden="true"></span><span class="gacha-trial-camera-glass" aria-hidden="true"></span><span class="gacha-trial-camera-base" aria-hidden="true"></span><span class="gacha-trial-camera-label">Ultimates</span></button></div><section class="gacha-trial-results" aria-label="Resultados de prueba"><p id="gacha-trial-message" role="status" aria-live="polite"></p><p id="gacha-trial-empty">Los resultados de prueba aparecerán aquí.</p><ol id="gacha-trial-results" aria-live="polite"></ol></section><div class="gacha-trial-fixtures" aria-label="Saldo ficticio para probar"><span>Solo prueba</span><button data-fixture="gray" type="button">+1 gris</button><button data-fixture="gold" type="button">+1 dorado</button></div><div class="gacha-trial-draws" aria-label="Costos de tirada"><button data-payment="gray" type="button"><strong>1 TIRADA</strong><small>1 ticket gris</small></button><button data-payment="gray5" type="button"><strong>5 TIRADAS</strong><small>5 tickets grises</small></button><button data-payment="gold" type="button"><strong>5 TIRADAS</strong><small>1 ticket dorado</small></button></div><button id="gacha-trial-release" type="button" hidden>Continuar después de resultados</button></div>';
  root.querySelector('#gacha-trial-results').after(root.querySelector('#gacha-trial-release'));
  const art=document.createElement('div');art.className='gacha-trial-art';art.setAttribute('aria-hidden','true');root.prepend(art);
  host.append(root);byId('gacha-trial-close').onclick=close;
  root.querySelectorAll('[data-section]').forEach(b=>{b.type='button';b.onclick=()=>{section=b.dataset.section;render();};});
  root.querySelectorAll('[data-fixture]').forEach(b=>b.onclick=()=>{const type=b.dataset.fixture;G.GachaTrial.credit(`fixture:${++fixture}`,{gray:type==='gray'?1:0,gold:type==='gold'?1:0});render('Saldo ficticio añadido para la prueba.');});
  root.querySelectorAll('[data-payment]').forEach(b=>b.onclick=()=>{const r=G.GachaTrial.pull(section,b.dataset.payment);render(r.ok?'Resultado ficticio: no añade objetos al juego.':'No se pudo realizar la tirada de prueba.');});
  byId('gacha-trial-release').onclick=()=>{G.GachaTrial.release();render();};
 }
 return{init,open,close};
})();
