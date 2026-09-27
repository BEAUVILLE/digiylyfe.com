/* DIGIYLYFE — dossier CARNET PRO minimal — 20260824 */
(function(){
  'use strict';

  var Q=new URLSearchParams(location.search);
  if((Q.get('product')||'').toLowerCase()!=='carnet-pro') return;

  var U='https://wesqmwjjtsefyjnluosj.supabase.co';
  var K='sb_publishable_tGHItRgeWDmGjnd0CK1DVQ_BIep4Ug3';
  var RUNTIME_URL='/assets/digiy-adhesion-runtime-v1.json';
  var sb=window.supabase.createClient(U,K);
  var runtime=null;
  var lang=(Q.get('lang')||localStorage.getItem('digiy_lang')||'fr').slice(0,2).toLowerCase();
  if(!/^(fr|en|es|pt|it|de|nl|ar)$/.test(lang))lang='fr';
  var $=function(s){return document.querySelector(s);};
  var $$=function(s){return Array.prototype.slice.call(document.querySelectorAll(s));};

  var COPY={
    fr:{title:'Préparer mon dossier CARNET PRO',lead:'Renseignez uniquement les informations nécessaires à votre accès CARNET PRO.',email:'Email *',country:'Pays',consent:'Je confirme que ces informations sont exactes et j’autorise DIGIYLYFE à traiter ma demande CARNET PRO. Aucun règlement avant acceptation du BAT.',send:'ENVOYER MON DOSSIER CARNET PRO →',wait:'Le BAT CARNET PRO est préparé, puis envoyé pour acceptation. Aucun règlement avant acceptation du BAT.',done:'Dossier CARNET PRO reçu. BAT À PRÉPARER · aucun règlement avant acceptation du BAT.',badProof:'Preuve de règlement invalide.',badEmail:'Adresse email invalide.',sending:'Envoi sécurisé du dossier CARNET PRO…'},
    en:{title:'Prepare my CARNET PRO file',lead:'Enter only the information needed for your CARNET PRO access.',email:'Email *',country:'Country',consent:'I confirm this information is accurate and authorize DIGIYLYFE to process my CARNET PRO request. No payment before proof approval.',send:'SEND MY CARNET PRO FILE →',wait:'The CARNET PRO proof is prepared, then sent for approval. No payment before proof approval.',done:'CARNET PRO file received. PROOF TO PREPARE · no payment before proof approval.',badProof:'Invalid payment proof.',badEmail:'Invalid email address.',sending:'Securely sending CARNET PRO file…'},
    es:{title:'Preparar mi expediente CARNET PRO',lead:'Indique únicamente los datos necesarios para acceder a CARNET PRO.',email:'Email *',country:'País',consent:'Confirmo que estos datos son correctos y autorizo a DIGIYLYFE a tramitar mi solicitud CARNET PRO. Ningún pago antes de la aprobación del BAT.',send:'ENVIAR MI EXPEDIENTE CARNET PRO →',wait:'El BAT de CARNET PRO se prepara y se envía para su aprobación. Ningún pago antes de la aprobación del BAT.',done:'Expediente CARNET PRO recibido. BAT POR PREPARAR · ningún pago antes de la aprobación del BAT.',badProof:'Prueba de pago inválida.',badEmail:'Dirección de email inválida.',sending:'Envío seguro del expediente CARNET PRO…'},
    pt:{title:'Preparar o meu processo CARNET PRO',lead:'Indique apenas os dados necessários para o seu acesso ao CARNET PRO.',email:'Email *',country:'País',consent:'Confirmo que estes dados são exatos e autorizo a DIGIYLYFE a tratar o meu pedido CARNET PRO. Nenhum pagamento antes da aprovação do BAT.',send:'ENVIAR O MEU PROCESSO CARNET PRO →',wait:'O BAT do CARNET PRO é preparado e enviado para aprovação. Nenhum pagamento antes da aprovação do BAT.',done:'Processo CARNET PRO recebido. BAT A PREPARAR · nenhum pagamento antes da aprovação do BAT.',badProof:'Comprovativo de pagamento inválido.',badEmail:'Endereço de email inválido.',sending:'Envio seguro do processo CARNET PRO…'},
    it:{title:'Prepara il mio dossier CARNET PRO',lead:'Inserisci solo i dati necessari per accedere a CARNET PRO.',email:'Email *',country:'Paese',consent:'Confermo che i dati sono corretti e autorizzo DIGIYLYFE a trattare la richiesta CARNET PRO. Nessun pagamento prima dell’approvazione del BAT.',send:'INVIA IL MIO DOSSIER CARNET PRO →',wait:'Il BAT CARNET PRO viene preparato e inviato per l’approvazione. Nessun pagamento prima dell’approvazione del BAT.',done:'Dossier CARNET PRO ricevuto. BAT DA PREPARARE · nessun pagamento prima dell’approvazione del BAT.',badProof:'Prova di pagamento non valida.',badEmail:'Indirizzo email non valido.',sending:'Invio sicuro del dossier CARNET PRO…'},
    de:{title:'Meinen CARNET-PRO-Antrag vorbereiten',lead:'Geben Sie nur die für Ihren CARNET-PRO-Zugang notwendigen Daten ein.',email:'E-Mail *',country:'Land',consent:'Ich bestätige die Richtigkeit der Angaben und erlaube DIGIYLYFE, meinen CARNET-PRO-Antrag zu bearbeiten. Keine Zahlung vor Freigabe des BAT.',send:'MEINEN CARNET-PRO-ANTRAG SENDEN →',wait:'Der CARNET-PRO-BAT wird erstellt und zur Freigabe gesendet. Keine Zahlung vor Freigabe des BAT.',done:'CARNET-PRO-Antrag erhalten. BAT ZU ERSTELLEN · keine Zahlung vor Freigabe des BAT.',badProof:'Ungültiger Zahlungsnachweis.',badEmail:'Ungültige E-Mail-Adresse.',sending:'CARNET-PRO-Antrag wird sicher gesendet…'},
    nl:{title:'Mijn CARNET PRO-dossier voorbereiden',lead:'Vul alleen de gegevens in die nodig zijn voor uw CARNET PRO-toegang.',email:'E-mail *',country:'Land',consent:'Ik bevestig dat deze gegevens juist zijn en geef DIGIYLYFE toestemming mijn CARNET PRO-aanvraag te verwerken. Geen betaling vóór goedkeuring van de BAT.',send:'MIJN CARNET PRO-DOSSIER VERZENDEN →',wait:'De CARNET PRO-BAT wordt voorbereid en ter goedkeuring verzonden. Geen betaling vóór goedkeuring van de BAT.',done:'CARNET PRO-dossier ontvangen. BAT VOOR TE BEREIDEN · geen betaling vóór goedkeuring van de BAT.',badProof:'Ongeldig betalingsbewijs.',badEmail:'Ongeldig e-mailadres.',sending:'CARNET PRO-dossier veilig verzenden…'},
    ar:{title:'إعداد ملف CARNET PRO',lead:'أدخل فقط المعلومات اللازمة للوصول إلى CARNET PRO.',email:'البريد الإلكتروني *',country:'البلد',consent:'أؤكد صحة هذه المعلومات وأسمح لـ DIGIYLYFE بمعالجة طلب CARNET PRO. لا دفع قبل الموافقة على نسخة الاعتماد.',send:'إرسال ملف CARNET PRO ←',wait:'يتم إعداد نسخة اعتماد CARNET PRO ثم إرسالها للموافقة. لا دفع قبل الموافقة على نسخة الاعتماد.',done:'تم استلام ملف CARNET PRO. نسخة الاعتماد قيد الإعداد · لا دفع قبل الموافقة على نسخة الاعتماد.',badProof:'إثبات الدفع غير صالح.',badEmail:'عنوان البريد الإلكتروني غير صالح.',sending:'جارٍ إرسال ملف CARNET PRO بأمان…'}
  };

  function t(){return COPY[lang]||COPY.fr;}
  function countries(){return runtime&&Array.isArray(runtime.countries)?runtime.countries.filter(function(x){return x.status==='active';}):[];}
  function country(){var el=$('#country');return el?countries().find(function(x){return x.id===el.value;}):null;}
  function carnetPrice(){var c=country();return c&&c.pricing&&c.pricing.modules?c.pricing.modules.carnet_pro:null;}
  function label(o){return o&&o.labels?(o.labels[lang]||o.labels.fr||o.slug):String(o&&o.label||'');}
  function normalizePhone(v,c){var s=String(v||'').trim().replace(/[^\d+]/g,'');if(!s)return'';if(s.indexOf('00')===0)s='+'+s.slice(2);if(s.indexOf('+')===0)return s;s=s.replace(/^0+/,'');return c.calling_code+s;}
  function ext(f){if(f.type==='image/png')return'png';if(f.type==='image/webp')return'webp';if(f.type==='application/pdf')return'pdf';return'jpg';}
  function validEmail(v){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v||'').trim());}

  function installMinimalForm(){
    var photo=$('#photo');
    if(photo){photo.required=false;var pw=photo.closest('label');if(pw)pw.hidden=true;}
    ['#s1','#s2','#s3','#s4','#territory','#baseZone','#pendingZone'].forEach(function(sel){var el=$(sel);if(el)el.required=false;});
    var services=$('.services');if(services)services.hidden=true;
    var extra=$('.extra');if(extra)extra.hidden=true;

    var territory=$('#territory');if(territory&&territory.closest('label'))territory.closest('label').hidden=true;
    var base=$('#baseZone');if(base&&base.closest('label'))base.closest('label').hidden=true;
    var pending=$('#pendingZoneWrap');if(pending)pending.hidden=true;
    var coverage=$('#coverageTitle');if(coverage&&coverage.parentElement)coverage.parentElement.hidden=true;
    var meta=$('#countryMeta');if(meta)meta.hidden=true;
    var countryEl=$('#country');if(countryEl&&countryEl.closest('label'))countryEl.closest('label').classList.add('full');
    var whole=$('#wholeTerritory');if(whole)whole.checked=false;

    if(!$('#email')){
      var firstGrid=$('#name')&&$('#name').closest('.grid');
      if(firstGrid){
        var lab=document.createElement('label');
        lab.className='full';
        lab.setAttribute('data-carnet-email-wrap','1');
        lab.innerHTML='<span id="emailLabel">Email *</span><input id="email" type="email" maxlength="254" autocomplete="email" required>';
        firstGrid.appendChild(lab);
      }
    }
  }

  function refresh(){
    lang=(new URLSearchParams(location.search).get('lang')||localStorage.getItem('digiy_lang')||document.documentElement.lang||'fr').slice(0,2).toLowerCase();
    if(!COPY[lang])lang='fr';
    installMinimalForm();
    var c=country(),p=carnetPrice(),copy=t();
    document.documentElement.lang=lang;
    document.documentElement.dir=lang==='ar'?'rtl':'ltr';
    document.title='DIGIYLYFE — CARNET PRO';
    if($('#title'))$('#title').textContent=copy.title;
    if($('#lead'))$('#lead').textContent=copy.lead;
    if($('#geoTitle'))$('#geoTitle').textContent=copy.country;
    if($('#emailLabel'))$('#emailLabel').textContent=copy.email;
    if($('#consentText'))$('#consentText').textContent=copy.consent;
    if($('#submit'))$('#submit').textContent=copy.send;
    if($('#plan'))$('#plan').textContent=c&&p?'CARNET PRO · '+p.label+' · '+label(c):'CARNET PRO';
    if($('#status')&&!$('#status').classList.contains('ok')&&!$('#status').classList.contains('bad'))$('#status').textContent=copy.wait;
    if($('#submit'))$('#submit').disabled=!(c&&p&&$('#email')&&validEmail($('#email').value));
  }

  function installSubmit(){
    var form=$('#form');
    if(!form)return;
    form.onsubmit=async function(e){
      e.preventDefault();
      var c=country(),p=carnetPrice(),email=$('#email')&&$('#email').value.trim().toLowerCase();
      var st=$('#status'),btn=$('#submit');
      if(!c||!p){st.className='status bad';st.textContent='Configuration pays indisponible.';return;}
      if(!validEmail(email)){st.className='status bad';st.textContent=t().badEmail;return;}
      btn.disabled=true;st.className='status';st.textContent=t().sending;
      var id=crypto.randomUUID();
      try{
        var phone=normalizePhone($('#phone').value,c),wa=normalizePhone($('#wa').value,c);
        var base={
          id:id,
          product_code:'carnet-pro',
          plan_code:'carnet-pro',
          price_amount:p.amount,
          price_xof:c.currency.code==='XOF'?p.amount:null,
          price_eur:c.currency.code==='EUR'?p.amount:null,
          country_id:c.id,
          territory_id:null,
          base_zone_id:null,
          service_zone_ids:[],
          service_territory_ids:[],
          currency_code:c.currency.code,
          calling_code:c.calling_code,
          timezone:c.timezone,
          pro_name:$('#name').value.trim(),
          job_label:$('#job').value.trim(),
          email:email,
          zone_label:null,
          phone:phone,
          whatsapp:wa,
          service_1:null,
          service_2:null,
          service_3:null,
          service_4:null,
          photo_path:null,
          photo_mime:null,
          payment_proof_path:null,
          payment_proof_mime:null,
          consent:$('#consent').checked,
          status:'a_valider',
          payment_status:'a_confirmer',
          card_status:'non_requis',
          bat_status:'a_preparer',
          contract_version:'current_v1',
          billing:'monthly',
          source:'pre-bat-carnet-country-runtime',
          source_lang:lang
        };
        var ins=await sb.from('digiy_adhesion_requests').insert(base);if(ins.error)throw ins.error;
        st.className='status ok';st.textContent=t().done;btn.style.display='none';
        $$('input,textarea,select,.choice').forEach(function(x){x.disabled=true;});
      }catch(err){
        st.className='status bad';st.textContent=err&&err.message?err.message:'Erreur d’envoi.';refresh();
      }
    };
  }

  function loadRuntime(){
    fetch(RUNTIME_URL,{cache:'no-store'})
      .then(function(r){if(!r.ok)throw new Error('runtime '+r.status);return r.json();})
      .then(function(data){runtime=data;refresh();})
      .catch(function(){if($('#status')){$('#status').className='status bad';$('#status').textContent='Configuration pays indisponible.';}});
  }

  installMinimalForm();
  installSubmit();
  loadRuntime();
  var countryEl=$('#country');if(countryEl)countryEl.addEventListener('change',function(){setTimeout(refresh,0);});
  document.addEventListener('input',function(e){if(e.target&&e.target.id==='email')refresh();});
  document.addEventListener('click',function(e){if(e.target&&e.target.matches&&e.target.matches('[data-lang]'))setTimeout(refresh,40);});
  setTimeout(refresh,120);
  setTimeout(refresh,600);
  setTimeout(refresh,1400);
})();
