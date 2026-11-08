# Guitar Tabs — private music section (LIVE at austinzehnder.com/music/)

Status 2026-11-06: pushed live as commit 910d0c9, verified live 13:37 PST — page loads, "185 of 185 songs", search works (e.g. Zach Bryan → 14 songs), robots.txt disallows /music/, /real-estate/ correctly 404s (held locally). Music-only push: the Real Estate commit was held on local branch `real-estate-hold`, then cherry-picked back as 164871c — local main is 1 commit ahead of origin/main, Real Estate still unpushed.
Chunks received from Austin (upload, 3 parts): chunk 1 = 49 songs (9.9 MB),
chunk 2 = 71 songs (14 MB), chunk 3 = 65 songs (14 MB). Total unique 185,
no duplicates, all .docx, no Set List folder included. Browser Drive download
route abandoned: Chrome downloaded the 36.8 MB zip repeatedly but the browser
download capture never handed it to Muse; Austin declined to connect Google
Drive, so he uploaded the zip in 3 chunks instead. Drive browser session closed.
Importer: import/import_docx.py (paragraph-preserving, apostrophes restored
from filename underscores, capo extracted, chords collected). 56 songs have a
capo, 0 empty bodies. Dylan docx matches the example PDF (Capo IV).
Still pending: create the two Supabase tables below. Rocket Man: Austin chose the My Morning Jacket version.
UG pull COMPLETE 2026-11-06 ~14:26 PST: all 97 new songs pulled in 10 valid batches (1-3, 5-11), catalogue 282 locally (185 Drive + 97 UG), 0 empty, NOT yet pushed live (live still shows 185). Batch 4 was sent with a WRONG list (songs not in Austin's favorites) — 6 were pulled but NOT imported; see import/ug-batch4-NOT-FAVORITES.txt. Box Of Rain (urls line 11) was skipped by batch 2 and led the corrected batch 5. Batch order followed ultimate-guitar-urls.txt lines: 1 = 1-10, 2 = 12-21, 3 = 22-31, 5 = Box Of Rain + 32-40, 6 = 41-50, 7 = 51-60, 8 = 61-70, 9 = 71-80, 10 = 81-90, 11 = 91-97. UG browser session closed after batch 11.
Fit to page (2026-11-06): opening a song shrinks the chart to fit the screen;
longer songs split into pages with Prev/Next (chord lines never split from
their lyric line). Same paging in Perform mode; Next advances pages, then songs.

## What it is
Private tabs site at `austinzehnder.com/music/` (planned), for practice and
live performance. Private like `/meals/`: noindex + nofollow meta, NOT linked
from the homepage, NOT in sitemap.xml.

## Files
- `index.html` — Catalogue / Song / Set Lists / Add Song views + Perform overlay
- `styles.css` — dark default, light theme via `data-theme="light"`, remembered
- `app.js` — live per-character search (title or artist), song view, set lists,
  perform mode (Prev/Next, Song X of Y, keyboard ←/→, Esc to exit, tap/click left half = back a page, right half = next page), font size,
  auto-scroll, add-song form
- `sync.js` — localStorage mirror + Supabase shared backend (same pattern as meals)
- `songs.json` — seed catalogue. Currently 1 song:
  - Bob Dylan — Don't Think Twice, It's All Right — Capo IV, Key C,
    chords C G Am F D7 G7 C7. Reconstructed from the example PDF Austin sent
    2026-11-06. Chords sit on their own line above the lyric line, monospace.

## Features (all confirmed by Austin 2026-11-06)
- Catalogue search filters on every keystroke, by title or artist
- Click a song to view its chart; capo shown as a prominent badge
- Set lists: create named lists, add songs (from song page or set-list page),
  reorder ↑/↓, remove, delete list, perform a whole set
- Perform mode: full-screen, Prev/Next, progress, font A−/A+, auto-scroll, tap/click left half of the chart to go back a page, right half to go forward (hint shows for 5s on entry); non-standard tuning shown in the perform title
- Tuning: every song carries a `tuning` field (extracted from the chart text where stated, else "Standard"). Song view shows a "Tuning: X" chip on every song; non-standard tunings get an amber badge in the catalogue. 7 non-standard in the catalogue: Golden (Open Em), Harvest Moon (Drop D), If You Know Me Intro (C# standard, high E to B), Its Been Awhile (Eb), Northern Attitude (Open D), Not Dead Yet (Open D / Standard — chart offers both), On Track (D standard). Extraction lives in `import/tuning.py`, wired into both importers and the Add Song form. Capos are stored as digits — roman numerals from the Drive docs (I–VIII, 50 songs) were normalized.
  toggle, dark/light toggle
- Add a song in the browser: title, artist, capo, key, chords, chart text

## Shared backend — still to create
Reuses the meals Supabase project `whats-cookin`
(`https://poznjijeywnyuymdzklz.supabase.co`, publishable key already in
`sync.js`, same as meals). Tables do NOT exist yet — until they do, the app
runs on localStorage + `songs.json` and remote calls fail quietly.

Create in Supabase SQL editor, then RLS read/insert/update only (same as meals):
```sql
create table music_songs (id text primary key, data jsonb not null, updated_at timestamptz);
create table music_setlists (id text primary key, data jsonb not null, updated_at timestamptz);
```

## Push checklist (only after Austin approves)
1. Import the zip: convert each doc/PDF to a `songs.json` entry (title, artist,
   capo, key, chords, body in chord-over-lyric monospace). Keep the original
   PDFs/docs in the repo only if he wants them downloadable — otherwise text only.
2. Add Ultimate Guitar liked songs he wants (from the login pull, or a list he sends).
3. Create the two Supabase tables above; verify a song added on one device
   appears on the other.
4. `robots.txt`: add `Disallow: /music/` (same as `/meals/`).
5. Do NOT add `/music/` to `sitemap.xml` or the homepage nav.
6. Commit + push, verify live at `https://austinzehnder.com/music/` in a fresh
   browser check (search, open song, create set list, perform Next, toggle light).
