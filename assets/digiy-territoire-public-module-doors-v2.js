/* DIGIYLYFE — TERRITOIRE · PUBLIC MODULE DOORS V5
 * Dordogne: document-capture opens the central territory module page before legacy listeners.
 * LA VOIX is not a métier module: it always opens the search engine directly.
 * Other territories keep the current public module routing.
 * MARKET stays retired / absent.
 */
(function(){'use strict';
var LANGS=['fr','en','es','pt','de','it','nl','ar'];
var VOICE='https://pro-action-digiy.digiylyfe.com/';
var STANDARD={
  '⚡':'https://bonne-affaire.digiylyfe.com/master.html',
  '🚗':'https://driver-client.digiylyfe.com/master.html',
  '🔧':'https://build.digiylyfe.com/master.html',
  '🏠':'https://loc.digiylyfe.com/master.html',
  '🍽️':'https://resto.digiylyfe.com/master.html',
  '🎙️':VOICE
};
var DORDOGNE={
  '⚡':'announcements',
  '🚗':'transport',
  '🔧':'artisan',
  '🏠':'accommodation',
  '🍽️':'food',
  '🛍️':'shopping',
  '💅':'beauty',
  '💼':'jobs'
};
var RESA='https://resa-table-resto.digiylyfe.com/master.html';
function params(){try{return new URLSearchParams(location.search)}catch(e){return new URLSearchParams()}}
function currentLang(){var p=params(),l=(p.get('lang')||document.documentElement.lang||'fr').slice(0,2).toLowerCase();return LANGS.indexOf(l)>=0?l:'fr'}
function standardTarget(raw){var p=params(),u=new URL(raw),territory=p.get('zone')||'',local=p.get('local')||'';if(territory)u.searchParams.set('territory',territory);if(local)u.searchParams.set('local',local);u.searchParams.set('lang',currentLang());return u.toString()}
function dordogneTarget(module){var p=params(),u=new URL('/module-territoire.html',location.origin),local=p.get('local')||'';u.searchParams.set('module',module);u.searchParams.set('territory','vallee-dordogne');if(local)u.searchParams.set('local',local);u.searchParams.set('lang',currentLang());return u.pathname+u.search}
function isDordogne(){return (params().get('zone')||'')==='vallee-dordogne'}

document.addEventListener('click',function(e){
  if(!isDordogne())return;
  var resa=e.target.closest&&e.target.closest('[data-digiy-resa-multi-door]');
  if(resa){e.preventDefault();e.stopImmediatePropagation();location.href=dordogneTarget('resa');return}
  var b=e.target.closest&&e.target.closest('button.need');if(!b)return;
  var s=b.querySelector('strong'),icon=s&&s.textContent.trim();
  if(icon==='🎙️'){e.preventDefault();e.stopImmediatePropagation();location.href=standardTarget(VOICE);return}
  var module=DORDOGNE[icon];if(!module)return;
  e.preventDefault();e.stopImmediatePropagation();location.href=dordogneTarget(module);
},true);

function wire(b,icon){if(!b||b.hasAttribute('data-digiy-public-module-door'))return;b.setAttribute('data-digiy-public-module-door',icon);b.addEventListener('click',function(e){if(isDordogne())return;e.preventDefault();e.stopImmediatePropagation();location.href=standardTarget(STANDARD[icon])},true)}
function wireResa(root){var a=root.querySelector('[data-digiy-resa-multi-door]');if(!a)return;a.href=isDordogne()?dordogneTarget('resa'):standardTarget(RESA);a.addEventListener('click',function(e){if(isDordogne())return;e.preventDefault();e.stopImmediatePropagation();location.href=standardTarget(RESA)},true)}
function install(){var root=document.getElementById('needs');if(!root)return;Array.prototype.slice.call(root.querySelectorAll('button.need')).forEach(function(b){var s=b.querySelector('strong'),icon=s&&s.textContent.trim();if(STANDARD[icon])wire(b,icon)});wireResa(root)}
function boot(){install();var root=document.getElementById('needs');if(root)new MutationObserver(function(){setTimeout(install,0)}).observe(root,{childList:true,subtree:true});document.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('[data-lang],#zones'))setTimeout(install,80)});window.addEventListener('popstate',function(){setTimeout(install,50)})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
