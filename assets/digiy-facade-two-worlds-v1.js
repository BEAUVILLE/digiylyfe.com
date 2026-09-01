/* DIGIYLYFE — FAÇADE DEUX MONDES V1 · 2026-09-01
 * Portée : accueil public uniquement (/ ou /index.html).
 * Mission : séparer clairement le parcours public du parcours professionnel.
 * Règle : aucun montant de cotisation visible sur la façade publique.
 * Invariants : pages tarifs, territoires, moteurs, PWA, QR et service worker inchangés.
 */
(function(){
  'use strict';
  if(window.DIGIY_FACADE_TWO_WORLDS_V1)return;
  var path=(location.pathname||'/').replace(/\/+$/,'')||'/';
  if(path!=='/'&&!/\/index\.html$/i.test(path))return;
  window.DIGIY_FACADE_TWO_WORLDS_V1=true;

  var COPY={
    fr:{
      title:'ENTREZ DANS DIGIYLYFE',
      lead:'Deux chemins. Choisissez simplement ce que vous venez faire.',
      publicKicker:'PUBLIC',
      publicTitle:'Je cherche / je découvre',
      publicText:'Territoires, professionnels, services et contact direct.',
      publicCta:'EXPLORER LES TERRITOIRES →',
      proKicker:'PROFESSIONNEL',
      proTitle:'Je suis professionnel',
      proText:'Construisez une présence numérique à votre image et faites-la grandir avec votre activité.',
      proCta:'DÉCOUVRIR L’ADHÉSION →',
      footerPro:'ESPACE PROFESSIONNEL →',
      offerText:'Carte digitale · QR permanent · présence territoriale · contact direct · partage · installation sur téléphone · 8 langues.',
      doctrineTitle:'Votre savoir-faire. Votre identité. Vos objectifs.',
      doctrineText:'DIGIYLYFE vous offre ses ailes pour aller plus loin.'
    },
    en:{
      title:'ENTER DIGIYLYFE',lead:'Two paths. Simply choose what you came to do.',
      publicKicker:'PUBLIC',publicTitle:'I’m searching / discovering',publicText:'Territories, professionals, services and direct contact.',publicCta:'EXPLORE TERRITORIES →',
      proKicker:'PROFESSIONAL',proTitle:'I am a professional',proText:'Build a digital presence that reflects you and let it grow with your activity.',proCta:'DISCOVER MEMBERSHIP →',footerPro:'PROFESSIONAL AREA →',
      offerText:'Digital card · permanent QR · territorial presence · direct contact · sharing · home-screen access · 8 languages.',
      doctrineTitle:'Your know-how. Your identity. Your goals.',doctrineText:'DIGIYLYFE gives you wings to go further.'
    },
    es:{
      title:'ENTRE EN DIGIYLYFE',lead:'Dos caminos. Elija simplemente lo que viene a hacer.',
      publicKicker:'PÚBLICO',publicTitle:'Busco / descubro',publicText:'Territorios, profesionales, servicios y contacto directo.',publicCta:'EXPLORAR LOS TERRITORIOS →',
      proKicker:'PROFESIONAL',proTitle:'Soy profesional',proText:'Construya una presencia digital a su imagen y hágala crecer con su actividad.',proCta:'DESCUBRIR LA ADHESIÓN →',footerPro:'ESPACIO PROFESIONAL →',
      offerText:'Tarjeta digital · QR permanente · presencia territorial · contacto directo · compartir · acceso desde la pantalla de inicio · 8 idiomas.',
      doctrineTitle:'Su saber hacer. Su identidad. Sus objetivos.',doctrineText:'DIGIYLYFE le da alas para llegar más lejos.'
    },
    pt:{
      title:'ENTRE NA DIGIYLYFE',lead:'Dois caminhos. Escolha simplesmente o que veio fazer.',
      publicKicker:'PÚBLICO',publicTitle:'Procuro / descubro',publicText:'Territórios, profissionais, serviços e contacto direto.',publicCta:'EXPLORAR OS TERRITÓRIOS →',
      proKicker:'PROFISSIONAL',proTitle:'Sou profissional',proText:'Construa uma presença digital à sua imagem e faça-a crescer com a sua atividade.',proCta:'DESCOBRIR A ADESÃO →',footerPro:'ESPAÇO PROFISSIONAL →',
      offerText:'Cartão digital · QR permanente · presença territorial · contacto direto · partilha · acesso no ecrã inicial · 8 idiomas.',
      doctrineTitle:'O seu saber-fazer. A sua identidade. Os seus objetivos.',doctrineText:'A DIGIYLYFE dá-lhe asas para ir mais longe.'
    },
    it:{
      title:'ENTRA IN DIGIYLYFE',lead:'Due percorsi. Scegli semplicemente ciò che vuoi fare.',
      publicKicker:'PUBBLICO',publicTitle:'Cerco / scopro',publicText:'Territori, professionisti, servizi e contatto diretto.',publicCta:'ESPLORA I TERRITORI →',
      proKicker:'PROFESSIONISTA',proTitle:'Sono un professionista',proText:'Costruisci una presenza digitale su misura e falla crescere con la tua attività.',proCta:'SCOPRI L’ADESIONE →',footerPro:'AREA PROFESSIONALE →',
      offerText:'Biglietto digitale · QR permanente · presenza territoriale · contatto diretto · condivisione · accesso dalla schermata Home · 8 lingue.',
      doctrineTitle:'Il tuo savoir-faire. La tua identità. I tuoi obiettivi.',doctrineText:'DIGIYLYFE ti dà le ali per andare più lontano.'
    },
    de:{
      title:'DIGIYLYFE BETRETEN',lead:'Zwei Wege. Wählen Sie einfach, was Sie tun möchten.',
      publicKicker:'ÖFFENTLICH',publicTitle:'Ich suche / entdecke',publicText:'Gebiete, Fachleute, Dienstleistungen und direkter Kontakt.',publicCta:'GEBIETE ENTDECKEN →',
      proKicker:'PROFI',proTitle:'Ich bin Profi',proText:'Bauen Sie eine digitale Präsenz auf, die zu Ihnen passt und mit Ihrem Geschäft wächst.',proCta:'MITGLIEDSCHAFT ENTDECKEN →',footerPro:'PROFI-BEREICH →',
      offerText:'Digitale Karte · dauerhafter QR · territoriale Präsenz · direkter Kontakt · Teilen · Zugriff vom Startbildschirm · 8 Sprachen.',
      doctrineTitle:'Ihr Können. Ihre Identität. Ihre Ziele.',doctrineText:'DIGIYLYFE gibt Ihnen Flügel, um weiterzukommen.'
    },
    nl:{
      title:'GA DIGIYLYFE BINNEN',lead:'Twee routes. Kies gewoon waarvoor u komt.',
      publicKicker:'PUBLIEK',publicTitle:'Ik zoek / ontdek',publicText:'Gebieden, professionals, diensten en direct contact.',publicCta:'ONTDEK DE GEBIEDEN →',
      proKicker:'PROFESSIONAL',proTitle:'Ik ben professional',proText:'Bouw een digitale aanwezigheid die bij u past en laat die meegroeien met uw activiteit.',proCta:'ONTDEK HET LIDMAATSCHAP →',footerPro:'PROFESSIONELE RUIMTE →',
      offerText:'Digitale kaart · permanente QR · territoriale aanwezigheid · direct contact · delen · toegang vanaf het beginscherm · 8 talen.',
      doctrineTitle:'Uw vakmanschap. Uw identiteit. Uw doelen.',doctrineText:'DIGIYLYFE geeft u vleugels om verder te gaan.'
    },
    ar:{
      title:'ادخلوا إلى DIGIYLYFE',lead:'مساران واضحان. اختاروا ببساطة ما جئتم من أجله.',
      publicKicker:'للجمهور',publicTitle:'أبحث / أكتشف',publicText:'مناطق ومهنيون وخدمات وتواصل مباشر.',publicCta:'استكشفوا المناطق ←',
      proKicker:'للمهنيين',proTitle:'أنا مهني',proText:'ابنوا حضورًا رقميًا يعكس هويتكم وينمو مع نشاطكم.',proCta:'اكتشفوا العضوية ←',footerPro:'فضاء المهنيين ←',
      offerText:'بطاقة رقمية · رمز QR دائم · حضور محلي · تواصل مباشر · مشاركة · وصول من الشاشة الرئيسية · 8 لغات.',
      doctrineTitle:'مهارتكم. هويتكم. أهدافكم.',doctrineText:'DIGIYLYFE تمنحكم أجنحة للانطلاق أبعد.'
    }
  };

  function currentLang(){
    var h=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();
    if(COPY[h])return h;
    try{var q=(new URLSearchParams(location.search).get('lang')||'').slice(0,2).toLowerCase();if(COPY[q])return q}catch(e){}
    try{var s=(localStorage.getItem('digiy-lang')||'').slice(0,2).toLowerCase();if(COPY[s])return s}catch(e){}
    return 'fr';
  }

  function style(){
    if(document.getElementById('digiyTwoWorldsStyle'))return;
    var s=document.createElement('style');s.id='digiyTwoWorldsStyle';s.textContent='\
      .hero .price{display:none!important}\
      .hero .offer{grid-template-columns:1fr!important}\
      .digiyTwoWorlds{margin:14px 0;padding:16px;border-radius:26px;border:1px solid rgba(246,196,83,.34);background:rgba(255,255,255,.045)}\
      .digiyTwoWorldsHead{text-align:center;margin-bottom:12px}\
      .digiyTwoWorldsHead strong{display:block;font-size:clamp(22px,4.8vw,32px);line-height:1;font-weight:1000;letter-spacing:-.025em}\
      .digiyTwoWorldsHead span{display:block;margin-top:7px;color:rgba(255,250,240,.76);font-size:12px;line-height:1.4;font-weight:850}\
      .digiyTwoWorldsGrid{display:grid;grid-template-columns:1fr 1fr;gap:10px}\
      .digiyWorldDoor{min-height:176px;padding:16px;border-radius:22px;border:1px solid rgba(255,255,255,.14);display:flex;flex-direction:column;gap:7px;box-shadow:0 14px 32px rgba(0,0,0,.18)}\
      .digiyWorldDoor.public{background:linear-gradient(145deg,rgba(14,116,144,.20),rgba(22,163,74,.13))}\
      .digiyWorldDoor.pro{background:linear-gradient(145deg,rgba(246,196,83,.16),rgba(34,197,94,.10))}\
      .digiyWorldKicker{font-size:10px;font-weight:1000;letter-spacing:.10em;color:#fff3cf}\
      .digiyWorldDoor strong{font-size:21px;line-height:1.05;font-weight:1000}\
      .digiyWorldDoor p{margin:0;color:rgba(255,250,240,.76);font-size:11.5px;line-height:1.45;font-weight:850}\
      .digiyWorldCta{margin-top:auto;min-height:46px;padding:10px 13px;border-radius:999px;display:flex;align-items:center;justify-content:center;text-align:center;font-size:10.5px;font-weight:1000;border:1px solid rgba(246,196,83,.55)}\
      .digiyWorldDoor.public .digiyWorldCta{background:rgba(255,255,255,.07);color:#e5fff8}\
      .digiyWorldDoor.pro .digiyWorldCta{background:linear-gradient(135deg,#fff1bd,#f6c453,#22c55e);color:#06140f}\
      @media(max-width:620px){.digiyTwoWorldsGrid{grid-template-columns:1fr}.digiyWorldDoor{min-height:154px}}';
    document.head.appendChild(s);
  }

  function ensureDoors(c){
    var box=document.getElementById('digiyTwoWorlds');
    if(!box){
      box=document.createElement('section');box.id='digiyTwoWorlds';box.className='digiyTwoWorlds';box.setAttribute('aria-label','DIGIYLYFE');
      box.innerHTML='<div class="digiyTwoWorldsHead"><strong data-digiy-world="title"></strong><span data-digiy-world="lead"></span></div><div class="digiyTwoWorldsGrid"><a class="digiyWorldDoor public" href="#territoires"><span class="digiyWorldKicker" data-digiy-world="publicKicker"></span><strong data-digiy-world="publicTitle"></strong><p data-digiy-world="publicText"></p><span class="digiyWorldCta" data-digiy-world="publicCta"></span></a><a class="digiyWorldDoor pro" href="https://digiylyfe.com/tarifs-adherents-1.html"><span class="digiyWorldKicker" data-digiy-world="proKicker"></span><strong data-digiy-world="proTitle"></strong><p data-digiy-world="proText"></p><span class="digiyWorldCta" data-digiy-world="proCta"></span></a></div>';
      var claim=document.querySelector('.brandClaim');
      if(claim&&claim.parentNode)claim.parentNode.insertBefore(box,claim.nextSibling);
      else{var main=document.querySelector('main');if(main)main.insertBefore(box,main.firstChild)}
    }
    Object.keys(c).forEach(function(k){
      box.querySelectorAll('[data-digiy-world="'+k+'"]').forEach(function(el){el.textContent=c[k]});
    });
  }

  function cleanCommercialNoise(c){
    document.querySelectorAll('.hero .price').forEach(function(el){el.setAttribute('aria-hidden','true')});
    document.querySelectorAll('[data-i18n="offerText"]').forEach(function(el){el.textContent=c.offerText});
    document.querySelectorAll('[data-i18n="doctrineTitle"]').forEach(function(el){el.textContent=c.doctrineTitle});
    document.querySelectorAll('[data-i18n="doctrineText"]').forEach(function(el){el.textContent=c.doctrineText});
    document.querySelectorAll('a[href*="tarifs-adherents-1.html"]').forEach(function(a){
      if(a.closest&&a.closest('footer'))a.textContent=c.footerPro;
      else if(a.hasAttribute('data-i18n')||a.classList.contains('cta'))a.textContent=c.proCta;
    });
  }

  function apply(){
    var c=COPY[currentLang()]||COPY.fr;
    style();ensureDoors(c);cleanCommercialNoise(c);
    document.documentElement.setAttribute('data-digiy-facade','two-worlds-v1');
  }

  apply();
  document.addEventListener('click',function(e){
    var b=e.target&&e.target.closest?e.target.closest('.langBtn'):null;
    if(b)setTimeout(apply,0);
  },false);
  try{
    new MutationObserver(function(m){
      for(var i=0;i<m.length;i++)if(m[i].type==='attributes'&&m[i].attributeName==='lang'){setTimeout(apply,0);break;}
    }).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  }catch(e){}
})();
