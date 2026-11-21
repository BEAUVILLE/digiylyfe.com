-- DIGIYLYFE · Annuaire gratuit : acces proprietaire facultatif par Magic Link.
-- Ne modifie pas la publication publique, le jeton de gestion ni les offres payantes.
-- Ne contient aucune adresse email personnelle. Attribution en administration seulement.

alter table public.digiy_annuaire_volontaires
  add column if not exists owner_email_sha256 text;

-- Colonne privee : les lecteurs publics ne doivent jamais y acceder.
revoke select (owner_email_sha256) on public.digiy_annuaire_volontaires
  from anon, authenticated;
revoke update (owner_email_sha256) on public.digiy_annuaire_volontaires
  from anon, authenticated;

create or replace function public.digiy_annuaire_owner_read(p_id uuid)
returns jsonb
language plpgsql stable security definer set search_path = ''
as $$
declare
  v_email text;
begin
  if (select auth.uid()) is null then return null; end if;
  select lower(btrim(u.email)) into v_email
    from auth.users u
    where u.id = (select auth.uid()) and u.email_confirmed_at is not null;
  if v_email is null or v_email = '' then return null; end if;

  return (
    select pg_catalog.jsonb_build_object(
      'id', v.id,
      'display_name', v.display_name,
      'activity_label', v.activity_label,
      'department', v.department,
      'country_code', v.country_code,
      'city', v.city,
      'whatsapp_public', v.whatsapp_public
    )
    from public.digiy_annuaire_volontaires v
    where v.id = p_id and v.is_active = true and v.admin_blocked = false
      and v.owner_email_sha256 =
        pg_catalog.encode(extensions.digest(v_email, 'sha256'), 'hex')
  );
end;
$$;

create or replace function public.digiy_annuaire_owner_write(
  p_id uuid,
  p_action text,
  p_name text default null,
  p_activity text default null,
  p_department text default null,
  p_country text default null,
  p_city text default null,
  p_whatsapp text default null
) returns boolean
language plpgsql volatile security definer set search_path = ''
as $$
declare
  v_email text;
  v_name text;
  v_activity text;
  v_city text;
  v_phone text;
begin
  if (select auth.uid()) is null then return false; end if;
  select lower(btrim(u.email)) into v_email
    from auth.users u
    where u.id = (select auth.uid()) and u.email_confirmed_at is not null;
  if v_email is null or v_email = '' then return false; end if;

  perform 1 from public.digiy_annuaire_volontaires v
    where v.id = p_id and v.is_active = true and v.admin_blocked = false
      and v.owner_email_sha256 =
        pg_catalog.encode(extensions.digest(v_email, 'sha256'), 'hex')
    for update;
  if not found then return false; end if;

  if p_action = 'retirer' then
    update public.digiy_annuaire_volontaires
       set is_active = false, is_public = false, updated_at = now()
     where id = p_id;
    return found;
  end if;
  if p_action <> 'modifier' then return false; end if;

  v_name := btrim(coalesce(p_name, ''));
  v_activity := btrim(coalesce(p_activity, ''));
  v_city := btrim(coalesce(p_city, ''));
  v_phone := regexp_replace(coalesce(p_whatsapp, ''), '[^0-9]', '', 'g');
  if char_length(v_name) not between 2 and 100
     or char_length(v_activity) not between 2 and 100
     or char_length(v_city) not between 2 and 100
     or v_name ~ '[[:cntrl:]]' or v_activity ~ '[[:cntrl:]]' or v_city ~ '[[:cntrl:]]'
     or char_length(v_phone) not between 8 and 15
     or p_department not in (
       'commerce','batiment','artisanat','alimentation','beaute',
       'mobilite','hebergement','tourisme','services','agriculture','autres'
     )
     or p_country not in ('sn','fr','ma','us','other')
  then raise exception 'CHAMPS_INVALIDES'; end if;

  update public.digiy_annuaire_volontaires
     set display_name = v_name, activity_label = v_activity,
         department = p_department, country_code = p_country,
         city = v_city, whatsapp_public = v_phone, updated_at = now()
   where id = p_id;
  return found;
exception
  when unique_violation then raise exception 'DEJA_INSCRIT';
end;
$$;

revoke all on function public.digiy_annuaire_owner_read(uuid) from public, anon, authenticated;
revoke all on function public.digiy_annuaire_owner_write(uuid,text,text,text,text,text,text,text)
  from public, anon, authenticated;
grant execute on function public.digiy_annuaire_owner_read(uuid) to authenticated;
grant execute on function public.digiy_annuaire_owner_write(uuid,text,text,text,text,text,text,text)
  to authenticated;

comment on column public.digiy_annuaire_volontaires.owner_email_sha256 is
  'Email autorise SHA-256, facultatif, ajoute par DIGIY seulement, non public.';
