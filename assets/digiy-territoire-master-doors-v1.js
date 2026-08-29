/* DIGIYLYFE — TERRITOIRE · convergence MASTER V1
 * TERRITOIRE aiguille ; chaque métier ouvre son MASTER avec territory + local + lang.
 * MARKET est volontairement absent : hors circuit public.
 */
(function(){'use strict';
var LANGS=['fr','en','es','pt','de','it','nl','ar'];
var MAP={
 '⚡':'https://bonne-affaire.digiylyfe.com/master.html',
 '🚗':'https://driver-client.digiylyfe.com/master.html',
 '🔧':'https://build.digiylyfe.com/master.html',
 '🏠':'https://loc.digiylyfe.com/master.html',
 '🍽️':'https://resto.digiylyfe.com/master.html',
 '🎙️':'https://digiylyfe.com/voix-business.html'
};
var RESA='https://resa-table-resto.digiylyfe.com/master.html';
var TXT={
 fr:{food:'MANGER',resa:'RÉSA MULTI',meta:'Table · trajet · beauté · soins · événements',loc:'SAUF DORMIR / LOUER → LOC'},
 en:{food:'EAT',resa:'MULTI BOOKING',meta:'Table · ride · beauty · care · events',loc:'EXCEPT STAY / RENT → LOC'},
 es:{food:'COMER',resa:'RESERVA MULTI',meta:'Mesa · trayecto · belleza · cuidados · eventos',loc:'EXCEPTO ALOJARSE / ALQUILAR → LOC'},
 pt:{food:'COMER',resa:'RESERVA MULTI',meta:'Mesa · trajeto · beleza · cuidados · eventos',loc:'EXCETO DORMIR / ALUGAR → LOC'},
 de:{food:'ESSEN',resa:'MULTI-RESERVIERUNG',meta:'Tisch · Fahrt · Beauty · Pflege · Events',loc:'AUSSER ÜBERNACHTEN / MIETEN → LOC'},
 it:{food:'MANGIARE',resa:'PRENOTAZIONE MULTI',meta:'Tavolo · tragitto · bellezza · trattamenti · eventi',loc:'ESCLUSO DORMIRE / AFFITTARE → LOC'},
 nl:{food:'ETEN',resa:'MULTI RESERVEREN',meta:'Tafel · rit · beauty · verzorging · events',loc:'BEHALVE OVERNACHTEN / HUREN → LOC'},
 ar:{food:'الأكل',resa:'حجز متعدد',meta:'طاولة · تنقل · جمال · عناية · فعاليات',loc:'الإقامة / الاستئجار ← LOC'}
};
function p(){try{return new URLSearchParams(location.search)}catch(e){return new URLSearchParams()}}
function lang(){var q=p(),l=(document.documentElement.lang||q.get('lang')||'fr').slice(0,2).toLowerCase();return LANGS.indexOf(l)>=0?l:'fr'}
function target(raw){var q=p(),u=new URL(raw),territory=q.get('zone')||'',local=q.get('local')||'';if(territory)u.searchParams.set('territory',territory);if(local)u.searchParams.set('local',local);u.searchParams.set('lang',lang());return u.toString()}
function wire(button,icon){if(!button||button.hasAttribute('data-digiy-master-door'))return;button.setAttribute('data-digiy-master-door',icon);button.addEventListener('click',function(e){e.preventDefault();e.stopImmediatePropagation();location.href=target(MAP[icon])},true)}
function ensureResa(root,food){var x=TXT[lang()]||TXT.fr,a=root.querySelector('[data-digiy-resa-multi-door]');if(!a){a=document.createElement('a');a.className='need';a.setAttribute('data-digiy-resa-multi-door','1');a.style.textDecoration='none';a.style.borderColor='rgba(246,196,83,.72)';a.style.background='linear-gradient(145deg,rgba(246,196,83,.15),rgba(46,167,173,.13))';var ic=document.createElement('strong');ic.textContent='🗓️';var title=document.createElement('span');var meta=document.createElement('small');var loc=document.createElement('small');meta.style.cssText='display:block;margin-top:6px;color:rgba(255,250,240,.78);font-size:10px;line-height:1.3;font-weight:850';loc.style.cssText='display:block;margin-top:5px;color:#fff0c8;font-size:9px;line-height:1.25;font-weight:1000';a.append(ic,title,meta,loc);if(food&&food.nextSibling)root.insertBefore(a,food.nextSibling);else root.appendChild(a)}
 a.href=target(RESA);a.setAttribute('aria-label','RÉSA MULTI');var parts=a.children;if(parts[1])parts[1].textContent=x.resa;if(parts[2])parts[2].textContent=x.meta;if(parts[3])parts[3].textContent=x.loc}
function install(){var root=document.getElementById('needs');if(!root)return;var buttons=Array.prototype.slice.call(root.querySelectorAll('button.need')),food=null;buttons.forEach(function(b){var s=b.querySelector('strong'),icon=s&&s.textContent.trim();if(icon==='🍽️')food=b;if(MAP[icon])wire(b,icon)});var x=TXT[lang()]||TXT.fr;if(food){var label=food.querySelector('span');if(label)label.textContent=x.food}ensureResa(root,food)}
function boot(){install();var root=document.getElementById('needs');if(root)new MutationObserver(function(){setTimeout(install,0)}).observe(root,{childList:true,subtree:true});document.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('[data-lang],#zones'))setTimeout(install,80)});window.addEventListener('popstate',function(){setTimeout(install,50)})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();