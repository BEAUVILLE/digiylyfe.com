import pathlib, subprocess, re, json, csv, collections, hashlib, argparse
from html.parser import HTMLParser
from urllib.parse import urljoin,urlsplit
args=argparse.ArgumentParser();args.add_argument('--ref',default='1c974947727f125ee2785f4ba90b611fc11b95c7');args.add_argument('--out',default='audit/pwa-2026-10-15');opt=args.parse_args()
root=pathlib.Path.cwd();out=root/opt.out;out.mkdir(parents=True,exist_ok=True)
def contents(f):return subprocess.check_output(['git','show',opt.ref+':'+f])
files=subprocess.check_output(['git','ls-tree','-r','--name-only','-z',opt.ref]).decode().split('\0');files=[f for f in files if f]
rows=[]; inventory=[];known=set(files)
def add(f,line,kind,value):
 u=urlsplit(urljoin('https://digiylyfe.com/'+f,value))
 scope='local' if u.hostname=='digiylyfe.com' else 'sous-domaine' if (u.hostname or '').endswith('.digiylyfe.com') else 'externe/dynamique'
 flow='atelier/modèle' if f.startswith('masters/') else 'public'
 severity='P2 · risque à vérifier'
 state='statique; comportement appareil non testé'
 if 'whatsapp' in f or 'wa.me/' in value:flow='contact direct';severity='Info · conserver';state='destination conservée; aucun message envoyé'
 elif f.startswith('masters/'):severity='P3 · modèle/atelier';state='non exécuté; accès métier préservé'
 elif re.search(r'acces-proprietaire|auth|session|bon-a-tirer|campus-prive',f):flow='accès sécurisé';state='non exécuté; hors périmètre des corrections'
 elif kind.startswith('retour'):severity='Info · retour présent'
 if f=='voir-pdf-metier.html':flow='outils → brochures';severity='P2 · lecteur à vérifier'
 if f in ('carte/index.html','carte.index.html'):flow='carte → accueil'
 rows.append(dict(fichier=f,ligne=line,type=kind,cible=value[:500],domaine=scope,parcours=flow,gravite=severity,statut=state))
class Parser(HTMLParser):
 def handle_data(self,data):
  if getattr(self,'anchor',None):self.anchor[2].append(data)
 def handle_endtag(self,tag):
  if tag=='a' and getattr(self,'anchor',None):
   href,line,parts=self.anchor
   if re.search(r'retour|back|accueil|home|tous les outils', ''.join(parts),re.I):add(self.f,line,'retour_libelle',href)
   self.anchor=None
 def handle_starttag(self,t,attrs):
  a=dict(attrs);line=self.getpos()[0];href=a.get('href','')
  if t=='a':
   self.anchor=[href,line,[]]
   if a.get('target','').lower()=='_blank':add(self.f,line,'target_blank',href)
   if re.search(r'\.pdf(?:$|[?#])',href,re.I):add(self.f,line,'pdf_direct',href)
   if href and urlsplit(urljoin('https://digiylyfe.com/'+self.f,href)).hostname!='digiylyfe.com':add(self.f,line,'lien_autre_domaine',href)
   if href and not href.startswith(('#','mailto:','tel:','javascript:')):
    u=urlsplit(urljoin('https://digiylyfe.com/'+self.f,href))
    if u.hostname=='digiylyfe.com':
     p=u.path.lstrip('/');p=p+'index.html' if p.endswith('/') or not p else p
     if p not in known:add(self.f,line,'cible_locale_absente',href)
   if re.search(r'retour|back|accueil|home|outils',str(a),re.I):add(self.f,line,'retour_attribut',href)
  if t=='iframe':add(self.f,line,'iframe',a.get('src','dynamique'))
  if t=='meta' and a.get('http-equiv','').lower()=='refresh':add(self.f,line,'redirection_meta',a.get('content',''))
patterns={'window_open':r'window\s*\.\s*open\s*\([^;\n]{0,250}', 'redirection_js':r'(?:window\.)?location\.(?:href\s*=|assign\s*\(|replace\s*\()[^;\n]{0,200}', 'retour_historique':r'history\.(?:back|go)\s*\([^)]*\)', 'target_blank_js':r'\.target\s*=\s*[\"\']_blank[\"\']','affectation_href_js':r'\.href\s*=\s*[^;\n]{1,180}', 'location_directe':r'(?:window|document|top)\.location\s*=\s*[^;\n]{1,180}', 'pdf_reference':r'[\"\'][^\"\'\n<>]{0,160}\.pdf(?:\?[^\"\'\n<>]*)?[\"\']'}
for f in files:
 p=root/f;ext=p.suffix.lower();count=0
 if ext in ['.html','.js','.json','.webmanifest','.yml','.md','.css','.txt','.py','.sql','.xml']:
  s=contents(f).decode(errors='replace');before=len(rows)
  if ext=='.html':
   parser=Parser();parser.f=f;parser.feed(s)
  if ext in ['.html','.js']:
   for kind,pat in patterns.items():
    for m in re.finditer(pat,s):add(f,s.count('\n',0,m.start())+1,kind,m.group())
  if ext in ['.html','.js']:
   blocks=[(s,0)] if ext=='.js' else [(m.group(1),m.start(1)) for m in re.finditer(r'<script\b[^>]*>([\s\S]*?)</script>',s,re.I)]
   for code,offset in blocks:
    for m in re.finditer(r'''(?<!\.)\btarget\s*=\s*["']_blank["']''',code):add(f,s.count('\n',0,offset+m.start())+1,'target_blank_template_js',m.group())
    for m in re.finditer(r'''setAttribute\(\s*["']target["']\s*,\s*["']_blank["']''',code):add(f,s.count('\n',0,offset+m.start())+1,'target_blank_setattribute',m.group())
  count=len(rows)-before
 inventory.append(dict(fichier=f,extension=ext,octets=len(contents(f)),sha256=hashlib.sha256(contents(f)).hexdigest(),occurrences=count,controle='scan navigation' if ext in ['.html','.js'] else 'inventaire métadonnées; pas de revue métier'))
for name,data in [('inventaire-fichiers',inventory),('inventaire-navigation',rows)]:
 with (out/(name+'.csv')).open('w') as h:
  w=csv.DictWriter(h,fieldnames=data[0].keys());w.writeheader();w.writerows(data)
(out/'resume-inventaire.json').write_text(json.dumps({'commit':opt.ref,'fichiers':len(files),'extensions':dict(collections.Counter(x['extension'] for x in inventory)),'occurrences':dict(collections.Counter(x['type'] for x in rows))},ensure_ascii=False,indent=2))
print(json.dumps({'fichiers':len(files),'types':dict(collections.Counter(r['type'] for r in rows)),'cibles_absentes':[r for r in rows if r['type']=='cible_locale_absente']},ensure_ascii=False,indent=2))
