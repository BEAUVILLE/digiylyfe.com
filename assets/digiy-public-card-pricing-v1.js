/* Public display only: no changes to the territorial Master or its data. */
(function(){
 var params=new URLSearchParams(location.search),zone=params.get('territory');
 if(!/^(casablanca|marrakech|miami)$/.test(zone||''))return;
 var pending={"fr": "Carte DIGIY Maroc : tarif à confirmer.", "en": "DIGIY Morocco card: price to be confirmed.", "es": "Tarjeta DIGIY Marruecos: precio por confirmar.", "pt": "Cartão DIGIY Marrocos: preço a confirmar.", "it": "Carta DIGIY Marocco: prezzo da confermare.", "de": "DIGIY-Karte Marokko: Preis noch zu bestätigen.", "nl": "DIGIY-kaart Marokko: prijs nog te bevestigen.", "ar": "بطاقة DIGIY المغرب: السعر بانتظار التأكيد."};
 function apply(){
  var l=(params.get('lang')||document.documentElement.lang||'fr').slice(0,2);
  document.querySelectorAll('.listing.open .chips span').forEach(function(el){
   if(/CARTE DIGIY GRATUITE · 0 MAD/.test(el.textContent))el.textContent=pending[l]||pending.fr;
   if(el.textContent==='DIGIY CARD · $0')el.textContent='DIGIY CARD · $20';
  });
 }
 apply();
 var root=document.getElementById('digiy-master-root');
 if(root)new MutationObserver(apply).observe(root,{childList:true,subtree:true});
})();
