'use client';

import { useRef, useState, useEffect } from 'react';
import { m, useInView } from 'framer-motion';
import { useTheme } from '@/app/components/ThemeProvider';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const FONT = "'Poppins', system-ui, -apple-system, sans-serif";

const steps = [
  { number: '01', title: 'Discovery', desc: 'We learn your goals in one quick call. No lengthy forms, no intake process needed.' },
  { number: '02', title: 'Proposal', desc: 'Scope, timeline, and fixed price ready in 48 hours. No guesswork, no hidden costs.' },
  { number: '03', title: 'Build', desc: 'We get to work. Weekly updates keep you in the loop without interrupting your day.' },
  { number: '04', title: 'Deliver', desc: 'Your project ships live. Deployed and ready — we stay close for follow-up support.' },
];

export default function ProcessSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isMobile, setIsMobile] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: '-80px' });
  const sectionRef = useRef<HTMLDivElement>(null);
  const sectionVisible = useInView(sectionRef, { margin: '-100px' });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  /* ── Theme-aware card styles (fixes dark mode) ── */
  const shellStyle = {
    height: '100%',
    borderRadius: isMobile ? 24 : 36,
    padding: isMobile ? 6 : 8,
    background: isDark ? '#121316' : '#ECEDEF',
    border: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.07)',
    boxShadow: isDark
      ? 'inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.4), 0 24px 64px rgba(0,0,0,0.3)'
      : 'inset 0 1px 0 rgba(255,255,255,0.90), 0 1px 2px rgba(0,0,0,0.04), 0 4px 8px rgba(0,0,0,0.04), 0 16px 32px rgba(0,0,0,0.07), 0 40px 72px rgba(0,0,0,0.09), 0 80px 120px rgba(0,0,0,0.06)',
    transition: 'transform 500ms cubic-bezier(0.16,1,0.3,1), box-shadow 400ms cubic-bezier(0.16,1,0.3,1)',
    willChange: 'transform' as const,
  };

  const innerStyle = {
    position: 'relative' as const,
    height: '100%',
    aspectRatio: isMobile ? 'auto' : '1 / 1',
    width: '100%',
    borderRadius: isMobile ? 20 : 28,
    padding: isMobile ? '20px' : 'clamp(24px, 2.5vw, 32px)',
    background: isDark
      ? 'linear-gradient(165deg, #1a1c20 0%, #141518 20%, #101114 45%, #0c0d10 65%, #090a0c 85%, #060708 100%)'
      : 'linear-gradient(165deg, #ffffff 0%, #F7F8FA 60%, #F2F4F7 100%)',
    border: isDark ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(0,0,0,0.055)',
    boxShadow: isDark
      ? 'inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.30), 0 4px 8px rgba(0,0,0,0.12), 0 12px 28px rgba(0,0,0,0.18), 0 28px 56px rgba(0,0,0,0.16), 0 48px 80px rgba(0,0,0,0.10)'
      : 'inset 0 1px 0 rgba(255,255,255,1), inset 0 -1px 0 rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)',
    overflow: 'hidden' as const,
    transition: 'box-shadow 350ms cubic-bezier(0.16,1,0.3,1)',
  };

  const highlightBg = isDark
    ? 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent 100%)'
    : 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 30%, rgba(255,255,255,0.6) 70%, transparent 100%)';

  return (
    <section id="process" ref={sectionRef} className="process-section">
      <style jsx>{`
        .process-section {
          position: relative;
          background: var(--bg-primary);
          overflow: hidden;
        }
        .process-container {
          max-width: var(--container-max);
          margin: 0 auto;
          padding: var(--section-padding) var(--container-padding);
          display: flex;
          flex-direction: column;
          gap: clamp(2.5rem, 5vh, 4rem);
        }
        .process-header { text-align: center; }
        .process-eyebrow {
          font-size: 0.625rem; font-weight: 600; color: var(--text-tertiary);
          text-transform: uppercase; letter-spacing: 0.15em; margin: 0 0 12px;
          font-family: var(--font-sans), Poppins, system-ui, -apple-system, sans-serif;
        }
        .process-headline {
          font-size: clamp(2rem, 5vw, 3.35rem); font-weight: 700;
          color: var(--text-primary); letter-spacing: -0.035em;
          line-height: 1.08; margin: 0; font-family: var(--font-sans), Poppins, system-ui, -apple-system, sans-serif;
        }
        .process-headline__thin { font-weight: 400; color: var(--text-secondary); }

        .process-cards {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        /* ── Progress bar ── */
        .process-progress { 
          position: relative; 
          height: 48px;
          margin-top: 24px;
          margin-left: calc(12.5% - 6px);
          margin-right: calc(12.5% - 6px);
        }
        @media (max-width: 1024px) {
          .process-progress { margin-left: calc(25% - 4px); margin-right: calc(25% - 4px); }
        }
        @media (max-width: 768px) {
          .process-progress { margin-left: calc(25% - 3px); margin-right: calc(25% - 3px); }
        }
        @media (max-width: 480px) {
          .process-progress { margin-left: 20px; margin-right: 20px; }
        }

        .process-progress-track {
          position: absolute;
          top: 4.5px;
          left: 0; right: 0;
          height: 3px;
          background: var(--border-color);
          border-radius: 1.5px;
          z-index: 1;
        }
        .process-progress-beam {
          position: absolute;
          top: 0; left: 0; height: 100%; width: 0%;
          background: linear-gradient(90deg, rgba(108,99,255,0.4) 0%, var(--accent-blue) 95%, #fff 100%);
          box-shadow: 0 0 8px var(--accent-blue);
          border-radius: 1.5px;
          animation: process-fill 8s ease-in-out infinite;
        }
        @keyframes process-fill {
          0% { width: 0%; opacity: 0; }
          5% { opacity: 1; }
          90% { width: 100%; opacity: 1; }
          100% { width: 100%; opacity: 0; }
        }
        .process-progress-dots {
          position: relative;
          z-index: 3;
          display: flex;
          justify-content: space-between;
        }
        .process-dot {
          position: relative;
          width: 0;
          display: flex;
          justify-content: center;
        }
        .process-dot::before {
          content: ''; 
          position: absolute;
          top: 0; left: -6px;
          width: 12px; height: 12px; border-radius: 50%;
          background: var(--accent-blue);
          box-shadow: 0 0 0 4px var(--bg-primary), 0 0 12px var(--accent-blue-glow);
        }
        .process-dot-label {
          position: absolute;
          top: 24px;
          left: 0;
          transform: translateX(-50%);
          font-size: 0.65rem; font-weight: 600; text-transform: uppercase;
          letter-spacing: 0.1em; color: var(--text-tertiary);
          font-family: var(--font-sans), Poppins, system-ui, -apple-system, sans-serif;
          white-space: nowrap;
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .process-cards { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .process-section { min-height: 100vh; display: flex; align-items: center; }
          .process-container { padding-top: 2rem; padding-bottom: 2rem; gap: 24px; }
          .process-cards { grid-template-columns: 1fr; gap: 12px; }
          .process-progress { display: none !important; }
        }
      `}</style>

      <div className="process-container">
        {/* Header */}
        <m.div
          ref={headerRef}
          className="process-header"
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.72, ease: EASE }}
        >
          <p className="process-eyebrow">How It Works</p>
          <h2 className="process-headline">
            From idea{isMobile ? <br /> : ' '}
            <span className="process-headline__thin">to launch.</span>
          </h2>
        </m.div>

        {/* Cards */}
        <div className="process-cards">
          {steps.map((step, i) => {
            return (
              <m.div
                key={step.number}
                style={shellStyle}
                initial={{ opacity: 0, y: 32, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.72, ease: EASE, delay: 0.1 + i * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
              >
                <div style={innerStyle}>
                  {/* Top highlight */}
                  <div
                    aria-hidden
                    style={{
                      position: 'absolute', top: 0, left: 28, right: 28, height: 1,
                      background: highlightBg, borderRadius: '0 0 4px 4px',
                      pointerEvents: 'none', zIndex: 10,
                    }}
                  />

                  {/* Content wrapper */}
                  <div style={{ 
                    position: 'relative', 
                    zIndex: 2, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    height: '100%',
                    paddingRight: isMobile ? '60px' : '0'
                  }}>
                    {/* Title */}
                    <h3
                      style={{
                        margin: isMobile ? '0 0 4px' : '0 0 clamp(8px, 1.2vw, 14px)',
                        fontSize: isMobile ? '1.25rem' : 'clamp(1.4rem, 2.5vw, 1.8rem)',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        letterSpacing: '-0.04em',
                        lineHeight: 1.05,
                        fontFamily: FONT,
                      }}
                    >
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p
                      style={{
                        margin: 0,
                        fontSize: isMobile ? '0.85rem' : 'clamp(0.85rem, 0.95vw, 0.95rem)',
                        fontWeight: 400,
                        color: 'var(--text-secondary)',
                        lineHeight: 1.5,
                        fontFamily: FONT,
                      }}
                    >
                      {step.desc}
                    </p>
                  </div>

                  {/* Watermark number - Absolute to padding box for perfect bottom-right alignment */}
                  <div
                    aria-hidden
                    style={{
                      position: 'absolute',
                      top: isMobile ? '50%' : 'auto',
                      transform: isMobile ? 'translateY(-50%)' : 'none',
                      bottom: isMobile ? 'auto' : 'clamp(8px, 1vw, 16px)',
                      right: isMobile ? '16px' : 'clamp(12px, 1.5vw, 20px)',
                      fontSize: isMobile ? '3.5rem' : 'clamp(4.5rem, 7vw, 6rem)',
                      fontWeight: 800,
                      letterSpacing: '-0.05em',
                      lineHeight: 0.8,
                      fontVariantNumeric: 'tabular-nums',
                      backgroundImage: isDark
                        ? 'linear-gradient(135deg, rgba(59,123,255,0.5) 0%, rgba(108,99,255,0.4) 100%)'
                        : 'linear-gradient(135deg, var(--accent-blue) 0%, #6C63FF 100%)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      color: 'transparent',
                      opacity: isDark ? 0.12 : 0.07,
                      userSelect: 'none',
                      pointerEvents: 'none',
                      fontFamily: FONT,
                      zIndex: 1,
                    }}
                  >
                    {step.number}
                  </div>
                </div>
              </m.div>
            );
          })}
        </div>

        {/* Progress bar — continuous beam */}
        <div className="process-progress">
          <div className="process-progress-track">
            <div className="process-progress-beam" />
          </div>
          <div className="process-progress-dots">
            {steps.map((step) => (
              <div key={step.number} className="process-dot">
                <span className="process-dot-label">{step.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
