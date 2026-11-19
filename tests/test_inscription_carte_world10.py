"""DIGIY WORLD10 · guard the legacy card inquiry form, without sending messages."""
import json
import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PAGE = (ROOT / "inscription.html").read_text(encoding="utf-8")
LANGS = {"fr", "wo", "zh", "en", "es", "pt", "it", "de", "nl", "ar"}


class InscriptionCarteWorld10(unittest.TestCase):
    def setUp(self):
        base = re.search(r"const T = (\{.*?\});\s*/\* WORLD10", PAGE, re.S)
        extra = re.search(r"Object\.assign\(T,(\{.*?\})\);\s*const DIGIY_PHONE", PAGE, re.S)
        self.assertIsNotNone(base)
        self.assertIsNotNone(extra)
        self.translations = dict(json.loads(base.group(1)))
        self.translations.update(json.loads(extra.group(1)))

    def test_ten_locales_have_complete_fields(self):
        self.assertEqual(set(self.translations), LANGS)
        keys = set(self.translations["fr"])
        for code, fields in self.translations.items():
            self.assertEqual(set(fields), keys, code)
            self.assertEqual(len(fields["jobs"]), 7, code)
            self.assertEqual(len(fields["pays"]), 7, code)
            self.assertTrue(all(str(v).strip() for v in fields.values()), code)
            self.assertIn('data-l="' + code + '"', PAGE)

    def test_workflow_is_not_automatically_sent(self):
        self.assertIn("if(!ready())return", PAGE)
        self.assertIn('location.href="https://wa.me/"+DIGIY_PHONE', PAGE)
        self.assertIn('location.href="sms:"+DIGIY_PHONE_SMS', PAGE)
        self.assertIn('encodeURIComponent(buildMessage())', PAGE)
        self.assertIn('function buildMessage()', PAGE)
        self.assertIn('id="f"', PAGE)

    def test_language_from_url_and_arabic_rtl(self):
        self.assertIn('new URLSearchParams(location.search).get("lang")', PAGE)
        self.assertIn('document.documentElement.dir=(lang==="ar"?"rtl":"ltr")', PAGE)
        self.assertIn('data-l="wo" lang="wo"', PAGE)
        self.assertIn('data-l="zh" lang="zh-CN"', PAGE)


if __name__ == "__main__":
    unittest.main()
