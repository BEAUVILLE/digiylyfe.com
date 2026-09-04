/* DIGIYLYFE — TERRITOIRE · présences retirées V1
 * Garde-fou public : empêche une ancienne présence retirée de réapparaître via fallback/cache.
 */
(function(){'use strict';
var RETIRED=['FG NAILS'];
function titleOf(card){var n=card.querySelector('h3,h2,[class$="Title"],[class$="title"],strong');return(n&&n.textContent||'').trim().toUpperCase();}
function scrub(){var root=document.getElementById('results');if(!root)return;root.querySelectorAll('.card,article,[class$="Card"]').forEach(function(card){var name=titleOf(card);var links=Array.prototype.slice.call(card.querySelectorAll('a[href]')).map(function(a){return a.href}).join(' ');if(RETIRED.indexOf(name)>=0||/f-g-nails\.digiylyfe\.com/i.test(links))card.remove()})}
function boot(){scrub();var root=document.getElementById('results');if(root)new MutationObserver(function(){setTimeout(scrub,0)}).observe(root,{childList:true,subtree:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();