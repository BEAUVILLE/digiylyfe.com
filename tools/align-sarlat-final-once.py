from pathlib import Path


def rep(s, old, new, label):
    c = s.count(old)
    if c != 1:
        raise SystemExit(f'{label}: expected 1 occurrence, found {c}')
    return s.replace(old, new, 1)

# 1) Expose the already-localised Dordogne projection data for sarlat.html.
p = Path('assets/digiy-territoire-dordogne-projection-v1.js')
s = p.read_text(encoding='utf-8')
if 'window.DIGIY_DORDOGNE_DATA=DATA;' not in s:
    s = rep(
        s,
        "  };\n  function p(){try{return new URLSearchParams(location.search)}catch(e){return new URLSearchParams()}}",
        "  };\n  window.DIGIY_DORDOGNE_DATA=DATA;\n  function p(){try{return new URLSearchParams(location.search)}catch(e){return new URLSearchParams()}}",
        'export Dordogne DATA'
    )
p.write_text(s, encoding='utf-8')

# 2) Align direct Sarlat showcase.
p = Path('sarlat.html')
s = p.read_text(encoding='utf-8')

s = rep(s, 'dordogne-master-territoire-sarlat-pilote-v3-20260827', 'dordogne-master-sarlat-i18n-pwa-v4-20260827', 'build marker')
s = rep(s, 'id="joinBtn">JE SUIS PROFESSIONNEL DANS LA VALLÉE →', 'id="joinBtn">JE SUIS PROFESSIONNEL · SARLAT ZONE PILOTE →', 'initial join CTA')
s = rep(s, 'id="finalBtn" style="margin-top:14px">PRENDRE MA PLACE DANS LA VALLÉE · 45 € / MOIS →', 'id="finalBtn" style="margin-top:14px">PRENDRE MA PLACE · SARLAT ZONE PILOTE · 45 € / MOIS →', 'initial final CTA')
s = rep(s, '<small>Restaurant · Sarlat · contact direct</small><b id="openReal1">', '<small id="realMeta1">Restaurant · Sarlat · contact direct</small><b id="openReal1">', 'real meta 1')
s = rep(s, '<small>Restaurant · Sarlat · contact direct</small><b id="openReal2">', '<small id="realMeta2">Restaurant · Sarlat · contact direct</small><b id="openReal2">', 'real meta 2')
s = rep(s, '<small>Hébergement · Sarlat · demande directe</small><b id="openReal3">', '<small id="realMeta3">Hébergement · Sarlat · demande directe</small><b id="openReal3">', 'real meta 3')

# Reuse one authoritative 8-language projection dataset.
s = rep(s, '<script>(function(){\'use strict\';var LANGS=', '<script src="/assets/digiy-territoire-dordogne-projection-v1.js?v=20260827-dordogne-i18n-v4"></script>\n<script>(function(){\'use strict\';var LANGS=', 'load shared Dordogne i18n')

old_render = "function renderCards(){var el=document.getElementById('cards');el.innerHTML='';var keys=state.need?[state.need]:NEEDS.map(function(n){return n[0]});keys.forEach(function(k){(EX[k]||[]).forEach(function(row,i){var a=document.createElement('article');a.className='card'+(k==='guidance'?' voiceCard':'');var u=new URL('/demo-dordogne.html',location.origin);u.searchParams.set('need',k);u.searchParams.set('variant',String(i+1));u.searchParams.set('local','sarlat');u.searchParams.set('lang',lang());a.innerHTML='<div class=\"badge\">'+t().badge+'</div><h3>'+row[0]+'</h3><div class=\"meta\">📍 Vallée de la Dordogne · Périgord</div><div class=\"chips\">'+row[1].map(function(s){return '<span class=\"chip\">'+s+'</span>'}).join('')+'<span class=\"chip\">45 € / mois</span><span class=\"chip\">0 % commission</span></div><a class=\"btn '+(k==='guidance'?'secondary':'primary')+'\" href=\"'+u.pathname+u.search+'\">'+(k==='guidance'?t().voice:t().demo)+'</a>';el.appendChild(a)})})}"
new_render = "function renderCards(){var el=document.getElementById('cards');el.innerHTML='';var shared=window.DIGIY_DORDOGNE_DATA||{},pack=shared[lang()]||shared.fr||null,ex=pack&&pack.ex?pack.ex:EX,ui=pack&&pack.ui?pack.ui:null;var keys=state.need?[state.need]:NEEDS.map(function(n){return n[0]});keys.forEach(function(k){(ex[k]||[]).forEach(function(row,i){var a=document.createElement('article');a.className='card'+(k==='guidance'?' voiceCard':'');var u=new URL('/demo-dordogne.html',location.origin);u.searchParams.set('need',k);u.searchParams.set('variant',String(i+1));u.searchParams.set('local','sarlat');u.searchParams.set('lang',lang());var meta=ui&&ui.meta?ui.meta.split('\\n')[0]:'📍 Vallée de la Dordogne · Périgord',card=ui&&ui.card?ui.card:'Carte digitale · QR',price=ui&&ui.price?ui.price:'45 € / mois',commission=ui&&ui.commission?ui.commission:'0 % commission';a.innerHTML='<div class=\"badge\">'+t().badge+'</div><h3>'+row[0]+'</h3><div class=\"meta\">'+meta+'</div><div class=\"chips\">'+row[1].map(function(s){return '<span class=\"chip\">'+s+'</span>'}).join('')+'<span class=\"chip\">'+card+'</span><span class=\"chip\">'+price+'</span><span class=\"chip\">'+commission+'</span></div><a class=\"btn '+(k==='guidance'?'secondary':'primary')+'\" href=\"'+u.pathname+u.search+'\">'+(k==='guidance'?t().voice:t().demo)+'</a>';el.appendChild(a)})})}"
s = rep(s, old_render, new_render, 'translated card renderer')

