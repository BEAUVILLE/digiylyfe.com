/* DIGIYLYFE — Démo Petite Côte · tarif LOC V2 */
(function(){'use strict';
function p(){try{return new URLSearchParams(location.search)}catch(e){return new URLSearchParams()}}
function active(){return /\/demo-petite-cote\.html$/i.test(location.pathname)&&(p().get('need')||'')==='accommodation'}
function lang(){return (p().get('lang')||document.documentElement.lang||'fr').slice(0,2).toLowerCase()}
var PRICE={fr:'À partir de 28 000 FCFA / mois',en:'From 28,000 FCFA / month',es:'Desde 28 000 FCFA / mes',pt:'A partir de 28 000 FCFA / mês',it:'Da 28 000 FCFA / mese',de:'Ab 28.000 FCFA / Monat',nl:'Vanaf 28 000 FCFA / maand',ar:'ابتداءً من 28 000 FCFA / شهر'};
var CTA={fr:'PRENDRE MA PLACE LOC · VOIR LES PALIERS →',en:'TAKE MY LOC PLACE · VIEW TIERS →',es:'OCUPAR MI PLAZA LOC · VER TRAMOS →',pt:'OCUPAR O MEU LUGAR LOC · VER ESCALÕES →',it:'PRENDERE IL MIO POSTO LOC · VEDI LE FASCE →',de:'MEINEN LOC-PLATZ NEHMEN · STAFFELN ANSEHEN →',nl:'MIJN LOC-PLAATS NEMEN · STAFFELS BEKIJKEN →',ar:'LOC خذ مكاني · عرض الشرائح ←'};
var JOIN_URL='https://digiylyfe.com/tarifs-adherents.html#digiy-loc';
function apply(){if(!active())return;var l=lang(),price=PRICE[l]||PRICE.fr;document.querySelectorAll('.chips .chip').forEach(function(el){var t=(el.textContent||'').replace(/\s+/g,' ').trim();if(/19[\s,.]?900\s*FCFA/i.test(t)||/^28[\s,.]?000\s*FCFA/i.test(t))el.textContent=price});var a=document.getElementById('join');if(a){a.href=JOIN_URL;a.textContent=CTA[l]||CTA.fr;a.setAttribute('data-digiy-loc-join','1')}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){apply();setTimeout(apply,80)});else{apply();setTimeout(apply,80)}
})();