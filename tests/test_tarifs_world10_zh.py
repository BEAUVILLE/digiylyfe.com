"""WORLD10 price page: Chinese copy, existing currencies and payment rules."""
from pathlib import Path
import re
import unittest

ROOT=Path(__file__).resolve().parents[1]
HTML=(ROOT/"tarifs-adherents-1.html").read_text(encoding="utf-8")

class TarifsWorld10(unittest.TestCase):
    def test_ten_language_buttons(self):
        self.assertEqual(re.findall(r'<button data-l="([^"]+)"',HTML),
          ["fr","en","es","pt","it","de","nl","ar","wo","zh"])
        self.assertIn('data-l="zh" lang="zh-CN">中文</button>',HTML)
        self.assertIn("document.getElementById('zhPriceNote').hidden=l!=='zh'",HTML)

    def test_chinese_translation_blocks_present(self):
        for block in ("T.zh={","CARNET_T.zh={","DRIVER_FR_T.zh={",
                      "GUIDE_LABELS.zh=","US_PRO_COPY.zh="):
            self.assertEqual(HTML.count(block),1,block)
        for phrase in ("简体中文说明","一次性付款","专业商家资料",
                       "直接联系","审核通过后"):
            self.assertIn(phrase,HTML)

    def test_price_constants_and_payment_sequence_unchanged(self):
        self.assertIn('const CARD_PRICES={SN:"15 000 FCFA",FR:"20 €",US:"20 $"};',HTML)
        self.assertIn("c==='SN'?'12 000 FCFA / mois':c==='FR'?'450 € / an':'$29 / month'",HTML)
        for amount in ("13 000 FCFA","250 €","700 €","450 €","299 $","290 $","45 €"):
            self.assertIn(amount,HTML)
        self.assertIn("document.getElementById('memberCta')",HTML)
        self.assertIn("approved",HTML)
        self.assertIn("PREMIUM",HTML)

if __name__=="__main__": unittest.main()
