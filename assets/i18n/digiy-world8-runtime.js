/* DIGIYLYFE WORLD8 runtime — exact-text UI translation + language continuity — production */
(function(){
  'use strict';
  if(window.__DIGIY_WORLD8_RUNTIME__) return;
  window.__DIGIY_WORLD8_RUNTIME__=true;
  var LANGS=['fr','en','es','pt','de','it','nl','ar'];
  var q=new URLSearchParams(location.search);
  function safe(v){v=String(v||'').slice(0,2).toLowerCase();return LANGS.includes(v)?v:''}
  var lang=safe(q.get('lang'));
  if(!lang){try{lang=safe(localStorage.getItem('digiy-lang'))||safe(localStorage.getItem('digiy_lang'))}catch(e){}}
  if(!lang)lang=safe(navigator.language)||'fr';
  function remember(v){try{localStorage.setItem('digiy-lang',v);localStorage.setItem('digiy_lang',v)}catch(e){}}
  remember(lang);document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';

  function dict(){return (window.DIGIY_WORLD8_PAGE&&window.DIGIY_WORLD8_PAGE[lang])||{}}
  function tx(v){var d=dict();return Object.prototype.hasOwnProperty.call(d,v)?d[v]:v}
  function translate(root){
    var d=dict();if(!d||lang==='fr')return;
    var scope=root||document;
    var base=scope.body||scope;
    if(!base)return;
    var w=document.createTreeWalker(base,NodeFilter.SHOW_TEXT,{acceptNode:function(node){var p=node.parentElement;if(!p||p.closest('script,style,textarea,select,option,noscript,template,code,pre'))return NodeFilter.FILTER_REJECT;return NodeFilter.FILTER_ACCEPT}});var n;
    while((n=w.nextNode())){var raw=n.nodeValue,trim=raw.trim();if(!trim||!Object.prototype.hasOwnProperty.call(d,trim))continue;n.nodeValue=raw.replace(trim,d[trim])}
    scope.querySelectorAll&&scope.querySelectorAll('[placeholder],[title],[aria-label],[value]').forEach(function(el){
      ['placeholder','title','aria-label'].forEach(function(a){var v=el.getAttribute(a);if(v&&Object.prototype.hasOwnProperty.call(d,v))el.setAttribute(a,d[v])});
      if((el.tagName==='INPUT'||el.tagName==='BUTTON')&&el.hasAttribute('value')){var v=el.getAttribute('value');if(v&&Object.prototype.hasOwnProperty.call(d,v))el.setAttribute('value',d[v])}
    });
    if(d.__title)document.title=d.__title;
    var m=document.querySelector('meta[name="description"]');if(m&&d.__description)m.content=d.__description;
  }
  function appendLang(url){try{var u=new URL(url,location.href);if(/(^|\.)digiylyfe\.com$/i.test(u.hostname)&&/^https?:$/.test(u.protocol)){u.searchParams.set('lang',lang);return u.toString()}}catch(e){}return url}
  function links(root){(root||document).querySelectorAll&& (root||document).querySelectorAll('a[href]').forEach(function(a){var h=a.getAttribute('href');if(!h||h[0]==='#'||/^(mailto:|tel:|javascript:)/i.test(h))return;a.href=appendLang(a.href)})}
  function ensureBar(){
    if(document.querySelector('[data-world8-bar],.language-buttons,.langbar,.langs,.langSwitch,.digiyLangSwitch,.digiy-langbar,[data-language-bar],.lang[aria-label],nav.lang,nav[aria-label*="lang" i],[aria-label*="choisir la langue" i]'))return;
    var bar=document.createElement('nav');bar.dataset.world8Bar='1';bar.setAttribute('aria-label','Languages');bar.style.cssText='position:fixed;z-index:99999;top:max(6px,env(safe-area-inset-top));left:50%;transform:translateX(-50%);display:flex;gap:4px;max-width:96vw;overflow:auto;padding:5px;border-radius:999px;background:rgba(3,18,12,.92);border:1px solid rgba(255,255,255,.18);backdrop-filter:blur(12px)';
    [['fr','FR'],['en','EN'],['es','ES'],['pt','PT'],['de','DE'],['it','IT'],['nl','NL'],['ar','AR']].forEach(function(x){var a=document.createElement('a');a.href='?lang='+x[0];a.dataset.lang=x[0];a.textContent=x[1];a.style.cssText='min-width:38px;padding:7px 9px;border-radius:999px;text-align:center;text-decoration:none;color:#fff;font:800 11px system-ui;background:'+(x[0]===lang?'linear-gradient(135deg,#f6c453,#22c55e)':'rgba(255,255,255,.08)')+';'+(x[0]===lang?'color:#06140f;':'');bar.appendChild(a)});
    document.body.appendChild(bar);
  }
  function start(){translate(document);links(document);ensureBar();var mo=new MutationObserver(function(rs){rs.forEach(function(r){if(r.type==='characterData'&&r.target&&r.target.parentElement){translate(r.target.parentElement);return}r.addedNodes.forEach(function(n){if(n.nodeType===1){translate(n);links(n)}})})});mo.observe(document.documentElement,{subtree:true,childList:true,characterData:true})}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
  window.DIGIY_WORLD8_RUNTIME={lang:lang,translate:translate,appendLang:appendLang};
})();