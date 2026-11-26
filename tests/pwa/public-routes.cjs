const {chromium,webkit}=require('playwright');const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../..');
 // Guard the simulator against future divergence from the official LOC tariff table.
 const simSource=fs.readFileSync(path.join(root,'simulateur-economies.html'),'utf8');
 const locSource=fs.readFileSync(path.join(root,'tarifs-loc-v2.html'),'utf8');
 const simRates=JSON.parse(simSource.match(/const RATES=(.*?);/)[1]);
 const officialTiers=Function('return '+locSource.match(/var tiers=(\[[\s\S]*?\]);/)[1])();
 assert.deepEqual(simRates,officialTiers.map(t=>[t.label,t.snRef,t.euRef,t.snAnnual,t.euAnnual]));
 const simCopy=JSON.parse(simSource.match(/const COPY=(.*?);/)[1]);
 assert.equal(Object.keys(simCopy).length,10);
 for(const copy of Object.values(simCopy))for(const key of Object.keys(simCopy.fr))assert.ok(copy[key],key);

// Local publication fixture only; the real Supabase publication gate remains unchanged.
const publicRows=[...fs.readFileSync(path.join(root,'index.html'),'utf8').matchAll(/<a class="exampleCard" href="([^"]+)"/g)].map(m=>({public_url:m[1]}));
(async()=>{const engine=process.env.PWA_BROWSER==='webkit'?webkit:chromium;const browser=await engine.launch(process.env.CHROMIUM_EXECUTABLE?{executablePath:process.env.CHROMIUM_EXECUTABLE,args:['--no-sandbox','--disable-dev-shm-usage']}:{headless:true});try{const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,serviceWorkers:'block'});
 await context.route('**/*',async route=>{if(route.request().url().startsWith('blob:'))return route.continue();const u=new URL(route.request().url());if(u.origin==='https://wesqmwjjtsefyjnluosj.supabase.co'&&u.pathname==='/rest/v1/digiy_annuaire_public')return route.fulfill({contentType:'application/json',body:JSON.stringify(publicRows)});if(u.origin!=='https://digiylyfe.com')return route.abort();let name=u.pathname;if(name.endsWith('/'))name+='index.html';const file=path.resolve(root,'.'+name);if(!file.startsWith(root+path.sep)||!fs.existsSync(file))return route.fulfill({status:404,body:'Not found'});const types={'.html':'text/html','.js':'application/javascript','.json':'application/json','.css':'text/css','.png':'image/png','.webp':'image/webp','.gif':'image/gif','.svg':'image/svg+xml'};await route.fulfill({path:file,contentType:types[path.extname(file)]||'application/octet-stream'});});
 const page=await context.newPage();await page.goto('https://digiylyfe.com/');
 assert.equal(await page.locator('#digiyVitrineDetails').evaluate(el=>el.open),false,'La vitrine détaillée doit être repliée par défaut');
 assert.equal(await page.locator('.digiyMenuAccess').isVisible(),true,'Le menu universel doit rester accessible');
 // PREUVE V2: shortcuts and local economic simulator, no production API.
 const quick=page.locator('#acces-rapides-pro');
 assert.equal(await quick.locator('a').count(),2);
 assert.equal(await quick.evaluate(el=>{const r=el.getBoundingClientRect();return r.top>=0&&r.bottom<=innerHeight}),true);
 const quickTools=quick.locator('[data-i18n="quickTools"]');
 await quickTools.click();await page.waitForURL(url=>url.pathname==='/outils-gestion-demo.html');
 await page.locator('header a').click();await page.waitForURL(url=>url.pathname==='/');
 await quick.locator('[data-i18n="quickSavings"]').click();
 await page.waitForURL(url=>url.pathname==='/simulateur-economies.html');
 const value=async(id)=>Number(await page.locator('#'+id).getAttribute('data-value'));
 assert.equal(await value('total'),1150,'LOC 12 mois + fiche, mensualités');
 assert.equal(await value('avoided'),900);
 assert.equal(await value('balance'),-250);
 await page.locator('#annual').check();
 assert.equal(await value('total'),1015,'LOC annuel 765 + 250');
 await page.locator('#months').fill('6');
 assert.equal(await value('total'),1015,'Annuel facture 12 mois même en saison');
 assert.equal(await value('avoided'),450);
 await page.locator('#plan').selectOption('pro-fr');
 await page.locator('#months').fill('12');
 assert.equal(await value('total'),598);
 assert.equal(await page.locator('#annualRow').isHidden(),true);
 await page.locator('#rate').fill('0');
 assert.equal(await value('avoided'),0);
 assert.equal(await page.locator('#threshold').getAttribute('data-value'),'');
 await page.locator('#plan').selectOption('loc-sn-2–3');
 assert.equal(await page.locator('#volume').inputValue(),'');
 assert.equal(await page.locator('#invalid').isVisible(),true);
 await page.locator('#volume').fill('200000');
 await page.locator('#rate').fill('15');
 assert.equal(await value('total'),436000);
 await page.locator('#annual').check();
 assert.equal(await value('total'),385600);
 await page.locator('#initial').uncheck();
 assert.equal(await value('total'),285600);
 await page.locator('#rate').fill('101');
 assert.equal(await page.locator('#invalid').isVisible(),true);
 await page.locator('#rate').fill('15');
 for(const lang of ['wo','zh','ar','en','fr']){
   await page.locator('#lang').selectOption(lang);
   assert.equal(await page.locator('html').getAttribute('lang'),lang==='zh'?'zh-CN':lang);
   assert.equal(await page.locator('html').getAttribute('dir'),lang==='ar'?'rtl':'ltr');
   assert.equal(await value('total'),285600);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),true);
 }
 await page.locator('#home').click();await page.waitForURL(url=>url.pathname==='/');
 console.log('PASS PREUVE V2: shortcuts, LOC/PRO, annual, zero and invalid inputs, languages, return');
 // PREUVE V1 : le message commercial reste visible à 390 px.
 assert.equal(await page.locator('#digiyClarity .digiyClarityLead').isVisible(),true);
 assert.equal(await page.locator('#digiyClarity .digiyProofZero').isVisible(),true);
 const proof=page.locator('section[aria-label="Preuves terrain DIGIYLYFE"]');
 const helage=proof.locator('a.exampleCard[href*="helage-plombier.digiylyfe.com"]');
 await helage.waitFor({state:'visible'});
 await page.waitForFunction(()=>document.querySelector('.exampleGrid')?.hasAttribute('data-digiy-public-gate-layout'));
 assert.equal(await helage.count(),1);
 assert.equal(await helage.getAttribute('data-fav-id'),'pro-helage');
 assert.equal(await proof.locator('a[href*="babacar-plombier-pro.digiylyfe.com"]').count(),0);
 assert.equal(await page.locator('#offres-essentielles .digiyVitrineOfferGrid article').count(),4);
 for(const module of ['loc','driver','commerce']){
   const link=page.locator('#preuves-outils a[href*="/demo-'+module+'-gestion.html"]');
   assert.equal(await link.count(),1);
   assert.equal(await link.isVisible(),true);
 }
 const question=page.locator('#questions-frequentes details').first();
 await question.locator('summary').click();
 assert.equal(await question.locator('p').isVisible(),true);
 await question.locator('summary').click();
 console.log('PASS PREUVE V1: mobile, Helage, four offers, documentation and FAQ');
 // Vérifier le nouvel accès direct sans ouvrir la vitrine détaillée.
 const directTools=page.locator('#offres-essentielles a[data-i18n="liteToolsCta"]');
 assert.equal(await directTools.count(),1);
 assert.equal(await directTools.isVisible(),true);
 await directTools.click();await page.waitForURL(url=>url.origin==='https://digiylyfe.com'&&url.pathname==='/outils-gestion-demo.html');
 await page.locator('header a').click();await page.waitForURL(url=>url.origin==='https://digiylyfe.com'&&url.pathname==='/');
 assert.equal(await page.locator('#digiyVitrineDetails').evaluate(el=>el.open),false);
 console.log('PASS home → direct tools from offers → home');
 await page.locator('#digiyVitrineDetails > summary').click();
 const detailedTools=page.locator('#digiyVitrineDetails a[data-i18n="toolsOpen"]');
 assert.equal(await detailedTools.count(),1);
 assert.equal(await detailedTools.isVisible(),true);
 await detailedTools.click();await page.waitForURL(url=>url.origin==='https://digiylyfe.com'&&url.pathname==='/outils-gestion-demo.html');
 for(const doc of ['loc','driver','commerce','carnet','explore','resto','build']){await page.locator(`a[href="/demo-${doc}-gestion.html"]`).click();await page.waitForURL(`https://digiylyfe.com/demo-${doc}-gestion.html`);await page.locator('header a').click();await page.waitForURL(url=>url.origin==='https://digiylyfe.com'&&url.pathname==='/outils-gestion-demo.html');console.log('PASS tools → '+doc+' → tools');}
 await page.locator('header a').click();await page.waitForURL(url=>url.origin==='https://digiylyfe.com'&&url.pathname==='/');console.log('PASS home → tools → home');
 await page.goto('https://digiylyfe.com/fiches/pap-piscine-saly.html');await page.locator('a[href="https://digiylyfe.com/"]').click();await page.waitForURL(url=>url.origin==='https://digiylyfe.com'&&url.pathname==='/');console.log('PASS public PAP fiche → home; data/API not loaded');
 await page.goto('https://digiylyfe.com/tarifs-adherents-1.html');for(const a of await page.locator('a.demo').all()){assert.notEqual(await a.getAttribute('target'),'_blank');console.log('PASS tariff demonstration same context:',await a.getAttribute('href'));}
 await page.goto('https://digiylyfe.com/territoire.html?zone=petite-cote&lang=zh');
 await page.waitForFunction(()=>document.querySelector('#needTitle')?.textContent==='您需要什么服务？',{timeout:15000});
 assert.equal(await page.locator('button[data-lang="zh"]').count(),1);
 assert.equal(await page.locator('button[data-lang="zh"]').isVisible(),true);
 assert.equal(await page.locator('html').getAttribute('lang'),'zh-CN');
 assert.equal(await page.locator('button[data-lang="zh"]').getAttribute('class'),'active');
 assert.equal(await page.locator('#zhLimit').isVisible(),true);
 assert.equal(await page.locator('.langs').evaluate(el=>el.scrollWidth<=el.clientWidth+3),true);
 assert.equal(await page.locator('#needs button').count()>3,true);
 await page.locator('button[data-lang="fr"]').click();
 assert.equal(await page.locator('#needTitle').innerText(),'Que recherchez-vous ?');
 await page.locator('button[data-lang="zh"]').click();
 assert.equal(await page.locator('#needTitle').innerText(),'您需要什么服务？');
 assert.equal(new URL(page.url()).searchParams.get('lang'),'zh');
 console.log('PASS Petite Côte mobile → mandarin real locale → FR → 中文');
 await page.goto('https://digiylyfe.com/zh-CN/saly.html');
 await page.locator('a.choice[href*="need=transport"]').click();
 await page.waitForURL(url=>url.pathname==='/territoire.html'&&url.searchParams.get('lang')==='zh');
 assert.equal(await page.locator('#needTitle').innerText(),'您需要什么服务？');
 console.log('PASS Chinese Saly landing → local territory translated navigation');
 await page.goto('https://digiylyfe.com/tarifs-loc.html?country=sn&lang=en');await page.waitForURL(/tarifs-loc-v2\.html/);assert.equal(new URL(page.url()).searchParams.get('country'),'sn');assert.equal(new URL(page.url()).searchParams.get('lang'),'en');console.log('PASS LOC redirect preserves country/lang');
 await page.goto('https://digiylyfe.com/');
 await page.locator('#digiyVitrineDetails > summary').click();
 const choiceFixed=page.locator('#digiyCardChooseFixed'), choiceAnimated=page.locator('#digiyCardChooseAnimated');
 const fixedPanel=page.locator('#digiyCardFixedPanel'), animatedPanel=page.locator('#digiyCardAnimatedPanel');
 const animatedImage=page.locator('#digiyOfficialAnimatedImage'), replay5=page.locator('#digiyOfficialReplay5');
 let gifRequests=0;
 page.on('request',req=>{if(req.url().includes('/assets/digiy-officiel-animation-75-9x16.gif'))gifRequests++});
 assert.equal(await choiceAnimated.getAttribute('aria-pressed'),'true');
 await animatedImage.scrollIntoViewIfNeeded();
 await page.waitForFunction(()=>document.querySelector('#digiyOfficialAnimatedImage')?.src.startsWith('blob:'),null,{timeout:13000}).catch(async err=>{
   const diagnostic=await page.evaluate(async()=>{
     const i=document.querySelector('#digiyOfficialAnimatedImage');
     const p=document.querySelector('#digiyCardAnimatedPanel');
     const b=document.querySelector('#digiyCardChooseAnimated');
     const rect=p.getBoundingClientRect();
     let asset;
     try{const r=await fetch('/assets/digiy-officiel-animation-75-9x16.gif',{cache:'no-store'});asset={ok:r.ok,status:r.status,type:r.headers.get('content-type'),size:(await r.arrayBuffer()).byteLength};}
     catch(e){asset={error:String(e)};}
     return {src:i?.src,complete:i?.complete,naturalWidth:i?.naturalWidth,selected:b?.getAttribute('aria-pressed'),panelHidden:p?.hidden,rect:{top:rect.top,bottom:rect.bottom,width:rect.width,height:rect.height},winHeight:innerHeight,asset};
   });
   console.error('DIGIY_SAFARI_ANIMATION_DIAGNOSTIC',JSON.stringify({...diagnostic,gifRequests,scrollY:await page.evaluate(()=>window.scrollY)}));
   // Confirmer en diagnostic que la lecture explicite reste accessible dans WebKit.
   if(await replay5.isVisible()){
     await replay5.click();
     try{
       await page.waitForFunction(()=>document.querySelector('#digiyOfficialAnimatedImage')?.src.startsWith('blob:'),null,{timeout:4000});
       console.error('DIGIY_SAFARI_MANUAL_REPLAY_DIAGNOSTIC: blob visible after replay click');
     }catch(replayError){
       console.error('DIGIY_SAFARI_MANUAL_REPLAY_DIAGNOSTIC: '+replayError.message);
     }
   }
   throw err;
 });
 await page.waitForFunction(()=>document.querySelector('#digiyOfficialAnimatedImage')?.src.endsWith('/assets/digiy-officiel-final-9x16.png'),null,{timeout:15000});
 assert.equal(await replay5.isVisible(),true);
 await replay5.click();
 await page.waitForFunction(()=>document.querySelector('#digiyOfficialAnimatedImage')?.src.startsWith('blob:'),null,{timeout:5000});
 await page.waitForFunction(()=>document.querySelector('#digiyOfficialAnimatedImage')?.src.endsWith('/assets/digiy-officiel-final-9x16.png'),null,{timeout:15000});
 assert.equal(gifRequests,1,'Le replay doit utiliser le GIF deja charge, sans nouveau fetch');
 console.log('PASS 9:16 animé 7,5 s → arrêt QR → replay immédiat → QR fixe · 1 seul GIF chargé');
 await choiceFixed.click();
 assert.equal(await fixedPanel.isVisible(),true);
 assert.equal(await animatedPanel.isHidden(),true);
 assert.equal(await replay5.isHidden(),true);
 assert.equal(await fixedPanel.locator('img').getAttribute('src'),'https://digiylyfe.com/carte-visite-digiy.png');
 await choiceAnimated.click();
 assert.equal(await animatedPanel.isVisible(),true);
 assert.equal(await replay5.isVisible(),true);
 console.log('PASS modèles carte fixe / animée et QR officiel inchangé');
 await page.locator('button.langBtn[data-lang="zh"]').click();
 assert.equal((await choiceAnimated.innerText()).includes('动态'),true);
 await page.locator('button.langBtn[data-lang="fr"]').click();
 assert.equal((await choiceAnimated.innerText()).includes('animée'),true);
 console.log('PASS libellés cartes DIGIY FR ↔ 中文');
 await page.goto('https://digiylyfe.com/?lang=wo');
 await page.waitForFunction(()=>document.documentElement.lang==='wo');
 const salyLink=page.locator('a[href*="/saly.html"]').first();
 assert.equal(new URL(await salyLink.getAttribute('href'),'https://digiylyfe.com').searchParams.get('lang'),'wo');
 await salyLink.click();
 await page.waitForURL(url=>url.pathname==='/saly.html'&&url.searchParams.get('lang')==='wo');
 assert.match(await page.locator('#salyPublicQuestion').innerText(),/Lan ngay seet/);
 const salyOverflow=await page.evaluate(()=>({
   innerWidth,scrollWidth:document.documentElement.scrollWidth,
   elements:[...document.querySelectorAll('body *')].map(el=>{
     const r=el.getBoundingClientRect();
     return {tag:el.tagName,id:el.id,cls:typeof el.className==='string'?el.className:'',text:(el.textContent||'').trim().slice(0,60),left:Math.round(r.left),right:Math.round(r.right),width:Math.round(r.width),scroll:el.scrollWidth};
   }).filter(el=>el.right>innerWidth+3||el.left < -3).sort((a,b)=>b.right-a.right).slice(0,20)
 }));
 if(salyOverflow.scrollWidth> salyOverflow.innerWidth+3)console.log('SALY WO OVERFLOW DIAGNOSTIC',JSON.stringify(salyOverflow));
 assert.equal(salyOverflow.scrollWidth<=salyOverflow.innerWidth+3,true);
 await page.locator('[data-lien="find"]').click();
 await page.waitForURL(url=>url.pathname==='/recherche.html'&&url.searchParams.get('lang')==='wo');
 assert.equal(await page.locator('#city').inputValue(),'Saly');
 await page.waitForFunction(()=>!document.getElementById('submitBtn').disabled);
 await page.locator('#query').fill('dawalkat');
 await page.locator('#submitBtn').click();
 const driver=page.locator('[data-digiy-official="lamine"]');
 await driver.waitFor({state:'visible'});
 assert.match(await driver.locator('.btnPrimary').getAttribute('href'),/lang=wo/);
 const contact=new URL(await driver.locator('.btnWhatsapp').getAttribute('href'));
 assert.equal(contact.hostname,'wa.me');
 assert.match(contact.searchParams.get('text'),/Salaam aleekum/);
 assert.equal(contact.searchParams.has('lang'),false);
 await page.locator('[data-l="fr"]').click();
 assert.equal(await page.locator('#submitBtn').innerText(),'Rechercher');
 assert.equal(await page.locator('#city').inputValue(),'Saly');
 console.log('PASS accueil WO → Saly WO → recherche WO → contact WhatsApp → FR');

 }finally{await browser.close()}})().catch(e=>{console.error(e);process.exitCode=1});
