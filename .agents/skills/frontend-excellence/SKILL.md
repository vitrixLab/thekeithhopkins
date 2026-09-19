---
name: frontend-excellence
description: Audit and improve Next.js frontends across art direction, UI systems, accessibility, responsive UX, CX journeys, motion physics, performance, and visual QA. Use for any user-facing frontend review or implementation.
---

# Frontend Excellence

Use this skill when reviewing or changing a user-facing frontend. It combines visual design judgment with measurable usability, accessibility, customer-experience, motion, and performance checks.

This is an audit and implementation guide, not a license to decorate. A design decision must serve the user's goal, the product's identity, or a measurable quality improvement.

## Scope and priority

Apply the sections relevant to the change. For a complete page or feature review, apply all sections in this order:

1. Product intent and customer journey
2. Art direction and visual hierarchy
3. UI system and content structure
4. Accessibility and interaction behavior
5. Responsive behavior
6. Motion and physics
7. Runtime and loading performance
8. Visual and behavioral QA

When principles conflict, use this priority:

1. Safety, accessibility, and user comprehension
2. Functional correctness and recovery
3. Performance and resilience
4. Product and brand intent
5. Aesthetic preference

Never claim that an automated check proves accessibility or usability. Automated checks find a subset of defects; manual keyboard, screen-reader, viewport, content, and journey checks remain required.

## Repository-specific constraints

- This project uses Next.js `16.3.5`, React `19.2.8`, TypeScript, Tailwind CSS 4, and Three.js.
- Read the relevant Next.js guide in `node_modules/next/dist/docs/` before changing Next.js behavior.
- Use `graphify-out/wiki/index.md` for broad navigation and run a targeted graphify query for architecture questions when `graphify-out/graph.json` exists.
- After modifying code, run `graphify update .`.
- Prefer Server Components. Add a Client Component only when browser APIs, event handlers, state, or client-only libraries require it.
- Treat `Three.js`, post-processing, external widgets, fonts, images, and large client bundles as explicit performance costs.

## 1. Customer experience and journey

Start with the user's job, not the component tree.

### Audit questions

- Who is the visitor and what brought them here?
- What decision or action should they be able to complete?
- Does the first viewport explain what this is and what to do next?
- Does the page establish trust with real evidence rather than vague claims?
- Does every primary action lead to a working, understandable next step?
- Do loading, validation, error, success, and unavailable states preserve the user's context?
- Does the experience remain coherent when a link redirects to another domain?
- After an inquiry or form submission, does the user know what happened and what comes next?
- Can a user recover from a mistake without restarting the entire journey?

### Required journey map

For meaningful page or funnel changes, write a short map before implementation:

```text
Discover -> Understand -> Trust -> Act -> Confirm -> Continue
```

For each stage, record:

- user goal
- visible interface
- expected system response
- likely friction
- recovery path
- evidence or telemetry to validate the assumption

Do not add a section merely because a landing-page template commonly contains it. A section must support a user goal or an explicit business goal.

## 2. Frontend design and art direction

### Design read

Before building or substantially reshaping a page, declare:

- subject and audience
- primary job of the page
- visual personality
- focal point
- identity motif
- ENERGY, RHYTHM, and MOTION dials from `antislop`

If the project has no reliable design direction, label the result `draft without direction` and do not present a generic default as a finished brand system.

### Art-direction rules

- Ground palette, type, imagery, and texture in the product's subject matter.
- Choose the hero treatment because it best introduces the subject, not because every site has a hero.
- Spend boldness in one memorable place; keep supporting surfaces disciplined.
- Use typography as hierarchy and voice, not as decorative noise.
- Keep body line lengths generally below 80 characters.
- Use one or two type families with deliberate roles, weights, and line heights.
- Do not use all-caps labels, tracked eyebrows, numbered markers, arrows, or badges unless they encode real information.
- Do not default to blue-purple gradients, dark neon glows, generic bento grids, identical cards, or a template copied from another product.
- Do not force a golden-ratio split when the content, reading measure, or responsive layout needs another proportion.

### Composition principles

Use these as hypotheses, then verify optically:

- **Hierarchy:** scale, contrast, position, density, and whitespace should reveal importance.
- **Balance:** symmetry is optional; visual weight must still feel stable.
- **Contrast:** reserve strong contrast for meaningful focal points.
- **Rhythm:** repeat a pattern with controlled variation; avoid uniform section cadence.
- **Figure/ground:** ensure the subject remains distinct from atmospheric decoration.
- **Proximity:** group related labels, controls, and content; separate unrelated groups.
- **Similarity:** shared visual treatment should imply shared behavior.
- **Common region:** containers should clarify grouping, not create a card for every sentence.
- **Continuation:** alignment and directional flow should guide reading.
- **Closure:** use incomplete forms only when the viewer can understand the intended whole.
- **Unity and variety:** preserve a recognizable system while allowing meaningful difference.

## 3. UI visual systems

Build visual decisions as a small semantic system rather than isolated values.

### Token audit

Check that the interface has named roles for:

