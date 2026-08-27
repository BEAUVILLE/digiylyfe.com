/* DIGIYLYFE TERRITOIRE RUNTIME V1
 * Géographie et besoins chargés depuis assets/digiy-core-runtime-v1.json.
 * Professionnels chargés depuis Supabase ; fallback local conservé en secours.
 */
(function(){
'use strict';

var SUPABASE_URL='https://wesqmwjjtsefyjnluosj.supabase.co';
var SUPABASE_ANON_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indlc3Ftd2pqdHNlZnlqbmx1b3NqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxNzg4ODIsImV4cCI6MjA4MDc1NDg4Mn0.dZfYOc2iL2_wRYL3zExZFsFSBK6AbMeOid2LrIjcTdA';
var RUNTIME_URL='/assets/digiy-core-runtime-v1.json';
var P=new URLSearchParams(location.search),territoryId=P.get('zone')||'';
var LANGS=['fr','en','es','pt','de','it','nl','ar'];
var requested=(P.get('lang')||'').slice(0,2).toLowerCase(),stored='';
try{stored=(localStorage.getItem('digiy-lang')||'').slice(0,2).toLowerCase()}catch(e){}
var lang=LANGS.indexOf(requested)>=0?requested:(LANGS.indexOf(stored)>=0?stored:'fr');

var TERRITORIES={};
var ZN={};
var NEEDS=[];
var runtimeDefault='';

var T={
fr:{tag:'Les professionnels du territoire, joignables directement.',path:'Territoire → Besoin → Zone → Professionnel → Contact direct',need:'Que recherchez-vous ?',zone:'Préciser la zone',all:'Tout le territoire',results:'professionnel(s) disponible(s)',empty:'Aucun professionnel ne correspond encore à ce filtre.',based:'Basé à',serves:'Intervient à',profile:'OUVRIR',whatsapp:'WhatsApp',call:'Appeler',sourceLive:'Données territoriales : Supabase',sourceFallback:'Mode secours local',configError:'Configuration territoriale indisponible.',labels:{transport:'Se déplacer',artisan:'Trouver un artisan',accommodation:'Dormir ou louer',food:'Manger ou réserver',shopping:'Acheter local',beauty:'Beauté & Bien-être',jobs:'Emploi et missions',announcements:'Annonces',guidance:'La Voix'}},
en:{tag:'Local professionals, reachable directly.',path:'Territory → Need → Area → Professional → Direct contact',need:'What are you looking for?',zone:'Choose an area',all:'Whole territory',results:'professional(s) available',empty:'No professional matches this filter yet.',based:'Based in',serves:'Serves',profile:'OPEN',whatsapp:'WhatsApp',call:'Call',sourceLive:'Territory data: Supabase',sourceFallback:'Local fallback mode',configError:'Territory configuration unavailable.',labels:{transport:'Get around',artisan:'Find a tradesperson',accommodation:'Stay or rent',food:'Eat or book',shopping:'Shop local',beauty:'Beauty & Wellness',jobs:'Jobs and gigs',announcements:'Listings',guidance:'The Voice'}},
es:{tag:'Profesionales del territorio, contactables directamente.',path:'Territorio → Necesidad → Zona → Profesional → Contacto directo',need:'¿Qué buscas?',zone:'Precisar la zona',all:'Todo el territorio',results:'profesional(es) disponible(s)',empty:'Ningún profesional coincide todavía con este filtro.',based:'Con base en',serves:'Interviene en',profile:'ABRIR',whatsapp:'WhatsApp',call:'Llamar',sourceLive:'Datos territoriales: Supabase',sourceFallback:'Modo local de respaldo',configError:'Configuración territorial no disponible.',labels:{transport:'Desplazarse',artisan:'Encontrar un artesano',accommodation:'Alojarse o alquilar',food:'Comer o reservar',shopping:'Comprar local',beauty:'Belleza y bienestar',jobs:'Empleo y misiones',announcements:'Anuncios',guidance:'La Voz'}},
pt:{tag:'Profissionais do território, contactáveis diretamente.',path:'Território → Necessidade → Zona → Profissional → Contacto direto',need:'O que procura?',zone:'Precisar a zona',all:'Todo o território',results:'profissional(is) disponível(is)',empty:'Ainda não há profissional correspondente a este filtro.',based:'Baseado em',serves:'Atua em',profile:'ABRIR',whatsapp:'WhatsApp',call:'Ligar',sourceLive:'Dados territoriais: Supabase',sourceFallback:'Modo local de recurso',configError:'Configuração territorial indisponível.',labels:{transport:'Deslocar-se',artisan:'Encontrar um artesão',accommodation:'Dormir ou alugar',food:'Comer ou reservar',shopping:'Comprar local',beauty:'Beleza e bem-estar',jobs:'Emprego e missões',announcements:'Anúncios',guidance:'A Voz'}},
de:{tag:'Professionelle aus der Region, direkt erreichbar.',path:'Gebiet → Bedarf → Zone → Profi → Direkter Kontakt',need:'Was suchen Sie?',zone:'Gebiet auswählen',all:'Gesamte Region',results:'Profi(s) verfügbar',empty:'Für diesen Filter ist noch kein Profi verfügbar.',based:'Ansässig in',serves:'Tätig in',profile:'ÖFFNEN',whatsapp:'WhatsApp',call:'Anrufen',sourceLive:'Gebietsdaten: Supabase',sourceFallback:'Lokaler Ersatzmodus',configError:'Gebietskonfiguration nicht verfügbar.',labels:{transport:'Unterwegs sein',artisan:'Handwerker finden',accommodation:'Übernachten oder mieten',food:'Essen oder reservieren',shopping:'Lokal einkaufen',beauty:'Schönheit & Wellness',jobs:'Jobs und Aufträge',announcements:'Anzeigen',guidance:'Die Stimme'}},
it:{tag:'Professionisti del territorio, contattabili direttamente.',path:'Territorio → Bisogno → Zona → Professionista → Contatto diretto',need:'Cosa cerchi?',zone:'Scegli la zona',all:'Tutto il territorio',results:'professionista/i disponibile/i',empty:'Nessun professionista corrisponde ancora a questo filtro.',based:'Con sede a',serves:'Opera a',profile:'APRI',whatsapp:'WhatsApp',call:'Chiama',sourceLive:'Dati territoriali: Supabase',sourceFallback:'Modalità locale di riserva',configError:'Configurazione territoriale non disponibile.',labels:{transport:'Spostarsi',artisan:'Trovare un artigiano',accommodation:'Dormire o affittare',food:'Mangiare o prenotare',shopping:'Comprare locale',beauty:'Bellezza e benessere',jobs:'Lavoro e incarichi',announcements:'Annunci',guidance:'La Voce'}},
nl:{tag:'Professionals uit de regio, rechtstreeks bereikbaar.',path:'Gebied → Behoefte → Zone → Professional → Direct contact',need:'Wat zoekt u?',zone:'Kies de zone',all:'Hele gebied',results:'professional(s) beschikbaar',empty:'Nog geen professional voor dit filter.',based:'Gevestigd in',serves:'Actief in',profile:'OPENEN',whatsapp:'WhatsApp',call:'Bellen',sourceLive:'Gebiedsgegevens: Supabase',sourceFallback:'Lokale reservemodus',configError:'Gebiedsconfiguratie niet beschikbaar.',labels:{transport:'Verplaatsen',artisan:'Een vakman vinden',accommodation:'Overnachten of huren',food:'Eten of reserveren',shopping:'Lokaal kopen',beauty:'Schoonheid & welzijn',jobs:'Werk en opdrachten',announcements:'Advertenties',guidance:'De Stem'}},
ar:{tag:'مهنيون من المنطقة يمكن التواصل معهم مباشرة.',path:'المنطقة ← الحاجة ← النطاق ← المهني ← تواصل مباشر',need:'ما الذي تبحث عنه؟',zone:'حدد المنطقة',all:'كل المنطقة',results:'مهني متاح',empty:'لا يوجد مهني مطابق لهذا الاختيار بعد.',based:'مقره في',serves:'يعمل في',profile:'فتح',whatsapp:'واتساب',call:'اتصال',sourceLive:'بيانات المنطقة: Supabase',sourceFallback:'وضع احتياطي محلي',configError:'إعدادات المنطقة غير متاحة.',labels:{transport:'التنقل',artisan:'العثور على حرفي',accommodation:'الإقامة أو الاستئجار',food:'الأكل أو الحجز',shopping:'الشراء محلياً',beauty:'الجمال والعافية',jobs:'وظائف ومهام',announcements:'إعلانات',guidance:'الصوت'}}
};

var FALLBACK=[
{id:'baptiste-driver',territoryId:'petite-cote',name:'Chauffeur Baptiste',need:'transport',mainZone:'saly',zones:['aibd','saly','mbour'],services:['Chauffeur ambassadeur','Transport sur réservation'],url:'https://digiy-driver-part-bapt.digiylyfe.com/'},
{id:'lamine',territoryId:'petite-cote',name:'Lamine — Chauffeur privé',need:'transport',mainZone:'saly',zones:['aibd','saly','mbour'],services:['Transfert AIBD','Courses locales'],url:'https://partenaire-lamine.digiylyfe.com/'},
{id:'nazir',territoryId:'petite-cote',name:'Nazir Driver',need:'transport',mainZone:'saly',zones:['aibd','saly','mbour'],services:['Transferts AIBD','Déplacements régionaux'],url:'https://galerie-chauffeurs.digiylyfe.com/nazir-driver.html'},
{id:'astou',territoryId:'petite-cote',name:'Astou Boutique',need:'shopping',mainZone:'saly',zones:['saly'],services:['Boutique','Articles maison'],url:'https://astou-boutique.digiylyfe.com/'},
{id:'fg-nails',territoryId:'petite-cote',name:'FG NAILS',need:'beauty',mainZone:'saly',zones:['saly'],services:['Beauté','Onglerie','Soins','Bien-être'],url:'https://f-g-nails.digiylyfe.com/'},
{id:'bcheikh',territoryId:'petite-cote',name:'BCHEIKH — Vêtements à Saly',need:'shopping',mainZone:'saly',zones:['saly'],services:['Mode','Vêtements'],url:'https://bcheikh.digiylyfe.com/'},
{id:'babacar',territoryId:'petite-cote',name:'Babacar Plombier Pro',need:'artisan',mainZone:'mbour',zones:['mbour','saly','ngaparou'],services:['Plomberie','Dépannage'],url:'https://babacar-plombier-pro.digiylyfe.com/'},
{id:'helage',territoryId:'petite-cote',name:'Helage Plombier',need:'artisan',mainZone:'saly',zones:['saly'],services:['Plomberie'],url:'https://helage-plombier.digiylyfe.com/'},
{id:'kourant',territoryId:'petite-cote',name:'Kourant Électricien',need:'artisan',mainZone:'saly',zones:['saly'],services:['Électricité'],url:'https://kourant.digiylyfe.com/'},
{id:'mbaye',territoryId:'petite-cote',name:'Mbaye Maçon',need:'artisan',mainZone:'saly',zones:['saly','mbour'],services:['Maçonnerie','Construction'],url:'https://mbaye-macon.digiylyfe.com/'},
{id:'baptiste-saly',territoryId:'petite-cote',name:'Chez Baptiste — Saly',need:'accommodation',mainZone:'saly',zones:['saly'],services:['Appartement meublé','Location directe'],url:'https://part-chez-baptiste.digiylyfe.com/'},
{id:'baptiste-sarlat',territoryId:'vallee-dordogne',name:'Chez Baptiste — Sarlat',need:'accommodation',mainZone:'sarlat',zones:['sarlat'],services:['Chambre privée','Demande directe'],url:'https://sarlat-chez-baptiste.digiylyfe.com/'},
{id:'entre2',territoryId:'vallee-dordogne',name:'L’Entre Deux',need:'food',mainZone:'sarlat',zones:['sarlat'],services:['Restaurant','Réservation directe'],url:'https://malraux-entre2.digiylyfe.com/'},
{id:'malraux',territoryId:'vallee-dordogne',name:'Le Malraux',need:'food',mainZone:'sarlat',zones:['sarlat'],services:['Restaurant','Réservation directe'],url:'https://malraux-entre2.digiylyfe.com/'}
];

var state={need:P.get('need')||'',zone:P.get('local')||'all',pros:FALLBACK.slice(),live:false};

function label(obj){return obj&&typeof obj==='object'?(obj[lang]||obj.fr||''):String(obj||'')}
function current(){return TERRITORIES[territoryId]||null}
function zoneName(z){if(TERRITORIES[z])return label(TERRITORIES[z].name);return ZN[z]||String(z||'').replace(/-/g,' ')}
function phoneDigits(v){return String(v||'').replace(/\D/g,'')}
function territoryIdsOf(p){return Array.isArray(p.territoryIds)?p.territoryIds:(p.territoryId?[p.territoryId]:[])}

function loadRuntime(){
  return fetch(RUNTIME_URL,{cache:'no-store'}).then(function(r){if(!r.ok)throw new Error('runtime '+r.status);return r.json()}).then(function(doc){
    runtimeDefault=doc.default_territory||'';
    TERRITORIES={};ZN={};NEEDS=[];
    (doc.countries||[]).filter(function(c){return c.status==='active'}).forEach(function(c){
      (c.territories||[]).filter(function(t){return t.status==='active'}).forEach(function(t){
        var activeZones=(t.zones||[]).filter(function(z){return z.status==='active'});
        TERRITORIES[t.slug]={id:t.id,countryId:c.id,country:c.labels||{fr:c.slug},name:t.labels||{fr:t.slug},zones:activeZones.map(function(z){return z.slug}),directDoor:t.direct_door||null};
        activeZones.forEach(function(z){ZN[z.slug]=z.label||z.slug});
      });
    });
    NEEDS=(doc.needs||[]).filter(function(n){return n.status==='core'}).map(function(n){return[n.id,n.icon||'•']});
    if(!Object.keys(TERRITORIES).length||!NEEDS.length)throw new Error('runtime vide');
  });
}

function getNeed(slug,category){
  var m={chauffeur:'transport',plombier:'artisan',electricien:'artisan',macon:'artisan',solaire:'artisan',logement:'accommodation','market-produits':'shopping',beaute:'beauty','soins-beaute':'beauty',onglerie:'beauty',coiffeur:'beauty',massage:'beauty',restaurant:'food',restauration:'food',jobs:'jobs',annonces:'announcements'};
  if(m[slug])return m[slug];
  var c={transport:'transport',artisan:'artisan',location:'accommodation',logement:'accommodation',hebergement:'accommodation',market:'shopping',commerce:'shopping',shopping:'shopping',beaute:'beauty',beauty:'beauty',restauration:'food',emploi:'jobs',annonces:'announcements'};
  return c[category]||'';
}

function territoriesFor(main,zones){
  var hits=[],zs=Array.isArray(zones)?zones:[];
  Object.keys(TERRITORIES).forEach(function(slug){
    var t=TERRITORIES[slug],direct=t.zones.indexOf(main)>=0,explicit=zs.some(function(z){return t.zones.indexOf(z)>=0}),whole=zs.indexOf(slug)>=0;
    if(direct||explicit||whole)hits.push(slug);
  });
  return hits;
}

function api(table,params){
  return fetch(SUPABASE_URL+'/rest/v1/'+table+'?'+params.toString(),{cache:'no-store',headers:{apikey:SUPABASE_ANON_KEY,Authorization:'Bearer '+SUPABASE_ANON_KEY,Accept:'application/json'}}).then(function(r){if(!r.ok)throw new Error(table+' '+r.status);return r.json()});
}

function loadLive(){
  var q1=new URLSearchParams({select:'id,display_name,activity_label,short_description,metier_id,zone_id,category,public_url,whatsapp_public,phone_public,rank_weight',entry_type:'eq.professional',is_public:'eq.true',is_active:'eq.true',order:'rank_weight.asc,display_name.asc'});
  var q2=new URLSearchParams({select:'id,slug,label',is_active:'eq.true'});
  var q3=new URLSearchParams({select:'id,slug,label',is_active:'eq.true'});
  var q4=new URLSearchParams({select:'card_id,zone_id'});
  return Promise.all([api('digiy_annuaire_public',q1),api('digiy_metiers',q2),api('digiy_zones',q3),api('digiy_annuaire_public_zones',q4)]).then(function(d){
    var met={},zid={},links={};
    d[1].forEach(function(x){met[x.id]=x});
    d[2].forEach(function(x){zid[x.id]=x});
    d[3].forEach(function(x){if(!zid[x.zone_id])return;(links[x.card_id]||(links[x.card_id]=[])).push(zid[x.zone_id].slug)});
    var out=d[0].map(function(c){
      var mz=zid[c.zone_id]?zid[c.zone_id].slug:'',zs=(links[c.id]||[]).slice();
      if(mz&&zs.indexOf(mz)<0)zs.unshift(mz);
      var ms=met[c.metier_id]||{},need=getNeed(ms.slug,c.category),services=String(c.activity_label||ms.label||'').split(/\s*[·•]\s*/).filter(Boolean),contacts=[];
      if(c.public_url)contacts.push({kind:'profile',url:c.public_url});
      var wd=phoneDigits(c.whatsapp_public);if(wd)contacts.push({kind:'whatsapp',phone:wd});
      var pd=phoneDigits(c.phone_public);if(pd)contacts.push({kind:'call',phone:pd});
      return{id:'sql-'+c.id,territoryIds:territoriesFor(mz,zs),name:c.display_name,need:need,mainZone:mz||zs[0]||'',zones:zs,services:services,summary:c.short_description||c.activity_label||ms.label||'',contacts:contacts,rank:Number(c.rank_weight)||50};
    }).filter(function(x){return x.need&&x.territoryIds.length});
    if(!out.length)throw new Error('empty');
    state.pros=out;state.live=true;
  });
}

function syncUrl(){
  if(!history.replaceState)return;
  var u=new URL(location.href);u.searchParams.set('zone',territoryId);
  if(state.need)u.searchParams.set('need',state.need);else u.searchParams.delete('need');
  if(state.zone!=='all')u.searchParams.set('local',state.zone);else u.searchParams.delete('local');
  u.searchParams.set('lang',lang);history.replaceState({},'',u.pathname+u.search);
}

function revealResults(){
  var section=document.getElementById('resultsSection');if(!section)return;
  var reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  requestAnimationFrame(function(){section.scrollIntoView({behavior:reduced?'auto':'smooth',block:'start'});var first=document.querySelector('#results .card');if(first){first.setAttribute('tabindex','-1');setTimeout(function(){try{first.focus({preventScroll:true})}catch(e){}},350)}});
}

function renderHeader(){
  var c=current(),tr=T[lang];if(!c)return;
  document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';
  document.title='DIGIY '+label(c.name)+' | DIGIYLYFE';
  document.getElementById('country').textContent=label(c.country);
  document.getElementById('territoryName').textContent='DIGIY '+label(c.name).toUpperCase();
  document.getElementById('tagline').textContent=tr.tag;document.getElementById('path').textContent=tr.path;
  document.getElementById('needTitle').textContent=tr.need;document.getElementById('zoneTitle').textContent=tr.zone;
  var door=document.getElementById('sarlatDoor'),doorLink=door.querySelector('a');
  if(c.directDoor&&c.directDoor.url){doorLink.href=c.directDoor.url;doorLink.textContent=(territoryId==='dakar'&&lang==='pt')?'DAKAR EM DIRETO →':(c.directDoor.label||'OUVRIR →');door.classList.add('show')}else door.classList.remove('show');
  document.querySelectorAll('[data-lang]').forEach(function(b){b.classList.toggle('active',b.dataset.lang===lang)});
  document.getElementById('source').textContent=state.live?tr.sourceLive:tr.sourceFallback;
}

function renderNeeds(){
  var root=document.getElementById('needs'),tr=T[lang];root.innerHTML='';
  NEEDS.forEach(function(n){var b=document.createElement('button');b.type='button';b.className='need'+(state.need===n[0]?' active':'');var ic=document.createElement('strong'),tx=document.createElement('span');ic.textContent=n[1];tx.textContent=tr.labels[n[0]]||n[0];b.append(ic,tx);b.addEventListener('click',function(){if(n[0]==='guidance'){location.href='https://pro-action-digiy.digiylyfe.com/';return}state.need=state.need===n[0]?'':n[0];syncUrl();renderNeeds();renderResults();revealResults()});root.appendChild(b)});
}

function renderZones(){
  var root=document.getElementById('zones'),tr=T[lang],c=current(),zones=['all'].concat(c?c.zones:[]);root.innerHTML='';
  zones.forEach(function(z){var b=document.createElement('button');b.type='button';b.className='chip'+(state.zone===z?' active':'');b.textContent=z==='all'?tr.all:zoneName(z);b.addEventListener('click',function(){state.zone=z;syncUrl();renderZones();renderResults();revealResults()});root.appendChild(b)});
}

function matches(p){
  if(territoryIdsOf(p).indexOf(territoryId)<0)return false;
  if(state.need&&p.need!==state.need)return false;
  if(state.zone==='all')return true;
  if(p.mainZone===state.zone||(p.zones||[]).indexOf(state.zone)>=0)return true;
  return (p.zones||[]).indexOf(territoryId)>=0;
}

function whatsappMessage(name){var M={fr:'Bonjour {name}, je viens de DIGIYLYFE.',en:'Hello {name}, I found you on DIGIYLYFE.',es:'Hola {name}, le encontré en DIGIYLYFE.',pt:'Olá {name}, encontrei-o na DIGIYLYFE.',de:'Hallo {name}, ich habe Sie auf DIGIYLYFE gefunden.',it:'Buongiorno {name}, l’ho trovata su DIGIYLYFE.',nl:'Hallo {name}, ik heb u gevonden via DIGIYLYFE.',ar:'مرحباً {name}، وجدتك عبر DIGIYLYFE.'};return(M[lang]||M.fr).replace('{name}',name||'');}
function contactsOf(p){if(p.contacts&&p.contacts.length)return p.contacts.map(function(c){if(c.kind==='profile')return{label:T[lang].profile,url:c.url};if(c.kind==='whatsapp')return{label:T[lang].whatsapp,url:'https://wa.me/'+c.phone+'?text='+encodeURIComponent(whatsappMessage(p.name))};if(c.kind==='call')return{label:T[lang].call,url:'tel:+'+c.phone};return{label:c.label||T[lang].profile,url:c.url||'#'}});return p.url?[{label:T[lang].profile,url:p.url}]:[]}

function renderResults(){
  var root=document.getElementById('results'),tr=T[lang],list=state.pros.filter(matches).sort(function(a,b){return(a.rank||50)-(b.rank||50)||a.name.localeCompare(b.name)});
  document.getElementById('status').textContent=list.length+' '+tr.results;root.innerHTML='';
  if(!list.length){var e=document.createElement('div');e.className='empty';e.textContent=tr.empty;root.appendChild(e);return}
  list.forEach(function(p){var c=document.createElement('article');c.className='card';var h=document.createElement('h3');h.textContent=p.name;var s=document.createElement('p');s.className='summary';s.textContent=label(p.summary)||((p.services||[]).join(' · '));var m=document.createElement('div');m.className='meta';m.textContent='📍 '+tr.based+' '+zoneName(p.mainZone)+'\n🚐 '+tr.serves+' '+((p.zones||[]).map(zoneName).join(' · ')||tr.all);m.style.whiteSpace='pre-line';var sv=document.createElement('div');sv.className='services';(p.services||[]).forEach(function(x){var sp=document.createElement('span');sp.className='service';sp.textContent=x;sv.appendChild(sp)});var ac=document.createElement('div');ac.className='actions';contactsOf(p).forEach(function(x){var a=document.createElement('a');a.href=x.url;a.textContent=x.label||tr.profile;if(/^https?:/.test(x.url)){a.target='_blank';a.rel='noopener noreferrer'}ac.appendChild(a)});c.append(h,s,m,sv,ac);root.appendChild(c)});
}

function render(){renderHeader();renderNeeds();renderZones();renderResults()}

function showRuntimeError(){
  var tr=T[lang]||T.fr;document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';
  document.getElementById('country').textContent='DIGIYLYFE';document.getElementById('territoryName').textContent='CORE';document.getElementById('tagline').textContent=tr.configError;
  document.getElementById('needTitle').textContent='';document.getElementById('zoneTitle').textContent='';document.getElementById('needs').innerHTML='';document.getElementById('zones').innerHTML='';document.getElementById('status').textContent='';document.getElementById('results').innerHTML='<div class="empty">'+tr.configError+'</div>';document.getElementById('source').textContent='CORE runtime: fail closed';
}

document.querySelectorAll('[data-lang]').forEach(function(b){b.addEventListener('click',function(){lang=b.dataset.lang;try{localStorage.setItem('digiy-lang',lang)}catch(e){}syncUrl();render()})});

loadRuntime().then(function(){
  if(!territoryId||!TERRITORIES[territoryId])territoryId=TERRITORIES[runtimeDefault]?runtimeDefault:Object.keys(TERRITORIES)[0];
  var c=current();if(!c)throw new Error('territoire absent');
  if(state.zone!=='all'&&c.zones.indexOf(state.zone)<0)state.zone='all';
  if(state.need&&!NEEDS.some(function(n){return n[0]===state.need}))state.need='';
  syncUrl();render();
  return loadLive().then(render).catch(function(){state.live=false;render()});
}).catch(showRuntimeError);

})();
