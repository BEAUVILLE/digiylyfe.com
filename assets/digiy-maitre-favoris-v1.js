/* DIGIYLYFE — MAÎTRE · POLITIQUE FAVORIS V1 · 2026-09-07
 * Invariant industriel : aucune carte adhérent publiée sans accès ☆ à MON DIGIY.
 * Le MAÎTRE expose cette règle aux couches de vitrine, territoire, MASTER et ateliers.
 * Vitrine : porte DIGIY LOC visible vers la grille publique de paliers.
 */
(function(){
  'use strict';
  if(window.DIGIY_MAITRE_FAVORIS_V1) return;

  var policy={
    version:'2026-09-07-v2',
    required:true,
    symbol:'☆',
    destination:'https://digiylyfe.com/mon-digiy.html',
    cardBridge:'https://digiylyfe.com/assets/digiy-card-favorite-v1.js',
    galleryBridge:'https://digiylyfe.com/assets/digiy-gallery-favorites-v1.js',
    rule:'Aucune carte adhérent publiée sans accès MON DIGIY.',
    kind:'professionnel'
  };

  window.DIGIY_MAITRE_FAVORIS_V1=policy;
  window.DIGIY_MAITRE_RULES=window.DIGIY_MAITRE_RULES||{};
  window.DIGIY_MAITRE_RULES.favoris=policy;

  try{
    document.documentElement.dataset.digiyMaitreFavoris='required';
    document.documentElement.dataset.digiyMaitreFavorisVersion=policy.version;
  }catch(_){}

  /* Porte tarifaire LOC — uniquement sur la vitrine principale. */
  function installLocDoor(){
    var path=(location.pathname||'/').replace(/\/index\.html$/,'/');
    if(path!=='/') return;
    if(document.getElementById('digiyHomeLocDoor')) return;
    var grid=document.querySelector('#digiyEntryChoice .digiyEntryGrid');
    if(!grid) return;

    var TEXT={
      fr:{k:'HÉBERGEMENT · LOC',t:'DIGIY LOC · tarifs par paliers',p:'1–3 unités : 28 000 FCFA / 75 € par mois. Le tarif évolue avec le nombre d’hébergements.',c:'VOIR LES PALIERS LOC →'},
      en:{k:'ACCOMMODATION · LOC',t:'DIGIY LOC · tiered pricing',p:'1–3 units: 28,000 FCFA / €75 per month. Pricing scales with the number of accommodation units.',c:'VIEW LOC TIERS →'},
      es:{k:'ALOJAMIENTO · LOC',t:'DIGIY LOC · tarifas por tramos',p:'1–3 unidades: 28 000 FCFA / 75 € al mes. El precio evoluciona según el número de alojamientos.',c:'VER TRAMOS LOC →'},
      pt:{k:'ALOJAMENTO · LOC',t:'DIGIY LOC · preços por escalões',p:'1–3 unidades: 28 000 FCFA / 75 € por mês. O preço evolui com o número de alojamentos.',c:'VER ESCALÕES LOC →'},
      it:{k:'ALLOGGI · LOC',t:'DIGIY LOC · tariffe a fasce',p:'1–3 unità: 28.000 FCFA / 75 € al mese. Il prezzo cresce con il numero di alloggi.',c:'VEDI LE FASCE LOC →'},
      de:{k:'UNTERKUNFT · LOC',t:'DIGIY LOC · Preisstaffeln',p:'1–3 Einheiten: 28.000 FCFA / 75 € pro Monat. Der Preis richtet sich nach der Zahl der Unterkünfte.',c:'LOC-STAFFELN ANSEHEN →'},
      nl:{k:'ACCOMMODATIE · LOC',t:'DIGIY LOC · prijsstaffels',p:'1–3 eenheden: 28.000 FCFA / €75 per maand. De prijs groeit mee met het aantal accommodaties.',c:'BEKIJK LOC-STAFFELS →'},
      ar:{k:'الإقامة · LOC',t:'DIGIY LOC · أسعار حسب الشرائح',p:'من 1 إلى 3 وحدات: 28 000 فرنك CFA / 75 € شهرياً. يتغير السعر حسب عدد وحدات الإقامة.',c:'عرض شرائح LOC ←'}
    };

    var style=document.createElement('style');
    style.setAttribute('data-digiy-home-loc-door','1');
    style.textContent='#digiyHomeLocDoor{grid-column:1/-1;min-height:150px;border-color:rgba(45,212,191,.58);background:linear-gradient(115deg,rgba(14,116,144,.24),rgba(22,163,74,.16),rgba(246,196,83,.13))}#digiyHomeLocDoor .digiyLocPrice{display:inline-flex;align-self:flex-start;margin:2px 0 1px;padding:6px 9px;border-radius:999px;border:1px solid rgba(246,196,83,.55);background:rgba(246,196,83,.10);color:#fff3cf;font-size:10.5px;font-weight:1000}#digiyHomeLocDoor .digiyEntryCta{background:linear-gradient(135deg,#fff1bd,#f6c453,#22c55e);color:#06140f}';
    document.head.appendChild(style);

    var door=document.createElement('a');
    door.id='digiyHomeLocDoor';
    door.className='digiyEntryDoor pro digiyLocDoor';
    door.href='https://digiylyfe.com/demande-prestation.html#digiy-loc';
    door.setAttribute('data-digiy-loc-entry','1');
    door.innerHTML='<span class="digiyEntryKicker" data-loc-k></span><strong data-loc-t></strong><span class="digiyLocPrice">28 000 FCFA · 75 € / mois · dès 1–3 unités</span><p data-loc-p></p><span class="digiyEntryCta" data-loc-c></span>';
    grid.appendChild(door);

    function applyLang(){
      var l=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();
      var x=TEXT[l]||TEXT.fr;
      door.querySelector('[data-loc-k]').textContent=x.k;
      door.querySelector('[data-loc-t]').textContent=x.t;
      door.querySelector('[data-loc-p]').textContent=x.p;
      door.querySelector('[data-loc-c]').textContent=x.c;
      door.setAttribute('aria-label',x.t+' — '+x.c.replace(/\s*[→←]\s*$/,''));
    }
    applyLang();
    try{new MutationObserver(applyLang).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});}catch(_){}
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',installLocDoor,{once:true});
  else installLocDoor();

  window.dispatchEvent(new CustomEvent('digiy:maitre:favoris',{detail:policy}));
})();