"""DIGIY VISIBILITÉ V4 — huit accueils SEO sans remplacer l'accueil JS historique."""
import json
import re
import unittest
from html.parser import HTMLParser
from pathlib import Path
from xml.etree import ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = "https://digiylyfe.com"
LANGS = ("fr", "en", "es", "pt", "it", "de", "nl", "ar")
PAGE = {lang: ("index.html" if lang == "fr" else f"{lang}/index.html") for lang in LANGS}
URL = {lang: (ORIGIN + "/" if lang == "fr" else f"{ORIGIN}/{lang}/") for lang in LANGS}
SIMPLE_URL = {lang: ("/" if lang == "fr" else f"/{lang}/") for lang in LANGS}
NEEDS = ("accommodation", "transport", "artisan", "food", "shopping")


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.metas = []
        self.html = {}
        self.anchors = []
        self.h1 = 0

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "link":
            self.links.append(attrs)
        elif tag == "meta":
            self.metas.append(attrs)
        elif tag == "html":
            self.html = attrs
        elif tag == "a":
            self.anchors.append(attrs)
        elif tag == "h1":
            self.h1 += 1


class World8Homepage(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.html = {lang: (ROOT / path).read_text(encoding="utf-8") for lang, path in PAGE.items()}
        cls.parsed = {}
        for lang, html in cls.html.items():
            p = PageParser()
            p.feed(html)
            cls.parsed[lang] = p

    def test_recipient_language_canonicals_and_reciprocal_hreflang(self):
        alt = dict(URL)
        alt["x-default"] = URL["fr"]
        for lang, p in self.parsed.items():
            self.assertEqual(p.html.get("lang"), lang)
            self.assertEqual([x.get("href") for x in p.links if x.get("rel") == "canonical"], [URL[lang]])
            alternates = {
                x["hreflang"]: x["href"]
                for x in p.links if x.get("rel") == "alternate" and "hreflang" in x
            }
            self.assertEqual(alternates, alt, lang)
            self.assertEqual(len(alternates), 9, lang)
            all_links = {x.get("href") for x in p.anchors}
            for url in SIMPLE_URL.values():
                self.assertIn(url, all_links, (lang, url))

    def test_seven_real_static_indexable_landing_pages(self):
        for lang in LANGS[1:]:
            text = self.html[lang]
            p = self.parsed[lang]
            self.assertEqual(p.h1, 1, lang)
            self.assertGreater(len(text), 4000, lang)
            self.assertIn('content="index,follow"', text)
            self.assertIn('<meta name="description"', text)
            self.assertIn('/assets/digiy-saly-international-v2.css', text)
            self.assertIn('/manifest.json', text)
            self.assertNotIn('noindex', text)
            self.assertNotIn('http-equiv="refresh"', text)
            self.assertNotIn('location.replace(', text)
            self.assertNotIn('trackDigiyEvent', text)
            self.assertIn(f'href="/?lang={lang}"', text)
            self.assertIn(f'href="/{lang}/saly.html"', text)
            for need in NEEDS:
                self.assertIn(f'local=saly&amp;need={need}&amp;lang={lang}', text)
            blocks = re.findall(r'<script type="application/ld\+json">(.*?)</script>', text, re.S)
            self.assertEqual(len(blocks), 1, lang)
            data = json.loads(blocks[0])
            self.assertEqual(data["@type"], "WebPage")
            self.assertEqual(data["inLanguage"], lang)
            self.assertEqual(data["url"], URL[lang])

    def test_h1_all_locales_match_existing_world8_home_dictionary(self):
        """Les titres des 7 portes SEO reprennent les traductions de l'accueil existant."""
        titles = re.findall(r'"v1Question":"([^"]+)"', self.html["fr"])
        self.assertEqual(len(titles), len(LANGS), "Dictionnaire HOME V1 doit posséder 8 questions")
        for lang, title in zip(LANGS, titles):
            match = re.search(r'<h1\\b[^>]*>(.*?)</h1>', self.html[lang], re.S)
            self.assertIsNotNone(match, lang)
            self.assertEqual(match.group(1).strip(), title, lang)

    def test_arabic_direction_and_unchanged_french_home_engine(self):
        self.assertIn('<html lang="ar" dir="rtl">', self.html["ar"])
        original = self.html["fr"]
        self.assertIn('id="digiyPublicFirstV1"', original)
        self.assertIn("window.DIGIY_COM_MAITRE_V1", original)
        self.assertIn("digiy-home-single-i18n-v1", original)
        self.assertIn("localStorage.getItem('digiy-lang')", original)
        self.assertIn("params.get('lang')", original)
        self.assertIn("digiy-pwa-install.js", original)
        self.assertIn("/manifest.json", original)
        self.assertIn('id="digiyWorld8SeoNav"', original)
        self.assertEqual(self.parsed["fr"].h1, 1)

    def test_sitemap_contains_all_home_pages_without_duplicates(self):
        tree = ET.parse(ROOT / "sitemap.xml")
        ns = "{http://www.sitemaps.org/schemas/sitemap/0.9}"
        urls = [node.text for node in tree.findall(".//" + ns + "loc")]
        self.assertEqual(len(urls), len(set(urls)))
        for link in URL.values():
            self.assertIn(link, urls)
        self.assertIn(ORIGIN + "/ar/saly.html", urls)
        self.assertIn(ORIGIN + "/fiches/pap-piscine-saly.html", urls)


if __name__ == "__main__":
    unittest.main()
