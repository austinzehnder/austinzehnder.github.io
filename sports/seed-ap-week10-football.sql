-- Seed week ONLY — AP Top 25, Week 10, dated 2026-11-01 (ESPN rankings feed, poll type "ap").
-- This is NOT Open Ballot fan votes. The site labels this week as a seed.
-- Run in the aza-sports Supabase SQL editor only. Safe to re-run (ON CONFLICT DO NOTHING).
insert into public.poll_weeks (sport, week_label, ballot_opens, ballot_closes, results_published_at, status)
values ('football', 'Seed — AP Top 25 Week 10 (Nov 1, 2026)', '2026-11-01 07:00:00+00', '2026-11-01 22:08:00+00', now(), 'published')
on conflict (sport, week_label) do nothing;

insert into public.poll_results (week_id, rank, team_name, points, first_place_votes, ballots_count, blurb)
select id, rank, team_name, points, 0, 0, 'Seeded from the AP Top 25, Week 10 (Nov 1, 2026) — not an Open Ballot fan vote.'
from public.poll_weeks
cross join (values
  (1, 'Miami Hurricanes', 1740),
  (2, 'Georgia Bulldogs', 1648),
  (3, 'Utah Utes', 1540),
  (4, 'Notre Dame Fighting Irish', 1476),
  (5, 'UCLA Bruins', 1473),
  (6, 'Indiana Hoosiers', 1446),
  (7, 'BYU Cougars', 1358),
  (8, 'Kentucky Wildcats', 1253),
  (9, 'Alabama Crimson Tide', 1107),
  (10, 'Texas Longhorns', 1057),
  (11, 'Ohio State Buckeyes', 1049),
  (12, 'Ole Miss Rebels', 953),
  (13, 'Texas Tech Red Raiders', 931),
  (14, 'Wake Forest Demon Deacons', 898),
  (15, 'LSU Tigers', 814),
  (16, 'Tennessee Volunteers', 719),
  (17, 'Houston Cougars', 590),
  (18, 'USC Trojans', 539),
  (19, 'Missouri Tigers', 475),
  (20, 'Boise State Broncos', 451),
  (21, 'Iowa Hawkeyes', 401),
  (22, 'New Mexico Lobos', 179),
  (23, 'South Carolina Gamecocks', 163),
  (24, 'Arizona Wildcats', 154),
  (25, 'Florida Gators', 94)
) as v(rank, team_name, points)
where public.poll_weeks.sport = 'football'
  and public.poll_weeks.week_label = 'Seed — AP Top 25 Week 10 (Nov 1, 2026)'
on conflict (week_id, rank) do nothing;
