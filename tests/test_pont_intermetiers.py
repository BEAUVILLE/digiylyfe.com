"""Contrat de la gare centrale DIGIYLYFE : panneau visible et filtres existants."""
import pathlib
import unittest

SOURCE = (pathlib.Path(__file__).resolve().parents[1] / "annuaire.html").read_text(encoding="utf-8")


class CarrefourInterprofessionsTest(unittest.TestCase):
    def test_identite_visible_sans_volet_replie(self):
        self.assertEqual(SOURCE.count('id="pont-metiers"'), 1)
        self.assertIn('<section class="pontMetiers" id="pont-metiers"', SOURCE)
        self.assertIn('CARREFOUR INTERPROFESSIONS', SOURCE)
        self.assertNotIn('<details class="pontMetiers"', SOURCE)
        self.assertLess(SOURCE.index('id="pont-metiers"'), SOURCE.index('id="recherche"'))

    def test_cinq_choix_reutilisent_recherche(self):
        for dep in ("batiment", "services", "mobilite", "commerce", ""):
            self.assertIn('data-pont-department="' + dep + '"', SOURCE)
        self.assertIn("department=btn.dataset.pontDepartment||'';", SOURCE)
        self.assertIn("document.getElementById('status').scrollIntoView", SOURCE)
        self.assertIn("@media(max-width:680px){.pontMetiers", SOURCE)

    def test_protege_inscription_et_sources(self):
        self.assertIn("request('digiy_annuaire_public'", SOURCE)
        self.assertIn("request('digiy_annuaire_volontaires'", SOURCE)
        self.assertIn("window.DIGIY_ANNUAIRE_REFRESH=loadDirectory;", SOURCE)
        self.assertIn('src="/annuaire-inscription-auto.js', SOURCE)
        self.assertIn('href="#inscription" class="cta primary"', SOURCE)


if __name__ == "__main__":
    unittest.main()
