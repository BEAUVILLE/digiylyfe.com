/* DIGIYLYFE — MAÎTRE · POLITIQUE FAVORIS V1 · 2026-09-04
 * Invariant industriel : aucune carte adhérent publiée sans accès ☆ à MON DIGIY.
 * Le MAÎTRE expose cette règle aux couches de vitrine, territoire, MASTER et ateliers.
 */
(function(){
  'use strict';
  if(window.DIGIY_MAITRE_FAVORIS_V1) return;

  var policy={
    version:'2026-09-04-v1',
    required:true,
    symbol:'☆',
    destination:'https://digiylyfe.com/mon-digiy.html',
    cardBridge:'https://digiylyfe.com/assets/digiy-card-favorite-v1.js',
    galleryBridge:'https://digiylyfe.com/assets/digiy-gallery-favorites-v1.js',
    rule:'Aucune carte adhérent publiée sans accès MON DIGIY.',
    kind:'professionnel'
  };

  window.DIGIY_MAITRE_FAVORIS_V1=policy;
  window.DIGIY_MAITRE_RULES=window.DIGIY_MAITRE_RULES||{};
  window.DIGIY_MAITRE_RULES.favoris=policy;

  try{
    document.documentElement.dataset.digiyMaitreFavoris='required';
    document.documentElement.dataset.digiyMaitreFavorisVersion=policy.version;
  }catch(_){}

  window.dispatchEvent(new CustomEvent('digiy:maitre:favoris',{detail:policy}));
})();
