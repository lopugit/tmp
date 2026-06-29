#!/usr/bin/env python3
"""
validate_data.py — recompute + sanity-check data.json, and diff two scrapes.

It re-implements the SAME cost parser as index.html (costFromText) in Python, so
you can recompute monthly/12-month/savings off-line and catch the kind of mistake
that produced the Leaptel bug (savings inflated by a misread "$N off" promo).

Usage (from repo root):
  python3 scrape/validate_data.py                      # validate ../data.json
  python3 scrape/validate_data.py path/to/data.json    # validate a specific file
  python3 scrape/validate_data.py --diff OLD.json NEW.json
        # compare a backed-up scrape with a fresh one; flags big changes so a
        # broken scrape can be quarantined in broken_scrapes/ before publishing.

Exit code is non-zero if any ERROR-level problems are found (handy in CI).
"""
import json, re, sys, os

# ---- mirror of index.html costFromText() ----
def cost_from_text(raw):
    t = (raw or '').replace(',', '').lower()
    if '$' not in t:
        return None
    promoM = re.search(r'\$\s*([\d.]+)\s*x\s*(\d+)\s*(?:mth|mo|month)', t)
    thenM = re.search(r'then[^$]*\$?\s*~?\s*([\d.]+)', t)
    ongM = re.search(r'\$\s*([\d.]+)\s*ongoing', t)
    moM = re.search(r'\$\s*([\d.]+)\s*/\s*mo', t) or re.search(r'[≈~]\s*\$\s*([\d.]+)', t)
    if promoM:
        promo = float(promoM.group(1)); n = min(int(promoM.group(2)), 12)
        ongoing = float(thenM.group(1)) if thenM else promo
        cost = promo * n + ongoing * (12 - n)
    elif ongM:
        ongoing = promo = float(ongM.group(1)); cost = ongoing * 12
    elif moM:
        ongoing = promo = float(moM.group(1)); cost = ongoing * 12
    else:
        anyM = re.search(r'\$\s*([\d.]+)', t)
        if not anyM:
            return None
        ongoing = promo = float(anyM.group(1)); cost = ongoing * 12
    if cost <= 0:
        return None
    return {'promo': promo, 'ongoing': ongoing, 'cost': cost, 'avg': cost / 12,
            'disc': max(0.0, ongoing * 12 - cost)}


def validate(path):
    data = json.load(open(path, encoding='utf-8'))
    errors, warns = [], []
    keys = set()
    for p in data.get('plans', []):
        key = (p.get('providerKey'), p.get('speed'))
        tag = f"{p.get('providerKey')} {p.get('speed')}"
        if key in keys:
            warns.append(f"duplicate plan {tag}")
        keys.add(key)
        if not p.get('sourceUrl'):
            warns.append(f"{tag}: missing sourceUrl")
        if not p.get('down'):
            warns.append(f"{tag}: down speed is 0/missing")
        c = cost_from_text(p.get('price', ''))
        if c is None:
            continue  # 'by quote' style — fine
        if c['promo'] > c['ongoing'] + 0.01:
            warns.append(f"{tag}: promo ${c['promo']:.0f} > ongoing ${c['ongoing']:.0f} (unusual — check price text)")
        # Leaptel-style red flag: savings improbably large vs ongoing year
        if c['disc'] > 0.33 * c['ongoing'] * 12:
            warns.append(f"{tag}: savings ${c['disc']:.0f} is >33% of the ongoing year (${c['ongoing']*12:.0f}); "
                         f"double-check this came from a real '$X x N then $Y' promo, not a misread discount")
    print(f"== validate {os.path.relpath(path)} ==")
    print(f"  plans: {len(data.get('plans', []))}  providers: {len(data.get('providers', []))}")
    for w in warns:
        print("  WARN:", w)
    for e in errors:
        print("  ERROR:", e)
    print(f"  {len(errors)} errors, {len(warns)} warnings")
    return len(errors)


def diff(old_path, new_path):
    old = json.load(open(old_path, encoding='utf-8'))
    new = json.load(open(new_path, encoding='utf-8'))
    def index(d):
        return {(p['providerKey'], p['speed']): p for p in d.get('plans', [])}
    oi, ni = index(old), index(new)
    op = {p['providerKey'] for p in old.get('plans', [])}
    npv = {p['providerKey'] for p in new.get('plans', [])}
    added_keys, removed_keys = set(ni) - set(oi), set(oi) - set(ni)
    big = []
    for k in set(oi) & set(ni):
        co, cn = cost_from_text(oi[k]['price']), cost_from_text(ni[k]['price'])
        if co and cn and co['cost'] > 0:
            delta = abs(cn['cost'] - co['cost']) / co['cost']
            if delta > 0.25:
                big.append(f"{k[0]} {k[1]}: 12-mo ${co['cost']:.0f} -> ${cn['cost']:.0f} ({delta*100:.0f}% change)")
    print("== diff old -> new ==")
    print(f"  providers removed: {sorted(op - npv) or 'none'}")
    print(f"  providers added:   {sorted(npv - op) or 'none'}")
    print(f"  plans removed: {len(removed_keys)}   plans added: {len(added_keys)}")
    for b in big:
        print("  PRICE SHIFT:", b)
    suspicious = bool(op - npv) or len(removed_keys) > max(5, 0.15 * len(oi)) or len(big) > max(5, 0.15 * len(oi))
    if suspicious:
        print("  >>> LOOKS SUSPICIOUS: many providers/plans vanished or shifted. "
              "Quarantine the new file in broken_scrapes/<date>/ with a NOTES.md analysis before publishing.")
    else:
        print("  changes look within normal bounds.")
    return 0


if __name__ == '__main__':
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    args = sys.argv[1:]
    if args and args[0] == '--diff':
        sys.exit(diff(args[1], args[2]))
    sys.exit(validate(args[0] if args else os.path.join(root, 'data.json')))
