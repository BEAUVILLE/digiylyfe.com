from pathlib import Path

# 1) MAITRE TERRITOIRE : rendu natif complet des portes
p=Path('assets/digiy-territoire-runtime-v1.js')
s=p.read_text(encoding='utf-8')
anchor="var FALLBACK=["
meta="""var NEED_META={
fr:{transport:'DRIVER · Chauffeurs & mobilité',artisan:'BUILD · Artisans & chantiers',accommodation:'LOC · Logements & locations',food:'RESTO · Restaurants & réservations',shopping:'MON COMMERCE · Boutiques & produits',beauty:'BEAUTÉ & BIEN-ÊTRE · Soins & rendez-vous',jobs:'JOBS · Emploi & missions',announcements:'BONNE AFFAIRE · Annonces & contact direct',guidance:'LA VOIX · ACTION PRO'},
en:{transport:'DRIVER · Drivers & mobility',artisan:'BUILD · Trades & worksites',accommodation:'LOC · Accommodation & rentals',food:'RESTO · Restaurants & bookings',shopping:'MON COMMERCE · Shops & products',beauty:'BEAUTY & WELLNESS · Care & appointments',jobs:'JOBS · Jobs & missions',announcements:'BONNE AFFAIRE · Listings & direct contact',guidance:'THE VOICE · ACTION PRO'},
es:{transport:'DRIVER · Conductores y movilidad',artisan:'BUILD · Artesanos y obras',accommodation:'LOC · Alojamientos y alquileres',food:'RESTO · Restaurantes y reservas',shopping:'MON COMMERCE · Tiendas y productos',beauty:'BELLEZA Y BIENESTAR · Cuidados y citas',jobs:'JOBS · Empleo y misiones',announcements:'BONNE AFFAIRE · Anuncios y contacto directo',guidance:'LA VOZ · ACTION PRO'},
pt:{transport:'DRIVER · Motoristas e mobilidade',artisan:'BUILD · Artesãos e obras',accommodation:'LOC · Alojamentos e alugueres',food:'RESTO · Restaurantes e reservas',shopping:'MON COMMERCE · Lojas e produtos',beauty:'BELEZA E BEM-ESTAR · Cuidados e marcações',jobs:'JOBS · Emprego e missões',announcements:'BONNE AFFAIRE · Anúncios e contacto direto',guidance:'A VOZ · ACTION PRO'},
de:{transport:'DRIVER · Fahrer & Mobilität',artisan:'BUILD · Handwerk & Baustellen',accommodation:'LOC · Unterkünfte & Vermietung',food:'RESTO · Restaurants & Reservierungen',shopping:'MON COMMERCE · Geschäfte & Produkte',beauty:'BEAUTY & WELLNESS · Pflege & Termine',jobs:'JOBS · Arbeit & Aufträge',announcements:'BONNE AFFAIRE · Anzeigen & Direktkontakt',guidance:'DIE STIMME · ACTION PRO'},
it:{transport:'DRIVER · Autisti e mobilità',artisan:'BUILD · Artigiani e cantieri',accommodation:'LOC · Alloggi e affitti',food:'RESTO · Ristoranti e prenotazioni',shopping:'MON COMMERCE · Negozi e prodotti',beauty:'BELLEZZA E BENESSERE · Trattamenti e appuntamenti',jobs:'JOBS · Lavoro e incarichi',announcements:'BONNE AFFAIRE · Annunci e contatto diretto',guidance:'LA VOCE · ACTION PRO'},
nl:{transport:'DRIVER · Chauffeurs & mobiliteit',artisan:'BUILD · Vakmensen & werken',accommodation:'LOC · Verblijf & verhuur',food:'RESTO · Restaurants & reservaties',shopping:'MON COMMERCE · Winkels & producten',beauty:'BEAUTY & WELLNESS · Verzorging & afspraken',jobs:'JOBS · Werk & opdrachten',announcements:'BONNE AFFAIRE · Advertenties & direct contact',guidance:'DE STEM · ACTION PRO'},
ar:{transport:'DRIVER · سائقون وتنقل',artisan:'BUILD · حرفيون وأشغال',accommodation:'LOC · سكن وإيجار',food:'RESTO · مطاعم وحجوزات',shopping:'MON COMMERCE · متاجر ومنتجات',beauty:'الجمال والعافية · عناية ومواعيد',jobs:'JOBS · وظائف ومهام',announcements:'BONNE AFFAIRE · إعلانات وتواصل مباشر',guidance:'الصوت · ACTION PRO'}
};

"""
if 'var NEED_META={' not in s:
    if anchor not in s: raise SystemExit('anchor runtime introuvable')
    s=s.replace(anchor,meta+anchor,1)
old="""function renderNeeds(){
  var root=document.getElementById('needs'),tr=T[lang];root.innerHTML='';
  NEEDS.forEach(function(n){var b=document.createElement('button');b.type='button';b.className='need'+(state.need===n[0]?' active':'');var ic=document.createElement('strong'),tx=document.createElement('span');ic.textContent=n[1];tx.textContent=tr.labels[n[0]]||n[0];b.append(ic,tx);b.addEventListener('click',function(){if(n[0]==='guidance'){location.href='https://pro-action-digiy.digiylyfe.com/';return}state.need=state.need===n[0]?'':n[0];syncUrl();renderNeeds();renderResults();revealResults()});root.appendChild(b)});
}
"""
new="""function renderNeeds(){
  var root=document.getElementById('needs'),tr=T[lang],meta=(NEED_META[lang]||NEED_META.fr);root.innerHTML='';
  NEEDS.forEach(function(n){
    var b=document.createElement('button');b.type='button';b.className='need'+(state.need===n[0]?' active':'');b.setAttribute('data-digiy-native-door','1');
    var ic=document.createElement('strong'),tx=document.createElement('span'),sm=document.createElement('small');
    ic.textContent=n[1];tx.textContent=tr.labels[n[0]]||n[0];sm.textContent=meta[n[0]]||'';
    b.append(ic,tx,sm);
    b.addEventListener('click',function(){if(n[0]==='guidance'){location.href='https://pro-action-digiy.digiylyfe.com/';return}state.need=state.need===n[0]?'':n[0];syncUrl();renderNeeds();renderResults();revealResults()});
    root.appendChild(b)
  });
}
"""
if old not in s: raise SystemExit('renderNeeds runtime inattendu')
s=s.replace(old,new,1)
p.write_text(s,encoding='utf-8')

