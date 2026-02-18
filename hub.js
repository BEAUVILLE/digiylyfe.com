/* DIGIY HUB F16 ENHANCED — Business-ready • Data-driven • 0% commission
   ✅ MODULES définis en dur (plus besoin de modules.json)
*/

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const STORAGE_PHONE     = "DIGIY_HUB_PHONE";
const STORAGE_FILTER    = "DIGIY_HUB_FILTER";
const STORAGE_SEARCH    = "DIGIY_HUB_SEARCH";
const STORAGE_FAVORITES = "DIGIY_HUB_FAVORITES"; // NEW
const STORAGE_ANALYTICS = "DIGIY_HUB_ANALYTICS"; // NEW
const STORAGE_CITY      = "DIGIY_HUB_CITY";      // NEW

const state = {
  phone: "",
  filter: "all", // all | public | pro
  q: "",
  favorites: [], // NEW
  city: "all"    // NEW: all | saly-mbour | dakar | thies | touba ...
};

/* =========================
   LINKS (SOUS-DOMAINES OFFICIELS)
   ========================= */
const LINKS = {
  digiylyfe:    "https://digiylyfe.com/",
  apps:         "https://apps.digiylyfe.com/",
  admin:        "https://admin.digiylyfe.com/",
  audio:        "https://apps.digiylyfe.com/audio/",
  tarifs:       "https://tarifs.digiylyfe.com/",

  // ✅ "Vas chez DIGIY"
  vasChezDigiy: "https://vas-chez-digiy.digiylyfe.com/",

  // NDIMBAL
  ndimbalMap:       "https://ndimbal-map.digiylyfe.com/",
  ndimbalAnnonces:  "https://ndimbal-annonces.digiylyfe.com/",
  ndimbalLoc:       "https://ndimbal-loc.digiylyfe.com/",

  // ✅ HubDrive = NDIMBAL annonces
  hubDrive:     "https://ndimbal-annonces.digiylyfe.com/",

  // Public
  bonneAffaire: "https://bonne-affaire.digiylyfe.com/",
  driverClient: "https://driver-client.digiylyfe.com/",
  loc:          "https://loc.digiylyfe.com/",
  resto:        "https://resto.digiylyfe.com/",
  build:        "https://build.digiylyfe.com/",
  explore:      "https://explore.digiylyfe.com/",
  market:       "https://market.digiylyfe.com/",
  jobs:         "https://jobs.digiylyfe.com/",
  pay:          "https://pay.digiylyfe.com/",
  resaTable:    "https://resa-table-resto.digiylyfe.com/",

  // GitHub
  notable:      "https://beauville.github.io/digiy-notable/",

  // PRO
  inscriptionPro: "https://inscription-pro.digiylyfe.com/",
  espacePro:      "https://pro-espace.digiylyfe.com/",

  // Modules PRO dédiés
  driverPro:    "https://pro-driver.digiylyfe.com/",
  locPro:       "https://pro-loc.digiylyfe.com/",
  caissePro:    "https://pro-caisse.digiylyfe.com/",
  buildPro:     "https://pro-build.digiylyfe.com/",
  marketPro:    "https://pro-market.digiylyfe.com/",
  jobsPro:      "https://pro-job.digiylyfe.com/",
  restoPro:     "https://pro-resto.digiylyfe.com/",
  resaTablePro: "https://pro-resa-resto.digiylyfe.com/",
  payPro:       "https://pay.digiylyfe.com/",
  explorePro:   "https://explore.digiylyfe.com/",

  // FRET PIN direct
  fretClientProPin:     "https://pro-fret-client.digiylyfe.com/pin.html",
  fretChauffeurProPin:  "https://pro-fret-chauffeur.digiylyfe.com/pin.html"
};

const PRO_DEFAULT_URL = LINKS.espacePro;

/* =========================
   VILLES (déploiement local)
   NOTE: URLs "ville" optionnelles. Si vide => modal “bientôt”.
   ========================= */
const CITIES = [
  { key: "all",        name: "Toutes les villes", status: "live", label: "🌍 GLOBAL",       url: "" },
  { key: "saly-mbour", name: "Saly • Mbour",      status: "live", label: "✅ LIVE",         url: "" },
  { key: "dakar",      name: "Dakar",            status: "beta", label: "🟡 LANCEMENT",     url: "" },
  { key: "thies",      name: "Thiès",            status: "soon", label: "⚪ BIENTÔT",       url: "" },
  { key: "touba",      name: "Touba",            status: "soon", label: "⚪ BIENTÔT",       url: "" }
];

function getCity(key) {
  return CITIES.find(c => c.key === key) || CITIES[0];
}

function setCity(cityKey) {
  state.city = cityKey || "all";
  localStorage.setItem(STORAGE_CITY, state.city);
}

