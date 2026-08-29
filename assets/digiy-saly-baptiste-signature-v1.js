/* DIGIYLYFE — Carte Vitrine DIGIY · CHEZ BAPTISTE SALY V1
 * Validation humaine : 28 août 2026.
 * MASTER : une photo principale. MAÎTRE : le propriétaire confirme disponibilité, dates et montant final.
 * Carte = visage. Fiche métier existante = calendrier / réservation / paiement direct.
 */
(function(){
  'use strict';
  if(window.DIGIY_SALY_BAPTISTE_SIGNATURE_V1)return;
  window.DIGIY_SALY_BAPTISTE_SIGNATURE_V1=true;

  var SHEET='https://part-chez-baptiste.digiylyfe.com/';
  var WA='https://wa.me/221771342889?text='+encodeURIComponent('Bonjour, je viens de DIGIYLYFE pour une demande de séjour chez Baptiste à Saly.');
  var PHOTO='https://orange-pig-270004.hostingersite.com/wp-content/uploads/2025/06/042-BAPTISTE.png';
  var T={
    fr:{photo:'🖼️ AGRANDIR LA PHOTO',eyebrow:'ADHÉRENT DIGIYLYFE · HÉBERGEMENT DIRECT',sub:'Appartement · Location meublée · Saly Joseph · Petite Côte',night:'nuit',priceNote:'Disponibilité, dates et montant final confirmés directement par le propriétaire',cap:'👥 4 personnes max.',week:'📅 175 000 FCFA / semaine',month:'🗓️ 550 000 FCFA / mois',power:'⚡ Sénélec en sus',desc:'Appartement confortable dans un quartier paisible de Saly, pour un séjour en famille ou entre amis.',contact:'Contact direct',payment:'Paiement direct',paymentSub:'au propriétaire après confirmation',sheet:'Fiche métier',sheetSub:'calendrier + réservation',open:'OUVRIR LA FICHE / RÉSERVER →',wa:'💬 WHATSAPP',close:'✕ Fermer',photoTitle:'Photo principale du logement'},
    en:{photo:'🖼️ ENLARGE PHOTO',eyebrow:'DIGIYLYFE MEMBER · DIRECT ACCOMMODATION',sub:'Furnished apartment · Saly Joseph · Petite Côte',night:'night',priceNote:'Availability, dates and final amount confirmed directly by the owner',cap:'👥 Max. 4 guests',week:'📅 175,000 FCFA / week',month:'🗓️ 550,000 FCFA / month',power:'⚡ Electricity extra',desc:'Comfortable apartment in a peaceful area of Saly, for a stay with family or friends.',contact:'Direct contact',payment:'Direct payment',paymentSub:'to the owner after confirmation',sheet:'Full listing',sheetSub:'calendar + booking',open:'OPEN LISTING / BOOK →',wa:'💬 WHATSAPP',close:'✕ Close',photoTitle:'Main accommodation photo'},
    es:{photo:'🖼️ AMPLIAR FOTO',eyebrow:'MIEMBRO DIGIYLYFE · ALOJAMIENTO DIRECTO',sub:'Apartamento amueblado · Saly Joseph · Petite Côte',night:'noche',priceNote:'Disponibilidad, fechas e importe final confirmados directamente por el propietario',cap:'👥 Máx. 4 personas',week:'📅 175 000 FCFA / semana',month:'🗓️ 550 000 FCFA / mes',power:'⚡ Electricidad aparte',desc:'Apartamento confortable en una zona tranquila de Saly, para una estancia en familia o con amigos.',contact:'Contacto directo',payment:'Pago directo',paymentSub:'al propietario tras confirmación',sheet:'Ficha completa',sheetSub:'calendario + reserva',open:'ABRIR FICHA / RESERVAR →',wa:'💬 WHATSAPP',close:'✕ Cerrar',photoTitle:'Foto principal del alojamiento'},
    pt:{photo:'🖼️ AMPLIAR FOTO',eyebrow:'MEMBRO DIGIYLYFE · ALOJAMENTO DIRETO',sub:'Apartamento mobilado · Saly Joseph · Petite Côte',night:'noite',priceNote:'Disponibilidade, datas e valor final confirmados diretamente pelo proprietário',cap:'👥 Máx. 4 hóspedes',week:'📅 175 000 FCFA / semana',month:'🗓️ 550 000 FCFA / mês',power:'⚡ Eletricidade à parte',desc:'Apartamento confortável numa zona tranquila de Saly, para uma estadia em família ou com amigos.',contact:'Contacto direto',payment:'Pagamento direto',paymentSub:'ao proprietário após confirmação',sheet:'Ficha completa',sheetSub:'calendário + reserva',open:'ABRIR FICHA / RESERVAR →',wa:'💬 WHATSAPP',close:'✕ Fechar',photoTitle:'Foto principal do alojamento'},
    it:{photo:'🖼️ INGRANDISCI FOTO',eyebrow:'ADERENTE DIGIYLYFE · ALLOGGIO DIRETTO',sub:'Appartamento arredato · Saly Joseph · Petite Côte',night:'notte',priceNote:'Disponibilità, date e importo finale confermati direttamente dal proprietario',cap:'👥 Max 4 ospiti',week:'📅 175 000 FCFA / settimana',month:'🗓️ 550 000 FCFA / mese',power:'⚡ Elettricità esclusa',desc:'Appartamento confortevole in una zona tranquilla di Saly, per un soggiorno in famiglia o con amici.',contact:'Contatto diretto',payment:'Pagamento diretto',paymentSub:'al proprietario dopo conferma',sheet:'Scheda completa',sheetSub:'calendario + prenotazione',open:'APRI SCHEDA / PRENOTA →',wa:'💬 WHATSAPP',close:'✕ Chiudi',photoTitle:'Foto principale dell’alloggio'},
    de:{photo:'🖼️ FOTO VERGRÖSSERN',eyebrow:'DIGIYLYFE-MITGLIED · DIREKTE UNTERKUNFT',sub:'Möblierte Wohnung · Saly Joseph · Petite Côte',night:'Nacht',priceNote:'Verfügbarkeit, Daten und Endbetrag werden direkt vom Eigentümer bestätigt',cap:'👥 Max. 4 Gäste',week:'📅 175.000 FCFA / Woche',month:'🗓️ 550.000 FCFA / Monat',power:'⚡ Strom extra',desc:'Komfortable Wohnung in einer ruhigen Gegend von Saly, für einen Aufenthalt mit Familie oder Freunden.',contact:'Direktkontakt',payment:'Direktzahlung',paymentSub:'an den Eigentümer nach Bestätigung',sheet:'Komplette Seite',sheetSub:'Kalender + Buchung',open:'SEITE ÖFFNEN / BUCHEN →',wa:'💬 WHATSAPP',close:'✕ Schließen',photoTitle:'Hauptfoto der Unterkunft'},
    nl:{photo:'🖼️ FOTO VERGROTEN',eyebrow:'DIGIYLYFE-LID · DIRECTE ACCOMMODATIE',sub:'Gemeubileerd appartement · Saly Joseph · Petite Côte',night:'nacht',priceNote:'Beschikbaarheid, data en eindbedrag worden rechtstreeks door de eigenaar bevestigd',cap:'👥 Max. 4 gasten',week:'📅 175.000 FCFA / week',month:'🗓️ 550.000 FCFA / maand',power:'⚡ Elektriciteit apart',desc:'Comfortabel appartement in een rustige wijk van Saly, voor een verblijf met familie of vrienden.',contact:'Direct contact',payment:'Direct betalen',paymentSub:'aan de eigenaar na bevestiging',sheet:'Volledige fiche',sheetSub:'kalender + reservering',open:'FICHE OPENEN / RESERVEREN →',wa:'💬 WHATSAPP',close:'✕ Sluiten',photoTitle:'Hoofdfoto van de accommodatie'},
    ar:{photo:'🖼️ تكبير الصورة',eyebrow:'عضو DIGIYLYFE · إقامة مباشرة',sub:'شقة مفروشة · سالي جوزيف · الساحل الصغير',night:'ليلة',priceNote:'يؤكد المالك التوفر والتواريخ والمبلغ النهائي مباشرة',cap:'👥 4 ضيوف كحد أقصى',week:'📅 175 000 FCFA / أسبوع',month:'🗓️ 550 000 FCFA / شهر',power:'⚡ الكهرباء إضافية',desc:'شقة مريحة في حي هادئ في سالي، مناسبة للإقامة مع العائلة أو الأصدقاء.',contact:'تواصل مباشر',payment:'دفع مباشر',paymentSub:'للمالك بعد التأكيد',sheet:'الصفحة الكاملة',sheetSub:'تقويم + حجز',open:'فتح الصفحة / الحجز ←',wa:'💬 واتساب',close:'✕ إغلاق',photoTitle:'الصورة الرئيسية للسكن'}
  };

  function lang(){
    var q='';
    try{q=(new URLSearchParams(location.search).get('lang')||'').slice(0,2).toLowerCase();}catch(e){}
    var h=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();
    return T[q]?q:(T[h]?h:'fr');
  }
  function tr(){return T[lang()]||T.fr;}
  function esc(v){return String(v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}

  function ensureStyle(){
    if(document.getElementById('digiySalyBaptisteSignatureStyle'))return;
    var s=document.createElement('style');s.id='digiySalyBaptisteSignatureStyle';s.textContent='\
.digiySalyMount{grid-column:1/-1;width:100%;margin:12px 0}.digiySalyCard{display:grid;grid-template-columns:34% 66%;min-height:410px;overflow:hidden;border-radius:24px;border:1px solid rgba(246,196,83,.46);background:radial-gradient(420px 240px at 90% 0,rgba(246,196,83,.10),transparent 64%),linear-gradient(145deg,#0a3726,#041912);box-shadow:0 20px 46px rgba(0,0,0,.24);color:#fffaf0;text-align:left}.digiySalyVisual{position:relative;min-height:410px;padding:0;border:0;background:#04130d;overflow:hidden;cursor:pointer;color:inherit}.digiySalyVisual img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .28s}.digiySalyVisual:hover img{transform:scale(1.025)}.digiySalyVisual:after{content:"";position:absolute;inset:auto 0 0;height:44%;background:linear-gradient(180deg,transparent,rgba(2,13,9,.84));pointer-events:none}.digiySalyHint{position:absolute;z-index:2;left:10px;right:10px;bottom:10px;display:flex;align-items:center;justify-content:space-between;gap:8px;padding:9px 10px;border-radius:13px;border:1px solid rgba(255,255,255,.18);background:rgba(3,18,13,.83);font-size:10px;font-weight:1000}.digiySalyHint em{font-style:normal;color:#ffe79e;font-size:9px}.digiySalyInfo{padding:20px;display:flex;flex-direction:column;min-width:0}.digiySalyEyebrow{color:#fde68a;font-size:9.5px;font-weight:1000;letter-spacing:.09em}.digiySalyTitle{margin-top:7px;font-size:clamp(25px,4vw,39px);line-height:.98;letter-spacing:-.045em;font-weight:1000}.digiySalySub{margin-top:7px;color:rgba(255,250,240,.74);font-size:12px;line-height:1.35;font-weight:850}.digiySalyPrice{display:flex;align-items:flex-end;gap:9px;flex-wrap:wrap;margin-top:14px}.digiySalyPrice>b{color:#fff1bd;font-size:28px;line-height:.95}.digiySalyPrice small{max-width:360px;color:rgba(255,250,240,.72);font-size:9.5px;line-height:1.35;font-weight:850}.digiySalyChips{display:flex;flex-wrap:wrap;gap:6px;margin-top:13px}.digiySalyChips span{padding:6px 8px;border-radius:999px;border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.055);font-size:9.5px;font-weight:900}.digiySalyChips .green{border-color:rgba(34,197,94,.42);background:rgba(34,197,94,.09);color:#c8ffd8}.digiySalyChips .gold{border-color:rgba(246,196,83,.42);background:rgba(246,196,83,.08);color:#ffeaa5}.digiySalyDesc{margin:13px 0 0;color:rgba(255,250,240,.82);font-size:11px;line-height:1.48;font-weight:780}.digiySalyDirect{display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin-top:13px;padding:10px 0;border-top:1px solid rgba(255,255,255,.10);border-bottom:1px solid rgba(255,255,255,.10)}.digiySalyDirect div{text-align:center;padding:2px 4px}.digiySalyDirect b{display:block;color:#d6ffe6;font-size:9.5px}.digiySalyDirect span{display:block;margin-top:3px;color:rgba(255,250,240,.72);font-size:8.5px;line-height:1.25;font-weight:800}.digiySalyActions{display:grid;grid-template-columns:1.35fr .85fr;gap:7px;margin-top:auto;padding-top:13px}.digiySalyBtn{min-height:46px;padding:9px 10px;border-radius:13px;border:1px solid rgba(255,255,255,.15);display:flex;align-items:center;justify-content:center;text-align:center;font-size:9.5px;line-height:1.15;font-weight:1000;text-decoration:none}.digiySalyBtn.primary{color:#06140f;background:linear-gradient(135deg,#fff1bd,#f6c453,#22c55e);border-color:rgba(246,196,83,.65)}.digiySalyBtn.wa{color:#c8ffd8;background:rgba(34,197,94,.12);border-color:rgba(34,197,94,.36)}.digiySalyOverlay{position:fixed;inset:0;z-index:99999;display:none;align-items:center;justify-content:center;padding:14px;background:rgba(0,0,0,.86);backdrop-filter:blur(8px)}.digiySalyOverlay.show{display:flex}.digiySalyBox{width:min(980px,100%);overflow:hidden;border-radius:24px;border:1px solid rgba(255,255,255,.18);background:#020b08;box-shadow:0 30px 90px rgba(0,0,0,.60);color:#fff}.digiySalyTop{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:11px 13px;border-bottom:1px solid rgba(255,255,255,.10)}.digiySalyTop strong{display:block}.digiySalyTop span{display:block;margin-top:3px;color:rgba(255,255,255,.7);font-size:10px}.digiySalyClose{border:1px solid rgba(255,255,255,.16);border-radius:999px;padding:8px 11px;background:rgba(255,255,255,.07);color:#fff;font-weight:1000;cursor:pointer}.digiySalyStage{aspect-ratio:16/10;display:grid;place-items:center;background:#000}.digiySalyStage img{width:100%;height:100%;object-fit:contain;display:block}@media(max-width:760px){.digiySalyCard{grid-template-columns:1fr;min-height:0}.digiySalyVisual{min-height:300px;aspect-ratio:4/3}.digiySalyInfo{padding:16px 13px 13px}.digiySalyActions{grid-template-columns:1fr}.digiySalyDirect{grid-template-columns:1fr}.digiySalyDirect div{text-align:left}.digiySalyStage{aspect-ratio:4/3}}';
    document.head.appendChild(s);
  }

  function cardHTML(){
    var t=tr();
    return '<article class="digiySalyCard" aria-label="Carte Vitrine DIGIY · Chez Baptiste Saly">'+
      '<button class="digiySalyVisual" type="button" data-digiy-saly-photo aria-label="'+esc(t.photo)+'"><img src="'+PHOTO+'" alt="Chez Baptiste · appartement à Saly" loading="lazy" decoding="async"><span class="digiySalyHint"><b data-saly-t="photo">'+esc(t.photo)+'</b><em>1 PHOTO · MASTER</em></span></button>'+
      '<div class="digiySalyInfo"><span class="digiySalyEyebrow" data-saly-t="eyebrow">'+esc(t.eyebrow)+'</span><strong class="digiySalyTitle">CHEZ BAPTISTE · SALY</strong><span class="digiySalySub" data-saly-t="sub">'+esc(t.sub)+'</span>'+
      '<div class="digiySalyPrice"><b>30 000 FCFA / <span data-saly-t="night">'+esc(t.night)+'</span></b><small data-saly-t="priceNote">'+esc(t.priceNote)+'</small></div>'+
      '<div class="digiySalyChips"><span data-saly-t="cap">'+esc(t.cap)+'</span><span data-saly-t="week">'+esc(t.week)+'</span><span data-saly-t="month">'+esc(t.month)+'</span><span class="gold" data-saly-t="power">'+esc(t.power)+'</span><span class="green">0 % commission DIGIYLYFE</span></div>'+
      '<p class="digiySalyDesc" data-saly-t="desc">'+esc(t.desc)+'</p><div class="digiySalyDirect"><div><b data-saly-t="contact">'+esc(t.contact)+'</b><span>WhatsApp</span></div><div><b data-saly-t="payment">'+esc(t.payment)+'</b><span data-saly-t="paymentSub">'+esc(t.paymentSub)+'</span></div><div><b data-saly-t="sheet">'+esc(t.sheet)+'</b><span data-saly-t="sheetSub">'+esc(t.sheetSub)+'</span></div></div>'+
      '<div class="digiySalyActions"><a class="digiySalyBtn primary" href="'+SHEET+'" target="_blank" rel="noopener" data-saly-t="open">'+esc(t.open)+'</a><a class="digiySalyBtn wa" href="'+WA+'" target="_blank" rel="noopener" data-saly-t="wa">'+esc(t.wa)+'</a></div></div></article>';
  }

  function ensureOverlay(){
    var ov=document.querySelector('[data-digiy-saly-overlay]');if(ov)return ov;
    var t=tr();ov=document.createElement('div');ov.className='digiySalyOverlay';ov.setAttribute('data-digiy-saly-overlay','1');ov.setAttribute('aria-hidden','true');
    ov.innerHTML='<div class="digiySalyBox" role="dialog" aria-modal="true"><div class="digiySalyTop"><div><strong>CHEZ BAPTISTE · SALY</strong><span data-saly-t="photoTitle">'+esc(t.photoTitle)+'</span></div><button class="digiySalyClose" type="button" data-digiy-saly-close data-saly-t="close">'+esc(t.close)+'</button></div><div class="digiySalyStage"><img src="'+PHOTO+'" alt="Chez Baptiste · appartement à Saly"></div></div>';
    document.body.appendChild(ov);
    function close(){ov.classList.remove('show');ov.setAttribute('aria-hidden','true');document.body.style.overflow='';}
    ov.querySelector('[data-digiy-saly-close]').addEventListener('click',close);ov.addEventListener('click',function(e){if(e.target===ov)close();});document.addEventListener('keydown',function(e){if(e.key==='Escape'&&ov.classList.contains('show'))close();});return ov;
  }
  function bind(m){
    var b=m.querySelector('[data-digiy-saly-photo]');if(!b||b.dataset.bound)return;b.dataset.bound='1';b.addEventListener('click',function(){var ov=ensureOverlay();ov.classList.add('show');ov.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';});
  }
  function makeMount(where){var m=document.createElement('div');m.className='digiySalyMount';m.setAttribute('data-digiy-saly-mount',where);m.innerHTML=cardHTML();bind(m);return m;}

  function mountHome(){
    if(!/^(\/|\/index\.html)$/i.test(location.pathname))return false;
    var grid=document.querySelector('.proofGrid');if(!grid||grid.querySelector('[data-digiy-saly-mount]'))return !!grid;
    var sarlat=grid.querySelector('[data-digiy-baptiste-mount="home"]');
    if(sarlat){sarlat.insertAdjacentElement('afterend',makeMount('home'));return true;}
    var old=grid.querySelector('a.proofCard[href*="part-chez-baptiste.digiylyfe.com"]');if(old){old.replaceWith(makeMount('home'));return true;}
    return false;
  }
  function mountLoc(){
    if(!/loc\.digiylyfe\.com$/i.test(location.hostname))return false;
    if(document.querySelector('[data-digiy-saly-mount="loc"]'))return true;
    var link=document.querySelector('article.listing a[href*="part-chez-baptiste.digiylyfe.com"]');if(!link)return false;
    var old=link.closest('article.listing');if(!old)return false;old.replaceWith(makeMount('loc'));return true;
  }
  function findReal(container){
    if(!container)return null;var a=container.querySelector('a[href*="part-chez-baptiste.digiylyfe.com"]');if(a)return a.closest('.real,.card,article,div');
    var nodes=container.querySelectorAll('.real,.card,article');for(var i=0;i<nodes.length;i++){var tx=(nodes[i].textContent||'').toLowerCase();if(tx.indexOf('chez baptiste')>=0&&tx.indexOf('saly')>=0)return nodes[i];}return null;
  }
  function mountSaly(){
    if(!/\/saly\.html$/i.test(location.pathname))return false;
    var grid=document.getElementById('realGrid');if(!grid||document.querySelector('[data-digiy-saly-mount="saly"]'))return !!grid;
    var old=findReal(grid);if(!old)return false;old.replaceWith(makeMount('saly'));return true;
  }
  function mountTerritory(){
    if(!/\/territoire\.html$/i.test(location.pathname))return false;
    var p=new URLSearchParams(location.search),zone=p.get('zone')||'',local=p.get('local')||'',need=p.get('need')||'';
    if(zone!=='petite-cote'||(need&&need!=='accommodation'))return false;
    var grid=document.getElementById('results');if(!grid||document.querySelector('[data-digiy-saly-mount="territory"]'))return !!grid;
    var old=findReal(grid);if(!old)return false;old.replaceWith(makeMount('territory'));return true;
  }
  function applyLang(){var t=tr();document.querySelectorAll('[data-saly-t]').forEach(function(el){var k=el.getAttribute('data-saly-t');if(t[k]!=null)el.textContent=t[k];});}
  function refresh(){ensureStyle();mountHome();mountLoc();mountSaly();mountTerritory();applyLang();}
  function watch(id){var el=document.getElementById(id);if(!el)return;new MutationObserver(function(){setTimeout(refresh,0);}).observe(el,{childList:true,subtree:true});}

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){refresh();watch('realGrid');watch('results');});else{refresh();watch('realGrid');watch('results');}
  window.addEventListener('load',refresh);window.addEventListener('popstate',function(){setTimeout(refresh,0);});
  document.addEventListener('click',function(e){if(e.target.closest('[data-lang],[data-l],.langBtn'))setTimeout(function(){applyLang();refresh();},0);});
  try{new MutationObserver(function(){applyLang();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});}catch(e){}
  var tries=0,timer=setInterval(function(){refresh();if(++tries>24)clearInterval(timer);},250);
})();
