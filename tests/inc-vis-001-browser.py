"""INC-VIS-001 actual game rendering with disclosed QA poses and public-origin routing."""
from pathlib import Path
from playwright.sync_api import sync_playwright
from urllib.parse import unquote,urlsplit
import argparse,json,mimetypes,os,time
ROOT=Path(os.environ.get('SCP_TEST_ROOT',Path(__file__).resolve().parents[1])).resolve()
BASE='https://deteco.github.io/SCPSurvivor/'
FIXTURE='''async()=>{
 const p=G.Game.player;await G.Sprites.preload(['guard01','medic01','pursuer01','biological01','warden01']);await G.PersonajesArt.preload();
 G.Game.debugSpeed(1e-7);p.invuln=0;p.flash=0;p.walking=false;p.anim.cur='Idle';G.EnemyMgr.clear();
 const defs=[G.Content.pursuer,G.Content.biological,G.Content.boss];
 defs.forEach((d,i)=>G.EnemyMgr.add(new G.Enemy(d,p.x+110+(i%2)*45,p.y+(i-1)*85,{hp:1,spd:1,dmg:1},i===2)));
 G.Camera.x=p.x+50;G.Camera.y=p.y;window.qaCombatTick=G.FieldCombat.tick;G.FieldCombat.tick=()=>{};
 window.qaPng=[];window.qaText=[];
 const draw=CanvasRenderingContext2D.prototype.drawImage,fill=CanvasRenderingContext2D.prototype.fillText;
 CanvasRenderingContext2D.prototype.drawImage=function(image,...args){if(image?.src?.includes('/AF01/'))qaPng.push(image.src);return draw.call(this,image,...args)};
 CanvasRenderingContext2D.prototype.fillText=function(text,...args){qaText.push(String(text));return fill.call(this,text,...args)};
 G.FX.clear();const bio=G.EnemyMgr.all()[1],hpBefore=bio.hp;bio.hurt(6.6000000000000005,'#fff',0,0,0);
 bio.flash=0;bio.anim.cur='Idle';bio.anim.once=false;bio.anim.frame=0;
 return{r:p.r,maxHp:p.maxHp,baseSpd:p.baseSpd,bio:bio.r,boss:G.EnemyMgr.all()[2].r,bodyH:bio.bodyH,damageApplied:hpBefore-bio.hp};
}'''
POSES='''async()=>{
 const p=G.Game.player,w=G.FieldCombat.getweapons();
 const next=()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))),records=[];
 if(w.length===1){G.ArmamentRewards.offer({id:'qa-art-second',kind:'boss',seed:1,player:p});G.ArmamentRewards.claim('qa-art-second',p);if(!G.ArmamentRewards.choose('pistol'))throw Error('second pistol reward failed');}
 if(w.length!==2)throw Error('two runtime copies required');
 for(const actor of ['guard01','medic01'])for(const count of [1,2]){
  const removed=w.splice(count),copies=w;p.anim.dex=actor;p.soldierId=actor==='guard01'?'guard':'medic';
  for(let i=0;i<8;i++){
   const aim=i*Math.PI/4;p.aim=p.weaponAim=aim;p.anim.dir=G.Sprites.dirFromAngle(aim);
   copies.forEach((c,k)=>c._aimTarget={hp:100,x:p.x+Math.cos(aim+k*Math.PI/2)*100,y:p.y+Math.sin(aim+k*Math.PI/2)*100});
   qaPng.length=0;await next();
   records.push({actor,count,runtimeCopies:G.FieldCombat.getweapons().length,dir:i,png:qaPng.slice(),radius:p.r,maxHp:p.maxHp});
  }
  w.push(...removed);
 }
 p.anim.dex='medic01';p.soldierId='medic';p.aim=p.weaponAim=Math.PI/4;
 return records;
}'''

