/* Real brochure rendering, mobile viewport emulation; not an installed iPhone PWA. */
const {chromium, webkit}=require('playwright');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'../..');
const pdfDir=process.env.PDFJS_TEST_DIR||path.dirname(require.resolve('pdfjs-dist/build/pdf.min.js'));
const types={'.html':'text/html','.js':'application/javascript','.pdf':'application/pdf'};
const server=http.createServer((req,res)=>{let name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(name.endsWith('/'))name+='index.html';const file=path.resolve(root,'.'+name);if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}fs.readFile(file,(err,data)=>{if(err){res.writeHead(404).end();return;}res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');res.end(data)});});
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;
 const engine=process.env.PWA_BROWSER==='webkit'?webkit:chromium;
 const browser=await engine.launch(process.env.CHROMIUM_EXECUTABLE?{executablePath:process.env.CHROMIUM_EXECUTABLE,args:['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader']}:{headless:true});
 try{
 const context=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true});
 let mode='normal';
 await context.route('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/*',async r=>{
  if(mode==='offline'){await r.abort();return;}
  const name=r.request().url().split('/').pop();let body=fs.readFileSync(path.join(pdfDir,name),'utf8');
  if(mode==='slow'&&name==='pdf.min.js')body+=`;const original=pdfjsLib.getDocument;window.pdfjsLib={...pdfjsLib,getDocument:function(...args){window.testPdfOptions=args[0];const task=original(...args);task.promise.then(pdf=>{const get=pdf.getPage.bind(pdf);pdf.getPage=async n=>{if(n===2)await new Promise(r=>setTimeout(r,1500));return get(n)}});return task}};`;
  await r.fulfill({body,contentType:'application/javascript'});
 });
 const page=await context.newPage();
 const ready=()=>page.waitForFunction(()=>document.querySelector('#status').textContent.includes('Faites défiler'));
 for(const [doc,total] of Object.entries({loc:2,driver:2,commerce:1,carnet:2,explore:2,resto:1,build:1})){
  await page.goto(base+'/outils-gestion-demo.html');await page.locator(`a[href="/voir-pdf-metier.html?doc=${doc}"]`).waitFor({state:'visible'});await page.locator(`a[href="/voir-pdf-metier.html?doc=${doc}"]`).click();await ready();
  assert.equal(await page.locator('canvas').count(),total);
  assert.equal(await page.locator('#prev').isDisabled(),true);
  const nonempty=await page.locator('canvas').evaluateAll(cs=>cs.every(c=>{const data=c.getContext('2d').getImageData(0,0,c.width,c.height).data;let dark=0;for(let i=0;i<data.length;i+=64)if(data[i]<230&&data[i+3])dark++;return dark>10}));assert.ok(nonempty,'real rendered pixels for '+doc);
  for(let n=2;n<=total;n++){await page.locator('#next').click();assert.equal(await page.locator('#count').textContent(),`${n} / ${total}`);}
  assert.equal(await page.locator('#next').isDisabled(),true);
  for(let n=total-1;n>=1;n--){await page.locator('#prev').click();assert.equal(await page.locator('#count').textContent(),`${n} / ${total}`);}
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.locator('.bar .back').click();assert.equal(new URL(page.url()).pathname,'/outils-gestion-demo.html');console.log(`PASS ${doc}: ${total} pages, arrows, return`);
 }
 await page.setViewportSize({width:844,height:390});await page.goto(base+'/voir-pdf-metier.html?doc=loc');await ready();await page.locator('#page-2').scrollIntoViewIfNeeded();await page.waitForFunction(()=>document.querySelector('#count').textContent==='2 / 2');console.log('PASS landscape manual scroll counter');
 await page.setViewportSize({width:320,height:568});await page.evaluate(()=>document.documentElement.style.fontSize='150%');await page.evaluate(()=>scrollTo(0,500));assert.ok(await page.evaluate(()=>{const a=document.querySelector('.bar').getBoundingClientRect(),b=document.querySelector('.tools').getBoundingClientRect();return b.top>=a.bottom-1}));console.log('PASS large text header does not overlap');
 mode='slow';await page.goto(base+'/voir-pdf-metier.html?doc=loc');await page.waitForFunction(()=>document.querySelector('#page-1'));assert.equal(await page.locator('#next').isDisabled(),true);await ready();assert.equal(await page.evaluate(()=>window.testPdfOptions.isEvalSupported),false);await page.locator('#next').click();assert.equal(await page.locator('#count').textContent(),'2 / 2');console.log('PASS slow rendering and evaluation disabled');
 mode='offline';await page.goto(base+'/voir-pdf-metier.html?doc=loc');await page.locator('#fallback').waitFor({state:'visible'});assert.equal(await page.locator('#next').isDisabled(),true);await page.locator('.bar .back').click();assert.equal(new URL(page.url()).pathname,'/outils-gestion-demo.html');console.log('PASS CDN failure retains return (native multipage NOT asserted)');
 await page.goto(base+'/voir-pdf-metier.html?doc=__proto__');assert.match(await page.locator('#status').textContent(),/introuvable/);assert.equal(await page.locator('canvas').count(),0);console.log('PASS invalid document allowlist');
 await context.close();
 }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
