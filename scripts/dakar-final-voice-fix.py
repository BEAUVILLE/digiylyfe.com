from pathlib import Path

def one(s,old,new,label):
    if old not in s: raise SystemExit(label+' not found')
    return s.replace(old,new,1)

p=Path('assets/digiy-territoire-public-safety-v1.js'); s=p.read_text()
s=one(s,"var s=document.createElement('p');s.className='summary';s.textContent=t.summary;","var s=document.createElement('p');s.className='summary';s.textContent=need==='guidance'?(t.voiceSummary||t.summary):t.summary;",'voice summary')
s=one(s,"var m=document.createElement('div');m.className='meta';m.textContent='📍 '+zoneLabelFor(example)+' · DAKAR\\n🪪 '+t.meta;m.style.whiteSpace='pre-line';","var m=document.createElement('div');m.className='meta';m.textContent=need==='guidance'?'🎙️ '+(t.voiceMeta||'LA VOIX · DAKAR'):'📍 '+zoneLabelFor(example)+' · DAKAR\\n🪪 '+t.meta;m.style.whiteSpace='pre-line';",'voice meta')
s=one(s,"(example.services||[]).concat([t.qr||'Carte digitale · QR',t.price||'19 900 FCFA / mois',t.commission||'0 % commission']).forEach(function(x)","(example.services||[]).concat(need==='guidance'?[t.voiceNotTrade||'Pas une fiche métier',t.voiceAccess||'Accès direct au moteur vocal']:[t.qr||'Carte digitale · QR',t.price||'19 900 FCFA / mois',t.commission||'0 % commission']).forEach(function(x)",'voice services')
p.write_text(s)

p=Path('demo-dakar.html'); s=p.read_text()
s=one(s,"document.getElementById('voiceTry').textContent=u.voiceTry;var ve=","document.getElementById('voiceTry').textContent=u.voiceTry;document.getElementById('voiceBadge').textContent=pk.projection.voiceMeta;var ve=",'voice badge')
s=one(s,"document.getElementById('return').href=r.pathname+r.search;document.getElementById('back').href=r.pathname+r.search;document.querySelectorAll('[data-l]')","document.getElementById('return').href=r.pathname+r.search;document.getElementById('back').href=r.pathname+r.search;var vr=vp.querySelector('.actions .secondary');if(vr){vr.textContent=u.ret;vr.href=r.pathname+r.search}document.querySelectorAll('[data-l]')",'voice return')
p.write_text(s)
