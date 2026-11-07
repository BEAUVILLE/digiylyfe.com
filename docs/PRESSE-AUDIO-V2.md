# DIGIYLYFE — Bloc Presse Audio V2
État : PR d'intégration, **ne pas confondre avec un MP3 publié**.

## Source et emplacement
- Visuels originaux fournis par le porteur du projet le 07/11/2026, stockés à l'identique sous assets/presse.
- Bloc ajouté sur index.html immédiatement avant la vidéo Saly, après la signature « Là est le trésor ».
- Transcription identique à la maquette V2 validée.
- Lecture volontaire, aucune lecture automatique, aucun appel API payant.
- Le cache et les accès métiers, les traductions existantes et les parcours de la vitrine restent inchangés.

## Dépendance audio non fournie
Le MP3 final validé sur le Studio Mac doit être ajouté sous :
`assets/presse/digiy-presse-fr.mp3`.

En attendant, le navigateur affiche un message explicite et la transcription,
et **masque le lecteur**. Le contrôle HEAD révèle le lecteur dès que le fichier
MP3 est publié. Ne jamais utiliser un audio de démonstration en remplacement.

## Contrôle avant fusion
- [ ] MP3 exact Thomas / Amélie reçu, ajouté et écouté entièrement.
- [ ] Tester l'écoute Safari iPhone + Chrome Mac, sans autoplay.
- [ ] Scanner QR du médaillon sur un téléphone (source d'origine en http).
- [ ] Tester lang=fr, wo, zh et l'ordre des sections sur téléphone.
- [ ] Vérifier liens et méthodes, vidéos Saly et toutes les portes existantes.
- [ ] Confirmer que « 100 % indépendance » sur le médaillon signifie l'autonomie commerciale, non l'indépendance technique absolue.
- [ ] Vérifier CI GitHub Pages avant merge.

## Doctrines
MASTER CORE et AGENTS.md lus dans BEAUVILLE/digiy-master.
Aucune modification SQL, Supabase, tarifs, RLS ou création de nouveau module.

**Important : aucune mise en production automatique.**
