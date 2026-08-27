/* DIGIYLYFE — projection commerciale Dakar V5
 * - Retrait défensif FG NAILS.
 * - La porte pro Dakar reste un vrai lien HTML.
 * - Les exemples ne sont JAMAIS comptés comme professionnels réels.
 * - Dakar : 9 modules x 3 cartes de projection = 27 cartes.
 * - Un filtre métier affiche ses 3 cartes ; sans filtre, les 27 sont visibles.
 */
(function(){
  'use strict';

  var LANGS=['fr','en','es','pt','it','de','nl','ar'];
  var ORDER=['announcements','transport','artisan','accommodation','food','shopping','beauty','jobs','guidance'];
  var ZONES={
    'plateau':'Plateau',
    'almadies-ngor':'Almadies · Ngor',
    'mermoz-sacre-coeur':'Mermoz · Sacré-Cœur',
    'point-e-fann':'Point E · Fann',
    'yoff-ouakam-mamelles':'Yoff · Ouakam · Mamelles'
  };

  function dakarPack(){var d=window.DIGIY_DAKAR_DATA,l=lang();return d&&d.packs?(d.packs[l]||d.packs.fr):null;}

  var COPY={
    fr:{badge:'EXEMPLE · PLACE À PRENDRE',summary:'Exemple de présence DIGIYLYFE : cette carte sert à montrer au professionnel comment son activité peut apparaître.',meta:'Carte de démonstration · pas encore un adhérent',cta:'PRENDRE CETTE PLACE →',empty:'Aucun adhérent réel encore pour ce filtre. Les cartes ci-dessous montrent les places ouvertes.',joinPrefix:'VOUS ÊTES ',joinSuffix:' ? REJOINDRE DIGIY DAKAR →',pro:'PROFESSIONNEL À DAKAR',allTitle:'PROJECTION DAKAR · 27 CARTES EXEMPLES · 3 PAR MODULE',filteredTitle:'3 CARTES EXEMPLES POUR CE MODULE · PLACES À PRENDRE'},
    en:{badge:'EXAMPLE · OPEN PLACE',summary:'DIGIYLYFE presence example showing professionals how their activity can appear.',meta:'Demonstration card · not yet a member',cta:'TAKE THIS PLACE →',empty:'No real member yet for this filter. The cards below show open places.',joinPrefix:'ARE YOU ',joinSuffix:'? JOIN DIGIY DAKAR →',pro:'A PROFESSIONAL IN DAKAR',allTitle:'DAKAR PROJECTION · 27 EXAMPLE CARDS · 3 PER MODULE',filteredTitle:'3 EXAMPLE CARDS FOR THIS MODULE · OPEN PLACES'},
    es:{badge:'EJEMPLO · LUGAR DISPONIBLE',summary:'Ejemplo de presencia DIGIYLYFE para mostrar al profesional cómo puede aparecer su actividad.',meta:'Tarjeta de demostración · todavía no es miembro',cta:'OCUPAR ESTE LUGAR →',empty:'Todavía no hay un miembro real para este filtro. Las tarjetas muestran lugares disponibles.',joinPrefix:'¿ES ',joinSuffix:'? ÚNASE A DIGIY DAKAR →',pro:'PROFESIONAL EN DAKAR',allTitle:'PROYECCIÓN DAKAR · 27 TARJETAS DE EJEMPLO · 3 POR MÓDULO',filteredTitle:'3 TARJETAS DE EJEMPLO PARA ESTE MÓDULO'},
    pt:{badge:'EXEMPLO · LUGAR ABERTO',summary:'Exemplo de presença DIGIYLYFE para mostrar ao profissional como a sua atividade pode aparecer.',meta:'Cartão de demonstração · ainda não é membro',cta:'OCUPAR ESTE LUGAR →',empty:'Ainda não há membro real para este filtro. Os cartões mostram lugares abertos.',joinPrefix:'É ',joinSuffix:'? ADIRA À DIGIY DAKAR →',pro:'PROFISSIONAL EM DAKAR',allTitle:'PROJEÇÃO DAKAR · 27 CARTÕES DE EXEMPLO · 3 POR MÓDULO',filteredTitle:'3 CARTÕES DE EXEMPLO PARA ESTE MÓDULO'},
    it:{badge:'ESEMPIO · POSTO DISPONIBILE',summary:'Esempio di presenza DIGIYLYFE per mostrare al professionista come può apparire la sua attività.',meta:'Carta dimostrativa · non ancora membro',cta:'PRENDI QUESTO POSTO →',empty:'Nessun membro reale ancora per questo filtro. Le carte mostrano i posti disponibili.',joinPrefix:'SEI ',joinSuffix:'? ENTRA IN DIGIY DAKAR →',pro:'UN PROFESSIONISTA A DAKAR',allTitle:'PROIEZIONE DAKAR · 27 CARTE ESEMPIO · 3 PER MODULO',filteredTitle:'3 CARTE ESEMPIO PER QUESTO MODULO'},
    de:{badge:'BEISPIEL · FREIER PLATZ',summary:'DIGIYLYFE-Beispielkarte, die zeigt, wie ein Betrieb erscheinen kann.',meta:'Demokarte · noch kein Mitglied',cta:'DIESEN PLATZ NEHMEN →',empty:'Noch kein echtes Mitglied für diesen Filter. Die Karten zeigen freie Plätze.',joinPrefix:'SIND SIE ',joinSuffix:'? DIGIY DAKAR BEITRETEN →',pro:'PROFI IN DAKAR',allTitle:'DAKAR-PROJEKTION · 27 BEISPIELKARTEN · 3 PRO MODUL',filteredTitle:'3 BEISPIELKARTEN FÜR DIESES MODUL'},
    nl:{badge:'VOORBEELD · OPEN PLAATS',summary:'DIGIYLYFE-voorbeeldkaart die laat zien hoe een professionele activiteit kan verschijnen.',meta:'Demokaart · nog geen lid',cta:'NEEM DEZE PLAATS →',empty:'Nog geen echt lid voor dit filter. De kaarten tonen open plaatsen.',joinPrefix:'BENT U ',joinSuffix:'? WORD LID VAN DIGIY DAKAR →',pro:'PROFESSIONAL IN DAKAR',allTitle:'DAKAR PROJECTIE · 27 VOORBEELDKAARTEN · 3 PER MODULE',filteredTitle:'3 VOORBEELDKAARTEN VOOR DEZE MODULE'},
    ar:{badge:'مثال · مكان متاح',summary:'بطاقة DIGIYLYFE تجريبية توضح للمهني كيف يمكن أن يظهر نشاطه.',meta:'بطاقة تجريبية · ليست عضواً بعد',cta:'احجز هذا المكان ←',empty:'لا يوجد عضو حقيقي بعد لهذا الاختيار. البطاقات أدناه تعرض الأماكن المتاحة.',joinPrefix:'هل أنت ',joinSuffix:'؟ انضم إلى DIGIY DAKAR ←',pro:'مهني في داكار',allTitle:'تصور داكار · 27 بطاقة نموذجية · 3 لكل وحدة',filteredTitle:'3 بطاقات نموذجية لهذه الوحدة'}
  };

  var PRO_NAMES={transport:'CHAUFFEUR / TRANSPORT',artisan:'ARTISAN',accommodation:'PRO DE L’HÉBERGEMENT / LOCATION',food:'RESTAURATEUR',shopping:'COMMERÇANT',beauty:'PRO DE LA BEAUTÉ / BIEN-ÊTRE',jobs:'PRO DE L’EMPLOI / MISSIONS',announcements:'PRO DES ANNONCES / SERVICES',guidance:'PRO DE LA COMMUNICATION'};

  var EXAMPLES={
    transport:[
      {title:'🚗 Chauffeur privé',zone:'plateau',services:['Transferts AIBD','Courses Dakar','WhatsApp direct']},
      {title:'🚐 Transfert aéroport',zone:'almadies-ngor',services:['AIBD ↔ Dakar','Accueil voyageur','Réservation directe']},
      {title:'🚘 Driver affaires',zone:'point-e-fann',services:['Mise à disposition','Entreprises','Trajets sur réservation']}
    ],
    artisan:[
      {title:'🔧 Plombier dépannage',zone:'mermoz-sacre-coeur',services:['Fuite d’eau','Dépannage','Intervention directe']},
      {title:'⚡ Électricien bâtiment',zone:'yoff-ouakam-mamelles',services:['Installation','Panne électrique','Devis direct']},
      {title:'🪚 Menuisier / poseur',zone:'plateau',services:['Fabrication','Pose','Travaux sur mesure']}
    ],
    accommodation:[
      {title:'🏠 Studio meublé',zone:'point-e-fann',services:['Courte durée','Réservation directe','WhatsApp']},
      {title:'🏢 Appartement équipé',zone:'almadies-ngor',services:['Séjour Dakar','Location directe','Disponibilités']},
      {title:'🛏️ Chambre / résidence',zone:'yoff-ouakam-mamelles',services:['Nuitée','Séjour professionnel','Contact direct']}
    ],
    food:[
      {title:'🍽️ Restaurant local',zone:'plateau',services:['Menu du jour','Réservation','WhatsApp direct']},
      {title:'🥂 Table internationale',zone:'almadies-ngor',services:['Déjeuner','Dîner','Réservation directe']},
      {title:'🥙 Snack / restauration rapide',zone:'mermoz-sacre-coeur',services:['Sur place','À emporter','Commande directe']}
    ],
    shopping:[
      {title:'🛍️ Boutique mode',zone:'mermoz-sacre-coeur',services:['Vêtements','Nouveautés','Commande WhatsApp']},
      {title:'🏺 Maison & décoration',zone:'plateau',services:['Maison','Décoration','Catalogue direct']},
      {title:'🥭 Épicerie / produits locaux',zone:'yoff-ouakam-mamelles',services:['Produits locaux','Commande','Contact direct']}
    ],
    beauty:[
      {title:'💅 Onglerie & beauté',zone:'mermoz-sacre-coeur',services:['Ongles','Beauté','Rendez-vous direct']},
      {title:'💇 Coiffure & soins',zone:'point-e-fann',services:['Coiffure','Soins','WhatsApp']},
      {title:'🌿 Bien-être / massage',zone:'almadies-ngor',services:['Massage','Bien-être','Réservation directe']}
    ],
    jobs:[
      {title:'💼 Commerce qui recrute',zone:'plateau',services:['Vendeur(se)','Candidature directe','Mission locale']},
      {title:'👨‍🍳 Restaurant qui recrute',zone:'almadies-ngor',services:['Cuisine','Service','Candidature directe']},
      {title:'🤝 Missions terrain',zone:'mermoz-sacre-coeur',services:['Commercial','Animation','Mission ponctuelle']}
    ],
    announcements:[
      {title:'⚡ Dépannage express',zone:'yoff-ouakam-mamelles',services:['Besoin urgent','Service local','Contact direct']},
      {title:'🧰 Location de matériel',zone:'mermoz-sacre-coeur',services:['Matériel','Disponibilité','Réservation directe']},
      {title:'🎪 Services événementiels',zone:'almadies-ngor',services:['Événement','Prestataire','Demande de devis']}
    ],
    guidance:[
      {title:'🎙️ Guide local',zone:'plateau',services:['Conseils Dakar','Orientation','Contact direct']},
      {title:'🗣️ Ambassadeur de quartier',zone:'yoff-ouakam-mamelles',services:['Bonnes adresses','Vie locale','Mise en relation']},
      {title:'📣 Conseiller / voix locale',zone:'almadies-ngor',services:['Information locale','Recommandations','Contact direct']}
    ]
  };

  function params(){try{return new URLSearchParams(location.search);}catch(e){return new URLSearchParams();}}
  function lang(){var l=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();return LANGS.indexOf(l)>=0?l:'fr';}
  function isDakar(){return (params().get('zone')||'')==='dakar';}
  function isFg(card){if(!card)return false;var text=(card.textContent||'').toLowerCase();return /fg\s*nails/i.test(text)||!!card.querySelector('a[href*="f-g-nails.digiylyfe.com"]');}
  function selectedLocal(){var v=params().get('local')||'';return v==='all'?'':v;}
  function zoneLabelFor(example){var local=selectedLocal();if(local)return ZONES[local]||local.replace(/-/g,' ');return ZONES[example.zone]||'Dakar';}
  function adhesionUrl(need){var p=params(),u=new URL('/adhesion-dakar.html',location.origin),local=p.get('local')||'';if(need)u.searchParams.set('need',need);if(local&&local!=='all')u.searchParams.set('local',local);u.searchParams.set('lang',lang());return u.pathname+u.search;}

  function configureJoin(){
    var a=document.getElementById('dakarProJoin')||document.querySelector('[data-digiy-dakar-pro-join]');
    if(!a)return;
    if(!isDakar()){a.classList.remove('show');return;}
    var need=params().get('need')||'',pk=dakarPack(),name=pk&&pk.needs[need]?pk.needs[need]:(pk?pk.projection.pro:'PROFESSIONNEL À DAKAR');
    a.classList.add('show');if(need==='guidance'){a.href='https://pro-action-digiy.digiylyfe.com/';a.textContent=pk?pk.projection.voiceTry:'ESSAYER LA VOIX →';}else{a.href=adhesionUrl(need);a.textContent=pk?pk.projection.join:name;}
  }

  function projectionTitle(need,count){
    var pk=dakarPack(),t=pk?pk.projection:(COPY[lang()]||COPY.fr),d=document.createElement('div');
    d.setAttribute('data-dakar-projection-title','1');
    d.style.cssText='grid-column:1/-1;margin:6px 0 2px;padding:11px 13px;border-radius:16px;border:1px solid rgba(246,196,83,.40);background:rgba(246,196,83,.09);color:#fff2bf;font-size:11px;font-weight:1000;letter-spacing:.04em;text-align:center';
    d.textContent=need?t.filteredTitle:t.allTitle;
    return d;
  }

  function placeholderCard(need,example,index){
    var l=lang(),pk=dakarPack(),t=pk?pk.projection:(COPY[l]||COPY.fr),row=pk&&pk.ex&&pk.ex[need]?pk.ex[need][index]:null,article=document.createElement('article');if(row)example={title:row[0],zone:row[1],services:row[2]};
    article.className='card';article.setAttribute('data-dakar-placeholder',need+'-'+index);
    article.style.borderStyle='dashed';article.style.borderColor='rgba(246,196,83,.62)';article.style.background='linear-gradient(145deg,rgba(246,196,83,.10),rgba(34,197,94,.08))';

    var badge=document.createElement('div');badge.textContent=t.badge;badge.style.cssText='display:inline-flex;margin-bottom:10px;padding:5px 8px;border-radius:999px;border:1px solid rgba(246,196,83,.50);color:#fff1bd;font-size:9px;font-weight:1000;letter-spacing:.04em';
    var h=document.createElement('h3');h.textContent=example.title;
    var s=document.createElement('p');s.className='summary';s.textContent=t.summary;
    var m=document.createElement('div');m.className='meta';m.textContent='📍 '+zoneLabelFor(example)+' · DAKAR\n🪪 '+t.meta;m.style.whiteSpace='pre-line';
    var sv=document.createElement('div');sv.className='services';
    (example.services||[]).concat([t.qr||'Carte digitale · QR',t.price||'19 900 FCFA / mois',t.commission||'0 % commission']).forEach(function(x){var sp=document.createElement('span');sp.className='service';sp.textContent=x;sv.appendChild(sp);});
    var ac=document.createElement('div');ac.className='actions';var a=document.createElement('a'),du=new URL('/demo-dakar.html',location.origin),local=selectedLocal()||example.zone;du.searchParams.set('need',need);du.searchParams.set('variant',String(index+1));if(local)du.searchParams.set('local',local);du.searchParams.set('lang',l);a.href=du.pathname+du.search;a.textContent=need==='guidance'?(t.voice||t.demo||t.cta):(t.demo||t.cta);ac.appendChild(a);
    article.append(badge,h,s,m,sv,ac);return article;
  }

  function removeProjection(results){
    Array.prototype.slice.call(results.querySelectorAll('[data-dakar-placeholder],[data-dakar-projection-title]')).forEach(function(n){n.remove();});
  }

  function renderProjection(){
    var results=document.getElementById('results');if(!results||!isDakar())return;
    Array.prototype.slice.call(results.querySelectorAll('.card')).forEach(function(card){if(isFg(card))card.remove();});
    removeProjection(results);

    var t=COPY[lang()]||COPY.fr,empty=results.querySelector('.empty');if(empty&&empty.textContent!==t.empty)empty.textContent=t.empty;
    var need=params().get('need')||'',wanted=(need&&ORDER.indexOf(need)>=0)?[need]:ORDER;
    var count=0;
    wanted.forEach(function(id){count+=(EXAMPLES[id]||[]).length;});
    if(count)results.appendChild(projectionTitle(need,count));
    wanted.forEach(function(id){(EXAMPLES[id]||[]).forEach(function(ex,i){results.appendChild(placeholderCard(id,ex,i+1));});});
    configureJoin();
  }

  function mutationNeedsWork(muts){
    for(var i=0;i<muts.length;i++){
      var nodes=[].slice.call(muts[i].addedNodes||[]).concat([].slice.call(muts[i].removedNodes||[]));
      for(var j=0;j<nodes.length;j++){
        var n=nodes[j];
        if(n.nodeType!==1)continue;
        if(n.hasAttribute('data-dakar-placeholder')||n.hasAttribute('data-dakar-projection-title'))continue;
        return true;
      }
    }
    return false;
  }

  function boot(){
    var results=document.getElementById('results');if(!results)return false;
    renderProjection();
    new MutationObserver(function(muts){if(mutationNeedsWork(muts))setTimeout(renderProjection,0);}).observe(results,{childList:true});
    document.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('#needs,#zones'))setTimeout(renderProjection,25);});
    window.addEventListener('popstate',function(){setTimeout(renderProjection,25);});
    return true;
  }
  if(!boot()){var o=new MutationObserver(function(){if(boot())o.disconnect();});o.observe(document.documentElement,{childList:true,subtree:true});}
})();