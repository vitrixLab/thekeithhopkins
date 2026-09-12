# Next.js Migration Blueprint — thekeithhopkins.com
> Generated: 2026-09-12 · Source: Graphify AST Knowledge Graph (52 nodes, 60 edges, 9 communities)

---

## Overview

Migrating **thekeithhopkins.com** from WordPress/Elementor static export to **Next.js 14+ App Router** with TypeScript, Tailwind CSS, and Vercel deployment.

### Stack
| Layer | Choice |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| UI Primitives | lucide-react + clsx + tailwind-merge |
| Forms | react-hook-form + zod |
| Deployment | Vercel (vercel.json already present) |

---

## Route Mapping Matrix

| WordPress Source | Type | Next.js Target Route | Key Components | Data Source |
|---|---|---|---|---|
| index.html | Page | app/page.tsx | HeroSection, ServicesGrid, ProjectShowcase, ContactForm | services.json, projects.json |
| pricing/index.html | Page | app/pricing/page.tsx | PricingTable, FAQAccordion, ContactForm | pricing.json |
| service/* (5 services) | Dynamic Route | app/service/[slug]/page.tsx | ServiceHeader, ServiceDetails, DeliverablesList, ContactForm | services.json |
| project/* (3 projects) | Dynamic Route | app/project/[slug]/page.tsx | ProjectHeader, StrategyBreakdown, ImageGallery, ContactForm | projects.json |
| blog/* (4 posts) | Dynamic Route | app/blog/[slug]/page.tsx | PostHeader, PostBody, RelatedPosts | posts.json |
| fillmypipeline/index.html | Landing | app/fillmypipeline/page.tsx | PipelineHero, BenefitCards, AuditLeadForm | API route |

---

## Project File Structure

```
thekeithhopkins-next/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── pricing/page.tsx
│   ├── service/[slug]/page.tsx
│   ├── project/[slug]/page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── fillmypipeline/page.tsx
│   └── api/
│       ├── contact/route.ts
│       └── audit-lead/route.ts
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── SEOMetadata.ts
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── ServicesGrid.tsx
│   │   ├── ProjectShowcase.tsx
│   │   ├── PricingTable.tsx
│   │   ├── ServiceHeader.tsx
│   │   ├── ServiceDetails.tsx
│   │   └── DeliverablesList.tsx
│   └── ui/
│       ├── ContactForm.tsx
│       ├── AuditLeadForm.tsx
│       └── ImageGallery.tsx
├── lib/
│   ├── data/
│   │   ├── services.json
│   │   ├── projects.json
│   │   ├── posts.json
│   │   ├── pricing.json
│   │   └── site-config.json
│   ├── types.ts
│   └── utils.ts
├── public/images/
├── vercel.json
└── next.config.js
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

## Quickstart Commands

```bash
# 1. Initialize Next.js App Router project
npx create-next-app@latest thekeithhopkins-next `
  --typescript --tailwind --eslint --app `
  --src-dir=false --import-alias="@/*"

# 2. Install utilities
npm install lucide-react clsx tailwind-merge `
            react-hook-form @hookform/resolvers zod

# 3. Copy extracted data (PowerShell)
Copy-Item -Recurse -Force ..\thekeithhopkins\migration-data\* lib\data\
Copy-Item -Recurse -Force ..\thekeithhopkins\wp-content\uploads public\images
Copy-Item ..\thekeithhopkins\vercel.json vercel.json

# 4. Dev server
npm run dev
```

---

## Migration Phases

### Phase 1 — Scaffold (Day 1)
- [ ] create-next-app with TypeScript + Tailwind
- [ ] Copy migration-data/ to lib/data/
- [ ] Copy wp-content/uploads/ to public/images/
- [ ] Create lib/types.ts and lib/utils.ts
- [ ] Build Header.tsx and Footer.tsx from site-config.json
- [ ] Build root app/layout.tsx

### Phase 2 — Core Pages (Day 2-3)
- [ ] app/page.tsx — HeroSection + ServicesGrid + ProjectShowcase
- [ ] app/pricing/page.tsx — PricingTable (4 tiers)
- [ ] app/service/[slug]/page.tsx + generateStaticParams() for 5 services
- [ ] app/project/[slug]/page.tsx + generateStaticParams() for 3 projects
- [ ] app/blog/page.tsx + app/blog/[slug]/page.tsx for 4 posts

### Phase 3 — Interactive & Forms (Day 4)
- [ ] ContactForm.tsx with Zod validation -> POST /api/contact
- [ ] AuditLeadForm.tsx -> POST /api/audit-lead
- [ ] ImageGallery.tsx lightbox
- [ ] app/fillmypipeline/page.tsx

### Phase 4 — SEO & Deploy (Day 5)
- [ ] generateMetadata() on each page
- [ ] OpenGraph images (app/opengraph-image.tsx)
- [ ] next/image optimization for all uploads
- [ ] vercel.json already present — vercel deploy
- [ ] Domain redirect: thekeithhopkins.com -> Vercel

---

## Key Notes

- **Image paths**: All services.json / projects.json images reference ../../wp-content/uploads/... After copying to public/images/, update to /images/... absolute paths.
- **WP HTML content**: posts.json contains raw WordPress content_html. Use dangerouslySetInnerHTML wrapped in a styled prose container (@tailwindcss/typography) for blog post pages.
- **generateStaticParams()**: Required on service/[slug] and project/[slug] pages for SSG. Slugs come from services.json[].slug and projects.json[].slug.
- **API Routes**: app/api/contact/route.ts and app/api/audit-lead/route.ts — integrate with Resend, SendGrid, or a webhook.
- **vercel.json**: Already configured with cleanUrls, trailingSlash: false, and X-Content-Type-Options header. Ready for deployment.
