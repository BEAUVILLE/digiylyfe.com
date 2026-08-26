/* DIGIYLYFE — pont modèles Dakar V1
 * Transforme les cartes exemples en vraies vitrines ouvrables.
 * LA VOIX = recherche vocale, jamais un métier.
 */
(function(){'use strict';
  function p(){try{return new URLSearchParams(location.search);}catch(e){return new URLSearchParams();}}
  function lang(){return (document.documentElement.lang||'fr').slice(0,2).toLowerCase();}
  function isDakar(){return (p().get('zone')||'')==='dakar';}
  function demoUrl(need,variant){var q=p(),u=new URL('/demo-dakar.html',location.origin);u.searchParams.set('need',need);u.searchParams.set('variant',variant);var local=q.get('local')||'';if(local&&local!=='all')u.searchParams.set('local',local);u.searchParams.set('lang',lang());return u.pathname+u.search;}
  var VOICE=[
    {title:'🎙️ Trouver un chauffeur par la voix',services:['« Trouve-moi un chauffeur pour AIBD »','Recherche territoriale','Contact direct']},
    {title:'🎙️ Trouver où manger par la voix',services:['« Où manger ce soir aux Almadies ? »','Recherche territoriale','Réservation directe']},
    {title:'🎙️ Trouver un artisan par la voix',services:['« Je cherche un plombier à Sacré-Cœur »','Recherche territoriale','Contact direct']}
  ];
  function apply(){if(!isDakar())return;var results=document.getElementById('results');if(!results)return;
    results.querySelectorAll('[data-dakar-placeholder]').forEach(function(card){
      var key=card.getAttribute('data-dakar-placeholder')||'',m=key.match(/^(.+)-(\d+)$/);if(!m)return;var need=m[1],variant=String((parseInt(m[2],10)||0)+1),a=card.querySelector('.actions a');if(a){a.href=demoUrl(need,variant);a.textContent=need==='guidance'?'OUVRIR LA DÉMO VOCALE →':'OUVRIR LE MODÈLE →';}
      if(need==='guidance'){
        var ex=VOICE[Math.max(0,Math.min(2,parseInt(m[2],10)||0))],h=card.querySelector('h3'),s=card.querySelector('.summary'),meta=card.querySelector('.meta'),sv=card.querySelector('.services');if(h)h.textContent=ex.title;if(s)s.textContent='LA VOIX permet au visiteur de dire ce qu’il cherche au lieu de parcourir les catégories.';if(meta)meta.textContent='🎙️ MODULE DE RECHERCHE PAR LA VOIX · DAKAR';if(sv){sv.innerHTML='';ex.services.concat(['Pas une fiche métier','Accès direct au moteur vocal']).forEach(function(x){var sp=document.createElement('span');sp.className='service';sp.textContent=x;sv.appendChild(sp);});}
      }
    });
    var q=p(),need=q.get('need')||'',join=document.getElementById('dakarProJoin');if(join&&need==='guidance'){join.href='https://pro-action-digiy.digiylyfe.com/';join.textContent='🎙️ ESSAYER LA RECHERCHE PAR LA VOIX →';}
  }
  function boot(){apply();var r=document.getElementById('results');if(r)new MutationObserver(function(){setTimeout(apply,0);}).observe(r,{childList:true,subtree:true});document.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('#needs,#zones'))setTimeout(apply,20);});window.addEventListener('popstate',function(){setTimeout(apply,0);});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();