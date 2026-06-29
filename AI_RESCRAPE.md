# AI_RESCRAPE.md — how to re-scrape & update the NBN FTTP plan data

This page (`index.html`) is **data-driven**. All ISP data lives in **`data.json`**,
which the page fetches and renders at runtime. To update prices/plans you edit
`data.json` (not the HTML). This file is the playbook for doing that safely.

> ⚠️ Because the page `fetch()`es `data.json`, it must be served over **http(s)**
> (GitHub Pages, or any web server / `python3 -m http.server`). Opening `index.html`
> as a local `file://` or via the htmlpreview proxy will NOT load the data.

> 🔍 **The data is compiled by Claude browsing the web and reading each ISP's live
> plan page *visually* — not by a code scraper, and never by patching stale values.**
> Every re-scrape, Claude opens each provider's real plans page in a browser, reads
> the rendered price tiles / promos / modem options the way a person would,
> interprets them, and cross-checks them. The `scrape/` scripts only assemble,
> validate and diff what Claude compiled. **See [`AI_RESCRAPE.method.md`](AI_RESCRAPE.method.md)
> for exactly how that visual gathering is done** — read it before starting.

---

## 1. Data model (`data.json`)

```jsonc
{
  "meta": {
    "scanDate": "YYYY-MM-DD",
    "lastUpdated": "YYYY-MM-DD",
    "knownInaccuracies": [ /* log of past mistakes + the lesson learned */ ]
  },
  "plans": [        // drives the comparison table (one row per plan/tier)
    {
      "provider": "Leaptel", "providerKey": "leaptel",
      "down": 500, "up": 200, "speed": "500/200",
      "upload": "high-upload / asymmetric",      // category used by the upload filter
      "price": "$115 x 12 mths, then $125",       // FREE TEXT — see §2
      "speedLabel": "500/200", "tes": "TES/typical: 500/170",
      "fit": "...", "uploadClass": "good", "uploadPill": "High-upload / asymmetric",
      "uploadNote": "...", "terms": "...", "business": "Yes / Pro-style",
      "sourceUrl": "https://leaptel.com.au/plans/", "sourceName": "Leaptel",
      "search": "lowercased keywords used by the search box"
    }
  ],
  "providers": [    // drives the provider cards
    { "name": "Leaptel", "miniTitle": "...", "blurb": "...",
      "tiers": [ { "tier": "500/200", "price": "$115 x 12 mo, then $125" } ],
      "verdict": "...", "search": "..." }
  ]
}
```

### Derived fields are NOT stored — they are computed in the browser
`index.html`'s `costFromText()` parses each `price` string into: promo $/mo,
ongoing $/mo, average $/mo, **estimated 12-month total**, and **savings vs
ongoing**. The router/modem cost column and Wi-Fi tags come from the per-provider
`ROUTER_DATA` map in `index.html`.

**Therefore: fix the `price` text and every derived number fixes itself.** Never
hand-edit a savings/12-month figure.

---

## 2. `price` text format (must stay parseable)

`costFromText()` understands these shapes (keep to them):

| Shape | Meaning | Example |
|---|---|---|
| `$X x N mths, then $Y` | promo $X for N months, then ongoing $Y | `$115 x 12 mths, then $125` |
| `$X ongoing` | flat ongoing price | `$80 ongoing` |
| `about $X/mo` / `≈ $X/mo` | flat monthly (e.g. daily-billed) | `about $105/mo` |
| bare `$X` | treated as ongoing | `$130` |

Savings = `(ongoing − promo) × promo_months`. 12-month total =
`promo×min(N,12) + ongoing×(12−N)`.

### ⛔ The accuracy rule that caused the Leaptel bug (read this)
When an ISP page shows **"$PRICE / month"** alongside a separate line like
**"$10 discount for 12 months, then $125 ongoing"**, the **$PRICE shown is already
the discounted promo price.** Do **not** subtract the advertised discount again.

- Leaptel Fast+ 500/200 shows **$115/mo** ("$10 off the $125 ongoing").
  Correct: `$115 x 12 mths, then $125` → savings **$120**.
- The earlier scrape wrote `$105` (115 − 10 again) → savings shown as **$240**. Wrong.

Re-verify **every** plan whose price came from a "$N off / discount" style promo.
`scrape/validate_data.py` flags any plan whose savings exceed 33% of the ongoing
year as a "double-check this" candidate.

---

## 3. Scripts (`scrape/`)

| Script | Purpose |
|---|---|
| `scrape/extract_from_html.py` | Reconstruct `_extracted.json` from a known-good `index.html` (repair/bootstrap only). |
| `scrape/build_data.py` | Assemble `data.json` from `_extracted.json` + manual `CORRECTIONS` + `META`. |
| `scrape/validate_data.py` | Recompute & sanity-check `data.json` (mirrors the browser parser); also `--diff OLD NEW`. |

