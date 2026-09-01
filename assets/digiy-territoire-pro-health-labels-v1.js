/* DIGIYLYFE — Libellés territoire : Services professionnels + Santé & soins V1
 * Exemples de catégories uniquement, jamais des professionnels fictifs.
 */
(function(){
  'use strict';
  if(window.DIGIY_TERRITORY_PRO_HEALTH_LABELS_V1)return;
  window.DIGIY_TERRITORY_PRO_HEALTH_LABELS_V1=true;

  var COPY={
    fr:{health:['Santé & soins','MÉDECIN · DENTISTE · INFIRMIER · SAGE-FEMME · AIDE À LA PERSONNE'],pro:['Services professionnels','AVOCAT · NOTAIRE · ARCHITECTE · COMPTABLE · GÉOMÈTRE · ASSUREUR']},
    en:{health:['Health & care','DOCTOR · DENTIST · NURSE · MIDWIFE · PERSONAL CARE'],pro:['Professional services','LAWYER · NOTARY · ARCHITECT · ACCOUNTANT · SURVEYOR · INSURER']},
    es:{health:['Salud y cuidados','MÉDICO · DENTISTA · ENFERMERÍA · MATRONA · AYUDA A LA PERSONA'],pro:['Servicios profesionales','ABOGADO · NOTARIO · ARQUITECTO · CONTABLE · TOPÓGRAFO · ASEGURADOR']},
    pt:{health:['Saúde & cuidados','MÉDICO · DENTISTA · ENFERMEIRO · PARTEIRA · APOIO À PESSOA'],pro:['Serviços profissionais','ADVOGADO · NOTÁRIO · ARQUITETO · CONTABILISTA · TOPÓGRAFO · SEGURADOR']},
    de:{health:['Gesundheit & Pflege','ARZT · ZAHNARZT · PFLEGEKRAFT · HEBAMME · ALLTAGSHILFE'],pro:['Professionelle Dienste','ANWALT · NOTAR · ARCHITEKT · BUCHHALTER · VERMESSER · VERSICHERER']},
    it:{health:['Salute & assistenza','MEDICO · DENTISTA · INFERMIERE · OSTETRICA · ASSISTENZA ALLA PERSONA'],pro:['Servizi professionali','AVVOCATO · NOTAIO · ARCHITETTO · COMMERCIALISTA · GEOMETRA · ASSICURATORE']},
    nl:{health:['Gezondheid & zorg','ARTS · TANDARTS · VERPLEEGKUNDIGE · VERLOSKUNDIGE · PERSOONLIJKE HULP'],pro:['Professionele diensten','ADVOCAAT · NOTARIS · ARCHITECT · BOEKHOUDER · LANDMETER · VERZEKERAAR']},
    ar:{health:['الصحة والرعاية','طبيب · طبيب أسنان · ممرض · قابلة · مساعدة شخصية'],pro:['الخدمات المهنية','محامٍ · موثق · مهندس معماري · محاسب · مسّاح · تأمين']}
  };

  function current(){var l=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();return COPY[l]||COPY.fr;}
  function findByIcon(icon){
    var buttons=document.querySelectorAll('#needs .need');
    for(var i=0;i<buttons.length;i++){
      var strong=buttons[i].querySelector('strong');
      if(strong&&strong.textContent.trim()===icon)return buttons[i];
    }
    return null;
  }
  function apply(){
    var t=current();
    var h=findByIcon('🩺');
    if(h){var hs=h.querySelector('span'),hm=h.querySelector('small');if(hs)hs.textContent=t.health[0];if(hm)hm.textContent=t.health[1];}
    var p=findByIcon('🏛️');
    if(p){var ps=p.querySelector('span'),pm=p.querySelector('small');if(ps)ps.textContent=t.pro[0];if(pm)pm.textContent=t.pro[1];}
  }
  function boot(){
    apply();
    var root=document.getElementById('needs');
    if(root)new MutationObserver(function(){apply();}).observe(root,{childList:true,subtree:true});
    new MutationObserver(function(){setTimeout(apply,0);}).observe(document.documentElement,{attributes:true,attributeFilter:['lang','dir']});
    setTimeout(apply,120);setTimeout(apply,500);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
