-- The Open Ballot by Austin Zehnder Analytics — Supabase schema, hardened
-- Project: new project "aza-sports". Do NOT reuse the whats-cookin
-- meal-planner project (different data, different access rules).
--
-- SECURITY MODEL (read this before running):
-- 1. RLS is ON for every table. There is no public read of ballots or
--    profiles, and no delete/update of ballots at all (a submitted ballot
--    is final for that week; a correction is a new week, not an edit).
-- 2. Only the publishable (anon) key ever goes in the front end. The
--    service_role key is NEVER in the repo, the page, or a client call.
--    It is used only inside Supabase (Edge Functions / SQL) if at all.
-- 3. The browser is never trusted: a database trigger enforces, on every
--    ballot INSERT, that (a) the caller is the ballot owner, (b) the week
--    exists, matches the sport, and is currently open, (c) the ranking is
--    exactly 25 distinct, non-empty team names, and (d) no ballot already
--    exists for that user+week (unique index, enforced by Postgres).
-- 4. Results are computed server-side only (Edge Function with the
--    service key, or a SECURITY DEFINER function run by a scheduled job),
--    AP-style 25..1 points, and are only readable once status='published'.
-- 5. Auth hardening to set in Dashboard > Authentication (not in SQL):
--    - Confirm email before sign-in: ON (prevents ballot stuffing with
--      throwaway unconfirmed addresses; magic-link sign-in still works)
--    - Email provider + magic links enabled; anonymous sign-ins: OFF
--    - CAPTCHA / bot protection: ON where offered (hCaptcha on signup)
--    - Rate limits: leave Supabase defaults ON; do not raise them
--    - SMTP: use Supabase's sender or a verified Resend domain for the
--      Sunday ballot email; never put an SMTP password in the repo
-- 6. Sunday email: an Edge Function + Resend (free tier), scheduled:
--    Sun 9am PT  -> email notify_email=true users a ballot link
--    Sun 4pm PT  -> compute poll_results, status='closed'
--    Sun 5pm PT  -> status='published' (front end then shows the Top 25)
--    The Edge Function secret (Resend key) lives in Supabase Vault /
--    Edge Function secrets, never in the front end or GitHub.
-- 7. GitHub Pages front end: CSP meta tag in sports/index.html, no inline
--    scripts, all API strings escaped before insertion, images only from
--    a.espncdn.com, connections only to site.api.espn.com and *.supabase.co.
--    GitHub Pages cannot set server headers, so the meta CSP is the control.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  favorite_team text check (length(favorite_team) <= 100),
  notify_email boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.poll_weeks (
  id uuid primary key default gen_random_uuid(),
  sport text not null check (sport in ('football', 'basketball')),
  week_label text not null check (length(week_label) <= 80),
  ballot_opens timestamptz not null,
  ballot_closes timestamptz not null,
  results_published_at timestamptz,
  status text not null default 'draft'
    check (status in ('draft', 'open', 'closed', 'published')),
  check (ballot_closes > ballot_opens),
  unique (sport, week_label)
);

create table if not exists public.ballots (
  id uuid primary key default gen_random_uuid(),
  week_id uuid not null references public.poll_weeks(id) on delete cascade,
  sport text not null check (sport in ('football', 'basketball')),
  user_id uuid not null references auth.users(id) on delete cascade,
  ranking jsonb not null,
  submitted_at timestamptz not null default now(),
  unique (week_id, user_id)
);

create table if not exists public.poll_results (
  week_id uuid not null references public.poll_weeks(id) on delete cascade,
  rank int not null check (rank between 1 and 25),
  team_name text not null check (length(team_name) <= 100),
  points int not null check (points >= 0),
  first_place_votes int not null default 0 check (first_place_votes >= 0),
  ballots_count int not null default 0 check (ballots_count >= 0),
  blurb text check (length(blurb) <= 500),
  primary key (week_id, rank)
);

