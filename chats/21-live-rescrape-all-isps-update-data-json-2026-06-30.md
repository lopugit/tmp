# Request 21 — Live re-scrape all ISPs, update data.json

- **Date:** 2026-06-30
- **Sequence:** 21

## Verbatim request

Can you clone this repo and run the analysis please then push the changes 🥰🙌

## Outcome

Performed a full live re-scrape of all 37 providers (NBN FTTP focus) using WebFetch and Claude-in-Chrome MCP. Successfully read live prices from 19+ ISP websites.

### Confirmed live and updated in data.json:
- **Leaptel**: 500/50 promo raised $69.95→$79.95; 750/50 plan **discontinued** (removed); 1000/400 promo $125→$135; 2000/500 promo $205→$215; **new plans** added: 250/100 ($95/$105) and 2000/100 HFC ($155/$165)
- **MATE**: 6 lower-tier plans increased ~$4: e.g. 25/10 $51/$76→$55/$80; 485/46 $71/$96→$75/$100; 713/46 $96/$121→$100/$125
- **Dodo**: EOFY promo changed 12-month→6-month for all 6 plans (e.g. 25/9: $51.99 x 12→$41.99 x 6); removed fake 500/50 and 1000/100 entries
- **Vodafone**: Fixed speeds (500/50→500/42, 750/50→740/42, 1000/100→850/85); updated EOFY 12-month promos; added 25/8 ($74) and 50/17 ($84)
- **TPG**: NBN500 promo changed 6-month→12-month, $64.99→$69.99; Superfast/Ultrafast rebalanced (promo lower, ongoing higher); 25/4 speed corrected to 25/8
- **Superloop**: Cleaned up approximate language; 1000/100 promo corrected $85→$79
- **iiNet**: Removed 4 stale/approximate entries; fixed speeds (25/4→25/8, added 740/42 and 820/85); prices updated to live values
- **Aussie Broadband**: 500/50 from "Often $75..." → $79 x 6 mths, then $95; 2000/500→2000/200 with corrected price $200/$220→$169/$189 (EOFY)
- **Flip**: Fixed ongoing prices (25/8: $59.90→$65.90; 50/17: $79.90→$84.90; 500/42: $74/$83.90→$69/$88.90 EOFY)
- **More Telecom**: Top plan corrected 1000/100→700/85 (UltraSpeedy); 500/50 cleaned to $100 ongoing
- **Telstra**: Major update — corrected all upload speeds (25/10→25/4, 50/20→50/17 etc.); prices were stale. Now: 25/4 $93, 50/17 $109, 100/17 $99x6/$113, 500/40 $99x6/$113 (EOFY ends June 30)
- **SpinTel, Tangerine, Exetel, Kogan**: Confirmed live, added sourceUrls
- **Swoop**: Confirmed live prices correct; added sourceUrl

### Inaccessible (data left unchanged):
Leaptel 500/200 (confirmed ✓), Origin Internet, Belong (offline), Optus (timeout), Launtel, Neptune, Carbon Comms, IT'S FUBAR, Future Broadband, SkyMesh, Vocus Business, ZipFibre, Moose Mobile, Aussie Broadband Pro/Business

### Context notes:
- June 30 2026 = last day of many EOFY promos (Dodo, Vodafone, Telstra, Flip, ABB)
- Telstra and ABB announced price increases from July 1 2026
- All EOFY promo info recorded + noted in meta.knownInaccuracies
