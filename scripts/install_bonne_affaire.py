from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
URL = "https://bonne-affaire.digiylyfe.com/"


def replace_once(text: str, old: str, new: str, label: str) -> str:
    if old not in text:
        raise RuntimeError(f"Motif introuvable : {label}")
    return text.replace(old, new, 1)


def patch_root() -> None:
    path = ROOT / "index.html"
    text = path.read_text(encoding="utf-8")
    if URL in text:
        return

    text = replace_once(
        text,
        'index-hub-reseau-public-pro-20260728',
        'index-hub-bonne-affaire-20260801',
        'marqueur de construction',
    )

    old_schema = '''        {"@type":"ListItem","position":5,"name":"MARKET","url":"https://market.digiylyfe.com/"},
        {"@type":"ListItem","position":6,"name":"BUILD","url":"https://build.digiylyfe.com/"},
        {"@type":"ListItem","position":7,"name":"JOBS","url":"https://jobs.digiylyfe.com/"},
        {"@type":"ListItem","position":8,"name":"EXPLORE","url":"https://explore.digiylyfe.com/"},
        {"@type":"ListItem","position":9,"name":"CARNET PRO","url":"https://digiy-carnet-pro.digiylyfe.com/"},
        {"@type":"ListItem","position":10,"name":"RÉSEAU DIGIY","url":"https://reseau-digiy.digiylyfe.com/"}'''
    new_schema = '''        {"@type":"ListItem","position":5,"name":"MARKET","url":"https://market.digiylyfe.com/"},
        {"@type":"ListItem","position":6,"name":"BONNE AFFAIRE","url":"https://bonne-affaire.digiylyfe.com/"},
        {"@type":"ListItem","position":7,"name":"BUILD","url":"https://build.digiylyfe.com/"},
        {"@type":"ListItem","position":8,"name":"JOBS","url":"https://jobs.digiylyfe.com/"},
        {"@type":"ListItem","position":9,"name":"EXPLORE","url":"https://explore.digiylyfe.com/"},
        {"@type":"ListItem","position":10,"name":"CARNET PRO","url":"https://digiy-carnet-pro.digiylyfe.com/"},
        {"@type":"ListItem","position":11,"name":"RÉSEAU DIGIY","url":"https://reseau-digiy.digiylyfe.com/"}'''
    text = replace_once(text, old_schema, new_schema, 'données structurées')

    old_colors = '.driver{--accent:#3b82f6}.loc{--accent:#2dd4bf}.resa{--accent:#f26d6d}.market{--accent:#f97316}.build{--accent:#b88955}.jobs{--accent:#a78bfa}.explore{--accent:#84cc16}.carnet{--accent:#22c55e}.reseau{--accent:#f6c453}'
    new_colors = '.driver{--accent:#3b82f6}.loc{--accent:#2dd4bf}.resa{--accent:#f26d6d}.market{--accent:#f97316}.affaire{--accent:#f6c453}.build{--accent:#b88955}.jobs{--accent:#a78bfa}.explore{--accent:#84cc16}.carnet{--accent:#22c55e}.reseau{--accent:#f6c453}'
    text = replace_once(text, old_colors, new_colors, 'couleur BONNE AFFAIRE')

    market_card = '<a aria-label="Ouvrir MARKET — boutiques et produits" class="moduleCard market" data-hub-allow="fullscreen; clipboard-write" href="https://market.digiylyfe.com/" rel="noopener noreferrer" target="_blank" title="S’ouvre séparément pour conserver le HUB DIGIYLYFE"><i>🛍️</i><strong>MARKET</strong><small data-i18n="marketText">Boutiques et produits</small><b data-i18n="open">Ouvrir</b></a>'
    affaire_card = '<a aria-label="Ouvrir BONNE AFFAIRE — annonces classées et contact direct" class="moduleCard affaire" data-hub-bypass="true" href="https://bonne-affaire.digiylyfe.com/" rel="noopener noreferrer" target="_blank" title="S’ouvre séparément pour la recherche vocale et la proximité"><i>🏷️</i><strong>BONNE AFFAIRE</strong><small data-i18n="affaireText">Annonces classées · photos · contact direct</small><b data-i18n="open">Ouvrir</b></a>'
    text = replace_once(text, market_card, market_card + '\n' + affaire_card, 'carte du module')

    noscript_market = '<a href="https://market.digiylyfe.com/">🛍️ MARKET</a>'
    noscript_affaire = '<a href="https://bonne-affaire.digiylyfe.com/">🏷️ BONNE AFFAIRE</a>'
    text = replace_once(text, noscript_market, noscript_market + '\n    ' + noscript_affaire, 'menu sans JavaScript')

    menu_market = '<a href="https://resa-table-resto.digiylyfe.com/" rel="noopener noreferrer" target="_blank" title="S’ouvre séparément pour conserver le HUB DIGIYLYFE">📅 RESA</a><a href="https://market.digiylyfe.com/" rel="noopener noreferrer" target="_blank" title="S’ouvre séparément pour conserver le HUB DIGIYLYFE">🛍️ MARKET</a>'
    menu_affaire = '<a data-hub-bypass="true" href="https://bonne-affaire.digiylyfe.com/" rel="noopener noreferrer" target="_blank" title="S’ouvre séparément pour la recherche vocale et la proximité">🏷️ BONNE AFFAIRE</a>'
    text = replace_once(text, menu_market, menu_market + '\n' + menu_affaire, 'menu complet')

    text = replace_once(
        text,
        "marketText:'Boutiques et produits',buildText:'Artisans et chantiers'",
        "marketText:'Boutiques et produits',affaireText:'Annonces classées · photos · contact direct',buildText:'Artisans et chantiers'",
        'traduction française',
    )
    text = replace_once(
        text,
        "marketText:'Shops and products',buildText:'Tradespeople and works'",
        "marketText:'Shops and products',affaireText:'Classified listings · photos · direct contact',buildText:'Tradespeople and works'",
        'traduction anglaise interne',
    )

    path.write_text(text, encoding="utf-8")