# Make the real Sarlat presences multilingual too.
anchor = "};var state={need:''},q=new URLSearchParams(location.search);"
real_meta = "};var REAL_META={fr:['Restaurant · Sarlat · contact direct','Restaurant · Sarlat · contact direct','Hébergement · Sarlat · demande directe'],en:['Restaurant · Sarlat · direct contact','Restaurant · Sarlat · direct contact','Accommodation · Sarlat · direct request'],es:['Restaurante · Sarlat · contacto directo','Restaurante · Sarlat · contacto directo','Alojamiento · Sarlat · solicitud directa'],pt:['Restaurante · Sarlat · contacto direto','Restaurante · Sarlat · contacto direto','Alojamento · Sarlat · pedido direto'],it:['Ristorante · Sarlat · contatto diretto','Ristorante · Sarlat · contatto diretto','Alloggio · Sarlat · richiesta diretta'],de:['Restaurant · Sarlat · direkter Kontakt','Restaurant · Sarlat · direkter Kontakt','Unterkunft · Sarlat · direkte Anfrage'],nl:['Restaurant · Sarlat · direct contact','Restaurant · Sarlat · direct contact','Accommodatie · Sarlat · directe aanvraag'],ar:['مطعم · سارلا · تواصل مباشر','مطعم · سارلا · تواصل مباشر','إقامة · سارلا · طلب مباشر']};var state={need:''},q=new URLSearchParams(location.search);"
s = rep(s, anchor, real_meta, 'real meta translations')

old_copy_tail = "['openReal1','openReal2','openReal3'].forEach(function(id){document.getElementById(id).textContent=x.open});document.querySelectorAll('[data-l]')"
new_copy_tail = "['openReal1','openReal2','openReal3'].forEach(function(id){document.getElementById(id).textContent=x.open});var rm=REAL_META[lang()]||REAL_META.fr;['realMeta1','realMeta2','realMeta3'].forEach(function(id,i){document.getElementById(id).textContent=rm[i]});document.querySelectorAll('[data-l]')"
s = rep(s, old_copy_tail, new_copy_tail, 'render real meta translations')

