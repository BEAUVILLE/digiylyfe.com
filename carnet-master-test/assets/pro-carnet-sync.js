// DIGIYLYFE — PRO CARNET <-> CARNET STORE bridge
// V2 : nouvelles traces + modifications + suppressions + hydratation + reprise hors ligne.
// Aucun bouton, libellé ou calcul du cockpit n'est modifié ici.
(() => {
  "use strict";

  const C = window.DIGIY_CARNET_MASTER || {};
  const STORAGE_KEY = "digiy_pay_baptiste_reel_v2";
  const Store = window.DIGIY_CARNET_STORE;
  if (!Store) throw new Error("carnet_store_missing_for_pro_sync");

  const slug = String(C.identity?.memberSlug || "master");
  const OPS_KEY = "DIGIY_CARNET_OPS_V2:" + slug;
  const KNOWN_KEY = "DIGIY_CARNET_KNOWN_V2:" + slug;
  const nativeGet = Storage.prototype.getItem;
  const nativeSet = Storage.prototype.setItem;

  let installed = false;
  let suspended = false;
  let flushing = false;
  let chain = Promise.resolve();
  let baseline = new Map();
  let known = readKnown();

  function parse(raw){
    try {
      const value = JSON.parse(raw || "{}");
      return value && typeof value === "object" ? value : {};
    } catch (_) { return {}; }
  }

  function localId(m){ return String(m?.client_id || m?.id || "").trim(); }
  function movementsFrom(raw){
    const state = parse(raw);
    return Array.isArray(state.movements) ? state.movements : [];
  }
  function mapMovements(rows){
    const out = new Map();
    for(const m of rows || []){
      const id = localId(m);
      if(id) out.set(id, m);
    }
    return out;
  }

  function signature(m){
    return JSON.stringify([
      m?.pocket === "perso" ? "perso" : "pro",
      m?.type === "expense" ? "expense" : "income",
      String(m?.mode || ""),
      Math.round(Number(m?.amount || 0)),
      String(m?.label || "").trim(),
      String(m?.activity || ""),
      String(m?.person || ""),
      String(m?.note || ""),
      String(m?.ts || "")
    ]);
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
        pro_carnet_bridge: "v2",
        pro_carnet_activity: String(m?.activity || ""),
        pro_carnet_person: String(m?.person || ""),
        pro_carnet_pocket: pocket,
        pro_carnet_mode: String(m?.mode || ""),
        pro_carnet_updated_at: String(m?.updatedAt || ""),
        pro_carnet_ts: String(m?.ts || "")
      }
    };
  }

  function modeFromRemote(m){
    const raw = String(m?.meta?.pro_carnet_mode || "").trim();
    if(raw) return raw;
    return ({wave:"Wave",orange_money:"OM",cash:"Cash",bank:"Virement",card:"CB",sendwave:"Virement",other:"Wave"})[m?.channel] || "Wave";
  }

  function localFromRemote(m){
    const id = String(m?.client_id || m?.source_id || m?.id || "").trim();
    return {
      id,
      pocket:m?.scope === "personal" ? "perso" : "pro",
      type:m?.direction === "out" ? "expense" : "income",
      mode:modeFromRemote(m),
      amount:Number(m?.amount || 0),
      label:String(m?.label || "").trim(),
      activity:String(m?.meta?.pro_carnet_activity || "PRO CARNET"),
      person:String(m?.meta?.pro_carnet_person || ""),
      note:String(m?.note || ""),
      ts:m?.meta?.pro_carnet_ts || m?.occurred_at || new Date().toISOString(),
      updatedAt:String(m?.meta?.pro_carnet_updated_at || "")
    };
  }

  function readArray(key){
    try { const x = JSON.parse(nativeGet.call(localStorage, key) || "[]"); return Array.isArray(x) ? x : []; }
    catch (_) { return []; }
  }
  function writeArray(key, rows){ nativeSet.call(localStorage, key, JSON.stringify(rows || [])); }
  function readKnown(){ return new Set(readArray(KNOWN_KEY).map(String).filter(Boolean)); }
  function writeKnown(){ writeArray(KNOWN_KEY, [...known].slice(-1000)); }
  function readOps(){ return readArray(OPS_KEY); }
  function writeOps(rows){ writeArray(OPS_KEY, (rows || []).slice(-500)); }

  function queueOp(op){
    const id = String(op?.client_id || "").trim();
    if(!id) return;
    let rows = readOps();
    if(op.type === "update") rows = rows.filter(x => !(x.client_id === id && x.type === "update"));
    if(op.type === "delete") rows = rows.filter(x => x.client_id !== id);
    rows.push(Object.assign({queued_at:new Date().toISOString()}, op, {client_id:id}));
    writeOps(rows);
  }

  function emit(name, detail){
    try { window.dispatchEvent(new CustomEvent(name, {detail})); } catch (_) {}
  }

  async function sendInsert(m){
    const id = localId(m);
    if (!id || !(Number(m?.amount || 0) > 0) || !String(m?.label || "").trim()) return;
    try {
      const saved = await Store.insertMovement(canonical(m));
      known.add(id); writeKnown();
      emit("digiy:carnet-synced", {op:"insert",client_id:id,id:saved?.id || null,idempotent:saved?.idempotent === true});
    } catch (err) {
      try {
        Store.queueDraft(canonical(m));
        emit("digiy:carnet-queued", {op:"insert",client_id:id,error:String(err?.message || err)});
      } catch (queueErr) {
        emit("digiy:carnet-sync-error", {op:"insert",client_id:id,error:String(queueErr?.message || queueErr)});
      }
    }
  }

  async function sendUpdate(m){
    const id = localId(m);
    if(!id) return;
    try {
      await Store.updateMovement(id, canonical(m));
      known.add(id); writeKnown();
      emit("digiy:carnet-synced", {op:"update",client_id:id});
    } catch (err) {
      const message = String(err?.message || err);
      if(message.includes("movement_not_found")){
        try {
          const saved = await Store.insertMovement(canonical(m));
          known.add(id); writeKnown();
          emit("digiy:carnet-synced", {op:"insert_after_update",client_id:id,id:saved?.id || null});
          return;
        } catch (_) {}
      }
      queueOp({type:"update",client_id:id,movement:m});
      emit("digiy:carnet-queued", {op:"update",client_id:id,error:message});
    }
  }

  async function sendDelete(id){
    id = String(id || "").trim();
    if(!id) return;
    try {
      await Store.deleteMovementByClientId(id);
      known.delete(id); writeKnown();
      emit("digiy:carnet-synced", {op:"delete",client_id:id});
    } catch (err) {
      if(String(err?.message || err).includes("movement_not_found")){
        known.delete(id); writeKnown();
        return;
      }
      queueOp({type:"delete",client_id:id});
      emit("digiy:carnet-queued", {op:"delete",client_id:id,error:String(err?.message || err)});
    }
  }

  function enqueue(task){
    chain = chain.then(task).catch(() => {});
    return chain;
  }

  function detect(raw){
    if(suspended) return;
    const next = mapMovements(movementsFrom(raw));
    for(const [id,m] of next){
      const old = baseline.get(id);
      if(!old) enqueue(() => sendInsert(m));
      else if(signature(old) !== signature(m)) enqueue(() => sendUpdate(m));
    }
    for(const id of baseline.keys()) if(!next.has(id)) enqueue(() => sendDelete(id));
    baseline = next;
  }

  async function flushOps(){
    const before = readOps();
    if(!before.length) return {synced:0,remaining:0};
    const remaining = [];
    let synced = 0;
    for(const op of before){
      try {
        if(op.type === "update"){
          try {
            await Store.updateMovement(op.client_id, canonical(op.movement || {}));
          } catch (err) {
            if(String(err?.message || err).includes("movement_not_found")) await Store.insertMovement(canonical(op.movement || {}));
            else throw err;
          }
        } else if(op.type === "delete") await Store.deleteMovementByClientId(op.client_id);
        else continue;
        if(op.type === "delete") known.delete(op.client_id); else known.add(op.client_id);
        synced++;
      } catch (err) {
        if(op.type === "delete" && String(err?.message || err).includes("movement_not_found")){
          known.delete(op.client_id); synced++; continue;
        }
        remaining.push(Object.assign({}, op, {last_error:String(err?.message || err),last_try:new Date().toISOString()}));
      }
    }
    writeKnown();
    writeOps(remaining);
    return {synced,remaining:remaining.length};
  }

  async function flushAll(){
    if(flushing) return;
    flushing = true;
    try {
      const inserted = await Store.syncQueued();
      for(const item of inserted?.items || []) if(item?.client_id) known.add(String(item.client_id));
      writeKnown();
      await flushOps();
      await hydrate();
    } finally { flushing = false; }
  }

  async function hydrate(){
    const remote = (await Store.listMovements(100)).filter(m => String(m?.source_module || "").toUpperCase() === "CARNET");
    const remoteMap = new Map();
    for(const row of remote){
      const local = localFromRemote(row);
      const id = localId(local);
      if(id){ remoteMap.set(id, local); known.add(id); }
    }

    const raw = nativeGet.call(localStorage, STORAGE_KEY);
    const state = parse(raw);
    const locals = Array.isArray(state.movements) ? state.movements : [];
    const beforeMovements = JSON.stringify(locals);
    const localMap = mapMovements(locals);
    const queuedIds = new Set(Store.queued().map(x => String(x?.client_id || "")).filter(Boolean));
    const opRows = readOps();
    const pendingIds = new Set(opRows.map(x => String(x?.client_id || "")).filter(Boolean));
    const pendingUpdates = new Set(opRows.filter(x => x?.type === "update").map(x => String(x?.client_id || "")).filter(Boolean));
    const pendingDeletes = new Set(opRows.filter(x => x?.type === "delete").map(x => String(x?.client_id || "")).filter(Boolean));

    for(const id of [...known]){
      if(!remoteMap.has(id) && !queuedIds.has(id) && !pendingIds.has(id)) localMap.delete(id);
    }
    for(const [id,m] of remoteMap){
      if(pendingDeletes.has(id)) continue;
      if(pendingUpdates.has(id) && localMap.has(id)) continue;
      localMap.set(id,m);
    }

    state.movements = [...localMap.values()];
    const changed = JSON.stringify(state.movements) !== beforeMovements;
    suspended = true;
    try { nativeSet.call(localStorage, STORAGE_KEY, JSON.stringify(state)); }
    finally { suspended = false; }
    baseline = mapMovements(state.movements);
    writeKnown();
    emit("digiy:carnet-hydrated", {count:remoteMap.size,changed});
    if(changed) setTimeout(() => location.reload(), 30);
    return remoteMap.size;
  }

  function install(){
    if(installed) return;
    installed = true;
    baseline = mapMovements(movementsFrom(nativeGet.call(localStorage, STORAGE_KEY)));

    Storage.prototype.setItem = function(key, value){
      const result = nativeSet.call(this, key, value);
      if(this === localStorage && String(key) === STORAGE_KEY) detect(String(value || ""));
      return result;
    };

    window.addEventListener("online", () => { flushAll().catch(() => {}); });
    hydrate().then(() => flushAll()).catch(() => {});
  }

  install();

  window.DIGIY_PRO_CARNET_SYNC = Object.freeze({
    version:"v2-mutations-hydration-offline",
    storageKey:STORAGE_KEY,
    queued:() => ({inserts:Store.queued(),operations:readOps()}),
    hydrate,
    flush:flushAll
  });
})();
