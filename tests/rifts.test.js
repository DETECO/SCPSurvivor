const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function setup(search='?prueba=grieta', hostname='127.0.0.1') {
  const sounds=[], G={Audio:{sfx:id=>sounds.push(id)},World:{isFree:()=>true,projectileBlock:()=>null},Path:{reachable:()=>true}};
  vm.runInNewContext(fs.readFileSync(require.resolve('../js/systems/dimensional-rifts.js'),'utf8'),{G,window:{location:{search,hostname}},URLSearchParams,Math});
  const player={x:0,y:0,r:12},geometry={exit:{x:600,y:0},spawnPoints:[{x:20,y:0},{x:180,y:0},{x:350,y:0},{x:600,y:0}]};
  const offer=(extra={})=>G.DimensionalRifts.offer({sector:1,kind:'normal',seed:1337,geometry,player,force:true,...extra});
  G.DimensionalRifts.reset();return{G,player,geometry,sounds,offer,r:G.DimensionalRifts};
}

test('solo opción local y sin cuentas; modo normal y servidores públicos intactos',()=>{
  for(const [search,host] of [['','127.0.0.1'],['?prueba=grieta','example.com'],['?prueba=grieta&cuentas=local','127.0.0.1'],['?grietas=local&cuentas=local','localhost']]){
    const a=setup(search,host);assert.equal(a.r.enabled,false);assert.equal(a.offer(),false);
  }
  assert.equal(setup('?grietas=local').r.enabled,true);assert.equal(setup().r.directTest,true);
});

test('ubicación libre alcanzable y separada; aviso y sonido una sola vez por sector',()=>{
  const a=setup();assert.equal(a.offer(),true);const s=a.r.state;
  assert.equal(s.status,'open');assert.equal(s.remaining,45);assert.ok(Math.hypot(s.x,s.y)>=140);
  assert.ok(Math.hypot(s.x-600,s.y)>=100);assert.match(s.alert,/GRIETA/);assert.deepEqual(a.sounds,['riftOpen']);
  assert.equal(a.offer(),false);assert.deepEqual(a.sounds,['riftOpen']);
  const b=setup();b.G.Path.reachable=()=>false;assert.equal(b.offer(),false);assert.equal(b.sounds.length,0);
});

test('caduca a45 segundos activos y no acepta entrada ni reabre al expirar',()=>{
  const a=setup();a.offer();a.r.tick(44.9);assert.equal(a.r.state.status,'open');
  a.r.tick(.1);assert.equal(a.r.state.status,'closed');assert.equal(a.r.state.remaining,0);
  assert.equal(a.r.enter(a.player),false);assert.equal(a.offer(),false);
});

test('entrada por contacto sin atravesar pared; consume cuenta regresiva y resultado único',()=>{
  const a=setup();a.offer();assert.equal(a.r.enter(a.player),false);
  a.player.x=a.r.state.x;a.player.y=a.r.state.y;
  assert.equal(a.r.enter({...a.player,x:a.player.x-35}),false,'Pasar cerca sin tocar no activa');
  a.G.World.projectileBlock=()=>true;assert.equal(a.r.enter({...a.player,x:a.player.x-20}),false);
  a.G.World.projectileBlock=()=>null;assert.equal(a.r.enter(a.player),true);assert.equal(a.r.enter(a.player),false);
  a.r.tick(100);assert.equal(a.r.state.status,'active');assert.equal(a.r.complete('defeated'),true);
  assert.equal(a.r.complete('evaded'),false);assert.equal(a.r.state.result,'defeated');assert.equal(a.offer(),false);
});

test('azar raro reproducible separado del calendario y solo en sectores normales desdeS2',()=>{
  const a=setup('?grietas=local');assert.equal(a.offer({force:false}),false);
  assert.equal(a.offer({sector:2,kind:'boss',force:false}),false);
  let count=0;
  for(let seed=0;seed<1000;seed++){
    const x=setup('?grietas=local'),y=setup('?grietas=local');
    const found=x.offer({sector:2,seed,force:false});assert.equal(found,y.offer({sector:2,seed,force:false}));if(found)count++;
  }
  assert.ok(count>180&&count<320,`Distribución 25%: ${count}/1000`);
});
