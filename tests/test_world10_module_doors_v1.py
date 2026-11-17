"""DIGIYLYFE: 10 langues réelles pour les portes métier et les masters publics.

Ce test ne certifie pas les applications professionnelles sur des sous-domaines externes.
"""
import json
import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LANGS = {"fr", "en", "es", "pt", "it", "de", "nl", "ar", "wo", "zh"}
MASTER_V3 = (ROOT / "assets/digiy-public-module-master-v3.js").read_text(encoding="utf-8")
MASTER_V2 = (ROOT / "assets/digiy-public-module-master-v2.js").read_text(encoding="utf-8")
DOORS = (ROOT / "assets/digiy-territoire-public-module-doors-v2.js").read_text(encoding="utf-8")
CARNET_ENTRY = (ROOT / "assets/digiy-carnet-entry-v1.js").read_text(encoding="utf-8")
CARNET_GEO = (ROOT / "assets/digiy-pro-carnet-geo-v1.js").read_text(encoding="utf-8")
DOOR_PATHS = [
    "assets/digiy-territoire-jobs-door-v1.js",
    "assets/digiy-territoire-beauty-door-v1.js",
    "assets/digiy-territoire-commerce-door-v1.js",
]


def js_json(source, name):
    """Extraire seulement les objets JSON sérialisés dans les scripts."""
    match = re.search(r"var " + re.escape(name) + r"=(\{[\s\S]*?\});", source)
    if not match:
        raise AssertionError("Dictionnaire JSON absent : " + name)
    return json.loads(match.group(1))


class WorldTenModuleDoors(unittest.TestCase):
    def test_main_masters_have_ten_locales_and_complete_labels(self):
        m3 = js_json(MASTER_V3, "T")
        m2 = js_json(MASTER_V2, "I18N")
        self.assertEqual(set(m3), LANGS)
        self.assertEqual(set(m2), LANGS)
        for lang in LANGS:
            with self.subTest(lang=lang):
                self.assertEqual(set(m3[lang]), set(m3["fr"]))
                self.assertTrue(all(m3[lang].values()))
                if lang in ("wo", "zh"):
                    self.assertEqual(set(m2[lang]), set(m2["fr"]))
                    self.assertNotEqual(m3[lang]["take"], m3["fr"]["take"])
                    self.assertNotEqual(m2[lang]["open"], m2["fr"]["open"])
        self.assertIn("TIT_LOCAL", MASTER_V3)
        self.assertIn("TIT_WO", MASTER_V3)
        self.assertIn("TIT_ZH", MASTER_V3)

    def test_real_members_are_not_replaced_with_fake_listings(self):
        self.assertIn("REAL.filter", MASTER_V3)
        self.assertIn("REAL.filter", MASTER_V2)
        self.assertIn("openForModule()", MASTER_V3)
        self.assertIn("places=translatedOpen()", MASTER_V2)
        self.assertIn("OPEN_LOCAL", MASTER_V3)
        self.assertIn("OPEN_LOCAL", MASTER_V2)

    def test_main_master_display_prices_are_not_the_old_zero_prices(self):
        self.assertIn("250 MAD · paiement unique", MASTER_V3)
        self.assertIn("DIGIY CARD · $20 · one-time payment", MASTER_V3)
        self.assertNotIn("CARTE DIGIY GRATUITE · 0 MAD", MASTER_V3)
        self.assertNotIn("DIGIY CARD · $0", MASTER_V3)
        self.assertIn("450 €/an ou 45 €/mois", MASTER_V3)
        self.assertIn("12 000 FCFA / mois", MASTER_V3)

    def test_explore_carnet_health_entries_have_ten_languages(self):
        for name in ("EXPLORE_TEXT", "CARNET_TEXT", "HEALTH"):
            obj = js_json(DOORS, name)
            self.assertEqual(set(obj), LANGS)
            self.assertEqual(set(obj["wo"]), set(obj["fr"]))
            self.assertEqual(set(obj["zh"]), set(obj["fr"]))
        self.assertIn("refreshLocalizedDoors(root)", DOORS)
        self.assertIn("LANGS=['fr','en','es','pt','de','it','nl','ar','wo','zh']", DOORS)

    def test_target_links_keep_wo_zh_and_zone(self):
        for path in DOOR_PATHS:
            code = (ROOT / path).read_text(encoding="utf-8")
            with self.subTest(path=path):
                self.assertIn("'wo','zh'", code)
                self.assertIn("p.get('zone')", code)
                self.assertIn("u.searchParams.set('lang',lang())", code)
        self.assertIn("u.searchParams.set('lang',currentLang())", DOORS)
        self.assertIn("u.searchParams.set('territory',territory)", DOORS)

    def test_carnet_public_entry_has_ten_languages_not_fake_pro_app(self):
        entry = js_json(CARNET_ENTRY, "L")
        geo = js_json(CARNET_GEO, "txt")
        self.assertEqual(set(entry), LANGS)
        self.assertEqual(set(geo), LANGS)
        for key in ("k", "t", "p", "c"):
            self.assertTrue(entry["wo"][key])
            self.assertTrue(entry["zh"][key])
            self.assertTrue(geo["wo"][key])
            self.assertTrue(geo["zh"][key])
        self.assertIn("13 000 FCFA", CARNET_ENTRY)

    def test_no_changed_payment_or_backend_in_these_public_scripts(self):
        for source in (MASTER_V2, MASTER_V3, DOORS, CARNET_ENTRY, CARNET_GEO):
            self.assertNotIn("checkout.stripe", source)
            self.assertNotIn("supabase.from", source)


if __name__ == "__main__":
    unittest.main()
