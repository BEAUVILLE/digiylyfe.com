from pathlib import Path
p=Path('assets/digiy-territoire-public-safety-v1.js')
s=p.read_text()
old="wanted.forEach(function(id){(EXAMPLES[id]||[]).forEach(function(ex,i){results.appendChild(placeholderCard(id,ex,i+1));});});"
new="wanted.forEach(function(id){(EXAMPLES[id]||[]).forEach(function(ex,i){results.appendChild(placeholderCard(id,ex,i));});});"
if old not in s:
    raise SystemExit('Dakar projection index marker not found')
s=s.replace(old,new,1)
p.write_text(s)
