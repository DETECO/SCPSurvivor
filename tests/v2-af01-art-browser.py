"""Actual modular renderer, controlled poses only; no new equipment or accepted poses."""
from pathlib import Path
from http.server import SimpleHTTPRequestHandler,ThreadingHTTPServer
from functools import partial
from threading import Thread
from playwright.sync_api import sync_playwright
import json,base64
ROOT=Path(__file__).resolve().parents[1]
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*a):pass
 def copyfile(self,*a):
  try:super().copyfile(*a)
  except(ConnectionResetError,BrokenPipeError):pass
def main():
 out=ROOT/'tests/artifacts/rev-est-0006/af01';out.mkdir(parents=True,exist_ok=True)
 server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)));Thread(target=server.serve_forever,daemon=True).start();records=[]
 try:
  with sync_playwright()as pw:
   browser=pw.chromium.launch(headless=True)
   try:
    for mode in ['16','32']:
     page=browser.new_page(viewport={'width':1000,'height':700});errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
     page.goto(f'http://127.0.0.1:{server.server_port}/?prueba=combate-v2&armas=r1&graficos={mode}');page.wait_for_selector('#btn-technical-start:visible');page.click('#btn-technical-start');page.wait_for_function("()=>G.Game.state==='playing'");page.evaluate('()=>G.Game.togglePause()')
     page.evaluate('()=>G.PersonajesArt.preload()')
     result=page.evaluate('''()=>{
      const player=G.Game.player,old={x:player.x,y:player.y,invuln:player.invuln,flash:player.flash,walking:player.walking,aim:player.aim,weaponAim:player.weaponAim,dex:player.anim.dex};
      const before=JSON.stringify(player.fieldWeapons),canvas=document.createElement('canvas');canvas.width=768;canvas.height=448;const ctx=canvas.getContext('2d'),draw=ctx.drawImage,frames=[];
      ctx.drawImage=function(image,...args){if(image?.src?.includes('/AF01/'))frames.push(image.src);return draw.call(this,image,...args);};
      ctx.fillStyle='#172a25';ctx.fillRect(0,0,768,448);ctx.font='12px monospace';const dirs=['E','SE','S','SW','W','NW','N','NE'];
      try{
       for(let row=0;row<4;row++)for(let i=0;i<8;i++){
        const angle=i*Math.PI/4,count=row%2+1;player.x=48+i*96;player.y=84+row*112;player.invuln=0;player.flash=0;player.walking=false;player.weaponAim=angle;player.aim=angle;player.anim.dex=row<2?'guard01':'medic01';
        const weapons=Array.from({length:count},(_,index)=>({model:'pistol',flash:0,_aimTarget:{hp:100,x:player.x+Math.cos(angle+index*Math.PI/2)*100,y:player.y+Math.sin(angle+index*Math.PI/2)*100}}));
        G.PersonajesArt.drawWeapons(ctx,player,{behind:true},weapons);G.PersonajesArt.draw(ctx,player.anim,player.x,player.y);G.PersonajesArt.drawWeapons(ctx,player,{behind:false},weapons);
        ctx.fillStyle='#e9dfb4';ctx.fillText(`${row<2?'G':'M'} ${count} · ${dirs[i]}`,i*96+8,row*112+18);
       }
      }finally{for(const key of ['x','y','invuln','flash','walking','aim','weaponAim'])player[key]=old[key];player.anim.dex=old.dex;}
      return{png:canvas.toDataURL(),frames,unchanged:before===JSON.stringify(player.fieldWeapons),loaded:G.AF01ApprovedArt.inspect()};
     }''')
     assert result['unchanged']and result['loaded']['loaded']==16 and len(result['frames'])==48 and not errors,result
     (out/f'montaje-{mode}.png').write_bytes(base64.b64decode(result.pop('png').split(',')[1]));records.append({'status':'PASS','mode':mode,**result});page.close()
   finally:browser.close()
 finally:server.shutdown();server.server_close()
 (out/'art-browser.json').write_text(json.dumps({'status':'PASS','records':records,'method':'Controlled static poses through actual PersonajesArt; two existing actors, one/two pistols and eight directions. Not human acceptance or paired katana/laser validation.'},indent=2)+'\n',encoding='utf-8');print(json.dumps({'status':'PASS','scenarios':len(records)}))
if __name__=='__main__':main()
