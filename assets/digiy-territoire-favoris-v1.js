/* DIGIYLYFE — Favoris adhérents territoire V1
 * Branche les cartes professionnelles dynamiques sur MON DIGIY.
 * Les cartes de démonstration / adhésion ne sont jamais ajoutées.
 */
(function(){
  'use strict';
  if(window.DIGIY_TERRITOIRE_FAVORIS_V1)return;
  window.DIGIY_TERRITOIRE_FAVORIS_V1=true;

  var KEY='digiy-vitrine-favoris';
  var META_KEY='digiy-vitrine-favoris-meta';
  var TEXT={
    fr:{add:'☆ AJOUTER À MON DIGIY',on:'★ DANS MON DIGIY'},
    en:{add:'☆ ADD TO MY DIGIY',on:'★ IN MY DIGIY'},
    es:{add:'☆ AÑADIR A MI DIGIY',on:'★ EN MI DIGIY'},
    pt:{add:'☆ ADICIONAR AO MEU DIGIY',on:'★ NO MEU DIGIY'},
    it:{add:'☆ AGGIUNGI AL MIO DIGIY',on:'★ NEL MIO DIGIY'},
    de:{add:'☆ ZU MEIN DIGIY',on:'★ IN MEIN DIGIY'},
    nl:{add:'☆ TOEVOEGEN AAN MIJN DIGIY',on:'★ IN MIJN DIGIY'},
    ar:{add:'☆ أضف إلى DIGIY الخاص بي',on:'★ في DIGIY الخاص بي'}
  };
  var ICON={transport:'🚗',artisan:'🔧',accommodation:'🏠',food:'🍽️',shopping:'🛍️',beauty:'✨',jobs:'💼',announcements:'📣',guidance:'🎙️',cleaning:'🧹',professional:'🏛️'};

  function lang(){
    var l=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();
    return TEXT[l]?l:'fr';
  }
  function tr(){return TEXT[lang()]||TEXT.fr;}
  function load(){try{var a=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(a)?a:[];}catch(e){return[];}}
  function save(a){try{localStorage.setItem(KEY,JSON.stringify(a));}catch(e){}}
  function loadMeta(){try{var m=JSON.parse(localStorage.getItem(META_KEY)||'{}');return m&&typeof m==='object'&&!Array.isArray(m)?m:{};}catch(e){return{};}}
  function saveMeta(m){try{localStorage.setItem(META_KEY,JSON.stringify(m));}catch(e){}}
  function cleanUrl(u){try{var x=new URL(u,location.href);x.hash='';return x.href.replace(/\/$/,'');}catch(e){return String(u||'').replace(/\/$/,'');}}
  function hash(s){var h=2166136261>>>0;for(var i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)>>>0;}return h.toString(36);}
  function territory(){try{return(new URLSearchParams(location.search).get('zone')||'territoire').toLowerCase();}catch(e){return'territoire';}}
  function need(){try{return(new URLSearchParams(location.search).get('need')||'').toLowerCase();}catch(e){return'';}}
  function isDemo(card){
    if(!card)return true;
    if(card.hasAttribute('data-dakar-placeholder'))return true;
    if(card.matches('[data-digiy-demo],[data-demo],[data-placeholder]'))return true;
    var txt=(card.textContent||'').toLowerCase();
    return /place à prendre|open place|lugar disponible|lugar abierto|posto disponibile|freier platz|open plaats|مكان متاح|carte de démonstration|demonstration card|tarjeta de demostración|cartão de demonstração|carta dimostrativa|demokarte|demokaart|بطاقة تجريبية/.test(txt);
  }
  function links(card){return Array.prototype.slice.call(card.querySelectorAll('.actions a[href],a[href]'));}
  function preferredHref(card){
    var a=links(card),firstContact='';
    for(var i=0;i<a.length;i++){
      var h=a[i].getAttribute('href')||'';
      if(!h||h==='#'||/^javascript:/i.test(h))continue;
      if(/adhesion|rejoindre|join/i.test(h))continue;
      if(/^tel:/i.test(h)||/wa\.me|whatsapp\.com/i.test(h)){if(!firstContact)firstContact=h;continue;}
      try{var u=new URL(h,location.href);if(u.origin===location.origin&&/territoire\.html|#territoires/i.test(u.href))continue;}catch(e){}
      return h;
    }
    return firstContact;
  }
  function catalogIdFor(href){
    var cat=window.DIGIY_CATALOG||{},needle=cleanUrl(href),ids=Object.keys(cat);
    for(var i=0;i<ids.length;i++){if(cleanUrl(cat[ids[i]].href||'')===needle)return ids[i];}
    return'';
  }
  function metaFor(card){
    var h=card.querySelector('h3,h2'),label=(h&&h.textContent||'').trim();
    var href=preferredHref(card);if(!label||!href)return null;
    var known=catalogIdFor(href);
    var id=known||('pro-'+territory()+'-'+hash(cleanUrl(href)+'|'+label));
    return{id:id,href:href,icon:ICON[need()]||'⭐',label:label,kind:'professionnel'};
  }
  function active(id){return load().indexOf(id)>-1;}
  function updateButton(b,id){var on=active(id),t=tr();b.classList.toggle('active',on);b.setAttribute('aria-pressed',on?'true':'false');b.textContent=on?t.on:t.add;}
  function toggle(m,b){
    var a=load(),i=a.indexOf(m.id),map=loadMeta();
    if(i>-1)a.splice(i,1);else{a.push(m.id);map[m.id]=m;}
    save(a);saveMeta(map);updateButton(b,m.id);
  }
  function attach(card){
    if(!card||card.querySelector('.digiyTerritoryFav'))return;
    if(isDemo(card))return;
    var m=metaFor(card);if(!m)return;
    var h=card.querySelector('h3,h2');if(!h)return;
    var b=document.createElement('button');
    b.type='button';b.className='digiyTerritoryFav';b.setAttribute('aria-label','MON DIGIY');
    b.addEventListener('click',function(ev){ev.preventDefault();ev.stopPropagation();toggle(m,b);});
    h.insertAdjacentElement('afterend',b);updateButton(b,m.id);
  }
  function scan(){var root=document.getElementById('results');if(!root)return;root.querySelectorAll('.card').forEach(attach);root.querySelectorAll('.digiyTerritoryFav').forEach(function(b){var c=b.closest('.card'),m=c&&metaFor(c);if(m)updateButton(b,m.id);});}
  function style(){
    if(document.getElementById('digiyTerritoryFavStyle'))return;
    var s=document.createElement('style');s.id='digiyTerritoryFavStyle';s.textContent='\n.digiyTerritoryFav{display:inline-flex;align-items:center;justify-content:center;margin:8px 0 2px;padding:7px 10px;min-height:34px;border-radius:999px;border:1px solid rgba(246,196,83,.48);background:rgba(246,196,83,.08);color:#fff3cf;font:inherit;font-size:10px;font-weight:1000;line-height:1.05;cursor:pointer}\n.digiyTerritoryFav.active{border-color:rgba(246,196,83,.88);background:linear-gradient(135deg,rgba(246,196,83,.20),rgba(34,197,94,.15));color:#fff1bd}\n.digiyTerritoryFav:focus-visible{outline:3px solid rgba(246,196,83,.65);outline-offset:2px}\nhtml[dir="rtl"] .digiyTerritoryFav{direction:rtl}\n';document.head.appendChild(s);
  }
  function boot(){
    style();scan();var root=document.getElementById('results');if(root)new MutationObserver(function(){setTimeout(scan,0);}).observe(root,{childList:true,subtree:true});
    new MutationObserver(function(){scan();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});
  }
  function withCatalog(){
    if(window.DIGIY_CATALOG){boot();return;}
    var s=document.createElement('script');s.src='/assets/digiy-catalog.js?v=20260904-v1';s.onload=boot;s.onerror=boot;document.head.appendChild(s);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',withCatalog);else withCatalog();
})();