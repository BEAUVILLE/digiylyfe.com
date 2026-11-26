"""WO/中文 must be real home locales, not navigation links or French aliases."""
import json
import re
import unittest
from pathlib import Path
from html.parser import HTMLParser
ROOT=Path(__file__).resolve().parents[1]
HOME=(ROOT/'index.html').read_text()
ASSET=(ROOT/'assets/digiy-home-world10-v1.js').read_text()
HOME_I18N=(ROOT/'assets/digiy-home-i18n-v1.js').read_text()
def data(name):
    return json.JSONDecoder().raw_decode(ASSET.split('window.'+name+'=',1)[1])[0]
class Tags(HTMLParser):
    def __init__(self):super().__init__();self.items=[]
    def handle_starttag(self,t,a):self.items.append((t,dict(a)))
class HomeWorld10(unittest.TestCase):
    def test_ten_in_place_controls(self):
        nav=HOME.split('<nav class="languageStrip"',1)[1].split('</nav>',1)[0]
        p=Tags();p.feed(nav)
        self.assertEqual([a['data-lang'] for t,a in p.items if t=='button'],
                         ['fr','wo','zh','en','es','pt','it','de','nl','ar'])
        self.assertFalse(any(t=='a' for t,a in p.items))
        self.assertIn('href="/prototypes/digiy-wolof-v1/prototype.html"',HOME)
        self.assertIn('href="/zh-CN/"',HOME)
    def test_both_dictionaries_cover_every_rendered_key(self):
        dictionaries=data('DIGIY_HOME_WORLD10')
        keys=set(re.findall(r'data-i18n="([^"]+)"',HOME.split('<body>')[1].split('</main>')[0]))
        # New explanatory card labels live in the final home i18n overlay.
        match=re.search(r'var DIGIY_ENTRY_INFO_COPY=(.*?);\n',HOME_I18N)
        self.assertIsNotNone(match)
        overlay=json.loads(match.group(1))
        lite_match=re.search(r'var DIGIY_VITRINE_LITE_COPY=(.*?);\n',HOME_I18N)
        self.assertIsNotNone(lite_match)
        lite=json.loads(lite_match.group(1))
        focus_match=re.search(r'var DIGIY_SARLAT_FOCUS_COPY=(.*?);\n',HOME_I18N)
        self.assertIsNotNone(focus_match)
        focus=json.loads(focus_match.group(1))
        self.assertEqual(set(focus),set(['fr','wo','zh','en','es','pt','it','de','nl','ar']))
        self.assertTrue(all(set(['franceAnchorTitle','franceAnchorText','franceAnchorSarlat','franceAnchorFrance']) <= set(values) for values in focus.values()))
        trades_match=re.search(r'var DIGIY_VITRINE_TRADES=(.*?);\n',HOME_I18N)
        self.assertIsNotNone(trades_match)
        trades=json.loads(trades_match.group(1))
        tariff_match=re.search(r'var DIGIY_TARIFF_NAV_COPY=(.*?);\n',HOME_I18N)
        self.assertIsNotNone(tariff_match)
        tariff=json.loads(tariff_match.group(1))
        # Les textes peuvent contenir le caractère « ; » à l'intérieur de JSON.
        # Le décodeur JSON est plus fiable qu'une capture jusqu'au premier point-virgule.
        voice_default=json.JSONDecoder().raw_decode(
            HOME_I18N.split('var DIGIY_MEMBER_VOICE_DEFAULT=',1)[1])[0]
        voice_wo=json.JSONDecoder().raw_decode(
            HOME_I18N.split('var DIGIY_MEMBER_VOICE_WO=',1)[1])[0]
        self.assertEqual(set(voice_default),set(voice_wo))
        self.assertEqual(len(voice_wo),6)
        self.assertIn('TEXT[code].entryProPrice=existingPrice;',HOME_I18N)
        mobile=json.loads(re.search(r'var mobileCopy=(\{[^\n]+\})\[lang\];',HOME_I18N).group(1))
        mobile_keys=('mobileRailTitle','mobileRailTag','mobileDaily','mobileDailyNote')
        self.assertEqual(set(mobile),set(['fr','wo','zh','en','es','pt','it','de','nl','ar']))
        for lang, values in mobile.items():
            self.assertEqual(len(values),len(mobile_keys),lang)
            self.assertTrue(all(v.strip() for v in values),lang)
            self.assertIn('400',values[2],lang)
            self.assertIn('29',values[3],lang)
        for lang in ['wo','zh']:
            merged=dict(dictionaries[lang])
            merged.update(zip(mobile_keys,mobile[lang]))
            existing_price=merged['entryProText']
            merged.update(overlay[lang])
            merged.update(lite[lang])
            merged.update(focus[lang])
            merged['liteTradeLine']=trades[lang]
            merged['liteTariffsNav'],merged['liteTariffsShort'],merged['liteTariffsFullCta']=tariff[lang]
            merged['entryProPrice']=existing_price
            merged.update(voice_wo if lang=='wo' else voice_default)
            self.assertTrue(keys <= set(merged), sorted(keys-set(merged)))
            self.assertTrue(all(merged[key].strip() for key in keys))
        self.assertIn('kiliyaan',dictionaries['wo']['clarTitle'])
        self.assertIn('客户',dictionaries['zh']['clarTitle'])
        self.assertNotEqual(dictionaries['wo']['clarTitle'],dictionaries['zh']['clarTitle'])
    def test_owned_tools_and_dynamic_ui_are_translated(self):
        ui=data('DIGIY_HOME_WORLD10_UI')
        for lang in ['wo','zh']:
            self.assertEqual(len(ui['owner'][lang]),9)
            self.assertIn('13 000',ui['owner'][lang][7])
            self.assertEqual(set(ui['campus'][lang]),set(ui['campus']['wo']))
            self.assertEqual(len(ui['pwa'][lang]),8)
            self.assertEqual(len(ui['pwaDesktop'][lang]),3)
            for amount in ['12 000','29 € HT','$29']:
                self.assertIn(amount,ui['membership'][lang]['all'])
    def test_saly_audio_and_free_paid_boundaries_remain(self):
        self.assertIn('href="/saly.html" data-i18n="v1TerritoryCta"',HOME)
        self.assertIn('https://digiylyfe.com/territoire.html?zone=petite-cote',HOME)
        d=data('DIGIY_HOME_WORLD10')
        for lang in ['wo','zh']:
            self.assertTrue(d[lang]['cardPaidTitle'])
            self.assertTrue(d[lang]['profilePaidTitle'])
            self.assertIn('15 000',d[lang]['entryProText'])
        # The backend payload, endpoint, adult consent and anti-spam flow are unchanged.
        campus=(ROOT/'assets/digiy-campus-interest-v2.js').read_text()
        self.assertIn('source_lang:lang()',campus)
        self.assertIn("var LANGS=['fr','en','es','pt','it','de','nl','ar']",campus)
        self.assertIn('website:website',campus)
    def test_initial_url_alias_persistence_and_audio_scope(self):
        self.assertIn("lang==='zh'?'zh-CN':lang",HOME_I18N)
        self.assertIn(".replace('zh-cn','zh')",HOME_I18N)
        self.assertIn("localStorage.setItem('digiy-lang',lang)",HOME_I18N)
        self.assertIn('La VOIX déggul wolof',data('DIGIY_HOME_WORLD10')['wo']['voiceSearchNote'])
if __name__=='__main__':unittest.main()
