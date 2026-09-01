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

  function loadHealthDoors(){
    if(document.querySelector('script[data-digiy-pro-health-loader]'))return;
    var extra=document.createElement('script');
    extra.src='/assets/digiy-vitrine-professional-health-v1.js?v=20260901-v3';
    extra.async=false;
    extra.setAttribute('data-digiy-pro-health-loader','1');
    document.head.appendChild(extra);
  }

  var stable=document.createElement('script');
  stable.src='/digiy-contact-global-stable-20260830.js?v=20260830-stable';
  stable.async=false;
  stable.onload=loadHealthDoors;
  stable.onerror=loadHealthDoors;
  document.head.appendChild(stable);
})();