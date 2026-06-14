/* DIGIYLYFE — safe patch voix/réponse → fiches directes — 20260614
   IMPORTANT :
   Ce fichier ne remplace pas la voix existante.
   Il écoute le champ #q, le bouton VOIR, les exemples, et les résultats de reconnaissance déjà écrits.
   Il garde le script réponse / audio / SpeechRecognition du index.html.
*/
(function(){
  "use strict";

  const VERSION = "20260614-safe-voice-fiches";
  let last = "";
  let timer = null;

  function $(id){ return document.getElementById(id); }

  function clean(value){
    return String(value || "").replace(/\s+/g," ").trim();
  }

  function normalize(value){
    return String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g,"")
      .replace(/[^a-z0-9\s]/g," ")
      .replace(/\s+/g," ")
      .trim();
  }

  function useful(text){
    const t = clean(text);
    if(t.length < 3) return false;
    const n = normalize(t);
    return !["go","voir","effacer","ecouter","ecoute","j ecoute"].includes(n);
  }

  function getText(){
    const q = $("q") || document.querySelector("textarea") || document.querySelector("input[type='text']");
    return clean(q && (q.value || q.textContent || q.innerText));
  }

  function getAnnuaire(){
    return window.DIGIY_ANNUAIRE_MULTI || null;
  }

  function setPreparedAction(demande, fiches){
    const preparedAction = $("preparedAction");
    if(!preparedAction || !fiches || !fiches.length) return;

    const first = fiches[0];

    const preparedTitle = $("preparedTitle");
    const preparedNeed = $("preparedNeed");
    const preparedZone = $("preparedZone");
    const preparedWhen = $("preparedWhen");
    const preparedDoor = $("preparedDoor");
    const preparedMessage = $("preparedMessage");
    const preparedContinue = $("preparedContinue");
    const preparedWhatsapp = $("preparedWhatsapp");

    if(preparedTitle) preparedTitle.textContent = fiches.length === 1
      ? "Fiche directe trouvée"
      : fiches.length + " fiches directes trouvées";

    if(preparedNeed) preparedNeed.textContent = first.metier || first.module || "Professionnel DIGIY";
    if(preparedZone) preparedZone.textContent = Array.isArray(first.zones) ? first.zones.slice(0,3).join(" · ") : "Zone DIGIY";
    if(preparedWhen) preparedWhen.textContent = "À préciser";
    if(preparedDoor) preparedDoor.textContent = fiches.length === 1 ? (first.nom || first.title) : "Choix public";
    if(preparedMessage){
      preparedMessage.innerHTML = "<strong>Fiche prête</strong><span>" +
        (fiches.length === 1
          ? "La voix a orienté vers : " + (first.title || first.nom) + "."
          : fiches.length + " fiches compatibles remontent. Le client choisit, le pro garde la main.") +
        "</span>";
    }

    if(preparedContinue){
      preparedContinue.href = first.url || "#";
      preparedContinue.target = "_self";
      preparedContinue.textContent = fiches.length === 1 ? "📄 Ouvrir la fiche" : "📄 Ouvrir le premier choix";
    }

    if(preparedWhatsapp){
      preparedWhatsapp.href = "#results";
      preparedWhatsapp.removeAttribute("target");
      preparedWhatsapp.textContent = fiches.length === 1 ? "👀 Voir la fiche" : "👀 Voir toutes les fiches";
    }

    preparedAction.classList.add("open");
  }

  function run(text, origin){
    const demande = clean(text);
    if(!useful(demande)) return [];

    const n = normalize(demande);
    if(n === last) return [];
    last = n;

    const engine = getAnnuaire();
    if(!engine || typeof engine.traiterDemande !== "function"){
      console.warn("[DIGIY] Annuaire public non disponible pour :", demande);
      return [];
    }

    const fiches = engine.traiterDemande(demande) || [];
    setPreparedAction(demande, fiches);

    document.dispatchEvent(new CustomEvent("digiy:fiches:ready", {
      detail:{ version:VERSION, origin:origin || "safe", demande:demande, total:fiches.length, fiches:fiches }
    }));

    return fiches;
  }

  function runLater(origin, delay){
    clearTimeout(timer);
    timer = setTimeout(function(){
      run(getText(), origin || "later");
    }, delay || 250);
  }

  function bind(){
    const q = $("q") || document.querySelector("textarea");
    const go = $("goBtn") || $("searchBtn") || document.querySelector("[data-digiy-go]");
    const listen = $("listenBtn");

    if(q && q.dataset.digiySafeFiches !== "1"){
      q.dataset.digiySafeFiches = "1";
      q.addEventListener("input", function(){ runLater("input", 650); });
      q.addEventListener("change", function(){ runLater("change", 80); });
      q.addEventListener("keydown", function(e){
        if(e.key === "Enter" && !e.shiftKey) runLater("enter", 80);
      });
    }

    if(go && go.dataset.digiySafeFiches !== "1"){
      go.dataset.digiySafeFiches = "1";
      go.addEventListener("click", function(){
        setTimeout(function(){ run(getText(), "voir-120"); }, 120);
        setTimeout(function(){ run(getText(), "voir-700"); }, 700);
      });
    }

    if(listen && listen.dataset.digiySafeFiches !== "1"){
      listen.dataset.digiySafeFiches = "1";
      listen.addEventListener("click", function(){
        setTimeout(function(){ run(getText(), "voice-900"); }, 900);
        setTimeout(function(){ run(getText(), "voice-1700"); }, 1700);
        setTimeout(function(){ run(getText(), "voice-2600"); }, 2600);
      });
    }

    document.querySelectorAll(".ex,.examplePhrase,[data-q]").forEach(function(btn){
      if(btn.dataset.digiySafeExample === "1") return;
      btn.dataset.digiySafeExample = "1";
      btn.addEventListener("click", function(){
        const text = btn.getAttribute("data-q") || btn.textContent || "";
        const qEl = $("q") || document.querySelector("textarea");
        if(qEl && text) qEl.value = clean(text);
        setTimeout(function(){ run(text, "example"); }, 90);
      });
    });
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", bind);
  }else{
    bind();
  }

  let scans = 0;
  const scanner = setInterval(function(){
    bind();
    scans += 1;
    if(scans >= 12) clearInterval(scanner);
  }, 500);

  window.DIGIY_VOIX_FICHES_SAFE_PATCH = {
    version:VERSION,
    run:run,
    getText:getText
  };
})();
