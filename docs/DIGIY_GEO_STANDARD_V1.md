# DIGIY GEO STANDARD V1

## Objectif

Rendre chaque présence professionnelle DIGIYLYFE lisible de façon cohérente par :

- l’humain ;
- Google et les moteurs de recherche ;
- les moteurs IA / GEO ;
- LA VOIX et les moteurs territoriaux DIGIY.

Ce standard n’ajoute aucun intermédiaire commercial et ne modifie ni prix, ni contact, ni paiement.

## Les 4 couches

### 1. DIGIY ID
- nom public ;
- métier principal ;
- description courte ;
- URL canonique ;
- image principale.

### 2. DIGIY TERRITORY
- ville/base ;
- région ;
- pays ;
- zones réellement desservies.

### 3. DIGIY NEED
- services concrets ;
- besoins couverts ;
- questions/réponses terrain utiles.

### 4. DIGIY GEO
- title ;
- meta description ;
- canonical ;
- Open Graph ;
- JSON-LD Schema.org ;
- liens externes cohérents `sameAs` lorsqu’ils sont vérifiés.

## Champs minimum obligatoires

```js
window.DIGIY_GEO_PROFILE = {
  type: "LocalBusiness",
  name: "Nom public",
  description: "Métier + territoire + bénéfice concret.",
  url: "https://sous-domaine.digiylyfe.com/",
  addressLocality: "Ville",
  addressCountry: "SN",
  areaServed: ["Ville", "Zone 2"],
  serviceType: ["Service 1", "Service 2"] // converti en makesOffer -> Service
};
```

Puis charger :

```html
<script src="/assets/digiy-geo-profile-v1.js"></script>
```

## Types recommandés

Utiliser le type Schema.org le plus précis disponible, sans inventer de type :

- plombier : `Plumber`
- restaurant : `Restaurant`
- hébergement : `LodgingBusiness` ou sous-type exact si pertinent
- chauffeur / transport local : `TaxiService` lorsque le service correspond réellement
- boutique : `Store` ou sous-type exact
- avocat / service juridique : `LegalService`
- autres professionnels : `LocalBusiness` avec des offres `Service` lorsque aucun sous-type métier précis ne convient

## Règles de qualité

1. Ne jamais inventer une adresse, un horaire, une certification, un avis ou une zone desservie.
2. Les zones `areaServed` doivent correspondre au terrain réel.
3. Les services doivent être formulés comme des prestations concrètes, pas comme une liste de mots-clés.
4. `sameAs` ne contient que des profils externes vérifiés appartenant réellement au professionnel.
5. Le téléphone, WhatsApp et les prix restent directs vers le professionnel.
6. Aucun contenu GEO caché ne doit contredire ce que voit l’utilisateur.
7. Une seule URL canonique par présence.
8. Le vocabulaire public cible reste ADHÉRENT / PROPRIÉTAIRE ; l’ancien « DIGIY PRO » doit être retiré au fil des migrations validées.

## FAQ terrain

Prévoir 3 à 5 questions maximum, réellement utiles. Exemple plombier :

- Intervenez-vous à Saly ?
- Faites-vous les dépannages urgents ?
- Peut-on demander un devis avant intervention ?
- Quelles zones couvrez-vous ?

Les réponses doivent rester factuelles. Si une information dépend de la disponibilité du professionnel, l’indiquer.

## Exemples de profils

### Babacar — plomberie

```js
window.DIGIY_GEO_PROFILE = {
  type: "Plumber",
  name: "Babacar Plombier Pro",
  description: "Plombier basé à Mbour, interventions à Mbour, Saly et Ngaparou.",
  url: "URL_CANONIQUE_A_CONFIRMER",
  addressLocality: "Mbour",
  addressRegion: "Thiès",
  addressCountry: "SN",
  areaServed: ["Mbour", "Saly", "Ngaparou", "Petite Côte"],
  serviceType: [
    "Dépannage plomberie",
    "Fuite d’eau",
    "Sanitaire",
    "Robinetterie",
    "Canalisation"
  ]
};
```

### Lamine — chauffeur

```js
window.DIGIY_GEO_PROFILE = {
  type: "TaxiService",
  name: "Lamine",
  description: "Chauffeur privé sur Saly, AIBD, Mbour, Dakar et Petite Côte.",
  url: "URL_CANONIQUE_A_CONFIRMER",
  addressLocality: "Saly",
  addressRegion: "Thiès",
  addressCountry: "SN",
  areaServed: ["Saly", "AIBD", "Mbour", "Dakar", "Petite Côte"],
  serviceType: [
    "Transfert AIBD vers Saly",
    "Transfert Saly vers Dakar",
    "Chauffeur privé",
    "Mise à disposition"
  ]
};
```

## Déploiement

V1 doit d’abord être appliquée sur une présence pilote et contrôlée avec :
- rendu visuel inchangé ;
- source JSON-LD valide ;
- canonical unique ;
- aucune donnée inventée ;
- recherche et contact toujours opérationnels.

Ensuite seulement, généraliser au générateur / moule commun.
