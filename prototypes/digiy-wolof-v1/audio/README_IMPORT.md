# 🔊 DIGIY AUDIO WOLOF — import des fichiers MP3 du Mac

**État actuel : branche brouillon PR #114.** Le panneau 🔊 est installé dans `prototype.html`, mais les 29 fichiers MP3 ne sont **pas** dans ce dépôt. Sans eux, aucun bouton audio n'est activé. Ceci ne modifie pas l'accueil public, ni les huit langues existantes, ni LA VOIX.

## Sur le Mac du fondateur (une seule commande)

Depuis le Terminal :

```bash
cd "$HOME/Downloads/DIGIY_STUDIO_MAC_MASTER_V1" && \
python3.12 - <<'PY'
from pathlib import Path
import json, zipfile, sys
base=Path("WOLOF")
manifest=json.loads((base/"phrases.json").read_text(encoding="utf-8"))["phrases"]
items=[p for p in manifest if p["n"] not in (10,14)]
source=base/"AUDIO_A_VALIDER"
missing=[f"wo_{p['n']:02d}_{p['key']}.mp3" for p in items if not (source/f"wo_{p['n']:02d}_{p['key']}.mp3").is_file()]
if missing:
    print("ERREUR : audios manquants:", ", ".join(missing),file=sys.stderr)
    sys.exit(1)
output=Path.home()/"Downloads"/"DIGIY_WOLOF_29_MP3_POUR_PR114.zip"
if output.exists():
    print("Un ZIP existe déjà, refus de l'écraser :",output,file=sys.stderr)
    sys.exit(1)
with zipfile.ZipFile(output,"x",compression=zipfile.ZIP_DEFLATED,compresslevel=6) as z:
    for p in items:
        name=f"wo_{p['n']:02d}_{p['key']}.mp3"
        z.write(source/name,arcname="audio/"+name)
print("OK :",len(items),"MP3 dans",output)
PY
```

**Ensuite :** joindre le fichier `DIGIY_WOLOF_29_MP3_POUR_PR114.zip` à la conversation. L'assistant pourra importer les 29 MP3 *dans la branche de la PR #114*, puis vérifier leurs tailles, les noms, les durées et les liens. Ne pas transmettre `.venv`, le modèle de 1,88 Go ni les WAV volumineux.

## Correspondance stricte

Les 29 pistes s'appellent exactement `wo_XX_<clé>.mp3` comme dans `phrases.json` et la maquette. Exemples :
- `audio/wo_01_entryTitle.mp3`
- `audio/wo_07_entryProKicker.mp3`
- `audio/wo_31_claimWorld.mp3`

**Absences volontaires** : #10 `entryProMembership` et #14 `entryLocPrice`, textes mixtes/français. La phrase #23 est un **ancien CTA vocal inactif** présenté **uniquement en relecture** ; son audio **n'active pas de microphone ni la compréhension vocale wolof**.

## Contrôles avant activation publique

- Vérifier la lecture des 29 fichiers sur téléphone et desktop ; rejet des fichiers silencieux ou tronqués.
- Qualité de prononciation, chiffres, métier/commerce et fidélité du sens : tests terrain recommandés. L'autorisation du fondateur pour intégrer les boutons à la maquette est acquise, pas une preuve de cette QA.
- Ajouter les 29 MP3 au **prototype uniquement**, puis ouvrir la maquette et vérifier 29/29 boutons activés.
- **Aucun changement automatique de site public**. Une PR de lancement distincte avec revue restera nécessaire avant une neuvième langue publique.
- Licence du modèle, attribution et dependencies à documenter avant diffusion commerciale.

**Ne pas fusionner la PR #114 pour publier directement une interface incomplète.**
