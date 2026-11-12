"""Accessible 10-language navigation for French-only public pilot pages.
Links MUST NOT claim to be translations of the current French page.
"""
from html.parser import HTMLParser
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]
PAGES = ("annuaire.html", "senegal.html", "france.html")
EXPECTED = {"fr": "/", "wo": "/?lang=wo", "zh-CN": "/?lang=zh",
            "en": "/?lang=en", "es": "/?lang=es", "pt": "/?lang=pt",
            "it": "/?lang=it", "de": "/?lang=de", "nl": "/?lang=nl",
            "ar": "/?lang=ar"}

class LanguageNavParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_nav = False
        self.nav_count = 0
        self.links = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "nav" and attrs.get("data-digiy-language-access-v1") == "1":
            self.in_nav = True
            self.nav_count += 1
        elif tag == "a" and self.in_nav:
            self.links.append(attrs)
    def handle_endtag(self, tag):
        if tag == "nav" and self.in_nav:
            self.in_nav = False

class PublicLanguageAccess(unittest.TestCase):
    def test_all_ten_languages_with_honest_fallback(self):
        for name in PAGES:
            with self.subTest(page=name):
                page = (ROOT / name).read_text(encoding="utf-8")
                self.assertIn('href="/assets/digiy-language-access-v1.css?v=20261112"', page)
                self.assertIn("Cette page est actuellement en français.", page)
                self.assertNotIn('aria-current="page"', page.split('data-digiy-language-access-v1="1"', 1)[1].split("</nav>", 1)[0])
                p = LanguageNavParser()
                p.feed(page)
                self.assertEqual(p.nav_count, 1)
                self.assertEqual(len(p.links), 10)
                self.assertEqual({x["hreflang"]: x["href"] for x in p.links}, EXPECTED)
                self.assertTrue(all(x.get("lang") == x.get("hreflang") for x in p.links))
                self.assertEqual(page.count("<h1"), 1)

if __name__ == "__main__":
    unittest.main()
