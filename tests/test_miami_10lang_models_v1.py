"""DIGIY MIAMI — 10 langues, 11 familles métiers, 33 démonstrations, prix USA.

Contrôles hors réseau : aucune entreprise fictive n'est considérée comme adhérente.
"""
import json
import re
import unittest
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
LANGS = {"fr","en","es","pt","it","de","nl","ar","wo","zh"}
MIAMI = (ROOT / "miami.html").read_text(encoding="utf-8")
DEMO = (ROOT / "demo-miami.html").read_text(encoding="utf-8")
UI = (ROOT / "assets/digiy-miami-places-v1.js").read_text(encoding="utf-8")
CARD = (ROOT / "carte-gratuite.html").read_text(encoding="utf-8")
SOURCE = (ROOT / "assets/digiy-miami-catalogue-v1.js").read_text(encoding="utf-8")

def catalogue():
    m = re.search(r"window\.DIGIY_MIAMI_CATALOGUE_V1=(\{[\s\S]*?\});\s*\}\)\(\);", SOURCE)
    if not m:
        raise AssertionError("Catalogue JSON absent")
    return json.loads(m.group(1))


class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.hrefs = []
    def handle_starttag(self, tag, attrs):
        if tag == "a":
            href = dict(attrs).get("href")
            if href:
                self.hrefs.append(href.replace("&amp;", "&"))


class MiamiTenLanguages(unittest.TestCase):
    def test_11_categories_33_models_10_languages(self):
        data = catalogue()
        self.assertEqual(data["version"], "MIAMI-CATALOGUE-V1")
        self.assertEqual(data["country"], "US")
        self.assertEqual(data["territory"], "miami")
        self.assertEqual(len(data["categories"]), 11)
        self.assertEqual(len(set(x["id"] for x in data["categories"])), 11)
        self.assertEqual(set(data["copy"]), LANGS)
        for lang in LANGS:
            self.assertTrue(data["copy"][lang]["title"])
            self.assertTrue(data["copy"][lang]["number"])
            self.assertTrue(data["copy"][lang]["notReal"])
        for cat in data["categories"]:
            self.assertTrue(cat["signature"].startswith("DIGIY"))
            self.assertEqual(set(cat["names"]), LANGS)
            self.assertEqual(set(cat["examples"]), LANGS)
            for lang in LANGS:
                self.assertEqual(len(cat["examples"][lang]), 3)
                self.assertTrue(all(cat["examples"][lang]))

    def test_ten_actual_buttons_and_loc_variants(self):
        for path, html, attr in (("Miami", MIAMI, "data-lang"), ("Démo", DEMO, "data-l"), ("Carte", CARD, "data-l")):
            with self.subTest(path=path):
                buttons = re.findall(r'<button '+attr+r'="([^"]+)"', html)
                self.assertEqual(len(buttons), 10)
                self.assertEqual(set(buttons), LANGS)
        loc = re.findall(r'<div class="locLang" data-loc-lang="([^"]+)"', MIAMI)
        self.assertEqual(len(loc), 10)
        self.assertEqual(set(loc), LANGS)
        self.assertNotIn('href="/?lang=wo"', MIAMI)
        self.assertNotIn('href="/?lang=zh"', MIAMI)

    def test_miami_catalogue_and_no_fake_members(self):
        self.assertIn('src="/assets/digiy-miami-catalogue-v1.js?', MIAMI)
        self.assertIn('src="/assets/digiy-miami-places-v1.js?', MIAMI)
        self.assertIn("link('/demo-miami.html'", UI) if "link('/demo-miami.html'" in UI else self.assertIn("url('/demo-miami.html'", UI)
        self.assertIn("t.example", UI)
        self.assertIn("cat.signature", DEMO)
        self.assertIn('content="noindex,follow"', DEMO)
        self.assertIn("t.notReal", DEMO)
        self.assertNotIn("saly", UI.lower())
        self.assertNotIn("saly", DEMO.lower())

    def test_source_and_trade_preserved_to_card(self):
        self.assertIn("territory:'miami'", UI)
        self.assertIn("country:'us'", UI)
        self.assertIn("MIAMI_SIGNATURES", CARD)
        self.assertIn("requestedTerritory==='miami'&&country.value==='US'", CARD)
        self.assertIn("'DIGIY MIAMI'", CARD)
        self.assertIn("source_lang:l", CARD)
        self.assertIn("notes:(requestedTerritory==='paris'&&country.value==='FR'?", CARD)
        self.assertIn("ENDPOINT='https://wesqmwjjtsefyjnluosj.supabase.co/functions/v1/digiy-network-card-request-submit'", CARD)

    def test_tariffs_unchanged_and_optional(self):
        for price in ("$20","$299","$29","$589","$790","$1,490"):
            self.assertIn(price, MIAMI)
        self.assertIn("const CARD_PRICES={SN:'15 000 FCFA',FR:'20 €',US:'20 $'}", CARD)
        self.assertIn("const USA_PRICES=", CARD)
        self.assertIn("renderUsaPrices(l,id)", CARD)
        self.assertIn("root.hidden=countryId!=='US'", CARD)
        for price in ("299 $","29 $/mois","290 $/an","589 $","790 $+","1 490 $+","790 $/an+"):
            self.assertIn(price, CARD)
        self.assertIn("networkCardForm.addEventListener('submit'", CARD)
        self.assertIn("consent:consent.checked", CARD)

    def test_local_targets_exist(self):
        for page, html in (("miami.html", MIAMI), ("demo-miami.html", DEMO)):
            collector = Links()
            collector.feed(html)
            for href in collector.hrefs:
                target = urlsplit(href)
                if target.hostname not in (None, "digiylyfe.com"):
                    continue
                if target.path.endswith(".html"):
                    with self.subTest(page=page, link=href):
                        self.assertTrue((ROOT / target.path.lstrip("/")).is_file())

if __name__ == "__main__":
    unittest.main()
