# Project Design & Architecture System

This document outlines the design patterns, architectural choices, and technical standards for the **Dev Studio Website**. This serves as a reference for AI agents and developers to maintain consistency and high-fidelity standards when making changes.

---

## 🚀 Core Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) (with [radix-ui](https://www.radix-ui.com/))
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
- **3D Engine**: [Three.js](https://threejs.org/) via [React Three Fiber](https://r3f.docs.pmnd.rs/getting-started/introduction) & [Spline](https://spline.design/)
- **Smooth Scrolling**: [Lenis](https://lenis.darkroom.engineering/)
- **Iconography**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **State/Context**: Built-in React Context (`LoadingContext`, `ThemeProvider`)

---

## 📂 Directory Structure Pattern

| Directory | Purpose |
| :--- | :--- |
| `app/` | Next.js App Router root. Contains layouts, global styles, and route pages. |
| `app/components/` | **Section-based components** that make up the main landing page (e.g., `HeroSection.tsx`, `ServicesSection.tsx`). |
| `components/ui/` | Reusable UI primitives (mostly Radix-based or custom animated components like `SplineScene`). |
| `components/` | Global layout components (e.g., `Navbar.tsx`, `Footer.tsx`, `SmoothScroll.tsx`). |
| `lib/` | Shared utility functions (e.g., `utils.ts` for Tailwind merging). |
| `public/` | Static assets like `noise.png` for grain texture, images, and icons. |

---

## 🎨 Design System & Aesthetics

### 1. **Visual Identity (Premium & Minimalist)**
- **Colors**: Based on Apple-style minimalist palette (Black, White, Slate, Azure Blue).
- **Typography**: 
  - `Poppins`: Primary geometric sans-serif for headings and UI.
  - `Inter`: Secondary sans-serif for body text and finer details.
- **Micro-textures**: Global grain texture (`noise.png`) at low opacity (~0.035) for a premium tactile feel.
- **Glassmorphism**: Extensive use of `backdrop-filter: blur()` for navbars and cards to create depth.

### 2. **Fluid Layout System**
- **Sizing**: Uses `clamp()` for almost all dimensions (font-size, padding, margin) to ensure seamless responsiveness without excessive media queries.
- **Containers**: Standardized `.section-container` (max-width: 1280px) for consistent alignment.
- **Elevation**: Shadow systems for light vs. dark mode to maintain depth consistency.

### 3. **Theming (Light & Dark)**
- Controlled via `data-theme="dark"` on the `<html>` element.
- CSS variables in `app/globals.css` define tokens for both themes.
- Theme switching uses a blocking inline script in `layout.tsx` to prevent theme flicker (FOUC).

---

## 🎬 Animation Philosophy

### 1. **Interaction & Transitions**
- **Entry Animations**: Subtle "Fade + Slide Up" variants (defined in `HeroSection.tsx`).
- **Scroll Reveals**: Components often wrap content in a `SectionReveal` or use `useInView` to trigger animations only when they enter the viewport.
- **Smoothness**: Lenis provides a unified, buttery-smooth scroll experience across all browsers.

### 2. **3D Integration**
- **Spline**: Used for high-fidelity hero elements (e.g., the interactive robot).
- **Three.js**: Used for more custom elements like the `Globe` or `Hexagon` backgrounds.
- **Performance**: Heavy 3D elements are often wrapped in `<LoadingProvider>` to ensure they don't break the layout before initialization.

---

## 📜 Coding Standards & Patterns

### 1. **Styling Approach**
- **Tailwind Utility Classes**: Preferred for structural layout and basic styling.
- **Scoped `<style>` Tags**: Used inside components for complex, layout-specific logic or unique responsive adjustments. This keeps critical section-specific CSS near the JSX.
- **Dynamic CSS Variables**: Used for theme-sensitive colors and complex calculations (e.g., `--card-bg`, `--accent-blue`).

### 2. **Component Structure**
- Every major section should be its own file in `app/components`.
- Use `'use client'` at the top of components that involve animations or browser-only APIs.
- Prefer `m.div` (from Framer Motion) for animated elements over standard `div`.

### 3. **Utilities**
- Always use the `cn()` utility for conditional class merging to ensure Tailwind classes are correctly overridden.

---

## 💡 Best Practices for Changes

- **Preserve Glows & Grain**: When adding new sections, maintain the radial atmospheric glow and grain texture to match the project's premium feel.
- **Responsive-First**: Always test new components via the responsive views. Use fluid `clamp()` instead of fixed values whenever possible.
- **Animation Timing**: Use standardized easing functions (e.g., `[0.16, 1, 0.3, 1]`) to keep transitions uniform.
- **Theme Testing**: Always verify changes in both Light and Dark modes.

---

## 🛠️ Key Files to Watch

- `app/globals.css`: The source of truth for the design system tokens.
- `app/layout.tsx`: Configuration for fonts, providers, and global UI.
- `package.json`: Main dependencies (Framer Motion, Three.js, etc.).
- `lib/utils.ts`: Contains the `cn` utility.
- `app/components/HeroSection.tsx`: Reference for the flagship design & animation pattern.
