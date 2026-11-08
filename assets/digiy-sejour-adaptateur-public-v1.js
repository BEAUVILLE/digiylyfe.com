/* DIGIYLYFE · ADAPTATEUR PUBLIC DE SÉJOUR V1
 * DONNÉES UNIQUEMENT : normalise des réponses publiques déjà autorisées.
 * N'effectue aucun appel réseau, n'ajoute aucune couverture et ne lit pas
 * les réservations ou champs privés. Non chargé sur une page de production.
 *
 * sources = {
 *   professionals: digiy_annuaire_public rows,
 *   trades: digiy_metiers rows,
 *   zones: digiy_zones rows,
 *   serviceZones: digiy_annuaire_public_zones rows
 * }
 */
(function(root, factory){
  'use strict';
  var api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  if(root)root.DIGIY_SEJOUR_ADAPTATEUR_V1=api;
})(typeof window!=='undefined'?window:null,function(){
  'use strict';
  function str(v){return typeof v==='string'?v.trim():'';}
  function arr(v){return Array.isArray(v)?v:[];}
  function digits(v){return str(v).replace(/\D/g,'');}
  function validPhone(v){var n=digits(v);return n.length>=8&&n.length<=15?n:'';}
  function moduleType(code, slug){
    var c=str(code).toUpperCase(),s=str(slug).toLowerCase();
    if(c==='DRIVER'||s==='chauffeur')return 'transport';
    if(c==='RESTO'||c==='RESA'||s==='restaurant')return 'food';
    if(c==='EXPLORE'||s==='explore-lieux')return 'explore';
    return '';
  }
  function normalize(sources){
    sources=sources||{};
    var trades=new Map(arr(sources.trades).map(function(m){return [m.id,m];}));
    var zones=new Map(arr(sources.zones).filter(function(z){return z&&z.is_active===true;}).map(function(z){return [z.id,z.slug];}));
    var coverage=new Map();
    arr(sources.serviceZones).forEach(function(z){
      if(!z||!zones.has(z.zone_id))return;
      if(!coverage.has(z.card_id))coverage.set(z.card_id,new Set());
      coverage.get(z.card_id).add(zones.get(z.zone_id));
    });
    return arr(sources.professionals).filter(function(p){
      return p&&p.is_public===true&&p.is_active===true&&p.entry_type==='professional';
    }).map(function(p){
      var trade=trades.get(p.metier_id)||{};
      var cap=moduleType(trade.module_code,trade.slug);
      var base=zones.get(p.zone_id)||'';
      var phone=validPhone(p.phone_public),wa=validPhone(p.whatsapp_public);
      var url=str(p.public_url);
      if(!/^https:\/\//i.test(url))url='';
      return {
        professional_id:str(p.id),name:str(p.display_name),need:cap,
        base_zone_id:base,service_zone_ids:Array.from(coverage.get(p.id)||[]),
        service_territory_ids:[],public_url:url,
        contacts:[wa?{kind:'whatsapp',phone:wa}:null,phone?{kind:'call',phone:phone}:null].filter(Boolean),
        is_active:true,is_public:true
      };
    }).filter(function(p){return p.professional_id&&p.need&&p.base_zone_id;});
  }
  return Object.freeze({normalize:normalize});
});
