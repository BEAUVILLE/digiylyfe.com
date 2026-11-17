(function(){'use strict';
var R=document.getElementById('digiy-master-root');if(!R)return;
var P=new URLSearchParams(location.search),module=P.get('module')||'',territory=P.get('territory')||'',local=P.get('local')||'',lang=(P.get('lang')||'fr').slice(0,2).toLowerCase();
var LANGS=['fr','en','es','pt','de','it','nl','ar','wo','zh'];if(LANGS.indexOf(lang)<0)lang='fr';
var META={
 'petite-cote':{country:'SÉNÉGAL',flag:'🇸🇳',zone:'PETITE CÔTE',price:'12 000 FCFA / mois',loc:'À partir de 28 000 FCFA / mois'},
 'dakar':{country:'SÉNÉGAL',flag:'🇸🇳',zone:'DAKAR',price:'12 000 FCFA / mois',loc:'À partir de 28 000 FCFA / mois'},
 'vallee-dordogne':{country:'FRANCE',flag:'🇫🇷',zone:'VALLÉE DE LA DORDOGNE',price:'450 €/an ou 45 €/mois · fiche 250 € séparée',loc:'DIGIY LOC · dès 75 €/mois · offre séparée'},
 'bordeaux':{country:'FRANCE',flag:'🇫🇷',zone:'BORDEAUX',price:'450 €/an ou 45 €/mois · fiche 250 € séparée',loc:'DIGIY LOC · dès 75 €/mois · offre séparée'},
 'casablanca':{country:'MAROC',flag:'🇲🇦',zone:'CASABLANCA',price:'CARTE DIGIY · 250 MAD · paiement unique',loc:'DIGIY LOC · offre métier séparée'},
 'marrakech':{country:'MAROC',flag:'🇲🇦',zone:'MARRAKECH',price:'CARTE DIGIY · 250 MAD · paiement unique',loc:'DIGIY LOC · offre métier séparée'},
 'miami':{country:'USA',flag:'🇺🇸',zone:'MIAMI · FLORIDA',price:'DIGIY CARD · $20 · one-time payment',loc:'DIGIY LOC · à partir de $790 / an'}
};
var T={
 "fr": {
  "back": "← RETOUR AU TERRITOIRE",
  "real": "PRÉSENCES RÉELLES",
  "none": "Aucun adhérent réel rattaché à cette zone pour le moment.",
  "open": "PLACES À PRENDRE",
  "member": "ADHÉRENT DIGIYLYFE",
  "place": "PLACE À PRENDRE",
  "view": "OUVRIR →",
  "take": "PRENDRE MA PLACE →",
  "country": "PAYS",
  "zone": "ZONE",
  "sector": "SECTEUR",
  "lead": "Uniquement les adhérents réellement rattachés à ce pays et à cette zone.",
  "openLead": "Ces cartes représentent des activités ouvertes, jamais de faux professionnel.",
  "zero": "0 % commission · contact direct"
 },
 "en": {
  "back": "← BACK TO TERRITORY",
  "real": "REAL PRESENCES",
  "none": "No real member is attached to this zone yet.",
  "open": "PLACES AVAILABLE",
  "member": "DIGIYLYFE MEMBER",
  "place": "PLACE AVAILABLE",
  "view": "OPEN →",
  "take": "TAKE MY PLACE →",
  "country": "COUNTRY",
  "zone": "ZONE",
  "sector": "AREA",
  "lead": "Only members actually attached to this country and zone.",
  "openLead": "These cards represent open activities, never fake professionals.",
  "zero": "0% commission · direct contact"
 },
 "es": {
  "back": "← VOLVER AL TERRITORIO",
  "real": "PRESENCIAS REALES",
  "none": "Todavía no hay adherente real en esta zona.",
  "open": "LUGARES DISPONIBLES",
  "member": "ADHERENTE DIGIYLYFE",
  "place": "LUGAR DISPONIBLE",
  "view": "ABRIR →",
  "take": "OCUPAR MI LUGAR →",
  "country": "PAÍS",
  "zone": "ZONA",
  "sector": "SECTOR",
  "lead": "Solo adherentes realmente vinculados a este país y zona.",
  "openLead": "Estas tarjetas representan actividades abiertas, nunca profesionales ficticios.",
  "zero": "0 % comisión · contacto directo"
 },
 "pt": {
  "back": "← VOLTAR AO TERRITÓRIO",
  "real": "PRESENÇAS REAIS",
  "none": "Ainda não há aderente real nesta zona.",
  "open": "LUGARES DISPONÍVEIS",
  "member": "ADERENTE DIGIYLYFE",
  "place": "LUGAR DISPONÍVEL",
  "view": "ABRIR →",
  "take": "OCUPAR O MEU LUGAR →",
  "country": "PAÍS",
  "zone": "ZONA",
  "sector": "SETOR",
  "lead": "Apenas aderentes realmente ligados a este país e zona.",
  "openLead": "Estes cartões representam atividades abertas, nunca profissionais fictícios.",
  "zero": "0% comissão · contacto direto"
 },
 "de": {
  "back": "← ZURÜCK ZUM GEBIET",
  "real": "ECHTE PRÄSENZEN",
  "none": "In diesem Gebiet gibt es noch kein echtes Mitglied.",
  "open": "FREIE PLÄTZE",
  "member": "DIGIYLYFE-MITGLIED",
  "place": "FREIER PLATZ",
  "view": "ÖFFNEN →",
  "take": "MEINEN PLATZ NEHMEN →",
  "country": "LAND",
  "zone": "GEBIET",
  "sector": "BEREICH",
  "lead": "Nur Mitglieder, die wirklich diesem Land und Gebiet zugeordnet sind.",
  "openLead": "Diese Karten zeigen offene Aktivitäten, niemals erfundene Profis.",
  "zero": "0 % Provision · Direktkontakt"
 },
 "it": {
  "back": "← TORNA AL TERRITORIO",
  "real": "PRESENZE REALI",
  "none": "Nessun aderente reale è ancora collegato a questa zona.",
  "open": "POSTI DISPONIBILI",
  "member": "ADERENTE DIGIYLYFE",
  "place": "POSTO DISPONIBILE",
  "view": "APRI →",
  "take": "PRENDERE IL MIO POSTO →",
  "country": "PAESE",
  "zone": "ZONA",
  "sector": "SETTORE",
  "lead": "Solo aderenti realmente collegati a questo paese e territorio.",
  "openLead": "Queste carte rappresentano attività aperte, mai professionisti fittizi.",
  "zero": "0% commissione · contatto diretto"
 },
 "nl": {
  "back": "← TERUG NAAR GEBIED",
  "real": "ECHTE AANWEZIGHEID",
  "none": "Er is nog geen echt lid in dit gebied.",
  "open": "OPEN PLAATSEN",
  "member": "DIGIYLYFE-LID",
  "place": "OPEN PLAATS",
  "view": "OPENEN →",
  "take": "MIJN PLAATS NEMEN →",
  "country": "LAND",
  "zone": "GEBIED",
  "sector": "SECTOR",
  "lead": "Alleen leden die echt aan dit land en gebied gekoppeld zijn.",
  "openLead": "Deze kaarten tonen open activiteiten, nooit fictieve professionals.",
  "zero": "0% commissie · direct contact"
 },
 "ar": {
  "back": "← العودة إلى المنطقة",
  "real": "حضور حقيقي",
  "none": "لا يوجد عضو حقيقي في هذه المنطقة حالياً.",
  "open": "أماكن متاحة",
  "member": "عضو DIGIYLYFE",
  "place": "مكان متاح",
  "view": "فتح ←",
  "take": "خذ مكاني ←",
  "country": "البلد",
  "zone": "المنطقة",
  "sector": "القطاع",
  "lead": "فقط الأعضاء المرتبطون فعلياً بهذا البلد وهذه المنطقة.",
  "openLead": "هذه البطاقات تمثل أنشطة متاحة وليست مهنيين وهميين.",
  "zero": "عمولة 0٪ · تواصل مباشر"
 },
 "wo": {
  "back": "← DELLUSI CI TERRITOIRE BI",
  "real": "PROFESIONEEL YU DËGG",
  "none": "Amagul adhérent bu dëgg fii léegi.",
  "open": "BËRAB YU UBBEEKU",
  "member": "ADHÉRENT DIGIYLYFE",
  "place": "BËRAB BU UBBEEKU",
  "view": "UBBI FICHE BI →",
  "take": "JËL SAMA BËRAB →",
  "country": "RÉEW",
  "zone": "GOX",
  "sector": "SECTEUR",
  "lead": "Ñi bokk ci réseau bi ci réew mi ak gox bii rekk lañu fii wone.",
  "openLead": "Amul profesioneel bu ñu sos: yii ay métier yu ñu mën a jël la.",
  "zero": "0 % commission · jokkoo ci sa bopp"
 },
 "zh": {
  "back": "← 返回所在区域",
  "real": "真实入驻的职业人士",
  "none": "此区域目前暂无真实注册会员。",
  "open": "开放展示名额",
  "member": "DIGIYLYFE 会员",
  "place": "开放名额",
  "view": "查看专业主页 →",
  "take": "申请加入 →",
  "country": "国家",
  "zone": "区域",
  "sector": "片区",
  "lead": "这里只展示真实归属该国家和区域的注册会员。",
  "openLead": "不虚构职业人士；这些卡片展示尚未入驻的行业位置。",
  "zero": "0% 佣金 · 直接联系"
 }
};
var U=T[lang]||T.fr,M=META[territory]||null;
var TIT={transport:'DIGIY DRIVER',artisan:'DIGIY BUILD · ARTISANS',accommodation:'DIGIY LOC · DORMIR & LOUER',food:'DIGIY RESTO · MANGER',shopping:'MON COMMERCE',beauty:'BEAUTÉ & BIEN-ÊTRE',jobs:'EMPLOI & MISSIONS',announcements:'BONNE AFFAIRE · ANNONCES',guidance:'LA VOIX DU BUSINESS',resa:'RÉSA MULTI · SERVICES'};
/* Modules DIGIY : intitulés des pages dans les nouvelles langues. */
var TIT_WO={transport:'DIGIY DRIVER · SOFËËR',artisan:'DIGIY BUILD · ARTISAAN',accommodation:'DIGIY LOC · DAL AK LOCATION',food:'DIGIY RESTO · LEKKUKAAY',shopping:'DIGIY MON COMMERCE · BITIG',beauty:'DIGIY BEAUTY · TAAR',jobs:'DIGIY JOBS · LIGGÉEY',announcements:'DIGIY · YËGLE YI',guidance:'DIGIY LA VOIX · JOKKOO',resa:'DIGIY RÉSA MULTI · RÉSERVATION'};
var TIT_ZH={transport:'DIGIY DRIVER · 司机服务',artisan:'DIGIY BUILD · 工匠服务',accommodation:'DIGIY LOC · 住宿租赁',food:'DIGIY RESTO · 餐饮',shopping:'DIGIY MON COMMERCE · 本地商店',beauty:'DIGIY BEAUTY · 美容护理',jobs:'DIGIY JOBS · 工作任务',announcements:'DIGIY · 本地公告',guidance:'DIGIY LA VOIX · 业务沟通',resa:'DIGIY RÉSA MULTI · 预约预订'};
var TIT_LOCAL={"en":{"transport":"DIGIY DRIVER","artisan":"DIGIY BUILD · TRADES","accommodation":"DIGIY LOC · STAYS & RENTALS","food":"DIGIY RESTO · FOOD","shopping":"DIGIY MON COMMERCE · SHOPS","beauty":"DIGIY BEAUTY · WELLNESS","jobs":"DIGIY JOBS · OPPORTUNITIES","announcements":"DIGIY · LISTINGS","guidance":"DIGIY LA VOIX · BUSINESS","resa":"DIGIY RÉSA MULTI · BOOKINGS"},"es":{"transport":"DIGIY DRIVER · CONDUCTORES","artisan":"DIGIY BUILD · ARTESANOS","accommodation":"DIGIY LOC · ALOJAMIENTO Y ALQUILER","food":"DIGIY RESTO · RESTAURACIÓN","shopping":"DIGIY MON COMMERCE · COMERCIOS","beauty":"DIGIY BEAUTY · BIENESTAR","jobs":"DIGIY JOBS · TRABAJO","announcements":"DIGIY · ANUNCIOS","guidance":"DIGIY LA VOIX · NEGOCIOS","resa":"DIGIY RÉSA MULTI · RESERVAS"},"pt":{"transport":"DIGIY DRIVER · MOTORISTAS","artisan":"DIGIY BUILD · PROFISSIONAIS","accommodation":"DIGIY LOC · ALOJAMENTO E ALUGUER","food":"DIGIY RESTO · RESTAURAÇÃO","shopping":"DIGIY MON COMMERCE · COMÉRCIO","beauty":"DIGIY BEAUTY · BEM-ESTAR","jobs":"DIGIY JOBS · EMPREGO","announcements":"DIGIY · ANÚNCIOS","guidance":"DIGIY LA VOIX · NEGÓCIOS","resa":"DIGIY RÉSA MULTI · RESERVAS"},"de":{"transport":"DIGIY DRIVER · FAHRDIENSTE","artisan":"DIGIY BUILD · HANDWERK","accommodation":"DIGIY LOC · UNTERKUNFT UND MIETE","food":"DIGIY RESTO · GASTRONOMIE","shopping":"DIGIY MON COMMERCE · HANDEL","beauty":"DIGIY BEAUTY · WELLNESS","jobs":"DIGIY JOBS · ARBEIT","announcements":"DIGIY · ANZEIGEN","guidance":"DIGIY LA VOIX · GESCHÄFT","resa":"DIGIY RÉSA MULTI · BUCHUNGEN"},"it":{"transport":"DIGIY DRIVER · AUTISTI","artisan":"DIGIY BUILD · ARTIGIANI","accommodation":"DIGIY LOC · ALLOGGI E AFFITTI","food":"DIGIY RESTO · RISTORAZIONE","shopping":"DIGIY MON COMMERCE · NEGOZI","beauty":"DIGIY BEAUTY · BENESSERE","jobs":"DIGIY JOBS · LAVORO","announcements":"DIGIY · ANNUNCI","guidance":"DIGIY LA VOIX · BUSINESS","resa":"DIGIY RÉSA MULTI · PRENOTAZIONI"},"nl":{"transport":"DIGIY DRIVER · CHAUFFEURS","artisan":"DIGIY BUILD · VAKMENSEN","accommodation":"DIGIY LOC · VERBLIJF EN VERHUUR","food":"DIGIY RESTO · HORECA","shopping":"DIGIY MON COMMERCE · WINKELS","beauty":"DIGIY BEAUTY · WELLNESS","jobs":"DIGIY JOBS · WERK","announcements":"DIGIY · ADVERTENTIES","guidance":"DIGIY LA VOIX · BEDRIJF","resa":"DIGIY RÉSA MULTI · RESERVERINGEN"},"ar":{"transport":"DIGIY DRIVER · السائقون","artisan":"DIGIY BUILD · الحرفيون","accommodation":"DIGIY LOC · الإقامة والإيجار","food":"DIGIY RESTO · المطاعم","shopping":"DIGIY MON COMMERCE · المتاجر","beauty":"DIGIY BEAUTY · العناية والجمال","jobs":"DIGIY JOBS · العمل","announcements":"DIGIY · الإعلانات","guidance":"DIGIY LA VOIX · تواصل الأعمال","resa":"DIGIY RÉSA MULTI · الحجوزات"}};
function pageTitle(){return (lang==='wo'?TIT_WO:lang==='zh'?TIT_ZH:TIT_LOCAL[lang]||TIT)[module]||'DIGIYLYFE'}

var REAL=[
 {m:'transport',t:'petite-cote',n:'Lamine',a:'Chauffeur privé sur réservation',z:'Saly · Mbour · AIBD · Petite Côte',img:'https://partenaire-lamine.digiylyfe.com/carte-visite.png',u:'https://partenaire-lamine.digiylyfe.com/',c:['Transfert AIBD','Courses locales','Sur réservation']},
 {m:'transport',t:'petite-cote',n:'Baptiste',a:'Chauffeur ambassadeur',z:'Saly · Mbour · AIBD · Petite Côte',img:'https://digiy-driver-part-bapt.digiylyfe.com/carte-visite-baptiste-adherent.png',u:'https://digiy-driver-part-bapt.digiylyfe.com/',c:['Transferts','Mise à disposition','Contact direct']},
 {m:'transport',t:'petite-cote',n:'Nazir Driver',a:'Chauffeur',z:'Saly · Mbour · AIBD · Petite Côte',img:'https://galerie-chauffeurs.digiylyfe.com/nazir-driver-card.svg',u:'https://galerie-chauffeurs.digiylyfe.com/nazir-driver.html',c:['Trajets directs','Transferts aéroport','Mise à disposition']},
 {m:'artisan',t:'petite-cote',n:'Babacar Plombier Pro',a:'Plombier',z:'Saly · Mbour · Petite Côte',img:'https://build.digiylyfe.com/babacar-plombier-pro.webp',u:'https://babacar-plombier-pro.digiylyfe.com/',c:['Fuite & dépannage','Installation sanitaire','Sur devis']},
 {m:'artisan',t:'petite-cote',n:'Kourant Électricien',a:'Électricien',z:'Saly · Mbour · Petite Côte',img:'https://kourant.digiylyfe.com/carte-visite.png?v=20260714-v3',u:'https://kourant.digiylyfe.com/',c:['Électricité','Dépannage','Installation']},
 {m:'artisan',t:'petite-cote',n:'Mbaye Diouf',a:'Bâtisseur',z:'Saly · Mbour · Thiès · Petite Côte',img:'https://mbaye-macon.digiylyfe.com/carte-visite.png?v=20260714-v3',u:'https://mbaye-macon.digiylyfe.com/',c:['Construction de villas','Rénovation','Piscines béton']},
 {m:'accommodation',t:'petite-cote',n:'CHEZ BAPTISTE · SALY JOSEPH',a:'Appartement · Location meublée',z:'Saly Joseph · Sénégal',img:'https://orange-pig-270004.hostingersite.com/wp-content/uploads/2025/06/042-BAPTISTE.png',u:'https://part-chez-baptiste.digiylyfe.com/',c:['4 personnes max.','Réservation directe','Paiement direct']},
 {m:'accommodation',t:'vallee-dordogne',n:'CHEZ BAPTISTE · SARLAT',a:'Chambre privée chez l’habitant',z:'Sarlat-la-Canéda · France',img:'https://digiylyfe.net/wp-content/uploads/2026/07/F9595D25-B9F1-4049-95CD-00554BC8F369.png',u:'https://sarlat-chez-baptiste.digiylyfe.com/',c:['Salle de bain privative','Cuisine partagée','Réservation directe']},
 {m:'food',t:'vallee-dordogne',n:'LE MALRAUX',a:'Restaurant traditionnel · Gastronomie périgourdine',z:'Sarlat-la-Canéda · France',img:'https://malraux-entre2.digiylyfe.com/photos/malraux-salle.jpg',u:'https://malraux-entre2.digiylyfe.com/',c:['Cuisine périgourdine','Terrasse','Réservation directe']},
 {m:'food',t:'vallee-dordogne',n:'L’ENTRE 2',a:'Brasserie · Pizzeria',z:'Sarlat-la-Canéda · France',img:'https://malraux-entre2.digiylyfe.com/photos/entre2-terrasse.jpg',u:'https://resto.digiylyfe.com/fiche-lentre2.html',c:['Brasserie','Pizzeria','Réservation directe']}
];
var OPEN={
 transport:[['🚗','Chauffeur privé'],['✈️','Transfert aéroport'],['🚐','Navette hôtel / résidence'],['🚘','Mise à disposition']],
 artisan:[['🔧','Plombier'],['⚡','Électricien'],['🏗️','Maçon / construction'],['☀️','Solaire & énergie'],['🎨','Peinture & finitions']],
 accommodation:[['🏠','Appartement meublé'],['🏡','Villa / maison'],['🛏️','Chambre d’hôtes'],['🏨','Petit hôtel / résidence']],
 food:[['🍽️','Restaurant'],['🥪','Snack / fast-food'],['👨‍🍳','Traiteur & événements'],['🥐','Boulangerie / pâtisserie']],
 shopping:[['🧰','Quincaillerie'],['📺','Hi-Fi & multimédia'],['🛒','Grande surface'],['🔌','Électroménager'],['📚','Papeterie']],
 beauty:[['💅','Onglerie'],['💆','Massage & bien-être'],['💇','Coiffure & soins capillaires'],['🧴','Soins visage & corps'],['🧖','Spa · hammam · sauna']],
 jobs:[['🏨','Hôtellerie & restauration'],['🛍️','Commerce & vente'],['🏗️','BTP & maintenance'],['🚚','Transport & logistique'],['🗂️','Services & administratif']],
 announcements:[['🚙','Véhicules & mobilité'],['🧰','Matériel professionnel'],['🏠','Maison & équipement'],['🎪','Services & événements']],
 guidance:[['🎙️','Parler de mon activité'],['🧭','Clarifier mon besoin'],['📝','Formuler ma demande']],
 resa:[['🍽️','Table / restaurant'],['🚗','Trajet / transfert'],['💅','Onglerie / beauté'],['💆','Massage / bien-être'],['💇','Coiffure / soins'],['🎪','Prestataire événementiel']]
};
/* Titres des places ouvertes : seules les étiquettes changent, jamais les données des adhérents. */
var OPEN_LOCAL={wo:{"transport":["Sofëër privé","Transport aeroport","Navette hôtel / dal","Sofëër bu ñu réservé"],"artisan":["Plombier","Elektriseen","Maçon / tabax","Soleer ak énergie","Peinture ak finition"],"accommodation":["Appartement bu am jumtukaay","Villa / kër","Chambre d’hôtes","Hotel bu ndaw / résidence"],"food":["Restaurant","Snack / fast-food","Traiteur ak événement","Boulangerie / pâtisserie"],"shopping":["Quincaillerie","Hi-Fi ak multimédia","Grande surface","Électroménager","Papeterie"],"beauty":["Onglerie","Massage ak toppatoo","Coiffure ak soins kawar","Soins kanam ak yaram","Spa · hammam · sauna"],"jobs":["Hôtellerie ak restauration","Commerce ak jaay","BTP ak maintenance","Transport ak logistique","Sarwiis ak administrasion"],"announcements":["Woto ak mobilité","Matériel liggéey","Kër ak équipement","Sarwiis ak événements"],"guidance":["Wax ci sama activité","Leeral sama soxla","Defar sama laaj"],"resa":["Taabal / restaurant","Transport / transfert","Onglerie / beauté","Massage / bien-être","Coiffure ak soins","Prestataire événementiel"]},zh:{"transport":["私人司机","机场接送","酒店接驳","包车服务"],"artisan":["水管工","电工","泥瓦与建筑施工","太阳能和能源","油漆与装修"],"accommodation":["家具齐全的公寓","别墅 / 房屋","民宿客房","小型酒店 / 公寓酒店"],"food":["餐厅","快餐小吃","宴会餐饮服务","面包店 / 糕点店"],"shopping":["五金店","影音与多媒体","大型商店","家用电器","文具店"],"beauty":["美甲服务","按摩与养生","美发与护发","面部与身体护理","水疗 / 土耳其浴 / 桑拿"],"jobs":["酒店与餐饮","零售与销售","建筑与维护","交通与物流","专业服务与行政"],"announcements":["汽车与出行","专业设备","居家用品","服务与活动"],"guidance":["介绍我的业务","说明我的需求","整理我的申请"],"resa":["餐桌 / 餐厅","接送 / 交通","美甲 / 美容","按摩 / 养生","美发与护理","活动服务"]}};
function openForModule(){var rows=OPEN[module]||[],translated=OPEN_LOCAL[lang]&&OPEN_LOCAL[lang][module];return rows.map(function(x,i){return [x[0],translated&&translated[i]||x[1]]})}

function e(s){return String(s==null?'':s).replace(/[&<>\"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]||c})}
function price(){return module==='accommodation'?(M?M.loc:''):(M?M.price:'')}
function join(){var u;if(territory==='casablanca'||territory==='marrakech'){u=new URL('/carte-gratuite-maroc.html','https://digiylyfe.com');u.searchParams.set('territory',territory);u.searchParams.set('lang',lang);u.searchParams.set('need',module);if(local)u.searchParams.set('local',local);return u.toString()}if(territory==='miami'){u=new URL('/carte-gratuite.html','https://digiylyfe.com');u.searchParams.set('country','us');u.searchParams.set('territory','miami');u.searchParams.set('lang',lang);u.searchParams.set('need',module);if(local)u.searchParams.set('local',local);return u.toString()}var path=territory==='vallee-dordogne'?'/adhesion-dordogne.html':territory==='bordeaux'?'/adhesion-bordeaux.html':territory==='dakar'?'/adhesion-dakar.html':'/adhesion-petite-cote.html';u=new URL(path,'https://digiylyfe.com');u.searchParams.set('lang',lang);u.searchParams.set('need',module);if(local)u.searchParams.set('local',local);return u.toString()}
function back(){var direct={casablanca:'/casablanca.html',marrakech:'/marrakech.html',miami:'/miami.html'},u;if(direct[territory]){u=new URL(direct[territory],'https://digiylyfe.com');u.searchParams.set('lang',lang);return u.toString()}u=new URL('/territoire.html','https://digiylyfe.com');if(territory)u.searchParams.set('zone',territory);if(local)u.searchParams.set('local',local);u.searchParams.set('lang',lang);return u.toString()}
function reals(){if(module==='resa')return REAL.filter(function(r){return r.t===territory&&(r.m==='transport'||r.m==='food')});return REAL.filter(function(r){return r.t===territory&&r.m===module})}
function realCard(r){return '<article class="listing"><a class="visual" href="'+e(r.u)+'"><img src="'+e(r.img)+'" alt="'+e(r.n)+'"><span class="hint">↗ '+e(U.view)+'</span></a><div class="info"><p class="eyebrow">'+e(U.member)+'</p><h2>'+e(r.n)+'</h2><p class="activity">'+e(r.a)+'</p><span class="area">📍 '+e(r.z)+'</span><div class="chips">'+r.c.map(function(x){return '<span>'+e(x)+'</span>'}).join('')+'</div><p class="rule">'+e(U.zero)+'</p><a class="cta" href="'+e(r.u)+'">'+e(U.view)+'</a></div></article>'}
function openCard(x){return '<article class="listing open"><div class="visual placeholder"><div><b>'+x[0]+'</b><strong>'+e(x[1])+'</strong><small>'+e(U.place)+'</small></div></div><div class="info"><p class="eyebrow">'+e(U.place)+'</p><h2>'+e(x[1])+'</h2><p class="activity">'+(M?e(M.flag+' '+M.country+' · '+M.zone):'')+'</p>'+(local?'<span class="area">📍 '+e(local)+'</span>':'')+'<div class="chips"><span>'+e(price())+'</span><span>QR</span><span>0 %</span></div><p class="rule">'+e(U.openLead)+'</p><a class="cta" href="'+e(join())+'">'+e(U.take)+'</a></div></article>'}
function render(){document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';var rs=reals(),ops=openForModule(),sep=M?'<div class="sep"><div><b>'+e(U.country)+'</b><strong>'+e(M.flag+' '+M.country)+'</strong></div><i>→</i><div><b>'+e(U.zone)+'</b><strong>'+e(M.zone)+'</strong></div>'+(local?'<i>→</i><div><b>'+e(U.sector)+'</b><strong>'+e(local)+'</strong></div>':'')+'</div>':'';
R.innerHTML='<style>*{box-sizing:border-box}body{margin:0;font-family:system-ui,-apple-system,"Segoe UI",sans-serif;background:#f6f1e5;color:#173b31}.wrap{max-width:980px;margin:auto;padding:14px 8px 44px}.back{display:flex;min-height:48px;align-items:center;justify-content:center;background:#073f32;color:#fff;text-decoration:none;border-radius:999px;font-weight:950;margin-bottom:12px}.hero{background:#073f32;color:#fff;border-bottom:4px solid #d8ad46;border-radius:20px;padding:18px}.hero h1{margin:0;font-size:clamp(27px,6vw,44px)}.hero p{margin:7px 0 0;color:#d8e7df;font-weight:800}.sep{display:grid;grid-template-columns:auto auto auto auto auto;gap:8px;align-items:center;margin:12px 0;padding:12px;border:2px solid #d8ad46;border-radius:16px;background:#fff8df}.sep div{display:flex;flex-direction:column}.sep b{font-size:8px;color:#80651e}.sep strong{font-size:12px;color:#073f32}.sep i{font-style:normal;color:#9d7d24;font-weight:1000}.head{margin:18px 0 9px}.head h2{margin:0;color:#073f32}.head p{margin:4px 0;color:#6e8179;font-size:11px;font-weight:800}.none{padding:14px;border:1px dashed #b9c8c0;border-radius:14px;background:#fff}.listing{display:grid;grid-template-columns:34% 66%;background:#fffefa;border:1px solid #dfe8e2;border-radius:18px;overflow:hidden;margin:10px 0;box-shadow:0 7px 18px rgba(7,63,50,.07)}.visual{position:relative;min-height:310px;background:#dce5df;overflow:hidden}.visual img{width:100%;height:100%;object-fit:cover;display:block}.hint{position:absolute;left:7px;right:7px;bottom:7px;background:rgba(7,63,50,.9);color:#fff;border-radius:999px;text-align:center;padding:7px;font-size:8px;font-weight:1000}.placeholder{display:grid;place-items:center;background:linear-gradient(145deg,#073f32,#0d634b);color:#fff;text-align:center}.placeholder b{display:block;font-size:52px}.placeholder strong{display:block;margin:8px;font-size:17px}.placeholder small{display:block;color:#f6d983;font-weight:950}.open{border:2px dashed #d8ad46}.info{padding:14px}.eyebrow{margin:0 0 5px;color:#b28624;font-size:8px;font-weight:1000}.info h2{margin:0;color:#073f32;font-size:22px}.activity{margin:5px 0;color:#6e8179;font-size:11px;font-weight:800}.area{display:inline-block;background:#e8f1eb;border-radius:999px;padding:5px 7px;font-size:9px;font-weight:850}.chips{display:flex;flex-wrap:wrap;gap:5px;margin:10px 0}.chips span{border:1px solid #dfe8e2;background:#eef4f0;border-radius:999px;padding:5px 7px;font-size:9px;font-weight:850}.rule{border-left:3px solid #d8ad46;padding:8px;background:#fff8df;color:#6b571d;font-size:10px;font-weight:800}.cta{display:flex;min-height:43px;align-items:center;justify-content:center;margin-top:10px;border-radius:999px;background:#073f32;color:#fff;text-decoration:none;font-size:9px;font-weight:1000}.footer{margin-top:18px;text-align:center;color:#6e8179;font-size:9px;font-weight:800}@media(max-width:380px){.listing{grid-template-columns:32% 68%}.visual{min-height:280px}.info{padding:10px}.info h2{font-size:18px}.sep{grid-template-columns:1fr auto 1fr}.sep div:last-child{grid-column:1/-1}}</style><main class="wrap"><a class="back" href="'+e(back())+'">'+e(U.back)+'</a><section class="hero"><h1>'+e(pageTitle())+'</h1><p>'+e(U.zero)+'</p></section>'+sep+'<section><div class="head"><h2>'+e(U.real)+'</h2><p>'+e(U.lead)+'</p></div>'+(rs.length?rs.map(realCard).join(''):'<div class="none">'+e(U.none)+'</div>')+'</section><section><div class="head"><h2>'+e(U.open)+'</h2><p>'+e(U.openLead)+'</p></div>'+ops.map(openCard).join('')+'</section><div class="footer">DIGIYLYFE · '+(M?e(M.flag+' '+M.country+' · '+M.zone):'TERRITOIRE')+'</div></main>'}
render();
})();
