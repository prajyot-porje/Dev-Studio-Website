'use client';

import { useState, useEffect } from 'react';
import { m } from 'framer-motion';
import { SplineScene } from '@/components/ui/SplineScene';
import { RippleElement } from '@/components/ui/ripple-element';
import { useLoading } from '@/components/LoadingContext';

/* ── Animation variants ── */
const fadeUp = (delay: number) => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
  },
});

interface HeroSectionProps {
  forceLowEnd?: boolean;
}

export default function HeroSection({ forceLowEnd = false }: HeroSectionProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isLowEndDevice, setIsLowEndDevice] = useState(forceLowEnd);
  const [isMounted, setIsMounted] = useState(false);
  const { setSplineReady } = useLoading();

  useEffect(() => {
    setIsMounted(true);
    const checkDevice = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      let lowEnd = forceLowEnd;
      if (!lowEnd && !mobile && typeof navigator !== 'undefined') {
        const cores = navigator.hardwareConcurrency || 4;
        const connection = (navigator as any).connection;
        const slowNetwork = connection && (connection.saveData || connection.effectiveType === '3g' || connection.effectiveType === '2g');
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (cores < 4 || slowNetwork || reducedMotion) {
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

  return (
    <section id="hero" className="hero-section">

      {/* ── Radial atmospheric glow ── */}
      <div className="hero-glow" />

      {/* ── Spline Robot — full screen (Desktop) OR premium gradient (Mobile) ── */}
      <div className="hero-robot-wrap">
        {isMounted && !isMobile && !isLowEndDevice ? (
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="hero-spline"
          />
        ) : isMobile ? (
          <div className="hero-mobile-bg">
            {/* Subtle animated gradient mesh */}
            <div className="hero-mobile-mesh" />
            {/* Decorative accent lines */}
            <div className="hero-accent-line hero-accent-1" />
            <div className="hero-accent-line hero-accent-2" />
          </div>
        ) : null}
        <div className="hero-robot-overlay" />
      </div>

      {/* ── Desktop Text Content Layer (High End) ── */}
      {!isMobile && !isLowEndDevice && (
        <div className="hero-content">
          {/* Top row — split columns */}
          <div className="hero-top-row">
            <m.div
              className="hero-col hero-col--left"
              initial="hidden"
              animate="visible"
              variants={fadeUp(0.1)}
            >
              <h1 className="hero-heading hero-heading--left">
                <span className="hero-heading__bold"><span className="silver-text">Dev Studio</span></span>
                <span className="hero-heading__light">Built for your <br />Growth<br /> with Clarity. </span>
              </h1>
            </m.div>

            <m.div
              className="hero-col hero-col--right"
              initial="hidden"
              animate="visible"
              variants={fadeUp(0.25)}
            >
              <h2 className="hero-heading hero-heading--right">
                <span className="hero-heading__bold"><span className="silver-text">Digital Agency</span></span>
                <span className="hero-heading__light">Engineered <br /> to Rank. <br /> Built to Win.</span>
              </h2>
            </m.div>
          </div>

          {/* Bottom row — subtexts */}
          <div className="hero-bottom-row">
            <m.p
              className="hero-subtext hero-subtext--left"
              initial="hidden"
              animate="visible"
              variants={fadeUp(0.4)}
            >
              <span className="silver-text">Web development, SEO &amp; AI that turns your website into a revenue engine.</span>
            </m.p>

            <m.p
              className="hero-subtext hero-subtext--right"
              initial="hidden"
              animate="visible"
              variants={fadeUp(0.55)}
            >
              <span className="silver-text">Direct communication, zero handoffs, and a founder personally invested in your results.</span>
            </m.p>
          </div>

          {/* CTA buttons */}
          <m.div
            className="hero-ctas"
            initial="hidden"
            animate="visible"
            variants={fadeUp(0.7)}
          >
            <RippleElement as="a" href="#contact" className="hero-cta hero-cta--filled">
              Contact us
            </RippleElement>
            <RippleElement as="a" href="#work" className="hero-cta hero-cta--outlined">
              View our Work
            </RippleElement>
          </m.div>
        </div>
      )}

      {/* ── Desktop Text Content Layer (Low End Fallback) ── */}
      {!isMobile && isLowEndDevice && (
        <div className="hero-content hero-fallback-content">
          <div className="hero-fallback-bg">
            {/* Monochromatic structural grid lines */}
            <div className="hero-fallback-line hero-fallback-line--v1" />
            <div className="hero-fallback-line hero-fallback-line--v2" />
            <div className="hero-fallback-line hero-fallback-line--h1" />
          </div>

          <m.div
            className="hero-fallback-inner"
            initial="hidden"
            animate="visible"
            variants={{
               hidden: { opacity: 0 },
               visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
            }}
          >
            <m.div variants={fadeUp(0)} className="hero-fallback-overline">
              <span className="hero-fallback-overline-dot" />
              Dev Studio — Digital Agency
            </m.div>

            <m.h1 className="hero-fallback-heading" variants={fadeUp(0.15)}>
              <span className="silver-text">Built for your Growth</span><br/>
              Engineered to Rank.<br/>
              Built to Win.
            </m.h1>

            <m.div className="hero-fallback-sub" variants={fadeUp(0.3)}>
              <p className="silver-text">Web development, SEO & AI that turns your website into a revenue engine. Direct communication, zero handoffs, and a founder personally invested in your results.</p>
            </m.div>

            <m.div className="hero-fallback-ctas" variants={fadeUp(0.45)}>
              <RippleElement as="a" href="#contact" className="hero-cta hero-cta--filled">
                Contact us
              </RippleElement>
              <RippleElement as="a" href="#work" className="hero-cta hero-cta--outlined">
                View our Work
              </RippleElement>
            </m.div>
          </m.div>
        </div>
      )}

      {/* ── Mobile Text Content Layer ── */}
      {isMobile && (
        <div className="hero-mobile-content">
          {/* Atmospheric glow orbs */}
          <div className="hero-mobile-orb hero-mobile-orb--1" />
          <div className="hero-mobile-orb hero-mobile-orb--2" />

          {/* Overline label */}
          <m.div
            initial="hidden"
            animate="visible"
            variants={fadeUp(0.1)}
            className="hero-mobile-overline"
          >
            <span className="hero-mobile-overline-dot" />
            Digital Agency
          </m.div>

          {/* Large editorial heading */}
          <m.h1
            className="hero-mobile-heading"
            initial="hidden"
            animate="visible"
            variants={fadeUp(0.2)}
          >
            Built for
            <br />
            your <span className="hero-mobile-heading-em">Growth</span>
          </m.h1>

          {/* Sub-heading — value prop */}
          <m.p
            className="hero-mobile-sub"
            initial="hidden"
            animate="visible"
            variants={fadeUp(0.35)}
          >
            One founder. Zero handoffs.
            <br />
            Websites engineered to rank & convert.
          </m.p>

          {/* Service keyword chips */}
          <m.div
            className="hero-mobile-chips"
            initial="hidden"
            animate="visible"
            variants={fadeUp(0.45)}
          >
            <span className="hero-chip">Web Development</span>
            <span className="hero-chip">SEO</span>
            <span className="hero-chip">AI Solutions</span>
          </m.div>

          {/* CTA row — compact, inline */}
          <m.div
            className="hero-mobile-ctas"
            initial="hidden"
            animate="visible"
            variants={fadeUp(0.55)}
          >
            <RippleElement as="a" href="#contact" className="hero-cta hero-cta--filled">
              Get Started
            </RippleElement>
            <RippleElement as="a" href="#work" className="hero-cta hero-cta--outlined">
              Our Work
            </RippleElement>
          </m.div>

          {/* Trust stats — minimal bottom strip */}
          <m.div
            className="hero-mobile-trust"
            initial="hidden"
            animate="visible"
            variants={fadeUp(0.65)}
          >
            <div className="hero-trust-item">
              <span className="hero-trust-value">100</span>
              <span className="hero-trust-label">SEO Score</span>
            </div>
            <div className="hero-trust-divider" />
            <div className="hero-trust-item">
              <span className="hero-trust-value">&lt;0.5s</span>
              <span className="hero-trust-label">Load Time</span>
            </div>
            <div className="hero-trust-divider" />
            <div className="hero-trust-item">
              <span className="hero-trust-value">24h</span>
              <span className="hero-trust-label">Response</span>
            </div>
          </m.div>

          {/* Scroll indicator */}
          <m.div
            className="hero-mobile-scroll"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <div className="hero-scroll-line" />
          </m.div>
        </div>
      )}

      {/* ── Bottom edge fade ── */}
      <div className="hero-bottom-fade" />

      {/* ── Scoped styles ── */}
      <style>{`
        /* ============================
           HERO SECTION — ROOT
           ============================ */
        .hero-section {
          position: relative;
          width: 100%;
          height: 100dvh;
          overflow: hidden;
          background: var(--hero-bg);
          transition: background-color var(--duration-normal) var(--ease-out);
        }

        /* ── Glow — adapts per theme ── */
        .hero-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
          background: radial-gradient(ellipse 40% 60% at 50% 40%, rgba(230, 235, 245, 0.6) 0%, transparent 70%);
        }
        [data-theme="dark"] .hero-glow {
          background: radial-gradient(ellipse 40% 60% at 50% 40%, #0D1F3C 0%, transparent 70%);
        }

        /* ── Robot wrapper ── */
        .hero-robot-wrap {
          position: absolute;
          inset: 0;
          z-index: 5;
          width: 100%;
          height: 100%;
        }

        /* ── Mobile Background ── */
        .hero-mobile-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: var(--hero-bg);
        }

        .hero-mobile-mesh {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse 80% 50% at 20% 80%, rgba(120, 120, 140, 0.08) 0%, transparent 60%),
            radial-gradient(ellipse 60% 80% at 80% 20%, rgba(100, 100, 120, 0.06) 0%, transparent 60%);
          animation: mesh-drift 30s ease-in-out infinite alternate;
        }

        [data-theme="dark"] .hero-mobile-mesh {
          background: 
            radial-gradient(ellipse 80% 50% at 20% 80%, rgba(70, 130, 230, 0.12) 0%, transparent 60%),
            radial-gradient(ellipse 60% 80% at 80% 20%, rgba(140, 80, 255, 0.08) 0%, transparent 60%);
        }

        @keyframes mesh-drift {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.05) translate(2%, -2%); }
        }

        .hero-accent-line {
          position: absolute;
          height: 1px;
          opacity: 0.08;
          background: var(--text-primary);
        }

        .hero-accent-1 {
          width: 60%;
          top: 40%;
          left: -10%;
          transform: rotate(-12deg);
        }

        .hero-accent-2 {
          width: 45%;
          top: 65%;
          right: -5%;
          transform: rotate(8deg);
        }

        [data-theme="dark"] .hero-accent-line {
          opacity: 0.06;
        }

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
        
        .hero-robot-overlay {
          position: absolute;
          inset: 0;
          z-index: 6;
          pointer-events: none;
          background: radial-gradient(ellipse at center, rgba(255,255,255,0) 40%, rgba(247,247,245,0.85) 100%);
        }
        [data-theme="dark"] .hero-robot-overlay {
          background: transparent;
        }

        /* ── Bottom fade ── */
        .hero-bottom-fade {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 20%;
          z-index: 10;
          pointer-events: none;
          background: linear-gradient(to bottom, transparent, var(--hero-bg));
          transition: background var(--duration-normal) var(--ease-out);
        }

        /* ============================
           DESKTOP TEXT CONTENT LAYER
           ============================ */
        .hero-content {
          position: absolute;
          inset: 0;
          z-index: 20;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: clamp(8rem, 16vh, 12rem) clamp(3rem, 6vw, 6rem) clamp(3rem, 8vh, 5rem);
          pointer-events: none;
        }
        
        /* ── Silver Text Gradients ── */
        .silver-text {
          background-image: linear-gradient(135deg, #6B6B6B 0%, #3A3A3A 40%, #5A5A5A 70%, #2A2A2A 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          display: inline;
        }
        
        [data-theme="dark"] .silver-text {
          background-image: linear-gradient(135deg, #E8E8E8 0%, #A0A0A0 40%, #C8C8C8 70%, #787878 100%);
        }

        /* ── Top row — two columns ── */
        .hero-top-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
        }

        .hero-col {
          flex: 0 1 auto;
          max-width: 48%;
        }

        /* ── Headings ── */
        .hero-heading {
          font-family: var(--font-sans), 'Poppins', sans-serif;
          font-size: clamp(3rem, 6vw, 5.5rem);
          line-height: 1.02;
          letter-spacing: -0.04em;
          color: var(--hero-heading);
          text-shadow: var(--hero-heading-shadow);
          margin: 0;
        }

        .hero-heading--right {
          text-align: right;
        }
        
        .hero-heading--left .hero-heading__light,
        .hero-heading--right .hero-heading__light {
          font-size: clamp(2.5rem, 5vw, 4.75rem);
          max-width: 19ch;
          text-wrap: balance;
          white-space: normal;
          word-break: keep-all;
          hyphens: none;
        }

        .hero-heading__bold {
          font-weight: 600;
          display: block;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          opacity: 1;
          margin-bottom: 12px;
        }

        .hero-heading__light {
          font-weight: 500;
          display: block;
          letter-spacing: -0.04em;
        }


        /* ── Bottom row — subtexts ── */
        .hero-bottom-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          width: 100%;
        }

        .hero-subtext {
          position: relative;
          padding-top: 1.5rem;
          font-family: var(--font-sans), 'Poppins', sans-serif;
          font-size: clamp(0.95rem, 1.5vw, 1.15rem);
          line-height: 1.5;
          letter-spacing: -0.01em;
          color: var(--hero-subtext);
          max-width: 440px;
          min-width: 280px;
          width: 45%;
          margin: 0;
          font-weight: 400;
          text-wrap: balance;
        }

        .hero-subtext::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 40px;
          height: 1px;
          background: var(--hero-subtext);
          opacity: 0.2;
        }

        .hero-subtext--right {
          text-align: right;
          margin-left: auto;
        }

        .hero-subtext--right::before {
          left: auto;
          right: 0;
        }

        /* ── CTAs ── */
        .hero-ctas {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
          pointer-events: auto;
          padding-bottom: 1rem;
        }

        .hero-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 32px;
          border-radius: 9999px;
          font-family: var(--font-sans), 'Poppins', sans-serif;
          font-size: 15px;
          font-weight: 500;
          letter-spacing: -0.01em;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.25s ease;
          -webkit-user-select: none;
          user-select: none;
        }

        .hero-cta--filled {
          background: var(--hero-cta-bg);
          color: var(--hero-cta-text);
          border: none;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }
        .hero-cta--filled:hover {
          transform: scale(1.03);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.22);
        }

        .hero-cta--outlined {
          background: rgba(13, 13, 13, 0.07);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          color: var(--hero-heading);
          border: 2px solid rgba(13, 13, 13, 0.25);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }
        [data-theme="dark"] .hero-cta--outlined {
          background: rgba(247, 247, 245, 0.08);
          border: 2px solid rgba(247, 247, 245, 0.25);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }
        .hero-cta--outlined:hover {
          transform: scale(1.03);
          background: rgba(13, 13, 13, 0.12);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
        }
        [data-theme="dark"] .hero-cta--outlined:hover {
          background: rgba(247, 247, 245, 0.14);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        /* ============================
           MOBILE HERO — PREMIUM EDITORIAL
           ============================ */
        .hero-mobile-content {
          position: absolute;
          inset: 0;
          z-index: 20;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 32px 40px;
          pointer-events: none;
          text-align: center;
          gap: 0;
        }

        /* ── Atmospheric glow orbs ── */
        .hero-mobile-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(80px);
          opacity: 0.35;
          z-index: -1;
        }
        .hero-mobile-orb--1 {
          width: 260px;
          height: 260px;
          top: 12%;
          right: -15%;
          background: rgba(140, 140, 160, 0.2);
          animation: orb-float-1 20s ease-in-out infinite alternate;
        }
        .hero-mobile-orb--2 {
          width: 200px;
          height: 200px;
          bottom: 18%;
          left: -10%;
          background: rgba(120, 120, 150, 0.15);
          animation: orb-float-2 24s ease-in-out infinite alternate;
        }
        [data-theme="dark"] .hero-mobile-orb--1 {
          background: rgba(80, 120, 220, 0.2);
        }
        [data-theme="dark"] .hero-mobile-orb--2 {
          background: rgba(130, 80, 230, 0.15);
        }
        @keyframes orb-float-1 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-20px, 30px) scale(1.15); }
        }
        @keyframes orb-float-2 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(15px, -20px) scale(1.1); }
        }

        /* ── Overline ── */
        .hero-mobile-overline {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.7rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--text-tertiary);
          margin-bottom: 24px;
          font-family: var(--font-sans), 'Poppins', sans-serif;
        }
        .hero-mobile-overline-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--text-tertiary);
          opacity: 0.6;
          animation: dot-pulse 2.5s ease-in-out infinite;
        }
        @keyframes dot-pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }

        /* ── Heading — large editorial ── */
        .hero-mobile-heading {
          font-family: var(--font-sans), 'Poppins', sans-serif;
          font-size: clamp(2.8rem, 11vw, 3.8rem);
          font-weight: 700;
          line-height: 1.0;
          letter-spacing: -0.045em;
          color: var(--text-primary);
          margin: 0 0 20px;
        }
        .hero-mobile-heading-em {
          font-style: normal;
          font-weight: 300;
          color: var(--text-secondary);
        }

        /* ── Subtext ── */
        .hero-mobile-sub {
          font-family: var(--font-sans), 'Poppins', sans-serif;
          font-size: 0.9rem;
          line-height: 1.6;
          color: var(--text-secondary);
          max-width: 280px;
          margin: 0 0 28px;
          font-weight: 400;
          letter-spacing: -0.005em;
        }

        /* ── Service chips ── */
        .hero-mobile-chips {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
          margin-bottom: 32px;
        }
        .hero-chip {
          display: inline-flex;
          align-items: center;
          padding: 6px 14px;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          color: var(--text-secondary);
          border-radius: 999px;
          border: 1px solid rgba(0,0,0,0.07);
          background: rgba(255,255,255,0.45);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          font-family: var(--font-sans), 'Poppins', sans-serif;
          transition: border-color 0.3s ease, background 0.3s ease;
        }
        [data-theme="dark"] .hero-chip {
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
        }

        /* ── CTAs — compact, inline ── */
        .hero-mobile-ctas {
          display: flex;
          flex-direction: row;
          gap: 10px;
          pointer-events: auto;
          margin-bottom: 36px;
        }
        .hero-mobile-ctas .hero-cta {
          padding: 12px 24px;
          font-size: 0.82rem;
        }

        /* ── Trust Indicators — minimal bottom bar ── */
        .hero-mobile-trust {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 12px 24px;
          border-radius: 16px;
          border: 1px solid rgba(0,0,0,0.05);
          background: rgba(255,255,255,0.3);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        [data-theme="dark"] .hero-mobile-trust {
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.03);
        }
        .hero-trust-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1px;
        }
        .hero-trust-value {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          font-family: var(--font-sans), 'Poppins', sans-serif;
        }
        .hero-trust-label {
          font-size: 0.55rem;
          font-weight: 500;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-family: var(--font-sans), 'Poppins', sans-serif;
        }
        .hero-trust-divider {
          width: 1px;
          height: 24px;
          background: var(--border-color);
          opacity: 0.4;
        }

        /* ── Scroll indicator ── */
        .hero-mobile-scroll {
          position: absolute;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 21;
        }
        .hero-scroll-line {
          width: 1px;
          height: 32px;
          position: relative;
          overflow: hidden;
          background: rgba(0,0,0,0.06);
        }
        [data-theme="dark"] .hero-scroll-line {
          background: rgba(255,255,255,0.06);
        }
        .hero-scroll-line::after {
          content: '';
          position: absolute;
          top: -100%;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--text-tertiary);
          animation: scroll-line-move 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes scroll-line-move {
          0% { top: -100%; }
          50% { top: 0%; }
          100% { top: 100%; }
        }

        /* ============================
           DESKTOP FALLBACK (LOW END)
           ============================ */
        .hero-fallback-content {
          justify-content: center;
          align-items: center;
          text-align: center;
          padding-top: clamp(6rem, 12vh, 10rem);
        }

        .hero-fallback-bg {
          position: absolute;
          inset: 0;
          z-index: -1;
          overflow: hidden;
          background: var(--hero-bg);
        }

        /* Subtle radial glow to anchor the text */
        .hero-fallback-bg::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60vw;
          height: 60vw;
          background: radial-gradient(circle, rgba(13, 13, 13, 0.03) 0%, transparent 60%);
          pointer-events: none;
        }
        [data-theme="dark"] .hero-fallback-bg::after {
          background: radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 60%);
        }

        .hero-fallback-line {
          position: absolute;
          background: var(--text-primary);
          opacity: 0.03;
        }
        [data-theme="dark"] .hero-fallback-line {
          opacity: 0.05;
        }
        .hero-fallback-line--v1 {
          width: 1px;
          height: 100%;
          left: 20%;
        }
        .hero-fallback-line--v2 {
          width: 1px;
          height: 100%;
          right: 20%;
        }
        .hero-fallback-line--h1 {
          height: 1px;
          width: 100%;
          top: 50%;
        }

        .hero-fallback-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 1200px;
          width: 100%;
          padding: 0 4rem;
          position: relative;
          z-index: 2;
        }

        .hero-fallback-overline {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-sans), 'Poppins', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--text-primary);
          margin-bottom: 1.25rem;
          padding: 8px 20px;
          border-radius: 999px;
          background: rgba(13, 13, 13, 0.03);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(13, 13, 13, 0.08);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
        }
        [data-theme="dark"] .hero-fallback-overline {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
        }

        .hero-fallback-overline-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--text-primary);
          opacity: 0.5;
          box-shadow: 0 0 8px var(--text-primary);
        }

        .hero-fallback-heading {
          font-family: var(--font-sans), 'Poppins', sans-serif;
          font-size: clamp(3.5rem, 7vw, 6.5rem);
          line-height: 1.0;
          letter-spacing: -0.04em;
          color: var(--hero-heading);
          margin: 0 0 2rem;
          font-weight: 700;
          text-shadow: 0 12px 48px rgba(0, 0, 0, 0.08);
        }
        [data-theme="dark"] .hero-fallback-heading {
          text-shadow: 0 12px 48px rgba(0, 0, 0, 0.5);
        }

        .hero-fallback-sub {
          max-width: 640px;
          margin-bottom: 3.5rem;
        }

        .hero-fallback-sub p {
          font-family: var(--font-sans), 'Poppins', sans-serif;
          font-size: clamp(1.05rem, 1.5vw, 1.25rem);
          line-height: 1.65;
          margin: 0;
          color: var(--hero-subtext);
          text-wrap: balance;
        }

        .hero-fallback-ctas {
          display: flex;
          gap: 1.5rem;
          pointer-events: auto;
          margin-top: 1rem;
        }
        .hero-fallback-ctas .hero-cta {
          padding: 16px 40px;
          font-size: 1.05rem;
        }
      `}</style>
    </section>
  );
}
