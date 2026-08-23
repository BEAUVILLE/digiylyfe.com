/* DIGIYLYFE — Contact commercial global
 * Source unique : contact@digiylyfe.com
 * Rôle : afficher l'adresse professionnelle officielle sur les pages publiques.
 * Navigation : le HUB reste à l'atelier ; son ancien lien générique de footer est retiré.
 * Parcours adhésion : les deux pages adhérent ouvrent le même dossier d’adhésion avec le bon forfait.
 * Vitrine : les cartes adhérents réellement publiées sont ajoutées automatiquement sans modifier les pionniers historiques.
 */
(function(){
  'use strict';

  var EMAIL='contact@digiylyfe.com';
  var MAILTO='mailto:'+EMAIL;
  var PUBLIC_CARDS_API='https://wesqmwjjtsefyjnluosj.supabase.co/functions/v1/digiy-card-public?asset=list';

  function cleanLegacyHubFooter(){
    document.querySelectorAll('footer a[data-i18n="footerHub"][href^="https://digiy-hub.digiylyfe.com/"]').forEach(function(a){
      var prev=a.previousSibling;
      if(prev && prev.nodeType===3) prev.textContent=prev.textContent.replace(/\s*·\s*$/,'');
      a.remove();
    });
  }

  function repairPublicDoors(){
    var grid=document.querySelector('.publicGrid');
    if(!grid) return;

    var humanCopy={
      fr:'Gratuit · activités · cercles · liens locaux',
      en:'Free · activities · circles · local connections',
      es:'Gratis · actividades · círculos · vínculos locales',
      pt:'Gratuito · atividades · círculos · ligações locais',
      it:'Gratuito · attività · cerchie · legami locali',
      de:'Kostenlos · Aktivitäten · Kreise · lokale Kontakte',
      nl:'Gratis · activiteiten · kringen · lokale contacten',
      ar:'مجاني · أنشطة · دوائر · روابط محلية'
    };

    function applyHumanDoor(){
      var human=grid.querySelector('a.publicCard[href="https://rencontre.digiylyfe.com/"]');
      if(!human) return;
      var lang=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();
      human.classList.add('rencontreCard');
      human.innerHTML='<i aria-hidden="true">🪑</i><strong>HUMAIN DU TERRITOIRE</strong><small>'+((humanCopy[lang])||humanCopy.fr)+'</small>';
    }

    applyHumanDoor();
    new MutationObserver(applyHumanDoor).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});

    var market=grid.querySelector('a.publicCard[href="https://market.digiylyfe.com/"]');
    var commerce=grid.querySelector('a.publicCard[href="https://mon-commerce.digiylyfe.com/"]');
    if(market && !commerce){
      market.href='https://mon-commerce.digiylyfe.com/';
      market.innerHTML='<i aria-hidden="true">🏪</i><strong>MON COMMERCE</strong><small data-i18n="marketText">Boutiques et produits</small>';
      commerce=market;
    }else if(market && commerce){
      market.remove();
    }

    if(!grid.querySelector('a.publicCard[href="https://resto.digiylyfe.com/"]')){
      var resa=grid.querySelector('a.publicCard[href="https://resa-table-resto.digiylyfe.com/"]');
      var resto=document.createElement('a');
      resto.className='publicCard';
      resto.href='https://resto.digiylyfe.com/';
      resto.innerHTML='<i aria-hidden="true">🍽️</i><strong>RESTO</strong><small data-i18n="resaText">Réservations directes</small>';
      if(resa && resa.nextSibling) grid.insertBefore(resto,resa.nextSibling);
      else grid.appendChild(resto);
    }
  }

  function renameWorldHub(){
    var section=document.querySelector('.worldHub');
    if(!section) return;

    var copy={
      fr:{title:'DIGIYLYFE · DU LOCAL AU MONDE',lead:'Un même CORE. Des territoires différents. Le professionnel reste local.',intro:'Deux portes réelles montrent l’ouverture de DIGIYLYFE : Sénégal · Petite Côte et France · Périgord · Vallée de la Dordogne. Choisissez votre territoire, puis votre besoin et votre zone.',path:'Pays → Territoire → Zone → Besoin → Professionnel → OUVRIR',dordogneTitle:'DIGIY PÉRIGORD · VALLÉE DE LA DORDOGNE',dordogneZones:'Sarlat-la-Canéda · Périgord · Vallée de la Dordogne',aria:'DIGIYLYFE du local au monde'},
      en:{title:'DIGIYLYFE · FROM LOCAL TO THE WORLD',lead:'One CORE. Different territories. The professional stays local.',intro:'Two real doors show DIGIYLYFE’s reach: Senegal · Petite Côte and France · Périgord · Dordogne Valley. Choose your territory, then your need and local area.',path:'Country → Territory → Area → Need → Professional → OPEN',dordogneTitle:'DIGIY PÉRIGORD · DORDOGNE VALLEY',dordogneZones:'Sarlat-la-Canéda · Périgord · Dordogne Valley',aria:'DIGIYLYFE from local to the world'},
      es:{title:'DIGIYLYFE · DE LO LOCAL AL MUNDO',lead:'Un mismo CORE. Territorios diferentes. El profesional sigue siendo local.',intro:'Dos puertas reales muestran la apertura de DIGIYLYFE: Senegal · Petite Côte y Francia · Périgord · Valle del Dordoña. Elija su territorio, después su necesidad y su zona.',path:'País → Territorio → Zona → Necesidad → Profesional → ABRIR',dordogneTitle:'DIGIY PÉRIGORD · VALLE DEL DORDOÑA',dordogneZones:'Sarlat-la-Canéda · Périgord · Valle del Dordoña',aria:'DIGIYLYFE de lo local al mundo'},
      pt:{title:'DIGIYLYFE · DO LOCAL AO MUNDO',lead:'Um único CORE. Territórios diferentes. O profissional permanece local.',intro:'Duas portas reais mostram a abertura da DIGIYLYFE: Senegal · Petite Côte e França · Périgord · Vale da Dordogne. Escolha o território, depois a necessidade e a zona.',path:'País → Território → Zona → Necessidade → Profissional → ABRIR',dordogneTitle:'DIGIY PÉRIGORD · VALE DA DORDOGNE',dordogneZones:'Sarlat-la-Canéda · Périgord · Vale da Dordogne',aria:'DIGIYLYFE do local ao mundo'},
      it:{title:'DIGIYLYFE · DAL LOCALE AL MONDO',lead:'Un solo CORE. Territori diversi. Il professionista resta locale.',intro:'Due porte reali mostrano l’apertura di DIGIYLYFE: Senegal · Petite Côte e Francia · Périgord · Valle della Dordogna. Scegli il territorio, poi il bisogno e la zona.',path:'Paese → Territorio → Zona → Bisogno → Professionista → APRI',dordogneTitle:'DIGIY PÉRIGORD · VALLE DELLA DORDOGNA',dordogneZones:'Sarlat-la-Canéda · Périgord · Valle della Dordogna',aria:'DIGIYLYFE dal locale al mondo'},
      de:{title:'DIGIYLYFE · VOM LOKALEN IN DIE WELT',lead:'Ein CORE. Unterschiedliche Gebiete. Der Profi bleibt lokal.',intro:'Zwei reale Türen zeigen die Öffnung von DIGIYLYFE: Senegal · Petite Côte und Frankreich · Périgord · Dordogne-Tal. Wählen Sie zuerst das Gebiet, dann Bedarf und Zone.',path:'Land → Gebiet → Zone → Bedarf → Profi → ÖFFNEN',dordogneTitle:'DIGIY PÉRIGORD · DORDOGNE-TAL',dordogneZones:'Sarlat-la-Canéda · Périgord · Dordogne-Tal',aria:'DIGIYLYFE vom Lokalen in die Welt'},
      nl:{title:'DIGIYLYFE · VAN LOKAAL NAAR DE WERELD',lead:'Eén CORE. Verschillende gebieden. De professional blijft lokaal.',intro:'Twee echte ingangen tonen de internationale opening van DIGIYLYFE: Senegal · Petite Côte en Frankrijk · Périgord · Dordognevallei. Kies uw gebied, daarna uw behoefte en zone.',path:'Land → Gebied → Zone → Behoefte → Professional → OPENEN',dordogneTitle:'DIGIY PÉRIGORD · DORDOGNEVALLEI',dordogneZones:'Sarlat-la-Canéda · Périgord · Dordognevallei',aria:'DIGIYLYFE van lokaal naar de wereld'},
      ar:{title:'DIGIYLYFE · من المحلي إلى العالم',lead:'CORE واحد. مناطق مختلفة. والمهني يبقى محليًا.',intro:'بابان حقيقيان يبرزان انفتاح DIGIYLYFE: السنغال · Petite Côte وفرنسا · Périgord · وادي دوردوني. اختر الإقليم ثم حاجتك والمنطقة المحلية.',path:'البلد ← الإقليم ← المنطقة ← الحاجة ← المهني ← فتح',dordogneTitle:'DIGIY PÉRIGORD · وادي دوردوني',dordogneZones:'Sarlat-la-Canéda · Périgord · وادي دوردوني',aria:'DIGIYLYFE من المحلي إلى العالم'}
    };

    function apply(){
      var lang=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();
      var t=copy[lang]||copy.fr;
      var title=section.querySelector('[data-i18n="worldTitle"]');
      var lead=section.querySelector('[data-i18n="worldLead"]');
      var intro=section.querySelector('[data-i18n="worldIntro"]');
      var path=section.querySelector('[data-i18n="worldPath"]');
      var dordogneTitle=section.querySelector('[data-i18n="dordogneTitle"]');
      var dordogneZones=section.querySelector('[data-i18n="dordogneZones"]');
      if(title) title.textContent=t.title;
      if(lead) lead.textContent=t.lead;
      if(intro) intro.textContent=t.intro;
      if(path) path.textContent=t.path;
      if(dordogneTitle) dordogneTitle.textContent=t.dordogneTitle;
      if(dordogneZones) dordogneZones.textContent=t.dordogneZones;
      section.id='territoires';
      section.setAttribute('aria-label',t.aria);

      var hero=document.querySelector('section.hero');
      if(hero && hero.nextElementSibling!==section) hero.insertAdjacentElement('afterend',section);
    }

    apply();
    new MutationObserver(apply).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});
  }

  function installMembershipSiteBack(){
    var file=(location.pathname.split('/').pop()||'').toLowerCase();
    if(file!=='tarifs-adherents.html' && file!=='tarifs-adherents-1.html') return;
    if(document.querySelector('[data-digiy-membership-back]')) return;

    var main=document.querySelector('main.wrap')||document.querySelector('main')||document.body;
    var labels={
      fr:'← Retour au site DIGIYLYFE',
      en:'← Back to DIGIYLYFE website',
      es:'← Volver al sitio DIGIYLYFE',
      pt:'← Voltar ao site DIGIYLYFE',
      it:'← Torna al sito DIGIYLYFE',
      de:'← Zurück zur DIGIYLYFE-Website',
      nl:'← Terug naar de DIGIYLYFE-site',
      ar:'العودة إلى موقع DIGIYLYFE →'
    };

    var link=document.createElement('a');
    link.href='https://digiylyfe.com/';
    link.setAttribute('data-digiy-membership-back','1');
    link.style.cssText='display:flex;width:fit-content;max-width:100%;min-height:44px;align-items:center;justify-content:center;margin:0 auto 12px;padding:9px 14px;border:1px solid rgba(246,196,83,.72);border-radius:999px;background:rgba(246,196,83,.10);color:#ffe9a8;font-size:13px;font-weight:1000;text-decoration:none;text-align:center;box-shadow:0 8px 24px rgba(0,0,0,.18)';

    function refresh(){
      var lang=(document.documentElement.lang||localStorage.getItem('digiy_lang')||'fr').slice(0,2).toLowerCase();
      link.textContent=labels[lang]||labels.fr;
      link.setAttribute('aria-label',labels[lang]||labels.fr);
    }

    refresh();
    new MutationObserver(refresh).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});
    main.insertBefore(link,main.firstChild);
  }

  function installOfferDemos(){
    var file=(location.pathname.split('/').pop()||'').toLowerCase();
    if(file!=='tarifs-adherents.html' && file!=='tarifs-adherents-1.html') return;
    if(document.querySelector('[data-digiy-offer-demos]')) return;

    var labels={
      fr:{card:'👁 VOIR UNE CARTE',sheet:'👁 VOIR UNE FICHE',site:'👁 VOIR UN SITE'},
      en:{card:'👁 VIEW A CARD',sheet:'👁 VIEW A PROFILE',site:'👁 VIEW A WEBSITE'},
      es:{card:'👁 VER UNA TARJETA',sheet:'👁 VER UNA FICHA',site:'👁 VER UN SITIO'},
      pt:{card:'👁 VER UM CARTÃO',sheet:'👁 VER UMA FICHA',site:'👁 VER UM SITE'},
      it:{card:'👁 VEDI UNA CARD',sheet:'👁 VEDI UNA SCHEDA',site:'👁 VEDI UN SITO'},
      de:{card:'👁 KARTE ANSEHEN',sheet:'👁 PROFIL ANSEHEN',site:'👁 WEBSITE ANSEHEN'},
      nl:{card:'👁 KAART BEKIJKEN',sheet:'👁 FICHE BEKIJKEN',site:'👁 WEBSITE BEKIJKEN'},
      ar:{card:'👁 عرض بطاقة',sheet:'👁 عرض ملف مهني',site:'👁 عرض موقع'}
    };

    var demos=[
      {key:'card',after:'memberText',url:'https://digiylyfe.net/wp-content/uploads/2026/08/ChatGPT-Image-18-aout-2026-01_14_59-1.png'},
      {key:'sheet',after:'sheetText',url:'https://master-site-digiylyfe.digiylyfe.com/demo-fiche-001/'},
      {key:'site',after:'siteText',url:'https://master-site-digiylyfe.digiylyfe.com/demo-babacar-001/'}
    ];

    var marker=document.createElement('span');
    marker.setAttribute('data-digiy-offer-demos','1');
    marker.hidden=true;
    document.body.appendChild(marker);

    demos.forEach(function(demo){
      var after=document.getElementById(demo.after);
      if(!after) return;
      var a=document.createElement('a');
      a.href=demo.url;
      a.target='_blank';
      a.rel='noopener noreferrer';
      a.setAttribute('data-digiy-offer-demo',demo.key);
      a.style.cssText='display:flex;min-height:48px;align-items:center;justify-content:center;margin:0 0 10px;padding:10px 14px;border:2px solid rgba(246,196,83,.72);border-radius:999px;background:linear-gradient(135deg,rgba(246,196,83,.14),rgba(45,212,191,.10));color:#ffe9a8;font-size:13px;font-weight:1000;text-decoration:none;text-align:center;letter-spacing:.02em';
      after.insertAdjacentElement('afterend',a);
    });

    function refresh(){
      var lang=(document.documentElement.lang||localStorage.getItem('digiy_lang')||'fr').slice(0,2).toLowerCase();
      var t=labels[lang]||labels.fr;
      document.querySelectorAll('[data-digiy-offer-demo]').forEach(function(a){
        var key=a.getAttribute('data-digiy-offer-demo');
        a.textContent=t[key]||labels.fr[key];
        a.setAttribute('aria-label',t[key]||labels.fr[key]);
      });
    }

    refresh();
    new MutationObserver(refresh).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});
    window.addEventListener('storage',refresh);
  }

  function installSitePricingTiers(){
    var file=(location.pathname.split('/').pop()||'').toLowerCase();
    if(file!=='tarifs-adherents.html' && file!=='tarifs-adherents-1.html') return;

    var siteTitle=document.getElementById('site');
    var siteCard=siteTitle && siteTitle.closest('.card');
    if(!siteCard || siteCard.querySelector('[data-digiy-site-tiers]')) return;

    var sitePrice=document.getElementById('sitePrice');
    var siteText=document.getElementById('siteText');
    var siteItems=document.getElementById('siteItems');
    if(sitePrice) sitePrice.style.display='none';
    if(siteItems) siteItems.style.display='none';

    var oldDemo=document.querySelector('[data-digiy-offer-demo="site"]');
    if(oldDemo) oldDemo.remove();

    var copy={
      fr:{title:'NOTORIÉTÉ · SITE PROFESSIONNEL DIGIYLYFE',intro:'Deux niveaux clairs. Vous voyez un exemple avant de choisir et le montant final est accepté avant règlement.',premium:'PREMIUM',premiumPrice:'SÉNÉGAL · À PARTIR DE 250 000 FCFA · EUROPE · À PARTIR DE 480 €',premiumText:'Une présence professionnelle complète : adaptation du MASTER au métier, identité, mobile, PWA, 8 langues, contact direct et fonctions prévues dans le MASTER choisi.',premiumDemo:'👁 VOIR UN SITE PREMIUM · BABACAR',extra:'EXTRA',extraPrice:'SÉNÉGAL · À PARTIR DE 450 000 FCFA · EUROPE · À PARTIR DE 800 €',extraText:'Pour une réalisation plus riche : davantage de contenus, personnalisation avancée, galeries importantes, fonctions propriétaires ou intégrations spécifiques.',extraDemo:'👁 VOIR UN SITE EXTRA · ASTOU BOUTIQUE',note:'Les prix sont indiqués « à partir de ». Le montant final dépend du contenu et des besoins du projet. Il est présenté et accepté avant règlement. L’adhésion DIGIYLYFE est distincte de la création du site.'},
      en:{title:'RECOGNITION · DIGIYLYFE PROFESSIONAL WEBSITE',intro:'Two clear levels. You can view an example before choosing, and the final amount is agreed before payment.',premium:'PREMIUM',premiumPrice:'SENEGAL · FROM 250,000 FCFA · EUROPE · FROM €480',premiumText:'A complete professional presence: MASTER adaptation to the business, identity, mobile, PWA, 8 languages, direct contact and the functions included in the selected MASTER.',premiumDemo:'👁 VIEW A PREMIUM WEBSITE · BABACAR',extra:'EXTRA',extraPrice:'SENEGAL · FROM 450,000 FCFA · EUROPE · FROM €800',extraText:'For a richer build: more content, advanced customization, larger galleries, owner functions or specific integrations.',extraDemo:'👁 VIEW AN EXTRA WEBSITE · ASTOU BOUTIQUE',note:'Prices are starting prices. The final amount depends on the project content and needs. It is presented and accepted before payment. DIGIYLYFE membership is separate from website creation.'},
      es:{title:'NOTORIEDAD · SITIO PROFESIONAL DIGIYLYFE',intro:'Dos niveles claros. Puede ver un ejemplo antes de elegir y el importe final se acepta antes del pago.',premium:'PREMIUM',premiumPrice:'SENEGAL · DESDE 250.000 FCFA · EUROPA · DESDE 480 €',premiumText:'Una presencia profesional completa: adaptación del MASTER al oficio, identidad, móvil, PWA, 8 idiomas, contacto directo y funciones previstas en el MASTER elegido.',premiumDemo:'👁 VER UN SITIO PREMIUM · BABACAR',extra:'EXTRA',extraPrice:'SENEGAL · DESDE 450.000 FCFA · EUROPA · DESDE 800 €',extraText:'Para una realización más rica: más contenidos, personalización avanzada, galerías importantes, funciones del propietario o integraciones específicas.',extraDemo:'👁 VER UN SITIO EXTRA · ASTOU BOUTIQUE',note:'Los precios se indican « desde ». El importe final depende del contenido y de las necesidades del proyecto. Se presenta y acepta antes del pago. La adhesión DIGIYLYFE es independiente de la creación del sitio.'},
      pt:{title:'NOTORIEDADE · SITE PROFISSIONAL DIGIYLYFE',intro:'Dois níveis claros. Pode ver um exemplo antes de escolher e o valor final é aceite antes do pagamento.',premium:'PREMIUM',premiumPrice:'SENEGAL · A PARTIR DE 250 000 FCFA · EUROPA · A PARTIR DE 480 €',premiumText:'Uma presença profissional completa: adaptação do MASTER ao negócio, identidade, mobile, PWA, 8 idiomas, contacto direto e funções previstas no MASTER escolhido.',premiumDemo:'👁 VER UM SITE PREMIUM · BABACAR',extra:'EXTRA',extraPrice:'SENEGAL · A PARTIR DE 450 000 FCFA · EUROPA · A PARTIR DE 800 €',extraText:'Para uma realização mais rica: mais conteúdos, personalização avançada, galerias importantes, funções do proprietário ou integrações específicas.',extraDemo:'👁 VER UM SITE EXTRA · ASTOU BOUTIQUE',note:'Os preços são indicados « a partir de ». O valor final depende do conteúdo e das necessidades do projeto. É apresentado e aceite antes do pagamento. A adesão DIGIYLYFE é separada da criação do site.'},
      it:{title:'NOTORIETÀ · SITO PROFESSIONALE DIGIYLYFE',intro:'Due livelli chiari. Puoi vedere un esempio prima di scegliere e l’importo finale viene accettato prima del pagamento.',premium:'PREMIUM',premiumPrice:'SENEGAL · DA 250.000 FCFA · EUROPA · DA 480 €',premiumText:'Una presenza professionale completa: adattamento del MASTER al mestiere, identità, mobile, PWA, 8 lingue, contatto diretto e funzioni previste nel MASTER scelto.',premiumDemo:'👁 VEDI UN SITO PREMIUM · BABACAR',extra:'EXTRA',extraPrice:'SENEGAL · DA 450.000 FCFA · EUROPA · DA 800 €',extraText:'Per una realizzazione più ricca: più contenuti, personalizzazione avanzata, gallerie importanti, funzioni proprietario o integrazioni specifiche.',extraDemo:'👁 VEDI UN SITO EXTRA · ASTOU BOUTIQUE',note:'I prezzi sono indicati « da ». L’importo finale dipende dai contenuti e dalle esigenze del progetto. Viene presentato e accettato prima del pagamento. L’adesione DIGIYLYFE è separata dalla creazione del sito.'},
      de:{title:'BEKANNTHEIT · PROFESSIONELLE DIGIYLYFE-WEBSITE',intro:'Zwei klare Stufen. Sie können vor der Auswahl ein Beispiel ansehen; der Endbetrag wird vor der Zahlung bestätigt.',premium:'PREMIUM',premiumPrice:'SENEGAL · AB 250.000 FCFA · EUROPA · AB 480 €',premiumText:'Eine vollständige professionelle Präsenz: Anpassung des MASTER an das Geschäft, Identität, Mobilversion, PWA, 8 Sprachen, direkter Kontakt und die im gewählten MASTER vorgesehenen Funktionen.',premiumDemo:'👁 PREMIUM-WEBSITE ANSEHEN · BABACAR',extra:'EXTRA',extraPrice:'SENEGAL · AB 450.000 FCFA · EUROPA · AB 800 €',extraText:'Für eine umfangreichere Umsetzung: mehr Inhalte, erweiterte Personalisierung, größere Galerien, Eigentümerfunktionen oder spezielle Integrationen.',extraDemo:'👁 EXTRA-WEBSITE ANSEHEN · ASTOU BOUTIQUE',note:'Die Preise sind Einstiegspreise. Der Endbetrag hängt von Inhalt und Projektbedarf ab. Er wird vor der Zahlung vorgelegt und bestätigt. Die DIGIYLYFE-Mitgliedschaft ist von der Website-Erstellung getrennt.'},
      nl:{title:'NAAMSBEKENDHEID · PROFESSIONELE DIGIYLYFE-WEBSITE',intro:'Twee duidelijke niveaus. U kunt eerst een voorbeeld bekijken; het definitieve bedrag wordt vóór betaling aanvaard.',premium:'PREMIUM',premiumPrice:'SENEGAL · VANAF 250.000 FCFA · EUROPA · VANAF €480',premiumText:'Een complete professionele aanwezigheid: aanpassing van de MASTER aan het beroep, identiteit, mobiel, PWA, 8 talen, direct contact en functies die in de gekozen MASTER zijn voorzien.',premiumDemo:'👁 PREMIUM-WEBSITE BEKIJKEN · BABACAR',extra:'EXTRA',extraPrice:'SENEGAL · VANAF 450.000 FCFA · EUROPA · VANAF €800',extraText:'Voor een rijkere uitvoering: meer inhoud, geavanceerde personalisatie, grotere galerijen, eigenaarsfuncties of specifieke integraties.',extraDemo:'👁 EXTRA-WEBSITE BEKIJKEN · ASTOU BOUTIQUE',note:'De prijzen zijn vanafprijzen. Het definitieve bedrag hangt af van de inhoud en behoeften van het project. Het wordt vóór betaling voorgelegd en aanvaard. Het DIGIYLYFE-lidmaatschap staat los van de creatie van de website.'},
      ar:{title:'الشهرة · موقع DIGIYLYFE احترافي',intro:'مستويان واضحان. يمكن مشاهدة مثال قبل الاختيار، ويتم عرض المبلغ النهائي والموافقة عليه قبل الدفع.',premium:'PREMIUM',premiumPrice:'السنغال · ابتداءً من 250 000 FCFA · أوروبا · ابتداءً من 480 €',premiumText:'حضور مهني متكامل: تكييف MASTER مع المهنة، الهوية، الهاتف، PWA، 8 لغات، تواصل مباشر والوظائف المقررة في MASTER المختار.',premiumDemo:'👁 مشاهدة موقع PREMIUM · BABACAR',extra:'EXTRA',extraPrice:'السنغال · ابتداءً من 450 000 FCFA · أوروبا · ابتداءً من 800 €',extraText:'لإنجاز أكثر ثراءً: محتوى أكبر، تخصيص متقدم، معارض صور مهمة، وظائف للمالك أو تكاملات خاصة.',extraDemo:'👁 مشاهدة موقع EXTRA · ASTOU BOUTIQUE',note:'الأسعار مذكورة ابتداءً من. يعتمد المبلغ النهائي على محتوى المشروع واحتياجاته، ويتم عرضه والموافقة عليه قبل الدفع. عضوية DIGIYLYFE منفصلة عن إنشاء الموقع.'}
    };

    var wrap=document.createElement('div');
    wrap.setAttribute('data-digiy-site-tiers','1');
    wrap.style.cssText='display:grid;gap:11px;margin-top:12px';
    wrap.innerHTML='<article data-tier="premium" style="padding:15px;border-radius:19px;border:2px solid rgba(246,196,83,.58);background:linear-gradient(145deg,rgba(246,196,83,.13),rgba(255,255,255,.05))"><strong data-tier-title style="display:block;color:#ffe9a8;font-size:22px;font-weight:1000"></strong><div data-tier-price style="margin-top:8px;color:#fff;font-size:16px;line-height:1.35;font-weight:1000"></div><p data-tier-text style="margin:9px 0 12px;color:#c5d3cc;font-size:13px;line-height:1.5;font-weight:800"></p><a data-tier-demo href="https://master-site-digiylyfe.digiylyfe.com/demo-babacar-001/" target="_blank" rel="noopener noreferrer" style="display:flex;min-height:46px;align-items:center;justify-content:center;padding:9px 12px;border-radius:999px;background:linear-gradient(135deg,#f6c453,#2dd4bf);color:#06140f;font-size:12px;font-weight:1000;text-decoration:none;text-align:center"></a></article><article data-tier="extra" style="padding:15px;border-radius:19px;border:2px solid rgba(45,212,191,.58);background:linear-gradient(145deg,rgba(45,212,191,.12),rgba(246,196,83,.07))"><strong data-tier-title style="display:block;color:#a7fff0;font-size:22px;font-weight:1000"></strong><div data-tier-price style="margin-top:8px;color:#fff;font-size:16px;line-height:1.35;font-weight:1000"></div><p data-tier-text style="margin:9px 0 12px;color:#c5d3cc;font-size:13px;line-height:1.5;font-weight:800"></p><a data-tier-demo href="https://astou-boutique.digiylyfe.com/" target="_blank" rel="noopener noreferrer" style="display:flex;min-height:46px;align-items:center;justify-content:center;padding:9px 12px;border-radius:999px;border:1px solid rgba(246,196,83,.72);background:rgba(246,196,83,.12);color:#ffe9a8;font-size:12px;font-weight:1000;text-decoration:none;text-align:center"></a></article><p data-tier-note style="margin:2px 2px 0;padding:11px;border-radius:15px;border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.05);color:#c5d3cc;font-size:11px;line-height:1.5;font-weight:850"></p>';
    siteCard.appendChild(wrap);

    function refresh(){
      var lang=(document.documentElement.lang||localStorage.getItem('digiy_lang')||'fr').slice(0,2).toLowerCase();
      var t=copy[lang]||copy.fr;
      siteTitle.textContent=t.title;
      if(siteText) siteText.textContent=t.intro;

      var premium=wrap.querySelector('[data-tier="premium"]');
      premium.querySelector('[data-tier-title]').textContent=t.premium;
      premium.querySelector('[data-tier-price]').textContent=t.premiumPrice;
      premium.querySelector('[data-tier-text]').textContent=t.premiumText;
      premium.querySelector('[data-tier-demo]').textContent=t.premiumDemo;

      var extra=wrap.querySelector('[data-tier="extra"]');
      extra.querySelector('[data-tier-title]').textContent=t.extra;
      extra.querySelector('[data-tier-price]').textContent=t.extraPrice;
      extra.querySelector('[data-tier-text]').textContent=t.extraText;
      extra.querySelector('[data-tier-demo]').textContent=t.extraDemo;
      wrap.querySelector('[data-tier-note]').textContent=t.note;

      var meta=document.querySelector('meta[name="description"]');
      if(meta && lang==='fr') meta.content=meta.content.replace(/Site personnalisé\s*:\s*550 000 FCFA au Sénégal\s*\/\s*950 € en Europe\.?/i,'Sites DIGIYLYFE : PREMIUM à partir de 250 000 FCFA / 480 € ; EXTRA à partir de 450 000 FCFA / 800 €.');
    }

    refresh();
    new MutationObserver(refresh).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});
    window.addEventListener('storage',refresh);
  }

  function installPostPaymentCardButton(){
    var file=(location.pathname.split('/').pop()||'').toLowerCase();
    var plan=file==='tarifs-adherents-1.html'?'adherent-19900':file==='tarifs-adherents.html'?'adherent-28000':'';
    if(!plan || document.querySelector('[data-digiy-prepare-card]')) return;

    var payment=document.querySelector('#paiement');
    if(!payment) return;

    var labels={
      fr:'POURSUIVRE MA DEMANDE D’ADHÉSION →',
      en:'CONTINUE MY MEMBERSHIP REQUEST →',
      es:'CONTINUAR MI SOLICITUD DE ADHESIÓN →',
      pt:'CONTINUAR O MEU PEDIDO DE ADESÃO →',
      it:'CONTINUA LA MIA RICHIESTA DI ADESIONE →',
      de:'MITGLIEDSANTRAG FORTSETZEN →',
      nl:'MIJN LIDMAATSCHAPSAANVRAAG VERVOLGEN →',
      ar:'متابعة طلب العضوية ←'
    };

    var wrap=document.createElement('div');
    wrap.setAttribute('data-digiy-prepare-card','1');
    wrap.style.cssText='margin-top:16px;padding-top:16px;border-top:1px solid rgba(255,255,255,.16)';

    var note=document.createElement('p');
    note.style.cssText='margin:0 0 10px;color:rgba(247,255,249,.84);font-size:12px;line-height:1.5;font-weight:850;text-align:center';
    note.textContent='Accédez à votre dossier d’adhésion pour votre carte et, si vous le souhaitez, une fiche ou un site.';

    var link=document.createElement('a');
    link.style.cssText='display:flex;min-height:56px;align-items:center;justify-content:center;padding:12px 16px;border-radius:999px;background:linear-gradient(135deg,#f6c453,#2dd4bf);color:#06140f;font-weight:1000;text-decoration:none;text-align:center';

    function refresh(){
      var lang=(document.documentElement.lang||localStorage.getItem('digiy_lang')||'fr').slice(0,2).toLowerCase();
      if(!labels[lang]) lang='fr';
      link.textContent=labels[lang];
      link.href='https://digiylyfe.com/preparer-ma-carte.html?plan='+encodeURIComponent(plan)+'&lang='+encodeURIComponent(lang);
      link.setAttribute('aria-label',labels[lang]);
    }

    refresh();
    new MutationObserver(refresh).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});
    window.addEventListener('storage',refresh);
    link.addEventListener('click',refresh);

    wrap.appendChild(note);
    wrap.appendChild(link);
    payment.appendChild(wrap);
  }

  function installPublicShowcase(){
    var grid=document.querySelector('.proofGrid');
    if(!grid || grid.querySelector('[data-digiy-live-card]')) return;

    fetch(PUBLIC_CARDS_API,{cache:'no-store'})
      .then(function(r){if(!r.ok) throw new Error('vitrine indisponible');return r.json();})
      .then(function(payload){
        var cards=Array.isArray(payload&&payload.cards)?payload.cards:[];
        cards.forEach(function(card){
          if(!card || !card.final_url || !card.name) return;
          var already=[].some.call(grid.querySelectorAll('a[href]'),function(x){return x.href===card.final_url;});
          if(already) return;

          var a=document.createElement('a');
          a.className='proofCard';
          a.href=card.final_url;
          a.setAttribute('data-digiy-live-card','1');
          a.setAttribute('aria-label','Ouvrir '+card.name);

          var img=document.createElement('img');
          img.src=card.photo_url||'';
          img.alt=card.name;
          img.loading='lazy';
          img.decoding='async';
          img.style.cssText='width:100%;aspect-ratio:1/1;object-fit:cover;border-radius:14px;display:block;margin-bottom:7px;background:#ffffff12';

          var strong=document.createElement('strong');
          strong.textContent=card.name;

          var small=document.createElement('small');
          small.textContent=[card.job,card.zone].filter(Boolean).join(' · ');

          var b=document.createElement('b');
          b.textContent='Voir la carte →';

          a.appendChild(img);
          a.appendChild(strong);
          a.appendChild(small);
          a.appendChild(b);
          grid.appendChild(a);
        });
      })
      .catch(function(){ /* La vitrine historique reste intacte si le flux dynamique est indisponible. */ });
  }

  function installPwaHome(){
    var host=(location.hostname||'').toLowerCase();
    var path=(location.pathname||'/').replace(/\/+$/,'/') || '/';
    if(host!=='digiylyfe.com' || (path!=='/' && path!=='/index.html')) return;
    if(document.querySelector('[data-digiy-pwa-install]')) return;

    if(!document.querySelector('link[rel="manifest"]')){
      var manifest=document.createElement('link');
      manifest.rel='manifest';
      manifest.href='https://digiylyfe.com/manifest.json?v=20260818';
      document.head.appendChild(manifest);
    }

    [
      ['mobile-web-app-capable','yes'],
      ['apple-mobile-web-app-capable','yes'],
      ['apple-mobile-web-app-status-bar-style','black-translucent'],
      ['apple-mobile-web-app-title','DIGIY']
    ].forEach(function(item){
      if(document.querySelector('meta[name="'+item[0]+'"]')) return;
      var meta=document.createElement('meta');
      meta.name=item[0];
      meta.content=item[1];
      document.head.appendChild(meta);
    });

    var style=document.createElement('style');
    style.setAttribute('data-digiy-pwa-install','style');
    style.textContent='.digiyPwaInstall{position:fixed;left:50%;bottom:calc(82px + env(safe-area-inset-bottom));z-index:76;transform:translateX(-50%);width:min(520px,calc(100% - 18px));padding:7px;border:1px solid rgba(246,196,83,.72);border-radius:22px;background:rgba(4,19,13,.97);box-shadow:0 18px 54px rgba(0,0,0,.48);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);display:grid;grid-template-columns:minmax(0,1fr) 42px;gap:7px;align-items:center}.digiyPwaInstall[hidden]{display:none!important}.digiyPwaMain{min-height:58px;padding:8px 12px;border:0;border-radius:16px;background:linear-gradient(135deg,#fff1bd,#f6c453,#22c55e);color:#06140f;display:grid;grid-template-columns:38px 1fr;gap:9px;align-items:center;text-align:left;cursor:pointer}.digiyPwaMain i{font-style:normal;font-size:27px;line-height:1}.digiyPwaMain strong{display:block;font-size:13px;line-height:1.08;font-weight:1000}.digiyPwaMain small{display:block;margin-top:4px;font-size:10.5px;line-height:1.25;font-weight:900;opacity:.82}.digiyPwaClose{width:42px;height:42px;border-radius:14px;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.07);color:#fff3cf;font-size:22px;cursor:pointer}@media(min-width:981px){.digiyPwaInstall{left:auto;right:126px;bottom:18px;transform:none;width:min(430px,calc(100% - 160px))}}';
    document.head.appendChild(style);

    var box=document.createElement('div');
    box.className='digiyPwaInstall';
    box.hidden=true;
    box.setAttribute('data-digiy-pwa-install','1');
    box.setAttribute('role','region');
    box.setAttribute('aria-label','Installer DIGIYLYFE');
    box.innerHTML='<button class="digiyPwaMain" type="button"><i aria-hidden="true">📲</i><span><strong>Installer DIGIYLYFE</strong><small>Gardez DIGIYLYFE directement sur votre téléphone.</small></span></button><button class="digiyPwaClose" type="button" aria-label="Fermer">×</button>';
    document.body.appendChild(box);

    var main=box.querySelector('.digiyPwaMain');
    var close=box.querySelector('.digiyPwaClose');
    var title=box.querySelector('strong');
    var copy=box.querySelector('small');
    var deferredPrompt=null;
    var dismissed=false;
    var isIOS=/iphone|ipad|ipod/i.test(navigator.userAgent);
    var isStandalone=window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone===true;
    var labels={
      fr:{title:'Installer DIGIYLYFE',native:'Gardez DIGIYLYFE directement sur votre téléphone.',ios:'Partager, puis « Sur l’écran d’accueil ».'},
      en:{title:'Install DIGIYLYFE',native:'Keep DIGIYLYFE directly on your phone.',ios:'Share, then Add to Home Screen.'},
      es:{title:'Instalar DIGIYLYFE',native:'Guarde DIGIYLYFE directamente en su teléfono.',ios:'Compartir y luego Añadir a pantalla de inicio.'},
      pt:{title:'Instalar DIGIYLYFE',native:'Guarde DIGIYLYFE diretamente no seu telefone.',ios:'Partilhar e depois Adicionar ao ecrã principal.'},
      it:{title:'Installa DIGIYLYFE',native:'Tieni DIGIYLYFE direttamente sul telefono.',ios:'Condividi, poi Aggiungi alla schermata Home.'},
      de:{title:'DIGIYLYFE installieren',native:'DIGIYLYFE direkt auf dem Telefon behalten.',ios:'Teilen, dann Zum Home-Bildschirm.'},
      nl:{title:'DIGIYLYFE installeren',native:'Bewaar DIGIYLYFE rechtstreeks op uw telefoon.',ios:'Delen en vervolgens Zet op beginscherm.'},
      ar:{title:'تثبيت DIGIYLYFE',native:'احتفظ بـ DIGIYLYFE مباشرة على هاتفك.',ios:'مشاركة ثم إضافة إلى الشاشة الرئيسية.'}
    };

    function lang(){
      var key=(document.documentElement.lang||localStorage.getItem('digiy-lang')||'fr').slice(0,2).toLowerCase();
      return labels[key]?key:'fr';
    }
    function refresh(mode){
      var t=labels[lang()];
      title.textContent=t.title;
      copy.textContent=mode==='ios'?t.ios:t.native;
      box.setAttribute('aria-label',t.title);
    }
    function show(mode){
      if(dismissed || isStandalone) return;
      box.dataset.mode=mode;
      refresh(mode);
      box.hidden=false;
    }
    function hide(){box.hidden=true;}

    window.addEventListener('beforeinstallprompt',function(event){
      event.preventDefault();
      deferredPrompt=event;
      show('native');
    });

    main.addEventListener('click',async function(){
      if(deferredPrompt){
        deferredPrompt.prompt();
        try{await deferredPrompt.userChoice;}catch(error){}
        deferredPrompt=null;
        hide();
        return;
      }
      if(isIOS) show('ios');
    });
    close.addEventListener('click',function(){dismissed=true;hide();});
    window.addEventListener('appinstalled',function(){deferredPrompt=null;hide();});
    new MutationObserver(function(){refresh(box.dataset.mode==='ios'?'ios':'native');}).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});

    if(isIOS && !isStandalone) setTimeout(function(){show('ios');},1400);

    if('serviceWorker' in navigator){
      var register=function(){
        navigator.serviceWorker.register('/sw.js',{scope:'/'}).catch(function(error){
          console.warn('DIGIYLYFE PWA: service worker non enregistré',error);
        });
      };
      if(document.readyState==='complete') register();
      else window.addEventListener('load',register,{once:true});
    }
  }

  function install(){
    cleanLegacyHubFooter();
    repairPublicDoors();
    renameWorldHub();
    installMembershipSiteBack();
    installOfferDemos();
    installSitePricingTiers();
    installPostPaymentCardButton();
    installPublicShowcase();
    installPwaHome();
    if(document.querySelector('a[href="'+MAILTO+'"]')) return;

    var link=document.createElement('a');
    link.href=MAILTO;
    link.textContent='✉️ '+EMAIL;
    link.setAttribute('aria-label','Écrire à DIGIYLYFE : '+EMAIL);
    link.style.color='inherit';
    link.style.fontWeight='900';
    link.style.textDecoration='none';
    link.style.overflowWrap='anywhere';

    var footer=document.querySelector('footer');
    if(footer){
      var wrap=document.createElement('div');
      wrap.setAttribute('data-digiy-contact-global','1');
      wrap.style.marginTop='10px';
      wrap.style.paddingTop='9px';
      wrap.style.borderTop='1px solid rgba(255,255,255,.14)';
      wrap.style.textAlign='center';
      wrap.appendChild(link);
      footer.appendChild(wrap);
      return;
    }

    var bar=document.createElement('div');
    bar.setAttribute('data-digiy-contact-global','1');
    bar.style.cssText='width:min(960px,calc(100% - 24px));margin:18px auto 110px;padding:13px 16px;border:1px solid rgba(246,196,83,.38);border-radius:18px;background:rgba(4,19,13,.92);color:#fffaf0;text-align:center;font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;box-shadow:0 12px 32px rgba(0,0,0,.22)';
    bar.appendChild(link);
    document.body.appendChild(bar);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
})();