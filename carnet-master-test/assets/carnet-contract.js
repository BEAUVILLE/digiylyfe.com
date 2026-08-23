(() => {
  "use strict";

  const CHANNELS = Object.freeze({
    wave: "Wave",
    orange_money: "Orange Money",
    cash: "Espèces / Cash",
    bank: "Banque / Virement",
    card: "Carte",
    sendwave: "Sendwave",
    other: "Autre"
  });

  const KINDS = Object.freeze([
    "sale", "expense", "refund", "transfer", "saving", "withdrawal", "adjustment"
  ]);
  const LEGACY_SAFE_KINDS = Object.freeze(["sale", "expense", "saving", "transfer"]);
  const SCOPES = Object.freeze(["activity", "personal"]);

  function uid(){
    if(globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
    return "c_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 12);
  }

  function normalizeChannel(value){
    const raw = String(value || "").trim().toLowerCase().replace(/[\s-]+/g,"_");
    if(raw === "om" || raw === "orange" || raw === "orange_money") return "orange_money";
    if(raw === "espece" || raw === "espèces" || raw === "liquide") return "cash";
    if(raw === "virement" || raw === "banque") return "bank";
    if(raw === "cb") return "card";
    return Object.prototype.hasOwnProperty.call(CHANNELS, raw) ? raw : "other";
  }

  function normalizeScope(value){
    const raw = String(value || "").trim().toLowerCase();
    if(raw === "perso" || raw === "personal" || raw === "private") return "personal";
    return "activity";
  }

  function normalizeKind(value, direction){
    const raw = String(value || "").trim().toLowerCase();
    if(KINDS.includes(raw)) return raw;
    return direction === "out" ? "expense" : "sale";
  }

  function canonicalMovement(input){
    const direction = String(input?.direction || "").toLowerCase() === "out" ? "out" : "in";
    const amount = Math.round(Number(input?.amount ?? input?.amount_xof ?? 0));
    return {
      id: input?.id || null,
      client_id: input?.client_id || uid(),
      member_slug: String(input?.member_slug || "").trim().toLowerCase(),
      scope: normalizeScope(input?.scope),
      direction,
      kind: normalizeKind(input?.kind, direction),
      category: String(input?.category || "other").trim().toLowerCase() || "other",
      channel: normalizeChannel(input?.channel),
      amount: Number.isFinite(amount) ? amount : 0,
      currency: String(input?.currency || input?.currency_code || "XOF").toUpperCase(),
      label: String(input?.label || "").trim(),
      note: String(input?.note || input?.note_text || "").trim(),
      source_module: String(input?.source_module || "CARNET").toUpperCase(),
      source_id: input?.source_id || null,
      origin: String(input?.origin || "manual").toLowerCase(),
      occurred_at: input?.occurred_at || input?.movement_ts || new Date().toISOString(),
      status: input?.status || "draft",
      meta: Object.assign({}, input?.meta || {})
    };
  }

  function validateConfirmed(m){
    const errors = [];
    if(!SCOPES.includes(m.scope)) errors.push("scope");
    if(!["in","out"].includes(m.direction)) errors.push("direction");
    if(!KINDS.includes(m.kind)) errors.push("kind");
    if(!Object.prototype.hasOwnProperty.call(CHANNELS, m.channel)) errors.push("channel");
    if(!(m.amount > 0)) errors.push("amount");
    if(!m.currency) errors.push("currency");
    if(!m.label) errors.push("label");
    if(!m.occurred_at) errors.push("occurred_at");
    return { ok: errors.length === 0, errors };
  }

  function toLegacyPayload(input){
    const m = canonicalMovement(input);
    const checked = validateConfirmed(m);
    if(!checked.ok) throw new Error("carnet_invalid:" + checked.errors.join(","));

    const legacyChannel = ["wave","cash","bank","other"].includes(m.channel) ? m.channel : "other";
    if(!LEGACY_SAFE_KINDS.includes(m.kind)){
      throw new Error("legacy_kind_unsupported:" + m.kind);
    }

    const legacyOrigin = ["module_sync","system"].includes(m.origin) ? m.origin : "manual";
    return {
      direction: m.direction,
      scope: m.scope === "personal" ? "perso" : "pro",
      kind: m.kind,
      category: m.category,
      channel: legacyChannel,
      amount_xof: m.amount,
      label: m.label,
      note_text: m.note || null,
      source_module: m.source_module || "PAY",
      source_id: m.source_id || m.client_id,
      origin: legacyOrigin,
      movement_date: String(m.occurred_at).slice(0,10),
      meta: Object.assign({}, m.meta, {
        carnet_client_id: m.client_id,
        carnet_channel: m.channel,
        carnet_origin: m.origin,
        carnet_contract: "v1",
        carnet_legacy_channel_fallback: legacyChannel !== m.channel
      })
    };
  }

  function fromLegacy(row){
    const meta = row?.meta || {};
    return canonicalMovement({
      id: row?.id,
      client_id: meta.carnet_client_id || row?.source_id || row?.id || null,
      member_slug: row?.slug || "",
      scope: row?.scope,
      direction: row?.direction,
      kind: row?.kind,
      category: row?.category,
      channel: meta.carnet_channel || row?.channel,
      amount: row?.amount_xof,
      currency: row?.currency_code || "XOF",
      label: row?.label,
      note: row?.note_text,
      source_module: row?.source_module,
      source_id: row?.source_id,
      origin: meta.carnet_origin || row?.origin,
      occurred_at: row?.movement_ts || row?.created_at,
      status: row?.status || "posted",
      meta
    });
  }

  function daySummary(rows, date = new Date()){
    const day = new Date(date).toDateString();
    const out = {
      salesRevenue:0, income:0, expenses:0, net:0, receivableOpen:0,
      byChannel:{}
    };
    Object.keys(CHANNELS).forEach(k => out.byChannel[k] = {in:0,out:0});
    (rows || []).map(fromLegacy).forEach(m => {
      if(m.status !== "posted") return;
      if(new Date(m.occurred_at).toDateString() !== day) return;
      if(m.direction === "in"){
        out.income += m.amount;
        if(m.kind === "sale" && m.scope === "activity") out.salesRevenue += m.amount;
      } else {
        out.expenses += m.amount;
      }
      if(!out.byChannel[m.channel]) out.byChannel[m.channel] = {in:0,out:0};
      out.byChannel[m.channel][m.direction] += m.amount;
    });
    out.net = out.income - out.expenses;
    return out;
  }

  window.DIGIY_CARNET_CONTRACT = Object.freeze({
    version:"v1",
    channels:CHANNELS,
    kinds:KINDS,
    legacySafeKinds:LEGACY_SAFE_KINDS,
    scopes:SCOPES,
    canonicalMovement,
    validateConfirmed,
    toLegacyPayload,
    fromLegacy,
    daySummary
  });
})();
