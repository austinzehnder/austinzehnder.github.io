/* app.js — guitar tabs catalogue, song view, set lists, perform mode.
 * Search filters live on every keystroke (title or artist).
 * Theme + font size persist in localStorage.
 */
(function () {
  'use strict';
  var songs = [];
  var setlists = [];
  var currentSongId = null;
  var performIds = [];
  var performIdx = 0;
  var fontSize = parseInt(localStorage.getItem('guitar-tabs-font') || '16', 10);
  var fitOn = localStorage.getItem('guitar-tabs-fit') !== '0';
  var scrollTimer = null;
  var hintTimer = null;
  var scrollOn = false;
  var currentSongLines = [];
  var songPages = [];
  var songPageIdx = 0;
  var performPages = [];
  var performPageIdx = 0;

  var $ = function (id) { return document.getElementById(id); };
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function toast(msg) { var t = $('toast'); t.textContent = msg; t.classList.add('show'); setTimeout(function () { t.classList.remove('show'); }, 2200); }
  function slug(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || ('song-' + Date.now()); }
  function applyFont() { document.documentElement.style.setProperty('--chart-size', fontSize + 'px'); }
  function applyTheme() {
    var theme = localStorage.getItem('guitar-tabs-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    var label = theme === 'dark' ? '☀️ Light' : '🌙 Dark';
    $('themeBtn').textContent = label;
    $('performThemeBtn').textContent = label;
  }
  function setTheme() {
    var next = (localStorage.getItem('guitar-tabs-theme') || 'dark') === 'dark' ? 'light' : 'dark';
    localStorage.setItem('guitar-tabs-theme', next);
    applyTheme();
  }
  function songById(id) { for (var i = 0; i < songs.length; i++) if (songs[i].id === id) return songs[i]; return null; }

  /* ---------- fit to page: whole song on one screen, paged when long ---------- */
  function isChordLine(line) {
    var t = line.trim();
    if (!t || /^\[.*\]$/.test(t)) return false;
    var toks = t.split(/\s+/);
    for (var i = 0; i < toks.length; i++) {
      if (!/^[A-G][#b]?(m|maj|min|dim|aug|sus[24]?|add\d?|m7|maj7|7|6|9|11|13|°|ø)?(\/[A-G][#b]?)?$/i.test(toks[i])) return false;
    }
    return true;
  }
  function isSectionLine(line) { return /^\[.*\]\s*$/.test(line.trim()); }
  /* Shrink the font (floor 10px) just enough that the longest line fits the width. */
  function fitFont(lines, availW, baseSize) {
    var size = baseSize, maxChars = 0;
    lines.forEach(function (l) { if (l.length > maxChars) maxChars = l.length; });
    while (size > 10 && maxChars * size * 0.6 > availW) size -= 1;
    return size;
  }
  /* Split lines into pages that fit availH. wrapW: if set, long lines wrap at that
   * width and count as multiple visual lines. Never splits a chord line from the
   * lyric line under it, or a [Section] header from what follows it. */
  function computePages(lines, fontPx, availH, lh, wrapW) {
    var lineH = fontPx * lh;
    var maxVisual = Math.max(4, Math.floor(availH / lineH));
    var pages = [], i = 0;
    while (i < lines.length) {
      var visual = 0, end = i;
      while (end < lines.length) {
        var v = wrapW ? Math.max(1, Math.ceil(lines[end].length * fontPx * 0.6 / wrapW)) : 1;
        if (visual + v > maxVisual && end > i) break;
        visual += v; end += 1;
      }
      if (end === i) end = i + 1; /* one very long wrapped line still gets its own page */
      while (end > i + 1 && end < lines.length && (isChordLine(lines[end - 1]) || isSectionLine(lines[end - 1]))) end -= 1;
      pages.push({ start: i, end: end });
      i = end;
    }
    return pages;
  }
  function renderPager(el, idx, total, onMove) {
    if (!el) return;
    if (total <= 1) { el.innerHTML = ''; return; }
    el.innerHTML = '<button class="btn secondary" type="button" data-pg="-1">← Prev</button>' +
      '<span class="count">Page ' + (idx + 1) + ' of ' + total + '</span>' +
      '<button class="btn secondary" type="button" data-pg="1">Next →</button>';
    el.querySelectorAll('[data-pg]').forEach(function (b) {
      b.addEventListener('click', function () { onMove(parseInt(b.getAttribute('data-pg'), 10)); });
    });
  }
  function songAvail() {
    var chart = document.querySelector('#songDetail .chart');
    if (!chart) return null;
    var rect = chart.getBoundingClientRect();
    return { h: Math.max(200, window.innerHeight - rect.top - 24), w: Math.max(200, chart.clientWidth - 40) };
  }
  function renderSongChart() {
    var pre = $('songPre'); if (!pre) return;
    if (!fitOn || !currentSongLines.length) {
      pre.textContent = currentSongLines.join('\n');
      pre.style.fontSize = '';
      songPages = [{ start: 0, end: currentSongLines.length }]; songPageIdx = 0;
      renderPager($('songPager'), 0, 1, function () {});
      return;
    }
    var av = songAvail();
    var size = fitFont(currentSongLines, av.w, fontSize);
    var pages = computePages(currentSongLines, size, av.h, 1.55, null);
    songPages = pages;
    if (songPageIdx >= pages.length) songPageIdx = pages.length - 1;
    var p = pages[songPageIdx];
    pre.style.fontSize = size + 'px';
    pre.textContent = currentSongLines.slice(p.start, p.end).join('\n');
    renderPager($('songPager'), songPageIdx, pages.length, function (d) {
      songPageIdx = Math.min(pages.length - 1, Math.max(0, songPageIdx + d));
      renderSongChart();
      window.scrollTo(0, 0);
    });
  }
  function refitCurrent() {
    if ($('view-song').classList.contains('active')) renderSongChart();
    if (!$('perform').hidden) renderPerform();
  }
  function setFit(on) {
    fitOn = on;
    localStorage.setItem('guitar-tabs-fit', on ? '1' : '0');
    updateFitLabels();
    refitCurrent();
  }
  function updateFitLabels() {
    var label = fitOn ? 'Fit: on' : 'Fit: off';
    $('fitBtn').textContent = label;
    $('performFitBtn').textContent = label;
  }

  /* ---------- views ---------- */
  function showView(name) {
    document.querySelectorAll('.view').forEach(function (v) { v.classList.remove('active'); });
    document.querySelectorAll('nav button').forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-view') === name); });
    var el = $('view-' + name);
    if (el) el.classList.add('active');
    if (name === 'catalogue') renderCatalogue();
    if (name === 'setlists') renderSetlists();
  }

  /* ---------- catalogue ---------- */
  function renderCatalogue() {
    var q = ($('search').value || '').trim().toLowerCase();
    var list = songs.filter(function (s) {
      if (!q) return true;
      return (s.title + ' ' + s.artist).toLowerCase().indexOf(q) !== -1;
    });
    $('count').textContent = list.length + ' of ' + songs.length + ' songs';
    $('noResults').style.display = list.length ? 'none' : 'block';
    $('songList').innerHTML = list.map(function (s) {
      var capo = s.capo ? '<span class="capo-badge">Capo ' + esc(s.capo) + '</span>'
        : '<span class="capo-badge none">No capo</span>';
      var tun = (s.tuning && s.tuning !== 'Standard') ? '<span class="tuning-badge">' + esc(s.tuning) + '</span>' : '';
      return '<button class="song-row" type="button" data-id="' + esc(s.id) + '">' +
        '<span><b>' + esc(s.title) + '</b><small>' + esc(s.artist) + (s.key ? ' · Key ' + esc(s.key) : '') + '</small></span>' + capo + tun + '</button>';
    }).join('');
    document.querySelectorAll('.song-row').forEach(function (btn) {
      btn.addEventListener('click', function () { openSong(btn.getAttribute('data-id')); });
    });
  }

  /* ---------- song view ---------- */
  function openSong(id) {
    var s = songById(id);
    if (!s) return;
    currentSongId = id;
    var capo = s.capo ? '<span class="capo-badge">Capo ' + esc(s.capo) + '</span>' : '<span class="capo-badge none">No capo</span>';
    var chips = [];
    if (s.key) chips.push('Key ' + esc(s.key));
    chips.push('Tuning: ' + esc(s.tuning || 'Standard'));
    if (s.chords && s.chords.length) chips.push('Chords: ' + esc(s.chords.join(', ')));
    if (s.source) chips.push(esc(s.source));
    $('songDetail').innerHTML =
      '<div class="song-head"><h2>' + esc(s.title) + '</h2><p>' + esc(s.artist) + '</p></div>' +
      '<div class="meta-row">' + capo + chips.map(function (c) { return '<span class="chip">' + c + '</span>'; }).join('') + '</div>' +
      '<div class="chart"><pre id="songPre"></pre></div><div class="pager" id="songPager"></div>';
    var sel = $('addToSetSelect');
    sel.innerHTML = setlists.map(function (set) { return '<option value="' + esc(set.id) + '">' + esc(set.name) + '</option>'; }).join('') ||
      '<option value="">(no set list yet — create one first)</option>';
    currentSongLines = (s.body || '').split('\n');
    songPageIdx = 0;
    applyFont();
    showView('song');
    window.scrollTo(0, 0);
    renderSongChart();
  }

  /* ---------- set lists ---------- */
  function renderSetlists() {
    var wrap = $('setListWrap');
    if (!setlists.length) {
      wrap.innerHTML = '<p class="empty-state">No set lists yet. Name one above, then add songs from a song page or from the list below.</p>';
      return;
    }
    wrap.innerHTML = setlists.map(function (set) {
      var items = set.songIds.map(function (id, idx) {
        var s = songById(id);
        var label = s ? esc(s.title) + ' — ' + esc(s.artist) : '(removed song)';
        return '<li>' + label +
          ' <button class="btn secondary mini" type="button" data-set="' + esc(set.id) + '" data-idx="' + idx + '" data-act="up">↑</button>' +
          ' <button class="btn secondary mini" type="button" data-set="' + esc(set.id) + '" data-idx="' + idx + '" data-act="down">↓</button>' +
          ' <button class="btn danger mini" type="button" data-set="' + esc(set.id) + '" data-idx="' + idx + '" data-act="remove">Remove</button></li>';
      }).join('');
      var picker = '<div class="btn-row"><select data-picker="' + esc(set.id) + '">' +
        songs.map(function (s) { return '<option value="' + esc(s.id) + '">' + esc(s.title) + ' — ' + esc(s.artist) + '</option>'; }).join('') +
        '</select> <button class="btn secondary" type="button" data-add-to="' + esc(set.id) + '">Add song</button></div>';
      return '<div class="set-card"><h3>' + esc(set.name) + '</h3>' +
        '<p class="empty-state">' + set.songIds.length + ' song' + (set.songIds.length === 1 ? '' : 's') + '</p>' +
        '<ol>' + (items || '<li class="empty-state">Empty — add a song below.</li>') + '</ol>' + picker +
        '<div class="btn-row"><button class="btn" type="button" data-perform="' + esc(set.id) + '">▶ Perform this set</button>' +
        '<button class="btn danger" type="button" data-delete-set="' + esc(set.id) + '">Delete set list</button></div></div>';
    }).join('');

    wrap.querySelectorAll('[data-add-to]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var set = setlists.find(function (x) { return x.id === btn.getAttribute('data-add-to'); });
        var sel = wrap.querySelector('[data-picker="' + set.id + '"]');
        if (set && sel && sel.value) { set.songIds.push(sel.value); TabSync.saveSetlists(setlists); renderSetlists(); toast('Added to ' + set.name); }
      });
    });
    wrap.querySelectorAll('[data-act]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var set = setlists.find(function (x) { return x.id === btn.getAttribute('data-set'); });
        if (!set) return;
        var idx = parseInt(btn.getAttribute('data-idx'), 10);
        var act = btn.getAttribute('data-act');
        if (act === 'remove') set.songIds.splice(idx, 1);
        if (act === 'up' && idx > 0) { var t = set.songIds[idx - 1]; set.songIds[idx - 1] = set.songIds[idx]; set.songIds[idx] = t; }
        if (act === 'down' && idx < set.songIds.length - 1) { var u = set.songIds[idx + 1]; set.songIds[idx + 1] = set.songIds[idx]; set.songIds[idx] = u; }
        TabSync.saveSetlists(setlists); renderSetlists();
      });
    });
    wrap.querySelectorAll('[data-perform]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var set = setlists.find(function (x) { return x.id === btn.getAttribute('data-perform'); });
        if (set) startPerform(set.songIds.slice(), set.name);
      });
    });
    wrap.querySelectorAll('[data-delete-set]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (!confirm('Delete this set list?')) return;
        setlists = setlists.filter(function (x) { return x.id !== btn.getAttribute('data-delete-set'); });
        TabSync.saveSetlists(setlists); renderSetlists();
      });
    });
  }

  /* ---------- perform mode ---------- */
  function startPerform(ids, label) {
    if (!ids.length) { toast('Nothing to perform — add songs first.'); return; }
    performIds = ids; performIdx = 0; performPageIdx = 0;
    $('perform').hidden = false;
    document.body.style.overflow = 'hidden';
    var hint = $('tapHint');
    hint.classList.remove('fade');
    if (hintTimer) clearTimeout(hintTimer);
    hintTimer = setTimeout(function () { hint.classList.add('fade'); }, 5000);
    renderPerform();
  }
  function renderPerform() {
    var s = songById(performIds[performIdx]);
    if (!s) return;
    var lines = (s.body || '').split('\n');
    var bodyEl = $('performBody');
    if (fitOn) {
      var avH = bodyEl.clientHeight || window.innerHeight * 0.7;
      var avW = Math.max(200, (bodyEl.clientWidth || window.innerWidth) - 40);
      performPages = computePages(lines, fontSize, avH, 1.6, avW);
      bodyEl.classList.add('paged');
    } else {
      performPages = [{ start: 0, end: lines.length }];
      bodyEl.classList.remove('paged');
    }
    if (performPageIdx >= performPages.length) performPageIdx = performPages.length - 1;
    if (performPageIdx < 0) performPageIdx = 0;
    var p = performPages[performPageIdx];
    $('performProgress').textContent = 'Song ' + (performIdx + 1) + ' of ' + performIds.length +
      (performPages.length > 1 ? ' · Page ' + (performPageIdx + 1) + ' of ' + performPages.length : '');
    $('performTitle').textContent = s.title + ' — ' + s.artist + (s.capo ? '  ·  Capo ' + s.capo : '') +
      ((s.tuning && s.tuning !== 'Standard') ? '  ·  ' + s.tuning : '');
    bodyEl.innerHTML = '<pre>' + esc(lines.slice(p.start, p.end).join('\n')) + '</pre>';
    bodyEl.scrollTop = 0;
    $('prevBtn').disabled = performIdx === 0 && performPageIdx === 0;
    $('nextBtn').textContent = (performIdx === performIds.length - 1 && performPageIdx === performPages.length - 1) ? 'Finish ✓' : 'Next →';
    applyFont();
  }
  function stopPerform() {
    $('perform').hidden = true;
    document.body.style.overflow = '';
    stopScroll();
  }
  function stopScroll() { if (scrollTimer) { clearInterval(scrollTimer); scrollTimer = null; } scrollOn = false; $('scrollBtn').textContent = 'Auto-scroll: off'; }
  function advancePage() {
    if (performPageIdx < performPages.length - 1) { performPageIdx++; renderPerform(); return true; }
    if (performIdx < performIds.length - 1) { performIdx++; performPageIdx = 0; renderPerform(); return true; }
    stopPerform();
    return false;
  }
  function toggleScroll() {
    if (scrollOn) { stopScroll(); return; }
    scrollOn = true; $('scrollBtn').textContent = 'Auto-scroll: on';
    if (fitOn && performPages.length > 1) {
      scrollTimer = setInterval(function () { if (!advancePage()) stopScroll(); }, 6000);
    } else {
      scrollTimer = setInterval(function () { $('performBody').scrollTop += 1; }, 60);
    }
  }

  /* ---------- wiring ---------- */
  document.querySelectorAll('nav button').forEach(function (b) {
    b.addEventListener('click', function () { showView(b.getAttribute('data-view')); });
  });
  $('search').addEventListener('input', renderCatalogue);
  $('backBtn').addEventListener('click', function () { showView('catalogue'); });
  $('themeBtn').addEventListener('click', setTheme);
  $('performThemeBtn').addEventListener('click', setTheme);
  $('songPerformBtn').addEventListener('click', function () { if (currentSongId) startPerform([currentSongId], 'Single song'); });
  $('addToSetBtn').addEventListener('click', function () {
    var sel = $('addToSetSelect');
    var set = setlists.find(function (x) { return x.id === sel.value; });
    if (!set || !currentSongId) { toast('Create a set list first.'); return; }
    set.songIds.push(currentSongId);
    TabSync.saveSetlists(setlists);
    toast('Added to ' + set.name);
  });
  document.querySelectorAll('[data-font]').forEach(function (b) {
    b.addEventListener('click', function () {
      var d = parseInt(b.getAttribute('data-font'), 10);
      fontSize = d === 0 ? 16 : Math.min(32, Math.max(12, fontSize + d * 2));
      localStorage.setItem('guitar-tabs-font', String(fontSize));
      applyFont();
      refitCurrent();
    });
  });
  $('createSetBtn').addEventListener('click', function () {
    var name = ($('newSetName').value || '').trim();
    if (!name) { toast('Give the set list a name first.'); return; }
    setlists.push({ id: 'set-' + Date.now(), name: name, songIds: [] });
    TabSync.saveSetlists(setlists);
    $('newSetName').value = '';
    renderSetlists();
    toast('Set list created: ' + name);
  });
  $('addForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var title = $('fTitle').value.trim();
    var artist = $('fArtist').value.trim();
    var body = $('fBody').value;
    if (!title || !artist || !body.trim()) return;
    var song = {
      id: slug(title + '-' + artist) + '-' + Date.now().toString(36),
      title: title, artist: artist,
      capo: $('fCapo').value.trim(), key: $('fKey').value.trim(),
      tuning: $('fTuning').value.trim() || 'Standard',
      chords: $('fChords').value.split(',').map(function (c) { return c.trim(); }).filter(Boolean),
      body: body, source: 'Added in browser'
    };
    songs.push(song);
    songs.sort(function (a, b) { return a.title.localeCompare(b.title); });
    TabSync.saveSongs(songs);
    $('addMsg').textContent = 'Saved: ' + title + ' — ' + artist + '. It is now in the catalogue on this device, and syncs when the shared backend is connected.';
    e.target.reset();
    renderCatalogue();
    toast('Song saved');
  });
  $('clearAddBtn').addEventListener('click', function () { $('addForm').reset(); $('addMsg').textContent = ''; });
  $('prevBtn').addEventListener('click', function () {
    if (performPageIdx > 0) { performPageIdx--; renderPerform(); }
    else if (performIdx > 0) { performIdx--; performPageIdx = 999; renderPerform(); }
  });
  $('nextBtn').addEventListener('click', function () {
    if (performPageIdx < performPages.length - 1) { performPageIdx++; renderPerform(); }
    else if (performIdx < performIds.length - 1) { performIdx++; performPageIdx = 0; renderPerform(); }
    else stopPerform();
  });
  $('exitPerformBtn').addEventListener('click', stopPerform);
  /* Tap or click the chart area: left half = previous page, right half = next page.
   * Reuses the Prev/Next buttons, so page-then-song order and Finish stay identical. */
  $('performBody').addEventListener('click', function (e) {
    if (e.target.closest && e.target.closest('button, a, input, select, textarea')) return;
    if (e.clientX < window.innerWidth / 2) $('prevBtn').click(); else $('nextBtn').click();
  });
  $('fontDownBtn').addEventListener('click', function () { fontSize = Math.max(12, fontSize - 2); localStorage.setItem('guitar-tabs-font', String(fontSize)); applyFont(); refitCurrent(); });
  $('fontUpBtn').addEventListener('click', function () { fontSize = Math.min(36, fontSize + 2); localStorage.setItem('guitar-tabs-font', String(fontSize)); applyFont(); refitCurrent(); });
  $('scrollBtn').addEventListener('click', toggleScroll);
  $('fitBtn').addEventListener('click', function () { setFit(!fitOn); });
  $('performFitBtn').addEventListener('click', function () { setFit(!fitOn); });
  var resizeTimer = null;
  window.addEventListener('resize', function () {
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(refitCurrent, 200);
  });
  document.addEventListener('keydown', function (e) {
    if ($('perform').hidden) return;
    if (e.key === 'ArrowRight') $('nextBtn').click();
    if (e.key === 'ArrowLeft') $('prevBtn').click();
    if (e.key === 'Escape') stopPerform();
  });

  /* ---------- init ---------- */
  applyTheme(); applyFont(); updateFitLabels();
  fetch('songs.json').then(function (r) { return r.json(); }).then(function (seed) {
    seed.sort(function (a, b) { return a.title.localeCompare(b.title); });
    return TabSync.loadSongs(seed).then(function (loaded) {
      songs = (loaded && loaded.length ? loaded : seed).slice().sort(function (a, b) { return a.title.localeCompare(b.title); });
      return TabSync.loadSetlists().then(function (sets) { setlists = sets || []; renderCatalogue(); });
    });
  }).catch(function () {
    songs = []; renderCatalogue();
  });
})();
