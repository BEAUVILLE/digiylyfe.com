/* DIGIYLYFE — référentiel territoire central v1
   Normalise villes, zones et territoires avant filtrage/recherche.
   Déterministe, sans géolocalisation forcée.
*/
(function(){
  "use strict";
  if(window.DIGIY_TERRITOIRE) return;

  const TERRITORIES = {
    sn:{
      country:"SN",
      canonical:"senegal",
      aliases:["senegal","sénégal"],
      regions:{
        petite_cote:{
          canonical:"petite cote",
          aliases:["petite cote","petite côte","petite-cote","petite-côte"],
          places:{
            saly:{canonical:"saly",aliases:["saly","saly portudal","saly portugal"]},
            mbour:{canonical:"mbour",aliases:["mbour"]},
            ngaparou:{canonical:"ngaparou",aliases:["ngaparou"]},
            somone:{canonical:"somone",aliases:["somone","la somone"]}
          }
        },
        dakar:{
          canonical:"dakar",
          aliases:["dakar"],
          places:{
            dakar:{canonical:"dakar",aliases:["dakar"]},
            aibd:{canonical:"aibd",aliases:["aibd","aeroport blaise diagne","aéroport blaise diagne","diass"]}
          }
        },
        thies:{
          canonical:"thies",
          aliases:["thies","thiès"],
          places:{
            thies:{canonical:"thies",aliases:["thies","thiès"]},
            touba:{canonical:"touba",aliases:["touba"]}
          }
        }
      }
    },
    fr:{
      country:"FR",
      canonical:"france",
      aliases:["france"],
      regions:{
        dordogne:{
          canonical:"dordogne",
          aliases:["dordogne","perigord","périgord"],
          places:{
            sarlat:{canonical:"sarlat",aliases:["sarlat","sarlat la caneda","sarlat-la-caneda","sarlat-la-canéda"]},
            condat:{canonical:"condat sur vezere",aliases:["condat","condat sur vezere","condat-sur-vezere","condat-sur-vézère"]},
            lardin:{canonical:"le lardin saint lazare",aliases:["lardin","le lardin","le lardin saint lazare","le lardin-saint-lazare"]}
          }
        },
        gironde:{
          canonical:"gironde",
          aliases:["gironde"],
          places:{
            bordeaux:{canonical:"bordeaux",aliases:["bordeaux"]},
            arcachon:{canonical:"arcachon",aliases:["arcachon","bassin d arcachon","bassin d'arcachon"]}
          }
        },
        ile_de_france:{
          canonical:"ile de france",
          aliases:["ile de france","île-de-france","ile-de-france"],
          places:{
            paris:{canonical:"paris",aliases:["paris","paris ile de france","paris île-de-france","paris ile-de-france"]}
          }
        }
      }
    },
    ma:{
      country:"MA",
      canonical:"maroc",
      aliases:["maroc","morocco"]
    },
    us:{
      country:"US",
      canonical:"usa",
      aliases:["usa","etats unis","états-unis","united states"],
      regions:{
        florida:{
          canonical:"florida",
          aliases:["florida","floride"],
          places:{miami:{canonical:"miami",aliases:["miami"]}}
        }
      }
    }
  };

  function norm(v){
    return String(v||"").toLowerCase().normalize("NFD")
      .replace(/[\u0300-\u036f]/g,"")
      .replace(/[’']/g," ")
      .replace(/[^a-z0-9\s-]/g," ")
      .replace(/\s+/g," ").trim();
  }

  const INDEX=[];
  for(const [countryKey,country] of Object.entries(TERRITORIES)){
    for(const a of country.aliases||[]) INDEX.push({kind:"country",country:countryKey,canonical:country.canonical,alias:norm(a)});
    for(const [regionKey,region] of Object.entries(country.regions||{})){
      for(const a of region.aliases||[]) INDEX.push({kind:"region",country:countryKey,region:regionKey,canonical:region.canonical,alias:norm(a)});
      for(const [placeKey,place] of Object.entries(region.places||{})){
        for(const a of place.aliases||[]) INDEX.push({kind:"place",country:countryKey,region:regionKey,place:placeKey,canonical:place.canonical,alias:norm(a)});
      }
    }
  }
  INDEX.sort((a,b)=>b.alias.length-a.alias.length);

  function resolve(value){
    const raw=norm(value);
    if(!raw) return null;
    for(const item of INDEX){
      if(raw===item.alias || raw.includes(item.alias)) return {...item,matched:item.alias};
    }
    return null;
  }

  function canonical(value){
    const r=resolve(value);
    return r ? r.canonical : norm(value);
  }

  function expand(value){
    const r=resolve(value);
    if(!r) return [norm(value)].filter(Boolean);
    const out=new Set([r.canonical,r.alias]);
    if(r.kind==="place"){
      const region=TERRITORIES[r.country]?.regions?.[r.region];
      if(region){
        out.add(region.canonical);
        (region.aliases||[]).forEach(x=>out.add(norm(x)));
      }
      const country=TERRITORIES[r.country];
      if(country){
        out.add(country.canonical);
        (country.aliases||[]).forEach(x=>out.add(norm(x)));
      }
    }
    return [...out].filter(Boolean);
  }

  function matches(profileLocation, query){
    const q=expand(query);
    if(!q.length) return true;
    const hay=norm(profileLocation);
    return q.some(x=>hay.includes(norm(x)));
  }

  function enrich(value){
    const r=resolve(value);
    if(!r) return String(value||"");
    return [value,...expand(value)].join(" ");
  }

  window.DIGIY_TERRITOIRE={
    version:"territoire-v2-20260926",
    territories:TERRITORIES,
    norm,resolve,canonical,expand,matches,enrich
  };
})();