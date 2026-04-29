'use client'

import { useEffect, useRef, useCallback } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null)

    // Intercept anchor clicks and route them through Lenis
    const handleAnchorClick = useCallback((e: MouseEvent) => {
        const target = (e.target as HTMLElement).closest('a[href^="#"]')
        if (!target || !lenisRef.current) return

        const href = target.getAttribute('href')
        if (!href || href === '#') return

        const el = document.querySelector(href)
        if (!el) return

        e.preventDefault()
        lenisRef.current.scrollTo(el as HTMLElement, {
            offset: -80, // account for fixed navbar
            duration: 1.4,
            easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -12 * t)),
        })
    }, [])

    useEffect(() => {
        const lenis = new Lenis({
            // lerp controls the interpolation speed — lower = more glide/momentum
            // Apple/Linear/Vercel-tier sites use 0.06–0.08
            lerp: 0.075,

            // Reduce wheel sensitivity slightly for smoother feel
            wheelMultiplier: 0.8,

            // Better mobile touch responsiveness
            touchMultiplier: 1.5,

            // Sync touch scrolling with lerp interpolation
            syncTouch: true,

            // Explicit orientation
            orientation: 'vertical',
            gestureOrientation: 'vertical',

            // Smooth wheel is the core — must be on
            smoothWheel: true,
        })

        lenisRef.current = lenis

        // Expose globally for debugging and potential external access
        ;(window as unknown as Record<string, unknown>).__lenis = lenis

        // RAF loop — drives the interpolation
        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        // Intercept anchor link clicks for Lenis-powered smooth scroll
        document.addEventListener('click', handleAnchorClick, { capture: true })

        return () => {
            document.removeEventListener('click', handleAnchorClick, { capture: true })
            lenis.destroy()
            delete (window as unknown as Record<string, unknown>).__lenis
        }
    }, [handleAnchorClick])

    return <>{children}</>
}