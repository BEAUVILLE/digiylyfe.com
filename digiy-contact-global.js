/* DIGIYLYFE — chargeur vitrine relais 20260907
 * Le chargeur stable précédent est conservé intégralement dans :
 * /digiy-contact-global-stable-20260830.js
 * Ajouts isolés : Services professionnels + Santé & soins + raccord Sarlat + COM MAÎTRE accueil + séparation façade public/pro + DIGIY CAMPUS.
 * Correctif cohérence : retire l’ancienne carte Dakar de secours si la vraie carte Dakar illustrée est déjà présente.
 * PWA / manifest / service worker : inchangés.
 */
(function(){
  'use strict';
  if(window.DIGIY_VITRINE_RELAY_20260901)return;
  window.DIGIY_VITRINE_RELAY_20260901=true;

  function currentLang(){
    var q='';try{q=(new URLSearchParams(location.search).get('lang')||'').slice(0,2).toLowerCase()}catch(e){}
    var h=(document.documentElement.lang||'fr').slice(0,2).toLowerCase(),ok=['fr','en','es','pt','it','de','nl','ar'];
    return ok.indexOf(q)>=0?q:(ok.indexOf(h)>=0?h:'fr');
  }

  function addScript(src,attr){
    if(attr&&document.querySelector('script['+attr+']'))return null;
    var s=document.createElement('script');s.src=src;s.async=false;if(attr)s.setAttribute(attr,'1');document.head.appendChild(s);return s;
  }

  function retireLegacyDakarDuplicate(){
    var grid=document.querySelector('.territoryGrid');
    if(!grid)return;
    var real=grid.querySelector('a[data-fav-id="territoire-dakar"],a[href="https://digiylyfe.com/dakar.html"]');
    if(!real)return;
    grid.querySelectorAll('[data-digiy-dakar-door]').forEach(function(card){card.remove();});
  }

  function guardUniqueDakar(){
    retireLegacyDakarDuplicate();
    var grid=document.querySelector('.territoryGrid');
    if(!grid||grid.getAttribute('data-digiy-dakar-dedupe'))return;
    grid.setAttribute('data-digiy-dakar-dedupe','1');
    try{new MutationObserver(retireLegacyDakarDuplicate).observe(grid,{childList:true});}catch(e){}
    setTimeout(retireLegacyDakarDuplicate,250);
    setTimeout(retireLegacyDakarDuplicate,1000);
  }

  function loadHomeFacade(){
    addScript('/assets/digiy-facade-two-worlds-v1.js?v=20260901-v1','data-digiy-facade-two-worlds');
  }

  function fixSarlatPublicHealthDoor(){
    if(!/\/sarlat\.html$/i.test(location.pathname.replace(/\/+$/,'')))return;
    var a=document.querySelector('[data-digiy-health-door]');if(!a)return;
    var u=new URL('/sarlat.html',location.origin);u.searchParams.set('need','health_care');u.searchParams.set('lang',currentLang());u.hash='places';a.href=u.pathname+u.search+u.hash;
  }

  function loadContextExtras(){
    var p=location.pathname.replace(/\/+$/,'');
    if(p===''||p==='/'||/\/index\.html$/i.test(p)){
      guardUniqueDakar();
      addScript('/assets/digiy-campus-interest-v2.js?v=20260904-v2','data-digiy-campus-interest');
      var com=addScript('/assets/digiy-com-maitre-v1.js?v=20260901-v1','data-digiy-com-maitre');
      if(com){com.onload=loadHomeFacade;com.onerror=loadHomeFacade}else loadHomeFacade();
    }
    if(/\/sarlat\.html$/i.test(p)){
      fixSarlatPublicHealthDoor();
      var s=addScript('/assets/digiy-sarlat-health-v1.js?v=20260901-v1','data-digiy-sarlat-health');
      if(s){s.onload=fixSarlatPublicHealthDoor;s.onerror=fixSarlatPublicHealthDoor}
      setTimeout(fixSarlatPublicHealthDoor,250);
    }
    if(/\/demo-dordogne\.html$/i.test(p)){
      var q=new URLSearchParams(location.search);
      if((q.get('need')||'')==='health_care')addScript('/assets/digiy-demo-dordogne-health-v1.js?v=20260901-v1','data-digiy-demo-dordogne-health');
    }
  }

  function loadHealthDoors(){
    var existing=document.querySelector('script[data-digiy-pro-health-loader]');
    if(existing){loadContextExtras();return;}
    var extra=document.createElement('script');
    extra.src='/assets/digiy-vitrine-professional-health-v1.js?v=20260901-v4';
    extra.async=false;
    extra.setAttribute('data-digiy-pro-health-loader','1');
    extra.onload=loadContextExtras;
    extra.onerror=loadContextExtras;
    document.head.appendChild(extra);
  }

  guardUniqueDakar();

  var stable=document.createElement('script');
  stable.src='/digiy-contact-global-stable-20260830.js?v=20260830-stable';
  stable.async=false;
  stable.onload=function(){guardUniqueDakar();loadHealthDoors();};
  stable.onerror=function(){guardUniqueDakar();loadHealthDoors();};
  document.head.appendChild(stable);
})();