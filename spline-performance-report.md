# Spline & Hero Section Performance Report

This report provides a detailed technical audit of the Hero section and Spline-related implementation in the Dev Studio website.

## 1. Spline Loading implementation

### Full code of SplineScene.tsx
The Spline component is wrapped in a dedicated `SplineScene` component to manage loading states and transitions.

```tsx
// components/ui/SplineScene.tsx
'use client';

import Spline from '@splinetool/react-spline';
import { useState } from 'react';
import { useLoading } from '@/components/LoadingContext';

interface SplineSceneProps {
  scene: string;
  className?: string;
  onSceneLoad?: () => void;
}

export function SplineScene({ scene, className, onSceneLoad }: SplineSceneProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { setSplineReady } = useLoading();

  // PERF: Spline Lazy Load & PageLoader connection
  const handleLoad = () => {
    setIsLoaded(true);
    setSplineReady(true);
    if (onSceneLoad) onSceneLoad();
  };

  return (
    <div className={`relative w-full h-full ${className ?? ''}`}>
      <Spline
        scene={scene}
        onLoad={handleLoad}
        style={{
          width: '100%',
          height: '100%',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 900ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />
    </div>
  );
}
```

*   **Scene URL**: `https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode`
*   **next/dynamic**: **No**, `SplineScene` is imported directly in `HeroSection.tsx`, and the `@splinetool/react-spline` library is imported directly in `SplineScene.tsx`.
*   **Loading fallback**: There is no visual placeholder rendered *inside* the `SplineScene` while loading. Instead, the canvas has `opacity: 0` and transitions to `opacity: 1` once loaded. The global `PageLoader` (from `LoadingProvider`) remains visible until `splineReady` is set to true.
*   **onLoad callback**: The `onLoad` callback (`handleLoad`) is used. It:
    1. Sets local `isLoaded` state to `true` (triggering the CSS opacity transition).
    2. Calls `setSplineReady(true)` via `LoadingContext`, which signals the `PageLoader` to complete its exit transition.
    3. Calls the optional `onSceneLoad` prop if provided.

---

## 2. Hero Section Device Detection

### Full code snippet (Detection Logic)
The device detection logic is contained within a `useEffect` hook in `HeroSection.tsx`.

```tsx
// app/components/HeroSection.tsx (Lines 29-63)
  useEffect(() => {
    setIsMounted(true);
    const checkDevice = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      let lowEnd = forceLowEnd;
      if (!lowEnd && !mobile && typeof navigator !== 'undefined') {
        const cores = navigator.hardwareConcurrency || 4;
        const memory = (navigator as any).deviceMemory || 4;
        const connection = (navigator as any).connection;
        const isSaveData = connection && connection.saveData;
        const isSlowNetwork = connection && (connection.effectiveType === '3g' || connection.effectiveType === '2g');
        const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        // Refined device capability check:
        const hardwareRestricted = cores < 4 && memory < 8;
        
        if (hardwareRestricted || isSaveData || isSlowNetwork || isReducedMotion) {
          lowEnd = true;
        }
      }
      setIsLowEndDevice(lowEnd);

      if (mobile || lowEnd) {
        setSplineReady(true);
      }
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, [setSplineReady, forceLowEnd]);
```

*   **Detection Method**: Uses a combination of `window.innerWidth`, `navigator.hardwareConcurrency`, `navigator.deviceMemory`, `navigator.connection` (Network Information API), and `matchMedia` for reduced motion preferences.
*   **Exact Conditions**:
    *   **Mobile**: `window.innerWidth <= 768`
    *   **Low End**: `(cores < 4 && memory < 8)` OR `connection.saveData` OR `connection.effectiveType` is '2g'/'3g' OR `prefers-reduced-motion` is enabled.
    *   **High End**: Not mobile AND not low end.
