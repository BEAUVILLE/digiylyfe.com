-- DIGIYLYFE / digiy-core — PROPOSITION DE CORRECTIF RLS
-- 19 novembre 2026
-- REVUE UNIQUEMENT : fichier dans docs/security, PAS dans supabase/migrations.
-- NE PAS EXÉCUTER EN PRODUCTION AVANT VALIDATION EXPLICITE ET TESTS ISOLÉS.
-- Aucune donnée personnelle ni valeur de fiche dans ce fichier.
--
-- Constat confirmé dans les catalogues PostgreSQL de digiy-core :
-- * public.professionals : politique SELECT pour anon USING(true)
-- * autre politique SELECT pour anon,authenticated USING(is_active=true)
-- * 5 lignes actives non publiées avec téléphone ; 2 publiées
-- * digiy_notable_public_profiles est une vue publique SECURITY DEFINER
--   qui ne vérifie pas is_published
--
-- Objectif : anon lit seulement les fiches actives ET publiées ;
-- propriétaire et invité autorisés conservent les droits nécessaires.
-- Cette proposition ne se déploie PAS lors de la fusion GitHub.

BEGIN;

-- Interrompre si l'état de la base ne correspond plus à l'audit.
DO $guard$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname='public'
      AND tablename='professionals'
      AND policyname='public read professionals'
      AND cmd='SELECT'
      AND permissive='PERMISSIVE'
      AND roles=ARRAY['anon']::name[]
      AND qual='true'
  ) OR NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname='public'
      AND tablename='professionals'
      AND policyname='professionals_public_read_active'
      AND cmd='SELECT'
      AND permissive='PERMISSIVE'
      AND roles=ARRAY['anon','authenticated']::name[]
      AND qual='(is_active = true)'
  ) OR NOT EXISTS (
    SELECT 1 FROM pg_views
    WHERE schemaname='public'
      AND viewname='digiy_notable_public_profiles'
  ) THEN
    RAISE EXCEPTION 'Préconditions RLS modifiées : arrêt, nouvel audit requis';
  END IF;
END;
$guard$;

-- 1) Supprimer l'autorisation de lecture anonyme de toutes les lignes.
DROP POLICY "public read professionals" ON public.professionals;

-- 2) Lecture publique uniquement si activité ET publication sont valides.
-- Autres politiques propriétaires SELECT et UPDATE inchangées.
ALTER POLICY professionals_public_read_active ON public.professionals
USING (is_active IS TRUE AND is_published IS TRUE);

-- 3) Préserver la lecture de la fiche pour le détenteur du Magic Link
-- avant son rattachement au compte. PostgreSQL vérifie aussi SELECT lors
-- d'un UPDATE : ne pas casser l'activation des propriétaires invités.
CREATE POLICY professionals_invited_owner_select
ON public.professionals
FOR SELECT TO authenticated
USING (
  is_active IS TRUE
  AND owner_user_id IS NULL
  AND owner_email_sha256 IS NOT NULL
  AND coalesce(auth.jwt()->>'email','') <> ''
  AND owner_email_sha256 = encode(
    extensions.digest(lower(coalesce(auth.jwt()->>'email','')),'sha256'),
    'hex'
  )
);

-- 4) Éviter que cette vue publique SECURITY DEFINER contourne la RLS.
-- Préserver colonnes, ordre, noms et types existants.
CREATE OR REPLACE VIEW public.digiy_notable_public_profiles AS
SELECT
  id,
  name AS display_name,
  category,
  region,
  city,
  address,
  description AS bio,
  phone AS whatsapp,
  slug,
  card_url AS photo_url,
  is_published,
  is_active,
  sort_order AS priority,
  rating,
  badge_text,
  price_text,
  cta_primary_label,
  cta_primary_url,
  cta_secondary_label,
  cta_secondary_url,
  created_at,
  (now() AT TIME ZONE 'utc') AS fetched_at
FROM public.professionals
WHERE is_active IS TRUE
  AND is_published IS TRUE
  AND NULLIF(btrim(slug),'') IS NOT NULL
  AND lower(btrim(category)) = ANY (ARRAY['notable','vip','premium']);

COMMIT;

-- AVANT TOUTE APPLICATION EN PRODUCTION :
-- A) Jeu fictif isolé : anon voit fiche publiée, pas brouillon.
-- B) Jeu fictif isolé : propriétaire voit/modifie son brouillon.
-- C) Jeu fictif isolé : invité Magic Link peut revendiquer sa fiche.
-- D) Compte tiers ne voit ni ne modifie un brouillon.
-- E) Vue notable : même restriction de publication, sans régression.
-- F) Vérifier affichage public / annuaire et chemin /gestion.html.
-- G) Après autorisation de déploiement : revérifier les politiques RLS,
--    vérifier 2 fiches publiées + 5 non publiées via compte anon fictif.
-- Aucun de ces tests de session n'est revendiqué comme exécuté ici.
