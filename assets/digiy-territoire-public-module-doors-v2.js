/* DIGIYLYFE — TERRITOIRE · PUBLIC MODULE DOORS V3
 * TERRITOIRE remains the main entry.
 * Each remaining public module opens its country/zone filtered 1/3-2/3 master.
 * MARKET is intentionally absent / retired.
 */
(function(){'use strict';
var LANGS=['fr','en','es','pt','de','it','nl','ar'];
var MAP={
  '⚡':'https://bonne-affaire.digiylyfe.com/master.html',
  '🚗':'https://driver-client.digiylyfe.com/master.html',
  '🔧':'https://build.digiylyfe.com/master.html',
  '🏠':'https://loc.digiylyfe.com/master.html',
  '🍽️':'https://resto.digiylyfe.com/master.html',
  '🎙️':'https://digiylyfe.com/voix-business.html'
};
var RESA='https://resa-table-resto.digiylyfe.com/master.html';
function params(){try{return new URLSearchParams(location.search)}catch(e){return new URLSearchParams()}}
function lang(){var p=params(),l=(p.get('lang')||document.documentElement.lang||'fr').slice(0,2).toLowerCase();return LANGS.indexOf(l)>=0?l:'fr'}
function target(raw){var p=params(),u=new URL(raw),territory=p.get('zone')||'',local=p.get('local')||'';if(territory)u.searchParams.set('territory',territory);if(local)u.searchParams.set('local',local);u.searchParams.set('lang',lang());return u.toString()}
function wire(b,icon){if(!b||b.hasAttribute('data-digiy-public-module-door'))return;b.setAttribute('data-digiy-public-module-door',icon);b.addEventListener('click',function(e){e.preventDefault();e.stopImmediatePropagation();location.href=target(MAP[icon])},true)}
function wireResa(root){var a=root.querySelector('[data-digiy-resa-multi-door]');if(!a)return;a.href=target(RESA);a.addEventListener('click',function(e){e.preventDefault();e.stopImmediatePropagation();location.href=target(RESA)},true)}
function install(){var root=document.getElementById('needs');if(!root)return;Array.prototype.slice.call(root.querySelectorAll('button.need')).forEach(function(b){var s=b.querySelector('strong'),icon=s&&s.textContent.trim();if(MAP[icon])wire(b,icon)});wireResa(root)}
function boot(){install();var root=document.getElementById('needs');if(root)new MutationObserver(function(){setTimeout(install,0)}).observe(root,{childList:true,subtree:true});document.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('[data-lang],#zones'))setTimeout(install,80)});window.addEventListener('popstate',function(){setTimeout(install,50)})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();