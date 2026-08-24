/* DIGIYLYFE — chargeur vitrine stable 20260824
 * Core historique figé bit pour bit : /digiy-contact-global-core-20260824.js
 * Ajout isolé : lien officiel PRO CARNET dans la grille publique.
 */
(function(){
  'use strict';

  function installCarnetModuleLink(){
    var grid=document.querySelector('.publicGrid');
    if(!grid || grid.querySelector('a[href="https://digiy-carnet-pro.digiylyfe.com/"]')) return;

    var copy={
      fr:'Carnet d’activité · entrées · sorties',
      en:'Activity ledger · income · expenses',
      es:'Cuaderno de actividad · entradas · salidas',
      pt:'Caderno de atividade · entradas · saídas',
      it:'Registro attività · entrate · uscite',
      de:'Aktivitätsbuch · Einnahmen · Ausgaben',
      nl:'Activiteitenboek · inkomsten · uitgaven',
      ar:'دفتر النشاط · مداخيل · مصاريف'
    };

    var card=document.createElement('a');
    card.className='publicCard';
    card.href='https://digiy-carnet-pro.digiylyfe.com/';
    card.setAttribute('aria-label','Découvrir PRO CARNET');
    card.innerHTML='<i aria-hidden="true">📒</i><strong>PRO CARNET</strong><small data-digiy-carnet-module-copy></small>';
    grid.appendChild(card);

    function refresh(){
      var lang=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();
      var small=card.querySelector('[data-digiy-carnet-module-copy]');
      if(small) small.textContent=copy[lang]||copy.fr;
    }

    refresh();
    new MutationObserver(refresh).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});
  }

  var core=document.createElement('script');
  core.src='/digiy-contact-global-core-20260824.js?v=20260824';
  core.async=false;
  core.onload=installCarnetModuleLink;
  core.onerror=installCarnetModuleLink;
  document.head.appendChild(core);
})();
