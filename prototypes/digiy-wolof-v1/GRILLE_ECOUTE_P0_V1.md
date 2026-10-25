# DIGIY WOLOF V1 — grille d’écoute comparative · P0

**Document privé de test · 25 octobre 2026 · PR #114 · NO-GO publication**  
**Origine des textes :** `wo-DRAFT.json` sur `prototype/digiy-wolof-v1-20261025`, repris **sans modification** ci-dessous. Le fondateur annonce une validation par un instituteur ; conserver cette validation comme référence sans prétendre qu'elle constitue un test de voix ou un test de compréhension terrain.

## Décision expérimentale

Tester **deux à trois voix** sur **les sept textes P0 prioritaires** (n° 7, 8, 10, 14, 23, 25, 27). **Ne produire aucune voix commerciale sans autorisation ni contrôle de licence et de sens.**

**Candidats :**
- A — **personne réelle** lisant le wolof avec son consentement écrit pour l'enregistrement et le périmètre d'utilisation. Voix témoin, aucun clonage.
- B — **ADIA_TTS** (CONCREE), modèle affichant **Apache-2.0** sur Hugging Face (contrôle de la licence, du modèle et des dépendances avant usage).
- C — **Oolel-Voices**, modèle affichant **AGPL-3.0** (vérifier implications de la licence, provenance des poids, dépendances, droits sur les extraits de voix, et conditions d'exploitation). **Clonage exclu** sans accord spécifique documenté.

Les labels A/B/C sont **références internes**. Pour chaque clip testé, présenter dans un ordre aléatoire `VOIX 1`, `VOIX 2`, `VOIX 3`, sans annoncer quelle technologie lit.

**Sources modèles à re-vérifier au moment de la génération :**
- https://huggingface.co/CONCREE/Adia_TTS (licence affichée : Apache-2.0, consultée le 25/10/2026)
- https://huggingface.co/Laurentmd5/Oolel-Voices (licence affichée : AGPL-3.0, consultée le 25/10/2026)

## Sept formulations P0 à lire et à écouter

**Important :** n° **14** est **entièrement français** actuellement, n° **10** est **mixte FR/WO**, et n° **25** comporte « commission » en français. Ne pas faire passer ces clips pour une lecture WO intégrale. **Les tests de voix WO n° 10/14 sont en attente** d'une formulation complète relue avec l'instituteur, sans changer la copie approuvée automatiquement.

| Ligne et clé | Texte actuel (inchangé) | Statut audio | Question ouverte de compréhension |
|---|---|---|---|
| 7 · `entryProKicker` | KI AM LIGGÉEY | WO à tester | Selon vous, qui est concerné par cette porte ? Donnez un exemple. |
| 8 · `entryProTitle` | Dama am sama liggéey | WO à tester | De qui parle ce message et qu'irait faire cette personne sur le site ? |
| 10 · `entryProMembership` | 🇫🇷 ADHÉSION ÉCOSYSTÈME · 450 € / AT | MIXTE FR/WO — test de compréhension seulement | À quoi correspond ce prix ? À quelle fréquence est-il demandé ? |
| 14 · `entryLocPrice` | Sénégal : 1 unité = 21 000 FCFA / mois · 2–3 unités = 28 000 FCFA / mois. Europe : 1–3 unités = 75 € / mois. | FR SEUL — AUDIO WO BLOQUÉ | Que comprenez-vous des trois montants et du nombre de logements ? |
| 23 · `v1SearchCta` | Wax walla bind li ma soxla → | WO à tester — libellé inactif | Avec ces mots, que pensez-vous pouvoir faire ? Dans quelle langue ? |
| 25 · `v1Principle` | Jokkoo ak fayyante ci sa bopp · 0 % commission DIGIYLYFE | MIXTE WO/FR — attention commission | Expliquez avec vos mots le rôle de la plateforme dans le contact et le règlement. |
| 27 · `worldLead` | Benn CORE. Gox yu wuute. Ki liggéey ci sa gox la des. | WO à tester | Racontez avec vos mots ce que signifie cette phrase. |

## Fiche de notation à dupliquer par testeur

**Code de testeur anonyme :** ________  **Lieu :** Saly / Mbour / autre : ________  
**Profil :** ☐ commerçante ☐ chauffeur ☐ artisan ☐ autre : ________  **Tranche d'âge :** ________  
**Modalité :** ☐ écoute seule ☐ texte affiché + écoute  **Consentement au recueil des avis :** ☐ oui ☐ non

Pour chaque **ligne**, noter **une première écoute sans voir les choix de voix ni recevoir une traduction française**. Poser ensuite la question ouverte et noter les mots exacts. La personne n'est pas évaluée ; c'est la formulation et l'enregistrement qui sont testés.

| Ligne P0 | Clip anonyme écouté | Compréhension spontanée (verbatim) | Fidèle au sens ? | Prononciation claire (1–5) | Débit naturel (1–5) | Mots ou chiffres mal compris |
|---:|---|---|---|---:|---:|---|
| 7 | ______ | ______ | ☐ Oui ☐ Non ☐ Incertain | __ | __ | ______ |
| 8 | ______ | ______ | ☐ Oui ☐ Non ☐ Incertain | __ | __ | ______ |
| 10 | **En attente de WO complet** | ______ | ☐ Oui ☐ Non ☐ Incertain | __ | __ | ______ |
| 14 | **Bloqué : FR seul** | ______ | ☐ Oui ☐ Non ☐ Incertain | __ | __ | ______ |
| 23 | ______ | ______ | ☐ Oui ☐ Non ☐ Incertain | __ | __ | ______ |
| 25 | ______ | ______ | ☐ Oui ☐ Non ☐ Incertain | __ | __ | ______ |
| 27 | ______ | ______ | ☐ Oui ☐ Non ☐ Incertain | __ | __ | ______ |

Pour comparer **les trois voix**, dupliquer une ligne de notation par extrait et faire varier l'ordre d'écoute. Noter l'ordre dans un document interne distinct ; ne pas montrer la correspondance avant les réponses.

**Après les trois écoutes d'une même phrase :** « Quel extrait était le plus facile à comprendre ? Qu'avez-vous compris exactement ? ». Éviter « c'est bien ? », « cette voix est meilleure, non ? » ou d'autres questions suggestives.

## Points de contrôle prioritaires

1. **Sens métier :** le professionnel indépendant est-il identifié avec exactitude sur #7/#8, sans le rabattre sur « salarié » ?
2. **Engagements :** sur #25, le client paie-t-il directement le professionnel, avec **0 % commission** pour DIGIYLYFE ?
3. **Territoire :** sur #27, compréhension « professionnel local » sans détour de sens.
4. **Voix :** sur #23, éviter la croyance que **LA VOIX reconnaît le wolof**. Aucun bouton micro fonctionnel pendant l'essai.
5. **Tarifs et nombres :** test séparé des **15 000 FCFA** de la carte, **450 €/an**, **21 000 / 28 000 FCFA/mois** et frais de création — après formulation en wolof validée. Contrôler la lecture des nombres, la périodicité, le total initial, sans multiplier le palier par unité.
6. **Français résiduel :** si un candidat lit un segment français, noter la bascule de langue et la compréhension, sans l'étiqueter « tout wolof ».

## Méthode et décision

- Départ : **trois personnes minimum**, idéalement une commerçante, un chauffeur et un artisan ; inclure si possible un participant plus âgé et des niveaux variés de lecture du wolof latin.
- Épreuve 1, **écoute seule** ; épreuve 2, **lecture + écoute** sur téléphone. Conserver les réponses séparées, ne pas assimiler lecture fluide et compréhension.
- **Relecteur linguistique :** l'instituteur arbitre les prononciations, l'accentuation, les termes techniques et les nombres. Aucune correction silencieuse par le synthétiseur.
- **Matériel :** extraits fixes (préférer `wav` pour contrôle, puis `mp3`/`m4a` ou `opus` adaptés aux téléphones). Une phrase = un fichier ; versions, hachages, textes et droits documentés.
- **Noms internes :** `wo-p0-07-human-v1.wav`, `wo-p0-07-adia-v1.wav`, `wo-p0-07-oolel-v1.wav` (ne pas utiliser de vraies pistes tant qu'elles ne sont pas générées et approuvées). Pour l'écoute aveugle, renommer temporairement `clip-07-1`, `clip-07-2`, etc. et conserver la table de correspondance.
- **Score :** priorité au sens **reformulé librement** ; les notes 1–5 sur le naturel ne sont qu'un complément. Noter erreurs, notamment les chiffres et les prononciations qui dénaturent une offre.
- **Seuil de publication :** **aucun seuil chiffré inventé**. Pas d'audio public sans compréhension jugée suffisante par l'instituteur et les personnes testées, validation des licences et autorisation explicite du fondateur.
- **Architecture :** fichiers fixes et simple contrôle `<audio>`/bouton « Écouter » après validation. Pas de génération à chaque visite, pas de coût variable par écoute, pas d'API ni de nouvelles permissions. Le bouton **écoute** n'active jamais la reconnaissance vocale wolof (STT).

## Résultat à saisir (après essai réel)

| Phrase | Voix la plus claire | Mots incompris | Erreurs de chiffres | Statut | Décision de l'instituteur |
|---|---|---|---|---|---|
| 7 | — | — | — | À tester | — |
| 8 | — | — | — | À tester | — |
| 10 | — | — | — | WO complet requis | — |
| 14 | — | — | — | WO complet requis | — |
| 23 | — | — | — | À tester (sans micro) | — |
| 25 | — | — | — | À tester (mixte) | — |
| 27 | — | — | — | À tester | — |

**NO-GO public maintenu.** Cette fiche n'atteste ni de la création d'un audio, ni de l'écoute effective d'un modèle IA, ni d'un droit commercial confirmé pour tous ses composants.
