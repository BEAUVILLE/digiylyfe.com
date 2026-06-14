/* =========================================================
   DIGIYLYFE — PATCH FINAL VOIX → FICHES DIRECTES
   Fichier : digiy-voix-fiches-safe-patch.js
   À mettre EN DERNIER avant </body>
   Objectif :
   - empêcher l'ancien moteur de fabriquer une demande
   - reconnaître plombier / maçon / électricien / chauffeur etc.
   - ouvrir la vraie fiche directe
   ========================================================= */

(function () {
  "use strict";

  if (window.DIGIY_VOIX_FICHES_FINAL_READY) return;
  window.DIGIY_VOIX_FICHES_FINAL_READY = true;

  const ANNUAIRE_DIRECT = [
    {
      id: "helage-plombier",
      titre: "Helage — Plombier à Saly",
      badge: "BUILD · Plomberie",
      zone: "Saly · Petite Côte",
      url: "https://helage-plombier.digiylyfe.com/",
      mots: [
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
        "artisan plombier"
      ],
      zones: ["saly", "mbour", "petite cote", "petite côte"],
      description:
        "Plombier à Saly pour fuite, robinetterie, évacuation et petits travaux."
    },
    {
      id: "mbaye-macon",
      titre: "Mbaye — Entrepreneur maçon à Saly",
      badge: "BUILD · Maçonnerie",
      zone: "Saly · Petite Côte",
      url: "https://mbaye-macon.digiylyfe.com/",
      mots: [
        "macon",
        "maçon",
        "maconnerie",
        "maçonnerie",
        "construction",
        "chantier",
        "renovation",
        "rénovation",
        "mur",
        "dalle",
        "villa",
        "artisan macon",
        "entrepreneur macon"
      ],
      zones: ["saly", "mbour", "petite cote", "petite côte"],
      description:
        "Entrepreneur maçon pour travaux, rénovation, construction et aménagement."
    },
    {
      id: "kourant-electricite",
      titre: "Kourant — Électricien à Saly",
      badge: "BUILD · Électricité",
      zone: "Saly · Petite Côte",
      url: "https://kourant.digiylyfe.com/",
      mots: [
        "electricien",
        "électricien",
        "electricite",
        "électricité",
        "courant",
        "kourant",
        "prise",
        "disjoncteur",
        "tableau",
        "panne",
        "lumiere",
        "lumière",
        "cable",
        "câble"
      ],
      zones: ["saly", "mbour", "petite cote", "petite côte"],
      description:
        "Électricien pour panne, prise, tableau, disjoncteur et installation."
    },
    {
      id: "driver-aibd",
      titre: "DIGIY DRIVER — Chauffeur / trajet AIBD",
      badge: "DRIVER · Transport",
      zone: "AIBD · Dakar · Saly",
      url: "https://driver-client.digiylyfe.com/",
      mots: [
        "chauffeur",
        "driver",
        "taxi",
        "trajet",
        "aibd",
        "aeroport",
        "aéroport",
        "transport",
        "voiture"
      ],
      zones: ["aibd", "dakar", "saly", "mbour"],
      description:
        "Préparer une demande chauffeur, trajet ou transfert AIBD."
    },
    {
      id: "loc-saly",
      titre: "DIGIY LOC — Location / logement",
      badge: "LOC · Logement",
      zone: "Saly · Petite Côte",
      url: "https://loc.digiylyfe.com/",
      mots: [
        "location",
        "louer",
        "logement",
        "appartement",
        "chambre",
        "studio",
        "villa",
        "sejour",
        "séjour"
      ],
      zones: ["saly", "mbour", "petite cote", "petite côte"],
      description:
        "Trouver ou préparer une demande de logement / location."
    },
    {
      id: "astou-boutique",
      titre: "Astou Boutique — DIGIY MARKET",
      badge: "MARKET · Boutique",
      zone: "Saly · Sénégal",
      url: "https://astou-boutique.digiylyfe.com/",
      mots: [
        "boutique",
        "market",
        "produit",
        "acheter",
        "vente",
        "commerce",
        "astou"
      ],
      zones: ["saly", "senegal", "sénégal"],
      description:
        "Boutique publique pour présenter les produits et contacter directement."
    },
    {
      id: "explore",
      titre: "DIGIY EXPLORE — Sorties et lieux",
      badge: "EXPLORE · Découverte",
      zone: "Sénégal",
      url: "https://explore.digiylyfe.com/",
      mots: [
        "sortie",
        "visiter",
        "decouvrir",
        "découvrir",
        "lieu",
        "restaurant",
        "resto",
        "activite",
        "activité",
        "weekend"
      ],
      zones: ["saly", "dakar", "mbour", "senegal", "sénégal"],
      description:
        "Découvrir des lieux, sorties et activités."
    }
  ];

  function norm(v) {
    return String(v || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[’']/g, " ")
      .replace(/[^a-z0-9\s-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function getTextFromPage() {
    const selectors = [
      "#digiy-voice-input",
      "#digiyVoiceInput",
      "#voiceInput",
      "#publicVoiceInput",
      "#q",
      "#search",
      "textarea",
      "input[type='search']",
      "input[type='text']"
    ];

    for (const s of selectors) {
      const el = document.querySelector(s);
      if (el && String(el.value || el.textContent || "").trim()) {
        return String(el.value || el.textContent || "").trim();
      }
    }

    return "";
  }

  function scoreItem(item, rawText) {
    const text = norm(rawText);
    let score = 0;

    for (const mot of item.mots || []) {
      const m = norm(mot);
      if (m && text.includes(m)) score += 10;
    }

    for (const zone of item.zones || []) {
      const z = norm(zone);
      if (z && text.includes(z)) score += 4;
    }

    return score;
  }

  function findMatches(rawText) {
    return ANNUAIRE_DIRECT
      .map(item => ({
        item,
        score: scoreItem(item, rawText)
      }))
      .filter(x => x.score >= 10)
      .sort((a, b) => b.score - a.score);
  }

  function ensureBox() {
    let box = document.querySelector("#digiy-fiches-resultats");

    if (!box) {
      box = document.createElement("section");
      box.id = "digiy-fiches-resultats";
      box.style.cssText = `
        margin:18px auto;
        max-width:980px;
        padding:14px;
        border-radius:24px;
        background:rgba(255,255,255,.08);
        border:1px solid rgba(255,255,255,.18);
        color:inherit;
        position:relative;
        z-index:9999;
      `;

      const anchor =
        document.querySelector("main") ||
        document.querySelector(".app") ||
        document.querySelector(".container") ||
        document.body;

      anchor.appendChild(box);
    }

    return box;
  }

  function escapeHtml(v) {
    return String(v || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function speak(text) {
    const msg = String(text || "").trim();
    if (!msg) return;

    window.DIGIY_LAST_PUBLIC_RESPONSE = msg;

    try {
      if (!window.speechSynthesis) return;

      window.speechSynthesis.cancel();

      const u = new SpeechSynthesisUtterance(msg);
      u.lang = "fr-FR";
      u.rate = 0.88;
      u.pitch = 0.95;
      u.volume = 1;

      const voices = window.speechSynthesis.getVoices
        ? window.speechSynthesis.getVoices()
        : [];

      const frVoice =
        voices.find(v => /fr/i.test(v.lang || "")) ||
        voices[0];

      if (frVoice) u.voice = frVoice;

      window.speechSynthesis.speak(u);
    } catch (err) {
      console.warn("DIGIY voix non disponible", err);
    }
  }

  function renderDirect(matches, rawText) {
    const box = ensureBox();

    if (!matches.length) {
      box.innerHTML = `
        <div style="padding:14px;border-radius:18px;background:rgba(0,0,0,.18);">
          <strong>👂 Demande reçue</strong><br>
          La demande est comprise, mais aucune fiche directe n’est encore liée à ces mots.
          <div style="opacity:.8;margin-top:6px;">${escapeHtml(rawText)}</div>
        </div>
      `;
      speak("Demande reçue, mais aucune fiche directe n’est encore liée.");
      return;
    }

    box.innerHTML = `
      <div style="font-size:18px;font-weight:1000;margin-bottom:10px;">
        ✅ Fiche directe trouvée
      </div>
      ${matches
        .slice(0, 4)
        .map(({ item }) => `
          <article style="
            padding:14px;
            border-radius:20px;
            margin:10px 0;
            background:rgba(255,255,255,.10);
            border:1px solid rgba(255,255,255,.18);
          ">
            <div style="font-size:13px;opacity:.85;font-weight:900;">
              ${escapeHtml(item.badge)}
            </div>
            <div style="font-size:20px;font-weight:1000;margin-top:4px;">
              ${escapeHtml(item.titre)}
            </div>
            <div style="opacity:.88;margin-top:4px;">
              📍 ${escapeHtml(item.zone)}
            </div>
            <p style="margin:8px 0 12px;line-height:1.45;">
              ${escapeHtml(item.description)}
            </p>
            <a href="${escapeHtml(item.url)}"
               target="_self"
               style="
                display:inline-flex;
                align-items:center;
                gap:8px;
                padding:12px 16px;
                border-radius:999px;
                text-decoration:none;
                font-weight:1000;
                background:#c4973f;
                color:#111;
               ">
              Ouvrir la fiche ↗
            </a>
          </article>
        `)
        .join("")}
    `;
  }

  function routeDirect(rawText, autoOpen) {
    const text = String(rawText || "").trim();
    if (!text) return false;

    const matches = findMatches(text);

    if (!matches.length) {
      renderDirect([], text);
      return false;
    }

    const top = matches[0];
    const second = matches[1];

    const clearWinner =
      top.score >= 10 &&
      (!second || top.score >= second.score + 6);

    renderDirect(matches, text);

    if (clearWinner) {
      speak("Fiche directe trouvée. J’ouvre maintenant : " + top.item.titre + ".");
      if (autoOpen) {
        setTimeout(function () {
          window.location.href = top.item.url;
        }, 350);
      }
    } else {
      speak("Plusieurs fiches peuvent correspondre. Choisis la bonne fiche.");
    }

    return true;
  }

  window.digiyRouteToFiches = function (txt) {
    return routeDirect(txt, true);
  };

  window.digiySpeakPublicResponse = function () {
    speak(
      window.DIGIY_LAST_PUBLIC_RESPONSE ||
      "DIGIYLYFE écoute la demande et ouvre la bonne fiche."
    );
  };

  document.addEventListener(
    "click",
    function (e) {
      const btn = e.target.closest("button, a, [role='button']");
      if (!btn) return;

      const label = norm(
        btn.innerText ||
        btn.textContent ||
        btn.getAttribute("aria-label") ||
        btn.getAttribute("title") ||
        ""
      );

      const isAction =
        label === "go" ||
        label.includes("go") ||
        label.includes("voir") ||
        label.includes("chercher") ||
        label.includes("rechercher") ||
        label.includes("action") ||
        label.includes("ecoute") ||
        label.includes("écoute");

      const isOnlyAudio =
        label.includes("ecouter") ||
        label.includes("écouter") ||
        label.includes("audio");

      if (isOnlyAudio && !label.includes("go")) {
        window.digiySpeakPublicResponse();
        return;
      }

      if (!isAction) return;

      const text = getTextFromPage();
      if (!text) return;

      const handled = routeDirect(text, true);

      if (handled) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }
    },
    true
  );

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Enter") return;

    const el = e.target;
    if (!el) return;

    const tag = String(el.tagName || "").toLowerCase();
    if (tag !== "input" && tag !== "textarea") return;

    const text = getTextFromPage();
    if (!text) return;

    const handled = routeDirect(text, true);

    if (handled) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      return false;
    }
  }, true);

  window.addEventListener("digiy:voice-final", function (ev) {
    const text =
      ev && ev.detail
        ? ev.detail.text || ev.detail.transcript || ""
        : "";

    if (text) routeDirect(text, true);
  });

  console.log("✅ DIGIYLYFE patch final voix → fiches directes actif");
})();
