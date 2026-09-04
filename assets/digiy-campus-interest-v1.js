/* DIGIYLYFE — DIGIY CAMPUS · intérêt centralisé + WhatsApp 0 API
 * Flux : formulaire public -> Supabase -> ouverture WhatsApp préremplie.
 * Aucune lecture publique de la liste. Aucun secret côté navigateur.
 */
(function(){
  'use strict';
  if(window.DIGIY_CAMPUS_INTEREST_V1)return;
  window.DIGIY_CAMPUS_INTEREST_V1=true;

  var SUPABASE_URL='https://wesqmwjjtsefyjnluosj.supabase.co';
  var SUPABASE_KEY='sb_publishable_2KVRayr3oWcewu0Y7xMkOQ_D6522h1E';
  var CAMPUS_WHATSAPP='33638329423';
  var LANGS=['fr','en','es','pt','it','de','nl','ar'];

  var COPY={
    fr:{first:'Prénom *',age:'Âge *',city:'Ville *',profile:'Statut *',phone:'Téléphone / WhatsApp *',choose:'Choisir…',student:'Étudiant(e)',young:'Jeune actif / active',other:'Autre',consent:'J’accepte que DIGIYLYFE conserve ces informations afin de me recontacter au lancement de DIGIY CAMPUS.',note:'18 ans minimum · vos informations sont enregistrées avant l’ouverture de WhatsApp.',send:'JE SUIS INTÉRESSÉ(E) →',saving:'Enregistrement de votre intérêt…',saved:'Intérêt enregistré. Ouverture de WhatsApp…',error:'Impossible d’enregistrer pour le moment. Vérifiez votre connexion et réessayez.'},
    en:{first:'First name *',age:'Age *',city:'City *',profile:'Status *',phone:'Phone / WhatsApp *',choose:'Choose…',student:'Student',young:'Young professional',other:'Other',consent:'I agree that DIGIYLYFE may keep this information to contact me when DIGIY CAMPUS launches.',note:'18+ only · your information is saved before WhatsApp opens.',send:'I’M INTERESTED →',saving:'Saving your interest…',saved:'Interest saved. Opening WhatsApp…',error:'Unable to save right now. Check your connection and try again.'},
    es:{first:'Nombre *',age:'Edad *',city:'Ciudad *',profile:'Situación *',phone:'Teléfono / WhatsApp *',choose:'Elegir…',student:'Estudiante',young:'Joven profesional',other:'Otro',consent:'Acepto que DIGIYLYFE conserve estos datos para contactarme cuando se lance DIGIY CAMPUS.',note:'18 años mínimo · sus datos se guardan antes de abrir WhatsApp.',send:'ME INTERESA →',saving:'Guardando su interés…',saved:'Interés guardado. Abriendo WhatsApp…',error:'No se puede guardar ahora. Compruebe su conexión e inténtelo de nuevo.'},
    pt:{first:'Primeiro nome *',age:'Idade *',city:'Cidade *',profile:'Situação *',phone:'Telefone / WhatsApp *',choose:'Escolher…',student:'Estudante',young:'Jovem profissional',other:'Outro',consent:'Aceito que a DIGIYLYFE conserve estes dados para me contactar quando o DIGIY CAMPUS for lançado.',note:'Mínimo 18 anos · os dados são guardados antes de abrir o WhatsApp.',send:'TENHO INTERESSE →',saving:'A guardar o seu interesse…',saved:'Interesse guardado. A abrir o WhatsApp…',error:'Não foi possível guardar agora. Verifique a ligação e tente novamente.'},
    it:{first:'Nome *',age:'Età *',city:'Città *',profile:'Stato *',phone:'Telefono / WhatsApp *',choose:'Scegli…',student:'Studente/ssa',young:'Giovane professionista',other:'Altro',consent:'Accetto che DIGIYLYFE conservi questi dati per ricontattarmi al lancio di DIGIY CAMPUS.',note:'Età minima 18 anni · i dati vengono salvati prima di aprire WhatsApp.',send:'SONO INTERESSATO/A →',saving:'Registrazione dell’interesse…',saved:'Interesse registrato. Apertura di WhatsApp…',error:'Impossibile registrare ora. Controlla la connessione e riprova.'},
    de:{first:'Vorname *',age:'Alter *',city:'Stadt *',profile:'Status *',phone:'Telefon / WhatsApp *',choose:'Auswählen…',student:'Student/in',young:'Junge/r Berufstätige/r',other:'Andere',consent:'Ich stimme zu, dass DIGIYLYFE diese Angaben speichert, um mich zum Start von DIGIY CAMPUS zu kontaktieren.',note:'Mindestalter 18 · Ihre Angaben werden vor dem Öffnen von WhatsApp gespeichert.',send:'ICH BIN INTERESSIERT →',saving:'Interesse wird gespeichert…',saved:'Interesse gespeichert. WhatsApp wird geöffnet…',error:'Speichern derzeit nicht möglich. Verbindung prüfen und erneut versuchen.'},
    nl:{first:'Voornaam *',age:'Leeftijd *',city:'Stad *',profile:'Status *',phone:'Telefoon / WhatsApp *',choose:'Kiezen…',student:'Student',young:'Jonge professional',other:'Andere',consent:'Ik ga ermee akkoord dat DIGIYLYFE deze gegevens bewaart om mij bij de lancering van DIGIY CAMPUS te contacteren.',note:'Minimaal 18 jaar · uw gegevens worden opgeslagen vóór WhatsApp opent.',send:'IK BEN GEÏNTERESSEERD →',saving:'Interesse wordt opgeslagen…',saved:'Interesse opgeslagen. WhatsApp wordt geopend…',error:'Opslaan lukt nu niet. Controleer uw verbinding en probeer opnieuw.'},
    ar:{first:'الاسم الأول *',age:'العمر *',city:'المدينة *',profile:'الصفة *',phone:'الهاتف / واتساب *',choose:'اختر…',student:'طالب/ة',young:'شاب/ة عامل/ة',other:'أخرى',consent:'أوافق على احتفاظ DIGIYLYFE بهذه المعلومات للتواصل معي عند إطلاق DIGIY CAMPUS.',note:'الحد الأدنى 18 سنة · يتم حفظ بياناتك قبل فتح واتساب.',send:'أنا مهتم/ة ←',saving:'جارٍ تسجيل اهتمامك…',saved:'تم تسجيل الاهتمام. جارٍ فتح واتساب…',error:'تعذر التسجيل الآن. تحقق من الاتصال وحاول من جديد.'}
  };

  function lang(){
    var l=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();
    return LANGS.indexOf(l)>=0?l:'fr';
  }

  function safe(v,max){return String(v||'').trim().replace(/\s+/g,' ').slice(0,max||200)}
  function profileFr(v){return v==='etudiant'?'Étudiant(e)':v==='jeune_actif'?'Jeune actif / active':'Autre'}

  function addStyle(){
    if(document.getElementById('digiyCampusInterestStyle'))return;
    var s=document.createElement('style');
    s.id='digiyCampusInterestStyle';
    s.textContent='\
      .campusInterestForm{margin-top:14px;padding:14px;border-radius:18px;border:1px solid rgba(246,196,83,.28);background:rgba(0,0,0,.14)}\
      .campusFields{display:grid;grid-template-columns:1fr 1fr;gap:9px}\
      .campusField{display:grid;gap:6px;color:#ffe9a8;font-size:10.5px;font-weight:1000}\
      .campusField.full{grid-column:1/-1}\
      .campusField input,.campusField select{width:100%;min-height:46px;padding:10px 11px;border-radius:13px;border:1px solid rgba(255,255,255,.17);background:#06140f;color:#fff;font:inherit;font-size:13px;outline:none}\
      .campusField input:focus,.campusField select:focus{border-color:rgba(246,196,83,.75);box-shadow:0 0 0 3px rgba(246,196,83,.10)}\
      .campusConsent{display:flex;align-items:flex-start;gap:9px;margin-top:10px;padding:10px;border-radius:14px;border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.035);color:#dce8e3;font-size:10.5px;line-height:1.45;font-weight:800}\
      .campusConsent input{width:19px;height:19px;flex:0 0 auto;margin:1px 0 0}\
      .campusFormNote{margin:9px 0 0;color:#aebfc8;font-size:9.8px;line-height:1.4;text-align:center}\
      .campusInterestForm .campusCta{width:100%;border:0;cursor:pointer}\
      .campusInterestForm .campusCta:disabled{opacity:.62;cursor:wait}\
      .campusFormStatus{min-height:18px;margin-top:8px;color:#bfe9df;font-size:10px;line-height:1.4;text-align:center;font-weight:900}\
      .campusFormStatus.bad{color:#fecaca}\
      .campusHoneypot{position:absolute!important;left:-9999px!important;width:1px!important;height:1px!important;overflow:hidden!important;opacity:0!important}\
      @media(max-width:560px){.campusFields{grid-template-columns:1fr}.campusField.full{grid-column:auto}}';
    document.head.appendChild(s);
  }

  function renderCopy(form){
    var t=COPY[lang()]||COPY.fr;
    form.querySelectorAll('[data-campus-copy]').forEach(function(el){var k=el.getAttribute('data-campus-copy');if(t[k])el.textContent=t[k]});
  }

  function install(){
    var section=document.getElementById('digiyCampus');
    if(!section||section.getAttribute('data-campus-interest-installed')==='1')return;
    var old=section.querySelector('.campusCta');
    if(!old)return;
    section.setAttribute('data-campus-interest-installed','1');
    addStyle();

    var form=document.createElement('form');
    form.className='campusInterestForm';
    form.id='campusInterestForm';
    form.noValidate=false;
    form.innerHTML='\
      <div class="campusHoneypot" aria-hidden="true"><label>Website<input id="campusWebsite" tabindex="-1" autocomplete="off"></label></div>\
      <div class="campusFields">\
        <label class="campusField"><span data-campus-copy="first">Prénom *</span><input id="campusFirst" name="first_name" maxlength="80" autocomplete="given-name" required></label>\
        <label class="campusField"><span data-campus-copy="age">Âge *</span><input id="campusAge" name="age" type="number" min="18" max="100" inputmode="numeric" required></label>\
        <label class="campusField"><span data-campus-copy="city">Ville *</span><input id="campusCity" name="city" maxlength="120" autocomplete="address-level2" required></label>\
        <label class="campusField"><span data-campus-copy="profile">Statut *</span><select id="campusProfile" name="profile_status" required><option value="" data-campus-copy="choose">Choisir…</option><option value="etudiant" data-campus-copy="student">Étudiant(e)</option><option value="jeune_actif" data-campus-copy="young">Jeune actif / active</option><option value="autre" data-campus-copy="other">Autre</option></select></label>\
        <label class="campusField full"><span data-campus-copy="phone">Téléphone / WhatsApp *</span><input id="campusPhone" name="phone_whatsapp" type="tel" maxlength="24" minlength="8" autocomplete="tel" placeholder="+221 77 123 45 67" required></label>\
      </div>\
      <label class="campusConsent"><input id="campusConsent" type="checkbox" required><span data-campus-copy="consent">J’accepte que DIGIYLYFE conserve ces informations afin de me recontacter au lancement de DIGIY CAMPUS.</span></label>\
      <p class="campusFormNote" data-campus-copy="note">18 ans minimum · vos informations sont enregistrées avant l’ouverture de WhatsApp.</p>\
      <button class="campusCta" id="campusSubmit" type="submit" data-campus-copy="send">JE SUIS INTÉRESSÉ(E) →</button>\
      <div class="campusFormStatus" id="campusFormStatus" aria-live="polite"></div>';
    old.replaceWith(form);
    renderCopy(form);

    new MutationObserver(function(){renderCopy(form)}).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});

    form.addEventListener('submit',function(ev){
      ev.preventDefault();
      if(!form.reportValidity())return;
      if(safe(form.querySelector('#campusWebsite').value,100))return;

      var t=COPY[lang()]||COPY.fr;
      var first=safe(form.querySelector('#campusFirst').value,80);
      var age=parseInt(form.querySelector('#campusAge').value,10);
      var city=safe(form.querySelector('#campusCity').value,120);
      var profile=form.querySelector('#campusProfile').value;
      var phone=safe(form.querySelector('#campusPhone').value,24);
      var consent=form.querySelector('#campusConsent').checked;
      var button=form.querySelector('#campusSubmit');
      var status=form.querySelector('#campusFormStatus');

      if(!first||!city||!phone||!consent||!isFinite(age)||age<18||age>100||['etudiant','jeune_actif','autre'].indexOf(profile)<0)return;

      button.disabled=true;
      status.classList.remove('bad');
      status.textContent=t.saving;

      var payload={
        first_name:first,
        age:age,
        city:city,
        profile_status:profile,
        phone_whatsapp:phone,
        source_lang:lang(),
        source:'digiy-campus',
        consent:true,
        pipeline_status:'nouveau'
      };

      fetch(SUPABASE_URL+'/rest/v1/digiy_campus_interests',{
        method:'POST',
        headers:{'apikey':SUPABASE_KEY,'Authorization':'Bearer '+SUPABASE_KEY,'Content-Type':'application/json','Prefer':'return=minimal'},
        body:JSON.stringify(payload),
        cache:'no-store'
      }).then(function(r){
        if(!r.ok)throw new Error('campus insert '+r.status);
        status.textContent=t.saved;
        var message='🎓 DIGIY CAMPUS — NOUVEL INTÉRÊT\n\n'
          +'Prénom : '+first+'\n'
          +'Âge : '+age+' ans\n'
          +'Ville : '+city+'\n'
          +'Statut : '+profileFr(profile)+'\n'
          +'WhatsApp : '+phone+'\n'
          +'Langue : '+lang().toUpperCase()+'\n\n'
          +'✅ Enregistré dans la liste DIGIY CAMPUS.';
        var wa='https://wa.me/'+CAMPUS_WHATSAPP+'?text='+encodeURIComponent(message);
        setTimeout(function(){window.location.href=wa},280);
      }).catch(function(error){
        try{console.warn('DIGIY CAMPUS',error)}catch(ignore){}
        button.disabled=false;
        status.classList.add('bad');
        status.textContent=t.error;
      });
    });
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
  setTimeout(install,350);
})();