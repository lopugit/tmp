# scrape/

Scripts that build and check `../data.json` (the source-of-truth ISP data the
page renders). Full workflow: **[`../AI_RESCRAPE.md`](../AI_RESCRAPE.md)**.

> These scripts only **assemble / validate / diff**. The ISP offerings are
> compiled by Claude browsing each provider's live page and reading it *visually* —
> see **[`../AI_RESCRAPE.method.md`](../AI_RESCRAPE.method.md)**. The scripts are not
> a data source.

| File | What it does |
|---|---|
| `extract_from_html.py` | Reconstruct `_extracted.json` from a known-good `index.html` (repair/bootstrap only — normally unnecessary). |
| `build_data.py` | Assemble `../data.json` from `_extracted.json` + manual `CORRECTIONS` + `META`. |
| `validate_data.py` | Recompute & sanity-check `../data.json` (same cost parser as `index.html`); `--diff OLD NEW` compares two scrapes to catch breakage. |
| `_extracted.json` | Intermediate plans+providers data (input to `build_data.py`). |

```bash
# from the repo root
python3 scrape/build_data.py
python3 scrape/validate_data.py
python3 scrape/validate_data.py --diff previous_scrapes/data.2026-06-29.json data.json
```

Derived figures (monthly promo/ongoing/avg, 12-month total, savings) are **never**
stored — `index.html` computes them at runtime from each plan's `price` text. Fix
the price, and every figure fixes itself.
