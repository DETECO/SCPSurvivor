/* P06-T01: gestión local de copias ficticias; no guardar ni presentar como inventario de cuenta. */
G.InventoryTrial=(()=>{
  const q=new URLSearchParams(window.location.search),local=['localhost','127.0.0.1','[::1]'].includes(window.location.hostname);
  const directTest=local&&q.get('prueba')==='inventario'&&q.get('cuentas')!=='local';
  const enabled=local&&q.get('cuentas')!=='local'&&(directTest||q.get('inventario')==='local');
  const M=()=>G.InventoryModel,el=id=>document.getElementById(id),clone=s=>JSON.parse(JSON.stringify(s));
  let owned=null,draft=null,draftPhase=null,slot=0,message='';
  function phase(){return G.Game.state==='ui'?'base':G.Game.state==='playing'&&G.Expedition.state.phase==='preparation'?'preparation':null;}
  function name(item){return item.kind==='weapon'?G.FieldCatalog.models[item.model].name:item.kind==='mod'?G.FieldCatalog.mods[item.model].name:M().packs[item.model].name;}
  function sync(state){
    if(!G.Game.player||!['playing','paused'].includes(G.Game.state))return;
    for(const w of G.FieldCombat.exportData().weapons){const item=state.items[w.id];if(item)for(const key of ['ammo','reload','reloadTime','level'])item[key]=w[key];}
  }
  function summary(){
    if(!enabled||!owned)return;
    el('inventory-summary').textContent=`Equipo: ${owned.equipped.weapons.map(id=>name(owned.items[id])).join(' / ')} · Mochila ${owned.bag.length}/${M().capacity(owned)} · Almacén ${owned.storage.length}/60. Solo equipo de ejemplo; no se guarda.`;
  }
  function close(notice=''){draft=null;draftPhase=null;message='';el('inventory-overlay').hidden=true;if(notice)el('inventory-notice').textContent=notice;summary();}
  function command(c){try{draft=M().apply(draft,c,draftPhase);message='Cambio en borrador; confirma para aplicarlo.';}catch(e){message=e.message;}render();}
  function action(parent,text,fn){const b=document.createElement('button');b.textContent=text;b.onclick=fn;parent.append(b);return b;}
  function label(id){const item=draft.items[id],p=document.createElement('p');p.dataset.copyId=id;
    p.textContent=`${name(item)} · copia ${Object.keys(draft.items).indexOf(id)+1}${item.kind==='weapon'&&item.ammo!==null?` · ${Math.floor(item.ammo)} disparos · recarga ${item.reload.toFixed(1)} s`:''}`;return p;}
  function render(){
    const host=el('inventory-content');host.replaceChildren();
    el('inventory-draft-note').textContent=message||'Los cambios se aplican al confirmar. El descanso sigue avanzando.';
    const target=document.createElement('label');target.textContent='Arma de destino ';const select=document.createElement('select');select.id='inventory-target-slot';
    for(let i=0;i<2;i++){const option=document.createElement('option');option.value=i;option.textContent=`${i+1}. ${name(draft.items[draft.equipped.weapons[i]])}`;select.append(option);}
    select.value=slot;select.onchange=()=>{slot=Number(select.value);render();};target.append(select);host.append(target);
    const equipped=document.createElement('section');const title=document.createElement('h3');title.textContent='Equipado';equipped.append(title);
    draft.equipped.weapons.forEach((id,index)=>{const row=document.createElement('div');row.className='inventory-row';row.append(label(id));
      for(const mod of draft.items[id].mods)action(row,`Retirar ${name(draft.items[mod])}`,()=>command({type:'removeMod',id:mod,slot:index}));equipped.append(row);});
    equipped.append(label(draft.equipped.backpack));host.append(equipped);
    for(const where of ['bag','storage']){
      const section=document.createElement('section'),heading=document.createElement('h3');
      heading.textContent=where==='bag'?`Mochila ${draft.bag.length}/${M().capacity(draft)}`:`Almacén ${draft.storage.length}/60`;section.append(heading);
      if(where==='storage'&&draftPhase!=='base'){const text=document.createElement('p');text.textContent='Disponible al volver a la base.';section.append(text);host.append(section);continue;}
      for(const id of draft[where]){const item=draft.items[id],row=document.createElement('div');row.className='inventory-row';row.append(label(id));
        if(item.kind==='weapon')action(row,'Equipar en arma '+(slot+1),()=>command({type:'equipWeapon',id,slot}));
        else if(item.kind==='backpack')action(row,'Equipar mochila',()=>command({type:'equipBackpack',id}));
        else{
          const w=draft.items[draft.equipped.weapons[slot]];
          if(w.mods.length<2)action(row,'Instalar en arma '+(slot+1),()=>command({type:'installMod',id,slot}));
          for(const old of w.mods)action(row,'Sustituir '+name(draft.items[old]),()=>command({type:'installMod',id,slot,replace:old}));
        }
        if(draftPhase==='base')action(row,where==='bag'?'Guardar en almacén':'Llevar en mochila',()=>command({type:'move',id,to:where==='bag'?'storage':'bag'}));
        section.append(row);
      }
      host.append(section);
    }
  }
  function open(){
    const p=phase();if(!enabled||!p)return false;
    sync(owned);draft=clone(owned);draftPhase=p;message='';G.Input.reset();G.Touch.reset();
    render();el('inventory-overlay').hidden=false;el('inventory-overlay').scrollTop=0;el('inventory-overlay').querySelector('.panel').scrollTop=0;return true;
  }
  function confirm(){
    if(!draft)return false;
    if(phase()!==draftPhase){close('El descanso terminó; borrador descartado.');return false;}
    try{
      sync(draft);M().validate(draft);
      if(draftPhase==='preparation'){
        const combat=G.FieldCombat.exportData();
        G.FieldCombat.restoreData({...combat,weapons:M().loadout(draft)},G.Game.player);
        sync(draft); // Conservar también el clamp de cargador y la proporción de recarga aplicados por FieldCombat.
      }
      owned=clone(draft);close('Equipo confirmado para esta prueba local.');return true;
    }catch(e){message=e.message;render();return false;}
  }
  function prepare(options){
    if(!enabled)return options;
    if(!owned)owned=M().fixture();
    for(const item of Object.values(owned.items))if(item.kind==='weapon'){item.level=1;item.ammo=null;item.reload=0;item.reloadTime=0;}
    close();return{...options,loadout:M().loadout(owned)};
  }
  function tick(){
    if(!enabled)return;
    const p=phase();el('btn-inventory').hidden=p!=='preparation';
    if(draft&&p!==draftPhase)close('Gestión cerrada; cambios sin confirmar descartados.');
    if(draft){const text=p==='preparation'?`Preparación: ${Math.ceil(G.Expedition.state.prep)} s · el descanso sigue avanzando`:'Gestión en la base';if(el('inventory-time').textContent!==text)el('inventory-time').textContent=text;}
  }
  function init(){
    if(!enabled)return;
    owned=M().fixture();
    const section=document.createElement('section');section.className='inventory-base';
    section.innerHTML='<h2>Inventario de prueba · P06</h2><p id="inventory-summary"></p><p>Gestiona copias físicas en la base y entre oleadas. Esta primera prueba no incluye pérdidas, recuperación ni buzón.</p><p id="inventory-notice" role="status"></p><button id="inventory-open">Gestionar equipo</button>';
    el('technical-ready').querySelector('.panel').insertBefore(section,el('btn-technical-start'));
    for(const host of document.querySelectorAll('.loadout-weapons,#loadout-preview,#loadout-preview-summary'))host.hidden=true;
    const overlay=document.createElement('section');overlay.id='inventory-overlay';overlay.className='overlay';overlay.hidden=true;overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-label','Gestionar inventario de prueba');
    overlay.innerHTML='<div class="panel"><p class="eyebrow">EQUIPO LOCAL DE PRUEBA</p><h2>Inventario</h2><p id="inventory-time"></p><p id="inventory-draft-note" role="status"></p><div id="inventory-content"></div><button id="inventory-confirm" class="primary">Confirmar equipo</button><button id="inventory-cancel">Cancelar cambios</button></div>';
    el('viewport').append(overlay);
    const b=document.createElement('button');b.id='btn-inventory';b.hidden=true;b.textContent='Inventario';el('field-controls').append(b);
    el('inventory-open').onclick=b.onclick=open;el('inventory-confirm').onclick=confirm;el('inventory-cancel').onclick=()=>close('Borrador cancelado.');
    if(directTest)el('btn-technical-start').textContent='Iniciar prueba de inventario';
    summary();
  }
  return{enabled,directTest,init,tick,open,confirm,prepare,get isOpen(){return!!draft;},get state(){return owned?clone(owned):null;}};
})();