- page background
- surface and elevated surface
- primary, secondary, and muted text
- border and focus indicator
- brand accent
- success, warning, and error
- spacing scale
- type scale
- radii
- elevation
- motion duration and easing

Prefer semantic tokens:

```css
:root {
  --color-bg: #030712;
  --color-surface: #0f1629;
  --color-text: #f9fafb;
  --color-text-muted: #d1d5db;
  --color-accent: #fbbf24;
  --color-focus: #fcd34d;
}
```

Do not add another near-duplicate color or spacing value when an existing semantic token expresses the same role.

### Color

- Use lightness and contrast to establish hierarchy; hue alone must not carry meaning.
- Keep the active palette intentionally small: normally 2–3 core colors plus an accent, with semantic status colors as needed.
- Test text contrast against its actual background. Do not eyeball gray-on-gray.
- Test gradients, images, overlays, hover states, disabled states, and focus states at their worst visible point.
- Use OKLCH or another perceptual space when generating scales, but verify browser support and resulting contrast.
- Treat `color-mix()` as a tool for consistent relationships, not a substitute for checking the rendered result.

Normative baseline:

- WCAG AA normal text: at least 4.5:1.
- WCAG AA large text: at least 3:1.
- Non-text UI boundaries and indicators: at least 3:1 where required.
- Do not round a failing ratio up to a pass.

### Surfaces, radius, and elevation

- Use glass, blur, glow, gradients, and shadows only where they establish hierarchy or identity.
- Keep most surfaces grounded; elevation should communicate what is above what.
- Vary radius only when the component hierarchy benefits from it.
- Avoid applying the same capsule shape, shadow, blur, or glow to every element.
- Verify that decorative layers do not reduce text contrast or obscure focus.

### Content structure

- Use semantic headings in a meaningful hierarchy.
- Use links for navigation and buttons for actions.
- Keep labels, helper text, validation, and status messages close to the control they describe.
- Render real content lengths during review; short placeholders hide wrapping and overflow defects.

## 4. Accessibility and interaction

Use WCAG 2.2 AA as the practical baseline and WAI-ARIA Authoring Practices for widget behavior.

### Semantic and name checks

- Prefer native HTML elements before ARIA.
- Every interactive control has an accessible name and a visible purpose.
- Decorative images have empty alt text; informative images have useful alt text.
- Icons do not replace visible text when the action or meaning is not obvious.
- Heading levels, landmarks, lists, tables, and form labels reflect document structure.
- Do not use a clickable `div` or `span` when a button or link is correct.

### Keyboard and focus checks

- Every flow works without a pointer.
- Focus order follows the reading and task order.
- Every focusable element has a visible, unobscured `:focus-visible` state.
- Sticky headers, overlays, drawers, and banners do not cover the focused element.
- Dialogs trap focus when modal, close with Escape when appropriate, and return focus to the trigger.
- Menus, tabs, disclosures, comboboxes, sliders, and carousels follow their WAI-ARIA pattern.
- Do not remove browser focus outlines without a stronger replacement.

### Forms and asynchronous feedback

- Inputs have labels, useful autocomplete values, sensible input types, and instructions.
- Do not block paste.
- Keep the submit label while showing a loading indicator.
- Prevent double submission and explain whether the action is still processing.
- Announce asynchronous success and error updates with an appropriate `aria-live`.
- Point errors to the relevant field and explain how to fix them.
- Preserve entered values when validation fails.

### Motion and sensory checks

- Do not rely on color, motion, sound, or position alone to communicate a state.
- Provide a meaningful reduced-motion variant.
- Do not autoplay distracting motion near essential content.
- Do not disable zoom.
- Avoid mobile input text below 16px unless the user agent behavior is otherwise safely handled.

## 5. Responsive and adaptive layout

Mobile is a designed state, not a desktop layout squeezed into a phone.

### Layout checks

- Place breakpoints where content stops working, not where a device list says they belong.
- Test narrow phone, wide phone, tablet, small laptop, and wide desktop widths.
- Include intermediate layout states when the content needs them.
- Collapse, reorder, or simplify content intentionally.
- Use fluid type and spacing or deliberate mobile steps.
- Avoid `100vh` for content sections that should size to their content; use dynamic viewport units only when full height is intentional.
- Prevent horizontal overflow at every tested width.
- Preserve browser zoom and text scaling.
- Keep touch targets large enough and separated enough for reliable use; use 44px as a practical mobile target baseline.
- Give gestures a click/tap and keyboard alternative unless the gesture is essential.

### Container-query preference

When a component's layout depends on its own available width rather than the viewport, prefer a container query:

```css
.service-grid {
  container-type: inline-size;
  display: grid;
  gap: 1rem;
}

@container (min-width: 42rem) {
  .service-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
```

Use viewport media queries for page-level composition and container queries for reusable components.

## 6. Motion and physics

Motion must explain change, preserve continuity, or add deliberate delight.

### Motion decision

Before adding animation, state:

- what changed
- why the user benefits from seeing the change
- what property is animated
- duration and easing
- interruption behavior
- reduced-motion behavior
- performance cost

### Implementation rules

