'use client';

import { useRef, useState, useEffect, type CSSProperties } from 'react';
import { m, useInView } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════
   DESIGN SYSTEM — Matching WhyChooseUs / WorkSection
   ═══════════════════════════════════════════════════════════════ */
const FONT = "'Poppins', system-ui, -apple-system, sans-serif";
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ═══════════════════════════════════════════════════════════════
   SERVICE DATA — stripped to icon + title + description
   ═══════════════════════════════════════════════════════════════ */
const services = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: 'Web Development',
    description:
      'Fast, modern websites and web apps built with Next.js and TypeScript. Clean code, production-ready, delivered on time.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'AI Integrations & Automation',
    description:
      'Intelligent features and automation pipelines — chatbots, document processing, and custom AI-powered workflows.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: 'Digital Presence Management',
    description:
      'Ongoing LinkedIn management, content updates, and website maintenance. Your digital presence, handled.',
  },
];

/* ═══════════════════════════════════════════════════════════════
   CARD INITIAL POSITIONS (stacked deck / fan)
   ═══════════════════════════════════════════════════════════════ */
interface CardPosition {
  x: string;
  y: string;
  rotate: string;
  zIndex: number;
}

const STACKED: CardPosition[] = [
  { x: '-6%',  y: '12px',  rotate: '-8deg', zIndex: 2 },  // Left (behind)
  { x: '0%',   y: '0px',   rotate: '0deg',  zIndex: 3 },  // Center (top)
  { x: '6%',   y: '12px',  rotate: '8deg',  zIndex: 1 },  // Right (behind)
];

const SPREAD: CardPosition[] = [
  { x: 'calc(-100% - 16px)', y: '0px', rotate: '0deg', zIndex: 2 },
  { x: '0%',                  y: '0px', rotate: '0deg', zIndex: 3 },
  { x: 'calc(100% + 16px)',  y: '0px', rotate: '0deg', zIndex: 1 },
];

