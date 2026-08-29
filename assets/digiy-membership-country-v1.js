/* DIGIYLYFE — Membership country pricing V1
 * Scope: tarifs-adherents-1.html + tarifs-adherents.html
 * Source of truth: /assets/digiy-adhesion-runtime-v1.json
 * Rule: one country => one currency => one visible price set.
 * Commercial 20260829: make owned value explicit before the monthly price.
 */
(function(){
  'use strict';

  var file=(location.pathname.split('/').pop()||'').toLowerCase();
  var plan=file==='tarifs-adherents-1.html'?'adherent-19900':file==='tarifs-adherents.html'?'adherent-28000':'';
  if(!plan) return;

  var RUNTIME_URL='/assets/digiy-adhesion-runtime-v1.json';
  var runtime=null;
  var params=new URLSearchParams(location.search);
  var countryId=(params.get('country')||localStorage.getItem('digiy_country')||'sn').toUpperCase();
  if(countryId!=='SN'&&countryId!=='FR') countryId='SN';

  function country(){
    return runtime&&Array.isArray(runtime.countries)?runtime.countries.find(function(c){return c.id===countryId&&c.status==='active';}):null;
  }
  function lang(){return (document.documentElement.lang||'fr').slice(0,2).toLowerCase();}
  function label(c){
    var l=lang();
    return (c&&c.labels&&(c.labels[l]||c.labels.fr))||c.id;
  }
  function fromLabel(){
    var map={fr:'À PARTIR DE',en:'FROM',es:'DESDE',pt:'A PARTIR DE',it:'DA',de:'AB',nl:'VANAF',ar:'ابتداءً من'};
    return map[lang()]||map.fr;
  }
  function amount(n,c){
    if(c.currency.code==='XOF') return new Intl.NumberFormat('fr-FR',{maximumFractionDigits:0}).format(Number(n)).replace(/\u202f/g,' ')+' FCFA';
    if(c.currency.code==='EUR') return new Intl.NumberFormat('fr-FR',{maximumFractionDigits:0}).format(Number(n)).replace(/\u202f/g,' ')+' €';
    return String(n)+' '+(c.currency.label||c.currency.code||'');
  }

  var COMMERCIAL={
    fr:{kicker:'VOTRE PRÉSENCE · VOTRE QR · VOTRE RELATION CLIENT',h1:'Ce que vous possédez avec DIGIYLYFE.',lead:'Une présence numérique à votre nom, partageable par QR, accessible en 8 langues et sans commission DIGIYLYFE sur vos clients.',member:'VOTRE PRÉSENCE DIGIYLYFE',memberText:'Votre carte digitale, votre QR personnel et votre contact direct avec vos clients.',ownership:'À VOUS : votre identité · votre QR · votre contact direct',ownershipSub:'DIGIYLYFE vous donne la présence ; la relation client reste au professionnel.',items:['Votre identité professionnelle en ligne','Votre QR personnel partageable','Votre place dans la vitrine DIGIYLYFE','WhatsApp · SMS · appel direct','8 langues','0 % de commission DIGIYLYFE']},
    en:{kicker:'YOUR PRESENCE · YOUR QR · YOUR CUSTOMER RELATIONSHIP',h1:'What you own with DIGIYLYFE.',lead:'A digital presence in your name, shareable by QR, available in 8 languages and with no DIGIYLYFE commission on your customers.',member:'YOUR DIGIYLYFE PRESENCE',memberText:'Your digital card, your personal QR and direct contact with your customers.',ownership:'YOURS: your identity · your QR · your direct contact',ownershipSub:'DIGIYLYFE provides the presence; the customer relationship stays with the professional.',items:['Your professional identity online','Your personal shareable QR','Your place in the DIGIYLYFE showcase','Direct WhatsApp · SMS · call','8 languages','0% DIGIYLYFE commission']},
    es:{kicker:'SU PRESENCIA · SU QR · SU RELACIÓN CON EL CLIENTE',h1:'Lo que posee con DIGIYLYFE.',lead:'Una presencia digital a su nombre, compartible por QR, disponible en 8 idiomas y sin comisión DIGIYLYFE sobre sus clientes.',member:'SU PRESENCIA DIGIYLYFE',memberText:'Su tarjeta digital, su QR personal y el contacto directo con sus clientes.',ownership:'SUYO: su identidad · su QR · su contacto directo',ownershipSub:'DIGIYLYFE aporta la presencia; la relación con el cliente sigue siendo del profesional.',items:['Su identidad profesional en línea','Su QR personal compartible','Su lugar en la vitrina DIGIYLYFE','WhatsApp · SMS · llamada directa','8 idiomas','0 % comisión DIGIYLYFE']},
    pt:{kicker:'A SUA PRESENÇA · O SEU QR · A SUA RELAÇÃO COM O CLIENTE',h1:'O que é seu com a DIGIYLYFE.',lead:'Uma presença digital em seu nome, partilhável por QR, disponível em 8 idiomas e sem comissão DIGIYLYFE sobre os seus clientes.',member:'A SUA PRESENÇA DIGIYLYFE',memberText:'O seu cartão digital, o seu QR pessoal e o contacto direto com os seus clientes.',ownership:'SEU: a sua identidade · o seu QR · o seu contacto direto',ownershipSub:'A DIGIYLYFE fornece a presença; a relação com o cliente permanece com o profissional.',items:['A sua identidade profissional online','O seu QR pessoal partilhável','O seu lugar na montra DIGIYLYFE','WhatsApp · SMS · chamada direta','8 idiomas','0% comissão DIGIYLYFE']},
    it:{kicker:'LA VOSTRA PRESENZA · IL VOSTRO QR · IL VOSTRO RAPPORTO CLIENTE',h1:'Ciò che possedete con DIGIYLYFE.',lead:'Una presenza digitale a vostro nome, condivisibile tramite QR, disponibile in 8 lingue e senza commissioni DIGIYLYFE sui vostri clienti.',member:'LA VOSTRA PRESENZA DIGIYLYFE',memberText:'La vostra card digitale, il vostro QR personale e il contatto diretto con i clienti.',ownership:'VOSTRO: identità · QR · contatto diretto',ownershipSub:'DIGIYLYFE fornisce la presenza; il rapporto con il cliente resta al professionista.',items:['La vostra identità professionale online','Il vostro QR personale condivisibile','Il vostro posto nella vetrina DIGIYLYFE','WhatsApp · SMS · chiamata diretta','8 lingue','0% commissioni DIGIYLYFE']},
    de:{kicker:'IHRE PRÄSENZ · IHR QR · IHRE KUNDENBEZIEHUNG',h1:'Was Ihnen mit DIGIYLYFE gehört.',lead:'Eine digitale Präsenz in Ihrem Namen, per QR teilbar, in 8 Sprachen verfügbar und ohne DIGIYLYFE-Provision auf Ihre Kunden.',member:'IHRE DIGIYLYFE-PRÄSENZ',memberText:'Ihre digitale Karte, Ihr persönlicher QR und der direkte Kontakt zu Ihren Kunden.',ownership:'IHRES: Identität · QR · Direktkontakt',ownershipSub:'DIGIYLYFE stellt die Präsenz bereit; die Kundenbeziehung bleibt beim Profi.',items:['Ihre berufliche Identität online','Ihr persönlicher teilbarer QR','Ihr Platz im DIGIYLYFE-Schaufenster','Direktes WhatsApp · SMS · Anruf','8 Sprachen','0 % DIGIYLYFE-Provision']},
    nl:{kicker:'UW AANWEZIGHEID · UW QR · UW KLANTRELATIE',h1:'Wat van u is met DIGIYLYFE.',lead:'Een digitale aanwezigheid op uw naam, deelbaar via QR, beschikbaar in 8 talen en zonder DIGIYLYFE-commissie op uw klanten.',member:'UW DIGIYLYFE-AANWEZIGHEID',memberText:'Uw digitale kaart, uw persoonlijke QR en rechtstreeks contact met uw klanten.',ownership:'VAN U: identiteit · QR · direct contact',ownershipSub:'DIGIYLYFE levert de aanwezigheid; de klantrelatie blijft bij de professional.',items:['Uw professionele identiteit online','Uw persoonlijke deelbare QR','Uw plaats in de DIGIYLYFE-etalage','Direct WhatsApp · SMS · bellen','8 talen','0% DIGIYLYFE-commissie']},
    ar:{kicker:'حضورك · رمز QR الخاص بك · علاقتك بعملائك',h1:'ما تملكه مع DIGIYLYFE.',lead:'حضور رقمي باسمك، قابل للمشاركة عبر QR، متاح بـ8 لغات ومن دون عمولة DIGIYLYFE على عملائك.',member:'حضورك على DIGIYLYFE',memberText:'بطاقتك الرقمية ورمز QR الخاص بك وتواصلك المباشر مع عملائك.',ownership:'ملكك: هويتك · QR الخاص بك · تواصلك المباشر',ownershipSub:'DIGIYLYFE توفر الحضور، وتبقى علاقة العميل للمهني.',items:['هويتك المهنية على الإنترنت','رمز QR شخصي قابل للمشاركة','مكانك في واجهة DIGIYLYFE','واتساب · SMS · اتصال مباشر','8 لغات','0٪ عمولة DIGIYLYFE']}
  };

  function patchCommercialValue(){
    if(plan!=='adherent-19900') return;
    var t=COMMERCIAL[lang()]||COMMERCIAL.fr;
    var kicker=document.getElementById('kicker');if(kicker)kicker.textContent=t.kicker;
    var h1=document.getElementById('h1');if(h1)h1.textContent=t.h1;
    var lead=document.getElementById('lead');if(lead)lead.textContent=t.lead;
    var member=document.getElementById('member');if(member)member.textContent=t.member;
    var memberText=document.getElementById('memberText');if(memberText)memberText.textContent=t.memberText;
    var list=document.getElementById('memberItems');
    if(list)list.innerHTML=t.items.map(function(item){return '<li>'+item+'</li>';}).join('');

    var card=member&&member.closest('.card');
    if(card){
      var note=card.querySelector('[data-digiy-ownership-note]');
      if(!note){
        note=document.createElement('div');
        note.setAttribute('data-digiy-ownership-note','1');
        note.style.cssText='margin:2px 0 12px;padding:11px 12px;border-radius:16px;border:1px solid rgba(45,212,191,.40);background:rgba(45,212,191,.09);line-height:1.35';
        var price=document.getElementById('memberPrice');
        if(price)card.insertBefore(note,price);else card.appendChild(note);
      }
      note.innerHTML='<strong style="display:block;color:#fff3cf;font-size:12px;font-weight:1000">'+t.ownership+'</strong><small style="display:block;margin-top:4px;color:#c5d3cc;font-size:11px;font-weight:800">'+t.ownershipSub+'</small>';
    }
  }

  function ensureUi(){
    if(document.querySelector('[data-digiy-country-pricing]')) return;
    var top=document.querySelector('.top');
    if(!top) return;
    var style=document.createElement('style');
    style.textContent='.digiyCountryPricing{display:grid;grid-template-columns:1fr 1fr;gap:8px;max-width:620px;margin:0 auto 14px}.digiyCountryPricing button{min-height:44px;border:1px solid #ffffff2b;border-radius:999px;background:#ffffff09;color:#fff;font-weight:1000;cursor:pointer;padding:9px 12px}.digiyCountryPricing button.active{background:linear-gradient(135deg,#f6c453,#2dd4bf);color:#06140f;border-color:transparent}@media(max-width:520px){.digiyCountryPricing{grid-template-columns:1fr}}';
    document.head.appendChild(style);
    var box=document.createElement('div');
    box.className='digiyCountryPricing';
    box.setAttribute('data-digiy-country-pricing','1');
    box.setAttribute('role','group');
    box.setAttribute('aria-label','Choisir le pays et la devise');
    box.innerHTML='<button type="button" data-digiy-country="SN">🇸🇳 SÉNÉGAL · FCFA</button><button type="button" data-digiy-country="FR">🇫🇷 FRANCE · €</button>';
    top.insertAdjacentElement('afterend',box);
    box.querySelectorAll('[data-digiy-country]').forEach(function(btn){
      btn.addEventListener('click',function(){countryId=btn.getAttribute('data-digiy-country');persist();apply();});
    });
  }
  function persist(){
    try{localStorage.setItem('digiy_country',countryId);}catch(e){}
    var u=new URL(location.href);u.searchParams.set('country',countryId.toLowerCase());history.replaceState(null,'',u);
  }
  function patchPrepareLink(){
    var a=document.querySelector('[data-digiy-prepare-card]');
    if(!a) return;
    try{
      var u=new URL(a.href,location.href);u.searchParams.set('country',countryId.toLowerCase());a.href=u.href;
    }catch(e){}
  }
  function patchLoc(c,membership){
    var table=document.querySelector('#digiy-loc .locTable');
    if(!table) return;
    table.querySelectorAll('tr').forEach(function(tr){
      var cells=tr.children;
      if(cells.length<3) return;
      cells[1].style.display=countryId==='SN'?'':'none';
      cells[2].style.display=countryId==='FR'?'':'none';
    });
    table.style.minWidth='0';
    var lead=document.getElementById('locLead');
    if(lead){
      var l=lang();
      var source=(typeof LOC!=='undefined'&&LOC&&(LOC[l]||LOC.fr))?(LOC[l]||LOC.fr).lead:lead.textContent;
      lead.textContent=source.replace(/28(?:[ .,\u00a0\u202f])000 FCFA\s*\/\s*(?:€\s*75|75\s*€)/gi,amount(membership.amount,c));
    }
  }
  function patchPayments(){
    var cards=document.querySelectorAll('#paiement .paymentGrid .payCard');
    if(cards.length>=2){
      cards[0].hidden=countryId!=='SN';
      cards[1].hidden=countryId!=='FR';
      var grid=document.querySelector('#paiement .paymentGrid');if(grid)grid.style.gridTemplateColumns='1fr';
    }
  }
  function patchSiteTiers(c,premium,extra){
    var p=document.querySelector('[data-digiy-site-tiers] [data-tier="premium"] [data-tier-price]');
    var x=document.querySelector('[data-digiy-site-tiers] [data-tier="extra"] [data-tier-price]');
    var prefix=fromLabel();
    var pv=prefix+' '+amount(premium.starting_amount,c);
    var xv=prefix+' '+amount(extra.starting_amount,c);
    if(p&&p.textContent!==pv)p.textContent=pv;
    if(x&&x.textContent!==xv)x.textContent=xv;
  }
  function patchSiteTiersFromRuntime(){
    if(!runtime) return;
    var c=country();if(!c) return;
    var premium=c.pricing&&c.pricing.services&&c.pricing.services.site_premium;
    var extra=c.pricing&&c.pricing.services&&c.pricing.services.site_extra;
    if(premium&&extra)patchSiteTiers(c,premium,extra);
  }
  function apply(){
    if(!runtime) return;
    ensureUi();
    var c=country();if(!c) return;
    var membership=c.pricing&&c.pricing.membership&&c.pricing.membership[plan];
    var fiche=c.pricing&&c.pricing.services&&c.pricing.services.fiche;
    var premium=c.pricing&&c.pricing.services&&c.pricing.services.site_premium;
    var extra=c.pricing&&c.pricing.services&&c.pricing.services.site_extra;
    if(!membership||!fiche||!premium||!extra) return;

    document.querySelectorAll('[data-digiy-country]').forEach(function(btn){
      var on=btn.getAttribute('data-digiy-country')===countryId;btn.classList.toggle('active',on);btn.setAttribute('aria-pressed',on?'true':'false');
    });
    var memberPrice=document.getElementById('memberPrice');if(memberPrice)memberPrice.textContent=amount(membership.amount,c);
    var sheetPrice=document.getElementById('sheetPrice');if(sheetPrice)sheetPrice.textContent=fromLabel()+' '+amount(fiche.starting_amount,c);
    var sitePrice=document.getElementById('sitePrice');if(sitePrice)sitePrice.textContent='SITE PREMIUM · '+fromLabel()+' '+amount(premium.starting_amount,c)+' · SITE EXTRA · '+fromLabel()+' '+amount(extra.starting_amount,c);
    patchCommercialValue();
    patchSiteTiers(c,premium,extra);
    patchLoc(c,membership);
    patchPayments();
    patchPrepareLink();
    document.title='DIGIYLYFE — '+(plan==='adherent-19900'?'Adhérent 1':'Adhérent 2')+' · '+label(c)+' · '+amount(membership.amount,c);
    persist();
  }

  fetch(RUNTIME_URL,{cache:'no-store'})
    .then(function(r){if(!r.ok)throw new Error('runtime '+r.status);return r.json();})
    .then(function(data){runtime=data;ensureUi();apply();})
    .catch(function(){/* fail closed: no country-specific derivation without runtime */});

  document.querySelectorAll('.top [data-l]').forEach(function(btn){btn.addEventListener('click',function(){setTimeout(apply,0);});});
  new MutationObserver(function(){setTimeout(apply,0);}).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});
  new MutationObserver(function(){patchPrepareLink();patchSiteTiersFromRuntime();}).observe(document.body,{childList:true,subtree:true});
})();