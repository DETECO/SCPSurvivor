/* P05 keeps the demo emulator and the explicitly gated own Firebase project separate. */
G.LocalAccounts = (() => {
  const host = window.location.hostname;
  const loopback = ['localhost','127.0.0.1','[::1]'].includes(host);
  const params = new URLSearchParams(window.location.search);
  const ownHostingDomain = ['scp-survivor.web.app','scp-survivor.firebaseapp.com'].includes(host);
  const ownOriginAllowed = loopback || (window.location.protocol === 'https:' && ownHostingDomain);
  const mode = params.get('cuentas') === 'local' && loopback ? 'local' :
    params.get('cuentas') === 'propias' && ownOriginAllowed ? 'own' : 'disabled';
  const enabled = mode !== 'disabled';
  const isLocal = mode === 'local';
  const workerEndpoint = 'https://scp-survivor-accounts.ivan-vivanco-t.workers.dev/accountCommand';
  const workerBackend = mode === 'own' && window.SCPFirebase?.accountsRuntime?.backend === 'worker';
  const ownProjectId = window.SCPFirebase?.accountsRuntime?.projectId || 'scp-survivor';
  const cacheNamespace = mode === 'own' ? `scp:p05:${ownProjectId}` : 'scp:p05';
  const sessionKey = `${cacheNamespace}:session`;
  const confirmedKey = uid => `${cacheNamespace}:confirmed:${uid}`;
  const pendingPrefix = uid => `${cacheNamespace}:pending:${uid}:`;
  const listeners = new Set();
  let sdk, auth, call, ready = false, data = null, error = '', inFlight = false, currentUid = null;
  let sessionId = null, initialization = null;
  const state = () => ({enabled,mode,isLocal,cacheNamespace,ownAccountsEnabled:mode === 'own' ? !!window.SCPFirebase?.accountsRuntime?.ownAccountsEnabled : null,
    ready,user:auth?.currentUser || null,data,error,busy:inFlight,sessionId});
  const notify = () => { for (const fn of listeners) fn(state()); };
  const user = () => auth?.currentUser || null;
  const transportError = (code,message) => Object.assign(new Error(message),{code:`functions/${code}`});
  function validateWorkerState(next) {
    const object = value => value !== null && typeof value === 'object' && !Array.isArray(value);
    const text = value => typeof value === 'string' && value.length > 0;
    const count = value => Number.isSafeInteger(value) && value >= 0;
    const version = value => object(value) && value.schemaVersion === 1 && value.buildVersion === '0.5-local-01';
    let valid = version(next) && count(next.revision) &&
      (next.profile === null || (object(next.profile) && text(next.profile.alias) && next.profile.alias.length >= 3 && next.profile.alias.length <= 24)) &&
      (next.activeRun === null || (object(next.activeRun) && text(next.activeRun.id) && text(next.activeRun.sessionId) &&
        count(next.activeRun.sessionVersion) && next.activeRun.sessionVersion >= 1 && version(next.activeRun.checkpoint) &&
        object(next.activeRun.checkpoint.expedition) && object(next.activeRun.checkpoint.player) &&
        object(next.activeRun.checkpoint.combat) && typeof next.activeRun.rankEligible === 'boolean' &&
        typeof next.activeRun.combatPending === 'boolean' && count(next.activeRun.createdAt) && count(next.activeRun.updatedAt))) &&
      (next.lastResult === null || (object(next.lastResult) && text(next.lastResult.runId) &&
        ['death','extracted'].includes(next.lastResult.cause) && object(next.lastResult.totals) &&
        typeof next.lastResult.rankEligible === 'boolean' && count(next.lastResult.confirmedAt)));
    if (valid && next.lastResult) {
      const totals = next.lastResult.totals;
      valid = ['sector','wave','kills','level','runSeed','wavesCompleted','sectorsCompleted','bossesDefeated','bossesEvaded'].every(key => count(totals[key])) &&
        ['elapsed','hp'].every(key => Number.isFinite(totals[key]) && totals[key] >= 0);
    }
    if (!valid) throw transportError('data-loss','La respuesta del servidor tiene un formato o una versión incompatible. Se conserva la confirmación pendiente.');
    return next;
  }
  async function workerCall(request) {
    const account = user(), uid = account?.uid;
    if (!uid) throw transportError('unauthenticated','Inicia sesión para guardar.');
    const body = JSON.stringify(request), controller = new AbortController();
    let timer;
    const sameAccount = () => {
      if (user()?.uid !== uid) throw transportError('cancelled','La cuenta cambió durante la confirmación.');
    };
    const send = async () => {
      for (let attempt = 0; attempt < 2; attempt++) {
        sameAccount();
        const token = await account.getIdToken(attempt === 1);
        sameAccount();
        if (controller.signal.aborted) throw transportError('deadline-exceeded','La confirmación agotó el tiempo de espera. Puedes reintentar.');
        const response = await window.fetch(workerEndpoint,{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${token}`},
          body,signal:controller.signal,credentials:'omit',redirect:'error'});
        sameAccount();
        if (response.status === 401 && attempt === 0) continue;
        let result;
        try { result = await response.json(); }
        catch (_) { throw transportError('data-loss','El servidor devolvió una respuesta incompleta. Puedes reintentar.'); }
        sameAccount();
        if (!response.ok || result?.error) {
          const statusCodes = {400:'invalid-argument',401:'unauthenticated',403:'permission-denied',404:'not-found',409:'failed-precondition',429:'resource-exhausted'};
          // Transient HTTP failures never discard a persisted command, regardless of the response error code.
          const transient = response.status === 429 || response.status >= 500;
          const rawCode = result?.error?.code;
          const code = transient ? (response.status === 429 ? 'resource-exhausted' : 'unavailable') :
            (typeof rawCode === 'string' ? rawCode.replace(/^functions\//,'') : statusCodes[response.status] || 'unknown');
          throw transportError(code,typeof result?.error?.message === 'string' ? result.error.message : 'No se pudo confirmar. Puedes reintentar.');
        }
        return {data:validateWorkerState(result?.data)};
      }
    };
    const timeout = new Promise((_,reject) => {
      timer = setTimeout(() => { controller.abort(); reject(transportError('deadline-exceeded','La confirmación agotó el tiempo de espera. Puedes reintentar.')); },12000);
    });
    try { return await Promise.race([send(),timeout]); }
    catch (e) {
      if (e.code?.startsWith('functions/')) throw e;
      throw transportError('unavailable',e.message || 'No se pudo conectar. Puedes reintentar.');
    } finally { clearTimeout(timer); }
  }
  function cacheKey(uid = user()?.uid,sid=sessionId) { return `${pendingPrefix(uid)}${sid}`; }
  function pending() {
    if (!user() || !sessionId) return null;
    const prefix=pendingPrefix(user().uid),keys=[cacheKey()];
    for(let i=0;i<window.localStorage.length;i++){
      const key=window.localStorage.key(i);if(key?.startsWith(prefix)&&!keys.includes(key))keys.push(key);
    }
    for(const key of keys){
      const raw=window.localStorage.getItem(key);if(!raw)continue;
      try{const request=JSON.parse(raw);if(request?.requestId&&request.sessionId)return request;}
      catch(_){error='Hay una caché incompleta. Se conserva para revisión; usa el estado confirmado del servidor.';}
    }
    return null;
  }
  function apply(next, uid,authoritative=false) {
    if (uid !== user()?.uid) throw new Error('La cuenta cambió durante la confirmación.');
    if (authoritative || !data || next.revision >= data.revision) {
      data = next;
      window.localStorage.setItem(confirmedKey(uid),JSON.stringify({uid,data:next}));
    }
    error = ''; notify(); return next;
  }
  async function refresh() {
    if (!enabled || !user()) return null;
    const uid = user().uid, result = await call({type:'getState'});
    return apply(result.data,uid,true);
  }
  function acceptUser(value) {
    const uid = value?.uid || null;
    if (uid !== currentUid) {
      data = null; error = ''; currentUid = uid;
      // Cached data is only a preview. start/resume must refresh with the server.
      if (uid) try {
        const cache=JSON.parse(window.localStorage.getItem(confirmedKey(uid)));
        if (cache?.uid===uid && cache.data?.schemaVersion===1 && cache.data.buildVersion==='0.5-local-01') data=cache.data;
      } catch (_) { /* Ignore an incomplete local cache. */ }
    }
    notify();
    if (uid) refresh().catch(e => { error = e.message; notify(); });
  }
  async function init() {
    if (!enabled) return;
    if (mode === 'own') {
      const runtime = window.SCPFirebase?.accountsRuntime;
      const publicConfig = window.SCPFirebase?.publicConfig;
      if (!runtime?.ownAccountsEnabled) {
        error = 'El acceso a Firebase scp-survivor está desactivado para este entorno.';
        notify(); throw new Error(error);
      }
      if (runtime.projectId !== 'scp-survivor' || publicConfig?.projectId !== runtime.projectId || !runtime.region) {
        error = 'La configuración de la cuenta propia no coincide con el proyecto esperado.';
        notify(); throw new Error(error);
      }
      if ((runtime.backend && !['functions','worker'].includes(runtime.backend)) ||
          (workerBackend && runtime.accountEndpoint !== workerEndpoint)) {
        error = 'La configuración del servidor de cuentas no es válida.';
        notify(); throw new Error(error);
      }
    }
    if (initialization) return initialization;
    initialization = (async () => {
      sdk = window.SCPFirebase;
      if (!sdk) throw new Error('Falta el módulo local de cuentas.');
      sessionId = window.sessionStorage.getItem(sessionKey);
      if (!sessionId) { sessionId = window.crypto.randomUUID(); window.sessionStorage.setItem(sessionKey,sessionId); }
      const appConfig = mode === 'own' ? sdk.publicConfig :
        {apiKey:'demo-scp-survivor-local',projectId:'demo-scp-survivor',authDomain:'127.0.0.1'};
      const app = sdk.initializeApp(appConfig,mode === 'own' ? 'scp-own-p05' : 'scp-local-p05');
      const authDependencies = {persistence:sdk.browserLocalPersistence};
      if (mode === 'own') authDependencies.popupRedirectResolver = sdk.browserPopupRedirectResolver;
      auth = sdk.initializeAuth(app,authDependencies);
      if (isLocal) sdk.connectAuthEmulator(auth,'http://127.0.0.1:9099',{disableWarnings:true});
      await sdk.setPersistence(auth,sdk.browserLocalPersistence);
      if (workerBackend) call = workerCall;
      else {
        const functions = sdk.getFunctions(app,mode === 'own' ? window.SCPFirebase.accountsRuntime.region : 'us-central1');
        if (isLocal) sdk.connectFunctionsEmulator(functions,'127.0.0.1',5001);
        call = sdk.httpsCallable(functions,'accountCommand',{timeout:12000});
      }
      ready = true; sdk.onAuthStateChanged(auth,acceptUser); notify();
    })();
    try { await initialization; } catch (e) { error=e.message; initialization=null; notify(); throw e; }
  }
  async function dispatch(request) {
    if (inFlight) throw new Error('Ya hay una confirmación en curso.');
    const uid = user()?.uid;
    if (!uid) throw new Error('Inicia sesión para guardar.');
    inFlight = true; error = ''; notify();
    try {
      const result = await call(request);
      apply(result.data,uid);
      const savedKey=cacheKey(uid,request.sessionId);
      try{if(JSON.parse(window.localStorage.getItem(savedKey))?.requestId===request.requestId)window.localStorage.removeItem(savedKey);}catch(_){/* Keep malformed data for inspection. */}
      return result.data;
    } catch (e) {
      error = e.message || 'No se pudo confirmar. Puedes reintentar.';
      if (['functions/invalid-argument','functions/permission-denied','functions/unauthenticated',
           'functions/failed-precondition','functions/already-exists','functions/not-found'].includes(e.code)) {
        window.localStorage.removeItem(cacheKey(uid,request.sessionId));
      }
      throw e;
    } finally { inFlight=false; notify(); }
  }
  async function command(type,payload = {},runId = data?.activeRun?.id) {
    if (!enabled || !ready || !user()) throw new Error('Inicia sesión para guardar.');
    if (pending()) throw new Error('Hay una confirmación pendiente. Reinténtala antes de otra acción.');
    const request = {type,payload,requestId:window.crypto.randomUUID(),expectedRevision:data?.revision || 0,sessionId};
    if (runId) request.runId=runId;
    // Persist before sending: a lost response must be retried with the same command.
    window.localStorage.setItem(cacheKey(),JSON.stringify(request));
    return dispatch(request);
  }
  async function retry() {
    const request = pending();
    if (!request) return refresh();
    return dispatch(request);
  }
  function password(value) { if (typeof value !== 'string' || value.length < 8) throw new Error('Usa una contraseña de al menos 8 caracteres.'); }
  async function signUp(email,pass,alias) {
    password(pass);
    if (typeof alias!=='string' || alias.trim().length<3 || alias.trim().length>24) throw new Error('Usa un alias de 3 a 24 caracteres.');
    const result = await sdk.createUserWithEmailAndPassword(auth,email.trim(),pass);
    acceptUser(result.user); await refresh();
    await command('initializeProfile',{alias:alias.trim()});
    await sdk.sendEmailVerification(result.user);
    return result.user;
  }
  async function signIn(email,pass) {
    const result = await sdk.signInWithEmailAndPassword(auth,email.trim(),pass);
    acceptUser(result.user); await refresh(); return result.user;
  }
  async function google(alias,link = false,emailValue = '') {
    if (mode === 'own') {
      const existing = link ? user() : null;
      if (link && !existing) throw new Error('Inicia sesión antes de vincular Google.');
      const result = link ? await sdk.linkWithPopup(existing,new sdk.GoogleAuthProvider()) :
        await sdk.signInWithPopup(auth,new sdk.GoogleAuthProvider());
      if (link && result.user?.uid !== existing.uid) throw new Error('La vinculación cambió la cuenta. Inicia sesión de nuevo.');
      await sdk.reload(result.user); await result.user.getIdToken(true);
      acceptUser(result.user); await refresh();
      if (!data?.profile && alias.trim().length >= 3) await command('initializeProfile',{alias:alias.trim()});
      if (!link && !result.user.emailVerified) await sdk.sendEmailVerification(result.user);
      return result.user;
    }
    if (!enabled || auth?.emulatorConfig?.host!=='127.0.0.1' || auth.emulatorConfig.port!==9099)
      throw new Error('Google de prueba solo está disponible con emuladores locales.');
    const email=String(link?user()?.email:emailValue).trim().toLowerCase();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw new Error('Escribe un correo ficticio para Google de prueba.');
    const linkingUid=link?user()?.uid:null;
    const provider=sdk.GoogleAuthProvider.credential(JSON.stringify({sub:`scp-local-google:${email}`,email,email_verified:true,name:alias.trim()||'Google de prueba'}));
    const result = link ? await sdk.linkWithCredential(user(),provider) : await sdk.signInWithCredential(auth,provider);
    // With automatic email merging disabled, the primary email is explicit too.
    if (!result.user.email) try { await sdk.updateEmail(result.user,email); }
    catch(e){
      if(e.code!=='auth/email-already-in-use')throw e;
      // Remove only a new, empty demo identity. Never merge or delete an existing account.
      if(sdk.getAdditionalUserInfo(result)?.isNewUser)await sdk.deleteUser(result.user);
      await sdk.signOut(auth);
      throw new Error('Ese correo ya tiene una cuenta. Entra con su contraseña y usa Vincular Google de prueba.');
    }
    if(link){
      if(user()?.uid!==linkingUid||result.user?.uid!==linkingUid)throw new Error('La cuenta cambió durante la vinculación. Inicia sesión de nuevo.');
      await sdk.reload(user());await user().getIdToken(true);
      if(!user().providerData.some(p=>p.providerId==='google.com'))throw new Error('Google todavía no está confirmado. Actualiza la cuenta antes de continuar.');
    }
    acceptUser(link?user():result.user); await refresh();
    if (!data?.profile) await command('initializeProfile',{alias:alias.trim()});
    if (!link && !result.user.emailVerified) await sdk.sendEmailVerification(result.user);
    return link?user():result.user;
  }
  async function linkPassword(pass) {
    password(pass);
    if (mode === 'own') {
      const existing=user();
      if (!existing?.email) throw new Error('La cuenta no tiene un correo para vincular.');
      const credential=sdk.EmailAuthProvider.credential(existing.email,pass);
      const result=await sdk.linkWithCredential(existing,credential);
      if (result.user?.uid !== existing.uid) throw new Error('La vinculación cambió la cuenta. Inicia sesión de nuevo.');
      await sdk.reload(result.user); await result.user.getIdToken(true);
      acceptUser(result.user); await refresh(); return result.user;
    }
    if (!enabled || auth?.emulatorConfig?.host!=='127.0.0.1' || auth.emulatorConfig.port!==9099)
      throw new Error('La vinculación de prueba solo está disponible con emuladores locales.');
    if (!user()?.email) throw new Error('La cuenta no tiene un correo para vincular.');
    // Auth emulator signUp rejects linking an email already owned by this same UID.
    // Updating its password uses accounts:update and preserves that authenticated UID.
    await sdk.updatePassword(user(),pass);await sdk.reload(user());await user().getIdToken(true);
    acceptUser(user());await refresh();return user();
  }
  async function resetPassword(email) { await sdk.sendPasswordResetEmail(auth,email.trim()); }
  async function verifyEmail() { if (!user()) throw new Error('Inicia sesión.'); await sdk.sendEmailVerification(user()); }
  async function refreshVerification() {
    if (!user()) return;
    await sdk.reload(user()); await user().getIdToken(true); notify(); return refresh();
  }
  async function logout() { await sdk.signOut(auth); data=null; currentUid=null; error=''; notify(); }
  function rotateSession() {
    if (pending()) throw new Error('Resuelve la confirmación pendiente antes de cambiar de sesión.');
    sessionId=window.crypto.randomUUID();window.sessionStorage.setItem(sessionKey,sessionId);notify();
    return sessionId;
  }
  return {enabled,init,refresh,command,retry,signUp,signIn,google,linkPassword,resetPassword,verifyEmail,
    refreshVerification,logout,rotateSession,subscribe(fn){listeners.add(fn);return()=>listeners.delete(fn);},
    mode,isLocal,cacheNamespace,
    get data(){return data;},get user(){return user();},get sessionId(){return sessionId;},
    get pending(){return pending();},get busy(){return inFlight;},get status(){return state();}};
})();
