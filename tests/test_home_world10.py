"""WO/中文 must be real home locales, not navigation links or French aliases."""
import json
import re
import unittest
from pathlib import Path
from html.parser import HTMLParser
ROOT=Path(__file__).resolve().parents[1]
HOME=(ROOT/'index.html').read_text()
ASSET=(ROOT/'assets/digiy-home-world10-v1.js').read_text()
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
        for lang in ['wo','zh']:
            self.assertTrue(keys <= set(dictionaries[lang]), sorted(keys-set(dictionaries[lang])))
            self.assertTrue(all(dictionaries[lang][key].strip() for key in keys))
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
            for amount in ['12 000','450','$29']:
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
        self.assertIn("lang==='zh'?'zh-CN':lang",HOME)
        self.assertIn(".replace('zh-cn','zh')",HOME)
        self.assertIn("localStorage.setItem('digiy-lang',lang)",HOME)
        self.assertIn('La VOIX déggul wolof',data('DIGIY_HOME_WORLD10')['wo']['voiceSearchNote'])
if __name__=='__main__':unittest.main()
