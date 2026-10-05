-- DIGIYLYFE — propriétaire de fiche professionnelle par magic-link
-- L'email d'invitation est stocké uniquement sous forme SHA-256.

alter table public.professionals
  add column if not exists owner_email_sha256 text;

grant select (
  name,category,region,city,address,description,phone,website,hours,services,
  slug,card_url,is_published,is_active,cover_url,badge_text,price_text,
  cta_primary_label,cta_primary_url,cta_secondary_label,cta_secondary_url,updated_at
) on public.professionals to anon, authenticated;

grant update (
  description,phone,website,hours,services,cover_url,price_text,
  cta_primary_label,cta_primary_url,cta_secondary_label,cta_secondary_url,
  updated_at,owner_user_id
) on public.professionals to authenticated;

drop policy if exists "professionals_owner_claim_invited" on public.professionals;
create policy "professionals_owner_claim_invited"
on public.professionals for update to authenticated
using (
  owner_user_id is null
  and owner_email_sha256 is not null
  and owner_email_sha256=encode(extensions.digest(lower(coalesce(auth.jwt()->>'email','')),'sha256'),'hex')
)
with check (
  owner_user_id=(select auth.uid())
  and owner_email_sha256=encode(extensions.digest(lower(coalesce(auth.jwt()->>'email','')),'sha256'),'hex')
);


create or replace function public.digiy_professional_owner_can_activate(p_slug text, p_email text)
returns boolean
language sql
stable
security definer
set search_path = public, extensions, pg_catalog
as $$
  select exists(
    select 1
    from public.professionals p
    where p.slug = p_slug
      and p.is_active = true
      and p.owner_email_sha256 is not null
      and p.owner_email_sha256 =
        encode(extensions.digest(lower(trim(coalesce(p_email,''))),'sha256'),'hex')
  );
$$;

revoke all on function public.digiy_professional_owner_can_activate(text,text) from public;
grant execute on function public.digiy_professional_owner_can_activate(text,text) to anon, authenticated;

create or replace function public.digiy_professional_owner_is_owner(p_slug text)
returns boolean
language sql
stable
security definer
set search_path = public, auth, pg_catalog
as $$
  select auth.uid() is not null
     and exists(
       select 1
       from public.professionals p
       where p.slug=p_slug
         and p.owner_user_id=auth.uid()
         and p.is_active=true
     );
$$;

revoke all on function public.digiy_professional_owner_is_owner(text) from public;
grant execute on function public.digiy_professional_owner_is_owner(text) to authenticated;
