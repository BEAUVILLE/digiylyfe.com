/* DIGIYLYFE · PRO CARNET · présence géographique commune */
(function(){
'use strict';
if(window.DIGIY_PRO_CARNET_GEO_V1)return;
window.DIGIY_PRO_CARNET_GEO_V1=true;

var path=(location.pathname||'/').toLowerCase();
var isSN=/\/(senegal|saly|dakar|territoire)\.html$/.test(path);
var lang=(document.documentElement.lang||new URLSearchParams(location.search).get('lang')||'fr').slice(0,2).toLowerCase();
var txt={
fr:{k:'📒 OUTIL PROFESSIONNEL',t:'PRO CARNET',p:'Gestion · suivi · rappels · clients · opérations métier. Un outil de travail simple pour les professionnels du territoire.',c:'DÉCOUVRIR PRO CARNET →'},
en:{k:'📒 PROFESSIONAL TOOL',t:'PRO CARNET',p:'Management · follow-up · reminders · clients · business operations. A simple work tool for local professionals.',c:'DISCOVER PRO CARNET →'},
es:{k:'📒 HERRAMIENTA PROFESIONAL',t:'PRO CARNET',p:'Gestión · seguimiento · recordatorios · clientes · operaciones profesionales. Una herramienta simple para los profesionales locales.',c:'DESCUBRIR PRO CARNET →'},
pt:{k:'📒 FERRAMENTA PROFISSIONAL',t:'PRO CARNET',p:'Gestão · acompanhamento · lembretes · clientes · operações profissionais. Uma ferramenta simples para profissionais locais.',c:'DESCOBRIR PRO CARNET →'},
it:{k:'📒 STRUMENTO PROFESSIONALE',t:'PRO CARNET',p:'Gestione · monitoraggio · promemoria · clienti · operazioni. Uno strumento semplice per i professionisti locali.',c:'SCOPRI PRO CARNET →'},
de:{k:'📒 PROFESSIONELLES WERKZEUG',t:'PRO CARNET',p:'Verwaltung · Nachverfolgung · Erinnerungen · Kunden · Abläufe. Ein einfaches Arbeitswerkzeug für lokale Profis.',c:'PRO CARNET ENTDECKEN →'},
nl:{k:'📒 PROFESSIONELE TOOL',t:'PRO CARNET',p:'Beheer · opvolging · herinneringen · klanten · bedrijfsactiviteiten. Een eenvoudige werktool voor lokale professionals.',c:'ONTDEK PRO CARNET →'},
ar:{k:'📒 أداة مهنية',t:'PRO CARNET',p:'إدارة · متابعة · تذكير · عملاء · عمليات مهنية. أداة عمل بسيطة للمهنيين المحليين.',c:'اكتشف PRO CARNET ←'}
};

function mount(){
 if(document.getElementById('digiyProCarnetGeo')||document.getElementById('proCarnetSaly'))return;
 var t=txt[lang]||txt.fr;
 var s=document.createElement('section');
 s.id='digiyProCarnetGeo';
 s.setAttribute('aria-label','PRO CARNET');
 s.style.cssText='margin:18px auto;padding:18px;border:2px solid rgba(246,196,83,.50);border-radius:26px;background:linear-gradient(145deg,rgba(246,196,83,.12),rgba(45,212,191,.10),rgba(255,255,255,.035));max-width:1120px';
 s.innerHTML='<span style="display:inline-flex;padding:6px 9px;border-radius:999px;border:1px solid rgba(246,196,83,.45);background:rgba(246,196,83,.08);color:#fff0c8;font-size:10px;font-weight:1000;letter-spacing:.08em">'+t.k+'</span>'+
 '<h2 style="margin:9px 0 0;font-size:clamp(26px,5vw,39px);line-height:1.05">'+t.t+'</h2>'+
 '<p style="margin:8px 0 0;color:#d7eeea;font-weight:800;line-height:1.5">'+t.p+'</p>'+
 (isSN?'<div style="margin-top:11px;color:#fff3cf;font-size:18px;font-weight:1000">13 000 FCFA / mois · tarif unique</div>':'')+
 '<a href="/tarifs-adherents-1.html?lang='+encodeURIComponent(lang)+'#carnet-pro" style="display:inline-flex;margin-top:13px;min-height:46px;align-items:center;justify-content:center;padding:11px 15px;border-radius:999px;background:linear-gradient(135deg,#fff1bd,#f6c453,#22c55e);color:#06140f;text-decoration:none;font-size:11px;font-weight:1000">'+t.c+'</a>';

 var anchor=document.querySelector('section[style*="text-align:center"]')||document.querySelector('footer')||document.querySelector('main > .note')||document.body.lastElementChild;
 if(anchor&&anchor.parentNode)anchor.parentNode.insertBefore(s,anchor); else document.body.appendChild(s);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true}); else mount();
})();