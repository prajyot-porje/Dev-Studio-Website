# Performance Report

## 1. Lenis Setup
- **Where is Lenis initialized?** `components/SmoothScroll.tsx`
- **Is it using requestAnimationFrame or gsap.ticker?** It uses `requestAnimationFrame`.
- **What are the current Lenis config options?**
  - `lerp`: 0.075
  - `wheelMultiplier`: 0.8
  - `touchMultiplier`: 1.5
  - `syncTouch`: true
  - `orientation`: 'vertical'
  - `gestureOrientation`: 'vertical'
  - `smoothWheel`: true
- **Is `lenis.on('scroll', ScrollTrigger.update)` present anywhere?** No, not present.
- **Is `gsap.ticker.lagSmoothing(0)` set anywhere?** No.

## 2. GSAP + ScrollTrigger
- **List every file that uses ScrollTrigger:** Zero files. ScrollTrigger is not used anywhere in the codebase.
- **For each: what trigger, does it use scrub, does it use pin, does it have anticipatePin and invalidateOnRefresh?** N/A
- **Where is ScrollTrigger.refresh() called?** N/A

## 3. Framer Motion usage
- **List every component that uses `whileInView`:**
  - `app/components/TestimonialsSection.tsx` (`m.section`)
  - `app/components/WhyChooseUs.tsx` (`m.div` in CardUniqueDesign)
  - `app/components/WorkSection.tsx` (`m.div` wrapper for heading)
  - `app/components/ProcessSection.tsx` (`m.div` for cards)
  - `app/components/ContactSection.tsx` (`m.section`)
  - `components/ui/animated-text.tsx` (`motion.span`)
- **For each: what properties are animated in initial and animate?**
  - Mostly `opacity` (0 to 1) and `y` (transform). E.g., in `WhyChooseUs.tsx`: `initial={{ y: 20, opacity: 0 }}` to `whileInView={{ y: 0, opacity: 1 }}`. In `ProcessSection.tsx`: `initial={{ opacity: 0, y: 50, scale: 0.9 }}` to `whileInView={{ opacity: 1, y: 0, scale: 1 }}`.
- **Does each `whileInView` have `viewport={{ once: true }}`?** Yes, the `viewport` prop is consistently used with `once: true`. E.g., `viewport={{ amount: 0.8, once: true }}` in `TestimonialsSection` and `viewport={{ once: true, margin: '-40px' }}` in `WhyChooseUs`.
- **Are any layout-affecting properties being animated?** No, animations strictly use `opacity`, `transform` (y, x, scale, rotate).

## 4. Component structure after the hero
Components rendered in `app/page.tsx` below the hero, in order:
1. `ServicesSection` - Framer Motion
2. `WhyChooseUsSection` - Framer Motion
3. `ProcessSection` - Framer Motion
4. `AboutSection` - Framer Motion
5. `WorkSection` - Framer Motion
6. `TestimonialsSection` - Framer Motion
7. `ContactSection` - Framer Motion

## 5. CSS
- **Are `will-change`, `transform: translateZ(0)`, or `backface-visibility` used anywhere?**
  - `will-change` is used in `WhyChooseUs.tsx` (on animated elements, cleared after animation via `onAnimationComplete`), and `TestimonialsSection.tsx` (`willChange: 'transform, opacity'`).
  - `transform: translateZ(...)` is used in `WhyUsSection.tsx` (`transform: 'translateZ(48px)'`, etc.) and `translate3d(0,0,0)` is heavily used for GPU layer promotion (e.g., `ServicesSection.tsx` and `WhyChooseUs.tsx`).
  - `backface-visibility` is not used.
- **Is `contain: layout` style used anywhere?** No.
- **Any filter, backdrop-filter, or box-shadow on elements that animate?**
  - Yes! `backdrop-filter` (e.g., `blur(12px)`) and `filter` (e.g., `drop-shadow`, `blur`) are heavily used across sections (`HeroSection`, `WhyChooseUs`, `ServicesSection`).
  - `box-shadow` is animated. E.g., in `WhyChooseUs.tsx`: `transition: 'transform 800ms var(--ease-spring), box-shadow 400ms var(--ease-out)'`.

