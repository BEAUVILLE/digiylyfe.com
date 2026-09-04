/* DIGIYLYFE — TERRITOIRE · présences retirées V1
 * Garde-fou public : empêche une ancienne présence retirée de réapparaître via fallback/cache.
 * Charge aussi l’adaptateur MON DIGIY des cartes adhérents.
 */
(function(){'use strict';
var RETIRED=['FG NAILS'];
function titleOf(card){var n=card.querySelector('h3,h2,[class$="Title"],[class$="title"],strong');return(n&&n.textContent||'').trim().toUpperCase();}
function scrub(){var root=document.getElementById('results');if(!root)return;root.querySelectorAll('.card,article,[class$="Card"]').forEach(function(card){var name=titleOf(card);var links=Array.prototype.slice.call(card.querySelectorAll('a[href]')).map(function(a){return a.href}).join(' ');if(RETIRED.indexOf(name)>=0||/f-g-nails\.digiylyfe\.com/i.test(links))card.remove()})}
function loadFavoris(){if(window.DIGIY_TERRITOIRE_FAVORIS_V2||document.querySelector('script[data-digiy-territoire-favoris]'))return;var s=document.createElement('script');s.src='/assets/digiy-territoire-favoris-v1.js?v=20260904-v2';s.setAttribute('data-digiy-territoire-favoris','1');document.head.appendChild(s)}
function boot(){scrub();loadFavoris();var root=document.getElementById('results');if(root)new MutationObserver(function(){setTimeout(scrub,0)}).observe(root,{childList:true,subtree:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();