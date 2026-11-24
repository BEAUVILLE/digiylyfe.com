# DIGIY SIGNAL V1 — pilote statique

Objectif : cinq empreintes de cartes déjà publiques, lisibles sans JavaScript ni appel à Supabase. Aucun média copié, numéro de téléphone, tarif, disponibilité, statut payant, compte client, API ou nouveau serveur. L'index référence les cartes canoniques ; la relation passe par la source existante. Aucun moteur n'est tenu de lire le JSON.

Le pilote est en français. Il n'ajoute aucune interface multilingue ; les traductions viendront uniquement après validation de l'utilité. Les fiches dynamiques sont exclues, notamment PAP Piscine : leurs droits et leur publication ne doivent pas être contournés par un instantané.

## Maintenance avant publication

Vérifier que chaque professionnel accepte cette redistribution et que la carte est toujours publique. Les cinq sources sont épinglées par SHA Git. En cas de modification, suppression ou retrait de consentement, revoir les champs et la référence SHA ou retirer l'entrée puis exécuter `python3 scripts/verify-digiy-signal-v1.py --write`. En cas de retrait, publier la suppression rapidement et demander aux moteurs concernés de mettre à jour leurs copies si nécessaire ; les copies tierces ne sont pas maîtrisables. Ne jamais ajouter une fiche privée à la liste. La CI échoue si une source change sans revue. Le contrôle des SHA ne détecte pas les retraits en dehors du dépôt ni les modifications des pages liées.

## Vérification

`python3 scripts/verify-digiy-signal-v1.py`

Avant fusion : contrôle des cinq sources et accord de publication, vérification CI. Après déploiement : HTTP 200 et JSON valide sur les six URL, moins de 5 kB chacune, aucune requête Supabase déclenchée par la seule lecture JSON. Tester manuellement des questions FR sur plusieurs IA avec vérification des citations, de la zone, du métier et du lien. Ne pas confondre présence du fichier et indexation effective.

Critère de poursuite : au moins une découverte correctement attribuée et mesurable, sans charge métier additionnelle. Si aucune utilité mesurée, garder le pilote limité ou le retirer. Pas de fusion ou déploiement automatique.
