/* P05 account controls reuse the current menu. Visible only in local account mode. */
G.AccountUI = (() => {
  const el=id=>document.getElementById(id);
  let notice='';
  const escapeMessage=e=>e?.message || 'No se pudo completar la operación.';
  async function action(fn,success='') {
    notice='';render();
    try { await fn();notice=success; }
    catch(e){notice=escapeMessage(e);}
    finally { for(const id of ['account-password','account-link-password'])if(el(id))el(id).value='';render(); }
  }
  function init() {
    if (!G.LocalAccounts.enabled) return;
    const own=G.LocalAccounts.mode==='own';
    const ownActive=!!G.LocalAccounts.status.ownAccountsEnabled;
    const accountTitle=own?'Cuenta Firebase propia':'Cuenta de prueba';
    const accountIntro=own?(ownActive?'La autenticación y el correo usan el proyecto Firebase scp-survivor.':'Modo de cuenta propia seleccionado; la autenticación real está desactivada en este entorno.'):'Los datos de esta prueba se guardan en este computador.';
    const googleLabel=own?'Continuar con Google':'Google de prueba';
    const googleLinkLabel=own?'Vincular Google':'Vincular Google de prueba';
    const section=document.createElement('section');section.id='account-panel';section.className='account-panel';
    section.innerHTML=`<h2>${accountTitle}</h2><p>${accountIntro}</p>
      <div id="account-profile"><label for="account-alias">Alias</label><input id="account-alias" maxlength="24" autocomplete="nickname"><button id="account-save-profile" hidden>Guardar alias</button></div>
      <div id="account-credentials">
      <label for="account-email">Correo</label><input id="account-email" type="email" autocomplete="email">
      <label for="account-password">Contraseña</label><input id="account-password" type="password" minlength="8" autocomplete="current-password">
      <div class="account-actions"><button id="account-login">Entrar</button><button id="account-signup">Crear cuenta</button>
      <button id="account-google">${googleLabel}</button><button id="account-reset">Recuperar contraseña</button></div></div>
      <div id="account-signed-in" hidden><p id="account-identity"></p><div class="account-actions">
      <button id="account-verify">Enviar verificación</button><button id="account-check">Actualizar verificación</button>
      <button id="account-link">${googleLinkLabel}</button><button id="account-logout">Cerrar sesión</button></div>
      <div id="account-add-password" hidden><label for="account-link-password">Contraseña para entrar también con este correo</label>
      <input id="account-link-password" type="password" minlength="8" autocomplete="new-password"><button id="account-link-email">Vincular correo y contraseña</button></div></div>
      <p id="account-state" role="status" aria-live="polite"></p><p id="account-notice" role="alert"></p>
      <button id="account-resume" hidden>Reanudar expedición</button><button id="account-retry" hidden>Reintentar confirmación</button>`;
    el('technical-ready').querySelector('.panel').insertBefore(section,el('btn-technical-start'));
    const overlay=document.createElement('section');overlay.id='account-sync-overlay';overlay.className='overlay';overlay.hidden=true;
    overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-label','Confirmación de guardado');
    overlay.innerHTML='<div class="panel"><h2>Expedición detenida</h2><p id="account-sync-message" role="status" aria-live="polite"></p><button id="account-sync-retry">Reintentar</button><button id="account-sync-menu">Volver al menú</button></div>';
    el('viewport').append(overlay);
    const accountHint=el('technical-account-hint');
    if(accountHint) accountHint.textContent='La expedición se confirma entre oleadas. Puedes cerrar y reanudar desde el último punto guardado.';
    const pausePanel=el('technical-pause').querySelector('.panel');
    const pauseHint=Array.from(pausePanel.querySelectorAll(':scope > p')).find(p=>p.textContent.startsWith('Tu posición se conserva'));
    if(pauseHint){pauseHint.id='account-pause-hint';pauseHint.textContent='La partida se guarda entre oleadas. Si cierras durante el combate, volverás al último punto confirmado y quedarás fuera de clasificación.';}
    const footerCopy=document.querySelector('.footer > p');
    if(footerCopy) footerCopy.textContent=own?'Cuenta Firebase propia · autenticación real según configuración':'Prueba local de cuentas y guardado · sin recompensas persistentes';
    const email=()=>el('account-email').value,pass=()=>el('account-password').value,alias=()=>el('account-alias').value;
    const A=G.LocalAccounts;
    el('account-login').onclick=()=>action(()=>A.signIn(email(),pass()));
    el('account-save-profile').onclick=()=>action(()=>A.command('initializeProfile',{alias:alias().trim()}));
    el('account-signup').onclick=()=>action(()=>A.signUp(email(),pass(),alias()),own?'Cuenta creada. Revisa el correo real para verificarla.':'Cuenta creada. Abre el enlace de verificación del correo de prueba.');
    el('account-google').onclick=()=>action(()=>A.google(alias(),false,email()));
    el('account-link').onclick=()=>action(()=>A.google('',true),'Métodos de acceso vinculados.');
    el('account-link-email').onclick=()=>action(()=>A.linkPassword(el('account-link-password').value),'Correo y contraseña vinculados a la misma cuenta.');
    el('account-reset').onclick=()=>action(()=>A.resetPassword(email()),own?'Solicitud enviada. Abre el enlace del correo real.':'Solicitud enviada. Abre el enlace del correo de prueba.');
    el('account-verify').onclick=()=>action(()=>A.verifyEmail(),own?'Verificación enviada al correo real.':'Verificación enviada al correo de prueba.');
    el('account-check').onclick=()=>action(()=>A.refreshVerification());
    el('account-logout').onclick=()=>action(async()=>{if(G.RunContinuity.busy)return;G.RunContinuity.signedOut();await A.logout();});
    el('account-resume').onclick=()=>action(()=>G.RunContinuity.resume());
    el('account-retry').onclick=el('account-sync-retry').onclick=()=>action(()=>G.RunContinuity.retry());
    el('account-sync-menu').onclick=()=>{if(!G.RunContinuity.busy)G.RunContinuity.leave();};
    const start=()=>action(async()=>{const options=G.FieldLoadout.options();if(!options)return;G.Audio.unlock();await G.RunContinuity.start(options);});
    el('btn-technical-start').onclick=start;el('btn-result-restart').onclick=start;
    el('btn-technical-menu').onclick=()=>action(()=>G.RunContinuity.saveAndLeave());
    el('btn-result-menu').onclick=()=>G.RunContinuity.leave();
    A.subscribe(()=>{if(!A.user)G.RunContinuity.signedOut();render();});
    A.init().catch(e=>{notice=escapeMessage(e);render();});render();
  }
  function render() {
    if (!G.LocalAccounts.enabled || !el('account-panel')) return;
    const A=G.LocalAccounts,C=G.RunContinuity,s=A.status,u=s.user,run=s.data?.activeRun;
    el('account-credentials').hidden=!!u;el('account-signed-in').hidden=!u;
    el('account-identity').textContent=u?`${s.data?.profile?.alias || u.email} · ${u.emailVerified?'Correo verificado':'Correo sin verificar'}`:'';
    el('account-add-password').hidden=!u || !!u.providerData?.some(p=>p.providerId==='password');
    el('account-link').hidden=!!u?.providerData?.some(p=>p.providerId==='google.com');
    el('account-profile').hidden=!!u && !!s.data?.profile;
    el('account-save-profile').hidden=!u || !!s.data?.profile;
    el('account-state').textContent=C.message || (run?`Expedición pendiente · ${run.rankEligible?'clasificable':'fuera de clasificación'}`:u?'No hay una expedición pendiente.':'Entra para guardar y reanudar.');
    el('account-notice').textContent=notice || s.error || '';
    el('account-resume').hidden=!u || !run;el('account-retry').hidden=!u || !A.pending;
    for(const id of ['account-save-profile','account-login','account-signup','account-google','account-reset','account-verify','account-check','account-link','account-link-email','account-logout','account-resume','account-retry'])el(id).disabled=!s.ready||s.busy||C.busy;
    el('btn-technical-start').disabled=!u || !u.emailVerified || !s.data?.profile || !!run || s.busy || C.busy;
    el('account-sync-overlay').hidden=!C.blocked || G.Game.state==='ui';
    el('account-sync-message').textContent=C.message;
    el('account-sync-retry').disabled=C.busy||s.busy;el('account-sync-menu').disabled=C.busy;
  }
  return {init,render};
})();
