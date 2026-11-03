-- Seed week ONLY  AP Top 25 Preseason, Week 1, 2026-27 season, dated 2026-10-19 (ESPN rankings feed, poll type "ap").
-- This is NOT Open Ballot fan votes. The site labels this week as a seed.
-- Run in the aza-sports Supabase SQL editor only. Safe to re-run (ON CONFLICT DO NOTHING).
insert into public.poll_weeks (sport, week_label, ballot_opens, ballot_closes, results_published_at, status)
values ('basketball', 'Seed: AP Top 25 Preseason Week 1 (Oct 19, 2026)', '2026-10-19 07:00:00+00', '2026-10-19 19:11:00+00', now(), 'published')
on conflict (sport, week_label) do nothing;

insert into public.poll_results (week_id, rank, team_name, points, first_place_votes, ballots_count, blurb)
select id, rank, team_name, points, 0, 0, 'Seeded from the AP Top 25 Preseason, Week 1 (Oct 19, 2026), not an Open Ballot fan vote.'
from public.poll_weeks
cross join (values
  (1, 'Florida Gators', 1461),
  (2, 'Duke Blue Devils', 1411),
  (3, 'Illinois Fighting Illini', 1342),
  (4, 'UConn Huskies', 1241),
  (5, 'Arizona Wildcats', 1214),
  (6, 'Michigan State Spartans', 1203),
  (7, 'Texas Longhorns', 1040),
  (8, 'Tennessee Volunteers', 932),
  (9, 'Virginia Cavaliers', 874),
  (10, 'Houston Cougars', 829),
  (11, 'Louisville Cardinals', 822),
  (12, 'Arkansas Razorbacks', 760),
  (13, 'St. John''s Red Storm', 669),
  (14, 'Miami Hurricanes', 650),
  (15, 'Gonzaga Bulldogs', 637),
  (16, 'Michigan Wolverines', 605),
  (17, 'Kansas Jayhawks', 504),
  (18, 'Iowa State Cyclones', 475),
  (19, 'Texas Tech Red Raiders', 466),
  (20, 'Alabama Crimson Tide', 374),
  (21, 'USC Trojans', 306),
  (22, 'UCLA Bruins', 250),
  (23, 'Kentucky Wildcats', 243),
  (24, 'Vanderbilt Commodores', 241),
  (25, 'BYU Cougars', 179)
) as v(rank, team_name, points)
where public.poll_weeks.sport = 'basketball'
  and public.poll_weeks.week_label = 'Seed: AP Top 25 Preseason Week 1 (Oct 19, 2026)'
on conflict (week_id, rank) do nothing;
