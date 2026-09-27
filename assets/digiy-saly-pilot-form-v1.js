/* DIGIYLYFE — candidature pilote Saly V1 */
(function(){
'use strict';
const q=new URLSearchParams(location.search);
if((q.get('pilot')||'').toLowerCase()!=='saly'||(q.get('plan')||'')!=='pionnier-saly-13000')return;

function setText(id,text){const el=document.getElementById(id);if(el)el.textContent=text}
function apply(){
  const form=document.getElementById('form');
  if(!form){setTimeout(apply,80);return}

  setText('ey','CANDIDATURE · PILOTE SALY');
  setText('title','Candidatez au pilote DIGIYLYFE Saly');
  setText('lead','Votre dossier est étudié par DIGIYLYFE. Remplir ce formulaire ne vous inscrit pas automatiquement et ne réserve aucune place.');
  setText('proofTitle','AUCUN PAIEMENT MAINTENANT');
  setText('proofLabel','Candidatez d’abord. Si votre dossier est retenu, DIGIYLYFE prépare votre BAT. Vous décidez ensuite.');
  setText('submit','ENVOYER MA CANDIDATURE →');
  setText('consentText','Je confirme que ces informations sont exactes et j’autorise DIGIYLYFE à étudier ma candidature au pilote Saly et à me contacter au sujet de ce dossier.');

  if(!document.querySelector('[data-saly-pilot-gate]')){
    const box=document.createElement('section');
    box.setAttribute('data-saly-pilot-gate','1');
    box.style.cssText='margin:0 0 16px;padding:16px;border:1px solid #f6c45377;border-radius:18px;background:#f6c45310;color:#fff8df;line-height:1.5;font-weight:850';
    box.innerHTML='<strong style="display:block;font-size:14px;margin-bottom:8px">PILOTE SALY · SÉLECTION DIGIYLYFE</strong>'+
      '<div>Tarif pionnier si sélectionné : <b>13 000 FCFA / mois</b>.</div>'+
      '<div style="margin-top:7px">Nous revenons vers vous <b>sous 48 h</b> après réception du dossier.</div>'+
      '<div style="margin-top:9px;font-size:12px;color:#e8eee9">Critères : métier utile au réseau Saly · professionnel joignable · accord avec le principe BAT avant paiement.</div>'+
      '<div style="margin-top:9px;font-size:12px;color:#ffd98a">Le statut pionnier est attribué uniquement après sélection, BAT accepté et premier paiement confirmé.</div>';
    form.insertBefore(box,form.firstChild);
  }

  const status=document.getElementById('status');
  if(status&&!status.classList.contains('ok')&&!status.classList.contains('bad')){
    status.textContent='Candidature en préparation · aucun paiement demandé maintenant.';
  }

  const formEl=document.getElementById('form');
  if(formEl&&!formEl.dataset.salyPilotAckBound){
    formEl.dataset.salyPilotAckBound='1';
    formEl.addEventListener('submit',function(){
      setTimeout(function(){
        const st=document.getElementById('status');
        if(st&&st.classList.contains('ok')){
          st.textContent='Bonjour, nous avons bien reçu votre candidature pour le pilote DIGIYLYFE Saly. Nous revenons vers vous sous 48 heures. Cette réponse ne vaut pas acceptation — nous vous confirmerons la suite après étude du dossier.';
        }
      },1200);
    });
  }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply);else apply();
})();