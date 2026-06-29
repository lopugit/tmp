#!/usr/bin/env python3
"""
build_data.py — ASSEMBLE ../data.json. It does NOT gather data.

>> The ISP offerings themselves are compiled by Claude browsing each provider's
>> live plan page and reading it visually — see AI_RESCRAPE.method.md. This script
>> is only the downstream assembler: it stamps META and runs a tiny regression
>> guard for already-known past errors. It must never be treated as "the way to
>> update the data" by find/replacing stale values.

Pipeline:
  1. load scrape/_extracted.json  (plans + providers that Claude compiled/refreshed)
  2. apply CORRECTIONS            (regression guard ONLY — re-asserts past fixes so a
                                   future careless re-extract can't silently reintroduce
                                   a known bug; NOT the mechanism for new data)
  3. attach META                  (scan date + knownInaccuracies log)
  4. write ../data.json

IMPORTANT: derived figures (monthly promo/ongoing/avg, 12-month total, savings)
are NOT stored. index.html computes them at runtime from each plan's free-text
`price` via costFromText(). Run scrape/validate_data.py afterwards to recompute +
sanity-check them.

Run from the repo root:  python3 scrape/build_data.py
"""
import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EXTRACTED = os.path.join(ROOT, 'scrape', '_extracted.json')
OUT = os.path.join(ROOT, 'data.json')

# --- regression guard: re-assert previously-confirmed fixes ---
# NOT how new data is entered (Claude re-derives prices from the live site each
# re-scrape). These entries only stop a known, hand-verified correction from being
# silently undone if the raw data is ever re-extracted from an old source.
CORRECTIONS = [
    {'providerKey': 'leaptel', 'speed': '500/200', 'find': '$105', 'replace': '$115',
     'reason': 'Advertised "$115/mo, $10 discount for 12 months, then $125". Earlier scrape '
               'wrongly subtracted the $10 again to get $105. The shown monthly IS the promo.'},
]

META = {
    "scanDate": "2026-06-29",
    "lastUpdated": "2026-06-29",
    "description": "Source-of-truth data for the NBN FTTP ISP market scan page (index.html). "
                   "`plans` drives the comparison table; `providers` drives the provider cards. "
                   "Monthly / 12-month / savings figures are NOT stored - index.html computes them "
                   "at runtime from each plan's `price` text, so fixing a price here fixes every "
                   "derived figure.",
    "priceTextFormat": "Free text, parsed by costFromText() in index.html. Supported shapes: "
                       "'$X x N mths, then $Y' (promo $X for N months, then ongoing $Y), '$X ongoing', "
                       "'about $X/mo' (flat monthly), or a bare '$X' (treated as ongoing).",
    "knownInaccuracies": [
        {
            "date": "2026-06-29", "provider": "leaptel", "speed": "500/200",
            "was": "$105 x 12 mths, then $125 (savings shown as $240)",
            "nowCorrect": "$115 x 12 mths, then $125 (savings $120)",
            "rootCause": "Leaptel advertises the promo as '$115/month, $10 discount for 12 months, "
                         "then $125 ongoing'. The earlier scrape subtracted the $10 discount FROM the "
                         "already-discounted $115 to get $105. The displayed monthly IS the promo price.",
            "lesson": "When a page shows 'PRICE/month' plus a separate '$N discount for M months' line, "
                      "PRICE shown is already the promo. savings = (ongoing - promo) * promo_months. "
                      "Re-verify every plan whose price came from a '$N off' style promo."
        }
    ]
}


def apply_corrections(data):
    applied = []
    for c in CORRECTIONS:
        for p in data['plans']:
            if p['providerKey'] == c['providerKey'] and p['speed'] == c['speed'] and c['find'] in p['price']:
                p['price'] = p['price'].replace(c['find'], c['replace'])
                p['search'] = p['search'].replace(c['find'], c['replace'])
                applied.append(f"plan {c['providerKey']} {c['speed']}: {p['price']}")
        name_guess = c['providerKey'].split()[0]
        for pr in data['providers']:
            if name_guess in pr['name'].lower():
                for t in pr['tiers']:
                    if t['tier'] == c['speed'] and c['find'] in t['price']:
                        t['price'] = t['price'].replace(c['find'], c['replace'])
                        applied.append(f"provider {pr['name']} {c['speed']}: {t['price']}")
                pr['search'] = pr['search'].replace(c['find'], c['replace'])
    return applied


if __name__ == '__main__':
    data = json.load(open(EXTRACTED, encoding='utf-8'))
    applied = apply_corrections(data)
    out = {'meta': META, 'plans': data['plans'], 'providers': data['providers']}
    json.dump(out, open(OUT, 'w', encoding='utf-8'), indent=2, ensure_ascii=False)
    print(f"Wrote {OUT}: {len(data['plans'])} plans, {len(data['providers'])} providers")
    print('Corrections applied:')
    for a in applied:
        print('  -', a)
