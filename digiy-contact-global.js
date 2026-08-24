/* DIGIYLYFE — chargeur vitrine 20260824
 * Core historique figé bit pour bit : /digiy-contact-global-core-20260824.js
 * Ajouts isolés : lien officiel PRO CARNET + offre CARNET autonome sur les pages adhérent.
 */
(function(){
  'use strict';

  var RUNTIME_URL='/assets/digiy-adhesion-runtime-v1.json';
  var runtime=null;

  function lang(){
    return (document.documentElement.lang||localStorage.getItem('digiy_lang')||'fr').slice(0,2).toLowerCase();
  }

  function membershipFile(){
    return (location.pathname.split('/').pop()||'').toLowerCase();
  }

  function membershipPlan(){
    var f=membershipFile();
    return f==='tarifs-adherents-1.html'?'adherent-19900':f==='tarifs-adherents.html'?'adherent-28000':'';
  }

  function onMembershipPage(){return !!membershipPlan();}

  function countryId(){
    var q=(new URLSearchParams(location.search).get('country')||localStorage.getItem('digiy_country')||'sn').toUpperCase();
    return q==='FR'?'FR':'SN';
  }

  function country(){
    var id=countryId();
    return runtime&&Array.isArray(runtime.countries)?runtime.countries.find(function(c){return c.id===id&&c.status==='active';}):null;
  }

  function priceLabel(p){return p&&p.label?p.label:'';}

  function selectedProduct(){
    return (new URLSearchParams(location.search).get('product')||'').toLowerCase()==='carnet-pro'?'carnet-pro':'membership-card';
  }

  function setProduct(product){
    product=product==='carnet-pro'?'carnet-pro':'membership-card';
    var u=new URL(location.href);
    if(product==='carnet-pro')u.searchParams.set('product','carnet-pro');
    else u.searchParams.delete('product');
    history.replaceState(null,'',u.pathname+u.search+u.hash);
    refreshMembershipCarnet();
  }

  function installCarnetModuleLink(){
    var grid=document.querySelector('.publicGrid');
    if(!grid || grid.querySelector('a[href="https://digiy-carnet-pro.digiylyfe.com/"]')) return;

    var copy={
      fr:'Carnet d’activité · entrées · sorties',
      en:'Activity ledger · income · expenses',
      es:'Cuaderno de actividad · entradas · salidas',
      pt:'Caderno de atividade · entradas · saídas',
      it:'Registro attività · entrate · uscite',
      de:'Aktivitätsbuch · Einnahmen · Ausgaben',
      nl:'Activiteitenboek · inkomsten · uitgaven',
      ar:'دفتر النشاط · مداخيل · مصاريف'
    };

    var card=document.createElement('a');
    card.className='publicCard';
    card.href='https://digiy-carnet-pro.digiylyfe.com/';
    card.setAttribute('aria-label','Découvrir PRO CARNET');
    card.innerHTML='<i aria-hidden="true">📒</i><strong>PRO CARNET</strong><small data-digiy-carnet-module-copy></small>';
    grid.appendChild(card);

    function refresh(){
      var l=lang();
      var small=card.querySelector('[data-digiy-carnet-module-copy]');
      if(small) small.textContent=copy[l]||copy.fr;
    }

    refresh();
    new MutationObserver(refresh).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});
  }

  function carnetCopy(){
    var all={
      fr:{tag:'OUTIL MÉTIER · CARNET PRO',desc:'Suivez vos entrées, sorties, réserves et preuves. CARNET PRO peut être pris seul, sans carte DIGIYLYFE.',period:'PAR MOIS',items:['Entrées · sorties · réserves','PRO + PERSO','Wave · Orange Money · Cash','Note vocale avec validation','Bilan automatique','0 % commission DIGIYLYFE'],cta:'CHOISIR CARNET PRO',payTitle:'CE QUE JE RÈGLE',membership:'ADHÉSION · CARTE',carnet:'📒 CARNET PRO',continueMembership:'CONTINUER MON DOSSIER D’ADHÉSION →',continueCarnet:'CONTINUER MON DOSSIER CARNET PRO →',payNoteMembership:'Après le règlement, ouvrez votre dossier d’adhésion.',payNoteCarnet:'Après le règlement, ouvrez votre dossier CARNET PRO. Aucune carte de visite n’est obligatoire.'},
      en:{tag:'BUSINESS TOOL · CARNET PRO',desc:'Track income, expenses, reserves and proof. CARNET PRO can be subscribed to on its own, without a DIGIYLYFE card.',period:'PER MONTH',items:['Income · expenses · reserves','PRO + PERSONAL','Wave · Orange Money · Cash','Voice note with confirmation','Automatic summary','0% DIGIYLYFE commission'],cta:'CHOOSE CARNET PRO',payTitle:'WHAT I AM PAYING FOR',membership:'MEMBERSHIP · CARD',carnet:'📒 CARNET PRO',continueMembership:'CONTINUE MY MEMBERSHIP FILE →',continueCarnet:'CONTINUE MY CARNET PRO FILE →',payNoteMembership:'After payment, open your membership file.',payNoteCarnet:'After payment, open your CARNET PRO file. A business card is not required.'},
      es:{tag:'HERRAMIENTA PROFESIONAL · CARNET PRO',desc:'Controle entradas, salidas, reservas y justificantes. CARNET PRO puede contratarse solo, sin tarjeta DIGIYLYFE.',period:'AL MES',items:['Entradas · salidas · reservas','PRO + PERSONAL','Wave · Orange Money · Cash','Nota de voz con validación','Balance automático','0 % comisión DIGIYLYFE'],cta:'ELEGIR CARNET PRO',payTitle:'LO QUE ESTOY PAGANDO',membership:'ADHESIÓN · TARJETA',carnet:'📒 CARNET PRO',continueMembership:'CONTINUAR MI EXPEDIENTE →',continueCarnet:'CONTINUAR MI EXPEDIENTE CARNET PRO →',payNoteMembership:'Después del pago, abra su expediente de adhesión.',payNoteCarnet:'Después del pago, abra su expediente CARNET PRO. No es obligatoria una tarjeta.'},
      pt:{tag:'FERRAMENTA PROFISSIONAL · CARNET PRO',desc:'Acompanhe entradas, saídas, reservas e comprovativos. CARNET PRO pode ser subscrito sozinho, sem cartão DIGIYLYFE.',period:'POR MÊS',items:['Entradas · saídas · reservas','PRO + PESSOAL','Wave · Orange Money · Cash','Nota de voz com validação','Resumo automático','0 % comissão DIGIYLYFE'],cta:'ESCOLHER CARNET PRO',payTitle:'O QUE ESTOU A PAGAR',membership:'ADESÃO · CARTÃO',carnet:'📒 CARNET PRO',continueMembership:'CONTINUAR O MEU PROCESSO →',continueCarnet:'CONTINUAR O MEU PROCESSO CARNET PRO →',payNoteMembership:'Após o pagamento, abra o seu processo de adesão.',payNoteCarnet:'Após o pagamento, abra o seu processo CARNET PRO. O cartão não é obrigatório.'},
      it:{tag:'STRUMENTO PROFESSIONALE · CARNET PRO',desc:'Segui entrate, uscite, riserve e prove. CARNET PRO può essere sottoscritto da solo, senza carta DIGIYLYFE.',period:'AL MESE',items:['Entrate · uscite · riserve','PRO + PERSONALE','Wave · Orange Money · Cash','Nota vocale con conferma','Riepilogo automatico','0% commissione DIGIYLYFE'],cta:'SCEGLI CARNET PRO',payTitle:'COSA STO PAGANDO',membership:'ADESIONE · CARTA',carnet:'📒 CARNET PRO',continueMembership:'CONTINUA IL MIO DOSSIER →',continueCarnet:'CONTINUA IL MIO DOSSIER CARNET PRO →',payNoteMembership:'Dopo il pagamento, apri il dossier di adesione.',payNoteCarnet:'Dopo il pagamento, apri il dossier CARNET PRO. La carta non è obbligatoria.'},
      de:{tag:'BUSINESS-TOOL · CARNET PRO',desc:'Einnahmen, Ausgaben, Rücklagen und Nachweise verfolgen. CARNET PRO kann allein ohne DIGIYLYFE-Karte abonniert werden.',period:'PRO MONAT',items:['Einnahmen · Ausgaben · Rücklagen','PRO + PRIVAT','Wave · Orange Money · Cash','Sprachnotiz mit Bestätigung','Automatische Übersicht','0 % DIGIYLYFE-Provision'],cta:'CARNET PRO WÄHLEN',payTitle:'WAS ICH BEZAHLE',membership:'MITGLIEDSCHAFT · KARTE',carnet:'📒 CARNET PRO',continueMembership:'MEINEN ANTRAG FORTSETZEN →',continueCarnet:'MEINEN CARNET-PRO-ANTRAG FORTSETZEN →',payNoteMembership:'Nach der Zahlung öffnen Sie Ihren Mitgliedschaftsantrag.',payNoteCarnet:'Nach der Zahlung öffnen Sie Ihren CARNET-PRO-Antrag. Eine Karte ist nicht erforderlich.'},
      nl:{tag:'ZAKELIJKE TOOL · CARNET PRO',desc:'Volg inkomsten, uitgaven, reserves en bewijzen. CARNET PRO kan zelfstandig worden genomen, zonder DIGIYLYFE-kaart.',period:'PER MAAND',items:['Inkomsten · uitgaven · reserves','PRO + PERSOONLIJK','Wave · Orange Money · Cash','Spraaknotitie met bevestiging','Automatisch overzicht','0% DIGIYLYFE-commissie'],cta:'KIES CARNET PRO',payTitle:'WAT IK BETAAL',membership:'LIDMAATSCHAP · KAART',carnet:'📒 CARNET PRO',continueMembership:'MIJN DOSSIER VERVOLGEN →',continueCarnet:'MIJN CARNET PRO-DOSSIER VERVOLGEN →',payNoteMembership:'Open na betaling uw lidmaatschapsdossier.',payNoteCarnet:'Open na betaling uw CARNET PRO-dossier. Een kaart is niet verplicht.'},
      ar:{tag:'أداة مهنية · CARNET PRO',desc:'تابع المداخيل والمصاريف والاحتياطات والإثباتات. يمكن الاشتراك في CARNET PRO وحده دون بطاقة DIGIYLYFE.',period:'شهريًا',items:['مداخيل · مصاريف · احتياطات','مهني + شخصي','Wave · Orange Money · نقدًا','ملاحظة صوتية مع التأكيد','ملخص تلقائي','0٪ عمولة DIGIYLYFE'],cta:'اختيار CARNET PRO',payTitle:'ما الذي أدفع مقابله',membership:'العضوية · البطاقة',carnet:'📒 CARNET PRO',continueMembership:'متابعة ملف العضوية ←',continueCarnet:'متابعة ملف CARNET PRO ←',payNoteMembership:'بعد الدفع افتح ملف العضوية.',payNoteCarnet:'بعد الدفع افتح ملف CARNET PRO. البطاقة غير إلزامية.'}
    };
    return all[lang()]||all.fr;
  }

  function ensureCarnetOffer(){
    if(!onMembershipPage()) return;
    var cards=document.querySelector('.cards');
    if(!cards) return;
    cards.setAttribute('data-digiy-carnet-grid','1');
    if(!document.querySelector('style[data-digiy-carnet-grid-style]')){
      var style=document.createElement('style');
      style.setAttribute('data-digiy-carnet-grid-style','1');
      style.textContent='.cards[data-digiy-carnet-grid="1"]{grid-template-columns:repeat(4,minmax(0,1fr))}@media(max-width:1000px){.cards[data-digiy-carnet-grid="1"]{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:820px){.cards[data-digiy-carnet-grid="1"]{grid-template-columns:1fr}}';
      document.head.appendChild(style);
    }
    if(!document.querySelector('[data-digiy-carnet-offer]')){
      var card=document.createElement('article');
      card.className='card';
      card.setAttribute('data-digiy-carnet-offer','1');
      card.innerHTML='<span class="tag" data-carnet-tag></span><p class="desc" data-carnet-desc></p><div class="price" data-carnet-price></div><div class="period" data-carnet-period></div><ul data-carnet-items></ul><a class="cta" href="#paiement" data-carnet-choose></a>';
      cards.appendChild(card);
      card.querySelector('[data-carnet-choose]').addEventListener('click',function(){setProduct('carnet-pro');});
    }
  }

  function ensurePaymentChooser(){
    if(!onMembershipPage()) return;
    var payment=document.querySelector('#paiement');
    var grid=payment&&payment.querySelector('.paymentGrid');
    if(!payment||!grid) return;
    if(document.querySelector('[data-digiy-payment-product]')) return;

    var box=document.createElement('div');
    box.setAttribute('data-digiy-payment-product','1');
    box.style.cssText='margin:14px 0;padding:14px;border:1px solid rgba(246,196,83,.55);border-radius:20px;background:rgba(255,255,255,.06)';
    box.innerHTML='<strong data-pay-product-title style="display:block;color:#ffe9a8;font-size:13px;font-weight:1000;margin-bottom:10px"></strong><div style="display:grid;grid-template-columns:1fr 1fr;gap:9px"><button type="button" data-pay-product="membership-card" style="min-height:52px;border:1px solid #ffffff2b;border-radius:16px;background:#ffffff09;color:#fff;font-weight:1000;padding:10px"></button><button type="button" data-pay-product="carnet-pro" style="min-height:52px;border:1px solid #ffffff2b;border-radius:16px;background:#ffffff09;color:#fff;font-weight:1000;padding:10px"></button></div><p data-pay-product-note style="margin:10px 0 0;color:rgba(247,255,249,.84);font-size:12px;line-height:1.45;font-weight:850"></p>';
    payment.insertBefore(box,grid);
    box.querySelectorAll('[data-pay-product]').forEach(function(btn){btn.addEventListener('click',function(){setProduct(btn.getAttribute('data-pay-product'));});});
  }

  function patchContinueLink(){
    if(!onMembershipPage()) return;
    var a=document.querySelector('[data-digiy-prepare-card] a, [data-digiy-prepare-card][href]');
    if(!a){
      var wrap=document.querySelector('[data-digiy-prepare-card]');
      if(wrap)a=wrap.querySelector('a');
    }
    if(!a) return;
    var copy=carnetCopy();
    var product=selectedProduct();
    var country=countryId().toLowerCase();
    var l=lang();
    if(product==='carnet-pro'){
      a.href='https://digiylyfe.com/preparer-ma-carte.html?product=carnet-pro&lang='+encodeURIComponent(l)+'&country='+encodeURIComponent(country);
      a.textContent=copy.continueCarnet;
    }else{
      a.href='https://digiylyfe.com/preparer-ma-carte.html?plan='+encodeURIComponent(membershipPlan())+'&lang='+encodeURIComponent(l)+'&country='+encodeURIComponent(country);
      a.textContent=copy.continueMembership;
    }
  }

  function refreshMembershipCarnet(){
    if(!onMembershipPage()||!runtime) return;
    ensureCarnetOffer();
    ensurePaymentChooser();
    var c=country();
    if(!c) return;
    var cp=c.pricing&&c.pricing.modules&&c.pricing.modules.carnet_pro;
    var mp=c.pricing&&c.pricing.membership&&c.pricing.membership[membershipPlan()];
    if(!cp||!mp) return;
    var copy=carnetCopy();

    var offer=document.querySelector('[data-digiy-carnet-offer]');
    if(offer){
      offer.querySelector('[data-carnet-tag]').textContent=copy.tag;
      offer.querySelector('[data-carnet-desc]').textContent=copy.desc;
      offer.querySelector('[data-carnet-price]').textContent=priceLabel(cp);
      offer.querySelector('[data-carnet-period]').textContent=copy.period;
      offer.querySelector('[data-carnet-items]').innerHTML=copy.items.map(function(x){return '<li>✓ '+x+'</li>';}).join('');
      offer.querySelector('[data-carnet-choose]').textContent=copy.cta;
    }

    var box=document.querySelector('[data-digiy-payment-product]');
    if(box){
      box.querySelector('[data-pay-product-title]').textContent=copy.payTitle;
      var bMember=box.querySelector('[data-pay-product="membership-card"]');
      var bCarnet=box.querySelector('[data-pay-product="carnet-pro"]');
      bMember.textContent=copy.membership+' · '+priceLabel(mp);
      bCarnet.textContent=copy.carnet+' · '+priceLabel(cp);
      var product=selectedProduct();
      [bMember,bCarnet].forEach(function(b){
        var on=b.getAttribute('data-pay-product')===product;
        b.style.background=on?'linear-gradient(135deg,#f6c453,#2dd4bf)':'#ffffff09';
        b.style.color=on?'#06140f':'#fff';
        b.style.borderColor=on?'transparent':'#ffffff2b';
        b.setAttribute('aria-pressed',on?'true':'false');
      });
      box.querySelector('[data-pay-product-note]').textContent=product==='carnet-pro'?copy.payNoteCarnet:copy.payNoteMembership;
    }
    patchContinueLink();
  }

  function loadMembershipRuntime(){
    if(!onMembershipPage()) return;
    fetch(RUNTIME_URL,{cache:'no-store'})
      .then(function(r){if(!r.ok)throw new Error('runtime '+r.status);return r.json();})
      .then(function(data){runtime=data;refreshMembershipCarnet();})
      .catch(function(){});
  }

  function afterCore(){
    installCarnetModuleLink();
    if(onMembershipPage()){
      loadMembershipRuntime();
      setTimeout(refreshMembershipCarnet,120);
      setTimeout(refreshMembershipCarnet,500);
      new MutationObserver(function(){setTimeout(refreshMembershipCarnet,0);}).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});
      new MutationObserver(function(){patchContinueLink();}).observe(document.body,{childList:true,subtree:true});
      document.addEventListener('click',function(e){
        if(e.target&&e.target.closest&&e.target.closest('[data-digiy-country]'))setTimeout(refreshMembershipCarnet,50);
      });
    }
  }

  var core=document.createElement('script');
  core.src='/digiy-contact-global-core-20260824.js?v=20260824';
  core.async=false;
  core.onload=afterCore;
  core.onerror=afterCore;
  document.head.appendChild(core);
})();
