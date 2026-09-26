/* DIGIYLYFE — dictionnaire métier central v1
   Source unique pour normaliser les besoins humains avant recherche.
   Déterministe, sans IA. Les moteurs restent responsables du classement des fiches.
*/
(function(){
  "use strict";
  if(window.DIGIY_METIER) return;

  const INTENTS = {
    plombier:{
      module:"BUILD", canonical:"plombier",
      terms:["plombier","plomberie","canalisation","canalisation bouchee","canalisation bouchée","evier bouche","évier bouché","fuite","robinet","robinetterie","sanitaire","tuyauterie","wc","lavabo","douche","debouchage","débouchage"]
    },
    electricien:{
      module:"BUILD", canonical:"electricien",
      terms:["electricien","électricien","electricite","électricité","installation electrique","installation électrique","depannage electrique","dépannage électrique","prise","tableau electrique","tableau électrique","panne de courant"]
    },
    macon:{
      module:"BUILD", canonical:"macon",
      terms:["macon","maçon","maconnerie","maçonnerie","batisseur","bâtisseur","construction villa","construction","piscine beton","piscine béton","renovation","rénovation","extension"]
    },
    solaire:{
      module:"BUILD", canonical:"solaire",
      terms:["solaire","photovoltaique","photovoltaïque","panneau solaire","energie solaire","énergie solaire","electricite solaire","électricité solaire"]
    },
    chauffeur:{
      module:"DRIVER", canonical:"chauffeur",
      terms:["chauffeur","driver","vtc","conducteur","transport de personnes","transfert","aibd","aeroport","aéroport","mise a disposition","mise à disposition","trajet","course"]
    },
    loc:{
      module:"LOC", canonical:"logement",
      terms:["logement","location","hebergement","hébergement","villa","appartement","chambre","nuit","nuitee","nuitée","sejour","séjour","louer","dormir"]
    },
    commerce:{
      module:"COMMERCE", canonical:"boutique",
      terms:["boutique","commerce","magasin","acheter","produit","produits","vente","vendeur","marchand"]
    },
    jobs:{
      module:"JOBS", canonical:"emploi",
      terms:["emploi","job","travail","mission","recrutement","recruter","candidat","candidature","embauche"]
    },
    resa:{
      module:"RESA", canonical:"reservation",
      terms:["reservation","réservation","reserver","réserver","table","rendez vous","rendez-vous","creneau","créneau"]
    },
    explore:{
      module:"EXPLORE", canonical:"sortie",
      terms:["sortie","experience","expérience","activite","activité","visite","decouverte","découverte","peche","pêche","excursion","guide","lieu","balade"]
    },
    beaute:{
      module:"COMMERCE", canonical:"beaute",
      terms:["beaute","beauté","coiffure","coiffeur","coiffeuse","onglerie","ongles","nails","salon de coiffure","salon de beauté","esthetique","esthétique"]
    }
  };

  const LANG_ALIASES = {
    en:{plumber:"plombier",electrician:"electricien",mason:"macon",builder:"macon",driver:"chauffeur",shop:"boutique",accommodation:"logement",hotel:"logement",booking:"reservation",job:"emploi"},
    es:{fontanero:"plombier",electricista:"electricien",albanil:"macon",conductor:"chauffeur",tienda:"boutique",alojamiento:"logement",reserva:"reservation",empleo:"emploi"},
    pt:{canalizador:"plombier",encanador:"plombier",eletricista:"electricien",electricista:"electricien",pedreiro:"macon",motorista:"chauffeur",loja:"boutique",alojamento:"logement",reserva:"reservation",emprego:"emploi"},
    it:{idraulico:"plombier",elettricista:"electricien",muratore:"macon",autista:"chauffeur",negozio:"boutique",alloggio:"logement",prenotazione:"reservation",lavoro:"emploi"},
    de:{klempner:"plombier",installateur:"plombier",elektriker:"electricien",maurer:"macon",fahrer:"chauffeur",geschaft:"boutique",unterkunft:"logement",reservierung:"reservation",arbeit:"emploi"},
    nl:{loodgieter:"plombier",elektricien:"electricien",metselaar:"macon",chauffeur:"chauffeur",winkel:"boutique",accommodatie:"logement",reservering:"reservation",werk:"emploi"},
    ar:{"سباك":"plombier","كهربائي":"electricien","بناء":"macon","بنّاء":"macon","سائق":"chauffeur","متجر":"boutique","سكن":"logement","حجز":"reservation","عمل":"emploi"}
  };

  function norm(v){
    return String(v||"").toLowerCase().normalize("NFD")
      .replace(/[\u0300-\u036f]/g,"")
      .replace(/[’']/g," ")
      .replace(/[^a-z0-9\u0600-\u06ff\s-]/g," ")
      .replace(/\s+/g," ").trim();
  }

  function aliasesFor(lang){
    return LANG_ALIASES[String(lang||"fr").slice(0,2).toLowerCase()] || {};
  }

  function resolve(value,lang){
    const raw=norm(value);
    if(!raw) return null;
    const aliases=aliasesFor(lang);
    const direct=aliases[raw];
    if(direct){
      for(const [key,intent] of Object.entries(INTENTS)){
        if(norm(intent.canonical)===norm(direct)) return {key,...intent,matched:raw};
      }
    }
    let best=null;
    for(const [key,intent] of Object.entries(INTENTS)){
      for(const term of intent.terms){
        const t=norm(term);
        if(t && raw.includes(t)){
          const score=t.length;
          if(!best || score>best.score) best={key,...intent,matched:t,score};
        }
      }
    }
    if(!best) return null;
    delete best.score;
    return best;
  }

  function canonical(value,lang){
    const r=resolve(value,lang);
    return r ? r.canonical : norm(value);
  }

  function enrich(value,lang){
    const r=resolve(value,lang);
    if(!r) return String(value||"");
    return [value,r.canonical,...r.terms].join(" ");
  }

  window.DIGIY_METIER={
    version:"metier-v1-20260926",
    intents:INTENTS,
    aliases:LANG_ALIASES,
    norm,resolve,canonical,enrich
  };
})();