/*
  DIGIYLYFE · ADAPTATEUR DONNEES MASTER · V1 UNIFIE
  BORNE 2 · 4 MASTERS
  Source: MODELE-DONNEES-MASTER-DIGIYLYFE-V1-UNIFIE.json
  Une source unique -> quatre payloads de carte specialises.
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

  function validateShape(data){
    requireObject(data,"Dossier unifie");
    requireObject(data.identite,"identite");
    requireObject(data.presence,"presence");
    requireObject(data.photos,"photos");
    requireObject(data.validation,"validation");
    requireObject(data.contenu_i18n,"contenu_i18n");
    configFor(data);
    return true;
  }

  function validateUnified(data){
    validateShape(data);
    const identite=data.identite;
    const presence=data.presence;
    const photos=data.photos;
    const validation=data.validation;
    const contenu=data.contenu_i18n;

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
      if(items.length!==4||items.some(x=>!x))throw new Error("contenu_i18n."+lang+".elements_metier doit contenir 4 libelles.");
      if(lang==="ar"&&row._dir!=="rtl")throw new Error("contenu_i18n.ar._dir doit etre rtl.");
    });

    if(!["brouillon","en_attente","valide","publie"].includes(validation.carte))throw new Error("validation.carte invalide.");
    return true;
  }

  function pendingLanguages(data){
    validateShape(data);
    return LANGS.filter(lang=>data.contenu_i18n[lang]?._a_valider!==false);
  }

  function publicationReady(data){
    validateUnified(data);
    return ["valide","publie"].includes(data.validation.carte)&&pendingLanguages(data).length===0&&data.photos?.principale?.temporaire!==true;
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
      published:data.validation.carte==="publie"&&pendingLanguages(data).length===0&&data.photos?.principale?.temporaire!==true,
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
    if(cfg.masterType==="visuel")card.bookingUrl=absoluteUrl(data.presence?.reservation_url,baseUrl);
    return card;
  }

  // Import atelier tolerant : le dossier peut arriver incomplet.
  // Le controle strict reste dans validateUnified/publicationReady avant publication.
  function toGeneratorPack(data,options={}){
    validateShape(data);
    const cfg=configFor(data);
    const baseUrl=options.baseUrl||"https://digiylyfe.com/";
    const translations={};
    LANGS.forEach(lang=>{
      const row=data.contenu_i18n?.[lang]||{};
      translations[lang]={
        job:clean(row.metier_label)||clean(data.identite?.metier),
        zone:clean(data.identite?.ville),
        [cfg.itemKey]:normalizeElements(row)
      };
    });
    return {
      master_type:cfg.masterType,
      request_id:clean(data.meta?.dossier_id),
      plan_code:'',
      name:clean(data.identite?.nom_affiche),
      phone:clean(data.presence?.telephone),
      whatsapp:clean(data.presence?.whatsapp),
      photoUrl:absoluteUrl(data.photos?.principale?.src,baseUrl),
      finalUrl:absoluteUrl(data.presence?.qr_cible,baseUrl),
      qrUrl:absoluteUrl(data.presence?.qr_image,baseUrl),
      ficheUrl:absoluteUrl(data.fiche?.url,baseUrl),
      siteUrl:absoluteUrl(data.site?.url,baseUrl),
      bookingUrl:cfg.masterType==="visuel"?absoluteUrl(data.presence?.reservation_url,baseUrl):'',
      translations
    };
  }

  function toServiceCard(data,options={}){
    if(data?.identite?.master!=="SERVICE_ARTISAN")throw new Error("MASTER attendu: SERVICE_ARTISAN.");
    return toCard(data,options);
  }

  // Compatibilite transport temporaire : le generateur historique invoque encore le bridge avec {id}.
  // On enrichit uniquement CET endpoint avec le Master choisi par l'humain et format=unifie.
  function installBridgeInvokeCompatibility(){
    const ns=root.supabase;
    if(!ns||typeof ns.createClient!=="function"||ns.__digiyUnifiedBridgeInstalled)return;
    const originalCreate=ns.createClient.bind(ns);
    ns.createClient=function(...args){
      const client=originalCreate(...args);
      const functions=client?.functions;
      if(functions&&typeof functions.invoke==="function"&&!functions.__digiyUnifiedBridgeInstalled){
        const originalInvoke=functions.invoke.bind(functions);
        functions.invoke=function(name,options={}){
          if(name==="digiy-adhesion-card-bridge"){
            const body=options?.body&&typeof options.body==="object"&&!Array.isArray(options.body)?{...options.body}:{};
            const selected=clean(root.document?.querySelector?.("#masterType")?.value);
            if(!body.master_type&&selected)body.master_type=selected;
            if(!body.format)body.format="unifie";
            return originalInvoke(name,{...options,body});
          }
          return originalInvoke(name,options);
        };
        functions.__digiyUnifiedBridgeInstalled=true;
      }
      return client;
    };
    ns.__digiyUnifiedBridgeInstalled=true;
  }

  root.DIGIYLYFE_DATA_ADAPTER={
    version:"V1-UNIFIE-4-MASTERS",
    languages:[...LANGS],
    supportedMasters:Object.keys(CONFIG),
    configFor,
    validateShape,
    validateUnified,
    pendingLanguages,
    publicationReady,
    toCard,
    toGeneratorPack,
    toServiceCard
  };

  installBridgeInvokeCompatibility();
})(window);