## 6. Mobile handling
- **Is there any `useReducedMotion` or mobile-specific animation logic?** `useReducedMotion` is used in `HeroSection.tsx` via `window.matchMedia('(prefers-reduced-motion: reduce)').matches` to force fallback (low-end) mode.
- **Is Spline/Three.js disabled or swapped on mobile?** 
  - Yes, Spline in `HeroSection` is conditionally hidden on mobile/low-end devices, replaced with a `hero-mobile-bg` div containing CSS gradients.
  - Three.js (`Globe` component in `WhyChooseUs`) is **NOT** disabled on mobile.
- **Are animation durations/delays reduced on mobile?** No, durations/delays in Framer Motion configurations remain the same across breakpoints.

## 7. Package versions
- **lenis**: `^1.3.21`
- **gsap**: `^3.14.2`
- **framer-motion**: `^12.35.0`
- **@splinetool/react-spline**: `^4.1.0`
- **three**: `^0.183.2`

## 8. Full code dumps
### `components/SmoothScroll.tsx`
```tsx
'use client'

import { useEffect, useRef, useCallback } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null)

    const handleAnchorClick = useCallback((e: MouseEvent) => {
        const target = (e.target as HTMLElement).closest('a[href^="#"]')
        if (!target || !lenisRef.current) return

        const href = target.getAttribute('href')
        if (!href || href === '#') return

        const el = document.querySelector(href)
        if (!el) return

        e.preventDefault()
        lenisRef.current.scrollTo(el as HTMLElement, {
            offset: -80,
            duration: 1.4,
            easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -12 * t)),
        })
    }, [])

    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.075,
            wheelMultiplier: 0.8,
            touchMultiplier: 1.5,
            syncTouch: true,
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
        })

        lenisRef.current = lenis
        ;(window as unknown as Record<string, unknown>).__lenis = lenis

        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)

        document.addEventListener('click', handleAnchorClick, { capture: true })

        return () => {
            document.removeEventListener('click', handleAnchorClick, { capture: true })
            lenis.destroy()
            delete (window as unknown as Record<string, unknown>).__lenis
        }
    }, [handleAnchorClick])

    return <>{children}</>
}
```

### `app/layout.tsx`
```tsx
import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "./components/ThemeProvider";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Dev Studio — Web Development & Digital Presence Agency",
  description:
    "We build fast, modern websites, integrate AI into products, and manage digital presence for businesses across the US, India, and beyond. Based in Pune, working globally.",
  keywords: ["web development", "AI integration", "digital presence", "Next.js", "Dev Studio", "Pune"],
  openGraph: {
    title: "Dev Studio — Web Development & Digital Presence Agency",
    description: "Fast websites, AI integrations, and digital presence management for growing businesses.",
    type: "website",
  },
  verification: {
    google: "AZFesV-GGIPjkLX88TjkmcHifsZlcLDSfJQ9vPsE3O0",
  },
};

import { LoadingProvider } from "@/components/LoadingContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", poppins.variable, inter.variable)}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KFH89H3Z');`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
               (function() {
                 var t = localStorage.getItem('devstudio-theme');
                 if (!t) t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                 document.documentElement.setAttribute('data-theme', t);
               })();
             `,
          }}
        />
      </head>
      <body className={`${poppins.variable} ${inter.variable} antialiased`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KFH89H3Z"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <ThemeProvider>
          <SmoothScroll>
            <LoadingProvider>
              <Navbar />
              <main>{children}</main>
              <Footer />
            </LoadingProvider>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### `app/page.tsx`
```tsx
import dynamic from 'next/dynamic';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';

const WhyChooseUsSection = dynamic(() => import('./components/WhyChooseUs'));
const ProcessSection = dynamic(() => import('./components/ProcessSection'));
const WorkSection = dynamic(() => import('./components/WorkSection'));
const TestimonialsSection = dynamic(() => import('./components/TestimonialsSection'));
const AboutSection = dynamic(() => import('./components/AboutSection'));
const ContactSection = dynamic(() => import('./components/ContactSection'));

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <ProcessSection />
      <AboutSection />
      <WorkSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
