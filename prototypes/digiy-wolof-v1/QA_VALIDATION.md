# DIGIY WOLOF V1 — grille de contrôle avant publication

### Étape A · Contrôle linguistique (BLOQUANT)
- [ ] Un locuteur natif à l'aise à l'écrit relit l'ensemble des 31 unités.
- [ ] Orthographe selon le décret de 2005; caractères `ë`, `ñ`, `ŋ`, accents et espaces.
- [ ] Sens exact des appels à l'action (PUBLIC, PROFESSIONNEL, LOC, Tarifs).
- [ ] Distinction entre carte digitale (paiement unique) et adhésion (cotisation annuelle).
- [ ] Traduction de « paiement direct » et « 0 % commission » sans ambiguïté.
- [ ] Relecture des termes « professionnel », « territoire », « hébergement », « artisan ».

### Étape B · Épreuve terrain (BLOQUANT)
- [ ] Tester la compréhension à voix haute auprès d'au moins trois métiers (commerce, chauffeur, artisan).
- [ ] Faire trouver un chauffeur ou un hébergement sans assistance.
- [ ] Faire identifier le prix carte seule et le prix de LOC sans confusion.
- [ ] Corriger les formulations régionales et noter les variantes acceptées.
- [ ] Conserver trace des modifications : ancienne, nouvelle, motif, validateur, date.

### Étape C · Validation technique
- [ ] Compatibilité écrans 320, 375, 390, 768 et 1280 px; pas de débordement horizontal.
- [ ] Les 8 langues actuelles restent pleinement utilisables.
- [ ] URLs et ancres identiques après traduction, en particulier `#territoires`.
- [ ] Les montants et devises correspondent aux pages tarifaires effectivement publiées au jour du lancement.
- [ ] Texte `lang="wo"` correct, direction `ltr`, UTF-8, focus clavier, étiquettes accessibles.
- [ ] Repli FR pour toute clé non traduite ; pas de contenu FR trompeusement signalé WO.
- [ ] Pas d'envoi de données, ni paiement, ni API ajoutée.
- [ ] Ne pas annoncer prise en charge du wolof vocal tant que LA VOIX n'a pas été testée.
- [ ] Vérifier liens sur iPhone/Android + navigation clavier ordinateur.

### Étape D · Décision
- [ ] Relecture terrain signée.
- [ ] Vérification de fidélité des prix et conditions.
- [ ] Feu vert explicite du fondateur.
- [ ] Nouvelle PR d'intégration dédiée ; jamais de fusion de la présente PR de préparation en guise d'activation.

## Correctifs préparatoires après audit WORK — 25 octobre 2026

- [x] Les 31 clés sont présentes dans le DOM de la maquette, dont les six auparavant absentes.
- [x] Le libellé hébergement `FANAN` est corrigé en `FANAAN` à titre de proposition orthographique ; le sens commercial reste à valider.
- [x] La recherche externe est signalée comme ne prenant pas WO en charge ; l'ancien libellé à microphone est affiché uniquement comme exemple **désactivé**.
- [x] Les coûts de démarrage sont explicités en français, avec `lang=fr` quand ils n'ont pas de traduction wolof validée : fiche générale France 250 €, adhésion 450 €/an ; LOC 100 000 FCFA ou 250 € en supplément à la première mise en place (fiche OU site, selon offre).
- [x] Les cinq liens Petite Côte incluent le périmètre `local=saly` du site.
- [x] Au chargement, les traductions sont rendues depuis le même objet de dictionnaire que la bascule (fin de triple copie HTML initial / JS / JSON). Fichier JSON demeure la source de relecture.
- [x] Ajustements CSS préventifs pour les petites largeurs (cartes en colonne, besoins en 2 colonnes, boutons adaptatifs). **Ne constitue pas un test visuel mesuré.**
- [ ] Relecture wolof natif + confirmation des mots métier/financiers.
- [ ] Vrais tests visuels 320/375/390/768/1280 et vrais appareils.
- [ ] Confirmer absence de confusion vocale auprès de testeurs WO.
- [ ] Vérifier et synchroniser automatiquement `wo-DRAFT.json` et l'objet `ui` à chaque modification ultérieure.
- [ ] Autorisation d'une PR distincte d'intégration. **NO-GO public maintenu.**
