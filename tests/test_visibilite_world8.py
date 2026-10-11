"""DIGIY WORLD8 Saly — 8 portes indexables, RTL arabe et maillage coherent."""
import json
import re
import unittest
from html.parser import HTMLParser
from pathlib import Path
from xml.etree import ElementTree as ET

BASE = Path(__file__).resolve().parents[1]
ROOT = "https://digiylyfe.com"
SLUGS = ("fr", "en", "es", "pt", "it", "de", "nl", "ar")
URLS = {lang: ("/saly.html" if lang == "fr" else f"/{lang}/saly.html") for lang in SLUGS}

class LinkParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.navs = []
        self.in_nav = 0
        self.h1 = 0
    def handle_starttag(self, tag, attrs):
        data = dict(attrs)
        if tag == "nav":
            self.in_nav += 1
        if tag == "a" and self.in_nav:
            self.navs.append(data)
        if tag == "link":
            self.links.append(data)
        if tag == "h1":
            self.h1 += 1
    def handle_endtag(self, tag):
        if tag == "nav" and self.in_nav:
            self.in_nav -= 1

class World8SEO(unittest.TestCase):
    def test_real_pages_are_bidirectionally_connected(self):
        for lang in SLUGS:
            html = (BASE / URLS[lang].lstrip("/")).read_text("utf8")
            parsed = LinkParser()
            parsed.feed(html)
            hreflang = {
                item["hreflang"]: item["href"]
                for item in parsed.links if item.get("rel") == "alternate" and "hreflang" in item
            }
            expected = {code: ROOT + rel for code, rel in URLS.items()}
            expected["x-default"] = ROOT + "/saly.html"
            self.assertEqual(hreflang, expected, lang)
            canonical = [x["href"] for x in parsed.links if x.get("rel") == "canonical"]
            self.assertEqual(canonical, [ROOT + URLS[lang]])
            self.assertIn(f'<html lang="{lang}"', html)
            seen = {link.get("lang") for link in parsed.navs if link.get("href") in URLS.values()}
            self.assertEqual(seen, set(SLUGS), lang)
            self.assertEqual(parsed.h1, 1, lang)

    def test_static_language_pages_and_privacy(self):
        for lang in SLUGS[1:]:
            html = (BASE / URLS[lang].lstrip("/")).read_text("utf8")
            self.assertIn('content="index,follow"', html)
            self.assertIn(f'&amp;lang={lang}', html)
            self.assertNotIn('http-equiv="refresh"', html)
            self.assertNotIn("location.replace(", html)
            self.assertNotIn("trackDigiyEvent", html)
            self.assertNotIn("wa.me/", html)
            data = json.loads(re.search(
                r'<script type="application/ld\+json">(.*?)</script>', html, re.S
            ).group(1))
            self.assertEqual(data["@type"], "CollectionPage")
            self.assertEqual(data["inLanguage"], lang)

    def test_arabic_reading_direction(self):
        html = (BASE / "ar/saly.html").read_text("utf8")
        css = (BASE / "assets/digiy-saly-international-v2.css").read_text("utf8")
        self.assertIn('<html lang="ar" dir="rtl">', html)
        self.assertIn('[dir="rtl"] .info', css)
        self.assertIn("سالي", html)
        self.assertNotIn('dir="ltr"', html)

    def test_sitemap_entries_and_unique_urls(self):
        xml = ET.parse(BASE / "sitemap.xml")
        ns = "{http://www.sitemaps.org/schemas/sitemap/0.9}"
        urls = [x.text for x in xml.findall(".//" + ns + "loc")]
        self.assertEqual(len(urls), len(set(urls)))
        for path in URLS.values():
            self.assertIn(ROOT + path, urls)

    def test_existing_pro_features_untouched(self):
        html = (BASE / "saly.html").read_text("utf8")
        self.assertIn('id="realGrid"', html)
        self.assertIn("19 900 FCFA", html)
        self.assertIn("13 000 FCFA", html)
        self.assertIn("digiy-petite-cote-config-v1.js", html)
        self.assertIn("salyPublicFirstV1", html)
        self.assertIn("/manifest.json", html)

if __name__ == "__main__":
    unittest.main()
