/* DIGIYLYFE — préremplissage adhésion Dakar V1
 * Une seule adhésion. Le besoin choisi sert uniquement à orienter le dossier métier.
 */
(function(){
  'use strict';
  var q=new URLSearchParams(location.search);
  if((q.get('territory')||'').toLowerCase()!=='dakar')return;

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
    announcements:'Annonces / Services',
    guidance:'Communication / LA VOIX'
  };
  var ZONES={
    plateau:'SN-DAKAR-PLATEAU',
    'almadies-ngor':'SN-DAKAR-ALMADIES-NGOR',
    'mermoz-sacre-coeur':'SN-DAKAR-MERMOZ-SACRE-COEUR',
    'point-e-fann':'SN-DAKAR-POINT-E-FANN',
    'yoff-ouakam-mamelles':'SN-DAKAR-YOFF-OUAKAM-MAMELLES'
  };

  function fire(el){if(el)el.dispatchEvent(new Event('change',{bubbles:true}));}
  function hasValue(sel,value){return !!sel&&Array.prototype.some.call(sel.options,function(o){return o.value===value;});}

  function setJob(){
    var el=document.getElementById('job');
    if(el&&JOBS[need]&&!el.value)el.value=JOBS[need];
  }

  function banner(){
    if(document.querySelector('[data-digiy-dakar-dossier-context]'))return;
    var form=document.getElementById('form');if(!form)return;
    var box=document.createElement('div');
    box.setAttribute('data-digiy-dakar-dossier-context','1');
    box.style.cssText='margin:0 0 14px;padding:12px 14px;border:1px solid #f6c45366;border-radius:16px;background:#f6c4530d;color:#fff3cf;font-weight:1000;line-height:1.4';
    box.textContent='DIGIY DAKAR · '+(JOBS[need]||'Adhérent professionnel')+(local?' · '+local.replace(/-/g,' '):'');
    form.insertBefore(box,form.firstChild);
  }

  var tries=0;
  function apply(){
    tries++;
    setJob();banner();
    var country=document.getElementById('country');
    var territory=document.getElementById('territory');
    var zone=document.getElementById('baseZone');

    if(hasValue(country,'SN')&&country.value!=='SN'){country.value='SN';fire(country);}
    if(hasValue(territory,'SN-DAKAR')&&territory.value!=='SN-DAKAR'){territory.value='SN-DAKAR';fire(territory);}

    var target=ZONES[local]||'';
    if(target&&hasValue(zone,target)&&zone.value!==target){zone.value=target;fire(zone);}

    var done=country&&country.value==='SN'&&territory&&territory.value==='SN-DAKAR'&&(!target||(zone&&zone.value===target));
    if(!done&&tries<80)setTimeout(apply,100);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply);else apply();
})();
