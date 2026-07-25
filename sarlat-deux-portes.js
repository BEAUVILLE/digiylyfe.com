(function(){
  'use strict';

  function installSarlatDoors(){
    var section=document.querySelector('.territories#territoires');
    if(!section || document.getElementById('sarlatTwoDoors'))return;

    var style=document.createElement('style');
    style.id='sarlatTwoDoorsStyle';
    style.textContent=`
      .territoryDoor{
        background:linear-gradient(120deg,rgba(4,19,13,.35),rgba(4,19,13,.91)),url('https://digiylyfe.net/wp-content/uploads/2026/07/1D087BF5-6D9F-462D-91A5-6420FC1A20BD_1_105_c.jpeg') center/cover!important
      }
      .territoryChoices{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-top:11px}
      .territoryChoice{min-height:126px;padding:16px;border-radius:21px;border:1px solid rgba(255,241,189,.5);display:grid;grid-template-columns:52px 1fr;gap:12px;align-items:center;background:linear-gradient(145deg,rgba(255,255,255,.1),rgba(255,255,255,.035));box-shadow:0 12px 30px rgba(0,0,0,.2);transition:transform .16s ease,border-color .16s ease,background .16s ease}
      .territoryChoice:hover{transform:translateY(-2px);border-color:#fff1bd;background:linear-gradient(145deg,rgba(246,196,83,.18),rgba(34,197,94,.09))}
      .territoryChoiceIcon{width:52px;height:52px;border-radius:17px;display:grid;place-items:center;background:rgba(246,196,83,.15);border:1px solid rgba(246,196,83,.45);font-size:26px}
      .territoryChoice strong{display:block;color:#fff;font-size:17px;line-height:1.05;font-weight:1000}
      .territoryChoice small{display:block;margin-top:5px;color:var(--soft);font-size:11px;line-height:1.35;font-weight:850}
      .territoryChoice b{display:block;margin-top:7px;color:#fff3cf;font-size:10px;line-height:1.25;font-weight:1000;text-transform:uppercase;letter-spacing:.05em}
      @media(max-width:720px){.territoryChoices{grid-template-columns:1fr}.territoryChoice{min-height:112px}}
    `;
    document.head.appendChild(style);

    var choices=document.createElement('div');
    choices.id='sarlatTwoDoors';
    choices.className='territoryChoices';
    choices.setAttribute('aria-label','Les deux portes de SARLAT');
    choices.innerHTML=`
      <a class="territoryChoice" data-hub-allow="fullscreen" href="./sarlat.html#manger">
        <span aria-hidden="true" class="territoryChoiceIcon">🍽️</span>
        <span><strong data-sarlat-key="foodTitle">MANGER À SARLAT</strong><small data-sarlat-key="foodText">L’Entre 2 & Le Malraux · cartes, photos et contact direct.</small><b data-sarlat-key="foodCta">Ouvrir la porte restaurants →</b></span>
      </a>
      <a class="territoryChoice" data-hub-allow="fullscreen" href="./sarlat.html#dormir">
        <span aria-hidden="true" class="territoryChoiceIcon">🛏️</span>
        <span><strong data-sarlat-key="stayTitle">DORMIR À SARLAT</strong><small data-sarlat-key="stayText">SARLAT CHEZ BAPTISTE · chambre privée et demande directe.</small><b data-sarlat-key="stayCta">Ouvrir la porte hébergement →</b></span>
      </a>
    `;

    var mainDoor=section.querySelector('.territoryDoor');
    if(mainDoor)mainDoor.insertAdjacentElement('afterend',choices);
    else section.appendChild(choices);

    var copy=section.querySelector('[data-i18n="sarlatText"]');
    var cta=section.querySelector('[data-i18n="sarlatCta"]');

    var T={
      fr:{
        text:'Deux portes locales : manger à Sarlat et dormir à Sarlat, avec contact direct.',
        cta:'Voir toute la vitrine →',
        label:'Les deux portes de SARLAT',
        foodTitle:'MANGER À SARLAT',
        foodText:'L’Entre 2 & Le Malraux · cartes, photos et contact direct.',
        foodCta:'Ouvrir la porte restaurants →',
        stayTitle:'DORMIR À SARLAT',
        stayText:'SARLAT CHEZ BAPTISTE · chambre privée et demande directe.',
        stayCta:'Ouvrir la porte hébergement →'
      },
      en:{
        text:'Two local doors: eat in Sarlat and stay in Sarlat, with direct contact.',
        cta:'View the full showcase →',
        label:'The two SARLAT doors',
        foodTitle:'EAT IN SARLAT',
        foodText:'L’Entre 2 & Le Malraux · menus, photos and direct contact.',
        foodCta:'Open the restaurant door →',
        stayTitle:'STAY IN SARLAT',
        stayText:'SARLAT CHEZ BAPTISTE · private room and direct request.',
        stayCta:'Open the accommodation door →'
      }
    };

    function render(){
      var lang=(document.documentElement.lang||'fr').toLowerCase().indexOf('en')===0?'en':'fr';
      var text=T[lang];
      if(copy)copy.textContent=text.text;
      if(cta)cta.textContent=text.cta;
      choices.setAttribute('aria-label',text.label);
      choices.querySelectorAll('[data-sarlat-key]').forEach(function(el){
        var key=el.getAttribute('data-sarlat-key');
        if(text[key])el.textContent=text[key];
      });
      var links=choices.querySelectorAll('a');
      if(links[0])links[0].setAttribute('aria-label',text.foodTitle);
      if(links[1])links[1].setAttribute('aria-label',text.stayTitle);
    }

    render();
    document.querySelectorAll('.langBtn').forEach(function(btn){
      btn.addEventListener('click',function(){setTimeout(render,0);});
    });
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',installSarlatDoors);
  else installSarlatDoors();
})();
