/* DIGIYLYFE · doctrine réseau/territoires + VA CHEZ DIGIY premium + INTERNATIONAL 24H · 2026-09-17 */
(function(){
  'use strict';
  if(window.DIGIY_FREE_CARD_ENTRY_V1)return;
  window.DIGIY_FREE_CARD_ENTRY_V1=true;

  var LANGS=['fr','en','es','pt','it','de','nl','ar'];
  var STORY_URL='https://vas-chez-digiy.digiylyfe.com/';
  var WORLD_IMAGE='https://digiylyfe.net/wp-content/uploads/2026/09/Image-ChatGPT-26-sept.-2026-17_12_10.png';
  var COPY={
    fr:{mini:'PREMIÈRE MARCHE · RÉSEAU OUVERT',homeTitle:'Votre carte de visite DIGIY est gratuite.',homeText:'Entrez dans DIGIYLYFE avec votre identité, votre métier, votre territoire et votre contact direct. Sans publicité · 0 % commission.',locMini:'AVANT DIGIY LOC · ENTRÉE GRATUITE',locTitle:'Commencez par votre carte DIGIY gratuite.',locText:'Votre carte vous fait entrer dans le réseau. Si la location correspond à votre activité, poursuivez ensuite vers DIGIY LOC et ses outils de réservation directe à 0 % de commission.',cta:'DEMANDER MA CARTE DIGIY GRATUITE →',storyMini:'DIGIY EN ACTION · UNE SOIRÉE À SALY',storyTitle:'Une chambre. Un chauffeur. Un restaurant.',storyText:'Voyez comment le réseau fait circuler le client tout en laissant chaque professionnel indépendant.',storyCta:'▶ VOIR L’HISTOIRE',franceZones:'3 TERRITOIRES OUVERTS · Vallée de la Dordogne · Bordeaux · Paris',mobileInstall:'Installer DIGIYLYFE sur ce téléphone'},
    en:{mini:'FIRST STEP · OPEN NETWORK',homeTitle:'Your DIGIY business card is free.',homeText:'Join DIGIYLYFE with your identity, activity, territory and direct contact. No advertising · 0% commission.',locMini:'BEFORE DIGIY LOC · FREE ENTRY',locTitle:'Start with your free DIGIY card.',locText:'Your card gets you into the network. If rentals fit your business, continue with DIGIY LOC and direct-booking tools at 0% commission.',cta:'REQUEST MY FREE DIGIY CARD →',storyMini:'DIGIY IN ACTION · AN EVENING IN SALY',storyTitle:'One room. One driver. One restaurant.',storyText:'See how the network moves the customer while each professional stays independent.',storyCta:'▶ WATCH THE STORY',franceZones:'3 OPEN TERRITORIES · Dordogne Valley · Bordeaux · Paris',mobileInstall:'Install DIGIYLYFE on this phone'},
    es:{mini:'PRIMER PASO · RED ABIERTA',homeTitle:'Su tarjeta de visita DIGIY es gratuita.',homeText:'Entre en DIGIYLYFE con su identidad, actividad, territorio y contacto directo. Sin publicidad · 0 % comisión.',locMini:'ANTES DE DIGIY LOC · ENTRADA GRATUITA',locTitle:'Empiece con su tarjeta DIGIY gratuita.',locText:'La tarjeta le permite entrar en la red. Si el alquiler corresponde a su actividad, continúe con DIGIY LOC y sus herramientas de reserva directa con 0 % de comisión.',cta:'SOLICITAR MI TARJETA DIGIY GRATUITA →',storyMini:'DIGIY EN ACCIÓN · UNA NOCHE EN SALY',storyTitle:'Una habitación. Un conductor. Un restaurante.',storyText:'Vea cómo la red hace circular al cliente manteniendo independiente a cada profesional.',storyCta:'▶ VER LA HISTORIA',franceZones:'3 TERRITORIOS ABIERTOS · Valle del Dordoña · Burdeos · París',mobileInstall:'Instalar DIGIYLYFE en este teléfono'},
    pt:{mini:'PRIMEIRO PASSO · REDE ABERTA',homeTitle:'O seu cartão de visita DIGIY é gratuito.',homeText:'Entre na DIGIYLYFE com identidade, atividade, território e contacto direto. Sem publicidade · 0% comissão.',locMini:'ANTES DO DIGIY LOC · ENTRADA GRATUITA',locTitle:'Comece com o seu cartão DIGIY gratuita.',locText:'O cartão permite entrar na rede. Se o alojamento faz parte da sua atividade, continue para o DIGIY LOC com reserva direta e 0% comissão.',cta:'PEDIR O MEU CARTÃO DIGIY GRATUITO →',storyMini:'DIGIY EM AÇÃO · UMA NOITE EM SALY',storyTitle:'Um quarto. Um motorista. Um restaurante.',storyText:'Veja como a rede faz o cliente circular mantendo cada profissional independente.',storyCta:'▶ VER A HISTÓRIA',franceZones:'3 TERRITÓRIOS ABERTOS · Vale da Dordonha · Bordéus · Paris',mobileInstall:'Instalar DIGIYLYFE neste telefone'},
    it:{mini:'PRIMO PASSO · RETE APERTA',homeTitle:'Il vostro biglietto da visita DIGIY è gratuito.',homeText:'Entrate in DIGIYLYFE con identità, attività, territorio e contatto diretto. Nessuna pubblicità · 0% commissioni.',locMini:'PRIMA DI DIGIY LOC · INGRESSO GRATUITO',locTitle:'Iniziate con la vostra carta DIGIY gratuita.',locText:'La carta vi fa entrare nella rete. Se le locazioni fanno parte della vostra attività, proseguite con DIGIY LOC, prenotazione diretta e 0% commissioni.',cta:'RICHIEDI LA MIA CARTA DIGIY GRATUITA →',storyMini:'DIGIY IN AZIONE · UNA SERA A SALY',storyTitle:'Una camera. Un autista. Un ristorante.',storyText:'Scopri come la rete fa circolare il cliente lasciando indipendente ogni professionista.',storyCta:'▶ GUARDA LA STORIA',franceZones:'3 TERRITORI APERTI · Valle della Dordogna · Bordeaux · Parigi',mobileInstall:'Installa DIGIYLYFE su questo telefono'},
    de:{mini:'ERSTER SCHRITT · OFFENES NETZWERK',homeTitle:'Ihre DIGIY-Visitenkarte ist kostenlos.',homeText:'Starten Sie bei DIGIYLYFE mit Identität, Tätigkeit, Region und direktem Kontakt. Keine Werbung · 0 % Provision.',locMini:'VOR DIGIY LOC · KOSTENLOSER EINSTIEG',locTitle:'Starten Sie mit Ihrer kostenlosen DIGIY-Karte.',locText:'Die Karte bringt Sie ins Netzwerk. Wenn Vermietung zu Ihrem Geschäft gehört, gehen Sie anschließend zu DIGIY LOC mit Direktbuchung und 0 % Provision.',cta:'KOSTENLOSE DIGIY-KARTE ANFORDERN →',storyMini:'DIGIY IN AKTION · EIN ABEND IN SALY',storyTitle:'Ein Zimmer. Ein Fahrer. Ein Restaurant.',storyText:'Sehen Sie, wie das Netzwerk Kunden weiterführt und jeder Profi unabhängig bleibt.',storyCta:'▶ GESCHICHTE ANSEHEN',franceZones:'3 OFFENE GEBIETE · Dordogne-Tal · Bordeaux · Paris',mobileInstall:'DIGIYLYFE auf diesem Telefon installieren'},
    nl:{mini:'EERSTE STAP · OPEN NETWERK',homeTitle:'Uw DIGIY-visitekaart is gratis.',homeText:'Kom in DIGIYLYFE met uw identiteit, activiteit, regio en direct contact. Geen reclame · 0% commissie.',locMini:'VÓÓR DIGIY LOC · GRATIS INSTAP',locTitle:'Begin met uw gratis DIGIY-kaart.',locText:'Met de kaart komt u in het netwerk. Past verhuur bij uw activiteit, ga dan verder met DIGIY LOC, directe boekingen en 0% commissie.',cta:'MIJN GRATIS DIGIY-KAART AANVRAGEN →',storyMini:'DIGIY IN ACTIE · EEN AVOND IN SALY',storyTitle:'Een kamer. Een chauffeur. Een restaurant.',storyText:'Bekijk hoe het netwerk de klant laat doorstromen terwijl elke professional onafhankelijk blijft.',storyCta:'▶ BEKIJK HET VERHAAL',franceZones:'3 OPEN GEBIEDEN · Dordognevallei · Bordeaux · Parijs',mobileInstall:'DIGIYLYFE op deze telefoon installeren'},
    ar:{mini:'الخطوة الأولى · شبكة مفتوحة',homeTitle:'بطاقة DIGIY المهنية مجانية.',homeText:'ادخل شبكة DIGIYLYFE بهويتك المهنية ونشاطك ومنطقتك ووسيلة الاتصال المباشر. بدون إعلانات · عمولة 0٪.',locMini:'قبل DIGIY LOC · دخول مجاني',locTitle:'ابدأ ببطاقة DIGIY المجانية.',locText:'تُدخلك البطاقة إلى الشبكة. وإذا كان التأجير جزءًا من نشاطك، يمكنك بعد ذلك الانتقال إلى DIGIY LOC مع الحجز المباشر وعمولة 0٪.',cta:'اطلب بطاقة DIGIY المجانية ←',storyMini:'DIGIY أثناء العمل · أمسية في سالي',storyTitle:'غرفة. سائق. مطعم.',storyText:'شاهد كيف تنقل الشبكة العميل بين المهنيين مع بقاء كل مهني مستقلاً.',storyCta:'▶ شاهد القصة',franceZones:'3 مناطق مفتوحة · وادي دوردوني · بوردو · باريس',mobileInstall:'تثبيت DIGIYLYFE على هذا الهاتف'}
  };
  var WORLD={
    fr:{mini:'LE VILLAGE, C’EST LE MONDE',title:'DIGIYLYFE n’est ni un annuaire, ni une marketplace, ni une super-app.',lead:'Une infrastructure numérique locale.',text:'DIGIYLYFE relie les besoins d’un territoire aux femmes et aux hommes qui y répondent.'},
    en:{mini:'THE VILLAGE IS THE WORLD',title:'DIGIYLYFE is not a directory, a marketplace or a super-app.',lead:'A local digital infrastructure.',text:'DIGIYLYFE connects the needs of a territory with the women and men who respond to them.'},
    es:{mini:'EL PUEBLO ES EL MUNDO',title:'DIGIYLYFE no es un directorio, ni un marketplace, ni una superapp.',lead:'Una infraestructura digital local.',text:'DIGIYLYFE conecta las necesidades de un territorio con las mujeres y los hombres que responden a ellas.'},
    pt:{mini:'A ALDEIA É O MUNDO',title:'A DIGIYLYFE não é um diretório, nem um marketplace, nem uma superapp.',lead:'Uma infraestrutura digital local.',text:'A DIGIYLYFE liga as necessidades de um território às mulheres e aos homens que lhes dão resposta.'},
    it:{mini:'IL VILLAGGIO È IL MONDO',title:'DIGIYLYFE non è una directory, né un marketplace, né una super-app.',lead:'Un’infrastruttura digitale locale.',text:'DIGIYLYFE collega i bisogni di un territorio alle donne e agli uomini che vi rispondono.'},
    de:{mini:'DAS DORF IST DIE WELT',title:'DIGIYLYFE ist weder ein Verzeichnis noch ein Marktplatz noch eine Super-App.',lead:'Eine lokale digitale Infrastruktur.',text:'DIGIYLYFE verbindet die Bedürfnisse eines Gebiets mit den Frauen und Männern, die darauf antworten.'},
    nl:{mini:'HET DORP IS DE WERELD',title:'DIGIYLYFE is geen bedrijvengids, marketplace of super-app.',lead:'Een lokale digitale infrastructuur.',text:'DIGIYLYFE verbindt de behoeften van een gebied met de vrouwen en mannen die daarop inspelen.'},
    ar:{mini:'القرية هي العالم',title:'DIGIYLYFE ليست دليلاً ولا سوقاً إلكترونية ولا تطبيقاً فائقاً.',lead:'بنية تحتية رقمية محلية.',text:'تربط DIGIYLYFE احتياجات كل منطقة بالنساء والرجال الذين يستجيبون لها.'}
  };
  var SYNTHESIS={
    fr:{mini:'LE RÉSEAU DIGIYLYFE',title:'Votre activité. Votre autonomie. Votre réseau.',p1:'Chaque professionnel garde ses clients, ses contacts, ses paiements et son autonomie.',p2:'DIGIYLYFE complète Google, Booking, Yango et les réseaux sociaux avec une présence directe, permanente et locale.',p3:'Un abonnement fixe · 0 % commission sur chaque vente ou réservation. Plus vous travaillez, plus vous gardez la valeur créée.',p4:'Hébergement, chauffeur, restaurant, artisan, commerce, guide et services sont reliés : un besoin peut en créer un autre.',strong:'DIGIYLYFE ne capte pas le commerce. Il organise la circulation entre les besoins, les professionnels et les territoires.',promise:'Être vu. Être compris. Être trouvé. Être contacté.'},
    en:{mini:'THE DIGIYLYFE NETWORK',title:'Your business. Your autonomy. Your network.',p1:'Every professional keeps their customers, contacts, payments and independence.',p2:'DIGIYLYFE complements Google, Booking, Yango and social networks with a direct, permanent and local presence.',p3:'One fixed subscription · 0% commission on each sale or booking. The more you work, the more value you keep.',p4:'Accommodation, drivers, restaurants, artisans, shops, guides and services are connected: one need can lead to another.',strong:'DIGIYLYFE does not capture the business. It organizes the flow between needs, professionals and territories.',promise:'Be seen. Be understood. Be found. Be contacted.'},
    es:{mini:'LA RED DIGIYLYFE',title:'Su actividad. Su autonomía. Su red.',p1:'Cada profesional conserva sus clientes, contactos, pagos y autonomía.',p2:'DIGIYLYFE complementa Google, Booking, Yango y las redes sociales con una presencia directa, permanente y local.',p3:'Una suscripción fija · 0 % de comisión por cada venta o reserva. Cuanto más trabaja, más valor conserva.',p4:'Alojamiento, conductor, restaurante, artesano, comercio, guía y servicios están conectados: una necesidad puede generar otra.',strong:'DIGIYLYFE no capta el comercio. Organiza la circulación entre necesidades, profesionales y territorios.',promise:'Ser visto. Ser comprendido. Ser encontrado. Ser contactado.'},
    pt:{mini:'A REDE DIGIYLYFE',title:'A sua atividade. A sua autonomia. A sua rede.',p1:'Cada profissional mantém os seus clientes, contactos, pagamentos e autonomia.',p2:'A DIGIYLYFE complementa Google, Booking, Yango e as redes sociais com uma presença direta, permanente e local.',p3:'Uma subscrição fixa · 0% de comissão por cada venda ou reserva. Quanto mais trabalha, mais valor conserva.',p4:'Alojamento, motorista, restaurante, artesão, comércio, guia e serviços estão ligados: uma necessidade pode gerar outra.',strong:'A DIGIYLYFE não captura o comércio. Organiza a circulação entre necessidades, profissionais e territórios.',promise:'Ser visto. Ser compreendido. Ser encontrado. Ser contactado.'},
    it:{mini:'LA RETE DIGIYLYFE',title:'La vostra attività. La vostra autonomia. La vostra rete.',p1:'Ogni professionista mantiene i propri clienti, contatti, pagamenti e autonomia.',p2:'DIGIYLYFE completa Google, Booking, Yango e i social network con una presenza diretta, permanente e locale.',p3:'Un abbonamento fisso · 0% di commissioni su ogni vendita o prenotazione. Più lavorate, più valore conservate.',p4:'Alloggio, autista, ristorante, artigiano, commercio, guida e servizi sono collegati: un bisogno può generarne un altro.',strong:'DIGIYLYFE non cattura il commercio. Organizza la circolazione tra bisogni, professionisti e territori.',promise:'Essere visti. Essere compresi. Essere trovati. Essere contattati.'},
    de:{mini:'DAS DIGIYLYFE-NETZWERK',title:'Ihr Geschäft. Ihre Unabhängigkeit. Ihr Netzwerk.',p1:'Jeder Profi behält seine Kunden, Kontakte, Zahlungen und seine Unabhängigkeit.',p2:'DIGIYLYFE ergänzt Google, Booking, Yango und soziale Netzwerke durch eine direkte, dauerhafte und lokale Präsenz.',p3:'Ein fester Beitrag · 0 % Provision auf jeden Verkauf oder jede Buchung. Je mehr Sie arbeiten, desto mehr Wert behalten Sie.',p4:'Unterkunft, Fahrer, Restaurant, Handwerk, Handel, Guide und Dienstleistungen sind verbunden: Ein Bedarf kann den nächsten auslösen.',strong:'DIGIYLYFE zieht den Handel nicht an sich. Es organisiert den Austausch zwischen Bedürfnissen, Profis und Gebieten.',promise:'Gesehen werden. Verstanden werden. Gefunden werden. Kontaktiert werden.'},
    nl:{mini:'HET DIGIYLYFE-NETWERK',title:'Uw activiteit. Uw autonomie. Uw netwerk.',p1:'Elke professional behoudt zijn klanten, contacten, betalingen en autonomie.',p2:'DIGIYLYFE vult Google, Booking, Yango en sociale netwerken aan met een directe, permanente en lokale aanwezigheid.',p3:'Een vast abonnement · 0% commissie per verkoop of boeking. Hoe meer u werkt, hoe meer waarde u behoudt.',p4:'Accommodatie, chauffeur, restaurant, vakman, winkel, gids en diensten zijn verbonden: de ene behoefte kan de volgende creëren.',strong:'DIGIYLYFE neemt de handel niet over. Het organiseert de doorstroming tussen behoeften, professionals en gebieden.',promise:'Gezien worden. Begrepen worden. Gevonden worden. Gecontacteerd worden.'},
    ar:{mini:'شبكة DIGIYLYFE',title:'نشاطك. استقلاليتك. شبكتك.',p1:'يحتفظ كل مهني بعملائه وجهات اتصاله ومدفوعاته واستقلاليته.',p2:'تُكمل DIGIYLYFE خدمات Google وBooking وYango وشبكات التواصل بحضور مباشر ودائم ومحلي.',p3:'اشتراك ثابت · عمولة 0٪ على كل بيع أو حجز. كلما زاد نشاطك، احتفظت بقيمة أكبر مما تصنعه.',p4:'الإقامة والسائق والمطعم والحرفي والتاجر والدليل والخدمات مترابطة: حاجة واحدة قد تؤدي إلى حاجة أخرى.',strong:'DIGIYLYFE لا تستحوذ على التجارة. بل تنظم الحركة بين الاحتياجات والمهنيين والمناطق.',promise:'أن تُرى. أن تُفهم. أن يتم العثور عليك. أن يتم التواصل معك.'}
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
    s.textContent+='.digiyNetworkSynthesis{margin:14px 0;padding:22px 18px;border-radius:28px;border:1px solid rgba(246,196,83,.55);background:linear-gradient(145deg,rgba(8,73,50,.97),rgba(4,31,24,.98));box-shadow:0 20px 48px rgba(0,0,0,.26);color:#fffaf0;text-align:center}.digiyNetworkSynthesis .synthMini{display:inline-flex;padding:6px 10px;border-radius:999px;border:1px solid rgba(45,212,191,.52);background:rgba(45,212,191,.09);color:#c9fff7;font-size:9.5px;font-weight:1000;letter-spacing:.08em;text-transform:uppercase}.digiyNetworkSynthesis h2{margin:10px auto 0;max-width:820px;font-size:clamp(25px,5vw,38px);line-height:1.03;font-weight:1000;letter-spacing:-.03em}.digiyNetworkSynthesis .synthBody{max-width:850px;margin:14px auto 0;display:grid;gap:9px}.digiyNetworkSynthesis p{margin:0;color:#dce9e3;font-size:12px;line-height:1.55;font-weight:800}.digiyNetworkSynthesis .synthStrong{margin-top:4px;color:#fff3cf;font-size:13px;font-weight:1000}.digiyNetworkSynthesis .synthPromise{margin-top:4px;color:#f6c453;font-size:14px;font-weight:1000}.digiyNetworkSynthesis[dir="rtl"]{direction:rtl}@media(max-width:520px){.digiyNetworkSynthesis{padding:18px 13px}.digiyNetworkSynthesis .synthBody{gap:8px}}';
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
  function renderSynthesis(box){
    var l=lang(),t=SYNTHESIS[l]||SYNTHESIS.fr;
    box.dir=l==='ar'?'rtl':'ltr';
    box.innerHTML='<span class="synthMini"></span><h2></h2><div class="synthBody"><p class="synthP1"></p><p class="synthP2"></p><p class="synthP3"></p><p class="synthP4"></p><p class="synthStrong"></p><p class="synthPromise"></p></div>';
    box.querySelector('.synthMini').textContent=t.mini;
    box.querySelector('h2').textContent=t.title;
    box.querySelector('.synthP1').textContent=t.p1;
    box.querySelector('.synthP2').textContent=t.p2;
    box.querySelector('.synthP3').textContent=t.p3;
    box.querySelector('.synthP4').textContent=t.p4;
    box.querySelector('.synthStrong').textContent=t.strong;
    box.querySelector('.synthPromise').textContent=t.promise;
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
  function mountSynthesis(){
    if(!isHome())return;
    style();
    var box=document.getElementById('digiyNetworkSynthesis');
    if(!box){
      box=document.createElement('section');box.id='digiyNetworkSynthesis';box.className='digiyNetworkSynthesis';box.setAttribute('data-digiy-network-synthesis','1');box.setAttribute('aria-label','DIGIYLYFE · réseau local multi-métiers');
      var anchor=document.querySelector('.fullStackIntro');
      if(anchor)anchor.insertAdjacentElement('afterend',box);else{var m=document.querySelector('main');if(m)m.insertAdjacentElement('afterbegin',box)}
    }
    renderSynthesis(box);
    document.querySelectorAll('.langBtn').forEach(function(b){b.addEventListener('click',function(){setTimeout(function(){renderSynthesis(box)},20)})});
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
  function hardenMasterVideo(){
    if(!isHome())return;
    var box=document.querySelector('.digiyMasterVideo');
    var frame=box&&box.querySelector('.digiyMasterVideoFrame');
    var v=box&&box.querySelector('video');
    if(!box||!frame||!v)return;
    box.style.position='relative';
    box.style.zIndex='4';
    frame.style.position='relative';
    frame.style.zIndex='5';
    frame.style.pointerEvents='auto';
    frame.style.touchAction='manipulation';
    v.style.position='relative';
    v.style.zIndex='6';
    v.style.pointerEvents='auto';
    v.style.touchAction='manipulation';
    v.setAttribute('controls','');
    v.setAttribute('playsinline','');
    v.setAttribute('webkit-playsinline','');
    v.setAttribute('preload','metadata');
    v.setAttribute('x-webkit-airplay','allow');
    var src=v.querySelector('source');
    var expectedSrc='https://digiylyfe.net/wp-content/uploads/2026/09/DIGIYLYFE_BESOIN_REPONSE_CONTACT_20s_ALY_POSEE_MOBILE_SAFE.mp4';
    if(src&&src.getAttribute('src')!==expectedSrc){
      src.setAttribute('src',expectedSrc);
      try{v.load();}catch(e){}
    }
    document.documentElement.setAttribute('data-digiy-master-video-mobile','v3');
  }

  function arrangeDoctrine(){
    if(!isHome())return;
    document.documentElement.classList.remove('digiyFacadeSimple');
    var promise=document.querySelector('.fullStackIntro');
    if(!promise)return;
    var order=[
      document.getElementById('digiyNetworkSynthesis'),
      document.getElementById('digiyEntryChoice'),
      document.querySelector('.voiceSearchBand'),
      document.querySelector('.hero[aria-label="Présence numérique DIGIYLYFE"]'),
      document.querySelector('.digiyMasterVideo'),
      document.getElementById('digiyStoryEntry'),
      document.getElementById('territoires')||document.querySelector('.worldHub'),
      document.getElementById('digiyInternational'),
      document.querySelector('.brandClaim'),
      document.getElementById('digiyFreeCardEntry'),
      document.getElementById('digiyCampus'),
      document.querySelector('.ownerModules'),
      document.querySelector('.section[aria-label="Portes publiques DIGIYLYFE"]'),
      document.querySelector('.section[aria-label="Preuves terrain DIGIYLYFE"]'),
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
  function boot(){
    mount();
    mountStory();
    mountSynthesis();
    mountWorld();
    arrangeDoctrine();
    hardenMasterVideo();
    setTimeout(hardenMasterVideo,120);
    setTimeout(hardenMasterVideo,600);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();