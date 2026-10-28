# ANNUAIRE DIGIY — Pilote gratuit V1 (28 octobre 2026)

## Décision
- Pas de nouveau service facturé ni de nouvelle base de données.
- La page `/annuaire.html` lit les entrées déjà publiques de `digiy_annuaire_public` en lecture seule.
- Classement alphabétique A → Z sur le nom de l'enseigne, sans `rank_weight` ni priorité liée au paiement.
- Filtres : recherche par nom / activité, pays disponible, ville / zone et métier, lettre A–Z.
- Contact WhatsApp direct si publié, sinon lien de présentation ou téléphone public existant.
- L'inscription **gratuite** n'est **pas** la Carte DIGIY (15 000 FCFA au Sénégal), ni la **Fiche professionnelle** (100 000 FCFA), ni l'adhésion (19 900 FCFA/mois).
- Aucun changement aux RLS, prix, abonnements, tables, fonctions Edge ni au site en production avant fusion.

## Inscription
1. Le professionnel remplit cinq champs et coche le consentement de publication.
2. Le navigateur ouvre WhatsApp du réseau DIGIY Sénégal (`+221 77 134 28 89`) avec un message préparé.
3. Le professionnel doit envoyer lui-même le message. Le navigateur ne stocke pas la demande en base et aucune publication n'est automatique.
4. L'équipe vérifie identité, activité, zone, numéro, consentement et doublons.
5. Après accord, un administrateur **autorisé** ajoute/active l'entrée dans le référentiel existant, en respectant les contrôles de propriété et d'abonnement. Ne jamais insérer un nouveau professionnel avec le mode visible par défaut sans validation préalable.
6. Correction ou retrait par demande au contact DIGIY.

## Tests avant fusion
- [ ] iPhone Safari / Chrome, Android : page et formulaire, contact WhatsApp, lien retour.
- [ ] A–Z : vérification avec accents, lettres, nombres, casse et égalité gratuit/payant.
- [ ] Filtres Saly, Mbour, Sénégal, Sarlat et métiers ; combinaison des filtres ; zéro résultat.
- [ ] Sur échec de connexion Supabase : message d'erreur, jamais de professionnel fictif.
- [ ] Les entrées inactives, privées ou dont les règles RLS interdisent la lecture restent absentes.
- [ ] Le formulaire ne crée jamais de ligne ni de compte, et n'affiche aucun numéro sans consentement.
- [ ] Vérifier le numéro WhatsApp de réception et la procédure de validation manuelle.
- [ ] Confirmer aucune régression des parcours Carte/Fiche/adhésion et des langues de la vitrine.
- [ ] Vérifier le quota de Supabase et les règles d'hébergement existantes.

## Pilotage commercial
50 inscriptions volontaires ciblées à Saly/Petite Côte, puis mesurer professionnels publiés, contacts qualifiés, demandes Carte DIGIY et adhésions payantes. Aucune promesse d'abonnement ou de résultat commercial n'est faite lors de l'inscription.

## Coût
Implémentation statique dans la vitrine GitHub existante, lecture de la base existante et passage des demandes par WhatsApp, sans nouvel abonnement requis. Le trafic réseau Supabase et l'hébergement restent soumis aux limites de la formule actuelle. Ne pas activer d'offre, add-on, facturation ou nouveau projet pour ce pilote.
