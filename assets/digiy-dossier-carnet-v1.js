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
    fr:{title:'Préparer mon dossier CARNET PRO',lead:'Renseignez uniquement les informations nécessaires à votre accès CARNET PRO.',email:'Email *',country:'Pays',consent:'Je confirme que ces informations sont exactes et j’autorise DIGIYLYFE à traiter ma demande CARNET PRO après contrôle du règlement.',send:'ENVOYER MON DOSSIER CARNET PRO →',wait:'Le paiement et l’activation CARNET PRO sont contrôlés manuellement.',done:'Dossier CARNET PRO reçu. Paiement À CONFIRMER · activation À VALIDER.',badProof:'Preuve de règlement invalide.',badEmail:'Adresse email invalide.',sending:'Envoi sécurisé du dossier CARNET PRO…'},
    en:{title:'Prepare my CARNET PRO file',lead:'Enter only the information needed for your CARNET PRO access.',email:'Email *',country:'Country',consent:'I confirm this information is accurate and authorize DIGIYLYFE to process my CARNET PRO request after payment review.',send:'SEND MY CARNET PRO FILE →',wait:'CARNET PRO payment and activation are reviewed manually.',done:'CARNET PRO file received. Payment TO CONFIRM · activation TO VALIDATE.',badProof:'Invalid payment proof.',badEmail:'Invalid email address.',sending:'Securely sending CARNET PRO file…'},
    es:{title:'Preparar mi expediente CARNET PRO',lead:'Indique únicamente los datos necesarios para acceder a CARNET PRO.',email:'Email *',country:'País',consent:'Confirmo que estos datos son correctos y autorizo a DIGIYLYFE a tramitar mi solicitud CARNET PRO tras revisar el pago.',send:'ENVIAR MI EXPEDIENTE CARNET PRO →',wait:'El pago y la activación de CARNET PRO se controlan manualmente.',done:'Expediente CARNET PRO recibido. Pago POR CONFIRMAR · activación POR VALIDAR.',badProof:'Prueba de pago inválida.',badEmail:'Dirección de email inválida.',sending:'Envío seguro del expediente CARNET PRO…'},
    pt:{title:'Preparar o meu processo CARNET PRO',lead:'Indique apenas os dados necessários para o seu acesso ao CARNET PRO.',email:'Email *',country:'País',consent:'Confirmo que estes dados são exatos e autorizo a DIGIYLYFE a tratar o meu pedido CARNET PRO após verificação do pagamento.',send:'ENVIAR O MEU PROCESSO CARNET PRO →',wait:'O pagamento e a ativação CARNET PRO são verificados manualmente.',done:'Processo CARNET PRO recebido. Pagamento A CONFIRMAR · ativação A VALIDAR.',badProof:'Comprovativo de pagamento inválido.',badEmail:'Endereço de email inválido.',sending:'Envio seguro do processo CARNET PRO…'},
    it:{title:'Prepara il mio dossier CARNET PRO',lead:'Inserisci solo i dati necessari per accedere a CARNET PRO.',email:'Email *',country:'Paese',consent:'Confermo che i dati sono corretti e autorizzo DIGIYLYFE a trattare la richiesta CARNET PRO dopo il controllo del pagamento.',send:'INVIA IL MIO DOSSIER CARNET PRO →',wait:'Pagamento e attivazione CARNET PRO sono verificati manualmente.',done:'Dossier CARNET PRO ricevuto. Pagamento DA CONFERMARE · attivazione DA VALIDARE.',badProof:'Prova di pagamento non valida.',badEmail:'Indirizzo email non valido.',sending:'Invio sicuro del dossier CARNET PRO…'},
    de:{title:'Meinen CARNET-PRO-Antrag vorbereiten',lead:'Geben Sie nur die für Ihren CARNET-PRO-Zugang notwendigen Daten ein.',email:'E-Mail *',country:'Land',consent:'Ich bestätige die Richtigkeit der Angaben und erlaube DIGIYLYFE, meinen CARNET-PRO-Antrag nach Zahlungsprüfung zu bearbeiten.',send:'MEINEN CARNET-PRO-ANTRAG SENDEN →',wait:'Zahlung und Aktivierung von CARNET PRO werden manuell geprüft.',done:'CARNET-PRO-Antrag erhalten. Zahlung ZU BESTÄTIGEN · Aktivierung ZU PRÜFEN.',badProof:'Ungültiger Zahlungsnachweis.',badEmail:'Ungültige E-Mail-Adresse.',sending:'CARNET-PRO-Antrag wird sicher gesendet…'},
    nl:{title:'Mijn CARNET PRO-dossier voorbereiden',lead:'Vul alleen de gegevens in die nodig zijn voor uw CARNET PRO-toegang.',email:'E-mail *',country:'Land',consent:'Ik bevestig dat deze gegevens juist zijn en geef DIGIYLYFE toestemming mijn CARNET PRO-aanvraag na betalingscontrole te verwerken.',send:'MIJN CARNET PRO-DOSSIER VERZENDEN →',wait:'Betaling en activering van CARNET PRO worden handmatig gecontroleerd.',done:'CARNET PRO-dossier ontvangen. Betaling TE BEVESTIGEN · activering TE VALIDEREN.',badProof:'Ongeldig betalingsbewijs.',badEmail:'Ongeldig e-mailadres.',sending:'CARNET PRO-dossier veilig verzenden…'},
    ar:{title:'إعداد ملف CARNET PRO',lead:'أدخل فقط المعلومات اللازمة للوصول إلى CARNET PRO.',email:'البريد الإلكتروني *',country:'البلد',consent:'أؤكد صحة هذه المعلومات وأسمح لـ DIGIYLYFE بمعالجة طلب CARNET PRO بعد التحقق من الدفع.',send:'إرسال ملف CARNET PRO ←',wait:'يتم التحقق من الدفع وتفعيل CARNET PRO يدويًا.',done:'تم استلام ملف CARNET PRO. الدفع قيد التأكيد · التفعيل قيد المراجعة.',badProof:'إثبات الدفع غير صالح.',badEmail:'عنوان البريد الإلكتروني غير صالح.',sending:'جارٍ إرسال ملف CARNET PRO بأمان…'}
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
    var c=country(),p=carnetPrice(),copy=t();
    document.documentElement.lang=lang;
    document.documentElement.dir=lang==='ar'?'rtl':'ltr';
    document.title='DIGIYLYFE — CARNET PRO';
    installMinimalForm();
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
      var st=$('#status'),btn=$('#submit'),proof=$('#proof')&&$('#proof').files[0];
      if(!c||!p){st.className='status bad';st.textContent='Configuration pays indisponible.';return;}
      if(!validEmail(email)){st.className='status bad';st.textContent=t().badEmail;return;}
      if(!proof||proof.size>10*1024*1024||['image/jpeg','image/png','image/webp','application/pdf'].indexOf(proof.type)===-1){st.className='status bad';st.textContent=t().badProof;return;}
      btn.disabled=true;st.className='status';st.textContent=t().sending;
      var id=crypto.randomUUID(),rp='pending/'+id+'.'+ext(proof),inserted=false;
      try{
        var up=await sb.storage.from('digiy-adhesion-payment-proofs').upload(rp,proof,{contentType:proof.type,upsert:false});if(up.error)throw up.error;
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
          payment_proof_path:rp,
          payment_proof_mime:proof.type,
          consent:$('#consent').checked,
          status:'a_valider',
          payment_status:'a_confirmer',
          card_status:'non_requis',
          source:'post-payment-carnet-country-runtime',
          source_lang:lang
        };
        var ins=await sb.from('digiy_adhesion_requests').insert(base);if(ins.error)throw ins.error;inserted=true;
        st.className='status ok';st.textContent=t().done;btn.style.display='none';
        $$('input,textarea,select,.choice').forEach(function(x){x.disabled=true;});
      }catch(err){
        if(!inserted){try{await sb.storage.from('digiy-adhesion-payment-proofs').remove([rp]);}catch(e2){}}
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
