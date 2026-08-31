from pathlib import Path

p=Path('index.html')
s=p.read_text(encoding='utf-8')

repls={
"    .globalDirectionLead{margin:10px auto 0;max-width:690px;color:rgba(255,250,240,.82);font-size:12px;line-height:1.42;font-weight:900;text-align:center}":"    .globalDirectionLead{margin:10px auto 0;max-width:760px;color:#ffffff;font-size:clamp(15px,2.2vw,19px);line-height:1.35;font-weight:1000;text-align:center;letter-spacing:.01em;text-shadow:0 0 18px rgba(255,255,255,.34),0 2px 12px rgba(0,0,0,.24)}",
"    .globalCountries{display:flex;justify-content:center;flex-wrap:wrap;gap:7px;margin-top:11px}":"    .globalCountries{display:flex;justify-content:center;flex-wrap:wrap;gap:8px;margin-top:13px}",
"    .globalCountry{min-height:38px;padding:7px 10px;border-radius:999px;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.055);display:inline-flex;align-items:center;gap:6px;font-size:10px;line-height:1.1;font-weight:1000}":"    .globalCountry{min-height:46px;padding:9px 13px;border-radius:999px;border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.065);display:inline-flex;align-items:center;gap:7px;font-size:clamp(12px,1.8vw,15px);line-height:1.08;font-weight:1000;letter-spacing:.005em;box-shadow:0 8px 22px rgba(0,0,0,.16)}",
"    .globalStatus{padding:4px 6px;border-radius:999px;font-size:8px;letter-spacing:.06em}":"    .globalStatus{padding:5px 7px;border-radius:999px;font-size:10px;line-height:1;font-weight:1000;letter-spacing:.055em}",
"    @media(max-width:560px){.globalDirection{padding:12px 10px}.globalContinents{font-size:9px;gap:5px}.globalCountries{gap:6px}.globalCountry{font-size:9px;padding:7px 8px}}":"    @media(max-width:560px){.globalDirection{padding:13px 10px}.globalContinents{font-size:9px;gap:5px}.globalDirectionLead{font-size:15px}.globalCountries{gap:7px}.globalCountry{min-height:43px;font-size:11.5px;padding:8px 10px}.globalStatus{font-size:9px}}"
}

for old,new in repls.items():
    if old not in s:
        raise SystemExit('Ancre CSS introuvable: '+old[:70])
    s=s.replace(old,new,1)

old_build='index-global-direction-hero-v1-20260831'
new_build='index-global-direction-hero-v2-20260831'
if old_build not in s:
    raise SystemExit('Build v1 introuvable')
s=s.replace(old_build,new_build,1)

p.write_text(s,encoding='utf-8')
print('Hero international renforcé : blanc brillant + pays plus gros et gras')
