"""Real image requests and engine recovery. QA pauses controller and advances engine explicitly."""
from pathlib import Path
from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
from functools import partial
from threading import Thread
from playwright.async_api import async_playwright
import asyncio,json,argparse,os

ROOT=Path(os.environ.get('SCP_TEST_ROOT',Path(__file__).resolve().parents[1]))
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*args):pass
 def copyfile(self,*args):
  try:super().copyfile(*args)
  except(ConnectionResetError,ConnectionAbortedError,BrokenPipeError):pass

async def main():
 ap=argparse.ArgumentParser();ap.add_argument('--live',action='store_true');args=ap.parse_args();server=None
 if args.live:base='https://deteco.github.io/SCPSurvivor/'
 else:
  server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)));Thread(target=server.serve_forever,daemon=True).start();base=f'http://127.0.0.1:{server.server_port}/'
 out=Path(os.environ.get('SCP_TEST_OUTPUT',str(ROOT/'tests/artifacts/grietas-integrales/loading-alias')));out.mkdir(parents=True,exist_ok=True);rows=[]
 try:
  async with async_playwright()as pw:
   browser=await pw.chromium.launch(headless=True)
   for kind in ['missing','slow','timeout']:
    ctx=await browser.new_context(viewport={'width':390,'height':844});page=await ctx.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)));release=asyncio.Event()
    async def asset(route):
     try:
      if kind=='missing':await route.fulfill(status=404,body='missing test asset');return
      await release.wait()
      await route.fulfill(status=200,content_type='image/png',body=(ROOT/'assets/anomalias-biologicas/32/esporario/Attack1.png').read_bytes())
     except Exception:pass
    await page.route('**/anomalias-biologicas/32/esporario/Attack1.png',asset)
    await page.goto(base+'index.html?prueba=combate-v2&ensayo=grietas&grado=D1&apoyo=no&graficos=32',wait_until='domcontentloaded');await page.locator('#btn-technical-start').click();await page.wait_for_function("()=>G.Game.state==='playing'")
    await page.evaluate('''()=>{G.Game.togglePause();const p=G.Game.player,r=G.RiftExpedition.state.portal;p.x=r.x;p.y=r.y;
     window.qaLoad={fixture:G.World.fixture,enemies:G.EnemyMgr.all(),hp:p.hp,ammo:G.FieldCombat.state.ammo};
     G.Expedition.update(1/60);qaLoad.clock=G.Expedition.state.v2.mapTime;qaLoad.ammo=G.FieldCombat.state.ammo;qaLoad.hp=p.hp;if(!G.RiftExpedition.state.active)throw Error('No entry');}''')
    if kind=='missing':
     await page.wait_for_function("()=>G.RiftAnomalies.loading('esporario').failed.length>0")
     await page.evaluate('()=>G.Expedition.update(.1)')
    elif kind=='timeout':await page.evaluate('()=>{for(let i=0;i<102&&G.RiftExpedition.state.active;i++)G.Expedition.update(.1);}')
    else:
     await page.evaluate('()=>G.Expedition.update(1)');assert await page.evaluate("()=>G.RiftExpedition.state.status==='entering'")
     release.set();await page.wait_for_function("()=>G.RiftAnomalies.ready('esporario')")
     await page.evaluate('()=>{for(let i=0;i<6;i++)G.Expedition.update(.1);}')
    data=await page.evaluate('''()=>({active:G.RiftExpedition.state.active,status:G.RiftExpedition.state.status,failures:G.RiftExpedition.state.technicalFailures,
     notice:G.RiftExpedition.state.notice,clock:G.Expedition.state.v2.mapTime===qaLoad.clock,hp:G.Game.player.hp===qaLoad.hp,ammo:G.FieldCombat.state.ammo===qaLoad.ammo,
     fixture:G.World.fixture===qaLoad.fixture,enemies:G.EnemyMgr.all()===qaLoad.enemies,powers:G.RiftPowers.state.owned.length,count:G.RiftExpedition.state.director.appearanceCount})''')
    assert data['clock']and data['hp']and data['ammo']and data['count']==1 and not errors,data
    if kind=='slow':assert data['active']and data['status']=='combat'and not data['failures'],data
    else:assert not data['active']and data['fixture']and data['enemies']and data['powers']==0 and len(data['failures'])==1 and data['notice'],data
    rows.append({'case':kind,'result':data});release.set();await page.screenshot(path=str(out/(kind+'.png')));await ctx.close();print(json.dumps({'case':kind,'status':'PASS'}),flush=True)
   aliases=['?prueba=mapa-v2&premios=grieta','?prueba=combate-v2&premios=grieta','?prueba=infinito-v2&premios=grieta']
   if args.live:aliases.append('?premios=grieta')
   for query in aliases:
    page=await browser.new_page();await page.goto(base+'index.html'+query,wait_until='domcontentloaded');await page.locator('#btn-technical-start').click();await page.wait_for_function("()=>G.Game.state==='playing'")
    data=await page.evaluate('()=>({url:location.href,practice:G.RiftExpedition.state.practice,portal:!!G.RiftExpedition.state.portal,legacy:G.DimensionalRifts.enabled})');assert data['practice']and data['portal']and not data['legacy'],data;rows.append({'alias':query,'result':data});await page.close()
   await browser.close()
 finally:
  if server:server.shutdown();server.server_close()
 (out/'loading-alias.json').write_text(json.dumps({'status':'PASS','live':args.live,'records':rows,'method':'Intercept one BIO atlas404/delayed; pause controller and step engine for exact recovery comparison. Alias tests use normal start. No natural balance claim.'},ensure_ascii=False,indent=2),encoding='utf-8')
 print(json.dumps({'status':'PASS','cases':len(rows)}))
if __name__=='__main__':asyncio.run(main())
