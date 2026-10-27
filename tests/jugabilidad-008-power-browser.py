"""Actual five selected powers and FX, in an explicitly isolated QA arena; no difficulty claim."""
from pathlib import Path
from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
from functools import partial
from threading import Thread
from playwright.sync_api import sync_playwright
import json,os,argparse
ROOT=Path(os.environ.get('SCP_TEST_ROOT',Path(__file__).resolve().parents[1]));OUT=Path(os.environ.get('SCP_TEST_OUTPUT',ROOT/'tests/artifacts/lot-est-008/powers'))
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*a):pass
 def copyfile(self,*a):
  try:super().copyfile(*a)
  except(ConnectionResetError,BrokenPipeError,ConnectionAbortedError):pass
SETUP='''async()=>{const p=G.Game.player;G.Game.debugSpeed(1e-7);await G.PersonajesArt.preload();G.World.reset(1);G.World.setFixture({minX:-20,maxX:20,minY:-20,maxY:20,walls:[],props:[]});p.x=p.y=16;G.Camera.x=G.Camera.y=16;G.EnemyMgr.clear();G.Projectiles.clear();for(const w of p.fieldWeapons)w.shotWait=1e6;window.qaPowerDraws=[];const original=CanvasRenderingContext2D.prototype.drawImage;CanvasRenderingContext2D.prototype.drawImage=function(im,...args){if(im?.src?.includes('/assets/powers/'))qaPowerDraws.push({src:im.src,args});return original.call(this,im,...args);};}'''
START='''id=>{const p=G.Game.player;G.EnemyMgr.clear();G.Projectiles.clear();G.FX.clear();G.RiftPowers.clear();const e=G.EnemyMgr.add(new G.Enemy({...G.Content.pursuer,hp:10000,spd:0,dmg:0},86,16,{hp:1,dmg:1,spd:1}));G.EnemyMgr.rebuildGrid();G.RiftPowers.victory('qa-fx:'+id,p,{rng:()=>0,anomalyId:id});G.RiftPowers.choose(id,p);window.qaPowerEnemy=e;qaPowerDraws.length=0;for(let i=0;i<10;i++){G.RiftPowers.tick(.04,p);G.Projectiles.update(.04,p,G.EnemyMgr.all());G.Combat.resolve(.04,p,.04*i);}G.TechnicalUI.tick(p,0);return{state:G.RiftPowers.state,damage:10000-e.hp};}'''
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--live',action='store_true');args=ap.parse_args();server=None;OUT.mkdir(parents=True,exist_ok=True);rows=[]
 if args.live:base='https://deteco.github.io/SCPSurvivor/'
 else:server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)));Thread(target=server.serve_forever,daemon=True).start();base=f'http://127.0.0.1:{server.server_port}/'
 try:
  with sync_playwright()as pw:
   b=pw.chromium.launch(headless=True)
   for mode in[16,32]:
    p=b.new_page(viewport={'width':844,'height':390});errors=[];p.on('pageerror',lambda e:errors.append(str(e)));p.goto(f'{base}index.html?prueba=combate-v2&graficos={mode}');p.wait_for_selector('#btn-technical-start:visible');p.click('#btn-technical-start');p.wait_for_function('()=>G.RiftPowerArt.status.loaded===10');p.evaluate(SETUP)
    for id in['esporario','larva','malla','portador','huesped']:
     start=p.evaluate(START,id);p.wait_for_timeout(80);draws=p.evaluate('()=>qaPowerDraws');assert any('/'+str(mode)+'/'in d['src']for d in draws),draws
     assert p.locator('#corner-powers').is_visible();p.screenshot(path=str(OUT/f'{id}-{mode}.png'))
     result=p.evaluate('''()=>{const p=G.Game.player,before=JSON.stringify(G.RiftPowers.state),c=document.createElement('canvas').getContext('2d');G.RiftPowerArt.draw(c,p);const readOnly=before===JSON.stringify(G.RiftPowers.state);for(let i=0;i<55;i++){G.RiftPowers.tick(.04,p);G.Projectiles.update(.04,p,G.EnemyMgr.all());G.Combat.resolve(.04,p,1);}return{readOnly,damage:10000-qaPowerEnemy.hp,cycles:G.RiftPowers.state.cycles.length,name:G.RiftPowers.state.owned[0].name};}''');assert result['readOnly'] and result['damage']>0 and result['cycles']==0,result
     rows.append({'mode':mode,'id':id,'earlyDamage':start['damage'],'actual':result,'drawCalls':len(draws),'selectedPng':draws[0]['src'].split('/assets/')[1]})
    lineup=p.evaluate('''()=>{const P=G.RiftPowers,pl=G.Game.player;P.clear();for(const [n,id] of ['esporario','larva','malla'].entries()){P.victory('qa-hud:'+n,pl,{rng:()=>0,anomalyId:id});if(!P.choose(id,pl).accepted)throw Error('acquisition failed');}P.victory('qa-hud:4',pl,{rng:()=>0,anomalyId:'portador'});const needs=P.choose('portador',pl).requiresReplacement;const accepted=P.choose('portador',pl,{replaceId:'malla'}).accepted;G.TechnicalUI.tick(pl,0);return{needs,accepted,ids:P.state.owned.map(o=>o.id)};}''')
    assert lineup=={'needs':True,'accepted':True,'ids':['esporario','larva','portador']},lineup
    for w,h in [(390,844),(844,390),(1280,900),(932,430)]:
     p.set_viewport_size({'width':w,'height':h});p.wait_for_timeout(40)
     layout=p.evaluate('''()=>{const box=id=>{const e=document.getElementById(id),r=e.getBoundingClientRect();return{visible:!e.hidden&&r.width>0&&r.height>0,x:r.x,y:r.y,right:r.right,bottom:r.bottom}};return{hints:box('corner-hints'),powers:box('corner-powers'),weapons:box('field-weapons'),ability:box('btn-ability'),scroll:document.documentElement.scrollWidth>innerWidth||document.documentElement.scrollHeight>innerHeight,viewport:[innerWidth,innerHeight],count:document.querySelectorAll('#corner-powers>span').length};}''')
     a=layout['powers'];assert layout['count']==3 and a['visible'] and a['x']>=0 and a['right']<=w+1 and a['y']>=0 and a['bottom']<=h+1 and not layout['scroll'],layout
     p.screenshot(path=str(OUT/f'tres-poderes-{mode}-{w}x{h}.png'))
    rows.append({'mode':mode,'replacement':lineup,'hudViewports':4})
    assert not errors,errors;p.close()
   b.close()
 finally:
  if server:server.shutdown();server.server_close()
 (OUT/'browser.json').write_text(json.dumps({'status':'PASS','records':rows,'live':args.live,'method':'Actual damage/projectiles/renderer on forced stationary targets and isolated world; not natural balance or phone.'},ensure_ascii=False,indent=2),encoding='utf-8');print(json.dumps({'status':'PASS','selectedPowersAndModes':len(rows)}))
if __name__=='__main__':main()
