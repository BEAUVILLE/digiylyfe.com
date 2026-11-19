/* DIGIYLYFE · SERVICES PROFESSIONNELS · WORLD10
 * Extension strictement limitée au MASTER professionnel.
 * Les identités, contacts, territoires, prix numériques et routes restent ceux du socle.
 */
(function(){
'use strict';
if(document.body.getAttribute('data-digiy-module')!=='professional')return;
var root=document.getElementById('digiy-master-root');if(!root)return;
var lang=(new URLSearchParams(location.search).get('lang')||'fr').slice(0,2).toLowerCase();
var OPTIONS=[['fr','FR'],['wo','WO'],['zh','中文'],['en','EN'],['es','ES'],['pt','PT'],['it','IT'],['de','DE'],['nl','NL'],['ar','AR']];
var D={
 fr:{title:'SERVICES PROFESSIONNELS',desc:'Avocats, notaires, comptables, architectes et autres professionnels par territoire. Contact direct, 0 % de commission.',types:['Avocat','Notaire','Comptable / expert-comptable','Architecte','Géomètre','Assureur / courtier','Consultant','Bureau d’études'],pilot:'PILOTE DIGIYLYFE',pilotLead:'Professionnels et pilotes présents sur ce territoire. Mise en relation directe avec leur activité réelle.',activity:'Apporteur d’affaires indépendant · Mise en relation commerciale',chips:['Projets de construction','Études et génie civil','Fournisseurs et services','Mise en relation directe'],month:'12 000 FCFA / mois',year:'450 € / an · ou 45 € / mois (fiche 250 € séparée)',choose:'Choisir la langue'},
 wo:{title:'SARWIISU PROFESIONEEL YI',desc:'Avocat, notaire, comptable, architecte ak yeneen profesioneel ci gox yi. Jokkoo bu jub, 0 % commission.',types:['Laykat (avocat)','Noter (notaire)','Ki di saytu kont yi','Ki di def planu tabax','Ki di natt suuf','Ki di aar ak assurance','Ki di joxe xel ak ndimbal','Biro bu di def ay plan ak nattu projet'],pilot:'PILOOT DIGIYLYFE',pilotLead:'Profesioneel yi ak piloot yi nekk ci gox bii. Jokkoo bu jub ci seen liggéey bu dëgg.',activity:'Ki di boole nit ñi ngir seen liggéey ak jaay-jënd',chips:['Proje tabax','Étude ak génie civil','Fournisseur ak sarwiis','Jokkoo bu jub'],month:'12 000 FCFA / weer',year:'450 € / at · walla 45 € / weer (fiche 250 € aparte)',choose:'Tànnal làkk wi'},
 zh:{title:'专业服务',desc:'按地区查找律师、公证员、会计师、建筑师等专业人士。直接联系，平台佣金为 0%。',types:['律师','公证员','会计师 / 注册会计师','建筑师','测量师','保险公司 / 经纪人','顾问','工程设计事务所'],pilot:'DIGIYLYFE 试点',pilotLead:'本地区的专业人士与试点项目。客户直接联系真实业务提供者。',activity:'独立商务介绍人 · 商业合作对接',chips:['建筑项目','工程与土木技术','供应商与服务','直接业务对接'],month:'12 000 西非法郎 / 月',year:'450 欧元 / 年，或 45 欧元 / 月（专业页面另付 250 欧元）',choose:'选择语言'},
 en:{title:'PROFESSIONAL SERVICES',desc:'Find lawyers, notaries, accountants, architects and other professionals by area. Direct contact, 0% commission.',types:['Lawyer','Notary','Accountant / chartered accountant','Architect','Surveyor','Insurer / broker','Consultant','Engineering consultancy'],pilot:'DIGIYLYFE PILOT',pilotLead:'Professionals and pilot participants active in this territory. Contact their real businesses directly.',activity:'Independent business introducer · Commercial connections',chips:['Construction projects','Engineering and civil works','Suppliers and services','Direct introductions'],month:'12,000 FCFA / month',year:'€450 / year · or €45 / month (professional profile €250 extra)',choose:'Choose language'},
 es:{title:'SERVICIOS PROFESIONALES',desc:'Encuentre abogados, notarios, contables, arquitectos y otros profesionales por territorio. Contacto directo, 0 % comisión.',types:['Abogado','Notario','Contable / asesor contable','Arquitecto','Topógrafo','Aseguradora / corredor','Consultor','Oficina de estudios'],pilot:'PILOTO DIGIYLYFE',pilotLead:'Profesionales y proyectos piloto presentes en este territorio. Contacto directo con sus actividades reales.',activity:'Intermediador comercial independiente · Contactos empresariales',chips:['Proyectos de construcción','Ingeniería y obra civil','Proveedores y servicios','Contacto directo'],month:'12 000 FCFA / mes',year:'450 € / año · o 45 € / mes (ficha profesional 250 € aparte)',choose:'Elegir idioma'},
 pt:{title:'SERVIÇOS PROFISSIONAIS',desc:'Encontre advogados, notários, contabilistas, arquitetos e outros profissionais por território. Contacto direto, 0 % de comissão.',types:['Advogado','Notário','Contabilista / técnico oficial de contas','Arquiteto','Topógrafo','Seguradora / corretor','Consultor','Gabinete de estudos'],pilot:'PILOTO DIGIYLYFE',pilotLead:'Profissionais e projetos-piloto presentes neste território. Contacto direto com atividades reais.',activity:'Angariador de negócios independente · Ligações comerciais',chips:['Projetos de construção','Engenharia e obras civis','Fornecedores e serviços','Contacto direto'],month:'12 000 FCFA / mês',year:'450 € / ano · ou 45 € / mês (ficha profissional 250 € à parte)',choose:'Escolher idioma'},
 it:{title:'SERVIZI PROFESSIONALI',desc:'Trova avvocati, notai, commercialisti, architetti e altri professionisti per territorio. Contatto diretto, 0% commissioni.',types:['Avvocato','Notaio','Contabile / commercialista','Architetto','Geometra','Assicuratore / intermediario','Consulente','Studio tecnico'],pilot:'PROGETTO PILOTA DIGIYLYFE',pilotLead:'Professionisti e progetti pilota presenti nel territorio. Contatto diretto con le attività reali.',activity:'Segnalatore d’affari indipendente · Contatti commerciali',chips:['Progetti edilizi','Ingegneria e opere civili','Fornitori e servizi','Contatti diretti'],month:'12 000 FCFA / mese',year:'450 € / anno · o 45 € / mese (scheda professionale 250 € a parte)',choose:'Scegli lingua'},
 de:{title:'BERUFLICHE DIENSTLEISTUNGEN',desc:'Anwälte, Notare, Buchhalter, Architekten und weitere Fachleute nach Region finden. Direktkontakt, 0 % Provision.',types:['Anwalt','Notar','Buchhalter / Steuerberater','Architekt','Vermesser','Versicherer / Makler','Berater','Ingenieurbüro'],pilot:'DIGIYLYFE-PILOT',pilotLead:'Fachleute und Pilotprojekte in diesem Gebiet. Direkter Kontakt zu ihren tatsächlichen Tätigkeiten.',activity:'Unabhängiger Geschäftskontakt-Vermittler · Geschäftliche Vernetzung',chips:['Bauprojekte','Ingenieur- und Tiefbau','Lieferanten und Dienstleistungen','Direkte Vernetzung'],month:'12.000 FCFA / Monat',year:'450 € / Jahr · oder 45 € / Monat (Profil 250 € separat)',choose:'Sprache wählen'},
 nl:{title:'PROFESSIONELE DIENSTEN',desc:'Vind advocaten, notarissen, accountants, architecten en andere professionals per gebied. Rechtstreeks contact, 0% commissie.',types:['Advocaat','Notaris','Accountant / boekhouder','Architect','Landmeter','Verzekeraar / makelaar','Consultant','Ingenieursbureau'],pilot:'DIGIYLYFE-PILOT',pilotLead:'Professionals en proefprojecten in dit gebied. Rechtstreeks contact met hun echte activiteiten.',activity:'Onafhankelijke zakelijke bemiddelaar · Zakelijke contacten',chips:['Bouwprojecten','Techniek en civiele bouw','Leveranciers en diensten','Direct contact'],month:'12.000 FCFA / maand',year:'€ 450 / jaar · of € 45 / maand (professionele fiche € 250 apart)',choose:'Kies taal'},
 ar:{title:'الخدمات المهنية',desc:'اعثر على محامين وموثقين ومحاسبين ومهندسين معماريين وغيرهم حسب المنطقة. تواصل مباشر وعمولة 0٪.',types:['محامٍ','موثق','محاسب / خبير محاسبة','مهندس معماري','مسّاح أراضٍ','شركة تأمين / وسيط','مستشار','مكتب دراسات'],pilot:'مشروع DIGIYLYFE التجريبي',pilotLead:'مهنيون ومشاريع تجريبية حاضرة في هذه المنطقة. تواصل مباشر مع أنشطتهم الحقيقية.',activity:'وسيط أعمال مستقل · ربط العلاقات التجارية',chips:['مشاريع البناء','الهندسة والأشغال المدنية','الموردون والخدمات','ربط تجاري مباشر'],month:'12,000 فرنك إفريقي / شهر',year:'450 يورو / سنة أو 45 يورو / شهر (الملف المهني 250 يورو بشكل منفصل)',choose:'اختر اللغة'}
};
if(!D[lang])lang='fr';
var t=D[lang];
function put(el,value){if(el)el.textContent=value}
function select(s){return root.querySelector(s)}
document.documentElement.lang=lang;
document.documentElement.dir=lang==='ar'?'rtl':'ltr';
document.title=t.title+' · DIGIYLYFE';
var description=document.querySelector('meta[name="description"]');if(description)description.setAttribute('content',t.desc);
put(select('.hero h1'),t.title);
var why=select('.profWhy');
if(why&&lang==='ar'){
 put(why.querySelector('strong'),'لماذا تعرض خدماتك المهنية في هذه المنطقة؟');
 put(why.querySelector('p'),'وجودك هنا ليس مجرد إدراج في دليل آخر. عندما تظهر حاجة حقيقية داخل المنطقة، يستطيع العملاء العثور على خبرتك. تربط DIGIYLYFE الحاجة بالمهني المناسب، ويبقى التواصل مباشراً معه.');
 put(why.querySelector('small'),'مهندس معماري · محاسب · محامٍ · موثق · مساح أراضٍ · تأمين · مستشار · مكتب دراسات');
}
if(why&&lang==='wo')put(why.querySelector('small'),'Ki di def planu tabax · Ki di saytu kont · Laykat · Noter · Ki di natt suuf · Assurance · Ki di joxe xel · Biro bu di def plan');
if(why&&lang==='zh')put(why.querySelector('small'),'建筑师 · 会计师 · 律师 · 公证员 · 测量师 · 保险顾问 · 咨询师 · 工程设计事务所');
var pilot=select('article.listing:not(.open)');
if(pilot&&pilot.querySelector('.eyebrow')&&pilot.querySelector('.eyebrow').textContent.indexOf('PILOTE')>=0){
 put(pilot.querySelector('.eyebrow'),t.pilot);
 put(pilot.querySelector('.activity'),t.activity);
 var chips=pilot.querySelectorAll('.chips span');Array.prototype.forEach.call(chips,function(el,i){if(t.chips[i])put(el,t.chips[i])});
 var realLead=select('.sectionHead p');put(realLead,t.pilotLead);
}
var cards=root.querySelectorAll('article.listing.open');
Array.prototype.forEach.call(cards,function(card,i){
 if(!t.types[i])return;
 put(card.querySelector('.placeholder strong'),t.types[i]);
 put(card.querySelector('.info h2'),t.types[i]);
 var price=card.querySelector('.chips span');
 var territory=new URLSearchParams(location.search).get('territory')||'';
 if(price&&(territory==='dakar'||territory==='petite-cote'))put(price,t.month);
 else if(price&&(territory==='bordeaux'||territory==='vallee-dordogne'))put(price,t.year);
});
var main=select('main.wrap'),hero=select('.hero');
if(main&&hero&&!select('.digiyMasterLangs')){
 var nav=document.createElement('nav');
 nav.className='digiyMasterLangs';nav.setAttribute('aria-label',t.choose);
 OPTIONS.forEach(function(o){
  var a=document.createElement('a'),u=new URL(location.href);
  u.searchParams.set('lang',o[0]);a.href=u.toString();a.textContent=o[1];a.lang=o[0]==='zh'?'zh-CN':o[0];
  if(o[0]===lang){a.className='active';a.setAttribute('aria-current','page')}
  nav.appendChild(a);
 });
 main.insertBefore(nav,hero);
}
})();
