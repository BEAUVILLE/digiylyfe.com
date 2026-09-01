/* DIGIYLYFE — COM MAÎTRE V1 · 2026-09-01
 * Portée : vitrine principale uniquement (/ ou /index.html).
 * Mission : faire passer la marque avant les outils.
 * Invariants : architecture, liens, territoires, PWA, QR et moteurs inchangés.
 */
(function(){
  'use strict';
  if(window.DIGIY_COM_MAITRE_V1)return;
  var path=(location.pathname||'/').replace(/\/+$/,'')||'/';
  if(path!=='/'&&!/\/index\.html$/i.test(path))return;
  window.DIGIY_COM_MAITRE_V1=true;

  var COPY={
    fr:{
      meta:'DIGIYLYFE donne au professionnel une présence numérique visible, partageable et durable. Votre identité, vos données, votre relation client. Une source. Tous les canaux.',
      claimLead:'Votre savoir-faire mérite une présence qui vous ressemble.',
      claimWorld:'Votre identité. Vos données. Votre relation directe.',
      kicker:'VOTRE PRÉSENCE NUMÉRIQUE · À VOTRE IMAGE',
      heroTitle:'Votre savoir-faire. Votre identité. Vos objectifs.',
      heroLead:'DIGIYLYFE vous offre ses ailes pour aller plus loin.',
      offerTag:'UNE PRÉSENCE QUI GRANDIT AVEC VOUS',
      offerTitle:'Votre empreinte numérique DIGIYLYFE',
      offerText:'Carte digitale · QR permanent · présence territoriale · contact direct · partage · installation sur téléphone · 8 langues.',
      f1Title:'Identité visible',
      f1Text:'Nous personnalisons votre présence pour qu’elle soit claire, reconnaissable et partageable.',
      f2Title:'Vos données restent les vôtres',
      f2Text:'Votre identité professionnelle et vos informations restent sous votre contrôle.',
      f3Title:'Relation directe',
      f3Text:'Nous vous donnons les moyens de prolonger et de fidéliser la relation avec vos clients.',
      f4Title:'Des ailes pour avancer',
      f4Text:'Votre présence peut grandir avec votre activité et vos objectifs.',
      doctrineTitle:'Votre savoir-faire. Votre identité. Vos objectifs.',
      doctrineText:'DIGIYLYFE vous offre ses ailes pour aller plus loin.',
      proofLead:'Des métiers différents. Une même ambition : rendre leur savoir-faire visible, partageable et directement accessible.',
      proofInvite:'Commencez par votre carte. Votre présence pourra grandir avec votre activité.',
      footerTag:'Votre savoir-faire. Votre identité. Vos objectifs.',
      cardSecTitle:'Votre carte DIGIYLYFE',
      cardSecText:'Votre premier point d’ancrage numérique : un QR permanent, un contact direct et une présence que vous pouvez partager et garder sur votre téléphone.'
    },
    en:{
      meta:'DIGIYLYFE gives professionals a visible, shareable and lasting digital presence. Your identity, your data, your customer relationship. One source. Every channel.',
      claimLead:'Your know-how deserves a presence that reflects who you are.',
      claimWorld:'Your identity. Your data. Your direct customer relationship.',
      kicker:'YOUR DIGITAL PRESENCE · MADE AROUND YOU',
      heroTitle:'Your know-how. Your identity. Your goals.',
      heroLead:'DIGIYLYFE gives you wings to go further.',
      offerTag:'A PRESENCE THAT GROWS WITH YOU',
      offerTitle:'Your DIGIYLYFE digital footprint',
      offerText:'Digital card · permanent QR · territorial presence · direct contact · sharing · home-screen access · 8 languages.',
      f1Title:'A visible identity',
      f1Text:'We personalize your presence so it is clear, recognizable and easy to share.',
      f2Title:'Your data stays yours',
      f2Text:'Your professional identity and information stay under your control.',
      f3Title:'Direct relationship',
      f3Text:'We give you the tools to extend and strengthen the relationship with your customers.',
      f4Title:'Wings to move forward',
      f4Text:'Your presence can grow with your activity and your goals.',
      doctrineTitle:'Your know-how. Your identity. Your goals.',
      doctrineText:'DIGIYLYFE gives you wings to go further.',
      proofLead:'Different professions. One ambition: make their know-how visible, shareable and directly accessible.',
      proofInvite:'Start with your card. Your presence can grow with your activity.',
      footerTag:'Your know-how. Your identity. Your goals.',
      cardSecTitle:'Your DIGIYLYFE card',
      cardSecText:'Your first digital anchor: a permanent QR, direct contact and a presence you can share and keep on your phone.'
    },
    es:{
      meta:'DIGIYLYFE ofrece al profesional una presencia digital visible, compartible y duradera. Su identidad, sus datos, su relación con los clientes. Una fuente. Todos los canales.',
      claimLead:'Su saber hacer merece una presencia que se parezca a usted.',
      claimWorld:'Su identidad. Sus datos. Su relación directa con sus clientes.',
      kicker:'SU PRESENCIA DIGITAL · A SU IMAGEN',
      heroTitle:'Su saber hacer. Su identidad. Sus objetivos.',
      heroLead:'DIGIYLYFE le da alas para llegar más lejos.',
      offerTag:'UNA PRESENCIA QUE CRECE CON USTED',
      offerTitle:'Su huella digital DIGIYLYFE',
      offerText:'Tarjeta digital · QR permanente · presencia territorial · contacto directo · compartir · acceso desde la pantalla de inicio · 8 idiomas.',
      f1Title:'Identidad visible',
      f1Text:'Personalizamos su presencia para que sea clara, reconocible y fácil de compartir.',
      f2Title:'Sus datos siguen siendo suyos',
      f2Text:'Su identidad profesional y su información permanecen bajo su control.',
      f3Title:'Relación directa',
      f3Text:'Le damos los medios para prolongar y fortalecer la relación con sus clientes.',
      f4Title:'Alas para avanzar',
      f4Text:'Su presencia puede crecer con su actividad y sus objetivos.',
      doctrineTitle:'Su saber hacer. Su identidad. Sus objetivos.',
      doctrineText:'DIGIYLYFE le da alas para llegar más lejos.',
      proofLead:'Profesiones diferentes. Una misma ambición: hacer su saber hacer visible, compartible y directamente accesible.',
      proofInvite:'Empiece con su tarjeta. Su presencia podrá crecer con su actividad.',
      footerTag:'Su saber hacer. Su identidad. Sus objetivos.',
      cardSecTitle:'Su tarjeta DIGIYLYFE',
      cardSecText:'Su primer punto de anclaje digital: un QR permanente, contacto directo y una presencia que puede compartir y guardar en su teléfono.'
    },
    pt:{
      meta:'A DIGIYLYFE oferece ao profissional uma presença digital visível, partilhável e duradoura. A sua identidade, os seus dados, a sua relação com os clientes. Uma fonte. Todos os canais.',
      claimLead:'O seu saber-fazer merece uma presença à sua imagem.',
      claimWorld:'A sua identidade. Os seus dados. A sua relação direta com os clientes.',
      kicker:'A SUA PRESENÇA DIGITAL · À SUA IMAGEM',
      heroTitle:'O seu saber-fazer. A sua identidade. Os seus objetivos.',
      heroLead:'A DIGIYLYFE dá-lhe asas para ir mais longe.',
      offerTag:'UMA PRESENÇA QUE CRESCE CONSIGO',
      offerTitle:'A sua pegada digital DIGIYLYFE',
      offerText:'Cartão digital · QR permanente · presença territorial · contacto direto · partilha · acesso no ecrã inicial · 8 idiomas.',
      f1Title:'Identidade visível',
      f1Text:'Personalizamos a sua presença para que seja clara, reconhecível e fácil de partilhar.',
      f2Title:'Os seus dados continuam a ser seus',
      f2Text:'A sua identidade profissional e as suas informações permanecem sob o seu controlo.',
      f3Title:'Relação direta',
      f3Text:'Damos-lhe os meios para prolongar e reforçar a relação com os seus clientes.',
      f4Title:'Asas para avançar',
      f4Text:'A sua presença pode crescer com a sua atividade e os seus objetivos.',
      doctrineTitle:'O seu saber-fazer. A sua identidade. Os seus objetivos.',
      doctrineText:'A DIGIYLYFE dá-lhe asas para ir mais longe.',
      proofLead:'Profissões diferentes. Uma mesma ambição: tornar o saber-fazer visível, partilhável e diretamente acessível.',
      proofInvite:'Comece pelo seu cartão. A sua presença poderá crescer com a sua atividade.',
      footerTag:'O seu saber-fazer. A sua identidade. Os seus objetivos.',
      cardSecTitle:'O seu cartão DIGIYLYFE',
      cardSecText:'O seu primeiro ponto de apoio digital: um QR permanente, contacto direto e uma presença que pode partilhar e guardar no seu telefone.'
    },
    it:{
      meta:'DIGIYLYFE offre al professionista una presenza digitale visibile, condivisibile e duratura. La tua identità, i tuoi dati, la relazione con i clienti. Una fonte. Tutti i canali.',
      claimLead:'Il tuo savoir-faire merita una presenza che ti rappresenti.',
      claimWorld:'La tua identità. I tuoi dati. Il tuo rapporto diretto con i clienti.',
      kicker:'LA TUA PRESENZA DIGITALE · SU MISURA',
      heroTitle:'Il tuo savoir-faire. La tua identità. I tuoi obiettivi.',
      heroLead:'DIGIYLYFE ti dà le ali per andare più lontano.',
      offerTag:'UNA PRESENZA CHE CRESCE CON TE',
      offerTitle:'La tua impronta digitale DIGIYLYFE',
      offerText:'Biglietto digitale · QR permanente · presenza territoriale · contatto diretto · condivisione · accesso dalla schermata Home · 8 lingue.',
      f1Title:'Identità visibile',
      f1Text:'Personalizziamo la tua presenza perché sia chiara, riconoscibile e facile da condividere.',
      f2Title:'I tuoi dati restano tuoi',
      f2Text:'La tua identità professionale e le tue informazioni restano sotto il tuo controllo.',
      f3Title:'Rapporto diretto',
      f3Text:'Ti diamo gli strumenti per prolungare e rafforzare il rapporto con i tuoi clienti.',
      f4Title:'Ali per andare avanti',
      f4Text:'La tua presenza può crescere insieme alla tua attività e ai tuoi obiettivi.',
      doctrineTitle:'Il tuo savoir-faire. La tua identità. I tuoi obiettivi.',
      doctrineText:'DIGIYLYFE ti dà le ali per andare più lontano.',
      proofLead:'Professioni diverse. Una stessa ambizione: rendere il savoir-faire visibile, condivisibile e direttamente accessibile.',
      proofInvite:'Inizia dalla tua carta. La tua presenza potrà crescere con la tua attività.',
      footerTag:'Il tuo savoir-faire. La tua identità. I tuoi obiettivi.',
      cardSecTitle:'La tua carta DIGIYLYFE',
      cardSecText:'Il tuo primo punto di riferimento digitale: un QR permanente, contatto diretto e una presenza che puoi condividere e tenere sul telefono.'
    },
    de:{
      meta:'DIGIYLYFE gibt Profis eine sichtbare, teilbare und dauerhafte digitale Präsenz. Ihre Identität, Ihre Daten, Ihre Kundenbeziehung. Eine Quelle. Alle Kanäle.',
      claimLead:'Ihr Können verdient eine digitale Präsenz, die zu Ihnen passt.',
      claimWorld:'Ihre Identität. Ihre Daten. Ihre direkte Kundenbeziehung.',
      kicker:'IHRE DIGITALE PRÄSENZ · SO INDIVIDUELL WIE SIE',
      heroTitle:'Ihr Können. Ihre Identität. Ihre Ziele.',
      heroLead:'DIGIYLYFE gibt Ihnen Flügel, um weiterzukommen.',
      offerTag:'EINE PRÄSENZ, DIE MIT IHNEN WÄCHST',
      offerTitle:'Ihr digitaler Fußabdruck mit DIGIYLYFE',
      offerText:'Digitale Karte · dauerhafter QR · territoriale Präsenz · direkter Kontakt · Teilen · Zugriff vom Startbildschirm · 8 Sprachen.',
      f1Title:'Sichtbare Identität',
      f1Text:'Wir personalisieren Ihre Präsenz, damit sie klar, wiedererkennbar und leicht teilbar ist.',
      f2Title:'Ihre Daten bleiben Ihre Daten',
      f2Text:'Ihre berufliche Identität und Ihre Informationen bleiben unter Ihrer Kontrolle.',
      f3Title:'Direkte Beziehung',
      f3Text:'Wir geben Ihnen die Werkzeuge, um die Beziehung zu Ihren Kunden zu verlängern und zu stärken.',
      f4Title:'Flügel für den nächsten Schritt',
      f4Text:'Ihre Präsenz kann mit Ihrem Geschäft und Ihren Zielen wachsen.',
      doctrineTitle:'Ihr Können. Ihre Identität. Ihre Ziele.',
      doctrineText:'DIGIYLYFE gibt Ihnen Flügel, um weiterzukommen.',
      proofLead:'Unterschiedliche Berufe. Ein gemeinsames Ziel: Können sichtbar, teilbar und direkt erreichbar machen.',
      proofInvite:'Beginnen Sie mit Ihrer Karte. Ihre Präsenz kann mit Ihrem Geschäft wachsen.',
      footerTag:'Ihr Können. Ihre Identität. Ihre Ziele.',
      cardSecTitle:'Ihre DIGIYLYFE-Karte',
      cardSecText:'Ihr erster digitaler Anker: ein dauerhafter QR, direkter Kontakt und eine Präsenz, die Sie teilen und auf dem Smartphone behalten können.'
    },
    nl:{
      meta:'DIGIYLYFE geeft professionals een zichtbare, deelbare en duurzame digitale aanwezigheid. Uw identiteit, uw gegevens, uw klantrelatie. Eén bron. Alle kanalen.',
      claimLead:'Uw vakmanschap verdient een digitale aanwezigheid die bij u past.',
      claimWorld:'Uw identiteit. Uw gegevens. Uw directe klantrelatie.',
      kicker:'UW DIGITALE AANWEZIGHEID · OP UW MAAT',
      heroTitle:'Uw vakmanschap. Uw identiteit. Uw doelen.',
      heroLead:'DIGIYLYFE geeft u vleugels om verder te gaan.',
      offerTag:'EEN AANWEZIGHEID DIE MET U MEEGROEIT',
      offerTitle:'Uw digitale voetafdruk met DIGIYLYFE',
      offerText:'Digitale kaart · permanente QR · territoriale aanwezigheid · direct contact · delen · toegang vanaf het beginscherm · 8 talen.',
      f1Title:'Zichtbare identiteit',
      f1Text:'Wij personaliseren uw aanwezigheid zodat die helder, herkenbaar en makkelijk deelbaar is.',
      f2Title:'Uw gegevens blijven van u',
      f2Text:'Uw professionele identiteit en informatie blijven onder uw controle.',
      f3Title:'Directe relatie',
      f3Text:'Wij geven u de middelen om de relatie met uw klanten te verlengen en te versterken.',
      f4Title:'Vleugels om vooruit te gaan',
      f4Text:'Uw aanwezigheid kan meegroeien met uw activiteit en uw doelen.',
      doctrineTitle:'Uw vakmanschap. Uw identiteit. Uw doelen.',
      doctrineText:'DIGIYLYFE geeft u vleugels om verder te gaan.',
      proofLead:'Verschillende beroepen. Eén ambitie: vakmanschap zichtbaar, deelbaar en rechtstreeks bereikbaar maken.',
      proofInvite:'Begin met uw kaart. Uw aanwezigheid kan met uw activiteit meegroeien.',
      footerTag:'Uw vakmanschap. Uw identiteit. Uw doelen.',
      cardSecTitle:'Uw DIGIYLYFE-kaart',
      cardSecText:'Uw eerste digitale anker: een permanente QR, direct contact en een aanwezigheid die u kunt delen en op uw telefoon kunt bewaren.'
    },
    ar:{
      meta:'تمنح DIGIYLYFE المهني حضورًا رقميًا واضحًا وقابلًا للمشاركة ومستدامًا. هويتكم وبياناتكم وعلاقتكم بعملائكم. مصدر واحد لكل القنوات.',
      claimLead:'مهارتكم تستحق حضورًا رقميًا يعكس هويتكم.',
      claimWorld:'هويتكم. بياناتكم. علاقتكم المباشرة بعملائكم.',
      kicker:'حضوركم الرقمي · على صورتكم',
      heroTitle:'مهارتكم. هويتكم. أهدافكم.',
      heroLead:'DIGIYLYFE تمنحكم أجنحة للانطلاق أبعد.',
      offerTag:'حضور ينمو معكم',
      offerTitle:'بصمتكم الرقمية مع DIGIYLYFE',
      offerText:'بطاقة رقمية · رمز QR دائم · حضور محلي · تواصل مباشر · مشاركة · وصول من الشاشة الرئيسية · 8 لغات.',
      f1Title:'هوية واضحة',
      f1Text:'نخصص حضوركم ليكون واضحًا ومميزًا وسهل المشاركة.',
      f2Title:'بياناتكم تبقى ملككم',
      f2Text:'هويتكم المهنية ومعلوماتكم تبقى تحت سيطرتكم.',
      f3Title:'علاقة مباشرة',
      f3Text:'نوفر لكم الوسائل لإطالة العلاقة مع عملائكم وتعزيزها.',
      f4Title:'أجنحة للتقدم',
      f4Text:'يمكن لحضوركم أن ينمو مع نشاطكم وأهدافكم.',
      doctrineTitle:'مهارتكم. هويتكم. أهدافكم.',
      doctrineText:'DIGIYLYFE تمنحكم أجنحة للانطلاق أبعد.',
      proofLead:'مهن مختلفة وطموح واحد: جعل المهارة واضحة وقابلة للمشاركة والوصول المباشر.',
      proofInvite:'ابدؤوا ببطاقتكم، ويمكن لحضوركم أن ينمو مع نشاطكم.',
      footerTag:'مهارتكم. هويتكم. أهدافكم.',
      cardSecTitle:'بطاقتكم DIGIYLYFE',
      cardSecText:'نقطة ارتكازكم الرقمية الأولى: رمز QR دائم، تواصل مباشر، وحضور يمكنكم مشاركته والاحتفاظ به على هاتفكم.'
    }
  };

  var KEYS=['claimLead','claimWorld','kicker','heroTitle','heroLead','offerTag','offerTitle','offerText','f1Title','f1Text','f2Title','f2Text','f3Title','f3Text','f4Title','f4Text','doctrineTitle','doctrineText','proofLead','proofInvite','footerTag','cardSecTitle','cardSecText'];

  function lang(){
    var h=(document.documentElement.lang||'fr').slice(0,2).toLowerCase();
    if(COPY[h])return h;
    try{var q=(new URLSearchParams(location.search).get('lang')||'').slice(0,2).toLowerCase();if(COPY[q])return q}catch(e){}
    try{var s=(localStorage.getItem('digiy-lang')||'').slice(0,2).toLowerCase();if(COPY[s])return s}catch(e){}
    return 'fr';
  }

  function setText(key,value){
    document.querySelectorAll('[data-i18n="'+key+'"]').forEach(function(el){el.textContent=value});
  }

  function updateMeta(c){
    var d=document.querySelector('meta[name="description"]');if(d)d.setAttribute('content',c.meta);
    var og=document.querySelector('meta[property="og:description"]');if(og)og.setAttribute('content',c.meta);
    var tw=document.querySelector('meta[name="twitter:description"]');if(tw)tw.setAttribute('content',c.meta);
    var ld=document.querySelector('script[type="application/ld+json"]');
    if(ld){
      try{
        var data=JSON.parse(ld.textContent),graph=data&&data['@graph'];
        if(Array.isArray(graph))graph.forEach(function(node){
          if(node&&node['@type']==='Organization')node.description=c.meta;
          if(node&&node['@type']==='Offer')node.description=c.offerText;
        });
        ld.textContent=JSON.stringify(data);
      }catch(e){}
    }
  }

  function apply(){
    var c=COPY[lang()]||COPY.fr;
    KEYS.forEach(function(k){if(c[k])setText(k,c[k])});
    updateMeta(c);
    document.documentElement.setAttribute('data-digiy-com','maitre-v1');
  }

  apply();
  document.addEventListener('click',function(e){
    var b=e.target&&e.target.closest?e.target.closest('.langBtn'):null;
    if(b)setTimeout(apply,0);
  },false);
  try{
    new MutationObserver(function(m){
      for(var i=0;i<m.length;i++)if(m[i].type==='attributes'&&m[i].attributeName==='lang'){setTimeout(apply,0);break;}
    }).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  }catch(e){}
})();