```

## 9. GSAP cleanup
- **Is `gsap.context()` used?** No.
- **Are `ScrollTrigger.getAll().forEach(t => t.kill())` present?** No.
- **Any `useEffect` that creates GSAP animations — does it have a cleanup return?** `DashboardScreen.tsx` is the only file using GSAP (`gsap.to`, `gsap.fromTo`). It clears a `setTimeout` timer in its return block but **fails** to clean up the actual GSAP animations (e.g., `gsap.killTweensOf()`).

## 10. Scroll event listeners
- **Any `window.addEventListener('scroll', ...)` anywhere?**
  - Yes, in `app/components/Navbar.tsx`.
- **Any `useState` or `setState` calls inside scroll handlers?**
  - Yes. In `Navbar.tsx`, `setScrolled` is called inside a `requestAnimationFrame` loop attached to the scroll listener. This can cause frequent re-renders.
- **Any `useEffect` with scroll position tracking via `window.scrollY`?**
  - Yes, `app/components/Navbar.tsx` reads `window.scrollY` to track scroll position.

## 11. Images and media
- **Are Next.js `<Image>` components used or raw `<img>` tags?** Next.js `<Image>` components are used exclusively.
- **Any images without explicit width and height or fill prop?** All tested `<Image>` instances use either explicit `width`/`height` (e.g., icons in `WhyChooseUs.tsx`) or the `fill` prop (e.g., mockups in `ProjectCard.tsx`). No missing width/height.
- **Any video or heavy media elements in sections below the hero?** No video elements (`<video>`) are present. The `Globe` (Three.js) is rendered below the hero.

## 12. Spline / Three.js loading
- **How is Spline loaded?** Spline is imported directly (`import Spline from '@splinetool/react-spline'`) inside `SplineScene.tsx`. It does **NOT** use `next/dynamic`.
- **Is Three.js / any canvas element present outside the hero section?** Yes, the `Globe` component (using `cobe` / Three.js canvas) is present in `WhyChooseUs.tsx`.
- **Is Spline or Three.js rendered on mobile or conditionally hidden?** 
  - Spline is conditionally hidden on mobile.
  - Three.js (`Globe`) is **NOT** hidden on mobile.

## 13. "use client" boundaries
- **List every component marked "use client":**
  - Most UI components: `TabletMockup`, `shine-border`, `SectionReveal`, `dot-pattern`, `DashboardScreen`, `animated-theme-toggler`, `animated-text`, `ThemeToggle`, `SplineScene`, `ripple-element`, `PageLoader`, `SmoothScroll`, `LoadingContext`, `hexagon`, `globe`, `counting-number`, `progress`, `useIntersectionObserver`.
  - Almost all sections: `Navbar`, `ServicesSection`, `TestimonialsSection`, `WhyChooseUs`, `WorkSection`, `WhyUsSection`, `ThemeProvider`, `ProjectCard`, `ProcessSection`, `HeroSection`, `Footer`, `ContactSection`, `AboutSection`.
- **Are there any large parent components marked "use client" that could be split?**
  - Yes, virtually every large parent page section (`HeroSection`, `WhyChooseUs`, `WorkSection`, `AboutSection`, etc.) is marked `"use client"`. These could easily be split into server components handling structure and layout, with small specialized client components managing the interactions/framer-motion hooks.

## 14. Font loading
- **How are fonts loaded?** Using `next/font/google` (`Poppins` and `Inter`) in `app/layout.tsx`.
- **Is `font-display: swap` or `optional` set?** Yes, `display: "swap"` is explicitly set.

## 15. Tailwind / CSS transitions
- **Any CSS transition on properties other than opacity, transform, or color?** Yes:
  - `box-shadow` (e.g., in `WhyChooseUs.tsx`, `ServicesSection.tsx`)
  - `border-color` (e.g., in `WhyUsSection.tsx`, `ContactSection.tsx`, `ThemeToggle.tsx`)
  - `background` (e.g., in `Navbar.tsx`, `ContactSection.tsx`)
  - `filter` (e.g., in `ServicesSection.tsx`)
  - `stroke-dashoffset` (e.g., in `WhyChooseUs.tsx`)
  - `width` (e.g., in `PageLoader.tsx`)
- **Any `transition-all` class used anywhere in Tailwind?** Yes, `transition-all` is used in `Navbar.tsx` (`transition-all duration-300 hover:scale-105`) and `hexagon.tsx` (`before:transition-all`).
