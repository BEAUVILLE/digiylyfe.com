/* Annuaire DIGIY · inscription volontaire immédiate (sans WhatsApp intermédiaire).
 * La clé publique anon est partagée par la page; aucune clé service_role ici. */
(function () {
  'use strict';
  var config = window.DIGIY_ANNUAIRE_CONFIG;
  if (!config || !config.base || !config.key) return;

  var form = document.getElementById('registration');
  var status = document.getElementById('registrationStatus');
  var success = document.getElementById('registrationSuccess');
  var publicLink = document.getElementById('publicLink');
  var manageLink = document.getElementById('manageLink');
  var submit = form.querySelector('button[type=submit]');
  var editForm = document.getElementById('managementForm');
  var management = document.getElementById('gestion');
  var managementStatus = document.getElementById('managementStatus');
  var current = null;
  var busy = false;

  function field(id){return document.getElementById(id)}
  function digits(v){return String(v || '').replace(/\D/g, '')}
  function record(prefix) {
    return {
      p_name: field(prefix+'Name').value.trim(),
      p_activity: field(prefix+'Activity').value.trim(),
      p_department: field(prefix+'Department').value,
      p_country: field(prefix+'Country').value,
      p_city: field(prefix+'City').value.trim(),
      p_whatsapp: digits(field(prefix+'Whatsapp').value)
    };
  }
  function humanError(e) {
    var msg=String(e && e.message || e || '');
    if(msg.includes('DEJA_INSCRIT')) return 'Cette activité semble déjà inscrite avec ce WhatsApp. Utilisez votre lien de gestion ou contactez DIGIY.';
    if(msg.includes('CONSENTEMENT_REQUIS')) return 'Veuillez autoriser la publication de vos coordonnées.';
    if(msg.includes('WHATSAPP_INVALIDE')) return 'Indiquez un numéro WhatsApp international valide.';
    if(msg.includes('TROP_DE_DEMANDES')) return 'Trop de demandes depuis votre connexion. Réessayez plus tard.';
    if(msg.includes('INSCRIPTION_REFUSEE')) return 'Inscription non acceptée. Réessayez.';
    if(msg.includes('CHAMPS_INVALIDES') || msg.includes('DEPARTEMENT_INVALIDE') || msg.includes('PAYS_INVALIDE')) return 'Vérifiez les champs du formulaire.';
    if(msg.includes('function') || msg.includes('PGRST202') || msg.includes('404')) return 'Le service automatique n’est pas encore disponible. Aucune inscription n’a été enregistrée.';
    return 'La publication n’a pas pu être confirmée. Vérifiez d’abord si votre fiche apparaît dans « Comment me trouver » avant toute nouvelle tentative.';
  }
  async function rpc(name, body) {
    var response = await fetch(config.base+'rpc/'+name,{
      method:'POST',
      headers:{apikey:config.key,Authorization:'Bearer '+config.key,'Content-Type':'application/json',Accept:'application/json'},
      body:JSON.stringify(body),cache:'no-store'
    });
    var data=await response.json().catch(function(){return {}});
    if(!response.ok) throw new Error(data.message || 'HTTP '+response.status);
    return data;
  }
  async function copy(v, el) {
    try { await navigator.clipboard.writeText(v); el.textContent='Lien copié ✓'; }
    catch (_) { el.textContent='Sélectionnez puis copiez le lien affiché.'; }
  }
  // Le lien PUBLIC peut rester accessible sur le même appareil après fermeture du formulaire.
  // Ne jamais stocker le jeton ni le lien privé de gestion dans le navigateur.
  var lastPublicKey='digiy_annuaire_dernier_lien_public_v1';
  function savePublicLink(url) {
    try { sessionStorage.setItem(lastPublicKey,url); } catch (_) {}
  }
  function addPublicActions(url) {
    var actions=field('registrationPublicActions');
    if(!actions) {
      actions=document.createElement('div');
      actions.id='registrationPublicActions';
      actions.className='linkTools';
      actions.style.cssText='display:flex;flex-wrap:wrap;gap:10px;margin:14px 0;';
      publicLink.parentNode.insertBefore(actions,publicLink.nextSibling);
    }
    actions.replaceChildren();
    var open=document.createElement('a');
    open.href=url; open.target='_blank';open.rel='noopener';
    open.textContent='🔎 Ouvrir ma fiche DIGIY';
    open.className='cta primary';
    open.style.cssText='display:inline-flex;min-height:48px;align-items:center;padding:12px 16px;border-radius:10px;background:#14663e;color:white;font-weight:800;text-decoration:none';
    actions.appendChild(open);
    var share=document.createElement('a');
    share.href='https://wa.me/?text='+encodeURIComponent('Voici ma fiche DIGIY : '+url);
    share.target='_blank';share.rel='noopener';
    share.textContent='📲 Partager sur WhatsApp';
    share.style.cssText='display:inline-flex;min-height:48px;align-items:center;padding:12px 16px;border-radius:10px;background:#e9f7ec;color:#125b32;font-weight:800;text-decoration:none';
    actions.appendChild(share);
  }
  function showPublicLink(id) {
    var url=location.origin+location.pathname+'?fiche='+encodeURIComponent(id);
    publicLink.value=url;savePublicLink(url);addPublicActions(url);
    return url;
  }
  function restorePublicLink() {
    var url=null;
    try { url=sessionStorage.getItem(lastPublicKey); } catch (_) {}
    if(!url) return;
    try {
      var parsed=new URL(url);
      if(parsed.origin!==location.origin || parsed.pathname!==location.pathname ||
         !/^[0-9a-f-]{36}$/i.test(parsed.searchParams.get('fiche')||'')) return;
    } catch (_) { return; }
    var recovery=field('registrationPublicRecovery');
    if(!recovery) {
      recovery=document.createElement('p');
      recovery.id='registrationPublicRecovery';
      recovery.className='note';
      form.insertBefore(recovery,status);
    }
    recovery.replaceChildren();
    recovery.appendChild(document.createTextNode('Déjà inscrit sur cet appareil ? Retrouvez le lien public de votre dernière fiche : '));
    var link=document.createElement('a');
    link.href=url;link.textContent='Ouvrir ma fiche';link.target='_blank';link.rel='noopener';
    recovery.appendChild(link);
  }
  restorePublicLink();
  field('copyPublic').addEventListener('click',function(){copy(publicLink.value,this)});
  field('copyManage').addEventListener('click',function(){copy(manageLink.value,this)});

  form.addEventListener('submit',async function(e) {
    e.preventDefault();
    if(busy || !form.reportValidity()) return;
    var phone=digits(field('whatsapp').value);
    if(phone.length<8 || phone.length>15){status.textContent='WhatsApp : 8 à 15 chiffres, avec indicatif pays.';return}
    var payload={
      p_name:field('name').value.trim(),
      p_activity:field('activity').value.trim(),
      p_department:field('regDepartment').value,
      p_country:field('regCountry').value,
      p_city:field('city').value.trim(),
      p_whatsapp:phone,
      p_consent:field('consent').checked,
      p_piege:field('sitecheck').value
    };
    busy=true;submit.disabled=true;status.textContent='Enregistrement de votre inscription…';success.hidden=true;success.style.display='none';
    try {
      var result=await rpc('digiy_annuaire_inscrire',payload);
      // PostgreSQL RPCs can return an object, a JSON-encoded object or a one-row array.
      if(typeof result==='string') {
        try { result=JSON.parse(result); } catch (_) { result=null; }
      }
      if(Array.isArray(result)) result=result.length===1?result[0]:null;
      var validId=result && typeof result.id==='string' &&
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(result.id);
      var validToken=result && typeof result.token==='string' && /^[0-9a-f]{48}$/i.test(result.token);
      if(!validId || !validToken) {
        // A successful HTTP response does not prove that the transaction was rolled back.
        // In particular, do not invite a second registration or invent a management token.
        status.textContent='Réponse d’inscription incomplète : la publication est à vérifier. Recherchez votre nom dans « Comment me trouver » et contactez DIGIY à contact@digiylyfe.com pour récupérer un accès de gestion sécurisé. Ne vous réinscrivez pas.';
        if(validId) {
          showPublicLink(result.id);
          // Never display the success panel with a blank management link.
          var publicOnly=document.createElement('a');
          publicOnly.href=publicLink.value;
          publicOnly.textContent='Voir le lien public de ma fiche';
          publicOnly.className='cta primary';
          publicOnly.style.display='inline-block';
          publicOnly.style.marginTop='12px';
          status.appendChild(document.createTextNode(' '));
          status.appendChild(publicOnly);
        }
        status.scrollIntoView({behavior:'smooth',block:'center'});
        return;
      }
      showPublicLink(result.id);
      manageLink.value=location.origin+location.pathname+'#gestion='+encodeURIComponent(result.id)+'.'+result.token;
      success.hidden=false;
      success.style.cssText='display:block;border:3px solid #14663e;background:#f0fff2;padding:20px;margin-top:18px;';
      status.textContent='Votre inscription gratuite est publiée ! Copiez votre lien public et conservez votre lien privé de gestion.';
      // Keep the confirmation displayed, even if refreshing the directory fails.
      form.reset();
      field('regCountry').value='sn';
      restorePublicLink();
      success.scrollIntoView({behavior:'smooth',block:'center'});
      if(typeof window.DIGIY_ANNUAIRE_REFRESH==='function') {
        window.DIGIY_ANNUAIRE_REFRESH().catch(function(){status.textContent+=' Actualisez la page si elle n’apparaît pas encore dans les résultats.'});
      }
    } catch (err) {status.textContent=humanError(err);status.scrollIntoView({behavior:'smooth',block:'center'});}
    finally {busy=false;submit.disabled=false;}
  });

  function parseManagement() {
    var match=location.hash.match(/^#gestion=([0-9a-f-]{36})\.([0-9a-f]{48})$/);
    return match?{id:match[1],token:match[2]}:null;
  }
  function managementMessage(s){managementStatus.textContent=s}
  async function openManagement() {
    current=parseManagement();
    management.hidden=!current;
    if(!current) return;
    managementMessage('Chargement de la fiche…');
    try {
      var url=config.base+'digiy_annuaire_volontaires?'+new URLSearchParams({
        select:'id,display_name,activity_label,department,country_code,city,whatsapp_public',
        id:'eq.'+current.id,limit:'1'
      });
      var r=await fetch(url,{headers:{apikey:config.key,Authorization:'Bearer '+config.key},cache:'no-store'});
      if(!r.ok) throw Error('Lecture impossible');
      var data=await r.json();
      if(!data.length){editForm.hidden=true;managementMessage('Cette fiche n’est plus publique, ou elle a été retirée. Pour une réclamation, contactez DIGIY.');return}
      var p=data[0];
      field('editName').value=p.display_name;
      field('editActivity').value=p.activity_label;
      field('editDepartment').value=p.department;
      field('editCountry').value=p.country_code;
      field('editCity').value=p.city;
      field('editWhatsapp').value=p.whatsapp_public;
      editForm.hidden=false;
      managementMessage('Vous pouvez modifier ou retirer votre fiche sans validation manuelle.');
      management.scrollIntoView({block:'start',behavior:'smooth'});
    } catch(err){editForm.hidden=true;managementMessage('Fiche indisponible. Réessayez plus tard.');}
  }
  editForm.addEventListener('submit',async function(e) {
    e.preventDefault();if(!current || busy || !editForm.reportValidity())return;
    busy=true;managementMessage('Mise à jour…');
    try{
      var payload=record('edit');
      var ok=await rpc('digiy_annuaire_gerer',Object.assign({p_id:current.id,p_token:current.token,p_action:'modifier'},payload));
      if(ok!==true)throw Error('Accès de gestion invalide');
      managementMessage('Fiche mise à jour. Modifications immédiatement visibles.');
      if(typeof window.DIGIY_ANNUAIRE_REFRESH==='function')window.DIGIY_ANNUAIRE_REFRESH().catch(function(){});
    }catch(err){managementMessage(humanError(err)+' Vérifiez votre lien privé de gestion.');}
    finally{busy=false;}
  });
  field('removeProfile').addEventListener('click',async function() {
    if(!current || busy || !confirm('Retirer cette fiche de l’annuaire public ?'))return;
    busy=true;managementMessage('Retrait en cours…');
    try{
      var ok=await rpc('digiy_annuaire_gerer',{p_id:current.id,p_token:current.token,p_action:'retirer'});
      if(ok!==true)throw Error('Accès de gestion invalide');
      editForm.hidden=true;managementMessage('Votre fiche a été retirée de l’annuaire.');
      if(typeof window.DIGIY_ANNUAIRE_REFRESH==='function')window.DIGIY_ANNUAIRE_REFRESH().catch(function(){});
    }catch(err){managementMessage('Retrait non confirmé. Réessayez ou contactez DIGIY.');}
    finally{busy=false;}
  });
  window.addEventListener('hashchange',openManagement);
  openManagement();
})();
