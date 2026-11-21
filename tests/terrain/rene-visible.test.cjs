'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const html=fs.readFileSync(path.join(__dirname,'..','..','services-terrain.html'),'utf8');
const script=html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
assert.ok(script,'Services terrain requires its own script');
new vm.Script(script);

function mount(supabase=null){
 const ids=new Map();
 class FakeNode {
  constructor(tag='div'){this.tagName=tag;this.id='';this.className='';this._html='';this.textContent='';this.value='';this.href='';this.rel='';this.children=[];this.listeners={};this.classList={add(){},remove(){}};}
  get innerHTML(){return this._html;}
  set innerHTML(value){this._html=value;this.children=[];}
  appendChild(node){this.children.push(node);return node;}
  querySelector(){return null;}
  addEventListener(event,callback){this.listeners[event]=callback;}
  closest(selector){return null;}
 }
 function element(id){if(!ids.has(id)){const node=new FakeNode();node.id=id;ids.set(id,node);}return ids.get(id);}
 const doc={
  getElementById:element,
  createElement:tag=>new FakeNode(tag),
  querySelectorAll:()=>[]
 };
 const context={window:{supabase},document:doc,URL,location:{href:'https://digiylyfe.com/services-terrain.html'},console};
 vm.runInNewContext(script,context,{timeout:1000});
 const grid=element('grid');
 const cards=()=>grid.children;
 const name=card=>card.children.find(x=>x.tagName==='h3')?.textContent;
 const link=card=>card.children.find(x=>x.tagName==='a')?.href;
 return {grid,cards,name,link,element};
}

test('Published René guest appears even without Supabase and opens the real BUILD fiche',()=>{
 const page=mount();
 assert.equal(page.cards().length,1);
 assert.equal(page.name(page.cards()[0]),'René Rebiez');
 assert.equal(page.link(page.cards()[0]),'https://build.digiylyfe.com/rene-rebiez.html');
 assert.ok(page.cards()[0].children.some(x=>x.className==='guest-badge'&&/invité/.test(x.textContent)));
 assert.match(page.element('sourceStatus').textContent,/indisponible/);
});

test('Searching painter, René, paint, waterproofing works and other queries do not match',()=>{
 const page=mount();
 const cases=[['René',1],['Rebiez',1],['peintre',1],['Peinture',1],['etancheite',1],['maçon',0]];
 for(const [query,count] of cases){
  page.element('q').value=query;
  page.element('go').onclick();
  assert.equal(page.cards().length,count,query);
 }
});

test('Painting filter is visible and does not invent an active member or a Supabase record',()=>{
 assert.match(html,/data-filter="peint"/);
 assert.match(html,/Professionnel invité · DIGIY BUILD/);
 assert.match(html,/INVITES_BUILD/);
 assert.doesNotMatch(script,/\.insert\(|\.upsert\(|\.update\(/);
 assert.match(html,/https:\/\/build\.digiylyfe\.com\/rene-rebiez\.html/);
});

test('Existing active professionals are kept and duplicate René guest is not repeated',async()=>{
 const rows={
  digiy_annuaire_public:[{id:1,display_name:'René Rebiez',metier_id:3,zone_id:4,category:'artisan',public_url:'https://build.digiylyfe.com/rene-rebiez.html',short_description:'Peinture bâtiment'}],
  digiy_metiers:[{id:3,slug:'peintre',label:'Peintre',module_code:'TERRAIN'}],
  digiy_zones:[{id:4,slug:'petite-cote',label:'Saly'}],
  digiy_annuaire_public_zones:[{card_id:1,zone_id:4}]
 };
 const api={createClient(){return{from(table){
  const query={eq(){return this;},order(){return Promise.resolve({data:rows[table]||[],error:null});},then(resolve,reject){return Promise.resolve({data:rows[table]||[],error:null}).then(resolve,reject)}};
  return {select(){return query;}};
 }}}};
 const page=mount(api);
 await new Promise(resolve=>setImmediate(resolve));
 assert.equal(page.cards().length,1,'Real official record replaces duplicate guest');
 assert.equal(page.name(page.cards()[0]),'René Rebiez');
 assert.ok(!page.cards()[0].children.some(x=>x.className==='guest-badge'),'Deduplicated official record must not inherit guest badge');
});
