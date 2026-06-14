/* =========================================================
   DIGIYLYFE — ANNUAIRE PUBLIC SAFE
   Fichier : annuaire-public-digiy-safe.js
   Rôle : vraies fiches publiques qui remontent depuis la voix
   ========================================================= */

(function () {
  "use strict";

  if (window.DIGIY_ANNUAIRE_PUBLIC_SAFE_READY) return;
  window.DIGIY_ANNUAIRE_PUBLIC_SAFE_READY = true;

  window.DIGIY_ANNUAIRE_PUBLIC = [
    {
      id: "helage-plombier",
      nom: "Helage",
      titre: "Plombier à Saly",
      badge: "BUILD · Plomberie",
      zone: "Saly · Petite Côte",
      url: "https://helage-plombier.digiylyfe.com/",
      type: "fiche",
      statut: "public",
      categories: ["artisan", "build", "service", "intervention"],
      zones: ["saly", "mbour", "petite cote", "petite côte"],
      mots: [
        "helage",
        "plombier",
        "plomberie",
        "fuite",
        "robinet",
        "robinetterie",
        "wc",
        "douche",
        "lavabo",
        "evacuation",
        "évacuation",
        "installation eau",
        "artisan"
      ],
      description:
        "Plombier à Saly pour fuite, robinetterie, évacuation et petits travaux."
    },

    {
      id: "mbaye-macon",
      nom: "Mbaye",
      titre: "Entrepreneur maçon à Saly",
      badge: "BUILD · Maçonnerie",
      zone: "Saly · Petite Côte",
      url: "https://mbaye-macon.digiylyfe.com/",
      type: "fiche",
      statut: "public",
      categories: ["artisan", "build", "service", "chantier", "construction"],
      zones: ["saly", "mbour", "petite cote", "petite côte"],
      mots: [
        "mbaye",
        "maçon",
        "macon",
        "maçonnerie",
        "maconnerie",
        "construction",
        "renovation",
        "rénovation",
        "chantier",
        "mur",
        "dalle",
        "villa",
        "piscine",
        "artisan"
      ],
      description:
        "Entrepreneur maçon pour travaux, rénovation, construction et aménagement."
    },

    {
      id: "kourant-electricite",
      nom: "Zal & Kourant",
      titre: "Électricien à Saly",
      badge: "BUILD · Électricité",
      zone: "Saly · Petite Côte",
      url: "https://kourant.digiylyfe.com/",
      type: "fiche",
      statut: "public",
      categories: ["artisan", "build", "service", "intervention"],
      zones: ["saly", "mbour", "petite cote", "petite côte"],
      mots: [
        "zal",
        "kourant",
        "courant",
        "électricien",
        "electricien",
        "électricité",
        "electricite",
        "prise",
        "disjoncteur",
        "tableau",
        "panne",
        "lumiere",
        "lumière",
        "cable",
        "câble",
        "artisan"
      ],
      description:
        "Électricien pour panne, prise, tableau, disjoncteur et installation."
    },

    {
      id: "digiy-solaire",
      nom: "DIGIY Solaire",
      titre: "Solution solaire",
      badge: "Énergie · Solaire",
      zone: "Sénégal",
      url: "https://digiylyfe.com/",
      type: "module",
      statut: "public",
      categories: ["energie", "service", "solaire"],
      zones: ["senegal", "sénégal", "saly", "dakar", "mbour", "thies", "thiès"],
      mots: [
        "solaire",
        "panneau",
        "energie",
        "énergie",
        "batterie",
        "electricite solaire",
        "électricité solaire"
      ],
      description:
        "Orientation vers les solutions solaires et énergie terrain."
    },

    {
      id: "astou-boutique",
      nom: "Astou Boutique",
      titre: "Boutique DIGIY MARKET",
      badge: "MARKET · Boutique",
      zone: "Saly · Sénégal",
      url: "https://astou-boutique.digiylyfe.com/",
      type: "fiche",
      statut: "public",
      categories: ["market", "boutique", "commerce"],
      zones: ["saly", "senegal", "sénégal"],
      mots: [
        "boutique",
        "market",
        "produit",
        "acheter",
        "vente",
        "commerce",
        "astou"
      ],
      description:
        "Boutique publique pour présenter les produits et contacter directement."
    },

    {
      id: "driver-aibd",
      nom: "DIGIY DRIVER",
      titre: "Chauffeur / trajet AIBD",
      badge: "DRIVER · Transport",
      zone: "AIBD · Dakar · Saly",
      url: "https://driver-client.digiylyfe.com/",
      type: "module",
      statut: "public",
      categories: ["driver", "chauffeur", "transport"],
      zones: ["aibd", "dakar", "saly", "mbour", "senegal", "sénégal"],
      mots: [
        "chauffeur",
        "driver",
        "taxi",
        "trajet",
        "aibd",
        "aéroport",
        "aeroport",
        "transport",
        "voiture"
      ],
      description:
        "Préparer une demande chauffeur, trajet ou transfert AIBD."
    },

    {
      id: "loc-saly",
      nom: "DIGIY LOC",
      titre: "Location / appartement",
      badge: "LOC · Logement",
      zone: "Saly · Petite Côte",
      url: "https://loc.digiylyfe.com/",
      type: "module",
      statut: "public",
      categories: ["loc", "location", "logement"],
      zones: ["saly", "mbour", "petite cote", "petite côte"],
      mots: [
        "location",
        "louer",
        "appartement",
        "logement",
        "chambre",
        "studio",
        "villa",
        "séjour",
        "sejour"
      ],
      description:
        "Trouver ou préparer une demande de logement / location."
    },

    {
      id: "explore",
      nom: "DIGIY EXPLORE",
      titre: "Sorties et lieux à découvrir",
      badge: "EXPLORE · Découverte",
      zone: "Sénégal",
      url: "https://explore.digiylyfe.com/",
      type: "module",
      statut: "public",
      categories: ["explore", "sortie", "lieu"],
      zones: ["saly", "dakar", "mbour", "senegal", "sénégal"],
      mots: [
        "sortie",
        "visiter",
        "découvrir",
        "decouvrir",
        "lieu",
        "restaurant",
        "activité",
        "activite",
        "weekend"
      ],
      description:
        "Découvrir des lieux, sorties et activités."
    },

    {
      id: "resa",
      nom: "DIGIY RÉSA",
      titre: "Réserver une table / service",
      badge: "RÉSA · Réservation",
      zone: "Sénégal",
      url: "https://resa-table-resto.digiylyfe.com/",
      type: "module",
      statut: "public",
      categories: ["resa", "réservation", "reservation"],
      zones: ["saly", "dakar", "mbour", "senegal", "sénégal"],
      mots: [
        "réserver",
        "reserver",
        "réservation",
        "reservation",
        "table",
        "restaurant",
        "resto",
        "rendez-vous",
        "rdv"
      ],
      description:
        "Préparer une réservation simple."
    },

    {
      id: "pay",
      nom: "DIGIY PAY",
      titre: "Paiement / argent",
      badge: "PAY · Argent",
      zone: "Sénégal",
      url: "https://pay.digiylyfe.com/",
      type: "module",
      statut: "public",
      categories: ["pay", "paiement", "argent"],
      zones: ["senegal", "sénégal", "saly", "dakar", "mbour"],
      mots: [
        "payer",
        "paiement",
        "argent",
        "wave",
        "orange money",
        "encaisser",
        "reçu",
        "recu",
        "preuve"
      ],
      description:
        "Préparer une action liée au paiement ou à l’encaissement."
    }
  ];

  window.DIGIY_ANNUAIRE_PUBLIC_VERSION = "safe-20260614";
})();
