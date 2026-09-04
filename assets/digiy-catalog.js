/* DIGIYLYFE · Catalogue partagé MON DIGIY
   Source unique des métadonnées de favoris.
   Ajouter/modifier ici les entrées du carnet ; OLD_URL_MAP est généré automatiquement.
*/
(function(w){
  'use strict';
  var CATALOG={
    "service-voix-action-pro":{href:"https://pro-action-digiy.digiylyfe.com/",icon:"🎙️",label:"LA VOIX · ACTION PRO",kind:"service"},
    "pro-astou-boutique":{href:"https://astou-boutique.digiylyfe.com/",icon:"🛍️",label:"Astou Boutique",kind:"professionnel"},
    "pro-babacar-plombier":{href:"https://babacar-plombier-pro.digiylyfe.com/",icon:"🔧",label:"Babacar Plombier Pro",kind:"professionnel"},
    "pro-mane-gning":{href:"https://mane-gning.digiylyfe.com/",icon:"🧹",label:"MANÉ & GNING",kind:"professionnel"},
    "pro-chez-baptiste-sarlat":{href:"https://sarlat-chez-baptiste.digiylyfe.com/",icon:"🏠",label:"Chez Baptiste · Sarlat",kind:"professionnel"},
    "pro-lamine":{href:"https://partenaire-lamine.digiylyfe.com/",icon:"🚗",label:"Lamine",kind:"professionnel"},
    "territoire-petite-cote":{href:"https://digiylyfe.com/territoire.html?zone=petite-cote",icon:"📍",label:"DIGIY PETITE CÔTE",kind:"territoire"},
    "territoire-dakar":{href:"https://digiylyfe.com/territoire.html?zone=dakar",icon:"📍",label:"DIGIY DAKAR",kind:"territoire"},
    "territoire-dordogne":{href:"https://digiylyfe.com/france.html",icon:"📍",label:"DIGIY VALLÉE DE LA DORDOGNE",kind:"territoire",legacyUrls:["https://digiylyfe.com/france.html"]},
    "territoire-bordeaux":{href:"https://digiylyfe.com/france.html",icon:"📍",label:"DIGIY BORDEAUX",kind:"territoire"}
  };

  /* Migration automatique des anciens favoris qui étaient stockés sous forme d'URL.
     Les href uniques sont mappés tout seuls. En cas d'URL partagée (France), legacyUrls tranche explicitement. */
  var hrefCount={};
  Object.keys(CATALOG).forEach(function(id){
    var href=CATALOG[id].href||'';
    if(href)hrefCount[href]=(hrefCount[href]||0)+1;
  });
  var OLD_URL_MAP={};
  Object.keys(CATALOG).forEach(function(id){
    var item=CATALOG[id],href=item.href||'';
    if(href&&hrefCount[href]===1)OLD_URL_MAP[href]=id;
    (item.legacyUrls||[]).forEach(function(url){if(url)OLD_URL_MAP[url]=id;});
  });

  Object.keys(CATALOG).forEach(function(id){Object.freeze(CATALOG[id]);});
  w.DIGIY_CATALOG=Object.freeze(CATALOG);
  w.DIGIY_OLD_URL_MAP=Object.freeze(OLD_URL_MAP);
  w.DIGIY_CATALOG_VERSION='20260904-v1';
})(window);
