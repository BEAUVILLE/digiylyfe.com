/* DIGIY économie DATA — scope /test-eco-data/ exclusivement */
"use strict";
const CACHE="digiy-eco-test-v1";
const BASE=new URL("./",self.location.href).pathname;
const PAGE=BASE+"index.html",VCF=BASE+"contacts-saly.vcf";
self.addEventListener("install",event=>{event.waitUntil((async()=>{const cache=await caches.open(CACHE);for(const path of [PAGE,VCF]){const r=await fetch(new Request(path,{cache:"reload",credentials:"same-origin"}));if(!r.ok||r.type==="opaque")throw Error("cache");await cache.put(path,r)}await self.skipWaiting()})())});
self.addEventListener("activate",event=>event.waitUntil(self.clients.claim()));
self.addEventListener("fetch",event=>{if(event.request.method!=="GET")return;const u=new URL(event.request.url);if(u.origin!==self.location.origin)return;const isPage=u.pathname===BASE||u.pathname===PAGE,isVcf=u.pathname===VCF;if(!isPage&&!isVcf)return;const key=isPage?PAGE:VCF;event.respondWith((async()=>{const cache=await caches.open(CACHE);if(u.searchParams.get("actualiser")!=="1"){const old=await cache.match(key);if(old)return old}try{const response=await fetch(event.request,{cache:"no-store"});if(response.ok)await cache.put(key,response.clone());return response}catch(e){const old=await cache.match(key);if(old)return old;return new Response("Kit indisponible.",{status:503})}})())});
