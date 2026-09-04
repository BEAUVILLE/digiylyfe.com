from pathlib import Path

root = Path('.')
asset_tag = '  <script src="https://digiylyfe.com/assets/digiy-card-favorite-v1.js?v=20260904-v1"></script>'
masters = [
    'masters/MASTER-CARTE-SERVICE-ARTISAN-INDUSTRIEL-V3-8-LANGUES.html',
    'masters/MASTER-CARTE-COMMERCE-INDUSTRIEL-V1-8-LANGUES.html',
    'masters/MASTER-CARTE-LIEU-TOURISME-INDUSTRIEL-V1-8-LANGUES.html',
    'masters/MASTER-CARTE-BEAUTE-RESTAURATION-ACTIVITE-VISUELLE-INDUSTRIEL-V1-8-LANGUES.html',
]

for rel in masters:
    path = root / rel
    text = path.read_text(encoding='utf-8')
    if 'digiy-card-favorite-v1.js' not in text:
        if '</body>' not in text:
            raise SystemExit(f'</body> introuvable dans {rel}')
        text = text.replace('</body>', asset_tag + '\n</body>', 1)
        path.write_text(text, encoding='utf-8')

path = root / 'mon-digiy.html'
text = path.read_text(encoding='utf-8')
text = text.replace('mon-digiy-local-carnet-catalog-v2-20260904', 'mon-digiy-card-favorites-v3-20260904')

save_anchor = "      function save(a){try{localStorage.setItem(KEY,JSON.stringify(a));}catch(e){}}"
importer = """      function saveMeta(map){try{localStorage.setItem(META_KEY,JSON.stringify(map));}catch(e){}}
      function safeImportHref(v){try{var u=new URL(String(v||'').trim());return /^https?:$/.test(u.protocol)?u.toString():'';}catch(e){return'';}}
      function importFavoriteFromUrl(){
        try{
          var p=new URLSearchParams(location.search);
          if(p.get('digiy_add')!=='1')return false;
          var id=String(p.get('id')||'').trim().replace(/[^a-zA-Z0-9:_-]+/g,'-').slice(0,180);
          var label=String(p.get('label')||'').trim().slice(0,120);
          var href=safeImportHref(p.get('href')||'');
          if(!id||!label||!href)return false;
          var ids=load();
          if(ids.indexOf(id)===-1){ids.unshift(id);save(ids);}
          var meta=loadMeta();
          meta[id]={id:id,href:href,icon:'🪪',label:label,kind:'professionnel'};
          var job=String(p.get('job')||'').trim().slice(0,100),zone=String(p.get('zone')||'').trim().slice(0,100);
          if(job||zone)meta[id].detail=[job,zone].filter(Boolean).join(' · ');
          saveMeta(meta);
          ['digiy_add','id','label','href','kind','icon','job','zone'].forEach(function(k){p.delete(k);});
          var q=p.toString();
          history.replaceState(null,'',location.pathname+(q?'?'+q:'')+location.hash);
          return true;
        }catch(e){return false;}
      }"""

if 'function importFavoriteFromUrl()' not in text:
    if save_anchor not in text:
        raise SystemExit('Ancre save() introuvable dans mon-digiy.html')
    text = text.replace(save_anchor, save_anchor + '\n' + importer, 1)

call_anchor = "      var initial='fr';"
if '      importFavoriteFromUrl();\n' not in text:
    if call_anchor not in text:
        raise SystemExit('Ancre initial introuvable dans mon-digiy.html')
    text = text.replace(call_anchor, "      importFavoriteFromUrl();\n" + call_anchor, 1)

path.write_text(text, encoding='utf-8')
