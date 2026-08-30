/* DIGIYLYFE — PETITE COTE · porte SERVICE DE NETTOYAGE V1
 * Porte territoriale locale vers la fiche publique MANÉ & GNING.
 * Visible uniquement sur DIGIY PETITE CÔTE.
 */
(function(){'use strict';
var LANGS=['fr','en','es','pt','de','it','nl','ar'];
var TEXT={
  fr:{title:'SERVICE DE NETTOYAGE',meta:'MANÉ & GNING · Saly / Mbour'},
  en:{title:'CLEANING SERVICE',meta:'MANÉ & GNING · Saly / Mbour'},
  es:{title:'SERVICIO DE LIMPIEZA',meta:'MANÉ & GNING · Saly / Mbour'},
  pt:{title:'SERVIÇO DE LIMPEZA',meta:'MANÉ & GNING · Saly / Mbour'},
  de:{title:'REINIGUNGSSERVICE',meta:'MANÉ & GNING · Saly / Mbour'},
  it:{title:'SERVIZIO DI PULIZIA',meta:'MANÉ & GNING · Saly / Mbour'},
  nl:{title:'SCHOONMAAKSERVICE',meta:'MANÉ & GNING · Saly / Mbour'},
  ar:{title:'خدمة تنظيف',meta:'MANÉ & GNING · سالي / مبور'}
};
function params(){try{return new URLSearchParams(location.search)}catch(e){return new URLSearchParams()}}
function active(){return (params().get('zone')||'')==='petite-cote'}
function lang(){var l=(document.documentElement.lang||params().get('lang')||'fr').slice(0,2).toLowerCase();return LANGS.indexOf(l)>=0?l:'fr'}
function target(l){var p=params(),u=new URL('https://digiylyfe.com/nettoyage-master.html');u.searchParams.set('territory','petite-cote');var local=p.get('local')||'';if(local)u.searchParams.set('local',local);u.searchParams.set('lang',l||lang());return u.toString()}
function install(){
  var root=document.getElementById('needs');if(!root)return;
  var old=root.querySelector('[data-digiy-cleaning-door]');
  if(!active()){if(old)old.remove();return}
  var l=lang(),x=TEXT[l]||TEXT.fr;
  if(old){
    old.href=target(l);old.setAttribute('aria-label',x.title+' · MANÉ & GNING');old.setAttribute('data-lang',l);
    var t=old.querySelector('[data-cleaning-title]'),m=old.querySelector('[data-cleaning-meta]');if(t)t.textContent=x.title;if(m)m.textContent=x.meta;
    return;
  }
  var a=document.createElement('a');a.className='need';a.href=target(l);a.setAttribute('data-digiy-cleaning-door','1');a.setAttribute('data-lang',l);a.setAttribute('aria-label',x.title+' · MANÉ & GNING');a.style.textDecoration='none';a.style.borderColor='rgba(94,234,212,.62)';a.style.background='linear-gradient(145deg,rgba(94,234,212,.13),rgba(34,197,94,.10))';
  var ic=document.createElement('strong');ic.textContent='🧹';
  var title=document.createElement('span');title.setAttribute('data-cleaning-title','1');title.textContent=x.title;
  var meta=document.createElement('small');meta.setAttribute('data-cleaning-meta','1');meta.textContent=x.meta;meta.style.cssText='display:block;margin-top:6px;color:rgba(255,250,240,.78);font-size:10px;line-height:1.3;font-weight:850';
  a.append(ic,title,meta);
  var buttons=Array.prototype.slice.call(root.children),artisan=buttons.find(function(b){var s=b.querySelector&&b.querySelector('strong');return s&&s.textContent.trim()==='🔧'});
  if(artisan&&artisan.nextSibling)root.insertBefore(a,artisan.nextSibling);else root.appendChild(a);
}
function boot(){install();var root=document.getElementById('needs');if(root)new MutationObserver(function(m){var external=m.some(function(x){return Array.prototype.some.call(x.addedNodes,function(n){return !(n.nodeType===1&&n.hasAttribute&&n.hasAttribute('data-digiy-cleaning-door'))})});if(external)setTimeout(install,0)}).observe(root,{childList:true});document.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('[data-lang]'))setTimeout(install,80)});window.addEventListener('popstate',function(){setTimeout(install,50)})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
