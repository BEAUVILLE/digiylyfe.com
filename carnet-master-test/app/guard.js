// CARNET MASTER TEST — garde OTP autour du rail PRO CARNET figé.
(() => {
  "use strict";

  try { document.documentElement.style.visibility = "hidden"; } catch (_) {}

  const root = "../";
  const scripts = [
    root + "master-config.js",
    "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.112.3",
    root + "assets/carnet-contract.js",
    root + "assets/carnet-store.js",
    root + "assets/pro-carnet-sync.js"
  ];

  const show = () => {
    try { document.documentElement.style.visibility = ""; } catch (_) {}
  };

  const goDoor = () => location.replace(root + "index.html");

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = false;
      script.onload = resolve;
      script.onerror = () => reject(new Error("script_load_failed:" + src));
      document.head.appendChild(script);
    });
  }

  async function verify() {
    for (const src of scripts) await loadScript(src);
    const Store = window.DIGIY_CARNET_STORE;
    if (!Store) throw new Error("carnet_store_missing");
    const access = await Store.access();
    if (!access?.ok) throw new Error(access?.error || "carnet_access_denied");
    window.DIGIY_CARNET_GUARD = Object.freeze({ ok:true, access });
    show();
  }

  verify().catch(goDoor);
})();
