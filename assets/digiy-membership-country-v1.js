/* DIGIYLYFE — Membership country pricing V1
 * Scope: tarifs-adherents-1.html + tarifs-adherents.html
 * Source of truth: /assets/digiy-adhesion-runtime-v1.json
 * Rule: one country => one currency => one visible price set.
 */
(function(){
  'use strict';

  var file=(location.pathname.split('/').pop()||'').toLowerCase();
  var plan=file==='tarifs-adherents-1.html'?'adherent-19900':file==='tarifs-adherents.html'?'adherent-28000':'';
  if(!plan) return;

  var RUNTIME_URL='/assets/digiy-adhesion-runtime-v1.json';
  var runtime=null;
  var params=new URLSearchParams(location.search);
  var countryId=(params.get('country')||localStorage.getItem('digiy_country')||'sn').toUpperCase();
  if(countryId!=='SN'&&countryId!=='FR') countryId='SN';

  function country(){
    return runtime&&Array.isArray(runtime.countries)?runtime.countries.find(function(c){return c.id===countryId&&c.status==='active';}):null;
  }
  function label(c){
    var lang=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();
    return (c&&c.labels&&(c.labels[lang]||c.labels.fr))||c.id;
  }
  function amount(n,c){
    if(c.currency.code==='XOF') return new Intl.NumberFormat('fr-FR',{maximumFractionDigits:0}).format(Number(n)).replace(/\u202f/g,' ')+' FCFA';
    if(c.currency.code==='EUR') return new Intl.NumberFormat('fr-FR',{maximumFractionDigits:0}).format(Number(n)).replace(/\u202f/g,' ')+' €';
    return String(n)+' '+(c.currency.label||c.currency.code||'');
  }
  function ensureUi(){
    if(document.querySelector('[data-digiy-country-pricing]')) return;
    var top=document.querySelector('.top');
    if(!top) return;
    var style=document.createElement('style');
    style.textContent='.digiyCountryPricing{display:grid;grid-template-columns:1fr 1fr;gap:8px;max-width:620px;margin:0 auto 14px}.digiyCountryPricing button{min-height:44px;border:1px solid #ffffff2b;border-radius:999px;background:#ffffff09;color:#fff;font-weight:1000;cursor:pointer;padding:9px 12px}.digiyCountryPricing button.active{background:linear-gradient(135deg,#f6c453,#2dd4bf);color:#06140f;border-color:transparent}@media(max-width:520px){.digiyCountryPricing{grid-template-columns:1fr}}';
    document.head.appendChild(style);
    var box=document.createElement('div');
    box.className='digiyCountryPricing';
    box.setAttribute('data-digiy-country-pricing','1');
    box.setAttribute('role','group');
    box.setAttribute('aria-label','Choisir le pays et la devise');
    box.innerHTML='<button type="button" data-digiy-country="SN">🇸🇳 SÉNÉGAL · FCFA</button><button type="button" data-digiy-country="FR">🇫🇷 FRANCE · €</button>';
    top.insertAdjacentElement('afterend',box);
    box.querySelectorAll('[data-digiy-country]').forEach(function(btn){
      btn.addEventListener('click',function(){countryId=btn.getAttribute('data-digiy-country');persist();apply();});
    });
  }
  function persist(){
    try{localStorage.setItem('digiy_country',countryId);}catch(e){}
    var u=new URL(location.href);u.searchParams.set('country',countryId.toLowerCase());history.replaceState(null,'',u);
  }
  function patchPrepareLink(){
    var a=document.querySelector('[data-digiy-prepare-card]');
    if(!a) return;
    try{
      var u=new URL(a.href,location.href);u.searchParams.set('country',countryId.toLowerCase());a.href=u.href;
    }catch(e){}
  }
  function patchLoc(c,membership){
    var table=document.querySelector('#digiy-loc .locTable');
    if(!table) return;
    table.querySelectorAll('tr').forEach(function(tr){
      var cells=tr.children;
      if(cells.length<3) return;
      cells[1].style.display=countryId==='SN'?'':'none';
      cells[2].style.display=countryId==='FR'?'':'none';
    });
    table.style.minWidth='0';
    var lead=document.getElementById('locLead');
    if(lead){
      var single=amount(membership.amount,c);
      lead.textContent=lead.textContent.replace(/28(?:[ .,\u00a0\u202f])000 FCFA\s*\/\s*(?:€\s*75|75\s*€)/gi,single);
    }
  }
  function patchPayments(){
    var cards=document.querySelectorAll('#paiement .paymentGrid .payCard');
    if(cards.length>=2){
      cards[0].hidden=countryId!=='SN';
      cards[1].hidden=countryId!=='FR';
      var grid=document.querySelector('#paiement .paymentGrid');if(grid)grid.style.gridTemplateColumns='1fr';
    }
  }
  function apply(){
    if(!runtime) return;
    ensureUi();
    var c=country();if(!c) return;
    var membership=c.pricing&&c.pricing.membership&&c.pricing.membership[plan];
    var fiche=c.pricing&&c.pricing.services&&c.pricing.services.fiche;
    var premium=c.pricing&&c.pricing.services&&c.pricing.services.site_premium;
    var extra=c.pricing&&c.pricing.services&&c.pricing.services.site_extra;
    if(!membership||!fiche||!premium||!extra) return;

    document.querySelectorAll('[data-digiy-country]').forEach(function(btn){
      var on=btn.getAttribute('data-digiy-country')===countryId;btn.classList.toggle('active',on);btn.setAttribute('aria-pressed',on?'true':'false');
    });
    var memberPrice=document.getElementById('memberPrice');if(memberPrice)memberPrice.textContent=amount(membership.amount,c);
    var sheetPrice=document.getElementById('sheetPrice');if(sheetPrice)sheetPrice.textContent=amount(fiche.starting_amount,c)+' · À PARTIR DE';
    var sitePrice=document.getElementById('sitePrice');if(sitePrice)sitePrice.textContent='SITE PREMIUM · '+amount(premium.starting_amount,c)+' · SITE EXTRA · '+amount(extra.starting_amount,c);
    patchLoc(c,membership);
    patchPayments();
    patchPrepareLink();
    document.title='DIGIYLYFE — '+(plan==='adherent-19900'?'Adhérent 1':'Adhérent 2')+' · '+label(c)+' · '+amount(membership.amount,c);
    persist();
  }

  fetch(RUNTIME_URL,{cache:'no-store'})
    .then(function(r){if(!r.ok)throw new Error('runtime '+r.status);return r.json();})
    .then(function(data){runtime=data;ensureUi();apply();})
    .catch(function(){/* fail closed: no country-specific derivation without runtime */});

  document.querySelectorAll('.top [data-l]').forEach(function(btn){btn.addEventListener('click',function(){setTimeout(apply,0);});});
  new MutationObserver(function(){setTimeout(apply,0);}).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});
  new MutationObserver(function(){patchPrepareLink();}).observe(document.body,{childList:true,subtree:true});
})();
