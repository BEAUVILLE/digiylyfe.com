import { readFileSync } from 'node:fs';
import { Script } from 'node:vm';
import assert from 'node:assert/strict';

const html=readFileSync('annuaire.html','utf8');
const external=readFileSync('annuaire-inscription-auto.js','utf8');
const sql=readFileSync('supabase/20261031_annuaire_volontaires.sql','utf8');
const departments=['commerce','batiment','artisanat','alimentation','beaute','mobilite','hebergement','tourisme','services','agriculture','autres'];

const inline=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
assert(inline.length>0,'Script principal absent');
for(const [,js] of inline) new Script(js,{filename:'annuaire-inline.js'});
new Script(external,{filename:'annuaire-inscription-auto.js'});

for(const id of ['departments','registration','name','activity','regDepartment','regCountry','city','whatsapp','consent','sitecheck','registrationSuccess','registrationStatus','publicLink','manageLink','copyPublic','copyManage','gestion','managementForm','managementStatus','editName','editActivity','editDepartment','editCountry','editCity','editWhatsapp','removeProfile']) {
  assert(html.includes('id="'+id+'"'),'Champ HTML manquant : '+id);
}
for(const d of departments) {
  assert(html.includes('value="'+d+'"'),'Département manquant : '+d);
  assert(sql.includes("'"+d+"'"),'Département SQL manquant : '+d);
}
assert(html.includes('annuaire-inscription-auto.js'),'Script d’inscription non chargé');
assert(html.includes('<h1>QUI FAIT QUOI ? <span>ET OÙ LE TROUVER ?</span></h1>'),'Nouvelle appellation publique manquante');
assert(html.includes('🔎 JE CHERCHE'),'Porte Je cherche manquante');
assert(html.includes('+ JE M’INSCRIS'),'Porte Je m’inscris manquante');
assert(html.includes('href="https://digiylyfe.com/annuaire.html"'),'URL canonique doit rester inchangée');
assert(html.includes('id="registration"'),'Formulaire d’inscription à conserver');
assert(html.includes('IMPORTANT — Gardez votre lien privé précieusement'),'Avertissement de sauvegarde du lien secret manquant');
assert(html.includes('Ne le partagez jamais'),'Avertissement de confidentialité manquant');
assert(html.includes('id="copyManage"'),'Copie du lien de gestion manquante');
assert(!html.includes('Envoyer ma demande sur WhatsApp'),'Ancien parcours WhatsApp encore actif');
assert(!html.includes('https://wa.me/221771342889?text='),'Ancien lien de collecte encore actif');
assert(html.includes('DIGIY_ANNUAIRE_REFRESH'),'Rafraîchissement immédiat manquant');
assert(html.includes('digiy_annuaire_volontaires'),'Lecture des volontaires absente');
assert(html.includes('departmentOf(p)'),'Classement par département manquant');
assert(html.includes('id="departmentNext"'),'Flèche droite des activités absente');
assert(html.includes('id="departmentPrev"'),'Flèche gauche des activités absente');
assert(html.includes('aria-label="Voir les activités suivantes"'),'Accessibilité de la flèche droite absente');
assert(html.includes('function updateDepartmentArrows()'),'Désactivation aux extrémités absente');
assert(html.includes('list.scrollBy({left:direction*distance'),'Défilement par les flèches absent');
assert(html.includes('root.scrollLeft=savedScroll'),'Position de défilement non préservée au filtrage');
assert(html.includes("matchZone(p,zo)"),'Filtre territorial manquant');
assert(external.includes('digiy_annuaire_inscrire')&&external.includes('digiy_annuaire_gerer'),'RPC manquantes');
assert(sql.includes('enable row level security'),'RLS manquante');
assert(sql.includes('grant select ('),'Lecture publique par colonnes attendue');
assert(sql.includes('revoke all on table'),'Restrictions de tables absentes');
assert(sql.includes('management_token_hash'),'Jeton de gestion absent');
assert(sql.includes('extensions.digest'),'Empreinte SHA-256 absente');
assert(sql.includes('TROP_DE_DEMANDES'),'Frein anti-spam absent');
assert(sql.includes('consent_public'),'Consentement absent');
console.log('OK — Annuaire DIGIY V2 : syntaxe JavaScript, champs, départements, lecture et garde-fous statiques.');
