/* DIGIYLYFE — sécurité de publication territoire V1
 * Empêche une ancienne entrée FG NAILS de réapparaître via un fallback local.
 * Dakar : transforme un résultat vide en porte commerciale vers les places à prendre.
 */
(function(){
  'use strict';

  var COPY={
    fr:{seat:'Cette place est encore ouverte à Dakar.',places:'VOIR LES PLACES À PRENDRE À DAKAR →',join:'CRÉER MA PRÉSENCE À DAKAR →'},
    en:{seat:'This place is still open in Dakar.',places:'VIEW OPEN PLACES IN DAKAR →',join:'CREATE MY DAKAR PRESENCE →'},
    es:{seat:'Esta plaza sigue abierta en Dakar.',places:'VER PLAZAS ABIERTAS EN DAKAR →',join:'CREAR MI PRESENCIA EN DAKAR →'},
    pt:{seat:'Este espaço ainda está aberto em Dakar.',places:'VER LUGARES ABERTOS EM DAKAR →',join:'CRIAR A MINHA PRESENÇA EM DAKAR →'},
    de:{seat:'Dieser Platz ist in Dakar noch offen.',places:'OFFENE PLÄTZE IN DAKAR ANSEHEN →',join:'MEINE PRÄSENZ IN DAKAR ERSTELLEN →'},
    it:{seat:'Questo spazio è ancora aperto a Dakar.',places:'VEDI I POSTI APERTI A DAKAR →',join:'CREA LA MIA PRESENZA A DAKAR →'},
    nl:{seat:'Deze plaats is nog open in Dakar.',places:'BEKIJK OPEN PLAATSEN IN DAKAR →',join:'MAAK MIJN AANWEZIGHEID IN DAKAR →'},
    ar:{seat:'هذه المساحة ما زالت مفتوحة في داكار.',places:'اعرض الأماكن المتاحة في داكار ←',join:'أنشئ حضوري في داكار ←'}
  };

  function currentLang(){return (document.documentElement.lang||'fr').slice(0,2).toLowerCase();}

  function isDakar(){
    try{return (new URLSearchParams(location.search).get('zone')||'')==='dakar';}
    catch(e){return false;}
  }

  function isFgCard(card){
    if(!card)return false;
    var text=(card.textContent||'').toLowerCase();
    if(/fg\s*nails/i.test(text))return true;
    return !!card.querySelector('a[href*="f-g-nails.digiylyfe.com"]');
  }

  function installDakarEmptyCta(results){
    if(!isDakar()||!results||results.querySelector('.card'))return;
    var empty=results.querySelector('.empty');
    if(!empty||empty.querySelector('[data-digiy-dakar-empty-cta]'))return;

    var t=COPY[currentLang()]||COPY.fr;
    var box=document.createElement('div');
    box.setAttribute('data-digiy-dakar-empty-cta','1');
    box.style.marginTop='14px';

    var p=document.createElement('p');
    p.textContent=t.seat;
    p.style.margin='0 0 10px';
    p.style.color='#fff3cf';
    p.style.fontWeight='1000';

    var actions=document.createElement('div');
    actions.className='actions';

    var places=document.createElement('a');
    places.href='/dakar.html#quartiers';
    places.textContent=t.places;

    var join=document.createElement('a');
    join.href='/tarifs-adherents-1.html';
    join.textContent=t.join;

    actions.append(places,join);
    box.append(p,actions);
    empty.appendChild(box);
  }

  function purge(){
    var results=document.getElementById('results');
    if(!results)return;
    var changed=false;
    Array.prototype.slice.call(results.querySelectorAll('.card')).forEach(function(card){
      if(isFgCard(card)){card.remove();changed=true;}
    });
    if(changed){
      var status=document.getElementById('status');
      if(status){
        var count=results.querySelectorAll('.card').length;
        status.textContent=(status.textContent||'').replace(/^\s*\d+/,String(count));
      }
    }
    installDakarEmptyCta(results);
  }

  function boot(){
    var results=document.getElementById('results');
    if(!results)return false;
    purge();
    new MutationObserver(purge).observe(results,{childList:true,subtree:true});
    return true;
  }

  if(!boot()){
    var observer=new MutationObserver(function(){if(boot())observer.disconnect();});
    observer.observe(document.documentElement,{childList:true,subtree:true});
  }
})();