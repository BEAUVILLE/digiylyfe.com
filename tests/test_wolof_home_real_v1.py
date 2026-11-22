"""DIGIYLYFE accueil — les boutons WO/ZH doivent afficher les bons textes.

Pas de requête réseau ; protège le texte, le CSS et les tarifs existants.
"""
import json
import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HOME = (ROOT / "index.html").read_text(encoding="utf-8")
I18N = (ROOT / "assets/digiy-home-i18n-v1.js").read_text(encoding="utf-8")


def dictionary(name):
    match = re.search(r"var " + re.escape(name) + r"=(\{.*?\});", I18N, re.S)
    if not match:
        raise AssertionError("Dictionnaire manquant : " + name)
    return json.loads(match.group(1))


class WolofHomeReal(unittest.TestCase):
    def test_public_and_pro_cards_are_in_wolof_not_french_fallback(self):
        d = dictionary("DIGIY_ENTRY_INFO_COPY")
        self.assertEqual(set(d["fr"]), set(d["wo"]))
        for key in d["wo"]:
            self.assertNotEqual(d["wo"][key], d["fr"][key], key)
        self.assertIn("DIGIYLYFE", d["wo"]["entryPublicText"])
        self.assertIn("0 %", d["wo"]["entryProText"])

    def test_essential_offers_are_in_wolof_and_prices_stable(self):
        d = dictionary("DIGIY_VITRINE_LITE_COPY")
        self.assertEqual(set(d["fr"]), set(d["wo"]))
        for k in ("liteOfferKicker","liteOfferTitle","liteFreeTitle","liteFreePrice","liteFreeText","liteMemberTitle","liteMemberPrice","liteMemberText","liteB2B","liteMenu"):
            self.assertNotEqual(d["wo"][k], d["fr"][k], k)
        self.assertIn("12 000 FCFA", d["wo"]["liteMemberPrice"])
        self.assertIn("29 € HT", d["wo"]["liteMemberPrice"])

    def test_hero_unity_trade_line_and_tariffs_are_localized(self):
        h = dictionary("DIGIY_HERO_UNITY_COPY")
        self.assertNotEqual(h["wo"], h["fr"])
        b = dictionary("BUREAU_UNIVERSEL_COPY")
        self.assertNotEqual(b["wo"]["clarTitle"], b["fr"]["clarTitle"])
        trades = dictionary("DIGIY_VITRINE_TRADES")
        self.assertNotEqual(trades["wo"], trades["fr"])
        labels = dictionary("DIGIY_TARIFF_NAV_COPY")
        self.assertEqual(len(labels["wo"]), 3)
        self.assertNotEqual(labels["wo"], labels["fr"])

    def test_owner_preview_is_visible_only_for_selected_wolof_or_chinese(self):
        self.assertIn('html[lang^="wo"] .ownerModulesLang[data-owner-lang="wo"]', HOME)
        self.assertIn('html[lang^="zh"] .ownerModulesLang[data-owner-lang="zh"]', HOME)
        self.assertIn('.ownerModulesLang{display:none}', HOME)
        self.assertEqual(len(re.findall(r'<div class="ownerModulesLang" data-owner-lang="', HOME)), 10)

    def test_voice_localized_without_changing_contact_recipient(self):
        for key in ("memberVoiceTitle","memberVoiceLead","memberVoiceIdea","memberVoiceNeed","memberVoiceCollab","memberVoiceNote"):
            self.assertIn('data-i18n="'+key+'"', HOME)
        self.assertIn("DIGIY_MEMBER_VOICE_WO", I18N)
        self.assertIn("https://wa.me/221771342889?text=", I18N)
        self.assertIn("encodeURIComponent(ideas[i])", I18N)
        self.assertIn("a.dataset.digiyOriginalHref", I18N)
        self.assertIn("lang==='wo'", I18N)

    def test_does_not_change_four_card_prices(self):
        for price in ("Sénégal : 15 000 FCFA", "France : 20 €", "Maroc : 250 MAD", "USA : 20 $"):
            self.assertIn(price, HOME)
        self.assertIn('data-i18n="entryProPrice"', HOME)


if __name__ == "__main__":
    unittest.main()
