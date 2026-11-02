# Fiches DIGIYLYFE — WO et chinois simplifié (proposition)

## Constat au 2 novembre 2026

Les quatre modèles de fiches de l’atelier et le générateur proposent initialement huit langues : **FR, EN, ES, PT, IT, DE, NL, AR** — soit le français et sept traductions.

Les fiches effectivement publiées peuvent être des sites indépendants (par exemple Helage, Kourant, Mbaye Diouf, Chez Baptiste). Modifier l’atelier **ne modifie pas rétroactivement leurs sites**.

## Ce que prépare cette branche

- Dix champs linguistiques dans le générateur : les huit existants + **WO** (wolof écrit) + **中文** (chinois simplifié ; URL `lang=zh`, HTML `lang=zh-CN`).
- Aucun bouton ajouté pour une langue dont les quatre textes principaux sont absents. Sur les fiches de services/prestations, les quatre services doivent également être disponibles.
- Export de fiche publique bloqué tant que les dix contenus ne sont pas renseignés et validés humainement.
- Le copier-coller intégral du français vers WO/中文 n’est pas considéré comme une traduction recevable.
- Aucune API, paiement, base de données ou service ajouté.

## Mise à jour des fiches publiées

Chaque site/fiche doit être traité dans **son dépôt réel** : récupérer son contenu métier approuvé et ses contacts existants ; traduire les vrais textes de la fiche (ne pas inventer de services ou de tarifs) ; relire WO par un locuteur wolof et 中文 par un locuteur chinois ; vérifier tous les liens WhatsApp, appel, QR, retour vitrine ; tester la mise en page mobile et les bascules de langues.

**Aucune fiche publiée n’est modifiée par cette branche.** La validation humaine et les tests sont obligatoires avant chaque déploiement.