function openCity(cityKey) {
  const c = getCity(cityKey);
  setCity(c.key);

  // Si tu poses plus tard des pages par ville, mets l’URL dans CITIES[].url
  if (!c.url) {
    modal.info({
      title: `DIGIY ${escapeHtml(c.name)}`,
      text: `${escapeHtml(c.label)}<br><br>On ouvre ville par ville pour créer un noyau solide : pros équipés, visibles, clients directs.`
    });
    return;
  }
  hub.open(c.url);
}

function joinCityFlow() {
  const c = getCity(state.city);

  // On ouvre l’inscription PRO + ville (optionnel)
  const url = new URL(LINKS.inscriptionPro);
  if (c && c.key && c.key !== "all") url.searchParams.set("city", c.key);
  if (state.phone) url.searchParams.set("phone", state.phone);

  hub.open(url.toString());
}

/* =========================
   MODULES (définis en dur + MÉTADONNÉES)
   ========================= */
const MODULES = [
  // === PUBLIC ===
  { key: "bonneAffaire", name: "Bonne Affaire", icon: "🎯", tag: "marketplace", desc: "Deals & offres", kind: "public", status: "live", statusLabel: "LIVE", phoneParam: false, createdAt: "2025-12-01", featured: true },
  { key: "driverClient", name: "DIGIY DRIVER", icon: "🚗", tag: "transport", desc: "Réserver ta course VTC", kind: "public", status: "live", statusLabel: "LIVE", phoneParam: true, createdAt: "2025-10-15", featured: true },
  { key: "loc", name: "DIGIY LOC", icon: "🏠", tag: "accommodation", desc: "Trouver un logement", kind: "public", status: "live", statusLabel: "LIVE", phoneParam: true, createdAt: "2025-11-20", featured: true },
  { key: "resto", name: "DIGIY RESTO", icon: "🍽️", tag: "restaurant", desc: "Commander à manger", kind: "public", status: "live", statusLabel: "LIVE", phoneParam: true, createdAt: "2025-11-15", featured: true },
  { key: "resaTable", name: "Résa Table", icon: "📅", tag: "reservation", desc: "Réserver une table", kind: "public", status: "live", statusLabel: "LIVE", phoneParam: true, createdAt: "2026-01-20", featured: false },
  { key: "build", name: "DIGIY BUILD", icon: "🏗️", tag: "services", desc: "Services de construction", kind: "public", status: "beta", statusLabel: "BETA", phoneParam: true, createdAt: "2026-02-01", featured: false },
  { key: "explore", name: "Explore", icon: "🗺️", tag: "discovery", desc: "Découvrir la région", kind: "public", status: "live", statusLabel: "LIVE", phoneParam: false, createdAt: "2025-12-10", featured: false },
  { key: "market", name: "DIGIY MARKET", icon: "🛍️", tag: "marketplace", desc: "Acheter/vendre", kind: "public", status: "live", statusLabel: "LIVE", phoneParam: true, createdAt: "2025-10-01", featured: true },
  { key: "jobs", name: "DIGIY JOBS", icon: "💼", tag: "emploi", desc: "Offres d'emploi", kind: "public", status: "live", statusLabel: "LIVE", phoneParam: true, createdAt: "2025-11-01", featured: false },
  { key: "pay", name: "DIGIY PAY", icon: "💳", tag: "paiement", desc: "Portefeuille digital", kind: "public", status: "live", statusLabel: "LIVE", phoneParam: true, createdAt: "2025-09-15", featured: true },
  { key: "audio", name: "DIGIY AUDIO", icon: "🎵", tag: "content", desc: "Écoute articles et contenus", kind: "public", status: "live", statusLabel: "LIVE", phoneParam: false, createdAt: "2026-02-17", featured: true },
  { key: "notable", name: "Notable", icon: "📝", tag: "documentation", desc: "Blog & ressources", kind: "public", status: "live", statusLabel: "LIVE", phoneParam: false, createdAt: "2025-08-01", featured: false },

  // === NDIMBAL ===
  { key: "ndimbalMap", name: "NDIMBAL Map", icon: "🗺️", tag: "ndimbal", desc: "Carte des annonces", kind: "public", status: "live", statusLabel: "LIVE", phoneParam: true, createdAt: "2025-12-15", featured: true },
  { key: "ndimbalAnnonces", name: "NDIMBAL Annonces", icon: "📢", tag: "ndimbal", desc: "Hub Drive - Vendre", kind: "public", status: "live", statusLabel: "LIVE", phoneParam: true, createdAt: "2025-11-01", featured: true },
  { key: "ndimbalLoc", name: "NDIMBAL Loc", icon: "🏡", tag: "ndimbal", desc: "Locations NDIMBAL", kind: "public", status: "live", statusLabel: "LIVE", phoneParam: true, createdAt: "2025-12-20", featured: false },

  // === PRO ===
  { key: "inscriptionPro", name: "Inscription PRO", icon: "✍️", tag: "auth", desc: "Créer compte professionnel", kind: "pro", status: "live", statusLabel: "LIVE", phoneParam: true, createdAt: "2025-09-01", featured: true },
  { key: "espacePro", name: "Espace PRO", icon: "🏢", tag: "dashboard", desc: "Tableau de bord pro", kind: "pro", status: "live", statusLabel: "LIVE", phoneParam: true, createdAt: "2025-09-01", featured: true },
  { key: "driverPro", name: "DIGIY DRIVER PRO", icon: "🚗", tag: "vtc", desc: "Gérer ta flotte VTC", kind: "pro", status: "live", statusLabel: "LIVE", phoneParam: true, createdAt: "2025-10-15", featured: true },
  { key: "locPro", name: "DIGIY LOC PRO", icon: "🏠", tag: "properties", desc: "Gérer tes logements", kind: "pro", status: "live", statusLabel: "LIVE", phoneParam: true, createdAt: "2025-11-20", featured: true },
  { key: "restoPro", name: "DIGIY RESTO PRO", icon: "👨‍🍳", tag: "restaurant", desc: "Gérer ton resto", kind: "pro", status: "live", statusLabel: "LIVE", phoneParam: true, createdAt: "2025-11-15", featured: true },
  { key: "caissePro", name: "Caisse PRO", icon: "💰", tag: "pos", desc: "Point de vente", kind: "pro", status: "live", statusLabel: "LIVE", phoneParam: true, createdAt: "2025-10-01", featured: false },
  { key: "buildPro", name: "DIGIY BUILD PRO", icon: "🏗️", tag: "construction", desc: "Gérer chantiers", kind: "pro", status: "beta", statusLabel: "BETA", phoneParam: true, createdAt: "2026-02-01", featured: false },
  { key: "marketPro", name: "DIGIY MARKET PRO", icon: "🛍️", tag: "marketplace", desc: "Vendre sur market", kind: "pro", status: "live", statusLabel: "LIVE", phoneParam: true, createdAt: "2025-10-01", featured: false },
  { key: "jobsPro", name: "DIGIY JOBS PRO", icon: "💼", tag: "recruitement", desc: "Recruter", kind: "pro", status: "live", statusLabel: "LIVE", phoneParam: true, createdAt: "2025-11-01", featured: false },
  { key: "payPro", name: "DIGIY PAY PRO", icon: "💳", tag: "paiement", desc: "Gérer paiements", kind: "pro", status: "live", statusLabel: "LIVE", phoneParam: true, createdAt: "2025-09-15", featured: false },
  { key: "explorePro", name: "Explore PRO", icon: "🗺️", tag: "analytics", desc: "Analytics & stats", kind: "pro", status: "live", statusLabel: "LIVE", phoneParam: false, createdAt: "2025-12-01", featured: false },
  { key: "resaTablePro", name: "Résa Table PRO", icon: "📅", tag: "reservation", desc: "Gérer réservations", kind: "pro", status: "live", statusLabel: "LIVE", phoneParam: true, createdAt: "2026-01-20", featured: false }
];

