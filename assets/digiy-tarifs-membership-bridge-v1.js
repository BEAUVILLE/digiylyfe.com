/* DIGIYLYFE · Carte gratuite -> adhesion ecosysteme visible · 2026-09-17 */
(function(){
  'use strict';
  if(window.DIGIY_TARIFS_MEMBERSHIP_BRIDGE_20260917)return;
  window.DIGIY_TARIFS_MEMBERSHIP_BRIDGE_20260917=true;
  var p=(location.pathname||'').replace(/\/+$/,'');
  if(!/\/tarifs-adherents-1\.html$/i.test(p))return;

  var COPY={
    fr:{free:"Carte seule · France : 20 € · Sénégal : 15 000 FCFA · USA : 20 $ · paiement unique.",label:'ADHÉSION ÉCOSYSTÈME',SN:'19 900 FCFA / MOIS',FR:'450 € / AN',US:'$29 / MOIS',note:"Carte seule · France : 20 € · Sénégal : 15 000 FCFA · USA : 20 $ · paiement unique."},
    en:{free:"Standalone card · France: €20 · Senegal: 15,000 FCFA · USA: $20 · one-time payment.",label:'ECOSYSTEM MEMBERSHIP',SN:'19,900 FCFA / MONTH',FR:'€450 / YEAR',US:'$29 / MONTH',note:"Standalone card · France: €20 · Senegal: 15,000 FCFA · USA: $20 · one-time payment."},
    es:{free:"Tarjeta sola · Francia: 20 € · Senegal: 15 000 FCFA · EE. UU.: 20 $ · pago único.",label:'ADHESIÓN AL ECOSISTEMA',SN:'19 900 FCFA / MES',FR:'450 € / AÑO',US:'$29 / MES',note:"Tarjeta sola · Francia: 20 € · Senegal: 15 000 FCFA · EE. UU.: 20 $ · pago único."},
    pt:{free:"Cartão avulso · França: 20 € · Senegal: 15 000 FCFA · EUA: 20 $ · pagamento único.",label:'ADESÃO AO ECOSSISTEMA',SN:'19 900 FCFA / MÊS',FR:'450 € / ANO',US:'$29 / MÊS',note:"Cartão avulso · França: 20 € · Senegal: 15 000 FCFA · EUA: 20 $ · pagamento único."},
    it:{free:"Carta singola · Francia: 20 € · Senegal: 15 000 FCFA · USA: 20 $ · una tantum.",label:'ADESIONE ALL’ECOSISTEMA',SN:'19 900 FCFA / MESE',FR:'450 € / ANNO',US:'$29 / MESE',note:"Carta singola · Francia: 20 € · Senegal: 15 000 FCFA · USA: 20 $ · una tantum."},
    de:{free:"Einzelne Karte · Frankreich: 20 € · Senegal: 15.000 FCFA · USA: 20 $ · einmalig.",label:'ÖKOSYSTEM-MITGLIEDSCHAFT',SN:'19.900 FCFA / MONAT',FR:'450 € / JAHR',US:'$29 / MONAT',note:"Einzelne Karte · Frankreich: 20 € · Senegal: 15.000 FCFA · USA: 20 $ · einmalig."},
    nl:{free:"Losse kaart · Frankrijk: €20 · Senegal: 15.000 FCFA · VS: $20 · eenmalig.",label:'ECOSYSTEEMLIDMAATSCHAP',SN:'19.900 FCFA / MAAND',FR:'€450 / JAAR',US:'$29 / MAAND',note:"Losse kaart · Frankrijk: €20 · Senegal: 15.000 FCFA · VS: $20 · eenmalig."},
    ar:{free:"بطاقة منفصلة · فرنسا: 20 € · السنغال: 15 000 FCFA · أمريكا: 20 $ · دفعة واحدة.",label:'عضوية المنظومة',SN:'19 900 FCFA / شهر',FR:'450 € / سنة',US:'$29 / شهر',note:"بطاقة منفصلة · فرنسا: 20 € · السنغال: 15 000 FCFA · أمريكا: 20 $ · دفعة واحدة."}
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
