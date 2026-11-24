// SIGNAL V2 prototype: anonymous public directory only. Node >= 20.
// Run: node scripts/signal-v2.mjs --self-test
// Preview: DIGIY_ANON_KEY=... node scripts/signal-v2.mjs > /tmp/signal-v2.json
// No publication, no writes to database, no service role.
import assert from 'node:assert/strict';
const origin='https://digiylyfe.com';
const base='https://wesqmwjjtsefyjnluosj.supabase.co/rest/v1/';
const clean=v=>typeof v==='string'?v.trim():'';
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function source(p){
  // Use the same public per-record route as annuaire.html; no contact or management URL.
  return origin+'/annuaire.html?fiche='+encodeURIComponent(p.id);
}
function build(pro,vol,zones,jobs,served){
  const z=new Map(zones.map(x=>[x.id,clean(x.label)]));
  const j=new Map(jobs.map(x=>[x.id,clean(x.label)]));
  const ids=new Set(),items=[];
  for(const [rows,kind] of [[pro,'professional'],[vol,'volunteer']]){
    for(const p of rows){
      if(p.is_active!==true||p.is_public!==true||!uuid.test(p.id)||!clean(p.display_name))continue;
      if(kind==='professional'&&p.entry_type!=='professional')continue;
      if(ids.has(p.id))throw Error('Duplicate public ID: '+p.id);
      ids.add(p.id);
      const territories=[clean(p.city),z.get(p.zone_id),...served.filter(x=>x.card_id===p.id).map(x=>z.get(x.zone_id))].filter(Boolean);
      const activity=clean(p.activity_label)||j.get(p.metier_id);
      const item={id:p.id,name:clean(p.display_name),source:source(p)};
      if(activity)item.activity=activity;
      if(territories.length)item.territories=[...new Set(territories)];
      if(clean(p.country_code))item.country_code=clean(p.country_code);
      items.push(item);
    }
  }
  items.sort((a,b)=>a.id.localeCompare(b.id));
  return {version:2,publisher:'DIGIYLYFE',notice:'Données publiques de l’annuaire. Aucun statut payant ni disponibilité attestés.',items};
}
async function read(table,params,key,order='id'){
  const rows=[];let offset=0;
  for(;;){
    const q=new URLSearchParams({...params,order,limit:'200',offset:String(offset)});
    const res=await fetch(base+table+'?'+q,{headers:{apikey:key,Authorization:'Bearer '+key,Accept:'application/json',Prefer:'count=exact'},cache:'no-store',signal:AbortSignal.timeout(20000)});
    if(!res.ok)throw Error(table+' HTTP '+res.status);
    const batch=await res.json();
    if(!Array.isArray(batch))throw Error('Invalid response '+table);
    const count=res.headers.get('content-range')?.split('/').pop();
    if(!count||!/^\d+$/.test(count))throw Error('Missing exact count '+table);
    rows.push(...batch);offset+=batch.length;
    if(offset===Number(count))return rows;
    if(!batch.length||offset>Number(count)||offset>100000)throw Error('Incomplete pagination '+table);
  }
}
async function main(){
  const key=process.env.DIGIY_ANON_KEY;
  // Accept only legacy JWT anon or Supabase publishable key; never service-role.
  let anon=false;
  try{anon=JSON.parse(Buffer.from(key.split('.')[1],'base64url').toString()).role==='anon'}catch{}
  if(!key||!(anon||key.startsWith('sb_publishable_')))throw Error('Public anon key required');
  const filters={is_active:'eq.true',is_public:'eq.true'};
  const [p,v,z,j,s]=await Promise.all([
    read('digiy_annuaire_public',{select:'id,display_name,activity_label,metier_id,zone_id,entry_type,is_active,is_public',entry_type:'eq.professional',...filters},key),
    read('digiy_annuaire_volontaires',{select:'id,display_name,activity_label,city,country_code,is_active,is_public',...filters},key),
    read('digiy_zones',{select:'id,label',is_active:'eq.true'},key),
    read('digiy_metiers',{select:'id,label',is_active:'eq.true'},key),
    read('digiy_annuaire_public_zones',{select:'card_id,zone_id'},key,'card_id,zone_id')
  ]);
  console.log(JSON.stringify(build(p,v,z,j,s),null,2));
}
function test(){
  const id='11111111-1111-4111-8111-111111111111';
  const p={id,display_name:'Test',activity_label:'Plombier',zone_id:'z',is_active:true,is_public:true,entry_type:'professional',management_token:'SECRET',phone_public:'SECRET'};
  const r=build([p],[],[{id:'z',label:'Saly'}],[],[]);
  assert.equal(r.items.length,1);assert.equal(r.items[0].activity,'Plombier');
  assert.deepEqual(r.items[0].territories,['Saly']);
  assert(!JSON.stringify(r).includes('SECRET'));
  assert.equal(build([{...p,is_public:false}],[],[],[],[]).items.length,0);
  assert.equal(build([{...p,is_active:false}],[],[],[],[]).items.length,0);
  assert.equal(build([{...p,entry_type:'module'}],[],[],[],[]).items.length,0);
  assert.throws(()=>build([p,p],[],[],[],[]));
  assert.equal(build([],[],[],[],[]).items.length,0);
  assert.equal(build([], [{...p,city:'Paris',country_code:'fr'}],[],[],[]).items[0].country_code,'fr');
  console.log('SIGNAL V2 self-test OK');
}
if(process.argv.includes('--self-test'))test();else await main();
