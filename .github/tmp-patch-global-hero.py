from pathlib import Path
import json

p=Path('index.html')
s=p.read_text(encoding='utf-8')

if 'id="digiyGlobalDirection"' in s:
    raise SystemExit('Direction mondiale déjà présente')

css='''
    .globalDirection{margin:16px auto 0;max-width:860px;padding:14px;border-radius:22px;border:1px solid rgba(94,234,212,.30);background:linear-gradient(145deg,rgba(94,234,212,.065),rgba(246,196,83,.055));box-shadow:inset 0 0 0 1px rgba(255,255,255,.025)}
    .globalContinents{display:flex;justify-content:center;flex-wrap:wrap;gap:6px;color:#dffff8;font-size:10px;line-height:1.25;font-weight:1000;letter-spacing:.075em;text-transform:uppercase}
    .globalDirectionLead{margin:10px auto 0;max-width:690px;color:rgba(255,250,240,.82);font-size:12px;line-height:1.42;font-weight:900;text-align:center}
    .globalCountries{display:flex;justify-content:center;flex-wrap:wrap;gap:7px;margin-top:11px}
    .globalCountry{min-height:38px;padding:7px 10px;border-radius:999px;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.055);display:inline-flex;align-items:center;gap:6px;font-size:10px;line-height:1.1;font-weight:1000}
    .globalCountry.active{border-color:rgba(34,197,94,.52);background:rgba(34,197,94,.11);color:#d7ffe3}
    .globalCountry.future{border-color:rgba(246,196,83,.28);background:rgba(246,196,83,.055);color:rgba(255,250,240,.78)}
    .globalStatus{padding:4px 6px;border-radius:999px;font-size:8px;letter-spacing:.06em}
    .globalCountry.active .globalStatus{background:rgba(34,197,94,.18);color:#bfffd1}
    .globalCountry.future .globalStatus{background:rgba(246,196,83,.10);color:#ffe7a0}
    @media(max-width:560px){.globalDirection{padding:12px 10px}.globalContinents{font-size:9px;gap:5px}.globalCountries{gap:6px}.globalCountry{font-size:9px;padding:7px 8px}}
'''
if '</style>' not in s:
    raise SystemExit('Style principal introuvable')
s=s.replace('</style>',css+'\n  </style>',1)

needle='''      <strong data-i18n="claimWorld">Une source. Tous les canaux. Tous les continents.</strong>'''
block='''      <strong data-i18n="claimWorld">Une source. Tous les canaux. Tous les continents.</strong>
      <div class="globalDirection" id="digiyGlobalDirection" aria-label="Direction internationale DIGIYLYFE">
        <div class="globalContinents" data-i18n="globalContinents">AFRIQUE · EUROPE · AMÉRIQUE · MOYEN-ORIENT · ASIE</div>
        <p class="globalDirectionLead" data-i18n="globalLead">Sénégal et France déjà actifs. Le monde suit progressivement.</p>
        <div class="globalCountries">
          <a class="globalCountry active" href="https://digiylyfe.com/senegal.html">🇸🇳 <span data-i18n="globalSenegal">Sénégal</span> <b class="globalStatus" data-i18n="globalActive">ACTIF</b></a>
          <a class="globalCountry active" href="https://digiylyfe.com/france.html">🇫🇷 <span data-i18n="globalFrance">France</span> <b class="globalStatus" data-i18n="globalActive">ACTIF</b></a>
          <span class="globalCountry future">🇨🇮 <span data-i18n="globalIvory">Côte d’Ivoire</span> <b class="globalStatus" data-i18n="globalComing">À VENIR</b></span>
          <span class="globalCountry future">🇪🇸 <span data-i18n="globalSpain">Espagne</span> <b class="globalStatus" data-i18n="globalComing">À VENIR</b></span>
          <span class="globalCountry future">🇦🇪 <span data-i18n="globalUae">Émirats arabes unis</span> <b class="globalStatus" data-i18n="globalComing">À VENIR</b></span>
          <span class="globalCountry future">🇺🇸 <span data-i18n="globalUsa">États-Unis</span> <b class="globalStatus" data-i18n="globalComing">À VENIR</b></span>
        </div>
      </div>'''
if needle not in s:
    raise SystemExit('Ancre claimWorld introuvable')
s=s.replace(needle,block,1)

