(function(){
'use strict';
if(window.DIGIY_MIAMI_DOOR_V1)return;window.DIGIY_MIAMI_DOOR_V1=true;
const IMG='https://digiylyfe.net/wp-content/uploads/2026/09/ChatGPT-Image-11-sept.-2026-22_03_22.png';
const T={
fr:{country:'ÉTATS-UNIS',title:'DIGIY MIAMI',zones:'Miami · Floride · territoire ouvert',open:'OUVRIR LE TERRITOIRE'},
en:{country:'UNITED STATES',title:'DIGIY MIAMI',zones:'Miami · Florida · territory open',open:'OPEN THE TERRITORY'},
es:{country:'ESTADOS UNIDOS',title:'DIGIY MIAMI',zones:'Miami · Florida · territorio abierto',open:'ABRIR EL TERRITORIO'},
pt:{country:'ESTADOS UNIDOS',title:'DIGIY MIAMI',zones:'Miami · Flórida · território aberto',open:'ABRIR O TERRITÓRIO'},
it:{country:'STATI UNITI',title:'DIGIY MIAMI',zones:'Miami · Florida · territorio aperto',open:'APRI IL TERRITORIO'},
de:{country:'VEREINIGTE STAATEN',title:'DIGIY MIAMI',zones:'Miami · Florida · Gebiet geöffnet',open:'GEBIET ÖFFNEN'},
nl:{country:'VERENIGDE STATEN',title:'DIGIY MIAMI',zones:'Miami · Florida · gebied open',open:'OPEN HET GEBIED'},
ar:{country:'الولايات المتحدة',title:'DIGIY MIAMI',zones:'ميامي · فلوريدا · المنطقة مفتوحة',open:'افتح المنطقة'}
};
function lang(){const l=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();return T[l]?l:'fr'}
function ensure(){const grid=document.querySelector('.territoryGrid');if(!grid)return;let a=document.querySelector('[data-fav-id="territoire-miami"]');if(!a){a=document.createElement('a');a.className='territoryCard';a.dataset.favId='territoire-miami';a.innerHTML='<span class="territoryCountry">🇺🇸 <b data-miami-country></b></span><picture class="territoryPhoto"><img data-miami-photo alt="Miami · Florida" loading="lazy" decoding="async"></picture><strong data-miami-title></strong><small data-miami-zones></small><span class="territoryBtn" data-miami-open></span>';const bordeaux=grid.querySelector('[data-fav-id="territoire-bordeaux"]');if(bordeaux&&bordeaux.parentNode===grid)bordeaux.insertAdjacentElement('afterend',a);else grid.appendChild(a)}const l=lang(),t=T[l];a.href='/miami.html?lang='+l;a.querySelector('[data-miami-country]').textContent=t.country;a.querySelector('[data-miami-title]').textContent=t.title;a.querySelector('[data-miami-zones]').textContent=t.zones;a.querySelector('[data-miami-open]').textContent=t.open;a.querySelector('[data-miami-photo]').src=IMG}
ensure();new MutationObserver(ensure).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});document.querySelectorAll('[data-lang],[data-l]').forEach(b=>b.addEventListener('click',()=>setTimeout(ensure,0)));setTimeout(ensure,300);
})();