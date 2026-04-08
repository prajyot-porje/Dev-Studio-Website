# Dev Studio — Website Change Specification
> Version: 1.0 | Prepared by: Prajyot Porje
> Reference: Read `design.md` before touching any section. Preserve all existing tokens, brand colors, and animation infrastructure unless explicitly told otherwise.

---

## SECTION 1 — HERO SECTION

### 1.1 Eyebrow Tag Spacing
**Problem:** The two eyebrow tags have too large a gap between themselves and the main heading below.
**Fix:**
- Apply tight proximity grouping (Gestalt: Law of Proximity). Elements that belong together must breathe together.
- Reduce `margin-bottom` on the eyebrow tag container to no more than `8px–12px` before the heading. Use the 4pt grid: acceptable values are `8px`, `12px`.
- The gap between the two eyebrow tags themselves should also be reviewed — keep it at `6px–8px` max if they are stacked.
- Do not change any font size, color, or animation on the eyebrow tags.

### 1.2 Left/Right Heading Symmetry
**Problem:** Left heading is 3 lines with a larger font; right heading is 2 lines with smaller font — creates visual imbalance.
**Fix:**
- Make the **left heading match the right heading**: same font-size, same line-height, same line count (2 lines).
- Reduce the left heading font size until it fits on 2 lines. Use the Perfect Fourth scale for reference (`--text-3xl` / `--text-2xl` depending on breakpoint).
- Ensure the heading does **not** overlap the Spline robot in any viewport. Test at 1280px, 1440px, and 1920px wide.
- Do not change right heading's size — calibrate left to match right.
- Tighten `letter-spacing` to `-0.03em` on both headings to save horizontal space.

### 1.3 Description Text Size
**Problem:** Both description texts are too small — not leveraging type scale correctly.
**Fix:**
- Apply `--text-md` (1.333rem / ~21px using Perfect Fourth scale) as minimum for description text.
- Line-height: `1.6` for readability at this size.
- Letter-spacing: `0.01em` — neutral/slightly open for body text.
- Apply same size to **both** left and right descriptions for visual consistency.
- Do not change font family or weight.

### 1.4 Silver Effect on Descriptions and Eyebrow Tags
**Problem:** Descriptions and eyebrow tags need a premium metallic silver finish.

**Dark Mode:**
- Apply a linear gradient on the text using `background-clip: text` + `color: transparent`.
- Gradient: `linear-gradient(135deg, #E8E8E8 0%, #A0A0A0 40%, #C8C8C8 70%, #787878 100%)`
- This creates the silver sweep effect — lighter highlight at top-left, darker shadow at bottom-right.
- Use `WebkitBackgroundClip: text` for cross-browser support.

**Light Mode:**
- Silver on white washes out. Instead use a slightly warmer silver:
- Gradient: `linear-gradient(135deg, #6B6B6B 0%, #3A3A3A 40%, #5A5A5A 70%, #2A2A2A 100%)`
- This reads as premium charcoal-silver — still metallic but legible on light backgrounds.
- Ensure contrast ratio is minimum 4.5:1 against the light mode background.

**Implementation note:** Wrap description and eyebrow text in a `<span>` with the gradient applied via `style` or a utility class. Do not apply to main headings.

### 1.5 Robot Background — Light Mode Adjustment
**Problem:** The robot's background is excellent in dark mode but looks off in light mode.
**Fix:**
- Dark mode background: **DO NOT CHANGE**. Preserve as-is.
- Light mode: adjust the Spline scene container or overlay:
  - Add a subtle radial gradient overlay on the robot container in light mode only: `radial-gradient(ellipse at center, rgba(255,255,255,0) 40%, rgba(247,247,245,0.6) 100%)`
  - This softly fades the edges so the robot integrates into the light background without a jarring cutoff.
  - Do not alter the Spline component props or the 3D scene itself — only the CSS wrapper.
  - If there's a background color behind the robot in light mode, switch it to the page's `--bg-primary` token.

---

## SECTION 2 — SERVICES SECTION

### 2.1 Card Layout & Content Replacement
**Changes:**
1. **Web Dev card → Center position.** Move the Web Development card to the horizontal center of the card grid/layout. Do not alter its internal content or animations.
2. **Remove "Digital Presence Management" card entirely.** Replace it with two new cards:
   - **Card: SEO** — Search Engine Optimisation. Write concise, benefit-led copy (2–3 lines max). Icon: use a search/chart-up 3D icon.
   - **Card: AEO** — Answer Engine Optimisation. Write copy focused on AI-driven visibility (2–3 lines max). Icon: use an AI/brain 3D icon.
3. Both new cards must visually match the existing card dimensions and external styling.

