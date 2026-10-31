import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const html=readFileSync('index.html','utf8');
const form=readFileSync('assets/digiy-campus-interest-v2.js','utf8');
const match=html.match(/<section class="digiyCampus"[\s\S]*?<\/section>/);
assert(match,'Section CAMPUS absente');
const block=match[0];
assert(block.includes('Aidez votre entourage à être visible sur le web grâce à la plateforme DIGIYLYFE.'),'Promesse CAMPUS absente');
assert(block.includes('sans rémunération'),'Relais bénévoles non précisés');
assert(block.includes('Aucun salaire, prime ni commission'),'Absence de commission non précisée');
assert(block.includes('href="/annuaire.html#inscription"'),'Inscription gratuite non liée');
assert(block.includes('href="/tarifs-adherents-1.html"'),'Tarifs PRO non liés');
for(const term of ['2 500 FCFA','25 000 FCFA','rémunération récurrente','Exemples de rémunération'])
  assert(!block.includes(term),'Ancien schéma de commission affiché : '+term);
const line=html.split('\n').find(x=>x.includes('var TEXT='));
assert(line,'Dictionnaire multilingue absent');
const dict=JSON.parse(line.slice(line.indexOf('var TEXT=')+9,-1));
for(const lang of ['fr','en','es','pt','it','de','nl','ar']){
  const d=dict[lang];assert(d,'Langue absente : '+lang);
  for(const key of ['campusTagline','campusIntro','campusMoneyTitle','campusMoneyText','campusFine','campusStep1','campusStep2','campusStep3','campusFreeLink','campusProLink','campusStatus','campusCta'])
    assert(d[key],lang+' : '+key+' manquant');
  for(const key of ['campusMoneyTitle','campusMoneyText','campusFine'])
    assert(!/2[\s.,]?500|FCFA|25[\s.,]?000|50[\s.,]?000|100[\s.,]?000/.test(d[key]),lang+' : ancien calcul de commissions');
}
assert(form.includes('digiy-campus-whatsapp-zero-api'),'Formulaire CAMPUS existant absent');
assert(html.includes('src="/assets/digiy-campus-interest-v2.js'),'Formulaire CAMPUS non chargé');
console.log('OK — CAMPUS : mission entraide, accès gratuit/PRO, 8 langues, ancienne rémunération retirée.');
