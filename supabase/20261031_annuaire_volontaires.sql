-- DIGIYLYFE · Annuaire volontaire gratuit
-- Projet de migration, à déployer AVANT la page HTML lors du GO de fusion.
-- Isolé des fiches payantes / membership gate. Aucune modification aux tables existantes.

create table if not exists public.digiy_annuaire_volontaires (
  id uuid primary key default gen_random_uuid(),
  display_name text not null check (char_length(btrim(display_name)) between 2 and 100),
  activity_label text not null check (char_length(btrim(activity_label)) between 2 and 100),
  department text not null check (department in (
    'commerce','batiment','artisanat','alimentation','beaute',
    'mobilite','hebergement','tourisme','services','agriculture','autres'
  )),
  country_code text not null check (country_code in ('sn','fr','ma','us','other')),
  city text not null check (char_length(btrim(city)) between 2 and 100),
  whatsapp_public text not null check (whatsapp_public ~ '^[0-9]{8,15}$'),
  consent_public boolean not null check (consent_public = true),
  management_token_hash text not null check (management_token_hash ~ '^[0-9a-f]{64}$'),
  is_public boolean not null default true,
  is_active boolean not null default true,
  admin_blocked boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists digiy_annuaire_volontaires_no_duplicate
  on public.digiy_annuaire_volontaires
  (country_code, whatsapp_public, lower(btrim(display_name)))
  where is_active = true;
create index if not exists digiy_annuaire_volontaires_visible
  on public.digiy_annuaire_volontaires (is_active, is_public, department, country_code);

alter table public.digiy_annuaire_volontaires enable row level security;
revoke all on table public.digiy_annuaire_volontaires from public, anon, authenticated;
-- Les secrets de gestion, blocages et consentements restent invisibles à l'API publique.
grant select (
  id, display_name, activity_label, department, country_code,
  city, whatsapp_public, is_public, is_active, created_at
) on public.digiy_annuaire_volontaires to anon, authenticated;

drop policy if exists "annuaire_volontaires_public_read" on public.digiy_annuaire_volontaires;
create policy "annuaire_volontaires_public_read"
on public.digiy_annuaire_volontaires for select to anon, authenticated
using (is_active = true and is_public = true and admin_blocked = false);

-- Limitation simple, sans tiers ni abonnement : empreinte d'IP, fenêtre glissante 1h.
-- Aucun numéro IP brut n'est conservé. Ce frein ne remplace pas une protection anti-bot renforcée.
create table if not exists public.digiy_annuaire_intake_rate (
  ip_hash text primary key,
  window_start timestamptz not null,
  attempts integer not null
);
alter table public.digiy_annuaire_intake_rate enable row level security;
revoke all on table public.digiy_annuaire_intake_rate from public, anon, authenticated;

create or replace function public.digiy_annuaire_inscrire(
  p_name text,
  p_activity text,
  p_department text,
  p_country text,
  p_city text,
  p_whatsapp text,
  p_consent boolean,
  p_piege text default ''
) returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_name text := btrim(coalesce(p_name, ''));
  v_activity text := btrim(coalesce(p_activity, ''));
  v_city text := btrim(coalesce(p_city, ''));
  v_phone text := regexp_replace(coalesce(p_whatsapp, ''), '[^0-9]', '', 'g');
  v_department text := btrim(coalesce(p_department, ''));
  v_country text := btrim(coalesce(p_country, ''));
  v_headers jsonb := '{}'::jsonb;
  v_ip text;
  v_ip_hash text;
  v_count integer;
  v_token text;
  v_id uuid;
begin
  if coalesce(p_piege, '') <> '' then raise exception 'INSCRIPTION_REFUSEE'; end if;
  if p_consent is distinct from true then raise exception 'CONSENTEMENT_REQUIS'; end if;
  if char_length(v_name) not between 2 and 100
     or char_length(v_activity) not between 2 and 100
     or char_length(v_city) not between 2 and 100
     or v_name ~ '[[:cntrl:]]' or v_activity ~ '[[:cntrl:]]' or v_city ~ '[[:cntrl:]]'
  then raise exception 'CHAMPS_INVALIDES'; end if;
  if char_length(v_phone) not between 8 and 15 then raise exception 'WHATSAPP_INVALIDE'; end if;
  if v_department not in (
    'commerce','batiment','artisanat','alimentation','beaute',
    'mobilite','hebergement','tourisme','services','agriculture','autres'
  ) then raise exception 'DEPARTEMENT_INVALIDE'; end if;
  if v_country not in ('sn','fr','ma','us','other') then raise exception 'PAYS_INVALIDE'; end if;

  -- Protection contre les doublons volontaires et les fiches PRO déjà existantes.
  if exists (
    select 1 from public.digiy_annuaire_public p
    where lower(btrim(p.display_name)) = lower(v_name)
      and regexp_replace(coalesce(p.whatsapp_public, ''), '[^0-9]', '', 'g') = v_phone
      and p.is_active = true
  ) then raise exception 'DEJA_INSCRIT'; end if;

  begin
    v_headers := coalesce(nullif(current_setting('request.headers', true), '')::jsonb, '{}'::jsonb);
  exception when others then v_headers := '{}'::jsonb;
  end;
  v_ip := btrim(split_part(coalesce(
    v_headers->>'cf-connecting-ip',
    v_headers->>'x-forwarded-for',
    v_headers->>'x-real-ip', ''
  ), ',', 1));

  if v_ip <> '' then
    v_ip_hash := encode(extensions.digest(v_ip || ':digiy-annuaire-v1', 'sha256'), 'hex');
    perform pg_advisory_xact_lock(hashtext('digiy-annuaire:' || v_ip_hash));
    insert into public.digiy_annuaire_intake_rate (ip_hash, window_start, attempts)
      values (v_ip_hash, now(), 1)
    on conflict (ip_hash) do update
      set attempts = case
            when public.digiy_annuaire_intake_rate.window_start < now() - interval '1 hour'
            then 1 else public.digiy_annuaire_intake_rate.attempts + 1 end,
          window_start = case
            when public.digiy_annuaire_intake_rate.window_start < now() - interval '1 hour'
            then now() else public.digiy_annuaire_intake_rate.window_start end
    returning attempts into v_count;
    if v_count > 12 then raise exception 'TROP_DE_DEMANDES'; end if;
  end if;

  v_token := encode(extensions.gen_random_bytes(24), 'hex');
  insert into public.digiy_annuaire_volontaires
    (display_name,activity_label,department,country_code,city,whatsapp_public,consent_public,management_token_hash)
  values
    (v_name,v_activity,v_department,v_country,v_city,v_phone,true,
     encode(extensions.digest(v_token, 'sha256'), 'hex'))
  returning id into v_id;
  return jsonb_build_object('id',v_id,'token',v_token);
exception
  when unique_violation then raise exception 'DEJA_INSCRIT';
end;
$$;

-- Un lien secret permet à l'auteur de corriger/retirer sans compte ni contrôle manuel.
-- L'action 'retirer' désactive la visibilité; pas de suppression de tiers.
create or replace function public.digiy_annuaire_gerer(
  p_id uuid,
  p_token text,
  p_action text,
  p_name text default null,
  p_activity text default null,
  p_department text default null,
  p_country text default null,
  p_city text default null,
  p_whatsapp text default null
) returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_hash text;
  v_blocked boolean;
  v_name text;
  v_activity text;
  v_city text;
  v_phone text;
begin
  if p_token is null or p_token !~ '^[0-9a-f]{48}$' then return false; end if;
  select management_token_hash,admin_blocked into v_hash,v_blocked
    from public.digiy_annuaire_volontaires
    where id = p_id for update;
  if v_hash is null or v_blocked = true
     or v_hash <> encode(extensions.digest(p_token, 'sha256'), 'hex')
  then return false; end if;

  if p_action = 'retirer' then
    update public.digiy_annuaire_volontaires
    set is_active = false, is_public = false, updated_at = now()
    where id = p_id;
    return true;
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
  update public.digiy_annuaire_volontaires set
    display_name=v_name,activity_label=v_activity,department=p_department,
    country_code=p_country,city=v_city,whatsapp_public=v_phone,updated_at=now()
  where id = p_id and is_active = true;
  return found;
exception when unique_violation then raise exception 'DEJA_INSCRIT';
end;
$$;

revoke all on function public.digiy_annuaire_inscrire(text,text,text,text,text,text,boolean,text) from public, anon, authenticated;
revoke all on function public.digiy_annuaire_gerer(uuid,text,text,text,text,text,text,text,text) from public, anon, authenticated;
grant execute on function public.digiy_annuaire_inscrire(text,text,text,text,text,text,boolean,text) to anon, authenticated;
grant execute on function public.digiy_annuaire_gerer(uuid,text,text,text,text,text,text,text,text) to anon, authenticated;

comment on table public.digiy_annuaire_volontaires is
  'Annuaire gratuit volontaire; independant des abonnements et du referentiel PRO.';
comment on function public.digiy_annuaire_inscrire(text,text,text,text,text,text,boolean,text) is
  'API publique volontaire intentionnelle : champs controles, doublons, jeton de gestion, frein IP.';