### 2.2 Dark Mode Compatibility
**Problem:** Cards currently show a white background in dark mode.
**Fix:**
- Replace hardcoded `background: white` or `bg-white` with the design system token: `var(--card-bg)` or `var(--bg-surface)`.
- Dark mode card background should be: `oklch(12% 0 0)` or equivalent dark surface token from `design.md`.
- Card border in dark mode: `1px solid oklch(20% 0 0 / 0.6)` — subtle, not absent.
- Card text in dark mode: use `var(--text-primary)` — must be legible against the dark card surface.
- Light mode remains unchanged (white/light surface is correct for light mode).

### 2.3 Internal Card Layout — Apple-Level Premium
**Problem:** Internal card layout (text hierarchy, icon placement) is weak.

**Icon Upgrade:**
- Replace current icons with **3D icons**. Recommended library: **Iconscout 3D icons** (free tier available, React-compatible via img/next-image), or use **Spline-embedded 3D icons** if already in the stack.
- Alternative: use [Icons8 3D Fluency](https://icons8.com/icons/style--3d) — export as PNG/WebP, use via `<Image>` in Next.js.
- Icon size: `48px × 48px` for card icons. Render at `2x` for retina.

**Internal Layout Spec:**
```
Card internal layout (top → bottom):
  [Icon]                          ← 48×48, top-left or top-center
  [Service Name]                  ← --text-md, font-weight: 600, mt: 16px
  [One-line tagline/descriptor]   ← --text-sm, color: var(--text-secondary), mt: 4px
  [Description body]              ← --text-sm, color: var(--text-tertiary), mt: 12px, line-height: 1.6
  [Bottom: subtle CTA or arrow]   ← optional, very subtle, bottom-right
```

**Spacing rules:**
- Padding inside card: `24px` on all sides.
- Gap between icon and title: `16px`.
- Gap between title and body: `8px`.
- All values on the 4pt grid.

**Typography:**
- Service name: `font-size: 1.1rem`, `font-weight: 600`, `letter-spacing: -0.01em`
- Body text: `font-size: 0.875rem`, `font-weight: 400`, `line-height: 1.65`

**Do NOT change:** card shape, drop shadows, hover animations, fan/deck spread animation, card scale on hover, or any external interaction. Only internal content layout changes.

### 2.4 Section Headline — 2-Line Rewrite
**Problem:** "Services built for growth. Delivered with precision." wraps to 3 lines.
**New Headline Options (2 lines max, test and pick best fit):**

Option A:
```
Built to grow.
Engineered to perform.
```

Option B:
```
Services that scale.
Precision that shows.
```

Option C:
```
Growth-ready services.
Delivered with precision.
```

Option D (recommended — premium, punchy):
```
The services your business
was built to grow with.
```

**Implementation rules:**
- Use a `<br />` or split into two `<span>` blocks to enforce the 2-line break at the intended word.
- Font size and weight remain the same — only the copy changes.
- Choose whichever option fits the existing max-width container in exactly 2 lines at 1280px+ viewport.

---

## SECTION 3 — WHY CHOOSE US SECTION

### 3.1 Performance Optimisation
**Problem:** Scroll performance degrades due to heavy simultaneous animations.
**Fix:**
- Audit all animations in this section. Apply `will-change: transform` **only** to elements that are actively animating — not globally.
- Replace any `transition: all` with specific property transitions (e.g., `transition: transform 300ms, opacity 200ms`).
- Wrap all scroll-triggered animations with `prefers-reduced-motion` override:
```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```
- Batch DOM reads/writes — avoid layout thrashing inside scroll listeners.
- Use `IntersectionObserver` for reveal animations instead of scroll event listeners where possible.
- GPU-composite properties only: `transform`, `opacity`. Never animate `width`, `height`, `top`, `left`, `margin`, or `padding`.

### 3.2 Future-Ready Technology Card — Marquee → Offset Grid
**Problem:** Marquee animation is a performance and aesthetic issue.
**Replacement: Static 5×2 offset icon/tech grid.**

**Layout spec:**
- Grid: 5 columns × 2 rows = 10 tech items.
- Row 1 (top): aligned normally.
- Row 2 (bottom): offset by `translateX(calc(item-width / 2 + gap / 2))` — creates a brick-pattern, visually staggered feel.
- Each item: tech icon + label, `60px × 60px` total footprint.
- Gap between items: `12px` horizontal, `8px` vertical.
- Icons: use existing tech icons from the project or source from Simple Icons / Devicons.
- No animation on this grid. Static. The premium feel comes from the layout itself.
- The card's external appearance (bg, border, shadow, scale hover) stays unchanged.

**Grid offset CSS:**
```css
.tech-row-2 {
  transform: translateX(calc(var(--item-w) / 2 + var(--gap) / 2));
}
```

### 3.3 "One Contact. Full Delivery." Card — Remove Moving Border
**Problem:** Moving border animation is performance-heavy and feels cheap at this design level.
**Fix:**
- **Remove** the moving/animated border entirely.
- **Preserve strictly:** All node visuals, connection lines, any dot/pulse animations on nodes, and the underlying graph/network visual. Only the outer card border animation is removed.
- **New premium card border treatment:**
  - Dark mode: `border: 1px solid oklch(30% 0 0 / 0.7)` with a very subtle `box-shadow: 0 0 0 1px oklch(40% 0 0 / 0.15), 0 4px 24px oklch(0% 0 0 / 0.4)` — gives depth without motion.
  - Light mode: `border: 1px solid oklch(88% 0 0)` with `box-shadow: 0 2px 12px oklch(0% 0 0 / 0.06), 0 1px 3px oklch(0% 0 0 / 0.04)`.
  - On hover: elevate the shadow slightly — `box-shadow` intensity increases, no border animation.
- The card should feel expensive and still — like a premium hardware product card from Apple's site.

---

## SECTION 4 — WORK SECTION

### 4.1 Replace Horizontal Scroll with Bending Card Carousel
**Reference file:** `bendinggallery.vue` (provided in project).
**Task:** Port the bending card carousel mechanic from Vue to Next.js/React, adapted for large project cards (not images).

**Porting requirements:**
- Replicate the bending/curved perspective transform as cards scroll past centre.
- The curve/bend effect should be driven by the card's position relative to the carousel centre. Cards at centre = flat. Cards to the left/right = bent inward.
- Cards are large (likely `360px–480px` wide, `480px–600px` tall) — ensure the scale of the bend animation suits these dimensions. A card of this size needs a **gentler** bend angle than a small image thumbnail.
  - Suggested: `perspective: 1200px`, `rotateY` max `±18deg` at the furthest position.
- Use `useRef` + `useEffect` + `requestAnimationFrame` for smooth scroll tracking. Do not use scroll event listeners that block the main thread.
- The carousel should be drag-scrollable on desktop and swipe-enabled on mobile.
- Navigation arrows (prev/next) should also be present.
- Smooth interpolation: use `lerp` (linear interpolation) for the transform values so motion feels physically smooth, not snapping.
- Easing on release: decelerate naturally like momentum scrolling.

**Card content stays exactly the same.** Only the container and scroll mechanic changes.

### 4.2 Work Section Sticky Overlap Effect
**Problem:** Once the Work section becomes sticky, it should remain in place while the next section (Testimonials) scrolls over it, creating a layered overlap / stacking effect.

**Reference:** This overlap effect is already implemented between the Testimonials section and the Contact Us section in this project. Use the exact same mechanic.

**Implementation:**
- Set the Work section wrapper to `position: sticky; top: 0; z-index: 1`.
- The Testimonials section must have `position: relative; z-index: 2` and a solid background so it visually covers the Work section as it scrolls up.
- If a background gradient or blur is already used at the Testimonials section top edge in the existing effect — replicate the same here.
- The sticky should activate only once the Work section is fully in view (not during scroll-in). Use the same `threshold` and `rootMargin` values as the existing implementation.
- Do not break the bending carousel interaction while the section is sticky.

---

## SECTION 5 — FOOTER

### 5.1 Footer Text Animation — Smooth Fix
**Problem:** Footer text animations are laggy and stutter visibly.

**Diagnosis checklist:**
1. Are the animations driven by `setInterval` or `setTimeout`? Replace with `requestAnimationFrame`.
2. Is there a GSAP or Framer Motion animation running on text that is not GPU-composited? Move to `transform`/`opacity` only.
3. Is the animation re-triggering on every scroll event? Debounce or use `IntersectionObserver` to trigger once.
4. Is `will-change: transform` missing on the animated text container? Add it before animation starts, remove after.

**Fix spec:**
- Text animation must run at **60fps locked**. Test with Chrome DevTools Performance tab.
- Use `transform: translateY()` and/or `opacity` for all text entrance animations — never `top`, `margin-top`, or font-size transitions.
- If the animation is a character-by-character or word-by-word stagger, batch the stagger using GSAP's `stagger` utility or Framer Motion's `variants` with `staggerChildren` — do not create individual `setTimeout` per element.
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo equivalent) for text entrance.
- Duration: `0.6s` per element. Stagger delay: `0.04s` per child.
- Add `prefers-reduced-motion` override to skip animation entirely.

---

## GLOBAL RULES FOR THIS CHANGESET

1. **Read `design.md` first.** All token names, color values, font choices, and animation curves must be sourced from there. Do not invent new design tokens.
2. **Do not refactor working code.** Only change what is listed. If a file is not mentioned, do not touch it.
3. **Dark/Light mode:** Every visual change must be tested in both modes. Use Tailwind `dark:` variants or CSS `[data-theme="dark"]` selectors as established in the project.
4. **Animation preservation:** Where a change says "remove X animation", only X is removed. All other animations on that element/card/section survive untouched.
5. **Icons library:** For 3D icons in Services cards, prefer a CDN-hosted or npm-installed solution that does not require a paid API at runtime. Iconscout's free 3D pack or Icons8 static exports are acceptable.
6. **Commit hygiene:** Each section's changes should be a separate commit with a descriptive message. Do not bundle all changes into one commit.