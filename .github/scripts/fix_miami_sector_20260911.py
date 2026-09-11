from pathlib import Path

index = Path('index.html')
s = index.read_text()
miami = '''        <a class="territoryCard" href="https://digiylyfe.com/miami.html?lang=fr" data-fav-id="territoire-miami">
          <span class="territoryCountry">🇺🇸 <b>ÉTATS-UNIS</b></span>
          <picture class="territoryPhoto">
            <img src="https://digiylyfe.net/wp-content/uploads/2026/09/ChatGPT-Image-11-sept.-2026-22_03_22.png" alt="Miami · Florida" loading="lazy" decoding="async"/>
          </picture>
          <strong>DIGIY MIAMI</strong>
          <small>Miami · Floride · territoire ouvert</small>
          <span class="territoryBtn">OUVRIR LE TERRITOIRE</span>
        </a>
'''
if s.count(miami) != 1:
    raise SystemExit(f'Miami native card expected once, found {s.count(miami)}')
s = s.replace(miami, '', 1)

anchor = '''            <span class="franceVitrineOpen" data-i18n="openFrance">OUVRIR LA FRANCE</span>
          </div>
        </a>
      </div>
    </section>'''
if s.count(anchor) != 1:
    raise SystemExit(f'France close anchor expected once, found {s.count(anchor)}')

usa = '''            <span class="franceVitrineOpen" data-i18n="openFrance">OUVRIR LA FRANCE</span>
          </div>
        </a>

        <style id="usaVitrineSectorStyle">
          .usaVitrineSector{grid-column:1/-1;margin-top:8px;padding:15px 17px;border-radius:22px;border:1px solid rgba(59,130,246,.48);background:linear-gradient(145deg,rgba(10,35,70,.92),rgba(4,24,38,.98));box-shadow:0 14px 34px rgba(0,0,0,.22)}
          .usaVitrineSector strong{display:block;color:#dbeafe;font-size:clamp(20px,4vw,29px);font-weight:1000;line-height:1.05}.usaVitrineSector small{display:block;margin-top:6px;color:#cbd5e1;font-size:11px;font-weight:850;line-height:1.45}
        </style>
        <div class="usaVitrineSector" data-digiy-usa-sector="1">
          <strong>🇺🇸 ÉTATS-UNIS · MIAMI PILOT</strong>
          <small>1 TERRITOIRE PILOTE · Miami · Florida</small>
        </div>

''' + miami + '''      </div>
    </section>'''
s = s.replace(anchor, usa, 1)
index.write_text(s)

p = Path('assets/digiy-miami-door-v1.js')
j = p.read_text()
old = "const bordeaux=grid.querySelector('[data-fav-id=\"territoire-bordeaux\"]');if(bordeaux&&bordeaux.parentNode===grid)bordeaux.insertAdjacentElement('afterend',a);else grid.appendChild(a)"
new = "const france=grid.querySelector('#franceVitrineCartouche');if(france&&france.parentNode===grid)france.insertAdjacentElement('afterend',a);else grid.appendChild(a)"
if j.count(old) != 1:
    raise SystemExit(f'Miami fallback anchor expected once, found {j.count(old)}')
j = j.replace(old, new, 1)
p.write_text(j)