start=s.index('    var TEXT=')+len('    var TEXT=')
end=s.index(';\n\n    function setLang',start)
text=json.loads(s[start:end])
add={
'fr':{'globalContinents':'AFRIQUE · EUROPE · AMÉRIQUE · MOYEN-ORIENT · ASIE','globalLead':'Sénégal et France déjà actifs. Le monde suit progressivement.','globalSenegal':'Sénégal','globalFrance':'France','globalIvory':'Côte d’Ivoire','globalSpain':'Espagne','globalUae':'Émirats arabes unis','globalUsa':'États-Unis','globalActive':'ACTIF','globalComing':'À VENIR'},
'en':{'globalContinents':'AFRICA · EUROPE · AMERICA · MIDDLE EAST · ASIA','globalLead':'Senegal and France are already active. The world follows progressively.','globalSenegal':'Senegal','globalFrance':'France','globalIvory':'Côte d’Ivoire','globalSpain':'Spain','globalUae':'United Arab Emirates','globalUsa':'United States','globalActive':'ACTIVE','globalComing':'COMING'},
'es':{'globalContinents':'ÁFRICA · EUROPA · AMÉRICA · ORIENTE MEDIO · ASIA','globalLead':'Senegal y Francia ya están activos. El mundo sigue progresivamente.','globalSenegal':'Senegal','globalFrance':'Francia','globalIvory':'Costa de Marfil','globalSpain':'España','globalUae':'Emiratos Árabes Unidos','globalUsa':'Estados Unidos','globalActive':'ACTIVO','globalComing':'PRÓXIMAMENTE'},
'pt':{'globalContinents':'ÁFRICA · EUROPA · AMÉRICA · MÉDIO ORIENTE · ÁSIA','globalLead':'Senegal e França já estão ativos. O mundo segue progressivamente.','globalSenegal':'Senegal','globalFrance':'França','globalIvory':'Costa do Marfim','globalSpain':'Espanha','globalUae':'Emirados Árabes Unidos','globalUsa':'Estados Unidos','globalActive':'ATIVO','globalComing':'EM BREVE'},
'it':{'globalContinents':'AFRICA · EUROPA · AMERICA · MEDIO ORIENTE · ASIA','globalLead':'Senegal e Francia sono già attivi. Il mondo segue progressivamente.','globalSenegal':'Senegal','globalFrance':'Francia','globalIvory':'Costa d’Avorio','globalSpain':'Spagna','globalUae':'Emirati Arabi Uniti','globalUsa':'Stati Uniti','globalActive':'ATTIVO','globalComing':'IN ARRIVO'},
'de':{'globalContinents':'AFRIKA · EUROPA · AMERIKA · NAHER OSTEN · ASIEN','globalLead':'Senegal und Frankreich sind bereits aktiv. Die Welt folgt schrittweise.','globalSenegal':'Senegal','globalFrance':'Frankreich','globalIvory':'Elfenbeinküste','globalSpain':'Spanien','globalUae':'Vereinigte Arabische Emirate','globalUsa':'Vereinigte Staaten','globalActive':'AKTIV','globalComing':'DEMNÄCHST'},
'nl':{'globalContinents':'AFRIKA · EUROPA · AMERIKA · MIDDEN-OOSTEN · AZIË','globalLead':'Senegal en Frankrijk zijn al actief. De wereld volgt stap voor stap.','globalSenegal':'Senegal','globalFrance':'Frankrijk','globalIvory':'Ivoorkust','globalSpain':'Spanje','globalUae':'Verenigde Arabische Emiraten','globalUsa':'Verenigde Staten','globalActive':'ACTIEF','globalComing':'BINNENKORT'},
'ar':{'globalContinents':'أفريقيا · أوروبا · أمريكا · الشرق الأوسط · آسيا','globalLead':'السنغال وفرنسا نشطتان بالفعل. ويتوسع العالم تدريجيًا.','globalSenegal':'السنغال','globalFrance':'فرنسا','globalIvory':'ساحل العاج','globalSpain':'إسبانيا','globalUae':'الإمارات العربية المتحدة','globalUsa':'الولايات المتحدة','globalActive':'نشط','globalComing':'قريبًا'}
}
for lang, vals in add.items():
    text[lang].update(vals)
s=s[:start]+json.dumps(text,ensure_ascii=False,separators=(',',':'))+s[end:]
s=s.replace('index-france-senegal-cartouches-v1-20260831','index-global-direction-hero-v1-20260831',1)
p.write_text(s,encoding='utf-8')
print('Global hero direction patched')
