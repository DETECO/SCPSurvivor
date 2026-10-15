/* P05: the game waits at safe boundaries until its authenticated server confirms. */
G.RunContinuity = (() => {
  let ownedRun = null, blocked = false, syncing = false, resumeAfterSync = false;
  let message = '', nextCheck = 0, checking = false;
  const A = () => G.LocalAccounts;
  function notify() { if (G.AccountUI) G.AccountUI.render(); }
  function hold(text) {
    if (!blocked) resumeAfterSync=G.Game.state==='playing';
    blocked=true; message=text;
    if (G.Game.state==='playing') G.Game.togglePause();
    notify();
  }
  function release(text='Guardado confirmado.') {
    blocked=false;message=text;
    const resume=resumeAfterSync;resumeAfterSync=false;
    if (resume && G.Game.state==='paused') G.Game.togglePause();
    notify();
  }
  function owns(run=A().data?.activeRun) { return !!run && run.id===ownedRun && run.sessionId===A().sessionId; }
  function requireAccount() {
    if (!A()?.enabled || !A().user) throw new Error('Inicia sesión para guardar tu expedición.');
    if (!A().user.emailVerified) throw new Error('Verifica tu correo antes de iniciar una expedición.');
    if (!A().data?.profile) throw new Error('Completa tu alias.');
  }
  async function start(options) {
    requireAccount();
    if (syncing) return;
    await A().refresh();
    if (A().data.activeRun) throw new Error('Ya tienes una expedición activa. Reanúdala primero.');
    ownedRun=null;blocked=false;resumeAfterSync=false;syncing=true;
    G.Game.startTechnical(options);hold('Confirmando el inicio…');
    try {
      const checkpoint=G.RunCheckpoint.capture();
      if (!checkpoint) throw new Error('No se pudo preparar el punto de guardado inicial.');
      const data=await A().command('startRun',{checkpoint});
      ownedRun=data.activeRun.id;nextCheck=Date.now()+3000;release();
    } catch(e) { hold(e.message);throw e; }
    finally { syncing=false;notify(); }
  }
  async function resume() {
    requireAccount(); if (syncing) return;
    ownedRun=null;syncing=true;hold('Recuperando tu expedición…');
    try {
      if (A().pending) await A().retry();
      await A().refresh();
      const run=A().data?.activeRun;
      if (!run) throw new Error('No hay una expedición pendiente para reanudar.');
      if (A().rotateSession) A().rotateSession();
      const data=await A().command('claimRun',{},run.id);
      const restored=G.RunCheckpoint.restore(data.activeRun.checkpoint);
      if (!restored?.ok) throw new Error(restored?.error || 'El guardado es incompatible.');
      ownedRun=data.activeRun.id;resumeAfterSync=true;
      if (G.Game.state==='playing') G.Game.togglePause();
      nextCheck=Date.now()+3000;release(data.activeRun.rankEligible?'Expedición recuperada.':'Expedición recuperada; queda fuera de clasificación.');
    } catch(e) { hold(e.message);throw e; }
    finally { syncing=false;notify(); }
  }
  async function boundary() {
    if (!A()?.enabled || !ownedRun || syncing || blocked) return;
    if (!owns()) { hold('La expedición está abierta en otra sesión.');return; }
    const checkpoint=G.RunCheckpoint.capture();
    if (!checkpoint) return;
    syncing=true;hold('Guardando tu expedición…');
    try {
      const data=await A().command('saveCheckpoint',{checkpoint});
      if (!owns(data.activeRun)) throw new Error('La expedición cambió de sesión.');
      release();
    } catch(e) { hold(e.message); }
    finally { syncing=false;notify(); }
  }
  async function finish(result) {
    if (!A()?.enabled || !ownedRun || syncing) return;
    syncing=true;hold('Confirmando el resultado…');
    try { await A().command('finishRun',{result});ownedRun=null;release('Resultado confirmado.'); }
    catch(e) { hold(e.message); }
    finally { syncing=false;notify(); }
  }
  async function checkSession() {
    if (!ownedRun || syncing || checking) return;
    checking=true;
    try {
      await A().refresh();
      if (!owns()) hold('Esta expedición fue tomada por otra sesión. Usa Reanudar para recuperarla.');
    } catch(e) { hold('Sin conexión. La expedición está detenida hasta confirmar el guardado.'); }
    finally { checking=false; }
  }
  function tick() {
    if (!A()?.enabled || !ownedRun || blocked || Date.now()<nextCheck) return;
    nextCheck=Date.now()+3000;checkSession();
  }
  async function retry() {
    if (syncing) return;
    const pendingType=A().pending?.type;
    syncing=true;hold('Reintentando la confirmación…');
    try {
      await A().retry();await A().refresh();
      const run=A().data?.activeRun;
      if (!run) { ownedRun=null;release('Confirmación recuperada.'); }
      else if (run.sessionId===A().sessionId && G.Game.player && (run.id===ownedRun || pendingType==='startRun')) { ownedRun=run.id;release(); }
      else { ownedRun=null;resumeAfterSync=false;hold('Vuelve al menú y elige Reanudar para recuperar el guardado confirmado.'); }
    } catch(e) { hold(e.message);throw e; }
    finally { syncing=false;notify(); }
  }
  function leave() { ownedRun=null;blocked=false;resumeAfterSync=false;G.Game.toUI();notify(); }
  async function saveAndLeave() {
    if(syncing)return;
    if(ownedRun && !blocked)await boundary();
    if(!blocked)leave();
  }
  function signedOut() { if (ownedRun) hold('Inicia sesión para continuar.');ownedRun=null;notify(); }
  window.addEventListener('offline',()=>{if(ownedRun)hold('Sin conexión. Tu expedición está detenida.');});
  return {start,resume,boundary,finish,tick,retry,checkSession,leave,saveAndLeave,signedOut,
    canAdvance:()=>!blocked,canResume:()=>!blocked,
    get blocked(){return blocked;},get busy(){return syncing;},get message(){return message;}};
})();
