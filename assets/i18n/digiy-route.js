/* DIGIYLYFE — routeur des portes multilingues */
(function () {
  'use strict';
  var script = document.currentScript;
  var lang = ((script && script.dataset.lang) || document.documentElement.lang || 'fr').slice(0, 2).toLowerCase();
  if (!/^(fr|en|es|de|it|nl|ar)$/.test(lang)) lang = 'fr';
  try { localStorage.setItem('digiy-lang', lang); } catch (error) {}

  var equipped = new Set([
    'pro-action-digiy.digiylyfe.com',
    'digiy-hub.digiylyfe.com',
    'driver-client.digiylyfe.com',
    'loc.digiylyfe.com',
    'resa-table-resto.digiylyfe.com',
    'market.digiylyfe.com',
    'build.digiylyfe.com',
    'jobs.digiylyfe.com',
    'explore.digiylyfe.com',
    'resto.digiylyfe.com',
    'reseau-digiy.digiylyfe.com',
    'digiy-carnet-pro.digiylyfe.com',
    'partenaire-pilote.digiylyfe.com',
    'tarifs.digiylyfe.com',
    'inscription-pro.digiylyfe.com',
    'pro-espace.digiylyfe.com',
    'pro-driver.digiylyfe.com',
    'pro-loc.digiylyfe.com',
    'pro-market.digiylyfe.com',
    'pro-build.digiylyfe.com',
    'pro-job.digiylyfe.com',
    'pro-resa-resto.digiylyfe.com',
    'pro-explore.digiylyfe.com',
    'pro-resto.digiylyfe.com',
    'pro-carnet.digiylyfe.com',
    'pro-caisse.digiylyfe.com',
    'resto-caisse.digiylyfe.com',
    'mon-commerce.digiylyfe.com',
    'mon-commerce-pro.digiylyfe.com',
    'client-fret.digiylyfe.com',
    'fret-client.digiylyfe.com',
    'fret-chauffeur.digiylyfe.com',
    'pro-client-fret.digiylyfe.com',
    'pro-fret-client.digiylyfe.com',
    'pro-fret-chauffeur.digiylyfe.com',
    'ndimbal-map.digiylyfe.com',
    'ndimbal-express.digiylyfe.com',
    'bonne-affaire.digiylyfe.com',
    'pro-qr-code.digiylyfe.com'
  ]);

  document.addEventListener('click', function (event) {
    var anchor = event.target.closest && event.target.closest('a[href]');
    if (!anchor) return;
    try {
      var source = new URL(anchor.href, location.href);
      if (!equipped.has(source.hostname)) return;
      event.preventDefault();
      var route = new URL('/lang.html', source.origin);
      route.searchParams.set('lang', lang);
      var page = source.pathname.replace(/^\/+/, '');
      if (page && page !== 'index.html' && /\.html$/i.test(page)) route.searchParams.set('page', page);
      if (anchor.target === '_blank') window.open(route.toString(), '_blank', 'noopener');
      else location.href = route.toString();
    } catch (error) {}
  }, true);
})();
