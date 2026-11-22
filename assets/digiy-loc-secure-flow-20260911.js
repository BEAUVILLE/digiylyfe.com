/* DIGIY LOC — dossier -> BAT -> paiement -> accès propriétaire */
(function(){
'use strict';
const U='https://wesqmwjjtsefyjnluosj.supabase.co/functions/v1/digiy-loc-dossier',KEY='sb_publishable_tGHItRgeWDmGjnd0CK1DVQ_BIep4Ug3',PHONE='221771342889';
const confirmationCopy={
  "fr": [
    "Première adhésion DIGIY LOC",
    "Adhésion mensuelle",
    "Adhésion annuelle",
    "Total après acceptation du BAT",
    "1 mois renouvelable",
    "12 mois",
    "Le premier règlement couvre la fiche ou le site choisi. Tout règlement intervient après acceptation du BAT."
  ],
  "en": [
    "First DIGIY LOC membership payment",
    "Monthly membership",
    "Annual membership",
    "Total after proof approval",
    "1 renewable month",
    "12 months",
    "The first payment covers the chosen profile or website. Payment is due after proof approval."
  ],
  "es": [
    "Primer pago de DIGIY LOC",
    "Adhesión mensual",
    "Adhesión anual",
    "Total tras aprobar la prueba",
    "1 mes renovable",
    "12 meses",
    "El primer pago incluye la ficha o el sitio elegido. El pago se realiza tras aprobar la prueba."
  ],
  "pt": [
    "Primeiro pagamento DIGIY LOC",
    "Adesão mensal",
    "Adesão anual",
    "Total após aprovação da prova",
    "1 mês renovável",
    "12 meses",
    "O primeiro pagamento inclui a ficha ou o site escolhido. O pagamento é feito após aprovação da prova."
  ],
  "it": [
    "Primo pagamento DIGIY LOC",
    "Adesione mensile",
    "Adesione annuale",
    "Totale dopo l’approvazione della bozza",
    "1 mese rinnovabile",
    "12 mesi",
    "Il primo pagamento comprende la scheda o il sito scelto. Il pagamento avviene dopo l’approvazione della bozza."
  ],
  "de": [
    "Erste Zahlung für DIGIY LOC",
    "Monatsmitgliedschaft",
    "Jahresmitgliedschaft",
    "Gesamtbetrag nach Freigabe des Entwurfs",
    "1 verlängerbarer Monat",
    "12 Monate",
    "Die erste Zahlung umfasst das gewählte Profil oder die Website. Die Zahlung erfolgt nach Freigabe des Entwurfs."
  ],
  "nl": [
    "Eerste betaling DIGIY LOC",
    "Maandlidmaatschap",
    "Jaarlidmaatschap",
    "Totaal na goedkeuring van het ontwerp",
    "1 verlengbare maand",
    "12 maanden",
    "De eerste betaling omvat het gekozen profiel of de website. Betaling volgt na goedkeuring van het ontwerp."
  ],
  "ar": [
    "الدفعة الأولى لاشتراك DIGIY LOC",
    "اشتراك شهري",
    "اشتراك سنوي",
    "الإجمالي بعد اعتماد المسودة",
    "شهر واحد قابل للتجديد",
    "12 شهراً",
    "تشمل الدفعة الأولى الملف المهني أو الموقع المختار. يتم الدفع بعد اعتماد المسودة."
  ],
  "wo": [
    "Fay bu njëkk ci DIGIY LOC",
    "Bokk ci weer wi",
    "Bokk ci at mi",
    "Limu fay bi gannaaw nangu",
    "1 weer bu mën a yeesal",
    "12 weer",
    "Fay bu njëkk bi dafay boole fiche bi walla site bi nga tànn. Dangay fay gannaaw nga nangu."
  ],
  "zh": [
    "DIGIY LOC 首次付款",
    "月度会员费",
    "年度会员费",
    "确认预览稿后应付总额",
    "1 个月，可续订",
    "12 个月",
    "首次付款包含所选的商家资料或网站。确认预览稿后付款。"
  ]
};
const miamiConfirmation={
  "fr": [
    "Dossier LOC Miami prêt",
    "Envoyez le dossier via WhatsApp pour validation. Réglez après acceptation du bon à tirer."
  ],
  "en": [
    "Miami LOC application ready",
    "Send the application via WhatsApp for review. Pay after approving the proof."
  ],
  "es": [
    "Solicitud LOC Miami lista",
    "Envíe la solicitud por WhatsApp para su revisión. Pague tras aprobar la prueba."
  ],
  "pt": [
    "Pedido LOC Miami pronto",
    "Envie o pedido pelo WhatsApp para análise. Pague após aprovar a prova."
  ],
  "it": [
    "Domanda LOC Miami pronta",
    "Invia la domanda via WhatsApp per la verifica. Paga dopo aver approvato la bozza."
  ],
  "de": [
    "LOC-Antrag für Miami fertig",
    "Senden Sie den Antrag per WhatsApp zur Prüfung. Zahlen Sie nach Freigabe des Entwurfs."
  ],
  "nl": [
    "LOC-aanvraag voor Miami klaar",
    "Stuur de aanvraag via WhatsApp ter beoordeling. Betaal na goedkeuring van het ontwerp."
  ],
  "ar": [
    "طلب LOC لميامي جاهز",
    "أرسل الطلب عبر واتساب للمراجعة. ادفع بعد اعتماد المسودة."
  ],
  "wo": [
    "Dosiye LOC Miami bi pare na",
    "Yónneel dosiye bi ci WhatsApp ngir ñu seet ko. Fay gannaaw nga nangu li ñu la yónnee."
  ],
  "zh": [
    "迈阿密 LOC 申请已准备好",
    "请通过 WhatsApp 发送申请供审核。确认预览稿后付款。"
  ]
};
const M={
zh:{"title":"确认预览稿前提交资料和 LOC 价格","lead":"请先提交申请。DIGIYLYFE 将准备 LOC 页面并发送预览稿。确认后再付款。","submit":"提交 LOC 申请 →","email":"电子邮件 *","need":"请填写电子邮件，以便付款后接收安全的业主登录链接。","sending":"正在安全提交 LOC 申请…","done":"✅ 已收到 LOC 申请","after":"DIGIYLYFE 将准备您的 LOC 页面并发送预览稿。确认预览稿并核实付款后，业主管理权限将启用，登录链接会发送到您的邮箱。","wa":"通过 WhatsApp 通知 DIGIYLYFE →"},
wo:{title:'Sa xibaar ak njëgu LOC bala nga dëggal',lead:'Yónneel sa dosiye ba mu jëkk. DIGIYLYFE dina waajal sa LOC te yónnee la li nga war a dëggal. Fay gannaaw nga nangu.',submit:'YÓNNEE SAMA DOSIYE LOC →',email:'E-mail *',need:'Sa e-mail lañu soxla ngir yónnee la sa duggub boroom bu wóor gannaaw fay.',sending:'Ñu ngi yónnee sa dosiye LOC…',done:'✅ Yónnee nañu sa dosiye LOC.',after:'DIGIYLYFE dina waajal sa LOC. Dinañu la yónnee li nga war a dëggal bala ngay fay. Gannaaw nangu ak dëggal fay bi, dinañu ubbi sa duggub boroom te yónnee la lëkkalekaayu dugg bi ci e-mail.',wa:'YÉGAL DIGIYLYFE CI WHATSAPP →'},
fr:{title:'Vos coordonnées et votre tarif LOC avant bon à tirer',lead:'Envoyez d’abord votre dossier. DIGIYLYFE prépare votre version LOC et vous transmet un BON À TIRER. Aucun règlement avant votre acceptation.',submit:'ENVOYER MON DOSSIER LOC →',email:'E-mail *',need:'L’e-mail est obligatoire pour recevoir votre accès propriétaire sécurisé après paiement.',sending:'Envoi sécurisé du dossier LOC…',done:'✅ DOSSIER LOC REÇU',after:'DIGIYLYFE prépare maintenant votre version LOC. Vous recevrez votre BON À TIRER avant tout règlement. Après acceptation du BAT et confirmation du paiement, votre accès propriétaire sera activé et le magic link sera envoyé à votre e-mail.',wa:'PRÉVENIR DIGIYLYFE SUR WHATSAPP →'},
en:{title:'Your details and LOC price before proof approval',lead:'Send your file first. DIGIYLYFE prepares your LOC version and sends you a PROOF FOR APPROVAL. No payment before you approve it.',submit:'SEND MY LOC FILE →',email:'Email *',need:'Email is required to receive your secure owner access after payment.',sending:'Sending your LOC file securely…',done:'✅ LOC FILE RECEIVED',after:'DIGIYLYFE now prepares your LOC version. You will receive the proof for approval before any payment. After approval and payment confirmation, owner access is activated and the magic link is sent to your email.',wa:'NOTIFY DIGIYLYFE ON WHATSAPP →'},
es:{title:'Sus datos y tarifa LOC antes del visto bueno',lead:'Envíe primero su expediente. DIGIYLYFE prepara su versión LOC y le envía la prueba. Ningún pago antes de su aprobación.',submit:'ENVIAR MI EXPEDIENTE LOC →',email:'E-mail *',need:'El e-mail es obligatorio para recibir el acceso propietario seguro después del pago.',sending:'Envío seguro del expediente LOC…',done:'✅ EXPEDIENTE LOC RECIBIDO',after:'DIGIYLYFE prepara ahora su versión LOC. Recibirá la prueba antes de pagar. Tras aprobarlo y confirmarse el pago, se activa su acceso propietario y se envía el enlace seguro a su e-mail.',wa:'AVISAR A DIGIYLYFE POR WHATSAPP →'},
pt:{title:'Os seus dados e tarifa LOC antes da aprovação',lead:'Envie primeiro o dossier. A DIGIYLYFE prepara a sua versão LOC e envia a prova. Nenhum pagamento antes da sua aprovação.',submit:'ENVIAR O MEU DOSSIER LOC →',email:'E-mail *',need:'O e-mail é obrigatório para receber o acesso seguro do proprietário após o pagamento.',sending:'Envio seguro do dossier LOC…',done:'✅ DOSSIER LOC RECEBIDO',after:'A DIGIYLYFE prepara agora a sua versão LOC. Receberá a prova antes de qualquer pagamento. Após aprovação e confirmação do pagamento, o acesso do proprietário é ativado e o ligação segura é enviado para o seu e-mail.',wa:'AVISAR A DIGIYLYFE NO WHATSAPP →'},
it:{title:'I tuoi dati e la tariffa LOC prima dell’approvazione',lead:'Invia prima il dossier. DIGIYLYFE prepara la versione LOC e ti invia la bozza. Nessun pagamento prima dell’approvazione.',submit:'INVIA IL DOSSIER LOC →',email:'E-mail *',need:'L’e-mail è obbligatoria per ricevere l’accesso proprietario sicuro dopo il pagamento.',sending:'Invio sicuro del dossier LOC…',done:'✅ DOSSIER LOC RICEVUTO',after:'DIGIYLYFE prepara ora la tua versione LOC. Riceverai la bozza prima di qualsiasi pagamento. Dopo approvazione e conferma del pagamento, l’accesso proprietario viene attivato e il link sicuro viene inviato alla tua e-mail.',wa:'AVVISA DIGIYLYFE SU WHATSAPP →'},
de:{title:'Ihre Angaben und Ihr LOC-Tarif vor der Freigabe',lead:'Senden Sie zuerst Ihre Unterlagen. DIGIYLYFE erstellt Ihre LOC-Version und sendet Ihnen den Entwurf. Keine Zahlung vor Ihrer Freigabe.',submit:'LOC-UNTERLAGEN SENDEN →',email:'E-Mail *',need:'Die E-Mail ist erforderlich, damit Sie nach der Zahlung Ihren sicheren Eigentümerzugang erhalten.',sending:'LOC-Unterlagen werden sicher gesendet…',done:'✅ LOC-UNTERLAGEN ERHALTEN',after:'DIGIYLYFE erstellt jetzt Ihre LOC-Version. Vor jeder Zahlung erhalten Sie den Entwurf. Nach Freigabe und Zahlungsbestätigung wird Ihr Eigentümerzugang aktiviert und der Anmeldelink an Ihre E-Mail gesendet.',wa:'DIGIYLYFE PER WHATSAPP INFORMIEREN →'},
nl:{title:'Uw gegevens en LOC-tarief vóór goedkeuring',lead:'Stuur eerst uw dossier. DIGIYLYFE maakt uw LOC-versie en stuurt u het ontwerp. Geen betaling vóór uw goedkeuring.',submit:'MIJN LOC-DOSSIER VERSTUREN →',email:'E-mail *',need:'E-mail is verplicht om na betaling uw beveiligde eigenaarstoegang te ontvangen.',sending:'LOC-dossier veilig verzenden…',done:'✅ LOC-DOSSIER ONTVANGEN',after:'DIGIYLYFE maakt nu uw LOC-versie. U ontvangt het ontwerp vóór elke betaling. Na goedkeuring en betalingsbevestiging wordt uw eigenaarstoegang geactiveerd en wordt de inloglink naar uw e-mail gestuurd.',wa:'DIGIYLYFE VIA WHATSAPP MELDEN →'},
ar:{title:'بياناتك وسعر LOC قبل الموافقة',lead:'أرسل ملفك أولاً. تُعد DIGIYLYFE نسخة LOC وترسل لك نسخة الاعتماد. لا دفع قبل موافقتك.',submit:'إرسال ملف LOC ←',email:'البريد الإلكتروني *',need:'البريد الإلكتروني إلزامي لاستلام دخول المالك الآمن بعد الدفع.',sending:'جارٍ إرسال ملف LOC بشكل آمن…',done:'✅ تم استلام ملف LOC',after:'تُعد DIGIYLYFE الآن نسخة LOC الخاصة بك. ستستلم نسخة الاعتماد قبل أي دفع. بعد الموافقة وتأكيد الدفع، يتم تفعيل دخول المالك وإرسال الرابط السحري إلى بريدك الإلكتروني.',wa:'إبلاغ DIGIYLYFE عبر واتساب ←'}
};
const $=id=>document.getElementById(id),form=$('locForm');if(!form)return;const SITE_COPY={
zh:{"label":"您需要网站吗？","help":"首次付款包含商家资料或网站，两者任选其一。","none":"无需网站 · 商家资料","premium":"高级网站","extra":"增强版网站"},
wo:{label:'BËGG NGA AM SITE WEB ?',help:'Ci fay bu njëkk, site bi wuutu na fiche liggéey bi. Dangay fay fiche bi walla site bi, benn rekk.',none:'Amul site · fiche liggéey',premium:'SITE PREMIUM',extra:'SITE EXTRA'},
fr:{label:'SOUHAITEZ-VOUS UN SITE WEB ?',help:'Le site remplace la fiche professionnelle dans le premier règlement : fiche OU site, jamais les deux.',none:'Sans site · fiche professionnelle',premium:'SITE PREMIUM',extra:'SITE EXTRA'},
en:{label:'WOULD YOU LIKE A WEBSITE?',help:'The website replaces the professional profile in the first payment: profile OR website, never both.',none:'No website · professional profile',premium:'PREMIUM WEBSITE',extra:'EXTRA WEBSITE'},
es:{label:'¿QUIERE UN SITIO WEB?',help:'El sitio sustituye la ficha profesional en el primer pago: ficha O sitio, nunca ambos.',none:'Sin sitio · ficha profesional',premium:'SITIO PREMIUM',extra:'SITIO EXTRA'},
pt:{label:'DESEJA UM SITE?',help:'O site substitui a ficha profissional no primeiro pagamento: ficha OU site, nunca ambos.',none:'Sem site · ficha profissional',premium:'SITE PREMIUM',extra:'SITE EXTRA'},
it:{label:'VUOI UN SITO WEB?',help:'Il sito sostituisce la scheda professionale nel primo pagamento: scheda O sito, mai entrambi.',none:'Senza sito · scheda professionale',premium:'SITO PREMIUM',extra:'SITO EXTRA'},
de:{label:'MÖCHTEN SIE EINE WEBSITE?',help:'Die Website ersetzt beim ersten Betrag das Berufsprofil: Profil ODER Website, nie beides.',none:'Keine Website · Berufsprofil',premium:'PREMIUM-WEBSITE',extra:'EXTRA-WEBSITE'},
nl:{label:'WILT U EEN WEBSITE?',help:'De website vervangt het professionele profiel bij de eerste betaling: profiel OF website, nooit beide.',none:'Geen website · professioneel profiel',premium:'PREMIUM-WEBSITE',extra:'EXTRA-WEBSITE'},
ar:{label:'هل تريد موقعًا إلكترونيًا؟',help:'يحل الموقع محل الملف المهني في الدفعة الأولى: الملف أو الموقع، وليس الاثنين معًا.',none:'بدون موقع · ملف مهني',premium:'موقع PREMIUM',extra:'موقع EXTRA'}
};
function lang(){const l=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();return M[l]?l:'fr'}
function marketing(){
 // La grille tarifaire appartient désormais à tarifs-loc-v2.html.
 // Ce script sécurise le dossier/BAT mais ne réécrit plus les prix,
 // remises, fiches ni totaux de première adhésion.
 document.querySelectorAll('[data-first-join]').forEach(function(el){el.remove()});
}
function preselectCountry(){
 try{
  let c=(new URLSearchParams(location.search).get('country')||'').toLowerCase();
  if(c==='fr')c='eu';
  if(c!=='sn'&&c!=='eu'&&c!=='us')return;
  const el=$('country');if(!el)return;
  el.value=c;
  el.dispatchEvent(new Event('change',{bubbles:true}));
 }catch(_){}
}
function siteUi(){const c=value('country')||'sn',s=$('siteOption'),field=$('siteOptionField'),tx=SITE_COPY[lang()]||SITE_COPY.fr;if($('lSiteOption'))$('lSiteOption').textContent=tx.label;if($('siteHelp'))$('siteHelp').textContent=tx.help;if(!s)return;if(c==='us'){s.value='none';if(field)field.classList.add('hidden');return}if(field)field.classList.remove('hidden');const price=c==='eu'?{none:'250 € HT',premium:'480 € HT',extra:'800 € HT'}:{none:'100 000 FCFA',premium:'250 000 FCFA',extra:'450 000 FCFA'};s.options[0].textContent=tx.none+' · '+price.none;s.options[1].textContent=tx.premium+' · '+price.premium;s.options[2].textContent=tx.extra+' · '+price.extra}
const errors={
 fr:['Le tarif a changé. Rechargez la page et choisissez à nouveau votre palier.','Envoi impossible. Veuillez réessayer.','Vérifiez ce champ.'],
 en:['The price has changed. Reload the page and select your tier again.','Submission failed. Please try again.','Please check this field.'],
 es:['La tarifa ha cambiado. Recargue la página y vuelva a elegir el nivel.','No se pudo enviar. Inténtelo de nuevo.','Revise este campo.'],
 pt:['A tarifa mudou. Recarregue a página e volte a escolher o escalão.','Não foi possível enviar. Tente novamente.','Verifique este campo.'],
 it:['La tariffa è cambiata. Ricarica la pagina e scegli di nuovo la fascia.','Invio non riuscito. Riprova.','Controlla questo campo.'],
 de:['Der Preis hat sich geändert. Laden Sie die Seite neu und wählen Sie Ihre Stufe erneut.','Senden fehlgeschlagen. Bitte erneut versuchen.','Bitte prüfen Sie dieses Feld.'],
 nl:['Het tarief is gewijzigd. Vernieuw de pagina en kies uw tarief opnieuw.','Verzenden mislukt. Probeer het opnieuw.','Controleer dit veld.'],
 ar:['تغيّر السعر. أعد تحميل الصفحة واختر الشريحة مجدداً.','تعذّر الإرسال. حاول مجدداً.','تحقق من هذا الحقل.'],
 wo:['Njëg bi soppeekuna. Yeesalal xët wi te tànnaat sa tolluwaay.','Yónnee bi antuwul. Jéemaatal.','Seetaatal li nga bind fii.'],
 zh:['价格已更新。请刷新页面并重新选择档位。','提交失败，请重试。','请检查此项。']
};
function value(id){return $(id).value.trim()}
function label(id){return form.querySelector('label[for="'+id+'"]').textContent.replace(/\s*\*$/,'')}
function selected(id){return $(id).selectedOptions[0]?.textContent||''}
function fileLines(){
 return ['business','manager','email','phone','country','zone','units','type','free']
   .filter(id=>value(id)).map(id=>label(id)+' · '+(id==='type'||id==='country'?selected(id):value(id)));
}
function whatsapp(lines){return 'https://wa.me/'+PHONE+'?text='+encodeURIComponent(lines.join('\n'))}
const status=document.createElement('div');
status.id='locSecureStatus';
status.setAttribute('aria-live','polite');
form.after(status);
let state=null;
function renderStatus(){
 const l=lang(), x=M[l], summary=confirmationCopy[l];
 status.replaceChildren();
 status.hidden=!state;
 if(!state)return;
 status.className='summary ok';
 const {kind,data,siteOption}=state;
 if(kind==='quote'){
   $('quoteWa').href=whatsapp(['DIGIY LOC · '+$('quoteTitle').textContent,...fileLines(),$('quoteText').textContent,x.lead]);
   status.hidden=true;
   return;
 }
 if(kind==='sending'){status.textContent=x.sending;return}
 if(kind==='error'){
   status.className='error';
   status.textContent=state.message==='email'?x.need:state.message==='tier'?$('chosenPrice').dataset.mismatch+' '+$('summaryTitle').textContent:errors[l][state.message==='price'?0:1];
   if(state.expected)status.textContent+=' · '+state.expected;
   return;
 }
 const miami=kind==='miami';
 const heading=document.createElement('strong');
 heading.textContent=miami?miamiConfirmation[l][0]:x.done;
 const desc=document.createElement('p');
 desc.textContent=miami?miamiConfirmation[l][1]:x.after;
 status.append(heading,desc);
 const lines=['DIGIY LOC · '+heading.textContent,...fileLines(),selected('chosenPrice')];
 if(miami){lines.push(desc.textContent)}
 else{
   const money=n=>n+' '+data.currency+(data.currency==='EUR'||data.currency==='€'?' HT':'');
   const monthly=data.billing==='monthly';
   const details=[summary[0],summary[monthly?1:2]+' · '+money(data.amount),
     SITE_COPY[l][siteOption]+' · + '+money(data.initial_service_amount),
     summary[3]+' · '+money(data.first_join_total),summary[monthly?4:5],summary[6]];
   for(const text of details){
     const row=document.createElement('div');
     row.textContent=text;
     status.append(row);
   }
   lines.push('ID · '+data.id,data.tier,...details);
 }
 const link=document.createElement('a');
 link.className='cta';link.target='_blank';link.rel='noopener';link.href=whatsapp(lines);link.textContent=x.wa;
 status.append(link);
}
function copy(){
 const x=M[lang()];
 $('formTitle').textContent=x.title;$('formLead').textContent=x.lead;
 $('lEmail').textContent=x.email;
 $('continue').dataset.submit=x.submit;
 $('continue').textContent=$('continue').dataset.action||x.submit;
 $('email').required=true;
 for(const el of form.elements)if(el.setCustomValidity)el.setCustomValidity('');
 siteUi();marketing();standardOffer=null;renderMiamiOffer();renderStatus();
}
function update(kind,props={}){
 state={kind,...props};renderStatus();
}
form.addEventListener('invalid',event=>{
 const el=event.target;
 el.setCustomValidity(el.id==='email'?M[lang()].need:label(el.id)+' · '+errors[lang()][2]);
},true);
function clearFeedback(event){
 event.target.setCustomValidity?.('');
 if(state?.kind==='error'||state?.kind==='quote'){
   state=null;$('quote').classList.add('hidden');renderStatus();
 }
}
form.addEventListener('input',clearFeedback);
form.addEventListener('change',clearFeedback);
function lock(locked){for(const el of form.elements)el.disabled=locked}
form.addEventListener('submit',async event=>{
 event.preventDefault();
 if(state && ['sending','complete','miami'].includes(state.kind))return;
 const country=value('country'), units=Number(value('units')), email=value('email').toLowerCase();
 if(!/^\S+@\S+\.\S+$/.test(email)){update('error',{message:'email'});$('email').focus();return}
 if(units>(country==='us'?20:40)){
   $('quote').classList.remove('hidden');update('quote');$('quote').scrollIntoView();return;
 }
 const [tier,price,region,period]=value('chosenPrice').split('|');
 const bounds=(tier||'').split('–').map(Number), amount=Number(price), billing=value('billing');
 if(!tier||units<bounds[0]||units>bounds[bounds.length-1]||region!==country||period!==billing||!Number.isFinite(amount)){
   update('error',{message:'tier'});return;
 }
 lock(true);
 if(country==='us'){update('miami');status.scrollIntoView();return}
 const body={country:country==='sn'?'SN':'FR',tier_label:tier,billing,amount,units,business:value('business'),manager:value('manager'),phone:value('phone'),email,zone:value('zone'),lodging_type:value('type'),site_option:value('siteOption')||'none',note:value('free'),lang:lang()};
 update('sending');
 try{
   const response=await fetch(U,{method:'POST',headers:{'Content-Type':'application/json','apikey':KEY},body:JSON.stringify(body)});
   const data=await response.json();
   if(!response.ok||!data.ok){
     lock(false);
     update('error',{message:data.error==='price_mismatch'?'price':'server',expected:data.error==='price_mismatch'?data.expected_amount:null});
     return;
   }
   update('complete',{data,siteOption:body.site_option});status.scrollIntoView();
 }catch{
   lock(false);update('error',{message:'server'});
 }
});
document.querySelectorAll('.lang').forEach(b=>b.addEventListener('click',copy));
$('country').addEventListener('change',()=>{siteUi();renderMiamiOffer()});
const miamiOffer={
  "fr": [
    "Pilote Miami · tarif annuel fixe",
    "par an selon les unités actives. Au-delà de 20 unités, demandez un devis. Réservation directe · 0 % commission DIGIYLYFE · règlement après validation du bon à tirer."
  ],
  "en": [
    "Miami pilot · fixed annual pricing",
    "per year based on active units. Above 20 units, request a quote. Direct booking · 0% DIGIYLYFE commission · payment after proof approval."
  ],
  "es": [
    "Piloto Miami · tarifa anual fija",
    "al año según las unidades activas. Para más de 20 unidades, solicite un presupuesto. Reserva directa · 0 % de comisión DIGIYLYFE · pago tras aprobar la prueba."
  ],
  "pt": [
    "Piloto Miami · tarifa anual fixa",
    "por ano conforme as unidades ativas. Para mais de 20 unidades, peça um orçamento. Reserva direta · 0 % de comissão DIGIYLYFE · pagamento após aprovação da prova."
  ],
  "it": [
    "Progetto pilota Miami · tariffa annua fissa",
    "all’anno secondo le unità attive. Oltre 20 unità, richiedi un preventivo. Prenotazione diretta · 0% commissioni DIGIYLYFE · pagamento dopo l’approvazione della bozza."
  ],
  "de": [
    "Pilotprojekt Miami · fester Jahrespreis",
    "pro Jahr je nach aktiven Einheiten. Bei mehr als 20 Einheiten bitte ein Angebot anfordern. Direkte Buchung · 0 % DIGIYLYFE-Provision · Zahlung nach Freigabe des Entwurfs."
  ],
  "nl": [
    "Pilot Miami · vast jaartarief",
    "per jaar op basis van actieve units. Vraag bij meer dan 20 units een offerte aan. Rechtstreeks boeken · 0% DIGIYLYFE-commissie · betaling na goedkeuring van het ontwerp."
  ],
  "ar": [
    "مشروع ميامي التجريبي · سعر سنوي ثابت",
    "سنوياً بحسب عدد الوحدات النشطة. اطلب عرض سعر لأكثر من 20 وحدة. حجز مباشر · عمولة DIGIYLYFE ‏0٪ · الدفع بعد اعتماد المسودة."
  ],
  "wo": [
    "Jéemukaayu Miami · njëgu at bu sax",
    "ci at mi, na méngoo ak limu dalalukaay yi nga ubbi. Su weesoo 20, laajal njëg. Tëye bérab ak boroom bi ci sa bopp · 0 % komisioŋ DIGIYLYFE · fay gannaaw nangu."
  ],
  "zh": [
    "迈阿密试点 · 固定年费",
    "每年，按启用单元数量计算。超过 20 个单元请询价。直接预订 · DIGIYLYFE 零佣金 · 确认预览稿后付款。"
  ]
};
let standardOffer;
function renderMiamiOffer(){
  const title=$('offerTitle'),text=$('offerText');
  if(value('country')!=='us'){
    if(standardOffer){title.textContent=standardOffer[0];text.textContent=standardOffer[1];standardOffer=null}
    return;
  }
  if(!standardOffer)standardOffer=[title.textContent,text.textContent];
  const [heading,details]=miamiOffer[lang()];
  title.textContent='🇺🇸 '+heading;
  text.textContent='$790 · $990 · $1,290 · $1,590 '+details;
}
copy();preselectCountry();
})();