/* ═══════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [hasSpread, setHasSpread] = useState(false);

  /* Heading reveal — uses Framer Motion useInView */
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' });

  /* Card animation trigger — IntersectionObserver with 0.85 threshold */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasSpread(true);
          observer.unobserve(section);
        }
      },
      { threshold: 0.85 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="services-section"
    >
      {/* ── Inline styles (scoped via JSX) ── */}
      <style jsx>{`
        .services-section {
          position: relative;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: var(--bg-primary);
          overflow: hidden;
        }

        .services-inner {
          width: 100%;
          max-width: var(--container-max);
          padding: 0 var(--container-padding);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(2.5rem, 5vh, 4rem);
        }

        /* ── Card arena ── */
        .services-cards-arena {
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          /* Height = card height + breathing room */
          height: clamp(300px, 38vh, 420px);
        }

        /* ── Individual card ── */
        .service-card {
          position: absolute;
          width: min(320px, 28vw);
          height: clamp(280px, 34vh, 380px);
          border-radius: 28px;
          padding: 36px 32px;
          display: flex;
          flex-direction: column;
          cursor: default;
          transition:
            transform 800ms var(--ease-spring),
            box-shadow 400ms var(--ease-out);
          will-change: transform;
        }

        .service-card:nth-child(1) { transition-delay: 60ms; }
        .service-card:nth-child(2) { transition-delay: 0ms; }
        .service-card:nth-child(3) { transition-delay: 120ms; }

        /* ── Card background — light mode ── */
        .service-card {
          background: linear-gradient(145deg, #fafafa 0%, #f0f0f2 100%);
          border: 1px solid rgba(0, 0, 0, 0.06);
          box-shadow:
            0 20px 60px -10px rgba(0, 0, 0, 0.12),
            0 8px 24px -6px rgba(0, 0, 0, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
        }

        /* ── Card background — dark mode ── */
        [data-theme="dark"] .service-card {
          background: linear-gradient(145deg, #1a1a1e 0%, #0d0d10 100%);
          border: 1px solid rgba(255, 255, 255, 0.06);
          box-shadow:
            0 20px 60px -10px rgba(0, 0, 0, 0.5),
            0 8px 24px -6px rgba(0, 0, 0, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
        }

        .service-card:hover {
          box-shadow:
            0 24px 72px -8px rgba(0, 0, 0, 0.18),
            0 12px 32px -4px rgba(0, 0, 0, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
        }

        [data-theme="dark"] .service-card:hover {
          box-shadow:
            0 24px 72px -8px rgba(0, 0, 0, 0.65),
            0 12px 32px -4px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }

        /* ── Icon container ── */
        .service-icon {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          background: var(--accent-blue-subtle);
          color: var(--accent-blue);
          flex-shrink: 0;
        }

        /* ── Mobile graceful degradation ── */
        @media (max-width: 768px) {
          .services-section {
            height: auto;
            min-height: 0;
            padding: var(--section-padding) 0;
          }

          .services-cards-arena {
            position: relative;
            height: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
          }

          .service-card {
            position: relative !important;
            width: 100% !important;
            max-width: 360px;
            height: auto !important;
            min-height: 240px;
            transform: none !important;
            opacity: 0;
            transition:
              opacity 700ms var(--ease-out),
              transform 700ms var(--ease-out) !important;
          }

          .service-card.mobile-visible {
            opacity: 1;
            transform: translateY(0) !important;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .service-card {
            width: min(280px, 26vw);
            height: clamp(260px, 32vh, 350px);
            padding: 28px 24px;
          }
        }
      `}</style>

      <div className="services-inner">
        {/* ═══ Heading Block ═══ */}
        <m.div
          ref={headingRef}
          initial={{ opacity: 0, y: 28 }}
          animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.72, ease: EASE }}
          style={{
            textAlign: 'center',
            maxWidth: 560,
          }}
        >
          <p
            style={{
              margin: '0 0 8px',
              fontSize: '0.625rem',
              fontWeight: 600,
              color: 'var(--text-tertiary)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontFamily: FONT,
            }}
          >
            What We Do
          </p>
          <h2
            style={{
              margin: 0,
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              letterSpacing: '-0.03em',
              lineHeight: 1.08,
              fontFamily: FONT,
            }}
          >
            Services built for growth.
            <br />
            <span style={{ color: 'var(--text-secondary)', fontWeight: 400 }}>
              Delivered with precision.
            </span>
          </h2>
        </m.div>

        {/* ═══ Cards Arena ═══ */}
        <div ref={cardsRef} className="services-cards-arena">
          {services.map((service, i) => {
            const pos = hasSpread ? SPREAD[i] : STACKED[i];

            // Build transform string for desktop
            const desktopTransform = `translateX(${pos.x}) translateY(${pos.y}) rotate(${pos.rotate})`;

            return (
              <div
                key={service.title}
                className={`service-card${hasSpread ? ' mobile-visible' : ''}`}
                style={{
                  zIndex: pos.zIndex,
                  transform: desktopTransform,
                } as CSSProperties}
              >
                {/* Top highlight line */}
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 28,
                    right: 28,
                    height: 1,
                    background:
                      'linear-gradient(90deg, transparent 0%, var(--glass-highlight) 30%, var(--glass-highlight) 70%, transparent 100%)',
                    borderRadius: '0 0 4px 4px',
                    pointerEvents: 'none',
                  }}
                />

                {/* Icon */}
                <div className="service-icon">
                  {service.icon}
                </div>

                {/* Title */}
                <h3
                  style={{
                    margin: '0 0 12px',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                    fontFamily: FONT,
                  }}
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    margin: 0,
                    fontSize: '0.8125rem',
                    fontWeight: 400,
                    color: 'var(--text-secondary)',
                    lineHeight: 1.55,
                    fontFamily: FONT,
                  }}
                >
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
