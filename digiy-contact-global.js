/* DIGIYLYFE — chargeur vitrine 20260824
 * Core historique figé bit pour bit : /digiy-contact-global-core-20260824.js
 * Ajout isolé : porte PRO CARNET · DÉMO sur l'accueil uniquement.
 */
(function(){
  'use strict';

  function isHome(){
    var host=(location.hostname||'').toLowerCase();
    var path=(location.pathname||'/').replace(/\/+$/,'/')||'/';
    return host==='digiylyfe.com' && (path==='/' || path==='/index.html');
  }

  function installCarnetDemo(){
    if(!isHome() || document.querySelector('[data-digiy-carnet-demo]')) return;

    var copy={
      fr:{kicker:'OUTIL PRO · DÉMO',title:'PRO CARNET',text:'Entrées, sorties, Wave, Orange Money, Cash, PRO / PERSO, historique et saisie vocale. Le professionnel garde la main et valide ses mouvements.',note:'Outil professionnel distinct de l’adhésion DIGIYLYFE.',cta:'📒 OUVRIR PRO CARNET · DÉMO →'},
      en:{kicker:'PRO TOOL · DEMO',title:'PRO CARNET',text:'Income, expenses, Wave, Orange Money, Cash, PRO / PERSONAL, history and voice entry. The professional stays in control and validates each movement.',note:'Professional tool separate from DIGIYLYFE membership.',cta:'📒 OPEN PRO CARNET · DEMO →'},
      es:{kicker:'HERRAMIENTA PRO · DEMO',title:'PRO CARNET',text:'Entradas, salidas, Wave, Orange Money, Cash, PRO / PERSONAL, historial y entrada por voz. El profesional mantiene el control y valida sus movimientos.',note:'Herramienta profesional separada de la adhesión DIGIYLYFE.',cta:'📒 ABRIR PRO CARNET · DEMO →'},
      pt:{kicker:'FERRAMENTA PRO · DEMO',title:'PRO CARNET',text:'Entradas, saídas, Wave, Orange Money, Cash, PRO / PESSOAL, histórico e registo por voz. O profissional mantém o controlo e valida os movimentos.',note:'Ferramenta profissional separada da adesão DIGIYLYFE.',cta:'📒 ABRIR PRO CARNET · DEMO →'},
      it:{kicker:'STRUMENTO PRO · DEMO',title:'PRO CARNET',text:'Entrate, uscite, Wave, Orange Money, Cash, PRO / PERSONALE, storico e inserimento vocale. Il professionista mantiene il controllo e convalida i movimenti.',note:'Strumento professionale separato dall’adesione DIGIYLYFE.',cta:'📒 APRI PRO CARNET · DEMO →'},
      de:{kicker:'PRO-WERKZEUG · DEMO',title:'PRO CARNET',text:'Einnahmen, Ausgaben, Wave, Orange Money, Cash, PRO / PRIVAT, Verlauf und Spracheingabe. Der Profi behält die Kontrolle und bestätigt seine Bewegungen.',note:'Professionelles Werkzeug getrennt von der DIGIYLYFE-Mitgliedschaft.',cta:'📒 PRO CARNET · DEMO ÖFFNEN →'},
      nl:{kicker:'PRO-TOOL · DEMO',title:'PRO CARNET',text:'Inkomsten, uitgaven, Wave, Orange Money, Cash, PRO / PRIVÉ, geschiedenis en spraakinvoer. De professional houdt de regie en bevestigt de verrichtingen.',note:'Professionele tool los van het DIGIYLYFE-lidmaatschap.',cta:'📒 OPEN PRO CARNET · DEMO →'},
      ar:{kicker:'أداة مهنية · عرض تجريبي',title:'PRO CARNET',text:'مداخيل ومصاريف وWave وOrange Money وCash وPRO / شخصي وسجل وإدخال صوتي. يبقى المهني هو المتحكم ويؤكد حركاته بنفسه.',note:'أداة مهنية منفصلة عن عضوية DIGIYLYFE.',cta:'← فتح PRO CARNET · عرض تجريبي 📒'}
    };

    var section=document.createElement('section');
    section.setAttribute('data-digiy-carnet-demo','1');
    section.setAttribute('aria-label','PRO CARNET · démonstration');
    section.style.cssText='margin-top:14px;padding:16px;border-radius:26px;border:1px solid rgba(246,196,83,.58);background:linear-gradient(145deg,rgba(246,196,83,.11),rgba(34,197,94,.09),rgba(255,255,255,.045));box-shadow:0 16px 38px rgba(0,0,0,.22)';
    section.innerHTML='<div style="display:grid;grid-template-columns:58px minmax(0,1fr);gap:12px;align-items:center"><span aria-hidden="true" style="width:58px;height:58px;border-radius:19px;display:grid;place-items:center;background:linear-gradient(135deg,rgba(246,196,83,.24),rgba(34,197,94,.18));border:1px solid rgba(246,196,83,.48);font-size:29px">📒</span><div><small data-carnet-kicker style="display:block;color:#fde68a;font-size:10px;font-weight:1000;letter-spacing:.09em;text-transform:uppercase"></small><strong data-carnet-title style="display:block;margin-top:4px;color:#fffaf0;font-size:25px;line-height:1;font-weight:1000"></strong></div></div><p data-carnet-text style="margin:12px 0 0;color:rgba(255,250,240,.82);font-size:12.5px;line-height:1.5;font-weight:850"></p><p data-carnet-note style="margin:9px 0 0;color:rgba(255,250,240,.62);font-size:10.5px;line-height:1.4;font-weight:900"></p><a data-carnet-cta href="https://digiylyfe.com/carnet-master-test/?v=f16-final-20260824" style="display:flex;min-height:54px;align-items:center;justify-content:center;margin-top:13px;padding:11px 15px;border-radius:999px;background:linear-gradient(135deg,#fff1bd,#f6c453,#22c55e);color:#06140f;font-size:12.5px;font-weight:1000;text-decoration:none;text-align:center;border:1px solid rgba(246,196,83,.75)"></a>';

    function refresh(){
      var lang=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();
      var t=copy[lang]||copy.fr;
      section.querySelector('[data-carnet-kicker]').textContent=t.kicker;
      section.querySelector('[data-carnet-title]').textContent=t.title;
      section.querySelector('[data-carnet-text]').textContent=t.text;
      section.querySelector('[data-carnet-note]').textContent=t.note;
      section.querySelector('[data-carnet-cta]').textContent=t.cta;
    }

    var publicSection=document.querySelector('section[aria-label="Portes publiques DIGIYLYFE"]');
    var proofSection=document.querySelector('section[aria-label="Preuves terrain DIGIYLYFE"]');
    if(publicSection && publicSection.parentNode) publicSection.parentNode.insertBefore(section,publicSection);
    else if(proofSection) proofSection.insertAdjacentElement('afterend',section);
    else {
      var main=document.querySelector('main.app')||document.querySelector('main')||document.body;
      main.appendChild(section);
    }

    refresh();
    new MutationObserver(refresh).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});
  }

  var core=document.createElement('script');
  core.src='/digiy-contact-global-core-20260824.js?v=20260824';
  core.async=false;
  core.onload=installCarnetDemo;
  core.onerror=function(){
    console.warn('DIGIYLYFE : core vitrine indisponible');
    installCarnetDemo();
  };
  document.head.appendChild(core);
})();
