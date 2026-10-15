const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const G = { LIFT:18, U:{dist:(x,y,a,b)=>Math.hypot(a-x,b-y),TYPE_COLOR:{}} };
const sandbox={G,Set,Math,performance:{now:()=>0}}; vm.createContext(sandbox);
for(const file of ['js/data/field-catalog.js','js/systems/field-stats.js','js/entities/projectile.js','js/systems/combat.js','js/systems/field-combat.js']) vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),sandbox,{filename:file});
const pl={x:0,y:0,r:10,aim:0,dead:false,fieldMode:true,tempStats:{},hp:100,hurt(n){this.hp-=n;},onDealt(){}};
let enemies=[]; G.EnemyMgr={all:()=>enemies,queryCircle:()=>enemies};
let breakables=[]; G.World={projectileBlock:()=>null,propsInCircle:()=>breakables}; G.FX={burst(){},sp(){},spark(){},dmgText(){},trail(){}}; G.Types={mult:()=>1,label:()=>''}; G.Camera={sees:()=>true,kick(){}}; G.Audio={sfx(){}};
G.FieldCombat.reset(pl);
assert.equal(G.FieldCombat.state.weapons.length,2);
assert.equal(G.FieldCombat.state.capacity,12);
enemies=[{id:1,x:10,y:0,r:5,dead:false,bodyH:10,hurt(n){this.damage=(this.damage||0)+n;},applyBurn(){},applyPoison(){},applySlow(){}}];
G.FieldCombat.tick(0,pl,true);
let bullets=G.Projectiles.all(); assert.equal(bullets.length,1,'pistol emits one bullet');
assert.equal(bullets[0].dmg,10); assert.equal(bullets[0].fieldWeapon,true); assert.equal(bullets[0].mtype,null);
assert.equal(G.FieldCombat.state.weapons[0].ammo,11);
// Let the actual existing projectile updater and combat collision resolver apply damage.
G.Projectiles.update(.01,pl,enemies); G.Combat.resolve(.01,pl,1);
assert.equal(enemies[0].damage,10,'real Combat.resolve applies field pistol damage');

// Shared shot wait survives weapon switching; switches retain independent copies.
assert.equal(G.FieldCombat.switchTo(1),true); G.FieldCombat.tick(.2,pl,true);
assert.equal(G.FieldCombat.state.shots,1,'switch lock plus shared wait prevent alternating shots');
G.FieldCombat.tick(.3,pl,true); assert.equal(G.FieldCombat.state.shots,2,'second weapon fires when shared wait expires');
assert.equal(G.FieldCombat.state.weapons[1].ammo,23);
assert.equal(G.FieldCombat.state.weapons[0].ammo,11);

// Threat bands and 20% aim hysteresis apply to the active model's range.
G.FieldCombat.reset(pl,[G.FieldCatalog.makeWeapon('pistol','aim'),G.FieldCatalog.makeWeapon('smg','aim-2')]);
const near={id:3,x:65,y:0,r:4,dead:false}, boss={id:4,x:180,y:0,r:4,dead:false,boss:true};
enemies=[{id:5,x:150,y:0,r:4,dead:false}];
assert.equal(G.FieldCombat.targetFor(pl).id,5);
enemies.push({id:6,x:121,y:0,r:4,dead:false}); assert.equal(G.FieldCombat.targetFor(pl).id,5,'same priority needs a 20% improvement');
enemies.push({id:7,x:119,y:0,r:4,dead:false}); assert.equal(G.FieldCombat.targetFor(pl).id,7);
enemies=[boss,{id:8,x:75,y:0,r:4,dead:false}]; assert.equal(G.FieldCombat.targetFor(pl).id,8,'near threats outrank bosses');
enemies=[boss,{id:9,x:250,y:0,r:4,dead:false}]; assert.equal(G.FieldCombat.targetFor(pl).id,4,'bosses outrank distant regular threats');
G.World.projectileBlock=x=>x>80?'wall':null; assert.equal(G.FieldCombat.targetFor(pl),null,'walls remove targets from all weapon ranges');
G.World.projectileBlock=x=>x>=149?'wall':null; enemies=[{id:11,x:150,y:0,r:4,dead:false}];
assert.equal(G.FieldCombat.targetFor(pl),null,'the target endpoint is checked even when it falls between samples');
const propBlock={id:'barricade',x:45,y:0,r:12,destructible:true,solid:true,hp:34};
G.World.projectileBlock=x=>x>=33&&x<=57?propBlock:null; enemies=[{id:12,x:100,y:0,r:4,dead:false}];
assert.equal(G.FieldCombat.targetFor(pl).id,12,'destructible props do not block enemy line of sight');
G.World.projectileBlock=()=>null; enemies=[]; const breakable={id:'box',x:125,y:0,r:12,destructible:true,solid:true,hp:34}; breakables=[breakable];
assert.equal(G.FieldCombat.targetFor(pl),breakable,'a reachable breakable is targeted only when no enemy is valid');
enemies=[{id:13,x:140,y:0,r:4,dead:false}]; assert.equal(G.FieldCombat.targetFor(pl).id,13,'a valid enemy stays ahead of breakables');
enemies=[]; G.World.projectileBlock=x=>x>=50&&x<=58?'wall':null;
assert.equal(G.FieldCombat.targetFor(pl),null,'blocked breakables are skipped');
G.World.projectileBlock=()=>null; breakables=[];

