"""Protect the public entrance, free/paid boundary and opt-in film."""
import re
import unittest
from pathlib import Path
from html.parser import HTMLParser

ROOT = Path(__file__).resolve().parents[1]
HOME = (ROOT / 'index.html').read_text()
BODY = HOME.split('<body>', 1)[1].split('</main>', 1)[0]

class Nodes(HTMLParser):
    def __init__(self):
        super().__init__()
        self.items = []
    def handle_starttag(self, tag, attrs):
        self.items.append((tag, dict(attrs)))

class HumanHomepage(unittest.TestCase):
    def test_promise_once_and_two_precise_actions(self):
        self.assertEqual(BODY.count('DIGIY aide vos clients à ne pas vous oublier.'), 1)
        hero = BODY.split('id="digiyClarity"', 1)[1].split('</section>', 1)[0]
        self.assertEqual(re.findall(r'href="([^"]+)"', hero),
                         ['/annuaire.html#recherche', '/annuaire.html#inscription'])
        self.assertEqual(len(re.findall(r'<h1\b', BODY)), 1)
        self.assertNotIn('Deux chemins', BODY)

    def test_human_paths_before_film_and_vision(self):
        markers = ['id="digiyClarity"', 'aria-label="Preuves terrain DIGIYLYFE"',
                   'id="territoires"', 'id="digiyPublicFirstV1"',
                   'id="solutions-pro"', 'id="digiyFilmVitrine"', 'id="digiyInternational"']
        positions = [BODY.index(marker) for marker in markers]
        self.assertEqual(positions, sorted(positions))

    def test_three_existing_solutions_directly_below_main_hero(self):
        hero_close = BODY.index('</div>\\n<section class="digiyEntryChoice"', BODY.index('id="digiyClarity"'))
        entry = BODY.index('<section class="digiyEntryChoice" id="digiyEntryChoice"')
        first_proof = BODY.index('<section class="section" aria-label="Preuves terrain DIGIYLYFE">')
        self.assertLess(BODY.index('id="digiyClarity"'), hero_close)
        self.assertLess(hero_close, first_proof)
        self.assertEqual(BODY.count('id="digiyEntryChoice"'), 1)
        self.assertEqual(entry, hero_close + len('</div>\\n'))
        section = BODY[entry:first_proof]
        self.assertEqual(section.count('class="digiyEntryDoor '), 3)
        for href in ['#digiyPublicFirstV1', 'https://digiylyfe.com/tarifs-adherents-1.html',
                     'https://digiylyfe.com/tarifs-loc-v2.html']:
            self.assertIn('href="' + href + '"', section)

    def test_film_never_fetches_before_opt_in(self):
        film = BODY.split('id="digiyFilmVitrine"', 1)[1].split('</section>', 1)[0]
        nodes = Nodes(); nodes.feed(film)
        frame = next(a for t, a in nodes.items if t == 'iframe')
        self.assertNotIn('src', frame)
        self.assertTrue(frame['data-src'].startswith('https://drive.google.com/'))
        self.assertIn("panel.open && frame", HOME)
        self.assertNotIn('autoplay', film)

    def test_real_professionals_and_ten_existing_language_entries(self):
        for url in ['astou-boutique', 'babacar-plombier-pro', 'mane-gning',
                    'sarlat-chez-baptiste', 'partenaire-lamine', 'kourant', 'mbaye-macon']:
            self.assertIn('https://' + url + '.digiylyfe.com/', BODY)
        nav = BODY.split('<nav class="languageStrip"', 1)[1].split('</nav>', 1)[0]
        self.assertEqual(len(re.findall(r'class="langBtn', nav)), 10)
        self.assertIn('data-lang="wo"', nav)
        self.assertIn('/prototypes/digiy-wolof-v1/prototype.html', BODY)
        self.assertIn('data-lang="zh"', nav)
        self.assertIn('/zh-CN/', BODY)

    def test_latest_saly_direct_door_preserved(self):
        self.assertIn('href="/saly.html" data-i18n="v1TerritoryCta"', BODY)

    def test_ten_language_routes_and_translated_new_choices(self):
        for lang in ['fr', 'en', 'es', 'pt', 'it', 'de', 'nl', 'ar', 'zh-CN', 'wo']:
            path = ('index.html' if lang == 'fr' else
                    'prototypes/digiy-wolof-v1/prototype.html' if lang == 'wo' else
                    lang + '/index.html')
            self.assertTrue((ROOT / path).is_file(), lang)
        for path in ['zh-CN/index.html', 'prototypes/digiy-wolof-v1/prototype.html']:
            text = (ROOT / path).read_text()
            self.assertIn('/annuaire.html#recherche', text)
            self.assertIn('/annuaire.html#inscription', text)
            self.assertIn('0 %' if path.startswith('prototypes') else '0%', text)
        wolof = (ROOT / 'prototypes/digiy-wolof-v1/prototype.html').read_text()
        self.assertIn("const audioEntries=Object.keys(ui.wo)", wolof)
        self.assertIn('woAudioPanel', wolof)

    def test_saly_labels_on_all_ten_routes_and_other_territories(self):
        import json
        labels = json.loads(re.search(r'var DIGIY_PUBLIC_V1=(.*?);\n', HOME)[1])
        for lang in ['en', 'es', 'pt', 'it', 'de', 'nl', 'ar']:
            text = (ROOT / lang / 'index.html').read_text()
            self.assertIn(labels[lang]['v1TerritoryCta'], text)
            self.assertIn('href="/' + lang + '/saly.html"', text)
        self.assertIn('📍 探索萨利 →', (ROOT / 'zh-CN/index.html').read_text())
        self.assertIn('href="/saly.html">📍 Xool Saly →',
                      (ROOT / 'prototypes/digiy-wolof-v1/prototype.html').read_text())
        for route in ['senegal.html', 'dakar.html', 'bordeaux.html', 'paris.html',
                      'france.html', 'maroc.html', 'miami.html']:
            self.assertIn('https://digiylyfe.com/' + route, BODY)
            self.assertTrue((ROOT / route).is_file())
        for zone in ['petite-cote', 'vallee-dordogne']:
            self.assertIn('https://digiylyfe.com/territoire.html?zone=' + zone, BODY)
        self.assertIn('id="digiyMoroccoHubDoor"', BODY)

    def test_paid_offers_and_legacy_anchors_preserved(self):
        for text in ['Carte DIGIY payante', 'Fiche professionnelle payante',
                     'Présence professionnelle', '15 000 FCFA', '450 € / AN',
                     '21 000 FCFA', '28 000 FCFA', '75 €']:
            self.assertIn(text, BODY)
        for anchor in ['digiyAnnuaireV1', 'digiyEntryChoice', 'digiyInstallBand',
                       'digiyFavorisBar', 'comment-ca-marche', 'digiyShareCard']:
            self.assertIn('id="' + anchor + '"', BODY)

if __name__ == '__main__':
    unittest.main()
