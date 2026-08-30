/* DIGIYLYFE.COM — Service Worker PWA léger
   Installation permanente, sans cache de page et sans réécriture de route.
*/

const DIGIY_PWA_VERSION = 'digiylyfe-pwa-20260830-territory-native-v4';

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || event.request.mode !== 'navigate') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(fetch(event.request));
});
