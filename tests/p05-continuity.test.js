'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function setup(){
 const G={};let error=false,saves=0;
 const run={id:'run-a',sessionId:'tab-a',rankEligible:true,checkpoint:{schemaVersion:1}};
 G.Game={state:'playing',player:{hp:80},togglePause(){this.state=this.state==='playing'?'paused':'playing'},startTechnical(){this.state='playing'},toUI(){this.state='ui'}};
 G.RunCheckpoint={capture:()=>({schemaVersion:1}),restore:()=>({ok:true})};
 G.Expedition={state:{phase:'preparation'}};
 G.LocalAccounts={enabled:true,sessionId:'tab-a',user:{uid:'a',emailVerified:true},data:{revision:1,profile:{alias:'Prueba'},activeRun:run},pending:null,busy:false,
  async refresh(){return this.data},async command(){saves++;if(error)throw Error('offline');return this.data},async retry(){return this.data}};
 const window={addEventListener(){},dispatchEvent(){}};
 vm.runInNewContext(fs.readFileSync(require.resolve('../js/systems/run-continuity.js'),'utf8'),{G,window,Date,console});
 return{G,fail:()=>error=true,get saves(){return saves}};
}
test('confirmed boundary resumes only the session that owns the run',async()=>{
 const a=setup();await a.G.RunContinuity.resume();await a.G.RunContinuity.boundary('preparation');
 assert.equal(a.G.RunContinuity.blocked,false);assert.equal(a.G.Game.state,'playing');assert.equal(a.saves,2);
});
test('a failed checkpoint leaves the game paused until confirmation',async()=>{
 const a=setup();await a.G.RunContinuity.resume();a.fail();await a.G.RunContinuity.boundary('preparation');
 assert.equal(a.G.Game.state,'paused');assert.equal(a.G.RunContinuity.blocked,true);
});
test('a server lease owned by another tab cannot be resumed implicitly',async()=>{
 const a=setup();await a.G.RunContinuity.resume();a.G.LocalAccounts.data.activeRun.sessionId='tab-b';
 await a.G.RunContinuity.checkSession();assert.equal(a.G.Game.state,'paused');assert.equal(a.G.RunContinuity.blocked,true);
});

test('retry does not unblock an old playable state after another tab claims it',async()=>{
 const a=setup();await a.G.RunContinuity.resume();a.G.LocalAccounts.data.activeRun.sessionId='tab-b';
 await a.G.RunContinuity.checkSession();await a.G.RunContinuity.retry();
 assert.equal(a.G.RunContinuity.blocked,true);assert.equal(a.G.Game.state,'paused');
});

test('retry cannot release a stale player when checkpoint restoration failed',async()=>{
 const a=setup();a.G.RunCheckpoint.restore=()=>({ok:false,error:'incompatible'});
 await assert.rejects(a.G.RunContinuity.resume(),/incompatible/);
 await a.G.RunContinuity.retry();assert.equal(a.G.RunContinuity.blocked,true);
 assert.equal(a.G.Game.state,'paused');
});
