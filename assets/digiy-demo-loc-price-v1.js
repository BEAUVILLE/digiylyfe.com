/* DIGIYLYFE — Démo Petite Côte · tarif LOC V1 */
(function(){'use strict';
function p(){try{return new URLSearchParams(location.search)}catch(e){return new URLSearchParams()}}
function active(){return /\/demo-petite-cote\.html$/i.test(location.pathname)&&(p().get('need')||'')==='accommodation'}
function lang(){var l=(p().get('lang')||document.documentElement.lang||'fr').slice(0,2).toLowerCase();return l}
var PRICE={fr:'28 000 FCFA / mois',en:'28,000 FCFA / month',es:'28 000 FCFA / mes',pt:'28 000 FCFA / mês',it:'28 000 FCFA / mese',de:'28.000 FCFA / Monat',nl:'28 000 FCFA / maand',ar:'28 000 FCFA / شهر'};
function apply(){if(!active())return;var price=PRICE[lang()]||PRICE.fr;document.querySelectorAll('.chips .chip').forEach(function(el){var t=(el.textContent||'').replace(/\s+/g,' ').trim();if(/19[\s,.]?900\s*FCFA/i.test(t))el.textContent=price})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){apply();setTimeout(apply,80)});else{apply();setTimeout(apply,80)}
})();