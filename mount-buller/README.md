# Mount Buller Apartment

An independent Candoux 4 apartment advertising website within `lopugit/tmp`. The older Quasar app and NBN comparison branch are preserved. Mount Buller, Victoria is the supplied location; Melbourne is the visitor origin, not the apartment address.

## Run and build

Node 22 or newer. From this directory:

```sh
npm ci
npm run dev
npm run build
```

Local preview: http://localhost:18746 (loopback only). PM2 entry: `tmp-mount-buller-18746` in `ecosystem.config.cjs`, with automatic restart disabled. Tailscale/Funnel could not be configured: the installed wrapper points to `/Applications/Tailscale.app/Contents/MacOS/tailscale`, which is absent. No unrelated routing was changed.

The client uses React, React Router in library mode and Vite. Nitro packages the Vite `dist` as Vercel Build Output with an absolute public-assets path. `verify:vercel-output` checks the real HTML shell and filesystem routing. No server API, booking transaction, payment or enquiry storage is present; booking and enquiry links go to AMS Mt Buller / its RMS booking engine.

## Content and decisions

The user identified Candoux 4 with the AMS Mt Buller listing: https://amsmtbuller.com.au/our-accommodation/candoux-4/. Property facts, photographs and the apartment-specific RMS booking link come from that page, retrieved 8 November 2026. Its summary/features say sleeps 7; its older prose says a group of 6. The page uses the consistent summary and bed arrangement (queen, two singles in a bunk, double-plus-single trilogy bunk) and leaves final occupancy confirmation to AMS. Three bedrooms, one bathroom and no parking are disclosed. Rates and availability are not reproduced: visitors use the real booking manager. No bookings or enquiry messages are processed locally. Destination images remain clearly distinct from apartment photos.

Mount Buller is approximately three hours / 248 km from Melbourne via Mansfield according to the resort's official driving guide: https://www.mtbuller.com.au/winter/drive-a-car. Travel times vary; current road, resort-entry and seasonal information stays linked to the official resort.

## Design

Warm cream, forest green and butter yellow; generous editorial typography with landscape-led storytelling. UI/UX Pro Max and Inspo photographic references informed spacing, hierarchy, accessible controls and reduced-motion behavior. The automatic liquid-glass recommendation was a poor fit and was not adopted.

## Image licensing

Apartment photographs: AMS Mt Buller, from the user-supplied Candoux 4 listing. They retain their source rights; no open license is asserted. See `public/images/property-credits.json`. Destination photographs: see `public/images/credits.json` and the visible page photo credits. Unchanged originals of The West Ridge (Kody Appleton, CC BY-SA 4.0), The West Ridge of Mt Buller, Nov 2017 (Bill Bowden, CC BY-SA 4.0), and Mt Buller village Stevage (Steve Bennett, CC BY-SA 3.0). CSS framing may crop the displayed images; source files retain their original licenses. These photo licenses apply to their respective assets, not unrelated application source.

## Task state

Branch: `codex/mount-buller-apartment`. Isolated worktree: `tmp-mount-buller`. Base: freshly fetched `origin/master` at `098c2ead8fe9a99ce996023cb943464dfe2e0471`; this repository has no main branch. Thingtime private reporting was attempted under stable identity `tmp-mount-buller-2026-11-08`, but the connected account lacks the independent `agents.report` grant; no alternate identity or duplicate workspace was used.

## Browser verification

`npm run test:browser` uses a fresh isolated Chrome for Testing process with Chromium's sandbox enabled, separate browser contexts and no personal credentials. Set `BROWSER_EXECUTABLE` to an installed Chrome for Testing binary if needed. `SITE_URL` selects the intended origin. It scrolls desktop, tablet and mobile to the bottom, checks overflow, images, runtime errors and FAQ states, and saves screenshots/traces in ignored `test-results/`.

The installed Thingtime browser manager requires a registered task; this task could not obtain a saved private task through the reporting grant. Browser acceptance used an explicit isolated Chrome for Testing process instead. The existing personal Chrome profiles were not used. The local preview was saved in PM2 with prior startup entries preserved; no unrelated process was started or stopped.

Local acceptance: 1440×1000, 768×1024 and 375×812, full-page scrolling, both seasons, every FAQ, seven-photo gallery navigation and wrapping, keyboard Escape, focus restoration, menu-to-section navigation and booking URL. All passed with no console runtime errors, broken images or horizontal overflow. Source comparison used the AMS listing and original property photographs. The RMS link returned HTTP 200 after redirect to its online-booking service; no booking was submitted.

Graphify indexing reports an existing duplicate node identity for the legacy Quasar scoped component and treats the 5.2 MB summer landscape as a file reference without inline pixel analysis. These do not affect the application. Its available structure, semantic documents, manifest and portable HTML are retained.
