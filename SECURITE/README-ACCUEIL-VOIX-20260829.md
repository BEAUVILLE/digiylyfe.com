# REPÈRE SÉCURITÉ — ACCUEIL + LA VOIX — 29 août 2026

Ce fichier est un indice de sécurité pour les prochains chats. Il ne fait partie d’aucun moteur actif.

## Sauvegarde complète
Branche : `SECURITE-FICHIERS-ACCUEIL-VOIX-20260829`

Dossier dans cette branche :
`SECURITE/ACCUEIL-VOIX-20260829/`

Il contient :
- `README.md` — explication du rail et de la doctrine ;
- `digiy-contact-global.js` — copie de sécurité du chargeur accueil après correction LA VOIX ;
- `sw.js` — copie de sécurité du PWA après bump `digiylyfe-pwa-20260829-voix`.

## Rail actif à respecter
`main` reste l’unique rail vivant.
LA VOIX n’est pas un module métier ni un second MASTER. Le vrai moteur LA VOIX vit dans le dépôt séparé `BEAUVILLE/pro-action-digiy` et s’ouvre via `https://pro-action-digiy.digiylyfe.com/`.

Doctrine : MAÎTRE TERRITOIRE → contexte pays/zone → MASTER métier unique → fiches/actions utiles. LA VOIX reste transverse : PAYS → ZONE → besoin → recherche → bonne porte.

Ne jamais recopier automatiquement les fichiers de sécurité vers le rail actif. Les utiliser uniquement comme référence ou restauration après contrôle humain.
