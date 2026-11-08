# Vercel deployments

## Apartment website

- GitHub: https://github.com/lopugit/tmp
- Project: `tmp` (`prj_zHJKi0nSgNbBD5UXzKUrh5OAO0gh`)
- Dashboard: https://vercel.com/lopugits-projects/tmp
- Root directory: `mount-buller`
- Production branch: `master` (verified repository default; no `main` exists)
- Install: `npm ci`; build: `npm run build`; framework: Other/Nitro Build Output
- Git integration: connected to `lopugit/tmp`, automatic production and branch builds
- Production alias: https://tmp-rose-nine.vercel.app
- Branch preview alias: https://tmp-git-codex-candoux-reference-redesign-lopugits-projects.vercel.app (automatic branch alias)
- Vercel authentication disabled only for this new public apartment site; no credentials or personal information are collected.

## Existing NBN site

The independent `nbncompare` Vercel project remains linked to `claude/internet-plan-site-updates-90nury`; its existing production project, branch, aliases and custom domains were not changed.

Dashboard: https://vercel.com/lopugits-projects/nbncompare

## Local preview

http://localhost:18747 — PM2 `tmp-candoux-redesign-18747`, loopback bind.

Tailscale/Funnel URL unavailable: the installed Tailscale wrapper references a missing app executable. No existing Funnel mappings were changed.

## Redesign preview only

The user requested keeping the existing production site as-is. `codex/candoux-reference-redesign` is a preview-only delivery: do not merge its PR or promote its deployment. Production stays on the existing `master` deployment until the user authorizes changing it.
