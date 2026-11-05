"""Le GIF de vitrine n'altère pas le QR officiel ni les routes publiques DIGIY."""
from pathlib import Path
from hashlib import sha1
from PIL import Image
import unittest

ROOT=Path(__file__).resolve().parents[1]
PAGE=(ROOT/"index.html").read_text(encoding="utf-8")
SOURCE=ROOT/"carte-visite-digiy.png"
ASSET=ROOT/"assets/digiy-carte-officielle-5s.gif"

class OfficialDigiyGif5(unittest.TestCase):
    def test_original_qr_file_exactly_preserved(self):
        data=SOURCE.read_bytes()
        blob_sha=sha1(b"blob "+str(len(data)).encode()+b"\0"+data).hexdigest()
        self.assertEqual(blob_sha,"df008bab3b618b246077c77d75c34b05d6429e38")
        self.assertIn('src="https://digiylyfe.com/carte-visite-digiy.png"',PAGE)
        self.assertIn('data-final-src="https://digiylyfe.com/carte-visite-digiy.png"',PAGE)
    def test_true_gif_five_seconds_no_loop(self):
        self.assertTrue(ASSET.is_file())
        with Image.open(ASSET) as gif:
            self.assertEqual(gif.format,"GIF")
            self.assertGreaterEqual(gif.n_frames,10)
            self.assertIsNone(gif.info.get("loop"))
            total=0
            for i in range(gif.n_frames):
                gif.seek(i)
                total+=gif.info.get("duration",0)
            self.assertEqual(total,5000)
    def test_mobile_replay_and_stable_final(self):
        self.assertIn('id="digiyOfficialReplay5"',PAGE)
        self.assertIn('id="digiyOfficialGif5"',PAGE)
        self.assertIn('data-gif-src="/assets/digiy-carte-officielle-5s.gif"',PAGE)
        self.assertIn("replay.addEventListener('click',play)",PAGE)
        self.assertIn("card.src=card.dataset.gifSrc+'?play='+(++count)",PAGE)
        self.assertIn("stopTimer=setTimeout(showFinal,5000)",PAGE)
        self.assertIn("card.src=card.dataset.finalSrc",PAGE)
        self.assertIn("IntersectionObserver",PAGE)
        self.assertIn("prefers-reduced-motion: reduce",PAGE)
    def test_original_card_share_pwa_routes(self):
        self.assertIn('href="https://digiylyfe.com/carte/"',PAGE)
        self.assertIn('id="digiyShareCard"',PAGE)
        self.assertIn("var url='https://digiylyfe.com/carte/';",PAGE)
        self.assertIn('href="https://digiylyfe.com/"',PAGE)
        self.assertNotIn("digiy-babacar-animation-stop-20261105.gif",PAGE)
    def test_all_ten_language_replay_labels(self):
        for language in ("fr","wo","zh","en","es","pt","it","de","nl","ar"):
            self.assertIn('      '+language+':"▶', PAGE)
        self.assertIn("DIGIY_OFFICIAL_REPLAY5_LABELS[lang]",PAGE)
        self.assertNotIn('data-i18n="digiyOfficialReplay5"',PAGE)

if __name__=="__main__":
    unittest.main()
