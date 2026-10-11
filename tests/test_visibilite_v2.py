"""DIGIY VISIBILITÉ V2 — Saly indexable, hreflang réciproques, sans nouvelle collecte."""
from html.parser import HTMLParser
from pathlib import Path
from xml.etree import ElementTree as ET
import json
import re
import unittest

ROOT = Path(__file__).resolve().parents[1]
BASE = "https://digiylyfe.com"
PATHS = {
    "fr": "/saly.html",
    "en": "/en/saly.html",
    "de": "/de/saly.html",
    "nl": "/nl/saly.html",
}
ALT = {lang: BASE + path for lang, path in PATHS.items()}
ALT["x-default"] = ALT["fr"]
NEEDS = ("accommodation", "transport", "artisan", "food", "shopping")


class HeadParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.lang = None
        self.links = []
        self.metas = []
        self.body = False
        self.script = False
        self.style = False
        self.visible = []

    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        if tag == "html":
            self.lang = d.get("lang")
        if tag == "link":
            self.links.append(d)
        if tag == "meta":
            self.metas.append(d)
        if tag == "body":
            self.body = True
        if tag == "script":
            self.script = True
        if tag == "style":
            self.style = True

    def handle_endtag(self, tag):
        if tag == "body":
            self.body = False
        if tag == "script":
            self.script = False
        if tag == "style":
            self.style = False

    def handle_data(self, data):
        if self.body and not self.script and not self.style:
            self.visible.append(data)


class VisibiliteV2(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.files = {
            lang: (ROOT / path.lstrip("/")).read_text(encoding="utf-8")
            for lang, path in PATHS.items()
        }
        cls.parsed = {}
        for lang, html in cls.files.items():
            parser = HeadParser()
            parser.feed(html)
            cls.parsed[lang] = parser

    def test_canonical_distinct_and_reciprocal_hreflang(self):
        for lang, doc in self.parsed.items():
            canonicals = [l.get("href") for l in doc.links if l.get("rel") == "canonical"]
            self.assertEqual(canonicals, [ALT[lang]], lang)
            alternates = {
                l.get("hreflang"): l.get("href")
                for l in doc.links
                if l.get("rel") == "alternate" and l.get("hreflang")
            }
            self.assertEqual(alternates, ALT, lang)
            self.assertEqual(len(alternates), 5, lang)
            self.assertEqual(doc.lang, lang)

    def test_indexable_static_localized_pages(self):
        for lang in ("en", "de", "nl"):
            html = self.files[lang]
            doc = self.parsed[lang]
            self.assertTrue(any(m.get("name") == "robots" and m.get("content") == "index,follow" for m in doc.metas))
            self.assertGreater(len(" ".join(doc.visible)), 1000)
            self.assertIn('<meta name="description"', html)
            self.assertIn('<meta name="viewport"', html)
            self.assertIn('digiy-saly-international-v2.css', html)
            self.assertNotIn('http-equiv="refresh"', html)
            self.assertNotIn("location.replace(", html)
            self.assertNotIn('rel="id"', html)
            self.assertNotIn("wa.me/", html)  # Contacts live on the professionals' own profiles.
            blocks = re.findall(r'<script type="application/ld\\+json">(.*?)</script>', html, re.S)
            self.assertEqual(len(blocks), 1, lang)
            data = json.loads(blocks[0])
            self.assertEqual(data["@type"], "CollectionPage")
            self.assertEqual(data["inLanguage"], lang)
            self.assertNotIn("LocalBusiness", html)  # Saly directory != one individual business.

    def test_existing_routing_and_real_professionals(self):
        professional_urls = (
            "https://partenaire-lamine.digiylyfe.com/",
            "https://babacar-plombier-pro.digiylyfe.com/",
            "https://helage-plombier.digiylyfe.com/",
            "https://kourant.digiylyfe.com/",
            "https://astou-boutique.digiylyfe.com/",
        )
        for lang in ("en", "de", "nl"):
            html = self.files[lang]
            for need in NEEDS:
                self.assertIn("local=saly&amp;need=" + need + "&amp;lang=" + lang, html)
            for link in professional_urls:
                self.assertIn('href="' + link + '"', html)
            self.assertIn("https://pro-action-digiy.digiylyfe.com/", html)
            self.assertIn("0%", html)
        original = self.files["fr"]
        self.assertIn('id="salyPublicFirstV1"', original)
        self.assertIn('id="realGrid"', original)
        self.assertIn("19 900 FCFA", original)
        self.assertIn("13 000 FCFA", original)
        self.assertIn("digiy-petite-cote-config-v1.js", original)
        self.assertIn("/manifest.json", original)

    def test_sitemap_unique_urls_and_existing_pages(self):
        tree = ET.parse(ROOT / "sitemap.xml")
        ns = "{http://www.sitemaps.org/schemas/sitemap/0.9}"
        locations = [e.text for e in tree.findall(".//" + ns + "loc")]
        self.assertEqual(len(locations), len(set(locations)))
        for u in ALT.values():
            self.assertIn(u, locations)
        self.assertIn(BASE + "/fiches/pap-piscine-saly.html", locations)
        self.assertIn(BASE + "/", locations)

    def test_no_front_end_tracking_added(self):
        for doc in self.files.values():
            self.assertNotIn("trackDigiyEvent", doc)
            self.assertNotIn("sendBeacon(", doc)


if __name__ == "__main__":
    unittest.main()
