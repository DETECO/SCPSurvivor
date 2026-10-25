"""LOT006 local renderer/combat QA. Pose/loadout/HP/position injections are explicit, not natural balance."""
from pathlib import Path
from http.server import ThreadingHTTPServer,SimpleHTTPRequestHandler
from functools import partial
from threading import Thread
from playwright.sync_api import sync_playwright
import json,base64
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'tests/artifacts/lot-est-006';OUT.mkdir(parents=True,exist_ok=True)
class Quiet(SimpleHTTPRequestHandler):
 def log_message(self,*a):pass
 def copyfile(self,*a):
  try:super().copyfile(*a)
  except(ConnectionResetError,BrokenPipeError,ConnectionAbortedError):pass
MATRIX='''({actor,mode})=>{
 const p=G.Game.player,saved={anim:p.anim,x:p.x,y:p.y,aim:p.aim,weaponAim:p.weaponAim,walking:p.walking,moveAngle:p.moveAngle,flash:p.flash,invuln:p.invuln};const before=JSON.stringify(p.fieldWeapons);
 const human=actor==='guardia'||actor==='medico',dex=actor==='medico'?'medic01':human?'guard01':'support01',anim=new G.Sprites.Animator(dex,1,false);anim.cur='Walk';anim.frame=1;
 p.anim=anim;p.flash=p.invuln=0;p.walking=true;
 const layouts=human?[['smg'],['shotgun'],['baton'],['smg','shotgun'],['pistol','baton']]:[['pistol'],['smg'],['shotgun']];
 const c=document.createElement('canvas');c.width=960;c.height=(layouts.length+1)*95+45;const ctx=c.getContext('2d');ctx.fillStyle='#142026';ctx.fillRect(0,0,c.width,c.height);ctx.fillStyle='#f3e8bd';ctx.font='13px monospace';ctx.fillText(actor+' · '+mode+'×'+mode+' · LOT006 · renderer real',12,20);
 const cat=G.CharacterCatalog.modes[mode][actor],upper=cat.parts[48],palm=cat.parts[53],records=[];let calls=[];const draw=ctx.drawImage.bind(ctx);ctx.drawImage=(im,...a)=>{calls.push({src:im.src||'',args:a});return draw(im,...a);};
 for(let row=0;row<layouts.length;row++)for(let d=0;d<8;d++){
  const angle=d*Math.PI/4,x=60+d*120,y=95+row*95,weapons=layouts[row].map(model=>({model,flash:0,reload:0}));p.x=x;p.y=y;p.aim=p.weaponAim=angle;p.moveAngle=angle+Math.PI/2;calls=[];
  if(human){G.PersonajesArt.drawWeapons(ctx,p,{behind:true},weapons);G.PersonajesArt.draw(ctx,anim,x,y,{});G.PersonajesArt.drawWeapons(ctx,p,{behind:false},weapons);}
  else G.PersonajesArt.drawAlly(ctx,{characterId:actor,x,y,tx:x+50,ty:y,aim:angle,flash:0,anim,weapon:weapons[0]});
  const originals=calls.filter(k=>k.src.includes('/armas-faltantes-v1/')||k.src.includes('/AF01/'));
  if(originals.length!==weapons.length)throw Error('weapon count '+actor+' '+d+' '+layouts[row]+' '+originals.length);
  const arms=calls.filter(k=>k.src.endsWith('/Partes.png')&&k.args.length===8&&k.args[0]===upper.x&&k.args[1]===upper.y).length;
  const hands=calls.filter(k=>k.src.endsWith('/Partes.png')&&k.args.length===8&&k.args[0]===palm.x&&k.args[1]===palm.y).length;
  if(arms!==2||hands!==2)throw Error('arm/hand count '+actor+' '+d+' '+arms+'/'+hands);
  for(const w of weapons){const path=w.model==='pistol'?'/AF01/':'/'+w.model+'/',dir=['E','SE','S','SW','W','NW','N','NE'][d];if(!originals.some(k=>k.src.includes('/'+mode+path)&&k.src.endsWith('/'+dir+'.png')))throw Error('wrong direction '+w.model+' '+d);}
  records.push({actor,mode,direction:d,models:layouts[row],arms,hands,originals:originals.map(k=>k.src.split('/').slice(-3).join('/'))});ctx.fillStyle='#f3e8bd';ctx.fillText(layouts[row].join('+'),x-50,y+25);
 }
 if(!human)for(let d=0;d<8;d++){calls=[];G.PersonajesArt.drawAlly(ctx,{characterId:actor,x:60+d*120,y:95+layouts.length*95,aim:d*Math.PI/4,anim,weapon:{model:'smg'},incapacitated:true});if(calls.length!==1||calls.some(k=>k.src.includes('/armas-')))throw Error('weapon/duplicate down '+actor);}
 Object.assign(p,saved);if(JSON.stringify(p.fieldWeapons)!==before)throw Error('render mutated loadout');return{records,data:c.toDataURL()};
}'''
COMBAT='''()=>{const p=G.Game.player;G.World.reset(1);G.World.setFixture({minX:-20,maxX:20,minY:-20,maxY:20,walls:[],props:[]});p.x=p.y=16;G.Camera.x=G.Camera.y=16;const rows=[];for(const model of ['pistol','smg','shotgun','baton']){G.EnemyMgr.clear();G.Projectiles.clear();G.FieldCombat.reset(p,[G.FieldCatalog.makeWeapon(model,'qa:'+model,[])]);const e=G.EnemyMgr.add(new G.Enemy({...G.Content.pursuer,hp:10000},model==='baton'?48:116,16,{hp:1,dmg:1,spd:1}));G.EnemyMgr.rebuildGrid();const w=p.fieldWeapons[0],stats=G.FieldStats.weapon(p,w),hp=e.hp;G.FieldCombat.tick(.01,p,true);const shots=G.Projectiles.all().length;for(let i=0;i<50;i++){G.Projectiles.update(1/60,p,G.EnemyMgr.all());G.Combat.resolve(1/60,p,i/60);}const damage=hp-e.hp;if(!(damage>0))throw Error('no damage '+JSON.stringify({model,hp:p.hp,dead:p.dead,shots,stats,target:[e.x,e.y,e.dead],block:G.World.projectileBlock(66,16,2),copy:w,r:e.r,q:G.EnemyMgr.queryCircle(116,16,50).length,path:Array.from({length:15},(_,i)=>G.World.projectileBlock(16+i*8,16,3)),remaining:G.Projectiles.all().map(s=>[s.x,s.y,s.t])}));if(model!=='baton'&&shots!==(model==='shotgun'?6:1))throw Error('pattern '+model);if(model!=='baton'){w.ammo=1;w.shotWait=0;G.FieldCombat.tick(.01,p,true);if(!(w.reload>0))throw Error('no reload '+model);}rows.push({model,shots,damage,interval:stats.interval,range:stats.range,capacity:stats.capacity,reloadTime:stats.reloadTime});}return rows;}'''
ANIM='''()=>{const p=G.Game.player,saved={x:p.x,y:p.y,flash:p.flash,invuln:p.invuln,aim:p.aim,weaponAim:p.weaponAim};p.flash=p.invuln=0;p.aim=p.weaponAim=0;const c=document.createElement('canvas');c.width=600;c.height=310;const ctx=c.getContext('2d');ctx.fillStyle='#142026';ctx.fillRect(0,0,600,310);ctx.fillStyle='#f3e8bd';ctx.font='13px monospace';let calls=[],rects=0;const draw=ctx.drawImage.bind(ctx),rect=ctx.fillRect.bind(ctx);ctx.drawImage=(im,...a)=>{if(im.src?.includes('/armas-faltantes-v1/'))calls.push({src:im.src,args:a});return draw(im,...a)};ctx.fillRect=(...a)=>{rects++;return rect(...a)};const rows=[];for(const [i,model]of ['pistol','smg','shotgun','baton'].entries()){const states=[];for(const [row,state]of ['reposo','disparo/golpe','recarga'].entries()){const w={model,flash:row===1?.09:model==='baton'&&row===2?.001:0,reload:row===2&&model!=='baton'?1:0},before=JSON.stringify(w);p.x=70+i*150;p.y=70+row*95;calls=[];rects=0;G.PersonajesArt.draw(ctx,p.anim,p.x,p.y,{});G.PersonajesArt.drawWeapons(ctx,p,{},[w]);if(model!=='pistol'&&calls.length!==1)throw Error('animation count '+model);if(rects!==(row===1&&model!=='baton'?1:0))throw Error('duplicate/missing FX '+model);if(JSON.stringify(w)!==before)throw Error('animation mutated copy');states.push({state,image:calls[0]?.args||null});ctx.fillStyle='#f3e8bd';ctx.fillText(model+' '+(model==='baton'&&row===2?'fin golpe':state),p.x-65,p.y+22);}if(model==='smg'||model==='shotgun'){if(states[0].image[0]===states[1].image[0]||states[0].image[1]===states[2].image[1])throw Error('missing recoil/lower '+model);}rows.push({model,states});}Object.assign(p,saved);return{records:rows,data:c.toDataURL()};}'''
def main():
 server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)));Thread(target=server.serve_forever,daemon=True).start();base=f'http://127.0.0.1:{server.server_port}/';rows=[];combat=[];failures=[];animations=[]
 try:
  with sync_playwright()as pw:
   browser=pw.chromium.launch(headless=True)
   for mode in ['16','32']:
    page=browser.new_page(viewport={'width':1280,'height':900});errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
    page.goto(base+'index.html?prueba=combate-v2&graficos='+mode);page.wait_for_selector('#btn-technical-start:visible');page.click('#btn-technical-start');page.wait_for_function("()=>G.Game.state==='playing'");page.wait_for_function('()=>G.ApprovedFieldWeaponArt.inspect().loaded===48');page.evaluate('()=>G.Game.togglePause()');page.wait_for_function("()=>G.Game.state==='paused'");page.evaluate('()=>G.PersonajesArt.preload()')
    for actor in ['guardia','medico','apoyo','apoyo_delgada','apoyo_fitness','apoyo_curvy']:
     result=page.evaluate(MATRIX,{'actor':actor,'mode':mode});rows+=result['records'];(OUT/f'{actor}-{mode}.png').write_bytes(base64.b64decode(result['data'].split(',')[1]));print('PASS poses '+actor+' '+mode,flush=True)
    animated=page.evaluate(ANIM);animations.append({'mode':mode,'records':animated['records']});(OUT/f'animaciones-{mode}.png').write_bytes(base64.b64decode(animated['data'].split(',')[1]))
    combat.append({'mode':mode,'weapons':page.evaluate(COMBAT)})
    frozen=page.evaluate('()=>({clock:G.Expedition.state.v2.mapTime,ammo:G.Game.player.fieldWeapons.map(w=>[w.ammo,w.reload,w.shotWait])})');page.wait_for_timeout(180);assert page.evaluate('()=>({clock:G.Expedition.state.v2.mapTime,ammo:G.Game.player.fieldWeapons.map(w=>[w.ammo,w.reload,w.shotWait])})')==frozen
    page.screenshot(path=str(OUT/f'paused-{mode}.png'));assert not errors,errors;page.close()
   for kind in ['missing','slow']:
    page=browser.new_page();held=[];errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
    def route(r):
     if kind=='missing':r.fulfill(status=404,body='intentional QA')
     else:held.append(r)
    page.route('**/armas-faltantes-v1/32/smg/E.png',route);page.goto(base+'index.html?prueba=combate-v2&graficos=32',wait_until='domcontentloaded');page.wait_for_selector('#btn-technical-start:visible');page.click('#btn-technical-start');page.wait_for_function("()=>G.Game.state==='playing'");page.evaluate("()=>{G.FieldCombat.reset(G.Game.player,[G.FieldCatalog.makeWeapon('smg','qa:missing',[])]);G.Game.player.weaponAim=0;}")
    page.wait_for_timeout(150);status=page.evaluate('()=>G.PersonajesArt.status()');assert 'Subfusil'in status['message'],status
    if kind=='slow':
     assert held;page.wait_for_timeout(6100);held[0].fulfill(status=200,content_type='image/png',body=(ROOT/'docs/referencias/armas/armas-faltantes-v1/32/smg/E.png').read_bytes());page.wait_for_function("()=>!!G.ApprovedFieldWeaponArt.mount('smg','32',0,{x:0,y:0})");assert 'Subfusil'not in page.evaluate('()=>G.PersonajesArt.status().message')
    page.screenshot(path=str(OUT/f'{kind}.png'));assert not errors,errors;failures.append({'case':kind,'startedWithoutResource':True,'statusBefore':status,'lateRecovered':kind=='slow'});page.close()
   browser.close()
 finally:server.shutdown();server.server_close()
 (OUT/'browser.json').write_text(json.dumps({'status':'PASS','poses':len(rows),'records':rows,'combat':combat,'animations':animations,'incapacitatedPoses':64,'resourceCases':failures,'physicalPhone':False,'scope':'Actual native renderer and combat; forced poses/loadout/time/HP/world for deterministic QA. No natural balance or final art acceptance.'},indent=2),encoding='utf-8');print(json.dumps({'status':'PASS','poses':len(rows),'combatModes':len(combat),'resourceCases':len(failures)}))
if __name__=='__main__':main()
