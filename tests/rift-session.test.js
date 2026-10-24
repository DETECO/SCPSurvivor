const {test}=require('node:test');
const assert=require('node:assert/strict');
const {create}=require('../js/systems/rift-session.js');
test('transition, pause and invalid deltas cannot consume the room clock',()=>{
 const s=create('a');s.tick(10,{paused:true});assert.equal(s.state.time,0);
 s.tick(.25);assert.equal(s.state.time,0);s.tick(.25);assert.equal(s.state.time,0);
 s.tick(NaN);s.tick(-1);assert.equal(s.state.time,0);s.tick(1);assert.equal(s.state.time,1);
});
test('one reachable escape window and warning; expiration never reopens it',()=>{
 const s=create('a');s.tick(.5);s.tick(75);assert.equal(s.state.escape,'warning');
 s.tick(15);assert.equal(s.state.escape,'open');s.tick(5);assert.equal(s.state.escape,'expired');
 assert.equal(s.escape(),false);s.tick(1000);assert.equal(s.state.escape,'expired');
 assert.equal(s.win(),true);assert.equal(s.state.status,'victory');assert.equal(s.claim(),true);assert.equal(s.claim(),false);
});
test('escape and death have no reward; victory is idempotent and independent from escape',()=>{
 const a=create('a');a.tick(.5);a.tick(90);assert.equal(a.escape(),true);assert.equal(a.win(),false);assert.equal(a.claim(),false);
 const b=create('b');b.die();assert.equal(b.win(),false);assert.equal(b.claim(),false);
 const c=create('c');c.tick(.5);c.win();assert.equal(c.win(),false);assert.equal(c.claim(),true);
});
