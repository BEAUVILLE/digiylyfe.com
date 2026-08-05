# DIGIYLYFE — AUDIT GLOBAL FINAL DES TARIFS MÉTIER

**Date : 18 juillet 2026**  
**Périmètre : DRIVER, LOC, RESA, MON RESTO, MON COMMERCE, MARKET, BUILD et EXPLORE**  
**Mode : lecture seule — aucun fichier posé n’a été modifié**

## Verdict

- **8 formulaires sur 8 validés**
- **Aucun P0**
- **Aucun P1 dans les formulaires d’inscription**
- **Un P1 transversal dans l’index tarifaire**
- **Aucune modification SQL, RPC ou RLS nécessaire à ce stade**

## Contrôles communs validés

Chaque formulaire respecte désormais les règles suivantes :

1. la grille métier d’origine est conservée ;
2. une seule formule de base peut être choisie ;
3. le logiciel métier est une option distincte ;
4. le logiciel reste désactivé tant qu’aucune base n’est choisie ;
5. retirer la base retire également le logiciel ;
6. le supplément logiciel est de **+8 000 FCFA / mois** au Sénégal ;
7. le supplément logiciel est de **+15 € / mois** en France ;
8. les totaux sont calculés par addition de la base et du logiciel ;
9. les options BOOST, RÉSEAU et FIRST restent séparées ;
10. le paiement et la preuve WhatsApp restent contrôlés ;
11. aucune activation automatique n’est introduite ;
12. aucun appel Supabase, RPC, `fetch`, insertion ou mise à jour SQL n’est présent dans ces formulaires ;
13. le JavaScript inline des huit fichiers passe `node --check`.

## Résultats par module

| Module | Formules validées | Logiciel | Verdict |
|---|---|---:|---|
| DRIVER | 1A Jakarta 5 500 FCFA · 1B Bus 12 000 / 35 € · 1C Driver 19 900 / 45 € | +8 000 / +15 € | ✅ |
| LOC | 2A 26 000 / 39 € · 2B 35 000 / 59 € · 2C 50 000 / 79 € · 2D 70 000 / 99 € · 2E 100 000 / 149 € | +8 000 / +15 € | ✅ |
| RESA | 3A 12 000 / 19 € · 3B 19 900 / 29 € · 3C 35 000 / 59 € | +8 000 / +15 € | ✅ |
| MON RESTO | Activation 19 900 FCFA / 30 € | +8 000 / +15 € | ✅ |
| MON COMMERCE | Code 5 19 900 / 29 € · Code 56 29 900 / 49 € | +8 000 / +15 € | ✅ |
| MARKET | M1 9 900 / 19 € · M2 19 900 / 29 € | +8 000 / +15 € | ✅ |
| BUILD | B1 19 900 / 29 € · B2 29 900 / 49 € · B3 45 000 / 69 € | +8 000 / +15 € | ✅ |
| EXPLORE | 8A 30 000 / 49 € · 8B 60 000 / 89 € · 8C 120 000 / 149 € · 8D 150 000 / 199 € | +8 000 / +15 € | ✅ |

## Totaux avec logiciel contrôlés

### DRIVER
- 1A : 13 500 FCFA
- 1B : 20 000 FCFA / 50 €
- 1C : 27 900 FCFA / 60 €

### LOC
- 2A : 34 000 FCFA / 54 €
- 2B : 43 000 FCFA / 74 €
- 2C : 58 000 FCFA / 94 €
- 2D : 78 000 FCFA / 114 €
- 2E : 108 000 FCFA / 164 €

### RESA
- 3A : 20 000 FCFA / 34 €
- 3B : 27 900 FCFA / 44 €
- 3C : 43 000 FCFA / 74 €

### MON RESTO
- 27 900 FCFA / 45 €

### MON COMMERCE
- Code 5 : 27 900 FCFA / 44 €
- Code 56 : 37 900 FCFA / 64 €

### MARKET
- M1 : 17 900 FCFA / 34 €
- M2 : 27 900 FCFA / 44 €

### BUILD
- B1 : 27 900 FCFA / 44 €
- B2 : 37 900 FCFA / 64 €
- B3 : 53 000 FCFA / 84 €

### EXPLORE
- 8A : 38 000 FCFA / 64 €
- 8B : 68 000 FCFA / 104 €
- 8C : 128 000 FCFA / 164 €
- 8D : 158 000 FCFA / 214 €

## P1 transversal restant — index tarifaire

L’index tarifaire conserve encore la mention :

> Tarif du logiciel en euros à confirmer.

Le contrôle local trouve cette chaîne **neuf fois** :

- huit affichages associés aux huit modules métier ;
- une occurrence dans le dictionnaire de traduction.

Cette mention contredit la décision désormais validée :

> Option logiciel métier France : **+15 € / mois**.

### Correction recommandée dans l’index uniquement

Pour chacun des huit modules métier :

- conserver `+8 000 FCFA / mois` pour le Sénégal ;
- afficher `+15 € / mois` pour la France ;
- supprimer toute mention « à confirmer » ;
- présenter l’option comme facultative ;
- ne pas modifier les prix de base ;
- idéalement afficher également le total France avec logiciel pour chaque formule.

Cette correction ne nécessite aucune modification des huit formulaires déjà posés.

## SQL / Supabase / RPC / RLS

**Aucune intervention SQL n’est nécessaire pour cette mission.**

Les formulaires audités :

- calculent les montants dans le navigateur ;
- préparent un message WhatsApp ou SMS ;
- peuvent conserver quelques informations en `localStorage` ;
- ne créent aucun abonnement dans Supabase ;
- n’appellent aucune RPC ;
- ne modifient aucune table ;
- ne changent aucune politique RLS.

Une adaptation de base de données ne deviendra nécessaire que si un futur parcours enregistre automatiquement les codes de formule et l’option `METIER`.

## Offres volontairement hors supplément logiciel

La règle `+8 000 FCFA / +15 €` ne doit pas être appliquée automatiquement à :

- PRO CARNET ;
- PRO JOBS ;
- NDIMBAL ;
- RÉSEAU ;
- FIRST ;
- BOOST.

Ces offres restent autonomes ou séparées selon leur propre grille.

## Conclusion

Les huit formulaires métier sont cohérents, calculables et prêts.  
La seule dette restante se trouve dans l’index tarifaire : **officialiser +15 € au lieu de “tarif euro à confirmer”**.

**Verdict final des formulaires : VERT.**  
**Verdict global avant correction de l’index : ORANGE LÉGER.**  
**Après correction de l’index : VERT COMPLET.**
