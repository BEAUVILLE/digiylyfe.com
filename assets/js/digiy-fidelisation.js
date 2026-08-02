/* DIGIYLYFE — vitrine territoriale mondiale + fidélisation relationnelle */
(function(){
  'use strict';
  if(window.__DIGIY_FIDELISATION__)return;
  window.__DIGIY_FIDELISATION__=true;

  var COPY={
    fr:{label:'FIDÉLISATION · CONTACT DIRECT',title:'Votre client peut revenir directement vers vous.',text:'DIGIYLYFE ne sert pas seulement à vous rendre visible. Votre fiche, votre lien et votre QR permettent à un client satisfait de vous retrouver, de vous recontacter et de vous recommander facilement.',quote:'Les réseaux diffusent. Votre fiche reste accessible. Le QR DIGIY prépare le retour du client.',items:['Contact direct avec le professionnel','Fiche et QR faciles à conserver et partager','Recommandation entre clients et professionnels','Paiement direct au professionnel','0 % de commission DIGIY']},
    en:{label:'LOYALTY · DIRECT CONTACT',title:'Your customer can come back to you directly.',text:'DIGIYLYFE does more than make you visible. Your profile, link and QR help a satisfied customer find you again, contact you directly and recommend you easily.',quote:'Social networks spread the word. Your profile stays available. The DIGIY QR prepares the customer’s return.',items:['Direct contact with the professional','Profile and QR easy to save and share','Recommendations between customers and professionals','Direct payment to the professional','0% DIGIY commission']}
  };

  var TERRITORY_COPY={
    fr:{eyebrow:'MOTEUR TERRITORIAL MONDIAL',title:'Un HUB mondial. Des portes territoriales. Des besoins locaux. Un contact direct.',text:'Choisissez d’abord votre territoire. DIGIYLYFE vous conduit ensuite vers le besoin, la zone locale et les professionnels réellement basés ou intervenant sur le terrain.',route:'Territoire → Besoin → Zone → Professionnel → Contact direct',proof:'Premières portes vivantes du réseau mondial DIGIYLYFE',pcCountry:'SÉNÉGAL',pc:'DIGIY PETITE CÔTE',pcSub:'AIBD · Ndayane · Popenguine · Somone · Ngaparou · Saly · Mbour',ddCountry:'FRANCE',dd:'DIGIY VALLÉE DE LA DORDOGNE',ddSub:'Sarlat · communes et villages du territoire',open:'OUVRIR LE TERRITOIRE',future:'D’autres territoires rejoindront progressivement le réseau.',doctrine:'0 % commission · Contact direct · Le professionnel garde la main.'},
    en:{eyebrow:'GLOBAL TERRITORIAL ENGINE',title:'One global HUB. Territorial doors. Local needs. Direct contact.',text:'Choose your territory first. DIGIYLYFE then guides you to the need, the local area and professionals who are genuinely based there or serve that area.',route:'Territory → Need → Area → Professional → Direct contact',proof:'The first living doors of the global DIGIYLYFE network',pcCountry:'SENEGAL',pc:'DIGIY PETITE CÔTE',pcSub:'AIBD · Ndayane · Popenguine · Somone · Ngaparou · Saly · Mbour',ddCountry:'FRANCE',dd:'DIGIY DORDOGNE VALLEY',ddSub:'Sarlat · towns and villages across the territory',open:'OPEN TERRITORY',future:'More territories will gradually join the network.',doctrine:'0% commission · Direct contact · The professional stays in control.'},
    es:{eyebrow:'MOTOR TERRITORIAL MUNDIAL',title:'Un HUB mundial. Puertas territoriales. Necesidades locales. Contacto directo.',text:'Elige primero tu territorio. DIGIYLYFE te guía después hacia la necesidad, la zona local y los profesionales que trabajan realmente allí.',route:'Territorio → Necesidad → Zona → Profesional → Contacto directo',proof:'Las primeras puertas vivas de la red mundial DIGIYLYFE',pcCountry:'SENEGAL',pc:'DIGIY PETITE CÔTE',pcSub:'AIBD · Ndayane · Popenguine · Somone · Ngaparou · Saly · Mbour',ddCountry:'FRANCIA',dd:'DIGIY VALLE DEL DORDOÑA',ddSub:'Sarlat · municipios y pueblos del territorio',open:'ABRIR EL TERRITORIO',future:'Otros territorios se incorporarán progresivamente a la red.',doctrine:'0 % de comisión · Contacto directo · El profesional mantiene el control.'},
    de:{eyebrow:'WELTWEITER REGIONALMOTOR',title:'Ein globaler HUB. Regionale Zugänge. Lokale Bedürfnisse. Direkter Kontakt.',text:'Wähle zuerst deine Region. DIGIYLYFE führt dich dann zum Bedarf, zum lokalen Gebiet und zu den Profis, die dort tatsächlich ansässig oder tätig sind.',route:'Region → Bedarf → Gebiet → Profi → Direkter Kontakt',proof:'Die ersten lebendigen Zugänge des weltweiten DIGIYLYFE-Netzwerks',pcCountry:'SENEGAL',pc:'DIGIY PETITE CÔTE',pcSub:'AIBD · Ndayane · Popenguine · Somone · Ngaparou · Saly · Mbour',ddCountry:'FRANKREICH',dd:'DIGIY DORDOGNE-TAL',ddSub:'Sarlat · Gemeinden und Dörfer der Region',open:'REGION ÖFFNEN',future:'Weitere Regionen werden sich dem Netzwerk schrittweise anschließen.',doctrine:'0 % Provision · Direkter Kontakt · Der Profi behält die Kontrolle.'},
    it:{eyebrow:'MOTORE TERRITORIALE MONDIALE',title:'Un HUB mondiale. Porte territoriali. Bisogni locali. Contatto diretto.',text:'Scegli prima il territorio. DIGIYLYFE ti guida poi verso il bisogno, la zona locale e i professionisti realmente presenti o attivi sul territorio.',route:'Territorio → Bisogno → Zona → Professionista → Contatto diretto',proof:'Le prime porte vive della rete mondiale DIGIYLYFE',pcCountry:'SENEGAL',pc:'DIGIY PETITE CÔTE',pcSub:'AIBD · Ndayane · Popenguine · Somone · Ngaparou · Saly · Mbour',ddCountry:'FRANCIA',dd:'DIGIY VALLE DELLA DORDOGNA',ddSub:'Sarlat · comuni e villaggi del territorio',open:'APRI IL TERRITORIO',future:'Altri territori entreranno progressivamente nella rete.',doctrine:'0 % commissioni · Contatto diretto · Il professionista mantiene il controllo.'},
    nl:{eyebrow:'WERELDWIJDE GEBIEDSMOTOR',title:'Eén wereldwijde HUB. Territoriale ingangen. Lokale behoeften. Rechtstreeks contact.',text:'Kies eerst je gebied. DIGIYLYFE leidt je daarna naar de behoefte, de lokale zone en professionals die daar echt gevestigd of actief zijn.',route:'Gebied → Behoefte → Zone → Professional → Rechtstreeks contact',proof:'De eerste levende ingangen van het wereldwijde DIGIYLYFE-netwerk',pcCountry:'SENEGAL',pc:'DIGIY PETITE CÔTE',pcSub:'AIBD · Ndayane · Popenguine · Somone · Ngaparou · Saly · Mbour',ddCountry:'FRANKRIJK',dd:'DIGIY DORDOGNEVALLEI',ddSub:'Sarlat · gemeenten en dorpen in het gebied',open:'OPEN HET GEBIED',future:'Meer gebieden zullen geleidelijk tot het netwerk toetreden.',doctrine:'0% commissie · Rechtstreeks contact · De professional houdt de regie.'},
    ar:{eyebrow:'محرك إقليمي عالمي',title:'مركز عالمي واحد. بوابات إقليمية. احتياجات محلية. تواصل مباشر.',text:'اختر منطقتك أولاً. بعد ذلك يوجّهك DIGIYLYFE إلى حاجتك والمنطقة المحلية والمهنيين الموجودين أو العاملين فعلاً على الأرض.',route:'المنطقة ← الحاجة ← النطاق المحلي ← المهني ← تواصل مباشر',proof:'أول بوابات حية في شبكة DIGIYLYFE العالمية',pcCountry:'السنغال',pc:'DIGIY الساحل الصغير',pcSub:'AIBD · Ndayane · Popenguine · Somone · Ngaparou · Saly · Mbour',ddCountry:'فرنسا',dd:'DIGIY وادي دوردوني',ddSub:'سارلا · مدن وقرى المنطقة',open:'فتح المنطقة',future:'ستنضم مناطق أخرى تدريجياً إلى الشبكة.',doctrine:'عمولة 0٪ · تواصل مباشر · المهني يبقى صاحب القرار.'}
  };

  function lang(){
    var value=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();
    return TERRITORY_COPY[value]?value:'fr';
  }

  function renderTerritories(){
    var t=TERRITORY_COPY[lang()]||TERRITORY_COPY.fr;
    var box=document.getElementById('digiy-territories-showcase');
    if(!box)return;
    box.dir=lang()==='ar'?'rtl':'ltr';
    Object.keys(t).forEach(function(key){
      var nodes=box.querySelectorAll('[data-ter="'+key+'"]');
      Array.prototype.forEach.call(nodes,function(node){node.textContent=t[key];});
    });
  }

  function installTerritories(){
    if(document.getElementById('digiy-territories-showcase')){renderTerritories();return;}
    var hub=document.querySelector('.hub');
    if(!hub)return;
    var style=document.createElement('style');
    style.id='digiy-territories-showcase-style';
    style.textContent='.territoryShowcase{position:relative;overflow:hidden;margin:8px 0 18px;padding:clamp(20px,4vw,34px);border:3px solid rgba(246,196,83,.86);border-radius:34px;background:radial-gradient(720px 330px at 4% 0,rgba(246,196,83,.26),transparent 64%),radial-gradient(720px 330px at 96% 100%,rgba(34,197,94,.27),transparent 64%),linear-gradient(145deg,#09271a,#04130d 75%);box-shadow:0 30px 76px rgba(0,0,0,.42);color:#fff}.territoryShowcase:before{content:"";position:absolute;inset:10px;border:1px solid rgba(255,255,255,.10);border-radius:25px;pointer-events:none}.territoryShowcaseHead{position:relative;z-index:1;max-width:900px;margin:auto;text-align:center}.territoryShowcaseEyebrow{display:inline-flex;padding:8px 12px;border-radius:999px;border:1px solid rgba(134,239,172,.46);background:rgba(34,197,94,.11);color:#bbf7d0;font-size:10px;font-weight:1000;letter-spacing:.12em}.territoryShowcase h2{margin:13px auto 0;max-width:900px;color:#fff3cf;font-size:clamp(34px,7vw,68px);line-height:.91;letter-spacing:-.055em;font-weight:1000}.territoryShowcaseText{margin:15px auto 0;max-width:820px;color:rgba(255,250,240,.84);font-size:clamp(14px,3vw,18px);line-height:1.48;font-weight:880}.territoryRoute{display:inline-flex;margin-top:14px;padding:9px 13px;border-radius:999px;border:1px dashed rgba(246,196,83,.62);background:rgba(246,196,83,.09);color:#fff3cf;font-size:11px;line-height:1.25;font-weight:1000}.territoryProof{margin-top:18px;color:#86efac;font-size:10px;font-weight:1000;letter-spacing:.10em}.territoryCards{position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr;gap:14px;max-width:940px;margin:13px auto 0}.territoryCard{min-height:220px;padding:19px;border:2px solid rgba(255,255,255,.15);border-radius:27px;background:radial-gradient(430px 180px at 100% 0,rgba(246,196,83,.18),transparent 65%),rgba(255,255,255,.065);display:flex;flex-direction:column;color:#fff;text-decoration:none;box-shadow:0 18px 42px rgba(0,0,0,.24);transition:transform .16s ease,border-color .16s ease}.territoryCard:hover{transform:translateY(-3px);border-color:rgba(246,196,83,.76)}.territoryCardTop{display:flex;align-items:center;gap:12px}.territoryFlag{width:58px;height:58px;border-radius:19px;display:grid;place-items:center;background:rgba(255,255,255,.10);border:1px solid rgba(255,255,255,.13);font-size:31px}.territoryCountry{color:#86efac;font-size:9px;font-weight:1000;letter-spacing:.13em}.territoryCard h3{margin:8px 0 0;color:#fff3cf;font-size:clamp(20px,3.5vw,30px);line-height:.98;font-weight:1000}.territoryCard p{margin:15px 0 0;color:rgba(255,250,240,.74);font-size:12px;line-height:1.45;font-weight:850}.territoryCardOpen{margin-top:auto;padding-top:17px;color:#bbf7d0;font-size:11px;font-weight:1000;letter-spacing:.08em}.territoryShowcaseFoot{position:relative;z-index:1;display:flex;justify-content:center;gap:8px;flex-wrap:wrap;margin-top:16px}.territoryShowcaseFoot span{padding:7px 10px;border-radius:999px;border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.055);font-size:9.5px;font-weight:950;color:#eafff3}@media(max-width:720px){.territoryShowcase{padding:20px 13px;border-radius:27px}.territoryShowcase:before{inset:7px;border-radius:21px}.territoryShowcase h2{font-size:40px}.territoryRoute{font-size:9.5px}.territoryCards{grid-template-columns:1fr}.territoryCard{min-height:180px;border-radius:22px}.territoryShowcaseFoot{display:grid;grid-template-columns:1fr;text-align:center}}';
    document.head.appendChild(style);
    var section=document.createElement('section');
    section.id='digiy-territories-showcase';
    section.className='territoryShowcase';
    section.setAttribute('aria-label','Moteur territorial mondial DIGIYLYFE');
    section.innerHTML='<div class="territoryShowcaseHead"><span class="territoryShowcaseEyebrow" data-ter="eyebrow"></span><h2 data-ter="title"></h2><p class="territoryShowcaseText" data-ter="text"></p><span class="territoryRoute" data-ter="route"></span><div class="territoryProof" data-ter="proof"></div></div><div class="territoryCards"><a class="territoryCard" href="https://digiy-hub.digiylyfe.com/territoire.html?zone=petite-cote"><div class="territoryCardTop"><span class="territoryFlag">🇸🇳</span><span><span class="territoryCountry" data-ter="pcCountry"></span><h3 data-ter="pc"></h3></span></div><p data-ter="pcSub"></p><span class="territoryCardOpen" data-ter="open"></span></a><a class="territoryCard" href="https://digiy-hub.digiylyfe.com/territoire.html?zone=vallee-dordogne"><div class="territoryCardTop"><span class="territoryFlag">🇫🇷</span><span><span class="territoryCountry" data-ter="ddCountry"></span><h3 data-ter="dd"></h3></span></div><p data-ter="ddSub"></p><span class="territoryCardOpen" data-ter="open"></span></a></div><div class="territoryShowcaseFoot"><span data-ter="doctrine"></span><span data-ter="future"></span></div>';
    hub.insertAdjacentElement('beforebegin',section);
    renderTerritories();
  }

  function renderFidelisation(){
    var t=COPY[lang()]||COPY.fr;
    var box=document.getElementById('digiy-fidelisation');
    if(!box)return;
    box.querySelector('[data-fid="label"]').textContent=t.label;
    box.querySelector('[data-fid="title"]').textContent=t.title;
    box.querySelector('[data-fid="text"]').textContent=t.text;
    box.querySelector('[data-fid="quote"]').textContent=t.quote;
    box.querySelector('[data-fid="items"]').innerHTML=t.items.map(function(item){return '<span><b aria-hidden="true">✓</b>'+item+'</span>';}).join('');
  }

  function installFidelisation(){
    if(document.getElementById('digiy-fidelisation')){renderFidelisation();return;}
    var anchor=document.querySelector('.hubHead');
    if(!anchor)return;
    var style=document.createElement('style');
    style.id='digiy-fidelisation-style';
    style.textContent='.fidelisationBox{position:relative;z-index:1;max-width:900px;margin:18px auto 0;padding:18px;border-radius:26px;border:2px solid rgba(246,196,83,.82);background:radial-gradient(520px 220px at 100% 0,rgba(246,196,83,.28),transparent 64%),radial-gradient(420px 210px at 0 100%,rgba(45,212,191,.20),transparent 65%),linear-gradient(145deg,rgba(11,82,52,.98),rgba(4,25,18,.99));box-shadow:0 20px 48px rgba(0,0,0,.34);text-align:left}.fidelisationLabel{display:inline-flex;padding:7px 11px;border-radius:999px;border:1px solid rgba(255,241,189,.72);background:rgba(246,196,83,.14);color:#fff3cf;font-size:10px;font-weight:1000;letter-spacing:.09em}.fidelisationBox h2{margin:11px 0 7px;color:#fffaf0;font-size:clamp(26px,5.4vw,42px);line-height:.96;font-weight:1000;letter-spacing:-.045em}.fidelisationBox p{margin:0;color:rgba(255,250,240,.84);font-size:13px;line-height:1.45;font-weight:900}.fidelisationQuote{margin-top:12px!important;padding:11px 13px;border-radius:17px;border:1px dashed rgba(246,196,83,.62);background:rgba(246,196,83,.10);color:#fff3cf!important;text-align:center;font-weight:1000!important}.fidelisationItems{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:7px;margin-top:11px}.fidelisationItems span{min-height:58px;padding:9px;border-radius:15px;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.065);display:flex;align-items:center;gap:7px;color:#eafff3;font-size:10.5px;line-height:1.25;font-weight:950}.fidelisationItems b{color:#bdf7d2;font-size:16px}@media(max-width:760px){.fidelisationItems{grid-template-columns:repeat(2,minmax(0,1fr))}.fidelisationItems span:last-child{grid-column:1/-1}}@media(max-width:420px){.fidelisationBox{margin-top:15px;padding:14px 12px;border-radius:22px}.fidelisationBox h2{font-size:27px}.fidelisationItems{grid-template-columns:1fr}.fidelisationItems span:last-child{grid-column:auto}}';
    document.head.appendChild(style);
    var section=document.createElement('section');
    section.id='digiy-fidelisation';
    section.className='fidelisationBox';
    section.setAttribute('aria-label','Fidélisation client DIGIYLYFE');
    section.innerHTML='<span class="fidelisationLabel" data-fid="label"></span><h2 data-fid="title"></h2><p data-fid="text"></p><p class="fidelisationQuote" data-fid="quote"></p><div class="fidelisationItems" data-fid="items"></div>';
    anchor.insertAdjacentElement('afterend',section);
    renderFidelisation();
  }

  function renderAll(){renderTerritories();renderFidelisation();}
  function init(){
    installTerritories();
    installFidelisation();
    document.querySelectorAll('.langBtn').forEach(function(btn){btn.addEventListener('click',function(){setTimeout(renderAll,0);});});
    new MutationObserver(renderAll).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
