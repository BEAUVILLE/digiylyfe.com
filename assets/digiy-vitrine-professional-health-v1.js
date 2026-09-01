/* DIGIYLYFE — Portes publiques : Services professionnels + Santé & soins V3
 * Vitrine + pages territoire France (Sarlat / Bordeaux).
 * Sarlat/Bordeaux : Santé ouvre directement le bloc des résultats/exemples.
 * Aucun professionnel fictif n'est créé. PWA hors périmètre.
 */
(function(){
  'use strict';
  if(window.DIGIY_VITRINE_PRO_HEALTH_V3)return;
  window.DIGIY_VITRINE_PRO_HEALTH_V3=true;

  var COPY={
    fr:{pro:{title:'SERVICES PROFESSIONNELS',text:'Avocat · Notaire · Architecte · Comptable · Géomètre · Assureur',cta:'Voir les professionnels →'},health:{title:'SANTÉ & SOINS',text:'Médecin · Dentiste · Infirmier · Sage-femme · Aide à la personne',cta:'Ouvrir Santé & soins →'},bordeauxLead:'12 portes simples. LA VOIX reste un moteur de recherche, jamais un métier.'},
    en:{pro:{title:'PROFESSIONAL SERVICES',text:'Lawyer · Notary · Architect · Accountant · Surveyor · Insurer',cta:'View professionals →'},health:{title:'HEALTH & CARE',text:'Doctor · Dentist · Nurse · Midwife · Personal care',cta:'Open Health & care →'},bordeauxLead:'12 simple doors. THE VOICE is a search engine, never a trade.'},
    es:{pro:{title:'SERVICIOS PROFESIONALES',text:'Abogado · Notario · Arquitecto · Contable · Topógrafo · Asegurador',cta:'Ver profesionales →'},health:{title:'SALUD Y CUIDADOS',text:'Médico · Dentista · Enfermería · Matrona · Ayuda a la persona',cta:'Abrir Salud y cuidados →'},bordeauxLead:'12 puertas simples. LA VOZ es un motor de búsqueda, no un oficio.'},
    pt:{pro:{title:'SERVIÇOS PROFISSIONAIS',text:'Advogado · Notário · Arquiteto · Contabilista · Topógrafo · Segurador',cta:'Ver profissionais →'},health:{title:'SAÚDE & CUIDADOS',text:'Médico · Dentista · Enfermeiro · Parteira · Apoio à pessoa',cta:'Abrir Saúde & cuidados →'},bordeauxLead:'12 portas simples. A VOZ é um motor de pesquisa, nunca uma profissão.'},
    it:{pro:{title:'SERVIZI PROFESSIONALI',text:'Avvocato · Notaio · Architetto · Commercialista · Geometra · Assicuratore',cta:'Vedi professionisti →'},health:{title:'SALUTE & ASSISTENZA',text:'Medico · Dentista · Infermiere · Ostetrica · Assistenza alla persona',cta:'Apri Salute & assistenza →'},bordeauxLead:'12 porte semplici. LA VOCE resta un motore di ricerca, mai un mestiere.'},
    de:{pro:{title:'PROFESSIONELLE DIENSTE',text:'Anwalt · Notar · Architekt · Buchhalter · Vermesser · Versicherer',cta:'Profis ansehen →'},health:{title:'GESUNDHEIT & PFLEGE',text:'Arzt · Zahnarzt · Pflegekraft · Hebamme · Alltagshilfe',cta:'Gesundheit & Pflege öffnen →'},bordeauxLead:'12 einfache Türen. DIE STIMME bleibt eine Suchmaschine, niemals ein Beruf.'},
    nl:{pro:{title:'PROFESSIONELE DIENSTEN',text:'Advocaat · Notaris · Architect · Boekhouder · Landmeter · Verzekeraar',cta:'Bekijk professionals →'},health:{title:'GEZONDHEID & ZORG',text:'Arts · Tandarts · Verpleegkundige · Verloskundige · Persoonlijke hulp',cta:'Open Gezondheid & zorg →'},bordeauxLead:'12 eenvoudige ingangen. DE STEM blijft een zoekmachine, nooit een beroep.'},
    ar:{pro:{title:'الخدمات المهنية',text:'محامٍ · موثق · مهندس معماري · محاسب · مسّاح · تأمين',cta:'عرض المهنيين ←'},health:{title:'الصحة والرعاية',text:'طبيب · طبيب أسنان · ممرض · قابلة · مساعدة شخصية',cta:'فتح الصحة والرعاية ←'},bordeauxLead:'12 باباً بسيطاً. الصوت محرك بحث وليس مهنة.'}
  };

  function lang(){
    var q='';try{q=(new URLSearchParams(location.search).get('lang')||'').slice(0,2).toLowerCase()}catch(e){}
    var h=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();
    return COPY[q]?q:(COPY[h]?h:'fr');
  }

  function ensureGrid(section){
    var grid=section.querySelector('.publicGrid');
    if(grid)return grid;
    grid=document.createElement('div');grid.className='publicGrid';
    var lead=section.querySelector('.publicLeadDoor');
    if(lead)lead.insertAdjacentElement('afterend',grid);else section.appendChild(grid);
    return grid;
  }

  function card(type,icon,href){
    var a=document.createElement('a');a.className='publicCard';a.href=href;a.setAttribute('data-digiy-'+type+'-door','1');
    a.innerHTML='<i aria-hidden="true">'+icon+'</i><strong></strong><small></small><b style="margin-top:auto;color:#fff3cf;font-size:10px;font-weight:1000"></b>';
    return a;
  }

  function installVitrine(){
    var section=document.querySelector('section[aria-label="Portes publiques DIGIYLYFE"]');
    if(!section)return false;
    var grid=ensureGrid(section),pro=section.querySelector('[data-digiy-professional-door]'),health=section.querySelector('[data-digiy-health-door]');
    if(!pro){pro=card('professional','🏛️','https://digiylyfe.com/territoire.html');grid.appendChild(pro)}
    if(!health){health=card('health','🩺','https://digiylyfe.com/territoire.html?need=health_care#resultsSection');grid.appendChild(health)}
    function refresh(){
      var t=COPY[lang()]||COPY.fr,pTitle=pro.querySelector('strong'),pText=pro.querySelector('small'),pCta=pro.querySelector('b'),hTitle=health.querySelector('strong'),hText=health.querySelector('small'),hCta=health.querySelector('b');
      if(pTitle)pTitle.textContent=t.pro.title;if(pText)pText.textContent=t.pro.text;if(pCta)pCta.textContent=t.pro.cta;
      if(hTitle)hTitle.textContent=t.health.title;if(hText)hText.textContent=t.health.text;if(hCta)hCta.textContent=t.health.cta;
      pro.setAttribute('aria-label',t.pro.title);health.setAttribute('aria-label',t.health.title);
    }
    refresh();
    if(!section.getAttribute('data-digiy-pro-health-observer')){section.setAttribute('data-digiy-pro-health-observer','1');new MutationObserver(refresh).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']})}
    return true;
  }

  function cityConfig(){
    var p=location.pathname.replace(/\/+$/,'');
    if(/\/sarlat\.html$/i.test(p))return{territory:'vallee-dordogne',local:'sarlat',bordeaux:false};
    if(/\/bordeaux\.html$/i.test(p))return{territory:'bordeaux',local:'',bordeaux:true};
    return null;
  }

  function cityTarget(cfg){
    var q=new URLSearchParams(location.search),u=new URL('/territoire.html',location.origin),local=cfg.local||(q.get('local')||'');
    u.searchParams.set('zone',cfg.territory);
    u.searchParams.set('need','health_care');
    if(local&&local!=='all')u.searchParams.set('local',local);
    u.searchParams.set('lang',lang());
    u.hash='resultsSection';
    return u.pathname+u.search+u.hash;
  }

  var cityBusy=false;
  function installCity(){
    if(cityBusy)return false;
    var cfg=cityConfig(),root=document.getElementById('needs');if(!cfg||!root)return false;
    cityBusy=true;
    var health=root.querySelector('[data-digiy-health-city-door]');
    if(!health){
      health=document.createElement('button');health.type='button';health.className='need';health.setAttribute('data-digiy-health-city-door','1');
      var icon=document.createElement('strong');icon.textContent='🩺';var title=document.createElement('span');title.setAttribute('data-digiy-health-city-title','1');health.append(icon,title);
      var buttons=Array.prototype.slice.call(root.querySelectorAll('.need')),pro=buttons.find(function(b){var s=b.querySelector('strong');return s&&s.textContent.trim()==='🏛️'});
      if(pro&&pro.nextSibling)root.insertBefore(health,pro.nextSibling);else if(pro)root.appendChild(health);else root.appendChild(health);
      health.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();location.href=cityTarget(cfg)});
    }
    var t=COPY[lang()]||COPY.fr,titleEl=health.querySelector('[data-digiy-health-city-title]')||health.querySelector('span');if(titleEl)titleEl.textContent=t.health.title;
    health.setAttribute('aria-label',t.health.title+' · '+t.health.text);health.title=t.health.text;
    if(cfg.bordeaux){var lead=document.getElementById('needLead');if(lead)lead.textContent=t.bordeauxLead}
    if(!root.getAttribute('data-digiy-health-city-observer')){
      root.setAttribute('data-digiy-health-city-observer','1');
      var pending=false;new MutationObserver(function(){if(pending)return;pending=true;requestAnimationFrame(function(){pending=false;installCity()})}).observe(root,{childList:true});
    }
    cityBusy=false;return true;
  }

  if(!installVitrine()){
    var tries=0,timer=setInterval(function(){tries++;if(installVitrine()||tries>40)clearInterval(timer)},125);
  }
  if(cityConfig()){
    if(!installCity()){
      var ctries=0,ctimer=setInterval(function(){ctries++;if(installCity()||ctries>40)clearInterval(ctimer)},125);
    }
    document.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('#zones,[data-l],[data-lang]'))setTimeout(installCity,80)});
    window.addEventListener('popstate',function(){setTimeout(installCity,40)});
  }
})();
