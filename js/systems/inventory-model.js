/* P06: copias y espacios; modelo local puro, todavía sin autoridad/persistencia de cuenta. */
G.InventoryModel=(()=>{
  const packs=Object.freeze({basic:{name:'Mochila de 8 espacios',capacity:8},large:{name:'Mochila de 16 espacios',capacity:16}});
  const clone=value=>JSON.parse(JSON.stringify(value));
  const check=(ok,message)=>{if(!ok)throw new Error(message);};
  const owns=(catalog,key)=>typeof key==='string'&&Object.prototype.hasOwnProperty.call(catalog,key);
  function capacity(s){return packs[s.items[s.equipped.backpack]?.model]?.capacity||0;}
  function validate(s){
    check(s&&s.items&&s.equipped&&Array.isArray(s.bag)&&Array.isArray(s.storage),'Inventario incompleto.');
    check(Array.isArray(s.equipped.weapons)&&s.equipped.weapons.length===2,'Se requieren dos slots de arma.');
    const seen=new Set();
    function visit(id,kind){
      const item=s.items[id];check(typeof id==='string'&&id&&item&&item.id===id,'Referencia a copia inválida.');
      check(!seen.has(id),'Copia duplicada.');seen.add(id);check(!kind||item.kind===kind,'Tipo de copia incompatible.');
      if(item.kind==='weapon'){
        check(owns(G.FieldCatalog.models,item.model)&&Array.isArray(item.mods),'Modelo de arma inválido.');
        const modModels=item.mods.map(id=>s.items[id]?.model);
        check(G.FieldCatalog.validateMods(item.model,modModels),'Mods incompatibles o duplicados.');
        check(Number.isInteger(item.level)&&item.level>=1&&item.level<=5&&
          (item.ammo===null||(Number.isFinite(item.ammo)&&item.ammo>=0))&&Number.isFinite(item.reload)&&item.reload>=0&&Number.isFinite(item.reloadTime)&&item.reloadTime>=0,'Estado de arma inválido.');
        for(const id of item.mods)visit(id,'mod');
      }else if(item.kind==='mod')check(owns(G.FieldCatalog.mods,item.model),'Modelo de mod inválido.');
      else if(item.kind==='backpack')check(owns(packs,item.model),'Modelo de mochila inválido.');
      else check(false,'Tipo de copia desconocido.');
    }
    for(const id of s.equipped.weapons)visit(id,'weapon');visit(s.equipped.backpack,'backpack');
    for(const id of [...s.bag,...s.storage])visit(id);
    check(Object.keys(s.items).every(id=>seen.has(id)),'Copia sin ubicación.');
    check(s.bag.length<=capacity(s),'El contenido no cabe en la capacidad de la mochila.');
    check(s.storage.length<=60,'El almacén supera su capacidad de60 espacios.');return true;
  }
  function fixture(loadout=G.FieldCatalog.defaultLoadout()){
    const s={items:{},equipped:{weapons:[],backpack:'trial:pack:basic'},bag:[],storage:[]};
    const add=item=>{check(!s.items[item.id],'ID de copia duplicado.');s.items[item.id]=item;return item.id;};
    loadout.forEach(w=>{
      const mods=(w.mods||[]).map((model,n)=>add({id:'trial:installed:'+w.id+':'+n,kind:'mod',model}));
      add({id:w.id,kind:'weapon',model:w.model,mods,level:1,ammo:null,reload:0,reloadTime:0});s.equipped.weapons.push(w.id);
    });
    add({id:'trial:pack:basic',kind:'backpack',model:'basic'});
    s.bag.push(add({id:'trial:pack:large',kind:'backpack',model:'large'}));
    for(const model of Object.keys(G.FieldCatalog.models))s.bag.push(add({id:'trial:weapon:'+model,kind:'weapon',model,mods:[],level:1,ammo:null,reload:0,reloadTime:0}));
    Object.keys(G.FieldCatalog.mods).forEach((model,n)=>{const id=add({id:'trial:mod:'+model,kind:'mod',model});(n<4?s.bag:s.storage).push(id);});
    validate(s);return s;
  }
  function apply(state,command,phase){
    check(['base','preparation'].includes(phase),'Gestiona equipo solo en base o preparación.');validate(state);
    const s=clone(state),c=command||{},item=s.items[c.id];check(item,'Copia inexistente.');
    const origin=s.bag.includes(c.id)?s.bag:s.storage.includes(c.id)?s.storage:null;
    const source=()=>{check(origin,'Selecciona una copia de reserva.');check(origin!==s.storage||phase==='base','El almacén solo está disponible en base.');return origin.indexOf(c.id);};
    const weapon=()=>{check(Number.isInteger(c.slot)&&c.slot>=0&&c.slot<2,'Slot de arma inválido.');return s.items[s.equipped.weapons[c.slot]];};
    if(c.type==='move'){
      check(phase==='base','Las transferencias de almacén son solo en base.');check(['bag','storage'].includes(c.to),'Destino inválido.');
      const index=source(),dest=s[c.to];check(dest!==origin,'La copia ya está en ese destino.');origin.splice(index,1);dest.push(c.id);
    }else if(c.type==='equipWeapon'){
      check(item.kind==='weapon','Selecciona un arma.');const index=source(),old=weapon();
      origin[index]=old.id;s.equipped.weapons[c.slot]=c.id;
    }else if(c.type==='equipBackpack'){
      check(item.kind==='backpack','Selecciona una mochila.');const index=source();origin[index]=s.equipped.backpack;s.equipped.backpack=c.id;
    }else if(c.type==='installMod'){
      check(item.kind==='mod','Selecciona un mod.');const index=source(),target=weapon();
      if(c.replace){const old=target.mods.indexOf(c.replace);check(old>=0,'El mod a sustituir no está instalado.');target.mods[old]=c.id;origin[index]=c.replace;}
      else{target.mods.push(c.id);origin.splice(index,1);}
    }else if(c.type==='removeMod'){
      const target=weapon(),index=target.mods.indexOf(c.id);check(index>=0,'El mod no está instalado en esa arma.');target.mods.splice(index,1);s.bag.push(c.id);
    }else check(false,'Operación de inventario desconocida.');
    validate(s);return s;
  }
  function loadout(s){validate(s);return s.equipped.weapons.map(id=>{const w=s.items[id];return{id,model:w.model,mods:w.mods.map(id=>s.items[id].model),level:w.level,ammo:w.ammo,reload:w.reload,reloadTime:w.reloadTime};});}
  return{packs,capacity,validate,fixture,apply,loadout};
})();
