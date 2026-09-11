/* DIGIYLYFE — chargeur vitrine relais 20260911
 * Le chargeur stable précédent est conservé intégralement dans :
 * /digiy-contact-global-stable-20260830.js
 * Ajouts isolés : Services professionnels + Santé & soins + raccord Sarlat + COM MAÎTRE accueil + séparation façade public/pro + DIGIY CAMPUS.
 * Correctif cohérence : retire l’ancienne carte Dakar de secours si la vraie carte Dakar illustrée est déjà présente.
 * Correctif tunnel PRO : renseignements → validation → création/présentation fiche → accord PRO → paiement → mise en ligne/activation.
 * PWA / manifest / service worker : inchangés.
 */
(function(){
  'use strict';
  if(window.DIGIY_VITRINE_RELAY_20260901)return;
  window.DIGIY_VITRINE_RELAY_20260901=true;

  function currentLang(){
    var q='';try{q=(new URLSearchParams(location.search).get('lang')||'').slice(0,2).toLowerCase()}catch(e){}
    var h=(document.documentElement.lang||'fr').slice(0,2).toLowerCase(),ok=['fr','en','es','pt','it','de','nl','ar'];
    return ok.indexOf(q)>=0?q:(ok.indexOf(h)>=0?h:'fr');
  }

  function addScript(src,attr){
    if(attr&&document.querySelector('script['+attr+']'))return null;
    var s=document.createElement('script');s.src=src;s.async=false;if(attr)s.setAttribute(attr,'1');document.head.appendChild(s);return s;
  }

  function retireLegacyDakarDuplicate(){
    var grid=document.querySelector('.territoryGrid');
    if(!grid)return;
    var real=grid.querySelector('a[data-fav-id="territoire-dakar"],a[href="https://digiylyfe.com/dakar.html"]');
    if(!real)return;
    grid.querySelectorAll('[data-digiy-dakar-door]').forEach(function(card){card.remove();});
  }

  function guardUniqueDakar(){
    retireLegacyDakarDuplicate();
    var grid=document.querySelector('.territoryGrid');
    if(!grid||grid.getAttribute('data-digiy-dakar-dedupe'))return;
    grid.setAttribute('data-digiy-dakar-dedupe','1');
    try{new MutationObserver(retireLegacyDakarDuplicate).observe(grid,{childList:true});}catch(e){}
    setTimeout(retireLegacyDakarDuplicate,250);
    setTimeout(retireLegacyDakarDuplicate,1000);
  }

  function loadHomeFacade(){
    addScript('/assets/digiy-facade-two-worlds-v1.js?v=20260901-v1','data-digiy-facade-two-worlds');
  }

  function fixSarlatPublicHealthDoor(){
    if(!/\/sarlat\.html$/i.test(location.pathname.replace(/\/+$/,'')))return;
    var a=document.querySelector('[data-digiy-health-door]');if(!a)return;
    var u=new URL('/sarlat.html',location.origin);u.searchParams.set('need','health_care');u.searchParams.set('lang',currentLang());u.hash='places';a.href=u.pathname+u.search+u.hash;
  }

  function fixTarifsPrevalidationFlow(){
    var p=location.pathname.replace(/\/+$/,'');
    if(!/\/tarifs-adherents-1\.html$/i.test(p))return;
    var q=new URLSearchParams(location.search),approved=q.get('approved')==='1';
    var active=document.querySelector('[data-country].active');
    var rawCountry=(active&&active.dataset.country?active.dataset.country:(q.get('country')||'sn')).toLowerCase();
    var country=rawCountry==='fr'?'fr':rawCountry==='us'?'us':'sn';
    var l=currentLang();
    var txt={
      fr:{cta:'PRÉPARER MON DOSSIER →',title:'SECTION PAIEMENT · APRÈS PRÉSENTATION ET ACCORD SUR LA FICHE',lead:'Cette section reste visible, mais aucun moyen de paiement n’est affiché avant votre accord sur la fiche préparée par DIGIYLYFE.',locked:'🔒 PAIEMENT VERROUILLÉ · LA FICHE DOIT D’ABORD VOUS ÊTRE PRÉSENTÉE ET APPROUVÉE',valid:'FICHE APPROUVÉE · VOIR LE RÈGLEMENT →'},
      en:{cta:'PREPARE MY FILE →',title:'PAYMENT SECTION · AFTER PROFILE PRESENTATION AND APPROVAL',lead:'This section remains visible, but no payment method is shown before you approve the profile prepared by DIGIYLYFE.',locked:'🔒 PAYMENT LOCKED · THE PROFILE MUST FIRST BE PRESENTED TO YOU AND APPROVED',valid:'PROFILE APPROVED · VIEW PAYMENT →'},
      es:{cta:'PREPARAR MI EXPEDIENTE →',title:'SECCIÓN DE PAGO · DESPUÉS DE PRESENTAR Y APROBAR LA FICHA',lead:'La sección permanece visible, pero no se muestra ningún medio de pago antes de su aprobación de la ficha.',locked:'🔒 PAGO BLOQUEADO · PRIMERO DEBE VER Y APROBAR LA FICHA',valid:'FICHA APROBADA · VER PAGO →'},
      pt:{cta:'PREPARAR O MEU DOSSIER →',title:'SECÇÃO DE PAGAMENTO · APÓS APRESENTAÇÃO E APROVAÇÃO DA FICHA',lead:'A secção permanece visível, mas nenhum meio de pagamento é mostrado antes da sua aprovação da ficha.',locked:'🔒 PAGAMENTO BLOQUEADO · PRIMEIRO TEM DE VER E APROVAR A FICHA',valid:'FICHA APROVADA · VER PAGAMENTO →'},
      it:{cta:'PREPARA IL DOSSIER →',title:'SEZIONE PAGAMENTO · DOPO PRESENTAZIONE E APPROVAZIONE DELLA SCHEDA',lead:'La sezione resta visibile, ma nessun metodo di pagamento viene mostrato prima della tua approvazione.',locked:'🔒 PAGAMENTO BLOCCATO · PRIMA DEVI VEDERE E APPROVARE LA SCHEDA',valid:'SCHEDA APPROVATA · VEDI PAGAMENTO →'},
      de:{cta:'UNTERLAGEN VORBEREITEN →',title:'ZAHLUNGSBEREICH · NACH VORLAGE UND FREIGABE DES PROFILS',lead:'Dieser Bereich bleibt sichtbar, aber Zahlungsdaten werden erst nach Ihrer Freigabe des Profils angezeigt.',locked:'🔒 ZAHLUNG GESPERRT · PROFIL MUSS ZUERST VORGELEGT UND FREIGEGEBEN WERDEN',valid:'PROFIL FREIGEGEBEN · ZAHLUNG ANSEHEN →'},
      nl:{cta:'MIJN DOSSIER VOORBEREIDEN →',title:'BETALINGSSECTIE · NA VOORLEGGING EN GOEDKEURING VAN HET PROFIEL',lead:'Deze sectie blijft zichtbaar, maar betaalgegevens verschijnen pas nadat u het profiel hebt goedgekeurd.',locked:'🔒 BETALING VERGRENDELD · PROFIEL MOET EERST WORDEN VOORGELEGD EN GOEDGEKEURD',valid:'PROFIEL GOEDGEKEURD · BETALING BEKIJKEN →'},
      ar:{cta:'إعداد ملفي ←',title:'قسم الدفع · بعد عرض الملف المهني والموافقة عليه',lead:'يبقى قسم الدفع ظاهرًا، لكن لا تظهر وسائل الدفع قبل موافقتك على الملف المهني.',locked:'🔒 الدفع مقفل · يجب أولاً عرض الملف المهني عليك والموافقة عليه',valid:'تمت الموافقة على الملف · عرض الدفع ←'}
    }[l]||null;
    if(!txt)return;
    var cta=document.getElementById('memberCta'),title=document.getElementById('paymentTitle'),lead=document.getElementById('paymentLead');
    var grid=document.querySelector('#paiement .paymentGrid'),contact=document.querySelector('#paiement .contactPay'),box=document.getElementById('paiement');
    if(box){box.hidden=false;box.style.display='block';}
    if(title)title.textContent=txt.title;
    if(lead)lead.textContent=txt.lead;
    if(!approved){
      if(cta){cta.textContent=txt.cta;cta.href='/preparer-ma-carte.html?plan=adherent-19900&country='+country+'&lang='+l+'&flow=prevalidation-20260911';}
      if(grid)grid.style.display='none';
      if(contact)contact.style.display='none';
      if(box){
        var b=document.getElementById('digiyPaymentLockedState');
        if(!b){b=document.createElement('div');b.id='digiyPaymentLockedState';b.style.marginTop='14px';b.style.padding='14px';b.style.border='1px solid #f6c45366';b.style.borderRadius='16px';b.style.background='#f6c45312';b.style.color='#fff3cf';b.style.fontWeight='1000';b.style.lineHeight='1.45';b.style.textAlign='center';box.appendChild(b);}
        b.textContent=txt.locked;
      }
      var old=document.getElementById('digiyDossierBeforePay');if(old)old.remove();
    }else{
      if(cta){cta.textContent=txt.valid;cta.href='#paiement';}
      if(grid)grid.style.display='grid';
      if(contact)contact.style.display='flex';
      var locked=document.getElementById('digiyPaymentLockedState');if(locked)locked.remove();
      var legacy=document.getElementById('digiyDossierBeforePay');if(legacy)legacy.remove();
    }
  }

  function loadContextExtras(){
    var p=location.pathname.replace(/\/+$/,'');
    if(p===''||p==='/'||/\/index\.html$/i.test(p)){
      guardUniqueDakar();
      addScript('/assets/digiy-campus-interest-v2.js?v=20260904-v2','data-digiy-campus-interest');
      var com=addScript('/assets/digiy-com-maitre-v1.js?v=20260901-v1','data-digiy-com-maitre');
      if(com){com.onload=loadHomeFacade;com.onerror=loadHomeFacade}else loadHomeFacade();
    }
    if(/\/sarlat\.html$/i.test(p)){
      fixSarlatPublicHealthDoor();
      var s=addScript('/assets/digiy-sarlat-health-v1.js?v=20260901-v1','data-digiy-sarlat-health');
      if(s){s.onload=fixSarlatPublicHealthDoor;s.onerror=fixSarlatPublicHealthDoor}
      setTimeout(fixSarlatPublicHealthDoor,250);
    }
    if(/\/tarifs-adherents-1\.html$/i.test(p)){
      fixTarifsPrevalidationFlow();
      document.querySelectorAll('[data-country],[data-l]').forEach(function(b){b.addEventListener('click',function(){setTimeout(fixTarifsPrevalidationFlow,0)});});
      setTimeout(fixTarifsPrevalidationFlow,250);
    }
    if(/\/demo-dordogne\.html$/i.test(p)){
      var q=new URLSearchParams(location.search);
      if((q.get('need')||'')==='health_care')addScript('/assets/digiy-demo-dordogne-health-v1.js?v=20260901-v1','data-digiy-demo-dordogne-health');
    }
  }

  function loadHealthDoors(){
    var existing=document.querySelector('script[data-digiy-pro-health-loader]');
    if(existing){loadContextExtras();return;}
    var extra=document.createElement('script');
    extra.src='/assets/digiy-vitrine-professional-health-v1.js?v=20260901-v4';
    extra.async=false;
    extra.setAttribute('data-digiy-pro-health-loader','1');
    extra.onload=loadContextExtras;
    extra.onerror=loadContextExtras;
    document.head.appendChild(extra);
  }

  guardUniqueDakar();
  fixTarifsPrevalidationFlow();

  var stable=document.createElement('script');
  stable.src='/digiy-contact-global-stable-20260830.js?v=20260911-miami-v1';
  stable.async=false;
  stable.onload=function(){guardUniqueDakar();fixTarifsPrevalidationFlow();loadHealthDoors();};
  stable.onerror=function(){guardUniqueDakar();fixTarifsPrevalidationFlow();loadHealthDoors();};
  document.head.appendChild(stable);
})();