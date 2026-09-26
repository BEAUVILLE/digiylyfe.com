/* DIGIYLYFE · Accueil · prix adhesion visible dans la porte PROFESSIONNEL · 2026-09-17 */
(function(){
  'use strict';
  if(window.DIGIY_HOME_MEMBERSHIP_PRICE_20260917)return;
  window.DIGIY_HOME_MEMBERSHIP_PRICE_20260917=true;

  var host=(location.hostname||'').toLowerCase();
  var path=(location.pathname||'/').replace(/\/+$/,'')||'/';
  if(host!=='digiylyfe.com'||(path!=='/'&&!/\/index\.html$/i.test(path)))return;

  var COPY={
    fr:{text:'Carte DIGIY gratuite. L’adhésion active votre présence dans l’écosystème.',all:'ADHÉSION ÉCOSYSTÈME · 🇸🇳 19 900 FCFA / MOIS · 🇫🇷 450 € / AN · 🇺🇸 $29 / MOIS',SN:'🇸🇳 ADHÉSION ÉCOSYSTÈME · 19 900 FCFA / MOIS',FR:'🇫🇷 ADHÉSION ÉCOSYSTÈME · 450 € / AN',US:'🇺🇸 ADHÉSION ÉCOSYSTÈME · $29 / MOIS'},
    en:{text:'Your DIGIY card is free. Membership activates your presence in the ecosystem.',all:'ECOSYSTEM MEMBERSHIP · 🇸🇳 19,900 FCFA / MONTH · 🇫🇷 €450 / YEAR · 🇺🇸 $29 / MONTH',SN:'🇸🇳 ECOSYSTEM MEMBERSHIP · 19,900 FCFA / MONTH',FR:'🇫🇷 ECOSYSTEM MEMBERSHIP · €450 / YEAR',US:'🇺🇸 ECOSYSTEM MEMBERSHIP · $29 / MONTH'},
    es:{text:'Su tarjeta DIGIY es gratuita. La adhesión activa su presencia en el ecosistema.',all:'ADHESIÓN AL ECOSISTEMA · 🇸🇳 19 900 FCFA / MES · 🇫🇷 450 € / AÑO · 🇺🇸 $29 / MES',SN:'🇸🇳 ADHESIÓN AL ECOSISTEMA · 19 900 FCFA / MES',FR:'🇫🇷 ADHESIÓN AL ECOSISTEMA · 450 € / AÑO',US:'🇺🇸 ADHESIÓN AL ECOSISTEMA · $29 / MES'},
    pt:{text:'O cartão DIGIY é gratuito. A adesão ativa a sua presença no ecossistema.',all:'ADESÃO AO ECOSSISTEMA · 🇸🇳 19 900 FCFA / MÊS · 🇫🇷 450 € / ANO · 🇺🇸 $29 / MÊS',SN:'🇸🇳 ADESÃO AO ECOSSISTEMA · 19 900 FCFA / MÊS',FR:'🇫🇷 ADESÃO AO ECOSSISTEMA · 450 € / ANO',US:'🇺🇸 ADESÃO AO ECOSSISTEMA · $29 / MÊS'},
    it:{text:'La carta DIGIY è gratuita. L’adesione attiva la presenza nell’ecosistema.',all:'ADESIONE ALL’ECOSISTEMA · 🇸🇳 19 900 FCFA / MESE · 🇫🇷 450 € / ANNO · 🇺🇸 $29 / MESE',SN:'🇸🇳 ADESIONE ALL’ECOSISTEMA · 19 900 FCFA / MESE',FR:'🇫🇷 ADESIONE ALL’ECOSISTEMA · 450 € / ANNO',US:'🇺🇸 ADESIONE ALL’ECOSISTEMA · $29 / MESE'},
    de:{text:'Ihre DIGIY-Karte ist kostenlos. Die Mitgliedschaft aktiviert Ihre Präsenz im Ökosystem.',all:'ÖKOSYSTEM-MITGLIEDSCHAFT · 🇸🇳 19.900 FCFA / MONAT · 🇫🇷 450 € / JAHR · 🇺🇸 $29 / MONAT',SN:'🇸🇳 ÖKOSYSTEM-MITGLIEDSCHAFT · 19.900 FCFA / MONAT',FR:'🇫🇷 ÖKOSYSTEM-MITGLIEDSCHAFT · 450 € / JAHR',US:'🇺🇸 ÖKOSYSTEM-MITGLIEDSCHAFT · $29 / MONAT'},
    nl:{text:'Uw DIGIY-kaart is gratis. Het lidmaatschap activeert uw aanwezigheid in het ecosysteem.',all:'ECOSYSTEEMLIDMAATSCHAP · 🇸🇳 19.900 FCFA / MAAND · 🇫🇷 €450 / JAAR · 🇺🇸 $29 / MAAND',SN:'🇸🇳 ECOSYSTEEMLIDMAATSCHAP · 19.900 FCFA / MAAND',FR:'🇫🇷 ECOSYSTEEMLIDMAATSCHAP · €450 / JAAR',US:'🇺🇸 ECOSYSTEEMLIDMAATSCHAP · $29 / MAAND'},
    ar:{text:'بطاقة DIGIY مجانية. العضوية تفعّل حضورك داخل المنظومة.',all:'عضوية المنظومة · 🇸🇳 19 900 FCFA / شهر · 🇫🇷 450 € / سنة · 🇺🇸 $29 / شهر',SN:'🇸🇳 عضوية المنظومة · 19 900 FCFA / شهر',FR:'🇫🇷 عضوية المنظومة · 450 € / سنة',US:'🇺🇸 عضوية المنظومة · $29 / شهر'}
  };

  var RUNTIME_URL='/assets/digiy-adhesion-runtime-v1.json';
  var runtime=null;
  function runtimeCountry(id){
    return runtime&&Array.isArray(runtime.countries)?runtime.countries.find(function(x){return x&&x.id===id&&x.status==='active';}):null;
  }
  function billingWord(period,l){
    var map={
      month:{fr:'MOIS',en:'MONTH',es:'MES',pt:'MÊS',it:'MESE',de:'MONAT',nl:'MAAND',ar:'شهر'},
      year:{fr:'AN',en:'YEAR',es:'AÑO',pt:'ANO',it:'ANNO',de:'JAHR',nl:'JAAR',ar:'سنة'}
    };
    return (map[period]&&map[period][l])||period||'';
  }
  function formatAmount(n,id,l){
    var v=Number(n);
    if(!isFinite(v))return '';
    if(id==='SN')return new Intl.NumberFormat('fr-FR',{maximumFractionDigits:0}).format(v).replace(/\u202f/g,' ')+' FCFA';
    if(id==='FR')return new Intl.NumberFormat('fr-FR',{maximumFractionDigits:0}).format(v).replace(/\u202f/g,' ')+' €';
    if(id==='US')return '  function country(){
    var c='';
    try{c=(new URLSearchParams(location.search).get('country')||'').toUpperCase();}catch(e){}
    if(!/^(SN|FR|US)$/.test(c)){try{c=(localStorage.getItem('digiy_country')||'').toUpperCase();}catch(e){c='';}}
    return /^(SN|FR|US)$/.test(c)?c:'';
  }
  function ensureStyle(){
    if(document.getElementById('digiyHomeMembershipPriceStyle'))return;
    var s=document.createElement('style');s.id='digiyHomeMembershipPriceStyle';s.textContent='\
      .digiyHomeMembershipPrice{display:block;margin:4px 0 2px;padding:8px 10px;border-radius:13px;border:1px solid rgba(246,196,83,.55);background:rgba(246,196,83,.10);color:#fff3cf;font-size:10.5px;line-height:1.35;font-weight:1000;text-align:center}\
      .digiyEntryDoor.pro .digiyHomeMembershipPrice,.digiyWorldDoor.pro .digiyHomeMembershipPrice{width:100%}\
    ';document.head.appendChild(s);
  }
  function patchDoor(door,c){
    if(!door)return false;
    var p=door.querySelector('p');if(p)p.textContent=c.text;
    var price=door.querySelector('.digiyHomeMembershipPrice');
    if(!price){price=document.createElement('span');price.className='digiyHomeMembershipPrice';var cta=door.querySelector('.digiyEntryCta,.digiyWorldCta');if(cta)door.insertBefore(price,cta);else door.appendChild(price);}
    var cc=country(),l=lang();
    price.textContent=cc?(runtimePrice(cc,l)||c[cc]):(runtimeAll(l)||c.all);
    return true;
  }
  function apply(){
    ensureStyle();
    var c=COPY[lang()]||COPY.fr;
    var ok=false;
    document.querySelectorAll('.digiyEntryDoor.pro:not(.digiyLocDoor),.digiyWorldDoor.pro').forEach(function(door){if(patchDoor(door,c))ok=true;});
    if(ok)document.documentElement.setAttribute('data-digiy-home-membership-price','20260917-v1');
  }

  apply();
  loadRuntime();
  [80,250,700,1500].forEach(function(ms){setTimeout(apply,ms);});
  document.addEventListener('click',function(e){var b=e.target&&e.target.closest?e.target.closest('.langBtn,[data-l],[data-country]'):null;if(b)setTimeout(apply,0);},false);
  try{new MutationObserver(function(){setTimeout(apply,0);}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});}catch(e){}
})();
+new Intl.NumberFormat('en-US',{maximumFractionDigits:0}).format(v);
    return String(v);
  }
  function runtimePrice(id,l){
    var c=runtimeCountry(id),p=c&&c.pricing&&c.pricing.membership&&c.pricing.membership['adherent-19900'];
    if(!p||p.amount==null)return '';
    return (id==='SN'?'🇸🇳 ':id==='FR'?'🇫🇷 ':'🇺🇸 ')+(l==='fr'?'ADHÉSION ÉCOSYSTÈME · ':l==='en'?'ECOSYSTEM MEMBERSHIP · ':l==='es'?'ADHESIÓN AL ECOSISTEMA · ':l==='pt'?'ADESÃO AO ECOSSISTEMA · ':l==='it'?'ADESIONE ALL’ECOSISTEMA · ':l==='de'?'ÖKOSYSTEM-MITGLIEDSCHAFT · ':l==='nl'?'ECOSYSTEEMLIDMAATSCHAP · ':'عضوية المنظومة · ')+formatAmount(p.amount,id,l)+' / '+billingWord(p.billing_period,l);
  }
  function runtimeAll(l){
    var a=['SN','FR','US'].map(function(id){return runtimePrice(id,l);}).filter(Boolean);
    return a.length===3?a.join(' · '):'';
  }
  function loadRuntime(){
    return fetch(RUNTIME_URL,{cache:'no-store'}).then(function(r){if(!r.ok)throw new Error('runtime unavailable');return r.json();}).then(function(x){runtime=x;apply();return x;}).catch(function(){return null;});
  }
  function lang(){var l=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();return COPY[l]?l:'fr';}
  function country(){
    var c='';
    try{c=(new URLSearchParams(location.search).get('country')||'').toUpperCase();}catch(e){}
    if(!/^(SN|FR|US)$/.test(c)){try{c=(localStorage.getItem('digiy_country')||'').toUpperCase();}catch(e){c='';}}
    return /^(SN|FR|US)$/.test(c)?c:'';
  }
  function ensureStyle(){
    if(document.getElementById('digiyHomeMembershipPriceStyle'))return;
    var s=document.createElement('style');s.id='digiyHomeMembershipPriceStyle';s.textContent='\
      .digiyHomeMembershipPrice{display:block;margin:4px 0 2px;padding:8px 10px;border-radius:13px;border:1px solid rgba(246,196,83,.55);background:rgba(246,196,83,.10);color:#fff3cf;font-size:10.5px;line-height:1.35;font-weight:1000;text-align:center}\
      .digiyEntryDoor.pro .digiyHomeMembershipPrice,.digiyWorldDoor.pro .digiyHomeMembershipPrice{width:100%}\
    ';document.head.appendChild(s);
  }
  function patchDoor(door,c){
    if(!door)return false;
    var p=door.querySelector('p');if(p)p.textContent=c.text;
    var price=door.querySelector('.digiyHomeMembershipPrice');
    if(!price){price=document.createElement('span');price.className='digiyHomeMembershipPrice';var cta=door.querySelector('.digiyEntryCta,.digiyWorldCta');if(cta)door.insertBefore(price,cta);else door.appendChild(price);}
    var cc=country();price.textContent=cc?c[cc]:c.all;
    return true;
  }
  function apply(){
    ensureStyle();
    var c=COPY[lang()]||COPY.fr;
    var ok=false;
    document.querySelectorAll('.digiyEntryDoor.pro:not(.digiyLocDoor),.digiyWorldDoor.pro').forEach(function(door){if(patchDoor(door,c))ok=true;});
    if(ok)document.documentElement.setAttribute('data-digiy-home-membership-price','20260917-v1');
  }

  apply();
  [80,250,700,1500].forEach(function(ms){setTimeout(apply,ms);});
  document.addEventListener('click',function(e){var b=e.target&&e.target.closest?e.target.closest('.langBtn,[data-l],[data-country]'):null;if(b)setTimeout(apply,0);},false);
  try{new MutationObserver(function(){setTimeout(apply,0);}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});}catch(e){}
})();
