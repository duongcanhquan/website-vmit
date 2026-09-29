-- VMIT admin core schema. Idempotent: safe to run again on an existing project.
-- Run in Supabase → SQL Editor. Only adds tables, columns, constraints and policies; never drops data.

create extension if not exists pgcrypto;

-- ─── Roles ────────────────────────────────────────────────────────────────
create table if not exists public.app_roles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'editor',
  created_at timestamptz not null default now()
);
alter table public.app_roles add column if not exists created_at timestamptz not null default now();
create unique index if not exists app_roles_user_id_key on public.app_roles (user_id);

do $$ begin
  alter table public.app_roles add constraint app_roles_role_check check (role in ('admin', 'editor'));
exception when duplicate_object then null;
end $$;

create or replace function public.is_staff() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.app_roles where user_id = auth.uid() and role in ('admin', 'editor'))
$$;

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.app_roles where user_id = auth.uid() and role = 'admin')
$$;

grant execute on function public.is_staff() to anon, authenticated;
grant execute on function public.is_admin() to anon, authenticated;

-- ─── Settings ─────────────────────────────────────────────────────────────
create table if not exists public.site_settings (
  key text primary key,
  value jsonb,
  updated_at timestamptz not null default now()
);
alter table public.site_settings add column if not exists updated_at timestamptz not null default now();

-- ─── Content tables ───────────────────────────────────────────────────────
do $$
declare
  t text;
begin
  foreach t in array array[
    'media_assets', 'courses', 'partners', 'pillars', 'impact_counters', 'pathway_steps', 'pricing_plans',
    'documents', 'team_members', 'faqs', 'testimonials', 'posts', 'subjects'
  ] loop
    execute format('create table if not exists public.%I (id uuid primary key default gen_random_uuid())', t);
    execute format('alter table public.%I add column if not exists sort_order integer not null default 0', t);
    execute format('alter table public.%I add column if not exists is_published boolean not null default true', t);
    execute format('alter table public.%I add column if not exists created_at timestamptz not null default now()', t);
    execute format('alter table public.%I add column if not exists updated_at timestamptz not null default now()', t);
  end loop;
end $$;

alter table public.media_assets
  add column if not exists path text,
  add column if not exists url text,
  add column if not exists alt_vi text,
  add column if not exists alt_en text,
  add column if not exists caption_vi text,
  add column if not exists caption_en text,
  add column if not exists kind text default 'other',
  add column if not exists is_featured boolean not null default false;

alter table public.courses
  add column if not exists slug text,
  add column if not exists title text,
  add column if not exists title_vi text,
  add column if not exists title_en text,
  add column if not exists summary text,
  add column if not exists summary_vi text,
  add column if not exists summary_en text,
  add column if not exists description text,
  add column if not exists description_vi text,
  add column if not exists description_en text,
  add column if not exists cover_url text;

alter table public.partners
  add column if not exists name text,
  add column if not exists logo_url text,
  add column if not exists website_url text;

alter table public.pillars
  add column if not exists eyebrow_vi text,
  add column if not exists eyebrow_en text,
  add column if not exists title_vi text,
  add column if not exists title_en text,
  add column if not exists description_vi text,
  add column if not exists description_en text,
  add column if not exists is_featured boolean not null default false;

alter table public.impact_counters
  add column if not exists value_text text,
  add column if not exists label_vi text,
  add column if not exists label_en text;

alter table public.pathway_steps
  add column if not exists step_code text,
  add column if not exists title_vi text,
  add column if not exists title_en text,
  add column if not exists note_vi text,
  add column if not exists note_en text;

alter table public.pricing_plans
  add column if not exists slug text,
  add column if not exists name text,
  add column if not exists name_vi text,
  add column if not exists name_en text,
  add column if not exists price_amount numeric,
  add column if not exists currency text default 'VND',
  add column if not exists period_label text,
  add column if not exists period_label_vi text,
  add column if not exists period_label_en text,
  add column if not exists description text,
  add column if not exists description_vi text,
  add column if not exists description_en text,
  add column if not exists cta_label text,
  add column if not exists cta_label_vi text,
  add column if not exists cta_label_en text,
  add column if not exists is_featured boolean not null default false;

alter table public.documents
  add column if not exists title_vi text,
  add column if not exists title_en text,
  add column if not exists description_vi text,
  add column if not exists description_en text,
  add column if not exists file_url text,
  add column if not exists category text;

alter table public.team_members
  add column if not exists full_name text,
  add column if not exists full_name_vi text,
  add column if not exists full_name_en text,
  add column if not exists role_title text,
  add column if not exists role_title_vi text,
  add column if not exists role_title_en text,
  add column if not exists bio text,
  add column if not exists bio_vi text,
  add column if not exists bio_en text,
  add column if not exists avatar_url text,
  add column if not exists email text;

alter table public.faqs
  add column if not exists question text,
  add column if not exists question_vi text,
  add column if not exists question_en text,
  add column if not exists answer text,
  add column if not exists answer_vi text,
  add column if not exists answer_en text;

alter table public.testimonials
  add column if not exists author_name text,
  add column if not exists author_role text,
  add column if not exists author_role_vi text,
  add column if not exists author_role_en text,
  add column if not exists quote text,
  add column if not exists quote_vi text,
  add column if not exists quote_en text,
  add column if not exists avatar_url text,
  add column if not exists rating integer;

alter table public.posts
  add column if not exists slug text,
  add column if not exists title text,
  add column if not exists title_vi text,
  add column if not exists title_en text,
  add column if not exists excerpt text,
  add column if not exists excerpt_vi text,
  add column if not exists excerpt_en text,
  add column if not exists body text,
  add column if not exists body_vi text,
  add column if not exists body_en text,
  add column if not exists cover_url text,
  add column if not exists author_name text,
  add column if not exists published_at timestamptz;

