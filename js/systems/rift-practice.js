/* LOT008: practice selection only; never consumes the natural director's random stream. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;if(root.G)root.G.RiftPractice=api;})(globalThis,()=>{
 function create({rng=Math.random}={}){
  let tiers=[],styles=[],selection={tier:'cycle',style:'cycle'};
  function take(bag,values){if(!bag.length){bag.push(...values);for(let i=bag.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[bag[i],bag[j]]=[bag[j],bag[i]];}}return bag.shift();}
  return{select(value){selection={...selection,...value};},next(){return{tier:/^D[1-5]$/.test(selection.tier)?selection.tier:take(tiers,['D1','D2','D3','D4','D5']),style:/^[1-6]$/.test(String(selection.style))?Number(selection.style):take(styles,[1,2,3,4,5,6])};}};
 }
 const cycle=create();
 function initUI(){
  if(!globalThis.G?.RiftExpedition?.practice)return;
  const host=document.querySelector('.operations-start-slot');if(!host||document.getElementById('rift-practice-settings'))return;
  const group=document.createElement('div');group.id='rift-practice-settings';
  for(const [name,title,values]of [['tier','Encuentro',[['cycle','Rotar las cinco BIO'],['D1','D1 · Esporario'],['D2','D2 · Larva'],['D3','D3 · Malla'],['D4','D4 · Portador'],['D5','D5 · Huésped']]],['style','Portal',[['cycle','Rotar los seis portales'],...Array.from({length:6},(_,i)=>[String(i+1),'Estilo '+(i+1)])]]]){
   const label=document.createElement('label');label.textContent=title;const select=document.createElement('select');select.id='rift-practice-'+name;
   for(const [value,text]of values){const option=document.createElement('option');option.value=value;option.textContent=text;select.append(option);}
   const forced=new URLSearchParams(location.search).get(name==='tier'?'grado':'estilo');if(values.some(([v])=>v===forced)){select.value=forced;select.disabled=true;}
   select.onchange=()=>cycle.select({[name]:select.value});label.append(select);group.append(label);
  }host.prepend(group);
 }
 return{create,initUI,next:()=>cycle.next()};
});
