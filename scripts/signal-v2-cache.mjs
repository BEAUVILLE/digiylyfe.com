// Build an ephemeral SIGNAL V2 snapshot from the verified public generator.
// Usage: node scripts/signal-v2.mjs | node scripts/signal-v2-cache.mjs
// Output is one JSON document, suitable for a replaceable public cache.
// No files or DB writes. Never commit real snapshots to public Git history.
import assert from 'node:assert/strict';
const origin='https://digiylyfe.com';
const idPattern=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function build(input){
  assert.equal(input.version,2);
  assert(Array.isArray(input.items));
  const ids=new Set();
  const items=input.items.map(p=>{
    assert(typeof p.id==='string'&&idPattern.test(p.id));
    assert(!ids.has(p.id),'Duplicate ID');ids.add(p.id);
    assert(typeof p.name==='string'&&p.name.trim());
    assert.equal(p.source,origin+'/annuaire.html?fiche='+encodeURIComponent(p.id));
    const item={id:p.id,name:p.name,source:p.source};
    if(typeof p.activity==='string'&&p.activity.trim())item.activity=p.activity;
    if(Array.isArray(p.territories)){
      assert(p.territories.every(x=>typeof x==='string'));
      item.territories=[...new Set(p.territories.filter(x=>x.trim()))];
    }
    if(typeof p.country_code==='string'&&/^[a-z]{2}$/i.test(p.country_code))item.country_code=p.country_code;
    return item;
  }).sort((a,b)=>a.id.localeCompare(b.id));
  return {version:2,publisher:'DIGIYLYFE',notice:'Instantané de données publiques. Les pages sources font foi. Aucun statut payant ni disponibilité attestés.',items};
}
function test(){
  const id='11111111-1111-4111-8111-111111111111';
  const p={id,name:'Exemple fictif',source:origin+'/annuaire.html?fiche='+id,activity:'Artisan',territories:['Saly'],private_token:'SECRET'};
  const first=build({version:2,items:[p]});
  assert.equal(first.items.length,1);
  assert(!JSON.stringify(first).includes('SECRET'));
  assert.equal(build({version:2,items:[]}).items.length,0);
  assert.throws(()=>build({version:2,items:[p,p]}));
  assert.throws(()=>build({version:2,items:[{...p,source:'https://example.com'}]}));
  assert.throws(()=>build({version:1,items:[p]}));
  console.log('SIGNAL V2 cache self-test OK');
}
if(process.argv.includes('--self-test'))test();
else{
  const chunks=[];let size=0;
  for await(const chunk of process.stdin){size+=chunk.length;assert(size<=20*1024*1024,'Snapshot too large');chunks.push(chunk);}
  const output=build(JSON.parse(Buffer.concat(chunks).toString('utf8')));
  process.stdout.write(JSON.stringify(output)+'\n');
}
