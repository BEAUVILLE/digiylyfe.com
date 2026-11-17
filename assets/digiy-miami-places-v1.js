/* DIGIY MIAMI · onze métiers, trente-trois démonstrations, dix langues.
   Les quartiers sont facultatifs et les modèles ne sont jamais des fiches réelles. */
(function(){
'use strict';
if(window.DIGIY_MIAMI_PLACES_V2)return;
var D=window.DIGIY_MIAMI_CATALOGUE_V1;
if(!D||!D.categories||!D.copy)return;
window.DIGIY_MIAMI_PLACES_V2=true;
var p=new URLSearchParams(location.search);
var state={
 need:D.categories.some(function(c){return c.id===p.get('need')})?p.get('need'):'',
 quartier:(p.get('quartier')||'').slice(0,60),all:false
};
function lang(){var l=(document.documentElement.lang||'en').slice(0,2).toLowerCase();return D.copy[l]?l:'en'}
function el(tag,cls,txt){var n=document.createElement(tag);if(cls)n.className=cls;if(txt!==undefined)n.textContent=txt;return n}
function url(path,vals){return path+'?'+new URLSearchParams(vals).toString()}
function demoQuery(need,variant){var q={need:need,variant:String(variant),lang:lang()};if(state.quartier)q.quartier=state.quartier;return q}
function syncUrl(){try{var u=new URL(location.href);u.searchParams.delete('need');u.searchParams.delete('quartier');if(state.need)u.searchParams.set('need',state.need);if(state.quartier)u.searchParams.set('quartier',state.quartier);history.replaceState(null,'',u.pathname+u.search+u.hash)}catch(_){}}
var style=el('style');style.id='digiyMiamiPlacesStyle';
style.textContent='#miamiPlaces{border:1px solid #f6c45366;background:linear-gradient(145deg,#f6c45310,#2dd4bf08);border-radius:24px;padding:clamp(13px,3vw,24px);margin:20px auto}#miamiPlaces h2{color:#fff0c8}#miamiPlaces p{color:#d4e4da;font-size:13px}#miamiPlaces .filters{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:14px 0}#miamiPlaces .filter{display:grid;gap:7px}#miamiPlaces .filter label{font-weight:900;font-size:12px}#miamiPlaces select,#miamiPlaces input[type=text]{border:1px solid #ffffff55;border-radius:12px;background:#071a13;color:#fff;min-height:46px;padding:9px;font:inherit;width:100%}#miamiPlaces .toggle{display:flex;gap:10px;align-items:center;font-size:12px;font-weight:900;margin:13px 0}#miamiPlaces .grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}#miamiPlaces .sample{border:1px solid #f6c45355;background:#ffffff09;border-radius:18px;padding:15px;display:flex;flex-direction:column;gap:8px;min-width:0}#miamiPlaces .sample .tag{color:#b2e8df;font-size:10px;font-weight:900}#miamiPlaces .sample .brand{color:#f6c453;font-size:12px;font-weight:1000}#miamiPlaces .sample strong{font-size:16px;line-height:1.25}#miamiPlaces .sample small{font-size:12px;line-height:1.4;color:#d3e0d8}#miamiPlaces .choices{margin-top:auto;display:flex;gap:8px;flex-wrap:wrap}#miamiPlaces .choices a{padding:10px 12px;border-radius:22px;border:1px solid #f6c45377;color:#fff1c8;font-size:11px;font-weight:900}#miamiPlaces .choices a.primary{background:#f6c453;color:#06140f}#miamiPlaces .footnote{font-size:11px;margin-top:14px;color:#ddf6e9;font-weight:800}@media(max-width:800px){#miamiPlaces .grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:550px){#miamiPlaces .filters,#miamiPlaces .grid{grid-template-columns:1fr}}';
document.head.appendChild(style);
function render(){
 var main=document.querySelector('main');if(!main)return;
 var host=document.getElementById('miamiPlaces'),more=document.getElementById('moreTitle');
 if(!host){host=el('section','section');host.id='miamiPlaces';if(more&&more.closest('.section'))more.closest('.section').insertAdjacentElement('beforebegin',host);else main.appendChild(host)}
 host.textContent='';
 var l=lang(),t=D.copy[l];host.append(el('h2','',t.title),el('p','',t.lead));
 var filters=el('div','filters'),needWrap=el('div','filter'),nlabel=el('label','',t.trade),sel=el('select');nlabel.htmlFor='miamiNeed';sel.id='miamiNeed';
 [['',t.allTrades]].concat(D.categories.map(function(c){return[c.id,c.names[l]]})).forEach(function(z){var opt=el('option','',z[1]);opt.value=z[0];sel.appendChild(opt)});
 sel.value=state.need;sel.addEventListener('change',function(){state.need=sel.value;syncUrl();render()});needWrap.append(nlabel,sel);
 var qWrap=el('div','filter'),qLabel=el('label','',t.neighborhood),input=el('input');input.type='text';input.id='miamiQuarter';input.maxLength=60;input.placeholder=t.neighborhoodPlaceholder;input.value=state.quartier;qLabel.htmlFor=input.id;
 input.addEventListener('input',function(){state.quartier=input.value.trim().slice(0,60);syncUrl();host.querySelectorAll('a[data-demo]').forEach(function(a){a.href=url('/demo-miami.html',demoQuery(a.dataset.need,a.dataset.variant))});host.querySelectorAll('a[data-miami-card]').forEach(function(a){var v={country:'us',territory:'miami',need:a.dataset.need,lang:lang()};if(state.quartier)v.quartier=state.quartier;a.href=url('/carte-gratuite.html',v)})});
 qWrap.append(qLabel,input);filters.append(needWrap,qWrap);host.appendChild(filters);
 var toggle=el('label','toggle'),chk=el('input');chk.type='checkbox';chk.checked=state.all;chk.addEventListener('change',function(){state.all=chk.checked;render()});toggle.append(chk,el('span','',t.allVariants));host.appendChild(toggle);
 var grid=el('div','grid');
 D.categories.filter(function(c){return !state.need||state.need===c.id}).forEach(function(c){
  (state.need||state.all?[1,2,3]:[1]).forEach(function(v){
   var card=el('article','sample');card.append(el('span','tag',t.example),el('span','brand',c.signature),el('strong','',c.icon+' '+c.names[l]),el('small','',c.examples[l][v-1]));
   var buttons=el('div','choices'),preview=el('a','primary',t.model),request=el('a','',t.card);
   preview.href=url('/demo-miami.html',demoQuery(c.id,v));preview.dataset.demo='1';preview.dataset.need=c.id;preview.dataset.variant=String(v);
   var requestParams={country:'us',lang:l,territory:'miami',need:c.id};if(state.quartier)requestParams.quartier=state.quartier;request.href=url('/carte-gratuite.html',requestParams);request.dataset.miamiCard='1';request.dataset.need=c.id;
   buttons.append(preview,request);card.appendChild(buttons);grid.appendChild(card);
  });
 });
 host.append(grid,el('div','footnote',t.foot));
}
render();
try{new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['lang']})}catch(_){}
document.addEventListener('click',function(e){if(e.target&&e.target.closest&&e.target.closest('[data-lang]'))setTimeout(render,0)},false);
})();
