"""LOT012 instrumented capacity/render probe; invulnerability and disabled shots are disclosed."""
from pathlib import Path
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from functools import partial
from threading import Thread
from playwright.sync_api import sync_playwright
import json, os, platform, statistics

ROOT=Path(__file__).resolve().parents[1]
OUT=Path(os.environ.get('SCP_012_OUTPUT',ROOT/'tests/artifacts/lot-est-012'))
ENTRY=os.environ.get('SCP_012_ENTRY','dev.html')
if ENTRY not in ('dev.html','index.html'): raise ValueError('Unsupported local entry')
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*args): pass
 def copyfile(self,*args):
  try: super().copyfile(*args)
  except (BrokenPipeError,ConnectionResetError,ConnectionAbortedError): pass
def stats(values):
 a=sorted(values)
 return {'samples':len(a),'meanMs':statistics.mean(a),'p95Ms':a[int((len(a)-1)*.95)],'maxMs':max(a)}
def main():
 OUT.mkdir(parents=True,exist_ok=True)
 server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
 Thread(target=server.serve_forever,daemon=True).start(); records=[]
 try:
  with sync_playwright() as pw:
   browser=pw.chromium.launch(headless=True)
   for mode,w,h in [(32,390,844),(16,844,390)]:
    p=browser.new_page(viewport={'width':w,'height':h}); errors=[];p.on('pageerror',lambda e:errors.append(str(e)))
    p.goto(f'http://127.0.0.1:{server.server_port}/{ENTRY}?prueba=combate-v2&graficos={mode}')
    p.wait_for_selector('#btn-technical-start:visible');p.click('#btn-technical-start');p.wait_for_function("()=>G.Game.state==='playing'")
    result=p.evaluate('''()=>{
     const setupStarted=performance.now(),pl=G.Game.player;pl.invuln=1e6;for(const w of pl.fieldWeapons)w.shotWait=1e6;
     const stepTo=t=>{while(G.Expedition.state.v2.mapTime<t-1e-8)G.Expedition.update(Math.min(.05,t-G.Expedition.state.v2.mapTime));};
     stepTo(239.999);const before={time:G.Expedition.state.v2.mapTime,count:G.EnemyMgr.count,cap:G.Expedition.enemyCap};
     stepTo(240);const boundary={time:G.Expedition.state.v2.mapTime,count:G.EnemyMgr.count,cap:G.Expedition.enemyCap,bosses:G.EnemyMgr.all().filter(e=>e.boss&&!e.dead).length};
     let max=0,first80=null;const start=G.Expedition.state.v2.mapTime;
     while(G.Expedition.state.v2.mapTime<285){G.Expedition.update(.05);max=Math.max(max,G.EnemyMgr.count);if(first80===null&&G.EnemyMgr.count===80)first80=G.Expedition.state.v2.mapTime;}
     window.qaPerf={frames:[],update:[],populations:[],visible:[],previous:null,warmupRemaining:3,measuring:false,setupWallMs:performance.now()-setupStarted};
     const update=G.Expedition.update;G.Expedition.update=function(...args){const t=performance.now();const r=update(...args);if(qaPerf.measuring)qaPerf.update.push(performance.now()-t);return r;};
     function frame(now){if(qaPerf.warmupRemaining>0){qaPerf.warmupRemaining--;requestAnimationFrame(frame);return;}qaPerf.measuring=true;if(qaPerf.previous!==null)qaPerf.frames.push(now-qaPerf.previous);qaPerf.previous=now;qaPerf.populations.push(G.EnemyMgr.count);qaPerf.visible.push(G.EnemyMgr.all().filter(e=>!e.dead&&G.Camera.sees(e.x,e.y,e.r)).length);if(qaPerf.frames.length<240)requestAnimationFrame(frame);}requestAnimationFrame(frame);
     return{before,boundary,max,first80,secondsTo80:first80===null?null:first80-start,globalCap:G.Spawner.CAP,userAgent:navigator.userAgent,hardwareConcurrency:navigator.hardwareConcurrency};
    }''')
    assert result['before']['count']<=34 and result['before']['cap']==34,result
    assert result['boundary']['cap']==80 and result['boundary']['bosses']==1,result
    assert result['max']==80 and result['first80'] is not None,result
    assert result['globalCap']==64,result
    p.wait_for_function('()=>qaPerf.frames.length>=240',timeout=25000)
    perf=p.evaluate('()=>qaPerf');assert max(perf['populations'])==80 and min(perf['populations'])==80,perf['populations']
    result['performance']={'setupWallMs':perf['setupWallMs'],'warmupCallbacks':3,'frames':stats(perf['frames']),'expeditionUpdate':stats(perf['update']),'estimatedFps':1000/statistics.mean(perf['frames']),'visibleRange':[min(perf['visible']),max(perf['visible'])],'aliveRange':[min(perf['populations']),max(perf['populations'])]}
    p.screenshot(path=str(OUT/f'80-alive-{mode}-{w}x{h}.png'))
    p.click('#btn-technical-pause');frozen=p.evaluate('()=>G.Expedition.state.v2.mapTime');p.wait_for_timeout(250);assert p.evaluate('()=>G.Expedition.state.v2.mapTime')==frozen;p.click('#btn-technical-resume')
    cutoff=p.evaluate('''()=>{
     const before=G.EnemyMgr.count,boss=G.EnemyMgr.all().find(e=>e.boss),pl=G.Game.player;let additions=0;const add=G.EnemyMgr.add;
     G.EnemyMgr.add=function(e){if(G.Expedition.state.v2.mapTime>=300)additions++;return add(e);};
     G.Expedition.update(300-G.Expedition.state.v2.mapTime);const at=G.Expedition.state.v2;
     const origin={x:pl.x,y:pl.y};pl.x=G.Expedition.state.exit.x;pl.y=G.Expedition.state.exit.y;const blocked=!G.Expedition.useExit();pl.x=origin.x;pl.y=origin.y;
     const summons=G.Expedition.summon(boss,4);for(let i=0;i<60;i++)G.Expedition.update(.05);
     return{before,count:G.EnemyMgr.count,additions,summons,time:at.mapTime,closed:at.spawnClosed,door:at.doorOpen,allies:at.allies.length,bossAlive:!boss.dead,blocked};
    }''')
    assert cutoff['time']==300 and cutoff['closed'] and cutoff['door'] and cutoff['allies']==2 and cutoff['bossAlive'] and cutoff['blocked'],cutoff
    assert cutoff['additions']==0 and cutoff['summons']==0 and cutoff['count']==80,cutoff
    assert not errors,errors
    records.append({'graphics':mode,'viewport':[w,h],'capacity':result,'cutoff':cutoff,'pauseFrozen':True,'javascriptErrors':errors});p.close()
   browser.close()
 finally: server.shutdown();server.server_close()
 report={'status':'PASS','entry':ENTRY,'host':platform.platform(),'browser':'headless Chromium through Playwright','physicalPhone':False,'method':'Active clock advanced through real Expedition.update in 50ms steps; invulnerability and disabled player shots hold population for capacity/performance. Synchronous setup duration is recorded separately; three warm-up callbacks are discarded before measuring 240 real animation-frame intervals. AI, path, projectiles, FX and render remain active. Not natural difficulty/balance.','records':records}
 (OUT/'browser.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8');print(json.dumps({'status':'PASS','cases':len(records),'fps':[round(r['capacity']['performance']['estimatedFps'],1)for r in records]}))
if __name__=='__main__':main()
