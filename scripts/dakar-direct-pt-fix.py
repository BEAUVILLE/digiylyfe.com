from pathlib import Path

def one(s, old, new, label):
    if old not in s:
        raise SystemExit(label + ' not found')
    return s.replace(old, new, 1)

p = Path('assets/digiy-territoire-runtime-v1.js')
s = p.read_text()
s = one(
    s,
    "if(c.directDoor&&c.directDoor.url){doorLink.href=c.directDoor.url;doorLink.textContent=c.directDoor.label||'OUVRIR →';door.classList.add('show')}else door.classList.remove('show');",
    "if(c.directDoor&&c.directDoor.url){doorLink.href=c.directDoor.url;doorLink.textContent=(territoryId==='dakar'&&lang==='pt')?'DAKAR EM DIRETO →':(c.directDoor.label||'OUVRIR →');door.classList.add('show')}else door.classList.remove('show');",
    'direct door render'
)
p.write_text(s)

p = Path('territoire.html')
s = p.read_text()
s = one(s, 'digiy-territoire-runtime-v1.js?v=20260827-live-i18n-v2', 'digiy-territoire-runtime-v1.js?v=20260827-live-i18n-v3', 'runtime cache bust')
p.write_text(s)
