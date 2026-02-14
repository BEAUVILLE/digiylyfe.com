/* modules.js — DIGIY ROYAL HUB / PRO-ESPACE
   - Centralise l'annuaire des modules (light)
   - Recherche + filtres + badges
   - ✅ PRO passe par pro-espace (rond-point)
   - ✅ Phone auto si mémorisé (DIGIY_HUB_PHONE)
   - Aucune dépendance
*/

export const DIGIY_MODULES = [
  // ✅ PRO (pilotes)
  {
    id: "loc-pro",
    name: "DIGIY LOC PRO",
    slug: "loc-pro",
    kind: "pro",
    status: "live",          // live | beta | off
    city: "Saly",
    tags: ["logement", "reservation", "vitrine", "cockpit"],
    url: "https://pro-loc.digiylyfe.com/" // (ton sous-domaine pro)
  },
  {
    id: "driver-pro",
    name: "DIGIY DRIVER PRO",
    slug: "driver-pro",
    kind: "pro",
    status: "beta",
    city: "Dakar",
    tags: ["chauffeur", "trajet", "0% commission", "cockpit"],
    url: "https://pro-driver.digiylyfe.com/"
  },
  {
    id: "build-pro",
    name: "DIGIY BUILD PRO",
    slug: "build-pro",
    kind: "pro",
    status: "beta",
    city: "Dakar",
    tags: ["artisan", "devis", "chantier", "cockpit"],
    url: "https://pro-build.digiylyfe.com/"
  },

  // 🌍 HUB / vitrine
  {
    id: "royal",
    name: "DIGIY ROYAL",
    slug: "royal",
    kind: "hub",
    status: "live",
    city: "Global",
    tags: ["hub", "0% commission", "vitrine"],
    url: "https://apps.digiylyfe.com/"
  },

  // ➕ Ajoute tes autres modules ici (market, explore, pay, jobs…)
];

const STORAGE_PHONE = "DIGIY_HUB_PHONE"; // même clé que ton hub.js (ROYAL)

/* =========================
   CONFIG ROUTING (CENTRAL PRO)
========================= */
const PRO_CENTRAL_URL = "https://pro-espace.digiylyfe.com/";

/* =========================
   DOM helpers
========================= */
function el(tag, attrs = {}, children = []) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") n.className = v;
    else if (k === "html") n.innerHTML = v;
    else if (k.startsWith("on") && typeof v === "function") n.addEventListener(k.slice(2), v);
    else n.setAttribute(k, v);
  }
  for (const c of children) n.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  return n;
}

