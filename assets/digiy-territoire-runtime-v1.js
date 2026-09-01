/* DIGIYLYFE — relais runtime territoire 20260901
 * Runtime historique figé : /assets/digiy-territoire-runtime-stable-20260831.js
 * Complément isolé : libellés Services professionnels + Santé & soins.
 * PWA / service worker : inchangés.
 */
(function(){
  'use strict';
  if(window.DIGIY_TERRITORY_RUNTIME_RELAY_20260901)return;
  window.DIGIY_TERRITORY_RUNTIME_RELAY_20260901=true;

  function loadLabels(){
    if(document.querySelector('script[data-digiy-pro-health-labels]'))return;
    var extra=document.createElement('script');
    extra.src='/assets/digiy-territoire-pro-health-labels-v1.js?v=20260901-v1';
    extra.async=false;
    extra.setAttribute('data-digiy-pro-health-labels','1');
    document.head.appendChild(extra);
  }

  var stable=document.createElement('script');
  stable.src='/assets/digiy-territoire-runtime-stable-20260831.js?v=20260831-stable';
  stable.async=false;
  stable.onload=loadLabels;
  stable.onerror=loadLabels;
  document.head.appendChild(stable);
})();
