# DIGIYLYFE — Audit PWA du 15 octobre 2026

**Conclusion : deux PR correctives indépendantes, CI verte, aucune fusion. Stabilisation partielle vérifiée ; validation sur appareils et traversée réelle des sous-domaines restent ouvertes.**

Référence auditée : `BEAUVILLE/digiylyfe.com`, commit `1c974947727f125ee2785f4ba90b611fc11b95c7` (main après PR #83). L'inventaire porte sur cet instant précis, pas sur les fichiers ajoutés par l'audit.

## Périmètre et méthode

427 fichiers inventoriés et empreintés SHA-256 : 122 HTML, 122 JavaScript, 7 PDF, 43 workflows YAML, autres ressources et documents. Scan des mécanismes de navigation des 244 HTML/JS ; contrôle des destinations locales des liens HTML ; revue ciblée des points sensibles. Les autres fichiers sont inventoriés, **pas tous relus ou exécutés comme des parcours métier**. Les vidéos et images ne constituent pas des parcours de navigation autonomes.

- [Inventaire des 427 fichiers](inventaire-fichiers.csv) : fichier, taille, empreinte, couverture.
- [Inventaire des occurrences de navigation](inventaire-navigation.csv) : fichier, ligne, mécanisme, cible/expression, domaine, parcours, priorité de revue, statut.
- [Tableau des constats et corrections](tableau-audit.csv) : fichier, défaut, gravité, correction, test, statut, PR, limites.
- [Résultats bruts du premier essai des brochures](brochures-avant.json).
- Reproduction : `python3 scripts/audit_pwa_navigation.py` à la racine du dépôt ; `--ref SHA --out DOSSIER` pour un autre instant.

Le scan est une analyse statique conservatrice : les expressions JavaScript, chaînes HTML et affectations sont inventoriées mais pas toutes résolues. Les catégories se recoupent. Les événements, URL issus d'API, routes de dépôts voisins et actions privées ne sont pas couverts exhaustivement. Une occurrence n'est pas un bug.

## Inventaire réel

| Mécanisme | Occurrences | Interprétation |
|---|---:|---|
| `target=_blank` dans les balises HTML | 32 | Dont modèles d'atelier, liens externes et WhatsApp |
| Affectations JS `.target='_blank'` | 7 | Liens construits à l'exécution |
| `target=_blank` dans les chaînes/templates JS | 22 | Inclut signatures, recherche, favoris et atelier |
| `window.open` | 3 | WhatsApp/support et routeur multilingue |
| Liens HTML directs vers `.pdf` | 0 | Les 7 brochures passent par le lecteur |
| Références PDF dans les chaînes | 14 | 7 dans le lecteur + 7 contrôles de disponibilité |
| Iframes HTML | 6 | Lecteur, carte, test vocal et 3 outils atelier |
| Redirections JS | 60 | Inclut changements de langue et accès sécurisés |
| Redirections meta refresh | 7 | Réexamen sans JS à prévoir |
| Retour par historique | 1 | Navigation globale ; un lien Accueil existe aussi |
| Retour repéré par attribut / libellé | 73 / 48 | Catégories chevauchantes, pas 121 retours uniques |
| Affectations `.href` | 234 | Inclut aussi les redirections déjà comptées |
| Liens HTML hors origine | 143 | Inclut protocoles tel/mail/sms ; ne signifie pas 143 sous-domaines |
| Cibles HTML locales absentes | 0 | Ne valide ni les ancres ni les URL calculées |

Priorités : **P1** risque de blocage de parcours ; **P2** dégradation reproductible ou risque à tester ; **P3** code dormant/modèle/cas secondaire ; **Info** fonctionnement attendu. La gravité des constats confirmés figure dans le tableau dédié. Celle des occurrences est une priorité de revue, pas une affirmation de vulnérabilité.

## Brochures — toutes les pages rendues

Essai local Chromium 153, tactile, DPR 2, fenêtre 390 × 844. PDF réels du dépôt, même moteur PDF.js 3.11.174 fourni localement par interception du CDN. Vérification du nombre de canvas et de pixels non vides sur chaque page ; flèches précédent/suivant ; retour depuis le lecteur vers les outils. Le test CI répète ces scénarios dans Chromium et WebKit.

| Brochure | Fichier | Pages | Rendu de toutes les pages | Flèches | Retour outils |
|---|---|---:|---|---|---|
| LOC | loc.pdf | 2 | PASS | PASS | PASS |
| DRIVER | driver.pdf | 2 | PASS | PASS | PASS |
| COMMERCE | commerce.pdf | 1 | PASS | Désactivées correctement | PASS |
| CARNET | carnet.pdf | 2 | PASS | PASS | PASS |
| EXPLORE | explore.pdf | 2 | PASS | PASS | PASS |
| RESTO | resto-exemple.pdf | 1 | PASS | Désactivées correctement | PASS |
| BUILD | build-exemple.pdf | 1 | PASS | Désactivées correctement | PASS |

**11 pages au total.** Ce contrôle valide l'affichage et la navigation, pas l'exactitude éditoriale des brochures. Aucun PDF n'a été modifié. La disponibilité réelle du CDN et les performances réseau terrain ne sont pas établies par ces tests.

## Défauts confirmés et corrections

### PR #84 — lecteur des brochures

https://github.com/BEAUVILLE/digiylyfe.com/pull/84

Commit `48ae56ef31eafe44b893bccc77dd1e34e5f9b7ef`.

- **P2** : en 844 × 390, après défilement manuel à la page 2 de LOC, le compteur affiche 1 / 2. Le canvas mesure 820 × 1159 ; le seuil de visibilité de 50 % n'est jamais atteint. Correction : calcul de la page visible depuis la fenêtre disponible, indépendant de ce seuil.
- **P2** : bouton Suivante actif avant la création de la page 2 ; clic constaté : compteur 2 / 2, aucun canvas page 2, puis position inchangée. Correction : flèches activées après rendu complet. Test avec délai contrôlé sur la vraie page 2, sans substituer les données PDF.
- En-tête unique sticky à hauteur naturelle : les contrôles ne reposent plus sur des offsets fixes de 67/98 px. Test texte agrandi et petite largeur.
- Désactivation de `isEvalSupported` : mitigation documentée par Mozilla pour les anciennes versions. Le risque implique un PDF malveillant ; **aucun document malveillant ni exploitation constatés**. La liste des sept documents reste fermée. Ce n'est pas une mise à jour complète de PDF.js.
- CDN bloqué : repli natif encore disponible, flèches désactivées, message honnête, retour conservé. **La lecture multipage de l'iframe native sur iOS n'est pas validée.**

CI verte : [exécution brochures](https://github.com/BEAUVILLE/digiylyfe.com/actions/runs/38758146959), jobs Chromium + WebKit ; [garde PWA](https://github.com/BEAUVILLE/digiylyfe.com/actions/runs/38758147095). Tests locaux WORLD8/visibilité : 19/19.

### PR #85 — carte embarquée

https://github.com/BEAUVILLE/digiylyfe.com/pull/85

Commit `d249e51db744048222b82a2f014491ed8d1ee2e4`.

- **P1 navigation** : depuis `/carte/`, le retour du document enfant affiche l'accueil dans l'iframe ; la fenêtre principale reste `/carte/`. Test avant correction : échec de la navigation principale.
- Correction des trois liens d'accueil de `carte.index.html` avec `target=_top`, ajout d'un retour HTML dans `carte/index.html` indépendant de l'iframe.
- Tests : carte embarquée → accueil principal ; retour du conteneur ; carte seule → accueil ; préservation des destinations WhatsApp et téléphone. Aucun appel ni message émis.

CI verte : [exécution carte](https://github.com/BEAUVILLE/digiylyfe.com/actions/runs/38758605797), jobs Chromium + WebKit ; [garde PWA](https://github.com/BEAUVILLE/digiylyfe.com/actions/runs/38758605136).

## Autres parcours

Sur les vrais fichiers du dépôt servis localement, requêtes tierces bloquées et aucun accès API propriétaire :

- Accueil → espaces de gestion → chacune des 7 démonstrations → outils → accueil : PASS Chromium.
- Fiche publique PAP Piscine → accueil : PASS pour le lien ; chargement des données de la fiche non testé.
- Tarifs adhérents : les 2 liens de démonstration sont dans le même contexte (pas `_blank`). Destinations inventoriées : master-site-digiylyfe / demo-babacar-001 et astou-boutique. **Visite des destinations et retour réel non testés**.
- Ancienne URL tarifs LOC → tarifs LOC V2 : `country=sn` et `lang=en` conservés avec JavaScript. Aucun formulaire soumis.
- Accueil → module → fiche alimentée dynamiquement → retour : **non testé de bout en bout**, car les modules et les données sont externes au dépôt et le site réel est inaccessible ici.
- Liens WORLD8, contenu métier et accès sécurisés : aucun changement ; 19 tests Python existants passent. Pas de recette exhaustive des 8 langues sur appareil.

Le script `tests/pwa/public-routes.cjs` et sa CI dédiée rendent ces limites explicites : seuls les documents de ce dépôt sont servis ; aucune réponse métier simulée n'est injectée.

## PDF.js local — proposition, non déployée

Le lecteur utilise un script et un worker CDN 3.11.174, sans copie locale. L'indisponibilité de l'un peut ramener au lecteur natif. Copier simplement cette version dans le dépôt ne résout pas son ancienneté.

Proposition de PR séparée :

1. Choisir une version maintenue depuis les releases Mozilla, avec build `legacy` si nécessaire après définition du minimum iOS/Android supporté. La documentation consultée affiche 6.4.299 ; **compatibilité avec les appareils terrain non établie**, donc pas de bascule automatique dans cette mission.
2. Héberger script, worker assorti, licence Apache-2.0 et ressources nécessaires sous `/assets/vendor/pdfjs/<version>/`. Conserver SHA-256 et provenance. Aucun mélange de versions script/worker.
3. Adapter le chargement module, gérer explicitement l'échec, conserver la liste fixe des 7 PDF, les retours et la désactivation d'évaluation de code. Aucun paramètre `file=` arbitraire.
4. Premier lot sans modification du service worker : chargement same-origin, cache HTTP du navigateur, chemins versionnés. Ne pas promettre un mode hors ligne. Sur GitHub Pages, les en-têtes personnalisés ne doivent pas être supposés configurables ; vérifier les en-têtes effectivement servis. Si l'hébergement le permet, ressources vendor versionnées `max-age=31536000, immutable`, lecteur HTML revalidé, PDF revalidés ou URL versionnée par empreinte.
5. Lot SW éventuel distinct : cache **uniquement** du lecteur public, de la version vendor et des sept brochures, avec liste explicite et révision atomique. Jamais de pages Auth, jetons, réservations, API, données propriétaires ou cache générique des sous-domaines. Le SW de l'origine principale ne contrôle pas les autres origines.
6. Tests requis avant ce lot SW : première visite sans réseau, visite chaude sans réseau, CDN bloqué, PDF absent/corrompu, worker absent/version différente, mise à jour avec onglet ancien, cache partiellement rempli, quota/éviction, retour aux outils et restauration de la version précédente. Tests dédiés Chromium/WebKit puis vrais iPhone PWA/Android. La première visite hors ligne doit annoncer l'absence de document, pas rester bloquée.

Le `sw.js` actuel intercepte seulement les navigations GET same-origin, avec réseau `no-store`. Il ne précache ni HTML ni PDF : **l'ouverture hors ligne n'est pas garantie aujourd'hui**. Il reste inchangé, comme `carnet-master-test/sw.js` et les manifests.

Sources : [Mozilla, couches et installation](https://mozilla.github.io/pdf.js/getting_started/) ; [Mozilla, avis et mitigation isEvalSupported](https://github.com/mozilla/pdf.js/security/advisories/GHSA-wgrm-67xf-hhpq).

## Restant à vérifier et limites matérielles

Les tentatives d'accès à digiylyfe.com et aux domaines LOC, DRIVER, EXPLORE, démo Babacar et Astou ont renvoyé une page de 195 caractères « Site Unavailable » depuis cet environnement ; un HTTP 200 accompagné de cette page **n'est pas un succès du site**. Le navigateur distant confirme la même limite sur l'accueil. Ce constat ne permet pas de diagnostiquer une panne publique.

- Vrai iPhone installé en PWA : NON TESTÉ. Installation, fermeture/réouverture, bouton retour, sortie/retour WhatsApp, changement d'orientation, texte agrandi, pression mémoire : à faire.
- Vrai Android : NON TESTÉ.
- WebKit Linux en CI : PASS sur les tests définis ; **ce n'est pas Safari iOS installé**.
- Traversée réelle des sous-domaines, retour depuis les démos externes, documents CDN en réseau mobile lent : NON TESTÉ.
- Réservations, sessions, invitation propriétaire, données Supabase : volontairement non exercées ; aucune mutation.
- Templates atelier et scripts historiquement présents : inventoriés, pas publiés ni exécutés.
- Pas de promesse « zéro bug » ; l'inventaire statique n'est pas une preuve de non-régression de toutes les fonctions.

## Rollback et mise en ligne

Aucune PR fusionnée. Chaque PR est basée sur le même main et peut être acceptée ou refusée indépendamment. Après autorisation explicite seulement, recontrôler la CI du dernier commit avant fusion. Rollback par revert du commit de fusion de la PR concernée (ou du squash correspondant) ; réexécuter son workflow et le garde PWA. Les PDF, service workers, manifests et données restent identiques. Ne pas faire de reset forcé de main.
