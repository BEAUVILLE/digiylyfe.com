/* DIGIYLYFE — VALLÉE DE LA DORDOGNE · PORTES MODULES V1
 * Correctif ciblé : la Vallée ouvre toujours la façade centrale TERRITOIRE.
 * Capture au document avant les anciens listeners de boutons.
 */
(function(){'use strict';
var ICON={
  '⚡':'announcements',
  '🚗':'transport',
  '🔧':'artisan',
  '🏠':'accommodation',
  '🍽️':'food',
  '🛍️':'shopping',
  '💅':'beauty',
  '💼':'jobs',
  '🎙️':'guidance'
};
function p(){try{return new URLSearchParams(location.search)}catch(e){return new URLSearchParams()}}
function active(){return (p().get('zone')||'')==='vallee-dordogne'}
function lang(){var q=p(),l=(q.get('lang')||document.documentElement.lang||'fr').slice(0,2).toLowerCase();return ['fr','en','es','pt','de','it','nl','ar'].indexOf(l)>=0?l:'fr'}
function go(module){var q=p(),u=new URL('/module-territoire.html',location.origin);u.searchParams.set('module',module);u.searchParams.set('territory','vallee-dordogne');var local=q.get('local')||'';if(local)u.searchParams.set('local',local);u.searchParams.set('lang',lang());location.href=u.pathname+u.search}
document.addEventListener('click',function(e){
  if(!active())return;
  var resa=e.target.closest&&e.target.closest('[data-digiy-resa-multi-door]');
  if(resa){e.preventDefault();e.stopImmediatePropagation();go('resa');return}
  var b=e.target.closest&&e.target.closest('button.need');if(!b)return;
  var s=b.querySelector('strong'),icon=s&&s.textContent.trim(),module=ICON[icon];if(!module)return;
  e.preventDefault();e.stopImmediatePropagation();go(module);
},true);
})();
