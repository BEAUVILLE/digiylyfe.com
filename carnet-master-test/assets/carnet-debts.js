(() => {
  "use strict";

  const Store = window.DIGIY_CARNET_STORE;
  const C = window.DIGIY_CARNET_MASTER || {};
  if(!Store) throw new Error("DIGIY_CARNET_STORE manquant");

  async function user(){ return Store.requireUser(); }

  async function list(){
    const u = await user();
    const db = Store.client();
    const {data,error} = await db
      .from("digiy_carnet_receivables")
      .select("id,member_slug,client_label,client_phone,amount_due_xof,amount_paid_xof,currency_code,debt_date,due_date,status,note_text,created_at,updated_at")
      .eq("owner_id",u.id)
      .eq("member_slug",C.identity.memberSlug)
      .neq("status","cancelled")
      .order("created_at",{ascending:false});
    if(error) throw error;
    return Array.isArray(data) ? data : [];
  }

  async function create(input){
    await Store.access();
    const label = String(input?.client_label || "").trim();
    const amount = Math.round(Number(input?.amount_due_xof || 0));
    if(!label) throw new Error("client_name_required");
    if(!(amount > 0)) throw new Error("bad_amount");

    const clientId = input?.client_id || (globalThis.crypto?.randomUUID ? crypto.randomUUID() : "d_"+Date.now().toString(36)+Math.random().toString(36).slice(2,10));
    const {data,error} = await Store.client().rpc("digiy_carnet_create_receivable",{
      p_member_slug:C.identity.memberSlug,
      p_client_label:label,
      p_amount_xof:amount,
      p_client_phone:String(input?.client_phone || "").trim() || null,
      p_due_date:input?.due_date || null,
      p_note_text:String(input?.note_text || "").trim() || null,
      p_client_id:clientId
    });
    if(error) throw error;
    if(!data?.ok) throw new Error(data?.error || "receivable_create_failed");

    const {data:row,error:rowError} = await Store.client()
      .from("digiy_carnet_receivables")
      .select("*")
      .eq("id",data.id)
      .single();
    if(rowError) throw rowError;
    return Object.assign({},row,{idempotent:data.idempotent===true});
  }

  async function payments(receivableId){
    const u = await user();
    const {data,error} = await Store.client()
      .from("digiy_carnet_receivable_payments")
      .select("id,receivable_id,amount_xof,channel,movement_id,paid_at,note_text,created_at")
      .eq("owner_id",u.id)
      .eq("receivable_id",receivableId)
      .order("paid_at",{ascending:true});
    if(error) throw error;
    return Array.isArray(data) ? data : [];
  }

  async function recordPayment(receivableId,input){
    await Store.access();
    const amount = Math.round(Number(input?.amount_xof || 0));
    const channel = String(input?.channel || "").trim();
    if(!(amount > 0)) throw new Error("bad_amount");
    if(!channel) throw new Error("channel_required");
    const clientId = input?.client_id || (globalThis.crypto?.randomUUID ? crypto.randomUUID() : "rp_"+Date.now().toString(36)+Math.random().toString(36).slice(2,10));

    const {data,error} = await Store.client().rpc("digiy_carnet_record_receivable_payment",{
      p_receivable_id:receivableId,
      p_amount_xof:amount,
      p_channel:channel,
      p_client_id:clientId,
      p_paid_at:input?.paid_at || new Date().toISOString(),
      p_note_text:String(input?.note_text || "").trim() || null
    });
    if(error) throw error;
    if(!data?.ok) throw new Error(data?.error || "receivable_payment_failed");
    return data;
  }

  async function cancel(receivableId){
    await Store.access();
    const {data,error} = await Store.client().rpc("digiy_carnet_cancel_receivable",{
      p_receivable_id:receivableId
    });
    if(error) throw error;
    if(!data?.ok) throw new Error(data?.error || "receivable_cancel_failed");
    return data;
  }

  window.DIGIY_CARNET_DEBTS = Object.freeze({list,create,payments,recordPayment,cancel});
})();