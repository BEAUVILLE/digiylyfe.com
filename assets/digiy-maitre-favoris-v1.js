/* DIGIYLYFE — MAÎTRE · POLITIQUE FAVORIS V1
 * Invariants : MON DIGIY, porte LOC, HUB territoires public, guide PWA visible.
 * Maroc : porte nationale Casablanca + Marrakech en phase carte gratuite, sans paiement PRO.
 */
(function(){
  'use strict';
  if(window.DIGIY_MAITRE_FAVORIS_V1) return;

  var policy={
    version:'2026-09-15-maroc-hub-v7',
    required:true,
    symbol:'☆',
    destination:'https://digiylyfe.com/mon-digiy.html',
    cardBridge:'https://digiylyfe.com/assets/digiy-card-favorite-v1.js',
    galleryBridge:'https://digiylyfe.com/assets/digiy-gallery-favorites-v1.js',
    rule:'Aucune carte adhérent publiée sans accès MON DIGIY.',
    kind:'professionnel'
  };

  window.DIGIY_MAITRE_FAVORIS_V1=policy;
  window.DIGIY_MAITRE_RULES=window.DIGIY_MAITRE_RULES||{};
  window.DIGIY_MAITRE_RULES.favoris=policy;

  var pwaNativePromptAvailable=false;
  var pwaTestMode=false;
  try{pwaTestMode=(new URLSearchParams(location.search)).get('pwa-test')==='1';}catch(_){}
  window.addEventListener('beforeinstallprompt',function(){pwaNativePromptAvailable=true;});
  window.addEventListener('appinstalled',function(){pwaNativePromptAvailable=false;});

  try{
    document.documentElement.dataset.digiyMaitreFavoris='required';
    document.documentElement.dataset.digiyMaitreFavorisVersion=policy.version;
    if(pwaTestMode)document.documentElement.dataset.digiyPwaTest='1';
  }catch(_){}

  function homepagePath(){return (location.pathname||'/').replace(/\/index\.html$/,'/');}

  /* Vitrine principale — le client voit les territoires avant le parcours pro. */
  function promoteTerritoryHub(){
    if(homepagePath()!=='/') return;
    var hub=document.getElementById('territoires');
    var publicDoor=document.querySelector('section.section[aria-label="Portes publiques DIGIYLYFE"]');
    if(!hub||!publicDoor) return;
    if(publicDoor.nextElementSibling!==hub) publicDoor.insertAdjacentElement('afterend',hub);
    try{document.documentElement.dataset.digiyTerritoryHubPosition='public-first';}catch(_){}
  }

  /* Maroc — phase température : carte gratuite uniquement, aucun tarif PRO inventé. */
  function installMoroccoHubDoor(){
    if(homepagePath()!=='/') return;
    if(document.getElementById('digiyMoroccoHubDoor')) return;
    var grid=document.querySelector('#territoires .territoryGrid');
    if(!grid) return;

    var COPY={
      fr:{country:'MAROC',title:'DIGIY MAROC',zones:'Casablanca · Marrakech · carte gratuite',cta:'OUVRIR LE MAROC'},
      en:{country:'MOROCCO',title:'DIGIY MOROCCO',zones:'Casablanca · Marrakech · free business card',cta:'OPEN MOROCCO'},
      es:{country:'MARRUECOS',title:'DIGIY MARRUECOS',zones:'Casablanca · Marrakech · tarjeta gratuita',cta:'ABRIR MARRUECOS'},
      pt:{country:'MARROCOS',title:'DIGIY MARROCOS',zones:'Casablanca · Marrakech · cartão gratuito',cta:'ABRIR MARROCOS'},
      it:{country:'MAROCCO',title:'DIGIY MAROCCO',zones:'Casablanca · Marrakech · biglietto gratuito',cta:'APRI IL MAROCCO'},
      de:{country:'MAROKKO',title:'DIGIY MAROKKO',zones:'Casablanca · Marrakesch · kostenlose Karte',cta:'MAROKKO ÖFFNEN'},
      nl:{country:'MAROKKO',title:'DIGIY MAROKKO',zones:'Casablanca · Marrakech · gratis kaart',cta:'OPEN MAROKKO'},
      ar:{country:'المغرب',title:'DIGIY المغرب',zones:'الدار البيضاء · مراكش · بطاقة مهنية مجانية',cta:'افتح المغرب'}
    };

    var style=document.createElement('style');
    style.setAttribute('data-digiy-morocco-hub','1');
    style.textContent='#digiyMoroccoHubDoor{border-color:rgba(246,196,83,.64);background:linear-gradient(180deg,rgba(193,39,45,.15),rgba(0,98,51,.28) 55%,rgba(5,27,20,.98))}#digiyMoroccoHubDoor .digiyMoroccoPhoto{display:grid;place-items:center;background:radial-gradient(circle at 52% 42%,rgba(246,196,83,.20),transparent 27%),linear-gradient(135deg,#c1272d 0 49%,#006233 51% 100%)}#digiyMoroccoHubDoor .digiyMoroccoFlag{position:relative;z-index:2;font-size:82px;filter:drop-shadow(0 12px 22px rgba(0,0,0,.35))}#digiyMoroccoHubDoor .digiyMoroccoCities{position:absolute;left:12px;right:12px;bottom:12px;z-index:3;display:flex;gap:6px;justify-content:center;flex-wrap:wrap}#digiyMoroccoHubDoor .digiyMoroccoCities i{font-style:normal;padding:5px 8px;border-radius:999px;border:1px solid rgba(255,255,255,.33);background:rgba(3,18,13,.72);color:#fffaf0;font-size:9px;font-weight:1000}';
    document.head.appendChild(style);

    var card=document.createElement('a');
    card.id='digiyMoroccoHubDoor';
    card.className='territoryCard';
    card.href='https://digiylyfe.com/maroc.html';
    card.setAttribute('data-fav-id','territoire-maroc');
    card.setAttribute('aria-label','Ouvrir DIGIY Maroc — Casablanca et Marrakech');
    card.innerHTML='<span class="territoryCountry">🇲🇦 <b data-ma-country></b></span><div class="territoryPhoto digiyMoroccoPhoto"><span class="digiyMoroccoFlag" aria-hidden="true">🇲🇦</span><span class="digiyMoroccoCities"><i>CASABLANCA</i><i>MARRAKECH</i></span></div><strong data-ma-title></strong><small data-ma-zones></small><span class="territoryBtn" data-ma-cta></span>';
    grid.appendChild(card);

    function applyLang(){
      var l=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();
      var x=COPY[l]||COPY.fr;
      card.querySelector('[data-ma-country]').textContent=x.country;
      card.querySelector('[data-ma-title]').textContent=x.title;
      card.querySelector('[data-ma-zones]').textContent=x.zones;
      card.querySelector('[data-ma-cta]').textContent=x.cta;
      card.setAttribute('aria-label',x.title+' — Casablanca · Marrakech');
    }
    applyLang();
    try{new MutationObserver(applyLang).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});}catch(_){}
  }

  /* Porte tarifaire LOC — uniquement sur la vitrine principale. */
  function installLocDoor(){
    if(homepagePath()!=='/') return;
    if(document.getElementById('digiyHomeLocDoor')) return;
    var grid=document.querySelector('#digiyEntryChoice .digiyEntryGrid');
    if(!grid) return;

    var TEXT={
      fr:{k:'HÉBERGEMENT · LOC',t:'DIGIY LOC · tarifs par paliers',p:'1–3 unités : 28 000 FCFA / 75 € par mois. Le tarif évolue avec le nombre d’hébergements.',c:'VOIR LES PALIERS LOC →'},
      en:{k:'ACCOMMODATION · LOC',t:'DIGIY LOC · tiered pricing',p:'1–3 units: 28,000 FCFA / €75 per month. Pricing scales with the number of accommodation units.',c:'VIEW LOC TIERS →'},
      es:{k:'ALOJAMIENTO · LOC',t:'DIGIY LOC · tarifas por tramos',p:'1–3 unidades: 28 000 FCFA / 75 € al mes. El precio evoluciona según el número de alojamientos.',c:'VER TRAMOS LOC →'},
      pt:{k:'ALOJAMENTO · LOC',t:'DIGIY LOC · preços por escalões',p:'1–3 unidades: 28 000 FCFA / 75 € por mês. O preço evolui com o número de alojamentos.',c:'VER ESCALÕES LOC →'},
      it:{k:'ALLOGGI · LOC',t:'DIGIY LOC · tariffe a fasce',p:'1–3 unità: 28.000 FCFA / 75 € al mese. Il prezzo cresce con il numero di alloggi.',c:'VEDI LE FASCE LOC →'},
      de:{k:'UNTERKUNFT · LOC',t:'DIGIY LOC · Preisstaffeln',p:'1–3 Einheiten: 28.000 FCFA / 75 € pro Monat. Der Preis richtet sich nach der Zahl der Unterkünfte.',c:'LOC-STAFFELN ANSEHEN →'},
      nl:{k:'ACCOMMODATIE · LOC',t:'DIGIY LOC · prijsstaffels',p:'1–3 eenheden: 28.000 FCFA / €75 per maand. De prijs groeit mee met het aantal accommodaties.',c:'BEKIJK LOC-STAFFELS →'},
      ar:{k:'الإقامة · LOC',t:'DIGIY LOC · أسعار حسب الشرائح',p:'من 1 إلى 3 وحدات: 28 000 فرنك CFA / 75 € شهرياً. يتغير السعر حسب عدد وحدات الإقامة.',c:'عرض شرائح LOC ←'}
    };

    var style=document.createElement('style');
    style.setAttribute('data-digiy-home-loc-door','1');
    style.textContent='#digiyHomeLocDoor{grid-column:1/-1;min-height:150px;border-color:rgba(45,212,191,.58);background:linear-gradient(115deg,rgba(14,116,144,.24),rgba(22,163,74,.16),rgba(246,196,83,.13))}#digiyHomeLocDoor .digiyLocPrice{display:inline-flex;align-self:flex-start;margin:2px 0 1px;padding:6px 9px;border-radius:999px;border:1px solid rgba(246,196,83,.55);background:rgba(246,196,83,.10);color:#fff3cf;font-size:10.5px;font-weight:1000}#digiyHomeLocDoor .digiyEntryCta{background:linear-gradient(135deg,#fff1bd,#f6c453,#22c55e);color:#06140f}';
    document.head.appendChild(style);

    var door=document.createElement('a');
    door.id='digiyHomeLocDoor';
    door.className='digiyEntryDoor pro digiyLocDoor';
    door.href='https://digiylyfe.com/tarifs-loc.html';
    door.setAttribute('data-digiy-loc-entry','1');
    door.innerHTML='<span class="digiyEntryKicker" data-loc-k></span><strong data-loc-t></strong><span class="digiyLocPrice">28 000 FCFA · 75 € / mois · dès 1–3 unités</span><p data-loc-p></p><span class="digiyEntryCta" data-loc-c></span>';
    grid.appendChild(door);

    function applyLang(){
      var l=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();
      var x=TEXT[l]||TEXT.fr;
      door.querySelector('[data-loc-k]').textContent=x.k;
      door.querySelector('[data-loc-t]').textContent=x.t;
      door.querySelector('[data-loc-p]').textContent=x.p;
      door.querySelector('[data-loc-c]').textContent=x.c;
      door.setAttribute('aria-label',x.t+' — '+x.c.replace(/\s*[→←]\s*$/,''));
    }
    applyLang();
    try{new MutationObserver(applyLang).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});}catch(_){}
  }

  /* PWA — réponse visible obligatoire au toucher du bouton. */
  function installPwaVisibleGuide(){
    if(homepagePath()!=='/') return;
    var band=document.getElementById('digiyInstallBand');
    var btn=document.getElementById('digiyInstallBtn');
    var label=document.getElementById('digiyInstallLabel');
    var note=document.getElementById('digiyInstallNote');
    if(!btn||document.getElementById('digiyPwaGuide')) return;

    var ua=navigator.userAgent||'';
    var isIOS=/iPad|iPhone|iPod/i.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
    var isStandalone=(window.matchMedia&&window.matchMedia('(display-mode: standalone)').matches)||navigator.standalone===true;

    if(pwaTestMode){
      if(band)band.hidden=false;
      btn.disabled=false;
      btn.removeAttribute('disabled');
      if(label)label.textContent='MODE TEST PWA · TOUCHER POUR SIMULER';
      if(note)note.textContent='Banc d’essai DIGIYLYFE · aucun nouvel appareil nécessaire.';
    }else if(isStandalone){
      return;
    }

    var COPY={
      fr:{title:'POSER DIGIYLYFE SUR L’ÉCRAN',lead:'Le téléphone ne permet pas toujours au bouton de lancer l’installation tout seul. Fais ces 3 gestes :',s1:'Appuie sur Partager ⬆︎',s2:'Choisis « Ajouter à l’écran d’accueil »',s3:'Appuie sur « Ajouter »',tip:'Si cette option n’apparaît pas, ouvre digiylyfe.com dans Safari puis recommence.',android:'Ouvre le menu du navigateur (⋮ ou Partager), puis choisis « Installer l’application » ou « Ajouter à l’écran d’accueil ».',close:'J’AI COMPRIS'},
      en:{title:'PUT DIGIYLYFE ON YOUR HOME SCREEN',lead:'Your phone may not let this button launch installation directly. Use these 3 steps:',s1:'Tap Share ⬆︎',s2:'Choose “Add to Home Screen”',s3:'Tap “Add”',tip:'If the option is missing, open digiylyfe.com in Safari and try again.',android:'Open the browser menu (⋮ or Share), then choose “Install app” or “Add to Home Screen”.',close:'GOT IT'},
      es:{title:'PONER DIGIYLYFE EN LA PANTALLA',lead:'El teléfono no siempre permite iniciar la instalación directamente. Sigue estos 3 pasos:',s1:'Pulsa Compartir ⬆︎',s2:'Elige «Añadir a pantalla de inicio»',s3:'Pulsa «Añadir»',tip:'Si no aparece la opción, abre digiylyfe.com en Safari y vuelve a intentarlo.',android:'Abre el menú del navegador (⋮ o Compartir) y elige «Instalar aplicación» o «Añadir a pantalla de inicio».',close:'ENTENDIDO'},
      pt:{title:'COLOCAR DIGIYLYFE NO ECRÃ',lead:'O telefone nem sempre permite iniciar a instalação diretamente. Faça estes 3 passos:',s1:'Toque em Partilhar ⬆︎',s2:'Escolha «Adicionar ao ecrã principal»',s3:'Toque em «Adicionar»',tip:'Se a opção não aparecer, abra digiylyfe.com no Safari e tente novamente.',android:'Abra o menu do navegador (⋮ ou Partilhar) e escolha «Instalar aplicação» ou «Adicionar ao ecrã principal».',close:'ENTENDI'},
      it:{title:'METTI DIGIYLYFE SULLA SCHERMATA',lead:'Il telefono non consente sempre al pulsante di avviare direttamente l’installazione. Fai questi 3 passaggi:',s1:'Tocca Condividi ⬆︎',s2:'Scegli «Aggiungi alla schermata Home»',s3:'Tocca «Aggiungi»',tip:'Se l’opzione non appare, apri digiylyfe.com in Safari e riprova.',android:'Apri il menu del browser (⋮ o Condividi), poi scegli «Installa app» o «Aggiungi alla schermata Home».',close:'HO CAPITO'},
      de:{title:'DIGIYLYFE AUF DEN STARTBILDSCHIRM',lead:'Das Telefon kann die Installation nicht immer direkt über diese Taste starten. Gehen Sie so vor:',s1:'Auf Teilen ⬆︎ tippen',s2:'„Zum Home-Bildschirm“ wählen',s3:'Auf „Hinzufügen“ tippen',tip:'Falls die Option fehlt, digiylyfe.com in Safari öffnen und erneut versuchen.',android:'Browsermenü (⋮ oder Teilen) öffnen und „App installieren“ oder „Zum Home-Bildschirm“ wählen.',close:'VERSTANDEN'},
      nl:{title:'DIGIYLYFE OP HET BEGINSCHERM',lead:'De telefoon kan de installatie niet altijd rechtstreeks via deze knop starten. Volg deze 3 stappen:',s1:'Tik op Deel ⬆︎',s2:'Kies «Zet op beginscherm»',s3:'Tik op «Voeg toe»',tip:'Verschijnt de optie niet, open digiylyfe.com in Safari en probeer opnieuw.',android:'Open het browsermenu (⋮ of Deel) en kies «App installeren» of «Zet op beginscherm».',close:'BEGREPEN'},
      ar:{title:'ضع DIGIYLYFE على الشاشة الرئيسية',lead:'قد لا يسمح الهاتف للزر ببدء التثبيت مباشرة. اتبع هذه الخطوات الثلاث:',s1:'اضغط مشاركة ⬆︎',s2:'اختر «إضافة إلى الشاشة الرئيسية»',s3:'اضغط «إضافة»',tip:'إذا لم يظهر الخيار، افتح digiylyfe.com في Safari ثم أعد المحاولة.',android:'افتح قائمة المتصفح (⋮ أو مشاركة) ثم اختر «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية».',close:'فهمت'}
    };

    var style=document.createElement('style');
    style.setAttribute('data-digiy-pwa-guide','1');
    style.textContent='#digiyPwaGuide{position:fixed;inset:0;z-index:2147483600;display:none;align-items:flex-end;justify-content:center;padding:16px;background:rgba(0,0,0,.68);backdrop-filter:blur(7px);-webkit-backdrop-filter:blur(7px)}#digiyPwaGuide.is-open{display:flex}#digiyPwaGuideCard{width:min(100%,520px);padding:20px 18px 18px;border-radius:26px 26px 18px 18px;border:2px solid rgba(246,196,83,.78);background:linear-gradient(160deg,#0b3b2b,#061812 72%);color:#fffaf0;box-shadow:0 24px 70px rgba(0,0,0,.52);text-align:left}#digiyPwaGuideCard h2{margin:0;color:#fff3cf;font-size:21px;line-height:1.08;font-weight:1000}#digiyPwaGuideCard p{margin:9px 0 0;color:rgba(255,250,240,.82);font-size:13px;line-height:1.45;font-weight:850}#digiyPwaSteps{display:grid;gap:8px;margin-top:14px}#digiyPwaSteps div{padding:11px 12px;border-radius:15px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.06);font-size:13px;line-height:1.35;font-weight:1000}#digiyPwaTip{margin-top:12px;padding:10px 11px;border-radius:14px;background:rgba(45,212,191,.09);border:1px solid rgba(45,212,191,.26);color:#dffff8;font-size:11px;line-height:1.4;font-weight:850}#digiyPwaClose{width:100%;min-height:52px;margin-top:14px;border:0;border-radius:999px;background:linear-gradient(135deg,#fff1bd,#f6c453,#22c55e);color:#06140f;font-size:12px;font-weight:1000;cursor:pointer;touch-action:manipulation}html[data-digiy-pwa-test="1"] #digiyInstallBand{outline:2px dashed rgba(45,212,191,.78);outline-offset:3px}';
    document.head.appendChild(style);

    var guide=document.createElement('div');
    guide.id='digiyPwaGuide';
    guide.setAttribute('role','dialog');
    guide.setAttribute('aria-modal','true');
    guide.setAttribute('aria-labelledby','digiyPwaGuideTitle');
    guide.innerHTML='<div id="digiyPwaGuideCard"><h2 id="digiyPwaGuideTitle"></h2><p id="digiyPwaLead"></p><div id="digiyPwaSteps"></div><div id="digiyPwaTip"></div><button type="button" id="digiyPwaClose"></button></div>';
    document.body.appendChild(guide);

    var title=guide.querySelector('#digiyPwaGuideTitle');
    var lead=guide.querySelector('#digiyPwaLead');
    var steps=guide.querySelector('#digiyPwaSteps');
    var tip=guide.querySelector('#digiyPwaTip');
    var close=guide.querySelector('#digiyPwaClose');

    function lang(){var l=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();return COPY[l]?l:'fr';}
    function render(){
      var t=COPY[lang()];
      title.textContent=t.title+(pwaTestMode?' · TEST':'');
      lead.textContent=isIOS?t.lead:t.android;
      steps.style.display=isIOS?'grid':'none';
      steps.innerHTML=isIOS?'<div>1 · '+t.s1+'</div><div>2 · '+t.s2+'</div><div>3 · '+t.s3+'</div>':'';
      tip.style.display=isIOS?'block':'none';
      tip.textContent=t.tip;
      close.textContent=t.close;
    }
    function openGuide(){render();guide.classList.add('is-open');document.documentElement.style.overflow='hidden';setTimeout(function(){try{close.focus()}catch(_){}},0);}
    function closeGuide(){guide.classList.remove('is-open');document.documentElement.style.overflow='';try{btn.focus()}catch(_){};}

    if(pwaTestMode){
      btn.addEventListener('click',function(ev){ev.preventDefault();ev.stopImmediatePropagation();openGuide();},true);
    }else{
      btn.addEventListener('click',function(){
        if(isIOS){openGuide();return;}
        if(pwaNativePromptAvailable)return;
        setTimeout(function(){if(!pwaNativePromptAvailable)openGuide();},120);
      });
    }

    close.addEventListener('click',closeGuide);
    guide.addEventListener('click',function(ev){if(ev.target===guide)closeGuide();});
    document.addEventListener('keydown',function(ev){if(ev.key==='Escape'&&guide.classList.contains('is-open'))closeGuide();});
    try{new MutationObserver(function(){if(guide.classList.contains('is-open'))render();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});}catch(_){}
  }

  function boot(){
    promoteTerritoryHub();
    installMoroccoHubDoor();
    installLocDoor();
    installPwaVisibleGuide();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();

  window.dispatchEvent(new CustomEvent('digiy:maitre:favoris',{detail:policy}));
})();