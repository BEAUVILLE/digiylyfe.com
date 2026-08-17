/*
  DIGIYLYFE · ADAPTATEUR DONNEES MASTER · V1
  BORNE 2 · SERVICE / ARTISAN
  Source: MODELE-DONNEES-MASTER-DIGIYLYFE-V1-UNIFIE.json
  But: convertir le contrat unifié vers le payload attendu par le MASTER carte Service/Artisan V3.
*/
(function(root){
  "use strict";

  const LANGS=["fr","en","es","pt","it","de","nl","ar"];
  const MASTER="SERVICE_ARTISAN";

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

  function validateUnified(data){
    requireObject(data,"Dossier unifié");
    const identite=requireObject(data.identite,"identite");
    const presence=requireObject(data.presence,"presence");
    const photos=requireObject(data.photos,"photos");
    const validation=requireObject(data.validation,"validation");
    const contenu=requireObject(data.contenu_i18n,"contenu_i18n");

    if(identite.master!==MASTER)throw new Error("MASTER attendu: "+MASTER+".");
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
      if(normalizeElements(row).length!==4||normalizeElements(row).some(x=>!x)){
        throw new Error("contenu_i18n."+lang+".elements_metier doit contenir 4 libellés.");
      }
      if(lang==="ar"&&row._dir!=="rtl")throw new Error("contenu_i18n.ar._dir doit être rtl.");
    });

    if(!["brouillon","en_attente","valide","publie"].includes(validation.carte)){
      throw new Error("validation.carte invalide.");
    }
    return true;
  }

  function toServiceCard(data,options={}){
    validateUnified(data);
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
        services:normalizeElements(row)
      };
    });

    return {
      published:data.validation.carte==="publie",
      name:clean(identite.nom_affiche),
      phone:clean(presence.telephone),
      whatsapp:clean(presence.whatsapp),
      photoUrl:absoluteUrl(data.photos.principale.src,baseUrl),
      finalUrl:absoluteUrl(presence.qr_cible,baseUrl),
      qrUrl:absoluteUrl(presence.qr_image,baseUrl),
      ficheUrl:absoluteUrl(data.fiche?.url,baseUrl),
      siteUrl:absoluteUrl(data.site?.url,baseUrl),
      countryCode:clean(identite.pays)||"SN",
      languages:[...LANGS],
      i18n
    };
  }

  root.DIGIYLYFE_DATA_ADAPTER={
    version:"V1",
    supportedMasters:[MASTER],
    validateUnified,
    toServiceCard
  };
})(window);
