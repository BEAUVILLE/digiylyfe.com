from pathlib import Path

index = Path('index.html')
s = index.read_text()
repls = {
    '<span class="territoryCountry">🇺🇸 <b>ÉTATS-UNIS</b></span>':'<span class="territoryCountry">🇺🇸 <b data-miami-country>ÉTATS-UNIS</b></span>',
    '<strong>DIGIY MIAMI</strong>':'<strong data-miami-title>DIGIY MIAMI</strong>',
    '<small>Miami · Floride · territoire ouvert</small>':'<small data-miami-zones>Miami · Floride · territoire ouvert</small>',
    '<span class="territoryBtn">OUVRIR LE TERRITOIRE</span>':'<span class="territoryBtn" data-miami-open>OUVRIR LE TERRITOIRE</span>',
    '<strong>🇺🇸 ÉTATS-UNIS · MIAMI PILOT</strong>':'<strong data-miami-sector-title>🇺🇸 ÉTATS-UNIS · MIAMI PILOT</strong>',
    '<small>1 TERRITOIRE PILOTE · Miami · Florida</small>':'<small data-miami-sector-sub>1 TERRITOIRE PILOTE · Miami · Florida</small>'
}
for old, new in repls.items():
    if s.count(old) != 1:
        raise SystemExit(f'index anchor expected once: {old[:42]} found={s.count(old)}')
    s = s.replace(old, new, 1)
index.write_text(s)

p = Path('assets/digiy-miami-door-v1.js')
j = p.read_text()
old_t = "fr:{country:'ÉTATS-UNIS',title:'DIGIY MIAMI',zones:'Miami · Floride · territoire ouvert',open:'OUVRIR LE TERRITOIRE'},\nen:{country:'UNITED STATES',title:'DIGIY MIAMI',zones:'Miami · Florida · territory open',open:'OPEN THE TERRITORY'},\nes:{country:'ESTADOS UNIDOS',title:'DIGIY MIAMI',zones:'Miami · Florida · territorio abierto',open:'ABRIR EL TERRITORIO'},\npt:{country:'ESTADOS UNIDOS',title:'DIGIY MIAMI',zones:'Miami · Flórida · território aberto',open:'ABRIR O TERRITÓRIO'},\nit:{country:'STATI UNITI',title:'DIGIY MIAMI',zones:'Miami · Florida · territorio aperto',open:'APRI IL TERRITORIO'},\nde:{country:'VEREINIGTE STAATEN',title:'DIGIY MIAMI',zones:'Miami · Florida · Gebiet geöffnet',open:'GEBIET ÖFFNEN'},\nnl:{country:'VERENIGDE STATEN',title:'DIGIY MIAMI',zones:'Miami · Florida · gebied open',open:'OPEN HET GEBIED'},\nar:{country:'الولايات المتحدة',title:'DIGIY MIAMI',zones:'ميامي · فلوريدا · المنطقة مفتوحة',open:'افتح المنطقة'}"
new_t = "fr:{country:'ÉTATS-UNIS',title:'DIGIY MIAMI',zones:'Miami · Floride · territoire ouvert',open:'OUVRIR LE TERRITOIRE',sector:'🇺🇸 ÉTATS-UNIS · MIAMI PILOT',sectorSub:'1 TERRITOIRE PILOTE · Miami · Florida'},\nen:{country:'UNITED STATES',title:'DIGIY MIAMI',zones:'Miami · Florida · territory open',open:'OPEN THE TERRITORY',sector:'🇺🇸 UNITED STATES · MIAMI PILOT',sectorSub:'1 PILOT TERRITORY · Miami · Florida'},\nes:{country:'ESTADOS UNIDOS',title:'DIGIY MIAMI',zones:'Miami · Florida · territorio abierto',open:'ABRIR EL TERRITORIO',sector:'🇺🇸 ESTADOS UNIDOS · MIAMI PILOT',sectorSub:'1 TERRITORIO PILOTO · Miami · Florida'},\npt:{country:'ESTADOS UNIDOS',title:'DIGIY MIAMI',zones:'Miami · Flórida · território aberto',open:'ABRIR O TERRITÓRIO',sector:'🇺🇸 ESTADOS UNIDOS · MIAMI PILOT',sectorSub:'1 TERRITÓRIO PILOTO · Miami · Florida'},\nit:{country:'STATI UNITI',title:'DIGIY MIAMI',zones:'Miami · Florida · territorio aperto',open:'APRI IL TERRITORIO',sector:'🇺🇸 STATI UNITI · MIAMI PILOT',sectorSub:'1 TERRITORIO PILOTA · Miami · Florida'},\nde:{country:'VEREINIGTE STAATEN',title:'DIGIY MIAMI',zones:'Miami · Florida · Gebiet geöffnet',open:'GEBIET ÖFFNEN',sector:'🇺🇸 VEREINIGTE STAATEN · MIAMI PILOT',sectorSub:'1 PILOTGEBIET · Miami · Florida'},\nnl:{country:'VERENIGDE STATEN',title:'DIGIY MIAMI',zones:'Miami · Florida · gebied open',open:'OPEN HET GEBIED',sector:'🇺🇸 VERENIGDE STATEN · MIAMI PILOT',sectorSub:'1 PILOTGEBIED · Miami · Florida'},\nar:{country:'الولايات المتحدة',title:'DIGIY MIAMI',zones:'ميامي · فلوريدا · المنطقة مفتوحة',open:'افتح المنطقة',sector:'🇺🇸 الولايات المتحدة · MIAMI PILOT',sectorSub:'منطقة تجريبية واحدة · ميامي · فلوريدا'}"
if j.count(old_t) != 1:
    raise SystemExit(f'Miami translation map anchor found={j.count(old_t)}')
j = j.replace(old_t, new_t, 1)
old_apply = "const l=lang(),t=T[l];a.href='/miami.html?lang='+l;a.querySelector('[data-miami-country]').textContent=t.country;a.querySelector('[data-miami-title]').textContent=t.title;a.querySelector('[data-miami-zones]').textContent=t.zones;a.querySelector('[data-miami-open]').textContent=t.open;a.querySelector('[data-miami-photo]').src=IMG"
new_apply = "const l=lang(),t=T[l],sector=document.querySelector('[data-digiy-usa-sector=\"1\"]');a.href='/miami.html?lang='+l;const country=a.querySelector('[data-miami-country]'),title=a.querySelector('[data-miami-title]'),zones=a.querySelector('[data-miami-zones]'),open=a.querySelector('[data-miami-open]'),photo=a.querySelector('[data-miami-photo]');if(country)country.textContent=t.country;if(title)title.textContent=t.title;if(zones)zones.textContent=t.zones;if(open)open.textContent=t.open;if(photo)photo.src=IMG;if(sector){const st=sector.querySelector('[data-miami-sector-title]'),ss=sector.querySelector('[data-miami-sector-sub]');if(st)st.textContent=t.sector;if(ss)ss.textContent=t.sectorSub}"
if j.count(old_apply) != 1:
    raise SystemExit(f'Miami apply anchor found={j.count(old_apply)}')
j = j.replace(old_apply, new_apply, 1)
p.write_text(j)
