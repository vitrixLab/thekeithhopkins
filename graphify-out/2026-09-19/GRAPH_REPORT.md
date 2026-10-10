# Graph Report - thekeithhopkins-next  (2026-09-19)

## Corpus Check
- 56 files · ~1,286,194 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 366 nodes · 452 edges · 26 communities (15 shown, 10 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 9 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1956e934`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- dependencies
- layout.tsx
- types.ts
- devDependencies
- compilerOptions
- HeroCanvas.tsx
- service/[slug]/page.tsx
- main.js
- README.md
- This is NOT the Next.js you know
- Next.js Migration Blueprint — thekeithhopkins.com
- rules/graphify.md
- workflows/graphify.md
- CLAUDE.md
- eslint.config.mjs
- next.config.ts
- postcss.config.mjs
- utils.ts
- AMIX Three.js Design & Architecture Analysis
- opengraph-image.tsx
- audit-lead/route.ts
- ghl-api.ts
- Frontend Excellence
- bluetti/page.tsx
- machinebaseai/page.tsx

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `Frontend Excellence` - 13 edges
3. `cn()` - 9 edges
4. `initGL()` - 9 edges
5. `buildWorld()` - 8 edges
6. `Next.js Migration Blueprint — thekeithhopkins.com` - 8 edges
7. `Service` - 7 edges
8. `SiteConfig` - 7 edges
9. `resolveImagePath()` - 7 edges
10. `buildCabinet()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `ServiceDetailPage()` --indirect_call--> `resolveImagePath()`  [INFERRED]
  app/service/[slug]/page.tsx → lib/utils.ts
- `BlogPostPage()` --calls--> `formatDate()`  [EXTRACTED]
  app/blog/[slug]/page.tsx → lib/utils.ts
- `BlogIndexPage()` --calls--> `formatDate()`  [EXTRACTED]
  app/blog/page.tsx → lib/utils.ts
- `ProjectsIndexPage()` --calls--> `resolveImagePath()`  [EXTRACTED]
  app/project/page.tsx → lib/utils.ts
- `HeroSectionProps` --references--> `SiteConfig`  [EXTRACTED]
  components/home/HeroSection.tsx → lib/types.ts

## Import Cycles
- None detected.

## Communities (26 total, 10 thin omitted)

### Community 0 - "dependencies"
Cohesion: 0.07
Nodes (29): clsx, @hookform/resolvers, lucide-react, next, dependencies, clsx, @hookform/resolvers, lucide-react (+21 more)

### Community 1 - "layout.tsx"
Cohesion: 0.13
Nodes (11): metadata, playfair, siteConfig, sourceSans, spaceMono, Footer(), FooterProps, SOCIAL_LINKS (+3 more)

### Community 2 - "types.ts"
Cohesion: 0.07
Nodes (30): metadata, services, siteConfig, FAQS, metadata, pricingTiers, ICONS, metadata (+22 more)

### Community 3 - "devDependencies"
Cohesion: 0.07
Nodes (27): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node (+19 more)

### Community 4 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 5 - "HeroCanvas.tsx"
Cohesion: 0.20
Nodes (5): HeroCanvas, NeonGrid(), NeonGridProps, ParticleField(), ParticleFieldProps

### Community 6 - "service/[slug]/page.tsx"
Cohesion: 0.11
Nodes (13): metadata, projects, ProjectsIndexPage(), ProjectPageProps, projects, ICONS, ServiceDetailPage(), ServicePageProps (+5 more)

### Community 7 - "main.js"
Cohesion: 0.10
Nodes (32): buildCabinet(), buildCamPoses(), buildWorld(), cabinets, camPoses, camState, canvas, collectGames() (+24 more)

### Community 8 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 10 - "Next.js Migration Blueprint — thekeithhopkins.com"
Cohesion: 0.11
Nodes (18): 5a — Frontend QA (frontend-excellence audit), 5b — Content & Data QA, 5c — API & CRM Integration Validation, 5d — Performance, 5e — Deployment & DNS, Data Layer — Type Definitions (lib/types.ts), Key Notes, Migration Phases (+10 more)

### Community 17 - "utils.ts"
Cohesion: 0.10
Nodes (19): BlogIndexPage(), metadata, posts, BlogPostPage(), PostPageProps, posts, AUDIT_STEPS, metadata (+11 more)

### Community 18 - "AMIX Three.js Design & Architecture Analysis"
Cohesion: 0.14
Nodes (12): 1.1 Color Palette & Contrast Strategy, 1.2 Typography Hierarchy, 1.3 Depth & Atmospheric Layers, 1. Visual Language & Aesthetic Formula, 2.1 DOM-Driven 3D Scene Generation, 2.2 Post-Processing Pipeline, 2.3 Scroll-Synchronized Camera Choreography, 2. Three.js WebGL Presentation Engine (`main.js`) (+4 more)

### Community 19 - "opengraph-image.tsx"
Cohesion: 0.33
Nodes (4): alt, contentType, runtime, size

### Community 21 - "ghl-api.ts"
Cohesion: 0.27
Nodes (10): contactSchema, POST(), createGHLContact(), getApiKey(), ghlApi, GHLContactInput, GHLResponse, GHLWorkflowTriggerInput (+2 more)

### Community 23 - "Frontend Excellence"
Cohesion: 0.05
Nodes (36): 1. Customer experience and journey, 2. Frontend design and art direction, 3. UI visual systems, 4. Accessibility and interaction, 5. Responsive and adaptive layout, 6. Motion and physics, 7. Performance, 8. Visual and behavioral QA (+28 more)

## Knowledge Gaps
- **186 isolated node(s):** `posts`, `PostPageProps`, `posts`, `metadata`, `metadata` (+181 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 225 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **10 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `devDependencies`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **What connects `posts`, `PostPageProps`, `posts` to the rest of the system?**
  _186 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._
- **Should `layout.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13450292397660818 - nodes in this community are weakly interconnected._
- **Should `types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06765327695560254 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._