/* =========================
   HELPERS
   ========================= */
function normPhone(p) {
  if (!p) return "";
  let s = String(p).trim();
  s = s.replace(/[^\d+]/g, "");
  if (s && !s.startsWith("+")) {
    if (s.startsWith("221")) s = "+" + s;
  }
  return s;
}

function withPhone(url, phone, param = "phone") {
  if (!url) return "";
  if (!phone) return url;
  try {
    const u = new URL(url);
    u.searchParams.set(param, phone);
    return u.toString();
  } catch (_) {
    const sep = url.includes("?") ? "&" : "?";
    return url + sep + encodeURIComponent(param) + "=" + encodeURIComponent(phone);
  }
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (m) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;",
    '"': "&quot;", "'": "&#039;"
  }[m]));
}

/* DIGIY AUDIO — Global Inject (v2) */
(function () {
  const ID_PLAY  = "digiyAudioFabPlay";
  const ID_STOP  = "digiyAudioFabStop";
  const STYLE_ID = "digiyAudioFabStyle";

  function speak(text, lang = "fr-FR", rate = 1) {
    try {
      if (!("speechSynthesis" in window)) return;
      const u = new SpeechSynthesisUtterance(String(text || ""));
      u.lang = lang;
      u.rate = Math.max(0.6, Math.min(1.3, Number(rate) || 1));
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    } catch (e) {}
  }

  function stop() {
    try { window.speechSynthesis.cancel(); } catch (e) {}
  }

  // expose global
  window.DIGIY_SPEAK = speak;
  window.DIGIY_STOP  = stop;

  function getSmartText() {
    const main = document.querySelector("main");
    const t1 = main ? (main.innerText || "").trim() : "";
    if (t1.length >= 40) return t1;

    const a = document.querySelector("article, section");
    const t2 = a ? (a.innerText || "").trim() : "";
    if (t2.length >= 40) return t2;

    const t3 = (document.body?.innerText || "").trim();
    if (t3.length >= 40) return t3;

    return document.title || "DIGIYLYFE";
  }

  function ensureStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const st = document.createElement("style");
    st.id = STYLE_ID;
    st.textContent = `
#${ID_PLAY}, #${ID_STOP}{
  all: unset !important;
  position: fixed !important;
  z-index: 2147483647 !important;
  right: 14px !important;
  border-radius: 999px !important;
  padding: 12px 14px !important;
  font-weight: 900 !important;
  letter-spacing: .2px !important;
  border: 2px solid rgba(250,204,21,.85) !important;
  background: rgba(2,6,23,.78) !important;
  color: #fff !important;
  backdrop-filter: blur(10px) !important;
  -webkit-backdrop-filter: blur(10px) !important;
  box-shadow: 0 10px 30px rgba(0,0,0,.45) !important;
  cursor: pointer !important;
  user-select: none !important;
  -webkit-tap-highlight-color: transparent !important;
}
#${ID_PLAY}{ bottom: 14px !important; }
#${ID_STOP}{ bottom: 64px !important; border-color: rgba(255,255,255,.35) !important; }
#${ID_PLAY}:active, #${ID_STOP}:active{ transform: scale(.98) !important; }
`;
    document.head.appendChild(st);
  }

  function ensureButtons() {
    ensureStyle();

    if (!document.getElementById(ID_STOP)) {
      const b = document.createElement("button");
      b.id = ID_STOP;
      b.type = "button";
      b.textContent = "⏹ Stop";
      b.addEventListener("click", stop);
      document.body.appendChild(b);
    }

    if (!document.getElementById(ID_PLAY)) {
      const b = document.createElement("button");
      b.id = ID_PLAY;
      b.type = "button";
      b.textContent = "🎧 Écouter";
      b.addEventListener("click", () => speak(getSmartText(), "fr-FR", 1));
      document.body.appendChild(b);
    }
  }

  // Compat: data-digiy-audio handler (v1 behavior)
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-digiy-audio]");
    if (!btn) return;

    const lang = btn.getAttribute("data-lang") || "fr-FR";
    const rate = btn.getAttribute("data-rate") || "1";
    const sel  = btn.getAttribute("data-target") || "";
    let text   = btn.getAttribute("data-text") || "";

    if (!text && sel) {
      const node = document.querySelector(sel);
      text = node ? (node.innerText || node.textContent || "") : "";
    }
    if (!text.trim()) text = document.title || "DIGIYLYFE";

    speak(text, lang, rate);
  });

  function boot() {
    ensureButtons();
    // SPA safety: if DOM changes, re-add buttons
    try {
      new MutationObserver(() => ensureButtons())
        .observe(document.documentElement, { childList: true, subtree: true });
    } catch (e) {}

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stop();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();

// ✅ Compat aliases (évite les bugs silencieux)
const digiySpeak = (...args) => (window.DIGIY_SPEAK ? window.DIGIY_SPEAK(...args) : null);
const digiyStop  = (...args) => (window.DIGIY_STOP  ? window.DIGIY_STOP(...args)  : null);

/* =========================
   MODAL
   ========================= */
const modal = {
  root: null,
  titleEl: null,
  textEl: null,
  okBtn: null,
  cancelBtn: null,
  _onOk: null,
  _onCancel: null,

  init() {
    this.root = $("#modal");
    this.titleEl = $("#modalTitle");
    this.textEl = $("#modalText");
    this.okBtn = $("#modalOk");
    this.cancelBtn = $("#modalCancel");
    if (!this.root) return;

    this.okBtn?.addEventListener("click", () => {
      this.hide();
      if (typeof this._onOk === "function") this._onOk();
    });
    this.cancelBtn?.addEventListener("click", () => {
      this.hide();
      if (typeof this._onCancel === "function") this._onCancel();
    });

    this.root.addEventListener("click", (e) => {
      if (e.target === this.root) this.hide();
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !this.root.classList.contains("hidden")) this.hide();
    });
  },

  show({ title, text, okText = "OK", cancelText = "Annuler", onOk = null, onCancel = null, hideCancel = false }) {
    if (!this.root) return;
    this.titleEl.textContent = title || "Info";
    this.textEl.innerHTML = text || "";
    this.okBtn.textContent = okText;
    this.cancelBtn.textContent = cancelText;
    this._onOk = onOk;
    this._onCancel = onCancel;
    this.cancelBtn.style.display = hideCancel ? "none" : "";
    this.root.classList.remove("hidden");
    this.root.setAttribute("aria-hidden", "false");
  },

  info({ title, text, okText = "OK" }) {
    this.show({ title, text, okText, hideCancel: true });
  },

  hide() {
    if (!this.root) return;
    this.root.classList.add("hidden");
    this.root.setAttribute("aria-hidden", "true");
    this._onOk = null;
    this._onCancel = null;
  }
};

