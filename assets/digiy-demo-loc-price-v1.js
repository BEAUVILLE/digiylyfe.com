/* DIGIYLYFE — Démo Petite Côte · tarif LOC V5 */
(function(){'use strict';
function p(){try{return new URLSearchParams(location.search)}catch(e){return new URLSearchParams()}}
function active(){return /\/demo-petite-cote\.html$/i.test(location.pathname)&&(p().get('need')||'')==='accommodation'}
function lang(){return (p().get('lang')||document.documentElement.lang||'fr').slice(0,2).toLowerCase()}
var PRICE={fr:'À partir de 268 800 FCFA / an',en:'From 268,800 FCFA / year',es:'Desde 268 800 FCFA / año',pt:'A partir de 268 800 FCFA / ano',it:'Da 268 800 FCFA / anno',de:'Ab 268.800 FCFA / Jahr',nl:'Vanaf 268 800 FCFA / jaar',ar:'ابتداءً من 268 800 فرنك CFA / سنة'};
var CTA={fr:'PRENDRE MA PLACE LOC · VOIR LES PALIERS →',en:'TAKE MY LOC PLACE · VIEW TIERS →',es:'OCUPAR MI PLAZA LOC · VER TRAMOS →',pt:'OCUPAR O MEU LUGAR LOC · VER ESCALÕES →',it:'PRENDERE IL MIO POSTO LOC · VEDI LE FASCE →',de:'MEINEN LOC-PLATZ NEHMEN · STAFFELN ANSEHEN →',nl:'MIJN LOC-PLAATS NEMEN · STAFFELS BEKIJKEN →',ar:'LOC خذ مكاني · عرض الشرائح ←'};
var JOIN_URL='https://digiylyfe.com/tarifs-loc.html?country=sn';
function apply(){if(!active())return;var l=lang(),price=PRICE[l]||PRICE.fr;document.querySelectorAll('.chips .chip').forEach(function(el){var t=(el.textContent||'').replace(/\s+/g,' ').trim();if(/19[\s,.]?900\s*FCFA/i.test(t)||/^28[\s,.]?000\s*FCFA/i.test(t)||/^268[\s,.]?800\s*FCFA/i.test(t))el.textContent=price});var a=document.getElementById('join');if(a){a.href=JOIN_URL+(JOIN_URL.indexOf('?')>=0?'&':'?')+'lang='+encodeURIComponent(l);a.textContent=CTA[l]||CTA.fr;a.setAttribute('data-digiy-loc-join','1')}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){apply();setTimeout(apply,80)});else{apply();setTimeout(apply,80)}
})();