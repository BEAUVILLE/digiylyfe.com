(function(){'use strict';
var ROOT=document.getElementById('digiy-master-root');if(!ROOT)return;
var MODULE=document.body.getAttribute('data-digiy-module')||'';
var P=new URLSearchParams(location.search),territory=P.get('territory')||'',local=P.get('local')||'',lang=(P.get('lang')||'fr').slice(0,2).toLowerCase();
var LANGS=['fr','en','es','pt','de','it','nl','ar','wo','zh'];if(LANGS.indexOf(lang)<0)lang='fr';
var META={
 'petite-cote':{country:'SÉNÉGAL',flag:'🇸🇳',zone:'PETITE CÔTE',currency:'12 000 FCFA / mois',locPrice:'À partir de 21 000 FCFA / mois'},
 'dakar':{country:'SÉNÉGAL',flag:'🇸🇳',zone:'DAKAR',currency:'12 000 FCFA / mois',locPrice:'À partir de 21 000 FCFA / mois'},
 'vallee-dordogne':{country:'FRANCE',flag:'🇫🇷',zone:'VALLÉE DE LA DORDOGNE',currency:'450 €/an · ou 45 €/mois (fiche 250 € séparée)',locPrice:'DIGIY LOC · dès 75 €/mois · offre séparée'},
 'bordeaux':{country:'FRANCE',flag:'🇫🇷',zone:'BORDEAUX',currency:'450 €/an · ou 45 €/mois (fiche 250 € séparée)',locPrice:'DIGIY LOC · dès 75 €/mois · offre séparée'}
};
var I18N={
 "fr": {
  "back": "← RETOUR AU TERRITOIRE",
  "real": "PRÉSENCES RÉELLES",
  "realLead": "Uniquement les adhérents réellement rattachés à ce pays et à cette zone.",
  "none": "Aucun adhérent réel rattaché à cette zone pour le moment.",
  "open": "PLACES À PRENDRE",
  "openLead": "Ces cartes représentent des activités ouvertes, jamais de faux professionnel.",
  "member": "ADHÉRENT DIGIYLYFE",
  "place": "PLACE À PRENDRE",
  "view": "OUVRIR →",
  "take": "PRENDRE MA PLACE →",
  "zero": "0 % commission · contact direct",
  "choose": "Choisissez un territoire depuis TERRITOIRE.",
  "country": "PAYS",
  "zone": "ZONE",
  "local": "SECTEUR",
  "profWhyTitle": "Pourquoi être présent sur le territoire ?",
  "profWhyText": "Vous n’apparaissez pas ici pour entrer dans un annuaire de plus. Votre présence permet d’être identifié lorsqu’un besoin réel apparaît sur le territoire. DIGIYLYFE relie le besoin à la compétence utile, puis le contact reste direct avec le professionnel.",
  "profWhyExamples": "Architecte · Comptable / expert-comptable · Avocat · Notaire · Géomètre · Assureur · Consultant · Bureau d’études"
 },
 "en": {
  "back": "← BACK TO TERRITORY",
  "real": "REAL PRESENCES",
  "realLead": "Only members actually attached to this country and zone.",
  "none": "No real member is attached to this zone yet.",
  "open": "PLACES AVAILABLE",
  "openLead": "These cards represent open activities, never fake professionals.",
  "member": "DIGIYLYFE MEMBER",
  "place": "PLACE AVAILABLE",
  "view": "OPEN →",
  "take": "TAKE MY PLACE →",
  "zero": "0% commission · direct contact",
  "choose": "Choose a territory from TERRITORY.",
  "country": "COUNTRY",
  "zone": "ZONE",
  "local": "AREA",
  "profWhyTitle": "Why be present in the territory?",
  "profWhyText": "You are not here to join yet another directory. Your presence means you can be identified when a real need arises in the territory. DIGIYLYFE connects the need with the relevant expertise, then contact remains direct with the professional.",
  "profWhyExamples": "Architect · Accountant / chartered accountant · Lawyer · Notary · Surveyor · Insurer · Consultant · Engineering office"
 },
 "es": {
  "back": "← VOLVER AL TERRITORIO",
  "real": "PRESENCIAS REALES",
  "realLead": "Solo adherentes realmente vinculados a este país y zona.",
  "none": "Todavía no hay adherente real en esta zona.",
  "open": "LUGARES DISPONIBLES",
  "openLead": "Estas tarjetas representan actividades abiertas, nunca profesionales ficticios.",
  "member": "ADHERENTE DIGIYLYFE",
  "place": "LUGAR DISPONIBLE",
  "view": "ABRIR →",
  "take": "OCUPAR MI LUGAR →",
  "zero": "0 % comisión · contacto directo",
  "choose": "Elija un territorio desde TERRITORIO.",
  "country": "PAÍS",
  "zone": "ZONA",
  "local": "SECTOR",
  "profWhyTitle": "¿Por qué estar presente en el territorio?",
  "profWhyText": "No aparece aquí para entrar en otro directorio. Su presencia permite que le identifiquen cuando surge una necesidad real en el territorio. DIGIYLYFE conecta la necesidad con la competencia útil y el contacto sigue siendo directo con el profesional.",
  "profWhyExamples": "Arquitecto · Contable / experto contable · Abogado · Notario · Geómetra · Asegurador · Consultor · Oficina de estudios"
 },
 "pt": {
  "back": "← VOLTAR AO TERRITÓRIO",
  "real": "PRESENÇAS REAIS",
  "realLead": "Apenas aderentes realmente ligados a este país e zona.",
  "none": "Ainda não há aderente real nesta zona.",
  "open": "LUGARES DISPONÍVEIS",
  "openLead": "Estes cartões representam atividades abertas, nunca profissionais fictícios.",
  "member": "ADERENTE DIGIYLYFE",
  "place": "LUGAR DISPONÍVEL",
  "view": "ABRIR →",
  "take": "OCUPAR O MEU LUGAR →",
  "zero": "0% comissão · contacto direto",
  "choose": "Escolha um território em TERRITÓRIO.",
  "country": "PAÍS",
  "zone": "ZONA",
  "local": "SETOR",
  "profWhyTitle": "Porquê estar presente no território?",
  "profWhyText": "Não aparece aqui para entrar em mais um diretório. A sua presença permite que seja identificado quando surge uma necessidade real no território. A DIGIYLYFE liga a necessidade à competência adequada e o contacto permanece direto com o profissional.",
  "profWhyExamples": "Arquiteto · Contabilista · Advogado · Notário · Topógrafo · Segurador · Consultor · Gabinete de estudos"
 },
 "de": {
  "back": "← ZURÜCK ZUM GEBIET",
  "real": "ECHTE PRÄSENZEN",
  "realLead": "Nur Mitglieder, die wirklich diesem Land und Gebiet zugeordnet sind.",
  "none": "In diesem Gebiet gibt es noch kein echtes Mitglied.",
  "open": "FREIE PLÄTZE",
  "openLead": "Diese Karten zeigen offene Aktivitäten, niemals erfundene Profis.",
  "member": "DIGIYLYFE-MITGLIED",
  "place": "FREIER PLATZ",
  "view": "ÖFFNEN →",
  "take": "MEINEN PLATZ NEHMEN →",
  "zero": "0 % Provision · Direktkontakt",
  "choose": "Wählen Sie ein Gebiet über TERRITORIUM.",
  "country": "LAND",
  "zone": "GEBIET",
  "local": "BEREICH",
  "profWhyTitle": "Warum im Gebiet präsent sein?",
  "profWhyText": "Sie erscheinen hier nicht, um in einem weiteren Verzeichnis zu stehen. Ihre Präsenz sorgt dafür, dass Sie gefunden werden, wenn im Gebiet ein konkreter Bedarf entsteht. DIGIYLYFE verbindet den Bedarf mit der passenden Kompetenz; der Kontakt bleibt direkt mit dem Fachleuten.",
  "profWhyExamples": "Architekt · Buchhalter / Steuerberater · Anwalt · Notar · Vermesser · Versicherer · Berater · Planungsbüro"
 },
 "it": {
  "back": "← TORNA AL TERRITORIO",
  "real": "PRESENZE REALI",
  "realLead": "Solo aderenti realmente collegati a questo paese e territorio.",
  "none": "Nessun aderente reale è ancora collegato a questa zona.",
  "open": "POSTI DISPONIBILI",
  "openLead": "Queste carte rappresentano attività aperte, mai professionisti fittizi.",
  "member": "ADERENTE DIGIYLYFE",
  "place": "POSTO DISPONIBILE",
  "view": "APRI →",
  "take": "PRENDERE IL MIO POSTO →",
  "zero": "0% commissione · contatto diretto",
  "choose": "Scegli un territorio da TERRITORIO.",
  "country": "PAESE",
  "zone": "ZONA",
  "local": "SETTORE",
  "profWhyTitle": "Perché essere presenti nel territorio?",
  "profWhyText": "Non siete qui per entrare in un altro elenco. La vostra presenza permette di essere individuati quando nasce un bisogno reale nel territorio. DIGIYLYFE collega il bisogno alla competenza utile e il contatto resta diretto con il professionista.",
  "profWhyExamples": "Architetto · Commercialista · Avvocato · Notaio · Geometra · Assicuratore · Consulente · Studio tecnico"
 },
 "nl": {
  "back": "← TERUG NAAR GEBIED",
  "real": "ECHTE AANWEZIGHEID",
  "realLead": "Alleen leden die echt aan dit land en gebied gekoppeld zijn.",
  "none": "Er is nog geen echt lid in dit gebied.",
  "open": "OPEN PLAATSEN",
  "openLead": "Deze kaarten tonen open activiteiten, nooit fictieve professionals.",
  "member": "DIGIYLYFE-LID",
  "place": "OPEN PLAATS",
  "view": "OPENEN →",
  "take": "MIJN PLAATS NEMEN →",
  "zero": "0% commissie · direct contact",
  "choose": "Kies een gebied via TERRITORY.",
  "country": "LAND",
  "zone": "GEBIED",
  "local": "SECTOR",
  "profWhyTitle": "Waarom aanwezig zijn in het gebied?",
  "profWhyText": "U staat hier niet om in nog een gids terecht te komen. Uw aanwezigheid zorgt ervoor dat u gevonden kunt worden wanneer er in het gebied een echte behoefte ontstaat. DIGIYLYFE verbindt de behoefte met de juiste expertise; het contact blijft rechtstreeks met de professional.",
  "profWhyExamples": "Architect · Accountant · Advocaat · Notaris · Landmeter · Verzekeraar · Consultant · Studiebureau"
 },
 "ar": {
  "back": "← العودة إلى المنطقة",
  "real": "حضور حقيقي",
  "realLead": "فقط الأعضاء المرتبطون فعلياً بهذا البلد وهذه المنطقة.",
  "none": "لا يوجد عضو حقيقي في هذه المنطقة حالياً.",
  "open": "أماكن متاحة",
  "openLead": "هذه البطاقات تمثل أنشطة متاحة وليست مهنيين وهميين.",
  "member": "عضو DIGIYLYFE",
  "place": "مكان متاح",
  "view": "فتح ←",
  "take": "خذ مكاني ←",
  "zero": "عمولة 0٪ · تواصل مباشر",
  "choose": "اختر منطقة من صفحة المناطق.",
  "country": "البلد",
  "zone": "المنطقة",
  "local": "القطاع"
 },
 "wo": {
  "back": "← DELLUSI CI TERRITOIRE BI",
  "real": "PROFESIONEEL YU DËGG",
  "realLead": "Ñi bokk ci réseau bi ci réew mi ak gox bii rekk lañu fii wone.",
  "none": "Amagul adhérent bu dëgg ci gox bii léegi.",
  "open": "BËRAB YU UBBEEKU",
  "openLead": "Yii ay bérab yu ñu mën a jël la, duñu profesioneel yu ñu sos.",
  "member": "ADHÉRENT DIGIYLYFE",
  "place": "BËRAB BU UBBEEKU",
  "view": "UBBI →",
  "take": "JËL SAMA BËRAB →",
  "zero": "0 % commission · jokkoo ci sa bopp",
  "choose": "Tànnal sa gox ci xëtu TERRITOIRE.",
  "country": "RÉEW",
  "zone": "GOX",
  "local": "SECTEUR",
  "profWhyTitle": "Lu tax nga war a am bérab ci gox bi?",
  "profWhyText": "Yow duñu la fii jox bérab ngir nga bokk rekk ci annuaire. Bu amee soxla ci gox bi, kiliyaan yi mën nañu la gis. DIGIYLYFE dafay boole soxla ak ki am xam-xam; jokkoo gi ci sa bopp la.",
  "profWhyExamples": "Architecte · Comptable · Plombier · Fournisseur · Sofëër"
 },
 "zh": {
  "back": "← 返回所在区域",
  "real": "真实入驻的职业人士",
  "realLead": "这里只展示真实归属该国家及区域的注册会员。",
  "none": "此区域目前没有真实注册会员。",
  "open": "开放展示名额",
  "openLead": "这些卡片代表尚未入驻的行业位置，不虚构职业人士。",
  "member": "DIGIYLYFE 会员",
  "place": "开放名额",
  "view": "查看 →",
  "take": "申请加入 →",
  "zero": "0% 佣金 · 直接联系",
  "choose": "请在区域页面选择所在地区。",
  "country": "国家",
  "zone": "区域",
  "local": "片区",
  "profWhyTitle": "为什么要在本地区展示业务？",
  "profWhyText": "这不是又一个通讯录。只有当本地出现真实需求时，客户才能找到您的专业服务。DIGIYLYFE 帮助连接需求与专业能力，客户仍直接联系职业人士。",
  "profWhyExamples": "建筑师 · 会计师 · 水管工 · 供应商 · 司机"
 }
};
var U=I18N[lang]||I18N.fr,M=META[territory]||null;
var TITLES={transport:'DIGIY DRIVER',artisan:'DIGIY BUILD · ARTISANS',accommodation:'DIGIY LOC · DORMIR & LOUER',food:'DIGIY RESTO · MANGER',announcements:'BONNE AFFAIRE · ANNONCES',resa:'RÉSA MULTI · SERVICES',cleaning:'SERVICE DE NETTOYAGE',professional:'SERVICES PROFESSIONNELS',health:'SANTÉ & SOINS',guidance:'LA VOIX DU BUSINESS'};
var REAL=[
 {module:'professional',territory:'petite-cote',id:'1c2092cc-9498-407f-8568-039095fb95d3',pilot:true,name:'Jean-Baptiste',activity:'Apporteur d’affaires indépendant · Mise en relation commerciale',zone:'Saly · Petite Côte',image:'https://master-site-digiylyfe.digiylyfe.com/test-apport-affaires-001/photos/hero-connexion.svg',url:'https://master-site-digiylyfe.digiylyfe.com/test-apport-affaires-001/',chips:['Projets de construction','Études et génie civil','Fournisseurs & services','Mise en relation directe']},
 {module:'transport',territory:'petite-cote',name:'Lamine',activity:'Chauffeur privé sur réservation',zone:'Saly · Mbour · AIBD · Petite Côte',image:'https://partenaire-lamine.digiylyfe.com/carte-visite.png',url:'https://partenaire-lamine.digiylyfe.com/',chips:['Transfert AIBD','Courses locales','Sur réservation'],profWhyTitle:"لماذا الظهور داخل المنطقة؟",profWhyText:"وجودك هنا ليس لإضافتك إلى دليل آخر. حضورك يسمح بالتعرّف عليك عندما تظهر حاجة حقيقية داخل المنطقة. تربط DIGIYLYFE الحاجة بالكفاءة المناسبة، ثم يبقى التواصل مباشراً مع المهني.",profWhyExamples:"مهندس معماري · محاسب / خبير محاسبة · محامٍ · موثق · مسّاح · تأمين · مستشار · مكتب دراسات"},
 {module:'transport',territory:'petite-cote',name:'Baptiste',activity:'Chauffeur ambassadeur · Adhérent DIGIYLYFE',zone:'Saly · Mbour · AIBD · Petite Côte',image:'https://digiy-driver-part-bapt.digiylyfe.com/carte-visite-baptiste-adherent.png',url:'https://digiy-driver-part-bapt.digiylyfe.com/',chips:['Transferts','Mise à disposition','Contact direct']},
 {module:'transport',territory:'petite-cote',name:'Nazir Driver',activity:'Chauffeur · Adhérent DIGIYLYFE',zone:'Saly · Mbour · AIBD · Petite Côte',image:'https://galerie-chauffeurs.digiylyfe.com/nazir-driver-card.svg',url:'https://galerie-chauffeurs.digiylyfe.com/nazir-driver.html',chips:['Trajets directs','Transferts aéroport','Mise à disposition']},
 {module:'cleaning',territory:'petite-cote',name:'MANÉ & GNING',activity:'Service de nettoyage',zone:'Saly · Mbour · Petite Côte',image:'https://mane-gning.digiylyfe.com/media/mane-gning-poster.avif',url:'https://mane-gning.digiylyfe.com/',chips:['Nettoyage','Ménage','Entretien','Contact direct']},
 {module:'artisan',territory:'petite-cote',name:'Babacar Plombier Pro',activity:'Plombier',zone:'Saly · Mbour · Petite Côte',image:'https://build.digiylyfe.com/babacar-plombier-pro.webp',url:'https://babacar-plombier-pro.digiylyfe.com/',chips:['Fuite & dépannage','Installation sanitaire','Sur devis']},
 {module:'artisan',territory:'petite-cote',name:'Kourant Électricien',activity:'Électricien',zone:'Saly · Mbour · Petite Côte',image:'https://kourant.digiylyfe.com/carte-visite.png?v=20260714-v3',url:'https://kourant.digiylyfe.com/',chips:['Électricité','Dépannage','Installation']},
 {module:'artisan',territory:'petite-cote',name:'Mbaye Diouf',activity:'Bâtisseur',zone:'Saly · Mbour · Thiès · Petite Côte',image:'https://mbaye-macon.digiylyfe.com/carte-visite.png?v=20260714-v3',url:'https://mbaye-macon.digiylyfe.com/',chips:['Construction de villas','Rénovation','Piscines béton']},
 {module:'accommodation',territory:'petite-cote',name:'CHEZ BAPTISTE · SALY JOSEPH',activity:'Appartement · Location meublée',zone:'Saly Joseph · Sénégal',image:'https://orange-pig-270004.hostingersite.com/wp-content/uploads/2025/06/042-BAPTISTE.png',url:'https://part-chez-baptiste.digiylyfe.com/',chips:['4 personnes max.','Réservation directe','Paiement direct']},
 {module:'accommodation',territory:'vallee-dordogne',name:'CHEZ BAPTISTE · SARLAT',activity:'Chambre privée chez l’habitant',zone:'Sarlat-la-Canéda · France',image:'https://digiylyfe.net/wp-content/uploads/2026/07/F9595D25-B9F1-4049-95CD-00554BC8F369.png',url:'https://sarlat-chez-baptiste.digiylyfe.com/',chips:['Salle de bain privative','Cuisine partagée','Réservation directe']},
 {module:'food',territory:'vallee-dordogne',name:'LE MALRAUX',activity:'Restaurant traditionnel · Gastronomie périgourdine',zone:'Sarlat-la-Canéda · France',image:'https://malraux-entre2.digiylyfe.com/photos/malraux-salle.jpg',url:'https://malraux-entre2.digiylyfe.com/',chips:['Cuisine périgourdine','Terrasse','Réservation directe']},
 {module:'food',territory:'vallee-dordogne',name:'L’ENTRE 2',activity:'Brasserie · Pizzeria · Terrasse cathédrale',zone:'Sarlat-la-Canéda · France',image:'https://malraux-entre2.digiylyfe.com/photos/entre2-terrasse.jpg',url:'https://resto.digiylyfe.com/fiche-lentre2.html',chips:['Brasserie','Pizzeria','Réservation directe']}
];
var OPEN={
 transport:[['🚗','Chauffeur privé'],['✈️','Transfert aéroport'],['🚐','Navette hôtel / résidence'],['🚘','Mise à disposition']],
 artisan:[['🔧','Plombier'],['⚡','Électricien'],['🏗️','Maçon / construction'],['☀️','Solaire & énergie'],['🎨','Peinture & finitions']],
 accommodation:[['🏠','Appartement meublé'],['🏡','Villa / maison'],['🛏️','Chambre d’hôtes'],['🏨','Petit hôtel / résidence']],
 food:[['🍽️','Restaurant'],['🥪','Snack / fast-food'],['👨‍🍳','Traiteur & événements'],['🥐','Boulangerie / pâtisserie']],
 announcements:[['🚙','Véhicules & mobilité'],['🧰','Matériel professionnel'],['🏠','Maison & équipement'],['🎪','Services & événements']],
 cleaning:[['🧹','Nettoyage maison'],['🧼','Entretien régulier'],['🏢','Bureaux & commerces'],['✨','Remise en état']],
 professional:[['⚖️','Avocat'],['🖋️','Notaire'],['📊','Comptable / expert-comptable'],['📐','Architecte'],['📏','Géomètre'],['🛡️','Assureur / courtier'],['🧠','Consultant'],['🏢','Bureau d’études']],
 health:[['🩺','Médecin généraliste'],['🦷','Dentiste'],['💉','Infirmier / infirmière'],['🤱','Sage-femme'],['🤝','Aide à la personne']],
 resa:[['🍽️','Table / restaurant'],['🚗','Trajet / transfert'],['💅','Onglerie / beauté'],['💆','Massage / bien-être'],['💇','Coiffure / soins'],['🎪','Prestataire événementiel']],
 guidance:[['🎙️','Parler de mon activité'],['🧭','Clarifier mon besoin'],['📝','Formuler ma demande']]
};
var OPEN_LOCAL={wo:{"transport":["Sofëër privé","Transport aeroport","Navette hôtel / dal","Sofëër bu ñu réservé"],"artisan":["Plombier","Elektriseen","Maçon / tabax","Soleer ak énergie","Peinture ak finition"],"accommodation":["Appartement bu am jumtukaay","Villa / kër","Chambre d’hôtes","Hotel bu ndaw / résidence"],"food":["Restaurant","Snack / fast-food","Traiteur ak événement","Boulangerie / pâtisserie"],"announcements":["Woto ak mobilité","Matériel liggéey","Kër ak équipement","Sarwiis ak événements"],"cleaning":["Setal kër","Setal bu sax","Biro ak bitig","Setal bu mat"],"professional":["Avocat","Notaire","Comptable","Architecte","Géomètre","Assurance / courtier","Consultant","Bureau d’études"],"health":["Doktoor généraliste","Dentiste","Infirmier","Sage-femme","Ndimbal ci nit ñi"],"resa":["Taabal / restaurant","Transport / transfert","Onglerie / beauté","Massage / bien-être","Coiffure ak soins","Prestataire événementiel"],"guidance":["Wax ci sama activité","Leeral sama soxla","Defar sama laaj"]},zh:{"transport":["私人司机","机场接送","酒店接驳","包车服务"],"artisan":["水管工","电工","泥瓦与建筑施工","太阳能和能源","油漆与装修"],"accommodation":["家具齐全的公寓","别墅 / 房屋","民宿客房","小型酒店 / 公寓酒店"],"food":["餐厅","快餐小吃","宴会餐饮服务","面包店 / 糕点店"],"announcements":["汽车与出行","专业设备","居家用品","服务与活动"],"cleaning":["居家清洁","定期保洁","办公室与商店清洁","深度清洁"],"professional":["律师","公证员","会计师","建筑师","测量师","保险经纪","顾问","设计事务所"],"health":["全科医生","牙医","护士","助产士","个人照护"],"resa":["餐桌 / 餐厅","接送 / 交通","美甲 / 美容","按摩 / 养生","美发与护理","活动服务"],"guidance":["介绍我的业务","说明我的需求","整理我的申请"]}};
function translatedOpen(){var source=OPEN[MODULE]||[],names=OPEN_LOCAL[lang]&&OPEN_LOCAL[lang][MODULE];return source.map(function(x,i){return [x[0],names&&names[i]||x[1]]})}

function esc(s){return String(s==null?'':s).replace(/[&<>\"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]||c})}
function returnUrl(){var u=new URL('https://digiylyfe.com/territoire.html');if(territory)u.searchParams.set('zone',territory);if(local)u.searchParams.set('local',local);u.searchParams.set('lang',lang);return u.toString()}
function joinUrl(){var path=(territory==='vallee-dordogne')?'/adhesion-dordogne.html':territory==='bordeaux'?'/adhesion-bordeaux.html':territory==='dakar'?'/adhesion-dakar.html':'/adhesion-petite-cote.html';var u=new URL(path,'https://digiylyfe.com');u.searchParams.set('lang',lang);if(MODULE)u.searchParams.set('need',MODULE);if(local)u.searchParams.set('local',local);return u.toString()}
function realForModule(){if(!M)return[];if(MODULE==='resa')return REAL.filter(function(r){return r.territory===territory&&(r.module==='transport'||r.module==='food')});return REAL.filter(function(r){return r.module===MODULE&&r.territory===territory})}
function price(){return MODULE==='accommodation'?(M?M.locPrice:''):M?M.currency:''}
function professionalWhy(){
 if(MODULE!=='professional')return'';
 return '<section class="profWhy"><strong>'+esc(U.profWhyTitle||'')+'</strong><p>'+esc(U.profWhyText||'')+'</p><small>'+esc(U.profWhyExamples||'')+'</small></section>';
}
function cardReal(r){return '<article class="listing"><a class="visual" href="'+esc(r.url)+'" target="_blank" rel="noopener"><img src="'+esc(r.image)+'" alt="'+esc(r.name)+'"><span class="hint">↗ '+esc(U.view)+'</span></a><div class="info"><p class="eyebrow">'+esc(r.pilot?'PILOTE DIGIYLYFE':U.member)+'</p><h2>'+esc(r.name)+'</h2><p class="activity">'+esc(r.activity)+'</p><span class="area">📍 '+esc(r.zone)+'</span><div class="chips">'+r.chips.map(function(c){return '<span>'+esc(c)+'</span>'}).join('')+'</div><p class="rule">'+esc(U.zero)+'</p><a class="cta" href="'+esc(r.url)+'" target="_blank" rel="noopener">'+esc(U.view)+'</a></div></article>'}
function cardOpen(x){return '<article class="listing open"><div class="visual placeholder"><div><b>'+x[0]+'</b><strong>'+esc(x[1])+'</strong><small>'+esc(U.place)+'</small></div></div><div class="info"><p class="eyebrow">'+esc(U.place)+'</p><h2>'+esc(x[1])+'</h2><p class="activity">'+(M?esc(M.flag+' '+M.country+' · '+M.zone):esc(U.choose))+'</p>'+(local?'<span class="area">📍 '+esc(local)+'</span>':'')+'<div class="chips"><span>'+esc(price())+'</span><span>QR</span><span>0 %</span></div><p class="rule">'+esc(U.openLead)+'</p><a class="cta" href="'+esc(joinUrl())+'">'+esc(U.take)+'</a></div></article>'}
function render(){document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';var real=realForModule(),places=translatedOpen();var sep=M?'<div class="territorySep"><div><b>'+esc(U.country)+'</b><strong>'+esc(M.flag+' '+M.country)+'</strong></div><i>→</i><div><b>'+esc(U.zone)+'</b><strong>'+esc(M.zone)+'</strong></div>'+(local?'<i>→</i><div><b>'+esc(U.local)+'</b><strong>'+esc(local)+'</strong></div>':'')+'</div>':'<div class="territorySep warn">'+esc(U.choose)+'</div>';
ROOT.innerHTML='<style>:root{--g:#073f32;--g2:#0d634b;--gold:#d8ad46;--cream:#f6f1e5;--paper:#fffefa;--ink:#173b31;--muted:#6e8179;--line:#dfe8e2}*{box-sizing:border-box}body{margin:0;font-family:system-ui,-apple-system,"Segoe UI",sans-serif;background:var(--cream);color:var(--ink)}.wrap{max-width:980px;margin:auto;padding:14px 8px 44px}.back{display:flex;min-height:48px;align-items:center;justify-content:center;background:var(--g);color:#fff;text-decoration:none;border-radius:999px;font-weight:950;margin-bottom:12px}.hero{background:var(--g);color:#fff;border-bottom:4px solid var(--gold);border-radius:20px;padding:18px}.hero h1{margin:0;font-size:clamp(27px,6vw,44px)}.hero p{margin:7px 0 0;color:#d8e7df;font-weight:800}.territorySep{display:grid;grid-template-columns:auto auto auto auto auto;gap:8px;align-items:center;margin:12px 0;padding:12px;border:2px solid var(--gold);border-radius:16px;background:#fff8df}.territorySep div{display:flex;flex-direction:column}.territorySep b{font-size:8px;color:#80651e}.territorySep strong{font-size:12px;color:var(--g)}.territorySep i{font-style:normal;color:#9d7d24;font-weight:1000}.territorySep.warn{display:block}.sectionHead{margin:18px 0 9px}.sectionHead h2{margin:0;color:var(--g)}.sectionHead p{margin:4px 0;color:var(--muted);font-size:11px;font-weight:800}.none{padding:14px;border:1px dashed #b9c8c0;border-radius:14px;color:var(--muted);background:#fff}.listing{display:grid;grid-template-columns:34% 66%;background:var(--paper);border:1px solid var(--line);border-radius:18px;overflow:hidden;margin:10px 0;box-shadow:0 7px 18px rgba(7,63,50,.07)}.visual{position:relative;min-height:310px;background:#dce5df;overflow:hidden}.visual img{width:100%;height:100%;object-fit:cover;display:block}.hint{position:absolute;left:7px;right:7px;bottom:7px;background:rgba(7,63,50,.9);color:#fff;border-radius:999px;text-align:center;padding:7px;font-size:8px;font-weight:1000}.placeholder{display:grid;place-items:center;background:linear-gradient(145deg,#073f32,#0d634b);color:#fff;text-align:center}.placeholder b{display:block;font-size:52px}.placeholder strong{display:block;margin:8px 8px 0;font-size:17px;line-height:1.05}.placeholder small{display:block;margin-top:10px;color:#f6d983;font-weight:950}.open{border-style:dashed;border-width:2px;border-color:var(--gold)}.info{padding:14px;min-width:0}.eyebrow{margin:0 0 5px;color:#b28624;font-size:8px;font-weight:1000;letter-spacing:.05em}.info h2{margin:0;color:var(--g);font-size:22px;line-height:1.05}.activity{margin:5px 0;color:var(--muted);font-size:11px;font-weight:800}.area{display:inline-block;background:#e8f1eb;border-radius:999px;padding:5px 7px;font-size:9px;font-weight:850}.chips{display:flex;flex-wrap:wrap;gap:5px;margin:10px 0}.chips span{border:1px solid var(--line);background:#eef4f0;border-radius:999px;padding:5px 7px;font-size:9px;font-weight:850}.rule{border-left:3px solid var(--gold);padding:8px;background:#fff8df;color:#6b571d;font-size:10px;font-weight:800}.cta{display:flex;min-height:43px;align-items:center;justify-content:center;margin-top:10px;border-radius:999px;background:var(--g);color:#fff;text-decoration:none;font-size:9px;font-weight:1000}.profWhy{margin:12px 0 16px;padding:14px;border:1px solid var(--line);border-left:4px solid var(--gold);border-radius:16px;background:#fffefa;box-shadow:0 7px 18px rgba(7,63,50,.07)}.profWhy strong{display:block;color:var(--g);font-size:17px;margin-bottom:6px}.profWhy p{margin:0;color:var(--muted);font-size:11px;line-height:1.55;font-weight:750}.profWhy small{display:block;margin-top:8px;color:#8a6a1b;font-size:9px;line-height:1.45;font-weight:900}.footer{margin-top:18px;text-align:center;color:var(--muted);font-size:9px;font-weight:800}@media(max-width:380px){.listing{grid-template-columns:32% 68%}.visual{min-height:280px}.placeholder b{font-size:42px}.placeholder strong{font-size:14px}.info{padding:10px}.info h2{font-size:18px}.territorySep{grid-template-columns:1fr auto 1fr}.territorySep div:last-child{grid-column:1/-1}.territorySep i:nth-of-type(2){display:none}}html[dir="rtl"] .rule{border-left:0;border-right:3px solid var(--gold)}</style><main class="wrap"><a class="back" href="'+esc(returnUrl())+'">'+esc(U.back)+'</a><section class="hero"><h1>'+esc(TITLES[MODULE]||'DIGIYLYFE')+'</h1><p>'+esc(U.zero)+'</p></section>'+sep+professionalWhy()+'<section><div class="sectionHead"><h2>'+esc(U.real)+'</h2><p>'+esc((MODULE==='professional'&&real.some(function(p){return p.pilot})?'Professionnels et pilotes présents sur ce territoire. Mise en relation directe avec leur activité réelle.':U.realLead))+'</p></div>'+(real.length?real.map(cardReal).join(''):'<div class="none">'+esc(U.none)+'</div>')+'</section><section><div class="sectionHead"><h2>'+esc(U.open)+'</h2><p>'+esc(U.openLead)+'</p></div>'+places.map(cardOpen).join('')+'</section><div class="footer">DIGIYLYFE · '+esc(M?M.flag+' '+M.country+' · '+M.zone:'TERRITOIRE')+'</div></main>'}
render();
})();