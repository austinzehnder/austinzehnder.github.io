# Guitar Tabs — private music section (LOCAL ONLY, not pushed)

Status 2026-11-06: all 185 songs imported and verified locally. NOT pushed yet.
Chunks received from Austin (upload, 3 parts): chunk 1 = 49 songs (9.9 MB),
chunk 2 = 71 songs (14 MB), chunk 3 = 65 songs (14 MB). Total unique 185,
no duplicates, all .docx, no Set List folder included. Browser Drive download
route abandoned: Chrome downloaded the 36.8 MB zip repeatedly but the browser
download capture never handed it to Muse; Austin declined to connect Google
Drive, so he uploaded the zip in 3 chunks instead. Drive browser session closed.
Importer: import/import_docx.py (paragraph-preserving, apostrophes restored
from filename underscores, capo extracted, chords collected). 56 songs have a
capo, 0 empty bodies. Dylan docx matches the example PDF (Capo IV).
Still pending: Ultimate Guitar liked songs (login saved in vault 2026-11-06,
not yet pulled) and Austin's approval to push.

## What it is
Private tabs site at `austinzehnder.com/music/` (planned), for practice and
live performance. Private like `/meals/`: noindex + nofollow meta, NOT linked
from the homepage, NOT in sitemap.xml.

## Files
- `index.html` — Catalogue / Song / Set Lists / Add Song views + Perform overlay
- `styles.css` — dark default, light theme via `data-theme="light"`, remembered
- `app.js` — live per-character search (title or artist), song view, set lists,
  perform mode (Prev/Next, Song X of Y, keyboard ←/→, Esc to exit), font size,
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
- Perform mode: full-screen, Prev/Next, progress, font A−/A+, auto-scroll
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
