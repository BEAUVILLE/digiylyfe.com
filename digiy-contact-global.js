/* DIGIYLYFE — chargeur vitrine relais 20260901
 * Le chargeur stable précédent est conservé intégralement dans :
 * /digiy-contact-global-stable-20260830.js
 * Ajout isolé : Services professionnels + Santé & soins.
 * PWA / manifest / service worker : inchangés.
 */
(function(){
  'use strict';
  if(window.DIGIY_VITRINE_RELAY_20260901)return;
  window.DIGIY_VITRINE_RELAY_20260901=true;

  function currentLang(){
    var q='';
    try{q=(new URLSearchParams(location.search).get('lang')||'').slice(0,2).toLowerCase();}catch(e){}
    var h=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();
    return ['fr','en','es','pt','it','de','nl','ar'].indexOf(q)>=0?q:(['fr','en','es','pt','it','de','nl','ar'].indexOf(h)>=0?h:'fr');
  }

  function healthTarget(){
    var u=new URL('/territoire.html',location.origin);
    u.searchParams.set('zone','petite-cote');
    u.searchParams.set('need','health_care');
    u.searchParams.set('lang',currentLang());
    u.hash='resultsSection';
    return u.pathname+u.search+u.hash;
  }

  function fixHealthDoor(){
    var a=document.querySelector('[data-digiy-health-door]');
    if(!a)return false;
    a.href=healthTarget();
    return true;
  }

  function settleHealthDoor(){
    var tries=0;
    var timer=setInterval(function(){
      tries++;
      if(fixHealthDoor()||tries>40)clearInterval(timer);
    },100);
  }

  function loadHealthDoors(){
    if(document.querySelector('script[data-digiy-pro-health-loader]')){
      settleHealthDoor();
      return;
    }
    var extra=document.createElement('script');
    extra.src='/assets/digiy-vitrine-professional-health-v1.js?v=20260901-v3';
    extra.async=false;
    extra.setAttribute('data-digiy-pro-health-loader','1');
    extra.onload=settleHealthDoor;
    extra.onerror=settleHealthDoor;
    document.head.appendChild(extra);
  }

  var stable=document.createElement('script');
  stable.src='/digiy-contact-global-stable-20260830.js?v=20260830-stable';
  stable.async=false;
  stable.onload=loadHealthDoors;
  stable.onerror=loadHealthDoors;
  document.head.appendChild(stable);

  new MutationObserver(function(){fixHealthDoor();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});
})();
