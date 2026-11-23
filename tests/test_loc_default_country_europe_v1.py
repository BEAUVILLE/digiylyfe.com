"""DIGIY LOC : priorité d'entrée Europe, pays explicite toujours respecté."""
import re
import unittest
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
PAGE=(ROOT/"tarifs-loc-v2.html").read_text(encoding="utf-8")
SECURE=(ROOT/"assets/digiy-loc-secure-flow-20260911.js").read_text(encoding="utf-8")

class LocDefaultCountryEurope(unittest.TestCase):
    def test_default_country_europe_preserves_other_choices(self):
        match=re.search(r'<select id="country" required>(.*?)</select>',PAGE,re.S)
        self.assertIsNotNone(match)
        country=match.group(1)
        self.assertIn('<option value="eu" selected>Europe · €</option>',country)
        self.assertIn('<option value="sn">Sénégal · FCFA</option>',country)
        self.assertIn('<option value="us">USA · Miami · $</option>',country)
        self.assertEqual(country.count(" selected"),1)

    def test_explicit_country_override_and_price_sync_preserved(self):
        self.assertIn("if(c==='fr')c='eu'",SECURE)
        self.assertIn("el.dispatchEvent(new Event('change',{bubbles:true}))",SECURE)
        self.assertIn("preselectCountry();",SECURE)
        self.assertIn("document.getElementById('country').addEventListener('change',function(){priceOptions();updateExpected()",PAGE)
        self.assertIn("none:'250 € HT',premium:'480 € HT',extra:'800 € HT'",SECURE)
        self.assertIn("none:'100 000 FCFA',premium:'250 000 FCFA',extra:'450 000 FCFA'",SECURE)

    def test_loc_rates_unchanged(self):
        self.assertIn("euRef:75,euAnnual:765,euFirst:1015",PAGE)
        self.assertIn("snRef:21000,snAnnual:214200",PAGE)
        self.assertIn("return Number(n).toLocaleString('fr-FR')+' € HT'",PAGE)

if __name__=='__main__':
    unittest.main()
