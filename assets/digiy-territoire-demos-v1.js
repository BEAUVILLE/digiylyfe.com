/* DIGIYLYFE — pont territoire MAITRE V4
 * Dakar : LA VOIX conserve son pont historique.
 * Global : traduit health_care et projette 3 exemples Santé & soins.
 * Les exemples Santé ne sont jamais comptés comme professionnels réels.
 */
(function(){
  'use strict';

  function params(){
    try{return new URLSearchParams(location.search)}catch(e){return new URLSearchParams()}
  }

  var HEALTH={
    fr:{title:'Santé & soins',meta:'MÉDECIN · DENTISTE · INFIRMIER · SAGE-FEMME · AIDE À LA PERSONNE',badge:'EXEMPLE · PLACE À PRENDRE',projection:'3 EXEMPLES SANTÉ & SOINS · PLACES À PRENDRE',summary:'Exemple de présence DIGIYLYFE : cette carte montre comment un professionnel de santé ou du soin peut apparaître.',demoMeta:'Carte de démonstration · pas encore un adhérent',cta:'PRENDRE CETTE PLACE →',cards:[['🩺 Médecin généraliste',['Consultation','Cabinet / permanence','Contact direct']],['🦷 Dentiste',['Soins dentaires','Rendez-vous','Contact direct']],['🤲 Soins & accompagnement à domicile',['Infirmier / infirmière','Sage-femme','Aide à la personne']]]},
    en:{title:'Health & care',meta:'DOCTOR · DENTIST · NURSE · MIDWIFE · PERSONAL ASSISTANCE',badge:'EXAMPLE · OPEN PLACE',projection:'3 HEALTH & CARE EXAMPLES · OPEN PLACES',summary:'DIGIYLYFE presence example showing how a health or care professional can appear.',demoMeta:'Demonstration card · not yet a member',cta:'TAKE THIS PLACE →',cards:[['🩺 General practitioner',['Consultation','Practice / clinic','Direct contact']],['🦷 Dentist',['Dental care','Appointments','Direct contact']],['🤲 Home care & support',['Nurse','Midwife','Personal assistance']]]},
    es:{title:'Salud y cuidados',meta:'MÉDICO · DENTISTA · ENFERMERÍA · MATRONA · AYUDA A LA PERSONA',badge:'EJEMPLO · LUGAR DISPONIBLE',projection:'3 EJEMPLOS DE SALUD Y CUIDADOS · LUGARES DISPONIBLES',summary:'Ejemplo de presencia DIGIYLYFE que muestra cómo puede aparecer un profesional de salud o cuidados.',demoMeta:'Tarjeta de demostración · todavía no es miembro',cta:'OCUPAR ESTE LUGAR →',cards:[['🩺 Médico general',['Consulta','Consultorio / clínica','Contacto directo']],['🦷 Dentista',['Atención dental','Citas','Contacto directo']],['🤲 Cuidados y apoyo a domicilio',['Enfermería','Matrona','Ayuda a la persona']]]},
    pt:{title:'Saúde & cuidados',meta:'MÉDICO · DENTISTA · ENFERMEIRO · PARTEIRA · APOIO À PESSOA',badge:'EXEMPLO · LUGAR ABERTO',projection:'3 EXEMPLOS SAÚDE & CUIDADOS · LUGARES ABERTOS',summary:'Exemplo de presença DIGIYLYFE que mostra como um profissional de saúde ou cuidados pode aparecer.',demoMeta:'Cartão de demonstração · ainda não é membro',cta:'OCUPAR ESTE LUGAR →',cards:[['🩺 Médico de clínica geral',['Consulta','Consultório / clínica','Contacto direto']],['🦷 Dentista',['Cuidados dentários','Marcações','Contacto direto']],['🤲 Cuidados e apoio ao domicílio',['Enfermeiro','Parteira','Apoio à pessoa']]]},
    de:{title:'Gesundheit & Pflege',meta:'ARZT · ZAHNARZT · PFLEGEKRAFT · HEBAMME · ALLTAGSHILFE',badge:'BEISPIEL · FREIER PLATZ',projection:'3 BEISPIELE GESUNDHEIT & PFLEGE · FREIE PLÄTZE',summary:'DIGIYLYFE-Beispielkarte, die zeigt, wie ein Gesundheits- oder Pflegeprofi erscheinen kann.',demoMeta:'Demokarte · noch kein Mitglied',cta:'DIESEN PLATZ NEHMEN →',cards:[['🩺 Hausarzt',['Sprechstunde','Praxis / Klinik','Direktkontakt']],['🦷 Zahnarzt',['Zahnbehandlung','Termine','Direktkontakt']],['🤲 Pflege & Unterstützung zu Hause',['Pflegekraft','Hebamme','Alltagshilfe']]]},
    it:{title:'Salute & assistenza',meta:'MEDICO · DENTISTA · INFERMIERE · OSTETRICA · ASSISTENZA ALLA PERSONA',badge:'ESEMPIO · POSTO DISPONIBILE',projection:'3 ESEMPI SALUTE & ASSISTENZA · POSTI DISPONIBILI',summary:'Esempio di presenza DIGIYLYFE che mostra come può apparire un professionista della salute o assistenza.',demoMeta:'Carta dimostrativa · non ancora membro',cta:'PRENDI QUESTO POSTO →',cards:[['🩺 Medico di base',['Visita','Studio / clinica','Contatto diretto']],['🦷 Dentista',['Cure dentali','Appuntamenti','Contatto diretto']],['🤲 Cure e assistenza a domicilio',['Infermiere','Ostetrica','Assistenza alla persona']]]},
    nl:{title:'Gezondheid & zorg',meta:'ARTS · TANDARTS · VERPLEEGKUNDIGE · VERLOSKUNDIGE · PERSOONLIJKE HULP',badge:'VOORBEELD · OPEN PLAATS',projection:'3 VOORBEELDEN GEZONDHEID & ZORG · OPEN PLAATSEN',summary:'DIGIYLYFE-voorbeeldkaart die laat zien hoe een zorgprofessional kan verschijnen.',demoMeta:'Demokaart · nog geen lid',cta:'NEEM DEZE PLAATS →',cards:[['🩺 Huisarts',['Consultatie','Praktijk / kliniek','Direct contact']],['🦷 Tandarts',['Tandzorg','Afspraken','Direct contact']],['🤲 Zorg & ondersteuning aan huis',['Verpleegkundige','Verloskundige','Persoonlijke hulp']]]},
    ar:{title:'الصحة والرعاية',meta:'طبيب · طبيب أسنان · ممرض · قابلة · مساعدة شخصية',badge:'مثال · مكان متاح',projection:'3 أمثلة للصحة والرعاية · أماكن متاحة',summary:'بطاقة DIGIYLYFE تجريبية توضح كيف يمكن أن يظهر مهني في الصحة أو الرعاية.',demoMeta:'بطاقة تجريبية · ليست عضواً بعد',cta:'احجز هذا المكان ←',cards:[['🩺 طبيب عام',['استشارة','عيادة','تواصل مباشر']],['🦷 طبيب أسنان',['عناية بالأسنان','مواعيد','تواصل مباشر']],['🤲 رعاية ومساعدة منزلية',['ممرض','قابلة','مساعدة شخصية']]]}
  };

  function currentLang(){
    var q=(params().get('lang')||'').slice(0,2).toLowerCase();
    var h=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();
    return HEALTH[q]?q:(HEALTH[h]?h:'fr');
  }

  function applyDakarVoice(){
    if((params().get('zone')||'')!=='dakar')return;
    var d=window.DIGIY_DAKAR_DATA;
    var l=(document.documentElement.lang||params().get('lang')||'fr').slice(0,2).toLowerCase();
    var pk=d&&d.packs?(d.packs[l]||d.packs.fr):null;
    var j=document.getElementById('dakarProJoin');
    if(j&&params().get('need')==='guidance'&&pk){
      j.href='https://pro-action-digiy.digiylyfe.com/';
      j.textContent=pk.projection.voiceTry;
    }
  }

  function healthButton(){
    var buttons=document.querySelectorAll('#needs .need');
    for(var i=0;i<buttons.length;i++){
      var icon=buttons[i].querySelector('strong');
      var label=buttons[i].querySelector('span');
      if((icon&&icon.textContent.trim()==='🩺') || (label&&label.textContent.trim().toLowerCase()==='health_care'))return buttons[i];
    }
    return null;
  }

  function applyHealthLabel(){
    var b=healthButton();
    if(!b)return false;
    var t=HEALTH[currentLang()]||HEALTH.fr;
    var label=b.querySelector('span');
    var meta=b.querySelector('small');
    if(label&&label.textContent!==t.title)label.textContent=t.title;
    if(meta&&meta.textContent!==t.meta)meta.textContent=t.meta;
    return true;
  }

  function territoryLabel(){
    var h=document.getElementById('territoryName');
    var v=h&&h.textContent?h.textContent.replace(/^DIGIY\s+/i,'').trim():'';
    return v||((params().get('zone')||'').replace(/-/g,' ').toUpperCase())||'DIGIY';
  }

  function adhesionUrl(){
    var z=params().get('zone')||'',map={dakar:'/adhesion-dakar.html','petite-cote':'/adhesion-petite-cote.html','vallee-dordogne':'/adhesion-dordogne.html',bordeaux:'/adhesion-bordeaux.html'},u=new URL(map[z]||'/inscription.html',location.origin),local=params().get('local')||'';
    u.searchParams.set('need','health_care');
    if(local&&local!=='all')u.searchParams.set('local',local);
    u.searchParams.set('lang',currentLang());
    return u.pathname+u.search;
  }

  function removeHealthExamples(root){
    if(!root)return;
    root.querySelectorAll('[data-digiy-health-example],[data-digiy-health-title]').forEach(function(n){n.remove()});
  }

  function healthCard(t,row,index){
    var article=document.createElement('article');article.className='card';article.setAttribute('data-digiy-health-example',String(index));article.style.borderStyle='dashed';article.style.borderColor='rgba(246,196,83,.62)';article.style.background='linear-gradient(145deg,rgba(246,196,83,.10),rgba(34,197,94,.08))';
    var badge=document.createElement('div');badge.textContent=t.badge;badge.style.cssText='display:inline-flex;margin-bottom:10px;padding:5px 8px;border-radius:999px;border:1px solid rgba(246,196,83,.50);color:#fff1bd;font-size:9px;font-weight:1000;letter-spacing:.04em';
    var h=document.createElement('h3');h.textContent=row[0];
    var s=document.createElement('p');s.className='summary';s.textContent=t.summary;
    var m=document.createElement('div');m.className='meta';m.textContent='📍 '+territoryLabel()+'\n🪪 '+t.demoMeta;m.style.whiteSpace='pre-line';
    var sv=document.createElement('div');sv.className='services';row[1].forEach(function(v){var sp=document.createElement('span');sp.className='service';sp.textContent=v;sv.appendChild(sp)});
    var ac=document.createElement('div');ac.className='actions';var a=document.createElement('a');a.href=adhesionUrl();a.textContent=t.cta;ac.appendChild(a);
    article.append(badge,h,s,m,sv,ac);return article;
  }

  var healthRendering=false;
  function renderHealthExamples(){
    var root=document.getElementById('results');if(!root)return;
    if((params().get('need')||'')!=='health_care'){removeHealthExamples(root);return;}
    if(root.querySelector('[data-digiy-health-example]'))return;
    var t=HEALTH[currentLang()]||HEALTH.fr;healthRendering=true;
    var title=document.createElement('div');title.setAttribute('data-digiy-health-title','1');title.style.cssText='grid-column:1/-1;margin:6px 0 2px;padding:11px 13px;border-radius:16px;border:1px solid rgba(246,196,83,.40);background:rgba(246,196,83,.09);color:#fff2bf;font-size:11px;font-weight:1000;letter-spacing:.04em;text-align:center';title.textContent=t.projection;root.appendChild(title);
    t.cards.forEach(function(row,i){root.appendChild(healthCard(t,row,i))});healthRendering=false;
  }

  function resultsMutationNeedsWork(muts){
    if(healthRendering)return false;
    for(var i=0;i<muts.length;i++){
      var nodes=[].slice.call(muts[i].addedNodes||[]).concat([].slice.call(muts[i].removedNodes||[]));
      for(var j=0;j<nodes.length;j++){
        var n=nodes[j];if(n.nodeType!==1)continue;
        if(n.hasAttribute('data-digiy-health-example')||n.hasAttribute('data-digiy-health-title'))continue;
        return true;
      }
    }
    return false;
  }

  function settleHealth(){
    var tries=0;
    function tick(){tries++;applyHealthLabel();renderHealthExamples();if(tries<20)setTimeout(tick,100)}
    tick();
  }

  function boot(){
    applyDakarVoice();settleHealth();
    var results=document.getElementById('results');
    if(results)new MutationObserver(function(muts){if(resultsMutationNeedsWork(muts))setTimeout(renderHealthExamples,0)}).observe(results,{childList:true});
    document.addEventListener('click',function(e){
      if(!e.target.closest)return;
      if(e.target.closest('#needs,#zones,[data-lang]')){setTimeout(applyDakarVoice,30);setTimeout(settleHealth,30)}
    });
    window.addEventListener('popstate',function(){applyDakarVoice();settleHealth()});
    window.addEventListener('load',settleHealth,{once:true});
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);
  else boot();
})();
