/* DIGIYLYFE — moteur multilingue universel v1
   FR · EN · ES · DE · IT · NL · AR
   Aucun service externe, aucune API payante.
*/
(function () {
  'use strict';

  if (window.__DIGIY_I18N_ACTIVE__) return;
  window.__DIGIY_I18N_ACTIVE__ = true;

  var SUPPORTED = ['fr', 'en', 'es', 'de', 'it', 'nl', 'ar'];
  var RTL = new Set(['ar']);
  var VOICE_LANG = {
    fr: 'fr-FR', en: 'en-US', es: 'es-ES', de: 'de-DE',
    it: 'it-IT', nl: 'nl-NL', ar: 'ar-SA'
  };
  var LABELS = {
    fr: 'Français', en: 'English', es: 'Español', de: 'Deutsch',
    it: 'Italiano', nl: 'Nederlands', ar: 'العربية'
  };

  var PACKS = {
    en: {
      'Accueil':'Home','Retour':'Back','Ouvrir':'Open','Fermer':'Close','Menu':'Menu',
      'Rechercher':'Search','Recherche':'Search','Trouver':'Find','Choisir':'Choose',
      'Continuer':'Continue','Confirmer':'Confirm','Annuler':'Cancel','Enregistrer':'Save',
      'Modifier':'Edit','Supprimer':'Delete','Ajouter':'Add','Publier':'Publish',
      'Partager':'Share','Copier':'Copy','Copié':'Copied','Télécharger':'Download',
      'Appeler':'Call','Contacter':'Contact','Réserver':'Book','Demander':'Request',
      'Envoyer':'Send','Retour au HUB':'Back to HUB','Espace Pro':'Pro Space',
      'Espace professionnel':'Professional space','Déjà membre ?':'Already a member?',
      'Se connecter':'Sign in','Connexion':'Sign in','Déconnexion':'Sign out',
      'Numéro de téléphone':'Phone number','Téléphone':'Phone','Votre téléphone':'Your phone',
      'Code PIN':'PIN code','Code incorrect':'Incorrect code','Code non reconnu':'Unrecognized code',
      'Aucun résultat':'No results','Aucun résultat trouvé':'No results found',
      'Chargement…':'Loading…','Veuillez patienter…':'Please wait…',
      'WhatsApp direct':'Direct WhatsApp','Contact direct':'Direct contact',
      'Paiement direct':'Direct payment','0% commission':'0% commission',
      'Voir la fiche':'View profile','Voir les détails':'View details',
      'Voir l’offre':'View offer','Voir les tarifs':'View prices',
      'Chauffeurs et mobilité':'Drivers and mobility','Logements et tourisme':'Accommodation and tourism',
      'Réservations directes':'Direct bookings','Boutiques et produits':'Shops and products',
      'Artisans et chantiers':'Tradespeople and works','Emploi et missions':'Jobs and assignments',
      'Lieux et découvertes':'Places and discovery','Suivre son activité':'Track your activity',
      'Départ':'Pickup','Destination':'Destination','Date':'Date','Heure':'Time',
      'Prix':'Price','Total':'Total','Disponible':'Available','Indisponible':'Unavailable',
      'Nom':'Name','Prénom':'First name','Adresse':'Address','Ville':'City','Zone':'Area',
      'Description':'Description','Photos':'Photos','Services':'Services','Catégorie':'Category',
      'Commandes':'Orders','Produits':'Products','Clients':'Customers','Réservations':'Bookings',
      'Tableau de bord':'Dashboard','Mon activité':'My activity','Mes services':'My services',
      'Mes produits':'My products','Mes réservations':'My bookings','Mes clients':'My customers',
      'Mon profil':'My profile','Paramètres':'Settings','Aujourd’hui':'Today',
      'Cette semaine':'This week','Ce mois':'This month','Statut':'Status',
      'En attente':'Pending','Confirmé':'Confirmed','Terminé':'Completed','Annulé':'Cancelled',
      'Écouter':'Listen','Arrêter':'Stop','Langue':'Language'
    },
    es: {
      'Accueil':'Inicio','Retour':'Volver','Ouvrir':'Abrir','Fermer':'Cerrar','Menu':'Menú',
      'Rechercher':'Buscar','Recherche':'Búsqueda','Trouver':'Encontrar','Choisir':'Elegir',
      'Continuer':'Continuar','Confirmer':'Confirmar','Annuler':'Cancelar','Enregistrer':'Guardar',
      'Modifier':'Editar','Supprimer':'Eliminar','Ajouter':'Añadir','Publier':'Publicar',
      'Partager':'Compartir','Copier':'Copiar','Copié':'Copiado','Télécharger':'Descargar',
      'Appeler':'Llamar','Contacter':'Contactar','Réserver':'Reservar','Demander':'Solicitar',
      'Envoyer':'Enviar','Retour au HUB':'Volver al HUB','Espace Pro':'Espacio Pro',
      'Espace professionnel':'Espacio profesional','Déjà membre ?':'¿Ya eres miembro?',
      'Se connecter':'Iniciar sesión','Connexion':'Iniciar sesión','Déconnexion':'Cerrar sesión',
      'Numéro de téléphone':'Número de teléfono','Téléphone':'Teléfono','Votre téléphone':'Tu teléfono',
      'Code PIN':'Código PIN','Code incorrect':'Código incorrecto','Code non reconnu':'Código no reconocido',
      'Aucun résultat':'Sin resultados','Aucun résultat trouvé':'No se encontraron resultados',
      'Chargement…':'Cargando…','Veuillez patienter…':'Espera, por favor…',
      'WhatsApp direct':'WhatsApp directo','Contact direct':'Contacto directo',
      'Paiement direct':'Pago directo','0% commission':'0% de comisión',
      'Voir la fiche':'Ver perfil','Voir les détails':'Ver detalles',
      'Voir l’offre':'Ver oferta','Voir les tarifs':'Ver precios',
      'Chauffeurs et mobilité':'Conductores y movilidad','Logements et tourisme':'Alojamiento y turismo',
      'Réservations directes':'Reservas directas','Boutiques et produits':'Tiendas y productos',
      'Artisans et chantiers':'Artesanos y obras','Emploi et missions':'Empleo y misiones',
      'Lieux et découvertes':'Lugares y descubrimientos','Suivre son activité':'Seguir tu actividad',
      'Départ':'Salida','Destination':'Destino','Date':'Fecha','Heure':'Hora',
      'Prix':'Precio','Total':'Total','Disponible':'Disponible','Indisponible':'No disponible',
      'Nom':'Nombre','Prénom':'Nombre','Adresse':'Dirección','Ville':'Ciudad','Zone':'Zona',
      'Description':'Descripción','Photos':'Fotos','Services':'Servicios','Catégorie':'Categoría',
      'Commandes':'Pedidos','Produits':'Productos','Clients':'Clientes','Réservations':'Reservas',
      'Tableau de bord':'Panel','Mon activité':'Mi actividad','Mes services':'Mis servicios',
      'Mes produits':'Mis productos','Mes réservations':'Mis reservas','Mes clients':'Mis clientes',
      'Mon profil':'Mi perfil','Paramètres':'Ajustes','Aujourd’hui':'Hoy',
      'Cette semaine':'Esta semana','Ce mois':'Este mes','Statut':'Estado',
      'En attente':'Pendiente','Confirmé':'Confirmado','Terminé':'Finalizado','Annulé':'Cancelado',
      'Écouter':'Escuchar','Arrêter':'Detener','Langue':'Idioma'
    },
    de: {
      'Accueil':'Startseite','Retour':'Zurück','Ouvrir':'Öffnen','Fermer':'Schließen','Menu':'Menü',
      'Rechercher':'Suchen','Recherche':'Suche','Trouver':'Finden','Choisir':'Auswählen',
      'Continuer':'Weiter','Confirmer':'Bestätigen','Annuler':'Abbrechen','Enregistrer':'Speichern',
      'Modifier':'Bearbeiten','Supprimer':'Löschen','Ajouter':'Hinzufügen','Publier':'Veröffentlichen',
      'Partager':'Teilen','Copier':'Kopieren','Copié':'Kopiert','Télécharger':'Herunterladen',
      'Appeler':'Anrufen','Contacter':'Kontaktieren','Réserver':'Buchen','Demander':'Anfragen',
      'Envoyer':'Senden','Retour au HUB':'Zurück zum HUB','Espace Pro':'Pro-Bereich',
      'Espace professionnel':'Professioneller Bereich','Déjà membre ?':'Bereits Mitglied?',
      'Se connecter':'Anmelden','Connexion':'Anmeldung','Déconnexion':'Abmelden',
      'Numéro de téléphone':'Telefonnummer','Téléphone':'Telefon','Votre téléphone':'Ihre Telefonnummer',
      'Code PIN':'PIN-Code','Code incorrect':'Falscher Code','Code non reconnu':'Code nicht erkannt',
      'Aucun résultat':'Keine Ergebnisse','Aucun résultat trouvé':'Keine Ergebnisse gefunden',
      'Chargement…':'Wird geladen…','Veuillez patienter…':'Bitte warten…',
      'WhatsApp direct':'Direktes WhatsApp','Contact direct':'Direkter Kontakt',
      'Paiement direct':'Direkte Zahlung','0% commission':'0 % Provision',
      'Voir la fiche':'Profil ansehen','Voir les détails':'Details ansehen',
      'Voir l’offre':'Angebot ansehen','Voir les tarifs':'Preise ansehen',
      'Chauffeurs et mobilité':'Fahrer und Mobilität','Logements et tourisme':'Unterkünfte und Tourismus',
      'Réservations directes':'Direktbuchungen','Boutiques et produits':'Geschäfte und Produkte',
      'Artisans et chantiers':'Handwerker und Baustellen','Emploi et missions':'Jobs und Aufträge',
      'Lieux et découvertes':'Orte und Entdeckungen','Suivre son activité':'Aktivität verfolgen',
      'Départ':'Abfahrt','Destination':'Ziel','Date':'Datum','Heure':'Uhrzeit',
      'Prix':'Preis','Total':'Gesamt','Disponible':'Verfügbar','Indisponible':'Nicht verfügbar',
      'Nom':'Name','Prénom':'Vorname','Adresse':'Adresse','Ville':'Stadt','Zone':'Gebiet',
      'Description':'Beschreibung','Photos':'Fotos','Services':'Dienstleistungen','Catégorie':'Kategorie',
      'Commandes':'Bestellungen','Produits':'Produkte','Clients':'Kunden','Réservations':'Buchungen',
      'Tableau de bord':'Dashboard','Mon activité':'Meine Aktivität','Mes services':'Meine Dienstleistungen',
      'Mes produits':'Meine Produkte','Mes réservations':'Meine Buchungen','Mes clients':'Meine Kunden',
      'Mon profil':'Mein Profil','Paramètres':'Einstellungen','Aujourd’hui':'Heute',
      'Cette semaine':'Diese Woche','Ce mois':'Diesen Monat','Statut':'Status',
      'En attente':'Ausstehend','Confirmé':'Bestätigt','Terminé':'Abgeschlossen','Annulé':'Storniert',
      'Écouter':'Anhören','Arrêter':'Stoppen','Langue':'Sprache'
    },
    it: {
      'Accueil':'Home','Retour':'Indietro','Ouvrir':'Apri','Fermer':'Chiudi','Menu':'Menu',
      'Rechercher':'Cerca','Recherche':'Ricerca','Trouver':'Trova','Choisir':'Scegli',
      'Continuer':'Continua','Confirmer':'Conferma','Annuler':'Annulla','Enregistrer':'Salva',
      'Modifier':'Modifica','Supprimer':'Elimina','Ajouter':'Aggiungi','Publier':'Pubblica',
      'Partager':'Condividi','Copier':'Copia','Copié':'Copiato','Télécharger':'Scarica',
      'Appeler':'Chiama','Contacter':'Contatta','Réserver':'Prenota','Demander':'Richiedi',
      'Envoyer':'Invia','Retour au HUB':'Torna all’HUB','Espace Pro':'Spazio Pro',
      'Espace professionnel':'Spazio professionale','Déjà membre ?':'Già membro?',
      'Se connecter':'Accedi','Connexion':'Accesso','Déconnexion':'Esci',
      'Numéro de téléphone':'Numero di telefono','Téléphone':'Telefono','Votre téléphone':'Il tuo telefono',
      'Code PIN':'Codice PIN','Code incorrect':'Codice errato','Code non reconnu':'Codice non riconosciuto',
      'Aucun résultat':'Nessun risultato','Aucun résultat trouvé':'Nessun risultato trovato',
      'Chargement…':'Caricamento…','Veuillez patienter…':'Attendere…',
      'WhatsApp direct':'WhatsApp diretto','Contact direct':'Contatto diretto',
      'Paiement direct':'Pagamento diretto','0% commission':'0% commissioni',
      'Voir la fiche':'Vedi profilo','Voir les détails':'Vedi dettagli',
      'Voir l’offre':'Vedi offerta','Voir les tarifs':'Vedi prezzi',
      'Chauffeurs et mobilité':'Autisti e mobilità','Logements et tourisme':'Alloggi e turismo',
      'Réservations directes':'Prenotazioni dirette','Boutiques et produits':'Negozi e prodotti',
      'Artisans et chantiers':'Artigiani e cantieri','Emploi et missions':'Lavoro e incarichi',
      'Lieux et découvertes':'Luoghi e scoperte','Suivre son activité':'Segui la tua attività',
      'Départ':'Partenza','Destination':'Destinazione','Date':'Data','Heure':'Ora',
      'Prix':'Prezzo','Total':'Totale','Disponible':'Disponibile','Indisponible':'Non disponibile',
      'Nom':'Nome','Prénom':'Nome','Adresse':'Indirizzo','Ville':'Città','Zone':'Zona',
      'Description':'Descrizione','Photos':'Foto','Services':'Servizi','Catégorie':'Categoria',
      'Commandes':'Ordini','Produits':'Prodotti','Clients':'Clienti','Réservations':'Prenotazioni',
      'Tableau de bord':'Dashboard','Mon activité':'La mia attività','Mes services':'I miei servizi',
      'Mes produits':'I miei prodotti','Mes réservations':'Le mie prenotazioni','Mes clients':'I miei clienti',
      'Mon profil':'Il mio profilo','Paramètres':'Impostazioni','Aujourd’hui':'Oggi',
      'Cette semaine':'Questa settimana','Ce mois':'Questo mese','Statut':'Stato',
      'En attente':'In attesa','Confirmé':'Confermato','Terminé':'Completato','Annulé':'Annullato',
      'Écouter':'Ascolta','Arrêter':'Ferma','Langue':'Lingua'
    },
    nl: {
      'Accueil':'Home','Retour':'Terug','Ouvrir':'Openen','Fermer':'Sluiten','Menu':'Menu',
      'Rechercher':'Zoeken','Recherche':'Zoeken','Trouver':'Vinden','Choisir':'Kiezen',
      'Continuer':'Doorgaan','Confirmer':'Bevestigen','Annuler':'Annuleren','Enregistrer':'Opslaan',
      'Modifier':'Bewerken','Supprimer':'Verwijderen','Ajouter':'Toevoegen','Publier':'Publiceren',
      'Partager':'Delen','Copier':'Kopiëren','Copié':'Gekopieerd','Télécharger':'Downloaden',
      'Appeler':'Bellen','Contacter':'Contact opnemen','Réserver':'Reserveren','Demander':'Aanvragen',
      'Envoyer':'Verzenden','Retour au HUB':'Terug naar HUB','Espace Pro':'Pro-ruimte',
      'Espace professionnel':'Professionele ruimte','Déjà membre ?':'Al lid?',
      'Se connecter':'Inloggen','Connexion':'Inloggen','Déconnexion':'Uitloggen',
      'Numéro de téléphone':'Telefoonnummer','Téléphone':'Telefoon','Votre téléphone':'Uw telefoon',
      'Code PIN':'Pincode','Code incorrect':'Onjuiste code','Code non reconnu':'Code niet herkend',
      'Aucun résultat':'Geen resultaten','Aucun résultat trouvé':'Geen resultaten gevonden',
      'Chargement…':'Laden…','Veuillez patienter…':'Even geduld…',
      'WhatsApp direct':'Direct WhatsApp','Contact direct':'Direct contact',
      'Paiement direct':'Directe betaling','0% commission':'0% commissie',
      'Voir la fiche':'Profiel bekijken','Voir les détails':'Details bekijken',
      'Voir l’offre':'Aanbod bekijken','Voir les tarifs':'Prijzen bekijken',
      'Chauffeurs et mobilité':'Chauffeurs en mobiliteit','Logements et tourisme':'Accommodatie en toerisme',
      'Réservations directes':'Directe boekingen','Boutiques et produits':'Winkels en producten',
      'Artisans et chantiers':'Vakmensen en bouwplaatsen','Emploi et missions':'Banen en opdrachten',
      'Lieux et découvertes':'Plaatsen en ontdekkingen','Suivre son activité':'Uw activiteit volgen',
      'Départ':'Vertrek','Destination':'Bestemming','Date':'Datum','Heure':'Tijd',
      'Prix':'Prijs','Total':'Totaal','Disponible':'Beschikbaar','Indisponible':'Niet beschikbaar',
      'Nom':'Naam','Prénom':'Voornaam','Adresse':'Adres','Ville':'Stad','Zone':'Gebied',
      'Description':'Beschrijving','Photos':'Foto’s','Services':'Diensten','Catégorie':'Categorie',
      'Commandes':'Bestellingen','Produits':'Producten','Clients':'Klanten','Réservations':'Boekingen',
      'Tableau de bord':'Dashboard','Mon activité':'Mijn activiteit','Mes services':'Mijn diensten',
      'Mes produits':'Mijn producten','Mes réservations':'Mijn boekingen','Mes clients':'Mijn klanten',
      'Mon profil':'Mijn profiel','Paramètres':'Instellingen','Aujourd’hui':'Vandaag',
      'Cette semaine':'Deze week','Ce mois':'Deze maand','Statut':'Status',
      'En attente':'In afwachting','Confirmé':'Bevestigd','Terminé':'Voltooid','Annulé':'Geannuleerd',
      'Écouter':'Luisteren','Arrêter':'Stoppen','Langue':'Taal'
    },
    ar: {
      'Accueil':'الرئيسية','Retour':'رجوع','Ouvrir':'فتح','Fermer':'إغلاق','Menu':'القائمة',
      'Rechercher':'بحث','Recherche':'بحث','Trouver':'العثور','Choisir':'اختيار',
      'Continuer':'متابعة','Confirmer':'تأكيد','Annuler':'إلغاء','Enregistrer':'حفظ',
      'Modifier':'تعديل','Supprimer':'حذف','Ajouter':'إضافة','Publier':'نشر',
      'Partager':'مشاركة','Copier':'نسخ','Copié':'تم النسخ','Télécharger':'تنزيل',
      'Appeler':'اتصال','Contacter':'تواصل','Réserver':'حجز','Demander':'طلب',
      'Envoyer':'إرسال','Retour au HUB':'العودة إلى المحور','Espace Pro':'المساحة المهنية',
      'Espace professionnel':'المساحة المهنية','Déjà membre ?':'هل أنت عضو بالفعل؟',
      'Se connecter':'تسجيل الدخول','Connexion':'تسجيل الدخول','Déconnexion':'تسجيل الخروج',
      'Numéro de téléphone':'رقم الهاتف','Téléphone':'الهاتف','Votre téléphone':'رقم هاتفك',
      'Code PIN':'رمز PIN','Code incorrect':'الرمز غير صحيح','Code non reconnu':'الرمز غير معروف',
      'Aucun résultat':'لا توجد نتائج','Aucun résultat trouvé':'لم يتم العثور على نتائج',
      'Chargement…':'جارٍ التحميل…','Veuillez patienter…':'يرجى الانتظار…',
      'WhatsApp direct':'واتساب مباشر','Contact direct':'تواصل مباشر',
      'Paiement direct':'دفع مباشر','0% commission':'عمولة 0٪',
      'Voir la fiche':'عرض الملف','Voir les détails':'عرض التفاصيل',
      'Voir l’offre':'عرض العرض','Voir les tarifs':'عرض الأسعار',
      'Chauffeurs et mobilité':'السائقون والتنقل','Logements et tourisme':'الإقامة والسياحة',
      'Réservations directes':'حجوزات مباشرة','Boutiques et produits':'المتاجر والمنتجات',
      'Artisans et chantiers':'الحرفيون ومواقع العمل','Emploi et missions':'الوظائف والمهام',
      'Lieux et découvertes':'أماكن واكتشافات','Suivre son activité':'متابعة نشاطك',
      'Départ':'نقطة الانطلاق','Destination':'الوجهة','Date':'التاريخ','Heure':'الوقت',
      'Prix':'السعر','Total':'الإجمالي','Disponible':'متاح','Indisponible':'غير متاح',
      'Nom':'الاسم','Prénom':'الاسم الأول','Adresse':'العنوان','Ville':'المدينة','Zone':'المنطقة',
      'Description':'الوصف','Photos':'الصور','Services':'الخدمات','Catégorie':'الفئة',
      'Commandes':'الطلبات','Produits':'المنتجات','Clients':'العملاء','Réservations':'الحجوزات',
      'Tableau de bord':'لوحة التحكم','Mon activité':'نشاطي','Mes services':'خدماتي',
      'Mes produits':'منتجاتي','Mes réservations':'حجوزاتي','Mes clients':'عملائي',
      'Mon profil':'ملفي','Paramètres':'الإعدادات','Aujourd’hui':'اليوم',
      'Cette semaine':'هذا الأسبوع','Ce mois':'هذا الشهر','Statut':'الحالة',
      'En attente':'قيد الانتظار','Confirmé':'مؤكد','Terminé':'مكتمل','Annulé':'ملغى',
      'Écouter':'استماع','Arrêter':'إيقاف','Langue':'اللغة'
    }
  };

  function normalize(value) {
    return String(value || '').replace(/\s+/g, ' ').trim();
  }

  function detectLanguage() {
    var params = new URLSearchParams(location.search);
    var fromUrl = normalize(params.get('lang')).slice(0, 2).toLowerCase();
    if (SUPPORTED.indexOf(fromUrl) !== -1) return fromUrl;
    try {
      var saved = normalize(localStorage.getItem('digiy-lang')).slice(0, 2).toLowerCase();
      if (SUPPORTED.indexOf(saved) !== -1) return saved;
    } catch (error) {}
    var declared = normalize(document.documentElement.lang).slice(0, 2).toLowerCase();
    if (SUPPORTED.indexOf(declared) !== -1 && declared !== 'fr') return declared;
    var browser = normalize(navigator.language).slice(0, 2).toLowerCase();
    return SUPPORTED.indexOf(browser) !== -1 ? browser : 'fr';
  }

  var state = {
    lang: detectLanguage(),
    speaking: false,
    originals: new WeakMap(),
    custom: {}
  };

  function dictionary() {
    var generic = PACKS[state.lang] || {};
    var custom = state.custom[state.lang] || {};
    return Object.assign({}, generic, custom);
  }

  function translateString(value) {
    if (state.lang === 'fr') return value;
    var raw = String(value || '');
    var compact = normalize(raw);
    if (!compact) return raw;
    var dict = dictionary();
    if (Object.prototype.hasOwnProperty.call(dict, compact)) {
      return raw.replace(compact, dict[compact]);
    }
    var translated = compact;
    Object.keys(dict)
      .sort(function (a, b) { return b.length - a.length; })
      .forEach(function (source) {
        if (source.length < 5 || translated.indexOf(source) === -1) return;
        translated = translated.split(source).join(dict[source]);
      });
    return translated === compact ? raw : raw.replace(compact, translated);
  }

  function remember(node, key, value) {
    var saved = state.originals.get(node) || {};
    if (!Object.prototype.hasOwnProperty.call(saved, key)) saved[key] = value;
    state.originals.set(node, saved);
  }

  function original(node, key, fallback) {
    var saved = state.originals.get(node);
    return saved && Object.prototype.hasOwnProperty.call(saved, key) ? saved[key] : fallback;
  }

  function translateTextNode(node) {
    if (!node || node.nodeType !== Node.TEXT_NODE || !node.parentElement) return;
    if (/^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA|OPTION|CODE|PRE)$/i.test(node.parentElement.tagName)) return;
    if (!normalize(node.nodeValue)) return;
    remember(node, 'text', node.nodeValue);
    var base = original(node, 'text', node.nodeValue);
    node.nodeValue = state.lang === 'fr' ? base : translateString(base);
  }

  function translateElement(element) {
    if (!element || element.nodeType !== Node.ELEMENT_NODE) return;
    ['placeholder', 'title', 'aria-label', 'data-empty-message'].forEach(function (attribute) {
      if (!element.hasAttribute(attribute)) return;
      var current = element.getAttribute(attribute) || '';
      remember(element, attribute, current);
      var base = original(element, attribute, current);
      element.setAttribute(attribute, state.lang === 'fr' ? base : translateString(base));
    });
    if (/^(INPUT|BUTTON)$/i.test(element.tagName) && element.value) {
      remember(element, 'value', element.value);
      var value = original(element, 'value', element.value);
      element.value = state.lang === 'fr' ? value : translateString(value);
    }
  }

  function translateRoot(root) {
    var scope = root && root.nodeType ? root : document.body;
    if (!scope) return;
    if (scope.nodeType === Node.TEXT_NODE) {
      translateTextNode(scope);
      return;
    }
    translateElement(scope);
    var walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT);
    var node;
    while ((node = walker.nextNode())) translateTextNode(node);
    if (scope.querySelectorAll) {
      scope.querySelectorAll('[placeholder],[title],[aria-label],[data-empty-message],input[value],button[value]')
        .forEach(translateElement);
    }
  }

  function propagateLanguage() {
    document.querySelectorAll('a[href]').forEach(function (anchor) {
      try {
        var url = new URL(anchor.href, location.href);
        if (!/(^|\.)digiylyfe\.com$/i.test(url.hostname)) return;
        url.searchParams.set('lang', state.lang);
        anchor.href = url.toString();
      } catch (error) {}
    });
  }

  function injectStyles() {
    if (document.getElementById('digiy-i18n-style')) return;
    var style = document.createElement('style');
    style.id = 'digiy-i18n-style';
    style.textContent =
      '#digiy-i18n-bar{position:fixed;z-index:2147483600;top:max(8px,env(safe-area-inset-top));right:8px;display:flex;align-items:center;gap:4px;max-width:calc(100vw - 16px);overflow-x:auto;padding:5px;border:1px solid rgba(246,196,83,.62);border-radius:999px;background:rgba(3,18,13,.94);box-shadow:0 10px 30px rgba(0,0,0,.34);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);scrollbar-width:none}' +
      '#digiy-i18n-bar::-webkit-scrollbar{display:none}' +
      '#digiy-i18n-bar button{flex:0 0 auto;min-width:34px;height:34px;padding:0 7px;border:1px solid rgba(255,255,255,.18);border-radius:999px;background:rgba(255,255,255,.08);color:#fff;font:800 10px/1 system-ui,-apple-system,Segoe UI,Arial,sans-serif;cursor:pointer}' +
      '#digiy-i18n-bar button[aria-pressed=true]{background:linear-gradient(135deg,#fff1bd,#f6c453,#22c55e);color:#06140f;border-color:#f6c453}' +
      '#digiy-i18n-bar .digiy-speak{font-size:15px;min-width:38px}' +
      'html[dir=rtl] #digiy-i18n-bar{right:auto;left:8px}' +
      '@media(max-width:520px){#digiy-i18n-bar{top:auto;bottom:calc(8px + env(safe-area-inset-bottom));right:8px;left:8px;width:auto;justify-content:flex-start}html[dir=rtl] #digiy-i18n-bar{right:8px;left:8px}}';
    document.head.appendChild(style);
  }

  function stopSpeaking() {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    state.speaking = false;
    var button = document.querySelector('#digiy-i18n-bar .digiy-speak');
    if (button) button.textContent = '🔊';
  }

  function readableText() {
    var root = document.querySelector('main') || document.body;
    if (!root) return '';
    var clone = root.cloneNode(true);
    clone.querySelectorAll('script,style,noscript,nav,form,button,.modal,[hidden],[aria-hidden=true],#digiy-i18n-bar')
      .forEach(function (node) { node.remove(); });
    return normalize(clone.innerText).slice(0, 12000);
  }

  function speakPage() {
    if (!('speechSynthesis' in window)) return;
    if (state.speaking) {
      stopSpeaking();
      return;
    }
    var text = readableText();
    if (!text) return;
    stopSpeaking();
    var utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = VOICE_LANG[state.lang] || VOICE_LANG.fr;
    var voices = window.speechSynthesis.getVoices();
    var prefix = utterance.lang.slice(0, 2).toLowerCase();
    var voice = voices.find(function (item) {
      return String(item.lang || '').slice(0, 2).toLowerCase() === prefix;
    });
    if (voice) utterance.voice = voice;
    utterance.rate = 0.95;
    utterance.onend = utterance.onerror = function () {
      state.speaking = false;
      var button = document.querySelector('#digiy-i18n-bar .digiy-speak');
      if (button) button.textContent = '🔊';
    };
    state.speaking = true;
    var button = document.querySelector('#digiy-i18n-bar .digiy-speak');
    if (button) button.textContent = '⏹';
    window.speechSynthesis.speak(utterance);
  }

  function renderToolbar() {
    injectStyles();
    var existing = document.getElementById('digiy-i18n-bar');
    if (existing) existing.remove();
    var bar = document.createElement('nav');
    bar.id = 'digiy-i18n-bar';
    bar.setAttribute('aria-label', state.lang === 'ar' ? 'اختيار اللغة' : 'Choisir la langue');

    SUPPORTED.forEach(function (lang) {
      var button = document.createElement('button');
      button.type = 'button';
      button.textContent = lang.toUpperCase();
      button.title = LABELS[lang];
      button.lang = lang;
      button.setAttribute('aria-pressed', lang === state.lang ? 'true' : 'false');
      button.addEventListener('click', function () { applyLanguage(lang, true); });
      bar.appendChild(button);
    });

    var speak = document.createElement('button');
    speak.type = 'button';
    speak.className = 'digiy-speak';
    speak.textContent = '🔊';
    speak.title = state.lang === 'ar' ? 'استماع' : (dictionary()['Écouter'] || 'Écouter');
    speak.setAttribute('aria-label', speak.title);
    speak.addEventListener('click', speakPage);
    bar.appendChild(speak);
    document.body.appendChild(bar);
  }

  function applyLanguage(lang, updateAddress) {
    lang = SUPPORTED.indexOf(lang) !== -1 ? lang : 'fr';
    stopSpeaking();
    state.lang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = RTL.has(lang) ? 'rtl' : 'ltr';
    try { localStorage.setItem('digiy-lang', lang); } catch (error) {}
    if (updateAddress && history.replaceState) {
      var url = new URL(location.href);
      url.searchParams.set('lang', lang);
      history.replaceState({}, '', url.toString());
    }
    translateRoot(document.body);
    propagateLanguage();
    renderToolbar();
    document.dispatchEvent(new CustomEvent('digiy:languagechange', { detail: { lang: lang } }));
  }

  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      mutation.addedNodes.forEach(function (node) {
        if (node.id === 'digiy-i18n-bar' || (node.closest && node.closest('#digiy-i18n-bar'))) return;
        translateRoot(node);
      });
    });
    propagateLanguage();
  });

  window.DIGIY_I18N = {
    version: '1.0.0',
    languages: SUPPORTED.slice(),
    getLanguage: function () { return state.lang; },
    setLanguage: function (lang) { applyLanguage(lang, true); },
    register: function (packs) {
      packs = packs || {};
      SUPPORTED.forEach(function (lang) {
        if (packs[lang]) state.custom[lang] = Object.assign({}, state.custom[lang] || {}, packs[lang]);
      });
      applyLanguage(state.lang, false);
    },
    speak: speakPage,
    stop: stopSpeaking
  };

  function init() {
    applyLanguage(state.lang, false);
    if (document.body) {
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
