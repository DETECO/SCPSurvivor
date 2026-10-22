"""Integration of existing PERSONAJES PNG, with controlled visual QA fixtures."""
from pathlib import Path
from http.server import SimpleHTTPRequestHandler,ThreadingHTTPServer
from functools import partial
from threading import Thread
from playwright.sync_api import sync_playwright
from urllib.parse import urlsplit
import argparse,json,os
ROOT=Path(os.environ.get('SCP_TEST_ROOT',Path(__file__).resolve().parents[1])).resolve()
ThreadingHTTPServer.request_queue_size=128
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*a):pass
def run(browser,base,entry,touch,mode,out):
 ctx=browser.new_context(viewport={'width':390 if touch else 1280,'height':844 if touch else 900},is_mobile=touch,has_touch=touch);page=ctx.new_page();errors=[];remote=[];bad=[]
 page.on('pageerror',lambda e:errors.append(str(e)));page.on('console',lambda m:errors.append(m.text)if m.type=='error'else None);page.on('response',lambda r:bad.append([r.status,r.url])if r.status>=400 else None)
 def route(r):
  if urlsplit(r.request.url).netloc==urlsplit(base).netloc:r.continue_()
  else:remote.append(r.request.url);r.abort()
 page.route('**/*',route)
 try:
  page.goto(base+entry+'?prueba=combate-v2&ensayo=terminal&graficos='+mode);page.wait_for_selector('#btn-technical-start:visible')
  assert page.locator('#character-resolution').input_value()==mode
  assert mode+'×'+mode in page.locator('#visual-style-note').inner_text()
  # Real selector navigation must retain the chosen practice.
  other='16'if mode=='32'else'32';page.locator('#character-resolution').select_option(other);page.wait_for_url('**graficos='+other)
  assert 'ensayo=terminal'in page.url
  page.locator('#character-resolution').select_option(mode);page.wait_for_url('**graficos='+mode);page.locator('#btn-technical-start').click();page.wait_for_function("G.Game.state==='playing'");page.evaluate('G.Game.togglePause()')
  data=page.evaluate('''async()=>{
   const ids=['guard01','medic01','support01','pursuer01','biological01','warden01'];await G.Sprites.preload(ids);await G.PersonajesArt.preload();
   const p=G.Game.player,before=JSON.stringify({r:p.r,h:p.maxHp,s:p.baseSpd,w:G.FieldCombat.exportData()}),result=[];
   for(const id of ids){
    const m=G.SPRITE_META[id],cat=G.CharacterCatalog.modes[G.TrialVisuals.mode][m.characterId],canvas=document.createElement('canvas');canvas.width=canvas.height=300;const x=canvas.getContext('2d');let crops=0;
    for(const action of ['Idle','Walk','Attack','Hurt','Faint']){
     const sheet=G.Sprites.sheet(id,action),a=m.a[action];if(!sheet.ready||sheet.failed||sheet.usedFallback)throw Error('Failed native asset '+id+'/'+action);
     if(sheet.img.naturalWidth!==a.sourceW*a.n||sheet.img.naturalHeight!==a.sourceH*8)throw Error('Wrong native size');
     const anim=new G.Sprites.Animator(id);anim.cur=action;
     for(let row=0;row<8;row++)for(let f=0;f<a.n;f++){
      anim.dir=row;anim.frame=f;x.clearRect(0,0,300,300);anim.draw(x,150,240);
      let count=0,rgba=x.getImageData(0,0,300,300).data;for(let k=3;k<rgba.length;k+=4)if(rgba[k])count++;
      if(count<25)throw Error('Empty native pose '+id+'/'+action+'/'+row+'/'+f);crops++;
     }
    }
    result.push({id,characterId:m.characterId,size:m.characterSize,crops,bodyHeight:G.Sprites.bodyHeight(id),radius:G.Sprites.bodyRadius(id)});
   }
   // Real player modular body and two independent targets, render only, no simulated reward.
   const canvas=document.createElement('canvas');canvas.width=canvas.height=300;const c=canvas.getContext('2d');
   const angle=p.weaponAim,targets=p.fieldWeapons.map(w=>w._aimTarget);p.fieldWeapons[0]._aimTarget={x:p.x+90,y:p.y,hp:100};p.fieldWeapons[1]._aimTarget={x:p.x-90,y:p.y,hp:100};
   try{if(!G.PersonajesArt.draw(c,p.anim,150,240,{}))throw Error('Player modular body unavailable');G.PersonajesArt.drawWeapons(c,p,{behind:true},p.fieldWeapons);G.PersonajesArt.drawWeapons(c,p,{behind:false},p.fieldWeapons);}finally{p.weaponAim=angle;p.fieldWeapons.forEach((w,i)=>w._aimTarget=targets[i]);}
   if(before!==JSON.stringify({r:p.r,h:p.maxHp,s:p.baseSpd,w:G.FieldCombat.exportData()}))throw Error('Renderer mutated gameplay');
   G.MapTrial.arrive();const allies=G.MapTrial.allies;if(allies.length!==2||allies.some(a=>a.dex!=='support01'))throw Error('Yellow supports not installed');
   G.EnemyMgr.clear();G.MapTrial.updateAllies(1,p);
   const supports=G.MapTrial.allies;p.x=(supports[0].x+supports[1].x)/2;p.y=(supports[0].y+supports[1].y)/2+100;G.Camera.x=p.x;G.Camera.y=p.y;
   for(let i=0;i<3;i++)G.EnemyMgr.add(new G.Enemy([G.Content.pursuer,G.Content.biological,G.Content.boss][i],p.x+85+i*80,p.y+65,{hp:1,spd:1,dmg:1},i===2));
   // Controlled visual placement of actual support drawables beside player, no AI/loot acceptance.
   const drawn=G.MapTrial.drawables();let allyDraws=0;const original=G.PersonajesArt.drawAlly;
   try{G.PersonajesArt.drawAlly=(ctx,ally)=>{allyDraws++;return original(ctx,{...ally,x:p.x-80+allyDraws*38,y:p.y+65});};for(const a of drawn)a.draw(c);}finally{G.PersonajesArt.drawAlly=original;}
   if(allyDraws!==2)throw Error('Support draw not wired');
   document.getElementById('technical-pause').hidden=true;p.invuln=0;
   return{actors:result,crops:result.reduce((s,a)=>s+a.crops,0),allies,physical:{r:p.r,h:p.maxHp,s:p.baseSpd},modular:true};
  }''')
  page.screenshot(path=str(out/f'{entry[:-5]}-{"touch"if touch else"desktop"}-{mode}.png'))
  assert data['crops']==624
  assert not errors and not remote and not bad,{'errors':errors,'remote':remote,'http':bad}
  return{'status':'PASS','entry':entry,'touch':touch,'mode':mode,**data}
 except Exception:
  print(json.dumps({'entry':entry,'touch':touch,'mode':mode,'errors':errors,'http':bad}));page.screenshot(path=str(out/'failure.png'));raise
 finally:ctx.close()
