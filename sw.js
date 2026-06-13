/* sw.js — DIGIYLYFE anti-vieille-version
   Objectif :
   - Ne jamais servir un ancien index.html bloqué en cache
   - Garder localStorage intact : favoris, sessions, préférences restent côté navigateur
   - Corriger les anciens chemins PRO /pin.html vers les racines V2 mono-fichier
   - Nettoyer les anciens caches Service Worker
*/

const DIGIY_SW_VERSION = "digiylyfe-vitrine-pro-v2-routes-root-20260613-1";
const DIGIY_CACHE_PREFIX = "digiylyfe-";

const PRO_ROUTES = [
  ["https://pro-explore.digiylyfe.com/pin.html", "https://pro-explore.digiylyfe.com/"],
  ["https://pro-driver.digiylyfe.com/pin.html", "https://pro-driver.digiylyfe.com/"],
  ["https://pro-market.digiylyfe.com/pin.html", "https://pro-market.digiylyfe.com/"],
  ["https://pro-build.digiylyfe.com/pin.html", "https://pro-build.digiylyfe.com/"],
  ["https://pro-loc.digiylyfe.com/pin.html", "https://pro-loc.digiylyfe.com/"]
];

function patchProRoutes(html) {
  let out = String(html || "");

  PRO_ROUTES.forEach(([oldUrl, newUrl]) => {
    out = out
      .replaceAll(oldUrl + "?v=hub-pro-explore-20260613", newUrl)
      .replaceAll(oldUrl + "?v=explore-pin-boost-20260613", newUrl)
      .replaceAll(oldUrl + "?v=hub-pro-driver-20260613", newUrl)
      .replaceAll(oldUrl + "?v=driver-pin-boost-20260613", newUrl)
      .replaceAll(oldUrl + "?v=hub-pro-market-20260613", newUrl)
      .replaceAll(oldUrl + "?v=market-pin-boost-20260613", newUrl)
      .replaceAll(oldUrl + "?v=hub-pro-build-20260613", newUrl)
      .replaceAll(oldUrl + "?v=build-pin-boost-20260613", newUrl)
      .replaceAll(oldUrl + "?v=hub-pro-loc-20260613", newUrl)
      .replaceAll(oldUrl + "?v=loc-pin-boost-20260613", newUrl)
      .replaceAll(oldUrl, newUrl);
  });

  return out;
}

function htmlResponse(body, originalResponse) {
  const headers = new Headers(originalResponse.headers);
  headers.set("Content-Type", "text/html; charset=utf-8");
  headers.set("Cache-Control", "no-store");
  headers.set("x-digiy-pro-routes", "v2-root-20260613");

  return new Response(body, {
    status: originalResponse.status,
    statusText: originalResponse.statusText,
    headers
  });
}

self.addEventListener("install", (event) => {
  // Le nouveau service worker prend la main immédiatement.
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith(DIGIY_CACHE_PREFIX) || key.includes("digiy"))
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

function isHtmlRequest(request) {
  const url = new URL(request.url);

  return (
    request.mode === "navigate" ||
    request.headers.get("accept")?.includes("text/html") ||
    url.pathname === "/" ||
    url.pathname.endsWith("/index.html") ||
    url.pathname.endsWith(".html")
  );
}

self.addEventListener("fetch", (event) => {
  const request = event.request;

  // On ne touche pas aux POST / PUT / etc.
  if (request.method !== "GET") {
    event.respondWith(fetch(request));
    return;
  }

  // Pages HTML : toujours réseau d’abord, jamais ancien index en cache.
  // En plus : correction des anciennes routes PRO /pin.html vers racine V2.
  if (isHtmlRequest(request)) {
    event.respondWith(
      fetch(request, {
        cache: "no-store",
        credentials: "same-origin"
      }).then(async (response) => {
        const contentType = response.headers.get("content-type") || "";
        if (!contentType.includes("text/html")) return response;

        const patched = patchProRoutes(await response.clone().text());
        return htmlResponse(patched, response);
      }).catch(() => {
        return new Response(
          `<!doctype html>
          <html lang="fr">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width,initial-scale=1">
            <title>DIGIYLYFE — Connexion</title>
            <style>
              body{
                margin:0;
                min-height:100vh;
                display:grid;
                place-items:center;
                background:#04130d;
                color:#f8fafc;
                font-family:system-ui,-apple-system,Segoe UI,sans-serif;
                text-align:center;
                padding:24px;
              }
              .box{
                max-width:420px;
                border:1px solid rgba(246,196,83,.25);
                border-radius:24px;
                padding:24px;
                background:rgba(255,255,255,.06);
              }
              h1{font-size:24px;margin:0 0 10px;color:#f6c453}
              p{line-height:1.5;color:rgba(248,250,252,.78)}
              button{
                margin-top:14px;
                min-height:46px;
                border:0;
                border-radius:999px;
                padding:0 18px;
                font-weight:900;
                background:linear-gradient(135deg,#f6c453,#22c55e);
                color:#06140f;
              }
            </style>
          </head>
          <body>
            <div class="box">
              <h1>DIGIYLYFE</h1>
              <p>Connexion absente. Recharge quand le réseau revient pour obtenir la dernière version.</p>
              <button onclick="location.reload()">🔄 Recharger</button>
            </div>
          </body>
          </html>`,
          {
            status: 503,
            headers: {
              "Content-Type": "text/html; charset=utf-8",
              "Cache-Control": "no-store"
            }
          }
        );
      })
    );
    return;
  }

  // Assets : réseau d’abord. Si le réseau tombe, on tente le cache existant.
  event.respondWith(
    fetch(request, { cache: "no-store" })
      .catch(() => caches.match(request))
  );
});

self.addEventListener("message", (event) => {
  const data = event.data || {};

  if (data.type === "DIGIY_SKIP_WAITING") {
    self.skipWaiting();
  }

  if (data.type === "DIGIY_CLEAR_CACHES") {
    event.waitUntil(
      caches.keys()
        .then((keys) => Promise.all(keys.map((key) => caches.delete(key))))
        .then(() => self.clients.claim())
    );
  }
});
