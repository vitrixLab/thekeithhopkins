# Graph Report - thekeithhopkins-next  (2026-09-13)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 182 nodes · 201 edges · 17 communities (10 shown, 7 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2faf6cc6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- dependencies
- layout.tsx
- page.tsx
- devDependencies
- compilerOptions
- HeroCanvas.tsx
- include
- package.json
- README.md
- This is NOT the Next.js you know
- NEXTJS_MIGRATION_BLUEPRINT.md
- rules/graphify.md
- workflows/graphify.md
- CLAUDE.md
- eslint.config.mjs
- next.config.ts
- postcss.config.mjs

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `include` - 7 edges
3. `NavItem` - 5 edges
4. `SiteConfig` - 5 edges
5. `cn()` - 5 edges
6. `Migration Phases` - 5 edges
7. `scripts` - 5 edges
8. `Service` - 4 edges
9. `lib` - 4 edges
10. `ContactSection()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `FooterProps` --references--> `NavItem`  [EXTRACTED]
  components/layout/Footer.tsx → lib/types.ts
- `HeaderProps` --references--> `NavItem`  [EXTRACTED]
  components/layout/Header.tsx → lib/types.ts
- `HeroSectionProps` --references--> `SiteConfig`  [EXTRACTED]
  components/home/HeroSection.tsx → lib/types.ts
- `ServicesSectionProps` --references--> `Service`  [EXTRACTED]
  components/home/ServicesSection.tsx → lib/types.ts
- `ContactSection()` --calls--> `cn()`  [EXTRACTED]
  components/home/ContactSection.tsx → lib/utils.ts

## Import Cycles
- None detected.

## Communities (17 total, 7 thin omitted)

### Community 0 - "dependencies"
Cohesion: 0.07
Nodes (29): clsx, @hookform/resolvers, lucide-react, next, dependencies, clsx, @hookform/resolvers, lucide-react (+21 more)

### Community 1 - "layout.tsx"
Cohesion: 0.10
Nodes (15): inter, metadata, siteConfig, ContactSection(), FormData, PARTNERS, TODO: wire to API route / GHL webhook, schema (+7 more)

### Community 2 - "page.tsx"
Cohesion: 0.12
Nodes (18): metadata, services, siteConfig, AboutSection(), PILLARS, ARTISTS, ArtistSection(), HeroSection() (+10 more)

### Community 3 - "devDependencies"
Cohesion: 0.11
Nodes (19): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node (+11 more)

### Community 4 - "compilerOptions"
Cohesion: 0.11
Nodes (19): dom, dom.iterable, esnext, compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules (+11 more)

### Community 5 - "HeroCanvas.tsx"
Cohesion: 0.21
Nodes (6): HeroCanvas, NeonGrid(), NeonGridProps, ParticleField(), ParticleFieldProps, PostFX()

### Community 6 - "include"
Cohesion: 0.20
Nodes (9): **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx, exclude (+1 more)

### Community 7 - "package.json"
Cohesion: 0.22
Nodes (8): name, private, scripts, build, dev, lint, start, version

### Community 8 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 10 - "NEXTJS_MIGRATION_BLUEPRINT.md"
Cohesion: 0.15
Nodes (12): Data Layer — Type Definitions (lib/types.ts), Key Notes, Migration Phases, Overview, Phase 1 — Scaffold (Day 1), Phase 2 — Core Pages (Day 2-3), Phase 3 — Interactive & Forms (Day 4), Phase 4 — SEO & Deploy (Day 5) (+4 more)

## Knowledge Gaps
- **93 isolated node(s):** `FormData`, `Metric`, `Post`, `PricingTier`, `Project` (+88 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 111 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **Why does `compilerOptions` connect `compilerOptions` to `include`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **What connects `FormData`, `Metric`, `Post` to the rest of the system?**
  _93 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._
- **Should `layout.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09971509971509972 - nodes in this community are weakly interconnected._
- **Should `page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12 - nodes in this community are weakly interconnected._