(() => {
  "use strict";

  const Contract = window.DIGIY_CARNET_CONTRACT;
  const C = window.DIGIY_CARNET_MASTER || {};
  if(!Contract) throw new Error("DIGIY_CARNET_CONTRACT manquant");

  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;

  function normalizeDigits(value){
    const arabic="٠١٢٣٤٥٦٧٨٩", persian="۰۱۲۳۴۵۶۷۸۹";
    return String(value||"").replace(/[٠-٩۰-۹]/g,ch=>{
      let i=arabic.indexOf(ch);
      if(i<0)i=persian.indexOf(ch);
      return i>=0?String(i):ch;
    });
  }

  function clean(value){
    return String(value || "")
      .replace(/\s+/g," ")
      .replace(/\s+([,.!?;:])/g,"$1")
      .trim();
  }

  function lower(value){
    return clean(value).toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g,"");
  }

  function pickLang(value){
    const v=String(value||"").toLowerCase().split("-")[0];
    return /^(fr|en|es|pt|it|de|nl|ar)$/.test(v)?v:"fr";
  }

  function extractAmount(text){
    const raw = normalizeDigits(clean(text));
    const match = raw.match(/(?:^|\s)(\d[\d\s.,]*)(?:\s*(?:fcfa|f\s*cfa|xof|cfa|francs?|euros?|eur))?(?=\s|$)/i);
    if(!match) return 0;
    let normalized = String(match[1] || "").replace(/\s/g,"");
    if(/^\d{1,3}(?:[.,]\d{3})+$/.test(normalized)){
      normalized=normalized.replace(/[.,]/g,"");
    }else if(/^\d+[.,]\d{1,2}$/.test(normalized)){
      normalized=normalized.replace(",",".");
    }else{
      normalized=normalized.replace(/[.,]/g,"");
    }
    const amount = Math.round(Number(normalized));
    return Number.isFinite(amount) && amount > 0 ? amount : 0;
  }

  function extractChannel(text){
    const t = lower(text);
    if(/\bwave\b|\bwav\b/.test(t)) return "wave";
    if(/orange money|\bom\b/.test(t)) return "orange_money";
    if(/sendwave/.test(t)) return "sendwave";
    if(/espece|cash|liquide|efectivo|dinero|numerario|contanti|bargeld|\bbar\b|contant|نقد|نقدا/.test(t)) return "cash";
    if(/carte|\bcb\b|\bcard\b|tarjeta|cartao|carta|karte|kaart|بطاقة/.test(t)) return "card";
    if(/virement|banque|transfer|bank|transferencia|banco|banca|uberweisung|overschrijving|تحويل|بنك/.test(t)) return "bank";
    return "other";
  }

  function detectDirection(text){
    const t = lower(text);
    const out = [
      /depense|sortie|gasoil|essence|carburant|achat|fournisseur|loyer|transport|charge|facture|electricite|senelec|eau|sen.?eau/,
      /expense|outflow|fuel|petrol|gasoline|purchase|supplier|rent|transport|bill|electricity|water/,
      /gasto|salida|combustible|gasolina|compra|proveedor|alquiler|transporte|factura|electricidad|agua/,
      /despesa|saida|combustivel|gasolina|compra|fornecedor|aluguel|renda|transporte|fatura|eletricidade|agua/,
      /spesa|uscita|carburante|benzina|acquisto|fornitore|affitto|trasporto|bolletta|elettricita|acqua/,
      /ausgabe|treibstoff|benzin|kauf|lieferant|miete|transport|rechnung|strom|wasser/,
      /uitgave|brandstof|benzine|aankoop|leverancier|huur|vervoer|factuur|elektriciteit|water/,
      /مصروف|مصاريف|خروج|وقود|بنزين|شراء|مورد|ايجار|إيجار|نقل|فاتورة|كهرباء|ماء/
    ];
    return out.some(r=>r.test(t)) ? "out" : "in";
  }

  function removeKnownTokens(text, amount){
    let out = normalizeDigits(clean(text));
    if(amount){
      const grouped=String(amount).replace(/\B(?=(\d{3})+(?!\d))/g,"[\\s.,]*");
      out = out.replace(new RegExp(grouped,"i")," ");
    }
    out = out
      .replace(/\b(?:wave|wav|orange money|om|cash|esp[eè]ces?|liquide|sendwave|carte|cb|card|efectivo|dinero|contanti|bargeld|bar|contant|tarjeta|cart[aã]o|carta|karte|kaart|virement|banque|transfer|bank|transferencia|banco|banca|[uü]berweisung|overschrijving)\b/ig," ")
      .replace(/(?:نقد(?:ا)?|بطاقة|تحويل|بنك)/g," ")
      .replace(/\b(?:fcfa|f\s*cfa|xof|cfa|francs?|euros?|eur)\b/ig," ")
      .replace(/\b(?:entree|entrée|vente|recette|encaissement|depense|dépense|sortie|sale|income|revenue|expense|outflow|venta|entrada|ingreso|gasto|salida|venda|receita|despesa|saida|vendita|entrata|spesa|uscita|verkauf|einnahme|ausgabe|verkoop|inkomst|uitgave)\b/ig," ")
      .replace(/(?:بيع|دخل|مصروف|مصاريف|خروج)/g," ")
      .replace(/\s+/g," ")
      .replace(/^[,.;:\-–—\s]+|[,.;:\-–—\s]+$/g,"")
      .trim();
    return out;
  }

  function fallbackLabel(direction,lang){
    const L={
      fr:{in:"Vente",out:"Dépense"}, en:{in:"Sale",out:"Expense"}, es:{in:"Venta",out:"Gasto"}, pt:{in:"Venda",out:"Despesa"},
      it:{in:"Vendita",out:"Spesa"}, de:{in:"Verkauf",out:"Ausgabe"}, nl:{in:"Verkoop",out:"Uitgave"}, ar:{in:"بيع",out:"مصروف"}
    };
    const x=L[pickLang(lang)]||L.fr;
    return direction==="out"?x.out:x.in;
  }

  function parse(text,options = {}){
    const raw = clean(text);
    const amount = extractAmount(raw);
    const channel = extractChannel(raw);
    const direction = detectDirection(raw);
    const label = removeKnownTokens(raw, amount) || fallbackLabel(direction,options.lang);

    return Contract.canonicalMovement({
      member_slug:C.identity?.memberSlug || "",
      scope:"activity",
      direction,
      kind:direction === "out" ? "expense" : "sale",
      category:direction === "out" ? "depense" : "vente",
      channel,
      amount,
      currency:C.identity?.currency || "XOF",
      label,
      note:raw,
      origin:"voice",
      status:"draft",
      meta:{voice_text:raw,voice_lang:pickLang(options.lang)}
    });
  }

  function readiness(draft){
    const missing = [];
    if(!(draft?.amount > 0)) missing.push("amount");
    if(!draft?.channel || draft.channel === "other") missing.push("mode");
    if(!draft?.label) missing.push("reason");
    return {ok:missing.length===0,missing};
  }

  function supported(){ return !!Recognition; }

  function listen(options = {}){
    return new Promise((resolve,reject) => {
      if(!Recognition){reject(new Error("speech_recognition_unavailable"));return;}
      const r = new Recognition();
      r.lang = options.lang || "fr-FR";
      r.interimResults = false;
      r.continuous = false;
      r.maxAlternatives = 1;
      let settled = false;

      r.onerror = ev => {
        if(settled) return;
        settled = true;
        reject(new Error(ev?.error || "speech_recognition_error"));
      };
      r.onresult = ev => {
        if(settled) return;
        settled = true;
        const text = ev?.results?.[0]?.[0]?.transcript || "";
        resolve({text:clean(text),draft:parse(text,{lang:options.lang})});
      };
      r.onend = () => {
        if(!settled){settled=true;reject(new Error("speech_recognition_no_result"));}
      };
      try{r.start();}catch(err){reject(err);}
    });
  }

  window.DIGIY_CARNET_OREILLE = Object.freeze({supported,parse,readiness,listen});
})();