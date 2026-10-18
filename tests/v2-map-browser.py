"""QA V2 aislado: tiempo, posición, invulnerabilidad y HP controlados.
No es aceptación humana, balance, rendimiento ni prueba en dispositivo físico.
Ejecutar después del build. Sin cuentas, perfil previo ni solicitudes externas.
"""
from pathlib import Path
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from functools import partial
from threading import Thread
from playwright.sync_api import sync_playwright
import json, os

ROOT = Path(os.environ.get('SCP_TEST_ROOT', Path(__file__).resolve().parents[1])).resolve()
OUT = Path(os.environ.get('SCP_TEST_ARTIFACTS', ROOT/'tests/artifacts/v2-map'))
ThreadingHTTPServer.request_queue_size = 128

class Quiet(SimpleHTTPRequestHandler):
    def log_message(self, *args): pass

def main():
    OUT.mkdir(parents=True, exist_ok=True)
    server = ThreadingHTTPServer(('127.0.0.1', 0), partial(Quiet, directory=str(ROOT)))
    Thread(target=server.serve_forever, daemon=True).start()
    origin = f'http://127.0.0.1:{server.server_port}'
    records = []
    try:
        with sync_playwright() as pw:
            browser = pw.chromium.launch(headless=True)
            for entry in ['dev.html', 'index.html']:
                for mobile in [False, True]:
                    context = browser.new_context(viewport={'width':390 if mobile else 1280, 'height':844 if mobile else 900}, has_touch=mobile, is_mobile=mobile)
                    page = context.new_page(); errors=[]; remote=[]; bad=[]
                    page.on('pageerror', lambda e: errors.append(str(e)))
                    page.on('console', lambda m: errors.append(m.text) if m.type=='error' else None)
                    page.on('response', lambda r: bad.append([r.status,r.url]) if r.status>=400 else None)
                    def route(r):
                        if r.request.url.startswith(origin+'/'): r.continue_()
                        else: remote.append(r.request.url); r.abort()
                    page.route('**/*', route)
                    page.goto(origin+'/'+entry+'?prueba=mapa-v2&rapida=1')
                    page.wait_for_selector('#btn-technical-start:visible')
                    assert page.get_by_text('Desarrollado por Ivan Vivanco', exact=True).is_visible()
                    assert page.locator('#loadout-mods-0 input, #loadout-mods-1 input').count()==0
                    page.click('#btn-technical-start')
                    page.wait_for_function('() => G.Game.state === "playing" && !!G.Expedition.state.v2')
                    page.click('#btn-technical-pause')
                    frozen=page.evaluate('G.Expedition.state.v2.mapTime')
                    page.wait_for_timeout(180)
                    assert page.evaluate('G.Expedition.state.v2.mapTime')==frozen
                    assert 270<=frozen<273, frozen
                    assert page.evaluate('!G.LocalAccounts.enabled && !G.InventoryTrial.enabled && !G.DimensionalRifts.enabled && G.RunCheckpoint.capture()===null')
                    door=page.evaluate('''() => {
                        const p=G.Game.player, boss=G.EnemyMgr.all().find(e=>e.boss&&!e.dead);
                        if(!boss)throw Error('Falta jefe vivo al iniciar prueba rápida');
                        boss.hp=boss.maxHp=1e7; p.invuln=1e6;
                        const exit=G.Expedition.state.exit;
                        // Fixture real anterior al corte: conserva posición/vida durante los30s simulados.
                        const remnant=G.EnemyMgr.add(new G.Enemy(G.Content.pursuer,exit.x,exit.y,{hp:1,spd:1,dmg:1}));
                        remnant.hp=remnant.maxHp=10000; remnant.spd=0; remnant.update=()=>{};
                        window.v2QA={boss,remnant};
                        for(let i=0;i<1000&&!G.Expedition.state.v2.doorOpen;i++){
                            if(G.Expedition.state.phase==='levelup')G.Expedition.choose(0);
                            G.Expedition.update(1/30);
                        }
                        const s=G.Expedition.state;
                        if(!s.v2.doorOpen)throw Error('Puerta no apareció en300s');
                        if(!G.EnemyMgr.get(remnant.id)||remnant.dead)throw Error('Remanente anterior al corte eliminado');
                        p.x=exit.x;p.y=exit.y;
                        const sector=s.sector, count=G.EnemyMgr.count,idsBefore=G.EnemyMgr.all().map(e=>e.id);
                        const summoned=G.Expedition.summon(boss,3);
                        G.Expedition.update(1/30);
                        return {s:G.Expedition.state,sector,count,summoned,after:G.EnemyMgr.count,idsBefore,idsAfter:G.EnemyMgr.all().map(e=>e.id),remnantId:remnant.id};
                    }''')
                    assert door['s']['v2']['spawnClosed'] and door['s']['v2']['bossSpawned']
                    assert not door['s']['v2']['bossDefeated']
                    assert door['s']['sector']==door['sector'], door
                    # Deaths may reduce count. No new identity may appear after the cutoff.
                    assert door['summoned']==0 and set(door['idsAfter']) <= set(door['idsBefore']), door
                    assert len(door['s']['v2']['allies'])>=2, door
                    # Retirar jugador de la puerta y aislar disparos aliados de los del jugador.
                    allied=page.evaluate('''() => {
                        const p=G.Game.player,r=v2QA.remnant,exit=G.Expedition.state.exit;
                        p.x=exit.x-150;p.y=exit.y;
                        const before=r.hp, tick=G.FieldCombat.tick;
                        G.Projectiles.clear();G.FieldCombat.tick=()=>{};
                        try{for(let i=0;i<45;i++)G.Expedition.update(1/30);}finally{G.FieldCombat.tick=tick;}
                        return {before,after:r.hp,exists:!!G.EnemyMgr.get(r.id)};
                    }''')
                    assert allied['exists'] and allied['after']<allied['before'], allied
                    unlocked=page.evaluate('''() => {
                        v2QA.boss.hurt(v2QA.boss.hp+1);
                        for(let i=0;i<35;i++){
                            if(G.Expedition.state.phase==='levelup')G.Expedition.choose(0);
                            G.Expedition.update(1/30);
                        }
                        G.TechnicalUI.tick(G.Game.player,G.Expedition.state.elapsed);
                        return {s:G.Expedition.state,remnant:!!G.EnemyMgr.get(v2QA.remnant.id)};
                    }''')
                    assert unlocked['s']['v2']['bossDefeated'] and unlocked['remnant'], unlocked
                    assert page.locator('#btn-field-extract').is_hidden()
                    assert page.locator('#btn-mods').is_hidden()
                    # Mostrar mundo sin overlay: pausa global reactivada inmediatamente tras captura.
                    page.click('#btn-technical-resume')
                    page.screenshot(path=str(OUT/f'{entry[:-5]}-{"touch" if mobile else "desktop"}-door.png'))
                    page.click('#btn-technical-pause')
                    transition=page.evaluate('''() => {
                        while(G.Expedition.state.phase==='levelup')G.Expedition.choose(0);
                        const p=G.Game.player,exit=G.Expedition.state.exit;
                        p.x=exit.x;p.y=exit.y;p.invuln=1e6;
                        const snapshot=()=>({hp:p.hp,temp:JSON.stringify(p.tempStats),weapons:G.FieldCombat.exportData().weapons.map(w=>({id:w.id,model:w.model,level:w.level,mods:w.mods}))});
                        const before=snapshot();G.Expedition.update(1/30);
                        const after=snapshot(),s=G.Expedition.state;
                        G.Expedition.update(1/30);
                        return {before,after,s,next:G.Expedition.state};
                    }''')
                    assert transition['before']==transition['after'], transition
                    assert transition['s']['sector']==door['sector']+1, transition
                    assert transition['s']['v2']['mapTime']==0, transition
                    assert transition['next']['sector']==transition['s']['sector'], transition
                    assert transition['next']['v2']['mapTime']<1, transition
                    # Variante completa: arranca en0, sin jefe ni puerta.
                    page.goto(origin+'/'+entry+'?prueba=mapa-v2')
                    page.wait_for_selector('#btn-technical-start:visible');page.click('#btn-technical-start')
                    page.wait_for_function('() => G.Game.state === "playing" && !!G.Expedition.state.v2')
                    normal=page.evaluate('G.Expedition.state.v2')
                    assert 0<=normal['mapTime']<2 and not normal['bossSpawned'] and not normal['doorOpen'], normal
                    assert not errors, errors
                    assert not remote, remote
                    assert not bad, bad
                    records.append({'entry':entry,'touchEmulated':mobile,'status':'PASS','door':door,'alliedDamage':allied,'unlocked':unlocked,'transition':transition,'normal':normal,'errors':errors,'remoteAttempts':remote,'httpFailures':bad})
                    context.close()
            browser.close()
        (OUT/'results.json').write_text(json.dumps({'records':records,'method':'Navegador aislado. Posición, HP del jefe/remanente, invulnerabilidad y tiempo controlados. Disparos del jugador temporalmente desactivados para aislar daño aliado. No aceptación humana, balance, rendimiento ni dispositivo físico.'},indent=2)+'\n',encoding='utf-8')
        print(json.dumps({'result':'PASS','scenarios':len(records),'output':str(OUT)}))
    finally:
        server.shutdown();server.server_close()

if __name__=='__main__':main()
