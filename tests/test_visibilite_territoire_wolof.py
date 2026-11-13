"""Continuité wolof entre Saly et le territoire Petite Côte (sans réseau)."""
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

class TerritoireWolofContinuite(unittest.TestCase):
    def test_saly_petite_cote_wo_preserve(self):
        saly = (ROOT / "saly.html").read_text(encoding="utf-8")
        cfg = (ROOT / "assets/digiy-petite-cote-config-v1.js").read_text(encoding="utf-8")
        self.assertIn('data-l="wo"', saly)
        self.assertIn("lang='+encodeURIComponent(p.lang)", cfg)
        self.assertIn("/territoire.html?zone=petite-cote", cfg)

    def test_territory_wo_ui_and_back(self):
        page = (ROOT / "territoire.html").read_text(encoding="utf-8")
        runtime = (ROOT / "assets/digiy-territoire-runtime-v1.js").read_text(encoding="utf-8")
        self.assertIn('data-lang="wo"', page)
        self.assertIn("xibaar", page.lower())
        self.assertIn("wo:{tag:", runtime)
        self.assertIn("Tànnal sa gox", runtime)
        self.assertIn("/saly.html?lang=wo", runtime)
        self.assertIn("u.searchParams.set('lang',lang)", runtime)

    def test_wo_in_multi_service_door(self):
        projection = (ROOT / "assets/digiy-territoire-petite-cote-projection-v1.js").read_text(encoding="utf-8")
        self.assertIn("wo:{food:", projection)
        self.assertIn("x.lang", projection)

if __name__ == "__main__":
    unittest.main()
