from pathlib import Path
p=Path('index.html')
s=p.read_text(encoding='utf-8')
if 'id="senegalVitrineCartouche"' in s:
    raise SystemExit('Cartouche Sénégal déjà présente')
anchor='''        <a class="territoryCard" href="https://digiylyfe.com/france.html">'''
if anchor not in s:
    raise SystemExit('Première carte France introuvable')
block='''        <style id="senegalVitrineCartoucheStyle">
          .senegalVitrineCartouche{grid-column:1/-1;display:grid;grid-template-columns:38% 62%;gap:14px;align-items:center;padding:15px;border-radius:24px;border:1px solid rgba(94,234,212,.48);background:radial-gradient(420px 220px at 15% 15%,rgba(34,197,94,.12),transparent 68%),linear-gradient(145deg,rgba(5,40,29,.97),rgba(4,24,18,.98));box-shadow:0 16px 38px rgba(0,0,0,.24)}
          .senegalVitrineMap{min-height:220px;border:1px solid rgba(94,234,212,.22);border-radius:20px;background:rgba(255,255,255,.025);overflow:hidden}.senegalVitrineMap svg{width:100%;height:220px;display:block}.senegalVitrineInfo{display:flex;flex-direction:column;gap:8px}.senegalVitrineInfo>strong{font-size:clamp(22px,4.8vw,34px);line-height:1.02;font-weight:1000}.senegalVitrineInfo>small{color:var(--soft);font-size:12px;line-height:1.45;font-weight:850}.senegalVitrineCities{display:flex;flex-wrap:wrap;gap:7px}.senegalVitrineCities span{padding:7px 9px;border-radius:999px;border:1px solid rgba(94,234,212,.28);background:rgba(94,234,212,.07);font-size:10px;font-weight:950}.senegalVitrineOpen{min-height:48px;margin-top:3px;padding:11px 14px;border-radius:999px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,var(--gold-soft),var(--gold),var(--green));color:#06140f;font-size:11px;font-weight:1000}.senegalVitrineCountry{color:#fde68a;font-size:11px;font-weight:1000;letter-spacing:.08em}
          @media(max-width:760px){.senegalVitrineCartouche{grid-template-columns:1fr}.senegalVitrineMap{min-height:195px}.senegalVitrineMap svg{height:195px}}
        </style>
        <a class="senegalVitrineCartouche" id="senegalVitrineCartouche" href="https://digiylyfe.com/senegal.html" aria-label="Ouvrir la carte interactive des territoires DIGIYLYFE au Sénégal">
          <div class="senegalVitrineMap" aria-hidden="true">
            <svg viewBox="0 0 430 245">
              <path d="M113 28 L202 19 L291 37 L353 77 L331 112 L363 143 L337 171 L361 198 L326 222 L258 231 L193 216 L164 190 L111 182 L84 154 L105 126 L76 102 L101 78 L75 56 Z" fill="rgba(8,70,52,.48)" stroke="rgba(94,234,212,.72)" stroke-width="3"/>
              <g fill="#dbe5df" opacity=".55"><circle cx="178" cy="56" r="4"/><circle cx="197" cy="105" r="4"/><circle cx="262" cy="102" r="4"/><circle cx="251" cy="157" r="4"/><circle cx="191" cy="202" r="4"/></g>
              <g><circle cx="115" cy="111" r="16" fill="rgba(246,196,83,.16)" stroke="rgba(246,196,83,.55)"/><circle cx="115" cy="111" r="7" fill="#f6c453" stroke="#fff1bd" stroke-width="2"/><text x="130" y="115" fill="#ffe897" font-size="15" font-weight="1000">Dakar</text></g>
              <g><circle cx="137" cy="145" r="16" fill="rgba(246,196,83,.16)" stroke="rgba(246,196,83,.55)"/><circle cx="137" cy="145" r="7" fill="#f6c453" stroke="#fff1bd" stroke-width="2"/><text x="153" y="149" fill="#ffe897" font-size="15" font-weight="1000">Petite Côte</text></g>
            </svg>
          </div>
          <div class="senegalVitrineInfo">
            <span class="senegalVitrineCountry">🇸🇳 <b data-i18n="senegalCountry">SÉNÉGAL</b> · CARTE TERRITORIALE</span>
            <strong>DIGIY SÉNÉGAL</strong>
            <small>2 TERRITOIRES ACTIFS · Dakar · Petite Côte</small>
            <div class="senegalVitrineCities"><span>Dakar</span><span>Petite Côte</span><span>Saly · Mbour</span></div>
            <span class="senegalVitrineOpen">OUVRIR LE SÉNÉGAL</span>
          </div>
        </a>

'''
s=s.replace(anchor,block+anchor,1)
s=s.replace('index-france-cartouche-v1-20260831','index-france-senegal-cartouches-v1-20260831',1)
p.write_text(s,encoding='utf-8')
assert 'id="senegalVitrineCartouche"' in s
assert 'https://digiylyfe.com/senegal.html' in s
print('OK cartouche Sénégal vitrine')
