/* DIGIYLYFE — Favoris MON DIGIY pour galeries de cartes
   Ajoute automatiquement ☆ sur chaque carte/profil rendu, y compris les cartes
   injectées dynamiquement après chargement (ex. galerie chauffeurs Supabase).
*/
(function(){
  'use strict';
  if(window.__DIGIY_GALLERY_FAVORITES_V1__) return;
  window.__DIGIY_GALLERY_FAVORITES_V1__=true;

  var DEST='https://digiylyfe.com/mon-digiy.html';
  var scheduled=false;

  function clean(v){return String(v||'').replace(/\s+/g,' ').trim();}
  function slug(v){
    return clean(v).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')
      .replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,160);
  }
  function http(v){
    try{var u=new URL(clean(v),location.href);return /^https?:$/.test(u.protocol)?u.toString():'';}catch(e){return'';}
  }
  function installStyle(){
    if(document.getElementById('digiyGalleryFavoriteStyleV1')) return;
    var s=document.createElement('style');
    s.id='digiyGalleryFavoriteStyleV1';
    s.textContent='\
      .digiyGalleryFavoriteStar{position:absolute;top:10px;right:10px;z-index:70;width:44px;height:44px;border-radius:999px;border:1px solid rgba(216,173,70,.78);background:rgba(3,18,13,.91);color:#fff3cf;display:grid;place-items:center;text-decoration:none!important;font:1000 25px/1 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;box-shadow:0 8px 22px rgba(0,0,0,.26);-webkit-tap-highlight-color:transparent}\
      .digiyGalleryFavoriteStar:hover,.digiyGalleryFavoriteStar:focus-visible{background:linear-gradient(135deg,#fff1bd,#f6c453,#22c55e);color:#06140f;transform:translateY(-1px)}\
      .digiyGalleryFavoriteStar:focus-visible{outline:3px solid rgba(246,196,83,.45);outline-offset:3px}\
      html[dir="rtl"] .digiyGalleryFavoriteStar{right:auto;left:10px}\
      @media(max-width:520px){.digiyGalleryFavoriteStar{width:42px;height:42px;font-size:24px;top:8px;right:8px}html[dir="rtl"] .digiyGalleryFavoriteStar{right:auto;left:8px}}\
    ';
    document.head.appendChild(s);
  }
  function candidateHref(card){
    var selectors=[
      '.photo[href]',
      '.actions a.btn-primary[href]',
      '.actions a.btn-ghost[href]',
      'a[href*="fiche-chauffeur"]',
      'a[href*="partenaire-"]',
      'a[href*="driver-part"]',
      'a[href*="chauffeur.html"]'
    ];
    for(var i=0;i<selectors.length;i++){
      var links=card.querySelectorAll(selectors[i]);
      for(var j=0;j<links.length;j++){
        var raw=links[j].getAttribute('href')||'';
        if(/^https?:\/\/(wa\.me|api\.whatsapp\.com)/i.test(raw)) continue;
        if(/commander|inscription|commencer-a-payer/i.test(raw)) continue;
        var h=http(raw);
        if(h) return h;
      }
    }
    return '';
  }
  function detail(card){
    var el=card.querySelector('.designation,.titleline,.area,.meta');
    return el?clean(el.textContent).slice(0,160):'';
  }
  function add(card){
    if(!card||card.nodeType!==1||card.querySelector(':scope > .digiyGalleryFavoriteStar')) return;
    var nameEl=card.querySelector('.name,h3.name,h2.name');
    var name=nameEl?clean(nameEl.textContent):'';
    if(!name) return;
    var href=candidateHref(card);
    if(!href) return;

    var p=new URLSearchParams();
    var id='pro-'+slug((function(){try{var u=new URL(href);return u.hostname+u.pathname+u.search;}catch(e){return href;}})());
    if(!id||id==='pro-') id='pro-'+slug(name);
    p.set('digiy_add','1');
    p.set('id',id);
    p.set('label',name);
    p.set('href',href);
    p.set('kind','professionnel');
    p.set('icon','🪪');
    var d=detail(card); if(d) p.set('job',d);

    if(getComputedStyle(card).position==='static') card.style.position='relative';
    var a=document.createElement('a');
    a.className='digiyGalleryFavoriteStar';
    a.href=DEST+'?'+p.toString();
    a.textContent='☆';
    a.title='Ajouter à MON DIGIY';
    a.setAttribute('aria-label','Ajouter '+name+' à MON DIGIY');
    card.appendChild(a);
  }
  function scan(){
    scheduled=false;
    installStyle();
    document.querySelectorAll('article.listing,.driver').forEach(add);
  }
  function schedule(){
    if(scheduled) return;
    scheduled=true;
    (window.requestAnimationFrame||function(fn){return setTimeout(fn,16);})(scan);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',scan,{once:true});
  else scan();

  var root=document.body||document.documentElement;
  if(root&&'MutationObserver' in window){
    new MutationObserver(schedule).observe(root,{childList:true,subtree:true});
  }
})();
