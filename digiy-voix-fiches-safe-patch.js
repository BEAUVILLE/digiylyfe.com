/* =========================================================
   DIGIYLYFE — PATCH VOIX → FICHES PUBLIQUES
   Fichier : digiy-voix-fiches-safe-patch.js
   Rôle :
   - ne casse pas la voix existante
   - lit la demande écrite ou vocale
   - remonte les fiches compatibles
   - ouvre la vraie fiche si une seule correspond clairement
   ========================================================= */

(function () {
  "use strict";

  if (window.DIGIY_VOIX_FICHES_SAFE_PATCH_READY) return;
  window.DIGIY_VOIX_FICHES_SAFE_PATCH_READY = true;

  const AUTO_OPEN_EXACT = true;

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

  function getAnnuaire() {
    return Array.isArray(window.DIGIY_ANNUAIRE_PUBLIC)
      ? window.DIGIY_ANNUAIRE_PUBLIC
      : [];
  }

  function getMainInput() {
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
      if (el) return el;
    }

    return null;
  }

  function getInputText() {
    const el = getMainInput();
    if (!el) return "";
    return el.value || el.textContent || "";
  }

  function setLastResponse(text) {
    window.DIGIY_LAST_PUBLIC_RESPONSE = text || "";
  }

  function speak(text) {
    const message = String(text || "").trim();
    if (!message) return;

    setLastResponse(message);

    try {
      if (!("speechSynthesis" in window)) return;

      window.speechSynthesis.cancel();

      const u = new SpeechSynthesisUtterance(message);
      u.lang = "fr-FR";
      u.rate = 0.88;
      u.pitch = 0.95;
      u.volume = 1;

      const voices = window.speechSynthesis.getVoices
        ? window.speechSynthesis.getVoices()
        : [];

      const maleOrFrench =
        voices.find(v => /fr/i.test(v.lang || "") && /male|homme/i.test(v.name || "")) ||
        voices.find(v => /fr/i.test(v.lang || "")) ||
        voices[0];

      if (maleOrFrench) u.voice = maleOrFrench;

      window.speechSynthesis.speak(u);
    } catch (e) {
      console.warn("DIGIY voix indisponible:", e);
    }
  }

  function ensureResultBox() {
    let box =
      document.querySelector("#digiy-fiches-resultats") ||
      document.querySelector("#fiches-resultats") ||
      document.querySelector("#results") ||
      document.querySelector("#resultats") ||
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
    `;

    const anchor =
      document.querySelector("main") ||
      document.querySelector(".app") ||
      document.querySelector(".container") ||
      document.body;

    anchor.appendChild(box);
    return box;
  }

  function scoreItem(item, rawText) {
    const text = norm(rawText);
    if (!text) return 0;

    let score = 0;

    const mots = []
      .concat(item.mots || [])
      .concat(item.categories || [])
      .concat([item.nom, item.titre, item.badge]);

    for (const m of mots) {
      const k = norm(m);
      if (k && text.includes(k)) score += 6;
    }

    for (const z of item.zones || []) {
      const k = norm(z);
      if (k && text.includes(k)) score += 4;
    }

    const genericArtisan =
      text.includes("artisan") ||
      text.includes("intervention") ||
      text.includes("travaux") ||
      text.includes("service");

    if (genericArtisan && (item.categories || []).some(c => ["artisan", "build", "service"].includes(norm(c)))) {
      score += 3;
    }

    const genericZoneSaly =
      text.includes("saly") ||
      text.includes("mbour") ||
      text.includes("petite cote");

    if (genericZoneSaly && (item.zones || []).some(z => ["saly", "mbour", "petite cote"].includes(norm(z)))) {
      score += 2;
    }

    return score;
  }

  function searchFiches(rawText) {
    const annuaire = getAnnuaire();

    return annuaire
      .map(item => ({
        item,
        score: scoreItem(item, rawText)
      }))
      .filter(x => x.score > 0 && x.item && x.item.statut === "public")
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
  }

  function isGenericRequest(rawText) {
    const text = norm(rawText);

    const genericWords = [
      "artisan",
      "intervention",
      "service",
      "besoin artisan",
      "demande preparee",
      "a preciser",
      "moment"
    ];

    const preciseWords = [
      "plombier",
      "plomberie",
      "fuite",
      "robinet",
      "macon",
      "maçon",
      "electricien",
      "electricite",
      "électricien",
      "électricité",
      "chauffeur",
      "aibd",
      "boutique",
      "solaire",
      "location",
      "appartement",
      "reservation",
      "réservation"
    ];

    const hasGeneric = genericWords.some(w => text.includes(norm(w)));
    const hasPrecise = preciseWords.some(w => text.includes(norm(w)));

    return hasGeneric && !hasPrecise;
  }

  function renderResults(matches, rawText) {
    const box = ensureResultBox();

    if (!matches.length) {
      box.innerHTML = `
        <div style="padding:14px;border-radius:18px;background:rgba(0,0,0,.18);">
          <strong>👂 Demande reçue</strong><br>
          Je n’ai pas encore trouvé de fiche directe pour cette demande.
          <div style="opacity:.8;margin-top:6px;">Demande : ${escapeHtml(rawText)}</div>
        </div>
      `;

      speak("Demande reçue. Je n’ai pas encore trouvé de fiche directe, mais la demande est prête.");
      return;
    }

    const cards = matches
      .map(({ item }) => {
        return `
          <article style="
            padding:14px;
            border-radius:20px;
            margin:10px 0;
            background:rgba(255,255,255,.10);
            border:1px solid rgba(255,255,255,.18);
          ">
            <div style="font-size:13px;opacity:.85;font-weight:800;">${escapeHtml(item.badge || "DIGIY")}</div>
            <div style="font-size:20px;font-weight:1000;margin-top:4px;">${escapeHtml(item.titre || item.nom)}</div>
            <div style="opacity:.88;margin-top:4px;">📍 ${escapeHtml(item.zone || "")}</div>
            <p style="margin:8px 0 12px;line-height:1.45;">${escapeHtml(item.description || "")}</p>
            <a href="${escapeAttr(item.url)}"
               target="_self"
               style="
                display:inline-flex;
                align-items:center;
                gap:8px;
                padding:11px 15px;
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
      })
      .join("");

    box.innerHTML = `
      <div style="margin-bottom:10px;font-weight:1000;font-size:18px;">
        ✅ Fiches qui remontent
      </div>
      <div style="opacity:.85;margin-bottom:10px;">
        Les résultats remontent directement après la demande.
      </div>
      ${cards}
    `;
  }

  function escapeHtml(v) {
    return String(v || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function escapeAttr(v) {
    return escapeHtml(v).replaceAll("`", "");
  }

  function routeToFiches(rawText, opts) {
    const options = opts || {};
    const text = String(rawText || "").trim();
    if (!text) return false;

    const matches = searchFiches(text);
    renderResults(matches, text);

    if (!matches.length) return false;

    const top = matches[0];
    const second = matches[1];

    const exactEnough =
      top.score >= 10 &&
      (!second || top.score >= second.score + 4) &&
      !isGenericRequest(text);

    const response =
      matches.length === 1 || exactEnough
        ? `J’ai trouvé la fiche directe : ${top.item.titre}.`
        : `J’ai trouvé ${matches.length} fiches possibles. Choisis la bonne fiche.`;

    speak(response);

    if (AUTO_OPEN_EXACT && options.autoOpen && exactEnough && top.item.url) {
      setTimeout(function () {
        window.location.href = top.item.url;
      }, 450);
      return true;
    }

    return true;
  }

  window.digiyRouteToFiches = routeToFiches;
  window.digiySpeakPublicResponse = function () {
    speak(window.DIGIY_LAST_PUBLIC_RESPONSE || "DIGIYLYFE écoute la demande et ouvre la bonne voie.");
  };

  document.addEventListener(
    "click",
    function (e) {
      const btn = e.target.closest("button, a, [role='button']");
      if (!btn) return;

      const label = norm(btn.innerText || btn.textContent || btn.getAttribute("aria-label") || "");

      const isGo =
        label === "go" ||
        label.includes("go") ||
        label.includes("voir") ||
        label.includes("chercher") ||
        label.includes("rechercher") ||
        label.includes("action");

      const isListen =
        label.includes("ecouter") ||
        label.includes("écouter") ||
        label.includes("audio");

      if (isListen && !isGo) {
        window.digiySpeakPublicResponse();
        return;
      }

      if (!isGo) return;

      const text = getInputText();
      if (!text.trim()) return;

      const handled = routeToFiches(text, { autoOpen: true });

      if (handled) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    true
  );

  let lastValue = "";
  setInterval(function () {
    const text = getInputText();
    const clean = String(text || "").trim();

    if (!clean || clean === lastValue) return;

    lastValue = clean;

    if (clean.length >= 4) {
      routeToFiches(clean, { autoOpen: false });
    }
  }, 900);

  window.addEventListener("digiy:voice-final", function (ev) {
    const text = ev && ev.detail ? ev.detail.text || ev.detail.transcript || "" : "";
    if (text) routeToFiches(text, { autoOpen: false });
  });

  console.log("✅ DIGIY voix → fiches SAFE patch actif");
})();
