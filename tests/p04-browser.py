"""P04 local browser checks for role abilities, loadout flow, weapon state, and pauses."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread
import json
import os
import shutil

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
ThreadingHTTPServer.request_queue_size = 128
OUT = Path(os.environ.get('SCP_TEST_ARTIFACTS', str(ROOT / 'tests/artifacts/p04')))


class Quiet(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    server = ThreadingHTTPServer(('127.0.0.1', 0), partial(Quiet, directory=str(ROOT)))
    Thread(target=server.serve_forever, daemon=True).start()
    origin = f'http://127.0.0.1:{server.server_port}'
    records = []
    entries = [x for x in os.environ.get('P04_ENTRIES', 'dev.html,index.html').split(',') if x]
    viewports = os.environ.get('P04_VIEWPORTS', 'desktop,touch').split(',')
    try:
        with sync_playwright() as pw:
            browser = pw.chromium.launch(executable_path=shutil.which('chromium'),
                                         headless=True, args=['--no-sandbox', '--disable-dev-shm-usage'])
            for entry in entries:
                for viewport in viewports:
                    mobile = viewport == 'touch'
                    context = browser.new_context(
                        viewport={'width': 390 if mobile else 1280, 'height': 844 if mobile else 900},
                        is_mobile=mobile, has_touch=mobile)
                    context.add_init_script('let seed=1337;Math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};')
                    page = context.new_page()
                    errors, remote, bad = [], [], []
                    page.on('pageerror', lambda e: errors.append(str(e)))
                    page.on('console', lambda m: errors.append(m.text) if m.type == 'error' else None)
                    page.on('response', lambda r: bad.append([r.status, r.url]) if r.status >= 400 else None)
                    page.route('**/*', lambda route: route.continue_() if route.request.url.startswith(origin + '/') else (remote.append(route.request.url), route.abort()))
                    page.goto(origin + '/' + entry, wait_until='networkidle')
                    assert page.locator('#technical-ready').is_visible(), entry
                    page.screenshot(path=str(OUT / f'{entry[:-5]}-menu-{"touch" if mobile else "desktop"}.png'))

                    # Exercise the real local loadout controls when this entry exposes them.
                    if page.locator('#field-role').count():
                        page.locator('#field-role').select_option('medic')
                        page.locator('#loadout-weapon-0').select_option('pistol')
                        page.locator('#loadout-weapon-1').select_option('pistol')
                        page.screenshot(path=str(OUT / f'{entry[:-5]}-medic-loadout-{"touch" if mobile else "desktop"}.png'))
                        page.click('#btn-technical-start')
                    else:
                        page.evaluate("G.Game.startTechnical({seed:1337,soldierId:'medic',loadout:[G.FieldCatalog.makeWeapon('pistol','p04-a'),G.FieldCatalog.makeWeapon('pistol','p04-b')]})")
                    assert page.evaluate("G.Game.player.soldierId==='medic' && G.FieldCombat.state.weapons.length===2")
                    page.screenshot(path=str(OUT / f'{entry[:-5]}-medic-game-{"touch" if mobile else "desktop"}.png'))

                    # Real keyboard and weapon controls must switch the active copy.
                    assert page.evaluate('G.FieldCombat.state.activeIndex') == 0
                    page.keyboard.press('e')
                    assert page.evaluate('G.FieldCombat.state.activeIndex') == 1
                    page.wait_for_timeout(230)
                    page.locator('#btn-field-weapon-0').click()
                    assert page.evaluate('G.FieldCombat.state.activeIndex') == 0
                    page.wait_for_timeout(230)
                    page.locator('#btn-field-weapon-1').click()
                    assert page.evaluate('G.FieldCombat.state.activeIndex') == 1
                    touch_targets = page.evaluate('''() => [...document.querySelectorAll('#btn-field-weapon-0,#btn-field-weapon-1')].map(b=>{
                      const r=b.getBoundingClientRect();return {width:r.width,height:r.height};
                    })''')
                    assert all(r['width'] >= 48 and r['height'] >= 48 for r in touch_targets), touch_targets
                    if mobile:
                        page.set_viewport_size({'width': 844, 'height': 390})
                        page.wait_for_timeout(100)
                        landscape_targets = page.evaluate('''() => [...document.querySelectorAll('#btn-field-weapon-0,#btn-field-weapon-1')].map(b=>{
                          const r=b.getBoundingClientRect();return {width:r.width,height:r.height};
                        })''')
                        assert all(r['width'] >= 48 and r['height'] >= 48 for r in landscape_targets), landscape_targets
                        page.set_viewport_size({'width': 390, 'height': 844})

                    medic = page.evaluate('''() => {
                      const p=G.Game.player, a=G.FieldAbilities;
                      p.hp=p.maxHp*.5;
                      const healed=a.use(p,'combat'), hp=p.hp, cd=a.state(p).cooldown;
                      a.reset(p);
                      p.hp=p.maxHp;
                      const full=a.use(p,'combat'), fullCd=a.state(p).cooldown;
                      p.hp=p.maxHp*.5;
                      const denied=['exploration','extracting','levelup','paused'].map(phase=>a.use(p,phase));
                      const independent=p.fieldWeapons[0]!==p.fieldWeapons[1] && p.fieldWeapons[0].id!==p.fieldWeapons[1].id;
                      p.fieldWeapons[0].ammo=7; p.fieldWeapons[1].ammo=11;
                      const ammo=[p.fieldWeapons[0].ammo,p.fieldWeapons[1].ammo];
                      return {healed,hp,max:p.maxHp,cd,full,fullCd,denied,independent,models:p.fieldWeapons.map(w=>w.model),ammo};
                    }''')
                    assert medic['healed'] and medic['hp'] == medic['max'] * .8, medic
                    assert medic['cd'] == 30 and not medic['full'] and medic['fullCd'] == 0, medic
                    assert medic['denied'] == [False, False, False, False], medic
                    assert medic['independent'] and medic['models'] == ['pistol', 'pistol'] and medic['ammo'] == [7, 11], medic
                    weapon_checks = page.evaluate('''() => {
                      const p=G.Game.player, fc=G.FieldCombat, C=G.FieldCatalog;
                      fc.reset(p,[C.makeWeapon('pistol','browser-a'),C.makeWeapon('pistol','browser-b')]);
                      const a=p.fieldWeapons[0],b=p.fieldWeapons[1];
                      const phase=G.Expedition.state.phase, locked=!fc.configureMods('browser-a',['extended']);
                      const e=G.EnemyMgr.all().find(x=>!x.dead);
                      if(e){for(const other of G.EnemyMgr.all())if(other!==e){other.x=p.x+2000;other.y=p.y+2000;}
                        e.x=p.x+65;e.y=p.y;e.hp=Math.max(e.hp||100,1000);e.dead=false;}
                      fc.tick(0,p,true);const first=fc.state.shots,ammoAfterFirst=a.ammo;
                      a.reload=.8;const reloadStart=a.reload;fc.switchTo(1);fc.tick(.2,p,true);
                      const blocked=fc.state.shots===first;fc.tick(.3,p,true);const second=fc.state.shots;
                      return {phase,locked,first,second,blocked,ammoAfterFirst,ammoA:a.ammo,ammoB:b.ammo,
                        reloadStart,reloadAfter:a.reload,sharedWait:fc.state.shotWait};
                    }''')
                    assert weapon_checks['locked'] and weapon_checks['phase'] == 'combat', weapon_checks
                    assert weapon_checks['first'] == 1 and weapon_checks['blocked'] and weapon_checks['second'] == 2, weapon_checks
                    assert weapon_checks['ammoAfterFirst'] == 11 and weapon_checks['ammoA'] == 11 and weapon_checks['ammoB'] == 11, weapon_checks
                    assert weapon_checks['reloadAfter'] < weapon_checks['reloadStart'], weapon_checks
                    orientation_walk = page.evaluate('''() => {
                      const p=G.Game.player,axis=G.Input.axis,target=G.FieldCombat.targetFor;
                      G.Input.axis=()=>[1,0];G.FieldCombat.targetFor=()=>({x:p.x,y:p.y-100});p.update(0);
                      const out={bodyAim:p.aim,gunAim:p.weaponAim,bodyDirection:p.anim.dir,expectedBodyDirection:G.Sprites.dirFromAngle(0)};
                      G.Input.axis=axis;G.FieldCombat.targetFor=target;return out;
                    }''')
                    assert orientation_walk['bodyAim'] == 0 and orientation_walk['gunAim'] < -1.5 and orientation_walk['bodyDirection'] == orientation_walk['expectedBodyDirection'], orientation_walk

                    # Trigger guard sprint and check that pausing the game freezes its timers.
                    page.evaluate("G.Game.startTechnical({seed:1337,soldierId:'guard'})")
                    sprint = page.evaluate("() => {const p=G.Game.player;G.FieldAbilities.reset(p);return G.FieldAbilities.sprint(p)&&G.FieldAbilities.state(p)}")
                    assert sprint['remaining'] == 2 and sprint['cooldown'] == 20, sprint
                    page.click('#btn-technical-pause')
                    frozen = page.evaluate('''() => ({ability:G.FieldAbilities.state(G.Game.player),combat:G.FieldCombat.state,elapsed:G.Expedition.state.elapsed})''')
                    page.wait_for_timeout(200)
                    after = page.evaluate('''() => ({ability:G.FieldAbilities.state(G.Game.player),combat:G.FieldCombat.state,elapsed:G.Expedition.state.elapsed})''')
                    assert after == frozen, {'before': frozen, 'after': after}
                    page.click('#btn-technical-resume')

                    # The level helper drives ordinary combat to a real timed preparation phase.
                    helper = (ROOT / 'tests/helpers/p03-autoplay.js').read_text()
                    page.evaluate('G.Game.startTechnical({seed:1337})')
                    prep = page.evaluate(helper, {'stopPrep': True, 'maxSteps': 90000})
                    assert prep['status'] == 'preparation', prep
                    page.screenshot(path=str(OUT / f'{entry[:-5]}-preparation-{"touch" if mobile else "desktop"}.png'))
                    if page.locator('#btn-mods').count():
                        page.click('#btn-mods')
                        assert page.locator('#field-mod-editor').is_visible()
                        page.screenshot(path=str(OUT / f'{entry[:-5]}-mod-editor-{"touch" if mobile else "desktop"}.png'))
                        before = page.evaluate('G.Expedition.state.prep')
                        # Isolate mod configuration from an autoplay reload still in progress.
                        page.evaluate('G.Game.player.fieldWeapons[0].ammo=7;G.Game.player.fieldWeapons[0].reload=0')
                        page.locator('#field-mod-content input[value="extended"]').first.check()
                        page.wait_for_timeout(250)
                        assert page.evaluate('G.Expedition.state.prep') < before
                        page.click('#btn-field-mod-confirm')
                        configured = page.evaluate('''() => {const w=G.FieldCombat.state.weapons[0];return {mods:w.mods,ammo:w.ammo,capacity:w.capacity}}''')
                        assert 'extended' in configured['mods'] and configured['ammo'] == 7 and configured['capacity'] == 18, configured
                        page.click('#btn-mods')
                        page.locator('#field-mod-content input[value="reinforced"]').first.check()
                        pending_mods = page.evaluate('G.FieldCombat.state.weapons.map(w=>w.mods.slice())')
                        editor_draft = page.evaluate('''() => [...document.querySelectorAll('#field-mod-content fieldset')].map(g=>
                          [...g.querySelectorAll('input:checked')].map(input=>input.value))''')
                        page.evaluate('document.activeElement.blur()')
                        page.keyboard.press('Space')
                        page.wait_for_timeout(100)
                        blocked_ability = page.evaluate('G.FieldAbilities.state(G.Game.player)')
                        assert blocked_ability['remaining'] == 0 and blocked_ability['cooldown'] == 0, blocked_ability
                        prep_left = page.evaluate('G.Expedition.state.prep')
                        page.evaluate('G.Expedition.update(G.Expedition.state.prep + .01)')
                        page.wait_for_timeout(100)
                        editor_expired = page.locator('#field-mod-editor').is_hidden()
                        after_expiry_mods = page.evaluate('G.FieldCombat.state.weapons.map(w=>w.mods.slice())')
                        assert editor_expired and after_expiry_mods == pending_mods and after_expiry_mods[0] == configured['mods'] and 'reinforced' in editor_draft[0], {
                            'expired': editor_expired, 'draft': editor_draft, 'coreBefore': pending_mods, 'after': after_expiry_mods, 'prepBefore': prep_left}

                    # Copy-targeted weapon cards alter only the selected physical instance.
                    upgrade = page.evaluate('''() => {
                      const p=G.Game.player, copies=p.fieldWeapons, before=copies.map(w=>w.level||1);
                      const card=G.FieldUpgrades.candidates(p).find(c=>c.key==='weapon:'+copies[0].id);
                      if (!card) return {before,after:before,card:false};
                      card.apply(p);
                      return {before,after:copies.map(w=>w.level||1),card:true};
                    }''')
                    assert upgrade['card'] and upgrade['after'][0] == upgrade['before'][0] + 1 and upgrade['after'][1] == upgrade['before'][1], upgrade

                    # Advance a complete sector through the supported phase flow, then finish and inspect cleanup.
                    sector_evidence = finish_evidence = layer_evidence = None
                    if entry == 'dev.html' and not mobile:
                        page.evaluate('G.Game.startTechnical({seed:1337})')
                        sector_clear = page.evaluate(helper, {'stopExploration': True, 'maxSteps': 90000})
                        assert sector_clear['status'] == 'exploration', sector_clear
                        preserved = page.evaluate('''() => {
                          const p=G.Game.player,s=G.Expedition.state;
                          G.FieldAbilities.reset(p);G.FieldAbilities.sprint(p);
                          p.fieldWeapons[0].ammo=5;p.fieldWeapons[1].ammo=9;
                          const before={sector:s.sector,ability:G.FieldAbilities.state(p),ammo:p.fieldWeapons.map(w=>w.ammo),ids:p.fieldWeapons.map(w=>w.id)};
                          p.x=s.exit.x;p.y=s.exit.y;const advanced=G.Expedition.useExit('continue');
                          return {before,advanced,after:{sector:G.Expedition.state.sector,ability:G.FieldAbilities.state(p),ammo:p.fieldWeapons.map(w=>w.ammo),ids:p.fieldWeapons.map(w=>w.id)}};
                        }''')
                        assert preserved['advanced'] and preserved['after']['sector'] == preserved['before']['sector'] + 1, preserved
                        assert preserved['after']['ability'] == preserved['before']['ability'], preserved
                        assert preserved['after']['ammo'] == preserved['before']['ammo'] and preserved['after']['ids'] == preserved['before']['ids'], preserved
                        sector_evidence = preserved
                        cleanup = page.evaluate('''() => {
                          const p=G.Game.player;p.tempStats.power=1;p.fieldWeapons[0].level=4;
                          const snapshot={tempPower:p.tempStats.power,copyLevel:p.fieldWeapons[0].level};
                          G.Expedition.finish('abandoned');
                          return {snapshot,phase:G.Expedition.state.phase,tempStats:{...p.tempStats},levels:p.fieldWeapons.map(w=>w.level),cooldown:G.FieldAbilities.state(p).cooldown};
                        }''')
                        assert cleanup['snapshot'] == {'tempPower': 1, 'copyLevel': 4}, cleanup
                        assert cleanup['phase'] == 'finished' and not cleanup['tempStats'] and cleanup['levels'] == [1, 1] and cleanup['cooldown'] == 0, cleanup
                        finish_evidence = cleanup

                        orientation = page.evaluate('''() => {
                          const p=G.Game.player,fc=G.FieldCombat,dir=p.anim.dir;
                          p.weaponAim=Math.PI/2;
                          const calls=[];const ctx={save(){},restore(){},translate(...x){calls.push(['translate',...x]);},rotate(x){calls.push(['rotate',x]);},fillRect(...x){calls.push(['rect',...x]);},beginPath(){},arc(){},fill(){}};
                          fc.drawWeapon(ctx,p,{behind:true});const behind=calls.length;
                          fc.drawWeapon(ctx,p,{behind:false});
                          return {bodyBefore:dir,bodyAfter:p.anim.dir,behind,foreground:calls.length,aim:p.weaponAim};
                        }''')
                        assert orientation['bodyAfter'] == orientation['bodyBefore'] and orientation['behind'] == 0 and orientation['foreground'] > 0, orientation
                        layer_evidence = orientation
                    records.append({'entry': entry, 'touchEmulated': mobile, 'medic': medic,
                                    'weaponControls': {'touchTargets': touch_targets, 'landscapeTargets': landscape_targets if mobile else None},
                                    'weaponChecks': weapon_checks, 'orientationWalk': orientation_walk,
                                    'sectorPersistence': sector_evidence, 'finishCleanup': finish_evidence,
                                    'weaponBodyLayers': layer_evidence,
                                    'upgrade': upgrade, 'editorExpiry': {'expired': editor_expired, 'draftMods': editor_draft, 'pendingMods': pending_mods,
                                        'afterExpiryMods': after_expiry_mods} if page.locator('#btn-mods').count() else None,
                                    'sprint': sprint, 'preparation': prep['status'], 'status': 'PASS',
                                    'errors': errors, 'remoteAttempts': remote, 'httpFailures': bad})
                    assert not errors, errors
                    assert not remote, remote
                    assert not bad, bad
                    assert page.evaluate('G.FIREBASE_CONFIG===null && !G.ENABLE_CLOUD && !G.ENABLE_MULTIPLAYER && !G.ENABLE_SOCIAL')
                    context.close()
            browser.close()
        (OUT / 'results.json').write_text(json.dumps({'version': 'P04 local browser', 'records': records,
            'method': 'Playwright against local HTTP only; actual game pages and fixed seeded combat. No physical Safari validation.'}, indent=2) + '\n')
        print(json.dumps({'scenarios': len(records), 'result': 'PASS'}), flush=True)
    finally:
        server.shutdown()
        server.server_close()


if __name__ == '__main__':
    main()
