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

export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { setSplineReady } = useLoading();

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setSplineReady(true);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [setSplineReady]);

  return (
    <section id="hero" className="hero-section">

      {/* ── Radial atmospheric glow ── */}
      <div className="hero-glow" />

      {/* ── Spline Robot — full screen (Desktop) OR premium gradient (Mobile) ── */}
      <div className="hero-robot-wrap">
        {isMounted && !isMobile ? (
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="hero-spline"
          />
        ) : (
          <div className="hero-mobile-bg">
            {/* Subtle animated gradient mesh */}
            <div className="hero-mobile-mesh" />
            {/* Decorative accent lines */}
            <div className="hero-accent-line hero-accent-1" />
            <div className="hero-accent-line hero-accent-2" />
          </div>
        )}
        <div className="hero-robot-overlay" />
      </div>

      {/* ── Desktop Text Content Layer ── */}
      {!isMobile && (
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

      {/* ── Mobile Text Content Layer ── */}
      {isMobile && (
        <div className="hero-mobile-content">
          {/* Decorative grid lines */}
          <div className="hero-m-grid" aria-hidden>
            <div className="hero-m-grid-v hero-m-grid-v1" />
            <div className="hero-m-grid-v hero-m-grid-v2" />
            <div className="hero-m-grid-h hero-m-grid-h1" />
            <div className="hero-m-grid-h hero-m-grid-h2" />
          </div>

          {/* Atmospheric glow orb */}
          <div className="hero-mobile-orb hero-mobile-orb--1" />

          {/* Brand mark overline */}
          <m.div
            initial="hidden"
            animate="visible"
            variants={fadeUp(0.1)}
            className="hero-m-brand"
          >
            <span className="hero-m-brand-line" />
            <span className="hero-m-brand-text">Dev Studio</span>
          </m.div>

          {/* Large editorial heading */}
          <m.h1
            className="hero-m-title"
            initial="hidden"
            animate="visible"
            variants={fadeUp(0.2)}
          >
            We build
            <br />
            websites that
            <br />
            <span className="hero-m-title-accent">win clients.</span>
          </m.h1>

          {/* Value proposition */}
          <m.p
            className="hero-m-desc"
            initial="hidden"
            animate="visible"
            variants={fadeUp(0.35)}
          >
            Web development, SEO & AI — engineered by one founder, delivered with zero handoffs.
          </m.p>

          {/* Glassmorphic service strip */}
          <m.div
            className="hero-m-services"
            initial="hidden"
            animate="visible"
            variants={fadeUp(0.45)}
          >
            <div className="hero-m-service-item">
              <span className="hero-m-service-dot hero-m-service-dot--blue" />
              <span>Web Dev</span>
            </div>
            <div className="hero-m-service-sep" />
            <div className="hero-m-service-item">
              <span className="hero-m-service-dot hero-m-service-dot--green" />
              <span>SEO & AEO</span>
            </div>
            <div className="hero-m-service-sep" />
            <div className="hero-m-service-item">
              <span className="hero-m-service-dot hero-m-service-dot--purple" />
              <span>AI Solutions</span>
            </div>
          </m.div>

          {/* CTA row */}
          <m.div
            className="hero-m-ctas"
            initial="hidden"
            animate="visible"
            variants={fadeUp(0.55)}
          >
            <RippleElement as="a" href="#contact" className="hero-cta hero-cta--filled hero-m-cta-main">
              Start a Project
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </RippleElement>
            <RippleElement as="a" href="#work" className="hero-cta hero-cta--outlined hero-m-cta-sec">
              Our Work
            </RippleElement>
          </m.div>

          {/* Bottom tagline */}
          <m.div
            className="hero-m-bottom"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <span className="hero-m-bottom-text">Based in India · Working globally</span>
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
           MOBILE HERO — PREMIUM EDITORIAL v2
           ============================ */
        .hero-mobile-content {
          position: absolute;
          inset: 0;
          z-index: 20;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-end;
          padding: 0 28px 48px;
          pointer-events: none;
          text-align: left;
          gap: 0;
        }

        /* ── Decorative grid lines ── */
        .hero-m-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        .hero-m-grid-v,
        .hero-m-grid-h {
          position: absolute;
          background: var(--border-color);
          opacity: 0.35;
        }
        .hero-m-grid-v {
          width: 1px;
          top: 0;
          bottom: 0;
        }
        .hero-m-grid-h {
          height: 1px;
          left: 0;
          right: 0;
        }
        .hero-m-grid-v1 { left: 28px; }
        .hero-m-grid-v2 { right: 28px; }
        .hero-m-grid-h1 { top: 38%; }
        .hero-m-grid-h2 { bottom: 200px; }

        /* ── Atmospheric glow orb ── */
        .hero-mobile-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(80px);
          opacity: 0.3;
          z-index: 0;
        }
        .hero-mobile-orb--1 {
          width: 280px;
          height: 280px;
          top: 8%;
          right: -20%;
          background: rgba(140, 140, 160, 0.18);
          animation: orb-float-1 20s ease-in-out infinite alternate;
        }
        [data-theme="dark"] .hero-mobile-orb--1 {
          background: rgba(80, 120, 220, 0.2);
        }
        @keyframes orb-float-1 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-20px, 30px) scale(1.15); }
        }

        /* ── Brand mark ── */
        .hero-m-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 28px;
          position: relative;
          z-index: 1;
        }
        .hero-m-brand-line {
          display: block;
          width: 24px;
          height: 2px;
          background: var(--text-primary);
          opacity: 0.3;
          border-radius: 1px;
        }
        .hero-m-brand-text {
          font-family: var(--font-sans), 'Poppins', sans-serif;
          font-size: 0.65rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--text-tertiary);
        }

        /* ── Heading — large editorial ── */
        .hero-m-title {
          font-family: var(--font-sans), 'Poppins', sans-serif;
          font-size: clamp(2.6rem, 10.5vw, 3.6rem);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.045em;
          color: var(--text-primary);
          margin: 0 0 20px;
          position: relative;
          z-index: 1;
        }
        .hero-m-title-accent {
          font-weight: 700;
          background: linear-gradient(135deg, #6B6B6B 0%, #3A3A3A 30%, #5A5A5A 60%, #2A2A2A 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        [data-theme="dark"] .hero-m-title-accent {
          background: linear-gradient(135deg, #E8E8E8 0%, #A0A0A0 30%, #C8C8C8 60%, #787878 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        /* ── Description ── */
        .hero-m-desc {
          font-family: var(--font-sans), 'Poppins', sans-serif;
          font-size: 0.88rem;
          line-height: 1.65;
          color: var(--text-secondary);
          max-width: 320px;
          margin: 0 0 24px;
          font-weight: 400;
          letter-spacing: -0.005em;
          position: relative;
          z-index: 1;
        }

        /* ── Service strip ── */
        .hero-m-services {
          display: flex;
          align-items: center;
          gap: 0;
          padding: 10px 16px;
          border-radius: 12px;
          border: 1px solid rgba(0,0,0,0.06);
          background: rgba(255,255,255,0.4);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          margin-bottom: 28px;
          position: relative;
          z-index: 1;
        }
        [data-theme="dark"] .hero-m-services {
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.04);
        }
        .hero-m-service-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-sans), 'Poppins', sans-serif;
          font-size: 0.68rem;
          font-weight: 500;
          color: var(--text-secondary);
          letter-spacing: 0.01em;
          white-space: nowrap;
        }
        .hero-m-service-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .hero-m-service-dot--blue { background: #3B7BFF; }
        .hero-m-service-dot--green { background: #34C759; }
        .hero-m-service-dot--purple { background: #AF52DE; }
        .hero-m-service-sep {
          width: 1px;
          height: 14px;
          background: var(--border-color);
          margin: 0 12px;
          opacity: 0.6;
        }

        /* ── CTAs ── */
        .hero-m-ctas {
          display: flex;
          flex-direction: row;
          gap: 10px;
          pointer-events: auto;
          margin-bottom: 32px;
          width: 100%;
          position: relative;
          z-index: 1;
        }
        .hero-m-cta-main {
          flex: 1;
          padding: 14px 20px !important;
          font-size: 0.84rem !important;
          gap: 8px;
        }
        .hero-m-cta-sec {
          padding: 14px 20px !important;
          font-size: 0.84rem !important;
        }

        /* ── Bottom tagline + scroll ── */
        .hero-m-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          position: relative;
          z-index: 1;
        }
        .hero-m-bottom-text {
          font-family: var(--font-sans), 'Poppins', sans-serif;
          font-size: 0.6rem;
          font-weight: 500;
          color: var(--text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          opacity: 0.7;
        }

        /* ── Scroll indicator ── */
        .hero-scroll-line {
          width: 1px;
          height: 28px;
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
      `}</style>
    </section>
  );
}
