# Graph Report - tmp-mount-buller  (2026-11-08)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 212 nodes · 239 edges · 27 communities (12 shown, 15 thin omitted)
- Extraction: 95% EXTRACTED · 3% INFERRED · 1% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.83)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `098c2ead`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- mount-buller/README.md
- package.json
- main.jsx
- mount-buller/package.json
- routes.js
- paths
- verify-browser.mjs
- Mount Buller Apartment
- HTML Index Template
- Mount Buller Apartment Website Request
- scripts
- vercel.json
- Candoux 4 Bathroom Photo
- Candoux 4 Bunk Beds Photo
- Candoux 4 Exterior Photo
- Candoux 4 Kitchen Photo
- Candoux 4 Living Area Photo
- Candoux 4 Living Room Photo
- Candoux 4 Main Bedroom Photo
- Candoux 4 Trilogy Bunk Photo

## God Nodes (most connected - your core abstractions)
1. `ApartmentPage()` - 10 edges
2. `Icon()` - 10 edges
3. `Header()` - 9 edges
4. `paths` - 9 edges
5. `Mount Buller Apartment` - 7 edges
6. `ExternalLink()` - 6 edges
7. `Gallery()` - 6 edges
8. `scripts` - 6 edges
9. `Hero()` - 5 edges
10. `HTML Index Template` - 5 edges

## Surprising Connections (you probably didn't know these)
- `README` --references--> `Vertical Quasar Logo`  [AMBIGUOUS]
  README.md → src/assets/quasar-logo-vertical.svg
- `Existing NBN site` --references--> `Request Log`  [AMBIGUOUS]
  VERCEL_DEPLOYMENTS.md → chats/README.md
- `HTML Index Template` --references--> `Quasar App Favicon 128x128`  [EXTRACTED]
  src/index.template.html → public/icons/favicon-128x128.png
- `HTML Index Template` --references--> `Quasar App Favicon 16x16`  [EXTRACTED]
  src/index.template.html → public/icons/favicon-16x16.png
- `HTML Index Template` --references--> `Quasar App Favicon 32x32`  [EXTRACTED]
  src/index.template.html → public/icons/favicon-32x32.png

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Isolated Browser Acceptance Workflow** — mount_buller_readme_chrome_for_testing, mount_buller_readme_browser_test_script, mount_buller_readme_mount_buller_website [EXTRACTED 1.00]
- **Frontend and Vercel Build Stack** — mount_buller_readme_react, mount_buller_readme_react_router, mount_buller_readme_vite, mount_buller_readme_nitro, mount_buller_readme_vercel_build_output [EXTRACTED 1.00]
- **Apartment Content and External Booking Flow** — mount_buller_readme_candoux_4, mount_buller_readme_ams_listing, mount_buller_readme_rms_booking_engine [EXTRACTED 1.00]

## Communities (27 total, 15 thin omitted)

### Community 0 - "mount-buller/README.md"
Cohesion: 0.07
Nodes (34): Apartment Build Workflow, Apartment Website HTML Shell, Mount Buller Website Favicon, Mount Buller Summer Landscape Photo, Mount Buller Village Photo, Mount Buller Winter Landscape Photo, AMS Mt Buller Listing, Browser Verification Script (+26 more)

### Community 1 - "package.json"
Cohesion: 0.07
Nodes (27): author, browserslist, dependencies, axios, core-js, quasar, @quasar/extras, vue-i18n (+19 more)

### Community 2 - "main.jsx"
Cohesion: 0.18
Nodes (21): ApartmentPage(), Brand(), ExternalLink(), Gallery(), handleGalleryKeys(), step(), Header(), closeMenu() (+13 more)

### Community 3 - "mount-buller/package.json"
Cohesion: 0.09
Nodes (21): dependencies, react, react-dom, react-router-dom, devDependencies, nitropack, @playwright/test, vite (+13 more)

### Community 4 - "routes.js"
Cohesion: 0.11
Nodes (5): axios, vue-i18n, i18n, linksData, routes

### Community 5 - "paths"
Cohesion: 0.15
Nodes (12): compilerOptions, baseUrl, paths, exclude, app/*, assets/*, boot/*, components/* (+4 more)

### Community 6 - "verify-browser.mjs"
Cohesion: 0.29
Nodes (4): results, config, shell, @playwright/test

### Community 8 - "Mount Buller Apartment"
Cohesion: 0.29
Nodes (7): Browser verification, Content and decisions, Design, Image licensing, Mount Buller Apartment, Run and build, Task state

### Community 9 - "HTML Index Template"
Cohesion: 0.29
Nodes (7): Quasar App Favicon 128x128, Quasar App Favicon 16x16, Quasar App Favicon 32x32, Quasar App Favicon 96x96, README, Vertical Quasar Logo, HTML Index Template

### Community 10 - "Mount Buller Apartment Website Request"
Cohesion: 0.40
Nodes (6): Mount Buller Apartment Website Request, Mount Buller apartment website, Candoux 4 Listing Reference, Exact apartment listing, Request Log, Request log

### Community 11 - "scripts"
Cohesion: 0.33
Nodes (6): scripts, build, build:client, dev, test:browser, verify:vercel-output

### Community 12 - "vercel.json"
Cohesion: 0.33
Nodes (5): buildCommand, framework, headers, installCommand, $schema

## Ambiguous Edges - Review These
- `mount-buller/README.md` → `Browser Verification Script`  [AMBIGUOUS]
  mount-buller/README.md · relation: references
- `Existing NBN site` → `Request Log`  [AMBIGUOUS]
  VERCEL_DEPLOYMENTS.md · relation: references
- `README` → `Vertical Quasar Logo`  [AMBIGUOUS]
  README.md · relation: references

## Knowledge Gaps
- **32 isolated node(s):** `core-js`, `@quasar/app`, `@quasar/extras`, `Apartment Build Workflow`, `Graphify Indexing` (+27 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 123 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@playwright/test` connect `verify-browser.mjs` to `mount-buller/package.json`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **What connects `core-js`, `@quasar/app`, `@quasar/extras` to the rest of the system?**
  _32 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `mount-buller/README.md` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Why does `vue-i18n` connect `routes.js` to `package.json`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `mount-buller/README.md` and `Browser Verification Script`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **What is the exact relationship between `Existing NBN site` and `Request Log`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._