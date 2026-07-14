(function(){
  "use strict";

  const MARKER="recherche-stricte-v6-20260714";
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
      positive:["plombier","plomberie","sanitaire","recherche de fuite","robinetterie"],
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

  function queryKind(value){
    const q=norm(value);
    if(/(^| )chauffeur( |$)|(^| )driver( |$)|(^| )vtc( |$)|(^| )taxi( |$)/.test(q)) return "chauffeur";
    if(/(^| )macon( |$)|(^| )maconnerie( |$)|(^| )batisseur( |$)/.test(q)) return "macon";
    if(/(^| )plombier( |$)|(^| )plomberie( |$)/.test(q)) return "plombier";
    if(/(^| )electricien( |$)|(^| )electricite( |$)/.test(q)) return "electricien";
    if(/(^| )solaire( |$)|(^| )photovoltaique( |$)/.test(q)) return "solaire";
    return "";
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
      if(countBox) countBox.textContent=visible+" resultat"+(visible>1?"s":"");
      return;
    }

    results.hidden=true;
    if(statusBox){
      statusBox.hidden=false;
      statusBox.className="state";
      statusBox.textContent=kind
        ? "Aucun professionnel "+kind+" correctement classe n est encore disponible. Aucun autre metier ne sera affiche a sa place."
        : "Aucun professionnel ne correspond a cette recherche.";
    }
    if(countBox) countBox.textContent="0 resultat";
  }

  function applyStrictFilter(){
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

  const observer=new MutationObserver(()=>queueMicrotask(applyStrictFilter));
  observer.observe(results,{childList:true,subtree:true});

  form.addEventListener("submit",()=>setTimeout(applyStrictFilter,0));
  window.addEventListener("load",()=>setTimeout(applyStrictFilter,0));
})();
