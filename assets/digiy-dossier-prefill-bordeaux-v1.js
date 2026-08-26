/* DIGIYLYFE — préremplissage adhésion Bordeaux V1
 * Une seule adhésion publique Europe : 45 € / mois.
 * LA VOIX n'est pas un métier et n'est volontairement pas préremplie comme activité.
 */
(function(){
  'use strict';
  var q=new URLSearchParams(location.search);
  if((q.get('territory')||'').toLowerCase()!=='bordeaux')return;

  var need=(q.get('need')||'').toLowerCase();
  var local=(q.get('local')||'').toLowerCase();
  var JOBS={
    transport:'Chauffeur / Transport · DIGIY DRIVER',
    artisan:'Artisan / Services',
    accommodation:'Hébergement / Location',
    food:'Restaurant / Restauration',
    shopping:'Commerce / Boutique · MON COMMERCE',
    beauty:'Beauté & Bien-être',
    jobs:'Emploi / Missions',
    announcements:'Annonces / Services'
  };
  var ZONES={
    'bordeaux-maritime':'FR-BORDEAUX-MARITIME',
    'chartrons-grand-parc-jardin-public':'FR-BORDEAUX-CHARTRONS-GRAND-PARC-JARDIN-PUBLIC',
    'bordeaux-centre':'FR-BORDEAUX-CENTRE',
    'saint-augustin-tauzin-alphonse-dupeux':'FR-BORDEAUX-SAINT-AUGUSTIN-TAUZIN-ALPHONSE-DUPEUX',
    'nansouty-saint-genes':'FR-BORDEAUX-NANSOUTY-SAINT-GENES',
    'bordeaux-sud':'FR-BORDEAUX-SUD',
    'la-bastide':'FR-BORDEAUX-BASTIDE',
    'cauderan':'FR-BORDEAUX-CAUDERAN'
  };

  function fire(el){if(el)el.dispatchEvent(new Event('change',{bubbles:true}));}
  function hasValue(sel,value){return !!sel&&Array.prototype.some.call(sel.options,function(o){return o.value===value;});}

  function setJob(){
    var el=document.getElementById('job');
    if(el&&JOBS[need]&&!el.value)el.value=JOBS[need];
  }

  function banner(){
    if(document.querySelector('[data-digiy-bordeaux-dossier-context]'))return;
    var form=document.getElementById('form');if(!form)return;
    var box=document.createElement('div');
    box.setAttribute('data-digiy-bordeaux-dossier-context','1');
    box.style.cssText='margin:0 0 14px;padding:12px 14px;border:1px solid #d6b36a66;border-radius:16px;background:#d6b36a0d;color:#fff0c8;font-weight:1000;line-height:1.4';
    box.textContent='DIGIY BORDEAUX · '+(JOBS[need]||'Adhérent professionnel')+(local?' · '+local.replace(/-/g,' '):'');
    form.insertBefore(box,form.firstChild);
  }

  var tries=0;
  function apply(){
    tries++;
    setJob();banner();
    var country=document.getElementById('country');
    var territory=document.getElementById('territory');
    var zone=document.getElementById('baseZone');

    if(hasValue(country,'FR')&&country.value!=='FR'){country.value='FR';fire(country);}
    if(hasValue(territory,'FR-BORDEAUX')&&territory.value!=='FR-BORDEAUX'){territory.value='FR-BORDEAUX';fire(territory);}

    var target=ZONES[local]||'';
    if(target&&hasValue(zone,target)&&zone.value!==target){zone.value=target;fire(zone);}

    var done=country&&country.value==='FR'&&territory&&territory.value==='FR-BORDEAUX'&&(!target||(zone&&zone.value===target));
    if(!done&&tries<80)setTimeout(apply,100);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply);else apply();
})();