```bash
python3 scrape/build_data.py                                  # rebuild data.json
python3 scrape/validate_data.py                               # sanity check
python3 scrape/validate_data.py --diff previous_scrapes/data.OLD.json data.json
```

---

## 4. Re-scrape procedure

### Step 0 — Back up
Copy the live data to a dated backup **before** changing anything:
```bash
cp data.json "previous_scrapes/data.$(date +%F).json"
```

### Step 1 — Re-compile every ISP from the live web, visually (don't trust old values)
**This is Claude's job, done by browsing — see [`AI_RESCRAPE.method.md`](AI_RESCRAPE.method.md).**
For **every** provider already in `data.json`, throw away the old numbers and
rebuild them from scratch: open the ISP's real plans page in a browser, **read the
rendered price tiles, promo lines and modem options visually** (screenshot them),
interpret them, and rewrite each `price`, speed, terms, router info and `sourceUrl`.
Prefer the ISP's own page; cross-check against a comparison site and the CIS / nbn
Key Facts Sheet where available, and reconcile the recorded numbers against the
screenshot. Apply the §2 accuracy rule to every promo. Do **not** "update" by
find/replacing the previous data — re-derive it from the live site.

### Step 2 — Hunt for NEW providers & offerings missed last time
Actively look for ISPs and NBN FTTP tiers not already present. Good sources:
- nbn provider directory: <https://www.nbnco.com.au/residential/service-providers>
- WhistleOut, Finder, Canstar, CHOICE NBN comparisons
- Whirlpool high-speed NBN wiki
Add any new providers to `providers[]` and their plans to `plans[]`. Also check for
**new tiers** on existing ISPs (e.g. a newly added 500/100 or 2000-class plan).

### Step 3 — Triple-check inferred values
For each price you infer, confirm against **at least two** independent sources and
note them in `sourceUrl` / the plan's `search` text. If a figure is uncertain,
prefer the ISP's published number and flag the uncertainty in `meta.knownInaccuracies`.

### Step 4 — Rebuild & review
Run `scrape/build_data.py` (or edit `data.json` directly). Then **Claude reviews
the data by reading it** — spot-check prices against the screenshots from Step 1
and reason about anything that looks off. `scrape/validate_data.py` is a backstop
that mechanically flags candidates (promo > ongoing, missing sources, savings
improbably large) for Claude to look at — clearing a WARN means Claude has read
that plan and confirmed it, not silenced the script. Derived figures (savings,
12-month, avg) are recomputed automatically — never edit them by hand.

### Step 5 — Compare against the backup (broken-scrape detection — **AI-led**)
**Claude does this analysis by reading the data, not by trusting a script.** Load
both the backup and the new `data.json` **into context** and actually read them —
compare provider-by-provider and plan-by-plan, reason about whether each change is
a real market move or a scrape artefact (a price that jumped because a promo line
was misread, a provider that vanished because a page failed to load, speeds that
flipped, savings that ballooned). The script below is only a **fast pre-pass** that
points you at candidates to read closely — it is not the decision-maker:

```bash
# OPTIONAL aid: surfaces removed providers/plans and >25% price swings to inspect.
python3 scrape/validate_data.py --diff previous_scrapes/data.<BACKUP>.json data.json
```

Then **Claude judges** by reading the actual rows (and, when in doubt, re-opening
the live ISP page from Step 1 to see which version is right):

- If Claude concludes the scrape **broke**, do NOT publish. Move the bad file to
  `broken_scrapes/<date>/data.json` and write `broken_scrapes/<date>/NOTES.md` — a
  Claude-written analysis of what changed, which providers/plans, the likely cause,
  and how it was confirmed against the live sites. Then restore the backup and
  re-scrape the affected providers carefully.
- If Claude concludes the changes are **real**, continue.

### Step 6 — Update the hand-written editorial bits in `index.html`
A few summary sections are still authored by hand (they are prose, not data):
the **Recommended shortlist**, the **All-speed tier guide** example prices, the
**Decision guide**, and the **Sources** list. If any price you changed appears
there, update it to match `data.json` (e.g. the Leaptel 500/200 fix touched the
shortlist, tier guide and decision guide).

### Step 7 — Verify in a browser
Serve over http and confirm: the table fills (190+ rows), no console errors, the
result count is correct, and the corrected plan shows the right savings.
```bash
python3 -m http.server 8000   # then open http://localhost:8000/
```

### Step 8 — Record the change
Append a dated entry to `meta.knownInaccuracies` for any bug you fixed (what was
wrong, what's correct now, root cause, the lesson) and bump `meta.lastUpdated`.

---

## 5. Directory map
```
index.html              # the page (renders from data.json)
data.json               # SOURCE OF TRUTH for ISP plan data
AI_RESCRAPE.md          # this file
scrape/                 # extract / build / validate scripts
previous_scrapes/       # dated backups of data.json (taken before each re-scrape)
broken_scrapes/         # quarantined bad scrapes + NOTES.md analyses
```
