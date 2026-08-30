/* DIGIYLYFE — TERRITOIRE · STYLE UNIFIÉ DES PORTES V1
 * Une seule présentation pour toutes les portes métier du territoire.
 * Le style de référence est la porte SERVICE DE NETTOYAGE.
 * Aucun routage ni moteur métier n'est modifié.
 */
(function(){'use strict';
var STYLE_ID='digiyTerritoryUnifiedDoorsStyle';
function installStyle(){
  if(document.getElementById(STYLE_ID))return;
  var s=document.createElement('style');
  s.id=STYLE_ID;
  s.textContent=[
    '#needs .need{',
    'display:block!important;width:100%!important;min-height:100px!important;',
    'border:1px solid rgba(94,234,212,.62)!important;',
    'border-radius:20px!important;',
    'padding:14px!important;',
    'background:linear-gradient(145deg,rgba(94,234,212,.13),rgba(34,197,94,.10))!important;',
    'color:#fff!important;text-align:left!important;text-decoration:none!important;',
    'box-shadow:inset 0 0 0 1px rgba(255,255,255,.025),0 10px 24px rgba(0,0,0,.08)!important;',
    'transition:border-color .15s ease,background .15s ease,transform .15s ease!important;',
    '}',
    '#needs .need:hover{border-color:rgba(246,196,83,.80)!important;background:linear-gradient(145deg,rgba(94,234,212,.17),rgba(34,197,94,.14))!important;transform:translateY(-1px)!important;}',
    '#needs .need.active{border-color:rgba(246,196,83,.88)!important;background:linear-gradient(145deg,rgba(246,196,83,.18),rgba(34,197,94,.13))!important;}',
    '#needs .need strong{display:block!important;font-size:26px!important;line-height:1!important;}',
    '#needs .need span{display:block!important;margin-top:8px!important;font-weight:950!important;}',
    '#needs .need small{display:block!important;margin-top:6px!important;color:rgba(255,250,240,.78)!important;font-size:10px!important;line-height:1.3!important;font-weight:850!important;}',
    'html[dir="rtl"] #needs .need{text-align:right!important;}',
    '@media(max-width:430px){#needs .need{min-height:86px!important;padding:12px!important;}#needs .need strong{font-size:22px!important;}}'
  ].join('');
  document.head.appendChild(s);
}
function mark(){
  var root=document.getElementById('needs');if(!root)return;
  root.querySelectorAll('.need').forEach(function(n){n.setAttribute('data-digiy-unified-door-style','1')});
}
function apply(){installStyle();mark()}
function boot(){
  apply();
  var root=document.getElementById('needs');
  if(root)new MutationObserver(function(){mark()}).observe(root,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
