"""Guard PUBLIC -> tariffs -> professional dossier for Senegal, France and USA.

Read-only: no network, database, payment, or real registration.
"""
import json
import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TARIFFS = (ROOT / "tarifs-adherents-1.html").read_text(encoding="utf-8")
WRAPPER = (ROOT / "preparer-ma-carte.html").read_text(encoding="utf-8")
CORE = (ROOT / "preparer-ma-carte-core-20260824.html").read_text(encoding="utf-8")
LANGS = {"fr", "wo", "zh", "en", "es", "pt", "it", "de", "nl", "ar"}
PATHS = [
    "assets/digiy-adhesion-runtime-v1.json",
    "assets/digiy-adhesion-runtime-france-v1.json",
    "assets/digiy-adhesion-runtime-dakar-v1.json",
]


class ParcoursTarifsPaysWorld10(unittest.TestCase):
    def setUp(self):
        self.runtimes = [json.loads((ROOT / path).read_text(encoding="utf-8"))
                         for path in PATHS]
        self.countries = {c["id"]: c for c in self.runtimes[0]["countries"]}

    def test_the_three_countries_and_official_membership_tariffs(self):
        self.assertEqual(set(self.countries), {"SN", "FR", "US"})
        expected = {"SN": 12000, "FR": 450, "US": 29}
        for country, amount in expected.items():
            with self.subTest(country=country):
                c = self.countries[country]
                self.assertEqual(c["status"], "active")
                self.assertEqual(c["pricing"]["membership"]["adherent-19900"]["amount"], amount)
                self.assertTrue(c["territories"])
        # Plan code is an internal identifier, NOT a promise of a 19,900 FCFA price.
        self.assertIn("plan=adherent-19900", TARIFFS)
        self.assertIn("PRICES={SN:", TARIFFS)
        self.assertIn("12 000 FCFA", TARIFFS)
        self.assertIn("450 €", TARIFFS)
        self.assertIn("$29", TARIFFS)

    def test_usa_profile_price_required_by_the_existing_prevalidation_flow(self):
        us = self.countries["US"]
        self.assertEqual(us["pricing"]["services"]["fiche"]["starting_amount"], 299)
        self.assertEqual(us["pricing"]["services"]["fiche"]["label"], "$299")
        self.assertIn("$299", TARIFFS)
        self.assertIn("const effectiveExtra=extra==='none'?'fiche':extra;", WRAPPER)
        self.assertIn("const sp=effectiveExtra==='fiche'?c?.pricing?.services?.fiche:servicePrice();", WRAPPER)
        self.assertIn("if(!sp)throw new Error('Tarif pays indisponible');", WRAPPER)
        # No new services/site prices are silently invented for the US pilot.
        self.assertEqual(set(us["pricing"]["services"]), {"fiche"})

    def test_all_declared_runtime_languages_match_the_real_form(self):
        for path, dataset in zip(PATHS, self.runtimes):
            for country in dataset["countries"]:
                with self.subTest(runtime=path, country=country["id"]):
                    self.assertEqual(set(country["interface_languages"]), LANGS)
                    self.assertEqual(len(country["interface_languages"]), 10)
                    self.assertTrue(country["labels"].get("wo"))
                    self.assertTrue(country["labels"].get("zh"))
        for lang in LANGS:
            self.assertIn("'" + lang + "'", CORE)
            self.assertIn('data-l="' + lang + '"', TARIFFS)
        self.assertIn("renderLangs()", CORE)
        self.assertIn("Q.get('lang')", CORE)

    def test_master_tariffs_to_dossier_routes_preserve_country_and_language(self):
        self.assertIn("'/preparer-ma-carte.html?plan=adherent-19900&country='+countrySlug+'&lang='+lang()", TARIFFS)
        self.assertIn("cc.href='/preparer-ma-carte.html?product=carnet-pro&country=sn&lang='+lang()", TARIFFS)
        self.assertIn("u.searchParams.set('lang',lang())", TARIFFS)
        self.assertIn("DRIVER_FR_T.wo=", TARIFFS)
        self.assertIn("DRIVER_FR_T.zh=", TARIFFS)
        self.assertIn("wo:'WAAJAL SAMA FICHE", TARIFFS)
        self.assertIn("zh:'准备我的专业页面", TARIFFS)
        self.assertIn("const RUNTIME_URL='/assets/digiy-adhesion-runtime-v1.json';", CORE)
        self.assertIn("digiy-adhesion-runtime-france-v1.json", WRAPPER)
        self.assertIn("digiy-adhesion-runtime-dakar-v1.json", WRAPPER)

    def test_no_new_automatic_payments_or_real_submissions(self):
        self.assertIn("flow=prevalidation-20260911", TARIFFS)
        self.assertIn("digiy-prevalidation-flow-20260911.js", WRAPPER)
        self.assertIn("digiy-pro-form-guard-20260923.js", WRAPPER)
        self.assertNotIn("fetch('https://", json.dumps(self.runtimes))


    def test_professional_dossier_overlays_world10(self):
        files = {
            "M": "assets/digiy-prevalidation-flow-20260911.js",
            "D": "assets/digiy-fiche-flow-20260911.js",
            "COPY": "assets/digiy-indicative-tariffs-v1.js",
        }
        for dictionary, path in files.items():
            with self.subTest(path=path):
                js = (ROOT / path).read_text(encoding="utf-8")
                self.assertIn('Object.assign(' + dictionary + ',{"wo":', js)
                self.assertIn('"zh":', js)
        prevalidation = (ROOT / files["M"]).read_text(encoding="utf-8")
        self.assertIn("US_METHODS.wo=", prevalidation)
        self.assertIn("US_METHODS.zh=", prevalidation)
        guard = (ROOT / "assets/digiy-pro-form-guard-20260923.js").read_text(encoding="utf-8")
        self.assertIn("const WORLD10_GUARD=", guard)
        for lang in LANGS:
            self.assertIn('"' + lang + '":', guard)
        self.assertIn("translate('missing')", guard)
        self.assertIn("el.closest('label')", guard)
        # The CARNET PRO alternate product is not changed by this PR.
        self.assertIn("if(!carnet)addon+=", WRAPPER)


if __name__ == "__main__":
    unittest.main()
