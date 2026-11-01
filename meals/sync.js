/* sync.js — persistence adapter for the shared meal planner.
 *
 * The app keeps ALL week/planner state in a single plain object (weekState)
 * per week, and talks to persistence only through this adapter:
 *   WeekSync.saveWeek(weekStart, state) — persist one week's weekState
 *   WeekSync.loadWeek(weekStart)        — async, that week's weekState or null
 *   WeekSync.listWeeks()                — async, sorted list of saved week-starts
 *
 * weekStart is an ISO date string (YYYY-MM-DD) for the Monday of the week.
 * Every week is its own record, keyed by week-start — past weeks are never
 * overwritten when a new week starts.
 *
 * CO-AUTHORING: there is no viewer role. A week record is a single shared
 * document in Supabase: whichever partner opens the week loads the same
 * record, and either partner's save writes that week's record.
 *
 * BACKEND: Supabase table `weeks` (week_start text PK, state jsonb).
 * localStorage is kept as a mirror and offline fallback: saves write locally
 * first (instant) and push remotely in the background; loads prefer the
 * remote row and fall back to the local copy when offline or on error.
 *
 * The publishable key below is designed for client-side use (it ships in
 * the page by design) and the table is open to anyone holding it, the same
 * visibility as the old shared page link. Meal plans only — nothing
 * sensitive belongs in a week record. The service_role secret key must
 * NEVER appear here or in the repo.
 *
 * CALENDAR FEED: the live subscribable feed is generated into the site
 * itself (feed.ics, refreshed hourly from the same table). The front-end
 * reads the URL from this config, never hardcodes it elsewhere:
 *   WeekSync.getCalendarFeedUrl() — the feed URL, or null if not connected
 *   WeekSync.setCalendarFeedUrl(url)
 */
(function () {
  var SUPABASE_URL = 'https://poznjijeywnyuymdzklz.supabase.co';
  var SUPABASE_KEY = 'sb_publishable_3I78rQg76ARrB5-x1sSwGA_tPKAQIRN';
  var CALENDAR_FEED_URL = 'https://austinzehnder.com/meals/feed.ics';

  var PREFIX = 'whats-cookin-week-';
  var INDEX_KEY = 'whats-cookin-weeks-v1';
  var LEGACY_KEY = 'whats-cookin-week-v1'; // pre-history single record, migrated once

  function getCalendarFeedUrl() { return CALENDAR_FEED_URL; }
  function setCalendarFeedUrl(url) { CALENDAR_FEED_URL = url || null; }

  function headers(extra) {
    var h = {
      'apikey': SUPABASE_KEY,
      'Authorization': 'Bearer ' + SUPABASE_KEY,
      'Content-Type': 'application/json'
    };
    if (extra) for (var k in extra) h[k] = extra[k];
    return h;
  }

  function fetchWithTimeout(url, opts, ms) {
    var ctrl = null;
    try { ctrl = new AbortController(); } catch (e) {}
    var timer = null;
    if (ctrl) {
      timer = setTimeout(function () { try { ctrl.abort(); } catch (e) {} }, ms || 5000);
      opts = opts || {};
      opts.signal = ctrl.signal;
    }
    return fetch(url, opts).then(function (r) { if (timer) clearTimeout(timer); return r; });
  }

  /* ---------- localStorage mirror ---------- */

  function readIndex() {
    try {
      var raw = localStorage.getItem(INDEX_KEY);
      var arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch (e) { return []; }
  }

  function writeIndex(arr) {
    try { localStorage.setItem(INDEX_KEY, JSON.stringify(arr)); } catch (e) {}
  }

  function localWrite(weekStart, state) {
    try { localStorage.setItem(PREFIX + weekStart, JSON.stringify(state)); } catch (e) {}
    var idx = readIndex();
    if (idx.indexOf(weekStart) === -1) { idx.push(weekStart); idx.sort(); writeIndex(idx); }
  }

  function localRead(weekStart) {
    try {
      var raw = localStorage.getItem(PREFIX + weekStart);
      if (raw) return JSON.parse(raw);
    } catch (e) { return null; }
    return null;
  }

  /* ---------- remote (Supabase PostgREST) ---------- */

  function remoteUpsert(weekStart, state) {
    var body = JSON.stringify({
      week_start: weekStart,
      state: state,
      updated_at: new Date().toISOString()
    });
    return fetchWithTimeout(SUPABASE_URL + '/rest/v1/weeks', {
      method: 'POST',
      headers: headers({ 'Prefer': 'resolution=merge-duplicates' }),
      body: body
    }, 8000).then(function (r) { if (!r.ok) throw new Error('upsert ' + r.status); });
  }

  function remoteLoad(weekStart) {
    var url = SUPABASE_URL + '/rest/v1/weeks?week_start=eq.' + encodeURIComponent(weekStart) + '&select=state';
    return fetchWithTimeout(url, { headers: headers() }, 8000).then(function (r) {
      if (!r.ok) throw new Error('load ' + r.status);
      return r.json();
    }).then(function (rows) {
      return (rows && rows[0] && rows[0].state) ? rows[0].state : null;
    });
  }

  function remoteList() {
    var url = SUPABASE_URL + '/rest/v1/weeks?select=week_start&order=week_start.asc';
    return fetchWithTimeout(url, { headers: headers() }, 8000).then(function (r) {
      if (!r.ok) throw new Error('list ' + r.status);
      return r.json();
    }).then(function (rows) {
      return (rows || []).map(function (r) { return r.week_start; });
    });
  }

  /* ---------- adapter interface ---------- */

  function saveWeek(weekStart, state) {
    if (state === undefined && weekStart && typeof weekStart === 'object') {
      state = weekStart;
      weekStart = currentMondayISO();
    }
    localWrite(weekStart, state);
    /* Background push; a failed push still leaves the local copy, and the
       next save retries. Never let a network error break the UI. */
    try { remoteUpsert(weekStart, state).catch(function () {}); } catch (e) {}
  }

  function loadWeek(weekStart) {
    return remoteLoad(weekStart).then(function (remote) {
      if (remote) { localWrite(weekStart, remote); return remote; }
      /* No remote row: one-time migration of a pre-history local record. */
      try {
        var legacy = localStorage.getItem(LEGACY_KEY);
        if (legacy && weekStart === currentMondayISO()) {
          var parsed = JSON.parse(legacy);
          saveWeek(weekStart, parsed);
          localStorage.removeItem(LEGACY_KEY);
          return parsed;
        }
      } catch (e) {}
      return localRead(weekStart);
    }).catch(function () {
      return localRead(weekStart);
    });
  }

  function listWeeks() {
    return remoteList().then(function (remote) {
      var merged = {};
      readIndex().forEach(function (w) { merged[w] = true; });
      remote.forEach(function (w) { merged[w] = true; });
      return Object.keys(merged).sort();
    }).catch(function () {
      return readIndex().sort();
    });
  }

  function currentMondayISO() {
    var now = new Date();
    var d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var diff = (d.getDay() + 6) % 7; // days since Monday
    d.setDate(d.getDate() - diff);
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  window.WeekSync = {
    saveWeek: saveWeek, loadWeek: loadWeek, listWeeks: listWeeks,
    getCalendarFeedUrl: getCalendarFeedUrl, setCalendarFeedUrl: setCalendarFeedUrl
  };
})();
