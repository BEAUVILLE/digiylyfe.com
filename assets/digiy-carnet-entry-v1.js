/* DIGIYLYFE — vitrine porte CARNET PRO — 20260927 */
(function(){'use strict';
var L={
fr:{k:'LOGICIEL MÉTIER',t:'CARNET PRO · 13 000 FCFA / mois',p:'Un vrai outil de travail : gestion, suivi, rappels, clients et opérations métier. Tarif unique · aucun palier.',c:'DÉCOUVRIR CARNET PRO →'},
en:{k:'BUSINESS SOFTWARE',t:'CARNET PRO · 13,000 FCFA / month',p:'A real work tool for management, follow-up, reminders, clients and business operations. Single price · no tiers.',c:'DISCOVER CARNET PRO →'},
es:{k:'SOFTWARE PROFESIONAL',t:'CARNET PRO · 13 000 FCFA / mes',p:'Una herramienta de trabajo para gestión, seguimiento, recordatorios, clientes y operaciones. Precio único · sin niveles.',c:'DESCUBRIR CARNET PRO →'},
pt:{k:'SOFTWARE PROFISSIONAL',t:'CARNET PRO · 13 000 FCFA / mês',p:'Uma ferramenta de trabalho para gestão, acompanhamento, lembretes, clientes e operações. Preço único · sem níveis.',c:'DESCOBRIR CARNET PRO →'},
it:{k:'SOFTWARE PROFESSIONALE',t:'CARNET PRO · 13 000 FCFA / mese',p:'Uno strumento di lavoro per gestione, monitoraggio, promemoria, clienti e operazioni. Prezzo unico · nessun livello.',c:'SCOPRI CARNET PRO →'},
de:{k:'BUSINESS-SOFTWARE',t:'CARNET PRO · 13.000 FCFA / Monat',p:'Ein Arbeitswerkzeug für Verwaltung, Nachverfolgung, Erinnerungen, Kunden und Abläufe. Ein Preis · keine Stufen.',c:'CARNET PRO ENTDECKEN →'},
nl:{k:'BEDRIJFSSOFTWARE',t:'CARNET PRO · 13.000 FCFA / maand',p:'Een werkinstrument voor beheer, opvolging, herinneringen, klanten en activiteiten. Eén prijs · geen niveaus.',c:'ONTDEK CARNET PRO →'},
ar:{k:'برنامج مهني',t:'CARNET PRO · 13 000 FCFA / شهر',p:'أداة عمل للإدارة والمتابعة والتذكيرات والعملاء والعمليات المهنية. سعر واحد · بدون مستويات.',c:'اكتشف CARNET PRO ←'}
};
function lang(){var x=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();return L[x]?x:'fr'}
function install(){
 if(document.getElementById('digiyCarnetEntry'))return;
 var host=document.querySelector('.digiyCampus')||document.querySelector('footer')||document.body.lastElementChild;
 if(!host||!host.parentNode)return;
 var x=L[lang()]||L.fr,s=document.createElement('section');s.id='digiyCarnetEntry';
 s.style.cssText='margin:18px auto;padding:18px;border:2px solid rgba(45,212,191,.38);border-radius:24px;background:linear-gradient(145deg,rgba(45,212,191,.10),rgba(246,196,83,.10));max-width:1050px';
 s.innerHTML='<span style="font-size:11px;font-weight:1000;letter-spacing:.08em;color:#bfffd1">'+x.k+'</span><h2 style="margin:7px 0 7px;font-size:clamp(25px,5vw,38px);line-height:1">'+x.t+'</h2><p style="margin:0;color:#dfe9e4;font-weight:800;line-height:1.5">'+x.p+'</p><a href="https://digiy-carnet-pro.digiylyfe.com" style="display:inline-flex;margin-top:12px;padding:11px 14px;border-radius:999px;background:linear-gradient(135deg,#f6c453,#2dd4bf);color:#06140f;font-weight:1000;text-decoration:none">'+x.c+'</a>';
 host.parentNode.insertBefore(s,host);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
document.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('[data-lang],[data-l]'))setTimeout(function(){var s=document.getElementById('digiyCarnetEntry');if(s)s.remove();install()},100)});
})();