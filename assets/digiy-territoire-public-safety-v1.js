/* DIGIYLYFE — sécurité publication + porte pro Dakar V2
 * Retrait défensif FG NAILS.
 * Dakar : résultat vide = place à prendre ; avec ou sans résultat = porte d’adhésion métier.
 */
(function(){
  'use strict';

  var COPY={
    fr:{seat:'Cette place est encore ouverte à Dakar.',places:'VOIR LES PLACES À PRENDRE À DAKAR →',prefix:'VOUS ÊTES ',suffix:' ? REJOINDRE DIGIY DAKAR →',pro:'PROFESSIONNEL À DAKAR'},
    en:{seat:'This place is still open in Dakar.',places:'VIEW OPEN PLACES IN DAKAR →',prefix:'ARE YOU ',suffix:'? JOIN DIGIY DAKAR →',pro:'A PROFESSIONAL IN DAKAR'},
    es:{seat:'Esta plaza sigue abierta en Dakar.',places:'VER PLAZAS ABIERTAS EN DAKAR →',prefix:'¿ES ',suffix:'? ÚNASE A DIGIY DAKAR →',pro:'PROFESIONAL EN DAKAR'},
    pt:{seat:'Este espaço ainda está aberto em Dakar.',places:'VER LUGARES ABERTOS EM DAKAR →',prefix:'É ',suffix:'? ADIRA À DIGIY DAKAR →',pro:'PROFISSIONAL EM DAKAR'},
    de:{seat:'Dieser Platz ist in Dakar noch offen.',places:'OFFENE PLÄTZE IN DAKAR ANSEHEN →',prefix:'SIND SIE ',suffix:'? DIGIY DAKAR BEITRETEN →',pro:'PROFI IN DAKAR'},
    it:{seat:'Questo spazio è ancora aperto a Dakar.',places:'VEDI I POSTI APERTI A DAKAR →',prefix:'SEI ',suffix:'? ENTRA IN DIGIY DAKAR →',pro:'UN PROFESSIONISTA A DAKAR'},
    nl:{seat:'Deze plaats is nog open in Dakar.',places:'BEKIJK OPEN PLAATSEN IN DAKAR →',prefix:'BENT U ',suffix:'? WORD LID VAN DIGIY DAKAR →',pro:'PROFESSIONAL IN DAKAR'},
    ar:{seat:'هذه المساحة ما زالت مفتوحة في داكار.',places:'اعرض الأماكن المتاحة في داكار ←',prefix:'هل أنت ',suffix:'؟ انضم إلى DIGIY DAKAR ←',pro:'مهني في داكار'}
  };
  var NAMES={
    transport:'CHAUFFEUR / TRANSPORT',artisan:'ARTISAN',accommodation:'PRO DE L’HÉBERGEMENT / LOCATION',food:'RESTAURATEUR',shopping:'COMMERÇANT',beauty:'PRO DE LA BEAUTÉ / BIEN-ÊTRE',jobs:'PRO DE L’EMPLOI / MISSIONS',announcements:'PRO DES ANNONCES / SERVICES',guidance:'PRO DE LA COMMUNICATION'
  };

  function params(){try{return new URLSearchParams(location.search);}catch(e){return new URLSearchParams();}}
  function currentLang(){return (document.documentElement.lang||'fr').slice(0,2).toLowerCase();}
  function isDakar(){return (params().get('zone')||'')==='dakar';}
  function isFgCard(card){if(!card)return false;var text=(card.textContent||'').toLowerCase();return /fg\s*nails/i.test(text)||!!card.querySelector('a[href*="f-g-nails.digiylyfe.com"]');}

  function adhesionUrl(){
    var p=params(),u=new URL('/adhesion-dakar.html',location.origin),need=p.get('need')||'',local=p.get('local')||'';
    if(need)u.searchParams.set('need',need);
    if(local)u.searchParams.set('local',local);
    u.searchParams.set('lang',currentLang());
    return u.pathname+u.search;
  }

  function installEmpty(results){
    if(!isDakar()||!results||results.querySelector('.card'))return;
    var empty=results.querySelector('.empty');if(!empty)return;
    var t=COPY[currentLang()]||COPY.fr,box=empty.querySelector('[data-digiy-dakar-empty-cta]');
    if(!box){
      box=document.createElement('div');box.setAttribute('data-digiy-dakar-empty-cta','1');box.style.marginTop='14px';
      var p=document.createElement('p');p.setAttribute('data-seat-text','1');p.style.cssText='margin:0 0 10px;color:#fff3cf;font-weight:1000';
      var actions=document.createElement('div');actions.className='actions';
      var places=document.createElement('a');places.href='/dakar.html#quartiers';places.setAttribute('data-seat-places','1');
      actions.appendChild(places);box.append(p,actions);empty.appendChild(box);
    }
    box.querySelector('[data-seat-text]').textContent=t.seat;
    box.querySelector('[data-seat-places]').textContent=t.places;
  }

  function installProfessionalJoin(results){
    if(!isDakar()||!results)return;
    var t=COPY[currentLang()]||COPY.fr,p=params(),need=p.get('need')||'',name=NAMES[need]||t.pro;
    var link=document.querySelector('[data-digiy-dakar-pro-join]');
    if(!link){
      link=document.createElement('a');link.setAttribute('data-digiy-dakar-pro-join','1');
      link.style.cssText='display:flex;min-height:54px;margin-top:14px;align-items:center;justify-content:center;text-align:center;padding:12px 15px;border-radius:999px;background:linear-gradient(135deg,#f6c453,#22c55e);color:#06140f;text-decoration:none;font-size:12px;font-weight:1000';
      results.insertAdjacentElement('afterend',link);
    }
    link.href=adhesionUrl();
    link.textContent=t.prefix+name+t.suffix;
  }

  function purge(){
    var results=document.getElementById('results');if(!results)return;
    var changed=false;
    Array.prototype.slice.call(results.querySelectorAll('.card')).forEach(function(card){if(isFgCard(card)){card.remove();changed=true;}});
    if(changed){var status=document.getElementById('status');if(status){var count=results.querySelectorAll('.card').length;status.textContent=(status.textContent||'').replace(/^\s*\d+/,String(count));}}
    installEmpty(results);installProfessionalJoin(results);
  }

  function boot(){var results=document.getElementById('results');if(!results)return false;purge();new MutationObserver(purge).observe(results,{childList:true,subtree:true});return true;}
  if(!boot()){var observer=new MutationObserver(function(){if(boot())observer.disconnect();});observer.observe(document.documentElement,{childList:true,subtree:true});}
})();