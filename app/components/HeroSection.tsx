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
            <h1 className="hero-heading">
              <span className="hero-heading__bold">Dev Studio</span>
              <br />
              <span className="hero-heading__light">Built for
                <br />Business
                <br /> Growth.</span>
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
              <span className="hero-heading__bold">Digital Agency</span>
              <br />
              <span className="hero-heading__light">Your vision. <br />Our <br />obsession.</span>
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
            Web development, SEO &amp; AI that turns your website into a revenue engine.
          </m.p>

          <m.p
            className="hero-subtext hero-subtext--right"
            initial="hidden"
            animate="visible"
            variants={fadeUp(0.55)}
          >
            Direct communication, zero handoffs, and a founder personally invested in your results.
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
          background: radial-gradient(
            ellipse 60% 65% at 50% 55%,
            var(--accent-blue-glow) 0%,
            transparent 70%
          );
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
          padding: clamp(5rem, 12vh, 8rem) clamp(2rem, 5vw, 5rem) clamp(4.5rem, 10vh, 7rem);
          pointer-events: none;
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
          font-size: clamp(2.5rem, 5vw, 5rem);
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: var(--hero-heading);
          text-shadow: var(--hero-heading-shadow);
          margin: 0;
        }

        .hero-heading--right {
          text-align: right;
        }

        .hero-heading__bold {
          font-weight: 600;
          display: block;
        }

        .hero-heading__light {
          font-weight: 300;
          display: block;
          margin-top: 0.1em;
        }

        /* ── Bottom row — subtexts ── */
        .hero-bottom-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          width: 100%;
        }

        .hero-subtext {
          font-family: var(--font-sans), 'Poppins', sans-serif;
          font-size: 15px;
          line-height: 1.65;
          color: var(--hero-subtext);
          max-width: 340px;
          margin: 0;
          font-weight: 400;
        }

        .hero-subtext--right {
          text-align: right;
          margin-left: auto;
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
            padding: clamp(5rem, 14vh, 7rem) clamp(1.25rem, 5vw, 2rem) clamp(2rem, 6vh, 3.5rem);
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
