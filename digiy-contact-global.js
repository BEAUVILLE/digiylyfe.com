/* DIGIYLYFE · Wrapper relais + doctrine commerciale · 2026-10-03 · v4 */
(function(){
  'use strict';
  function load(src,done){var s=document.createElement('script');s.src=src;s.async=false;if(done)s.onload=done;document.head.appendChild(s);}
  function patchTariffs(){
    if(!/\/tarifs-adherents-1\.html$/i.test(location.pathname||''))return;
    document.title='DIGIYLYFE — Carte digitale 15 000 FCFA · Présence PRO';
    var meta=document.querySelector('meta[name="description"]');if(meta)meta.content='Carte digitale DIGIY à 15 000 FCFA, paiement unique. Présence professionnelle DIGIYLYFE à 19 900 FCFA/mois en option. 0 % commission.';
    var section=document.getElementById('carte-gratuite');if(section)section.id='carte-digitale';
    var set=function(id,text){var e=document.getElementById(id);if(e)e.textContent=text;};
    set('freeKicker','CARTE DIGITALE DIGIY · PAIEMENT UNIQUE');
    set('freeTitle','Votre activité dans votre téléphone.');
    set('freeText','Carte digitale professionnelle personnalisée avec identité métier, contact direct, WhatsApp et QR code personnel.');
    var price=document.querySelector('.freePrice strong');if(price)price.textContent='15 000 FCFA';
    set('freePriceLabel','PAIEMENT UNIQUE · SANS ABONNEMENT OBLIGATOIRE');
    set('benefit1','Identité professionnelle');set('benefit2','QR code personnel');set('benefit3','WhatsApp / contact direct');set('benefit4','Partage illimité');
    set('freeCta','DEMANDER MA CARTE DIGITALE →');set('seeCard','VOIR UN EXEMPLE →');
    var cta=document.getElementById('freeCta');if(cta)cta.href='/carte-gratuite.html?country=sn';
    set('pathTitle','Votre carte peut ouvrir la porte vers DIGIYLYFE');
    set('pathText','Si vous le souhaitez, votre Carte DIGIY peut ensuite devenir votre porte d’entrée vers une présence professionnelle sur DIGIYLYFE à 19 900 FCFA / mois. Cette présence reste facultative.');
    var note=document.getElementById('memberNote');if(note)note.textContent='La Carte digitale est une prestation autonome à 15 000 FCFA. La présence professionnelle DIGIYLYFE à 19 900 FCFA / mois est facultative et permet d’être représenté sur le site. CARNET PRO reste un service distinct à 13 000 FCFA / mois.';
    document.querySelectorAll('.period,.desc,.proNote,.rule,.path').forEach(function(el){el.innerHTML=el.innerHTML.replace(/\s*·?\s*2 MOIS OFFERTS[^<]*/gi,'').replace(/2 mois offerts[^.<]*/gi,'');});
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