# 2) Aiguillage MASTER actif : STANDARD + SPECIAL dans le même rail
p=Path('assets/digiy-territoire-public-module-doors-v2.js')
s=p.read_text(encoding='utf-8')
old="function wire(b,icon){if(!b||b.hasAttribute('data-digiy-public-module-door'))return;b.setAttribute('data-digiy-public-module-door',icon);b.addEventListener('click',function(e){if(isDordogne())return;e.preventDefault();e.stopImmediatePropagation();location.href=target(STANDARD[icon])},true)}"
new="function wire(b,icon,raw){if(!b||!raw||b.hasAttribute('data-digiy-public-module-door'))return;b.setAttribute('data-digiy-public-module-door',icon);b.addEventListener('click',function(e){if(isDordogne())return;e.preventDefault();e.stopImmediatePropagation();location.href=target(raw)},true)}"
if old not in s: raise SystemExit('wire master inattendu')
s=s.replace(old,new,1)
old2="function install(){var root=document.getElementById('needs');if(!root)return;Array.prototype.slice.call(root.querySelectorAll('button.need')).forEach(function(b){var s=b.querySelector('strong'),icon=s&&s.textContent.trim();if(STANDARD[icon])wire(b,icon)});wireResa(root)}"
new2="function install(){var root=document.getElementById('needs');if(!root)return;Array.prototype.slice.call(root.querySelectorAll('button.need')).forEach(function(b){var s=b.querySelector('strong'),icon=s&&s.textContent.trim(),raw=STANDARD[icon]||SPECIAL[icon];if(raw)wire(b,icon,raw)});wireResa(root)}"
if old2 not in s: raise SystemExit('install master inattendu')
s=s.replace(old2,new2,1)
p.write_text(s,encoding='utf-8')

# 3) Territoire : style natif + retrait rustine + PWA V4
p=Path('territoire.html')
s=p.read_text(encoding='utf-8')
oldcss='.need{min-height:100px;border-radius:20px;padding:14px;text-align:left}.need strong{display:block;font-size:26px}.need span{display:block;margin-top:8px;font-weight:950}.need.active{border-color:rgba(246,196,83,.72);background:rgba(246,196,83,.14)}'
newcss='.need{min-height:112px;border-radius:20px;padding:14px;text-align:left;display:flex;flex-direction:column;align-items:flex-start;border-color:rgba(94,234,212,.62);background:linear-gradient(145deg,rgba(94,234,212,.13),rgba(34,197,94,.10))}.need strong{display:block;font-size:26px;line-height:1}.need span{display:block;margin-top:8px;font-weight:950;line-height:1.15}.need small{display:block;margin-top:auto;padding-top:8px;color:rgba(255,250,240,.78);font-size:10px;line-height:1.3;font-weight:850}.need.active{border-color:rgba(246,196,83,.88);background:linear-gradient(145deg,rgba(246,196,83,.18),rgba(34,197,94,.13))}'
if oldcss not in s: raise SystemExit('CSS territoire inattendu')
s=s.replace(oldcss,newcss,1)
s=s.replace('@media(max-width:430px){.wrap{width:min(100% - 18px,1100px)}.need{min-height:86px;padding:12px}.need strong{font-size:22px}}','@media(max-width:430px){.wrap{width:min(100% - 18px,1100px)}.need{min-height:102px;padding:12px}.need strong{font-size:22px}}')
s=s.replace('html[dir="rtl"] body{text-align:right}html[dir="rtl"] .need{text-align:right}','html[dir="rtl"] body{text-align:right}html[dir="rtl"] .need{text-align:right;align-items:flex-end}')
s=s.replace('/assets/digiy-territoire-runtime-v1.js?v=20260827-live-i18n-v3','/assets/digiy-territoire-runtime-v1.js?v=20260830-native-doors-v1')
s=s.replace('/assets/digiy-territoire-public-module-doors-v2.js?v=20260829-master-unified-v1','/assets/digiy-territoire-public-module-doors-v2.js?v=20260830-master-native-v1')
for tag in [
 '<script src="/assets/digiy-territoire-commerce-door-v1.js?v=20260829-v1" defer></script>\n',
 '<script src="/assets/digiy-territoire-beauty-door-v1.js?v=20260829-v1" defer></script>\n',
 '<script src="/assets/digiy-territoire-jobs-door-v1.js?v=20260829-v1" defer></script>\n',
 '<script src="/assets/digiy-territoire-doors-style-v1.js?v=20260830-v3" defer></script>\n']:
    s=s.replace(tag,'')
s=s.replace('/sw.js?v=20260830-territory-unified-v3','/sw.js?v=20260830-territory-native-v4')
p.write_text(s,encoding='utf-8')

p=Path('sw.js')
s=p.read_text(encoding='utf-8')
s=s.replace('digiylyfe-pwa-20260830-territory-unified-v3','digiylyfe-pwa-20260830-territory-native-v4')
p.write_text(s,encoding='utf-8')
