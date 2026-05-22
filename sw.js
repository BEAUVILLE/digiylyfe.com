const DIGIY_SW_VERSION = "digiylyfe-no-stale-index-20260522-2";

self.addEventListener("install", event => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const req = event.request;

  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req, { cache: "no-store" }).catch(() => fetch(req))
    );
    return;
  }

  event.respondWith(
    fetch(req).catch(() => caches.match(req))
  );
});
