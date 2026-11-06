/* sync.js — persistence adapter for the guitar tabs site.
 *
 * Same pattern as meals/sync.js: localStorage is the instant mirror and
 * offline fallback; Supabase is the shared backend so songs and set lists
 * are the same on phone and laptop.
 *
 * BACKEND (to create — see README.md):
 *   Supabase project 'whats-cookin' (same project as meals), tables:
 *     music_songs    (id text PK, data jsonb, updated_at timestamptz)
 *     music_setlists (id text PK, data jsonb, updated_at timestamptz)
 *   RLS: read/insert/update only, same as the meals tables.
 * Until those tables exist, remote calls fail quietly and the app runs
 * entirely on localStorage + the seed songs.json. Nothing in the UI breaks.
 *
 * The publishable key below is designed for client-side use (it ships in
 * the page by design). The service_role secret key must NEVER appear here.
 */
(function () {
  var SUPABASE_URL = 'https://poznjijeywnyuymdzklz.supabase.co';
  var SUPABASE_KEY = 'sb_publishable_3I78rQg76ARrB5-x1sSwGA_tPKAQIRN';
  var SONGS_KEY = 'guitar-tabs-songs-v1';
  var SETS_KEY = 'guitar-tabs-setlists-v1';

  function headers(extra) {
    var h = { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY, 'Content-Type': 'application/json' };
    if (extra) for (var k in extra) h[k] = extra[k];
    return h;
  }
  function fetchWithTimeout(url, opts, ms) {
    var ctrl = null;
    try { ctrl = new AbortController(); } catch (e) {}
    var timer = null;
    if (ctrl) { timer = setTimeout(function () { try { ctrl.abort(); } catch (e) {} }, ms || 5000); opts = opts || {}; opts.signal = ctrl.signal; }
    return fetch(url, opts).then(function (r) { if (timer) clearTimeout(timer); return r; });
  }
  function localGet(key) { try { var raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : null; } catch (e) { return null; } }
  function localSet(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {} }

  function remoteUpsert(table, id, data) {
    return fetchWithTimeout(SUPABASE_URL + '/rest/v1/' + table, {
      method: 'POST',
      headers: headers({ 'Prefer': 'resolution=merge-duplicates' }),
      body: JSON.stringify({ id: id, data: data, updated_at: new Date().toISOString() })
    }, 8000).then(function (r) { if (!r.ok) throw new Error('upsert ' + r.status); });
  }
  function remoteList(table) {
    return fetchWithTimeout(SUPABASE_URL + '/rest/v1/' + table + '?select=id,data', { headers: headers() }, 8000)
      .then(function (r) { if (!r.ok) throw new Error('list ' + r.status); return r.json(); })
      .then(function (rows) { return (rows || []).map(function (r) { return r.data; }); });
  }

  function saveSongs(songs) {
    localSet(SONGS_KEY, songs);
    songs.forEach(function (s) { try { remoteUpsert('music_songs', s.id, s).catch(function () {}); } catch (e) {} });
  }
  function loadSongs(seed) {
    return remoteList('music_songs').then(function (remote) {
      if (remote && remote.length) { localSet(SONGS_KEY, remote); return remote; }
      return localGet(SONGS_KEY) || seed;
    }).catch(function () { return localGet(SONGS_KEY) || seed; });
  }
  function saveSetlists(sets) {
    localSet(SETS_KEY, sets);
    sets.forEach(function (s) { try { remoteUpsert('music_setlists', s.id, s).catch(function () {}); } catch (e) {} });
  }
  function loadSetlists() {
    return remoteList('music_setlists').then(function (remote) {
      if (remote && remote.length) { localSet(SETS_KEY, remote); return remote; }
      return localGet(SETS_KEY) || [];
    }).catch(function () { return localGet(SETS_KEY) || []; });
  }

  window.TabSync = { saveSongs: saveSongs, loadSongs: loadSongs, saveSetlists: saveSetlists, loadSetlists: loadSetlists };
})();
