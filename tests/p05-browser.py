"""P05 acceptance against the real local Auth/Firestore/Functions emulators.

Uses disposable demo identities. Never connects to a live Firebase project.
"""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread
from urllib.request import Request, urlopen
import json
import os
import shutil
import time
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUT = Path(os.environ.get('SCP_TEST_ARTIFACTS', str(ROOT / 'tests/artifacts/p05')))
AUTH = 'http://127.0.0.1:9099'
ThreadingHTTPServer.request_queue_size = 128

class Quiet(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass

def rest(path, data=None):
    req = Request(AUTH + path, data=None if data is None else json.dumps(data).encode(),
                  headers={'Content-Type': 'application/json'})
    with urlopen(req, timeout=10) as response:
        return json.load(response)

def oob(email, kind):
    codes = rest('/emulator/v1/projects/demo-scp-survivor/oobCodes')['oobCodes']
    return next(x['oobCode'] for x in reversed(codes) if x['email'] == email and x['requestType'] == kind)

def wait_idle(page):
    wait(page,'G.LocalAccounts.status.ready && !G.LocalAccounts.busy && !G.RunContinuity.busy')

def wait(page, expression, timeout=30):
    # Poll through DevTools evaluation; keep the product CSP intact (no unsafe-eval).
    deadline=time.monotonic()+timeout
    while time.monotonic()<deadline:
        if page.evaluate('() => ('+expression+')'):
            return
        page.wait_for_timeout(75)
    details=page.evaluate('''async()=>{
      const A=G.LocalAccounts,u=A.user;if(!u)return{mode:A.mode,user:null};
      const state={mode:A.mode,uid:u.uid,providers:u.providerData.map(p=>p.providerId)};
      if(A.mode==='local')try{
        const idToken=await u.getIdToken();
        const data=await fetch('http://127.0.0.1:9099/identitytoolkit.googleapis.com/v1/accounts:lookup?key=demo-scp-survivor-local',{
          method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({idToken})}).then(r=>r.json());
        state.serverProviders=data.users?.[0]?.providerUserInfo?.map(p=>p.providerId);
      }catch(_){state.serverLookupFailed=true;}
      return state;
    }''')
    raise AssertionError('Timeout: '+expression+'; '+page.locator('#account-notice').inner_text()+'; '+json.dumps(details))

def main():
    OUT.mkdir(parents=True, exist_ok=True)
    server = ThreadingHTTPServer(('127.0.0.1', 0), partial(Quiet, directory=str(ROOT)))
    Thread(target=server.serve_forever, daemon=True).start()
    origin = f'http://127.0.0.1:{server.server_port}'
    records = []
    try:
        rest('/emulator/v1/projects/demo-scp-survivor/oobCodes')
        with sync_playwright() as pw:
            browser = pw.chromium.launch(executable_path=shutil.which('chromium'), headless=True)
            for entry in os.environ.get('P05_ENTRIES', 'dev.html,index.html').split(','):
                context = browser.new_context(viewport={'width': 1280, 'height': 900})
                errors, remote = [], []
                allowed = (origin + '/', AUTH + '/', 'http://127.0.0.1:5001/')
                context.route('**/*', lambda route: route.continue_() if route.request.url.startswith(allowed)
                              else (remote.append(route.request.url), route.abort()))
                page = context.new_page()
                page.on('pageerror', lambda error: errors.append(str(error)))
                page.goto(origin + '/' + entry + '?cuentas=local', wait_until='networkidle')
                wait(page,'G.LocalAccounts.status.ready')
                assert page.locator('#account-panel').is_visible()
                email = f'p05-{entry[:-5]}-{time.time_ns()}@example.test'
                page.fill('#account-alias', 'Explorador P05')
                page.fill('#account-email', email)
                page.fill('#account-password', 'Local-test-1234')
                page.click('#account-signup')
                wait(page,'G.LocalAccounts.user && G.LocalAccounts.data?.profile')
                wait_idle(page)
                assert page.locator('#btn-technical-start').is_disabled()
                rest('/identitytoolkit.googleapis.com/v1/accounts:update?key=demo-scp-survivor-local',
                     {'oobCode': oob(email, 'VERIFY_EMAIL')})
                page.click('#account-check')
                wait(page,'G.LocalAccounts.user.emailVerified')
                wait_idle(page)
                page.click('#btn-technical-start')
                wait(page,'G.LocalAccounts.data?.activeRun && !G.RunContinuity.blocked')
                initial = page.evaluate('({id:G.LocalAccounts.data.activeRun.id,checkpoint:G.LocalAccounts.data.activeRun.checkpoint})')
                assert initial['checkpoint']['schemaVersion'] == 1

                # Reload recovers the same run, not a new run or a union of old state.
                page.reload(wait_until='networkidle')
                wait(page,'G.LocalAccounts.data?.activeRun')
                recovered = page.evaluate('''async () => {
                  await G.RunContinuity.resume();G.Game.togglePause();
                  return {id:G.LocalAccounts.data.activeRun.id,rank:G.LocalAccounts.data.activeRun.rankEligible,
                    seed:G.Expedition.state.runSeed,weapons:G.FieldCombat.state.weapons.map(w=>w.id)};
                }''')
                assert recovered['id'] == initial['id']
                assert recovered['seed'] == initial['checkpoint']['expedition']['runSeed']
                assert recovered['weapons'] == [w['id'] for w in initial['checkpoint']['combat']['weapons']]
                assert recovered['rank'] is False  # Combat rollback cannot regain ranking.
                page.evaluate('G.Game.togglePause()')

                # Production combat reaches a real preparation checkpoint.
                helper = (ROOT / 'tests/helpers/p03-autoplay.js').read_text()
                prep = page.evaluate(helper, {'stopPrep': True, 'stopSync': True, 'maxSteps': 12000})
                assert prep['status'] in ['preparation','sync'], prep
                assert prep['state']['phase']=='preparation' or (prep['state']['phase']=='levelup' and prep['state']['resumePhase']=='preparation'), prep
                wait(page,'!G.RunContinuity.busy')
                assert page.evaluate('G.LocalAccounts.data.activeRun.checkpoint.expedition.phase') in ['preparation', 'levelup']
                # Controlled serialization fixture; this is not a balance/performance test.
                roundtrip=page.evaluate('''() => {
                  if(G.Game.state==='playing')G.Game.togglePause();
                  const p=G.Game.player,props=G.World.propsInCircle(p.x,p.y,3000).filter(x=>x.type==='fieldCrate');
                  if(props[0])G.World.damageProp(props[0],7);if(props[1])G.World.damageProp(props[1],100);
                  const weapons=G.FieldCombat.getweapons();weapons[0].ammo=3;weapons[0].reload=.4;
                  G.Pickups.drop('heal',p.x+500,p.y,0);
                  const saved=G.RunCheckpoint.capture(),restored=G.RunCheckpoint.restore(saved);
                  if(G.Game.state==='playing')G.Game.togglePause();
                  return{saved,restored,after:G.RunCheckpoint.capture(),crateCount:props.length};
                }''')
                assert roundtrip['crateCount']>=2
                assert roundtrip['restored']['ok'], roundtrip['restored']
                assert roundtrip['saved']==roundtrip['after']
                page.evaluate('G.Game.togglePause()')

                # Commit on server, deliberately lose its response, and retry the same request.
                lost = {'done': False}
                def cut_once(route):
                    data = route.request.post_data_json or {}
                    if not lost['done'] and data.get('data', {}).get('type') == 'saveCheckpoint':
                        response = route.fetch()
                        assert response.status == 200
                        lost['done'] = True
                        route.abort()
                    else:
                        route.continue_()
                page.route('**/accountCommand', cut_once)
                before = page.evaluate('G.LocalAccounts.data.revision')
                page.evaluate('G.RunContinuity.boundary()')
                assert lost['done']
                assert page.evaluate('G.RunContinuity.blocked && G.Game.state === "paused" && !!G.LocalAccounts.pending')
                request_id = page.evaluate('G.LocalAccounts.pending.requestId')
                page.click('#account-sync-retry')
                wait(page,'!G.RunContinuity.blocked && !G.RunContinuity.busy')
                assert page.evaluate('G.LocalAccounts.data.revision') == before + 1
                assert page.evaluate('G.LocalAccounts.pending') is None
                page.unroute('**/accountCommand', cut_once)

                # A second tab claims the only expedition and revokes the old session.
                second = context.new_page()
                second.on('pageerror', lambda error: errors.append(str(error)))
                second.goto(origin + '/' + entry + '?cuentas=local', wait_until='networkidle')
                wait(second,'G.LocalAccounts.data?.activeRun')
                assert second.evaluate('G.LocalAccounts.sessionId') != page.evaluate('G.LocalAccounts.sessionId')
                second.click('#account-resume')
                wait(second,'!G.RunContinuity.busy && G.Game.state === "playing"')
                page.evaluate('G.RunContinuity.checkSession()')
                wait(page,'G.RunContinuity.blocked && G.Game.state === "paused"')
                page.evaluate('G.Game.togglePause()')
                assert page.evaluate('G.Game.state') == 'paused'

                # Death commits one terminal result and removes the active expedition.
                second.evaluate('G.Game.player.hurt(10000)')
                wait(second,'G.LocalAccounts.data.lastResult && !G.LocalAccounts.data.activeRun && !G.RunContinuity.busy')
                assert second.evaluate('G.LocalAccounts.data.lastResult.cause') == 'death'
                second.screenshot(path=str(OUT / f'{entry[:-5]}-result.png'))
                second.click('#btn-result-menu')
                assert second.locator('#account-resume').is_hidden()

                # Recovery uses the real Auth emulator action code and preserves UID.
                uid = second.evaluate('G.LocalAccounts.user.uid')
                second.click('#account-logout')
                wait(second,'!G.LocalAccounts.user')
                second.fill('#account-email', email)
                second.click('#account-reset')
                second.wait_for_timeout(300)
                rest('/identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=demo-scp-survivor-local',
                     {'oobCode': oob(email, 'PASSWORD_RESET'), 'newPassword': 'Local-test-5678'})
                second.fill('#account-password', 'Local-test-5678')
                second.click('#account-login')
                wait(second,'G.LocalAccounts.user && G.LocalAccounts.data?.profile')
                assert second.evaluate('G.LocalAccounts.user.uid') == uid
                # Same email cannot silently merge accounts; explicit linking keeps UID/data.
                second.click('#account-logout');wait(second,'!G.LocalAccounts.user')
                second.fill('#account-email',email);second.fill('#account-alias','Google aislado')
                second.click('#account-google')
                wait(second,'!G.LocalAccounts.user && document.getElementById("account-notice").textContent.includes("contraseña")')
                second.fill('#account-password','Local-test-5678');second.click('#account-login')
                wait(second,'G.LocalAccounts.user && G.LocalAccounts.data?.profile')
                assert second.evaluate('G.LocalAccounts.user.uid')==uid
                second.click('#account-link')
                wait(second,'G.LocalAccounts.user.providerData.some(p=>p.providerId==="google.com")')
                wait_idle(second);assert second.evaluate('G.LocalAccounts.user.uid')==uid
                second.click('#account-logout');wait(second,'!G.LocalAccounts.user')
                second.click('#account-google');wait(second,'G.LocalAccounts.user && G.LocalAccounts.data?.profile')
                assert second.evaluate('G.LocalAccounts.user.uid')==uid
                assert second.evaluate('G.LocalAccounts.data.lastResult.cause')=='death'
                # Reverse linking: a fresh fake Google identity adds its own password.
                second.click('#account-logout');wait(second,'!G.LocalAccounts.user')
                google_email='google-'+email
                second.fill('#account-email',google_email);second.fill('#account-alias','Google P05')
                second.click('#account-google');wait(second,'G.LocalAccounts.user && G.LocalAccounts.data?.profile')
                google_uid=second.evaluate('G.LocalAccounts.user.uid');wait_idle(second)
                second.fill('#account-link-password','Google-local-1234');second.click('#account-link-email')
                wait(second,'G.LocalAccounts.user.providerData.some(p=>p.providerId==="password")');wait_idle(second)
                second.click('#account-logout');wait(second,'!G.LocalAccounts.user')
                second.fill('#account-email',google_email);second.fill('#account-password','Google-local-1234');second.click('#account-login')
                wait(second,'G.LocalAccounts.user && G.LocalAccounts.data?.profile')
                assert second.evaluate('G.LocalAccounts.user.uid')==google_uid
                second.screenshot(path=str(OUT / f'{entry[:-5]}-account.png'))
                assert not errors, errors
                assert not remote, remote
                records.append({'entry': entry, 'result': 'PASS', 'lostResponseRequestId': request_id,
                                'scenarios': ['signup', 'verification-gate', 'reload-rollback', 'checkpoint',
                                              'lost-response-retry', 'two-tab-transfer', 'death', 'password-recovery',
                                              'checkpoint-roundtrip-props-ammo', 'no-email-auto-merge', 'password-to-google-link', 'google-to-password-link'],
                                'remoteAttempts': remote, 'pageErrors': errors})
                context.close()
            browser.close()
        (OUT / 'results.json').write_text(json.dumps({'project': 'demo-scp-survivor', 'records': records,
            'limits': 'Real local emulators only. No real email delivery or real Google OAuth.'}, indent=2) + '\n')
        print(json.dumps({'result': 'PASS', 'entries': len(records), 'scenariosPerEntry': 12}), flush=True)
    finally:
        server.shutdown()
        server.server_close()

if __name__ == '__main__':
    main()

