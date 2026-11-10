'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {chromium,webkit}=require('playwright');
const root=path.resolve(__dirname,'../..');
const origin='https://digiylyfe.com';
const target='https://digiylyfe.com/carte-niery-art.html';
async function run(){
 const engine=process.env.PWA_BROWSER==='webkit'?webkit:chromium;
 const browser=await engine.launch(process.env.CHROMIUM_EXECUTABLE?{executablePath:process.env.CHROMIUM_EXECUTABLE,args:['--no-sandbox','--disable-dev-shm-usage']}:{headless:true});
 try{
  const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,serviceWorkers:'block'});
  await context.addInitScript(()=>{Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async function(v){window.__copied=v}}})});
  await context.route('**/*',async route=>{
   const url=new URL(route.request().url());
   if(url.hostname==='wesqmwjjtsefyjnluosj.supabase.co'){
    const name=url.pathname.split('/').pop();
    const fixture={
     digiy_annuaire_public:[],
     digiy_annuaire_volontaires:[{id:'e17a7753-4daa-45fc-97d3-252535a9b7c6',display_name:'Sékou Sow',activity_label:'Boutique Niery Art',city:'Keur Massar',country_code:'sn',department:'commerce',whatsapp_public:'775614078'}],
     digiy_zones:[],digiy_metiers:[],digiy_annuaire_public_zones:[]
    };
    return route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(fixture[name]||[])});
   }
   if(url.origin!==origin)return route.abort();
   let rel=url.pathname;if(rel.endsWith('/'))rel+='index.html';
   const file=path.resolve(root,'.'+rel);
   if(!file.startsWith(root+path.sep)||!fs.existsSync(file))return route.fulfill({status:404,body:'Not found'});
   const ext=path.extname(file),types={'.html':'text/html','.js':'application/javascript','.json':'application/json','.css':'text/css','.png':'image/png'};
   return route.fulfill({path:file,contentType:types[ext]||'application/octet-stream'});
  });
  const page=await context.newPage();
  await page.goto(origin+'/annuaire.html');
  const entry=page.locator('article.pro').filter({hasText:'Sékou Sow'});
  await entry.waitFor();
  const contact=entry.getByRole('link',{name:'WhatsApp direct'});
  assert.equal(await contact.getAttribute('href'),'https://wa.me/775614078');
  const share=entry.getByRole('link',{name:/Envoyer le lien de Sékou Sow sur WhatsApp/});
  const href=new URL(await share.getAttribute('href'));
  assert.equal(href.origin,'https://wa.me');
  assert.ok(href.searchParams.get('text').includes(target));
  assert.equal(await entry.getByRole('link',{name:'Voir la carte de Niery Art'}).getAttribute('href'),'/carte-niery-art.html');
  await entry.getByRole('button',{name:/Copier le lien/}).click();
  assert.equal(await page.evaluate(()=>window.__copied),target);
  assert.match(await entry.locator('.shareFeedback').innerText(),/Lien copié/);
  const help=page.getByText('Comment envoyer une carte sur WhatsApp ?');
  await help.click();
  assert.ok(await page.getByText(/touchez « Coller »/).isVisible());
  assert.equal(await page.locator('a[href*="management_token"]').count(),0);
  console.log('PASS: carte Niery, WhatsApp direct, partage URL canonique, copie, aide utilisateur, aucun token privé');
 } finally {await browser.close()}
}
run().catch(e=>{console.error(e);process.exitCode=1});
