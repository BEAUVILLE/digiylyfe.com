/* DIGIYLYFE — Empreinte PWA PRO V1
 * Un seul moteur DIGIYLYFE, une identité installable par adhérent PRO.
 * Activation explicite : CARD.pwaEnabled === true.
 */
(function(){
  'use strict';
  if(window.DIGIY_PRO_PWA_V1)return;
  window.DIGIY_PRO_PWA_V1=true;

  function run(){
    var CARD=window.DIGIY_PRO_PWA_CARD||null;
    if(!CARD||CARD.pwaEnabled!==true)return;

    var clean=function(v){return String(v||'').trim();};
    var name=clean(CARD.name)||'Professionnel';
    var path=(location.pathname.split('/').pop()||'professionnel').replace(/\.html?$/i,'');
    var slug=path.replace(/[^a-z0-9-]/gi,'-').replace(/-+/g,'-').replace(/^-|-$/g,'').toLowerCase()||'professionnel';
    var manifest='/pwa/'+encodeURIComponent(slug)+'.webmanifest';
    var icon='/pwa/icons/'+encodeURIComponent(slug)+'-192.png';

    function ensureLink(rel,href){
      var q='link[rel="'+rel+'"][data-digiy-pro-pwa="1"]';
      var el=document.querySelector(q);
      if(!el){el=document.createElement('link');el.rel=rel;el.setAttribute('data-digiy-pro-pwa','1');document.head.appendChild(el);}
      el.href=href;
      return el;
    }
    function ensureMeta(n,c){
      var el=document.querySelector('meta[name="'+n+'"][data-digiy-pro-pwa="1"]');
      if(!el){el=document.createElement('meta');el.name=n;el.setAttribute('data-digiy-pro-pwa','1');document.head.appendChild(el);}
      el.content=c;
      return el;
    }

    ensureLink('manifest',manifest);
    ensureLink('apple-touch-icon',icon);
    ensureMeta('application-name',name);
    ensureMeta('apple-mobile-web-app-title',name);
    ensureMeta('mobile-web-app-capable','yes');
    ensureMeta('apple-mobile-web-app-capable','yes');

    if('serviceWorker' in navigator){
      window.addEventListener('load',function(){
        navigator.serviceWorker.register('/sw.js?v=20260918-pro-pwa-v1').catch(function(){});
      });
    }

    var COPY={
      fr:{install:'Garder {name} sur mon téléphone',share:'Partager',base:'Votre accès direct reste sous votre doigt.',ready:'Installation prête : touchez pour ajouter {name}.',ios:'Sur iPhone : Safari → Partager ⬆︎ → Ajouter à l’écran d’accueil.',fallback:'Ouvrez le menu du navigateur puis « Installer l’application » ou « Ajouter à l’écran d’accueil ».',installed:'{name} est déjà installé sur cet appareil.',copied:'Lien copié. Vous pouvez le partager.',cancel:'Installation annulée. Vous pouvez réessayer.'},
      en:{install:'Keep {name} on my phone',share:'Share',base:'Your direct access stays one tap away.',ready:'Ready to install: tap to add {name}.',ios:'On iPhone: Safari → Share ⬆︎ → Add to Home Screen.',fallback:'Open the browser menu, then choose “Install app” or “Add to Home Screen”.',installed:'{name} is already installed on this device.',copied:'Link copied. You can share it now.',cancel:'Installation cancelled. You can try again.'},
      es:{install:'Guardar {name} en mi teléfono',share:'Compartir',base:'Tu acceso directo queda a un toque.',ready:'Listo para instalar: toca para añadir {name}.',ios:'En iPhone: Safari → Compartir ⬆︎ → Añadir a pantalla de inicio.',fallback:'Abre el menú del navegador y elige «Instalar aplicación» o «Añadir a pantalla de inicio».',installed:'{name} ya está instalado en este dispositivo.',copied:'Enlace copiado. Ya puedes compartirlo.',cancel:'Instalación cancelada. Puedes intentarlo de nuevo.'},
      pt:{install:'Guardar {name} no meu telefone',share:'Partilhar',base:'O acesso direto fica a um toque.',ready:'Pronto para instalar: toque para adicionar {name}.',ios:'No iPhone: Safari → Partilhar ⬆︎ → Adicionar ao ecrã principal.',fallback:'Abra o menu do navegador e escolha «Instalar aplicação» ou «Adicionar ao ecrã principal».',installed:'{name} já está instalado neste dispositivo.',copied:'Ligação copiada. Já pode partilhar.',cancel:'Instalação cancelada. Pode tentar novamente.'},
      it:{install:'Salva {name} sul mio telefono',share:'Condividi',base:'Il tuo accesso diretto resta a un tocco.',ready:'Pronto per l’installazione: tocca per aggiungere {name}.',ios:'Su iPhone: Safari → Condividi ⬆︎ → Aggiungi alla schermata Home.',fallback:'Apri il menu del browser e scegli «Installa app» o «Aggiungi alla schermata Home».',installed:'{name} è già installato su questo dispositivo.',copied:'Link copiato. Ora puoi condividerlo.',cancel:'Installazione annullata. Puoi riprovare.'},
      de:{install:'{name} auf meinem Telefon behalten',share:'Teilen',base:'Der direkte Zugang bleibt nur einen Tipp entfernt.',ready:'Installationsbereit: Tippen Sie, um {name} hinzuzufügen.',ios:'Auf dem iPhone: Safari → Teilen ⬆︎ → Zum Home-Bildschirm.',fallback:'Öffnen Sie das Browsermenü und wählen Sie „App installieren“ oder „Zum Home-Bildschirm“.',installed:'{name} ist auf diesem Gerät bereits installiert.',copied:'Link kopiert. Sie können ihn jetzt teilen.',cancel:'Installation abgebrochen. Sie können es erneut versuchen.'},
      nl:{install:'{name} op mijn telefoon bewaren',share:'Delen',base:'Directe toegang blijft één tik verwijderd.',ready:'Klaar om te installeren: tik om {name} toe te voegen.',ios:'Op iPhone: Safari → Deel ⬆︎ → Zet op beginscherm.',fallback:'Open het browsermenu en kies ‘App installeren’ of ‘Zet op beginscherm’.',installed:'{name} is al op dit apparaat geïnstalleerd.',copied:'Link gekopieerd. U kunt het nu delen.',cancel:'Installatie geannuleerd. U kunt opnieuw proberen.'},
      ar:{install:'احفظ {name} على هاتفي',share:'مشاركة',base:'يبقى الوصول المباشر على بُعد لمسة واحدة.',ready:'جاهز للتثبيت: اضغط لإضافة {name}.',ios:'على iPhone: Safari ← مشاركة ⬆︎ ← إضافة إلى الشاشة الرئيسية.',fallback:'افتح قائمة المتصفح ثم اختر «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية».',installed:'{name} مثبت بالفعل على هذا الجهاز.',copied:'تم نسخ الرابط. يمكنك مشاركته الآن.',cancel:'تم إلغاء التثبيت. يمكنك المحاولة مرة أخرى.'}
    };
    function lang(){
      var l=(document.documentElement.lang||'fr').toLowerCase().split('-')[0];
      return COPY[l]?l:'fr';
    }
    function t(k){
      return (COPY[lang()][k]||COPY.fr[k]||'').replace(/\{name\}/g,name);
    }

    if(!document.getElementById('digiyProPwaStyle')){
      var st=document.createElement('style');
      st.id='digiyProPwaStyle';
      st.textContent='.digiyProPwa{margin:14px 0;padding:12px;border:1px solid rgba(246,196,83,.48);border-radius:18px;background:linear-gradient(145deg,rgba(246,196,83,.12),rgba(34,197,94,.10));text-align:center}.digiyProPwa strong{display:block;font-size:12px;font-weight:1000;margin-bottom:8px}.digiyProPwaActions{display:grid;grid-template-columns:1fr .45fr;gap:7px}.digiyProPwa button{min-height:48px;border-radius:999px;border:1px solid rgba(246,196,83,.55);font:inherit;font-size:11px;font-weight:1000;cursor:pointer}.digiyProPwaInstall{background:linear-gradient(135deg,#fff1bd,#f6c453,#22c55e);color:#06140f}.digiyProPwaShare{background:rgba(255,255,255,.07);color:inherit}.digiyProPwa small{display:block;margin-top:7px;opacity:.78;font-size:9.5px;line-height:1.35;font-weight:800}@media(max-width:430px){.digiyProPwaActions{grid-template-columns:1fr}.digiyProPwa button{min-height:51px}}';
      document.head.appendChild(st);
    }

    var host=document.getElementById('qrBox')||document.querySelector('.doctrine')||document.querySelector('footer');
    if(!host||document.getElementById('digiyProPwa'))return;
    var box=document.createElement('section');
    box.id='digiyProPwa';
    box.className='digiyProPwa';
    box.setAttribute('aria-label','Empreinte numérique '+name);
    box.innerHTML='<strong>📲 <span id="digiyProPwaTitle"></span></strong><div class="digiyProPwaActions"><button type="button" class="digiyProPwaInstall" id="digiyProPwaInstall"></button><button type="button" class="digiyProPwaShare" id="digiyProPwaShare"></button></div><small id="digiyProPwaNote"></small>';
    host.parentNode.insertBefore(box,host);

    var installBtn=document.getElementById('digiyProPwaInstall');
    var shareBtn=document.getElementById('digiyProPwaShare');
    var title=document.getElementById('digiyProPwaTitle');
    var note=document.getElementById('digiyProPwaNote');
    var promptEvent=null;
    var installed=(window.matchMedia&&window.matchMedia('(display-mode: standalone)').matches)||navigator.standalone===true;
    var ua=navigator.userAgent||'';
    var isIOS=/iPad|iPhone|iPod/i.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);

    function refresh(){
      title.textContent=name+' · DIGIY PRO';
      installBtn.textContent=t('install');
      shareBtn.textContent='↗ '+t('share');
      if(installed){note.textContent=t('installed');installBtn.disabled=true;}
      else if(promptEvent)note.textContent=t('ready');
      else note.textContent=t('base');
    }
    refresh();

    window.addEventListener('beforeinstallprompt',function(ev){
      ev.preventDefault();
      promptEvent=ev;
      refresh();
    });
    window.addEventListener('appinstalled',function(){
      installed=true;
      promptEvent=null;
      refresh();
    });

    installBtn.addEventListener('click',function(){
      if(installed)return;
      if(promptEvent){
        var ev=promptEvent;
        promptEvent=null;
        try{
          ev.prompt();
          ev.userChoice.then(function(choice){
            if(choice&&choice.outcome==='accepted'){installed=true;refresh();}
            else{note.textContent=t('cancel');}
          }).catch(function(){note.textContent=t('fallback');});
        }catch(_){note.textContent=t('fallback');}
        return;
      }
      note.textContent=isIOS?t('ios'):t('fallback');
    });

    shareBtn.addEventListener('click',async function(){
      var url=clean(CARD.finalUrl)||location.href;
      var data={title:name,text:name+' · DIGIYLYFE',url:url};
      try{
        if(navigator.share){await navigator.share(data);return;}
        if(navigator.clipboard&&navigator.clipboard.writeText){await navigator.clipboard.writeText(url);note.textContent=t('copied');return;}
      }catch(_){}
      note.textContent=url;
    });

    try{
      new MutationObserver(refresh).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    }catch(_){}
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);
  else run();
})();