const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
function setup(search='?prueba=mapa-v2',hostname='127.0.0.1',protocol='http:',pathname='/'){
 const enemies=[],sounds=[];
 const G={World:{isFree:()=>true,projectileBlock:()=>false},Path:{reachable:()=>true},EnemyMgr:{all:()=>enemies},
  Content:{guard:{dex:'guard01'}},Audio:{sfx:key=>sounds.push(key)}};
 const file=path.join(__dirname,'../js/systems/map-trial.js');
 if(fs.existsSync(file))vm.runInNewContext(fs.readFileSync(file,'utf8'),{G,window:{location:{search,hostname,protocol,pathname}},URLSearchParams,Math});
 return{G,enemies,sounds};
}
test('local V2 remains explicit and never combines with account modes',()=>{
 for(const [query,host,expected]of[['?prueba=mapa-v2','127.0.0.1',true],['?prueba=mapa-v2','localhost',true],['?prueba=mapa-v2','[::1]',true],['','127.0.0.1',false],['?prueba=mapa-v2','example.com',false],['?prueba=mapa-v2&cuentas=local','127.0.0.1',false],['?prueba=mapa-v2&cuentas=propias','127.0.0.1',false],['?prueba=mapa-v2&cuentas=invalid','127.0.0.1',false]]){
  const {G}=setup(query,host);assert.equal(G.MapTrial?.enabled,expected,query+' / '+host);
 }
});

test('the exact HTTPS Pages project enables the public V2 demo by default or explicitly',()=>{
 for(const search of ['', '?prueba=mapa-v2']){
  const {G}=setup(search,'deteco.github.io','https:','/SCPSurvivor/');
  assert.equal(G.MapTrial?.enabled,true,search||'default public demo');
  assert.equal(G.MapTrial.publicDemo,true);
 }
 const url=new URL('https://DETECO.GITHUB.IO/SCPSurvivor/');
 const {G}=setup(url.search,url.hostname,url.protocol,url.pathname);
 assert.equal(url.hostname,'deteco.github.io','browser URL normalizes hostname case');
 assert.equal(G.MapTrial.enabled,true);assert.equal(G.MapTrial.publicDemo,true);
 const nested=setup('','deteco.github.io','https:','/SCPSurvivor/index.html').G.MapTrial;
 assert.equal(nested.enabled,true);assert.equal(nested.publicDemo,true);
});

test('the public demo preserves the explicit quick five-minute trial',()=>{
 for(const search of ['?rapida=1','?prueba=mapa-v2&rapida=1']){
  const trial=setup(search,'deteco.github.io','https:','/SCPSurvivor/').G.MapTrial;
  assert.equal(trial?.enabled,true);assert.equal(trial.publicDemo,true);
  assert.equal(trial.startTime,270);assert.equal(trial.duration,300);
 }
});

test('publicDemo requires the exact allowed HTTPS host and project path prefix',()=>{
 for(const [host,protocol,pathname]of [
  ['example.com','https:','/SCPSurvivor/'],
  ['deteco.github.io.example.com','https:','/SCPSurvivor/'],
  ['deteco.github.io','http:','/SCPSurvivor/'],
  ['deteco.github.io','https:','/Otro/'],
  ['deteco.github.io','https:','/SCPSurvivor-mal/'],
  ['deteco.github.io','https:','/scpsurvivor/'],
  ['deteco.github.io','https:','/']
 ]){
  const trial=setup('?prueba=mapa-v2',host,protocol,pathname).G.MapTrial;
  assert.equal(trial?.enabled,false,`${protocol}//${host}${pathname}`);
  assert.equal(trial.publicDemo,false);
 }
 assert.equal(setup().G.MapTrial.publicDemo,false,'loopback is not the public demo');
});

