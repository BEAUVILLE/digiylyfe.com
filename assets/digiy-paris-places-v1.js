/* DIGIY PARIS · 20 arrondissements · 11 familles métiers · 33 exemples.
 * Chaque carte est une DEMONSTRATION, jamais une fausse inscription.
 * Le quartier est un repère facultatif, pas un filtre bloquant.
 */
(function(){
'use strict';
if(window.DIGIY_PARIS_PLACES_V1)return;
var DATA=window.DIGIY_PARIS_CATALOGUE_V1;
if(!DATA||!DATA.categories||!DATA.copy)return;
window.DIGIY_PARIS_PLACES_V1=true;
var params=new URLSearchParams(location.search);
var state={
 arr:DATA.arrondissements.indexOf(params.get('arr'))>=0?params.get('arr'):'',
 need:DATA.categories.some(function(c){return c.id===params.get('need')})?params.get('need'):'',
 quarter:(params.get('quartier')||'').slice(0,60),
 all:false
};
function lang(){
 var l=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();
 return DATA.copy[l]?l:'fr';
}
function el(tag,cls,content){
 var n=document.createElement(tag);
 if(cls)n.className=cls;
 if(content!==undefined)n.textContent=content;
 return n;
}
function link(base,values){
 var q=new URLSearchParams(values);
 return base+'?'+q.toString();
}
function queryVals(need,variant){
 var p={need:need,lang:lang()};
 if(variant)p.variant=String(variant);
 if(state.arr)p.arr=state.arr;
 if(state.quarter)p.quartier=state.quarter;
 return p;
}
function syncUrl(){
 try{
  var u=new URL(location.href);
  ['arr','need','quartier'].forEach(function(k){u.searchParams.delete(k)});
  if(state.arr)u.searchParams.set('arr',state.arr);
  if(state.need)u.searchParams.set('need',state.need);
  if(state.quarter)u.searchParams.set('quartier',state.quarter);
  history.replaceState({},'',u.pathname+u.search+u.hash);
 }catch(_){}
}
var CSS='.parisPlaces{border:1px solid #f6c45366;border-radius:25px;background:linear-gradient(135deg,#f6c45312,#2dd4bf0c);padding:clamp(13px,3vw,24px);margin:22px 0}.parisPlaces h2{margin:0 0 9px;color:#fff0c8}.parisPlaces p{margin:0 0 14px;color:#d4e4da;font-size:13px;line-height:1.5}.parisFilters{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:15px}.parisFilter{display:grid;gap:6px}.parisFilter label{font-weight:900;color:#ffefc1;font-size:12px}.parisFilter select,.parisFilter input{width:100%;min-height:44px;color:#fff;background:#071a13;border:1px solid #ffffff4a;border-radius:12px;padding:9px;font:inherit}.parisToggle{display:flex;gap:9px;align-items:center;font-size:12px;font-weight:900;color:#fef1ce;margin-bottom:15px}.parisExampleGrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}.parisExampleCard{padding:15px;border:1px solid #f6c45344;border-radius:19px;background:#ffffff09;min-width:0;display:flex;flex-direction:column;gap:8px}.parisExampleCard .sig{color:#f6c453;font-size:12px;font-weight:1000}.parisExampleCard .badge{display:block;color:#bfe9e2;font-size:9px;line-height:1.4;font-weight:900}.parisExampleCard strong{font-size:16px;line-height:1.3}.parisExampleCard small{display:block;font-size:12px;color:#d3e0d8;line-height:1.4}.parisExampleCard .actions{display:flex;flex-wrap:wrap;gap:7px;margin-top:auto}.parisExampleCard a{display:inline-block;border:1px solid #f6c45377;border-radius:999px;padding:9px;color:#fff1c8;font-size:11px;font-weight:900}.parisExampleCard a.primary{color:#071a13;background:#f6c453}.parisPlacesFoot{font-size:11px;color:#ddf6e9;font-weight:800;margin-top:16px}@media(max-width:800px){.parisExampleGrid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:550px){.parisFilters,.parisExampleGrid{grid-template-columns:1fr}}';
var style=document.createElement('style');style.id='digiyParisCatalogueStyle';style.textContent=CSS;document.head.appendChild(style);
function buildSelect(title,options,value,onChange){
 var w=el('div','parisFilter'),id='parisFilter'+Math.random().toString(36).slice(2);
 var l=el('label','',title),s=el('select');l.htmlFor=id;s.id=id;
 options.forEach(function(o){var item=el('option','',o[1]);item.value=o[0];s.appendChild(item)});
 s.value=value;s.addEventListener('change',function(){onChange(s.value)});
 w.append(l,s);return w;
}
function render(){
 var anchor=document.getElementById('territoryTitle');if(!anchor)return;
 var host=document.getElementById('digiyParisPlaces');
 if(!host){host=el('section','section parisPlaces');host.id='digiyParisPlaces';var parent=anchor.closest('.section');if(parent)parent.insertAdjacentElement('afterend',host);}
 host.textContent='';
 var l=lang(),t=DATA.copy[l];
 host.append(el('h2','',t.headline),el('p','',t.intro));
 var filters=el('div','parisFilters'),arrOptions=[['',t.allArr]];
 DATA.arrondissements.forEach(function(a,i){arrOptions.push([a,'Paris '+(i+1)+(l==='fr'&&i===0?'er':l==='fr'?'e':'')+' · '+String(i+1).padStart(2,'0')])});
 filters.append(buildSelect(t.arr,arrOptions,state.arr,function(v){state.arr=v;syncUrl();render()}));
 filters.append(buildSelect(t.trade,[['',t.allTrades]].concat(DATA.categories.map(function(c){return[c.id,c.names[l]]})),state.need,function(v){state.need=v;syncUrl();render()}));
 var quarter=el('div','parisFilter'),label=el('label','',t.quarter),input=el('input');input.type='text';input.maxLength=60;input.placeholder=t.quarterHint;input.value=state.quarter;label.htmlFor='parisQuartier';input.id='parisQuartier';input.addEventListener('input',function(){state.quarter=input.value.trim().slice(0,60);syncUrl();host.querySelectorAll('a[data-paris-demo]').forEach(function(a){a.href=link('/demo-paris.html',queryVals(a.dataset.need,Number(a.dataset.variant)))});});quarter.append(label,input);filters.appendChild(quarter);
 host.appendChild(filters);
 var toggle=el('label','parisToggle'),box=el('input');box.type='checkbox';box.checked=state.all;box.addEventListener('change',function(){state.all=box.checked;render()});toggle.append(box,el('span','',t.allVariants));host.appendChild(toggle);
 var grid=el('div','parisExampleGrid');
 DATA.categories.filter(function(c){return !state.need||c.id===state.need}).forEach(function(c){
  var titles=c.examples[l],variants=state.need||state.all?[1,2,3]:[1];
  variants.forEach(function(v){
   var item=el('article','parisExampleCard');
   item.append(el('div','badge',t.example),el('div','sig',c.signature),el('strong','',c.icon+' '+c.names[l]),el('small','',titles[v-1]));
   var actions=el('div','actions'),view=el('a','primary',t.model),card=el('a','',t.card);
   view.href=link('/demo-paris.html',queryVals(c.id,v));view.dataset.parisDemo='1';view.dataset.need=c.id;view.dataset.variant=String(v);card.href=link('/carte-gratuite.html',{country:'fr',lang:l,territory:'paris',need:c.id});
   actions.append(view,card);item.appendChild(actions);grid.appendChild(item);
  });
 });
 host.append(grid,el('div','parisPlacesFoot',t.foot));
}
render();
try{new MutationObserver(function(){render()}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']})}catch(_){}
document.addEventListener('click',function(e){if(e.target&&e.target.closest&&e.target.closest('[data-lang]'))setTimeout(render,0)},false);
})();
