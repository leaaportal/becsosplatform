# BECS OS Portal

Operational project management and service delivery portal for **BE Consulting Solutions** (BECS). BECS OS is the source of truth — workflow engine, client portal, project manager, document tracker, compliance readiness tracker, deliverables hub, approvals center, and internal BECS control layer.

> This is **not** a marketing site. The marketing surface (e.g. `newbeginningstrategy.netlify.app`) is intentionally separate.

## Stack

- React 18 + TypeScript
- Vite 5
- React Router 6 with `HashRouter` (routes are served under `/#/...`)
- Tailwind CSS

## Routes

Primary portal entry: `/#/portal`

| Route                                                                       | Module                          |
| --------------------------------------------------------------------------- | ------------------------------- |
| `/#/portal`                                                                 | Operational Portal home         |
| `/#/portal/clients`                                                         | Client workspaces index         |
| `/#/portal/clients/the-beginning-home-health`                               | Client Command Center           |
| `/#/portal/clients/the-beginning-home-health/roadmap`                       | PLAN → EVOLVE → SUCCEED roadmap |
| `/#/portal/clients/the-beginning-home-health/tasks`                         | Task board                      |
| `/#/portal/clients/the-beginning-home-health/documents`                     | Document request hub            |
| `/#/portal/clients/the-beginning-home-health/compliance`                    | Compliance readiness tracker    |
| `/#/portal/clients/the-beginning-home-health/deliverables`                  | Deliverables manager            |
| `/#/portal/clients/the-beginning-home-health/approvals`                     | Approval center                 |
| `/#/portal/clients/the-beginning-home-health/meetings`                      | Meeting notes                   |
| `/#/portal/clients/the-beginning-home-health/admin`                         | BECS internal admin panel       |

## Client Pilot

**The Beginning Home Health** — Healthcare Operations Buildout — Controlled Client Pilot — Current phase: **PLAN**.

## Visibility Rules

Each client workspace has a `Client View` / `BECS Admin` toggle. The default is `Client View`. Internal-only items (`internal_only=true`) and meetings marked `client_visible=false` are hidden from the Client View and only rendered in the BECS Admin view.

The BECS Internal Admin Panel sidebar link is only visible while the `BECS Admin` toggle is active.

## Compliance Posture

BE Consulting Solutions provides business systems, operations workflows, documentation structure, and implementation support. BECS does **not** provide legal, medical, insurance, tax, or licensed healthcare compliance advice. The Compliance page renders this disclaimer at the top.

**No PHI is collected** by BECS OS. File upload fields are placeholders; integration to a HIPAA-compliant storage layer is required before any PHI may pass through this system.

## Development

```bash
npm install
npm run dev      # start dev server on http://localhost:5173
npm run check    # tsc type-check
npm run lint     # eslint (warnings fail in CI)
npm run build    # production build to ./dist
npm run preview  # preview the built bundle
```

## Deployment (Netlify — BECS OS site only)

`netlify.toml` declares:

- `build.command = npm run build`
- `build.publish = dist`
- SPA redirect: `/* -> /index.html (200)`

Deploy to the **BECS OS** Netlify site only. Do **not** deploy to `newbeginningstrategy.netlify.app`.

If the BECS OS site ID is known:

```bash
npx -y @netlify/mcp@latest --site-id <BECS_OS_SITE_ID>
```

## Data Layer

All data currently lives in seed files under `client/src/data/`. Types are in `client/src/types/clientWorkspace.ts`. When the Supabase / backend layer comes online, swap the seed exports for data fetchers using the same types.

## Status

- Built / Pending QA
- After route testing: Controlled Client Pilot Ready
