# DIGIY WOLOF V1 — préparation indépendante

**Statut : brouillon non validé / aucune diffusion sur le site.**  
**Date : 25 octobre 2026 · Projet : DIGIYLYFE · pilote Sénégal.**

## Rôle du dossier
Fournir une base écrite pour relire avec des locuteurs wolof : la porte PUBLIC / PROFESSIONNEL / LOC, les cinq besoins métiers, les prix et quelques accroches de navigation. Cette branche ne modifie **aucun** fichier de production : ni `index.html`, ni scripts, ni moteurs, ni Supabase. La V1 est un **prototype indépendant**.

## Périmètre
- Langue ciblée : wolof **`wo`**, alphabet latin sénégalais; encodage UTF-8, direction `ltr` (gauche→droite).
- Sources de vérité pour les prix : `index.html`, `tarifs-adherents-1.html`, `tarifs-loc-v2.html` dans `main` lors de la préparation.
- Carte digitale : France **20 €**, Sénégal **15 000 FCFA**, États-Unis **20 $** (paiement unique).
- Adhésion écosystème France : **450 €/an**.
- DIGIY LOC : Sénégal **1 unité = 21 000 FCFA/mois**, **2–3 unités = 28 000 FCFA/mois** ; Europe **1–3 unités = 75 €/mois**. Ces valeurs viennent du simulateur de tarifs actuel, et non d'une estimation.
- Les **huit langues actuelles** restent en place ; l'ajout potentiel de WO serait la neuvième langue de l'interface après validation. Aucun changement d'URL, d'indexation ni de routing à ce stade.

## Livrables
- `wo-DRAFT.json` : 31 clés de l'accueil, avec version française, **proposition wolof**, note de relecture et statut **A_VALIDER**.
- `prototype.html` : aperçu bilingue FR/WO autonome, conçu pour smartphone, sans API, sans déploiement, avec les liens de démonstration existants.
- `QA_VALIDATION.md` : protocole de validation linguistique, tarifaire, technique et sécurité.

## Norme orthographique à respecter
La référence est le **décret sénégalais n° 2005-992 du 21 octobre 2005** sur l’orthographe et la séparation des mots en wolof (Journal officiel du Sénégal n° 6280 du 27 mai 2006). Veiller à `ë`, `ñ`, `ŋ`, consonnes longues et accents, et à la lisibilité sur Android/iPhone.
Sources :
- https://www.vie-publique.sn/documents/14178/JO-6280-du-27-mai-2006
- https://www.au-senegal.com/comment-ecrire-correctement-le-wolof,16261.html

## Décision de publication (bloquée)
Ne pas publier la traduction provisoire. Faire relire les **31 unités** par au moins un locuteur de wolof compétent à l'écrit, puis tester les boutons et tarifs avec deux ou trois professionnels sur le terrain (commerçant, chauffeur, artisan). **Feu vert explicite du fondateur** requis avant toute création de sélection `WO` sur le site réel.

## Architecture de l'évolution après validation
1. Conserver l'actuel moteur WORLD8, ne pas modifier la recherche vocale.
2. Mapper les clés validées vers le dictionnaire `TEXT.wo` et `DIGIY_PUBLIC_V1.wo`, avec repli FR pour les clés absentes.
3. Afficher un choix `WO` sur l’accueil après QA, puis étendre aux parcours tarifs/territoires.
4. Ne jamais laisser penser que **LA VOIX comprend le wolof** tant qu'un test complet de compréhension et de restitution ne l'atteste pas.
5. Audio V2 possible, avec enregistrement humain et validation locale, séparé de cette V1 écrite.

## Invariants DIGIY
Contact direct / paiement direct / 0 % commission. Pas de changement des engagements financiers, des liens, des permissions ou des données clients.

## Suite de l'audit WORK du 25/10/2026
Corrections appliquées au brouillon uniquement : 31 champs affichables, micro wolof désactivé, informations tarifaires initiales précisées, graphie FANAAN, URLs Saly, premier rendu WO et CSS mobile préventif. Les conditions financières et notices non encore traduites sont explicites en français (`lang=fr`). Aucun test visuel réel ni validation native effectués, la V1 **reste NO-GO**. La PR #115 traite indépendamment le doublon LOC public et les copies France/USA ; ne pas fusionner la PR #114 pour activer WO.
