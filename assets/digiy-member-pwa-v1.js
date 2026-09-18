/* DIGIYLYFE — Empreinte PWA adhérent V1
 * Moteur partagé pour les sites/fiches PRO existants.
 * Configuration locale attendue :
 * window.DIGIY_MEMBER_PWA = { enabled:true, name, finalUrl, manifestUrl, iconUrl }
 */
(function(){
  'use strict';
  if(window.DIGIY_MEMBER_PWA_V1)return;
  window.DIGIY_MEMBER_PWA_V1=true;

  function boot(){
    var C=window.DIGIY_MEMBER_PWA||{};
    if(C.enabled===false)return;
    var clean=function(v){return String(v||'').trim();};
    var name=clean(C.name)||clean(document.querySelector('h1')?.textContent)||clean(document.title.split(/[·—|-]/)[0])||'Professionnel';
    var finalUrl=clean(C.finalUrl)||location.origin+location.pathname;
    var manifestUrl=clean(C.manifestUrl)||'/manifest.webmanifest';
    var iconUrl=clean(C.iconUrl)||'/favicon.png';

    function ensureLink(rel,href){
      var el=document.querySelector('link[rel="'+rel+'"][data-digiy-member-pwa="1"]');
      if(!el){el=document.createElement('link');el.rel=rel;el.setAttribute('data-digiy-member-pwa','1');document.head.appendChild(el);}
      el.href=href;
    }
    function ensureMeta(nameAttr,content){
      var el=document.querySelector('meta[name="'+nameAttr+'"][data-digiy-member-pwa="1"]');
      if(!el){el=document.createElement('meta');el.name=nameAttr;el.setAttribute('data-digiy-member-pwa','1');document.head.appendChild(el);}
      el.content=content;
    }

    ensureLink('manifest',manifestUrl);
    ensureLink('apple-touch-icon',iconUrl);
    ensureMeta('application-name',name);
    ensureMeta('apple-mobile-web-app-title',name);
    ensureMeta('mobile-web-app-capable','yes');
    ensureMeta('apple-mobile-web-app-capable','yes');
    ensureMeta('apple-mobile-web-app-status-bar-style','default');

    if('serviceWorker' in navigator){
      window.addEventListener('load',function(){
        navigator.serviceWorker.register('/sw.js?v=20260918-member-pwa-v1').catch(function(){});
      });
    }

    var COPY={
      fr:{install:'Garder {name} sur mon téléphone',share:'Partager',hint:'Votre accès direct reste sous votre doigt.',ready:'Installation prête : touchez pour ajouter {name}.',ios:'Sur iPhone : ouvrez dans Safari → Partager ⬆︎ → Ajouter à l’écran d’accueil.',fallback:'Ouvrez le menu du navigateur puis « Installer l’application » ou « Ajouter à l’écran d’accueil ».',installed:'{name} est déjà installé sur cet appareil.',copied:'Lien copié. Vous pouvez le partager.',cancel:'Installation annulée. Vous pouvez réessayer.'},
      en:{install:'Keep {name} on my phone',share:'Share',hint:'Your direct access stays one tap away.',ready:'Ready to install: tap to add {name}.',ios:'On iPhone: open in Safari → Share ⬆︎ → Add to Home Screen.',fallback:'Open the browser menu, then choose “Install app” or “Add to Home Screen”.',installed:'{name} is already installed on this device.',copied:'Link copied. You can share it now.',cancel:'Installation cancelled. You can try again.'},
      es:{install:'Guardar {name} en mi teléfono',share:'Compartir',hint:'Tu acceso directo queda a un toque.',ready:'Listo para instalar: toca para añadir {name}.',ios:'En iPhone: abre en Safari → Compartir ⬆︎ → Añadir a pantalla de inicio.',fallback:'Abre el menú del navegador y elige «Instalar aplicación» o «Añadir a pantalla de inicio».',installed:'{name} ya está instalado en este dispositivo.',copied:'Enlace copiado. Ya puedes compartirlo.',cancel:'Instalación cancelada. Puedes intentarlo de nuevo.'},
      pt:{install:'Guardar {name} no meu telefone',share:'Partilhar',hint:'O acesso direto fica a um toque.',ready:'Pronto para instalar: toque para adicionar {name}.',ios:'No iPhone: abra no Safari → Partilhar ⬆︎ → Adicionar ao ecrã principal.',fallback:'Abra o menu do navegador e escolha «Instalar aplicação» ou «Adicionar ao ecrã principal».',installed:'{name} já está instalado neste dispositivo.',copied:'Ligação copiada. Já pode partilhar.',cancel:'Instalação cancelada. Pode tentar novamente.'},
      it:{install:'Salva {name} sul mio telefono',share:'Condividi',hint:'Il tuo accesso diretto resta a un tocco.',ready:'Pronto per l’installazione: tocca per aggiungere {name}.',ios:'Su iPhone: apri in Safari → Condividi ⬆︎ → Aggiungi alla schermata Home.',fallback:'Apri il menu del browser e scegli «Installa app» o «Aggiungi alla schermata Home».',installed:'{name} è già installato su questo dispositivo.',copied:'Link copiato. Ora puoi condividerlo.',cancel:'Installazione annullata. Puoi riprovare.'},
      de:{install:'{name} auf meinem Telefon behalten',share:'Teilen',hint:'Der direkte Zugang bleibt nur einen Tipp entfernt.',ready:'Installationsbereit: Tippen Sie, um {name} hinzuzufügen.',ios:'Auf dem iPhone: in Safari öffnen → Teilen ⬆︎ → Zum Home-Bildschirm.',fallback:'Öffnen Sie das Browsermenü und wählen Sie „App installieren“ oder „Zum Home-Bildschirm“.',installed:'{name} ist auf diesem Gerät bereits installiert.',copied:'Link kopiert. Sie können ihn jetzt teilen.',cancel:'Installation abgebrochen. Sie können es erneut versuchen.'},
      nl:{install:'{name} op mijn telefoon bewaren',share:'Delen',hint:'Directe toegang blijft één tik verwijderd.',ready:'Klaar om te installeren: tik om {name} toe te voegen.',ios:'Op iPhone: open in Safari → Deel ⬆︎ → Zet op beginscherm.',fallback:'Open het browsermenu en kies ‘App installeren’ of ‘Zet op beginscherm’.',installed:'{name} is al op dit apparaat geïnstalleerd.',copied:'Link gekopieerd. U kunt het nu delen.',cancel:'Installatie geannuleerd. U kunt opnieuw proberen.'},
      ar:{install:'احفظ {name} على هاتفي',share:'مشاركة',hint:'يبقى الوصول المباشر على بُعد لمسة واحدة.',ready:'جاهز للتثبيت: اضغط لإضافة {name}.',ios:'على iPhone: افتح في Safari ← مشاركة ⬆︎ ← إضافة إلى الشاشة الرئيسية.',fallback:'افتح قائمة المتصفح ثم اختر «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية».',installed:'{name} مثبت بالفعل على هذا الجهاز.',copied:'تم نسخ الرابط. يمكنك مشاركته الآن.',cancel:'تم إلغاء التثبيت. يمكنك المحاولة مرة أخرى.'}
    };
    function lang(){var l=(document.documentElement.lang||'fr').toLowerCase().slice(0,2);return COPY[l]?l:'fr';}
    function t(k){return (COPY[lang()][k]||COPY.fr[k]||'').replace(/\{name\}/g,name);}

    if(!document.getElementById('digiyMemberPwaStyle')){
      var st=document.createElement('style');
      st.id='digiyMemberPwaStyle';
      st.textContent='.digiyMemberPwa{width:min(980px,calc(100% - 24px));margin:12px auto 16px;padding:11px;border-radius:18px;border:1px solid rgba(246,196,83,.52);background:linear-gradient(135deg,rgba(246,196,83,.13),rgba(34,197,94,.10),rgba(255,255,255,.06));box-shadow:0 10px 26px rgba(0,0,0,.12);font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:inherit}.digiyMemberPwa strong{display:block;text-align:center;font-size:12px;font-weight:1000;margin-bottom:8px}.digiyMemberPwaActions{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:7px}.digiyMemberPwa button{min-height:50px;padding:10px 14px;border-radius:999px;border:1px solid rgba(246,196,83,.55);font:inherit;font-size:11px;font-weight:1000;cursor:pointer}.digiyMemberPwaInstall{background:linear-gradient(135deg,#fff1bd,#f6c453,#22c55e);color:#06140f}.digiyMemberPwaShare{background:rgba(255,255,255,.09);color:inherit}.digiyMemberPwa small{display:block;margin-top:7px;text-align:center;opacity:.78;font-size:9.5px;line-height:1.35;font-weight:800}@media(max-width:520px){.digiyMemberPwaActions{grid-template-columns:1fr}.digiyMemberPwa{width:min(100% - 16px,980px);margin-top:8px}.digiyMemberPwa button{min-height:54px}}';
      document.head.appendChild(st);
    }

    if(document.getElementById('digiyMemberPwa'))return;
    var box=document.createElement('section');
    box.id='digiyMemberPwa';
    box.className='digiyMemberPwa';
    box.setAttribute('aria-label','Empreinte numérique '+name);
    box.innerHTML='<strong>📲 '+name+' · DIGIY PRO</strong><div class="digiyMemberPwaActions"><button type="button" class="digiyMemberPwaInstall" id="digiyMemberPwaInstall"></button><button type="button" class="digiyMemberPwaShare" id="digiyMemberPwaShare"></button></div><small id="digiyMemberPwaNote"></small>';

    var root=document.querySelector('main')||document.querySelector('.wrap')||document.body;
    var anchor=root.querySelector(':scope > header, :scope > .top, :scope > .hero');
    if(anchor&&anchor.parentNode===root)anchor.insertAdjacentElement('afterend',box);
    else root.insertBefore(box,root.firstChild);

    var install=document.getElementById('digiyMemberPwaInstall');
    var share=document.getElementById('digiyMemberPwaShare');
    var note=document.getElementById('digiyMemberPwaNote');
    var promptEvent=null;
    var installed=(matchMedia&&matchMedia('(display-mode: standalone)').matches)||navigator.standalone===true;
    var ua=navigator.userAgent||'';
    var isIOS=/iPad|iPhone|iPod/i.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);

    function refresh(){
      install.textContent=t('install');
      share.textContent='↗ '+t('share');
      if(installed){note.textContent=t('installed');install.disabled=true;}
      else if(promptEvent)note.textContent=t('ready');
      else note.textContent=t('hint');
    }
    refresh();

    addEventListener('beforeinstallprompt',function(ev){ev.preventDefault();promptEvent=ev;refresh();});
    addEventListener('appinstalled',function(){installed=true;promptEvent=null;refresh();});
    install.addEventListener('click',function(){
      if(installed)return;
      if(promptEvent){
        var ev=promptEvent;promptEvent=null;
        try{ev.prompt();ev.userChoice.then(function(choice){if(choice&&choice.outcome==='accepted'){installed=true;refresh();}else note.textContent=t('cancel');}).catch(function(){note.textContent=t('fallback');});}
        catch(_){note.textContent=t('fallback');}
      }else note.textContent=isIOS?t('ios'):t('fallback');
    });
    share.addEventListener('click',async function(){
      try{
        if(navigator.share){await navigator.share({title:name,text:name+' · DIGIYLYFE',url:finalUrl});return;}
        if(navigator.clipboard&&navigator.clipboard.writeText){await navigator.clipboard.writeText(finalUrl);note.textContent=t('copied');return;}
      }catch(_){}
      note.textContent=finalUrl;
    });
    try{new MutationObserver(refresh).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});}catch(_){}
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);
  else boot();
})();