"""LOT007: real DOM/game. Forced loadout/position/HP/timing are explicit QA, not balance evidence."""
from pathlib import Path
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from functools import partial
from threading import Thread
from playwright.sync_api import sync_playwright
import json, os, argparse, hashlib, re

ROOT = Path(os.environ.get('SCP_TEST_ROOT', Path(__file__).resolve().parents[1]))
OUT = Path(os.environ.get('SCP_TEST_OUTPUT', ROOT/'tests/artifacts/lot-est-007'))
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self, *args): pass
 def copyfile(self, *args):
  try: super().copyfile(*args)
  except (ConnectionResetError, BrokenPipeError, ConnectionAbortedError): pass

BOUNDS = '''()=>{
 const ids=['scene-hud','corner-hp','corner-xp','btn-technical-pause','radar-wrap','field-weapons','btn-field-weapon-0','btn-field-weapon-1','btn-ability','corner-stick','corner-objectives','rift-boss-health'];
 const rows=ids.map(id=>{const n=document.getElementById(id),r=n.getBoundingClientRect();return{id,visible:!n.hidden&&r.width>0&&r.height>0,x:r.x,y:r.y,width:r.width,height:r.height};});
 const outside=rows.filter(r=>r.visible&&(r.x<-.5||r.y<-.5||r.x+r.width>innerWidth+.5||r.y+r.height>innerHeight+.5));
 const overlaps=(a,b)=>a.visible&&b.visible&&a.x<b.x+b.width&&a.x+a.width>b.x&&a.y<b.y+b.height&&a.y+a.height>b.y;
 const collisions=[];for(const [a,b]of [['scene-hud','radar-wrap'],['field-weapons','btn-ability'],['field-weapons','corner-stick'],['corner-objectives','radar-wrap']])if(overlaps(rows.find(x=>x.id===a),rows.find(x=>x.id===b)))collisions.push([a,b]);
 const small=rows.filter(r=>['btn-field-weapon-0','btn-field-weapon-1','btn-ability','btn-technical-pause'].includes(r.id)&&r.visible&&(r.width<44||r.height<44));
 return{rows,outside,collisions,small,scroll:document.documentElement.scrollHeight>innerHeight||document.documentElement.scrollWidth>innerWidth};
}'''
FREEZE = '''()=>({map:G.Expedition.state.v2.mapTime,room:G.RiftExpedition.state.time,elapsed:G.Expedition.state.elapsed,powers:G.RiftPowers.state,ability:G.Game.player.fieldAbility,copies:G.Game.player.fieldWeapons.map(w=>({ammo:w.ammo,reload:w.reload,wait:w.shotWait})),x:G.Game.player.x,y:G.Game.player.y})'''
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--probe',action='store_true');ap.add_argument('--live',action='store_true');args=ap.parse_args()
 OUT.mkdir(parents=True,exist_ok=True);server=None
 if args.live: base='https://deteco.github.io/SCPSurvivor/'
 else:
  server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)));Thread(target=server.serve_forever,daemon=True).start();base=f'http://127.0.0.1:{server.server_port}/'
 files=['dev.html','css/technical.css','css/operations-menu.css','css/corner-hud.css']+re.findall(r'<script defer src="([^"]+)"', (ROOT/'dev.html').read_text(encoding='utf-8'))
 if (ROOT/'index.html').exists():files+=['index.html','js/app.min.js']
 snapshot={name:hashlib.sha256((ROOT/name).read_bytes()).hexdigest() for name in files}
 rows=[]
 try:
  with sync_playwright() as pw:
   browser=pw.chromium.launch(headless=True)
   for index,(w,h) in enumerate([(844,390),(932,430),(390,844),(1280,900)]):
    context=browser.new_context(viewport={'width':w,'height':h},has_touch=w<1000,is_mobile=w<1000)
    p=context.new_page();errors=[];p.on('pageerror',lambda e:errors.append(str(e)))
    mode='16' if index%2 else '32';entry='index.html' if args.live or index%2==0 else 'dev.html'
    p.goto(f'{base}{entry}?prueba=combate-v2&graficos={mode}');p.wait_for_selector('#btn-technical-start:visible')
    if index%2:p.select_option('#field-role','medic',force=True)
    p.click('#btn-technical-start');p.wait_for_function("()=>G.Game.state==='playing'&&!!document.body.dataset.cornerHud")
    p.evaluate('()=>{G.Game.player.invuln=1e6;}');p.wait_for_timeout(100)
    b=p.evaluate(BOUNDS);p.screenshot(path=str(OUT/f'{w}x{h}-normal.png'))
    assert not b['outside'] and not b['collisions'] and not b['small'] and not b['scroll'],b
    assert p.locator('#btn-ability svg').count()==1
    record={'viewport':[w,h],'graphics':mode,'soldier':'medic' if index%2 else 'guard','entry':entry,'normal':b}
    if args.probe: rows.append(record);context.close();continue
    if w<1000:
     client=context.new_cdp_session(p)
     client.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':40,'y':h-48}]})
     client.send('Input.dispatchTouchEvent',{'type':'touchMove','touchPoints':[{'x':85,'y':h-48}]})
     p.wait_for_timeout(100);vector=p.evaluate('()=>G.Touch.vector()');assert vector and vector[0]>.9,vector
     assert p.locator('#corner-stick').is_hidden()
     client.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]});p.wait_for_timeout(50)
     assert p.evaluate('()=>G.Touch.vector()===null');record['floatingTouch']=True
    # Slot actions still open the existing paused equipment; no new equip action.
    p.click('#btn-field-weapon-0');p.wait_for_function("()=>G.Game.state==='paused'")
    frozen=p.evaluate(FREEZE);p.wait_for_timeout(160);assert p.evaluate(FREEZE)==frozen
    for id in ['btn-technical-resume','btn-technical-menu']:
     rect=p.locator('#'+id).bounding_box();assert rect and rect['y']>=0 and rect['y']+rect['height']<=h,rect
    p.screenshot(path=str(OUT/f'{w}x{h}-equipo.png'));p.click('#btn-technical-resume')
    # Disclosed QA loadout makes two current real models visible; use real ability and reload clocks.
    p.evaluate("()=>{const p=G.Game.player;G.FieldCombat.reset(p,[G.FieldCatalog.makeWeapon('pistol','hud:pistol',[]),G.FieldCatalog.makeWeapon('smg','hud:smg',[])]);p.hp=p.maxHp-7;G.TechnicalUI.ability();const w=p.fieldWeapons[1];w.ammo=0;w.reload=w.reloadTime;for(const c of p.fieldWeapons)c.shotWait=1e6;}")
    p.wait_for_timeout(80);p.screenshot(path=str(OUT/f'{w}x{h}-recarga.png'))
    meters=p.evaluate("()=>({hp:document.getElementById('corner-hp').value,real:G.Game.player.hp,label:document.getElementById('corner-ability-label').textContent,reload:[...document.querySelectorAll('.corner-reload')].map(n=>({value:n.value,max:n.max})),ring:document.getElementById('corner-ability-ring').getAttribute('stroke-dashoffset')})")
    assert meters['hp']==meters['real'] and ' s' in meters['label'] and len(meters['reload'])==2 and float(meters['ring'])>0,meters
    p.click('#btn-technical-pause');frozen=p.evaluate(FREEZE);p.wait_for_timeout(160);assert p.evaluate(FREEZE)==frozen;p.click('#btn-technical-resume')
    p.wait_for_function('()=>G.Game.player.fieldWeapons[1].reload===0',timeout=7000)
    # Actual level-up path, real choices and paused clocks. XP injection only.
    p.evaluate("()=>{const p=G.Game.player;G.Pickups.drop('xp',p.x,p.y,(p.xpNext-p.xp)/p.xpMul);}")
    p.wait_for_selector('#upgrade-cards button:visible');frozen=p.evaluate(FREEZE);p.wait_for_timeout(160);assert p.evaluate(FREEZE)==frozen
    p.screenshot(path=str(OUT/f'{w}x{h}-mejoras.png'));buttons=p.locator('#upgrade-cards button');assert buttons.count()==3
    assert not any(x in p.locator('#upgrade-cards').inner_text() for x in ['SUPERVIVENCIA','UTILIDAD'])
    for button in buttons.all():
     rect=button.bounding_box();assert rect and rect['width']>=44 and rect['height']>=44 and rect['y']>=0 and rect['y']+rect['height']<=h,rect
    buttons.first.click();p.wait_for_function("()=>G.Expedition.state.phase!=='levelup'")
    record['meters']=meters;record['equipmentAndPauseFrozen']=True;record['realLevelChoice']=True
    # Real room entry + companion; deterministic grade/presence as in the existing rift test.
    p.goto(f'{base}{entry}?prueba=combate-v2&ensayo=grietas&grado=D2&apoyo=si&graficos={mode}')
    p.wait_for_selector('#btn-technical-start:visible')
    if index%2:p.select_option('#field-role','medic',force=True)
    p.click('#btn-technical-start')
    p.evaluate('()=>{const p=G.Game.player;p.invuln=1e6;const r=G.RiftExpedition.state.portal;p.x=r.x;p.y=r.y;G.Expedition.update(1/60);}')
    p.wait_for_function("()=>G.RiftExpedition.state.status==='combat'")
    p.wait_for_timeout(100);p.screenshot(path=str(OUT/f'{w}x{h}-recinto.png'))
    room=p.evaluate(BOUNDS);assert not room['outside'] and not room['collisions'] and not room['small'],room
    assert p.locator('#rift-boss-health').bounding_box()['width']>=100
    assert 'Larva de Vidrio' in p.locator('#corner-context').text_content()
    assert 'BIO-' in p.locator('#field-status').text_content() or 'D2' in p.locator('#field-status').text_content()
    bubble=p.evaluate('''()=>{const cam=G.Camera,n=G.RiftCompanion.state,canvas=document.getElementById('game').getBoundingClientRect();let positions=[];const occupied=['scene-hud','corner-objectives','rift-boss-health','radar-wrap','field-weapons','btn-ability','btn-terminal','chest-status','terminal-prompt','tactical-status','corner-stick'].map(id=>{const n=document.getElementById(id),b=n?.getBoundingClientRect();return n&&!n.hidden&&b.width&&b.height?b:null;}).filter(Boolean);for(const [x,y]of [[0,0],[innerWidth-1,innerHeight-1],[innerWidth/2,innerHeight/2]]){const target=G.CornerHUD.placeBubble(cam.left()+x/cam.scale,cam.top()+y/cam.scale,230,60,cam);if(target){const b={x:canvas.left+(target.x-cam.left())*cam.scale,y:canvas.top+(target.y-cam.top())*cam.scale,width:230*cam.scale,height:60*cam.scale};if(b.x<canvas.left||b.y<canvas.top||b.x+b.width>canvas.right||b.y+b.height>canvas.bottom||occupied.some(o=>b.x<o.right&&b.x+b.width>o.left&&b.y<o.bottom&&b.y+b.height>o.top))throw Error('bubble overlaps HUD or leaves viewport');}positions.push(target);}return{npc:!!n,positions};}''')
    assert bubble['npc'];record['room']=room;record['bubble']=bubble
    # Disclosed deterministic fast-forward to retreat warning; clocks/return data stay authoritative.
    p.evaluate('()=>{const boss=G.EnemyMgr.all().find(e=>e.dimensional);boss.hp=boss.maxHp=1e6;for(let i=0;i<89*30;i++)G.Expedition.update(1/30);}')
    p.wait_for_timeout(80);p.screenshot(path=str(OUT/f'{w}x{h}-retirada.png'))
    assert 'RETIRADA' in p.locator('#rift-locator').text_content()
    suppressed=p.evaluate('()=>{let count=0;const c=document.createElement("canvas").getContext("2d");const fn=c.fillText.bind(c);c.fillText=(...a)=>{count++;fn(...a)};G.RiftCompanion.drawBubble(c,{priority:true});return count===0;}');assert suppressed
    if index%2==0:
     p.evaluate("()=>{const p=G.Game.player;for(const id of ['esporario','malla','portador']){G.RiftPowers.victory('qa-hud:'+id,p,{rng:()=>0,anomalyId:id});G.RiftPowers.choose(id,p);}}")
    # Guarantee the reward branch in QA only; later victories legitimately may grant no power.
    p.evaluate('()=>{const win=G.RiftPowers.victory;G.RiftPowers.victory=(id,p,options)=>win(id,p,{...options,rng:()=>0});try{G.EnemyMgr.all().find(e=>e.dimensional).hurt(1e9);G.Expedition.update(1/30);}finally{G.RiftPowers.victory=win;}}')
    p.wait_for_selector('#rift-power-choice button:visible');frozen=p.evaluate(FREEZE);p.wait_for_timeout(160);assert p.evaluate(FREEZE)==frozen
    p.screenshot(path=str(OUT/f'{w}x{h}-poder.png'));p.locator('#rift-power-choice button').first.click()
    if index%2==0:
     p.wait_for_function("()=>document.getElementById('rift-power-title').textContent.startsWith('Nuevo:')")
     frozen=p.evaluate(FREEZE);p.wait_for_timeout(160);assert p.evaluate(FREEZE)==frozen
     options=p.locator('#rift-power-options button');assert options.count()==4
     for button in options.all():
      rect=button.bounding_box();assert rect and rect['height']>=44 and rect['y']>=0 and rect['y']+rect['height']<=h,rect
     p.screenshot(path=str(OUT/f'{w}x{h}-reemplazo.png'));options.first.click();record['fourthPowerReplacement']=True
    p.evaluate('()=>{const p=G.Game.player,r=G.RiftExpedition.state;p.x=r.exit.x;p.y=r.exit.y;G.Expedition.update(1/30);}')
    assert p.evaluate('()=>!G.RiftExpedition.state.active') and p.evaluate('()=>G.RiftPowers.state.owned.length')==(3 if index%2==0 else 1)
    record['roomChoiceFrozenAndReturn']=True;record['dangerSuppressesBubble']=True
    assert not errors,errors;rows.append(record);print(json.dumps({'viewport':[w,h],'status':'PASS'}),flush=True);context.close()
   browser.close()
 finally:
  if server:server.shutdown();server.server_close()
 drift=[name for name,digest in snapshot.items() if hashlib.sha256((ROOT/name).read_bytes()).hexdigest()!=digest]
 (OUT/'browser.json').write_text(json.dumps({'status':'PASS' if not drift else 'SOURCE_DRIFT','probe':args.probe,'live':args.live,'records':rows,'physicalPhone':False,'runtimeSnapshot':snapshot,'sourceDrift':drift,'method':'Real game/UI; forced HP/loadout/XP/grade/position/fast-forward, third-party victory RNG override and preparatory powers only in QA, not natural balance.'},ensure_ascii=False,indent=2),encoding='utf-8')
 assert not drift,drift
 print(json.dumps({'status':'PASS','viewports':len(rows),'probe':args.probe}))
if __name__=='__main__': main()
