/* DIGIYLYFE — Bordeaux i18n relay 20260909
 * Ancien moteur conservé par blob stable ; surcouche tarif France annuelle.
 * Santé France ajoutée seulement sur bordeaux.html.
 */
(function(){
  'use strict';
  var STABLE='/assets/digiy-bordeaux-i18n-stable-20260901.js?v=20260901-stable';
  var HEALTH='/assets/digiy-vitrine-professional-health-v1.js?v=20260901-france-v2';
  var isBordeauxPage=/\/bordeaux\.html$/i.test(location.pathname.replace(/\/+$/,''));

  function patchAnnualPricing(){
    var d=window.DIGIY_BORDEAUX_DATA;
    if(!d)return;
    var prices={fr:'450 € / an',en:'€450 / year',es:'450 € / año',pt:'450 € / ano',it:'450 € / anno',de:'450 € / Jahr',nl:'€ 450 / jaar',ar:'450 € / سنة'};
    Object.keys(prices).forEach(function(l){if(d[l]&&d[l].ui)d[l].ui.price=prices[l];});
  }
  function loadHealth(){
    patchAnnualPricing();
    if(!isBordeauxPage||document.querySelector('script[data-digiy-bordeaux-health]'))return;
    var s=document.createElement('script');s.src=HEALTH;s.async=false;s.setAttribute('data-digiy-bordeaux-health','1');document.head.appendChild(s);
  }
  if(document.readyState==='loading'){
    document.write('<script src="'+STABLE+'"><\/script>');
    patchAnnualPricing();
    if(isBordeauxPage)document.write('<script src="'+HEALTH+'" data-digiy-bordeaux-health="1"><\/script>');
    return;
  }
  try{
    var x=new XMLHttpRequest();x.open('GET',STABLE,false);x.send(null);
    if((x.status>=200&&x.status<300)||x.status===0){(0,eval)(x.responseText);patchAnnualPricing();}else throw new Error('stable '+x.status);
  }catch(e){
    var s=document.createElement('script');s.src=STABLE;s.async=false;s.onload=loadHealth;s.onerror=loadHealth;document.head.appendChild(s);return;
  }
  loadHealth();
})();
