"""DIGIY DRIVER France · ensure WORLD10 is presentation-only."""
import json
import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PAGE = (ROOT / "driver-france-renseignements.html").read_text(encoding="utf-8")
SCRIPT = (ROOT / "assets/digiy-driver-france-world10.js").read_text(encoding="utf-8")
EXPECTED = {"fr", "wo", "zh", "en", "es", "pt", "it", "de", "nl", "ar"}
FIELDS = {
    "nom", "telephone", "whatsapp", "email", "ville", "zones",
    "vehicule", "places", "modele", "confort", "services",
    "langues", "tarifs", "notes",
}

match = re.search(r"var TEXT=(\{[^\n]+\});", SCRIPT)
if match is None:
    raise AssertionError("Missing JSON-formatted WORLD10 translations")
TEXT = json.loads(match.group(1))


class DriverFranceWorld10(unittest.TestCase):
    def test_10_languages_and_all_strings_covered(self):
        self.assertEqual(set(TEXT), EXPECTED)
        baseline = set(TEXT["fr"])
        self.assertEqual(len(baseline), 51)
        for lang in EXPECTED:
            self.assertEqual(set(TEXT[lang]), baseline, lang)
            self.assertTrue(all(isinstance(v, str) and v.strip() for v in TEXT[lang].values()), lang)
            self.assertIn('data-locale="' + lang + '"', PAGE)

    def test_form_fields_are_kept(self):
        for field in FIELDS:
            self.assertIn('name="' + field + '"', PAGE)
        self.assertIn('name="consent" type="checkbox" required', PAGE)
        self.assertIn('type="submit" data-digiy-i18n="submit"', PAGE)
        self.assertIn('name="services" required', PAGE)
        for v in (
            "Voiture avec chauffeur", "Van / VTC", "Minibus",
            "Bus", "Autre véhicule avec chauffeur",
        ):
            self.assertIn('<option value="' + v + '">', PAGE)

    def test_messages_stay_voluntary_and_workflow_unchanged(self):
        self.assertIn("if(!form.reportValidity())return;", PAGE)
        self.assertIn("var fd=new FormData(form);", PAGE)
        self.assertIn("'https://wa.me/'+recipient+'?text='+encodeURIComponent(rows.join('\\n'))", PAGE)
        self.assertIn("window.DIGIY_DRIVER_FI18N_MESSAGE()", PAGE)
        self.assertIn("Confirmez l’envoi dans WhatsApp", TEXT["fr"]["result"])
        self.assertIn("window.DIGIY_DRIVER_FI18N_MESSAGE=function()", SCRIPT)

    def test_territory_routing_and_arabic_direction(self):
        self.assertIn("bordeaux-transport", SCRIPT)
        self.assertIn("u.searchParams.set('lang',active)", SCRIPT)
        self.assertIn("active==='ar'?'rtl':'ltr'", SCRIPT)
        self.assertIn('src="/assets/digiy-driver-france-world10.js?v=20261119"', PAGE)
        self.assertIn("document.documentElement.lang=active", SCRIPT)


if __name__ == "__main__":
    unittest.main()
