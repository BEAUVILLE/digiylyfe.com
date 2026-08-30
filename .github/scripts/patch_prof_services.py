from pathlib import Path

# MASTER commun
p = Path('assets/digiy-public-module-master-v2.js')
s = p.read_text(encoding='utf-8')
s = s.replace('https://mane-gning.digiylyfe.com/assets/mane-gning/poster.avif','https://mane-gning.digiylyfe.com/media/mane-gning-poster.avif')
s = s.replace("cleaning:[['🧹','Nettoyage maison'],['🏨','Hôtels & résidences'],['🏢','Bureaux & commerces'],['✨','Remise en état']]","cleaning:[['🧹','Nettoyage maison'],['🧼','Entretien régulier'],['🏢','Bureaux & commerces'],['✨','Remise en état']]")
s = s.replace("cleaning:'SERVICE DE NETTOYAGE',guidance:'LA VOIX DU BUSINESS'","cleaning:'SERVICE DE NETTOYAGE',professional:'SERVICES PROFESSIONNELS',guidance:'LA VOIX DU BUSINESS'")
needle = " cleaning:[['🧹','Nettoyage maison'],['🧼','Entretien régulier'],['🏢','Bureaux & commerces'],['✨','Remise en état']],\n"
if "professional:[['⚖️','Avocat']" not in s:
    s = s.replace(needle, needle + " professional:[['⚖️','Avocat'],['🖋️','Notaire'],['📊','Comptable'],['📐','Architecte']],\n")
p.write_text(s, encoding='utf-8')

# MASTER services professionnels
Path('services-professionnels-master.html').write_text('''<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="robots" content="index,follow">
<meta name="theme-color" content="#0a2b20">
<title>SERVICES PROFESSIONNELS · MASTER TERRITORIAL</title>
<meta name="description" content="Services professionnels DIGIYLYFE par territoire : avocat, notaire, comptable, architecte, contact direct et 0 % commission.">
<link rel="canonical" href="https://digiylyfe.com/services-professionnels-master.html">
<link rel="stylesheet" href="/assets/digiy-master-ui-v1.css?v=20260830-pro-services-v1">
</head>
<body data-digiy-module="professional">
<div id="digiy-master-root"></div>
<script src="/assets/digiy-public-module-master-v2.js?v=20260830-pro-services-v1"></script>
<script src="/assets/digiy-public-module-local-filter-v1.js?v=20260829-local-v1"></script>
<script>
if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js?v=20260830-master-ui-v7').catch(function(){})})}
</script>
</body>
</html>
''', encoding='utf-8')

# Porte Petite Côte
Path('assets/digiy-territoire-petite-cote-professional-services-v1.js').write_text(r'''/* DIGIYLYFE — PETITE COTE · porte SERVICES PROFESSIONNELS V1 */
(function(){'use strict';
var LANGS=['fr','en','es','pt','de','it','nl','ar'];
var TEXT={
 fr:{title:'SERVICES PROFESSIONNELS',meta:'Avocat · Notaire · Comptable · Architecte'},
 en:{title:'PROFESSIONAL SERVICES',meta:'Lawyer · Notary · Accountant · Architect'},
 es:{title:'SERVICIOS PROFESIONALES',meta:'Abogado · Notario · Contable · Arquitecto'},
 pt:{title:'SERVIÇOS PROFISSIONAIS',meta:'Advogado · Notário · Contabilista · Arquiteto'},
 de:{title:'PROFESSIONELLE DIENSTE',meta:'Anwalt · Notar · Buchhalter · Architekt'},
 it:{title:'SERVIZI PROFESSIONALI',meta:'Avvocato · Notaio · Commercialista · Architetto'},
 nl:{title:'PROFESSIONELE DIENSTEN',meta:'Advocaat · Notaris · Boekhouder · Architect'},
 ar:{title:'الخدمات المهنية',meta:'محامٍ · موثق · محاسب · مهندس معماري'}
};
function params(){try{return new URLSearchParams(location.search)}catch(e){return new URLSearchParams()}}
function active(){return (params().get('zone')||'')==='petite-cote'}
function lang(){var l=(document.documentElement.lang||params().get('lang')||'fr').slice(0,2).toLowerCase();return LANGS.indexOf(l)>=0?l:'fr'}
function target(l){var p=params(),u=new URL('https://digiylyfe.com/services-professionnels-master.html');u.searchParams.set('territory','petite-cote');var local=p.get('local')||'';if(local)u.searchParams.set('local',local);u.searchParams.set('lang',l||lang());return u.toString()}
function install(){
 var root=document.getElementById('needs');if(!root)return;
 var old=root.querySelector('[data-digiy-professional-services-door]');
 if(!active()){if(old)old.remove();return}
 var l=lang(),x=TEXT[l]||TEXT.fr;
 if(old){old.href=target(l);var t=old.querySelector('[data-pro-title]'),m=old.querySelector('[data-pro-meta]');if(t)t.textContent=x.title;if(m)m.textContent=x.meta;return}
 var a=document.createElement('a');a.className='need';a.href=target(l);a.setAttribute('data-digiy-professional-services-door','1');a.style.textDecoration='none';
 var ic=document.createElement('strong');ic.textContent='🏛️';
 var title=document.createElement('span');title.setAttribute('data-pro-title','1');title.textContent=x.title;
 var meta=document.createElement('small');meta.setAttribute('data-pro-meta','1');meta.textContent=x.meta;
 a.append(ic,title,meta);
 var cleaning=root.querySelector('[data-digiy-cleaning-door]');
 if(cleaning&&cleaning.nextSibling)root.insertBefore(a,cleaning.nextSibling);else if(cleaning)root.appendChild(a);else root.appendChild(a);
}
function boot(){install();var root=document.getElementById('needs');if(root)new MutationObserver(function(){setTimeout(install,0)}).observe(root,{childList:true});document.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('[data-lang]'))setTimeout(install,80)});window.addEventListener('popstate',function(){setTimeout(install,50)})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
''', encoding='utf-8')

# Nettoyage : moteur corrigé + PWA v7
p = Path('nettoyage-master.html')
s = p.read_text(encoding='utf-8')
s = s.replace('digiy-public-module-master-v2.js?v=20260830-open-v2','digiy-public-module-master-v2.js?v=20260830-open-v3')
s = s.replace('/sw.js?v=20260830-master-ui-v6','/sw.js?v=20260830-master-ui-v7')
p.write_text(s, encoding='utf-8')

# Territoire : nouvelle porte + PWA v7
p = Path('territoire.html')
s = p.read_text(encoding='utf-8')
line = '<script src="/assets/digiy-territoire-petite-cote-professional-services-v1.js?v=20260830-v1" defer></script>\n'
anchor = '<script src="/assets/digiy-territoire-public-module-doors-v2.js?v=20260830-master-native-v1" defer></script>\n'
if line not in s:
    s = s.replace(anchor, line + anchor)
s = s.replace('/sw.js?v=20260830-master-ui-v6','/sw.js?v=20260830-master-ui-v7')
p.write_text(s, encoding='utf-8')

# PWA v7
p = Path('sw.js')
s = p.read_text(encoding='utf-8').replace('digiylyfe-pwa-20260830-master-ui-v6','digiylyfe-pwa-20260830-master-ui-v7')
p.write_text(s, encoding='utf-8')

p = Path('index.html')
s = p.read_text(encoding='utf-8').replace('/sw.js?v=20260830-master-ui-v6','/sw.js?v=20260830-master-ui-v7')
p.write_text(s, encoding='utf-8')
