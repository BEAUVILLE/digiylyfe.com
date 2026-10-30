/* DIGIYLYFE ÉCONOMIE DATA V1 - public essentials, no media cache.
   Only /hors-connexion.html is cached. Private flows stay network-only.
   /test-eco-data/ keeps its separate service worker and cache.
*/
'use strict';
const DIGIY_PWA_VERSION='digiylyfe-public-essential-20261030-v1';
const CACHE_PREFIX='digiy-public-essential-';
const CACHE_NAME=CACHE_PREFIX+'v1';
const OFFLINE='/hors-connexion.html';
const PUBLIC_ROUTES=new Set([
 '/','/index.html','/annuaire.html','/saly.html','/territoire.html',
 '/senegal.html','/dakar.html','/france.html','/bordeaux.html','/paris.html','/miami.html',
 '/comprendre-digiylyfe.html','/outils-gestion-demo.html',
 '/tarifs-adherents-1.html','/tarifs-loc-v2.html','/fiches/pap-piscine-saly.html'
]);
function isPublicPath(path){
 if(PUBLIC_ROUTES.has(path))return true;
 return /^\/(en|es|pt|it|de|nl|ar)\/(index\.html|saly\.html)?$/.test(path);
}
async function offlineFallback(){
 const cache=await caches.open(CACHE_NAME);
 return (await cache.match(OFFLINE))||new Response('DIGIY essentiel indisponible sur cet appareil.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});
}
self.addEventListener('install',event=>{
 event.waitUntil((async()=>{
  const response=await fetch(new Request(OFFLINE,{cache:'reload',credentials:'omit'}));
  if(!response.ok||response.type==='opaque')throw Error('Répertoire hors connexion indisponible');
  const cache=await caches.open(CACHE_NAME);
  await cache.put(OFFLINE,response);
  await self.skipWaiting();
 })());
});
self.addEventListener('activate',event=>{
 event.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(k=>k.startsWith(CACHE_PREFIX)&&k!==CACHE_NAME).map(k=>caches.delete(k)));
  await self.clients.claim();
 })());
});
self.addEventListener('fetch',event=>{
 const request=event.request;
 if(request.method!=='GET'||request.mode!=='navigate')return;
 const url=new URL(request.url);
 if(url.origin!==self.location.origin)return;
 if(url.pathname===OFFLINE){
  event.respondWith((async()=>{
   try{
    const response=await fetch(request,{cache:'no-store'});
    if(response.ok&&response.type!=='opaque'){
     const cache=await caches.open(CACHE_NAME);
     await cache.put(OFFLINE,response.clone());
    }
    return response;
   }catch(e){return await offlineFallback()}
  })());
  return;
 }
 if(isPublicPath(url.pathname)){
  event.respondWith(fetch(request,{cache:'no-store'}).catch(offlineFallback));
  return;
 }
 // Preserve the historical no-store network navigation policy for everything else.
 event.respondWith(fetch(request,{cache:'no-store'}));
});
