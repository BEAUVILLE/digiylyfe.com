/* DIGIYLYFE carte gratuite - wrapper 2026-09-17 */
(function(){
  var base=document.createElement('script');
  base.src='https://digiylyfe.com/assets/digiy-card-intake-brief-v2-pre-membership-20260917.js?v=20260917-v2';
  base.async=false;
  base.onload=function(){
    var doctrine=document.createElement('script');
    doctrine.src='https://digiylyfe.com/assets/digiy-membership-visibility-v1.js?v=20260917-v2';
    doctrine.async=false;
    document.head.appendChild(doctrine);
  };
  document.head.appendChild(base);
})();
