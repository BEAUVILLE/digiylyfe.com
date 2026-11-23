"""Protect HT disclosure on European LOC tariffs without changing tier amounts or US/SN."""
import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LOC = (ROOT / "tarifs-loc-v2.html").read_text(encoding="utf-8")
FLOW = (ROOT / "assets/digiy-loc-secure-flow-20260911.js").read_text(encoding="utf-8")

class LocEuropeHT(unittest.TestCase):
    def test_europe_monthly_annual_first_payment_all_show_ht(self):
        self.assertIn("return Number(n).toLocaleString('fr-FR')+' € HT'", LOC)
        self.assertIn("Fiche professionnelle au démarrage : + 250 € HT", LOC)
        self.assertIn("12 mois couverts · fiche professionnelle : + 250 € HT", LOC)
        self.assertIn("EUROPE · MENSUEL HT", LOC)
        self.assertIn("EUROPE · ANNUEL HT -15 %", LOC)
        self.assertIn("ou 250 € HT en Europe", LOC)

    def test_europe_form_and_bat_show_ht(self):
        self.assertIn("none:'250 € HT',premium:'480 € HT',extra:'800 € HT'", FLOW)
        self.assertIn("data.currency==='EUR'||data.currency==='€'?' HT':''", FLOW)
        self.assertIn("money(selectedAmount(tier,c),c)", LOC)
        self.assertIn("t.euRef+250,'eu'", LOC)
        self.assertIn("money(t.euFirst,'eu')", LOC)

    def test_price_math_and_other_regions_unchanged(self):
        self.assertIn("euRef:75,euAnnual:765,euFirst:1015", LOC)
        self.assertIn("euRef:95,euAnnual:969,euFirst:1219", LOC)
        self.assertIn("euRef:290,euAnnual:2958,euFirst:3208", LOC)
        self.assertIn("snRef:21000,snAnnual:214200", LOC)
        self.assertIn("usAnnual:790", LOC)
        self.assertIn("c==='sn')return Number(n).toLocaleString('fr-FR')", LOC)
        self.assertIn("c==='us')return '$'+Number(n).toLocaleString('en-US')", LOC)
        self.assertIn("none:'100 000 FCFA',premium:'250 000 FCFA',extra:'450 000 FCFA'", FLOW)

if __name__ == "__main__":
    unittest.main()
