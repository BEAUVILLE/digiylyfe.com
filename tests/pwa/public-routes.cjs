const {chromium,webkit}=require('playwright');const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../..');
(async()=>{const engine=process.env.PWA_BROWSER==='webkit'?webkit:chromium;const browser=await engine.launch(process.env.CHROMIUM_EXECUTABLE?{executablePath:process.env.CHROMIUM_EXECUTABLE,args:['--no-sandbox','--disable-dev-shm-usage']}:{headless:true});try{const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,serviceWorkers:'block'});
 await context.route('**/*',async route=>{if(route.request().url().startsWith('blob:'))return route.continue();const u=new URL(route.request().url());if(u.origin!=='https://digiylyfe.com')return route.abort();let name=u.pathname;if(name.endsWith('/'))name+='index.html';const file=path.resolve(root,'.'+name);if(!file.startsWith(root+path.sep)||!fs.existsSync(file))return route.fulfill({status:404,body:'Not found'});const types={'.html':'text/html','.js':'application/javascript','.json':'application/json','.css':'text/css','.png':'image/png','.webp':'image/webp','.gif':'image/gif','.svg':'image/svg+xml'};await route.fulfill({path:file,contentType:types[path.extname(file)]||'application/octet-stream'});});
 const page=await context.newPage();await page.goto('https://digiylyfe.com/');await page.locator('a[href*="/outils-gestion-demo.html"]').click();await page.waitForURL(url=>url.origin==='https://digiylyfe.com'&&url.pathname==='/outils-gestion-demo.html');
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
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+3),true);
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
