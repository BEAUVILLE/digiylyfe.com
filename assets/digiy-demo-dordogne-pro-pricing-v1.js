(function(){
'use strict';
if(window.DIGIY_DEMO_DORDOGNE_PRO_PRICING_V1)return;
window.DIGIY_DEMO_DORDOGNE_PRO_PRICING_V1=true;

var q=new URLSearchParams(location.search);
var need=(q.get('need')||'transport').toLowerCase();
var proNeeds=['transport','artisan','food','shopping','beauty','jobs','announcements'];
if(proNeeds.indexOf(need)<0)return;

var T={
  fr:{create:'CRÉATION DE LA FICHE PROFESSIONNELLE',createPrice:'À PARTIR DE 250 € · PAIEMENT UNIQUE',createText:'Création et personnalisation de la fiche professionnelle.',member:'ADHÉSION DIGIY PRO',memberPrice:'450 € / AN',memberText:'1 règlement annuel · accès propriétaire sécurisé + outils professionnels · 2 mois offerts à la première adhésion.',total:'TOTAL MINIMUM 1RE ANNÉE : À PARTIR DE 700 €',totalText:'250 € minimum pour la création de la fiche + 450 € d’adhésion DIGIY PRO. À partir de la 2e année : 450 €/an, hors PREMIUM / EXTRA et prestations supplémentaires.'},
  en:{create:'PROFESSIONAL PROFILE CREATION',createPrice:'FROM €250 · ONE-TIME PAYMENT',createText:'Creation and personalization of the professional profile.',member:'DIGIY PRO MEMBERSHIP',memberPrice:'€450 / YEAR',memberText:'1 annual payment · secure owner access + professional tools · 2 months offered with the first membership.',total:'MINIMUM FIRST-YEAR TOTAL: FROM €700',totalText:'Minimum €250 profile creation + €450 DIGIY PRO membership. From year 2: €450/year, excluding PREMIUM / EXTRA and additional services.'},
  es:{create:'CREACIÓN DE LA FICHA PROFESIONAL',createPrice:'DESDE 250 € · PAGO ÚNICO',createText:'Creación y personalización de la ficha profesional.',member:'ADHESIÓN DIGIY PRO',memberPrice:'450 € / AÑO',memberText:'1 pago anual · acceso propietario seguro + herramientas profesionales · 2 meses incluidos en la primera adhesión.',total:'TOTAL MÍNIMO PRIMER AÑO: DESDE 700 €',totalText:'Mínimo 250 € por la creación de la ficha + 450 € de adhesión DIGIY PRO. Desde el segundo año: 450 €/año, sin PREMIUM / EXTRA ni servicios adicionales.'},
  pt:{create:'CRIAÇÃO DA FICHA PROFISSIONAL',createPrice:'A PARTIR DE 250 € · PAGAMENTO ÚNICO',createText:'Criação e personalização da ficha profissional.',member:'ADESÃO DIGIY PRO',memberPrice:'450 € / ANO',memberText:'1 pagamento anual · acesso seguro do proprietário + ferramentas profissionais · 2 meses oferecidos na primeira adesão.',total:'TOTAL MÍNIMO NO 1.º ANO: A PARTIR DE 700 €',totalText:'Mínimo 250 € pela criação da ficha + 450 € de adesão DIGIY PRO. A partir do 2.º ano: 450 €/ano, sem PREMIUM / EXTRA nem serviços adicionais.'},
  it:{create:'CREAZIONE DELLA SCHEDA PROFESSIONALE',createPrice:'DA 250 € · PAGAMENTO UNICO',createText:'Creazione e personalizzazione della scheda professionale.',member:'ADESIONE DIGIY PRO',memberPrice:'450 € / ANNO',memberText:'1 pagamento annuale · accesso proprietario sicuro + strumenti professionali · 2 mesi offerti alla prima adesione.',total:'TOTALE MINIMO 1° ANNO: DA 700 €',totalText:'Minimo 250 € per la creazione della scheda + 450 € di adesione DIGIY PRO. Dal 2° anno: 450 €/anno, esclusi PREMIUM / EXTRA e servizi aggiuntivi.'},
  de:{create:'ERSTELLUNG DES PROFIPROFILS',createPrice:'AB 250 € · EINMALIGE ZAHLUNG',createText:'Erstellung und Personalisierung des Profiprofils.',member:'DIGIY PRO MITGLIEDSCHAFT',memberPrice:'450 € / JAHR',memberText:'1 Jahreszahlung · sicherer Eigentümerzugang + Profi-Werkzeuge · 2 Monate bei der ersten Mitgliedschaft inklusive.',total:'MINDESTGESAMT 1. JAHR: AB 700 €',totalText:'Mindestens 250 € Profilerstellung + 450 € DIGIY PRO Mitgliedschaft. Ab dem 2. Jahr: 450 €/Jahr, ohne PREMIUM / EXTRA und Zusatzleistungen.'},
  nl:{create:'CREATIE VAN HET PROFESSIONELE PROFIEL',createPrice:'VANAF €250 · EENMALIGE BETALING',createText:'Creatie en personalisatie van het professionele profiel.',member:'DIGIY PRO LIDMAATSCHAP',memberPrice:'€450 / JAAR',memberText:'1 jaarlijkse betaling · veilige eigenaarstoegang + professionele tools · 2 maanden inbegrepen bij de eerste aansluiting.',total:'MINIMUMTOTAAL 1E JAAR: VANAF €700',totalText:'Minimaal €250 profielcreatie + €450 DIGIY PRO-lidmaatschap. Vanaf jaar 2: €450/jaar, exclusief PREMIUM / EXTRA en aanvullende diensten.'},
  ar:{create:'إنشاء الملف المهني',createPrice:'ابتداءً من 250 يورو · دفعة واحدة',createText:'إنشاء وتخصيص الملف المهني.',member:'عضوية DIGIY PRO',memberPrice:'450 يورو / السنة',memberText:'دفعة سنوية واحدة · دخول مالك آمن + أدوات مهنية · شهران إضافيان عند أول عضوية.',total:'الحد الأدنى لإجمالي السنة الأولى: ابتداءً من 700 €',totalText:'250 € كحد أدنى لإنشاء الملف + 450 € لعضوية DIGIY PRO. ابتداءً من السنة الثانية: 450 € سنويًا، باستثناء PREMIUM / EXTRA والخدمات الإضافية.'}
};

function lang(){var l=(document.documentElement.lang||q.get('lang')||'fr').slice(0,2).toLowerCase();return T[l]?l:'fr';}
function style(){
  if(document.getElementById('digiyDemoProPricingStyle'))return;
  var s=document.createElement('style');
  s.id='digiyDemoProPricingStyle';
  s.textContent='.digiyProPriceFlow{display:grid;gap:10px;margin-top:14px}.digiyProPriceStep{padding:13px 14px;border-radius:16px;background:rgba(255,255,255,.38);border:1px solid rgba(20,34,25,.15)}.digiyProPriceStep strong{display:block;font-size:13px;letter-spacing:.035em}.digiyProPriceStep b{display:block;margin-top:5px;font-size:22px}.digiyProPriceStep small{display:block;margin-top:5px;font-weight:850;line-height:1.38;color:#23362b}.digiyProPriceTotal{padding:14px;border-radius:16px;background:#173125;color:#fff8ea;border:2px solid rgba(201,149,67,.68)}.digiyProPriceTotal strong{display:block;color:#f3d795;font-size:16px}.digiyProPriceTotal small{display:block;margin-top:6px;line-height:1.42;font-weight:850}';
  document.head.appendChild(s);
}
function apply(){
  var box=document.querySelector('#businessPanel .price');
  if(!box)return;
  style();
  var t=T[lang()];
  box.innerHTML='<div class="digiyProPriceFlow"><div class="digiyProPriceStep"><strong>'+t.create+'</strong><b>'+t.createPrice+'</b><small>'+t.createText+'</small></div><div class="digiyProPriceStep"><strong>'+t.member+'</strong><b>'+t.memberPrice+'</b><small>'+t.memberText+'</small></div><div class="digiyProPriceTotal"><strong>'+t.total+'</strong><small>'+t.totalText+'</small></div></div>';
}
apply();setTimeout(apply,80);setTimeout(apply,350);
document.addEventListener('click',function(e){if(e.target&&e.target.closest&&e.target.closest('[data-l]'))setTimeout(apply,0)},false);
try{new MutationObserver(apply).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});}catch(_){ }
})();