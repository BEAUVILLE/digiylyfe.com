/* DIGIYLYFE · Catalogue partagé MON DIGIY
   Une seule source de vérité pour les favoris.
   RÈGLE : un professionnel est gardé depuis SA CARTE. Une fiche payante n'est jamais requise.
*/
(function(w){
  'use strict';

  var HOME='https://digiylyfe.com/';
  function homeCard(id){return HOME+'#fav-'+id;}

  var CATALOG={
    "service-voix-action-pro":{href:"https://pro-action-digiy.digiylyfe.com/",icon:"🎙️",label:"LA VOIX · ACTION PRO",kind:"service"},
    "pro-astou-boutique":{href:homeCard("pro-astou-boutique"),icon:"🛍️",label:"Astou Boutique",kind:"professionnel",legacyUrls:["https://astou-boutique.digiylyfe.com/"]},
    "pro-babacar-plombier":{href:homeCard("pro-babacar-plombier"),icon:"🔧",label:"Babacar Plombier Pro",kind:"professionnel",legacyUrls:["https://babacar-plombier-pro.digiylyfe.com/"]},
    "pro-mane-gning":{href:homeCard("pro-mane-gning"),icon:"🧹",label:"MANÉ & GNING",kind:"professionnel",legacyUrls:["https://mane-gning.digiylyfe.com/"]},
    "pro-chez-baptiste-sarlat":{href:homeCard("pro-chez-baptiste-sarlat"),icon:"🏠",label:"Chez Baptiste · Sarlat",kind:"professionnel",legacyUrls:["https://sarlat-chez-baptiste.digiylyfe.com/"]},
    "pro-lamine":{href:homeCard("pro-lamine"),icon:"🚗",label:"Lamine",kind:"professionnel",legacyUrls:["https://partenaire-lamine.digiylyfe.com/"]},
    "pro-chez-baptiste-saly":{href:homeCard("pro-chez-baptiste-saly"),icon:"🏠",label:"Chez Baptiste · Saly",kind:"professionnel",legacyUrls:["https://part-chez-baptiste.digiylyfe.com/"]},
    "pro-mbaye-diouf":{href:homeCard("pro-mbaye-diouf"),icon:"🧱",label:"Mbaye Diouf · Bâtisseur",kind:"professionnel",legacyUrls:["https://mbaye-macon.digiylyfe.com/"]},
    "pro-helage":{href:homeCard("pro-helage"),icon:"🔧",label:"Helage · Plombier",kind:"professionnel",legacyUrls:["https://helage-plombier.digiylyfe.com/"]},
    "territoire-petite-cote":{href:"https://digiylyfe.com/territoire.html?zone=petite-cote",icon:"📍",label:"DIGIY PETITE CÔTE",kind:"territoire"},
    "territoire-dakar":{href:"https://digiylyfe.com/territoire.html?zone=dakar",icon:"📍",label:"DIGIY DAKAR",kind:"territoire"},
    "territoire-dordogne":{href:"https://digiylyfe.com/france.html",icon:"📍",label:"DIGIY VALLÉE DE LA DORDOGNE",kind:"territoire",legacyUrls:["https://digiylyfe.com/france.html"]},
    "territoire-bordeaux":{href:"https://digiylyfe.com/france.html",icon:"📍",label:"DIGIY BORDEAUX",kind:"territoire"}
  };

  var hrefCount={};
  Object.keys(CATALOG).forEach(function(id){var href=CATALOG[id].href||'';if(href)hrefCount[href]=(hrefCount[href]||0)+1;});
  var OLD_URL_MAP={};
  Object.keys(CATALOG).forEach(function(id){var item=CATALOG[id],href=item.href||'';if(href&&hrefCount[href]===1)OLD_URL_MAP[href]=id;(item.legacyUrls||[]).forEach(function(url){if(url)OLD_URL_MAP[url]=id;});});

  Object.keys(CATALOG).forEach(function(id){Object.freeze(CATALOG[id]);});
  w.DIGIY_CATALOG=Object.freeze(CATALOG);
  w.DIGIY_OLD_URL_MAP=Object.freeze(OLD_URL_MAP);
  w.DIGIY_CATALOG_VERSION='20260904-card-direct-v3';

  /* Le carnet partage le localStorage uniquement sur le domaine principal. */
  if(location.hostname!=='digiylyfe.com')return;
  if(!/^(\/|\/index\.html|\/territoire\.html)$/.test(location.pathname))return;

  var KEY='digiy-vitrine-favoris';
  var META_KEY='digiy-vitrine-favoris-meta';
  var ICON={transport:'🚗',artisan:'🔧',accommodation:'🏠',food:'🍽️',shopping:'🛍️',beauty:'✨',jobs:'💼',announcements:'📣',guidance:'🎙️',cleaning:'🧹',professional:'🏛️'};
  var FIXED=[
    {selector:'.digiyBaptisteSignatureCard',id:'pro-chez-baptiste-sarlat'},
    {selector:'.digiySalyCard',id:'pro-chez-baptiste-saly'},
    {selector:'.digiyMbayeCard',id:'pro-mbaye-diouf'},
    {selector:'.digiyHelageCard',id:'pro-helage'}
  ];

  function loadFavs(){try{var a=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(a)?a:[];}catch(e){return[];}}
  function saveFavs(a){try{localStorage.setItem(KEY,JSON.stringify(a));}catch(e){}}
  function loadMeta(){try{var m=JSON.parse(localStorage.getItem(META_KEY)||'{}');return m&&typeof m==='object'&&!Array.isArray(m)?m:{};}catch(e){return{};}}
  function saveMeta(m){try{localStorage.setItem(META_KEY,JSON.stringify(m));}catch(e){}}
  function on(id){return loadFavs().indexOf(id)>-1;}
  function hash(s){var h=2166136261>>>0;s=String(s||'');for(var i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)>>>0;}return h.toString(36);}
  function params(){try{return new URLSearchParams(location.search);}catch(e){return new URLSearchParams();}}
  function cleanPage(){var u=new URL(location.href);u.hash='';return u.href;}
  function need(){return (params().get('need')||'').toLowerCase();}

  function ensureStyle(){
    if(document.getElementById('digiyCardFavDirectStyle'))return;
    var st=document.createElement('style');st.id='digiyCardFavDirectStyle';
    st.textContent='\n.digiyCardFavHost{position:relative!important}\n.digiyCardFavDirect{position:absolute!important;top:9px!important;right:9px!important;z-index:9999!important;width:42px!important;height:42px!important;border-radius:999px!important;display:grid!important;place-items:center!important;border:2px solid #f6c453!important;background:#06140f!important;color:#fff1bd!important;font:900 24px/1 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif!important;cursor:pointer!important;padding:0!important;box-shadow:0 8px 22px rgba(0,0,0,.48)!important;-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px)}\n.digiyCardFavDirect.active{background:linear-gradient(135deg,#fff1bd,#f6c453,#22c55e)!important;color:#06140f!important;border-color:#fff1bd!important}\n.digiyCardFavDirect:focus-visible{outline:3px solid rgba(246,196,83,.90)!important;outline-offset:3px!important}\nhtml[dir="rtl"] .digiyCardFavDirect{right:auto!important;left:9px!important}\n';
    document.head.appendChild(st);
  }

  function isDemo(card){
    if(!card)return true;if(card.hasAttribute('data-dakar-placeholder'))return true;
    if(card.matches('[data-digiy-demo],[data-demo],[data-placeholder]'))return true;
    return /place à prendre|open place|lugar disponible|posto disponibile|freier platz|open plaats|مكان متاح|carte de démonstration|demonstration card|tarjeta de demostración|cartão de demonstração|demokarte|بطاقة تجريبية/.test((card.textContent||'').toLowerCase());
  }

  function title(card){
    var el=card.querySelector('[data-digiy-fav-label],h3,h2,.digiyMbayeTitle,.digiySalyTitle,.digiySarlatTitle,.digiyHelageTitle,.digiyBaptisteSignatureTitle,[class$="Title"],[class*="Title "]')||card.querySelector('strong');
    return (el&&el.textContent||'').trim();
  }

  function icon(card){
    var i=card.querySelector('i');if(i&&i.textContent.trim())return i.textContent.trim();
    return ICON[need()]||'⭐';
  }

  function knownId(card){
    var id=card.getAttribute('data-fav-id')||'';if(id&&CATALOG[id])return id;
    for(var i=0;i<FIXED.length;i++)if(card.matches(FIXED[i].selector))return FIXED[i].id;
    var links=[].slice.call(card.querySelectorAll('a[href]'));
    for(var j=0;j<links.length;j++){
      var h=links[j].href||'';if(OLD_URL_MAP[h])return OLD_URL_MAP[h];
      var bare=h.replace(/\/$/,'');if(OLD_URL_MAP[bare]||OLD_URL_MAP[bare+'/'])return OLD_URL_MAP[bare]||OLD_URL_MAP[bare+'/'];
    }
    return'';
  }

  function metaFor(card){
    var label=title(card);if(!label)return null;
    var id=knownId(card);
    if(!id){var p=params(),scope=(p.get('zone')||'territoire')+'|'+(p.get('need')||'')+'|'+(p.get('local')||'');id='pro-card-'+hash(scope+'|'+label);}
    var base=CATALOG[id]||{};
    var href;
    if(location.pathname==='/territoire.html')href=cleanPage()+'#fav-'+id;
    else href=base.href||homeCard(id);
    return{id:id,href:href,icon:base.icon||icon(card),label:base.label||label,kind:'professionnel'};
  }

  function writeMeta(m){var map=loadMeta();map[m.id]=m;saveMeta(map);}
  function state(b,id){var yes=on(id);b.classList.toggle('active',yes);b.setAttribute('aria-pressed',yes?'true':'false');b.textContent=yes?'★':'☆';b.setAttribute('aria-label',yes?'Retirer de MON DIGIY':'Ajouter à MON DIGIY');b.title=yes?'Dans MON DIGIY':'Ajouter à MON DIGIY';}
  function toggle(m,b){var a=loadFavs(),i=a.indexOf(m.id);if(i>-1)a.splice(i,1);else{a.push(m.id);writeMeta(m);}saveFavs(a);state(b,m.id);refreshTop();}

  function attach(card){
    if(!card||isDemo(card))return;var m=metaFor(card);if(!m)return;
    card.classList.add('digiyCardFavHost');card.setAttribute('data-fav-id',m.id);card.id='fav-'+m.id;
    card.querySelectorAll(':scope > .favStar,:scope > .digiyTerritoryFav,:scope > .digiyCardFavStar').forEach(function(x){x.remove();});
    var b=card.querySelector(':scope > .digiyCardFavDirect');if(b){state(b,m.id);return;}
    b=document.createElement(card.tagName==='A'?'span':'button');if(b.tagName==='BUTTON')b.type='button';else{b.setAttribute('role','button');b.setAttribute('tabindex','0');}
    b.className='digiyCardFavDirect';
    b.addEventListener('click',function(ev){ev.preventDefault();ev.stopPropagation();toggle(m,b);});
    b.addEventListener('keydown',function(ev){if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();ev.stopPropagation();toggle(m,b);}});
    card.appendChild(b);state(b,m.id);
  }

  function scanHome(){document.querySelectorAll('.exampleCard[data-fav-id]').forEach(attach);FIXED.forEach(function(d){document.querySelectorAll(d.selector).forEach(attach);});}
  function scanTerritory(){
    var root=document.getElementById('resultsSection')||document.getElementById('results');if(!root)return;
    root.querySelectorAll('.card,.digiyBaptisteSignatureCard,.digiySalyCard,.digiyMbayeCard,.digiyHelageCard,article[class$="Card"]').forEach(function(c){if(c.querySelector('a[href]'))attach(c);});
  }
  function scan(){ensureStyle();if(location.pathname==='/territoire.html')scanTerritory();else scanHome();focusHash();}

  function itemMeta(id){var map=loadMeta(),saved=map[id]||{},base=CATALOG[id]||{};return Object.assign({id:id,href:'/',icon:'⭐',label:id,kind:'professionnel'},base,saved);}
  function refreshTop(){
    var list=document.getElementById('favList'),clear=document.getElementById('favClear');if(!list)return;
    var ids=loadFavs();list.innerHTML='';var n=0;
    ids.forEach(function(id){var m=itemMeta(id);if(!m.href)return;var chip=document.createElement('span');chip.className='favChip';var go=document.createElement('a');go.className='favGo';go.href=m.href;var ic=document.createElement('i');ic.setAttribute('aria-hidden','true');ic.textContent=m.icon||'⭐';var tx=document.createElement('span');tx.textContent=m.label||id;go.appendChild(ic);go.appendChild(tx);var del=document.createElement('button');del.type='button';del.className='favDel';del.textContent='×';del.setAttribute('aria-label','Retirer');del.addEventListener('click',function(){saveFavs(loadFavs().filter(function(x){return x!==id;}));refreshAll();});chip.appendChild(go);chip.appendChild(del);list.appendChild(chip);n++;});
    list.hidden=n===0;if(clear)clear.hidden=n===0;
  }
  function refreshAll(){document.querySelectorAll('.digiyCardFavDirect').forEach(function(b){var c=b.parentElement,id=c&&c.getAttribute('data-fav-id');if(id)state(b,id);});refreshTop();}

  var focused='';
  function focusHash(){var h=(location.hash||'').slice(1);if(!/^fav-/.test(h)||focused===h)return;var el=document.getElementById(h);if(!el)return;focused=h;setTimeout(function(){try{el.scrollIntoView({behavior:'smooth',block:'center'});}catch(e){el.scrollIntoView();}},100);}

  function boot(){
    scan();refreshTop();
    var root=location.pathname==='/territoire.html'?(document.getElementById('resultsSection')||document.body):(document.querySelector('.exampleGrid')||document.body);
    try{new MutationObserver(function(){setTimeout(scan,0);}).observe(root,{childList:true,subtree:true});}catch(e){}
    var clear=document.getElementById('favClear');if(clear)clear.addEventListener('click',function(){setTimeout(refreshAll,0);});
    window.addEventListener('hashchange',function(){focused='';scan();});
    setTimeout(scan,200);setTimeout(scan,700);setTimeout(scan,1500);setTimeout(scan,3000);
  }
  if(document.readyState==='complete')boot();else window.addEventListener('load',boot,{once:true});
})(window);
