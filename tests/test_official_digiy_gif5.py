"""Garde-fous de la carte officielle DIGIY : 2 modèles, 7,5 s, QR vrai, sans boucle."""
from pathlib import Path
from hashlib import sha1
import unittest
from PIL import Image

ROOT=Path(__file__).resolve().parents[1]
HOME=(ROOT/"index.html").read_text(encoding="utf-8")
JS=(ROOT/"assets/digiy-official-card-models-75-v1.js").read_text(encoding="utf-8")
OFFICIAL=ROOT/"carte-visite-digiy.png"
GIF=ROOT/"assets/digiy-officiel-animation-75-9x16.gif"
FINAL=ROOT/"assets/digiy-officiel-final-9x16.png"

def git_blob_sha(path):
    content=path.read_bytes()
    return sha1(b"blob "+str(len(content)).encode()+b"\0"+content).hexdigest()

class OfficialDigiyTwoCards(unittest.TestCase):
    def test_original_card_unchanged(self):
        self.assertEqual(git_blob_sha(OFFICIAL),"df008bab3b618b246077c77d75c34b05d6429e38")
        self.assertIn('src="https://digiylyfe.com/carte-visite-digiy.png"',HOME)
        self.assertIn('href="https://digiylyfe.com/carte/"',HOME)
        self.assertIn("var url='https://digiylyfe.com/carte/';",HOME)
        self.assertIn('id="digiyShareCard"',HOME)
    def test_gif_75s_9x16_real_frames_no_loop(self):
        self.assertEqual(git_blob_sha(GIF),"03995a492eb0c1fc70fbbc427756f850729ffff4")
        with Image.open(GIF) as gif:
            self.assertEqual(gif.format,"GIF")
            self.assertEqual(gif.size,(540,960))
            self.assertEqual(gif.info.get("loop"),None)
            self.assertEqual(gif.n_frames,8)
            delays=[]
            for i in range(gif.n_frames):
                gif.seek(i)
                delays.append(gif.info.get("duration",0))
        self.assertEqual(delays,[850,800,750,700,650,650,600,2500])
        self.assertEqual(sum(delays),7500)
        self.assertGreater(GIF.stat().st_size,100_000,"Une image seule ne doit pas passer pour un GIF")
    def test_final_qr_asset_is_approved_and_stable(self):
        self.assertEqual(git_blob_sha(FINAL),"7797e35e9ac3e7b50bc202781715b7830f589583")
        with Image.open(FINAL) as picture:
            self.assertEqual(picture.format,"PNG")
            self.assertEqual(picture.size,(540,960))
        self.assertIn('src="/assets/digiy-officiel-final-9x16.png"',HOME)
        self.assertIn("var finalURL='/assets/digiy-officiel-final-9x16.png'",JS)
        self.assertIn("image.src=finalURL",JS)
    def test_two_models_and_instant_replay_without_refetch(self):
        for key in ("digiyCardChooseFixed","digiyCardChooseAnimated","digiyCardFixedPanel","digiyCardAnimatedPanel","digiyOfficialReplay5"):
            self.assertIn('id="'+key+'"',HOME)
        self.assertIn("var duration=7500",JS)
        self.assertIn("cache:'force-cache'",JS)
        self.assertIn("new Blob([bytes],{type:'image/gif'})",JS)
        self.assertIn("URL.createObjectURL",JS)
        self.assertIn("replay.addEventListener('click'",JS)
        self.assertIn("IntersectionObserver",JS)
        self.assertIn("replay.hidden=which!=='animated'",JS)
        self.assertIn("window.matchMedia('(prefers-reduced-motion: reduce)')",JS)
        self.assertNotIn("?play=",JS)
        self.assertNotIn('data-gif-src="/assets/digiy-carte-officielle-5s.gif"',HOME)
    def test_ten_languages_and_no_babacar_mix(self):
        for lang in ("fr","wo","zh","en","es","pt","it","de","nl","ar"):
            self.assertIn('      '+lang+':["🪪',HOME)
        self.assertIn("DIGIY_CARD_LABELS[lang]",HOME)
        self.assertNotIn('digiy-babacar-animation-stop-20261105.gif',HOME)
        self.assertNotIn('id="digiy-official-card-gif5"',HOME)

if __name__=="__main__":
    unittest.main()
