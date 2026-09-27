(function(){
  'use strict';
  var root=document.querySelector('[data-aly-interact]');
  if(!root)return;

  var iframe=root.querySelector('iframe');
  var status=root.querySelector('[data-aly-status]');
  var openBtn=root.querySelector('[data-aly-open]');
  var focusBtn=root.querySelector('[data-aly-focus]');

  function setStatus(msg){ if(status) status.textContent=msg||''; }

  if(focusBtn){
    focusBtn.addEventListener('click',function(e){
      e.preventDefault();
      var target=document.getElementById('aly-engine');
      if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
      setStatus('Aly vous conduit vers le moteur local DIGIYLYFE.');
    });
  }

  if(openBtn){
    openBtn.addEventListener('click',function(){
      setStatus('Ouverture du moteur DIGIYLYFE dans un nouvel onglet.');
    });
  }

  if(iframe){
    iframe.addEventListener('load',function(){
      setStatus('Moteur DIGIYLYFE chargé. Vous pouvez parler ou écrire votre besoin.');
    });
    iframe.addEventListener('error',function(){
      setStatus('Le navigateur a bloqué l’intégration. Utilisez « Ouvrir le moteur seul ».');
    });
  }
})();