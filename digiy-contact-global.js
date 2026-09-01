/* DIGIYLYFE — chargeur vitrine relais 20260901
 * Le chargeur stable précédent est conservé intégralement dans :
 * /digiy-contact-global-stable-20260830.js
 * Ajouts isolés : Services professionnels + Santé & soins + raccord Sarlat.
 * PWA / manifest / service worker : inchangés.
 */
(function(){
  'use strict';
  if(window.DIGIY_VITRINE_RELAY_20260901)return;
  window.DIGIY_VITRINE_RELAY_20260901=true;

  function addScript(src,attr){
    if(attr&&document.querySelector('script['+attr+']'))return null;
    var s=document.createElement('script');s.src=src;s.async=false;if(attr)s.setAttribute(attr,'1');document.head.appendChild(s);return s;
  }

  function loadContextExtras(){
    var p=location.pathname.replace(/\/+$/,'');
    if(/\/sarlat\.html$/i.test(p))addScript('/assets/digiy-sarlat-health-v1.js?v=20260901-v1','data-digiy-sarlat-health');
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

  var stable=document.createElement('script');
  stable.src='/digiy-contact-global-stable-20260830.js?v=20260830-stable';
  stable.async=false;
  stable.onload=loadHealthDoors;
  stable.onerror=loadHealthDoors;
  document.head.appendChild(stable);
})();
