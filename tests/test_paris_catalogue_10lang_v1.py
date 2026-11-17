"""DIGIY PARIS: 20 arrondissements, 11 portes, 33 exemples, 10 langues.

Tests hors réseau : les exemples ne sont jamais de vrais professionnels.
"""
import json
import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LANGS = {"fr", "en", "es", "pt", "it", "de", "nl", "ar", "wo", "zh"}
CATALOG_SOURCE = (ROOT / "assets/digiy-paris-catalogue-v1.js").read_text(encoding="utf-8")
PARIS = (ROOT / "paris.html").read_text(encoding="utf-8")
UI = (ROOT / "assets/digiy-paris-places-v1.js").read_text(encoding="utf-8")
DEMO = (ROOT / "demo-paris.html").read_text(encoding="utf-8")


def catalog():
    match = re.search(
        r"window\.DIGIY_PARIS_CATALOGUE_V1=(\{[\s\S]*?\});\s*\}\)\(\);",
        CATALOG_SOURCE,
    )
    if not match:
        raise AssertionError("Catalogue JS must hold readable JSON")
    return json.loads(match.group(1))


class ParisCatalogueTenLanguages(unittest.TestCase):
    def test_full_catalogue(self):
        data = catalog()
        self.assertEqual(data["version"], "PARIS-CATALOGUE-V1")
        self.assertEqual(data["arrondissements"], [f"paris-{x:02d}" for x in range(1, 21)])
        self.assertEqual(len(data["categories"]), 11)
        self.assertEqual(set(data["copy"]), LANGS)
        self.assertEqual(len({c["id"] for c in data["categories"]}), 11)
        for category in data["categories"]:
            with self.subTest(category=category["id"]):
                self.assertEqual(set(category["names"]), LANGS)
                self.assertEqual(set(category["examples"]), LANGS)
                self.assertTrue(category["signature"].startswith("DIGIY"))
                for language in LANGS:
                    self.assertTrue(category["names"][language])
                    self.assertEqual(len(category["examples"][language]), 3)
                    self.assertTrue(all(category["examples"][language]))

    def test_page_has_native_ten_buttons_and_ten_loc_translations(self):
        buttons = re.findall(r'<button data-lang="([^"]+)"', PARIS)
        self.assertEqual(len(buttons), 10)
        self.assertEqual(set(buttons), LANGS)
        loc_blocks = re.findall(r'<div class="locLang" data-loc-lang="([^"]+)"', PARIS)
        self.assertEqual(len(loc_blocks), 10)
        self.assertEqual(set(loc_blocks), LANGS)
        self.assertNotIn('href="/?lang=wo"', PARIS)
        self.assertNotIn('href="/?lang=zh"', PARIS)
        self.assertIn('const T={', PARIS)
        self.assertIn('wo:', PARIS)
        self.assertIn('zh:', PARIS)

    def test_demo_has_ten_languages_and_never_pretends_real_member(self):
        buttons = re.findall(r'<button data-l="([^"]+)"', DEMO)
        self.assertEqual(len(buttons), 10)
        self.assertEqual(set(buttons), LANGS)
        self.assertIn('name="robots" content="noindex,follow"', DEMO)
        self.assertIn("t.notReal", DEMO)
        self.assertIn("t.projectNote", DEMO)
        self.assertIn("/paris.html", DEMO)
        self.assertIn("territory:'paris'", DEMO)
        self.assertNotIn("saly", DEMO.lower())
        self.assertNotIn("dakar", DEMO.lower())

    def test_catalogue_filters_are_open_not_membership_barriers(self):
        self.assertIn("DATA.arrondissements.forEach", UI)
        self.assertIn("DATA.categories.filter", UI)
        self.assertIn("t.allVariants", UI)
        self.assertIn("state.quarter", UI)
        self.assertIn("link('/demo-paris.html'", UI)
        self.assertIn("link('/carte-gratuite.html'", UI)
        self.assertNotIn("adherent-19900", UI)
        self.assertIn("cat.signature", DEMO)
        self.assertNotIn("supabase", UI.lower())
        self.assertNotIn("fetch(", UI)
        self.assertNotIn("fetch(", DEMO)

    def test_paris_loads_catalogue_before_renderer(self):
        self.assertIn('src="/assets/digiy-paris-catalogue-v1.js?', PARIS)
        self.assertIn('src="/assets/digiy-paris-places-v1.js?', PARIS)
        self.assertLess(
            PARIS.index('src="/assets/digiy-paris-catalogue-v1.js?'),
            PARIS.index('src="/assets/digiy-paris-places-v1.js?'),
        )
        self.assertTrue((ROOT / "demo-paris.html").is_file())

    def test_existing_prices_and_contact_doctrine_unchanged(self):
        for price in ("20 €", "250 €", "450 €/an", "700 €", "480 €+", "800 €+", "765 €"):
            self.assertIn(price, PARIS)
        self.assertIn("0 % commission", PARIS)
        self.assertIn('href="/france.html"', PARIS)


if __name__ == "__main__":
    unittest.main()
