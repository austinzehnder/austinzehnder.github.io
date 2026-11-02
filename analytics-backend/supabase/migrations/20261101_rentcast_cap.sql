-- Run in Supabase SQL editor before deploying the function.
create table if not exists public.rentcast_usage (
  month text primary key,
  call_count integer not null default 0
);
create table if not exists public.rentcast_cache (
  address_key text primary key,
  address text not null,
  result jsonb not null,
  month text not null,
  created_at timestamptz not null default now()
);
-- Edge Function uses service_role, so no public RLS policies are opened here.
-- Do NOT enable public read/write on these tables.
