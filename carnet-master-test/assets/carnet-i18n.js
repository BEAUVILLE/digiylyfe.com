(() => {
  "use strict";

  const KEY = "DIGIY_CARNET_LANG_V1";
  const ALLOWED = ["fr","en","es","pt","it","de","nl","ar"];

  const D = Object.freeze({
    fr:{
      language:"Langue", member:"ADHÉRENT", open:"OUVRIR DIGIY CARNET →", logout:"Déconnexion",
      hubTitle:"DIGIY CARNET", hubLead:"Trois gestes. Voir la journée. Parler à CARNET. Suivre les clients dus.",
      dayTitle:"JOUR / CAISSE", dayDesc:"CA du jour, entrées, sorties, net et dernières traces.",
      earTitle:"OREILLE", earDesc:"Je parle. CARNET prépare. Je vérifie. Je confirme.",
      debtTitle:"CLIENT DÛ", debtDesc:"Somme due, remboursements successifs et reste à payer.",
      accessChecking:"Contrôle de l’accès CARNET…", accessOk:"✅ Magic link reconnu · droit CARNET actif.", accessDenied:"Accès CARNET refusé : ",
      today:"Aujourd’hui", salesDay:"CA jour · ventes", incomeDay:"Entrées jour", expensesDay:"Sorties jour", netDay:"Net jour",
      addTrace:"Ajouter une trace", twoSteps:"Deux temps : CARNET prépare. Tu vérifies. Tu confirmes.", saleIn:"＋ Vente / entrée", expenseOut:"− Dépense",
      amount:"Montant", mode:"Mode", reason:"Motif", noteOptional:"Note facultative", prepare:"PRÉPARER LA TRACE →", confirm:"✅ JE VÉRIFIE ET JE CONFIRME", edit:"Modifier",
      lastTraces:"Dernières traces", debtSeparate:"Le client dû reste séparé : il ne gonfle jamais la caisse avant remboursement.",
      earHeroTop:"LA VOIX AU-DESSUS DE L’ACTION", earHero:"Parle. CARNET prépare.", earExample:"Exemple : « Vente 25 000 Wave » ou « Gasoil 15 000 espèces ». Tu vérifies toujours avant que la trace entre dans CARNET.",
      speak:"🎙️ PARLER À CARNET", spoken:"Phrase entendue / saisie", analyse:"ANALYSER LA PHRASE", draftCheck:"Brouillon à vérifier", neverAuto:"Aucune donnée n’est rangée tant que tu n’appuies pas sur CONFIRMER.",
      debtHeroTop:"ÉCHÉANCIER TERRAIN", debtHero:"Il doit. Il rembourse. Il reste.", debtRule:"Une dette n’entre pas dans la caisse à sa création. Chaque remboursement confirmé, lui, entre immédiatement dans CARNET.",
      newDebt:"Nouveau client dû", debtLead:"Nom + téléphone + somme due. Le téléphone reste facultatif.", clientName:"Nom du client", phoneOptional:"Téléphone facultatif", amountDue:"Somme due", dueOptional:"Échéance facultative", saveDebt:"ENREGISTRER LE CLIENT DÛ", schedules:"Échéanciers", repaid:"REMBOURSÉ", remaining:"RESTE", due:"DÛ", repayment:"Remboursement", receivedMode:"Mode reçu", saveRepayment:"+ ENREGISTRER LE REMBOURSEMENT", settled:"✅ Soldé"
    },
    en:{
      language:"Language", member:"MEMBER", open:"OPEN DIGIY CARNET →", logout:"Sign out",
      hubTitle:"DIGIY CARNET", hubLead:"Three actions. See the day. Speak to CARNET. Track customer debts.",
      dayTitle:"DAY / CASHBOOK", dayDesc:"Daily sales, income, expenses, net and latest entries.",
      earTitle:"VOICE", earDesc:"I speak. CARNET prepares. I check. I confirm.", debtTitle:"CUSTOMER OWES", debtDesc:"Amount due, successive repayments and balance remaining.",
      accessChecking:"Checking CARNET access…", accessOk:"✅ Magic link recognized · CARNET access active.", accessDenied:"CARNET access denied: ",
      today:"Today", salesDay:"Daily sales", incomeDay:"Daily income", expensesDay:"Daily expenses", netDay:"Daily net",
      addTrace:"Add an entry", twoSteps:"Two steps: CARNET prepares. You check. You confirm.", saleIn:"＋ Sale / income", expenseOut:"− Expense",
      amount:"Amount", mode:"Method", reason:"Reason", noteOptional:"Optional note", prepare:"PREPARE ENTRY →", confirm:"✅ I CHECK AND CONFIRM", edit:"Edit", lastTraces:"Latest entries", debtSeparate:"Customer debt stays separate: it never increases cash until repayment.",
      earHeroTop:"VOICE ABOVE ACTION", earHero:"Speak. CARNET prepares.", earExample:"Example: “Sale 25,000 Wave” or “Fuel 15,000 cash”. You always check before the entry goes into CARNET.", speak:"🎙️ SPEAK TO CARNET", spoken:"Heard / typed sentence", analyse:"ANALYZE SENTENCE", draftCheck:"Draft to check", neverAuto:"Nothing is recorded until you press CONFIRM.",
      debtHeroTop:"FIELD SCHEDULE", debtHero:"They owe. They repay. Balance remains.", debtRule:"A debt does not enter cash when created. Every confirmed repayment immediately enters CARNET.", newDebt:"New customer debt", debtLead:"Name + phone + amount due. Phone remains optional.", clientName:"Customer name", phoneOptional:"Optional phone", amountDue:"Amount due", dueOptional:"Optional due date", saveDebt:"SAVE CUSTOMER DEBT", schedules:"Schedules", repaid:"REPAID", remaining:"REMAINING", due:"DUE", repayment:"Repayment", receivedMode:"Method received", saveRepayment:"+ RECORD REPAYMENT", settled:"✅ Settled"
    },
    es:{
      language:"Idioma", member:"ADHERENTE", open:"ABRIR DIGIY CARNET →", logout:"Salir", hubTitle:"DIGIY CARNET", hubLead:"Tres gestos. Ver el día. Hablar con CARNET. Seguir las deudas de clientes.", dayTitle:"DÍA / CAJA", dayDesc:"Ventas del día, entradas, salidas, neto y últimos movimientos.", earTitle:"VOZ", earDesc:"Hablo. CARNET prepara. Verifico. Confirmo.", debtTitle:"CLIENTE DEBE", debtDesc:"Importe adeudado, pagos sucesivos y saldo pendiente.", accessChecking:"Verificando acceso CARNET…", accessOk:"✅ Magic link reconocido · acceso CARNET activo.", accessDenied:"Acceso CARNET rechazado: ", today:"Hoy", salesDay:"Ventas del día", incomeDay:"Entradas del día", expensesDay:"Salidas del día", netDay:"Neto del día", addTrace:"Añadir movimiento", twoSteps:"Dos tiempos: CARNET prepara. Tú verificas. Tú confirmas.", saleIn:"＋ Venta / entrada", expenseOut:"− Gasto", amount:"Importe", mode:"Modo", reason:"Motivo", noteOptional:"Nota opcional", prepare:"PREPARAR MOVIMIENTO →", confirm:"✅ VERIFICO Y CONFIRMO", edit:"Modificar", lastTraces:"Últimos movimientos", debtSeparate:"La deuda del cliente queda separada: no aumenta la caja antes del pago.", earHeroTop:"LA VOZ POR ENCIMA DE LA ACCIÓN", earHero:"Habla. CARNET prepara.", earExample:"Ejemplo: « Venta 25 000 Wave » o « Combustible 15 000 efectivo ». Siempre verificas antes de registrar.", speak:"🎙️ HABLAR A CARNET", spoken:"Frase escuchada / escrita", analyse:"ANALIZAR LA FRASE", draftCheck:"Borrador a verificar", neverAuto:"Nada se registra hasta que pulses CONFIRMAR.", debtHeroTop:"CALENDARIO DE TERRENO", debtHero:"Debe. Reembolsa. Queda.", debtRule:"Una deuda no entra en caja al crearla. Cada reembolso confirmado entra inmediatamente en CARNET.", newDebt:"Nuevo cliente debe", debtLead:"Nombre + teléfono + suma debida. El teléfono sigue opcional.", clientName:"Nombre del cliente", phoneOptional:"Teléfono opcional", amountDue:"Suma debida", dueOptional:"Fecha límite opcional", saveDebt:"GUARDAR CLIENTE DEBE", schedules:"Calendarios", repaid:"REEMBOLSADO", remaining:"RESTA", due:"DEBE", repayment:"Reembolso", receivedMode:"Modo recibido", saveRepayment:"+ REGISTRAR REEMBOLSO", settled:"✅ Saldado"
    },
    pt:{
      language:"Idioma", member:"MEMBRO", open:"ABRIR DIGIY CARNET →", logout:"Sair", hubTitle:"DIGIY CARNET", hubLead:"Três gestos. Ver o dia. Falar com CARNET. Acompanhar dívidas de clientes.", dayTitle:"DIA / CAIXA", dayDesc:"Vendas do dia, entradas, saídas, líquido e últimos movimentos.", earTitle:"VOZ", earDesc:"Eu falo. CARNET prepara. Eu verifico. Eu confirmo.", debtTitle:"CLIENTE DEVE", debtDesc:"Valor devido, pagamentos sucessivos e saldo restante.", accessChecking:"Verificando acesso CARNET…", accessOk:"✅ Magic link reconhecido · acesso CARNET ativo.", accessDenied:"Acesso CARNET recusado: ", today:"Hoje", salesDay:"Vendas do dia", incomeDay:"Entradas do dia", expensesDay:"Saídas do dia", netDay:"Líquido do dia", addTrace:"Adicionar movimento", twoSteps:"Dois tempos: CARNET prepara. Você verifica. Você confirma.", saleIn:"＋ Venda / entrada", expenseOut:"− Despesa", amount:"Valor", mode:"Modo", reason:"Motivo", noteOptional:"Nota opcional", prepare:"PREPARAR MOVIMENTO →", confirm:"✅ VERIFICO E CONFIRMO", edit:"Editar", lastTraces:"Últimos movimentos", debtSeparate:"A dívida do cliente fica separada: não aumenta o caixa antes do pagamento.", earHeroTop:"A VOZ ACIMA DA AÇÃO", earHero:"Fale. CARNET prepara.", earExample:"Exemplo: « Venda 25 000 Wave » ou « Combustível 15 000 em dinheiro ». Você sempre verifica antes do registro.", speak:"🎙️ FALAR COM CARNET", spoken:"Frase ouvida / digitada", analyse:"ANALISAR FRASE", draftCheck:"Rascunho para verificar", neverAuto:"Nada é registrado até você pressionar CONFIRMAR.", debtHeroTop:"CALENDÁRIO DE CAMPO", debtHero:"Deve. Reembolsa. Resta.", debtRule:"Uma dívida não entra no caixa ao ser criada. Cada reembolso confirmado entra imediatamente no CARNET.", newDebt:"Novo cliente deve", debtLead:"Nome + telefone + valor devido. Telefone continua opcional.", clientName:"Nome do cliente", phoneOptional:"Telefone opcional", amountDue:"Valor devido", dueOptional:"Vencimento opcional", saveDebt:"REGISTRAR CLIENTE DEVE", schedules:"Calendários", repaid:"REEMBOLSADO", remaining:"RESTA", due:"DEVE", repayment:"Reembolso", receivedMode:"Modo recebido", saveRepayment:"+ REGISTRAR REEMBOLSO", settled:"✅ Quitado"
    },
    it:{
      language:"Lingua", member:"ADERENTE", open:"APRI DIGIY CARNET →", logout:"Esci", hubTitle:"DIGIY CARNET", hubLead:"Tre gesti. Vedere la giornata. Parlare a CARNET. Seguire i debiti dei clienti.", dayTitle:"GIORNO / CASSA", dayDesc:"Vendite del giorno, entrate, uscite, netto e ultimi movimenti.", earTitle:"VOCE", earDesc:"Parlo. CARNET prepara. Controllo. Confermo.", debtTitle:"CLIENTE DEVE", debtDesc:"Somma dovuta, rimborsi successivi e saldo restante.", accessChecking:"Controllo accesso CARNET…", accessOk:"✅ Magic link riconosciuto · accesso CARNET attivo.", accessDenied:"Accesso CARNET negato: ", today:"Oggi", salesDay:"Vendite del giorno", incomeDay:"Entrate del giorno", expensesDay:"Uscite del giorno", netDay:"Netto del giorno", addTrace:"Aggiungi movimento", twoSteps:"Due tempi: CARNET prepara. Tu controlli. Tu confermi.", saleIn:"＋ Vendita / entrata", expenseOut:"− Spesa", amount:"Importo", mode:"Metodo", reason:"Motivo", noteOptional:"Nota facoltativa", prepare:"PREPARA MOVIMENTO →", confirm:"✅ CONTROLLO E CONFERMO", edit:"Modifica", lastTraces:"Ultimi movimenti", debtSeparate:"Il debito cliente resta separato: non aumenta la cassa prima del rimborso.", earHeroTop:"LA VOCE SOPRA L’AZIONE", earHero:"Parla. CARNET prepara.", earExample:"Esempio: « Vendita 25 000 Wave » o « Carburante 15 000 contanti ». Controlli sempre prima della registrazione.", speak:"🎙️ PARLA A CARNET", spoken:"Frase ascoltata / scritta", analyse:"ANALIZZA FRASE", draftCheck:"Bozza da controllare", neverAuto:"Nulla viene registrato finché non premi CONFERMA.", debtHeroTop:"SCADENZIARIO SUL CAMPO", debtHero:"Deve. Rimborsa. Resta.", debtRule:"Un debito non entra in cassa alla creazione. Ogni rimborso confermato entra subito in CARNET.", newDebt:"Nuovo cliente deve", debtLead:"Nome + telefono + somma dovuta. Telefono facoltativo.", clientName:"Nome cliente", phoneOptional:"Telefono facoltativo", amountDue:"Somma dovuta", dueOptional:"Scadenza facoltativa", saveDebt:"REGISTRA CLIENTE DEVE", schedules:"Scadenziari", repaid:"RIMBORSATO", remaining:"RESTA", due:"DOVUTO", repayment:"Rimborso", receivedMode:"Metodo ricevuto", saveRepayment:"+ REGISTRA RIMBORSO", settled:"✅ Saldato"
    },
    de:{
      language:"Sprache", member:"MITGLIED", open:"DIGIY CARNET ÖFFNEN →", logout:"Abmelden", hubTitle:"DIGIY CARNET", hubLead:"Drei Handlungen. Den Tag sehen. Mit CARNET sprechen. Kundenschulden verfolgen.", dayTitle:"TAG / KASSE", dayDesc:"Tagesumsatz, Einnahmen, Ausgaben, Netto und letzte Buchungen.", earTitle:"STIMME", earDesc:"Ich spreche. CARNET bereitet vor. Ich prüfe. Ich bestätige.", debtTitle:"KUNDE SCHULDET", debtDesc:"Offener Betrag, Teilzahlungen und Restbetrag.", accessChecking:"CARNET-Zugang wird geprüft…", accessOk:"✅ Magic Link erkannt · CARNET-Zugang aktiv.", accessDenied:"CARNET-Zugang verweigert: ", today:"Heute", salesDay:"Tagesumsatz", incomeDay:"Tageseinnahmen", expensesDay:"Tagesausgaben", netDay:"Tagesnetto", addTrace:"Buchung hinzufügen", twoSteps:"Zwei Schritte: CARNET bereitet vor. Du prüfst. Du bestätigst.", saleIn:"＋ Verkauf / Einnahme", expenseOut:"− Ausgabe", amount:"Betrag", mode:"Methode", reason:"Grund", noteOptional:"Optionale Notiz", prepare:"BUCHUNG VORBEREITEN →", confirm:"✅ ICH PRÜFE UND BESTÄTIGE", edit:"Ändern", lastTraces:"Letzte Buchungen", debtSeparate:"Kundenschulden bleiben getrennt und erhöhen die Kasse erst bei Rückzahlung.", earHeroTop:"STIMME ÜBER AKTION", earHero:"Sprich. CARNET bereitet vor.", earExample:"Beispiel: „Verkauf 25.000 Wave“ oder „Treibstoff 15.000 bar“. Vor der Buchung immer prüfen.", speak:"🎙️ MIT CARNET SPRECHEN", spoken:"Gehörter / eingegebener Satz", analyse:"SATZ ANALYSIEREN", draftCheck:"Entwurf prüfen", neverAuto:"Nichts wird gespeichert, bevor du BESTÄTIGEN drückst.", debtHeroTop:"ZAHLUNGSPLAN", debtHero:"Schuldet. Zahlt zurück. Rest bleibt.", debtRule:"Eine Schuld geht bei Erstellung nicht in die Kasse. Jede bestätigte Rückzahlung geht sofort in CARNET ein.", newDebt:"Neue Kundenschuld", debtLead:"Name + Telefon + geschuldeter Betrag. Telefon optional.", clientName:"Kundenname", phoneOptional:"Telefon optional", amountDue:"Geschuldeter Betrag", dueOptional:"Fälligkeit optional", saveDebt:"KUNDENSCHULD SPEICHERN", schedules:"Zahlungspläne", repaid:"ZURÜCKGEZAHLT", remaining:"REST", due:"GESCHULDET", repayment:"Rückzahlung", receivedMode:"Empfangsmethode", saveRepayment:"+ RÜCKZAHLUNG ERFASSEN", settled:"✅ Bezahlt"
    },
    nl:{
      language:"Taal", member:"LID", open:"DIGIY CARNET OPENEN →", logout:"Uitloggen", hubTitle:"DIGIY CARNET", hubLead:"Drie handelingen. Bekijk de dag. Praat met CARNET. Volg klantenschulden.", dayTitle:"DAG / KAS", dayDesc:"Dagomzet, inkomsten, uitgaven, netto en laatste boekingen.", earTitle:"STEM", earDesc:"Ik spreek. CARNET bereidt voor. Ik controleer. Ik bevestig.", debtTitle:"KLANT SCHULDIG", debtDesc:"Verschuldigd bedrag, deelbetalingen en resterend saldo.", accessChecking:"CARNET-toegang controleren…", accessOk:"✅ Magic link herkend · CARNET-toegang actief.", accessDenied:"CARNET-toegang geweigerd: ", today:"Vandaag", salesDay:"Dagomzet", incomeDay:"Inkomsten vandaag", expensesDay:"Uitgaven vandaag", netDay:"Netto vandaag", addTrace:"Boeking toevoegen", twoSteps:"Twee stappen: CARNET bereidt voor. Jij controleert. Jij bevestigt.", saleIn:"＋ Verkoop / inkomsten", expenseOut:"− Uitgave", amount:"Bedrag", mode:"Methode", reason:"Reden", noteOptional:"Optionele notitie", prepare:"BOEKING VOORBEREIDEN →", confirm:"✅ IK CONTROLEER EN BEVESTIG", edit:"Wijzigen", lastTraces:"Laatste boekingen", debtSeparate:"Klantenschuld blijft apart en verhoogt de kas pas bij terugbetaling.", earHeroTop:"STEM BOVEN ACTIE", earHero:"Praat. CARNET bereidt voor.", earExample:"Voorbeeld: ‘Verkoop 25.000 Wave’ of ‘Brandstof 15.000 contant’. Altijd controleren voor boeking.", speak:"🎙️ PRAAT MET CARNET", spoken:"Gehoorde / getypte zin", analyse:"ZIN ANALYSEREN", draftCheck:"Concept controleren", neverAuto:"Niets wordt opgeslagen totdat je BEVESTIGT.", debtHeroTop:"BETALINGSSCHEMA", debtHero:"Schuldig. Betaalt terug. Rest blijft.", debtRule:"Een schuld komt bij aanmaak niet in de kas. Elke bevestigde terugbetaling gaat direct CARNET in.", newDebt:"Nieuwe klantenschuld", debtLead:"Naam + telefoon + verschuldigd bedrag. Telefoon optioneel.", clientName:"Klantnaam", phoneOptional:"Telefoon optioneel", amountDue:"Verschuldigd bedrag", dueOptional:"Optionele vervaldatum", saveDebt:"KLANTENSCHULD OPSLAAN", schedules:"Schema's", repaid:"TERUGBETAALD", remaining:"REST", due:"SCHULDIG", repayment:"Terugbetaling", receivedMode:"Ontvangen via", saveRepayment:"+ TERUGBETALING REGISTREREN", settled:"✅ Voldaan"
    },
    ar:{
      language:"اللغة", member:"عضو", open:"فتح DIGIY CARNET ←", logout:"تسجيل الخروج", hubTitle:"DIGIY CARNET", hubLead:"ثلاث حركات: راقب يومك، تحدث إلى CARNET، وتابع ديون العملاء.", dayTitle:"اليوم / الصندوق", dayDesc:"مبيعات اليوم، المداخيل، المصاريف، الصافي وآخر الحركات.", earTitle:"الصوت", earDesc:"أتكلم. CARNET يجهز. أراجع. أؤكد.", debtTitle:"العميل مدين", debtDesc:"المبلغ المستحق، الدفعات المتتالية، والباقي.", accessChecking:"جارٍ التحقق من دخول CARNET…", accessOk:"✅ تم التعرف على الرابط السحري · دخول CARNET مفعل.", accessDenied:"تم رفض دخول CARNET: ", today:"اليوم", salesDay:"مبيعات اليوم", incomeDay:"مداخيل اليوم", expensesDay:"مصاريف اليوم", netDay:"صافي اليوم", addTrace:"إضافة حركة", twoSteps:"خطوتان: CARNET يجهز. أنت تراجع. أنت تؤكد.", saleIn:"＋ بيع / دخل", expenseOut:"− مصروف", amount:"المبلغ", mode:"طريقة الدفع", reason:"السبب", noteOptional:"ملاحظة اختيارية", prepare:"تجهيز الحركة ←", confirm:"✅ راجعت وأؤكد", edit:"تعديل", lastTraces:"آخر الحركات", debtSeparate:"دين العميل يبقى منفصلاً ولا يزيد الصندوق قبل السداد.", earHeroTop:"الصوت فوق الفعل", earHero:"تكلم. CARNET يجهز.", earExample:"مثال: «بيع 25000 Wave» أو «وقود 15000 نقداً». راجع دائماً قبل التسجيل.", speak:"🎙️ تحدث إلى CARNET", spoken:"الجملة المسموعة / المكتوبة", analyse:"تحليل الجملة", draftCheck:"مسودة للمراجعة", neverAuto:"لا يتم تسجيل أي شيء قبل الضغط على تأكيد.", debtHeroTop:"جدول السداد الميداني", debtHero:"عليه دين. يسدد. يبقى رصيد.", debtRule:"الدين لا يدخل الصندوق عند إنشائه. كل سداد مؤكد يدخل CARNET فوراً.", newDebt:"عميل مدين جديد", debtLead:"الاسم + الهاتف + المبلغ المستحق. الهاتف اختياري.", clientName:"اسم العميل", phoneOptional:"الهاتف اختياري", amountDue:"المبلغ المستحق", dueOptional:"أجل اختياري", saveDebt:"تسجيل العميل المدين", schedules:"جداول السداد", repaid:"تم السداد", remaining:"الباقي", due:"المستحق", repayment:"سداد", receivedMode:"طريقة الاستلام", saveRepayment:"+ تسجيل السداد", settled:"✅ مسدد"
    }
  });

  function pick(value){
    const v = String(value || "").toLowerCase().split("-")[0];
    return ALLOWED.includes(v) ? v : "fr";
  }

  function current(){
    try{return pick(localStorage.getItem(KEY) || CfgLocale() || navigator.language || "fr");}catch(_){return "fr";}
  }

  function CfgLocale(){
    return String(window.DIGIY_CARNET_MASTER?.identity?.locale || "fr").split("-")[0];
  }

  function set(lang){
    const l=pick(lang);
    try{localStorage.setItem(KEY,l);}catch(_){}
    apply(l);
    return l;
  }

  function t(key,lang=current()){
    const l=pick(lang);
    return D[l]?.[key] ?? D.fr[key] ?? key;
  }

  function apply(lang=current(),root=document){
    const l=pick(lang);
    document.documentElement.lang=l;
    document.documentElement.dir=l==="ar"?"rtl":"ltr";
    root.querySelectorAll?.("[data-i18n]").forEach(el=>{el.textContent=t(el.dataset.i18n,l);});
    root.querySelectorAll?.("[data-i18n-placeholder]").forEach(el=>{el.placeholder=t(el.dataset.i18nPlaceholder,l);});
    root.querySelectorAll?.("select[data-language-selector]").forEach(el=>{el.value=l;});
    window.dispatchEvent(new CustomEvent("digiy:carnet-language",{detail:{lang:l}}));
    return l;
  }

  function bindSelector(select){
    if(!select)return;
    select.innerHTML=ALLOWED.map(l=>`<option value="${l}">${({fr:"FR",en:"EN",es:"ES",pt:"PT",it:"IT",de:"DE",nl:"NL",ar:"AR"})[l]}</option>`).join("");
    select.setAttribute("data-language-selector","");
    select.value=current();
    select.addEventListener("change",()=>set(select.value));
  }

  window.DIGIY_CARNET_I18N=Object.freeze({languages:ALLOWED,current,set,t,apply,bindSelector});
})();
