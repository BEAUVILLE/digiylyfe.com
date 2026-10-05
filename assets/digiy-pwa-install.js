/* DIGIYLYFE — PWA install controller
   Stable asset: keep install wiring out of index.html to prevent regressions.
*/
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function(){
    navigator.serviceWorker.register('/sw.js?v=20261003-home-no-pioneer-v1').catch(function(){});
  });
}

(function(){
  'use strict';
  var band=document.getElementById('digiyInstallBand');
  var btn=document.getElementById('digiyInstallBtn');
  var label=document.getElementById('digiyInstallLabel');
  var note=document.getElementById('digiyInstallNote');
  if(!band||!btn||!label||!note)return;

  var promptEvent=null;
  var installed=(window.matchMedia&&window.matchMedia('(display-mode: standalone)').matches)||window.navigator.standalone===true;
  var ua=navigator.userAgent||'';
  var isIOS=/iPad|iPhone|iPod/i.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
  var isMobile=/Android|iPhone|iPad|iPod|Mobile/i.test(ua)||(navigator.maxTouchPoints>1&&/MacIntel/i.test(navigator.platform||''));

  var COPY={
    fr:['Installer DIGIYLYFE sur ce téléphone','Touchez la bande pour installer ou afficher les instructions.','Installation disponible : touchez la bande.','Sur iPhone : ouvrez cette page dans Safari → Partager ⬆︎ → Ajouter à l’écran d’accueil.','Ouvrez le menu du navigateur (⋮ ou Partager), puis choisissez « Installer l’application » ou « Ajouter à l’écran d’accueil ».','DIGIYLYFE est déjà installé sur ce téléphone.','Installation annulée. Vous pouvez réessayer.','Impossible d’ouvrir l’installation automatique. Utilisez le menu du navigateur.'],
    en:['Install DIGIYLYFE on this phone','Tap the bar to install or show instructions.','Installation is ready: tap the bar.','On iPhone: open this page in Safari → Share ⬆︎ → Add to Home Screen.','Open the browser menu (⋮ or Share), then choose “Install app” or “Add to Home Screen”.','DIGIYLYFE is already installed on this phone.','Installation cancelled. You can try again.','Automatic installation could not open. Use the browser menu.'],
    es:['Instalar DIGIYLYFE en este teléfono','Toca la barra para instalar o ver las instrucciones.','Instalación disponible: toca la barra.','En iPhone: abre esta página en Safari → Compartir ⬆︎ → Añadir a pantalla de inicio.','Abre el menú del navegador (⋮ o Compartir) y elige «Instalar aplicación» o «Añadir a pantalla de inicio».','DIGIYLYFE ya está instalado en este teléfono.','Instalación cancelada. Puedes volver a intentarlo.','No se pudo abrir la instalación automática. Usa el menú del navegador.'],
    pt:['Instalar DIGIYLYFE neste telefone','Toque na barra para instalar ou ver as instruções.','Instalação disponível: toque na barra.','No iPhone: abra esta página no Safari → Partilhar ⬆︎ → Adicionar ao ecrã principal.','Abra o menu do navegador (⋮ ou Partilhar) e escolha «Instalar aplicação» ou «Adicionar ao ecrã principal».','DIGIYLYFE já está instalado neste telefone.','Instalação cancelada. Pode tentar novamente.','Não foi possível abrir a instalação automática. Use o menu do navegador.'],
    it:['Installa DIGIYLYFE su questo telefono','Tocca la barra per installare o vedere le istruzioni.','Installazione disponibile: tocca la barra.','Su iPhone: apri questa pagina in Safari → Condividi ⬆︎ → Aggiungi alla schermata Home.','Apri il menu del browser (⋮ o Condividi), quindi scegli «Installa app» o «Aggiungi alla schermata Home».','DIGIYLYFE è già installato su questo telefono.','Installazione annullata. Puoi riprovare.','Impossibile aprire l’installazione automatica. Usa il menu del browser.'],
    de:['DIGIYLYFE auf diesem Telefon installieren','Tippen Sie auf die Leiste, um zu installieren oder die Anleitung anzuzeigen.','Installation verfügbar: Tippen Sie auf die Leiste.','Auf dem iPhone: Seite in Safari öffnen → Teilen ⬆︎ → Zum Home-Bildschirm.','Öffnen Sie das Browsermenü (⋮ oder Teilen) und wählen Sie „App installieren“ oder „Zum Home-Bildschirm“.','DIGIYLYFE ist auf diesem Telefon bereits installiert.','Installation abgebrochen. Sie können es erneut versuchen.','Die automatische Installation konnte nicht geöffnet werden. Nutzen Sie das Browsermenü.'],
    nl:['DIGIYLYFE op deze telefoon installeren','Tik op de balk om te installeren of de instructies te tonen.','Installatie beschikbaar: tik op de balk.','Op iPhone: open deze pagina in Safari → Deel ⬆︎ → Zet op beginscherm.','Open het browsermenu (⋮ of Deel) en kies ‘App installeren’ of ‘Zet op beginscherm’.','DIGIYLYFE is al op deze telefoon geïnstalleerd.','Installatie geannuleerd. U kunt opnieuw proberen.','Automatische installatie kon niet worden geopend. Gebruik het browsermenu.'],
    ar:['تثبيت DIGIYLYFE على هذا الهاتف','اضغط على الشريط للتثبيت أو لعرض التعليمات.','التثبيت متاح: اضغط على الشريط.','على iPhone: افتح الصفحة في Safari ← مشاركة ⬆︎ ← إضافة إلى الشاشة الرئيسية.','افتح قائمة المتصفح (⋮ أو مشاركة)، ثم اختر «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية».','DIGIYLYFE مثبت بالفعل على هذا الهاتف.','تم إلغاء التثبيت. يمكنك المحاولة مرة أخرى.','تعذر فتح التثبيت التلقائي. استخدم قائمة المتصفح.']
  };

  var DESKTOP={
    fr:['Installer DIGIYLYFE sur cet ordinateur','Sur ordinateur : utilisez le menu du navigateur puis « Installer DIGIYLYFE » si l’installation automatique n’apparaît pas.','DIGIYLYFE est déjà installé sur cet ordinateur.'],
    en:['Install DIGIYLYFE on this computer','On desktop: open the browser menu and choose “Install DIGIYLYFE” if the automatic install option does not appear.','DIGIYLYFE is already installed on this computer.'],
    es:['Instalar DIGIYLYFE en este ordenador','En ordenador: abre el menú del navegador y elige «Instalar DIGIYLYFE» si no aparece la instalación automática.','DIGIYLYFE ya está instalado en este ordenador.'],
    pt:['Instalar DIGIYLYFE neste computador','No computador: abra o menu do navegador e escolha «Instalar DIGIYLYFE» se a instalação automática não aparecer.','DIGIYLYFE já está instalado neste computador.'],
    it:['Installa DIGIYLYFE su questo computer','Sul computer: apri il menu del browser e scegli «Installa DIGIYLYFE» se l’installazione automatica non compare.','DIGIYLYFE è già installato su questo computer.'],
    de:['DIGIYLYFE auf diesem Computer installieren','Am Computer: Öffnen Sie das Browsermenü und wählen Sie „DIGIYLYFE installieren“, falls die automatische Installation nicht erscheint.','DIGIYLYFE ist auf diesem Computer bereits installiert.'],
    nl:['DIGIYLYFE op deze computer installeren','Op de computer: open het browsermenu en kies ‘DIGIYLYFE installeren’ als de automatische installatie niet verschijnt.','DIGIYLYFE is al op deze computer geïnstalleerd.'],
    ar:['تثبيت DIGIYLYFE على هذا الكمبيوتر','على الكمبيوتر: افتح قائمة المتصفح واختر «تثبيت DIGIYLYFE» إذا لم يظهر التثبيت التلقائي.','DIGIYLYFE مثبت بالفعل على هذا الكمبيوتر.']
  };

  function lang(){var l=(document.documentElement.lang||'fr').toLowerCase().split('-')[0];return COPY[l]?l:'fr';}
  function text(i){
    var l=lang();
    if(!isMobile&&i===0)return DESKTOP[l][0];
    if(!isMobile&&i===4)return DESKTOP[l][1];
    if(!isMobile&&i===5)return DESKTOP[l][2];
    return COPY[l][i];
  }
  function refreshCopy(){
    label.textContent=text(0);
    band.setAttribute('aria-label',text(0));
    if(installed)note.textContent=text(5);
    else if(promptEvent)note.textContent=text(2);
    else note.textContent=text(1);
  }

  if(installed){band.hidden=true;return;}

  window.addEventListener('beforeinstallprompt',function(ev){
    ev.preventDefault();
    promptEvent=ev;
    note.textContent=text(2);
  });

  window.addEventListener('appinstalled',function(){
    installed=true;
    promptEvent=null;
    band.hidden=true;
  });

  btn.addEventListener('pointerdown',function(){btn.classList.add('is-pressed');});
  ['pointerup','pointercancel','pointerleave'].forEach(function(name){btn.addEventListener(name,function(){btn.classList.remove('is-pressed');});});
  btn.addEventListener('touchstart',function(){},{passive:true});

  btn.addEventListener('click',function(){
    if(installed){note.textContent=text(5);return;}
    if(promptEvent){
      var ev=promptEvent;
      promptEvent=null;
      try{
        ev.prompt();
        ev.userChoice.then(function(choice){
          if(choice&&choice.outcome==='accepted'){
            note.textContent=text(5);
          }else{
            note.textContent=text(6);
          }
        }).catch(function(){note.textContent=text(7);});
      }catch(error){note.textContent=text(7);}
      return;
    }
    note.textContent=isIOS?text(3):text(4);
  });

  document.querySelectorAll('.langBtn').forEach(function(b){b.addEventListener('click',function(){setTimeout(refreshCopy,0);});});
  refreshCopy();
})();
