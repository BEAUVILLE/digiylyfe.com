(function(){
'use strict';
if(window.DIGIY_USA_WORLD_COPY_V1)return;window.DIGIY_USA_WORLD_COPY_V1=true;
const T={
fr:{intro:'Cinq portes réelles montrent aujourd’hui l’ouverture de DIGIYLYFE : Sénégal · Petite Côte et Dakar ; France · Vallée de la Dordogne et Bordeaux ; États-Unis · Miami. Choisissez votre territoire, puis votre besoin et votre zone.',global:'Sénégal et France actifs · Miami ouvre les États-Unis. Le monde suit progressivement.'},
en:{intro:'Five real doors now show DIGIYLYFE’s reach: Senegal · Petite Côte and Dakar; France · Dordogne Valley and Bordeaux; United States · Miami. Choose your territory, then your need and local area.',global:'Senegal and France are active · Miami opens the United States. The world follows progressively.'},
es:{intro:'Cinco puertas reales muestran hoy la apertura de DIGIYLYFE: Senegal · Petite Côte y Dakar; Francia · Valle del Dordoña y Burdeos; Estados Unidos · Miami. Elija su territorio, después su necesidad y su zona.',global:'Senegal y Francia están activos · Miami abre Estados Unidos. El mundo sigue progresivamente.'},
pt:{intro:'Cinco portas reais mostram hoje a abertura da DIGIYLYFE: Senegal · Petite Côte e Dakar; França · Vale da Dordogne e Bordéus; Estados Unidos · Miami. Escolha o território, depois a necessidade e a zona.',global:'Senegal e França estão ativos · Miami abre os Estados Unidos. O mundo segue progressivamente.'},
it:{intro:'Cinque porte reali mostrano oggi l’apertura di DIGIYLYFE: Senegal · Petite Côte e Dakar; Francia · Valle della Dordogna e Bordeaux; Stati Uniti · Miami. Scegli il territorio, poi il bisogno e la zona.',global:'Senegal e Francia sono attivi · Miami apre gli Stati Uniti. Il mondo segue progressivamente.'},
de:{intro:'Fünf reale Türen zeigen heute die Reichweite von DIGIYLYFE: Senegal · Petite Côte und Dakar; Frankreich · Dordogne-Tal und Bordeaux; Vereinigte Staaten · Miami. Wählen Sie Ihr Gebiet, dann Bedarf und Zone.',global:'Senegal und Frankreich sind aktiv · Miami öffnet die Vereinigten Staaten. Die Welt folgt schrittweise.'},
nl:{intro:'Vijf echte ingangen tonen vandaag de uitbreiding van DIGIYLYFE: Senegal · Petite Côte en Dakar; Frankrijk · Dordognevallei en Bordeaux; Verenigde Staten · Miami. Kies uw gebied, daarna uw behoefte en zone.',global:'Senegal en Frankrijk zijn actief · Miami opent de Verenigde Staten. De wereld volgt stap voor stap.'},
ar:{intro:'تُظهر خمس بوابات حقيقية اليوم توسع DIGIYLYFE: السنغال · Petite Côte وداكار؛ فرنسا · وادي دوردوني وبوردو؛ الولايات المتحدة · ميامي. اختر الإقليم ثم حاجتك والمنطقة المحلية.',global:'السنغال وفرنسا نشطتان · ميامي تفتح الولايات المتحدة. ويتوسع العالم تدريجيًا.'}
};
function lang(){const l=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();return T[l]?l:'fr'}
function apply(){const t=T[lang()];const intro=document.querySelector('[data-i18n="worldIntro"]');const global=document.querySelector('[data-i18n="globalLead"]');if(intro)intro.textContent=t.intro;if(global)global.textContent=t.global;}
apply();setTimeout(apply,50);setTimeout(apply,350);setTimeout(apply,1000);
try{new MutationObserver(apply).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});}catch(_){ }
document.addEventListener('click',function(e){if(e.target&&e.target.closest&&e.target.closest('[data-lang],[data-l]'))setTimeout(apply,0)},false);
})();
