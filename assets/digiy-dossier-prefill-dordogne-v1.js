/* DIGIYLYFE — préremplissage adhésion Dordogne V1 */
(function(){
  'use strict';
  var q=new URLSearchParams(location.search);
  if((q.get('territory')||'').toLowerCase()!=='vallee-dordogne')return;
  var need=(q.get('need')||'').toLowerCase();
  var JOBS={transport:'Chauffeur / Transport · DIGIY DRIVER',artisan:'Artisan / Services',accommodation:'Hébergement / Location',food:'Restaurant / Restauration',shopping:'Commerce / Boutique · MON COMMERCE',beauty:'Beauté & Bien-être',jobs:'Emploi / Missions',announcements:'Annonces / Services'};
  function fire(el){if(el)el.dispatchEvent(new Event('change',{bubbles:true}));}
  function hasValue(sel,value){return !!sel&&Array.prototype.some.call(sel.options,function(o){return o.value===value;});}
  function setJob(){var el=document.getElementById('job');if(el&&JOBS[need]&&!el.value)el.value=JOBS[need];}
  function banner(){if(document.querySelector('[data-digiy-dordogne-dossier-context]'))return;var form=document.getElementById('form');if(!form)return;var box=document.createElement('div');box.setAttribute('data-digiy-dordogne-dossier-context','1');box.style.cssText='margin:0 0 14px;padding:12px 14px;border:1px solid #c9954366;border-radius:16px;background:#c995430d;color:#fff0c8;font-weight:1000;line-height:1.4';box.textContent='DIGIY SARLAT · '+(JOBS[need]||'Adhérent professionnel')+' · Sarlat-la-Canéda';form.insertBefore(box,form.firstChild);}
  var tries=0;
  function apply(){tries++;setJob();banner();var country=document.getElementById('country'),territory=document.getElementById('territory'),zone=document.getElementById('baseZone');if(hasValue(country,'FR')&&country.value!=='FR'){country.value='FR';fire(country);}if(hasValue(territory,'FR-DORDOGNE')&&territory.value!=='FR-DORDOGNE'){territory.value='FR-DORDOGNE';fire(territory);}if(hasValue(zone,'FR-DORDOGNE-SARLAT')&&zone.value!=='FR-DORDOGNE-SARLAT'){zone.value='FR-DORDOGNE-SARLAT';fire(zone);}var done=country&&country.value==='FR'&&territory&&territory.value==='FR-DORDOGNE'&&zone&&zone.value==='FR-DORDOGNE-SARLAT';if(!done&&tries<80)setTimeout(apply,100);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply);else apply();
})();
