"""Verify real pickup/XP/choice flow: one improvement per earned level."""
from pathlib import Path
from http.server import SimpleHTTPRequestHandler,ThreadingHTTPServer
from threading import Thread
from functools import partial
from playwright.sync_api import sync_playwright
import json,os
ROOT=Path(__file__).resolve().parents[1]
ThreadingHTTPServer.request_queue_size = 128
OUT=Path(os.environ.get('SCP_TEST_ARTIFACTS',str(ROOT/'tests/artifacts/levels')))
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*a):pass

def main():
 OUT.mkdir(parents=True,exist_ok=True);server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)));Thread(target=server.serve_forever,daemon=True).start();records=[]
 try:
  with sync_playwright() as pw:
   b=pw.chromium.launch(headless=True,args=['--no-sandbox'])
   for entry in ['dev.html','index.html']:
    ctx=b.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True)
    ctx.add_init_script('let seed=1337;Math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};')
    page=ctx.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
    page.goto(f'http://127.0.0.1:{server.server_port}/{entry}',wait_until='networkidle');page.click('#btn-technical-start');page.evaluate('G.Game.startTechnical({seed:1337})')
    helper=(ROOT/'tests/helpers/p03-autoplay.js').read_text()
    first=page.evaluate(helper,{'stopLevel':True});assert first['status']=='levelup',first
    assert 5<=first['state']['kills']<12 and first['state']['pending']==1,first['state']
    assert page.evaluate('G.Game.player.level')==2
    firstwave=first['state']['wave'];page.wait_for_timeout(80)
    assert page.locator('#upgrade-title').inner_text()=='Nivel 2 alcanzado'
    old=page.evaluate('Object.values(G.Game.player.tempStats).reduce((a,b)=>a+b,0)+(G.Game.player.fieldWeapons||[]).reduce((n,w)=>n+(w.level||1)-1,0)')
    index=page.evaluate('G.Expedition.state.cards.findIndex(c=>c.key!=="heal")')
    page.locator('#upgrade-cards button').nth(index).evaluate('(b)=>{b.click();b.click()}')
    assert page.evaluate('G.Expedition.state.phase')=='combat' and page.evaluate('G.Expedition.state.wave')==firstwave
    new=page.evaluate('Object.values(G.Game.player.tempStats).reduce((a,b)=>a+b,0)+(G.Game.player.fieldWeapons||[]).reduce((n,w)=>n+(w.level||1)-1,0)');assert new==old+1
    second=page.evaluate(helper,{'stopLevel':True});assert second['status']=='levelup',second
    assert second['state']['pending']==1 and page.evaluate('G.Game.player.level')==3,second['state']
    assert page.evaluate('G.Expedition.state.wave')==firstwave
    page.locator('#upgrade-cards button').first.click();assert page.evaluate('G.Expedition.state.phase')=='combat'
    r=page.evaluate(helper,{'stopWave':2});assert r['status']=='wave',r
    before=page.evaluate('({level:G.Game.player.level,xp:G.Game.player.xp,pending:G.Expedition.state.pending,kills:G.Game.player.kills,phase:G.Expedition.state.phase,wave:G.Expedition.state.wave})')
    assert before['wave']==2 and before['phase']=='combat' and before['pending']==0,before
    steps=[{'level':2,'pauseKills':first['state']['kills'],'resumeWave':firstwave},
           {'level':3,'phase':second['state']['phase'],'resumeWave':firstwave}]
    # Exact threshold via actual pickups:62XP gives one level/one choice, no double collection.
    one=page.evaluate('''() => {G.Game.startTechnical({seed:1337});const p=G.Game.player;
     G.Pickups.drop('xp',p.x,p.y,62);G.Expedition.update(1/60);
     const first={phase:G.Expedition.state.phase,level:p.level,xp:p.xp,pending:G.Expedition.state.pending};
     G.Expedition.update(1/60);return{first,after:{phase:G.Expedition.state.phase,level:p.level,xp:p.xp,pending:G.Expedition.state.pending}};}''')
    assert one['first']=={'phase':'levelup','level':2,'xp':0,'pending':1} and one['after']==one['first'],one
    bank=page.evaluate('''() => {G.Game.startTechnical({seed:1337});const p=G.Game.player;
     G.Pickups.drop('xp',p.x,p.y,168);G.Expedition.update(1/60);
     const statTotal=()=>Object.values(p.tempStats).reduce((a,b)=>a+b,0)+(p.fieldWeapons||[]).reduce((n,w)=>n+(w.level||1)-1,0);
     const statsBefore=statTotal();const first={phase:G.Expedition.state.phase,level:p.level,xp:p.xp,xpNext:p.xpNext,pending:G.Expedition.state.pending,pendingXp:G.Expedition.state.pendingXp};
     const cards=G.Expedition.state.cards,learning=G.FieldUpgrades.candidates(p).find(c=>c.key==='learning');
     cards.splice(0,cards.length,learning);
     const xpBefore=p.xp;G.Expedition.choose(0);
     const second={phase:G.Expedition.state.phase,level:p.level,xp:p.xp,pending:G.Expedition.state.pending,pendingXp:G.Expedition.state.pendingXp,xpMul:p.xpMul};
     if(G.Expedition.state.phase==='levelup'){G.Expedition.state.cards.splice(0,G.Expedition.state.cards.length,G.FieldUpgrades.candidates(p).find(c=>c.key==='power'));G.Expedition.choose(0);}
     const resumed={phase:G.Expedition.state.phase,level:p.level,xp:p.xp,pending:G.Expedition.state.pending,pendingXp:G.Expedition.state.pendingXp,learning:p.tempStats.learning||0};
     G.Pickups.drop('xp',p.x,p.y,5);G.Expedition.update(1/60);
     return{first,second,resumed,afterFive:{phase:G.Expedition.state.phase,level:p.level,xp:p.xp,pending:G.Expedition.state.pending,learning:p.tempStats.learning||0},xpBefore,statsBefore,statsAfter:statTotal()};}''')
    assert bank['first']['phase']=='levelup' and bank['first']['level']==2 and bank['first']['pending']==1,bank
    assert bank['second']['phase']=='levelup' and bank['second']['level']==3 and bank['second']['pending']==1,bank
    assert bank['second']['xpMul']==1.12 and bank['second']['xp']==bank['xpBefore'],bank
    assert bank['resumed']['phase']=='combat' and bank['resumed']['level']==3 and bank['resumed']['pending']==0 and bank['resumed']['xp']==5 and bank['resumed']['pendingXp']==0,bank
    assert bank['afterFive']['phase']=='combat' and bank['afterFive']['pending']==0 and bank['afterFive']['learning']==1 and abs(bank['afterFive']['xp']-10.6)<1e-9,bank
    assert bank['statsAfter']==bank['statsBefore']+2,bank
    page.evaluate('''() => {G.Game.startTechnical({seed:1337});const p=G.Game.player;G.Pickups.drop('xp',p.x,p.y,168);G.Expedition.update(1/60);}''')
    page.keyboard.down('Digit1');page.wait_for_timeout(100)
    page.evaluate("window.dispatchEvent(new KeyboardEvent('keydown',{code:'Digit1',key:'1',repeat:true,bubbles:true}))")
    page.wait_for_timeout(100)
    held=page.evaluate('({phase:G.Expedition.state.phase,level:G.Game.player.level,pending:G.Expedition.state.pending,applied:G.Expedition.state.upgradesApplied})')
    assert held=={'phase':'levelup','level':3,'pending':1,'applied':1},held
    page.keyboard.up('Digit1');page.keyboard.down('Numpad2');page.wait_for_timeout(100);page.keyboard.up('Numpad2')
    keypad=page.evaluate('({phase:G.Expedition.state.phase,level:G.Game.player.level,pending:G.Expedition.state.pending,applied:G.Expedition.state.upgradesApplied})')
    assert keypad=={'phase':'combat','level':3,'pending':0,'applied':2},keypad
    assert not errors,errors
    records.append({'entry':entry,'before':before,'choices':steps,'oneThreshold':one,'bankedPickup':bank,'heldKeyRepeat':held,'numpadChoice':keypad,'status':'PASS'});ctx.close()
   b.close()
  (OUT/'results.json').write_text(json.dumps({'records':records,'method':'Natural first-wave kills via fixed-step production helper, real card DOM doubleclick guard, controlled exact62XP pickup boundary'},indent=2)+'\n');print(json.dumps(records))
 finally:server.shutdown();server.server_close()
if __name__=='__main__':main()
