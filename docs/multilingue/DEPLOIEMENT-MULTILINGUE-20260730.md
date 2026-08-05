# DIGIYLYFE — Déploiement multilingue du 30 juillet 2026

## Socle commun

- Langues : FR, EN, ES, DE, IT, NL, AR.
- Moteur : `assets/i18n/digiy-i18n.js`.
- Routeur international : `assets/i18n/digiy-route.js`.
- Aucun service externe et aucune API de traduction ou de voix payante.
- Arabe : `dir="rtl"`.
- Lecture : Web Speech API / voix déjà disponibles sur l’appareil.
- La langue est reçue par `?lang=xx` et conservée dans `localStorage`.

## Modules publics équipés

Chaque dépôt ci-dessous possède une entrée `lang.html`, sans remplacement de son `index.html` métier :

- `BEAUVILLE/pro-action-digiy` — ACTION PRO.
- `BEAUVILLE/digiy-driver-client` — DRIVER client.
- `BEAUVILLE/digiy-loc` — LOC.
- `BEAUVILLE/digiy-market` — MARKET.
- `BEAUVILLE/digiy-build` — BUILD.
- `BEAUVILLE/digiy-jobs` — JOBS.
- `BEAUVILLE/digiy-resa-table-resto` — RESA.
- `BEAUVILLE/digiy-explore` — EXPLORE.
- `BEAUVILLE/digiy-resto` — RESTO.
- `BEAUVILLE/reseau-digiy` — RÉSEAU DIGIY.
- `BEAUVILLE/digiy-carnet-pro` — porte publique CARNET.
- `BEAUVILLE/digiy-hub` — HUB.
- `BEAUVILLE/mon-commerce` — MON COMMERCE.
- `BEAUVILLE/partenaire-pilote` — activation pilote.
- `BEAUVILLE/digiy-tarifs` — tarifs.
- `BEAUVILLE/portail-inscription` — inscription.
- `BEAUVILLE/digiy-resto-caisse` — caisse RESTO.

## Modules professionnels équipés

Les entrées PRO acceptent aussi un paramètre sécurisé `page=nom.html`. Le chemin est filtré et ne peut pas contenir `..`.

- `BEAUVILLE/digiy-pro-driver`.
- `BEAUVILLE/pro-loc`.
- `BEAUVILLE/pro-market`.
- `BEAUVILLE/pro-build`.
- `BEAUVILLE/pro-job`.
- `BEAUVILLE/pro-resa-resto`.
- `BEAUVILLE/pro-explore`.
- `BEAUVILLE/pro-resto`.
- `BEAUVILLE/pro-carnet`.
- `BEAUVILLE/pro-espace`.
- `BEAUVILLE/mon-commerce-pro`.
- `BEAUVILLE/pro-qr-code`.

## Extensions équipées

- `BEAUVILLE/digiy-client-fret`.
- `BEAUVILLE/digiy-fret-chauffeur`.
- `BEAUVILLE/pro-client-fret`.
- `BEAUVILLE/pro-fret-chauffeur`.
- `BEAUVILLE/digiy-ndimbal-map`.
- `BEAUVILLE/ndimbal-express`.
- `BEAUVILLE/digiy-bonne-affaire`.

## Pages internationales raccordées

Les pages `en/`, `es/`, `de/`, `it/`, `nl/` et `ar/` chargent le routeur commun. Les clics vers une porte équipée sont transformés en :

```text
https://module.digiylyfe.com/lang.html?lang=xx
```

Pour une page interne PRO :

```text
https://module-pro.digiylyfe.com/lang.html?lang=xx&page=pin.html
```

## Sécurité

Le déploiement ajoute des fichiers séparés. Il ne modifie pas :

- les fonctions PIN ;
- la création ou la durée des sessions ;
- les appels Supabase et RPC ;
- les données professionnelles ;
- les calculs, tarifs ou actions métier ;
- les fichiers `pin.html`, `cockpit.html` ou les portes stables existantes.

## Limite actuelle

Le socle traduit le vocabulaire commun de l’interface : boutons, menus, formulaires, statuts, messages fréquents, champs, actions et navigation. Il ne constitue pas encore une traduction humaine exhaustive de chaque longue description propre à chaque module.

La prochaine couche de qualité consiste à enregistrer, module par module, des dictionnaires spécialisés avec les phrases métier exactes tout en conservant ce moteur commun.
