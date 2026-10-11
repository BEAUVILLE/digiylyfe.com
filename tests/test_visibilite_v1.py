"""DIGIY VISIBILITÉ V1 — vérifications de non-régression, sans dépendances."""
import json
import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HOME = (ROOT / "index.html").read_text(encoding="utf-8")
SALY = (ROOT / "saly.html").read_text(encoding="utf-8")
CONFIG = (ROOT / "assets/digiy-petite-cote-config-v1.js").read_text(encoding="utf-8")
LANGS = {"fr", "en", "es", "pt", "it", "de", "nl", "ar"}
NEEDS = ("accommodation", "transport", "food", "artisan", "shopping")
PUBLIC_KEYS = ("question", "promise", "voice", "real", "stay", "drive", "eat", "fix", "shop")
HOME_KEYS = ("v1Question", "v1Promise", "v1SearchCta", "v1Stay", "v1Drive", "v1Eat", "v1Fix", "v1Shop")


class VisibiliteV1(unittest.TestCase):
    def test_public_first_and_only_one_h1(self):
        self.assertLess(HOME.index('id="digiyPublicFirstV1"'), HOME.index('class="digiyTreasure"'))
        self.assertLess(SALY.index('id="salyPublicFirstV1"'), SALY.index('id="realGrid"'))
        self.assertLess(SALY.index('id="realGrid"'), SALY.index('class="hero"'))
        for content in (HOME, SALY):
            self.assertEqual(len(re.findall(r"<h1\b", content)), 1)
            self.assertIn("Vous cherchez quoi, près de chez vous ?", content)
            self.assertIn("Contactez-le directement.", content)

    def test_existing_routing_no_parallel_search_engine(self):
        for content in (HOME, SALY):
            self.assertIn("https://pro-action-digiy.digiylyfe.com/", content)
            for need in NEEDS:
                self.assertIn("local=saly&amp;need=" + need, content)
                self.assertIn("'" + need + "'", CONFIG)
            self.assertIn("/territoire.html?zone=petite-cote", content)
        self.assertIn('class="voiceSearchBand"', HOME)
        self.assertIn('id="realGrid"', SALY)

    def test_all_eight_languages(self):
        home_match = re.search(r"var DIGIY_PUBLIC_V1=(\{.*?\});\s*Object.keys", HOME, re.S)
        saly_match = re.search(r"var D=(\{.*?\});var q=", SALY, re.S)
        self.assertIsNotNone(home_match)
        self.assertIsNotNone(saly_match)
        for page, data in (("home", json.loads(home_match.group(1))), ("saly", json.loads(saly_match.group(1)))):
            self.assertEqual(set(data), LANGS, page)
            for lang, labels in data.items():
                for key in HOME_KEYS if page == "home" else PUBLIC_KEYS:
                    self.assertTrue(labels.get(key), (page, lang, key))

    def test_existing_features_preserved(self):
        self.assertIn("/manifest.json", HOME)
        self.assertIn("/manifest.json", SALY)
        self.assertIn('id="digiyInstallBand"', HOME)
        self.assertIn("/assets/digiy-pwa-install.js", HOME)
        self.assertIn('data-i18n="treasureTitle"', HOME)
        self.assertIn('data-i18n="claimTitle"', HOME)
        self.assertIn('id="joinBtn"', SALY)
        self.assertIn("digiy-petite-cote-config-v1.js", SALY)
        self.assertIn("19 900 FCFA", SALY)
        self.assertIn("13 000 FCFA", SALY)
        for page, canonical in ((HOME, "https://digiylyfe.com/"), (SALY, "https://digiylyfe.com/saly.html")):
            self.assertIn('rel="canonical" href="' + canonical + '"', page)
            self.assertIn('name="description"', page)
            self.assertIn("0 % commission", page)


if __name__ == "__main__":
    unittest.main()
