/* DIGIYLYFE — MASTER PUBLIC · GARDE LOCAL V1
 * Complément du MASTER V2 : si TERRITOIRE transmet local, les présences réelles
 * sont resserrées sur ce secteur. Les places à prendre restent disponibles dans
 * le contexte affiché. Fail-closed : une présence sans correspondance locale
 * n'est pas montrée.
 */
(function(){'use strict';
var P=new URLSearchParams(location.search),local=(P.get('local')||'').trim(),lang=(P.get('lang')||'fr').slice(0,2).toLowerCase();
if(!local)return;
var TXT={
 fr:'Aucun adhérent réel rattaché à ce secteur pour le moment.',
 en:'No real member is attached to this area yet.',
 es:'Todavía no hay ningún miembro real vinculado a este sector.',
 pt:'Ainda não há nenhum aderente real ligado a este setor.',
 de:'Diesem Bereich ist derzeit noch kein echtes Mitglied zugeordnet.',
 it:'Al momento non ci sono aderenti reali collegati a questo settore.',
 nl:'Er is momenteel geen echt lid aan dit gebied gekoppeld.',
 ar:'لا يوجد عضو حقيقي مرتبط بهذا القطاع حالياً.'
};
function clean(v){return String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[-_]+/g,' ').replace(/\s+/g,' ').trim()}
function matches(text){var a=clean(text),b=clean(local);if(!a||!b)return false;if(a.indexOf(b)>=0)return true;var tokens=b.split(' ').filter(function(x){return x.length>2});return tokens.length>0&&tokens.every(function(x){return a.indexOf(x)>=0})}
function apply(){
 var root=document.getElementById('digiy-master-root');if(!root)return;
 var sections=root.querySelectorAll('main > section');if(sections.length<2)return;
 var real=sections[1],cards=real.querySelectorAll('.listing');
 Array.prototype.forEach.call(cards,function(card){var area=card.querySelector('.area');if(!area||!matches(area.textContent))card.remove()});
 if(!real.querySelector('.listing')&&!real.querySelector('.none')){var box=document.createElement('div');box.className='none';box.textContent=TXT[lang]||TXT.fr;real.appendChild(box)}
}
function boot(){apply();var root=document.getElementById('digiy-master-root');if(root)new MutationObserver(function(){setTimeout(apply,0)}).observe(root,{childList:true,subtree:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
