#!/usr/bin/env python3
"""Fetch ESPN data server-side and write same-origin JSON for the sports site.

Why this exists: a browser on austinzehnder.com cannot reliably fetch
site.api.espn.com directly (ESPN's unofficial API 403s browser user agents
and does not send CORS headers for cross-origin page fetches, so the live
page showed 0 teams even though direct API navigation works). GitHub Actions
runs this with a plain curl-style user agent, writes sports/data/*.json into
the repo, and GitHub Pages serves those files same-origin. No secrets.

Outputs:
  sports/data/football.json    {teams: [...], ap: [...]}
  sports/data/basketball.json  {teams: [...], ap: [...]}
Football teams are filtered to the 2026 FBS allowlist parsed from app.js
(the same list the page uses). Basketball teams come from the groups=50
Division I feed. AP lists come from the rankings feed (poll type "ap").
On any fetch failure, old data files are left untouched and the script
exits 0 so a transient ESPN outage does not blank the site.
"""
import json
import re
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
UA = "curl/8.5.0"


def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read().decode("utf-8"))


def norm(s):
    s = (s or "").lower().replace("'", "").replace(".", "")
    s = re.sub(r"[^a-z0-9 ]", " ", s)
    return re.sub(r"\s+", " ", s).strip()


def fbs_keys():
    text = (ROOT / "app.js").read_text()
    m = re.search(r"var FBS_TEAMS = \[(.*?)\];", text, re.S)
    return set(re.findall(r'"([^"]+)"', m.group(1))) if m else set()


def parse_teams(data):
    out = []
    leagues = ((data.get("sports") or [{}])[0].get("leagues") or [])
    for lg in leagues:
        for w in lg.get("teams") or []:
            tm = w.get("team") or {}
            rec = ""
            try:
                rec = (tm.get("record") or {}).get("items", [{}])[0].get("summary", "")
            except Exception:
                rec = ""
            out.append({
                "id": tm.get("id"),
                "displayName": tm.get("displayName"),
                "abbreviation": tm.get("abbreviation"),
                "logos": tm.get("logos") or [],
                "color": tm.get("color"),
                "record": rec,
            })
    out.sort(key=lambda x: x.get("displayName") or "")
    return out


def parse_ap(data):
    polls = data.get("rankings") or data.get("polls") or []
    ap = None
    for poll in polls:
        label = " ".join([poll.get("type", ""), poll.get("name", ""), poll.get("shortName", "")])
        if re.search(r"\bap\b", label, re.I) and not re.search(r"coach|cfp|playoff", label, re.I):
            ap = poll
            break
    if ap is None and polls:
        ap = polls[0]
    ranks = (ap or {}).get("ranks") or (ap or {}).get("teams") or []
    out = []
    for i, e in enumerate(ranks[:25]):
        tm = e.get("team") or {}
        name = tm.get("displayName") or tm.get("name") or e.get("displayName") or e.get("name")
        if not name:
            continue
        out.append({
            "rank": e.get("current") or e.get("rank") or e.get("position") or (i + 1),
            "name": name,
            "logos": tm.get("logos") or e.get("logos") or [],
            "points": e.get("points") or 0,
        })
    return out


def build(sport, teams_url, rankings_url, fbs_only):
    teams = parse_teams(get(teams_url))
    if fbs_only:
        keys = fbs_keys()
        teams = [t for t in teams if norm(t.get("displayName")) in keys or norm(t.get("shortDisplayName")) in keys]
    ap = parse_ap(get(rankings_url))
    return {"teams": teams, "ap": ap}


def main():
    data_dir = ROOT / "data"
    data_dir.mkdir(exist_ok=True)
    jobs = [
        ("football", "https://site.api.espn.com/apis/site/v2/sports/football/college-football/teams?limit=500",
         "https://site.api.espn.com/apis/site/v2/sports/football/college-football/rankings", True),
        ("basketball", "https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/teams?groups=50&limit=500",
         "https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/rankings", False),
    ]
    for sport, teams_url, rankings_url, fbs_only in jobs:
        try:
            payload = build(sport, teams_url, rankings_url, fbs_only)
        except Exception as exc:
            print(f"{sport}: fetch failed, keeping old data: {exc}", file=sys.stderr)
            continue
        if not payload["teams"]:
            print(f"{sport}: no teams fetched, keeping old data", file=sys.stderr)
            continue
        (data_dir / f"{sport}.json").write_text(json.dumps(payload))
        print(f"{sport}: {len(payload['teams'])} teams, {len(payload['ap'])} AP rows")


if __name__ == "__main__":
    main()
