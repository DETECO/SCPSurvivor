const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');

function load(){
  class ImageStub {
    static all=[];
    constructor(){ImageStub.all.push(this);}
    set src(value){this._src=value;}
    get src(){return this._src;}
  }
  const G={};
  vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../js/world/rift-room-art.js'),'utf8'),{G,Image:ImageStub,Map,WeakMap});
  return{art:G.RiftRoomArt,images:ImageStub.all};
}

test('portal preloads one plate and later instances reuse the loaded image',()=>{
  const{art,images}=load();
  assert.equal(art.preloadById('malla'),true);
  assert.equal(images.length,1);
  const first=art.generate('malla'),second=art.generate('malla');
  art.preload(first);art.preload(second);
  assert.equal(images.length,1,'one request for the same approved room plate');
  images[0].onload();
  assert.equal(art.loading(second).ready,true);
  assert.deepEqual(Array.from(art.loading(second).pending),[]);
});

test('a failed plate remains a technical failure until a new portal explicitly retries it',()=>{
  const{art,images}=load(),room=art.generate('malla');
  art.preloadById('malla');images[0].onerror();
  assert.equal(art.loading(room).ready,false);
  assert.equal(art.loading(room).failed.length,1);
  assert.equal(images.length,1,'ordinary loading checks never hide a real failure');
  art.preloadById('malla');
  assert.equal(images.length,2,'a later portal can retry the resource');
  images[1].onload();
  assert.equal(art.loading(room).ready,true);
});