test('the Pages demo never enables V2 alongside any account query parameter',()=>{
 for(const accounts of ['cuentas','cuentas=','cuentas=local','cuentas=propias','cuentas=invalid','cuentas=0']){
  for(const query of [`?${accounts}`,`?prueba=mapa-v2&${accounts}`]){
   const trial=setup(query,'deteco.github.io','https:','/SCPSurvivor/').G.MapTrial;
   assert.equal(trial?.enabled,false,query);
  }
 }
});
test('quick trial is explicit and keeps the five-minute contract',()=>{
 const normal=setup().G.MapTrial,fast=setup('?prueba=mapa-v2&rapida=1').G.MapTrial;
 assert.equal(normal?.duration,300);assert.equal(normal.startTime,0);assert.equal(normal.bossAt,240);
 assert.equal(fast.startTime,270);assert.equal(fast.duration,300);
});
test('V2 cannot be mixed with the old rift or backpack trial switches',()=>{
 const search='?prueba=mapa-v2&grietas=local&inventario=local',{G}=setup(search);
 const context={G,window:{location:{hostname:'127.0.0.1',search}},URLSearchParams,Math};
 for(const file of ['dimensional-rifts.js','../ui/inventory-trial.js']){
  const resolved=path.resolve(__dirname,'../js/systems',file);
  vm.runInNewContext(fs.readFileSync(resolved,'utf8'),context);
 }
 assert.equal(G.MapTrial.enabled,true);assert.equal(G.DimensionalRifts.enabled,false);assert.equal(G.InventoryTrial.enabled,false);
});
test('allies arrive once, reset between maps and use reachable positions',()=>{
 const {G,sounds}=setup();assert.ok(G.MapTrial);
 G.MapTrial.reset({exit:{x:100,y:100}});assert.equal(G.MapTrial.allies.length,0);
 G.MapTrial.arrive();G.MapTrial.arrive();assert.equal(G.MapTrial.allies.length,2);assert.equal(sounds.length,1);
 assert.ok(G.MapTrial.allies.every(a=>Number.isFinite(a.x)&&Number.isFinite(a.y)));
 G.MapTrial.reset({exit:{x:200,y:100}});assert.equal(G.MapTrial.allies.length,0);
});
test('allied fire respects walls and range and deals actual enemy damage',()=>{
 const {G,enemies}=setup();assert.ok(G.MapTrial);
 G.MapTrial.reset({exit:{x:0,y:0}});G.MapTrial.arrive();
 const p={kills:0},e={x:140,y:0,hp:100,dead:false,hurt(n){this.hp-=n;if(this.hp<=0)this.dead=true;}};enemies.push(e);
 G.World.projectileBlock=()=>true;G.MapTrial.updateAllies(1,p);assert.equal(e.hp,100);
 G.World.projectileBlock=()=>false;e.x=10000;G.MapTrial.updateAllies(1,p);assert.equal(e.hp,100);
 e.x=140;G.MapTrial.updateAllies(1,p);assert.ok(e.hp<100);
});
test('allies use the actual player path field and spread out from the doorway',()=>{
 const {G}=setup(),player={kills:0};G.Game={player};
 G.Path.reachable=(x,y,anchor)=>anchor===player;
 G.MapTrial.reset({exit:{x:0,y:0}});G.MapTrial.arrive();G.MapTrial.updateAllies(1,player);
 const [a,b]=G.MapTrial.allies;
 assert.ok(Math.hypot(a.x-b.x,a.y-b.y)>20,'two allies need distinct reachable cover positions');
});
test('an allied kill resolves once and allies are not hostile enemies',()=>{
 const {G,enemies}=setup();assert.ok(G.MapTrial);
 G.MapTrial.reset({exit:{x:0,y:0}});G.MapTrial.arrive();
 let deaths=0;const p={kills:0},e={x:100,y:0,hp:1,dead:false,hurt(n){if(this.dead)return;this.hp-=n;if(this.hp<=0){this.dead=true;deaths++;}}};enemies.push(e);
 G.MapTrial.updateAllies(1,p);G.MapTrial.updateAllies(1,p);
 assert.equal(deaths,1);assert.equal(p.kills,0,'EnemyMgr owns kill accounting when removing the dead enemy');assert.equal(enemies.length,1);assert.equal(G.MapTrial.allies.length,2);
});
