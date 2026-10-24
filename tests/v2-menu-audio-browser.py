"""Real browser media lifecycle for SON-001; no claim of human listening or physical phone."""
from pathlib import Path
from http.server import SimpleHTTPRequestHandler,ThreadingHTTPServer
from functools import partial
from threading import Thread
from playwright.sync_api import sync_playwright
import json
ROOT=Path(__file__).resolve().parents[1]
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*a):pass
 def copyfile(self,source,outputfile):
  try:super().copyfile(source,outputfile)
  except (BrokenPipeError,ConnectionResetError):pass
def main():
 server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)));Thread(target=server.serve_forever,daemon=True).start();records=[]
 try:
  with sync_playwright()as pw:
   b=pw.chromium.launch(headless=True)
   try:
    for w,h in[(390,844),(844,390),(1280,900)]:
     c=b.new_context(viewport={'width':w,'height':h},has_touch=w<900);c.add_init_script("window.qaAudio=[];const RealAudio=window.Audio;window.Audio=class extends RealAudio{constructor(...a){super(...a);window.qaAudio.push(this);}};")
     p=c.new_page();errors=[];p.on('pageerror',lambda e:errors.append(str(e)));p.goto(f'http://127.0.0.1:{server.server_port}/index.html?prueba=combate-v2');p.wait_for_selector('#operations-menu:visible');p.locator('[data-screen="home"] [data-open-screen="settings"]').click()
     try:
      p.wait_for_function('()=>qaAudio.length===1&&!qaAudio[0].paused&&qaAudio[0].currentTime>0&&G.Audio.running',timeout=15000)
     except Exception as error:
      diagnostic=p.evaluate('''() => ({audioCount:qaAudio.length,media:qaAudio.map(a=>({paused:a.paused,currentTime:a.currentTime,readyState:a.readyState,error:a.error&&{code:a.error.code,message:a.error.message},src:a.currentSrc||a.src})),track:G.Audio.track,running:G.Audio.running,gameState:G.Game.state,muted:G.Audio.settings.muted})''')
      raise AssertionError('El audio de menú no inició: '+json.dumps(diagnostic)) from error
     initial=p.evaluate('({duration:qaAudio[0].duration,readyState:qaAudio[0].readyState,mediaError:qaAudio[0].error&&{code:qaAudio[0].error.code,message:qaAudio[0].error.message},loop:qaAudio[0].loop,track:G.Audio.track,audioContextRunning:G.Audio.running})');assert initial['duration']==60 and initial['readyState']>=3 and initial['mediaError']is None and initial['loop']and initial['track']=='village'and initial['audioContextRunning']
     p.evaluate('qaAudio[0].currentTime=59.8');p.wait_for_function('()=>qaAudio[0].currentTime<2&&!qaAudio[0].paused',timeout=5000)
     p.evaluate("G.Audio.setVolume('music',.2);G.Audio.toggleMute()");assert p.evaluate('G.Audio.settings.muted&&G.Audio.settings.music===.2');p.evaluate('G.Audio.toggleMute()')
     p.locator('[data-screen="settings"] button[data-open-screen="home"]').last.click();p.click('#btn-technical-start');p.wait_for_function("()=>G.Game.state==='playing'");assert p.evaluate("qaAudio[0].paused&&G.Audio.track!=='village'")
     p.evaluate('G.Game.togglePause()');assert p.evaluate('qaAudio[0].paused')
     # Exercise the real menu hook; it must restart the same media element without a direct audio request.
     p.evaluate('G.Game.toUI()');p.wait_for_function('!qaAudio[0].paused');assert p.evaluate("qaAudio.length===1&&G.Audio.track==='village'");assert not errors,errors
     records.append({'status':'PASS','viewport':[w,h],**initial,'instances':1,'loopBoundaryPassed':True,'muteVolumePassed':True,'stoppedInGameAndPause':True,'reusedOnReturn':True});c.close()
   finally:b.close()
 finally:server.shutdown();server.server_close()
 out=ROOT/'tests/artifacts/rev-est-0006/audio';out.mkdir(parents=True,exist_ok=True);(out/'browser.json').write_text(json.dumps({'status':'PASS','records':records,'humanListening':False,'physicalPhone':False,'method':'Real local Chromium audio element and WebAudio routing; seek near end for loop boundary, not a full-minute listening test.'},indent=2)+'\n',encoding='utf-8');print(json.dumps({'status':'PASS','scenarios':len(records)}))
if __name__=='__main__':main()
