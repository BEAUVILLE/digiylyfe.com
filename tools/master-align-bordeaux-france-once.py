from pathlib import Path

# 1) Bordeaux direct page: visible doors must be human CORE needs.
p = Path('bordeaux.html')
s = p.read_text(encoding='utf-8')
old = "var NEEDS=[['announcements','⚡','ANNONCES / SERVICES'],['transport','🚗','DRIVER'],['artisan','🔧','ARTISAN'],['accommodation','🏠','LOGEMENT / LOC'],['food','🍽️','RESTAURANT'],['shopping','🛍️','MON COMMERCE'],['beauty','💅','BEAUTÉ & BIEN-ÊTRE'],['jobs','💼','JOBS / MISSIONS'],['guidance','🎙️','LA VOIX']];"
new = "var NEEDS=[['announcements','⚡','ANNONCES'],['transport','🚗','SE DÉPLACER'],['artisan','🔧','TROUVER UN ARTISAN'],['accommodation','🏠','DORMIR OU LOUER'],['food','🍽️','MANGER OU RÉSERVER'],['shopping','🛍️','ACHETER LOCAL'],['beauty','💅','BEAUTÉ & BIEN-ÊTRE'],['jobs','💼','EMPLOI ET MISSIONS'],['guidance','🎙️','LA VOIX']];"
if s.count(old) != 1:
    raise SystemExit(f'Bordeaux NEEDS guard failed: {s.count(old)}')
s = s.replace(old, new, 1)
p.write_text(s, encoding='utf-8')

# 2) Index: France must be a country door, not Dordogne disguised as France.
p = Path('index.html')
s = p.read_text(encoding='utf-8')
old_block = '''        <a class="territoryCard" href="./france.html">
          <span class="territoryCountry">🇫🇷 <b data-i18n="franceCountry">FRANCE</b></span>
          <strong data-i18n="dordogneTitle">DIGIY VALLÉE DE LA DORDOGNE</strong>
          <small data-i18n="dordogneZones">PLACE À PRENDRE · Sarlat · communes et villages du territoire</small>
          <span class="territoryBtn" data-i18n="openTerritory">OUVRIR LE TERRITOIRE</span>
        </a>'''
new_block = '''        <a class="territoryCard" href="./france.html">
          <span class="territoryCountry">🇫🇷 <b data-i18n="franceCountry">FRANCE</b></span>
          <strong data-i18n="franceTitle">DIGIY FRANCE</strong>
          <small data-i18n="franceZones">2 TERRITOIRES ACTIFS · Vallée de la Dordogne · Bordeaux</small>
          <span class="territoryBtn" data-i18n="openFrance">OUVRIR LA FRANCE</span>
        </a>'''
if s.count(old_block) != 1:
    raise SystemExit(f'France card guard failed: {s.count(old_block)}')
s = s.replace(old_block, new_block, 1)

translations = {
    'fr': ('DIGIY FRANCE','2 TERRITOIRES ACTIFS · Vallée de la Dordogne · Bordeaux','OUVRIR LA FRANCE'),
    'en': ('DIGIY FRANCE','2 ACTIVE TERRITORIES · Dordogne Valley · Bordeaux','OPEN FRANCE'),
    'es': ('DIGIY FRANCIA','2 TERRITORIOS ACTIVOS · Valle del Dordoña · Burdeos','ABRIR FRANCIA'),
    'pt': ('DIGIY FRANÇA','2 TERRITÓRIOS ATIVOS · Vale da Dordogne · Bordéus','ABRIR FRANÇA'),
    'it': ('DIGIY FRANCIA','2 TERRITORI ATTIVI · Valle della Dordogna · Bordeaux','APRI LA FRANCIA'),
    'de': ('DIGIY FRANKREICH','2 AKTIVE GEBIETE · Dordogne-Tal · Bordeaux','FRANKREICH ÖFFNEN'),
    'nl': ('DIGIY FRANKRIJK','2 ACTIEVE GEBIEDEN · Dordognevallei · Bordeaux','OPEN FRANKRIJK'),
    'ar': ('DIGIY فرنسا','منطقتان نشطتان · وادي دوردوني · بوردو','افتح فرنسا'),
}
if '"franceTitle"' in s or '"openFrance"' in s:
    raise SystemExit('France translation keys already exist')
langs = ['fr','en','es','pt','it','de','nl','ar']
for lang in reversed(langs):
    start = s.find('"'+lang+'":{')
    if start < 0:
        raise SystemExit(f'Missing TEXT language block: {lang}')
    later = [s.find('"'+other+'":{', start + 1) for other in langs]
    later = [x for x in later if x > start]
    end = min(later) if later else s.find('};', start)
    if end < 0:
        raise SystemExit(f'Cannot bound TEXT language block: {lang}')
    block = s[start:end]
    marker_start = block.find('"franceCountry":"')
    if marker_start < 0:
        raise SystemExit(f'Missing franceCountry in language: {lang}')
    marker_end = block.find('"', marker_start + len('"franceCountry":"'))
    if marker_end < 0:
        raise SystemExit(f'Broken franceCountry in language: {lang}')
    marker_end += 1
    title, zones, cta = translations[lang]
    extra = ',"franceTitle":"'+title+'","franceZones":"'+zones+'","openFrance":"'+cta+'"'
    absolute = start + marker_end
    s = s[:absolute] + extra + s[absolute:]

if 'manifest.json?v=20260824-tarif-unique' not in s:
    raise SystemExit('PWA manifest guard failed')
if "navigator.serviceWorker.register('/sw.js?v=20260824-tarif-unique')" not in s:
    raise SystemExit('PWA service-worker guard failed')
p.write_text(s, encoding='utf-8')

# 3) Territory runtime page: load the isolated Bordeaux projection extension.
p = Path('territoire.html')
s = p.read_text(encoding='utf-8')
anchor = '<script src="/assets/digiy-territoire-dordogne-projection-v1.js?v=20260827-dordogne-territory-annonces-v2" defer></script>'
insert = anchor + '\n<script src="/assets/digiy-territoire-bordeaux-projection-v1.js?v=20260827-bordeaux-master-v1" defer></script>'
if s.count(anchor) != 1:
    raise SystemExit(f'Territoire anchor guard failed: {s.count(anchor)}')
if 'digiy-territoire-bordeaux-projection-v1.js' in s:
    raise SystemExit('Bordeaux projection already loaded')
if not Path('assets/digiy-territoire-bordeaux-projection-v1.js').exists():
    raise SystemExit('Bordeaux projection asset missing')
s = s.replace(anchor, insert, 1)
p.write_text(s, encoding='utf-8')

print('MASTER alignment patch ready: Bordeaux labels + France country door + Bordeaux projection loader')
