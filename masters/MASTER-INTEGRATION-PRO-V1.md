# MASTER D'INTEGRATION PRO — V1

Statut : patron operationnel DIGIYLYFE
Principe : Humain au volant. IA dans l'atelier. Le professionnel garde la main.

## OBJECTIF

Integrer un professionnel sans reinventer l'architecture.

Entree minimale :
- identite / activite ;
- territoire public confirme ;
- telephone / WhatsApp public ;
- media valide ;
- choix humain du parcours : CARTE SEULE ou CARTE + FICHE ;
- email proprietaire conserve prive sauf demande explicite de publication.

Sortie :
- presence publique ;
- bon module metier ;
- bon territoire ;
- contact direct ;
- trouvable par LA VOIX ;
- controles publication verts.

## REGLE ZERO

Avant toute modification :
1. rechercher le professionnel par nom, telephone et email proprietaire dans les sources existantes ;
2. reutiliser le dossier existant ;
3. ne jamais creer une seconde identite ou un second dossier ;
4. ne jamais inventer texte, tarif, contact, media, territoire ou service.

## PARCOURS A — CARTE SEULE

1. Valider les donnees source.
2. Produire ou reutiliser la carte digitale officielle.
3. Classer humainement le professionnel dans le module adapte.
4. Raccorder la carte au territoire confirme.
5. Raccorder l'annuaire public.
6. Raccorder LA VOIX avec les mots terrain strictement issus de l'activite validee.
7. Ne creer aucune fiche professionnelle.
8. Garder l'email proprietaire hors du public.
9. Verifier le contact direct.
10. Passer les controles de publication.

Cas de reference : Cainack DIOUF — Golf — Saly — EXPLORE.

## PARCOURS B — CARTE + FICHE

1. Executer toutes les etapes du parcours CARTE SEULE.
2. Verifier que le dossier autorise une fiche.
3. Choisir humainement le Master de fiche.
4. Generer la fiche depuis la meme source de donnees.
5. Raccorder l'acces proprietaire / magic-link si requis.
6. Verifier que l'email proprietaire reste prive.
7. Verifier fiche, QR, contact direct et mobile.
8. Passer les controles de publication.

Cas de reference : PAP Piscine.

## ROUTAGE METIER

Le module est choisi selon l'activite reelle, jamais selon la commodite technique.

Exemples :
- lieux, loisirs, sport, sorties, experiences territoriales -> EXPLORE ;
- location -> LOC ;
- restauration -> RESTO ;
- chauffeur / transfert -> DRIVER ;
- autres modules -> appliquer leur perimetre valide.

Le territoire public doit etre celui confirme par le professionnel. Ne pas elargir automatiquement a une zone voisine.

## RACCORDEMENT LA VOIX

Pour chaque presence publiee :
- nom ;
- activite exacte ;
- territoire ;
- variantes terrain utiles ;
- module.

Interdiction d'inventer des prestations pour enrichir la recherche.

Test minimum :
- recherche par nom ;
- recherche par metier ;
- recherche metier + territoire.

## CONTROLES AVANT PUBLICATION

Tous doivent etre verts :
- identite unique ;
- source de donnees unique ;
- parcours CARTE SEULE / CARTE + FICHE respecte ;
- module correct ;
- territoire correct ;
- telephone / WhatsApp corrects ;
- email proprietaire non expose par defaut ;
- media public valide ;
- QR pointe vers une URL finale confirmee si QR publie ;
- annuaire public trouve le professionnel ;
- LA VOIX le trouve par nom, metier et metier + territoire ;
- rendu mobile lisible ;
- aucun texte ou code casse ;
- controle du fichier reel sur main apres fusion ;
- controle du rendu public apres deploiement.

## REGLE DE DEBUG

Si une correction ne produit aucun changement visible :
1. ne pas empiler une deuxieme correction ;
2. verifier le fichier reel sur main ;
3. verifier la syntaxe exacte produite ;
4. verifier que la regle est effectivement chargee et executee ;
5. ensuite seulement examiner cache, CDN, service worker ou deploiement.

## SEQUENCE INDUSTRIELLE

RECEVOIR -> RECHERCHER EXISTANT -> VALIDER -> CHOISIR PARCOURS -> CLASSER MODULE/TERRITOIRE -> GENERER/RACCORDER -> LA VOIX -> CONTROLER -> VALIDATION HUMAINE -> PUBLIER -> CONTROLER LE PUBLIC

## CRITERE DE REUSSITE

Le prochain professionnel ne doit pas provoquer de nouvelle architecture.
Si un cas exige une exception, documenter l'ecart avant de modifier le patron.
