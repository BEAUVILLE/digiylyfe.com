from pathlib import Path

p = Path('tarifs-loc.html')
s = p.read_text(encoding='utf-8')

if 'class="box commissionPain"' in s:
    print('LOC commission block already present')
    raise SystemExit(0)

css_anchor = '@media(max-width:700px){.formgrid,.paygrid,.steps{grid-template-columns:1fr}.hero{padding:22px}.offer{text-align:center}}'
css = '''.commissionPain{border-color:#f6c45366;background:linear-gradient(145deg,#f6c45310,#ef44440b)}.commissionPain .painEy{display:inline-flex;padding:6px 9px;border-radius:999px;border:1px solid #ef444466;background:#ef444412;color:#ffd6d6;font-size:10px;font-weight:1000;letter-spacing:.06em}.commissionPain h2{margin-top:10px}.commissionPain .painStrong{display:block;margin-top:12px;padding:12px;border-radius:15px;background:#22c55e12;border:1px solid #22c55e55;color:#dffff0;font-weight:1000}.painLang{display:none}html[lang^="fr"] .painLang[data-pain-lang="fr"],html[lang^="en"] .painLang[data-pain-lang="en"],html[lang^="es"] .painLang[data-pain-lang="es"],html[lang^="pt"] .painLang[data-pain-lang="pt"],html[lang^="it"] .painLang[data-pain-lang="it"],html[lang^="de"] .painLang[data-pain-lang="de"],html[lang^="nl"] .painLang[data-pain-lang="nl"],html[lang^="ar"] .painLang[data-pain-lang="ar"]{display:block}\n'''

html_anchor = '<section class="box">\n<h2 id="tiersTitle">Paliers DIGIY LOC</h2>'
html = '''<section class="box commissionPain" aria-label="Valeur du forfait annuel DIGIY LOC">
<div class="painLang" data-pain-lang="fr"><span class="painEy">LE COÛT DES COMMISSIONS</span><h2>Plus vous réservez, plus la commission vous coûte.</h2><p>Avec une plateforme à commission, chaque réservation peut encore prélever une part de votre chiffre d’affaires. Avec DIGIY LOC, votre coût est fixé à l’année : réservation directe, paiement direct, relation client conservée et 0 % commission DIGIYLYFE.</p><span class="painStrong">Votre activité progresse. Votre coût DIGIY LOC, lui, reste fixé pour la période annuelle.</span></div>
<div class="painLang" data-pain-lang="en"><span class="painEy">THE COST OF COMMISSIONS</span><h2>The more you book, the more commission can cost you.</h2><p>On a commission platform, every booking can take another share of your revenue. With DIGIY LOC, your cost is fixed for the year: direct booking, direct payment, your customer relationship and 0% DIGIYLYFE commission.</p><span class="painStrong">Your business grows. Your DIGIY LOC cost stays fixed for the annual period.</span></div>
<div class="painLang" data-pain-lang="es"><span class="painEy">EL COSTE DE LAS COMISIONES</span><h2>Cuantas más reservas, más pueden costarle las comisiones.</h2><p>En una plataforma con comisión, cada reserva puede llevarse otra parte de sus ingresos. Con DIGIY LOC, su coste queda fijado por el año: reserva directa, pago directo, relación con el cliente conservada y 0 % de comisión DIGIYLYFE.</p><span class="painStrong">Su actividad crece. Su coste DIGIY LOC permanece fijado durante el periodo anual.</span></div>
<div class="painLang" data-pain-lang="pt"><span class="painEy">O CUSTO DAS COMISSÕES</span><h2>Quanto mais reservas, mais as comissões podem custar.</h2><p>Numa plataforma com comissão, cada reserva pode retirar outra parte da sua receita. Com DIGIY LOC, o seu custo fica fixado para o ano: reserva direta, pagamento direto, relação com o cliente mantida por si e 0 % de comissão DIGIYLYFE.</p><span class="painStrong">A sua atividade cresce. O custo DIGIY LOC mantém-se fixo durante o período anual.</span></div>
<div class="painLang" data-pain-lang="it"><span class="painEy">IL COSTO DELLE COMMISSIONI</span><h2>Più prenotazioni ricevi, più le commissioni possono costarti.</h2><p>Su una piattaforma a commissione, ogni prenotazione può trattenere un’altra parte dei tuoi ricavi. Con DIGIY LOC, il costo è fissato per l’anno: prenotazione diretta, pagamento diretto, relazione cliente mantenuta da te e 0 % commissioni DIGIYLYFE.</p><span class="painStrong">La tua attività cresce. Il costo DIGIY LOC resta fissato per il periodo annuale.</span></div>
<div class="painLang" data-pain-lang="de"><span class="painEy">DIE KOSTEN VON PROVISIONEN</span><h2>Je mehr Buchungen, desto mehr können Provisionen kosten.</h2><p>Auf einer provisionsbasierten Plattform kann jede Buchung erneut einen Teil Ihres Umsatzes kosten. Bei DIGIY LOC steht Ihr Jahrespreis fest: Direktbuchung, Direktzahlung, Ihre Kundenbeziehung und 0 % DIGIYLYFE-Provision.</p><span class="painStrong">Ihr Geschäft wächst. Ihre DIGIY-LOC-Kosten bleiben für den Jahreszeitraum fest.</span></div>
<div class="painLang" data-pain-lang="nl"><span class="painEy">DE KOSTEN VAN COMMISSIES</span><h2>Hoe meer boekingen, hoe meer commissies u kunnen kosten.</h2><p>Op een platform met commissie kan elke boeking opnieuw een deel van uw omzet kosten. Met DIGIY LOC ligt uw kost voor het jaar vast: directe boeking, directe betaling, uw klantrelatie en 0% DIGIYLYFE-commissie.</p><span class="painStrong">Uw activiteit groeit. Uw DIGIY LOC-kost blijft vast voor de jaarlijkse periode.</span></div>
<div class="painLang" data-pain-lang="ar"><span class="painEy">تكلفة العمولات</span><h2>كلما زادت الحجوزات، زادت تكلفة العمولات.</h2><p>في المنصات التي تعتمد على العمولة، قد يقتطع كل حجز جزءًا جديدًا من إيراداتك. مع DIGIY LOC، تكون تكلفتك محددة للسنة: حجز مباشر، دفع مباشر، علاقة العميل تبقى لديك وعمولة DIGIYLYFE بنسبة 0٪.</p><span class="painStrong">ينمو نشاطك، بينما تبقى تكلفة DIGIY LOC ثابتة خلال الفترة السنوية.</span></div>
</section>\n\n'''

assert s.count(css_anchor) == 1, 'CSS anchor not unique'
assert s.count(html_anchor) == 1, 'HTML anchor not unique'

s = s.replace(css_anchor, css + css_anchor)
s = s.replace(html_anchor, html + html_anchor)

assert s.count('class="box commissionPain"') == 1
assert 'Plus vous réservez, plus la commission vous coûte.' in s
assert '0 % commission DIGIYLYFE' in s
p.write_text(s, encoding='utf-8')
print('tarifs-loc.html patched successfully')
