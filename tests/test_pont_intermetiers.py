"""Contrat non-régression : le pont intermétiers réutilise l'annuaire public."""
import pathlib
import unittest

SOURCE = (pathlib.Path(__file__).resolve().parents[1] / "annuaire.html").read_text(encoding="utf-8")


class PontMetiersTest(unittest.TestCase):
    def test_pont_unique_et_accessible(self):
        self.assertEqual(SOURCE.count('id="pont-metiers"'), 1)
        self.assertIn('<summary>↔ Vous êtes professionnel ?', SOURCE)
        self.assertIn('role="group" aria-label="Explorer les métiers complémentaires"', SOURCE)

    def test_choix_multiples_et_tous(self):
        for departement in ("batiment", "services", "mobilite", "commerce", ""):
            self.assertIn('data-pont-department="' + departement + '"', SOURCE)
        self.assertIn("department=btn.dataset.pontDepartment||'';", SOURCE)
        self.assertIn("render();\n  document.getElementById('status').scrollIntoView", SOURCE)

    def test_donnees_existantes_et_inscription_preservees(self):
        self.assertIn("request('digiy_annuaire_public'", SOURCE)
        self.assertIn("request('digiy_annuaire_volontaires'", SOURCE)
        self.assertIn("window.DIGIY_ANNUAIRE_REFRESH=loadDirectory;", SOURCE)
        self.assertIn('src="/annuaire-inscription-auto.js', SOURCE)
        self.assertIn("0 % de commission DIGIY", SOURCE)


if __name__ == "__main__":
    unittest.main()