/* =========================
   HUB OVERLAY
   ========================= */
const hub = {
  overlay: null,
  frame: null,
  backBtn: null,
  closeBtn: null,

  init() {
    this.overlay = $("#hubOverlay");
    this.frame = $("#hubFrame");
    this.backBtn = $("#hubBackBtn");
    this.closeBtn = $("#hubCloseBtn");
    if (!this.overlay || !this.frame) return;

    const close = () => this.close();
    this.closeBtn?.addEventListener("click", close);
    this.backBtn?.addEventListener("click", close);

    this.overlay.addEventListener("click", (e) => {
      if (e.target === this.overlay) close();
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !this.overlay.classList.contains("hidden")) close();
    });
  },

  open(url) {
    if (!url) return;
    this.frame.src = url;
    this.overlay.classList.remove("hidden");
    this.overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  },

  close() {
    if (!this.overlay) return;
    this.overlay.classList.add("hidden");
    this.overlay.setAttribute("aria-hidden", "true");
    this.frame.src = "about:blank";
    document.body.style.overflow = "";
    digiyStop(); // ✅ stop audio quand on ferme
  }
};

/* =========================
   UI REFS
   ========================= */
let modulesGridEl, phoneTextEl, searchInputEl;
let statTotalEl, statPublicEl, statProEl;

