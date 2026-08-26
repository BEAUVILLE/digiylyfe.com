/* DIGIYLYFE — chargeur vitrine stable 20260826
 * Core historique figé bit pour bit : /digiy-contact-global-core-20260824.js
 * Ajouts isolés : lien officiel PRO CARNET + porte PARTENAIRE TERRAIN.
 * Retrait publication : FG NAILS n’est plus exposé dans la vitrine publique.
 * Cotisation : Supabase décide quelles présences professionnelles restent publiques.
 */
(function(){
  'use strict';

  var SUPABASE_URL='https://wesqmwjjtsefyjnluosj.supabase.co';
  var SUPABASE_PUBLISHABLE_KEY='sb_publishable_2KVRayr3oWcewu0Y7xMkOQ_D6522h1E';
  var PUBLIC_GATE_CACHE_KEY='digiy-public-presence-gate-v1';
  var publicGatePromise=null;

  function currentLang(){
    return (document.documentElement.lang||'fr').slice(0,2).toLowerCase();
  }

  function normalizePublicUrl(value){
    var raw=String(value||'').trim();
    if(!raw||raw==='#')return '';
    try{
      var u=new URL(raw,location.href);
      return (u.origin+u.pathname.replace(/\/+$/,'')).toLowerCase();
    }catch(error){
      return raw.split('?')[0].split('#')[0].replace(/\/+$/,'').toLowerCase();
    }
  }

  function readRecentPublicGateCache(){
    try{
      var cached=JSON.parse(localStorage.getItem(PUBLIC_GATE_CACHE_KEY)||'null');
      if(!cached||!Array.isArray(cached.urls)||!cached.at)return null;
      if(Date.now()-Number(cached.at)>120000)return null;
      return cached.urls;
    }catch(error){
      return null;
    }
  }

  function savePublicGateCache(urls){
    try{
      localStorage.setItem(PUBLIC_GATE_CACHE_KEY,JSON.stringify({at:Date.now(),urls:urls}));
    }catch(error){}
  }

  function fetchAllowedPublicUrls(){
    if(publicGatePromise)return publicGatePromise;

    publicGatePromise=fetch(SUPABASE_URL+'/rest/v1/digiy_annuaire_public?select=public_url',{
      method:'GET',
      headers:{
        apikey:SUPABASE_PUBLISHABLE_KEY,
        Accept:'application/json'
      },
      cache:'no-store'
    }).then(function(response){
      if(!response.ok)throw new Error('Supabase public gate '+response.status);
      return response.json();
    }).then(function(rows){
      var urls=(Array.isArray(rows)?rows:[]).map(function(row){
        return normalizePublicUrl(row&&row.public_url);
      }).filter(Boolean);
      savePublicGateCache(urls);
      return urls;
    }).catch(function(error){
      var cached=readRecentPublicGateCache();
      try{console.warn('DIGIY public gate indisponible : cache court ou fermeture de sécurité.',error);}catch(ignore){}
      return cached||[];
    });

    return publicGatePromise;
  }

  function applySupabasePresenceGate(){
    var cards=Array.prototype.slice.call(document.querySelectorAll('.proofCard[href]'));
    if(!cards.length)return Promise.resolve();

    var proofUrls=new Set(cards.map(function(card){return normalizePublicUrl(card.href);}).filter(Boolean));

    return fetchAllowedPublicUrls().then(function(urls){
      var allowed=new Set((urls||[]).map(normalizePublicUrl).filter(Boolean));

      cards.forEach(function(card){
        var url=normalizePublicUrl(card.href);
        if(!url||!allowed.has(url))card.remove();
      });

      try{
        var key='digiy-vitrine-favoris';
        var favs=JSON.parse(localStorage.getItem(key)||'[]');
        if(Array.isArray(favs)){
          var cleaned=favs.filter(function(href){
            var url=normalizePublicUrl(href);
            return !proofUrls.has(url)||allowed.has(url);
          });
          if(cleaned.length!==favs.length)localStorage.setItem(key,JSON.stringify(cleaned));
        }
      }catch(error){}

      var grid=document.querySelector('.proofGrid');
      if(grid){
        var refreshGrid=function(){
          var count=grid.querySelectorAll('.proofCard[href]').length;
          if(window.matchMedia('(min-width:761px)').matches&&count>0){
            grid.style.gridTemplateColumns='repeat('+Math.min(count,4)+',1fr)';
          }else{
            grid.style.gridTemplateColumns='';
          }
        };
        refreshGrid();
        if(!grid.getAttribute('data-digiy-public-gate-layout')){
          grid.setAttribute('data-digiy-public-gate-layout','1');
          var mq=window.matchMedia('(min-width:761px)');
          if(mq.addEventListener)mq.addEventListener('change',refreshGrid);
          else if(mq.addListener)mq.addListener(refreshGrid);
        }
      }

      if(window.digiyRenderFavoris){
        try{window.digiyRenderFavoris();}catch(error){}
      }
    });
  }

  function retireFgNails(){
    var selector='.proofCard[href^="https://f-g-nails.digiylyfe.com/"]';
    var card=document.querySelector(selector);
    if(card) card.remove();

    try{
      var key='digiy-vitrine-favoris';
      var favs=JSON.parse(localStorage.getItem(key)||'[]');
      if(Array.isArray(favs)){
        var cleaned=favs.filter(function(href){
          return typeof href!=='string' || href.indexOf('https://f-g-nails.digiylyfe.com/')!==0;
        });
        if(cleaned.length!==favs.length)localStorage.setItem(key,JSON.stringify(cleaned));
      }
    }catch(error){}

    var grid=document.querySelector('.proofGrid');
    if(grid){
      var mq=window.matchMedia('(min-width:761px)');
      var adjust=function(){
        var count=grid.querySelectorAll('.proofCard[href]').length;
        grid.style.gridTemplateColumns=mq.matches&&count>0?'repeat('+Math.min(count,4)+',1fr)':'';
      };
      adjust();
      if(!grid.getAttribute('data-digiy-fg-layout')){
        grid.setAttribute('data-digiy-fg-layout','1');
        if(mq.addEventListener)mq.addEventListener('change',adjust);
        else if(mq.addListener)mq.addListener(adjust);
      }
    }

    if(window.digiyRenderFavoris){
      try{window.digiyRenderFavoris();}catch(error){}
    }
  }

  function installCarnetModuleLink(){
    var grid=document.querySelector('.publicGrid');
    if(!grid || grid.querySelector('a[href="https://digiy-carnet-pro.digiylyfe.com/"]')) return;

    var copy={
      fr:'Carnet d’activité · entrées · sorties',
      en:'Activity ledger · income · expenses',
      es:'Cuaderno de actividad · entradas · salidas',
      pt:'Caderno de atividade · entradas · saídas',
      it:'Registro attività · entrate · uscite',
      de:'Aktivitätsbuch · Einnahmen · Ausgaben',
      nl:'Activiteitenboek · inkomsten · uitgaven',
      ar:'دفتر النشاط · مداخيل · مصاريف'
    };

    var card=document.createElement('a');
    card.className='publicCard';
    card.href='https://digiy-carnet-pro.digiylyfe.com/';
    card.setAttribute('aria-label','Découvrir PRO CARNET');
    card.innerHTML='<i aria-hidden="true">📒</i><strong>PRO CARNET</strong><small data-digiy-carnet-module-copy></small>';
    grid.appendChild(card);

    function refresh(){
      var small=card.querySelector('[data-digiy-carnet-module-copy]');
      if(small) small.textContent=copy[currentLang()]||copy.fr;
    }

    refresh();
    new MutationObserver(refresh).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});
  }

  function installPartnerTerrainDoor(){
    var section=document.querySelector('section[aria-label="Portes publiques DIGIYLYFE"]');
    var grid=section&&section.querySelector('.publicGrid');
    if(!section||!grid||section.querySelector('[data-digiy-partner-door]')) return;

    var copy={
      fr:{title:'DEVENIR PARTENAIRE TERRAIN',text:'Vous connaissez les professionnels de votre ville ? Construisez votre portefeuille local avec DIGIYLYFE.',cta:'Découvrir le partenariat →',footer:'DEVENIR PARTENAIRE'},
      en:{title:'BECOME A FIELD PARTNER',text:'Know the professionals in your city? Build your local portfolio with DIGIYLYFE.',cta:'Discover the partnership →',footer:'BECOME A PARTNER'},
      es:{title:'SER SOCIO DE TERRENO',text:'¿Conoce a los profesionales de su ciudad? Construya su cartera local con DIGIYLYFE.',cta:'Descubrir la colaboración →',footer:'SER SOCIO'},
      pt:{title:'TORNAR-SE PARCEIRO DE TERRENO',text:'Conhece os profissionais da sua cidade? Construa a sua carteira local com a DIGIYLYFE.',cta:'Descobrir a parceria →',footer:'TORNAR-SE PARCEIRO'},
      it:{title:'DIVENTA PARTNER SUL TERRITORIO',text:'Conosci i professionisti della tua città? Costruisci il tuo portafoglio locale con DIGIYLYFE.',cta:'Scopri la partnership →',footer:'DIVENTA PARTNER'},
      de:{title:'FIELD-PARTNER WERDEN',text:'Kennen Sie die Profis in Ihrer Stadt? Bauen Sie mit DIGIYLYFE Ihr lokales Portfolio auf.',cta:'Partnerschaft entdecken →',footer:'PARTNER WERDEN'},
      nl:{title:'WORD TERREINPARTNER',text:'Kent u de professionals in uw stad? Bouw uw lokale portefeuille op met DIGIYLYFE.',cta:'Ontdek het partnerschap →',footer:'WORD PARTNER'},
      ar:{title:'كن شريكًا ميدانيًا',text:'هل تعرف المهنيين في مدينتك؟ ابنِ محفظتك المحلية مع DIGIYLYFE.',cta:'اكتشف الشراكة ←',footer:'كن شريكًا'}
    };

    var door=document.createElement('a');
    door.className='publicLeadDoor';
    door.href='https://partenaire-terrain.digiylyfe.com/';
    door.setAttribute('data-digiy-partner-door','1');
    door.innerHTML='<span class="publicLeadIcon" aria-hidden="true">🤝</span><span class="publicLeadCopy"><strong data-digiy-partner-title></strong><span data-digiy-partner-text></span></span><span class="publicLeadBtn" data-digiy-partner-cta></span>';
    grid.insertAdjacentElement('afterend',door);

    var footer=document.querySelector('footer.footer');
    var footerLink=null;
    if(footer&&!footer.querySelector('[data-digiy-partner-footer]')){
      footerLink=document.createElement('a');
      footerLink.href='https://partenaire-terrain.digiylyfe.com/';
      footerLink.setAttribute('data-digiy-partner-footer','1');
      footer.appendChild(document.createTextNode(' · '));
      footer.appendChild(footerLink);
    }

    function refresh(){
      var t=copy[currentLang()]||copy.fr;
      var title=door.querySelector('[data-digiy-partner-title]');
      var text=door.querySelector('[data-digiy-partner-text]');
      var cta=door.querySelector('[data-digiy-partner-cta]');
      if(title)title.textContent=t.title;
      if(text)text.textContent=t.text;
      if(cta)cta.textContent=t.cta;
      door.setAttribute('aria-label',t.title);
      if(footerLink)footerLink.textContent=t.footer;
    }

    refresh();
    new MutationObserver(refresh).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});
  }

  function installExtras(){
    retireFgNails();
    applySupabasePresenceGate();
    installCarnetModuleLink();
    installPartnerTerrainDoor();
  }

  retireFgNails();
  applySupabasePresenceGate();

  var core=document.createElement('script');
  core.src='/digiy-contact-global-core-20260824.js?v=20260824';
  core.async=false;
  core.onload=installExtras;
  core.onerror=installExtras;
  document.head.appendChild(core);
})();
