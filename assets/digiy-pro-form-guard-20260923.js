(function(){
'use strict';
const form=document.getElementById('form'),st=document.getElementById('status'),btn=document.getElementById('submit');
if(!form||!st||!btn)return;
const names={name:'Nom professionnel',job:'Métier / activité',country:'Pays',territory:'Territoire',baseZone:'Zone / localité de base',pendingZone:'Localité à valider',phone:'Téléphone',wa:'WhatsApp',photo:'Photo principale',s1:'Service 1',s2:'Service 2',s3:'Service 3',consent:'Confirmation / autorisation'};
let handling=false;
function labelFor(el){return names[el.id]||el.name||'Un champ obligatoire'}
form.addEventListener('invalid',function(e){
  e.preventDefault();
  if(handling)return;
  handling=true;
  const el=e.target;
  st.className='status bad';
  st.textContent='Il manque : '+labelFor(el)+'. Complétez ce champ puis renvoyez le dossier.';
  try{el.scrollIntoView({behavior:'smooth',block:'center'});setTimeout(()=>el.focus({preventScroll:true}),350)}catch(_){}
  setTimeout(()=>{handling=false},500);
},true);
function explainDisabled(){
  if(!btn.disabled)return;
  const country=document.getElementById('country'),territory=document.getElementById('territory'),base=document.getElementById('baseZone');
  if(country&&!country.value){st.className='status';st.textContent='Pour activer l’envoi : choisissez d’abord le pays.';return}
  if(territory&&!territory.value){st.className='status';st.textContent='Pour activer l’envoi : choisissez le territoire.';return}
  if(base&&!base.value){st.className='status';st.textContent='Pour activer l’envoi : choisissez la zone / localité de base.';return}
}
form.addEventListener('change',()=>setTimeout(explainDisabled,0));
new MutationObserver(explainDisabled).observe(btn,{attributes:true,attributeFilter:['disabled']});
setTimeout(explainDisabled,0);
})();