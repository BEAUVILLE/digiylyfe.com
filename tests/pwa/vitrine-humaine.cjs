/* Browser emulation against repository files only; no production writes. */
const {chromium,webkit}=require('playwright');
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../..');
// Isolated fixture from existing public links; never contacts the live database.
let publicRows=[...fs.readFileSync(path.join(root,'index.html'),'utf8').matchAll(/<a class="exampleCard" href="([^"]+)"/g)].map(m=>({public_url:m[1]}));
(async()=>{
 const engine=process.env.PWA_BROWSER==='webkit'?webkit:chromium;
 const browser=await engine.launch({headless:true});
 try{
  const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,serviceWorkers:'block'});
  await context.route('**/*',async route=>{
   const u=new URL(route.request().url());
   if(u.origin==='https://wesqmwjjtsefyjnluosj.supabase.co'&&u.pathname==='/rest/v1/digiy_annuaire_public')return route.fulfill({contentType:'application/json',body:JSON.stringify(publicRows)});
   if(u.origin!=='https://digiylyfe.com')return route.abort();
   let name=u.pathname;if(name.endsWith('/'))name+='index.html';
   const file=path.resolve(root,'.'+name);
   if(!file.startsWith(root+path.sep)||!fs.existsSync(file))return route.fulfill({status:404,body:'Not found'});
   const types={'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.webp':'image/webp','.avif':'image/avif','.svg':'image/svg+xml'};
   return route.fulfill({path:file,contentType:types[path.extname(file)]||'application/octet-stream'});
  });
  const page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  // Desktop installation is a visible public entrance, not tucked inside <details>.
  // Use the same local fixture as mobile; nothing is sent to a live endpoint.
  const desktop=await browser.newContext({viewport:{width:1280,height:800},serviceWorkers:'block'});
  await desktop.route('**/*',async route=>{
   const u=new URL(route.request().url());
   if(u.origin==='https://wesqmwjjtsefyjnluosj.supabase.co'&&u.pathname==='/rest/v1/digiy_annuaire_public')return route.fulfill({contentType:'application/json',body:JSON.stringify(publicRows)});
   if(u.origin!=='https://digiylyfe.com')return route.abort();
   let name=u.pathname;if(name.endsWith('/'))name+='index.html';
   const file=path.resolve(root,'.'+name);
   if(!file.startsWith(root+path.sep)||!fs.existsSync(file))return route.fulfill({status:404,body:'Not found'});
   const types={'.html':'text/html','.js':'application/javascript','.json':'application/json','.css':'text/css','.png':'image/png','.webp':'image/webp','.avif':'image/avif','.svg':'image/svg+xml'};
   return route.fulfill({path:file,contentType:types[path.extname(file)]||'application/octet-stream'});
  });
  const desktopPage=await desktop.newPage();
  await desktopPage.goto('https://digiylyfe.com/?lang=fr');
  await desktopPage.waitForFunction(()=>document.querySelector('#digiyInstallLabel')?.textContent.includes('ordinateur'));
  assert.equal(await desktopPage.locator('#digiyVitrineDetails').evaluate(el=>el.open),false);
  assert.equal(await desktopPage.locator('.digiyGoldSignature').isVisible(),false);
  await desktopPage.locator('#digiyVitrineDetails > summary').click();
  assert.equal(await desktopPage.locator('.digiyGoldSignature').isVisible(),true);
  assert.equal(await desktopPage.locator('#digiyInstallBtn').isVisible(),true,'Installation desktop visible sans ouvrir les détails');
  assert.equal(await desktopPage.locator('#digiyInstallBand').evaluate(el=>el.previousElementSibling?.matches('.digiyGoldSignature')),true,'Bouton desktop juste sous la signature de marque');
  assert.match(await desktopPage.locator('#digiyInstallLabel').innerText(),/ordinateur/i);
  const noteBeforeClick=await desktopPage.locator('#digiyInstallNote').innerText();
  assert.match(noteBeforeClick,/ordinateur/i,'Invitation brève avant le clic');
  // Regression: without native beforeinstallprompt, the desktop button must visibly react.
  await desktopPage.locator('#digiyInstallBtn').click();
  const fallbackGuide=await desktopPage.locator('#digiyInstallNote').innerText();
  assert.notEqual(fallbackGuide,noteBeforeClick,'Le clic doit modifier le texte visible');
  if(process.env.PWA_BROWSER==='webkit'){
   assert.match(fallbackGuide,/utilisez le menu du navigateur/,'Safari : message de repli navigateur');
  }else{
   assert.match(fallbackGuide,/Caster, enregistrer et partager/,'Chrome : chemin d’installation détaillé');
   assert.match(fallbackGuide,/Installer la page en tant qu.appli/);
  }
  assert.equal(await desktopPage.locator('#digiyInstallBand').evaluate(el=>el.classList.contains('digiyInstallGuideOpen')),true);
  assert.equal(await desktopPage.locator('#digiyInstallBtn').getAttribute('aria-expanded'),'true');
  assert.equal(await desktopPage.locator('#digiyInstallNote').isVisible(),true);
  // Language choices must translate the already opened guide (no French fallback).
  await desktopPage.locator('.languageStrip button[data-lang="en"]').click();
  await desktopPage.waitForFunction(()=>document.documentElement.lang==='en');
  await desktopPage.waitForFunction(isWebkit=>document.getElementById('digiyInstallNote').textContent.includes(isWebkit?'On desktop':'Cast, save and share'),process.env.PWA_BROWSER==='webkit');
  await desktopPage.locator('.languageStrip button[data-lang="fr"]').click();
  await desktopPage.waitForFunction(()=>document.documentElement.lang==='fr');
  await desktopPage.waitForFunction(isWebkit=>document.getElementById('digiyInstallNote').textContent.includes(isWebkit?'Sur ordinateur':'Caster, enregistrer et partager'),process.env.PWA_BROWSER==='webkit');
  // If Chrome DOES provide the native prompt later, it must take precedence.
  await desktopPage.evaluate(()=>{
   const installEvent=new Event('beforeinstallprompt',{cancelable:true});
   installEvent.prompt=()=>{window.__digiyPwaPromptInvoked=true;};
   installEvent.userChoice=Promise.resolve({outcome:'dismissed'});
   window.dispatchEvent(installEvent);
  });
  assert.equal(await desktopPage.locator('#digiyInstallBtn').getAttribute('aria-expanded'),'false','Le guide se ferme lorsqu’une invite native est disponible');
  await desktopPage.locator('#digiyInstallBtn').click();
  assert.equal(await desktopPage.evaluate(()=>window.__digiyPwaPromptInvoked),true,'Clique desktop appelle le vrai gestionnaire PWA');
  assert.equal(await desktopPage.locator('#digiyInstallBand').count(),1,'Aucun bouton dupliqué');
  await desktop.close();
  console.log('PASS installation PWA ordinateur accessible par le menu + accès inchangé sur mobile');
  fs.mkdirSync('artifacts/vitrine-humaine',{recursive:true});
  for(const width of [375,390,768,1024,1440]){
   const height=width===375?667:900;
   await page.setViewportSize({width,height});
   await page.goto('https://digiylyfe.com/?lang=fr');
   await page.waitForTimeout(400);
   await page.screenshot({path:`artifacts/vitrine-humaine/${process.env.PWA_BROWSER}-${width}.png`,fullPage:true});
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),true,`horizontal overflow ${width}`);
   assert.equal(await page.locator('h1').count(),1);
   assert.equal(await page.locator('.exampleGrid a.exampleCard').count(),publicRows.length);
   assert.equal(await page.locator('.exampleGrid a.exampleCard:visible').count(),0,'Preuves accessibles par le menu');
   assert.equal(await page.locator('#digiyVitrineDetails').evaluate(el=>el.open),false,'La vitrine détaillée est fermée par défaut');
   await page.locator('#digiyVitrineDetails > summary').click();
   await page.locator('.digiyVitrineExtraProof > summary').click();
   assert.equal(await page.locator('.exampleGrid a.exampleCard:visible').count(),publicRows.length,'Preuves supplémentaires accessibles');
   await page.locator('.digiyVitrineExtraProof > summary').click();
   await page.locator('#digiyVitrineDetails').evaluate(el=>el.open=false);
   const tariffLink=page.locator('.topbar .digiyTarifsAccess');
   assert.equal(await tariffLink.count(),1,'Un accès direct aux tarifs en barre haute');
   assert.equal(await tariffLink.isVisible(),true,'Tarifs visibles sans défiler');
   assert.equal(await tariffLink.evaluate(el=>el.getBoundingClientRect().width>=44),true,'Zone tactile des tarifs');
   const tariffUrl=new URL(await tariffLink.getAttribute('href'),'https://digiylyfe.com');
   assert.equal(tariffUrl.pathname,'/tarifs-adherents-1.html');
   assert.equal(tariffUrl.searchParams.get('lang'),'fr');
   if(width===375){
     await tariffLink.click();
     await page.waitForURL(url=>url.pathname==='/tarifs-adherents-1.html');
     await page.goto('https://digiylyfe.com/?lang=fr');
   }
   assert.equal(await page.locator('#digiyClarity a').count(),2);
   const searchUrl=new URL(await page.locator('#digiyClarity a').first().getAttribute('href'),'https://digiylyfe.com');
   assert.equal(searchUrl.pathname,'/annuaire.html');
   assert.equal(searchUrl.searchParams.get('lang'),'fr');
   assert.equal(searchUrl.hash,'#recherche');
   assert.equal(await page.locator('#digiyFilmVitrine iframe').getAttribute('src'),null);
   const world=page.locator('#pays-directs');
   assert.equal(await world.locator('.digiyFrontWorldGrid a').count(),4);
   const gallery=page.locator('#territoires-detail');
   assert.equal(await gallery.locator('.territoryGrid .territoryCard:visible').count(),7);
   assert.equal(await page.locator('#digiyEntryChoice').isVisible(),false);
   assert.equal(await page.locator('#outils-directs').isVisible(),false);
   assert.equal(await page.locator('#offres-essentielles').isVisible(),false);
   if(width===375){
     assert.equal(await page.locator('#digiyClarity .digiyVitrineActions').evaluate(el=>el.getBoundingClientRect().bottom<=innerHeight),true,'Actions au premier écran');
     await world.locator('a[data-i18n="quickRegions"]').click();
     await page.waitForURL(url=>url.hash==='#territoires-detail');
     await page.waitForFunction(()=>{const r=document.getElementById('territoires-detail').getBoundingClientRect();return r.top>=-4&&r.top<innerHeight&&r.bottom>0;},null,{timeout:5000});
     await page.goto('https://digiylyfe.com/?lang=fr');
   }
   await page.locator('.digiyMenuAccess').click();
   await page.waitForFunction(()=>document.getElementById('digiyVitrineDetails').open);
   assert.equal(await page.locator('#digiyEntryChoice').isVisible(),true);
   assert.equal(await page.locator('.digiyFrontModules a').count(),8);
   assert.equal(await page.locator('#offres-essentielles .digiyVitrineOfferGrid article').count(),4);
   const saly=page.locator('#territoires a[data-i18n="liteSaly"]');
   const salyUrl=new URL(await saly.getAttribute('href'),'https://digiylyfe.com');
   assert.equal(salyUrl.pathname,'/saly.html');
   assert.equal(salyUrl.searchParams.get('lang'),'fr');
   await saly.scrollIntoViewIfNeeded();
   assert.equal(await saly.isVisible(),true);
   const territoryUrl=new URL(await page.locator('a[data-fav-id="territoire-petite-cote"]').getAttribute('href'),'https://digiylyfe.com');
   assert.equal(territoryUrl.origin,'https://digiylyfe.com');
   assert.equal(territoryUrl.pathname,'/territoire.html');
   assert.equal(territoryUrl.searchParams.get('zone'),'petite-cote');
   assert.equal(territoryUrl.searchParams.get('lang'),'fr');
   await saly.click();
   await page.waitForURL(url=>url.pathname==='/saly.html'&&url.searchParams.get('lang')==='fr');
   await page.goto('https://digiylyfe.com/?lang=fr');
   console.log('PASS human home layout and direct Saly click',width);
  }
  await page.setViewportSize({width:390,height:844});
  await page.goto('https://digiylyfe.com/?lang=fr');
  await page.locator('#digiyVitrineDetails > summary').click();
  for(const lang of ['fr','en','es','pt','it','de','nl','ar']){
   await page.locator(`button[data-lang="${lang}"]`).click();
   assert.equal(await page.locator('html').getAttribute('lang'),lang);
   assert.equal(await page.locator('html').getAttribute('dir'),lang==='ar'?'rtl':'ltr');
   assert.ok((await page.locator('#digiyVitrineOffersTitle').innerText()).length>3);
   assert.ok((await page.locator('#digiyFrontDirectTitle').innerText()).length>8,'Titre Carrefour traduit');
   assert.ok((await page.locator('.digiyFrontWorldKicker').innerText()).length>8,'Portes internationales traduites');
   if(lang==='ar'){
    console.log('RTL dimensions',await page.evaluate(()=>JSON.stringify({innerWidth,innerHeight,scrollX,doc:{width:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth,dir:getComputedStyle(document.documentElement).direction},body:{width:document.body.clientWidth,scroll:document.body.scrollWidth,dir:getComputedStyle(document.body).direction},visual:{width:visualViewport.width,scale:visualViewport.scale},wide:[...document.querySelectorAll('body *')].map(e=>({tag:e.tagName,id:e.id,c:e.className,w:Math.round(e.getBoundingClientRect().width),scroll:e.scrollWidth,pos:getComputedStyle(e).position})).filter(e=>e.w>400||e.scroll>500).sort((a,b)=>b.w-a.w).slice(0,20)})));
    await page.screenshot({path:`artifacts/vitrine-humaine/${process.env.PWA_BROWSER}-ar-dimensions.png`});
   }
   assert.equal(await page.evaluate(()=>Math.abs(innerWidth-390)<=2),true,`locale viewport expansion ${lang}`);
  }
  // Explicitly center a far-down RTL control before testing its real pointer hit.
  assert.equal(await page.locator('#digiyVitrineDetails').evaluate(el=>el.open),true);
  const filmControl=page.locator('#digiyFilmVitrine summary');
  await filmControl.evaluate(el=>el.scrollIntoView({block:'center',inline:'nearest',behavior:'instant'}));
  await page.screenshot({path:`artifacts/vitrine-humaine/${process.env.PWA_BROWSER}-ar-film.png`});
  assert.equal(await filmControl.evaluate(el=>{const r=el.getBoundingClientRect();return document.elementFromPoint(r.x+r.width/2,r.y+r.height/2)===el;}),true,'film control accepts a real pointer in RTL');
  await filmControl.click();
  await page.waitForFunction(()=>document.querySelector('#digiyFilmVitrine iframe').hasAttribute('src'));
  assert.ok((await page.locator('#digiyFilmVitrine iframe').getAttribute('src')).endsWith('/preview'));
  // All ten controls translate the same home. Audio remains an explicit separate link.
  await page.goto('https://digiylyfe.com/?lang=fr');
  const homePath=new URL(page.url()).pathname;
  await page.waitForSelector('#offres-essentielles .digiyVitrineOfferPrice',{state:'attached'});
  // Compare numeric tokens with repetitions, not concatenated digits:
  // Mandarin may put the 12-month duration before the total.
  const numbers=s=>(s.match(/[0-9]+(?:[ ,.\u00a0\u202f][0-9]{3}(?![0-9]))*/g)||[])
    .map(n=>Number(n.replace(/[^0-9]/g,''))).sort((a,b)=>a-b);
  const memberPrice=page.locator('#offres-essentielles [data-i18n="liteMemberPrice"]');
  const setupPrice=page.locator('#offres-essentielles [data-i18n="liteSetupNote"]');
  function assertPrices(member,setup){
   assert.deepEqual(numbers(member),[29,12000],'Adhésion France et Sénégal inchangée');
   assert.deepEqual(numbers(setup),[12,12,29,250,250,598,100000],'Création, exemple annuel et durée inchangés');
   assert.match(setup,/(?:€\s*250|250\s*€)(?:\s*HT)?\s*\+\s*12\s*×\s*(?:€\s*29|29\s*€)(?:\s*HT)?\s*=/,'Calcul annuel inchangé');
   assert.match(setup,/(?:€\s*598|598\s*€)/,'Total annuel en euros inchangé');
   assert.equal(250+12*29,598);
  }
  await page.locator('#digiyVitrineDetails').evaluate(el=>el.open=true);
  assertPrices(await memberPrice.innerText(),await setupPrice.innerText());
  await page.locator('#digiyVitrineDetails').evaluate(el=>el.open=false);
  const frenchTitle=await page.locator('h1').innerText();
  for(const [lang,title,remember] of [['wo','BIROO BU ÑÉPP MËN A DUGG','400 FCFA'],['zh','每一项经营活动都值得在世界上拥有一席之地。','400']]){
   await page.locator(`.languageStrip button[data-lang="${lang}"]`).click();
   await page.waitForFunction(l=>document.documentElement.lang===(l==='zh'?'zh-CN':l),lang);
   assert.equal(new URL(page.url()).pathname,homePath);
   assert.equal(new URL(page.url()).searchParams.get('lang'),lang);
   assert.equal(await page.locator('h1').innerText(),title);
   if(lang==='wo')assert.notEqual(title,frenchTitle,'Le titre wolof ne doit plus rester en français');
   assert.ok((await page.locator('#digiyClarity .mobileDaily').innerText()).includes(remember));
   assert.equal(await page.locator(`button[data-lang="${lang}"]`).getAttribute('aria-pressed'),'true');
   assert.equal(await page.evaluate(()=>Math.abs(innerWidth-390)<=2),true);
   await page.locator('#digiyVitrineDetails').evaluate(el=>el.open=true);
   assert.equal(await page.locator('.ownerModulesLang:visible').count(),1);
   assert.equal(await page.locator('.ownerModulesLang:visible').getAttribute('data-owner-lang'),lang);
   await page.waitForTimeout(100);
   assert.equal(await page.locator('.languageStrip').evaluate(el=>{const r=el.getBoundingClientRect();return r.top>=0&&r.bottom<=innerHeight;}),true,'language choices remain visible after changing locale');
   assertPrices(await memberPrice.innerText(),await setupPrice.innerText());
   const labels=await page.locator('#campusInterestForm [data-campus-copy="send"]').innerText();
   assert.ok(lang==='zh'?labels.includes('感兴趣'):labels.includes('BËGG'));
   assert.ok((await page.locator('#offres-essentielles h2').innerText()).length>3);
   await page.locator('#digiyVitrineDetails').evaluate(el=>el.open=false);
   await page.screenshot({path:`artifacts/vitrine-humaine/${process.env.PWA_BROWSER}-${lang}-home.png`});
   await page.reload();
   assert.equal(await page.locator('h1').innerText(),title);
   console.log('PASS in-place locale, persisted reload, owner tools, form and unchanged prices',lang);
  }
  await page.goto('https://digiylyfe.com/?lang=zh-CN');
  assert.equal(await page.locator('html').getAttribute('lang'),'zh-CN');
  await page.locator('button[data-lang="fr"]').click();
  assert.equal(await page.locator('h1').innerText(),frenchTitle);
  await page.locator('#digiyVitrineDetails').evaluate(el=>el.open=true);
  assert.equal(await page.locator('.ownerModulesLang:visible').getAttribute('data-owner-lang'),'fr');
  const wolofAudioLink=page.locator('.homeLanguageHelp a');
  const audioHref=new URL(await wolofAudioLink.getAttribute('href'),'https://digiylyfe.com');
  assert.equal(audioHref.pathname,'/prototypes/digiy-wolof-v1/prototype.html');
  assert.equal(audioHref.searchParams.has('lang'),false,'le lien audio hreflang ne doit pas être modifié');
  await wolofAudioLink.click();
  await page.waitForURL('https://digiylyfe.com/prototypes/digiy-wolof-v1/prototype.html');
  assert.equal(await page.locator('#woAudioPanel').count(),1);
  console.log('PASS French return and preserved explicit Wolof audio path');
  publicRows=[];
  await page.goto('https://digiylyfe.com/?lang=fr');
  await page.waitForFunction(()=>document.querySelectorAll('.exampleGrid a.exampleCard,.exampleGrid .digiyRecommendAction').length===0);
  console.log('PASS withdrawn presence also removes its recommendation link');
  assert.deepEqual(errors,[],'uncaught JavaScript errors');
  console.log('PASS ten language routes, opt-in film and JavaScript');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
