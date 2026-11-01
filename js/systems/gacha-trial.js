/* LOT015: in-memory trial for loopback or the official HTTPS Pages demo; no accounts or persistent rewards. */
(function(root,factory){
 const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;
 if(root.G)root.G.GachaTrial=api.create({enabled:()=>{
  const loc=root.window?.location;if(!loc)return false;
  const local=['localhost','127.0.0.1','[::1]','::1'].includes(loc.hostname);
  const pages=loc.protocol==='https:'&&loc.hostname==='deteco.github.io'&&loc.pathname.startsWith('/SCPSurvivor/');
  const q=new URLSearchParams(loc.search);return (local||pages)&&q.get('gacha')==='prueba'&&!q.has('cuentas')&&root.G.MapTrial?.enabled===true;
 }});
})(globalThis,()=>{
 const names={characters:'Personaje',weapons:'Arma',ultimates:'Ultimate'};
 const catalogue=Object.fromEntries(Object.entries(names).map(([key,name])=>[key,{
  normal:[`${name} normal de muestra`],rare:[`${name} raro de muestra`],exceptional:[`${name} excepcional de muestra`]
 }]));
 function create({enabled=()=>false,rng=Math.random,catalogue:catalog=catalogue}={}){
  let wallet={gray:0,gold:0},counters=Object.fromEntries(Object.keys(names).map(k=>[k,{rare:0,exceptional:0}]));
  let owned=Object.fromEntries(Object.keys(names).map(k=>[k,new Set()])),receipts=new Set(),busy=false,lastResults=[],run=0;
  const fail=reason=>({ok:false,reason});
  const allowed=()=>enabled()===true;
  function beginRun(){if(allowed())run++;return run;}
  function credit(id,amount){
   if(!allowed())return fail('disabled');
   if(typeof id!=='string'||!id.trim()||!amount||!Number.isSafeInteger(amount.gray)||!Number.isSafeInteger(amount.gold)||amount.gray<0||amount.gold<0||(!amount.gray&&!amount.gold))return fail('invalid');
   if(receipts.has(id))return fail('already-claimed');
   if(!Number.isSafeInteger(wallet.gray+amount.gray)||!Number.isSafeInteger(wallet.gold+amount.gold))return fail('overflow');
   wallet={gray:wallet.gray+amount.gray,gold:wallet.gold+amount.gold};receipts.add(id);return{ok:true};
  }
  function sample(){const n=rng();if(!Number.isFinite(n)||n<0||n>=1)throw Error('rng');return n;}
  function pull(section,payment){
   if(!allowed())return fail('disabled');if(busy)return fail('busy');
   if(!Object.prototype.hasOwnProperty.call(names,section))return fail('section');
   const offers={gray:{gray:1,gold:0,count:1},gray5:{gray:5,gold:0,count:5},gold:{gray:0,gold:1,count:5}};
   if(!Object.prototype.hasOwnProperty.call(offers,payment))return fail('payment');
   const offer=offers[payment];if(wallet.gray<offer.gray||wallet.gold<offer.gold)return fail('balance');
   const c={...counters[section]},seen=new Set(owned[section]),results=[];
   try{
    for(let i=0;i<offer.count;i++){
     const n=sample();let rarity=n<.70?'normal':n<.95?'rare':'exceptional';
     if(c.exceptional>=39)rarity='exceptional';else if(c.rare>=9&&rarity==='normal')rarity='rare';
     const pool=catalog?.[section]?.[rarity];if(!Array.isArray(pool)||!pool.length||pool.some(x=>typeof x!=='string'||!x.trim()))return fail('candidates');
     const item=pool[Math.floor(sample()*pool.length)],isNew=!seen.has(item);seen.add(item);
     if(rarity==='exceptional'){c.rare=0;c.exceptional=0;}else if(rarity==='rare'){c.rare=0;c.exceptional++;}else{c.rare++;c.exceptional++;}
     results.push({rarity,item,isNew});
    }
   }catch(_){return fail('rng');}
   wallet={gray:wallet.gray-offer.gray,gold:wallet.gold-offer.gold};counters[section]=c;owned[section]=seen;lastResults=results;busy=true;
   return{ok:true,results:results.map(x=>({...x}))};
  }
  function release(){busy=false;lastResults=[];}
  return{get enabled(){return allowed();},beginRun,credit,pull,release,get state(){return{wallet:{...wallet},counters:Object.fromEntries(Object.entries(counters).map(([k,v])=>[k,{...v}])),results:lastResults.map(r=>({...r})),busy,run};}};
 }
 return{create};
});
