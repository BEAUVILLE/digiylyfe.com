"""Protect the public entrance, free/paid boundary and opt-in film."""
import re
import unittest
from pathlib import Path
from html.parser import HTMLParser

ROOT = Path(__file__).resolve().parents[1]
HOME = (ROOT / 'index.html').read_text()
HOME_I18N = (ROOT / 'assets/digiy-home-i18n-v1.js').read_text(encoding='utf-8')
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
        markers = ['id="pays-directs"', 'id="acces-rapides-pro"', 'id="digiyClarity"', 'aria-label="Preuves terrain DIGIYLYFE"',
                   'id="digiyEntryChoice"', 'id="outils-directs"', 'id="preuves-outils"',
                   'id="offres-essentielles"', 'id="questions-frequentes"',
                   'id="territoires"', 'id="digiyPublicFirstV1"',
                   'id="solutions-pro"', 'id="digiyFilmVitrine"', 'id="digiyInternational"']
        positions = [BODY.index(marker) for marker in markers]
        self.assertEqual(positions, sorted(positions))

    def test_solutions_position_and_explanatory_cards(self):
        hero = BODY.index('id="digiyClarity"')
        entry = BODY.index('<section class="digiyEntryChoice" id="digiyEntryChoice"')
        proof = BODY.index('<section class="section" aria-label="Preuves terrain DIGIYLYFE">')
        self.assertLess(hero, proof)
        self.assertLess(proof, entry)
        self.assertEqual(BODY.count('id="digiyEntryChoice"'), 1)
        section = BODY[entry:].split('</section>', 1)[0]  # Core Public/Pro cards only.
        self.assertEqual(section.count('class="digiyEntryDoor '), 2)
        self.assertEqual(len(re.findall(r'<article class="digiyEntryDoor (?:public|pro) digiyEntryInfo">', section)), 2)
        # Hero owns the Public/Pro CTAs; explanatory cards are not links.
        self.assertEqual(re.findall(r'href="([^"]+)"', section), [])
        self.assertEqual(section.count('data-i18n="liteTradeLine"'), 1)
        self.assertIn('Artisans · Commerçants · Hébergeurs', section)
        self.assertIn('data-i18n="entryPublicMeaning"', section)
        self.assertIn('data-i18n="entryProMeaning"', section)
        self.assertNotIn('data-i18n="entryProPrice"', section)
        offers = BODY.split('id="offres-essentielles"', 1)[1].split('</section>', 1)[0]
        self.assertIn('data-i18n="entryProPrice"', offers)
        self.assertIn('12 000 FCFA / mois', offers)
        self.assertIn('29 € HT / mois', offers)
        self.assertIn('href="/tarifs-loc-v2.html"', offers)
        self.assertIn('href="/tarifs-adherents-1.html" data-i18n="liteTariffsFullCta"', offers)

    def test_direct_membership_tariffs_visible_in_header(self):
        header = BODY.split('<header class="topbar">', 1)[1].split('</header>', 1)[0]
        self.assertIn('href="/tarifs-adherents-1.html"', header)
        self.assertIn('class="digiyTarifsAccess"', header)
        self.assertIn('data-i18n="liteTariffsNav"', header)
        self.assertIn('data-i18n="liteTariffsShort"', header)
        self.assertIn('class="digiyMenuAccess" href="/open.html"', header)
        # OPEN is the direct lightweight entry; the complete menu stays reachable.
        portal = (ROOT / 'open.html').read_text(encoding='utf-8')
        self.assertIn('href="/menu-universel-v1.html"', portal)
        self.assertIn('href="/"', portal)
        self.assertEqual(portal.count('class="app" data-route href='), 9)
        self.assertLess(len(portal.encode('utf-8')), 20000)
        self.assertNotRegex(portal, r'<script\s+src=')
        self.assertEqual(header.count('href="/tarifs-adherents-1.html"'), 1)
        self.assertEqual(re.findall(r'href="([^"]+)"', BODY.split('id="digiyClarity"', 1)[1].split('</section>', 1)[0]),
                         ['/annuaire.html#recherche', '/annuaire.html#inscription'])
        self.assertTrue((ROOT / 'tarifs-adherents-1.html').is_file())
        self.assertIn('.digiyTarifsAccess{min-height:44px', HOME)

    def test_gold_signature_and_official_qr_visible_without_details(self):
        # Existing gold identity asset, not a generated copy or a new brand.
        gold = ROOT / 'assets/presse/signature-digiy-or.png'
        qr_page = ROOT / 'qr.html'
        self.assertTrue(gold.is_file())
        self.assertTrue(qr_page.is_file())
        before_details = BODY.split('<details class="digiyVitrineDetails"', 1)[0]
        self.assertEqual(before_details.count('class="digiyGoldSignature"'), 1)
        self.assertIn('src="/assets/presse/signature-digiy-or.png"', before_details)
        self.assertIn('alt="Symbole infini doré officiel DIGIY"', before_details)
        self.assertIn('href="/qr.html" aria-label="Ouvrir le QR officiel DIGIYLYFE"', before_details)
        self.assertLess(before_details.index('id="pays-directs"'),
                        before_details.index('class="digiyGoldSignature"'))
        self.assertIn('.digiyGoldSignature img{width:64px;', HOME)
        self.assertIn('@media(max-width:420px){.digiyGoldSignature{', HOME)
        # Do not disturb the existing menu, two human journeys and the old card.
        self.assertIn('href="/menu-universel-v1.html"', BODY)
        self.assertIn('id="digiyCardFixedPanel"', BODY)
        self.assertIn('id="digiyCardAnimatedPanel"', BODY)

    def test_explanatory_copy_has_ten_languages_and_preserves_prices(self):
        import json
        match = re.search(r'var DIGIY_ENTRY_INFO_COPY=(.*?);\n', HOME_I18N)
        self.assertIsNotNone(match)
        copy = json.loads(match.group(1))
        expected = {'fr', 'wo', 'zh', 'en', 'es', 'pt', 'it', 'de', 'nl', 'ar'}
        self.assertEqual(set(copy), expected)
        for lang in expected:
            self.assertTrue(all(copy[lang].get(key) for key in
                            ('entryPublicKicker', 'entryPublicTitle', 'entryPublicText', 'entryPublicMeaning',
                             'entryProKicker', 'entryProTitle', 'entryProText', 'entryProMeaning')), lang)
        self.assertIn('TEXT[code].entryProPrice=existingPrice', HOME_I18N)

    def test_trade_line_covers_ten_languages_without_navigation(self):
        import json
        match = re.search(r'var DIGIY_VITRINE_TRADES=(.*?);\n', HOME_I18N)
        self.assertIsNotNone(match)
        translations = json.loads(match.group(1))
        self.assertEqual(set(translations), {'fr', 'wo', 'zh', 'en', 'es', 'pt', 'it', 'de', 'nl', 'ar'})
        self.assertTrue(all(value.strip() for value in translations.values()))
        self.assertNotEqual(translations['wo'], translations['fr'])  # Wolof présent, à faire relire par locuteur natif.
        self.assertIn('Tabaxkat', translations['wo'])
        self.assertIn('Fournisseurs', translations['fr'])

    def test_core_blocks_and_menu_anchor_rescue(self):
        main_before_details = BODY.split('<details class="digiyVitrineDetails"', 1)[0]
        # 5 historic sections, 2 direct entrances and the visible photo territory gallery.
        self.assertEqual(main_before_details.count('<section '), 8)
        self.assertEqual(main_before_details.count('id="territoires-detail"'), 1)
        photo_gallery = main_before_details.split('id="territoires-detail"', 1)[1]
        self.assertEqual(photo_gallery.count('class="territoryCard"'), 7)
        for fav in ('territoire-petite-cote', 'territoire-dakar',
                    'territoire-dordogne', 'territoire-bordeaux',
                    'territoire-paris', 'territoire-miami', 'territoire-maroc'):
            self.assertIn('data-fav-id="' + fav + '"', photo_gallery)
        self.assertEqual(main_before_details.count('id="pays-directs"'), 1)
        self.assertEqual(main_before_details.count('id="outils-directs"'), 1)
        self.assertEqual(BODY.count('id="territoires"'), 1)
        self.assertIn('id="territoires-detail"', BODY)
        self.assertIn('href="/menu-universel-v1.html"', main_before_details)
        self.assertIn('id="digiyVitrineDetails"', BODY)
        self.assertIn('</details>\n    <footer class="footer">', BODY)
        self.assertIn("window.addEventListener('hashchange',reveal)", HOME)
        self.assertIn("panel.open=true", HOME)

    def test_world10_countries_and_direct_modules(self):
        import json
        script_path = ROOT / 'assets/digiy-vitrine-portes-world10-v1.js'
        script = script_path.read_text(encoding='utf-8')
        keys = json.loads(re.search(r'var KEYS=(.*?);', script).group(1))
        translations = json.loads(re.search(r'var TEXT=(.*?);', script).group(1))
        self.assertEqual(set(translations), {'fr', 'wo', 'zh', 'en', 'es', 'pt', 'it', 'de', 'nl', 'ar'})
        self.assertTrue(all(len(t) == len(keys) and all(t) for t in translations.values()))
        self.assertEqual(len(keys), 18)
        world = BODY.split('id="pays-directs"', 1)[1].split('</section>', 1)[0]
        for path in ['/senegal.html', '/france.html', '/maroc.html', '/miami.html']:
            self.assertIn('href="' + path + '"', world)
        self.assertEqual(world.count('<a href='), 4)
        direct = BODY.split('id="outils-directs"', 1)[1].split('</section>', 1)[0]
        self.assertEqual(direct.count('class="digiyFrontBridge"'), 1)
        self.assertIn('href="/annuaire.html#pont-metiers"', direct)
        self.assertEqual(direct.count('class="digiyFrontModules"'), 1)
        self.assertEqual(direct.split('class="digiyFrontModules"', 1)[1].count('<a href='), 8)
        self.assertLess(BODY.index('class="languageStrip"'), BODY.index('id="pays-directs"'))
        self.assertLess(BODY.index('id="pays-directs"'), BODY.index('id="acces-rapides-pro"'))
        self.assertLess(BODY.index('id="acces-rapides-pro"'), BODY.index('id="digiyClarity"'))
        self.assertIn('href="#territoires-detail" data-i18n="quickRegions"', world)
        self.assertLess(BODY.index('id="digiyEntryChoice"'), BODY.index('id="outils-directs"'))
        self.assertLess(BODY.index('aria-label="Preuves terrain DIGIYLYFE"'), BODY.index('id="outils-directs"'))
        self.assertIn('window.digiyHomeWorld10Extras', HOME_I18N)
        self.assertLess(
            HOME.index('/assets/digiy-vitrine-portes-world10-v1.js'),
            HOME.index('/assets/digiy-home-i18n-v1.js')
        )

    def test_menu_linked_home_anchors_remain_accessible(self):
        import json
        menu = (ROOT / 'menu-universel-v1.html').read_text()
        line = next(s for s in menu.splitlines() if s.strip().startswith('const GROUPS='))
        groups = json.loads(line.split('=', 1)[1].rstrip(';'))
        home_ids = set(re.findall(r'\bid="([^"]+)"', BODY))
        for group in groups:
            for entry in group['items']:
                prefix = 'https://digiylyfe.com/#'
                if entry['url'].startswith(prefix):
                    self.assertIn(entry['url'][len(prefix):], home_ids, entry['label'])

    def test_film_never_fetches_before_opt_in(self):
        film = BODY.split('id="digiyFilmVitrine"', 1)[1].split('</section>', 1)[0]
        nodes = Nodes(); nodes.feed(film)
        frame = next(a for t, a in nodes.items if t == 'iframe')
        self.assertNotIn('src', frame)
        self.assertTrue(frame['data-src'].startswith('https://drive.google.com/'))
        self.assertIn("panel.open && frame", HOME)
        self.assertNotIn('autoplay', film)

    def test_real_professionals_and_ten_existing_language_entries(self):
        for url in ['astou-boutique', 'helage-plombier', 'mane-gning',
                    'sarlat-chez-baptiste', 'partenaire-lamine', 'kourant', 'mbaye-macon']:
            self.assertIn('https://' + url + '.digiylyfe.com/', BODY)
        nav = BODY.split('<nav class="languageStrip"', 1)[1].split('</nav>', 1)[0]
        self.assertEqual(len(re.findall(r'class="langBtn', nav)), 10)
        self.assertIn('data-lang="wo"', nav)
        self.assertIn('/prototypes/digiy-wolof-v1/prototype.html', BODY)
        self.assertIn('data-lang="zh"', nav)
        self.assertIn('/zh-CN/', BODY)

    def test_preuve_v1_preserves_truth_and_four_offers(self):
        proof = BODY.split('aria-label="Preuves terrain DIGIYLYFE">', 1)[1].split('</section>', 1)[0]
        self.assertNotIn('babacar-plombier-pro', proof)
        self.assertIn('helage-plombier.digiylyfe.com', proof)
        self.assertIn('ne prouve pas un usage régulier', proof)
        self.assertIn('data-i18n="proofZero"', BODY.split('id="digiyClarity"', 1)[1].split('</section>', 1)[0])
        self.assertNotIn('.digiyClarityLead{display:none}', HOME)
        offers = BODY.split('id="offres-essentielles"', 1)[1].split('</section>', 1)[0]
        self.assertEqual(offers.count('<article>'), 4)
        self.assertIn('598 € HT', offers)
        faq = BODY.split('id="questions-frequentes"', 1)[1].split('</aside>', 1)[0]
        self.assertEqual(faq.count('<details>'), 5)
        self.assertIn('Aucun nombre de clients ni revenu', faq)
        tools = BODY.split('id="preuves-outils"', 1)[1].split('</aside>', 1)[0]
        self.assertIn('Ce ne sont pas des démonstrations interactives', tools)
        for module in ('loc', 'driver', 'commerce'):
            self.assertIn('/demo-' + module + '-gestion.html', tools)

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
        labels = json.loads(re.search(r'var DIGIY_PUBLIC_V1=(.*?);\n', HOME_I18N)[1])
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
                     'Présence professionnelle', '15 000 FCFA', '29 € HT / mois',
                     '21 000 FCFA', '28 000 FCFA', '75 €']:
            self.assertIn(text, BODY)
        for anchor in ['digiyAnnuaireV1', 'digiyEntryChoice', 'digiyInstallBand',
                       'digiyFavorisBar', 'comment-ca-marche', 'digiyShareCard']:
            self.assertIn('id="' + anchor + '"', BODY)

if __name__ == '__main__':
    unittest.main()
