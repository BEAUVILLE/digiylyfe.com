/* DIGIYLYFE — moteur territorial mondial + fidélisation */
(function(){
  'use strict';
  if(window.__DIGIY_HOME_TERRITORY_V2__)return;
  window.__DIGIY_HOME_TERRITORY_V2__=true;

  var TERRITORIES={
    fr:{eyebrow:'MOTEUR TERRITORIAL MONDIAL',title:'DIGIYLYFE — HUB MONDIAL',lead:'Un HUB mondial. Des portes territoriales. Des besoins locaux. Un contact direct.',text:'Choisissez d’abord votre territoire. DIGIYLYFE vous conduit ensuite vers le besoin, la zone locale et les professionnels réellement basés ou intervenant sur le terrain.',route:'Territoire → Besoin → Zone → Professionnel → Contact direct',pcCountry:'SÉNÉGAL',pc:'DIGIY PETITE CÔTE',pcSub:'AIBD · Ndayane · Popenguine · Somone · Ngaparou · Saly · Mbour',ddCountry:'FRANCE',dd:'DIGIY VALLÉE DE LA DORDOGNE',ddSub:'Sarlat · communes et villages du territoire',open:'OUVRIR LE TERRITOIRE',doctrine:'0 % commission · Contact direct · Le professionnel garde la main.',future:'D’autres territoires rejoindront progressivement le réseau.'},
    en:{eyebrow:'GLOBAL TERRITORIAL ENGINE',title:'DIGIYLYFE — GLOBAL HUB',lead:'One global HUB. Territorial doors. Local needs. Direct contact.',text:'Choose your territory first. DIGIYLYFE then guides you to the need, the local area and professionals who are genuinely based there or serve that area.',route:'Territory → Need → Area → Professional → Direct contact',pcCountry:'SENEGAL',pc:'DIGIY PETITE CÔTE',pcSub:'AIBD · Ndayane · Popenguine · Somone · Ngaparou · Saly · Mbour',ddCountry:'FRANCE',dd:'DIGIY DORDOGNE VALLEY',ddSub:'Sarlat · towns and villages across the territory',open:'OPEN TERRITORY',doctrine:'0% commission · Direct contact · The professional stays in control.',future:'More territories will gradually join the network.'},
    es:{eyebrow:'MOTOR TERRITORIAL MUNDIAL',title:'DIGIYLYFE — HUB MUNDIAL',lead:'Un HUB mundial. Puertas territoriales. Necesidades locales. Contacto directo.',text:'Elige primero tu territorio. DIGIYLYFE te guía después hacia la necesidad, la zona local y los profesionales que trabajan realmente allí.',route:'Territorio → Necesidad → Zona → Profesional → Contacto directo',pcCountry:'SENEGAL',pc:'DIGIY PETITE CÔTE',pcSub:'AIBD · Ndayane · Popenguine · Somone · Ngaparou · Saly · Mbour',ddCountry:'FRANCIA',dd:'DIGIY VALLE DEL DORDOÑA',ddSub:'Sarlat · municipios y pueblos del territorio',open:'ABRIR EL TERRITORIO',doctrine:'0 % de comisión · Contacto directo · El profesional mantiene el control.',future:'Otros territorios se incorporarán progresivamente a la red.'},
    de:{eyebrow:'WELTWEITER REGIONALMOTOR',title:'DIGIYLYFE — GLOBALER HUB',lead:'Ein globaler HUB. Regionale Zugänge. Lokale Bedürfnisse. Direkter Kontakt.',text:'Wähle zuerst deine Region. DIGIYLYFE führt dich dann zum Bedarf, zum lokalen Gebiet und zu den Profis, die dort tatsächlich ansässig oder tätig sind.',route:'Region → Bedarf → Gebiet → Profi → Direkter Kontakt',pcCountry:'SENEGAL',pc:'DIGIY PETITE CÔTE',pcSub:'AIBD · Ndayane · Popenguine · Somone · Ngaparou · Saly · Mbour',ddCountry:'FRANKREICH',dd:'DIGIY DORDOGNE-TAL',ddSub:'Sarlat · Gemeinden und Dörfer der Region',open:'REGION ÖFFNEN',doctrine:'0 % Provision · Direkter Kontakt · Der Profi behält die Kontrolle.',future:'Weitere Regionen werden sich dem Netzwerk schrittweise anschließen.'},
    it:{eyebrow:'MOTORE TERRITORIALE MONDIALE',title:'DIGIYLYFE — HUB MONDIALE',lead:'Un HUB mondiale. Porte territoriali. Bisogni locali. Contatto diretto.',text:'Scegli prima il territorio. DIGIYLYFE ti guida poi verso il bisogno, la zona locale e i professionisti realmente presenti o attivi sul territorio.',route:'Territorio → Bisogno → Zona → Professionista → Contatto diretto',pcCountry:'SENEGAL',pc:'DIGIY PETITE CÔTE',pcSub:'AIBD · Ndayane · Popenguine · Somone · Ngaparou · Saly · Mbour',ddCountry:'FRANCIA',dd:'DIGIY VALLE DELLA DORDOGNA',ddSub:'Sarlat · comuni e villaggi del territorio',open:'APRI IL TERRITORIO',doctrine:'0 % commissioni · Contatto diretto · Il professionista mantiene il controllo.',future:'Altri territori entreranno progressivamente nella rete.'},
    nl:{eyebrow:'WERELDWIJDE GEBIEDSMOTOR',title:'DIGIYLYFE — WERELDWIJDE HUB',lead:'Eén wereldwijde HUB. Territoriale ingangen. Lokale behoeften. Rechtstreeks contact.',text:'Kies eerst je gebied. DIGIYLYFE leidt je daarna naar de behoefte, de lokale zone en professionals die daar echt gevestigd of actief zijn.',route:'Gebied → Behoefte → Zone → Professional → Rechtstreeks contact',pcCountry:'SENEGAL',pc:'DIGIY PETITE CÔTE',pcSub:'AIBD · Ndayane · Popenguine · Somone · Ngaparou · Saly · Mbour',ddCountry:'FRANKRIJK',dd:'DIGIY DORDOGNEVALLEI',ddSub:'Sarlat · gemeenten en dorpen in het gebied',open:'OPEN HET GEBIED',doctrine:'0% commissie · Rechtstreeks contact · De professional houdt de regie.',future:'Meer gebieden zullen geleidelijk tot het netwerk toetreden.'},
    ar:{eyebrow:'محرك إقليمي عالمي',title:'DIGIYLYFE — مركز عالمي',lead:'مركز عالمي واحد. بوابات إقليمية. احتياجات محلية. تواصل مباشر.',text:'اختر منطقتك أولاً. بعد ذلك يوجّهك DIGIYLYFE إلى حاجتك والمنطقة المحلية والمهنيين الموجودين أو العاملين فعلاً على الأرض.',route:'المنطقة ← الحاجة ← النطاق المحلي ← المهني ← تواصل مباشر',pcCountry:'السنغال',pc:'DIGIY الساحل الصغير',pcSub:'AIBD · Ndayane · Popenguine · Somone · Ngaparou · Saly · Mbour',ddCountry:'فرنسا',dd:'DIGIY وادي دوردوني',ddSub:'سارلا · مدن وقرى المنطقة',open:'فتح المنطقة',doctrine:'عمولة 0٪ · تواصل مباشر · المهني يبقى صاحب القرار.',future:'ستنضم مناطق أخرى تدريجياً إلى الشبكة.'}
  };

  var FID={
    fr:{label:'FIDÉLISATION · CONTACT DIRECT',title:'Votre client peut revenir directement vers vous.',text:'Votre fiche, votre lien et votre QR permettent à un client satisfait de vous retrouver, de vous recontacter et de vous recommander facilement.',quote:'Les réseaux diffusent. Votre fiche reste accessible. Le QR DIGIY prépare le retour du client.',items:['Contact direct avec le professionnel','Fiche et QR faciles à conserver','Recommandation simple','Paiement direct','0 % de commission DIGIY']},
    en:{label:'LOYALTY · DIRECT CONTACT',title:'Your customer can come back to you directly.',text:'Your profile, link and QR help a satisfied customer find you again, contact you directly and recommend you easily.',quote:'Social networks spread the word. Your profile stays available. The DIGIY QR prepares the customer’s return.',items:['Direct contact','Profile and QR easy to save','Easy recommendation','Direct payment','0% DIGIY commission']}
  };

  function lang(){
    var value=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();
    return TERRITORIES[value]?value:'fr';
  }
  function fill(root,prefix,data){
    Object.keys(data).forEach(function(key){
      root.querySelectorAll('[data-'+prefix+'="'+key+'"]').forEach(function(node){node.textContent=data[key];});
    });
  }
  function addStyle(){
    if(document.getElementById('digiy-home-territory-style'))return;
    var style=document.createElement('style');
    style.id='digiy-home-territory-style';
    style.textContent='\
      .territoryShowcase{position:relative;overflow:hidden;margin:6px 0 22px;padding:clamp(22px,4.5vw,40px);border:3px solid rgba(246,196,83,.92);border-radius:36px;background:radial-gradient(760px 350px at 4% 0,rgba(246,196,83,.29),transparent 64%),radial-gradient(760px 350px at 96% 100%,rgba(34,197,94,.30),transparent 64%),linear-gradient(145deg,#09271a,#04130d 76%);box-shadow:0 34px 86px rgba(0,0,0,.46);color:#fff}.territoryShowcase:before{content:"";position:absolute;inset:10px;border:1px solid rgba(255,255,255,.11);border-radius:27px;pointer-events:none}.territoryShowcaseHead{position:relative;z-index:1;max-width:920px;margin:auto;text-align:center}.territoryShowcaseEyebrow{display:inline-flex;padding:8px 13px;border-radius:999px;border:1px solid rgba(134,239,172,.50);background:rgba(34,197,94,.12);color:#bbf7d0;font-size:10px;font-weight:1000;letter-spacing:.13em}.territoryShowcase h2{margin:14px auto 0;color:#fff3cf;font-size:clamp(42px,8vw,76px);line-height:.88;letter-spacing:-.06em;font-weight:1000}.territoryShowcaseLead{margin:14px auto 0;color:#fff;font-size:clamp(18px,3.5vw,25px);line-height:1.18;font-weight:1000;max-width:900px}.territoryShowcaseText{margin:13px auto 0;max-width:820px;color:rgba(255,250,240,.82);font-size:clamp(13px,2.7vw,17px);line-height:1.48;font-weight:850}.territoryRoute{display:inline-flex;margin-top:15px;padding:10px 14px;border-radius:999px;border:1px dashed rgba(246,196,83,.68);background:rgba(246,196,83,.10);color:#fff3cf;font-size:11px;font-weight:1000}.territoryCards{position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr;gap:16px;max-width:960px;margin:20px auto 0}.territoryCard{min-height:230px;padding:21px;border:2px solid rgba(255,255,255,.17);border-radius:28px;background:radial-gradient(450px 190px at 100% 0,rgba(246,196,83,.20),transparent 65%),rgba(255,255,255,.07);display:flex;flex-direction:column;color:#fff;text-decoration:none;box-shadow:0 20px 46px rgba(0,0,0,.26);transition:transform .16s ease,border-color .16s ease}.territoryCard:hover{transform:translateY(-3px);border-color:rgba(246,196,83,.82)}.territoryCardTop{display:flex;align-items:center;gap:13px}.territoryFlag{width:62px;height:62px;border-radius:20px;display:grid;place-items:center;background:rgba(255,255,255,.11);border:1px solid rgba(255,255,255,.14);font-size:33px}.territoryCountry{color:#86efac;font-size:9px;font-weight:1000;letter-spacing:.14em}.territoryCard h3{margin:8px 0 0;color:#fff3cf;font-size:clamp(22px,3.8vw,32px);line-height:.96;font-weight:1000}.territoryCard p{margin:17px 0 0;color:rgba(255,250,240,.76);font-size:12px;line-height:1.48;font-weight:850}.territoryCardOpen{margin-top:auto;padding-top:18px;color:#bbf7d0;font-size:11px;font-weight:1000;letter-spacing:.08em}.territoryShowcaseFoot{position:relative;z-index:1;display:flex;justify-content:center;gap:9px;flex-wrap:wrap;margin-top:18px}.territoryShowcaseFoot span{padding:8px 11px;border-radius:999px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.06);font-size:9.5px;font-weight:950;color:#eafff3}.fidelisationBox{position:relative;z-index:1;max-width:900px;margin:18px auto 0;padding:18px;border-radius:26px;border:2px solid rgba(246,196,83,.82);background:linear-gradient(145deg,rgba(11,82,52,.98),rgba(4,25,18,.99));box-shadow:0 20px 48px rgba(0,0,0,.34);text-align:left}.fidelisationLabel{display:inline-flex;padding:7px 11px;border-radius:999px;border:1px solid rgba(255,241,189,.72);background:rgba(246,196,83,.14);color:#fff3cf;font-size:10px;font-weight:1000;letter-spacing:.09em}.fidelisationBox h2{margin:11px 0 7px;font-size:clamp(26px,5.4vw,42px);line-height:.96;font-weight:1000}.fidelisationBox p{margin:0;color:rgba(255,250,240,.84);font-size:13px;line-height:1.45;font-weight:900}.fidelisationQuote{margin-top:12px!important;padding:11px 13px;border-radius:17px;border:1px dashed rgba(246,196,83,.62);background:rgba(246,196,83,.10);color:#fff3cf!important;text-align:center}.fidelisationItems{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:7px;margin-top:11px}.fidelisationItems span{min-height:58px;padding:9px;border-radius:15px;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.065);display:flex;align-items:center;gap:7px;color:#eafff3;font-size:10.5px;font-weight:950}.fidelisationItems b{color:#bdf7d2;font-size:16px}@media(max-width:720px){.territoryShowcase{padding:22px 13px;border-radius:28px}.territoryShowcase:before{inset:7px;border-radius:21px}.territoryShowcase h2{font-size:46px}.territoryShowcaseLead{font-size:20px}.territoryRoute{font-size:9.5px}.territoryCards{grid-template-columns:1fr}.territoryCard{min-height:185px;border-radius:22px}.territoryShowcaseFoot{display:grid;grid-template-columns:1fr;text-align:center}.fidelisationItems{grid-template-columns:1fr}}';
    document.head.appendChild(style);
  }
  function installTerritories(){
    if(document.getElementById('digiy-territories-showcase'))return;
    var hub=document.querySelector('.hub');
    if(!hub)return;
    var section=document.createElement('section');
    section.id='digiy-territories-showcase';
    section.className='territoryShowcase';
    section.setAttribute('aria-label','Moteur territorial mondial DIGIYLYFE');
    section.innerHTML='<div class="territoryShowcaseHead"><span class="territoryShowcaseEyebrow" data-ter="eyebrow"></span><h2 data-ter="title"></h2><p class="territoryShowcaseLead" data-ter="lead"></p><p class="territoryShowcaseText" data-ter="text"></p><span class="territoryRoute" data-ter="route"></span></div><div class="territoryCards"><a class="territoryCard" href="https://digiy-hub.digiylyfe.com/territoire.html?zone=petite-cote"><div class="territoryCardTop"><span class="territoryFlag">🇸🇳</span><span><span class="territoryCountry" data-ter="pcCountry"></span><h3 data-ter="pc"></h3></span></div><p data-ter="pcSub"></p><span class="territoryCardOpen" data-ter="open"></span></a><a class="territoryCard" href="https://digiy-hub.digiylyfe.com/territoire.html?zone=vallee-dordogne"><div class="territoryCardTop"><span class="territoryFlag">🇫🇷</span><span><span class="territoryCountry" data-ter="ddCountry"></span><h3 data-ter="dd"></h3></span></div><p data-ter="ddSub"></p><span class="territoryCardOpen" data-ter="open"></span></a></div><div class="territoryShowcaseFoot"><span data-ter="doctrine"></span><span data-ter="future"></span></div>';
    hub.insertAdjacentElement('beforebegin',section);
  }
  function installFidelity(){
    if(document.getElementById('digiy-fidelisation'))return;
    var anchor=document.querySelector('.hubHead');
    if(!anchor)return;
    var section=document.createElement('section');
    section.id='digiy-fidelisation';
    section.className='fidelisationBox';
    section.innerHTML='<span class="fidelisationLabel" data-fid="label"></span><h2 data-fid="title"></h2><p data-fid="text"></p><p class="fidelisationQuote" data-fid="quote"></p><div class="fidelisationItems" data-fid="items"></div>';
    anchor.insertAdjacentElement('afterend',section);
  }
  function render(){
    var l=lang();
    var territory=document.getElementById('digiy-territories-showcase');
    if(territory){territory.dir=l==='ar'?'rtl':'ltr';fill(territory,'ter',TERRITORIES[l]);}
    var fid=document.getElementById('digiy-fidelisation');
    if(fid){
      var data=FID[l]||FID.fr;
      fill(fid,'fid',data);
      fid.querySelector('[data-fid="items"]').innerHTML=data.items.map(function(item){return '<span><b>✓</b>'+item+'</span>';}).join('');
    }
  }
  function init(){
    addStyle();
    installTerritories();
    installFidelity();
    render();
    new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    document.addEventListener('click',function(event){if(event.target.closest('.langBtn'))setTimeout(render,80);});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();

/* DIGIYLYFE — manifeste du Web conversationnel */
(function(){
  'use strict';
  if(window.__DIGIY_CONVERSATION_BRIDGE_V1__)return;
  window.__DIGIY_CONVERSATION_BRIDGE_V1__=true;

  var COPY={
    fr:{tag:'CONVERSATION → TERRAIN',title:'LE NOUVEAU WEB VOUS TEND LES BRAS',text:'La conversation ouvre la porte. DIGIYLYFE connecte le terrain. Le professionnel garde la relation.',note:'DIGIYLYFE est indépendant des services cités ; aucune affiliation n’est revendiquée.'},
    en:{tag:'THE NEW WEB · CONVERSATION → FIELD',title:'Conversation opens the door.',text:'connects the field. The professional keeps the relationship.',note:'DIGIYLYFE is independent from the services named above; no affiliation is claimed.'},
    es:{tag:'LA NUEVA WEB · CONVERSACIÓN → TERRENO',title:'La conversación abre la puerta.',text:'conecta el terreno. El profesional conserva la relación.',note:'DIGIYLYFE es independiente de los servicios citados; no se reivindica ninguna afiliación.'},
    de:{tag:'DAS NEUE WEB · GESPRÄCH → PRAXIS',title:'Das Gespräch öffnet die Tür.',text:'verbindet die Praxis. Der Profi behält die Kundenbeziehung.',note:'DIGIYLYFE ist von den genannten Diensten unabhängig; es wird keine Zugehörigkeit behauptet.'},
    it:{tag:'IL NUOVO WEB · CONVERSAZIONE → TERRITORIO',title:'La conversazione apre la porta.',text:'connette il territorio. Il professionista mantiene la relazione.',note:'DIGIYLYFE è indipendente dai servizi citati; non rivendica alcuna affiliazione.'},
    nl:{tag:'HET NIEUWE WEB · GESPREK → TERREIN',title:'Het gesprek opent de deur.',text:'verbindt het terrein. De professional behoudt de relatie.',note:'DIGIYLYFE is onafhankelijk van de genoemde diensten; er wordt geen affiliatie geclaimd.'},
    ar:{tag:'الويب الجديد · المحادثة ← الميدان',title:'المحادثة تفتح الباب.',text:'يربط الميدان. ويبقى المهني صاحب العلاقة.',note:'DIGIYLYFE مستقل عن الخدمات المذكورة ولا يدّعي أي انتماء إليها.'}
  };

  function currentLang(){
    var value=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();
    return COPY[value]?value:'fr';
  }
  function addBridgeStyle(){
    if(document.getElementById('digiy-conversation-bridge-style'))return;
    var style=document.createElement('style');
    style.id='digiy-conversation-bridge-style';
    style.textContent='.conversationBridge{position:relative;z-index:1;margin-top:11px;padding:15px 16px;border-radius:24px;border:1px solid rgba(45,212,191,.70);background:radial-gradient(520px 190px at 100% 0,rgba(45,212,191,.16),transparent 68%),linear-gradient(145deg,rgba(5,43,30,.96),rgba(4,23,17,.98));box-shadow:0 14px 34px rgba(0,0,0,.24);text-align:center}.conversationTag{display:block;color:#bdf7d2;font-size:10px;font-weight:1000;letter-spacing:.10em;text-transform:uppercase}.conversationBrands{margin-top:8px;color:#fff3cf;font-size:clamp(11px,2.8vw,14px);font-weight:1000;letter-spacing:.025em}.conversationBridge strong{display:block;margin-top:7px;font-size:clamp(22px,5vw,34px);line-height:1;font-weight:1000;letter-spacing:-.035em}.conversationBridge p{margin:8px 0 0;color:rgba(255,250,240,.92);font-size:clamp(13px,3.3vw,17px);line-height:1.35;font-weight:900}.conversationBridge p b{color:#f6c453}.conversationNote{display:block;margin-top:7px;color:rgba(255,250,240,.58);font-size:9.5px;line-height:1.3;font-style:normal;font-weight:800}';
    document.head.appendChild(style);
  }
  function installBridge(){
    if(document.getElementById('digiy-conversation-bridge'))return;
    var voice=document.querySelector('.voiceDoor');
    if(!voice)return;
    var section=document.createElement('section');
    section.id='digiy-conversation-bridge';
    section.className='conversationBridge';
    section.setAttribute('aria-label','Le nouveau Web conversationnel');
    section.innerHTML='<small class="conversationTag" data-conv="tag"></small><div class="conversationBrands">ChatGPT · Gemini · Grok · DeepSeek · Claude</div><strong data-conv="title"></strong><p><b>DIGIYLYFE</b> <span data-conv="text"></span></p><em class="conversationNote" data-conv="note"></em>';
    voice.insertAdjacentElement('afterend',section);
  }
  function renderBridge(){
    var section=document.getElementById('digiy-conversation-bridge');
    if(!section)return;
    var l=currentLang(),data=COPY[l];
    section.dir=l==='ar'?'rtl':'ltr';
    Object.keys(data).forEach(function(key){
      var node=section.querySelector('[data-conv="'+key+'"]');
      if(node)node.textContent=data[key];
    });
  }
  function initBridge(){
    addBridgeStyle();
    installBridge();
    renderBridge();
    new MutationObserver(renderBridge).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initBridge,{once:true});else initBridge();
})();
