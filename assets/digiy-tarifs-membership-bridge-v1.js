/* DIGIYLYFE · Carte gratuite -> adhesion ecosysteme visible · 2026-09-17 */
(function(){
  'use strict';
  if(window.DIGIY_TARIFS_MEMBERSHIP_BRIDGE_20260917)return;
  window.DIGIY_TARIFS_MEMBERSHIP_BRIDGE_20260917=true;
  var p=(location.pathname||'').replace(/\/+$/,'');
  if(!/\/tarifs-adherents-1\.html$/i.test(p))return;

  var COPY={
    fr:{free:'CARTE DIGIY · GRATUITE',label:'ADHÉSION ÉCOSYSTÈME',SN:'19 900 FCFA / MOIS',FR:'450 € / AN',US:'$29 / MOIS',note:'La carte est gratuite. L’adhésion active sa présence publique dans les territoires, catégories et recherches DIGIYLYFE.'},
    en:{free:'DIGIY CARD · FREE',label:'ECOSYSTEM MEMBERSHIP',SN:'19,900 FCFA / MONTH',FR:'€450 / YEAR',US:'$29 / MONTH',note:'The card is free. Membership activates its public presence across DIGIYLYFE territories, categories and searches.'},
    es:{free:'TARJETA DIGIY · GRATUITA',label:'ADHESIÓN AL ECOSISTEMA',SN:'19 900 FCFA / MES',FR:'450 € / AÑO',US:'$29 / MES',note:'La tarjeta es gratuita. La adhesión activa su presencia pública en territorios, categorías y búsquedas DIGIYLYFE.'},
    pt:{free:'CARTÃO DIGIY · GRATUITO',label:'ADESÃO AO ECOSSISTEMA',SN:'19 900 FCFA / MÊS',FR:'450 € / ANO',US:'$29 / MÊS',note:'O cartão é gratuito. A adesão ativa a sua presença pública nos territórios, categorias e pesquisas DIGIYLYFE.'},
    it:{free:'CARTA DIGIY · GRATUITA',label:'ADESIONE ALL’ECOSISTEMA',SN:'19 900 FCFA / MESE',FR:'450 € / ANNO',US:'$29 / MESE',note:'La carta è gratuita. L’adesione attiva la presenza pubblica nei territori, categorie e ricerche DIGIYLYFE.'},
    de:{free:'DIGIY-KARTE · KOSTENLOS',label:'ÖKOSYSTEM-MITGLIEDSCHAFT',SN:'19.900 FCFA / MONAT',FR:'450 € / JAHR',US:'$29 / MONAT',note:'Die Karte ist kostenlos. Die Mitgliedschaft aktiviert die öffentliche Präsenz in DIGIYLYFE-Gebieten, Kategorien und Suchen.'},
    nl:{free:'DIGIY-KAART · GRATIS',label:'ECOSYSTEEMLIDMAATSCHAP',SN:'19.900 FCFA / MAAND',FR:'€450 / JAAR',US:'$29 / MAAND',note:'De kaart is gratis. Het lidmaatschap activeert de publieke aanwezigheid in DIGIYLYFE-gebieden, categorieën en zoekopdrachten.'},
    ar:{free:'بطاقة DIGIY · مجانية',label:'عضوية المنظومة',SN:'19 900 FCFA / شهر',FR:'450 € / سنة',US:'$29 / شهر',note:'البطاقة مجانية. العضوية تفعّل الظهور العام في مناطق وفئات وعمليات بحث DIGIYLYFE.'}
  };

  function lang(){var l=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();return COPY[l]?l:'fr';}
  function country(){
    var c='';try{c=(new URLSearchParams(location.search).get('country')||'').toUpperCase()}catch(e){}
    if(!/^(SN|FR|US)$/.test(c)){try{c=(localStorage.getItem('digiy_country')||'SN').toUpperCase()}catch(e){c='SN'}}
    return /^(SN|FR|US)$/.test(c)?c:'SN';
  }
  function style(){
    if(document.getElementById('digiyTarifsMembershipBridgeStyle'))return;
    var s=document.createElement('style');s.id='digiyTarifsMembershipBridgeStyle';s.textContent='\
      .digiyMembershipBridge{margin:14px 0 2px;padding:15px;border:2px solid rgba(45,212,191,.58);border-radius:21px;background:linear-gradient(145deg,rgba(45,212,191,.14),rgba(246,196,83,.10));text-align:center}\
      .digiyMembershipBridgeTop{font-size:13px;font-weight:1000;color:#fff3cf}\
      .digiyMembershipBridgePrice{display:block;margin-top:7px;font-size:clamp(20px,4.6vw,30px);line-height:1;font-weight:1000;color:#fff}\
      .digiyMembershipBridgeNote{display:block;margin-top:8px;color:#d9e8e1;font-size:11px;line-height:1.45;font-weight:850}\
    ';document.head.appendChild(s);
  }
  function apply(){
    var box=document.querySelector('.freeEntry');if(!box)return;
    style();var c=COPY[lang()]||COPY.fr,cc=country();
    var b=document.getElementById('digiyMembershipBridge');
    if(!b){b=document.createElement('div');b.id='digiyMembershipBridge';b.className='digiyMembershipBridge';var benefits=box.querySelector('.freeBenefits');if(benefits)benefits.insertAdjacentElement('afterend',b);else box.appendChild(b);}
    b.innerHTML='<span class="digiyMembershipBridgeTop">'+c.free+'</span><strong class="digiyMembershipBridgePrice">'+c.label+' · '+c[cc]+'</strong><span class="digiyMembershipBridgeNote">'+c.note+'</span>';
    document.documentElement.setAttribute('data-digiy-membership-bridge','20260917-v1');
  }
  apply();[80,250,700,1500].forEach(function(ms){setTimeout(apply,ms)});
  document.addEventListener('click',function(e){var b=e.target&&e.target.closest?e.target.closest('[data-l],[data-country]'):null;if(b)setTimeout(apply,0)},false);
  try{new MutationObserver(function(){setTimeout(apply,0)}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']})}catch(e){}
})();
