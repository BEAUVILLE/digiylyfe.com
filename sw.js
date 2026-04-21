const CACHE_NAME = "digiy-hub-v3"; /* ← incrémenté : purge l'ancien cache au déploiement */

const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting()) /* ← déplacé dans waitUntil : s'active après le cache */
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    ).then(() => self.clients.claim()) /* ← déplacé dans waitUntil : prend le contrôle après purge */
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  /* index.html → Network First : toujours la version la plus récente
     C'est ce qui corrige le bug nav mobile sur l'app installée        */
  if (url.pathname === "/" || url.pathname === "/index.html") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match("./index.html")) /* fallback si hors ligne */
    );
    return;
  }

  /* Tous les autres assets → Cache First (icônes, manifest...) */
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});
