/* DIGIYLYFE — Contact commercial global
 * Source unique : contact@digiylyfe.com
 * Rôle : afficher l'adresse professionnelle officielle sur les pages publiques.
 * Navigation : le HUB reste à l'atelier ; son ancien lien générique de footer est retiré.
 * Parcours adhésion : les deux pages adhérent ouvrent le même dossier d’adhésion avec le bon forfait.
 * Vitrine : les cartes adhérents réellement publiées sont ajoutées automatiquement sans modifier les pionniers historiques.
 */
(function(){
  'use strict';

  var EMAIL='contact@digiylyfe.com';
  var MAILTO='mailto:'+EMAIL;
  var PUBLIC_CARDS_API='https://wesqmwjjtsefyjnluosj.supabase.co/functions/v1/digiy-card-public?asset=list';

  function cleanLegacyHubFooter(){
    document.querySelectorAll('footer a[data-i18n="footerHub"][href^="https://digiy-hub.digiylyfe.com/"]').forEach(function(a){
      var prev=a.previousSibling;
      if(prev && prev.nodeType===3) prev.textContent=prev.textContent.replace(/\s*·\s*$/,'');
      a.remove();
    });
  }

  function repairPublicDoors(){
    var grid=document.querySelector('.publicGrid');
    if(!grid) return;

    var humanCopy={
      fr:'Gratuit · activités · cercles · liens locaux',
      en:'Free · activities · circles · local connections',
      es:'Gratis · actividades · círculos · vínculos locales',
      pt:'Gratuito · atividades · círculos · ligações locais',
      it:'Gratuito · attività · cerchie · legami locali',
      de:'Kostenlos · Aktivitäten · Kreise · lokale Kontakte',
      nl:'Gratis · activiteiten · kringen · lokale contacten',
      ar:'مجاني · أنشطة · دوائر · روابط محلية'
    };

    function applyHumanDoor(){
      var human=grid.querySelector('a.publicCard[href="https://rencontre.digiylyfe.com/"]');
      if(!human) return;
      var lang=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();
      human.classList.add('rencontreCard');
      human.innerHTML='<i aria-hidden="true">🪑</i><strong>HUMAIN DU TERRITOIRE</strong><small>'+((humanCopy[lang])||humanCopy.fr)+'</small>';
    }

    applyHumanDoor();
    new MutationObserver(applyHumanDoor).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});

    var market=grid.querySelector('a.publicCard[href="https://market.digiylyfe.com/"]');
    var commerce=grid.querySelector('a.publicCard[href="https://mon-commerce.digiylyfe.com/"]');
    if(market && !commerce){
      market.href='https://mon-commerce.digiylyfe.com/';
      market.innerHTML='<i aria-hidden="true">🏪</i><strong>MON COMMERCE</strong><small data-i18n="marketText">Boutiques et produits</small>';
      commerce=market;
    }else if(market && commerce){
      market.remove();
    }

    if(!grid.querySelector('a.publicCard[href="https://resto.digiylyfe.com/"]')){
      var resa=grid.querySelector('a.publicCard[href="https://resa-table-resto.digiylyfe.com/"]');
      var resto=document.createElement('a');
      resto.className='publicCard';
      resto.href='https://resto.digiylyfe.com/';
      resto.innerHTML='<i aria-hidden="true">🍽️</i><strong>RESTO</strong><small data-i18n="resaText">Réservations directes</small>';
      if(resa && resa.nextSibling) grid.insertBefore(resto,resa.nextSibling);
      else grid.appendChild(resto);
    }
  }

  function renameWorldHub(){
    var section=document.querySelector('.worldHub');
    if(!section) return;

    var copy={
      fr:{title:'DIGIYLYFE — HUB DES TERRITOIRES',lead:'Un HUB des territoires. Des besoins locaux. Un contact direct.'},
      en:{title:'DIGIYLYFE — TERRITORY HUB',lead:'A hub for territories. Local needs. Direct contact.'},
      es:{title:'DIGIYLYFE — HUB DE TERRITORIOS',lead:'Un HUB de territorios. Necesidades locales. Contacto directo.'},
      pt:{title:'DIGIYLYFE — HUB DOS TERRITÓRIOS',lead:'Um HUB dos territórios. Necessidades locais. Contacto direto.'},
      it:{title:'DIGIYLYFE — HUB DEI TERRITORI',lead:'Un HUB dei territori. Bisogni locali. Contatto diretto.'},
      de:{title:'DIGIYLYFE — HUB DER REGIONEN',lead:'Ein HUB der Regionen. Lokale Bedürfnisse. Direkter Kontakt.'},
      nl:{title:'DIGIYLYFE — HUB VAN GEBIEDEN',lead:'Een HUB van gebieden. Lokale behoeften. Direct contact.'},
      ar:{title:'DIGIYLYFE — محور المناطق',lead:'محور للمناطق. احتياجات محلية. تواصل مباشر.'}
    };

    function apply(){
      var lang=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();
      var t=copy[lang]||copy.fr;
      var title=section.querySelector('[data-i18n="worldTitle"]');
      var lead=section.querySelector('[data-i18n="worldLead"]');
      if(title) title.textContent=t.title;
      if(lead) lead.textContent=t.lead;
      section.setAttribute('aria-label',lang==='fr'?'DIGIYLYFE HUB des territoires':'DIGIYLYFE territory hub');
    }

    apply();
    new MutationObserver(apply).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});
  }

  function installPostPaymentCardButton(){
    var file=(location.pathname.split('/').pop()||'').toLowerCase();
    var plan=file==='tarifs-adherents-1.html'?'adherent-19900':file==='tarifs-adherents.html'?'adherent-28000':'';
    if(!plan || document.querySelector('[data-digiy-prepare-card]')) return;

    var payment=document.querySelector('#paiement');
    if(!payment) return;

    var labels={
      fr:'POURSUIVRE MA DEMANDE D’ADHÉSION →',
      en:'CONTINUE MY MEMBERSHIP REQUEST →',
      es:'CONTINUAR MI SOLICITUD DE ADHESIÓN →',
      pt:'CONTINUAR O MEU PEDIDO DE ADESÃO →',
      it:'CONTINUA LA MIA RICHIESTA DI ADESIONE →',
      de:'MITGLIEDSANTRAG FORTSETZEN →',
      nl:'MIJN LIDMAATSCHAPSAANVRAAG VERVOLGEN →',
      ar:'متابعة طلب العضوية ←'
    };

    var wrap=document.createElement('div');
    wrap.setAttribute('data-digiy-prepare-card','1');
    wrap.style.cssText='margin-top:16px;padding-top:16px;border-top:1px solid rgba(255,255,255,.16)';

    var note=document.createElement('p');
    note.style.cssText='margin:0 0 10px;color:rgba(247,255,249,.84);font-size:12px;line-height:1.5;font-weight:850;text-align:center';
    note.textContent='Accédez à votre dossier d’adhésion pour votre carte et, si vous le souhaitez, une fiche ou un site.';

    var link=document.createElement('a');
    link.style.cssText='display:flex;min-height:56px;align-items:center;justify-content:center;padding:12px 16px;border-radius:999px;background:linear-gradient(135deg,#f6c453,#2dd4bf);color:#06140f;font-weight:1000;text-decoration:none;text-align:center';

    function refresh(){
      var lang=(document.documentElement.lang||localStorage.getItem('digiy_lang')||'fr').slice(0,2).toLowerCase();
      if(!labels[lang]) lang='fr';
      link.textContent=labels[lang];
      link.href='https://digiylyfe.com/preparer-ma-carte.html?plan='+encodeURIComponent(plan)+'&lang='+encodeURIComponent(lang);
      link.setAttribute('aria-label',labels[lang]);
    }

    refresh();
    new MutationObserver(refresh).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});
    window.addEventListener('storage',refresh);
    link.addEventListener('click',refresh);

    wrap.appendChild(note);
    wrap.appendChild(link);
    payment.appendChild(wrap);
  }

  function installPublicShowcase(){
    var grid=document.querySelector('.proofGrid');
    if(!grid || grid.querySelector('[data-digiy-live-card]')) return;

    fetch(PUBLIC_CARDS_API,{cache:'no-store'})
      .then(function(r){if(!r.ok) throw new Error('vitrine indisponible');return r.json();})
      .then(function(payload){
        var cards=Array.isArray(payload&&payload.cards)?payload.cards:[];
        cards.forEach(function(card){
          if(!card || !card.final_url || !card.name) return;
          var already=[].some.call(grid.querySelectorAll('a[href]'),function(x){return x.href===card.final_url;});
          if(already) return;

          var a=document.createElement('a');
          a.className='proofCard';
          a.href=card.final_url;
          a.setAttribute('data-digiy-live-card','1');
          a.setAttribute('aria-label','Ouvrir '+card.name);

          var img=document.createElement('img');
          img.src=card.photo_url||'';
          img.alt=card.name;
          img.loading='lazy';
          img.decoding='async';
          img.style.cssText='width:100%;aspect-ratio:1/1;object-fit:cover;border-radius:14px;display:block;margin-bottom:7px;background:#ffffff12';

          var strong=document.createElement('strong');
          strong.textContent=card.name;

          var small=document.createElement('small');
          small.textContent=[card.job,card.zone].filter(Boolean).join(' · ');

          var b=document.createElement('b');
          b.textContent='Voir la carte →';

          a.appendChild(img);
          a.appendChild(strong);
          a.appendChild(small);
          a.appendChild(b);
          grid.appendChild(a);
        });
      })
      .catch(function(){ /* La vitrine historique reste intacte si le flux dynamique est indisponible. */ });
  }

  function install(){
    cleanLegacyHubFooter();
    repairPublicDoors();
    renameWorldHub();
    installPostPaymentCardButton();
    installPublicShowcase();
    if(document.querySelector('a[href="'+MAILTO+'"]')) return;

    var link=document.createElement('a');
    link.href=MAILTO;
    link.textContent='✉️ '+EMAIL;
    link.setAttribute('aria-label','Écrire à DIGIYLYFE : '+EMAIL);
    link.style.color='inherit';
    link.style.fontWeight='900';
    link.style.textDecoration='none';
    link.style.overflowWrap='anywhere';

    var footer=document.querySelector('footer');
    if(footer){
      var wrap=document.createElement('div');
      wrap.setAttribute('data-digiy-contact-global','1');
      wrap.style.marginTop='10px';
      wrap.style.paddingTop='9px';
      wrap.style.borderTop='1px solid rgba(255,255,255,.14)';
      wrap.style.textAlign='center';
      wrap.appendChild(link);
      footer.appendChild(wrap);
      return;
    }

    var bar=document.createElement('div');
    bar.setAttribute('data-digiy-contact-global','1');
    bar.style.cssText='width:min(960px,calc(100% - 24px));margin:18px auto 110px;padding:13px 16px;border:1px solid rgba(246,196,83,.38);border-radius:18px;background:rgba(4,19,13,.92);color:#fffaf0;text-align:center;font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;box-shadow:0 12px 32px rgba(0,0,0,.22)';
    bar.appendChild(link);
    document.body.appendChild(bar);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
})();
