/* DIGIYLYFE — 3 favoris + doctrine en tête de vitrine */
(function(){
  'use strict';
  if(window.__DIGIY_VITRINE_TOP_FAVORIS__) return;
  window.__DIGIY_VITRINE_TOP_FAVORIS__=true;

  var SUP=['fr','en','es','pt','de','it','nl','ar'];
  var COPY={
    fr:{title:'⭐ 3 FAVORIS',voice:'LA VOIX · ACTION PRO',pc:'PETITE CÔTE',dd:'VALLÉE DE LA DORDOGNE',doctrine:['Je clique.','Je parle.','J’existe.','Je suis visible.','Je suis reconnu.','J’avance.']},
    en:{title:'⭐ 3 FAVORITES',voice:'VOICE · ACTION PRO',pc:'PETITE CÔTE',dd:'DORDOGNE VALLEY',doctrine:['I click.','I speak.','I exist.','I am visible.','I am recognized.','I move forward.']},
    es:{title:'⭐ 3 FAVORITOS',voice:'LA VOZ · ACTION PRO',pc:'PETITE CÔTE',dd:'VALLE DEL DORDOÑA',doctrine:['Hago clic.','Hablo.','Existo.','Soy visible.','Soy reconocido.','Avanzo.']},
    pt:{title:'⭐ 3 FAVORITOS',voice:'A VOZ · ACTION PRO',pc:'PETITE CÔTE',dd:'VALE DA DORDOGNE',doctrine:['Eu clico.','Eu falo.','Eu existo.','Sou visível.','Sou reconhecido.','Eu avanço.']},
    de:{title:'⭐ 3 FAVORITEN',voice:'DIE STIMME · ACTION PRO',pc:'PETITE CÔTE',dd:'DORDOGNE-TAL',doctrine:['Ich klicke.','Ich spreche.','Ich existiere.','Ich bin sichtbar.','Ich werde erkannt.','Ich komme voran.']},
    it:{title:'⭐ 3 PREFERITI',voice:'LA VOCE · ACTION PRO',pc:'PETITE CÔTE',dd:'VALLE DELLA DORDOGNA',doctrine:['Clicco.','Parlo.','Esisto.','Sono visibile.','Sono riconosciuto.','Vado avanti.']},
    nl:{title:'⭐ 3 FAVORIETEN',voice:'DE STEM · ACTION PRO',pc:'PETITE CÔTE',dd:'DORDOGNEVALLEI',doctrine:['Ik klik.','Ik spreek.','Ik besta.','Ik ben zichtbaar.','Ik word herkend.','Ik ga vooruit.']},
    ar:{title:'⭐ 3 مفضلات',voice:'الصوت · ACTION PRO',pc:'الساحل الصغير',dd:'وادي دوردوني',doctrine:['أنقر.','أتحدث.','أنا موجود.','أنا ظاهر.','أنا معروف.','أتقدم.']}
  };

  function lang(){
    var l=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();
    return SUP.indexOf(l)>=0?l:'fr';
  }

  function installStyle(){
    if(document.getElementById('digiyVitrineTopFavorisStyle')) return;
    var st=document.createElement('style');
    st.id='digiyVitrineTopFavorisStyle';
    st.textContent='\
      .digiyTopFavorites{margin:0 0 10px;padding:10px;border:1px solid rgba(246,196,83,.42);border-radius:22px;background:linear-gradient(145deg,rgba(246,196,83,.10),rgba(34,197,94,.08));box-shadow:0 10px 28px rgba(0,0,0,.18)}\
      .digiyTopFavoritesTitle{margin:0 0 7px;color:#fff3cf;font-size:10px;font-weight:1000;letter-spacing:.10em;text-align:center}\
      .digiyTopFavoritesGrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:7px}\
      .digiyTopFavorite{min-height:46px;padding:7px 9px;border:1px solid rgba(255,255,255,.14);border-radius:15px;background:rgba(255,255,255,.07);display:flex;align-items:center;justify-content:center;gap:6px;text-align:center;color:#fff;font-size:11px;line-height:1.1;font-weight:1000}\
      .digiyTopFavorite:first-child{border-color:rgba(246,196,83,.58);background:linear-gradient(135deg,rgba(246,196,83,.20),rgba(34,197,94,.14));color:#fff3cf}\
      .digiyTopDoctrine{margin:0 0 12px;padding:10px 11px;border:1px solid rgba(34,197,94,.34);border-radius:18px;background:rgba(255,255,255,.055);display:flex;align-items:center;justify-content:center;gap:6px;flex-wrap:wrap;text-align:center}\
      .digiyTopDoctrine span{font-size:11px;font-weight:950;color:rgba(255,250,240,.88)}\
      .digiyTopDoctrine i{font-style:normal;color:rgba(246,196,83,.62);font-weight:1000}\
      .digiyTopDoctrine strong{color:#f6c453;font-size:12px;font-weight:1000;letter-spacing:.05em}\
      @media(max-width:520px){.digiyTopFavorites{padding:8px;border-radius:18px}.digiyTopFavoritesGrid{gap:5px}.digiyTopFavorite{min-height:42px;padding:6px 5px;font-size:9px;border-radius:13px}.digiyTopDoctrine{padding:8px 7px;gap:4px}.digiyTopDoctrine span{font-size:9.5px}.digiyTopDoctrine strong{font-size:10px}}\
      html[dir="rtl"] .digiyTopDoctrine{direction:rtl}\
    ';
    document.head.appendChild(st);
  }

  function install(){
    if(document.getElementById('digiyTopFavorites')) return;
    var strip=document.querySelector('.languageStrip');
    var hero=document.querySelector('.hero');
    if(!strip||!hero) return;

    var world=document.querySelector('.worldHub');
    if(world&&!world.id) world.id='territoires';
    var cards=document.querySelectorAll('.territoryCard');
    cards.forEach(function(a){
      var href=a.getAttribute('href')||'';
      if(href.indexOf('petite-cote')>=0) a.id='territoire-petite-cote';
      if(href.indexOf('vallee-dordogne')>=0) a.id='territoire-dordogne';
    });

    var fav=document.createElement('section');
    fav.id='digiyTopFavorites';
    fav.className='digiyTopFavorites';
    fav.setAttribute('aria-label','3 favoris DIGIYLYFE');
    fav.innerHTML='<div class="digiyTopFavoritesTitle" data-vitrine-top="title"></div><div class="digiyTopFavoritesGrid">'+
      '<a class="digiyTopFavorite" href="https://pro-action-digiy.digiylyfe.com/" target="_blank" rel="noopener noreferrer"><span>🎙️</span><b data-vitrine-top="voice"></b></a>'+
      '<a class="digiyTopFavorite" href="#territoire-petite-cote"><span>🇸🇳</span><b data-vitrine-top="pc"></b></a>'+
      '<a class="digiyTopFavorite" href="#territoire-dordogne"><span>🇫🇷</span><b data-vitrine-top="dd"></b></a>'+
      '</div>';

    var doctrine=document.createElement('div');
    doctrine.id='digiyTopDoctrine';
    doctrine.className='digiyTopDoctrine';

    strip.insertAdjacentElement('afterend',fav);
    fav.insertAdjacentElement('afterend',doctrine);
    apply();
  }

  function apply(){
    var l=lang(),c=C[l];
    document.querySelectorAll('[data-vitrine-top]').forEach(function(el){
      var k=el.getAttribute('data-vitrine-top');
      if(c[k]) el.textContent=c[k];
    });
    var d=document.getElementById('digiyTopDoctrine');
    if(d){
      var parts=[];
      c.doctrine.forEach(function(x,i){parts.push('<span>'+x+'</span>');if(i<c.doctrine.length-1)parts.push('<i>·</i>');});
      parts.push('<i>·</i><strong>DIGIYLYFE</strong>');
      d.innerHTML=parts.join('');
    }
  }

  installStyle();
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install,{once:true}); else install();
  new MutationObserver(function(m){
    if(m.some(function(x){return x.type==='attributes'&&x.attributeName==='lang';})) apply();
  }).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
})();
