# Graph Report - tmp-candoux-redesign  (2026-11-08)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 221 nodes · 250 edges · 28 communities (12 shown, 16 thin omitted)
- Extraction: 96% EXTRACTED · 3% INFERRED · 1% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.83)
- Token cost: 860 input · 211 output

## Graph Freshness
- Built from commit: `a82ec021`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Mount Buller Apartment Website
- Quasar Project Dependencies
- Apartment Page Components
- Apartment Website Build Stack
- Vue App Localization
- Source Path Configuration
- Browser Verification Scripts
- Apartment Project Documentation
- Quasar App Assets
- Apartment Website Task Tracking
- Build and Test Scripts
- Vercel Deployment Configuration
- Apartment Design System
- Bathroom Photo
- Bunk Beds Photo
- Apartment Exterior Photo
- Kitchen Photo
- Living Area Photo
- Living Room Photo
- Main Bedroom Photo
- Trilogy Bunk Photo

## God Nodes (most connected - your core abstractions)
1. `Icon()` - 10 edges
2. `Header()` - 10 edges
3. `ApartmentPage()` - 10 edges
4. `paths` - 9 edges
5. `ExternalLink()` - 7 edges
6. `Mount Buller Apartment` - 7 edges
7. `scripts` - 6 edges
8. `Gallery()` - 6 edges
9. `Request Log` - 6 edges
10. `Stay()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Existing NBN site` --references--> `Request Log`  [AMBIGUOUS]
  VERCEL_DEPLOYMENTS.md → chats/README.md
- `README` --references--> `Vertical Quasar Logo`  [AMBIGUOUS]
  README.md → src/assets/quasar-logo-vertical.svg
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

## Communities (28 total, 16 thin omitted)

### Community 0 - "Mount Buller Apartment Website"
Cohesion: 0.07
Nodes (35): Apartment Build Workflow, Apartment Website HTML Shell, Mount Buller Website Favicon, Mount Buller Summer Landscape Photo, Mount Buller Village Photo, Mount Buller Winter Landscape Photo, AMS Mt Buller Listing, Browser Verification Script (+27 more)

### Community 1 - "Quasar Project Dependencies"
Cohesion: 0.07
Nodes (27): author, browserslist, dependencies, axios, core-js, quasar, @quasar/extras, vue-i18n (+19 more)

### Community 2 - "Apartment Page Components"
Cohesion: 0.17
Nodes (23): ApartmentPage(), Booking(), Brand(), ExternalLink(), Gallery(), handleGalleryKeys(), step(), Header() (+15 more)

### Community 3 - "Apartment Website Build Stack"
Cohesion: 0.09
Nodes (21): dependencies, react, react-dom, react-router-dom, devDependencies, nitropack, @playwright/test, vite (+13 more)

### Community 4 - "Vue App Localization"
Cohesion: 0.11
Nodes (5): axios, vue-i18n, i18n, linksData, routes

### Community 5 - "Source Path Configuration"
Cohesion: 0.15
Nodes (12): compilerOptions, baseUrl, paths, exclude, app/*, assets/*, boot/*, components/* (+4 more)

### Community 6 - "Browser Verification Scripts"
Cohesion: 0.29
Nodes (4): results, config, shell, @playwright/test

### Community 8 - "Apartment Project Documentation"
Cohesion: 0.29
Nodes (7): Browser verification, Content and decisions, Design, Image licensing, Mount Buller Apartment, Run and build, Task state

### Community 9 - "Quasar App Assets"
Cohesion: 0.29
Nodes (7): Quasar App Favicon 128x128, Quasar App Favicon 16x16, Quasar App Favicon 32x32, Quasar App Favicon 96x96, README, Vertical Quasar Logo, HTML Index Template

### Community 10 - "Apartment Website Task Tracking"
Cohesion: 0.22
Nodes (8): Mount Buller Apartment Website Request, Mount Buller apartment website, Candoux 4 Listing Reference, Exact apartment listing, Reference design systems, Keep the redesign on a separate branch, Request Log, Request log

### Community 11 - "Build and Test Scripts"
Cohesion: 0.33
Nodes (6): scripts, build, build:client, dev, test:browser, verify:vercel-output

### Community 12 - "Vercel Deployment Configuration"
Cohesion: 0.33
Nodes (5): buildCommand, framework, headers, installCommand, $schema

## Ambiguous Edges - Review These
- `Existing NBN site` → `Request Log`  [AMBIGUOUS]
  VERCEL_DEPLOYMENTS.md · relation: references
- `mount-buller/README.md` → `Browser Verification Script`  [AMBIGUOUS]
  mount-buller/README.md · relation: references
- `README` → `Vertical Quasar Logo`  [AMBIGUOUS]
  README.md · relation: references

## Knowledge Gaps
- **32 isolated node(s):** `@quasar/extras`, `core-js`, `@quasar/app`, `Apartment Build Workflow`, `Graphify Indexing` (+27 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 128 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Apartment website` connect `Mount Buller Apartment Website` to `Apartment Website Task Tracking`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **What connects `@quasar/extras`, `core-js`, `@quasar/app` to the rest of the system?**
  _32 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Mount Buller Apartment Website` be split into smaller, more focused modules?**
  _Cohesion score 0.06906906906906907 - nodes in this community are weakly interconnected._
- **Why does `@playwright/test` connect `Browser Verification Scripts` to `Apartment Website Build Stack`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Should `Quasar Project Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Existing NBN site` and `Request Log`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **What is the exact relationship between `mount-buller/README.md` and `Browser Verification Script`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._