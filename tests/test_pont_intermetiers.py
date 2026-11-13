"""Carrefour: routes fournisseurs, matériaux, grandes surfaces."""
import pathlib
import unittest
S=(pathlib.Path(__file__).resolve().parents[1]/"annuaire.html").read_text(encoding="utf-8")
class CarrefourTest(unittest.TestCase):
 def test_langues_direction(self):
  for lang in ("fr","wo","zh","en","es","pt","it","de","nl","ar"):
   self.assertIn('<option value="'+lang+'">',S)
   self.assertIn('"'+lang+'":[',S)
  self.assertEqual(S.count('data-cf="0"'),1)
  self.assertIn("le wolof doit être relu",S)

 def test_panneau(self):
  self.assertEqual(S.count('id="pont-metiers"'),1)
  self.assertIn('CARREFOUR INTERPROFESSIONS',S)
  self.assertNotIn('<details class="pontMetiers"',S)
 def test_routes(self):
  for k in ("grossistes","materiaux","grandes-surfaces"):
   self.assertIn('data-pont-sector="'+k+'"',S)
   self.assertIn("if(selected==='"+k+"')",S)
  self.assertIn("&&matchesPontSector(p,sector)",S)
  self.assertIn("initial.delete('fiche')",S)
 def test_protection(self):
  self.assertIn("request('digiy_annuaire_public'",S)
  self.assertIn("request('digiy_annuaire_volontaires'",S)
  self.assertIn('src="/annuaire-inscription-auto.js',S)
  self.assertIn('href="#inscription" class="cta primary"',S)
if __name__=="__main__": unittest.main()
