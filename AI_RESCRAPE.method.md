# AI_RESCRAPE.method.md — *how* Claude actually gathers the data

This answers one question: **when `AI_RESCRAPE.md` says "re-scrape", what is the
actual method?** Short version:

> **Claude re-researches every ISP live and visually.** It opens each provider's
> real plan page in a browser, *reads the rendered offering with vision* (the same
> way a person would — looking at the price tiles, promo lines, modem options),
> interprets it, and cross-checks it. The Python scripts in `scrape/` do **not**
> gather any data — they only assemble, validate, and diff what Claude compiled.

This is deliberately **not** a purely programmatic / regex/DOM scraper. A code
scraper reads markup and breaks *silently* when a site changes layout or words a
promo unusually — which is exactly how the Leaptel "$115 read as $105" error
happened. Claude looking at the actual rendered page is the QA layer that catches
those mismatches.

---

## The method, per ISP

For **every** provider (existing ones get re-done from scratch; plus a hunt for new
ones — see `AI_RESCRAPE.md` §2):

1. **Open the live page in a real browser.** Chromium + Playwright are
   pre-installed in this environment (`PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`).
   Navigate to the ISP's NBN/FTTP plans page and **take a screenshot** (and/or read
   the rendered text). Use `WebFetch`/`WebSearch` to find the page and to discover
   providers/tiers not seen before.
2. **Read each plan tile visually** — as a human would from the screenshot:
   - download / upload speed (e.g. 500/200) and the "typical evening speed",
   - the **big monthly price**,
   - the **promo line** ("$115/mo, $10 off for 12 months, then $125 ongoing"),
   - unlimited data, contract/lock-in wording,
   - the **modem/router**: included vs BYO vs buy, the **model**, **Wi-Fi
     generation**, and **price** (e.g. "eero Pro 7 — $250 upfront").
3. **Interpret the promo correctly** (the rule that the old scrape got wrong):
   the price shown on the tile **is already the promo price**. Do **not** subtract
   the advertised "$N discount" again. `savings = (ongoing − promo) × promo_months`.
   This judgement call is precisely why a visual read by Claude matters.
4. **Cross-check** every figure against a second independent source — a comparison
   site (WhistleOut / Finder / Canstar), and where possible the plan's **Critical
   Information Summary** or the **nbn Key Facts Sheet**. If a checkout/summary page
   is reachable, read it too (that's where the real $115/$125 split was confirmed).
5. **Record structured data** into `data.json` (`plans[]` + `providers[]`), writing
   the free-text `price` in the supported format, plus `sourceUrl` and any caveats.
6. **Visually reconcile.** Put the recorded numbers next to the screenshot of the
   real site and confirm they match. If a value can't be confirmed on the live
   site, flag it in `meta.knownInaccuracies` rather than guessing.

## Where the `scrape/` scripts fit (downstream only)

- `validate_data.py` — recomputes savings/12-month/avg with the **same** parser the
  page uses and flags anything suspicious (e.g. savings > 33% of the ongoing year →
  "go look at that ISP's page again"). It is a safety net, **not** a data source.
- `validate_data.py --diff OLD NEW` — compares the fresh compile against the backup
  so a broken run (providers vanished, prices swung wildly) gets quarantined in
  `broken_scrapes/` before publishing.
- `build_data.py` — stamps `meta` and runs a tiny regression guard for already-known
  errors. It assembles; it does not research.
- `extract_from_html.py` — repair tool only (reconstruct JSON from a good `index.html`).

## Why visual oversight is required (the Leaptel example)

A DOM scraper saw Leaptel's tile as "price $115" + "$10 discount" and a rule did
`115 − 10 = 105`, recording **$105 / savings $240**. Looking at the actual tile,
the headline is **"$115.00 / month"** with "$10 discount for 12 months, then
$125.00 ongoing" and a **"Save $120"** badge. A visual read gets **$115 / savings
$120** immediately. The checkout summary (`$115.00/month`, eero Pro 7 `$250
upfront`) confirms it. That reconciliation step is the whole point of having Claude
do the scrape rather than a script.

---

See **[`AI_RESCRAPE.md`](AI_RESCRAPE.md)** for the full step-by-step workflow
(backup → fresh visual compile → new-ISP hunt → validate → diff/quarantine →
update editorial sections → verify → log).
