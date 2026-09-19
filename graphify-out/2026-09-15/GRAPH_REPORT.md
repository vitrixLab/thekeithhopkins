# Graph Report - thekeithhopkins-next  (2026-09-15)

## Corpus Check
- 53 files · ~1,281,381 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 312 nodes · 398 edges · 24 communities (15 shown, 8 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 9 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e0f73eea`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- dependencies
- layout.tsx
- types.ts
- devDependencies
- compilerOptions
- HeroCanvas.tsx
- utils.ts
- main.js
- README.md
- This is NOT the Next.js you know
- NEXTJS_MIGRATION_BLUEPRINT.md
- rules/graphify.md
- workflows/graphify.md
- CLAUDE.md
- eslint.config.mjs
- next.config.ts
- postcss.config.mjs
- cn
- AMIX Three.js Design & Architecture Analysis
- opengraph-image.tsx
- audit-lead/route.ts
- ghl-api.ts
- blog/[slug]/page.tsx

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `initGL()` - 9 edges
3. `cn()` - 9 edges
4. `buildWorld()` - 8 edges
5. `makeCanvasTexture()` - 7 edges
6. `buildCabinet()` - 7 edges
7. `Service` - 7 edges
8. `resolveImagePath()` - 7 edges
9. `include` - 7 edges
10. `drawSign()` - 5 edges

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

## Communities (24 total, 8 thin omitted)

### Community 0 - "dependencies"
Cohesion: 0.07
Nodes (29): clsx, @hookform/resolvers, lucide-react, next, dependencies, clsx, @hookform/resolvers, lucide-react (+21 more)

### Community 1 - "layout.tsx"
Cohesion: 0.15
Nodes (9): inter, metadata, siteConfig, Footer(), FooterProps, SOCIAL_LINKS, Header(), HeaderProps (+1 more)

### Community 2 - "types.ts"
Cohesion: 0.08
Nodes (24): metadata, services, siteConfig, FAQS, metadata, pricingTiers, ICONS, metadata (+16 more)

### Community 3 - "devDependencies"
Cohesion: 0.07
Nodes (27): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node (+19 more)

### Community 4 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 5 - "HeroCanvas.tsx"
Cohesion: 0.21
Nodes (6): HeroCanvas, NeonGrid(), NeonGridProps, ParticleField(), ParticleFieldProps, PostFX()

### Community 6 - "utils.ts"
Cohesion: 0.12
Nodes (13): metadata, projects, ProjectsIndexPage(), ProjectPageProps, projects, ICONS, ServiceDetailPage(), ServicePageProps (+5 more)

### Community 7 - "main.js"
Cohesion: 0.10
Nodes (32): buildCabinet(), buildCamPoses(), buildWorld(), cabinets, camPoses, camState, canvas, collectGames() (+24 more)

### Community 8 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 10 - "NEXTJS_MIGRATION_BLUEPRINT.md"
Cohesion: 0.15
Nodes (12): Data Layer — Type Definitions (lib/types.ts), Key Notes, Migration Phases, Overview, Phase 1 — Scaffold (Day 1), Phase 2 — Core Pages (Day 2-3), Phase 3 — Interactive & Forms (Day 4), Phase 4 — SEO & Deploy (Day 5) (+4 more)

### Community 17 - "cn"
Cohesion: 0.16
Nodes (11): AUDIT_STEPS, metadata, STATS, ContactSection(), FormData, PARTNERS, schema, AuditFormData (+3 more)

### Community 18 - "AMIX Three.js Design & Architecture Analysis"
Cohesion: 0.14
Nodes (12): 1.1 Color Palette & Contrast Strategy, 1.2 Typography Hierarchy, 1.3 Depth & Atmospheric Layers, 1. Visual Language & Aesthetic Formula, 2.1 DOM-Driven 3D Scene Generation, 2.2 Post-Processing Pipeline, 2.3 Scroll-Synchronized Camera Choreography, 2. Three.js WebGL Presentation Engine (`main.js`) (+4 more)

### Community 19 - "opengraph-image.tsx"
Cohesion: 0.33
Nodes (4): alt, contentType, runtime, size

### Community 21 - "ghl-api.ts"
Cohesion: 0.27
Nodes (10): contactSchema, POST(), createGHLContact(), getApiKey(), ghlApi, GHLContactInput, GHLResponse, GHLWorkflowTriggerInput (+2 more)

### Community 23 - "blog/[slug]/page.tsx"
Cohesion: 0.14
Nodes (11): BlogIndexPage(), metadata, posts, BlogPostPage(), PostPageProps, posts, posts, projects (+3 more)

## Knowledge Gaps
- **148 isolated node(s):** `auditSchema`, `contactSchema`, `posts`, `PostPageProps`, `posts` (+143 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 182 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `devDependencies`?**
  _High betweenness centrality (0.024) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `layout.tsx`, `types.ts`, `utils.ts`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **What connects `auditSchema`, `contactSchema`, `posts` to the rest of the system?**
  _148 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._
- **Should `types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08412698412698413 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._