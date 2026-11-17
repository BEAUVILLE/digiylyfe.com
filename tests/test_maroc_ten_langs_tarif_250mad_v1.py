"""DIGIY MAROC — 250 MAD paiement unique, 10 langues natives (sans réseau)."""
import re
import unittest
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
LANGS = {"fr", "en", "es", "pt", "it", "de", "nl", "ar", "wo", "zh"}
PAGES = [
    "maroc.html", "casablanca.html", "marrakech.html", "carte-gratuite-maroc.html",
]
JS = (ROOT / "assets/digiy-maroc-i18n-v1.js").read_text(encoding="utf-8")


class LinkCollector(HTMLParser):
    def __init__(self):
        super().__init__()
        self.hrefs = []

    def handle_starttag(self, tag, attrs):
        if tag == "a":
            target = dict(attrs).get("href")
            if target:
                self.hrefs.append(target.replace("&amp;", "&"))


class MoroccoTenLanguages(unittest.TestCase):
    def test_all_four_pages_offer_ten_real_language_buttons(self):
        for path in PAGES:
            text = (ROOT / path).read_text(encoding="utf-8")
            actual = re.findall(r'data-lang-btn="([^"]+)"', text)
            with self.subTest(path=path):
                self.assertEqual(len(actual), 10)
                self.assertEqual(set(actual), LANGS)
                self.assertNotIn('href="/?lang=wo"', text)
                self.assertNotIn('href="/?lang=zh"', text)
                self.assertIn("20261117-10lang-250mad", text)

    def test_translation_engine_accepts_wo_zh_and_preserves_lang_links(self):
        for lang in LANGS:
            self.assertIn("'" + lang + "'", JS)
        self.assertIn("var L=['fr','en','es','pt','it','de','nl','ar','wo','zh']", JS)
        self.assertIn("wo:{", JS)
        self.assertIn("zh:{", JS)
        self.assertIn("get('lang')", JS)
        self.assertIn("u.searchParams.set('lang',lang)", JS)
        self.assertIn("window.DIGIY_MAROC_I18N=", JS)

    def test_250_mad_and_no_free_card(self):
        for path in PAGES:
            text = (ROOT / path).read_text(encoding="utf-8")
            with self.subTest(path=path):
                self.assertIn("250 MAD", text)
                self.assertNotRegex(text, r"(?<![0-9])0\s*MAD")
                self.assertNotIn("tarif à confirmer", text)
                self.assertNotIn("Votre carte de visite DIGIY est gratuite", text)

    def test_brand_and_no_fake_trade_modules(self):
        self.assertIn("o.slotCommerce='DIGIY MON COMMERCE'", JS)
        self.assertIn("o.slotBeauty='DIGIY BEAUTY'", JS)
        self.assertIn("o.slotResto='DIGIY RESTO'", JS)
        self.assertIn("o.slotTourism='DIGIY EXPLORE'", JS)
        self.assertIn("'DIGIY · '+o.slotService", JS)
        for path in PAGES[:3]:
            self.assertIn("DIGIY CARNET PRO", (ROOT / path).read_text(encoding="utf-8"))

    def test_local_html_targets_exist(self):
        for path in PAGES:
            parser = LinkCollector()
            parser.feed((ROOT / path).read_text(encoding="utf-8"))
            for raw in parser.hrefs:
                target = urlsplit(raw)
                if target.hostname and target.hostname != "digiylyfe.com":
                    continue
                if target.path.endswith(".html"):
                    with self.subTest(page=path, href=raw):
                        self.assertTrue((ROOT / target.path.lstrip("/")).is_file())

    def test_request_is_manual_and_does_not_claim_online_payment(self):
        page = (ROOT / "carte-gratuite-maroc.html").read_text(encoding="utf-8")
        self.assertIn("DEMANDE CARTE DIGIY · 250 MAD · PAIEMENT UNIQUE", page)
        self.assertIn("wa.me/221771342889?text=", page)
        self.assertIn("demande sans paiement en ligne", page)
        self.assertNotIn("checkout.stripe", page)
        self.assertNotIn("sendwave", page.lower())


if __name__ == "__main__":
    unittest.main()
