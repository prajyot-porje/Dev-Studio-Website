'use client';

import { m } from 'framer-motion';
import { SplineScene } from '@/components/ui/SplineScene';

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
  return (
    <section id="hero" className="hero-section">
      {/* ── Grain texture overlay ── */}
      <div className="hero-grain" />

      {/* ── Radial atmospheric glow ── */}
      <div className="hero-glow" />

      {/* ── Spline Robot — full screen ── */}
      <div className="hero-robot-wrap">
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="hero-spline"
        />
        <div className="hero-robot-overlay" />
      </div>

      {/* ── Text Content Layer ── */}
      <div className="hero-content">
        {/* Top row — split columns */}
        <div className="hero-top-row">
          {/* Left column */}
          <m.div
            className="hero-col hero-col--left"
            initial="hidden"
            animate="visible"
            variants={fadeUp(0.1)}
          >
            <h1 className="hero-heading hero-heading--left">
              <span className="hero-heading__bold"><span className="silver-text">Dev Studio</span></span>
              <span className="hero-heading__light">Built for business<br /> growth.</span>
            </h1>
          </m.div>

          {/* Right column */}
          <m.div
            className="hero-col hero-col--right"
            initial="hidden"
            animate="visible"
            variants={fadeUp(0.25)}
          >
            <h2 className="hero-heading hero-heading--right">
              <span className="hero-heading__bold"><span className="silver-text">Digital Agency</span></span>
              <span className="hero-heading__light">Your vision.<br />Our obsession.</span>
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

        {/* CTA buttons — centered at bottom */}
        <m.div
          className="hero-ctas"
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.7)}
        >
          <a href="#contact" className="hero-cta hero-cta--filled">
            Contact us
          </a>
          <a href="#work" className="hero-cta hero-cta--outlined">
            View our Work
          </a>
        </m.div>
      </div>

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

        /* ── Grain ── */
        .hero-grain {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          /* // PERF: replaced feTurbulence with static asset — eliminates per-frame GPU noise calc */
          background-image: url("/noise.png");
          background-repeat: repeat;
          background-size: 128px 128px;
          opacity: 0.035;
          mix-blend-mode: overlay;
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
           TEXT CONTENT LAYER
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
          opacity: 1; /* Was 0.5, using silver text handles gradient/opacity naturally */
          margin-bottom: 12px; /* Strict Gestalt proximity */
        }

        .hero-heading__light {
          font-weight: 500;
          display: block;
          letter-spacing: -0.04em;
        }

        .hero-heading--right .hero-heading__light br {
          display: none;
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
          font-size: clamp(1rem, 2vw, 1.15rem);
          line-height: 1.5;
          letter-spacing: -0.01em;
          color: var(--hero-subtext);
          max-width: 360px;
          margin: 0;
          font-weight: 400;
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
          background: transparent;
          color: var(--hero-heading);
          border: 1.5px solid var(--hero-cta-outline-border);
          box-shadow: none;
        }
        .hero-cta--outlined:hover {
          transform: scale(1.03);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.10);
        }

        /* ============================
           RESPONSIVE — MOBILE
           ============================ */
        @media (max-width: 768px) {
          .hero-content {
            padding: clamp(7rem, 15vh, 9rem) clamp(1.5rem, 5vw, 2.5rem) clamp(2.5rem, 6vh, 4rem);
          }

          .hero-top-row {
            flex-direction: column;
            align-items: center;
            gap: 2.5rem;
          }

          .hero-col {
            max-width: 100%;
            text-align: center;
          }

          .hero-heading {
            font-size: clamp(2rem, 8vw, 3rem);
          }

          .hero-heading--right {
            text-align: center;
          }

          .hero-bottom-row {
            flex-direction: column;
            align-items: center;
            gap: 1.5rem;
          }

          .hero-subtext {
            text-align: center;
            max-width: 360px;
          }

          .hero-subtext--right {
            text-align: center;
            margin-left: 0;
          }

          .hero-ctas {
            flex-direction: column;
            gap: 12px;
          }

          .hero-cta {
            width: 100%;
            max-width: 280px;
          }
        }
      `}</style>
    </section>
  );
}
