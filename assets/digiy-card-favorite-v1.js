/* DIGIYLYFE — Carte adhérent -> MON DIGIY
   Pont volontaire par navigation : les cartes peuvent vivre sur des sous-domaines
   différents, tandis que le carnet personnel appartient à https://digiylyfe.com.
*/
(function(){
  'use strict';
  if(window.__DIGIY_CARD_FAVORITE_V1__) return;
  window.__DIGIY_CARD_FAVORITE_V1__=true;

  var DEST='https://digiylyfe.com/mon-digiy.html';

  function clean(v){return String(v||'').trim();}
  function hasPlaceholder(v){return /\{\{[^}]+\}\}/.test(String(v||''));}
  function validHttp(v){
    try{
      var u=new URL(clean(v),location.href);
      return /^https?:$/.test(u.protocol)?u.toString():'';
    }catch(e){return '';}
  }
  function slug(v){
    return clean(v).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,150);
  }
  function cardHref(){
    var canonical=document.querySelector('link[rel="canonical"]');
    var h=canonical&&validHttp(canonical.getAttribute('href'));
    if(h&&!hasPlaceholder(h)) return h;
    return validHttp(location.href.split('#')[0]);
  }
  function text(id){var el=document.getElementById(id);return el?clean(el.textContent):'';}
  function installStyle(){
    if(document.getElementById('digiyCardFavoriteStyleV1')) return;
    var st=document.createElement('style');
    st.id='digiyCardFavoriteStyleV1';
    st.textContent='\
      .digiyCardFavoriteStar{position:absolute;top:13px;right:13px;z-index:30;width:46px;height:46px;border-radius:999px;border:1px solid rgba(246,196,83,.72);background:rgba(3,18,13,.90);color:#fff3cf;display:grid;place-items:center;padding:0;font:1000 25px/1 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;box-shadow:0 9px 24px rgba(0,0,0,.34);cursor:pointer;-webkit-tap-highlight-color:transparent}\
      .digiyCardFavoriteStar:hover,.digiyCardFavoriteStar:focus-visible{background:linear-gradient(135deg,#fff1bd,#f6c453,#22c55e);color:#06140f;transform:translateY(-1px)}\
      .digiyCardFavoriteStar:focus-visible{outline:3px solid rgba(246,196,83,.52);outline-offset:3px}\
      html[dir="rtl"] .digiyCardFavoriteStar{right:auto;left:13px}\
      @media(max-width:420px){.digiyCardFavoriteStar{top:10px;right:10px;width:42px;height:42px;font-size:23px}html[dir="rtl"] .digiyCardFavoriteStar{right:auto;left:10px}}\
    ';
    document.head.appendChild(st);
  }
  function boot(){
    var card=document.getElementById('businessCard');
    var top=card&&card.querySelector('.top');
    var name=text('cardName');
    var href=cardHref();
    if(!card||!top||!name||hasPlaceholder(name)||!href) return;

    var robots=document.querySelector('meta[name="robots"]');
    if(robots&&/noindex/i.test(robots.getAttribute('content')||'')) return;
    if(document.getElementById('digiyCardFavoriteStar')) return;

    var job=text('cardJob');
    var zone=text('cardZone');
    var id='pro-'+slug((function(){try{var u=new URL(href);return u.hostname+u.pathname;}catch(e){return href;}})());
    if(!id||id==='pro-') id='pro-'+slug(name+'-'+job+'-'+zone);

    var p=new URLSearchParams();
    p.set('digiy_add','1');
    p.set('id',id);
    p.set('label',name);
    p.set('href',href);
    p.set('kind','professionnel');
    p.set('icon','🪪');
    if(job) p.set('job',job);
    if(zone) p.set('zone',zone);

    installStyle();
    top.style.position='relative';
    var a=document.createElement('a');
    a.id='digiyCardFavoriteStar';
    a.className='digiyCardFavoriteStar';
    a.href=DEST+'?'+p.toString();
    a.textContent='☆';
    a.setAttribute('aria-label','Ajouter '+name+' à MON DIGIY');
    a.setAttribute('title','Ajouter à MON DIGIY');
    top.appendChild(a);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
