"""Regressions: labels HT pour sites français, sans changer les tarifs ni LOC."""
import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RUNTIMES = (
    "assets/digiy-adhesion-runtime-v1.json",
    "assets/digiy-adhesion-runtime-france-v1.json",
    "assets/digiy-adhesion-runtime-bordeaux-v1.json",
    "assets/digiy-adhesion-runtime-dordogne-v1.json",
)

class FranceSitePricesHT(unittest.TestCase):
    def test_all_french_runtimes_show_ht(self):
        for path in RUNTIMES:
            data = json.loads((ROOT / path).read_text(encoding="utf-8"))
            fr = next(x for x in data["countries"] if x["id"] == "FR")
            services = fr["pricing"]["services"]
            for key, amount in (("site_premium", 480), ("site_extra", 800)):
                with self.subTest(path=path, offer=key):
                    self.assertEqual(services[key]["starting_amount"], amount)
                    self.assertEqual(services[key]["label"], f"À partir de {amount} € HT")

    def test_main_france_page_shows_ht_but_senegal_and_us_prices_stay(self):
        html = (ROOT / "tarifs-adherents-1.html").read_text(encoding="utf-8")
        self.assertIn("premium:'À PARTIR DE 480 € HT',extra:'À PARTIR DE 800 € HT'", html)
        self.assertIn("premium:'À PARTIR DE 250 000 FCFA',extra:'À PARTIR DE 450 000 FCFA'", html)
        self.assertIn("premium:'$790+',extra:'$1,490+'", html)

    def test_country_switch_keeps_ht_on_french_sites_only(self):
        js = (ROOT / "assets/digiy-membership-country-v1.js").read_text(encoding="utf-8")
        self.assertIn("var suffix=countryId==='FR'?' HT':'';", js)
        self.assertIn("amount(premium.starting_amount,c)+suffix", js)
        self.assertIn("amount(extra.starting_amount,c)+suffix", js)
        card = (ROOT / "carte-gratuite.html").read_text(encoding="utf-8")
        self.assertIn("'480 € HT+','800 € HT+'", card)

if __name__ == "__main__":
    unittest.main()
