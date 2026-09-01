/* DIGIYLYFE — Portes vitrine : Services professionnels + Santé & soins V1
 * Catégories publiques uniquement. Aucun professionnel fictif n'est créé.
 * PWA / service worker : hors périmètre de ce module.
 */
(function(){
  'use strict';
  if(window.DIGIY_VITRINE_PRO_HEALTH_V1)return;
  window.DIGIY_VITRINE_PRO_HEALTH_V1=true;

  var COPY={
    fr:{
      pro:{title:'SERVICES PROFESSIONNELS',text:'Avocat · Notaire · Architecte · Comptable · Géomètre · Assureur',cta:'Voir les professionnels →'},
      health:{title:'SANTÉ & SOINS',text:'Médecin · Dentiste · Infirmier · Sage-femme · Aide à la personne',cta:'Ouvrir Santé & soins →'}
    },
    en:{
      pro:{title:'PROFESSIONAL SERVICES',text:'Lawyer · Notary · Architect · Accountant · Surveyor · Insurer',cta:'View professionals →'},
      health:{title:'HEALTH & CARE',text:'Doctor · Dentist · Nurse · Midwife · Personal care',cta:'Open Health & care →'}
    },
    es:{
      pro:{title:'SERVICIOS PROFESIONALES',text:'Abogado · Notario · Arquitecto · Contable · Topógrafo · Asegurador',cta:'Ver profesionales →'},
      health:{title:'SALUD Y CUIDADOS',text:'Médico · Dentista · Enfermería · Matrona · Ayuda a la persona',cta:'Abrir Salud y cuidados →'}
    },
    pt:{
      pro:{title:'SERVIÇOS PROFISSIONAIS',text:'Advogado · Notário · Arquiteto · Contabilista · Topógrafo · Segurador',cta:'Ver profissionais →'},
      health:{title:'SAÚDE & CUIDADOS',text:'Médico · Dentista · Enfermeiro · Parteira · Apoio à pessoa',cta:'Abrir Saúde & cuidados →'}
    },
    it:{
      pro:{title:'SERVIZI PROFESSIONALI',text:'Avvocato · Notaio · Architetto · Commercialista · Geometra · Assicuratore',cta:'Vedi professionisti →'},
      health:{title:'SALUTE & ASSISTENZA',text:'Medico · Dentista · Infermiere · Ostetrica · Assistenza alla persona',cta:'Apri Salute & assistenza →'}
    },
    de:{
      pro:{title:'PROFESSIONELLE DIENSTE',text:'Anwalt · Notar · Architekt · Buchhalter · Vermesser · Versicherer',cta:'Profis ansehen →'},
      health:{title:'GESUNDHEIT & PFLEGE',text:'Arzt · Zahnarzt · Pflegekraft · Hebamme · Alltagshilfe',cta:'Gesundheit & Pflege öffnen →'}
    },
    nl:{
      pro:{title:'PROFESSIONELE DIENSTEN',text:'Advocaat · Notaris · Architect · Boekhouder · Landmeter · Verzekeraar',cta:'Bekijk professionals →'},
      health:{title:'GEZONDHEID & ZORG',text:'Arts · Tandarts · Verpleegkundige · Verloskundige · Persoonlijke hulp',cta:'Open Gezondheid & zorg →'}
    },
    ar:{
      pro:{title:'الخدمات المهنية',text:'محامٍ · موثق · مهندس معماري · محاسب · مسّاح · تأمين',cta:'عرض المهنيين ←'},
      health:{title:'الصحة والرعاية',text:'طبيب · طبيب أسنان · ممرض · قابلة · مساعدة شخصية',cta:'فتح الصحة والرعاية ←'}
    }
  };

  function lang(){
    var l=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();
    return COPY[l]?l:'fr';
  }

  function ensureGrid(section){
    var grid=section.querySelector('.publicGrid');
    if(grid)return grid;
    grid=document.createElement('div');
    grid.className='publicGrid';
    var lead=section.querySelector('.publicLeadDoor');
    if(lead)lead.insertAdjacentElement('afterend',grid);else section.appendChild(grid);
    return grid;
  }

  function card(type,icon,href){
    var a=document.createElement('a');
    a.className='publicCard';
    a.href=href;
    a.setAttribute('data-digiy-'+type+'-door','1');
    a.innerHTML='<i aria-hidden="true">'+icon+'</i><strong></strong><small></small><b style="margin-top:auto;color:#fff3cf;font-size:10px;font-weight:1000"></b>';
    return a;
  }

  function install(){
    var section=document.querySelector('section[aria-label="Portes publiques DIGIYLYFE"]');
    if(!section)return false;
    var grid=ensureGrid(section);

    var pro=section.querySelector('[data-digiy-professional-door]');
    if(!pro){
      pro=card('professional','🏛️','https://digiylyfe.com/territoire.html');
      grid.appendChild(pro);
    }

    var health=section.querySelector('[data-digiy-health-door]');
    if(!health){
      health=card('health','🩺','https://digiylyfe.com/territoire.html?need=health_care');
      grid.appendChild(health);
    }

    function refresh(){
      var t=COPY[lang()]||COPY.fr;
      var pTitle=pro.querySelector('strong'),pText=pro.querySelector('small'),pCta=pro.querySelector('b');
      var hTitle=health.querySelector('strong'),hText=health.querySelector('small'),hCta=health.querySelector('b');
      if(pTitle)pTitle.textContent=t.pro.title;if(pText)pText.textContent=t.pro.text;if(pCta)pCta.textContent=t.pro.cta;
      if(hTitle)hTitle.textContent=t.health.title;if(hText)hText.textContent=t.health.text;if(hCta)hCta.textContent=t.health.cta;
      pro.setAttribute('aria-label',t.pro.title);health.setAttribute('aria-label',t.health.title);
    }

    refresh();
    if(!section.getAttribute('data-digiy-pro-health-observer')){
      section.setAttribute('data-digiy-pro-health-observer','1');
      new MutationObserver(refresh).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});
    }
    return true;
  }

  if(!install()){
    var tries=0;
    var timer=setInterval(function(){
      tries++;
      if(install()||tries>40)clearInterval(timer);
    },125);
  }
})();
