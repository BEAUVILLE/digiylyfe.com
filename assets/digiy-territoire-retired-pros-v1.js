/* DIGIYLYFE — TERRITOIRE · présences retirées V1
 * Garde-fou public : empêche une ancienne présence retirée de réapparaître via fallback/cache.
 */
(function(){'use strict';
var RETIRED=['FG NAILS'];
function scrub(){var root=document.getElementById('results');if(!root)return;root.querySelectorAll('.card,article').forEach(function(card){var name=(card.querySelector('h3,h2')&&card.querySelector('h3,h2').textContent||'').trim().toUpperCase();var links=Array.prototype.slice.call(card.querySelectorAll('a[href]')).map(function(a){return a.href}).join(' ');if(RETIRED.indexOf(name)>=0||/f-g-nails\.digiylyfe\.com/i.test(links))card.remove()})}
function boot(){scrub();var root=document.getElementById('results');if(root)new MutationObserver(function(){setTimeout(scrub,0)}).observe(root,{childList:true,subtree:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();