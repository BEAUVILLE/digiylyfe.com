"""Run from repository root with Python Playwright and Chrome/Chromium installed."""
import shutil
import threading
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlsplit

from playwright.sync_api import sync_playwright

LANGS = 'fr en es pt it de nl ar wo zh'.split()
SN = [21000, 28000, 35000, 45000, 55000, 65000, 75000, 90000, 105000]
EU = [75, 75, 95, 125, 150, 180, 210, 250, 290]
US = [790, 790, 990, 1290, 1590]
TIERS = ['1', '2–3', '4–10', '11–15', '16–20', '21–25', '26–30', '31–35', '36–40']
WA_LABELS = set()
DOCTRINES = {}
NOTES = {}


def check(context, origin, lang, country, billing, site):
    page = context.new_page()
    page.set_default_timeout(5000)
    failures, posts = [], []
    held = []
    mode = 'price'
    page.on('pageerror', lambda exc: failures.append(str(exc)))

    def intercept(route):
        req = route.request
        url = urlsplit(req.url)
        if req.method == 'GET' and req.url.startswith(origin + '/'):
            return route.continue_()
        if req.method != 'POST' or url.hostname != 'wesqmwjjtsefyjnluosj.supabase.co' or url.path != '/functions/v1/digiy-loc-dossier':
            failures.append('unexpected request: ' + req.method + ' ' + req.url)
            return route.abort()
        payload = req.post_data_json
        posts.append(payload)
        if mode == 'network':
            return route.abort()
        if mode in ('price', 'server'):
            msg = 'price_mismatch' if mode == 'price' else 'INTERNAL_FIXTURE'
            return route.fulfill(status=409, json={'error': msg, 'expected_amount': 123})
        held.append((route, {
            'ok': True, 'id': 'TEST-LOC', 'tier': payload['tier_label'], 'billing': billing,
            'amount': payload['amount'], 'initial_service_amount': 54321,
            'first_join_total': 65432, 'currency': 'FCFA' if country == 'sn' else 'EUR'
        }))

    page.route('**/*', intercept)
    page.goto(f'{origin}/tarifs-loc-v2.html?lang={lang}&country={country}')
    node = page.locator
    def switch(language):
        node(f'.lang[data-l="{language}"]').click()
        assert node('html').get_attribute('dir') == ('rtl' if language == 'ar' else 'ltr')
    def message(selector):
        href = node(selector).get_attribute('href')
        url = urlsplit(href)
        assert url.hostname == 'wa.me'
        return parse_qs(url.query)['text'][0]
    other = 'en' if lang == 'ar' else 'ar'
    assert node('html').get_attribute('lang') == lang
    assert node('#country').input_value() == country
    assert node('.painLang:visible,.previewLang:visible,.toolkitLang:visible').count() == 4
    node('#doctrine-pro-loc summary').click()
    assert node('#doctrine-pro-loc').get_attribute('lang') == lang
    assert node('#doctrine-pro-loc details h3:visible').count() == 6
    paragraphs = node('#doctrine-pro-loc').evaluate("""el=>{
      const w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT), texts=[];
      while(w.nextNode())if(w.currentNode.nodeValue.trim())texts.push(w.currentNode.nodeValue.trim());
      return texts;
    }""")
    assert len(paragraphs) == 40
    DOCTRINES[lang] = paragraphs
    NOTES[lang] = node('#note').inner_text()
    assert node('#tiersBody tr').count() == 10
    assert node('#tiersBody tr').first.locator('td').nth(1).inner_text().startswith('21 000 FCFA')
    assert node('#tiersBody tr').first.locator('td').nth(5).inner_text().startswith('$790')
    if country == 'us':
        assert node('#billing').input_value() == 'annual'
        assert node('#billing option[value=monthly]').is_disabled()
        assert node('#siteOptionField').is_hidden()
    else:
        node('#billing').select_option(billing)
        assert node('#siteOption option').count() == 3
        node('#siteOption').select_option(site)
    opts = node('#chosenPrice option').evaluate_all('els=>els.slice(1).map(el=>el.value)')
    amounts = US if country == 'us' else (SN if country == 'sn' else EU)
    if country != 'us' and billing == 'annual':
        amounts = [round(n * 12 * .85) for n in amounts]
    assert opts == [f'{tier}|{n}|{country}|{billing}' for tier,n in zip(TIERS,amounts)]
    for field, val in {'business':'TEST LOC','manager':'TEST','email':'test@example.invalid',
                       'phone':'00000000','zone':'TEST','units':'2','free':'TEST note'}.items():
        node('#'+field).fill(val)
    node('#type').select_option('Chambre')
    node('#email').fill('')
    node('#continue').click()
    assert node('#email').evaluate('el=>el.validity.customError') and not posts
    node('#email').fill('test@example.invalid')
    limit = 20 if country == 'us' else 40
    node('#units').fill(str(limit+1))
    node('#continue').click()
    assert node('#quote').is_visible() and not posts
    quote = message('#quoteWa')
    assert 'TEST LOC' in quote and str(limit) in node('#quoteTitle').inner_text()
    switch(other)
    assert message('#quoteWa') != quote
    switch(lang)
    node('#units').fill('2')
    assert node('#quote').is_hidden()
    node('#chosenPrice').select_option(opts[0])
    node('#continue').click()
    assert node('#locSecureStatus.error').is_visible() and not posts
    node('#chosenPrice').select_option(opts[1])
    switch(other)
    switch(lang)
    assert node('#chosenPrice').input_value() == opts[1]
    if country != 'us':
        for error_mode in ('price','server','network'):
            mode = error_mode
            node('#continue').click()
            node('#locSecureStatus.error').wait_for()
            err = node('#locSecureStatus').inner_text()
            assert err and 'INTERNAL_FIXTURE' not in err
            if mode == 'price':
                assert '123' in err
            switch(other)
            assert node('#locSecureStatus').inner_text() != err
            switch(lang)
    mode = 'success'
    node('#continue').click()
    if country != 'us':
        node('#locSecureStatus.summary').wait_for()
        sending = node('#locSecureStatus').inner_text()
        switch(other)
        assert node('#locSecureStatus').inner_text() != sending
        assert len(held) == 1
        held[0][0].fulfill(json=held[0][1])
        node('#locSecureStatus a').wait_for()
        switch(lang)
    node('#locSecureStatus a').wait_for()
    wa = message('#locSecureStatus a')
    assert 'TEST LOC' in wa and 'TEST note' in wa and node('#paiement').is_hidden()
    assert node('#continue').is_disabled()
    WA_LABELS.add(node('#locSecureStatus a').inner_text())
    before = node('#locSecureStatus').inner_text()
    if country == 'us':
        assert not posts and '$790' in wa
    else:
        expected = dict(country='SN' if country=='sn' else 'FR', tier_label='2–3', billing=billing,
                        amount=amounts[1],units=2,business='TEST LOC',manager='TEST',phone='00000000',
                        email='test@example.invalid',zone='TEST',lodging_type='Chambre',site_option=site,
                        note='TEST note',lang=lang)
        assert posts == [expected]*4
        assert '65432' in before and '54321' in before and 'TEST-LOC' in wa
    switch(other)
    assert node('#locSecureStatus').inner_text() != before and message('#locSecureStatus a') != wa
    switch(lang)
    assert node('#locSecureStatus').inner_text() == before and not failures, failures
    page.close()


if __name__ == '__main__':
    server = ThreadingHTTPServer(('127.0.0.1',0),SimpleHTTPRequestHandler)
    threading.Thread(target=server.serve_forever,daemon=True).start()
    origin = 'http://127.0.0.1:'+str(server.server_port)
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(executable_path=shutil.which('google-chrome') or shutil.which('chromium'))
        context = browser.new_context(service_workers='block', reduced_motion='reduce')
        for i,lang in enumerate(LANGS):
            for country in ('sn','eu','us'):
                for j,billing in enumerate(['annual'] if country=='us' else ['monthly','annual']):
                    print(lang,country,billing,flush=True)
                    check(context,origin,lang,country,billing,['none','premium','extra'][(i+j)%3])
        for index in range(40):
            assert len({rows[index] for rows in DOCTRINES.values()}) == 10
        assert len(set(NOTES.values())) == len(WA_LABELS) == 10
        browser.close()
    server.shutdown()
    print('PASS: 30 language/region combinations; 50 submission scenarios.')
