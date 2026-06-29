# Graph Report - tmp  (2026-06-30)

## Corpus Check
- 40 files · ~141,213 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 125 nodes · 93 edges · 37 communities (13 shown, 24 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `bd830a2c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 32|Community 32]]

## God Nodes (most connected - your core abstractions)
1. `4. Re-scrape procedure` - 10 edges
2. `AI_RESCRAPE.md — how to re-scrape & update the NBN FTTP plan data` - 6 edges
3. `AI_RESCRAPE.method.md — *how* Claude actually gathers the data` - 5 edges
4. `Standing conventions (do these automatically — don't wait to be asked)` - 4 edges
5. `Vercel Deployments` - 4 edges
6. `Outcome` - 4 edges
7. `extract()` - 3 edges
8. `cost_from_text()` - 3 edges
9. `AI.md — shared working agreement for this repo` - 3 edges
10. `Request 21 — Live re-scrape all ISPs, update data.json` - 3 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (37 total, 24 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.20
Nodes (10): 4. Re-scrape procedure, Step 0 — Back up, Step 1 — Re-compile every ISP from the live web, visually (don't trust old values), Step 2 — Hunt for NEW providers & offerings missed last time, Step 3 — Triple-check inferred values, Step 4 — Rebuild & review, Step 5 — Compare against the backup (broken-scrape detection — **AI-led**), Step 6 — Update the hand-written editorial bits in `index.html` (+2 more)

### Community 1 - "Community 1"
Cohesion: 0.25
Nodes (7): 1. Data model (`data.json`), 2. `price` text format (must stay parseable), 3. Scripts (`scrape/`), 5. Directory map, AI_RESCRAPE.md — how to re-scrape & update the NBN FTTP plan data, Derived fields are NOT stored — they are computed in the browser, ⛔ The accuracy rule that caused the Leaptel bug (read this)

### Community 2 - "Community 2"
Cohesion: 0.29
Nodes (6): 1. Log every user request into `chats/`, 2. Always commit AND push finished changes (don't ask), 3. AI-led analysis over scripts, AI.md — shared working agreement for this repo, Quick orientation, Standing conventions (do these automatically — don't wait to be asked)

### Community 3 - "Community 3"
Cohesion: 0.29
Nodes (6): Confirmed live and updated in data.json:, Context notes:, Inaccessible (data left unchanged):, Outcome, Request 21 — Live re-scrape all ISPs, update data.json, Verbatim request

### Community 4 - "Community 4"
Cohesion: 0.33
Nodes (5): AI_RESCRAPE.method.md — *how* Claude actually gathers the data, Environment requirements (run it somewhere with real web access), The method, per ISP, Where the `scrape/` scripts fit (downstream only), Why visual oversight is required (the Leaptel example)

### Community 5 - "Community 5"
Cohesion: 0.40
Nodes (4): Custom domains, Notes, Production deployment, Vercel Deployments

### Community 6 - "Community 6"
Cohesion: 0.83
Nodes (3): attr(), extract(), strip_tags()

### Community 7 - "Community 7"
Cohesion: 0.83
Nodes (3): cost_from_text(), diff(), validate()

## Knowledge Gaps
- **52 isolated node(s):** `1. Log every user request into `chats/``, `2. Always commit AND push finished changes (don't ask)`, `3. AI-led analysis over scripts`, `Quick orientation`, `Derived fields are NOT stored — they are computed in the browser` (+47 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **24 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `4. Re-scrape procedure` connect `Community 0` to `Community 1`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Why does `AI_RESCRAPE.md — how to re-scrape & update the NBN FTTP plan data` connect `Community 1` to `Community 0`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **What connects `1. Log every user request into `chats/``, `2. Always commit AND push finished changes (don't ask)`, `3. AI-led analysis over scripts` to the rest of the system?**
  _52 weakly-connected nodes found - possible documentation gaps or missing edges._