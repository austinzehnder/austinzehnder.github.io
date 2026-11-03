-- FBS enforcement for The Open Ballot (aza-sports only).
-- Creates a public allowlist of 2026 FBS team names (138 schools + aliases
-- for ESPN/common name variants) and extends the ballot trigger so a
-- football ballot containing a non-FBS team is rejected server-side,
-- even if someone bypasses the web page and calls the API directly.
-- Basketball is not checked here yet (separate Division I list needed).

create table if not exists public.fbs_teams (
  team_name text primary key,
  team_key text not null unique
);

create or replace function public.norm_team_name(t text)
returns text
language sql
immutable
as $$
  select trim(regexp_replace(lower(regexp_replace(coalesce(t, ''), '[^a-z0-9 ]', '', 'g')), '\s+', ' ', 'g'));
$$;

insert into public.fbs_teams (team_name, team_key)
select v, public.norm_team_name(v) from (values
  ('Boston College Eagles'),
  ('California Golden Bears'),
  ('Clemson Tigers'),
  ('Duke Blue Devils'),
  ('Florida State Seminoles'),
  ('Georgia Tech Yellow Jackets'),
  ('Louisville Cardinals'),
  ('Miami Hurricanes'),
  ('NC State Wolfpack'),
  ('North Carolina Tar Heels'),
  ('Pittsburgh Panthers'),
  ('SMU Mustangs'),
  ('Stanford Cardinal'),
  ('Syracuse Orange'),
  ('Virginia Cavaliers'),
  ('Virginia Tech Hokies'),
  ('Wake Forest Demon Deacons'),
  ('Army Black Knights'),
  ('Charlotte 49ers'),
  ('East Carolina Pirates'),
  ('Florida Atlantic Owls'),
  ('Memphis Tigers'),
  ('Navy Midshipmen'),
  ('North Texas Mean Green'),
  ('Rice Owls'),
  ('Temple Owls'),
  ('Tulane Green Wave'),
  ('Tulsa Golden Hurricane'),
  ('UAB Blazers'),
  ('South Florida Bulls'),
  ('UTSA Roadrunners'),
  ('Arizona Wildcats'),
  ('Arizona State Sun Devils'),
  ('Baylor Bears'),
  ('BYU Cougars'),
  ('Cincinnati Bearcats'),
  ('Colorado Buffaloes'),
  ('Houston Cougars'),
  ('Iowa State Cyclones'),
  ('Kansas Jayhawks'),
  ('Kansas State Wildcats'),
  ('Oklahoma State Cowboys'),
  ('TCU Horned Frogs'),
  ('Texas Tech Red Raiders'),
  ('UCF Knights'),
  ('Utah Utes'),
  ('West Virginia Mountaineers'),
  ('Illinois Fighting Illini'),
  ('Indiana Hoosiers'),
  ('Iowa Hawkeyes'),
  ('Maryland Terrapins'),
  ('Michigan Wolverines'),
  ('Michigan State Spartans'),
  ('Minnesota Golden Gophers'),
  ('Nebraska Cornhuskers'),
  ('Northwestern Wildcats'),
  ('Ohio State Buckeyes'),
  ('Oregon Ducks'),
  ('Penn State Nittany Lions'),
  ('Purdue Boilermakers'),
  ('Rutgers Scarlet Knights'),
  ('UCLA Bruins'),
  ('USC Trojans'),
  ('Washington Huskies'),
  ('Wisconsin Badgers'),
  ('Delaware Blue Hens'),
  ('FIU Panthers'),
  ('Jacksonville State Gamecocks'),
  ('Kennesaw State Owls'),
  ('Liberty Flames'),
  ('Middle Tennessee Blue Raiders'),
  ('Missouri State Bears'),
  ('New Mexico State Aggies'),
  ('Sam Houston Bearkats'),
  ('Western Kentucky Hilltoppers'),
  ('Akron Zips'),
  ('Ball State Cardinals'),
  ('Bowling Green Falcons'),
  ('Buffalo Bulls'),
  ('Central Michigan Chippewas'),
  ('Eastern Michigan Eagles'),
  ('Kent State Golden Flashes'),
  ('Miami RedHawks'),
  ('Ohio Bobcats'),
  ('Sacramento State Hornets'),
  ('Toledo Rockets'),
  ('UMass Minutemen'),
  ('Western Michigan Broncos'),
  ('Air Force Falcons'),
  ('Hawaii Rainbow Warriors'),
  ('Nevada Wolf Pack'),
  ('New Mexico Lobos'),
  ('UNLV Rebels'),
  ('San Jose State Spartans'),
  ('Wyoming Cowboys'),
  ('Northern Illinois Huskies'),
  ('UTEP Miners'),
  ('North Dakota State Bison'),
  ('Boise State Broncos'),
  ('Colorado State Rams'),
  ('Fresno State Bulldogs'),
  ('Oregon State Beavers'),
  ('San Diego State Aztecs'),
  ('Texas State Bobcats'),
  ('Utah State Aggies'),
  ('Washington State Cougars'),
  ('Alabama Crimson Tide'),
  ('Arkansas Razorbacks'),
  ('Auburn Tigers'),
  ('Florida Gators'),
  ('Georgia Bulldogs'),
  ('Kentucky Wildcats'),
  ('LSU Tigers'),
  ('Mississippi State Bulldogs'),
  ('Missouri Tigers'),
  ('Oklahoma Sooners'),
  ('Ole Miss Rebels'),
  ('South Carolina Gamecocks'),
  ('Tennessee Volunteers'),
  ('Texas Longhorns'),
  ('Texas A&M Aggies'),
  ('Vanderbilt Commodores'),
  ('App State Mountaineers'),
  ('Arkansas State Red Wolves'),
  ('Coastal Carolina Chanticleers'),
  ('Georgia Southern Eagles'),
  ('Georgia State Panthers'),
  ('James Madison Dukes'),
  ('Louisiana Ragin Cajuns'),
  ('Louisiana Monroe Warhawks'),
  ('Louisiana Tech Bulldogs'),
  ('Marshall Thundering Herd'),
  ('Old Dominion Monarchs'),
  ('South Alabama Jaguars'),
  ('Southern Miss Golden Eagles'),
  ('Troy Trojans'),
  ('Notre Dame Fighting Irish'),
  ('UConn Huskies'),
  ('Appalachian State Mountaineers'),
  ('Delaware Fightin Blue Hens'),
  ('Florida International Panthers'),
  ('Central Florida Knights'),
  ('Southern California Trojans'),
  ('North Carolina State Wolfpack'),
  ('Alabama Birmingham Blazers'),
  ('Texas San Antonio Roadrunners')
) as v
on conflict (team_name) do nothing;

alter table public.fbs_teams enable row level security;
drop policy if exists "read fbs teams" on public.fbs_teams;
create policy "read fbs teams" on public.fbs_teams for select using (true);

-- Extend the existing ballot trigger: keep all previous checks, add FBS membership for football.
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
  if new.sport = 'football' and exists (
    select 1 from jsonb_array_elements_text(new.ranking) as v
    where public.norm_team_name(v) not in (select team_key from public.fbs_teams)
  ) then
    raise exception 'ranking contains a non-FBS team';
  end if;
  return new;
end;
$$;