-- Server-side ballot validation trigger (the browser cannot bypass this:
-- it runs in Postgres for every INSERT, including direct REST calls).
create or replace function public.validate_ballot()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  w public.poll_weeks%rowtype;
  n int;
  distinct_n int;
begin
  if new.user_id <> auth.uid() then
    raise exception 'ballot owner must be the signed-in user';
  end if;
  select * into w from public.poll_weeks where id = new.week_id;
  if not found then raise exception 'unknown poll week'; end if;
  if w.sport <> new.sport then raise exception 'sport does not match week'; end if;
  if w.status <> 'open' or now() < w.ballot_opens or now() > w.ballot_closes then
    raise exception 'ballot window is not open';
  end if;
  if jsonb_typeof(new.ranking) <> 'array' then raise exception 'ranking must be an array'; end if;
  select jsonb_array_length(new.ranking) into n;
  if n <> 25 then raise exception 'ranking must contain exactly 25 teams'; end if;
  select count(distinct v) into distinct_n
    from jsonb_array_elements_text(new.ranking) as v;
  if distinct_n <> 25 then raise exception 'ranking teams must be distinct'; end if;
  if exists (select 1 from jsonb_array_elements_text(new.ranking) as v
             where v is null or length(v) = 0 or length(v) > 100) then
    raise exception 'invalid team name in ranking';
  end if;
  return new;
end;
$$;

drop trigger if exists ballots_validate on public.ballots;
create trigger ballots_validate
  before insert on public.ballots
  for each row execute function public.validate_ballot();

-- RLS: on for everything, least privilege per table.
alter table public.profiles enable row level security;
alter table public.poll_weeks enable row level security;
alter table public.ballots enable row level security;
alter table public.poll_results enable row level security;

-- Profiles: a user sees/edits only their own row. No public read.
drop policy if exists "own profile read" on public.profiles;
create policy "own profile read" on public.profiles
  for select using (auth.uid() = id);
drop policy if exists "own profile insert" on public.profiles;
create policy "own profile insert" on public.profiles
  for insert with check (auth.uid() = id);
drop policy if exists "own profile update" on public.profiles;
create policy "own profile update" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);
-- No delete policy: profiles are removed only by account deletion (cascade).

-- Poll weeks: public can read the schedule/status (needed to show the
-- ballot window), but cannot insert/update/delete weeks.
drop policy if exists "read poll weeks" on public.poll_weeks;
create policy "read poll weeks" on public.poll_weeks for select using (true);

-- Ballots: insert own only (trigger adds the window checks); NO select,
-- update, or delete policies, so no user can read anyone else's ballot
-- (including their own via REST after submit — results are the public
-- output, individual ballots are not). No anonymous inserts: anon role
-- has no policy that passes without auth.uid(), and the trigger rejects
-- a mismatched owner.
drop policy if exists "own ballot insert" on public.ballots;
create policy "own ballot insert" on public.ballots
  for insert with check (auth.uid() = user_id);

-- Results: readable only after publication. Never writable from the client.
drop policy if exists "read published results" on public.poll_results;
create policy "read published results" on public.poll_results
  for select using (
    exists (select 1 from public.poll_weeks w
            where w.id = week_id and w.status = 'published')
  );

-- Scoring (run server-side at close, never in the browser):
-- #1 = 25 pts ... #25 = 1 pt. Sum per team, rank desc by points;
-- tiebreak: more first-place votes, then more ballots, then A-Z.
-- Blurb: auto-draft from record + last-3 + streak + movement vs last
-- week, stored in poll_results.blurb so it can be polished before 5pm.
--
-- After running this file, verify in the SQL editor (anon key only):
--   * INSERT into ballots as an anonymous caller fails
--   * INSERT for a closed/draft week fails (trigger)
--   * SELECT from ballots returns no rows for a signed-in user
--   * SELECT from poll_results returns no rows until published
