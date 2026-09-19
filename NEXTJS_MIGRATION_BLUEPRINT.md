# Next.js Migration Blueprint — thekeithhopkins.com
> Updated: 2026-09-15 · Source: Graphify AST Knowledge Graph (312 nodes, 201 edges, 17 communities) · Skill: frontend-excellence

---

## Overview

Migrating **thekeithhopkins.com** from WordPress/Elementor static export to **Next.js App Router** with TypeScript, Tailwind CSS v4, Three.js, and Vercel deployment.

### Stack
| Layer | Choice |
|---|---|
| Framework | Next.js 16.3.5 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| 3D / Motion | Three.js + @react-three/fiber + @react-three/postprocessing |
| UI Primitives | lucide-react + clsx + tailwind-merge |
| Forms | react-hook-form + zod |
| CRM / Automation | GoHighLevel API (lib/ghl-api.ts) |
| Deployment | Vercel |

---

## Route Mapping Matrix

| WordPress Source | Type | Next.js Target Route | Status |
|---|---|---|---|
| index.html | Page | `app/page.tsx` | ✅ Built |
| pricing/index.html | Page | `app/pricing/page.tsx` | ✅ Built |
| service/* (5 services) | Dynamic Route | `app/service/[slug]/page.tsx` | ✅ Built |
| project/* (3 projects) | Dynamic Route | `app/project/[slug]/page.tsx` | ✅ Built |
| blog/* (4 posts) | Dynamic Route | `app/blog/[slug]/page.tsx` | ✅ Built |
| fillmypipeline/index.html | Landing | `app/fillmypipeline/page.tsx` | ✅ Built |
| — | Index | `app/service/page.tsx` | ✅ Built (bonus) |
| — | Index | `app/project/page.tsx` | ✅ Built (bonus) |
| — | Sitemap | `app/sitemap.ts` | ✅ Built |
| — | Robots | `app/robots.ts` | ✅ Built |
| — | OG Image | `app/opengraph-image.tsx` | ✅ Built |

---

## Project File Structure (actual as of 2026-09-15)

```
thekeithhopkins-next/
├── app/
│   ├── layout.tsx                      ✅
│   ├── page.tsx                        ✅ (Hero, About, Services, Artist, Contact)
│   ├── globals.css                     ✅ (Tailwind v4 + CSS tokens)
│   ├── opengraph-image.tsx             ✅
│   ├── sitemap.ts                      ✅
│   ├── robots.ts                       ✅
│   ├── favicon.ico                     ✅
│   ├── pricing/page.tsx                ✅
│   ├── service/
│   │   ├── page.tsx                    ✅ (Services index)
│   │   └── [slug]/page.tsx             ✅
│   ├── project/
│   │   ├── page.tsx                    ✅ (Projects index)
│   │   └── [slug]/page.tsx             ✅
│   ├── blog/
│   │   ├── page.tsx                    ✅
│   │   └── [slug]/page.tsx             ✅
│   ├── fillmypipeline/page.tsx         ✅
│   └── api/
│       ├── contact/route.ts            ✅
│       └── audit-lead/route.ts         ✅
├── components/
│   ├── layout/
│   │   ├── Header.tsx                  ✅
│   │   └── Footer.tsx                  ✅
│   ├── home/
│   │   ├── HeroSection.tsx             ✅ (Three.js canvas integration)
│   │   ├── AboutSection.tsx            ✅
│   │   ├── ServicesSection.tsx         ✅
│   │   ├── ArtistSection.tsx           ✅
│   │   └── ContactSection.tsx          ✅ (GHL-wired form)
│   ├── three/
│   │   ├── HeroCanvas.tsx              ✅ (ParticleField + NeonGrid + PostFX)
│   │   ├── ParticleField.tsx           ✅
│   │   ├── NeonGrid.tsx                ✅
│   │   └── PostFX.tsx                  ✅
│   └── ui/
│       ├── PricingTable.tsx            ✅
│       ├── ImageGallery.tsx            ✅
│       └── AuditLeadForm.tsx           ✅ (GHL-wired)
├── lib/
│   ├── data/
│   │   ├── services.json               ✅
│   │   ├── projects.json               ✅
│   │   ├── posts.json                  ✅
│   │   ├── pricing.json                ✅
│   │   └── site-config.json            ✅
│   ├── types.ts                        ✅
│   ├── utils.ts                        ✅
│   └── ghl-api.ts                      ✅ (GoHighLevel CRM)
├── public/images/                      ✅
├── vercel.json                         ✅
└── next.config.ts                      ✅
```

---

## Data Layer — Type Definitions (lib/types.ts)

```typescript
export interface Service {
  id: string; slug: string; title: string;
  overview: string; details: string[];
  headings: string[]; images: string[];
  nextjs_route: string;
}
export interface Project {
  id: string; slug: string; title: string;
  description: string; content_blocks: string[];
  strategies: string[]; images: string[];
  nextjs_route: string;
}
export interface Post {
  id: number; slug: string; title: string;
  date: string; status: string;
  content_html: string; excerpt_html: string;
  categories: number[]; tags: number[];
  nextjs_route: string;
}
export interface PricingTier {
  name: string; price: string; period: string;
  description: string; features: string[];
  popular?: boolean;
}
export interface SiteConfig {
  brand_name: string; tagline: string; hero_title: string;
  metrics: { value: string; label: string }[];
  navigation: NavItem[]; copyright: string;
}
export interface NavItem {
  label: string; href: string; cta?: boolean;
  children?: { label: string; href: string }[];
}
```

---

## Migration Phases

### ✅ Phase 1 — Scaffold (COMPLETE)
- [x] Next.js App Router with TypeScript + Tailwind CSS v4
- [x] lib/data/ — services.json, projects.json, posts.json, pricing.json, site-config.json
- [x] public/images/ — uploaded assets
- [x] lib/types.ts and lib/utils.ts
- [x] app/layout.tsx with global font and metadata
- [x] Header.tsx and Footer.tsx from site-config.json
- [x] Tailwind v4 design tokens + globals.css (CSS custom properties)

### ✅ Phase 2 — Core Pages (COMPLETE)
- [x] app/page.tsx — HeroSection, AboutSection, ServicesSection, ArtistSection, ContactSection
- [x] app/pricing/page.tsx — PricingTable (4 tiers from pricing.json)
- [x] app/service/page.tsx — Services index with icon map
- [x] app/service/[slug]/page.tsx + generateStaticParams() for 5 services
- [x] app/project/page.tsx — Projects index
- [x] app/project/[slug]/page.tsx + generateStaticParams() for 3 projects
- [x] app/blog/page.tsx — Blog index
- [x] app/blog/[slug]/page.tsx for 4 posts

### ✅ Phase 3 — Interactive, Forms & Three.js (COMPLETE)
- [x] Three.js HeroCanvas — ParticleField + NeonGrid + PostFX via @react-three/fiber
- [x] ContactSection.tsx — react-hook-form + zod → POST /api/contact → GHL
- [x] AuditLeadForm.tsx — react-hook-form + zod → POST /api/audit-lead → GHL
- [x] ImageGallery.tsx — lightbox for project images
- [x] app/fillmypipeline/page.tsx — pipeline audit landing with AuditLeadForm
- [x] lib/ghl-api.ts — GoHighLevel CRM contact creation + workflow triggers

### ✅ Phase 4 — SEO & Infrastructure (COMPLETE)
- [x] generateMetadata() on every page (layout + per-route)
- [x] app/opengraph-image.tsx — edge runtime OG image generation
- [x] app/sitemap.ts — full XML sitemap (static + dynamic routes)
- [x] app/robots.ts — robots.txt generation
- [x] next/image optimization referenced in pages
- [x] vercel.json — cleanUrls, trailingSlash: false, security headers

---

## Phase 5 — Polish, QA & Launch (CURRENT / IN PROGRESS)

> **Status:** Phases 1–4 are complete. Phase 5 begins now.

### 5a — Frontend QA (frontend-excellence audit)
- [ ] Run `npm run lint` — resolve all lint errors
- [ ] Run `npm run build` — confirm zero build errors
- [ ] Keyboard-only flow through all pages (Header nav, forms, blog, gallery)
- [ ] Focus visibility — `:focus-visible` on all interactive elements
- [ ] Contrast check — amber-on-dark text at WCAG AA 4.5:1 (especially muted gray)
- [ ] Reduced-motion compliance — `prefers-reduced-motion` respected by Three.js scene
- [ ] Three.js: detect WebGL unavailability and show DOM fallback in HeroSection
- [ ] Three.js: confirm DPR cap and no render loop when canvas is offscreen/hidden
- [ ] Responsive: test mobile (375px), tablet (768px), laptop (1280px), wide (1600px)
- [ ] Horizontal scroll audit at all breakpoints
- [ ] Touch targets ≥ 44px on mobile (Header nav items, CTA buttons, form controls)
- [ ] Loading states on ContactSection and AuditLeadForm — prevent double-submit
- [ ] Error and success `aria-live` announcements on form submissions
- [ ] `alt` text audit — all content images in blog posts and project galleries
- [ ] Lighthouse / axe-core audit (Performance, Accessibility, Best Practices, SEO)

### 5b — Content & Data QA
- [ ] Verify all image paths in services.json and projects.json resolve under /images/
- [ ] Blog posts: `dangerouslySetInnerHTML` prose container styled with @tailwindcss/typography
- [ ] Pricing tiers: confirm pricing.json matches current service offering
- [ ] Site-config.json: verify nav links, metrics, and copyright year (update to 2026)

### 5c — API & CRM Integration Validation
- [ ] Set `GOHIGHLEVEL_API_KEY` in Vercel environment variables
- [ ] Set `GOHIGHLEVEL_BASE_URL` if using a custom subdomain
- [ ] End-to-end test: contact form → GHL contact created + workflow triggered
- [ ] End-to-end test: audit-lead form → GHL contact + pipeline workflow
- [ ] Confirm GHL workflow IDs match environment variables in .env
- [ ] Add rate-limiting or spam protection to /api/contact and /api/audit-lead

### 5d — Performance
- [ ] Replace any `<img>` with `next/image` (check blog post content)
- [ ] `next/font` for any custom fonts — check CLS with font fallback metrics
- [ ] Lazy-load Three.js HeroCanvas — `dynamic(() => import(...), { ssr: false })`
- [ ] Verify Three.js geometry/material/texture disposal on unmount
- [ ] Cap canvas DPR (already set `[1, 2]` — confirm on throttled mobile)
- [ ] Bundle analysis: `ANALYZE=true npm run build` to check client bundle size

### 5e — Deployment & DNS
- [ ] `vercel deploy --prod` from main branch
- [ ] Domain: point thekeithhopkins.com → Vercel nameservers or CNAME
- [ ] Verify HTTPS, www redirect, and cleanUrls behavior in production
- [ ] Smoke test all routes in production: /, /service, /service/[slug], /project, /project/[slug], /blog, /blog/[slug], /pricing, /fillmypipeline
- [ ] Verify OG images render correctly (use opengraph.xyz or similar)
- [ ] Submit sitemap to Google Search Console

---

## Key Notes

- **Image paths**: services.json / projects.json images may still reference `../../wp-content/uploads/...`. After copying to `public/images/`, update to `/images/...` absolute paths.
- **WP HTML content**: `posts.json` contains raw WordPress `content_html`. Wrap with `dangerouslySetInnerHTML` inside a `prose` container (`@tailwindcss/typography`).
- **generateStaticParams()**: Required on `service/[slug]` and `project/[slug]` pages for SSG. Slugs come from `services.json[].slug` and `projects.json[].slug`.
- **GoHighLevel**: `lib/ghl-api.ts` handles contact creation and workflow triggers. Both API routes (`/api/contact`, `/api/audit-lead`) call this. Configure `GOHIGHLEVEL_API_KEY` in Vercel env before deploying.
- **Three.js**: HeroCanvas is a Client Component. Confirm it is dynamically imported with `ssr: false` in HeroSection.tsx to prevent SSR issues.
- **Tailwind v4**: Uses CSS custom properties (not JS config theme). Design tokens are declared in `globals.css`. Avoid importing `tailwind.config.js` values directly.
- **vercel.json**: Already configured with `cleanUrls`, `trailingSlash: false`, and `X-Content-Type-Options` header.
