from pathlib import Path

fav = Path('assets/digiy-territoire-favoris-v1.js')
html = Path('territoire.html')

s = fav.read_text(encoding='utf-8')
old = "function updateButton(b,id){var on=active(id),t=tr(),pressed=on?'true':'false',label=on?'★':'☆',aria=on?t.on:t.add;b.classList.toggle('active',on);if(b.getAttribute('aria-pressed')!==pressed)b.setAttribute('aria-pressed',pressed);if(b.getAttribute('aria-label')!==aria)b.setAttribute('aria-label',aria);if(b.textContent!==label)b.textContent=label;}"
new = "function updateButton(b,id){var on=active(id),pressed=on?'true':'false',label=on?'★':'☆',aria=label;b.classList.toggle('active',on);if(b.getAttribute('aria-pressed')!==pressed)b.setAttribute('aria-pressed',pressed);if(b.getAttribute('aria-label')!==aria)b.setAttribute('aria-label',aria);if(b.textContent!==label)b.textContent=label;}"
assert s.count(old) == 1, f'updateButton occurrence={s.count(old)}'
s = s.replace(old, new)
old2 = "b.type='button';b.className='digiyTerritoryFav';b.setAttribute('aria-label','MON DIGIY');"
new2 = "b.type='button';b.className='digiyTerritoryFav';b.setAttribute('aria-label','☆');"
assert s.count(old2) == 1, f'initial aria occurrence={s.count(old2)}'
s = s.replace(old2, new2)
old3 = "html[dir=\"rtl\"] .digiyTerritoryFav{right:auto;left:10px;direction:rtl}\\n.digiyGalleryFavoriteStar:hover,.digiyGalleryFavoriteStar:focus-visible{transform:none!important}\\n'"
new3 = "html[dir=\"rtl\"] .digiyTerritoryFav{right:auto;left:10px;direction:rtl}\\n.digiyTerritoryFav::before,.digiyTerritoryFav::after{content:none!important;display:none!important}\\n.digiyGalleryFavoriteStar:hover,.digiyGalleryFavoriteStar:focus-visible{transform:none!important}\\n'"
assert s.count(old3) == 1, f'style occurrence={s.count(old3)}'
s = s.replace(old3, new3)
fav.write_text(s, encoding='utf-8')

h = html.read_text(encoding='utf-8')
oldv = '/assets/digiy-territoire-favoris-v1.js?v=20260906-v6'
newv = '/assets/digiy-territoire-favoris-v1.js?v=20260906-v7'
assert h.count(oldv) == 1, f'version occurrence={h.count(oldv)}'
h = h.replace(oldv, newv)
html.write_text(h, encoding='utf-8')
