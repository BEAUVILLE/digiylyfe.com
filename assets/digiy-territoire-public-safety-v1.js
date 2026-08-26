/* DIGIYLYFE — sécurité de publication territoire V1
 * Empêche une ancienne entrée FG NAILS de réapparaître via un fallback local.
 */
(function(){
  'use strict';

  function isFgCard(card){
    if(!card)return false;
    var text=(card.textContent||'').toLowerCase();
    if(/fg\s*nails/i.test(text))return true;
    return !!card.querySelector('a[href*="f-g-nails.digiylyfe.com"]');
  }

  function purge(){
    var results=document.getElementById('results');
    if(!results)return;
    var changed=false;
    Array.prototype.slice.call(results.querySelectorAll('.card')).forEach(function(card){
      if(isFgCard(card)){card.remove();changed=true;}
    });
    if(changed){
      var status=document.getElementById('status');
      if(status){
        var count=results.querySelectorAll('.card').length;
        status.textContent=(status.textContent||'').replace(/^\s*\d+/,String(count));
      }
    }
  }

  function boot(){
    var results=document.getElementById('results');
    if(!results)return false;
    purge();
    new MutationObserver(purge).observe(results,{childList:true,subtree:true});
    return true;
  }

  if(!boot()){
    var observer=new MutationObserver(function(){if(boot())observer.disconnect();});
    observer.observe(document.documentElement,{childList:true,subtree:true});
  }
})();
