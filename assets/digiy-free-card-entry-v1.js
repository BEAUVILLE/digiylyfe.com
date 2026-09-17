/* DIGIYLYFE · doctrine réseau/territoires + VA CHEZ DIGIY premium + INTERNATIONAL 24H · 2026-09-17 */
(function(){
  'use strict';
  if(window.DIGIY_FREE_CARD_ENTRY_V1)return;
  window.DIGIY_FREE_CARD_ENTRY_V1=true;

  var LANGS=['fr','en','es','pt','it','de','nl','ar'];
  var STORY_URL='https://vas-chez-digiy.digiylyfe.com/';
  var WORLD_IMAGE='https://digiylyfe.net/wp-content/uploads/2026/09/ChatGPT-Image-17-sept.-2026-21_34_58.png';
  var COPY={
    fr:{mini:'PREMIÈRE MARCHE · RÉSEAU OUVERT',homeTitle:'Votre carte de visite DIGIY est gratuite.',homeText:'Entrez dans DIGIYLYFE avec votre identité, votre métier, votre territoire et votre contact direct. Sans publicité · 0 % commission.',locMini:'AVANT DIGIY LOC · ENTRÉE GRATUITE',locTitle:'Commencez par votre carte DIGIY gratuite.',locText:'Votre carte vous fait entrer dans le réseau. Si la location correspond à votre activité, poursuivez ensuite vers DIGIY LOC et ses outils de réservation directe à 0 % de commission.',cta:'DEMANDER MA CARTE DIGIY GRATUITE →',storyMini:'DIGIY EN ACTION · UNE SOIRÉE À SALY',storyTitle:'Une chambre. Un chauffeur. Un restaurant.',storyText:'Voyez comment le réseau fait circuler le client tout en laissant chaque professionnel indépendant.',storyCta:'▶ VOIR L’HISTOIRE',franceZones:'2 TERRITOIRES OUVERTS · Vallée de la Dordogne · Bordeaux',mobileInstall:'Installer DIGIYLYFE sur ce téléphone'},
    en:{mini:'FIRST STEP · OPEN NETWORK',homeTitle:'Your DIGIY business card is free.',homeText:'Join DIGIYLYFE with your identity, activity, territory and direct contact. No advertising · 0% commission.',locMini:'BEFORE DIGIY LOC · FREE ENTRY',locTitle:'Start with your free DIGIY card.',locText:'Your card gets you into the network. If rentals fit your business, continue with DIGIY LOC and direct-booking tools at 0% commission.',cta:'REQUEST MY FREE DIGIY CARD →',storyMini:'DIGIY IN ACTION · AN EVENING IN SALY',storyTitle:'One room. One driver. One restaurant.',storyText:'See how the network moves the customer while each professional stays independent.',storyCta:'▶ WATCH THE STORY',franceZones:'2 OPEN TERRITORIES · Dordogne Valley · Bordeaux',mobileInstall:'Install DIGIYLYFE on this phone'},
    es:{mini:'PRIMER PASO · RED ABIERTA',homeTitle:'Su tarjeta de visita DIGIY es gratuita.',homeText:'Entre en DIGIYLYFE con su identidad, actividad, territorio y contacto directo. Sin publicidad · 0 % comisión.',locMini:'ANTES DE DIGIY LOC · ENTRADA GRATUITA',locTitle:'Empiece con su tarjeta DIGIY gratuita.',locText:'La tarjeta le permite entrar en la red. Si el alquiler corresponde a su actividad, continúe con DIGIY LOC y sus herramientas de reserva directa con 0 % de comisión.',cta:'SOLICITAR MI TARJETA DIGIY GRATUITA →',storyMini:'DIGIY EN ACCIÓN · UNA NOCHE EN SALY',storyTitle:'Una habitación. Un conductor. Un restaurante.',storyText:'Vea cómo la red hace circular al cliente manteniendo independiente a cada profesional.',storyCta:'▶ VER LA HISTORIA',franceZones:'2 TERRITORIOS ABIERTOS · Valle del Dordoña · Burdeos',mobileInstall:'Instalar DIGIYLYFE en este teléfono'},
    pt:{mini:'PRIMEIRO PASSO · REDE ABERTA',homeTitle:'O seu cartão de visita DIGIY é gratuito.',homeText:'Entre na DIGIYLYFE com identidade, atividade, território e contacto direto. Sem publicidade · 0% comissão.',locMini:'ANTES DO DIGIY LOC · ENTRADA GRATUITA',locTitle:'Comece com o seu cartão DIGIY gratuita.',locText:'O cartão permite entrar na rede. Se o alojamento faz parte da sua atividade, continue para o DIGIY LOC com reserva direta e 0% comissão.',cta:'PEDIR O MEU CARTÃO DIGIY GRATUITO →',storyMini:'DIGIY EM AÇÃO · UMA NOITE EM SALY',storyTitle:'Um quarto. Um motorista. Um restaurante.',storyText:'Veja como a rede faz o cliente circular mantendo cada profissional independente.',storyCta:'▶ VER A HISTÓRIA',franceZones:'2 TERRITÓRIOS ABERTOS · Vale da Dordonha · Bordéus',mobileInstall:'Instalar DIGIYLYFE neste telefone'},
    it:{mini:'PRIMO PASSO · RETE APERTA',homeTitle:'Il vostro biglietto da visita DIGIY è gratuito.',homeText:'Entrate in DIGIYLYFE con identità, attività, territorio e contatto diretto. Nessuna pubblicità · 0% commissioni.',locMini:'PRIMA DI DIGIY LOC · INGRESSO GRATUITO',locTitle:'Iniziate con la vostra carta DIGIY gratuita.',locText:'La carta vi fa entrare nella rete. Se le locazioni fanno parte della vostra attività, proseguite con DIGIY LOC, prenotazione diretta e 0% commissioni.',cta:'RICHIEDI LA MIA CARTA DIGIY GRATUITA →',storyMini:'DIGIY IN AZIONE · UNA SERA A SALY',storyTitle:'Una camera. Un autista. Un ristorante.',storyText:'Scopri come la rete fa circolare il cliente lasciando indipendente ogni professionista.',storyCta:'▶ GUARDA LA STORIA',franceZones:'2 TERRITORI APERTI · Valle della Dordogna · Bordeaux',mobileInstall:'Installa DIGIYLYFE su questo telefono'},
    de:{mini:'ERSTER SCHRITT · OFFENES NETZWERK',homeTitle:'Ihre DIGIY-Visitenkarte ist kostenlos.',homeText:'Starten Sie bei DIGIYLYFE mit Identität, Tätigkeit, Region und direktem Kontakt. Keine Werbung · 0 % Provision.',locMini:'VOR DIGIY LOC · KOSTENLOSER EINSTIEG',locTitle:'Starten Sie mit Ihrer kostenlosen DIGIY-Karte.',locText:'Die Karte bringt Sie ins Netzwerk. Wenn Vermietung zu Ihrem Geschäft gehört, gehen Sie anschließend zu DIGIY LOC mit Direktbuchung und 0 % Provision.',cta:'KOSTENLOSE DIGIY-KARTE ANFORDERN →',storyMini:'DIGIY IN AKTION · EIN ABEND IN SALY',storyTitle:'Ein Zimmer. Ein Fahrer. Ein Restaurant.',storyText:'Sehen Sie, wie das Netzwerk Kunden weiterführt und jeder Profi unabhängig bleibt.',storyCta:'▶ GESCHICHTE ANSEHEN',franceZones:'2 OFFENE GEBIETE · Dordogne-Tal · Bordeaux',mobileInstall:'DIGIYLYFE auf diesem Telefon installieren'},
    nl:{mini:'EERSTE STAP · OPEN NETWERK',homeTitle:'Uw DIGIY-visitekaart is gratis.',homeText:'Kom in DIGIYLYFE met uw identiteit, activiteit, regio en direct contact. Geen reclame · 0% commissie.',locMini:'VÓÓR DIGIY LOC · GRATIS INSTAP',locTitle:'Begin met uw gratis DIGIY-kaart.',locText:'Met de kaart komt u in het netwerk. Past verhuur bij uw activiteit, ga dan verder met DIGIY LOC, directe boekingen en 0% commissie.',cta:'MIJN GRATIS DIGIY-KAART AANVRAGEN →',storyMini:'DIGIY IN ACTIE · EEN AVOND IN SALY',storyTitle:'Een kamer. Een chauffeur. Een restaurant.',storyText:'Bekijk hoe het netwerk de klant laat doorstromen terwijl elke professional onafhankelijk blijft.',storyCta:'▶ BEKIJK HET VERHAAL',franceZones:'2 OPEN GEBIEDEN · Dordognevallei · Bordeaux',mobileInstall:'DIGIYLYFE op deze telefoon installeren'},
    ar:{mini:'الخطوة الأولى · شبكة مفتوحة',homeTitle:'بطاقة DIGIY المهنية مجانية.',homeText:'ادخل شبكة DIGIYLYFE بهويتك المهنية ونشاطك ومنطقتك ووسيلة الاتصال المباشر. بدون إعلانات · عمولة 0٪.',locMini:'قبل DIGIY LOC · دخول مجاني',locTitle:'ابدأ ببطاقة DIGIY المجانية.',locText:'تُدخلك البطاقة إلى الشبكة. وإذا كان التأجير جزءًا من نشاطك، يمكنك بعد ذلك الانتقال إلى DIGIY LOC مع الحجز المباشر وعمولة 0٪.',cta:'اطلب بطاقة DIGIY المجانية ←',storyMini:'DIGIY أثناء العمل · أمسية في سالي',storyTitle:'غرفة. سائق. مطعم.',storyText:'شاهد كيف تنقل الشبكة العميل بين المهنيين مع بقاء كل مهني مستقلاً.',storyCta:'▶ شاهد القصة',franceZones:'منطقتان مفتوحتان · وادي دوردوني · بوردو',mobileInstall:'تثبيت DIGIYLYFE على هذا الهاتف'}
  };
  var WORLD={
    fr:{mini:'DIGIYLYFE INTERNATIONAL',title:'Du local au monde.',lead:'Qu’on te trouve 24h/24.',text:'Une présence professionnelle visible, partageable et accessible à tout moment. QR permanent · carte numérique · contact direct · 0 % commission.'},
    en:{mini:'DIGIYLYFE INTERNATIONAL',title:'From local to global.',lead:'Be found 24/7.',text:'A professional presence that stays visible, shareable and accessible at any time. Permanent QR · digital card · direct contact · 0% commission.'},
    es:{mini:'DIGIYLYFE INTERNACIONAL',title:'De lo local al mundo.',lead:'Que te encuentren 24/7.',text:'Una presencia profesional visible, compartible y accesible en todo momento. QR permanente · tarjeta digital · contacto directo · 0 % comisión.'},
    pt:{mini:'DIGIYLYFE INTERNACIONAL',title:'Do local para o mundo.',lead:'Que te encontrem 24/7.',text:'Uma presença profissional visível, partilhável e acessível a qualquer momento. QR permanente · cartão digital · contacto direto · 0% comissão.'},
    it:{mini:'DIGIYLYFE INTERNATIONAL',title:'Dal locale al mondo.',lead:'Fatti trovare 24/7.',text:'Una presenza professionale visibile, condivisibile e accessibile in ogni momento. QR permanente · carta digitale · contatto diretto · 0% commissioni.'},
    de:{mini:'DIGIYLYFE INTERNATIONAL',title:'Vom Lokalen in die Welt.',lead:'24/7 gefunden werden.',text:'Eine professionelle Präsenz, die jederzeit sichtbar, teilbar und erreichbar bleibt. Permanenter QR · digitale Karte · Direktkontakt · 0 % Provision.'},
    nl:{mini:'DIGIYLYFE INTERNATIONAL',title:'Van lokaal naar wereldwijd.',lead:'24/7 gevonden worden.',text:'Een professionele aanwezigheid die altijd zichtbaar, deelbaar en bereikbaar blijft. Permanente QR · digitale kaart · direct contact · 0% commissie.'},
    ar:{mini:'DIGIYLYFE INTERNATIONAL',title:'من المحلي إلى العالم.',lead:'ليتم العثور عليك 24/7.',text:'حضور مهني مرئي وقابل للمشاركة والوصول في أي وقت. رمز QR دائم · بطاقة رقمية · تواصل مباشر · عمولة 0٪.'}
  };

  function lang(){
    var q='';try{q=(new URLSearchParams(location.search).get('lang')||'').slice(0,2).toLowerCase()}catch(e){}
    var h=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();
    return LANGS.indexOf(q)>=0?q:(LANGS.indexOf(h)>=0?h:'fr');
  }
  function href(l){
    var u=new URL('/carte-gratuite.html',location.origin);u.searchParams.set('lang',l);
    var q=new URLSearchParams(location.search),country=(q.get('country')||'').toLowerCase();
    if(['sn','fr','us'].indexOf(country)>=0)u.searchParams.set('country',country);
    return u.pathname+u.search;
  }
  function isHome(){
    var p=location.pathname.replace(/\/+$/,'')||'/';
    return p==='/'||/\/index\.html$/i.test(p);
  }
  function style(){
    if(document.getElementById('digiyFreeCardEntryStyle'))return;
    var s=document.createElement('style');s.id='digiyFreeCardEntryStyle';
    s.textContent='.digiyFreeCardEntry{margin:0 0 14px;padding:18px;border:2px solid rgba(246,196,83,.72);border-radius:26px;background:linear-gradient(145deg,rgba(246,196,83,.16),rgba(45,212,191,.11),rgba(255,255,255,.045));box-shadow:0 18px 44px rgba(0,0,0,.24);text-align:center;color:#fffaf0}.digiyFreeCardEntry .freeMini,.digiyStoryEntry .storyMini{display:inline-flex;padding:6px 10px;border-radius:999px;border:1px solid rgba(45,212,191,.52);background:rgba(45,212,191,.09);color:#c9fff7;font-size:9.5px;font-weight:1000;letter-spacing:.07em;text-transform:uppercase}.digiyFreeCardEntry h2,.digiyStoryEntry h2{margin:10px auto 0;max-width:760px;font-size:clamp(24px,5vw,36px);line-height:1.03;font-weight:1000;letter-spacing:-.03em}.digiyFreeCardEntry p,.digiyStoryEntry p{margin:9px auto 0;max-width:790px;color:#dce9e3;font-size:12px;line-height:1.5;font-weight:850}.digiyFreeCardEntry .freeCta,.digiyStoryEntry .storyCta{display:flex;align-items:center;justify-content:center;width:min(100%,540px);min-height:56px;margin:14px auto 0;padding:12px 17px;border-radius:999px;background:linear-gradient(135deg,#fff1bd,#f6c453,#22c55e);color:#06140f;border:1px solid rgba(255,241,189,.80);font-size:12px;line-height:1.2;font-weight:1000;box-shadow:0 12px 28px rgba(0,0,0,.24);text-decoration:none}.digiyFreeCardEntry[dir="rtl"],.digiyStoryEntry[dir="rtl"]{direction:rtl}.digiyStoryEntry{position:relative;overflow:hidden;margin:14px 0;padding:22px 18px;border:2px solid rgba(246,196,83,.78);border-radius:28px;background:radial-gradient(540px 240px at 0 0,rgba(246,196,83,.18),transparent 68%),linear-gradient(145deg,rgba(8,73,50,.99),rgba(4,31,24,.99) 64%,rgba(10,76,70,.82));box-shadow:0 22px 52px rgba(0,0,0,.30);text-align:center;color:#fffaf0}.digiyStoryEntry .storyFlow{display:flex;align-items:center;justify-content:center;gap:8px;margin:15px auto 0;flex-wrap:wrap}.digiyStoryEntry .storyNode{min-width:72px;padding:9px 11px;border-radius:16px;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.06);font-size:22px}.digiyStoryEntry .storyArrow{color:#f6c453;font-size:20px;font-weight:1000}@media(max-width:420px){.digiyStoryEntry{padding:18px 12px}.digiyStoryEntry .storyNode{min-width:64px}.digiyStoryEntry .storyFlow{gap:6px}}';
    s.textContent+='.digiyInternational{margin:14px 0;padding:16px;border-radius:28px;border:1px solid rgba(125,211,252,.38);background:linear-gradient(145deg,rgba(7,25,45,.98),rgba(5,45,34,.98));box-shadow:0 20px 48px rgba(0,0,0,.26);color:#fffaf0}.digiyInternationalGrid{display:grid;grid-template-columns:1.2fr .8fr;gap:18px;align-items:center}.digiyInternationalMedia{overflow:hidden;border-radius:22px;border:1px solid rgba(255,255,255,.13);background:#071510}.digiyInternationalMedia img{display:block;width:100%;height:auto;aspect-ratio:16/10;object-fit:cover}.digiyInternationalCopy{text-align:left}.digiyInternationalMini{display:inline-flex;padding:6px 10px;border-radius:999px;border:1px solid rgba(45,212,191,.50);background:rgba(45,212,191,.09);color:#c9fff7;font-size:9.5px;font-weight:1000;letter-spacing:.08em}.digiyInternational h2{margin:10px 0 0;font-size:clamp(28px,5vw,43px);line-height:.98;font-weight:1000;letter-spacing:-.04em}.digiyInternationalLead{margin:9px 0 0;color:#f6c453;font-size:clamp(21px,4vw,31px);line-height:1.05;font-weight:1000}.digiyInternationalText{margin:10px 0 0;color:#dce9e3;font-size:12px;line-height:1.5;font-weight:850}.digiyInternational[dir="rtl"] .digiyInternationalCopy{text-align:right}@media(max-width:720px){.digiyInternational{padding:12px}.digiyInternationalGrid{grid-template-columns:1fr}.digiyInternationalCopy{text-align:center}.digiyInternational[dir="rtl"] .digiyInternationalCopy{text-align:center}.digiyInternationalMedia img{aspect-ratio:4/3}}';
    document.head.appendChild(s);
  }
  function render(box,mode){
    var l=lang(),t=COPY[l]||COPY.fr,loc=mode==='loc';
    box.dir=l==='ar'?'rtl':'ltr';
    box.innerHTML='<span class="freeMini"></span><h2></h2><p></p><a class="freeCta"></a>';
    box.querySelector('.freeMini').textContent=loc?t.locMini:t.mini;
    box.querySelector('h2').textContent=loc?t.locTitle:t.homeTitle;
    box.querySelector('p').textContent=loc?t.locText:t.homeText;
    var a=box.querySelector('a');a.textContent=t.cta;a.href=href(l);
  }
  function renderStory(box){
    var l=lang(),t=COPY[l]||COPY.fr;
    box.dir=l==='ar'?'rtl':'ltr';
    box.innerHTML='<span class="storyMini"></span><h2></h2><div class="storyFlow" aria-hidden="true"><span class="storyNode">🏠</span><span class="storyArrow">→</span><span class="storyNode">🚗</span><span class="storyArrow">→</span><span class="storyNode">🍽️</span></div><p></p><a class="storyCta" target="_blank" rel="noopener noreferrer"></a>';
    box.querySelector('.storyMini').textContent=t.storyMini;
    box.querySelector('h2').textContent=t.storyTitle;
    box.querySelector('p').textContent=t.storyText;
    var a=box.querySelector('a');a.textContent=t.storyCta;a.href=STORY_URL;
  }
  function renderWorld(box){
    var l=lang(),t=WORLD[l]||WORLD.fr;
    box.dir=l==='ar'?'rtl':'ltr';
    box.innerHTML='<div class="digiyInternationalGrid"><div class="digiyInternationalMedia"><img alt="DIGIYLYFE International · visibilité professionnelle 24h/24" loading="lazy" decoding="async"></div><div class="digiyInternationalCopy"><span class="digiyInternationalMini"></span><h2></h2><p class="digiyInternationalLead"></p><p class="digiyInternationalText"></p></div></div>';
    box.querySelector('img').src=WORLD_IMAGE;
    box.querySelector('.digiyInternationalMini').textContent=t.mini;
    box.querySelector('h2').textContent=t.title;
    box.querySelector('.digiyInternationalLead').textContent=t.lead;
    box.querySelector('.digiyInternationalText').textContent=t.text;
  }
  function mount(){
    var p=location.pathname.replace(/\/+$/,'')||'/';
    var mode=(/\/tarifs-loc\.html$/i.test(p))?'loc':((p==='/'||/\/index\.html$/i.test(p))?'home':'');
    if(!mode||document.getElementById('digiyFreeCardEntry'))return;
    style();
    var box=document.createElement('section');box.id='digiyFreeCardEntry';box.className='digiyFreeCardEntry';box.setAttribute('data-digiy-free-card-entry','1');
    var anchor=mode==='loc'?document.querySelector('.langs'):document.getElementById('digiyInstallBand');
    if(anchor)anchor.insertAdjacentElement('afterend',box);else{var m=document.querySelector('main');if(m)m.insertAdjacentElement('afterbegin',box);else document.body.insertAdjacentElement('afterbegin',box)}
    render(box,mode);
    var selector=mode==='loc'?'.lang':'.langBtn';
    document.querySelectorAll(selector).forEach(function(b){b.addEventListener('click',function(){setTimeout(function(){render(box,mode);refreshFacadeText()},20)})});
  }
  function mountStory(){
    if(!isHome()||document.getElementById('digiyStoryEntry'))return;
    style();
    var box=document.createElement('section');box.id='digiyStoryEntry';box.className='digiyStoryEntry';box.setAttribute('data-digiy-story-entry','1');box.setAttribute('aria-label','VA CHEZ DIGIY');
    var anchor=document.querySelector('.fullStackIntro')||document.querySelector('.languageStrip');
    if(anchor)anchor.insertAdjacentElement('afterend',box);else{var m=document.querySelector('main');if(m)m.insertAdjacentElement('afterbegin',box)}
    renderStory(box);
    document.querySelectorAll('.langBtn').forEach(function(b){b.addEventListener('click',function(){setTimeout(function(){renderStory(box);refreshFacadeText()},20)})});
  }
  function mountWorld(){
    if(!isHome()||document.getElementById('digiyInternational'))return;
    style();
    var box=document.createElement('section');box.id='digiyInternational';box.className='digiyInternational';box.setAttribute('aria-label','DIGIYLYFE International · 24h/24');
    var anchor=document.querySelector('.brandClaim');
    if(anchor)anchor.insertAdjacentElement('beforebegin',box);else{var territories=document.getElementById('territoires')||document.querySelector('.worldHub');if(territories)territories.insertAdjacentElement('afterend',box)}
    renderWorld(box);
    document.querySelectorAll('.langBtn').forEach(function(b){b.addEventListener('click',function(){setTimeout(function(){renderWorld(box)},20)})});
  }
  function refreshFacadeText(){
    if(!isHome())return;
    var t=COPY[lang()]||COPY.fr;
    document.querySelectorAll('[data-i18n="franceZones"]').forEach(function(el){el.textContent=t.franceZones});
    var coarse=(window.matchMedia&&matchMedia('(pointer:coarse)').matches)||navigator.maxTouchPoints>0||innerWidth<=820;
    if(coarse){
      var lab=document.getElementById('digiyInstallLabel');
      if(lab)lab.textContent=t.mobileInstall;
    }
  }
  function arrangeDoctrine(){
    if(!isHome())return;
    document.documentElement.classList.remove('digiyFacadeSimple');
    var promise=document.querySelector('.fullStackIntro');
    if(!promise)return;
    var order=[
      document.getElementById('digiyStoryEntry'),
      document.getElementById('territoires')||document.querySelector('.worldHub'),
      document.getElementById('digiyInternational'),
      document.querySelector('.brandClaim'),
      document.getElementById('digiyEntryChoice'),
      document.getElementById('digiyFreeCardEntry'),
      document.getElementById('digiyCampus'),
      document.querySelector('.ownerModules'),
      document.querySelector('.section[aria-label="Portes publiques DIGIYLYFE"]'),
      document.querySelector('.section[aria-label="Preuves terrain DIGIYLYFE"]'),
      document.querySelector('.hero[aria-label="Présence numérique DIGIYLYFE"]'),
      document.getElementById('digiyInstallBand'),
      document.getElementById('digiyFavorisBar'),
      document.querySelector('.digiyCardSection'),
      document.querySelector('.footer')
    ];
    var anchor=promise;
    order.forEach(function(el){
      if(el&&el!==anchor){anchor.insertAdjacentElement('afterend',el);anchor=el;}
    });
    refreshFacadeText();
    setTimeout(refreshFacadeText,80);
  }
  function boot(){mount();mountStory();mountWorld();arrangeDoctrine();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();