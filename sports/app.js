/* The Open Ballot | Austin Zehnder Analytics
 * Scope: FBS football (ESPN group 80) and NCAA Division I men's
 * basketball (ESPN group 50) only. No FCS / Division II / Division III.
 * Data: ESPN public site API (unofficial, no key). Logos come from the API
 * response itself (team.logos[0].href), never hardcoded.
 * Security: no service_role key ever appears here, only the Supabase
 * publishable (anon) key, which RLS limits to the caller's own rows.
 * All ballot validation (week open, 25 unique teams, one per user) is
 * enforced server-side in supabase-schema.sql, never trusted from the browser.
 * Supabase: project aza-sports is wired below (publishable key only).
 * Ballots require a signed-in, email-confirmed account and an open
 * poll_weeks row for that sport; otherwise submission is refused with
 * a plain-language message. See supabase-schema.sql for tables, RLS
 * and the weekly cycle. */
(function () {
  var SUPABASE_URL = 'https://ddiqjcitooqniuuxyvef.supabase.co';
  var SUPABASE_KEY = 'sb_publishable_6DyiafcNxm7WtYKJbzR9fg_oLTV9Eds';
  var SPORTS = {
    football: { label: 'Football', api: 'football/college-football', group: 80 },
    basketball: { label: 'Basketball', api: 'basketball/mens-college-basketball', group: 50 }
  };
  // 2026 FBS allowlist: 138 teams, conference by conference (ACC 17, American 14,
  // Big 12 16, Big Ten 18, CUSA 10, MAC 13, Mountain West 10, Pac-12 8, SEC 16,
  // Sun Belt 14, Independents 2). ESPN's teams feed includes Division II/III
  // schools and its standings/group endpoints 404, so this list, not ESPN's
  // division filter, is what makes the ballot FBS-only.
  var FBS_TEAMS = [
    // ACC (17)
    "boston college eagles",
    "california golden bears",
    "clemson tigers",
    "duke blue devils",
    "florida state seminoles",
    "georgia tech yellow jackets",
    "louisville cardinals",
    "miami hurricanes",
    "nc state wolfpack",
    "north carolina tar heels",
    "pittsburgh panthers",
    "smu mustangs",
    "stanford cardinal",
    "syracuse orange",
    "virginia cavaliers",
    "virginia tech hokies",
    "wake forest demon deacons",
    // American (14)
    "army black knights",
    "charlotte 49ers",
    "east carolina pirates",
    "florida atlantic owls",
    "memphis tigers",
    "navy midshipmen",
    "north texas mean green",
    "rice owls",
    "temple owls",
    "tulane green wave",
    "tulsa golden hurricane",
    "uab blazers",
    "south florida bulls",
    "utsa roadrunners",
    // Big 12 (16)
    "arizona wildcats",
    "arizona state sun devils",
    "baylor bears",
    "byu cougars",
    "cincinnati bearcats",
    "colorado buffaloes",
    "houston cougars",
    "iowa state cyclones",
    "kansas jayhawks",
    "kansas state wildcats",
    "oklahoma state cowboys",
    "tcu horned frogs",
    "texas tech red raiders",
    "ucf knights",
    "utah utes",
    "west virginia mountaineers",
    // Big Ten (18)
    "illinois fighting illini",
    "indiana hoosiers",
    "iowa hawkeyes",
    "maryland terrapins",
    "michigan wolverines",
    "michigan state spartans",
    "minnesota golden gophers",
    "nebraska cornhuskers",
    "northwestern wildcats",
    "ohio state buckeyes",
    "oregon ducks",
    "penn state nittany lions",
    "purdue boilermakers",
    "rutgers scarlet knights",
    "ucla bruins",
    "usc trojans",
    "washington huskies",
    "wisconsin badgers",
    // CUSA (10)
    "delaware blue hens",
    "fiu panthers",
    "jacksonville state gamecocks",
    "kennesaw state owls",
    "liberty flames",
    "middle tennessee blue raiders",
    "missouri state bears",
    "new mexico state aggies",
    "sam houston bearkats",
    "western kentucky hilltoppers",
    // MAC (13)
    "akron zips",
    "ball state cardinals",
    "bowling green falcons",
    "buffalo bulls",
    "central michigan chippewas",
    "eastern michigan eagles",
    "kent state golden flashes",
    "miami redhawks",
    "ohio bobcats",
    "sacramento state hornets",
    "toledo rockets",
    "umass minutemen",
    "western michigan broncos",
    // Mountain West (10)
    "air force falcons",
    "hawaii rainbow warriors",
    "nevada wolf pack",
    "new mexico lobos",
    "unlv rebels",
    "san jose state spartans",
    "wyoming cowboys",
    "northern illinois huskies",
    "utep miners",
    "north dakota state bison",
    // Pac-12 (8)
    "boise state broncos",
    "colorado state rams",
    "fresno state bulldogs",
    "oregon state beavers",
    "san diego state aztecs",
    "texas state bobcats",
    "utah state aggies",
    "washington state cougars",
    // SEC (16)
    "alabama crimson tide",
    "arkansas razorbacks",
    "auburn tigers",
    "florida gators",
    "georgia bulldogs",
    "kentucky wildcats",
    "lsu tigers",
    "mississippi state bulldogs",
    "missouri tigers",
    "oklahoma sooners",
    "ole miss rebels",
    "south carolina gamecocks",
    "tennessee volunteers",
    "texas longhorns",
    "texas a&m aggies",
    "vanderbilt commodores",
    // Sun Belt (14)
    "app state mountaineers",
    "arkansas state red wolves",
    "coastal carolina chanticleers",
    "georgia southern eagles",
    "georgia state panthers",
    "james madison dukes",
    "louisiana ragin cajuns",
    "louisiana monroe warhawks",
    "louisiana tech bulldogs",
    "marshall thundering herd",
    "old dominion monarchs",
    "south alabama jaguars",
    "southern miss golden eagles",
    "troy trojans",
    // Independents (2)
    "notre dame fighting irish",
    "uconn huskies",
    // Aliases for ESPN/common name variants
    "appalachian state mountaineers",
    "delaware fightin blue hens",
    "florida international panthers",
    "central florida knights",
    "southern california trojans",
    "north carolina state wolfpack",
    "alabama birmingham blazers",
    "texas san antonio roadrunners",
  ];
  function normName(s) {
    return String(s || '').toLowerCase()
      .replace(/['.]/g, '')
      .replace(/[^a-z0-9 ]/g, ' ')
      .replace(/\s+/g, ' ').trim();
  }
  function isFBS(tm) {
    return FBS_TEAMS.indexOf(normName(tm.displayName)) > -1 ||
      FBS_TEAMS.indexOf(normName(tm.shortDisplayName || '')) > -1;
  }

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  var sport = 'football', teams = [], ballot = [], apTeams = [], apMap = {}, publishedRows = [];
  var $ = function (id) { return document.getElementById(id); };

  function logo(t) {
    var h = (t.logos && t.logos[0] && t.logos[0].href) || '';
    return h.indexOf('https://a.espncdn.com/') === 0 ? h : '';
  }
  function initials(t) { return (t.abbreviation || t.displayName || '?').slice(0, 3); }

  function blurb(t) {
    var rec = t.record || 'record not published yet';
    var conf = t.conference ? ' (' + t.conference + ')' : '';
    var streak = t.streak ? ' ' + t.streak + '.' : '';
    return t.displayName + conf + ' sit at ' + rec + '.' + streak +
      ' Recent form and the next few games are in the team detail below, voters, weigh the last three weeks, not just the name on the jersey.';
  }

  function renderTeams() {
    var q = ($('teamSearch').value || '').toLowerCase();
    var list = teams.filter(function (t) {
      return !q || (t.displayName || '').toLowerCase().indexOf(q) > -1 ||
        (t.abbreviation || '').toLowerCase().indexOf(q) > -1;
    });
    $('teamMeta').textContent = list.length + ' teams loaded for ' + SPORTS[sport].label.toLowerCase() + '. Tap one to add it to your ballot or open its detail.';
    $('teamGrid').innerHTML = list.slice(0, 200).map(function (t) {
      var img = logo(t) ? '<img src="' + logo(t) + '" alt="" loading="lazy">' : '<div>' + initials(t) + '</div>';
      return '<div class="team-card" data-id="' + t.id + '" title="Add to ballot / view detail">' + img +
        '<b>' + t.displayName + '</b><span>' + (t.abbreviation || '') + '</span></div>';
    }).join('');
    document.querySelectorAll('.team-card').forEach(function (el) {
      el.addEventListener('click', function () { addToBallot(el.getAttribute('data-id')); showDetail(el.getAttribute('data-id')); });
    });
  }

  function renderBallot() {
    $('ballotCount').textContent = ballot.length + ' / 25 picked. A ballot needs all 25 to count.';
    $('ballotList').innerHTML = ballot.map(function (id, i) {
      var t = teams.find(function (x) { return String(x.id) === String(id); }) || { displayName: 'Team ' + id };
      return '<li><span>' + (i + 1) + '. ' + t.displayName + ' <small>(' + (25 - i) + ' pts)</small></span>' +
        '<span><button data-act="up" data-i="' + i + '">↑</button> <button data-act="down" data-i="' + i + '">↓</button> <button data-act="rm" data-i="' + i + '">×</button></span></li>';
    }).join('') || '<li>No teams picked yet.</li>';
    document.querySelectorAll('#ballotList button').forEach(function (b) {
      b.addEventListener('click', function () {
        var i = +b.getAttribute('data-i'), act = b.getAttribute('data-act');
        if (act === 'rm') ballot.splice(i, 1);
        if (act === 'up' && i > 0) { var tmp = ballot[i - 1]; ballot[i - 1] = ballot[i]; ballot[i] = tmp; }
        if (act === 'down' && i < ballot.length - 1) { var t2 = ballot[i + 1]; ballot[i + 1] = ballot[i]; ballot[i] = t2; }
        renderBallot();
      });
    });
  }
  function addToBallot(id) {
    if (ballot.indexOf(id) > -1) { $('ballotMsg').textContent = 'Already on your ballot.'; return; }
    if (ballot.length >= 25) { $('ballotMsg').textContent = 'Ballot is full, remove a team first.'; return; }
    ballot.push(id); $('ballotMsg').textContent = ''; renderBallot();
    $('vote').scrollIntoView({ behavior: 'smooth' });
  }

  function renderRankings(preview) {
    var rows = preview.slice(0, 25);
    $('rankMeta').textContent = rows.length
      ? 'Preview Top 25, based on current standings, not fan votes yet. The first official Open Ballot drops the Sunday after ballots close.'
      : 'No rankings yet, the first Open Ballot is built from the first Sunday ballot.';
    $('rankList').innerHTML = rows.map(function (t, i) {
      var img = logo(t) ? '<img src="' + logo(t) + '" alt="" loading="lazy">' : '';
      return '<div class="rank-row"><span class="pos">' + (i + 1) + '</span>' + img +
        '<div><b>' + esc(t.displayName) + '</b><div class="move">' + esc(t.record || '') + '</div></div>' +
        '<span class="points">' + (t.points || '') + '</span><p class="blurb">' + esc(blurb(t)) + '</p></div>';
    }).join('');
  }

  function renderAP() {
    if (!apTeams.length) { $('apMeta').textContent = 'AP poll did not load. Try refreshing.'; $('apList').innerHTML = ''; return; }
    $('apMeta').textContent = 'AP Top 25, live from ESPN. This is the sportswriters poll, not the fan vote.';
    $('apList').innerHTML = apTeams.map(function (row) {
      var full = teams.find(function (x) { return x.displayName === row.name; }) || { displayName: row.name, logos: row.logos || [] };
      var img = logo(full) ? '<img src="' + logo(full) + '" alt="" loading="lazy">' : '';
      var pub = publishedRows.find(function (r) { return r.team_name === row.name; });
      var cmp = pub ? 'Open Ballot #' + pub.rank : 'Not in Open Ballot Top 25';
      return '<div class="ap-row"><span class="pos">' + row.rank + '</span>' + img +
        '<div><b>' + esc(row.name) + '</b><div class="move">' + esc(cmp) + '</div></div>' +
        '<span class="points">' + row.points + ' pts</span></div>';
    }).join('');
  }

  function loadAP() {
    $('apMeta').textContent = 'Loading the AP poll.';
    return fetch('https://site.api.espn.com/apis/site/v2/sports/' + SPORTS[sport].api + '/rankings')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var polls = data.rankings || data.polls || [];
        var ap = null;
        polls.forEach(function (poll) {
          var label = (poll.type || '') + ' ' + (poll.name || '') + ' ' + (poll.shortName || '');
          if (!ap && /\bap\b/i.test(label) && !/coach|cfp|playoff/i.test(label)) ap = poll;
        });
        if (!ap && polls.length) ap = polls[0];
        var ranks = (ap && (ap.ranks || ap.teams || [])) || [];
        apTeams = ranks.slice(0, 25).map(function (e, i) {
          var tm = e.team || {};
          return {
            rank: e.current || e.rank || e.position || (i + 1),
            name: tm.displayName || tm.name || e.displayName || e.name || '',
            logos: tm.logos || e.logos || [],
            points: e.points || 0
          };
        }).filter(function (r) { return r.name; });
        apMap = {};
        apTeams.forEach(function (r) { apMap[r.name] = r.rank; });
        renderAP();
        return true;
      })
      .catch(function () { $('apMeta').textContent = 'AP poll did not load. Try refreshing.'; return false; });
  }

  function loadPublished() {
    return fetch(SUPABASE_URL + '/rest/v1/poll_weeks?select=id,week_label&sport=eq.' + sport + '&status=eq.published&order=ballot_closes.desc&limit=1', {
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY }
    }).then(function (r) { return r.json(); }).then(function (weeks) {
      if (!weeks || !weeks.length) return false;
      return fetch(SUPABASE_URL + '/rest/v1/poll_results?select=rank,team_name,points,first_place_votes,blurb&week_id=eq.' + weeks[0].id + '&order=rank.asc', {
        headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY }
      }).then(function (r) { return r.json(); }).then(function (rows) {
        if (!rows || !rows.length) return false;
        publishedRows = rows;
        var isSeed = /seed/i.test(weeks[0].week_label || '');
        $('rankMeta').textContent = isSeed
          ? 'Seed ranking, ' + weeks[0].week_label + '. These are NOT Open Ballot fan votes yet; they give the page numbers to start from until the first Sunday fan ballot closes.'
          : 'Official Open Ballot, ' + weeks[0].week_label;
        $('rankList').innerHTML = rows.map(function (row) {
          var full = teams.find(function (x) { return x.displayName === row.team_name; }) || { displayName: row.team_name, logos: [] };
          var img = logo(full) ? '<img src="' + logo(full) + '" alt="" loading="lazy">' : '';
          var b = row.blurb || blurb(full);
          var apNote = apMap[row.team_name] ? ' AP #' + apMap[row.team_name] : '';
          return '<div class="rank-row"><span class="pos">' + row.rank + '</span>' + img +
            '<div><b>' + esc(row.team_name) + '</b><div class="move">' + esc((full.record || '') + apNote) + '</div></div>' +
            '<span class="points">' + row.points + ' pts</span><p class="blurb">' + esc(b) + '</p></div>';
        }).join('');
        renderAP();
        return true;
      });
    }).catch(function () { return false; });
  }

  function filterByAllowlist() {
    // Football only: basketball uses ESPN groups=50, which verified as
    // Division I only in its first 20, and has schools with no football team.
    if (sport !== 'football') return;
    var before = teams.length;
    var filtered = teams.filter(isFBS);
    if (filtered.length >= 130) {
      teams = filtered;
      renderTeams(); renderBallot();
      $('teamMeta').textContent = teams.length + ' FBS teams loaded for ' + SPORTS[sport].label.toLowerCase() + '. Tap one to add it to your ballot or open its detail.';
    } else {
      $('teamMeta').textContent += ' Warning: FBS allowlist matched only ' + filtered.length + ' of ' + before + ' teams, so the full list is shown. Check before voting.';
    }
  }

  function loadSport() {
    $('rankMeta').textContent = 'Loading live records and form.';
    $('teamMeta').textContent = 'Loading teams.';
    publishedRows = []; apTeams = []; apMap = {};
    fetch('https://site.api.espn.com/apis/site/v2/sports/' + SPORTS[sport].api + '/teams?groups=' + SPORTS[sport].group + '&limit=500')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var raw = ((data.sports || [])[0] || {}).leagues || [];
        var list = [];
        raw.forEach(function (lg) { (lg.teams || []).forEach(function (w) { if (w.team) list.push(w.team); }); });
        teams = list.map(function (tm) {
          var rec = '';
          try { rec = (tm.record && tm.record.items && tm.record.items[0] && tm.record.items[0].summary) || ''; } catch (e) {}
          return { id: tm.id, displayName: tm.displayName, abbreviation: tm.abbreviation, logos: tm.logos, color: tm.color, record: rec };
        }).sort(function (a, b) { return a.displayName.localeCompare(b.displayName); });
        renderTeams(); renderBallot();
        // Each of these runs independently: one failing must not blank the others.
        loadAP();
        filterByAllowlist();
        return loadPublished();
      })
      .then(function (shown) {
        if (!shown) renderRankings([]);
      })
      .catch(function () {
        $('rankMeta').textContent = 'Live data did not load (ESPN endpoint blocked or offline). Try refreshing.';
        $('teamMeta').textContent = 'Could not load teams right now.';
        renderRankings([]);
      });
  }

  function showDetail(id) {
    var t = teams.find(function (x) { return String(x.id) === String(id); });
    if (!t) return;
    var box = $('teamDetail'); $('teamDetailTitle').hidden = false; box.hidden = false;
    box.innerHTML = '<h3>' + esc(t.displayName) + '</h3><p>' + esc(blurb(t)) + '</p><p class="small">Loading schedule…</p>';
    box.scrollIntoView({ behavior: 'smooth' });
    fetch('https://site.api.espn.com/apis/site/v2/sports/' + SPORTS[sport].api + '/teams/' + id + '/schedule')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        var evs = (data.events || []).map(function (ev) {
          var comp = (ev.competitions || [])[0] || {};
          var opp = (comp.competitors || []).find(function (c) { return String(c.team.id) !== String(id); });
          var me = (comp.competitors || []).find(function (c) { return String(c.team.id) === String(id); });
          var score = (me && me.score && opp && opp.score) ? me.score.displayValue + '–' + opp.score.displayValue : 'TBD';
          var won = me && opp && me.score && opp.score ? (+me.score.value > +opp.score.value ? 'W' : 'L') : '';
          return { date: ev.date ? ev.date.slice(0, 10) : '', opp: opp ? opp.team.displayName : 'TBD', score: score, won: won, done: !!(me && me.score) };
        });
        var last = evs.filter(function (e) { return e.done; }).slice(-3).reverse();
        var next = evs.filter(function (e) { return !e.done; }).slice(0, 3);
        var fmt = function (e) { return '<li>' + esc(e.date) + ' vs ' + esc(e.opp) + ' ' + (e.done ? '(' + e.won + ' ' + e.score + ')' : '(upcoming)') + '</li>'; };
        box.innerHTML = '<h3>' + esc(t.displayName) + '</h3><p>' + esc(blurb(t)) + '</p>' +
          '<h4>Recent form</h4><ul>' + (last.map(fmt).join('') || '<li>No recent results published yet.</li>') + '</ul>' +
          '<h4>Up next</h4><ul>' + (next.map(fmt).join('') || '<li>Schedule not published yet.</li>') + '</ul>';
      })
      .catch(function () { box.innerHTML += '<p class="small">Schedule did not load, try again.</p>'; });
  }

  document.querySelectorAll('.tab').forEach(function (b) {
    b.addEventListener('click', function () {
      document.querySelectorAll('.tab').forEach(function (x) { x.classList.remove('active'); });
      b.classList.add('active'); sport = b.getAttribute('data-sport'); ballot = []; loadSport();
    });
  });
  $('teamSearch').addEventListener('input', renderTeams);
  function session() {
    try { return JSON.parse(sessionStorage.getItem('openballot-session') || 'null'); } catch (e) { return null; }
  }
  function supa(path, body, token) {
    return fetch(SUPABASE_URL + path, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': 'Bearer ' + (token || SUPABASE_KEY),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(function (r) { return r.json().then(function (j) { return { ok: r.ok, status: r.status, json: j }; }); });
  }
  $('submitBallot').addEventListener('click', function () {
    if (ballot.length !== 25) { $('ballotMsg').textContent = 'Pick all 25 first, ' + ballot.length + ' so far.'; return; }
    var s = session();
    if (!s || !s.access_token) { $('ballotMsg').textContent = 'Sign in first (below), then submit, ballots are tied to your account so one person gets one vote.'; return; }
    $('ballotMsg').textContent = 'Checking for this week\'s open ballot…';
    fetch(SUPABASE_URL + '/rest/v1/poll_weeks?select=id&sport=eq.' + sport + '&status=eq.open', {
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY }
    }).then(function (r) { return r.json(); }).then(function (weeks) {
      if (!weeks || !weeks.length) { $('ballotMsg').textContent = 'No open ballot week yet, the admin creates each Sunday\'s week in Supabase before voting opens.'; return; }
      var names = ballot.map(function (id) {
        var tm = teams.find(function (x) { return String(x.id) === String(id); });
        return tm ? tm.displayName : String(id);
      });
      return fetch(SUPABASE_URL + '/rest/v1/ballots', {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': 'Bearer ' + s.access_token,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({ week_id: weeks[0].id, sport: sport, user_id: s.user.id, ranking: names })
      }).then(function (r) {
        if (r.ok) { $('ballotMsg').textContent = 'Ballot submitted, counted once the week closes Sunday 4pm PT.'; ballot = []; renderBallot(); }
        else return r.json().then(function (j) { $('ballotMsg').textContent = 'Could not submit: ' + (j.message || 'the week may be closed, or you already voted this week.'); });
      });
    }).catch(function () { $('ballotMsg').textContent = 'Could not reach the ballot service, try again.'; });
  });
  $('signupForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var email = $('signupEmail').value, pw = $('signupPassword').value;
    $('signupMsg').textContent = 'Creating your account…';
    supa('/auth/v1/signup', { email: email, password: pw }).then(function (res) {
      if (!res.ok) { $('signupMsg').textContent = 'Signup failed: ' + (res.json.msg || res.json.message || 'try again.'); return; }
      $('signupMsg').textContent = 'Account created. Confirm your email (check your inbox), then use Sign in to vote, email confirmation is required before voting.';
    }).catch(function () { $('signupMsg').textContent = 'Could not reach the signup service, try again.'; });
  });
  $('signinBtn').addEventListener('click', function () {
    var email = $('signupEmail').value, pw = $('signupPassword').value;
    if (!email || !pw) { $('signupMsg').textContent = 'Enter your email and password first.'; return; }
    $('signupMsg').textContent = 'Signing in…';
    supa('/auth/v1/token?grant_type=password', { email: email, password: pw }).then(function (res) {
      if (!res.ok || !res.json.access_token) { $('signupMsg').textContent = 'Sign-in failed: ' + (res.json.msg || res.json.error_description || 'check your email/password and that you confirmed your email.'); return; }
      try { sessionStorage.setItem('openballot-session', JSON.stringify(res.json)); } catch (err) {}
      var fav = $('favTeam').value || null;
      fetch(SUPABASE_URL + '/rest/v1/profiles', {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': 'Bearer ' + res.json.access_token,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=merge-duplicates,return=minimal'
        },
        body: JSON.stringify({ id: res.json.user.id, email: email, favorite_team: fav, notify_email: $('notifyEmail').checked })
      }).catch(function () {});
      $('signupMsg').textContent = 'Signed in, you can now submit your ballot.';
    }).catch(function () { $('signupMsg').textContent = 'Could not reach the sign-in service, try again.'; });
  });
  renderBallot(); loadSport();
})();
