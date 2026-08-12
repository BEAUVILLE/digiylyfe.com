/* DIGIYLYFE — favoris modules interactifs + doctrine en tête de vitrine */
(function(){
  'use strict';
  if(window.__DIGIY_VITRINE_TOP_FAVORIS_V2__) return;
  window.__DIGIY_VITRINE_TOP_FAVORIS_V2__=true;

  var STORE='digiylyfe_public_favorites_v1';
  var MAX=3;
  var DEFAULTS=['voice'];
  var SUP=['fr','en','es','pt','de','it','nl','ar'];
  var COPY={
    fr:{title:'⭐ MES FAVORIS · 3 MAX',empty:'Touchez ⭐ sur vos modules préférés : ils remonteront ici.',voice:'LA VOIX',doctrine:['Je clique.','Je parle.','J’existe.','Je suis visible.','Je suis reconnu.','J’avance.'],max:'Maximum 3 favoris.'},
    en:{title:'⭐ MY FAVORITES · MAX 3',empty:'Tap ⭐ on your favorite modules: they will appear here.',voice:'VOICE',doctrine:['I click.','I speak.','I exist.','I am visible.','I am recognized.','I move forward.'],max:'Maximum 3 favorites.'},
    es:{title:'⭐ MIS FAVORITOS · MÁX. 3',empty:'Pulse ⭐ en sus módulos favoritos: aparecerán aquí.',voice:'LA VOZ',doctrine:['Hago clic.','Hablo.','Existo.','Soy visible.','Soy reconocido.','Avanzo.'],max:'Máximo 3 favoritos.'},
    pt:{title:'⭐ MEUS FAVORITOS · MÁX. 3',empty:'Toque em ⭐ nos seus módulos favoritos: aparecerão aqui.',voice:'A VOZ',doctrine:['Eu clico.','Eu falo.','Eu existo.','Sou visível.','Sou reconhecido.','Eu avanço.'],max:'Máximo de 3 favoritos.'},
    de:{title:'⭐ MEINE FAVORITEN · MAX. 3',empty:'Tippen Sie ⭐ bei Ihren Lieblingsmodulen: sie erscheinen hier.',voice:'DIE STIMME',doctrine:['Ich klicke.','Ich spreche.','Ich existiere.','Ich bin sichtbar.','Ich werde erkannt.','Ich komme voran.'],max:'Maximal 3 Favoriten.'},
    it:{title:'⭐ I MIEI PREFERITI · MAX 3',empty:'Tocca ⭐ sui moduli preferiti: appariranno qui.',voice:'LA VOCE',doctrine:['Clicco.','Parlo.','Esisto.','Sono visibile.','Sono riconosciuto.','Vado avanti.'],max:'Massimo 3 preferiti.'},
    nl:{title:'⭐ MIJN FAVORIETEN · MAX. 3',empty:'Tik ⭐ op uw favoriete modules: ze verschijnen hier.',voice:'DE STEM',doctrine:['Ik klik.','Ik spreek.','Ik besta.','Ik ben zichtbaar.','Ik word herkend.','Ik ga vooruit.'],max:'Maximaal 3 favorieten.'},
    ar:{title:'⭐ مفضلاتي · 3 كحد أقصى',empty:'اضغط ⭐ على وحداتك المفضلة لتظهر هنا.',voice:'الصوت',doctrine:['أنقر.','أتحدث.','أنا موجود.','أنا ظاهر.','أنا معروف.','أتقدم.'],max:'الحد الأقصى 3 مفضلات.'}
  };

  var MODULES=[];
  var favorites=[];

  function lang(){
    var l=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();
    return SUP.indexOf(l)>=0?l:'fr';
  }

  function readFavs(){
    try{
      var raw=JSON.parse(localStorage.getItem(STORE)||'null');
      if(Array.isArray(raw)) return raw.filter(function(x){return typeof x==='string';}).slice(0,MAX);
    }catch(e){}
    return DEFAULTS.slice();
  }
  function saveFavs(){try{localStorage.setItem(STORE,JSON.stringify(favorites.slice(0,MAX)));}catch(e){}}

  function keyFromHref(href){
    try{
      var u=new URL(href,location.href);
      var host=u.hostname.replace(/^www\./,'');
      var map={
        'pro-action-digiy.digiylyfe.com':'voice',
        'digiy-hub.digiylyfe.com':'rencontre',
        'driver-client.digiylyfe.com':'driver',
        'loc.digiylyfe.com':'loc',
        'resa-table-resto.digiylyfe.com':'resa',
        'market.digiylyfe.com':'market',
        'bonne-affaire.digiylyfe.com':'bonne-affaire',
        'build.digiylyfe.com':'build',
        'jobs.digiylyfe.com':'jobs',
        'explore.digiylyfe.com':'explore',
        'reseau-digiy.digiylyfe.com':'reseau'
      };
      if(host==='digiy-hub.digiylyfe.com' && u.pathname.indexOf('/rencontre')>=0) return 'rencontre';
      return map[host]||host.replace('.digiylyfe.com','');
    }catch(e){return href;}
  }

  function iconOf(card){
    var i=card.querySelector('i,.publicLeadIcon');
    return i?(i.textContent||'').trim():'⭐';
  }
  function labelOf(card,key){
    if(key==='voice') return COPY[lang()].voice;
    var s=card.querySelector('strong');
    return s?(s.textContent||'').trim():key.toUpperCase();
  }
  function descOf(card){
    var s=card.querySelector('small,.publicLeadCopy span');
    return s?(s.textContent||'').trim():'';
  }

  function collectModules(){
    MODULES=[];
    var nodes=[];
    var voice=document.querySelector('.publicLeadDoor');
    if(voice) nodes.push(voice);
    document.querySelectorAll('.publicCard').forEach(function(el){nodes.push(el);});
    nodes.forEach(function(card){
      var href=card.getAttribute('href')||'';
      if(!href) return;
      var key=keyFromHref(href);
      MODULES.push({key:key,card:card,href:href,icon:iconOf(card)});
      card.style.position='relative';
      if(!card.querySelector('.digiyFavStar')){
        var star=document.createElement('button');
        star.type='button';
        star.className='digiyFavStar';
        star.setAttribute('data-fav-key',key);
        star.setAttribute('aria-label','Favori');
        star.textContent='☆';
        card.appendChild(star);
      }
    });
  }

  function item(key){return MODULES.find(function(x){return x.key===key;})||null;}
  function isFav(key){return favorites.indexOf(key)>=0;}

  function toggle(key){
    var idx=favorites.indexOf(key);
    if(idx>=0){favorites.splice(idx,1);}
    else{
      if(favorites.length>=MAX){alert(COPY[lang()].max);return;}
      favorites.push(key);
    }
    saveFavs();
    render();
  }

  function installStyle(){
    if(document.getElementById('digiyVitrineFavStyleV2')) return;
    var st=document.createElement('style');
    st.id='digiyVitrineFavStyleV2';
    st.textContent='\
      .digiyTopFavorites{margin:0 0 10px;padding:12px;border:1px solid rgba(246,196,83,.48);border-radius:22px;background:linear-gradient(145deg,rgba(246,196,83,.11),rgba(34,197,94,.08));box-shadow:0 10px 28px rgba(0,0,0,.18)}\
      .digiyTopFavoritesTitle{margin:0 0 8px;color:#fff3cf;font-size:12px;font-weight:1000;letter-spacing:.08em;text-align:center}\
      .digiyTopFavoritesGrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}\
      .digiyTopFavorite{min-height:68px;padding:10px 9px;border:1px solid rgba(255,255,255,.16);border-radius:17px;background:rgba(255,255,255,.075);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;text-align:center;color:#fff;font-size:13px;line-height:1.08;font-weight:1000}\
      .digiyTopFavorite .ico{font-size:23px;line-height:1}.digiyTopFavorite b{font-size:13px;line-height:1.08}.digiyTopFavorite.voiceFav{border-color:rgba(246,196,83,.68);background:linear-gradient(135deg,rgba(246,196,83,.24),rgba(34,197,94,.16));color:#fff3cf}.digiyTopFavorite.voiceFav b{font-size:15px}\
      .digiyTopFavoritesEmpty{padding:13px 10px;border:1px dashed rgba(246,196,83,.30);border-radius:15px;color:rgba(255,250,240,.76);font-size:11px;line-height:1.35;font-weight:900;text-align:center}\
      .digiyFavStar{position:absolute;top:7px;right:7px;z-index:4;width:34px;height:34px;border-radius:999px;border:1px solid rgba(246,196,83,.46);background:rgba(3,18,13,.90);color:#fff3cf;display:grid;place-items:center;padding:0;font-size:19px;line-height:1;cursor:pointer;box-shadow:0 7px 18px rgba(0,0,0,.24)}\
      .digiyFavStar.active{background:linear-gradient(135deg,#fff1bd,#f6c453,#22c55e);color:#06140f;border-color:#f6c453}.publicLeadDoor .digiyFavStar{top:8px;right:8px}\
      .digiyTopDoctrine{margin:0 0 12px;padding:10px 11px;border:1px solid rgba(34,197,94,.34);border-radius:18px;background:rgba(255,255,255,.055);display:flex;align-items:center;justify-content:center;gap:6px;flex-wrap:wrap;text-align:center}.digiyTopDoctrine span{font-size:11px;font-weight:950;color:rgba(255,250,240,.88)}.digiyTopDoctrine i{font-style:normal;color:rgba(246,196,83,.62);font-weight:1000}.digiyTopDoctrine strong{color:#f6c453;font-size:12px;font-weight:1000;letter-spacing:.05em}\
      @media(max-width:520px){.digiyTopFavorites{padding:9px;border-radius:18px}.digiyTopFavoritesGrid{gap:5px}.digiyTopFavorite{min-height:62px;padding:8px 5px}.digiyTopFavorite b{font-size:11px}.digiyTopFavorite.voiceFav b{font-size:13px}.digiyTopFavorite .ico{font-size:21px}.digiyFavStar{width:32px;height:32px;font-size:18px}.digiyTopDoctrine{padding:8px 7px;gap:4px}.digiyTopDoctrine span{font-size:9.5px}.digiyTopDoctrine strong{font-size:10px}}\
      html[dir="rtl"] .digiyFavStar{right:auto;left:7px}html[dir="rtl"] .digiyTopDoctrine{direction:rtl}\
    ';
    document.head.appendChild(st);
  }

  function installTop(){
    if(document.getElementById('digiyTopFavorites')) return;
    var strip=document.querySelector('.languageStrip');
    var hero=document.querySelector('.hero');
    if(!strip||!hero) return;
    var fav=document.createElement('section');
    fav.id='digiyTopFavorites';
    fav.className='digiyTopFavorites';
    fav.innerHTML='<div class="digiyTopFavoritesTitle"></div><div class="digiyTopFavoritesGrid"></div>';
    var doctrine=document.createElement('div');
    doctrine.id='digiyTopDoctrine';
    doctrine.className='digiyTopDoctrine';
    strip.insertAdjacentElement('afterend',fav);
    fav.insertAdjacentElement('afterend',doctrine);
  }

  function renderTop(){
    var c=COPY[lang()];
    var root=document.getElementById('digiyTopFavorites');
    if(!root) return;
    root.querySelector('.digiyTopFavoritesTitle').textContent=c.title;
    var grid=root.querySelector('.digiyTopFavoritesGrid');
    var valid=favorites.map(item).filter(Boolean);
    if(!valid.length){grid.innerHTML='<div class="digiyTopFavoritesEmpty" style="grid-column:1/-1">'+c.empty+'</div>';}
    else{
      grid.innerHTML=valid.map(function(m){
        var label=labelOf(m.card,m.key);
        return '<a class="digiyTopFavorite'+(m.key==='voice'?' voiceFav':'')+'" href="'+m.href+'" target="_blank" rel="noopener noreferrer"><span class="ico">'+m.icon+'</span><b>'+label+'</b></a>';
      }).join('');
    }
  }

  function renderStars(){
    MODULES.forEach(function(m){
      var s=m.card.querySelector('.digiyFavStar');
      if(!s) return;
      var on=isFav(m.key);
      s.classList.toggle('active',on);
      s.textContent=on?'⭐':'☆';
      s.setAttribute('aria-pressed',on?'true':'false');
    });
  }

  function renderDoctrine(){
    var c=COPY[lang()];
    var d=document.getElementById('digiyTopDoctrine');
    if(!d) return;
    var parts=[];
    c.doctrine.forEach(function(x,i){parts.push('<span>'+x+'</span>');if(i<c.doctrine.length-1)parts.push('<i>·</i>');});
    parts.push('<i>·</i><strong>DIGIYLYFE</strong>');
    d.innerHTML=parts.join('');
  }

  function render(){renderStars();renderTop();renderDoctrine();}

  function boot(){
    installStyle();
    installTop();
    collectModules();
    favorites=readFavs().filter(function(k){return !!item(k);}).slice(0,MAX);
    if(!favorites.length && item('voice')) favorites=['voice'];
    saveFavs();
    document.addEventListener('click',function(e){
      var star=e.target.closest&&e.target.closest('.digiyFavStar');
      if(!star) return;
      e.preventDefault();e.stopPropagation();
      toggle(star.getAttribute('data-fav-key'));
    },true);
    render();
    new MutationObserver(function(m){if(m.some(function(x){return x.type==='attributes'&&x.attributeName==='lang';})) render();}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true}); else boot();
})();