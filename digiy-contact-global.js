/* DIGIYLYFE · Wrapper relais + doctrine adhesion · 2026-09-17 */
(function(){
  'use strict';
  function load(src,done){var s=document.createElement('script');s.src=src;s.async=false;if(done)s.onload=done;document.head.appendChild(s);}
  load('/digiy-contact-global-pre-membership-20260917.js?v=20260917-v1',function(){
    var p=(location.pathname||'/').replace(/\/+$/,'')||'/',h=(location.hostname||'').toLowerCase();
    if(/\/tarifs-adherents-1\.html$/i.test(p)||(h==='digiylyfe.com'&&(p==='/'||/\/index\.html$/i.test(p)))||(h==='digiy-hub.digiylyfe.com'&&(p==='/'||/\/index\.html$/i.test(p)))){
      load('/assets/digiy-membership-visibility-v1.js?v=20260917-v1');
    }
  });
})();