def patch_locale(lang: str, description: str, action: str) -> None:
    path = ROOT / lang / "index.html"
    text = path.read_text(encoding="utf-8")
    if URL in text:
        return

    market = re.search(
        r'(<a class="card" href="https://market\.digiylyfe\.com/"[^>]*>.*?</a>)',
        text,
        re.S,
    )
    if not market:
        raise RuntimeError(f"Carte MARKET introuvable dans {path}")

    card = (
        '<a class="card" href="https://bonne-affaire.digiylyfe.com/" '
        'target="_blank" rel="noopener noreferrer">'
        '<span><i>🏷️</i><strong>BONNE AFFAIRE</strong><small>'
        f'{description}</small></span><b>{action}</b></a>'
    )
    text = text[:market.end()] + card + text[market.end():]
    path.write_text(text, encoding="utf-8")


patch_root()
locales = {
    'en': ('Classified listings, photos and direct contact.', 'Open →'),
    'es': ('Anuncios clasificados, fotos y contacto directo.', 'Abrir →'),
    'de': ('Kleinanzeigen, Fotos und direkter Kontakt.', 'Öffnen →'),
    'it': ('Annunci classificati, foto e contatto diretto.', 'Apri →'),
    'nl': ('Advertenties, foto’s en direct contact.', 'Openen →'),
    'ar': ('إعلانات مصنفة وصور وتواصل مباشر.', 'فتح ←'),
}
for code, (description, action) in locales.items():
    patch_locale(code, description, action)

root_text = (ROOT / 'index.html').read_text(encoding='utf-8')
if root_text.count(URL) < 4:
    raise RuntimeError('Contrôle final de la vitrine française échoué')
for code in locales:
    if URL not in (ROOT / code / 'index.html').read_text(encoding='utf-8'):
        raise RuntimeError(f'Contrôle final échoué pour {code}')
print('BONNE AFFAIRE est posée dans les sept vitrines.')