- Prefer CSS transitions and keyframes for simple UI motion.
- Prefer `transform` and `opacity` over layout-triggering properties such as `top`, `left`, `width`, and `height`.
- Use spring motion for physically meaningful dragging, snapping, or interruptible transitions, not as a generic effect.
- Use easing that matches the interaction: responsive exits can be quicker; entrances should not feel abrupt.
- Avoid applying the same fade-up, float, scale, and bounce sequence to every element.
- Keep one orchestrated page-load or reveal moment rather than animating every section by default.
- Stop or reduce offscreen animation work.
- Ensure canvas motion has a non-WebGL or reduced-motion fallback when it conveys important content.
- Respect `prefers-reduced-motion: reduce`:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

The exact fallback should preserve comprehension and state feedback; do not merely remove all transitions if that hides what changed.

## 7. Performance

Measure before optimizing and protect the user-visible path.

### Core Web Vitals

Audit loading, interactivity, and visual stability using field data where available and local tooling as a supplement. Pay particular attention to:

- LCP: the main content should appear promptly.
- INP: interactions should respond without long main-thread work.
- CLS: fonts, images, canvas, widgets, and dynamic sections must not shift the page unexpectedly.

Use the 75th percentile target when interpreting Core Web Vitals, segmented by mobile and desktop.

### Next.js and React checks

- Keep non-interactive content on the server where possible.
- Do not make a whole page a Client Component to support one interactive child.
- Use `next/image` with dimensions or an aspect ratio for content images.
- Use `next/font` consistently and verify fallback metrics do not cause layout shifts.
- Load third-party scripts with the least disruptive strategy that still meets the product need.
- Avoid serial data waterfalls; parallelize independent work.
- Keep route state shareable when tabs, filters, pagination, or expanded content affect the task.
- Verify loading, error, not-found, and redirect behavior.

### Three.js checks

- Lazy-load non-critical WebGL code.
- Detect unsupported WebGL and provide a useful DOM fallback.
- Respect reduced motion and avoid running an unnecessary render loop when the scene is hidden or inactive.
- Cap device pixel ratio where appropriate.
- Dispose geometries, materials, textures, render targets, and post-processing resources.
- Avoid expensive post-processing when a CSS or simpler visual treatment communicates the same idea.
- Test on a throttled mobile CPU/GPU, not only a high-end desktop.

### Third-party and asset checks

- Defer chat, analytics, and other non-critical widgets.
- Avoid large assets when a smaller format or responsive variant is sufficient.
- Reserve space for images, embeds, and widgets before they load.
- Inspect bundle impact before adding a library for a small interaction.

## 8. Visual and behavioral QA

Before delivery, produce an audit record with evidence, not a statement that the page “looks good.”

### Required pass

- Run the existing lint command: `npm run lint`.
- Run `npm run build` when routing, metadata, rendering, dependencies, or production behavior changed.
- Run `graphify update .` after code changes.
- Exercise every visible link, button, form control, menu, dialog, disclosure, carousel, and gesture alternative.
- Repeat the main flow with keyboard only.
- Check focus, loading, empty, disabled, success, validation, error, timeout, and unavailable states.
- Check at least one narrow, one intermediate, and one wide viewport.
- Check browser zoom and text wrapping.
- Check `prefers-reduced-motion`.
- Run an accessibility tool such as Lighthouse or axe when available, then manually inspect its blind spots.
- Capture screenshots when visual hierarchy, spacing, or responsive composition changed.

### Audit report format

```md
## Frontend audit

### Scope
- Routes:
- Components:
- Viewports:
- Assistive settings:

### Findings
1. [HIGH][A11Y] ...
   - Evidence:
   - Principle or criterion:
   - Recommended fix:

### Verified
- [ ] Keyboard flow
- [ ] Focus visibility
- [ ] Contrast
- [ ] Reduced motion
- [ ] Responsive widths
- [ ] Loading and error states
- [ ] Lighthouse/axe follow-up
- [ ] Lint/build
```

Rank findings by user harm and task impact:

- **HIGH:** blocks access, causes data loss, breaks a primary journey, or makes content unreadable.
- **MEDIUM:** creates substantial friction, confusion, or degraded behavior in a common state.
- **LOW:** polish, consistency, or non-critical refinement.

## Anti-patterns

Do not:

- invoke Fibonacci or the golden ratio as proof that a layout is beautiful
- use a design law to justify unreadable text, cramped controls, or broken responsive behavior
- call a color palette accessible without computing or testing contrast
- treat Lighthouse or axe as a complete accessibility certification
- animate because a library makes animation easy
- add a card, badge, gradient, glow, or divider only to fill empty space
- fabricate statistics, testimonials, customer names, performance claims, or accessibility claims
- replace a real user journey review with a screenshot-only review

## Final delivery gate

Do not ship until:

- the main user goal is clear
- visual decisions have a product-specific reason
- interactions work with keyboard and pointer
- focus and state feedback are visible
- content remains readable at tested widths and zoom levels
- reduced motion is respected
- important canvas content has a fallback
- loading and interaction performance are measured or consciously bounded
- all findings are either fixed or explicitly accepted with evidence
