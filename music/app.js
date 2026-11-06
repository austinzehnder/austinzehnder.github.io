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
  var scrollTimer = null;
  var scrollOn = false;

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
      return '<button class="song-row" type="button" data-id="' + esc(s.id) + '">' +
        '<span><b>' + esc(s.title) + '</b><small>' + esc(s.artist) + (s.key ? ' · Key ' + esc(s.key) : '') + '</small></span>' + capo + '</button>';
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
    if (s.chords && s.chords.length) chips.push('Chords: ' + esc(s.chords.join(', ')));
    if (s.source) chips.push(esc(s.source));
    $('songDetail').innerHTML =
      '<div class="song-head"><h2>' + esc(s.title) + '</h2><p>' + esc(s.artist) + '</p></div>' +
      '<div class="meta-row">' + capo + chips.map(function (c) { return '<span class="chip">' + c + '</span>'; }).join('') + '</div>' +
      '<div class="chart"><pre>' + esc(s.body) + '</pre></div>';
    var sel = $('addToSetSelect');
    sel.innerHTML = setlists.map(function (set) { return '<option value="' + esc(set.id) + '">' + esc(set.name) + '</option>'; }).join('') ||
      '<option value="">(no set list yet — create one first)</option>';
    applyFont();
    showView('song');
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
    performIds = ids; performIdx = 0;
    $('perform').hidden = false;
    document.body.style.overflow = 'hidden';
    renderPerform();
  }
  function renderPerform() {
    var s = songById(performIds[performIdx]);
    if (!s) return;
    $('performProgress').textContent = 'Song ' + (performIdx + 1) + ' of ' + performIds.length;
    $('performTitle').textContent = s.title + ' — ' + s.artist + (s.capo ? '  ·  Capo ' + s.capo : '');
    $('performBody').innerHTML = '<pre>' + esc(s.body) + '</pre>';
    $('performBody').scrollTop = 0;
    $('prevBtn').disabled = performIdx === 0;
    $('nextBtn').textContent = performIdx === performIds.length - 1 ? 'Finish ✓' : 'Next →';
    applyFont();
  }
  function stopPerform() {
    $('perform').hidden = true;
    document.body.style.overflow = '';
    stopScroll();
  }
  function stopScroll() { if (scrollTimer) { clearInterval(scrollTimer); scrollTimer = null; } scrollOn = false; $('scrollBtn').textContent = 'Auto-scroll: off'; }
  function toggleScroll() {
    if (scrollOn) { stopScroll(); return; }
    scrollOn = true; $('scrollBtn').textContent = 'Auto-scroll: on';
    scrollTimer = setInterval(function () { $('performBody').scrollTop += 1; }, 60);
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
  $('prevBtn').addEventListener('click', function () { if (performIdx > 0) { performIdx--; renderPerform(); } });
  $('nextBtn').addEventListener('click', function () {
    if (performIdx < performIds.length - 1) { performIdx++; renderPerform(); }
    else stopPerform();
  });
  $('exitPerformBtn').addEventListener('click', stopPerform);
  $('fontDownBtn').addEventListener('click', function () { fontSize = Math.max(12, fontSize - 2); localStorage.setItem('guitar-tabs-font', String(fontSize)); applyFont(); });
  $('fontUpBtn').addEventListener('click', function () { fontSize = Math.min(36, fontSize + 2); localStorage.setItem('guitar-tabs-font', String(fontSize)); applyFont(); });
  $('scrollBtn').addEventListener('click', toggleScroll);
  document.addEventListener('keydown', function (e) {
    if ($('perform').hidden) return;
    if (e.key === 'ArrowRight') $('nextBtn').click();
    if (e.key === 'ArrowLeft') $('prevBtn').click();
    if (e.key === 'Escape') stopPerform();
  });

  /* ---------- init ---------- */
  applyTheme(); applyFont();
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
