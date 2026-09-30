/**
 * DIGIY GEO PROFILE V1
 * Shared, non-visual helper for professional pages.
 *
 * Usage:
 * window.DIGIY_GEO_PROFILE = {
 *   type: "Plumber",
 *   name: "Babacar Plombier Pro",
 *   description: "...",
 *   url: "https://...",
 *   telephone: "+221...",
 *   whatsapp: "https://wa.me/...",
 *   image: "https://...",
 *   addressLocality: "Mbour",
 *   addressRegion: "Thiès",
 *   addressCountry: "SN",
 *   areaServed: ["Mbour","Saly","Ngaparou","Petite Côte"],
 *   serviceType: ["Dépannage plomberie","Fuite d’eau"],
 *   priceRange: "$$",
 *   openingHours: ["Mo-Sa 08:00-19:00"]
 * };
 * <script src="/assets/digiy-geo-profile-v1.js"><\/script>
 */
(function () {
  "use strict";

  var p = window.DIGIY_GEO_PROFILE;
  if (!p || !p.name || !p.url) return;

  function clean(v) {
    return typeof v === "string" ? v.trim() : v;
  }

  function list(v) {
    return Array.isArray(v) ? v.filter(Boolean).map(clean) : [];
  }

  function setMeta(name, content, property) {
    if (!content) return;
    var selector = property
      ? 'meta[property="' + property + '"]'
      : 'meta[name="' + name + '"]';
    var el = document.head.querySelector(selector);
    if (!el) {
      el = document.createElement("meta");
      if (property) el.setAttribute("property", property);
      else el.setAttribute("name", name);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  }

  function setCanonical(url) {
    if (!url) return;
    var el = document.head.querySelector('link[rel="canonical"]');
    if (!el) {
      el = document.createElement("link");
      el.setAttribute("rel", "canonical");
      document.head.appendChild(el);
    }
    el.setAttribute("href", url);
  }

  var desc = clean(p.description || "");
  var url = clean(p.url);
  var image = clean(p.image || "");

  if (p.title) document.title = clean(p.title);
  setCanonical(url);
  setMeta("description", desc);
  setMeta(null, clean(p.name), "og:title");
  setMeta(null, desc, "og:description");
  setMeta(null, url, "og:url");
  setMeta(null, "website", "og:type");
  if (image) setMeta(null, image, "og:image");

  var type = clean(p.type || "LocalBusiness");
  var data = {
    "@context": "https://schema.org",
    "@type": type,
    "name": clean(p.name),
    "description": desc || undefined,
    "url": url,
    "telephone": clean(p.telephone || "") || undefined,
    "image": image || undefined,
    "priceRange": clean(p.priceRange || "") || undefined,
    "address": (p.addressLocality || p.addressRegion || p.addressCountry) ? {
      "@type": "PostalAddress",
      "addressLocality": clean(p.addressLocality || "") || undefined,
      "addressRegion": clean(p.addressRegion || "") || undefined,
      "addressCountry": clean(p.addressCountry || "") || undefined
    } : undefined,
    "areaServed": list(p.areaServed).map(function (x) {
      return {"@type": "Place", "name": x};
    }),
    "serviceType": list(p.serviceType),
    "openingHours": list(p.openingHours),
    "sameAs": list(p.sameAs)
  };

  if (p.whatsapp) {
    data.contactPoint = [{
      "@type": "ContactPoint",
      "contactType": "customer service",
      "url": clean(p.whatsapp)
    }];
  }

  Object.keys(data).forEach(function (k) {
    if (data[k] === undefined || (Array.isArray(data[k]) && data[k].length === 0)) {
      delete data[k];
    }
  });
  if (data.address) {
    Object.keys(data.address).forEach(function (k) {
      if (!data.address[k]) delete data.address[k];
    });
  }

  var old = document.head.querySelector('script[data-digiy-geo="v1"]');
  if (old) old.remove();

  var node = document.createElement("script");
  node.type = "application/ld+json";
  node.setAttribute("data-digiy-geo", "v1");
  node.textContent = JSON.stringify(data);
  document.head.appendChild(node);
})();