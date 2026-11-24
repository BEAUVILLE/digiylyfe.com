import assert from 'node:assert/strict';
import fs from 'node:fs';
const base='https://wesqmwjjtsefyjnluosj.supabase.co';
const key=fs.readFileSync('annuaire.html','utf8').match(/var ANON_KEY='([^']+)'/)?.[1];
const email=process.env.DIGIY_SIGNAL_EMAIL,password=process.env.DIGIY_SIGNAL_PASSWORD;
assert(key&&email&&password,'Missing configuration');
const request=(url,opts={})=>fetch(url,{...opts,signal:AbortSignal.timeout(15000)});
const login=await request(base+'/auth/v1/token?grant_type=password',{method:'POST',headers:{apikey:key,'Content-Type':'application/json'},body:JSON.stringify({email,password})});
assert(login.ok,'Authentication failed: '+login.status);
const session=await login.json();
assert.equal(session.user.id,'7465f40c-08d5-48f8-ac5e-990b4492ad88');
const headers={apikey:key,Authorization:'Bearer '+session.access_token,'Content-Type':'application/json'};
const path='/storage/v1/object/digiy-signal/v2/test.json';
const publicPath='/storage/v1/object/public/digiy-signal/v2/test.json';
const first={version:2,test:true,items:[{name:'FICTIF SIGNAL TEST'}]};
const empty={version:2,test:true,items:[]};
async function upload(data){
 const r=await request(base+path,{method:'POST',headers:{...headers,'x-upsert':'true','cache-control':'0'},body:JSON.stringify(data)});
 assert(r.ok,'Upload failed: '+r.status);
}
async function read(expected){
 for(let i=0;i<5;i++){
   const r=await request(base+publicPath+'?test='+Date.now(),{cache:'no-store'});
   if(r.ok){const d=await r.json();if(JSON.stringify(d)===JSON.stringify(expected))return;}
   await new Promise(r=>setTimeout(r,2000));
 }
 throw Error('Public cache did not match expected fixture');
}
try{
 const denied=await request(base+path,{method:'POST',headers:{apikey:key,Authorization:'Bearer '+key,'Content-Type':'application/json','x-upsert':'true'},body:JSON.stringify(first)});
 assert([400,401,403].includes(denied.status),'Anonymous write was not rejected');
 await upload(first);await read(first);console.log('PASS: authenticated upload and public read');
 await upload(empty);await read(empty);console.log('PASS: fictional entry removed by replacement');
}finally{
 const r=await request(base+'/storage/v1/object/digiy-signal',{method:'DELETE',headers,body:JSON.stringify({prefixes:['v2/test.json']})});
 assert(r.ok,'Test cleanup failed: '+r.status);
 const check=await request(base+path,{headers,cache:'no-store'});
 assert([400,404].includes(check.status),'Test object absence not confirmed: '+check.status);
 console.log('PASS: test object cleanup');
}
