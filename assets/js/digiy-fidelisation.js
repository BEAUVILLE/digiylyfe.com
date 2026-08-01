/* DIGIYLYFE — fidélisation relationnelle par la fiche et le QR */
(function(){
  'use strict';
  if(window.__DIGIY_FIDELISATION__)return;
  window.__DIGIY_FIDELISATION__=true;

  var COPY={
    fr:{
      label:'FIDÉLISATION · CONTACT DIRECT',
      title:'Votre client peut revenir directement vers vous.',
      text:'DIGIYLYFE ne sert pas seulement à vous rendre visible. Votre fiche, votre lien et votre QR permettent à un client satisfait de vous retrouver, de vous recontacter et de vous recommander facilement.',
      quote:'Les réseaux diffusent. Votre fiche reste accessible. Le QR DIGIY prépare le retour du client.',
      items:['Contact direct avec le professionnel','Fiche et QR faciles à conserver et partager','Recommandation entre clients et professionnels','Paiement direct au professionnel','0 % de commission DIGIY']
    },
    en:{
      label:'LOYALTY · DIRECT CONTACT',
      title:'Your customer can come back to you directly.',
      text:'DIGIYLYFE does more than make you visible. Your profile, link and QR help a satisfied customer find you again, contact you directly and recommend you easily.',
      quote:'Social networks spread the word. Your profile stays available. The DIGIY QR prepares the customer’s return.',
      items:['Direct contact with the professional','Profile and QR easy to save and share','Recommendations between customers and professionals','Direct payment to the professional','0% DIGIY commission']
    }
  };

  function lang(){return document.documentElement.lang==='en'?'en':'fr';}
  function render(){
    var t=COPY[lang()]||COPY.fr;
    var box=document.getElementById('digiy-fidelisation');
    if(!box)return;
    box.querySelector('[data-fid="label"]').textContent=t.label;
    box.querySelector('[data-fid="title"]').textContent=t.title;
    box.querySelector('[data-fid="text"]').textContent=t.text;
    box.querySelector('[data-fid="quote"]').textContent=t.quote;
    box.querySelector('[data-fid="items"]').innerHTML=t.items.map(function(item){return '<span><b aria-hidden="true">✓</b>'+item+'</span>';}).join('');
  }

  function init(){
    if(document.getElementById('digiy-fidelisation')){render();return;}
    var anchor=document.querySelector('.hubHead');
    if(!anchor)return;
    var style=document.createElement('style');
    style.id='digiy-fidelisation-style';
    style.textContent='.fidelisationBox{position:relative;z-index:1;max-width:900px;margin:18px auto 0;padding:18px;border-radius:26px;border:2px solid rgba(246,196,83,.82);background:radial-gradient(520px 220px at 100% 0,rgba(246,196,83,.28),transparent 64%),radial-gradient(420px 210px at 0 100%,rgba(45,212,191,.20),transparent 65%),linear-gradient(145deg,rgba(11,82,52,.98),rgba(4,25,18,.99));box-shadow:0 20px 48px rgba(0,0,0,.34);text-align:left}.fidelisationLabel{display:inline-flex;padding:7px 11px;border-radius:999px;border:1px solid rgba(255,241,189,.72);background:rgba(246,196,83,.14);color:#fff3cf;font-size:10px;font-weight:1000;letter-spacing:.09em}.fidelisationBox h2{margin:11px 0 7px;color:#fffaf0;font-size:clamp(26px,5.4vw,42px);line-height:.96;font-weight:1000;letter-spacing:-.045em}.fidelisationBox p{margin:0;color:rgba(255,250,240,.84);font-size:13px;line-height:1.45;font-weight:900}.fidelisationQuote{margin-top:12px!important;padding:11px 13px;border-radius:17px;border:1px dashed rgba(246,196,83,.62);background:rgba(246,196,83,.10);color:#fff3cf!important;text-align:center;font-weight:1000!important}.fidelisationItems{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:7px;margin-top:11px}.fidelisationItems span{min-height:58px;padding:9px;border-radius:15px;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.065);display:flex;align-items:center;gap:7px;color:#eafff3;font-size:10.5px;line-height:1.25;font-weight:950}.fidelisationItems b{color:#bdf7d2;font-size:16px}@media(max-width:760px){.fidelisationItems{grid-template-columns:repeat(2,minmax(0,1fr))}.fidelisationItems span:last-child{grid-column:1/-1}}@media(max-width:420px){.fidelisationBox{margin-top:15px;padding:14px 12px;border-radius:22px}.fidelisationBox h2{font-size:27px}.fidelisationItems{grid-template-columns:1fr}.fidelisationItems span:last-child{grid-column:auto}}';
    document.head.appendChild(style);
    var section=document.createElement('section');
    section.id='digiy-fidelisation';
    section.className='fidelisationBox';
    section.setAttribute('aria-label','Fidélisation client DIGIYLYFE');
    section.innerHTML='<span class="fidelisationLabel" data-fid="label"></span><h2 data-fid="title"></h2><p data-fid="text"></p><p class="fidelisationQuote" data-fid="quote"></p><div class="fidelisationItems" data-fid="items"></div>';
    anchor.insertAdjacentElement('afterend',section);
    render();
    document.querySelectorAll('.langBtn').forEach(function(btn){btn.addEventListener('click',function(){setTimeout(render,0);});});
    new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();