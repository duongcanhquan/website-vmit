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

alter table public.english_test_attempts enable row level security;
