# SECURITE ACCUEIL + LA VOIX — 29 août 2026

Cette copie est un repère de sécurité hors du rail actif.

## Rail vivant
- `main/index.html` = accueil DIGIYLYFE.
- `main/digiy-contact-global.js` = chargeur vitrine qui corrige l’affichage de la porte LA VOIX sur l’accueil.
- `main/sw.js` = service worker PWA léger.
- Le vrai moteur LA VOIX reste dans le dépôt séparé `BEAUVILLE/pro-action-digiy` et s’ouvre via `https://pro-action-digiy.digiylyfe.com/`.

## Doctrine figée
LA VOIX n’est pas un module métier ni un second MASTER. Elle reste un moteur transversal : PAYS → ZONE → besoin → recherche → MASTER/fiches utiles.

## Copies présentes dans ce dossier
- `digiy-contact-global.js` = copie exacte du chargeur après correction LA VOIX du 29/08/2026.
- `sw.js` = copie exacte du PWA après bump `digiylyfe-pwa-20260829-voix`.

## Règle pour les prochains chats
Ne jamais utiliser ce dossier comme rail actif. Il sert uniquement de sauvegarde lisible et d’indice. Toute évolution doit partir du rail vivant sur `main` et respecter la doctrine MAÎTRE TERRITOIRE → contexte pays/zone → MASTER métier unique → fiches/actions utiles.
