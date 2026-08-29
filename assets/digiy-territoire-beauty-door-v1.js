/* DIGIYLYFE — TERRITOIRE · porte BEAUTÉ & BIEN-ÊTRE V1
 * Tous territoires : transmet territory + local + lang au MASTER beauté.
 */
(function(){'use strict';
function params(){try{return new URLSearchParams(location.search)}catch(e){return new URLSearchParams()}}
function lang(){var l=(document.documentElement.lang||params().get('lang')||'fr').slice(0,2).toLowerCase();return ['fr','en','es','pt','de','it','nl','ar'].indexOf(l)>=0?l:'fr'}
function target(){var p=params(),u=new URL('/beaute-bien-etre.html',location.origin),territory=p.get('zone')||'',local=p.get('local')||'';if(territory)u.searchParams.set('territory',territory);if(local)u.searchParams.set('local',local);u.searchParams.set('lang',lang());return u.pathname+u.search}
function install(){var root=document.getElementById('needs');if(!root)return;var buttons=Array.prototype.slice.call(root.querySelectorAll('button.need'));var hit=buttons.find(function(b){var ic=b.querySelector('strong');return ic&&ic.textContent.trim()==='💅'});if(!hit||hit.hasAttribute('data-digiy-beauty-door'))return;hit.setAttribute('data-digiy-beauty-door','1');hit.setAttribute('aria-label','BEAUTÉ & BIEN-ÊTRE');hit.addEventListener('click',function(e){e.preventDefault();e.stopImmediatePropagation();location.href=target()},true)}
function boot(){install();var root=document.getElementById('needs');if(root)new MutationObserver(function(){setTimeout(install,0)}).observe(root,{childList:true,subtree:true});document.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('[data-lang]'))setTimeout(install,80)});window.addEventListener('popstate',function(){setTimeout(install,50)})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();