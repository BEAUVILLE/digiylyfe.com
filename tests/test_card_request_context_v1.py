"""DIGIYLYFE — de la page métier au dossier de carte numérique.

Contrôles statiques et sans requêtes : formulaire lié à Supabase V10.
La fonction sauvegarde activity_summary et requested_module, pas le champ notes.
"""
import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CARD = (ROOT / "carte-gratuite.html").read_text(encoding="utf-8")
PARIS = (ROOT / "assets/digiy-paris-places-v1.js").read_text(encoding="utf-8")
MIAMI = (ROOT / "assets/digiy-miami-places-v1.js").read_text(encoding="utf-8")
DEMO_PARIS = (ROOT / "demo-paris.html").read_text(encoding="utf-8")
DEMO_MIAMI = (ROOT / "demo-miami.html").read_text(encoding="utf-8")


class CardRequestContext(unittest.TestCase):
    def test_payload_uses_fields_accepted_by_the_server(self):
        self.assertIn("activity_summary:cardRequestMetadata(l).activity_summary", CARD)
        self.assertIn("requested_module:cardRequestMetadata(l).requested_module", CARD)
        self.assertIn("source_lang:l", CARD)
        self.assertIn("consent:consent.checked", CARD)
        self.assertIn("ENDPOINT='https://wesqmwjjtsefyjnluosj.supabase.co/functions/v1/digiy-network-card-request-submit'", CARD)
        self.assertNotIn("consent:consent.checked,notes:", CARD)
        self.assertIn("const note=(about.value||'').trim()", CARD)

    def test_paris_context_is_strictly_for_france(self):
        self.assertIn("requestedTerritory==='paris'&&country.value==='FR'", CARD)
        self.assertIn("PARIS_SIGNATURES", CARD)
        self.assertIn("qp.get('arr')", CARD)
        self.assertIn("qp.get('quartier')", CARD)
        self.assertIn("Arrondissement : ", CARD)
        self.assertIn("DIGIY PARIS", CARD)
        self.assertIn("card.dataset.parisCard", PARIS)
        self.assertIn("queryVals(c.id)", PARIS)
        self.assertIn("cardParams.arr=arr", DEMO_PARIS)
        self.assertIn("cardParams.quartier=quarter", DEMO_PARIS)

    def test_miami_context_is_strictly_for_usa(self):
        self.assertIn("requestedTerritory==='miami'&&country.value==='US'", CARD)
        self.assertIn("MIAMI_SIGNATURES", CARD)
        self.assertIn("DIGIY MIAMI", CARD)
        self.assertIn("request.dataset.miamiCard", MIAMI)
        self.assertIn("requestParams.quartier=state.quartier", MIAMI)
        self.assertIn("cardParams.quartier=quarter", DEMO_MIAMI)

    def test_no_loss_of_wo_zh_language_preference(self):
        self.assertIn("language==='wo'||language==='zh'", CARD)
        self.assertIn("Langue demandée : ", CARD)
        self.assertIn("source_lang:l", CARD)

    def test_no_change_to_card_prices_or_no_payment_rule(self):
        self.assertIn("const CARD_PRICES={SN:'15 000 FCFA',FR:'20 €',US:'20 $'}", CARD)
        self.assertIn("networkCardForm.addEventListener('submit'", CARD)
        self.assertNotIn("checkout.stripe", CARD)
        self.assertNotIn("sendwave", CARD.lower())


if __name__ == "__main__":
    unittest.main()