function norm(s) {
  return (s || "").toString().toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

function getPhone() {
  try {
    const p = localStorage.getItem(STORAGE_PHONE) || "";
    return p.trim();
  } catch (_) {
    return "";
  }
}

function withParam(url, k, v) {
  if (!url) return "";
  if (!v) return url;
  try {
    const u = new URL(url);
    u.searchParams.set(k, v);
    return u.toString();
  } catch (_) {
    const sep = url.includes("?") ? "&" : "?";
    return url + sep + encodeURIComponent(k) + "=" + encodeURIComponent(v);
  }
}

/* =========================
   Routing DIGIY
   - PUBLIC/HUB : direct
   - PRO : via pro-espace (rond-point) + module + phone
========================= */
function resolveOpenUrl(m, phone) {
  if (!m?.url) return "";

  // ✅ PRO => rond-point central
  if (m.kind === "pro") {
    let u = PRO_CENTRAL_URL;
    if (phone) u = withParam(u, "phone", phone);
    // module = identifiant stable
    u = withParam(u, "module", m.id || m.slug || "");
    // optionnel : destination (le module url direct, si pro-espace veut la lire)
    u = withParam(u, "to", m.url);
    return u;
  }

  // ✅ HUB/CLIENT/PUBLIC => direct + phone si tu veux
  // (tu peux décider phone=true seulement sur certains modules)
  return phone ? withParam(m.url, "phone", phone) : m.url;
}

/* =========================
   UI helpers
========================= */
function badge(status) {
  const map = {
    live: { t: "LIVE", c: "digiy-badge digiy-live" },
    beta: { t: "BETA", c: "digiy-badge digiy-beta" },
    off:  { t: "OFF",  c: "digiy-badge digiy-off" },
  };
  const b = map[status] || { t: status?.toUpperCase() || "?", c: "digiy-badge" };
  return el("span", { class: b.c }, [b.t]);
}

function pill(text) {
  return el("span", { class: "digiy-pill" }, [text]);
}

function renderStyles(root) {
  const css = `
  .digiy-wrap{max-width:1100px;margin:0 auto;padding:16px}
  .digiy-top{display:flex;gap:12px;flex-wrap:wrap;align-items:center;margin-bottom:14px}
  .digiy-input{flex:1;min-width:240px;padding:12px 12px;border-radius:12px;border:1px solid rgba(255,255,255,.14);background:rgba(0,0,0,.18);color:#fff;outline:none}
  .digiy-select{padding:12px;border-radius:12px;border:1px solid rgba(255,255,255,.14);background:rgba(0,0,0,.18);color:#fff;outline:none}
  .digiy-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px}
  .digiy-card{border-radius:16px;border:1px solid rgba(255,255,255,.14);background:rgba(0,0,0,.22);padding:14px;box-shadow:0 18px 55px rgba(0,0,0,.35)}
  .digiy-head{display:flex;justify-content:space-between;gap:10px;align-items:flex-start}
  .digiy-title{font-weight:900;letter-spacing:.2px}
  .digiy-sub{opacity:.8;font-size:.92rem;margin-top:6px}
  .digiy-row{display:flex;gap:6px;flex-wrap:wrap;margin-top:10px}
  .digiy-pill{font-size:.78rem;padding:6px 8px;border-radius:999px;border:1px solid rgba(255,255,255,.14);opacity:.9}
  .digiy-badge{font-size:.72rem;padding:6px 9px;border-radius:999px;font-weight:1000;border:1px solid rgba(255,255,255,.14)}
  .digiy-live{background:rgba(34,197,94,.18)}
  .digiy-beta{background:rgba(250,204,21,.18)}
  .digiy-off{background:rgba(244,63,94,.14)}
  .digiy-btn{margin-top:12px;width:100%;padding:12px 12px;border-radius:14px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.08);color:#fff;font-weight:1000;cursor:pointer}
  .digiy-btn:hover{background:rgba(255,255,255,.12)}
  .digiy-empty{opacity:.85;padding:14px;border-radius:14px;border:1px dashed rgba(255,255,255,.18)}
  .digiy-mini{opacity:.72;font-size:.85rem;margin-top:8px;line-height:1.35}
  `;
  root.appendChild(el("style", { html: css }));
}

export function mountModulesApp({
  targetId = "modulesApp",
  modules = DIGIY_MODULES,
  defaultKind = "all" // all | pro | client | hub
} = {}) {
  const target = document.getElementById(targetId);
  if (!target) throw new Error(`modules.js: container #${targetId} introuvable`);

  const phone = getPhone();

  target.innerHTML = "";
  renderStyles(target);

  const state = {
    q: "",
    kind: defaultKind,
    status: "all",
    city: "all",
  };

  const qInput = el("input", {
    class: "digiy-input",
    placeholder: "Recherche : logement, chauffeur, artisan, pay, market…",
    oninput: (e) => { state.q = e.target.value; draw(); }
  });

  const kindSel = el("select", {
    class: "digiy-select",
    onchange: (e) => { state.kind = e.target.value; draw(); }
  }, [
    el("option", { value: "all" }, ["Tous"]),
    el("option", { value: "pro" }, ["PRO"]),
    el("option", { value: "client" }, ["CLIENT"]),
    el("option", { value: "hub" }, ["HUB"]),
  ]);
  kindSel.value = defaultKind;

  const statusSel = el("select", {
    class: "digiy-select",
    onchange: (e) => { state.status = e.target.value; draw(); }
  }, [
    el("option", { value: "all" }, ["Tous statuts"]),
    el("option", { value: "live" }, ["LIVE"]),
    el("option", { value: "beta" }, ["BETA"]),
    el("option", { value: "off" }, ["OFF"]),
  ]);

  const cities = Array.from(new Set(modules.map(m => m.city).filter(Boolean)))
    .sort((a,b)=>a.localeCompare(b));

  const citySel = el("select", {
    class: "digiy-select",
    onchange: (e) => { state.city = e.target.value; draw(); }
  }, [
    el("option", { value: "all" }, ["Toutes villes"]),
    ...cities.map(c => el("option", { value: c }, [c]))
  ]);

  const top = el("div", { class: "digiy-wrap" }, [
    el("div", { class: "digiy-top" }, [qInput, kindSel, statusSel, citySel]),
  ]);

  const grid = el("div", { class: "digiy-grid" });
  top.appendChild(grid);

  // mini hint phone
  top.appendChild(el("div", { class: "digiy-mini" }, [
    phone
      ? `📱 Numéro détecté : ${phone} — il sera envoyé aux modules compatibles.`
      : `📱 Aucun numéro mémorisé — tu peux le saisir depuis DIGIY ROYAL pour activer l’auto-passage.`
  ]));

  target.appendChild(top);

  function matches(m) {
    if (state.kind !== "all" && m.kind !== state.kind) return false;
    if (state.status !== "all" && m.status !== state.status) return false;
    if (state.city !== "all" && m.city !== state.city) return false;

    const hay = norm([m.name, m.slug, m.city, m.status, m.kind, ...(m.tags||[])].join(" "));
    const needle = norm(state.q);
    if (needle && !hay.includes(needle)) return false;

    return true;
  }

  function card(m) {
    const head = el("div", { class: "digiy-head" }, [
      el("div", {}, [
        el("div", { class: "digiy-title" }, [m.name]),
        el("div", { class: "digiy-sub" }, [`${(m.kind || "client").toUpperCase()} • ${m.city || "—"}`]),
      ]),
      badge(m.status)
    ]);

    const tagsRow = el("div", { class: "digiy-row" }, (m.tags || []).slice(0, 6).map(pill));

    const btn = el("button", {
      class: "digiy-btn",
      onclick: () => {
        const u = resolveOpenUrl(m, phone);
        if (!u) return;
        window.open(u, "_blank", "noopener");
      }
    }, [m.kind === "pro" ? "Entrer (PRO)" : "Ouvrir"]);

    return el("div", { class: "digiy-card" }, [head, tagsRow, btn]);
  }

  function draw() {
    grid.innerHTML = "";
    const list = modules.filter(matches);

    if (!list.length) {
      grid.appendChild(el("div", { class: "digiy-empty" }, [
        "Aucun module trouvé. Essaie un mot-clé (ex: “chauffeur”, “artisan”, “paiement”)."
      ]));
      return;
    }

    // Tri : live d’abord, puis beta, puis off
    const rank = { live: 0, beta: 1, off: 2 };
    list.sort((a,b) => (rank[a.status] ?? 9) - (rank[b.status] ?? 9) || a.name.localeCompare(b.name));

    for (const m of list) grid.appendChild(card(m));
  }

  draw();
}
