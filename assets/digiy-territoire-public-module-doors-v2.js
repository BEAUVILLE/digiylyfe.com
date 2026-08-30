/* DIGIYLYFE — TERRITOIRE · PUBLIC MODULE DOORS V6
 * Tous pays / territoires : un besoin ouvre le même MASTER métier.
 * Dordogne garde une capture document uniquement pour neutraliser les anciens listeners,
 * mais vise désormais exactement les mêmes MASTER canoniques.
 * LA VOIX reste le moteur transversal direct.
 * MARKET reste caduc / hors circuit.
 */
(function(){'use strict';
var LANGS=['fr','en','es','pt','de','it','nl','ar'];
var VOICE='https://pro-action-digiy.digiylyfe.com/';
var STANDARD={
  '⚡':'https://bonne-affaire.digiylyfe.com/master.html',
  '🚗':'https://driver-client.digiylyfe.com/master.html',
  '🔧':'https://build.digiylyfe.com/master.html',
  '🧹':'https://digiylyfe.com/nettoyage-master.html',
  '🏛️':'https://digiylyfe.com/services-professionnels-master.html',
  '🏠':'https://loc.digiylyfe.com/master.html',
  '🍽️':'https://resto.digiylyfe.com/master.html',
  '🎙️':VOICE
};
var SPECIAL={
  '🛍️':'https://mon-commerce.digiylyfe.com/',
  '💅':'https://digiylyfe.com/beaute-bien-etre.html',
  '💼':'https://jobs.digiylyfe.com/master.html'
};
var RESA='https://resa-table-resto.digiylyfe.com/master.html';
function params(){try{return new URLSearchParams(location.search)}catch(e){return new URLSearchParams()}}
function currentLang(){var p=params(),l=(p.get('lang')||document.documentElement.lang||'fr').slice(0,2).toLowerCase();return LANGS.indexOf(l)>=0?l:'fr'}
function target(raw){var p=params(),u=new URL(raw,location.origin),territory=p.get('zone')||'',local=p.get('local')||'';if(territory)u.searchParams.set('territory',territory);if(local)u.searchParams.set('local',local);u.searchParams.set('lang',currentLang());return u.toString()}
function isDordogne(){return (params().get('zone')||'')==='vallee-dordogne'}

/* Dordogne possède encore d'anciens listeners chargés avant les portes modernes.
   La capture document ne crée plus de MASTER parallèle : elle force seulement
   la même destination canonique que tous les autres territoires. */
document.addEventListener('click',function(e){
  if(!isDordogne())return;
  var resa=e.target.closest&&e.target.closest('[data-digiy-resa-multi-door]');
  if(resa){e.preventDefault();e.stopImmediatePropagation();location.href=target(RESA);return}
  var b=e.target.closest&&e.target.closest('button.need');if(!b)return;
  var s=b.querySelector('strong'),icon=s&&s.textContent.trim(),raw=STANDARD[icon]||SPECIAL[icon];
  if(!raw)return;
  e.preventDefault();e.stopImmediatePropagation();location.href=target(raw);
},true);

function wire(b,icon,raw){if(!b||!raw||b.hasAttribute('data-digiy-public-module-door'))return;b.setAttribute('data-digiy-public-module-door',icon);b.addEventListener('click',function(e){if(isDordogne())return;e.preventDefault();e.stopImmediatePropagation();location.href=target(raw)},true)}
function wireResa(root){var a=root.querySelector('[data-digiy-resa-multi-door]');if(!a)return;a.href=target(RESA);a.addEventListener('click',function(e){if(isDordogne())return;e.preventDefault();e.stopImmediatePropagation();location.href=target(RESA)},true)}
function install(){var root=document.getElementById('needs');if(!root)return;Array.prototype.slice.call(root.querySelectorAll('button.need')).forEach(function(b){var s=b.querySelector('strong'),icon=s&&s.textContent.trim(),raw=STANDARD[icon]||SPECIAL[icon];if(raw)wire(b,icon,raw)});wireResa(root)}
function boot(){install();var root=document.getElementById('needs');if(root)new MutationObserver(function(){setTimeout(install,0)}).observe(root,{childList:true,subtree:true});document.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('[data-lang],#zones'))setTimeout(install,80)});window.addEventListener('popstate',function(){setTimeout(install,50)})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