/* =========================
   FILTERS & FAVORITES
   ========================= */
function setFilter(f) {
  state.filter = f;
  localStorage.setItem(STORAGE_FILTER, f);
  $$(".tab").forEach(btn => btn.classList.toggle("active", btn.dataset.filter === f));
  render();
}

function setSearch(q) {
  state.q = q;
  localStorage.setItem(STORAGE_SEARCH, q);
  render();
}

function toggleFavorite(key) {
  const idx = state.favorites.indexOf(key);
  if (idx >= 0) {
    state.favorites.splice(idx, 1);
  } else {
    state.favorites.push(key);
  }
  localStorage.setItem(STORAGE_FAVORITES, JSON.stringify(state.favorites));
  render();
  trackAnalytic(key, "favorite");
}

function isFavorite(key) {
  return state.favorites.includes(key);
}

function getFilteredModules() {
  const q = (state.q || "").trim().toLowerCase();

  let filtered = MODULES.filter(m => {
    if (state.filter === "public" && m.kind !== "public") return false;
    if (state.filter === "pro" && m.kind !== "pro") return false;
    if (!q) return true;

    const hay = [m.key, m.name, m.tag, m.desc, m.kind, m.status, m.statusLabel].join(" ").toLowerCase();
    return hay.includes(q);
  });

  // 🌟 Trier: favoris d'abord
  filtered.sort((a, b) => {
    const aFav = isFavorite(a.key) ? 1 : 0;
    const bFav = isFavorite(b.key) ? 1 : 0;
    return bFav - aFav;
  });

  return filtered;
}

// 📊 ANALYTICS simple
function trackAnalytic(key, action) {
  try {
    let analytics = {};
    const stored = localStorage.getItem(STORAGE_ANALYTICS);
    if (stored) analytics = JSON.parse(stored);

    if (!analytics[key]) {
      analytics[key] = { clicks: 0, favorites: 0, lastClick: null };
    }

    if (action === "click") {
      analytics[key].clicks += 1;
      analytics[key].lastClick = new Date().toISOString();
    } else if (action === "favorite") {
      analytics[key].favorites = (analytics[key].favorites || 0) + 1;
    }

    localStorage.setItem(STORAGE_ANALYTICS, JSON.stringify(analytics));
  } catch (e) {
    console.warn("[DIGIY] Analytics failed:", e);
  }
}

function getModulePopularity(key) {
  try {
    const stored = localStorage.getItem(STORAGE_ANALYTICS);
    if (!stored) return 0;
    const analytics = JSON.parse(stored);
    return (analytics[key]?.clicks || 0);
  } catch (e) {
    return 0;
  }
}