do $$ begin
  create unique index if not exists posts_slug_key on public.posts (slug);
exception when unique_violation then
  raise notice 'posts.slug has duplicates; unique index skipped. Fix duplicate slugs and run again.';
end $$;

alter table public.subjects
  add column if not exists title_vi text,
  add column if not exists title_en text,
  add column if not exists count_label_vi text,
  add column if not exists count_label_en text,
  add column if not exists icon_url text,
  add column if not exists hover_icon_url text,
  add column if not exists icon_key text;

-- ─── Leads (registrations) ────────────────────────────────────────────────
create table if not exists public.admission_applications (id uuid primary key default gen_random_uuid());
alter table public.admission_applications
  add column if not exists full_name text,
  add column if not exists phone text,
  add column if not exists email text,
  add column if not exists program text,
  add column if not exists tracking_code text,
  add column if not exists details jsonb not null default '{}'::jsonb;

create table if not exists public.scholarship_leads (id uuid primary key default gen_random_uuid());
alter table public.scholarship_leads
  add column if not exists full_name text,
  add column if not exists phone text,
  add column if not exists email text,
  add column if not exists details jsonb not null default '{}'::jsonb;

create table if not exists public.contact_submissions (id uuid primary key default gen_random_uuid());
alter table public.contact_submissions
  add column if not exists full_name text,
  add column if not exists phone text,
  add column if not exists email text,
  add column if not exists subject text,
  add column if not exists message text;

do $$
declare
  t text;
  c record;
begin
  foreach t in array array['admission_applications', 'scholarship_leads', 'contact_submissions'] loop
    execute format('alter table public.%I add column if not exists status text', t);
    execute format('alter table public.%I add column if not exists admin_note text', t);
    execute format('alter table public.%I add column if not exists created_at timestamptz not null default now()', t);
    execute format('alter table public.%I add column if not exists updated_at timestamptz not null default now()', t);

    for c in
      select con.conname from pg_constraint con
      join pg_class rel on rel.oid = con.conrelid
      join pg_namespace ns on ns.oid = rel.relnamespace
      where ns.nspname = 'public' and rel.relname = t and con.contype = 'c'
        and pg_get_constraintdef(con.oid) ilike '%status%'
    loop
      execute format('alter table public.%I drop constraint %I', t, c.conname);
    end loop;

    execute format($f$update public.%I set status = 'new' where status is null or status in ('pending', 'submitted')$f$, t);
    execute format($f$update public.%I set status = 'read' where status not in ('new', 'read', 'contacted', 'enrolled', 'archived')$f$, t);
    execute format($f$alter table public.%I alter column status set default 'new'$f$, t);
    execute format('alter table public.%I alter column status set not null', t);
    execute format(
      $f$alter table public.%I add constraint %I check (status in ('new', 'read', 'contacted', 'enrolled', 'archived'))$f$,
      t, t || '_status_check'
    );
    execute format('create index if not exists %I on public.%I (status, created_at desc)', t || '_status_idx', t);
  end loop;
end $$;

create table if not exists public.english_test_attempts (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  listening_band numeric,
  reading_band numeric,
  writing_band numeric,
  speaking_band numeric,
  overall_band numeric,
  cefr text,
  writing_task1 text,
  writing_task2 text,
  speaking_notes text,
  email_status text default 'not_configured',
  summary text,
  detail jsonb,
  created_at timestamptz not null default now()
);

-- ─── Row level security ───────────────────────────────────────────────────
do $$
declare
  t text;
begin
  foreach t in array array[
    'media_assets', 'courses', 'partners', 'pillars', 'impact_counters', 'pathway_steps', 'pricing_plans',
    'documents', 'team_members', 'faqs', 'testimonials', 'posts', 'subjects'
  ] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "public read published" on public.%I', t);
    execute format('create policy "public read published" on public.%I for select using (is_published or public.is_staff())', t);
    execute format('drop policy if exists "staff write" on public.%I', t);
    execute format('create policy "staff write" on public.%I for all to authenticated using (public.is_staff()) with check (public.is_staff())', t);
  end loop;

  foreach t in array array['admission_applications', 'scholarship_leads', 'contact_submissions', 'english_test_attempts'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "public insert" on public.%I', t);
    execute format('create policy "public insert" on public.%I for insert to anon, authenticated with check (true)', t);
    execute format('drop policy if exists "staff read" on public.%I', t);
    execute format('create policy "staff read" on public.%I for select to authenticated using (public.is_staff())', t);
    execute format('drop policy if exists "staff update" on public.%I', t);
    execute format('create policy "staff update" on public.%I for update to authenticated using (public.is_staff()) with check (public.is_staff())', t);
    execute format('drop policy if exists "admin delete" on public.%I', t);
    execute format('create policy "admin delete" on public.%I for delete to authenticated using (public.is_admin())', t);
  end loop;
end $$;

alter table public.site_settings enable row level security;
drop policy if exists "public read" on public.site_settings;
create policy "public read" on public.site_settings for select using (true);
drop policy if exists "staff write" on public.site_settings;
create policy "staff write" on public.site_settings for all to authenticated
  using (public.is_staff()) with check (public.is_staff());

alter table public.app_roles enable row level security;
drop policy if exists "read own or admin" on public.app_roles;
create policy "read own or admin" on public.app_roles for select to authenticated
  using (user_id = auth.uid() or public.is_admin());
drop policy if exists "admin write" on public.app_roles;
create policy "admin write" on public.app_roles for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- First admin (edit the email, then run once):
-- insert into public.app_roles (user_id, role)
-- select id, 'admin' from auth.users where email = 'admin@vmit.local'
-- on conflict (user_id) do update set role = 'admin';
