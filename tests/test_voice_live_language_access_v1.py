"""LA VOIX: preserve eight actual localizations and expose WO/ZH homepage fallbacks."""
from pathlib import Path
import re
import unittest

ROOT = Path(__file__).resolve().parents[1]
PAGE = (ROOT / "voice-live.html").read_text(encoding="utf-8")

class LaVoixLocales(unittest.TestCase):
    def test_language_selector_is_honest_and_complete(self):
        nav = PAGE.split('<nav class="languageStrip"', 1)[1].split('</nav>', 1)[0]
        existing = re.findall(r'<button[^>]+data-lang="([^"]+)"', nav)
        self.assertEqual(existing, ["fr", "en", "es", "pt", "it", "de", "nl", "ar"])
        self.assertEqual(nav.count('class="digiyLocaleFallback"'), 2)
        self.assertIn('href="/?lang=wo" lang="wo" hreflang="wo"', nav)
        self.assertIn('href="/?lang=zh" lang="zh-CN" hreflang="zh-CN"', nav)
        self.assertIn('cette page n’est pas encore traduite en wolof', nav)
        self.assertIn('/assets/digiy-language-access-v1.css?v=20261112', PAGE)
        self.assertIn("function setLang(lang)", PAGE)
        self.assertIn("var TEXT=", PAGE)
        self.assertEqual(len(re.findall(r'<h1\\b', PAGE)), 1)

if __name__ == "__main__":
    unittest.main()
