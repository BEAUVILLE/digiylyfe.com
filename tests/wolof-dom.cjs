// DOM regression checks, no network or production database access. Requires jsdom.
const {JSDOM, ResourceLoader, VirtualConsole}=require('jsdom');
const fs=require('node:fs'), path=require('node:path'), assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const scripts=['assets/digiy-language-route-v1.js','assets/digiy-home-world10-v1.js','assets/digiy-home-i18n-v1.js','assets/digiy-petite-cote-config-v1.js','assets/digiy-metier-dictionary-v1.js','assets/digiy-territoire-dictionary-v1.js','assets/i18n/recherche-v5-data.js','assets/i18n/recherche-v5-app.js','recherche-cartes-officielles.js'];
class Local extends ResourceLoader {
  fetch(url){const p=new URL(url).pathname.slice(1);return Promise.resolve(Buffer.from(scripts.includes(p)?fs.readFileSync(path.join(root,p),'utf8'):''));}
}
async function load(file,query='',saved='',blocked=false){
  const errors=[],console=new VirtualConsole();console.on('jsdomError',e=>errors.push(e.message));
  const dom=new JSDOM(fs.readFileSync(path.join(root,file),'utf8'),{
    url:'https://digiylyfe.com/'+file+query,runScripts:'dangerously',resources:new Local(),virtualConsole:console,
    beforeParse(w){w.fetch=async()=>({ok:true,json:async()=>[]});
      if(saved)w.localStorage.setItem('digiy-lang',saved);
      if(blocked)Object.defineProperty(w,'localStorage',{get(){throw Error('denied')}});
    }
  });
  await new Promise(r=>dom.window.addEventListener('load',()=>setTimeout(r,30)));
  assert.deepEqual(errors,[]);
  return dom;
}
const tick=()=>new Promise(r=>setTimeout(r,30));
(async()=>{
  let home=await load('index.html','?lang=wo');
  assert.equal(home.window.document.documentElement.lang,'wo');
  assert.match(home.window.document.querySelector('a[href*="saly.html"]').href,/lang=wo/);home.window.close();
  let dom=await load('saly.html','','wo'),w=dom.window,d=w.document;
  assert.equal(d.documentElement.lang,'wo');
  assert.match(d.querySelector('#salyPublicQuestion').textContent,/Lan ngay seet/);
  assert.match(d.querySelector('#needs').textContent,/DEM AK DIKK/);
  assert.match(d.querySelector('#cards').textContent,/weer/);
  assert.match(d.querySelector('#realGrid').textContent,/Amagul/);
  const link=new URL(d.querySelector('[data-lien="find"]').href);
  assert.equal(link.searchParams.get('lang'),'wo');assert.equal(link.searchParams.get('city'),'Saly');
  assert.equal(link.pathname,'/recherche.html');
  assert.equal(new URL(d.querySelector('a[href*="partenaire-lamine"]').href).searchParams.get('lang'),'wo');
  assert.equal(w.DIGIY_LANGUAGE_ROUTE.withLanguage('https://wa.me/221000?text=hello'),'https://wa.me/221000?text=hello');
  const pack=w.DIGIY_PETITE_COTE.getPack('wo');
  assert.equal(pack.lang,'wo');assert.equal(Object.values(pack.examples).flat().length,27);
  dom.window.close();
  dom=await load('recherche.html','?lang=wo&city=Saly');w=dom.window;d=w.document;
  assert.equal(d.querySelector('#city').value,'Saly');assert.equal(d.querySelector('#submitBtn').textContent,'Seet');
  assert.deepEqual(Object.keys(w.DIGIY_SEARCH_DATA.T.wo).sort(),Object.keys(w.DIGIY_SEARCH_DATA.T.fr).sort());
  d.querySelector('#query').value='dawalkat';
  d.querySelector('#searchForm').dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));await tick();
  assert.match(d.querySelector('#count').textContent,/lañu gis/);
  const official=d.querySelector('[data-digiy-official="lamine"]');assert(official && !official.hidden);
  assert.match(official.querySelector('.btnPrimary').href,/lang=wo/);
  const wa=new URL(official.querySelector('.btnWhatsapp').href);assert(!wa.searchParams.has('lang'));assert.match(wa.searchParams.get('text'),/Salaam aleekum/);
  d.querySelector('#module').value='DRIVER';d.querySelector('[data-l="fr"]').click();await tick();
  assert.equal(d.querySelector('#module').value,'DRIVER');assert.equal(d.querySelector('#city').value,'Saly');
  d.querySelector('[data-l="wo"]').click();await tick();
  d.querySelector('#query').value='introuvable-xyz';d.querySelector('#module').value='';
  d.querySelector('#searchForm').dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));await tick();
  assert.match(d.querySelector('#status').textContent,/Amul/);
  d.querySelector('[data-l="ar"]').click();assert.equal(d.documentElement.dir,'rtl');
  d.querySelector('[data-l="wo"]').click();assert.equal(d.documentElement.dir,'ltr');
  dom.window.close();
  dom=await load('saly.html','?lang=fr','wo');assert.equal(dom.window.document.documentElement.lang,'fr');dom.window.close();
  dom=await load('saly.html','?lang=wo','',true);assert.equal(dom.window.document.documentElement.lang,'wo');dom.window.close();
  dom=await load('menu-universel-v1.html','?lang=wo');assert.equal(dom.window.document.documentElement.lang,'wo');
  assert.match(dom.window.document.querySelector('a[href*="saly.html"]').href,/lang=wo/);dom.window.close();
  console.log('PASS: Saly, search, menu, 27 examples, WO aliases/contact/empty results, FR/AR, filters, denied storage.');
})().catch(e=>{console.error(e);process.exit(1)});
