// DIGIYLYFE — PRO CARNET -> CARNET STORE bridge
// V1 : synchronise uniquement les NOUVELLES traces confirmées du cockpit existant.
// Aucun bouton, libellé ou calcul du cockpit n'est modifié ici.
(() => {
  "use strict";

  const STORAGE_KEY = "digiy_pay_baptiste_reel_v2";
  const Store = window.DIGIY_CARNET_STORE;
  if (!Store) throw new Error("carnet_store_missing_for_pro_sync");

  const nativeGet = Storage.prototype.getItem;
  const nativeSet = Storage.prototype.setItem;
  let installed = false;
  let flushing = false;
  let chain = Promise.resolve();
  const seen = new Set();

  function parse(raw){
    try {
      const value = JSON.parse(raw || "{}");
      return value && typeof value === "object" ? value : {};
    } catch (_) {
      return {};
    }
  }

  function movementsFrom(raw){
    const state = parse(raw);
    return Array.isArray(state.movements) ? state.movements : [];
  }

  function localId(m){
    return String(m?.client_id || m?.id || "").trim();
  }

  function category(value){
    const out = String(value || "pro_carnet")
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .toLowerCase().replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "");
    return out || "pro_carnet";
  }

  function canonical(m){
    const pocket = m?.pocket === "perso" ? "perso" : "pro";
    const direction = m?.type === "expense" ? "out" : "in";
    return {
      client_id: localId(m),
      scope: pocket === "perso" ? "personal" : "activity",
      direction,
      kind: direction === "out" ? "expense" : "sale",
      category: category(m?.activity || m?.label),
      channel: m?.mode || "other",
      amount: Number(m?.amount || 0),
      currency: "XOF",
      label: String(m?.label || "").trim(),
      note: String(m?.note || "").trim(),
      source_module: "CARNET",
      source_id: localId(m),
      origin: "manual",
      occurred_at: m?.ts || new Date().toISOString(),
      status: "posted",
      meta: {
        pro_carnet_bridge: "v1",
        pro_carnet_activity: String(m?.activity || ""),
        pro_carnet_person: String(m?.person || ""),
        pro_carnet_pocket: pocket,
        pro_carnet_mode: String(m?.mode || "")
      }
    };
  }

  function emit(name, detail){
    try { window.dispatchEvent(new CustomEvent(name, {detail})); } catch (_) {}
  }

  async function send(m){
    const id = localId(m);
    if (!id || !(Number(m?.amount || 0) > 0) || !String(m?.label || "").trim()) return;
    try {
      const saved = await Store.insertMovement(canonical(m));
      emit("digiy:carnet-synced", {client_id:id, id:saved?.id || null, idempotent:saved?.idempotent === true});
    } catch (err) {
      try {
        Store.queueDraft(canonical(m));
        emit("digiy:carnet-queued", {client_id:id, error:String(err?.message || err)});
      } catch (queueErr) {
        emit("digiy:carnet-sync-error", {client_id:id, error:String(queueErr?.message || queueErr)});
      }
    }
  }

  function enqueue(m){
    chain = chain.then(() => send(m)).catch(() => {});
    return chain;
  }

  function detect(raw){
    for (const m of movementsFrom(raw)) {
      const id = localId(m);
      if (!id || seen.has(id)) continue;
      seen.add(id);
      enqueue(m);
    }
  }

  function seed(){
    const raw = nativeGet.call(localStorage, STORAGE_KEY);
    for (const m of movementsFrom(raw)) {
      const id = localId(m);
      if (id) seen.add(id);
    }
  }

  function install(){
    if (installed) return;
    installed = true;
    seed();

    Storage.prototype.setItem = function(key, value){
      const result = nativeSet.call(this, key, value);
      if (this === localStorage && String(key) === STORAGE_KEY) {
        detect(String(value || ""));
      }
      return result;
    };

    window.addEventListener("online", () => {
      if (flushing) return;
      flushing = true;
      Store.syncQueued().catch(() => {}).finally(() => { flushing = false; });
    });

    Store.syncQueued().catch(() => {});
  }

  install();

  window.DIGIY_PRO_CARNET_SYNC = Object.freeze({
    version: "v1-new-traces-only",
    storageKey: STORAGE_KEY,
    queued: () => Store.queued(),
    syncQueued: () => Store.syncQueued()
  });
})();
