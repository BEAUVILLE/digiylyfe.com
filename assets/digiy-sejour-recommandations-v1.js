/* DIGIYLYFE — recommandations de séjour V1 (pilote isolé)
 * Module de sélection pur : aucune requête, aucun stockage, aucune mutation,
 * aucune injection DOM, aucune connexion à un service externe.
 * NON BRANCHÉ EN PRODUCTION. Une présence est éligible uniquement si sa
 * publication, ses coordonnées et sa couverture sont validées en amont.
 *
 * Entrée : records normalisés par le futur adaptateur commun.
 * record = {professional_id, need, capability, base_zone_id, service_zone_ids,
 *   service_territory_ids, public_url, contacts, is_public, is_active}
 * context = {zone_id, territory_id, max_per_category}
 */
(function(root,factory){
  'use strict';
  var api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  if(root)root.DIGIY_SEJOUR_RECO_V1=api;
})(typeof window!=='undefined'?window:null,function(){
  'use strict';
  var CATEGORIES=['transport','food','explore'];
  function clean(v){return typeof v==='string'?v.trim():''}
  function asArray(v){return Array.isArray(v)?v:[]}
  function category(pro){
    var need=clean(pro.need).toLowerCase();
    var cap=clean(pro.capability).toLowerCase();
    if(need==='transport'||cap==='driver')return 'transport';
    if(need==='food'||cap==='resto')return 'food';
    if(need==='explore'||cap==='explore')return 'explore';
    return '';
  }
  function eligible(pro,context){
    if(!pro||pro.is_active!==true||pro.is_public!==true)return false;
    if(!clean(pro.professional_id)||!clean(context.zone_id))return false;
    if(!clean(pro.public_url)&&!asArray(pro.contacts).some(function(c){return c&&['call','whatsapp'].includes(c.kind)&&clean(c.phone)}))return false;
    return pro.base_zone_id===context.zone_id
      ||asArray(pro.service_zone_ids).includes(context.zone_id)
      ||(!!clean(context.territory_id)&&asArray(pro.service_territory_ids).includes(context.territory_id));
  }
  function recommend(records,context){
    context=context||{};
    var limit=Math.min(6,Math.max(1,Math.floor(Number(context.max_per_category)||3)));
    var seen=new Set();
    var out={transport:[],food:[],explore:[]};
    asArray(records).forEach(function(pro){
      var kind=pro&&category(pro),id=pro&&clean(pro.professional_id);
      if(!kind||!eligible(pro,context)||seen.has(id))return;
      seen.add(id);
      if(out[kind].length<limit)out[kind].push(pro);
    });
    return out;
  }
  return Object.freeze({categories:CATEGORIES.slice(),recommend:recommend,eligible:eligible});
});
