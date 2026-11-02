"""Regression: Mandarin must work in the real Petite Côte territory directory, not only the Saly landing page."""
import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class MandarinPetiteCote(unittest.TestCase):
    def read(self, path):
        return (ROOT / path).read_text(encoding="utf-8")

    def test_actual_territory_selector_and_wolof_preserved(self):
        html = self.read("territoire.html")
        self.assertIn('data-lang="zh" lang="zh-CN"', html)
        self.assertIn('data-lang="wo" lang="wo"', html)
        self.assertIn("function syncChineseTerritoryShell()", html)
        self.assertIn("syncCountryCards(chinese)", html)
        self.assertIn("overflow:visible;flex-wrap:wrap", html)
        self.assertIn('id="zhLimit"', html)
        self.assertIn("document.addEventListener('DOMContentLoaded',function(){", html)

    def test_dynamic_territorial_labels_and_existing_security(self):
        js = self.read("assets/digiy-territoire-runtime-v1.js")
        self.assertIn("'wo','zh'", js)
        self.assertIn("zh:{tag:'查找本地专业人士", js)
        self.assertIn("zh:{transport:'DRIVER", js)
        self.assertIn("lang==='zh'?'zh-CN':lang", js)
        self.assertIn("(lang==='wo'||lang==='zh')&&n[0]==='guidance'", js)
        self.assertIn("我通过 DIGIYLYFE", js)
        self.assertIn("entry_type:'eq.professional'", js)
        self.assertIn("is_public:'eq.true'", js)
        self.assertIn("is_active:'eq.true'", js)

    def test_runtime_territory_names_in_chinese(self):
        runtime = json.loads(self.read("assets/digiy-core-runtime-v1.json"))
        self.assertEqual(runtime["countries"][0]["labels"]["zh"], "塞内加尔")
        self.assertEqual(runtime["countries"][0]["territories"][0]["labels"]["zh"], "小海岸")
        self.assertEqual(runtime["countries"][1]["labels"]["zh"], "法国")

    def test_chinese_discovery_pages_preserve_chinese_links(self):
        for path in ("zh-CN/index.html", "zh-CN/saly.html"):
            html = self.read(path)
            self.assertIn("&amp;lang=zh", html, path)
            self.assertNotIn("local=saly&amp;need=transport&amp;lang=en", html, path)
            self.assertIn('lang="zh-CN"', html)

    def test_territorial_projection_and_demos_are_translated(self):
        config = self.read("assets/digiy-petite-cote-config-v1.js")
        proj = self.read("assets/digiy-territoire-petite-cote-projection-v1.js")
        demo = self.read("demo-petite-cote.html")
        self.assertIn("var DATA={\nzh:", config)
        self.assertIn("小海岸 · 24 个分类示例", config)
        self.assertIn("if(x.lang==='zh'&&k==='guidance')return", proj)
        self.assertIn("x.lang==='zh'?'/zh-CN/saly.html'", proj)
        self.assertIn('data-l="zh" lang="zh-CN"', demo)
        self.assertIn("var T={zh:{badge:", demo)
        self.assertIn("t.searchParams.set('lang',l)", demo)


if __name__ == "__main__":
    unittest.main()
