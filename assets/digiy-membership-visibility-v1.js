/* DIGIYLYFE · Doctrine carte gratuite / adhesion active · 2026-09-17 */
(function(){
  'use strict';
  if(window.DIGIY_MEMBERSHIP_VISIBILITY_20260917)return;
  window.DIGIY_MEMBERSHIP_VISIBILITY_20260917=true;

  var path=(location.pathname||'/').replace(/\/+$/,'')||'/';
  var host=(location.hostname||'').toLowerCase();

  function assign(dst,src){if(!dst||!src)return;Object.keys(src).forEach(function(k){dst[k]=src[k];});}
  function meta(text){var m=document.querySelector('meta[name="description"]');if(m)m.setAttribute('content',text);}

  var cardCopy={
    fr:{kicker:'DIGIY · CARTE PROFESSIONNELLE',lead:'Votre identité professionnelle, votre métier et votre contact direct réunis dans une carte DIGIY que vous pouvez conserver et partager librement.',doctrine:'Carte gratuite · présence DIGIYLYFE activée avec l’adhésion · 0 % commission.',formTitle:'Vos coordonnées pour préparer votre carte gratuite',formLead:'Ces informations nous permettent de vérifier votre activité et de préparer votre carte DIGIY.',consent:'J’accepte que DIGIYLYFE conserve ces informations pour traiter ma demande de carte gratuite et me recontacter au sujet de l’adhésion DIGIYLYFE.',note:'La carte DIGIY est gratuite et partageable. La présence publique dans l’écosystème DIGIYLYFE est réservée aux adhérents actifs.'},
    en:{kicker:'DIGIY · PROFESSIONAL CARD',lead:'Your professional identity, activity and direct contact in a DIGIY card you can keep and share freely.',doctrine:'Free card · DIGIYLYFE presence activated by membership · 0% commission.',formTitle:'Your details to prepare your free card',formLead:'We use this information to verify your activity and prepare your DIGIY card.',consent:'I agree that DIGIYLYFE may keep this information to process my free card request and contact me about DIGIYLYFE membership.',note:'The DIGIY card is free and shareable. Public presence in the DIGIYLYFE ecosystem is reserved for active members.'},
    es:{kicker:'DIGIY · TARJETA PROFESIONAL',lead:'Su identidad profesional, actividad y contacto directo reunidos en una tarjeta DIGIY que puede conservar y compartir libremente.',doctrine:'Tarjeta gratuita · presencia DIGIYLYFE activada con la adhesión · 0 % comisión.',formTitle:'Sus datos para preparar su tarjeta gratuita',formLead:'Estas informaciones nos permiten verificar su actividad y preparar su tarjeta DIGIY.',consent:'Acepto que DIGIYLYFE conserve estos datos para tramitar mi solicitud de tarjeta gratuita y contactarme sobre la adhesión DIGIYLYFE.',note:'La tarjeta DIGIY es gratuita y compartible. La presencia pública en el ecosistema DIGIYLYFE está reservada a los miembros activos.'},
    pt:{kicker:'DIGIY · CARTÃO PROFISSIONAL',lead:'A sua identidade profissional, atividade e contacto direto reunidos num cartão DIGIY que pode guardar e partilhar livremente.',doctrine:'Cartão gratuito · presença DIGIYLYFE ativada com a adesão · 0% comissão.',formTitle:'Os seus dados para preparar o cartão gratuito',formLead:'Estas informações permitem verificar a sua atividade e preparar o seu cartão DIGIY.',consent:'Aceito que a DIGIYLYFE conserve estes dados para tratar o pedido de cartão gratuito e contactar-me sobre a adesão DIGIYLYFE.',note:'O cartão DIGIY é gratuito e partilhável. A presença pública no ecossistema DIGIYLYFE é reservada aos membros ativos.'},
    it:{kicker:'DIGIY · CARTA PROFESSIONALE',lead:'Identità professionale, attività e contatto diretto riuniti in una carta DIGIY che potete conservare e condividere liberamente.',doctrine:'Carta gratuita · presenza DIGIYLYFE attivata con l’adesione · 0% commissioni.',formTitle:'I vostri dati per preparare la carta gratuita',formLead:'Queste informazioni ci permettono di verificare l’attività e preparare la carta DIGIY.',consent:'Accetto che DIGIYLYFE conservi questi dati per gestire la richiesta della carta gratuita e ricontattarmi sull’adesione DIGIYLYFE.',note:'La carta DIGIY è gratuita e condivisibile. La presenza pubblica nell’ecosistema DIGIYLYFE è riservata agli aderenti attivi.'},
    de:{kicker:'DIGIY · PROFI-KARTE',lead:'Ihre berufliche Identität, Tätigkeit und Ihr Direktkontakt in einer DIGIY-Karte, die Sie frei behalten und teilen können.',doctrine:'Kostenlose Karte · DIGIYLYFE-Präsenz mit Mitgliedschaft aktiviert · 0 % Provision.',formTitle:'Ihre Angaben zur Vorbereitung Ihrer kostenlosen Karte',formLead:'Mit diesen Angaben prüfen wir Ihre Tätigkeit und bereiten Ihre DIGIY-Karte vor.',consent:'Ich stimme zu, dass DIGIYLYFE diese Angaben zur Bearbeitung meines kostenlosen Kartenantrags speichert und mich zur DIGIYLYFE-Mitgliedschaft kontaktiert.',note:'Die DIGIY-Karte ist kostenlos und teilbar. Öffentliche Präsenz im DIGIYLYFE-Ökosystem ist aktiven Mitgliedern vorbehalten.'},
    nl:{kicker:'DIGIY · PROFESSIONELE KAART',lead:'Uw professionele identiteit, activiteit en direct contact in een DIGIY-kaart die u vrij kunt bewaren en delen.',doctrine:'Gratis kaart · DIGIYLYFE-aanwezigheid geactiveerd met lidmaatschap · 0% commissie.',formTitle:'Uw gegevens om uw gratis kaart voor te bereiden',formLead:'Met deze gegevens controleren we uw activiteit en bereiden we uw DIGIY-kaart voor.',consent:'Ik ga ermee akkoord dat DIGIYLYFE deze gegevens bewaart om mijn gratis kaartaanvraag te verwerken en mij over het DIGIYLYFE-lidmaatschap te contacteren.',note:'De DIGIY-kaart is gratis en deelbaar. Publieke aanwezigheid in het DIGIYLYFE-ecosysteem is voorbehouden aan actieve leden.'},
    ar:{kicker:'DIGIY · البطاقة المهنية',lead:'هويتك المهنية ونشاطك ووسيلة الاتصال المباشر في بطاقة DIGIY يمكنك الاحتفاظ بها ومشاركتها بحرية.',doctrine:'البطاقة مجانية · حضور DIGIYLYFE يُفعّل بالعضوية · 0٪ عمولة.',formTitle:'بياناتك لإعداد البطاقة المجانية',formLead:'تسمح لنا هذه المعلومات بالتحقق من نشاطك وإعداد بطاقة DIGIY الخاصة بك.',consent:'أوافق على احتفاظ DIGIYLYFE بهذه المعلومات لمعالجة طلب البطاقة المجانية والتواصل معي بخصوص عضوية DIGIYLYFE.',note:'بطاقة DIGIY مجانية وقابلة للمشاركة. الظهور العام داخل منظومة DIGIYLYFE مخصص للأعضاء النشطين.'}
  };

  function patchTariffs(){
    if(!/\/tarifs-adherents-1\.html$/i.test(path))return;
    if(typeof render==='function')render();
  }

  function patchCard(){
    if(!/\/carte-gratuite\.html$/i.test(path))return;
    try{
      if(typeof T!=='undefined')Object.keys(cardCopy).forEach(function(l){if(T[l])assign(T[l],cardCopy[l]);});
      if(typeof setLang==='function'&&typeof lang==='function')setLang(lang());
    }catch(e){}
    meta('Créez gratuitement votre carte DIGIY et partagez-la librement. La présence publique dans l’écosystème DIGIYLYFE est réservée aux adhérents actifs.');
  }

  function replaceExact(oldText,newText){
    document.querySelectorAll('h1,h2,h3,p,span,strong,small').forEach(function(el){if((el.textContent||'').trim()===oldText)el.textContent=newText;});
  }

  function patchFrenchVitrine(){
    if((document.documentElement.lang||'fr').slice(0,2).toLowerCase()!=='fr')return;
    if(host==='digiylyfe.com'&&(path==='/'||/\/index\.html$/i.test(path))){
      replaceExact('Carte digitale · QR permanent · présence territoriale · contact direct · partage · installation sur téléphone · 8 langues.','Carte digitale payante (20 € en France) · QR permanent · contact direct · partage · installation sur téléphone · 8 langues. La présence territoriale DIGIYLYFE est réservée aux adhérents actifs.');
    }
    if(host==='digiy-hub.digiylyfe.com'&&(path==='/'||/\/index\.html$/i.test(path))){
      replaceExact('PREMIÈRE MARCHE · RÉSEAU OUVERT','PREMIÈRE MARCHE · CARTE PAYANTE');
      replaceExact('Entrez dans DIGIYLYFE avec votre identité, votre métier, votre territoire et votre contact direct. Sans publicité · 0 % commission.','Demandez votre carte DIGIY à 20 € en France et partagez-la librement. Pour apparaître dans l’écosystème DIGIYLYFE, activez votre adhésion. 0 % commission.');
    }
  }

  patchTariffs();patchCard();patchFrenchVitrine();
  document.querySelectorAll('[data-l],[data-country]').forEach(function(b){b.addEventListener('click',function(){setTimeout(function(){patchTariffs();patchCard();patchFrenchVitrine();},0);});});
  setTimeout(function(){patchTariffs();patchCard();patchFrenchVitrine();},250);
})();
