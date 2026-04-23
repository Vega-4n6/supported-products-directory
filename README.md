# Supported Products Directory — MVP Prototype

A high-fidelity, CMS-first prototype for the AV product directory described in the Upwork brief. Built in Next.js 14 + Tailwind so the final UX can be reviewed and approved before the Webflow build begins. Every section is powered by a CMS-style data model that maps 1:1 to Webflow Collections.

> **Live demo:** deploy to Vercel (instructions below) or run locally.

## What's included

- **Marketing pages** — Home, Directory, Product template (dynamic), Why Supported Matters, Get Your Product Supported
- **Mock CMS admin** at `/admin` — dashboard, editable product/manufacturer/category tables, drawer forms
- **Live click monitor** — real-time download-velocity gauge on `/admin` and `/admin/downloads`
- **AI Catalog Assistant** — floating "Ask the catalog" widget (bottom-left), trained on the CMS
- **Download click tracking** — GA4 `gtag` event + `navigator.sendBeacon` webhook, per-asset metadata
- **Product JSON-LD structured data**
- **Fully responsive**, WCAG AA, visible focus rings, `prefers-reduced-motion` honored

## Run locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Deploy to Vercel

### Option A — GitHub integration (recommended)
1. Push this repo to GitHub
2. Open [vercel.com/new](https://vercel.com/new) → import the repo
3. Framework preset auto-detected as **Next.js** — no env vars required
4. Click **Deploy**

### Option B — Vercel CLI
```bash
npm i -g vercel
vercel
```

## Tech

- Next.js 14 (App Router) · TypeScript · Tailwind CSS
- Plus Jakarta Sans · palette `#0F172A` / `#0369A1` / `#F8FAFC`
- No runtime dependencies beyond React — the "CMS" is a typed TS module at `data/cms.ts`

## How this maps to Webflow

| Prototype file | Webflow equivalent |
|---|---|
| `data/cms.ts` → `manufacturers`, `categories`, `products` | CMS Collections |
| `app/product/[slug]/page.tsx` | Collection Page template |
| `app/directory/page.tsx` filters | Finsweet CMS Filter on a Collection List |
| `lib/tracking.ts` | Global `<script>` in Site Settings → Custom Code |
| `components/ProductCard.tsx` | Collection List item |
| Product page JSON-LD block | Embed element inside CMS template |
| `app/admin/*` | Webflow Editor (real backend, same shape) |

## Verify download tracking

1. Open a product page → `/product/crestron-dm-nvx-360`
2. Open DevTools → Console
3. Click a download button → see `[Track] Download: {...}` with product + asset metadata
4. In production this payload is sent to GA4 and a webhook via `navigator.sendBeacon`
