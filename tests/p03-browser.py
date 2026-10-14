"""P03 browser: real controls, then fixed-step production flows with a matching virtual cache clock."""
from pathlib import Path
from http.server import SimpleHTTPRequestHandler,ThreadingHTTPServer
from threading import Thread
from functools import partial
from playwright.sync_api import sync_playwright
import json,os,shutil
ROOT=Path(__file__).resolve().parents[1]
OUT=Path(os.environ.get('SCP_TEST_ARTIFACTS',str(ROOT/'tests/artifacts/p03')))
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*args):pass

def main():
 OUT.mkdir(parents=True,exist_ok=True);s=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)));Thread(target=s.serve_forever,daemon=True).start();origin=f'http://127.0.0.1:{s.server_port}';records=[]
 try:
  with sync_playwright() as pw:
   browser=pw.chromium.launch(executable_path=shutil.which('chromium'),headless=True,args=['--no-sandbox','--disable-dev-shm-usage'])
   for entry in ['dev.html','index.html']:
    for mobile in [False,True]:
     context=browser.new_context(viewport={'width':390 if mobile else 1280,'height':844 if mobile else 900},has_touch=mobile,is_mobile=mobile)
     context.add_init_script('let seed=1337;Math.random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};')
     page=context.new_page();errors=[];remote=[];bad=[]
     page.on('pageerror',lambda e:errors.append(str(e)));page.on('console',lambda m:errors.append(m.text) if m.type=='error' else None);page.on('response',lambda r:bad.append([r.status,r.url]) if r.status>=400 else None)
     def route(r):
      if r.request.url.startswith(origin+'/'):r.continue_()
      else:remote.append(r.request.url);r.abort()
     page.route('**/*',route);page.goto(origin+'/'+entry,wait_until='networkidle');assert page.locator('#technical-ready').is_visible();page.click('#btn-technical-start');page.evaluate('G.Game.startTechnical({seed:1337})')
     assert page.evaluate('G.Game.player.baseSpd')==165
     rect=page.locator('#game').bounding_box();assert abs(rect['width']-page.viewport_size['width'])<2 and abs(rect['height']-page.viewport_size['height'])<2
     initial=page.evaluate('({x:G.Game.player.x,y:G.Game.player.y})')
     if mobile:
      x=rect['width']*.4;y=rect['height']*.6
      for event,dx in [('pointerdown',0),('pointermove',12)]:page.dispatch_event('#game',event,{'pointerType':'touch','pointerId':5,'clientX':x+dx,'clientY':y})
      page.wait_for_timeout(180);page.dispatch_event('#game','pointerup',{'pointerType':'touch','pointerId':5,'clientX':x+12,'clientY':y})
     else:page.keyboard.down('KeyD');page.wait_for_timeout(180);page.keyboard.up('KeyD')
     assert page.evaluate('G.Game.player.x')>initial['x']+10
     page.click('#btn-sprint');page.wait_for_timeout(50);assert page.evaluate('G.FieldCombat.state.sprintRemaining')>1
     page.click('#btn-technical-pause');before=page.evaluate('({e:G.Expedition.state.elapsed,w:G.FieldCombat.state,x:G.Game.player.x})');page.wait_for_timeout(150);assert page.evaluate('({e:G.Expedition.state.elapsed,w:G.FieldCombat.state,x:G.Game.player.x})')==before
     page.click('#btn-technical-resume');page.evaluate("Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'))");assert page.evaluate('G.Game.state')=='paused';page.evaluate("Object.defineProperty(document,'hidden',{configurable:true,value:false});document.dispatchEvent(new Event('visibilitychange'))");assert page.evaluate('G.Game.state')=='paused';page.click('#btn-technical-resume')
     if mobile:
      page.set_viewport_size({'width':844,'height':390});page.wait_for_timeout(100);rect=page.locator('#game').bounding_box();assert abs(rect['width']-844)<2 and abs(rect['height']-390)<2;page.set_viewport_size({'width':390,'height':844});page.wait_for_timeout(100)
     full=None
     if mobile:
      page.evaluate('G.Game.startTechnical({seed:1337})');helper=(ROOT/'tests/helpers/p03-autoplay.js').read_text()
      first=page.evaluate(helper,{'stopPrep':True});assert first['status']=='preparation',first
      page.wait_for_timeout(100);assert page.locator('#upgrade-cards button').count()==3;assert 'Nivel 2 de 3' in page.locator('#upgrade-count').inner_text()
      clock=page.evaluate('G.Expedition.state.elapsed');page.wait_for_timeout(150);assert page.evaluate('G.Expedition.state.elapsed')==clock
      pending=page.evaluate('G.Expedition.state.pending');page.locator('#upgrade-cards button').first.evaluate('(b)=>{b.click();b.click()}');assert page.evaluate('G.Expedition.state.pending')==pending-1
      while page.evaluate('G.Expedition.state.pending')>0:page.wait_for_timeout(50);page.locator('#upgrade-cards button').first.click()
      assert page.evaluate('G.Expedition.state.phase')=='combat';assert page.evaluate('G.Expedition.state.objective')=='survive'
      page.wait_for_timeout(100);page.screenshot(path=str(OUT/f'{entry[:-5]}-resistance.png'))
      # Recover the same offscreen enemy without invented XP/kills.
      recovery=page.evaluate('''() => {const e=G.EnemyMgr.all()[0],id=e.id,hp=e.hp;e.x=5000;e.y=0;
       for(let n=0;n<330;n++)G.Expedition.update(1/30);
       return{same:G.EnemyMgr.get(id)===e,hp,after:e.hp,dead:e.dead,reachable:G.Path.reachable(e.x,e.y,G.Game.player)};}''')
      assert recovery['same'] and recovery['reachable'] and not recovery['dead'] and recovery['hp']==recovery['after'],recovery
      mode='escape' if entry=='dev.html' else 'win'
      mid=None
      if mode=='win':
       mid=page.evaluate(helper,{'bossMode':'win','stopBossDamaged':True});assert mid['status']=='boss-damaged',mid
       page.wait_for_timeout(80);page.screenshot(path=str(OUT/'boss-combat.png'))
      part=page.evaluate(helper,{'bossMode':mode,'minimumBosses':1,'stopExtraction':True});assert part['status']=='extracting',part
      assert part['state']['totals']['bossesEvaded' if mode=='escape' else 'bossesDefeated']>=1
      page.keyboard.down('KeyD');page.wait_for_timeout(80);page.keyboard.up('KeyD');assert page.evaluate('G.Expedition.state.phase')=='exploration'
      page.keyboard.down('KeyA');page.wait_for_timeout(160);page.keyboard.up('KeyA');page.wait_for_timeout(100)
      page.on('dialog',lambda d:d.accept());page.click('#btn-field-extract');page.wait_for_timeout(3300)
      result=page.evaluate('G.Expedition.state.result');assert result['reason']=='extracted';assert page.locator('#field-result').is_visible();page.screenshot(path=str(OUT/f'{entry[:-5]}-result.png'))
      full={'mode':mode,'result':result,'log':first['log']+(mid['log'] if mid else [])+part['log']};print(json.dumps({'entry':entry,'mode':mode,'result':result}),flush=True)
      page.click('#btn-result-restart');page.wait_for_timeout(50);assert page.evaluate('G.Game.player.hp==100 && G.Game.player.level==1 && G.Game.player.kills==0')
      page.evaluate('G.Game.player.hurt(1000)');page.wait_for_timeout(100);assert page.evaluate('G.Expedition.state.result.reason')=='death';page.click('#btn-result-menu');assert page.locator('#technical-ready').is_visible()
     assert not errors,errors;assert not remote,remote;assert not bad,bad
     assert page.evaluate('G.FIREBASE_CONFIG===null && !G.ENABLE_CLOUD && !G.ENABLE_MULTIPLAYER && !G.ENABLE_SOCIAL');assert not page.evaluate('navigator.serviceWorker.controller!==null')
     records.append({'entry':entry,'touchEmulated':mobile,'status':'PASS','errors':errors,'remoteAttempts':remote,'httpFailures':bad,'completeFlow':full});context.close()
   browser.close()
  (OUT/'results.json').write_text(json.dumps({'version':'P03-local-01 / alfa0.3','records':records,'method':'Real controls plus fixed dt1/30 and matching virtual performance.now during autoplay to keep LOS-cache timing faithful. No HP/damage cheats in winning flows. Death and inaccessible-enemy cases use controlled injections. Not FPS/physical/Safari validation.'},indent=2)+'\n');print(json.dumps({'scenarios':len(records),'fullFlows':sum(bool(x['completeFlow']) for x in records),'result':'PASS'}),flush=True)
 finally:s.shutdown();s.server_close()
if __name__=='__main__':main()
