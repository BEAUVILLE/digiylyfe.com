(()=>{
'use strict';
if((new URLSearchParams(location.search).get('product')||'').toLowerCase()==='carnet-pro')return;
if(document.querySelector('[data-digiy-indicative-tariffs]'))return;

const COPY={
  fr:{title:'Vos tarifs indicatifs · facultatif',lead:'Souhaitez-vous afficher quelques tarifs sur votre carte ?',toggle:'Je souhaite afficher mes tarifs',label:'Prestation / trajet',price:'Prix',note:'Ces tarifs seront affichés comme vos propres tarifs professionnels. Vous pourrez demander leur modification à DIGIYLYFE.',partial:'Complétez la prestation et le prix pour chaque tarif renseigné.'},
  en:{title:'Your indicative prices · optional',lead:'Would you like to display a few prices on your card?',toggle:'I want to display my prices',label:'Service / route',price:'Price',note:'These prices will be displayed as your own professional prices. You can ask DIGIYLYFE to update them.',partial:'Complete both the service and price for each price entered.'},
  es:{title:'Sus tarifas indicativas · opcional',lead:'¿Desea mostrar algunas tarifas en su tarjeta?',toggle:'Quiero mostrar mis tarifas',label:'Servicio / trayecto',price:'Precio',note:'Estas tarifas se mostrarán como sus propias tarifas profesionales. Podrá solicitar su modificación a DIGIYLYFE.',partial:'Complete el servicio y el precio de cada tarifa indicada.'},
  pt:{title:'Os seus preços indicativos · opcional',lead:'Quer mostrar alguns preços no seu cartão?',toggle:'Quero mostrar os meus preços',label:'Serviço / trajeto',price:'Preço',note:'Estes preços serão apresentados como os seus próprios preços profissionais. Pode pedir à DIGIYLYFE para os alterar.',partial:'Preencha o serviço e o preço para cada valor indicado.'},
  it:{title:'Le tue tariffe indicative · facoltativo',lead:'Vuoi mostrare alcune tariffe sulla tua carta?',toggle:'Voglio mostrare le mie tariffe',label:'Servizio / tratta',price:'Prezzo',note:'Queste tariffe saranno mostrate come le tue tariffe professionali. Potrai chiederne la modifica a DIGIYLYFE.',partial:'Completa servizio e prezzo per ogni tariffa inserita.'},
  de:{title:'Ihre Richtpreise · optional',lead:'Möchten Sie einige Preise auf Ihrer Karte anzeigen?',toggle:'Ich möchte meine Preise anzeigen',label:'Leistung / Strecke',price:'Preis',note:'Diese Preise werden als Ihre eigenen professionellen Preise angezeigt. Änderungen können Sie bei DIGIYLYFE anfragen.',partial:'Bitte Leistung und Preis für jeden eingetragenen Preis ausfüllen.'},
  nl:{title:'Uw indicatieve prijzen · optioneel',lead:'Wilt u enkele prijzen op uw kaart tonen?',toggle:'Ik wil mijn prijzen tonen',label:'Dienst / traject',price:'Prijs',note:'Deze prijzen worden als uw eigen professionele prijzen weergegeven. U kunt DIGIYLYFE vragen ze aan te passen.',partial:'Vul voor elke ingevoerde prijs zowel de dienst als de prijs in.'},
  ar:{title:'أسعارك الإرشادية · اختياري',lead:'هل تريد عرض بعض الأسعار على بطاقتك؟',toggle:'أرغب في عرض أسعاري',label:'الخدمة / المسار',price:'السعر',note:'ستظهر هذه الأسعار باعتبارها أسعارك المهنية الخاصة. ويمكنك طلب تعديلها من DIGIYLYFE.',partial:'أكمل الخدمة والسعر لكل تعرفة تم إدخالها.'}
};

function lang(){
  const l=(document.documentElement.lang||localStorage.getItem('digiy_lang')||'fr').slice(0,2).toLowerCase();
  return COPY[l]?l:'fr';
}
function text(){return COPY[lang()]||COPY.fr}
function currency(){
  const meta=document.getElementById('countryMeta')?.textContent||'';
  if(/\bXOF\b/.test(meta))return {code:'XOF',label:'FCFA'};
  if(/\bEUR\b/.test(meta))return {code:'EUR',label:'€'};
  const m=meta.match(/\b([A-Z]{3})\b/);
  return {code:m?.[1]||'',label:m?.[1]||''};
}

const style=document.createElement('style');
style.textContent=`
.digiy-tariffs{margin-top:13px;padding:13px;border:1px solid #f6c45366;border-radius:16px;background:#f6c4530a}.digiy-tariffs h2{margin:0 0 7px;font-size:20px}.digiy-tariffs-toggle{display:flex!important;align-items:center;gap:9px;margin-top:10px;padding:10px;border:1px solid #ffffff24;border-radius:13px;background:#ffffff06;color:#fff!important}.digiy-tariffs-toggle input{width:22px;min-height:22px;margin:0}.digiy-tariff-rows{display:grid;gap:9px;margin-top:12px;padding-top:12px;border-top:1px solid #ffffff1b}.digiy-tariff-rows[hidden]{display:none}.digiy-tariff-row{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(0,1fr);gap:9px}.digiy-price-wrap{position:relative}.digiy-price-wrap input{padding-right:70px}.digiy-currency{position:absolute;right:11px;top:50%;transform:translateY(-50%);color:#ffe9a8;font-size:11px;font-weight:1000;pointer-events:none}@media(max-width:640px){.digiy-tariff-row{grid-template-columns:1fr}}
`;
document.head.appendChild(style);

const section=document.createElement('section');
section.className='digiy-tariffs';
section.dataset.digiyIndicativeTariffs='1';
section.innerHTML=`
  <h2 id="digiyTariffTitle"></h2>
  <div class="note" id="digiyTariffLead"></div>
  <label class="digiy-tariffs-toggle"><input id="digiyTariffToggle" type="checkbox"><span id="digiyTariffToggleLabel"></span></label>
  <div class="digiy-tariff-rows" id="digiyTariffRows" hidden></div>
  <div class="note" id="digiyTariffNote" style="margin-top:9px"></div>
`;
const services=document.querySelector('.services');
if(!services)return;
services.insertAdjacentElement('afterend',section);

const rows=document.getElementById('digiyTariffRows');
for(let i=1;i<=5;i++){
  const row=document.createElement('div');row.className='digiy-tariff-row';
  row.innerHTML=`<label><span class="digiy-tariff-label"></span><input class="digiy-tariff-name" maxlength="100" autocomplete="off"></label><label><span class="digiy-tariff-price-label"></span><span class="digiy-price-wrap"><input class="digiy-tariff-price" maxlength="40" inputmode="decimal" autocomplete="off"><b class="digiy-currency"></b></span></label>`;
  rows.appendChild(row);
}

function render(){
  const t=text(),c=currency();
  document.getElementById('digiyTariffTitle').textContent=t.title;
  document.getElementById('digiyTariffLead').textContent=t.lead;
  document.getElementById('digiyTariffToggleLabel').textContent=t.toggle;
  document.getElementById('digiyTariffNote').textContent=t.note;
  document.querySelectorAll('.digiy-tariff-label').forEach((el,i)=>el.textContent=t.label+' '+(i+1));
  document.querySelectorAll('.digiy-tariff-price-label').forEach(el=>el.textContent=t.price);
  document.querySelectorAll('.digiy-currency').forEach(el=>el.textContent=c.label);
}

document.getElementById('digiyTariffToggle').addEventListener('change',e=>{
  rows.hidden=!e.target.checked;
  if(!e.target.checked)rows.querySelectorAll('input').forEach(x=>x.value='');
});

document.addEventListener('click',e=>{if(e.target.closest?.('[data-lang]'))setTimeout(render,0)});
document.getElementById('country')?.addEventListener('change',()=>setTimeout(render,0));
new MutationObserver(render).observe(document.getElementById('countryMeta'),{childList:true,subtree:true,characterData:true});

window.DIGIY_INDICATIVE_TARIFFS=function(){
  if(!document.getElementById('digiyTariffToggle')?.checked)return [];
  const c=currency(),out=[];
  document.querySelectorAll('.digiy-tariff-row').forEach(row=>{
    const label=row.querySelector('.digiy-tariff-name').value.trim();
    const price=row.querySelector('.digiy-tariff-price').value.trim();
    if(label||price)out.push({label,price,currency_code:c.code});
  });
  return out;
};

const form=document.getElementById('form');
form?.addEventListener('submit',e=>{
  if(!document.getElementById('digiyTariffToggle')?.checked)return;
  const invalid=[...document.querySelectorAll('.digiy-tariff-row')].some(row=>{
    const a=row.querySelector('.digiy-tariff-name').value.trim(),b=row.querySelector('.digiy-tariff-price').value.trim();
    return (a&&!b)||(!a&&b);
  });
  if(invalid){e.preventDefault();e.stopImmediatePropagation();alert(text().partial)}
},true);

render();
})();