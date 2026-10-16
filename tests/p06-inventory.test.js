const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function setup(){const G={};for(const f of ['data/field-catalog.js','systems/inventory-model.js'])vm.runInNewContext(fs.readFileSync(require.resolve('../js/'+f),'utf8'),{G,Math,JSON,Set});return G;}
test('P06 copias únicas,8/16, equipadas fuera del interior y mods instalados sin espacio extra',()=>{
 const G=setup(),M=G.InventoryModel,s=M.fixture(G.FieldCatalog.defaultLoadout());assert.equal(M.validate(s),true);
 assert.equal(M.capacity(s),8);assert.equal(s.bag.length,8);assert.equal(s.equipped.weapons.length,2);
 const next=M.apply(s,{type:'installMod',id:'trial:mod:grip',slot:0},'base');assert.equal(next.bag.length,7);
 assert.equal(next.items[next.equipped.weapons[0]].mods[0],'trial:mod:grip');assert.equal(M.loadout(next)[0].mods[0],'grip');
 assert.equal(s.bag.length,8,'No mutar estado anterior');
});
test('P06 intercambio de copia conserva identidad, cargador, nivel y recarga',()=>{
 const G=setup(),M=G.InventoryModel,s=M.fixture(G.FieldCatalog.defaultLoadout());
 Object.assign(s.items[s.equipped.weapons[0]],{ammo:3,reload:.4,reloadTime:1.5,level:3});
 const next=M.apply(s,{type:'equipWeapon',id:'trial:weapon:shotgun',slot:0},'preparation');
 assert.equal(next.equipped.weapons[0],'trial:weapon:shotgun');const old=next.items[s.equipped.weapons[0]];
 assert.ok(next.bag.includes(old.id));assert.equal(old.ammo,3);assert.equal(old.reload,.4);assert.equal(old.level,3);
 const back=M.apply(next,{type:'equipWeapon',id:old.id,slot:0},'preparation');assert.equal(M.loadout(back)[0].ammo,3);
});

test('P06 dos copias del mismo modelo con mods y munición independientes',()=>{
 const G=setup(),M=G.InventoryModel,s=M.fixture([G.FieldCatalog.makeWeapon('pistol','copy:a'),G.FieldCatalog.makeWeapon('pistol','copy:b')]);
 s.items['copy:a'].ammo=3;s.items['copy:b'].ammo=9;
 const next=M.apply(s,{type:'installMod',id:'trial:mod:grip',slot:0},'base');const copies=M.loadout(next);
 assert.equal(copies[0].ammo,3);assert.equal(copies[1].ammo,9);assert.equal(copies[0].mods.length,1);assert.equal(copies[1].mods.length,0);
});
test('P06 bajar16→8 rechaza si no cabe, sin descartar ni mutar',()=>{
 const G=setup(),M=G.InventoryModel,s=M.fixture(G.FieldCatalog.defaultLoadout());
 let next=M.apply(s,{type:'equipBackpack',id:'trial:pack:large'},'base');assert.equal(M.capacity(next),16);
 for(let n=0;n<2;n++)next=M.apply(next,{type:'move',id:next.storage[0],to:'bag'},'base');
 const before=JSON.stringify(next);assert.throws(()=>M.apply(next,{type:'equipBackpack',id:'trial:pack:basic'},'base'),/capacidad|cabe/i);assert.equal(JSON.stringify(next),before);
});
test('P06 almacén60, transferencias solo en base, copia una sola vez',()=>{
 const G=setup(),M=G.InventoryModel,s=M.fixture(G.FieldCatalog.defaultLoadout()),id=s.bag[0];
 assert.throws(()=>M.apply(s,{type:'move',id,to:'storage'},'preparation'),/base/i);
 const next=M.apply(s,{type:'move',id,to:'storage'},'base');assert.ok(!next.bag.includes(id));assert.ok(next.storage.includes(id));
 for(let n=next.storage.length;n<60;n++){const id='extra:'+n;next.items[id]={id,kind:'mod',model:'grip'};next.storage.push(id);}
 assert.equal(M.validate(next),true);assert.throws(()=>M.apply(next,{type:'move',id:next.bag[0],to:'storage'},'base'),/60|capacidad/i);
});
test('P06 mod con mochila llena intercambia usando el mismo hueco y devuelve la copia exacta',()=>{
 const G=setup(),M=G.InventoryModel,s=M.fixture(G.FieldCatalog.defaultLoadout());
 let next=M.apply(s,{type:'installMod',id:'trial:mod:grip',slot:0},'base');
 next=M.apply(next,{type:'move',id:next.storage[0],to:'bag'},'base');assert.equal(next.bag.length,8);
 const swap=M.apply(next,{type:'installMod',id:'trial:mod:reinforced',slot:0,replace:'trial:mod:grip'},'preparation');
 assert.ok(swap.bag.includes('trial:mod:grip'));assert.equal(swap.bag.length,8);
 assert.throws(()=>M.apply(swap,{type:'removeMod',id:'trial:mod:reinforced',slot:0},'preparation'),/capacidad|cabe/i);
});
test('P06 valida duplicados, referencias, tipos y bloqueo en combate/pausa/subida',()=>{
 const G=setup(),M=G.InventoryModel,s=M.fixture(G.FieldCatalog.defaultLoadout());
 for(const phase of ['combat','boss','levelup','paused','exploration'])assert.throws(()=>M.apply(s,{type:'equipWeapon',id:'trial:weapon:shotgun',slot:0},phase),/base|preparaci/i);
 const duplicate=JSON.parse(JSON.stringify(s));duplicate.bag.push(duplicate.equipped.weapons[0]);assert.throws(()=>M.validate(duplicate),/duplic|copia|referencia/i);
 const missing=JSON.parse(JSON.stringify(s));delete missing.items[missing.bag[0]];assert.throws(()=>M.validate(missing),/copia|referencia/i);
});

test('P06 prototipo solo loopback optativo, deshabilitado con cuentas',()=>{
 for(const [hostname,search,expected] of [
  ['127.0.0.1','',false],['127.0.0.1','?prueba=inventario',true],['localhost','?inventario=local',true],
  ['example.com','?prueba=inventario',false],['127.0.0.1','?inventario=local&cuentas=local',false]]){
   const G={};vm.runInNewContext(fs.readFileSync(require.resolve('../js/ui/inventory-trial.js'),'utf8'),{G,URLSearchParams,window:{location:{hostname,search}}});assert.equal(G.InventoryTrial.enabled,expected);
 }
});

test('P06 modelos heredados del prototipo JS no son mods válidos',()=>{
 const G=setup(),M=G.InventoryModel,s=M.fixture();s.items['trial:mod:grip'].model='toString';
 assert.throws(()=>M.validate(s),/modelo.*mod/i);
});
