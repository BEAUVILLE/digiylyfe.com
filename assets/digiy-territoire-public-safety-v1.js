/* DIGIYLYFE — sécurité publication + projection Dakar V4
 * - Retrait défensif FG NAILS.
 * - La porte pro Dakar reste un vrai lien HTML.
 * - Les placeholders ne sont JAMAIS comptés comme professionnels réels.
 * - Sans filtre : 9 exemples de places ouvertes. Avec filtre : 1 exemple métier.
 */
(function(){
  'use strict';

  var LANGS=['fr','en','es','pt','it','de','nl','ar'];
  var COPY={
    fr:{badge:'EXEMPLE · PLACE À PRENDRE',summary:'Voici à quoi peut ressembler une présence DIGIYLYFE dans cette catégorie.',meta:'Emplacement de démonstration · pas encore un adhérent',cta:'PRENDRE CETTE PLACE →',empty:'Aucun adhérent réel encore pour ce filtre. Les cartes ci-dessous montrent les places ouvertes.',joinPrefix:'VOUS ÊTES ',joinSuffix:' ? REJOINDRE DIGIY DAKAR →',pro:'PROFESSIONNEL À DAKAR'},
    en:{badge:'EXAMPLE · OPEN PLACE',summary:'This is how a DIGIYLYFE presence can look in this category.',meta:'Demonstration slot · not yet a member',cta:'TAKE THIS PLACE →',empty:'No real member yet for this filter. The cards below show open places.',joinPrefix:'ARE YOU ',joinSuffix:'? JOIN DIGIY DAKAR →',pro:'A PROFESSIONAL IN DAKAR'},
    es:{badge:'EJEMPLO · LUGAR DISPONIBLE',summary:'Así puede verse una presencia DIGIYLYFE en esta categoría.',meta:'Espacio de demostración · todavía no es miembro',cta:'OCUPAR ESTE LUGAR →',empty:'Todavía no hay un miembro real para este filtro. Las tarjetas muestran lugares disponibles.',joinPrefix:'¿ES ',joinSuffix:'? ÚNASE A DIGIY DAKAR →',pro:'PROFESIONAL EN DAKAR'},
    pt:{badge:'EXEMPLO · LUGAR ABERTO',summary:'Assim pode aparecer uma presença DIGIYLYFE nesta categoria.',meta:'Espaço de demonstração · ainda não é membro',cta:'OCUPAR ESTE LUGAR →',empty:'Ainda não há membro real para este filtro. Os cartões mostram lugares abertos.',joinPrefix:'É ',joinSuffix:'? ADIRA À DIGIY DAKAR →',pro:'PROFISSIONAL EM DAKAR'},
    it:{badge:'ESEMPIO · POSTO DISPONIBILE',summary:'Ecco come può apparire una presenza DIGIYLYFE in questa categoria.',meta:'Spazio dimostrativo · non ancora membro',cta:'PRENDI QUESTO POSTO →',empty:'Nessun membro reale ancora per questo filtro. Le carte mostrano i posti disponibili.',joinPrefix:'SEI ',joinSuffix:'? ENTRA IN DIGIY DAKAR →',pro:'UN PROFESSIONISTA A DAKAR'},
    de:{badge:'BEISPIEL · FREIER PLATZ',summary:'So kann eine DIGIYLYFE-Präsenz in dieser Kategorie aussehen.',meta:'Demoplatz · noch kein Mitglied',cta:'DIESEN PLATZ NEHMEN →',empty:'Noch kein echtes Mitglied für diesen Filter. Die Karten zeigen freie Plätze.',joinPrefix:'SIND SIE ',joinSuffix:'? DIGIY DAKAR BEITRETEN →',pro:'PROFI IN DAKAR'},
    nl:{badge:'VOORBEELD · OPEN PLAATS',summary:'Zo kan een DIGIYLYFE-aanwezigheid in deze categorie eruitzien.',meta:'Demoplaats · nog geen lid',cta:'NEEM DEZE PLAATS →',empty:'Nog geen echt lid voor dit filter. De kaarten tonen open plaatsen.',joinPrefix:'BENT U ',joinSuffix:'? WORD LID VAN DIGIY DAKAR →',pro:'PROFESSIONAL IN DAKAR'},
    ar:{badge:'مثال · مكان متاح',summary:'هكذا يمكن أن يظهر حضور DIGIYLYFE في هذه الفئة.',meta:'مساحة تجريبية · ليست عضواً بعد',cta:'احجز هذا المكان ←',empty:'لا يوجد عضو حقيقي بعد لهذا الاختيار. البطاقات أدناه تعرض الأماكن المتاحة.',joinPrefix:'هل أنت ',joinSuffix:'؟ انضم إلى DIGIY DAKAR ←',pro:'مهني في داكار'}
  };

  var LABELS={
    fr:{transport:'🚗 Chauffeur à Dakar',artisan:'🔧 Artisan à Dakar',accommodation:'🏠 Hébergement à Dakar',food:'🍽️ Restaurant à Dakar',shopping:'🛍️ Commerce à Dakar',beauty:'💅 Beauté & Bien-être à Dakar',jobs:'💼 Entreprise qui recrute à Dakar',announcements:'⚡ Service / annonce à Dakar',guidance:'🎙️ Professionnel LA VOIX à Dakar'},
    en:{transport:'🚗 Driver in Dakar',artisan:'🔧 Tradesperson in Dakar',accommodation:'🏠 Accommodation in Dakar',food:'🍽️ Restaurant in Dakar',shopping:'🛍️ Local shop in Dakar',beauty:'💅 Beauty & Wellness in Dakar',jobs:'💼 Hiring company in Dakar',announcements:'⚡ Service / listing in Dakar',guidance:'🎙️ LA VOIX professional in Dakar'},
    es:{transport:'🚗 Conductor en Dakar',artisan:'🔧 Artesano en Dakar',accommodation:'🏠 Alojamiento en Dakar',food:'🍽️ Restaurante en Dakar',shopping:'🛍️ Comercio en Dakar',beauty:'💅 Belleza y bienestar en Dakar',jobs:'💼 Empresa que contrata en Dakar',announcements:'⚡ Servicio / anuncio en Dakar',guidance:'🎙️ Profesional LA VOIX en Dakar'},
    pt:{transport:'🚗 Motorista em Dakar',artisan:'🔧 Artesão em Dakar',accommodation:'🏠 Alojamento em Dakar',food:'🍽️ Restaurante em Dakar',shopping:'🛍️ Comércio em Dakar',beauty:'💅 Beleza e bem-estar em Dakar',jobs:'💼 Empresa a recrutar em Dakar',announcements:'⚡ Serviço / anúncio em Dakar',guidance:'🎙️ Profissional LA VOIX em Dakar'},
    it:{transport:'🚗 Autista a Dakar',artisan:'🔧 Artigiano a Dakar',accommodation:'🏠 Alloggio a Dakar',food:'🍽️ Ristorante a Dakar',shopping:'🛍️ Commercio a Dakar',beauty:'💅 Bellezza e benessere a Dakar',jobs:'💼 Azienda che assume a Dakar',announcements:'⚡ Servizio / annuncio a Dakar',guidance:'🎙️ Professionista LA VOIX a Dakar'},
    de:{transport:'🚗 Fahrer in Dakar',artisan:'🔧 Handwerker in Dakar',accommodation:'🏠 Unterkunft in Dakar',food:'🍽️ Restaurant in Dakar',shopping:'🛍️ Geschäft in Dakar',beauty:'💅 Schönheit & Wellness in Dakar',jobs:'💼 Unternehmen mit Stellen in Dakar',announcements:'⚡ Service / Anzeige in Dakar',guidance:'🎙️ LA VOIX Profi in Dakar'},
    nl:{transport:'🚗 Chauffeur in Dakar',artisan:'🔧 Vakman in Dakar',accommodation:'🏠 Accommodatie in Dakar',food:'🍽️ Restaurant in Dakar',shopping:'🛍️ Winkel in Dakar',beauty:'💅 Schoonheid & wellness in Dakar',jobs:'💼 Wervend bedrijf in Dakar',announcements:'⚡ Dienst / advertentie in Dakar',guidance:'🎙️ LA VOIX professional in Dakar'},
    ar:{transport:'🚗 سائق في داكار',artisan:'🔧 حرفي في داكار',accommodation:'🏠 إقامة في داكار',food:'🍽️ مطعم في داكار',shopping:'🛍️ متجر في داكار',beauty:'💅 الجمال والعافية في داكار',jobs:'💼 شركة توظف في داكار',announcements:'⚡ خدمة / إعلان في داكار',guidance:'🎙️ مهني LA VOIX في داكار'}
  };

  var ORDER=['transport','artisan','accommodation','food','shopping','beauty','jobs','announcements','guidance'];
  var PRO_NAMES={transport:'CHAUFFEUR / TRANSPORT',artisan:'ARTISAN',accommodation:'PRO DE L’HÉBERGEMENT / LOCATION',food:'RESTAURATEUR',shopping:'COMMERÇANT',beauty:'PRO DE LA BEAUTÉ / BIEN-ÊTRE',jobs:'PRO DE L’EMPLOI / MISSIONS',announcements:'PRO DES ANNONCES / SERVICES',guidance:'PRO DE LA COMMUNICATION'};

  function params(){try{return new URLSearchParams(location.search);}catch(e){return new URLSearchParams();}}
  function lang(){var l=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();return LANGS.indexOf(l)>=0?l:'fr';}
  function isDakar(){return (params().get('zone')||'')==='dakar';}
  function isFg(card){if(!card)return false;var text=(card.textContent||'').toLowerCase();return /fg\s*nails/i.test(text)||!!card.querySelector('a[href*="f-g-nails.digiylyfe.com"]');}
  function zoneLabel(){var active=document.querySelector('#zones .chip.active');return active?(active.textContent||'DAKAR').trim():'DAKAR';}
  function adhesionUrl(need){var p=params(),u=new URL('/adhesion-dakar.html',location.origin),local=p.get('local')||'';if(need)u.searchParams.set('need',need);if(local)u.searchParams.set('local',local);u.searchParams.set('lang',lang());return u.pathname+u.search;}

  function configureJoin(){
    var a=document.getElementById('dakarProJoin')||document.querySelector('[data-digiy-dakar-pro-join]');
    if(!a)return;
    if(!isDakar()){a.classList.remove('show');return;}
    var p=params(),need=p.get('need')||'',t=COPY[lang()]||COPY.fr,name=PRO_NAMES[need]||t.pro;
    a.classList.add('show');a.href=adhesionUrl(need);a.textContent=t.joinPrefix+name+t.joinSuffix;
  }

  function placeholderCard(need){
    var l=lang(),t=COPY[l]||COPY.fr,n=(LABELS[l]||LABELS.fr)[need]||need,article=document.createElement('article');
    article.className='card';article.setAttribute('data-dakar-placeholder',need);article.style.borderStyle='dashed';article.style.borderColor='rgba(246,196,83,.58)';article.style.background='linear-gradient(145deg,rgba(246,196,83,.09),rgba(34,197,94,.07))';
    var badge=document.createElement('div');badge.textContent=t.badge;badge.style.cssText='display:inline-flex;margin-bottom:10px;padding:5px 8px;border-radius:999px;border:1px solid rgba(246,196,83,.45);color:#fff1bd;font-size:9px;font-weight:1000;letter-spacing:.04em';
    var h=document.createElement('h3');h.textContent=n;
    var s=document.createElement('p');s.className='summary';s.textContent=t.summary;
    var m=document.createElement('div');m.className='meta';m.textContent='📍 '+zoneLabel()+' · DAKAR\n🪪 '+t.meta;m.style.whiteSpace='pre-line';
    var sv=document.createElement('div');sv.className='services';['Carte digitale · QR','19 900 FCFA / mois','0 % commission','Contact direct'].forEach(function(x){var sp=document.createElement('span');sp.className='service';sp.textContent=x;sv.appendChild(sp);});
    var ac=document.createElement('div');ac.className='actions';var a=document.createElement('a');a.href=adhesionUrl(need);a.textContent=t.cta;ac.appendChild(a);
    article.append(badge,h,s,m,sv,ac);return article;
  }

  function renderProjection(){
    var results=document.getElementById('results');if(!results||!isDakar())return;
    Array.prototype.slice.call(results.querySelectorAll('.card')).forEach(function(card){if(isFg(card))card.remove();});
    var t=COPY[lang()]||COPY.fr,empty=results.querySelector('.empty');if(empty&&empty.textContent!==t.empty)empty.textContent=t.empty;
    var need=params().get('need')||'',wanted=need&&ORDER.indexOf(need)>=0?[need]:ORDER;
    wanted.forEach(function(id){if(!results.querySelector('[data-dakar-placeholder="'+id+'"]'))results.appendChild(placeholderCard(id));});
    configureJoin();
  }

  function mutationNeedsWork(muts){
    for(var i=0;i<muts.length;i++){
      var nodes=[].slice.call(muts[i].addedNodes||[]).concat([].slice.call(muts[i].removedNodes||[]));
      for(var j=0;j<nodes.length;j++){
        var n=nodes[j];if(n.nodeType===1&&!n.hasAttribute('data-dakar-placeholder'))return true;
      }
    }
    return false;
  }

  function boot(){
    var results=document.getElementById('results');if(!results)return false;
    renderProjection();
    new MutationObserver(function(muts){if(mutationNeedsWork(muts))setTimeout(renderProjection,0);}).observe(results,{childList:true});
    document.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('#needs,#zones'))setTimeout(renderProjection,0);});
    window.addEventListener('popstate',function(){setTimeout(renderProjection,0);});
    return true;
  }
  if(!boot()){var o=new MutationObserver(function(){if(boot())o.disconnect();});o.observe(document.documentElement,{childList:true,subtree:true});}
})();