// 🎯 Calculer les statuts dynamiques
function getSmartStatus(m) {
  const popularity = getModulePopularity(m.key);
  const now = new Date();
  const moduleDate = new Date(m.createdAt || "2025-01-01");
  const daysSinceCreation = Math.floor((now - moduleDate) / (1000 * 60 * 60 * 24));

  // Ordre de priorité: HOT > NOUVEAU > FEATURED > status original
  if (popularity >= 5) {
    return { status: "hot", label: "🔥 HOT", priority: 1 };
  }
  if (daysSinceCreation <= 7) {
    return { status: "nouveau", label: "🆕 NOUVEAU", priority: 2 };
  }
  if (m.featured) {
    return { status: "featured", label: "⭐ FEATURED", priority: 3 };
  }
  if (m.status === "beta") {
    return { status: "beta", label: "🔧 BETA", priority: 4 };
  }
  if (m.status === "soon") {
    return { status: "soon", label: "⏳ BIENTÔT", priority: 5 };
  }

  return { status: m.status, label: m.statusLabel, priority: 99 };
}

function getDaysAgo(dateStr) {
  const moduleDate = new Date(dateStr || "2025-01-01");
  const now = new Date();
  return Math.floor((now - moduleDate) / (1000 * 60 * 60 * 24));
}

function updateStats(filtered) {
  const total = filtered.length;
  const pub = filtered.filter(m => m.kind === "public").length;
  const pro = filtered.filter(m => m.kind === "pro").length;

  if (statTotalEl) statTotalEl.textContent = String(total);
  if (statPublicEl) statPublicEl.textContent = String(pub);
  if (statProEl) statProEl.textContent = String(pro);
}

/* =========================
   CARDS
   ========================= */
function badgeHTML(kind, status, statusLabel) {
  const kindBadge = `<span class="badge kind-${kind}">${kind === "pro" ? "PRO" : "PUBLIC"}</span>`;
  const st = status || "soon";
  const label = statusLabel || st.toUpperCase();

  // Classes CSS pour chaque status (⚠️ nécessite CSS correspondant si tu veux différencier visuellement)
  const statusClasses = {
    "hot": "badge hot-badge",
    "nouveau": "badge nouveau-badge",
    "featured": "badge featured-badge",
    "beta": "badge beta-badge",
    "soon": "badge soon-badge",
    "live": "badge live-badge"
  };

  const badgeClass = statusClasses[st] || "badge live-badge";
  const stBadge = `<span class="${badgeClass}">${escapeHtml(label)}</span>`;
  return kindBadge + stBadge;
}

function getModuleUrl(m) {
  let base = m.directUrl || LINKS[m.key] || "";

  // fallback : si module PRO sans directUrl, on l'envoie vers le portail PRO
  if (m.kind === "pro" && !m.directUrl && !LINKS[m.key]) {
    base = PRO_DEFAULT_URL;
  }

  if (!base) return "";

  if (m.phoneParam && state.phone) {
    base = withPhone(base, state.phone, "phone");
  }
  return base;
}

/* ✅ UPDATED: cardHTML + bouton 🎧 */
function cardHTML(m) {
  const url = getModuleUrl(m);
  const disabled = !url;
  const fav = isFavorite(m.key);

  // Utiliser les statuts intelligents
  const smartStatus = getSmartStatus(m);
  const isHot = smartStatus.status === "hot";
  const isNouveau = smartStatus.status === "nouveau";

  // Classe CSS pour la card si HOT ou NOUVEAU
  const cardClass = isHot ? "card card-hot" : (isNouveau ? "card card-nouveau" : "card");

  return `
    <div class="${cardClass}" tabindex="0" role="button" aria-label="${escapeHtml(m.name)}" data-key="${escapeHtml(m.key)}">
      <div class="cardTop">
        <div class="icon">${escapeHtml(m.icon || "∞")}</div>
        <div style="flex:1;min-width:0">
          <div class="cardTitle">
            ${escapeHtml(m.name)}
            ${fav ? '<span class="favStar">⭐</span>' : ''}
          </div>
          <div class="cardTag">${escapeHtml(m.tag || "")}</div>
          <div class="cardDesc">${escapeHtml(m.desc || "")}</div>

          <div class="badges">
            ${badgeHTML(m.kind, smartStatus.status, smartStatus.label)}
          </div>
        </div>
      </div>

      <div class="cardActions">
        <button class="btn ${disabled ? "disabled" : "primary"}" data-action="open" ${disabled ? "disabled" : ""} type="button">
          Ouvrir →
        </button>

        <button class="btn ${disabled ? "disabled" : ""}" data-action="listen" ${disabled ? "disabled" : ""} type="button">
          🎧 Écouter
        </button>

        <button class="btn ${disabled ? "disabled" : ""}" data-action="favorite" ${disabled ? "disabled" : ""} type="button">
          ${fav ? '⭐ Favoris' : '☆ Ajouter'}
        </button>

        <button class="btn ${disabled ? "disabled" : ""}" data-action="copy" ${disabled ? "disabled" : ""} type="button">
          Copier lien
        </button>
      </div>
    </div>
  `;
}

/* =========================
   RENDER
   ========================= */
