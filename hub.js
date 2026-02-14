/* =========================================================
   DIGIY HUB — VERSION STABLE
   Modules intégrés (aucun JSON externe)
   ========================================================= */

const $ = (s)=>document.querySelector(s);
const $$ = (s)=>Array.from(document.querySelectorAll(s));

/* =========================
   PHONE STORAGE
   ========================= */
const STORAGE_PHONE="DIGIY_HUB_PHONE";

const state={
  phone:localStorage.getItem(STORAGE_PHONE)||""
};

function withPhone(url){
  if(!state.phone) return url;
  const u=new URL(url);
  u.searchParams.set("phone",state.phone);
  return u.toString();
}

/* =========================
   MODULES OFFICIELS
   ========================= */
const MODULES=[
  // ⭐ HUB CENTRAL
  {
    name:"ESPACE PRO",
    icon:"🧰",
    tag:"Rond-point des pros",
    desc:"Tous les cockpits professionnels DIGIY.",
    url:"https://pro-espace.digiylyfe.com/",
    kind:"pro"
  },

  // PRO
  {
    name:"DIGIY DRIVER PRO",
    icon:"🚗",
    tag:"Chauffeur",
    desc:"Courses, zone chauffeur, profil.",
    url:"https://pro-driver.digiylyfe.com/",
    kind:"pro"
  },
  {
    name:"DIGIY LOC PRO",
    icon:"🏠",
    tag:"Hébergement",
    desc:"Planning, réservations, Pulse.",
    url:"https://pro-loc.digiylyfe.com/",
    kind:"pro"
  },
  {
    name:"DIGIY BUILD PRO",
    icon:"🏗️",
    tag:"Artisans",
    desc:"Devis terrain et chantiers.",
    url:"https://pro-build.digiylyfe.com/",
    kind:"pro"
  },
  {
    name:"DIGIY MARKET PRO",
    icon:"🛒",
    tag:"Boutique",
    desc:"Caisse, QR, ventes directes.",
    url:"https://pro-market.digiylyfe.com/",
    kind:"pro"
  },

  // PUBLIC
  {
    name:"DIGIY DRIVER CLIENT",
    icon:"🚕",
    tag:"Clients",
    desc:"Commander un chauffeur.",
    url:"https://driver-client.digiylyfe.com/",
    kind:"public"
  },
  {
    name:"DIGIY LOC",
    icon:"🏡",
    tag:"Locations",
    desc:"Trouver un logement.",
    url:"https://loc.digiylyfe.com/",
    kind:"public"
  },
  {
    name:"DIGIY MARKET",
    icon:"🛍️",
    tag:"Bonnes affaires",
    desc:"Marketplace locale.",
    url:"https://market.digiylyfe.com/",
    kind:"public"
  },
  {
    name:"DIGIY JOBS",
    icon:"💼",
    tag:"Emploi",
    desc:"Opportunités et accompagnement.",
    url:"https://jobs.digiylyfe.com/",
    kind:"public"
  }
];

/* =========================
   RENDER
   ========================= */
function cardHTML(m){
  return `
  <div class="card">
    <div class="icon">${m.icon}</div>
    <div class="title">${m.name}</div>
    <div class="tag">${m.tag}</div>
    <div class="desc">${m.desc}</div>
    <button onclick="openModule('${m.url}')">Ouvrir →</button>
  </div>`;
}

function render(){
  const grid=$("#modulesGrid");
  if(!grid) return;
  grid.innerHTML=MODULES.map(cardHTML).join("");
}

/* =========================
   ACTIONS
   ========================= */
function openModule(url){
  window.open(withPhone(url),"_blank");
}

function askPhone(){
  const p=prompt("Numéro (optionnel) ex: +221771234567",state.phone);
  if(p===null) return;
  state.phone=p.trim();
  localStorage.setItem(STORAGE_PHONE,state.phone);
}

/* =========================
   INIT
   ========================= */
document.addEventListener("DOMContentLoaded",()=>{
  $("#btnPhone")?.addEventListener("click",askPhone);
  render();
});
