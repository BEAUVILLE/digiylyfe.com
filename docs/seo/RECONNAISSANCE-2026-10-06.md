# Reconnaissance DIGIYLYFE — corrections et propositions du 6 octobre 2026

Base auditée : `5c6247dceaaed21d25afcab2fbf0ae48f137fb8d`.
PR ouverte pour contrôle avant fusion. Aucune demande d’indexation, aucune intervention sur le P0 conditionnel.

## Périmètre livré

- Métadonnées de l’accueil : définition territoriale dans title, description, OG, Twitter et description Organization. Les huit traductions et leur mise à jour JavaScript restent cohérentes ; les textes visibles ne sont pas réécrits.
- Paris/Miami : retrait de la carte gratuite, y compris dans les huit dictionnaires, les métadonnées concernées et les prix initiaux. Carte Paris 20 €, Miami 20 $, conformément à `CARD_PRICES` dans `tarifs-adherents-1.html`. Les CTA de carte pointent vers la section tarifaire existante du bon pays/de la bonne langue : l’ancienne page `carte-gratuite.html` affiche encore un prix fixe sénégalais. Aucun formulaire ni parcours propriétaire modifié.
- Aucun autre prix, offre métier, mois offerts ou abonnement modifié : ces éventuels écarts restent hors du périmètre validé de cette PR.
- Sitemap : ancienne redirection noindex retirée ; ajout de PAP, services terrain et tarifs LOC V2, toutes déjà en index,follow avec canonical propre dans le code. PAP est une fiche publique destinée à l’indexation ; aucune modification de son chargement ni de ses droits. Les autres fiches/modèles non vérifiés ne sont pas ajoutés automatiquement.
- Image sociale : restauration exacte de l’image complète du commit `eaefc03`, logo DIGIY existant. PNG 736 × 736, 194 101 octets ; nom historique `og-hub-1200x630.png` conservé pour limiter la modification. Ce nom ne décrit pas ses dimensions réelles. Version du lien OG/Twitter rafraîchie. Aucun fichier d’icône ou de manifeste PWA modifié.
- llms.txt : domaine officiel sans www, définition public/professionnels, Petite Côte/Dakar et statuts territoriaux explicites.

## WORLD8 — état exact des URL, sans demande d’indexation

**Il n’existe pas actuellement huit URL canoniques autonomes de l’accueil.** Il existe huit variantes de langue autorisées à l’indexation par leur balise robots, toutes consolidées vers la même canonical. L’indexation réellement retenue par Google et les statuts HTTP de production ne sont pas vérifiés : Search Console non connecté, contrôle HTTP direct non fiable lors de l’audit. La PR ne transforme pas cette observation en huit pages indexées.

| Langue | URL de langue actuelle | Canonical déclarée | hreflang | Robots HTML | Redirection dans le code |
|---|---|---|---|---|---|
| FR | https://digiylyfe.com/?lang=fr | https://digiylyfe.com/ | Aucun | index,follow | Aucune ; history.replaceState peut mettre à jour le paramètre |
| EN | https://digiylyfe.com/?lang=en | https://digiylyfe.com/ | Aucun | index,follow | Aucune |
| ES | https://digiylyfe.com/?lang=es | https://digiylyfe.com/ | Aucun | index,follow | Aucune |
| PT | https://digiylyfe.com/?lang=pt | https://digiylyfe.com/ | Aucun | index,follow | Aucune |
| IT | https://digiylyfe.com/?lang=it | https://digiylyfe.com/ | Aucun | index,follow | Aucune |
| DE | https://digiylyfe.com/?lang=de | https://digiylyfe.com/ | Aucun | index,follow | Aucune |
| NL | https://digiylyfe.com/?lang=nl | https://digiylyfe.com/ | Aucun | index,follow | Aucune |
| AR | https://digiylyfe.com/?lang=ar | https://digiylyfe.com/ | Aucun | index,follow | Aucune |

L’accueil `https://digiylyfe.com/` est index,follow, canonical sur lui-même, sans hreflang. Le HTML initial est français ; JavaScript choisit la langue à partir de l’URL, puis de la préférence locale. `history.replaceState` n’est pas une redirection HTTP.

Anciennes entrées linguistiques, toujours présentes dans le dépôt :

| URL historique | Robots | Canonical déclarée | hreflang | Destination de redirection |
|---|---|---|---|---|
| https://digiylyfe.com/en/ | noindex,follow | https://digiylyfe.com/?lang=en | Aucun | https://digiylyfe.com/?lang=en |
| https://digiylyfe.com/es/ | noindex,follow | https://digiylyfe.com/?lang=es | Aucun | https://digiylyfe.com/?lang=es |
| https://digiylyfe.com/pt/ | noindex,follow | https://digiylyfe.com/?lang=pt | Aucun | https://digiylyfe.com/?lang=pt |
| https://digiylyfe.com/it/ | noindex,follow | https://digiylyfe.com/?lang=it | Aucun | https://digiylyfe.com/?lang=it |
| https://digiylyfe.com/de/ | noindex,follow | https://digiylyfe.com/?lang=de | Aucun | https://digiylyfe.com/?lang=de |
| https://digiylyfe.com/nl/ | noindex,follow | https://digiylyfe.com/?lang=nl | Aucun | https://digiylyfe.com/?lang=nl |
| https://digiylyfe.com/ar/ | noindex,follow | https://digiylyfe.com/?lang=ar | Aucun | https://digiylyfe.com/?lang=ar |

