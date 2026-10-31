# ANNUAIRE DIGIY — V2 auto-inscription + départements (31 octobre 2026)

## Décision métier
- **Inscription volontaire gratuite et publication immédiate**, sans NINEA, contrôle administratif, validation manuelle préalable ni frais.
- **Départements thématiques d'activités** : commerce, bâtiment, artisanat, alimentation, beauté, mobilité, hébergement, tourisme, services, agriculture, autres. Métier précis en texte libre.
- Tri A → Z inchangé, **aucune priorité payante** ; recherche par nom, pays, zone, métier et département.
- Contact direct WhatsApp, 0 % commission, pas de paiement DIGIY.
- URL publique partageable : `https://digiylyfe.com/annuaire.html?fiche=<UUID>`.
- Lien privé d'autogestion : `https://digiylyfe.com/annuaire.html#gestion=<UUID>.<JETON>`. Ne jamais exposer le jeton dans la fiche publique.
- Correction/retrait immédiat avec jeton ; signalement par e-mail en cas d'abus.

## Architecture
- **Aucun nouveau projet Supabase, serveur VPS ou abonnement.**
- Nouvelle table spécialisée `digiy_annuaire_volontaires` dans **digiy-core** pour l'offre gratuite, indépendante de `digiy_annuaire_public` utilisée par les professionnels et le filtre d'adhésion. Ne pas changer leurs RLS ni leurs prix.
- L'ancienne base des professionnels reste **strictement en lecture seule**.
- Deux RPC `digiy_annuaire_inscrire` et `digiy_annuaire_gerer` avec paramètres contrôlés, clé publique anon seulement.
- Secret aléatoire de gestion, **SHA-256 en base** ; jamais de secret service_role côté navigateur.
- Lecture publique : uniquement champs publics des enregistrements actifs. Gestion : jeton requis, identité administrative non requise.
- Protections minimales : honeypot invisible, consentement obligatoire, tailles/format des champs, doublon nom + WhatsApp, quota souple par empreinte d'IP et signalement après publication.
- Les RPC sont `SECURITY DEFINER` **intentionnellement**, avec droits explicites `EXECUTE` limités et validation stricte. Vérifier les avis de sécurité Supabase après déploiement et ne pas étendre leurs permissions.
- Le quota IP est **best effort**, dépend de l'en-tête transmis par la passerelle et ne constitue pas une protection garantie contre une campagne de robots. Prévoir un défi anti-bot côté serveur seulement si une attaque est observée.

## Ordre de déploiement
1. **Avant fusion :** relire le SQL, les droits, la RLS et le formulaire. Exécuter `node scripts/verify-annuaire-auto.mjs` dans le dépôt. Ne pas créer de faux professionnels en production.
2. **Après GO de production :** sauvegarder le schéma puis appliquer `supabase/20261031_annuaire_volontaires.sql` sur **digiy-core**. Vérifier les politiques et exécutions des RPC.
3. Fusionner le site après le SQL. Le chargement des professionnels existants doit continuer si la nouvelle table est temporairement inaccessible.
4. Faire une inscription volontaire avec **consentement d'un testeur** (contact de test), vérifier URL publique, recherche, département et WhatsApp.
5. Tester la modification et le retrait par lien privé et le signalement. Supprimer/retirer la fiche test.
6. Tester Chrome iPhone, Safari iPhone, Android ; tester l'ouverture hors connexion des fiches déjà mises en cache, mais **l'inscription exige Internet**.
7. Confirmer la non-régression des modules payants, des filtres France/Sénégal et du classement A–Z.

## Tests de sécurité indispensables
- Requête `anon` impossible pour `INSERT/UPDATE/DELETE` directs sur les deux tables.
- Lecture `anon` impossible des colonnes `management_token_hash`, `admin_blocked`, `consent_public`, de la table des empreintes d'IP.
- `RPC` refuse l'absence de consentement, les champs vides/trop longs, les numéros invalides, les départements inconnus et les doublons.
- `RPC` de gestion refuse tout jeton incorrect et toute tentative sur fiche bloquée.
- Aucun nom, WhatsApp ou contact inventé lors d'une erreur réseau.
- Une fiche gratuite publiée ne modifie ni abonnement ni accès propriétaire d'une fiche payante.
- Examiner les avis de sécurité Supabase ; traiter les nouvelles alertes non attendues avant GO.

## Limites explicites
- Sans contrôle préalable, l'inscription peut être usurpée : traitement par signalement, blocage a posteriori.
- Si le propriétaire perd son lien secret, intervention manuelle nécessaire pour récupération d'accès. Ne pas envoyer ce lien à un tiers.
- Le pilotage par WhatsApp disparaît pour les nouvelles inscriptions ; seul le contact entre le public et le professionnel reste direct.
- Aucune fusion / mise en production réalisée par ce document seul.
