/* DIGIYLYFE.COM — Service Worker de transition
   Nettoie les anciens caches et arrête les anciennes réécritures de routes PRO.
   Les liens écrits dans les pages publiques restent l’unique source de vérité.
*/

const CLEANUP_VERSION = 'digiylyfe-cleanup-20260805';

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys
        .filter((key) => key.includes('digiy'))
        .map((key) => caches.delete(key))
    );

    await self.clients.claim();
    await self.registration.unregister();

    const windows = await self.clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    });

    windows.forEach((client) => {
      client.postMessage({ type: CLEANUP_VERSION, cleaned: true });
    });
  })());
});

/* Aucune interception réseau et aucune transformation de lien. */
self.addEventListener('fetch', () => {});
