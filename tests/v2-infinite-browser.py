"""T1A browser integration. Controlled damage/time is QA, not manual acceptance or balance."""
from pathlib import Path
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from functools import partial
from threading import Thread
from urllib.parse import urlsplit
from playwright.sync_api import sync_playwright
import argparse,json,os
ROOT=Path(os.environ.get('SCP_TEST_ROOT',Path(__file__).resolve().parents[1])).resolve()
ThreadingHTTPServer.request_queue_size=128
class Quiet(SimpleHTTPRequestHandler):
    def log_message(self,*args): pass
HELPERS='''() => {
 const p=G.Game.player;p.invuln=1e6;
 window.qa={
  at(x,y){p.x=x;p.y=y;G.Camera.x=x;G.Camera.y=y;G.Path.update(1,[p]);},
  snap(){return JSON.parse(JSON.stringify({s:G.Expedition.state,w:p.fieldWeapons,rewards:G.ArmamentRewards.state,chests:G.ExplorationChests.state,account:G.LocalAccounts.enabled,checkpoint:G.RunCheckpoint.capture()}));},
  step(n){if(G.Game.state==='paused')G.Game.togglePause();try{
   for(let i=0;i<n;i++){if(G.Expedition.state.phase==='levelup')G.Expedition.choose(0);G.Expedition.update(1/30);}
   G.TechnicalUI.tick(p,G.Expedition.state.elapsed);
  }finally{if(G.Game.state==='playing')G.Game.togglePause();}},
  show(){if(G.Game.state==='paused')G.Game.togglePause();G.TechnicalUI.tick(p,G.Expedition.state.elapsed);
   const ids=['map-locator','chest-status','armament-choice'],vis=ids.map(id=>[id,document.getElementById(id).hidden]);
   G.Game.togglePause();G.TechnicalUI.state('playing');for(const[id,hidden]of vis)document.getElementById(id).hidden=hidden;},
  kill(elite){const e=G.EnemyMgr.all().find(e=>!e.dead&&(elite?e.elite:e.boss&&!e.dimensional));if(!e)throw Error('Expected encounter missing');
   e.hurt(e.hp+(e.shield||0)+1e6);const pos=[[160,0],[-160,0],[0,160],[0,-160]].map(([dx,dy])=>({x:e.x+dx,y:e.y+dy})).find(q=>G.World.isFree(q.x,q.y,p.r)&&G.Path.reachable(q.x,q.y,p));
   if(!pos)throw Error('No safe QA position');this.at(pos.x,pos.y);this.step(60);},
  open(type){const c=G.ExplorationChests.state.chests.find(c=>c.type===type);if(!c)throw Error('Reward chest missing');this.at(c.x,c.y);
   for(let i=0;i<130&&!G.ArmamentRewards.state.pending;i++)this.step(1);this.show();return this.snap();}
 };
 return qa.snap();
}'''
def run(browser,base,entry,touch,mode,out):
    ctx=browser.new_context(viewport={'width':390 if touch else 1280,'height':844 if touch else 900},has_touch=touch,is_mobile=touch)
    page=ctx.new_page();errors=[];remote=[];bad=[];failed=[]
    page.on('requestfailed',lambda r:failed.append([r.url,r.failure]))
    page.on('pageerror',lambda e:errors.append(str(e)))
    page.on('console',lambda m:errors.append(m.text) if m.type=='error' else None)
    page.on('response',lambda r:bad.append([r.status,r.url]) if r.status>=400 else None)
    origin=urlsplit(base).netloc
    def route(r):
        if urlsplit(r.request.url).netloc==origin:r.continue_()
        else:remote.append(r.request.url);r.abort()
    page.route('**/*',route)
    try:
        suffix='' if mode=='normal' else '&premios='+mode
        query='' if mode=='normal' and base.startswith('https:') else '?prueba=infinito-v2'+suffix
        page.goto(base+entry+query+("&"if "?"in query else"?")+"interfaz=clasica")
        page.wait_for_selector('#btn-technical-start:visible')
        assert page.locator('#infinite-test-note').is_visible()
        assert page.locator('#loadout-weapon-1').is_hidden()
        assert page.locator('#loadout-preview > li').count()==1
        assert page.locator('.developer-credit').inner_text()=='Desarrollado por Ivan Vivanco'
        page.click('#btn-technical-start')
        page.wait_for_function('G.Game.state==="playing" && G.MapTrial.infinite')
        page.click('#btn-technical-pause');initial=page.evaluate(HELPERS)
        assert len(initial['w'])==1 and not initial['account'] and initial['checkpoint'] is None,initial
        assert all(n==0 for n in initial['w'][0]['branches'].values()),initial
        if mode=='normal':
            assert initial['s']['v2']['mapTime']<2 and not initial['s']['v2']['bossSpawned'],initial
            result={'initial':initial}
        else:
            # Seed one XP orb, then choose an actual level-up card through the UI.
            page.evaluate('''() => {
             const p=G.Game.player;G.Pickups.drop('xp',p.x,p.y,(p.xpNext-p.xp)/p.xpMul);
             qa.step(1);qa.show();G.Game.togglePause();G.TechnicalUI.tick(p,G.Expedition.state.elapsed);
            }''')
            page.wait_for_selector('#field-upgrades:visible')
            offered=page.evaluate('G.Expedition.state.cards.map(c=>({key:c.key,category:c.category,branch:c.branch}))')
            assert len(offered)==3 and offered[0]['category']=='weapon' and offered[1]['category']=='general',offered
            page.locator('#upgrade-cards button').first.click()
            page.evaluate('() => {if(G.Game.state==="playing")G.Game.togglePause();}')
            assert page.evaluate('Object.values(G.Game.player.fieldWeapons[0].branches).reduce((a,b)=>a+b,0)')==1
            elite=mode=='elite';page.evaluate('(elite)=>qa.kill(elite)',elite)
            victory=page.evaluate('qa.snap()');assert len(victory['w'])==1 and not victory['rewards']['receipts'],victory
            opened=page.evaluate('(type)=>qa.open(type)','elite' if elite else 'boss')
            assert opened['rewards']['pending'] and opened['s']['phase']=='armament',opened
            assert page.locator('#armament-choice').is_visible()
            page.screenshot(path=str(out/f'{entry[:-5]}-{"touch" if touch else "desktop"}-{mode}-choice.png'))
            frozen=opened['s']['v2']['mapTime'];page.evaluate('qa.step(120)');assert page.evaluate('G.Expedition.state.v2.mapTime')==frozen
            page.evaluate('G.Game.togglePause()');page.wait_for_timeout(220)
            assert page.evaluate('G.Expedition.state.v2.mapTime')==frozen
            before=page.evaluate('qa.snap()');first=before['w'][0]
            # Choose via the real UI while motor is paused (the choice itself is synchronous).
            page.locator('#armament-choice button').filter(has_text='Pistola').first.click()
            chosen=page.evaluate('() => {if(G.Game.state==="playing")G.Game.togglePause();return qa.snap();}')
            assert len(chosen['w'])==2 and chosen['rewards']['pending'] is None,chosen
            assert chosen['w'][0]['id']==first['id'] and chosen['w'][0]['branches']==first['branches'],chosen
            assert chosen['w'][1]['model']=='pistol' and all(n==0 for n in chosen['w'][1]['branches'].values()),chosen
            assert len(set(w['id'] for w in chosen['w']))==2 and len(chosen['rewards']['receipts'])==1,chosen
            assert page.evaluate('G.ArmamentRewards.choose("smg")') is False
            # Isolate actual field fire on a durable real enemy. No fake projectile hits.
            damage=page.evaluate('''() => {
             const p=G.Game.player;const targets=G.EnemyMgr.all().filter(e=>!e.dead&&!e.boss);const e=targets[0];
             if(!e)throw Error('No target for damage verification');
             const safe=[[-72,0],[72,0],[0,-72],[0,72]].map(([dx,dy])=>({x:e.x+dx,y:e.y+dy})).find(q=>G.World.isFree(q.x,q.y,p.r)&&Array.from({length:18},(_,i)=>i/17).every(t=>!G.World.projectileBlock(q.x+(e.x-q.x)*t,q.y+(e.y-q.y)*t,2)));
             if(!safe)throw Error('No clear QA firing line');qa.at(safe.x,safe.y);e.hp=e.maxHp=10000;e.dmg=0;
             for(const other of G.EnemyMgr.all())if(other!==e){other.x+=50000;other.y+=50000;}
             G.Projectiles.clear();for(const w of p.fieldWeapons){w.ammo=G.FieldStats.weapon(p,w).capacity;w.reload=0;w.shotWait=0;}
             const before=e.hp,shots=p.fieldWeapons.map(w=>w.ammo);
             for(let i=0;i<45;i++){G.FieldCombat.tick(1/60,p,true);G.Projectiles.update(1/60,p,G.EnemyMgr.all());G.Combat.resolve(1/60,p,G.Expedition.state.elapsed);}
             return {before,after:e.hp,ammoBefore:shots,ammoAfter:p.fieldWeapons.map(w=>w.ammo)};
            }''')
            assert all(a<b for a,b in zip(damage['ammoAfter'],damage['ammoBefore'])),damage
            assert damage['after']<damage['before'],damage
            page.evaluate('qa.show()');stem=f'{entry[:-5]}-{"touch" if touch else "desktop"}-{mode}'
            page.screenshot(path=str(out/(stem+'.png')))
            result={'initial':initial,'offeredCards':offered,'victory':victory,'opened':opened,'chosen':chosen,'damage':damage}
            assert not page.evaluate('G.LocalAccounts.enabled') and page.evaluate('G.RunCheckpoint.capture()') is None
        assert not errors and not remote and not bad,{'errors':errors,'remote':remote,'http':bad,'failed':failed}
        return {'mode':mode,'status':'PASS',**result,'errors':errors,'remote':remote,'http':bad}
    finally:ctx.close()
