// Pure adapter. No network, credentials, database writes or publication.
const LANGS=['fr','en','es','pt','it','de','nl','ar','wo','zh'];
const text=v=>typeof v==='string'?v.trim():'';
function requireThat(ok,msg){if(!ok)throw new Error(msg);}
function https(v){if(!text(v))return '';const u=new URL(v);requireThat(u.protocol==='https:'&&!u.username&&!u.password,'URL HTTPS publique requise');return u.href;}
function localized(content,key){return Object.fromEntries(LANGS.flatMap(l=>{const v=content[l];return v&&v._a_valider===false&&text(v[key])?[[l,text(v[key])]]:[]}));}
const phone=v=>{const s=text(v);requireThat(!s||/^\+?[0-9 ()-]{6,25}$/.test(s),'Téléphone invalide');return s;};
export function buildSite(d, options={}){
 requireThat(d?.validation?.dossier==='valide'||d?.validation?.dossier==='publie','Dossier non validé');
 requireThat(d.site?.demande===true&&['en_cours','livre'].includes(d.site.statut),'Prestation SITE non autorisée');
 const i=d.identite||{},p=d.presence||{},c=d.contenu_i18n||{};
 requireThat(text(i.nom_affiche)&&text(i.metier)&&text(i.ville)&&text(d.identifiant),'Identité incomplète');
 requireThat(c.fr?._a_valider===false,'FR non validé');
 const slug=text(options.slug);requireThat(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug),'Slug invalide');
 const media=options.media||{};
 const gallery=(media.gallery||[]).map(g=>({src:https(g.src),alt:text(g.alt)}));
 requireThat(gallery.every(g=>g.src),'Image galerie manquante');
 const hero=https(media.hero_image);
 const externalFolder=https(media.drive_folder);
 const maps=https(options.maps);
 const services=(c.fr.elements_metier||[]).slice(0,8).map(e=>({title:Object.fromEntries(LANGS.flatMap(l=>{const v=c[l];const m=Array.isArray(v?.elements_metier)?v.elements_metier.find(x=>x.id===e.id):null;return v?._a_valider===false&&text(m?.libelle)?[[l,text(m.libelle)]]:[]}))}));
 return {meta:{id:text(d.identifiant),slug,sector:text(options.sector),lang_default:'fr',langs:LANGS.slice(),url:https(options.site_url)},identity:{name:text(i.nom_affiche),activity:localized(c,'metier_label'),zone:[text(i.ville),text(i.pays)].filter(Boolean).join(' · '),tagline:localized(c,'accroche'),hero_image:hero,hero_video:https(media.hero_video)||null},contact:{phone:phone(p.telephone),whatsapp:phone(p.whatsapp),maps},about:{text:localized(c,'description')},services,gallery,proofs:[],card:{image:https(options.card_image),qr:https(options.qr_image),digiylyfe_url:https(options.card_url)},external_media:{drive_folder:externalFolder},_bridge:{version:1,state:'draft',human_review_required:true}};
}
