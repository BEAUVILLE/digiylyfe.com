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
  fs.mkdirSync('artifacts/vitrine-humaine',{recursive:true});
  for(const width of [375,390,768,1024,1440]){
   await page.setViewportSize({width,height:900});
   await page.goto('https://digiylyfe.com/?lang=fr');
   await page.waitForTimeout(400);
   await page.screenshot({path:`artifacts/vitrine-humaine/${process.env.PWA_BROWSER}-${width}.png`,fullPage:true});
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),true,`horizontal overflow ${width}`);
   assert.equal(await page.locator('h1').count(),1);
   assert.equal(await page.locator('.exampleGrid a.exampleCard').count(),publicRows.length);
   for(const card of await page.locator('.exampleGrid a.exampleCard').all())assert.equal(await card.isVisible(),true);
   assert.equal(await page.locator('#digiyClarity a').count(),2);
   assert.equal(await page.locator('#digiyClarity a').first().getAttribute('href'),'/annuaire.html#recherche');
   assert.equal(await page.locator('#digiyFilmVitrine iframe').getAttribute('src'),null);
   const order=await page.evaluate(()=>['digiyClarity','territoires','solutions-pro','digiyFilmVitrine','digiyInternational'].map(id=>document.getElementById(id).getBoundingClientRect().top));
   assert.deepEqual(order,[...order].sort((a,b)=>a-b));
   const saly=page.locator('#territoires a[href="/saly.html"]');
   await saly.scrollIntoViewIfNeeded();
   assert.equal(await saly.isVisible(),true);
   assert.equal(await page.locator('a[data-fav-id="territoire-petite-cote"]').getAttribute('href'),'https://digiylyfe.com/territoire.html?zone=petite-cote');
   await saly.click();
   await page.waitForURL('https://digiylyfe.com/saly.html');
   await page.goto('https://digiylyfe.com/?lang=fr');
   console.log('PASS human home layout and direct Saly click',width);
  }
  await page.setViewportSize({width:390,height:844});
  await page.goto('https://digiylyfe.com/?lang=fr');
  for(const lang of ['fr','en','es','pt','it','de','nl','ar']){
   await page.locator(`button[data-lang="${lang}"]`).click();
   assert.equal(await page.locator('html').getAttribute('lang'),lang);
   assert.equal(await page.locator('html').getAttribute('dir'),lang==='ar'?'rtl':'ltr');
   assert.ok((await page.locator('#solutionsTitle').innerText()).length>3);
   assert.equal(await page.evaluate(()=>innerWidth),390,`locale viewport expansion ${lang}`);
  }
  // Explicitly center a far-down RTL control before testing its real pointer hit.
  const filmControl=page.locator('#digiyFilmVitrine summary');
  await filmControl.evaluate(el=>el.scrollIntoView({block:'center',inline:'nearest',behavior:'instant'}));
  await page.screenshot({path:`artifacts/vitrine-humaine/${process.env.PWA_BROWSER}-ar-film.png`});
  assert.equal(await filmControl.evaluate(el=>{const r=el.getBoundingClientRect();return document.elementFromPoint(r.x+r.width/2,r.y+r.height/2)===el;}),true,'film control accepts a real pointer in RTL');
  await filmControl.click();
  await page.waitForFunction(()=>document.querySelector('#digiyFilmVitrine iframe').hasAttribute('src'));
  assert.ok((await page.locator('#digiyFilmVitrine iframe').getAttribute('src')).endsWith('/preview'));
  for(const [label,selector,target] of [['WO','a.woLangLink','/prototypes/digiy-wolof-v1/prototype.html'],['中文','a[hreflang="zh-CN"]','/zh-CN/']]){
   await page.goto('https://digiylyfe.com/?lang=fr');
   await page.locator('.languageStrip '+selector).click();
   await page.waitForURL('https://digiylyfe.com'+target);
   assert.equal(await page.locator('a[href="/annuaire.html#recherche"]').count(),1);
   assert.equal(await page.locator('a[href="/annuaire.html#inscription"]').count(),1);
   console.log('PASS language route',label);
  }
  publicRows=[];
  await page.goto('https://digiylyfe.com/?lang=fr');
  await page.waitForFunction(()=>document.querySelectorAll('.exampleGrid a.exampleCard,.exampleGrid .digiyRecommendAction').length===0);
  console.log('PASS withdrawn presence also removes its recommendation link');
  assert.deepEqual(errors,[],'uncaught JavaScript errors');
  console.log('PASS ten language routes, opt-in film and JavaScript');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
