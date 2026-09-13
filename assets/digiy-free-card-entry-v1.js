/* DIGIYLYFE · carte gratuite visible dès l'entrée · 2026-09-13 */
(function(){
  'use strict';
  if(window.DIGIY_FREE_CARD_ENTRY_V1)return;
  window.DIGIY_FREE_CARD_ENTRY_V1=true;

  var LANGS=['fr','en','es','pt','it','de','nl','ar'];
  var COPY={
    fr:{mini:'PREMIÈRE MARCHE · RÉSEAU OUVERT',homeTitle:'Votre carte de visite DIGIY est gratuite.',homeText:'Entrez dans DIGIYLYFE avec votre identité, votre métier, votre territoire et votre contact direct. Sans publicité · 0 % commission.',locMini:'AVANT DIGIY LOC · ENTRÉE GRATUITE',locTitle:'Commencez par votre carte DIGIY gratuite.',locText:'Votre carte vous fait entrer dans le réseau. Si la location correspond à votre activité, poursuivez ensuite vers DIGIY LOC et ses outils de réservation directe à 0 % de commission.',cta:'DEMANDER MA CARTE DIGIY GRATUITE →'},
    en:{mini:'FIRST STEP · OPEN NETWORK',homeTitle:'Your DIGIY business card is free.',homeText:'Join DIGIYLYFE with your identity, activity, territory and direct contact. No advertising · 0% commission.',locMini:'BEFORE DIGIY LOC · FREE ENTRY',locTitle:'Start with your free DIGIY card.',locText:'Your card gets you into the network. If rentals fit your business, continue to DIGIY LOC with direct-booking tools and 0% commission.',cta:'REQUEST MY FREE DIGIY CARD →'},
    es:{mini:'PRIMER PASO · RED ABIERTA',homeTitle:'Su tarjeta de visita DIGIY es gratuita.',homeText:'Entre en DIGIYLYFE con su identidad, actividad, territorio y contacto directo. Sin publicidad · 0 % comisión.',locMini:'ANTES DE DIGIY LOC · ENTRADA GRATUITA',locTitle:'Empiece con su tarjeta DIGIY gratuita.',locText:'La tarjeta le permite entrar en la red. Si el alquiler corresponde a su actividad, continúe con DIGIY LOC y sus herramientas de reserva directa con 0 % de comisión.',cta:'SOLICITAR MI TARJETA DIGIY GRATUITA →'},
    pt:{mini:'PRIMEIRO PASSO · REDE ABERTA',homeTitle:'O seu cartão de visita DIGIY é gratuito.',homeText:'Entre na DIGIYLYFE com identidade, atividade, território e contacto direto. Sem publicidade · 0% comissão.',locMini:'ANTES DO DIGIY LOC · ENTRADA GRATUITA',locTitle:'Comece com o seu cartão DIGIY gratuito.',locText:'O cartão permite entrar na rede. Se o alojamento faz parte da sua atividade, continue para o DIGIY LOC com reserva direta e 0% de comissão.',cta:'PEDIR O MEU CARTÃO DIGIY GRATUITO →'},
    it:{mini:'PRIMO PASSO · RETE APERTA',homeTitle:'Il vostro biglietto da visita DIGIY è gratuito.',homeText:'Entrate in DIGIYLYFE con identità, attività, territorio e contatto diretto. Nessuna pubblicità · 0% commissioni.',locMini:'PRIMA DI DIGIY LOC · INGRESSO GRATUITO',locTitle:'Iniziate con la vostra carta DIGIY gratuita.',locText:'La carta vi fa entrare nella rete. Se le locazioni fanno parte della vostra attività, proseguite con DIGIY LOC, prenotazione diretta e 0% commissioni.',cta:'RICHIEDI LA MIA CARTA DIGIY GRATUITA →'},
    de:{mini:'ERSTER SCHRITT · OFFENES NETZWERK',homeTitle:'Ihre DIGIY-Visitenkarte ist kostenlos.',homeText:'Starten Sie bei DIGIYLYFE mit Identität, Tätigkeit, Region und direktem Kontakt. Keine Werbung · 0 % Provision.',locMini:'VOR DIGIY LOC · KOSTENLOSER EINSTIEG',locTitle:'Starten Sie mit Ihrer kostenlosen DIGIY-Karte.',locText:'Die Karte bringt Sie ins Netzwerk. Wenn Vermietung zu Ihrem Geschäft gehört, gehen Sie anschließend zu DIGIY LOC mit Direktbuchung und 0 % Provision.',cta:'KOSTENLOSE DIGIY-KARTE ANFORDERN →'},
    nl:{mini:'EERSTE STAP · OPEN NETWERK',homeTitle:'Uw DIGIY-visitekaart is gratis.',homeText:'Kom in DIGIYLYFE met uw identiteit, activiteit, regio en direct contact. Geen reclame · 0% commissie.',locMini:'VÓÓR DIGIY LOC · GRATIS INSTAP',locTitle:'Begin met uw gratis DIGIY-kaart.',locText:'Met de kaart komt u in het netwerk. Past verhuur bij uw activiteit, ga dan verder met DIGIY LOC, directe boekingen en 0% commissie.',cta:'MIJN GRATIS DIGIY-KAART AANVRAGEN →'},
    ar:{mini:'الخطوة الأولى · شبكة مفتوحة',homeTitle:'بطاقة DIGIY المهنية مجانية.',homeText:'ادخل شبكة DIGIYLYFE بهويتك المهنية ونشاطك ومنطقتك ووسيلة الاتصال المباشر. بدون إعلانات · عمولة 0٪.',locMini:'قبل DIGIY LOC · دخول مجاني',locTitle:'ابدأ ببطاقة DIGIY المجانية.',locText:'تُدخلك البطاقة إلى الشبكة. وإذا كان التأجير جزءًا من نشاطك، يمكنك بعد ذلك الانتقال إلى DIGIY LOC مع الحجز المباشر وعمولة 0٪.',cta:'اطلب بطاقة DIGIY المجانية ←'}
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
  function style(){
    if(document.getElementById('digiyFreeCardEntryStyle'))return;
    var s=document.createElement('style');s.id='digiyFreeCardEntryStyle';
    s.textContent='.digiyFreeCardEntry{margin:0 0 14px;padding:18px;border:2px solid rgba(246,196,83,.72);border-radius:26px;background:linear-gradient(145deg,rgba(246,196,83,.16),rgba(45,212,191,.11),rgba(255,255,255,.045));box-shadow:0 18px 44px rgba(0,0,0,.24);text-align:center;color:#fffaf0}.digiyFreeCardEntry .freeMini{display:inline-flex;padding:6px 10px;border-radius:999px;border:1px solid rgba(45,212,191,.52);background:rgba(45,212,191,.09);color:#c9fff7;font-size:9.5px;font-weight:1000;letter-spacing:.07em;text-transform:uppercase}.digiyFreeCardEntry h2{margin:10px auto 0;max-width:760px;font-size:clamp(24px,5vw,36px);line-height:1.03;font-weight:1000;letter-spacing:-.03em}.digiyFreeCardEntry p{margin:9px auto 0;max-width:790px;color:#dce9e3;font-size:12px;line-height:1.5;font-weight:850}.digiyFreeCardEntry .freeCta{display:flex;align-items:center;justify-content:center;width:min(100%,540px);min-height:56px;margin:14px auto 0;padding:12px 17px;border-radius:999px;background:linear-gradient(135deg,#fff1bd,#f6c453,#22c55e);color:#06140f;border:1px solid rgba(255,241,189,.80);font-size:12px;line-height:1.2;font-weight:1000;box-shadow:0 12px 28px rgba(0,0,0,.24);text-decoration:none}.digiyFreeCardEntry[dir="rtl"]{direction:rtl}';
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
  function mount(){
    var p=location.pathname.replace(/\/+$/,'')||'/';
    var mode=(/\/tarifs-loc\.html$/i.test(p))?'loc':((p==='/'||/\/index\.html$/i.test(p))?'home':'');
    if(!mode)return;
    if(document.getElementById('digiyFreeCardEntry'))return;
    style();
    var box=document.createElement('section');box.id='digiyFreeCardEntry';box.className='digiyFreeCardEntry';box.setAttribute('data-digiy-free-card-entry','1');
    var anchor=mode==='loc'?document.querySelector('.langs'):document.getElementById('digiyInstallBand');
    if(anchor)anchor.insertAdjacentElement('afterend',box);else{var m=document.querySelector('main');if(m)m.insertAdjacentElement('afterbegin',box);else document.body.insertAdjacentElement('afterbegin',box)}
    render(box,mode);
    var selector=mode==='loc'?'.lang':'.langBtn';
    document.querySelectorAll(selector).forEach(function(b){b.addEventListener('click',function(){setTimeout(function(){render(box,mode)},20)})});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
