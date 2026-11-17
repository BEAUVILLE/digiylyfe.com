"""Contrôles statiques DIGIYLYFE · cohérence internationale après les PR 208-211.

Pas de requête réseau, pas de paiement, pas d'inscription réelle.
"""
import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HOME = (ROOT / "index.html").read_text(encoding="utf-8")
HOME_I18N = (ROOT / "assets/digiy-home-i18n-v1.js").read_text(encoding="utf-8")
HOME_WO_ZH = (ROOT / "assets/digiy-home-world10-v1.js").read_text(encoding="utf-8")
LOC = (ROOT / "tarifs-loc-v2.html").read_text(encoding="utf-8")
MASTER = (ROOT / "assets/digiy-public-module-master-v2.js").read_text(encoding="utf-8")
FRANCE = (ROOT / "france.html").read_text(encoding="utf-8")


class InternationalQuality(unittest.TestCase):
    def test_homepage_explicit_four_card_prices(self):
        for value in ("Sénégal : 15 000 FCFA", "France : 20 €", "Maroc : 250 MAD", "USA : 20 $"):
            self.assertIn(value, HOME)
        self.assertIn('data-i18n="entryProPrice"', HOME)
        self.assertIn('href="/maroc.html"', HOME)

    def test_card_prices_four_countries_ten_languages(self):
        for lang in ("fr", "en", "es", "pt", "it", "de", "nl", "ar"):
            self.assertIn("Object.assign(TEXT." + lang, HOME_I18N)
        self.assertGreaterEqual(HOME_I18N.count("250 MAD"), 8)
        self.assertIn("250 MAD", HOME_WO_ZH)
        self.assertIn('"entryProText"', HOME_WO_ZH)

    def test_loc_ten_real_language_options_and_zh_field_strings(self):
        buttons = re.findall(r'<button class="lang" data-l="([^"]+)"', LOC)
        self.assertEqual(set(buttons), {"fr", "en", "es", "pt", "it", "de", "nl", "ar", "wo", "zh"})
        self.assertEqual(len(buttons), 10)
        self.assertIn('zh:{', LOC)
        self.assertIn("var T={", LOC)
        self.assertIn("document.getElementById('zhLocNotice').hidden=l!=='zh'", LOC)
        self.assertIn("document.getElementById('woLocNotice').hidden=l!=='wo'", LOC)

    def test_france_master_displays_annual_and_monthly_and_protection(self):
        price = "currency:'450 €/an · ou 45 €/mois (fiche 250 € séparée)'"
        self.assertEqual(MASTER.count(price), 2)
        self.assertIn("currency:'12 000 FCFA / mois'", MASTER)
        self.assertIn("locPrice:'DIGIY LOC · dès 75 €/mois · offre séparée'", MASTER)
        self.assertIn("450 €/an", FRANCE)

    def test_no_auto_payment_or_pricing_modification_on_loc(self):
        # Les appels réseau du paiement et les barèmes restent contrôlés par leurs scripts existants.
        for x in ("function refMonthly(", "function annualAmount(", "function expectedTier(", "function setLang("):
            self.assertIn(x, LOC)
        self.assertIn('21 000 FCFA / mois · 75 € / mois', LOC)


if __name__ == "__main__":
    unittest.main()