# Transparent pilot wording in all supported languages.
cta_repls = {
"join:'JE SUIS PROFESSIONNEL DANS LA VALLÉE →'":"join:'JE SUIS PROFESSIONNEL · SARLAT ZONE PILOTE →'",
"finalBtn:'PRENDRE MA PLACE DANS LA VALLÉE · 45 € / MOIS →'":"finalBtn:'PRENDRE MA PLACE · SARLAT ZONE PILOTE · 45 € / MOIS →'",
"join:'I AM A PROFESSIONAL IN THE VALLEY →'":"join:'I AM A PROFESSIONAL · SARLAT PILOT AREA →'",
"finalBtn:'TAKE MY PLACE IN THE VALLEY · €45 / MONTH →'":"finalBtn:'TAKE MY PLACE · SARLAT PILOT AREA · €45 / MONTH →'",
"join:'SOY PROFESIONAL EN EL VALLE →'":"join:'SOY PROFESIONAL · SARLAT ZONA PILOTO →'",
"finalBtn:'OCUPAR MI PLAZA EN EL VALLE · 45 € / MES →'":"finalBtn:'OCUPAR MI PLAZA · SARLAT ZONA PILOTO · 45 € / MES →'",
"join:'SOU PROFISSIONAL NO VALE →'":"join:'SOU PROFISSIONAL · SARLAT ZONA PILOTO →'",
"finalBtn:'OCUPAR O MEU LUGAR NO VALE · 45 € / MÊS →'":"finalBtn:'OCUPAR O MEU LUGAR · SARLAT ZONA PILOTO · 45 € / MÊS →'",
"join:'SONO UN PROFESSIONISTA NELLA VALLE →'":"join:'SONO UN PROFESSIONISTA · SARLAT ZONA PILOTA →'",
"finalBtn:'PRENDI IL MIO POSTO NELLA VALLE · 45 € / MESE →'":"finalBtn:'PRENDI IL MIO POSTO · SARLAT ZONA PILOTA · 45 € / MESE →'",
"join:'ICH BIN PROFI IM DORDOGNE-TAL →'":"join:'ICH BIN PROFI · SARLAT PILOTGEBIET →'",
"finalBtn:'MEINEN PLATZ IM TAL NEHMEN · 45 € / MONAT →'":"finalBtn:'MEINEN PLATZ NEHMEN · SARLAT PILOTGEBIET · 45 € / MONAT →'",
"join:'IK BEN PROFESSIONAL IN DE VALLEI →'":"join:'IK BEN PROFESSIONAL · SARLAT PILOTGEBIED →'",
"finalBtn:'NEEM MIJN PLEK IN DE VALLEI · 45 € / MAAND →'":"finalBtn:'NEEM MIJN PLEK · SARLAT PILOTGEBIED · 45 € / MAAND →'",
"join:'أنا مهني في الوادي ←'":"join:'أنا مهني · سارلا منطقة تجريبية ←'",
"finalBtn:'احجز مكاني في الوادي · 45 € / شهر ←'":"finalBtn:'احجز مكاني · سارلا منطقة تجريبية · 45 € / شهر ←'"
}
for old, new in cta_repls.items():
    s = rep(s, old, new, f'CTA {old[:28]}')

# Direct-entry PWA registration, same non-caching worker as the main site.
pwa = """\n<script>\nif ('serviceWorker' in navigator) {\n  window.addEventListener('load', function(){\n    navigator.serviceWorker.register('/sw.js?v=20260824-tarif-unique').catch(function(){});\n  });\n}\n</script>\n"""
s = rep(s, '\n<script src="https://digiylyfe.com/digiy-contact-global.js?v=20260815"></script>', pwa + '<script src="https://digiylyfe.com/digiy-contact-global.js?v=20260815"></script>', 'PWA registration')
p.write_text(s, encoding='utf-8')

# 3) Make the membership tunnel explicitly Dordogne -> Sarlat pilot, while preserving local=sarlat.
p = Path('adhesion-dordogne.html')
s = p.read_text(encoding='utf-8')
s = rep(s, '<title>DIGIY SARLAT — Rejoindre comme professionnel</title>', '<title>DIGIY VALLÉE DE LA DORDOGNE — Sarlat zone pilote · Rejoindre</title>', 'adhesion title')
s = rep(s, 'href="/sarlat.html" id="back">← DIGIY SARLAT</a>', 'href="/sarlat.html" id="back">← DORDOGNE · SARLAT PILOTE</a>', 'adhesion back')
s = rep(s, 'id="ey">ADHÉSION PROFESSIONNELLE · SARLAT</div><h1 id="title">Prenez votre place dans DIGIY SARLAT.</h1>', 'id="ey">VALLÉE DE LA DORDOGNE · SARLAT ZONE PILOTE</div><h1 id="title">Prenez votre place à Sarlat, zone pilote de la Vallée.</h1>', 'adhesion hero')
s = rep(s, 'id="context">🪪 PROFESSIONNEL · SARLAT-LA-CANÉDA</div>', 'id="context">🪪 PROFESSIONNEL · SARLAT-LA-CANÉDA · ZONE PILOTE</div>', 'adhesion context')
s = rep(s, "var L={fr:['ADHÉSION PROFESSIONNELLE · SARLAT','Prenez votre place dans DIGIY SARLAT.'", "var L={fr:['VALLÉE DE LA DORDOGNE · SARLAT ZONE PILOTE','Prenez votre place à Sarlat, zone pilote de la Vallée.'", 'FR adhesion copy')
s = rep(s, "en:['PROFESSIONAL MEMBERSHIP · SARLAT','Take your place in DIGIY SARLAT.'", "en:['DORDOGNE VALLEY · SARLAT PILOT AREA','Take your place in Sarlat, the pilot area of the Valley.'", 'EN adhesion copy')
s = rep(s, "es:['ADHESIÓN PROFESIONAL · SARLAT','Ocupe su lugar en DIGIY SARLAT.'", "es:['VALLE DEL DORDOÑA · SARLAT ZONA PILOTO','Ocupe su plaza en Sarlat, zona piloto del Valle.'", 'ES adhesion copy')
s = rep(s, "pt:['ADESÃO PROFISSIONAL · SARLAT','Ocupe o seu lugar na DIGIY SARLAT.'", "pt:['VALE DA DORDOGNE · SARLAT ZONA PILOTO','Ocupe o seu lugar em Sarlat, zona piloto do Vale.'", 'PT adhesion copy')
s = rep(s, "it:['ADESIONE PROFESSIONALE · SARLAT','Prendete il vostro posto in DIGIY SARLAT.'", "it:['VALLE DELLA DORDOGNA · SARLAT ZONA PILOTA','Prendete il vostro posto a Sarlat, zona pilota della Valle.'", 'IT adhesion copy')
s = rep(s, "de:['PROFI-MITGLIEDSCHAFT · SARLAT','Sichern Sie sich Ihren Platz in DIGIY SARLAT.'", "de:['DORDOGNE-TAL · SARLAT PILOTGEBIET','Sichern Sie sich Ihren Platz in Sarlat, dem Pilotgebiet des Tals.'", 'DE adhesion copy')
s = rep(s, "nl:['PROFESSIONEEL LIDMAATSCHAP · SARLAT','Neem uw plaats in DIGIY SARLAT.'", "nl:['DORDOGNEVALLEI · SARLAT PILOTGEBIED','Neem uw plaats in Sarlat, het pilotgebied van de vallei.'", 'NL adhesion copy')
s = rep(s, "ar:['عضوية مهنية · سارلا','خذ مكانك في DIGIY SARLAT.'", "ar:['وادي دوردوني · سارلا منطقة تجريبية','خذ مكانك في سارلا، المنطقة التجريبية في الوادي.'", 'AR adhesion copy')

