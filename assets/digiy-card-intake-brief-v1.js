/* DIGIYLYFE · Carte gratuite · brief facultatif de préparation · 2026-09-13 */
(function(){
  'use strict';
  if(window.DIGIY_CARD_INTAKE_BRIEF_V1)return;
  window.DIGIY_CARD_INTAKE_BRIEF_V1=true;

  var form=document.getElementById('networkCardForm');
  var consent=document.getElementById('consent');
  if(!form||!consent)return;

  var ENDPOINT='https://wesqmwjjtsefyjnluosj.supabase.co/functions/v1/digiy-network-card-request-submit';
  var MAX_LOGO=5*1024*1024;
  var LOGO_TYPES=['image/png','image/jpeg','image/webp','image/svg+xml','application/pdf'];

  var I18N={
    fr:{title:'PRÉCISER MON ACTIVITÉ ET MON PROJET',hint:'Facultatif · pour nous donner tout ce qu’il faut sans multiplier les messages WhatsApp.',info:'Votre activité peut être principale ou exercée à côté d’un autre emploi. Indiquez simplement vos vrais créneaux : DIGIYLYFE est ouvert aux activités principales comme complémentaires.',module:'Projet / module envisagé',moduleHelp:'Ce choix prépare votre dossier. Il ne déclenche aucun paiement.',hours:'Horaires d’activité / disponibilités',hoursPh:'Ex. lun–ven 18h–22h · samedi toute la journée · sur rendez-vous',site:'Lien de votre site web, si vous en avez un',sitePh:'https://monsite.com',social:'Réseaux et autres liens',socialPh:'Google Business, Facebook, Instagram, TikTok…',summary:'Présentez votre activité en quelques mots',summaryPh:'Ce que vous faites, pour qui, vos spécialités et votre zone d’intervention…',details:'Informations utiles pour préparer votre module',detailsBase:'Tout renseignement qui nous évitera de vous le redemander ensuite.',logo:'Votre logo, si vous en possédez un',logoHelp:'Facultatif · PNG, JPG, WEBP, SVG ou PDF · 5 Mo maximum. Le fichier reste privé dans votre dossier et n’est pas publié automatiquement.',saving:'Enregistrement du dossier…',saved:'Demande enregistrée. Nous avons bien votre dossier.',error:'Impossible d’enregistrer pour le moment. Vérifiez votre connexion et réessayez.',logoError:'Logo trop lourd ou format non accepté. PNG, JPG, WEBP, SVG ou PDF · 5 Mo maximum.',modules:['— Carte gratuite, sans autre choix pour le moment —','Carte gratuite seulement','DIGIY PRO · fiche professionnelle','DIGIY LOC','DIGIY DRIVER','DIGIY RESA','MON RESTO','MON COMMERCE','PRO CARNET','Autre / à définir'],detailMap:{'LOC':'Nombre d’unités, type d’hébergement, services proposés…','DRIVER':'Type de véhicule, capacité, zones et horaires de disponibilité…','RESA':'Type de réservation, capacité, services, créneaux…','MON RESTO':'Type de cuisine, nombre de places, horaires, livraison / emporter…','MON COMMERCE':'Produits, catégories, livraison, zone desservie…','CARNET':'Type d’activité, organisation clients, besoins de suivi…','DIGIY PRO':'Services principaux, clientèle visée, particularités de votre activité…'}},
    en:{title:'TELL US MORE ABOUT YOUR ACTIVITY AND PROJECT',hint:'Optional · give us what we need without long WhatsApp exchanges.',info:'Your activity may be full-time or alongside another job. Simply tell us when you are really available: DIGIYLYFE welcomes both main and side activities.',module:'Project / module you are considering',moduleHelp:'This only prepares your file. It does not trigger any payment.',hours:'Business hours / availability',hoursPh:'e.g. Mon–Fri 6pm–10pm · all day Saturday · by appointment',site:'Your website link, if you have one',sitePh:'https://mywebsite.com',social:'Social media and other links',socialPh:'Google Business, Facebook, Instagram, TikTok…',summary:'Describe your activity briefly',summaryPh:'What you do, for whom, specialties and service area…',details:'Useful details for your module',detailsBase:'Anything that saves us from asking you again later.',logo:'Your logo, if you have one',logoHelp:'Optional · PNG, JPG, WEBP, SVG or PDF · max 5 MB. The file stays private in your request and is not published automatically.',saving:'Saving your file…',saved:'Request saved. We have received your file.',error:'Unable to save right now. Check your connection and try again.',logoError:'Logo is too large or its format is not accepted. PNG, JPG, WEBP, SVG or PDF · max 5 MB.',modules:['— Free card, no other choice for now —','Free card only','DIGIY PRO · professional profile','DIGIY LOC','DIGIY DRIVER','DIGIY RESA','MON RESTO','MON COMMERCE','PRO CARNET','Other / to be defined']},
    es:{title:'PRECISAR MI ACTIVIDAD Y MI PROYECTO',hint:'Opcional · para evitar largos intercambios por WhatsApp.',info:'La actividad puede ser principal o complementaria a otro empleo. Indique simplemente sus horarios reales de disponibilidad.',module:'Proyecto / módulo previsto',moduleHelp:'Solo sirve para preparar el dossier. No inicia ningún pago.',hours:'Horarios / disponibilidad',hoursPh:'Ej. lun–vie 18h–22h · sábado todo el día · con cita',site:'Enlace de su sitio web, si tiene uno',sitePh:'https://misitio.com',social:'Redes y otros enlaces',socialPh:'Google Business, Facebook, Instagram, TikTok…',summary:'Presente brevemente su actividad',summaryPh:'Qué hace, para quién, especialidades y zona…',details:'Datos útiles para preparar el módulo',detailsBase:'Todo lo que evite tener que preguntárselo después.',logo:'Su logotipo, si dispone de uno',logoHelp:'Opcional · PNG, JPG, WEBP, SVG o PDF · máximo 5 MB. El archivo queda privado en su dossier.',saving:'Guardando el dossier…',saved:'Solicitud registrada. Hemos recibido su dossier.',error:'No se puede guardar ahora. Compruebe su conexión e inténtelo de nuevo.',logoError:'Logo demasiado grande o formato no aceptado. PNG, JPG, WEBP, SVG o PDF · máximo 5 MB.',modules:['— Tarjeta gratuita, sin otra elección por ahora —','Solo tarjeta gratuita','DIGIY PRO · ficha profesional','DIGIY LOC','DIGIY DRIVER','DIGIY RESA','MON RESTO','MON COMMERCE','PRO CARNET','Otro / por definir']},
    pt:{title:'DETALHAR A MINHA ATIVIDADE E PROJETO',hint:'Opcional · para evitar longas trocas no WhatsApp.',info:'A atividade pode ser principal ou complementar a outro emprego. Indique apenas os horários em que está realmente disponível.',module:'Projeto / módulo pretendido',moduleHelp:'Serve apenas para preparar o processo. Não inicia nenhum pagamento.',hours:'Horários / disponibilidade',hoursPh:'Ex. seg–sex 18h–22h · sábado todo o dia · por marcação',site:'Ligação do seu site, se tiver',sitePh:'https://meusite.com',social:'Redes sociais e outras ligações',socialPh:'Google Business, Facebook, Instagram, TikTok…',summary:'Apresente brevemente a atividade',summaryPh:'O que faz, para quem, especialidades e zona…',details:'Informações úteis para o módulo',detailsBase:'Tudo o que evite termos de perguntar novamente.',logo:'O seu logótipo, se tiver',logoHelp:'Opcional · PNG, JPG, WEBP, SVG ou PDF · máximo 5 MB. O ficheiro fica privado no seu processo.',saving:'A guardar o processo…',saved:'Pedido registado. Recebemos o seu processo.',error:'Não foi possível guardar agora. Verifique a ligação e tente novamente.',logoError:'Logótipo demasiado grande ou formato não aceite. PNG, JPG, WEBP, SVG ou PDF · máximo 5 MB.',modules:['— Cartão gratuito, sem outra escolha por agora —','Apenas cartão gratuito','DIGIY PRO · ficha profissional','DIGIY LOC','DIGIY DRIVER','DIGIY RESA','MON RESTO','MON COMMERCE','PRO CARNET','Outro / a definir']},
    it:{title:'PRECISARE ATTIVITÀ E PROGETTO',hint:'Facoltativo · per evitare lunghi scambi su WhatsApp.',info:'L’attività può essere principale o svolta accanto a un altro lavoro. Indicate semplicemente quando siete realmente disponibili.',module:'Progetto / modulo previsto',moduleHelp:'Serve solo a preparare il dossier. Non avvia alcun pagamento.',hours:'Orari / disponibilità',hoursPh:'Es. lun–ven 18–22 · sabato tutto il giorno · su appuntamento',site:'Link del vostro sito, se disponibile',sitePh:'https://miosito.com',social:'Social e altri link',socialPh:'Google Business, Facebook, Instagram, TikTok…',summary:'Presentate brevemente l’attività',summaryPh:'Cosa fate, per chi, specialità e zona…',details:'Informazioni utili per il modulo',detailsBase:'Tutto ciò che evita di dovervelo richiedere dopo.',logo:'Il vostro logo, se disponibile',logoHelp:'Facoltativo · PNG, JPG, WEBP, SVG o PDF · max 5 MB. Il file resta privato nel dossier.',saving:'Registrazione del dossier…',saved:'Richiesta registrata. Abbiamo ricevuto il dossier.',error:'Impossibile salvare ora. Controllate la connessione e riprovate.',logoError:'Logo troppo grande o formato non accettato. PNG, JPG, WEBP, SVG o PDF · max 5 MB.',modules:['— Carta gratuita, nessun’altra scelta per ora —','Solo carta gratuita','DIGIY PRO · scheda professionale','DIGIY LOC','DIGIY DRIVER','DIGIY RESA','MON RESTO','MON COMMERCE','PRO CARNET','Altro / da definire']},
    de:{title:'TÄTIGKEIT UND PROJEKT PRÄZISIEREN',hint:'Optional · damit lange WhatsApp-Nachfragen entfallen.',info:'Die Tätigkeit kann hauptberuflich oder neben einem anderen Job ausgeübt werden. Geben Sie einfach Ihre tatsächlichen verfügbaren Zeiten an.',module:'Geplantes Projekt / Modul',moduleHelp:'Diese Auswahl dient nur zur Vorbereitung. Sie löst keine Zahlung aus.',hours:'Öffnungszeiten / Verfügbarkeit',hoursPh:'z. B. Mo–Fr 18–22 Uhr · Samstag ganztägig · nach Termin',site:'Link zu Ihrer Website, falls vorhanden',sitePh:'https://meinewebsite.de',social:'Social Media und weitere Links',socialPh:'Google Business, Facebook, Instagram, TikTok…',summary:'Tätigkeit kurz beschreiben',summaryPh:'Was Sie tun, für wen, Spezialitäten und Gebiet…',details:'Nützliche Angaben für das Modul',detailsBase:'Alles, was spätere Rückfragen vermeidet.',logo:'Ihr Logo, falls vorhanden',logoHelp:'Optional · PNG, JPG, WEBP, SVG oder PDF · max. 5 MB. Die Datei bleibt privat im Dossier.',saving:'Dossier wird gespeichert…',saved:'Anfrage gespeichert. Ihr Dossier ist eingegangen.',error:'Speichern derzeit nicht möglich. Verbindung prüfen und erneut versuchen.',logoError:'Logo zu groß oder Format nicht akzeptiert. PNG, JPG, WEBP, SVG oder PDF · max. 5 MB.',modules:['— Kostenlose Karte, vorerst keine weitere Auswahl —','Nur kostenlose Karte','DIGIY PRO · Profi-Profil','DIGIY LOC','DIGIY DRIVER','DIGIY RESA','MON RESTO','MON COMMERCE','PRO CARNET','Andere / noch offen']},
    nl:{title:'MIJN ACTIVITEIT EN PROJECT VERDUIDELIJKEN',hint:'Optioneel · om lange WhatsApp-uitwisselingen te vermijden.',info:'De activiteit kan hoofdberoep zijn of naast een andere baan bestaan. Geef gewoon aan wanneer u werkelijk beschikbaar bent.',module:'Gewenst project / module',moduleHelp:'Deze keuze helpt alleen bij de voorbereiding en start geen betaling.',hours:'Openingstijden / beschikbaarheid',hoursPh:'Bijv. ma–vr 18–22 u · zaterdag hele dag · op afspraak',site:'Link naar uw website, indien aanwezig',sitePh:'https://mijnsite.nl',social:'Social media en andere links',socialPh:'Google Business, Facebook, Instagram, TikTok…',summary:'Beschrijf uw activiteit kort',summaryPh:'Wat u doet, voor wie, specialiteiten en gebied…',details:'Nuttige informatie voor de module',detailsBase:'Alles wat latere vragen overbodig maakt.',logo:'Uw logo, als u er een hebt',logoHelp:'Optioneel · PNG, JPG, WEBP, SVG of PDF · max. 5 MB. Het bestand blijft privé in uw dossier.',saving:'Dossier opslaan…',saved:'Aanvraag opgeslagen. Wij hebben uw dossier ontvangen.',error:'Opslaan lukt nu niet. Controleer uw verbinding en probeer opnieuw.',logoError:'Logo te groot of formaat niet geaccepteerd. PNG, JPG, WEBP, SVG of PDF · max. 5 MB.',modules:['— Gratis kaart, voorlopig geen andere keuze —','Alleen gratis kaart','DIGIY PRO · professioneel profiel','DIGIY LOC','DIGIY DRIVER','DIGIY RESA','MON RESTO','MON COMMERCE','PRO CARNET','Andere / nog te bepalen']},
    ar:{title:'تفاصيل النشاط والمشروع',hint:'اختياري · لتجنب كثرة الرسائل على واتساب.',info:'يمكن أن يكون النشاط عملاً رئيسياً أو نشاطاً إضافياً إلى جانب وظيفة أخرى. اذكر فقط الأوقات التي تكون فيها متاحاً فعلاً.',module:'المشروع / الوحدة المطلوبة',moduleHelp:'هذا الاختيار لإعداد الملف فقط ولا يبدأ أي دفع.',hours:'ساعات النشاط / التوفر',hoursPh:'مثال: الاثنين–الجمعة 18–22 · السبت طوال اليوم · حسب الموعد',site:'رابط موقعك إن وجد',sitePh:'https://mysite.com',social:'الشبكات والروابط الأخرى',socialPh:'Google Business, Facebook, Instagram, TikTok…',summary:'عرّف نشاطك باختصار',summaryPh:'ماذا تقدم، لمن، تخصصاتك ومنطقة عملك…',details:'معلومات مفيدة لإعداد الوحدة',detailsBase:'أي معلومة توفر علينا سؤالك عنها لاحقاً.',logo:'شعارك إن كان لديك',logoHelp:'اختياري · PNG أو JPG أو WEBP أو SVG أو PDF · بحد أقصى 5 ميغابايت. يبقى الملف خاصاً داخل طلبك.',saving:'جارٍ تسجيل الملف…',saved:'تم تسجيل الطلب واستلام ملفك.',error:'تعذر التسجيل الآن. تحقق من الاتصال وحاول مرة أخرى.',logoError:'الشعار كبير جداً أو الصيغة غير مقبولة. الحد الأقصى 5 ميغابايت.',modules:['— بطاقة مجانية دون اختيار آخر حالياً —','البطاقة المجانية فقط','DIGIY PRO · الملف المهني','DIGIY LOC','DIGIY DRIVER','DIGIY RESA','MON RESTO','MON COMMERCE','PRO CARNET','آخر / يحدد لاحقاً']}
  };

  var values=['','CARTE GRATUITE','DIGIY PRO','LOC','DRIVER','RESA','MON RESTO','MON COMMERCE','CARNET','AUTRE / À DÉFINIR'];
  function L(){var l=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();return I18N[l]?l:'fr'}
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}

  var style=document.createElement('style');
  style.textContent='.digiyBrief{margin-top:14px;border:1px solid #2dd4bf55;border-radius:20px;background:linear-gradient(145deg,#2dd4bf0d,#ffffff05);overflow:hidden}.digiyBrief summary{cursor:pointer;list-style:none;padding:15px 16px;display:flex;align-items:flex-start;justify-content:space-between;gap:12px;font-weight:1000;color:#fff3cf}.digiyBrief summary::-webkit-details-marker{display:none}.digiyBrief summary:after{content:"＋";font-size:18px;color:#bffdf4}.digiyBrief[open] summary:after{content:"−"}.digiyBrief summary small{display:block;margin-top:4px;color:#c7d7d0;font-size:10.5px;line-height:1.4;font-weight:800}.digiyBriefBody{padding:0 15px 15px;border-top:1px solid #ffffff14}.digiyBriefInfo{margin:12px 0 0;padding:10px 11px;border-radius:14px;border:1px solid #f6c45344;background:#f6c4530a;color:#e7eee9;font-size:10.5px;line-height:1.5;font-weight:850}.digiyBrief .fields{margin-top:14px}.digiyBrief .field textarea{width:100%;min-height:84px;padding:11px 12px;border-radius:14px;border:1px solid #ffffff22;background:#06140f;color:#fff;font:inherit;font-size:14px;line-height:1.4;resize:vertical;outline:none}.digiyBrief .field textarea:focus{border-color:#f6c453aa}.digiyBrief .field small{color:#aebfc8;font-size:10px;line-height:1.45;font-weight:800}.digiyBrief input[type=file]{padding:9px;font-size:12px}.digiyBrief input[type=file]::file-selector-button{margin-right:10px;border:0;border-radius:999px;padding:9px 11px;background:#f6c453;color:#06140f;font-weight:1000;cursor:pointer}';
  document.head.appendChild(style);

  var details=document.createElement('details');details.className='digiyBrief';details.id='digiyCardBrief';
  details.innerHTML='<summary><span><b id="digiyBriefTitle"></b><small id="digiyBriefHint"></small></span></summary><div class="digiyBriefBody"><p class="digiyBriefInfo" id="digiyBriefInfo"></p><div class="fields">'+
    '<label class="field full"><span id="digiyModuleLabel"></span><select id="digiyRequestedModule"></select><small id="digiyModuleHelp"></small></label>'+
    '<label class="field full"><span id="digiyHoursLabel"></span><input id="digiyActivityHours" maxlength="240"><small id="digiyHoursHelp"></small></label>'+
    '<label class="field full"><span id="digiySiteLabel"></span><input id="digiyWebsiteUrl" maxlength="500" inputmode="url"><small></small></label>'+
    '<label class="field full"><span id="digiySocialLabel"></span><textarea id="digiySocialLinks" maxlength="900"></textarea></label>'+
    '<label class="field full"><span id="digiySummaryLabel"></span><textarea id="digiyActivitySummary" maxlength="900"></textarea></label>'+
    '<label class="field full"><span id="digiyDetailsLabel"></span><textarea id="digiyModuleDetails" maxlength="1200"></textarea><small id="digiyDetailsHelp"></small></label>'+
    '<label class="field full"><span id="digiyLogoLabel"></span><input id="digiyLogo" type="file" accept=".png,.jpg,.jpeg,.webp,.svg,.pdf,image/png,image/jpeg,image/webp,image/svg+xml,application/pdf"><small id="digiyLogoHelp"></small></label>'+
    '</div></div>';
  consent.parentNode.insertBefore(details,consent);

  var module=document.getElementById('digiyRequestedModule');
  var moduleField=module&&module.closest('.field');
  if(moduleField){moduleField.classList.add('digiyModuleQuick');moduleField.style.marginTop='14px';moduleField.style.padding='14px';moduleField.style.border='1px solid #f6c45366';moduleField.style.borderRadius='18px';moduleField.style.background='linear-gradient(145deg,#f6c45310,#2dd4bf0b)';details.parentNode.insertBefore(moduleField,details);}
  function refresh(){
    var d=I18N[L()]||I18N.fr;
    document.getElementById('digiyBriefTitle').textContent=d.title;
    document.getElementById('digiyBriefHint').textContent=d.hint;
    document.getElementById('digiyBriefInfo').textContent=d.info;
    document.getElementById('digiyModuleLabel').textContent=d.module;
    document.getElementById('digiyModuleHelp').textContent=d.moduleHelp;
    document.getElementById('digiyHoursLabel').textContent=d.hours;
    document.getElementById('digiyActivityHours').placeholder=d.hoursPh;
    document.getElementById('digiyHoursHelp').textContent=d.info;
    document.getElementById('digiySiteLabel').textContent=d.site;
    document.getElementById('digiyWebsiteUrl').placeholder=d.sitePh;
    document.getElementById('digiySocialLabel').textContent=d.social;
    document.getElementById('digiySocialLinks').placeholder=d.socialPh;
    document.getElementById('digiySummaryLabel').textContent=d.summary;
    document.getElementById('digiyActivitySummary').placeholder=d.summaryPh;
    document.getElementById('digiyDetailsLabel').textContent=d.details;
    document.getElementById('digiyLogoLabel').textContent=d.logo;
    document.getElementById('digiyLogoHelp').textContent=d.logoHelp;
    var old=module.value;module.innerHTML='';values.forEach(function(v,i){var o=document.createElement('option');o.value=v;o.textContent=(d.modules&&d.modules[i])||I18N.fr.modules[i];module.appendChild(o)});module.value=old;
    detailHint();
  }
  function detailHint(){var d=I18N[L()]||I18N.fr,m=module.value,h=(d.detailMap&&d.detailMap[m])||(I18N.fr.detailMap&&I18N.fr.detailMap[m])||d.detailsBase;document.getElementById('digiyDetailsHelp').textContent=h;document.getElementById('digiyModuleDetails').placeholder=h}
  module.addEventListener('change',detailHint);
  document.querySelectorAll('[data-l]').forEach(function(b){b.addEventListener('click',function(){setTimeout(refresh,0)})});
  refresh();

  form.addEventListener('submit',async function(ev){
    ev.preventDefault();ev.stopImmediatePropagation();
    if(!form.reportValidity())return;
    var d=I18N[L()]||I18N.fr;
    var btn=document.getElementById('submit'),status=document.getElementById('status'),after=document.getElementById('after'),wa=document.getElementById('wa');
    var logo=document.getElementById('digiyLogo').files[0]||null;
    if(logo&&(logo.size>MAX_LOGO||LOGO_TYPES.indexOf(logo.type)<0)){status.classList.add('bad');status.textContent=d.logoError;details.open=true;return}
    btn.disabled=true;status.classList.remove('bad');status.textContent=d.saving;after.classList.remove('show');
    try{
      var fd=new FormData();
      fd.append('country',document.getElementById('country').value);
      fd.append('pro_name',document.getElementById('proName').value);
      fd.append('responsible_name',document.getElementById('responsible').value);
      fd.append('job_label',document.getElementById('job').value);
      fd.append('zone_label',document.getElementById('zone').value);
      fd.append('phone_whatsapp',document.getElementById('phone').value);
      fd.append('email',document.getElementById('email').value);
      fd.append('source_lang',L());
      fd.append('consent',document.getElementById('consent').checked?'true':'false');
      fd.append('website',document.getElementById('website').value||'');
      fd.append('requested_module',module.value||'');
      fd.append('activity_hours',document.getElementById('digiyActivityHours').value||'');
      fd.append('website_url',document.getElementById('digiyWebsiteUrl').value||'');
      fd.append('social_links',document.getElementById('digiySocialLinks').value||'');
      fd.append('activity_summary',document.getElementById('digiyActivitySummary').value||'');
      fd.append('module_details',document.getElementById('digiyModuleDetails').value||'');
      if(logo)fd.append('logo',logo,logo.name);
      var r=await fetch(ENDPOINT,{method:'POST',body:fd,cache:'no-store'}),j=await r.json();
      if(!r.ok||!j.ok)throw new Error(j.message||'error');
      status.textContent=d.saved;
      if(j.wa_url){wa.href=j.wa_url;after.classList.add('show')}
      var keepCountry=document.getElementById('country').value;form.reset();document.getElementById('country').value=keepCountry;module.value='';details.open=false;refresh();
    }catch(e){status.classList.add('bad');status.textContent=d.error}
    finally{btn.disabled=false}
  },true);
})();