/* DIGIYLYFE — Dordogne projection relay 20260912
 * Moteur projection gelé conservé dans digiy-territoire-dordogne-projection-stable-20260909.js
 * Cette couche ne modifie que la formule commerciale France.
 */
(function(){
  'use strict';
  var STABLE='/assets/digiy-territoire-dordogne-projection-stable-20260909.js?v=20260909-stable';
  var path=location.pathname.replace(/\/+$/,'');
  var isSarlat=/\/sarlat\.html$/i.test(path);
  var prices={fr:'700 € · 1re année',en:'€700 · first year',es:'700 € · primer año',pt:'700 € · 1.º ano',it:'700 € · 1° anno',de:'700 € · 1. Jahr',nl:'€700 · 1e jaar',ar:'700 € · السنة الأولى'};
  var total={
    fr:['TOTAL MINIMUM 1RE ANNÉE : À PARTIR DE 700 €','250 € minimum pour la création de la fiche + 450 € d’adhésion DIGIY PRO. À partir de la 2e année : 450 €/an, hors PREMIUM / EXTRA et prestations supplémentaires.'],
    en:['MINIMUM FIRST-YEAR TOTAL: FROM €700','Minimum €250 profile creation + €450 DIGIY PRO membership. From year 2: €450/year, excluding PREMIUM / EXTRA and additional services.'],
    es:['TOTAL MÍNIMO PRIMER AÑO: DESDE 700 €','Mínimo 250 € por la creación de la ficha + 450 € de adhesión DIGIY PRO. Desde el segundo año: 450 €/año, sin PREMIUM / EXTRA ni servicios adicionales.'],
    pt:['TOTAL MÍNIMO NO 1.º ANO: A PARTIR DE 700 €','Mínimo 250 € pela criação da ficha + 450 € de adesão DIGIY PRO. A partir do 2.º ano: 450 €/ano, sem PREMIUM / EXTRA nem serviços adicionais.'],
    it:['TOTALE MINIMO 1° ANNO: DA 700 €','Minimo 250 € per la creazione della scheda + 450 € di adesione DIGIY PRO. Dal 2° anno: 450 €/anno, esclusi PREMIUM / EXTRA e servizi aggiuntivi.'],
    de:['MINDESTGESAMT 1. JAHR: AB 700 €','Mindestens 250 € Profilerstellung + 450 € DIGIY PRO Mitgliedschaft. Ab dem 2. Jahr: 450 €/Jahr, ohne PREMIUM / EXTRA und Zusatzleistungen.'],
    nl:['MINIMUMTOTAAL 1E JAAR: VANAF €700','Minimaal €250 profielcreatie + €450 DIGIY PRO-lidmaatschap. Vanaf jaar 2: €450/jaar, exclusief PREMIUM / EXTRA en aanvullende diensten.'],
    ar:['الحد الأدنى لإجمالي السنة الأولى: ابتداءً من 700 €','250 € كحد أدنى لإنشاء الملف + 450 € لعضوية DIGIY PRO. ابتداءً من السنة الثانية: 450 € سنويًا، باستثناء PREMIUM / EXTRA والخدمات الإضافية.']
  };
  var finalCta={
    fr:'PRENDRE MA PLACE · SARLAT ZONE PILOTE →',
    en:'TAKE MY PLACE · SARLAT PILOT AREA →',
    es:'OCUPAR MI PLAZA · SARLAT ZONA PILOTO →',
    pt:'OCUPAR O MEU LUGAR · SARLAT ZONA PILOTO →',
    it:'PRENDI IL TUO POSTO · SARLAT ZONA PILOTA →',
    de:'PLATZ SICHERN · SARLAT PILOTGEBIET →',
    nl:'NEEM MIJN PLAATS · SARLAT PILOTGEBIED →',
    ar:'خذ مكاني · سارلا منطقة تجريبية ←'
  };
  function lang(){var l=(document.documentElement.lang||new URLSearchParams(location.search).get('lang')||'fr').slice(0,2).toLowerCase();return prices[l]?l:'fr';}
  function patchData(){
    var d=window.DIGIY_DORDOGNE_DATA;if(!d)return;
    Object.keys(prices).forEach(function(l){if(d[l]&&d[l].ui)d[l].ui.price=prices[l];});
  }
  function ensureTotal(l){
    var price=document.querySelector('.hero .price');if(!price)return;
    var box=document.getElementById('digiySarlatFirstYearTotal');
    if(!box){
      box=document.createElement('div');box.id='digiySarlatFirstYearTotal';
      box.style.marginTop='10px';box.style.padding='14px 16px';box.style.border='2px solid rgba(234,214,178,.62)';box.style.borderRadius='18px';box.style.background='rgba(23,37,29,.88)';box.style.color='#fff8ea';box.style.fontWeight='900';box.style.lineHeight='1.45';
      price.insertAdjacentElement('afterend',box);
    }
    box.innerHTML='<strong style="display:block;color:#f3d795;font-size:18px">'+total[l][0]+'</strong><span style="display:block;margin-top:5px;font-size:12px">'+total[l][1]+'</span>';
  }
  function patchDom(){
    patchData();
    if(!isSarlat)return;
    var l=lang();
    var p=document.querySelector('.hero .price b');if(p)p.textContent=prices[l];
    var lead=document.getElementById('priceLead');if(lead)lead.textContent=(l==='fr'?'Fiche professionnelle à partir de 250 € + adhésion DIGIY PRO':'Professional profile from €250 + DIGIY PRO membership');
    var f=document.getElementById('finalBtn');if(f)f.textContent=finalCta[l];
    ensureTotal(l);
    var md=document.querySelector('meta[name="description"]');if(md)md.content='DIGIY Vallée de la Dordogne : Sarlat zone pilote, carte gratuite, fiche professionnelle à partir de 250 €, DIGIY PRO 450 € par an, soit un minimum de 700 € la première année, contact direct et 0 % commission.';
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