def main():
 parser=argparse.ArgumentParser();parser.add_argument('--live',action='store_true');args=parser.parse_args();server=None;out=ROOT/'tests/artifacts/personajes'/('live'if args.live else'local');out.mkdir(parents=True,exist_ok=True)
 try:
  if args.live:base='https://deteco.github.io/SCPSurvivor/'
  else:server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)));Thread(target=server.serve_forever,daemon=True).start();base=f'http://127.0.0.1:{server.server_port}/'
  with sync_playwright()as p:
   browser=p.chromium.launch(headless=True)
   try:records=[run(browser,base,e,t,m,out)for e in(['index.html']if args.live else['dev.html','index.html'])for t in[False,True]for m in['16','32']]
   finally:browser.close()
  physical=[r['physical']for r in records];assert all(x==physical[0]for x in physical)
  (out/'results.json').write_text(json.dumps({'status':'PASS','live':args.live,'records':records,'method':'624 native animation crops and controlled modular targets/supports; not natural balance, physical phone, final art or performance.'},indent=2)+'\n',encoding='utf-8');print(json.dumps({'status':'PASS','scenarios':len(records),'cropsPerScenario':624,'resolutions':[16,32]}))
 finally:
  if server:server.shutdown();server.server_close()
if __name__=='__main__':main()
