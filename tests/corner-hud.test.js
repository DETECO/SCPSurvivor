const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const G={};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../js/ui/corner-hud.js'),'utf8'),{G});
const fit=G.CornerHUD.fitBubble,viewport={x:0,y:0,width:844,height:390};
test('NPC text stays in the visible viewport at all four edges',()=>{
 for(const [x,y]of [[-400,-300],[1000,-300],[-400,1000],[1000,1000]]){
  const p=fit({x,y,width:220,height:60},[],viewport);assert.ok(p);assert.ok(p.x>=8&&p.y>=8&&p.x+p.width<=836&&p.y+p.height<=382);
 }
});
test('NPC text avoids top HUD, radar and lower controls with safe-area offsets',()=>{
 const bounds={x:30,y:10,width:784,height:370},blocks=[{x:30,y:10,width:680,height:70},{x:714,y:10,width:100,height:100},{x:30,y:275,width:784,height:105}];
 const p=fit({x:600,y:35,width:220,height:70},blocks,bounds);assert.ok(p);
 for(const b of blocks)assert.ok(!(p.x<b.x+b.width+8&&p.x+p.width>b.x-8&&p.y<b.y+b.height+8&&p.y+p.height>b.y-8));
});
test('NPC bubble is suppressed when no nonoverlapping area exists',()=>{
 assert.equal(fit({x:0,y:0,width:220,height:60},[{...viewport}],viewport),null);
 assert.equal(fit({x:0,y:0,width:900,height:60},[],viewport),null);
 assert.equal(fit({x:0,y:0,width:220,height:400},[],viewport),null);
});
test('NPC layout does not mutate preferred, occupied or camera viewport data',()=>{
 const p={x:15,y:10,width:220,height:60},blocks=[{x:0,y:0,width:844,height:60}],before=JSON.stringify([p,blocks,viewport]);fit(p,blocks,viewport);assert.equal(JSON.stringify([p,blocks,viewport]),before);
});
