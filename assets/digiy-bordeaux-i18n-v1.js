/* DIGIYLYFE — Bordeaux i18n relay 20260912
 * Ancien moteur conservé par blob stable ; surcouche doctrine France.
 * Carte gratuite -> fiche à partir de 250 € -> DIGIY PRO 450 €/an.
 * Santé France ajoutée seulement sur bordeaux.html.
 */
(function(){
  'use strict';
  var STABLE='/assets/digiy-bordeaux-i18n-stable-20260901.js?v=20260901-stable';
  var HEALTH='/assets/digiy-vitrine-professional-health-v1.js?v=20260901-france-v2';
  var path=location.pathname.replace(/\/+$/,'');
  var isBordeauxPage=/\/bordeaux\.html$/i.test(path);
  var isBordeauxJoin=/\/adhesion-bordeaux\.html$/i.test(path);
  var isBordeauxDemo=/\/demo-bordeaux\.html$/i.test(path);

  var prices={fr:'450 € / an',en:'€450 / year',es:'450 € / año',pt:'450 € / ano',it:'450 € / anno',de:'450 € / Jahr',nl:'€ 450 / jaar',ar:'450 € / سنة'};
  var creation={fr:'À PARTIR DE 250 €',en:'FROM €250',es:'DESDE 250 €',pt:'A PARTIR DE 250 €',it:'DA 250 €',de:'AB 250 €',nl:'VANAF €250',ar:'ابتداءً من 250 €'};
  var finalCta={
    fr:'REJOINDRE DIGIY BORDEAUX · 450 € / AN →',en:'JOIN DIGIY BORDEAUX · €450 / YEAR →',es:'UNIRSE A DIGIY BORDEAUX · 450 € / AÑO →',pt:'ADERIR AO DIGIY BORDEAUX · 450 € / ANO →',it:'ENTRA IN DIGIY BORDEAUX · 450 € / ANNO →',de:'DIGIY BORDEAUX BEITRETEN · 450 € / JAHR →',nl:'WORD LID VAN DIGIY BORDEAUX · € 450 / JAAR →',ar:'انضم إلى DIGIY BORDEAUX · 450 € سنويًا ←'
  };
  var annualLabel={
    fr:'PAR AN · 1 RÈGLEMENT · 2 MOIS OFFERTS À LA PREMIÈRE ADHÉSION · 0 % COMMISSION',en:'PER YEAR · 1 PAYMENT · 2 FREE MONTHS WITH FIRST MEMBERSHIP · 0% COMMISSION',es:'AL AÑO · 1 PAGO · 2 MESES GRATIS EN LA PRIMERA ADHESIÓN · 0 % COMISIÓN',pt:'POR ANO · 1 PAGAMENTO · 2 MESES GRÁTIS NA PRIMEIRA ADESÃO · 0 % COMISSÃO',it:'ALL’ANNO · 1 PAGAMENTO · 2 MESI GRATIS ALLA PRIMA ADESIONE · 0 % COMMISSIONI',de:'PRO JAHR · 1 ZAHLUNG · 2 MONATE GRATIS BEI DER ERSTEN MITGLIEDSCHAFT · 0 % PROVISION',nl:'PER JAAR · 1 BETALING · 2 MAANDEN GRATIS BIJ DE EERSTE AANSLUITING · 0 % COMMISSIE',ar:'سنويًا · دفعة واحدة · شهران مجانًا عند الاشتراك الأول · 0٪ عمولة'
  };
  var demoAnnualLabel={
    fr:'CRÉATION DE FICHE À PARTIR DE 250 € · DIGIY PRO 450 € / AN',en:'PROFILE CREATION FROM €250 · DIGIY PRO €450 / YEAR',es:'CREACIÓN DE FICHA DESDE 250 € · DIGIY PRO 450 € / AÑO',pt:'CRIAÇÃO DA FICHA A PARTIR DE 250 € · DIGIY PRO 450 € / ANO',it:'CREAZIONE SCHEDA DA 250 € · DIGIY PRO 450 € / ANNO',de:'PROFIL-ERSTELLUNG AB 250 € · DIGIY PRO 450 € / JAHR',nl:'PROFIELCREATIE VANAF €250 · DIGIY PRO €450 / JAAR',ar:'إنشاء الملف ابتداءً من 250 € · DIGIY PRO 450 € سنويًا'
  };
  var flow={
    fr:['Entrez gratuitement. Passez en PRO avec votre fiche professionnelle.','Bordeaux suit la même doctrine France : la carte ouvre le réseau, la fiche est le point d’entrée professionnel et son activation démarre DIGIY PRO.','Carte de visite DIGIY','Votre identité, votre métier, Bordeaux, votre quartier et votre contact direct dans DIGIYLYFE.','Fiche professionnelle','Prestation de création et de personnalisation de votre fiche professionnelle.','DIGIY PRO / an','Accès propriétaire sécurisé, fonctions professionnelles, contact direct et 0 % commission. Deux mois offerts à la première adhésion.','PRÉPARER MA FICHE PROFESSIONNELLE →'],
    en:['Start free. Go PRO with your professional profile.','Bordeaux follows the same France model: the card opens the network, the profile is the professional entry point, and activating it starts DIGIY PRO.','DIGIY business card','Your identity, trade, Bordeaux, neighbourhood and direct contact inside DIGIYLYFE.','Professional profile','Creation and personalization of your professional profile.','DIGIY PRO / year','Secure owner access, professional functions, direct contact and 0% commission. Two months offered on the first membership.','PREPARE MY PROFESSIONAL PROFILE →'],
    es:['Entre gratis. Pase a PRO con su ficha profesional.','Burdeos sigue el mismo modelo Francia: la tarjeta abre la red, la ficha es la entrada profesional y su activación inicia DIGIY PRO.','Tarjeta DIGIY','Su identidad, oficio, Burdeos, barrio y contacto directo dentro de DIGIYLYFE.','Ficha profesional','Creación y personalización de su ficha profesional.','DIGIY PRO / año','Acceso propietario seguro, funciones profesionales, contacto directo y 0 % comisión. Dos meses incluidos en la primera adhesión.','PREPARAR MI FICHA PROFESIONAL →'],
    pt:['Entre grátis. Passe a PRO com a sua ficha profissional.','Bordéus segue o mesmo modelo França: o cartão abre a rede, a ficha é a entrada profissional e a sua ativação inicia o DIGIY PRO.','Cartão DIGIY','A sua identidade, atividade, Bordéus, bairro e contacto direto dentro da DIGIYLYFE.','Ficha profissional','Criação e personalização da sua ficha profissional.','DIGIY PRO / ano','Acesso seguro do proprietário, funções profissionais, contacto direto e 0 % comissão. Dois meses oferecidos na primeira adesão.','PREPARAR A MINHA FICHA PROFISSIONAL →'],
    it:['Entra gratis. Passa a PRO con la tua scheda professionale.','Bordeaux segue lo stesso modello Francia: la carta apre la rete, la scheda è il punto d’ingresso professionale e la sua attivazione avvia DIGIY PRO.','Carta DIGIY','Identità, attività, Bordeaux, quartiere e contatto diretto dentro DIGIYLYFE.','Scheda professionale','Creazione e personalizzazione della scheda professionale.','DIGIY PRO / anno','Accesso proprietario sicuro, funzioni professionali, contatto diretto e 0 % commissioni. Due mesi offerti alla prima adesione.','PREPARA LA MIA SCHEDA PROFESSIONALE →'],
    de:['Kostenlos starten. Mit Ihrem Profiprofil zu PRO wechseln.','Bordeaux folgt demselben Frankreich-Modell: Die Karte öffnet das Netzwerk, das Profil ist der professionelle Einstieg und seine Aktivierung startet DIGIY PRO.','DIGIY Visitenkarte','Ihre Identität, Tätigkeit, Bordeaux, Viertel und direkter Kontakt in DIGIYLYFE.','Profiprofil','Erstellung und Personalisierung Ihres professionellen Profils.','DIGIY PRO / Jahr','Sicherer Eigentümerzugang, Profi-Funktionen, direkter Kontakt und 0 % Provision. Zwei Monate bei der ersten Mitgliedschaft inklusive.','MEIN PROFIPROFIL VORBEREITEN →'],
    nl:['Start gratis. Ga PRO met uw professionele profiel.','Bordeaux volgt hetzelfde Frankrijk-model: de kaart opent het netwerk, het profiel is de professionele toegang en activering start DIGIY PRO.','DIGIY visitekaart','Uw identiteit, beroep, Bordeaux, wijk en direct contact binnen DIGIYLYFE.','Professioneel profiel','Creatie en personalisatie van uw professionele profiel.','DIGIY PRO / jaar','Veilige eigenaarstoegang, professionele functies, direct contact en 0 % commissie. Twee maanden inbegrepen bij de eerste aansluiting.','MIJN PROFESSIONELE PROFIEL VOORBEREIDEN →'],
    ar:['ادخل مجانًا. انتقل إلى PRO عبر ملفك المهني.','تتبع بوردو نفس نموذج فرنسا: البطاقة تفتح الشبكة، والملف هو نقطة الدخول المهنية، وتفعيله يبدأ عضوية DIGIY PRO.','بطاقة DIGIY','هويتك ومهنتك وبوردو وحيّك واتصالك المباشر داخل DIGIYLYFE.','الملف المهني','إنشاء وتخصيص ملفك المهني.','DIGIY PRO / السنة','دخول مالك آمن ووظائف مهنية واتصال مباشر و0٪ عمولة. شهران إضافيان عند أول عضوية.','حضّر ملفي المهني ←']
  };

  function lang(){var l=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();return prices[l]?l:'fr';}
  function prepareHref(l){return '/preparer-ma-carte.html?plan=adherent-19900&country=fr&lang='+l+'&flow=prevalidation-20260911';}
  function patchAnnualPricing(){
    var d=window.DIGIY_BORDEAUX_DATA;
    if(!d)return;
    Object.keys(prices).forEach(function(l){if(d[l]&&d[l].ui)d[l].ui.price=prices[l];});
  }
  function ensureFlow(){
    if(!isBordeauxPage)return;
    var hero=document.querySelector('.hero');if(!hero)return;
    var host=document.getElementById('digiyBordeauxProFlow');
    if(!host){
      var st=document.createElement('style');st.id='digiyBordeauxProFlowStyle';st.textContent='.digiyBordeauxFlow{margin-top:18px;padding:18px;border:1px solid #d6b36a66;border-radius:28px;background:linear-gradient(145deg,#d6b36a12,#ffffff08)}.digiyBordeauxFlow h2{margin:0;font-size:clamp(24px,5vw,36px);line-height:1}.digiyBordeauxFlow>p{margin:8px 0 0;color:var(--soft);font-weight:800;line-height:1.45}.digiyBordeauxSteps{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:14px}.digiyBordeauxStep{padding:16px;border-radius:21px;border:1px solid #ffffff22;background:#ffffff09}.digiyBordeauxStep b{display:block;color:var(--cream);font-size:28px}.digiyBordeauxStep strong{display:block;margin-top:7px;font-size:17px}.digiyBordeauxStep small{display:block;margin-top:6px;color:var(--soft);font-weight:800;line-height:1.45}.digiyBordeauxFlow .btn{margin-top:14px}@media(max-width:760px){.digiyBordeauxSteps{grid-template-columns:1fr}}';document.head.appendChild(st);
      host=document.createElement('section');host.id='digiyBordeauxProFlow';host.className='digiyBordeauxFlow';hero.insertAdjacentElement('afterend',host);
    }
    var l=lang(),x=flow[l];
    host.innerHTML='<h2>'+x[0]+'</h2><p>'+x[1]+'</p><div class="digiyBordeauxSteps"><article class="digiyBordeauxStep"><b>0 €</b><strong>'+x[2]+'</strong><small>'+x[3]+'</small></article><article class="digiyBordeauxStep"><b>'+creation[l]+'</b><strong>'+x[4]+'</strong><small>'+x[5]+'</small></article><article class="digiyBordeauxStep"><b>'+prices[l]+'</b><strong>'+x[6]+'</strong><small>'+x[7]+'</small></article></div><a class="btn primary" href="'+prepareHref(l)+'">'+x[8]+'</a>';
  }
  function patchDom(){
    patchAnnualPricing();
    var l=lang();
    if(isBordeauxPage){
      var hp=document.getElementById('heroPrice');if(hp)hp.textContent=prices[l];
      var pt=document.getElementById('priceTop');if(pt)pt.textContent='DIGIY PRO · BORDEAUX';
      var pl=document.getElementById('priceLead');if(pl)pl.textContent=(l==='fr'?'Fiche professionnelle à partir de 250 € · puis adhésion annuelle.':'Professional profile from €250 · then annual membership.');
      var fb=document.getElementById('finalBtn');if(fb){fb.textContent=flow[l][8];fb.href=prepareHref(l);}
      var jb=document.getElementById('joinBtn');if(jb)jb.href=prepareHref(l);
      var md=document.querySelector('meta[name="description"]');if(md)md.content='DIGIY BORDEAUX : carte DIGIY gratuite, fiche professionnelle à partir de 250 €, DIGIY PRO 450 € par an, contact direct et 0 % commission.';
      ensureFlow();
    }
    if(isBordeauxJoin){
      var p=document.querySelector('.price strong');if(p)p.textContent='450 €';
      var m=document.getElementById('month');if(m)m.textContent=annualLabel[l];
      var pay=document.getElementById('payBtn');if(pay)pay.href='/tarifs-adherents-1.html?country=fr#paiement';
    }
    if(isBordeauxDemo){
      var dp=document.querySelector('.price strong');if(dp)dp.textContent=creation[l];
      var dm=document.getElementById('month');if(dm)dm.textContent=demoAnnualLabel[l];
    }
  }
  function bindDomPatch(){
    patchDom();
    document.addEventListener('click',function(e){if(e.target&&e.target.closest&&e.target.closest('[data-l]'))setTimeout(patchDom,0);},true);
    new MutationObserver(function(){patchDom();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});
  }
  function loadHealth(){
    patchAnnualPricing();
    if(!isBordeauxPage||document.querySelector('script[data-digiy-bordeaux-health]'))return;
    var s=document.createElement('script');s.src=HEALTH;s.async=false;s.setAttribute('data-digiy-bordeaux-health','1');document.head.appendChild(s);
  }
  if(document.readyState==='loading'){
    document.write('<script src="'+STABLE+'"><\/script>');
    patchAnnualPricing();
    if(isBordeauxPage)document.write('<script src="'+HEALTH+'" data-digiy-bordeaux-health="1"><\/script>');
    document.addEventListener('DOMContentLoaded',bindDomPatch,{once:true});
    return;
  }
  try{
    var x=new XMLHttpRequest();x.open('GET',STABLE,false);x.send(null);
    if((x.status>=200&&x.status<300)||x.status===0){(0,eval)(x.responseText);patchAnnualPricing();}else throw new Error('stable '+x.status);
  }catch(e){
    var s=document.createElement('script');s.src=STABLE;s.async=false;s.onload=function(){loadHealth();bindDomPatch();};s.onerror=function(){loadHealth();bindDomPatch();};document.head.appendChild(s);return;
  }
  loadHealth();bindDomPatch();
})();
