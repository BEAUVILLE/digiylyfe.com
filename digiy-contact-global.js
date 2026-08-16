/* DIGIYLYFE — Contact commercial global
 * Source unique : contact@digiylyfe.com
 * Rôle : afficher l'adresse professionnelle officielle sur les pages publiques.
 * Navigation : le HUB reste à l'atelier ; son ancien lien générique de footer est retiré.
 * Parcours adhésion : après règlement, les deux pages adhérent ouvrent la préparation de carte avec le bon forfait.
 */
(function(){
  'use strict';

  var EMAIL='contact@digiylyfe.com';
  var MAILTO='mailto:'+EMAIL;

  function cleanLegacyHubFooter(){
    document.querySelectorAll('footer a[data-i18n="footerHub"][href^="https://digiy-hub.digiylyfe.com/"]').forEach(function(a){
      var prev=a.previousSibling;
      if(prev && prev.nodeType===3) prev.textContent=prev.textContent.replace(/\s*·\s*$/,'');
      a.remove();
    });
  }

  function installPostPaymentCardButton(){
    var file=(location.pathname.split('/').pop()||'').toLowerCase();
    var plan=file==='tarifs-adherents-1.html'?'adherent-19900':file==='tarifs-adherents.html'?'adherent-28000':'';
    if(!plan || document.querySelector('[data-digiy-prepare-card]')) return;

    var payment=document.querySelector('#paiement');
    if(!payment) return;

    var labels={
      fr:'✅ J’AI PAYÉ — PRÉPARER MA CARTE →',
      en:'✅ I HAVE PAID — PREPARE MY CARD →',
      es:'✅ YA HE PAGADO — PREPARAR MI TARJETA →',
      pt:'✅ JÁ PAGUEI — PREPARAR O MEU CARTÃO →',
      it:'✅ HO PAGATO — PREPARA IL MIO BIGLIETTO →',
      de:'✅ ICH HABE BEZAHLT — KARTE VORBEREITEN →',
      nl:'✅ IK HEB BETAALD — MIJN KAART VOORBEREIDEN →',
      ar:'✅ لقد دفعت — إعداد بطاقتي ←'
    };

    var wrap=document.createElement('div');
    wrap.setAttribute('data-digiy-prepare-card','1');
    wrap.style.cssText='margin-top:16px;padding-top:16px;border-top:1px solid rgba(255,255,255,.16)';

    var note=document.createElement('p');
    note.style.cssText='margin:0 0 10px;color:rgba(247,255,249,.84);font-size:12px;line-height:1.5;font-weight:850;text-align:center';
    note.textContent='Après votre règlement, transmettez les informations nécessaires à votre carte DIGIYLYFE.';

    var link=document.createElement('a');
    link.style.cssText='display:flex;min-height:56px;align-items:center;justify-content:center;padding:12px 16px;border-radius:999px;background:linear-gradient(135deg,#f6c453,#2dd4bf);color:#06140f;font-weight:1000;text-decoration:none;text-align:center';

    function refresh(){
      var lang=(document.documentElement.lang||localStorage.getItem('digiy_lang')||'fr').slice(0,2).toLowerCase();
      if(!labels[lang]) lang='fr';
      link.textContent=labels[lang];
      link.href='https://digiylyfe.com/preparer-ma-carte.html?plan='+encodeURIComponent(plan)+'&lang='+encodeURIComponent(lang);
      link.setAttribute('aria-label',labels[lang].replace(/^✅\s*/,''));
    }

    refresh();
    new MutationObserver(refresh).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});
    window.addEventListener('storage',refresh);
    link.addEventListener('click',refresh);

    wrap.appendChild(note);
    wrap.appendChild(link);
    payment.appendChild(wrap);
  }

  function install(){
    cleanLegacyHubFooter();
    installPostPaymentCardButton();
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
