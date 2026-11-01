// scripts/build-feed.js — regenerates meals/feed.ics from the Supabase weeks table.
// Run by the meal-feed GitHub Action (hourly + manual).
// Env: SUPABASE_URL, SUPABASE_ANON_KEY (repo secrets; the anon key is the
// publishable client key, same one shipped in sync.js).
// Event format mirrors the app's local .ics download: one evening 6-7pm
// floating-time event per planned dinner, titled with the dish name.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const APP_JS = path.join(ROOT, 'app.js');
const OUT = path.join(ROOT, 'feed.ics');

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const SPECIALS = { leftovers: 'Leftovers', 'eating-out': 'Eating Out' };

function escICS(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

function recipeNames() {
  const src = fs.readFileSync(APP_JS, 'utf8');
  const map = {};
  const re = /\{\s*id:\s*(\d+),\s*name:\s*"([^"]*)"/g;
  let m;
  while ((m = re.exec(src)) !== null) map[m[1]] = m[2];
  return map;
}

function addDays(iso, n) {
  const parts = iso.split('-').map(Number);
  const dt = new Date(parts[0], parts[1] - 1, parts[2]);
  dt.setDate(dt.getDate() + n);
  const mm = String(dt.getMonth() + 1).padStart(2, '0');
  const dd = String(dt.getDate()).padStart(2, '0');
  return dt.getFullYear() + '-' + mm + '-' + dd;
}

async function main() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error('SUPABASE_URL and SUPABASE_ANON_KEY must be set');
  const names = recipeNames();
  const res = await fetch(url + '/rest/v1/weeks?select=week_start,state&order=week_start.asc', {
    headers: { apikey: key, Authorization: 'Bearer ' + key }
  });
  if (!res.ok) throw new Error('Supabase fetch failed: ' + res.status);
  const rows = await res.json();
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z');
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    "PRODID:-//What's cookin', good lookin'?//Meal Planner//EN",
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH'
  ];
  let eventCount = 0;
  for (const row of rows) {
    const assignments = (row.state && row.state.assignments) || {};
    DAYS.forEach((day, idx) => {
      const a = assignments[day];
      if (!a) return;
      let title = null;
      if (a.kind === 'recipe') title = names[String(a.id)];
      else if (a.special) title = SPECIALS[a.special];
      if (!title) return;
      const date = addDays(row.week_start, idx).replace(/-/g, '');
      lines.push(
        'BEGIN:VEVENT',
        'UID:meal-' + row.week_start + '-' + idx + '@whats-cookin',
        'DTSTAMP:' + stamp,
        'DTSTART:' + date + 'T180000',
        'DTEND:' + date + 'T190000',
        'SUMMARY:' + escICS(title),
        'END:VEVENT'
      );
      eventCount += 1;
    });
  }
  lines.push('END:VCALENDAR');
  fs.writeFileSync(OUT, lines.join('\r\n') + '\r\n');
  console.log('Wrote ' + OUT + ': ' + rows.length + ' weeks, ' + eventCount + ' events');
}

main().catch((e) => { console.error(e); process.exit(1); });
