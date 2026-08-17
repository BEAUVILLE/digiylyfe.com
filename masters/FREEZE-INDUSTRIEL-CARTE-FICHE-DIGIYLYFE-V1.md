# FREEZE INDUSTRIEL — CARTE + FICHE DIGIYLYFE

**Version :** V1  
**Date de gel :** 17 août 2026  
**Statut :** GELÉ / PRÊT TERRAIN  
**Périmètre :** atelier CARTE + FICHE DIGIYLYFE

## 1. Décision

La chaîne industrielle **CARTE + FICHE DIGIYLYFE est déclarée terminée et gelée**.

À partir de ce point, elle ne doit plus être réouverte pour des améliorations de confort, des variantes esthétiques, des idées de dernière minute ou des ajouts fonctionnels non indispensables.

**Règle : hors bug réel, défaut de sécurité, rupture de compatibilité ou décision explicite du fondateur, on ne touche plus à cette architecture.**

## 2. Architecture officielle gelée

```text
1 ADHÉRENT
    ↓
1 DOSSIER CENTRAL SUPABASE
    ↓
1 SOURCE UNIQUE V1-UNIFIE
    ↓
CHOIX HUMAIN DU MASTER
    ↓
┌──────────────────────┬──────────────────────┐
│ GÉNÉRATEUR CARTE     │ GÉNÉRATEUR FICHE     │
│ 4 MASTERS            │ 4 MASTERS            │
└──────────────────────┴──────────────────────┘
    ↓
8 LANGUES
FR · EN · ES · PT · IT · DE · NL · AR
    ↓
VALIDATION HUMAINE
    ↓
PUBLICATION
```

## 3. Source unique officielle

Fichier canonique :

`MODELE-DONNEES-MASTER-DIGIYLYFE-V1-UNIFIE.json`

Principe intangible :

> **Une personne / entreprise = un dossier adhérent = une source de données.**

La Carte et la Fiche sont deux lecteurs du même dossier. Elles ne doivent pas recréer une seconde identité métier ni imposer une deuxième saisie complète.

## 4. Générateur Carte officiel

Seul générateur Carte officiel :

`GENERATEUR-ATELIER-CARTE-DIGIYLYFE-V2-4-MASTERS.html`

L'ancien générateur Carte V1 a été retiré.

Les 4 Masters Carte officiels sont :

1. `MASTER-CARTE-SERVICE-ARTISAN-INDUSTRIEL-V3-8-LANGUES.html`
2. `MASTER-CARTE-COMMERCE-INDUSTRIEL-V1-8-LANGUES.html`
3. `MASTER-CARTE-LIEU-TOURISME-INDUSTRIEL-V1-8-LANGUES.html`
4. `MASTER-CARTE-BEAUTE-RESTAURATION-ACTIVITE-VISUELLE-INDUSTRIEL-V1-8-LANGUES.html`

Les différences métier sont volontaires :

- Service / Artisan → services
- Commerce → produits
- Lieu / Tourisme → atouts / caractéristiques
- Beauté / Restauration / Activité visuelle → prestations / offres

**Carte : une seule photo principale.**

## 5. Générateur Fiche officiel

Seul générateur Fiche officiel :

`GENERATEUR-ATELIER-FICHE-DIGIYLYFE-V1.html`

Les 4 Masters Fiche officiels sont :

1. `MASTER-FICHE-SERVICE-ARTISAN-V1-TEST.html`
2. `MASTER-FICHE-COMMERCE-V1-TEST.html`
3. `MASTER-FICHE-LIEU-TOURISME-V1-TEST.html`
4. `MASTER-FICHE-BEAUTE-RESTAURATION-ACTIVITE-VISUELLE-V1-TEST.html`

**Fiche : deux photos maximum.**

Une photo principale + une photo secondaire facultative.

La Fiche ne contient pas de vidéo, audio, galerie lourde ou catalogue riche. Ces contenus appartiennent au SITE éventuel.

## 6. Pont Supabase officiel

Edge Function :

`digiy-adhesion-card-bridge`

Le bridge conserve les verrous suivants :

- authentification obligatoire ;
- accès atelier / admin ;
- dossier adhérent existant ;
- paiement confirmé ;
- carte validée ;
- dossier validé ;
- pour une Fiche : prestation Fiche acceptée / en cours / livrée ;
- `master_type` choisi par l'humain ;
- transformation vers `V1-UNIFIE` ;
- aucune création automatique d'un second dossier.

## 7. Verrous de publication

Une publication publique doit rester impossible si l'un des points suivants échoue :

- validation humaine absente ;
- une langue reste `_a_valider:true` ;
- un des 4 éléments métier requis manque ;
- photo principale temporaire Supabase ;
- URL publique requise invalide ;
- QR requis invalide ;
- dossier central non validé ;
- Fiche demandée mais prestation non autorisée.

L'arabe reste en RTL.

## 8. Doctrine commerciale et produit conservée

- contact direct ;
- paiement direct ;
- 0 % commission DIGIYLYFE ;
- DIGIYLYFE publie une présence numérique, ne certifie pas la conformité administrative du professionnel ;
- la mention publique reste **Adhérent**, sans certification implicite ;
- aucun Espace Pro, logiciel ou moteur métier n'est inclus par défaut dans l'adhésion ;
- le SITE éventuel reste hors du périmètre industriel Carte + Fiche gelé ici.

## 9. Test de référence — BORNE 5

Le test blanc de référence a traversé :

```text
ADHÉSION
→ DOSSIER UNIQUE
→ VALIDATION
→ V1-UNIFIE
→ MASTER VISUEL
→ CARTE
→ QR
→ FICHE
→ 8 LANGUES
→ VALIDATION HUMAINE
→ PUBLICATION
```

Les chemins invalides ont été vérifiés comme bloqués :

- dossier non validé ;
- prestation Fiche non acceptée ;
- langue non validée ;
- photo temporaire ;
- absence de validation humaine.

Le test n'a créé aucun faux dossier de production.

## 10. Conditions de réouverture du freeze

Le freeze peut être rouvert uniquement pour :

1. bug réel et reproductible ;
2. défaut de sécurité ;
3. rupture de compatibilité navigateur / Supabase / GitHub ;
4. erreur de donnée ou de publication empêchant le travail terrain ;
5. obligation technique ou réglementaire applicable à DIGIYLYFE ;
6. décision explicite du fondateur de faire évoluer l'architecture.

Ne sont pas des motifs suffisants :

- « on pourrait ajouter… » ;
- changement esthétique non nécessaire ;
- duplication d'un générateur ;
- ajout d'un moteur métier dans l'adhésion ;
- ajout de vidéo/audio à la Fiche ;
- augmentation du nombre de photos de la Fiche ;
- changement automatique du Master sans validation humaine.

## 11. Procédure obligatoire si le freeze est rouvert

1. travailler d'abord sur une copie / test ;
2. une modification précise à la fois ;
3. ne jamais inventer texte, tarif, contact ou média ;
4. conserver le dossier unique ;
5. conserver la source unique ;
6. refaire les verrous concernés du test BORNE 5 ;
7. validation humaine avant publication ;
8. push GitHub uniquement sur le périmètre explicitement autorisé ;
9. vérifier le commit et les fichiers touchés.

---

# DÉCISION FINALE

**CARTE + FICHE DIGIYLYFE = FREEZE INDUSTRIEL V1.**

La prochaine phase n'est plus la construction de l'atelier.

**La prochaine phase est le TERRAIN.**

> Humain au volant. IA dans l'atelier. Le professionnel garde la main.
