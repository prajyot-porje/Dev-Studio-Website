<div align="center">

# ✦ Dev Studio

### Web Development & Digital Presence Agency

*Fast websites. AI integrations. Digital presence management.*
*Based in Pune, India — working globally.*

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)

---

</div>

## ⚡ Overview

Dev Studio is a **premium single-page agency website** built with cutting-edge web technologies. It features a cinematic 3D hero section, glassmorphic UI, scroll-driven animations, and a fully adaptive dark/light theme — all optimized for Core Web Vitals.

> **Live Site:** [dev-studio.in](#) &nbsp;•&nbsp; **Design Docs:** [design.md](./design.md)

---

## 🎨 Features

<table>
<tr>
<td width="50%">

### 🖥️ Visuals & UX
- 🤖 **3D Spline Hero** — Interactive robot scene (desktop)
- 🌗 **Dark / Light Theme** — Instant toggle, zero flash
- 🔮 **Glassmorphism** — Frosted-glass navbar & cards
- ✨ **Micro-animations** — Ripple clicks, stagger reveals
- 🎴 **Bento Grid** — 6-card interactive showcase
- 🌍 **Interactive Globe** — WebGL globe (cobe)
- 📱 **Premium Mobile** — Separate editorial hero layout

</td>
<td width="50%">

### ⚙️ Technical
- ⚡ **Next.js 16** App Router with React 19
- 🧩 **Dynamic Imports** — Code-split below-fold sections
- 🎞️ **LazyMotion** — Reduced Framer Motion bundle
- 📊 **Bundle Analyzer** — Built-in analysis tooling
- 🔍 **SEO Optimized** — Meta, OpenGraph, Google verification
- 📈 **Google Tag Manager** — Analytics integration
- 🖋️ **Poppins + Inter** — `next/font` optimized loading

</td>
</tr>
</table>

---

## 📐 Architecture

```
app/
├── layout.tsx                 ← Root layout, fonts, providers, GTM
├── page.tsx                   ← Section assembly with dynamic imports
├── globals.css                ← Design tokens & animation system
└── components/
    ├── HeroSection.tsx        ← 3D Spline (desktop) / editorial (mobile)
    ├── ServicesSection.tsx     ← Stack→spread card animation
    ├── WhyChooseUs.tsx        ← 6-card bento grid
    ├── ProcessSection.tsx     ← 4-step timeline + beam animation
    ├── AboutSection.tsx       ← Editorial layout + animated counters
    ├── WorkSection.tsx        ← Sticky carousel project showcase
    ├── TestimonialsSection.tsx ← Stacking card testimonials
    ├── ContactSection.tsx     ← Multi-step wizard contact form
    ├── Navbar.tsx             ← Glassmorphic expanding navbar
    └── Footer.tsx             ← Animated brand text + links

components/
├── ui/                        ← Reusable UI primitives
│   ├── SplineScene.tsx        ← 3D scene loader
│   ├── PageLoader.tsx         ← Progress-based loading screen
│   ├── ripple-element.tsx     ← Material-style ripple effect
│   ├── animated-text.tsx      ← Character animation
│   └── ...
├── globe.tsx                  ← WebGL globe (cobe)
├── SmoothScroll.tsx           ← Lenis smooth scrolling
└── LoadingContext.tsx          ← Loading state + LazyMotion provider
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **pnpm** (recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/prajyot-porje/Dev-Studio-Website.git
cd Dev-Studio-Website

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Scripts

| Command          | Description                          |
| ---------------- | ------------------------------------ |
| `pnpm dev`       | Start development server             |
| `pnpm build`     | Create production build              |
| `pnpm start`     | Serve production build               |
| `pnpm analyze`   | Bundle analysis with `@next/bundle-analyzer` |
| `pnpm lint`      | Run ESLint checks                    |

---

## 🛠️ Tech Stack

| Category        | Technology                                          |
| --------------- | --------------------------------------------------- |
| **Framework**   | Next.js 16 (App Router)                             |
| **Language**    | TypeScript 5 (strict mode)                          |
| **UI Library**  | React 19                                            |
| **Styling**     | Tailwind CSS 4 + CSS Custom Properties              |
| **Animations**  | Framer Motion 12 (LazyMotion) + CSS Keyframes       |
| **3D**          | Spline (@splinetool/react-spline) + Three.js        |
| **Globe**       | cobe (WebGL)                                        |
| **Smooth Scroll** | Lenis                                             |
| **Icons**       | Lucide React + React Icons                          |
| **UI Kit**      | shadcn/ui (radix-nova style)                        |
| **Package Manager** | pnpm                                            |

---

## 🎨 Design System

The site uses a comprehensive **CSS custom property** design system defined in `globals.css`.

### Theming

| Property          | Light Mode          | Dark Mode               |
| ----------------- | ------------------- | ----------------------- |
| Background        | `#ffffff`           | `#000000`               |
| Text Primary      | `#1d1d1f`           | `#f5f5f7`               |
| Glass Background  | `rgba(255,255,255,0.65)` | `rgba(28,28,30,0.65)` |
| Accent Blue       | `#0052FF`           | `#3B7BFF`               |
| CTA               | `#1d1d1f`           | `#f5f5f7`               |

### Typography

- **Primary:** Poppins (100–900 weights)
- **Secondary:** Inter
- **Hero:** `clamp(3rem, 8vw, 7rem)`
- **Headings:** `-0.03em` letter spacing, tight line-height

### Card System

Every card uses a **two-layer shell pattern** for premium depth:
- **Outer shell:** Subtle gray with multi-layer shadow
- **Inner layer:** Gradient background with inset highlights
- **Hover:** Enhanced shadows + subtle lift

> 📖 See [design.md](./design.md) for the complete design specification.

---

## 📱 Responsive Breakpoints

| Breakpoint | Target        | Behavior                           |
| ---------- | ------------- | ---------------------------------- |
| `≤480px`   | Small phones  | Compact layouts, 2-col stats       |
| `≤768px`   | Tablets       | Mobile hero, hamburger nav         |
| `≤899px`   | Small tablets | Non-sticky work/testimonials       |
| `≤1024px`  | Laptops       | 2-col process grid                 |
| `>1024px`  | Desktop       | Full experience with 3D + sticky   |

---

## 📂 Page Sections

| # | Section         | Key Feature                                       |
|---|-----------------|---------------------------------------------------|
| 1 | **Hero**        | Spline 3D robot (desktop), editorial grid (mobile)|
| 2 | **Services**    | 3 cards: stacked deck → spread on scroll          |
| 3 | **Why Choose Us**| Bento grid with globe, tech icons, animations    |
| 4 | **Process**     | 4-step timeline with animated beam                |
| 5 | **About**       | Animated counters, editorial two-column            |
| 6 | **Work**        | Sticky carousel with project case studies          |
| 7 | **Testimonials**| Auto-advancing stacked card carousel              |
| 8 | **Contact**     | 3-step wizard form (name → service → message)     |

---

## ⚡ Performance

- **Dynamic imports** for below-fold sections
- **LazyMotion** reduces Framer Motion bundle by ~60%
- **Conditional 3D** — Spline loads only on desktop
- **`will-change` cleanup** after animation completion
- **Passive scroll listeners** with `requestAnimationFrame`
- **Next/Image** with responsive `sizes` for optimal loading
- **CSS `optimizeCss`** enabled in Next.js config

---

## 🔗 Connect

<div align="center">

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Dev_Studio-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/company/dev-studio-17/)
[![Instagram](https://img.shields.io/badge/Instagram-@the__dev.studio-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/the_dev.studio/)
[![Email](https://img.shields.io/badge/Email-devstudio017@gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:devstudio017@gmail.com)

---

<sub>© 2026 Dev Studio. All rights reserved.</sub>

</div>
