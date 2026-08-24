(() => {
  "use strict";

  const C = window.DIGIY_CARNET_MASTER || {};
  const Contract = window.DIGIY_CARNET_CONTRACT;
  if(!Contract) throw new Error("DIGIY_CARNET_CONTRACT manquant");

  let db = null;

  function configured(){
    const a = C.auth || {}, i = C.identity || {};
    return /^https:\/\/.+\.supabase\.co$/i.test(String(a.supabaseUrl || "")) &&
      !!a.publishableKey && !String(a.publishableKey).startsWith("[") &&
      !!i.memberSlug && !String(i.memberSlug).startsWith("[");
  }

  function client(){
    if(db) return db;
    if(!configured()) throw new Error("carnet_master_not_configured");
    if(!window.supabase?.createClient) throw new Error("supabase_js_missing");
    db = window.supabase.createClient(C.auth.supabaseUrl, C.auth.publishableKey, {
      auth:{persistSession:true,detectSessionInUrl:true,autoRefreshToken:true}
    });
    return db;
  }

  async function requireUser(){
    const {data,error} = await client().auth.getUser();
    if(error) throw error;
    if(!data?.user) throw new Error("auth_required");
    return data.user;
  }

  async function access(){
    await requireUser();
    const {data,error} = await client().rpc("digiy_carnet_my_access", {p_slug:C.identity.memberSlug});
    if(error) throw error;
    if(!data?.ok) throw new Error(data?.error || "carnet_access_denied");
    return data;
  }

  async function listMovements(limit = 100){
    await access();
    const {data,error} = await client().rpc("digiy_carnet_list_movements", {
      p_slug:C.identity.memberSlug,
      p_limit:Math.max(1,Math.min(Number(limit)||100,100))
    });
    if(error) throw error;
    if(!data?.ok) throw new Error(data?.error || "carnet_list_failed");
    return (Array.isArray(data.items) ? data.items : []).map(Contract.fromLegacy);
  }

  function confirmed(input, clientId){
    const movement = Contract.canonicalMovement(Object.assign({}, input, {
      client_id:clientId || input?.client_id,
      member_slug:C.identity.memberSlug,
      status:"posted"
    }));
    const validation = Contract.validateConfirmed(movement);
    if(!validation.ok) throw new Error("carnet_invalid:" + validation.errors.join(","));
    return movement;
  }

  async function insertMovement(input){
    await access();
    const movement = confirmed(input);
    const payload = Contract.toLegacyPayload(movement);
    const {data,error} = await client().rpc("digiy_carnet_insert_movement", {
      p_slug:C.identity.memberSlug,
      p_payload:payload
    });
    if(error) throw error;
    if(!data?.ok) throw new Error(data?.error || "carnet_insert_failed");
    return Object.assign({}, movement, {id:data.id || movement.id,status:"posted",idempotent:data.idempotent === true});
  }

  async function updateMovement(clientId, input){
    const sourceId = String(clientId || input?.client_id || "").trim();
    if(!sourceId) throw new Error("movement_client_id_missing");
    await access();
    const movement = confirmed(input, sourceId);
    const payload = Contract.toLegacyPayload(movement);
    const {data,error} = await client().rpc("digiy_carnet_update_movement", {
      p_slug:C.identity.memberSlug,
      p_source_id:sourceId,
      p_payload:payload
    });
    if(error) throw error;
    if(!data?.ok) throw new Error(data?.error || "carnet_update_failed");
    return Object.assign({}, movement, {id:data.id || movement.id,status:"posted"});
  }

  async function deleteMovement(id){
    if(!id) throw new Error("movement_id_missing");
    await access();
    const {data,error} = await client().rpc("digiy_carnet_delete_movement", {p_slug:C.identity.memberSlug,p_id:id});
    if(error) throw error;
    if(!data?.ok) throw new Error(data?.error || "carnet_delete_failed");
    return true;
  }

  async function deleteMovementByClientId(clientId){
    const sourceId = String(clientId || "").trim();
    if(!sourceId) throw new Error("movement_client_id_missing");
    await access();
    const {data,error} = await client().rpc("digiy_carnet_delete_movement_source", {
      p_slug:C.identity.memberSlug,
      p_source_id:sourceId
    });
    if(error) throw error;
    if(!data?.ok) throw new Error(data?.error || "carnet_delete_failed");
    return true;
  }

  async function daySummary(date = new Date()){
    const rows = await listMovements(100);
    const day = new Date(date).toDateString();
    const out = {salesRevenue:0,income:0,expenses:0,net:0,receivableOpen:0,byChannel:{}};
    Object.keys(Contract.channels).forEach(k => out.byChannel[k] = {in:0,out:0});
    rows.forEach(m => {
      if(m.status !== "posted" || new Date(m.occurred_at).toDateString() !== day) return;
      if(m.direction === "in"){
        out.income += m.amount;
        if(m.kind === "sale" && m.scope === "activity") out.salesRevenue += m.amount;
      }else out.expenses += m.amount;
      if(!out.byChannel[m.channel]) out.byChannel[m.channel] = {in:0,out:0};
      out.byChannel[m.channel][m.direction] += m.amount;
    });
    out.net = out.income - out.expenses;
    return out;
  }

  function queueKey(){ return "DIGIY_CARNET_QUEUE_V1:" + String(C.identity?.memberSlug || "master"); }
  function readQueue(){ try{const p=JSON.parse(localStorage.getItem(queueKey())||"[]");return Array.isArray(p)?p:[]}catch(_){return []} }
  function writeQueue(rows){ localStorage.setItem(queueKey(),JSON.stringify((rows||[]).slice(-200))); }
  function queueDraft(input){
    const movement = Contract.canonicalMovement(Object.assign({},input,{member_slug:C.identity?.memberSlug||"",status:"queued",origin:"offline_sync"}));
    const validation = Contract.validateConfirmed(movement);
    if(!validation.ok) throw new Error("carnet_invalid:" + validation.errors.join(","));
    const q=readQueue();
    if(!q.some(x=>x.client_id===movement.client_id)) q.push(movement);
    writeQueue(q);
    return movement;
  }
  function queued(){return readQueue()}
  async function syncQueued(){
    await access();
    const before=readQueue();
    if(!before.length) return {ok:true,synced:0,remaining:0,items:[]};
    const remaining=[],synced=[];
    for(const movement of before){
      try{
        const saved=await insertMovement(Object.assign({},movement,{status:"posted",origin:"offline_sync"}));
        synced.push({client_id:movement.client_id,id:saved.id,idempotent:saved.idempotent===true});
      }catch(err){
        remaining.push(Object.assign({},movement,{status:"queued",last_sync_error:String(err?.message||err),last_sync_at:new Date().toISOString()}));
      }
    }
    writeQueue(remaining);
    return {ok:remaining.length===0,synced:synced.length,remaining:remaining.length,items:synced};
  }

  window.DIGIY_CARNET_STORE = Object.freeze({
    configured,client,requireUser,access,listMovements,insertMovement,updateMovement,
    deleteMovement,deleteMovementByClientId,daySummary,queueDraft,queued,syncQueued
  });
})();