Chaque redirection historique utilise meta refresh 0 et location.replace ; aucun statut 301/302 n’est revendiqué. Aucun `/fr/index.html` n’existe dans le dépôt. Les sept canonicals historiques pointent vers des variantes qui déclarent ensuite la racine : ce n’est pas un système hreflang autonome.

**Avant une éventuelle indexation multilingue :** décider séparément si chaque langue doit devenir une page canonique avec HTML traduit initial, hreflang réciproques et sélecteur de langue constitué de liens explorables. Aucune de ces modifications n’est faite ici. Ne pas envoyer huit demandes en supposant ce chantier déjà accompli.

## Petite Côte / Dordogne — proposition minimale, non implémentée

Conserver intégralement le moteur métier actuel. Créer deux petites portes HTML publiques à contenu initial spécifique, plutôt qu’une nouvelle logique de recherche :

| Page proposée, non créée | Canonical propre proposée | Contenu initial indispensable |
|---|---|---|
| `/petite-cote.html` | `https://digiylyfe.com/petite-cote.html` | Sénégal · Petite Côte · Saly/Ngaparou/Somone/Mbour ; besoins réellement couverts ; liens vers les fiches publiées, dont PAP après vérification de sa publication |
| `/vallee-dordogne.html` | `https://digiylyfe.com/vallee-dordogne.html` | France · Vallée de la Dordogne · Sarlat, zone pilote ; besoins et liens vers professionnels réellement publiés, distincts des exemples |

Chaque porte comprendrait, sans JavaScript : title, description, H1, introduction utile, pays/territoire/zones, liste courte de vrais professionnels et liens HTML directs ; WebPage/CollectionPage relié à `https://digiylyfe.com/#website`. Les prestations couvertes seraient décrites à partir des fiches actuelles, jamais inventées.

Un lien « Explorer les besoins et les zones » ouvrirait le moteur existant `territoire.html?zone=petite-cote` ou `territoire.html?zone=vallee-dordogne`. Les pages statiques resteraient informatives et les outils interactifs inchangés. Avant publication, prévoir la mise à jour ou le retrait des fiches statiques lorsqu’un professionnel change de statut.

Ces deux portes seraient ajoutées au sitemap et aux liens pays/accueil seulement dans une future PR validée. Pour limiter la duplication, conserver `territoire.html` comme hub/moteur ; n’attribuer les canonicals des variantes paramétrées aux nouvelles portes que si leur contenu est effectivement équivalent, après contrôle du rendu et de Search Console. Ne pas remplacer aveuglément toutes les variantes de recherche par une canonical commune.

Cette option fournit immédiatement une identité propre et un contenu lisible par les lecteurs sans JavaScript, sans déplacer LA VOIX, ni réécrire le moteur, ni toucher aux accès propriétaires. Aucun résultat d’indexation n’est garanti.

## Vérifications effectuées avant PR

- Compilation JavaScript de tous les scripts inline des trois pages modifiées ; JSON-LD analysé sans erreur.
- Exécution isolée des fonctions de langue FR/EN/ES/PT/IT/DE/NL/AR : titre, description, OG, Twitter et Organization cohérents ; CTA Paris/Miami vers pays/langue/section tarifaire attendus ; aucune promesse de carte gratuite dans les libellés testés.
- Comparaison des dictionnaires de l’accueil : seules les clés metaTitle/metaDescription changent. Liens de scripts, iframes et ressources PWA identiques.
- Blocs métier LOC et services de site Paris/Miami identiques à la base.
- Sitemap XML : 28 URL uniques, fichiers présents, aucune entrée en noindex ou meta refresh ; trois ajouts avec canonical propre. lastmod des ajouts issu de leur dernier commit, pas de date d’exploration inventée.
- Sept anciennes entrées linguistiques vérifiées : noindex,follow et redirections vers leurs paramètres respectifs ; aucune balise hreflang.
- Image restaurée inspectée visuellement ; décodage PNG complet 736 × 736 réussi.
- `git diff --check` sans erreur.

Limites : ces contrôles portent sur le code et sur l’exécution isolée des fonctions modifiées, pas sur un navigateur de production ni sur l’index Google. Aucun contrôle P0, aucune demande d’indexation et aucune fusion. Les demandes réseau externes et les parcours propriétaires n’ont pas été exécutés.
