(function(){
'use strict';
if(window.DIGIY_DEMO_DORDOGNE_PRO_PRICING_V1)return;
window.DIGIY_DEMO_DORDOGNE_PRO_PRICING_V1=true;

var q=new URLSearchParams(location.search);
var need=(q.get('need')||'transport').toLowerCase();
var proNeeds=['transport','artisan','food','shopping','beauty','jobs','announcements'];
if(proNeeds.indexOf(need)<0)return;

var T={
  fr:{create:'CRÉATION DE LA FICHE PROFESSIONNELLE',createPrice:'À PARTIR DE 250 € · PAIEMENT UNIQUE',createText:'Création et personnalisation de la fiche professionnelle.',member:'ADHÉSION DIGIY PRO',memberPrice:'450 € / AN',memberText:'1 règlement annuel · accès propriétaire sécurisé + outils professionnels · 2 mois offerts à la première adhésion.'},
  en:{create:'PROFESSIONAL PROFILE CREATION',createPrice:'FROM €250 · ONE-TIME PAYMENT',createText:'Creation and personalization of the professional profile.',member:'DIGIY PRO MEMBERSHIP',memberPrice:'€450 / YEAR',memberText:'1 annual payment · secure owner access + professional tools · 2 months offered with the first membership.'},
  es:{create:'CREACIÓN DE LA FICHA PROFESIONAL',createPrice:'DESDE 250 € · PAGO ÚNICO',createText:'Creación y personalización de la ficha profesional.',member:'ADHESIÓN DIGIY PRO',memberPrice:'450 € / AÑO',memberText:'1 pago anual · acceso propietario seguro + herramientas profesionales · 2 meses incluidos en la primera adhesión.'},
  pt:{create:'CRIAÇÃO DA FICHA PROFISSIONAL',createPrice:'A PARTIR DE 250 € · PAGAMENTO ÚNICO',createText:'Criação e personalização da ficha profissional.',member:'ADESÃO DIGIY PRO',memberPrice:'450 € / ANO',memberText:'1 pagamento anual · acesso seguro do proprietário + ferramentas profissionais · 2 meses oferecidos na primeira adesão.'},
  it:{create:'CREAZIONE DELLA SCHEDA PROFESSIONALE',createPrice:'DA 250 € · PAGAMENTO UNICO',createText:'Creazione e personalizzazione della scheda professionale.',member:'ADESIONE DIGIY PRO',memberPrice:'450 € / ANNO',memberText:'1 pagamento annuale · accesso proprietario sicuro + strumenti professionali · 2 mesi offerti alla prima adesione.'},
  de:{create:'ERSTELLUNG DES PROFIPROFILS',createPrice:'AB 250 € · EINMALIGE ZAHLUNG',createText:'Erstellung und Personalisierung des Profiprofils.',member:'DIGIY PRO MITGLIEDSCHAFT',memberPrice:'450 € / JAHR',memberText:'1 Jahreszahlung · sicherer Eigentümerzugang + Profi-Werkzeuge · 2 Monate bei der ersten Mitgliedschaft inklusive.'},
  nl:{create:'CREATIE VAN HET PROFESSIONELE PROFIEL',createPrice:'VANAF €250 · EENMALIGE BETALING',createText:'Creatie en personalisatie van het professionele profiel.',member:'DIGIY PRO LIDMAATSCHAP',memberPrice:'€450 / JAAR',memberText:'1 jaarlijkse betaling · veilige eigenaarstoegang + professionele tools · 2 maanden inbegrepen bij de eerste aansluiting.'},
  ar:{create:'إنشاء الملف المهني',createPrice:'ابتداءً من 250 يورو · دفعة واحدة',createText:'إنشاء وتخصيص الملف المهني.',member:'عضوية DIGIY PRO',memberPrice:'450 يورو / السنة',memberText:'دفعة سنوية واحدة · دخول مالك آمن + أدوات مهنية · شهران إضافيان عند أول عضوية.'}
};

function lang(){var l=(document.documentElement.lang||q.get('lang')||'fr').slice(0,2).toLowerCase();return T[l]?l:'fr';}
function style(){
  if(document.getElementById('digiyDemoProPricingStyle'))return;
  var s=document.createElement('style');
  s.id='digiyDemoProPricingStyle';
  s.textContent='.digiyProPriceFlow{display:grid;gap:10px;margin-top:14px}.digiyProPriceStep{padding:13px 14px;border-radius:16px;background:rgba(255,255,255,.38);border:1px solid rgba(20,34,25,.15)}.digiyProPriceStep strong{display:block;font-size:13px;letter-spacing:.035em}.digiyProPriceStep b{display:block;margin-top:5px;font-size:22px}.digiyProPriceStep small{display:block;margin-top:5px;font-weight:850;line-height:1.38;color:#23362b}';
  document.head.appendChild(s);
}
function apply(){
  var box=document.querySelector('#businessPanel .price');
  if(!box)return;
  style();
  var t=T[lang()];
  box.innerHTML='<div class="digiyProPriceFlow"><div class="digiyProPriceStep"><strong>'+t.create+'</strong><b>'+t.createPrice+'</b><small>'+t.createText+'</small></div><div class="digiyProPriceStep"><strong>'+t.member+'</strong><b>'+t.memberPrice+'</b><small>'+t.memberText+'</small></div></div>';
}
apply();setTimeout(apply,80);setTimeout(apply,350);
document.addEventListener('click',function(e){if(e.target&&e.target.closest&&e.target.closest('[data-l]'))setTimeout(apply,0)},false);
try{new MutationObserver(apply).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});}catch(_){ }
})();