def main():
 a=argparse.ArgumentParser();a.add_argument('--live',action='store_true');a.add_argument('--smoke',action='store_true');args=a.parse_args()
 out=ROOT/'tests/artifacts/inc-vis-001'/('live'if args.live else'local');out.mkdir(parents=True,exist_ok=True);records=[]
 with sync_playwright()as pw:
  b=pw.chromium.launch(headless=True)
  cases=[(entry,kind,w,h,mode)for entry in (['index.html']if args.live else['dev.html','index.html'])for kind in ['normal','r1']for w,h in ([(390,844)]if args.smoke else[(390,844),(844,390),(1280,900)])for mode in (['32']if args.smoke else['16','32'])]
  cases += [(entry,'b3',390,844,'32')for entry in (['index.html']if args.live else['dev.html','index.html'])]
  cases += [('index.html',kind,390,844,'32')for kind in ['failed','slow','parts-failed']]
  for entry,kind,w,h,mode in cases:
   c=b.new_context(viewport={'width':w,'height':h},is_mobile=w<900,has_touch=w<900);p=c.new_page();errors=[];bad=[];injected=[]
   p.on('pageerror',lambda e:errors.append(str(e)))
   p.on('response',lambda r:bad.append([r.status,r.url])if r.status>=400 else None)
   def route(r):
    name=unquote(urlsplit(r.request.url).path).removeprefix('/SCPSurvivor/')or'index.html'
    if(kind=='failed'and name.endswith('/32/AF01/E.png'))or(kind=='parts-failed'and name.endswith('/32/medico/Partes.png')):
     injected.append(name);r.fulfill(status=404,body='QA intentional missing asset');return
    if kind=='slow'and name.endswith('/32/AF01/E.png'):time.sleep(.35);injected.append(name)
    if args.live:r.continue_();return
    target=(ROOT/name).resolve()
    if target.is_relative_to(ROOT)and target.is_file():r.fulfill(status=200,body=target.read_bytes(),content_type=mimetypes.guess_type(target.name)[0]or'application/octet-stream')
    else:r.fulfill(status=404,body='missing')
   p.route('**/*',route)
   query=('?prueba=mapa-v2'if kind=='b3'else'?prueba=combate-v2&armas=r1'if kind=='r1'else'?')
   query+=('&'if query!='?'else'')+'graficos='+mode
   try:
    p.goto(BASE+entry+query,wait_until='domcontentloaded',timeout=60000);p.wait_for_selector('#btn-technical-start:visible',timeout=30000)
    p.select_option('#field-role','medic',force=True);p.click('#btn-technical-start');p.wait_for_function("G.Game.state==='playing'")
    physics=p.evaluate(FIXTURE);p.wait_for_timeout(80)
    assert physics['r']==12 and physics['bio']==14 and physics['boss']==22 and physics['bodyH']==120,physics
    assert abs(physics['damageApplied']-6.6000000000000005)<1e-10,physics
    native=kind!='b3';art=p.evaluate('G.AF01ApprovedArt.inspect()')
    if native:assert art['loaded']==(15 if kind=='failed'else 16),art
    if kind not in ['b3','failed','parts-failed']:
     poses=p.evaluate(POSES);assert len(poses)==32 and all(len(r['png'])>=r['count']and r['count']==r['runtimeCopies']for r in poses),poses
     assert all(r['radius']==physics['r']and r['maxHp']==physics['maxHp']for r in poses)
    else:poses=[]
    p.wait_for_function("qaText.includes('6.6')",timeout=5000)
    assert not p.evaluate("qaText.some(s=>s.includes('6.6000000000000005'))")
    geometry=p.evaluate("()=>Object.fromEntries(['pursuer01','biological01','warden01'].map(id=>[id,{logical:G.Sprites.bodyHeight(id),visual:G.Sprites.visualBodyHeight(id),cell:G.SPRITE_META[id].visual}]))")
    if native:
     assert geometry['biological01']['cell']['h']*2==56 and geometry['warden01']['cell']['h']*2==128,geometry
    hud=p.locator('#hud-summary').bounding_box();assert hud and hud['height']<170,hud
    assert p.locator('#btn-technical-pause').is_visible()and p.locator('#btn-ability').is_visible()
    assert 'Vida'in p.locator('#field-status').inner_text()and p.locator('#scene-time').inner_text()
    note=p.locator('#art-resource-status').inner_text()
    if kind=='failed':assert 'AF01'in note and injected,note
    if kind=='parts-failed':assert 'Piezas'in note and injected,note
    if kind=='slow':assert injected and not note,(injected,note)
    if native and kind not in ['failed','parts-failed']:
     p.evaluate("()=>{const p=G.Game.player;window.qaOriginalWeapons=p.fieldWeapons;p.fieldWeapons=[...p.fieldWeapons,{model:'smg',flash:0}];G.TechnicalUI.tick(p,0)}")
     assert 'Subfusil'in p.locator('#art-resource-status').inner_text()
     p.evaluate("()=>G.Game.player.fieldWeapons=qaOriginalWeapons")
    # Actual world scene after the pose checks, including both normal and boss actors.
    p.evaluate("()=>G.TechnicalUI.tick(G.Game.player,0)");p.wait_for_timeout(40)
    if w==390 and mode=='32':p.screenshot(path=str(out/f'{entry[:-5]}-{kind}.png'))
    assert not errors,errors
    if kind not in ['failed','parts-failed']:assert not bad,bad
    records.append({'status':'PASS','entry':entry,'kind':kind,'viewport':[w,h],'mode':mode,'physics':physics,'geometry':geometry,'poses':len(poses),'art':art,'hud':hud,'injectedAssetFailures':injected,'javascriptErrors':errors,'httpFailures':bad})
    print(json.dumps({'checked':len(records),'case':[entry,kind,w,h,mode]}),flush=True)
   except Exception:
    p.screenshot(path=str(out/'failure.png'));raise
   finally:c.close()
  b.close()
 result={'status':'PASS','live':args.live,'records':records,'physicalPhone':False,'method':'Actual game canvas/loop and HUD, QA enemy placements/slow time/render-only actor and weapon poses. Combat tick disabled only during visual poses; no natural wins, art approval or balance claim.'}
 (out/('results-smoke.json'if args.smoke else'results.json')).write_text(json.dumps(result,indent=2)+'\n',encoding='utf-8');print(json.dumps({'status':'PASS','scenarios':len(records)}))
if __name__=='__main__':main()
