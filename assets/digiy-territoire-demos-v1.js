/* DIGIYLYFE — pont territoire MAITRE V3
 * Dakar : LA VOIX conserve son pont historique.
 * Global : traduit le besoin technique health_care en libellé public dans les 8 langues.
 * Correctif borné : aucun MutationObserver, aucune boucle permanente.
 */
(function(){
  'use strict';

  function params(){
    try{return new URLSearchParams(location.search)}catch(e){return new URLSearchParams()}
  }

  function currentLang(){
    var q=(params().get('lang')||'').slice(0,2).toLowerCase();
    var h=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();
    return HEALTH[q]?q:(HEALTH[h]?h:'fr');
  }

  var HEALTH={
    fr:{title:'Santé & soins',meta:'MÉDECIN · DENTISTE · INFIRMIER · SAGE-FEMME · AIDE À LA PERSONNE'},
    en:{title:'Health & care',meta:'DOCTOR · DENTIST · NURSE · MIDWIFE · PERSONAL ASSISTANCE'},
    es:{title:'Salud y cuidados',meta:'MÉDICO · DENTISTA · ENFERMERÍA · MATRONA · AYUDA A LA PERSONA'},
    pt:{title:'Saúde & cuidados',meta:'MÉDICO · DENTISTA · ENFERMEIRO · PARTEIRA · APOIO À PESSOA'},
    de:{title:'Gesundheit & Pflege',meta:'ARZT · ZAHNARZT · PFLEGEKRAFT · HEBAMME · ALLTAGSHILFE'},
    it:{title:'Salute & assistenza',meta:'MEDICO · DENTISTA · INFERMIERE · OSTETRICA · ASSISTENZA ALLA PERSONA'},
    nl:{title:'Gezondheid & zorg',meta:'ARTS · TANDARTS · VERPLEEGKUNDIGE · VERLOSKUNDIGE · PERSOONLIJKE HULP'},
    ar:{title:'الصحة والرعاية',meta:'طبيب · طبيب أسنان · ممرض · قابلة · مساعدة شخصية'}
  };

  function applyDakarVoice(){
    if((params().get('zone')||'')!=='dakar')return;
    var d=window.DIGIY_DAKAR_DATA;
    var l=(document.documentElement.lang||params().get('lang')||'fr').slice(0,2).toLowerCase();
    var pk=d&&d.packs?(d.packs[l]||d.packs.fr):null;
    var j=document.getElementById('dakarProJoin');
    if(j&&params().get('need')==='guidance'&&pk){
      j.href='https://pro-action-digiy.digiylyfe.com/';
      j.textContent=pk.projection.voiceTry;
    }
  }

  function healthButton(){
    var buttons=document.querySelectorAll('#needs .need');
    for(var i=0;i<buttons.length;i++){
      var icon=buttons[i].querySelector('strong');
      var label=buttons[i].querySelector('span');
      if((icon&&icon.textContent.trim()==='🩺') || (label&&label.textContent.trim().toLowerCase()==='health_care'))return buttons[i];
    }
    return null;
  }

  function applyHealth(){
    var b=healthButton();
    if(!b)return false;
    var t=HEALTH[currentLang()]||HEALTH.fr;
    var label=b.querySelector('span');
    var meta=b.querySelector('small');
    if(label&&label.textContent!==t.title)label.textContent=t.title;
    if(meta&&meta.textContent!==t.meta)meta.textContent=t.meta;
    return true;
  }

  function settleHealth(){
    var tries=0;
    function tick(){
      tries++;
      applyHealth();
      if(tries<24)setTimeout(tick,100);
    }
    tick();
  }

  function boot(){
    applyDakarVoice();
    settleHealth();
    document.addEventListener('click',function(e){
      if(!e.target.closest)return;
      if(e.target.closest('#needs,#zones,[data-lang]')){
        setTimeout(applyDakarVoice,30);
        setTimeout(settleHealth,30);
      }
    });
    window.addEventListener('popstate',function(){applyDakarVoice();settleHealth();});
    window.addEventListener('load',settleHealth,{once:true});
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);
  else boot();
})();
