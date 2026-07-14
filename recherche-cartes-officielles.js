(function(){
  "use strict";

  const MARKER="recherche-stricte-v8-lamine-babacar-20260714";
  const form=document.getElementById("searchForm");
  const queryInput=document.getElementById("query");
  const cityInput=document.getElementById("city");
  const moduleInput=document.getElementById("module");
  const results=document.getElementById("results");
  const statusBox=document.getElementById("status");
  const countBox=document.getElementById("count");

  if(!form||!queryInput||!moduleInput||!results) return;
  document.documentElement.dataset.digiySearchFilter=MARKER;

  const norm=value=>String(value||"")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g,"")
    .toLowerCase()
    .replace(/[’']/g," ")
    .replace(/[^a-z0-9]+/g," ")
    .trim();

  const escapeHtml=value=>String(value??"")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");

  const RULES={
    chauffeur:{
      module:"DRIVER",
      positive:["chauffeur","driver","vtc","taxi","conducteur","transport de personnes"],
      forbidden:["plombier","plomberie","chauffage","chauffe eau","sanitaire","fuite","robinet"]
    },
    macon:{
      module:"BUILD",
      positive:["macon","maconnerie","batisseur","entrepreneur macon","construction villa","piscine beton"],
      forbidden:["solaire","photovoltaique","panneau solaire"]
    },
    plombier:{
      module:"BUILD",
      positive:["plombier","plomberie","sanitaire","recherche de fuite","robinetterie","tuyauterie","wc","lavabo","douche"],
      forbidden:["chauffeur","driver","vtc","taxi"]
    },
    electricien:{
      module:"BUILD",
      positive:["electricien","electricite","installation electrique","depannage electrique"],
      forbidden:["plombier","chauffeur","driver"]
    },
    solaire:{
      module:"BUILD",
      positive:["solaire","photovoltaique","panneau solaire","energie solaire"],
      forbidden:["macon","plombier","chauffeur"]
    }
  };

  const LAMINE={
    name:"Lamine",
    trade:"Chauffeur privé · Transferts AIBD · Petite Côte",
    city:"Saly · Mbour · Thiès",
    phone:"221784413680",
    profile:"https://partenaire-lamine.digiylyfe.com/",
    image:"https://partenaire-lamine.digiylyfe.com/carte-visite.png?v=20260714-v8",
    description:"Chauffeur privé vérifié pour transferts AIBD, courses locales, trajets vers Dakar, circuits Petite Côte et mise à disposition sur réservation.",
    services:["Transfert AIBD","Course locale","Sur réservation","Trajet Dakar","Circuit Petite Côte"]
  };

  const BABACAR={
    name:"Babacar Plombier Pro",
    trade:"Plombier professionnel · Dépannage · Installation sanitaire",
    city:"Saly · Petite Côte",
    phone:"221776125124",
    profile:"https://babacar-plombier-pro.digiylyfe.com/",
    description:"Fuite, robinet, WC, lavabo, douche, tuyauterie, installation sanitaire et petits travaux. Contact direct selon disponibilité.",
    services:["Dépannage fuite","Robinet et lavabo","WC et chasse d’eau","Douche et sanitaire","Tuyauterie","Petits travaux"]
  };

  function queryKind(value){
    const q=norm(value);
    if(/(^| )chauffeur( |$)|(^| )driver( |$)|(^| )vtc( |$)|(^| )taxi( |$)/.test(q)) return "chauffeur";
    if(/(^| )macon( |$)|(^| )maconnerie( |$)|(^| )batisseur( |$)/.test(q)) return "macon";
    if(/(^| )plombier( |$)|(^| )plomberie( |$)/.test(q)) return "plombier";
    if(/(^| )electricien( |$)|(^| )electricite( |$)/.test(q)) return "electricien";
    if(/(^| )solaire( |$)|(^| )photovoltaique( |$)/.test(q)) return "solaire";
    return "";
  }

  function officialCardHtml(profile,type){
    const message=encodeURIComponent("Bonjour "+profile.name+", je vous contacte depuis la recherche DIGIYLYFE.");
    const avatar=profile.image
      ? `<div class="avatar"><img src="${escapeHtml(profile.image)}" alt="Carte de visite officielle de ${escapeHtml(profile.name)}" loading="eager"></div>`
      : `<div class="avatar">BP</div>`;

    return `<article class="card" data-digiy-official="${escapeHtml(type)}">
      <span class="moduleBadge">${type==="lamine"?"DRIVER":"BUILD"}</span>
      <div class="cardTop">
        ${avatar}
        <div>
          <div class="titleRow"><h3>${escapeHtml(profile.name)}</h3><span class="verified">Vérifié</span></div>
          <p class="meta">${escapeHtml(profile.trade)}</p>
          <div class="location">📍 ${escapeHtml(profile.city)}</div>
        </div>
      </div>
      <p class="description">${escapeHtml(profile.description)}</p>
      <div class="services">${profile.services.map(service=>`<span class="service">${escapeHtml(service)}</span>`).join("")}</div>
      <div class="actions">
        <a class="btn btnPrimary" href="${escapeHtml(profile.profile)}" target="_blank" rel="noopener noreferrer">Voir la fiche officielle</a>
        <a class="btn btnWhatsapp" href="https://wa.me/${profile.phone}?text=${message}" target="_blank" rel="noopener noreferrer">WhatsApp direct</a>
      </div>
    </article>`;
  }

  function ensureOfficialProfiles(){
    if(!results.querySelector('[data-digiy-official="lamine"]')){
      results.insertAdjacentHTML("afterbegin",officialCardHtml(LAMINE,"lamine"));
    }

    const existingBabacar=Array.from(results.querySelectorAll("article.card")).some(card=>{
      const text=norm(card.textContent);
      const href=card.querySelector('.btnWhatsapp')?.getAttribute('href')||"";
      return text.includes("babacar plombier")||href.includes("221776125124");
    });

    if(!existingBabacar){
      const lamineCard=results.querySelector('[data-digiy-official="lamine"]');
      if(lamineCard) lamineCard.insertAdjacentHTML("afterend",officialCardHtml(BABACAR,"babacar"));
      else results.insertAdjacentHTML("afterbegin",officialCardHtml(BABACAR,"babacar"));
    }
  }

  function cardData(card){
    const title=norm(card.querySelector("h3")?.textContent);
    const trade=norm(card.querySelector(".meta")?.textContent);
    const services=norm(Array.from(card.querySelectorAll(".service")).map(node=>node.textContent).join(" "));
    const description=norm(card.querySelector(".description")?.textContent);
    const module=norm(card.querySelector(".moduleBadge")?.textContent);
    return {title,trade,services,description,module,primary:[title,trade,services].join(" ")};
  }

  function matchesRule(card,rule){
    const data=cardData(card);
    if(rule.module&&data.module!==norm(rule.module)) return false;
    const hasPositive=rule.positive.some(term=>data.primary.includes(norm(term)));
    if(!hasPositive) return false;
    const forbiddenInPrimary=rule.forbidden.some(term=>data.primary.includes(norm(term)));
    if(forbiddenInPrimary) return false;
    return true;
  }

  function updateCount(visible,kind){
    if(visible>0){
      results.hidden=false;
      if(statusBox) statusBox.hidden=true;
      if(countBox) countBox.textContent=visible+" résultat"+(visible>1?"s":"");
      return;
    }

    results.hidden=true;
    if(statusBox){
      statusBox.hidden=false;
      statusBox.className="state";
      statusBox.textContent=kind
        ? "Aucun professionnel "+kind+" correctement classé n'est encore disponible. Aucun autre métier ne sera affiché à sa place."
        : "Aucun professionnel ne correspond à cette recherche.";
    }
    if(countBox) countBox.textContent="0 résultat";
  }

  function applyStrictFilter(){
    ensureOfficialProfiles();
    const kind=queryKind(queryInput.value);
    const cards=Array.from(results.querySelectorAll("article.card"));

    if(!kind){
      cards.forEach(card=>{card.hidden=false;card.style.removeProperty("display");});
      return;
    }

    const rule=RULES[kind];
    let visible=0;
    cards.forEach(card=>{
      const show=matchesRule(card,rule);
      card.hidden=!show;
      card.style.display=show?"":"none";
      if(show) visible+=1;
    });
    updateCount(visible,kind);
  }

  function prepareSearch(){
    const kind=queryKind(queryInput.value);
    if(kind) moduleInput.value=RULES[kind].module;
  }

  form.addEventListener("submit",prepareSearch,true);

  document.querySelectorAll(".chip").forEach(button=>{
    button.addEventListener("click",()=>{
      const kind=queryKind(button.dataset.query||"");
      if(kind) moduleInput.value=RULES[kind].module;
      setTimeout(applyStrictFilter,0);
    },true);
  });

  queryInput.addEventListener("input",()=>{
    const kind=queryKind(queryInput.value);
    if(kind) moduleInput.value=RULES[kind].module;
  });

  let applying=false;
  const observer=new MutationObserver(()=>{
    if(applying) return;
    applying=true;
    queueMicrotask(()=>{
      applyStrictFilter();
      applying=false;
    });
  });
  observer.observe(results,{childList:true,subtree:true});

  form.addEventListener("submit",()=>setTimeout(applyStrictFilter,0));
  window.addEventListener("load",()=>setTimeout(applyStrictFilter,0));
  setTimeout(applyStrictFilter,0);
})();