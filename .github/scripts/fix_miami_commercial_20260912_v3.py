from pathlib import Path

changed = []

# INDEX — USA / Miami must open the Miami offer page first, not jump to the free card.
p = Path('index.html')
s = p.read_text(encoding='utf-8')
old = s

direct = 'href="https://digiylyfe.com/carte-gratuite.html?country=us&amp;lang=en&amp;territory=miami">🇺🇸 <span data-i18n="globalUsa">'
guided = 'href="https://digiylyfe.com/miami.html?lang=en">🇺🇸 <span data-i18n="globalUsa">'
if direct not in s:
    raise SystemExit('INDEX: USA direct-card link not found')
s = s.replace(direct, guided, 1)

old_banner = "x.innerHTML='<strong>🇺🇸 MIAMI PILOT · YOUR FIRST DIGIY CARD IS FREE</strong><p>A permanent digital card + QR, direct customer contact, no advertising and 0% DIGIYLYFE commission. You keep your existing website, Google and social tools.</p><div class=\"miami-actions\"><a href=\"/carte-gratuite.html?country=us&lang=en&territory=miami\">GET MY FREE MIAMI CARD →</a><a href=\"/tarifs-adherents-1.html?country=us&lang=en\">SEE USA PRICING →</a></div>';"
new_banner = "x.innerHTML='<strong>🇺🇸 MIAMI PILOT · START FREE, SEE THE FULL PATH</strong><p>Free DIGIY card $0 → Professional profile $299 → DIGIY PRO $29/month or $290/year. Annual path: $589 first year, then $290/year. Optional websites: PREMIUM $790+ · EXTRA $1,490+.</p><div class=\"miami-actions\"><a href=\"/miami.html?lang=en\">SEE MIAMI OFFER & PRICING →</a><a href=\"/carte-gratuite.html?country=us&lang=en&territory=miami\">GET MY FREE MIAMI CARD →</a></div>';"
if old_banner not in s:
    raise SystemExit('INDEX: Miami pilot banner not found')
s = s.replace(old_banner, new_banner, 1)

if s != old:
    p.write_text(s, encoding='utf-8')
    changed.append('index.html')

# MIAMI — make the complete offer the primary action and state the first-year total.
p = Path('miami.html')
s = p.read_text(encoding='utf-8')
old = s

hero_old = '<div class="actions"><a class="cta primary" id="freeCta" href="/carte-gratuite.html?country=us&lang=en&territory=miami">GET MY FREE DIGIY CARD →</a><a class="cta secondary" id="priceCta" href="/tarifs-adherents-1.html?country=us&lang=en">SEE USA PRICING →</a></div>'
hero_new = '<div class="actions"><a class="cta primary" id="guideCta" href="#proPath">SEE THE FULL MIAMI OFFER →</a><a class="cta secondary" id="freeCta" href="/carte-gratuite.html?country=us&lang=en&territory=miami">GET MY FREE DIGIY CARD →</a><a class="cta secondary" id="priceCta" href="/tarifs-adherents-1.html?country=us&lang=en">SEE USA PRICING →</a></div>'
if hero_old not in s:
    raise SystemExit('MIAMI: hero CTA block not found')
s = s.replace(hero_old, hero_new, 1)

section_old = '<section class="section"><h2 id="pathTitle">Start free. Go PRO when it makes sense.</h2>'
section_new = '<section class="section" id="proPath"><h2 id="pathTitle">Start free. Go PRO when it makes sense.</h2>'
if section_old not in s:
    raise SystemExit('MIAMI: PRO path section not found')
s = s.replace(section_old, section_new, 1)

truth_anchor = '</small></article></div><div class="doctrine" id="doctrine">'
truth_insert = '</small></article></div><div class="doctrine" id="priceTruth"><strong>$589 · FIRST YEAR WITH ANNUAL DIGIY PRO</strong><br>$299 PROFESSIONAL PROFILE + $290/YEAR · THEN $290/YEAR.<br>MONTHLY OPTION: $299 PROFILE + $29/MONTH.</div><div class="doctrine" id="doctrine">'
if truth_anchor not in s:
    raise SystemExit('MIAMI: price truth anchor not found')
s = s.replace(truth_anchor, truth_insert, 1)

# Language-aware label for the new primary guide CTA. Numeric truth remains visible and unambiguous in every language.
set_anchor = "document.getElementById('lead').textContent=t.lead;document.getElementById('freeCta').textContent=t.free;"
set_insert = "document.getElementById('lead').textContent=t.lead;document.getElementById('guideCta').textContent=({en:'SEE THE FULL MIAMI OFFER →',es:'VER LA OFERTA COMPLETA DE MIAMI →',fr:'VOIR L’OFFRE MIAMI COMPLÈTE →',pt:'VER A OFERTA MIAMI COMPLETA →',it:'VEDI L’OFFERTA MIAMI COMPLETA →',de:'VOLLSTÄNDIGES MIAMI-ANGEBOT →',nl:'BEKIJK HET VOLLEDIGE MIAMI-AANBOD →',ar:'عرض ميامي الكامل ←'}[l]||'SEE THE FULL MIAMI OFFER →');document.getElementById('freeCta').textContent=t.free;"
if set_anchor not in s:
    raise SystemExit('MIAMI: setLang CTA anchor not found')
s = s.replace(set_anchor, set_insert, 1)

href_anchor = "document.getElementById('freeCta').href='/carte-gratuite.html?country=us&lang='+l+'&territory=miami';"
href_insert = "document.getElementById('guideCta').href='#proPath';document.getElementById('freeCta').href='/carte-gratuite.html?country=us&lang='+l+'&territory=miami';"
if href_anchor not in s:
    raise SystemExit('MIAMI: href anchor not found')
s = s.replace(href_anchor, href_insert, 1)

if s != old:
    p.write_text(s, encoding='utf-8')
    changed.append('miami.html')

print('changed:', ', '.join(changed))
