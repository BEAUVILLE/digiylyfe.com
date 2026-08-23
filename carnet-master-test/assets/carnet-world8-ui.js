(() => {
  "use strict";

  const I18N = window.DIGIY_CARNET_I18N;
  if(!I18N) throw new Error("DIGIY_CARNET_I18N manquant");

  const LOCALES = Object.freeze({fr:"fr-FR",en:"en-GB",es:"es-ES",pt:"pt-PT",it:"it-IT",de:"de-DE",nl:"nl-NL",ar:"ar-SA"});
  const SPEECH = Object.freeze({fr:"fr-FR",en:"en-US",es:"es-ES",pt:"pt-PT",it:"it-IT",de:"de-DE",nl:"nl-NL",ar:"ar-SA"});

  const X = Object.freeze({
    fr:{
      situation:"SITUATION DU JOUR", previewTitle:"Je vais ranger :", loading:"Chargement…", noTrace:"Aucune trace confirmée.", cockpitPending:"Le cockpit s’ouvrira quand la configuration et le bridge magic link seront validés.",
      completeTrace:"Complète la trace : {detail}", traceSaved:"✅ Trace confirmée et rangée dans CARNET.", traceFailed:"Trace non inscrite : {detail}", movementIn:"ENTRÉE", movementOut:"SORTIE", navDay:"Jour", navAdd:"Ajouter", navRefresh:"Actualiser", reasonPh:"Ex : vente drap, gasoil, fournisseur…", notePh:"Détail utile…",
      backCarnet:"← CARNET", earBrand:"🎙️ OREILLE CARNET", accessMicChecking:"Contrôle de l’accès et du micro…", type:"Type", typeIn:"Entrée / vente", typeOut:"Dépense / sortie", note:"Note", prepareConfirm:"PRÉPARER POUR CONFIRMATION →", spokenPh:"Ex : Vente 25 000 Wave",
      draftReady:"✅ Brouillon compris. Vérifie puis prépare.", complete:"À compléter : {detail}.", accessMicOk:"✅ Magic link reconnu · micro disponible.", accessNoMic:"✅ Accès CARNET actif · micro indisponible ici, saisie texte possible.", listening:"🎙️ J’écoute… parle naturellement.", microphone:"Micro : {detail}", sayFirst:"Dis ou écris une phrase d’abord.", duplicate:"✅ Cette trace existait déjà : aucun doublon créé.", offline:"📴 Réseau absent : trace gardée sur l’appareil avec son identifiant. Elle sera synchronisée sans doublon.", traceNotStored:"Trace non rangée : {detail}",
      registryChecking:"Contrôle du registre…", registryLoaded:"✅ Échéancier chargé.", noDebt:"Aucun client dû ouvert.", deadline:"Échéance : {date}", noDeadline:"Sans échéance imposée", noRepayment:"Aucun remboursement enregistré.", repaymentRequired:"Indique le montant remboursé.", repaymentSaved:"✅ +{amount} entrés dans CARNET · reste {remaining}.", repaymentFailed:"Remboursement non enregistré : {detail}", sqlPending:"Le registre s’ouvrira après pose et test du SQL échéancier.", debtRequired:"Nom du client et somme due sont obligatoires.", debtSaved:"✅ Client dû enregistré. Rien n’est entré dans la caisse.", debtCreateFailed:"Création impossible : {detail}", statusOpen:"OUVERT", statusPaid:"PAYÉ", clientPh:"Ex : Mamadou", phonePh:"Ex : 77 000 00 00",
      channelCash:"Espèces", channelBank:"Banque", channelCard:"Carte", channelOther:"Autre"
    },
    en:{
      situation:"TODAY'S POSITION", previewTitle:"I will record:", loading:"Loading…", noTrace:"No confirmed entry yet.", cockpitPending:"The cockpit will open once configuration and the magic-link bridge are validated.", completeTrace:"Complete the entry: {detail}", traceSaved:"✅ Entry confirmed and recorded in CARNET.", traceFailed:"Entry not recorded: {detail}", movementIn:"INCOME", movementOut:"EXPENSE", navDay:"Day", navAdd:"Add", navRefresh:"Refresh", reasonPh:"E.g. sheet sale, fuel, supplier…", notePh:"Useful detail…",
      backCarnet:"← CARNET", earBrand:"🎙️ CARNET VOICE", accessMicChecking:"Checking access and microphone…", type:"Type", typeIn:"Income / sale", typeOut:"Expense / outflow", note:"Note", prepareConfirm:"PREPARE FOR CONFIRMATION →", spokenPh:"E.g. Sale 25,000 Wave",
      draftReady:"✅ Draft understood. Check it, then prepare.", complete:"Complete: {detail}.", accessMicOk:"✅ Magic link recognized · microphone available.", accessNoMic:"✅ CARNET access active · microphone unavailable here, text input remains available.", listening:"🎙️ Listening… speak naturally.", microphone:"Microphone: {detail}", sayFirst:"Speak or type a sentence first.", duplicate:"✅ This entry already existed: no duplicate created.", offline:"📴 No network: the entry is kept on this device with its identifier. It will sync without duplication.", traceNotStored:"Entry not recorded: {detail}",
      registryChecking:"Checking customer debts…", registryLoaded:"✅ Customer-debt register loaded.", noDebt:"No open customer debt.", deadline:"Due date: {date}", noDeadline:"No imposed due date", noRepayment:"No repayment recorded.", repaymentRequired:"Enter the repaid amount.", repaymentSaved:"✅ +{amount} entered CARNET · {remaining} remaining.", repaymentFailed:"Repayment not recorded: {detail}", sqlPending:"The register will open after the receivables SQL is installed and tested.", debtRequired:"Customer name and amount due are required.", debtSaved:"✅ Customer debt saved. Nothing entered cash yet.", debtCreateFailed:"Unable to create: {detail}", statusOpen:"OPEN", statusPaid:"PAID", clientPh:"E.g. Mamadou", phonePh:"E.g. 77 000 00 00",
      channelCash:"Cash", channelBank:"Bank", channelCard:"Card", channelOther:"Other"
    },
    es:{
      situation:"SITUACIÓN DE HOY", previewTitle:"Voy a registrar:", loading:"Cargando…", noTrace:"Ningún movimiento confirmado.", cockpitPending:"El panel se abrirá cuando la configuración y el puente del magic link estén validados.", completeTrace:"Completa el movimiento: {detail}", traceSaved:"✅ Movimiento confirmado y registrado en CARNET.", traceFailed:"Movimiento no registrado: {detail}", movementIn:"ENTRADA", movementOut:"SALIDA", navDay:"Día", navAdd:"Añadir", navRefresh:"Actualizar", reasonPh:"Ej.: venta, combustible, proveedor…", notePh:"Detalle útil…",
      backCarnet:"← CARNET", earBrand:"🎙️ VOZ CARNET", accessMicChecking:"Verificando acceso y micrófono…", type:"Tipo", typeIn:"Entrada / venta", typeOut:"Gasto / salida", note:"Nota", prepareConfirm:"PREPARAR PARA CONFIRMAR →", spokenPh:"Ej.: Venta 25 000 Wave",
      draftReady:"✅ Borrador comprendido. Verifica y prepara.", complete:"Completa: {detail}.", accessMicOk:"✅ Magic link reconocido · micrófono disponible.", accessNoMic:"✅ Acceso CARNET activo · micrófono no disponible aquí, puedes escribir.", listening:"🎙️ Escuchando… habla con naturalidad.", microphone:"Micrófono: {detail}", sayFirst:"Habla o escribe una frase primero.", duplicate:"✅ Este movimiento ya existía: no se creó duplicado.", offline:"📴 Sin red: el movimiento queda guardado en este dispositivo con su identificador y se sincronizará sin duplicarse.", traceNotStored:"Movimiento no registrado: {detail}",
      registryChecking:"Verificando el registro…", registryLoaded:"✅ Registro de deudas cargado.", noDebt:"No hay clientes con deuda abierta.", deadline:"Vence: {date}", noDeadline:"Sin vencimiento impuesto", noRepayment:"Ningún reembolso registrado.", repaymentRequired:"Indica el importe reembolsado.", repaymentSaved:"✅ +{amount} entraron en CARNET · quedan {remaining}.", repaymentFailed:"Reembolso no registrado: {detail}", sqlPending:"El registro se abrirá después de instalar y probar el SQL de deudas.", debtRequired:"El nombre del cliente y la suma debida son obligatorios.", debtSaved:"✅ Deuda del cliente registrada. Nada entró en caja.", debtCreateFailed:"Creación imposible: {detail}", statusOpen:"ABIERTO", statusPaid:"PAGADO", clientPh:"Ej.: Mamadou", phonePh:"Ej.: 77 000 00 00",
      channelCash:"Efectivo", channelBank:"Banco", channelCard:"Tarjeta", channelOther:"Otro"
    },
    pt:{
      situation:"SITUAÇÃO DE HOJE", previewTitle:"Vou registar:", loading:"A carregar…", noTrace:"Nenhum movimento confirmado.", cockpitPending:"O painel abrirá quando a configuração e a ponte do magic link forem validadas.", completeTrace:"Complete o movimento: {detail}", traceSaved:"✅ Movimento confirmado e registado no CARNET.", traceFailed:"Movimento não registado: {detail}", movementIn:"ENTRADA", movementOut:"SAÍDA", navDay:"Dia", navAdd:"Adicionar", navRefresh:"Atualizar", reasonPh:"Ex.: venda, combustível, fornecedor…", notePh:"Detalhe útil…",
      backCarnet:"← CARNET", earBrand:"🎙️ VOZ CARNET", accessMicChecking:"A verificar acesso e microfone…", type:"Tipo", typeIn:"Entrada / venda", typeOut:"Despesa / saída", note:"Nota", prepareConfirm:"PREPARAR PARA CONFIRMAR →", spokenPh:"Ex.: Venda 25 000 Wave",
      draftReady:"✅ Rascunho compreendido. Verifique e prepare.", complete:"Complete: {detail}.", accessMicOk:"✅ Magic link reconhecido · microfone disponível.", accessNoMic:"✅ Acesso CARNET ativo · microfone indisponível aqui, pode escrever.", listening:"🎙️ A ouvir… fale naturalmente.", microphone:"Microfone: {detail}", sayFirst:"Fale ou escreva uma frase primeiro.", duplicate:"✅ Este movimento já existia: nenhum duplicado criado.", offline:"📴 Sem rede: o movimento fica guardado neste aparelho com o seu identificador e será sincronizado sem duplicação.", traceNotStored:"Movimento não registado: {detail}",
      registryChecking:"A verificar o registo…", registryLoaded:"✅ Registo de dívidas carregado.", noDebt:"Nenhum cliente com dívida aberta.", deadline:"Vencimento: {date}", noDeadline:"Sem vencimento imposto", noRepayment:"Nenhum reembolso registado.", repaymentRequired:"Indique o valor reembolsado.", repaymentSaved:"✅ +{amount} entraram no CARNET · restam {remaining}.", repaymentFailed:"Reembolso não registado: {detail}", sqlPending:"O registo abrirá após instalar e testar o SQL de dívidas.", debtRequired:"Nome do cliente e valor devido são obrigatórios.", debtSaved:"✅ Dívida do cliente registada. Nada entrou na caixa.", debtCreateFailed:"Não foi possível criar: {detail}", statusOpen:"ABERTO", statusPaid:"PAGO", clientPh:"Ex.: Mamadou", phonePh:"Ex.: 77 000 00 00",
      channelCash:"Dinheiro", channelBank:"Banco", channelCard:"Cartão", channelOther:"Outro"
    },
    it:{
      situation:"SITUAZIONE DI OGGI", previewTitle:"Sto per registrare:", loading:"Caricamento…", noTrace:"Nessun movimento confermato.", cockpitPending:"Il pannello si aprirà quando configurazione e ponte magic link saranno validati.", completeTrace:"Completa il movimento: {detail}", traceSaved:"✅ Movimento confermato e registrato in CARNET.", traceFailed:"Movimento non registrato: {detail}", movementIn:"ENTRATA", movementOut:"USCITA", navDay:"Giorno", navAdd:"Aggiungi", navRefresh:"Aggiorna", reasonPh:"Es.: vendita, carburante, fornitore…", notePh:"Dettaglio utile…",
      backCarnet:"← CARNET", earBrand:"🎙️ VOCE CARNET", accessMicChecking:"Controllo accesso e microfono…", type:"Tipo", typeIn:"Entrata / vendita", typeOut:"Spesa / uscita", note:"Nota", prepareConfirm:"PREPARA PER LA CONFERMA →", spokenPh:"Es.: Vendita 25 000 Wave",
      draftReady:"✅ Bozza compresa. Controlla e prepara.", complete:"Completa: {detail}.", accessMicOk:"✅ Magic link riconosciuto · microfono disponibile.", accessNoMic:"✅ Accesso CARNET attivo · microfono non disponibile qui, puoi scrivere.", listening:"🎙️ Ascolto… parla naturalmente.", microphone:"Microfono: {detail}", sayFirst:"Parla o scrivi prima una frase.", duplicate:"✅ Questo movimento esisteva già: nessun duplicato creato.", offline:"📴 Rete assente: il movimento resta su questo dispositivo con il suo identificatore e sarà sincronizzato senza duplicati.", traceNotStored:"Movimento non registrato: {detail}",
      registryChecking:"Controllo registro…", registryLoaded:"✅ Registro debiti caricato.", noDebt:"Nessun cliente con debito aperto.", deadline:"Scadenza: {date}", noDeadline:"Nessuna scadenza imposta", noRepayment:"Nessun rimborso registrato.", repaymentRequired:"Indica l'importo rimborsato.", repaymentSaved:"✅ +{amount} entrati in CARNET · restano {remaining}.", repaymentFailed:"Rimborso non registrato: {detail}", sqlPending:"Il registro si aprirà dopo installazione e test dell'SQL debiti.", debtRequired:"Nome cliente e somma dovuta sono obbligatori.", debtSaved:"✅ Debito cliente registrato. Nulla è entrato in cassa.", debtCreateFailed:"Creazione impossibile: {detail}", statusOpen:"APERTO", statusPaid:"PAGATO", clientPh:"Es.: Mamadou", phonePh:"Es.: 77 000 00 00",
      channelCash:"Contanti", channelBank:"Banca", channelCard:"Carta", channelOther:"Altro"
    },
    de:{
      situation:"HEUTIGE LAGE", previewTitle:"Ich buche:", loading:"Laden…", noTrace:"Noch keine bestätigte Buchung.", cockpitPending:"Das Cockpit öffnet, sobald Konfiguration und Magic-Link-Brücke validiert sind.", completeTrace:"Buchung vervollständigen: {detail}", traceSaved:"✅ Buchung bestätigt und in CARNET gespeichert.", traceFailed:"Buchung nicht gespeichert: {detail}", movementIn:"EINNAHME", movementOut:"AUSGABE", navDay:"Tag", navAdd:"Hinzufügen", navRefresh:"Aktualisieren", reasonPh:"Z. B. Verkauf, Treibstoff, Lieferant…", notePh:"Nützliche Notiz…",
      backCarnet:"← CARNET", earBrand:"🎙️ CARNET STIMME", accessMicChecking:"Zugang und Mikrofon werden geprüft…", type:"Typ", typeIn:"Einnahme / Verkauf", typeOut:"Ausgabe", note:"Notiz", prepareConfirm:"ZUR BESTÄTIGUNG VORBEREITEN →", spokenPh:"Z. B. Verkauf 25.000 Wave",
      draftReady:"✅ Entwurf verstanden. Prüfen und vorbereiten.", complete:"Ergänzen: {detail}.", accessMicOk:"✅ Magic Link erkannt · Mikrofon verfügbar.", accessNoMic:"✅ CARNET-Zugang aktiv · Mikrofon hier nicht verfügbar, Texteingabe möglich.", listening:"🎙️ Ich höre zu… sprich natürlich.", microphone:"Mikrofon: {detail}", sayFirst:"Sprich oder schreibe zuerst einen Satz.", duplicate:"✅ Diese Buchung existierte bereits: kein Duplikat erzeugt.", offline:"📴 Kein Netz: Die Buchung bleibt mit ihrer Kennung auf diesem Gerät und wird ohne Duplikat synchronisiert.", traceNotStored:"Buchung nicht gespeichert: {detail}",
      registryChecking:"Register wird geprüft…", registryLoaded:"✅ Schuldenregister geladen.", noDebt:"Keine offene Kundenschuld.", deadline:"Fällig: {date}", noDeadline:"Keine feste Fälligkeit", noRepayment:"Keine Rückzahlung erfasst.", repaymentRequired:"Rückzahlungsbetrag eingeben.", repaymentSaved:"✅ +{amount} in CARNET eingegangen · {remaining} verbleiben.", repaymentFailed:"Rückzahlung nicht erfasst: {detail}", sqlPending:"Das Register öffnet nach Installation und Test des Schulden-SQL.", debtRequired:"Kundenname und geschuldeter Betrag sind Pflicht.", debtSaved:"✅ Kundenschuld gespeichert. Noch kein Geldeingang.", debtCreateFailed:"Erstellung nicht möglich: {detail}", statusOpen:"OFFEN", statusPaid:"BEZAHLT", clientPh:"Z. B. Mamadou", phonePh:"Z. B. 77 000 00 00",
      channelCash:"Bar", channelBank:"Bank", channelCard:"Karte", channelOther:"Andere"
    },
    nl:{
      situation:"SITUATIE VANDAAG", previewTitle:"Ik boek:", loading:"Laden…", noTrace:"Nog geen bevestigde boeking.", cockpitPending:"Het cockpit opent zodra configuratie en magic-linkbrug zijn gevalideerd.", completeTrace:"Vul de boeking aan: {detail}", traceSaved:"✅ Boeking bevestigd en opgeslagen in CARNET.", traceFailed:"Boeking niet opgeslagen: {detail}", movementIn:"INKOMST", movementOut:"UITGAVE", navDay:"Dag", navAdd:"Toevoegen", navRefresh:"Vernieuwen", reasonPh:"Bijv. verkoop, brandstof, leverancier…", notePh:"Nuttig detail…",
      backCarnet:"← CARNET", earBrand:"🎙️ CARNET STEM", accessMicChecking:"Toegang en microfoon controleren…", type:"Type", typeIn:"Inkomst / verkoop", typeOut:"Uitgave", note:"Notitie", prepareConfirm:"VOORBEREIDEN VOOR BEVESTIGING →", spokenPh:"Bijv. Verkoop 25.000 Wave",
      draftReady:"✅ Concept begrepen. Controleer en bereid voor.", complete:"Aanvullen: {detail}.", accessMicOk:"✅ Magic link herkend · microfoon beschikbaar.", accessNoMic:"✅ CARNET-toegang actief · microfoon hier niet beschikbaar, typen kan wel.", listening:"🎙️ Ik luister… spreek natuurlijk.", microphone:"Microfoon: {detail}", sayFirst:"Spreek of typ eerst een zin.", duplicate:"✅ Deze boeking bestond al: geen duplicaat gemaakt.", offline:"📴 Geen netwerk: de boeking blijft met haar identificatie op dit apparaat en synchroniseert zonder duplicaat.", traceNotStored:"Boeking niet opgeslagen: {detail}",
      registryChecking:"Register controleren…", registryLoaded:"✅ Schuldenregister geladen.", noDebt:"Geen openstaande klantenschuld.", deadline:"Vervaldatum: {date}", noDeadline:"Geen vaste vervaldatum", noRepayment:"Geen terugbetaling geregistreerd.", repaymentRequired:"Voer het terugbetaalde bedrag in.", repaymentSaved:"✅ +{amount} in CARNET ontvangen · {remaining} resterend.", repaymentFailed:"Terugbetaling niet geregistreerd: {detail}", sqlPending:"Het register opent na installatie en test van de schulden-SQL.", debtRequired:"Klantnaam en verschuldigd bedrag zijn verplicht.", debtSaved:"✅ Klantenschuld opgeslagen. Nog niets in de kas ontvangen.", debtCreateFailed:"Aanmaken niet mogelijk: {detail}", statusOpen:"OPEN", statusPaid:"BETAALD", clientPh:"Bijv. Mamadou", phonePh:"Bijv. 77 000 00 00",
      channelCash:"Contant", channelBank:"Bank", channelCard:"Kaart", channelOther:"Anders"
    },
    ar:{
      situation:"وضع اليوم", previewTitle:"سيتم تسجيل:", loading:"جارٍ التحميل…", noTrace:"لا توجد حركة مؤكدة بعد.", cockpitPending:"سيفتح سجل اليوم بعد اعتماد الإعدادات وجسر الرابط السحري.", completeTrace:"أكمل الحركة: {detail}", traceSaved:"✅ تم تأكيد الحركة وتسجيلها في CARNET.", traceFailed:"لم تُسجل الحركة: {detail}", movementIn:"دخول", movementOut:"خروج", navDay:"اليوم", navAdd:"إضافة", navRefresh:"تحديث", reasonPh:"مثال: بيع، وقود، مورد…", notePh:"تفصيل مفيد…",
      backCarnet:"CARNET →", earBrand:"🎙️ صوت CARNET", accessMicChecking:"جارٍ التحقق من الدخول والميكروفون…", type:"النوع", typeIn:"دخول / بيع", typeOut:"مصروف / خروج", note:"ملاحظة", prepareConfirm:"تجهيز للتأكيد ←", spokenPh:"مثال: بيع 25000 Wave",
      draftReady:"✅ تم فهم المسودة. راجعها ثم جهزها.", complete:"أكمل: {detail}.", accessMicOk:"✅ تم التعرف على الرابط السحري · الميكروفون متاح.", accessNoMic:"✅ دخول CARNET فعال · الميكروفون غير متاح هنا ويمكن الكتابة.", listening:"🎙️ أستمع… تكلم بشكل طبيعي.", microphone:"الميكروفون: {detail}", sayFirst:"تكلم أو اكتب جملة أولاً.", duplicate:"✅ هذه الحركة موجودة مسبقاً: لم يتم إنشاء نسخة مكررة.", offline:"📴 لا توجد شبكة: تم حفظ الحركة على الجهاز بمعرفها وستتم مزامنتها دون تكرار.", traceNotStored:"لم تُسجل الحركة: {detail}",
      registryChecking:"جارٍ التحقق من سجل الديون…", registryLoaded:"✅ تم تحميل سجل الديون.", noDebt:"لا يوجد عميل بدين مفتوح.", deadline:"الأجل: {date}", noDeadline:"دون أجل مفروض", noRepayment:"لا يوجد سداد مسجل.", repaymentRequired:"أدخل مبلغ السداد.", repaymentSaved:"✅ دخل {amount} إلى CARNET · الباقي {remaining}.", repaymentFailed:"لم يُسجل السداد: {detail}", sqlPending:"سيفتح السجل بعد تثبيت واختبار SQL الخاص بالديون.", debtRequired:"اسم العميل والمبلغ المستحق إلزاميان.", debtSaved:"✅ تم تسجيل دين العميل. لم يدخل شيء إلى الصندوق.", debtCreateFailed:"تعذر الإنشاء: {detail}", statusOpen:"مفتوح", statusPaid:"مسدد", clientPh:"مثال: مامادو", phonePh:"مثال: 77 000 00 00",
      channelCash:"نقداً", channelBank:"بنك", channelCard:"بطاقة", channelOther:"أخرى"
    }
  });

  function lang(){ return I18N.current(); }
  function t(key){
    const l=lang();
    if(X[l] && X[l][key] !== undefined) return X[l][key];
    if(X.fr[key] !== undefined) return X.fr[key];
    return I18N.t(key,l);
  }
  function format(key,vars={}){
    return String(t(key)).replace(/\{([a-zA-Z0-9_]+)\}/g,(_,k)=>String(vars[k] ?? ""));
  }
  function apply(root=document){
    const l=lang();
    root.querySelectorAll?.("[data-w8]").forEach(el=>{el.textContent=t(el.dataset.w8);});
    root.querySelectorAll?.("[data-w8-placeholder]").forEach(el=>{el.placeholder=t(el.dataset.w8Placeholder);});
    root.querySelectorAll?.("[data-w8-title]").forEach(el=>{el.title=t(el.dataset.w8Title);});
    return l;
  }
  function locale(){ return LOCALES[lang()] || "fr-FR"; }
  function speechLocale(){ return SPEECH[lang()] || "fr-FR"; }
  function money(value,currency){
    const n=Number(value)||0, c=String(currency||window.DIGIY_CARNET_MASTER?.identity?.currency||"XOF").toUpperCase();
    if(c==="XOF") return new Intl.NumberFormat(locale(),{maximumFractionDigits:0}).format(n)+" FCFA";
    try{return new Intl.NumberFormat(locale(),{style:"currency",currency:c,maximumFractionDigits:2}).format(n)}catch(_){return new Intl.NumberFormat(locale()).format(n)+" "+c}
  }
  function today(){ return new Date().toLocaleDateString(locale(),{weekday:"long",day:"numeric",month:"long"}); }
  function date(value){
    if(!value)return "";
    const d=new Date(String(value).slice(0,10)+"T12:00:00");
    return Number.isNaN(d.getTime())?String(value):d.toLocaleDateString(locale(),{day:"numeric",month:"short",year:"numeric"});
  }
  function channelLabel(id,fallback){
    const key={cash:"channelCash",bank:"channelBank",card:"channelCard",other:"channelOther"}[id];
    if(key)return t(key);
    return fallback || id;
  }
  function statusLabel(status){
    const s=String(status||"").toLowerCase();
    return /paid|settled|solde|sold/.test(s)?t("statusPaid"):t("statusOpen");
  }

  window.DIGIY_CARNET_WORLD8_UI=Object.freeze({lang,t,format,apply,locale,speechLocale,money,today,date,channelLabel,statusLabel});
})();