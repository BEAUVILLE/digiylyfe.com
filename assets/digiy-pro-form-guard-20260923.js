(function(){
'use strict';
const form=document.getElementById('form'),st=document.getElementById('status'),btn=document.getElementById('submit');
if(!form||!st||!btn)return;
const names={name:'Nom professionnel',job:'Métier / activité',country:'Pays',territory:'Territoire',baseZone:'Zone / localité de base',pendingZone:'Localité à valider',phone:'Téléphone',wa:'WhatsApp',email:'E-mail client / magic-link',photo:'Photo principale',s1:'Service 1',s2:'Service 2',s3:'Service 3',consent:'Confirmation / autorisation'};
/* WORLD10 : messages de validation selon la langue visible du formulaire. */
const WORLD10_GUARD={"fr":{"missing":"Il manque : ","fill":". Complétez ce champ puis renvoyez le dossier.","country":"Pour activer l’envoi : choisissez d’abord le pays.","territory":"Pour activer l’envoi : choisissez le territoire.","zone":"Pour activer l’envoi : choisissez la zone / localité de base.","required":"Un champ obligatoire"},"wo":{"missing":"Lii manke na : ","fill":". Bindal xibaar bii, te nga dellu yónnee dossier bi.","country":"Ngir mën a yónnee: tànnal réew mi.","territory":"Ngir mën a yónnee: tànnal territoire bi.","zone":"Ngir mën a yónnee: tànnal gox bi nga dëkk.","required":"Xibaar bu war"},"zh":{"missing":"尚缺少：","fill":"。请填写此项，再提交资料。","country":"提交前请先选择国家。","territory":"提交前请选择地区。","zone":"提交前请选择主要服务区域。","required":"必填项目"},"en":{"missing":"Missing: ","fill":". Complete this field, then submit your file again.","country":"To submit, first choose the country.","territory":"To submit, choose a territory.","zone":"To submit, choose your base area.","required":"A required field"},"es":{"missing":"Falta: ","fill":". Complete este campo y vuelva a enviar el expediente.","country":"Para enviar, elija primero el país.","territory":"Para enviar, seleccione el territorio.","zone":"Para enviar, seleccione la zona principal.","required":"Un campo obligatorio"},"pt":{"missing":"Falta: ","fill":". Preencha este campo e volte a enviar o processo.","country":"Para enviar, selecione primeiro o país.","territory":"Para enviar, escolha o território.","zone":"Para enviar, escolha a zona principal.","required":"Campo obrigatório"},"it":{"missing":"Manca: ","fill":". Compila questo campo e invia di nuovo il dossier.","country":"Per inviare, scegli prima il Paese.","territory":"Per inviare, scegli il territorio.","zone":"Per inviare, scegli la zona di base.","required":"Campo obbligatorio"},"de":{"missing":"Es fehlt: ","fill":". Füllen Sie dieses Feld aus und senden Sie die Unterlagen erneut.","country":"Wählen Sie zuerst das Land.","territory":"Wählen Sie ein Gebiet.","zone":"Wählen Sie Ihren Basisstandort.","required":"Pflichtfeld"},"nl":{"missing":"Ontbreekt: ","fill":". Vul dit veld in en verstuur uw dossier opnieuw.","country":"Kies eerst het land.","territory":"Kies uw gebied.","zone":"Kies uw basislocatie.","required":"Verplicht veld"},"ar":{"missing":"الحقل الناقص: ","fill":". أكمل هذا الحقل ثم أعد إرسال الملف.","country":"لإرسال الملف اختر البلد أولاً.","territory":"لإرسال الملف اختر المنطقة.","zone":"لإرسال الملف اختر الموقع الأساسي.","required":"حقل مطلوب"}};
function translate(k){const l=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();return (WORLD10_GUARD[l]||WORLD10_GUARD.fr)[k]}
let handling=false;
function labelFor(el){const node=el.closest&&el.closest('label'),shown=node?node.textContent.replace(/\s*\*/g,'').replace(/\s+/g,' ').trim():'';return shown||names[el.id]||el.name||translate('required')}
form.addEventListener('invalid',function(e){
  e.preventDefault();
  if(handling)return;
  handling=true;
  const el=e.target;
  st.className='status bad';
  st.textContent=translate('missing')+labelFor(el)+translate('fill');
  try{el.scrollIntoView({behavior:'smooth',block:'center'});setTimeout(()=>el.focus({preventScroll:true}),350)}catch(_){}
  setTimeout(()=>{handling=false},500);
},true);
function explainDisabled(){
  if(!btn.disabled)return;
  const country=document.getElementById('country'),territory=document.getElementById('territory'),base=document.getElementById('baseZone');
  if(country&&!country.value){st.className='status';st.textContent=translate('country');return}
  if(territory&&!territory.value){st.className='status';st.textContent=translate('territory');return}
  if(base&&!base.value){st.className='status';st.textContent=translate('zone');return}
}
form.addEventListener('change',()=>setTimeout(explainDisabled,0));
new MutationObserver(explainDisabled).observe(btn,{attributes:true,attributeFilter:['disabled']});
setTimeout(explainDisabled,0);
})();