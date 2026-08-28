/* DIGIYLYFE — Carte Vitrine DIGIY · SARLAT CHEZ BAPTISTE V1
 * Une seule signature visuelle, plusieurs portes publiques.
 * Photo -> galerie | Carte -> compréhension | Fiche métier -> calendrier/réservation.
 * Aucun moteur métier n'est dupliqué ici.
 */
(function(){
  'use strict';

  var SHEET='https://sarlat-chez-baptiste.digiylyfe.com/';
  var WA='https://wa.me/33638329423?text='+encodeURIComponent('Bonjour Baptiste, je viens de DIGIYLYFE pour une demande de séjour à Sarlat.');
  var PHOTOS=[
    'https://digiylyfe.net/wp-content/uploads/2026/07/F9595D25-B9F1-4049-95CD-00554BC8F369.png',
    'https://digiylyfe.net/wp-content/uploads/2026/07/254BB65E-9E5B-4316-AD0F-C7DA83DFAC6E.png',
    'https://digiylyfe.net/wp-content/uploads/2026/07/83C44D61-28B0-4020-A1DF-B7D72F5081B8.png',
    'https://digiylyfe.net/wp-content/uploads/2026/07/B4063FF2-EBFE-4191-A7E3-82D524060858.png',
    'https://digiylyfe.net/wp-content/uploads/2026/07/8515DA79-52D4-4802-A9B2-502BBA8DA067.png',
    'https://digiylyfe.net/wp-content/uploads/2026/07/E8A9CEFE-987D-442E-B094-07C933E8C27B.png'
  ];

  var T={
    fr:{gallery:'📷 OUVRIR LA GALERIE',eyebrow:'ADHÉRENT DIGIYLYFE · HÉBERGEMENT DIRECT',sub:'Chambre privée chez l’habitant · Sarlat-la-Canéda · Périgord Noir',night:'nuit',priceNote:'Disponibilité et montant final confirmés directement par Baptiste',travellers:'👥 2 voyageurs max.',bath:'🛁 Salle de bain privative',kitchen:'🍽️ Cuisine partagée',arrival:'🔑 Arrivée autonome',desc:'Une vraie maison habitée à Sarlat. Baptiste vit sur place ; le voyageur dispose de sa chambre et de sa salle de bain privative, avec cuisine et salle à manger partagées.',contact:'Contact direct',payment:'Paiement direct',paymentSub:'après confirmation écrite',sheet:'Fiche métier',sheetSub:'calendrier + réservation',open:'OUVRIR LA FICHE / RÉSERVER →',wa:'💬 WHATSAPP',galleryTitle:'Galerie du logement',close:'✕ Fermer',real:'PRÉSENCE RÉELLE · SARLAT',caps:['La chambre privée','Chambre · autre angle','Cuisine équipée','Salle à manger','Salle à manger · autre vue','Salle de bain privative']},
    en:{gallery:'📷 OPEN GALLERY',eyebrow:'DIGIYLYFE MEMBER · DIRECT ACCOMMODATION',sub:'Private room in a lived-in home · Sarlat-la-Canéda · Périgord Noir',night:'night',priceNote:'Availability and final amount confirmed directly by Baptiste',travellers:'👥 Max. 2 guests',bath:'🛁 Private bathroom',kitchen:'🍽️ Shared kitchen',arrival:'🔑 Self check-in',desc:'A real lived-in home in Sarlat. Baptiste lives on site; guests have their private room and bathroom, with shared kitchen and dining room.',contact:'Direct contact',payment:'Direct payment',paymentSub:'after written confirmation',sheet:'Full listing',sheetSub:'calendar + booking',open:'OPEN LISTING / BOOK →',wa:'💬 WHATSAPP',galleryTitle:'Accommodation gallery',close:'✕ Close',real:'REAL PRESENCE · SARLAT',caps:['Private room','Room · another angle','Equipped kitchen','Dining room','Dining room · another view','Private bathroom']},
    es:{gallery:'📷 ABRIR GALERÍA',eyebrow:'MIEMBRO DIGIYLYFE · ALOJAMIENTO DIRECTO',sub:'Habitación privada en casa habitada · Sarlat-la-Canéda · Périgord Noir',night:'noche',priceNote:'Disponibilidad e importe final confirmados directamente por Baptiste',travellers:'👥 Máx. 2 viajeros',bath:'🛁 Baño privado',kitchen:'🍽️ Cocina compartida',arrival:'🔑 Llegada autónoma',desc:'Una casa realmente habitada en Sarlat. Baptiste vive allí; el viajero dispone de habitación y baño privados, con cocina y comedor compartidos.',contact:'Contacto directo',payment:'Pago directo',paymentSub:'tras confirmación escrita',sheet:'Ficha completa',sheetSub:'calendario + reserva',open:'ABRIR FICHA / RESERVAR →',wa:'💬 WHATSAPP',galleryTitle:'Galería del alojamiento',close:'✕ Cerrar',real:'PRESENCIA REAL · SARLAT',caps:['Habitación privada','Habitación · otro ángulo','Cocina equipada','Comedor','Comedor · otra vista','Baño privado']},
    pt:{gallery:'📷 ABRIR GALERIA',eyebrow:'MEMBRO DIGIYLYFE · ALOJAMENTO DIRETO',sub:'Quarto privado em casa habitada · Sarlat-la-Canéda · Périgord Noir',night:'noite',priceNote:'Disponibilidade e valor final confirmados diretamente por Baptiste',travellers:'👥 Máx. 2 hóspedes',bath:'🛁 Casa de banho privativa',kitchen:'🍽️ Cozinha partilhada',arrival:'🔑 Check-in autónomo',desc:'Uma casa realmente habitada em Sarlat. Baptiste vive no local; o hóspede dispõe de quarto e casa de banho privativos, com cozinha e sala de jantar partilhadas.',contact:'Contacto direto',payment:'Pagamento direto',paymentSub:'após confirmação escrita',sheet:'Ficha completa',sheetSub:'calendário + reserva',open:'ABRIR FICHA / RESERVAR →',wa:'💬 WHATSAPP',galleryTitle:'Galeria do alojamento',close:'✕ Fechar',real:'PRESENÇA REAL · SARLAT',caps:['Quarto privado','Quarto · outro ângulo','Cozinha equipada','Sala de jantar','Sala de jantar · outra vista','Casa de banho privativa']},
    it:{gallery:'📷 APRI GALLERIA',eyebrow:'ADERENTE DIGIYLYFE · ALLOGGIO DIRETTO',sub:'Camera privata in casa abitata · Sarlat-la-Canéda · Périgord Noir',night:'notte',priceNote:'Disponibilità e importo finale confermati direttamente da Baptiste',travellers:'👥 Max 2 ospiti',bath:'🛁 Bagno privato',kitchen:'🍽️ Cucina condivisa',arrival:'🔑 Check-in autonomo',desc:'Una vera casa abitata a Sarlat. Baptiste vive sul posto; l’ospite dispone di camera e bagno privati, con cucina e sala da pranzo condivise.',contact:'Contatto diretto',payment:'Pagamento diretto',paymentSub:'dopo conferma scritta',sheet:'Scheda completa',sheetSub:'calendario + prenotazione',open:'APRI SCHEDA / PRENOTA →',wa:'💬 WHATSAPP',galleryTitle:'Galleria dell’alloggio',close:'✕ Chiudi',real:'PRESENZA REALE · SARLAT',caps:['Camera privata','Camera · altra angolazione','Cucina attrezzata','Sala da pranzo','Sala da pranzo · altra vista','Bagno privato']},
    de:{gallery:'📷 GALERIE ÖFFNEN',eyebrow:'DIGIYLYFE-MITGLIED · DIREKTE UNTERKUNFT',sub:'Privatzimmer im bewohnten Haus · Sarlat-la-Canéda · Périgord Noir',night:'Nacht',priceNote:'Verfügbarkeit und Endbetrag werden direkt von Baptiste bestätigt',travellers:'👥 Max. 2 Gäste',bath:'🛁 Privates Bad',kitchen:'🍽️ Gemeinschaftsküche',arrival:'🔑 Selbstständiger Check-in',desc:'Ein wirklich bewohntes Haus in Sarlat. Baptiste lebt vor Ort; Gäste haben ein privates Zimmer und Bad, Küche und Esszimmer werden geteilt.',contact:'Direktkontakt',payment:'Direktzahlung',paymentSub:'nach schriftlicher Bestätigung',sheet:'Komplette Seite',sheetSub:'Kalender + Buchung',open:'SEITE ÖFFNEN / BUCHEN →',wa:'💬 WHATSAPP',galleryTitle:'Unterkunftsgalerie',close:'✕ Schließen',real:'ECHTE PRÄSENZ · SARLAT',caps:['Privatzimmer','Zimmer · andere Ansicht','Ausgestattete Küche','Esszimmer','Esszimmer · andere Ansicht','Privates Bad']},
    nl:{gallery:'📷 GALERIJ OPENEN',eyebrow:'DIGIYLYFE-LID · DIRECTE ACCOMMODATIE',sub:'Privékamer in bewoond huis · Sarlat-la-Canéda · Périgord Noir',night:'nacht',priceNote:'Beschikbaarheid en eindbedrag worden rechtstreeks door Baptiste bevestigd',travellers:'👥 Max. 2 gasten',bath:'🛁 Eigen badkamer',kitchen:'🍽️ Gedeelde keuken',arrival:'🔑 Zelf inchecken',desc:'Een echt bewoond huis in Sarlat. Baptiste woont ter plaatse; gasten hebben een eigen kamer en badkamer, met gedeelde keuken en eetkamer.',contact:'Direct contact',payment:'Direct betalen',paymentSub:'na schriftelijke bevestiging',sheet:'Volledige fiche',sheetSub:'kalender + reservering',open:'FICHE OPENEN / RESERVEREN →',wa:'💬 WHATSAPP',galleryTitle:'Galerij van de accommodatie',close:'✕ Sluiten',real:'ECHTE AANWEZIGHEID · SARLAT',caps:['Privékamer','Kamer · andere hoek','Uitgeruste keuken','Eetkamer','Eetkamer · andere hoek','Eigen badkamer']},
    ar:{gallery:'📷 فتح معرض الصور',eyebrow:'عضو DIGIYLYFE · إقامة مباشرة',sub:'غرفة خاصة في منزل مأهول · سارلا لا كانيدا · بيريغور نوار',night:'ليلة',priceNote:'يؤكد بابتيست التوفر والمبلغ النهائي مباشرة',travellers:'👥 ضيفان كحد أقصى',bath:'🛁 حمام خاص',kitchen:'🍽️ مطبخ مشترك',arrival:'🔑 دخول ذاتي',desc:'منزل حقيقي مأهول في سارلا. يعيش بابتيست في المكان؛ وللضيف غرفة وحمام خاصان مع مطبخ وغرفة طعام مشتركتين.',contact:'تواصل مباشر',payment:'دفع مباشر',paymentSub:'بعد تأكيد كتابي',sheet:'الصفحة الكاملة',sheetSub:'تقويم + حجز',open:'فتح الصفحة / الحجز ←',wa:'💬 واتساب',galleryTitle:'معرض صور الإقامة',close:'✕ إغلاق',real:'حضور حقيقي · سارلا',caps:['الغرفة الخاصة','الغرفة · زاوية أخرى','مطبخ مجهز','غرفة الطعام','غرفة الطعام · منظر آخر','حمام خاص']}
  };

  function currentLang(){
    var q='';
    try{q=(new URLSearchParams(location.search).get('lang')||'').slice(0,2).toLowerCase();}catch(e){}
    var h=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();
    return T[q]?q:(T[h]?h:'fr');
  }
  function tr(){return T[currentLang()]||T.fr;}
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}

  function ensureStyle(){
    if(document.getElementById('digiySarlatBaptisteSignatureStyle'))return;
    var st=document.createElement('style');
    st.id='digiySarlatBaptisteSignatureStyle';
    st.textContent='\
.digiyBaptisteSignatureMount{grid-column:1/-1;width:100%;margin:12px 0}\
.digiyBaptisteSignatureCard{display:grid;grid-template-columns:34% 66%;min-height:410px;overflow:hidden;border-radius:24px;border:1px solid rgba(246,196,83,.46);background:radial-gradient(420px 240px at 90% 0,rgba(246,196,83,.10),transparent 64%),linear-gradient(145deg,#0a3726,#041912);box-shadow:0 20px 46px rgba(0,0,0,.24);color:#fffaf0;text-align:left}\
.digiyBaptisteSignatureVisual{position:relative;min-height:410px;padding:0;border:0;background:#04130d;overflow:hidden;cursor:pointer;color:inherit}.digiyBaptisteSignatureVisual img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .28s}.digiyBaptisteSignatureVisual:hover img{transform:scale(1.025)}.digiyBaptisteSignatureVisual:after{content:"";position:absolute;inset:auto 0 0;height:44%;background:linear-gradient(180deg,transparent,rgba(2,13,9,.84));pointer-events:none}\
.digiyBaptisteSignaturePhotoHint{position:absolute;z-index:2;left:10px;right:10px;bottom:10px;display:flex;align-items:center;justify-content:space-between;gap:8px;padding:9px 10px;border-radius:13px;border:1px solid rgba(255,255,255,.18);background:rgba(3,18,13,.83);font-size:10px;font-weight:1000}.digiyBaptisteSignaturePhotoHint em{font-style:normal;color:#ffe79e;font-size:9px}\
.digiyBaptisteSignatureInfo{padding:20px;display:flex;flex-direction:column;min-width:0}.digiyBaptisteSignatureEyebrow{color:#fde68a;font-size:9.5px;font-weight:1000;letter-spacing:.09em}.digiyBaptisteSignatureTitle{margin-top:7px;font-size:clamp(25px,4vw,39px);line-height:.98;letter-spacing:-.045em;font-weight:1000}.digiyBaptisteSignatureSub{margin-top:7px;color:rgba(255,250,240,.74);font-size:12px;line-height:1.35;font-weight:850}\
.digiyBaptisteSignaturePrice{display:flex;align-items:flex-end;gap:9px;flex-wrap:wrap;margin-top:14px}.digiyBaptisteSignaturePrice>b{color:#fff1bd;font-size:28px;line-height:.95}.digiyBaptisteSignaturePrice small{max-width:350px;color:rgba(255,250,240,.72);font-size:9.5px;line-height:1.35;font-weight:850}\
.digiyBaptisteSignatureChips{display:flex;flex-wrap:wrap;gap:6px;margin-top:13px}.digiyBaptisteSignatureChips span{padding:6px 8px;border-radius:999px;border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.055);font-size:9.5px;font-weight:900}.digiyBaptisteSignatureChips .green{border-color:rgba(34,197,94,.42);background:rgba(34,197,94,.09);color:#c8ffd8}\
.digiyBaptisteSignatureDesc{margin:13px 0 0;color:rgba(255,250,240,.82);font-size:11px;line-height:1.48;font-weight:780}.digiyBaptisteSignatureDirect{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin-top:13px;padding:10px 0;border-top:1px solid rgba(255,255,255,.10);border-bottom:1px solid rgba(255,255,255,.10)}.digiyBaptisteSignatureDirect div{text-align:center;padding:2px 4px}.digiyBaptisteSignatureDirect b{display:block;color:#d6ffe6;font-size:9.5px}.digiyBaptisteSignatureDirect span{display:block;margin-top:3px;color:rgba(255,250,240,.72);font-size:8.5px;line-height:1.25;font-weight:800}\
.digiyBaptisteSignatureActions{display:grid;grid-template-columns:1.35fr .85fr;gap:7px;margin-top:auto;padding-top:13px}.digiyBaptisteSignatureBtn{min-height:46px;padding:9px 10px;border-radius:13px;border:1px solid rgba(255,255,255,.15);display:flex;align-items:center;justify-content:center;text-align:center;font-size:9.5px;line-height:1.15;font-weight:1000;text-decoration:none}.digiyBaptisteSignatureBtn.primary{color:#06140f;background:linear-gradient(135deg,#fff1bd,#f6c453,#22c55e);border-color:rgba(246,196,83,.65)}.digiyBaptisteSignatureBtn.wa{color:#c8ffd8;background:rgba(34,197,94,.12);border-color:rgba(34,197,94,.36)}\
.digiyBaptisteSignatureRealLabel{display:inline-flex;margin:0 0 8px;padding:6px 9px;border-radius:999px;border:1px solid rgba(34,197,94,.42);background:rgba(34,197,94,.10);color:#caffdb;font-size:9px;font-weight:1000;letter-spacing:.06em}\
.digiyBaptisteGalleryOverlay{position:fixed;inset:0;z-index:99999;display:none;align-items:center;justify-content:center;padding:14px;background:rgba(0,0,0,.84);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}.digiyBaptisteGalleryOverlay.show{display:flex}.digiyBaptisteGalleryBox{width:min(980px,100%);border-radius:24px;overflow:hidden;border:1px solid rgba(255,255,255,.18);background:#020b08;box-shadow:0 30px 90px rgba(0,0,0,.60);color:#fff;text-align:left}.digiyBaptisteGalleryTop{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:11px 13px;border-bottom:1px solid rgba(255,255,255,.10)}.digiyBaptisteGalleryTop strong{display:block}.digiyBaptisteGalleryTop span{display:block;margin-top:3px;color:rgba(255,255,255,.7);font-size:10px}.digiyBaptisteGalleryClose{border:1px solid rgba(255,255,255,.16);border-radius:999px;padding:8px 11px;background:rgba(255,255,255,.07);color:#fff;font-weight:1000;cursor:pointer}.digiyBaptisteGalleryStage{position:relative;aspect-ratio:16/10;display:grid;place-items:center;background:#000}.digiyBaptisteGalleryStage img{width:100%;height:100%;object-fit:contain}.digiyBaptisteGalleryArrow{position:absolute;top:50%;transform:translateY(-50%);width:44px;height:44px;border-radius:50%;border:1px solid rgba(255,255,255,.22);background:rgba(2,12,9,.74);color:#fff;font-size:28px;cursor:pointer}.digiyBaptisteGalleryArrow.prev{left:9px}.digiyBaptisteGalleryArrow.next{right:9px}.digiyBaptisteGalleryBottom{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 13px;flex-wrap:wrap}.digiyBaptisteGalleryCounter{color:#ffe7a2;font-size:10px;font-weight:1000}.digiyBaptisteGalleryCaption{color:rgba(255,255,255,.7);font-size:10px;font-weight:850}.digiyBaptisteGalleryThumbs{display:flex;gap:7px;overflow-x:auto;padding:0 13px 13px;scrollbar-width:none}.digiyBaptisteGalleryThumbs::-webkit-scrollbar{display:none}.digiyBaptisteGalleryThumb{flex:0 0 82px;height:58px;padding:0;overflow:hidden;border-radius:10px;border:2px solid transparent;background:#0b1b15;cursor:pointer}.digiyBaptisteGalleryThumb.active{border-color:#f6c453}.digiyBaptisteGalleryThumb img{width:100%;height:100%;object-fit:cover}\
body.digiyBaptisteSignatureSarlat .realGrid{grid-template-columns:repeat(2,minmax(0,1fr))}\
@media(max-width:820px){body.digiyBaptisteSignatureSarlat .realGrid{grid-template-columns:repeat(2,minmax(0,1fr))}}\
@media(max-width:760px){.digiyBaptisteSignatureCard{grid-template-columns:1fr;min-height:0}.digiyBaptisteSignatureVisual{min-height:300px;aspect-ratio:4/3}.digiyBaptisteSignatureInfo{padding:16px 13px 13px}.digiyBaptisteSignatureActions{grid-template-columns:1fr}.digiyBaptisteSignatureDirect{grid-template-columns:1fr}.digiyBaptisteSignatureDirect div{text-align:left}.digiyBaptisteGalleryStage{aspect-ratio:4/3}}\
@media(max-width:540px){body.digiyBaptisteSignatureSarlat .realGrid{grid-template-columns:1fr}}';
    document.head.appendChild(st);
  }

  function cardHTML(withLabel){
    var t=tr();
    return (withLabel?'<div class="digiyBaptisteSignatureRealLabel" data-digiy-baptiste-t="real">'+esc(t.real)+'</div>':'')+
      '<article class="digiyBaptisteSignatureCard" data-digiy-baptiste-card>'+ 
      '<button class="digiyBaptisteSignatureVisual" type="button" data-digiy-baptiste-open aria-label="'+esc(t.gallery)+'">'+
      '<img src="'+PHOTOS[0]+'" alt="CHEZ BAPTISTE · SARLAT · chambre privée" loading="lazy" decoding="async">'+
      '<span class="digiyBaptisteSignaturePhotoHint"><b data-digiy-baptiste-t="gallery">'+esc(t.gallery)+'</b><em>6 PHOTOS →</em></span></button>'+
      '<div class="digiyBaptisteSignatureInfo"><span class="digiyBaptisteSignatureEyebrow" data-digiy-baptiste-t="eyebrow">'+esc(t.eyebrow)+'</span>'+
      '<strong class="digiyBaptisteSignatureTitle">CHEZ BAPTISTE · SARLAT</strong><span class="digiyBaptisteSignatureSub" data-digiy-baptiste-t="sub">'+esc(t.sub)+'</span>'+
      '<div class="digiyBaptisteSignaturePrice"><b>78 € / <span data-digiy-baptiste-t="night">'+esc(t.night)+'</span></b><small data-digiy-baptiste-t="priceNote">'+esc(t.priceNote)+'</small></div>'+
      '<div class="digiyBaptisteSignatureChips"><span data-digiy-baptiste-t="travellers">'+esc(t.travellers)+'</span><span data-digiy-baptiste-t="bath">'+esc(t.bath)+'</span><span data-digiy-baptiste-t="kitchen">'+esc(t.kitchen)+'</span><span data-digiy-baptiste-t="arrival">'+esc(t.arrival)+'</span><span>🕓 16 h → 22 h</span><span class="green">0 % commission DIGIYLYFE</span></div>'+
      '<p class="digiyBaptisteSignatureDesc" data-digiy-baptiste-t="desc">'+esc(t.desc)+'</p>'+
      '<div class="digiyBaptisteSignatureDirect"><div><b data-digiy-baptiste-t="contact">'+esc(t.contact)+'</b><span>WhatsApp</span></div><div><b data-digiy-baptiste-t="payment">'+esc(t.payment)+'</b><span data-digiy-baptiste-t="paymentSub">'+esc(t.paymentSub)+'</span></div><div><b data-digiy-baptiste-t="sheet">'+esc(t.sheet)+'</b><span data-digiy-baptiste-t="sheetSub">'+esc(t.sheetSub)+'</span></div></div>'+
      '<div class="digiyBaptisteSignatureActions"><a class="digiyBaptisteSignatureBtn primary" href="'+SHEET+'" target="_blank" rel="noopener" data-digiy-baptiste-t="open">'+esc(t.open)+'</a><a class="digiyBaptisteSignatureBtn wa" href="'+WA+'" target="_blank" rel="noopener" data-digiy-baptiste-t="wa">'+esc(t.wa)+'</a></div></div></article>';
  }

  function ensureGallery(){
    var existing=document.querySelector('[data-digiy-baptiste-gallery]');
    if(existing)return existing;
    var t=tr(),ov=document.createElement('div');
    ov.className='digiyBaptisteGalleryOverlay';ov.setAttribute('data-digiy-baptiste-gallery','1');ov.setAttribute('aria-hidden','true');
    ov.innerHTML='<div class="digiyBaptisteGalleryBox" role="dialog" aria-modal="true" aria-label="CHEZ BAPTISTE · SARLAT">'+
      '<div class="digiyBaptisteGalleryTop"><div><strong>CHEZ BAPTISTE · SARLAT</strong><span data-digiy-baptiste-t="galleryTitle">'+esc(t.galleryTitle)+'</span></div><button class="digiyBaptisteGalleryClose" type="button" data-digiy-baptiste-close data-digiy-baptiste-t="close">'+esc(t.close)+'</button></div>'+
      '<div class="digiyBaptisteGalleryStage"><img data-digiy-baptiste-image alt=""><button class="digiyBaptisteGalleryArrow prev" type="button" data-digiy-baptiste-prev aria-label="Previous">‹</button><button class="digiyBaptisteGalleryArrow next" type="button" data-digiy-baptiste-next aria-label="Next">›</button></div>'+
      '<div class="digiyBaptisteGalleryBottom"><div class="digiyBaptisteGalleryCounter" data-digiy-baptiste-counter></div><div class="digiyBaptisteGalleryCaption" data-digiy-baptiste-caption></div></div><div class="digiyBaptisteGalleryThumbs" data-digiy-baptiste-thumbs></div></div>';
    document.body.appendChild(ov);
    var img=ov.querySelector('[data-digiy-baptiste-image]'),counter=ov.querySelector('[data-digiy-baptiste-counter]'),caption=ov.querySelector('[data-digiy-baptiste-caption]'),thumbs=ov.querySelector('[data-digiy-baptiste-thumbs]'),cur=0;
    function render(){var tt=tr(),caps=tt.caps||T.fr.caps;img.src=PHOTOS[cur];img.alt=caps[cur]||'';counter.textContent=(cur+1)+' / '+PHOTOS.length;caption.textContent=caps[cur]||'';Array.prototype.forEach.call(thumbs.children,function(b,i){b.classList.toggle('active',i===cur);});}
    PHOTOS.forEach(function(src,i){var b=document.createElement('button');b.type='button';b.className='digiyBaptisteGalleryThumb';b.innerHTML='<img src="'+src+'" alt="" loading="lazy">';b.addEventListener('click',function(){cur=i;render();});thumbs.appendChild(b);});
    ov._digiyOpen=function(){ov.classList.add('show');ov.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';render();};
    function close(){ov.classList.remove('show');ov.setAttribute('aria-hidden','true');document.body.style.overflow='';}
    ov.querySelector('[data-digiy-baptiste-close]').addEventListener('click',close);
    ov.querySelector('[data-digiy-baptiste-prev]').addEventListener('click',function(){cur=(cur-1+PHOTOS.length)%PHOTOS.length;render();});
    ov.querySelector('[data-digiy-baptiste-next]').addEventListener('click',function(){cur=(cur+1)%PHOTOS.length;render();});
    ov.addEventListener('click',function(e){if(e.target===ov)close();});
    document.addEventListener('keydown',function(e){if(!ov.classList.contains('show'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft'){cur=(cur-1+PHOTOS.length)%PHOTOS.length;render();}if(e.key==='ArrowRight'){cur=(cur+1)%PHOTOS.length;render();}});
    render();return ov;
  }

  function bindCard(mount){
    var btn=mount&&mount.querySelector('[data-digiy-baptiste-open]');if(!btn||btn.dataset.digiyBound==='1')return;
    btn.dataset.digiyBound='1';btn.addEventListener('click',function(){var g=ensureGallery();if(g&&g._digiyOpen)g._digiyOpen();});
  }
  function applyLang(){
    var t=tr();
    document.querySelectorAll('[data-digiy-baptiste-t]').forEach(function(el){var k=el.getAttribute('data-digiy-baptiste-t');if(t[k]!=null)el.textContent=t[k];});
    var ov=document.querySelector('[data-digiy-baptiste-gallery]');if(ov){var cap=ov.querySelector('[data-digiy-baptiste-caption]'),img=ov.querySelector('[data-digiy-baptiste-image]'),idx=PHOTOS.indexOf(img&&img.src);if(idx<0)idx=0;var caps=t.caps||T.fr.caps;if(cap)cap.textContent=caps[idx]||'';}
  }

  function mountHome(){
    var grid=document.querySelector('.proofGrid');if(!grid)return false;
    if(grid.querySelector('[data-digiy-baptiste-mount="home"]'))return true;
    var old=grid.querySelector('a.proofCard[href*="part-chez-baptiste.digiylyfe.com"]');
    if(!old){Array.prototype.some.call(grid.querySelectorAll('a.proofCard'),function(a){if(/chez\s+baptiste/i.test(a.textContent||'')){old=a;return true;}return false;});}
    if(!old)return false;
    var m=document.createElement('div');m.className='digiyBaptisteSignatureMount';m.setAttribute('data-digiy-baptiste-mount','home');m.style.gridColumn='1/-1';m.innerHTML=cardHTML(false);old.replaceWith(m);bindCard(m);return true;
  }

  function mountLoc(){
    if(!/loc\.digiylyfe\.com$/i.test(location.hostname))return false;
    if(document.querySelector('[data-digiy-baptiste-mount="loc"]'))return true;
    var link=document.querySelector('article.listing a[href*="sarlat-chez-baptiste.digiylyfe.com"]');if(!link)return false;
    var old=link.closest('article.listing');if(!old)return false;
    var m=document.createElement('div');m.className='digiyBaptisteSignatureMount';m.setAttribute('data-digiy-baptiste-mount','loc');m.innerHTML=cardHTML(false);old.replaceWith(m);bindCard(m);return true;
  }

  function mountSarlat(){
    if(!/\/sarlat\.html$/i.test(location.pathname))return false;
    var grid=document.querySelector('.realGrid');if(!grid)return false;
    if(document.querySelector('[data-digiy-baptiste-mount="sarlat"]'))return true;
    var old=grid.querySelector('a.real[href*="sarlat-chez-baptiste.digiylyfe.com"]');if(!old)return false;
    old.remove();document.body.classList.add('digiyBaptisteSignatureSarlat');
    var m=document.createElement('div');m.className='digiyBaptisteSignatureMount';m.setAttribute('data-digiy-baptiste-mount','sarlat');m.innerHTML=cardHTML(true);grid.insertAdjacentElement('afterend',m);bindCard(m);return true;
  }

  function territoryWanted(){
    if(!/\/territoire\.html$/i.test(location.pathname))return false;
    var p;try{p=new URLSearchParams(location.search);}catch(e){return false;}
    if((p.get('zone')||'')!=='vallee-dordogne')return false;
    if((p.get('need')||'')!=='accommodation')return false;
    var local=(p.get('local')||'').toLowerCase().replace(/[^a-z0-9-]/g,'');
    return !local||local==='sarlat'||local==='sarlat-la-caneda';
  }
  function syncTerritory(){
    var existing=document.querySelector('[data-digiy-baptiste-mount="territory"]');
    if(!territoryWanted()){if(existing)existing.remove();return false;}
    if(existing){applyLang();return true;}
    var results=document.getElementById('results'),section=document.getElementById('resultsSection');if(!results||!section)return false;
    var m=document.createElement('div');m.className='digiyBaptisteSignatureMount';m.setAttribute('data-digiy-baptiste-mount','territory');m.innerHTML=cardHTML(true);section.insertBefore(m,results);bindCard(m);return true;
  }

  function boot(){
    ensureStyle();
    mountHome();mountLoc();mountSarlat();syncTerritory();applyLang();
    document.addEventListener('click',function(e){if(e.target&&e.target.closest&&e.target.closest('#needs,#zones,[data-lang],[data-l],.langBtn'))setTimeout(function(){syncTerritory();applyLang();},120);});
    window.addEventListener('popstate',function(){setTimeout(function(){syncTerritory();applyLang();},50);});
    try{new MutationObserver(function(){applyLang();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});}catch(e){}
    setTimeout(function(){mountHome();mountLoc();mountSarlat();syncTerritory();applyLang();},350);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
