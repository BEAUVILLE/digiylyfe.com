# DIGIYLYFE · Standard retour vitrine depuis cartes et pages professionnelles
Date : 28 octobre 2026 · proposition pour validation

## Intention
Chaque **carte numérique / page publique du professionnel** doit permettre au visiteur de revenir vers la vitrine du réseau. Cela complète la découverte des professionnels par territoire et métier. Le professionnel reste la destination principale.

## Règle de navigation
- **QR principal de la carte** → adresse de ce professionnel exclusivement ; ne pas le remplacer par le site mère.
- **WhatsApp, appel, réservation, partage, accès propriétaire** → inchangés.
- **Lien secondaire visible, lisible sur téléphone :** « 🌍 Découvrir le réseau DIGIYLYFE → »
- **Destination exacte :** `https://digiylyfe.com/`, sans intermédiaire ni redirection rémunérée.
- Texte court possible pour des boutons étroits : « Réseau DIGIYLYFE » ; accessible name explicite.
- Sur une **image PNG/JPG imprimée**, une mention de domaine ne devient pas cliquable : on peut afficher `digiylyfe.com` mais le QR principal continue de pointer vers le professionnel. Éviter un second QR obligatoire qui pourrait brouiller le parcours.
- Recommandation de placement : bas de carte ou juste sous les actions de contact, **pas au-dessus du nom du professionnel**.
- Support des langues existantes par projet, notamment FR/EN et WORLD8 lorsqu'il existe ; ne pas effacer les traductions en place.

## Audit du 28 octobre 2026 : périmètre examiné
| Page / dépôt | État du retour vers la vitrine |
| --- | --- |
| Astou Boutique · `BEAUVILLE/astou-boutique` | Déjà présent, « RETOUR DIGIYLYFE » |
| Mbaye Diouf · `BEAUVILLE/mbaye-macon` | Déjà présent (« RETOUR DIGIYLYFE » et lien mère) |
| Kourant · `BEAUVILLE/kourant` | Déjà présent |
| Helage · `BEAUVILLE/helage-plombier` | Déjà présent |
| MANÉ & GNING · `BEAUVILLE/mane-gning` | Lien existant, libellé « Site » ambigu, correction proposée dans PR dédiée |
| Chez Baptiste Saly · `BEAUVILLE/chez-baptiste-astou-saly` | Absent ; ajout proposé en PR dédiée |
| DIGIY QR PRO · `BEAUVILLE/digiy-qr-pro` | Absent ; ajout proposé en PR dédiée (outil QR, pas une carte publique) |

## Vérifications avant fusion
- [ ] Sur iPhone et Android, les boutons sont bien visibles et activables.
- [ ] Le retour mène exactement à `https://digiylyfe.com/`.
- [ ] Le QR professionnel et ses liens publics ne changent pas.
- [ ] Les actions WhatsApp, partage, réservation, accès propriétaire restent opérationnelles.
- [ ] Les styles, la zone sûre mobile, le multilingue et la PWA ne régressent pas.
- [ ] Ne pas confondre ces corrections des pages numériques avec la modification des visuels de cartes JPG/PNG.
- [ ] Étendre l'audit aux autres pages/cartes du réseau avant de déclarer 100 % de couverture.

**Coût :** pas de service tiers, API ou abonnement supplémentaire lié à ces liens HTML.
