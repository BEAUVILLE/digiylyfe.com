/* DIGIYLYFE WORLD8 — shared international bridge — production */
(function(){
  'use strict';
  if(window.__DIGIY_WORLD8__) return;
  window.__DIGIY_WORLD8__=true;

  var SUPPORTED=['fr','en','es','pt','de','it','nl','ar'];
  var LABELS={fr:'🇫🇷 FR',en:'🇬🇧 EN',es:'🇪🇸 ES',pt:'🇵🇹 PT',de:'🇩🇪 DE',it:'🇮🇹 IT',nl:'🇳🇱 NL',ar:'🌙 AR'};
  var query=new URLSearchParams(location.search);
  function safe(v){v=String(v||'').slice(0,2).toLowerCase();return SUPPORTED.includes(v)?v:''}
  var lang=safe(query.get('lang'));
  if(!lang){try{lang=safe(localStorage.getItem('digiy-lang'))||safe(localStorage.getItem('digiy_lang'))||safe(localStorage.getItem('digiy_hub_lang_8'))||safe(localStorage.getItem('digiy_hub_lang_7'))}catch(e){}}
  if(!lang) lang=safe(navigator.language)||'fr';

  function remember(l){
    try{localStorage.setItem('digiy-lang',l);localStorage.setItem('digiy_lang',l);localStorage.setItem('digiy_hub_lang_8',l)}catch(e){}
  }
  remember(lang);
  document.documentElement.lang=lang;
  document.documentElement.dir=lang==='ar'?'rtl':'ltr';

  function withLang(url){
    try{
      var u=new URL(url,location.href);
      if(!/(^|\.)digiylyfe\.com$/i.test(u.hostname)) return u.toString();
      if(/^https?:$/.test(u.protocol)) u.searchParams.set('lang',lang);
      return u.toString();
    }catch(e){return url}
  }
  function decorateLinks(root){
    (root||document).querySelectorAll&& (root||document).querySelectorAll('a[href]').forEach(function(a){
      var href=a.getAttribute('href');
      if(!href||href.startsWith('#')||/^(mailto:|tel:|javascript:)/i.test(href)) return;
      try{var u=new URL(href,location.href);if(/(^|\.)digiylyfe\.com$/i.test(u.hostname)) a.href=withLang(u.href)}catch(e){}
    });
  }
  function controlLang(el){
    if(!el)return '';
    var v=el.getAttribute('data-world8-lang')||el.getAttribute('data-shell-lang')||el.getAttribute('data-lang')||el.getAttribute('data-l')||el.getAttribute('data-lang-choice')||el.getAttribute('data-lang-btn')||el.getAttribute('data-resto-lang')||el.getAttribute('data-digiy-lang')||el.lang||'';
    if(!v){var t=(el.textContent||'').trim().toLowerCase();SUPPORTED.some(function(x){if(t===x||t.endsWith(' '+x)){v=x;return true}return false})}
    return safe(v);
  }
  function findNativeBar(){
    var selectors=['.language-buttons','.langbar','.langs','.langSwitch','.digiyLangSwitch','.digiy-langbar','[data-language-bar]','nav.lang','nav[aria-label*="lang" i]','[aria-label*="choisir la langue" i]'];
    for(var i=0;i<selectors.length;i++){var el=document.querySelector(selectors[i]);if(el)return el}
    return null;
  }
  function existingLanguages(bar){var set=new Set();bar&&bar.querySelectorAll('a,button').forEach(function(el){var l=controlLang(el);if(l)set.add(l)});return set}
  function makeControl(l){
    var a=document.createElement('a');a.href='?lang='+l;a.dataset.world8Lang=l;a.lang=l;a.textContent=LABELS[l];
    a.style.cssText='flex:0 0 auto;min-width:42px;min-height:34px;padding:7px 8px;border-radius:999px;display:inline-flex;align-items:center;justify-content:center;text-align:center;text-decoration:none;color:inherit;font:900 10.5px system-ui;border:1px solid rgba(255,255,255,.16);background:'+(l===lang?'linear-gradient(135deg,#f6c453,#22c55e)':'rgba(255,255,255,.07)')+';'+(l===lang?'color:#06140f;':'');
    return a;
  }
  function makeWorld8Bar(){
    var bar=document.createElement('nav');bar.dataset.world8Bar='1';bar.setAttribute('aria-label','Languages');
    bar.style.cssText='display:flex;gap:4px;max-width:100%;overflow:auto;padding:5px;border-radius:999px;background:rgba(3,18,12,.88);border:1px solid rgba(255,255,255,.18);scrollbar-width:none';
    SUPPORTED.forEach(function(l){bar.appendChild(makeControl(l))});return bar;
  }
  function ensureLanguageAccess(){
    if(document.querySelector('[data-world8-bar]'))return;
    var nativeBar=findNativeBar();
    if(nativeBar){
      var have=existingLanguages(nativeBar);
      nativeBar.style.overflowX='auto';nativeBar.style.scrollbarWidth='none';nativeBar.style.maxWidth='100%';
      SUPPORTED.forEach(function(l){
        if(have.has(l))return;
        var ref=null;
        if(l==='pt')nativeBar.querySelectorAll('a,button').forEach(function(el){if(controlLang(el)==='de'&&!ref)ref=el});
        var a=makeControl(l);if(ref)nativeBar.insertBefore(a,ref);else nativeBar.appendChild(a);
      });
      return;
    }
    var bar=makeWorld8Bar();bar.style.position='sticky';bar.style.top='6px';bar.style.zIndex='99999';document.body.prepend(bar);
  }
  function bindLanguageControls(){
    document.addEventListener('click',function(ev){
      var el=ev.target.closest('[data-world8-lang],[data-shell-lang],[data-lang],[data-l],[data-lang-choice],[data-lang-btn],[data-resto-lang],[data-digiy-lang]');
      if(!el)return;
      var next=controlLang(el);if(!next)return;
      remember(next);
      document.documentElement.dir=next==='ar'?'rtl':'ltr';
      if(el.hasAttribute('data-world8-lang') || (next==='pt'&&!location.search.includes('lang=pt'))){
        ev.preventDefault();var u=new URL(location.href);u.searchParams.set('lang',next);location.href=u.toString();
      }
    },true);
  }
  function start(){
    ensureLanguageAccess();decorateLinks(document);bindLanguageControls();
    var observer=new MutationObserver(function(records){records.forEach(function(r){r.addedNodes.forEach(function(n){if(n.nodeType===1)decorateLinks(n)})})});
    observer.observe(document.documentElement,{childList:true,subtree:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
  window.DIGIY_WORLD8={lang:lang,supported:SUPPORTED,withLang:withLang,remember:remember};
})();