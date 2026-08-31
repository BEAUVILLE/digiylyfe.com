from pathlib import Path

index = Path('index.html')
s = index.read_text(encoding='utf-8')

if 'id="franceVitrineCartouche"' not in s:
    needle = 'src="/assets/territoires/bordeaux.png"'
    pos = s.find(needle)
    if pos < 0:
        raise SystemExit('Bordeaux card not found')
    end = s.find('</a>', pos)
    if end < 0:
        raise SystemExit('Bordeaux card closing link not found')
    end += 4

    block = '''
        <style id="franceVitrineCartoucheStyle">
          .franceVitrineCartouche{grid-column:1/-1;display:grid;grid-template-columns:38% 62%;gap:14px;align-items:center;padding:15px;border-radius:24px;border:1px solid rgba(94,234,212,.48);background:radial-gradient(420px 220px at 15% 15%,rgba(94,234,212,.11),transparent 68%),linear-gradient(145deg,rgba(5,40,29,.97),rgba(4,24,18,.98));box-shadow:0 16px 38px rgba(0,0,0,.24)}
          .franceVitrineMap{min-height:220px;border:1px solid rgba(94,234,212,.22);border-radius:20px;background:rgba(255,255,255,.025);overflow:hidden}.franceVitrineMap svg{width:100%;height:220px;display:block}.franceVitrineInfo{display:flex;flex-direction:column;gap:8px}.franceVitrineInfo>strong{font-size:clamp(22px,4.8vw,34px);line-height:1.02;font-weight:1000}.franceVitrineInfo>small{color:var(--soft);font-size:12px;line-height:1.45;font-weight:850}.franceVitrineCities{display:flex;flex-wrap:wrap;gap:7px}.franceVitrineCities span{padding:7px 9px;border-radius:999px;border:1px solid rgba(94,234,212,.28);background:rgba(94,234,212,.07);font-size:10px;font-weight:950}.franceVitrineOpen{min-height:48px;margin-top:3px;padding:11px 14px;border-radius:999px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,var(--gold-soft),var(--gold),var(--green));color:#06140f;font-size:11px;font-weight:1000}.franceVitrineCountry{color:#fde68a;font-size:11px;font-weight:1000;letter-spacing:.08em}
          @media(max-width:760px){.franceVitrineCartouche{grid-template-columns:1fr}.franceVitrineMap{min-height:195px}.franceVitrineMap svg{height:195px}}
        </style>
        <a class="franceVitrineCartouche" id="franceVitrineCartouche" href="https://digiylyfe.com/france.html" aria-label="Ouvrir la carte interactive des territoires DIGIYLYFE en France">
          <div class="franceVitrineMap" aria-hidden="true">
            <svg viewBox="0 0 430 245">
              <path d="M142 27 L229 18 L303 50 L349 105 L337 155 L370 192 L333 224 L265 237 L188 228 L124 205 L74 169 L65 119 L89 82 L72 52 L112 35 Z" fill="rgba(8,70,52,.48)" stroke="rgba(94,234,212,.72)" stroke-width="3"/>
              <g fill="#dbe5df" opacity=".55"><circle cx="221" cy="49" r="4"/><circle cx="214" cy="83" r="4"/><circle cx="316" cy="91" r="4"/><circle cx="111" cy="112" r="4"/><circle cx="275" cy="145" r="4"/><circle cx="315" cy="195" r="4"/><circle cx="161" cy="199" r="4"/></g>
              <g><circle cx="112" cy="165" r="16" fill="rgba(246,196,83,.16)" stroke="rgba(246,196,83,.55)"/><circle cx="112" cy="165" r="7" fill="#f6c453" stroke="#fff1bd" stroke-width="2"/><text x="126" y="169" fill="#ffe897" font-size="15" font-weight="1000">Bordeaux</text></g>
              <g><circle cx="176" cy="177" r="16" fill="rgba(246,196,83,.16)" stroke="rgba(246,196,83,.55)"/><circle cx="176" cy="177" r="7" fill="#f6c453" stroke="#fff1bd" stroke-width="2"/><text x="190" y="181" fill="#ffe897" font-size="15" font-weight="1000">Sarlat</text></g>
            </svg>
          </div>
          <div class="franceVitrineInfo">
            <span class="franceVitrineCountry">🇫🇷 <b data-i18n="franceCountry">FRANCE</b> · CARTE TERRITORIALE</span>
            <strong data-i18n="franceTitle">DIGIY FRANCE</strong>
            <small data-i18n="franceZones">2 TERRITOIRES ACTIFS · Vallée de la Dordogne · Bordeaux</small>
            <div class="franceVitrineCities"><span>Bordeaux</span><span>Vallée de la Dordogne</span><span>Sarlat</span></div>
            <span class="franceVitrineOpen" data-i18n="openFrance">OUVRIR LA FRANCE</span>
          </div>
        </a>'''
    s = s[:end] + block + s[end:]
    s = s.replace('index-empreinte-numerique-tarif-unique-reseau-retire-fg-retire-pwa-v10-20260826','index-france-cartouche-v1-20260831',1)
    index.write_text(s, encoding='utf-8')

# Restore workflow to its canonical pre-patch content.
workflow = Path('.github/workflows/install-global-navigation.yml')
workflow.write_text('''name: Install global DIGIY navigation

on:
  push:
    branches: [main]
    paths:
      - "digiy-navigation-globale.js"
      - ".github/workflows/install-global-navigation.yml"
  workflow_dispatch:

permissions:
  contents: write

jobs:
  install-navigation:
    if: github.actor != 'github-actions[bot]'
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Install the shared navigation loader
        shell: bash
        run: |
          python3 - <<'PY'
          from pathlib import Path

          targets = [
              "presence-terrain.html",
              "recherche.html",
              "menu.html",
              "tarif-entreprise-petite-cote.html",
              "architecture-digiylyfe.html",
              "notre-methode.html",
              "le-terrain-garde-la-main.html",
          ]
          marker = '<script src="./digiy-navigation-globale.js?v=20260722"></script>'

          if not Path("digiy-navigation-globale.js").exists():
              raise SystemExit("Shared navigation file is not present yet; nothing to install.")

          changed = []
          for name in targets:
              path = Path(name)
              if not path.exists():
                  print(f"SKIP missing: {name}")
                  continue
              text = path.read_text(encoding="utf-8")
              if "digiy-navigation-globale.js" in text:
                  print(f"OK already installed: {name}")
                  continue
              if "</body>" in text:
                  head, tail = text.rsplit("</body>", 1)
                  text = head.rstrip() + "\\n" + marker + "\\n</body>" + tail
              else:
                  text = text.rstrip() + "\\n" + marker + "\\n"
              path.write_text(text, encoding="utf-8")
              changed.append(name)
              print(f"INSTALLED: {name}")

          print("Changed files:", ", ".join(changed) if changed else "none")
          PY

      - name: Commit installed loaders
        shell: bash
        run: |
          if git diff --quiet; then
            echo "No page needed an update."
            exit 0
          fi
          git config user.name "github-actions[bot]"
          git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
          git add presence-terrain.html recherche.html menu.html tarif-entreprise-petite-cote.html architecture-digiylyfe.html notre-methode.html le-terrain-garde-la-main.html
          git commit -m "Install global DIGIY navigation [skip ci]"
          git push
''', encoding='utf-8')

Path('scripts/patch-france-vitrine.py').unlink(missing_ok=True)
print('France cartouche installed; workflow restored; temp patch removed')
