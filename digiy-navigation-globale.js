/* DIGIYLYFE — Navigation globale partagée
 * Version: dgn-global-v1-20260722
 * Rôle: injecter le cartouche permanent sur les pages publiques qui le chargent.
 * Sécurité: aucun PIN, aucun jeton et aucune donnée privée ne sont enregistrés ici.
 */
(function(){
  'use strict';

  if(window.__DIGIY_GLOBAL_NAV_V1) return;
  window.__DIGIY_GLOBAL_NAV_V1=true;

  /* L'accueil possède déjà sa navigation complète validée. */
  if(document.getElementById('digiyDock')||document.getElementById('digiy-global-dock')) return;

  var HOME='https://digiylyfe.com/';
  var HUB='https://digiy-hub.digiylyfe.com/';
  var FAV_KEY='digiy_global_favorites_v1';
  var lang=(document.documentElement.lang||'fr').toLowerCase().indexOf('en')===0?'en':'fr';

  var copy={
    fr:{home:'Accueil',hub:'HUB',menu:'Tout',favorites:'Favoris',back:'Retour',menuTitle:'Toutes les portes DIGIYLYFE',favTitle:'Mes favoris',favLead:'Touchez une étoile pour mémoriser jusqu’à trois raccourcis sur cet appareil.',close:'Fermer',open:'Ouvrir',selected:'Retirer des favoris',notSelected:'Ajouter aux favoris'},
    en:{home:'Home',hub:'HUB',menu:'All',favorites:'Favorites',back:'Back',menuTitle:'All DIGIYLYFE doors',favTitle:'My favorites',favLead:'Tap a star to remember up to three shortcuts on this device.',close:'Close',open:'Open',selected:'Remove from favorites',notSelected:'Add to favorites'}
  }[lang];

  var favoriteChoices=[
    {id:'pro',icon:'🔐',fr:'Mon espace pro',en:'My pro space',url:'https://pro-espace.digiylyfe.com/'},
    {id:'carnet',icon:'📒',fr:'PRO CARNET',en:'PRO CARNET',url:'https://pro-carnet.digiylyfe.com/pin.html'},
    {id:'modules',icon:'🧭',fr:'Tous mes modules',en:'All my modules',url:HUB}
  ];

  function getCookie(name){
    var prefix=name+'=';
    var parts=document.cookie?document.cookie.split(';'):[];
    for(var i=0;i<parts.length;i++){
      var item=parts[i].trim();
      if(item.indexOf(prefix)===0) return decodeURIComponent(item.slice(prefix.length));
    }
    return '';
  }

  function loadFavorites(){
    var raw='';
    try{raw=localStorage.getItem(FAV_KEY)||'';}catch(_){ }
    if(!raw) raw=getCookie(FAV_KEY);
    if(!raw) return [];
    try{
      var value=JSON.parse(raw);
      return Array.isArray(value)?value.filter(function(id){return favoriteChoices.some(function(item){return item.id===id;});}).slice(0,3):[];
    }catch(_){return [];}
  }

  function saveFavorites(ids){
    var raw=JSON.stringify(ids.slice(0,3));
    try{localStorage.setItem(FAV_KEY,raw);}catch(_){ }
    try{
      var domain=(location.hostname==='digiylyfe.com'||/\.digiylyfe\.com$/.test(location.hostname))?'; Domain=.digiylyfe.com':'';
      document.cookie=FAV_KEY+'='+encodeURIComponent(raw)+'; Max-Age=31536000; Path=/; SameSite=Lax; Secure'+domain;
    }catch(_){ }
  }

  function el(tag,attrs,html){
    var node=document.createElement(tag);
    Object.keys(attrs||{}).forEach(function(key){
      if(key==='class') node.className=attrs[key];
      else if(key==='text') node.textContent=attrs[key];
      else node.setAttribute(key,attrs[key]);
    });
    if(html!=null) node.innerHTML=html;
    return node;
  }

  var style=el('style',{'data-digiy-global-nav':'v1'});
  style.textContent='\
#digiy-global-dock,#digiy-global-sheet,#digiy-global-overlay{font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;box-sizing:border-box}\
#digiy-global-dock * ,#digiy-global-sheet *{box-sizing:border-box}\
#digiy-global-dock{position:fixed;right:18px;top:50%;z-index:2147483000;transform:translateY(-50%);width:82px;padding:8px;display:grid;gap:8px;border:1px solid rgba(246,196,83,.48);border-radius:25px;background:rgba(4,19,13,.94);box-shadow:0 20px 55px rgba(0,0,0,.42);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px)}\
#digiy-global-dock a,#digiy-global-dock button{appearance:none;min-width:0;min-height:63px;padding:7px 4px;border-radius:17px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.065);color:#fffaf0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;text-align:center;text-decoration:none;font:inherit;cursor:pointer}\
#digiy-global-dock a:hover,#digiy-global-dock button:hover,#digiy-global-dock a:focus-visible,#digiy-global-dock button:focus-visible{border-color:rgba(246,196,83,.68);background:rgba(246,196,83,.13);outline:none}\
#digiy-global-dock .dgn-main{border-color:rgba(246,196,83,.66);background:linear-gradient(145deg,rgba(246,196,83,.22),rgba(34,197,94,.16))}\
#digiy-global-dock .dgn-icon{font-size:21px;line-height:1}\
#digiy-global-dock small{display:block;color:inherit;font-size:9.5px;line-height:1.05;font-weight:1000;letter-spacing:.015em}\
#digiy-global-overlay{position:fixed;inset:0;z-index:2147483010;background:rgba(0,0,0,.56);backdrop-filter:blur(3px);opacity:0;pointer-events:none;transition:opacity .18s}\
#digiy-global-overlay.dgn-open{opacity:1;pointer-events:auto}\
#digiy-global-sheet{position:fixed;left:0;right:0;bottom:0;z-index:2147483020;transform:translateY(105%);transition:transform .22s;padding:10px 10px calc(12px + env(safe-area-inset-bottom));color:#fffaf0}\
#digiy-global-sheet.dgn-open{transform:translateY(0)}\
#digiy-global-sheet .dgn-card{width:min(900px,100%);margin:auto;max-height:84svh;overflow:auto;border-radius:32px 32px 24px 24px;border:1px solid rgba(246,196,83,.42);background:rgba(4,19,13,.985);box-shadow:0 -22px 70px rgba(0,0,0,.58);padding:16px}\
#digiy-global-sheet .dgn-head{display:grid;grid-template-columns:1fr 54px;gap:10px;align-items:center;padding:6px 4px 14px;border-bottom:1px solid rgba(255,255,255,.14)}\
#digiy-global-sheet h2{margin:0;color:#fffaf0;font-size:24px;line-height:1;font-weight:1000}\
#digiy-global-sheet .dgn-close{width:54px;height:54px;border-radius:19px;border:1px solid rgba(246,196,83,.35);background:rgba(255,255,255,.08);color:#fff3cf;font-size:29px;cursor:pointer}\
#digiy-global-sheet .dgn-lead{margin:12px 2px 0;color:rgba(255,250,240,.76);font-size:13px;font-weight:850;line-height:1.45}\
#digiy-global-sheet .dgn-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;margin-top:14px}\
#digiy-global-sheet .dgn-grid a{min-height:60px;border-radius:19px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.075);color:#fffaf0;display:flex;align-items:center;justify-content:center;text-align:center;padding:10px;font-size:13.5px;line-height:1.2;font-weight:1000;text-decoration:none}\
#digiy-global-sheet .dgn-grid a.dgn-gold{background:linear-gradient(135deg,#fff1bd,#f6c453,#22c55e);color:#06140f;border-color:rgba(246,196,83,.75)}\
#digiy-global-sheet .dgn-favs{display:grid;gap:9px;margin-top:14px}\
#digiy-global-sheet .dgn-fav{display:grid;grid-template-columns:52px 1fr auto;gap:9px;align-items:center;padding:10px;border:1px solid rgba(255,255,255,.14);border-radius:20px;background:rgba(255,255,255,.065)}\
#digiy-global-sheet .dgn-fav.dgn-selected{border-color:rgba(246,196,83,.68);background:rgba(246,196,83,.11)}\
#digiy-global-sheet .dgn-fav-icon{font-size:27px;text-align:center}\
#digiy-global-sheet .dgn-fav a{color:#fffaf0;font-size:14px;font-weight:1000;text-decoration:none}\
#digiy-global-sheet .dgn-star{width:48px;height:48px;border-radius:15px;border:1px solid rgba(246,196,83,.48);background:rgba(255,255,255,.07);color:#f6c453;font-size:27px;cursor:pointer}\
.dgn-page-lock{overflow:hidden!important}\
.dgn-spacer{height:0}\
@media(max-width:1160px) and (min-width:761px){#digiy-global-dock{right:9px;width:72px}}\
@media(max-width:760px){#digiy-global-dock{left:8px;right:8px;top:auto;bottom:calc(8px + env(safe-area-inset-bottom));width:auto;transform:none;grid-template-columns:repeat(5,minmax(0,1fr));gap:5px;padding:6px;border-radius:22px}#digiy-global-dock a,#digiy-global-dock button{min-height:57px;padding:5px 2px;border-radius:15px}#digiy-global-dock .dgn-icon{font-size:19px}#digiy-global-dock small{font-size:9px}.dgn-spacer{height:calc(102px + env(safe-area-inset-bottom))}#digiy-global-sheet .dgn-grid{grid-template-columns:1fr}}\
@media(max-width:360px){#digiy-global-dock small{font-size:8.2px}#digiy-global-dock .dgn-icon{font-size:18px}}\
@media print{#digiy-global-dock,#digiy-global-sheet,#digiy-global-overlay,.dgn-spacer{display:none!important}}';
  document.head.appendChild(style);

  var dock=el('nav',{id:'digiy-global-dock','aria-label':'Navigation permanente DIGIYLYFE'});
  dock.innerHTML='\
<a href="'+HOME+'"><span class="dgn-icon" aria-hidden="true">⌂</span><small>'+copy.home+'</small></a>\
<a href="'+HUB+'"><span class="dgn-icon" aria-hidden="true">🧭</span><small>'+copy.hub+'</small></a>\
<button type="button" class="dgn-main" data-dgn-open="menu"><span class="dgn-icon" aria-hidden="true">☰</span><small>'+copy.menu+'</small></button>\
<button type="button" data-dgn-open="favorites"><span class="dgn-icon" aria-hidden="true">★</span><small>'+copy.favorites+'</small></button>\
<button type="button" data-dgn-back><span class="dgn-icon" aria-hidden="true">↩</span><small>'+copy.back+'</small></button>';

  var overlay=el('div',{id:'digiy-global-overlay','aria-hidden':'true'});
  var sheet=el('div',{id:'digiy-global-sheet','aria-hidden':'true','role':'dialog','aria-modal':'true'});
  var card=el('div',{class:'dgn-card'});
  var head=el('div',{class:'dgn-head'});
  var title=el('h2',{text:copy.menuTitle});
  var close=el('button',{type:'button',class:'dgn-close','aria-label':copy.close,text:'×'});
  var body=el('div',{class:'dgn-body'});
  head.appendChild(title);head.appendChild(close);card.appendChild(head);card.appendChild(body);sheet.appendChild(card);
  var spacer=el('div',{class:'dgn-spacer','aria-hidden':'true'});

  var menuLinks=[
    ['🔎 Trouver un professionnel','https://digiylyfe.com/recherche.html',true],
    ['🧭 HUB DIGIYLYFE',HUB,true],
    ['🚗 DRIVER','https://driver-client.digiylyfe.com/'],
    ['🏠 LOC','https://loc.digiylyfe.com/'],
    ['🛍️ MARKET','https://market.digiylyfe.com/'],
    ['🏗️ BUILD','https://build.digiylyfe.com/'],
    ['💼 JOBS','https://jobs.digiylyfe.com/'],
    ['📅 RESA','https://resa-table-resto.digiylyfe.com/'],
    ['📒 CARNET PRO','https://digiy-carnet-pro.digiylyfe.com/'],
    ['🗺️ EXPLORE','https://explore.digiylyfe.com/'],
    ['▣ Pack Présence Terrain','https://digiylyfe.com/presence-terrain.html',true],
    ['🧪 Activation pilote','https://partenaire-pilote.digiylyfe.com/',true],
    ['📊 Voir les offres','https://digiylyfe.com/tarif-entreprise-petite-cote.html#choisir'],
    ['🔐 Espace pro','https://pro-espace.digiylyfe.com/'],
    ['🏛️ Architecture','https://digiylyfe.com/architecture-digiylyfe.html'],
    ['🌍 Accueil',HOME]
  ];

  function renderMenu(){
    title.textContent=copy.menuTitle;
    body.innerHTML='';
    var grid=el('div',{class:'dgn-grid'});
    menuLinks.forEach(function(item){
      var link=el('a',{href:item[1],class:item[2]?'dgn-gold':''});
      link.textContent=item[0];
      grid.appendChild(link);
    });
    body.appendChild(grid);
  }

  function renderFavorites(){
    title.textContent=copy.favTitle;
    body.innerHTML='';
    body.appendChild(el('p',{class:'dgn-lead',text:copy.favLead}));
    var ids=loadFavorites();
    var wrap=el('div',{class:'dgn-favs'});
    favoriteChoices.slice().sort(function(a,b){return ids.indexOf(a.id)===-1?1:ids.indexOf(b.id)===-1?-1:ids.indexOf(a.id)-ids.indexOf(b.id);}).forEach(function(item){
      var selected=ids.indexOf(item.id)!==-1;
      var row=el('div',{class:'dgn-fav'+(selected?' dgn-selected':'')});
      row.appendChild(el('span',{class:'dgn-fav-icon','aria-hidden':'true',text:item.icon}));
      row.appendChild(el('a',{href:item.url,text:item[lang]}));
      var star=el('button',{type:'button',class:'dgn-star','aria-label':selected?copy.selected:copy.notSelected,'aria-pressed':selected?'true':'false',text:selected?'★':'☆'});
      star.addEventListener('click',function(){
        var next=loadFavorites();
        var pos=next.indexOf(item.id);
        if(pos!==-1) next.splice(pos,1);
        else if(next.length<3) next.push(item.id);
        saveFavorites(next);
        renderFavorites();
      });
      row.appendChild(star);wrap.appendChild(row);
    });
    body.appendChild(wrap);
  }

  function openPanel(mode){
    if(mode==='favorites') renderFavorites(); else renderMenu();
    overlay.classList.add('dgn-open');sheet.classList.add('dgn-open');
    overlay.setAttribute('aria-hidden','false');sheet.setAttribute('aria-hidden','false');
    document.documentElement.classList.add('dgn-page-lock');
    setTimeout(function(){close.focus();},20);
  }

  function closePanel(){
    overlay.classList.remove('dgn-open');sheet.classList.remove('dgn-open');
    overlay.setAttribute('aria-hidden','true');sheet.setAttribute('aria-hidden','true');
    document.documentElement.classList.remove('dgn-page-lock');
  }

  dock.querySelectorAll('[data-dgn-open]').forEach(function(button){button.addEventListener('click',function(){openPanel(button.getAttribute('data-dgn-open'));});});
  dock.querySelector('[data-dgn-back]').addEventListener('click',function(){if(history.length>1) history.back();else location.href=HOME;});
  overlay.addEventListener('click',closePanel);close.addEventListener('click',closePanel);
  document.addEventListener('keydown',function(event){if(event.key==='Escape')closePanel();});
  sheet.addEventListener('click',function(event){if(event.target.closest('a'))closePanel();});

  document.body.appendChild(dock);
  document.body.appendChild(overlay);
  document.body.appendChild(sheet);
  document.body.appendChild(spacer);
})();
