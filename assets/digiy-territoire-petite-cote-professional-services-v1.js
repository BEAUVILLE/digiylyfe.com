/* DIGIYLYFE — PETITE COTE · porte SERVICES PROFESSIONNELS V1 */
(function(){'use strict';
var LANGS=['fr','en','es','pt','de','it','nl','ar'];
var TEXT={
 fr:{title:'SERVICES PROFESSIONNELS',meta:'Avocat · Notaire · Comptable · Architecte'},
 en:{title:'PROFESSIONAL SERVICES',meta:'Lawyer · Notary · Accountant · Architect'},
 es:{title:'SERVICIOS PROFESIONALES',meta:'Abogado · Notario · Contable · Arquitecto'},
 pt:{title:'SERVIÇOS PROFISSIONAIS',meta:'Advogado · Notário · Contabilista · Arquiteto'},
 de:{title:'PROFESSIONELLE DIENSTE',meta:'Anwalt · Notar · Buchhalter · Architekt'},
 it:{title:'SERVIZI PROFESSIONALI',meta:'Avvocato · Notaio · Commercialista · Architetto'},
 nl:{title:'PROFESSIONELE DIENSTEN',meta:'Advocaat · Notaris · Boekhouder · Architect'},
 ar:{title:'الخدمات المهنية',meta:'محامٍ · موثق · محاسب · مهندس معماري'}
};
function params(){try{return new URLSearchParams(location.search)}catch(e){return new URLSearchParams()}}
function active(){return (params().get('zone')||'')==='petite-cote'}
function lang(){var l=(document.documentElement.lang||params().get('lang')||'fr').slice(0,2).toLowerCase();return LANGS.indexOf(l)>=0?l:'fr'}
function target(l){var p=params(),u=new URL('https://digiylyfe.com/services-professionnels-master.html');u.searchParams.set('territory','petite-cote');var local=p.get('local')||'';if(local)u.searchParams.set('local',local);u.searchParams.set('lang',l||lang());return u.toString()}
function install(){
 var root=document.getElementById('needs');if(!root)return;
 var old=root.querySelector('[data-digiy-professional-services-door]');
 if(!active()){if(old)old.remove();return}
 var l=lang(),x=TEXT[l]||TEXT.fr;
 if(old){old.href=target(l);var t=old.querySelector('[data-pro-title]'),m=old.querySelector('[data-pro-meta]');if(t)t.textContent=x.title;if(m)m.textContent=x.meta;return}
 var a=document.createElement('a');a.className='need';a.href=target(l);a.setAttribute('data-digiy-professional-services-door','1');a.style.textDecoration='none';
 var ic=document.createElement('strong');ic.textContent='🏛️';
 var title=document.createElement('span');title.setAttribute('data-pro-title','1');title.textContent=x.title;
 var meta=document.createElement('small');meta.setAttribute('data-pro-meta','1');meta.textContent=x.meta;
 a.append(ic,title,meta);
 var cleaning=root.querySelector('[data-digiy-cleaning-door]');
 if(cleaning&&cleaning.nextSibling)root.insertBefore(a,cleaning.nextSibling);else if(cleaning)root.appendChild(a);else root.appendChild(a);
}
function boot(){install();var root=document.getElementById('needs');if(root)new MutationObserver(function(){setTimeout(install,0)}).observe(root,{childList:true});document.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('[data-lang]'))setTimeout(install,80)});window.addEventListener('popstate',function(){setTimeout(install,50)})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
