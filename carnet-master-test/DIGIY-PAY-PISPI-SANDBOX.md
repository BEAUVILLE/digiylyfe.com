# DIGIY PAY · PI-SPI SANDBOX

Date de validation du POC : **16 septembre 2026**

## Preuve de concept validée

Parcours testé avec succès dans le sandbox PI-SPI :

**Client virtuel BANQUE SÉNÉGAL (SNB999) → PI-SPI → compte business DIGIYLYFE chez EME SÉNÉGAL 999 (SNC999)**

Montant test : **5 000 FCFA**

- Solde client virtuel : `1 000 000 000 → 999 995 000`
- Solde business DIGIYLYFE : `1 000 000 000 → 1 000 005 000`
- QR : statique
- Pays : `SN`
- Reference Label / TxId test : `DIGIY_TEST_001`
- Statut métier : preuve de paiement de bout en bout validée

Aucun secret, token OAuth, clé API ou secret webhook ne doit être commité dans ce dépôt.

## Doctrine d'architecture

- **PRO CARNET** porte la relation métier : client, dette, montant dû, historique, solde.
- **DIGIY PAY** orchestre les rails de paiement.
- Les rails restent interchangeables : Wave direct, PI-SPI, puis éventuellement d'autres PSP.
- Le professionnel ne doit jamais voir OAuth, client secret, API key, SHID brut ou payload EMV.
- Le site public reste gelé pendant les travaux sandbox.
- Le paiement réel Wave reste séparé des tests PI-SPI.

## Webhook sandbox DIGIY PAY

Une entrée sandbox isolée est réservée aux notifications PI-SPI :

`https://wesqmwjjtsefyjnluosj.supabase.co/functions/v1/digiy-pispi-webhook-sandbox`

Sécurité prévue :

1. HTTPS
2. `X-Signature` HMAC-SHA256 PI-SPI
3. Secret webhook stocké dans Supabase Vault sous le nom `pispi_sandbox_webhook_secret`
4. Ingestion idempotente dans `digiy_pispi_sandbox_events`
5. Aucun accès public direct à la table (RLS activée, aucune policy publique)

Le receiver renvoie :

- `204` si la notification est authentifiée et enregistrée
- `401` si la signature est absente ou invalide
- `503` tant que le secret webhook n'est pas configuré

## Rapprochement avec PRO CARNET

Pour un paiement QR PI-SPI reçu par un business, le `Reference Label` du QR devient le `txId` côté paiement reçu. Cette propriété doit servir de pont vers PRO CARNET.

Cible :

`Dette PRO CARNET → référence de paiement DIGIY → paiement PI-SPI irrévocable → webhook → paiement de créance enregistré → reste dû recalculé automatiquement`

Le raccord automatique à `digiy_carnet_receivables` ne doit être activé qu'après capture et validation d'un vrai événement webhook sandbox, afin de figer le format réel des événements du simulateur avant toute écriture métier.

## Prochaine étape

1. Créer un webhook PI-SPI sandbox pointant vers l'URL ci-dessus.
2. Stocker le secret retourné par PI-SPI dans Supabase Vault, sans le partager dans le chat ni le dépôt.
3. Refaire un paiement sandbox de 5 000 FCFA.
4. Vérifier la capture de l'événement dans `digiy_pispi_sandbox_events`.
5. Seulement ensuite raccorder l'événement validé à PRO CARNET.
