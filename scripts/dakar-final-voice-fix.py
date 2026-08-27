from pathlib import Path
p=Path('assets/digiy-territoire-public-safety-v1.js')
s=p.read_text()
old="wanted.forEach(function(id){(EXAMPLES[id]||[]).forEach(function(ex,i){results.appendChild(placeholderCard(id,ex,i+1));});});"
new="wanted.forEach(function(id){(EXAMPLES[id]||[]).forEach(function(ex,i){results.appendChild(placeholderCard(id,ex,i));});});"
if old in s:
    s=s.replace(old,new,1)
elif new not in s:
    raise SystemExit('Dakar projection index marker not found')
p.write_text(s)

p=Path('territoire.html')
s=p.read_text()
old='digiy-territoire-public-safety-v1.js?v=20260827-dakar-master-v1'
new='digiy-territoire-public-safety-v1.js?v=20260827-dakar-master-v2'
if old in s:
    s=s.replace(old,new,1)
elif new not in s:
    raise SystemExit('Dakar safety cache marker not found')
p.write_text(s)
