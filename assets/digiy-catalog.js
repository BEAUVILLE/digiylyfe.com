/* DIGIYLYFE · Catalogue partagé MON DIGIY
   Source unique des métadonnées de favoris.
   Les favoris professionnels renvoient vers leur CARTE dans la vitrine principale,
   jamais vers une fiche payante. Les anciennes URLs restent migrables.
*/
(function(w){
  'use strict';

  var HOME='https://digiylyfe.com/';
  function cardHref(id){return HOME+'#fav-'+id;}

  var CATALOG={
    "service-voix-action-pro":{href:"https://pro-action-digiy.digiylyfe.com/",icon:"🎙️",label:"LA VOIX · ACTION PRO",kind:"service"},

    "pro-astou-boutique":{href:cardHref("pro-astou-boutique"),icon:"🛍️",label:"Astou Boutique",kind:"professionnel",legacyUrls:["https://astou-boutique.digiylyfe.com/"]},
    "pro-babacar-plombier":{href:cardHref("pro-babacar-plombier"),icon:"🔧",label:"Babacar Plombier Pro",kind:"professionnel",legacyUrls:["https://babacar-plombier-pro.digiylyfe.com/"]},
    "pro-mane-gning":{href:cardHref("pro-mane-gning"),icon:"🧹",label:"MANÉ & GNING",kind:"professionnel",legacyUrls:["https://mane-gning.digiylyfe.com/"]},
    "pro-chez-baptiste-sarlat":{href:cardHref("pro-chez-baptiste-sarlat"),icon:"🏠",label:"Chez Baptiste · Sarlat",kind:"professionnel",legacyUrls:["https://sarlat-chez-baptiste.digiylyfe.com/"]},
    "pro-lamine":{href:cardHref("pro-lamine"),icon:"🚗",label:"Lamine",kind:"professionnel",legacyUrls:["https://partenaire-lamine.digiylyfe.com/"]},

    /* Cartes signature visibles dans la vitrine après rendu JS. */
    "pro-chez-baptiste-saly":{href:cardHref("pro-chez-baptiste-saly"),icon:"🏠",label:"Chez Baptiste · Saly",kind:"professionnel",legacyUrls:["https://part-chez-baptiste.digiylyfe.com/"]},
    "pro-mbaye-diouf":{href:cardHref("pro-mbaye-diouf"),icon:"🧱",label:"Mbaye Diouf · Bâtisseur",kind:"professionnel",legacyUrls:["https://mbaye-macon.digiylyfe.com/"]},
    "pro-helage":{href:cardHref("pro-helage"),icon:"🔧",label:"Helage · Plombier",kind:"professionnel",legacyUrls:["https://helage-plombier.digiylyfe.com/"]},

    "territoire-petite-cote":{href:"https://digiylyfe.com/territoire.html?zone=petite-cote",icon:"📍",label:"DIGIY PETITE CÔTE",kind:"territoire"},
    "territoire-dakar":{href:"https://digiylyfe.com/territoire.html?zone=dakar",icon:"📍",label:"DIGIY DAKAR",kind:"territoire"},
    "territoire-dordogne":{href:"https://digiylyfe.com/france.html",icon:"📍",label:"DIGIY VALLÉE DE LA DORDOGNE",kind:"territoire",legacyUrls:["https://digiylyfe.com/france.html"]},
    "territoire-bordeaux":{href:"https://digiylyfe.com/france.html",icon:"📍",label:"DIGIY BORDEAUX",kind:"territoire"}
  };

  /* Migration automatique des anciens favoris stockés sous forme d'URL. */
  var hrefCount={};
  Object.keys(CATALOG).forEach(function(id){
    var href=CATALOG[id].href||'';
    if(href)hrefCount[href]=(hrefCount[href]||0)+1;
  });
  var OLD_URL_MAP={};
  Object.keys(CATALOG).forEach(function(id){
    var item=CATALOG[id],href=item.href||'';
    if(href&&hrefCount[href]===1)OLD_URL_MAP[href]=id;
    (item.legacyUrls||[]).forEach(function(url){if(url)OLD_URL_MAP[url]=id;});
  });

  Object.keys(CATALOG).forEach(function(id){Object.freeze(CATALOG[id]);});
  w.DIGIY_CATALOG=Object.freeze(CATALOG);
  w.DIGIY_OLD_URL_MAP=Object.freeze(OLD_URL_MAP);
  w.DIGIY_CATALOG_VERSION='20260904-card-favorites-v2';

  /*
   * PONT CARTES -> MON DIGIY
   * Important : les scripts "signature" reconstruisent certaines cartes après le
   * premier script favoris de l'index. Ce pont s'exécute APRES leur rendu et pose
   * l'étoile sur la CARTE finale. Il ne dépend d'aucune fiche professionnelle.
   */
  if(location.hostname!=='digiylyfe.com'||(location.pathname!=='/'&&location.pathname!=='/index.html'))return;

  var KEY='digiy-vitrine-favoris';
  var META_KEY='digiy-vitrine-favoris-meta';
  var CARD_DEFS=[
    {selector:'.digiyBaptisteSignatureCard',id:'pro-chez-baptiste-sarlat'},
    {selector:'.digiySalyCard',id:'pro-chez-baptiste-saly'},
    {selector:'.digiyMbayeCard',id:'pro-mbaye-diouf'},
    {selector:'.digiyHelageCard',id:'pro-helage'}
  ];

  function loadFavs(){try{var a=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(a)?a:[];}catch(e){return[];}}
  function saveFavs(a){try{localStorage.setItem(KEY,JSON.stringify(a));}catch(e){}}
  function loadMeta(){try{var m=JSON.parse(localStorage.getItem(META_KEY)||'{}');return m&&typeof m==='object'&&!Array.isArray(m)?m:{};}catch(e){return{};}}
  function saveMeta(m){try{localStorage.setItem(META_KEY,JSON.stringify(m));}catch(e){}}
  function isOn(id){return loadFavs().indexOf(id)>-1;}

  function ensureStyle(){
    if(document.getElementById('digiyCardFavFinalStyle'))return;
    var st=document.createElement('style');st.id='digiyCardFavFinalStyle';
    st.textContent='\n.digiyCardFavHost{position:relative!important}\n.digiyCardFavStar{position:absolute!important;top:9px!important;right:9px!important;z-index:999!important;width:40px!important;height:40px!important;border-radius:999px!important;display:grid!important;place-items:center!important;border:2px solid rgba(246,196,83,.88)!important;background:rgba(3,18,13,.94)!important;color:#fff1bd!important;font:900 22px/1 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif!important;cursor:pointer!important;padding:0!important;box-shadow:0 7px 20px rgba(0,0,0,.42)!important;-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px)}\n.digiyCardFavStar.active{background:linear-gradient(135deg,#fff1bd,#f6c453,#22c55e)!important;color:#06140f!important;border-color:#fff1bd!important}\n.digiyCardFavStar:focus-visible{outline:3px solid rgba(246,196,83,.85)!important;outline-offset:3px!important}\nhtml[dir="rtl"] .digiyCardFavStar{right:auto!important;left:9px!important}\n';
    document.head.appendChild(st);
  }

  function updateStar(b,id){
    var on=isOn(id);b.classList.toggle('active',on);b.setAttribute('aria-pressed',on?'true':'false');b.textContent=on?'★':'☆';
    b.setAttribute('aria-label',on?'Retirer de MON DIGIY':'Ajouter à MON DIGIY');
    b.title=on?'Dans MON DIGIY':'Ajouter à MON DIGIY';
  }

  function writeMeta(id){
    var base=CATALOG[id];if(!base)return;
    var map=loadMeta();map[id]={id:id,href:base.href,icon:base.icon,label:base.label,kind:base.kind};saveMeta(map);
  }

  function toggle(id,b){
    var a=loadFavs(),i=a.indexOf(id);
    if(i>-1)a.splice(i,1);else{a.push(id);writeMeta(id);}
    saveFavs(a);updateStar(b,id);refreshTop();
  }

  function makeStar(card,id){
    if(!card||!id||!CATALOG[id])return;
    card.classList.add('digiyCardFavHost');card.setAttribute('data-fav-id',id);card.id='fav-'+id;

    /* L'ancien script avait pu poser une étoile avant que la carte soit reconstruite. */
    card.querySelectorAll(':scope > .favStar').forEach(function(x){x.remove();});

    var old=card.querySelector(':scope > .digiyCardFavStar');if(old){updateStar(old,id);return;}
    var b=document.createElement(card.tagName==='A'?'span':'button');
    if(b.tagName==='BUTTON')b.type='button';
    else{b.setAttribute('role','button');b.setAttribute('tabindex','0');}
    b.className='digiyCardFavStar';
    b.addEventListener('click',function(ev){ev.preventDefault();ev.stopPropagation();toggle(id,b);});
    b.addEventListener('keydown',function(ev){if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();ev.stopPropagation();toggle(id,b);}});
    card.appendChild(b);updateStar(b,id);
  }

  function scan(){
    ensureStyle();
    document.querySelectorAll('.exampleCard[data-fav-id]').forEach(function(c){makeStar(c,c.getAttribute('data-fav-id'));});
    CARD_DEFS.forEach(function(d){document.querySelectorAll(d.selector).forEach(function(c){makeStar(c,d.id);});});
    focusHash();
  }

  function itemMeta(id){
    var map=loadMeta(),base=CATALOG[id]||{},saved=map[id]||{};
    return Object.assign({id:id,href:'/',icon:'⭐',label:id,kind:'autre'},saved,base);
  }

  function refreshTop(){
    var list=document.getElementById('favList'),clear=document.getElementById('favClear');if(!list)return;
    var ids=loadFavs();list.innerHTML='';var shown=0;
    ids.forEach(function(id){var m=itemMeta(id);if(!m.href)return;var chip=document.createElement('span');chip.className='favChip';var go=document.createElement('a');go.className='favGo';go.href=m.href;var ic=document.createElement('i');ic.setAttribute('aria-hidden','true');ic.textContent=m.icon||'⭐';var tx=document.createElement('span');tx.textContent=m.label||id;go.appendChild(ic);go.appendChild(tx);var del=document.createElement('button');del.type='button';del.className='favDel';del.setAttribute('aria-label','Retirer');del.textContent='×';del.addEventListener('click',function(){var a=loadFavs().filter(function(x){return x!==id;});saveFavs(a);refreshAll();});chip.appendChild(go);chip.appendChild(del);list.appendChild(chip);shown++;});
    list.hidden=shown===0;if(clear)clear.hidden=shown===0;
  }

  function refreshAll(){document.querySelectorAll('.digiyCardFavStar').forEach(function(b){var c=b.parentElement,id=c&&c.getAttribute('data-fav-id');if(id)updateStar(b,id);});refreshTop();}

  var focused='';
  function focusHash(){
    var h=(location.hash||'').replace(/^#/,'');if(!h||h.indexOf('fav-')!==0||focused===h)return;
    var el=document.getElementById(h);if(!el)return;focused=h;setTimeout(function(){try{el.scrollIntoView({behavior:'smooth',block:'center'});}catch(e){el.scrollIntoView();}},80);
  }

  function boot(){
    scan();refreshTop();
    var root=document.querySelector('.exampleGrid')||document.body;
    try{new MutationObserver(function(){setTimeout(scan,0);}).observe(root,{childList:true,subtree:true});}catch(e){}
    var clear=document.getElementById('favClear');if(clear)clear.addEventListener('click',function(){setTimeout(refreshAll,0);});
    window.addEventListener('hashchange',function(){focused='';scan();});
    setTimeout(scan,250);setTimeout(scan,900);setTimeout(scan,1800);setTimeout(scan,3500);
  }

  if(document.readyState==='complete')boot();else window.addEventListener('load',boot,{once:true});
})(window);
