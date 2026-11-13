/* Keep a chosen language on public DIGIY links. External contacts are untouched. */
(function () {
  'use strict';
  var allowed = ['fr', 'wo', 'zh', 'en', 'es', 'pt', 'it', 'de', 'nl', 'ar'];
  function normalize(value) {
    value = String(value || '').toLowerCase().replace('zh-cn', 'zh');
    return allowed.includes(value) ? value : '';
  }
  var url = new URL(location.href), saved = '';
  try { saved = localStorage.getItem('digiy-lang') || localStorage.getItem('digiy_lang'); } catch (_) {}
  var current = normalize(url.searchParams.get('lang')) || normalize(saved) || normalize(document.documentElement.lang) || 'fr';
  if (!url.searchParams.has('lang')) {
    url.searchParams.set('lang', current);
    history.replaceState(history.state, '', url.pathname + url.search + url.hash);
  }
  function remember(lang) {
    current = normalize(lang) || current;
    try { localStorage.setItem('digiy-lang', current); localStorage.setItem('digiy_lang', current); } catch (_) {}
  }
  remember(current);
  function withLanguage(href) {
    try {
      var target = new URL(href, location.href);
      var internal = target.origin === location.origin || target.hostname === 'digiylyfe.com' || target.hostname.endsWith('.digiylyfe.com');
      if (!internal || !/^https?:$/.test(target.protocol) || (!target.pathname.endsWith('/') && !target.pathname.endsWith('.html'))) return href;
      if (/\/(auth|api)\//.test(target.pathname)) return href;
      target.searchParams.set('lang', current);
      return target.href;
    } catch (_) { return href; }
  }
  window.DIGIY_LANGUAGE_ROUTE = { withLanguage: withLanguage, remember: remember };
  function refresh() {
    remember(document.documentElement.lang);
    document.querySelectorAll('a[href]').forEach(function (link) {
      if (link.hasAttribute('download') || link.hasAttribute('hreflang') || link.hasAttribute('lang') || link.closest('.langbar, .langs, .languageStrip') || link.getAttribute('href').startsWith('#')) return;
      var next = withLanguage(link.href);
      if (next !== link.href) link.href = next;
    });
  }
  document.addEventListener('DOMContentLoaded', function () {
    refresh();
    new MutationObserver(refresh).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    new MutationObserver(refresh).observe(document.body, { childList: true, subtree: true });
  });
})();