// All three shot patterns, preserving one shell for the six-pellet fan.
G.Projectiles.clear(); G.FieldCombat.reset(pl,[G.FieldCatalog.makeWeapon('shotgun','scatter'),G.FieldCatalog.makeWeapon('pistol','scatter-2')]);
enemies=[{id:2,x:100,y:0,r:5,dead:false,hurt(){}}]; G.FieldCombat.tick(0,pl,true);
assert.equal(G.Projectiles.all().length,6); assert.ok(G.Projectiles.all().every(p=>p.dmg===6));
assert.equal(G.FieldCombat.state.ammo,5);

// Background reload progresses while another copy is selected; capacity mods clamp, never refill.
G.FieldCombat.reset(pl,[G.FieldCatalog.makeWeapon('pistol','a',['extended']),G.FieldCatalog.makeWeapon('smg','b')]);
const a=pl.fieldWeapons[0]; a.ammo=2; a.reload=1.0; a.reloadTime=1.725;
assert.equal(G.FieldCombat.configureMods('a',['extended','assisted']),true);
assert.ok(Math.abs(G.FieldCombat.state.weapons[0].reload-1.0/1.725*1.5)<1e-8,'reload fraction survives duration change');
assert.equal(G.FieldCombat.state.weapons[0].ammo,2,'changing capacity does not refill');
const reloadBefore=a.reload; G.FieldCombat.switchTo(1); G.FieldCombat.tick(.5,pl,false); assert.ok(G.FieldCombat.state.weapons[0].reload<reloadBefore);
assert.equal(G.FieldCombat.configureMods('a',['extended','extended']),false);
assert.equal(G.FieldCombat.configureMods('a',['rapid','piercing','grip']),false);
assert.equal(G.FieldCombat.upgrade('a'),true); assert.equal(G.FieldCombat.state.weapons[0].level,2);
assert.equal(G.FieldCombat.upgrade('missing'),false);

// Two physical slots are required; models may repeat but copy IDs and mods must validate.
const pistolA=G.FieldCatalog.makeWeapon('pistol','dup-a'), pistolB=G.FieldCatalog.makeWeapon('pistol','dup-b');
assert.throws(()=>G.FieldCombat.reset(pl,[pistolA]),/exactly two/);
assert.throws(()=>G.FieldCombat.reset(pl,[pistolA,{...pistolB,id:'dup-a'}]),/unique/);
assert.throws(()=>G.FieldCombat.reset(pl,[pistolA,{...pistolB,mods:['grip','rapid','extended']}]),/Invalid/);

// Grip reduces the catalog's 30 degree shotgun fan once, to 21 degrees.
G.Projectiles.clear(); G.FieldCombat.reset(pl,[G.FieldCatalog.makeWeapon('shotgun','grip-shotgun',['grip']),G.FieldCatalog.makeWeapon('smg','grip-spare')]);
enemies=[{id:10,x:100,y:0,r:5,dead:false,hurt(){}}]; G.FieldCombat.tick(0,pl,true);
const pelletAngles=G.Projectiles.all().map(p=>Math.atan2(p.vy,p.vx));
const fan=(Math.max(...pelletAngles)-Math.min(...pelletAngles))*180/Math.PI;
assert.ok(Math.abs(fan-21)<1e-8,`grip fan should be 21 degrees, got ${fan}`);

// Weapon layer follows aim direction, and muzzle flash sits at the drawn barrel tip.
G.FieldCombat.reset(pl,[G.FieldCatalog.makeWeapon('pistol','draw'),G.FieldCatalog.makeWeapon('smg','draw-2')]);
const calls={rects:0,arcs:[],saves:0}; const ctx={save(){calls.saves++;},restore(){},translate(){},rotate(){},fillRect(){calls.rects++;},beginPath(){},arc(x,y){calls.arcs.push([x,y]);},fill(){}};
pl.weaponAim=-Math.PI/2; pl.fieldWeapons[0].flash=.09;
G.FieldCombat.drawWeapon(ctx,pl,{behind:true}); assert.equal(calls.rects,3,'upward aim draws once in the behind pass'); assert.equal(calls.arcs.length,1);
assert.ok(Math.abs(calls.arcs[0][0]-(-5))<1e-8&&Math.abs(calls.arcs[0][1]-(-26))<1e-8,'muzzle flash matches the rotated barrel tip');
calls.rects=0; calls.arcs=[]; G.FieldCombat.drawWeapon(ctx,pl,{behind:false}); assert.equal(calls.rects,0);
pl.weaponAim=Math.PI/2; G.FieldCombat.drawWeapon(ctx,pl,{behind:true}); assert.equal(calls.rects,0);
G.FieldCombat.drawWeapon(ctx,pl,{behind:false}); assert.equal(calls.rects,3,'downward aim draws once in front');

// Run cleanup clears temporary player stats while keeping copy ammo and reload state.
const copy=pl.fieldWeapons[0]; copy.level=4; copy.ammo=3; copy.reload=.7;
pl.tempStats={health:2,power:3}; G.FieldStats.apply(pl); pl.hp=75;
G.FieldCombat.clearTemporary(pl);
assert.deepEqual({...pl.tempStats},{}); assert.equal(copy.level,1); assert.equal(copy.ammo,3); assert.equal(copy.reload,.7);
assert.equal(pl.hp,75,'clearing bonuses preserves current HP below the new maximum');
assert.ok('ability' in G.FieldCombat.state);

console.log('p04 weapons: ok');
