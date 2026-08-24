const CACHE = "digiy-carnet-master-test-v3-pro-carnet-sync-20260824";
const CORE = [
  "./",
  "./index.html",
  "./master-config.js",
  "./manifest.webmanifest",
  "./app/guard.js",
  "./app/hub.html",
  "./app/index.html",
  "./app/oreille.html",
  "./app/dettes.html",
  "./assets/carnet-contract.js",
  "./assets/carnet-store.js",
  "./assets/pro-carnet-sync.js",
  "./assets/carnet-oreille.js",
  "./assets/carnet-debts.js",
  "./assets/carnet-i18n.js",
  "./assets/carnet-world8-ui.js"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith("digiy-carnet-master-test-") && key !== CACHE).map(key => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if(event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request)
      .then(response => {
        const copy = response.clone();
        caches.open(CACHE).then(cache => cache.put(event.request, copy)).catch(()=>{});
        return response;
      })
      .catch(() => caches.match(event.request).then(hit => hit || caches.match("./index.html")))
  );
});
