/* DIGIYLYFE · Bouche-à-oreille V1
   Une recommandation = un lien vers la fiche réelle du professionnel.
   Aucun compte, aucun stockage, aucun suivi, aucune API ni commission.
   Ne modifie pas les QR ni les contacts du professionnel.
*/
(function () {
  'use strict';

  var grid = document.querySelector('.section[aria-label="Preuves terrain DIGIYLYFE"] .exampleGrid');
  if (!grid) return;

  var COPY = {
    fr: {button:'↗️ Recommander', message:'À découvrir : {name} sur DIGIYLYFE. Contactez directement ce professionnel :'},
    en: {button:'↗️ Recommend', message:'Discover {name} on DIGIYLYFE. Contact this professional directly:'},
    es: {button:'↗️ Recomendar', message:'Descubre {name} en DIGIYLYFE. Contacta directamente con este profesional:'},
    pt: {button:'↗️ Recomendar', message:'Conheça {name} na DIGIYLYFE. Contacte este profissional diretamente:'},
    it: {button:'↗️ Consiglia', message:'Scopri {name} su DIGIYLYFE. Contatta direttamente questo professionista:'},
    de: {button:'↗️ Empfehlen', message:'Entdecke {name} auf DIGIYLYFE. Kontaktiere diesen Profi direkt:'},
    nl: {button:'↗️ Aanbevelen', message:'Ontdek {name} op DIGIYLYFE. Neem rechtstreeks contact op met deze professional:'},
    ar: {button:'↗️ أوصِ به', message:'اكتشف {name} على DIGIYLYFE. تواصل مباشرة مع صاحب النشاط:'}
  };

  var entries = [];
  var cards = grid.querySelectorAll('a.exampleCard[href]');

  Array.prototype.forEach.call(cards, function (card) {
    var url;
    try { url = new URL(card.getAttribute('href'), window.location.href); }
    catch (error) { return; }
    // Uniquement les fiches DIGIYLYFE déjà présentes sur cette vitrine.
    if (url.protocol !== 'https:' || !/(^|\.)digiylyfe\.com$/i.test(url.hostname)) return;

    var nameNode = card.querySelector('strong');
    var name = nameNode && nameNode.textContent.trim();
    if (!name || !card.parentNode) return;

    var wrapper = document.createElement('div');
    wrapper.className = 'digiyRecommendation';
    card.parentNode.insertBefore(wrapper, card);
    wrapper.appendChild(card);

    var action = document.createElement('a');
    action.className = 'digiyRecommendAction';
    action.target = '_blank';
    action.rel = 'noopener noreferrer';
    wrapper.appendChild(action);

    var entry = { name:name, url:url.href, action:action };
    entries.push(entry);

    action.addEventListener('click', function (event) {
      // Sur téléphone : menu natif de partage. Sinon : WhatsApp avec le lien réel.
      if (typeof navigator.share !== 'function') return;
      event.preventDefault();
      var lang = getLanguage();
      var message = COPY[lang].message.replace('{name}', entry.name);
      navigator.share({ title:entry.name + ' · DIGIYLYFE', text:message, url:entry.url })
        .catch(function (error) {
          if (error && error.name === 'AbortError') return; // Annulation volontaire.
          window.location.assign(action.href); // Repli compatible PWA / navigateur.
        });
    });
  });

  function getLanguage() {
    var lang = (document.documentElement.lang || 'fr').toLowerCase().slice(0, 2);
    return Object.prototype.hasOwnProperty.call(COPY, lang) ? lang : 'fr';
  }

  function refresh() {
    var c = COPY[getLanguage()];
    entries.forEach(function (entry) {
      var message = c.message.replace('{name}', entry.name);
      entry.action.textContent = c.button;
      entry.action.setAttribute('aria-label', c.button.replace(/^↗️\s*/, '') + ' : ' + entry.name);
      entry.action.href = 'https://wa.me/?text=' + encodeURIComponent(message + '\n' + entry.url);
    });
  }

  refresh();
  // Le choix FR/EN/ES/PT/IT/DE/NL/AR de la vitrine s'applique également aux boutons.
  if (entries.length && typeof MutationObserver !== 'undefined') {
    new MutationObserver(refresh).observe(document.documentElement, {
      attributes:true, attributeFilter:['lang']
    });
  }
})();