function renderGrid() {
  const grid = modulesGridEl;
  if (!grid) return;

  const filtered = getFilteredModules();
  grid.innerHTML = filtered.length
    ? filtered.map(cardHTML).join("")
    : `<div class="empty">
         Aucun module ne correspond à ta recherche frérot.<br>
         <small style="opacity:.75">Pierre par pierre on construit l'empire! 🔥</small>
       </div>`;

  $$(".card", grid).forEach(card => {
    card.addEventListener("click", (e) => {
      const btn = e.target?.closest?.("button");
      const key = card.getAttribute("data-key");
      const m = MODULES.find(x => x.key === key);
      if (!m) return;

      // ✅ FAVORITE
      if (btn && btn.dataset.action === "favorite") {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(key);
        return;
      }

      // ✅ COPY
      if (btn && btn.dataset.action === "copy") {
        e.preventDefault();
        e.stopPropagation();
        const link = getModuleUrl(m);
        if (!link) return;
        navigator.clipboard?.writeText(link).catch(() => {});
        trackAnalytic(key, "click");
        modal.info({ title: "Copié ✅", text: `Lien copié.<br><small>${escapeHtml(link)}</small>` });
        return;
      }

      // ✅ LISTEN (🎧)
      if (btn && btn.dataset.action === "listen") {
        e.preventDefault();
        e.stopPropagation();
        const phrase = `${m.name}. ${m.desc}.`;
        digiySpeak(phrase, "fr-FR", 1);
        return;
      }

      // ✅ OPEN (click sur card ou bouton ouvrir)
      openModule(key);
    });

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModule(card.getAttribute("data-key"));
      }
    });
  });

  updateStats(filtered);
}

function renderPhone() {
  if (!phoneTextEl) return;
  phoneTextEl.textContent = state.phone ? state.phone : "non mémorisé";
}

function render() {
  renderPhone();
  renderGrid();
}

/* =========================
   ACTIONS
   ========================= */
function openModule(key) {
  const m = MODULES.find(x => x.key === key);
  if (!m) return;

  const url = getModuleUrl(m);
  if (!url) {
    modal.info({
      title: "Module non disponible",
      text: "Lien non défini frérot."
    });
    return;
  }

  trackAnalytic(key, "click"); // 📊 Track le clic
  hub.open(url);
}

function askPhone() {
  modal.show({
    title: "Numéro (optionnel)",
    text:
      `Entre ton numéro (ex: <b>+221771234567</b>)<br>
       <small>Le HUB peut l'envoyer à certains modules.</small>
       <div style="margin-top:10px">
         <input id="phonePrompt"
           style="width:100%;padding:12px;border-radius:14px;border:1px solid rgba(148,163,184,.25);background:rgba(2,6,23,.18);color:#fff;outline:none"
           placeholder="+221..." value="${escapeHtml(state.phone)}"/>
       </div>`,
    okText: "Enregistrer",
    cancelText: "Annuler",
    onOk: () => {
      const inp = $("#phonePrompt");
      const val = normPhone(inp?.value || "");
      state.phone = val;
      localStorage.setItem(STORAGE_PHONE, val);
      render();
    }
  });

  setTimeout(() => $("#phonePrompt")?.focus(), 50);
}

/* =========================
   INIT
   ========================= */
