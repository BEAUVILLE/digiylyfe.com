(function(){
  "use strict";

  const OFFICIALS = [
    {
      keys: ["kourant", "zal & kourant", "221772084781", "77 208 47 81"],
      name: "Kourant Électricien",
      trade: "Électricien · installation · rénovation · dépannage",
      image: "https://kourant.digiylyfe.com/carte-visite.png?v=20260714-v4",
      profile: "https://kourant.digiylyfe.com/",
      phone: "221772084781"
    },
    {
      keys: ["mbaye diouf", "partenaires-mbaye", "221776427113", "77 642 71 13"],
      name: "Mbaye Diouf",
      trade: "Entrepreneur maçon · villas · piscines · rénovation",
      image: "https://mbaye-macon.digiylyfe.com/carte-visite.png?v=20260714-v4",
      profile: "https://mbaye-macon.digiylyfe.com/",
      phone: "221776427113"
    }
  ];

  const style = document.createElement("style");
  style.textContent = `
    .digiyOfficialVisual{display:block;width:100%;aspect-ratio:4/3;border-radius:19px;overflow:hidden;border:1px solid rgba(213,166,46,.38);background:#f7faf8;box-shadow:0 12px 28px rgba(18,44,34,.10)}
    .digiyOfficialVisual img{display:block;width:100%;height:100%;object-fit:contain;background:#f7faf8;padding:6px}
    .card[data-digiy-official="true"] .cardTop{display:block}
    .card[data-digiy-official="true"] .cardTop>.avatar{display:none!important}
    .card[data-digiy-official="true"] .titleRow{margin-top:2px}
  `;
  document.head.appendChild(style);

  function norm(value){
    return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  function findOfficial(card){
    const haystack = norm(card.textContent + " " + card.innerHTML);
    return OFFICIALS.find(item => item.keys.some(key => haystack.includes(norm(key)))) || null;
  }

  function patchCard(card, official){
    if(!card || !official || card.dataset.digiyOfficial === "true") return;
    card.dataset.digiyOfficial = "true";

    const badge = card.querySelector(".moduleBadge");
    let visual = card.querySelector(".digiyOfficialVisual");
    if(!visual){
      visual = document.createElement("a");
      visual.className = "digiyOfficialVisual";
      visual.href = official.profile;
      visual.target = "_blank";
      visual.rel = "noopener noreferrer";
      visual.setAttribute("aria-label", "Ouvrir la dernière fiche officielle de " + official.name);
      const img = document.createElement("img");
      img.src = official.image;
      img.alt = "Carte de visite officielle de " + official.name;
      img.loading = "eager";
      visual.appendChild(img);
      if(badge && badge.nextSibling) card.insertBefore(visual, badge.nextSibling);
      else card.insertBefore(visual, card.firstChild);
    }

    const heading = card.querySelector("h3");
    if(heading) heading.textContent = official.name;
    const meta = card.querySelector(".meta");
    if(meta) meta.textContent = official.trade;

    const primary = card.querySelector(".btnPrimary");
    if(primary){
      primary.href = official.profile;
      primary.textContent = "Voir la dernière fiche";
      primary.target = "_blank";
      primary.rel = "noopener noreferrer";
    }

    const whatsapp = card.querySelector(".btnWhatsapp");
    if(whatsapp && whatsapp.tagName === "A"){
      const message = encodeURIComponent("Bonjour " + official.name + ", je vous contacte depuis la recherche DIGIYLYFE.");
      whatsapp.href = "https://wa.me/" + official.phone + "?text=" + message;
    }
  }

  function patchAll(){
    document.querySelectorAll("#results article.card").forEach(card => {
      const official = findOfficial(card);
      if(official) patchCard(card, official);
    });
  }

  const results = document.getElementById("results");
  if(results){
    const observer = new MutationObserver(patchAll);
    observer.observe(results, {childList:true, subtree:true});
  }

  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", patchAll);
  else patchAll();
  window.addEventListener("load", patchAll);
})();
