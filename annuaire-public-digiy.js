/* DIGIYLYFE — annuaire public multi-fiches SAFE — 20260614
   À charger après le script voix existant ou avant le patch safe.
   Public only : fiches publiques, pas de PIN, pas de cockpit.
*/
(function(){
  "use strict";

  const FICHES = [
    {
      id:"helage-plombier-saly",
      icon:"🔧",
      title:"Helage — Plombier à Saly",
      nom:"Helage",
      metier:"Plombier multi-services",
      module:"BUILD",
      zones:["Saly","Petite Côte","Mbour"],
      url:"https://helage-plombier.digiylyfe.com/",
      keys:["helage","plombier","plomberie","fuite","robinet","robinetterie","wc","toilette","douche","lavabo","sanitaire","evacuation","évacuation","débouchage","debouchage","salle de bain"],
      description:"Plomberie à Saly : fuite, robinetterie, évacuation, installation et petits travaux sanitaires."
    },
    {
      id:"mbaye-macon-saly",
      icon:"🏗️",
      title:"Mbaye — Entrepreneur maçon à Saly",
      nom:"Mbaye",
      metier:"Entrepreneur maçon",
      module:"BUILD",
      zones:["Saly","Petite Côte","Mbour"],
      url:"https://mbaye-macon.digiylyfe.com/",
      keys:["mbaye","maçon","macon","maçonnerie","maconnerie","entrepreneur","entrepreneur maçon","entrepreneur macon","chantier","construction","mur","dalle","béton","beton","ciment","rénovation","renovation","réparation","reparation"],
      description:"Maçonnerie à Saly : construction, rénovation, réparation, murs, dalle, béton et chantier maison."
    },
    {
      id:"kourant-electricite-saly",
      icon:"⚡",
      title:"Zal & Kourant — Électriciens",
      nom:"Zal & Kourant",
      metier:"Électriciens",
      module:"BUILD",
      zones:["Saly","Petite Côte","Mbour","Dakar","Thiès"],
      url:"https://kourant.digiylyfe.com/",
      keys:["zal","kourant","courant","électricien","electricien","électricité","electricite","prise","prises","disjoncteur","tableau","tableau électrique","tableau electrique","lumière","lumiere","panne","dépannage","depannage"],
      description:"Électricité : dépannage, installation, prises, tableau, éclairage et petits travaux utiles."
    },
    {
      id:"digiy-solaire-dakar-saly",
      icon:"☀️",
      title:"DIGIY Solaire — Installation & dépannage",
      nom:"DIGIY Solaire",
      metier:"Solaire",
      module:"BUILD",
      zones:["Dakar","Saly","Petite Côte","Sénégal"],
      url:"https://digiy-solaire.digiylyfe.com/",
      keys:["solaire","panneau solaire","panneaux solaires","installation solaire","dépannage solaire","depannage solaire","batterie","régulateur","regulateur","énergie","energie","câblage","cablage","diagnostic"],
      description:"Solaire : installation, dépannage, batterie, régulateur, diagnostic et énergie."
    },
    {
      id:"astou-boutique-saly",
      icon:"👜",
      title:"Astou Boutique — Maison, plage & élégance",
      nom:"Astou Boutique",
      metier:"Boutique",
      module:"MARKET",
      zones:["Saly","Petite Côte","Mbour"],
      url:"https://astou-boutique.digiylyfe.com/",
      keys:["astou","boutique","commerce","magasin","serviette","serviettes","linge","linge de maison","drap","draps","peignoir","peignoirs","fouta","foutas","plage","robe","robes","beauté","beaute","produit","produits","acheter","jënd","jend"],
      description:"Boutique à Saly : linge, serviettes, draps, peignoirs, plage, tenues et beauté."
    },
    {
      id:"digiy-driver-ambassadeur-aibd",
      icon:"🚗",
      title:"DIGIY DRIVER Ambassadeur — Chauffeur",
      nom:"DIGIY DRIVER Ambassadeur",
      metier:"Chauffeur",
      module:"DRIVER",
      zones:["AIBD","Dakar","Saly","Petite Côte"],
      url:"https://digiy-driver-part-bapt.digiylyfe.com/",
      keys:["chauffeur","driver","taxi","aibd","aéroport","aeroport","airport","diass","trajet","course","voiture","transport","conducteur","yóbbu","yobbu"],
      description:"Chauffeur : trajet AIBD, contact direct, fiche claire et QR chauffeur."
    },
    {
      id:"chez-baptiste-appartement-saly",
      icon:"🏠",
      title:"CHEZ BAPTISTE — Appartement à Saly",
      nom:"CHEZ BAPTISTE",
      metier:"Appartement / logement",
      module:"LOC",
      zones:["Saly","Petite Côte","Mbour"],
      url:"https://part-chez-baptiste.digiylyfe.com/",
      keys:["appartement","logement","chambre","location","maison","villa","4 personnes","vacances","weekend","week-end","kër","neeg","néeg"],
      description:"Appartement à Saly, réservation directe propriétaire."
    },
    {
      id:"explore-petite-cote",
      icon:"🗺️",
      title:"DIGIY EXPLORE — Sorties & lieux",
      nom:"DIGIY EXPLORE",
      metier:"Découverte locale",
      module:"EXPLORE",
      zones:["Saly","Petite Côte","Sénégal"],
      url:"https://explore.digiylyfe.com/",
      keys:["sortie","sorties","visite","visiter","découvrir","decouvrir","idée","idee","lieu","lieux","activité","activite","petite côte","petite cote","génn","genn"],
      description:"Idées de sortie, lieux, découvertes et territoire."
    },
    {
      id:"resa-table-resto",
      icon:"📅",
      title:"DIGIY RÉSA — Réserver une table",
      nom:"DIGIY RÉSA",
      metier:"Réservation",
      module:"RÉSA",
      zones:["Saly","Petite Côte"],
      url:"https://resa-table-resto.digiylyfe.com/",
      keys:["resa","réservation","reservation","restaurant","resto","table","réserver","reserver","dîner","diner","manger","ngoon","lekk"],
      description:"Réservation de table et créneaux simples."
    },
    {
      id:"digiy-pay-public",
      icon:"💳",
      title:"DIGIY PAY — Preuve & paiement direct",
      nom:"DIGIY PAY",
      metier:"Paiement",
      module:"PAY",
      zones:["Sénégal"],
      url:"https://pay.digiylyfe.com/",
      keys:["pay","paiement","payer","preuve","wave","orange money","argent","reçu","recu","encaisser"],
      description:"Paiement direct, preuve et suivi simple."
    }
  ];

  function normalize(value){
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g,"")
      .replace(/[^a-z0-9\s]/g," ")
      .replace(/\s+/g," ")
      .trim();
  }

  function esc(value){
    return String(value || "")
      .replace(/&/g,"&amp;")
      .replace(/</g,"&lt;")
      .replace(/>/g,"&gt;")
      .replace(/"/g,"&quot;")
      .replace(/'/g,"&#039;");
  }

  function score(fiche, demande){
    const q = normalize(demande);
    const text = normalize([
      fiche.title, fiche.nom, fiche.metier, fiche.module, fiche.description,
      (fiche.zones || []).join(" "),
      (fiche.keys || []).join(" ")
    ].join(" "));

    let s = 0;

    (fiche.keys || []).forEach(function(k){
      const key = normalize(k);
      if(key && q.includes(key)) s += Math.max(30, Math.min(90, key.length * 4));
    });

    (fiche.zones || []).forEach(function(z){
      const zone = normalize(z);
      if(zone && q.includes(zone)) s += 25;
    });

    q.split(" ").forEach(function(w){
      if(w.length >= 4 && text.includes(w)) s += 7;
    });

    return s;
  }

  function chercherFiches(demande){
    const q = String(demande || "").trim();
    if(!q) return [];

    return FICHES
      .map(function(f){ return { fiche:f, score:score(f, q) }; })
      .filter(function(row){ return row.score > 0; })
      .sort(function(a,b){ return b.score - a.score; })
      .map(function(row){ return row.fiche; });
  }

  function card(f){
    const zone = Array.isArray(f.zones) ? f.zones.slice(0,3).join(" · ") : "DIGIYLYFE";
    return `
      <article class="card directoryCard" data-digiy-fiche="${esc(f.id)}">
        <div class="cardIcon">${esc(f.icon || "👤")}</div>
        <span class="tag">${esc(f.module || "PUBLIC")}</span>
        <h3>${esc(f.title || f.nom || "Fiche DIGIY")}</h3>
        <p>${esc(f.description || f.metier || "")}</p>
        <div class="miniMeta">
          <span>${esc(f.metier || "Métier")}</span>
          <span>${esc(zone)}</span>
        </div>
        <div class="card-actions">
          <a class="btn" href="${esc(f.url)}" target="_self" rel="noopener">Ouvrir la fiche ↗</a>
        </div>
      </article>
    `;
  }

  function afficherFiches(fiches, demande){
    const cards = document.getElementById("cards");
    const results = document.getElementById("results") || document.querySelector(".results");
    const empty = document.getElementById("empty");
    const status = document.getElementById("status");

    if(!cards) return fiches;

    if(results) results.classList.add("open");

    if(!fiches.length){
      cards.innerHTML = `<div class="nores">Aucune fiche exacte pour « ${esc(demande)} ». Essaie : plombier à Saly, maçon à Saly, électricien à Saly, solaire à Dakar, boutique à Saly, chauffeur AIBD.</div>`;
      if(empty) empty.style.display = "block";
      if(status) status.textContent = "AUCUNE FICHE EXACTE";
      return fiches;
    }

    if(empty) empty.style.display = "none";
    cards.innerHTML = fiches.map(card).join("");

    if(status){
      status.textContent = fiches.length === 1
        ? "1 FICHE DIRECTE REMONTE"
        : fiches.length + " FICHES DIRECTES REMONTENT";
    }

    return fiches;
  }

  function traiterDemande(demande){
    const fiches = chercherFiches(demande);
    afficherFiches(fiches, demande);
    return fiches;
  }

  window.DIGIY_PUBLIC_DIRECTORY = FICHES.slice();
  window.DIGIY_GET_PUBLIC_DIRECTORY = function(){ return FICHES.slice(); };
  window.DIGIY_ANNUAIRE_PUBLIC = FICHES.slice();
  window.DIGIY_ANNUAIRE_MULTI = {
    version:"20260614-safe",
    annuaire:FICHES,
    normalize:normalize,
    chercherFiches:chercherFiches,
    afficherFiches:afficherFiches,
    traiterDemande:traiterDemande
  };
})();

