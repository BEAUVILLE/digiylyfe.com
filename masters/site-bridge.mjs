// Pure adapter. No network, credentials, database writes or publication.
const LANGS=['fr','en','es','pt','it','de','nl','ar','wo','zh'];
const text=v=>typeof v==='string'?v.trim():'';
function requireThat(ok,msg){if(!ok)throw new Error(msg);}
function https(v){if(v==null)return '';requireThat(typeof v==='string','URL HTTPS publique requise');if(!text(v))return '';let u;try{u=new URL(v);}catch{throw new Error('URL HTTPS publique requise');}requireThat(u.protocol==='https:'&&!u.username&&!u.password,'URL HTTPS publique requise');return u.href;}
function localized(content,key){return Object.fromEntries(LANGS.flatMap(l=>{const v=content[l];return v&&v._a_valider===false&&text(v[key])?[[l,text(v[key])]]:[]}));}
const phone=v=>{requireThat(v==null||typeof v==='string','Téléphone invalide');const s=text(v);requireThat(!s||(/^\+?[0-9 ()-]{6,25}$/.test(s)&&s.replace(/\D/g,'').length>=6),'Téléphone invalide');return s;};
const validId=id=>typeof id==='string'?!!text(id):typeof id==='number'&&Number.isFinite(id);
export function buildSite(d, options={}){
 requireThat(d?.validation?.dossier==='valide'||d?.validation?.dossier==='publie','Dossier non validé');
 requireThat(d.site?.demande===true&&['en_cours','livre'].includes(d.site.statut),'Prestation SITE non autorisée');
 const i=d.identite||{},p=d.presence||{},c=d.contenu_i18n||{};
 requireThat(text(i.nom_affiche)&&text(i.metier)&&text(i.ville)&&text(d.identifiant),'Identité incomplète');
 requireThat(c.fr?._a_valider===false,'FR non validé');
 requireThat(text(c.fr.metier_label),'Activité FR manquante');
 const slug=text(options.slug);requireThat(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug),'Slug invalide');
 const media=options.media??{};
 requireThat(typeof media==='object'&&!Array.isArray(media),'Médias invalides');
 const entries=media.gallery??[];
 requireThat(Array.isArray(entries)&&entries.every(g=>g&&typeof g==='object'&&!Array.isArray(g)),'Galerie invalide');
 const gallery=entries.map(g=>({src:https(g.src),alt:text(g.alt)}));
 requireThat(gallery.every(g=>g.src),'Image galerie manquante');
 const hero=https(media.hero_image);
 const externalFolder=https(media.drive_folder);
 const maps=https(options.maps);
 const source=c.fr.elements_metier??[];
 requireThat(Array.isArray(source),'Prestations FR invalides');
 const services=source.slice(0,8).map(e=>{
  requireThat(text(e?.libelle),'Libellé prestation FR manquant');
  const unambiguous=validId(e.id)&&source.filter(x=>x?.id===e.id).length===1;
  return {title:Object.fromEntries(LANGS.flatMap(l=>{
   if(l==='fr')return [[l,text(e.libelle)]];
   const v=c[l];
   if(!unambiguous||v?._a_valider!==false||!Array.isArray(v.elements_metier))return [];
   const matches=v.elements_metier.filter(x=>x?.id===e.id);
   return matches.length===1&&text(matches[0]?.libelle)?[[l,text(matches[0].libelle)]]:[];
  }))};
 });
 return {meta:{id:text(d.identifiant),slug,sector:text(options.sector),lang_default:'fr',langs:LANGS.slice(),url:https(options.site_url)},identity:{name:text(i.nom_affiche),activity:localized(c,'metier_label'),zone:[text(i.ville),text(i.pays)].filter(Boolean).join(' · '),tagline:localized(c,'accroche'),hero_image:hero,hero_video:https(media.hero_video)||null},contact:{phone:phone(p.telephone),whatsapp:phone(p.whatsapp),maps},about:{text:localized(c,'description')},services,gallery,proofs:[],card:{image:https(options.card_image),qr:https(options.qr_image),digiylyfe_url:https(options.card_url)},external_media:{drive_folder:externalFolder},_bridge:{version:1,state:'draft',human_review_required:true}};
}
