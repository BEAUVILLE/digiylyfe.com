/* DIGIYLYFE — entrée pilote Saly V1 */
(function(){
'use strict';
const q=new URLSearchParams(location.search);
const path=location.pathname.replace(/\/+$/,'')||'/';
const isHome=path==='/'||/\/index\.html$/i.test(path);
if(!isHome)return;
const zone=(q.get('zone')||q.get('local')||'').toLowerCase();
const src=(q.get('src')||'').trim();
function esc(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function u(path,params){
  const x=new URL(path,location.origin);
  Object.entries(params||{}).forEach(([k,v])=>{if(v)x.searchParams.set(k,v)});
  return x.pathname+x.search;
}
function mount(){
  if(document.getElementById('digiySalyPilotEntry'))return;
  const anchor=document.getElementById('digiyEntryChoice')||document.querySelector('main');
  if(!anchor){setTimeout(mount,80);return}

  const s=document.createElement('section');
  s.id='digiySalyPilotEntry';
  s.setAttribute('aria-label','DIGIYLYFE Saly · réseau local');
  s.innerHTML=`
    <style>
      #digiySalyPilotEntry{margin:18px auto;padding:20px;border:1px solid #f6c45366;border-radius:26px;background:linear-gradient(145deg,#f6c45312,#2dd4bf0d,#ffffff08);box-shadow:0 18px 48px #0003}
      #digiySalyPilotEntry .k{font-size:11px;font-weight:1000;letter-spacing:.1em;color:#ffe4a3}
      #digiySalyPilotEntry h2{margin:8px 0 6px;font-size:clamp(28px,6vw,44px);line-height:1}
      #digiySalyPilotEntry .lead{margin:0;color:#dcebe6;font-weight:850;line-height:1.5}
      #digiySalyPilotEntry .grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:16px}
      #digiySalyPilotEntry .door{display:flex;flex-direction:column;gap:7px;padding:16px;border:1px solid #ffffff25;border-radius:20px;background:#ffffff08;text-decoration:none;color:#fff}
      #digiySalyPilotEntry .door strong{font-size:18px}
      #digiySalyPilotEntry .door span{color:#cfe0da;font-weight:750;line-height:1.4}
      #digiySalyPilotEntry .cta{margin-top:auto;color:#ffe29b!important;font-weight:1000!important}
      #digiySalyPilotEntry .pro{border-color:#f6c45366}
      #digiySalyPilotEntry .note{margin-top:12px;font-size:11px;color:#bed0ca;font-weight:750;line-height:1.45}
      @media(max-width:680px){#digiySalyPilotEntry .grid{grid-template-columns:1fr}}
    </style>
    <div class="k">SALY · RÉSEAU LOCAL EN CONSTRUCTION</div>
    <h2>Un besoin à Saly ? Une activité à faire connaître ?</h2>
    <p class="lead">DIGIYLYFE relie directement les besoins du territoire aux professionnels locaux. Pas d’intermédiaire sur la relation. 0 % commission.</p>
    <div class="grid">
      <a class="door public" href="#territoires">
        <strong>Je cherche à Saly</strong>
        <span>Hébergement · restaurant · chauffeur · excursion · artisan · services.</span>
        <span class="cta">CHERCHER DANS LE TERRITOIRE →</span>
      </a>
      <a class="door pro" href="${esc(u('/preparer-ma-carte.html',{pilot:'saly',plan:'pionnier-saly-13000',country:'sn',territory:'petite-cote',local:'saly',src}))}">
        <strong>Je suis professionnel à Saly</strong>
        <span>Candidatez au pilote. DIGIYLYFE sélectionne les activités utiles au réseau avant BAT et paiement.</span>
        <span class="cta">CANDIDATER AU PILOTE SALY →</span>
      </a>
    </div>
    <div class="note">Tarif pionnier si sélectionné : 13 000 FCFA/mois · aucune place réservée avant sélection, BAT accepté et premier paiement confirmé.</div>
  `;
  anchor.insertAdjacentElement('beforebegin',s);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();
})();