def main():
    parser=argparse.ArgumentParser();parser.add_argument('--live',action='store_true');args=parser.parse_args()
    out=Path(os.environ.get('SCP_TEST_ARTIFACTS',ROOT/'tests/artifacts/v2-infinite'))/('live' if args.live else 'local');out.mkdir(parents=True,exist_ok=True)
    server=None
    try:
        if args.live:base='https://deteco.github.io/SCPSurvivor/'
        else:
            server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)));Thread(target=server.serve_forever,daemon=True).start();base=f'http://127.0.0.1:{server.server_port}/'
        records=[]
        with sync_playwright() as pw:
            browser=pw.chromium.launch(headless=True)
            try:
                for entry in (['index.html'] if args.live else ['dev.html','index.html']):
                    for touch in [False,True]:records.append({'entry':entry,'touchEmulated':touch,'status':'PASS','modes':[run(browser,base,entry,touch,mode,out) for mode in ['normal','jefe','elite']]})
            finally:browser.close()
        (out/'results.json').write_text(json.dumps({'live':args.live,'records':records,'method':'Controlled position, invulnerability, lethal QA damage and time; real UI choices and projectile damage. Not manual acceptance, balance, performance or physical phone evidence.'},indent=2)+'\n',encoding='utf-8')
        print(json.dumps({'status':'PASS','scenarios':len(records),'modesPerScenario':3,'output':str(out)}))
    finally:
        if server:server.shutdown();server.server_close()
if __name__=='__main__':main()
