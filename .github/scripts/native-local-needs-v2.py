from pathlib import Path

# 1) MAITRE TERRITOIRE: besoins locaux Petite Cote generes nativement
p=Path('assets/digiy-territoire-runtime-v1.js')
s=p.read_text(encoding='utf-8')
if "var LOCAL_NEEDS=" not in s:
    s=s.replace("var runtimeDefault='';", "var runtimeDefault='';\nvar LOCAL_NEEDS={'petite-cote':[['cleaning','🧹'],['professional','🏛️']]};")

label_repls={
"guidance:'La Voix'}}":"guidance:'La Voix',cleaning:'Service de nettoyage',professional:'Services professionnels'}}",
"guidance:'The Voice'}}":"guidance:'The Voice',cleaning:'Cleaning service',professional:'Professional services'}}",
"guidance:'La Voz'}}":"guidance:'La Voz',cleaning:'Servicio de limpieza',professional:'Servicios profesionales'}}",
"guidance:'A Voz'}}":"guidance:'A Voz',cleaning:'Serviço de limpeza',professional:'Serviços profissionais'}}",
"guidance:'Die Stimme'}}":"guidance:'Die Stimme',cleaning:'Reinigungsservice',professional:'Professionelle Dienste'}}",
"guidance:'La Voce'}}":"guidance:'La Voce',cleaning:'Servizio di pulizia',professional:'Servizi professionali'}}",
"guidance:'De Stem'}}":"guidance:'De Stem',cleaning:'Schoonmaakservice',professional:'Professionele diensten'}}",
"guidance:'الصوت'}}":"guidance:'الصوت',cleaning:'خدمة تنظيف',professional:'الخدمات المهنية'}}"
}
for a,b in label_repls.items(): s=s.replace(a,b)

meta_repls={
"guidance:'LA VOIX · ACTION PRO'},":"guidance:'LA VOIX · ACTION PRO',cleaning:'NETTOYAGE · MANÉ & GNING · Saly / Mbour',professional:'AVOCAT · NOTAIRE · COMPTABLE · ARCHITECTE'},",
"guidance:'THE VOICE · ACTION PRO'},":"guidance:'THE VOICE · ACTION PRO',cleaning:'CLEANING · MANÉ & GNING · Saly / Mbour',professional:'LAWYER · NOTARY · ACCOUNTANT · ARCHITECT'},",
"guidance:'LA VOZ · ACTION PRO'},":"guidance:'LA VOZ · ACTION PRO',cleaning:'LIMPIEZA · MANÉ & GNING · Saly / Mbour',professional:'ABOGADO · NOTARIO · CONTABLE · ARQUITECTO'},",
"guidance:'A VOZ · ACTION PRO'},":"guidance:'A VOZ · ACTION PRO',cleaning:'LIMPEZA · MANÉ & GNING · Saly / Mbour',professional:'ADVOGADO · NOTÁRIO · CONTABILISTA · ARQUITETO'},",
"guidance:'DIE STIMME · ACTION PRO'},":"guidance:'DIE STIMME · ACTION PRO',cleaning:'REINIGUNG · MANÉ & GNING · Saly / Mbour',professional:'ANWALT · NOTAR · BUCHHALTER · ARCHITEKT'},",
"guidance:'LA VOCE · ACTION PRO'},":"guidance:'LA VOCE · ACTION PRO',cleaning:'PULIZIA · MANÉ & GNING · Saly / Mbour',professional:'AVVOCATO · NOTAIO · COMMERCIALISTA · ARCHITETTO'},",
"guidance:'DE STEM · ACTION PRO'},":"guidance:'DE STEM · ACTION PRO',cleaning:'SCHOONMAAK · MANÉ & GNING · Saly / Mbour',professional:'ADVOCAAT · NOTARIS · BOEKHOUDER · ARCHITECT'},",
"guidance:'الصوت · ACTION PRO'}":"guidance:'الصوت · ACTION PRO',cleaning:'تنظيف · MANÉ & GNING · سالي / مبور',professional:'محامٍ · موثق · محاسب · مهندس معماري'}"
}
for a,b in meta_repls.items(): s=s.replace(a,b)

old="""function renderNeeds(){\n  var root=document.getElementById('needs'),tr=T[lang],meta=(NEED_META[lang]||NEED_META.fr);root.innerHTML='';\n  NEEDS.forEach(function(n){"""
new="""function renderNeeds(){\n  var root=document.getElementById('needs'),tr=T[lang],meta=(NEED_META[lang]||NEED_META.fr);root.innerHTML='';\n  var list=NEEDS.slice(),extras=LOCAL_NEEDS[territoryId]||[],at=list.length;\n  var artisanIndex=list.findIndex(function(n){return n[0]==='artisan'});if(artisanIndex>=0)at=artisanIndex+1;\n  extras.forEach(function(x){if(!list.some(function(n){return n[0]===x[0]})){list.splice(at,0,x);at++}});\n  list.forEach(function(n){"""
if old not in s:
    raise SystemExit('renderNeeds signature not found')
s=s.replace(old,new)
p.write_text(s,encoding='utf-8')

# 2) Aiguillage vers les MASTER canoniques
p=Path('assets/digiy-territoire-public-module-doors-v2.js')
s=p.read_text(encoding='utf-8')
needle="  '🔧':'https://build.digiylyfe.com/master.html',\n"
if "'🧹':'https://digiylyfe.com/nettoyage-master.html'" not in s:
    s=s.replace(needle, needle+"  '🧹':'https://digiylyfe.com/nettoyage-master.html',\n  '🏛️':'https://digiylyfe.com/services-professionnels-master.html',\n")
p.write_text(s,encoding='utf-8')

# 3) Territoire: retirer les deux injections locales devenues obsoletes
p=Path('territoire.html')
s=p.read_text(encoding='utf-8')
lines=[]
for line in s.splitlines():
    if 'digiy-territoire-petite-cote-cleaning-v1.js' in line: continue
    if 'digiy-territoire-petite-cote-professional-services-v1.js' in line: continue
    lines.append(line)
s='\n'.join(lines)+'\n'
s=s.replace('digiy-territoire-runtime-v1.js?v=20260830-native-doors-v1','digiy-territoire-runtime-v1.js?v=20260830-native-local-v2')
s=s.replace('digiy-territoire-public-module-doors-v2.js?v=20260830-master-native-v1','digiy-territoire-public-module-doors-v2.js?v=20260830-master-native-v2')
s=s.replace('/sw.js?v=20260830-master-ui-v7','/sw.js?v=20260830-master-ui-v8')
p.write_text(s,encoding='utf-8')

# 4) PWA V8 sur les entrees du tronc
for fn in ['index.html','nettoyage-master.html','services-professionnels-master.html']:
    p=Path(fn)
    if p.exists():
        s=p.read_text(encoding='utf-8').replace('/sw.js?v=20260830-master-ui-v7','/sw.js?v=20260830-master-ui-v8')
        p.write_text(s,encoding='utf-8')
p=Path('sw.js'); s=p.read_text(encoding='utf-8').replace('digiylyfe-pwa-20260830-master-ui-v7','digiylyfe-pwa-20260830-master-ui-v8'); p.write_text(s,encoding='utf-8')
