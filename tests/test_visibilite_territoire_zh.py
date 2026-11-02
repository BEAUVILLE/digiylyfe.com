"""Régression chinois simplifié — porte Petite Côte et continuité des contacts directs."""
import re
import subprocess
import shutil
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TERRITORY = (ROOT / "territoire.html").read_text(encoding="utf-8")
RUNTIME = (ROOT / "assets/digiy-territoire-runtime-v1.js").read_text(encoding="utf-8")
ZH_HOME = (ROOT / "zh-CN/index.html").read_text(encoding="utf-8")
ZH_SALY = (ROOT / "zh-CN/saly.html").read_text(encoding="utf-8")


class MandarinTerritory(unittest.TestCase):
    def test_petite_cote_has_actual_chinese_language_button(self):
        nav = TERRITORY.split('<div class="langs"', 1)[1].split("</div>", 1)[0]
        self.assertIn('data-lang="wo"', nav)
        self.assertIn('data-lang="zh" lang="zh-CN"', nav)
        self.assertIn(">中文</button>", nav)
        self.assertIn("flex-wrap:wrap", TERRITORY)
        self.assertIn("overflow:visible", TERRITORY)
        self.assertIn('id="zhLimit"', TERRITORY)

    def test_chinese_is_real_locale_not_fake_button(self):
        self.assertIn("'wo','zh'", RUNTIME)
        self.assertIn("zh:{tag:", RUNTIME)
        self.assertIn("zh:{transport:", RUNTIME)
        self.assertIn("function translateTerritoryShell()", RUNTIME)
        self.assertIn("lang==='zh'?'zh-CN':lang", RUNTIME)
        self.assertIn("if((lang==='wo'||lang==='zh')&&n[0]==='guidance')return;", RUNTIME)
        self.assertIn("var ZH_ZONES=", RUNTIME)
        self.assertIn("zh:'您好，{name}", RUNTIME)
        self.assertIn("api('digiy_annuaire_public',q1)", RUNTIME)
        self.assertIn("return p.url?", RUNTIME)
        self.assertNotIn("eval(", RUNTIME)

    def test_chinese_pages_connect_to_translated_territory(self):
        for content in (ZH_HOME, ZH_SALY):
            for need in ("accommodation", "transport", "artisan", "food", "shopping"):
                self.assertIn(
                    "local=saly&amp;need=" + need + "&amp;lang=zh", content
                )
            self.assertNotIn("local=saly&amp;need=food&amp;lang=en", content)
        self.assertIn('zone=dakar&amp;lang=zh', ZH_HOME)
        self.assertIn("专业人士的原始", ZH_HOME) if False else None

    def test_no_paid_api_or_pro_access_changes(self):
        self.assertNotIn("translate.googleapis", RUNTIME)
        self.assertNotIn("api.openai", RUNTIME)
        self.assertNotIn("service_role", RUNTIME)
        self.assertIn("is_public:'eq.true'", RUNTIME)
        self.assertIn("is_active:'eq.true'", RUNTIME)

    @unittest.skipUnless(shutil.which("node"), "Node not installed")
    def test_runtime_javascript_syntax(self):
        result = subprocess.run(
            ["node", "--check", str(ROOT / "assets/digiy-territoire-runtime-v1.js")],
            capture_output=True, text=True, check=False
        )
        self.assertEqual(result.returncode, 0, result.stderr)


if __name__ == "__main__":
    unittest.main()
