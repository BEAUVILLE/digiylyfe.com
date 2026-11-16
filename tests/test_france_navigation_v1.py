"""DIGIYLYFE · France — garde des parcours territoriaux, sans réseau ni dépendances."""
import re
import unittest
from html import unescape
from pathlib import Path
from urllib.parse import urlsplit
from html.parser import HTMLParser

ROOT = Path(__file__).resolve().parents[1]
DOORS = (ROOT / "assets/digiy-territoire-public-module-doors-v2.js").read_text(encoding="utf-8")
BORDEAUX = (ROOT / "bordeaux.html").read_text(encoding="utf-8")

class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.hrefs = []
    def handle_starttag(self, tag, attrs):
        if tag == "a":
            h = dict(attrs).get("href")
            if h:
                self.hrefs.append(unescape(h))

class FranceNavigation(unittest.TestCase):
    def test_france_entry_and_city_pages_exist(self):
        for path in (
            "france.html", "paris.html", "bordeaux.html", "sarlat.html",
            "territoire.html", "demo-bordeaux.html", "demo-dordogne.html",
            "adhesion-bordeaux.html", "adhesion-dordogne.html",
            "preparer-ma-carte.html", "services-terrain.html"
        ):
            self.assertTrue((ROOT / path).is_file(), path)

    def test_all_local_html_links_in_france_routes_exist(self):
        for path in (
            "france.html", "paris.html", "bordeaux.html", "sarlat.html",
            "demo-bordeaux.html", "demo-dordogne.html",
            "adhesion-bordeaux.html", "adhesion-dordogne.html"
        ):
            links = Links()
            links.feed((ROOT / path).read_text(encoding="utf-8"))
            for raw in links.hrefs:
                url = urlsplit(raw)
                if url.hostname not in (None, "digiylyfe.com"):
                    continue
                if not url.path.endswith(".html"):
                    continue
                local = ROOT / url.path.lstrip("/")
                self.assertTrue(local.is_file(), (path, raw))

    def test_france_annonces_artisans_use_native_territory(self):
        self.assertIn("function isFranceTerritory()", DOORS)
        self.assertIn("z==='bordeaux'||z==='vallee-dordogne'", DOORS)
        self.assertIn("function nativeFranceCategory(icon)", DOORS)
        self.assertIn("icon==='⚡'||icon==='🔧'", DOORS)
        self.assertIn("if(nativeFranceCategory(icon))return;", DOORS)
        self.assertIn("if(raw&&!nativeFranceCategory(icon))wire(b,icon,raw)", DOORS)

    def test_senegal_and_master_routes_not_rewritten(self):
        self.assertIn("country=sn", DOORS)
        self.assertIn("https://digiylyfe.com/services-terrain.html", DOORS)
        for name in ("driver-client", "loc", "resto", "jobs"):
            self.assertIn(name + ".digiylyfe.com/master.html", DOORS)

    def test_bordeaux_returns_to_france(self):
        self.assertIn('<a class="back" href="/france.html" id="back">', BORDEAUX)
        self.assertIn("/territoire.html?zone=bordeaux", BORDEAUX)

if __name__ == "__main__":
    unittest.main()
