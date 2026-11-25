import assert from 'node:assert/strict';
import fs from 'node:fs';
const base='https://wesqmwjjtsefyjnluosj.supabase.co';
const key=fs.readFileSync('annuaire.html','utf8').match(/var ANON_KEY='([^']+)'/)?.[1];
const email=process.env.DIGIY_SIGNAL_EMAIL,password=process.env.DIGIY_SIGNAL_PASSWORD;
assert(key&&email&&password,'Missing configuration');
const chunks=[];let size=0;
for await(const chunk of process.stdin){size+=chunk.length;assert(size<=2097152,'Snapshot exceeds bucket limit');chunks.push(chunk);}
const data=JSON.parse(Buffer.concat(chunks).toString('utf8'));
assert.equal(data.version,2);
assert(Array.isArray(data.items));
const ids=new Set();
for(const p of data.items){
 assert(Object.keys(p).every(k=>['id','name','source','activity','territories','country_code'].includes(k)));
 assert(typeof p.name==='string'&&p.name.trim());
 assert(typeof p.id==='string'&&/^[0-9a-f-]{36}$/i.test(p.id));
 assert(!ids.has(p.id));ids.add(p.id);
 assert.equal(p.source,'https://digiylyfe.com/annuaire.html?fiche='+encodeURIComponent(p.id));
}
data.generated_at=new Date().toISOString();
data.notice='Instantané public. Vérifier les pages sources pour les informations actuelles. Aucun statut payant ni disponibilité attestés.';
const body=JSON.stringify(data)+'\n';
assert(Buffer.byteLength(body)<=2097152,'Snapshot exceeds bucket limit');
const request=(url,opts={})=>fetch(url,{...opts,signal:AbortSignal.timeout(20000)});
const login=await request(base+'/auth/v1/token?grant_type=password',{method:'POST',headers:{apikey:key,'Content-Type':'application/json'},body:JSON.stringify({email,password})});
assert(login.ok,'Authentication failed: '+login.status);
const session=await login.json();
assert.equal(session.user.id,'7465f40c-08d5-48f8-ac5e-990b4492ad88');
const path='/storage/v1/object/digiy-signal/v2/index.json';
const headers={apikey:key,Authorization:'Bearer '+session.access_token,'Content-Type':'application/json'};
const r=await request(base+path,{method:'POST',headers:{...headers,'x-upsert':'true','cache-control':'60'},body});
assert(r.ok,'Upload failed: '+r.status);
let verified=false;
for(let i=0;i<5;i++){
 const read=await request(base+'/storage/v1/object/public/digiy-signal/v2/index.json?check='+Date.now(),{cache:'no-store'});
 if(read.ok&&JSON.stringify(await read.json())===JSON.stringify(data)){verified=true;break;}
 await new Promise(r=>setTimeout(r,2000));
}
assert(verified,'Public read-back mismatch');
console.log('SIGNAL V2 published: '+data.items.length+' records, '+Buffer.byteLength(body)+' bytes; public read-back verified.');