*   **Server vs Client**: Detection is performed on the **client-side** inside a `useEffect` hook.
*   **Flash/Layout Shift**: There is a potential for a brief flash because `isMounted` starts as `false`. The Spline scene or mobile background only renders once `isMounted` is true (after the first mount). However, the `PageLoader` covers the entire screen during this period, mitigating visible layout shift for the user.

---

## 3. Mouse Movement Handler

*   **Is there a JS mousemove listener?**: **No**. There are no `mousemove` event listeners in `HeroSection.tsx` or `SplineScene.tsx`.
*   **Where is it?**: The robot's reaction to mouse movement is handled **natively by Spline** within the `.splinecode` scene itself.
*   **Spline API used**: Since it's internal to the scene, no React-side Spline API calls (like `setVariable` or `emitEvent`) are used for the mouse interaction.

---

## 4. Spline Canvas Specifics

*   **CSS Sizing**:
    ```css
    .hero-spline {
      width: 100% !important;
      height: 100% !important;
      position: relative;
      z-index: 5;
    }
    .hero-spline canvas {
      width: 100% !important;
      height: 100% !important;
      display: block;
    }
    ```
*   **Pointer Events**: `pointer-events: none` is **NOT** set on the canvas or its container. However, there is a `hero-robot-overlay` (z-index 6) that has `pointer-events: none` set, allowing interactions to pass through to the canvas below.
*   **Overflow**: The parent `.hero-section` has `overflow: hidden`.
*   **Z-Index**:
    *   `.hero-robot-wrap`: `z-index: 5`
    *   `.hero-spline`: `z-index: 5`
    *   `.hero-robot-overlay`: `z-index: 6`
    *   `.hero-content`: `z-index: 20` (Text content sits on top but has `pointer-events: none`).

---

## 5. Hero Section Animations

### Framer Motion Animations
*   `fadeUp`: Applied to almost all text elements and CTAs on mount.
    *   Initial: `{ opacity: 0, y: 28 }`
    *   Animate: `{ opacity: 1, y: 0 }`
    *   Duration: `0.6s` with staggered delays (0.1s to 0.7s).
*   **Infinite Animations**: None in Framer Motion; all mount animations are one-time.

### CSS Animations (@keyframes)
The following are running infinitely in the background:
1.  `mesh-drift`: Animates the `transform` (scale and translate) of the mobile mesh background.
    *   `30s ease-in-out infinite alternate`
2.  `orb-float-1`: Animates the `transform` (translate and scale) of the mobile atmospheric glow orb.
    *   `20s ease-in-out infinite alternate`
3.  `scroll-line-move`: Animates the `top` property of the scroll indicator line.
    *   `2s cubic-bezier(0.4, 0, 0.2, 1) infinite`

### Timing Functions
*   **setInterval/setTimeout**: **None** found inside `HeroSection.tsx`.

---

## 6. Post-Loading Behavior

*   **Removal/Pausing on Scroll**: **No**. The Spline scene remains in the DOM and active even when the user scrolls past the hero section. There is no logic to unmount or pause the Spline runtime based on scroll position.
*   **IntersectionObserver**: **None** used in the Hero section.
*   **Scroll Handler / Lenis**: `Lenis` (via `SmoothScroll.tsx`) handles global smooth scrolling but does not directly interact with or control the Spline scene.

---

## 7. Exact File Paths

The following files are involved in rendering the Hero section and Spline:

1.  **Main Component**: `app/components/HeroSection.tsx`
2.  **Spline Wrapper**: `components/ui/SplineScene.tsx`
3.  **Loading Logic**: `components/LoadingContext.tsx`
4.  **Initial Loader**: `components/ui/PageLoader.tsx`
5.  **Page Integration**: `app/page.tsx`
6.  **Global Styles**: `app/globals.css`
7.  **Smooth Scroll**: `components/SmoothScroll.tsx`
8.  **UI Component**: `components/ui/ripple-element.tsx` (Used for buttons)
