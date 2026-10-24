/* DIGIYLYFE · Wrapper relais + doctrine commerciale · 2026-10-03 · v4 */
(function(){
  'use strict';
  function load(src,done){var s=document.createElement('script');s.src=src;s.async=false;if(done)s.onload=done;document.head.appendChild(s);}
  function patchTariffs(){
    if(!/\/tarifs-adherents-1\.html$/i.test(location.pathname||''))return;
    // Keep the page's country-aware WORLD8 renderer as the only pricing source.
    if(typeof render==='function')render();
  }
  load('https://digiylyfe.com/digiy-contact-global-pre-membership-20260917.js?v=20260926-single-sw-v1',function(){
    var p=(location.pathname||'/').replace(/\/+$/,'')||'/',h=(location.hostname||'').toLowerCase();
    var home=h==='digiylyfe.com'&&(p==='/'||/\/index\.html$/i.test(p));
    var tariffs=/\/tarifs-adherents-1\.html$/i.test(p);
    if(tariffs||home||(h==='digiy-hub.digiylyfe.com'&&(p==='/'||/\/index\.html$/i.test(p))))load('https://digiylyfe.com/assets/digiy-membership-visibility-v1.js?v=20260917-v3');
    if(home)load('https://digiylyfe.com/assets/digiy-home-membership-price-v1.js?v=20260926-price-script-fix-v1');
    if(tariffs)load('https://digiylyfe.com/assets/digiy-tarifs-membership-bridge-v1.js?v=20260917-v1',function(){patchTariffs();setTimeout(patchTariffs,250);setTimeout(patchTariffs,1000);});
  });
})();
