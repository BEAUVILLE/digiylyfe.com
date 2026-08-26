/* DIGIYLYFE — PETITE COTE CONFIG V1
 * Source partagée Saly / territoire / démos.
 * 9 portes x 3 projections. ANNONCES remonte en premier.
 * LA VOIX = recherche, jamais un métier.
 */
(function(){'use strict';
window.DIGIY_PETITE_COTE={
  build:'petite-cote-27-projections-annonces-hot-v1-20260826',
  territory:'petite-cote',
  pilot:'saly',
  price:'19 900 FCFA / mois',
  palette:{sand:'#E8C890',atlantic:'#2EA7AD',lagoon:'#76C7C2',mangrove:'#244F3B',coral:'#E98663',gold:'#F6C453',cream:'#FFF7E8',deep:'#082E35'},
  zones:{aibd:'AIBD',ndayane:'Ndayane',popenguine:'Popenguine',somone:'Somone',ngaparou:'Ngaparou',saly:'Saly',mbour:'Mbour'},
  needs:[
    ['announcements','⚡','ANNONCES / BESOINS'],
    ['transport','🚗','DRIVER / TRANSPORT'],
    ['artisan','🔧','ARTISAN'],
    ['accommodation','🏠','LOGEMENT / LOC'],
    ['food','🍽️','RESTAURANT'],
    ['shopping','🛍️','MON COMMERCE'],
    ['beauty','💅','BEAUTÉ & BIEN-ÊTRE'],
    ['jobs','💼','JOBS / MISSIONS'],
    ['guidance','🎙️','LA VOIX']
  ],
  examples:{
    announcements:[
      {title:'⚡ Besoin urgent / dépannage',zone:'saly',services:['Besoin du moment','Réponse locale','Contact direct']},
      {title:'🧰 Location de matériel',zone:'mbour',services:['Matériel disponible','Demande directe','Petite Côte']},
      {title:'🎪 Service événementiel',zone:'ngaparou',services:['Événement','Prestataire local','Demande de devis']}
    ],
    transport:[
      {title:'🚗 Chauffeur AIBD ↔ Saly',zone:'aibd',services:['Transfert aéroport','Saly / Petite Côte','Réservation directe']},
      {title:'🚐 Navette hôtels & résidences',zone:'saly',services:['Saly · Ngaparou · Somone','Bagages','Contact direct']},
      {title:'🚘 Driver journée Petite Côte',zone:'somone',services:['Mise à disposition','Excursions locales','Réservation directe']}
    ],
    artisan:[
      {title:'🔧 Plombier dépannage',zone:'saly',services:['Fuite d’eau','Dépannage','Devis direct']},
      {title:'⚡ Électricien bâtiment',zone:'mbour',services:['Installation','Panne électrique','Intervention directe']},
      {title:'🧱 Maçon / rénovation',zone:'ngaparou',services:['Construction','Rénovation','Travaux sur mesure']}
    ],
    accommodation:[
      {title:'🏠 Appartement à Saly',zone:'saly',services:['Courte durée','Réservation directe','Équipements']},
      {title:'🏡 Villa proche lagune',zone:'somone',services:['Séjour famille','Location directe','Disponibilités']},
      {title:'🛏️ Chambre / résidence',zone:'ngaparou',services:['Nuitée','Moyenne durée','Contact direct']}
    ],
    food:[
      {title:'🍽️ Restaurant poisson & grillades',zone:'mbour',services:['Cuisine locale','Réservation','Contact direct']},
      {title:'🥂 Table plage / dîner',zone:'saly',services:['Déjeuner','Dîner','Réservation directe']},
      {title:'☕ Petit déjeuner / brunch',zone:'ngaparou',services:['Matin','Brunch','Contact direct']}
    ],
    shopping:[
      {title:'🛍️ Boutique mode',zone:'saly',services:['Vêtements','Nouveautés','Commande directe']},
      {title:'🧺 Produits locaux & épicerie',zone:'mbour',services:['Produits locaux','Commande','Contact direct']},
      {title:'🏺 Maison & artisanat',zone:'popenguine',services:['Maison','Artisanat','Catalogue direct']}
    ],
    beauty:[
      {title:'💇 Coiffure & soins',zone:'saly',services:['Coiffure','Soins','Rendez-vous direct']},
      {title:'💅 Onglerie & beauté',zone:'ngaparou',services:['Ongles','Beauté','Réservation directe']},
      {title:'🌿 Massage & bien-être',zone:'somone',services:['Massage','Bien-être','Rendez-vous direct']}
    ],
    jobs:[
      {title:'💼 Hôtel / résidence qui recrute',zone:'saly',services:['Accueil','Entretien','Candidature directe']},
      {title:'👨‍🍳 Restaurant qui recrute',zone:'mbour',services:['Cuisine','Service','Candidature directe']},
      {title:'🤝 Mission tourisme / terrain',zone:'somone',services:['Animation','Accueil','Mission ponctuelle']}
    ],
    guidance:[
      {title:'🎙️ Trouver un chauffeur',zone:'aibd',services:['« un chauffeur pour Saly »','Recherche vocale','Résultat territorial']},
      {title:'🎙️ Trouver où manger',zone:'saly',services:['« où manger ce soir à Saly ? »','Recherche vocale','Résultat territorial']},
      {title:'🎙️ Trouver un artisan',zone:'ngaparou',services:['« un plombier à Ngaparou »','Recherche vocale','Résultat territorial']}
    ]
  }
};
})();