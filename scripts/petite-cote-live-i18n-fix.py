from pathlib import Path

p=Path('assets/digiy-territoire-runtime-v1.js')
s=p.read_text()
old="""      var ms=met[c.metier_id]||{},need=getNeed(ms.slug,c.category),services=String(c.activity_label||ms.label||'').split(/\\s*[·•]\\s*/).filter(Boolean),contacts=[];
      if(c.public_url)contacts.push({label:T[lang].profile,url:c.public_url});
      var wd=phoneDigits(c.whatsapp_public);if(wd)contacts.push({label:T[lang].whatsapp,url:'https://wa.me/'+wd+'?text='+encodeURIComponent('Bonjour '+c.display_name+', je viens de DIGIYLYFE.')});
      var pd=phoneDigits(c.phone_public);if(pd)contacts.push({label:T[lang].call,url:'tel:+'+pd});
"""
new="""      var ms=met[c.metier_id]||{},need=getNeed(ms.slug,c.category),services=String(c.activity_label||ms.label||'').split(/\\s*[·•]\\s*/).filter(Boolean),contacts=[];
      if(c.public_url)contacts.push({kind:'profile',url:c.public_url});
      var wd=phoneDigits(c.whatsapp_public);if(wd)contacts.push({kind:'whatsapp',phone:wd});
      var pd=phoneDigits(c.phone_public);if(pd)contacts.push({kind:'call',phone:pd});
"""
if old not in s:
    raise SystemExit('live contacts block not found')
s=s.replace(old,new,1)
old2="function contactsOf(p){if(p.contacts&&p.contacts.length)return p.contacts;return p.url?[{label:T[lang].profile,url:p.url}]:[]}"
new2="""function whatsappMessage(name){var M={fr:'Bonjour {name}, je viens de DIGIYLYFE.',en:'Hello {name}, I found you on DIGIYLYFE.',es:'Hola {name}, le encontré en DIGIYLYFE.',pt:'Olá {name}, encontrei-o na DIGIYLYFE.',de:'Hallo {name}, ich habe Sie auf DIGIYLYFE gefunden.',it:'Buongiorno {name}, l’ho trovata su DIGIYLYFE.',nl:'Hallo {name}, ik heb u gevonden via DIGIYLYFE.',ar:'مرحباً {name}، وجدتك عبر DIGIYLYFE.'};return(M[lang]||M.fr).replace('{name}',name||'');}
function contactsOf(p){if(p.contacts&&p.contacts.length)return p.contacts.map(function(c){if(c.kind==='profile')return{label:T[lang].profile,url:c.url};if(c.kind==='whatsapp')return{label:T[lang].whatsapp,url:'https://wa.me/'+c.phone+'?text='+encodeURIComponent(whatsappMessage(p.name))};if(c.kind==='call')return{label:T[lang].call,url:'tel:+'+c.phone};return{label:c.label||T[lang].profile,url:c.url||'#'}});return p.url?[{label:T[lang].profile,url:p.url}]:[]}"""
if old2 not in s:
    raise SystemExit('contactsOf block not found')
s=s.replace(old2,new2,1)
if "guidance:'Guidance'" not in s:
    raise SystemExit('english guidance label not found')
s=s.replace("guidance:'Guidance'","guidance:'The Voice'",1)
p.write_text(s)

p=Path('saly.html')
s=p.read_text()
old3="r.searchParams.set('local',state.local);if(state.need)r.searchParams.set('need',state.need);document.getElementById('realBtn').href=r.pathname+r.search;"
new3="r.searchParams.set('local',state.local);if(state.need)r.searchParams.set('need',state.need);r.searchParams.set('lang',l);document.getElementById('realBtn').href=r.pathname+r.search;"
if old3 not in s:
    raise SystemExit('Saly real route block not found')
s=s.replace(old3,new3,1)
p.write_text(s)

p=Path('territoire.html')
s=p.read_text()
old4='<script src="/assets/digiy-territoire-runtime-v1.js" defer></script>'
new4='<script src="/assets/digiy-territoire-runtime-v1.js?v=20260827-live-i18n-v2" defer></script>'
if old4 not in s:
    raise SystemExit('territory runtime script marker not found')
s=s.replace(old4,new4,1)
p.write_text(s)
