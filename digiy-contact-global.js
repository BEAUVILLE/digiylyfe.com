/* DIGIYLYFE — chargeur vitrine 20260824
 * Core historique figé bit pour bit : /digiy-contact-global-core-20260824.js
 * Ajouts isolés : lien officiel PRO CARNET + doctrine abonnement autonome sur les pages adhérent.
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

  function installCarnetAutonomyNote(){
    var file=(location.pathname.split('/').pop()||'').toLowerCase();
    if(file!=='tarifs-adherents.html' && file!=='tarifs-adherents-1.html') return;
    if(document.querySelector('[data-digiy-carnet-autonomy]')) return;

    var copy={
      fr:'📒 CARNET PRO = abonnement autonome.',
      en:'📒 CARNET PRO = standalone subscription.',
      es:'📒 CARNET PRO = suscripción autónoma.',
      pt:'📒 CARNET PRO = assinatura autónoma.',
      it:'📒 CARNET PRO = abbonamento autonomo.',
      de:'📒 CARNET PRO = eigenständiges Abonnement.',
      nl:'📒 CARNET PRO = zelfstandig abonnement.',
      ar:'📒 CARNET PRO = اشتراك مستقل.'
    };

    var cards=document.querySelector('.cards');
    if(!cards) return;

    var note=document.createElement('section');
    note.setAttribute('data-digiy-carnet-autonomy','1');
    note.style.cssText='margin-top:16px;padding:16px 18px;border-radius:22px;border:1px solid rgba(246,196,83,.72);background:linear-gradient(145deg,rgba(246,196,83,.16),rgba(45,212,191,.10));color:#ffe9a8;text-align:center;font-size:clamp(16px,2.4vw,20px);font-weight:1000;line-height:1.35';
    cards.insertAdjacentElement('afterend',note);

    function refresh(){
      var lang=(document.documentElement.lang||localStorage.getItem('digiy_lang')||'fr').slice(0,2).toLowerCase();
      note.textContent=copy[lang]||copy.fr;
      note.dir=lang==='ar'?'rtl':'ltr';
    }

    refresh();
    new MutationObserver(refresh).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});
  }

  installCarnetAutonomyNote();

  var core=document.createElement('script');
  core.src='/digiy-contact-global-core-20260824.js?v=20260824';
  core.async=false;
  core.onload=installCarnetModuleLink;
  core.onerror=installCarnetModuleLink;
  document.head.appendChild(core);
})();
