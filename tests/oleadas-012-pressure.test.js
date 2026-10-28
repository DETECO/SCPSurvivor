const {test}=require('node:test'),assert=require('node:assert/strict');
const pressure=require('../js/systems/expedition-pressure.js');
test('012 only the active last minute raises total capacity, reserving the boss within eighty',()=>{
 for(const seconds of [240,240.001,270,299.999]){
  assert.equal(pressure.at(1,seconds,64).cap,80);
  assert.equal(pressure.at(1,seconds,64,1).cap,79);
  assert.equal(pressure.at(100,seconds,64).cap,80);
 }
 assert.equal(pressure.at(1,239.999,64,1).cap,34);
 assert.equal(pressure.at(1,300,64).cap,40);
 assert.equal(pressure.at(1,240).rate,1.9);
 assert.equal(pressure.at(1,240).scale.hp,1.6);
});
