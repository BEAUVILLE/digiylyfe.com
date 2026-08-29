/* DIGIYLYFE — TERRITOIRE · porte MON COMMERCE V2
 * Tous territoires : la porte 🛍️ transmet territory + local + lang au MASTER MON COMMERCE.
 * TERRITOIRE aiguillage ; MON COMMERCE maître unique.
 */
(function(){'use strict';
function params(){try{return new URLSearchParams(location.search)}catch(e){return new URLSearchParams()}}
function lang(){var l=(document.documentElement.lang||params().get('lang')||'fr').slice(0,2).toLowerCase();return ['fr','en','es','pt','de','it','nl','ar'].indexOf(l)>=0?l:'fr'}
function target(){var p=params(),u=new URL('https://mon-commerce.digiylyfe.com/');var territory=p.get('zone')||'';var local=p.get('local')||'';if(territory)u.searchParams.set('territory',territory);if(local)u.searchParams.set('local',local);u.searchParams.set('lang',lang());return u.toString()}
function install(){var root=document.getElementById('needs');if(!root)return;var buttons=Array.prototype.slice.call(root.querySelectorAll('button.need'));var shop=buttons.find(function(b){var ic=b.querySelector('strong');return ic&&ic.textContent.trim()==='🛍️'});if(!shop||shop.hasAttribute('data-digiy-commerce-door'))return;shop.setAttribute('data-digiy-commerce-door','1');shop.setAttribute('aria-label','MON COMMERCE · ACHETER LOCAL');shop.title='MON COMMERCE';shop.addEventListener('click',function(e){e.preventDefault();e.stopImmediatePropagation();location.href=target()},true)}
function boot(){install();var root=document.getElementById('needs');if(root)new MutationObserver(function(){setTimeout(install,0)}).observe(root,{childList:true,subtree:true});document.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('[data-lang]'))setTimeout(install,80)});window.addEventListener('popstate',function(){setTimeout(install,50)})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();