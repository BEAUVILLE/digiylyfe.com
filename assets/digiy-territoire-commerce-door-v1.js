/* DIGIYLYFE — TERRITOIRE · porte MON COMMERCE V1
 * Petite Côte : la porte 🛍️ ACHETER LOCAL ouvre le module MON COMMERCE.
 * Aucun doublon visuel ; le bouton territorial existant reste en place.
 */
(function(){'use strict';
function params(){try{return new URLSearchParams(location.search)}catch(e){return new URLSearchParams()}}
function active(){return (params().get('zone')||'')==='petite-cote'}
function lang(){var l=(document.documentElement.lang||params().get('lang')||'fr').slice(0,2).toLowerCase();return ['fr','en','es','pt','de','it','nl','ar'].indexOf(l)>=0?l:'fr'}
function target(){return 'https://mon-commerce.digiylyfe.com/?lang='+encodeURIComponent(lang())}
function install(){if(!active())return;var root=document.getElementById('needs');if(!root)return;var buttons=Array.prototype.slice.call(root.querySelectorAll('button.need'));var shop=buttons.find(function(b){var ic=b.querySelector('strong');return ic&&ic.textContent.trim()==='🛍️'});if(!shop||shop.hasAttribute('data-digiy-commerce-door'))return;shop.setAttribute('data-digiy-commerce-door','1');shop.setAttribute('aria-label','MON COMMERCE · ACHETER LOCAL');shop.title='MON COMMERCE';shop.addEventListener('click',function(e){e.preventDefault();e.stopImmediatePropagation();location.href=target()},true)}
function boot(){if(!active())return;install();var root=document.getElementById('needs');if(root)new MutationObserver(function(){setTimeout(install,0)}).observe(root,{childList:true,subtree:true});document.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('[data-lang]'))setTimeout(install,80)});window.addEventListener('popstate',function(){setTimeout(install,50)})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();