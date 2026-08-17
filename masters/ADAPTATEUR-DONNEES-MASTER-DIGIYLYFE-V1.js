/*
  DIGIYLYFE · ADAPTATEUR DONNEES MASTER · V1 UNIFIE
  BORNE 2 · 4 MASTERS
  Source: MODELE-DONNEES-MASTER-DIGIYLYFE-V1-UNIFIE.json
  Une source unique -> quatre payloads de carte spécialisés.
*/
(function(root){
  "use strict";

  const LANGS=["fr","en","es","pt","it","de","nl","ar"];
  const CONFIG={
    SERVICE_ARTISAN:{masterType:"service",itemKey:"services",photoKey:"photoUrl"},
    COMMERCE:{masterType:"commerce",itemKey:"products",photoKey:"photoUrl"},
    LIEU_TOURISME:{masterType:"lieu",itemKey:"features",photoKey:"photoUrl"},
    BEAUTE_RESTAURATION_ACTIVITE_VISUELLE:{masterType:"visuel",itemKey:"offers",photoKey:"heroPhotoUrl"}
  };

  const clean=v=>String(v??"").trim();

  function absoluteUrl(value,baseUrl){
    const v=clean(value);
    if(!v)return "";
    try{return new URL(v,baseUrl||root.location?.origin||"https://digiylyfe.com/").toString()}
    catch(_){return ""}
  }

  function requireObject(value,label){
    if(!value||typeof value!=="object"||Array.isArray(value))throw new Error(label+" manquant ou invalide.");
    return value;
  }

  function normalizeElements(entry){
    const rows=Array.isArray(entry?.elements_metier)?entry.elements_metier:[];
    return rows.slice(0,4).map(x=>clean(typeof x==="string"?x:x?.libelle));
  }

  function configFor(data){
    const master=clean(data?.identite?.master);
    const config=CONFIG[master];
    if(!config)throw new Error("identite.master non reconnu: "+(master||"vide")+".");
    return {master,...config};
  }

  function validateUnified(data){
    requireObject(data,"Dossier unifié");
    const identite=requireObject(data.identite,"identite");
    const presence=requireObject(data.presence,"presence");
    const photos=requireObject(data.photos,"photos");
    const validation=requireObject(data.validation,"validation");
    const contenu=requireObject(data.contenu_i18n,"contenu_i18n");
    configFor(data);

    if(!clean(identite.nom_affiche))throw new Error("identite.nom_affiche requis.");
    if(!clean(identite.metier))throw new Error("identite.metier requis.");
    if(!clean(identite.ville))throw new Error("identite.ville requis.");
    if(!clean(presence.telephone))throw new Error("presence.telephone requis.");
    if(!clean(presence.whatsapp))throw new Error("presence.whatsapp requis.");
    if(!photos.principale||!clean(photos.principale.src))throw new Error("photos.principale.src requis.");

    LANGS.forEach(lang=>{
      const row=contenu[lang];
      if(!row)throw new Error("contenu_i18n."+lang+" manquant.");
      if(!clean(row.metier_label))throw new Error("contenu_i18n."+lang+".metier_label requis.");
      const items=normalizeElements(row);
      if(items.length!==4||items.some(x=>!x))throw new Error("contenu_i18n."+lang+".elements_metier doit contenir 4 libellés.");
      if(lang==="ar"&&row._dir!=="rtl")throw new Error("contenu_i18n.ar._dir doit être rtl.");
    });

    if(!["brouillon","en_attente","valide","publie"].includes(validation.carte))throw new Error("validation.carte invalide.");
    return true;
  }

  function pendingLanguages(data){
    validateUnified(data);
    return LANGS.filter(lang=>data.contenu_i18n[lang]?._a_valider!==false);
  }

  function publicationReady(data){
    validateUnified(data);
    return ["valide","publie"].includes(data.validation.carte)&&pendingLanguages(data).length===0;
  }

  function toCard(data,options={}){
    validateUnified(data);
    const cfg=configFor(data);
    const baseUrl=options.baseUrl||"https://digiylyfe.com/";
    const identite=data.identite;
    const presence=data.presence;
    const contenu=data.contenu_i18n;
    const i18n={};

    LANGS.forEach(lang=>{
      const row=contenu[lang];
      i18n[lang]={
        job:clean(row.metier_label)||clean(identite.metier),
        zone:clean(identite.ville),
        [cfg.itemKey]:normalizeElements(row)
      };
    });

    const card={
      published:data.validation.carte==="publie"&&pendingLanguages(data).length===0,
      name:clean(identite.nom_affiche),
      phone:clean(presence.telephone),
      whatsapp:clean(presence.whatsapp),
      finalUrl:absoluteUrl(presence.qr_cible,baseUrl),
      qrUrl:absoluteUrl(presence.qr_image,baseUrl),
      ficheUrl:absoluteUrl(data.fiche?.url,baseUrl),
      siteUrl:absoluteUrl(data.site?.url,baseUrl),
      countryCode:clean(identite.pays)||"SN",
      languages:[...LANGS],
      i18n
    };
    card[cfg.photoKey]=absoluteUrl(data.photos.principale.src,baseUrl);

    // Le MASTER visuel possède déjà ce hook optionnel. Le modèle unifié peut le laisser vide.
    if(cfg.masterType==="visuel")card.bookingUrl=absoluteUrl(data.presence?.reservation_url,baseUrl);

    return card;
  }

  function toGeneratorPack(data,options={}){
    const cfg=configFor(data);
    const card=toCard(data,options);
    const translations={};
    LANGS.forEach(lang=>{
      const row=card.i18n[lang]||{};
      translations[lang]={job:row.job,zone:row.zone,[cfg.itemKey]:row[cfg.itemKey]||[]};
    });
    return {
      master_type:cfg.masterType,
      request_id:clean(data.meta?.dossier_id),
      plan_code:'',
      name:card.name,
      phone:card.phone,
      whatsapp:card.whatsapp,
      photoUrl:card.photoUrl||card.heroPhotoUrl||'',
      finalUrl:card.finalUrl,
      qrUrl:card.qrUrl,
      ficheUrl:card.ficheUrl,
      siteUrl:card.siteUrl,
      bookingUrl:card.bookingUrl||'',
      translations
    };
  }

  function toServiceCard(data,options={}){
    if(data?.identite?.master!=="SERVICE_ARTISAN")throw new Error("MASTER attendu: SERVICE_ARTISAN.");
    return toCard(data,options);
  }

  root.DIGIYLYFE_DATA_ADAPTER={
    version:"V1-UNIFIE-4-MASTERS",
    languages:[...LANGS],
    supportedMasters:Object.keys(CONFIG),
    configFor,
    validateUnified,
    pendingLanguages,
    publicationReady,
    toCard,
    toGeneratorPack,
    toServiceCard
  };
})(window);