/* =========================================================
   DIGIYLYFE — PRIORITÉ FICHES DIRECTES
   Fichier : digiy-priorite-fiches-directes.js

   Rôle :
   - NE REMPLACE PAS ACTION PRO
   - passe devant seulement si une vraie fiche existe
   - si aucune fiche : silence total, ACTION PRO continue
   ========================================================= */

(function () {
  "use strict";

  if (window.DIGIY_PRIORITE_FICHES_DIRECTES_READY) return;
  window.DIGIY_PRIORITE_FICHES_DIRECTES_READY = true;

  const AUTO_OPEN = true;

  const FICHES_DIRECTES = [
    {
      id: "helage-plombier",
      titre: "Helage — Plombier à Saly",
      badge: "BUILD · Plomberie",
      zone: "Saly · Petite Côte",
      url: "https://helage-plombier.digiylyfe.com/",
      metiers: [
        "plombier",
        "plomberie",
        "artisan plombier",
        "fuite",
        "robinet",
        "robinetterie",
        "lavabo",
        "wc",
        "douche",
        "evacuation",
        "evacuer",
        "installation eau"
      ],
      zones: ["saly", "mbour", "petite cote", "petite côte"],
      texte:
        "Plombier à Saly pour fuite, robinetterie, évacuation et petits travaux."
    },
    {
      id: "mbaye-macon",
      titre: "Mbaye — Entrepreneur maçon à Saly",
      badge: "BUILD · Maçonnerie",
      zone: "Saly · Petite Côte",
      url: "https://mbaye-macon.digiylyfe.com/",
      metiers: [
        "macon",
        "maçon",
        "maconnerie",
        "maçonnerie",
        "entrepreneur macon",
        "entrepreneur maçon",
        "chantier",
        "construction",
        "renovation",
        "rénovation",
        "mur",
        "dalle",
        "villa",
        "travaux"
      ],
      zones: ["saly", "mbour", "petite cote", "petite côte"],
      texte:
        "Entrepreneur maçon pour travaux, rénovation, construction et aménagement."
    },
    {
      id: "kourant-electricite",
      titre: "Kourant — Électricien à Saly",
      badge: "BUILD · Électricité",
      zone: "Saly · Petite Côte",
      url: "https://kourant.digiylyfe.com/",
      metiers: [
        "electricien",
        "électricien",
        "electricite",
        "électricité",
        "courant",
        "kourant",
        "prise",
        "disjoncteur",
        "tableau",
        "panne electrique",
        "panne électrique",
        "lumiere",
        "lumière",
        "cable",
        "câble"
      ],
      zones: ["saly", "mbour", "petite cote", "petite côte"],
      texte:
        "Électricien pour panne, prise, tableau, disjoncteur et installation."
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

  function pageText() {
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
      if (!el) continue;

      const value = String(el.value || el.textContent || "").trim();
      if (value) return value;
    }

    return "";
  }

  function scoreFiche(fiche, demande) {
    const text = norm(demande);
    if (!text) return 0;

    let score = 0;

    for (const mot of fiche.metiers || []) {
      const m = norm(mot);
      if (m && text.includes(m)) score += 20;
    }

    for (const zone of fiche.zones || []) {
      const z = norm(zone);
      if (z && text.includes(z)) score += 6;
    }

    if (
      text.includes("artisan") ||
      text.includes("intervention") ||
      text.includes("service") ||
      text.includes("besoin")
    ) {
      score += 2;
    }

    return score;
  }

  function chercherFiche(demande) {
    const results = FICHES_DIRECTES
      .map(fiche => ({
        fiche,
        score: scoreFiche(fiche, demande)
      }))
      .filter(x => x.score >= 20)
      .sort((a, b) => b.score - a.score);

    if (!results.length) return null;

    const first = results[0];
    const second = results[1];

    if (!second) return first.fiche;

    if (first.score >= second.score + 8) return first.fiche;

    return null;
  }

  function ensureResultsBox() {
    let box =
      document.querySelector("#digiy-fiches-resultats") ||
      document.querySelector("[data-digiy-results]");

    if (box) return box;

    box = document.createElement("section");
    box.id = "digiy-fiches-resultats";
    box.setAttribute("data-digiy-results", "true");

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

  function speak(msg) {
    const text = String(msg || "").trim();
    if (!text) return;

    window.DIGIY_LAST_PUBLIC_RESPONSE = text;

    try {
      if (!window.speechSynthesis) return;

      window.speechSynthesis.cancel();

      const u = new SpeechSynthesisUtterance(text);
      u.lang = "fr-FR";
      u.rate = 0.88;
      u.pitch = 0.95;
      u.volume = 1;

      const voices = window.speechSynthesis.getVoices
        ? window.speechSynthesis.getVoices()
        : [];

      const fr =
        voices.find(v => /fr/i.test(v.lang || "")) ||
        voices[0];

      if (fr) u.voice = fr;

      window.speechSynthesis.speak(u);
    } catch (e) {
      console.warn("DIGIY voix indisponible", e);
    }
  }

  function afficherFiche(fiche) {
    const box = ensureResultsBox();

    box.innerHTML = `
      <div style="font-size:18px;font-weight:1000;margin-bottom:10px;">
        ✅ Fiche PRO directe trouvée
      </div>

      <article style="
        padding:14px;
        border-radius:20px;
        margin:10px 0;
        background:rgba(255,255,255,.10);
        border:1px solid rgba(255,255,255,.18);
      ">
        <div style="font-size:13px;opacity:.85;font-weight:900;">
          ${escapeHtml(fiche.badge)}
        </div>

        <div style="font-size:20px;font-weight:1000;margin-top:4px;">
          ${escapeHtml(fiche.titre)}
        </div>

        <div style="opacity:.88;margin-top:4px;">
          📍 ${escapeHtml(fiche.zone)}
        </div>

        <p style="margin:8px 0 12px;line-height:1.45;">
          ${escapeHtml(fiche.texte)}
        </p>

        <a href="${escapeHtml(fiche.url)}"
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
    `;
  }

  function prioriteFiche(demande, autoOpen) {
    const text = String(demande || "").trim();
    if (!text) return false;

    const fiche = chercherFiche(text);

    /*
      IMPORTANT :
      Si aucune fiche trouvée, on ne parle pas.
      On ne bloque pas.
      On laisse ACTION PRO continuer.
    */
    if (!fiche) return false;

    afficherFiche(fiche);
    speak("Fiche PRO directe trouvée. J’ouvre " + fiche.titre + ".");

    if (AUTO_OPEN && autoOpen) {
      setTimeout(function () {
        window.location.href = fiche.url;
      }, 450);
    }

    return true;
  }

  window.digiyPrioriteFicheDirecte = prioriteFiche;

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
        label.includes("action");

      if (!isAction) return;

      const demande = pageText();
      if (!demande) return;

      const handled = prioriteFiche(demande, true);

      if (handled) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }

      /*
        Si handled = false :
        on ne fait rien.
        ACTION PRO continue.
      */
    },
    true
  );

  document.addEventListener(
    "keydown",
    function (e) {
      if (e.key !== "Enter") return;

      const tag = String(e.target && e.target.tagName || "").toLowerCase();
      if (tag !== "input" && tag !== "textarea") return;

      const demande = pageText();
      if (!demande) return;

      const handled = prioriteFiche(demande, true);

      if (handled) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }
    },
    true
  );

  window.addEventListener("digiy:voice-final", function (ev) {
    const demande =
      ev && ev.detail
        ? ev.detail.text || ev.detail.transcript || ""
        : "";

    if (!demande) return;

    prioriteFiche(demande, true);
  });

  console.log("✅ DIGIY priorité fiches directes active — ACTION PRO conservé");
})();
