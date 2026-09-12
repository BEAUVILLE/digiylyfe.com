(function(){
'use strict';
if(window.DIGIY_USA_WORLD_COPY_V1)return;window.DIGIY_USA_WORLD_COPY_V1=true;
const T={
fr:{intro:'Six portes réelles montrent aujourd’hui l’ouverture de DIGIYLYFE : Sénégal · Petite Côte et Dakar ; France · Vallée de la Dordogne, Bordeaux et Paris ; États-Unis · Miami. Choisissez votre territoire, puis votre besoin et votre zone.',global:'Sénégal et France actifs · Miami ouvre les États-Unis. Le monde suit progressivement.',zones:'3 TERRITOIRES ACTIFS · Vallée de la Dordogne · Bordeaux · Paris',paris:'Paris · Île-de-France · territoire ouvert'},
en:{intro:'Six real doors now show DIGIYLYFE’s reach: Senegal · Petite Côte and Dakar; France · Dordogne Valley, Bordeaux and Paris; United States · Miami. Choose your territory, then your need and local area.',global:'Senegal and France are active · Miami opens the United States. The world follows progressively.',zones:'3 ACTIVE TERRITORIES · Dordogne Valley · Bordeaux · Paris',paris:'Paris · Île-de-France · open territory'},
es:{intro:'Seis puertas reales muestran hoy la apertura de DIGIYLYFE: Senegal · Petite Côte y Dakar; Francia · Valle del Dordoña, Burdeos y París; Estados Unidos · Miami. Elija su territorio, después su necesidad y su zona.',global:'Senegal y Francia están activos · Miami abre Estados Unidos. El mundo sigue progresivamente.',zones:'3 TERRITORIOS ACTIVOS · Valle del Dordoña · Burdeos · París',paris:'París · Île-de-France · territorio abierto'},
pt:{intro:'Seis portas reais mostram hoje a abertura da DIGIYLYFE: Senegal · Petite Côte e Dakar; França · Vale da Dordogne, Bordéus e Paris; Estados Unidos · Miami. Escolha o território, depois a necessidade e a zona.',global:'Senegal e França estão ativos · Miami abre os Estados Unidos. O mundo segue progressivamente.',zones:'3 TERRITÓRIOS ATIVOS · Vale da Dordogne · Bordéus · Paris',paris:'Paris · Île-de-France · território aberto'},
it:{intro:'Sei porte reali mostrano oggi l’apertura di DIGIYLYFE: Senegal · Petite Côte e Dakar; Francia · Valle della Dordogna, Bordeaux e Parigi; Stati Uniti · Miami. Scegli il territorio, poi il bisogno e la zona.',global:'Senegal e Francia sono attivi · Miami apre gli Stati Uniti. Il mondo segue progressivamente.',zones:'3 TERRITORI ATTIVI · Valle della Dordogna · Bordeaux · Parigi',paris:'Parigi · Île-de-France · territorio aperto'},
de:{intro:'Sechs reale Türen zeigen heute die Reichweite von DIGIYLYFE: Senegal · Petite Côte und Dakar; Frankreich · Dordogne-Tal, Bordeaux und Paris; Vereinigte Staaten · Miami. Wählen Sie Ihr Gebiet, dann Bedarf und Zone.',global:'Senegal und Frankreich sind aktiv · Miami öffnet die Vereinigten Staaten. Die Welt folgt schrittweise.',zones:'3 AKTIVE GEBIETE · Dordogne-Tal · Bordeaux · Paris',paris:'Paris · Île-de-France · offenes Gebiet'},
nl:{intro:'Zes echte ingangen tonen vandaag de uitbreiding van DIGIYLYFE: Senegal · Petite Côte en Dakar; Frankrijk · Dordognevallei, Bordeaux en Parijs; Verenigde Staten · Miami. Kies uw gebied, daarna uw behoefte en zone.',global:'Senegal en Frankrijk zijn actief · Miami opent de Verenigde Staten. De wereld volgt stap voor stap.',zones:'3 ACTIEVE GEBIEDEN · Dordognevallei · Bordeaux · Parijs',paris:'Parijs · Île-de-France · open gebied'},
ar:{intro:'تُظهر ست بوابات حقيقية اليوم توسع DIGIYLYFE: السنغال · Petite Côte وداكار؛ فرنسا · وادي دوردوني وبوردو وباريس؛ الولايات المتحدة · ميامي. اختر الإقليم ثم حاجتك والمنطقة المحلية.',global:'السنغال وفرنسا نشطتان · ميامي تفتح الولايات المتحدة. ويتوسع العالم تدريجيًا.',zones:'3 مناطق نشطة · وادي دوردوني · بوردو · باريس',paris:'باريس · إيل دو فرانس · منطقة مفتوحة'}
};
function lang(){const l=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();return T[l]?l:'fr'}
function ensureParis(){
  const grid=document.querySelector('.territoryGrid');if(!grid)return null;
  let card=grid.querySelector('[data-fav-id="territoire-paris"]');
  if(!card){
    card=document.createElement('a');
    card.className='territoryCard';
    card.href='https://digiylyfe.com/paris.html';
    card.setAttribute('data-fav-id','territoire-paris');
    card.innerHTML='<span class="territoryCountry">🇫🇷 <b data-paris-country>FRANCE</b></span><picture class="territoryPhoto territoryPhotoFrance"><img src="https://digiylyfe.net/wp-content/uploads/2026/09/Image-12-09-2026-a-06.40.jpeg" alt="Paris · Île-de-France" loading="lazy" decoding="async"/></picture><strong>DIGIY PARIS</strong><small data-paris-zones>Paris · Île-de-France · territoire ouvert</small><span class="territoryBtn" data-paris-open>OUVRIR LE TERRITOIRE</span>';
    const france=grid.querySelector('#franceVitrineCartouche');
    if(france)grid.insertBefore(card,france);else grid.appendChild(card);
  }
  return card;
}
function ensureParisMiniMap(){
  const svg=document.querySelector('#franceVitrineCartouche .franceVitrineMap svg');if(!svg||svg.querySelector('[data-digiy-paris-mini]'))return;
  const ns='http://www.w3.org/2000/svg';
  const g=document.createElementNS(ns,'g');g.setAttribute('data-digiy-paris-mini','1');
  const halo=document.createElementNS(ns,'circle');halo.setAttribute('cx','214');halo.setAttribute('cy','83');halo.setAttribute('r','16');halo.setAttribute('fill','rgba(246,196,83,.16)');halo.setAttribute('stroke','rgba(246,196,83,.55)');
  const pin=document.createElementNS(ns,'circle');pin.setAttribute('cx','214');pin.setAttribute('cy','83');pin.setAttribute('r','7');pin.setAttribute('fill','#f6c453');pin.setAttribute('stroke','#fff1bd');pin.setAttribute('stroke-width','2');
  const text=document.createElementNS(ns,'text');text.setAttribute('x','228');text.setAttribute('y','87');text.setAttribute('fill','#ffe897');text.setAttribute('font-size','15');text.setAttribute('font-weight','1000');text.textContent='Paris';
  g.appendChild(halo);g.appendChild(pin);g.appendChild(text);svg.appendChild(g);
}
function apply(){
  const t=T[lang()];
  const intro=document.querySelector('[data-i18n="worldIntro"]');
  const global=document.querySelector('[data-i18n="globalLead"]');
  if(intro)intro.textContent=t.intro;if(global)global.textContent=t.global;
  const card=ensureParis();
  const countrySource=document.querySelector('a[data-fav-id="territoire-bordeaux"] .territoryCountry b');
  const openSource=document.querySelector('a[data-fav-id="territoire-bordeaux"] .territoryBtn');
  if(card){
    const c=card.querySelector('[data-paris-country]'),z=card.querySelector('[data-paris-zones]'),o=card.querySelector('[data-paris-open]');
    if(c)c.textContent=countrySource?countrySource.textContent:'FRANCE';
    if(z)z.textContent=t.paris;
    if(o)o.textContent=openSource?openSource.textContent:'OUVRIR LE TERRITOIRE';
  }
  const zones=document.querySelector('#franceVitrineCartouche [data-i18n="franceZones"]');if(zones)zones.textContent=t.zones;
  const cities=document.querySelector('#franceVitrineCartouche .franceVitrineCities');
  if(cities&&!cities.querySelector('[data-digiy-paris-chip]')){const s=document.createElement('span');s.setAttribute('data-digiy-paris-chip','1');s.textContent=lang()==='es'?'París':lang()==='it'?'Parigi':lang()==='nl'?'Parijs':lang()==='ar'?'باريس':'Paris';cities.prepend(s);}
  if(cities){const s=cities.querySelector('[data-digiy-paris-chip]');if(s)s.textContent=lang()==='es'?'París':lang()==='it'?'Parigi':lang()==='nl'?'Parijs':lang()==='ar'?'باريس':'Paris';}
  ensureParisMiniMap();
}
apply();setTimeout(apply,50);setTimeout(apply,350);setTimeout(apply,1000);
try{new MutationObserver(apply).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});}catch(_){ }
document.addEventListener('click',function(e){if(e.target&&e.target.closest&&e.target.closest('[data-lang],[data-l]'))setTimeout(apply,0)},false);
})();