function boot() {
  modulesGridEl = $("#modulesGrid");
  phoneTextEl   = $("#phoneText");
  searchInputEl = $("#searchInput");
  statTotalEl   = $("#statTotal");
  statPublicEl  = $("#statPublic");
  statProEl     = $("#statPro");

  modal.init();
  hub.init();

  // state load
  state.phone  = normPhone(localStorage.getItem(STORAGE_PHONE) || "");
  state.filter = localStorage.getItem(STORAGE_FILTER) || "all";
  state.q      = localStorage.getItem(STORAGE_SEARCH) || "";
  state.city   = localStorage.getItem(STORAGE_CITY) || "all";

  // 🌟 Charger les favoris
  try {
    const favStr = localStorage.getItem(STORAGE_FAVORITES);
    state.favorites = favStr ? JSON.parse(favStr) : [];
  } catch (e) {
    state.favorites = [];
  }

  // phone buttons
  $("#btnEditPhone")?.addEventListener("click", askPhone);
  $("#btnClearPhone")?.addEventListener("click", () => {
    state.phone = "";
    localStorage.removeItem(STORAGE_PHONE);
    render();
  });

  // hero CTAs
  // CTA principal : rester sur la vitrine et descendre vers les modules
  $("#btnGetHub")?.addEventListener("click", () => {
    const modulesSection = document.querySelector(".section");
    if (modulesSection) {
      modulesSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  $("#btnDeals")?.addEventListener("click", () => hub.open(LINKS.bonneAffaire));

  // tabs
  $$(".tab").forEach(btn => btn.addEventListener("click", () => setFilter(btn.dataset.filter)));

  // search
  if (searchInputEl) {
    searchInputEl.value = state.q || "";
    searchInputEl.addEventListener("input", () => setSearch(searchInputEl.value));
  }

  $("#btnReset")?.addEventListener("click", () => {
    state.q = "";
    localStorage.removeItem(STORAGE_SEARCH);
    if (searchInputEl) searchInputEl.value = "";
    setFilter("all");
  });

  // brand scroll top
  $("#homeBrand")?.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ===========================
  // BOUTONS FLOTTANTS
  // ===========================
  const tarifBtn = $("#tarif-bubble-btn");
  const espaceBtn = $("#espace-pro-btn");
  const ndimbalHelpBtn = $("#digiy-help-btn");

  // 🏷️ Tarifs DIGIY
  if (tarifBtn) tarifBtn.addEventListener("click", () => hub.open(LINKS.tarifs));

  // 🧰 ESPACE PRO
  if (espaceBtn) espaceBtn.addEventListener("click", () => hub.open(withPhone(PRO_DEFAULT_URL, state.phone, "phone")));

  // ♾️ NDIMBAL - ouvrir popup
  if (ndimbalHelpBtn) {
    ndimbalHelpBtn.addEventListener("click", () => {
      const ndimbal = $("#digiy-ndimbal");
      if (ndimbal) {
        ndimbal.classList.remove("hidden");
        ndimbal.setAttribute("aria-hidden", "false");
      }
    });
  }

  // 📖 MANIFESTE - ouvrir dans nouvel onglet
  const manifestoBtn = document.getElementById('manifesto-bubble-btn');
  if (manifestoBtn) {
    manifestoBtn.addEventListener('click', () => {
      window.open('https://digiylyfe.net/la-revolution-digitale-africaine-sans-commission/', '_blank');
    });
  }

  // ===========================
  // VILLES (bloc vitrine)
  // ===========================
  // boutons "Voir" sur les villes (data-city)
  document.querySelectorAll("[data-city]").forEach(btn => {
    btn.addEventListener("click", () => {
      const cityKey = btn.getAttribute("data-city") || "all";
      openCity(cityKey);
    });
  });

  // bouton "Devenir partenaire (ma ville)"
  const joinCityBtn = document.getElementById("btnJoinCity");
  if (joinCityBtn) {
    joinCityBtn.addEventListener("click", () => joinCityFlow());
  }

  // ===========================
  // NDIMBAL POPUP + QR
  // ===========================
  // NDIMBAL - fermer
  $("#digiyCloseBtn")?.addEventListener("click", () => {
    const ndimbal = $("#digiy-ndimbal");
    if (ndimbal) {
      ndimbal.classList.add("hidden");
      ndimbal.setAttribute("aria-hidden", "true");
    }
  });

  // NDIMBAL - actions
  const ndimbalPopup = $("#digiy-ndimbal");
  if (ndimbalPopup) {
    ndimbalPopup.addEventListener("click", (e) => {
      if (e.target === ndimbalPopup) {
        ndimbalPopup.classList.add("hidden");
        ndimbalPopup.setAttribute("aria-hidden", "true");
        return;
      }

      const btn = e.target?.closest?.("button");
      if (!btn || !btn.dataset.action) return;

      const action = btn.dataset.action;

      ndimbalPopup.classList.add("hidden");
      ndimbalPopup.setAttribute("aria-hidden", "true");

      if (action === "sell") {
        hub.open(withPhone(LINKS.hubDrive, state.phone, "phone"));
      } else if (action === "job") {
        hub.open(withPhone(LINKS.jobs, state.phone, "phone"));
      } else if (action === "qr") {
        const qrModal = $("#qrModal");
        if (qrModal) {
          qrModal.classList.remove("hidden");
          qrModal.setAttribute("aria-hidden", "false");
        }
      }
    });
  }

  // QR Modal - fermer
  $("#qrClose")?.addEventListener("click", () => {
    const qrModal = $("#qrModal");
    if (qrModal) {
      qrModal.classList.add("hidden");
      qrModal.setAttribute("aria-hidden", "true");
    }
  });

  // QR Modal - fermer sur fond
  const qrModalPopup = $("#qrModal");
  if (qrModalPopup) {
    qrModalPopup.addEventListener("click", (e) => {
      if (e.target === qrModalPopup) {
        qrModalPopup.classList.add("hidden");
        qrModalPopup.setAttribute("aria-hidden", "true");
      }
    });
  }

  // apply tab active
  $$(".tab").forEach(btn => btn.classList.toggle("active", btn.dataset.filter === state.filter));

  render();
}

document.addEventListener("DOMContentLoaded", () => { boot(); });
