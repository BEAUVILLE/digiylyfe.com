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
    var country=(active&&active.dataset.country?active.dataset.country:(q.get('country')||'sn')).toLowerCase()==='fr'?'fr':'sn';
    var l=currentLang();
    var txt={
      fr:{cta:'PRÉPARER MON DOSSIER →',title:'RÈGLEMENT APRÈS PRÉSENTATION ET ACCORD SUR LA FICHE',lead:'N’effectuez aucun règlement maintenant. Envoyez vos renseignements : DIGIYLYFE contrôle le dossier, prépare la fiche, vous la présente et recueille votre accord. Le règlement vient seulement ensuite.',locked:'DOSSIER → FICHE PRÉSENTÉE → VOTRE ACCORD → PAIEMENT',valid:'FICHE APPROUVÉE · VOIR LE RÈGLEMENT →'},
      en:{cta:'PREPARE MY FILE →',title:'PAYMENT AFTER PROFILE PRESENTATION AND APPROVAL',lead:'Do not pay now. Send your information first. DIGIYLYFE reviews the file, prepares the profile, presents it to you and gets your approval. Payment comes only after that.',locked:'FILE → PROFILE PRESENTED → YOUR APPROVAL → PAYMENT',valid:'PROFILE APPROVED · VIEW PAYMENT →'},
      es:{cta:'PREPARAR MI EXPEDIENTE →',title:'PAGO DESPUÉS DE PRESENTAR Y APROBAR LA FICHA',lead:'No pague ahora. Envíe sus datos: DIGIYLYFE revisa el expediente, prepara la ficha, se la presenta y recoge su aprobación. El pago viene después.',locked:'EXPEDIENTE → FICHA PRESENTADA → SU APROBACIÓN → PAGO',valid:'FICHA APROBADA · VER PAGO →'},
      pt:{cta:'PREPARAR O MEU DOSSIER →',title:'PAGAMENTO APÓS APRESENTAÇÃO E APROVAÇÃO DA FICHA',lead:'Não pague agora. Envie os seus dados: a DIGIYLYFE analisa o dossier, prepara a ficha, apresenta-a e recolhe a sua aprovação. O pagamento vem depois.',locked:'DOSSIER → FICHA APRESENTADA → SUA APROVAÇÃO → PAGAMENTO',valid:'FICHA APROVADA · VER PAGAMENTO →'},
      it:{cta:'PREPARA IL DOSSIER →',title:'PAGAMENTO DOPO PRESENTAZIONE E APPROVAZIONE DELLA SCHEDA',lead:'Non pagare ora. Invia i tuoi dati: DIGIYLYFE controlla il dossier, prepara la scheda, te la presenta e raccoglie la tua approvazione. Il pagamento viene dopo.',locked:'DOSSIER → SCHEDA PRESENTATA → TUA APPROVAZIONE → PAGAMENTO',valid:'SCHEDA APPROVATA · VEDI PAGAMENTO →'},
      de:{cta:'UNTERLAGEN VORBEREITEN →',title:'ZAHLUNG NACH VORLAGE UND FREIGABE DES PROFILS',lead:'Jetzt nicht zahlen. Senden Sie zuerst Ihre Angaben. DIGIYLYFE prüft die Unterlagen, erstellt das Profil, legt es Ihnen vor und holt Ihre Freigabe ein. Erst danach erfolgt die Zahlung.',locked:'UNTERLAGEN → PROFIL VORGELEGT → FREIGABE → ZAHLUNG',valid:'PROFIL FREIGEGEBEN · ZAHLUNG ANSEHEN →'},
      nl:{cta:'MIJN DOSSIER VOORBEREIDEN →',title:'BETALING NA VOORLEGGING EN GOEDKEURING VAN HET PROFIEL',lead:'Betaal nu niet. Stuur eerst uw gegevens. DIGIYLYFE controleert het dossier, maakt het profiel, legt het aan u voor en vraagt uw goedkeuring. Pas daarna volgt de betaling.',locked:'DOSSIER → PROFIEL VOORGELEGD → UW GOEDKEURING → BETALING',valid:'PROFIEL GOEDGEKEURD · BETALING BEKIJKEN →'},
      ar:{cta:'إعداد ملفي ←',title:'الدفع بعد عرض الملف المهني والموافقة عليه',lead:'لا تدفع الآن. أرسل معلوماتك أولاً. تراجع DIGIYLYFE الملف، تُعد ملفك المهني، تعرضه عليك وتأخذ موافقتك. يأتي الدفع بعد ذلك فقط.',locked:'الملف → عرض الملف المهني → موافقتك → الدفع',valid:'تمت الموافقة على الملف · عرض الدفع ←'}
    }[l]||null;
    if(!txt)return;
    var cta=document.getElementById('memberCta'),title=document.getElementById('paymentTitle'),lead=document.getElementById('paymentLead');
    var grid=document.querySelector('#paiement .paymentGrid'),contact=document.querySelector('#paiement .contactPay'),box=document.getElementById('paiement');
    if(title)title.textContent=txt.title;
    if(lead)lead.textContent=txt.lead;
    if(!approved){
      if(cta){cta.textContent=txt.cta;cta.href='/preparer-ma-carte.html?plan=adherent-19900&country='+country+'&lang='+l+'&flow=prevalidation-20260911';}
      if(grid)grid.style.display='none';
      if(contact)contact.style.display='none';
      if(box){
        var b=document.getElementById('digiyDossierBeforePay');
        if(!b){b=document.createElement('a');b.id='digiyDossierBeforePay';b.className='cta primary';b.style.marginTop='14px';box.appendChild(b);}
        b.textContent=txt.locked+' →';b.href='/preparer-ma-carte.html?plan=adherent-19900&country='+country+'&lang='+l+'&flow=prevalidation-20260911';
      }
    }else{
      if(cta){cta.textContent=txt.valid;cta.href='#paiement';}
      if(grid)grid.style.display='grid';
      if(contact)contact.style.display='flex';
      var old=document.getElementById('digiyDossierBeforePay');if(old)old.remove();
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
  stable.src='/digiy-contact-global-stable-20260830.js?v=20260830-stable';
  stable.async=false;
  stable.onload=function(){guardUniqueDakar();fixTarifsPrevalidationFlow();loadHealthDoors();};
  stable.onerror=function(){guardUniqueDakar();fixTarifsPrevalidationFlow();loadHealthDoors();};
  document.head.appendChild(stable);
})();