-- DIGIY DRIVER France — 2026-10-24
-- Contrat : MASTER-PAYS-FRANCE-V1 pricing.driver-fr-45
-- Proposition pour revue avant exécution sur digiy-core.
-- Ne modifie aucune politique existante (dont Sénégal et LOC).
-- Nécessite la PR source master-modeles #22 et la PR web #104.
--
-- DO NOT silently deploy: review against pg_policies and take a backup.

BEGIN;

CREATE POLICY adhesion_driver_france_insert
  ON public.digiy_adhesion_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    product_code = 'membership-card'
    AND plan_code = 'driver-fr-45'
    AND source = 'pre-validation-driver-france-v1'
    AND country_id = 'FR'
    AND currency_code = 'EUR'
    AND price_amount = 45
    AND price_eur = 45
    AND price_xof IS NULL
    AND status = 'a_valider'
    AND payment_status = 'a_confirmer'
    AND card_status = 'a_valider'
    AND subscription_status = 'a_regler'
    AND bat_status = 'a_preparer'
    AND billing = 'monthly'
    AND contract_version = 'current_v1'
    AND consent IS TRUE
    AND source_lang IN ('fr','en','es','pt','it','de','nl','ar')
    AND email IS NOT NULL
    AND char_length(btrim(email)) BETWEEN 5 AND 254
    AND payment_proof_path IS NULL
    AND payment_proof_mime IS NULL
    AND photo_path IS NOT NULL
    AND photo_mime IN ('image/jpeg','image/png','image/webp')
    AND territory_id LIKE 'FR-%'
    AND (base_zone_id IS NULL OR base_zone_id LIKE 'FR-%')
  );

COMMIT;

-- Contrôle lecture seule APRÈS application :
-- SELECT policyname, cmd, roles, with_check
-- FROM pg_policies
-- WHERE schemaname='public' AND tablename='digiy_adhesion_requests'
--   AND policyname='adhesion_driver_france_insert';
--
-- Test d'intégration: adhésion DRIVER France (45 €/mois) doit pouvoir enregistrer
-- un dossier en attente, sans pop-up WhatsApp ni service_request 'fiche' facturé.
-- Annuler un éventuel dossier de test en suivant la procédure OPS, sans affecter les autres.
