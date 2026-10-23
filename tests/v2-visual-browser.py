"""Visual atlas integration, not balance, performance or physical-device acceptance."""
from pathlib import Path
from http.server import SimpleHTTPRequestHandler,ThreadingHTTPServer
from functools import partial
from threading import Thread
from playwright.sync_api import sync_playwright
from urllib.parse import urlsplit
import json,os,argparse
ROOT=Path(os.environ.get('SCP_TEST_ROOT',Path(__file__).resolve().parents[1])).resolve()
ThreadingHTTPServer.request_queue_size=128
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*args):pass
def main():
 args=argparse.ArgumentParser();args.add_argument('--live',action='store_true');args=args.parse_args()
 out=ROOT/'tests/artifacts/visual-v1'/('live'if args.live else'local');out.mkdir(parents=True,exist_ok=True)
 server=None;records=[]
 try:
  if args.live:base='https://deteco.github.io/SCPSurvivor/'
  else:
   server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)));Thread(target=server.serve_forever,daemon=True).start();base=f'http://127.0.0.1:{server.server_port}/'
  with sync_playwright()as pw:
   browser=pw.chromium.launch(headless=True)
   try:
    for entry in (['index.html']if args.live else['dev.html','index.html']):
     for touch in [False,True]:
      ctx=browser.new_context(viewport={'width':390 if touch else 1280,'height':844 if touch else 900},is_mobile=touch,has_touch=touch)
      page=ctx.new_page();errors=[];remote=[]
      page.on('pageerror',lambda e:errors.append(str(e)))
      page.on('console',lambda m:errors.append(m.text)if m.type=='error'else None)
      def route(r):
       if urlsplit(r.request.url).netloc==urlsplit(base).netloc:r.continue_()
       else:remote.append(r.request.url);r.abort()
      page.route('**/*',route)
      try:
       page.goto(base+entry+'?prueba=combate-v2&ensayo=melee&graficos=v1&interfaz=clasica');page.wait_for_selector('#btn-technical-start:visible')
       assert page.locator('#visual-style-note').is_visible()
       page.locator('#btn-technical-start').click();page.wait_for_function("G.Game.state==='playing'")
       page.evaluate("G.Game.togglePause()")
       data=page.evaluate('''async()=>{
        const ids=['guard01','medic01','pursuer01','biological01','warden01'];await G.Sprites.preload(ids);
        const result=[];
        for(const id of ids){
         const sheet=G.Sprites.sheet(id,'Walk'),meta=G.Sprites.animMeta(id,'Walk');
         if(!sheet.ready||sheet.failed||sheet.usedFallback)throw Error('New art failed: '+id);
         if(sheet.img.naturalWidth!==meta.w*meta.n*2||sheet.img.naturalHeight!==meta.h*meta.r*2)throw Error('Atlas bounds: '+id);
         const c=document.createElement('canvas');c.width=256;c.height=256;const x=c.getContext('2d');x.imageSmoothingEnabled=false;
         const a=new G.Sprites.Animator(id);a.cur='Walk';const poses=[];
         for(let row=0;row<8;row++)for(let frame=0;frame<4;frame++){
          a.dir=row;a.frame=frame;x.clearRect(0,0,256,256);a.draw(x,128,200);
          const pixels=x.getImageData(0,0,256,256).data;let alpha=0;for(let p=3;p<pixels.length;p+=4)if(pixels[p])alpha++;
          if(alpha<100)throw Error('Empty/cropped actor '+id+':'+row+':'+frame);poses.push(alpha);
         }
         result.push({id,poses:poses.length,width:sheet.img.naturalWidth,height:sheet.img.naturalHeight,bodyHeight:G.Sprites.bodyHeight(id),radius:G.Sprites.bodyRadius(id)});
        }
        // Presentation-only QA lineup, explicitly frozen, no fabricated combat result.
        const p=G.Game.player;G.EnemyMgr.clear();
        for(let i=0;i<3;i++)G.EnemyMgr.add(new G.Enemy([G.Content.pursuer,G.Content.biological,G.Content.boss][i],p.x+100+i*90,p.y+60,{hp:1,spd:1,dmg:1},i===2));
        p.invuln=0;G.TechnicalUI.tick(p,0);document.getElementById('technical-pause').hidden=true;return result;
       }''')
       page.screenshot(path=str(out/f'{entry[:-5]}-{"touch"if touch else"desktop"}-scene.png'))
       page.goto(base+entry+'?prueba=combate-v2&graficos=clasicos&interfaz=clasica');page.wait_for_selector('#btn-technical-start:visible')
       assert not page.locator('#visual-style-note').is_visible()
       classic=page.evaluate("({enabled:G.TrialVisuals.enabled,path:G.SPRITE_META.guard01.base,height:G.Sprites.bodyHeight('guard01'),radius:G.Sprites.bodyRadius('guard01')})")
       assert not classic['enabled']and classic['path']=='assets/actors/guard01'
       assert classic['height']==data[0]['bodyHeight']and classic['radius']==data[0]['radius']
       assert not errors and not remote,{'errors':errors,'remote':remote}
       records.append({'entry':entry,'touch':touch,'status':'PASS','actors':data,'classic':classic})
      except Exception:
       print(json.dumps({'entry':entry,'touch':touch,'errors':errors,'boot':page.locator('#boot').inner_text()}));page.screenshot(path=str(out/'failure.png'));raise
      finally:ctx.close()
    ctx=browser.new_context(viewport={'width':1280,'height':1080});page=ctx.new_page();page.goto(base+'prueba-visual-v1.html');page.wait_for_function('document.fonts.status==="loaded"')
    assert page.locator('article').count()==5
    for link in page.locator('nav a').all():assert urlsplit(link.get_attribute('href')).path in ['./','/SCPSurvivor/']
    page.screenshot(path=str(out/'modelos.png'),full_page=True);ctx.close()
   finally:browser.close()
  (out/'results.json').write_text(json.dumps({'live':args.live,'status':'PASS','records':records,'method':'Frozen QA lineup and exhaustive 160 walking crops per scenario, asset load and classic comparison. No natural balance, device or performance claim.'},indent=2)+'\n',encoding='utf-8')
  print(json.dumps({'status':'PASS','scenarios':len(records),'posesPerScenario':160,'output':str(out)}))
 finally:
  if server:server.shutdown();server.server_close()
if __name__=='__main__':main()