# Make context dynamically accurate in all languages without changing the canonical pilot local.
s = rep(s, "document.getElementById('context').textContent=m[0]+' '+m[1]+' · SARLAT-LA-CANÉDA';", "var PILOT={fr:'ZONE PILOTE',en:'PILOT AREA',es:'ZONA PILOTO',pt:'ZONA PILOTO',it:'ZONA PILOTA',de:'PILOTGEBIET',nl:'PILOTGEBIED',ar:'منطقة تجريبية'};document.getElementById('context').textContent=m[0]+' '+m[1]+' · SARLAT-LA-CANÉDA · '+(PILOT[l]||PILOT.fr);", 'translated pilot context')

# Back label follows the selected language and points to the direct Dordogne/Sarlat showcase.
back_repls = {
"'← DIGIY SARLAT']":"'← DORDOGNE · SARLAT PILOTE']",
"'← DIGIY SARLAT']":"'← DORDOGNE · SARLAT PILOT']"
}
# Specific replacements by language to avoid ambiguous duplicate English/French strings.
s = s.replace("'← DIGIY SARLAT'],en:", "'← DORDOGNE · SARLAT PILOTE'],en:", 1)
s = s.replace("'← DIGIY SARLAT'],es:", "'← DORDOGNE · SARLAT PILOT'],es:", 1)
s = s.replace("'← DIGIY SARLAT'],pt:", "'← DORDOÑA · SARLAT PILOTO'],pt:", 1)
s = s.replace("'← DIGIY SARLAT'],it:", "'← DORDOGNE · SARLAT PILOTO'],it:", 1)
s = s.replace("'← DIGIY SARLAT'],de:", "'← DORDOGNA · SARLAT PILOTA'],de:", 1)
s = s.replace("'← DIGIY SARLAT'],nl:", "'← DORDOGNE · SARLAT PILOTGEBIET'],nl:", 1)
s = s.replace("'← DIGIY SARLAT'],ar:", "'← DORDOGNE · SARLAT PILOTGEBIED'],ar:", 1)
s = s.replace("'DIGIY SARLAT →']};", "'DORDOGNE · SARLAT PILOT ←']};", 1)

p.write_text(s, encoding='utf-8')

# Final guards.
checks = {
    'assets/digiy-territoire-dordogne-projection-v1.js': ['window.DIGIY_DORDOGNE_DATA=DATA;'],
    'sarlat.html': ['dordogne-master-sarlat-i18n-pwa-v4-20260827','window.DIGIY_DORDOGNE_DATA','SARLAT ZONE PILOTE','navigator.serviceWorker.register'],
    'adhesion-dordogne.html': ['VALLÉE DE LA DORDOGNE — Sarlat zone pilote','SARLAT-LA-CANÉDA · ZONE PILOTE',"u.searchParams.set('local','sarlat')"]
}
for f, markers in checks.items():
    text = Path(f).read_text(encoding='utf-8')
    for marker in markers:
        if marker not in text:
            raise SystemExit(f'Missing guard in {f}: {marker}')
