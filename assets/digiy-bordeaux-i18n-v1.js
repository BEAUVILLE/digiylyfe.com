/* DIGIYLYFE — Bordeaux i18n relay 20260909
 * Ancien moteur conservé par blob stable ; surcouche tarif France annuelle.
 * Santé France ajoutée seulement sur bordeaux.html.
 */
(function(){
  'use strict';
  var STABLE='/assets/digiy-bordeaux-i18n-stable-20260901.js?v=20260901-stable';
  var HEALTH='/assets/digiy-vitrine-professional-health-v1.js?v=20260901-france-v2';
  var path=location.pathname.replace(/\/+$/,'');
  var isBordeauxPage=/\/bordeaux\.html$/i.test(path);
  var isBordeauxJoin=/\/adhesion-bordeaux\.html$/i.test(path);

  var prices={fr:'450 € / an',en:'€450 / year',es:'450 € / año',pt:'450 € / ano',it:'450 € / anno',de:'450 € / Jahr',nl:'€ 450 / jaar',ar:'450 € / سنة'};
  var finalCta={
    fr:'REJOINDRE DIGIY BORDEAUX · 450 € / AN →',en:'JOIN DIGIY BORDEAUX · €450 / YEAR →',es:'UNIRSE A DIGIY BORDEAUX · 450 € / AÑO →',pt:'ADERIR AO DIGIY BORDEAUX · 450 € / ANO →',it:'ENTRA IN DIGIY BORDEAUX · 450 € / ANNO →',de:'DIGIY BORDEAUX BEITRETEN · 450 € / JAHR →',nl:'WORD LID VAN DIGIY BORDEAUX · € 450 / JAAR →',ar:'انضم إلى DIGIY BORDEAUX · 450 € سنويًا ←'
  };
  var annualLabel={
    fr:'PAR AN · 1 RÈGLEMENT · 2 MOIS OFFERTS À LA PREMIÈRE ADHÉSION · 0 % COMMISSION',en:'PER YEAR · 1 PAYMENT · 2 FREE MONTHS WITH FIRST MEMBERSHIP · 0% COMMISSION',es:'AL AÑO · 1 PAGO · 2 MESES GRATIS EN LA PRIMERA ADHESIÓN · 0 % COMISIÓN',pt:'POR ANO · 1 PAGAMENTO · 2 MESES GRÁTIS NA PRIMEIRA ADESÃO · 0 % COMISSÃO',it:'ALL’ANNO · 1 PAGAMENTO · 2 MESI GRATIS ALLA PRIMA ADESIONE · 0 % COMMISSIONI',de:'PRO JAHR · 1 ZAHLUNG · 2 MONATE GRATIS BEI DER ERSTEN MITGLIEDSCHAFT · 0 % PROVISION',nl:'PER JAAR · 1 BETALING · 2 MAANDEN GRATIS BIJ DE EERSTE AANSLUITING · 0 % COMMISSIE',ar:'سنويًا · دفعة واحدة · شهران مجانًا عند الاشتراك الأول · 0٪ عمولة'
  };

  function lang(){var l=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();return prices[l]?l:'fr';}
  function patchAnnualPricing(){
    var d=window.DIGIY_BORDEAUX_DATA;
    if(!d)return;
    Object.keys(prices).forEach(function(l){if(d[l]&&d[l].ui)d[l].ui.price=prices[l];});
  }
  function patchDom(){
    patchAnnualPricing();
    var l=lang();
    if(isBordeauxPage){
      var hp=document.getElementById('heroPrice');if(hp)hp.textContent=prices[l];
      var fb=document.getElementById('finalBtn');if(fb)fb.textContent=finalCta[l];
      var md=document.querySelector('meta[name="description"]');if(md)md.content='DIGIY BORDEAUX organise la présence numérique des professionnels par métier et par quartier : contact direct, 0 % commission, adhésion 450 € par an avec 2 mois offerts à la première adhésion.';
    }
    if(isBordeauxJoin){
      var p=document.querySelector('.price strong');if(p)p.textContent='450 €';
      var m=document.getElementById('month');if(m)m.textContent=annualLabel[l];
      var pay=document.getElementById('payBtn');if(pay)pay.href='/tarifs-adherents-1.html?country=fr#paiement';
    }
  }
  function bindDomPatch(){
    patchDom();
    document.addEventListener('click',function(e){if(e.target&&e.target.closest&&e.target.closest('[data-l]'))setTimeout(patchDom,0);},true);
    new MutationObserver(function(){patchDom();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});
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
    document.addEventListener('DOMContentLoaded',bindDomPatch,{once:true});
    return;
  }
  try{
    var x=new XMLHttpRequest();x.open('GET',STABLE,false);x.send(null);
    if((x.status>=200&&x.status<300)||x.status===0){(0,eval)(x.responseText);patchAnnualPricing();}else throw new Error('stable '+x.status);
  }catch(e){
    var s=document.createElement('script');s.src=STABLE;s.async=false;s.onload=function(){loadHealth();bindDomPatch();};s.onerror=function(){loadHealth();bindDomPatch();};document.head.appendChild(s);return;
  }
  loadHealth();bindDomPatch();
})();
