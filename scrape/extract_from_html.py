#!/usr/bin/env python3
"""
extract_from_html.py — lift the ISP data back OUT of index.html into JSON.

This is the bootstrap/repair tool: it parses the rendered plan table and the
provider cards in ../index.html and writes scrape/_extracted.json
({"plans": [...], "providers": [...]}).

You normally do NOT need this — data.json is the source of truth and index.html
renders FROM it. Use this only if data.json was ever lost and you need to
reconstruct it from a known-good index.html, or to diff HTML vs data.json.

Run from the repo root:  python3 scrape/extract_from_html.py
"""
import re, json, html, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'index.html')
OUT = os.path.join(ROOT, 'scrape', '_extracted.json')


def strip_tags(s):
    s = re.sub(r'<br\s*/?>', ' ', s)
    s = re.sub(r'<[^>]+>', '', s)
    return re.sub(r'\s+', ' ', html.unescape(s)).strip()


def attr(tag, name):
    m = re.search(r'\b' + name + r'="([^"]*)"', tag)
    return html.unescape(m.group(1)) if m else ''


def extract(src):
    plans = []
    tb = re.search(r'<table id="plansTable">.*?<tbody>(.*?)</tbody>', src, re.S)
    for rb in re.findall(r'<tr\b.*?</tr>', tb.group(1) if tb else '', re.S):
        open_tag = re.match(r'<tr\b[^>]*>', rb, re.S).group(0)
        cells = re.findall(r'<td\b[^>]*>(.*?)</td>', rb, re.S)
        if len(cells) < 9:
            continue
        strong = re.search(r'<strong>(.*?)</strong>', cells[1], re.S)
        subtle = re.search(r'<span class="subtle">(.*?)</span>', cells[1], re.S)
        pill = re.search(r'<span class="pill ([^"]*)">(.*?)</span>', cells[4], re.S)
        up_note = re.sub(r'<span class="pill [^"]*">.*?</span>', '', cells[4], flags=re.S)
        a = re.search(r'<a href="([^"]*)"[^>]*>(.*?)</a>', cells[8], re.S)
        plans.append({
            'provider': strip_tags(cells[0]), 'providerKey': attr(open_tag, 'data-provider'),
            'down': int(attr(open_tag, 'data-down') or 0), 'up': int(attr(open_tag, 'data-up') or 0),
            'speed': attr(open_tag, 'data-speed'), 'upload': attr(open_tag, 'data-upload'),
            'search': attr(open_tag, 'data-search'),
            'speedLabel': strip_tags(strong.group(1)) if strong else strip_tags(cells[1]),
            'tes': strip_tags(subtle.group(1)) if subtle else '',
            'price': strip_tags(cells[2]), 'fit': strip_tags(cells[3]),
            'uploadClass': pill.group(1).strip() if pill else '',
            'uploadPill': strip_tags(pill.group(2)) if pill else '',
            'uploadNote': strip_tags(up_note), 'terms': strip_tags(cells[5]),
            'business': strip_tags(cells[7]),
            'sourceUrl': a.group(1) if a else '',
            'sourceName': strip_tags(a.group(2)) if a else strip_tags(cells[0]),
        })

    providers = []
    gblock = re.search(r'<div class="provider-grid">(.*)', src, re.S)
    cards = [c for c in re.findall(r'<article\b[^>]*>.*?</article>', gblock.group(1) if gblock else '', re.S) if 'provider-card' in c]
    for cd0 in cards:
        open_tag = re.match(r'<article\b[^>]*>', cd0).group(0)
        cd = re.sub(r'</\s*(\w+)\s*>', r'</\1>', re.sub(r'\s+', ' ', cd0))
        h3 = re.search(r'<h3>(.*?)</h3>', cd, re.S)
        mini = re.search(r'<div class="mini-title">(.*?)</div>', cd, re.S)
        paras = re.findall(r'<p>(.*?)</p>', cd, re.S)
        verdict = next((strip_tags(re.sub(r'<strong>Verdict:</strong>', '', p)) for p in paras if 'Verdict' in p), '')
        tiers = [{'tier': strip_tags(t[0]), 'price': strip_tags(t[1])}
                 for t in re.findall(r'<span class="tier-price"><strong>(.*?)</strong>\s*<span>(.*?)</span></span>', cd, re.S)]
        providers.append({
            'name': strip_tags(h3.group(1)) if h3 else '', 'search': attr(open_tag, 'data-search'),
            'miniTitle': strip_tags(mini.group(1)) if mini else '',
            'blurb': strip_tags(paras[0]) if paras else '', 'tiers': tiers, 'verdict': verdict,
        })
    return {'plans': plans, 'providers': providers}


if __name__ == '__main__':
    data = extract(open(SRC, encoding='utf-8').read())
    json.dump(data, open(OUT, 'w', encoding='utf-8'), indent=2, ensure_ascii=False)
    print(f'Extracted {len(data["plans"])} plans, {len(data["providers"])} providers -> {OUT}')
