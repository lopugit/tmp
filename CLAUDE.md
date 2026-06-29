# CLAUDE.md — working agreement for this repo

Project: a standalone **NBN FTTP ISP market-scan / plan-finder** page.
`index.html` fetches **`data.json`** (the source-of-truth ISP data) and renders the
comparison table + provider cards from it, computing all money figures
(monthly promo/ongoing/avg, 12-month total, savings) at runtime from each plan's
`price` text.

## Standing conventions (do these automatically — don't wait to be asked)

### 1. Log every user request into `chats/`
For **each** message where the user asks for a fix / feature / investigation,
append a verbatim log file under `chats/` **without being asked each time**:

- Filename: `chats/NN-<brief-summary>-YYYY-MM-DD.md` where `NN` is the next
  zero-padded sequence number (keeps chronological sort), `<brief-summary>` is a
  short hyphenated slug, and the date is the timestamp on the end.
- Contents: a heading, the date + sequence, and the user's **verbatim** request.
- Update the table in `chats/README.md`.
- Commit the log alongside the work for that request (or on its own if the request
  is just conversational), and push.

This is a logged-by-default repo: the chat that builds it is part of its history.

### 2. AI-led analysis over scripts
Where judgment is needed — validating scraped data, **broken-scrape detection**,
deciding whether a price/offering is right — **Claude reads the data (and the live
ISP pages) into context and analyses it directly.** Python scripts (`scrape/*.py`)
only *assemble, compute, and surface candidates*; they never make the call. See
**`AI_RESCRAPE.method.md`** and **`AI_RESCRAPE.md`**. When comparing an old vs new
scrape, load both into context and reason over the actual rows — don't rely on a
diff script's verdict.

## Quick orientation
- **Edit data, not markup:** plan/provider data lives in `data.json`; `index.html`
  renders it. Fixing a `price` string auto-fixes every derived figure.
- **Serve over http(s):** the page `fetch()`es `data.json`, so it needs GitHub Pages
  or a local server — `file://` and the htmlpreview proxy won't load the data.
- **Re-scraping** = Claude browsing each ISP live and reading offerings *visually*
  (`AI_RESCRAPE.method.md`), then `scrape/validate_data.py` as a backstop.
- **Formatting:** run `prettier --write index.html --print-width 120
  --html-whitespace-sensitivity css` after editing the HTML.
- **Branch:** develop on `claude/internet-plan-site-updates-90nury`; commit + push
  finished work.
