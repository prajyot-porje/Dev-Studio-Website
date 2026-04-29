# Dev Studio — Design Document

> **Version:** 1.0  
> **Last Updated:** April 2026  
> **Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · GSAP · Spline 3D · Lenis

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Architecture & File Structure](#2-architecture--file-structure)
3. [Design System & Tokens](#3-design-system--tokens)
4. [Theming — Light & Dark Mode](#4-theming--light--dark-mode)
5. [Typography](#5-typography)
6. [Color Palette](#6-color-palette)
7. [Component Hierarchy & Layout](#7-component-hierarchy--layout)
8. [Section-by-Section Breakdown](#8-section-by-section-breakdown)
9. [Animation & Motion System](#9-animation--motion-system)
10. [Responsive Design Strategy](#10-responsive-design-strategy)
11. [Performance Optimization](#11-performance-optimization)
12. [UI Component Library](#12-ui-component-library)
13. [Third-Party Integrations](#13-third-party-integrations)
14. [SEO & Analytics](#14-seo--analytics)
15. [Deployment & Build](#15-deployment--build)

---

## 1. Project Overview

**Dev Studio** is a premium single-page agency website for a web development, AI integration, and digital presence studio based in Pune, India — serving clients globally (US, India, EU).

### Goals

- **Premium first impression** — 3D Spline hero, glassmorphism, micro-animations
- **High conversion** — Multi-step contact form with budget/service selector
- **Performance** — Mobile PageSpeed 76+, desktop 90+, optimized for Core Web Vitals
- **Dark/Light theming** — Instant toggle with `data-theme` attribute, no FOUC
- **Mobile-first responsive** — Separate mobile hero, adaptive layouts at every breakpoint

### Target Audience

- Startup founders needing a technical partner
- Business owners needing a professional online presence
- US/EU/India clients looking for cost-effective premium development

---

## 2. Architecture & File Structure

```
├── app/
│   ├── layout.tsx              # Root layout (fonts, metadata, providers, GTM)
│   ├── page.tsx                # Home — assembles all sections
│   ├── globals.css             # Design tokens, base styles, animations
│   ├── favicon.ico
│   ├── components/
│   │   ├── Navbar.tsx          # Glassmorphic expanding navbar
│   │   ├── HeroSection.tsx     # 3D Spline hero (desktop) / editorial (mobile)
│   │   ├── ServicesSection.tsx  # Stacked→spread card animation
│   │   ├── WhyChooseUs.tsx     # 6-card bento grid with interactive visuals
│   │   ├── ProcessSection.tsx  # 4-step timeline with beam animation
│   │   ├── AboutSection.tsx    # Two-column editorial + animated counters
│   │   ├── WorkSection.tsx     # Carousel project showcase (sticky scroll)
│   │   ├── ProjectCard.tsx     # Individual project card + CSS module
│   │   ├── ProjectCard.module.css
│   │   ├── TestimonialsSection.tsx  # Stacking card testimonials
│   │   ├── ContactSection.tsx  # Multi-step wizard contact form
│   │   ├── Footer.tsx          # Link columns + giant animated brand text
│   │   ├── ThemeProvider.tsx   # Context-based theme management
│   │   └── WhyUsSection.tsx    # Alternate "Why Us" (legacy/unused)
│   └── hooks/
│       └── useIntersectionObserver.ts  # Custom scroll-triggered visibility
│
├── components/                 # Shared / reusable components
│   ├── LoadingContext.tsx       # Spline loading state + LazyMotion provider
│   ├── SmoothScroll.tsx        # Lenis smooth scroll wrapper
│   ├── ThemeToggle.tsx         # Theme toggle button
│   ├── globe.tsx               # Interactive 3D globe (cobe)
│   ├── hexagon.tsx             # SVG hexagon background pattern
│   ├── ui/
│   │   ├── SplineScene.tsx     # Spline 3D scene loader with fade-in
│   │   ├── PageLoader.tsx      # Full-screen loading screen with progress
│   │   ├── ripple-element.tsx  # Material-style ripple click effect
│   │   ├── animated-text.tsx   # Character-by-character text animation
│   │   ├── animated-theme-toggler.tsx  # Sun/moon theme toggle
│   │   ├── shine-border.tsx    # Animated gradient border effect
│   │   ├── dot-pattern.tsx     # SVG dot pattern background
│   │   ├── SectionReveal.tsx   # Scroll-triggered section reveal
│   │   ├── Progress.tsx        # Progress bar component
│   │   ├── DashboardScreen.tsx # UI mockup for bento card
│   │   └── TabletMockup.tsx    # Device frame mockup
│   └── animate-ui/            # Animation UI components (shadcn registry)
│
├── hooks/
│   └── use-is-in-view.tsx      # InView detection hook
│
├── lib/
│   ├── utils.ts                # cn() utility (clsx + tailwind-merge)
│   └── get-strict-context.tsx  # Type-safe context factory
│
├── public/
│   ├── icons/                  # Tech stack SVG logos (10 icons)
│   ├── kiyomi.png              # Project screenshot
│   ├── namrl.png               # Project screenshot
│   ├── macbook.png             # Service card asset
│   ├── magnifying-glass.png    # Service card asset
│   ├── robot.png               # Service card asset
│   ├── thunder.png             # Performance card asset
│   ├── noise.png               # Texture overlay
│   └── DMWL.pdf                # Downloadable document
│
├── next.config.ts              # Bundle analyzer + CSS optimization
├── tsconfig.json               # TypeScript strict mode, path aliases
├── components.json             # Shadcn UI configuration
├── postcss.config.mjs          # Tailwind CSS PostCSS plugin
├── eslint.config.mjs           # ESLint with Next.js core-web-vitals
└── package.json                # Dependencies and scripts
```

### Provider Hierarchy

```
<html> (data-theme, font variables)
  <body>
    <ThemeProvider>              ← Theme context (light/dark)
      <SmoothScroll>            ← Lenis smooth scrolling
        <LoadingProvider>       ← Loading state + LazyMotion
          <PageLoader />        ← Full-screen loader (until Spline ready)
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LoadingProvider>
      </SmoothScroll>
    </ThemeProvider>
  </body>
</html>
```

---

## 3. Design System & Tokens

All design tokens are defined as CSS custom properties in `globals.css` under `:root` and `[data-theme="dark"]`.

### Spacing

| Token                | Value                       |
| -------------------- | --------------------------- |
| `--section-padding`  | `clamp(4rem, 10vh, 8rem)`   |
| `--container-max`    | `1280px`                    |
| `--container-padding`| `clamp(1.5rem, 4vw, 4rem)`  |

### Border Radius

| Token           | Value    |
| --------------- | -------- |
| `--radius-sm`   | `8px`    |
| `--radius-md`   | `12px`   |
| `--radius-lg`   | `16px`   |
| `--radius-xl`   | `24px`   |
| `--radius-2xl`  | `32px`   |
| `--radius-full` | `9999px` |

### Transitions

| Token              | Value                            |
| ------------------ | -------------------------------- |
| `--ease-out`       | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `--ease-spring`    | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| `--duration-fast`  | `200ms`                          |
| `--duration-normal`| `400ms`                          |
| `--duration-slow`  | `600ms`                          |
| `--duration-slower`| `800ms`                          |

### Elevation System

Cards use a multi-layered shadow system (shell + inner):

- **Shell (outer):** 5-layer shadow stack for depth perception
- **Inner:** Inset highlights + progressive blur shadows
- **Hover:** Enhanced shadow depth + subtle translateY lift

---

## 4. Theming — Light & Dark Mode

### Implementation

1. **FOUC Prevention:** Inline `<script>` in `<head>` reads `localStorage` before paint
2. **Context:** `ThemeProvider` manages state via React Context
3. **Attribute:** `data-theme="light|dark"` on `<html>`
4. **Storage:** `localStorage.setItem('devstudio-theme', theme)`
5. **Default:** System preference via `prefers-color-scheme`

### Light Mode Palette

| Token              | Value                        |
| ------------------ | ---------------------------- |
| `--bg-primary`     | `#ffffff`                    |
| `--bg-secondary`   | `#f5f5f7`                    |
| `--text-primary`   | `#1d1d1f`                    |
| `--text-secondary` | `#6e6e73`                    |
| `--glass-bg`       | `rgba(255, 255, 255, 0.65)`  |
| `--card-bg`        | `rgba(255, 255, 255, 0.7)`   |
| `--hero-bg`        | `#F7F7F5`                    |

### Dark Mode Palette

| Token              | Value                         |
| ------------------ | ----------------------------- |
| `--bg-primary`     | `#000000`                     |
| `--bg-secondary`   | `#0a0a0a`                     |
| `--text-primary`   | `#f5f5f7`                     |
| `--text-secondary` | `#a1a1a6`                     |
| `--glass-bg`       | `rgba(28, 28, 30, 0.65)`     |
| `--card-bg`        | `rgba(28, 28, 30, 0.6)`      |
| `--hero-bg`        | `#0D0D0D`                     |

### Card Shell Theming (Bento / Services / Process)

Every card uses a **two-layer approach**:

```
┌─────────────────────────┐  ← Shell (#ECEDEF light / #121316 dark)
│  ┌───────────────────┐  │
│  │                   │  │  ← Inner (gradient: white→#F7F8FA light
│  │   Card Content    │  │         #1a1c20→#060708 dark)
│  │                   │  │
│  └───────────────────┘  │
└─────────────────────────┘
```

---

## 5. Typography

### Font Stack

| Font      | Variable         | Usage                    |
| --------- | ---------------- | ------------------------ |
| **Poppins** | `--font-sans`  | Primary — headings, body |
| **Inter**   | `--font-inter` | Available for UI text    |

Both fonts are loaded via `next/font/google` with `display: "swap"` and `preload: true`.

### Type Scale

| Token           | Value                         | Usage              |
| --------------- | ----------------------------- | ---------------    |
| `--text-hero`   | `clamp(3rem, 8vw, 7rem)`     | Hero heading       |
| `--text-footer` | `clamp(4rem, 15vw, 15rem)`   | Giant footer text  |
| `--text-5xl`    | `3rem`                        | Section headings   |
| `--text-3xl`    | `1.875rem`                    | Mobile headings    |
| `--text-lg`     | `1.125rem`                    | Subtext            |
| `--text-base`   | `1rem`                        | Body text          |
| `--text-sm`     | `0.875rem`                    | Labels, nav links  |
| `--text-xs`     | `0.75rem`                     | Eyebrows, fine text|

### Heading Style

- **Weight:** 700 (bold), 400 (thin/light contrast)
- **Letter Spacing:** `-0.03em` to `-0.04em` (tight)
- **Line Height:** `1.05` to `1.1`
- **Eyebrows:** `0.625rem`, weight 600, uppercase, `letter-spacing: 0.15em`

---

## 6. Color Palette

### Accent Colors

| Name                  | Light             | Dark              |
| --------------------- | ----------------- | ----------------- |
| `--accent-blue`       | `#0052FF`         | `#3B7BFF`         |
| `--cta-bg`            | `#1d1d1f`         | `#f5f5f7`         |
| `--cta-text`          | `#ffffff`         | `#000000`         |

### Glass Effects

| Property   | Light                           | Dark                            |
| ---------- | ------------------------------- | ------------------------------- |
| Background | `rgba(255, 255, 255, 0.65)`     | `rgba(28, 28, 30, 0.65)`       |
| Border     | `rgba(255, 255, 255, 0.5)`      | `rgba(255, 255, 255, 0.1)`     |
| Blur       | `24px`                          | `24px`                          |

---

## 7. Component Hierarchy & Layout

### Page Flow (Scroll Order)

```
1. HeroSection        — 100dvh, Spline 3D / mobile editorial
2. ServicesSection     — 100vh, stacked→spread card animation
3. WhyChooseUs        — Bento grid, 6 interactive cards
4. ProcessSection     — 4-step cards + animated beam timeline
5. AboutSection       — Editorial layout + animated counters
6. WorkSection        — 150vh sticky, carousel project cards
7. TestimonialsSection — 100vh sticky, stacking testimonial cards
8. ContactSection     — Multi-step wizard form
```

### Dynamic Imports (Code-Splitting)

Eagerly loaded (above fold):
- `HeroSection`
- `ServicesSection`

Lazily loaded via `next/dynamic`:
- `WhyChooseUsSection`, `ProcessSection`, `WorkSection`
- `TestimonialsSection`, `AboutSection`, `ContactSection`

---

## 8. Section-by-Section Breakdown

### 8.1 Navbar

- **Type:** Fixed, glassmorphic pill
- **Behavior:** Starts collapsed (140px) → expands to full width (1400px) with staggered link reveals
- **Desktop:** Logo | Nav Links (5) | Theme Toggle | CTA Button
- **Mobile:** Logo | Theme Toggle | Hamburger → Full-screen overlay menu
- **Effects:** `backdrop-filter: blur(20px) saturate(180%)`, scroll-aware shadow

### 8.2 Hero Section

**Desktop:**
- Full-viewport Spline 3D robot scene as background
- Two-column heading layout: "Dev Studio / Digital Agency"
- Silver gradient text effect on headings
- Subtext with decorative top-line dividers
- Centered CTA row: "Contact us" (filled) + "View our Work" (outlined glass)
- Radial glow overlay + bottom edge fade

**Mobile:**
- Decorative grid lines (vertical + horizontal hairlines)
- Atmospheric glow orb (animated float)
- Brand mark overline with dash
- Large editorial heading: "We build websites that **win clients.**"
- Glassmorphic service strip (Web Dev · SEO & AEO · AI Solutions)
- CTAs: "Start a Project" + "Our Work"
- Bottom tagline + animated scroll indicator line

### 8.3 Services Section

- **Layout:** 3 cards in a stacked deck formation
- **Animation:** Cards fan out from stacked position to spread when scrolled into view
- **Re-trigger:** Animation reverses when scrolled out of view
- **Cards:** SEO & AEO, Premium Web Dev, AI Integrations
- **Each card:** Two-layer shell, floating product image with drop shadow, "Learn More" CTA

### 8.4 Why Choose Us (Bento Grid)

6-card bento layout with named grid areas:

```
Desktop:
┌──────────┬────────┬──────────┐
│   hero   │  tech  │  globe   │
│ (2 col)  │(1 col) │ (1 col,  │
├──────────┼────────┤  2 row)  │
│   perf   │contact │          │
│ (1 col)  │(2 col) │          │
├──────────┴────────┼──────────┤
│     longrun       │          │
│     (2 col)       │          │
└───────────────────┴──────────┘
```

**Card Details:**
1. **Unique Design** — UI mockup wireframe visual
2. **Future-Ready Tech** — 10-icon technology grid (Figma, Next.js, React, Tailwind, TS, Claude, Gemini, GSC, OpenAI, WordPress)
3. **International** — Interactive cobe globe with neon border glow (dark mode)
4. **Performance-First** — Thunder illustration with gradient overlay
5. **One Contact** — Animated node connectivity diagram (You → Dev Studio → Product) with orange/blue beam animations
6. **Long Run** — SVG growth chart with draw-on animation

### 8.5 Process Section

- 4-step grid: Discovery → Proposal → Build → Deliver
- Each card: Two-layer shell, title, description, watermark number (gradient, low opacity)
- **Progress Bar:** Continuous beam animation (8s cycle), blue accent dots with labels
- Mobile: Single column, progress bar hidden

### 8.6 About Section

- **Layout:** Eyebrow → Headline → Two-column editorial → Divider → Stats → Pull quote → CTA
- **Stats:** 4 animated counters (99% satisfaction, 24h support, 3 weeks delivery, 100% on-time)
- **Counter Animation:** Ease-out cubic interpolation, 1400ms duration
- **Background:** Dot-grid texture with radial mask

### 8.7 Work Section

- **Sticky scroll:** Section is 150vh with 100vh visible viewport (desktop)
- **Carousel:** AnimatePresence slide transitions with swipe/drag support
- **Projects:** NAMRL, Kiyomi Facilities, Cresults Consulting
- **ProjectCard:** CSS module with shell/inner layer pattern, metrics row, tech stack pills, outcome list, screenshot
- **Auto-play:** 5-second interval, pauses on hover

### 8.8 Testimonials Section

- **Sticky scroll:** 100vh sticky with 60vh scroll spacer (desktop)
- **Layout:** Left (heading + progress bars) | Right (stacking cards)
- **Card Stack:** Active card is inverted (primary bg), behind cards fade/scale, ahead cards have glass bg
- **Auto-advance:** 8s per card, 15s pause on last card before loop
- **Progress:** Animated scaleX bars synced to timing

### 8.9 Contact Section

- **Form:** 3-step wizard (About You → Your Project → Tell Us More)
- **Step 1:** Name + Email inputs
- **Step 2:** Service selector (4 options, 2×2 grid) + Budget range (4 options)
- **Step 3:** Project details textarea
- **Navigation:** Back/Continue buttons, animated step dots
- **Success:** Animated checkmark + "Message Received" confirmation
- **Container:** Glass card with stepped indicator bar

### 8.10 Footer

- **Grid:** Tagline + social icons | 3 link columns (Services, Company, Connect)
- **Brand Text:** Giant "Dev Studio" with character-by-character `AnimatedText`
- **Bottom Bar:** Copyright + Privacy/Terms links

---

## 9. Animation & Motion System

### Libraries

| Library          | Usage                                       |
| ---------------- | ------------------------------------------- |
| **Framer Motion**| Section entrances, card transitions, layout |
| **Lenis**        | Smooth scroll (duration: 1.2s, easing: exponential) |
| **CSS Keyframes**| Navbar expand, hero glow, beam fills, float |

### Core Animation Patterns

| Pattern              | Easing                       | Duration | Trigger          |
| -------------------- | ---------------------------- | -------- | ---------------- |
| `fadeUp`             | `[0.16, 1, 0.3, 1]`         | 600ms    | Viewport entry   |
| `scaleIn`            | `[0.16, 1, 0.3, 1]`         | 720ms    | Viewport entry   |
| `slideUp`            | CSS ease-out                 | 800ms    | `.is-visible`    |
| Card spread          | `--ease-spring`              | 800ms    | InView toggle    |
| Card hover lift      | Framer `whileHover`          | 300ms    | Mouse enter      |
| Progress beam        | CSS `ease-in-out`            | 8s loop  | Always           |
| Stagger              | 100ms increments             | —        | CSS classes      |

### LazyMotion

Framer Motion uses `LazyMotion` with `domAnimation` features to reduce bundle size. Components use `m.` instead of `motion.`.

### Scroll Animations

- **CSS-based:** `.animate-on-scroll`, `.animate-on-scroll-left/right`, `.animate-scale-in` classes
- **Framer Motion:** `useInView()`, `whileInView`, `viewport={{ once: true }}`
- **Custom Hook:** `useIntersectionObserver` with configurable threshold and triggerOnce

---

## 10. Responsive Design Strategy

### Breakpoints

| Breakpoint | Target        | Key Changes                              |
| ---------- | ------------- | ---------------------------------------- |
| `≤480px`   | Small phones  | Stats 2-col, reduced padding             |
| `≤640px`   | Phones        | Contact form compact grid                |
| `≤768px`   | Tablets       | Mobile hero, single-col cards, nav menu  |
| `≤899px`   | Small tablets | Work section non-sticky, testimonials stack |
| `≤1024px`  | Tablets/small | Process 2-col, services adjusted         |

### Mobile-Specific Adaptations

- **Hero:** Completely different layout (editorial vs 3D)
- **Navbar:** Reduced height (50px), hamburger menu, full-screen overlay
- **Services:** Stacked vertically, no absolute positioning
- **Process:** Single column, progress bar hidden
- **Work:** Non-sticky, spring-based slide transitions
- **Testimonials:** Non-sticky, taller cards
- **Footer:** Single column grid

### Mobile Detection

Components use `useState` + `useEffect` with `resize` listener:
```tsx
const [isMobile, setIsMobile] = useState(false);
useEffect(() => {
  const check = () => setIsMobile(window.innerWidth <= 768);
  check();
  window.addEventListener('resize', check);
  return () => window.removeEventListener('resize', check);
}, []);
```

---

## 11. Performance Optimization

### Bundle Optimization

- **Dynamic imports** for below-fold sections (`next/dynamic`)
- **LazyMotion** with `domAnimation` (smaller Framer Motion bundle)
- **Next.js Image** with `sizes` prop for responsive image serving
- **Bundle Analyzer** available via `npm run analyze`

### CSS Optimization

- `experimental.optimizeCss: true` in Next.js config
- CSS custom properties for theme switching (no re-render)
- Scoped styles via JSX `<style jsx>` blocks

### Runtime Performance

- **`will-change`** on animated elements, cleared after animation via `onAnimationComplete`
- **`requestAnimationFrame`** for scroll handlers and counters
- **Passive event listeners** for scroll events
- **`transform: translateZ(0)`** for GPU layer promotion on cards
- **Spline conditional loading**: Only on desktop, mobile gets lightweight CSS gradients
- **Lenis smooth scroll**: Replaces native scroll for 60fps experience

### Loading Strategy

1. **PageLoader** shows immediately with progress bar
2. Progress: 0% → 40% (mount) → 75% (fonts ready) → 95% (window load) → 100% (Spline ready)
3. Loader slides up with `translateY(-100%)` transition
4. Mobile skips Spline, marks ready immediately

---

## 12. UI Component Library

### Custom Components

| Component            | Description                                     |
| -------------------- | ----------------------------------------------- |
| `RippleElement`      | Material-style click ripple on any element       |
| `AnimatedText`       | Per-character animated text reveal               |
| `AnimatedThemeToggler`| Animated sun↔moon icon toggle                  |
| `SplineScene`        | Lazy Spline 3D loader with opacity fade-in       |
| `PageLoader`         | Full-screen progress loader                      |
| `ShineBorder`        | Animated gradient border decoration              |
| `DotPattern`         | SVG dot grid background with mask support        |
| `SectionReveal`      | Scroll-triggered section entrance                |
| `Globe`              | Interactive WebGL globe (cobe library)           |
| `HexagonBackground`  | SVG hexagon pattern generator                   |

### shadcn/ui Integration

- Configured via `components.json` (style: `radix-nova`)
- Registries: Magic UI (`@magicui`), Animate UI (`@animate-ui`)
- Uses `cn()` utility from `@/lib/utils` (clsx + tailwind-merge)

---

## 13. Third-Party Integrations

| Integration          | Purpose                         |
| -------------------- | ------------------------------- |
| **Spline**           | 3D robot scene in hero (desktop)|
| **cobe**             | Interactive globe in bento grid |
| **Lenis**            | Smooth scroll behavior          |
| **Framer Motion**    | Animation engine                |
| **Lucide React**     | Icon library                    |
| **Google Tag Manager** | Analytics (GTM-KFH89H3Z)     |
| **Google Search Console** | SEO verification            |

---

## 14. SEO & Analytics

### Metadata

```typescript
title: "Dev Studio — Web Development & Digital Presence Agency"
description: "We build fast, modern websites, integrate AI into products,
  and manage digital presence for businesses across the US, India, and beyond."
keywords: ["web development", "AI integration", "digital presence",
  "Next.js", "Dev Studio", "Pune"]
```

### OpenGraph

- Title and description configured for social sharing
- Type: `website`

### Google Verification

- Search Console: `AZFesV-GGIPjkLX88TjkmcHifsZlcLDSfJQ9vPsE3O0`
- GTM: `GTM-KFH89H3Z` (with noscript fallback)

### Semantic HTML

- `<section id="...">` for each content section
- `<nav>`, `<main>`, `<footer>` landmarks
- `aria-label` on interactive elements
- `aria-hidden` on decorative elements

---

## 15. Deployment & Build

### Scripts

| Command            | Description                     |
| ------------------ | ------------------------------- |
| `pnpm dev`         | Development server              |
| `pnpm build`       | Production build                |
| `pnpm start`       | Start production server         |
| `pnpm analyze`     | Bundle analysis (ANALYZE=true)  |
| `pnpm lint`        | ESLint check                    |

### Environment

- `.env.local` — Environment variables (git-ignored)
- `pnpm` package manager with workspace configuration

### TypeScript

- Target: ES2017
- Strict mode enabled
- Module resolution: bundler
- Path aliases: `@/*` → `./*`

---

## Appendix: Key Design Decisions

1. **Two-layer card system** — Shell + inner creates a premium "device frame" effect that works beautifully in both themes
2. **Scoped JSX styles** — Heavy components use `<style jsx>` instead of CSS modules for co-located, theme-aware styles
3. **Conditional 3D** — Spline only loads on desktop; mobile gets a lightweight gradient/grid alternative for performance
4. **Sticky scroll sections** — Work (150vh) and Testimonials (100vh + 60vh spacer) use sticky positioning for cinematic scroll experiences
5. **Animation cleanup** — `willChange` is set to `'auto'` after animations complete to free GPU memory
6. **CSS custom properties for theming** — Avoids React re-renders; theme changes are instant via DOM attribute swap
