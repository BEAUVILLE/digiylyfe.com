/* DIGIYLYFE — carte officielle : choix fixe/animé, 7,5 s, 1 téléchargement GIF/session.
   Préserve les deux QR officiels et le lien /carte/. Pas de boucle et pas de cache-buster. */
(function(){
  'use strict';
  var btnFixed=document.getElementById('digiyCardChooseFixed');
  var btnAnimated=document.getElementById('digiyCardChooseAnimated');
  var fixedPanel=document.getElementById('digiyCardFixedPanel');
  var animatedPanel=document.getElementById('digiyCardAnimatedPanel');
  var replay=document.getElementById('digiyOfficialReplay5');
  var image=document.getElementById('digiyOfficialAnimatedImage');
  if(!btnFixed||!btnAnimated||!fixedPanel||!animatedPanel||!replay||!image)return;
  var gifURL='/assets/digiy-officiel-animation-75-9x16.gif';
  var finalURL='/assets/digiy-officiel-final-9x16.png';
  var duration=7500,mode='fixed',visible=false,playedOnce=false,serial=0;
  var bytesPromise=null,blobURL=null,stopTimer=0,observer=null;
  function releaseURL(url){if(url)window.setTimeout(function(){URL.revokeObjectURL(url);},250);}
  function stop(){
    window.clearTimeout(stopTimer);stopTimer=0;
    image.onload=null;image.onerror=null;
    image.src=finalURL;
    if(blobURL){releaseURL(blobURL);blobURL=null;}
    replay.disabled=false;
  }
  function loadGIF(){
    if(!bytesPromise){
      bytesPromise=fetch(gifURL,{cache:'force-cache'}).then(function(r){
        if(!r.ok)throw new Error('GIF HTTP '+r.status);
        return r.arrayBuffer();
      }).then(function(data){
        if(!data||data.byteLength<100)throw new Error('GIF incomplet');
        return data;
      }).catch(function(error){bytesPromise=null;throw error;});
    }
    return bytesPromise;
  }
  function play(){
    if(mode!=='animated')return;
    var run=++serial;
    stop();
    loadGIF().then(function(bytes){
      if(run!==serial||mode!=='animated')return;
      var url=URL.createObjectURL(new Blob([bytes],{type:'image/gif'}));
      blobURL=url;
      var armed=false;
      function loaded(){
        if(armed||run!==serial)return;
        armed=true;
        image.onload=null;
        stopTimer=window.setTimeout(function(){if(run===serial)stop();},duration);
      }
      image.onload=loaded;
      image.onerror=function(){if(run===serial)stop();};
      image.src=url; // Nouvel URL local à chaque lecture, même bytes en mémoire : Safari redémarre au début.
      if(image.complete&&image.naturalWidth)loaded();
    }).catch(function(){
      if(run===serial)stop(); // Échec réseau : QR authentique immédiatement disponible.
    });
  }
  function select(which){
    serial++;
    stop();
    mode=which;
    fixedPanel.hidden=which!=='fixed';
    animatedPanel.hidden=which!=='animated';
    replay.hidden=which!=='animated';
    btnFixed.setAttribute('aria-pressed',String(which==='fixed'));
    btnAnimated.setAttribute('aria-pressed',String(which==='animated'));
    if(which==='animated'&&visible&&!playedOnce){playedOnce=true;play();}
  }
  btnFixed.addEventListener('click',function(){select('fixed');});
  btnAnimated.addEventListener('click',function(){select('animated');});
  replay.addEventListener('click',function(){playedOnce=true;play();});
  var reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  select(reduced?'fixed':'animated');
  if('IntersectionObserver' in window){
    observer=new IntersectionObserver(function(entries){
      if(entries.some(function(e){return e.isIntersecting&&e.intersectionRatio>=0.10;})){
        visible=true;observer.disconnect();observer=null;
        if(mode==='animated'&&!playedOnce){playedOnce=true;play();}
      }
    },{threshold:[0,0.10]});
    observer.observe(animatedPanel);
  }else{
    visible=true; // Bouton replay reste utilisable si IntersectionObserver n'existe pas.
  }
})();
