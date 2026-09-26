/* DIGIYLYFE — runtime générique des cartes LOC V1
 * Mutualise le cycle de vie sans imposer un rendu unique.
 */
(function(w){
  'use strict';
  if(w.DIGIY_LOC_SIGNATURE_ENGINE)return;

  function register(cfg){
    if(!cfg||!cfg.id||typeof cfg.refresh!=='function')return;
    var key='DIGIY_LOC_SIGNATURE_'+String(cfg.id).toUpperCase().replace(/[^A-Z0-9]+/g,'_');
    if(w[key])return;w[key]=true;

    var queued=false;
    function run(){
      if(queued)return;
      queued=true;
      setTimeout(function(){
        queued=false;
        try{cfg.refresh();}catch(e){}
      },cfg.delay||0);
    }

    function watch(id){
      var el=document.getElementById(id);
      if(!el||el.getAttribute('data-digiy-loc-signature-watch')===cfg.id)return;
      el.setAttribute('data-digiy-loc-signature-watch',cfg.id);
      try{new MutationObserver(run).observe(el,{childList:true,subtree:true});}catch(e){}
    }

    function boot(){
      try{cfg.refresh();}catch(e){}
      (cfg.watchIds||[]).forEach(watch);
      if(cfg.afterBoot)try{cfg.afterBoot();}catch(e){}
    }

    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
    window.addEventListener('load',run);
    window.addEventListener('popstate',run);
    document.addEventListener('click',function(e){
      if(e.target&&e.target.closest&&e.target.closest(cfg.clickSelector||'[data-lang],[data-l],.langBtn,#needs,#zones'))run();
    });
    try{new MutationObserver(run).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});}catch(e){}

    var tries=0,max=cfg.maxTries==null?24:cfg.maxTries,interval=cfg.interval||250;
    if(max>0){
      var timer=setInterval(function(){
        run();
        if(++tries>max)clearInterval(timer);
      },interval);
    }
  }

  w.DIGIY_LOC_SIGNATURE_ENGINE={register:register};
})(window);
