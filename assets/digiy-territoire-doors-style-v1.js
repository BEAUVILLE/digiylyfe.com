/* DIGIYLYFE — TERRITOIRE · STYLE UNIFIÉ DES PORTES V2
 * Une seule structure visuelle pour toutes les portes métier du territoire.
 * Référence : SERVICE DE NETTOYAGE = icône + titre + ligne métier/module.
 * Aucun routage ni moteur métier n'est modifié.
 */
(function(){'use strict';
var STYLE_ID='digiyTerritoryUnifiedDoorsStyle';
var LANGS=['fr','en','es','pt','de','it','nl','ar'];
var META={
 fr:{'⚡':'BONNE AFFAIRE · Annonces & contact direct','🚗':'DRIVER · Chauffeurs & mobilité','🔧':'BUILD · Artisans & chantiers','🏠':'LOC · Logements & locations','🍽️':'RESTO · Restaurants & réservations','🛍️':'MON COMMERCE · Boutiques & produits','💅':'BEAUTÉ & BIEN-ÊTRE · Soins & rendez-vous','💼':'JOBS · Emploi & missions','🎙️':'LA VOIX · ACTION PRO'},
 en:{'⚡':'BONNE AFFAIRE · Listings & direct contact','🚗':'DRIVER · Drivers & mobility','🔧':'BUILD · Trades & worksites','🏠':'LOC · Accommodation & rentals','🍽️':'RESTO · Restaurants & bookings','🛍️':'MON COMMERCE · Shops & products','💅':'BEAUTY & WELLNESS · Care & appointments','💼':'JOBS · Jobs & missions','🎙️':'THE VOICE · ACTION PRO'},
 es:{'⚡':'BONNE AFFAIRE · Anuncios y contacto directo','🚗':'DRIVER · Conductores y movilidad','🔧':'BUILD · Artesanos y obras','🏠':'LOC · Alojamientos y alquileres','🍽️':'RESTO · Restaurantes y reservas','🛍️':'MON COMMERCE · Tiendas y productos','💅':'BELLEZA Y BIENESTAR · Cuidados y citas','💼':'JOBS · Empleo y misiones','🎙️':'LA VOZ · ACTION PRO'},
 pt:{'⚡':'BONNE AFFAIRE · Anúncios e contacto direto','🚗':'DRIVER · Motoristas e mobilidade','🔧':'BUILD · Artesãos e obras','🏠':'LOC · Alojamentos e alugueres','🍽️':'RESTO · Restaurantes e reservas','🛍️':'MON COMMERCE · Lojas e produtos','💅':'BELEZA E BEM-ESTAR · Cuidados e marcações','💼':'JOBS · Emprego e missões','🎙️':'A VOZ · ACTION PRO'},
 de:{'⚡':'BONNE AFFAIRE · Anzeigen & Direktkontakt','🚗':'DRIVER · Fahrer & Mobilität','🔧':'BUILD · Handwerk & Baustellen','🏠':'LOC · Unterkünfte & Vermietung','🍽️':'RESTO · Restaurants & Reservierungen','🛍️':'MON COMMERCE · Geschäfte & Produkte','💅':'BEAUTY & WELLNESS · Pflege & Termine','💼':'JOBS · Arbeit & Aufträge','🎙️':'DIE STIMME · ACTION PRO'},
 it:{'⚡':'BONNE AFFAIRE · Annunci e contatto diretto','🚗':'DRIVER · Autisti e mobilità','🔧':'BUILD · Artigiani e cantieri','🏠':'LOC · Alloggi e affitti','🍽️':'RESTO · Ristoranti e prenotazioni','🛍️':'MON COMMERCE · Negozi e prodotti','💅':'BELLEZZA E BENESSERE · Trattamenti e appuntamenti','💼':'JOBS · Lavoro e incarichi','🎙️':'LA VOCE · ACTION PRO'},
 nl:{'⚡':'BONNE AFFAIRE · Advertenties & direct contact','🚗':'DRIVER · Chauffeurs & mobiliteit','🔧':'BUILD · Vakmensen & werken','🏠':'LOC · Verblijf & verhuur','🍽️':'RESTO · Restaurants & reservaties','🛍️':'MON COMMERCE · Winkels & producten','💅':'BEAUTY & WELLNESS · Verzorging & afspraken','💼':'JOBS · Werk & opdrachten','🎙️':'DE STEM · ACTION PRO'},
 ar:{'⚡':'BONNE AFFAIRE · إعلانات وتواصل مباشر','🚗':'DRIVER · سائقون وتنقل','🔧':'BUILD · حرفيون وأشغال','🏠':'LOC · سكن وإيجار','🍽️':'RESTO · مطاعم وحجوزات','🛍️':'MON COMMERCE · متاجر ومنتجات','💅':'الجمال والعافية · عناية ومواعيد','💼':'JOBS · وظائف ومهام','🎙️':'الصوت · ACTION PRO'}
};
function lang(){var l=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();return LANGS.indexOf(l)>=0?l:'fr'}
function installStyle(){
 if(document.getElementById(STYLE_ID))return;
 var s=document.createElement('style');s.id=STYLE_ID;
 s.textContent=[
 '#needs .need{display:flex!important;flex-direction:column!important;align-items:flex-start!important;width:100%!important;min-height:112px!important;border:1px solid rgba(94,234,212,.62)!important;border-radius:20px!important;padding:14px!important;background:linear-gradient(145deg,rgba(94,234,212,.13),rgba(34,197,94,.10))!important;color:#fff!important;text-align:left!important;text-decoration:none!important;box-shadow:inset 0 0 0 1px rgba(255,255,255,.025),0 10px 24px rgba(0,0,0,.08)!important;transition:border-color .15s ease,background .15s ease,transform .15s ease!important;}',
 '#needs .need:hover{border-color:rgba(246,196,83,.80)!important;background:linear-gradient(145deg,rgba(94,234,212,.17),rgba(34,197,94,.14))!important;transform:translateY(-1px)!important;}',
 '#needs .need.active{border-color:rgba(246,196,83,.88)!important;background:linear-gradient(145deg,rgba(246,196,83,.18),rgba(34,197,94,.13))!important;}',
 '#needs .need strong{display:block!important;font-size:26px!important;line-height:1!important;}',
 '#needs .need span{display:block!important;margin-top:8px!important;font-weight:950!important;line-height:1.15!important;}',
 '#needs .need small{display:block!important;margin-top:6px!important;color:rgba(255,250,240,.78)!important;font-size:10px!important;line-height:1.3!important;font-weight:850!important;}',
 '#needs .need .digiyUnifiedDoorMeta{margin-top:auto!important;padding-top:8px!important;}',
 'html[dir="rtl"] #needs .need{text-align:right!important;align-items:flex-end!important;}',
 '@media(max-width:430px){#needs .need{min-height:102px!important;padding:12px!important;}#needs .need strong{font-size:22px!important;}}'
 ].join('');document.head.appendChild(s);
}
function decorate(){
 var root=document.getElementById('needs');if(!root)return;
 var pack=META[lang()]||META.fr;
 root.querySelectorAll('.need').forEach(function(n){
   n.setAttribute('data-digiy-unified-door-style','2');
   if(n.hasAttribute('data-digiy-cleaning-door')||n.hasAttribute('data-digiy-resa-multi-door'))return;
   var ic=n.querySelector('strong'),icon=ic&&ic.textContent.trim(),text=pack[icon];
   if(!text)return;
   var meta=n.querySelector('.digiyUnifiedDoorMeta');
   if(!meta){meta=document.createElement('small');meta.className='digiyUnifiedDoorMeta';n.appendChild(meta)}
   meta.textContent=text;
 });
}
function apply(){installStyle();decorate()}
function boot(){apply();var root=document.getElementById('needs');if(root)new MutationObserver(function(){decorate()}).observe(root,{childList:true,subtree:true});document.addEventListener('click',function(e){if(e.target.closest&&e.target.closest('[data-lang]'))setTimeout(decorate,100)});window.addEventListener('popstate',function(){setTimeout(decorate,60)})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
