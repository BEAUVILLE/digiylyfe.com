/* DIGIYLYFE — Dordogne projection relay 20260909
 * Moteur projection gelé conservé dans digiy-territoire-dordogne-projection-stable-20260909.js
 * Cette couche ne modifie que la formule commerciale France.
 */
(function(){
  'use strict';
  var STABLE='/assets/digiy-territoire-dordogne-projection-stable-20260909.js?v=20260909-stable';
  var path=location.pathname.replace(/\/+$/,'');
  var isSarlat=/\/sarlat\.html$/i.test(path);
  var prices={fr:'450 € / an',en:'€450 / year',es:'450 € / año',pt:'450 € / ano',it:'450 € / anno',de:'450 € / Jahr',nl:'€ 450 / jaar',ar:'450 € / سنة'};
  var finalCta={
    fr:'PRENDRE MA PLACE · SARLAT ZONE PILOTE · 450 € / AN →',
    en:'TAKE MY PLACE · SARLAT PILOT AREA · €450 / YEAR →',
    es:'OCUPAR MI PLAZA · SARLAT ZONA PILOTO · 450 € / AÑO →',
    pt:'OCUPAR O MEU LUGAR · SARLAT ZONA PILOTO · 450 € / ANO →',
    it:'PRENDI IL TUO POSTO · SARLAT ZONA PILOTA · 450 € / ANNO →',
    de:'PLATZ SICHERN · SARLAT PILOTGEBIET · 450 € / JAHR →',
    nl:'NEEM MIJN PLAATS · SARLAT PILOTGEBIED · € 450 / JAAR →',
    ar:'خذ مكاني · سارلا منطقة تجريبية · 450 € سنويًا ←'
  };
  function lang(){var l=(document.documentElement.lang||new URLSearchParams(location.search).get('lang')||'fr').slice(0,2).toLowerCase();return prices[l]?l:'fr';}
  function patchData(){
    var d=window.DIGIY_DORDOGNE_DATA;if(!d)return;
    Object.keys(prices).forEach(function(l){if(d[l]&&d[l].ui)d[l].ui.price=prices[l];});
  }
  function patchDom(){
    patchData();
    if(!isSarlat)return;
    var l=lang();
    var p=document.querySelector('.hero .price b');if(p)p.textContent=prices[l];
    var f=document.getElementById('finalBtn');if(f)f.textContent=finalCta[l];
    var md=document.querySelector('meta[name="description"]');if(md)md.content='DIGIY Vallée de la Dordogne : Sarlat zone pilote, professionnels réels et places à prendre sur le territoire. Contact direct, 0 % commission, adhésion 450 € par an avec 2 mois offerts à la première adhésion.';
  }
  function bind(){
    patchDom();
    document.addEventListener('click',function(e){if(e.target&&e.target.closest&&e.target.closest('[data-l]'))setTimeout(patchDom,0);},true);
    new MutationObserver(function(){patchDom();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});
  }
  function afterStable(){patchData();if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind,{once:true});else bind();}
  if(document.readyState==='loading'){
    document.write('<script src="'+STABLE+'"><\/script>');
    afterStable();
    return;
  }
  try{
    var x=new XMLHttpRequest();x.open('GET',STABLE,false);x.send(null);
    if((x.status>=200&&x.status<300)||x.status===0){(0,eval)(x.responseText);afterStable();return;}
  }catch(e){}
  var s=document.createElement('script');s.src=STABLE;s.async=false;s.onload=afterStable;document.head.appendChild(s);
})();
