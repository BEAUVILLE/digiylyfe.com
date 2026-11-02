"""DIGIYLYFE — garde-fous fiches publiques multilingues WO / 中文."""
from pathlib import Path
import unittest
import re

ROOT=Path(__file__).resolve().parents[1]
MASTER_NAMES=(
    "MASTER-FICHE-SERVICE-ARTISAN-V1-TEST.html",
    "MASTER-FICHE-COMMERCE-V1-TEST.html",
    "MASTER-FICHE-LIEU-TOURISME-V1-TEST.html",
    "MASTER-FICHE-BEAUTE-RESTAURATION-ACTIVITE-VISUELLE-V1-TEST.html",
)
LANGS=("fr","en","es","pt","it","de","nl","ar","wo","zh")

class FicheWorld10(unittest.TestCase):
    def test_generator_proposes_ten_language_fields(self):
        s=(ROOT/"masters/GENERATEUR-ATELIER-FICHE-DIGIYLYFE-V1.html").read_text(encoding="utf-8")
        for l in LANGS:
            self.assertRegex(s, r"\['"+re.escape(l)+r"',")
        self.assertIn("['wo','WO']",s)
        self.assertIn("['zh','中文']",s)
        self.assertIn("10 langues",s)
        self.assertIn("l==='zh'?'中文':'WO'",s)
        self.assertIn("identique au français",s)
        self.assertIn("check('public')",s)
        self.assertIn("LANGS.forEach(([l])=>",s)

    def test_each_master_hides_missing_content_not_pretend_translation(self):
        for f in MASTER_NAMES:
            s=(ROOT/"masters"/f).read_text(encoding="utf-8")
            with self.subTest(master=f):
                self.assertIn("languages:['fr','en','es','pt','it','de','nl','ar','wo','zh']",s)
                self.assertIn("LANG_LABELS={wo:'WO',zh:'中文'}",s)
                self.assertIn("LANGS=ALL_LANGS.filter(",s)
                self.assertIn("d.job&&d.zone&&d.lead&&d.about",s)
                self.assertIn("lang==='zh'?'zh-CN':lang",s)
                self.assertIn("LANG_LABELS[l]||l.toUpperCase()",s)
                self.assertIn("data-l=",s)
                self.assertIn("FICHE.finalUrl||location.href",s)
                self.assertIn("https://wa.me/",s)

if __name__=="__main__":
    unittest.main()
